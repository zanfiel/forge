import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-inheritance',
  title: '11. Inheritance',
  explanation: `## Inheritance

Inheritance allows a class to acquire the properties and methods of another class.

### extends
\`\`\`java
public class Dog extends Animal {
    // inherits Animal's fields and methods
}
\`\`\`

### super
- \`super()\`: call parent constructor (must be first statement)
- \`super.method()\`: call parent's version of a method

### Method Overriding
\`\`\`java
@Override
public String toString() {
    return "Dog: " + name;
}
\`\`\`
- Same signature as parent method
- Cannot reduce visibility
- Use \`@Override\` annotation

### final
- \`final class\`: cannot be extended
- \`final method\`: cannot be overridden

### The Object Class
Every class implicitly extends Object, which provides:
- \`toString()\`, \`equals()\`, \`hashCode()\`
- \`getClass()\`, \`clone()\`, \`finalize()\`
`,
  exercises: [
    {
      id: 'java-inherit-1',
      title: 'Extend a class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Make Dog extend Animal.',
      skeleton: `class Animal {
    String name;
}

class Dog __BLANK__ Animal {
    String breed;
}`,
      solution: `class Animal {
    String name;
}

class Dog extends Animal {
    String breed;
}`,
      hints: [
        'Java uses a keyword to indicate inheritance.',
        'It means "is a subclass of".',
        'Use `extends`.',
      ],
      concepts: ['extends', 'inheritance', 'subclass'],
    },
    {
      id: 'java-inherit-2',
      title: 'Call super constructor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Call the parent constructor from the child constructor.',
      skeleton: `class Vehicle {
    String type;
    Vehicle(String type) { this.type = type; }
}

class Car extends Vehicle {
    int seats;
    Car(int seats) {
        __BLANK__("car");
        this.seats = seats;
    }
}`,
      solution: `class Vehicle {
    String type;
    Vehicle(String type) { this.type = type; }
}

class Car extends Vehicle {
    int seats;
    Car(int seats) {
        super("car");
        this.seats = seats;
    }
}`,
      hints: [
        'The parent constructor must be called first.',
        'Use the keyword that refers to the parent class.',
        'Use `super`.',
      ],
      concepts: ['super()', 'constructor chaining', 'parent constructor'],
    },
    {
      id: 'java-inherit-3',
      title: 'Override annotation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Add the annotation that indicates method overriding.',
      skeleton: `class Shape {
    double area() { return 0; }
}

class Circle extends Shape {
    double radius;
    __BLANK__
    double area() { return Math.PI * radius * radius; }
}`,
      solution: `class Shape {
    double area() { return 0; }
}

class Circle extends Shape {
    double radius;
    @Override
    double area() { return Math.PI * radius * radius; }
}`,
      hints: [
        'This annotation ensures the method actually overrides a parent method.',
        'It helps catch typos in method names at compile time.',
        'Use `@Override`.',
      ],
      concepts: ['@Override', 'method overriding', 'annotation'],
    },
    {
      id: 'java-inherit-4',
      title: 'Final method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Prevent a method from being overridden.',
      skeleton: `class Base {
    __BLANK__ void criticalMethod() {
        System.out.println("Cannot override this");
    }
}`,
      solution: `class Base {
    final void criticalMethod() {
        System.out.println("Cannot override this");
    }
}`,
      hints: [
        'A keyword prevents subclasses from overriding.',
        'Same keyword used for constants and final classes.',
        'Use `final`.',
      ],
      concepts: ['final method', 'preventing override'],
    },
    {
      id: 'java-inherit-5',
      title: 'Call super method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Call the parent version of the toString method within an override.',
      skeleton: `class Animal {
    String name;
    @Override
    public String toString() { return "Animal:" + name; }
}

class Cat extends Animal {
    @Override
    public String toString() {
        return __BLANK__.toString() + " (Cat)";
    }
}`,
      solution: `class Animal {
    String name;
    @Override
    public String toString() { return "Animal:" + name; }
}

class Cat extends Animal {
    @Override
    public String toString() {
        return super.toString() + " (Cat)";
    }
}`,
      hints: [
        'To call the parent version of an overridden method.',
        'Use the keyword that references the parent class.',
        'Use `super`.',
      ],
      concepts: ['super.method()', 'method overriding', 'parent method call'],
    },
    {
      id: 'java-inherit-6',
      title: 'Override equals',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Complete the equals method parameter type from Object.',
      skeleton: `@Override
public boolean equals(__BLANK__ obj) {
    if (this == obj) return true;
    if (!(obj instanceof Point p)) return false;
    return this.x == p.x && this.y == p.y;
}`,
      solution: `@Override
public boolean equals(Object obj) {
    if (this == obj) return true;
    if (!(obj instanceof Point p)) return false;
    return this.x == p.x && this.y == p.y;
}`,
      hints: [
        'The equals method from Object takes a general type.',
        'It must match the signature from java.lang.Object.',
        'Use `Object`.',
      ],
      concepts: ['equals', 'Object parameter', 'method overriding'],
    },
    {
      id: 'java-inherit-7',
      title: 'Shape hierarchy',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a Shape base class with abstract area() and a Rectangle subclass that implements it.',
      skeleton: '',
      solution: `abstract class Shape {
    abstract double area();

    @Override
    public String toString() {
        return getClass().getSimpleName() + ": area=" + area();
    }
}

class Rectangle extends Shape {
    private final double width, height;

    Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    double area() {
        return width * height;
    }
}`,
      hints: [
        'Shape should be abstract with an abstract area() method.',
        'Rectangle extends Shape and provides a concrete area().',
        'Use @Override annotation.',
      ],
      concepts: ['abstract class', 'inheritance', 'method overriding'],
    },
    {
      id: 'java-inherit-8',
      title: 'Override toString, equals, hashCode',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a Book class with title and author, overriding toString, equals, and hashCode.',
      skeleton: '',
      solution: `public class Book {
    private final String title;
    private final String author;

    public Book(String title, String author) {
        this.title = title;
        this.author = author;
    }

    @Override
    public String toString() {
        return "Book{title='" + title + "', author='" + author + "'}";
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Book b)) return false;
        return title.equals(b.title) && author.equals(b.author);
    }

    @Override
    public int hashCode() {
        return java.util.Objects.hash(title, author);
    }
}`,
      hints: [
        'Override all three methods from Object.',
        'equals should check instanceof and compare fields.',
        'hashCode should be consistent with equals.',
      ],
      concepts: ['toString', 'equals', 'hashCode', 'Object methods'],
    },
    {
      id: 'java-inherit-9',
      title: 'Employee hierarchy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write Employee base class with name and salary, then Manager subclass with a bonus field. Override a computePay() method.',
      skeleton: '',
      solution: `class Employee {
    protected String name;
    protected double salary;

    Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    double computePay() {
        return salary;
    }
}

class Manager extends Employee {
    private double bonus;

    Manager(String name, double salary, double bonus) {
        super(name, salary);
        this.bonus = bonus;
    }

    @Override
    double computePay() {
        return super.computePay() + bonus;
    }
}`,
      hints: [
        'Manager extends Employee and adds a bonus.',
        'Call super constructor and super.computePay().',
        'Override computePay to include the bonus.',
      ],
      concepts: ['inheritance', 'super', 'method overriding', 'protected'],
    },
    {
      id: 'java-inherit-10',
      title: 'Inheritance with generics',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a Pair<T> base class with first and second fields, then OrderedPair<T extends Comparable<T>> that adds a min() method.',
      skeleton: '',
      solution: `class Pair<T> {
    protected final T first;
    protected final T second;

    Pair(T first, T second) {
        this.first = first;
        this.second = second;
    }
}

class OrderedPair<T extends Comparable<T>> extends Pair<T> {
    OrderedPair(T first, T second) {
        super(first, second);
    }

    T min() {
        return first.compareTo(second) <= 0 ? first : second;
    }

    T max() {
        return first.compareTo(second) >= 0 ? first : second;
    }
}`,
      hints: [
        'OrderedPair extends Pair with a bounded type parameter.',
        'Comparable bound allows using compareTo.',
        'min returns the smaller of the two elements.',
      ],
      concepts: ['generic inheritance', 'bounded type', 'Comparable'],
    },
    {
      id: 'java-inherit-11',
      title: 'Template method pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a DataProcessor base class with a process() template method that calls validate(), transform(), and save() hooks.',
      skeleton: '',
      solution: `abstract class DataProcessor {
    public final void process(String data) {
        validate(data);
        String transformed = transform(data);
        save(transformed);
    }

    protected abstract void validate(String data);
    protected abstract String transform(String data);
    protected abstract void save(String data);
}

class UpperCaseProcessor extends DataProcessor {
    @Override
    protected void validate(String data) {
        if (data == null) throw new IllegalArgumentException("null data");
    }

    @Override
    protected String transform(String data) {
        return data.toUpperCase();
    }

    @Override
    protected void save(String data) {
        System.out.println("Saved: " + data);
    }
}`,
      hints: [
        'The process method is final so subclasses cannot change the algorithm.',
        'The steps are abstract methods that subclasses implement.',
        'This is the Template Method design pattern.',
      ],
      concepts: ['template method', 'abstract methods', 'final method'],
    },
    {
      id: 'java-inherit-12',
      title: 'Chain of toString calls',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a three-level hierarchy (A -> B -> C) where each toString calls super.toString() and appends its own info.',
      skeleton: '',
      solution: `class A {
    @Override
    public String toString() { return "A"; }
}

class B extends A {
    @Override
    public String toString() { return super.toString() + "->B"; }
}

class C extends B {
    @Override
    public String toString() { return super.toString() + "->C"; }
}`,
      hints: [
        'Each level calls super.toString() first.',
        'Then appends its own identifier.',
        'new C().toString() produces "A->B->C".',
      ],
      concepts: ['super', 'toString chain', 'multi-level inheritance'],
    },
    {
      id: 'java-inherit-13',
      title: 'Override with wrong signature',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the method that accidentally overloads instead of overrides.',
      skeleton: `class Parent {
    void greet(String name) {
        System.out.println("Hello, " + name);
    }
}

class Child extends Parent {
    @Override
    void greet(Object name) {
        System.out.println("Hi, " + name);
    }
}`,
      solution: `class Parent {
    void greet(String name) {
        System.out.println("Hello, " + name);
    }
}

class Child extends Parent {
    @Override
    void greet(String name) {
        System.out.println("Hi, " + name);
    }
}`,
      hints: [
        'The parameter type must exactly match the parent method.',
        'Object is not the same as String.',
        '@Override catches this mismatch at compile time.',
      ],
      concepts: ['overriding vs overloading', 'parameter types', '@Override'],
    },
    {
      id: 'java-inherit-14',
      title: 'Missing super constructor call',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the missing super() call when the parent has no default constructor.',
      skeleton: `class Animal {
    String name;
    Animal(String name) { this.name = name; }
}

class Dog extends Animal {
    String breed;
    Dog(String name, String breed) {
        this.breed = breed;
    }
}`,
      solution: `class Animal {
    String name;
    Animal(String name) { this.name = name; }
}

class Dog extends Animal {
    String breed;
    Dog(String name, String breed) {
        super(name);
        this.breed = breed;
    }
}`,
      hints: [
        'Parent class has no default constructor.',
        'Child must explicitly call super(name).',
        'It must be the first statement in the constructor.',
      ],
      concepts: ['super()', 'constructor chaining', 'no default constructor'],
    },
    {
      id: 'java-inherit-15',
      title: 'Inconsistent equals without hashCode',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the class that overrides equals but not hashCode.',
      skeleton: `class Token {
    String value;
    Token(String value) { this.value = value; }
    
    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Token t)) return false;
        return value.equals(t.value);
    }
}`,
      solution: `class Token {
    String value;
    Token(String value) { this.value = value; }
    
    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Token t)) return false;
        return value.equals(t.value);
    }
    
    @Override
    public int hashCode() {
        return value.hashCode();
    }
}`,
      hints: [
        'The equals/hashCode contract requires both to be overridden together.',
        'Objects that are equal must have the same hashCode.',
        'Add a hashCode that is consistent with equals.',
      ],
      concepts: ['equals/hashCode contract', 'Object methods', 'consistency'],
    },
    {
      id: 'java-inherit-16',
      title: 'Predict polymorphic call',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict which version of speak() is called.',
      skeleton: `class Animal { String speak() { return "..."; } }
class Dog extends Animal { @Override String speak() { return "Woof"; } }

Animal a = new Dog();
System.out.println(a.speak());`,
      solution: `Woof`,
      hints: [
        'The actual object is a Dog, even though the variable type is Animal.',
        'Method dispatch is based on the runtime type.',
        'Dog.speak() returns "Woof".',
      ],
      concepts: ['runtime polymorphism', 'dynamic dispatch', 'upcasting'],
    },
    {
      id: 'java-inherit-17',
      title: 'Predict constructor order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the order of constructor execution.',
      skeleton: `class A { A() { System.out.print("A "); } }
class B extends A { B() { System.out.print("B "); } }
class C extends B { C() { System.out.print("C "); } }
new C();`,
      solution: `A B C `,
      hints: [
        'Constructors execute from the top of the hierarchy down.',
        'A() runs first, then B(), then C().',
        'Each implicitly calls super() first.',
      ],
      concepts: ['constructor chain', 'super()', 'inheritance order'],
    },
    {
      id: 'java-inherit-18',
      title: 'Predict field hiding vs overriding',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Predict the output showing that fields are hidden, not overridden.',
      skeleton: `class Parent { String x = "parent"; }
class Child extends Parent { String x = "child"; }

Child c = new Child();
Parent p = c;
System.out.println(c.x);
System.out.println(p.x);`,
      solution: `child
parent`,
      hints: [
        'Fields are resolved at compile time, not runtime.',
        'c.x uses Child\'s field, p.x uses Parent\'s field.',
        'This is field hiding, not polymorphic dispatch.',
      ],
      concepts: ['field hiding', 'compile-time resolution', 'not polymorphic'],
    },
    {
      id: 'java-inherit-19',
      title: 'Refactor to use inheritance',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor duplicate code into a base class.',
      skeleton: `class Cat {
    String name;
    int age;
    void eat() { System.out.println(name + " eats"); }
    void sleep() { System.out.println(name + " sleeps"); }
    void meow() { System.out.println("Meow!"); }
}

class Dog {
    String name;
    int age;
    void eat() { System.out.println(name + " eats"); }
    void sleep() { System.out.println(name + " sleeps"); }
    void bark() { System.out.println("Woof!"); }
}`,
      solution: `class Animal {
    String name;
    int age;
    void eat() { System.out.println(name + " eats"); }
    void sleep() { System.out.println(name + " sleeps"); }
}

class Cat extends Animal {
    void meow() { System.out.println("Meow!"); }
}

class Dog extends Animal {
    void bark() { System.out.println("Woof!"); }
}`,
      hints: [
        'name, age, eat(), sleep() are common to both.',
        'Extract them into an Animal base class.',
        'Keep unique methods in each subclass.',
      ],
      concepts: ['code reuse', 'inheritance', 'DRY', 'refactoring'],
    },
    {
      id: 'java-inherit-20',
      title: 'Refactor instanceof chain',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor the instanceof chain to use polymorphism.',
      skeleton: `class Shape {}
class Circle extends Shape { double radius; }
class Square extends Shape { double side; }

double getArea(Shape s) {
    if (s instanceof Circle c) {
        return Math.PI * c.radius * c.radius;
    } else if (s instanceof Square sq) {
        return sq.side * sq.side;
    }
    return 0;
}`,
      solution: `abstract class Shape {
    abstract double getArea();
}

class Circle extends Shape {
    double radius;
    Circle(double radius) { this.radius = radius; }
    @Override
    double getArea() { return Math.PI * radius * radius; }
}

class Square extends Shape {
    double side;
    Square(double side) { this.side = side; }
    @Override
    double getArea() { return side * side; }
}`,
      hints: [
        'Move the area calculation into each subclass.',
        'Make getArea() an abstract method in Shape.',
        'This eliminates the need for instanceof checks.',
      ],
      concepts: ['polymorphism', 'abstract method', 'open-closed principle'],
    },
  ],
};
