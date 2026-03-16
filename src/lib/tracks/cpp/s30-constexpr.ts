import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-constexpr',
  title: '30. Constexpr & Compile-Time',
  explanation: `## Constexpr & Compile-Time Computation in C++\n\nC++ allows computation to be moved from runtime to compile time, enabling zero-cost abstractions and stronger guarantees.\n\n### Constexpr Variables\n\`\`\`cpp\nconstexpr int maxSize = 100;\nconstexpr double pi = 3.14159265358979;\n// Must be initialized with a compile-time constant\n\`\`\`\n\n### Constexpr Functions\n\`\`\`cpp\nconstexpr int factorial(int n) {\n    int result = 1;\n    for (int i = 2; i <= n; ++i)\n        result *= i;\n    return result;\n}\nstatic_assert(factorial(5) == 120);\n\`\`\`\n\n### Constexpr If (C++17)\n\`\`\`cpp\ntemplate<typename T>\nstd::string toString(T value) {\n    if constexpr (std::is_integral_v<T>) {\n        return std::to_string(value);\n    } else if constexpr (std::is_floating_point_v<T>) {\n        return std::to_string(value);\n    } else {\n        return std::string(value);\n    }\n}\n\`\`\`\n\n### Consteval (C++20) - Immediate Functions\n\`\`\`cpp\nconsteval int sqr(int n) { return n * n; }\nint a = sqr(5);  // OK: evaluated at compile time\nint x = 5;\n// int b = sqr(x); // ERROR: x is not a constant expression\n\`\`\`\n\n### Constinit (C++20)\n\`\`\`cpp\nconstinit int global = 42;  // Must be constant-initialized\n// Prevents the "static initialization order fiasco"\n// Unlike constexpr, the variable is NOT const after initialization\n\`\`\`\n\n### Literal Types\n\`\`\`cpp\nstruct Point {\n    double x, y;\n    constexpr Point(double x, double y) : x(x), y(y) {}\n    constexpr double distSq() const { return x*x + y*y; }\n};\nconstexpr Point p{3.0, 4.0};\nstatic_assert(p.distSq() == 25.0);\n\`\`\`\n\n### static_assert\n\`\`\`cpp\nstatic_assert(sizeof(int) == 4, "int must be 4 bytes");\nstatic_assert(factorial(6) == 720); // C++17: message optional\n\`\`\``,
  exercises: [
    {
      id: 'cpp-constexpr-1',
      title: 'Constexpr Variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to declare a compile-time constant.',
      skeleton: `___ int maxElements = 256;
// Must be known at compile time`,
      solution: `constexpr int maxElements = 256;
// Must be known at compile time`,
      hints: [
        'constexpr means the value is determined at compile time.',
        'constexpr is stronger than const for compile-time guarantees.',
        'The initializer must be a constant expression.',
      ],
      concepts: ['constexpr', 'compile-time constant'],
    },
    {
      id: 'cpp-constexpr-2',
      title: 'Basic Constexpr Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to make this function evaluable at compile time.',
      skeleton: `___ int square(int n) {
    return n * n;
}
static_assert(square(7) == 49);`,
      solution: `constexpr int square(int n) {
    return n * n;
}
static_assert(square(7) == 49);`,
      hints: [
        'Add the constexpr keyword before the return type.',
        'constexpr functions can be evaluated at compile time or runtime.',
        'static_assert verifies the compile-time result.',
      ],
      concepts: ['constexpr function', 'static_assert'],
    },
    {
      id: 'cpp-constexpr-3',
      title: 'static_assert Message',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to add a compile-time assertion that verifies sizeof(int) is 4.',
      skeleton: `___(sizeof(int) == 4, "int must be 4 bytes on this platform");`,
      solution: `static_assert(sizeof(int) == 4, "int must be 4 bytes on this platform");`,
      hints: [
        'static_assert takes a boolean constant expression and an optional message.',
        'If the condition is false, compilation fails with the message.',
        'This runs entirely at compile time.',
      ],
      concepts: ['static_assert', 'compile-time check'],
    },
    {
      id: 'cpp-constexpr-4',
      title: 'Write Constexpr Factorial',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a constexpr function that computes the factorial of n using a loop.',
      skeleton: `// Write constexpr int factorial(int n)
// Use a loop (C++14 allows loops in constexpr)
// Verify with: static_assert(factorial(6) == 720);`,
      solution: `constexpr int factorial(int n) {
    int result = 1;
    for (int i = 2; i <= n; ++i) {
        result *= i;
    }
    return result;
}
static_assert(factorial(6) == 720);`,
      hints: [
        'C++14 relaxed constexpr to allow loops and local variables.',
        'Start result at 1 and multiply by each integer from 2 to n.',
        'Verify with static_assert to ensure it works at compile time.',
      ],
      concepts: ['constexpr function', 'loop', 'factorial'],
    },
    {
      id: 'cpp-constexpr-5',
      title: 'Predict Constexpr Evaluation',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

constexpr int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

int main() {
    constexpr int a = fib(6);
    int x = 7;
    int b = fib(x);
    std::cout << a << " " << b << std::endl;
    return 0;
}`,
      solution: `8 13`,
      hints: [
        'fib(6) = 8 (0,1,1,2,3,5,8).',
        'a is computed at compile time because it is constexpr.',
        'b is computed at runtime because x is not constexpr. fib(7) = 13.',
      ],
      concepts: ['constexpr', 'compile-time vs runtime', 'fibonacci'],
    },
    {
      id: 'cpp-constexpr-6',
      title: 'Constexpr Literal Type',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a constexpr Point struct with a constexpr constructor and a constexpr distance-squared method.',
      skeleton: `// Define struct Point with double x, y
// constexpr constructor
// constexpr double distanceSq() const
// Verify: static_assert(Point{3.0, 4.0}.distanceSq() == 25.0);`,
      solution: `struct Point {
    double x, y;
    constexpr Point(double x, double y) : x(x), y(y) {}
    constexpr double distanceSq() const { return x * x + y * y; }
};
static_assert(Point{3.0, 4.0}.distanceSq() == 25.0);`,
      hints: [
        'A literal type can be used in constexpr contexts.',
        'The constructor and methods must all be constexpr.',
        'Use member initializer list in the constructor.',
      ],
      concepts: ['literal type', 'constexpr struct', 'constexpr method'],
    },
    {
      id: 'cpp-constexpr-7',
      title: 'Constexpr If (C++17)',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to use constexpr if for compile-time branching.',
      skeleton: `#include <type_traits>
#include <string>

template<typename T>
std::string describe() {
    ___ (std::is_integral_v<T>) {
        return "integer type";
    } else ___ (std::is_floating_point_v<T>) {
        return "floating-point type";
    } else {
        return "other type";
    }
}`,
      solution: `#include <type_traits>
#include <string>

template<typename T>
std::string describe() {
    if constexpr (std::is_integral_v<T>) {
        return "integer type";
    } else if constexpr (std::is_floating_point_v<T>) {
        return "floating-point type";
    } else {
        return "other type";
    }
}`,
      hints: [
        'if constexpr evaluates the condition at compile time.',
        'The discarded branch is not instantiated, avoiding compilation errors.',
        'Each branch needs if constexpr, including else if.',
      ],
      concepts: ['if constexpr', 'C++17', 'compile-time branching'],
    },
    {
      id: 'cpp-constexpr-8',
      title: 'Fix Constexpr Function',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix this constexpr function that fails to compile because it uses a non-constexpr operation.',
      skeleton: `#include <cmath>

constexpr double circleArea(double radius) {
    return std::acos(-1.0) * radius * radius;
}
static_assert(circleArea(1.0) > 3.0);`,
      solution: `constexpr double circleArea(double radius) {
    constexpr double pi = 3.14159265358979;
    return pi * radius * radius;
}
static_assert(circleArea(1.0) > 3.0);`,
      hints: [
        'std::acos is not constexpr in most implementations.',
        'You cannot call non-constexpr functions in a constexpr context.',
        'Define pi as a constexpr constant instead of computing it.',
      ],
      concepts: ['constexpr restrictions', 'non-constexpr call', 'compile-time constant'],
    },
    {
      id: 'cpp-constexpr-9',
      title: 'Constexpr Array Sum',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a constexpr function that computes the sum of a std::array at compile time.',
      skeleton: `#include <array>

// Write constexpr auto arraySum(const std::array<int, N>& arr)
// that sums all elements at compile time
// Verify: static_assert(arraySum(std::array<int,4>{1,2,3,4}) == 10);`,
      solution: `#include <array>

template<std::size_t N>
constexpr int arraySum(const std::array<int, N>& arr) {
    int sum = 0;
    for (std::size_t i = 0; i < N; ++i) {
        sum += arr[i];
    }
    return sum;
}
static_assert(arraySum(std::array<int, 4>{1, 2, 3, 4}) == 10);`,
      hints: [
        'std::array size is a template parameter, so use template<std::size_t N>.',
        'Loops are allowed in constexpr functions since C++14.',
        'std::array operator[] is constexpr.',
      ],
      concepts: ['constexpr function', 'std::array', 'template parameter'],
    },
    {
      id: 'cpp-constexpr-10',
      title: 'Predict Constexpr If Branching',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>
#include <type_traits>

template<typename T>
int classify() {
    if constexpr (std::is_integral_v<T>) {
        return 1;
    } else if constexpr (std::is_floating_point_v<T>) {
        return 2;
    } else {
        return 3;
    }
}

int main() {
    std::cout << classify<int>() << " "
              << classify<double>() << " "
              << classify<std::string>() << std::endl;
    return 0;
}`,
      solution: `1 2 3`,
      hints: [
        'int is integral, so classify<int>() returns 1.',
        'double is floating-point, so classify<double>() returns 2.',
        'std::string is neither, so classify<std::string>() returns 3.',
      ],
      concepts: ['if constexpr', 'type traits', 'template instantiation'],
    },
    {
      id: 'cpp-constexpr-11',
      title: 'Consteval Immediate Function',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to make this function compile-time-only (C++20 consteval).',
      skeleton: `___ int computeHash(int key) {
    return key * 2654435761u >> 16;
}
// computeHash(42) MUST be evaluated at compile time
// Cannot be called at runtime`,
      solution: `consteval int computeHash(int key) {
    return key * 2654435761u >> 16;
}
// computeHash(42) MUST be evaluated at compile time
// Cannot be called at runtime`,
      hints: [
        'consteval (C++20) marks a function as an immediate function.',
        'Unlike constexpr, consteval MUST be evaluated at compile time.',
        'Calling it with a runtime value is a compilation error.',
      ],
      concepts: ['consteval', 'C++20', 'immediate function'],
    },
    {
      id: 'cpp-constexpr-12',
      title: 'Fix Constexpr If Usage',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix this code that incorrectly uses constexpr if in a non-template context.',
      skeleton: `#include <iostream>
#include <type_traits>

void process(int value) {
    if constexpr (std::is_floating_point_v<int>) {
        std::cout << "Float: " << value << std::endl;
    } else {
        std::cout << "Not float: " << value << std::endl;
    }
}
// This works but the if constexpr is pointless here.
// The condition is always false for int.
// Refactor to make it useful with a template.`,
      solution: `#include <iostream>
#include <type_traits>

template<typename T>
void process(T value) {
    if constexpr (std::is_floating_point_v<T>) {
        std::cout << "Float: " << value << std::endl;
    } else {
        std::cout << "Not float: " << value << std::endl;
    }
}`,
      hints: [
        'if constexpr is most useful in templates where the type varies.',
        'Make the function a template so the type is deduced.',
        'Replace int with a template parameter T.',
      ],
      concepts: ['if constexpr', 'template', 'type-dependent branching'],
    },
    {
      id: 'cpp-constexpr-13',
      title: 'Constinit Global',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fill in the blank to ensure this global variable is constant-initialized (C++20).',
      skeleton: `___ int connectionCount = 0;
// Prevents static initialization order fiasco
// But the variable CAN be modified at runtime`,
      solution: `constinit int connectionCount = 0;
// Prevents static initialization order fiasco
// But the variable CAN be modified at runtime`,
      hints: [
        'constinit ensures constant initialization but does not make the variable const.',
        'Unlike constexpr, the variable can be modified after initialization.',
        'This prevents the static initialization order fiasco.',
      ],
      concepts: ['constinit', 'C++20', 'static initialization'],
    },
    {
      id: 'cpp-constexpr-14',
      title: 'Constexpr String Length',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a constexpr function that computes the length of a C-style string at compile time.',
      skeleton: `// Write constexpr std::size_t strLen(const char* s)
// that counts characters until the null terminator
// Verify: static_assert(strLen("hello") == 5);`,
      solution: `constexpr std::size_t strLen(const char* s) {
    std::size_t len = 0;
    while (s[len] != '\\0') {
        ++len;
    }
    return len;
}
static_assert(strLen("hello") == 5);`,
      hints: [
        'Pointer arithmetic and array subscript are allowed in constexpr.',
        'Loop until you find the null terminator character.',
        'String literals are valid in constexpr contexts.',
      ],
      concepts: ['constexpr', 'C-string', 'compile-time string processing'],
    },
    {
      id: 'cpp-constexpr-15',
      title: 'Predict Constinit vs Constexpr',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

constinit int a = 10;
constexpr int b = 20;

int main() {
    a += 5;         // OK: constinit is not const
    // b += 5;      // ERROR: constexpr IS const
    std::cout << a << " " << b << std::endl;
    return 0;
}`,
      solution: `15 20`,
      hints: [
        'constinit ensures constant initialization but the variable is mutable.',
        'constexpr makes the variable const -- it cannot be modified.',
        'a becomes 15, b remains 20.',
      ],
      concepts: ['constinit vs constexpr', 'mutability', 'C++20'],
    },
    {
      id: 'cpp-constexpr-16',
      title: 'Constexpr Virtual (C++20)',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a constexpr class hierarchy with a virtual method that can be evaluated at compile time (C++20).',
      skeleton: `// Define a base class Shape with:
//   constexpr virtual double area() const = 0;
//   constexpr virtual ~Shape() = default;
// Define derived class Circle with radius
//   constexpr double area() const override
// Verify: static_assert(Circle{5.0}.area() > 78.0);`,
      solution: `struct Shape {
    constexpr virtual double area() const = 0;
    constexpr virtual ~Shape() = default;
};

struct Circle : Shape {
    double radius;
    constexpr Circle(double r) : radius(r) {}
    constexpr double area() const override {
        return 3.14159265358979 * radius * radius;
    }
};
static_assert(Circle{5.0}.area() > 78.0);`,
      hints: [
        'C++20 allows virtual functions to be constexpr.',
        'The destructor must also be constexpr for compile-time use.',
        'The entire hierarchy must be constexpr-compatible.',
      ],
      concepts: ['constexpr virtual', 'C++20', 'compile-time polymorphism'],
    },
    {
      id: 'cpp-constexpr-17',
      title: 'Fix Consteval Misuse',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fix the error where a consteval function is called with a runtime value.',
      skeleton: `#include <iostream>

consteval int doubleIt(int x) { return x * 2; }

int main() {
    int input;
    std::cin >> input;
    int result = doubleIt(input); // Error: input is not a constant expression
    std::cout << result << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

constexpr int doubleIt(int x) { return x * 2; }

int main() {
    int input;
    std::cin >> input;
    int result = doubleIt(input); // OK: constexpr can be called at runtime
    std::cout << result << std::endl;
    return 0;
}`,
      hints: [
        'consteval functions MUST be evaluated at compile time.',
        'A runtime value like cin input cannot be passed to consteval.',
        'Change consteval to constexpr so it works at both compile and runtime.',
      ],
      concepts: ['consteval vs constexpr', 'immediate function', 'runtime values'],
    },
    {
      id: 'cpp-constexpr-18',
      title: 'Compile-Time Lookup Table',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a constexpr function that generates a compile-time lookup table of squares.',
      skeleton: `#include <array>

// Write a constexpr function makeSquareTable<N>()
// that returns std::array<int, N> where element i = i*i
// Verify: static_assert(makeSquareTable<5>()[4] == 16);`,
      solution: `#include <array>

template<std::size_t N>
constexpr std::array<int, N> makeSquareTable() {
    std::array<int, N> table{};
    for (std::size_t i = 0; i < N; ++i) {
        table[i] = static_cast<int>(i * i);
    }
    return table;
}
static_assert(makeSquareTable<5>()[4] == 16);`,
      hints: [
        'Use a template parameter for the size N.',
        'Initialize the array with {} for zero-initialization.',
        'Fill each element in a loop -- this is valid in constexpr since C++14.',
      ],
      concepts: ['constexpr', 'lookup table', 'compile-time generation'],
    },
    {
      id: 'cpp-constexpr-19',
      title: 'Refactor Runtime to Compile-Time',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor this runtime GCD function into a constexpr version and add compile-time verification.',
      skeleton: `int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Usage:
// int result = gcd(24, 36); // 12 at runtime`,
      solution: `constexpr int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
static_assert(gcd(24, 36) == 12);
static_assert(gcd(17, 13) == 1);`,
      hints: [
        'The function body already uses only constexpr-compatible operations.',
        'Simply add the constexpr keyword.',
        'Add static_assert to verify correctness at compile time.',
      ],
      concepts: ['refactor', 'constexpr', 'compile-time verification'],
    },
    {
      id: 'cpp-constexpr-20',
      title: 'Refactor with Constexpr If',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor these overloaded functions into a single template using constexpr if.',
      skeleton: `#include <string>
#include <type_traits>

std::string serialize(int value) {
    return std::to_string(value);
}

std::string serialize(double value) {
    return std::to_string(value);
}

std::string serialize(const std::string& value) {
    return "\\"" + value + "\\"";
}

std::string serialize(bool value) {
    return value ? "true" : "false";
}`,
      solution: `#include <string>
#include <type_traits>

template<typename T>
std::string serialize(const T& value) {
    if constexpr (std::is_same_v<T, bool>) {
        return value ? "true" : "false";
    } else if constexpr (std::is_arithmetic_v<T>) {
        return std::to_string(value);
    } else if constexpr (std::is_same_v<T, std::string>) {
        return "\\"" + value + "\\"";
    } else {
        static_assert(sizeof(T) == 0, "Unsupported type");
    }
}`,
      hints: [
        'Use a single template with if constexpr branches.',
        'Check bool before arithmetic since bool is also arithmetic.',
        'Use static_assert with a false condition for the catch-all case.',
      ],
      concepts: ['refactor', 'constexpr if', 'type traits', 'template consolidation'],
    },
  ]
};
