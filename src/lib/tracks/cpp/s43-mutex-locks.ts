import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-mutex',
  title: '43. Mutex & Locks',
  explanation: `## Mutex & Locks in C++

Mutexes provide mutual exclusion -- only one thread can hold the lock at a time.

### std::mutex
\`\`\`cpp
#include <mutex>
std::mutex mtx;
mtx.lock();
// critical section
mtx.unlock();
\`\`\`

### RAII Lock Guards
Never call lock/unlock manually. Use RAII wrappers:

**lock_guard** -- simplest, locks on construction, unlocks on destruction:
\`\`\`cpp
std::lock_guard<std::mutex> guard(mtx);
\`\`\`

**unique_lock** -- movable, supports deferred locking, timed locking:
\`\`\`cpp
std::unique_lock<std::mutex> lock(mtx, std::defer_lock);
lock.lock();   // lock manually later
lock.unlock(); // unlock before destruction
\`\`\`

**scoped_lock** (C++17) -- locks multiple mutexes without deadlock:
\`\`\`cpp
std::scoped_lock lock(mtx1, mtx2);
\`\`\`

### std::recursive_mutex
Allows the same thread to lock the mutex multiple times (must unlock the same number of times):
\`\`\`cpp
std::recursive_mutex rmtx;
rmtx.lock();
rmtx.lock();   // OK, same thread
rmtx.unlock();
rmtx.unlock();
\`\`\`

### Deadlock Avoidance
- Always lock mutexes in the same order
- Use \`std::scoped_lock\` for multiple mutexes
- Use \`std::lock()\` to lock multiple mutexes atomically
- Keep critical sections as short as possible
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-mutex-1',
      title: 'Declare a mutex',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to declare a mutex.',
      skeleton: `#include <mutex>

std::__BLANK__ mtx;`,
      solution: `#include <mutex>

std::mutex mtx;`,
      hints: [
        'The basic mutual exclusion primitive in <mutex>.',
        'It provides lock() and unlock() methods.',
        'The type is `mutex`.',
      ],
      concepts: ['mutex', 'mutual-exclusion'],
    },
    {
      id: 'cpp-mutex-2',
      title: 'lock_guard usage',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the RAII lock type that automatically locks and unlocks.',
      skeleton: `#include <mutex>

std::mutex mtx;
int shared_data = 0;

void increment() {
    std::__BLANK__<std::mutex> guard(mtx);
    shared_data++;
}`,
      solution: `#include <mutex>

std::mutex mtx;
int shared_data = 0;

void increment() {
    std::lock_guard<std::mutex> guard(mtx);
    shared_data++;
}`,
      hints: [
        'This RAII wrapper locks on construction and unlocks on destruction.',
        'It is the simplest lock wrapper.',
        'The type is `lock_guard`.',
      ],
      concepts: ['lock-guard', 'raii'],
    },
    {
      id: 'cpp-mutex-3',
      title: 'unique_lock with defer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the tag to create a unique_lock without immediately locking the mutex.',
      skeleton: `#include <mutex>

std::mutex mtx;

void work() {
    std::unique_lock<std::mutex> lock(mtx, std::__BLANK__);
    // lock is not held yet
    lock.lock();
    // now locked
}`,
      solution: `#include <mutex>

std::mutex mtx;

void work() {
    std::unique_lock<std::mutex> lock(mtx, std::defer_lock);
    // lock is not held yet
    lock.lock();
    // now locked
}`,
      hints: [
        'This tag tells unique_lock to associate with the mutex but not lock it.',
        'You can lock it later with lock.lock().',
        'The tag is `defer_lock`.',
      ],
      concepts: ['unique-lock', 'defer-lock'],
    },
    {
      id: 'cpp-mutex-4',
      title: 'scoped_lock for multiple mutexes',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the C++17 lock type that locks multiple mutexes without deadlock.',
      skeleton: `#include <mutex>

std::mutex mtx1, mtx2;

void transfer() {
    std::__BLANK__ lock(mtx1, mtx2);
    // both mutexes locked, deadlock-free
}`,
      solution: `#include <mutex>

std::mutex mtx1, mtx2;

void transfer() {
    std::scoped_lock lock(mtx1, mtx2);
    // both mutexes locked, deadlock-free
}`,
      hints: [
        'C++17 introduced a lock that handles multiple mutexes safely.',
        'It uses a deadlock-avoidance algorithm internally.',
        'The type is `scoped_lock`.',
      ],
      concepts: ['scoped-lock', 'deadlock-avoidance'],
    },
    {
      id: 'cpp-mutex-5',
      title: 'Recursive mutex',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the mutex type that allows the same thread to lock it multiple times.',
      skeleton: `#include <mutex>

std::__BLANK__ rmtx;

void outer() {
    std::lock_guard<std::recursive_mutex> guard(rmtx);
    inner();  // inner also locks rmtx -- OK with recursive_mutex
}

void inner() {
    std::lock_guard<std::recursive_mutex> guard(rmtx);
}`,
      solution: `#include <mutex>

std::recursive_mutex rmtx;

void outer() {
    std::lock_guard<std::recursive_mutex> guard(rmtx);
    inner();  // inner also locks rmtx -- OK with recursive_mutex
}

void inner() {
    std::lock_guard<std::recursive_mutex> guard(rmtx);
}`,
      hints: [
        'A normal mutex deadlocks if the same thread locks it twice.',
        'This variant allows re-entrant locking by the same thread.',
        'The type is `recursive_mutex`.',
      ],
      concepts: ['recursive-mutex', 'reentrant-locking'],
    },
    {
      id: 'cpp-mutex-6',
      title: 'try_lock on a mutex',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the method that attempts to lock without blocking.',
      skeleton: `#include <mutex>
#include <iostream>

std::mutex mtx;

void try_work() {
    if (mtx.__BLANK__()) {
        std::cout << "Got lock\\n";
        mtx.unlock();
    } else {
        std::cout << "Lock busy\\n";
    }
}`,
      solution: `#include <mutex>
#include <iostream>

std::mutex mtx;

void try_work() {
    if (mtx.try_lock()) {
        std::cout << "Got lock\\n";
        mtx.unlock();
    } else {
        std::cout << "Lock busy\\n";
    }
}`,
      hints: [
        'This method returns immediately with true or false.',
        'It does not block if the mutex is already held.',
        'The method is `try_lock`.',
      ],
      concepts: ['try-lock', 'non-blocking'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-mutex-7',
      title: 'Thread-safe counter class',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a thread-safe Counter class with increment(), decrement(), and get() methods using a mutex.',
      skeleton: `#include <mutex>

class Counter {
    int value_ = 0;
    mutable std::mutex mtx_;
public:
    void increment() { /* TODO */ }
    void decrement() { /* TODO */ }
    int get() const { /* TODO */ }
};`,
      solution: `#include <mutex>

class Counter {
    int value_ = 0;
    mutable std::mutex mtx_;
public:
    void increment() {
        std::lock_guard<std::mutex> lock(mtx_);
        ++value_;
    }
    void decrement() {
        std::lock_guard<std::mutex> lock(mtx_);
        --value_;
    }
    int get() const {
        std::lock_guard<std::mutex> lock(mtx_);
        return value_;
    }
};`,
      hints: [
        'Use lock_guard in each method to protect access.',
        'The mutex must be mutable so get() (which is const) can lock it.',
        'Lock, modify/read, let the guard unlock on scope exit.',
      ],
      concepts: ['thread-safe-class', 'lock-guard', 'mutable-mutex'],
    },
    {
      id: 'cpp-mutex-8',
      title: 'Deadlock-free transfer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a transfer function that moves an amount from one account to another. Each account has its own mutex. Avoid deadlock.',
      skeleton: `#include <mutex>

struct Account {
    std::mutex mtx;
    double balance = 0.0;
};

void transfer(Account& from, Account& to, double amount) {
    // TODO: lock both mutexes safely, transfer amount
}`,
      solution: `#include <mutex>

struct Account {
    std::mutex mtx;
    double balance = 0.0;
};

void transfer(Account& from, Account& to, double amount) {
    std::scoped_lock lock(from.mtx, to.mtx);
    if (from.balance >= amount) {
        from.balance -= amount;
        to.balance += amount;
    }
}`,
      hints: [
        'Locking from.mtx then to.mtx risks deadlock if another thread does the reverse.',
        'Use std::scoped_lock to lock both at once.',
        'scoped_lock uses a deadlock-avoidance algorithm internally.',
      ],
      concepts: ['scoped-lock', 'deadlock-avoidance'],
    },
    {
      id: 'cpp-mutex-9',
      title: 'Thread-safe singleton',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a thread-safe singleton using std::call_once and std::once_flag.',
      skeleton: `#include <mutex>
#include <memory>

class Singleton {
    static std::unique_ptr<Singleton> instance_;
    static std::once_flag flag_;
    Singleton() = default;
public:
    static Singleton& get_instance() {
        // TODO: use call_once to initialize instance_
    }
    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;
};

std::unique_ptr<Singleton> Singleton::instance_;
std::once_flag Singleton::flag_;`,
      solution: `#include <mutex>
#include <memory>

class Singleton {
    static std::unique_ptr<Singleton> instance_;
    static std::once_flag flag_;
    Singleton() = default;
public:
    static Singleton& get_instance() {
        std::call_once(flag_, []() {
            instance_.reset(new Singleton());
        });
        return *instance_;
    }
    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;
};

std::unique_ptr<Singleton> Singleton::instance_;
std::once_flag Singleton::flag_;`,
      hints: [
        'std::call_once ensures the callable runs exactly once across all threads.',
        'Pass the once_flag and a lambda that creates the instance.',
        'Alternatively, use a static local variable (Meyers singleton).',
      ],
      concepts: ['call-once', 'singleton', 'thread-safety'],
    },
    {
      id: 'cpp-mutex-10',
      title: 'Timed lock attempt',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that tries to acquire a timed_mutex for up to 100 milliseconds. Return true if acquired, false if timed out.',
      skeleton: `#include <mutex>
#include <chrono>

std::timed_mutex tmtx;

bool try_acquire() {
    // TODO: try to lock tmtx for up to 100ms
}`,
      solution: `#include <mutex>
#include <chrono>

std::timed_mutex tmtx;

bool try_acquire() {
    if (tmtx.try_lock_for(std::chrono::milliseconds(100))) {
        tmtx.unlock();
        return true;
    }
    return false;
}`,
      hints: [
        'std::timed_mutex has try_lock_for() that takes a duration.',
        'It returns true if the lock was acquired within the timeout.',
        'Remember to unlock if you acquired it.',
      ],
      concepts: ['timed-mutex', 'try-lock-for'],
    },
    {
      id: 'cpp-mutex-11',
      title: 'Thread-safe queue push',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a thread-safe push method for a queue that locks a mutex and pushes the value.',
      skeleton: `#include <mutex>
#include <queue>

template <typename T>
class SafeQueue {
    std::queue<T> queue_;
    mutable std::mutex mtx_;
public:
    void push(T value) {
        // TODO: thread-safe push
    }
    bool empty() const {
        std::lock_guard<std::mutex> lock(mtx_);
        return queue_.empty();
    }
};`,
      solution: `#include <mutex>
#include <queue>

template <typename T>
class SafeQueue {
    std::queue<T> queue_;
    mutable std::mutex mtx_;
public:
    void push(T value) {
        std::lock_guard<std::mutex> lock(mtx_);
        queue_.push(std::move(value));
    }
    bool empty() const {
        std::lock_guard<std::mutex> lock(mtx_);
        return queue_.empty();
    }
};`,
      hints: [
        'Lock the mutex before modifying the queue.',
        'Use std::move on the value to avoid an extra copy.',
        'lock_guard is sufficient here since we do not need to unlock early.',
      ],
      concepts: ['thread-safe-queue', 'lock-guard', 'move-semantics'],
    },
    {
      id: 'cpp-mutex-12',
      title: 'std::lock with unique_lock',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function that locks two mutexes using std::lock() and unique_lock with adopt_lock, swaps two values, then unlocks.',
      skeleton: `#include <mutex>

std::mutex m1, m2;
int a = 1, b = 2;

void safe_swap() {
    // TODO: lock m1 and m2 atomically, swap a and b
}`,
      solution: `#include <mutex>

std::mutex m1, m2;
int a = 1, b = 2;

void safe_swap() {
    std::lock(m1, m2);
    std::unique_lock<std::mutex> lock1(m1, std::adopt_lock);
    std::unique_lock<std::mutex> lock2(m2, std::adopt_lock);
    std::swap(a, b);
}`,
      hints: [
        'std::lock() locks multiple mutexes without deadlock.',
        'After std::lock(), wrap each mutex in unique_lock with adopt_lock.',
        'adopt_lock tells unique_lock the mutex is already locked.',
      ],
      concepts: ['std-lock', 'adopt-lock', 'unique-lock'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-mutex-13',
      title: 'Fix double lock deadlock',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the deadlock caused by locking the same non-recursive mutex twice.',
      skeleton: `#include <mutex>

std::mutex mtx;

void inner() {
    std::lock_guard<std::mutex> guard(mtx);  // BUG: mtx already locked
    // do work
}

void outer() {
    std::lock_guard<std::mutex> guard(mtx);
    inner();  // deadlocks here
}`,
      solution: `#include <mutex>

std::mutex mtx;

void inner_impl() {
    // do work (no locking -- caller holds the lock)
}

void inner() {
    std::lock_guard<std::mutex> guard(mtx);
    inner_impl();
}

void outer() {
    std::lock_guard<std::mutex> guard(mtx);
    inner_impl();  // call the unlocked implementation
}`,
      hints: [
        'A non-recursive mutex deadlocks if locked twice by the same thread.',
        'Factor the work into an implementation function that does not lock.',
        'Alternatively, use std::recursive_mutex.',
      ],
      concepts: ['deadlock', 'recursive-mutex', 'lock-hierarchy'],
    },
    {
      id: 'cpp-mutex-14',
      title: 'Fix lock ordering deadlock',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fix the potential deadlock when two threads lock two mutexes in opposite order.',
      skeleton: `#include <mutex>
#include <thread>

std::mutex m1, m2;

void thread_a() {
    std::lock_guard<std::mutex> g1(m1);
    std::lock_guard<std::mutex> g2(m2);
    // BUG: if thread_b locks m2 then m1, deadlock
}

void thread_b() {
    std::lock_guard<std::mutex> g1(m2);
    std::lock_guard<std::mutex> g2(m1);
}`,
      solution: `#include <mutex>
#include <thread>

std::mutex m1, m2;

void thread_a() {
    std::scoped_lock lock(m1, m2);
    // work
}

void thread_b() {
    std::scoped_lock lock(m1, m2);
    // work
}`,
      hints: [
        'Locking mutexes in different orders causes deadlock.',
        'Use std::scoped_lock to lock both atomically.',
        'scoped_lock handles the ordering internally.',
      ],
      concepts: ['deadlock', 'scoped-lock', 'lock-ordering'],
    },
    {
      id: 'cpp-mutex-15',
      title: 'Fix forgotten unlock',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the code that manually locks but forgets to unlock on the early return path.',
      skeleton: `#include <mutex>
#include <vector>

std::mutex mtx;
std::vector<int> data;

bool add_if_positive(int val) {
    mtx.lock();
    if (val <= 0) {
        return false;  // BUG: mutex not unlocked
    }
    data.push_back(val);
    mtx.unlock();
    return true;
}`,
      solution: `#include <mutex>
#include <vector>

std::mutex mtx;
std::vector<int> data;

bool add_if_positive(int val) {
    std::lock_guard<std::mutex> guard(mtx);
    if (val <= 0) {
        return false;  // guard unlocks automatically
    }
    data.push_back(val);
    return true;
}`,
      hints: [
        'The early return skips the unlock() call.',
        'Replace manual lock/unlock with a RAII lock_guard.',
        'lock_guard unlocks the mutex on any exit path.',
      ],
      concepts: ['raii', 'lock-guard', 'exception-safety'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-mutex-16',
      title: 'Predict lock_guard scope',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <mutex>
#include <iostream>

std::mutex mtx;

int main() {
    {
        std::lock_guard<std::mutex> g(mtx);
        std::cout << "A ";
    }
    // mutex is unlocked here
    {
        std::lock_guard<std::mutex> g(mtx);
        std::cout << "B" << std::endl;
    }
}`,
      solution: `A B`,
      hints: [
        'Each lock_guard locks on entry to the block.',
        'It unlocks when the block scope ends (closing brace).',
        'Since these are sequential (single thread), no deadlock.',
      ],
      concepts: ['lock-guard', 'scope', 'raii'],
    },
    {
      id: 'cpp-mutex-17',
      title: 'Predict try_lock result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <mutex>
#include <iostream>

int main() {
    std::mutex mtx;
    mtx.lock();
    bool got = mtx.try_lock();
    std::cout << std::boolalpha << got << std::endl;
    mtx.unlock();
}`,
      solution: `false`,
      hints: [
        'The mutex is already locked by the same thread.',
        'A non-recursive mutex cannot be locked again by the same thread.',
        'try_lock returns false because the mutex is held.',
      ],
      concepts: ['try-lock', 'non-recursive-mutex'],
    },
    {
      id: 'cpp-mutex-18',
      title: 'Predict unique_lock owns_lock',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <mutex>
#include <iostream>

int main() {
    std::mutex mtx;
    std::unique_lock<std::mutex> lock(mtx, std::defer_lock);
    std::cout << std::boolalpha << lock.owns_lock() << " ";
    lock.lock();
    std::cout << lock.owns_lock() << std::endl;
}`,
      solution: `false true`,
      hints: [
        'defer_lock means the mutex is NOT locked on construction.',
        'owns_lock() returns false initially.',
        'After lock.lock(), owns_lock() returns true.',
      ],
      concepts: ['unique-lock', 'defer-lock', 'owns-lock'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-mutex-19',
      title: 'Refactor manual lock/unlock to lock_guard',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Replace manual lock/unlock calls with a lock_guard for exception safety.',
      skeleton: `#include <mutex>
#include <vector>

std::mutex mtx;
std::vector<int> data;

void add(int val) {
    mtx.lock();
    data.push_back(val);
    mtx.unlock();
}`,
      solution: `#include <mutex>
#include <vector>

std::mutex mtx;
std::vector<int> data;

void add(int val) {
    std::lock_guard<std::mutex> guard(mtx);
    data.push_back(val);
}`,
      hints: [
        'Manual lock/unlock is not exception safe.',
        'If push_back throws, unlock is never called.',
        'Use lock_guard for automatic RAII-based unlocking.',
      ],
      concepts: ['raii', 'lock-guard', 'exception-safety'],
    },
    {
      id: 'cpp-mutex-20',
      title: 'Refactor std::lock to scoped_lock',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Replace the verbose std::lock + adopt_lock pattern with the simpler scoped_lock.',
      skeleton: `#include <mutex>

std::mutex m1, m2;

void work() {
    std::lock(m1, m2);
    std::lock_guard<std::mutex> g1(m1, std::adopt_lock);
    std::lock_guard<std::mutex> g2(m2, std::adopt_lock);
    // critical section
}`,
      solution: `#include <mutex>

std::mutex m1, m2;

void work() {
    std::scoped_lock lock(m1, m2);
    // critical section
}`,
      hints: [
        'std::scoped_lock (C++17) replaces the std::lock + adopt_lock pattern.',
        'It locks all mutexes atomically and unlocks on destruction.',
        'One line instead of three.',
      ],
      concepts: ['scoped-lock', 'deadlock-avoidance'],
    },
  ],
};
