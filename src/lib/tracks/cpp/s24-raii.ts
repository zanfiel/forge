import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-raii',
  title: '24. RAII',
  explanation: `## RAII (Resource Acquisition Is Initialization) in C++\n\nRAII is a fundamental C++ idiom where resource management is tied to object lifetime. A resource is acquired in the constructor and released in the destructor, ensuring automatic cleanup when the object goes out of scope.\n\n### The Core Idea\n\n\`\`\`cpp\nclass FileHandle {\n    FILE* file_;\npublic:\n    FileHandle(const char* path, const char* mode)\n        : file_(fopen(path, mode)) {\n        if (!file_) throw std::runtime_error(\"Cannot open file\");\n    }\n    ~FileHandle() { if (file_) fclose(file_); }\n\n    // Delete copy to enforce unique ownership\n    FileHandle(const FileHandle&) = delete;\n    FileHandle& operator=(const FileHandle&) = delete;\n\n    // Allow move\n    FileHandle(FileHandle&& other) noexcept : file_(other.file_) {\n        other.file_ = nullptr;\n    }\n\n    FILE* get() const { return file_; }\n};\n\`\`\`\n\n### Standard Library RAII Types\n\n\`\`\`cpp\n#include <mutex>\n#include <fstream>\n\n// lock_guard - RAII mutex locking\nstd::mutex mtx;\n{\n    std::lock_guard<std::mutex> lock(mtx);\n    // mutex is locked here\n} // automatically unlocked\n\n// unique_lock - flexible RAII mutex locking\n{\n    std::unique_lock<std::mutex> lock(mtx);\n    lock.unlock();   // can manually unlock\n    lock.lock();     // and re-lock\n} // automatically unlocked if still locked\n\n// fstream - RAII file I/O\n{\n    std::ofstream out(\"file.txt\");\n    out << \"Hello RAII!\";\n} // file automatically closed\n\`\`\`\n\n### Benefits\n- **No resource leaks**: Destructor always runs, even during exceptions\n- **Exception safety**: Stack unwinding calls destructors automatically\n- **Deterministic cleanup**: Resources freed at exactly the right time\n- **Simpler code**: No manual cleanup or try/finally blocks needed`,
  exercises: [
    {
      id: 'cpp-raii-1',
      title: 'lock_guard Basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to create an RAII lock that automatically locks and unlocks the mutex.',
      skeleton: `#include <mutex>
#include <iostream>

std::mutex mtx;
int counter = 0;

void increment() {
    ___ lock(mtx);
    ++counter;
    // mutex released when lock goes out of scope
}`,
      solution: `#include <mutex>
#include <iostream>

std::mutex mtx;
int counter = 0;

void increment() {
    std::lock_guard<std::mutex> lock(mtx);
    ++counter;
    // mutex released when lock goes out of scope
}`,
      hints: [
        'This RAII wrapper locks in constructor and unlocks in destructor.',
        'It is the simplest mutex lock wrapper.',
        'std::lock_guard<std::mutex> is the type.',
      ],
      concepts: ['lock_guard', 'mutex', 'RAII'],
    },
    {
      id: 'cpp-raii-2',
      title: 'RAII File Stream',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to open a file using RAII-based file stream.',
      skeleton: `#include <fstream>
#include <string>

void write_log(const std::string& msg) {
    ___ out("log.txt", std::ios::app);
    if (out.is_open()) {
        out << msg << "\\n";
    }
    // file automatically closed when out goes out of scope
}`,
      solution: `#include <fstream>
#include <string>

void write_log(const std::string& msg) {
    std::ofstream out("log.txt", std::ios::app);
    if (out.is_open()) {
        out << msg << "\\n";
    }
    // file automatically closed when out goes out of scope
}`,
      hints: [
        'This is the output file stream class.',
        'It opens the file in the constructor and closes in the destructor.',
        'std::ofstream is the RAII wrapper for output files.',
      ],
      concepts: ['ofstream', 'RAII', 'file-handling'],
    },
    {
      id: 'cpp-raii-3',
      title: 'unique_lock Flexibility',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to create a unique_lock that can be unlocked and relocked.',
      skeleton: `#include <mutex>

std::mutex mtx;

void flexible_lock() {
    ___ lock(mtx);
    // do critical work...
    lock.unlock();
    // do non-critical work...
    lock.lock();
    // do more critical work...
} // automatically unlocked if still locked`,
      solution: `#include <mutex>

std::mutex mtx;

void flexible_lock() {
    std::unique_lock<std::mutex> lock(mtx);
    // do critical work...
    lock.unlock();
    // do non-critical work...
    lock.lock();
    // do more critical work...
} // automatically unlocked if still locked`,
      hints: [
        'Unlike lock_guard, this wrapper allows manual unlock/lock.',
        'It supports deferred locking and try-lock.',
        'std::unique_lock<std::mutex> is the flexible lock wrapper.',
      ],
      concepts: ['unique_lock', 'flexible-locking', 'RAII'],
    },
    {
      id: 'cpp-raii-4',
      title: 'Scoped Timer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the destructor to complete this RAII timer that prints elapsed time.',
      skeleton: `#include <chrono>
#include <iostream>
#include <string>

class ScopedTimer {
    std::string name_;
    std::chrono::high_resolution_clock::time_point start_;
public:
    ScopedTimer(std::string name)
        : name_(std::move(name))
        , start_(std::chrono::high_resolution_clock::now()) {}

    ___() {
        auto end = std::chrono::high_resolution_clock::now();
        auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(end - start_).count();
        std::cout << name_ << " took " << ms << "ms" << std::endl;
    }
};`,
      solution: `#include <chrono>
#include <iostream>
#include <string>

class ScopedTimer {
    std::string name_;
    std::chrono::high_resolution_clock::time_point start_;
public:
    ScopedTimer(std::string name)
        : name_(std::move(name))
        , start_(std::chrono::high_resolution_clock::now()) {}

    ~ScopedTimer() {
        auto end = std::chrono::high_resolution_clock::now();
        auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(end - start_).count();
        std::cout << name_ << " took " << ms << "ms" << std::endl;
    }
};`,
      hints: [
        'The destructor is where RAII cleanup happens.',
        'It runs automatically when the object goes out of scope.',
        '~ScopedTimer() is the destructor syntax.',
      ],
      concepts: ['destructor', 'RAII', 'scoped-timing'],
    },
    {
      id: 'cpp-raii-5',
      title: 'Delete Copy Constructor',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to prevent copying of this RAII handle class.',
      skeleton: `class Handle {
    int fd_;
public:
    explicit Handle(int fd) : fd_(fd) {}
    ~Handle() { if (fd_ >= 0) close(fd_); }

    // Prevent copying
    Handle(const Handle&) = ___;
    Handle& operator=(const Handle&) = ___;

    int get() const { return fd_; }
};`,
      solution: `class Handle {
    int fd_;
public:
    explicit Handle(int fd) : fd_(fd) {}
    ~Handle() { if (fd_ >= 0) close(fd_); }

    // Prevent copying
    Handle(const Handle&) = delete;
    Handle& operator=(const Handle&) = delete;

    int get() const { return fd_; }
};`,
      hints: [
        'Copying an RAII handle would cause double-close.',
        'C++11 allows you to explicitly delete special member functions.',
        'The keyword is "delete" after the = sign.',
      ],
      concepts: ['deleted-functions', 'copy-prevention', 'RAII'],
    },
    {
      id: 'cpp-raii-6',
      title: 'Deferred Lock',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to create a unique_lock without immediately locking the mutex.',
      skeleton: `#include <mutex>

std::mutex mtx;

void deferred() {
    std::unique_lock<std::mutex> lock(mtx, ___);
    // mutex is NOT locked yet
    // ... do some setup ...
    lock.lock(); // now lock it
}`,
      solution: `#include <mutex>

std::mutex mtx;

void deferred() {
    std::unique_lock<std::mutex> lock(mtx, std::defer_lock);
    // mutex is NOT locked yet
    // ... do some setup ...
    lock.lock(); // now lock it
}`,
      hints: [
        'unique_lock supports deferred locking via a tag parameter.',
        'The tag tells the constructor not to lock immediately.',
        'std::defer_lock is the tag type.',
      ],
      concepts: ['defer_lock', 'unique_lock', 'deferred-locking'],
    },
    {
      id: 'cpp-raii-7',
      title: 'Write an RAII File Handle',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write an RAII class FileGuard that opens a file in the constructor and closes it in the destructor.',
      skeleton: `#include <cstdio>
#include <stdexcept>

// Write FileGuard class:
// - Constructor takes filename and mode, opens with fopen
// - Throws runtime_error if open fails
// - Destructor closes the file
// - Delete copy constructor and copy assignment
// - Provide get() to access the raw FILE*
`,
      solution: `#include <cstdio>
#include <stdexcept>

class FileGuard {
    FILE* file_;
public:
    FileGuard(const char* filename, const char* mode)
        : file_(fopen(filename, mode)) {
        if (!file_) {
            throw std::runtime_error("Failed to open file");
        }
    }

    ~FileGuard() {
        if (file_) fclose(file_);
    }

    FileGuard(const FileGuard&) = delete;
    FileGuard& operator=(const FileGuard&) = delete;

    FILE* get() const { return file_; }
};`,
      hints: [
        'Acquire the resource (fopen) in the constructor.',
        'Release the resource (fclose) in the destructor.',
        'Delete copy operations to prevent double-close.',
      ],
      concepts: ['RAII', 'constructor', 'destructor', 'resource-management'],
    },
    {
      id: 'cpp-raii-8',
      title: 'Write an RAII Memory Guard',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write an RAII class that allocates a C-style array in the constructor and frees it in the destructor.',
      skeleton: `#include <cstdlib>
#include <cstddef>

// Write ArrayGuard class:
// - Constructor takes size_t count, allocates with malloc
// - Destructor frees with free()
// - Delete copy, allow move
// - Provide data() returning void* and size() returning count
`,
      solution: `#include <cstdlib>
#include <cstddef>

class ArrayGuard {
    void* data_;
    size_t size_;
public:
    explicit ArrayGuard(size_t count)
        : data_(std::malloc(count)), size_(count) {
        if (!data_ && count > 0) {
            throw std::bad_alloc();
        }
    }

    ~ArrayGuard() { std::free(data_); }

    ArrayGuard(const ArrayGuard&) = delete;
    ArrayGuard& operator=(const ArrayGuard&) = delete;

    ArrayGuard(ArrayGuard&& other) noexcept
        : data_(other.data_), size_(other.size_) {
        other.data_ = nullptr;
        other.size_ = 0;
    }

    ArrayGuard& operator=(ArrayGuard&& other) noexcept {
        if (this != &other) {
            std::free(data_);
            data_ = other.data_;
            size_ = other.size_;
            other.data_ = nullptr;
            other.size_ = 0;
        }
        return *this;
    }

    void* data() const { return data_; }
    size_t size() const { return size_; }
};`,
      hints: [
        'Allocate with malloc in the constructor, free in the destructor.',
        'Move constructor should transfer ownership and null out the source.',
        'Move assignment should free existing data before taking ownership.',
      ],
      concepts: ['RAII', 'move-semantics', 'malloc-free', 'resource-management'],
    },
    {
      id: 'cpp-raii-9',
      title: 'Write a Scope Guard',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a generic ScopeGuard class that executes a callable in its destructor, with a dismiss() method to cancel.',
      skeleton: `#include <functional>

// Write ScopeGuard class:
// - Constructor takes a std::function<void()> cleanup callback
// - Destructor calls the callback unless dismissed
// - dismiss() method prevents the callback from running
// - Delete copy, allow move
`,
      solution: `#include <functional>

class ScopeGuard {
    std::function<void()> cleanup_;
    bool active_;
public:
    explicit ScopeGuard(std::function<void()> fn)
        : cleanup_(std::move(fn)), active_(true) {}

    ~ScopeGuard() {
        if (active_ && cleanup_) cleanup_();
    }

    void dismiss() { active_ = false; }

    ScopeGuard(const ScopeGuard&) = delete;
    ScopeGuard& operator=(const ScopeGuard&) = delete;

    ScopeGuard(ScopeGuard&& other) noexcept
        : cleanup_(std::move(other.cleanup_)), active_(other.active_) {
        other.active_ = false;
    }

    ScopeGuard& operator=(ScopeGuard&& other) noexcept {
        if (this != &other) {
            if (active_ && cleanup_) cleanup_();
            cleanup_ = std::move(other.cleanup_);
            active_ = other.active_;
            other.active_ = false;
        }
        return *this;
    }
};`,
      hints: [
        'Store the callable and a boolean flag for active state.',
        'Call the cleanup in the destructor only if still active.',
        'dismiss() sets the active flag to false.',
      ],
      concepts: ['scope-guard', 'RAII', 'deferred-action', 'dismiss'],
    },
    {
      id: 'cpp-raii-10',
      title: 'Write an RAII Database Transaction',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a Transaction class that automatically rolls back on destruction unless commit() was called.',
      skeleton: `#include <iostream>
#include <string>

struct Database {
    void begin() { std::cout << "BEGIN\\n"; }
    void commit() { std::cout << "COMMIT\\n"; }
    void rollback() { std::cout << "ROLLBACK\\n"; }
};

// Write Transaction class:
// - Constructor takes Database& and calls begin()
// - Destructor calls rollback() unless committed
// - commit() method calls db.commit() and marks as committed
`,
      solution: `#include <iostream>
#include <string>

struct Database {
    void begin() { std::cout << "BEGIN\\n"; }
    void commit() { std::cout << "COMMIT\\n"; }
    void rollback() { std::cout << "ROLLBACK\\n"; }
};

class Transaction {
    Database& db_;
    bool committed_;
public:
    explicit Transaction(Database& db) : db_(db), committed_(false) {
        db_.begin();
    }

    ~Transaction() {
        if (!committed_) {
            db_.rollback();
        }
    }

    void commit() {
        db_.commit();
        committed_ = true;
    }

    Transaction(const Transaction&) = delete;
    Transaction& operator=(const Transaction&) = delete;
};`,
      hints: [
        'Store a reference to the database and a committed flag.',
        'Call begin() in the constructor.',
        'In the destructor, call rollback() only if not committed.',
      ],
      concepts: ['RAII', 'transaction', 'rollback', 'commit'],
    },
    {
      id: 'cpp-raii-11',
      title: 'Write a Movable RAII Socket',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write an RAII Socket class with proper move semantics.',
      skeleton: `// Write Socket class:
// - Constructor takes int fd
// - Destructor closes fd (use -1 as invalid sentinel)
// - Delete copy operations
// - Implement move constructor and move assignment
// - Provide fd() getter and release() that returns fd and relinquishes ownership
`,
      solution: `class Socket {
    int fd_;
public:
    explicit Socket(int fd = -1) : fd_(fd) {}

    ~Socket() {
        if (fd_ >= 0) {
            // close(fd_); in real code
            fd_ = -1;
        }
    }

    Socket(const Socket&) = delete;
    Socket& operator=(const Socket&) = delete;

    Socket(Socket&& other) noexcept : fd_(other.fd_) {
        other.fd_ = -1;
    }

    Socket& operator=(Socket&& other) noexcept {
        if (this != &other) {
            if (fd_ >= 0) {
                // close(fd_);
            }
            fd_ = other.fd_;
            other.fd_ = -1;
        }
        return *this;
    }

    int fd() const { return fd_; }

    int release() {
        int tmp = fd_;
        fd_ = -1;
        return tmp;
    }
};`,
      hints: [
        'Use -1 as the sentinel for an invalid file descriptor.',
        'Move constructor should steal the fd and null out the source.',
        'release() returns the fd and sets internal fd to -1.',
      ],
      concepts: ['RAII', 'move-semantics', 'release', 'socket'],
    },
    {
      id: 'cpp-raii-12',
      title: 'Write an RAII Lock Pair',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function that locks two mutexes simultaneously using RAII to prevent deadlock.',
      skeleton: `#include <mutex>

// Write lock_both: takes two mutexes by reference,
// returns a pair of unique_locks that hold both mutexes
// Use std::lock to avoid deadlock
`,
      solution: `#include <mutex>
#include <utility>

std::pair<std::unique_lock<std::mutex>, std::unique_lock<std::mutex>>
lock_both(std::mutex& m1, std::mutex& m2) {
    std::unique_lock<std::mutex> lk1(m1, std::defer_lock);
    std::unique_lock<std::mutex> lk2(m2, std::defer_lock);
    std::lock(lk1, lk2);
    return {std::move(lk1), std::move(lk2)};
}`,
      hints: [
        'Create unique_locks with std::defer_lock so they do not lock immediately.',
        'Use std::lock(lk1, lk2) to lock both without deadlock.',
        'Return the locks by move.',
      ],
      concepts: ['std::lock', 'defer_lock', 'deadlock-prevention', 'RAII'],
    },
    {
      id: 'cpp-raii-13',
      title: 'Fix Missing RAII Cleanup',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the resource leak where the file is not closed on the early return path.',
      skeleton: `#include <cstdio>
#include <stdexcept>

void process_file(const char* path) {
    FILE* f = fopen(path, "r");
    if (!f) throw std::runtime_error("Cannot open");

    char buf[256];
    if (!fgets(buf, sizeof(buf), f)) {
        throw std::runtime_error("Read error");
        // Bug: f is leaked on this throw!
    }

    // process buf...
    fclose(f);
}`,
      solution: `#include <cstdio>
#include <memory>
#include <stdexcept>

void process_file(const char* path) {
    auto deleter = [](FILE* f) { if (f) fclose(f); };
    std::unique_ptr<FILE, decltype(deleter)> f(fopen(path, "r"), deleter);
    if (!f) throw std::runtime_error("Cannot open");

    char buf[256];
    if (!fgets(buf, sizeof(buf), f.get())) {
        throw std::runtime_error("Read error");
        // Fixed: f is closed automatically by unique_ptr destructor
    }

    // process buf...
    // no manual fclose needed
}`,
      hints: [
        'If an exception is thrown before fclose, the file leaks.',
        'Wrap the FILE* in a unique_ptr with a custom deleter.',
        'The destructor runs during stack unwinding, closing the file.',
      ],
      concepts: ['RAII', 'exception-safety', 'resource-leak'],
    },
    {
      id: 'cpp-raii-14',
      title: 'Fix the Mutex Leak on Exception',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the bug where the mutex stays locked if an exception is thrown.',
      skeleton: `#include <mutex>
#include <stdexcept>
#include <vector>

std::mutex mtx;
std::vector<int> data;

void add_checked(int value) {
    mtx.lock();
    if (value < 0) {
        throw std::invalid_argument("negative value");
        // Bug: mutex stays locked!
    }
    data.push_back(value);
    mtx.unlock();
}`,
      solution: `#include <mutex>
#include <stdexcept>
#include <vector>

std::mutex mtx;
std::vector<int> data;

void add_checked(int value) {
    std::lock_guard<std::mutex> lock(mtx);
    if (value < 0) {
        throw std::invalid_argument("negative value");
        // Fixed: lock_guard destructor releases mutex
    }
    data.push_back(value);
}`,
      hints: [
        'Manual lock/unlock is not exception-safe.',
        'Use std::lock_guard for RAII-based mutex management.',
        'The destructor releases the lock even during stack unwinding.',
      ],
      concepts: ['lock_guard', 'exception-safety', 'RAII'],
    },
    {
      id: 'cpp-raii-15',
      title: 'Fix Missing Move in RAII Class',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the RAII class that causes a double-close because it lacks proper move semantics.',
      skeleton: `#include <iostream>

class Connection {
    int id_;
    bool open_;
public:
    Connection(int id) : id_(id), open_(true) {
        std::cout << "Open " << id_ << "\\n";
    }
    ~Connection() {
        if (open_) {
            std::cout << "Close " << id_ << "\\n";
            open_ = false;
        }
    }
    // Bug: default copy causes double-close!
};

Connection make_conn() {
    Connection c(1);
    return c;
}`,
      solution: `#include <iostream>

class Connection {
    int id_;
    bool open_;
public:
    Connection(int id) : id_(id), open_(true) {
        std::cout << "Open " << id_ << "\\n";
    }
    ~Connection() {
        if (open_) {
            std::cout << "Close " << id_ << "\\n";
            open_ = false;
        }
    }

    Connection(const Connection&) = delete;
    Connection& operator=(const Connection&) = delete;

    Connection(Connection&& other) noexcept
        : id_(other.id_), open_(other.open_) {
        other.open_ = false;
    }

    Connection& operator=(Connection&& other) noexcept {
        if (this != &other) {
            if (open_) std::cout << "Close " << id_ << "\\n";
            id_ = other.id_;
            open_ = other.open_;
            other.open_ = false;
        }
        return *this;
    }
};

Connection make_conn() {
    Connection c(1);
    return c;
}`,
      hints: [
        'Delete the copy constructor and copy assignment.',
        'Add a move constructor that transfers ownership.',
        'The moved-from object should have open_ set to false.',
      ],
      concepts: ['move-semantics', 'double-close', 'rule-of-five'],
    },
    {
      id: 'cpp-raii-16',
      title: 'Predict RAII Destruction Order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Predict the destruction order of RAII objects.',
      skeleton: `#include <iostream>
#include <string>

struct Guard {
    std::string name;
    Guard(std::string n) : name(std::move(n)) {
        std::cout << "+" << name << " ";
    }
    ~Guard() { std::cout << "-" << name << " "; }
};

int main() {
    Guard a("A");
    Guard b("B");
    Guard c("C");
    return 0;
}`,
      solution: `+A +B +C -C -B -A`,
      hints: [
        'Objects are constructed in declaration order.',
        'Objects are destroyed in reverse order of construction.',
        'This is stack-based LIFO (last in, first out) destruction.',
      ],
      concepts: ['destruction-order', 'RAII', 'stack-unwinding'],
    },
    {
      id: 'cpp-raii-17',
      title: 'Predict Nested Scope Cleanup',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the output showing RAII cleanup in nested scopes.',
      skeleton: `#include <iostream>

struct R {
    int id;
    R(int i) : id(i) { std::cout << "A" << id << " "; }
    ~R() { std::cout << "D" << id << " "; }
};

int main() {
    R r1(1);
    {
        R r2(2);
        R r3(3);
    }
    R r4(4);
    return 0;
}`,
      solution: `A1 A2 A3 D3 D2 A4 D4 D1`,
      hints: [
        'r1 is constructed first. r2 and r3 are in an inner scope.',
        'When the inner scope ends, r3 then r2 are destroyed.',
        'Then r4 is constructed. At main() exit, r4 then r1 are destroyed.',
      ],
      concepts: ['scope', 'destruction-order', 'RAII'],
    },
    {
      id: 'cpp-raii-18',
      title: 'Predict Exception Cleanup',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the output when an exception causes stack unwinding.',
      skeleton: `#include <iostream>
#include <stdexcept>

struct G {
    char c;
    G(char ch) : c(ch) { std::cout << "+" << c << " "; }
    ~G() { std::cout << "-" << c << " "; }
};

int main() {
    try {
        G a('A');
        G b('B');
        throw std::runtime_error("oops");
        G c('C');
    } catch (...) {
        std::cout << "caught ";
    }
    return 0;
}`,
      solution: `+A +B -B -A caught`,
      hints: [
        'A and B are constructed before the throw.',
        'C is never constructed because the throw happens first.',
        'Stack unwinding destroys B then A before the catch block runs.',
      ],
      concepts: ['stack-unwinding', 'exception', 'RAII'],
    },
    {
      id: 'cpp-raii-19',
      title: 'Refactor Manual Cleanup to RAII',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Refactor the manual memory management to use RAII with std::vector.',
      skeleton: `#include <cstring>
#include <iostream>

void process() {
    int* arr = new int[100];
    // ... fill arr ...
    for (int i = 0; i < 100; ++i) arr[i] = i;

    int sum = 0;
    for (int i = 0; i < 100; ++i) sum += arr[i];

    std::cout << "Sum: " << sum << std::endl;
    delete[] arr;
}`,
      solution: `#include <vector>
#include <iostream>

void process() {
    std::vector<int> arr(100);
    for (int i = 0; i < 100; ++i) arr[i] = i;

    int sum = 0;
    for (int i = 0; i < 100; ++i) sum += arr[i];

    std::cout << "Sum: " << sum << std::endl;
    // no manual delete needed - vector cleans up automatically
}`,
      hints: [
        'std::vector is an RAII container that manages its own memory.',
        'Replace new[] with vector construction.',
        'Remove the manual delete[] call.',
      ],
      concepts: ['RAII', 'std::vector', 'no-manual-delete'],
    },
    {
      id: 'cpp-raii-20',
      title: 'Refactor to scoped_lock',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor the manual multi-mutex locking to use C++17 std::scoped_lock for deadlock-free RAII.',
      skeleton: `#include <mutex>
#include <vector>

std::mutex mtx1, mtx2;
std::vector<int> data1, data2;

void transfer(int value) {
    mtx1.lock();
    mtx2.lock();
    data1.push_back(value);
    data2.push_back(value * 2);
    mtx2.unlock();
    mtx1.unlock();
}`,
      solution: `#include <mutex>
#include <vector>

std::mutex mtx1, mtx2;
std::vector<int> data1, data2;

void transfer(int value) {
    std::scoped_lock lock(mtx1, mtx2);
    data1.push_back(value);
    data2.push_back(value * 2);
}`,
      hints: [
        'C++17 std::scoped_lock can lock multiple mutexes simultaneously.',
        'It prevents deadlock by using a consistent locking algorithm.',
        'Remove all manual lock/unlock calls.',
      ],
      concepts: ['scoped_lock', 'deadlock-prevention', 'RAII'],
    },
  ],
};
