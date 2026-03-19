import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-fwd',
  title: '36. Perfect Forwarding',
  explanation: `## Perfect Forwarding in C++\n\nPerfect forwarding preserves the **value category** (lvalue/rvalue) and **const-ness** of arguments when passing them through template functions. This is essential for writing generic wrapper functions that do not lose performance.\n\n### Forwarding References (Universal References)\n\nA forwarding reference is declared as \`T&&\` where \`T\` is a deduced template parameter:\n\n\`\`\`cpp\ntemplate<typename T>\nvoid wrapper(T&& arg) {\n    // arg is a forwarding reference\n    inner(std::forward<T>(arg));\n}\n\`\`\`\n\n### Reference Collapsing Rules\n\nWhen references to references form, they collapse:\n\n| Input       | Result  |\n|-------------|---------|  \n| T& &        | T&      |\n| T& &&       | T&      |\n| T&& &       | T&      |\n| T&& &&      | T&&     |\n\nOnly rvalue-ref + rvalue-ref produces an rvalue reference.\n\n### std::forward\n\n\`std::forward<T>(arg)\` casts arg back to the value category it was originally passed as:\n\n\`\`\`cpp\ntemplate<typename T>\nvoid relay(T&& arg) {\n    // If called with lvalue: T = X&, forward returns X&\n    // If called with rvalue: T = X,  forward returns X&&\n    target(std::forward<T>(arg));\n}\n\`\`\`\n\n### emplace_back\n\n\`emplace_back\` uses perfect forwarding to construct elements in-place:\n\n\`\`\`cpp\nstd::vector<std::string> v;\nv.emplace_back("hello"); // forwards const char* to string constructor\nv.emplace_back(5, 'x');  // forwards (5, 'x') to string(5, 'x') = "xxxxx"\n\`\`\`\n\n### Common Patterns\n\n\`\`\`cpp\n// Factory function\ntemplate<typename T, typename... Args>\nstd::unique_ptr<T> make(Args&&... args) {\n    return std::unique_ptr<T>(new T(std::forward<Args>(args)...));\n}\n\`\`\``,
  exercises: [
    {
      id: 'cpp-fwd-1',
      title: 'Identify a Forwarding Reference',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to declare a forwarding reference parameter.',
      skeleton: `template<typename T>
void wrapper(T___ arg) {
    process(std::forward<T>(arg));
}`,
      solution: `template<typename T>
void wrapper(T&& arg) {
    process(std::forward<T>(arg));
}`,
      hints: [
        'A forwarding reference uses && with a deduced template parameter.',
        'T&& where T is deduced creates a forwarding reference.',
        'Fill in "&&".',
      ],
      concepts: ['perfect-forwarding', 'forwarding-reference'],
    },
    {
      id: 'cpp-fwd-2',
      title: 'Use std::forward',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to perfectly forward the argument.',
      skeleton: `#include <utility>

template<typename T>
void relay(T&& arg) {
    target(std::___<T>(arg));
}`,
      solution: `#include <utility>

template<typename T>
void relay(T&& arg) {
    target(std::forward<T>(arg));
}`,
      hints: [
        'std::forward preserves the original value category.',
        'It is the key function for perfect forwarding.',
        'Fill in "forward".',
      ],
      concepts: ['perfect-forwarding', 'std-forward'],
    },
    {
      id: 'cpp-fwd-3',
      title: 'Forward Template Type Parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to specify the correct template argument to std::forward.',
      skeleton: `template<typename T>
void log_and_call(T&& arg) {
    std::cout << "calling..." << std::endl;
    do_work(std::forward<___>(arg));
}`,
      solution: `template<typename T>
void log_and_call(T&& arg) {
    std::cout << "calling..." << std::endl;
    do_work(std::forward<T>(arg));
}`,
      hints: [
        'std::forward needs the original template parameter to determine the value category.',
        'Use the same type parameter T that was deduced.',
        'Fill in "T".',
      ],
      concepts: ['perfect-forwarding', 'std-forward'],
    },
    {
      id: 'cpp-fwd-4',
      title: 'emplace_back',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to construct a string in-place in the vector.',
      skeleton: `#include <vector>
#include <string>

int main() {
    std::vector<std::string> v;
    v.___(5, 'x'); // constructs "xxxxx" in-place
}`,
      solution: `#include <vector>
#include <string>

int main() {
    std::vector<std::string> v;
    v.emplace_back(5, 'x'); // constructs "xxxxx" in-place
}`,
      hints: [
        'emplace_back forwards arguments to the element constructor.',
        'It constructs the element in-place without copies or moves.',
        'Fill in "emplace_back".',
      ],
      concepts: ['perfect-forwarding', 'emplace-back'],
    },
    {
      id: 'cpp-fwd-5',
      title: 'Reference Collapsing Result',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the collapsed reference type when T = int& in T&&.',
      skeleton: `// Given: template<typename T> void f(T&& arg);
// Called as: int x = 5; f(x);
// T is deduced as: int&
// T&& becomes: int& && which collapses to: int___`,
      solution: `// Given: template<typename T> void f(T&& arg);
// Called as: int x = 5; f(x);
// T is deduced as: int&
// T&& becomes: int& && which collapses to: int&`,
      hints: [
        'Reference collapsing: & && collapses to &.',
        'Only && && produces &&; everything else produces &.',
        'Fill in "&".',
      ],
      concepts: ['perfect-forwarding', 'reference-collapsing'],
    },
    {
      id: 'cpp-fwd-6',
      title: 'Variadic Perfect Forwarding',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to perfectly forward a variadic parameter pack.',
      skeleton: `#include <utility>
#include <memory>

template<typename T, typename... Args>
std::unique_ptr<T> my_make_unique(Args&&... args) {
    return std::unique_ptr<T>(new T(std::forward<Args>(args)___));
}`,
      solution: `#include <utility>
#include <memory>

template<typename T, typename... Args>
std::unique_ptr<T> my_make_unique(Args&&... args) {
    return std::unique_ptr<T>(new T(std::forward<Args>(args)...));
}`,
      hints: [
        'Expanding a forwarded pack requires the ... after the forward expression.',
        'std::forward<Args>(args)... expands to forward each argument.',
        'Fill in "...".',
      ],
      concepts: ['perfect-forwarding', 'parameter-packs', 'pack-expansion'],
    },
    {
      id: 'cpp-fwd-7',
      title: 'Write a Perfect Forwarding Wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function template timed_call that takes a callable and its arguments, perfectly forwards them, and returns the result.',
      skeleton: `#include <utility>
#include <iostream>
#include <chrono>

// Write timed_call here

int add(int a, int b) { return a + b; }

int main() {
    int result = timed_call(add, 3, 4);
    std::cout << result << std::endl; // 7
}`,
      solution: `#include <utility>
#include <iostream>
#include <chrono>

template<typename F, typename... Args>
auto timed_call(F&& func, Args&&... args) {
    auto start = std::chrono::steady_clock::now();
    auto result = std::forward<F>(func)(std::forward<Args>(args)...);
    auto end = std::chrono::steady_clock::now();
    auto ms = std::chrono::duration_cast<std::chrono::microseconds>(end - start).count();
    std::cout << "Took " << ms << "us" << std::endl;
    return result;
}

int add(int a, int b) { return a + b; }

int main() {
    int result = timed_call(add, 3, 4);
    std::cout << result << std::endl; // 7
}`,
      hints: [
        'Use template<typename F, typename... Args> for the callable and arguments.',
        'Forward both the function and arguments: std::forward<F>(func)(std::forward<Args>(args)...).',
        'Use auto return type for deduction.',
      ],
      concepts: ['perfect-forwarding', 'variadic-templates', 'callable-wrapper'],
    },
    {
      id: 'cpp-fwd-8',
      title: 'Write a make_unique Clone',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write my_make_unique<T>(args...) that creates a unique_ptr by perfectly forwarding constructor arguments.',
      skeleton: `#include <memory>
#include <string>
#include <iostream>

// Write my_make_unique here

int main() {
    auto p1 = my_make_unique<int>(42);
    auto p2 = my_make_unique<std::string>("hello");
    auto p3 = my_make_unique<std::string>(5, 'x');
    std::cout << *p1 << " " << *p2 << " " << *p3 << std::endl;
    // 42 hello xxxxx
}`,
      solution: `#include <memory>
#include <string>
#include <iostream>

template<typename T, typename... Args>
std::unique_ptr<T> my_make_unique(Args&&... args) {
    return std::unique_ptr<T>(new T(std::forward<Args>(args)...));
}

int main() {
    auto p1 = my_make_unique<int>(42);
    auto p2 = my_make_unique<std::string>("hello");
    auto p3 = my_make_unique<std::string>(5, 'x');
    std::cout << *p1 << " " << *p2 << " " << *p3 << std::endl;
    // 42 hello xxxxx
}`,
      hints: [
        'Template parameters: typename T, typename... Args.',
        'Forward all arguments to the constructor: new T(std::forward<Args>(args)...).',
        'Wrap in std::unique_ptr<T>.',
      ],
      concepts: ['perfect-forwarding', 'make-unique', 'factory-pattern'],
    },
    {
      id: 'cpp-fwd-9',
      title: 'Write an Emplace Wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function add_to_vector that takes a vector reference and arguments, and emplaces a new element at the back.',
      skeleton: `#include <vector>
#include <string>
#include <utility>
#include <iostream>

// Write add_to_vector here

int main() {
    std::vector<std::string> v;
    add_to_vector(v, "hello");
    add_to_vector(v, 3, '!');
    for (auto& s : v) std::cout << s << " ";
    // hello !!!
}`,
      solution: `#include <vector>
#include <string>
#include <utility>
#include <iostream>

template<typename T, typename... Args>
void add_to_vector(std::vector<T>& vec, Args&&... args) {
    vec.emplace_back(std::forward<Args>(args)...);
}

int main() {
    std::vector<std::string> v;
    add_to_vector(v, "hello");
    add_to_vector(v, 3, '!');
    for (auto& s : v) std::cout << s << " ";
    // hello !!!
}`,
      hints: [
        'Take the vector by reference and arguments as a forwarding pack.',
        'Forward all arguments to emplace_back.',
        'vec.emplace_back(std::forward<Args>(args)...);',
      ],
      concepts: ['perfect-forwarding', 'emplace-back', 'variadic-templates'],
    },
    {
      id: 'cpp-fwd-10',
      title: 'Write a Forwarding Constructor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a Wrapper<T> class with a forwarding constructor that constructs T in-place from any arguments.',
      skeleton: `#include <utility>
#include <string>
#include <iostream>

// Write Wrapper<T> with a forwarding constructor

int main() {
    Wrapper<std::string> w1("hello");
    Wrapper<std::string> w2(5, 'x');
    std::cout << w1.get() << " " << w2.get() << std::endl;
    // hello xxxxx
}`,
      solution: `#include <utility>
#include <string>
#include <iostream>

template<typename T>
class Wrapper {
    T value_;
public:
    template<typename... Args>
    explicit Wrapper(Args&&... args) : value_(std::forward<Args>(args)...) {}

    const T& get() const { return value_; }
};

int main() {
    Wrapper<std::string> w1("hello");
    Wrapper<std::string> w2(5, 'x');
    std::cout << w1.get() << " " << w2.get() << std::endl;
    // hello xxxxx
}`,
      hints: [
        'The constructor should be a variadic template.',
        'Forward all arguments to the member initializer: value_(std::forward<Args>(args)...).',
        'Mark the constructor explicit to avoid implicit conversions.',
      ],
      concepts: ['perfect-forwarding', 'forwarding-constructor', 'in-place-construction'],
    },
    {
      id: 'cpp-fwd-11',
      title: 'Write a Logging Proxy',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function invoke_logged that takes a function and arguments, logs the call, perfectly forwards everything, and returns the result.',
      skeleton: `#include <utility>
#include <iostream>
#include <string>

// Write invoke_logged here

std::string greet(const std::string& name, int times) {
    std::string result;
    for (int i = 0; i < times; ++i) result += "Hi " + name + "! ";
    return result;
}

int main() {
    auto msg = invoke_logged(greet, std::string("World"), 2);
    std::cout << msg << std::endl;
    // [LOG] Calling function...
    // Hi World! Hi World!
}`,
      solution: `#include <utility>
#include <iostream>
#include <string>

template<typename F, typename... Args>
decltype(auto) invoke_logged(F&& func, Args&&... args) {
    std::cout << "[LOG] Calling function..." << std::endl;
    return std::forward<F>(func)(std::forward<Args>(args)...);
}

std::string greet(const std::string& name, int times) {
    std::string result;
    for (int i = 0; i < times; ++i) result += "Hi " + name + "! ";
    return result;
}

int main() {
    auto msg = invoke_logged(greet, std::string("World"), 2);
    std::cout << msg << std::endl;
    // [LOG] Calling function...
    // Hi World! Hi World!
}`,
      hints: [
        'Use decltype(auto) to preserve the exact return type.',
        'Forward both the callable and all arguments.',
        'Log before the call, then return the forwarded result.',
      ],
      concepts: ['perfect-forwarding', 'decltype-auto', 'logging-proxy'],
    },
    {
      id: 'cpp-fwd-12',
      title: 'Write an apply_to_pair Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that takes a binary function and a pair, and forwards the pair elements as arguments.',
      skeleton: `#include <utility>
#include <iostream>

// Write apply_to_pair(func, pair) here

int add(int a, int b) { return a + b; }
double multiply(double a, double b) { return a * b; }

int main() {
    auto p1 = std::make_pair(3, 4);
    auto p2 = std::make_pair(2.5, 3.0);
    std::cout << apply_to_pair(add, p1) << std::endl;      // 7
    std::cout << apply_to_pair(multiply, p2) << std::endl;  // 7.5
}`,
      solution: `#include <utility>
#include <iostream>

template<typename F, typename A, typename B>
auto apply_to_pair(F&& func, std::pair<A, B>& p) {
    return std::forward<F>(func)(p.first, p.second);
}

int add(int a, int b) { return a + b; }
double multiply(double a, double b) { return a * b; }

int main() {
    auto p1 = std::make_pair(3, 4);
    auto p2 = std::make_pair(2.5, 3.0);
    std::cout << apply_to_pair(add, p1) << std::endl;      // 7
    std::cout << apply_to_pair(multiply, p2) << std::endl;  // 7.5
}`,
      hints: [
        'Template on the function type and pair element types.',
        'Forward the function and pass p.first, p.second.',
        'Use auto return type for deduction.',
      ],
      concepts: ['perfect-forwarding', 'pair', 'generic-programming'],
    },
    {
      id: 'cpp-fwd-13',
      title: 'Fix Missing std::forward',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the wrapper that always passes lvalue references instead of forwarding correctly.',
      skeleton: `#include <utility>
#include <iostream>

void process(int& x) { std::cout << "lvalue" << std::endl; }
void process(int&& x) { std::cout << "rvalue" << std::endl; }

template<typename T>
void wrapper(T&& arg) {
    process(arg); // Bug: always calls lvalue overload
}

int main() {
    int x = 5;
    wrapper(x);  // should print: lvalue
    wrapper(42); // should print: rvalue
}`,
      solution: `#include <utility>
#include <iostream>

void process(int& x) { std::cout << "lvalue" << std::endl; }
void process(int&& x) { std::cout << "rvalue" << std::endl; }

template<typename T>
void wrapper(T&& arg) {
    process(std::forward<T>(arg));
}

int main() {
    int x = 5;
    wrapper(x);  // prints: lvalue
    wrapper(42); // prints: rvalue
}`,
      hints: [
        'Named variables are always lvalues, even if their type is rvalue reference.',
        'std::forward<T>(arg) restores the original value category.',
        'Replace process(arg) with process(std::forward<T>(arg)).',
      ],
      concepts: ['perfect-forwarding', 'std-forward', 'value-category'],
    },
    {
      id: 'cpp-fwd-14',
      title: 'Fix std::move Instead of std::forward',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the function that uses std::move where std::forward is needed.',
      skeleton: `#include <utility>
#include <string>
#include <iostream>

template<typename T>
void store(T&& val) {
    // This always moves, even when an lvalue is passed!
    std::string stored = std::move(val);
    std::cout << stored << std::endl;
}

int main() {
    std::string name = "Alice";
    store(name);  // Oops: name is moved from even though we passed an lvalue!
    std::cout << "name=" << name << std::endl; // name is empty
}`,
      solution: `#include <utility>
#include <string>
#include <iostream>

template<typename T>
void store(T&& val) {
    std::string stored = std::forward<T>(val);
    std::cout << stored << std::endl;
}

int main() {
    std::string name = "Alice";
    store(name);  // Copies: name is preserved
    std::cout << "name=" << name << std::endl; // name=Alice
}`,
      hints: [
        'std::move always casts to rvalue - it ignores the original value category.',
        'std::forward preserves whether the argument was an lvalue or rvalue.',
        'Replace std::move(val) with std::forward<T>(val).',
      ],
      concepts: ['perfect-forwarding', 'std-move-vs-forward'],
    },
    {
      id: 'cpp-fwd-15',
      title: 'Fix Non-Forwarding Reference',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the function that looks like it uses a forwarding reference but does not.',
      skeleton: `#include <utility>
#include <iostream>
#include <vector>

class MyClass {
public:
    template<typename T>
    void add(T&& item) {
        // This looks like a forwarding reference but T is deduced
        // The real issue: we are not using std::forward
        items.push_back(item);
    }
private:
    std::vector<std::string> items;
};

int main() {
    MyClass c;
    std::string s = "hello";
    c.add(s);             // should copy
    c.add(std::string("world")); // should move
}`,
      solution: `#include <utility>
#include <iostream>
#include <vector>

class MyClass {
public:
    template<typename T>
    void add(T&& item) {
        items.push_back(std::forward<T>(item));
    }
private:
    std::vector<std::string> items;
};

int main() {
    MyClass c;
    std::string s = "hello";
    c.add(s);             // copies
    c.add(std::string("world")); // moves
}`,
      hints: [
        'The forwarding reference is correct (T&& with deduced T in a member template).',
        'But push_back(item) always copies because item is an lvalue.',
        'Use std::forward<T>(item) to preserve the value category.',
      ],
      concepts: ['perfect-forwarding', 'std-forward', 'push-back'],
    },
    {
      id: 'cpp-fwd-16',
      title: 'Predict Value Category',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Predict what this program prints.',
      skeleton: `#include <utility>
#include <iostream>

void check(int&) { std::cout << "L "; }
void check(int&&) { std::cout << "R "; }

template<typename T>
void forward_check(T&& x) {
    check(std::forward<T>(x));
}

int main() {
    int a = 1;
    forward_check(a);
    forward_check(2);
    forward_check(std::move(a));
}`,
      solution: `L R R `,
      hints: [
        'forward_check(a): a is lvalue, T=int&, forward returns int& -> L.',
        'forward_check(2): 2 is rvalue, T=int, forward returns int&& -> R.',
        'forward_check(std::move(a)): rvalue, T=int, forward returns int&& -> R.',
      ],
      concepts: ['perfect-forwarding', 'value-category', 'reference-collapsing'],
    },
    {
      id: 'cpp-fwd-17',
      title: 'Predict Reference Collapsing',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the deduced type for T and the collapsed parameter type.',
      skeleton: `// template<typename T> void f(T&& arg);

// For each call, what is T and T&&?
// (a) int x = 5; f(x);
// (b) f(42);
// (c) int y = 3; f(std::move(y));

// Format: "T_deduced -> collapsed_type" for each, semicolon separated
// e.g., "int& -> int&; int -> int&&; int -> int&&"`,
      solution: `int& -> int&; int -> int&&; int -> int&&`,
      hints: [
        'For lvalue x: T = int&, T&& = int& && = int&.',
        'For rvalue 42: T = int, T&& = int&&.',
        'For std::move(y) (rvalue): T = int, T&& = int&&.',
      ],
      concepts: ['perfect-forwarding', 'reference-collapsing', 'type-deduction'],
    },
    {
      id: 'cpp-fwd-18',
      title: 'Predict emplace_back vs push_back',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict how many string constructor calls happen.',
      skeleton: `#include <vector>
#include <string>
#include <iostream>

// Assume we can count constructor calls.
// How many std::string constructions for each line?

int main() {
    std::vector<std::string> v;
    v.push_back("hello");     // Line A: how many string constructions?
    v.emplace_back("world");  // Line B: how many string constructions?
}

// Answer format: "A B" where each is the count`,
      solution: `2 1`,
      hints: [
        'push_back("hello"): constructs a temporary string, then moves it into the vector = 2.',
        'emplace_back("world"): constructs the string directly in the vector = 1.',
        'emplace_back avoids the temporary by forwarding to the constructor.',
      ],
      concepts: ['perfect-forwarding', 'emplace-back', 'construction-count'],
    },
    {
      id: 'cpp-fwd-19',
      title: 'Refactor push_back to emplace_back',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Refactor the code to use emplace_back for more efficient construction.',
      skeleton: `#include <vector>
#include <string>
#include <utility>

struct Person {
    std::string name;
    int age;
    Person(std::string n, int a) : name(std::move(n)), age(a) {}
};

int main() {
    std::vector<Person> people;
    people.push_back(Person("Alice", 30));
    people.push_back(Person("Bob", 25));
    people.push_back(Person(std::string("Charlie"), 35));
}`,
      solution: `#include <vector>
#include <string>
#include <utility>

struct Person {
    std::string name;
    int age;
    Person(std::string n, int a) : name(std::move(n)), age(a) {}
};

int main() {
    std::vector<Person> people;
    people.emplace_back("Alice", 30);
    people.emplace_back("Bob", 25);
    people.emplace_back("Charlie", 35);
}`,
      hints: [
        'emplace_back forwards arguments directly to the constructor.',
        'No need to construct a temporary Person object first.',
        'Replace push_back(Person(...)) with emplace_back(args...).',
      ],
      concepts: ['perfect-forwarding', 'emplace-back', 'refactoring'],
    },
    {
      id: 'cpp-fwd-20',
      title: 'Refactor Overloaded Pair to Forwarding',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor the four overloaded functions into a single forwarding template.',
      skeleton: `#include <string>
#include <iostream>

void log(const std::string& msg) {
    std::cout << "[LOG] " << msg << std::endl;
}
void log(std::string&& msg) {
    std::cout << "[LOG] " << msg << std::endl;
}
void log(const char* const& msg) {
    std::cout << "[LOG] " << msg << std::endl;
}
void log(const char*&& msg) {
    std::cout << "[LOG] " << msg << std::endl;
}

int main() {
    std::string s = "hello";
    log(s);
    log(std::string("world"));
    log("literal");
}`,
      solution: `#include <string>
#include <iostream>
#include <utility>

template<typename T>
void log(T&& msg) {
    std::cout << "[LOG] " << std::forward<T>(msg) << std::endl;
}

int main() {
    std::string s = "hello";
    log(s);
    log(std::string("world"));
    log("literal");
}`,
      hints: [
        'A single forwarding reference template handles all value categories.',
        'template<typename T> void log(T&& msg) accepts lvalues and rvalues.',
        'Use std::forward<T>(msg) when passing the argument.',
      ],
      concepts: ['perfect-forwarding', 'forwarding-reference', 'overload-elimination'],
    },
  ],
};
