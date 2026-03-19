import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-modules',
  title: '34. Modules (C++20)',
  explanation: `## Modules in C++20\n\nC++20 introduces **modules**, replacing the traditional header/source file model with a modern compilation model that offers faster builds, better encapsulation, and no macro leakage.\n\n### Module Declaration\n\n\`\`\`cpp\n// math.cppm (module interface unit)\nexport module math;\n\nexport int add(int a, int b) {\n    return a + b;\n}\n\`\`\`\n\n### Import\n\n\`\`\`cpp\nimport math;\n\nint main() {\n    return add(2, 3);\n}\n\`\`\`\n\n### Export\n\nYou can export individual declarations or groups:\n\n\`\`\`cpp\nexport module geometry;\n\nexport double area(double r) { return 3.14159 * r * r; }\n\nexport {\n    struct Point { double x, y; };\n    double distance(Point a, Point b);\n}\n\`\`\`\n\n### Module Partitions\n\nLarge modules can be split into partitions:\n\n\`\`\`cpp\n// math-add.cppm\nexport module math:add;\nexport int add(int a, int b) { return a + b; }\n\n// math-mul.cppm\nexport module math:mul;\nexport int mul(int a, int b) { return a * b; }\n\n// math.cppm (primary interface)\nexport module math;\nexport import :add;\nexport import :mul;\n\`\`\`\n\n### Interface vs Implementation\n\n\`\`\`cpp\n// math.cppm - interface\nexport module math;\nexport int add(int a, int b);\n\n// math_impl.cpp - implementation\nmodule math;\nint add(int a, int b) { return a + b; }\n\`\`\`\n\n### Key Benefits\n- **Faster compilation** - modules are compiled once and imported as binary\n- **No include guards** - no #pragma once or #ifndef needed\n- **No macro leakage** - macros don't escape module boundaries\n- **Better encapsulation** - only exported symbols are visible`,
  exercises: [
    {
      id: 'cpp-modules-1',
      title: 'Declare a Module',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to declare a module named "utils".',
      skeleton: `// utils.cppm
___ module utils;

export int square(int x) {
    return x * x;
}`,
      solution: `// utils.cppm
export module utils;

export int square(int x) {
    return x * x;
}`,
      hints: [
        'A module interface unit starts with "export module name;".',
        'The export keyword before module makes it an interface unit.',
        'Fill in "export".',
      ],
      concepts: ['modules', 'module-declaration'],
    },
    {
      id: 'cpp-modules-2',
      title: 'Import a Module',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to import the "utils" module.',
      skeleton: `___ utils;

int main() {
    return square(5); // 25
}`,
      solution: `import utils;

int main() {
    return square(5); // 25
}`,
      hints: [
        'The keyword to bring a module into scope is "import".',
        'import replaces #include for modules.',
        'Fill in "import".',
      ],
      concepts: ['modules', 'import'],
    },
    {
      id: 'cpp-modules-3',
      title: 'Export a Group of Declarations',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to export both the struct and the function as a group.',
      skeleton: `export module geometry;

___ {
    struct Point {
        double x, y;
    };

    double distance(Point a, Point b);
}`,
      solution: `export module geometry;

export {
    struct Point {
        double x, y;
    };

    double distance(Point a, Point b);
}`,
      hints: [
        'An export block uses "export { ... }" to export multiple declarations.',
        'Everything inside the export block becomes part of the module interface.',
        'Fill in "export".',
      ],
      concepts: ['modules', 'export-block'],
    },
    {
      id: 'cpp-modules-4',
      title: 'Module Partition Declaration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to declare this file as the "add" partition of the "math" module.',
      skeleton: `// math-add.cppm
export module math___;

export int add(int a, int b) {
    return a + b;
}`,
      solution: `// math-add.cppm
export module math:add;

export int add(int a, int b) {
    return a + b;
}`,
      hints: [
        'Module partitions use a colon separator: module_name:partition_name.',
        'The syntax is: export module math:add;',
        'Fill in ":add".',
      ],
      concepts: ['modules', 'module-partitions'],
    },
    {
      id: 'cpp-modules-5',
      title: 'Import a Module Partition',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to re-export the "add" partition from the primary module interface.',
      skeleton: `// math.cppm
export module math;

export ___ :add;
export import :mul;`,
      solution: `// math.cppm
export module math;

export import :add;
export import :mul;`,
      hints: [
        'To re-export a partition, use "export import :partition_name;".',
        'The import keyword is needed to bring the partition in.',
        'Fill in "import".',
      ],
      concepts: ['modules', 'module-partitions', 're-export'],
    },
    {
      id: 'cpp-modules-6',
      title: 'Module Implementation Unit',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to declare this as the implementation unit for the "math" module (not an interface).',
      skeleton: `// math_impl.cpp
___ math;

int add(int a, int b) {
    return a + b;
}`,
      solution: `// math_impl.cpp
module math;

int add(int a, int b) {
    return a + b;
}`,
      hints: [
        'An implementation unit uses "module name;" without the export keyword.',
        'No export keyword means this is an implementation, not an interface.',
        'Fill in "module".',
      ],
      concepts: ['modules', 'implementation-unit'],
    },
    {
      id: 'cpp-modules-7',
      title: 'Write a Complete Module',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a complete module interface unit called "stringutils" that exports a function repeat_str(string, int) returning the string repeated n times.',
      skeleton: `// stringutils.cppm
// Write the complete module interface here

// Consumer file:
// import stringutils;
// std::cout << repeat_str("ha", 3); // "hahaha"`,
      solution: `// stringutils.cppm
export module stringutils;

import <string>;

export std::string repeat_str(const std::string& s, int n) {
    std::string result;
    for (int i = 0; i < n; ++i) {
        result += s;
    }
    return result;
}

// Consumer file:
// import stringutils;
// std::cout << repeat_str("ha", 3); // "hahaha"`,
      hints: [
        'Start with "export module stringutils;".',
        'Import the <string> header module for std::string.',
        'Export the function with the export keyword before the return type.',
      ],
      concepts: ['modules', 'module-declaration', 'export'],
    },
    {
      id: 'cpp-modules-8',
      title: 'Write a Module with Private Helpers',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a module "converter" that exports celsius_to_fahrenheit but keeps the internal multiply_and_add helper private (not exported).',
      skeleton: `// converter.cppm
// Write the module here
// multiply_and_add should NOT be visible to importers
// celsius_to_fahrenheit(double c) = c * 9/5 + 32`,
      solution: `// converter.cppm
export module converter;

double multiply_and_add(double val, double mul, double add) {
    return val * mul + add;
}

export double celsius_to_fahrenheit(double c) {
    return multiply_and_add(c, 9.0 / 5.0, 32.0);
}`,
      hints: [
        'Declarations without export are module-private.',
        'Only exported symbols are visible to importers.',
        'Define multiply_and_add without the export keyword.',
      ],
      concepts: ['modules', 'encapsulation', 'private-functions'],
    },
    {
      id: 'cpp-modules-9',
      title: 'Write a Partitioned Module',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write three files: math:add partition, math:sub partition, and the primary math module that re-exports both.',
      skeleton: `// FILE 1: math-add.cppm
// Write the add partition

// FILE 2: math-sub.cppm
// Write the sub partition

// FILE 3: math.cppm
// Write the primary interface that re-exports both partitions`,
      solution: `// FILE 1: math-add.cppm
export module math:add;
export int add(int a, int b) { return a + b; }

// FILE 2: math-sub.cppm
export module math:sub;
export int sub(int a, int b) { return a - b; }

// FILE 3: math.cppm
export module math;
export import :add;
export import :sub;`,
      hints: [
        'Each partition declares "export module math:name;".',
        'The primary interface uses "export import :name;" for each partition.',
        'Each partition file exports its own functions.',
      ],
      concepts: ['modules', 'module-partitions', 're-export'],
    },
    {
      id: 'cpp-modules-10',
      title: 'Write a Module Exporting a Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a module "shapes" that exports a Circle class with a constructor and an area() method.',
      skeleton: `// shapes.cppm
// Write a module exporting Circle with:
// - Constructor taking radius
// - double area() const
// Use pi = 3.14159265358979`,
      solution: `// shapes.cppm
export module shapes;

export class Circle {
    double radius_;
public:
    Circle(double r) : radius_(r) {}

    double area() const {
        return 3.14159265358979 * radius_ * radius_;
    }
};`,
      hints: [
        'Export the entire class with "export class Circle { ... };".',
        'The class can have private members; only the exported interface matters.',
        'area() = pi * r * r.',
      ],
      concepts: ['modules', 'export-class'],
    },
    {
      id: 'cpp-modules-11',
      title: 'Write Interface and Implementation Split',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write both the module interface (declaring factorial) and the implementation unit (defining it).',
      skeleton: `// FILE 1: mathfuncs.cppm (interface)
// Declare but do not define factorial(int) -> int

// FILE 2: mathfuncs_impl.cpp (implementation)
// Define factorial(int) -> int`,
      solution: `// FILE 1: mathfuncs.cppm (interface)
export module mathfuncs;

export int factorial(int n);

// FILE 2: mathfuncs_impl.cpp (implementation)
module mathfuncs;

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`,
      hints: [
        'The interface uses "export module mathfuncs;" and declares the function.',
        'The implementation uses "module mathfuncs;" (no export) and defines the function.',
        'Only the interface file has the export keyword on the module declaration.',
      ],
      concepts: ['modules', 'interface-implementation-split'],
    },
    {
      id: 'cpp-modules-12',
      title: 'Write a Module with Namespace',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a module "collections" that exports a namespace "col" containing a Stack<T> template class with push, pop, and top methods.',
      skeleton: `// collections.cppm
// Write the module exporting namespace col with Stack<T>`,
      solution: `// collections.cppm
export module collections;

import <vector>;

export namespace col {
    template<typename T>
    class Stack {
        std::vector<T> data_;
    public:
        void push(const T& val) { data_.push_back(val); }
        void pop() { data_.pop_back(); }
        const T& top() const { return data_.back(); }
        bool empty() const { return data_.empty(); }
    };
}`,
      hints: [
        'Use "export namespace col { ... }" to export an entire namespace.',
        'All declarations inside an exported namespace are exported.',
        'Use std::vector internally for the stack storage.',
      ],
      concepts: ['modules', 'export-namespace', 'templates'],
    },
    {
      id: 'cpp-modules-13',
      title: 'Fix the Missing Export',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the module so that the greet function is accessible to importers.',
      skeleton: `// greetings.cppm
export module greetings;

import <string>;

std::string greet(const std::string& name) {
    return "Hello, " + name + "!";
}

// consumer.cpp
// import greetings;
// auto msg = greet("World"); // ERROR: greet not found`,
      solution: `// greetings.cppm
export module greetings;

import <string>;

export std::string greet(const std::string& name) {
    return "Hello, " + name + "!";
}

// consumer.cpp
// import greetings;
// auto msg = greet("World"); // OK`,
      hints: [
        'Functions in a module are private by default.',
        'Add the export keyword before the function to make it visible.',
        'export std::string greet(...) makes it accessible to importers.',
      ],
      concepts: ['modules', 'export'],
    },
    {
      id: 'cpp-modules-14',
      title: 'Fix the Module vs Header Include',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the code that incorrectly uses #include inside a module.',
      skeleton: `// mymodule.cppm
export module mymodule;

#include <string>
#include <vector>

export std::vector<std::string> split(const std::string& s, char delim);`,
      solution: `// mymodule.cppm
export module mymodule;

import <string>;
import <vector>;

export std::vector<std::string> split(const std::string& s, char delim);`,
      hints: [
        '#include inside a module body can cause issues with macro leakage.',
        'Use "import <header>;" instead of #include in module units.',
        'Replace #include <string> with import <string>;',
      ],
      concepts: ['modules', 'header-units', 'import'],
    },
    {
      id: 'cpp-modules-15',
      title: 'Fix the Partition Import',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the primary module interface so partitions are properly re-exported.',
      skeleton: `// math.cppm
export module math;

import :add;
import :mul;

// Consumer cannot access add() or mul() - they are not re-exported`,
      solution: `// math.cppm
export module math;

export import :add;
export import :mul;

// Consumer can now access add() and mul()`,
      hints: [
        'Plain "import :partition" imports but does not re-export.',
        'Use "export import :partition" to make partition exports visible to consumers.',
        'Add the export keyword before each import.',
      ],
      concepts: ['modules', 'module-partitions', 're-export'],
    },
    {
      id: 'cpp-modules-16',
      title: 'Predict Module Visibility',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Determine which functions are accessible from the consumer.',
      skeleton: `// mylib.cppm
export module mylib;

int helper(int x) { return x * 2; }     // A
export int doubled(int x) { return helper(x); }  // B
export int tripled(int x) { return x * 3; }     // C

// consumer.cpp
import mylib;
// Which calls compile?
// 1: helper(5)
// 2: doubled(5)
// 3: tripled(5)
// Answer with "compiles" or "error" for each, space-separated`,
      solution: `error compiles compiles`,
      hints: [
        'Only exported functions are visible to importers.',
        'helper is not exported, so it cannot be called from consumer.',
        'doubled and tripled are both exported.',
      ],
      concepts: ['modules', 'export', 'visibility'],
    },
    {
      id: 'cpp-modules-17',
      title: 'Predict Partition Visibility',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Determine what the consumer can access.',
      skeleton: `// math-add.cppm
export module math:add;
export int add(int a, int b) { return a + b; }

// math-mul.cppm
export module math:mul;
export int mul(int a, int b) { return a * b; }

// math.cppm
export module math;
export import :add;
import :mul;  // Note: no "export" before import

// consumer.cpp
import math;
// Which calls compile?
// 1: add(2, 3)
// 2: mul(2, 3)
// Answer: "compiles" or "error" for each, space-separated`,
      solution: `compiles error`,
      hints: [
        'export import :add re-exports the add partition.',
        'import :mul (without export) imports internally but does not re-export.',
        'The consumer can use add but not mul.',
      ],
      concepts: ['modules', 'module-partitions', 're-export', 'visibility'],
    },
    {
      id: 'cpp-modules-18',
      title: 'Predict Macro Isolation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Determine whether the macro leaks from the module.',
      skeleton: `// mymod.cppm
export module mymod;

#define SECRET 42

export int get_value() { return SECRET; }

// consumer.cpp
import mymod;
// Does this compile?
// int x = SECRET;
// Answer: "yes" or "no"`,
      solution: `no`,
      hints: [
        'Macros defined inside a module do not leak to importers.',
        'This is one of the key benefits of modules over headers.',
        'SECRET is not visible in consumer.cpp.',
      ],
      concepts: ['modules', 'macro-isolation'],
    },
    {
      id: 'cpp-modules-19',
      title: 'Refactor Header to Module',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor the traditional header/source pair into a module interface unit.',
      skeleton: `// math.h
#pragma once
#ifndef MATH_H
#define MATH_H

namespace math {
    int add(int a, int b);
    int sub(int a, int b);
}

#endif

// math.cpp
#include "math.h"

namespace math {
    int add(int a, int b) { return a + b; }
    int sub(int a, int b) { return a - b; }
}`,
      solution: `// math.cppm
export module math;

export namespace math {
    int add(int a, int b) { return a + b; }
    int sub(int a, int b) { return a - b; }
}`,
      hints: [
        'Replace #pragma once and include guards with a module declaration.',
        'Use "export module math;" at the top.',
        'Export the namespace and define functions inline in the interface.',
      ],
      concepts: ['modules', 'header-to-module', 'refactoring'],
    },
    {
      id: 'cpp-modules-20',
      title: 'Refactor Multiple Headers to Partitioned Module',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor two separate header files into a single partitioned module.',
      skeleton: `// vector_ops.h
#pragma once
struct Vec2 { float x, y; };
Vec2 add(Vec2 a, Vec2 b);

// matrix_ops.h
#pragma once
struct Mat2 { float m[2][2]; };
Mat2 identity();

// vector_ops.cpp
#include "vector_ops.h"
Vec2 add(Vec2 a, Vec2 b) { return {a.x + b.x, a.y + b.y}; }

// matrix_ops.cpp
#include "matrix_ops.h"
Mat2 identity() { return {{{1,0},{0,1}}}; }`,
      solution: `// linalg-vector.cppm
export module linalg:vector;
export struct Vec2 { float x, y; };
export Vec2 add(Vec2 a, Vec2 b) { return {a.x + b.x, a.y + b.y}; }

// linalg-matrix.cppm
export module linalg:matrix;
export struct Mat2 { float m[2][2]; };
export Mat2 identity() { return {{{1,0},{0,1}}}; }

// linalg.cppm
export module linalg;
export import :vector;
export import :matrix;`,
      hints: [
        'Create partition files for each logical group: linalg:vector and linalg:matrix.',
        'The primary interface re-exports both partitions.',
        'No include guards or #pragma once needed.',
      ],
      concepts: ['modules', 'module-partitions', 'refactoring'],
    },
  ],
};
