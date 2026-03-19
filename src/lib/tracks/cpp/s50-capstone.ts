import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-capstone',
  title: '50. Capstone',
  explanation: `## Capstone -- Comprehensive C++ Exercises

This section combines concepts from the entire C++ track into integrated exercises. You will use:

- **Templates & Metaprogramming** -- generic programming, constexpr, SFINAE/concepts
- **RAII & Smart Pointers** -- unique_ptr, shared_ptr, custom deleters, scope guards
- **Move Semantics** -- rvalue references, std::move, move constructors/assignment
- **Concurrency** -- threads, mutexes, condition variables, atomics
- **Design Patterns** -- factory, observer, strategy, CRTP, builder
- **STL Containers & Algorithms** -- vector, map, set, algorithms, ranges
- **Memory Management** -- allocators, placement new, arena allocation
- **Modern C++** -- structured bindings, std::optional, std::variant, fold expressions

Each exercise integrates multiple concepts. Think about:
1. Ownership -- who owns each resource?
2. Thread safety -- is shared state protected?
3. Exception safety -- what happens if something throws?
4. Performance -- are there unnecessary copies?
5. Correctness -- does the code handle edge cases?
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-capstone-1',
      title: 'Smart pointer factory',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the smart pointer creation function that forwards arguments to the constructor.',
      skeleton: `#include <memory>

class Widget {
    int id_;
    std::string name_;
public:
    Widget(int id, std::string name) : id_(id), name_(std::move(name)) {}
};

auto w = std::__BLANK__<Widget>(42, "alpha");`,
      solution: `#include <memory>

class Widget {
    int id_;
    std::string name_;
public:
    Widget(int id, std::string name) : id_(id), name_(std::move(name)) {}
};

auto w = std::make_unique<Widget>(42, "alpha");`,
      hints: [
        'This function creates a unique_ptr and forwards args to the constructor.',
        'It is safer and more efficient than new + unique_ptr.',
        'The function is `make_unique`.',
      ],
      concepts: ['make-unique', 'perfect-forwarding', 'smart-pointers'],
    },
    {
      id: 'cpp-capstone-2',
      title: 'Structured binding with map',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the structured binding syntax to decompose map entries.',
      skeleton: `#include <map>
#include <string>
#include <iostream>

std::map<std::string, int> scores = {{"alice", 95}, {"bob", 87}};

for (__BLANK__& [name, score] : scores) {
    std::cout << name << ": " << score << "\\n";
}`,
      solution: `#include <map>
#include <string>
#include <iostream>

std::map<std::string, int> scores = {{"alice", 95}, {"bob", 87}};

for (const auto& [name, score] : scores) {
    std::cout << name << ": " << score << "\\n";
}`,
      hints: [
        'Structured bindings (C++17) decompose pairs/tuples/structs.',
        'Use auto& or const auto& for the binding.',
        'Fill in `const auto`.',
      ],
      concepts: ['structured-bindings', 'range-for', 'map'],
    },
    {
      id: 'cpp-capstone-3',
      title: 'std::variant visitor',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fill in the function to visit a variant with an overloaded lambda set.',
      skeleton: `#include <variant>
#include <string>
#include <iostream>

using Val = std::variant<int, double, std::string>;

Val v = 42;
std::__BLANK__([]( auto&& arg) {
    std::cout << arg << "\\n";
}, v);`,
      solution: `#include <variant>
#include <string>
#include <iostream>

using Val = std::variant<int, double, std::string>;

Val v = 42;
std::visit([](auto&& arg) {
    std::cout << arg << "\\n";
}, v);`,
      hints: [
        'This function applies a visitor to a variant.',
        'It calls the correct overload based on the active alternative.',
        'The function is `visit`.',
      ],
      concepts: ['variant', 'visit', 'generic-lambda'],
    },
    {
      id: 'cpp-capstone-4',
      title: 'Move into vector',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the function to transfer ownership of a string into the vector without copying.',
      skeleton: `#include <vector>
#include <string>

std::vector<std::string> names;
std::string name = "expensive to copy";
names.push_back(std::__BLANK__(name));`,
      solution: `#include <vector>
#include <string>

std::vector<std::string> names;
std::string name = "expensive to copy";
names.push_back(std::move(name));`,
      hints: [
        'This function casts an lvalue to an rvalue reference.',
        'It enables move semantics, avoiding a copy.',
        'The function is `move`.',
      ],
      concepts: ['move-semantics', 'std-move', 'vector'],
    },
    {
      id: 'cpp-capstone-5',
      title: 'Optional return value',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the type for a function that may or may not return a value.',
      skeleton: `#include <optional>
#include <map>
#include <string>

std::map<std::string, int> db = {{"x", 1}};

std::__BLANK__<int> lookup(const std::string& key) {
    auto it = db.find(key);
    if (it != db.end()) return it->second;
    return std::nullopt;
}`,
      solution: `#include <optional>
#include <map>
#include <string>

std::map<std::string, int> db = {{"x", 1}};

std::optional<int> lookup(const std::string& key) {
    auto it = db.find(key);
    if (it != db.end()) return it->second;
    return std::nullopt;
}`,
      hints: [
        'This type holds either a value or nothing.',
        'It replaces the use of special sentinel values.',
        'The type is `optional`.',
      ],
      concepts: ['optional', 'nullopt', 'value-semantics'],
    },
    {
      id: 'cpp-capstone-6',
      title: 'constexpr compile-time computation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the keyword so the array size is computed at compile time.',
      skeleton: `__BLANK__ int triangle(int n) {
    return n * (n + 1) / 2;
}

int data[triangle(10)];  // array of 55 elements`,
      solution: `constexpr int triangle(int n) {
    return n * (n + 1) / 2;
}

int data[triangle(10)];  // array of 55 elements`,
      hints: [
        'Array sizes must be compile-time constants.',
        'This keyword enables compile-time evaluation.',
        'The keyword is `constexpr`.',
      ],
      concepts: ['constexpr', 'compile-time', 'array-size'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-capstone-7',
      title: 'Thread-safe LRU cache',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a thread-safe LRU cache with get() and put() methods. Use a mutex for synchronization, a list for order, and a map for O(1) lookup.',
      skeleton: `#include <mutex>
#include <list>
#include <unordered_map>
#include <optional>

template <typename K, typename V>
class LRUCache {
    std::size_t capacity_;
    std::list<std::pair<K, V>> items_;
    std::unordered_map<K, typename std::list<std::pair<K, V>>::iterator> map_;
    mutable std::mutex mtx_;
public:
    explicit LRUCache(std::size_t cap) : capacity_(cap) {}
    std::optional<V> get(const K& key) {
        // TODO: thread-safe get, move to front if found
    }
    void put(const K& key, V value) {
        // TODO: thread-safe put, evict LRU if at capacity
    }
};`,
      solution: `#include <mutex>
#include <list>
#include <unordered_map>
#include <optional>

template <typename K, typename V>
class LRUCache {
    std::size_t capacity_;
    std::list<std::pair<K, V>> items_;
    std::unordered_map<K, typename std::list<std::pair<K, V>>::iterator> map_;
    mutable std::mutex mtx_;
public:
    explicit LRUCache(std::size_t cap) : capacity_(cap) {}
    std::optional<V> get(const K& key) {
        std::lock_guard<std::mutex> lock(mtx_);
        auto it = map_.find(key);
        if (it == map_.end()) return std::nullopt;
        items_.splice(items_.begin(), items_, it->second);
        return it->second->second;
    }
    void put(const K& key, V value) {
        std::lock_guard<std::mutex> lock(mtx_);
        auto it = map_.find(key);
        if (it != map_.end()) {
            it->second->second = std::move(value);
            items_.splice(items_.begin(), items_, it->second);
            return;
        }
        if (map_.size() == capacity_) {
            auto& last = items_.back();
            map_.erase(last.first);
            items_.pop_back();
        }
        items_.emplace_front(key, std::move(value));
        map_[key] = items_.begin();
    }
};`,
      hints: [
        'Use list::splice to move accessed items to the front in O(1).',
        'The map stores iterators into the list for O(1) lookup.',
        'Lock the mutex in both get() and put().',
      ],
      concepts: ['lru-cache', 'mutex', 'list', 'unordered-map'],
    },
    {
      id: 'cpp-capstone-8',
      title: 'Generic observer with CRTP',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a CRTP-based Observable mixin that provides subscribe() and notify(). The event type is a template parameter. Use std::function for callbacks.',
      skeleton: `#include <functional>
#include <vector>

template <typename Derived, typename Event>
class Observable {
    // TODO: store callbacks
public:
    // TODO: subscribe(callback), notify(event)
};

// Usage:
// class Sensor : public Observable<Sensor, double> {};`,
      solution: `#include <functional>
#include <vector>

template <typename Derived, typename Event>
class Observable {
    std::vector<std::function<void(const Event&)>> listeners_;
public:
    void subscribe(std::function<void(const Event&)> fn) {
        listeners_.push_back(std::move(fn));
    }
    void notify(const Event& event) {
        for (auto& fn : listeners_) fn(event);
    }
};`,
      hints: [
        'Store listeners as vector<function<void(const Event&)>>.',
        'subscribe pushes a callback, notify iterates and calls each.',
        'CRTP allows the derived class to inherit this as a mixin.',
      ],
      concepts: ['crtp', 'observer', 'generic-programming', 'std-function'],
    },
    {
      id: 'cpp-capstone-9',
      title: 'Move-only resource wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a UniqueHandle<T, Deleter> class that owns a resource handle (like FILE* or socket fd). It should be move-only, with RAII cleanup.',
      skeleton: `#include <utility>

template <typename T, typename Deleter>
class UniqueHandle {
    T handle_;
    Deleter deleter_;
    bool valid_ = false;
public:
    // TODO: constructor, destructor, move ops, deleted copy ops
    // TODO: get(), release(), reset()
};`,
      solution: `#include <utility>

template <typename T, typename Deleter>
class UniqueHandle {
    T handle_{};
    Deleter deleter_;
    bool valid_ = false;
public:
    UniqueHandle() = default;
    explicit UniqueHandle(T handle, Deleter d = Deleter{})
        : handle_(handle), deleter_(d), valid_(true) {}
    ~UniqueHandle() { if (valid_) deleter_(handle_); }

    UniqueHandle(const UniqueHandle&) = delete;
    UniqueHandle& operator=(const UniqueHandle&) = delete;

    UniqueHandle(UniqueHandle&& other) noexcept
        : handle_(other.handle_), deleter_(std::move(other.deleter_)),
          valid_(other.valid_) {
        other.valid_ = false;
    }
    UniqueHandle& operator=(UniqueHandle&& other) noexcept {
        if (this != &other) {
            if (valid_) deleter_(handle_);
            handle_ = other.handle_;
            deleter_ = std::move(other.deleter_);
            valid_ = other.valid_;
            other.valid_ = false;
        }
        return *this;
    }

    T get() const { return handle_; }
    T release() { valid_ = false; return handle_; }
    void reset(T h) {
        if (valid_) deleter_(handle_);
        handle_ = h;
        valid_ = true;
    }
};`,
      hints: [
        'Delete copy constructor and copy assignment.',
        'Move constructor transfers ownership by setting other.valid_ = false.',
        'Destructor calls deleter_ only if valid_.',
      ],
      concepts: ['raii', 'move-only', 'unique-ownership', 'custom-deleter'],
    },
    {
      id: 'cpp-capstone-10',
      title: 'Compile-time type map',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a constexpr function type_name<T>() that returns a string_view with the type name for int, double, and std::string using if constexpr.',
      skeleton: `#include <string_view>
#include <type_traits>

template <typename T>
constexpr std::string_view type_name() {
    // TODO: return "int", "double", "string", or "unknown"
}`,
      solution: `#include <string_view>
#include <string>
#include <type_traits>

template <typename T>
constexpr std::string_view type_name() {
    if constexpr (std::is_same_v<T, int>) {
        return "int";
    } else if constexpr (std::is_same_v<T, double>) {
        return "double";
    } else if constexpr (std::is_same_v<T, std::string>) {
        return "string";
    } else {
        return "unknown";
    }
}`,
      hints: [
        'Use if constexpr with std::is_same_v to check each type.',
        'string_view literals are implicitly constexpr.',
        'Each branch returns a different string_view.',
      ],
      concepts: ['constexpr-if', 'is-same', 'string-view', 'type-traits'],
    },
    {
      id: 'cpp-capstone-11',
      title: 'Pipeline with std::function chain',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a Pipeline class that chains transformations (int -> int). Provide add_stage(fn) and execute(input) methods.',
      skeleton: `#include <functional>
#include <vector>

class Pipeline {
    // TODO: store stages
public:
    // TODO: add_stage, execute
};

// Pipeline p;
// p.add_stage([](int x){ return x * 2; });
// p.add_stage([](int x){ return x + 10; });
// p.execute(5); // -> (5 * 2) + 10 = 20`,
      solution: `#include <functional>
#include <vector>

class Pipeline {
    std::vector<std::function<int(int)>> stages_;
public:
    Pipeline& add_stage(std::function<int(int)> fn) {
        stages_.push_back(std::move(fn));
        return *this;
    }
    int execute(int input) const {
        int result = input;
        for (const auto& stage : stages_) {
            result = stage(result);
        }
        return result;
    }
};`,
      hints: [
        'Store stages as vector<function<int(int)>>.',
        'execute runs the input through each stage in order.',
        'Return *this from add_stage for fluent chaining.',
      ],
      concepts: ['pipeline', 'std-function', 'method-chaining', 'strategy'],
    },
    {
      id: 'cpp-capstone-12',
      title: 'Thread pool submit',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a simple thread pool with a submit(task) method that enqueues work and a stop() method. Use condition_variable and mutex.',
      skeleton: `#include <thread>
#include <mutex>
#include <condition_variable>
#include <queue>
#include <functional>
#include <vector>

class ThreadPool {
    std::vector<std::thread> workers_;
    std::queue<std::function<void()>> tasks_;
    std::mutex mtx_;
    std::condition_variable cv_;
    bool stop_ = false;
public:
    explicit ThreadPool(int n) {
        // TODO: launch n worker threads
    }
    void submit(std::function<void()> task) {
        // TODO: enqueue task, notify
    }
    void stop() {
        // TODO: signal stop, join all
    }
    ~ThreadPool() { if (!stop_) stop(); }
};`,
      solution: `#include <thread>
#include <mutex>
#include <condition_variable>
#include <queue>
#include <functional>
#include <vector>

class ThreadPool {
    std::vector<std::thread> workers_;
    std::queue<std::function<void()>> tasks_;
    std::mutex mtx_;
    std::condition_variable cv_;
    bool stop_ = false;
public:
    explicit ThreadPool(int n) {
        for (int i = 0; i < n; ++i) {
            workers_.emplace_back([this] {
                while (true) {
                    std::function<void()> task;
                    {
                        std::unique_lock<std::mutex> lock(mtx_);
                        cv_.wait(lock, [this] {
                            return stop_ || !tasks_.empty();
                        });
                        if (stop_ && tasks_.empty()) return;
                        task = std::move(tasks_.front());
                        tasks_.pop();
                    }
                    task();
                }
            });
        }
    }
    void submit(std::function<void()> task) {
        {
            std::lock_guard<std::mutex> lock(mtx_);
            tasks_.push(std::move(task));
        }
        cv_.notify_one();
    }
    void stop() {
        {
            std::lock_guard<std::mutex> lock(mtx_);
            stop_ = true;
        }
        cv_.notify_all();
        for (auto& w : workers_) {
            if (w.joinable()) w.join();
        }
    }
    ~ThreadPool() { if (!stop_) stop(); }
};`,
      hints: [
        'Workers loop: wait on cv until stop_ or task available, then run task.',
        'submit: lock, push task, unlock, notify_one.',
        'stop: set flag, notify_all, join all workers.',
      ],
      concepts: ['thread-pool', 'condition-variable', 'producer-consumer', 'raii'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-capstone-13',
      title: 'Fix shared_ptr cycle',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fix the memory leak caused by a shared_ptr cycle between two objects.',
      skeleton: `#include <memory>
#include <string>

struct Node {
    std::string name;
    std::shared_ptr<Node> peer;  // BUG: creates cycle
    Node(std::string n) : name(std::move(n)) {}
    ~Node() { /* never called due to cycle */ }
};

void test() {
    auto a = std::make_shared<Node>("A");
    auto b = std::make_shared<Node>("B");
    a->peer = b;
    b->peer = a;  // cycle: A -> B -> A
    // neither destructor is ever called
}`,
      solution: `#include <memory>
#include <string>

struct Node {
    std::string name;
    std::weak_ptr<Node> peer;  // break cycle with weak_ptr
    Node(std::string n) : name(std::move(n)) {}
    ~Node() { /* now called correctly */ }
};

void test() {
    auto a = std::make_shared<Node>("A");
    auto b = std::make_shared<Node>("B");
    a->peer = b;
    b->peer = a;  // weak_ptr does not prevent destruction
}`,
      hints: [
        'shared_ptr cycles prevent reference counts from reaching zero.',
        'Break the cycle by making one (or both) links a weak_ptr.',
        'weak_ptr does not contribute to the reference count.',
      ],
      concepts: ['shared-ptr', 'weak-ptr', 'circular-reference', 'memory-leak'],
    },
    {
      id: 'cpp-capstone-14',
      title: 'Fix moved-from use',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the bug where a string is used after being moved from.',
      skeleton: `#include <string>
#include <vector>
#include <iostream>

void process() {
    std::string data = "important payload";
    std::vector<std::string> archive;
    archive.push_back(std::move(data));

    // BUG: data is in a moved-from state -- content is unspecified
    std::cout << "Data: " << data << std::endl;
    std::cout << "Length: " << data.size() << std::endl;
}`,
      solution: `#include <string>
#include <vector>
#include <iostream>

void process() {
    std::string data = "important payload";
    std::vector<std::string> archive;
    archive.push_back(std::move(data));

    // Use the archived copy instead
    std::cout << "Data: " << archive.back() << std::endl;
    std::cout << "Length: " << archive.back().size() << std::endl;
}`,
      hints: [
        'After std::move, the source string is in a valid but unspecified state.',
        'Do not read from a moved-from object expecting the original content.',
        'Access the data through the vector where it was moved to.',
      ],
      concepts: ['move-semantics', 'moved-from-state', 'use-after-move'],
    },
    {
      id: 'cpp-capstone-15',
      title: 'Fix template argument deduction failure',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the template function that fails to deduce T when passed a string literal.',
      skeleton: `#include <string>
#include <iostream>

template <typename T>
bool equal(const T& a, const T& b) {
    return a == b;
}

void test() {
    std::string name = "hello";
    // BUG: equal(name, "hello") fails -- T deduces as both
    // std::string and const char[6], which conflict
    bool ok = equal(name, "hello");
}`,
      solution: `#include <string>
#include <iostream>

template <typename T, typename U>
bool equal(const T& a, const U& b) {
    return a == b;
}

void test() {
    std::string name = "hello";
    bool ok = equal(name, "hello");  // T=string, U=const char[6]
}`,
      hints: [
        'With one type parameter, T cannot be both std::string and const char[6].',
        'Use two template parameters so each argument deduces independently.',
        'std::string::operator== accepts const char* so comparison works.',
      ],
      concepts: ['template-deduction', 'type-mismatch', 'two-type-parameters'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-capstone-16',
      title: 'Predict variant visit',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <variant>
#include <string>
#include <iostream>

int main() {
    std::variant<int, std::string> v = "hello";
    std::visit([](auto&& arg) {
        using T = std::decay_t<decltype(arg)>;
        if constexpr (std::is_same_v<T, int>)
            std::cout << "int:" << arg;
        else
            std::cout << "str:" << arg;
    }, v);
    std::cout << std::endl;
}`,
      solution: `str:hello`,
      hints: [
        'v holds a std::string ("hello").',
        'The visitor checks the type with if constexpr.',
        'T is std::string, so it prints "str:hello".',
      ],
      concepts: ['variant', 'visit', 'constexpr-if', 'type-traits'],
    },
    {
      id: 'cpp-capstone-17',
      title: 'Predict move semantics',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <string>
#include <iostream>
#include <utility>

int main() {
    std::string a = "data";
    std::string b = std::move(a);
    std::cout << "a:" << a.size() << " b:" << b.size() << std::endl;
}`,
      solution: `a:0 b:4`,
      hints: [
        'std::move transfers ownership of the internal buffer.',
        'After move, a is typically empty (size 0) for std::string.',
        'b now owns "data" (size 4).',
      ],
      concepts: ['move-semantics', 'string-move', 'moved-from-state'],
    },
    {
      id: 'cpp-capstone-18',
      title: 'Predict optional chaining',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <optional>
#include <iostream>

std::optional<int> half_if_even(int x) {
    if (x % 2 == 0) return x / 2;
    return std::nullopt;
}

int main() {
    auto a = half_if_even(10);
    auto b = half_if_even(7);
    std::cout << a.value_or(-1) << " "
              << b.value_or(-1) << std::endl;
}`,
      solution: `5 -1`,
      hints: [
        'half_if_even(10): 10 is even, returns 5.',
        'half_if_even(7): 7 is odd, returns nullopt.',
        'value_or(-1) returns -1 for nullopt.',
      ],
      concepts: ['optional', 'value-or', 'nullopt'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-capstone-19',
      title: 'Refactor raw pointers to smart pointers',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Replace raw new/delete with smart pointers for automatic memory management.',
      skeleton: `#include <string>
#include <vector>

class App {
    struct Config { std::string name; int threads; };
    Config* cfg_;
    std::vector<int*> items_;
public:
    App() {
        cfg_ = new Config{"app", 4};
        for (int i = 0; i < 3; ++i) {
            items_.push_back(new int(i));
        }
    }
    ~App() {
        delete cfg_;
        for (auto* p : items_) delete p;
    }
};`,
      solution: `#include <string>
#include <vector>
#include <memory>

class App {
    struct Config { std::string name; int threads; };
    std::unique_ptr<Config> cfg_;
    std::vector<std::unique_ptr<int>> items_;
public:
    App() {
        cfg_ = std::make_unique<Config>(Config{"app", 4});
        for (int i = 0; i < 3; ++i) {
            items_.push_back(std::make_unique<int>(i));
        }
    }
    // destructor is automatically correct -- smart pointers clean up
};`,
      hints: [
        'Replace raw pointers with unique_ptr for exclusive ownership.',
        'Use make_unique instead of raw new.',
        'The destructor becomes trivial -- smart pointers handle cleanup.',
      ],
      concepts: ['unique-ptr', 'make-unique', 'raii', 'no-raw-new'],
    },
    {
      id: 'cpp-capstone-20',
      title: 'Refactor callback spaghetti to strategy pattern',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Replace the nested if-else chain selecting algorithms with a map-based strategy pattern.',
      skeleton: `#include <vector>
#include <string>
#include <algorithm>

std::vector<int> sort_data(std::vector<int> data, const std::string& mode) {
    if (mode == "asc") {
        std::sort(data.begin(), data.end());
    } else if (mode == "desc") {
        std::sort(data.begin(), data.end(), std::greater<int>());
    } else if (mode == "abs") {
        std::sort(data.begin(), data.end(),
            [](int a, int b) { return std::abs(a) < std::abs(b); });
    }
    return data;
}`,
      solution: `#include <vector>
#include <string>
#include <algorithm>
#include <functional>
#include <unordered_map>
#include <cstdlib>

using Sorter = std::function<void(std::vector<int>&)>;

const std::unordered_map<std::string, Sorter> strategies = {
    {"asc", [](auto& d) { std::sort(d.begin(), d.end()); }},
    {"desc", [](auto& d) { std::sort(d.begin(), d.end(), std::greater<int>()); }},
    {"abs", [](auto& d) {
        std::sort(d.begin(), d.end(),
            [](int a, int b) { return std::abs(a) < std::abs(b); });
    }},
};

std::vector<int> sort_data(std::vector<int> data, const std::string& mode) {
    auto it = strategies.find(mode);
    if (it != strategies.end()) it->second(data);
    return data;
}`,
      hints: [
        'Map mode strings to strategy functions.',
        'This is the Strategy pattern combined with a registry.',
        'New sort modes only need a new map entry, no if-else changes.',
      ],
      concepts: ['strategy', 'factory-registry', 'open-closed-principle', 'std-function'],
    },
  ],
};
