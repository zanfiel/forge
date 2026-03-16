import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-polymorphism',
  title: '12. Polymorphism',
  explanation: `## Polymorphism

Polymorphism allows objects to be treated as instances of their parent class.

### Runtime Polymorphism
Method calls are resolved at runtime based on the actual object type:
\`\`\`java
Animal a = new Dog();
a.speak(); // calls Dog's speak()
\`\`\`

### Upcasting and Downcasting
- **Upcasting** (implicit): \`Animal a = new Dog();\`
- **Downcasting** (explicit): \`Dog d = (Dog) a;\`
- Always check with \`instanceof\` before downcasting

### Covariant Return Types
Overriding methods can return a more specific type:
\`\`\`java
class Animal { Animal create() { return new Animal(); } }
class Dog extends Animal { @Override Dog create() { return new Dog(); } }
\`\`\`

### Liskov Substitution Principle (SOLID)
Subtypes must be substitutable for their base types without altering program correctness. A subclass should strengthen postconditions and weaken preconditions, never the reverse.
`,
  exercises: [
    {
      id: 'java-poly-1',
      title: 'Upcast assignment',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Assign a Dog to an Animal variable (upcasting).',
      skeleton: `class Animal { void speak() {} }
class Dog extends Animal { @Override void speak() { System.out.println("Woof"); } }

__BLANK__ a = new Dog();
a.speak();`,
      solution: `class Animal { void speak() {} }
class Dog extends Animal { @Override void speak() { System.out.println("Woof"); } }

Animal a = new Dog();
a.speak();`,
      hints: [
        'Upcasting uses the parent type for the variable.',
        'A Dog is-an Animal.',
        'Use `Animal`.',
      ],
      concepts: ['upcasting', 'polymorphism', 'type assignment'],
    },
    {
      id: 'java-poly-2',
      title: 'Downcast with instanceof',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Safely downcast using instanceof pattern matching.',
      skeleton: `Animal a = getDog();
if (a __BLANK__ Dog d) {
    d.fetch();
}`,
      solution: `Animal a = getDog();
if (a instanceof Dog d) {
    d.fetch();
}`,
      hints: [
        'You need to check the runtime type before casting.',
        'Pattern matching instanceof also binds the variable.',
        'Use `instanceof`.',
      ],
      concepts: ['instanceof', 'downcasting', 'pattern matching'],
    },
    {
      id: 'java-poly-3',
      title: 'Covariant return type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Use a covariant return type in the overriding method.',
      skeleton: `class Builder {
    Builder self() { return this; }
}

class AdvancedBuilder extends Builder {
    @Override
    __BLANK__ self() { return this; }
}`,
      solution: `class Builder {
    Builder self() { return this; }
}

class AdvancedBuilder extends Builder {
    @Override
    AdvancedBuilder self() { return this; }
}`,
      hints: [
        'The overriding method can return a more specific type.',
        'AdvancedBuilder is a subtype of Builder.',
        'Use `AdvancedBuilder`.',
      ],
      concepts: ['covariant return', 'method overriding', 'type specialization'],
    },
    {
      id: 'java-poly-4',
      title: 'Polymorphic method call',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Call a polymorphic method on each element of an array.',
      skeleton: `Shape[] shapes = {new Circle(5), new Square(4)};
for (Shape s : shapes) {
    System.out.println(s.__BLANK__());
}`,
      solution: `Shape[] shapes = {new Circle(5), new Square(4)};
for (Shape s : shapes) {
    System.out.println(s.area());
}`,
      hints: [
        'Each shape has its own implementation of this method.',
        'The correct version is called based on the actual type.',
        'Use `area`.',
      ],
      concepts: ['polymorphic dispatch', 'method call', 'dynamic binding'],
    },
    {
      id: 'java-poly-5',
      title: 'Explicit downcast',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Perform an explicit downcast from Object to String.',
      skeleton: `Object obj = "Hello";
String s = __BLANK__ obj;
System.out.println(s.length());`,
      solution: `Object obj = "Hello";
String s = (String) obj;
System.out.println(s.length());`,
      hints: [
        'Downcasting requires an explicit type cast.',
        'Place the target type in parentheses.',
        'Use `(String)`.',
      ],
      concepts: ['downcasting', 'explicit cast', 'ClassCastException risk'],
    },
    {
      id: 'java-poly-6',
      title: 'Generic polymorphic method',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a generic method that accepts any Comparable and returns the max.',
      skeleton: `public static <T __BLANK__ Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}`,
      solution: `public static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}`,
      hints: [
        'Bounded type parameters use extends even for interfaces.',
        'This constrains T to types that implement Comparable.',
        'Use `extends`.',
      ],
      concepts: ['bounded type', 'Comparable', 'generic method'],
    },
    {
      id: 'java-poly-7',
      title: 'Payment processor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a Payment base class and CreditCard/BankTransfer subclasses, each with a process(double amount) method.',
      skeleton: '',
      solution: `abstract class Payment {
    abstract String process(double amount);
}

class CreditCard extends Payment {
    private final String cardNumber;
    CreditCard(String cardNumber) { this.cardNumber = cardNumber; }
    
    @Override
    String process(double amount) {
        return "Charged $" + amount + " to card ending " + cardNumber.substring(cardNumber.length() - 4);
    }
}

class BankTransfer extends Payment {
    private final String accountId;
    BankTransfer(String accountId) { this.accountId = accountId; }
    
    @Override
    String process(double amount) {
        return "Transferred $" + amount + " from account " + accountId;
    }
}`,
      hints: [
        'Payment is abstract with an abstract process method.',
        'Each subclass provides its own implementation.',
        'The caller only needs a Payment reference.',
      ],
      concepts: ['abstract class', 'polymorphism', 'runtime dispatch'],
    },
    {
      id: 'java-poly-8',
      title: 'Polymorphic collection processing',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method totalArea(List<Shape> shapes) that sums all areas using polymorphism.',
      skeleton: '',
      solution: `public static double totalArea(java.util.List<Shape> shapes) {
    double total = 0;
    for (Shape s : shapes) {
        total += s.area();
    }
    return total;
}`,
      hints: [
        'Iterate over the list and call area() on each shape.',
        'Polymorphism ensures the correct area() is called.',
        'No instanceof checks needed.',
      ],
      concepts: ['polymorphic collection', 'iteration', 'dynamic dispatch'],
    },
    {
      id: 'java-poly-9',
      title: 'Safe casting utility',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method safeCast(Object obj, Class<T> type) that returns Optional<T>.',
      skeleton: '',
      solution: `@SuppressWarnings("unchecked")
public static <T> java.util.Optional<T> safeCast(Object obj, Class<T> type) {
    if (type.isInstance(obj)) {
        return java.util.Optional.of((T) obj);
    }
    return java.util.Optional.empty();
}`,
      hints: [
        'Use Class.isInstance() for runtime type checking.',
        'Return Optional.of() if the cast is safe.',
        'Return Optional.empty() otherwise.',
      ],
      concepts: ['safe casting', 'Optional', 'Class.isInstance', 'generics'],
    },
    {
      id: 'java-poly-10',
      title: 'Visitor pattern with polymorphism',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a simple double-dispatch with a Visitor interface and accept method on Shape.',
      skeleton: '',
      solution: `interface ShapeVisitor {
    double visit(Circle c);
    double visit(Rectangle r);
}

abstract class Shape {
    abstract double accept(ShapeVisitor v);
}

class Circle extends Shape {
    final double radius;
    Circle(double r) { this.radius = r; }
    @Override
    double accept(ShapeVisitor v) { return v.visit(this); }
}

class Rectangle extends Shape {
    final double w, h;
    Rectangle(double w, double h) { this.w = w; this.h = h; }
    @Override
    double accept(ShapeVisitor v) { return v.visit(this); }
}

class AreaCalculator implements ShapeVisitor {
    public double visit(Circle c) { return Math.PI * c.radius * c.radius; }
    public double visit(Rectangle r) { return r.w * r.h; }
}`,
      hints: [
        'Each Shape has accept(Visitor) that calls visitor.visit(this).',
        'This routes to the correct overloaded visit method.',
        'This is double dispatch: polymorphism on both shape and visitor.',
      ],
      concepts: ['visitor pattern', 'double dispatch', 'polymorphism'],
    },
    {
      id: 'java-poly-11',
      title: 'Liskov-compliant subclass',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a ReadOnlyList that extends java.util.AbstractList<String> and demonstrates Liskov compliance by correctly implementing all required methods.',
      skeleton: '',
      solution: `public class ReadOnlyList extends java.util.AbstractList<String> {
    private final String[] data;

    public ReadOnlyList(String... items) {
        this.data = items.clone();
    }

    @Override
    public String get(int index) {
        return data[index];
    }

    @Override
    public int size() {
        return data.length;
    }
}`,
      hints: [
        'AbstractList requires implementing get() and size().',
        'Modification operations throw UnsupportedOperationException by default.',
        'Clone the input array for safety.',
      ],
      concepts: ['Liskov substitution', 'AbstractList', 'contract compliance'],
    },
    {
      id: 'java-poly-12',
      title: 'Dynamic method resolution',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a Logger hierarchy (Logger -> FileLogger -> TimestampLogger) where each adds behavior via super calls.',
      skeleton: '',
      solution: `class Logger {
    void log(String message) {
        System.out.println(message);
    }
}

class FileLogger extends Logger {
    @Override
    void log(String message) {
        super.log("[FILE] " + message);
    }
}

class TimestampLogger extends FileLogger {
    @Override
    void log(String message) {
        super.log("[" + System.currentTimeMillis() + "] " + message);
    }
}`,
      hints: [
        'Each level adds its prefix and delegates to super.log().',
        'TimestampLogger -> FileLogger -> Logger.',
        'The message accumulates prefixes up the chain.',
      ],
      concepts: ['super', 'method chaining', 'decorator-like inheritance'],
    },
    {
      id: 'java-poly-13',
      title: 'ClassCastException',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the unsafe downcast that can throw ClassCastException.',
      skeleton: `public static void processAnimal(Animal a) {
    Dog d = (Dog) a;
    d.fetch();
}`,
      solution: `public static void processAnimal(Animal a) {
    if (a instanceof Dog d) {
        d.fetch();
    }
}`,
      hints: [
        'The animal might not be a Dog.',
        'Check with instanceof before casting.',
        'Pattern matching instanceof binds the variable automatically.',
      ],
      concepts: ['ClassCastException', 'instanceof', 'safe downcasting'],
    },
    {
      id: 'java-poly-14',
      title: 'Accidental overload',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the method that overloads instead of overrides due to a parameter type mismatch.',
      skeleton: `class Base {
    boolean equals(Base other) {
        return true;
    }
}`,
      solution: `class Base {
    @Override
    public boolean equals(Object other) {
        if (!(other instanceof Base)) return false;
        return true;
    }
    
    @Override
    public int hashCode() {
        return 1;
    }
}`,
      hints: [
        'equals(Base) overloads, not overrides Object.equals(Object).',
        'The parameter must be Object to properly override.',
        'Always add @Override to catch this mistake.',
      ],
      concepts: ['overloading vs overriding', 'equals contract', 'Object'],
    },
    {
      id: 'java-poly-15',
      title: 'Liskov violation',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Fix the Liskov violation where a Square subclass of Rectangle breaks setWidth/setHeight.',
      skeleton: `class Rectangle {
    protected int width, height;
    void setWidth(int w) { this.width = w; }
    void setHeight(int h) { this.height = h; }
    int area() { return width * height; }
}

class Square extends Rectangle {
    @Override
    void setWidth(int w) { this.width = w; this.height = w; }
    @Override
    void setHeight(int h) { this.width = h; this.height = h; }
}`,
      solution: `class Shape {
    abstract int area();
}

class Rectangle extends Shape {
    private final int width, height;
    Rectangle(int width, int height) { this.width = width; this.height = height; }
    int area() { return width * height; }
}

class Square extends Shape {
    private final int side;
    Square(int side) { this.side = side; }
    int area() { return side * side; }
}`,
      hints: [
        'Square extending Rectangle violates Liskov: setWidth without changing height breaks expectations.',
        'Use immutable shapes or make them siblings under Shape.',
        'Square and Rectangle can share a parent without inheriting mutators.',
      ],
      concepts: ['Liskov substitution', 'design violation', 'composition'],
    },
    {
      id: 'java-poly-16',
      title: 'Predict dynamic dispatch',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output of polymorphic method calls.',
      skeleton: `class A { String name() { return "A"; } }
class B extends A { @Override String name() { return "B"; } }
class C extends B { @Override String name() { return "C"; } }

A obj = new C();
System.out.println(obj.name());`,
      solution: `C`,
      hints: [
        'The variable type is A but the object is C.',
        'Method dispatch uses the runtime type.',
        'C.name() returns "C".',
      ],
      concepts: ['dynamic dispatch', 'runtime type', 'polymorphism'],
    },
    {
      id: 'java-poly-17',
      title: 'Predict instanceof chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict which instanceof checks pass.',
      skeleton: `class A {}
class B extends A {}
class C extends B {}

C obj = new C();
System.out.println(obj instanceof A);
System.out.println(obj instanceof B);
System.out.println(obj instanceof C);`,
      solution: `true
true
true`,
      hints: [
        'instanceof checks the entire inheritance chain.',
        'C is-a B, B is-a A.',
        'All three checks return true.',
      ],
      concepts: ['instanceof', 'inheritance chain', 'type hierarchy'],
    },
    {
      id: 'java-poly-18',
      title: 'Predict overload vs override',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Predict which method is called: overloaded or overridden.',
      skeleton: `class Parent {
    String greet(Object o) { return "Parent-Object"; }
    String greet(String s) { return "Parent-String"; }
}
class Child extends Parent {
    @Override String greet(Object o) { return "Child-Object"; }
}

Parent p = new Child();
System.out.println(p.greet("hi"));`,
      solution: `Parent-String`,
      hints: [
        'Overload resolution happens at compile time based on declared type.',
        'The compiler sees Parent.greet(String) as the best match.',
        'Child does not override greet(String), so Parent version runs.',
      ],
      concepts: ['overload resolution', 'compile-time vs runtime', 'method dispatch'],
    },
    {
      id: 'java-poly-19',
      title: 'Refactor switch to polymorphism',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Replace the type-based switch with polymorphic method calls.',
      skeleton: `String describe(Object obj) {
    if (obj instanceof Integer i) return "Integer: " + i;
    if (obj instanceof String s) return "String: " + s;
    if (obj instanceof Double d) return "Double: " + d;
    return "Unknown";
}`,
      solution: `interface Describable {
    String describe();
}

class DescribableInt implements Describable {
    private final int value;
    DescribableInt(int v) { this.value = v; }
    public String describe() { return "Integer: " + value; }
}

class DescribableString implements Describable {
    private final String value;
    DescribableString(String v) { this.value = v; }
    public String describe() { return "String: " + value; }
}

class DescribableDouble implements Describable {
    private final double value;
    DescribableDouble(double v) { this.value = v; }
    public String describe() { return "Double: " + value; }
}`,
      hints: [
        'Create a Describable interface with describe().',
        'Each type implements the interface.',
        'No instanceof checks needed with polymorphism.',
      ],
      concepts: ['polymorphism', 'interface', 'open-closed principle'],
    },
    {
      id: 'java-poly-20',
      title: 'Refactor to use base type',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor the method to accept the most general type possible.',
      skeleton: `public static void printAll(java.util.ArrayList<String> items) {
    for (String item : items) {
        System.out.println(item);
    }
}`,
      solution: `public static void printAll(Iterable<String> items) {
    for (String item : items) {
        System.out.println(item);
    }
}`,
      hints: [
        'The method only uses for-each, which needs Iterable.',
        'Using Iterable instead of ArrayList accepts any iterable collection.',
        'This follows the principle of programming to interfaces.',
      ],
      concepts: ['Iterable', 'program to interface', 'generalization'],
    },
  ],
};
