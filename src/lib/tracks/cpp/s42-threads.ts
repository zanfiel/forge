import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-threads',
  title: '42. Threads',
  explanation: `## Threads in C++

C++ provides \`std::thread\` (C++11) and \`std::jthread\` (C++20) for concurrent execution.

### std::thread
\`\`\`cpp
#include <thread>
void work(int id) { /* ... */ }

std::thread t(work, 42);  // launch thread with argument
t.join();                  // wait for completion
\`\`\`

### join vs detach
- \`join()\` -- blocks the calling thread until the thread finishes
- \`detach()\` -- lets the thread run independently (daemon thread)
- You MUST call one of these before the thread object is destroyed

### std::jthread (C++20)
Automatically joins on destruction and supports cooperative cancellation.
\`\`\`cpp
#include <thread>
std::jthread jt([](std::stop_token st) {
    while (!st.stop_requested()) {
        // do work
    }
});
// jt auto-joins when it goes out of scope
\`\`\`

### Passing Arguments
Arguments are copied by default. Use \`std::ref()\` for references:
\`\`\`cpp
void process(int& val) { val += 10; }
int x = 0;
std::thread t(process, std::ref(x));
t.join();
// x == 10
\`\`\`

### thread_local Storage
Each thread gets its own copy of a \`thread_local\` variable:
\`\`\`cpp
thread_local int tls_counter = 0;
\`\`\`

### hardware_concurrency
\`\`\`cpp
unsigned int cores = std::thread::hardware_concurrency();
\`\`\`
Returns the number of concurrent threads the hardware supports (hint, may return 0).
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-threads-1',
      title: 'Create a thread',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to create a thread that runs the given function.',
      skeleton: `#include <thread>
#include <iostream>

void greet() { std::cout << "Hello from thread!\\n"; }

int main() {
    std::__BLANK__ t(greet);
    t.join();
}`,
      solution: `#include <thread>
#include <iostream>

void greet() { std::cout << "Hello from thread!\\n"; }

int main() {
    std::thread t(greet);
    t.join();
}`,
      hints: [
        'The class for creating threads is in <thread>.',
        'It takes a callable as its constructor argument.',
        'The class is `thread`.',
      ],
      concepts: ['thread-creation', 'join'],
    },
    {
      id: 'cpp-threads-2',
      title: 'Join a thread',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the method to wait for the thread to complete.',
      skeleton: `#include <thread>

void work() { /* ... */ }

int main() {
    std::thread t(work);
    t.__BLANK__();
}`,
      solution: `#include <thread>

void work() { /* ... */ }

int main() {
    std::thread t(work);
    t.join();
}`,
      hints: [
        'This method blocks until the thread finishes.',
        'You must call this (or detach) before destroying the thread object.',
        'The method is `join`.',
      ],
      concepts: ['join', 'thread-lifecycle'],
    },
    {
      id: 'cpp-threads-3',
      title: 'Pass by reference to thread',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the wrapper to pass a variable by reference to a thread.',
      skeleton: `#include <thread>
#include <functional>

void add_ten(int& val) { val += 10; }

int main() {
    int x = 0;
    std::thread t(add_ten, std::__BLANK__(x));
    t.join();
    // x == 10
}`,
      solution: `#include <thread>
#include <functional>

void add_ten(int& val) { val += 10; }

int main() {
    int x = 0;
    std::thread t(add_ten, std::ref(x));
    t.join();
    // x == 10
}`,
      hints: [
        'Thread arguments are copied by default.',
        'To pass by reference, wrap with a reference wrapper.',
        'Use `std::ref()`.',
      ],
      concepts: ['std-ref', 'thread-arguments'],
    },
    {
      id: 'cpp-threads-4',
      title: 'thread_local variable',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the storage specifier so each thread gets its own copy of the variable.',
      skeleton: `#include <thread>
#include <iostream>

__BLANK__ int counter = 0;

void increment() {
    counter++;
    std::cout << counter << "\\n";  // always 1 per thread
}

int main() {
    std::thread t1(increment);
    std::thread t2(increment);
    t1.join();
    t2.join();
}`,
      solution: `#include <thread>
#include <iostream>

thread_local int counter = 0;

void increment() {
    counter++;
    std::cout << counter << "\\n";  // always 1 per thread
}

int main() {
    std::thread t1(increment);
    std::thread t2(increment);
    t1.join();
    t2.join();
}`,
      hints: [
        'This storage class specifier gives each thread its own copy.',
        'It is a keyword, not a library feature.',
        'The specifier is `thread_local`.',
      ],
      concepts: ['thread-local', 'tls'],
    },
    {
      id: 'cpp-threads-5',
      title: 'Hardware concurrency',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the static method to query the number of hardware threads.',
      skeleton: `#include <thread>
#include <iostream>

int main() {
    unsigned int cores = std::thread::__BLANK__();
    std::cout << "Cores: " << cores << "\\n";
}`,
      solution: `#include <thread>
#include <iostream>

int main() {
    unsigned int cores = std::thread::hardware_concurrency();
    std::cout << "Cores: " << cores << "\\n";
}`,
      hints: [
        'This is a static member function of std::thread.',
        'It returns the number of concurrent threads supported.',
        'The method is `hardware_concurrency`.',
      ],
      concepts: ['hardware-concurrency', 'thread'],
    },
    {
      id: 'cpp-threads-6',
      title: 'Detach a thread',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the method to let the thread run independently.',
      skeleton: `#include <thread>

void background_task() { /* long running */ }

int main() {
    std::thread t(background_task);
    t.__BLANK__();
    // t runs independently, main can exit
}`,
      solution: `#include <thread>

void background_task() { /* long running */ }

int main() {
    std::thread t(background_task);
    t.detach();
    // t runs independently, main can exit
}`,
      hints: [
        'This separates the thread of execution from the thread object.',
        'After this call, the thread runs as a daemon.',
        'The method is `detach`.',
      ],
      concepts: ['detach', 'daemon-thread'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-threads-7',
      title: 'Parallel sum with threads',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that splits an array into two halves, sums each half in a separate thread, and returns the total.',
      skeleton: `#include <thread>
#include <vector>

int parallel_sum(const std::vector<int>& data) {
    // TODO: split data, sum each half in a thread, return total
}`,
      solution: `#include <thread>
#include <vector>

int parallel_sum(const std::vector<int>& data) {
    int sum1 = 0, sum2 = 0;
    size_t mid = data.size() / 2;
    std::thread t1([&]() {
        for (size_t i = 0; i < mid; ++i) sum1 += data[i];
    });
    std::thread t2([&]() {
        for (size_t i = mid; i < data.size(); ++i) sum2 += data[i];
    });
    t1.join();
    t2.join();
    return sum1 + sum2;
}`,
      hints: [
        'Create two local sum variables and two threads.',
        'Each thread processes half the vector using a lambda.',
        'Join both threads before returning sum1 + sum2.',
      ],
      concepts: ['parallel-computation', 'thread-lambda'],
    },
    {
      id: 'cpp-threads-8',
      title: 'Thread wrapper with RAII',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a ScopedThread class that takes ownership of a std::thread and joins it in the destructor. The thread must not be joinable after construction if it was empty.',
      skeleton: `#include <thread>
#include <stdexcept>

class ScopedThread {
    std::thread t_;
public:
    // TODO: constructor that takes std::thread by rvalue reference
    // TODO: destructor that joins
    // TODO: delete copy, allow move
    ScopedThread(const ScopedThread&) = delete;
    ScopedThread& operator=(const ScopedThread&) = delete;
};`,
      solution: `#include <thread>
#include <stdexcept>

class ScopedThread {
    std::thread t_;
public:
    explicit ScopedThread(std::thread t) : t_(std::move(t)) {
        if (!t_.joinable()) {
            throw std::logic_error("No thread");
        }
    }
    ~ScopedThread() {
        if (t_.joinable()) t_.join();
    }
    ScopedThread(const ScopedThread&) = delete;
    ScopedThread& operator=(const ScopedThread&) = delete;
    ScopedThread(ScopedThread&&) = default;
    ScopedThread& operator=(ScopedThread&&) = default;
};`,
      hints: [
        'Take std::thread by value and move it into the member.',
        'Check joinable() in the constructor -- throw if not joinable.',
        'In the destructor, join if joinable. Default move operations.',
      ],
      concepts: ['raii', 'thread-ownership', 'move-semantics'],
    },
    {
      id: 'cpp-threads-9',
      title: 'Launch N threads',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a function that launches N threads, each printing its index, and joins them all.',
      skeleton: `#include <thread>
#include <vector>
#include <iostream>

void launch_threads(int n) {
    // TODO: create n threads, each prints its index, then join all
}`,
      solution: `#include <thread>
#include <vector>
#include <iostream>

void launch_threads(int n) {
    std::vector<std::thread> threads;
    for (int i = 0; i < n; ++i) {
        threads.emplace_back([i]() {
            std::cout << "Thread " << i << "\\n";
        });
    }
    for (auto& t : threads) {
        t.join();
    }
}`,
      hints: [
        'Store threads in a std::vector<std::thread>.',
        'Use emplace_back with a lambda capturing the index by value.',
        'Loop over the vector and join each thread.',
      ],
      concepts: ['thread-vector', 'lambda-capture'],
    },
    {
      id: 'cpp-threads-10',
      title: 'jthread with stop token',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function that starts a jthread running a loop. The loop should check the stop_token and exit cleanly. The function should request stop after a brief setup.',
      skeleton: `#include <thread>
#include <atomic>
#include <iostream>

void run_cancellable() {
    // TODO: start a jthread that loops until stop is requested
    // then request stop from the main thread
}`,
      solution: `#include <thread>
#include <atomic>
#include <iostream>

void run_cancellable() {
    std::atomic<int> count{0};
    std::jthread worker([&count](std::stop_token st) {
        while (!st.stop_requested()) {
            count.fetch_add(1, std::memory_order_relaxed);
        }
    });
    std::this_thread::sleep_for(std::chrono::milliseconds(10));
    worker.request_stop();
    worker.join();
    std::cout << "Iterations: " << count.load() << "\\n";
}`,
      hints: [
        'std::jthread passes a stop_token as the first parameter to the callable.',
        'Check st.stop_requested() in the loop condition.',
        'Call worker.request_stop() to signal the thread to stop.',
      ],
      concepts: ['jthread', 'stop-token', 'cooperative-cancellation'],
    },
    {
      id: 'cpp-threads-11',
      title: 'Get thread ID',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a function that returns the calling thread\'s ID as a string.',
      skeleton: `#include <thread>
#include <sstream>
#include <string>

std::string get_thread_id() {
    // TODO: return the current thread's id as a string
}`,
      solution: `#include <thread>
#include <sstream>
#include <string>

std::string get_thread_id() {
    std::ostringstream oss;
    oss << std::this_thread::get_id();
    return oss.str();
}`,
      hints: [
        'Use std::this_thread::get_id() to get the current thread ID.',
        'Thread IDs are streamable but not directly convertible to string.',
        'Use a std::ostringstream to convert it.',
      ],
      concepts: ['thread-id', 'this-thread'],
    },
    {
      id: 'cpp-threads-12',
      title: 'Parallel for_each',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that applies a callback to each element of a vector using one thread per element. Join all threads before returning.',
      skeleton: `#include <thread>
#include <vector>
#include <functional>

void parallel_for_each(std::vector<int>& data,
                       std::function<void(int&)> fn) {
    // TODO: apply fn to each element in its own thread
}`,
      solution: `#include <thread>
#include <vector>
#include <functional>

void parallel_for_each(std::vector<int>& data,
                       std::function<void(int&)> fn) {
    std::vector<std::thread> threads;
    for (auto& elem : data) {
        threads.emplace_back(fn, std::ref(elem));
    }
    for (auto& t : threads) {
        t.join();
    }
}`,
      hints: [
        'Create a thread for each element, passing fn and a reference to the element.',
        'Use std::ref() to pass the element by reference.',
        'Collect all threads and join them at the end.',
      ],
      concepts: ['parallel-for-each', 'std-ref', 'thread-vector'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-threads-13',
      title: 'Fix missing join',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the program that crashes because the thread object is destroyed without joining or detaching.',
      skeleton: `#include <thread>
#include <iostream>

void task() { std::cout << "Working\\n"; }

int main() {
    std::thread t(task);
    // BUG: t is destroyed without join or detach -- calls std::terminate
}`,
      solution: `#include <thread>
#include <iostream>

void task() { std::cout << "Working\\n"; }

int main() {
    std::thread t(task);
    t.join();
}`,
      hints: [
        'A std::thread must be joined or detached before destruction.',
        'If neither is called, the destructor calls std::terminate().',
        'Add t.join() before main returns.',
      ],
      concepts: ['join', 'thread-lifecycle'],
    },
    {
      id: 'cpp-threads-14',
      title: 'Fix dangling reference in thread',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the dangling reference caused by the thread outliving the local variable.',
      skeleton: `#include <thread>
#include <iostream>

void start_thread() {
    int local = 42;
    std::thread t([&local]() {
        // BUG: local may be destroyed by the time this runs
        std::cout << local << "\\n";
    });
    t.detach();
    // local goes out of scope, thread has dangling reference
}`,
      solution: `#include <thread>
#include <iostream>

void start_thread() {
    int local = 42;
    std::thread t([local]() {
        std::cout << local << "\\n";
    });
    t.join();
}`,
      hints: [
        'Detaching the thread means it outlives the function scope.',
        'Capturing by reference creates a dangling reference.',
        'Either capture by value, or join instead of detach.',
      ],
      concepts: ['dangling-reference', 'lambda-capture', 'detach-safety'],
    },
    {
      id: 'cpp-threads-15',
      title: 'Fix thread argument copy',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'The function expects a reference but the thread copies the argument. Fix it so the modification is visible to main.',
      skeleton: `#include <thread>
#include <iostream>

void double_it(int& x) { x *= 2; }

int main() {
    int val = 5;
    std::thread t(double_it, val);  // BUG: val is copied, not passed by ref
    t.join();
    std::cout << val << "\\n";  // prints 5 instead of 10
}`,
      solution: `#include <thread>
#include <iostream>

void double_it(int& x) { x *= 2; }

int main() {
    int val = 5;
    std::thread t(double_it, std::ref(val));
    t.join();
    std::cout << val << "\\n";  // prints 10
}`,
      hints: [
        'std::thread copies arguments by default, even for reference parameters.',
        'This actually fails to compile in most implementations (binding rvalue to lvalue ref).',
        'Wrap the argument with std::ref() to pass a real reference.',
      ],
      concepts: ['std-ref', 'thread-arguments'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-threads-16',
      title: 'Predict joinable state',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <thread>
#include <iostream>

int main() {
    std::thread t([]() {});
    std::cout << std::boolalpha << t.joinable() << " ";
    t.join();
    std::cout << t.joinable() << std::endl;
}`,
      solution: `true false`,
      hints: [
        'A thread is joinable after construction until join/detach.',
        'After join(), the thread is no longer joinable.',
        'Output: true false.',
      ],
      concepts: ['joinable', 'thread-lifecycle'],
    },
    {
      id: 'cpp-threads-17',
      title: 'Predict thread_local behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does each thread print? (Assume threads run one at a time for deterministic output.)',
      skeleton: `#include <thread>
#include <iostream>
#include <mutex>

thread_local int tls = 0;
std::mutex mtx;

void work() {
    tls++;
    tls++;
    std::lock_guard<std::mutex> lock(mtx);
    std::cout << tls << "\\n";
}

int main() {
    std::thread t1(work);
    t1.join();
    std::thread t2(work);
    t2.join();
}`,
      solution: `2
2`,
      hints: [
        'thread_local gives each thread its own copy, initialized to 0.',
        'Each thread increments its own copy twice: 0 -> 1 -> 2.',
        'Both threads print 2.',
      ],
      concepts: ['thread-local', 'tls'],
    },
    {
      id: 'cpp-threads-18',
      title: 'Predict hardware_concurrency',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'What type of value does hardware_concurrency() return, and what is a possible output?',
      skeleton: `#include <thread>
#include <iostream>

int main() {
    auto n = std::thread::hardware_concurrency();
    std::cout << (n > 0 ? "supported" : "unknown") << std::endl;
}`,
      solution: `supported`,
      hints: [
        'hardware_concurrency() returns unsigned int.',
        'It returns 0 if the value is not computable.',
        'On most modern systems it returns a positive number (e.g. 4, 8, 16).',
      ],
      concepts: ['hardware-concurrency', 'thread'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-threads-19',
      title: 'Refactor thread to jthread',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor the manual join pattern to use std::jthread which auto-joins on destruction.',
      skeleton: `#include <thread>
#include <iostream>

void process() {
    std::thread t([]() {
        std::cout << "Working...\\n";
    });
    t.join();
}`,
      solution: `#include <thread>
#include <iostream>

void process() {
    std::jthread t([]() {
        std::cout << "Working...\\n";
    });
    // auto-joins when t goes out of scope
}`,
      hints: [
        'std::jthread (C++20) automatically joins in its destructor.',
        'Simply replace std::thread with std::jthread.',
        'Remove the explicit join() call.',
      ],
      concepts: ['jthread', 'raii', 'auto-join'],
    },
    {
      id: 'cpp-threads-20',
      title: 'Refactor polling loop to stop_token',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Replace the manual atomic<bool> flag pattern with jthread\'s stop_token for cooperative cancellation.',
      skeleton: `#include <thread>
#include <atomic>
#include <chrono>
#include <iostream>

std::atomic<bool> running{true};

void worker() {
    while (running.load()) {
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
}

void run() {
    std::thread t(worker);
    std::this_thread::sleep_for(std::chrono::seconds(1));
    running.store(false);
    t.join();
}`,
      solution: `#include <thread>
#include <chrono>
#include <iostream>

void run() {
    std::jthread t([](std::stop_token st) {
        while (!st.stop_requested()) {
            std::this_thread::sleep_for(std::chrono::milliseconds(100));
        }
    });
    std::this_thread::sleep_for(std::chrono::seconds(1));
    t.request_stop();
    // auto-joins on destruction
}`,
      hints: [
        'std::jthread provides built-in stop_token support.',
        'The callable receives a stop_token as its first parameter.',
        'Use request_stop() instead of setting a manual flag.',
      ],
      concepts: ['jthread', 'stop-token', 'cooperative-cancellation'],
    },
  ],
};
