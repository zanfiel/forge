import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-struct',
  title: '10. Structs',
  explanation: `## Structs in C++

A struct groups related data into a single type with named members.

### Defining a Struct
\`\`\`cpp
struct Point {
    double x;
    double y;
};
\`\`\`

### Member Access
Use the dot operator (\`.\`) for objects and the arrow operator (\`->\`) for pointers:
\`\`\`cpp
Point p;
p.x = 3.0;
p.y = 4.0;

Point* ptr = &p;
ptr->x = 5.0;
\`\`\`

### Aggregate Initialization
\`\`\`cpp
Point p1 = {1.0, 2.0};      // C-style
Point p2{3.0, 4.0};         // brace init
\`\`\`

### Designated Initializers (C++20)
\`\`\`cpp
Point p3{.x = 5.0, .y = 6.0};
\`\`\`

### Default Member Values
\`\`\`cpp
struct Config {
    int width = 800;
    int height = 600;
    bool fullscreen = false;
};

Config c{};  // uses all defaults
Config c2{.width = 1920, .height = 1080};  // override some
\`\`\`

### Nested Structs
\`\`\`cpp
struct Address {
    std::string street;
    std::string city;
};

struct Person {
    std::string name;
    int age;
    Address address;
};
\`\`\`

### struct vs class
In C++, the only difference is:
- struct members are **public** by default
- class members are **private** by default

Convention: use struct for plain data, class for types with invariants and methods.
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-struct-1',
      title: 'Define a struct',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the keyword to define a user-defined type with named members.',
      skeleton: `#include <iostream>

__BLANK__ Point {
    double x;
    double y;
};

int main() {
    Point p{3.0, 4.0};
    std::cout << p.x << " " << p.y << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

struct Point {
    double x;
    double y;
};

int main() {
    Point p{3.0, 4.0};
    std::cout << p.x << " " << p.y << std::endl;
    return 0;
}`,
      hints: [
        'This keyword defines a type with public members by default.',
        'It groups related data together.',
        'The keyword is `struct`.',
      ],
      concepts: ['struct', 'user-defined type'],
    },
    {
      id: 'cpp-struct-2',
      title: 'Member access operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the operator used to access a struct member.',
      skeleton: `#include <iostream>

struct Color {
    int r, g, b;
};

int main() {
    Color red{255, 0, 0};
    std::cout << red__BLANK__r << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

struct Color {
    int r, g, b;
};

int main() {
    Color red{255, 0, 0};
    std::cout << red.r << std::endl;
    return 0;
}`,
      hints: [
        'This operator accesses a member of a struct object.',
        'It is placed between the object name and the member name.',
        'The operator is `.` (dot).',
      ],
      concepts: ['member access', 'dot operator'],
    },
    {
      id: 'cpp-struct-3',
      title: 'Arrow operator for pointer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the operator used to access a struct member through a pointer.',
      skeleton: `#include <iostream>

struct Point {
    double x, y;
};

int main() {
    Point p{1.0, 2.0};
    Point* ptr = &p;
    std::cout << ptr__BLANK__x << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

struct Point {
    double x, y;
};

int main() {
    Point p{1.0, 2.0};
    Point* ptr = &p;
    std::cout << ptr->x << std::endl;
    return 0;
}`,
      hints: [
        'When accessing through a pointer, you use a different operator than dot.',
        'It combines dereference and member access.',
        'The operator is `->`.',
      ],
      concepts: ['arrow operator', 'pointer to struct'],
    },
    {
      id: 'cpp-struct-4',
      title: 'Default member value',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the default value for the fullscreen member.',
      skeleton: `#include <iostream>

struct Config {
    int width = 1920;
    int height = 1080;
    bool fullscreen __BLANK__;
};

int main() {
    Config c{};
    std::cout << std::boolalpha << c.fullscreen << std::endl;  // false
    return 0;
}`,
      solution: `#include <iostream>

struct Config {
    int width = 1920;
    int height = 1080;
    bool fullscreen = false;
};

int main() {
    Config c{};
    std::cout << std::boolalpha << c.fullscreen << std::endl;  // false
    return 0;
}`,
      hints: [
        'Default member initializers use = in the struct definition.',
        'The value should be false.',
        'Write `= false`.',
      ],
      concepts: ['default member initializer'],
    },
    {
      id: 'cpp-struct-5',
      title: 'Designated initializer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the C++20 designated initializer syntax to set only the y member.',
      skeleton: `#include <iostream>

struct Point {
    double x = 0.0;
    double y = 0.0;
};

int main() {
    Point p{__BLANK__};
    std::cout << p.x << " " << p.y << std::endl;  // 0 5
    return 0;
}`,
      solution: `#include <iostream>

struct Point {
    double x = 0.0;
    double y = 0.0;
};

int main() {
    Point p{.y = 5.0};
    std::cout << p.x << " " << p.y << std::endl;  // 0 5
    return 0;
}`,
      hints: [
        'C++20 designated initializers use dot-notation inside braces.',
        'Only name the members you want to set explicitly.',
        '.y = 5.0',
      ],
      concepts: ['designated initializers', 'C++20'],
    },
    {
      id: 'cpp-struct-6',
      title: 'Struct with method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the return type and body of the member function that computes the area of a rectangle.',
      skeleton: `#include <iostream>

struct Rectangle {
    double width;
    double height;

    __BLANK__ area() const {
        return width * height;
    }
};

int main() {
    Rectangle r{5.0, 3.0};
    std::cout << r.area() << std::endl;  // 15
    return 0;
}`,
      solution: `#include <iostream>

struct Rectangle {
    double width;
    double height;

    double area() const {
        return width * height;
    }
};

int main() {
    Rectangle r{5.0, 3.0};
    std::cout << r.area() << std::endl;  // 15
    return 0;
}`,
      hints: [
        'The function returns width * height, both doubles.',
        'The return type should match the multiplication result.',
        'The return type is `double`.',
      ],
      concepts: ['member function', 'const method'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-struct-7',
      title: 'Create a Student struct',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Define a Student struct with name (std::string), age (int), and gpa (double). Create a student, and print all fields.',
      skeleton: `#include <iostream>
#include <string>

// Define Student struct and use it in main

int main() {
    // Create a student and print their info
    return 0;
}`,
      solution: `#include <iostream>
#include <string>

struct Student {
    std::string name;
    int age;
    double gpa;
};

int main() {
    Student s{"Alice", 20, 3.8};
    std::cout << s.name << " " << s.age << " " << s.gpa << std::endl;
    return 0;
}`,
      hints: [
        'Define the struct with three members: string, int, double.',
        'Use brace initialization to create an instance.',
        'Access members with the dot operator.',
      ],
      concepts: ['struct definition', 'aggregate initialization'],
    },
    {
      id: 'cpp-struct-8',
      title: 'Distance between points',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Define a Point struct with x and y (doubles). Write a function distance that takes two Points and returns the Euclidean distance between them.',
      skeleton: `#include <iostream>
#include <cmath>

// Define Point and distance function

int main() {
    // Test with (0,0) and (3,4) -- distance should be 5
    return 0;
}`,
      solution: `#include <iostream>
#include <cmath>

struct Point {
    double x;
    double y;
};

double distance(const Point& a, const Point& b) {
    double dx = a.x - b.x;
    double dy = a.y - b.y;
    return std::sqrt(dx * dx + dy * dy);
}

int main() {
    Point p1{0.0, 0.0};
    Point p2{3.0, 4.0};
    std::cout << distance(p1, p2) << std::endl;  // 5
    return 0;
}`,
      hints: [
        'Euclidean distance = sqrt((x2-x1)^2 + (y2-y1)^2).',
        'Pass structs by const reference for efficiency.',
        'Use std::sqrt from <cmath>.',
      ],
      concepts: ['struct parameter', 'Euclidean distance', 'const reference'],
    },
    {
      id: 'cpp-struct-9',
      title: 'Nested struct: Person with Address',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Define Address (street, city) and Person (name, age, address) structs. Create a Person and print their full info including address.',
      skeleton: `#include <iostream>
#include <string>

// Define Address and Person structs

int main() {
    // Create a Person and print all fields
    return 0;
}`,
      solution: `#include <iostream>
#include <string>

struct Address {
    std::string street;
    std::string city;
};

struct Person {
    std::string name;
    int age;
    Address address;
};

int main() {
    Person p{"Alice", 30, {"123 Main St", "Springfield"}};
    std::cout << p.name << ", " << p.age << std::endl;
    std::cout << p.address.street << ", " << p.address.city << std::endl;
    return 0;
}`,
      hints: [
        'Define Address first, then use it as a member of Person.',
        'Nested initialization: {"123 Main St", "Springfield"} for the address.',
        'Access nested members: p.address.city.',
      ],
      concepts: ['nested struct', 'member access'],
    },
    {
      id: 'cpp-struct-10',
      title: 'Array of structs',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Define a Product struct with name (string) and price (double). Create an array of 3 products and write a function that finds the most expensive one.',
      skeleton: `#include <iostream>
#include <string>

// Define Product struct and findMostExpensive function

int main() {
    // Create array of 3 products, find and print the most expensive
    return 0;
}`,
      solution: `#include <iostream>
#include <string>

struct Product {
    std::string name;
    double price;
};

const Product& findMostExpensive(const Product products[], int size) {
    int maxIdx = 0;
    for (int i = 1; i < size; ++i) {
        if (products[i].price > products[maxIdx].price) {
            maxIdx = i;
        }
    }
    return products[maxIdx];
}

int main() {
    Product products[] = {
        {"Laptop", 999.99},
        {"Phone", 699.99},
        {"Tablet", 449.99}
    };
    const Product& best = findMostExpensive(products, 3);
    std::cout << best.name << ": " << best.price << std::endl;
    return 0;
}`,
      hints: [
        'Compare the price member of each product.',
        'Track the index of the most expensive product.',
        'Return a const reference to avoid copying.',
      ],
      concepts: ['array of structs', 'struct comparison'],
    },
    {
      id: 'cpp-struct-11',
      title: 'Struct with member functions',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Define a Vec2 struct with x and y. Add member functions: length() returning the magnitude, normalized() returning a new Vec2 with unit length, and a static function dot() computing the dot product of two Vec2s.',
      skeleton: `#include <iostream>
#include <cmath>

// Define Vec2 with member functions

int main() {
    Vec2 a{3.0, 4.0};
    std::cout << a.length() << std::endl;  // 5
    Vec2 n = a.normalized();
    std::cout << n.x << " " << n.y << std::endl;  // 0.6 0.8
    Vec2 b{1.0, 0.0};
    std::cout << Vec2::dot(a, b) << std::endl;  // 3
    return 0;
}`,
      solution: `#include <iostream>
#include <cmath>

struct Vec2 {
    double x;
    double y;

    double length() const {
        return std::sqrt(x * x + y * y);
    }

    Vec2 normalized() const {
        double len = length();
        return Vec2{x / len, y / len};
    }

    static double dot(const Vec2& a, const Vec2& b) {
        return a.x * b.x + a.y * b.y;
    }
};

int main() {
    Vec2 a{3.0, 4.0};
    std::cout << a.length() << std::endl;  // 5
    Vec2 n = a.normalized();
    std::cout << n.x << " " << n.y << std::endl;  // 0.6 0.8
    Vec2 b{1.0, 0.0};
    std::cout << Vec2::dot(a, b) << std::endl;  // 3
    return 0;
}`,
      hints: [
        'length = sqrt(x*x + y*y). normalized divides by length.',
        'Mark methods that do not modify the object as const.',
        'A static method is called on the type, not an instance.',
      ],
      concepts: ['member function', 'static method', 'const method'],
    },
    {
      id: 'cpp-struct-12',
      title: 'Struct equality comparison',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Define a Color struct with r, g, b (int). Write a function (or operator==) that compares two Colors for equality. Test with two equal and two different colors.',
      skeleton: `#include <iostream>

// Define Color struct with equality comparison

int main() {
    // Test equality
    return 0;
}`,
      solution: `#include <iostream>

struct Color {
    int r, g, b;

    bool operator==(const Color& other) const {
        return r == other.r && g == other.g && b == other.b;
    }
};

int main() {
    Color red1{255, 0, 0};
    Color red2{255, 0, 0};
    Color blue{0, 0, 255};
    std::cout << std::boolalpha;
    std::cout << (red1 == red2) << std::endl;  // true
    std::cout << (red1 == blue) << std::endl;  // false
    return 0;
}`,
      hints: [
        'Structs do not have == by default in C++17 and earlier.',
        'Define operator== as a member function.',
        'Compare all members: r == other.r && g == other.g && b == other.b.',
      ],
      concepts: ['operator==', 'comparison', 'member function'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-struct-13',
      title: 'Fix missing semicolon after struct',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'This code is missing the semicolon after the struct definition. Fix it.',
      skeleton: `#include <iostream>

struct Point {
    double x;
    double y;
}

int main() {
    Point p{1.0, 2.0};
    std::cout << p.x << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

struct Point {
    double x;
    double y;
};

int main() {
    Point p{1.0, 2.0};
    std::cout << p.x << std::endl;
    return 0;
}`,
      hints: [
        'In C++, struct definitions must end with a semicolon.',
        'The error is after the closing brace of the struct.',
        'Add ; after the closing brace.',
      ],
      concepts: ['struct syntax', 'semicolon'],
    },
    {
      id: 'cpp-struct-14',
      title: 'Fix member initialization order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'The designated initializers are in the wrong order (C++20 requires them in declaration order). Fix it.',
      skeleton: `#include <iostream>

struct Rect {
    double width;
    double height;
};

int main() {
    Rect r{.height = 10.0, .width = 5.0};  // Bug: wrong order
    std::cout << r.width << "x" << r.height << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

struct Rect {
    double width;
    double height;
};

int main() {
    Rect r{.width = 5.0, .height = 10.0};
    std::cout << r.width << "x" << r.height << std::endl;
    return 0;
}`,
      hints: [
        'C++20 designated initializers must appear in the same order as the members.',
        'width is declared before height in the struct.',
        'Put .width before .height in the initializer.',
      ],
      concepts: ['designated initializers', 'member order'],
    },
    {
      id: 'cpp-struct-15',
      title: 'Fix arrow vs dot operator',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'This code uses the dot operator on a pointer. Fix it to use the correct operator.',
      skeleton: `#include <iostream>

struct Point {
    double x, y;
};

int main() {
    Point p{3.0, 4.0};
    Point* ptr = &p;
    std::cout << ptr.x << " " << ptr.y << std::endl;  // Bug: ptr is a pointer
    return 0;
}`,
      solution: `#include <iostream>

struct Point {
    double x, y;
};

int main() {
    Point p{3.0, 4.0};
    Point* ptr = &p;
    std::cout << ptr->x << " " << ptr->y << std::endl;
    return 0;
}`,
      hints: [
        'ptr is a pointer, not an object.',
        'Use -> to access members through a pointer.',
        'Change ptr.x to ptr->x and ptr.y to ptr->y.',
      ],
      concepts: ['arrow operator', 'dot operator', 'pointer'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-struct-16',
      title: 'Predict aggregate initialization',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

struct Point {
    int x;
    int y;
};

int main() {
    Point p = {10, 20};
    p.x += 5;
    std::cout << p.x << " " << p.y << std::endl;
    return 0;
}`,
      solution: `15 20`,
      hints: [
        'p.x starts as 10 and 5 is added to it.',
        'p.y is initialized to 20 and never modified.',
        'Output: 15 20',
      ],
      concepts: ['aggregate initialization', 'member modification'],
    },
    {
      id: 'cpp-struct-17',
      title: 'Predict struct copy',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

struct Counter {
    int value = 0;
};

int main() {
    Counter a;
    a.value = 10;
    Counter b = a;
    b.value = 20;
    std::cout << a.value << " " << b.value << std::endl;
    return 0;
}`,
      solution: `10 20`,
      hints: [
        'Counter b = a creates a copy of a.',
        'Modifying b does not affect a.',
        'a.value is 10, b.value is 20.',
      ],
      concepts: ['struct copy', 'value semantics'],
    },
    {
      id: 'cpp-struct-18',
      title: 'Predict default member values',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

struct Config {
    int width = 800;
    int height = 600;
    bool active = true;
};

int main() {
    Config c{.width = 1920};
    std::cout << c.width << " " << c.height << " " << std::boolalpha << c.active << std::endl;
    return 0;
}`,
      solution: `1920 600 true`,
      hints: [
        'Only width is specified; height and active use their defaults.',
        'width = 1920, height = 600, active = true.',
        'Output: 1920 600 true',
      ],
      concepts: ['default member values', 'designated initializers'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-struct-19',
      title: 'Extract parallel arrays into struct array',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor the parallel arrays into a single array of structs.',
      skeleton: `#include <iostream>
#include <string>

int main() {
    std::string names[] = {"Alice", "Bob", "Charlie"};
    int ages[] = {25, 30, 35};
    double gpas[] = {3.8, 3.5, 3.9};

    for (int i = 0; i < 3; ++i) {
        std::cout << names[i] << " " << ages[i] << " " << gpas[i] << std::endl;
    }
    return 0;
}`,
      solution: `#include <iostream>
#include <string>

struct Student {
    std::string name;
    int age;
    double gpa;
};

int main() {
    Student students[] = {
        {"Alice", 25, 3.8},
        {"Bob", 30, 3.5},
        {"Charlie", 35, 3.9}
    };

    for (const auto& s : students) {
        std::cout << s.name << " " << s.age << " " << s.gpa << std::endl;
    }
    return 0;
}`,
      hints: [
        'Parallel arrays are hard to maintain -- a struct keeps related data together.',
        'Define a Student struct and create an array of Students.',
        'Use range-based for with auto& to iterate.',
      ],
      concepts: ['struct', 'data organization', 'parallel arrays'],
    },
    {
      id: 'cpp-struct-20',
      title: 'Add member functions to a data struct',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor the free functions into member functions of the Rectangle struct.',
      skeleton: `#include <iostream>

struct Rectangle {
    double width;
    double height;
};

double getArea(const Rectangle& r) {
    return r.width * r.height;
}

double getPerimeter(const Rectangle& r) {
    return 2.0 * (r.width + r.height);
}

bool isSquare(const Rectangle& r) {
    return r.width == r.height;
}

int main() {
    Rectangle r{5.0, 5.0};
    std::cout << getArea(r) << std::endl;
    std::cout << getPerimeter(r) << std::endl;
    std::cout << std::boolalpha << isSquare(r) << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

struct Rectangle {
    double width;
    double height;

    double area() const {
        return width * height;
    }

    double perimeter() const {
        return 2.0 * (width + height);
    }

    bool isSquare() const {
        return width == height;
    }
};

int main() {
    Rectangle r{5.0, 5.0};
    std::cout << r.area() << std::endl;
    std::cout << r.perimeter() << std::endl;
    std::cout << std::boolalpha << r.isSquare() << std::endl;
    return 0;
}`,
      hints: [
        'Move the functions inside the struct definition.',
        'Remove the Rectangle& parameter -- use member variables directly.',
        'Mark them const since they do not modify the struct.',
      ],
      concepts: ['member functions', 'const methods', 'encapsulation'],
    },
  ],
};
