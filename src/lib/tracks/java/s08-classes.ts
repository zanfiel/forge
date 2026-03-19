import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-classes',
  title: '8. Classes',
  explanation: `## Classes

Classes are the fundamental building blocks of Java programs.

### Class Declaration
\`\`\`java
public class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
\`\`\`

### Access Modifiers
| Modifier | Class | Package | Subclass | World |
|----------|-------|---------|----------|-------|
| public | Yes | Yes | Yes | Yes |
| protected | Yes | Yes | Yes | No |
| (default) | Yes | Yes | No | No |
| private | Yes | No | No | No |

### this Keyword
Refers to the current object instance.

### Static Members
Belong to the class rather than instances:
\`\`\`java
public static int count = 0;
public static void reset() { count = 0; }
\`\`\`

### Nested & Inner Classes
- **Static nested**: \`static class Inner {}\` - no access to outer instance
- **Inner class**: \`class Inner {}\` - has reference to outer instance
- **Local class**: defined inside a method
- **Anonymous class**: inline implementation of an interface/class
`,
  exercises: [
    {
      id: 'java-class-1',
      title: 'Class declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare a public class named Dog.',
      skeleton: `__BLANK__ class Dog {
    String name;
    int age;
}`,
      solution: `public class Dog {
    String name;
    int age;
}`,
      hints: [
        'The most common access modifier for top-level classes.',
        'It allows the class to be accessed from anywhere.',
        'Use `public`.',
      ],
      concepts: ['class declaration', 'public', 'access modifier'],
    },
    {
      id: 'java-class-2',
      title: 'This keyword',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Use this to distinguish the field from the parameter.',
      skeleton: `public class Point {
    int x, y;
    public Point(int x, int y) {
        __BLANK__.x = x;
        __BLANK__.y = y;
    }
}`,
      solution: `public class Point {
    int x, y;
    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
}`,
      hints: [
        'When parameter names shadow field names, you need a way to reference the instance.',
        'The keyword refers to the current object.',
        'Use `this`.',
      ],
      concepts: ['this keyword', 'field assignment', 'shadowing'],
    },
    {
      id: 'java-class-3',
      title: 'Private field',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare a private field for encapsulation.',
      skeleton: `public class Account {
    __BLANK__ double balance;
    
    public double getBalance() {
        return balance;
    }
}`,
      solution: `public class Account {
    private double balance;
    
    public double getBalance() {
        return balance;
    }
}`,
      hints: [
        'The most restrictive access modifier.',
        'Only accessible within the same class.',
        'Use `private`.',
      ],
      concepts: ['private', 'encapsulation', 'access modifier'],
    },
    {
      id: 'java-class-4',
      title: 'Static field',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Declare a static field to count instances.',
      skeleton: `public class Item {
    __BLANK__ int count = 0;
    
    public Item() {
        count++;
    }
}`,
      solution: `public class Item {
    static int count = 0;
    
    public Item() {
        count++;
    }
}`,
      hints: [
        'This field should be shared across all instances.',
        'It belongs to the class, not individual objects.',
        'Use `static`.',
      ],
      concepts: ['static field', 'class variable', 'instance counter'],
    },
    {
      id: 'java-class-5',
      title: 'Static method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Declare a static factory method.',
      skeleton: `public class Temperature {
    private double celsius;
    
    public __BLANK__ Temperature fromFahrenheit(double f) {
        Temperature t = new Temperature();
        t.celsius = (f - 32) * 5.0 / 9.0;
        return t;
    }
}`,
      solution: `public class Temperature {
    private double celsius;
    
    public static Temperature fromFahrenheit(double f) {
        Temperature t = new Temperature();
        t.celsius = (f - 32) * 5.0 / 9.0;
        return t;
    }
}`,
      hints: [
        'Factory methods are typically static.',
        'They can be called without an instance.',
        'Use `static`.',
      ],
      concepts: ['static method', 'factory method', 'static keyword'],
    },
    {
      id: 'java-class-6',
      title: 'Static nested class',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Declare a static nested class.',
      skeleton: `public class LinkedList {
    __BLANK__ class Node {
        int value;
        Node next;
    }
    
    private Node head;
}`,
      solution: `public class LinkedList {
    static class Node {
        int value;
        Node next;
    }
    
    private Node head;
}`,
      hints: [
        'A nested class that does not need access to the outer instance.',
        'It is more memory-efficient than a non-static inner class.',
        'Use `static`.',
      ],
      concepts: ['static nested class', 'inner class', 'encapsulation'],
    },
    {
      id: 'java-class-7',
      title: 'Simple counter class',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a Counter class with increment(), decrement(), and getCount() methods.',
      skeleton: '',
      solution: `public class Counter {
    private int count = 0;

    public void increment() {
        count++;
    }

    public void decrement() {
        count--;
    }

    public int getCount() {
        return count;
    }
}`,
      hints: [
        'Use a private field to store the count.',
        'increment and decrement modify the field.',
        'getCount returns the current value.',
      ],
      concepts: ['class design', 'encapsulation', 'methods'],
    },
    {
      id: 'java-class-8',
      title: 'Rectangle class',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a Rectangle class with width, height fields and area(), perimeter() methods.',
      skeleton: '',
      solution: `public class Rectangle {
    private final double width;
    private final double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    public double area() {
        return width * height;
    }

    public double perimeter() {
        return 2 * (width + height);
    }
}`,
      hints: [
        'Store width and height as final private fields.',
        'Area is width * height.',
        'Perimeter is 2 * (width + height).',
      ],
      concepts: ['class design', 'constructor', 'methods', 'final fields'],
    },
    {
      id: 'java-class-9',
      title: 'Stack with static nested Node',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a simple IntStack class using a static nested Node class with push, pop, and isEmpty methods.',
      skeleton: '',
      solution: `public class IntStack {
    private static class Node {
        int value;
        Node next;
        Node(int value, Node next) {
            this.value = value;
            this.next = next;
        }
    }

    private Node top;

    public void push(int value) {
        top = new Node(value, top);
    }

    public int pop() {
        int value = top.value;
        top = top.next;
        return value;
    }

    public boolean isEmpty() {
        return top == null;
    }
}`,
      hints: [
        'Use a static nested Node class with value and next fields.',
        'Push creates a new node pointing to the current top.',
        'Pop removes the top node and returns its value.',
      ],
      concepts: ['static nested class', 'linked list', 'stack', 'data structure'],
    },
    {
      id: 'java-class-10',
      title: 'Singleton with static field',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a Configuration class that follows the singleton pattern with a static getInstance() method.',
      skeleton: '',
      solution: `public class Configuration {
    private static final Configuration INSTANCE = new Configuration();
    private String setting = "default";

    private Configuration() {}

    public static Configuration getInstance() {
        return INSTANCE;
    }

    public String getSetting() {
        return setting;
    }

    public void setSetting(String setting) {
        this.setting = setting;
    }
}`,
      hints: [
        'Private constructor prevents external instantiation.',
        'A static final field holds the single instance.',
        'A public static method provides access.',
      ],
      concepts: ['singleton', 'static field', 'private constructor'],
    },
    {
      id: 'java-class-11',
      title: 'Class with toString',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a Student class with name and grade fields, and override toString to return "Student{name=X, grade=Y}".',
      skeleton: '',
      solution: `public class Student {
    private final String name;
    private final int grade;

    public Student(String name, int grade) {
        this.name = name;
        this.grade = grade;
    }

    @Override
    public String toString() {
        return "Student{name=" + name + ", grade=" + grade + "}";
    }
}`,
      hints: [
        'Override toString from the Object class.',
        'Use @Override annotation for clarity.',
        'Concatenate the fields into the desired format.',
      ],
      concepts: ['toString', 'Override', 'Object class'],
    },
    {
      id: 'java-class-12',
      title: 'Inner class event handler',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a Button class with an inner class ClickHandler that has a handle() method printing the button name.',
      skeleton: '',
      solution: `public class Button {
    private final String name;

    public Button(String name) {
        this.name = name;
    }

    public class ClickHandler {
        public void handle() {
            System.out.println("Clicked: " + name);
        }
    }

    public ClickHandler createHandler() {
        return new ClickHandler();
    }
}`,
      hints: [
        'Non-static inner classes can access outer class fields.',
        'ClickHandler can reference Button.this.name.',
        'Provide a factory method to create the handler.',
      ],
      concepts: ['inner class', 'outer class reference', 'event handling'],
    },
    {
      id: 'java-class-13',
      title: 'Static context error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the error of accessing an instance field from a static method.',
      skeleton: `public class Printer {
    private String prefix = ">>>";
    
    public static void print(String msg) {
        System.out.println(prefix + " " + msg);
    }
}`,
      solution: `public class Printer {
    private static String prefix = ">>>";
    
    public static void print(String msg) {
        System.out.println(prefix + " " + msg);
    }
}`,
      hints: [
        'Static methods cannot access instance fields.',
        'Either make the field static or the method non-static.',
        'Make prefix static since the method is static.',
      ],
      concepts: ['static context', 'instance vs class', 'compilation error'],
    },
    {
      id: 'java-class-14',
      title: 'Missing this reference',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the constructor that does not properly assign the parameter to the field.',
      skeleton: `public class Circle {
    private double radius;
    
    public Circle(double radius) {
        radius = radius;
    }
    
    public double getRadius() {
        return radius;
    }
}`,
      solution: `public class Circle {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    public double getRadius() {
        return radius;
    }
}`,
      hints: [
        'The parameter name shadows the field name.',
        'radius = radius assigns the parameter to itself.',
        'Use this.radius to refer to the field.',
      ],
      concepts: ['this keyword', 'shadowing', 'field assignment'],
    },
    {
      id: 'java-class-15',
      title: 'Wrong access modifier',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the class that exposes internal state that should be private.',
      skeleton: `public class BankAccount {
    public double balance = 0;
    
    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) balance -= amount;
    }
}
// Problem: balance can be set directly to any value`,
      solution: `public class BankAccount {
    private double balance = 0;
    
    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) balance -= amount;
    }
    
    public double getBalance() {
        return balance;
    }
}`,
      hints: [
        'Public fields can be modified without validation.',
        'Make the field private and add a getter.',
        'This enforces using deposit/withdraw for modifications.',
      ],
      concepts: ['encapsulation', 'private fields', 'data hiding'],
    },
    {
      id: 'java-class-16',
      title: 'Predict static field sharing',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output showing static field behavior.',
      skeleton: `class Counter {
    static int count = 0;
    Counter() { count++; }
}
new Counter();
new Counter();
new Counter();
System.out.println(Counter.count);`,
      solution: `3`,
      hints: [
        'Static fields are shared across all instances.',
        'Each constructor call increments the same count.',
        'Three instances created means count = 3.',
      ],
      concepts: ['static field', 'shared state', 'constructor'],
    },
    {
      id: 'java-class-17',
      title: 'Predict this reference',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict whether two references point to the same object.',
      skeleton: `class Box {
    int value;
    Box(int value) { this.value = value; }
    Box getSelf() { return this; }
}
Box b = new Box(5);
System.out.println(b == b.getSelf());`,
      solution: `true`,
      hints: [
        'getSelf() returns this, which is the same object.',
        'b and b.getSelf() refer to the same instance.',
        '== compares references, which are the same here.',
      ],
      concepts: ['this keyword', 'reference equality', 'object identity'],
    },
    {
      id: 'java-class-18',
      title: 'Predict default field values',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the default values of uninitialized fields.',
      skeleton: `class Defaults {
    int number;
    boolean flag;
    String text;
    double decimal;
    
    void print() {
        System.out.println(number + " " + flag + " " + text + " " + decimal);
    }
}
new Defaults().print();`,
      solution: `0 false null 0.0`,
      hints: [
        'Instance fields get default values.',
        'int->0, boolean->false, String->null, double->0.0.',
        'This only applies to fields, not local variables.',
      ],
      concepts: ['default values', 'field initialization', 'primitive defaults'],
    },
    {
      id: 'java-class-19',
      title: 'Refactor to encapsulated class',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor the class with public fields to use proper encapsulation.',
      skeleton: `public class Employee {
    public String name;
    public double salary;
    public String department;
}`,
      solution: `public class Employee {
    private String name;
    private double salary;
    private String department;

    public Employee(String name, double salary, String department) {
        this.name = name;
        this.salary = salary;
        this.department = department;
    }

    public String getName() { return name; }
    public double getSalary() { return salary; }
    public String getDepartment() { return department; }
}`,
      hints: [
        'Make all fields private.',
        'Add a constructor to initialize them.',
        'Add getters for controlled read access.',
      ],
      concepts: ['encapsulation', 'getters', 'constructor', 'refactoring'],
    },
    {
      id: 'java-class-20',
      title: 'Refactor anonymous to lambda',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor the anonymous class to a lambda expression.',
      skeleton: `Runnable task = new Runnable() {
    @Override
    public void run() {
        System.out.println("Running");
    }
};`,
      solution: `Runnable task = () -> System.out.println("Running");`,
      hints: [
        'Runnable is a functional interface with one abstract method.',
        'Anonymous classes implementing functional interfaces can be replaced with lambdas.',
        'The lambda syntax is () -> expression.',
      ],
      concepts: ['lambda', 'anonymous class', 'functional interface', 'refactoring'],
    },
  ],
};
