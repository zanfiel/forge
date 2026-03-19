import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-alloc',
  title: '48. Allocators',
  explanation: `## Allocators in C++

Allocators control how containers obtain and release memory. Custom allocators enable arena allocation, pool allocation, and other strategies.

### Default Allocator
\`\`\`cpp
std::vector<int> v;  // uses std::allocator<int> by default
\`\`\`

### Allocator Interface (Simplified)
\`\`\`cpp
template <typename T>
class MyAllocator {
public:
    using value_type = T;
    MyAllocator() = default;
    template <typename U>
    MyAllocator(const MyAllocator<U>&) {}
    T* allocate(std::size_t n) {
        return static_cast<T*>(::operator new(n * sizeof(T)));
    }
    void deallocate(T* p, std::size_t) {
        ::operator delete(p);
    }
};
\`\`\`

### Arena Allocator
Allocates from a pre-allocated buffer. Fast allocation, no per-object deallocation:
\`\`\`cpp
char buffer[1024];
size_t offset = 0;
void* arena_alloc(size_t n) {
    void* p = buffer + offset;
    offset += n;
    return p;
}
\`\`\`

### Pool Allocator
Allocates fixed-size blocks from a free list. O(1) allocation and deallocation.

### PMR (Polymorphic Memory Resources) -- C++17
\`\`\`cpp
#include <memory_resource>
char buf[1024];
std::pmr::monotonic_buffer_resource mbr(buf, sizeof(buf));
std::pmr::vector<int> v(&mbr);
\`\`\`

### monotonic_buffer_resource
Fast allocator that never deallocates individually -- frees everything on destruction. Ideal for temporary/scoped work.

### Key Points
- Custom allocators are stateful or stateless
- PMR separates allocation strategy from container type
- Arena/pool allocators reduce fragmentation and allocation overhead
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-alloc-1',
      title: 'Default allocator type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the default allocator used by std::vector.',
      skeleton: `#include <memory>
#include <vector>

// std::vector<int> uses std::__BLANK__<int> by default
using IntVec = std::vector<int, std::__BLANK__<int>>;`,
      solution: `#include <memory>
#include <vector>

// std::vector<int> uses std::allocator<int> by default
using IntVec = std::vector<int, std::allocator<int>>;`,
      hints: [
        'The standard library provides a default allocator.',
        'It uses global new/delete for memory.',
        'The type is `allocator`.',
      ],
      concepts: ['allocator', 'default-allocator'],
    },
    {
      id: 'cpp-alloc-2',
      title: 'Allocator value_type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the required type alias for a custom allocator.',
      skeleton: `template <typename T>
class MyAlloc {
public:
    using __BLANK__ = T;
    T* allocate(std::size_t n);
    void deallocate(T* p, std::size_t n);
};`,
      solution: `template <typename T>
class MyAlloc {
public:
    using value_type = T;
    T* allocate(std::size_t n);
    void deallocate(T* p, std::size_t n);
};`,
      hints: [
        'Every allocator must define this type alias for the element type.',
        'Containers use it to determine what type the allocator manages.',
        'The alias is `value_type`.',
      ],
      concepts: ['allocator-interface', 'value-type'],
    },
    {
      id: 'cpp-alloc-3',
      title: 'PMR vector with memory resource',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the PMR namespace to create a vector that uses a custom memory resource.',
      skeleton: `#include <memory_resource>
#include <vector>

char buf[4096];
std::pmr::monotonic_buffer_resource mbr(buf, sizeof(buf));
std::__BLANK__::vector<int> v(&mbr);`,
      solution: `#include <memory_resource>
#include <vector>

char buf[4096];
std::pmr::monotonic_buffer_resource mbr(buf, sizeof(buf));
std::pmr::vector<int> v(&mbr);`,
      hints: [
        'PMR containers live in the std::pmr namespace.',
        'They take a memory_resource pointer as a constructor argument.',
        'The namespace is `pmr`.',
      ],
      concepts: ['pmr', 'memory-resource'],
    },
    {
      id: 'cpp-alloc-4',
      title: 'operator new for raw allocation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the global allocation function used by custom allocators.',
      skeleton: `template <typename T>
T* my_allocate(std::size_t n) {
    return static_cast<T*>(::__BLANK__(n * sizeof(T)));
}`,
      solution: `template <typename T>
T* my_allocate(std::size_t n) {
    return static_cast<T*>(::operator new(n * sizeof(T)));
}`,
      hints: [
        'This global function allocates raw uninitialized memory.',
        'It is similar to malloc but integrated with C++ exceptions.',
        'The function is `operator new`.',
      ],
      concepts: ['operator-new', 'raw-allocation'],
    },
    {
      id: 'cpp-alloc-5',
      title: 'monotonic_buffer_resource',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the PMR resource type that allocates from a fixed buffer and never deallocates.',
      skeleton: `#include <memory_resource>

char storage[8192];
std::pmr::__BLANK__ resource(storage, sizeof(storage));`,
      solution: `#include <memory_resource>

char storage[8192];
std::pmr::monotonic_buffer_resource resource(storage, sizeof(storage));`,
      hints: [
        'This resource allocates sequentially from the buffer.',
        'It never reclaims individual allocations.',
        'The type is `monotonic_buffer_resource`.',
      ],
      concepts: ['monotonic-buffer', 'pmr'],
    },
    {
      id: 'cpp-alloc-6',
      title: 'Deallocate with operator delete',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the deallocation function that pairs with ::operator new.',
      skeleton: `template <typename T>
void my_deallocate(T* p, std::size_t) {
    ::__BLANK__(p);
}`,
      solution: `template <typename T>
void my_deallocate(T* p, std::size_t) {
    ::operator delete(p);
}`,
      hints: [
        'This pairs with ::operator new for raw memory deallocation.',
        'It does not call destructors -- just returns memory.',
        'The function is `operator delete`.',
      ],
      concepts: ['operator-delete', 'raw-deallocation'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-alloc-7',
      title: 'Minimal allocator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a minimal allocator that meets the C++17 requirements: value_type, allocate(), deallocate(), and a converting constructor template.',
      skeleton: `#include <cstddef>

template <typename T>
class MinAlloc {
public:
    // TODO: value_type, allocate, deallocate, converting ctor
};

// Should work: std::vector<int, MinAlloc<int>> v;`,
      solution: `#include <cstddef>

template <typename T>
class MinAlloc {
public:
    using value_type = T;

    MinAlloc() = default;

    template <typename U>
    MinAlloc(const MinAlloc<U>&) noexcept {}

    T* allocate(std::size_t n) {
        return static_cast<T*>(::operator new(n * sizeof(T)));
    }

    void deallocate(T* p, std::size_t) noexcept {
        ::operator delete(p);
    }
};

template <typename T, typename U>
bool operator==(const MinAlloc<T>&, const MinAlloc<U>&) { return true; }

template <typename T, typename U>
bool operator!=(const MinAlloc<T>&, const MinAlloc<U>&) { return false; }`,
      hints: [
        'Minimum requirements: value_type, allocate(n), deallocate(p, n).',
        'Add a converting constructor template for rebinding.',
        'Stateless allocators compare equal.',
      ],
      concepts: ['allocator-interface', 'stateless-allocator'],
    },
    {
      id: 'cpp-alloc-8',
      title: 'Arena allocator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write an Arena class that allocates from a fixed-size buffer. alloc(size) returns a pointer, reset() resets to the beginning. Handle alignment.',
      skeleton: `#include <cstddef>
#include <cstdint>

class Arena {
    char* buffer_;
    std::size_t capacity_;
    std::size_t offset_ = 0;
public:
    Arena(char* buf, std::size_t cap) : buffer_(buf), capacity_(cap) {}
    void* alloc(std::size_t size, std::size_t align = alignof(std::max_align_t)) {
        // TODO: align offset, allocate, return pointer or nullptr
    }
    void reset() {
        // TODO
    }
};`,
      solution: `#include <cstddef>
#include <cstdint>

class Arena {
    char* buffer_;
    std::size_t capacity_;
    std::size_t offset_ = 0;
public:
    Arena(char* buf, std::size_t cap) : buffer_(buf), capacity_(cap) {}
    void* alloc(std::size_t size, std::size_t align = alignof(std::max_align_t)) {
        std::size_t aligned = (offset_ + align - 1) & ~(align - 1);
        if (aligned + size > capacity_) return nullptr;
        void* p = buffer_ + aligned;
        offset_ = aligned + size;
        return p;
    }
    void reset() {
        offset_ = 0;
    }
};`,
      hints: [
        'Align offset by rounding up: (offset + align - 1) & ~(align - 1).',
        'Check that aligned + size does not exceed capacity.',
        'reset() just sets offset_ back to 0.',
      ],
      concepts: ['arena-allocator', 'alignment', 'bump-allocator'],
    },
    {
      id: 'cpp-alloc-9',
      title: 'Pool allocator (fixed-size blocks)',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a PoolAllocator that manages fixed-size blocks using a free list. Provide alloc() and free() methods.',
      skeleton: `#include <cstddef>

class PoolAllocator {
    struct Block { Block* next; };
    Block* free_list_ = nullptr;
    char* memory_;
    std::size_t block_size_;
    std::size_t count_;
public:
    PoolAllocator(std::size_t block_size, std::size_t count) {
        // TODO: allocate memory, build free list
    }
    ~PoolAllocator() { /* TODO */ }
    void* alloc() { /* TODO */ }
    void free(void* p) { /* TODO */ }
};`,
      solution: `#include <cstddef>
#include <cstdlib>

class PoolAllocator {
    struct Block { Block* next; };
    Block* free_list_ = nullptr;
    char* memory_;
    std::size_t block_size_;
    std::size_t count_;
public:
    PoolAllocator(std::size_t block_size, std::size_t count)
        : block_size_(block_size < sizeof(Block) ? sizeof(Block) : block_size),
          count_(count) {
        memory_ = static_cast<char*>(std::malloc(block_size_ * count_));
        for (std::size_t i = 0; i < count_; ++i) {
            auto* block = reinterpret_cast<Block*>(memory_ + i * block_size_);
            block->next = free_list_;
            free_list_ = block;
        }
    }
    ~PoolAllocator() { std::free(memory_); }
    void* alloc() {
        if (!free_list_) return nullptr;
        Block* block = free_list_;
        free_list_ = block->next;
        return block;
    }
    void free(void* p) {
        if (!p) return;
        auto* block = static_cast<Block*>(p);
        block->next = free_list_;
        free_list_ = block;
    }
};`,
      hints: [
        'Build a free list by chaining Block pointers through the allocated memory.',
        'alloc() pops from the free list, free() pushes back.',
        'Ensure block_size_ >= sizeof(Block) so the next pointer fits.',
      ],
      concepts: ['pool-allocator', 'free-list', 'fixed-size-blocks'],
    },
    {
      id: 'cpp-alloc-10',
      title: 'PMR vector usage',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that creates a pmr::vector<int> backed by a stack buffer using monotonic_buffer_resource, fills it with numbers 1 to n, and returns the sum.',
      skeleton: `#include <memory_resource>
#include <vector>
#include <numeric>

int stack_sum(int n) {
    // TODO: stack buffer, monotonic_buffer_resource, pmr::vector
    // fill with 1..n, return sum
}`,
      solution: `#include <memory_resource>
#include <vector>
#include <numeric>

int stack_sum(int n) {
    char buf[4096];
    std::pmr::monotonic_buffer_resource mbr(buf, sizeof(buf));
    std::pmr::vector<int> v(&mbr);
    v.reserve(n);
    for (int i = 1; i <= n; ++i) v.push_back(i);
    return std::accumulate(v.begin(), v.end(), 0);
}`,
      hints: [
        'Create a stack-allocated char array as the buffer.',
        'Pass it to monotonic_buffer_resource.',
        'Create a pmr::vector with a pointer to the resource.',
      ],
      concepts: ['pmr', 'monotonic-buffer', 'stack-allocation'],
    },
    {
      id: 'cpp-alloc-11',
      title: 'Allocator-aware container',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that creates a std::list<int> using a custom stateless allocator.',
      skeleton: `#include <list>
#include <cstddef>

template <typename T>
struct LogAlloc {
    using value_type = T;
    LogAlloc() = default;
    template <typename U> LogAlloc(const LogAlloc<U>&) {}
    T* allocate(std::size_t n) {
        return static_cast<T*>(::operator new(n * sizeof(T)));
    }
    void deallocate(T* p, std::size_t) { ::operator delete(p); }
};

template <typename T, typename U>
bool operator==(const LogAlloc<T>&, const LogAlloc<U>&) { return true; }
template <typename T, typename U>
bool operator!=(const LogAlloc<T>&, const LogAlloc<U>&) { return false; }

// TODO: write make_log_list() returning list<int, LogAlloc<int>>`,
      solution: `#include <list>
#include <cstddef>

template <typename T>
struct LogAlloc {
    using value_type = T;
    LogAlloc() = default;
    template <typename U> LogAlloc(const LogAlloc<U>&) {}
    T* allocate(std::size_t n) {
        return static_cast<T*>(::operator new(n * sizeof(T)));
    }
    void deallocate(T* p, std::size_t) { ::operator delete(p); }
};

template <typename T, typename U>
bool operator==(const LogAlloc<T>&, const LogAlloc<U>&) { return true; }
template <typename T, typename U>
bool operator!=(const LogAlloc<T>&, const LogAlloc<U>&) { return false; }

std::list<int, LogAlloc<int>> make_log_list() {
    std::list<int, LogAlloc<int>> lst;
    lst.push_back(1);
    lst.push_back(2);
    lst.push_back(3);
    return lst;
}`,
      hints: [
        'Pass the allocator as the second template argument to std::list.',
        'The allocator is default-constructible so no need to pass one explicitly.',
        'std::list uses rebinding internally to allocate nodes, not just ints.',
      ],
      concepts: ['allocator-aware', 'std-list', 'rebinding'],
    },
    {
      id: 'cpp-alloc-12',
      title: 'Aligned allocation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function aligned_alloc(size, alignment) that allocates memory with the specified alignment and returns the pointer. Write a corresponding aligned_free.',
      skeleton: `#include <cstddef>
#include <cstdlib>

void* aligned_alloc_impl(std::size_t size, std::size_t alignment) {
    // TODO: allocate with alignment
}

void aligned_free_impl(void* p) {
    // TODO: free aligned memory
}`,
      solution: `#include <cstddef>
#include <cstdlib>
#include <new>

void* aligned_alloc_impl(std::size_t size, std::size_t alignment) {
    return ::operator new(size, std::align_val_t{alignment});
}

void aligned_free_impl(void* p) {
    ::operator delete(p);
}`,
      hints: [
        'C++17 provides aligned operator new with std::align_val_t.',
        'Alternatively, use std::aligned_alloc (C11) but it requires size to be a multiple of alignment.',
        'Use ::operator new(size, std::align_val_t{alignment}).',
      ],
      concepts: ['aligned-allocation', 'operator-new', 'alignment'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-alloc-13',
      title: 'Fix allocator missing converting constructor',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the allocator that fails with std::list because it cannot rebind to the node type.',
      skeleton: `#include <list>
#include <cstddef>

template <typename T>
struct BadAlloc {
    using value_type = T;
    // BUG: no converting constructor -- rebind fails
    T* allocate(std::size_t n) {
        return static_cast<T*>(::operator new(n * sizeof(T)));
    }
    void deallocate(T* p, std::size_t) { ::operator delete(p); }
};

// std::list<int, BadAlloc<int>> lst;  // fails to compile`,
      solution: `#include <list>
#include <cstddef>

template <typename T>
struct BadAlloc {
    using value_type = T;
    BadAlloc() = default;
    template <typename U>
    BadAlloc(const BadAlloc<U>&) noexcept {}
    T* allocate(std::size_t n) {
        return static_cast<T*>(::operator new(n * sizeof(T)));
    }
    void deallocate(T* p, std::size_t) { ::operator delete(p); }
};

template <typename T, typename U>
bool operator==(const BadAlloc<T>&, const BadAlloc<U>&) { return true; }
template <typename T, typename U>
bool operator!=(const BadAlloc<T>&, const BadAlloc<U>&) { return false; }`,
      hints: [
        'std::list allocates nodes, not raw T values. It rebinds the allocator.',
        'Add a converting constructor: template<typename U> BadAlloc(const BadAlloc<U>&).',
        'Also add equality operators.',
      ],
      concepts: ['allocator-rebinding', 'converting-constructor'],
    },
    {
      id: 'cpp-alloc-14',
      title: 'Fix arena allocator alignment',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fix the arena allocator that returns misaligned pointers.',
      skeleton: `class Arena {
    char* buf_;
    std::size_t cap_, off_ = 0;
public:
    Arena(char* b, std::size_t c) : buf_(b), cap_(c) {}
    void* alloc(std::size_t size) {
        // BUG: no alignment -- returns misaligned pointers
        if (off_ + size > cap_) return nullptr;
        void* p = buf_ + off_;
        off_ += size;
        return p;
    }
};`,
      solution: `#include <cstddef>

class Arena {
    char* buf_;
    std::size_t cap_, off_ = 0;
public:
    Arena(char* b, std::size_t c) : buf_(b), cap_(c) {}
    void* alloc(std::size_t size, std::size_t align = alignof(std::max_align_t)) {
        std::size_t aligned = (off_ + align - 1) & ~(align - 1);
        if (aligned + size > cap_) return nullptr;
        void* p = buf_ + aligned;
        off_ = aligned + size;
        return p;
    }
};`,
      hints: [
        'Returning buf_ + off_ without alignment can cause UB for types with alignment requirements.',
        'Round off_ up to the next multiple of the required alignment.',
        'Use the formula: (off + align - 1) & ~(align - 1).',
      ],
      concepts: ['alignment', 'arena-allocator', 'undefined-behavior'],
    },
    {
      id: 'cpp-alloc-15',
      title: 'Fix PMR missing upstream resource',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the monotonic_buffer_resource that throws when the buffer is exhausted because no upstream resource is provided.',
      skeleton: `#include <memory_resource>
#include <vector>

void process() {
    char tiny[16];
    std::pmr::monotonic_buffer_resource mbr(tiny, sizeof(tiny),
        std::pmr::null_memory_resource());
    // BUG: null_memory_resource throws when buffer is exhausted
    std::pmr::vector<int> v(&mbr);
    for (int i = 0; i < 1000; ++i) v.push_back(i);  // throws
}`,
      solution: `#include <memory_resource>
#include <vector>

void process() {
    char tiny[16];
    std::pmr::monotonic_buffer_resource mbr(tiny, sizeof(tiny),
        std::pmr::new_delete_resource());
    std::pmr::vector<int> v(&mbr);
    for (int i = 0; i < 1000; ++i) v.push_back(i);  // falls back to heap
}`,
      hints: [
        'null_memory_resource() always throws bad_alloc -- it is a dead end.',
        'Use new_delete_resource() as the upstream so it falls back to the heap.',
        'This is the default upstream if you do not specify one.',
      ],
      concepts: ['pmr', 'upstream-resource', 'new-delete-resource'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-alloc-16',
      title: 'Predict arena allocation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print? (Assume no alignment padding.)',
      skeleton: `#include <iostream>

char buf[100];
size_t off = 0;

void* bump(size_t n) {
    void* p = buf + off;
    off += n;
    return p;
}

int main() {
    void* a = bump(10);
    void* b = bump(20);
    std::cout << (static_cast<char*>(b) - static_cast<char*>(a)) << std::endl;
}`,
      solution: `10`,
      hints: [
        'First allocation: a = buf + 0, offset becomes 10.',
        'Second allocation: b = buf + 10, offset becomes 30.',
        'b - a = 10.',
      ],
      concepts: ['arena-allocator', 'pointer-arithmetic'],
    },
    {
      id: 'cpp-alloc-17',
      title: 'Predict pool alloc/free',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    int* a = new int(10);
    int* b = new int(20);
    std::cout << *a << " " << *b << std::endl;
    delete a;
    delete b;
}`,
      solution: `10 20`,
      hints: [
        '*a is 10, *b is 20.',
        'Standard new/delete allocates on the heap.',
        'Output: 10 20.',
      ],
      concepts: ['new-delete', 'heap-allocation'],
    },
    {
      id: 'cpp-alloc-18',
      title: 'Predict PMR stack usage',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Does this vector allocate on the heap?',
      skeleton: `#include <memory_resource>
#include <vector>
#include <iostream>

int main() {
    char buf[256];
    std::pmr::monotonic_buffer_resource mbr(buf, sizeof(buf),
        std::pmr::null_memory_resource());
    std::pmr::vector<int> v(&mbr);
    v.push_back(42);
    std::cout << (v[0] == 42 ? "stack" : "heap") << std::endl;
}`,
      solution: `stack`,
      hints: [
        'The monotonic_buffer_resource uses the stack buffer first.',
        '256 bytes is plenty for one int.',
        'No heap allocation occurs; output is "stack".',
      ],
      concepts: ['pmr', 'stack-allocation', 'monotonic-buffer'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-alloc-19',
      title: 'Refactor heap vector to PMR stack vector',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Replace the heap-allocated vector with a PMR vector backed by a stack buffer for a small, bounded workload.',
      skeleton: `#include <vector>
#include <numeric>

int compute() {
    std::vector<int> data;
    for (int i = 0; i < 100; ++i) data.push_back(i);
    return std::accumulate(data.begin(), data.end(), 0);
}`,
      solution: `#include <memory_resource>
#include <vector>
#include <numeric>

int compute() {
    char buf[1024];
    std::pmr::monotonic_buffer_resource mbr(buf, sizeof(buf));
    std::pmr::vector<int> data(&mbr);
    data.reserve(100);
    for (int i = 0; i < 100; ++i) data.push_back(i);
    return std::accumulate(data.begin(), data.end(), 0);
}`,
      hints: [
        'For small, bounded allocations, a stack buffer avoids heap overhead.',
        'Use monotonic_buffer_resource with a char array on the stack.',
        'Create a pmr::vector using the resource.',
      ],
      concepts: ['pmr', 'stack-allocation', 'performance'],
    },
    {
      id: 'cpp-alloc-20',
      title: 'Refactor raw malloc to allocator class',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Replace raw malloc/free calls with a proper C++ allocator that can be used with standard containers.',
      skeleton: `#include <cstdlib>

int* make_array(int n) {
    int* p = static_cast<int*>(std::malloc(n * sizeof(int)));
    for (int i = 0; i < n; ++i) p[i] = i;
    return p;
}

void free_array(int* p) {
    std::free(p);
}`,
      solution: `#include <vector>
#include <memory>

std::vector<int> make_array(int n) {
    std::vector<int> v;
    v.reserve(n);
    for (int i = 0; i < n; ++i) v.push_back(i);
    return v;
}
// No manual free needed -- vector manages its own memory`,
      hints: [
        'Raw malloc/free is C-style and error-prone.',
        'Use std::vector which manages allocation through its allocator.',
        'Vector destructor handles deallocation automatically.',
      ],
      concepts: ['raii', 'vector', 'malloc-replacement'],
    },
  ],
};
