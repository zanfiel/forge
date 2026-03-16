import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-sealed-classes',
  title: '28. Sealed Classes',
  explanation: `## Sealed Classes

Sealed classes (Java 17) restrict which classes can extend or implement them.

### Basic Syntax
\`\`\`java
sealed class Shape permits Circle, Rectangle, Triangle {}
final class Circle extends Shape { double radius; }
final class Rectangle extends Shape { double w, h; }
non-sealed class Triangle extends Shape { double a, b, c; }
\`\`\`

### Modifiers for Subclasses
- \`final\` - no further subclassing
- \`sealed\` - restricts its own subclasses
- \`non-sealed\` - open for extension

### Sealed Interfaces
\`\`\`java
sealed interface Result<T> permits Success, Failure {}
record Success<T>(T value) implements Result<T> {}
record Failure<T>(String error) implements Result<T> {}
\`\`\`

### Pattern Matching with Sealed Types
\`\`\`java
String describe(Shape s) {
    return switch (s) {
        case Circle c -> "Circle r=" + c.radius;
        case Rectangle r -> "Rect " + r.w + "x" + r.h;
        case Triangle t -> "Triangle";
    }; // exhaustive - no default needed!
}
\`\`\`

### Benefits
- Compiler knows all subtypes (exhaustive switch)
- Better modeling of algebraic data types
- Combines well with records and pattern matching
`,
  exercises: [
    {
      id: 'java-seal-1',
      title: 'Declare a sealed class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare a sealed class that permits specific subtypes.',
      skeleton: `__BLANK__ class Vehicle permits Car, Truck, Motorcycle {}`,
      solution: `sealed class Vehicle permits Car, Truck, Motorcycle {}`,
      hints: ['Use the keyword that restricts subclassing.', 'Followed by permits clause.', 'Use `sealed`.'],
      concepts: ['sealed', 'permits', 'restricted hierarchy'],
    },
    {
      id: 'java-seal-2',
      title: 'Final subclass',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare a final subclass of a sealed class.',
      skeleton: `__BLANK__ class Car extends Vehicle {
    String model;
}`,
      solution: `final class Car extends Vehicle {
    String model;
}`,
      hints: ['Subclasses of sealed must be final, sealed, or non-sealed.', 'Final prevents further extension.', 'Use `final`.'],
      concepts: ['final subclass', 'sealed hierarchy', 'no extension'],
    },
    {
      id: 'java-seal-3',
      title: 'Non-sealed subclass',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Declare a non-sealed subclass that allows further extension.',
      skeleton: `__BLANK__ class Truck extends Vehicle {
    double payload;
}`,
      solution: `non-sealed class Truck extends Vehicle {
    double payload;
}`,
      hints: ['This modifier re-opens the class for extension.', 'It is a hyphenated keyword.', 'Use `non-sealed`.'],
      concepts: ['non-sealed', 'open extension', 'sealed hierarchy'],
    },
    {
      id: 'java-seal-4',
      title: 'Sealed interface',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Declare a sealed interface with record implementations.',
      skeleton: `__BLANK__ interface Result<T> permits Ok, Err {}
record Ok<T>(T value) implements Result<T> {}
record Err<T>(String message) implements Result<T> {}`,
      solution: `sealed interface Result<T> permits Ok, Err {}
record Ok<T>(T value) implements Result<T> {}
record Err<T>(String message) implements Result<T> {}`,
      hints: ['Interfaces can also be sealed.', 'Records are implicitly final.', 'Use `sealed`.'],
      concepts: ['sealed interface', 'record', 'algebraic data type'],
    },
    {
      id: 'java-seal-5',
      title: 'Exhaustive switch on sealed',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write an exhaustive switch expression on a sealed type.',
      skeleton: `String describe(Shape s) {
    return __BLANK__ (s) {
        case Circle c -> "Circle";
        case Rect r -> "Rectangle";
    };
}`,
      solution: `String describe(Shape s) {
    return switch (s) {
        case Circle c -> "Circle";
        case Rect r -> "Rectangle";
    };
}`,
      hints: ['Pattern matching switch works with sealed types.', 'No default needed if all subtypes are covered.', 'Use `switch`.'],
      concepts: ['exhaustive switch', 'pattern matching', 'sealed types'],
    },
    {
      id: 'java-seal-6',
      title: 'Permits clause',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Specify which classes are permitted to extend.',
      skeleton: `sealed class Animal __BLANK__ Dog, Cat, Bird {}`,
      solution: `sealed class Animal permits Dog, Cat, Bird {}`,
      hints: ['The clause lists allowed subclasses.', 'It follows the class name.', 'Use `permits`.'],
      concepts: ['permits', 'sealed class', 'allowed subtypes'],
    },
    {
      id: 'java-seal-7',
      title: 'Sealed with pattern matching',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a sealed interface Expr with record subtypes Num(int value) and Add(Expr left, Expr right), and an eval method using pattern matching.',
      skeleton: '',
      solution: `sealed interface Expr permits Num, Add {}
record Num(int value) implements Expr {}
record Add(Expr left, Expr right) implements Expr {}

static int eval(Expr expr) {
    return switch (expr) {
        case Num n -> n.value();
        case Add a -> eval(a.left()) + eval(a.right());
    };
}`,
      hints: ['Define a sealed interface with record implementations.', 'Use pattern matching switch for evaluation.', 'Add case is recursive.'],
      concepts: ['expression tree', 'pattern matching', 'recursion'],
    },
    {
      id: 'java-seal-8',
      title: 'Result type with sealed',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a sealed Result<T> type with Success(T value) and Failure(Exception error), and a map method.',
      skeleton: '',
      solution: `sealed interface Result<T> permits Success, Failure {
    default <R> Result<R> map(java.util.function.Function<T, R> fn) {
        return switch (this) {
            case Success<T> s -> new Success<>(fn.apply(s.value()));
            case Failure<T> f -> new Failure<>(f.error());
        };
    }
}

record Success<T>(T value) implements Result<T> {}
record Failure<T>(Exception error) implements Result<T> {}`,
      hints: ['Sealed interface with two record subtypes.', 'The map method transforms Success values.', 'Failure propagates unchanged.'],
      concepts: ['Result type', 'functor', 'pattern matching'],
    },
    {
      id: 'java-seal-9',
      title: 'State machine with sealed',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a sealed interface OrderState with records: Pending, Confirmed(String id), Shipped(String tracking), and Delivered.',
      skeleton: '',
      solution: `sealed interface OrderState permits Pending, Confirmed, Shipped, Delivered {}
record Pending() implements OrderState {}
record Confirmed(String orderId) implements OrderState {}
record Shipped(String trackingNumber) implements OrderState {}
record Delivered() implements OrderState {}

static String describeState(OrderState state) {
    return switch (state) {
        case Pending p -> "Order pending";
        case Confirmed c -> "Confirmed: " + c.orderId();
        case Shipped s -> "Shipped: " + s.trackingNumber();
        case Delivered d -> "Delivered";
    };
}`,
      hints: ['Each state is a record implementing the sealed interface.', 'Some states carry data, others do not.', 'Use exhaustive switch for state handling.'],
      concepts: ['state machine', 'sealed interface', 'algebraic data type'],
    },
    {
      id: 'java-seal-10',
      title: 'JSON node sealed hierarchy',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a sealed interface JsonValue with records: JsonString(String value), JsonNumber(double value), JsonBool(boolean value), and JsonNull.',
      skeleton: '',
      solution: `sealed interface JsonValue permits JsonString, JsonNumber, JsonBool, JsonNull {}
record JsonString(String value) implements JsonValue {}
record JsonNumber(double value) implements JsonValue {}
record JsonBool(boolean value) implements JsonValue {}
record JsonNull() implements JsonValue {}

static String toJson(JsonValue val) {
    return switch (val) {
        case JsonString s -> "\\"" + s.value() + "\\"";
        case JsonNumber n -> String.valueOf(n.value());
        case JsonBool b -> String.valueOf(b.value());
        case JsonNull ignored -> "null";
    };
}`,
      hints: ['Model JSON value types as a sealed hierarchy.', 'Each type is a record with appropriate data.', 'JsonNull carries no data.'],
      concepts: ['sealed hierarchy', 'JSON modeling', 'algebraic data type'],
    },
    {
      id: 'java-seal-11',
      title: 'Sealed with abstract method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a sealed abstract class Shape with an abstract area() method and final subclasses Circle and Square.',
      skeleton: '',
      solution: `sealed abstract class Shape permits Circle, Square {
    abstract double area();
}

final class Circle extends Shape {
    private final double radius;
    Circle(double radius) { this.radius = radius; }
    @Override double area() { return Math.PI * radius * radius; }
}

final class Square extends Shape {
    private final double side;
    Square(double side) { this.side = side; }
    @Override double area() { return side * side; }
}`,
      hints: ['Sealed classes can be abstract.', 'Subclasses must be final, sealed, or non-sealed.', 'Each subclass implements the abstract method.'],
      concepts: ['sealed abstract class', 'abstract method', 'final subclass'],
    },
    {
      id: 'java-seal-12',
      title: 'Visitor with sealed',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a type-safe visitor using sealed classes and switch, eliminating the need for a traditional visitor interface.',
      skeleton: '',
      solution: `sealed interface Animal permits Dog, Cat {}
record Dog(String name) implements Animal {}
record Cat(String name) implements Animal {}

static String speak(Animal animal) {
    return switch (animal) {
        case Dog d -> d.name() + " says Woof!";
        case Cat c -> c.name() + " says Meow!";
    };
}`,
      hints: ['Sealed types with switch replace the visitor pattern.', 'The switch is exhaustive over all subtypes.', 'No visitor interface or accept method needed.'],
      concepts: ['visitor pattern', 'exhaustive switch', 'sealed types'],
    },
    {
      id: 'java-seal-13',
      title: 'Missing permits clause',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the sealed class that does not compile due to missing permits.',
      skeleton: `sealed class Shape {} // Error: no permitted subtypes
final class Circle extends Shape {}`,
      solution: `sealed class Shape permits Circle {}
final class Circle extends Shape {}`,
      hints: ['Sealed classes must list permitted subtypes.', 'Use the permits clause after the class name.', 'List all direct subtypes.'],
      concepts: ['permits clause', 'sealed class', 'compilation error'],
    },
    {
      id: 'java-seal-14',
      title: 'Missing modifier on subclass',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the subclass that does not compile because it lacks the required modifier.',
      skeleton: `sealed class Animal permits Dog {}
class Dog extends Animal {} // Error: must be final, sealed, or non-sealed`,
      solution: `sealed class Animal permits Dog {}
final class Dog extends Animal {}`,
      hints: ['Subclasses of sealed must declare their extension policy.', 'Choose final, sealed, or non-sealed.', 'Final is simplest if no further extension is needed.'],
      concepts: ['subclass modifier', 'sealed', 'final'],
    },
    {
      id: 'java-seal-15',
      title: 'Unauthorized subclass',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the compilation error where an unpermitted class tries to extend a sealed type.',
      skeleton: `sealed class Transport permits Car, Bus {}
final class Car extends Transport {}
final class Bus extends Transport {}
final class Bike extends Transport {} // Error: not permitted`,
      solution: `sealed class Transport permits Car, Bus, Bike {}
final class Car extends Transport {}
final class Bus extends Transport {}
final class Bike extends Transport {}`,
      hints: ['All subclasses must be listed in permits.', 'Add Bike to the permits clause.', 'Update the sealed class declaration.'],
      concepts: ['permits clause', 'unauthorized subclass', 'sealed'],
    },
    {
      id: 'java-seal-16',
      title: 'Predict exhaustive switch',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict whether this switch is exhaustive.',
      skeleton: `sealed interface Light permits Red, Yellow, Green {}
record Red() implements Light {}
record Yellow() implements Light {}
record Green() implements Light {}

String action(Light light) {
    return switch (light) {
        case Red r -> "Stop";
        case Yellow y -> "Caution";
        case Green g -> "Go";
    }; // Does this compile without default?
}
System.out.println(action(new Green()));`,
      solution: `Go`,
      hints: ['The switch covers all permitted subtypes.', 'No default needed for exhaustive sealed types.', 'Green matches the third case.'],
      concepts: ['exhaustive switch', 'sealed types', 'pattern matching'],
    },
    {
      id: 'java-seal-17',
      title: 'Predict sealed with non-sealed',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict whether a non-sealed subclass can be further extended.',
      skeleton: `sealed class A permits B {}
non-sealed class B extends A {}
class C extends B {} // Does this compile?
System.out.println(new C() instanceof A);`,
      solution: `true`,
      hints: ['non-sealed allows further extension.', 'C can extend B freely.', 'C is an instanceof A through B.'],
      concepts: ['non-sealed', 'inheritance chain', 'instanceof'],
    },
    {
      id: 'java-seal-18',
      title: 'Predict record with sealed',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict if records need a modifier for sealed interfaces.',
      skeleton: `sealed interface Pair<A, B> permits TypedPair {}
record TypedPair<A, B>(A first, B second) implements Pair<A, B> {}
// Does TypedPair need 'final'?
System.out.println(new TypedPair<>("a", 1));`,
      solution: `TypedPair[first=a, second=1]`,
      hints: ['Records are implicitly final.', 'No explicit final modifier needed.', 'toString is auto-generated by the record.'],
      concepts: ['record implicit final', 'sealed interface', 'toString'],
    },
    {
      id: 'java-seal-19',
      title: 'Refactor instanceof chain to sealed switch',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this instanceof chain to a pattern matching switch.',
      skeleton: `// Assuming: sealed interface Shape permits Circle, Rect
String describe(Shape s) {
    if (s instanceof Circle c) {
        return "Circle r=" + c.radius();
    } else if (s instanceof Rect r) {
        return "Rect " + r.w() + "x" + r.h();
    } else {
        throw new IllegalStateException();
    }
}`,
      solution: `String describe(Shape s) {
    return switch (s) {
        case Circle c -> "Circle r=" + c.radius();
        case Rect r -> "Rect " + r.w() + "x" + r.h();
    };
}`,
      hints: ['Sealed types enable exhaustive switch.', 'No else/default needed if all types are covered.', 'Switch expressions are more concise.'],
      concepts: ['pattern matching switch', 'sealed', 'refactoring'],
    },
    {
      id: 'java-seal-20',
      title: 'Refactor enum to sealed records',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor this enum with data to sealed records for type-safe variant data.',
      skeleton: `enum Event {
    CLICK, KEY_PRESS, SCROLL;
    int x, y;      // only used by CLICK
    char key;      // only used by KEY_PRESS
    int delta;     // only used by SCROLL
}`,
      solution: `sealed interface Event permits Click, KeyPress, Scroll {}
record Click(int x, int y) implements Event {}
record KeyPress(char key) implements Event {}
record Scroll(int delta) implements Event {}`,
      hints: ['Enums with variant data are a code smell.', 'Sealed records give each variant its own typed fields.', 'Each event type carries only its relevant data.'],
      concepts: ['sealed records', 'enum to sealed', 'variant types'],
    },
  ],
};
