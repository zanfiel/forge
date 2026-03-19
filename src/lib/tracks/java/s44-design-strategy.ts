import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-strategy',
  title: '44. Strategy Pattern',
  explanation: `## Strategy Pattern in Java

The **Strategy** pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It lets the algorithm vary independently from clients that use it.

### Classic Implementation

\`\`\`java
public interface SortStrategy {
    <T extends Comparable<T>> void sort(List<T> list);
}

public class BubbleSort implements SortStrategy {
    @Override
    public <T extends Comparable<T>> void sort(List<T> list) {
        // bubble sort implementation
    }
}

public class QuickSort implements SortStrategy {
    @Override
    public <T extends Comparable<T>> void sort(List<T> list) {
        // quick sort implementation
    }
}
\`\`\`

### Context Class

\`\`\`java
public class Sorter {
    private SortStrategy strategy;

    public Sorter(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public <T extends Comparable<T>> void sort(List<T> list) {
        strategy.sort(list);
    }
}
\`\`\`

### Lambda Strategies

With functional interfaces, strategies can be expressed as lambdas:

\`\`\`java
Sorter sorter = new Sorter(list -> Collections.sort(list));
\`\`\`

### Comparator as Strategy

\`\`\`java
List<String> names = Arrays.asList("Charlie", "Alice", "Bob");
names.sort(Comparator.naturalOrder());           // strategy 1
names.sort(Comparator.reverseOrder());            // strategy 2
names.sort(Comparator.comparing(String::length)); // strategy 3
\`\`\`

### Runtime Swapping

The power of Strategy is that algorithms can be swapped at runtime:

\`\`\`java
if (data.size() < 10) {
    sorter.setStrategy(new BubbleSort());
} else {
    sorter.setStrategy(new QuickSort());
}
sorter.sort(data);
\`\`\``,
  exercises: [
    {
      id: 'java-strategy-1',
      title: 'Strategy Interface Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare a strategy interface for payment processing.',
      skeleton: `public __BLANK__ PaymentStrategy {
    void pay(double amount);
}`,
      solution: `public interface PaymentStrategy {
    void pay(double amount);
}`,
      hints: [
        'A strategy is defined as a contract with one or more methods.',
        'The keyword defines a type that cannot be instantiated directly.',
        'Use "interface".',
      ],
      concepts: ['strategy-interface', 'interface'],
    },
    {
      id: 'java-strategy-2',
      title: 'Implement a Concrete Strategy',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Implement the PaymentStrategy interface for credit card payments.',
      skeleton: `public class CreditCardPayment __BLANK__ PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("Paid " + amount + " via credit card");
    }
}`,
      solution: `public class CreditCardPayment implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("Paid " + amount + " via credit card");
    }
}`,
      hints: [
        'A class adopts an interface contract using a specific keyword.',
        'The keyword indicates the class fulfills the interface methods.',
        'Use "implements".',
      ],
      concepts: ['implements', 'concrete-strategy'],
    },
    {
      id: 'java-strategy-3',
      title: 'Context with Strategy Field',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Complete the context class that holds a strategy and delegates to it.',
      skeleton: `public class ShoppingCart {
    private PaymentStrategy __BLANK__;

    public ShoppingCart(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public void checkout(double total) {
        strategy.pay(total);
    }
}`,
      solution: `public class ShoppingCart {
    private PaymentStrategy strategy;

    public ShoppingCart(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public void checkout(double total) {
        strategy.pay(total);
    }
}`,
      hints: [
        'The context holds a reference to the strategy interface.',
        'The field name should match the constructor parameter.',
        'Declare the field: strategy',
      ],
      concepts: ['context-class', 'composition'],
    },
    {
      id: 'java-strategy-4',
      title: 'Runtime Strategy Swap',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Add a setter to allow changing the strategy at runtime.',
      skeleton: `public class TextEditor {
    private FormatStrategy formatter;

    public TextEditor(FormatStrategy formatter) {
        this.formatter = formatter;
    }

    public void __BLANK__(FormatStrategy formatter) {
        this.formatter = formatter;
    }

    public String format(String text) {
        return formatter.apply(text);
    }
}`,
      solution: `public class TextEditor {
    private FormatStrategy formatter;

    public TextEditor(FormatStrategy formatter) {
        this.formatter = formatter;
    }

    public void setFormatter(FormatStrategy formatter) {
        this.formatter = formatter;
    }

    public String format(String text) {
        return formatter.apply(text);
    }
}`,
      hints: [
        'You need a method that updates the strategy field.',
        'Setter methods follow the naming convention set + FieldName.',
        'Use setFormatter.',
      ],
      concepts: ['runtime-swapping', 'setter-method'],
    },
    {
      id: 'java-strategy-5',
      title: 'Comparator Strategy',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Sort a list of strings by their length using Comparator.comparing as a strategy.',
      skeleton: `import java.util.*;

List<String> names = Arrays.asList("Charlie", "Bob", "Alice");
names.sort(Comparator.__BLANK__(String::length));
// Result: ["Bob", "Alice", "Charlie"]`,
      solution: `import java.util.*;

List<String> names = Arrays.asList("Charlie", "Bob", "Alice");
names.sort(Comparator.comparing(String::length));`,
      hints: [
        'Comparator has a static method that creates a comparator from a key extractor.',
        'The method takes a function that extracts the comparison key.',
        'Use Comparator.comparing(String::length).',
      ],
      concepts: ['comparator-strategy', 'method-reference'],
    },
    {
      id: 'java-strategy-6',
      title: 'Lambda as Strategy',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Pass a lambda expression as the strategy to the context class.',
      skeleton: `public interface Validator {
    boolean isValid(String input);
}

public class Form {
    private Validator validator;
    public Form(Validator v) { this.validator = v; }
    public boolean validate(String input) { return validator.isValid(input); }
}

// Create a Form with a lambda that checks if input is not empty
Form form = new Form(__BLANK__);`,
      solution: `public interface Validator {
    boolean isValid(String input);
}

public class Form {
    private Validator validator;
    public Form(Validator v) { this.validator = v; }
    public boolean validate(String input) { return validator.isValid(input); }
}

Form form = new Form(input -> !input.isEmpty());`,
      hints: [
        'A functional interface with one method can be implemented as a lambda.',
        'The lambda takes a String and returns a boolean.',
        'Use: input -> !input.isEmpty()',
      ],
      concepts: ['lambda-strategy', 'functional-interface'],
    },
    {
      id: 'java-strategy-7',
      title: 'Write a Complete Strategy Pattern',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a CompressionStrategy interface, a ZipCompression implementation, and a FileCompressor context class.',
      skeleton: `// Write:
// 1. CompressionStrategy interface with: byte[] compress(byte[] data)
// 2. ZipCompression implements CompressionStrategy
// 3. FileCompressor context with:
//    - CompressionStrategy field
//    - constructor taking strategy
//    - byte[] compressFile(byte[] data) delegating to strategy`,
      solution: `public interface CompressionStrategy {
    byte[] compress(byte[] data);
}

public class ZipCompression implements CompressionStrategy {
    @Override
    public byte[] compress(byte[] data) {
        // zip compression logic
        return data;
    }
}

public class FileCompressor {
    private CompressionStrategy strategy;

    public FileCompressor(CompressionStrategy strategy) {
        this.strategy = strategy;
    }

    public byte[] compressFile(byte[] data) {
        return strategy.compress(data);
    }
}`,
      hints: [
        'The interface declares the compress method.',
        'ZipCompression implements the interface with concrete logic.',
        'FileCompressor holds the strategy and delegates to it.',
      ],
      concepts: ['strategy-pattern', 'composition', 'delegation'],
    },
    {
      id: 'java-strategy-8',
      title: 'Write Multiple Strategies',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a DiscountStrategy interface and three implementations: NoDiscount, PercentageDiscount(10%), and FlatDiscount($5).',
      skeleton: `// Write:
// 1. DiscountStrategy interface: double applyDiscount(double price)
// 2. NoDiscount: returns price unchanged
// 3. PercentageDiscount: constructor takes percentage, reduces by that %
// 4. FlatDiscount: constructor takes flat amount, subtracts it (min 0)`,
      solution: `public interface DiscountStrategy {
    double applyDiscount(double price);
}

public class NoDiscount implements DiscountStrategy {
    @Override
    public double applyDiscount(double price) {
        return price;
    }
}

public class PercentageDiscount implements DiscountStrategy {
    private final double percentage;

    public PercentageDiscount(double percentage) {
        this.percentage = percentage;
    }

    @Override
    public double applyDiscount(double price) {
        return price * (1 - percentage / 100.0);
    }
}

public class FlatDiscount implements DiscountStrategy {
    private final double amount;

    public FlatDiscount(double amount) {
        this.amount = amount;
    }

    @Override
    public double applyDiscount(double price) {
        return Math.max(0, price - amount);
    }
}`,
      hints: [
        'Each strategy implements the same interface differently.',
        'PercentageDiscount reduces by a percentage: price * (1 - pct/100).',
        'FlatDiscount subtracts a fixed amount, never going below zero.',
      ],
      concepts: ['multiple-strategies', 'open-closed-principle'],
    },
    {
      id: 'java-strategy-9',
      title: 'Write Strategy with Enum Registry',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write an enum that maps strategy types to lambda implementations.',
      skeleton: `// Write a SortOrder enum with:
// - ASCENDING, DESCENDING, BY_LENGTH
// - Each has a Comparator<String> field
// - Constructor takes a Comparator<String>
// - public Comparator<String> comparator() getter`,
      solution: `import java.util.Comparator;

public enum SortOrder {
    ASCENDING(Comparator.naturalOrder()),
    DESCENDING(Comparator.reverseOrder()),
    BY_LENGTH(Comparator.comparingInt(String::length));

    private final Comparator<String> comparator;

    SortOrder(Comparator<String> comparator) {
        this.comparator = comparator;
    }

    public Comparator<String> comparator() {
        return comparator;
    }
}`,
      hints: [
        'Each enum constant passes a Comparator to the constructor.',
        'Comparator.naturalOrder() sorts alphabetically.',
        'Comparator.comparingInt(String::length) sorts by string length.',
      ],
      concepts: ['enum-strategy', 'comparator', 'registry'],
    },
    {
      id: 'java-strategy-10',
      title: 'Write Context with Conditional Strategy Selection',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a DataProcessor that automatically selects a strategy based on data size.',
      skeleton: `// Write DataProcessor with:
// - Two strategies: SmallDataStrategy for size < 100, LargeDataStrategy for size >= 100
// - process(List<Integer> data) auto-selects strategy based on data.size()
// Assume both strategies implement ProcessStrategy with void process(List<Integer>)`,
      solution: `public class DataProcessor {
    private final ProcessStrategy smallStrategy = new SmallDataStrategy();
    private final ProcessStrategy largeStrategy = new LargeDataStrategy();

    public void process(List<Integer> data) {
        ProcessStrategy strategy;
        if (data.size() < 100) {
            strategy = smallStrategy;
        } else {
            strategy = largeStrategy;
        }
        strategy.process(data);
    }
}`,
      hints: [
        'Keep both strategies as fields so they can be reused.',
        'Select the strategy based on the data size condition.',
        'Delegate to the selected strategy.',
      ],
      concepts: ['conditional-strategy', 'runtime-selection'],
    },
    {
      id: 'java-strategy-11',
      title: 'Write Strategy with Map-Based Dispatch',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a NotificationService that dispatches to different strategies based on a string key, using a Map.',
      skeleton: `import java.util.*;
import java.util.function.Consumer;

// Write NotificationService with:
// - Map<String, Consumer<String>> strategies
// - Constructor registers: "email" -> prints "Email: msg", "sms" -> prints "SMS: msg"
// - notify(String channel, String message) looks up and applies the strategy
// - Throws IllegalArgumentException for unknown channels`,
      solution: `import java.util.*;
import java.util.function.Consumer;

public class NotificationService {
    private final Map<String, Consumer<String>> strategies = new HashMap<>();

    public NotificationService() {
        strategies.put("email", msg -> System.out.println("Email: " + msg));
        strategies.put("sms", msg -> System.out.println("SMS: " + msg));
    }

    public void notify(String channel, String message) {
        Consumer<String> strategy = strategies.get(channel);
        if (strategy == null) {
            throw new IllegalArgumentException("Unknown channel: " + channel);
        }
        strategy.accept(message);
    }
}`,
      hints: [
        'Use Consumer<String> as the strategy type since it takes a message and returns void.',
        'Register strategies in the constructor with lambda expressions.',
        'Look up by key and call accept() on the consumer.',
      ],
      concepts: ['map-dispatch', 'consumer', 'strategy-registry'],
    },
    {
      id: 'java-strategy-12',
      title: 'Write Composable Strategies',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a TextTransform strategy interface with an andThen method for composing strategies.',
      skeleton: `// Write:
// 1. TextTransform functional interface: String transform(String input)
// 2. Default method andThen(TextTransform next) that chains transforms
// 3. Show usage: compose toUpperCase with trim`,
      solution: `@FunctionalInterface
public interface TextTransform {
    String transform(String input);

    default TextTransform andThen(TextTransform next) {
        return input -> next.transform(this.transform(input));
    }
}

// Usage:
// TextTransform upper = String::toUpperCase;
// TextTransform trim = String::trim;
// TextTransform pipeline = upper.andThen(trim);
// String result = pipeline.transform("  hello  "); // "HELLO"`,
      hints: [
        'andThen returns a new TextTransform that applies this first, then next.',
        'Use a lambda that chains: next.transform(this.transform(input)).',
        'The @FunctionalInterface annotation is optional but recommended.',
      ],
      concepts: ['composable-strategies', 'default-methods', 'function-composition'],
    },
    {
      id: 'java-strategy-13',
      title: 'Fix Null Strategy',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'The context class does not check for a null strategy, causing NullPointerException. Add a null check.',
      skeleton: `public class Encryptor {
    private EncryptionStrategy strategy;

    public Encryptor(EncryptionStrategy strategy) {
        this.strategy = strategy;
    }

    public String encrypt(String data) {
        return strategy.encrypt(data); // NPE if strategy is null!
    }
}

// Fix: throw a helpful exception if strategy is null`,
      solution: `public class Encryptor {
    private EncryptionStrategy strategy;

    public Encryptor(EncryptionStrategy strategy) {
        this.strategy = java.util.Objects.requireNonNull(strategy, "Strategy must not be null");
    }

    public String encrypt(String data) {
        return strategy.encrypt(data);
    }
}`,
      hints: [
        'Validate the strategy in the constructor before storing it.',
        'Java provides Objects.requireNonNull for null validation.',
        'This throws NullPointerException with a helpful message if null is passed.',
      ],
      concepts: ['null-safety', 'defensive-programming'],
    },
    {
      id: 'java-strategy-14',
      title: 'Fix Strategy Not Being Used',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'The context creates its own implementation instead of using the injected strategy. Fix it.',
      skeleton: `public class Calculator {
    private MathStrategy strategy;

    public Calculator(MathStrategy strategy) {
        this.strategy = strategy;
    }

    public int compute(int a, int b) {
        // Bug: ignores the injected strategy and hardcodes addition
        return a + b;
    }
}`,
      solution: `public class Calculator {
    private MathStrategy strategy;

    public Calculator(MathStrategy strategy) {
        this.strategy = strategy;
    }

    public int compute(int a, int b) {
        return strategy.execute(a, b);
    }
}`,
      hints: [
        'The method should delegate to the strategy, not implement logic directly.',
        'Replace the hardcoded addition with a call to the strategy.',
        'Use: return strategy.execute(a, b);',
      ],
      concepts: ['delegation', 'strategy-usage'],
    },
    {
      id: 'java-strategy-15',
      title: 'Fix Missing Strategy Interface Method',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'A concrete strategy has a typo in the method name so it does not actually override the interface method. Fix it.',
      skeleton: `public interface HashStrategy {
    String hash(String input);
}

public class Md5Strategy implements HashStrategy {
    // Bug: method name is "hsh" instead of "hash"
    public String hsh(String input) {
        return DigestUtils.md5Hex(input);
    }
}
// Compiler error: Md5Strategy is not abstract and does not override hash(String)`,
      solution: `public interface HashStrategy {
    String hash(String input);
}

public class Md5Strategy implements HashStrategy {
    @Override
    public String hash(String input) {
        return DigestUtils.md5Hex(input);
    }
}`,
      hints: [
        'The method name does not match the interface method.',
        'Fix the typo: "hsh" should be "hash".',
        'Add @Override to catch such errors at compile time.',
      ],
      concepts: ['override', 'interface-implementation', 'typo-bug'],
    },
    {
      id: 'java-strategy-16',
      title: 'Predict Strategy Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output when using a specific strategy.',
      skeleton: `interface Greeting {
    String greet(String name);
}

class FormalGreeting implements Greeting {
    public String greet(String name) { return "Good day, " + name; }
}

class CasualGreeting implements Greeting {
    public String greet(String name) { return "Hey, " + name + "!"; }
}

Greeting g = new CasualGreeting();
System.out.println(g.greet("Alice"));
// What is printed?`,
      solution: `Hey, Alice!`,
      hints: [
        'The variable g holds a CasualGreeting instance.',
        'CasualGreeting.greet() returns "Hey, " + name + "!".',
        'With name "Alice", the output is "Hey, Alice!".',
      ],
      concepts: ['polymorphism', 'strategy-dispatch'],
    },
    {
      id: 'java-strategy-17',
      title: 'Predict Strategy Swap Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output after swapping strategies at runtime.',
      skeleton: `interface Transform {
    String apply(String s);
}

class Processor {
    private Transform t;
    Processor(Transform t) { this.t = t; }
    void setTransform(Transform t) { this.t = t; }
    String run(String s) { return t.apply(s); }
}

Processor p = new Processor(s -> s.toUpperCase());
System.out.print(p.run("hi") + " ");
p.setTransform(s -> s.repeat(2));
System.out.print(p.run("hi"));
// What is printed?`,
      solution: `HI hihi`,
      hints: [
        'First strategy converts to uppercase: "hi" -> "HI".',
        'After swap, the new strategy repeats the string: "hi" -> "hihi".',
        'Output is "HI hihi".',
      ],
      concepts: ['runtime-swapping', 'lambda-strategy'],
    },
    {
      id: 'java-strategy-18',
      title: 'Predict Comparator Strategy Sort',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the order of the list after sorting with a Comparator strategy.',
      skeleton: `import java.util.*;

List<String> words = new ArrayList<>(Arrays.asList("banana", "fig", "apple", "kiwi"));
words.sort(Comparator.comparingInt(String::length));
System.out.println(words);
// What is printed?`,
      solution: `[fig, kiwi, apple, banana]`,
      hints: [
        'The Comparator sorts by string length.',
        'fig(3), kiwi(4), apple(5), banana(6).',
        'Stable sort preserves relative order of equal-length strings.',
      ],
      concepts: ['comparator-strategy', 'sort-stability'],
    },
    {
      id: 'java-strategy-19',
      title: 'Refactor if-else to Strategy',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor a method with an if-else chain for shipping cost calculation into the strategy pattern.',
      skeleton: `public class OrderService {
    public double calculateShipping(String method, double weight) {
        if (method.equals("standard")) {
            return weight * 1.5;
        } else if (method.equals("express")) {
            return weight * 3.0 + 5.0;
        } else if (method.equals("overnight")) {
            return weight * 5.0 + 15.0;
        } else {
            throw new IllegalArgumentException("Unknown method: " + method);
        }
    }
}
// Refactor: Extract ShippingStrategy and pass it to the service`,
      solution: `public interface ShippingStrategy {
    double calculate(double weight);
}

public class StandardShipping implements ShippingStrategy {
    @Override
    public double calculate(double weight) { return weight * 1.5; }
}

public class ExpressShipping implements ShippingStrategy {
    @Override
    public double calculate(double weight) { return weight * 3.0 + 5.0; }
}

public class OvernightShipping implements ShippingStrategy {
    @Override
    public double calculate(double weight) { return weight * 5.0 + 15.0; }
}

public class OrderService {
    private ShippingStrategy shippingStrategy;

    public OrderService(ShippingStrategy strategy) {
        this.shippingStrategy = strategy;
    }

    public double calculateShipping(double weight) {
        return shippingStrategy.calculate(weight);
    }
}`,
      hints: [
        'Extract each if-branch into its own strategy class.',
        'Create a ShippingStrategy interface with calculate(double weight).',
        'The service takes a strategy via constructor and delegates to it.',
      ],
      concepts: ['if-else-refactoring', 'open-closed-principle', 'strategy-pattern'],
    },
    {
      id: 'java-strategy-20',
      title: 'Refactor Anonymous Classes to Lambdas',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor verbose anonymous class strategy implementations to concise lambda expressions.',
      skeleton: `public interface Formatter {
    String format(String text);
}

public class Report {
    private Formatter formatter;
    public Report(Formatter f) { this.formatter = f; }
    public String generate(String data) { return formatter.format(data); }
}

// BEFORE: verbose anonymous classes
Report upper = new Report(new Formatter() {
    @Override
    public String format(String text) {
        return text.toUpperCase();
    }
});

Report trimmed = new Report(new Formatter() {
    @Override
    public String format(String text) {
        return text.trim();
    }
});

Report reversed = new Report(new Formatter() {
    @Override
    public String format(String text) {
        return new StringBuilder(text).reverse().toString();
    }
});

// Refactor all three to use lambda expressions`,
      solution: `public interface Formatter {
    String format(String text);
}

public class Report {
    private Formatter formatter;
    public Report(Formatter f) { this.formatter = f; }
    public String generate(String data) { return formatter.format(data); }
}

Report upper = new Report(text -> text.toUpperCase());
Report trimmed = new Report(text -> text.trim());
Report reversed = new Report(text -> new StringBuilder(text).reverse().toString());`,
      hints: [
        'Formatter is a functional interface -- one abstract method.',
        'Replace each anonymous class with a lambda: text -> result.',
        'The lambda body contains the same logic as the original format method.',
      ],
      concepts: ['lambda-refactoring', 'functional-interface', 'anonymous-class'],
    },
  ],
};
