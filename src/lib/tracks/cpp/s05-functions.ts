import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-func',
  title: '05. Functions',
  explanation: `## Functions in C++

Functions encapsulate reusable logic. C++ requires you to declare the return type and parameter types.

### Declaration vs Definition
A **declaration** (prototype) tells the compiler about the function signature:
\`\`\`cpp
int add(int a, int b);  // declaration
\`\`\`

A **definition** provides the body:
\`\`\`cpp
int add(int a, int b) {  // definition
    return a + b;
}
\`\`\`

### Parameters and Return Types
\`\`\`cpp
void greet();           // no parameters, no return value
int square(int x);      // takes int, returns int
double divide(double a, double b);
\`\`\`

### Function Overloading
Multiple functions can share a name if they differ in parameter types or count:
\`\`\`cpp
int    max(int a, int b);
double max(double a, double b);
int    max(int a, int b, int c);
\`\`\`

### Default Arguments
Parameters can have default values (must be rightmost):
\`\`\`cpp
void print(int value, int base = 10);
print(255);      // uses base 10
print(255, 16);  // uses base 16
\`\`\`

### Inline Functions
The \`inline\` keyword suggests the compiler replace the call with the function body:
\`\`\`cpp
inline int square(int x) { return x * x; }
\`\`\`
Modern compilers decide inlining on their own -- \`inline\` mainly affects linkage rules now.
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-func-1',
      title: 'Return type for void',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the return type for a function that does not return a value.',
      skeleton: `#include <iostream>

__BLANK__ sayHello() {
    std::cout << "Hello!" << std::endl;
}

int main() {
    sayHello();
    return 0;
}`,
      solution: `#include <iostream>

void sayHello() {
    std::cout << "Hello!" << std::endl;
}

int main() {
    sayHello();
    return 0;
}`,
      hints: [
        'When a function does not return anything, it uses a special type keyword.',
        'It means "nothing" or "empty return".',
        'The keyword is `void`.',
      ],
      concepts: ['void', 'return type'],
    },
    {
      id: 'cpp-func-2',
      title: 'Return statement',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the keyword that sends a value back from the function.',
      skeleton: `#include <iostream>

int double_it(int x) {
    __BLANK__ x * 2;
}

int main() {
    std::cout << double_it(5) << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int double_it(int x) {
    return x * 2;
}

int main() {
    std::cout << double_it(5) << std::endl;
    return 0;
}`,
      hints: [
        'This keyword sends the result back to the caller.',
        'It must match the declared return type.',
        'The keyword is `return`.',
      ],
      concepts: ['return', 'function result'],
    },
    {
      id: 'cpp-func-3',
      title: 'Function parameter type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the parameter type so the function accepts a double.',
      skeleton: `#include <iostream>

double half(__BLANK__ value) {
    return value / 2.0;
}

int main() {
    std::cout << half(7.0) << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

double half(double value) {
    return value / 2.0;
}

int main() {
    std::cout << half(7.0) << std::endl;
    return 0;
}`,
      hints: [
        'The function returns double and divides by 2.0.',
        'The parameter should match the return type.',
        'The type is `double`.',
      ],
      concepts: ['parameter type', 'double'],
    },
    {
      id: 'cpp-func-4',
      title: 'Default argument',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the default argument syntax so base defaults to 10.',
      skeleton: `#include <iostream>

void printNumber(int value, int base __BLANK__) {
    if (base == 16) {
        std::cout << std::hex << value << std::endl;
    } else {
        std::cout << value << std::endl;
    }
}

int main() {
    printNumber(255);
    printNumber(255, 16);
    return 0;
}`,
      solution: `#include <iostream>

void printNumber(int value, int base = 10) {
    if (base == 16) {
        std::cout << std::hex << value << std::endl;
    } else {
        std::cout << value << std::endl;
    }
}

int main() {
    printNumber(255);
    printNumber(255, 16);
    return 0;
}`,
      hints: [
        'Default arguments use = in the parameter list.',
        'The default value is assigned at declaration.',
        'Write `= 10`.',
      ],
      concepts: ['default arguments'],
    },
    {
      id: 'cpp-func-5',
      title: 'Forward declaration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the forward declaration (prototype) for the add function.',
      skeleton: `#include <iostream>

__BLANK__;

int main() {
    std::cout << add(3, 4) << std::endl;
    return 0;
}

int add(int a, int b) {
    return a + b;
}`,
      solution: `#include <iostream>

int add(int a, int b);

int main() {
    std::cout << add(3, 4) << std::endl;
    return 0;
}

int add(int a, int b) {
    return a + b;
}`,
      hints: [
        'A forward declaration tells the compiler about the function before its definition.',
        'It has the same signature as the function but ends with a semicolon.',
        'int add(int a, int b);',
      ],
      concepts: ['forward declaration', 'prototype'],
    },
    {
      id: 'cpp-func-6',
      title: 'Inline function',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the keyword that suggests the compiler inline this function.',
      skeleton: `#include <iostream>

__BLANK__ int square(int x) {
    return x * x;
}

int main() {
    std::cout << square(7) << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

inline int square(int x) {
    return x * x;
}

int main() {
    std::cout << square(7) << std::endl;
    return 0;
}`,
      hints: [
        'This keyword hints to the compiler to replace the call with the body.',
        'It is mostly about linkage in modern C++.',
        'The keyword is `inline`.',
      ],
      concepts: ['inline', 'optimization hint'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-func-7',
      title: 'Write a max function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a function max that takes two integers and returns the larger one. Call it from main and print the result.',
      skeleton: `#include <iostream>

// Write the max function here

int main() {
    std::cout << max(10, 20) << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int max(int a, int b) {
    return (a > b) ? a : b;
}

int main() {
    std::cout << max(10, 20) << std::endl;
    return 0;
}`,
      hints: [
        'The function takes two ints and returns an int.',
        'Compare a and b, return the larger.',
        'return (a > b) ? a : b;',
      ],
      concepts: ['function definition', 'return value', 'comparison'],
    },
    {
      id: 'cpp-func-8',
      title: 'Factorial function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a recursive function factorial that computes n! (factorial of n). Handle the base case n <= 1. Call it from main with n = 6 and print the result.',
      skeleton: `#include <iostream>

// Write the factorial function here

int main() {
    std::cout << factorial(6) << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    std::cout << factorial(6) << std::endl;
    return 0;
}`,
      hints: [
        'The base case is: factorial of 0 or 1 is 1.',
        'The recursive case is: n * factorial(n - 1).',
        'if (n <= 1) return 1; return n * factorial(n - 1);',
      ],
      concepts: ['recursion', 'base case', 'factorial'],
    },
    {
      id: 'cpp-func-9',
      title: 'Overloaded area functions',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write two overloaded functions called area: one that takes a single double (radius) and returns the area of a circle, and one that takes two doubles (width, height) and returns the area of a rectangle. Call both from main.',
      skeleton: `#include <iostream>

// Write overloaded area functions here

int main() {
    std::cout << area(5.0) << std::endl;
    std::cout << area(4.0, 6.0) << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

double area(double radius) {
    return 3.14159265 * radius * radius;
}

double area(double width, double height) {
    return width * height;
}

int main() {
    std::cout << area(5.0) << std::endl;
    std::cout << area(4.0, 6.0) << std::endl;
    return 0;
}`,
      hints: [
        'Two functions with the same name but different parameter counts.',
        'Circle area: pi * r * r. Rectangle area: w * h.',
        'The compiler selects the correct overload based on argument count.',
      ],
      concepts: ['function overloading', 'area calculation'],
    },
    {
      id: 'cpp-func-10',
      title: 'Function with default arguments',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function greet that takes a std::string name and an optional std::string greeting with default "Hello". It prints "greeting, name!". Call it twice: once with just a name, and once with both.',
      skeleton: `#include <iostream>
#include <string>

// Write the greet function here

int main() {
    greet("Alice");
    greet("Bob", "Hey");
    return 0;
}`,
      solution: `#include <iostream>
#include <string>

void greet(std::string name, std::string greeting = "Hello") {
    std::cout << greeting << ", " << name << "!" << std::endl;
}

int main() {
    greet("Alice");
    greet("Bob", "Hey");
    return 0;
}`,
      hints: [
        'Default arguments go at the end of the parameter list.',
        'Use = "Hello" for the default value of greeting.',
        'void greet(std::string name, std::string greeting = "Hello")',
      ],
      concepts: ['default arguments', 'std::string'],
    },
    {
      id: 'cpp-func-11',
      title: 'Power function (iterative)',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function power that takes a double base and an int exponent (which can be negative) and returns base raised to the exponent. Handle negative exponents by inverting the result. Do not use std::pow.',
      skeleton: `#include <iostream>

// Write the power function here

int main() {
    std::cout << power(2.0, 10) << std::endl;
    std::cout << power(2.0, -3) << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

double power(double base, int exp) {
    double result = 1.0;
    int absExp = (exp < 0) ? -exp : exp;
    for (int i = 0; i < absExp; ++i) {
        result *= base;
    }
    return (exp < 0) ? 1.0 / result : result;
}

int main() {
    std::cout << power(2.0, 10) << std::endl;
    std::cout << power(2.0, -3) << std::endl;
    return 0;
}`,
      hints: [
        'Multiply base by itself |exp| times.',
        'If exp is negative, return 1.0 / result.',
        'Use a loop and a result accumulator starting at 1.0.',
      ],
      concepts: ['iterative algorithm', 'negative exponents'],
    },
    {
      id: 'cpp-func-12',
      title: 'GCD with recursion',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a recursive function gcd that computes the greatest common divisor of two positive integers using the Euclidean algorithm. Print gcd(48, 18) from main.',
      skeleton: `#include <iostream>

// Write the gcd function here

int main() {
    std::cout << gcd(48, 18) << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

int main() {
    std::cout << gcd(48, 18) << std::endl;
    return 0;
}`,
      hints: [
        'Euclidean algorithm: gcd(a, b) = gcd(b, a % b).',
        'Base case: when b is 0, the GCD is a.',
        'if (b == 0) return a; return gcd(b, a % b);',
      ],
      concepts: ['recursion', 'Euclidean algorithm', 'GCD'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-func-13',
      title: 'Fix missing return statement',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'This function is supposed to return a value but is missing the return statement.',
      skeleton: `#include <iostream>

int add(int a, int b) {
    int sum = a + b;
}

int main() {
    std::cout << add(3, 4) << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int add(int a, int b) {
    int sum = a + b;
    return sum;
}

int main() {
    std::cout << add(3, 4) << std::endl;
    return 0;
}`,
      hints: [
        'The function declares it returns int but never returns a value.',
        'This is undefined behavior in C++.',
        'Add `return sum;` at the end of the function.',
      ],
      concepts: ['return statement', 'undefined behavior'],
    },
    {
      id: 'cpp-func-14',
      title: 'Fix default argument in wrong position',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'The default argument is on the wrong parameter. Fix the function signature.',
      skeleton: `#include <iostream>

void printValue(int base = 10, int value) {
    std::cout << "Value: " << value << " Base: " << base << std::endl;
}

int main() {
    printValue(42);
    return 0;
}`,
      solution: `#include <iostream>

void printValue(int value, int base = 10) {
    std::cout << "Value: " << value << " Base: " << base << std::endl;
}

int main() {
    printValue(42);
    return 0;
}`,
      hints: [
        'Default arguments must appear at the end of the parameter list.',
        'A parameter with a default cannot precede one without.',
        'Swap the parameter order so base (with default) comes last.',
      ],
      concepts: ['default arguments', 'parameter order'],
    },
    {
      id: 'cpp-func-15',
      title: 'Fix ambiguous overload',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'This code has an ambiguous function call. Fix the call site to resolve the ambiguity.',
      skeleton: `#include <iostream>

void print(int value) {
    std::cout << "int: " << value << std::endl;
}

void print(double value) {
    std::cout << "double: " << value << std::endl;
}

int main() {
    print(3.14f);  // Bug: float is ambiguous between int and double
    return 0;
}`,
      solution: `#include <iostream>

void print(int value) {
    std::cout << "int: " << value << std::endl;
}

void print(double value) {
    std::cout << "double: " << value << std::endl;
}

int main() {
    print(static_cast<double>(3.14f));
    return 0;
}`,
      hints: [
        'A float literal can be implicitly converted to both int and double.',
        'The compiler cannot choose between the two overloads.',
        'Cast the argument explicitly: static_cast<double>(3.14f).',
      ],
      concepts: ['overload resolution', 'ambiguity', 'static_cast'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-func-16',
      title: 'Predict default argument usage',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int power(int base, int exp = 2) {
    int result = 1;
    for (int i = 0; i < exp; ++i) result *= base;
    return result;
}

int main() {
    std::cout << power(3) << " " << power(2, 5) << std::endl;
    return 0;
}`,
      solution: `9 32`,
      hints: [
        'power(3) uses the default exp = 2, so 3^2 = 9.',
        'power(2, 5) computes 2^5 = 32.',
        'Output: 9 32',
      ],
      concepts: ['default arguments', 'function calls'],
    },
    {
      id: 'cpp-func-17',
      title: 'Predict overload selection',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

void show(int x)    { std::cout << "int" << std::endl; }
void show(double x) { std::cout << "double" << std::endl; }
void show(char x)   { std::cout << "char" << std::endl; }

int main() {
    show(42);
    show(3.14);
    show('A');
    return 0;
}`,
      solution: `int
double
char`,
      hints: [
        'The compiler selects the best matching overload for each argument type.',
        '42 is an int, 3.14 is a double, \'A\' is a char.',
        'Each calls the corresponding overload.',
      ],
      concepts: ['overload resolution', 'type matching'],
    },
    {
      id: 'cpp-func-18',
      title: 'Predict pass-by-value',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

void increment(int x) {
    x += 10;
}

int main() {
    int value = 5;
    increment(value);
    std::cout << value << std::endl;
    return 0;
}`,
      solution: `5`,
      hints: [
        'C++ passes arguments by value by default.',
        'The function modifies a copy of value, not the original.',
        'value remains 5 in main.',
      ],
      concepts: ['pass by value', 'copy semantics'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-func-19',
      title: 'Extract repeated logic into a function',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Extract the repeated rectangle area calculation into a function called rectArea.',
      skeleton: `#include <iostream>

int main() {
    double w1 = 3.0, h1 = 4.0;
    double area1 = w1 * h1;
    std::cout << "Area 1: " << area1 << std::endl;

    double w2 = 5.0, h2 = 6.0;
    double area2 = w2 * h2;
    std::cout << "Area 2: " << area2 << std::endl;

    double w3 = 7.0, h3 = 8.0;
    double area3 = w3 * h3;
    std::cout << "Area 3: " << area3 << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

double rectArea(double w, double h) {
    return w * h;
}

int main() {
    std::cout << "Area 1: " << rectArea(3.0, 4.0) << std::endl;
    std::cout << "Area 2: " << rectArea(5.0, 6.0) << std::endl;
    std::cout << "Area 3: " << rectArea(7.0, 8.0) << std::endl;
    return 0;
}`,
      hints: [
        'The same w * h calculation appears three times.',
        'Create a function that takes width and height and returns the product.',
        'double rectArea(double w, double h) { return w * h; }',
      ],
      concepts: ['DRY principle', 'function extraction', 'refactoring'],
    },
    {
      id: 'cpp-func-20',
      title: 'Consolidate overloads with a default argument',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'These two function overloads can be replaced by a single function with a default argument. Refactor them.',
      skeleton: `#include <iostream>
#include <string>

void log(std::string message) {
    std::cout << "[INFO] " << message << std::endl;
}

void log(std::string message, std::string level) {
    std::cout << "[" << level << "] " << message << std::endl;
}

int main() {
    log("System started");
    log("Disk full", "WARN");
    return 0;
}`,
      solution: `#include <iostream>
#include <string>

void log(std::string message, std::string level = "INFO") {
    std::cout << "[" << level << "] " << message << std::endl;
}

int main() {
    log("System started");
    log("Disk full", "WARN");
    return 0;
}`,
      hints: [
        'The two overloads differ only in the presence of the level parameter.',
        'Give level a default value of "INFO" and remove the single-parameter version.',
        'void log(std::string message, std::string level = "INFO")',
      ],
      concepts: ['default arguments', 'overload consolidation', 'refactoring'],
    },
  ],
};
