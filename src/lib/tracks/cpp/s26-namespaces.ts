import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-ns',
  title: '26. Namespaces',
  explanation: `## Namespaces in C++\n\nNamespaces provide a way to organize code and prevent name collisions. They group related declarations under a named scope.\n\n### Basic Namespace\n\n\`\`\`cpp\nnamespace math {\n    double pi = 3.14159265;\n    double square(double x) { return x * x; }\n}\n\n// Access with scope resolution\ndouble area = math::pi * math::square(5.0);\n\`\`\`\n\n### Nested Namespaces (C++17)\n\n\`\`\`cpp\n// C++17 shorthand\nnamespace company::project::module {\n    void process() { /* ... */ }\n}\n\n// Equivalent to:\nnamespace company {\n    namespace project {\n        namespace module {\n            void process() { /* ... */ }\n        }\n    }\n}\n\`\`\`\n\n### Using Declarations & Directives\n\n\`\`\`cpp\n// using declaration - brings one name into scope\nusing std::cout;\nusing std::endl;\ncout << \"Hello\" << endl;\n\n// using directive - brings entire namespace into scope\nusing namespace std; // generally discouraged in headers\ncout << \"Hello\" << endl;\n\`\`\`\n\n### Inline Namespaces\n\n\`\`\`cpp\nnamespace lib {\n    inline namespace v2 {\n        void api_call() { /* v2 implementation */ }\n    }\n    namespace v1 {\n        void api_call() { /* v1 implementation */ }\n    }\n}\n\nlib::api_call();    // calls v2 (inline)\nlib::v1::api_call(); // explicitly calls v1\n\`\`\`\n\n### Anonymous Namespaces\n\n\`\`\`cpp\nnamespace {\n    int internal_counter = 0; // internal linkage, like static\n    void helper() { /* only visible in this translation unit */ }\n}\n\`\`\`\n\nAnonymous namespaces replace the C-style \`static\` for internal linkage and are the preferred way to create file-local declarations.`,
  exercises: [
    {
      id: 'cpp-ns-1',
      title: 'Declare a Namespace',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to declare a namespace containing a function.',
      skeleton: `___ geometry {
    double circle_area(double r) {
        return 3.14159 * r * r;
    }
}

int main() {
    double a = geometry::circle_area(5.0);
    return 0;
}`,
      solution: `namespace geometry {
    double circle_area(double r) {
        return 3.14159 * r * r;
    }
}

int main() {
    double a = geometry::circle_area(5.0);
    return 0;
}`,
      hints: [
        'The keyword creates a named scope for grouping declarations.',
        'Members are accessed with the :: operator.',
        'namespace is the keyword.',
      ],
      concepts: ['namespace', 'scope-resolution', 'declaration'],
    },
    {
      id: 'cpp-ns-2',
      title: 'Using Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to bring std::cout into the current scope.',
      skeleton: `#include <iostream>

___ std::cout;
___ std::endl;

int main() {
    cout << "Hello" << endl;
    return 0;
}`,
      solution: `#include <iostream>

using std::cout;
using std::endl;

int main() {
    cout << "Hello" << endl;
    return 0;
}`,
      hints: [
        'A using declaration brings a specific name into the current scope.',
        'It requires the full qualified name.',
        'using std::cout; makes cout available without the std:: prefix.',
      ],
      concepts: ['using-declaration', 'scope', 'std'],
    },
    {
      id: 'cpp-ns-3',
      title: 'Nested Namespace (C++17)',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to declare a nested namespace using C++17 syntax.',
      skeleton: `namespace app___net___http {
    void send_request() {}
}

int main() {
    app::net::http::send_request();
    return 0;
}`,
      solution: `namespace app::net::http {
    void send_request() {}
}

int main() {
    app::net::http::send_request();
    return 0;
}`,
      hints: [
        'C++17 allows nested namespaces with a shorthand syntax.',
        'Separate namespace levels with :: in the declaration.',
        'namespace app::net::http is the compact form.',
      ],
      concepts: ['nested-namespace', 'C++17', 'scope-resolution'],
    },
    {
      id: 'cpp-ns-4',
      title: 'Inline Namespace',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to make v2 the default version accessible without full qualification.',
      skeleton: `namespace mylib {
    ___ namespace v2 {
        int compute(int x) { return x * 2; }
    }
    namespace v1 {
        int compute(int x) { return x + 1; }
    }
}

int main() {
    int a = mylib::compute(5);      // uses v2: returns 10
    int b = mylib::v1::compute(5);  // uses v1: returns 6
    return 0;
}`,
      solution: `namespace mylib {
    inline namespace v2 {
        int compute(int x) { return x * 2; }
    }
    namespace v1 {
        int compute(int x) { return x + 1; }
    }
}

int main() {
    int a = mylib::compute(5);      // uses v2: returns 10
    int b = mylib::v1::compute(5);  // uses v1: returns 6
    return 0;
}`,
      hints: [
        'This keyword makes namespace members accessible from the parent.',
        'It is used for API versioning.',
        'inline namespace makes the contents visible in the enclosing namespace.',
      ],
      concepts: ['inline-namespace', 'versioning', 'API-design'],
    },
    {
      id: 'cpp-ns-5',
      title: 'Anonymous Namespace',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to create an anonymous namespace for internal linkage.',
      skeleton: `#include <iostream>

___ {
    int internal_count = 0;
    void increment() { ++internal_count; }
}

int main() {
    increment();
    increment();
    std::cout << internal_count << std::endl; // prints 2
    return 0;
}`,
      solution: `#include <iostream>

namespace {
    int internal_count = 0;
    void increment() { ++internal_count; }
}

int main() {
    increment();
    increment();
    std::cout << internal_count << std::endl; // prints 2
    return 0;
}`,
      hints: [
        'An anonymous namespace has no name.',
        'Its contents have internal linkage, similar to static.',
        'namespace { ... } creates the anonymous namespace.',
      ],
      concepts: ['anonymous-namespace', 'internal-linkage', 'file-scope'],
    },
    {
      id: 'cpp-ns-6',
      title: 'Namespace Alias',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to create a shorter alias for a long namespace name.',
      skeleton: `namespace very_long_library_name {
    namespace detail {
        void helper() {}
    }
}

___ vll = very_long_library_name::detail;

int main() {
    vll::helper();
    return 0;
}`,
      solution: `namespace very_long_library_name {
    namespace detail {
        void helper() {}
    }
}

namespace vll = very_long_library_name::detail;

int main() {
    vll::helper();
    return 0;
}`,
      hints: [
        'You can create a shorter name for a namespace.',
        'The syntax is similar to variable assignment.',
        'namespace alias = qualified::namespace::name;',
      ],
      concepts: ['namespace-alias', 'convenience', 'scope-resolution'],
    },
    {
      id: 'cpp-ns-7',
      title: 'Write a Namespace with Related Functions',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a namespace called string_utils containing functions to_upper and to_lower that transform a string.',
      skeleton: `#include <string>
#include <algorithm>
#include <cctype>

// Write namespace string_utils with:
// - to_upper(std::string s) -> returns uppercase version
// - to_lower(std::string s) -> returns lowercase version
`,
      solution: `#include <string>
#include <algorithm>
#include <cctype>

namespace string_utils {
    std::string to_upper(std::string s) {
        std::transform(s.begin(), s.end(), s.begin(),
            [](unsigned char c) { return std::toupper(c); });
        return s;
    }

    std::string to_lower(std::string s) {
        std::transform(s.begin(), s.end(), s.begin(),
            [](unsigned char c) { return std::tolower(c); });
        return s;
    }
}`,
      hints: [
        'Wrap both functions inside namespace string_utils { ... }.',
        'Use std::transform with std::toupper/std::tolower.',
        'Cast to unsigned char to avoid undefined behavior.',
      ],
      concepts: ['namespace', 'string-transformation', 'std::transform'],
    },
    {
      id: 'cpp-ns-8',
      title: 'Write a Versioned Namespace',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a library namespace with v1 and v2 sub-namespaces, where v2 is the default (inline).',
      skeleton: `// Write namespace "codec" with:
// - v1::encode(int x) returns x + 1
// - v2::encode(int x) returns x * 2 (make v2 inline/default)
// codec::encode(5) should use v2 and return 10
`,
      solution: `namespace codec {
    namespace v1 {
        int encode(int x) { return x + 1; }
    }

    inline namespace v2 {
        int encode(int x) { return x * 2; }
    }
}`,
      hints: [
        'Use inline on the v2 namespace to make it the default.',
        'codec::encode will resolve to the inline namespace.',
        'codec::v1::encode is still accessible explicitly.',
      ],
      concepts: ['inline-namespace', 'versioning', 'API-evolution'],
    },
    {
      id: 'cpp-ns-9',
      title: 'Write ADL-Friendly swap',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a class in a namespace with a friend swap function that works with Argument-Dependent Lookup (ADL).',
      skeleton: `#include <utility>

// Write namespace shapes with a class Point (int x, y).
// Provide a friend swap function inside the namespace
// so that unqualified swap(a, b) finds it via ADL.
`,
      solution: `#include <utility>

namespace shapes {
    class Point {
    public:
        int x, y;
        Point(int x, int y) : x(x), y(y) {}

        friend void swap(Point& a, Point& b) noexcept {
            std::swap(a.x, b.x);
            std::swap(a.y, b.y);
        }
    };
}`,
      hints: [
        'Define swap as a friend function inside the class.',
        'This places it in the shapes namespace for ADL.',
        'Mark it noexcept since swapping ints cannot throw.',
      ],
      concepts: ['ADL', 'friend-swap', 'namespace-lookup'],
    },
    {
      id: 'cpp-ns-10',
      title: 'Write a Namespace Extension',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write code that extends an existing namespace by adding a new function in a separate declaration block.',
      skeleton: `namespace math {
    double add(double a, double b) { return a + b; }
}

// Extend the math namespace with a subtract function
// without modifying the original declaration above.
`,
      solution: `namespace math {
    double add(double a, double b) { return a + b; }
}

namespace math {
    double subtract(double a, double b) { return a - b; }
}`,
      hints: [
        'Namespaces are open and can be extended across multiple declarations.',
        'Just open the same namespace name again.',
        'namespace math { ... } can appear multiple times.',
      ],
      concepts: ['namespace-extension', 'open-namespace', 'multiple-declarations'],
    },
    {
      id: 'cpp-ns-11',
      title: 'Write a Namespace with Type and Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a namespace containing a struct and functions that operate on it.',
      skeleton: `#include <string>
#include <vector>

// Write namespace config with:
// - struct Entry { std::string key; std::string value; }
// - Entry make_entry(string key, string value)
// - std::string find_value(const vector<Entry>& entries, const string& key)
//   returns the value for the key, or "" if not found
`,
      solution: `#include <string>
#include <vector>

namespace config {
    struct Entry {
        std::string key;
        std::string value;
    };

    Entry make_entry(std::string key, std::string value) {
        return Entry{std::move(key), std::move(value)};
    }

    std::string find_value(const std::vector<Entry>& entries,
                           const std::string& key) {
        for (const auto& e : entries) {
            if (e.key == key) return e.value;
        }
        return "";
    }
}`,
      hints: [
        'Place the struct and both functions inside the namespace.',
        'Use move semantics for the string parameters in make_entry.',
        'Linear search through entries to find the key.',
      ],
      concepts: ['namespace', 'struct', 'encapsulation'],
    },
    {
      id: 'cpp-ns-12',
      title: 'Write Nested Namespace Utilities',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write nested namespaces using C++17 syntax for a logging library.',
      skeleton: `#include <string>
#include <iostream>

// Write namespace logging::formatters with:
// - std::string timestamp(const std::string& msg) -> "[TIME] " + msg
// - std::string level(const std::string& lvl, const std::string& msg)
//   -> "[" + lvl + "] " + msg
// Use C++17 nested namespace syntax
`,
      solution: `#include <string>
#include <iostream>

namespace logging::formatters {
    std::string timestamp(const std::string& msg) {
        return "[TIME] " + msg;
    }

    std::string level(const std::string& lvl, const std::string& msg) {
        return "[" + lvl + "] " + msg;
    }
}`,
      hints: [
        'C++17 allows namespace a::b::c { } syntax.',
        'Use simple string concatenation for the formatting.',
        'namespace logging::formatters { ... } is the declaration.',
      ],
      concepts: ['nested-namespace', 'C++17', 'string-formatting'],
    },
    {
      id: 'cpp-ns-13',
      title: 'Fix using namespace in Header',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the bug where using namespace std in a header pollutes all including files.',
      skeleton: `// header.h
#pragma once
#include <string>
#include <vector>
using namespace std; // Bug: pollutes all files that include this!

vector<string> get_names();

// main.cpp
// #include "header.h"
// Now std is injected into every file that includes header.h`,
      solution: `// header.h
#pragma once
#include <string>
#include <vector>

std::vector<std::string> get_names();

// main.cpp
// #include "header.h"
// No namespace pollution - callers choose their own using declarations`,
      hints: [
        'Never put using namespace in a header file.',
        'It forces the namespace on all including translation units.',
        'Use fully qualified names (std::vector, std::string) in headers.',
      ],
      concepts: ['using-directive', 'header-pollution', 'best-practice'],
    },
    {
      id: 'cpp-ns-14',
      title: 'Fix Ambiguous Name',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the ambiguous function call caused by two namespaces with the same function name.',
      skeleton: `namespace graphics {
    void draw(int x) {}
}

namespace audio {
    void draw(int x) {}
}

using namespace graphics;
using namespace audio;

int main() {
    draw(5); // Bug: ambiguous! Which draw?
    return 0;
}`,
      solution: `namespace graphics {
    void draw(int x) {}
}

namespace audio {
    void draw(int x) {}
}

int main() {
    graphics::draw(5); // explicit qualification
    return 0;
}`,
      hints: [
        'Two using directives introduced conflicting names.',
        'Use explicit qualification to resolve the ambiguity.',
        'graphics::draw(5) or audio::draw(5) is unambiguous.',
      ],
      concepts: ['ambiguity', 'name-collision', 'qualification'],
    },
    {
      id: 'cpp-ns-15',
      title: 'Fix Missing Namespace Qualification',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the compilation error where the function definition does not match the namespace declaration.',
      skeleton: `namespace utils {
    int square(int x);
}

// Bug: defined outside namespace without qualification
int square(int x) {
    return x * x;
}

int main() {
    int r = utils::square(5); // linker error!
    return 0;
}`,
      solution: `namespace utils {
    int square(int x);
}

int utils::square(int x) {
    return x * x;
}

int main() {
    int r = utils::square(5); // works!
    return 0;
}`,
      hints: [
        'The definition must be qualified with the namespace name.',
        'Or define inside the namespace block.',
        'utils::square(int x) qualifies the definition.',
      ],
      concepts: ['namespace-qualification', 'declaration-definition', 'linker-error'],
    },
    {
      id: 'cpp-ns-16',
      title: 'Predict Namespace Lookup',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Predict which function is called based on namespace lookup rules.',
      skeleton: `#include <iostream>

namespace A {
    void greet() { std::cout << "A "; }
}

namespace B {
    void greet() { std::cout << "B "; }
}

int main() {
    A::greet();
    B::greet();
    A::greet();
    std::cout << std::endl;
    return 0;
}`,
      solution: `A B A`,
      hints: [
        'Each call is fully qualified with the namespace.',
        'A::greet() always calls the A version.',
        'B::greet() always calls the B version.',
      ],
      concepts: ['scope-resolution', 'qualified-name', 'namespace'],
    },
    {
      id: 'cpp-ns-17',
      title: 'Predict Inline Namespace Resolution',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict which version is called through the parent namespace.',
      skeleton: `#include <iostream>

namespace lib {
    namespace v1 {
        int value() { return 1; }
    }
    inline namespace v2 {
        int value() { return 2; }
    }
}

int main() {
    std::cout << lib::v1::value() << " ";
    std::cout << lib::v2::value() << " ";
    std::cout << lib::value() << std::endl;
    return 0;
}`,
      solution: `1 2 2`,
      hints: [
        'lib::v1::value() explicitly calls v1, returning 1.',
        'lib::v2::value() explicitly calls v2, returning 2.',
        'lib::value() resolves to the inline namespace v2, returning 2.',
      ],
      concepts: ['inline-namespace', 'name-resolution', 'versioning'],
    },
    {
      id: 'cpp-ns-18',
      title: 'Predict ADL Resolution',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Predict which function is called through Argument-Dependent Lookup.',
      skeleton: `#include <iostream>

namespace N {
    struct S {};
    void process(S) { std::cout << "N::process" << std::endl; }
}

void process(N::S) { std::cout << "::process" << std::endl; }

int main() {
    N::S obj;
    process(obj); // Which one?
    return 0;
}`,
      solution: `This code does not compile due to ambiguity. Both N::process and ::process are found.`,
      hints: [
        'ADL adds N::process to the candidate set because S is in namespace N.',
        'The global ::process is also a candidate because it is in scope.',
        'Both are equally good matches, causing an ambiguity error.',
      ],
      concepts: ['ADL', 'argument-dependent-lookup', 'ambiguity'],
    },
    {
      id: 'cpp-ns-19',
      title: 'Refactor Global Functions to Namespace',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Refactor these global utility functions into a properly namespaced module.',
      skeleton: `#include <cmath>

double distance(double x1, double y1, double x2, double y2) {
    double dx = x2 - x1;
    double dy = y2 - y1;
    return std::sqrt(dx * dx + dy * dy);
}

double midpoint_x(double x1, double x2) {
    return (x1 + x2) / 2.0;
}

double midpoint_y(double y1, double y2) {
    return (y1 + y2) / 2.0;
}`,
      solution: `#include <cmath>

namespace geometry {
    double distance(double x1, double y1, double x2, double y2) {
        double dx = x2 - x1;
        double dy = y2 - y1;
        return std::sqrt(dx * dx + dy * dy);
    }

    double midpoint_x(double x1, double x2) {
        return (x1 + x2) / 2.0;
    }

    double midpoint_y(double y1, double y2) {
        return (y1 + y2) / 2.0;
    }
}`,
      hints: [
        'Wrap all related functions in a namespace block.',
        'Choose a descriptive namespace name for the domain.',
        'This prevents name collisions with other code.',
      ],
      concepts: ['namespace', 'organization', 'refactoring'],
    },
    {
      id: 'cpp-ns-20',
      title: 'Refactor using-namespace to Qualified Names',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor the code to remove using namespace std and use qualified names instead.',
      skeleton: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

void print_sorted(vector<string> words) {
    sort(words.begin(), words.end());
    for (const auto& w : words) {
        cout << w << endl;
    }
}`,
      solution: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

void print_sorted(std::vector<std::string> words) {
    std::sort(words.begin(), words.end());
    for (const auto& w : words) {
        std::cout << w << std::endl;
    }
}`,
      hints: [
        'Remove the using namespace std; directive.',
        'Prefix all standard library names with std::.',
        'This is the recommended practice to avoid name collisions.',
      ],
      concepts: ['qualified-names', 'best-practice', 'using-directive'],
    },
  ],
};
