import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-traits',
  title: '39. Type Traits',
  explanation: `## Type Traits in C++\n\nType traits are compile-time utilities in \`<type_traits>\` that let you query and transform types. They are the foundation of template metaprogramming and SFINAE.\n\n### Querying Type Properties\n\`\`\`cpp\n#include <type_traits>\nstatic_assert(std::is_integral_v<int>);           // true\nstatic_assert(std::is_floating_point_v<double>);   // true\nstatic_assert(std::is_pointer_v<int*>);            // true\nstatic_assert(std::is_same_v<int, int>);           // true\nstatic_assert(!std::is_same_v<int, long>);         // true\n\`\`\`\n\n### Type Transformations\n\`\`\`cpp\nstd::remove_const_t<const int>         // int\nstd::remove_reference_t<int&>          // int\nstd::remove_pointer_t<int*>            // int\nstd::add_const_t<int>                  // const int\nstd::decay_t<const int&>              // int\n\`\`\`\n\n### std::enable_if (SFINAE)\n\`\`\`cpp\ntemplate<typename T>\nstd::enable_if_t<std::is_integral_v<T>, T>\ndoubleValue(T val) {\n    return val * 2;\n}\n\`\`\`\n\n### std::conditional\n\`\`\`cpp\nusing Type = std::conditional_t<sizeof(int) >= 4, int, long>;\n// Chooses int if sizeof(int) >= 4, else long\n\`\`\`\n\n### std::is_base_of\n\`\`\`cpp\nstruct Base {};\nstruct Derived : Base {};\nstatic_assert(std::is_base_of_v<Base, Derived>);   // true\n\`\`\`\n\n### std::void_t (C++17)\n\`\`\`cpp\n// Detect if a type has a .size() method\ntemplate<typename, typename = void>\nstruct has_size : std::false_type {};\n\ntemplate<typename T>\nstruct has_size<T, std::void_t<decltype(std::declval<T>().size())>>\n    : std::true_type {};\n\`\`\`\n\n### Custom Type Traits\n\`\`\`cpp\ntemplate<typename T>\nstruct is_string : std::false_type {};\n\ntemplate<>\nstruct is_string<std::string> : std::true_type {};\n\ntemplate<typename T>\ninline constexpr bool is_string_v = is_string<T>::value;\n\`\`\``,
  exercises: [
    {
      id: 'cpp-traits-1',
      title: 'Check Integral Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to static_assert that int is an integral type.',
      skeleton: `#include <type_traits>

static_assert(___<int>, "int should be integral");`,
      solution: `#include <type_traits>

static_assert(std::is_integral_v<int>, "int should be integral");`,
      hints: [
        'std::is_integral_v<T> checks if T is an integral type.',
        'The _v suffix gives you the bool value directly.',
        'int, char, bool, long, etc. are all integral types.',
      ],
      concepts: ['std::is_integral', 'type traits', 'static_assert'],
    },
    {
      id: 'cpp-traits-2',
      title: 'Check Same Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to check if two types are the same.',
      skeleton: `#include <type_traits>

static_assert(___<int, int>);
static_assert(!___<int, double>);`,
      solution: `#include <type_traits>

static_assert(std::is_same_v<int, int>);
static_assert(!std::is_same_v<int, double>);`,
      hints: [
        'std::is_same_v<T, U> is true when T and U are exactly the same type.',
        'int and double are different types.',
        'Note: int and const int are also considered different.',
      ],
      concepts: ['std::is_same', 'type comparison'],
    },
    {
      id: 'cpp-traits-3',
      title: 'Remove Reference',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to strip the reference from a type.',
      skeleton: `#include <type_traits>

using T = int&;
using Stripped = ___<T>;
static_assert(std::is_same_v<Stripped, int>);`,
      solution: `#include <type_traits>

using T = int&;
using Stripped = std::remove_reference_t<T>;
static_assert(std::is_same_v<Stripped, int>);`,
      hints: [
        'std::remove_reference_t<T> strips & or && from a type.',
        'int& becomes int, int&& also becomes int.',
        'The _t suffix is the alias for ::type.',
      ],
      concepts: ['std::remove_reference', 'type transformation'],
    },
    {
      id: 'cpp-traits-4',
      title: 'Write enable_if Guard',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a function template that only accepts floating-point types using std::enable_if.',
      skeleton: `#include <type_traits>

// Write a function 'half' that takes a floating-point type T
// and returns val / 2.0
// Use std::enable_if to restrict T to floating-point types`,
      solution: `#include <type_traits>

template<typename T>
std::enable_if_t<std::is_floating_point_v<T>, T>
half(T val) {
    return val / 2.0;
}`,
      hints: [
        'std::enable_if_t<condition, ReturnType> is the return type when condition is true.',
        'When condition is false, the function is removed from overload resolution (SFINAE).',
        'std::is_floating_point_v<T> checks for float, double, long double.',
      ],
      concepts: ['std::enable_if', 'SFINAE', 'floating-point'],
    },
    {
      id: 'cpp-traits-5',
      title: 'Predict Type Trait Results',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>
#include <type_traits>

int main() {
    std::cout << std::is_integral_v<bool> << " "
              << std::is_integral_v<float> << " "
              << std::is_pointer_v<int*> << " "
              << std::is_reference_v<int&> << std::endl;
    return 0;
}`,
      solution: `1 0 1 1`,
      hints: [
        'bool is an integral type (true = 1).',
        'float is NOT integral, it is floating-point (false = 0).',
        'int* is a pointer (1), int& is a reference (1).',
      ],
      concepts: ['type traits', 'is_integral', 'is_pointer', 'is_reference'],
    },
    {
      id: 'cpp-traits-6',
      title: 'std::decay Transform',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to apply std::decay to strip const, reference, and array-to-pointer conversion.',
      skeleton: `#include <type_traits>

static_assert(std::is_same_v<___<const int&>, int>);
static_assert(std::is_same_v<___<int[5]>, int*>);`,
      solution: `#include <type_traits>

static_assert(std::is_same_v<std::decay_t<const int&>, int>);
static_assert(std::is_same_v<std::decay_t<int[5]>, int*>);`,
      hints: [
        'std::decay_t mimics the type transformations that happen when passing by value.',
        'It removes const, volatile, and references.',
        'It also converts arrays to pointers and functions to function pointers.',
      ],
      concepts: ['std::decay', 'type decay', 'pass-by-value semantics'],
    },
    {
      id: 'cpp-traits-7',
      title: 'std::conditional Selection',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Use std::conditional to select a type based on a compile-time condition.',
      skeleton: `#include <type_traits>
#include <cstdint>

// Define a type alias 'FastInt' that is:
//   int64_t if sizeof(void*) >= 8 (64-bit platform)
//   int32_t otherwise`,
      solution: `#include <type_traits>
#include <cstdint>

using FastInt = std::conditional_t<(sizeof(void*) >= 8), int64_t, int32_t>;`,
      hints: [
        'std::conditional_t<condition, TrueType, FalseType> selects a type at compile time.',
        'sizeof(void*) gives the pointer size, which indicates platform bitness.',
        'On 64-bit platforms, sizeof(void*) is typically 8.',
      ],
      concepts: ['std::conditional', 'compile-time selection', 'platform detection'],
    },
    {
      id: 'cpp-traits-8',
      title: 'std::is_base_of Check',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to verify inheritance relationships at compile time.',
      skeleton: `#include <type_traits>

struct Animal {};
struct Dog : Animal {};
struct Cat : Animal {};
struct Car {};

static_assert(___<Animal, Dog>);
static_assert(___<Animal, Cat>);
static_assert(!___<Animal, Car>);`,
      solution: `#include <type_traits>

struct Animal {};
struct Dog : Animal {};
struct Cat : Animal {};
struct Car {};

static_assert(std::is_base_of_v<Animal, Dog>);
static_assert(std::is_base_of_v<Animal, Cat>);
static_assert(!std::is_base_of_v<Animal, Car>);`,
      hints: [
        'std::is_base_of_v<Base, Derived> checks if Base is a base class of Derived.',
        'Dog and Cat derive from Animal, so the check is true.',
        'Car does not derive from Animal, so the check is false.',
      ],
      concepts: ['std::is_base_of', 'inheritance', 'compile-time check'],
    },
    {
      id: 'cpp-traits-9',
      title: 'Fix enable_if Ambiguity',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the ambiguous overload caused by overlapping enable_if conditions.',
      skeleton: `#include <type_traits>
#include <string>

template<typename T>
std::enable_if_t<std::is_arithmetic_v<T>, std::string>
format(T val) {
    return std::to_string(val);
}

template<typename T>
std::enable_if_t<std::is_integral_v<T>, std::string>
format(T val) {
    return "int:" + std::to_string(val);
}
// format(42) is ambiguous: int is both arithmetic AND integral`,
      solution: `#include <type_traits>
#include <string>

template<typename T>
std::enable_if_t<std::is_floating_point_v<T>, std::string>
format(T val) {
    return std::to_string(val);
}

template<typename T>
std::enable_if_t<std::is_integral_v<T>, std::string>
format(T val) {
    return "int:" + std::to_string(val);
}
// Now: floating-point and integral are mutually exclusive`,
      hints: [
        'is_integral is a subset of is_arithmetic, causing overlap.',
        'Make the conditions mutually exclusive.',
        'Use is_floating_point for one overload and is_integral for the other.',
      ],
      concepts: ['SFINAE', 'overload resolution', 'mutually exclusive traits'],
    },
    {
      id: 'cpp-traits-10',
      title: 'Custom Type Trait',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a custom type trait is_string that is true for std::string and const char*.',
      skeleton: `#include <type_traits>
#include <string>

// Define is_string<T> that is true_type for:
//   - std::string
//   - const char*
// and false_type for everything else
// Also define is_string_v<T> helper variable`,
      solution: `#include <type_traits>
#include <string>

template<typename T>
struct is_string : std::false_type {};

template<>
struct is_string<std::string> : std::true_type {};

template<>
struct is_string<const char*> : std::true_type {};

template<typename T>
inline constexpr bool is_string_v = is_string<T>::value;

static_assert(is_string_v<std::string>);
static_assert(is_string_v<const char*>);
static_assert(!is_string_v<int>);`,
      hints: [
        'Start with a primary template that inherits from std::false_type.',
        'Specialize for std::string and const char* to inherit from std::true_type.',
        'The _v helper is an inline constexpr bool variable template.',
      ],
      concepts: ['custom type trait', 'template specialization', 'std::true_type'],
    },
    {
      id: 'cpp-traits-11',
      title: 'Predict Decay Results',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>
#include <type_traits>

int main() {
    std::cout << std::is_same_v<std::decay_t<int&&>, int> << " "
              << std::is_same_v<std::decay_t<const int&>, int> << " "
              << std::is_same_v<std::decay_t<int[3]>, int*> << " "
              << std::is_same_v<std::decay_t<int(int)>, int(*)(int)>
              << std::endl;
    return 0;
}`,
      solution: `1 1 1 1`,
      hints: [
        'decay removes references: int&& becomes int.',
        'decay removes const: const int& becomes int.',
        'decay converts arrays to pointers: int[3] becomes int*.',
        'decay converts functions to function pointers: int(int) becomes int(*)(int).',
      ],
      concepts: ['std::decay', 'reference removal', 'array decay', 'function decay'],
    },
    {
      id: 'cpp-traits-12',
      title: 'void_t Detection Idiom',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a type trait has_begin that detects if a type has a .begin() method using std::void_t.',
      skeleton: `#include <type_traits>
#include <vector>

// Write has_begin<T> using the void_t detection idiom
// has_begin_v<std::vector<int>> should be true
// has_begin_v<int> should be false`,
      solution: `#include <type_traits>
#include <vector>

template<typename, typename = void>
struct has_begin : std::false_type {};

template<typename T>
struct has_begin<T, std::void_t<decltype(std::declval<T>().begin())>>
    : std::true_type {};

template<typename T>
inline constexpr bool has_begin_v = has_begin<T>::value;

static_assert(has_begin_v<std::vector<int>>);
static_assert(!has_begin_v<int>);`,
      hints: [
        'The primary template defaults to false_type with a void second parameter.',
        'The specialization uses void_t<decltype(expression)> to detect the method.',
        'std::declval<T>() creates a fake instance without constructing it.',
      ],
      concepts: ['void_t', 'detection idiom', 'SFINAE', 'std::declval'],
    },
    {
      id: 'cpp-traits-13',
      title: 'Fix Trait with References',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fix the trait check that fails because references are not stripped before checking.',
      skeleton: `#include <type_traits>
#include <vector>
#include <iostream>

template<typename T>
void process(T&& val) {
    if constexpr (std::is_integral_v<T>) {
        std::cout << "Integral: " << val << std::endl;
    } else {
        std::cout << "Other: " << val << std::endl;
    }
}

int main() {
    int x = 42;
    process(x); // T deduces to int&, is_integral_v<int&> is FALSE!
}`,
      solution: `#include <type_traits>
#include <vector>
#include <iostream>

template<typename T>
void process(T&& val) {
    if constexpr (std::is_integral_v<std::remove_reference_t<T>>) {
        std::cout << "Integral: " << val << std::endl;
    } else {
        std::cout << "Other: " << val << std::endl;
    }
}

int main() {
    int x = 42;
    process(x); // T deduces to int&, remove_reference gives int, is_integral is TRUE
}`,
      hints: [
        'With forwarding references, T deduces to int& for lvalues.',
        'is_integral_v<int&> is false because int& is not integral.',
        'Strip the reference first with std::remove_reference_t<T>.',
      ],
      concepts: ['remove_reference', 'forwarding reference deduction', 'type traits with references'],
    },
    {
      id: 'cpp-traits-14',
      title: 'Trait Combination',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a combined type trait is_numeric that is true for both integral (excluding bool) and floating-point types.',
      skeleton: `#include <type_traits>

// Define is_numeric<T> that is true for:
//   - integral types EXCEPT bool
//   - floating-point types
// Define is_numeric_v helper`,
      solution: `#include <type_traits>

template<typename T>
struct is_numeric : std::bool_constant<
    (std::is_integral_v<T> && !std::is_same_v<std::remove_cv_t<T>, bool>) ||
    std::is_floating_point_v<T>
> {};

template<typename T>
inline constexpr bool is_numeric_v = is_numeric<T>::value;

static_assert(is_numeric_v<int>);
static_assert(is_numeric_v<double>);
static_assert(!is_numeric_v<bool>);
static_assert(!is_numeric_v<std::string>);`,
      hints: [
        'Combine multiple traits with logical operators.',
        'std::bool_constant<expr> creates a type trait from a bool expression.',
        'Use remove_cv_t to handle const/volatile bool.',
      ],
      concepts: ['trait combination', 'std::bool_constant', 'compound trait'],
    },
    {
      id: 'cpp-traits-15',
      title: 'Predict is_same with CV Qualifiers',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>
#include <type_traits>

int main() {
    std::cout << std::is_same_v<int, const int> << " "
              << std::is_same_v<std::remove_const_t<const int>, int> << " "
              << std::is_same_v<int&, int> << " "
              << std::is_same_v<std::decay_t<const int&>, int> << std::endl;
    return 0;
}`,
      solution: `0 1 0 1`,
      hints: [
        'int and const int are NOT the same type (0).',
        'remove_const_t<const int> is int, same as int (1).',
        'int& and int are NOT the same type (0).',
        'decay_t<const int&> strips both const and reference to give int (1).',
      ],
      concepts: ['is_same', 'const qualification', 'type identity'],
    },
    {
      id: 'cpp-traits-16',
      title: 'SFINAE with Multiple Constraints',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a serialize function template with three SFINAE-constrained overloads for integers, floats, and string-like types.',
      skeleton: `#include <type_traits>
#include <string>

// Overload 1: integral types -> "i:VALUE"
// Overload 2: floating-point types -> "f:VALUE"
// Overload 3: std::string -> "s:VALUE"
// Use enable_if for SFINAE`,
      solution: `#include <type_traits>
#include <string>

template<typename T>
std::enable_if_t<std::is_integral_v<T>, std::string>
serialize(T val) {
    return "i:" + std::to_string(val);
}

template<typename T>
std::enable_if_t<std::is_floating_point_v<T>, std::string>
serialize(T val) {
    return "f:" + std::to_string(val);
}

template<typename T>
std::enable_if_t<std::is_same_v<std::decay_t<T>, std::string>, std::string>
serialize(const T& val) {
    return "s:" + val;
}`,
      hints: [
        'Use std::enable_if_t with different conditions for each overload.',
        'integral, floating-point, and string conditions are mutually exclusive.',
        'Use std::decay_t for the string check to handle const references.',
      ],
      concepts: ['SFINAE', 'enable_if', 'overload set', 'type dispatch'],
    },
    {
      id: 'cpp-traits-17',
      title: 'Refactor enable_if to Concepts',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor this enable_if-based function to use C++20 concepts instead.',
      skeleton: `#include <type_traits>
#include <iostream>

template<typename T>
std::enable_if_t<std::is_integral_v<T> && (sizeof(T) >= 4)>
processLargeInt(T val) {
    std::cout << "Large integer: " << val << std::endl;
}`,
      solution: `#include <concepts>
#include <iostream>

template<typename T>
concept LargeInteger = std::integral<T> && (sizeof(T) >= 4);

void processLargeInt(LargeInteger auto val) {
    std::cout << "Large integer: " << val << std::endl;
}`,
      hints: [
        'C++20 concepts provide a cleaner syntax than enable_if.',
        'Define a concept that combines the integral check and size check.',
        'Use the abbreviated template syntax: ConceptName auto param.',
      ],
      concepts: ['refactor', 'concepts', 'enable_if replacement'],
    },
    {
      id: 'cpp-traits-18',
      title: 'Fix Missing remove_cv',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fix the custom trait that fails for const-qualified types.',
      skeleton: `#include <type_traits>
#include <string>

template<typename T>
struct is_string_type : std::false_type {};

template<>
struct is_string_type<std::string> : std::true_type {};

// Bug: is_string_type<const std::string>::value is FALSE
static_assert(is_string_type<std::string>::value);       // OK
// static_assert(is_string_type<const std::string>::value); // FAILS!`,
      solution: `#include <type_traits>
#include <string>

template<typename T>
struct is_string_type : std::bool_constant<
    std::is_same_v<std::remove_cv_t<T>, std::string>
> {};

static_assert(is_string_type<std::string>::value);
static_assert(is_string_type<const std::string>::value);`,
      hints: [
        'The specialization only matches std::string, not const std::string.',
        'Use std::remove_cv_t to strip const/volatile before comparing.',
        'Alternatively, add specializations for const, volatile, and const volatile.',
      ],
      concepts: ['remove_cv', 'const-qualified types', 'trait robustness'],
    },
    {
      id: 'cpp-traits-19',
      title: 'Refactor Tag Dispatch to if constexpr',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor this tag dispatch pattern to use if constexpr with type traits instead.',
      skeleton: `#include <type_traits>
#include <iterator>
#include <iostream>

template<typename Iter>
void advanceImpl(Iter& it, int n, std::random_access_iterator_tag) {
    it += n;
}

template<typename Iter>
void advanceImpl(Iter& it, int n, std::input_iterator_tag) {
    for (int i = 0; i < n; ++i) ++it;
}

template<typename Iter>
void myAdvance(Iter& it, int n) {
    advanceImpl(it, n, typename std::iterator_traits<Iter>::iterator_category{});
}`,
      solution: `#include <type_traits>
#include <iterator>
#include <iostream>

template<typename Iter>
void myAdvance(Iter& it, int n) {
    using category = typename std::iterator_traits<Iter>::iterator_category;
    if constexpr (std::is_base_of_v<std::random_access_iterator_tag, category>) {
        it += n;
    } else {
        for (int i = 0; i < n; ++i) ++it;
    }
}`,
      hints: [
        'if constexpr with is_base_of can replace tag dispatch.',
        'Check if the iterator category is derived from random_access_iterator_tag.',
        'The discarded branch is not compiled, so it += n is safe for input iterators.',
      ],
      concepts: ['refactor', 'tag dispatch', 'if constexpr', 'is_base_of'],
    },
    {
      id: 'cpp-traits-20',
      title: 'Predict void_t SFINAE',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>
#include <type_traits>
#include <vector>
#include <string>

template<typename, typename = void>
struct has_push_back : std::false_type {};

template<typename T>
struct has_push_back<T, std::void_t<
    decltype(std::declval<T>().push_back(std::declval<typename T::value_type>()))
>> : std::true_type {};

int main() {
    std::cout << has_push_back<std::vector<int>>::value << " "
              << has_push_back<std::string>::value << " "
              << has_push_back<int>::value << std::endl;
    return 0;
}`,
      solution: `1 1 0`,
      hints: [
        'std::vector<int> has push_back(int) -- true.',
        'std::string has push_back(char) -- true.',
        'int has no push_back method -- false.',
      ],
      concepts: ['void_t', 'detection idiom', 'SFINAE', 'push_back'],
    },
  ]
};
