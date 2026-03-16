import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-inherit',
  title: '14. Inheritance',
  explanation: `## Inheritance in C++

Inheritance lets a derived class reuse and extend the functionality of a base class.

### Basic Syntax
\`\`\`cpp
class Base {
public:
    void greet() { std::cout << "Hello from Base"; }
};

class Derived : public Base {
public:
    void wave() { std::cout << "Wave from Derived"; }
};
\`\`\`

### Access Modes
| Base member | public inheritance | protected inheritance | private inheritance |
|-------------|--------------------|-----------------------|---------------------|
| public      | public             | protected             | private             |
| protected   | protected          | protected             | private             |
| private     | inaccessible       | inaccessible          | inaccessible        |

### Constructor Chaining
The base constructor runs before the derived constructor. Use the initializer list to pass arguments to the base:
\`\`\`cpp
class Animal {
protected:
    std::string name;
public:
    Animal(std::string n) : name(std::move(n)) {}
};

class Dog : public Animal {
public:
    Dog(std::string n) : Animal(std::move(n)) {}
};
\`\`\`

### Hiding vs Overriding
If a derived class declares a function with the same name as a base class non-virtual function, it **hides** the base version (does not override). To bring hidden overloads back, use \`using Base::func;\`.

### protected Members
Accessible inside the class and its derived classes, but not from outside.
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-inherit-1',
      title: 'Public inheritance syntax',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the inheritance syntax.',
      skeleton: `class Shape {
public:
    double area() const { return 0; }
};

class Circle __BLANK__ Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
};`,
      solution: `class Shape {
public:
    double area() const { return 0; }
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
};`,
      hints: [
        'Inheritance uses a colon after the class name.',
        'You need to specify the access mode.',
        'The syntax is `: public Shape`.',
      ],
      concepts: ['inheritance', 'public-inheritance'],
    },
    {
      id: 'cpp-inherit-2',
      title: 'Call base constructor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Call the base class constructor from the derived class initializer list.',
      skeleton: `class Vehicle {
protected:
    int speed;
public:
    Vehicle(int s) : speed(s) {}
};

class Car : public Vehicle {
    int doors;
public:
    Car(int s, int d) : __BLANK__(s), doors(d) {}
};`,
      solution: `class Vehicle {
protected:
    int speed;
public:
    Vehicle(int s) : speed(s) {}
};

class Car : public Vehicle {
    int doors;
public:
    Car(int s, int d) : Vehicle(s), doors(d) {}
};`,
      hints: [
        'The base class constructor is called in the initializer list.',
        'Use the base class name followed by arguments.',
        'Write `Vehicle(s)` in the initializer list.',
      ],
      concepts: ['constructor-chaining', 'initializer-list'],
    },
    {
      id: 'cpp-inherit-3',
      title: 'Protected access specifier',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the access specifier that allows derived classes to access the member.',
      skeleton: `class Account {
__BLANK__:
    double balance;
public:
    Account(double b) : balance(b) {}
};

class SavingsAccount : public Account {
public:
    SavingsAccount(double b) : Account(b) {}
    void addInterest(double rate) { balance *= (1 + rate); }
};`,
      solution: `class Account {
protected:
    double balance;
public:
    Account(double b) : balance(b) {}
};

class SavingsAccount : public Account {
public:
    SavingsAccount(double b) : Account(b) {}
    void addInterest(double rate) { balance *= (1 + rate); }
};`,
      hints: [
        'This specifier is between public and private.',
        'It allows derived classes access but not outside code.',
        'The keyword is `protected`.',
      ],
      concepts: ['protected', 'access-specifier'],
    },
    {
      id: 'cpp-inherit-4',
      title: 'Using declaration to unhide base method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Bring the hidden base class overload back into scope.',
      skeleton: `class Printer {
public:
    void print(int x) { std::cout << x; }
    void print(double x) { std::cout << x; }
};

class FancyPrinter : public Printer {
public:
    __BLANK__ Printer::print;  // unhide base overloads
    void print(const std::string& s) { std::cout << "[" << s << "]"; }
};`,
      solution: `class Printer {
public:
    void print(int x) { std::cout << x; }
    void print(double x) { std::cout << x; }
};

class FancyPrinter : public Printer {
public:
    using Printer::print;  // unhide base overloads
    void print(const std::string& s) { std::cout << "[" << s << "]"; }
};`,
      hints: [
        'Defining print(string) in the derived class hides all base print overloads.',
        'There is a declaration that imports names from a base class.',
        'The keyword is `using`.',
      ],
      concepts: ['name-hiding', 'using-declaration'],
    },
    {
      id: 'cpp-inherit-5',
      title: 'Private inheritance',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the access mode that makes all inherited members private.',
      skeleton: `class Engine {
public:
    void start() { /* ... */ }
};

class Car : __BLANK__ Engine {
public:
    void ignition() { start(); }  // OK: start is private in Car
};

// Car c; c.start(); // ERROR: start is private`,
      solution: `class Engine {
public:
    void start() { /* ... */ }
};

class Car : private Engine {
public:
    void ignition() { start(); }  // OK: start is private in Car
};

// Car c; c.start(); // ERROR: start is private`,
      hints: [
        'This inheritance mode makes all base members inaccessible from outside.',
        'It implements "has-a" via inheritance (composition-like).',
        'The keyword is `private`.',
      ],
      concepts: ['private-inheritance', 'access-specifier'],
    },
    {
      id: 'cpp-inherit-6',
      title: 'Scope resolution for base member',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Call the base class version of the method explicitly.',
      skeleton: `class Logger {
public:
    void log(const std::string& msg) {
        std::cout << msg << std::endl;
    }
};

class TimedLogger : public Logger {
public:
    void log(const std::string& msg) {
        std::cout << "[TIME] ";
        __BLANK__::log(msg);
    }
};`,
      solution: `class Logger {
public:
    void log(const std::string& msg) {
        std::cout << msg << std::endl;
    }
};

class TimedLogger : public Logger {
public:
    void log(const std::string& msg) {
        std::cout << "[TIME] ";
        Logger::log(msg);
    }
};`,
      hints: [
        'Use the scope resolution operator with the base class name.',
        'This avoids infinite recursion by calling the base version.',
        'Write `Logger` before the scope resolution operator.',
      ],
      concepts: ['scope-resolution', 'name-hiding'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-inherit-7',
      title: 'Write a simple inheritance hierarchy',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write an Animal base class and a Cat derived class.',
      skeleton: `// Write:
// - class Animal with protected string name, public constructor, public speak() returning "..."
// - class Cat : public Animal with constructor taking name, override speak() returning name + " says Meow"`,
      solution: `class Animal {
protected:
    std::string name;
public:
    Animal(std::string n) : name(std::move(n)) {}
    std::string speak() const { return "..."; }
};

class Cat : public Animal {
public:
    Cat(std::string n) : Animal(std::move(n)) {}
    std::string speak() const { return name + " says Meow"; }
};`,
      hints: [
        'Cat inherits publicly from Animal.',
        'Cat constructor must call Animal constructor in its initializer list.',
        'Cat::speak hides Animal::speak (this is name hiding, not polymorphism).',
      ],
      concepts: ['inheritance', 'constructor-chaining'],
    },
    {
      id: 'cpp-inherit-8',
      title: 'Write a multi-level hierarchy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a three-level hierarchy: Shape -> Polygon -> Rectangle.',
      skeleton: `// Write:
// - Shape: protected string color, constructor, getColor() const
// - Polygon : public Shape: protected int sides, constructor taking color and sides
// - Rectangle : public Polygon: private int w, h, constructor, int area() const`,
      solution: `class Shape {
protected:
    std::string color;
public:
    Shape(std::string c) : color(std::move(c)) {}
    std::string getColor() const { return color; }
};

class Polygon : public Shape {
protected:
    int sides;
public:
    Polygon(std::string c, int s) : Shape(std::move(c)), sides(s) {}
    int getSides() const { return sides; }
};

class Rectangle : public Polygon {
    int w, h;
public:
    Rectangle(std::string c, int w, int h)
        : Polygon(std::move(c), 4), w(w), h(h) {}
    int area() const { return w * h; }
};`,
      hints: [
        'Each derived class calls its immediate base constructor.',
        'Rectangle is a Polygon with 4 sides.',
        'Use std::move for string parameters.',
      ],
      concepts: ['multi-level-inheritance', 'constructor-chaining'],
    },
    {
      id: 'cpp-inherit-9',
      title: 'Write protected utility methods',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a base class with protected helper methods used by derived classes.',
      skeleton: `// Write:
// - class Formatter with protected methods:
//   std::string padLeft(const std::string& s, int width) - pad with spaces
//   std::string toUpper(const std::string& s) - convert to uppercase
// - class ReportFormatter : public Formatter with public:
//   std::string formatTitle(const std::string& title) - returns padded uppercase title`,
      solution: `#include <algorithm>
#include <string>

class Formatter {
protected:
    std::string padLeft(const std::string& s, int width) const {
        if (static_cast<int>(s.size()) >= width) return s;
        return std::string(width - s.size(), ' ') + s;
    }
    std::string toUpper(const std::string& s) const {
        std::string result = s;
        std::transform(result.begin(), result.end(), result.begin(), ::toupper);
        return result;
    }
};

class ReportFormatter : public Formatter {
public:
    std::string formatTitle(const std::string& title) const {
        return padLeft(toUpper(title), 30);
    }
};`,
      hints: [
        'Protected methods are accessible in derived classes but not outside.',
        'ReportFormatter combines both helpers in its public method.',
        'Use std::transform with ::toupper for uppercase conversion.',
      ],
      concepts: ['protected', 'inheritance', 'encapsulation'],
    },
    {
      id: 'cpp-inherit-10',
      title: 'Write constructor/destructor chain',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write base and derived classes that print messages in constructors and destructors to show the call order.',
      skeleton: `#include <iostream>
// Write:
// - class Base: constructor prints "Base ctor", destructor prints "Base dtor"
// - class Derived : public Base: constructor prints "Derived ctor", destructor prints "Derived dtor"`,
      solution: `#include <iostream>

class Base {
public:
    Base() { std::cout << "Base ctor" << std::endl; }
    ~Base() { std::cout << "Base dtor" << std::endl; }
};

class Derived : public Base {
public:
    Derived() { std::cout << "Derived ctor" << std::endl; }
    ~Derived() { std::cout << "Derived dtor" << std::endl; }
};`,
      hints: [
        'Base constructor runs before Derived constructor.',
        'Derived destructor runs before Base destructor.',
        'Creating a Derived prints: Base ctor, Derived ctor. Destroying prints: Derived dtor, Base dtor.',
      ],
      concepts: ['constructor-chaining', 'destructor-order'],
    },
    {
      id: 'cpp-inherit-11',
      title: 'Write a class using private inheritance',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Use private inheritance to implement a Stack using a vector internally, exposing only stack operations.',
      skeleton: `#include <vector>
// Write class Stack that privately inherits from std::vector<int>
// Expose only: push(int), pop(), top() const, empty() const
// Use using declarations or wrapper methods`,
      solution: `#include <vector>

class Stack : private std::vector<int> {
public:
    void push(int val) { push_back(val); }
    void pop() { pop_back(); }
    int top() const { return back(); }
    using std::vector<int>::empty;
};`,
      hints: [
        'Private inheritance makes all vector members private in Stack.',
        'Wrap or re-expose only the methods you want public.',
        'Use using-declaration for methods you want to expose unchanged.',
      ],
      concepts: ['private-inheritance', 'using-declaration'],
    },
    {
      id: 'cpp-inherit-12',
      title: 'Write a diamond-free hierarchy',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a Printable interface class and two classes that inherit from it alongside their own base.',
      skeleton: `// Write:
// - class Printable with pure virtual std::string toString() const = 0
// - class Animal with protected string name, constructor
// - class Dog : public Animal, public Printable
//   constructor, toString() returns "Dog: " + name`,
      solution: `#include <string>

class Printable {
public:
    virtual std::string toString() const = 0;
    virtual ~Printable() = default;
};

class Animal {
protected:
    std::string name;
public:
    Animal(std::string n) : name(std::move(n)) {}
    virtual ~Animal() = default;
};

class Dog : public Animal, public Printable {
public:
    Dog(std::string n) : Animal(std::move(n)) {}
    std::string toString() const override {
        return "Dog: " + name;
    }
};`,
      hints: [
        'Multiple inheritance uses a comma-separated list of bases.',
        'Printable acts as an interface with a pure virtual method.',
        'Dog must implement toString() to be instantiable.',
      ],
      concepts: ['multiple-inheritance', 'interface', 'pure-virtual'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-inherit-13',
      title: 'Fix: forgot to call base constructor',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the derived class so the base class member is properly initialised.',
      skeleton: `class Person {
protected:
    std::string name;
public:
    Person(std::string n) : name(std::move(n)) {}
};

class Student : public Person {
    int grade;
public:
    // Bug: does not call Person constructor
    Student(std::string n, int g) : grade(g) {}
};`,
      solution: `class Person {
protected:
    std::string name;
public:
    Person(std::string n) : name(std::move(n)) {}
};

class Student : public Person {
    int grade;
public:
    Student(std::string n, int g) : Person(std::move(n)), grade(g) {}
};`,
      hints: [
        'Person has no default constructor.',
        'The derived constructor must explicitly call the base constructor.',
        'Add Person(std::move(n)) to the initializer list.',
      ],
      concepts: ['constructor-chaining', 'initializer-list'],
    },
    {
      id: 'cpp-inherit-14',
      title: 'Fix: slicing problem',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the function to accept the derived class without slicing.',
      skeleton: `class Base {
public:
    int x = 10;
};

class Derived : public Base {
public:
    int y = 20;
};

// Bug: takes Base by value, slices off Derived part
void process(Base b) {
    std::cout << b.x << std::endl;
}

int main() {
    Derived d;
    process(d);  // y is sliced off
    return 0;
}`,
      solution: `class Base {
public:
    int x = 10;
};

class Derived : public Base {
public:
    int y = 20;
};

void process(const Base& b) {
    std::cout << b.x << std::endl;
}

int main() {
    Derived d;
    process(d);
    return 0;
}`,
      hints: [
        'Passing by value copies only the Base part of a Derived object.',
        'This is called object slicing.',
        'Pass by reference or pointer to preserve the full object.',
      ],
      concepts: ['object-slicing', 'pass-by-reference'],
    },
    {
      id: 'cpp-inherit-15',
      title: 'Fix: inaccessible base member',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the access so the derived class can use the base member.',
      skeleton: `class Database {
    std::string connectionString;  // private
public:
    Database(std::string cs) : connectionString(std::move(cs)) {}
};

class CachedDatabase : public Database {
public:
    CachedDatabase(std::string cs) : Database(std::move(cs)) {}
    void printConnection() {
        // Bug: connectionString is private in Base
        std::cout << connectionString << std::endl;
    }
};`,
      solution: `class Database {
protected:
    std::string connectionString;
public:
    Database(std::string cs) : connectionString(std::move(cs)) {}
};

class CachedDatabase : public Database {
public:
    CachedDatabase(std::string cs) : Database(std::move(cs)) {}
    void printConnection() {
        std::cout << connectionString << std::endl;
    }
};`,
      hints: [
        'Private members are not accessible in derived classes.',
        'Change the access specifier so derived classes can access it.',
        'Use protected instead of private.',
      ],
      concepts: ['protected', 'access-specifier', 'inheritance'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-inherit-16',
      title: 'Predict: constructor/destructor order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Predict the output showing construction and destruction order.',
      skeleton: `#include <iostream>

class A {
public:
    A() { std::cout << "A"; }
    ~A() { std::cout << "a"; }
};

class B : public A {
public:
    B() { std::cout << "B"; }
    ~B() { std::cout << "b"; }
};

class C : public B {
public:
    C() { std::cout << "C"; }
    ~C() { std::cout << "c"; }
};

int main() {
    C obj;
    return 0;
}`,
      solution: `ABCcba`,
      hints: [
        'Constructors run from base to derived: A, B, C.',
        'Destructors run from derived to base: C, B, A.',
        'Output is ABCcba.',
      ],
      concepts: ['constructor-order', 'destructor-order'],
    },
    {
      id: 'cpp-inherit-17',
      title: 'Predict: name hiding',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the output when a derived class hides a base method.',
      skeleton: `#include <iostream>

class Base {
public:
    void show() { std::cout << "Base"; }
};

class Derived : public Base {
public:
    void show() { std::cout << "Derived"; }
};

int main() {
    Derived d;
    d.show();
    d.Base::show();
    return 0;
}`,
      solution: `DerivedBase`,
      hints: [
        'd.show() calls the Derived version (hides Base).',
        'd.Base::show() explicitly calls the Base version.',
        'Output is DerivedBase.',
      ],
      concepts: ['name-hiding', 'scope-resolution'],
    },
    {
      id: 'cpp-inherit-18',
      title: 'Predict: protected access',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict whether this code compiles.',
      skeleton: `class Parent {
protected:
    int secret = 42;
};

class Child : public Parent {
public:
    int getSecret() { return secret; }  // line A
};

int main() {
    Parent p;
    // std::cout << p.secret;  // line B - commented out
    Child c;
    std::cout << c.getSecret();  // line C
    return 0;
}`,
      solution: `42`,
      hints: [
        'Line A: accessing protected member from derived class is OK.',
        'Line B: accessing protected from outside would fail (but it is commented out).',
        'Line C prints 42.',
      ],
      concepts: ['protected', 'inheritance'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-inherit-19',
      title: 'Refactor: extract base class',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor two classes with duplicate code into a base class and two derived classes.',
      skeleton: `class Dog {
    std::string name;
    int age;
public:
    Dog(std::string n, int a) : name(std::move(n)), age(a) {}
    std::string getName() const { return name; }
    int getAge() const { return age; }
    std::string sound() const { return "Woof"; }
};

class Cat {
    std::string name;
    int age;
public:
    Cat(std::string n, int a) : name(std::move(n)), age(a) {}
    std::string getName() const { return name; }
    int getAge() const { return age; }
    std::string sound() const { return "Meow"; }
};`,
      solution: `class Animal {
protected:
    std::string name;
    int age;
public:
    Animal(std::string n, int a) : name(std::move(n)), age(a) {}
    std::string getName() const { return name; }
    int getAge() const { return age; }
};

class Dog : public Animal {
public:
    Dog(std::string n, int a) : Animal(std::move(n), a) {}
    std::string sound() const { return "Woof"; }
};

class Cat : public Animal {
public:
    Cat(std::string n, int a) : Animal(std::move(n), a) {}
    std::string sound() const { return "Meow"; }
};`,
      hints: [
        'name, age, getName, and getAge are duplicated in both classes.',
        'Extract them into a common base class Animal.',
        'Dog and Cat inherit from Animal and only define sound().',
      ],
      concepts: ['inheritance', 'DRY', 'refactoring'],
    },
    {
      id: 'cpp-inherit-20',
      title: 'Refactor: replace private inheritance with composition',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor from private inheritance to composition (has-a relationship).',
      skeleton: `class Timer {
public:
    void start() { /* ... */ }
    void stop() { /* ... */ }
    int elapsed() const { return 0; }
};

class ProfiledTask : private Timer {
    std::string taskName;
public:
    ProfiledTask(std::string name) : taskName(std::move(name)) {}
    void run() {
        start();
        // do work
        stop();
        std::cout << taskName << " took " << elapsed() << "ms" << std::endl;
    }
};`,
      solution: `class Timer {
public:
    void start() { /* ... */ }
    void stop() { /* ... */ }
    int elapsed() const { return 0; }
};

class ProfiledTask {
    std::string taskName;
    Timer timer;
public:
    ProfiledTask(std::string name) : taskName(std::move(name)) {}
    void run() {
        timer.start();
        // do work
        timer.stop();
        std::cout << taskName << " took " << timer.elapsed() << "ms" << std::endl;
    }
};`,
      hints: [
        'Private inheritance is often used for implementation reuse.',
        'Composition (having a Timer member) achieves the same thing more clearly.',
        'Replace private inheritance with a Timer member variable.',
      ],
      concepts: ['composition-over-inheritance', 'private-inheritance', 'refactoring'],
    },
  ],
};
