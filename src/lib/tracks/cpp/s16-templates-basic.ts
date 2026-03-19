import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-tmpl-basic',
  title: '16. Templates (Basic)',
  explanation: `## Templates (Basic) in C++

Templates allow writing generic code that works with any type.

### Function Templates
\`\`\`cpp
template <typename T>
T max(T a, T b) {
    return (a > b) ? a : b;
}

int x = max(3, 7);         // T deduced as int
double y = max(1.5, 2.3);  // T deduced as double
\`\`\`

### Class Templates
\`\`\`cpp
template <typename T>
class Box {
    T value;
public:
    Box(T v) : value(v) {}
    T get() const { return value; }
};

Box<int> bi(42);
Box<std::string> bs("hello");
\`\`\`

### Template Argument Deduction
The compiler can often deduce template arguments from function arguments:
\`\`\`cpp
template <typename T>
void print(T val) { std::cout << val; }
print(42);       // T = int (deduced)
print("hello");  // T = const char* (deduced)
\`\`\`

### Explicit Instantiation
You can explicitly request a specific instantiation:
\`\`\`cpp
template int max<int>(int, int);  // explicit instantiation
int x = max<double>(3, 7);       // explicit template argument
\`\`\`

### Multiple Template Parameters
\`\`\`cpp
template <typename T, typename U>
auto add(T a, U b) -> decltype(a + b) {
    return a + b;
}
\`\`\`
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-tmpl-basic-1',
      title: 'Template function syntax',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the template declaration.',
      skeleton: `__BLANK__ <typename T>
T square(T x) {
    return x * x;
}`,
      solution: `template <typename T>
T square(T x) {
    return x * x;
}`,
      hints: [
        'This keyword introduces a generic definition.',
        'It comes before the angle brackets.',
        'The keyword is `template`.',
      ],
      concepts: ['function-template', 'template-syntax'],
    },
    {
      id: 'cpp-tmpl-basic-2',
      title: 'Template type parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the keyword that declares a type parameter.',
      skeleton: `template <__BLANK__ T>
T identity(T val) {
    return val;
}`,
      solution: `template <typename T>
T identity(T val) {
    return val;
}`,
      hints: [
        'This keyword declares that T is a type parameter.',
        'An alternative keyword is `class`.',
        'The keyword is `typename`.',
      ],
      concepts: ['typename', 'template-parameter'],
    },
    {
      id: 'cpp-tmpl-basic-3',
      title: 'Explicit template argument',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Explicitly specify the template argument to avoid ambiguity.',
      skeleton: `template <typename T>
T convert(double val) {
    return static_cast<T>(val);
}

int main() {
    int x = convert__BLANK__(3.14);
    return 0;
}`,
      solution: `template <typename T>
T convert(double val) {
    return static_cast<T>(val);
}

int main() {
    int x = convert<int>(3.14);
    return 0;
}`,
      hints: [
        'T cannot be deduced from the argument since the parameter is always double.',
        'You must specify T explicitly in angle brackets.',
        'Write `<int>` after the function name.',
      ],
      concepts: ['explicit-template-argument', 'template-deduction'],
    },
    {
      id: 'cpp-tmpl-basic-4',
      title: 'Class template instantiation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Instantiate the class template with the correct type.',
      skeleton: `template <typename T>
class Wrapper {
    T value;
public:
    Wrapper(T v) : value(v) {}
    T get() const { return value; }
};

int main() {
    Wrapper__BLANK__ w(42);
    return 0;
}`,
      solution: `template <typename T>
class Wrapper {
    T value;
public:
    Wrapper(T v) : value(v) {}
    T get() const { return value; }
};

int main() {
    Wrapper<int> w(42);
    return 0;
}`,
      hints: [
        'Class templates require explicit type arguments (before C++17 CTAD).',
        'Specify the type in angle brackets.',
        'Write `<int>` to store an integer.',
      ],
      concepts: ['class-template', 'template-instantiation'],
    },
    {
      id: 'cpp-tmpl-basic-5',
      title: 'Multiple template parameters',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Add a second template parameter.',
      skeleton: `template <typename T, __BLANK__ U>
auto makePair(T first, U second) {
    return std::pair<T, U>(first, second);
}`,
      solution: `template <typename T, typename U>
auto makePair(T first, U second) {
    return std::pair<T, U>(first, second);
}`,
      hints: [
        'Each type parameter needs its own typename keyword.',
        'Separate multiple parameters with commas.',
        'Write `typename U`.',
      ],
      concepts: ['multiple-template-parameters', 'typename'],
    },
    {
      id: 'cpp-tmpl-basic-6',
      title: 'Template with default argument',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Provide a default template argument.',
      skeleton: `template <typename T __BLANK__ int>
class Container {
    T value;
public:
    Container(T v) : value(v) {}
    T get() const { return value; }
};

Container<> c(42);  // uses default T = int`,
      solution: `template <typename T = int>
class Container {
    T value;
public:
    Container(T v) : value(v) {}
    T get() const { return value; }
};

Container<> c(42);  // uses default T = int`,
      hints: [
        'Template parameters can have defaults, just like function parameters.',
        'Use the assignment syntax.',
        'Write `= int` after T.',
      ],
      concepts: ['default-template-argument', 'class-template'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-tmpl-basic-7',
      title: 'Write a generic swap function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a template function that swaps two values of any type.',
      skeleton: `// Write a template function mySwap(T& a, T& b) that swaps two values.`,
      solution: `template <typename T>
void mySwap(T& a, T& b) {
    T temp = std::move(a);
    a = std::move(b);
    b = std::move(temp);
}`,
      hints: [
        'Take both parameters by reference.',
        'Use a temporary variable to hold one value during the swap.',
        'Use std::move for efficiency with non-trivial types.',
      ],
      concepts: ['function-template', 'swap'],
    },
    {
      id: 'cpp-tmpl-basic-8',
      title: 'Write a generic Stack class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a template Stack class using std::vector internally.',
      skeleton: `#include <vector>
#include <stdexcept>
// Write template class Stack<T> with:
// - push(const T&), pop(), top() const, empty() const, size() const`,
      solution: `#include <vector>
#include <stdexcept>

template <typename T>
class Stack {
    std::vector<T> data;
public:
    void push(const T& val) { data.push_back(val); }
    void pop() {
        if (data.empty()) throw std::runtime_error("empty stack");
        data.pop_back();
    }
    const T& top() const {
        if (data.empty()) throw std::runtime_error("empty stack");
        return data.back();
    }
    bool empty() const { return data.empty(); }
    std::size_t size() const { return data.size(); }
};`,
      hints: [
        'Use std::vector<T> as the internal container.',
        'top() should return const T& for efficiency.',
        'Throw an exception when operating on an empty stack.',
      ],
      concepts: ['class-template', 'vector', 'generic-programming'],
    },
    {
      id: 'cpp-tmpl-basic-9',
      title: 'Write a generic find function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a template function that searches a C-style array for a value and returns its index or -1.',
      skeleton: `// Write: template<typename T>
// int findIndex(const T arr[], int size, const T& target)
// Returns index of target or -1 if not found.`,
      solution: `template <typename T>
int findIndex(const T arr[], int size, const T& target) {
    for (int i = 0; i < size; ++i) {
        if (arr[i] == target) return i;
    }
    return -1;
}`,
      hints: [
        'Loop through the array comparing each element to target.',
        'Return the index when found.',
        'Return -1 after the loop if not found.',
      ],
      concepts: ['function-template', 'linear-search'],
    },
    {
      id: 'cpp-tmpl-basic-10',
      title: 'Write a Pair class template',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a Pair<T, U> class template with first/second members and a make_pair helper.',
      skeleton: `// Write:
// - template class Pair<T, U> with public T first, U second
// - constructor taking T and U
// - template function makePair(T, U) that returns a Pair`,
      solution: `template <typename T, typename U>
class Pair {
public:
    T first;
    U second;
    Pair(T f, U s) : first(std::move(f)), second(std::move(s)) {}
};

template <typename T, typename U>
Pair<T, U> makePair(T f, U s) {
    return Pair<T, U>(std::move(f), std::move(s));
}`,
      hints: [
        'Pair needs two template parameters.',
        'makePair is a separate function template that constructs a Pair.',
        'The compiler deduces T and U from the function arguments.',
      ],
      concepts: ['class-template', 'function-template', 'factory-function'],
    },
    {
      id: 'cpp-tmpl-basic-11',
      title: 'Write a generic print function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a template function that prints any value followed by a newline.',
      skeleton: `#include <iostream>
// Write: template function println(const T& val)
// that outputs val followed by std::endl`,
      solution: `#include <iostream>

template <typename T>
void println(const T& val) {
    std::cout << val << std::endl;
}`,
      hints: [
        'Take the parameter by const reference for efficiency.',
        'Use std::cout with the << operator.',
        'Append std::endl for the newline.',
      ],
      concepts: ['function-template', 'output-stream'],
    },
    {
      id: 'cpp-tmpl-basic-12',
      title: 'Write a generic accumulate function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a template function that accumulates values in an array using a given initial value.',
      skeleton: `// Write: template<typename T>
// T accumulate(const T arr[], int size, T init)
// Returns the sum of init + all elements in arr`,
      solution: `template <typename T>
T accumulate(const T arr[], int size, T init) {
    T result = init;
    for (int i = 0; i < size; ++i) {
        result = result + arr[i];
    }
    return result;
}`,
      hints: [
        'Start with result = init.',
        'Add each array element to result.',
        'Return the accumulated result.',
      ],
      concepts: ['function-template', 'accumulation', 'generic-algorithm'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-tmpl-basic-13',
      title: 'Fix: missing template keyword',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the compilation error in this generic function.',
      skeleton: `<typename T>
T doubleIt(T val) {
    return val + val;
}`,
      solution: `template <typename T>
T doubleIt(T val) {
    return val + val;
}`,
      hints: [
        'The angle brackets need a keyword before them.',
        'Without it, the compiler does not know this is a template.',
        'Add `template` before `<typename T>`.',
      ],
      concepts: ['template-syntax', 'function-template'],
    },
    {
      id: 'cpp-tmpl-basic-14',
      title: 'Fix: template definition in .cpp file',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the linker error caused by separating template declaration and definition.',
      skeleton: `// math.h
template <typename T>
T add(T a, T b);

// math.cpp
#include "math.h"
template <typename T>
T add(T a, T b) { return a + b; }

// main.cpp
#include "math.h"
int main() {
    int x = add(1, 2);  // LINKER ERROR: undefined reference
    return 0;
}`,
      solution: `// math.h
template <typename T>
T add(T a, T b) {
    return a + b;
}

// main.cpp
#include "math.h"
int main() {
    int x = add(1, 2);
    return 0;
}`,
      hints: [
        'Templates must be visible at the point of instantiation.',
        'Putting the definition in a .cpp file means other translation units cannot see it.',
        'Move the template definition into the header file.',
      ],
      concepts: ['template-definition', 'header-file', 'linker-error'],
    },
    {
      id: 'cpp-tmpl-basic-15',
      title: 'Fix: ambiguous template deduction',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the call so the compiler can deduce the template argument.',
      skeleton: `template <typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    // Bug: T deduced as int from 3 but double from 4.5 - ambiguous
    auto result = maximum(3, 4.5);
    return 0;
}`,
      solution: `template <typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    auto result = maximum<double>(3, 4.5);
    return 0;
}`,
      hints: [
        'The compiler deduces T=int from 3 and T=double from 4.5.',
        'These conflict, causing a deduction failure.',
        'Explicitly specify the template argument: maximum<double>(3, 4.5).',
      ],
      concepts: ['template-deduction', 'explicit-template-argument'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-tmpl-basic-16',
      title: 'Predict: template deduction',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Predict the output of this template function.',
      skeleton: `#include <iostream>

template <typename T>
void show(T val) {
    std::cout << val << " ";
}

int main() {
    show(42);
    show(3.14);
    show('A');
    return 0;
}`,
      solution: `42 3.14 A `,
      hints: [
        'T is deduced as int, double, and char respectively.',
        'Each value is printed followed by a space.',
        'Output: 42 3.14 A.',
      ],
      concepts: ['template-deduction', 'function-template'],
    },
    {
      id: 'cpp-tmpl-basic-17',
      title: 'Predict: class template with different types',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the output.',
      skeleton: `#include <iostream>

template <typename T>
class Box {
    T val;
public:
    Box(T v) : val(v) {}
    T get() const { return val; }
};

int main() {
    Box<int> a(10);
    Box<double> b(2.5);
    std::cout << a.get() + b.get() << std::endl;
    return 0;
}`,
      solution: `12.5`,
      hints: [
        'a.get() returns 10 (int), b.get() returns 2.5 (double).',
        '10 + 2.5 = 12.5 (promoted to double).',
        'Output: 12.5.',
      ],
      concepts: ['class-template', 'type-promotion'],
    },
    {
      id: 'cpp-tmpl-basic-18',
      title: 'Predict: sizeof different instantiations',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Predict what this program prints (assume typical sizes).',
      skeleton: `#include <iostream>

template <typename T>
struct Holder {
    T value;
};

int main() {
    std::cout << (sizeof(Holder<char>) < sizeof(Holder<double>)) << std::endl;
    return 0;
}`,
      solution: `1`,
      hints: [
        'Holder<char> contains a char (1 byte), Holder<double> contains a double (8 bytes).',
        'sizeof(Holder<char>) < sizeof(Holder<double>) is true.',
        'true prints as 1.',
      ],
      concepts: ['sizeof', 'template-instantiation'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-tmpl-basic-19',
      title: 'Refactor: overloaded functions to template',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Replace the duplicated overloads with a single function template.',
      skeleton: `int minVal(int a, int b) { return a < b ? a : b; }
double minVal(double a, double b) { return a < b ? a : b; }
long minVal(long a, long b) { return a < b ? a : b; }`,
      solution: `template <typename T>
T minVal(T a, T b) {
    return a < b ? a : b;
}`,
      hints: [
        'All three functions have identical logic.',
        'Replace the concrete type with a template parameter T.',
        'One template function replaces all three overloads.',
      ],
      concepts: ['function-template', 'DRY', 'generic-programming'],
    },
    {
      id: 'cpp-tmpl-basic-20',
      title: 'Refactor: type-specific classes to class template',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Replace duplicate classes with a single class template.',
      skeleton: `class IntStack {
    std::vector<int> data;
public:
    void push(int v) { data.push_back(v); }
    int pop() { int v = data.back(); data.pop_back(); return v; }
    bool empty() const { return data.empty(); }
};

class StringStack {
    std::vector<std::string> data;
public:
    void push(std::string v) { data.push_back(std::move(v)); }
    std::string pop() { std::string v = std::move(data.back()); data.pop_back(); return v; }
    bool empty() const { return data.empty(); }
};`,
      solution: `template <typename T>
class Stack {
    std::vector<T> data;
public:
    void push(T v) { data.push_back(std::move(v)); }
    T pop() { T v = std::move(data.back()); data.pop_back(); return v; }
    bool empty() const { return data.empty(); }
};

// Usage: Stack<int>, Stack<std::string>`,
      hints: [
        'Both classes have identical structure, just different element types.',
        'Replace int/string with a template parameter T.',
        'One Stack<T> class replaces both.',
      ],
      concepts: ['class-template', 'DRY', 'refactoring'],
    },
  ],
};
