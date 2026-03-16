import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-smart-ptr',
  title: '23. Smart Pointers',
  explanation: `## Smart Pointers in C++\n\nSmart pointers are class templates that manage dynamically allocated memory automatically. They ensure proper cleanup when the pointer goes out of scope, preventing memory leaks.\n\n### unique_ptr - Exclusive Ownership\n\n\`\`\`cpp\n#include <memory>\n\n// Creating\nauto p = std::make_unique<int>(42);\nstd::unique_ptr<int> p2(new int(10)); // less preferred\n\n// Cannot copy, only move\n// auto p3 = p;           // ERROR: deleted copy constructor\nauto p3 = std::move(p);   // OK: p is now nullptr\n\n// Array support\nauto arr = std::make_unique<int[]>(5);\narr[0] = 10;\n\`\`\`\n\n### shared_ptr - Shared Ownership\n\n\`\`\`cpp\nauto sp1 = std::make_shared<int>(42);\nauto sp2 = sp1;  // reference count = 2\nsp2.reset();      // reference count = 1\nsp1.reset();      // reference count = 0, memory freed\n\nstd::cout << sp1.use_count(); // check reference count\n\`\`\`\n\n### weak_ptr - Non-Owning Observer\n\n\`\`\`cpp\nauto sp = std::make_shared<int>(42);\nstd::weak_ptr<int> wp = sp;\n\nif (auto locked = wp.lock()) {\n    // locked is a shared_ptr, object still alive\n    std::cout << *locked;\n}\n\nsp.reset();\n// wp.lock() now returns nullptr - object is gone\n\`\`\`\n\n### Custom Deleters\n\n\`\`\`cpp\nauto deleter = [](FILE* f) { if (f) fclose(f); };\nstd::unique_ptr<FILE, decltype(deleter)> file(fopen(\"test.txt\", \"r\"), deleter);\n\`\`\`\n\nPrefer \`make_unique\` and \`make_shared\` over raw \`new\` for exception safety and efficiency.`,
  exercises: [
    {
      id: 'cpp-smart-ptr-1',
      title: 'Create a unique_ptr',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to create a unique_ptr to an integer with value 42.',
      skeleton: `#include <memory>
#include <iostream>

int main() {
    auto p = ___(42);
    std::cout << *p << std::endl; // prints 42
    return 0;
}`,
      solution: `#include <memory>
#include <iostream>

int main() {
    auto p = std::make_unique<int>(42);
    std::cout << *p << std::endl; // prints 42
    return 0;
}`,
      hints: [
        'The preferred way to create a unique_ptr is with a factory function.',
        'This function is in the <memory> header.',
        'std::make_unique<int>(42) creates a unique_ptr<int>.',
      ],
      concepts: ['std::make_unique', 'unique_ptr', 'smart-pointer'],
    },
    {
      id: 'cpp-smart-ptr-2',
      title: 'Transfer Ownership with move',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to transfer ownership of a unique_ptr.',
      skeleton: `#include <memory>
#include <iostream>

int main() {
    auto p1 = std::make_unique<int>(100);
    auto p2 = ___(p1);
    // p1 is now nullptr, p2 owns the integer
    std::cout << *p2 << std::endl; // prints 100
    return 0;
}`,
      solution: `#include <memory>
#include <iostream>

int main() {
    auto p1 = std::make_unique<int>(100);
    auto p2 = std::move(p1);
    // p1 is now nullptr, p2 owns the integer
    std::cout << *p2 << std::endl; // prints 100
    return 0;
}`,
      hints: [
        'unique_ptr cannot be copied, only moved.',
        'Use std::move to transfer ownership.',
        'After the move, the source pointer becomes nullptr.',
      ],
      concepts: ['std::move', 'ownership-transfer', 'unique_ptr'],
    },
    {
      id: 'cpp-smart-ptr-3',
      title: 'Create a shared_ptr',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to create a shared_ptr and check the reference count.',
      skeleton: `#include <memory>
#include <iostream>

int main() {
    auto sp1 = ___(99);
    auto sp2 = sp1; // copy is allowed
    std::cout << sp1.use_count() << std::endl; // prints 2
    return 0;
}`,
      solution: `#include <memory>
#include <iostream>

int main() {
    auto sp1 = std::make_shared<int>(99);
    auto sp2 = sp1; // copy is allowed
    std::cout << sp1.use_count() << std::endl; // prints 2
    return 0;
}`,
      hints: [
        'The preferred way to create a shared_ptr is with a factory function.',
        'shared_ptr supports copying unlike unique_ptr.',
        'std::make_shared<int>(99) creates a shared_ptr<int>.',
      ],
      concepts: ['std::make_shared', 'shared_ptr', 'reference-counting'],
    },
    {
      id: 'cpp-smart-ptr-4',
      title: 'Lock a weak_ptr',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to safely access the object through a weak_ptr.',
      skeleton: `#include <memory>
#include <iostream>

int main() {
    auto sp = std::make_shared<int>(42);
    std::weak_ptr<int> wp = sp;

    if (auto locked = wp.___()) {
        std::cout << *locked << std::endl; // prints 42
    }
    return 0;
}`,
      solution: `#include <memory>
#include <iostream>

int main() {
    auto sp = std::make_shared<int>(42);
    std::weak_ptr<int> wp = sp;

    if (auto locked = wp.lock()) {
        std::cout << *locked << std::endl; // prints 42
    }
    return 0;
}`,
      hints: [
        'weak_ptr must be converted to shared_ptr before use.',
        'The conversion function returns nullptr if the object was destroyed.',
        'wp.lock() returns a shared_ptr if the object is still alive.',
      ],
      concepts: ['weak_ptr', 'lock', 'safe-access'],
    },
    {
      id: 'cpp-smart-ptr-5',
      title: 'Reset a shared_ptr',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to release the shared_ptr reference.',
      skeleton: `#include <memory>
#include <iostream>

int main() {
    auto sp1 = std::make_shared<int>(10);
    auto sp2 = sp1;
    std::cout << sp1.use_count() << " "; // 2
    sp2.___();
    std::cout << sp1.use_count() << std::endl; // 1
    return 0;
}`,
      solution: `#include <memory>
#include <iostream>

int main() {
    auto sp1 = std::make_shared<int>(10);
    auto sp2 = sp1;
    std::cout << sp1.use_count() << " "; // 2
    sp2.reset();
    std::cout << sp1.use_count() << std::endl; // 1
    return 0;
}`,
      hints: [
        'This function releases the current ownership.',
        'It decrements the reference count.',
        'reset() makes the pointer point to nullptr.',
      ],
      concepts: ['reset', 'reference-counting', 'shared_ptr'],
    },
    {
      id: 'cpp-smart-ptr-6',
      title: 'unique_ptr with Custom Type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to create a unique_ptr to a struct with constructor arguments.',
      skeleton: `#include <memory>
#include <string>
#include <iostream>

struct Person {
    std::string name;
    int age;
    Person(std::string n, int a) : name(std::move(n)), age(a) {}
};

int main() {
    auto p = std::make_unique<___>("Alice", 30);
    std::cout << p->name << " " << p->age << std::endl;
    return 0;
}`,
      solution: `#include <memory>
#include <string>
#include <iostream>

struct Person {
    std::string name;
    int age;
    Person(std::string n, int a) : name(std::move(n)), age(a) {}
};

int main() {
    auto p = std::make_unique<Person>("Alice", 30);
    std::cout << p->name << " " << p->age << std::endl;
    return 0;
}`,
      hints: [
        'Specify the type to allocate in the template argument.',
        'Constructor arguments are forwarded automatically.',
        'std::make_unique<Person>(...) forwards args to Person constructor.',
      ],
      concepts: ['make_unique', 'constructor-forwarding', 'custom-type'],
    },
    {
      id: 'cpp-smart-ptr-7',
      title: 'Write a Factory Function with unique_ptr',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a factory function that returns a unique_ptr to a dynamically created Widget.',
      skeleton: `#include <memory>
#include <string>

struct Widget {
    std::string label;
    int value;
    Widget(std::string l, int v) : label(std::move(l)), value(v) {}
};

// Write create_widget: takes a string label and int value,
// returns a unique_ptr<Widget>
`,
      solution: `#include <memory>
#include <string>

struct Widget {
    std::string label;
    int value;
    Widget(std::string l, int v) : label(std::move(l)), value(v) {}
};

std::unique_ptr<Widget> create_widget(std::string label, int value) {
    return std::make_unique<Widget>(std::move(label), value);
}`,
      hints: [
        'Return type should be std::unique_ptr<Widget>.',
        'Use std::make_unique to create the Widget.',
        'unique_ptr is returned by move implicitly.',
      ],
      concepts: ['factory-function', 'unique_ptr', 'make_unique'],
    },
    {
      id: 'cpp-smart-ptr-8',
      title: 'Write a shared_ptr Observer Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a class Observer that holds a weak_ptr to a shared resource and has a method to safely print the resource value.',
      skeleton: `#include <memory>
#include <iostream>

struct Resource {
    int data;
    Resource(int d) : data(d) {}
};

// Write Observer class with:
// - Constructor taking shared_ptr<Resource>
// - print() method that safely prints data or "expired"
`,
      solution: `#include <memory>
#include <iostream>

struct Resource {
    int data;
    Resource(int d) : data(d) {}
};

class Observer {
    std::weak_ptr<Resource> ref_;
public:
    Observer(std::shared_ptr<Resource> res) : ref_(res) {}

    void print() const {
        if (auto sp = ref_.lock()) {
            std::cout << sp->data << std::endl;
        } else {
            std::cout << "expired" << std::endl;
        }
    }
};`,
      hints: [
        'Store the shared_ptr as a weak_ptr to avoid circular references.',
        'Use lock() to check if the resource still exists.',
        'lock() returns a shared_ptr or nullptr if the object is gone.',
      ],
      concepts: ['weak_ptr', 'observer-pattern', 'lock'],
    },
    {
      id: 'cpp-smart-ptr-9',
      title: 'Write a Polymorphic Container',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that creates a vector of unique_ptr to a base class, populated with derived instances.',
      skeleton: `#include <memory>
#include <vector>
#include <string>

struct Shape {
    virtual ~Shape() = default;
    virtual std::string name() const = 0;
};

struct Circle : Shape {
    std::string name() const override { return "Circle"; }
};

struct Square : Shape {
    std::string name() const override { return "Square"; }
};

// Write make_shapes: returns vector<unique_ptr<Shape>>
// containing one Circle and one Square
`,
      solution: `#include <memory>
#include <vector>
#include <string>

struct Shape {
    virtual ~Shape() = default;
    virtual std::string name() const = 0;
};

struct Circle : Shape {
    std::string name() const override { return "Circle"; }
};

struct Square : Shape {
    std::string name() const override { return "Square"; }
};

std::vector<std::unique_ptr<Shape>> make_shapes() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Circle>());
    shapes.push_back(std::make_unique<Square>());
    return shapes;
}`,
      hints: [
        'Use a vector of unique_ptr<Shape> for polymorphic ownership.',
        'make_unique<Circle>() returns unique_ptr<Circle>, implicitly convertible to unique_ptr<Shape>.',
        'push_back with move semantics transfers ownership into the vector.',
      ],
      concepts: ['polymorphism', 'unique_ptr', 'virtual-dispatch'],
    },
    {
      id: 'cpp-smart-ptr-10',
      title: 'Write a Custom Deleter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function that returns a unique_ptr with a custom deleter for a C-style FILE pointer.',
      skeleton: `#include <memory>
#include <cstdio>

// Write open_file: takes a filename and mode string,
// returns unique_ptr<FILE, ...> with a custom deleter that calls fclose.
// Return nullptr-wrapped unique_ptr if fopen fails.
`,
      solution: `#include <memory>
#include <cstdio>

auto open_file(const char* filename, const char* mode) {
    auto deleter = [](FILE* f) { if (f) fclose(f); };
    std::unique_ptr<FILE, decltype(deleter)> file(fopen(filename, mode), deleter);
    return file;
}`,
      hints: [
        'Use a lambda as the custom deleter that calls fclose.',
        'The deleter type goes as the second template parameter.',
        'decltype(deleter) deduces the lambda type for unique_ptr.',
      ],
      concepts: ['custom-deleter', 'unique_ptr', 'RAII'],
    },
    {
      id: 'cpp-smart-ptr-11',
      title: 'Write enable_shared_from_this',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a class that can safely create a shared_ptr to itself using enable_shared_from_this.',
      skeleton: `#include <memory>
#include <iostream>

// Write class Node that:
// - inherits from enable_shared_from_this<Node>
// - has an int value member
// - has a get_self() method returning shared_ptr<Node>
`,
      solution: `#include <memory>
#include <iostream>

class Node : public std::enable_shared_from_this<Node> {
public:
    int value;

    explicit Node(int v) : value(v) {}

    std::shared_ptr<Node> get_self() {
        return shared_from_this();
    }
};`,
      hints: [
        'Inherit publicly from std::enable_shared_from_this<Node>.',
        'Call shared_from_this() to get a shared_ptr to the current object.',
        'The object must already be owned by a shared_ptr for this to work.',
      ],
      concepts: ['enable_shared_from_this', 'shared_from_this', 'shared-ownership'],
    },
    {
      id: 'cpp-smart-ptr-12',
      title: 'Write a shared_ptr Aliasing Constructor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function that uses the aliasing constructor to create a shared_ptr to a member of a shared object.',
      skeleton: `#include <memory>
#include <string>

struct Config {
    std::string host;
    int port;
};

// Write get_host_ptr: takes shared_ptr<Config>,
// returns shared_ptr<std::string> that points to the host member
// but shares ownership with the Config object.
`,
      solution: `#include <memory>
#include <string>

struct Config {
    std::string host;
    int port;
};

std::shared_ptr<std::string> get_host_ptr(std::shared_ptr<Config> cfg) {
    return std::shared_ptr<std::string>(cfg, &cfg->host);
}`,
      hints: [
        'The aliasing constructor takes a shared_ptr and a raw pointer.',
        'It shares ownership with the first argument but points to the second.',
        'This keeps the Config alive while giving a shared_ptr to host.',
      ],
      concepts: ['aliasing-constructor', 'shared_ptr', 'member-pointer'],
    },
    {
      id: 'cpp-smart-ptr-13',
      title: 'Fix Double Delete',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the bug where two unique_ptrs try to own the same raw pointer.',
      skeleton: `#include <memory>

int main() {
    int* raw = new int(42);
    std::unique_ptr<int> p1(raw);
    std::unique_ptr<int> p2(raw); // Bug: double ownership!
    return 0;
    // double delete on destruction!
}`,
      solution: `#include <memory>

int main() {
    auto p1 = std::make_unique<int>(42);
    auto p2 = std::make_unique<int>(42);
    return 0;
}`,
      hints: [
        'Two unique_ptrs must never own the same raw pointer.',
        'Each unique_ptr should manage its own allocation.',
        'Use make_unique to create separate objects.',
      ],
      concepts: ['double-delete', 'unique_ptr', 'ownership'],
    },
    {
      id: 'cpp-smart-ptr-14',
      title: 'Fix Circular Reference',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the memory leak caused by circular shared_ptr references.',
      skeleton: `#include <memory>

struct Node {
    std::shared_ptr<Node> next;
    ~Node() { /* never called due to cycle! */ }
};

int main() {
    auto a = std::make_shared<Node>();
    auto b = std::make_shared<Node>();
    a->next = b;
    b->next = a; // circular reference - memory leak!
    return 0;
}`,
      solution: `#include <memory>

struct Node {
    std::weak_ptr<Node> next;
    ~Node() { /* now properly called */ }
};

int main() {
    auto a = std::make_shared<Node>();
    auto b = std::make_shared<Node>();
    a->next = b;
    b->next = a; // weak_ptr breaks the cycle
    return 0;
}`,
      hints: [
        'Circular shared_ptr references prevent reference counts from reaching zero.',
        'Use weak_ptr for at least one direction to break the cycle.',
        'weak_ptr does not increment the reference count.',
      ],
      concepts: ['circular-reference', 'weak_ptr', 'memory-leak'],
    },
    {
      id: 'cpp-smart-ptr-15',
      title: 'Fix shared_ptr from Raw this',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fix the bug where creating a shared_ptr from raw this pointer causes double-delete.',
      skeleton: `#include <memory>
#include <iostream>

class Widget {
public:
    std::shared_ptr<Widget> get_shared() {
        return std::shared_ptr<Widget>(this); // Bug!
    }
};

int main() {
    auto w = std::make_shared<Widget>();
    auto w2 = w->get_shared(); // double-delete!
    return 0;
}`,
      solution: `#include <memory>
#include <iostream>

class Widget : public std::enable_shared_from_this<Widget> {
public:
    std::shared_ptr<Widget> get_shared() {
        return shared_from_this();
    }
};

int main() {
    auto w = std::make_shared<Widget>();
    auto w2 = w->get_shared(); // safe!
    return 0;
}`,
      hints: [
        'Never create a shared_ptr from raw this - it creates a separate control block.',
        'Inherit from std::enable_shared_from_this<Widget>.',
        'Use shared_from_this() to get a shared_ptr that shares the control block.',
      ],
      concepts: ['enable_shared_from_this', 'double-delete', 'control-block'],
    },
    {
      id: 'cpp-smart-ptr-16',
      title: 'Predict shared_ptr Reference Count',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Predict the reference counts printed by this program.',
      skeleton: `#include <memory>
#include <iostream>

int main() {
    auto a = std::make_shared<int>(10);
    std::cout << a.use_count() << " ";
    auto b = a;
    std::cout << a.use_count() << " ";
    {
        auto c = a;
        std::cout << a.use_count() << " ";
    }
    std::cout << a.use_count() << std::endl;
    return 0;
}`,
      solution: `1 2 3 2`,
      hints: [
        'After creation, a is the sole owner: count = 1.',
        'Copying to b increases count to 2.',
        'Copying to c increases count to 3, but c goes out of scope reducing it back to 2.',
      ],
      concepts: ['use_count', 'reference-counting', 'scope'],
    },
    {
      id: 'cpp-smart-ptr-17',
      title: 'Predict unique_ptr Move Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the output after moving a unique_ptr.',
      skeleton: `#include <memory>
#include <iostream>

int main() {
    auto p1 = std::make_unique<int>(42);
    std::cout << (p1 ? "valid" : "null") << " ";
    auto p2 = std::move(p1);
    std::cout << (p1 ? "valid" : "null") << " ";
    std::cout << (p2 ? "valid" : "null") << " ";
    std::cout << *p2 << std::endl;
    return 0;
}`,
      solution: `valid null valid 42`,
      hints: [
        'Before the move, p1 is valid.',
        'After std::move, p1 becomes nullptr.',
        'p2 now owns the integer with value 42.',
      ],
      concepts: ['unique_ptr', 'std::move', 'nullptr'],
    },
    {
      id: 'cpp-smart-ptr-18',
      title: 'Predict weak_ptr Expiry',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the output when the shared_ptr is reset before the weak_ptr is locked.',
      skeleton: `#include <memory>
#include <iostream>

int main() {
    std::weak_ptr<int> wp;
    {
        auto sp = std::make_shared<int>(99);
        wp = sp;
        std::cout << wp.expired() << " ";
    }
    std::cout << wp.expired() << " ";
    auto locked = wp.lock();
    std::cout << (locked ? "alive" : "dead") << std::endl;
    return 0;
}`,
      solution: `0 1 dead`,
      hints: [
        'Inside the block, the shared_ptr is alive so expired() returns false (0).',
        'After the block, the shared_ptr is destroyed so expired() returns true (1).',
        'lock() returns nullptr when the object is gone.',
      ],
      concepts: ['weak_ptr', 'expired', 'lock'],
    },
    {
      id: 'cpp-smart-ptr-19',
      title: 'Refactor Raw Pointers to unique_ptr',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor this code from raw new/delete to use unique_ptr.',
      skeleton: `#include <iostream>
#include <string>

struct Logger {
    std::string prefix;
    Logger(std::string p) : prefix(std::move(p)) {}
    void log(const std::string& msg) {
        std::cout << prefix << ": " << msg << std::endl;
    }
};

int main() {
    Logger* logger = new Logger("[INFO]");
    logger->log("Application started");
    logger->log("Processing complete");
    delete logger;
    return 0;
}`,
      solution: `#include <memory>
#include <iostream>
#include <string>

struct Logger {
    std::string prefix;
    Logger(std::string p) : prefix(std::move(p)) {}
    void log(const std::string& msg) {
        std::cout << prefix << ": " << msg << std::endl;
    }
};

int main() {
    auto logger = std::make_unique<Logger>("[INFO]");
    logger->log("Application started");
    logger->log("Processing complete");
    return 0;
}`,
      hints: [
        'Replace new with std::make_unique.',
        'Remove the manual delete call.',
        'unique_ptr automatically deletes when it goes out of scope.',
      ],
      concepts: ['unique_ptr', 'RAII', 'no-manual-delete'],
    },
    {
      id: 'cpp-smart-ptr-20',
      title: 'Refactor to Use make_shared',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor the code to use make_shared instead of new with shared_ptr constructor for better performance and exception safety.',
      skeleton: `#include <memory>
#include <string>
#include <vector>

struct Task {
    std::string name;
    int priority;
    Task(std::string n, int p) : name(std::move(n)), priority(p) {}
};

int main() {
    std::vector<std::shared_ptr<Task>> tasks;
    tasks.push_back(std::shared_ptr<Task>(new Task("Build", 1)));
    tasks.push_back(std::shared_ptr<Task>(new Task("Test", 2)));
    tasks.push_back(std::shared_ptr<Task>(new Task("Deploy", 3)));
    return 0;
}`,
      solution: `#include <memory>
#include <string>
#include <vector>

struct Task {
    std::string name;
    int priority;
    Task(std::string n, int p) : name(std::move(n)), priority(p) {}
};

int main() {
    std::vector<std::shared_ptr<Task>> tasks;
    tasks.push_back(std::make_shared<Task>("Build", 1));
    tasks.push_back(std::make_shared<Task>("Test", 2));
    tasks.push_back(std::make_shared<Task>("Deploy", 3));
    return 0;
}`,
      hints: [
        'make_shared allocates the object and control block in a single allocation.',
        'This is more efficient and exception-safe than using new.',
        'Replace shared_ptr<T>(new T(...)) with make_shared<T>(...).',
      ],
      concepts: ['make_shared', 'exception-safety', 'single-allocation'],
    },
  ],
};
