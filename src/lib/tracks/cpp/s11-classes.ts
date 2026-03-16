import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-class',
  title: '11. Classes',
  explanation: `## Classes in C++

Classes are the foundation of object-oriented programming in C++. A class bundles data (member variables) and behaviour (member functions) into a single unit.

### Basic Class Definition
\`\`\`cpp
class Rectangle {
public:
    int width;
    int height;

    int area() {
        return width * height;
    }
};
\`\`\`

### Access Specifiers
- **public**: accessible from anywhere
- **private**: accessible only within the class (default for \`class\`)
- **protected**: accessible within the class and derived classes

### The \`this\` Pointer
Inside a member function, \`this\` is a pointer to the invoking object. Useful to disambiguate when parameter names shadow member names.

\`\`\`cpp
class Point {
    int x, y;
public:
    void set(int x, int y) {
        this->x = x;
        this->y = y;
    }
};
\`\`\`

### Friend Functions
A \`friend\` function declared inside a class can access its private and protected members even though it is not a member itself.

\`\`\`cpp
class Box {
    int side;
public:
    Box(int s) : side(s) {}
    friend int volume(const Box& b);
};
int volume(const Box& b) { return b.side * b.side * b.side; }
\`\`\`

### Struct vs Class
In C++ the only difference is the default access: \`struct\` defaults to \`public\`, \`class\` defaults to \`private\`.
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-class-1',
      title: 'Define a simple class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the keyword to define a class.',
      skeleton: `__BLANK__ Dog {
public:
    std::string name;
    void bark() {
        std::cout << name << " says Woof!" << std::endl;
    }
};`,
      solution: `class Dog {
public:
    std::string name;
    void bark() {
        std::cout << name << " says Woof!" << std::endl;
    }
};`,
      hints: [
        'You need the keyword that defines a user-defined type with default private access.',
        'It is the OOP keyword for creating types.',
        'The keyword is `class`.',
      ],
      concepts: ['class', 'definition'],
    },
    {
      id: 'cpp-class-2',
      title: 'Public access specifier',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the access specifier so members are accessible outside the class.',
      skeleton: `class Counter {
__BLANK__:
    int count = 0;
    void increment() { ++count; }
    int get() const { return count; }
};`,
      solution: `class Counter {
public:
    int count = 0;
    void increment() { ++count; }
    int get() const { return count; }
};`,
      hints: [
        'This specifier makes members accessible from any code.',
        'The opposite of private.',
        'The keyword is `public`.',
      ],
      concepts: ['access-specifier', 'public'],
    },
    {
      id: 'cpp-class-3',
      title: 'Using the this pointer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Use the this pointer to disambiguate the member variable from the parameter.',
      skeleton: `class Point {
    int x;
public:
    void setX(int x) {
        __BLANK__->x = x;
    }
    int getX() const { return x; }
};`,
      solution: `class Point {
    int x;
public:
    void setX(int x) {
        this->x = x;
    }
    int getX() const { return x; }
};`,
      hints: [
        'There is a built-in pointer that refers to the current object.',
        'It is an implicit pointer available in every non-static member function.',
        'The keyword is `this`.',
      ],
      concepts: ['this-pointer', 'member-access'],
    },
    {
      id: 'cpp-class-4',
      title: 'Friend function declaration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Declare the function as a friend so it can access private members.',
      skeleton: `class Secret {
    int value = 42;
public:
    __BLANK__ int reveal(const Secret& s);
};

int reveal(const Secret& s) {
    return s.value;
}`,
      solution: `class Secret {
    int value = 42;
public:
    friend int reveal(const Secret& s);
};

int reveal(const Secret& s) {
    return s.value;
}`,
      hints: [
        'A special keyword grants non-member functions access to private data.',
        'It is declared inside the class but is not a member.',
        'The keyword is `friend`.',
      ],
      concepts: ['friend-function', 'access-specifier'],
    },
    {
      id: 'cpp-class-5',
      title: 'Const member function',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Mark the getter as const so it can be called on const objects.',
      skeleton: `class Temperature {
    double celsius;
public:
    Temperature(double c) : celsius(c) {}
    double getCelsius() __BLANK__ { return celsius; }
};`,
      solution: `class Temperature {
    double celsius;
public:
    Temperature(double c) : celsius(c) {}
    double getCelsius() const { return celsius; }
};`,
      hints: [
        'This qualifier promises the function will not modify the object.',
        'It appears after the parameter list.',
        'The keyword is `const`.',
      ],
      concepts: ['const-member-function', 'const-correctness'],
    },
    {
      id: 'cpp-class-6',
      title: 'Private by default',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the access specifier that is the default for class members.',
      skeleton: `class Vault {
    // members here are __BLANK__ by default
    int pin = 1234;
public:
    bool unlock(int attempt) { return attempt == pin; }
};`,
      solution: `class Vault {
    // members here are private by default
    int pin = 1234;
public:
    bool unlock(int attempt) { return attempt == pin; }
};`,
      hints: [
        'In a class, members without an explicit specifier have restricted access.',
        'Only the class itself can access them.',
        'The default access for class members is `private`.',
      ],
      concepts: ['access-specifier', 'private'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-class-7',
      title: 'Write a Rectangle class',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a Rectangle class with private width/height, a constructor, and an area() method.',
      skeleton: `// Write a class Rectangle with:
// - private int width and height
// - public constructor taking width and height
// - public int area() const returning width * height`,
      solution: `class Rectangle {
    int width;
    int height;
public:
    Rectangle(int w, int h) : width(w), height(h) {}
    int area() const { return width * height; }
};`,
      hints: [
        'Start with `class Rectangle {` and declare private members first.',
        'Use a member initializer list in the constructor.',
        'The area function should be marked const.',
      ],
      concepts: ['class', 'constructor', 'member-function'],
    },
    {
      id: 'cpp-class-8',
      title: 'Write a BankAccount class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a BankAccount class with private balance, deposit(), withdraw() (no overdraft), and getBalance() const.',
      skeleton: `// Write class BankAccount with:
// - private double balance (starts at 0)
// - public void deposit(double amount) - adds to balance
// - public bool withdraw(double amount) - subtracts if sufficient, returns success
// - public double getBalance() const`,
      solution: `class BankAccount {
    double balance = 0.0;
public:
    void deposit(double amount) { balance += amount; }
    bool withdraw(double amount) {
        if (amount > balance) return false;
        balance -= amount;
        return true;
    }
    double getBalance() const { return balance; }
};`,
      hints: [
        'Initialize balance to 0.0 as a default member initializer.',
        'withdraw should check if amount <= balance before subtracting.',
        'getBalance should be const since it does not modify state.',
      ],
      concepts: ['class', 'encapsulation', 'const-member-function'],
    },
    {
      id: 'cpp-class-9',
      title: 'Write a class with a friend function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a Circle class with private radius and a friend function circumference() that computes 2*3.14159*radius.',
      skeleton: `// Write class Circle with:
// - private double radius
// - public constructor taking radius
// - friend function: double circumference(const Circle& c)`,
      solution: `class Circle {
    double radius;
public:
    Circle(double r) : radius(r) {}
    friend double circumference(const Circle& c);
};

double circumference(const Circle& c) {
    return 2 * 3.14159 * c.radius;
}`,
      hints: [
        'Declare the friend function inside the class body.',
        'The friend function is defined outside the class.',
        'It accesses c.radius directly because of the friend declaration.',
      ],
      concepts: ['friend-function', 'encapsulation'],
    },
    {
      id: 'cpp-class-10',
      title: 'Write a Stack class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a simple Stack class using a vector internally, with push(), pop(), top(), and empty() methods.',
      skeleton: `#include <vector>
#include <stdexcept>
// Write class Stack with:
// - private std::vector<int> data
// - public void push(int val)
// - public void pop() - throws if empty
// - public int top() const - throws if empty
// - public bool empty() const`,
      solution: `#include <vector>
#include <stdexcept>

class Stack {
    std::vector<int> data;
public:
    void push(int val) { data.push_back(val); }
    void pop() {
        if (data.empty()) throw std::runtime_error("stack underflow");
        data.pop_back();
    }
    int top() const {
        if (data.empty()) throw std::runtime_error("stack underflow");
        return data.back();
    }
    bool empty() const { return data.empty(); }
};`,
      hints: [
        'Use std::vector<int> as the internal storage.',
        'push_back adds, pop_back removes, back() returns the last element.',
        'Throw std::runtime_error when operating on an empty stack.',
      ],
      concepts: ['class', 'vector', 'exception'],
    },
    {
      id: 'cpp-class-11',
      title: 'Write a class with getters and setters',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a Person class with private name and age, a constructor, and getters/setters for both.',
      skeleton: `// Write class Person with:
// - private std::string name, int age
// - constructor taking both
// - getName() const, getAge() const
// - setName(std::string), setAge(int)`,
      solution: `class Person {
    std::string name;
    int age;
public:
    Person(std::string n, int a) : name(std::move(n)), age(a) {}
    std::string getName() const { return name; }
    int getAge() const { return age; }
    void setName(std::string n) { name = std::move(n); }
    void setAge(int a) { age = a; }
};`,
      hints: [
        'Use a member initializer list in the constructor.',
        'Getters should be const member functions.',
        'Setters take the new value and assign it to the member.',
      ],
      concepts: ['encapsulation', 'getter', 'setter'],
    },
    {
      id: 'cpp-class-12',
      title: 'Write a class with static member',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write an Entity class with a static counter that tracks how many instances exist. Increment in constructor, decrement in destructor.',
      skeleton: `// Write class Entity with:
// - static int count (initialized to 0)
// - constructor increments count
// - destructor decrements count
// - static int getCount()`,
      solution: `class Entity {
    static int count;
public:
    Entity() { ++count; }
    ~Entity() { --count; }
    static int getCount() { return count; }
};

int Entity::count = 0;`,
      hints: [
        'Static members are shared across all instances.',
        'A static member variable must be defined outside the class.',
        'The destructor is ~Entity().',
      ],
      concepts: ['static-member', 'constructor', 'destructor'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-class-13',
      title: 'Fix: accessing private member',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the code so that main() can access the name member.',
      skeleton: `class Animal {
    std::string name;
public:
    Animal(std::string n) : name(n) {}
};

int main() {
    Animal a("Cat");
    std::cout << a.name << std::endl;
    return 0;
}`,
      solution: `class Animal {
public:
    std::string name;
    Animal(std::string n) : name(n) {}
};

int main() {
    Animal a("Cat");
    std::cout << a.name << std::endl;
    return 0;
}`,
      hints: [
        'name is currently in the private section of the class.',
        'Either make name public, or add a getter.',
        'Move name below the public: specifier.',
      ],
      concepts: ['access-specifier', 'private', 'public'],
    },
    {
      id: 'cpp-class-14',
      title: 'Fix: missing semicolon after class',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the compilation error in this class definition.',
      skeleton: `class Timer {
public:
    int seconds = 0;
    void tick() { ++seconds; }
}

int main() {
    Timer t;
    t.tick();
    return 0;
}`,
      solution: `class Timer {
public:
    int seconds = 0;
    void tick() { ++seconds; }
};

int main() {
    Timer t;
    t.tick();
    return 0;
}`,
      hints: [
        'C++ class definitions require punctuation after the closing brace.',
        'This is the same requirement as for struct definitions.',
        'Add a semicolon after the closing brace: `};`.',
      ],
      concepts: ['class', 'syntax'],
    },
    {
      id: 'cpp-class-15',
      title: 'Fix: const method tries to modify member',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the const-correctness issue so the code compiles.',
      skeleton: `class Logger {
    int messageCount = 0;
public:
    void log(const std::string& msg) const {
        ++messageCount;
        std::cout << msg << std::endl;
    }
    int getCount() const { return messageCount; }
};`,
      solution: `class Logger {
    mutable int messageCount = 0;
public:
    void log(const std::string& msg) const {
        ++messageCount;
        std::cout << msg << std::endl;
    }
    int getCount() const { return messageCount; }
};`,
      hints: [
        'A const member function cannot modify member variables.',
        'There is a keyword that allows mutation inside const methods.',
        'Declare messageCount as `mutable int messageCount = 0;`.',
      ],
      concepts: ['const-correctness', 'mutable'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-class-16',
      title: 'Predict: default access in class',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Predict whether the code compiles and what happens if it does.',
      skeleton: `class Box {
    int side = 5;
};

int main() {
    Box b;
    // Does this compile?
    // std::cout << b.side;
    // Answer: "compile error" or the output value
}`,
      solution: `compile error`,
      hints: [
        'What is the default access specifier in a class?',
        'Members without a specifier are private in a class.',
        'Accessing a private member from outside the class is a compile error.',
      ],
      concepts: ['access-specifier', 'private'],
    },
    {
      id: 'cpp-class-17',
      title: 'Predict: struct default access',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Predict the output of this struct usage.',
      skeleton: `#include <iostream>

struct Pair {
    int x = 10;
    int y = 20;
};

int main() {
    Pair p;
    std::cout << p.x + p.y << std::endl;
    return 0;
}`,
      solution: `30`,
      hints: [
        'struct members are public by default.',
        'x is 10 and y is 20.',
        'The output is 10 + 20 = 30.',
      ],
      concepts: ['struct', 'default-access'],
    },
    {
      id: 'cpp-class-18',
      title: 'Predict: static member count',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the output after creating and destroying objects.',
      skeleton: `#include <iostream>

class Widget {
    static int count;
public:
    Widget() { ++count; }
    ~Widget() { --count; }
    static int getCount() { return count; }
};
int Widget::count = 0;

int main() {
    Widget a;
    {
        Widget b;
        Widget c;
        std::cout << Widget::getCount() << " ";
    }
    std::cout << Widget::getCount() << std::endl;
    return 0;
}`,
      solution: `3 1`,
      hints: [
        'count starts at 0. Three Widgets are created total at the inner scope.',
        'b and c are destroyed when the inner scope ends.',
        'Output is 3 (after creating a,b,c) then 1 (only a remains).',
      ],
      concepts: ['static-member', 'destructor', 'scope'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-class-19',
      title: 'Refactor: encapsulate public data',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor the class to make data private and provide getters/setters.',
      skeleton: `class Student {
public:
    std::string name;
    int grade;

    Student(std::string n, int g) : name(n), grade(g) {}
};

int main() {
    Student s("Alice", 90);
    s.grade = 95;
    std::cout << s.name << ": " << s.grade << std::endl;
    return 0;
}`,
      solution: `class Student {
    std::string name;
    int grade;
public:
    Student(std::string n, int g) : name(std::move(n)), grade(g) {}
    std::string getName() const { return name; }
    int getGrade() const { return grade; }
    void setGrade(int g) { grade = g; }
};

int main() {
    Student s("Alice", 90);
    s.setGrade(95);
    std::cout << s.getName() << ": " << s.getGrade() << std::endl;
    return 0;
}`,
      hints: [
        'Move name and grade into the private section.',
        'Add getter methods that are const.',
        'Add a setter for grade and update main to use the new API.',
      ],
      concepts: ['encapsulation', 'getter', 'setter'],
    },
    {
      id: 'cpp-class-20',
      title: 'Refactor: separate declaration and definition',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor the class so that method bodies are defined outside the class body using the scope resolution operator.',
      skeleton: `class Calculator {
public:
    int add(int a, int b) {
        return a + b;
    }
    int multiply(int a, int b) {
        return a * b;
    }
    double divide(int a, int b) {
        if (b == 0) throw std::runtime_error("div by zero");
        return static_cast<double>(a) / b;
    }
};`,
      solution: `class Calculator {
public:
    int add(int a, int b);
    int multiply(int a, int b);
    double divide(int a, int b);
};

int Calculator::add(int a, int b) {
    return a + b;
}

int Calculator::multiply(int a, int b) {
    return a * b;
}

double Calculator::divide(int a, int b) {
    if (b == 0) throw std::runtime_error("div by zero");
    return static_cast<double>(a) / b;
}`,
      hints: [
        'Declare the methods inside the class with just their signatures.',
        'Define each method outside using ClassName::methodName.',
        'Use the scope resolution operator :: to tie the definition to the class.',
      ],
      concepts: ['scope-resolution', 'declaration-definition', 'class'],
    },
  ],
};
