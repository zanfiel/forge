import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-copy-move',
  title: '13. Copy & Move',
  explanation: `## Copy & Move Semantics in C++

C++ gives you precise control over how objects are copied and moved.

### Copy Constructor & Copy Assignment
\`\`\`cpp
class Foo {
public:
    Foo(const Foo& other);             // copy constructor
    Foo& operator=(const Foo& other);  // copy assignment
};
\`\`\`

### Rule of Three
If your class manages a resource (raw pointer, file handle, etc.), you should define all three: **destructor**, **copy constructor**, and **copy assignment operator**.

### Move Constructor & Move Assignment (C++11)
Move semantics transfer ownership of resources instead of copying them. An rvalue reference (\`&&\`) binds to temporaries.

\`\`\`cpp
class Foo {
public:
    Foo(Foo&& other) noexcept;             // move constructor
    Foo& operator=(Foo&& other) noexcept;  // move assignment
};
\`\`\`

### Rule of Five
If you define any of the five special member functions (destructor, copy ctor, copy assign, move ctor, move assign), you should define all five.

### std::move
\`std::move\` casts an lvalue to an rvalue reference, enabling move semantics:
\`\`\`cpp
std::string a = "hello";
std::string b = std::move(a);  // a is now in a moved-from state
\`\`\`

### = default / = delete
\`\`\`cpp
class NoCopy {
public:
    NoCopy(const NoCopy&) = delete;
    NoCopy& operator=(const NoCopy&) = delete;
    NoCopy(NoCopy&&) = default;
    NoCopy& operator=(NoCopy&&) = default;
};
\`\`\`
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-copy-move-1',
      title: 'Copy constructor parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the parameter type for the copy constructor.',
      skeleton: `class Widget {
    int value;
public:
    Widget(int v) : value(v) {}
    Widget(__BLANK__ other) : value(other.value) {}
};`,
      solution: `class Widget {
    int value;
public:
    Widget(int v) : value(v) {}
    Widget(const Widget& other) : value(other.value) {}
};`,
      hints: [
        'The copy constructor takes a reference to the same type.',
        'The reference should be const to avoid modifying the source.',
        'The parameter type is `const Widget&`.',
      ],
      concepts: ['copy-constructor', 'const-reference'],
    },
    {
      id: 'cpp-copy-move-2',
      title: 'Move constructor parameter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the parameter type for the move constructor.',
      skeleton: `class Buffer {
    int* data;
    int size;
public:
    Buffer(__BLANK__ other) noexcept
        : data(other.data), size(other.size) {
        other.data = nullptr;
        other.size = 0;
    }
};`,
      solution: `class Buffer {
    int* data;
    int size;
public:
    Buffer(Buffer&& other) noexcept
        : data(other.data), size(other.size) {
        other.data = nullptr;
        other.size = 0;
    }
};`,
      hints: [
        'Move constructors take an rvalue reference.',
        'An rvalue reference uses double ampersand.',
        'The parameter type is `Buffer&&`.',
      ],
      concepts: ['move-constructor', 'rvalue-reference'],
    },
    {
      id: 'cpp-copy-move-3',
      title: 'std::move cast',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the function that casts an lvalue to an rvalue reference.',
      skeleton: `#include <utility>
#include <string>

std::string a = "hello";
std::string b = __BLANK__(a);  // transfer ownership`,
      solution: `#include <utility>
#include <string>

std::string a = "hello";
std::string b = std::move(a);  // transfer ownership`,
      hints: [
        'This function does not actually move anything; it just casts.',
        'It is found in the <utility> header.',
        'The function is `std::move`.',
      ],
      concepts: ['std-move', 'rvalue-reference'],
    },
    {
      id: 'cpp-copy-move-4',
      title: 'Delete copy operations',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the syntax to delete the copy constructor.',
      skeleton: `class UniqueHandle {
    int fd;
public:
    UniqueHandle(int f) : fd(f) {}
    UniqueHandle(const UniqueHandle&) = __BLANK__;
    UniqueHandle& operator=(const UniqueHandle&) = delete;
};`,
      solution: `class UniqueHandle {
    int fd;
public:
    UniqueHandle(int f) : fd(f) {}
    UniqueHandle(const UniqueHandle&) = delete;
    UniqueHandle& operator=(const UniqueHandle&) = delete;
};`,
      hints: [
        'You want to prevent copying entirely.',
        'There is a keyword that removes a special member function.',
        'The keyword is `delete`.',
      ],
      concepts: ['deleted-function', 'non-copyable'],
    },
    {
      id: 'cpp-copy-move-5',
      title: 'Default the move constructor',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Let the compiler generate the move constructor.',
      skeleton: `class Data {
    std::string name;
    std::vector<int> values;
public:
    Data(Data&&) = __BLANK__;
    Data& operator=(Data&&) = default;
};`,
      solution: `class Data {
    std::string name;
    std::vector<int> values;
public:
    Data(Data&&) = default;
    Data& operator=(Data&&) = default;
};`,
      hints: [
        'The compiler can generate this function automatically.',
        'Use the keyword that requests the compiler-generated version.',
        'The keyword is `default`.',
      ],
      concepts: ['defaulted-function', 'move-constructor'],
    },
    {
      id: 'cpp-copy-move-6',
      title: 'noexcept on move constructor',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Add the specifier that marks the move constructor as non-throwing.',
      skeleton: `class Pool {
    int* buf;
    int sz;
public:
    Pool(Pool&& other) __BLANK__
        : buf(other.buf), sz(other.sz) {
        other.buf = nullptr;
        other.sz = 0;
    }
};`,
      solution: `class Pool {
    int* buf;
    int sz;
public:
    Pool(Pool&& other) noexcept
        : buf(other.buf), sz(other.sz) {
        other.buf = nullptr;
        other.sz = 0;
    }
};`,
      hints: [
        'Move constructors should declare they will not throw exceptions.',
        'This allows STL containers to use moves during reallocation.',
        'The specifier is `noexcept`.',
      ],
      concepts: ['noexcept', 'move-constructor'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-copy-move-7',
      title: 'Write a copy constructor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a deep-copy constructor for DynArray that allocates new storage and copies elements.',
      skeleton: `class DynArray {
    int* arr;
    int len;
public:
    DynArray(int n) : len(n), arr(new int[n]{}) {}
    ~DynArray() { delete[] arr; }
    // Write the copy constructor
    int& operator[](int i) { return arr[i]; }
    int size() const { return len; }
};`,
      solution: `class DynArray {
    int* arr;
    int len;
public:
    DynArray(int n) : len(n), arr(new int[n]{}) {}
    DynArray(const DynArray& other) : len(other.len), arr(new int[other.len]) {
        for (int i = 0; i < len; ++i)
            arr[i] = other.arr[i];
    }
    ~DynArray() { delete[] arr; }
    int& operator[](int i) { return arr[i]; }
    int size() const { return len; }
};`,
      hints: [
        'Allocate a new array of size other.len.',
        'Copy each element from the source array.',
        'Use the initializer list for len and arr.',
      ],
      concepts: ['copy-constructor', 'deep-copy'],
    },
    {
      id: 'cpp-copy-move-8',
      title: 'Write copy assignment operator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a copy assignment operator for DynArray using copy-and-swap idiom.',
      skeleton: `class DynArray {
    int* arr;
    int len;
public:
    DynArray(int n) : len(n), arr(new int[n]{}) {}
    DynArray(const DynArray& other) : len(other.len), arr(new int[other.len]) {
        for (int i = 0; i < len; ++i) arr[i] = other.arr[i];
    }
    ~DynArray() { delete[] arr; }
    // Write operator= using copy-and-swap
    void swap(DynArray& other) noexcept {
        std::swap(arr, other.arr);
        std::swap(len, other.len);
    }
};`,
      solution: `class DynArray {
    int* arr;
    int len;
public:
    DynArray(int n) : len(n), arr(new int[n]{}) {}
    DynArray(const DynArray& other) : len(other.len), arr(new int[other.len]) {
        for (int i = 0; i < len; ++i) arr[i] = other.arr[i];
    }
    ~DynArray() { delete[] arr; }
    DynArray& operator=(DynArray other) {
        swap(other);
        return *this;
    }
    void swap(DynArray& other) noexcept {
        std::swap(arr, other.arr);
        std::swap(len, other.len);
    }
};`,
      hints: [
        'Take the parameter by value to leverage the copy constructor.',
        'Swap the contents of *this with the parameter.',
        'Return *this.',
      ],
      concepts: ['copy-assignment', 'copy-and-swap'],
    },
    {
      id: 'cpp-copy-move-9',
      title: 'Write a move constructor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a move constructor for UniqueBuffer that steals resources from the source.',
      skeleton: `class UniqueBuffer {
    int* data;
    int size;
public:
    UniqueBuffer(int s) : size(s), data(new int[s]{}) {}
    UniqueBuffer(const UniqueBuffer&) = delete;
    UniqueBuffer& operator=(const UniqueBuffer&) = delete;
    ~UniqueBuffer() { delete[] data; }
    // Write the move constructor
};`,
      solution: `class UniqueBuffer {
    int* data;
    int size;
public:
    UniqueBuffer(int s) : size(s), data(new int[s]{}) {}
    UniqueBuffer(const UniqueBuffer&) = delete;
    UniqueBuffer& operator=(const UniqueBuffer&) = delete;
    UniqueBuffer(UniqueBuffer&& other) noexcept
        : data(other.data), size(other.size) {
        other.data = nullptr;
        other.size = 0;
    }
    ~UniqueBuffer() { delete[] data; }
};`,
      hints: [
        'Take an rvalue reference parameter: UniqueBuffer&&.',
        'Steal the pointer and size from the source.',
        'Set the source pointer to nullptr and size to 0.',
      ],
      concepts: ['move-constructor', 'resource-transfer'],
    },
    {
      id: 'cpp-copy-move-10',
      title: 'Write move assignment operator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a move assignment operator for UniqueBuffer.',
      skeleton: `class UniqueBuffer {
    int* data;
    int size;
public:
    UniqueBuffer(int s) : size(s), data(new int[s]{}) {}
    UniqueBuffer(UniqueBuffer&& other) noexcept
        : data(other.data), size(other.size) {
        other.data = nullptr;
        other.size = 0;
    }
    ~UniqueBuffer() { delete[] data; }
    // Write move assignment operator
};`,
      solution: `class UniqueBuffer {
    int* data;
    int size;
public:
    UniqueBuffer(int s) : size(s), data(new int[s]{}) {}
    UniqueBuffer(UniqueBuffer&& other) noexcept
        : data(other.data), size(other.size) {
        other.data = nullptr;
        other.size = 0;
    }
    ~UniqueBuffer() { delete[] data; }
    UniqueBuffer& operator=(UniqueBuffer&& other) noexcept {
        if (this != &other) {
            delete[] data;
            data = other.data;
            size = other.size;
            other.data = nullptr;
            other.size = 0;
        }
        return *this;
    }
};`,
      hints: [
        'Check for self-assignment first.',
        'Free existing resources before stealing new ones.',
        'Null out the source and return *this.',
      ],
      concepts: ['move-assignment', 'self-assignment-check'],
    },
    {
      id: 'cpp-copy-move-11',
      title: 'Write Rule of Five class',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a complete Rule-of-Five String class wrapping a char* buffer.',
      skeleton: `#include <cstring>
// Write class String with:
// - private char* buf, int len
// - Constructor from const char*
// - Destructor
// - Copy constructor (deep copy)
// - Copy assignment (copy-and-swap)
// - Move constructor
// - Move assignment`,
      solution: `#include <cstring>

class String {
    char* buf;
    int len;
public:
    String(const char* s = "")
        : len(static_cast<int>(std::strlen(s))),
          buf(new char[std::strlen(s) + 1]) {
        std::strcpy(buf, s);
    }
    ~String() { delete[] buf; }
    String(const String& other)
        : len(other.len), buf(new char[other.len + 1]) {
        std::strcpy(buf, other.buf);
    }
    String(String&& other) noexcept
        : buf(other.buf), len(other.len) {
        other.buf = nullptr;
        other.len = 0;
    }
    String& operator=(String other) {
        std::swap(buf, other.buf);
        std::swap(len, other.len);
        return *this;
    }
    String& operator=(String&& other) noexcept {
        if (this != &other) {
            delete[] buf;
            buf = other.buf;
            len = other.len;
            other.buf = nullptr;
            other.len = 0;
        }
        return *this;
    }
};`,
      hints: [
        'The copy-and-swap idiom handles both copy and move assignment if you take by value.',
        'The move constructor steals buf and nulls out the source.',
        'Always use noexcept on move operations.',
      ],
      concepts: ['rule-of-five', 'copy-and-swap', 'move-semantics'],
    },
    {
      id: 'cpp-copy-move-12',
      title: 'Write a move-only wrapper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a MoveOnly class that deletes copy operations and defaults move operations.',
      skeleton: `#include <string>
// Write class MoveOnly with:
// - private std::string data
// - Constructor taking string
// - Deleted copy constructor and copy assignment
// - Defaulted move constructor and move assignment
// - std::string getData() const`,
      solution: `#include <string>

class MoveOnly {
    std::string data;
public:
    MoveOnly(std::string s) : data(std::move(s)) {}
    MoveOnly(const MoveOnly&) = delete;
    MoveOnly& operator=(const MoveOnly&) = delete;
    MoveOnly(MoveOnly&&) = default;
    MoveOnly& operator=(MoveOnly&&) = default;
    std::string getData() const { return data; }
};`,
      hints: [
        'Use = delete for copy constructor and copy assignment.',
        'Use = default for move constructor and move assignment.',
        'The compiler will member-wise move std::string when defaulted.',
      ],
      concepts: ['non-copyable', 'move-only', 'deleted-function'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-copy-move-13',
      title: 'Fix: shallow copy causes double free',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the class so that copying does not cause a double-free.',
      skeleton: `class Holder {
    int* ptr;
public:
    Holder(int val) : ptr(new int(val)) {}
    ~Holder() { delete ptr; }
    // Bug: no copy constructor - compiler generates shallow copy
    int get() const { return *ptr; }
};

int main() {
    Holder a(42);
    Holder b = a;  // shallow copy -> double free!
    return 0;
}`,
      solution: `class Holder {
    int* ptr;
public:
    Holder(int val) : ptr(new int(val)) {}
    Holder(const Holder& other) : ptr(new int(*other.ptr)) {}
    Holder& operator=(const Holder& other) {
        if (this != &other) {
            *ptr = *other.ptr;
        }
        return *this;
    }
    ~Holder() { delete ptr; }
    int get() const { return *ptr; }
};

int main() {
    Holder a(42);
    Holder b = a;
    return 0;
}`,
      hints: [
        'The default copy constructor copies the pointer, not the pointee.',
        'Both objects then try to delete the same memory.',
        'Add a copy constructor that allocates new memory and copies the value.',
      ],
      concepts: ['rule-of-three', 'deep-copy', 'double-free'],
    },
    {
      id: 'cpp-copy-move-14',
      title: 'Fix: moved-from object not nulled',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the move constructor so the moved-from object is left in a valid state.',
      skeleton: `class Handle {
    int* resource;
public:
    Handle(int val) : resource(new int(val)) {}
    Handle(Handle&& other) noexcept : resource(other.resource) {
        // Bug: forgot to null out other.resource
    }
    ~Handle() { delete resource; }
};`,
      solution: `class Handle {
    int* resource;
public:
    Handle(int val) : resource(new int(val)) {}
    Handle(Handle&& other) noexcept : resource(other.resource) {
        other.resource = nullptr;
    }
    ~Handle() { delete resource; }
};`,
      hints: [
        'After stealing the resource, the source still points to it.',
        'When the source is destroyed, it will delete the resource we now own.',
        'Set other.resource = nullptr after stealing it.',
      ],
      concepts: ['move-constructor', 'moved-from-state'],
    },
    {
      id: 'cpp-copy-move-15',
      title: 'Fix: missing self-assignment check',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fix the copy assignment operator to handle self-assignment safely.',
      skeleton: `class Array {
    int* data;
    int size;
public:
    Array(int s) : size(s), data(new int[s]{}) {}
    Array(const Array& o) : size(o.size), data(new int[o.size]) {
        for (int i = 0; i < size; ++i) data[i] = o.data[i];
    }
    Array& operator=(const Array& o) {
        // Bug: deletes own data before copying from it on self-assign
        delete[] data;
        size = o.size;
        data = new int[size];
        for (int i = 0; i < size; ++i) data[i] = o.data[i];
        return *this;
    }
    ~Array() { delete[] data; }
};`,
      solution: `class Array {
    int* data;
    int size;
public:
    Array(int s) : size(s), data(new int[s]{}) {}
    Array(const Array& o) : size(o.size), data(new int[o.size]) {
        for (int i = 0; i < size; ++i) data[i] = o.data[i];
    }
    Array& operator=(const Array& o) {
        if (this != &o) {
            delete[] data;
            size = o.size;
            data = new int[size];
            for (int i = 0; i < size; ++i) data[i] = o.data[i];
        }
        return *this;
    }
    ~Array() { delete[] data; }
};`,
      hints: [
        'What happens when you assign an object to itself?',
        'delete[] data would destroy the source data too.',
        'Add a self-assignment check: if (this != &o).',
      ],
      concepts: ['copy-assignment', 'self-assignment'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-copy-move-16',
      title: 'Predict: copy vs move',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict which special member functions are called.',
      skeleton: `#include <iostream>

class Tracker {
public:
    Tracker() { std::cout << "ctor "; }
    Tracker(const Tracker&) { std::cout << "copy "; }
    Tracker(Tracker&&) noexcept { std::cout << "move "; }
    ~Tracker() { std::cout << "dtor "; }
};

int main() {
    Tracker a;
    Tracker b = a;
    Tracker c = std::move(a);
    return 0;
}`,
      solution: `ctor copy move dtor dtor dtor `,
      hints: [
        'a is default constructed, b is copy constructed from a.',
        'c is move constructed because std::move casts a to an rvalue.',
        'All three destructors run at the end of main.',
      ],
      concepts: ['copy-constructor', 'move-constructor', 'std-move'],
    },
    {
      id: 'cpp-copy-move-17',
      title: 'Predict: return value optimization',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Predict what special member functions are called (assuming no copy elision).',
      skeleton: `#include <iostream>

class Obj {
public:
    Obj() { std::cout << "C"; }
    Obj(const Obj&) { std::cout << "c"; }
    Obj(Obj&&) noexcept { std::cout << "m"; }
    ~Obj() { std::cout << "D"; }
};

Obj make() {
    Obj o;
    return o;
}

// Assuming NRVO is disabled (-fno-elide-constructors):
int main() {
    Obj x = make();
    return 0;
}`,
      solution: `CmDmDD`,
      hints: [
        'Without copy elision, returning a local object triggers a move.',
        'The local o is constructed (C), then moved to return value (m), o destroyed (D).',
        'The return value is moved into x (m), temporary destroyed (D), then x destroyed (D).',
      ],
      concepts: ['NRVO', 'move-constructor', 'copy-elision'],
    },
    {
      id: 'cpp-copy-move-18',
      title: 'Predict: deleted copy prevents compilation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict whether this code compiles.',
      skeleton: `class Unique {
public:
    Unique() = default;
    Unique(const Unique&) = delete;
    Unique& operator=(const Unique&) = delete;
};

int main() {
    Unique a;
    Unique b = a;  // Does this compile?
    return 0;
}`,
      solution: `compile error`,
      hints: [
        'The copy constructor is explicitly deleted.',
        'Unique b = a; tries to copy-construct b from a.',
        'Using a deleted function is a compile error.',
      ],
      concepts: ['deleted-function', 'non-copyable'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-copy-move-19',
      title: 'Refactor: Rule of Three to Rule of Five',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Extend this Rule-of-Three class to Rule-of-Five by adding move operations.',
      skeleton: `class Image {
    int* pixels;
    int width, height;
public:
    Image(int w, int h) : width(w), height(h), pixels(new int[w * h]{}) {}
    Image(const Image& o) : width(o.width), height(o.height),
        pixels(new int[o.width * o.height]) {
        std::copy(o.pixels, o.pixels + width * height, pixels);
    }
    Image& operator=(const Image& o) {
        if (this != &o) {
            delete[] pixels;
            width = o.width;
            height = o.height;
            pixels = new int[width * height];
            std::copy(o.pixels, o.pixels + width * height, pixels);
        }
        return *this;
    }
    ~Image() { delete[] pixels; }
};`,
      solution: `class Image {
    int* pixels;
    int width, height;
public:
    Image(int w, int h) : width(w), height(h), pixels(new int[w * h]{}) {}
    Image(const Image& o) : width(o.width), height(o.height),
        pixels(new int[o.width * o.height]) {
        std::copy(o.pixels, o.pixels + width * height, pixels);
    }
    Image(Image&& o) noexcept
        : pixels(o.pixels), width(o.width), height(o.height) {
        o.pixels = nullptr;
        o.width = 0;
        o.height = 0;
    }
    Image& operator=(const Image& o) {
        if (this != &o) {
            delete[] pixels;
            width = o.width;
            height = o.height;
            pixels = new int[width * height];
            std::copy(o.pixels, o.pixels + width * height, pixels);
        }
        return *this;
    }
    Image& operator=(Image&& o) noexcept {
        if (this != &o) {
            delete[] pixels;
            pixels = o.pixels;
            width = o.width;
            height = o.height;
            o.pixels = nullptr;
            o.width = 0;
            o.height = 0;
        }
        return *this;
    }
    ~Image() { delete[] pixels; }
};`,
      hints: [
        'Add a move constructor that steals the pixel pointer.',
        'Add a move assignment operator that frees existing data then steals.',
        'Mark both move operations as noexcept.',
      ],
      concepts: ['rule-of-five', 'move-semantics'],
    },
    {
      id: 'cpp-copy-move-20',
      title: 'Refactor: use unique_ptr to avoid manual management',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor the class to use std::unique_ptr, eliminating the need for manual copy/move/destructor.',
      skeleton: `class Document {
    char* text;
    int length;
public:
    Document(const char* t) : length(std::strlen(t)),
        text(new char[std::strlen(t) + 1]) {
        std::strcpy(text, t);
    }
    Document(const Document&) = delete;
    Document& operator=(const Document&) = delete;
    Document(Document&& o) noexcept : text(o.text), length(o.length) {
        o.text = nullptr;
        o.length = 0;
    }
    Document& operator=(Document&& o) noexcept {
        if (this != &o) {
            delete[] text;
            text = o.text;
            length = o.length;
            o.text = nullptr;
            o.length = 0;
        }
        return *this;
    }
    ~Document() { delete[] text; }
    const char* getText() const { return text; }
};`,
      solution: `#include <memory>
#include <cstring>

class Document {
    std::unique_ptr<char[]> text;
    int length;
public:
    Document(const char* t) : length(static_cast<int>(std::strlen(t))),
        text(std::make_unique<char[]>(std::strlen(t) + 1)) {
        std::strcpy(text.get(), t);
    }
    Document(const Document&) = delete;
    Document& operator=(const Document&) = delete;
    Document(Document&&) = default;
    Document& operator=(Document&&) = default;
    ~Document() = default;
    const char* getText() const { return text.get(); }
};`,
      hints: [
        'Replace char* with std::unique_ptr<char[]>.',
        'unique_ptr handles deletion automatically.',
        'Move operations can be defaulted since unique_ptr is already move-only.',
      ],
      concepts: ['unique-ptr', 'RAII', 'rule-of-zero'],
    },
  ],
};
