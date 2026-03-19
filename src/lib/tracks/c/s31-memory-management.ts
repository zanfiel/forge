import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-memman',
  title: '31. Memory Management',
  explanation: `## Advanced Memory Management

Beyond basic malloc/free, understanding memory layout, alignment, custom allocators, and common pitfalls is essential for robust C programs.

\`\`\`c
// Memory layout (low to high):
// Text -> Data -> BSS -> Heap (grows up) -> ... -> Stack (grows down)

// Alignment
struct aligned {
    char c;     // 1 byte + 3 padding
    int i;      // 4 bytes, aligned to 4
};  // sizeof = 8
\`\`\`

### Key Concepts
- **Memory layout**: text, data, BSS, heap, stack segments
- **Alignment**: data types have natural alignment requirements
- **Arena allocator**: allocate from a pre-allocated block
- **Memory pools**: fixed-size block allocators
- **Valgrind**: detect leaks, use-after-free, uninitialized reads
`,
  exercises: [
    {
      id: 'c-memman-1',
      title: 'Struct padding',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the size of structs with padding.',
      skeleton: `#include <stdio.h>

struct A { char c; int i; };
struct B { int i; char c; };
struct C { char a; char b; int i; };

int main(void) {
    printf("A=%zu B=%zu C=%zu\\n", sizeof(struct A), sizeof(struct B), sizeof(struct C));
    return 0;
}`,
      solution: `#include <stdio.h>

struct A { char c; int i; };
struct B { int i; char c; };
struct C { char a; char b; int i; };

int main(void) {
    printf("A=%zu B=%zu C=%zu\\n", sizeof(struct A), sizeof(struct B), sizeof(struct C));
    return 0;
}
// Output: A=8 B=8 C=8`,
      hints: [
        'int requires 4-byte alignment, so padding is inserted after char.',
        'struct A: 1 char + 3 padding + 4 int = 8.',
        'struct B: 4 int + 1 char + 3 tail padding = 8. struct C: 1+1+2pad+4 = 8.',
      ],
      concepts: ['struct padding', 'alignment', 'sizeof'],
    },
    {
      id: 'c-memman-2',
      title: 'Arena allocator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Implement a simple arena (bump) allocator.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *buf;
    size_t capacity;
    size_t offset;
} Arena;

// Write Arena arena_create(size_t capacity)
// Write void *arena_alloc(Arena *a, size_t size)
// Write void arena_destroy(Arena *a)

int main(void) {
    Arena a = arena_create(1024);
    int *x = arena_alloc(&a, sizeof(int));
    int *y = arena_alloc(&a, sizeof(int));
    *x = 42; *y = 99;
    printf("%d %d\\n", *x, *y);
    arena_destroy(&a);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *buf;
    size_t capacity;
    size_t offset;
} Arena;

Arena arena_create(size_t capacity) {
    Arena a;
    a.buf = malloc(capacity);
    a.capacity = capacity;
    a.offset = 0;
    return a;
}

void *arena_alloc(Arena *a, size_t size) {
    if (a->offset + size > a->capacity) return NULL;
    void *ptr = a->buf + a->offset;
    a->offset += size;
    return ptr;
}

void arena_destroy(Arena *a) {
    free(a->buf);
    a->buf = NULL;
    a->capacity = 0;
    a->offset = 0;
}

int main(void) {
    Arena a = arena_create(1024);
    int *x = arena_alloc(&a, sizeof(int));
    int *y = arena_alloc(&a, sizeof(int));
    *x = 42; *y = 99;
    printf("%d %d\\n", *x, *y);
    arena_destroy(&a);
    return 0;
}`,
      hints: [
        'arena_create: malloc a single block of given capacity.',
        'arena_alloc: return pointer at current offset, bump offset by size.',
        'arena_destroy: free the entire block at once.',
      ],
      concepts: ['arena allocator', 'bump allocation', 'memory pool'],
    },
    {
      id: 'c-memman-3',
      title: 'Detect double free',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete the pattern to safely free and nullify a pointer.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

void safe_free(void **ptr) {
    if (*ptr != __BLANK__) {
        free(__BLANK__);
        *ptr = __BLANK__;
    }
}

int main(void) {
    int *p = malloc(sizeof(int));
    *p = 42;
    safe_free((void **)&p);
    safe_free((void **)&p);  // safe: no double free
    printf("p is %s\\n", p ? "not null" : "null");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

void safe_free(void **ptr) {
    if (*ptr != NULL) {
        free(*ptr);
        *ptr = NULL;
    }
}

int main(void) {
    int *p = malloc(sizeof(int));
    *p = 42;
    safe_free((void **)&p);
    safe_free((void **)&p);  // safe: no double free
    printf("p is %s\\n", p ? "not null" : "null");
    return 0;
}`,
      hints: [
        'Check if *ptr != NULL before freeing.',
        'Free the actual pointer: free(*ptr).',
        'Set *ptr = NULL to prevent double free.',
      ],
      concepts: ['double free', 'null check', 'safe free'],
    },
    {
      id: 'c-memman-4',
      title: 'Aligned allocation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete a function that allocates memory aligned to a power-of-two boundary.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

void *aligned_alloc_manual(size_t alignment, size_t size) {
    void *raw = malloc(size + alignment - 1 + sizeof(void *));
    if (!raw) return NULL;
    uintptr_t addr = (uintptr_t)raw + sizeof(void *);
    uintptr_t aligned = (addr + alignment - 1) & ~(__BLANK__);
    ((void **)aligned)[-1] = __BLANK__;
    return (void *)__BLANK__;
}

void aligned_free(void *ptr) {
    if (ptr) free(((void **)ptr)[-1]);
}

int main(void) {
    int *p = aligned_alloc_manual(64, 256);
    printf("aligned: %d\\n", ((uintptr_t)p % 64) == 0);
    aligned_free(p);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

void *aligned_alloc_manual(size_t alignment, size_t size) {
    void *raw = malloc(size + alignment - 1 + sizeof(void *));
    if (!raw) return NULL;
    uintptr_t addr = (uintptr_t)raw + sizeof(void *);
    uintptr_t aligned = (addr + alignment - 1) & ~(alignment - 1);
    ((void **)aligned)[-1] = raw;
    return (void *)aligned;
}

void aligned_free(void *ptr) {
    if (ptr) free(((void **)ptr)[-1]);
}

int main(void) {
    int *p = aligned_alloc_manual(64, 256);
    printf("aligned: %d\\n", ((uintptr_t)p % 64) == 0);
    aligned_free(p);
    return 0;
}`,
      hints: [
        'Mask: ~(alignment - 1) clears lower bits to align upward.',
        'Store the original raw pointer just before the aligned address.',
        'Return the aligned address.',
      ],
      concepts: ['aligned allocation', 'bitwise masking', 'manual alignment'],
    },
    {
      id: 'c-memman-5',
      title: 'Memory pool allocator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Implement a fixed-size memory pool allocator.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Pool {
    char *memory;
    int *free_list;
    size_t block_size;
    int capacity;
    int free_head;
} Pool;

// Write Pool pool_create(size_t block_size, int capacity)
// Write void *pool_alloc(Pool *p)
// Write void pool_free(Pool *p, void *ptr)
// Write void pool_destroy(Pool *p)

int main(void) {
    Pool p = pool_create(sizeof(int), 4);
    int *a = pool_alloc(&p);
    int *b = pool_alloc(&p);
    *a = 10; *b = 20;
    printf("%d %d\\n", *a, *b);
    pool_free(&p, a);
    int *c = pool_alloc(&p);
    *c = 30;
    printf("%d\\n", *c);
    pool_destroy(&p);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Pool {
    char *memory;
    int *free_list;
    size_t block_size;
    int capacity;
    int free_head;
} Pool;

Pool pool_create(size_t block_size, int capacity) {
    Pool p;
    p.block_size = block_size;
    p.capacity = capacity;
    p.memory = malloc(block_size * capacity);
    p.free_list = malloc(capacity * sizeof(int));
    for (int i = 0; i < capacity - 1; i++) p.free_list[i] = i + 1;
    p.free_list[capacity - 1] = -1;
    p.free_head = 0;
    return p;
}

void *pool_alloc(Pool *p) {
    if (p->free_head == -1) return NULL;
    int idx = p->free_head;
    p->free_head = p->free_list[idx];
    return p->memory + idx * p->block_size;
}

void pool_free(Pool *p, void *ptr) {
    int idx = (int)((char *)ptr - p->memory) / (int)p->block_size;
    p->free_list[idx] = p->free_head;
    p->free_head = idx;
}

void pool_destroy(Pool *p) {
    free(p->memory);
    free(p->free_list);
}

int main(void) {
    Pool p = pool_create(sizeof(int), 4);
    int *a = pool_alloc(&p);
    int *b = pool_alloc(&p);
    *a = 10; *b = 20;
    printf("%d %d\\n", *a, *b);
    pool_free(&p, a);
    int *c = pool_alloc(&p);
    *c = 30;
    printf("%d\\n", *c);
    pool_destroy(&p);
    return 0;
}`,
      hints: [
        'Use a free list as an implicit linked list via indices.',
        'pool_alloc: pop from free list head, return corresponding block.',
        'pool_free: push block index back onto free list head.',
      ],
      concepts: ['memory pool', 'free list', 'fixed-size allocator'],
    },
    {
      id: 'c-memman-6',
      title: 'Detect memory leak',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the memory leak in this function.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *make_greeting(const char *name) {
    char *buf = malloc(64);
    snprintf(buf, 64, "Hello, %s!", name);
    return buf;
}

int main(void) {
    for (int i = 0; i < 5; i++) {
        char *msg = make_greeting("World");
        printf("%s\\n", msg);
        // BUG: missing free(msg) -- leaks 64 bytes each iteration
    }
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *make_greeting(const char *name) {
    char *buf = malloc(64);
    snprintf(buf, 64, "Hello, %s!", name);
    return buf;
}

int main(void) {
    for (int i = 0; i < 5; i++) {
        char *msg = make_greeting("World");
        printf("%s\\n", msg);
        free(msg);
    }
    return 0;
}`,
      hints: [
        'make_greeting allocates memory that the caller must free.',
        'Each iteration leaks 64 bytes without a matching free.',
        'Add free(msg) after each use.',
      ],
      concepts: ['memory leak', 'ownership', 'caller frees'],
    },
    {
      id: 'c-memman-7',
      title: 'realloc growing array',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete a dynamic array that grows with realloc.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;
    int size;
    int capacity;
} DynArray;

void da_push(DynArray *da, int value) {
    if (da->size == da->__BLANK__) {
        da->capacity = da->capacity ? da->capacity * 2 : __BLANK__;
        da->data = realloc(da->data, da->capacity * sizeof(__BLANK__));
    }
    da->data[da->size++] = value;
}

int main(void) {
    DynArray da = {NULL, 0, 0};
    for (int i = 0; i < 10; i++) da_push(&da, i * i);
    for (int i = 0; i < da.size; i++) printf("%d ", da.data[i]);
    printf("\\ncap=%d\\n", da.capacity);
    free(da.data);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;
    int size;
    int capacity;
} DynArray;

void da_push(DynArray *da, int value) {
    if (da->size == da->capacity) {
        da->capacity = da->capacity ? da->capacity * 2 : 4;
        da->data = realloc(da->data, da->capacity * sizeof(int));
    }
    da->data[da->size++] = value;
}

int main(void) {
    DynArray da = {NULL, 0, 0};
    for (int i = 0; i < 10; i++) da_push(&da, i * i);
    for (int i = 0; i < da.size; i++) printf("%d ", da.data[i]);
    printf("\\ncap=%d\\n", da.capacity);
    free(da.data);
    return 0;
}`,
      hints: [
        'Grow when size equals capacity.',
        'Initial capacity 4 (or any small power of 2), then double.',
        'realloc with capacity * sizeof(int).',
      ],
      concepts: ['realloc', 'dynamic array', 'amortized growth'],
    },
    {
      id: 'c-memman-8',
      title: 'Use-after-free detection',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the use-after-free bug.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *p = malloc(sizeof(int));
    *p = 42;
    free(p);
    printf("value: %d\\n", *p);  // BUG: use after free
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *p = malloc(sizeof(int));
    *p = 42;
    int value = *p;
    free(p);
    p = NULL;
    printf("value: %d\\n", value);
    return 0;
}`,
      hints: [
        'Reading *p after free is undefined behavior.',
        'Save the value before freeing.',
        'Set p = NULL after free to catch accidental reuse.',
      ],
      concepts: ['use-after-free', 'undefined behavior', 'null after free'],
    },
    {
      id: 'c-memman-9',
      title: 'Predict stack vs heap',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict which variables are on stack vs heap.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

int global = 10;

int main(void) {
    int local = 20;
    int *heap = malloc(sizeof(int));
    *heap = 30;
    static int stat = 40;

    printf("global=%p local=%p heap=%p static=%p\\n",
           (void *)&global, (void *)&local, (void *)heap, (void *)&stat);

    // Which is on the stack? Which on the heap? Which in data segment?
    printf("heap > local: %d\\n", (char *)heap > (char *)&local ? 0 : 1);
    free(heap);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int global = 10;

int main(void) {
    int local = 20;
    int *heap = malloc(sizeof(int));
    *heap = 30;
    static int stat = 40;

    printf("global=%p local=%p heap=%p static=%p\\n",
           (void *)&global, (void *)&local, (void *)heap, (void *)&stat);

    printf("heap > local: %d\\n", (char *)heap > (char *)&local ? 0 : 1);
    free(heap);
    return 0;
}
// Output: addresses vary; heap > local comparison is platform-dependent
// global and stat are in data segment, local is on stack, *heap is on heap`,
      hints: [
        'global and static variables are in the data segment.',
        'local is on the stack.',
        '*heap points to heap memory. Stack is typically at high addresses.',
      ],
      concepts: ['memory layout', 'stack vs heap', 'data segment'],
    },
    {
      id: 'c-memman-10',
      title: 'Flexible array member',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete a struct with a flexible array member.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int count;
    int data[];  // flexible array member
} IntArray;

IntArray *create_array(int n) {
    IntArray *arr = malloc(sizeof(IntArray) + n * sizeof(__BLANK__));
    arr->__BLANK__ = n;
    for (int i = 0; i < n; i++) arr->data[i] = i * __BLANK__;
    return arr;
}

int main(void) {
    IntArray *arr = create_array(5);
    for (int i = 0; i < arr->count; i++) printf("%d ", arr->data[i]);
    printf("\\n");
    free(arr);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int count;
    int data[];  // flexible array member
} IntArray;

IntArray *create_array(int n) {
    IntArray *arr = malloc(sizeof(IntArray) + n * sizeof(int));
    arr->count = n;
    for (int i = 0; i < n; i++) arr->data[i] = i * 10;
    return arr;
}

int main(void) {
    IntArray *arr = create_array(5);
    for (int i = 0; i < arr->count; i++) printf("%d ", arr->data[i]);
    printf("\\n");
    free(arr);
    return 0;
}`,
      hints: [
        'Allocate sizeof(IntArray) + n * sizeof(int) for the flex array.',
        'Set arr->count = n to track the size.',
        'Fill data with any pattern; here i * 10.',
      ],
      concepts: ['flexible array member', 'variable-size struct', 'C99'],
    },
    {
      id: 'c-memman-11',
      title: 'Stack allocator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Implement a stack-based allocator that supports push/pop allocation.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    char *buf;
    size_t capacity;
    size_t top;
} StackAlloc;

// Write StackAlloc stack_create(size_t cap)
// Write void *stack_push(StackAlloc *s, size_t size)
// Write void stack_pop(StackAlloc *s, size_t size)
// Write void stack_destroy(StackAlloc *s)

int main(void) {
    StackAlloc s = stack_create(256);
    int *a = stack_push(&s, sizeof(int));
    int *b = stack_push(&s, sizeof(int));
    *a = 1; *b = 2;
    printf("%d %d\\n", *a, *b);
    stack_pop(&s, sizeof(int));  // pop b
    printf("top after pop: %zu\\n", s.top);
    stack_destroy(&s);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    char *buf;
    size_t capacity;
    size_t top;
} StackAlloc;

StackAlloc stack_create(size_t cap) {
    StackAlloc s;
    s.buf = malloc(cap);
    s.capacity = cap;
    s.top = 0;
    return s;
}

void *stack_push(StackAlloc *s, size_t size) {
    if (s->top + size > s->capacity) return NULL;
    void *ptr = s->buf + s->top;
    s->top += size;
    return ptr;
}

void stack_pop(StackAlloc *s, size_t size) {
    if (size > s->top) s->top = 0;
    else s->top -= size;
}

void stack_destroy(StackAlloc *s) {
    free(s->buf);
    s->buf = NULL;
    s->capacity = 0;
    s->top = 0;
}

int main(void) {
    StackAlloc s = stack_create(256);
    int *a = stack_push(&s, sizeof(int));
    int *b = stack_push(&s, sizeof(int));
    *a = 1; *b = 2;
    printf("%d %d\\n", *a, *b);
    stack_pop(&s, sizeof(int));
    printf("top after pop: %zu\\n", s.top);
    stack_destroy(&s);
    return 0;
}`,
      hints: [
        'Push: return buf + top, advance top by size.',
        'Pop: decrement top by size (LIFO order required).',
        'Like an arena but supports ordered deallocation.',
      ],
      concepts: ['stack allocator', 'LIFO', 'custom allocator'],
    },
    {
      id: 'c-memman-12',
      title: 'Fix realloc leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the memory leak when realloc fails.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *data = malloc(10 * sizeof(int));
    // BUG: if realloc fails, original pointer is lost
    data = realloc(data, 1000000000UL * sizeof(int));
    if (!data) {
        printf("realloc failed\\n");
        return 1;
    }
    free(data);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *data = malloc(10 * sizeof(int));
    int *tmp = realloc(data, 1000000000UL * sizeof(int));
    if (!tmp) {
        printf("realloc failed\\n");
        free(data);
        return 1;
    }
    data = tmp;
    free(data);
    return 0;
}`,
      hints: [
        'If realloc fails, it returns NULL but the original block is untouched.',
        'Assigning directly to data loses the original pointer if realloc fails.',
        'Use a temporary pointer, check it, then assign.',
      ],
      concepts: ['realloc', 'error handling', 'memory leak'],
    },
    {
      id: 'c-memman-13',
      title: 'Predict sizeof with pointers',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict sizeof for arrays vs pointers.',
      skeleton: `#include <stdio.h>

void func(int arr[]) {
    printf("in func: %zu\\n", sizeof(arr));
}

int main(void) {
    int a[10];
    int *p = a;
    printf("array: %zu\\n", sizeof(a));
    printf("pointer: %zu\\n", sizeof(p));
    func(a);
    return 0;
}`,
      solution: `#include <stdio.h>

void func(int arr[]) {
    printf("in func: %zu\\n", sizeof(arr));
}

int main(void) {
    int a[10];
    int *p = a;
    printf("array: %zu\\n", sizeof(a));
    printf("pointer: %zu\\n", sizeof(p));
    func(a);
    return 0;
}
// Output (64-bit):
// array: 40
// pointer: 8
// in func: 8`,
      hints: [
        'sizeof(a) for a local array gives total bytes: 10 * 4 = 40.',
        'sizeof(p) gives pointer size: 8 on 64-bit.',
        'Array parameters decay to pointers: sizeof(arr) in func = 8.',
      ],
      concepts: ['sizeof', 'array decay', 'pointer size'],
    },
    {
      id: 'c-memman-14',
      title: 'Packed struct',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use pragma pack to eliminate struct padding.',
      skeleton: `#include <stdio.h>

struct Normal { char c; int i; short s; };

#pragma pack(__BLANK__)
struct Packed { char c; int i; short s; };
#pragma pack(__BLANK__)

int main(void) {
    printf("Normal: %zu\\n", sizeof(struct Normal));
    printf("Packed: %zu\\n", sizeof(struct __BLANK__));
    return 0;
}`,
      solution: `#include <stdio.h>

struct Normal { char c; int i; short s; };

#pragma pack(push, 1)
struct Packed { char c; int i; short s; };
#pragma pack(pop)

int main(void) {
    printf("Normal: %zu\\n", sizeof(struct Normal));
    printf("Packed: %zu\\n", sizeof(struct Packed));
    return 0;
}`,
      hints: [
        '#pragma pack(push, 1) sets 1-byte alignment.',
        '#pragma pack(pop) restores previous alignment.',
        'Packed struct has no padding: 1 + 4 + 2 = 7 bytes.',
      ],
      concepts: ['pragma pack', 'struct packing', 'alignment control'],
    },
    {
      id: 'c-memman-15',
      title: 'calloc vs malloc+memset',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write two functions that allocate a zeroed array, one with calloc and one with malloc+memset.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Write int *alloc_zeroed_calloc(int n)
// Write int *alloc_zeroed_manual(int n)

int main(void) {
    int *a = alloc_zeroed_calloc(5);
    int *b = alloc_zeroed_manual(5);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("\\n");
    for (int i = 0; i < 5; i++) printf("%d ", b[i]);
    printf("\\n");
    free(a); free(b);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int *alloc_zeroed_calloc(int n) {
    return calloc(n, sizeof(int));
}

int *alloc_zeroed_manual(int n) {
    int *p = malloc(n * sizeof(int));
    if (p) memset(p, 0, n * sizeof(int));
    return p;
}

int main(void) {
    int *a = alloc_zeroed_calloc(5);
    int *b = alloc_zeroed_manual(5);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("\\n");
    for (int i = 0; i < 5; i++) printf("%d ", b[i]);
    printf("\\n");
    free(a); free(b);
    return 0;
}`,
      hints: [
        'calloc(n, sizeof(int)) allocates and zeros in one call.',
        'malloc + memset achieves the same but in two steps.',
        'calloc may be optimized by the OS for large allocations.',
      ],
      concepts: ['calloc', 'memset', 'zero initialization'],
    },
    {
      id: 'c-memman-16',
      title: 'Refactor to arena',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor code with many small mallocs to use an arena allocator.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

Node *build_list(int n) {
    Node *head = NULL;
    for (int i = n - 1; i >= 0; i--) {
        Node *node = malloc(sizeof(Node));
        node->value = i;
        node->next = head;
        head = node;
    }
    return head;
}

void free_list(Node *head) {
    while (head) { Node *tmp = head; head = head->next; free(tmp); }
}

int main(void) {
    Node *list = build_list(5);
    for (Node *n = list; n; n = n->next) printf("%d ", n->value);
    printf("\\n");
    free_list(list);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *buf;
    size_t capacity;
    size_t offset;
} Arena;

Arena arena_new(size_t cap) {
    Arena a = { malloc(cap), cap, 0 };
    return a;
}

void *arena_alloc(Arena *a, size_t size) {
    if (a->offset + size > a->capacity) return NULL;
    void *p = a->buf + a->offset;
    a->offset += size;
    return p;
}

void arena_free(Arena *a) { free(a->buf); }

typedef struct Node {
    int value;
    struct Node *next;
} Node;

Node *build_list(Arena *a, int n) {
    Node *head = NULL;
    for (int i = n - 1; i >= 0; i--) {
        Node *node = arena_alloc(a, sizeof(Node));
        node->value = i;
        node->next = head;
        head = node;
    }
    return head;
}

int main(void) {
    Arena a = arena_new(4096);
    Node *list = build_list(&a, 5);
    for (Node *n = list; n; n = n->next) printf("%d ", n->value);
    printf("\\n");
    arena_free(&a);
    return 0;
}`,
      hints: [
        'Replace per-node malloc with arena_alloc.',
        'No need for free_list -- arena_free releases everything at once.',
        'Arena is ideal when all allocations share the same lifetime.',
      ],
      concepts: ['arena allocator', 'batch deallocation', 'refactoring'],
    },
    {
      id: 'c-memman-17',
      title: 'Predict realloc behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict what realloc does with a NULL pointer.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *p = NULL;
    p = realloc(p, 3 * sizeof(int));
    p[0] = 10; p[1] = 20; p[2] = 30;

    p = realloc(p, 5 * sizeof(int));
    p[3] = 40; p[4] = 50;

    for (int i = 0; i < 5; i++) printf("%d ", p[i]);
    printf("\\n");
    free(p);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *p = NULL;
    p = realloc(p, 3 * sizeof(int));
    p[0] = 10; p[1] = 20; p[2] = 30;

    p = realloc(p, 5 * sizeof(int));
    p[3] = 40; p[4] = 50;

    for (int i = 0; i < 5; i++) printf("%d ", p[i]);
    printf("\\n");
    free(p);
    return 0;
}
// Output: 10 20 30 40 50`,
      hints: [
        'realloc(NULL, size) is equivalent to malloc(size).',
        'realloc preserves existing data when growing.',
        'First 3 elements (10, 20, 30) survive the realloc to 5.',
      ],
      concepts: ['realloc', 'NULL realloc', 'data preservation'],
    },
    {
      id: 'c-memman-18',
      title: '2D array allocation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write functions to allocate and free a contiguous 2D array.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

// Write int **alloc_2d(int rows, int cols) -- single contiguous block
// Write void free_2d(int **mat)

int main(void) {
    int **mat = alloc_2d(3, 4);
    int val = 0;
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 4; j++)
            mat[i][j] = val++;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) printf("%2d ", mat[i][j]);
        printf("\\n");
    }
    free_2d(mat);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int **alloc_2d(int rows, int cols) {
    int **mat = malloc(rows * sizeof(int *));
    int *data = malloc(rows * cols * sizeof(int));
    for (int i = 0; i < rows; i++)
        mat[i] = data + i * cols;
    return mat;
}

void free_2d(int **mat) {
    free(mat[0]);
    free(mat);
}

int main(void) {
    int **mat = alloc_2d(3, 4);
    int val = 0;
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 4; j++)
            mat[i][j] = val++;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) printf("%2d ", mat[i][j]);
        printf("\\n");
    }
    free_2d(mat);
    return 0;
}`,
      hints: [
        'Allocate one block for row pointers and one contiguous block for data.',
        'Point each row pointer to data + i * cols.',
        'free_2d: free data (mat[0]) and the pointer array (mat).',
      ],
      concepts: ['2D allocation', 'contiguous memory', 'row pointers'],
    },
    {
      id: 'c-memman-19',
      title: 'Refactor to realloc pattern',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor pre-allocated large array to dynamically growing with realloc.',
      skeleton: `#include <stdio.h>

#define MAX 10000

int main(void) {
    int data[MAX];
    int n = 0;
    for (int i = 0; i < 20; i++)
        data[n++] = i * i;
    for (int i = 0; i < n; i++) printf("%d ", data[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *data = NULL;
    int n = 0, cap = 0;
    for (int i = 0; i < 20; i++) {
        if (n == cap) {
            cap = cap ? cap * 2 : 4;
            data = realloc(data, cap * sizeof(int));
        }
        data[n++] = i * i;
    }
    for (int i = 0; i < n; i++) printf("%d ", data[i]);
    printf("\\n");
    free(data);
    return 0;
}`,
      hints: [
        'Replace fixed array with pointer + size + capacity.',
        'Grow with realloc when size == capacity, doubling each time.',
        'Free the memory at the end.',
      ],
      concepts: ['dynamic array', 'realloc', 'amortized O(1)'],
    },
    {
      id: 'c-memman-20',
      title: 'Custom malloc wrapper with tracking',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a malloc wrapper that tracks total allocated bytes.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

// Write void *tracked_malloc(size_t size)
// Write void tracked_free(void *ptr)
// Write size_t tracked_total(void)
// Store size before each allocation to track it

static size_t total_allocated = 0;

int main(void) {
    int *a = tracked_malloc(10 * sizeof(int));
    char *b = tracked_malloc(64);
    printf("Total: %zu bytes\\n", tracked_total());
    tracked_free(a);
    tracked_free(b);
    printf("After free: %zu bytes\\n", tracked_total());
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

static size_t total_allocated = 0;

void *tracked_malloc(size_t size) {
    size_t *block = malloc(sizeof(size_t) + size);
    if (!block) return NULL;
    *block = size;
    total_allocated += size;
    return block + 1;
}

void tracked_free(void *ptr) {
    if (!ptr) return;
    size_t *block = (size_t *)ptr - 1;
    total_allocated -= *block;
    free(block);
}

size_t tracked_total(void) {
    return total_allocated;
}

int main(void) {
    int *a = tracked_malloc(10 * sizeof(int));
    char *b = tracked_malloc(64);
    printf("Total: %zu bytes\\n", tracked_total());
    tracked_free(a);
    tracked_free(b);
    printf("After free: %zu bytes\\n", tracked_total());
    return 0;
}`,
      hints: [
        'Allocate sizeof(size_t) extra bytes to store the size header.',
        'Return pointer past the header: block + 1.',
        'On free, step back to read the size and subtract from total.',
      ],
      concepts: ['malloc wrapper', 'allocation tracking', 'header pattern'],
    },
  ],
};
