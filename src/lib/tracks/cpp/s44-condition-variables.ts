import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-condvar',
  title: '44. Condition Variables',
  explanation: `## Condition Variables in C++

Condition variables allow threads to wait until a condition is met, without busy-waiting.

### std::condition_variable
\`\`\`cpp
#include <condition_variable>
#include <mutex>

std::mutex mtx;
std::condition_variable cv;
bool ready = false;

// Waiting thread:
std::unique_lock<std::mutex> lock(mtx);
cv.wait(lock, []{ return ready; });

// Notifying thread:
{
    std::lock_guard<std::mutex> g(mtx);
    ready = true;
}
cv.notify_one();
\`\`\`

### wait with predicate
Always use a predicate to guard against spurious wakeups:
\`\`\`cpp
cv.wait(lock, predicate);
// Equivalent to: while (!predicate()) cv.wait(lock);
\`\`\`

### notify_one vs notify_all
- \`notify_one()\` -- wakes one waiting thread
- \`notify_all()\` -- wakes all waiting threads

### Spurious Wakeups
Threads may wake up even if no notification was sent. ALWAYS use a predicate or check the condition in a loop.

### std::latch (C++20)
A single-use countdown barrier:
\`\`\`cpp
#include <latch>
std::latch done(3);  // count = 3
// Each of 3 threads: done.count_down();
done.wait();         // blocks until count reaches 0
\`\`\`

### std::barrier (C++20)
A reusable synchronization point for a fixed number of threads:
\`\`\`cpp
#include <barrier>
std::barrier sync_point(num_threads);
sync_point.arrive_and_wait();  // each thread calls this
\`\`\`
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-condvar-1',
      title: 'Declare a condition_variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to declare a condition variable.',
      skeleton: `#include <condition_variable>

std::__BLANK__ cv;`,
      solution: `#include <condition_variable>

std::condition_variable cv;`,
      hints: [
        'This is the standard class for thread waiting/notification.',
        'It works with std::unique_lock<std::mutex>.',
        'The type is `condition_variable`.',
      ],
      concepts: ['condition-variable', 'synchronization'],
    },
    {
      id: 'cpp-condvar-2',
      title: 'Wait with predicate',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the method to wait on the condition variable with a predicate.',
      skeleton: `#include <condition_variable>
#include <mutex>

std::mutex mtx;
std::condition_variable cv;
bool data_ready = false;

void consumer() {
    std::unique_lock<std::mutex> lock(mtx);
    cv.__BLANK__(lock, []{ return data_ready; });
}`,
      solution: `#include <condition_variable>
#include <mutex>

std::mutex mtx;
std::condition_variable cv;
bool data_ready = false;

void consumer() {
    std::unique_lock<std::mutex> lock(mtx);
    cv.wait(lock, []{ return data_ready; });
}`,
      hints: [
        'This method blocks until the predicate returns true.',
        'It handles spurious wakeups automatically.',
        'The method is `wait`.',
      ],
      concepts: ['wait-predicate', 'spurious-wakeup'],
    },
    {
      id: 'cpp-condvar-3',
      title: 'Notify one waiter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the method to wake up one waiting thread.',
      skeleton: `#include <condition_variable>
#include <mutex>

std::mutex mtx;
std::condition_variable cv;
bool done = false;

void producer() {
    {
        std::lock_guard<std::mutex> guard(mtx);
        done = true;
    }
    cv.__BLANK__();
}`,
      solution: `#include <condition_variable>
#include <mutex>

std::mutex mtx;
std::condition_variable cv;
bool done = false;

void producer() {
    {
        std::lock_guard<std::mutex> guard(mtx);
        done = true;
    }
    cv.notify_one();
}`,
      hints: [
        'This wakes up exactly one thread waiting on the cv.',
        'Use notify_all() to wake all waiters instead.',
        'The method is `notify_one`.',
      ],
      concepts: ['notify-one', 'condition-variable'],
    },
    {
      id: 'cpp-condvar-4',
      title: 'Latch countdown',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the method to decrement the latch count.',
      skeleton: `#include <latch>
#include <thread>

std::latch sync(3);

void worker() {
    // do work...
    sync.__BLANK__();
}`,
      solution: `#include <latch>
#include <thread>

std::latch sync(3);

void worker() {
    // do work...
    sync.count_down();
}`,
      hints: [
        'This decrements the internal counter by 1.',
        'When the counter reaches 0, waiting threads are released.',
        'The method is `count_down`.',
      ],
      concepts: ['latch', 'count-down'],
    },
    {
      id: 'cpp-condvar-5',
      title: 'Barrier synchronization',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the method for a thread to arrive at the barrier and wait for all others.',
      skeleton: `#include <barrier>
#include <thread>

std::barrier sync_point(4);

void worker() {
    // phase 1 work...
    sync_point.__BLANK__();
    // phase 2 work -- all threads past barrier
}`,
      solution: `#include <barrier>
#include <thread>

std::barrier sync_point(4);

void worker() {
    // phase 1 work...
    sync_point.arrive_and_wait();
    // phase 2 work -- all threads past barrier
}`,
      hints: [
        'This method signals arrival and blocks until all threads arrive.',
        'The barrier is reusable for the next phase.',
        'The method is `arrive_and_wait`.',
      ],
      concepts: ['barrier', 'arrive-and-wait'],
    },
    {
      id: 'cpp-condvar-6',
      title: 'wait_for with timeout',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the method that waits on a condition variable with a timeout.',
      skeleton: `#include <condition_variable>
#include <mutex>
#include <chrono>

std::mutex mtx;
std::condition_variable cv;
bool ready = false;

bool wait_with_timeout() {
    std::unique_lock<std::mutex> lock(mtx);
    return cv.__BLANK__(lock, std::chrono::seconds(5),
                        []{ return ready; });
}`,
      solution: `#include <condition_variable>
#include <mutex>
#include <chrono>

std::mutex mtx;
std::condition_variable cv;
bool ready = false;

bool wait_with_timeout() {
    std::unique_lock<std::mutex> lock(mtx);
    return cv.wait_for(lock, std::chrono::seconds(5),
                       []{ return ready; });
}`,
      hints: [
        'This is like wait() but with a maximum duration.',
        'Returns the predicate result after the timeout.',
        'The method is `wait_for`.',
      ],
      concepts: ['wait-for', 'timeout', 'condition-variable'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-condvar-7',
      title: 'Producer-consumer queue',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write push() and pop() methods for a thread-safe blocking queue using a condition_variable.',
      skeleton: `#include <queue>
#include <mutex>
#include <condition_variable>

template <typename T>
class BlockingQueue {
    std::queue<T> queue_;
    std::mutex mtx_;
    std::condition_variable cv_;
public:
    void push(T item) {
        // TODO: lock, push, notify
    }
    T pop() {
        // TODO: lock, wait until non-empty, pop and return
    }
};`,
      solution: `#include <queue>
#include <mutex>
#include <condition_variable>

template <typename T>
class BlockingQueue {
    std::queue<T> queue_;
    std::mutex mtx_;
    std::condition_variable cv_;
public:
    void push(T item) {
        {
            std::lock_guard<std::mutex> lock(mtx_);
            queue_.push(std::move(item));
        }
        cv_.notify_one();
    }
    T pop() {
        std::unique_lock<std::mutex> lock(mtx_);
        cv_.wait(lock, [this]{ return !queue_.empty(); });
        T item = std::move(queue_.front());
        queue_.pop();
        return item;
    }
};`,
      hints: [
        'push: lock, push the item, unlock, then notify_one.',
        'pop: unique_lock, wait with predicate !queue_.empty(), then pop.',
        'Use std::move for efficiency on both push and pop.',
      ],
      concepts: ['producer-consumer', 'blocking-queue', 'condition-variable'],
    },
    {
      id: 'cpp-condvar-8',
      title: 'One-shot event',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a simple Event class with set() and wait() methods. set() signals the event, wait() blocks until signaled.',
      skeleton: `#include <mutex>
#include <condition_variable>

class Event {
    std::mutex mtx_;
    std::condition_variable cv_;
    bool signaled_ = false;
public:
    void set() {
        // TODO: signal the event
    }
    void wait() {
        // TODO: block until signaled
    }
};`,
      solution: `#include <mutex>
#include <condition_variable>

class Event {
    std::mutex mtx_;
    std::condition_variable cv_;
    bool signaled_ = false;
public:
    void set() {
        {
            std::lock_guard<std::mutex> lock(mtx_);
            signaled_ = true;
        }
        cv_.notify_all();
    }
    void wait() {
        std::unique_lock<std::mutex> lock(mtx_);
        cv_.wait(lock, [this]{ return signaled_; });
    }
};`,
      hints: [
        'set() locks, sets the flag, unlocks, then notifies.',
        'wait() locks with unique_lock, then waits with a predicate.',
        'Use notify_all so all waiters are woken.',
      ],
      concepts: ['event', 'condition-variable', 'notify-all'],
    },
    {
      id: 'cpp-condvar-9',
      title: 'Bounded buffer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a bounded buffer with push() that blocks when full and pop() that blocks when empty. Use two condition variables.',
      skeleton: `#include <queue>
#include <mutex>
#include <condition_variable>

template <typename T>
class BoundedBuffer {
    std::queue<T> queue_;
    std::mutex mtx_;
    std::condition_variable not_full_;
    std::condition_variable not_empty_;
    size_t capacity_;
public:
    explicit BoundedBuffer(size_t cap) : capacity_(cap) {}
    void push(T item) {
        // TODO: block if full, then push
    }
    T pop() {
        // TODO: block if empty, then pop
    }
};`,
      solution: `#include <queue>
#include <mutex>
#include <condition_variable>

template <typename T>
class BoundedBuffer {
    std::queue<T> queue_;
    std::mutex mtx_;
    std::condition_variable not_full_;
    std::condition_variable not_empty_;
    size_t capacity_;
public:
    explicit BoundedBuffer(size_t cap) : capacity_(cap) {}
    void push(T item) {
        std::unique_lock<std::mutex> lock(mtx_);
        not_full_.wait(lock, [this]{ return queue_.size() < capacity_; });
        queue_.push(std::move(item));
        not_empty_.notify_one();
    }
    T pop() {
        std::unique_lock<std::mutex> lock(mtx_);
        not_empty_.wait(lock, [this]{ return !queue_.empty(); });
        T item = std::move(queue_.front());
        queue_.pop();
        not_full_.notify_one();
        return item;
    }
};`,
      hints: [
        'push waits on not_full_ (queue_.size() < capacity_), then notifies not_empty_.',
        'pop waits on not_empty_ (!queue_.empty()), then notifies not_full_.',
        'Two condition variables: one for producers, one for consumers.',
      ],
      concepts: ['bounded-buffer', 'two-condition-variables', 'producer-consumer'],
    },
    {
      id: 'cpp-condvar-10',
      title: 'Countdown latch from scratch',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Implement a CountdownLatch class with count_down() and wait() using a mutex and condition_variable.',
      skeleton: `#include <mutex>
#include <condition_variable>

class CountdownLatch {
    int count_;
    std::mutex mtx_;
    std::condition_variable cv_;
public:
    explicit CountdownLatch(int count) : count_(count) {}
    void count_down() {
        // TODO: decrement count, notify if zero
    }
    void wait() {
        // TODO: block until count reaches zero
    }
};`,
      solution: `#include <mutex>
#include <condition_variable>

class CountdownLatch {
    int count_;
    std::mutex mtx_;
    std::condition_variable cv_;
public:
    explicit CountdownLatch(int count) : count_(count) {}
    void count_down() {
        std::lock_guard<std::mutex> lock(mtx_);
        if (--count_ <= 0) {
            cv_.notify_all();
        }
    }
    void wait() {
        std::unique_lock<std::mutex> lock(mtx_);
        cv_.wait(lock, [this]{ return count_ <= 0; });
    }
};`,
      hints: [
        'count_down: lock, decrement, notify_all if count reaches 0.',
        'wait: unique_lock, wait with predicate count_ <= 0.',
        'This is essentially what std::latch does internally.',
      ],
      concepts: ['latch', 'condition-variable', 'synchronization'],
    },
    {
      id: 'cpp-condvar-11',
      title: 'Timed wait for data',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that waits for data to become available but times out after a given number of milliseconds. Return an optional with the value or std::nullopt on timeout.',
      skeleton: `#include <mutex>
#include <condition_variable>
#include <optional>
#include <chrono>
#include <queue>

template <typename T>
class TimedQueue {
    std::queue<T> queue_;
    std::mutex mtx_;
    std::condition_variable cv_;
public:
    void push(T val) {
        { std::lock_guard<std::mutex> g(mtx_); queue_.push(std::move(val)); }
        cv_.notify_one();
    }
    std::optional<T> pop_wait(int timeout_ms) {
        // TODO: wait up to timeout_ms, return nullopt on timeout
    }
};`,
      solution: `#include <mutex>
#include <condition_variable>
#include <optional>
#include <chrono>
#include <queue>

template <typename T>
class TimedQueue {
    std::queue<T> queue_;
    std::mutex mtx_;
    std::condition_variable cv_;
public:
    void push(T val) {
        { std::lock_guard<std::mutex> g(mtx_); queue_.push(std::move(val)); }
        cv_.notify_one();
    }
    std::optional<T> pop_wait(int timeout_ms) {
        std::unique_lock<std::mutex> lock(mtx_);
        if (!cv_.wait_for(lock, std::chrono::milliseconds(timeout_ms),
                          [this]{ return !queue_.empty(); })) {
            return std::nullopt;
        }
        T val = std::move(queue_.front());
        queue_.pop();
        return val;
    }
};`,
      hints: [
        'Use cv_.wait_for with a chrono duration and a predicate.',
        'wait_for returns false if the timeout expired without the predicate becoming true.',
        'Return std::nullopt on timeout, otherwise pop and return the value.',
      ],
      concepts: ['wait-for', 'optional', 'timed-queue'],
    },
    {
      id: 'cpp-condvar-12',
      title: 'Notify all waiters',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a broadcast() function that sets a shared flag and wakes ALL waiting threads.',
      skeleton: `#include <mutex>
#include <condition_variable>

std::mutex mtx;
std::condition_variable cv;
bool shutdown = false;

void broadcast() {
    // TODO: set shutdown and wake all waiters
}

void waiter() {
    std::unique_lock<std::mutex> lock(mtx);
    cv.wait(lock, []{ return shutdown; });
}`,
      solution: `#include <mutex>
#include <condition_variable>

std::mutex mtx;
std::condition_variable cv;
bool shutdown = false;

void broadcast() {
    {
        std::lock_guard<std::mutex> lock(mtx);
        shutdown = true;
    }
    cv.notify_all();
}

void waiter() {
    std::unique_lock<std::mutex> lock(mtx);
    cv.wait(lock, []{ return shutdown; });
}`,
      hints: [
        'Lock, set the flag, unlock, then notify_all.',
        'notify_all wakes every thread waiting on this cv.',
        'The flag ensures late-arriving waiters see the shutdown too.',
      ],
      concepts: ['notify-all', 'broadcast', 'condition-variable'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-condvar-13',
      title: 'Fix missing predicate',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the wait that uses no predicate, making it vulnerable to spurious wakeups.',
      skeleton: `#include <mutex>
#include <condition_variable>

std::mutex mtx;
std::condition_variable cv;
bool ready = false;

void consumer() {
    std::unique_lock<std::mutex> lock(mtx);
    cv.wait(lock);  // BUG: no predicate, spurious wakeups cause issues
    // process data assuming ready == true
}`,
      solution: `#include <mutex>
#include <condition_variable>

std::mutex mtx;
std::condition_variable cv;
bool ready = false;

void consumer() {
    std::unique_lock<std::mutex> lock(mtx);
    cv.wait(lock, []{ return ready; });
    // process data -- ready is guaranteed true
}`,
      hints: [
        'Without a predicate, a spurious wakeup proceeds without the condition being met.',
        'Always pass a predicate lambda as the second argument to wait.',
        'The predicate version loops internally until the predicate is true.',
      ],
      concepts: ['spurious-wakeup', 'wait-predicate'],
    },
    {
      id: 'cpp-condvar-14',
      title: 'Fix lock_guard with condition_variable',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the code that uses lock_guard instead of unique_lock with a condition_variable.',
      skeleton: `#include <mutex>
#include <condition_variable>

std::mutex mtx;
std::condition_variable cv;
bool done = false;

void waiter() {
    std::lock_guard<std::mutex> guard(mtx);  // BUG: cv.wait needs unique_lock
    cv.wait(guard, []{ return done; });       // compilation error
}`,
      solution: `#include <mutex>
#include <condition_variable>

std::mutex mtx;
std::condition_variable cv;
bool done = false;

void waiter() {
    std::unique_lock<std::mutex> lock(mtx);
    cv.wait(lock, []{ return done; });
}`,
      hints: [
        'condition_variable::wait requires a unique_lock, not lock_guard.',
        'wait() needs to unlock/relock the mutex, which lock_guard cannot do.',
        'Replace lock_guard with unique_lock.',
      ],
      concepts: ['unique-lock', 'condition-variable'],
    },
    {
      id: 'cpp-condvar-15',
      title: 'Fix notify before flag set',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the race where notify is called before the flag is set, causing the waiter to miss the notification.',
      skeleton: `#include <mutex>
#include <condition_variable>

std::mutex mtx;
std::condition_variable cv;
bool ready = false;

void producer() {
    cv.notify_one();  // BUG: notify before setting flag
    std::lock_guard<std::mutex> g(mtx);
    ready = true;
}

void consumer() {
    std::unique_lock<std::mutex> lock(mtx);
    cv.wait(lock, []{ return ready; });
}`,
      solution: `#include <mutex>
#include <condition_variable>

std::mutex mtx;
std::condition_variable cv;
bool ready = false;

void producer() {
    {
        std::lock_guard<std::mutex> g(mtx);
        ready = true;
    }
    cv.notify_one();
}

void consumer() {
    std::unique_lock<std::mutex> lock(mtx);
    cv.wait(lock, []{ return ready; });
}`,
      hints: [
        'The flag must be set BEFORE calling notify.',
        'Otherwise the waiter wakes, checks the predicate (still false), and goes back to sleep.',
        'Set the flag under lock, then notify outside the lock.',
      ],
      concepts: ['notify-order', 'condition-variable', 'race-condition'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-condvar-16',
      title: 'Predict latch behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <latch>
#include <thread>
#include <iostream>

int main() {
    std::latch done(2);
    int result = 0;
    std::thread t1([&]{ result += 10; done.count_down(); });
    std::thread t2([&]{ result += 20; done.count_down(); });
    done.wait();
    std::cout << (result >= 30 ? "complete" : "partial") << std::endl;
    t1.join();
    t2.join();
}`,
      solution: `complete`,
      hints: [
        'The latch starts at 2. Each thread decrements it.',
        'wait() blocks until the count reaches 0 (both threads done).',
        'Both additions have completed, so result >= 30.',
      ],
      concepts: ['latch', 'synchronization'],
    },
    {
      id: 'cpp-condvar-17',
      title: 'Predict notify_all wake count',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'How many threads does notify_all wake if 3 threads are waiting?',
      skeleton: `#include <mutex>
#include <condition_variable>
#include <thread>
#include <atomic>
#include <iostream>

std::mutex mtx;
std::condition_variable cv;
bool go = false;
std::atomic<int> woken{0};

void waiter() {
    std::unique_lock<std::mutex> lock(mtx);
    cv.wait(lock, []{ return go; });
    woken++;
}

int main() {
    std::thread t1(waiter), t2(waiter), t3(waiter);
    std::this_thread::sleep_for(std::chrono::milliseconds(100));
    { std::lock_guard<std::mutex> g(mtx); go = true; }
    cv.notify_all();
    t1.join(); t2.join(); t3.join();
    std::cout << woken.load() << std::endl;
}`,
      solution: `3`,
      hints: [
        'notify_all wakes ALL threads waiting on the condition variable.',
        'All 3 threads check the predicate (go == true) and proceed.',
        'woken ends up at 3.',
      ],
      concepts: ['notify-all', 'condition-variable'],
    },
    {
      id: 'cpp-condvar-18',
      title: 'Predict wait_for timeout',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <mutex>
#include <condition_variable>
#include <chrono>
#include <iostream>

int main() {
    std::mutex mtx;
    std::condition_variable cv;
    bool flag = false;
    std::unique_lock<std::mutex> lock(mtx);
    bool result = cv.wait_for(lock, std::chrono::milliseconds(1),
                              [&]{ return flag; });
    std::cout << std::boolalpha << result << std::endl;
}`,
      solution: `false`,
      hints: [
        'flag is never set to true, and no one calls notify.',
        'wait_for times out after 1ms and returns the predicate result.',
        'The predicate returns false, so wait_for returns false.',
      ],
      concepts: ['wait-for', 'timeout', 'condition-variable'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-condvar-19',
      title: 'Refactor busy-wait to condition_variable',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Replace the busy-wait loop with a condition_variable wait.',
      skeleton: `#include <atomic>
#include <thread>
#include <chrono>

std::atomic<bool> ready{false};

void consumer() {
    while (!ready.load()) {
        std::this_thread::sleep_for(std::chrono::milliseconds(1));
    }
    // process
}

void producer() {
    // prepare data
    ready.store(true);
}`,
      solution: `#include <mutex>
#include <condition_variable>

std::mutex mtx;
std::condition_variable cv;
bool ready = false;

void consumer() {
    std::unique_lock<std::mutex> lock(mtx);
    cv.wait(lock, []{ return ready; });
    // process
}

void producer() {
    // prepare data
    {
        std::lock_guard<std::mutex> lock(mtx);
        ready = true;
    }
    cv.notify_one();
}`,
      hints: [
        'Busy-waiting wastes CPU cycles polling the flag.',
        'A condition_variable blocks the thread efficiently until notified.',
        'Replace the atomic flag + sleep loop with mutex + cv + wait.',
      ],
      concepts: ['condition-variable', 'busy-wait-elimination'],
    },
    {
      id: 'cpp-condvar-20',
      title: 'Refactor manual countdown to std::latch',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Replace the manual countdown using condition_variable with std::latch.',
      skeleton: `#include <mutex>
#include <condition_variable>
#include <thread>

std::mutex mtx;
std::condition_variable cv;
int remaining = 3;

void worker() {
    // do work
    {
        std::lock_guard<std::mutex> g(mtx);
        --remaining;
    }
    cv.notify_all();
}

void coordinator() {
    std::unique_lock<std::mutex> lock(mtx);
    cv.wait(lock, []{ return remaining == 0; });
}`,
      solution: `#include <latch>
#include <thread>

std::latch done(3);

void worker() {
    // do work
    done.count_down();
}

void coordinator() {
    done.wait();
}`,
      hints: [
        'std::latch (C++20) is a single-use countdown synchronization primitive.',
        'count_down() decrements the counter, wait() blocks until zero.',
        'It replaces the manual mutex + cv + counter pattern.',
      ],
      concepts: ['latch', 'refactor', 'synchronization'],
    },
  ],
};
