import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-patterns',
  title: '45. Design Patterns',
  explanation: `## Design Patterns in C++

Design patterns are reusable solutions to common software design problems. C++ patterns often leverage RAII, templates, and value semantics.

### Singleton
Ensures a class has exactly one instance:
\`\`\`cpp
class Singleton {
    Singleton() = default;
public:
    static Singleton& instance() {
        static Singleton s;  // thread-safe in C++11+
        return s;
    }
    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;
};
\`\`\`

### Factory
Creates objects without exposing instantiation logic:
\`\`\`cpp
std::unique_ptr<Shape> create_shape(const std::string& type) {
    if (type == "circle") return std::make_unique<Circle>();
    if (type == "rect")   return std::make_unique<Rect>();
    return nullptr;
}
\`\`\`

### Observer
Objects subscribe to events and are notified of changes:
\`\`\`cpp
class Subject {
    std::vector<std::function<void(int)>> observers_;
public:
    void subscribe(std::function<void(int)> fn) {
        observers_.push_back(std::move(fn));
    }
    void notify(int val) {
        for (auto& fn : observers_) fn(val);
    }
};
\`\`\`

### Strategy
Select an algorithm at runtime via a callable:
\`\`\`cpp
using Sorter = std::function<void(std::vector<int>&)>;
void process(std::vector<int>& data, Sorter sort) {
    sort(data);
}
\`\`\`

### RAII Pattern
Resource Acquisition Is Initialization -- tie resource lifetime to object lifetime.

### CRTP-Based Patterns
Use the Curiously Recurring Template Pattern for static polymorphism, counters, and mixins (see Section 47).
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-patterns-1',
      title: 'Meyers singleton',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the keyword to make the local variable persist across calls and be initialized only once.',
      skeleton: `class Logger {
    Logger() = default;
public:
    static Logger& instance() {
        __BLANK__ Logger log;
        return log;
    }
    Logger(const Logger&) = delete;
    Logger& operator=(const Logger&) = delete;
};`,
      solution: `class Logger {
    Logger() = default;
public:
    static Logger& instance() {
        static Logger log;
        return log;
    }
    Logger(const Logger&) = delete;
    Logger& operator=(const Logger&) = delete;
};`,
      hints: [
        'This keyword makes a local variable persist for the program lifetime.',
        'In C++11+, initialization of static locals is thread-safe.',
        'The keyword is `static`.',
      ],
      concepts: ['singleton', 'static-local'],
    },
    {
      id: 'cpp-patterns-2',
      title: 'Factory return type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the smart pointer type returned by the factory function.',
      skeleton: `#include <memory>
#include <string>

class Shape { public: virtual ~Shape() = default; };
class Circle : public Shape {};

std::__BLANK__<Shape> create(const std::string& type) {
    if (type == "circle") return std::make_unique<Circle>();
    return nullptr;
}`,
      solution: `#include <memory>
#include <string>

class Shape { public: virtual ~Shape() = default; };
class Circle : public Shape {};

std::unique_ptr<Shape> create(const std::string& type) {
    if (type == "circle") return std::make_unique<Circle>();
    return nullptr;
}`,
      hints: [
        'Factories typically return an owning pointer.',
        'This smart pointer has exclusive ownership.',
        'The type is `unique_ptr`.',
      ],
      concepts: ['factory', 'unique-ptr'],
    },
    {
      id: 'cpp-patterns-3',
      title: 'Observer subscribe',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the container type for storing observer callbacks.',
      skeleton: `#include <vector>
#include <functional>

class EventEmitter {
    std::__BLANK__<std::function<void()>> listeners_;
public:
    void on(std::function<void()> fn) {
        listeners_.push_back(std::move(fn));
    }
    void emit() {
        for (auto& fn : listeners_) fn();
    }
};`,
      solution: `#include <vector>
#include <functional>

class EventEmitter {
    std::vector<std::function<void()>> listeners_;
public:
    void on(std::function<void()> fn) {
        listeners_.push_back(std::move(fn));
    }
    void emit() {
        for (auto& fn : listeners_) fn();
    }
};`,
      hints: [
        'We need a dynamic array of callables.',
        'The most common dynamic array in C++ is from <vector>.',
        'The container is `vector`.',
      ],
      concepts: ['observer', 'vector', 'std-function'],
    },
    {
      id: 'cpp-patterns-4',
      title: 'Strategy pattern with std::function',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the type alias for a strategy that takes a vector and sorts it.',
      skeleton: `#include <functional>
#include <vector>
#include <algorithm>

using SortStrategy = std::__BLANK__<void(std::vector<int>&)>;

void process(std::vector<int>& data, SortStrategy strategy) {
    strategy(data);
}`,
      solution: `#include <functional>
#include <vector>
#include <algorithm>

using SortStrategy = std::function<void(std::vector<int>&)>;

void process(std::vector<int>& data, SortStrategy strategy) {
    strategy(data);
}`,
      hints: [
        'This type-erased callable wrapper is in <functional>.',
        'It can hold lambdas, function pointers, or functors.',
        'The type is `function`.',
      ],
      concepts: ['strategy', 'std-function'],
    },
    {
      id: 'cpp-patterns-5',
      title: 'RAII file handle',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the destructor body to close the file handle using RAII.',
      skeleton: `#include <cstdio>

class FileHandle {
    FILE* fp_;
public:
    explicit FileHandle(const char* path)
        : fp_(std::fopen(path, "r")) {}

    ~FileHandle() {
        __BLANK__
    }

    FILE* get() const { return fp_; }
};`,
      solution: `#include <cstdio>

class FileHandle {
    FILE* fp_;
public:
    explicit FileHandle(const char* path)
        : fp_(std::fopen(path, "r")) {}

    ~FileHandle() {
        if (fp_) std::fclose(fp_);
    }

    FILE* get() const { return fp_; }
};`,
      hints: [
        'RAII means the destructor cleans up the resource.',
        'Check if the pointer is non-null before closing.',
        'Use std::fclose(fp_) to close the file.',
      ],
      concepts: ['raii', 'resource-management'],
    },
    {
      id: 'cpp-patterns-6',
      title: 'Delete copy for singleton',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the keyword to prevent copying the singleton.',
      skeleton: `class Config {
    Config() = default;
public:
    static Config& instance() {
        static Config cfg;
        return cfg;
    }
    Config(const Config&) = __BLANK__;
    Config& operator=(const Config&) = __BLANK__;
};`,
      solution: `class Config {
    Config() = default;
public:
    static Config& instance() {
        static Config cfg;
        return cfg;
    }
    Config(const Config&) = delete;
    Config& operator=(const Config&) = delete;
};`,
      hints: [
        'We want to prevent copy construction and copy assignment.',
        'C++11 lets you explicitly remove special member functions.',
        'The keyword is `delete`.',
      ],
      concepts: ['singleton', 'deleted-functions'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-patterns-7',
      title: 'Factory with registry',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a ShapeFactory class that allows registering creator functions by name and creating shapes by name lookup.',
      skeleton: `#include <memory>
#include <string>
#include <unordered_map>
#include <functional>

class Shape { public: virtual ~Shape() = default; };

class ShapeFactory {
    // TODO: map of name -> creator function
public:
    void register_shape(const std::string& name,
                        std::function<std::unique_ptr<Shape>()> creator) {
        // TODO
    }
    std::unique_ptr<Shape> create(const std::string& name) {
        // TODO
    }
};`,
      solution: `#include <memory>
#include <string>
#include <unordered_map>
#include <functional>

class Shape { public: virtual ~Shape() = default; };

class ShapeFactory {
    std::unordered_map<std::string,
        std::function<std::unique_ptr<Shape>()>> creators_;
public:
    void register_shape(const std::string& name,
                        std::function<std::unique_ptr<Shape>()> creator) {
        creators_[name] = std::move(creator);
    }
    std::unique_ptr<Shape> create(const std::string& name) {
        auto it = creators_.find(name);
        if (it != creators_.end()) return it->second();
        return nullptr;
    }
};`,
      hints: [
        'Store creators in a map from string to factory function.',
        'register_shape inserts the creator into the map.',
        'create looks up the name and calls the creator if found.',
      ],
      concepts: ['factory-registry', 'unordered-map', 'std-function'],
    },
    {
      id: 'cpp-patterns-8',
      title: 'Observer with unsubscribe',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write an Observer class where subscribe() returns an ID, and unsubscribe(id) removes the listener.',
      skeleton: `#include <functional>
#include <unordered_map>

class Observable {
    int next_id_ = 0;
    // TODO: map from id to callback
public:
    int subscribe(std::function<void(int)> fn) {
        // TODO: store and return id
    }
    void unsubscribe(int id) {
        // TODO: remove listener
    }
    void notify(int value) {
        // TODO: call all listeners
    }
};`,
      solution: `#include <functional>
#include <unordered_map>

class Observable {
    int next_id_ = 0;
    std::unordered_map<int, std::function<void(int)>> listeners_;
public:
    int subscribe(std::function<void(int)> fn) {
        int id = next_id_++;
        listeners_[id] = std::move(fn);
        return id;
    }
    void unsubscribe(int id) {
        listeners_.erase(id);
    }
    void notify(int value) {
        for (auto& [id, fn] : listeners_) fn(value);
    }
};`,
      hints: [
        'Use an unordered_map with int keys for O(1) unsubscribe.',
        'subscribe: assign next_id_++, store in map, return id.',
        'notify: iterate the map and call each function.',
      ],
      concepts: ['observer', 'unsubscribe', 'unordered-map'],
    },
    {
      id: 'cpp-patterns-9',
      title: 'RAII scope guard',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a ScopeGuard class that takes a callable and runs it in the destructor, plus a dismiss() method to cancel it.',
      skeleton: `#include <functional>

class ScopeGuard {
    std::function<void()> cleanup_;
    bool active_ = true;
public:
    // TODO: constructor, destructor, dismiss()
    ScopeGuard(const ScopeGuard&) = delete;
    ScopeGuard& operator=(const ScopeGuard&) = delete;
};`,
      solution: `#include <functional>

class ScopeGuard {
    std::function<void()> cleanup_;
    bool active_ = true;
public:
    explicit ScopeGuard(std::function<void()> fn)
        : cleanup_(std::move(fn)) {}
    ~ScopeGuard() {
        if (active_ && cleanup_) cleanup_();
    }
    void dismiss() { active_ = false; }
    ScopeGuard(const ScopeGuard&) = delete;
    ScopeGuard& operator=(const ScopeGuard&) = delete;
};`,
      hints: [
        'Store the callable and call it in the destructor if active.',
        'dismiss() sets active_ to false to cancel the cleanup.',
        'This is the scope guard / RAII cleanup pattern.',
      ],
      concepts: ['scope-guard', 'raii', 'cleanup'],
    },
    {
      id: 'cpp-patterns-10',
      title: 'Strategy sorter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a DataProcessor class that takes a sorting strategy in its constructor and uses it in its process() method.',
      skeleton: `#include <vector>
#include <functional>
#include <algorithm>

class DataProcessor {
    // TODO: store sorting strategy
public:
    // TODO: constructor taking strategy
    std::vector<int> process(std::vector<int> data) {
        // TODO: apply strategy and return
    }
};`,
      solution: `#include <vector>
#include <functional>
#include <algorithm>

class DataProcessor {
    std::function<void(std::vector<int>&)> sorter_;
public:
    explicit DataProcessor(std::function<void(std::vector<int>&)> s)
        : sorter_(std::move(s)) {}
    std::vector<int> process(std::vector<int> data) {
        sorter_(data);
        return data;
    }
};`,
      hints: [
        'Store the strategy as a std::function member.',
        'The constructor moves the function into the member.',
        'process() calls the stored strategy on the data.',
      ],
      concepts: ['strategy', 'std-function', 'dependency-injection'],
    },
    {
      id: 'cpp-patterns-11',
      title: 'Builder pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a QueryBuilder class with where(), order_by(), and limit() methods that return *this for chaining. Add a build() method that returns the query string.',
      skeleton: `#include <string>
#include <sstream>

class QueryBuilder {
    std::string table_;
    std::string where_;
    std::string order_;
    int limit_ = -1;
public:
    explicit QueryBuilder(const std::string& table) : table_(table) {}
    // TODO: where(), order_by(), limit() returning *this
    // TODO: build() returning the query string
};`,
      solution: `#include <string>
#include <sstream>

class QueryBuilder {
    std::string table_;
    std::string where_;
    std::string order_;
    int limit_ = -1;
public:
    explicit QueryBuilder(const std::string& table) : table_(table) {}
    QueryBuilder& where(const std::string& cond) {
        where_ = cond;
        return *this;
    }
    QueryBuilder& order_by(const std::string& col) {
        order_ = col;
        return *this;
    }
    QueryBuilder& limit(int n) {
        limit_ = n;
        return *this;
    }
    std::string build() const {
        std::ostringstream oss;
        oss << "SELECT * FROM " << table_;
        if (!where_.empty()) oss << " WHERE " << where_;
        if (!order_.empty()) oss << " ORDER BY " << order_;
        if (limit_ > 0) oss << " LIMIT " << limit_;
        return oss.str();
    }
};`,
      hints: [
        'Each setter method stores the value and returns *this.',
        'Returning *this enables method chaining: qb.where("x").limit(10).',
        'build() concatenates all parts into a query string.',
      ],
      concepts: ['builder', 'method-chaining', 'fluent-interface'],
    },
    {
      id: 'cpp-patterns-12',
      title: 'Template method pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a Game base class with a run() method that calls init(), update(), and render() in order. Make the three steps pure virtual. Write a concrete subclass.',
      skeleton: `#include <iostream>

class Game {
public:
    // TODO: run() calls init, update, render
    virtual ~Game() = default;
protected:
    // TODO: pure virtual init, update, render
};

class MyGame : public Game {
protected:
    // TODO: implement init, update, render
};`,
      solution: `#include <iostream>

class Game {
public:
    void run() {
        init();
        update();
        render();
    }
    virtual ~Game() = default;
protected:
    virtual void init() = 0;
    virtual void update() = 0;
    virtual void render() = 0;
};

class MyGame : public Game {
protected:
    void init() override { std::cout << "init\\n"; }
    void update() override { std::cout << "update\\n"; }
    void render() override { std::cout << "render\\n"; }
};`,
      hints: [
        'run() defines the skeleton: call init(), update(), render().',
        'Make init/update/render pure virtual (= 0) in the base class.',
        'The subclass overrides each step with concrete implementations.',
      ],
      concepts: ['template-method', 'pure-virtual', 'inheritance'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-patterns-13',
      title: 'Fix singleton copy',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the singleton that can be copied, breaking the single-instance guarantee.',
      skeleton: `class Database {
    Database() = default;
public:
    static Database& instance() {
        static Database db;
        return db;
    }
    // BUG: copy and assignment not deleted
};

void test() {
    Database db = Database::instance();  // makes a copy!
}`,
      solution: `class Database {
    Database() = default;
public:
    static Database& instance() {
        static Database db;
        return db;
    }
    Database(const Database&) = delete;
    Database& operator=(const Database&) = delete;
};

void test() {
    Database& db = Database::instance();  // reference, no copy
}`,
      hints: [
        'Delete the copy constructor and copy assignment operator.',
        'Also change the usage to take a reference, not a value.',
        'Database(const Database&) = delete; and operator= = delete;',
      ],
      concepts: ['singleton', 'deleted-functions'],
    },
    {
      id: 'cpp-patterns-14',
      title: 'Fix factory memory leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the factory that returns a raw pointer, causing potential memory leaks.',
      skeleton: `class Animal { public: virtual ~Animal() = default; };
class Dog : public Animal {};
class Cat : public Animal {};

Animal* create_animal(const char* type) {
    if (type[0] == 'd') return new Dog();
    return new Cat();  // BUG: caller must remember to delete
}`,
      solution: `#include <memory>

class Animal { public: virtual ~Animal() = default; };
class Dog : public Animal {};
class Cat : public Animal {};

std::unique_ptr<Animal> create_animal(const char* type) {
    if (type[0] == 'd') return std::make_unique<Dog>();
    return std::make_unique<Cat>();
}`,
      hints: [
        'Raw new without matching delete causes memory leaks.',
        'Return std::unique_ptr to transfer ownership safely.',
        'Use std::make_unique instead of raw new.',
      ],
      concepts: ['factory', 'unique-ptr', 'memory-leak'],
    },
    {
      id: 'cpp-patterns-15',
      title: 'Fix observer dangling reference',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fix the observer that stores raw pointers to observers, risking dangling pointers when observers are destroyed.',
      skeleton: `#include <vector>
#include <algorithm>

class IObserver { public: virtual void update(int) = 0; virtual ~IObserver() = default; };

class Subject {
    std::vector<IObserver*> observers_;  // BUG: raw pointers
public:
    void attach(IObserver* obs) { observers_.push_back(obs); }
    void notify(int val) {
        for (auto* obs : observers_) obs->update(val);
    }
};`,
      solution: `#include <vector>
#include <memory>
#include <algorithm>

class IObserver { public: virtual void update(int) = 0; virtual ~IObserver() = default; };

class Subject {
    std::vector<std::weak_ptr<IObserver>> observers_;
public:
    void attach(std::weak_ptr<IObserver> obs) {
        observers_.push_back(std::move(obs));
    }
    void notify(int val) {
        observers_.erase(
            std::remove_if(observers_.begin(), observers_.end(),
                [](auto& wp) { return wp.expired(); }),
            observers_.end());
        for (auto& wp : observers_) {
            if (auto sp = wp.lock()) sp->update(val);
        }
    }
};`,
      hints: [
        'Raw pointers become dangling when observers are destroyed.',
        'Use std::weak_ptr to detect when observers no longer exist.',
        'In notify, clean up expired weak_ptrs and lock the rest before calling.',
      ],
      concepts: ['observer', 'weak-ptr', 'dangling-pointer'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-patterns-16',
      title: 'Predict singleton identity',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

class S {
    S() = default;
public:
    static S& instance() { static S s; return s; }
    S(const S&) = delete;
    S& operator=(const S&) = delete;
};

int main() {
    S& a = S::instance();
    S& b = S::instance();
    std::cout << std::boolalpha << (&a == &b) << std::endl;
}`,
      solution: `true`,
      hints: [
        'instance() returns a reference to the same static local.',
        'Both a and b refer to the same object.',
        'Their addresses are equal.',
      ],
      concepts: ['singleton', 'identity'],
    },
    {
      id: 'cpp-patterns-17',
      title: 'Predict strategy output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <functional>
#include <iostream>

void run(std::function<int(int, int)> op, int a, int b) {
    std::cout << op(a, b) << std::endl;
}

int main() {
    run([](int a, int b){ return a * b; }, 3, 7);
}`,
      solution: `21`,
      hints: [
        'The strategy is a lambda that multiplies its arguments.',
        '3 * 7 = 21.',
        'The result is printed.',
      ],
      concepts: ['strategy', 'lambda', 'std-function'],
    },
    {
      id: 'cpp-patterns-18',
      title: 'Predict builder chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <string>
#include <iostream>

class Builder {
    std::string result_;
public:
    Builder& add(const std::string& s) {
        result_ += s;
        return *this;
    }
    std::string build() { return result_; }
};

int main() {
    std::cout << Builder().add("A").add("B").add("C").build()
              << std::endl;
}`,
      solution: `ABC`,
      hints: [
        'Each add() appends to result_ and returns *this.',
        'The chain is add("A") -> add("B") -> add("C") -> build().',
        'result_ is "ABC".',
      ],
      concepts: ['builder', 'method-chaining'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-patterns-19',
      title: 'Refactor if-else chain to factory map',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Replace the long if-else chain with a map-based factory for better extensibility.',
      skeleton: `#include <memory>
#include <string>

class Shape { public: virtual ~Shape() = default; };
class Circle : public Shape {};
class Square : public Shape {};
class Triangle : public Shape {};

std::unique_ptr<Shape> create(const std::string& type) {
    if (type == "circle") return std::make_unique<Circle>();
    else if (type == "square") return std::make_unique<Square>();
    else if (type == "triangle") return std::make_unique<Triangle>();
    return nullptr;
}`,
      solution: `#include <memory>
#include <string>
#include <unordered_map>
#include <functional>

class Shape { public: virtual ~Shape() = default; };
class Circle : public Shape {};
class Square : public Shape {};
class Triangle : public Shape {};

using Creator = std::function<std::unique_ptr<Shape>()>;

const std::unordered_map<std::string, Creator> registry = {
    {"circle",   []{ return std::make_unique<Circle>(); }},
    {"square",   []{ return std::make_unique<Square>(); }},
    {"triangle", []{ return std::make_unique<Triangle>(); }},
};

std::unique_ptr<Shape> create(const std::string& type) {
    auto it = registry.find(type);
    return it != registry.end() ? it->second() : nullptr;
}`,
      hints: [
        'A map-based factory is open for extension without modifying create().',
        'Map string keys to creator lambdas.',
        'New shapes only need a new map entry.',
      ],
      concepts: ['factory-registry', 'open-closed-principle'],
    },
    {
      id: 'cpp-patterns-20',
      title: 'Refactor raw callbacks to observer pattern',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Replace the single raw function pointer callback with a proper observer that supports multiple listeners.',
      skeleton: `#include <iostream>

class Button {
    void (*on_click_)(int) = nullptr;
public:
    void set_callback(void (*cb)(int)) { on_click_ = cb; }
    void click(int id) {
        if (on_click_) on_click_(id);
    }
};`,
      solution: `#include <iostream>
#include <vector>
#include <functional>

class Button {
    std::vector<std::function<void(int)>> listeners_;
public:
    void on_click(std::function<void(int)> fn) {
        listeners_.push_back(std::move(fn));
    }
    void click(int id) {
        for (auto& fn : listeners_) fn(id);
    }
};`,
      hints: [
        'A single function pointer limits you to one callback.',
        'Use a vector of std::function for multiple listeners.',
        'This is the observer/event pattern.',
      ],
      concepts: ['observer', 'std-function', 'event-emitter'],
    },
  ],
};
