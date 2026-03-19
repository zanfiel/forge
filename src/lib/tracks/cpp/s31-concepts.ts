import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-concepts',
  title: '31. Concepts',
  explanation: `## Concepts in C++\n\nC++20 introduces **concepts**, a mechanism to constrain template parameters at compile time. Concepts replace clunky SFINAE hacks with clean, readable syntax.\n\n### Defining a Concept\n\n\`\`\`cpp\ntemplate<typename T>\nconcept Addable = requires(T a, T b) {\n    { a + b } -> std::convertible_to<T>;\n};\n\ntemplate<Addable T>\nT add(T a, T b) { return a + b; }\n\`\`\`\n\n### Requires Expressions\n\nA requires expression checks whether a set of operations are valid:\n\n\`\`\`cpp\ntemplate<typename T>\nconcept Printable = requires(T x, std::ostream& os) {\n    { os << x } -> std::same_as<std::ostream&>;\n};\n\`\`\`\n\n### Standard Concepts\n\nThe \`<concepts>\` header provides built-in concepts like \`std::integral\`, \`std::floating_point\`, \`std::same_as\`, \`std::derived_from\`, \`std::convertible_to\`, and many more.\n\n### Conjunction and Disjunction\n\nConcepts can be combined with \`&&\` (conjunction) and \`||\` (disjunction):\n\n\`\`\`cpp\ntemplate<typename T>\nconcept SignedNumber = std::integral<T> && std::signed_integral<T>;\n\ntemplate<typename T>\nconcept Number = std::integral<T> || std::floating_point<T>;\n\`\`\`\n\n### Constrained Auto\n\n\`\`\`cpp\nvoid print(std::integral auto value) {\n    std::cout << value << '\\n';\n}\n\`\`\``,
  exercises: [
    {
      id: 'cpp-concepts-1',
      title: 'Define a Basic Concept',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to define a concept that checks if a type is addable.',
      skeleton: `#include <concepts>

template<typename T>
concept Addable = ___(T a, T b) {
    { a + b } -> std::convertible_to<T>;
};`,
      solution: `#include <concepts>

template<typename T>
concept Addable = requires(T a, T b) {
    { a + b } -> std::convertible_to<T>;
};`,
      hints: [
        'A requires expression begins with the keyword "requires".',
        'The syntax is: requires(parameters) { requirements; };',
        'Fill in "requires" to introduce the requires expression.',
      ],
      concepts: ['concepts', 'requires-expression'],
    },
    {
      id: 'cpp-concepts-2',
      title: 'Use a Concept as a Constraint',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to constrain the template parameter with std::integral.',
      skeleton: `#include <concepts>
#include <iostream>

template<___ T>
T double_it(T x) { return x * 2; }

int main() {
    std::cout << double_it(5) << std::endl; // 10
}`,
      solution: `#include <concepts>
#include <iostream>

template<std::integral T>
T double_it(T x) { return x * 2; }

int main() {
    std::cout << double_it(5) << std::endl; // 10
}`,
      hints: [
        'Replace typename with a concept name to constrain T.',
        'std::integral constrains T to integer types.',
        'Write std::integral in place of typename.',
      ],
      concepts: ['concepts', 'template-constraints'],
    },
    {
      id: 'cpp-concepts-3',
      title: 'Requires Clause on a Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to add a trailing requires clause.',
      skeleton: `#include <concepts>
#include <iostream>

template<typename T>
T negate(T x) ___ (std::signed_integral<T>) {
    return -x;
}

int main() {
    std::cout << negate(-7) << std::endl; // 7
}`,
      solution: `#include <concepts>
#include <iostream>

template<typename T>
T negate(T x) requires (std::signed_integral<T>) {
    return -x;
}

int main() {
    std::cout << negate(-7) << std::endl; // 7
}`,
      hints: [
        'A trailing requires clause comes after the function parameters.',
        'The keyword is "requires" followed by a constraint expression.',
        'Fill in "requires" before the parenthesized concept check.',
      ],
      concepts: ['concepts', 'requires-clause'],
    },
    {
      id: 'cpp-concepts-4',
      title: 'Concept Conjunction',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to create a concept that is the conjunction of two constraints.',
      skeleton: `#include <concepts>

template<typename T>
concept SignedInteger = std::integral<T> ___ std::signed_integral<T>;`,
      solution: `#include <concepts>

template<typename T>
concept SignedInteger = std::integral<T> && std::signed_integral<T>;`,
      hints: [
        'Conjunction means both constraints must be true.',
        'Use the logical AND operator.',
        'In C++, conjunction of concepts uses &&.',
      ],
      concepts: ['concepts', 'concept-conjunction'],
    },
    {
      id: 'cpp-concepts-5',
      title: 'Constrained Auto Parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to use constrained auto with std::floating_point.',
      skeleton: `#include <concepts>
#include <iostream>

void print_float(___ auto value) {
    std::cout << value << std::endl;
}

int main() {
    print_float(3.14);  // OK
    // print_float(42); // Would not compile
}`,
      solution: `#include <concepts>
#include <iostream>

void print_float(std::floating_point auto value) {
    std::cout << value << std::endl;
}

int main() {
    print_float(3.14);  // OK
    // print_float(42); // Would not compile
}`,
      hints: [
        'Constrained auto uses a concept name before the auto keyword.',
        'std::floating_point restricts to float, double, long double.',
        'Write std::floating_point before auto.',
      ],
      concepts: ['concepts', 'constrained-auto'],
    },
    {
      id: 'cpp-concepts-6',
      title: 'Nested Requires Expression',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to add a nested requirement checking that T is default constructible.',
      skeleton: `#include <concepts>

template<typename T>
concept Resetable = requires(T x) {
    { x.reset() } -> std::same_as<void>;
    ___ { T{}; };
};`,
      solution: `#include <concepts>

template<typename T>
concept Resetable = requires(T x) {
    { x.reset() } -> std::same_as<void>;
    requires { T{}; };
};`,
      hints: [
        'Nested requirements use the requires keyword inside a requires expression.',
        'This checks an additional compile-time condition.',
        'Write "requires" to introduce a nested requirement.',
      ],
      concepts: ['concepts', 'nested-requires'],
    },
    {
      id: 'cpp-concepts-7',
      title: 'Write a Hashable Concept',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a concept called Hashable that checks if std::hash<T>{}(val) is valid and returns std::size_t.',
      skeleton: `#include <concepts>
#include <functional>

// Write the Hashable concept here

static_assert(Hashable<int>);
static_assert(Hashable<std::string>);`,
      solution: `#include <concepts>
#include <functional>

template<typename T>
concept Hashable = requires(T val) {
    { std::hash<T>{}(val) } -> std::convertible_to<std::size_t>;
};

static_assert(Hashable<int>);
static_assert(Hashable<std::string>);`,
      hints: [
        'Define a concept with template<typename T> concept Hashable = ...',
        'Use a requires expression to check the hash operation.',
        'The return type constraint uses -> std::convertible_to<std::size_t>.',
      ],
      concepts: ['concepts', 'requires-expression', 'std-hash'],
    },
    {
      id: 'cpp-concepts-8',
      title: 'Write a Container Concept',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a concept called Container that requires begin(), end(), and size() member functions.',
      skeleton: `#include <concepts>
#include <vector>
#include <string>

// Write the Container concept here

static_assert(Container<std::vector<int>>);
static_assert(Container<std::string>);`,
      solution: `#include <concepts>
#include <vector>
#include <string>

template<typename T>
concept Container = requires(T c) {
    c.begin();
    c.end();
    { c.size() } -> std::convertible_to<std::size_t>;
};

static_assert(Container<std::vector<int>>);
static_assert(Container<std::string>);`,
      hints: [
        'Use a requires expression with a parameter of type T.',
        'Simple requirements just list the expression: c.begin();',
        'Compound requirements check the return type: { c.size() } -> ...',
      ],
      concepts: ['concepts', 'requires-expression', 'compound-requirements'],
    },
    {
      id: 'cpp-concepts-9',
      title: 'Write a Constrained max Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a function template max_val constrained with std::totally_ordered that returns the larger of two values.',
      skeleton: `#include <concepts>
#include <iostream>

// Write max_val here

int main() {
    std::cout << max_val(3, 7) << std::endl;       // 7
    std::cout << max_val(5.5, 2.1) << std::endl;   // 5.5
}`,
      solution: `#include <concepts>
#include <iostream>

template<std::totally_ordered T>
T max_val(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    std::cout << max_val(3, 7) << std::endl;       // 7
    std::cout << max_val(5.5, 2.1) << std::endl;   // 5.5
}`,
      hints: [
        'Use std::totally_ordered as the constraint on the template parameter.',
        'template<std::totally_ordered T> replaces template<typename T>.',
        'The function body is a simple comparison returning the larger value.',
      ],
      concepts: ['concepts', 'std-totally-ordered'],
    },
    {
      id: 'cpp-concepts-10',
      title: 'Write a Concept with Multiple Requirements',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a concept Arithmetic that requires T supports +, -, *, / with another T, and is copy constructible.',
      skeleton: `#include <concepts>

// Write the Arithmetic concept here

static_assert(Arithmetic<int>);
static_assert(Arithmetic<double>);`,
      solution: `#include <concepts>

template<typename T>
concept Arithmetic = std::copy_constructible<T> && requires(T a, T b) {
    { a + b } -> std::convertible_to<T>;
    { a - b } -> std::convertible_to<T>;
    { a * b } -> std::convertible_to<T>;
    { a / b } -> std::convertible_to<T>;
};

static_assert(Arithmetic<int>);
static_assert(Arithmetic<double>);`,
      hints: [
        'Combine std::copy_constructible<T> with a requires expression using &&.',
        'Each arithmetic operation is a compound requirement.',
        'Use -> std::convertible_to<T> for the return type check.',
      ],
      concepts: ['concepts', 'compound-requirements', 'concept-conjunction'],
    },
    {
      id: 'cpp-concepts-11',
      title: 'Write a Constrained Factory Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function make_default that returns a default-constructed T, constrained to types satisfying std::default_initializable.',
      skeleton: `#include <concepts>
#include <iostream>
#include <string>

// Write make_default here

int main() {
    auto i = make_default<int>();
    auto s = make_default<std::string>();
    std::cout << i << std::endl;     // 0
    std::cout << s.empty() << std::endl; // 1
}`,
      solution: `#include <concepts>
#include <iostream>
#include <string>

template<std::default_initializable T>
T make_default() {
    return T{};
}

int main() {
    auto i = make_default<int>();
    auto s = make_default<std::string>();
    std::cout << i << std::endl;     // 0
    std::cout << s.empty() << std::endl; // 1
}`,
      hints: [
        'Use std::default_initializable as the constraint on the template.',
        'The function takes no arguments and returns T{}.',
        'template<std::default_initializable T> T make_default() { ... }',
      ],
      concepts: ['concepts', 'std-default-initializable'],
    },
    {
      id: 'cpp-concepts-12',
      title: 'Write a Concept Using Disjunction',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a concept Number that accepts either integral or floating_point types, then write a function square using it.',
      skeleton: `#include <concepts>
#include <iostream>

// Write the Number concept and square function here

int main() {
    std::cout << square(5) << std::endl;    // 25
    std::cout << square(2.5) << std::endl;  // 6.25
}`,
      solution: `#include <concepts>
#include <iostream>

template<typename T>
concept Number = std::integral<T> || std::floating_point<T>;

template<Number T>
T square(T x) {
    return x * x;
}

int main() {
    std::cout << square(5) << std::endl;    // 25
    std::cout << square(2.5) << std::endl;  // 6.25
}`,
      hints: [
        'Use || to create a disjunction of two concepts.',
        'Number = std::integral<T> || std::floating_point<T>.',
        'Constrain square with template<Number T>.',
      ],
      concepts: ['concepts', 'concept-disjunction'],
    },
    {
      id: 'cpp-concepts-13',
      title: 'Fix the Broken Concept',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the concept definition so it compiles correctly.',
      skeleton: `#include <concepts>

template<typename T>
concept Printable = requires(T x) {
    std::cout << x -> std::same_as<std::ostream&>;
};`,
      solution: `#include <concepts>
#include <iostream>

template<typename T>
concept Printable = requires(T x) {
    { std::cout << x } -> std::same_as<std::ostream&>;
};`,
      hints: [
        'Compound requirements need curly braces around the expression.',
        'The syntax is { expression } -> constraint;',
        'Also make sure <iostream> is included for std::cout.',
      ],
      concepts: ['concepts', 'compound-requirements'],
    },
    {
      id: 'cpp-concepts-14',
      title: 'Fix Ambiguous Constraint',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the code so the concept constraint is applied correctly.',
      skeleton: `#include <concepts>
#include <iostream>

template<typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

template<typename T>
T half(T x) requires Numeric {
    return x / 2;
}

int main() {
    std::cout << half(10) << std::endl;
}`,
      solution: `#include <concepts>
#include <iostream>

template<typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

template<typename T>
T half(T x) requires Numeric<T> {
    return x / 2;
}

int main() {
    std::cout << half(10) << std::endl;
}`,
      hints: [
        'When using a concept in a requires clause, you must pass the template argument.',
        'Numeric alone is incomplete; it needs Numeric<T>.',
        'The trailing requires clause needs requires Numeric<T>.',
      ],
      concepts: ['concepts', 'requires-clause'],
    },
    {
      id: 'cpp-concepts-15',
      title: 'Fix the Subsumption Error',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fix the overload so the more constrained version is correctly preferred for integral types.',
      skeleton: `#include <concepts>
#include <iostream>

template<typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

template<typename T> requires Numeric<T>
std::string classify(T) { return "numeric"; }

template<typename T> requires (std::integral<T> || std::floating_point<T>)
std::string classify_int(T) { return "integral"; }

int main() {
    // We want one function "classify" that returns "integral" for ints
    // and "numeric" for floats
    std::cout << classify(42) << std::endl;
    std::cout << classify(3.14) << std::endl;
}`,
      solution: `#include <concepts>
#include <iostream>

template<typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

template<typename T> requires Numeric<T>
std::string classify(T) { return "numeric"; }

template<typename T> requires Numeric<T> && std::integral<T>
std::string classify(T) { return "integral"; }

int main() {
    // The more constrained overload is preferred for ints
    std::cout << classify(42) << std::endl;   // integral
    std::cout << classify(3.14) << std::endl; // numeric
}`,
      hints: [
        'Concept subsumption means a more constrained overload is preferred.',
        'The integral version must subsume the Numeric version.',
        'Add && std::integral<T> to make the second overload strictly more constrained.',
      ],
      concepts: ['concepts', 'subsumption', 'overload-resolution'],
    },
    {
      id: 'cpp-concepts-16',
      title: 'Predict Concept Check Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Predict what this program prints.',
      skeleton: `#include <concepts>
#include <iostream>

template<typename T>
concept Small = sizeof(T) <= 4;

template<typename T>
void check() {
    if constexpr (Small<T>) {
        std::cout << "small" << std::endl;
    } else {
        std::cout << "large" << std::endl;
    }
}

int main() {
    check<char>();
    check<double>();
    check<int>();
}`,
      solution: `small
large
small`,
      hints: [
        'sizeof(char) is 1, sizeof(double) is 8, sizeof(int) is 4.',
        'The concept Small checks if sizeof(T) <= 4.',
        'char (1) and int (4) are small; double (8) is large.',
      ],
      concepts: ['concepts', 'sizeof', 'if-constexpr'],
    },
    {
      id: 'cpp-concepts-17',
      title: 'Predict Constrained Overload Resolution',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict what this program prints.',
      skeleton: `#include <concepts>
#include <iostream>

void process(auto x) {
    std::cout << "generic" << std::endl;
}

void process(std::integral auto x) {
    std::cout << "integral" << std::endl;
}

void process(std::floating_point auto x) {
    std::cout << "float" << std::endl;
}

int main() {
    process(42);
    process(3.14);
    process("hello");
}`,
      solution: `integral
float
generic`,
      hints: [
        'The most constrained matching overload is selected.',
        '42 is int (integral), 3.14 is double (floating_point).',
        '"hello" is const char* which matches neither integral nor floating_point.',
      ],
      concepts: ['concepts', 'overload-resolution', 'constrained-auto'],
    },
    {
      id: 'cpp-concepts-18',
      title: 'Predict Requires Expression Evaluation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict what this program prints.',
      skeleton: `#include <concepts>
#include <iostream>
#include <string>

template<typename T>
concept HasLength = requires(T t) {
    { t.length() } -> std::convertible_to<std::size_t>;
};

template<typename T>
void info() {
    std::cout << HasLength<T> << std::endl;
}

int main() {
    info<std::string>();
    info<int>();
    info<std::vector<int>>();
}`,
      solution: `1
0
0`,
      hints: [
        'std::string has a .length() method returning size_t.',
        'int has no .length() method.',
        'std::vector has .size() but not .length().',
      ],
      concepts: ['concepts', 'requires-expression', 'concept-evaluation'],
    },
    {
      id: 'cpp-concepts-19',
      title: 'Refactor SFINAE to Concepts',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor the SFINAE-based constraint to use C++20 concepts instead.',
      skeleton: `#include <type_traits>
#include <iostream>

template<typename T, typename = std::enable_if_t<std::is_arithmetic_v<T>>>
T add(T a, T b) {
    return a + b;
}

int main() {
    std::cout << add(3, 4) << std::endl;
    std::cout << add(1.5, 2.5) << std::endl;
}`,
      solution: `#include <concepts>
#include <iostream>

template<typename T>
concept ArithmeticType = std::is_arithmetic_v<T>;

template<ArithmeticType T>
T add(T a, T b) {
    return a + b;
}

int main() {
    std::cout << add(3, 4) << std::endl;
    std::cout << add(1.5, 2.5) << std::endl;
}`,
      hints: [
        'Replace enable_if with a concept definition.',
        'Define a concept using std::is_arithmetic_v<T>.',
        'Use the concept name in place of typename in the template.',
      ],
      concepts: ['concepts', 'sfinae-replacement', 'refactoring'],
    },
    {
      id: 'cpp-concepts-20',
      title: 'Refactor to Use Standard Concepts',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor this code to use standard library concepts from <concepts> instead of manual type checks.',
      skeleton: `#include <type_traits>
#include <iostream>

template<typename T>
void print_if_integral(T val) {
    static_assert(std::is_integral_v<T>, "T must be integral");
    std::cout << val << std::endl;
}

template<typename From, typename To>
To convert(From f) {
    static_assert(std::is_convertible_v<From, To>, "Must be convertible");
    return static_cast<To>(f);
}

int main() {
    print_if_integral(42);
    double d = convert<int, double>(10);
    std::cout << d << std::endl;
}`,
      solution: `#include <concepts>
#include <iostream>

void print_if_integral(std::integral auto val) {
    std::cout << val << std::endl;
}

template<typename From, typename To>
    requires std::convertible_to<From, To>
To convert(From f) {
    return static_cast<To>(f);
}

int main() {
    print_if_integral(42);
    double d = convert<int, double>(10);
    std::cout << d << std::endl;
}`,
      hints: [
        'std::is_integral_v<T> becomes std::integral auto or std::integral<T>.',
        'std::is_convertible_v becomes std::convertible_to concept.',
        'Use constrained auto or requires clauses instead of static_assert.',
      ],
      concepts: ['concepts', 'standard-concepts', 'refactoring'],
    },
  ],
};
