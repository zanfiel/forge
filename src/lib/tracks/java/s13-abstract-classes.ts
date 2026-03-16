import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-abstract-classes',
  title: '13. Abstract Classes',
  explanation: `## Abstract Classes

Abstract classes cannot be instantiated directly. They define a template for subclasses.

### Declaration
\`\`\`java
public abstract class Shape {
    abstract double area();       // no body
    double perimeter() { return 0; } // concrete method
}
\`\`\`

### Rules
- Cannot instantiate with \`new\`
- Can have abstract and concrete methods
- Can have fields, constructors, static methods
- A subclass must implement all abstract methods or be abstract itself
- Can have any access modifier on methods

### Abstract vs Interface
| Feature | Abstract Class | Interface |
|---------|---------------|-----------|
| Inheritance | Single | Multiple |
| Fields | Any | Constants only |
| Constructors | Yes | No |
| Access modifiers | Any | public (default) |

### Template Method Pattern
Abstract classes are ideal for the template method pattern: define the algorithm skeleton in a base class, let subclasses fill in specific steps.
`,
  exercises: [
    {
      id: 'java-abstract-1',
      title: 'Abstract class declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare an abstract class.',
      skeleton: `public __BLANK__ class Vehicle {
    abstract void start();
}`,
      solution: `public abstract class Vehicle {
    abstract void start();
}`,
      hints: ['The keyword prevents instantiation.', 'It indicates the class may have unimplemented methods.', 'Use `abstract`.'],
      concepts: ['abstract class', 'declaration'],
    },
    {
      id: 'java-abstract-2',
      title: 'Abstract method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare an abstract method with no body.',
      skeleton: `public abstract class Animal {
    __BLANK__ String speak();
}`,
      solution: `public abstract class Animal {
    abstract String speak();
}`,
      hints: ['Abstract methods have no body.', 'They end with a semicolon.', 'Use `abstract`.'],
      concepts: ['abstract method', 'no body', 'semicolon'],
    },
    {
      id: 'java-abstract-3',
      title: 'Concrete method in abstract class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Add a concrete method to an abstract class.',
      skeleton: `public abstract class Shape {
    abstract double area();
    
    public String describe() {
        __BLANK__ getClass().getSimpleName() + ": area=" + area();
    }
}`,
      solution: `public abstract class Shape {
    abstract double area();
    
    public String describe() {
        return getClass().getSimpleName() + ": area=" + area();
    }
}`,
      hints: ['Concrete methods need to return a value.', 'Use the return keyword.', 'Use `return`.'],
      concepts: ['concrete method', 'abstract class', 'mixed methods'],
    },
    {
      id: 'java-abstract-4',
      title: 'Implement abstract method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Implement the abstract method in a concrete subclass.',
      skeleton: `abstract class Converter {
    abstract double convert(double value);
}

class CelsiusToFahrenheit __BLANK__ Converter {
    @Override
    double convert(double value) {
        return value * 9.0 / 5.0 + 32;
    }
}`,
      solution: `abstract class Converter {
    abstract double convert(double value);
}

class CelsiusToFahrenheit extends Converter {
    @Override
    double convert(double value) {
        return value * 9.0 / 5.0 + 32;
    }
}`,
      hints: ['Subclasses use the extends keyword.', 'They must implement all abstract methods.', 'Use `extends`.'],
      concepts: ['extends', 'implementing abstract methods'],
    },
    {
      id: 'java-abstract-5',
      title: 'Abstract class with constructor',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Call the abstract class constructor from a subclass.',
      skeleton: `abstract class Named {
    final String name;
    Named(String name) { this.name = name; }
}

class Tool extends Named {
    Tool(String name) { __BLANK__(name); }
}`,
      solution: `abstract class Named {
    final String name;
    Named(String name) { this.name = name; }
}

class Tool extends Named {
    Tool(String name) { super(name); }
}`,
      hints: ['Call the parent constructor with super.', 'Must be the first statement.', 'Use `super`.'],
      concepts: ['abstract constructor', 'super()', 'initialization'],
    },
    {
      id: 'java-abstract-6',
      title: 'Protected abstract method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Declare a protected abstract hook method.',
      skeleton: `public abstract class Validator {
    public final boolean validate(String input) {
        return input != null && isValid(input);
    }
    
    __BLANK__ abstract boolean isValid(String input);
}`,
      solution: `public abstract class Validator {
    public final boolean validate(String input) {
        return input != null && isValid(input);
    }
    
    protected abstract boolean isValid(String input);
}`,
      hints: ['The hook should be visible to subclasses but not public.', 'Use the access modifier between public and private.', 'Use `protected`.'],
      concepts: ['protected', 'hook method', 'template method'],
    },
    {
      id: 'java-abstract-7',
      title: 'Shape hierarchy',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write abstract Shape with area()/perimeter(), then Circle and Triangle implementations.',
      skeleton: '',
      solution: `abstract class Shape {
    abstract double area();
    abstract double perimeter();
}

class Circle extends Shape {
    private final double radius;
    Circle(double radius) { this.radius = radius; }
    @Override double area() { return Math.PI * radius * radius; }
    @Override double perimeter() { return 2 * Math.PI * radius; }
}

class Triangle extends Shape {
    private final double a, b, c;
    Triangle(double a, double b, double c) { this.a = a; this.b = b; this.c = c; }
    @Override double area() {
        double s = (a + b + c) / 2;
        return Math.sqrt(s * (s-a) * (s-b) * (s-c));
    }
    @Override double perimeter() { return a + b + c; }
}`,
      hints: ['Shape defines the contract.', 'Circle uses pi*r^2 and 2*pi*r.', 'Triangle uses Heron\'s formula for area.'],
      concepts: ['abstract class', 'area', 'perimeter', 'Heron formula'],
    },
    {
      id: 'java-abstract-8',
      title: 'Template method - report generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write an abstract ReportGenerator with template method generate() calling header(), body(), footer().',
      skeleton: '',
      solution: `abstract class ReportGenerator {
    public final String generate() {
        return header() + "\\n" + body() + "\\n" + footer();
    }
    protected abstract String header();
    protected abstract String body();
    protected String footer() { return "--- End ---"; }
}

class SalesReport extends ReportGenerator {
    @Override protected String header() { return "=== Sales Report ==="; }
    @Override protected String body() { return "Total: $10,000"; }
}`,
      hints: ['generate() is final so subclasses cannot change the algorithm.', 'header/body are abstract hooks.', 'footer has a default implementation.'],
      concepts: ['template method', 'final method', 'hook methods'],
    },
    {
      id: 'java-abstract-9',
      title: 'Abstract collection',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write abstract Container<T> with abstract add/get/size, then ArrayContainer implementation.',
      skeleton: '',
      solution: `abstract class Container<T> {
    abstract void add(T item);
    abstract T get(int index);
    abstract int size();
    boolean isEmpty() { return size() == 0; }
}

class ArrayContainer<T> extends Container<T> {
    private final Object[] data;
    private int count = 0;
    
    ArrayContainer(int capacity) { data = new Object[capacity]; }
    
    @Override void add(T item) { data[count++] = item; }
    @Override @SuppressWarnings("unchecked") T get(int index) { return (T) data[index]; }
    @Override int size() { return count; }
}`,
      hints: ['Use generics for type safety.', 'isEmpty() can be a concrete method using size().', 'ArrayContainer stores items in an Object array.'],
      concepts: ['abstract generic class', 'concrete methods', 'template'],
    },
    {
      id: 'java-abstract-10',
      title: 'Abstract game entity',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write abstract GameEntity with position and abstract update()/render() methods, then Player and Enemy.',
      skeleton: '',
      solution: `abstract class GameEntity {
    protected int x, y;
    GameEntity(int x, int y) { this.x = x; this.y = y; }
    abstract void update();
    abstract String render();
}

class Player extends GameEntity {
    Player(int x, int y) { super(x, y); }
    @Override void update() { y -= 1; }
    @Override String render() { return "P@(" + x + "," + y + ")"; }
}

class Enemy extends GameEntity {
    Enemy(int x, int y) { super(x, y); }
    @Override void update() { y += 1; }
    @Override String render() { return "E@(" + x + "," + y + ")"; }
}`,
      hints: ['GameEntity holds common position state.', 'update() changes position.', 'render() returns a string representation.'],
      concepts: ['abstract class', 'game entity', 'inheritance'],
    },
    {
      id: 'java-abstract-11',
      title: 'Abstract with static factory',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write an abstract Sorter with sort() method and a static factory of(String algorithm) returning the correct subclass.',
      skeleton: '',
      solution: `abstract class Sorter {
    abstract int[] sort(int[] arr);
    
    static Sorter of(String algorithm) {
        return switch (algorithm.toLowerCase()) {
            case "bubble" -> new BubbleSorter();
            case "selection" -> new SelectionSorter();
            default -> throw new IllegalArgumentException("Unknown: " + algorithm);
        };
    }
}

class BubbleSorter extends Sorter {
    @Override int[] sort(int[] arr) {
        int[] a = arr.clone();
        for (int i = 0; i < a.length; i++)
            for (int j = 0; j < a.length - 1 - i; j++)
                if (a[j] > a[j+1]) { int t = a[j]; a[j] = a[j+1]; a[j+1] = t; }
        return a;
    }
}

class SelectionSorter extends Sorter {
    @Override int[] sort(int[] arr) {
        int[] a = arr.clone();
        for (int i = 0; i < a.length; i++) {
            int min = i;
            for (int j = i+1; j < a.length; j++) if (a[j] < a[min]) min = j;
            int t = a[i]; a[i] = a[min]; a[min] = t;
        }
        return a;
    }
}`,
      hints: ['Static factory methods can live in abstract classes.', 'Each algorithm is a different subclass.', 'Clone the array to avoid mutation.'],
      concepts: ['static factory', 'abstract class', 'strategy selection'],
    },
    {
      id: 'java-abstract-12',
      title: 'Abstract middleware chain',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write an abstract Middleware with next field and abstract process(String), then LoggingMiddleware and AuthMiddleware.',
      skeleton: '',
      solution: `abstract class Middleware {
    protected Middleware next;
    
    Middleware setNext(Middleware next) {
        this.next = next;
        return next;
    }
    
    abstract String process(String request);
    
    protected String forward(String request) {
        return next != null ? next.process(request) : request;
    }
}

class LoggingMiddleware extends Middleware {
    @Override String process(String request) {
        System.out.println("LOG: " + request);
        return forward(request);
    }
}

class AuthMiddleware extends Middleware {
    @Override String process(String request) {
        if (!request.contains("auth")) return "Unauthorized";
        return forward("[auth] " + request);
    }
}`,
      hints: ['Each middleware processes and optionally forwards to next.', 'The chain is built by linking middlewares.', 'forward() handles the null check.'],
      concepts: ['chain of responsibility', 'abstract class', 'middleware'],
    },
    {
      id: 'java-abstract-13',
      title: 'Instantiating abstract class',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the code that tries to instantiate an abstract class directly.',
      skeleton: `abstract class Shape {
    abstract double area();
}

Shape s = new Shape();`,
      solution: `abstract class Shape {
    abstract double area();
}

Shape s = new Shape() {
    @Override double area() { return 0; }
};`,
      hints: ['Abstract classes cannot be instantiated with new.', 'Use an anonymous subclass or a named concrete subclass.', 'Anonymous class provides the implementation inline.'],
      concepts: ['abstract instantiation', 'anonymous class', 'compilation error'],
    },
    {
      id: 'java-abstract-14',
      title: 'Forgot to implement abstract method',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the concrete class that does not implement all abstract methods.',
      skeleton: `abstract class Printer {
    abstract void print(String msg);
    abstract void clear();
}

class ConsolePrinter extends Printer {
    @Override
    void print(String msg) {
        System.out.println(msg);
    }
}`,
      solution: `abstract class Printer {
    abstract void print(String msg);
    abstract void clear();
}

class ConsolePrinter extends Printer {
    @Override
    void print(String msg) {
        System.out.println(msg);
    }
    
    @Override
    void clear() {
        System.out.print("\\033[H\\033[2J");
    }
}`,
      hints: ['ConsolePrinter must implement ALL abstract methods.', 'clear() is missing.', 'Add the clear() implementation.'],
      concepts: ['abstract method implementation', 'compilation error'],
    },
    {
      id: 'java-abstract-15',
      title: 'Wrong abstract modifier placement',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the abstract method that has a body.',
      skeleton: `abstract class Calculator {
    abstract double compute(double a, double b) {
        return a + b;
    }
}`,
      solution: `abstract class Calculator {
    abstract double compute(double a, double b);
}`,
      hints: ['Abstract methods cannot have a body.', 'Remove the body and end with a semicolon.', 'Or remove abstract and keep the body.'],
      concepts: ['abstract method', 'no body', 'syntax error'],
    },
    {
      id: 'java-abstract-16',
      title: 'Predict abstract call',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output of calling a concrete method that calls abstract methods.',
      skeleton: `abstract class Greeter {
    abstract String greeting();
    void greet() { System.out.println(greeting() + " World"); }
}
class HelloGreeter extends Greeter {
    @Override String greeting() { return "Hello"; }
}
new HelloGreeter().greet();`,
      solution: `Hello World`,
      hints: ['greet() calls greeting() which is overridden.', 'HelloGreeter.greeting() returns "Hello".', 'Result: "Hello" + " World".'],
      concepts: ['abstract method call', 'template method', 'polymorphism'],
    },
    {
      id: 'java-abstract-17',
      title: 'Predict abstract hierarchy',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the behavior of a partially-abstract hierarchy.',
      skeleton: `abstract class A { abstract int value(); }
abstract class B extends A { int value() { return 10; } abstract int bonus(); }
class C extends B { @Override int bonus() { return 5; } }
C c = new C();
System.out.println(c.value() + c.bonus());`,
      solution: `15`,
      hints: ['B provides value() = 10 but leaves bonus() abstract.', 'C provides bonus() = 5.', '10 + 5 = 15.'],
      concepts: ['partial implementation', 'abstract chain', 'concrete override'],
    },
    {
      id: 'java-abstract-18',
      title: 'Predict constructor in abstract',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output of abstract class constructor execution.',
      skeleton: `abstract class Base {
    Base() { System.out.print("Base "); init(); }
    abstract void init();
}
class Derived extends Base {
    String msg = "ready";
    @Override void init() { System.out.print(msg + " "); }
}
new Derived();`,
      solution: `Base null `,
      hints: ['Base constructor runs before Derived fields are initialized.', 'When init() is called, msg is still null.', 'This is a common pitfall with calling overridable methods in constructors.'],
      concepts: ['constructor order', 'overridable in constructor', 'null field'],
    },
    {
      id: 'java-abstract-19',
      title: 'Refactor to abstract class',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor duplicate code into an abstract base class.',
      skeleton: `class JsonExporter {
    String export(String data) {
        String header = "JSON Export\\n";
        String body = "{data: " + data + "}";
        return header + body;
    }
}

class XmlExporter {
    String export(String data) {
        String header = "XML Export\\n";
        String body = "<data>" + data + "</data>";
        return header + body;
    }
}`,
      solution: `abstract class Exporter {
    final String export(String data) {
        return header() + "\\n" + formatBody(data);
    }
    protected abstract String header();
    protected abstract String formatBody(String data);
}

class JsonExporter extends Exporter {
    @Override protected String header() { return "JSON Export"; }
    @Override protected String formatBody(String data) { return "{data: " + data + "}"; }
}

class XmlExporter extends Exporter {
    @Override protected String header() { return "XML Export"; }
    @Override protected String formatBody(String data) { return "<data>" + data + "</data>"; }
}`,
      hints: ['The export() algorithm is the same; only header and body formatting differ.', 'Extract the algorithm to an abstract base class.', 'Make the varying parts abstract methods.'],
      concepts: ['template method', 'abstract class', 'DRY', 'refactoring'],
    },
    {
      id: 'java-abstract-20',
      title: 'Refactor concrete to abstract',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor a concrete class with empty method bodies into a proper abstract class.',
      skeleton: `class Notifier {
    void send(String message) { /* subclass should override */ }
    String format(String message) { return message; /* subclass should override */ }
    
    void notify(String message) {
        String formatted = format(message);
        send(formatted);
    }
}`,
      solution: `abstract class Notifier {
    protected abstract void send(String message);
    protected abstract String format(String message);
    
    public final void notify(String message) {
        String formatted = format(message);
        send(formatted);
    }
}`,
      hints: ['Methods with "should override" comments should be abstract.', 'Make the class abstract.', 'Make notify() final to prevent overriding the algorithm.'],
      concepts: ['abstract methods', 'final template', 'refactoring'],
    },
  ],
};
