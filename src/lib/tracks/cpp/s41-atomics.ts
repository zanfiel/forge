import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-atomics',
  title: '41. Atomics',
  explanation: `## Atomics in C++

Atomic operations guarantee indivisible read-modify-write on shared data without requiring locks.

### std::atomic
\`\`\`cpp
#include <atomic>
std::atomic<int> counter{0};
counter.store(5);           // atomic write
int val = counter.load();   // atomic read
counter++;                  // atomic increment
\`\`\`

### Memory Ordering
Controls how operations are reordered across threads:
- \`memory_order_relaxed\` -- no ordering constraints, just atomicity
- \`memory_order_acquire\` -- subsequent reads see writes before the release
- \`memory_order_release\` -- prior writes become visible to acquire loads
- \`memory_order_seq_cst\` -- default, total ordering across all threads

### compare_exchange
\`\`\`cpp
std::atomic<int> val{10};
int expected = 10;
// If val == expected, set val to 20; otherwise load val into expected
bool ok = val.compare_exchange_strong(expected, 20);
\`\`\`

### fetch_add / fetch_sub
\`\`\`cpp
std::atomic<int> x{0};
int old = x.fetch_add(5);  // old = 0, x is now 5
old = x.fetch_sub(2);      // old = 5, x is now 3
\`\`\`

### std::atomic_flag
The most basic lock-free atomic boolean. Guaranteed lock-free on all platforms.
\`\`\`cpp
std::atomic_flag lock = ATOMIC_FLAG_INIT;
while (lock.test_and_set(std::memory_order_acquire)) {
    // spin
}
// critical section
lock.clear(std::memory_order_release);
\`\`\`

### When to Use
- Counters, flags, simple shared state
- Lock-free data structures
- Prefer \`std::atomic\` over raw mutexes for single-variable synchronization
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-atomics-1',
      title: 'Declare an atomic integer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to declare an atomic integer initialized to 0.',
      skeleton: `#include <atomic>

std::__BLANK__<int> counter{0};`,
      solution: `#include <atomic>

std::atomic<int> counter{0};`,
      hints: [
        'The template class for atomic operations is in <atomic>.',
        'It wraps a type to make all operations on it indivisible.',
        'The class is `atomic`.',
      ],
      concepts: ['atomic', 'thread-safety'],
    },
    {
      id: 'cpp-atomics-2',
      title: 'Atomic store',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the method to atomically write a value.',
      skeleton: `#include <atomic>

std::atomic<int> val{0};
val.__BLANK__(42);  // atomically set val to 42`,
      solution: `#include <atomic>

std::atomic<int> val{0};
val.store(42);  // atomically set val to 42`,
      hints: [
        'This method writes a value atomically.',
        'The opposite of load().',
        'The method is `store`.',
      ],
      concepts: ['atomic-store', 'memory-ordering'],
    },
    {
      id: 'cpp-atomics-3',
      title: 'Atomic load',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the method to atomically read a value.',
      skeleton: `#include <atomic>

std::atomic<int> counter{99};
int snapshot = counter.__BLANK__();`,
      solution: `#include <atomic>

std::atomic<int> counter{99};
int snapshot = counter.load();`,
      hints: [
        'This method reads the current value atomically.',
        'The opposite of store().',
        'The method is `load`.',
      ],
      concepts: ['atomic-load', 'memory-ordering'],
    },
    {
      id: 'cpp-atomics-4',
      title: 'fetch_add operation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the method that atomically adds and returns the old value.',
      skeleton: `#include <atomic>

std::atomic<int> total{10};
int old = total.__BLANK__(5);
// old == 10, total == 15`,
      solution: `#include <atomic>

std::atomic<int> total{10};
int old = total.fetch_add(5);
// old == 10, total == 15`,
      hints: [
        'This method atomically adds a value and returns the previous value.',
        'It is named fetch_ followed by the arithmetic operation.',
        'The method is `fetch_add`.',
      ],
      concepts: ['fetch-add', 'atomic-rmw'],
    },
    {
      id: 'cpp-atomics-5',
      title: 'Relaxed memory ordering',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the memory order that provides no ordering guarantees, only atomicity.',
      skeleton: `#include <atomic>

std::atomic<int> counter{0};
counter.fetch_add(1, std::__BLANK__);`,
      solution: `#include <atomic>

std::atomic<int> counter{0};
counter.fetch_add(1, std::memory_order_relaxed);`,
      hints: [
        'This is the weakest memory ordering.',
        'It guarantees atomicity but no ordering between threads.',
        'The constant is `memory_order_relaxed`.',
      ],
      concepts: ['memory-order-relaxed', 'memory-ordering'],
    },
    {
      id: 'cpp-atomics-6',
      title: 'compare_exchange_strong',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the CAS method name to conditionally update the atomic.',
      skeleton: `#include <atomic>

std::atomic<int> state{0};
int expected = 0;
bool swapped = state.__BLANK__(expected, 1);`,
      solution: `#include <atomic>

std::atomic<int> state{0};
int expected = 0;
bool swapped = state.compare_exchange_strong(expected, 1);`,
      hints: [
        'CAS stands for Compare And Swap.',
        'The "strong" variant never fails spuriously.',
        'The method is `compare_exchange_strong`.',
      ],
      concepts: ['cas', 'compare-exchange'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-atomics-7',
      title: 'Atomic counter increment',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a function that atomically increments a shared counter by a given amount and returns the new value.',
      skeleton: `#include <atomic>

int atomic_add(std::atomic<int>& counter, int amount) {
    // TODO: atomically add amount and return the NEW value
}`,
      solution: `#include <atomic>

int atomic_add(std::atomic<int>& counter, int amount) {
    return counter.fetch_add(amount) + amount;
}`,
      hints: [
        'fetch_add returns the OLD value before the addition.',
        'To get the new value, add amount to the returned old value.',
        'Use counter.fetch_add(amount) + amount.',
      ],
      concepts: ['fetch-add', 'atomic-rmw'],
    },
    {
      id: 'cpp-atomics-8',
      title: 'Spinlock with atomic_flag',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write lock() and unlock() functions using std::atomic_flag as a spinlock.',
      skeleton: `#include <atomic>

void lock(std::atomic_flag& flag) {
    // TODO: spin until we acquire the lock
}

void unlock(std::atomic_flag& flag) {
    // TODO: release the lock
}`,
      solution: `#include <atomic>

void lock(std::atomic_flag& flag) {
    while (flag.test_and_set(std::memory_order_acquire)) {
        // spin
    }
}

void unlock(std::atomic_flag& flag) {
    flag.clear(std::memory_order_release);
}`,
      hints: [
        'test_and_set returns true if the flag was already set.',
        'Use memory_order_acquire for locking, memory_order_release for unlocking.',
        'Spin in a while loop until test_and_set returns false.',
      ],
      concepts: ['spinlock', 'atomic-flag', 'acquire-release'],
    },
    {
      id: 'cpp-atomics-9',
      title: 'CAS loop for atomic max',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function that atomically updates a value to be the maximum of the current value and a candidate value using a CAS loop.',
      skeleton: `#include <atomic>

void atomic_max(std::atomic<int>& current, int candidate) {
    // TODO: use a CAS loop to update current to max(current, candidate)
}`,
      solution: `#include <atomic>

void atomic_max(std::atomic<int>& current, int candidate) {
    int old = current.load();
    while (old < candidate &&
           !current.compare_exchange_weak(old, candidate)) {
        // old is updated by compare_exchange_weak on failure
    }
}`,
      hints: [
        'Load the current value first, then loop with compare_exchange_weak.',
        'compare_exchange_weak updates the expected value on failure.',
        'Only attempt the swap if old < candidate.',
      ],
      concepts: ['cas-loop', 'compare-exchange-weak'],
    },
    {
      id: 'cpp-atomics-10',
      title: 'Atomic flag toggle',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that atomically toggles an atomic<bool> and returns the previous value.',
      skeleton: `#include <atomic>

bool toggle(std::atomic<bool>& flag) {
    // TODO: atomically flip the boolean and return the old value
}`,
      solution: `#include <atomic>

bool toggle(std::atomic<bool>& flag) {
    bool old = flag.load();
    while (!flag.compare_exchange_weak(old, !old)) {
        // old is refreshed on failure
    }
    return old;
}`,
      hints: [
        'There is no fetch_toggle; use a CAS loop.',
        'Load the current value, try to swap it with !old.',
        'compare_exchange_weak updates old on failure, so keep looping.',
      ],
      concepts: ['cas-loop', 'atomic-bool'],
    },
    {
      id: 'cpp-atomics-11',
      title: 'Release-acquire pair',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write producer/consumer functions where the producer stores data and sets a flag with release, and the consumer spins on the flag with acquire to read the data.',
      skeleton: `#include <atomic>

std::atomic<bool> ready{false};
int data = 0;

void producer() {
    // TODO: write data = 42, then set ready with release ordering
}

int consumer() {
    // TODO: spin on ready with acquire ordering, then return data
}`,
      solution: `#include <atomic>

std::atomic<bool> ready{false};
int data = 0;

void producer() {
    data = 42;
    ready.store(true, std::memory_order_release);
}

int consumer() {
    while (!ready.load(std::memory_order_acquire)) {
        // spin
    }
    return data;
}`,
      hints: [
        'The producer must write data BEFORE setting the flag.',
        'Use memory_order_release on the store to publish the data.',
        'Use memory_order_acquire on the load to see the published data.',
      ],
      concepts: ['acquire-release', 'memory-ordering', 'happens-before'],
    },
    {
      id: 'cpp-atomics-12',
      title: 'Atomic fetch_sub countdown',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a function that atomically decrements a counter and returns true if this call brought the counter to zero.',
      skeleton: `#include <atomic>

bool decrement_and_check(std::atomic<int>& counter) {
    // TODO: atomically subtract 1 and return true if result is 0
}`,
      solution: `#include <atomic>

bool decrement_and_check(std::atomic<int>& counter) {
    return counter.fetch_sub(1) == 1;
}`,
      hints: [
        'fetch_sub returns the value BEFORE subtraction.',
        'If the old value was 1, then after subtracting 1 it becomes 0.',
        'Check if fetch_sub(1) == 1.',
      ],
      concepts: ['fetch-sub', 'atomic-rmw'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-atomics-13',
      title: 'Fix the data race',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the data race by making the shared counter atomic.',
      skeleton: `#include <thread>

int counter = 0;  // BUG: not thread-safe

void increment(int n) {
    for (int i = 0; i < n; ++i) {
        counter++;
    }
}

int main() {
    std::thread t1(increment, 100000);
    std::thread t2(increment, 100000);
    t1.join();
    t2.join();
    // counter should be 200000 but isn't
}`,
      solution: `#include <thread>
#include <atomic>

std::atomic<int> counter{0};

void increment(int n) {
    for (int i = 0; i < n; ++i) {
        counter++;
    }
}

int main() {
    std::thread t1(increment, 100000);
    std::thread t2(increment, 100000);
    t1.join();
    t2.join();
    // counter is reliably 200000
}`,
      hints: [
        'A plain int is not safe for concurrent modification.',
        'Wrap it with std::atomic<int> to make operations atomic.',
        'Include <atomic> and change the declaration.',
      ],
      concepts: ['data-race', 'atomic'],
    },
    {
      id: 'cpp-atomics-14',
      title: 'Fix the CAS loop',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'The CAS loop never terminates because expected is not being updated on failure. Fix it.',
      skeleton: `#include <atomic>

void atomic_multiply(std::atomic<int>& val, int factor) {
    int expected = val.load();
    int desired = expected * factor;
    while (!val.compare_exchange_weak(expected, desired)) {
        // BUG: desired is stale after expected is updated
    }
}`,
      solution: `#include <atomic>

void atomic_multiply(std::atomic<int>& val, int factor) {
    int expected = val.load();
    while (!val.compare_exchange_weak(expected, expected * factor)) {
        // expected is updated by compare_exchange_weak on failure
        // desired is recomputed from the fresh expected
    }
}`,
      hints: [
        'compare_exchange_weak updates expected to the actual value on failure.',
        'But desired was computed from the OLD expected and is never recomputed.',
        'Recompute desired inside the loop or inline it as expected * factor.',
      ],
      concepts: ['cas-loop', 'compare-exchange-weak'],
    },
    {
      id: 'cpp-atomics-15',
      title: 'Fix the atomic_flag initialization',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the atomic_flag so it starts in the clear (unlocked) state.',
      skeleton: `#include <atomic>

std::atomic_flag lock;  // BUG: may start in an indeterminate state

void acquire() {
    while (lock.test_and_set(std::memory_order_acquire)) {}
}

void release() {
    lock.clear(std::memory_order_release);
}`,
      solution: `#include <atomic>

std::atomic_flag lock = ATOMIC_FLAG_INIT;

void acquire() {
    while (lock.test_and_set(std::memory_order_acquire)) {}
}

void release() {
    lock.clear(std::memory_order_release);
}`,
      hints: [
        'std::atomic_flag must be explicitly initialized.',
        'Without initialization, it could start in a set (locked) state.',
        'Use ATOMIC_FLAG_INIT to initialize it in the clear state.',
      ],
      concepts: ['atomic-flag', 'initialization'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-atomics-16',
      title: 'Predict fetch_add result',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <atomic>
#include <iostream>

int main() {
    std::atomic<int> x{10};
    int old = x.fetch_add(5);
    std::cout << old << " " << x.load() << std::endl;
}`,
      solution: `10 15`,
      hints: [
        'fetch_add returns the value BEFORE the addition.',
        'x starts at 10, we add 5.',
        'old is 10 (previous), x is now 15.',
      ],
      concepts: ['fetch-add', 'atomic-rmw'],
    },
    {
      id: 'cpp-atomics-17',
      title: 'Predict compare_exchange result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <atomic>
#include <iostream>

int main() {
    std::atomic<int> val{5};
    int expected = 10;
    bool ok = val.compare_exchange_strong(expected, 20);
    std::cout << std::boolalpha << ok << " "
              << expected << " " << val.load() << std::endl;
}`,
      solution: `false 5 5`,
      hints: [
        'val is 5 but expected is 10 -- they do not match.',
        'compare_exchange fails: it loads val (5) into expected.',
        'val remains 5, ok is false, expected becomes 5.',
      ],
      concepts: ['compare-exchange', 'cas-failure'],
    },
    {
      id: 'cpp-atomics-18',
      title: 'Predict fetch_sub chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <atomic>
#include <iostream>

int main() {
    std::atomic<int> n{20};
    int a = n.fetch_sub(3);
    int b = n.fetch_sub(7);
    std::cout << a << " " << b << " " << n.load() << std::endl;
}`,
      solution: `20 17 10`,
      hints: [
        'fetch_sub returns the value BEFORE subtraction.',
        'First: old=20, n becomes 17. Second: old=17, n becomes 10.',
        'Output: 20 17 10.',
      ],
      concepts: ['fetch-sub', 'atomic-rmw'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-atomics-19',
      title: 'Refactor mutex to atomic',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Replace the mutex-protected counter with std::atomic for better performance on a simple integer increment.',
      skeleton: `#include <mutex>

std::mutex mtx;
int counter = 0;

void increment() {
    std::lock_guard<std::mutex> lock(mtx);
    counter++;
}

int get_count() {
    std::lock_guard<std::mutex> lock(mtx);
    return counter;
}`,
      solution: `#include <atomic>

std::atomic<int> counter{0};

void increment() {
    counter.fetch_add(1, std::memory_order_relaxed);
}

int get_count() {
    return counter.load(std::memory_order_relaxed);
}`,
      hints: [
        'A mutex is overkill for a single integer counter.',
        'std::atomic<int> provides lock-free atomic operations.',
        'For a simple counter, memory_order_relaxed is sufficient.',
      ],
      concepts: ['atomic-vs-mutex', 'lock-free'],
    },
    {
      id: 'cpp-atomics-20',
      title: 'Refactor busy-wait to CAS loop',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor the load-then-store pattern into a proper CAS loop to avoid the race between reading and writing.',
      skeleton: `#include <atomic>

std::atomic<int> balance{100};

void withdraw(int amount) {
    int current = balance.load();
    if (current >= amount) {
        balance.store(current - amount);
    }
}`,
      solution: `#include <atomic>

std::atomic<int> balance{100};

void withdraw(int amount) {
    int current = balance.load();
    while (current >= amount) {
        if (balance.compare_exchange_weak(current, current - amount)) {
            break;
        }
        // current is refreshed on CAS failure
    }
}`,
      hints: [
        'The load-then-store has a TOCTOU race: another thread can change balance between load and store.',
        'Use compare_exchange_weak to ensure the value has not changed.',
        'Loop because another thread might modify balance between load and CAS.',
      ],
      concepts: ['cas-loop', 'toctou', 'lock-free'],
    },
  ],
};
