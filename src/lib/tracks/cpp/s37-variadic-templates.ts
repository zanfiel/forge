import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-variadic',
  title: '37. Variadic Templates',
  explanation: `## Variadic Templates in C++\n\nVariadic templates allow functions and classes to accept any number of template arguments.\n\n### Parameter Packs\n\nA **parameter pack** captures zero or more arguments:\n\n\`\`\`cpp\ntemplate<typename... Args>\nvoid print(Args... args);\n// Args is a type parameter pack\n// args is a function parameter pack\n\`\`\`\n\n### Pack Expansion\n\nExpand a pack with \`...\`:\n\n\`\`\`cpp\ntemplate<typename... Args>\nvoid forward_all(Args&&... args) {\n    target(std::forward<Args>(args)...);  // expands each arg\n}\n\`\`\`\n\n### sizeof...\n\n\`sizeof...(args)\` returns the number of elements in a pack:\n\n\`\`\`cpp\ntemplate<typename... Args>\nconstexpr std::size_t count(Args... args) {\n    return sizeof...(args);\n}\n\`\`\`\n\n### Fold Expressions (C++17)\n\nFold expressions apply an operator across a pack:\n\n\`\`\`cpp\ntemplate<typename... Args>\nauto sum(Args... args) {\n    return (args + ...);  // right fold\n}\n\ntemplate<typename... Args>\nauto sum_init(Args... args) {\n    return (0 + ... + args);  // left fold with init\n}\n\`\`\`\n\n### Recursive Unpacking\n\nThe classic pre-C++17 approach uses recursion:\n\n\`\`\`cpp\nvoid print() {}  // base case\n\ntemplate<typename T, typename... Rest>\nvoid print(T first, Rest... rest) {\n    std::cout << first << " ";\n    print(rest...);  // recurse with remaining args\n}\n\`\`\``,
  exercises: [
    {
      id: 'cpp-variadic-1',
      title: 'Parameter Pack Syntax',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to declare a variadic template function.',
      skeleton: `template<typename__________ Args>
void func(Args... args) {
    // ...
}`,
      solution: `template<typename... Args>
void func(Args... args) {
    // ...
}`,
      hints: [
        'A type parameter pack uses ... after typename.',
        'The syntax is typename... PackName.',
        'The answer is ... (ellipsis).',
      ],
      concepts: ['variadic-templates', 'parameter-pack'],
    },
    {
      id: 'cpp-variadic-2',
      title: 'sizeof... Operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to get the number of arguments in the pack.',
      skeleton: `#include <cstddef>

template<typename... Args>
constexpr std::size_t count_args(Args... args) {
    return __________(args);
}

static_assert(count_args(1, 2, 3) == 3);`,
      solution: `#include <cstddef>

template<typename... Args>
constexpr std::size_t count_args(Args... args) {
    return sizeof...(args);
}

static_assert(count_args(1, 2, 3) == 3);`,
      hints: [
        'sizeof... returns the number of elements in a parameter pack.',
        'It works on both type packs and value packs.',
        'The answer is sizeof...',
      ],
      concepts: ['sizeof...', 'variadic-templates'],
    },
    {
      id: 'cpp-variadic-3',
      title: 'Fold Expression: Sum',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to write a fold expression that sums all arguments.',
      skeleton: `template<typename... Args>
auto sum(Args... args) {
    return (__________ + ...);
}

// sum(1, 2, 3) == 6`,
      solution: `template<typename... Args>
auto sum(Args... args) {
    return (args + ...);
}

// sum(1, 2, 3) == 6`,
      hints: [
        'A right fold expression is (pack op ...).',
        'The pack name is args.',
        'The answer is args.',
      ],
      concepts: ['fold-expression', 'variadic-templates'],
    },
    {
      id: 'cpp-variadic-4',
      title: 'Fold Expression with Init',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank for a left fold with initial value 0.',
      skeleton: `template<typename... Args>
auto safe_sum(Args... args) {
    return (__________ + ... + args);
}

// safe_sum() == 0  (works even with empty pack)`,
      solution: `template<typename... Args>
auto safe_sum(Args... args) {
    return (0 + ... + args);
}

// safe_sum() == 0  (works even with empty pack)`,
      hints: [
        'A left fold with init is (init op ... op pack).',
        'Use 0 as the initial value for addition.',
        'The answer is 0.',
      ],
      concepts: ['fold-expression', 'binary-fold'],
    },
    {
      id: 'cpp-variadic-5',
      title: 'Pack Expansion in Function Call',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to expand the parameter pack in the function call.',
      skeleton: `#include <utility>

template<typename F, typename... Args>
auto invoke_it(F&& f, Args&&... args) {
    return f(std::forward<Args>(args)__________);
}`,
      solution: `#include <utility>

template<typename F, typename... Args>
auto invoke_it(F&& f, Args&&... args) {
    return f(std::forward<Args>(args)...);
}`,
      hints: [
        'Pack expansion uses ... after the pattern.',
        'The pattern is std::forward<Args>(args), expanded for each argument.',
        'The answer is ... (ellipsis).',
      ],
      concepts: ['pack-expansion', 'perfect-forwarding'],
    },
    {
      id: 'cpp-variadic-6',
      title: 'Recursive Base Case',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to provide the base case for recursive variadic printing.',
      skeleton: `#include <iostream>

__________  // base case: no arguments

template<typename T, typename... Rest>
void print(T first, Rest... rest) {
    std::cout << first << " ";
    print(rest...);
}`,
      solution: `#include <iostream>

void print() {}  // base case: no arguments

template<typename T, typename... Rest>
void print(T first, Rest... rest) {
    std::cout << first << " ";
    print(rest...);
}`,
      hints: [
        'The base case handles the empty parameter pack.',
        'It is a non-template overload with no parameters.',
        'The answer is void print() {}.',
      ],
      concepts: ['recursive-unpacking', 'base-case'],
    },
    {
      id: 'cpp-variadic-7',
      title: 'Write a Variadic print Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a variadic print function using fold expressions that prints all arguments separated by spaces, followed by a newline.',
      skeleton: `#include <iostream>

// Write print here using fold expressions

int main() {
    print(1, "hello", 3.14, 'x');
    // Output: 1 hello 3.14 x
}`,
      solution: `#include <iostream>

template<typename... Args>
void print(Args... args) {
    ((std::cout << args << " "), ...);
    std::cout << std::endl;
}

int main() {
    print(1, "hello", 3.14, 'x');
    // Output: 1 hello 3.14 x
}`,
      hints: [
        'Use a comma fold expression to print each argument.',
        'The pattern is (std::cout << args << " ").',
        'Expand with ((pattern), ...) for a comma fold.',
      ],
      concepts: ['fold-expression', 'comma-fold', 'variadic-templates'],
    },
    {
      id: 'cpp-variadic-8',
      title: 'Write a Variadic max Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a variadic max function that returns the maximum of all arguments.',
      skeleton: `#include <iostream>
#include <algorithm>

// Write variadic_max here

int main() {
    std::cout << variadic_max(3, 7, 2, 9, 1) << std::endl; // 9
}`,
      solution: `#include <iostream>
#include <algorithm>

template<typename T>
T variadic_max(T val) {
    return val;
}

template<typename T, typename... Rest>
T variadic_max(T first, Rest... rest) {
    return std::max(first, variadic_max(rest...));
}

int main() {
    std::cout << variadic_max(3, 7, 2, 9, 1) << std::endl; // 9
}`,
      hints: [
        'Use recursive unpacking with a single-argument base case.',
        'Compare first with the max of the rest.',
        'Use std::max to compare two values.',
      ],
      concepts: ['recursive-unpacking', 'variadic-templates'],
    },
    {
      id: 'cpp-variadic-9',
      title: 'Write a Variadic all_of',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a variadic function all_true that returns true only if all arguments are true, using fold expressions.',
      skeleton: `#include <iostream>

// Write all_true here

int main() {
    std::cout << all_true(true, true, true) << std::endl;   // 1
    std::cout << all_true(true, false, true) << std::endl;  // 0
}`,
      solution: `#include <iostream>

template<typename... Args>
bool all_true(Args... args) {
    return (args && ...);
}

int main() {
    std::cout << all_true(true, true, true) << std::endl;   // 1
    std::cout << all_true(true, false, true) << std::endl;  // 0
}`,
      hints: [
        'Use a fold expression with the && operator.',
        'The right fold (args && ...) short-circuits on false.',
        'Returns true only if all args are true.',
      ],
      concepts: ['fold-expression', 'logical-fold'],
    },
    {
      id: 'cpp-variadic-10',
      title: 'Write a Tuple-like Struct',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a simple variadic struct MyTuple that stores elements recursively (head + tail pattern).',
      skeleton: `#include <iostream>

// Write MyTuple here (base case and recursive case)
// Provide a get<Index> function template

int main() {
    MyTuple<int, double, char> t(1, 3.14, 'a');
    std::cout << get<0>(t) << " " << get<1>(t) << " " << get<2>(t) << std::endl;
    // Output: 1 3.14 a
}`,
      solution: `#include <iostream>

template<typename... Ts>
struct MyTuple;

template<>
struct MyTuple<> {};

template<typename Head, typename... Tail>
struct MyTuple<Head, Tail...> : MyTuple<Tail...> {
    Head value;
    MyTuple(Head h, Tail... t) : MyTuple<Tail...>(t...), value(h) {}
};

template<int I, typename Head, typename... Tail>
struct TupleGet {
    static auto& get(MyTuple<Head, Tail...>& t) {
        return TupleGet<I - 1, Tail...>::get(static_cast<MyTuple<Tail...>&>(t));
    }
};

template<typename Head, typename... Tail>
struct TupleGet<0, Head, Tail...> {
    static Head& get(MyTuple<Head, Tail...>& t) {
        return t.value;
    }
};

template<int I, typename... Ts>
auto& get(MyTuple<Ts...>& t) {
    return TupleGet<I, Ts...>::get(t);
}

int main() {
    MyTuple<int, double, char> t(1, 3.14, 'a');
    std::cout << get<0>(t) << " " << get<1>(t) << " " << get<2>(t) << std::endl;
    // Output: 1 3.14 a
}`,
      hints: [
        'Use inheritance: MyTuple<Head, Tail...> inherits from MyTuple<Tail...>.',
        'Each level stores one value (the head).',
        'get<I> recurses down by casting to the base class.',
      ],
      concepts: ['variadic-templates', 'recursive-inheritance', 'tuple'],
    },
    {
      id: 'cpp-variadic-11',
      title: 'Write a Variadic String Concatenation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a variadic function concat that concatenates any number of std::string arguments.',
      skeleton: `#include <string>
#include <iostream>

// Write concat here

int main() {
    std::cout << concat(std::string("Hello"), std::string(" "), std::string("World")) << std::endl;
    // Output: Hello World
}`,
      solution: `#include <string>
#include <iostream>

template<typename... Args>
std::string concat(Args... args) {
    return (std::string{} + ... + args);
}

int main() {
    std::cout << concat(std::string("Hello"), std::string(" "), std::string("World")) << std::endl;
    // Output: Hello World
}`,
      hints: [
        'Use a left fold with an empty string as the init value.',
        'The syntax is (init + ... + args).',
        'std::string{} is the identity element for concatenation.',
      ],
      concepts: ['fold-expression', 'string-concatenation'],
    },
    {
      id: 'cpp-variadic-12',
      title: 'Write a Variadic Index Checker',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a variadic function contains that checks if any argument equals a given value.',
      skeleton: `#include <iostream>

// Write contains here

int main() {
    std::cout << contains(5, 1, 2, 3, 4, 5) << std::endl;  // 1
    std::cout << contains(9, 1, 2, 3) << std::endl;         // 0
}`,
      solution: `#include <iostream>

template<typename T, typename... Args>
bool contains(T target, Args... args) {
    return ((args == target) || ...);
}

int main() {
    std::cout << contains(5, 1, 2, 3, 4, 5) << std::endl;  // 1
    std::cout << contains(9, 1, 2, 3) << std::endl;         // 0
}`,
      hints: [
        'Compare each arg to target and fold with ||.',
        'The fold expression is ((args == target) || ...).',
        'Returns true if any argument matches target.',
      ],
      concepts: ['fold-expression', 'variadic-templates'],
    },
    {
      id: 'cpp-variadic-13',
      title: 'Fix: Missing Pack Expansion',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the missing pack expansion in this variadic function.',
      skeleton: `#include <utility>

template<typename T, typename... Args>
T* make(Args&&... args) {
    return new T(std::forward<Args>(args));  // Bug: missing expansion
}`,
      solution: `#include <utility>

template<typename T, typename... Args>
T* make(Args&&... args) {
    return new T(std::forward<Args>(args)...);  // Fixed
}`,
      hints: [
        'Pack expansion requires ... at the end of the pattern.',
        'Without ..., only the first argument would be forwarded.',
        'Add ... after std::forward<Args>(args).',
      ],
      concepts: ['pack-expansion', 'variadic-templates'],
    },
    {
      id: 'cpp-variadic-14',
      title: 'Fix: Infinite Recursion',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the missing base case that causes infinite recursion.',
      skeleton: `#include <iostream>

template<typename T, typename... Rest>
void print_all(T first, Rest... rest) {
    std::cout << first << " ";
    print_all(rest...);  // Bug: no base case when rest is empty
}

int main() {
    print_all(1, 2, 3);
}`,
      solution: `#include <iostream>

void print_all() {}  // Base case

template<typename T, typename... Rest>
void print_all(T first, Rest... rest) {
    std::cout << first << " ";
    print_all(rest...);
}

int main() {
    print_all(1, 2, 3);
}`,
      hints: [
        'When rest is empty, print_all() is called with no arguments.',
        'There must be a non-template overload for zero arguments.',
        'Add void print_all() {} as the base case.',
      ],
      concepts: ['recursive-unpacking', 'base-case'],
    },
    {
      id: 'cpp-variadic-15',
      title: 'Fix: Wrong Fold Direction',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the subtraction fold to compute left-to-right: ((1 - 2) - 3) = -4, not 1 - (2 - 3) = 2.',
      skeleton: `template<typename... Args>
auto left_sub(Args... args) {
    return (args - ...);  // Bug: right fold gives wrong result
}

// left_sub(1, 2, 3) should be -4, not 2`,
      solution: `template<typename... Args>
auto left_sub(Args... args) {
    return (... - args);  // Fixed: left fold
}

// left_sub(1, 2, 3) is now ((1 - 2) - 3) = -4`,
      hints: [
        'A right fold (args - ...) computes 1 - (2 - 3) = 2.',
        'A left fold (... - args) computes ((1 - 2) - 3) = -4.',
        'Move the ... to the left side of the operator.',
      ],
      concepts: ['fold-expression', 'fold-direction'],
    },
    {
      id: 'cpp-variadic-16',
      title: 'Predict: sizeof... Result',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Predict the output of sizeof... in different contexts.',
      skeleton: `#include <iostream>

template<typename... Ts>
void show_count(Ts... args) {
    std::cout << sizeof...(Ts) << " " << sizeof...(args) << std::endl;
}

int main() {
    show_count(1, 2.0, 'a', "hello");
}`,
      solution: `4 4`,
      hints: [
        'sizeof...(Ts) counts the type parameters.',
        'sizeof...(args) counts the value parameters.',
        'Both are 4 because 4 arguments were passed.',
      ],
      concepts: ['sizeof...', 'variadic-templates'],
    },
    {
      id: 'cpp-variadic-17',
      title: 'Predict: Fold Expression Result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the result of these fold expressions.',
      skeleton: `#include <iostream>

template<typename... Args>
auto product(Args... args) {
    return (args * ...);
}

template<typename... Args>
auto safe_product(Args... args) {
    return (1 * ... * args);
}

int main() {
    std::cout << product(2, 3, 4) << " ";
    std::cout << safe_product(2, 3, 4) << " ";
    std::cout << safe_product() << std::endl;
}`,
      solution: `24 24 1`,
      hints: [
        'product(2,3,4) = 2*3*4 = 24.',
        'safe_product(2,3,4) = 1*2*3*4 = 24.',
        'safe_product() with empty pack = 1 (the init value).',
      ],
      concepts: ['fold-expression', 'variadic-templates'],
    },
    {
      id: 'cpp-variadic-18',
      title: 'Predict: Recursive Unpacking',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the output of this recursive variadic function.',
      skeleton: `#include <iostream>

void show(int depth) {
    std::cout << depth << std::endl;
}

template<typename T, typename... Rest>
void show(int depth, T first, Rest... rest) {
    std::cout << depth << ":" << first << " ";
    show(depth + 1, rest...);
}

int main() {
    show(0, 'a', 'b', 'c');
}`,
      solution: `0:a 1:b 2:c 3`,
      hints: [
        'Each recursive call increments depth and removes the first arg.',
        '0:a, then 1:b, then 2:c, then show(3) prints just 3.',
        'The base case show(int) prints the final depth.',
      ],
      concepts: ['recursive-unpacking', 'variadic-templates'],
    },
    {
      id: 'cpp-variadic-19',
      title: 'Refactor: Overloads to Variadic',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor these multiple overloads into a single variadic template using fold expressions.',
      skeleton: `#include <iostream>

int add(int a) { return a; }
int add(int a, int b) { return a + b; }
int add(int a, int b, int c) { return a + b + c; }
int add(int a, int b, int c, int d) { return a + b + c + d; }

int main() {
    std::cout << add(1) << " " << add(1, 2) << " " << add(1, 2, 3) << std::endl;
}`,
      solution: `#include <iostream>

template<typename... Args>
auto add(Args... args) {
    return (args + ...);
}

int main() {
    std::cout << add(1) << " " << add(1, 2) << " " << add(1, 2, 3) << std::endl;
}`,
      hints: [
        'A single fold expression replaces all the overloads.',
        'Use (args + ...) to fold with addition.',
        'This works for any number of arguments.',
      ],
      concepts: ['fold-expression', 'refactoring', 'variadic-templates'],
    },
    {
      id: 'cpp-variadic-20',
      title: 'Refactor: Recursive to Fold',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor this recursive variadic print into a fold expression version.',
      skeleton: `#include <iostream>

void print_csv() {}

template<typename T>
void print_csv(T val) {
    std::cout << val;
}

template<typename T, typename... Rest>
void print_csv(T first, Rest... rest) {
    std::cout << first << ", ";
    print_csv(rest...);
}

int main() {
    print_csv(1, 2, 3, 4);
    std::cout << std::endl;
    // Output: 1, 2, 3, 4
}`,
      solution: `#include <iostream>

template<typename T, typename... Rest>
void print_csv(T first, Rest... rest) {
    std::cout << first;
    ((std::cout << ", " << rest), ...);
    std::cout << std::endl;
}

int main() {
    print_csv(1, 2, 3, 4);
    // Output: 1, 2, 3, 4
}`,
      hints: [
        'Print the first element separately, then fold the rest with comma prefix.',
        'Use a comma fold: ((std::cout << ", " << rest), ...).',
        'This avoids the trailing comma problem.',
      ],
      concepts: ['fold-expression', 'comma-fold', 'refactoring'],
    },
  ],
};
