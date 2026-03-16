import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-poly',
  title: '15. Polymorphism',
  explanation: `## Polymorphism in C++

Polymorphism allows a base class pointer or reference to call the correct derived class method at runtime.

### Virtual Functions
\`\`\`cpp
class Shape {
public:
    virtual double area() const { return 0; }
    virtual ~Shape() = default;
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
};
\`\`\`

### override and final
- \`override\`: explicitly marks a function as overriding a base virtual. Compiler error if it does not actually override.
- \`final\`: prevents further overriding in derived classes.

### Pure Virtual Functions & Abstract Classes
A pure virtual function has no body and forces derived classes to provide an implementation:
\`\`\`cpp
class Drawable {
public:
    virtual void draw() const = 0;  // pure virtual
    virtual ~Drawable() = default;
};
\`\`\`
A class with at least one pure virtual function is **abstract** and cannot be instantiated.

### Virtual Destructor
Always declare a virtual destructor in a base class intended for polymorphic use. Otherwise, deleting a derived object through a base pointer causes undefined behaviour.

### vtable (Concept)
The compiler generates a virtual table (vtable) for each class with virtual functions. Each object contains a hidden pointer (vptr) to its class's vtable, which maps virtual function calls to the correct implementation at runtime.
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-poly-1',
      title: 'Virtual function keyword',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Mark the base class method as virtual.',
      skeleton: `class Animal {
public:
    __BLANK__ std::string speak() const { return "..."; }
    virtual ~Animal() = default;
};`,
      solution: `class Animal {
public:
    virtual std::string speak() const { return "..."; }
    virtual ~Animal() = default;
};`,
      hints: [
        'This keyword enables runtime polymorphism.',
        'It goes before the return type in the base class.',
        'The keyword is `virtual`.',
      ],
      concepts: ['virtual-function', 'polymorphism'],
    },
    {
      id: 'cpp-poly-2',
      title: 'Override specifier',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Mark the derived class method as an override.',
      skeleton: `class Base {
public:
    virtual void process() {}
    virtual ~Base() = default;
};

class Derived : public Base {
public:
    void process() __BLANK__ { /* derived impl */ }
};`,
      solution: `class Base {
public:
    virtual void process() {}
    virtual ~Base() = default;
};

class Derived : public Base {
public:
    void process() override { /* derived impl */ }
};`,
      hints: [
        'This specifier ensures the method actually overrides a base virtual.',
        'It causes a compile error if no base virtual matches.',
        'The specifier is `override`.',
      ],
      concepts: ['override', 'virtual-function'],
    },
    {
      id: 'cpp-poly-3',
      title: 'Pure virtual function',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Make the function pure virtual so the class becomes abstract.',
      skeleton: `class Serializable {
public:
    virtual std::string serialize() const __BLANK__;
    virtual ~Serializable() = default;
};`,
      solution: `class Serializable {
public:
    virtual std::string serialize() const = 0;
    virtual ~Serializable() = default;
};`,
      hints: [
        'A pure virtual function has a specific syntax instead of a body.',
        'It uses an assignment-like syntax.',
        'Write `= 0` after the declaration.',
      ],
      concepts: ['pure-virtual', 'abstract-class'],
    },
    {
      id: 'cpp-poly-4',
      title: 'Final specifier on method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Prevent further overriding of the method.',
      skeleton: `class Base {
public:
    virtual void lock() {}
    virtual ~Base() = default;
};

class Secure : public Base {
public:
    void lock() override __BLANK__ { /* cannot be overridden further */ }
};`,
      solution: `class Base {
public:
    virtual void lock() {}
    virtual ~Base() = default;
};

class Secure : public Base {
public:
    void lock() override final { /* cannot be overridden further */ }
};`,
      hints: [
        'This specifier prevents derived classes from overriding this method.',
        'It can be combined with override.',
        'The specifier is `final`.',
      ],
      concepts: ['final', 'override'],
    },
    {
      id: 'cpp-poly-5',
      title: 'Virtual destructor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Make the destructor virtual to enable safe polymorphic deletion.',
      skeleton: `class Widget {
public:
    __BLANK__ ~Widget() = default;
    virtual void draw() = 0;
};`,
      solution: `class Widget {
public:
    virtual ~Widget() = default;
    virtual void draw() = 0;
};`,
      hints: [
        'Without this, deleting a derived object through a base pointer is UB.',
        'The destructor needs the same keyword as other polymorphic methods.',
        'The keyword is `virtual`.',
      ],
      concepts: ['virtual-destructor', 'polymorphism'],
    },
    {
      id: 'cpp-poly-6',
      title: 'Final class',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Prevent any class from inheriting from this one.',
      skeleton: `class Singleton __BLANK__ {
public:
    static Singleton& instance() {
        static Singleton s;
        return s;
    }
private:
    Singleton() = default;
};`,
      solution: `class Singleton final {
public:
    static Singleton& instance() {
        static Singleton s;
        return s;
    }
private:
    Singleton() = default;
};`,
      hints: [
        'This specifier can be applied to the class itself.',
        'It prevents any class from deriving from Singleton.',
        'The specifier is `final`.',
      ],
      concepts: ['final-class'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-poly-7',
      title: 'Write a polymorphic shape hierarchy',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write an abstract Shape class and concrete Circle and Square classes with area().',
      skeleton: `// Write:
// - abstract Shape with pure virtual double area() const and virtual destructor
// - Circle with radius, implementing area = pi * r * r
// - Square with side, implementing area = side * side`,
      solution: `class Shape {
public:
    virtual double area() const = 0;
    virtual ~Shape() = default;
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
};

class Square : public Shape {
    double side;
public:
    Square(double s) : side(s) {}
    double area() const override { return side * side; }
};`,
      hints: [
        'Shape has a pure virtual area() = 0.',
        'Circle and Square override area() with their formulas.',
        'Always include a virtual destructor in the base.',
      ],
      concepts: ['abstract-class', 'pure-virtual', 'override'],
    },
    {
      id: 'cpp-poly-8',
      title: 'Write polymorphic dispatch',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that takes a vector of Shape pointers and prints all their areas.',
      skeleton: `#include <vector>
#include <memory>
#include <iostream>
// Assume Shape, Circle, Square from previous exercise exist.
// Write: void printAreas(const std::vector<std::unique_ptr<Shape>>& shapes)
// that prints each shape's area on a new line.`,
      solution: `void printAreas(const std::vector<std::unique_ptr<Shape>>& shapes) {
    for (const auto& s : shapes) {
        std::cout << s->area() << std::endl;
    }
}`,
      hints: [
        'Iterate with a range-based for loop.',
        'Use -> to call area() through the unique_ptr.',
        'Polymorphism ensures the correct area() is called.',
      ],
      concepts: ['polymorphic-dispatch', 'unique-ptr', 'virtual-function'],
    },
    {
      id: 'cpp-poly-9',
      title: 'Write an interface class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a Comparable interface and a Temperature class that implements it.',
      skeleton: `// Write:
// - class Comparable with pure virtual int compareTo(const Comparable& other) const
// - class Temperature : public Comparable
//   - private double degrees
//   - constructor taking degrees
//   - compareTo returns -1, 0, or 1 comparing degrees`,
      solution: `class Comparable {
public:
    virtual int compareTo(const Comparable& other) const = 0;
    virtual ~Comparable() = default;
};

class Temperature : public Comparable {
    double degrees;
public:
    Temperature(double d) : degrees(d) {}
    int compareTo(const Comparable& other) const override {
        const auto& t = static_cast<const Temperature&>(other);
        if (degrees < t.degrees) return -1;
        if (degrees > t.degrees) return 1;
        return 0;
    }
};`,
      hints: [
        'Comparable is an abstract interface with a virtual destructor.',
        'Temperature implements compareTo by casting other to Temperature.',
        'Return -1, 0, or 1 based on the comparison.',
      ],
      concepts: ['interface', 'pure-virtual', 'static-cast'],
    },
    {
      id: 'cpp-poly-10',
      title: 'Write a class hierarchy with final',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a Logger base, FileLogger derived with a final log method, and show that further override is blocked.',
      skeleton: `// Write:
// - class Logger: virtual void log(const std::string& msg) const
// - class FileLogger : public Logger: log() override final that prefixes "[FILE] "
// - Add a comment showing that a class inheriting FileLogger cannot override log`,
      solution: `class Logger {
public:
    virtual void log(const std::string& msg) const {
        std::cout << msg << std::endl;
    }
    virtual ~Logger() = default;
};

class FileLogger : public Logger {
public:
    void log(const std::string& msg) const override final {
        std::cout << "[FILE] " << msg << std::endl;
    }
};

// class BrokenLogger : public FileLogger {
//     void log(const std::string& msg) const override {} // ERROR: log is final
// };`,
      hints: [
        'Mark FileLogger::log as both override and final.',
        'Any class deriving from FileLogger cannot override log.',
        'The commented-out class demonstrates the compile error.',
      ],
      concepts: ['final', 'override', 'virtual-function'],
    },
    {
      id: 'cpp-poly-11',
      title: 'Write a factory function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a factory function that returns a unique_ptr<Shape> based on a string argument.',
      skeleton: `#include <memory>
#include <string>
// Assume Shape, Circle, Square exist.
// Write: std::unique_ptr<Shape> makeShape(const std::string& type, double size)
// "circle" -> Circle(size), "square" -> Square(size), else nullptr`,
      solution: `std::unique_ptr<Shape> makeShape(const std::string& type, double size) {
    if (type == "circle") return std::make_unique<Circle>(size);
    if (type == "square") return std::make_unique<Square>(size);
    return nullptr;
}`,
      hints: [
        'Use std::make_unique to create derived objects.',
        'Return them as unique_ptr<Shape> (implicit upcast).',
        'Return nullptr for unknown types.',
      ],
      concepts: ['factory-pattern', 'unique-ptr', 'polymorphism'],
    },
    {
      id: 'cpp-poly-12',
      title: 'Write a clone pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Implement the clone (virtual constructor) pattern for polymorphic copying.',
      skeleton: `#include <memory>
// Write:
// - class Shape with virtual clone() returning unique_ptr<Shape>
// - class Rect : public Shape with width, height
//   clone() returns a new Rect copy`,
      solution: `#include <memory>

class Shape {
public:
    virtual std::unique_ptr<Shape> clone() const = 0;
    virtual ~Shape() = default;
};

class Rect : public Shape {
    int width, height;
public:
    Rect(int w, int h) : width(w), height(h) {}
    std::unique_ptr<Shape> clone() const override {
        return std::make_unique<Rect>(*this);
    }
};`,
      hints: [
        'clone() is a virtual function returning unique_ptr<Shape>.',
        'Each derived class returns make_unique<DerivedType>(*this).',
        'This uses the copy constructor internally.',
      ],
      concepts: ['clone-pattern', 'virtual-constructor', 'unique-ptr'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-poly-13',
      title: 'Fix: missing virtual destructor',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the undefined behaviour when deleting a derived object through a base pointer.',
      skeleton: `class Base {
public:
    ~Base() { /* cleanup */ }
    virtual void work() = 0;
};

class Derived : public Base {
    int* data;
public:
    Derived() : data(new int[100]) {}
    ~Derived() { delete[] data; }
    void work() override {}
};

int main() {
    Base* p = new Derived();
    delete p;  // Bug: ~Derived never called!
    return 0;
}`,
      solution: `class Base {
public:
    virtual ~Base() { /* cleanup */ }
    virtual void work() = 0;
};

class Derived : public Base {
    int* data;
public:
    Derived() : data(new int[100]) {}
    ~Derived() override { delete[] data; }
    void work() override {}
};

int main() {
    Base* p = new Derived();
    delete p;
    return 0;
}`,
      hints: [
        'Deleting through a base pointer calls the base destructor only.',
        'The derived destructor is never called, leaking data.',
        'Make the base destructor virtual.',
      ],
      concepts: ['virtual-destructor', 'memory-leak', 'polymorphism'],
    },
    {
      id: 'cpp-poly-14',
      title: 'Fix: override signature mismatch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the derived function so it actually overrides the base virtual.',
      skeleton: `class Renderer {
public:
    virtual void render(int width, int height) const {}
    virtual ~Renderer() = default;
};

class GLRenderer : public Renderer {
public:
    // Bug: missing const qualifier - this hides instead of overriding
    void render(int width, int height) override {}
};`,
      solution: `class Renderer {
public:
    virtual void render(int width, int height) const {}
    virtual ~Renderer() = default;
};

class GLRenderer : public Renderer {
public:
    void render(int width, int height) const override {}
};`,
      hints: [
        'The base function is const, but the derived one is not.',
        'A non-const function does not override a const virtual.',
        'Add const to the derived function signature.',
      ],
      concepts: ['override', 'const-correctness', 'signature-mismatch'],
    },
    {
      id: 'cpp-poly-15',
      title: 'Fix: instantiating abstract class',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the code so it compiles.',
      skeleton: `class Printable {
public:
    virtual void print() const = 0;
    virtual ~Printable() = default;
};

class Report : public Printable {
    std::string title;
public:
    Report(std::string t) : title(std::move(t)) {}
    // Bug: forgot to implement print()
};

int main() {
    Report r("Q1");  // ERROR: cannot instantiate abstract class
    return 0;
}`,
      solution: `class Printable {
public:
    virtual void print() const = 0;
    virtual ~Printable() = default;
};

class Report : public Printable {
    std::string title;
public:
    Report(std::string t) : title(std::move(t)) {}
    void print() const override {
        std::cout << title << std::endl;
    }
};

int main() {
    Report r("Q1");
    return 0;
}`,
      hints: [
        'Report inherits a pure virtual function that must be implemented.',
        'Without implementing print(), Report is still abstract.',
        'Add a print() override to Report.',
      ],
      concepts: ['pure-virtual', 'abstract-class', 'override'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-poly-16',
      title: 'Predict: virtual vs non-virtual dispatch',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the output of calling through a base pointer.',
      skeleton: `#include <iostream>

class Base {
public:
    virtual void vfunc() { std::cout << "BV "; }
    void func() { std::cout << "BN "; }
    virtual ~Base() = default;
};

class Derived : public Base {
public:
    void vfunc() override { std::cout << "DV "; }
    void func() { std::cout << "DN "; }
};

int main() {
    Base* p = new Derived();
    p->vfunc();
    p->func();
    delete p;
    return 0;
}`,
      solution: `DV BN `,
      hints: [
        'vfunc() is virtual so the derived version is called.',
        'func() is non-virtual so the base version is called through a Base pointer.',
        'Output: DV BN.',
      ],
      concepts: ['virtual-dispatch', 'name-hiding', 'static-binding'],
    },
    {
      id: 'cpp-poly-17',
      title: 'Predict: destruction through base pointer',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the destructor output.',
      skeleton: `#include <iostream>

class A {
public:
    virtual ~A() { std::cout << "~A "; }
};

class B : public A {
public:
    ~B() override { std::cout << "~B "; }
};

class C : public B {
public:
    ~C() override { std::cout << "~C "; }
};

int main() {
    A* p = new C();
    delete p;
    return 0;
}`,
      solution: `~C ~B ~A `,
      hints: [
        'The destructor is virtual, so the most derived destructor runs first.',
        'Destructors chain from derived to base.',
        'Output: ~C ~B ~A.',
      ],
      concepts: ['virtual-destructor', 'destructor-order'],
    },
    {
      id: 'cpp-poly-18',
      title: 'Predict: dynamic_cast result',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Predict what happens with a dynamic_cast.',
      skeleton: `#include <iostream>

class Base {
public:
    virtual ~Base() = default;
};

class Derived : public Base {
public:
    int x = 99;
};

int main() {
    Base* b = new Base();
    Derived* d = dynamic_cast<Derived*>(b);
    if (d == nullptr)
        std::cout << "null";
    else
        std::cout << d->x;
    delete b;
    return 0;
}`,
      solution: `null`,
      hints: [
        'b points to a Base object, not a Derived.',
        'dynamic_cast checks the runtime type.',
        'Casting a Base* to Derived* fails and returns nullptr.',
      ],
      concepts: ['dynamic-cast', 'RTTI', 'polymorphism'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-poly-19',
      title: 'Refactor: replace type switches with polymorphism',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Replace the type-checking if-else chain with virtual dispatch.',
      skeleton: `#include <iostream>
#include <string>

struct Shape {
    std::string type;
    double dim1, dim2;
};

double getArea(const Shape& s) {
    if (s.type == "circle")
        return 3.14159 * s.dim1 * s.dim1;
    else if (s.type == "rect")
        return s.dim1 * s.dim2;
    return 0;
}`,
      solution: `#include <iostream>

class Shape {
public:
    virtual double getArea() const = 0;
    virtual ~Shape() = default;
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double getArea() const override {
        return 3.14159 * radius * radius;
    }
};

class Rect : public Shape {
    double width, height;
public:
    Rect(double w, double h) : width(w), height(h) {}
    double getArea() const override {
        return width * height;
    }
};`,
      hints: [
        'Replace the string type field with a class hierarchy.',
        'Each shape type gets its own class with an overridden getArea().',
        'Make Shape abstract with getArea() as pure virtual.',
      ],
      concepts: ['polymorphism', 'open-closed-principle', 'refactoring'],
    },
    {
      id: 'cpp-poly-20',
      title: 'Refactor: add override and virtual destructor',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Add missing override specifiers and virtual destructors to this hierarchy.',
      skeleton: `class Handler {
public:
    virtual void handle(int code) {}
    ~Handler() {}
};

class ErrorHandler : public Handler {
public:
    void handle(int code) { std::cout << "Error: " << code; }
    ~ErrorHandler() {}
};

class FatalHandler : public ErrorHandler {
public:
    void handle(int code) { std::cout << "FATAL: " << code; }
    ~FatalHandler() {}
};`,
      solution: `class Handler {
public:
    virtual void handle(int code) {}
    virtual ~Handler() = default;
};

class ErrorHandler : public Handler {
public:
    void handle(int code) override { std::cout << "Error: " << code; }
    ~ErrorHandler() override = default;
};

class FatalHandler : public ErrorHandler {
public:
    void handle(int code) override { std::cout << "FATAL: " << code; }
    ~FatalHandler() override = default;
};`,
      hints: [
        'Add override to every derived handle() method.',
        'Make the base destructor virtual.',
        'Add override to derived destructors too for clarity.',
      ],
      concepts: ['override', 'virtual-destructor', 'best-practices'],
    },
  ],
};
