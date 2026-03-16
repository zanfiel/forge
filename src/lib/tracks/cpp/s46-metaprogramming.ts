import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-meta',
  title: '46. Metaprogramming',
  explanation: `## Metaprogramming in C++

Template metaprogramming (TMP) performs computation at compile time using the type system and templates.

### constexpr if (C++17)
Compile-time branching that discards the false branch entirely:
\`\`\`cpp
template <typename T>
auto convert(T val) {
    if constexpr (std::is_integral_v<T>) {
        return static_cast<double>(val);
    } else {
        return val;
    }
}
\`\`\`

### Compile-Time Values with constexpr
\`\`\`cpp
constexpr int factorial(int n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}
static_assert(factorial(5) == 120);
\`\`\`

### Template Metaprogramming (Classic)
Compute at compile time using template specialization:
\`\`\`cpp
template <int N>
struct Fibonacci {
    static constexpr int value = Fibonacci<N-1>::value + Fibonacci<N-2>::value;
};
template <> struct Fibonacci<0> { static constexpr int value = 0; };
template <> struct Fibonacci<1> { static constexpr int value = 1; };
\`\`\`

### Type Traits
\`<type_traits>\` provides compile-time type queries:
- \`std::is_integral_v<T>\`, \`std::is_floating_point_v<T>\`
- \`std::is_same_v<T, U>\`, \`std::is_base_of_v<Base, Derived>\`
- \`std::remove_const_t<T>\`, \`std::decay_t<T>\`

### static_assert
Compile-time assertion:
\`\`\`cpp
static_assert(sizeof(int) == 4, "int must be 4 bytes");
\`\`\`

### Fold Expressions (C++17)
\`\`\`cpp
template <typename... Args>
auto sum(Args... args) {
    return (args + ...);  // right fold
}
\`\`\`
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-meta-1',
      title: 'constexpr function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the keyword that allows this function to be evaluated at compile time.',
      skeleton: `__BLANK__ int square(int x) {
    return x * x;
}

static_assert(square(5) == 25);`,
      solution: `constexpr int square(int x) {
    return x * x;
}

static_assert(square(5) == 25);`,
      hints: [
        'This keyword allows a function to run at compile time.',
        'The result can be used in static_assert or template parameters.',
        'The keyword is `constexpr`.',
      ],
      concepts: ['constexpr', 'compile-time'],
    },
    {
      id: 'cpp-meta-2',
      title: 'static_assert',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the compile-time assertion keyword.',
      skeleton: `#include <type_traits>

template <typename T>
void only_integral(T val) {
    __BLANK__(std::is_integral_v<T>, "T must be an integer type");
}`,
      solution: `#include <type_traits>

template <typename T>
void only_integral(T val) {
    static_assert(std::is_integral_v<T>, "T must be an integer type");
}`,
      hints: [
        'This asserts a condition at compile time, not runtime.',
        'It produces a compilation error with a message if the condition is false.',
        'The keyword is `static_assert`.',
      ],
      concepts: ['static-assert', 'type-traits'],
    },
    {
      id: 'cpp-meta-3',
      title: 'constexpr if',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the compile-time conditional syntax.',
      skeleton: `#include <type_traits>
#include <string>

template <typename T>
std::string describe() {
    if __BLANK__ (std::is_integral_v<T>) {
        return "integer";
    } else {
        return "other";
    }
}`,
      solution: `#include <type_traits>
#include <string>

template <typename T>
std::string describe() {
    if constexpr (std::is_integral_v<T>) {
        return "integer";
    } else {
        return "other";
    }
}`,
      hints: [
        'This C++17 feature evaluates the condition at compile time.',
        'The false branch is discarded entirely -- it does not need to compile.',
        'Add `constexpr` after `if`.',
      ],
      concepts: ['constexpr-if', 'compile-time-branching'],
    },
    {
      id: 'cpp-meta-4',
      title: 'Type trait check',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the type trait to check if two types are the same.',
      skeleton: `#include <type_traits>

template <typename A, typename B>
constexpr bool same = std::__BLANK__<A, B>;`,
      solution: `#include <type_traits>

template <typename A, typename B>
constexpr bool same = std::is_same_v<A, B>;`,
      hints: [
        'This type trait returns true if A and B are exactly the same type.',
        'The _v suffix gives the value directly.',
        'The trait is `is_same_v`.',
      ],
      concepts: ['is-same', 'type-traits'],
    },
    {
      id: 'cpp-meta-5',
      title: 'Fold expression sum',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the fold expression to sum all arguments.',
      skeleton: `template <typename... Args>
auto sum(Args... args) {
    return (__BLANK__);
}
// sum(1, 2, 3) == 6`,
      solution: `template <typename... Args>
auto sum(Args... args) {
    return (args + ...);
}
// sum(1, 2, 3) == 6`,
      hints: [
        'A fold expression applies an operator across a parameter pack.',
        'Right fold: (pack op ...)',
        'The expression is `args + ...`.',
      ],
      concepts: ['fold-expression', 'parameter-pack'],
    },
    {
      id: 'cpp-meta-6',
      title: 'Remove const from type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the type transformation that removes const.',
      skeleton: `#include <type_traits>

using T = const int;
using U = std::__BLANK__<T>;
static_assert(std::is_same_v<U, int>);`,
      solution: `#include <type_traits>

using T = const int;
using U = std::remove_const_t<T>;
static_assert(std::is_same_v<U, int>);`,
      hints: [
        'This type trait strips the const qualifier from a type.',
        'The _t suffix gives the resulting type directly.',
        'The trait is `remove_const_t`.',
      ],
      concepts: ['remove-const', 'type-transformation'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-meta-7',
      title: 'Compile-time factorial',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a constexpr function that computes factorial at compile time. Validate with static_assert.',
      skeleton: `// TODO: write constexpr factorial(int n)
// static_assert(factorial(6) == 720);`,
      solution: `constexpr int factorial(int n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}
static_assert(factorial(6) == 720);`,
      hints: [
        'Mark the function constexpr so it can run at compile time.',
        'Use recursion or a loop (C++14+ allows loops in constexpr).',
        'Base case: n <= 1 returns 1.',
      ],
      concepts: ['constexpr', 'recursion', 'compile-time'],
    },
    {
      id: 'cpp-meta-8',
      title: 'Template Fibonacci struct',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a template struct Fib<N> that computes Fibonacci numbers at compile time using template specialization.',
      skeleton: `// TODO: primary template Fib<N>
// TODO: specializations Fib<0> and Fib<1>
// static_assert(Fib<10>::value == 55);`,
      solution: `template <int N>
struct Fib {
    static constexpr int value = Fib<N-1>::value + Fib<N-2>::value;
};

template <>
struct Fib<0> {
    static constexpr int value = 0;
};

template <>
struct Fib<1> {
    static constexpr int value = 1;
};

static_assert(Fib<10>::value == 55);`,
      hints: [
        'Primary template: Fib<N>::value = Fib<N-1>::value + Fib<N-2>::value.',
        'Specialize Fib<0> with value = 0 and Fib<1> with value = 1.',
        'These are base cases that stop the recursive instantiation.',
      ],
      concepts: ['template-metaprogramming', 'specialization', 'fibonacci'],
    },
    {
      id: 'cpp-meta-9',
      title: 'Type-safe print with constexpr if',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a template function print_type(T val) that uses constexpr if to print "int: X" for integers, "float: X" for floating point, and "other" for everything else.',
      skeleton: `#include <iostream>
#include <type_traits>

template <typename T>
void print_type(T val) {
    // TODO: use if constexpr to branch on type
}`,
      solution: `#include <iostream>
#include <type_traits>

template <typename T>
void print_type(T val) {
    if constexpr (std::is_integral_v<T>) {
        std::cout << "int: " << val << "\\n";
    } else if constexpr (std::is_floating_point_v<T>) {
        std::cout << "float: " << val << "\\n";
    } else {
        std::cout << "other\\n";
    }
}`,
      hints: [
        'Use if constexpr with type traits for compile-time branching.',
        'std::is_integral_v and std::is_floating_point_v check the type category.',
        'Each branch only needs to compile for its matching types.',
      ],
      concepts: ['constexpr-if', 'type-traits', 'compile-time-branching'],
    },
    {
      id: 'cpp-meta-10',
      title: 'Variadic print with fold',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a variadic template function print_all(args...) that prints each argument separated by spaces using a fold expression.',
      skeleton: `#include <iostream>

// TODO: write print_all using a fold expression
// print_all(1, "hello", 3.14);  // "1 hello 3.14\\n"`,
      solution: `#include <iostream>

template <typename... Args>
void print_all(Args&&... args) {
    ((std::cout << args << ' '), ...);
    std::cout << '\\n';
}`,
      hints: [
        'Use a comma fold expression: ((expr), ...)',
        'Each element of the pack is printed followed by a space.',
        'The comma operator sequences the expressions left to right.',
      ],
      concepts: ['fold-expression', 'variadic-template', 'parameter-pack'],
    },
    {
      id: 'cpp-meta-11',
      title: 'enable_if constraint',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function template absolute(T val) that is only enabled for arithmetic types using std::enable_if.',
      skeleton: `#include <type_traits>

// TODO: write absolute() enabled only for arithmetic types`,
      solution: `#include <type_traits>

template <typename T>
std::enable_if_t<std::is_arithmetic_v<T>, T>
absolute(T val) {
    return val < 0 ? -val : val;
}`,
      hints: [
        'std::enable_if_t<condition, ReturnType> removes the function from overload resolution if condition is false.',
        'std::is_arithmetic_v<T> is true for integral and floating-point types.',
        'Place enable_if_t as the return type.',
      ],
      concepts: ['enable-if', 'sfinae', 'type-traits'],
    },
    {
      id: 'cpp-meta-12',
      title: 'Compile-time type list size',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a template TypeList<Ts...> with a static constexpr member size equal to the number of types. Use sizeof...(Ts).',
      skeleton: `// TODO: TypeList with size member
// static_assert(TypeList<int, double, char>::size == 3);`,
      solution: `template <typename... Ts>
struct TypeList {
    static constexpr std::size_t size = sizeof...(Ts);
};

static_assert(TypeList<int, double, char>::size == 3);`,
      hints: [
        'sizeof...(Ts) returns the number of types in a parameter pack at compile time.',
        'Store it as a static constexpr member.',
        'TypeList is a variadic template struct.',
      ],
      concepts: ['type-list', 'sizeof-pack', 'variadic-template'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-meta-13',
      title: 'Fix missing template specialization base case',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the recursive template that causes infinite instantiation because the base case is missing.',
      skeleton: `template <int N>
struct Power2 {
    static constexpr int value = 2 * Power2<N-1>::value;
};
// BUG: no base case -- infinite recursion at compile time

static_assert(Power2<3>::value == 8);`,
      solution: `template <int N>
struct Power2 {
    static constexpr int value = 2 * Power2<N-1>::value;
};

template <>
struct Power2<0> {
    static constexpr int value = 1;
};

static_assert(Power2<3>::value == 8);`,
      hints: [
        'Template recursion needs a base case specialization to stop.',
        'Power2<0> should have value = 1 (2^0 = 1).',
        'Add template <> struct Power2<0> { ... };',
      ],
      concepts: ['template-specialization', 'base-case', 'infinite-instantiation'],
    },
    {
      id: 'cpp-meta-14',
      title: 'Fix constexpr function with runtime-only operation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the constexpr function that uses a non-constexpr operation (dynamic allocation) preventing compile-time evaluation.',
      skeleton: `#include <vector>

constexpr int count_evens(const int* arr, int n) {
    std::vector<int> evens;  // BUG: not constexpr-friendly before C++20
    for (int i = 0; i < n; ++i)
        if (arr[i] % 2 == 0) evens.push_back(arr[i]);
    return evens.size();
}`,
      solution: `constexpr int count_evens(const int* arr, int n) {
    int count = 0;
    for (int i = 0; i < n; ++i) {
        if (arr[i] % 2 == 0) ++count;
    }
    return count;
}`,
      hints: [
        'std::vector uses heap allocation, not available in constexpr (pre-C++20).',
        'You do not need to store the evens -- just count them.',
        'Use a plain int counter instead of a vector.',
      ],
      concepts: ['constexpr', 'compile-time-constraints'],
    },
    {
      id: 'cpp-meta-15',
      title: 'Fix fold expression on empty pack',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the fold expression that fails to compile when called with zero arguments.',
      skeleton: `template <typename... Args>
auto product(Args... args) {
    return (args * ...);  // BUG: empty pack with * has no identity
}

auto p = product();  // compilation error`,
      solution: `template <typename... Args>
auto product(Args... args) {
    return (args * ... * 1);  // binary fold with identity element 1
}

auto p = product();  // returns 1`,
      hints: [
        'A unary fold with * on an empty pack is ill-formed.',
        'Use a binary fold with an identity value: (args * ... * 1).',
        '1 is the identity element for multiplication.',
      ],
      concepts: ['fold-expression', 'binary-fold', 'identity-element'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-meta-16',
      title: 'Predict constexpr if branch',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <type_traits>
#include <iostream>

template <typename T>
void check() {
    if constexpr (std::is_integral_v<T>) {
        std::cout << "int ";
    }
    if constexpr (std::is_floating_point_v<T>) {
        std::cout << "float ";
    }
}

int main() {
    check<int>();
    check<double>();
    check<const char*>();
    std::cout << std::endl;
}`,
      solution: `int float `,
      hints: [
        'check<int>: is_integral is true, prints "int ".',
        'check<double>: is_floating_point is true, prints "float ".',
        'check<const char*>: neither trait is true, prints nothing.',
      ],
      concepts: ['constexpr-if', 'type-traits'],
    },
    {
      id: 'cpp-meta-17',
      title: 'Predict sizeof... result',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

template <typename... Ts>
void count() {
    std::cout << sizeof...(Ts) << std::endl;
}

int main() {
    count<int, double, char, bool>();
}`,
      solution: `4`,
      hints: [
        'sizeof...(Ts) returns the number of types in the pack.',
        'There are 4 types: int, double, char, bool.',
        'Output: 4.',
      ],
      concepts: ['sizeof-pack', 'variadic-template'],
    },
    {
      id: 'cpp-meta-18',
      title: 'Predict fold expression',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

template <typename... Args>
bool all_true(Args... args) {
    return (args && ...);
}

int main() {
    std::cout << std::boolalpha
              << all_true(true, true, true) << " "
              << all_true(true, false, true) << std::endl;
}`,
      solution: `true false`,
      hints: [
        'The fold (args && ...) computes logical AND of all arguments.',
        'all_true(true, true, true) = true.',
        'all_true(true, false, true) = false because one is false.',
      ],
      concepts: ['fold-expression', 'logical-and'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-meta-19',
      title: 'Refactor SFINAE to constexpr if',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Replace the SFINAE-based overloads with a single function using if constexpr.',
      skeleton: `#include <type_traits>
#include <string>

template <typename T>
std::enable_if_t<std::is_integral_v<T>, std::string>
to_desc(T) { return "integer"; }

template <typename T>
std::enable_if_t<std::is_floating_point_v<T>, std::string>
to_desc(T) { return "floating"; }

template <typename T>
std::enable_if_t<!std::is_integral_v<T> && !std::is_floating_point_v<T>, std::string>
to_desc(T) { return "other"; }`,
      solution: `#include <type_traits>
#include <string>

template <typename T>
std::string to_desc(T) {
    if constexpr (std::is_integral_v<T>) {
        return "integer";
    } else if constexpr (std::is_floating_point_v<T>) {
        return "floating";
    } else {
        return "other";
    }
}`,
      hints: [
        'constexpr if (C++17) replaces SFINAE for compile-time branching.',
        'Merge all three overloads into one function with if constexpr.',
        'Much more readable and maintainable.',
      ],
      concepts: ['constexpr-if', 'sfinae-replacement'],
    },
    {
      id: 'cpp-meta-20',
      title: 'Refactor recursive template to constexpr function',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Replace the recursive template struct with a constexpr function.',
      skeleton: `template <int N>
struct Sum {
    static constexpr int value = N + Sum<N-1>::value;
};

template <>
struct Sum<0> {
    static constexpr int value = 0;
};

static_assert(Sum<10>::value == 55);`,
      solution: `constexpr int sum(int n) {
    int total = 0;
    for (int i = 1; i <= n; ++i) {
        total += i;
    }
    return total;
}

static_assert(sum(10) == 55);`,
      hints: [
        'constexpr functions (C++14+) can use loops, making them much simpler.',
        'Replace the struct + specialization with a regular constexpr function.',
        'A simple for loop is clearer than recursive template instantiation.',
      ],
      concepts: ['constexpr', 'template-metaprogramming', 'simplification'],
    },
  ],
};
