import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-interfaces',
  title: '14. Interfaces',
  explanation: `## Interfaces

Interfaces define contracts that classes must implement.

### Declaration
\`\`\`java
public interface Drawable {
    void draw();
}
\`\`\`

### Default Methods (Java 8+)
\`\`\`java
interface Logger {
    default void log(String msg) {
        System.out.println(msg);
    }
}
\`\`\`

### Static Methods
\`\`\`java
interface Factory {
    static Factory create() { return new DefaultFactory(); }
}
\`\`\`

### Private Methods (Java 9+)
Used to share code between default methods.

### Functional Interfaces
An interface with exactly one abstract method:
\`\`\`java
@FunctionalInterface
interface Transformer<T> {
    T transform(T input);
}
\`\`\`

### Key Interfaces
- \`Comparable<T>\`: natural ordering
- \`Comparator<T>\`: custom ordering
- \`Iterable<T>\`: for-each support
- \`Serializable\`: marker interface
`,
  exercises: [
    {
      id: 'java-iface-1',
      title: 'Implement interface',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Make the class implement the Printable interface.',
      skeleton: `interface Printable { void print(); }

class Document __BLANK__ Printable {
    @Override
    public void print() { System.out.println("Printing document"); }
}`,
      solution: `interface Printable { void print(); }

class Document implements Printable {
    @Override
    public void print() { System.out.println("Printing document"); }
}`,
      hints: ['Java uses a keyword to indicate interface implementation.', 'It is different from extends.', 'Use `implements`.'],
      concepts: ['implements', 'interface implementation'],
    },
    {
      id: 'java-iface-2',
      title: 'Default method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Add a default method to the interface.',
      skeleton: `interface Greetable {
    String name();
    __BLANK__ String greet() {
        return "Hello, " + name();
    }
}`,
      solution: `interface Greetable {
    String name();
    default String greet() {
        return "Hello, " + name();
    }
}`,
      hints: ['Interface methods with a body need a keyword.', 'It was introduced in Java 8.', 'Use `default`.'],
      concepts: ['default method', 'Java 8', 'interface evolution'],
    },
    {
      id: 'java-iface-3',
      title: 'Functional interface annotation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Mark the interface as a functional interface.',
      skeleton: `__BLANK__
interface Converter<F, T> {
    T convert(F from);
}`,
      solution: `@FunctionalInterface
interface Converter<F, T> {
    T convert(F from);
}`,
      hints: ['An annotation ensures exactly one abstract method.', 'It enables lambda usage.', 'Use `@FunctionalInterface`.'],
      concepts: ['@FunctionalInterface', 'single abstract method', 'lambda'],
    },
    {
      id: 'java-iface-4',
      title: 'Static interface method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Add a static utility method to the interface.',
      skeleton: `interface StringUtil {
    __BLANK__ boolean isNullOrEmpty(String s) {
        return s == null || s.isEmpty();
    }
}`,
      solution: `interface StringUtil {
    static boolean isNullOrEmpty(String s) {
        return s == null || s.isEmpty();
    }
}`,
      hints: ['Interfaces can have static methods since Java 8.', 'They are called on the interface name.', 'Use `static`.'],
      concepts: ['static interface method', 'utility method'],
    },
    {
      id: 'java-iface-5',
      title: 'Multiple interface implementation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Implement multiple interfaces.',
      skeleton: `interface Flyable { void fly(); }
interface Swimmable { void swim(); }

class Duck implements Flyable__BLANK__ Swimmable {
    @Override public void fly() { System.out.println("Flying"); }
    @Override public void swim() { System.out.println("Swimming"); }
}`,
      solution: `interface Flyable { void fly(); }
interface Swimmable { void swim(); }

class Duck implements Flyable, Swimmable {
    @Override public void fly() { System.out.println("Flying"); }
    @Override public void swim() { System.out.println("Swimming"); }
}`,
      hints: ['Multiple interfaces are separated by a comma.', 'A class can implement many interfaces.', 'Use `,`.'],
      concepts: ['multiple interfaces', 'comma separated'],
    },
    {
      id: 'java-iface-6',
      title: 'Comparable implementation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Implement Comparable to enable natural ordering.',
      skeleton: `class Student implements __BLANK__<Student> {
    String name;
    int grade;
    
    @Override
    public int compareTo(Student other) {
        return Integer.compare(this.grade, other.grade);
    }
}`,
      solution: `class Student implements Comparable<Student> {
    String name;
    int grade;
    
    @Override
    public int compareTo(Student other) {
        return Integer.compare(this.grade, other.grade);
    }
}`,
      hints: ['The interface for natural ordering.', 'It takes a generic type parameter.', 'Use `Comparable`.'],
      concepts: ['Comparable', 'natural ordering', 'compareTo'],
    },
    {
      id: 'java-iface-7',
      title: 'Stack interface and implementation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a Stack<T> interface with push/pop/peek/isEmpty, then ArrayStack implementation.',
      skeleton: '',
      solution: `interface Stack<T> {
    void push(T item);
    T pop();
    T peek();
    boolean isEmpty();
}

class ArrayStack<T> implements Stack<T> {
    private final Object[] data;
    private int top = -1;
    
    ArrayStack(int capacity) { data = new Object[capacity]; }
    
    @Override public void push(T item) { data[++top] = item; }
    @Override @SuppressWarnings("unchecked") public T pop() { return (T) data[top--]; }
    @Override @SuppressWarnings("unchecked") public T peek() { return (T) data[top]; }
    @Override public boolean isEmpty() { return top < 0; }
}`,
      hints: ['The interface defines the contract.', 'ArrayStack uses an Object array internally.', 'Use @SuppressWarnings for unchecked casts.'],
      concepts: ['generic interface', 'implementation', 'stack data structure'],
    },
    {
      id: 'java-iface-8',
      title: 'Composable Predicate interface',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a Checker<T> functional interface with check(T), and default and/or/negate methods.',
      skeleton: '',
      solution: `@FunctionalInterface
interface Checker<T> {
    boolean check(T value);
    
    default Checker<T> and(Checker<T> other) {
        return value -> this.check(value) && other.check(value);
    }
    
    default Checker<T> or(Checker<T> other) {
        return value -> this.check(value) || other.check(value);
    }
    
    default Checker<T> negate() {
        return value -> !this.check(value);
    }
}`,
      hints: ['Default methods enable composition.', 'and/or return new Checker lambdas.', 'negate inverts the check result.'],
      concepts: ['functional interface', 'default methods', 'composition'],
    },
    {
      id: 'java-iface-9',
      title: 'Custom Iterable',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a Range class that implements Iterable<Integer> for use in for-each.',
      skeleton: '',
      solution: `class Range implements Iterable<Integer> {
    private final int start, end;
    
    Range(int start, int end) {
        this.start = start;
        this.end = end;
    }
    
    @Override
    public java.util.Iterator<Integer> iterator() {
        return new java.util.Iterator<>() {
            int current = start;
            public boolean hasNext() { return current < end; }
            public Integer next() { return current++; }
        };
    }
}`,
      hints: ['Implement Iterable<Integer> and return an Iterator.', 'The Iterator tracks current position.', 'hasNext checks if current < end.'],
      concepts: ['Iterable', 'Iterator', 'for-each support'],
    },
    {
      id: 'java-iface-10',
      title: 'Interface with private method',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write an interface with two default methods that share logic via a private method.',
      skeleton: '',
      solution: `interface Formatter {
    default String formatBold(String text) {
        return wrap(text, "**");
    }
    
    default String formatItalic(String text) {
        return wrap(text, "_");
    }
    
    private String wrap(String text, String marker) {
        return marker + text + marker;
    }
}`,
      hints: ['Private interface methods (Java 9+) share code between defaults.', 'They cannot be called from implementing classes.', 'Extract the common wrapping logic.'],
      concepts: ['private interface method', 'code sharing', 'Java 9+'],
    },
    {
      id: 'java-iface-11',
      title: 'Comparator factory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write static methods that return Comparator<String> for byLength, byAlpha, and reversed.',
      skeleton: '',
      solution: `class StringComparators {
    public static java.util.Comparator<String> byLength() {
        return java.util.Comparator.comparingInt(String::length);
    }
    
    public static java.util.Comparator<String> byAlpha() {
        return String::compareToIgnoreCase;
    }
    
    public static java.util.Comparator<String> byLengthThenAlpha() {
        return byLength().thenComparing(byAlpha());
    }
}`,
      hints: ['Comparator.comparingInt extracts an int key.', 'Method references can serve as Comparators.', 'thenComparing chains comparators.'],
      concepts: ['Comparator', 'method reference', 'comparator chaining'],
    },
    {
      id: 'java-iface-12',
      title: 'Interface segregation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Split a fat interface into smaller focused ones following ISP.',
      skeleton: '',
      solution: `interface Readable {
    String read();
}

interface Writable {
    void write(String data);
}

interface Closeable {
    void close();
}

class FileHandler implements Readable, Writable, Closeable {
    private String content = "";
    @Override public String read() { return content; }
    @Override public void write(String data) { content += data; }
    @Override public void close() { content = null; }
}

class ReadOnlyHandler implements Readable {
    private final String content;
    ReadOnlyHandler(String content) { this.content = content; }
    @Override public String read() { return content; }
}`,
      hints: ['Split into Readable, Writable, Closeable.', 'Classes implement only what they need.', 'ReadOnlyHandler only implements Readable.'],
      concepts: ['interface segregation', 'SOLID', 'focused interfaces'],
    },
    {
      id: 'java-iface-13',
      title: 'Diamond problem with defaults',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the diamond problem when two interfaces have the same default method.',
      skeleton: `interface A { default String greet() { return "A"; } }
interface B { default String greet() { return "B"; } }

class C implements A, B {
    // Compile error: conflicting default methods
}`,
      solution: `interface A { default String greet() { return "A"; } }
interface B { default String greet() { return "B"; } }

class C implements A, B {
    @Override
    public String greet() {
        return A.super.greet() + " & " + B.super.greet();
    }
}`,
      hints: ['When two interfaces have the same default method, the class must override.', 'Use InterfaceName.super.method() to call a specific default.', 'The class resolves the conflict explicitly.'],
      concepts: ['diamond problem', 'default method conflict', 'resolution'],
    },
    {
      id: 'java-iface-14',
      title: 'Missing interface method',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the class that does not implement all interface methods.',
      skeleton: `interface Repository<T> {
    T findById(int id);
    java.util.List<T> findAll();
    void save(T entity);
    void delete(int id);
}

class UserRepo implements Repository<String> {
    @Override public String findById(int id) { return "User" + id; }
    @Override public void save(String entity) { }
}`,
      solution: `class UserRepo implements Repository<String> {
    @Override public String findById(int id) { return "User" + id; }
    @Override public java.util.List<String> findAll() { return java.util.List.of(); }
    @Override public void save(String entity) { }
    @Override public void delete(int id) { }
}`,
      hints: ['All abstract methods must be implemented.', 'findAll() and delete() are missing.', 'Add implementations for both.'],
      concepts: ['interface contract', 'missing implementation', 'compilation error'],
    },
    {
      id: 'java-iface-15',
      title: 'Wrong functional interface',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the interface that has two abstract methods but is marked as functional.',
      skeleton: `@FunctionalInterface
interface Processor {
    void process(String input);
    void cleanup();
}`,
      solution: `@FunctionalInterface
interface Processor {
    void process(String input);
    default void cleanup() { }
}`,
      hints: ['Functional interfaces must have exactly one abstract method.', 'Make cleanup a default method with empty body.', 'Or remove @FunctionalInterface.'],
      concepts: ['functional interface', 'single abstract method', 'default method'],
    },
    {
      id: 'java-iface-16',
      title: 'Predict default method',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output using a default method.',
      skeleton: `interface Named {
    String name();
    default String label() { return "[" + name() + "]"; }
}
class Item implements Named {
    @Override public String name() { return "Sword"; }
}
System.out.println(new Item().label());`,
      solution: `[Sword]`,
      hints: ['label() calls name() which is implemented by Item.', 'name() returns "Sword".', 'label() wraps it: "[Sword]".'],
      concepts: ['default method', 'polymorphic call', 'interface'],
    },
    {
      id: 'java-iface-17',
      title: 'Predict interface variable',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict how interface fields work.',
      skeleton: `interface Constants {
    int VALUE = 42;
}
System.out.println(Constants.VALUE);`,
      solution: `42`,
      hints: ['Interface fields are implicitly public static final.', 'They are constants.', 'Accessed via InterfaceName.FIELD.'],
      concepts: ['interface constants', 'public static final', 'implicit modifiers'],
    },
    {
      id: 'java-iface-18',
      title: 'Predict lambda as functional interface',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output of a lambda assigned to a functional interface.',
      skeleton: `@FunctionalInterface
interface MathOp { int apply(int a, int b); }

MathOp add = (a, b) -> a + b;
MathOp mul = (a, b) -> a * b;
System.out.println(add.apply(3, 4) + " " + mul.apply(3, 4));`,
      solution: `7 12`,
      hints: ['add lambda returns a + b = 3 + 4 = 7.', 'mul lambda returns a * b = 3 * 4 = 12.', 'Output is "7 12".'],
      concepts: ['functional interface', 'lambda', 'method call'],
    },
    {
      id: 'java-iface-19',
      title: 'Refactor abstract class to interface',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor the abstract class that has no state to an interface with default methods.',
      skeleton: `abstract class Transformer {
    abstract String transform(String input);
    
    String transformAll(String[] inputs) {
        StringBuilder sb = new StringBuilder();
        for (String s : inputs) {
            sb.append(transform(s)).append(" ");
        }
        return sb.toString().trim();
    }
}`,
      solution: `interface Transformer {
    String transform(String input);
    
    default String transformAll(String[] inputs) {
        StringBuilder sb = new StringBuilder();
        for (String s : inputs) {
            sb.append(transform(s)).append(" ");
        }
        return sb.toString().trim();
    }
}`,
      hints: ['Abstract classes with no state can often be interfaces.', 'Convert the abstract method and make the concrete one default.', 'This allows multiple inheritance.'],
      concepts: ['abstract to interface', 'default methods', 'refactoring'],
    },
    {
      id: 'java-iface-20',
      title: 'Refactor to functional interface',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor the verbose anonymous class to use a lambda with a functional interface.',
      skeleton: `interface Filter<T> {
    boolean test(T item);
}

java.util.List<String> filter(java.util.List<String> list) {
    Filter<String> f = new Filter<String>() {
        @Override
        public boolean test(String item) {
            return item.length() > 3;
        }
    };
    java.util.List<String> result = new java.util.ArrayList<>();
    for (String s : list) if (f.test(s)) result.add(s);
    return result;
}`,
      solution: `interface Filter<T> {
    boolean test(T item);
}

java.util.List<String> filter(java.util.List<String> list) {
    Filter<String> f = item -> item.length() > 3;
    java.util.List<String> result = new java.util.ArrayList<>();
    for (String s : list) if (f.test(s)) result.add(s);
    return result;
}`,
      hints: ['The anonymous class implements a single-method interface.', 'Replace with a lambda expression.', 'item -> item.length() > 3 is equivalent.'],
      concepts: ['lambda', 'functional interface', 'anonymous class replacement'],
    },
  ],
};
