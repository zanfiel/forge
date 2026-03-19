import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-coroutines',
  title: '33. Coroutines',
  explanation: `## Coroutines in C++\n\nC++20 introduces **coroutines** - functions that can suspend execution and resume later. A function becomes a coroutine when it uses \`co_await\`, \`co_yield\`, or \`co_return\`.\n\n### Core Keywords\n\n- \`co_await\` - suspend until an awaitable completes\n- \`co_yield\` - suspend and produce a value\n- \`co_return\` - complete the coroutine with (or without) a value\n\n### Generator Pattern\n\nA generator lazily produces values one at a time:\n\n\`\`\`cpp\n#include <coroutine>\n\ntemplate<typename T>\nstruct Generator {\n    struct promise_type {\n        T current_value;\n        Generator get_return_object() {\n            return Generator{std::coroutine_handle<promise_type>::from_promise(*this)};\n        }\n        std::suspend_always initial_suspend() { return {}; }\n        std::suspend_always final_suspend() noexcept { return {}; }\n        std::suspend_always yield_value(T value) {\n            current_value = value;\n            return {};\n        }\n        void return_void() {}\n        void unhandled_exception() { std::terminate(); }\n    };\n\n    std::coroutine_handle<promise_type> handle;\n    // ... iterator interface\n};\n\nGenerator<int> range(int start, int end) {\n    for (int i = start; i < end; ++i)\n        co_yield i;\n}\n\`\`\`\n\n### Promise Type\n\nEvery coroutine has an associated **promise_type** that controls its behavior:\n- \`get_return_object()\` - creates the return object\n- \`initial_suspend()\` - whether to suspend at start\n- \`final_suspend()\` - whether to suspend at end\n- \`yield_value()\` - handles co_yield\n- \`return_void()\` / \`return_value()\` - handles co_return\n- \`unhandled_exception()\` - handles exceptions\n\n### Coroutine Handle\n\n\`std::coroutine_handle<>\` is a non-owning handle to a suspended coroutine. Call \`.resume()\` to continue execution, \`.done()\` to check if complete, and \`.destroy()\` to free resources.`,
  exercises: [
    {
      id: 'cpp-coroutines-1',
      title: 'Identify the Coroutine Keyword',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank with the keyword that yields a value from a coroutine.',
      skeleton: `Generator<int> count_up(int n) {
    for (int i = 0; i < n; ++i) {
        ___ i;
    }
}`,
      solution: `Generator<int> count_up(int n) {
    for (int i = 0; i < n; ++i) {
        co_yield i;
    }
}`,
      hints: [
        'The keyword to produce a value and suspend is co_yield.',
        'co_yield suspends the coroutine and makes the value available.',
        'Fill in "co_yield".',
      ],
      concepts: ['coroutines', 'co-yield'],
    },
    {
      id: 'cpp-coroutines-2',
      title: 'Complete the Promise Type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to create a coroutine handle from the promise.',
      skeleton: `struct promise_type {
    int current_value;
    Generator get_return_object() {
        return Generator{std::coroutine_handle<promise_type>::___(* this)};
    }
    std::suspend_always initial_suspend() { return {}; }
    std::suspend_always final_suspend() noexcept { return {}; }
    void return_void() {}
    void unhandled_exception() { std::terminate(); }
};`,
      solution: `struct promise_type {
    int current_value;
    Generator get_return_object() {
        return Generator{std::coroutine_handle<promise_type>::from_promise(*this)};
    }
    std::suspend_always initial_suspend() { return {}; }
    std::suspend_always final_suspend() noexcept { return {}; }
    void return_void() {}
    void unhandled_exception() { std::terminate(); }
};`,
      hints: [
        'The static method that creates a handle from a promise reference is from_promise.',
        'std::coroutine_handle<P>::from_promise(promise) creates the handle.',
        'Fill in "from_promise".',
      ],
      concepts: ['coroutines', 'promise-type', 'coroutine-handle'],
    },
    {
      id: 'cpp-coroutines-3',
      title: 'Initial Suspend Policy',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank so the coroutine starts lazily (suspended at the beginning).',
      skeleton: `struct promise_type {
    ___ initial_suspend() { return {}; }
    std::suspend_always final_suspend() noexcept { return {}; }
    void return_void() {}
    void unhandled_exception() { std::terminate(); }
};`,
      solution: `struct promise_type {
    std::suspend_always initial_suspend() { return {}; }
    std::suspend_always final_suspend() noexcept { return {}; }
    void return_void() {}
    void unhandled_exception() { std::terminate(); }
};`,
      hints: [
        'To start lazy (suspended), initial_suspend should return std::suspend_always.',
        'std::suspend_always causes the coroutine to suspend at that point.',
        'Fill in "std::suspend_always".',
      ],
      concepts: ['coroutines', 'suspend-always', 'initial-suspend'],
    },
    {
      id: 'cpp-coroutines-4',
      title: 'co_return Keyword',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to complete the coroutine with co_return.',
      skeleton: `Task<int> compute(int x) {
    int result = x * x + 1;
    ___ result;
}`,
      solution: `Task<int> compute(int x) {
    int result = x * x + 1;
    co_return result;
}`,
      hints: [
        'co_return completes the coroutine and returns a value.',
        'It is the coroutine equivalent of return.',
        'Fill in "co_return".',
      ],
      concepts: ['coroutines', 'co-return'],
    },
    {
      id: 'cpp-coroutines-5',
      title: 'co_await Expression',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to await an asynchronous operation.',
      skeleton: `Task<std::string> fetch_data() {
    auto result = ___ async_read("data.txt");
    co_return result;
}`,
      solution: `Task<std::string> fetch_data() {
    auto result = co_await async_read("data.txt");
    co_return result;
}`,
      hints: [
        'co_await suspends until the awaitable completes.',
        'The result of co_await is the completed value.',
        'Fill in "co_await".',
      ],
      concepts: ['coroutines', 'co-await'],
    },
    {
      id: 'cpp-coroutines-6',
      title: 'Resume a Coroutine Handle',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to resume a suspended coroutine.',
      skeleton: `void run_coroutine(std::coroutine_handle<> h) {
    while (!h.done()) {
        h.___();
    }
    h.destroy();
}`,
      solution: `void run_coroutine(std::coroutine_handle<> h) {
    while (!h.done()) {
        h.resume();
    }
    h.destroy();
}`,
      hints: [
        'The method to continue a suspended coroutine is resume().',
        'h.resume() continues execution from the suspension point.',
        'Fill in "resume".',
      ],
      concepts: ['coroutines', 'coroutine-handle', 'resume'],
    },
    {
      id: 'cpp-coroutines-7',
      title: 'Write a Simple Generator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Complete the Generator class and write a coroutine iota(n) that yields 0 to n-1.',
      skeleton: `#include <coroutine>
#include <iostream>

template<typename T>
struct Generator {
    struct promise_type {
        T current_value;
        Generator get_return_object() {
            return Generator{std::coroutine_handle<promise_type>::from_promise(*this)};
        }
        std::suspend_always initial_suspend() { return {}; }
        std::suspend_always final_suspend() noexcept { return {}; }
        std::suspend_always yield_value(T value) {
            current_value = value;
            return {};
        }
        void return_void() {}
        void unhandled_exception() { std::terminate(); }
    };

    std::coroutine_handle<promise_type> handle;

    explicit Generator(std::coroutine_handle<promise_type> h) : handle(h) {}
    ~Generator() { if (handle) handle.destroy(); }

    // Write next() and value() methods here
};

// Write iota(int n) coroutine here

int main() {
    auto gen = iota(5);
    while (gen.next()) {
        std::cout << gen.value() << " ";
    }
    // Output: 0 1 2 3 4
}`,
      solution: `#include <coroutine>
#include <iostream>

template<typename T>
struct Generator {
    struct promise_type {
        T current_value;
        Generator get_return_object() {
            return Generator{std::coroutine_handle<promise_type>::from_promise(*this)};
        }
        std::suspend_always initial_suspend() { return {}; }
        std::suspend_always final_suspend() noexcept { return {}; }
        std::suspend_always yield_value(T value) {
            current_value = value;
            return {};
        }
        void return_void() {}
        void unhandled_exception() { std::terminate(); }
    };

    std::coroutine_handle<promise_type> handle;

    explicit Generator(std::coroutine_handle<promise_type> h) : handle(h) {}
    ~Generator() { if (handle) handle.destroy(); }

    bool next() {
        handle.resume();
        return !handle.done();
    }

    T value() const {
        return handle.promise().current_value;
    }
};

Generator<int> iota(int n) {
    for (int i = 0; i < n; ++i) {
        co_yield i;
    }
}

int main() {
    auto gen = iota(5);
    while (gen.next()) {
        std::cout << gen.value() << " ";
    }
    // Output: 0 1 2 3 4
}`,
      hints: [
        'next() should resume the handle and return !handle.done().',
        'value() returns handle.promise().current_value.',
        'iota uses co_yield in a loop from 0 to n-1.',
      ],
      concepts: ['coroutines', 'generator-pattern', 'co-yield'],
    },
    {
      id: 'cpp-coroutines-8',
      title: 'Write a Fibonacci Generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a coroutine fibonacci() that yields Fibonacci numbers indefinitely using co_yield. Assume the Generator type from previous exercises is available.',
      skeleton: `// Assume Generator<int> is defined as before

// Write fibonacci() coroutine here

int main() {
    auto gen = fibonacci();
    for (int i = 0; i < 8; ++i) {
        gen.next();
        std::cout << gen.value() << " ";
    }
    // Output: 1 1 2 3 5 8 13 21
}`,
      solution: `// Assume Generator<int> is defined as before

Generator<int> fibonacci() {
    int a = 1, b = 1;
    while (true) {
        co_yield a;
        int next = a + b;
        a = b;
        b = next;
    }
}

int main() {
    auto gen = fibonacci();
    for (int i = 0; i < 8; ++i) {
        gen.next();
        std::cout << gen.value() << " ";
    }
    // Output: 1 1 2 3 5 8 13 21
}`,
      hints: [
        'Use an infinite while(true) loop with co_yield.',
        'Maintain two variables a and b for the Fibonacci state.',
        'co_yield a; then update: next = a+b; a = b; b = next.',
      ],
      concepts: ['coroutines', 'generator-pattern', 'infinite-sequence'],
    },
    {
      id: 'cpp-coroutines-9',
      title: 'Write a Filtering Generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a coroutine filter_gen that takes a Generator<int> and a predicate, and yields only matching values.',
      skeleton: `#include <functional>
// Assume Generator<int> is defined as before

// Write filter_gen here

Generator<int> range(int start, int end) {
    for (int i = start; i < end; ++i)
        co_yield i;
}

int main() {
    auto evens = filter_gen(range(1, 10), [](int n){ return n % 2 == 0; });
    while (evens.next()) {
        std::cout << evens.value() << " ";
    }
    // Output: 2 4 6 8
}`,
      solution: `#include <functional>
// Assume Generator<int> is defined as before

Generator<int> filter_gen(Generator<int> source, std::function<bool(int)> pred) {
    while (source.next()) {
        if (pred(source.value())) {
            co_yield source.value();
        }
    }
}

Generator<int> range(int start, int end) {
    for (int i = start; i < end; ++i)
        co_yield i;
}

int main() {
    auto evens = filter_gen(range(1, 10), [](int n){ return n % 2 == 0; });
    while (evens.next()) {
        std::cout << evens.value() << " ";
    }
    // Output: 2 4 6 8
}`,
      hints: [
        'Loop through the source generator with source.next().',
        'Check the predicate on source.value().',
        'co_yield only when the predicate returns true.',
      ],
      concepts: ['coroutines', 'generator-composition', 'filtering'],
    },
    {
      id: 'cpp-coroutines-10',
      title: 'Write a Mapped Generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a coroutine map_gen that transforms each value from a source generator using a function.',
      skeleton: `#include <functional>
// Assume Generator<int> is defined as before

// Write map_gen here

Generator<int> range(int start, int end) {
    for (int i = start; i < end; ++i)
        co_yield i;
}

int main() {
    auto squares = map_gen(range(1, 6), [](int n){ return n * n; });
    while (squares.next()) {
        std::cout << squares.value() << " ";
    }
    // Output: 1 4 9 16 25
}`,
      solution: `#include <functional>
// Assume Generator<int> is defined as before

Generator<int> map_gen(Generator<int> source, std::function<int(int)> fn) {
    while (source.next()) {
        co_yield fn(source.value());
    }
}

Generator<int> range(int start, int end) {
    for (int i = start; i < end; ++i)
        co_yield i;
}

int main() {
    auto squares = map_gen(range(1, 6), [](int n){ return n * n; });
    while (squares.next()) {
        std::cout << squares.value() << " ";
    }
    // Output: 1 4 9 16 25
}`,
      hints: [
        'Iterate through the source generator.',
        'Apply fn to each value and co_yield the result.',
        'co_yield fn(source.value());',
      ],
      concepts: ['coroutines', 'generator-composition', 'mapping'],
    },
    {
      id: 'cpp-coroutines-11',
      title: 'Write a Take Generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a coroutine take_gen that yields at most n values from a source generator.',
      skeleton: `// Assume Generator<int> is defined as before

// Write take_gen here

Generator<int> naturals() {
    int i = 1;
    while (true) co_yield i++;
}

int main() {
    auto first5 = take_gen(naturals(), 5);
    while (first5.next()) {
        std::cout << first5.value() << " ";
    }
    // Output: 1 2 3 4 5
}`,
      solution: `// Assume Generator<int> is defined as before

Generator<int> take_gen(Generator<int> source, int n) {
    int count = 0;
    while (count < n && source.next()) {
        co_yield source.value();
        ++count;
    }
}

Generator<int> naturals() {
    int i = 1;
    while (true) co_yield i++;
}

int main() {
    auto first5 = take_gen(naturals(), 5);
    while (first5.next()) {
        std::cout << first5.value() << " ";
    }
    // Output: 1 2 3 4 5
}`,
      hints: [
        'Track a count and stop when it reaches n.',
        'while (count < n && source.next()) { co_yield ...; }',
        'Increment count after each co_yield.',
      ],
      concepts: ['coroutines', 'generator-composition', 'take'],
    },
    {
      id: 'cpp-coroutines-12',
      title: 'Write an Awaitable Type',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a simple awaitable struct ReadyAwaitable that always resumes immediately with a given value.',
      skeleton: `#include <coroutine>
#include <iostream>

// Write ReadyAwaitable<T> here
// It must satisfy the awaitable interface:
// - await_ready() returns true
// - await_suspend(handle) is never called
// - await_resume() returns the stored value

struct Task {
    struct promise_type {
        int result;
        Task get_return_object() { return {}; }
        std::suspend_never initial_suspend() { return {}; }
        std::suspend_never final_suspend() noexcept { return {}; }
        void return_value(int v) { result = v; }
        void unhandled_exception() { std::terminate(); }
    };
};

Task example() {
    int val = co_await ReadyAwaitable<int>{42};
    std::cout << val << std::endl; // 42
    co_return val;
}

int main() {
    example();
}`,
      solution: `#include <coroutine>
#include <iostream>

template<typename T>
struct ReadyAwaitable {
    T value;
    bool await_ready() const noexcept { return true; }
    void await_suspend(std::coroutine_handle<>) const noexcept {}
    T await_resume() const noexcept { return value; }
};

struct Task {
    struct promise_type {
        int result;
        Task get_return_object() { return {}; }
        std::suspend_never initial_suspend() { return {}; }
        std::suspend_never final_suspend() noexcept { return {}; }
        void return_value(int v) { result = v; }
        void unhandled_exception() { std::terminate(); }
    };
};

Task example() {
    int val = co_await ReadyAwaitable<int>{42};
    std::cout << val << std::endl; // 42
    co_return val;
}

int main() {
    example();
}`,
      hints: [
        'An awaitable needs three methods: await_ready, await_suspend, await_resume.',
        'await_ready() returns true means no suspension needed.',
        'await_resume() returns the stored value.',
      ],
      concepts: ['coroutines', 'awaitable', 'co-await'],
    },
    {
      id: 'cpp-coroutines-13',
      title: 'Fix the Missing co_yield',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the coroutine so it actually yields values instead of just returning.',
      skeleton: `// Assume Generator<int> is defined

Generator<int> squares(int n) {
    for (int i = 1; i <= n; ++i) {
        return i * i;
    }
}

int main() {
    auto gen = squares(4);
    while (gen.next()) {
        std::cout << gen.value() << " ";
    }
    // Expected: 1 4 9 16
}`,
      solution: `// Assume Generator<int> is defined

Generator<int> squares(int n) {
    for (int i = 1; i <= n; ++i) {
        co_yield i * i;
    }
}

int main() {
    auto gen = squares(4);
    while (gen.next()) {
        std::cout << gen.value() << " ";
    }
    // Expected: 1 4 9 16
}`,
      hints: [
        'Regular return exits the function; co_yield suspends and produces a value.',
        'Replace return with co_yield to make it a coroutine.',
        'co_yield i * i; suspends and stores the value.',
      ],
      concepts: ['coroutines', 'co-yield', 'generator-pattern'],
    },
    {
      id: 'cpp-coroutines-14',
      title: 'Fix Missing Destroy',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the memory leak by properly destroying the coroutine handle.',
      skeleton: `#include <coroutine>

template<typename T>
struct Generator {
    struct promise_type {
        T current_value;
        Generator get_return_object() {
            return Generator{std::coroutine_handle<promise_type>::from_promise(*this)};
        }
        std::suspend_always initial_suspend() { return {}; }
        std::suspend_always final_suspend() noexcept { return {}; }
        std::suspend_always yield_value(T value) {
            current_value = value;
            return {};
        }
        void return_void() {}
        void unhandled_exception() { std::terminate(); }
    };

    std::coroutine_handle<promise_type> handle;
    explicit Generator(std::coroutine_handle<promise_type> h) : handle(h) {}
    ~Generator() { }

    bool next() { handle.resume(); return !handle.done(); }
    T value() const { return handle.promise().current_value; }
};`,
      solution: `#include <coroutine>

template<typename T>
struct Generator {
    struct promise_type {
        T current_value;
        Generator get_return_object() {
            return Generator{std::coroutine_handle<promise_type>::from_promise(*this)};
        }
        std::suspend_always initial_suspend() { return {}; }
        std::suspend_always final_suspend() noexcept { return {}; }
        std::suspend_always yield_value(T value) {
            current_value = value;
            return {};
        }
        void return_void() {}
        void unhandled_exception() { std::terminate(); }
    };

    std::coroutine_handle<promise_type> handle;
    explicit Generator(std::coroutine_handle<promise_type> h) : handle(h) {}
    ~Generator() { if (handle) handle.destroy(); }

    bool next() { handle.resume(); return !handle.done(); }
    T value() const { return handle.promise().current_value; }
};`,
      hints: [
        'The destructor is empty but the coroutine frame is heap-allocated.',
        'Call handle.destroy() in the destructor to free the coroutine frame.',
        'Check if handle is valid before destroying: if (handle) handle.destroy();',
      ],
      concepts: ['coroutines', 'coroutine-handle', 'resource-management'],
    },
    {
      id: 'cpp-coroutines-15',
      title: 'Fix Wrong Suspend Policy',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the promise_type so the generator starts lazily (does not run until first next() call).',
      skeleton: `struct promise_type {
    int current_value;
    Generator get_return_object() {
        return Generator{std::coroutine_handle<promise_type>::from_promise(*this)};
    }
    std::suspend_never initial_suspend() { return {}; }
    std::suspend_always final_suspend() noexcept { return {}; }
    std::suspend_always yield_value(int value) {
        current_value = value;
        return {};
    }
    void return_void() {}
    void unhandled_exception() { std::terminate(); }
};

// Problem: The generator runs immediately upon creation,
// consuming the first yield before next() is ever called.`,
      solution: `struct promise_type {
    int current_value;
    Generator get_return_object() {
        return Generator{std::coroutine_handle<promise_type>::from_promise(*this)};
    }
    std::suspend_always initial_suspend() { return {}; }
    std::suspend_always final_suspend() noexcept { return {}; }
    std::suspend_always yield_value(int value) {
        current_value = value;
        return {};
    }
    void return_void() {}
    void unhandled_exception() { std::terminate(); }
};

// Fix: Changed initial_suspend to suspend_always so the coroutine
// starts lazy and waits for the first resume() call.`,
      hints: [
        'suspend_never means the coroutine runs immediately at creation.',
        'For lazy generators, initial_suspend should return std::suspend_always.',
        'Change std::suspend_never to std::suspend_always for initial_suspend.',
      ],
      concepts: ['coroutines', 'initial-suspend', 'lazy-evaluation'],
    },
    {
      id: 'cpp-coroutines-16',
      title: 'Predict Generator Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Predict what this program prints.',
      skeleton: `// Assume Generator<int> with lazy start is defined

Generator<int> count() {
    co_yield 10;
    co_yield 20;
    co_yield 30;
}

int main() {
    auto g = count();
    g.next();
    std::cout << g.value() << " ";
    g.next();
    std::cout << g.value() << " ";
    // We do NOT call g.next() a third time
}`,
      solution: `10 20 `,
      hints: [
        'First next() resumes to the first co_yield 10.',
        'Second next() resumes to co_yield 20.',
        'The third co_yield 30 is never reached.',
      ],
      concepts: ['coroutines', 'co-yield', 'lazy-evaluation'],
    },
    {
      id: 'cpp-coroutines-17',
      title: 'Predict Suspension Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the order of printed messages.',
      skeleton: `// Assume Generator<int> with lazy start is defined

Generator<int> example() {
    std::cout << "A ";
    co_yield 1;
    std::cout << "B ";
    co_yield 2;
    std::cout << "C ";
}

int main() {
    std::cout << "1 ";
    auto g = example();
    std::cout << "2 ";
    g.next();
    std::cout << "3 ";
    g.next();
    std::cout << "4 ";
    g.next();
    std::cout << "5 ";
}`,
      solution: `1 2 A 3 B 4 C 5 `,
      hints: [
        'With lazy start, creating the generator does not run any code.',
        'First next(): runs until first co_yield -> prints A.',
        'Second next(): runs from first yield to second -> prints B. Third next(): runs to end -> prints C.',
      ],
      concepts: ['coroutines', 'suspension-points', 'execution-order'],
    },
    {
      id: 'cpp-coroutines-18',
      title: 'Predict done() Status',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict what this program prints.',
      skeleton: `// Assume Generator<int> with lazy start is defined
// next() returns true if NOT done after resume

Generator<int> two_vals() {
    co_yield 42;
    co_yield 99;
}

int main() {
    auto g = two_vals();
    std::cout << g.next() << " ";
    std::cout << g.next() << " ";
    std::cout << g.next() << std::endl;
}`,
      solution: `1 1 0`,
      hints: [
        'next() resumes and returns !handle.done().',
        'After first yield (42): not done -> 1.',
        'After second yield (99): not done -> 1. After the coroutine body ends: done -> 0.',
      ],
      concepts: ['coroutines', 'coroutine-handle', 'done-status'],
    },
    {
      id: 'cpp-coroutines-19',
      title: 'Refactor Callback to Coroutine',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor the callback-based sequence into a generator coroutine.',
      skeleton: `#include <iostream>
#include <functional>

void generate_powers_of_two(int n, std::function<void(int)> callback) {
    int val = 1;
    for (int i = 0; i < n; ++i) {
        callback(val);
        val *= 2;
    }
}

int main() {
    generate_powers_of_two(5, [](int v) {
        std::cout << v << " ";
    });
    // Output: 1 2 4 8 16
}`,
      solution: `#include <iostream>
// Assume Generator<int> is defined

Generator<int> powers_of_two(int n) {
    int val = 1;
    for (int i = 0; i < n; ++i) {
        co_yield val;
        val *= 2;
    }
}

int main() {
    auto gen = powers_of_two(5);
    while (gen.next()) {
        std::cout << gen.value() << " ";
    }
    // Output: 1 2 4 8 16
}`,
      hints: [
        'Replace the callback parameter with co_yield statements.',
        'Instead of callback(val), use co_yield val.',
        'The caller pulls values with gen.next() and gen.value().',
      ],
      concepts: ['coroutines', 'generator-pattern', 'callback-refactoring'],
    },
    {
      id: 'cpp-coroutines-20',
      title: 'Refactor Iterator Class to Generator',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor the manual iterator class into a coroutine-based generator.',
      skeleton: `#include <iostream>

class RangeIterator {
    int current, end_val;
public:
    RangeIterator(int start, int end) : current(start), end_val(end) {}
    bool has_next() const { return current < end_val; }
    int next() { return current++; }
};

int main() {
    RangeIterator it(1, 6);
    while (it.has_next()) {
        std::cout << it.next() << " ";
    }
    // Output: 1 2 3 4 5
}`,
      solution: `#include <iostream>
// Assume Generator<int> is defined

Generator<int> range(int start, int end) {
    for (int i = start; i < end; ++i) {
        co_yield i;
    }
}

int main() {
    auto gen = range(1, 6);
    while (gen.next()) {
        std::cout << gen.value() << " ";
    }
    // Output: 1 2 3 4 5
}`,
      hints: [
        'Replace the class with a coroutine function.',
        'The loop and co_yield replace the has_next/next pattern.',
        'Generator<int> range(int start, int end) { for (...) co_yield i; }',
      ],
      concepts: ['coroutines', 'generator-pattern', 'iterator-refactoring'],
    },
  ],
};
