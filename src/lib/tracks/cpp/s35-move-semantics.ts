import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-move',
  title: '35. Move Semantics',
  explanation: `## Move Semantics in C++\n\nMove semantics, introduced in C++11, allow resources to be **transferred** from one object to another instead of copied, dramatically improving performance for types that manage heap memory or other expensive resources.\n\n### Rvalue References\n\nAn rvalue reference (\`T&&\`) binds to temporary objects (rvalues):\n\n\`\`\`cpp\nint&& r = 42;          // OK: binds to temporary\nstd::string&& s = std::string("hi"); // OK\n\`\`\`\n\n### std::move\n\n\`std::move\` casts an lvalue to an rvalue reference, enabling move semantics:\n\n\`\`\`cpp\nstd::string a = "hello";\nstd::string b = std::move(a); // a is moved-from, b owns "hello"\n// a is now in a valid but unspecified state\n\`\`\`\n\n### Move Constructor and Move Assignment\n\n\`\`\`cpp\nclass Buffer {\n    int* data;\n    size_t size;\npublic:\n    // Move constructor\n    Buffer(Buffer&& other) noexcept\n        : data(other.data), size(other.size) {\n        other.data = nullptr;\n        other.size = 0;\n    }\n\n    // Move assignment\n    Buffer& operator=(Buffer&& other) noexcept {\n        if (this != &other) {\n            delete[] data;\n            data = other.data;\n            size = other.size;\n            other.data = nullptr;\n            other.size = 0;\n        }\n        return *this;\n    }\n};\n\`\`\`\n\n### Return Value Optimization (RVO)\n\nThe compiler can elide copies/moves when returning local objects:\n\n\`\`\`cpp\nstd::vector<int> make_vec() {\n    std::vector<int> v{1, 2, 3};\n    return v; // RVO: constructed directly in caller's space\n}\n\`\`\`\n\n### Key Rules\n- After \`std::move\`, the source is in a **valid but unspecified** state\n- Move constructors/assignments should be marked \`noexcept\`\n- The Rule of Five: if you define any of destructor, copy/move constructor, copy/move assignment, define all five`,
  exercises: [
    {
      id: 'cpp-move-1',
      title: 'Declare an Rvalue Reference',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to declare an rvalue reference to int.',
      skeleton: `#include <iostream>

int main() {
    int___ r = 42;
    std::cout << r << std::endl; // 42
}`,
      solution: `#include <iostream>

int main() {
    int&& r = 42;
    std::cout << r << std::endl; // 42
}`,
      hints: [
        'An rvalue reference uses && after the type.',
        'int&& is an rvalue reference to int.',
        'Fill in "&&".',
      ],
      concepts: ['move-semantics', 'rvalue-reference'],
    },
    {
      id: 'cpp-move-2',
      title: 'Use std::move',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to move the string instead of copying it.',
      skeleton: `#include <string>
#include <iostream>
#include <utility>

int main() {
    std::string a = "hello";
    std::string b = ___(a);
    std::cout << b << std::endl; // hello
    std::cout << a.empty() << std::endl; // likely 1
}`,
      solution: `#include <string>
#include <iostream>
#include <utility>

int main() {
    std::string a = "hello";
    std::string b = std::move(a);
    std::cout << b << std::endl; // hello
    std::cout << a.empty() << std::endl; // likely 1
}`,
      hints: [
        'std::move casts an lvalue to an rvalue reference.',
        'This triggers the move constructor of std::string.',
        'Fill in "std::move".',
      ],
      concepts: ['move-semantics', 'std-move'],
    },
    {
      id: 'cpp-move-3',
      title: 'Move Constructor Signature',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to write the correct move constructor parameter type.',
      skeleton: `class Widget {
    int* data;
public:
    Widget(___ other) noexcept
        : data(other.data) {
        other.data = nullptr;
    }
};`,
      solution: `class Widget {
    int* data;
public:
    Widget(Widget&& other) noexcept
        : data(other.data) {
        other.data = nullptr;
    }
};`,
      hints: [
        'A move constructor takes an rvalue reference to the class type.',
        'The parameter type is Widget&&.',
        'Fill in "Widget&&".',
      ],
      concepts: ['move-semantics', 'move-constructor'],
    },
    {
      id: 'cpp-move-4',
      title: 'noexcept on Move Operations',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to mark the move constructor as non-throwing.',
      skeleton: `class Buffer {
    char* ptr;
    size_t len;
public:
    Buffer(Buffer&& other) ___
        : ptr(other.ptr), len(other.len) {
        other.ptr = nullptr;
        other.len = 0;
    }
};`,
      solution: `class Buffer {
    char* ptr;
    size_t len;
public:
    Buffer(Buffer&& other) noexcept
        : ptr(other.ptr), len(other.len) {
        other.ptr = nullptr;
        other.len = 0;
    }
};`,
      hints: [
        'Move operations should be marked noexcept for optimal performance.',
        'STL containers only use move if it is noexcept.',
        'Fill in "noexcept".',
      ],
      concepts: ['move-semantics', 'noexcept'],
    },
    {
      id: 'cpp-move-5',
      title: 'Nullify the Moved-From Object',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to leave the moved-from object in a safe state.',
      skeleton: `class UniqueArray {
    int* arr;
    int size;
public:
    UniqueArray(UniqueArray&& other) noexcept
        : arr(other.arr), size(other.size) {
        other.arr = ___;
        other.size = 0;
    }
    ~UniqueArray() { delete[] arr; }
};`,
      solution: `class UniqueArray {
    int* arr;
    int size;
public:
    UniqueArray(UniqueArray&& other) noexcept
        : arr(other.arr), size(other.size) {
        other.arr = nullptr;
        other.size = 0;
    }
    ~UniqueArray() { delete[] arr; }
};`,
      hints: [
        'The moved-from pointer must not point to the transferred resource.',
        'Set it to nullptr so the destructor does not double-delete.',
        'Fill in "nullptr".',
      ],
      concepts: ['move-semantics', 'moved-from-state'],
    },
    {
      id: 'cpp-move-6',
      title: 'Move Assignment Self-Check',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to add the self-assignment check in move assignment.',
      skeleton: `class Resource {
    int* data;
public:
    Resource& operator=(Resource&& other) noexcept {
        if (___ != &other) {
            delete data;
            data = other.data;
            other.data = nullptr;
        }
        return *this;
    }
};`,
      solution: `class Resource {
    int* data;
public:
    Resource& operator=(Resource&& other) noexcept {
        if (this != &other) {
            delete data;
            data = other.data;
            other.data = nullptr;
        }
        return *this;
    }
};`,
      hints: [
        'Check if the current object is the same as the source.',
        'Compare "this" with the address of other.',
        'Fill in "this".',
      ],
      concepts: ['move-semantics', 'move-assignment', 'self-assignment'],
    },
    {
      id: 'cpp-move-7',
      title: 'Write a Move Constructor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a complete move constructor for the DynArray class that transfers ownership of the heap array.',
      skeleton: `#include <cstddef>
#include <utility>

class DynArray {
    int* data_;
    size_t size_;
public:
    DynArray(size_t n) : data_(new int[n]{}), size_(n) {}
    ~DynArray() { delete[] data_; }

    // Write move constructor here

    int* data() const { return data_; }
    size_t size() const { return size_; }
};

int main() {
    DynArray a(10);
    DynArray b(std::move(a));
    // b now owns the array, a.data() == nullptr
}`,
      solution: `#include <cstddef>
#include <utility>

class DynArray {
    int* data_;
    size_t size_;
public:
    DynArray(size_t n) : data_(new int[n]{}), size_(n) {}
    ~DynArray() { delete[] data_; }

    DynArray(DynArray&& other) noexcept
        : data_(other.data_), size_(other.size_) {
        other.data_ = nullptr;
        other.size_ = 0;
    }

    int* data() const { return data_; }
    size_t size() const { return size_; }
};

int main() {
    DynArray a(10);
    DynArray b(std::move(a));
    // b now owns the array, a.data() == nullptr
}`,
      hints: [
        'Steal the pointer and size from the source.',
        'Set the source pointer to nullptr and size to 0.',
        'Mark it noexcept.',
      ],
      concepts: ['move-semantics', 'move-constructor'],
    },
    {
      id: 'cpp-move-8',
      title: 'Write a Move Assignment Operator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a move assignment operator for the DynArray class.',
      skeleton: `#include <cstddef>
#include <utility>

class DynArray {
    int* data_;
    size_t size_;
public:
    DynArray(size_t n) : data_(new int[n]{}), size_(n) {}
    DynArray(DynArray&& other) noexcept : data_(other.data_), size_(other.size_) {
        other.data_ = nullptr;
        other.size_ = 0;
    }
    ~DynArray() { delete[] data_; }

    // Write move assignment operator here

    int* data() const { return data_; }
    size_t size() const { return size_; }
};

int main() {
    DynArray a(10);
    DynArray b(5);
    b = std::move(a); // b releases old data, takes a's data
}`,
      solution: `#include <cstddef>
#include <utility>

class DynArray {
    int* data_;
    size_t size_;
public:
    DynArray(size_t n) : data_(new int[n]{}), size_(n) {}
    DynArray(DynArray&& other) noexcept : data_(other.data_), size_(other.size_) {
        other.data_ = nullptr;
        other.size_ = 0;
    }
    ~DynArray() { delete[] data_; }

    DynArray& operator=(DynArray&& other) noexcept {
        if (this != &other) {
            delete[] data_;
            data_ = other.data_;
            size_ = other.size_;
            other.data_ = nullptr;
            other.size_ = 0;
        }
        return *this;
    }

    int* data() const { return data_; }
    size_t size() const { return size_; }
};

int main() {
    DynArray a(10);
    DynArray b(5);
    b = std::move(a); // b releases old data, takes a's data
}`,
      hints: [
        'Check for self-assignment first.',
        'Delete the current data before stealing from other.',
        'Null out the source after transferring.',
      ],
      concepts: ['move-semantics', 'move-assignment'],
    },
    {
      id: 'cpp-move-9',
      title: 'Write a swap Using Move',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a generic swap function using std::move (similar to std::swap).',
      skeleton: `#include <utility>
#include <iostream>
#include <string>

// Write my_swap here

int main() {
    std::string a = "hello";
    std::string b = "world";
    my_swap(a, b);
    std::cout << a << " " << b << std::endl; // world hello
}`,
      solution: `#include <utility>
#include <iostream>
#include <string>

template<typename T>
void my_swap(T& a, T& b) {
    T temp = std::move(a);
    a = std::move(b);
    b = std::move(temp);
}

int main() {
    std::string a = "hello";
    std::string b = "world";
    my_swap(a, b);
    std::cout << a << " " << b << std::endl; // world hello
}`,
      hints: [
        'Use a temporary: T temp = std::move(a);',
        'Then: a = std::move(b); b = std::move(temp);',
        'Three moves instead of three copies.',
      ],
      concepts: ['move-semantics', 'std-move', 'swap'],
    },
    {
      id: 'cpp-move-10',
      title: 'Write a Function Returning by Move',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a function make_greeting that constructs and returns a string efficiently (relying on RVO/move).',
      skeleton: `#include <string>
#include <iostream>

// Write make_greeting(name) -> std::string
// Returns "Hello, <name>!"

int main() {
    std::string msg = make_greeting("World");
    std::cout << msg << std::endl; // Hello, World!
}`,
      solution: `#include <string>
#include <iostream>

std::string make_greeting(const std::string& name) {
    std::string result = "Hello, " + name + "!";
    return result; // RVO or implicit move
}

int main() {
    std::string msg = make_greeting("World");
    std::cout << msg << std::endl; // Hello, World!
}`,
      hints: [
        'Return a local variable directly - the compiler applies RVO.',
        'Do NOT use std::move on the return - it prevents RVO.',
        'Just return result; and let the compiler optimize.',
      ],
      concepts: ['move-semantics', 'rvo', 'return-value'],
    },
    {
      id: 'cpp-move-11',
      title: 'Write a Sink Parameter Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a Person class with a constructor that takes a string by value and moves it into the member.',
      skeleton: `#include <string>
#include <utility>
#include <iostream>

// Write Person class with:
// - std::string name_ member
// - Constructor taking std::string by value, moving into name_
// - const std::string& name() const

int main() {
    std::string n = "Alice";
    Person p(std::move(n));
    std::cout << p.name() << std::endl; // Alice
}`,
      solution: `#include <string>
#include <utility>
#include <iostream>

class Person {
    std::string name_;
public:
    Person(std::string name) : name_(std::move(name)) {}
    const std::string& name() const { return name_; }
};

int main() {
    std::string n = "Alice";
    Person p(std::move(n));
    std::cout << p.name() << std::endl; // Alice
}`,
      hints: [
        'Take the string by value: Person(std::string name).',
        'Move it into the member: name_(std::move(name)).',
        'This pattern works well for both lvalue and rvalue arguments.',
      ],
      concepts: ['move-semantics', 'sink-parameter', 'constructor'],
    },
    {
      id: 'cpp-move-12',
      title: 'Write push_back with Move',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write code that efficiently adds a string to a vector using move semantics instead of copying.',
      skeleton: `#include <vector>
#include <string>
#include <iostream>

int main() {
    std::vector<std::string> names;
    std::string name = "superlongstringthatwouldbecostlytocopy";

    // Add name to names using move semantics
    // After this, name should be in a moved-from state

    std::cout << names[0] << std::endl;
    std::cout << name.empty() << std::endl; // likely 1
}`,
      solution: `#include <vector>
#include <string>
#include <iostream>

int main() {
    std::vector<std::string> names;
    std::string name = "superlongstringthatwouldbecostlytocopy";

    names.push_back(std::move(name));

    std::cout << names[0] << std::endl;
    std::cout << name.empty() << std::endl; // likely 1
}`,
      hints: [
        'Use std::move when passing to push_back to trigger the move overload.',
        'names.push_back(std::move(name)) moves instead of copies.',
        'The string is transferred into the vector.',
      ],
      concepts: ['move-semantics', 'std-move', 'push-back'],
    },
    {
      id: 'cpp-move-13',
      title: 'Fix the Broken Move',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the move constructor that fails to leave the source in a safe state.',
      skeleton: `class SmartBuffer {
    int* data;
    int size;
public:
    SmartBuffer(int n) : data(new int[n]), size(n) {}
    SmartBuffer(SmartBuffer&& other) noexcept
        : data(other.data), size(other.size) {
        // Bug: source not nullified
    }
    ~SmartBuffer() { delete[] data; }
};

int main() {
    SmartBuffer a(10);
    SmartBuffer b(std::move(a));
    // Double delete when a and b are destroyed!
}`,
      solution: `class SmartBuffer {
    int* data;
    int size;
public:
    SmartBuffer(int n) : data(new int[n]), size(n) {}
    SmartBuffer(SmartBuffer&& other) noexcept
        : data(other.data), size(other.size) {
        other.data = nullptr;
        other.size = 0;
    }
    ~SmartBuffer() { delete[] data; }
};

int main() {
    SmartBuffer a(10);
    SmartBuffer b(std::move(a));
    // Safe: a.data is nullptr, only b's destructor deletes
}`,
      hints: [
        'After stealing the pointer, the source still points to the same memory.',
        'Both destructors will delete the same pointer - double free!',
        'Set other.data = nullptr; and other.size = 0; after stealing.',
      ],
      concepts: ['move-semantics', 'double-free', 'move-constructor'],
    },
    {
      id: 'cpp-move-14',
      title: 'Fix std::move on Return',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the unnecessary std::move that prevents RVO.',
      skeleton: `#include <vector>

std::vector<int> make_vector(int n) {
    std::vector<int> v;
    for (int i = 0; i < n; ++i) {
        v.push_back(i);
    }
    return std::move(v); // Pessimization!
}

int main() {
    auto v = make_vector(1000);
}`,
      solution: `#include <vector>

std::vector<int> make_vector(int n) {
    std::vector<int> v;
    for (int i = 0; i < n; ++i) {
        v.push_back(i);
    }
    return v; // RVO can now apply
}

int main() {
    auto v = make_vector(1000);
}`,
      hints: [
        'std::move on a return statement prevents RVO (Return Value Optimization).',
        'The compiler can construct the object directly in the caller with RVO.',
        'Remove std::move and just return v; for optimal performance.',
      ],
      concepts: ['move-semantics', 'rvo', 'pessimization'],
    },
    {
      id: 'cpp-move-15',
      title: 'Fix Using a Moved-From Object',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the code that incorrectly uses a string after it has been moved from.',
      skeleton: `#include <string>
#include <vector>
#include <iostream>

int main() {
    std::string name = "important_data";
    std::vector<std::string> archive;
    archive.push_back(std::move(name));

    // Bug: using name after move
    std::cout << "Archived: " << name << std::endl;
    std::cout << "Length: " << name.length() << std::endl;
}`,
      solution: `#include <string>
#include <vector>
#include <iostream>

int main() {
    std::string name = "important_data";
    std::vector<std::string> archive;
    archive.push_back(name); // Copy instead of move since we still need it

    std::cout << "Archived: " << name << std::endl;
    std::cout << "Length: " << name.length() << std::endl;
}`,
      hints: [
        'After std::move, the string is in an unspecified state.',
        'If you need to use the value afterwards, do not move from it.',
        'Use a copy (remove std::move) since the value is needed later.',
      ],
      concepts: ['move-semantics', 'moved-from-state', 'use-after-move'],
    },
    {
      id: 'cpp-move-16',
      title: 'Predict Move Behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Predict what this program prints.',
      skeleton: `#include <iostream>
#include <string>
#include <utility>

int main() {
    std::string a = "hello";
    std::string b = std::move(a);
    std::cout << "b=" << b << std::endl;
    std::cout << "a.size()=" << a.size() << std::endl;
}`,
      solution: `b=hello
a.size()=0`,
      hints: [
        'std::move transfers the string content from a to b.',
        'b gets "hello", a becomes empty (moved-from).',
        'a.size() is 0 after the move (typical implementation).',
      ],
      concepts: ['move-semantics', 'std-move', 'moved-from-state'],
    },
    {
      id: 'cpp-move-17',
      title: 'Predict Copy vs Move',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict what this program prints.',
      skeleton: `#include <iostream>

struct Tracker {
    Tracker() { std::cout << "C "; }
    Tracker(const Tracker&) { std::cout << "CC "; }
    Tracker(Tracker&&) noexcept { std::cout << "MC "; }
    Tracker& operator=(const Tracker&) { std::cout << "CA "; return *this; }
    Tracker& operator=(Tracker&&) noexcept { std::cout << "MA "; return *this; }
};

int main() {
    Tracker a;
    Tracker b = a;
    Tracker c = std::move(a);
    b = c;
    c = std::move(b);
}`,
      solution: `C CC MC CA MA `,
      hints: [
        'Tracker a; -> default constructor: C',
        'Tracker b = a; -> copy constructor: CC. Tracker c = std::move(a); -> move constructor: MC.',
        'b = c; -> copy assignment: CA. c = std::move(b); -> move assignment: MA.',
      ],
      concepts: ['move-semantics', 'copy-vs-move', 'special-member-functions'],
    },
    {
      id: 'cpp-move-18',
      title: 'Predict unique_ptr Move',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict what this program prints.',
      skeleton: `#include <memory>
#include <iostream>

int main() {
    auto p1 = std::make_unique<int>(42);
    std::cout << (p1 != nullptr) << " ";
    auto p2 = std::move(p1);
    std::cout << (p1 != nullptr) << " ";
    std::cout << (p2 != nullptr) << " ";
    std::cout << *p2 << std::endl;
}`,
      solution: `1 0 1 42`,
      hints: [
        'make_unique creates p1 owning an int(42). p1 != nullptr is true (1).',
        'After move, p1 is nullptr (0), p2 owns the int.',
        'p2 != nullptr is true (1), *p2 is 42.',
      ],
      concepts: ['move-semantics', 'unique-ptr', 'ownership-transfer'],
    },
    {
      id: 'cpp-move-19',
      title: 'Refactor Copy to Move',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor the code to use move semantics where copies are unnecessary.',
      skeleton: `#include <vector>
#include <string>
#include <iostream>

std::vector<std::string> build_list() {
    std::vector<std::string> result;
    std::string item1 = "first";
    std::string item2 = "second";
    std::string item3 = "third";
    result.push_back(item1);
    result.push_back(item2);
    result.push_back(item3);
    // item1, item2, item3 are not used after this
    return result;
}

int main() {
    auto list = build_list();
    for (auto& s : list) std::cout << s << " ";
}`,
      solution: `#include <vector>
#include <string>
#include <iostream>

std::vector<std::string> build_list() {
    std::vector<std::string> result;
    std::string item1 = "first";
    std::string item2 = "second";
    std::string item3 = "third";
    result.push_back(std::move(item1));
    result.push_back(std::move(item2));
    result.push_back(std::move(item3));
    return result;
}

int main() {
    auto list = build_list();
    for (auto& s : list) std::cout << s << " ";
}`,
      hints: [
        'The local strings are not used after push_back, so they can be moved.',
        'Use std::move(item) in each push_back call.',
        'This avoids copying the string data to the vector.',
      ],
      concepts: ['move-semantics', 'std-move', 'optimization'],
    },
    {
      id: 'cpp-move-20',
      title: 'Refactor to Rule of Five',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor the class to implement the Rule of Five by adding the missing move operations.',
      skeleton: `class IntArray {
    int* data_;
    int size_;
public:
    IntArray(int n) : data_(new int[n]{}), size_(n) {}

    // Copy constructor
    IntArray(const IntArray& other) : data_(new int[other.size_]), size_(other.size_) {
        for (int i = 0; i < size_; ++i) data_[i] = other.data_[i];
    }

    // Copy assignment
    IntArray& operator=(const IntArray& other) {
        if (this != &other) {
            delete[] data_;
            size_ = other.size_;
            data_ = new int[size_];
            for (int i = 0; i < size_; ++i) data_[i] = other.data_[i];
        }
        return *this;
    }

    ~IntArray() { delete[] data_; }
};`,
      solution: `class IntArray {
    int* data_;
    int size_;
public:
    IntArray(int n) : data_(new int[n]{}), size_(n) {}

    // Copy constructor
    IntArray(const IntArray& other) : data_(new int[other.size_]), size_(other.size_) {
        for (int i = 0; i < size_; ++i) data_[i] = other.data_[i];
    }

    // Move constructor
    IntArray(IntArray&& other) noexcept : data_(other.data_), size_(other.size_) {
        other.data_ = nullptr;
        other.size_ = 0;
    }

    // Copy assignment
    IntArray& operator=(const IntArray& other) {
        if (this != &other) {
            delete[] data_;
            size_ = other.size_;
            data_ = new int[size_];
            for (int i = 0; i < size_; ++i) data_[i] = other.data_[i];
        }
        return *this;
    }

    // Move assignment
    IntArray& operator=(IntArray&& other) noexcept {
        if (this != &other) {
            delete[] data_;
            data_ = other.data_;
            size_ = other.size_;
            other.data_ = nullptr;
            other.size_ = 0;
        }
        return *this;
    }

    ~IntArray() { delete[] data_; }
};`,
      hints: [
        'The Rule of Five: destructor, copy ctor, copy assign, move ctor, move assign.',
        'Add a move constructor that steals the pointer.',
        'Add a move assignment that releases old data and steals the new.',
      ],
      concepts: ['move-semantics', 'rule-of-five', 'refactoring'],
    },
  ],
};
