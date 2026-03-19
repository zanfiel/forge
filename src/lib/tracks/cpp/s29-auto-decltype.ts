import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-auto',
  title: '29. Auto & Decltype',
  explanation: `## Auto & Decltype in C++\n\nModern C++ provides powerful type deduction mechanisms that reduce verbosity while maintaining full type safety.\n\n### Auto Variable Deduction\n\`\`\`cpp\nauto x = 42;          // int\nauto pi = 3.14;       // double\nauto name = std::string("hello"); // std::string\nauto it = vec.begin(); // iterator type deduced\n\`\`\`\n\n### Auto with References and Const\n\`\`\`cpp\nint x = 10;\nauto a = x;          // int (copy)\nauto& b = x;         // int& (reference)\nconst auto& c = x;   // const int& (const reference)\nauto&& d = x;        // int& (forwarding reference binds to lvalue)\nauto&& e = 42;       // int&& (forwarding reference binds to rvalue)\n\`\`\`\n\n### Decltype\n\`\`\`cpp\nint x = 5;\ndecltype(x) y = 10;       // int (same type as x)\ndecltype((x)) z = x;      // int& (expression in parens yields reference)\ndecltype(x + 0.0) w = 1;  // double (result of expression)\n\`\`\`\n\n### Trailing Return Types\n\`\`\`cpp\ntemplate<typename T, typename U>\nauto add(T a, U b) -> decltype(a + b) {\n    return a + b;\n}\n\`\`\`\n\n### decltype(auto) (C++14)\n\`\`\`cpp\nint x = 42;\nint& rx = x;\ndecltype(auto) a = x;    // int\ndecltype(auto) b = rx;   // int& (preserves reference)\ndecltype(auto) c = (x);  // int& (parenthesized expression)\n\`\`\`\n\n### Structured Bindings (C++17)\n\`\`\`cpp\nstd::pair<int, std::string> p{1, "hello"};\nauto [id, name] = p;  // int id = 1, string name = "hello"\n\nstd::map<std::string, int> m;\nfor (const auto& [key, value] : m) {\n    // key is const string&, value is const int&\n}\n\`\`\`\n\n### Auto in Function Parameters (C++20)\n\`\`\`cpp\nvoid print(auto const& value) {\n    std::cout << value << std::endl;\n}\n// Equivalent to a function template\n\`\`\``,
  exercises: [
    {
      id: 'cpp-auto-1',
      title: 'Basic Auto Deduction',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to use auto for type deduction.',
      skeleton: `___ x = 42;
___ pi = 3.14;
___ name = std::string("hello");`,
      solution: `auto x = 42;
auto pi = 3.14;
auto name = std::string("hello");`,
      hints: [
        'auto lets the compiler deduce the type from the initializer.',
        'All three variables should use the auto keyword.',
        '42 deduces to int, 3.14 to double, std::string("hello") to std::string.',
      ],
      concepts: ['auto', 'type deduction', 'initialization'],
    },
    {
      id: 'cpp-auto-2',
      title: 'Auto with Const Reference',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to create a const reference using auto.',
      skeleton: `std::vector<int> data = {1, 2, 3, 4, 5};
___ ref = data; // const reference to data, no copy`,
      solution: `std::vector<int> data = {1, 2, 3, 4, 5};
const auto& ref = data; // const reference to data, no copy`,
      hints: [
        'auto alone would create a copy of the vector.',
        'Add & to make it a reference.',
        'Add const to prevent modification.',
      ],
      concepts: ['const auto&', 'reference', 'avoiding copies'],
    },
    {
      id: 'cpp-auto-3',
      title: 'Auto in Range-For',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to iterate over the vector by const reference using auto.',
      skeleton: `#include <vector>
#include <iostream>

void printAll(const std::vector<std::string>& words) {
    for (___ word : words) {
        std::cout << word << " ";
    }
}`,
      solution: `#include <vector>
#include <iostream>

void printAll(const std::vector<std::string>& words) {
    for (const auto& word : words) {
        std::cout << word << " ";
    }
}`,
      hints: [
        'Using auto& avoids copying each string.',
        'Since we only read, use const auto&.',
        'This is the idiomatic way to iterate over containers of non-trivial types.',
      ],
      concepts: ['range-for', 'const auto&', 'iteration'],
    },
    {
      id: 'cpp-auto-4',
      title: 'Decltype Basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to declare y with the same type as x using decltype.',
      skeleton: `int x = 42;
___ y = 100; // same type as x`,
      solution: `int x = 42;
decltype(x) y = 100; // same type as x`,
      hints: [
        'decltype(expr) yields the type of the expression.',
        'decltype(x) where x is an int variable yields int.',
        'This is useful in templates when you do not know the exact type.',
      ],
      concepts: ['decltype', 'type query', 'type deduction'],
    },
    {
      id: 'cpp-auto-5',
      title: 'Predict Auto Types',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>
#include <typeinfo>

int main() {
    auto a = 10;
    auto b = 10.0;
    auto c = 'A';
    std::cout << sizeof(a) << " "
              << sizeof(b) << " "
              << sizeof(c) << std::endl;
    return 0;
}
// Assume: sizeof(int)=4, sizeof(double)=8, sizeof(char)=1`,
      solution: `4 8 1`,
      hints: [
        'auto deduces a as int (4 bytes), b as double (8 bytes), c as char (1 byte).',
        'Integer literals default to int, floating-point literals to double.',
        'Character literals are char.',
      ],
      concepts: ['auto deduction', 'sizeof', 'literal types'],
    },
    {
      id: 'cpp-auto-6',
      title: 'Write Iterator Loop with Auto',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a function that finds and returns an iterator to the first negative number in a vector, using auto for the iterator type.',
      skeleton: `#include <vector>

auto findFirstNegative(std::vector<int>& v) {
    // Use auto for the iterator and loop through the vector
    // Return an iterator to the first negative element
    // Return v.end() if none found
}`,
      solution: `#include <vector>

auto findFirstNegative(std::vector<int>& v) {
    for (auto it = v.begin(); it != v.end(); ++it) {
        if (*it < 0) return it;
    }
    return v.end();
}`,
      hints: [
        'Use auto it = v.begin() instead of writing std::vector<int>::iterator.',
        'Dereference the iterator with *it to check the value.',
        'The return type is deduced as std::vector<int>::iterator.',
      ],
      concepts: ['auto', 'iterators', 'return type deduction'],
    },
    {
      id: 'cpp-auto-7',
      title: 'Trailing Return Type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blanks to use a trailing return type with decltype.',
      skeleton: `template<typename T, typename U>
___ multiply(T a, U b) ___ {
    return a * b;
}`,
      solution: `template<typename T, typename U>
auto multiply(T a, U b) -> decltype(a * b) {
    return a * b;
}`,
      hints: [
        'Use auto as the leading return type placeholder.',
        'After the parameter list, add -> decltype(a * b).',
        'This tells the compiler the return type is whatever a * b produces.',
      ],
      concepts: ['trailing return type', 'decltype', 'template'],
    },
    {
      id: 'cpp-auto-8',
      title: 'Structured Bindings',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Use structured bindings (C++17) to decompose a std::pair and return the sum of its elements.',
      skeleton: `#include <utility>

int sumPair(const std::pair<int, int>& p) {
    // Use structured bindings to extract first and second
    // Return their sum
}`,
      solution: `#include <utility>

int sumPair(const std::pair<int, int>& p) {
    const auto& [a, b] = p;
    return a + b;
}`,
      hints: [
        'Structured bindings use the syntax auto [name1, name2] = expr.',
        'Use const auto& to bind by const reference and avoid copies.',
        'The names bind to .first and .second of the pair.',
      ],
      concepts: ['structured bindings', 'C++17', 'std::pair'],
    },
    {
      id: 'cpp-auto-9',
      title: 'Predict Decltype with Parentheses',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    int x = 10;
    decltype(x) a = 20;    // What type is a?
    decltype((x)) b = x;   // What type is b?
    b = 99;
    std::cout << x << " " << a << std::endl;
    return 0;
}`,
      solution: `99 20`,
      hints: [
        'decltype(x) yields int (the declared type of x).',
        'decltype((x)) yields int& (parenthesized expression is an lvalue reference).',
        'Since b is a reference to x, modifying b changes x to 99.',
      ],
      concepts: ['decltype', 'parenthesized expression', 'lvalue reference'],
    },
    {
      id: 'cpp-auto-10',
      title: 'Fix Auto Copy Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the bug where auto creates an unintended copy instead of a reference.',
      skeleton: `#include <vector>
#include <iostream>

void doubleAll(std::vector<int>& v) {
    for (auto elem : v) {
        elem *= 2;
    }
}

int main() {
    std::vector<int> v = {1, 2, 3};
    doubleAll(v);
    for (auto x : v) std::cout << x << " ";
    // Expected: 2 4 6
    // Actual: 1 2 3
}`,
      solution: `#include <vector>
#include <iostream>

void doubleAll(std::vector<int>& v) {
    for (auto& elem : v) {
        elem *= 2;
    }
}

int main() {
    std::vector<int> v = {1, 2, 3};
    doubleAll(v);
    for (auto x : v) std::cout << x << " ";
    // Now prints: 2 4 6
}`,
      hints: [
        'auto elem creates a copy of each element.',
        'Modifying the copy does not change the original vector.',
        'Use auto& elem to get a reference to each element.',
      ],
      concepts: ['auto copy vs reference', 'range-for', 'mutation'],
    },
    {
      id: 'cpp-auto-11',
      title: 'decltype(auto) Preservation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to use decltype(auto) to perfectly preserve the return type including references.',
      skeleton: `int global = 42;

int& getRef() { return global; }

___ forwardRef() {
    return getRef();
}
// forwardRef() should return int&, not int`,
      solution: `int global = 42;

int& getRef() { return global; }

decltype(auto) forwardRef() {
    return getRef();
}
// forwardRef() returns int&, not int`,
      hints: [
        'auto as return type would strip the reference and return int.',
        'decltype(auto) preserves the exact type, including references.',
        'This is essential for perfect forwarding of return values.',
      ],
      concepts: ['decltype(auto)', 'reference preservation', 'return type deduction'],
    },
    {
      id: 'cpp-auto-12',
      title: 'Structured Bindings with Map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that prints all key-value pairs from a map using structured bindings.',
      skeleton: `#include <map>
#include <string>
#include <iostream>

void printMap(const std::map<std::string, int>& m) {
    // Use structured bindings in a range-for loop
    // Print each pair as "key: value\\n"
}`,
      solution: `#include <map>
#include <string>
#include <iostream>

void printMap(const std::map<std::string, int>& m) {
    for (const auto& [key, value] : m) {
        std::cout << key << ": " << value << "\\n";
    }
}`,
      hints: [
        'Each element in a map is a std::pair<const Key, Value>.',
        'Use const auto& [key, value] to decompose each pair.',
        'This is much cleaner than using .first and .second.',
      ],
      concepts: ['structured bindings', 'std::map', 'range-for'],
    },
    {
      id: 'cpp-auto-13',
      title: 'Fix Decltype Deduction',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the function that accidentally returns a dangling reference due to decltype(auto).',
      skeleton: `#include <string>

decltype(auto) getName() {
    std::string name = "Alice";
    return (name); // Bug: parentheses make this int&
}`,
      solution: `#include <string>

decltype(auto) getName() {
    std::string name = "Alice";
    return name; // Without parentheses, returns std::string by value
}`,
      hints: [
        'decltype(auto) with a parenthesized expression deduces a reference type.',
        'return (name) makes decltype(auto) deduce std::string&, a dangling reference.',
        'Remove the parentheses so it deduces std::string and returns by value.',
      ],
      concepts: ['decltype(auto)', 'dangling reference', 'parenthesized expression'],
    },
    {
      id: 'cpp-auto-14',
      title: 'Auto Function Parameters (C++20)',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a C++20 function using auto parameters that computes the dot product of two same-sized arrays.',
      skeleton: `#include <array>

// Write a function 'dot' that takes two const auto& parameters
// (std::array of any numeric type and any size)
// Returns the dot product (sum of element-wise products)`,
      solution: `#include <array>

auto dot(const auto& a, const auto& b) {
    decltype(a[0] * b[0]) sum = {};
    for (std::size_t i = 0; i < a.size(); ++i) {
        sum += a[i] * b[i];
    }
    return sum;
}`,
      hints: [
        'C++20 allows auto in function parameters, making it an abbreviated template.',
        'Use decltype to figure out the correct return/accumulator type.',
        'Initialize sum with {} for zero-initialization.',
      ],
      concepts: ['auto parameters', 'C++20', 'abbreviated templates', 'decltype'],
    },
    {
      id: 'cpp-auto-15',
      title: 'Predict Forwarding Reference',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>
#include <type_traits>

int main() {
    int x = 10;
    auto&& a = x;       // binds to lvalue
    auto&& b = 42;      // binds to rvalue
    std::cout << std::is_lvalue_reference<decltype(a)>::value << " "
              << std::is_rvalue_reference<decltype(b)>::value << std::endl;
    return 0;
}`,
      solution: `1 1`,
      hints: [
        'auto&& is a forwarding reference (universal reference).',
        'When bound to an lvalue (x), it deduces to int& (lvalue reference).',
        'When bound to an rvalue (42), it deduces to int&& (rvalue reference).',
      ],
      concepts: ['forwarding reference', 'auto&&', 'reference collapsing'],
    },
    {
      id: 'cpp-auto-16',
      title: 'Type Deduction Pitfall: Braces',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fix the unexpected type deduction when using auto with braced initialization.',
      skeleton: `#include <iostream>

int main() {
    auto x = {1, 2, 3}; // Oops: this is std::initializer_list<int>, not an array!
    // We wanted a simple int with value 1
    auto y = {1};        // Also std::initializer_list<int>, not int!
    std::cout << y.size() << std::endl; // prints 1, not expected
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    auto x = std::array{1, 2, 3}; // explicitly an array
    // Simple int with value 1
    auto y = 1;                     // int, not initializer_list
    std::cout << y << std::endl;    // prints 1
    return 0;
}`,
      hints: [
        'auto x = {values} deduces to std::initializer_list, not an array or int.',
        'To get a plain int, use auto y = 1 without braces.',
        'For an array, use std::array{1,2,3} with CTAD.',
      ],
      concepts: ['initializer_list pitfall', 'auto deduction', 'braced init'],
    },
    {
      id: 'cpp-auto-17',
      title: 'Structured Bindings with Custom Struct',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function that returns a struct with three fields and destructures it using structured bindings at the call site.',
      skeleton: `#include <string>
#include <iostream>

struct Result {
    bool success;
    int code;
    std::string message;
};

Result process() {
    // Return a Result indicating success with code 200 and message "OK"
}

void printResult() {
    // Use structured bindings to decompose the return value
    // Print: "Success: 1, Code: 200, Message: OK"
}`,
      solution: `#include <string>
#include <iostream>

struct Result {
    bool success;
    int code;
    std::string message;
};

Result process() {
    return {true, 200, "OK"};
}

void printResult() {
    auto [success, code, message] = process();
    std::cout << "Success: " << success
              << ", Code: " << code
              << ", Message: " << message << std::endl;
}`,
      hints: [
        'Structured bindings work with aggregate types (structs with public members).',
        'auto [a, b, c] = expr decomposes the struct fields in order.',
        'The number of names must match the number of fields.',
      ],
      concepts: ['structured bindings', 'aggregate types', 'decomposition'],
    },
    {
      id: 'cpp-auto-18',
      title: 'Refactor Verbose Types',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor this code to use auto and structured bindings, removing all verbose type annotations.',
      skeleton: `#include <map>
#include <string>
#include <vector>
#include <iostream>

void summarize(const std::map<std::string, std::vector<int>>& data) {
    for (std::map<std::string, std::vector<int>>::const_iterator it = data.begin();
         it != data.end(); ++it) {
        const std::string& key = it->first;
        const std::vector<int>& values = it->second;
        int sum = 0;
        for (std::vector<int>::const_iterator vit = values.begin();
             vit != values.end(); ++vit) {
            sum += *vit;
        }
        std::cout << key << ": " << sum << "\\n";
    }
}`,
      solution: `#include <map>
#include <string>
#include <vector>
#include <iostream>

void summarize(const std::map<std::string, std::vector<int>>& data) {
    for (const auto& [key, values] : data) {
        int sum = 0;
        for (const auto& v : values) {
            sum += v;
        }
        std::cout << key << ": " << sum << "\\n";
    }
}`,
      hints: [
        'Replace the outer iterator loop with a range-for using structured bindings.',
        'const auto& [key, values] decomposes each map entry.',
        'Replace the inner iterator loop with a simple range-for.',
      ],
      concepts: ['refactor', 'auto', 'structured bindings', 'range-for'],
    },
    {
      id: 'cpp-auto-19',
      title: 'Refactor with decltype(auto) Wrapper',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor this logging wrapper to perfectly preserve the return type (including references) using decltype(auto).',
      skeleton: `#include <iostream>
#include <string>

std::string& getName();

// This wrapper strips the reference - caller gets a copy
auto logAndReturn() {
    std::cout << "Calling getName\\n";
    return getName();
}`,
      solution: `#include <iostream>
#include <string>

std::string& getName();

// decltype(auto) preserves the reference return type
decltype(auto) logAndReturn() {
    std::cout << "Calling getName\\n";
    return getName();
}`,
      hints: [
        'auto as a return type strips references by default.',
        'decltype(auto) preserves the exact type, including references.',
        'This is critical when wrapping functions that return references.',
      ],
      concepts: ['decltype(auto)', 'perfect return', 'reference stripping'],
    },
    {
      id: 'cpp-auto-20',
      title: 'Predict Complex Deduction',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    const int x = 10;
    auto a = x;          // const is dropped
    auto& b = x;         // const is preserved
    a = 20;
    // b = 30;           // would not compile
    std::cout << a << " " << b << " " << x << std::endl;
    return 0;
}`,
      solution: `20 10 10`,
      hints: [
        'auto drops top-level const: a is int, not const int.',
        'auto& preserves const: b is const int&.',
        'a is modified to 20. b and x remain 10.',
      ],
      concepts: ['auto const stripping', 'auto&', 'top-level const'],
    },
  ]
};
