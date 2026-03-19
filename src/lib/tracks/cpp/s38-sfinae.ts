import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-sfinae',
  title: '38. SFINAE',
  explanation: `## SFINAE in C++\n\n**SFINAE** (Substitution Failure Is Not An Error) is a core C++ template metaprogramming principle: if substituting template arguments into a function signature causes an invalid type, that overload is silently removed from the candidate set instead of producing a compiler error.\n\n### std::enable_if\n\nThe most common SFINAE tool:\n\n\`\`\`cpp\n#include <type_traits>\n\ntemplate<typename T, typename = std::enable_if_t<std::is_integral_v<T>>>\nvoid process(T value) {\n    // Only callable with integral types\n}\n\`\`\`\n\n### void_t\n\n\`std::void_t<>\` maps any valid type expression to void, useful for detection:\n\n\`\`\`cpp\ntemplate<typename, typename = void>\nstruct has_size : std::false_type {};\n\ntemplate<typename T>\nstruct has_size<T, std::void_t<decltype(std::declval<T>().size())>>\n    : std::true_type {};\n\`\`\`\n\n### Detection Idiom\n\n\`\`\`cpp\ntemplate<typename T, typename = void>\nstruct is_printable : std::false_type {};\n\ntemplate<typename T>\nstruct is_printable<T, std::void_t<\n    decltype(std::declval<std::ostream&>() << std::declval<T>())\n>> : std::true_type {};\n\`\`\`\n\n### Tag Dispatch\n\nUse type tags to select implementations at compile time:\n\n\`\`\`cpp\ntemplate<typename T>\nvoid process_impl(T val, std::true_type)  { /* integral version */ }\n\ntemplate<typename T>\nvoid process_impl(T val, std::false_type) { /* non-integral version */ }\n\ntemplate<typename T>\nvoid process(T val) {\n    process_impl(val, std::is_integral<T>{});\n}\n\`\`\`\n\n**Note**: In modern C++, prefer **concepts** (C++20) over SFINAE when possible. SFINAE remains important for understanding existing codebases and for pre-C++20 code.`,
  exercises: [
    {
      id: 'cpp-sfinae-1',
      title: 'Basic enable_if',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to constrain this function to integral types using enable_if.',
      skeleton: `#include <type_traits>

template<typename T, typename = std::enable_if_t<___>>
T double_val(T x) { return x * 2; }`,
      solution: `#include <type_traits>

template<typename T, typename = std::enable_if_t<std::is_integral_v<T>>>
T double_val(T x) { return x * 2; }`,
      hints: [
        'The condition inside enable_if_t must be a boolean constant expression.',
        'Use a type trait that checks for integer types.',
        'The answer is: std::is_integral_v<T>',
      ],
      concepts: ['enable-if', 'type-traits'],
    },
    {
      id: 'cpp-sfinae-2',
      title: 'enable_if in Return Type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to use enable_if in the return type position.',
      skeleton: `#include <type_traits>

template<typename T>
___ abs_val(T x) {
    return x < 0 ? -x : x;
}`,
      solution: `#include <type_traits>

template<typename T>
std::enable_if_t<std::is_arithmetic_v<T>, T> abs_val(T x) {
    return x < 0 ? -x : x;
}`,
      hints: [
        'enable_if_t takes a condition and a type to produce if the condition is true.',
        'The second template argument is the return type.',
        'The answer is: std::enable_if_t<std::is_arithmetic_v<T>, T>',
      ],
      concepts: ['enable-if', 'return-type-sfinae'],
    },
    {
      id: 'cpp-sfinae-3',
      title: 'void_t Detection',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to complete the void_t-based detection of a begin() method.',
      skeleton: `#include <type_traits>

template<typename, typename = void>
struct has_begin : std::false_type {};

template<typename T>
struct has_begin<T, std::void_t<decltype(std::declval<T>().___())>>
    : std::true_type {};`,
      solution: `#include <type_traits>

template<typename, typename = void>
struct has_begin : std::false_type {};

template<typename T>
struct has_begin<T, std::void_t<decltype(std::declval<T>().begin())>>
    : std::true_type {};`,
      hints: [
        'We are detecting whether the type has a begin() method.',
        'The expression inside decltype should call begin().',
        'The answer is: begin',
      ],
      concepts: ['void-t', 'detection-idiom'],
    },
    {
      id: 'cpp-sfinae-4',
      title: 'Tag Dispatch Selection',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to dispatch based on whether T is a floating point type.',
      skeleton: `#include <type_traits>

template<typename T>
void impl(T val, std::true_type) { /* float impl */ }

template<typename T>
void impl(T val, std::false_type) { /* non-float impl */ }

template<typename T>
void process(T val) {
    impl(val, ___<T>{});
}`,
      solution: `#include <type_traits>

template<typename T>
void impl(T val, std::true_type) { /* float impl */ }

template<typename T>
void impl(T val, std::false_type) { /* non-float impl */ }

template<typename T>
void process(T val) {
    impl(val, std::is_floating_point<T>{});
}`,
      hints: [
        'The type trait that checks for floating-point types.',
        'When instantiated with {}, it produces either std::true_type or std::false_type.',
        'The answer is: std::is_floating_point',
      ],
      concepts: ['tag-dispatch', 'type-traits'],
    },
    {
      id: 'cpp-sfinae-5',
      title: 'declval Usage',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank with the utility that creates a fake instance of T for use in unevaluated contexts.',
      skeleton: `#include <type_traits>

template<typename T>
using deref_type = decltype(*std::___<T>());`,
      solution: `#include <type_traits>

template<typename T>
using deref_type = decltype(*std::declval<T>());`,
      hints: [
        'This utility produces a value of type T without actually constructing one.',
        'It can only be used inside decltype, sizeof, etc.',
        'The answer is: declval',
      ],
      concepts: ['declval', 'unevaluated-context'],
    },
    {
      id: 'cpp-sfinae-6',
      title: 'Negate an enable_if Condition',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to constrain the function to NON-integral types.',
      skeleton: `#include <type_traits>

template<typename T, typename = std::enable_if_t<___std::is_integral_v<T>>>
void non_integral_only(T) {}`,
      solution: `#include <type_traits>

template<typename T, typename = std::enable_if_t<!std::is_integral_v<T>>>
void non_integral_only(T) {}`,
      hints: [
        'Negate the boolean condition.',
        'Use the logical NOT operator.',
        'The answer is: !',
      ],
      concepts: ['enable-if', 'negation'],
    },
    {
      id: 'cpp-sfinae-7',
      title: 'Write a has_to_string Detector',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a type trait has_to_string that detects if a type has a to_string() member function.',
      skeleton: `#include <type_traits>

// Write has_to_string here`,
      solution: `#include <type_traits>

template<typename, typename = void>
struct has_to_string : std::false_type {};

template<typename T>
struct has_to_string<T, std::void_t<decltype(std::declval<T>().to_string())>>
    : std::true_type {};`,
      hints: [
        'Use the void_t detection idiom.',
        'Primary template inherits from false_type.',
        'Specialization with void_t checks if .to_string() is valid.',
      ],
      concepts: ['detection-idiom', 'void-t'],
    },
    {
      id: 'cpp-sfinae-8',
      title: 'Write enable_if Overload Pair',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write two overloads of to_str: one for arithmetic types (using std::to_string) and one for types that have an operator<< with ostream (using ostringstream).',
      skeleton: `#include <type_traits>
#include <string>
#include <sstream>

// Write both to_str overloads here`,
      solution: `#include <type_traits>
#include <string>
#include <sstream>

template<typename T>
std::enable_if_t<std::is_arithmetic_v<T>, std::string>
to_str(T val) {
    return std::to_string(val);
}

template<typename T>
std::enable_if_t<!std::is_arithmetic_v<T>, std::string>
to_str(const T& val) {
    std::ostringstream oss;
    oss << val;
    return oss.str();
}`,
      hints: [
        'Use enable_if_t in the return type to select between overloads.',
        'One overload uses std::is_arithmetic_v<T>, the other uses the negation.',
        'Mutually exclusive conditions prevent ambiguity.',
      ],
      concepts: ['enable-if', 'overload-selection'],
    },
    {
      id: 'cpp-sfinae-9',
      title: 'Write a Tag Dispatch advance',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function my_advance that uses tag dispatch to advance an iterator. For random access, use +=; for others, use a loop.',
      skeleton: `#include <iterator>

// Write my_advance using tag dispatch here`,
      solution: `#include <iterator>

template<typename It>
void advance_impl(It& it, int n, std::random_access_iterator_tag) {
    it += n;
}

template<typename It>
void advance_impl(It& it, int n, std::input_iterator_tag) {
    for (int i = 0; i < n; ++i) ++it;
}

template<typename It>
void my_advance(It& it, int n) {
    advance_impl(it, n, typename std::iterator_traits<It>::iterator_category{});
}`,
      hints: [
        'Get the iterator category from std::iterator_traits<It>::iterator_category.',
        'Write separate implementations for random_access_iterator_tag and input_iterator_tag.',
        'The main function dispatches based on the tag.',
      ],
      concepts: ['tag-dispatch', 'iterator-traits'],
    },
    {
      id: 'cpp-sfinae-10',
      title: 'Write is_addable Trait',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a type trait is_addable<T, U> that detects if T + U is a valid expression.',
      skeleton: `#include <type_traits>

// Write is_addable here`,
      solution: `#include <type_traits>

template<typename T, typename U, typename = void>
struct is_addable : std::false_type {};

template<typename T, typename U>
struct is_addable<T, U, std::void_t<decltype(std::declval<T>() + std::declval<U>())>>
    : std::true_type {};

template<typename T, typename U>
inline constexpr bool is_addable_v = is_addable<T, U>::value;`,
      hints: [
        'Use the void_t pattern with two type parameters.',
        'Check if declval<T>() + declval<U>() is valid inside void_t.',
        'Add a _v helper variable template for convenience.',
      ],
      concepts: ['detection-idiom', 'binary-trait'],
    },
    {
      id: 'cpp-sfinae-11',
      title: 'Write a constexpr if Alternative',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function serialize that uses SFINAE to call .serialize() if it exists, otherwise falls back to std::to_string for arithmetic types.',
      skeleton: `#include <type_traits>
#include <string>

// Write serialize with SFINAE here`,
      solution: `#include <type_traits>
#include <string>

template<typename T, typename = void>
struct has_serialize : std::false_type {};

template<typename T>
struct has_serialize<T, std::void_t<decltype(std::declval<T>().serialize())>>
    : std::true_type {};

template<typename T>
std::enable_if_t<has_serialize<T>::value, std::string>
serialize(const T& obj) {
    return obj.serialize();
}

template<typename T>
std::enable_if_t<!has_serialize<T>::value && std::is_arithmetic_v<T>, std::string>
serialize(const T& val) {
    return std::to_string(val);
}`,
      hints: [
        'First define a has_serialize trait using void_t.',
        'Then write two enable_if overloads.',
        'The second condition combines !has_serialize and is_arithmetic.',
      ],
      concepts: ['detection-idiom', 'enable-if', 'fallback'],
    },
    {
      id: 'cpp-sfinae-12',
      title: 'Write a Compile-Time Conditional Type',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a type trait bigger_type<T, U> that selects the larger type (by sizeof) between T and U using std::conditional.',
      skeleton: `#include <type_traits>

// Write bigger_type here`,
      solution: `#include <type_traits>

template<typename T, typename U>
struct bigger_type {
    using type = std::conditional_t<(sizeof(T) >= sizeof(U)), T, U>;
};

template<typename T, typename U>
using bigger_type_t = typename bigger_type<T, U>::type;`,
      hints: [
        'Use std::conditional_t<condition, TrueType, FalseType>.',
        'The condition compares sizeof(T) and sizeof(U).',
        'Add a _t alias for convenience.',
      ],
      concepts: ['conditional', 'sizeof', 'type-alias'],
    },
    {
      id: 'cpp-sfinae-13',
      title: 'Fix enable_if Ambiguity',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the ambiguous overloads that both match for integral types.',
      skeleton: `#include <type_traits>
#include <iostream>

template<typename T, typename = std::enable_if_t<std::is_integral_v<T>>>
void show(T val) { std::cout << "integral: " << val; }

template<typename T, typename = std::enable_if_t<std::is_arithmetic_v<T>>>
void show(T val) { std::cout << "arithmetic: " << val; }
// Error: ambiguous for int (matches both)`,
      solution: `#include <type_traits>
#include <iostream>

template<typename T, typename = std::enable_if_t<std::is_integral_v<T>>>
void show(T val) { std::cout << "integral: " << val; }

template<typename T, typename = std::enable_if_t<
    std::is_arithmetic_v<T> && !std::is_integral_v<T>>>
void show(T val) { std::cout << "arithmetic: " << val; }`,
      hints: [
        'The second overload matches all arithmetic types including integrals.',
        'Make the conditions mutually exclusive.',
        'Add !std::is_integral_v<T> to the second condition.',
      ],
      concepts: ['enable-if', 'mutual-exclusion'],
    },
    {
      id: 'cpp-sfinae-14',
      title: 'Fix Missing declval',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the detection trait that tries to construct T without using declval.',
      skeleton: `#include <type_traits>

template<typename, typename = void>
struct has_size : std::false_type {};

template<typename T>
struct has_size<T, std::void_t<decltype(T().size())>>
    : std::true_type {};
// Bug: T() requires T to be default-constructible`,
      solution: `#include <type_traits>

template<typename, typename = void>
struct has_size : std::false_type {};

template<typename T>
struct has_size<T, std::void_t<decltype(std::declval<T>().size())>>
    : std::true_type {};`,
      hints: [
        'T() fails if T has no default constructor.',
        'std::declval<T>() creates a fake instance without constructing.',
        'Replace T() with std::declval<T>().',
      ],
      concepts: ['declval', 'detection-idiom'],
    },
    {
      id: 'cpp-sfinae-15',
      title: 'Fix void_t Specialization',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fix the partial specialization that does not match because the default template argument is wrong.',
      skeleton: `#include <type_traits>

template<typename T, typename = int>  // BUG: default should be void
struct has_value_type : std::false_type {};

template<typename T>
struct has_value_type<T, std::void_t<typename T::value_type>>
    : std::true_type {};`,
      solution: `#include <type_traits>

template<typename T, typename = void>
struct has_value_type : std::false_type {};

template<typename T>
struct has_value_type<T, std::void_t<typename T::value_type>>
    : std::true_type {};`,
      hints: [
        'void_t maps valid expressions to void.',
        'The default template argument must also be void for the specialization to match.',
        'Change typename = int to typename = void.',
      ],
      concepts: ['void-t', 'specialization-matching'],
    },
    {
      id: 'cpp-sfinae-16',
      title: 'Predict: enable_if Selection',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict which overload is called.',
      skeleton: `#include <type_traits>
#include <iostream>

template<typename T>
std::enable_if_t<std::is_integral_v<T>>
classify(T) { std::cout << "int"; }

template<typename T>
std::enable_if_t<std::is_floating_point_v<T>>
classify(T) { std::cout << "float"; }

int main() {
    classify(42);
    std::cout << " ";
    classify(3.14);
}`,
      solution: `int float`,
      hints: [
        '42 is an int, which is integral.',
        '3.14 is a double, which is floating_point.',
        'SFINAE removes the non-matching overload in each case.',
      ],
      concepts: ['enable-if', 'overload-selection'],
    },
    {
      id: 'cpp-sfinae-17',
      title: 'Predict: Detection Trait',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the output of the detection trait checks.',
      skeleton: `#include <type_traits>
#include <vector>
#include <iostream>

template<typename, typename = void>
struct has_push_back : std::false_type {};

template<typename T>
struct has_push_back<T, std::void_t<
    decltype(std::declval<T>().push_back(std::declval<typename T::value_type>()))
>> : std::true_type {};

int main() {
    std::cout << has_push_back<std::vector<int>>::value << " ";
    std::cout << has_push_back<int>::value;
}`,
      solution: `1 0`,
      hints: [
        'std::vector<int> has push_back, so the trait is true.',
        'int does not have push_back, so the trait is false.',
        'void_t SFINAE removes the specialization when the expression is invalid.',
      ],
      concepts: ['detection-idiom', 'void-t'],
    },
    {
      id: 'cpp-sfinae-18',
      title: 'Predict: Tag Dispatch Result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict which implementation is selected by tag dispatch.',
      skeleton: `#include <type_traits>
#include <iostream>

template<typename T>
void impl(T, std::true_type)  { std::cout << "signed"; }

template<typename T>
void impl(T, std::false_type) { std::cout << "unsigned"; }

template<typename T>
void check(T val) { impl(val, std::is_signed<T>{}); }

int main() {
    check(42);
    std::cout << " ";
    check(42u);
}`,
      solution: `signed unsigned`,
      hints: [
        '42 is int, which is signed.',
        '42u is unsigned int, which is unsigned.',
        'std::is_signed dispatches to the appropriate tag.',
      ],
      concepts: ['tag-dispatch', 'signed-unsigned'],
    },
    {
      id: 'cpp-sfinae-19',
      title: 'Refactor SFINAE to constexpr if',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor these SFINAE overloads to use C++17 if constexpr in a single function.',
      skeleton: `#include <type_traits>
#include <string>

template<typename T>
std::enable_if_t<std::is_integral_v<T>, std::string>
describe(T val) { return "integer: " + std::to_string(val); }

template<typename T>
std::enable_if_t<std::is_floating_point_v<T>, std::string>
describe(T val) { return "float: " + std::to_string(val); }`,
      solution: `#include <type_traits>
#include <string>

template<typename T>
std::string describe(T val) {
    if constexpr (std::is_integral_v<T>) {
        return "integer: " + std::to_string(val);
    } else if constexpr (std::is_floating_point_v<T>) {
        return "float: " + std::to_string(val);
    }
}`,
      hints: [
        'if constexpr evaluates the condition at compile time.',
        'Only the matching branch is instantiated.',
        'Combine both overloads into one function with compile-time branching.',
      ],
      concepts: ['constexpr-if', 'sfinae-alternative'],
    },
    {
      id: 'cpp-sfinae-20',
      title: 'Refactor SFINAE to Concept',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor this SFINAE-constrained function to use a C++20 concept.',
      skeleton: `#include <type_traits>
#include <iostream>

template<typename T,
         typename = std::enable_if_t<
             std::is_arithmetic_v<T> &&
             std::is_signed_v<T>>>
T negate(T val) {
    return -val;
}`,
      solution: `#include <concepts>
#include <type_traits>
#include <iostream>

template<typename T>
concept SignedArithmetic = std::is_arithmetic_v<T> && std::is_signed_v<T>;

SignedArithmetic auto negate(SignedArithmetic auto val) {
    return -val;
}`,
      hints: [
        'Define a concept that combines both conditions.',
        'Use the abbreviated function template syntax.',
        'Concepts are much cleaner than enable_if chains.',
      ],
      concepts: ['concepts', 'sfinae-to-concepts'],
    },
  ],
};
