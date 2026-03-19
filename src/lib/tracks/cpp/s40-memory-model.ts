import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-memory',
  title: '40. Memory Model',
  explanation: `## C++ Memory Model\n\nThe C++ memory model defines how threads interact through shared memory. Understanding memory ordering is essential for writing correct lock-free concurrent code.\n\n### Memory Orderings\n\`\`\`cpp\n#include <atomic>\n\n// Relaxed: no ordering guarantees, only atomicity\nstd::atomic<int> counter{0};\ncounter.fetch_add(1, std::memory_order_relaxed);\n\n// Acquire: reads after this see writes from the releasing thread\nint val = data.load(std::memory_order_acquire);\n\n// Release: writes before this are visible to the acquiring thread\ndata.store(42, std::memory_order_release);\n\n// Seq_cst: total ordering across all threads (default)\ndata.store(42, std::memory_order_seq_cst);\n\`\`\`\n\n### Release-Acquire Pattern\n\`\`\`cpp\nstd::atomic<bool> ready{false};\nint payload = 0;\n\n// Thread 1 (Producer)\npayload = 42;                              // non-atomic write\nready.store(true, std::memory_order_release); // release\n\n// Thread 2 (Consumer)\nwhile (!ready.load(std::memory_order_acquire)) {} // acquire\nassert(payload == 42); // guaranteed to see 42\n\`\`\`\n\n### Happens-Before Relationship\nIf operation A happens-before operation B, then the effects of A are visible to B. This is established by:\n- Sequencing within a thread\n- Release/acquire pairs on the same atomic variable\n- Mutex lock/unlock pairs\n\n### Data Races\nA data race occurs when two threads access the same memory location concurrently, at least one is a write, and there is no happens-before ordering. Data races are **undefined behavior**.\n\n### Memory Fences\n\`\`\`cpp\nstd::atomic_thread_fence(std::memory_order_release);\n// All preceding writes are visible after a matching acquire fence\n\nstd::atomic_thread_fence(std::memory_order_acquire);\n// All subsequent reads see writes before the matching release fence\n\`\`\`\n\n### compare_exchange with Ordering\n\`\`\`cpp\nstd::atomic<int> val{0};\nint expected = 0;\nval.compare_exchange_strong(expected, 1,\n    std::memory_order_acq_rel,    // success ordering\n    std::memory_order_acquire);   // failure ordering\n\`\`\``,
  exercises: [
    {
      id: 'cpp-memory-1',
      title: 'Relaxed Memory Order',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to use relaxed memory ordering for a simple counter increment.',
      skeleton: `#include <atomic>

std::atomic<int> counter{0};

void increment() {
    counter.fetch_add(1, ___);
}`,
      solution: `#include <atomic>

std::atomic<int> counter{0};

void increment() {
    counter.fetch_add(1, std::memory_order_relaxed);
}`,
      hints: [
        'Relaxed ordering provides atomicity but no synchronization.',
        'std::memory_order_relaxed is the weakest ordering.',
        'Suitable for simple counters where ordering does not matter.',
      ],
      concepts: ['memory_order_relaxed', 'atomic operations', 'fetch_add'],
    },
    {
      id: 'cpp-memory-2',
      title: 'Sequential Consistency Default',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to explicitly use the default (strongest) memory ordering.',
      skeleton: `#include <atomic>

std::atomic<int> flag{0};

void setFlag() {
    flag.store(1, ___);
}

int readFlag() {
    return flag.load(___);
}`,
      solution: `#include <atomic>

std::atomic<int> flag{0};

void setFlag() {
    flag.store(1, std::memory_order_seq_cst);
}

int readFlag() {
    return flag.load(std::memory_order_seq_cst);
}`,
      hints: [
        'Sequential consistency is the default for all atomic operations.',
        'std::memory_order_seq_cst provides a total order across all threads.',
        'It is the strongest and most expensive ordering.',
      ],
      concepts: ['memory_order_seq_cst', 'sequential consistency', 'default ordering'],
    },
    {
      id: 'cpp-memory-3',
      title: 'Identify the Data Race',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Does this code have a data race? Answer "data race" or "no data race".',
      skeleton: `#include <thread>

int shared = 0;

void writer() { shared = 42; }
void reader() { int x = shared; }

int main() {
    std::thread t1(writer);
    std::thread t2(reader);
    t1.join();
    t2.join();
}`,
      solution: `data race`,
      hints: [
        'Two threads access shared without synchronization.',
        'One thread writes, the other reads, concurrently.',
        'No atomic, mutex, or memory ordering establishes happens-before.',
      ],
      concepts: ['data race', 'undefined behavior', 'concurrent access'],
    },
    {
      id: 'cpp-memory-4',
      title: 'Release-Acquire Store',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the memory orderings for a correct release-acquire pattern.',
      skeleton: `#include <atomic>
#include <cassert>

std::atomic<bool> ready{false};
int payload = 0;

void producer() {
    payload = 42;
    ready.store(true, ___);
}

void consumer() {
    while (!ready.load(___)) {}
    assert(payload == 42);
}`,
      solution: `#include <atomic>
#include <cassert>

std::atomic<bool> ready{false};
int payload = 0;

void producer() {
    payload = 42;
    ready.store(true, std::memory_order_release);
}

void consumer() {
    while (!ready.load(std::memory_order_acquire)) {}
    assert(payload == 42);
}`,
      hints: [
        'The producer uses release to publish all preceding writes.',
        'The consumer uses acquire to see all writes before the release.',
        'This creates a happens-before relationship between producer and consumer.',
      ],
      concepts: ['release-acquire', 'happens-before', 'synchronization'],
    },
    {
      id: 'cpp-memory-5',
      title: 'Write a Relaxed Counter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a thread-safe counter class using relaxed atomics for increment and load.',
      skeleton: `#include <atomic>

class Counter {
    // Define atomic member
public:
    Counter();
    void increment();
    int get() const;
};`,
      solution: `#include <atomic>

class Counter {
    std::atomic<int> count_{0};
public:
    Counter() = default;
    void increment() {
        count_.fetch_add(1, std::memory_order_relaxed);
    }
    int get() const {
        return count_.load(std::memory_order_relaxed);
    }
};`,
      hints: [
        'Use std::atomic<int> for the counter member.',
        'Relaxed ordering is fine for a simple counter where ordering does not matter.',
        'fetch_add atomically adds to the value.',
      ],
      concepts: ['atomic counter', 'relaxed ordering', 'thread safety'],
    },
    {
      id: 'cpp-memory-6',
      title: 'Write a Spinlock with Acquire-Release',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a basic spinlock using atomic_flag with acquire and release orderings.',
      skeleton: `#include <atomic>

class Spinlock {
    std::atomic_flag flag_ = ATOMIC_FLAG_INIT;
public:
    void lock();    // spin until acquired
    void unlock();  // release the lock
};`,
      solution: `#include <atomic>

class Spinlock {
    std::atomic_flag flag_ = ATOMIC_FLAG_INIT;
public:
    void lock() {
        while (flag_.test_and_set(std::memory_order_acquire)) {
            // spin
        }
    }
    void unlock() {
        flag_.clear(std::memory_order_release);
    }
};`,
      hints: [
        'test_and_set returns the old value and sets the flag to true.',
        'Use acquire on lock so we see all writes from the previous holder.',
        'Use release on unlock so our writes are visible to the next holder.',
      ],
      concepts: ['spinlock', 'atomic_flag', 'acquire-release', 'test_and_set'],
    },
    {
      id: 'cpp-memory-7',
      title: 'Memory Fence',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blanks to use memory fences instead of per-operation ordering.',
      skeleton: `#include <atomic>
#include <cassert>

std::atomic<bool> ready{false};
int data = 0;

void producer() {
    data = 42;
    ___; // release fence
    ready.store(true, std::memory_order_relaxed);
}

void consumer() {
    while (!ready.load(std::memory_order_relaxed)) {}
    ___; // acquire fence
    assert(data == 42);
}`,
      solution: `#include <atomic>
#include <cassert>

std::atomic<bool> ready{false};
int data = 0;

void producer() {
    data = 42;
    std::atomic_thread_fence(std::memory_order_release);
    ready.store(true, std::memory_order_relaxed);
}

void consumer() {
    while (!ready.load(std::memory_order_relaxed)) {}
    std::atomic_thread_fence(std::memory_order_acquire);
    assert(data == 42);
}`,
      hints: [
        'std::atomic_thread_fence provides ordering without being tied to a specific variable.',
        'A release fence before a relaxed store is equivalent to a release store.',
        'An acquire fence after a relaxed load is equivalent to an acquire load.',
      ],
      concepts: ['memory fence', 'atomic_thread_fence', 'release-acquire fence'],
    },
    {
      id: 'cpp-memory-8',
      title: 'Fix the Broken Double-Check',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the broken double-checked locking pattern that has a data race.',
      skeleton: `#include <atomic>
#include <mutex>

struct Resource {
    int data = 42;
};

Resource* resource = nullptr; // Bug: not atomic!
std::mutex mtx;

Resource* getResource() {
    if (resource == nullptr) {
        std::lock_guard<std::mutex> lock(mtx);
        if (resource == nullptr) {
            resource = new Resource();
        }
    }
    return resource;
}`,
      solution: `#include <atomic>
#include <mutex>

struct Resource {
    int data = 42;
};

std::atomic<Resource*> resource{nullptr};
std::mutex mtx;

Resource* getResource() {
    Resource* p = resource.load(std::memory_order_acquire);
    if (p == nullptr) {
        std::lock_guard<std::mutex> lock(mtx);
        p = resource.load(std::memory_order_relaxed);
        if (p == nullptr) {
            p = new Resource();
            resource.store(p, std::memory_order_release);
        }
    }
    return p;
}`,
      hints: [
        'A non-atomic pointer read/write is a data race when accessed from multiple threads.',
        'Make resource an std::atomic<Resource*>.',
        'Use acquire on the fast-path load and release on the store.',
      ],
      concepts: ['double-checked locking', 'atomic pointer', 'acquire-release'],
    },
    {
      id: 'cpp-memory-9',
      title: 'Predict Relaxed Ordering',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Can thread 2 read x==1 and y==0? Answer "yes" or "no".',
      skeleton: `#include <atomic>

std::atomic<int> x{0}, y{0};

// Thread 1:
void thread1() {
    x.store(1, std::memory_order_relaxed);
    y.store(1, std::memory_order_relaxed);
}

// Thread 2:
void thread2() {
    int ry = y.load(std::memory_order_relaxed);
    int rx = x.load(std::memory_order_relaxed);
    // Can ry==1 && rx==0 happen?
}`,
      solution: `yes`,
      hints: [
        'Relaxed ordering provides no guarantees about ordering between different variables.',
        'Thread 2 might see y=1 before seeing x=1 due to reordering.',
        'Only seq_cst or acquire-release would prevent this.',
      ],
      concepts: ['relaxed ordering', 'reordering', 'no ordering guarantees'],
    },
    {
      id: 'cpp-memory-10',
      title: 'compare_exchange Orderings',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the memory orderings for compare_exchange_strong with different success and failure orderings.',
      skeleton: `#include <atomic>

std::atomic<int> state{0};

bool tryTransition(int from, int to) {
    int expected = from;
    return state.compare_exchange_strong(
        expected, to,
        ___,  // success: need acquire + release
        ___   // failure: only need acquire
    );
}`,
      solution: `#include <atomic>

std::atomic<int> state{0};

bool tryTransition(int from, int to) {
    int expected = from;
    return state.compare_exchange_strong(
        expected, to,
        std::memory_order_acq_rel,
        std::memory_order_acquire
    );
}`,
      hints: [
        'On success, we both read and write, so acq_rel combines both.',
        'On failure, we only read the current value, so acquire suffices.',
        'The failure ordering cannot be stronger than the success ordering.',
      ],
      concepts: ['compare_exchange', 'acq_rel', 'success/failure ordering'],
    },
    {
      id: 'cpp-memory-11',
      title: 'Write a Release-Acquire Flag',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a one-shot event flag using release-acquire semantics that safely publishes data.',
      skeleton: `#include <atomic>
#include <cassert>

class Event {
    // Atomic flag and non-atomic payload
public:
    void publish(int value);  // set payload, then signal
    int wait();               // spin until signaled, return payload
};`,
      solution: `#include <atomic>
#include <cassert>

class Event {
    std::atomic<bool> ready_{false};
    int payload_{0};
public:
    void publish(int value) {
        payload_ = value;
        ready_.store(true, std::memory_order_release);
    }
    int wait() {
        while (!ready_.load(std::memory_order_acquire)) {}
        return payload_;
    }
};`,
      hints: [
        'Store the non-atomic payload before the release store.',
        'The acquire load in wait() guarantees visibility of the payload.',
        'This is the classic release-acquire publish pattern.',
      ],
      concepts: ['release-acquire', 'data publication', 'spin wait'],
    },
    {
      id: 'cpp-memory-12',
      title: 'Predict Release-Acquire Visibility',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'After the consumer sees ready==true, is payload guaranteed to be 42? Answer "yes" or "no".',
      skeleton: `#include <atomic>

std::atomic<bool> ready{false};
int payload = 0;

// Producer
void produce() {
    payload = 42;
    ready.store(true, std::memory_order_release);
}

// Consumer
void consume() {
    while (!ready.load(std::memory_order_acquire)) {}
    // Is payload guaranteed to be 42 here?
}`,
      solution: `yes`,
      hints: [
        'The release store on ready synchronizes-with the acquire load.',
        'All writes before the release (payload=42) are visible after the acquire.',
        'This is the formal happens-before guarantee.',
      ],
      concepts: ['happens-before', 'release-acquire guarantee', 'visibility'],
    },
    {
      id: 'cpp-memory-13',
      title: 'Fix Relaxed Flag Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fix the data race where relaxed ordering fails to synchronize the payload.',
      skeleton: `#include <atomic>
#include <thread>
#include <cassert>

std::atomic<bool> ready{false};
int payload = 0;

void producer() {
    payload = 42;
    ready.store(true, std::memory_order_relaxed); // Bug!
}

void consumer() {
    while (!ready.load(std::memory_order_relaxed)) {} // Bug!
    assert(payload == 42); // May fail!
}

int main() {
    std::thread t1(producer), t2(consumer);
    t1.join(); t2.join();
}`,
      solution: `#include <atomic>
#include <thread>
#include <cassert>

std::atomic<bool> ready{false};
int payload = 0;

void producer() {
    payload = 42;
    ready.store(true, std::memory_order_release);
}

void consumer() {
    while (!ready.load(std::memory_order_acquire)) {}
    assert(payload == 42); // Guaranteed
}

int main() {
    std::thread t1(producer), t2(consumer);
    t1.join(); t2.join();
}`,
      hints: [
        'Relaxed ordering does not create a happens-before relationship.',
        'The consumer might see ready==true but not see payload==42.',
        'Use release on the store and acquire on the load.',
      ],
      concepts: ['relaxed vs acquire-release', 'data race', 'synchronization'],
    },
    {
      id: 'cpp-memory-14',
      title: 'Write Lock-Free Stack Push',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write the push operation for a lock-free stack using compare_exchange_weak with correct memory ordering.',
      skeleton: `#include <atomic>

struct Node {
    int data;
    Node* next;
};

class LockFreeStack {
    std::atomic<Node*> head_{nullptr};
public:
    void push(int value);
    // Allocate a new Node, then CAS it onto the head
};`,
      solution: `#include <atomic>

struct Node {
    int data;
    Node* next;
};

class LockFreeStack {
    std::atomic<Node*> head_{nullptr};
public:
    void push(int value) {
        Node* newNode = new Node{value, nullptr};
        newNode->next = head_.load(std::memory_order_relaxed);
        while (!head_.compare_exchange_weak(
            newNode->next, newNode,
            std::memory_order_release,
            std::memory_order_relaxed)) {
            // newNode->next is updated automatically on failure
        }
    }
};`,
      hints: [
        'Load the current head, set newNode->next to it.',
        'Use compare_exchange_weak in a loop to handle contention.',
        'Release on success ensures the new node is fully constructed before visible.',
      ],
      concepts: ['lock-free', 'compare_exchange_weak', 'CAS loop', 'release ordering'],
    },
    {
      id: 'cpp-memory-15',
      title: 'Predict Seq_Cst vs Acquire-Release',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'With seq_cst, can Thread 3 see x==1,y==0 while Thread 4 sees x==0,y==1? Answer "yes" or "no".',
      skeleton: `#include <atomic>

std::atomic<int> x{0}, y{0};

// Thread 1: x.store(1, std::memory_order_seq_cst);
// Thread 2: y.store(1, std::memory_order_seq_cst);
// Thread 3: reads x then y (both seq_cst)
// Thread 4: reads y then x (both seq_cst)

// Can T3 see x==1,y==0 AND T4 see y==1,x==0 simultaneously?`,
      solution: `no`,
      hints: [
        'seq_cst provides a single total order of all seq_cst operations.',
        'Either x.store happens before y.store in the total order, or vice versa.',
        'All threads must agree on this order, so the described scenario is impossible.',
      ],
      concepts: ['sequential consistency', 'total order', 'multi-thread visibility'],
    },
    {
      id: 'cpp-memory-16',
      title: 'Consume Ordering Concept',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fill in the blanks explaining what memory_order_consume provides (conceptual - use acquire in practice).',
      skeleton: `#include <atomic>

struct Config {
    int timeout;
    int retries;
};

std::atomic<Config*> currentConfig{nullptr};

void publish(Config* cfg) {
    // All writes to *cfg happen before this store
    currentConfig.store(cfg, std::memory_order_release);
}

Config* read() {
    // memory_order_consume would only order reads that are
    // ___ dependent on the loaded pointer value.
    // In practice, compilers promote consume to ___
    Config* cfg = currentConfig.load(std::memory_order_acquire);
    return cfg;
}`,
      solution: `#include <atomic>

struct Config {
    int timeout;
    int retries;
};

std::atomic<Config*> currentConfig{nullptr};

void publish(Config* cfg) {
    // All writes to *cfg happen before this store
    currentConfig.store(cfg, std::memory_order_release);
}

Config* read() {
    // memory_order_consume would only order reads that are
    // data dependent on the loaded pointer value.
    // In practice, compilers promote consume to acquire
    Config* cfg = currentConfig.load(std::memory_order_acquire);
    return cfg;
}`,
      hints: [
        'Consume ordering only affects data-dependent reads.',
        'A read through a pointer is data-dependent on the pointer load.',
        'Compilers do not implement consume correctly and promote it to acquire.',
      ],
      concepts: ['memory_order_consume', 'data dependency', 'consume vs acquire'],
    },
    {
      id: 'cpp-memory-17',
      title: 'Write Seqlock Reader',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write the reader side of a seqlock that retries if the sequence number changed during the read.',
      skeleton: `#include <atomic>

struct Data { int x; int y; };

class Seqlock {
    std::atomic<unsigned> seq_{0};
    Data data_{0, 0};
public:
    // Writer increments seq_ (odd = writing), writes data, increments again (even = done)
    void write(int x, int y) {
        seq_.fetch_add(1, std::memory_order_release);
        data_.x = x;
        data_.y = y;
        seq_.fetch_add(1, std::memory_order_release);
    }

    Data read() const;
    // Read seq_, read data, read seq_ again
    // If seq_ changed or was odd, retry
};`,
      solution: `#include <atomic>

struct Data { int x; int y; };

class Seqlock {
    std::atomic<unsigned> seq_{0};
    Data data_{0, 0};
public:
    void write(int x, int y) {
        seq_.fetch_add(1, std::memory_order_release);
        data_.x = x;
        data_.y = y;
        seq_.fetch_add(1, std::memory_order_release);
    }

    Data read() const {
        Data result;
        unsigned s;
        do {
            s = seq_.load(std::memory_order_acquire);
            if (s & 1) continue; // odd means writer is active
            result.x = data_.x;
            result.y = data_.y;
        } while (s != seq_.load(std::memory_order_acquire));
        return result;
    }
};`,
      hints: [
        'Read the sequence number with acquire before and after reading data.',
        'If the sequence is odd, a write is in progress -- retry.',
        'If the sequence changed between the two reads, data is inconsistent -- retry.',
      ],
      concepts: ['seqlock', 'acquire ordering', 'optimistic concurrency'],
    },
    {
      id: 'cpp-memory-18',
      title: 'Fix Fence Placement',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fix the incorrectly placed memory fence that does not protect the data write.',
      skeleton: `#include <atomic>

std::atomic<bool> flag{false};
int data = 0;

void producer() {
    std::atomic_thread_fence(std::memory_order_release); // Bug: fence before data write!
    data = 42;
    flag.store(true, std::memory_order_relaxed);
}

void consumer() {
    while (!flag.load(std::memory_order_relaxed)) {}
    std::atomic_thread_fence(std::memory_order_acquire);
    int x = data; // May not see 42!
}`,
      solution: `#include <atomic>

std::atomic<bool> flag{false};
int data = 0;

void producer() {
    data = 42;
    std::atomic_thread_fence(std::memory_order_release);
    flag.store(true, std::memory_order_relaxed);
}

void consumer() {
    while (!flag.load(std::memory_order_relaxed)) {}
    std::atomic_thread_fence(std::memory_order_acquire);
    int x = data; // Guaranteed to see 42
}`,
      hints: [
        'A release fence must come AFTER the writes it protects.',
        'The fence was placed before data=42, so that write is not ordered.',
        'Move the fence between the data write and the flag store.',
      ],
      concepts: ['fence placement', 'release fence', 'ordering guarantee'],
    },
    {
      id: 'cpp-memory-19',
      title: 'Refactor Seq_Cst to Acquire-Release',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor this code from overly-strong seq_cst to minimal acquire-release ordering.',
      skeleton: `#include <atomic>

std::atomic<bool> initialized{false};
int config = 0;

void init() {
    config = 100;
    initialized.store(true, std::memory_order_seq_cst);
}

int getConfig() {
    while (!initialized.load(std::memory_order_seq_cst)) {}
    return config;
}`,
      solution: `#include <atomic>

std::atomic<bool> initialized{false};
int config = 0;

void init() {
    config = 100;
    initialized.store(true, std::memory_order_release);
}

int getConfig() {
    while (!initialized.load(std::memory_order_acquire)) {}
    return config;
}`,
      hints: [
        'This is a simple producer-consumer pattern with one flag.',
        'seq_cst is stronger than needed here.',
        'release on the store and acquire on the load is sufficient.',
      ],
      concepts: ['refactor', 'seq_cst to acquire-release', 'minimal ordering'],
    },
    {
      id: 'cpp-memory-20',
      title: 'Refactor Mutex to Atomics',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor this mutex-protected shared counter to use lock-free atomics with appropriate ordering.',
      skeleton: `#include <mutex>

class SharedCounter {
    int count_ = 0;
    mutable std::mutex mtx_;
public:
    void add(int n) {
        std::lock_guard<std::mutex> lock(mtx_);
        count_ += n;
    }
    int get() const {
        std::lock_guard<std::mutex> lock(mtx_);
        return count_;
    }
    bool trySubtract(int n) {
        std::lock_guard<std::mutex> lock(mtx_);
        if (count_ >= n) {
            count_ -= n;
            return true;
        }
        return false;
    }
};`,
      solution: `#include <atomic>

class SharedCounter {
    std::atomic<int> count_{0};
public:
    void add(int n) {
        count_.fetch_add(n, std::memory_order_relaxed);
    }
    int get() const {
        return count_.load(std::memory_order_relaxed);
    }
    bool trySubtract(int n) {
        int current = count_.load(std::memory_order_relaxed);
        do {
            if (current < n) return false;
        } while (!count_.compare_exchange_weak(
            current, current - n, std::memory_order_relaxed));
        return true;
    }
};`,
      hints: [
        'Simple add/get operations map to fetch_add and load.',
        'trySubtract needs a CAS loop: load, check, compare_exchange_weak.',
        'If no other data depends on the counter ordering, relaxed suffices.',
      ],
      concepts: ['refactor', 'mutex to atomic', 'CAS loop', 'lock-free'],
    },
  ]
};
