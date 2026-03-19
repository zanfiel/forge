import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-tmpl-adv',
  title: '17. Templates (Advanced)',
  explanation: `## Templates (Advanced) in C++

Advanced template techniques unlock powerful compile-time programming.

### Full (Explicit) Specialization
Provide a completely custom implementation for specific types:
\`\`\`cpp
template <typename T>
class Printer {
public:
    void print(T val) { std::cout << val; }
};

template <>
class Printer<bool> {
public:
    void print(bool val) { std::cout << (val ? "true" : "false"); }
};
\`\`\`

### Partial Specialization (class templates only)
Specialize for a subset of types:
\`\`\`cpp
template <typename T>
class Storage<T*> {  // specialization for pointer types
    T* ptr;
};
\`\`\`

### Non-Type Template Parameters
Template parameters can be values, not just types:
\`\`\`cpp
template <typename T, int N>
class FixedArray {
    T data[N];
};
FixedArray<int, 10> arr;
\`\`\`

### Template Template Parameters
A template parameter that is itself a template:
\`\`\`cpp
template <typename T, template<typename> class Container>
class Adapter {
    Container<T> storage;
};
\`\`\`

### Class Template Argument Deduction (CTAD) - C++17
\`\`\`cpp
std::pair p(1, 2.0);    // deduced as std::pair<int, double>
std::vector v{1, 2, 3}; // deduced as std::vector<int>
\`\`\`
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-tmpl-adv-1',
      title: 'Full specialization syntax',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the syntax for a full template specialization.',
      skeleton: `template <typename T>
struct TypeName {
    static std::string name() { return "unknown"; }
};

__BLANK__
struct TypeName<int> {
    static std::string name() { return "int"; }
};`,
      solution: `template <typename T>
struct TypeName {
    static std::string name() { return "unknown"; }
};

template <>
struct TypeName<int> {
    static std::string name() { return "int"; }
};`,
      hints: [
        'A full specialization still needs the template keyword.',
        'But the parameter list is empty since all params are specified.',
        'Write `template <>`.',
      ],
      concepts: ['full-specialization', 'template-syntax'],
    },
    {
      id: 'cpp-tmpl-adv-2',
      title: 'Non-type template parameter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Add a non-type template parameter for the array size.',
      skeleton: `template <typename T, __BLANK__ N>
class FixedArray {
    T data[N];
public:
    T& operator[](int i) { return data[i]; }
    constexpr int size() const { return N; }
};`,
      solution: `template <typename T, int N>
class FixedArray {
    T data[N];
public:
    T& operator[](int i) { return data[i]; }
    constexpr int size() const { return N; }
};`,
      hints: [
        'Non-type template parameters specify a value, not a type.',
        'This parameter defines the array size at compile time.',
        'Write `int N` as the second template parameter.',
      ],
      concepts: ['non-type-parameter', 'compile-time'],
    },
    {
      id: 'cpp-tmpl-adv-3',
      title: 'Partial specialization for pointers',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fill in the partial specialization for pointer types.',
      skeleton: `template <typename T>
class Holder {
    T value;
public:
    Holder(T v) : value(v) {}
};

template <typename T>
class Holder__BLANK__ {
    T* ptr;
public:
    Holder(T* p) : ptr(p) {}
    T& deref() { return *ptr; }
};`,
      solution: `template <typename T>
class Holder {
    T value;
public:
    Holder(T v) : value(v) {}
};

template <typename T>
class Holder<T*> {
    T* ptr;
public:
    Holder(T* p) : ptr(p) {}
    T& deref() { return *ptr; }
};`,
      hints: [
        'Partial specialization specifies a pattern in the class name.',
        'This specialization handles when the type is a pointer.',
        'Write `<T*>` after the class name.',
      ],
      concepts: ['partial-specialization', 'pointer-types'],
    },
    {
      id: 'cpp-tmpl-adv-4',
      title: 'Template template parameter',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fill in the template template parameter.',
      skeleton: `template <typename T, __BLANK__<typename, typename> class Container>
class Queue {
    Container<T, std::allocator<T>> data;
public:
    void enqueue(const T& val) { data.push_back(val); }
};

Queue<int, std::vector> q;`,
      solution: `template <typename T, template<typename, typename> class Container>
class Queue {
    Container<T, std::allocator<T>> data;
public:
    void enqueue(const T& val) { data.push_back(val); }
};

Queue<int, std::vector> q;`,
      hints: [
        'A template template parameter accepts a template as an argument.',
        'It uses the template keyword inside the parameter list.',
        'Write `template` before the angle brackets.',
      ],
      concepts: ['template-template-parameter'],
    },
    {
      id: 'cpp-tmpl-adv-5',
      title: 'CTAD with deduction guide',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Add a deduction guide so the class template arguments can be deduced from the constructor.',
      skeleton: `template <typename T>
class Wrapper {
    T value;
public:
    Wrapper(T v) : value(v) {}
};

// Deduction guide
__BLANK__(T) -> Wrapper<T>;

Wrapper w(42);  // deduces Wrapper<int>`,
      solution: `template <typename T>
class Wrapper {
    T value;
public:
    Wrapper(T v) : value(v) {}
};

// Deduction guide
Wrapper(T) -> Wrapper<T>;

Wrapper w(42);  // deduces Wrapper<int>`,
      hints: [
        'A deduction guide maps constructor arguments to template arguments.',
        'It looks like a function declaration with -> return type.',
        'Start with the class name: `Wrapper`.',
      ],
      concepts: ['CTAD', 'deduction-guide'],
    },
    {
      id: 'cpp-tmpl-adv-6',
      title: 'auto non-type parameter (C++17)',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Use auto to let the compiler deduce the non-type parameter type.',
      skeleton: `template <__BLANK__ Value>
struct Constant {
    static constexpr auto value = Value;
};

Constant<42> ci;     // int
Constant<true> cb;   // bool`,
      solution: `template <auto Value>
struct Constant {
    static constexpr auto value = Value;
};

Constant<42> ci;     // int
Constant<true> cb;   // bool`,
      hints: [
        'C++17 allows deducing the type of non-type template parameters.',
        'Use a keyword that lets the compiler figure out the type.',
        'The keyword is `auto`.',
      ],
      concepts: ['auto-nttp', 'non-type-parameter'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-tmpl-adv-7',
      title: 'Write a full specialization',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a primary template and a full specialization for std::string that wraps the value in quotes.',
      skeleton: `#include <string>
#include <iostream>
// Write:
// - Primary template: Formatter<T> with static std::string format(T val) returning std::to_string(val)
// - Full specialization for std::string: returns '"' + val + '"'`,
      solution: `#include <string>
#include <iostream>

template <typename T>
struct Formatter {
    static std::string format(T val) { return std::to_string(val); }
};

template <>
struct Formatter<std::string> {
    static std::string format(const std::string& val) {
        return "\"" + val + "\"";
    }
};`,
      hints: [
        'The primary template uses std::to_string.',
        'The specialization uses template <> before the struct.',
        'Specify the full type in angle brackets after the struct name.',
      ],
      concepts: ['full-specialization', 'type-traits'],
    },
    {
      id: 'cpp-tmpl-adv-8',
      title: 'Write a partial specialization for arrays',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a primary template and a partial specialization for C-style arrays.',
      skeleton: `// Write:
// - Primary: template<typename T> struct IsArray with static constexpr bool value = false
// - Partial spec for T[N]: value = true, with static constexpr int size = N`,
      solution: `template <typename T>
struct IsArray {
    static constexpr bool value = false;
};

template <typename T, int N>
struct IsArray<T[N]> {
    static constexpr bool value = true;
    static constexpr int size = N;
};`,
      hints: [
        'The partial specialization matches the pattern T[N].',
        'It introduces a new non-type parameter N for the array size.',
        'Both T and N remain free in the specialization.',
      ],
      concepts: ['partial-specialization', 'type-traits'],
    },
    {
      id: 'cpp-tmpl-adv-9',
      title: 'Write a compile-time factorial',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a template struct that computes factorial at compile time using non-type parameters.',
      skeleton: `// Write:
// - template<int N> struct Factorial with static constexpr int value = N * Factorial<N-1>::value
// - Specialization for N=0: value = 1
// Usage: Factorial<5>::value == 120`,
      solution: `template <int N>
struct Factorial {
    static constexpr int value = N * Factorial<N - 1>::value;
};

template <>
struct Factorial<0> {
    static constexpr int value = 1;
};`,
      hints: [
        'The primary template recursively references Factorial<N-1>.',
        'The base case is a full specialization for N=0.',
        'constexpr ensures the computation happens at compile time.',
      ],
      concepts: ['template-metaprogramming', 'non-type-parameter', 'recursion'],
    },
    {
      id: 'cpp-tmpl-adv-10',
      title: 'Write a FixedArray with non-type param',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a FixedArray<T, N> class template with a fill() method and bounds-checked at().',
      skeleton: `#include <stdexcept>
// Write template<typename T, int N> class FixedArray with:
// - T data[N]
// - void fill(const T& val) - fills all elements
// - T& at(int i) - bounds-checked access
// - constexpr int size() const`,
      solution: `#include <stdexcept>

template <typename T, int N>
class FixedArray {
    T data[N];
public:
    void fill(const T& val) {
        for (int i = 0; i < N; ++i) data[i] = val;
    }
    T& at(int i) {
        if (i < 0 || i >= N) throw std::out_of_range("index out of range");
        return data[i];
    }
    const T& at(int i) const {
        if (i < 0 || i >= N) throw std::out_of_range("index out of range");
        return data[i];
    }
    constexpr int size() const { return N; }
};`,
      hints: [
        'N is a non-type template parameter used as the array size.',
        'fill() loops from 0 to N, setting each element.',
        'at() throws std::out_of_range for invalid indices.',
      ],
      concepts: ['non-type-parameter', 'bounds-checking', 'class-template'],
    },
    {
      id: 'cpp-tmpl-adv-11',
      title: 'Write a type trait: is_same',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Implement a simple is_same type trait that checks if two types are identical.',
      skeleton: `// Write:
// - Primary template: is_same<T, U> with static constexpr bool value = false
// - Partial specialization: is_same<T, T> with value = true`,
      solution: `template <typename T, typename U>
struct is_same {
    static constexpr bool value = false;
};

template <typename T>
struct is_same<T, T> {
    static constexpr bool value = true;
};`,
      hints: [
        'The primary template assumes the types are different.',
        'The partial specialization matches when both params are the same type.',
        'is_same<int, int>::value is true, is_same<int, double>::value is false.',
      ],
      concepts: ['type-traits', 'partial-specialization'],
    },
    {
      id: 'cpp-tmpl-adv-12',
      title: 'Write a CTAD-friendly container',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a MinMax class template with a deduction guide so types are deduced from constructor args.',
      skeleton: `// Write template<typename T> class MinMax that stores min and max of two values.
// - Constructor takes two T values
// - T getMin() const, T getMax() const
// - Add a deduction guide
// Usage: MinMax mm(3, 7); // deduces MinMax<int>`,
      solution: `template <typename T>
class MinMax {
    T lo, hi;
public:
    MinMax(T a, T b) : lo(a < b ? a : b), hi(a < b ? b : a) {}
    T getMin() const { return lo; }
    T getMax() const { return hi; }
};

template <typename T>
MinMax(T, T) -> MinMax<T>;`,
      hints: [
        'The constructor takes two T values and stores the smaller and larger.',
        'The deduction guide maps (T, T) to MinMax<T>.',
        'With C++17, the guide allows MinMax mm(3, 7) to compile.',
      ],
      concepts: ['CTAD', 'deduction-guide', 'class-template'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-tmpl-adv-13',
      title: 'Fix: dependent name needs typename',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fix the code by adding typename where needed for dependent names.',
      skeleton: `template <typename Container>
void printFirst(const Container& c) {
    // Bug: Container::const_iterator is a dependent name
    Container::const_iterator it = c.begin();
    std::cout << *it << std::endl;
}`,
      solution: `template <typename Container>
void printFirst(const Container& c) {
    typename Container::const_iterator it = c.begin();
    std::cout << *it << std::endl;
}`,
      hints: [
        'When a type depends on a template parameter, the compiler needs a hint.',
        'Without the hint, it assumes the name is a value, not a type.',
        'Add `typename` before `Container::const_iterator`.',
      ],
      concepts: ['dependent-name', 'typename', 'two-phase-lookup'],
    },
    {
      id: 'cpp-tmpl-adv-14',
      title: 'Fix: specialization after use',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fix the error by reordering the specialization.',
      skeleton: `template <typename T>
struct Traits {
    static std::string name() { return "generic"; }
};

// Bug: using Traits<int> before its specialization
void test() {
    std::cout << Traits<int>::name();
}

template <>
struct Traits<int> {
    static std::string name() { return "integer"; }
};`,
      solution: `template <typename T>
struct Traits {
    static std::string name() { return "generic"; }
};

template <>
struct Traits<int> {
    static std::string name() { return "integer"; }
};

void test() {
    std::cout << Traits<int>::name();
}`,
      hints: [
        'Specializations must be declared before they are used.',
        'The function uses Traits<int> before the specialization is defined.',
        'Move the specialization before the function that uses it.',
      ],
      concepts: ['specialization-order', 'declaration-order'],
    },
    {
      id: 'cpp-tmpl-adv-15',
      title: 'Fix: non-type parameter type mismatch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the non-type parameter to match the usage.',
      skeleton: `template <typename T, int N>
class Buffer {
    T data[N];
};

int main() {
    // Bug: 256u is unsigned, but N is int
    Buffer<char, 256u> buf;
    return 0;
}`,
      solution: `template <typename T, unsigned int N>
class Buffer {
    T data[N];
};

int main() {
    Buffer<char, 256u> buf;
    return 0;
}`,
      hints: [
        'The template parameter N is int, but 256u is unsigned.',
        'This can cause a narrowing conversion warning or error.',
        'Change the parameter type to unsigned int, or remove the u suffix.',
      ],
      concepts: ['non-type-parameter', 'type-mismatch'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-tmpl-adv-16',
      title: 'Predict: specialization selection',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict which specialization is selected.',
      skeleton: `#include <iostream>

template <typename T>
struct Tag { static void print() { std::cout << "general "; } };

template <>
struct Tag<int> { static void print() { std::cout << "int "; } };

template <>
struct Tag<double> { static void print() { std::cout << "double "; } };

int main() {
    Tag<float>::print();
    Tag<int>::print();
    Tag<double>::print();
    return 0;
}`,
      solution: `general int double `,
      hints: [
        'float has no specialization, so it uses the primary template.',
        'int and double have explicit specializations.',
        'Output: general int double.',
      ],
      concepts: ['full-specialization', 'template-selection'],
    },
    {
      id: 'cpp-tmpl-adv-17',
      title: 'Predict: non-type parameter computation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the compile-time computed value.',
      skeleton: `#include <iostream>

template <int N>
struct Fib {
    static constexpr int value = Fib<N-1>::value + Fib<N-2>::value;
};

template <>
struct Fib<0> { static constexpr int value = 0; };

template <>
struct Fib<1> { static constexpr int value = 1; };

int main() {
    std::cout << Fib<6>::value << std::endl;
    return 0;
}`,
      solution: `8`,
      hints: [
        'Fib<6> = Fib<5> + Fib<4> = 5 + 3 = 8.',
        'The sequence: 0, 1, 1, 2, 3, 5, 8.',
        'Output: 8.',
      ],
      concepts: ['template-metaprogramming', 'compile-time-computation'],
    },
    {
      id: 'cpp-tmpl-adv-18',
      title: 'Predict: partial specialization for pointers',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Predict which specialization is chosen for pointer types.',
      skeleton: `#include <iostream>

template <typename T>
struct Info { static void show() { std::cout << "value "; } };

template <typename T>
struct Info<T*> { static void show() { std::cout << "pointer "; } };

template <typename T>
struct Info<T**> { static void show() { std::cout << "ptr-to-ptr "; } };

int main() {
    Info<int>::show();
    Info<int*>::show();
    Info<int**>::show();
    return 0;
}`,
      solution: `value pointer ptr-to-ptr `,
      hints: [
        'int matches the primary template.',
        'int* matches the T* partial specialization.',
        'int** matches the T** partial specialization (more specific).',
      ],
      concepts: ['partial-specialization', 'template-matching'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-tmpl-adv-19',
      title: 'Refactor: runtime size to non-type parameter',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor the class to use a non-type template parameter instead of a runtime size.',
      skeleton: `class BitSet {
    bool* bits;
    int size;
public:
    BitSet(int n) : size(n), bits(new bool[n]{}) {}
    ~BitSet() { delete[] bits; }
    void set(int i) { bits[i] = true; }
    bool test(int i) const { return bits[i]; }
    int getSize() const { return size; }
};`,
      solution: `template <int N>
class BitSet {
    bool bits[N] = {};
public:
    void set(int i) { bits[i] = true; }
    bool test(int i) const { return bits[i]; }
    constexpr int getSize() const { return N; }
};`,
      hints: [
        'Replace the runtime size with a template non-type parameter.',
        'The array can be a fixed-size member instead of dynamically allocated.',
        'No constructor, destructor, or pointer needed.',
      ],
      concepts: ['non-type-parameter', 'compile-time', 'RAII'],
    },
    {
      id: 'cpp-tmpl-adv-20',
      title: 'Refactor: add specialization for C-strings',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Add a specialization for const char* that compares by string content instead of pointer value.',
      skeleton: `template <typename T>
bool isEqual(T a, T b) {
    return a == b;
}

// Problem: isEqual("hello", "hello") compares pointers, not content
// Add a specialization for const char* that uses strcmp`,
      solution: `#include <cstring>

template <typename T>
bool isEqual(T a, T b) {
    return a == b;
}

template <>
bool isEqual<const char*>(const char* a, const char* b) {
    return std::strcmp(a, b) == 0;
}`,
      hints: [
        'const char* comparison with == compares pointer addresses.',
        'A full specialization for const char* can use std::strcmp.',
        'Use template <> and specify the type explicitly.',
      ],
      concepts: ['full-specialization', 'c-string', 'function-template'],
    },
  ],
};
