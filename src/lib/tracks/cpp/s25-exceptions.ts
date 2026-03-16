import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-except',
  title: '25. Exceptions',
  explanation: `## Exceptions in C++\n\nExceptions provide a mechanism to handle errors by transferring control from the point of error to a handler. C++ uses try/catch/throw for exception handling.\n\n### Basic Exception Handling\n\n\`\`\`cpp\n#include <stdexcept>\n#include <iostream>\n\ntry {\n    throw std::runtime_error(\"Something went wrong\");\n} catch (const std::runtime_error& e) {\n    std::cout << \"Caught: \" << e.what() << std::endl;\n} catch (const std::exception& e) {\n    std::cout << \"Generic: \" << e.what() << std::endl;\n} catch (...) {\n    std::cout << \"Unknown exception\" << std::endl;\n}\n\`\`\`\n\n### Exception Hierarchy\n\n\`\`\`\nstd::exception\n  +-- std::logic_error\n  |     +-- std::invalid_argument\n  |     +-- std::out_of_range\n  |     +-- std::domain_error\n  +-- std::runtime_error\n  |     +-- std::overflow_error\n  |     +-- std::underflow_error\n  |     +-- std::range_error\n  +-- std::bad_alloc\n  +-- std::bad_cast\n\`\`\`\n\n### Custom Exceptions\n\n\`\`\`cpp\nclass FileError : public std::runtime_error {\n    std::string path_;\npublic:\n    FileError(const std::string& path, const std::string& msg)\n        : std::runtime_error(msg), path_(path) {}\n    const std::string& path() const { return path_; }\n};\n\`\`\`\n\n### noexcept Specifier\n\n\`\`\`cpp\nvoid safe_func() noexcept {\n    // guaranteed not to throw\n    // if it does, std::terminate is called\n}\n\nvoid might_throw() noexcept(false) {\n    // may throw (default behavior)\n}\n\n// Conditional noexcept\ntemplate <typename T>\nvoid swap_values(T& a, T& b) noexcept(noexcept(T(std::move(a)))) {\n    T tmp = std::move(a);\n    a = std::move(b);\n    b = std::move(tmp);\n}\n\`\`\`\n\n### Exception Safety Levels\n- **No-throw guarantee**: Operation never throws (noexcept)\n- **Strong guarantee**: If exception thrown, state is unchanged (rollback)\n- **Basic guarantee**: No resource leaks, invariants maintained\n- **No guarantee**: Anything can happen (avoid this!)`,
  exercises: [
    {
      id: 'cpp-except-1',
      title: 'Basic Try-Catch',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to catch a runtime_error exception.',
      skeleton: `#include <stdexcept>
#include <iostream>

int main() {
    try {
        throw std::runtime_error("oops");
    } ___(const std::runtime_error& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}`,
      solution: `#include <stdexcept>
#include <iostream>

int main() {
    try {
        throw std::runtime_error("oops");
    } catch(const std::runtime_error& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}`,
      hints: [
        'The keyword that receives thrown exceptions is the counterpart of try.',
        'It takes the exception type as a parameter.',
        'catch(const std::runtime_error& e) catches by const reference.',
      ],
      concepts: ['try', 'catch', 'runtime_error'],
    },
    {
      id: 'cpp-except-2',
      title: 'Throw an Exception',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to throw an invalid_argument exception.',
      skeleton: `#include <stdexcept>

int divide(int a, int b) {
    if (b == 0) {
        ___ std::invalid_argument("division by zero");
    }
    return a / b;
}`,
      solution: `#include <stdexcept>

int divide(int a, int b) {
    if (b == 0) {
        throw std::invalid_argument("division by zero");
    }
    return a / b;
}`,
      hints: [
        'The keyword that raises an exception transfers control to the handler.',
        'You create an exception object and launch it.',
        'throw std::invalid_argument(...) raises the exception.',
      ],
      concepts: ['throw', 'invalid_argument', 'error-handling'],
    },
    {
      id: 'cpp-except-3',
      title: 'Catch-All Handler',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to catch any exception type.',
      skeleton: `#include <iostream>

int main() {
    try {
        throw 42; // throwing an int
    } catch(___) {
        std::cout << "Caught something" << std::endl;
    }
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    try {
        throw 42; // throwing an int
    } catch(...) {
        std::cout << "Caught something" << std::endl;
    }
    return 0;
}`,
      hints: [
        'C++ has a catch-all syntax using an ellipsis.',
        'It catches any type of exception.',
        'catch(...) is the catch-all handler.',
      ],
      concepts: ['catch-all', 'ellipsis', 'exception-handling'],
    },
    {
      id: 'cpp-except-4',
      title: 'Access Exception Message',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to access the error message from the exception.',
      skeleton: `#include <stdexcept>
#include <iostream>

int main() {
    try {
        throw std::runtime_error("file not found");
    } catch (const std::exception& e) {
        std::cout << e.___() << std::endl;
    }
    return 0;
}`,
      solution: `#include <stdexcept>
#include <iostream>

int main() {
    try {
        throw std::runtime_error("file not found");
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}`,
      hints: [
        'All standard exceptions have a method that returns the error message.',
        'It returns a const char*.',
        'e.what() returns the exception message.',
      ],
      concepts: ['what', 'exception-message', 'std::exception'],
    },
    {
      id: 'cpp-except-5',
      title: 'noexcept Specifier',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to mark the function as guaranteed not to throw.',
      skeleton: `#include <vector>

void swap_ints(int& a, int& b) ___ {
    int tmp = a;
    a = b;
    b = tmp;
}`,
      solution: `#include <vector>

void swap_ints(int& a, int& b) noexcept {
    int tmp = a;
    a = b;
    b = tmp;
}`,
      hints: [
        'This specifier tells the compiler the function will never throw.',
        'If it does throw, std::terminate is called.',
        'noexcept is the specifier keyword.',
      ],
      concepts: ['noexcept', 'no-throw-guarantee', 'specifier'],
    },
    {
      id: 'cpp-except-6',
      title: 'Multiple Catch Blocks',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank for the correct exception type that catches out_of_range but not other exceptions.',
      skeleton: `#include <stdexcept>
#include <iostream>
#include <vector>

int main() {
    try {
        std::vector<int> v = {1, 2, 3};
        v.at(10); // throws out_of_range
    } catch (const ___& e) {
        std::cout << "Out of range: " << e.what() << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Other: " << e.what() << std::endl;
    }
    return 0;
}`,
      solution: `#include <stdexcept>
#include <iostream>
#include <vector>

int main() {
    try {
        std::vector<int> v = {1, 2, 3};
        v.at(10); // throws out_of_range
    } catch (const std::out_of_range& e) {
        std::cout << "Out of range: " << e.what() << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Other: " << e.what() << std::endl;
    }
    return 0;
}`,
      hints: [
        'vector::at() throws this specific exception when the index is invalid.',
        'It is derived from std::logic_error.',
        'std::out_of_range is the correct type.',
      ],
      concepts: ['out_of_range', 'catch-order', 'vector::at'],
    },
    {
      id: 'cpp-except-7',
      title: 'Write a Safe Division Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a function that divides two doubles, throwing domain_error for division by zero and overflow_error for very large results.',
      skeleton: `#include <stdexcept>
#include <cmath>
#include <limits>

// Write safe_divide: takes two doubles, returns their quotient.
// Throw domain_error if divisor is 0.
// Throw overflow_error if result is infinity.
`,
      solution: `#include <stdexcept>
#include <cmath>
#include <limits>

double safe_divide(double a, double b) {
    if (b == 0.0) {
        throw std::domain_error("division by zero");
    }
    double result = a / b;
    if (std::isinf(result)) {
        throw std::overflow_error("result is infinity");
    }
    return result;
}`,
      hints: [
        'Check for zero divisor first and throw domain_error.',
        'After division, check if the result is infinity with std::isinf.',
        'Throw overflow_error for infinite results.',
      ],
      concepts: ['domain_error', 'overflow_error', 'error-checking'],
    },
    {
      id: 'cpp-except-8',
      title: 'Write a Custom Exception Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a custom exception class HttpError that stores a status code and message.',
      skeleton: `#include <stdexcept>
#include <string>

// Write HttpError class:
// - Inherits from std::runtime_error
// - Constructor takes int status_code and string message
// - Has status_code() getter that returns the code
// - what() returns the message (inherited)
`,
      solution: `#include <stdexcept>
#include <string>

class HttpError : public std::runtime_error {
    int status_code_;
public:
    HttpError(int code, const std::string& message)
        : std::runtime_error(message), status_code_(code) {}

    int status_code() const noexcept { return status_code_; }
};`,
      hints: [
        'Inherit publicly from std::runtime_error.',
        'Pass the message to the base class constructor.',
        'Store the status code as a private member with a getter.',
      ],
      concepts: ['custom-exception', 'inheritance', 'runtime_error'],
    },
    {
      id: 'cpp-except-9',
      title: 'Write an Exception-Safe Push',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that provides the strong exception safety guarantee when adding to two vectors simultaneously.',
      skeleton: `#include <vector>

// Write safe_push: takes two vectors and two values.
// Adds val1 to v1 and val2 to v2.
// If the second push_back throws, undo the first (strong guarantee).
`,
      solution: `#include <vector>

void safe_push(std::vector<int>& v1, int val1,
               std::vector<int>& v2, int val2) {
    v1.push_back(val1);
    try {
        v2.push_back(val2);
    } catch (...) {
        v1.pop_back(); // undo the first push
        throw;         // re-throw the exception
    }
}`,
      hints: [
        'First push to v1, then try to push to v2.',
        'If the second push throws, pop_back from v1 to restore state.',
        'Re-throw the exception after cleanup with throw;',
      ],
      concepts: ['strong-guarantee', 'exception-safety', 'rollback'],
    },
    {
      id: 'cpp-except-10',
      title: 'Write a Nested Exception Handler',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function that wraps lower-level exceptions in higher-level ones using std::throw_with_nested.',
      skeleton: `#include <stdexcept>
#include <string>

// Write wrap_call: calls a function and if it throws,
// wraps the exception in a runtime_error using throw_with_nested.
// Take a std::function<void()> as parameter.
`,
      solution: `#include <stdexcept>
#include <string>
#include <functional>
#include <exception>

void wrap_call(std::function<void()> fn, const std::string& context) {
    try {
        fn();
    } catch (...) {
        std::throw_with_nested(
            std::runtime_error("Error in " + context));
    }
}`,
      hints: [
        'std::throw_with_nested wraps the current exception inside a new one.',
        'Catch all exceptions with catch(...).',
        'The nested exception can be extracted later with std::rethrow_if_nested.',
      ],
      concepts: ['throw_with_nested', 'nested-exception', 'exception-wrapping'],
    },
    {
      id: 'cpp-except-11',
      title: 'Write a Retry Mechanism',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that retries a callable up to n times before giving up and rethrowing.',
      skeleton: `#include <functional>
#include <stdexcept>

// Write retry: takes a function<void()> and int max_attempts.
// Calls the function, retrying on exception up to max_attempts times.
// If all attempts fail, rethrows the last exception.
`,
      solution: `#include <functional>
#include <stdexcept>

void retry(std::function<void()> fn, int max_attempts) {
    for (int attempt = 0; attempt < max_attempts; ++attempt) {
        try {
            fn();
            return; // success
        } catch (...) {
            if (attempt == max_attempts - 1) {
                throw; // last attempt, rethrow
            }
        }
    }
}`,
      hints: [
        'Loop up to max_attempts, calling fn() each time.',
        'If fn() succeeds (no exception), return immediately.',
        'On the last attempt, rethrow the exception instead of retrying.',
      ],
      concepts: ['retry-pattern', 'rethrow', 'exception-handling'],
    },
    {
      id: 'cpp-except-12',
      title: 'Write exception_ptr Propagation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function that captures an exception in one context and rethrows it in another using std::exception_ptr.',
      skeleton: `#include <exception>
#include <stdexcept>
#include <functional>

// Write capture_and_rethrow:
// - Takes a function<void()>, calls it
// - If it throws, captures the exception with current_exception()
// - Returns the exception_ptr (nullptr if no exception)
// Also write rethrow_captured: takes exception_ptr and rethrows if not null
`,
      solution: `#include <exception>
#include <stdexcept>
#include <functional>

std::exception_ptr capture_and_rethrow(std::function<void()> fn) {
    try {
        fn();
    } catch (...) {
        return std::current_exception();
    }
    return nullptr;
}

void rethrow_captured(std::exception_ptr eptr) {
    if (eptr) {
        std::rethrow_exception(eptr);
    }
}`,
      hints: [
        'std::current_exception() captures the current exception as exception_ptr.',
        'std::rethrow_exception(eptr) rethrows a captured exception.',
        'This is how exceptions are transported across threads.',
      ],
      concepts: ['exception_ptr', 'current_exception', 'rethrow_exception'],
    },
    {
      id: 'cpp-except-13',
      title: 'Fix Catching by Value',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the bug where catching by value causes object slicing.',
      skeleton: `#include <stdexcept>
#include <iostream>

class DetailedError : public std::runtime_error {
public:
    DetailedError(const std::string& msg) : std::runtime_error(msg) {}
    const char* what() const noexcept override {
        return "DetailedError occurred";
    }
};

int main() {
    try {
        throw DetailedError("test");
    } catch (std::runtime_error e) { // Bug: catches by value!
        std::cout << e.what() << std::endl;
        // Prints base class what(), not DetailedError's
    }
    return 0;
}`,
      solution: `#include <stdexcept>
#include <iostream>

class DetailedError : public std::runtime_error {
public:
    DetailedError(const std::string& msg) : std::runtime_error(msg) {}
    const char* what() const noexcept override {
        return "DetailedError occurred";
    }
};

int main() {
    try {
        throw DetailedError("test");
    } catch (const std::runtime_error& e) { // Fixed: catch by const reference
        std::cout << e.what() << std::endl;
        // Now prints "DetailedError occurred"
    }
    return 0;
}`,
      hints: [
        'Catching by value copies the exception, slicing off derived parts.',
        'Always catch exceptions by const reference.',
        'Change catch(std::runtime_error e) to catch(const std::runtime_error& e).',
      ],
      concepts: ['object-slicing', 'catch-by-reference', 'polymorphism'],
    },
    {
      id: 'cpp-except-14',
      title: 'Fix Wrong Catch Order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the bug where catch blocks are in wrong order, preventing specific exceptions from being caught.',
      skeleton: `#include <stdexcept>
#include <iostream>

int main() {
    try {
        throw std::out_of_range("index 10");
    } catch (const std::exception& e) {
        std::cout << "Generic: " << e.what() << std::endl;
    } catch (const std::out_of_range& e) {
        // Bug: this is never reached!
        std::cout << "Out of range: " << e.what() << std::endl;
    }
    return 0;
}`,
      solution: `#include <stdexcept>
#include <iostream>

int main() {
    try {
        throw std::out_of_range("index 10");
    } catch (const std::out_of_range& e) {
        std::cout << "Out of range: " << e.what() << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Generic: " << e.what() << std::endl;
    }
    return 0;
}`,
      hints: [
        'Catch blocks are tested in order from top to bottom.',
        'A base class catch will match before a derived class catch.',
        'Put the most specific (derived) catch blocks first.',
      ],
      concepts: ['catch-order', 'exception-hierarchy', 'most-derived-first'],
    },
    {
      id: 'cpp-except-15',
      title: 'Fix Exception in Destructor',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fix the dangerous code that throws from a destructor, which can cause std::terminate.',
      skeleton: `#include <stdexcept>
#include <iostream>

class Resource {
public:
    ~Resource() {
        // Bug: throwing in destructor causes terminate!
        throw std::runtime_error("cleanup failed");
    }
};

int main() {
    try {
        Resource r;
    } catch (...) {
        std::cout << "Caught" << std::endl;
    }
    return 0;
}`,
      solution: `#include <stdexcept>
#include <iostream>

class Resource {
public:
    ~Resource() noexcept {
        try {
            // cleanup that might fail
            // throw std::runtime_error("cleanup failed");
        } catch (...) {
            std::cerr << "Warning: cleanup failed" << std::endl;
            // swallow exception in destructor
        }
    }
};

int main() {
    try {
        Resource r;
    } catch (...) {
        std::cout << "Caught" << std::endl;
    }
    return 0;
}`,
      hints: [
        'Destructors are implicitly noexcept in C++11 and later.',
        'If a destructor throws during stack unwinding, std::terminate is called.',
        'Catch and handle (or log) exceptions inside the destructor.',
      ],
      concepts: ['destructor-noexcept', 'terminate', 'exception-safety'],
    },
    {
      id: 'cpp-except-16',
      title: 'Predict Exception Flow',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Predict the output of this exception handling code.',
      skeleton: `#include <iostream>
#include <stdexcept>

int main() {
    std::cout << "A ";
    try {
        std::cout << "B ";
        throw std::runtime_error("err");
        std::cout << "C ";
    } catch (const std::runtime_error& e) {
        std::cout << "D ";
    }
    std::cout << "E" << std::endl;
    return 0;
}`,
      solution: `A B D E`,
      hints: [
        'A and B print before the throw.',
        'C is skipped because the throw transfers control to the catch.',
        'D prints in the catch block, then E prints after the try-catch.',
      ],
      concepts: ['exception-flow', 'try-catch', 'control-transfer'],
    },
    {
      id: 'cpp-except-17',
      title: 'Predict Rethrow Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the output when an exception is rethrown.',
      skeleton: `#include <iostream>
#include <stdexcept>

int main() {
    try {
        try {
            throw std::runtime_error("inner");
        } catch (const std::runtime_error& e) {
            std::cout << "1:" << e.what() << " ";
            throw; // rethrow
        }
    } catch (const std::exception& e) {
        std::cout << "2:" << e.what() << std::endl;
    }
    return 0;
}`,
      solution: `1:inner 2:inner`,
      hints: [
        'The inner catch catches and prints the exception.',
        'throw; rethrows the same exception object.',
        'The outer catch catches it again with the same message.',
      ],
      concepts: ['rethrow', 'nested-try-catch', 'exception-propagation'],
    },
    {
      id: 'cpp-except-18',
      title: 'Predict noexcept Check',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the output of the noexcept operator checks.',
      skeleton: `#include <iostream>

void f1() noexcept {}
void f2() {}
void f3() noexcept(false) {}
void f4() noexcept(sizeof(int) == 4) {}

int main() {
    std::cout << noexcept(f1()) << " ";
    std::cout << noexcept(f2()) << " ";
    std::cout << noexcept(f3()) << " ";
    std::cout << noexcept(f4()) << std::endl;
    return 0;
}`,
      solution: `1 0 0 1`,
      hints: [
        'noexcept(expr) returns true if expr is declared noexcept.',
        'f1 is noexcept, f2 is not, f3 is explicitly noexcept(false).',
        'f4 is noexcept(true) because sizeof(int) == 4 on most platforms.',
      ],
      concepts: ['noexcept-operator', 'noexcept-specifier', 'compile-time'],
    },
    {
      id: 'cpp-except-19',
      title: 'Refactor Error Codes to Exceptions',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor the error-code-based function to use exceptions instead.',
      skeleton: `#include <string>

enum class Error { None, Empty, TooLong };

Error validate_name(const std::string& name, std::string& result) {
    if (name.empty()) return Error::Empty;
    if (name.size() > 100) return Error::TooLong;
    result = name;
    return Error::None;
}

// Caller must check return value
// Error e = validate_name(input, output);
// if (e == Error::Empty) { ... }`,
      solution: `#include <string>
#include <stdexcept>

std::string validate_name(const std::string& name) {
    if (name.empty()) {
        throw std::invalid_argument("name cannot be empty");
    }
    if (name.size() > 100) {
        throw std::length_error("name exceeds maximum length of 100");
    }
    return name;
}

// Caller uses try-catch
// try { auto result = validate_name(input); }
// catch (const std::invalid_argument& e) { ... }`,
      hints: [
        'Replace error codes with appropriate exception types.',
        'Return the result directly instead of via output parameter.',
        'Use std::invalid_argument and std::length_error.',
      ],
      concepts: ['exceptions-vs-error-codes', 'refactoring', 'clean-api'],
    },
    {
      id: 'cpp-except-20',
      title: 'Refactor to Exception-Safe Assignment',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor the copy assignment operator to use the copy-and-swap idiom for strong exception safety.',
      skeleton: `#include <algorithm>
#include <cstring>

class Buffer {
    char* data_;
    size_t size_;
public:
    Buffer(size_t sz) : data_(new char[sz]()), size_(sz) {}
    ~Buffer() { delete[] data_; }
    Buffer(const Buffer& other)
        : data_(new char[other.size_]), size_(other.size_) {
        std::memcpy(data_, other.data_, size_);
    }

    // Not exception-safe: if new throws, this is corrupted
    Buffer& operator=(const Buffer& other) {
        delete[] data_;
        size_ = other.size_;
        data_ = new char[other.size_]; // if this throws, data_ is dangling!
        std::memcpy(data_, other.data_, size_);
        return *this;
    }

    size_t size() const { return size_; }
};`,
      solution: `#include <algorithm>
#include <cstring>

class Buffer {
    char* data_;
    size_t size_;
public:
    Buffer(size_t sz) : data_(new char[sz]()), size_(sz) {}
    ~Buffer() { delete[] data_; }
    Buffer(const Buffer& other)
        : data_(new char[other.size_]), size_(other.size_) {
        std::memcpy(data_, other.data_, size_);
    }

    friend void swap(Buffer& a, Buffer& b) noexcept {
        std::swap(a.data_, b.data_);
        std::swap(a.size_, b.size_);
    }

    Buffer& operator=(Buffer other) { // pass by value (copy)
        swap(*this, other);
        return *this;
    }

    size_t size() const { return size_; }
};`,
      hints: [
        'The copy-and-swap idiom provides strong exception safety.',
        'Take the parameter by value to make the copy.',
        'Then swap the copy with *this. The old data is destroyed when other goes out of scope.',
      ],
      concepts: ['copy-and-swap', 'strong-guarantee', 'exception-safety'],
    },
  ],
};
