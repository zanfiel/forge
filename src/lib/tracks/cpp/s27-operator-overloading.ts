import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-op-overload',
  title: '27. Operator Overloading',
  explanation: `## Operator Overloading in C++\n\nOperator overloading lets you define how operators work with your custom types, making them as intuitive to use as built-in types.\n\n### Arithmetic Operators\n\`\`\`cpp\nstruct Vec2 {\n    double x, y;\n    Vec2 operator+(const Vec2& other) const {\n        return {x + other.x, y + other.y};\n    }\n    Vec2 operator*(double scalar) const {\n        return {x * scalar, y * scalar};\n    }\n};\n\`\`\`\n\n### Comparison Operators\n\`\`\`cpp\nstruct Point {\n    int x, y;\n    bool operator==(const Point& other) const {\n        return x == other.x && y == other.y;\n    }\n    bool operator<(const Point& other) const {\n        return (x < other.x) || (x == other.x && y < other.y);\n    }\n};\n\`\`\`\n\n### Stream Operators (friend)\n\`\`\`cpp\nstruct Color {\n    int r, g, b;\n    friend std::ostream& operator<<(std::ostream& os, const Color& c) {\n        return os << "(" << c.r << "," << c.g << "," << c.b << ")";\n    }\n};\n\`\`\`\n\n### Subscript Operator\n\`\`\`cpp\nclass Array {\n    int data[10];\npublic:\n    int& operator[](size_t i) { return data[i]; }\n    const int& operator[](size_t i) const { return data[i]; }\n};\n\`\`\`\n\n### Function Call Operator (Functor)\n\`\`\`cpp\nstruct Multiplier {\n    int factor;\n    int operator()(int x) const { return x * factor; }\n};\nMultiplier triple{3};\nint result = triple(5); // 15\n\`\`\`\n\n### C++20 Spaceship Operator\n\`\`\`cpp\n#include <compare>\nstruct Version {\n    int major, minor, patch;\n    auto operator<=>(const Version&) const = default;\n};\n// Automatically generates ==, !=, <, >, <=, >=\n\`\`\``,
  exercises: [
    {
      id: 'cpp-op-overload-1',
      title: 'Overload Addition',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to overload the + operator for Vec2.',
      skeleton: `struct Vec2 {
    double x, y;
    Vec2 ___(const Vec2& other) const {
        return {x + other.x, y + other.y};
    }
};`,
      solution: `struct Vec2 {
    double x, y;
    Vec2 operator+(const Vec2& other) const {
        return {x + other.x, y + other.y};
    }
};`,
      hints: [
        'Operator overloads use the keyword operator followed by the symbol.',
        'operator+ defines the addition operator.',
        'It should be const since it does not modify *this.',
      ],
      concepts: ['operator+', 'member function', 'const method'],
    },
    {
      id: 'cpp-op-overload-2',
      title: 'Overload Equality',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to overload the == operator.',
      skeleton: `struct Point {
    int x, y;
    bool ___(const Point& other) const {
        return x == other.x && y == other.y;
    }
};`,
      solution: `struct Point {
    int x, y;
    bool operator==(const Point& other) const {
        return x == other.x && y == other.y;
    }
};`,
      hints: [
        'operator== defines the equality comparison.',
        'It returns bool.',
        'Compare each member for equality.',
      ],
      concepts: ['operator==', 'equality comparison', 'member comparison'],
    },
    {
      id: 'cpp-op-overload-3',
      title: 'Overload Stream Output',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to overload operator<< for stream output.',
      skeleton: `#include <iostream>

struct Fraction {
    int num, den;
    friend std::ostream& ___(std::ostream& os, const Fraction& f) {
        return os << f.num << "/" << f.den;
    }
};`,
      solution: `#include <iostream>

struct Fraction {
    int num, den;
    friend std::ostream& operator<<(std::ostream& os, const Fraction& f) {
        return os << f.num << "/" << f.den;
    }
};`,
      hints: [
        'The stream insertion operator is operator<<.',
        'It is a friend function since the left operand is ostream, not Fraction.',
        'Return the ostream reference to allow chaining.',
      ],
      concepts: ['operator<<', 'friend function', 'stream output'],
    },
    {
      id: 'cpp-op-overload-4',
      title: 'Overload Subscript',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to overload the subscript operator.',
      skeleton: `#include <stdexcept>

class SafeArray {
    int data_[10] = {};
public:
    int& ___(size_t i) {
        if (i >= 10) throw std::out_of_range("Index out of range");
        return data_[i];
    }
};`,
      solution: `#include <stdexcept>

class SafeArray {
    int data_[10] = {};
public:
    int& operator[](size_t i) {
        if (i >= 10) throw std::out_of_range("Index out of range");
        return data_[i];
    }
};`,
      hints: [
        'The subscript operator is operator[].',
        'It takes the index as a parameter.',
        'Return a reference to allow both reading and writing.',
      ],
      concepts: ['operator[]', 'bounds checking', 'reference return'],
    },
    {
      id: 'cpp-op-overload-5',
      title: 'Overload Function Call',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to create a functor with operator().',
      skeleton: `struct Adder {
    int offset;
    int ___(int x) const {
        return x + offset;
    }
};

// Usage: Adder add5{5}; add5(10); // returns 15`,
      solution: `struct Adder {
    int offset;
    int operator()(int x) const {
        return x + offset;
    }
};`,
      hints: [
        'operator() makes the object callable like a function.',
        'This is called a functor or function object.',
        'It can carry state (like offset) unlike plain functions.',
      ],
      concepts: ['operator()', 'functor', 'callable object'],
    },
    {
      id: 'cpp-op-overload-6',
      title: 'Spaceship Operator',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fill in the blank to use the C++20 spaceship operator for automatic comparison generation.',
      skeleton: `#include <compare>

struct Version {
    int major, minor, patch;
    auto ___<==>(const Version&) const = default;
};

// This automatically generates ==, !=, <, >, <=, >=`,
      solution: `#include <compare>

struct Version {
    int major, minor, patch;
    auto operator<=>(const Version&) const = default;
};`,
      hints: [
        'The three-way comparison operator is <=> (spaceship).',
        '= default generates memberwise comparison.',
        'It automatically provides all six comparison operators.',
      ],
      concepts: ['operator<=>', 'spaceship operator', 'C++20', 'default comparison'],
    },
    {
      id: 'cpp-op-overload-7',
      title: 'Write Complete Vec2 Class',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a Vec2 struct with +, -, and * (scalar) operators.',
      skeleton: `// Write a struct Vec2 with double x, y members.
// Overload:
// - operator+ (adds two Vec2s)
// - operator- (subtracts two Vec2s)
// - operator* (Vec2 * double scalar)
// All should be const member functions.
`,
      solution: `struct Vec2 {
    double x, y;

    Vec2 operator+(const Vec2& other) const {
        return {x + other.x, y + other.y};
    }
    Vec2 operator-(const Vec2& other) const {
        return {x - other.x, y - other.y};
    }
    Vec2 operator*(double scalar) const {
        return {x * scalar, y * scalar};
    }
};`,
      hints: [
        'Each operator returns a new Vec2 with the computed values.',
        'operator* takes a double, not a Vec2.',
        'Mark all as const since they do not modify the current object.',
      ],
      concepts: ['arithmetic operators', 'Vec2', 'const correctness'],
    },
    {
      id: 'cpp-op-overload-8',
      title: 'Write Fraction Arithmetic',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a Fraction struct with +, ==, and << operators.',
      skeleton: `#include <iostream>

// Write a struct Fraction with int num, den members.
// Overload:
// - operator+ that adds two fractions (a/b + c/d = (a*d + c*b) / (b*d))
// - operator== that checks equality (compare cross products: a*d == c*b)
// - friend operator<< for printing as "num/den"
`,
      solution: `#include <iostream>

struct Fraction {
    int num, den;

    Fraction operator+(const Fraction& other) const {
        return {num * other.den + other.num * den, den * other.den};
    }

    bool operator==(const Fraction& other) const {
        return num * other.den == other.num * den;
    }

    friend std::ostream& operator<<(std::ostream& os, const Fraction& f) {
        return os << f.num << "/" << f.den;
    }
};`,
      hints: [
        'For addition: (a/b + c/d) = (a*d + c*b) / (b*d).',
        'For equality: a/b == c/d iff a*d == c*b (cross multiply).',
        'operator<< is a friend because ostream is the left operand.',
      ],
      concepts: ['operator+', 'operator==', 'operator<<', 'friend'],
    },
    {
      id: 'cpp-op-overload-9',
      title: 'Write Prefix and Postfix Increment',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a Counter class with both prefix and postfix ++ operators.',
      skeleton: `// Write a class Counter with an int value_ member.
// - Constructor takes an int initial value
// - Prefix operator++ (++c): increments and returns reference to *this
// - Postfix operator++ (c++): saves old value, increments, returns the old copy
// - A method value() returning the current value
`,
      solution: `class Counter {
    int value_;
public:
    Counter(int v) : value_(v) {}

    Counter& operator++() {
        ++value_;
        return *this;
    }

    Counter operator++(int) {
        Counter old = *this;
        ++value_;
        return old;
    }

    int value() const { return value_; }
};`,
      hints: [
        'Prefix ++ takes no extra parameters and returns a reference.',
        'Postfix ++ takes a dummy int parameter to distinguish from prefix.',
        'Postfix returns a copy of the old value.',
      ],
      concepts: ['prefix increment', 'postfix increment', 'operator++'],
    },
    {
      id: 'cpp-op-overload-10',
      title: 'Write Conversion Operator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a class with an explicit conversion operator to bool.',
      skeleton: `#include <string>

// Write a class OptionalString with a std::string value_ member.
// - Constructor takes a string
// - Explicit conversion operator to bool: returns true if value_ is not empty
// - Method value() returning const string&
`,
      solution: `#include <string>

class OptionalString {
    std::string value_;
public:
    OptionalString(const std::string& v) : value_(v) {}

    explicit operator bool() const {
        return !value_.empty();
    }

    const std::string& value() const { return value_; }
};`,
      hints: [
        'Conversion operators have the form: operator TargetType() const.',
        'The explicit keyword prevents implicit conversions.',
        'explicit operator bool() allows use in if-conditions but not implicit conversion.',
      ],
      concepts: ['conversion operator', 'explicit', 'operator bool'],
    },
    {
      id: 'cpp-op-overload-11',
      title: 'Write Stream Input Operator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a friend operator>> for reading a Point from an input stream.',
      skeleton: `#include <iostream>

struct Point {
    int x, y;

    friend std::ostream& operator<<(std::ostream& os, const Point& p) {
        return os << "(" << p.x << "," << p.y << ")";
    }

    // Write friend operator>> that reads x and y from the stream.
    // Expected input format: two integers separated by whitespace.
};`,
      solution: `#include <iostream>

struct Point {
    int x, y;

    friend std::ostream& operator<<(std::ostream& os, const Point& p) {
        return os << "(" << p.x << "," << p.y << ")";
    }

    friend std::istream& operator>>(std::istream& is, Point& p) {
        return is >> p.x >> p.y;
    }
};`,
      hints: [
        'operator>> takes std::istream& as the left operand.',
        'The Point parameter must be non-const (we are writing to it).',
        'Return the istream reference for chaining.',
      ],
      concepts: ['operator>>', 'stream input', 'friend function'],
    },
    {
      id: 'cpp-op-overload-12',
      title: 'Write Compound Assignment',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write += and + operators for a Vec2 class following best practices.',
      skeleton: `// Write a struct Vec2 with double x, y.
// First implement operator+= as a member (modifies *this, returns *this).
// Then implement operator+ as a non-member using +=.
// This is the canonical pattern for arithmetic operators.
`,
      solution: `struct Vec2 {
    double x, y;

    Vec2& operator+=(const Vec2& other) {
        x += other.x;
        y += other.y;
        return *this;
    }

    friend Vec2 operator+(Vec2 lhs, const Vec2& rhs) {
        lhs += rhs;
        return lhs;
    }
};`,
      hints: [
        'operator+= modifies *this and returns a reference to *this.',
        'operator+ takes lhs by value (to get a copy), uses +=, and returns the copy.',
        'This avoids code duplication between + and +=.',
      ],
      concepts: ['compound assignment', 'canonical form', 'operator+= and operator+'],
    },
    {
      id: 'cpp-op-overload-13',
      title: 'Fix Missing const on Operator',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the operator+ that fails to compile when used with const objects.',
      skeleton: `#include <iostream>

struct Vec2 {
    double x, y;
    Vec2 operator+(const Vec2& other) { // Bug: missing const
        return {x + other.x, y + other.y};
    }
};

int main() {
    const Vec2 a{1.0, 2.0};
    const Vec2 b{3.0, 4.0};
    auto c = a + b; // Error: cannot call non-const operator on const object
    return 0;
}`,
      solution: `#include <iostream>

struct Vec2 {
    double x, y;
    Vec2 operator+(const Vec2& other) const {
        return {x + other.x, y + other.y};
    }
};

int main() {
    const Vec2 a{1.0, 2.0};
    const Vec2 b{3.0, 4.0};
    auto c = a + b;
    return 0;
}`,
      hints: [
        'operator+ does not modify *this, so it should be const.',
        'Without const, it cannot be called on const objects.',
        'Add const after the parameter list.',
      ],
      concepts: ['const correctness', 'const method', 'operator overloading'],
    },
    {
      id: 'cpp-op-overload-14',
      title: 'Fix Self-Assignment in operator=',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the copy assignment operator that crashes on self-assignment.',
      skeleton: `class Buffer {
    int* data_;
    size_t size_;
public:
    Buffer(size_t n) : data_(new int[n]), size_(n) {}
    ~Buffer() { delete[] data_; }

    Buffer& operator=(const Buffer& other) {
        delete[] data_; // Bug: if this == &other, we just deleted our own data!
        size_ = other.size_;
        data_ = new int[size_];
        for (size_t i = 0; i < size_; ++i) data_[i] = other.data_[i];
        return *this;
    }
};`,
      solution: `class Buffer {
    int* data_;
    size_t size_;
public:
    Buffer(size_t n) : data_(new int[n]), size_(n) {}
    ~Buffer() { delete[] data_; }

    Buffer& operator=(const Buffer& other) {
        if (this == &other) return *this;
        delete[] data_;
        size_ = other.size_;
        data_ = new int[size_];
        for (size_t i = 0; i < size_; ++i) data_[i] = other.data_[i];
        return *this;
    }
};`,
      hints: [
        'Self-assignment (a = a) would delete the data before copying it.',
        'Add a self-assignment check: if (this == &other) return *this;',
        'This is the simplest fix, though copy-and-swap is the canonical pattern.',
      ],
      concepts: ['self-assignment', 'operator=', 'copy assignment'],
    },
    {
      id: 'cpp-op-overload-15',
      title: 'Fix Asymmetric operator+',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the + operator that only works with Vec2 on the left side of scalar multiplication.',
      skeleton: `#include <iostream>

struct Vec2 {
    double x, y;
    Vec2 operator*(double s) const { return {x * s, y * s}; }
};

int main() {
    Vec2 v{1.0, 2.0};
    auto a = v * 3.0;  // OK
    auto b = 3.0 * v;  // Error: no matching operator*
    return 0;
}`,
      solution: `#include <iostream>

struct Vec2 {
    double x, y;
    Vec2 operator*(double s) const { return {x * s, y * s}; }
    friend Vec2 operator*(double s, const Vec2& v) { return v * s; }
};

int main() {
    Vec2 v{1.0, 2.0};
    auto a = v * 3.0;  // OK
    auto b = 3.0 * v;  // OK now
    return 0;
}`,
      hints: [
        'Member operator* only handles Vec2 * double, not double * Vec2.',
        'Add a friend non-member operator*(double, Vec2) for the reverse.',
        'The friend version can delegate to the member version.',
      ],
      concepts: ['symmetric operators', 'friend function', 'commutativity'],
    },
    {
      id: 'cpp-op-overload-16',
      title: 'Predict Functor Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Predict the output of this functor program.',
      skeleton: `#include <iostream>

struct Scale {
    int factor;
    int operator()(int x) const { return x * factor; }
};

int main() {
    Scale s{3};
    std::cout << s(5) << " " << s(10) << "\\n";
    return 0;
}`,
      solution: `15 30`,
      hints: [
        'Scale has factor=3 and operator() returns x * factor.',
        's(5) calls operator()(5) -> 5 * 3 = 15.',
        's(10) calls operator()(10) -> 10 * 3 = 30.',
      ],
      concepts: ['functor', 'operator()', 'callable'],
    },
    {
      id: 'cpp-op-overload-17',
      title: 'Predict operator<< Chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the output of chained operator<< calls.',
      skeleton: `#include <iostream>

struct Tag {
    const char* name;
    friend std::ostream& operator<<(std::ostream& os, const Tag& t) {
        return os << "[" << t.name << "]";
    }
};

int main() {
    Tag a{"X"}, b{"Y"};
    std::cout << a << "-" << b << "\\n";
    return 0;
}`,
      solution: `[X]-[Y]`,
      hints: [
        'operator<< returns ostream& enabling chaining.',
        'cout << a prints [X], then << "-" prints -, then << b prints [Y].',
        'The chain is evaluated left to right.',
      ],
      concepts: ['operator<< chaining', 'friend function', 'stream output'],
    },
    {
      id: 'cpp-op-overload-18',
      title: 'Predict Pre/Post Increment',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the output of prefix and postfix increment operators.',
      skeleton: `#include <iostream>

class Num {
    int val_;
public:
    Num(int v) : val_(v) {}
    Num& operator++() { ++val_; return *this; }
    Num operator++(int) { Num old = *this; ++val_; return old; }
    friend std::ostream& operator<<(std::ostream& os, const Num& n) {
        return os << n.val_;
    }
};

int main() {
    Num a(5);
    std::cout << a++ << " ";
    std::cout << a << " ";
    std::cout << ++a << "\\n";
    return 0;
}`,
      solution: `5 6 7`,
      hints: [
        'a++ (postfix) returns the old value (5), then a becomes 6.',
        'Printing a next shows 6.',
        '++a (prefix) increments to 7 and returns the new value.',
      ],
      concepts: ['prefix increment', 'postfix increment', 'return value'],
    },
    {
      id: 'cpp-op-overload-19',
      title: 'Refactor Verbose Methods to Operators',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor named methods to operator overloads.',
      skeleton: `#include <iostream>
#include <cmath>

struct Complex {
    double real, imag;

    Complex add(const Complex& other) const {
        return {real + other.real, imag + other.imag};
    }
    Complex subtract(const Complex& other) const {
        return {real - other.real, imag - other.imag};
    }
    bool equals(const Complex& other) const {
        return real == other.real && imag == other.imag;
    }
    void print() const {
        std::cout << real << "+" << imag << "i";
    }
};`,
      solution: `#include <iostream>
#include <cmath>

struct Complex {
    double real, imag;

    Complex operator+(const Complex& other) const {
        return {real + other.real, imag + other.imag};
    }
    Complex operator-(const Complex& other) const {
        return {real - other.real, imag - other.imag};
    }
    bool operator==(const Complex& other) const {
        return real == other.real && imag == other.imag;
    }
    friend std::ostream& operator<<(std::ostream& os, const Complex& c) {
        return os << c.real << "+" << c.imag << "i";
    }
};`,
      hints: [
        'Replace add() with operator+, subtract() with operator-.',
        'Replace equals() with operator==.',
        'Replace print() with friend operator<< for stream output.',
      ],
      concepts: ['operator overloading', 'refactoring', 'natural syntax'],
    },
    {
      id: 'cpp-op-overload-20',
      title: 'Refactor to Spaceship Operator',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor manually written comparison operators to use C++20 spaceship operator.',
      skeleton: `struct Date {
    int year, month, day;

    bool operator==(const Date& o) const {
        return year == o.year && month == o.month && day == o.day;
    }
    bool operator!=(const Date& o) const { return !(*this == o); }
    bool operator<(const Date& o) const {
        if (year != o.year) return year < o.year;
        if (month != o.month) return month < o.month;
        return day < o.day;
    }
    bool operator>(const Date& o) const { return o < *this; }
    bool operator<=(const Date& o) const { return !(o < *this); }
    bool operator>=(const Date& o) const { return !(*this < o); }
};`,
      solution: `#include <compare>

struct Date {
    int year, month, day;
    auto operator<=>(const Date&) const = default;
};`,
      hints: [
        'The C++20 spaceship operator <=> replaces all six comparison operators.',
        '= default generates memberwise comparison in declaration order.',
        'This is dramatically less code and less error-prone.',
      ],
      concepts: ['operator<=>', 'C++20', 'default comparison', 'refactoring'],
    },
  ],
};
