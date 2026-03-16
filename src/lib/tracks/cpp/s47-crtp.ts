import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-crtp',
  title: '47. CRTP',
  explanation: `## CRTP (Curiously Recurring Template Pattern) in C++

CRTP is a pattern where a class inherits from a template instantiated with itself:

\`\`\`cpp
template <typename Derived>
class Base {
    // access Derived members via static_cast
};

class Foo : public Base<Foo> {
    // Foo inherits from Base<Foo>
};
\`\`\`

### Static Polymorphism
Replace virtual dispatch with compile-time dispatch:
\`\`\`cpp
template <typename Derived>
class Shape {
public:
    double area() const {
        return static_cast<const Derived*>(this)->area_impl();
    }
};

class Circle : public Shape<Circle> {
    double r_;
public:
    Circle(double r) : r_(r) {}
    double area_impl() const { return 3.14159 * r_ * r_; }
};
\`\`\`

### Object Counting
\`\`\`cpp
template <typename T>
class Counter {
    static inline int count_ = 0;
public:
    Counter() { ++count_; }
    ~Counter() { --count_; }
    static int count() { return count_; }
};

class Widget : public Counter<Widget> {};
// Widget::count() returns the number of live Widget instances
\`\`\`

### Mixin Classes
Add functionality without virtual inheritance:
\`\`\`cpp
template <typename Derived>
class Printable {
public:
    void print() const {
        static_cast<const Derived*>(this)->print_impl();
    }
};
\`\`\`

### Method Chaining via CRTP
Return \`Derived&\` from setters to enable fluent API on the concrete type.

### Key Benefits
- Zero-cost abstraction (no vtable overhead)
- Compile-time polymorphism
- Code reuse through mixin composition
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-crtp-1',
      title: 'Basic CRTP inheritance',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the template parameter so the class inherits from Base with CRTP.',
      skeleton: `template <typename Derived>
class Base {};

class Widget : public Base<__BLANK__> {};`,
      solution: `template <typename Derived>
class Base {};

class Widget : public Base<Widget> {};`,
      hints: [
        'In CRTP, the derived class passes itself as the template argument.',
        'Widget inherits from Base<Widget>.',
        'Fill in `Widget`.',
      ],
      concepts: ['crtp', 'static-polymorphism'],
    },
    {
      id: 'cpp-crtp-2',
      title: 'static_cast to Derived',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the cast to safely access the derived class from the base.',
      skeleton: `template <typename Derived>
class Base {
public:
    void interface() {
        __BLANK__<Derived*>(this)->implementation();
    }
};`,
      solution: `template <typename Derived>
class Base {
public:
    void interface() {
        static_cast<Derived*>(this)->implementation();
    }
};`,
      hints: [
        'CRTP uses a compile-time cast to access Derived members.',
        'Since we know Derived inherits from Base<Derived>, the cast is safe.',
        'Use `static_cast`.',
      ],
      concepts: ['static-cast', 'crtp-dispatch'],
    },
    {
      id: 'cpp-crtp-3',
      title: 'CRTP counter static member',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the storage specifier so each derived type gets its own counter.',
      skeleton: `template <typename T>
class Counter {
    __BLANK__ int count_;
public:
    Counter() { ++count_; }
    ~Counter() { --count_; }
    static int count() { return count_; }
};

template <typename T>
int Counter<T>::count_ = 0;`,
      solution: `template <typename T>
class Counter {
    static int count_;
public:
    Counter() { ++count_; }
    ~Counter() { --count_; }
    static int count() { return count_; }
};

template <typename T>
int Counter<T>::count_ = 0;`,
      hints: [
        'Each instantiation of Counter<T> should have its own count.',
        'A class-level variable shared across all instances of that instantiation.',
        'The specifier is `static`.',
      ],
      concepts: ['static-member', 'crtp-counter'],
    },
    {
      id: 'cpp-crtp-4',
      title: 'Return Derived& for chaining',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the return type so the setter returns the derived type for method chaining.',
      skeleton: `template <typename Derived>
class Builder {
public:
    __BLANK__& set_name(const char* name) {
        // store name...
        return static_cast<Derived&>(*this);
    }
};`,
      solution: `template <typename Derived>
class Builder {
public:
    Derived& set_name(const char* name) {
        // store name...
        return static_cast<Derived&>(*this);
    }
};`,
      hints: [
        'To chain methods on the concrete type, return a reference to Derived.',
        'static_cast<Derived&>(*this) converts the base reference.',
        'The return type is `Derived`.',
      ],
      concepts: ['method-chaining', 'crtp'],
    },
    {
      id: 'cpp-crtp-5',
      title: 'CRTP with const method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the const-correct cast to call a const method on Derived.',
      skeleton: `template <typename Derived>
class Printable {
public:
    void print() const {
        static_cast<__BLANK__>(this)->do_print();
    }
};`,
      solution: `template <typename Derived>
class Printable {
public:
    void print() const {
        static_cast<const Derived*>(this)->do_print();
    }
};`,
      hints: [
        'The method is const, so `this` is a const pointer.',
        'Cast to const Derived* to maintain const correctness.',
        'The cast target is `const Derived*`.',
      ],
      concepts: ['const-correctness', 'static-cast', 'crtp'],
    },
    {
      id: 'cpp-crtp-6',
      title: 'inline static counter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the C++17 keywords to define the counter inline without a separate definition.',
      skeleton: `template <typename T>
class Counter {
    static __BLANK__ int count_ = 0;
public:
    Counter() { ++count_; }
    static int count() { return count_; }
};`,
      solution: `template <typename T>
class Counter {
    static inline int count_ = 0;
public:
    Counter() { ++count_; }
    static int count() { return count_; }
};`,
      hints: [
        'C++17 allows static members to be initialized in-class.',
        'The keyword that enables this is placed between static and the type.',
        'The keyword is `inline`.',
      ],
      concepts: ['inline-static', 'cpp17'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-crtp-7',
      title: 'Static polymorphism for shapes',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a CRTP base class Shape with an area() method that delegates to area_impl(). Write a Rectangle derived class.',
      skeleton: `// TODO: Shape CRTP base with area()
// TODO: Rectangle : Shape<Rectangle> with area_impl()`,
      solution: `template <typename Derived>
class Shape {
public:
    double area() const {
        return static_cast<const Derived*>(this)->area_impl();
    }
};

class Rectangle : public Shape<Rectangle> {
    double w_, h_;
public:
    Rectangle(double w, double h) : w_(w), h_(h) {}
    double area_impl() const { return w_ * h_; }
};`,
      hints: [
        'Shape<Derived> has area() that calls static_cast<const Derived*>(this)->area_impl().',
        'Rectangle inherits from Shape<Rectangle>.',
        'area_impl() in Rectangle returns w_ * h_.',
      ],
      concepts: ['crtp', 'static-polymorphism'],
    },
    {
      id: 'cpp-crtp-8',
      title: 'CRTP object counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a CRTP Counter base that tracks the number of live instances of each derived type. Include count() static method.',
      skeleton: `// TODO: Counter<T> CRTP base
// class Foo : public Counter<Foo> {};
// Foo a, b;
// Foo::count() should return 2`,
      solution: `template <typename T>
class Counter {
    static inline int count_ = 0;
public:
    Counter() { ++count_; }
    Counter(const Counter&) { ++count_; }
    ~Counter() { --count_; }
    static int count() { return count_; }
};`,
      hints: [
        'Use a static inline int for each template instantiation.',
        'Increment in constructor and copy constructor, decrement in destructor.',
        'Each derived type gets its own count_ because T is different.',
      ],
      concepts: ['crtp-counter', 'static-member', 'raii'],
    },
    {
      id: 'cpp-crtp-9',
      title: 'Equality mixin',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a CRTP mixin EqualityComparable that provides operator== and operator!= based on a compare() method that Derived must implement. compare() returns 0 for equal.',
      skeleton: `// TODO: EqualityComparable<Derived> mixin
// Derived must implement: int compare(const Derived&) const`,
      solution: `template <typename Derived>
class EqualityComparable {
public:
    bool operator==(const Derived& other) const {
        return static_cast<const Derived*>(this)->compare(other) == 0;
    }
    bool operator!=(const Derived& other) const {
        return !(*this == other);
    }
};`,
      hints: [
        'operator== casts this to const Derived* and calls compare().',
        'compare() returning 0 means equal.',
        'operator!= is just the negation of operator==.',
      ],
      concepts: ['crtp-mixin', 'operator-overloading'],
    },
    {
      id: 'cpp-crtp-10',
      title: 'CRTP method chaining builder',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a CRTP base BuilderBase with set_id(int) that returns Derived&. Write a concrete HtmlBuilder that adds set_class(string) and also chains correctly.',
      skeleton: `#include <string>

// TODO: BuilderBase<Derived> with set_id returning Derived&
// TODO: HtmlBuilder : BuilderBase<HtmlBuilder> with set_class`,
      solution: `#include <string>

template <typename Derived>
class BuilderBase {
protected:
    int id_ = 0;
public:
    Derived& set_id(int id) {
        id_ = id;
        return static_cast<Derived&>(*this);
    }
};

class HtmlBuilder : public BuilderBase<HtmlBuilder> {
    std::string class_;
public:
    HtmlBuilder& set_class(const std::string& cls) {
        class_ = cls;
        return *this;
    }
    int id() const { return id_; }
    const std::string& css_class() const { return class_; }
};

// Usage: HtmlBuilder().set_id(1).set_class("main")`,
      hints: [
        'set_id returns Derived& via static_cast<Derived&>(*this).',
        'This allows set_id(1).set_class("x") to work on HtmlBuilder.',
        'Without CRTP, set_id would return BuilderBase& and lose the derived type.',
      ],
      concepts: ['crtp', 'method-chaining', 'builder'],
    },
    {
      id: 'cpp-crtp-11',
      title: 'Cloneable mixin',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a CRTP mixin Cloneable<Derived> that provides a clone() method returning unique_ptr<Derived> by copy-constructing Derived.',
      skeleton: `#include <memory>

// TODO: Cloneable<Derived> mixin with clone()`,
      solution: `#include <memory>

template <typename Derived>
class Cloneable {
public:
    std::unique_ptr<Derived> clone() const {
        return std::make_unique<Derived>(
            static_cast<const Derived&>(*this));
    }
};`,
      hints: [
        'clone() uses the Derived copy constructor to make a copy.',
        'static_cast<const Derived&>(*this) gives the derived object.',
        'Return it wrapped in unique_ptr via make_unique.',
      ],
      concepts: ['crtp-mixin', 'clone', 'unique-ptr'],
    },
    {
      id: 'cpp-crtp-12',
      title: 'CRTP with free function dispatch',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a CRTP base Serializable<Derived> with a serialize() method, and a free function template serialize(const Base&) that works with any CRTP-derived type.',
      skeleton: `#include <string>

// TODO: Serializable<Derived> with serialize() calling to_string_impl()
// TODO: free function template that accepts any Serializable`,
      solution: `#include <string>

template <typename Derived>
class Serializable {
public:
    std::string serialize() const {
        return static_cast<const Derived*>(this)->to_string_impl();
    }
};

template <typename T>
std::string to_json(const Serializable<T>& obj) {
    return "{ \\"data\\": \\"" + obj.serialize() + "\\" }";
}`,
      hints: [
        'The base class calls to_string_impl() on Derived via static_cast.',
        'The free function takes const Serializable<T>& to accept any derived type.',
        'Template argument deduction infers T from the argument.',
      ],
      concepts: ['crtp', 'free-function-dispatch', 'template-deduction'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-crtp-13',
      title: 'Fix wrong CRTP argument',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the CRTP usage where the derived class passes the wrong type to the base.',
      skeleton: `template <typename Derived>
class Counter {
    static inline int count_ = 0;
public:
    Counter() { ++count_; }
    static int count() { return count_; }
};

class Cat : public Counter<Cat> {};
class Dog : public Counter<Cat> {};  // BUG: should be Counter<Dog>

// Dog::count() incorrectly shares Cat's counter`,
      solution: `template <typename Derived>
class Counter {
    static inline int count_ = 0;
public:
    Counter() { ++count_; }
    static int count() { return count_; }
};

class Cat : public Counter<Cat> {};
class Dog : public Counter<Dog> {};`,
      hints: [
        'In CRTP, each class must pass ITSELF as the template argument.',
        'Dog inherits from Counter<Cat>, sharing Cat\'s counter.',
        'Change Counter<Cat> to Counter<Dog>.',
      ],
      concepts: ['crtp', 'template-argument'],
    },
    {
      id: 'cpp-crtp-14',
      title: 'Fix missing const in CRTP cast',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the const-correctness error in the CRTP base class.',
      skeleton: `template <typename Derived>
class Printable {
public:
    void print() const {
        static_cast<Derived*>(this)->do_print();
        // BUG: casting away const from 'this' in a const method
    }
};

class Item : public Printable<Item> {
public:
    void do_print() const { /* ... */ }
};`,
      solution: `template <typename Derived>
class Printable {
public:
    void print() const {
        static_cast<const Derived*>(this)->do_print();
    }
};

class Item : public Printable<Item> {
public:
    void do_print() const { /* ... */ }
};`,
      hints: [
        'In a const method, this is a pointer-to-const.',
        'static_cast<Derived*>(this) illegally strips const.',
        'Use static_cast<const Derived*>(this) instead.',
      ],
      concepts: ['const-correctness', 'static-cast', 'crtp'],
    },
    {
      id: 'cpp-crtp-15',
      title: 'Fix CRTP counter missing copy constructor',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the object counter that gives wrong counts when objects are copied.',
      skeleton: `template <typename T>
class Counter {
    static inline int count_ = 0;
public:
    Counter() { ++count_; }
    ~Counter() { --count_; }
    // BUG: default copy constructor does not increment count_
    static int count() { return count_; }
};

class Foo : public Counter<Foo> {};

void test() {
    Foo a;       // count = 1
    Foo b = a;   // count should be 2 but copy ctor doesn't increment
}`,
      solution: `template <typename T>
class Counter {
    static inline int count_ = 0;
public:
    Counter() { ++count_; }
    Counter(const Counter&) { ++count_; }
    Counter(Counter&&) { ++count_; }
    ~Counter() { --count_; }
    static int count() { return count_; }
};

class Foo : public Counter<Foo> {};`,
      hints: [
        'The default copy constructor copies members but does not run your constructor body.',
        'Define a copy constructor that also increments count_.',
        'Consider the move constructor as well.',
      ],
      concepts: ['crtp-counter', 'copy-constructor', 'special-member-functions'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-crtp-16',
      title: 'Predict CRTP counter values',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

template <typename T>
class Counter {
    static inline int n_ = 0;
public:
    Counter() { ++n_; }
    ~Counter() { --n_; }
    static int count() { return n_; }
};

class A : public Counter<A> {};
class B : public Counter<B> {};

int main() {
    A a1, a2;
    B b1;
    std::cout << A::count() << " " << B::count() << std::endl;
}`,
      solution: `2 1`,
      hints: [
        'Counter<A> and Counter<B> have separate static counts.',
        'Two A objects: A::count() = 2.',
        'One B object: B::count() = 1.',
      ],
      concepts: ['crtp-counter', 'static-member'],
    },
    {
      id: 'cpp-crtp-17',
      title: 'Predict static polymorphism call',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

template <typename D>
class Base {
public:
    void go() { static_cast<D*>(this)->do_it(); }
};

class X : public Base<X> {
public:
    void do_it() { std::cout << "X" << std::endl; }
};

int main() {
    X x;
    x.go();
}`,
      solution: `X`,
      hints: [
        'go() casts this to X* and calls do_it().',
        'X::do_it() prints "X".',
        'No virtual dispatch -- resolved at compile time.',
      ],
      concepts: ['crtp', 'static-polymorphism'],
    },
    {
      id: 'cpp-crtp-18',
      title: 'Predict chaining result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

template <typename D>
class Setter {
protected:
    int val_ = 0;
public:
    D& set(int v) { val_ = v; return static_cast<D&>(*this); }
};

class Obj : public Setter<Obj> {
public:
    void show() { std::cout << val_ << std::endl; }
};

int main() {
    Obj().set(42).show();
}`,
      solution: `42`,
      hints: [
        'set(42) stores 42 and returns Obj& via CRTP.',
        'show() prints val_ which is 42.',
        'Method chaining works because set returns the derived type.',
      ],
      concepts: ['crtp', 'method-chaining'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-crtp-19',
      title: 'Refactor virtual dispatch to CRTP',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Replace the virtual function dispatch with CRTP static polymorphism.',
      skeleton: `#include <iostream>

class Animal {
public:
    virtual void speak() const = 0;
    virtual ~Animal() = default;
};

class Dog : public Animal {
public:
    void speak() const override { std::cout << "Woof\\n"; }
};

class Cat : public Animal {
public:
    void speak() const override { std::cout << "Meow\\n"; }
};`,
      solution: `#include <iostream>

template <typename Derived>
class Animal {
public:
    void speak() const {
        static_cast<const Derived*>(this)->speak_impl();
    }
};

class Dog : public Animal<Dog> {
public:
    void speak_impl() const { std::cout << "Woof\\n"; }
};

class Cat : public Animal<Cat> {
public:
    void speak_impl() const { std::cout << "Meow\\n"; }
};`,
      hints: [
        'Replace the virtual function with a CRTP dispatch to speak_impl().',
        'Animal becomes Animal<Derived> template.',
        'No vtable overhead -- dispatch is resolved at compile time.',
      ],
      concepts: ['crtp', 'virtual-to-static', 'zero-cost-abstraction'],
    },
    {
      id: 'cpp-crtp-20',
      title: 'Refactor repeated operators to CRTP mixin',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Both Point and Color duplicate operator== and operator!=. Extract the equality logic into a CRTP mixin.',
      skeleton: `struct Point {
    int x, y;
    bool operator==(const Point& o) const { return x == o.x && y == o.y; }
    bool operator!=(const Point& o) const { return !(*this == o); }
};

struct Color {
    int r, g, b;
    bool operator==(const Color& o) const { return r == o.r && g == o.g && b == o.b; }
    bool operator!=(const Color& o) const { return !(*this == o); }
};`,
      solution: `template <typename Derived>
struct InequalityMixin {
    bool operator!=(const Derived& o) const {
        return !(static_cast<const Derived&>(*this) == o);
    }
};

struct Point : InequalityMixin<Point> {
    int x, y;
    bool operator==(const Point& o) const { return x == o.x && y == o.y; }
};

struct Color : InequalityMixin<Color> {
    int r, g, b;
    bool operator==(const Color& o) const { return r == o.r && g == o.g && b == o.b; }
};`,
      hints: [
        'The operator!= is always !(*this == o) -- it can be extracted.',
        'A CRTP mixin provides operator!= in terms of operator==.',
        'Each struct only needs to define operator==.',
      ],
      concepts: ['crtp-mixin', 'dry', 'operator-overloading'],
    },
  ],
};
