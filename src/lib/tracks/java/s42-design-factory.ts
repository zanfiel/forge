import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-factory',
  title: '42. Factory Pattern',
  explanation: `## Factory Pattern in Java

The **Factory** pattern provides an interface for creating objects without specifying their exact class. It decouples object creation from usage, making code more flexible and testable.

### Simple Factory

A single class with a method that decides which concrete class to instantiate:

\`\`\`java
public class ShapeFactory {
    public static Shape create(String type) {
        return switch (type) {
            case "circle" -> new Circle();
            case "square" -> new Square();
            default -> throw new IllegalArgumentException("Unknown: " + type);
        };
    }
}
\`\`\`

### Factory Method

A method in a base class that subclasses override to create different products:

\`\`\`java
public abstract class Document {
    public abstract Page createPage();

    public void addPage() {
        Page page = createPage();
        pages.add(page);
    }
}

public class Resume extends Document {
    @Override
    public Page createPage() {
        return new SkillsPage();
    }
}
\`\`\`

### Abstract Factory

A factory of factories -- creates families of related objects:

\`\`\`java
public interface UIFactory {
    Button createButton();
    TextField createTextField();
}

public class DarkThemeFactory implements UIFactory {
    public Button createButton() { return new DarkButton(); }
    public TextField createTextField() { return new DarkTextField(); }
}
\`\`\`

### Static Factory Methods

Named constructors that provide clarity and flexibility (from Effective Java):

\`\`\`java
public class Color {
    private final int r, g, b;

    private Color(int r, int g, int b) { this.r = r; this.g = g; this.b = b; }

    public static Color of(int r, int g, int b) { return new Color(r, g, b); }
    public static Color red() { return new Color(255, 0, 0); }
    public static Color fromHex(String hex) { /* parse */ }
}
\`\`\`

### Factory with Registry

Use a Map to register and retrieve factory functions dynamically:

\`\`\`java
Map<String, Supplier<Shape>> registry = new HashMap<>();
registry.put("circle", Circle::new);
registry.put("square", Square::new);

Shape shape = registry.get("circle").get();
\`\`\``,
  exercises: [
    {
      id: 'java-factory-1',
      title: 'Simple Factory Switch',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Complete the factory method to return a Circle when type is "circle".',
      skeleton: `public class ShapeFactory {
    public static Shape create(String type) {
        return switch (type) {
            case "circle" -> __BLANK__;
            case "square" -> new Square();
            default -> throw new IllegalArgumentException("Unknown: " + type);
        };
    }
}`,
      solution: `public class ShapeFactory {
    public static Shape create(String type) {
        return switch (type) {
            case "circle" -> new Circle();
            case "square" -> new Square();
            default -> throw new IllegalArgumentException("Unknown: " + type);
        };
    }
}`,
      hints: [
        'The factory creates a new instance of the appropriate class.',
        'For "circle", return a new Circle object.',
        'Use: new Circle()',
      ],
      concepts: ['simple-factory', 'switch-expression'],
    },
    {
      id: 'java-factory-2',
      title: 'Factory Method Override',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Override the factory method in the subclass to create a MySQLConnection.',
      skeleton: `public abstract class DatabaseFactory {
    public abstract Connection createConnection();
}

public class MySQLFactory extends DatabaseFactory {
    __BLANK__
    public Connection createConnection() {
        return new MySQLConnection();
    }
}`,
      solution: `public abstract class DatabaseFactory {
    public abstract Connection createConnection();
}

public class MySQLFactory extends DatabaseFactory {
    @Override
    public Connection createConnection() {
        return new MySQLConnection();
    }
}`,
      hints: [
        'When a subclass implements an abstract method, it should be annotated.',
        'The annotation signals that this method overrides a parent method.',
        'Use @Override.',
      ],
      concepts: ['factory-method', 'override-annotation'],
    },
    {
      id: 'java-factory-3',
      title: 'Static Factory Method Name',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Complete the static factory method that creates a Color from RGB values.',
      skeleton: `public class Color {
    private final int r, g, b;

    private Color(int r, int g, int b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    public static Color __BLANK__(int r, int g, int b) {
        return new Color(r, g, b);
    }
}`,
      solution: `public class Color {
    private final int r, g, b;

    private Color(int r, int g, int b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    public static Color of(int r, int g, int b) {
        return new Color(r, g, b);
    }
}`,
      hints: [
        'Static factory methods use descriptive names like "of", "from", "create".',
        'The convention for simple value creation is a short, common name.',
        'Use "of" -- as in Color.of(255, 0, 0).',
      ],
      concepts: ['static-factory-method', 'naming-conventions'],
    },
    {
      id: 'java-factory-4',
      title: 'Abstract Factory Interface',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Declare the abstract factory interface with methods to create Button and TextField.',
      skeleton: `public __BLANK__ UIFactory {
    Button createButton();
    TextField createTextField();
}`,
      solution: `public interface UIFactory {
    Button createButton();
    TextField createTextField();
}`,
      hints: [
        'An abstract factory is typically declared as a contract with multiple creation methods.',
        'In Java, this contract is defined using a specific keyword.',
        'Use "interface".',
      ],
      concepts: ['abstract-factory', 'interface'],
    },
    {
      id: 'java-factory-5',
      title: 'Registry with Supplier',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Register a factory function using a method reference.',
      skeleton: `import java.util.Map;
import java.util.HashMap;
import java.util.function.Supplier;

public class AnimalFactory {
    private static final Map<String, Supplier<Animal>> registry = new HashMap<>();

    static {
        registry.put("dog", __BLANK__);
        registry.put("cat", Cat::new);
    }

    public static Animal create(String type) {
        Supplier<Animal> supplier = registry.get(type);
        if (supplier == null) throw new IllegalArgumentException("Unknown: " + type);
        return supplier.get();
    }
}`,
      solution: `import java.util.Map;
import java.util.HashMap;
import java.util.function.Supplier;

public class AnimalFactory {
    private static final Map<String, Supplier<Animal>> registry = new HashMap<>();

    static {
        registry.put("dog", Dog::new);
        registry.put("cat", Cat::new);
    }

    public static Animal create(String type) {
        Supplier<Animal> supplier = registry.get(type);
        if (supplier == null) throw new IllegalArgumentException("Unknown: " + type);
        return supplier.get();
    }
}`,
      hints: [
        'A Supplier<Animal> is a function that takes no args and returns an Animal.',
        'A constructor reference for Dog would create a new Dog.',
        'Use Dog::new as the method reference.',
      ],
      concepts: ['factory-registry', 'supplier', 'method-reference'],
    },
    {
      id: 'java-factory-6',
      title: 'Factory Method Return Type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Complete the abstract factory method with the correct return type.',
      skeleton: `public abstract class NotificationFactory {
    public abstract __BLANK__ createNotification();

    public void send(String message) {
        Notification n = createNotification();
        n.setMessage(message);
        n.deliver();
    }
}

public class EmailNotificationFactory extends NotificationFactory {
    @Override
    public Notification createNotification() {
        return new EmailNotification();
    }
}`,
      solution: `public abstract class NotificationFactory {
    public abstract Notification createNotification();

    public void send(String message) {
        Notification n = createNotification();
        n.setMessage(message);
        n.deliver();
    }
}

public class EmailNotificationFactory extends NotificationFactory {
    @Override
    public Notification createNotification() {
        return new EmailNotification();
    }
}`,
      hints: [
        'The factory method returns a product type.',
        'Look at how the return value is used in send() -- it is assigned to a Notification.',
        'The return type is Notification.',
      ],
      concepts: ['factory-method', 'return-type', 'polymorphism'],
    },
    {
      id: 'java-factory-7',
      title: 'Write a Simple Factory',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a VehicleFactory with a static create method that returns Car, Truck, or Motorcycle based on a string type.',
      skeleton: `// Write VehicleFactory class
// static Vehicle create(String type)
// "car" -> new Car()
// "truck" -> new Truck()
// "motorcycle" -> new Motorcycle()
// default -> throw IllegalArgumentException`,
      solution: `public class VehicleFactory {
    public static Vehicle create(String type) {
        return switch (type) {
            case "car" -> new Car();
            case "truck" -> new Truck();
            case "motorcycle" -> new Motorcycle();
            default -> throw new IllegalArgumentException("Unknown vehicle: " + type);
        };
    }
}`,
      hints: [
        'Use a switch expression on the type parameter.',
        'Each case returns a new instance of the appropriate class.',
        'The default case should throw IllegalArgumentException.',
      ],
      concepts: ['simple-factory', 'switch-expression'],
    },
    {
      id: 'java-factory-8',
      title: 'Write a Factory Method Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write an abstract LoggerFactory with a createLogger factory method, and a FileLoggerFactory subclass.',
      skeleton: `// Write:
// 1. Abstract class LoggerFactory with:
//    - abstract Logger createLogger()
//    - void log(String msg) that calls createLogger().write(msg)
// 2. FileLoggerFactory extends LoggerFactory:
//    - createLogger() returns new FileLogger()`,
      solution: `public abstract class LoggerFactory {
    public abstract Logger createLogger();

    public void log(String msg) {
        Logger logger = createLogger();
        logger.write(msg);
    }
}

public class FileLoggerFactory extends LoggerFactory {
    @Override
    public Logger createLogger() {
        return new FileLogger();
    }
}`,
      hints: [
        'The base class declares an abstract method for creation.',
        'The concrete factory overrides it with a specific implementation.',
        'The log method uses the factory method internally.',
      ],
      concepts: ['factory-method', 'template-method', 'polymorphism'],
    },
    {
      id: 'java-factory-9',
      title: 'Write an Abstract Factory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a GUIFactory interface and a WindowsFactory implementation that creates WindowsButton and WindowsCheckbox.',
      skeleton: `// Write:
// 1. GUIFactory interface with: createButton(), createCheckbox()
// 2. WindowsFactory implements GUIFactory
//    - createButton() returns new WindowsButton()
//    - createCheckbox() returns new WindowsCheckbox()`,
      solution: `public interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

public class WindowsFactory implements GUIFactory {
    @Override
    public Button createButton() {
        return new WindowsButton();
    }

    @Override
    public Checkbox createCheckbox() {
        return new WindowsCheckbox();
    }
}`,
      hints: [
        'The interface declares creation methods for each product type.',
        'The concrete factory implements all methods with Windows-specific classes.',
        'Each method returns the interface type but instantiates a concrete class.',
      ],
      concepts: ['abstract-factory', 'product-families'],
    },
    {
      id: 'java-factory-10',
      title: 'Write Static Factory Methods',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a Money class with static factory methods: of(amount, currency), dollars(amount), and euros(amount).',
      skeleton: `// Write Money class with:
// - private final double amount, String currency
// - private constructor
// - public static Money of(double amount, String currency)
// - public static Money dollars(double amount) -> currency "USD"
// - public static Money euros(double amount) -> currency "EUR"`,
      solution: `public class Money {
    private final double amount;
    private final String currency;

    private Money(double amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }

    public static Money of(double amount, String currency) {
        return new Money(amount, currency);
    }

    public static Money dollars(double amount) {
        return new Money(amount, "USD");
    }

    public static Money euros(double amount) {
        return new Money(amount, "EUR");
    }
}`,
      hints: [
        'The constructor is private -- only static methods can create instances.',
        'of() is a general factory, dollars() and euros() are convenience factories.',
        'Each static method returns new Money(...) with appropriate parameters.',
      ],
      concepts: ['static-factory-method', 'named-constructors'],
    },
    {
      id: 'java-factory-11',
      title: 'Write a Factory with Registry',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a PluginFactory that uses a Map registry to dynamically register and create plugins.',
      skeleton: `import java.util.Map;
import java.util.HashMap;
import java.util.function.Supplier;

// Write PluginFactory with:
// - private static Map<String, Supplier<Plugin>> registry
// - public static void register(String name, Supplier<Plugin> creator)
// - public static Plugin create(String name) - looks up and invokes the supplier
// - Throws IllegalArgumentException if name not found`,
      solution: `import java.util.Map;
import java.util.HashMap;
import java.util.function.Supplier;

public class PluginFactory {
    private static final Map<String, Supplier<Plugin>> registry = new HashMap<>();

    public static void register(String name, Supplier<Plugin> creator) {
        registry.put(name, creator);
    }

    public static Plugin create(String name) {
        Supplier<Plugin> creator = registry.get(name);
        if (creator == null) {
            throw new IllegalArgumentException("Unknown plugin: " + name);
        }
        return creator.get();
    }
}`,
      hints: [
        'The registry maps String names to Supplier<Plugin> functions.',
        'register() adds to the map, create() looks up and invokes.',
        'Call supplier.get() to create the actual plugin instance.',
      ],
      concepts: ['factory-registry', 'supplier', 'open-closed-principle'],
    },
    {
      id: 'java-factory-12',
      title: 'Write a Parameterized Factory',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a factory that uses generics to create instances of any class with a no-arg constructor.',
      skeleton: `// Write GenericFactory with:
// public static <T> T create(Class<T> clazz)
// Uses clazz.getDeclaredConstructor().newInstance()
// Wraps ReflectiveOperationException in RuntimeException`,
      solution: `public class GenericFactory {
    public static <T> T create(Class<T> clazz) {
        try {
            return clazz.getDeclaredConstructor().newInstance();
        } catch (ReflectiveOperationException e) {
            throw new RuntimeException("Cannot create instance of " + clazz.getName(), e);
        }
    }
}`,
      hints: [
        'Use clazz.getDeclaredConstructor() to get the no-arg constructor.',
        'Call newInstance() on the constructor to create the object.',
        'Wrap checked exceptions in RuntimeException.',
      ],
      concepts: ['reflection-factory', 'generics', 'factory-pattern'],
    },
    {
      id: 'java-factory-13',
      title: 'Fix Missing Default Case',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'The factory has no default case, causing a compilation error with switch expression. Add a default.',
      skeleton: `public class DrinkFactory {
    public static Drink create(String type) {
        return switch (type) {
            case "coffee" -> new Coffee();
            case "tea" -> new Tea();
            // Missing default case -- won't compile with switch expression
        };
    }
}`,
      solution: `public class DrinkFactory {
    public static Drink create(String type) {
        return switch (type) {
            case "coffee" -> new Coffee();
            case "tea" -> new Tea();
            default -> throw new IllegalArgumentException("Unknown drink: " + type);
        };
    }
}`,
      hints: [
        'Switch expressions must be exhaustive.',
        'A default case handles all unmatched values.',
        'Add: default -> throw new IllegalArgumentException(...);',
      ],
      concepts: ['switch-expression', 'exhaustive-switch', 'error-handling'],
    },
    {
      id: 'java-factory-14',
      title: 'Fix Factory Returning Wrong Type',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'The factory returns concrete types instead of the interface type. Fix the return type.',
      skeleton: `public class PaymentFactory {
    public static CreditCardPayment create(String type) {
        return switch (type) {
            case "credit" -> new CreditCardPayment();
            case "debit" -> new DebitCardPayment();  // compile error!
            case "paypal" -> new PayPalPayment();     // compile error!
            default -> throw new IllegalArgumentException("Unknown: " + type);
        };
    }
}
// DebitCardPayment and PayPalPayment are not subtypes of CreditCardPayment`,
      solution: `public class PaymentFactory {
    public static Payment create(String type) {
        return switch (type) {
            case "credit" -> new CreditCardPayment();
            case "debit" -> new DebitCardPayment();
            case "paypal" -> new PayPalPayment();
            default -> throw new IllegalArgumentException("Unknown: " + type);
        };
    }
}`,
      hints: [
        'The return type is too specific -- it should be the common interface.',
        'All payment types implement a common Payment interface.',
        'Change the return type from CreditCardPayment to Payment.',
      ],
      concepts: ['polymorphism', 'interface-return-type', 'factory-pattern'],
    },
    {
      id: 'java-factory-15',
      title: 'Fix Abstract Factory Missing Method',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'The concrete factory does not implement all methods from the interface. Add the missing method.',
      skeleton: `public interface FurnitureFactory {
    Chair createChair();
    Table createTable();
    Sofa createSofa();
}

public class ModernFurnitureFactory implements FurnitureFactory {
    @Override
    public Chair createChair() { return new ModernChair(); }

    @Override
    public Table createTable() { return new ModernTable(); }

    // Missing: createSofa() -- won't compile!
}`,
      solution: `public interface FurnitureFactory {
    Chair createChair();
    Table createTable();
    Sofa createSofa();
}

public class ModernFurnitureFactory implements FurnitureFactory {
    @Override
    public Chair createChair() { return new ModernChair(); }

    @Override
    public Table createTable() { return new ModernTable(); }

    @Override
    public Sofa createSofa() { return new ModernSofa(); }
}`,
      hints: [
        'The interface declares three methods but the factory only implements two.',
        'A concrete class must implement all abstract interface methods.',
        'Add the missing createSofa() method.',
      ],
      concepts: ['abstract-factory', 'interface-implementation'],
    },
    {
      id: 'java-factory-16',
      title: 'Predict Simple Factory Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the class name of the object created by the factory.',
      skeleton: `public class ShapeFactory {
    public static Shape create(String type) {
        return switch (type) {
            case "circle" -> new Circle();
            case "square" -> new Square();
            default -> throw new IllegalArgumentException("Unknown");
        };
    }
}

Shape s = ShapeFactory.create("square");
System.out.println(s.getClass().getSimpleName());
// What is printed?`,
      solution: `Square`,
      hints: [
        'The factory creates a Square when "square" is passed.',
        'getClass().getSimpleName() returns the class name without the package.',
        'The output is "Square".',
      ],
      concepts: ['simple-factory', 'runtime-type'],
    },
    {
      id: 'java-factory-17',
      title: 'Predict Static Factory Caching',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict whether the cached static factory returns the same object.',
      skeleton: `public class BooleanWrapper {
    private static final BooleanWrapper TRUE = new BooleanWrapper(true);
    private static final BooleanWrapper FALSE = new BooleanWrapper(false);
    private final boolean value;

    private BooleanWrapper(boolean value) { this.value = value; }

    public static BooleanWrapper of(boolean value) {
        return value ? TRUE : FALSE;
    }
}

BooleanWrapper a = BooleanWrapper.of(true);
BooleanWrapper b = BooleanWrapper.of(true);
System.out.println(a == b);
// What is printed?`,
      solution: `true`,
      hints: [
        'The static factory caches instances as static final fields.',
        'of(true) always returns the same TRUE instance.',
        'Since both a and b reference the same object, a == b is true.',
      ],
      concepts: ['static-factory-caching', 'flyweight', 'reference-equality'],
    },
    {
      id: 'java-factory-18',
      title: 'Predict Registry Factory Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'What happens when creating an unregistered type from a registry factory?',
      skeleton: `Map<String, Supplier<Shape>> registry = new HashMap<>();
registry.put("circle", Circle::new);

Supplier<Shape> supplier = registry.get("triangle");
Shape shape = supplier.get();
// What exception is thrown?`,
      solution: `NullPointerException`,
      hints: [
        'registry.get("triangle") returns null since "triangle" is not registered.',
        'Calling .get() on null throws an exception.',
        'It is a NullPointerException because supplier is null.',
      ],
      concepts: ['factory-registry', 'null-safety'],
    },
    {
      id: 'java-factory-19',
      title: 'Refactor if-else Chain to Factory',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor an if-else chain for creating parsers into a clean factory method.',
      skeleton: `public class DataProcessor {
    public void process(String format, String data) {
        Parser parser;
        if (format.equals("json")) {
            parser = new JsonParser();
        } else if (format.equals("xml")) {
            parser = new XmlParser();
        } else if (format.equals("csv")) {
            parser = new CsvParser();
        } else {
            throw new IllegalArgumentException("Unknown format: " + format);
        }
        parser.parse(data);
    }
}
// Refactor: Extract a ParserFactory class`,
      solution: `public class ParserFactory {
    public static Parser create(String format) {
        return switch (format) {
            case "json" -> new JsonParser();
            case "xml" -> new XmlParser();
            case "csv" -> new CsvParser();
            default -> throw new IllegalArgumentException("Unknown format: " + format);
        };
    }
}

public class DataProcessor {
    public void process(String format, String data) {
        Parser parser = ParserFactory.create(format);
        parser.parse(data);
    }
}`,
      hints: [
        'Extract the creation logic into a separate factory class.',
        'Replace the if-else chain with a switch expression.',
        'DataProcessor now delegates to ParserFactory.create().',
      ],
      concepts: ['extract-factory', 'single-responsibility', 'refactoring'],
    },
    {
      id: 'java-factory-20',
      title: 'Refactor to Abstract Factory',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor two separate factory methods into an abstract factory that creates themed UI component families.',
      skeleton: `// BEFORE: separate creation methods mixed together
public class UICreator {
    public static Button createButton(String theme) {
        if (theme.equals("dark")) return new DarkButton();
        else return new LightButton();
    }

    public static Icon createIcon(String theme) {
        if (theme.equals("dark")) return new DarkIcon();
        else return new LightIcon();
    }
}

// Usage: passes "dark" everywhere
Button btn = UICreator.createButton("dark");
Icon icon = UICreator.createIcon("dark");

// Refactor into ThemeFactory interface with DarkThemeFactory and LightThemeFactory`,
      solution: `public interface ThemeFactory {
    Button createButton();
    Icon createIcon();
}

public class DarkThemeFactory implements ThemeFactory {
    @Override
    public Button createButton() { return new DarkButton(); }

    @Override
    public Icon createIcon() { return new DarkIcon(); }
}

public class LightThemeFactory implements ThemeFactory {
    @Override
    public Button createButton() { return new LightButton(); }

    @Override
    public Icon createIcon() { return new LightIcon(); }
}

// Usage: pick factory once, then create consistently
ThemeFactory factory = new DarkThemeFactory();
Button btn = factory.createButton();
Icon icon = factory.createIcon();`,
      hints: [
        'Create a ThemeFactory interface with createButton() and createIcon().',
        'Implement DarkThemeFactory and LightThemeFactory.',
        'The client picks a factory once and uses it for all components.',
      ],
      concepts: ['abstract-factory', 'product-families', 'refactoring'],
    },
  ],
};
