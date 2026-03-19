import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-malloc',
  title: '12. Dynamic Memory',
  explanation: `## Dynamic Memory Allocation

C provides functions to allocate and free memory at runtime from the heap.

\`\`\`c
int *p = malloc(10 * sizeof(int));  // allocate 10 ints
if (!p) { /* handle error */ }
p[0] = 42;
free(p);   // release memory
p = NULL;  // avoid dangling pointer
\`\`\`

### Key Functions
- \`malloc(size)\`: allocate uninitialized memory
- \`calloc(count, size)\`: allocate zero-initialized memory
- \`realloc(ptr, new_size)\`: resize an allocation
- \`free(ptr)\`: release memory back to the system

### Common Pitfalls
- Memory leaks: forgetting to free
- Double free: freeing the same pointer twice
- Use after free: accessing freed memory
- Buffer overflow: writing past allocated size
`,
  exercises: [
    {
      id: 'c-malloc-1',
      title: 'Basic malloc',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Allocate memory with malloc and free it properly.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *arr = __BLANK__(5 * sizeof(int));
    if (!arr) {
        fprintf(stderr, "Allocation failed\\n");
        return 1;
    }
    for (int i = 0; i < 5; i++) arr[i] = i * 10;
    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);
    printf("\\n");
    __BLANK__(arr);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *arr = malloc(5 * sizeof(int));
    if (!arr) {
        fprintf(stderr, "Allocation failed\\n");
        return 1;
    }
    for (int i = 0; i < 5; i++) arr[i] = i * 10;
    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);
    printf("\\n");
    free(arr);
    return 0;
}`,
      hints: [
        'malloc allocates the specified number of bytes.',
        'Always check if malloc returns NULL.',
        'free releases the allocated memory.',
      ],
      concepts: ['malloc', 'free', 'heap allocation'],
    },
    {
      id: 'c-malloc-2',
      title: 'Calloc for zeroed memory',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use calloc to allocate zero-initialized memory.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *arr = __BLANK__(10, __BLANK__);
    if (!arr) return 1;
    // All elements are guaranteed to be 0
    for (int i = 0; i < 10; i++) printf("%d ", arr[i]);
    printf("\\n");
    free(arr);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *arr = calloc(10, sizeof(int));
    if (!arr) return 1;
    // All elements are guaranteed to be 0
    for (int i = 0; i < 10; i++) printf("%d ", arr[i]);
    printf("\\n");
    free(arr);
    return 0;
}`,
      hints: [
        'calloc takes count and size as separate arguments.',
        'calloc(10, sizeof(int)) allocates 10 ints, all zeroed.',
        'Unlike malloc, calloc initializes memory to zero.',
      ],
      concepts: ['calloc', 'zero initialization', 'count and size'],
    },
    {
      id: 'c-malloc-3',
      title: 'Realloc to grow array',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use realloc to dynamically grow an array.',
      skeleton: `// Write a program that:
// 1. Allocates space for 3 ints
// 2. Fills with {10, 20, 30}
// 3. Reallocs to hold 5 ints
// 4. Adds {40, 50}
// 5. Prints all 5 and frees`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *arr = malloc(3 * sizeof(int));
    if (!arr) return 1;
    arr[0] = 10; arr[1] = 20; arr[2] = 30;

    int *temp = realloc(arr, 5 * sizeof(int));
    if (!temp) { free(arr); return 1; }
    arr = temp;

    arr[3] = 40;
    arr[4] = 50;

    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);
    printf("\\n");
    free(arr);
    return 0;
}`,
      hints: [
        'Use a temporary pointer for realloc to avoid losing the original on failure.',
        'realloc preserves existing data when growing.',
        'If realloc fails, the original pointer is still valid.',
      ],
      concepts: ['realloc', 'safe realloc pattern', 'growing arrays'],
    },
    {
      id: 'c-malloc-4',
      title: 'Predict memory behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output of calloc vs malloc behavior.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *a = calloc(3, sizeof(int));
    printf("%d %d %d\\n", a[0], a[1], a[2]);

    a[0] = 5; a[1] = 10; a[2] = 15;
    int *b = realloc(a, 5 * sizeof(int));
    printf("%d %d %d\\n", b[0], b[1], b[2]);
    free(b);
    return 0;
}`,
      solution: `0 0 0
5 10 15`,
      hints: [
        'calloc zeros all memory, so a[0..2] are all 0.',
        'realloc preserves existing data.',
        'b inherits the values from a.',
      ],
      concepts: ['calloc zeroing', 'realloc preservation', 'predict output'],
    },
    {
      id: 'c-malloc-5',
      title: 'Fix memory leak',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the memory leak in this function.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *create_greeting(const char *name) {
    char *greeting = malloc(100);
    if (!greeting) return NULL;
    snprintf(greeting, 100, "Hello, %s!", name);
    return greeting;
}

int main(void) {
    printf("%s\\n", create_greeting("Alice"));  // Bug: leaked!
    printf("%s\\n", create_greeting("Bob"));    // Bug: leaked!
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *create_greeting(const char *name) {
    char *greeting = malloc(100);
    if (!greeting) return NULL;
    snprintf(greeting, 100, "Hello, %s!", name);
    return greeting;
}

int main(void) {
    char *g1 = create_greeting("Alice");
    printf("%s\\n", g1);
    free(g1);

    char *g2 = create_greeting("Bob");
    printf("%s\\n", g2);
    free(g2);
    return 0;
}`,
      hints: [
        'The return value of create_greeting is never stored or freed.',
        'Store the returned pointer so you can free it after use.',
        'Every malloc must have a matching free.',
      ],
      concepts: ['memory leak', 'ownership', 'free after use'],
    },
    {
      id: 'c-malloc-6',
      title: 'Allocate 2D array',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Dynamically allocate a 2D array (array of pointers).',
      skeleton: `// Write int **alloc_matrix(int rows, int cols) that:
// 1. Allocates an array of row pointers
// 2. Each row is a malloc'd array of cols ints, all zeroed
// 3. Returns the matrix pointer
// Also write void free_matrix(int **mat, int rows)`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int **alloc_matrix(int rows, int cols) {
    int **mat = malloc(rows * sizeof(int *));
    if (!mat) return NULL;
    for (int i = 0; i < rows; i++) {
        mat[i] = calloc(cols, sizeof(int));
        if (!mat[i]) {
            for (int j = 0; j < i; j++) free(mat[j]);
            free(mat);
            return NULL;
        }
    }
    return mat;
}

void free_matrix(int **mat, int rows) {
    for (int i = 0; i < rows; i++) free(mat[i]);
    free(mat);
}

int main(void) {
    int **m = alloc_matrix(3, 4);
    if (!m) return 1;
    m[1][2] = 42;
    printf("m[1][2] = %d\\n", m[1][2]);
    free_matrix(m, 3);
    return 0;
}`,
      hints: [
        'First allocate the row pointer array, then each row.',
        'On partial failure, free what was already allocated.',
        'Free in reverse: rows first, then the pointer array.',
      ],
      concepts: ['2D allocation', 'array of pointers', 'cleanup on failure'],
    },
    {
      id: 'c-malloc-7',
      title: 'Fix double free',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the double-free bug.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *p = malloc(sizeof(int));
    *p = 42;
    printf("%d\\n", *p);
    free(p);

    // Bug: some code path frees again
    if (p != NULL) {
        free(p);  // Double free!
    }
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *p = malloc(sizeof(int));
    *p = 42;
    printf("%d\\n", *p);
    free(p);
    p = NULL;

    if (p != NULL) {
        free(p);
    }
    return 0;
}`,
      hints: [
        'After free(p), p still holds the old address.',
        'Set p = NULL after freeing to prevent double free.',
        'free(NULL) is safe and does nothing.',
      ],
      concepts: ['double free', 'null after free', 'defensive programming'],
    },
    {
      id: 'c-malloc-8',
      title: 'Fill-blank realloc pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use the safe realloc pattern with a temporary pointer.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *arr = malloc(2 * sizeof(int));
    arr[0] = 1; arr[1] = 2;

    int *__BLANK__ = realloc(arr, 4 * sizeof(int));
    if (!__BLANK__) {
        free(arr);
        return 1;
    }
    arr = __BLANK__;
    arr[2] = 3; arr[3] = 4;

    for (int i = 0; i < 4; i++) printf("%d ", arr[i]);
    printf("\\n");
    free(arr);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *arr = malloc(2 * sizeof(int));
    arr[0] = 1; arr[1] = 2;

    int *temp = realloc(arr, 4 * sizeof(int));
    if (!temp) {
        free(arr);
        return 1;
    }
    arr = temp;
    arr[2] = 3; arr[3] = 4;

    for (int i = 0; i < 4; i++) printf("%d ", arr[i]);
    printf("\\n");
    free(arr);
    return 0;
}`,
      hints: [
        'Never do arr = realloc(arr, ...) directly.',
        'If realloc fails, it returns NULL but the old block is still valid.',
        'Use a temp pointer to check before reassigning.',
      ],
      concepts: ['safe realloc', 'temporary pointer', 'error handling'],
    },
    {
      id: 'c-malloc-9',
      title: 'Dynamic string builder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that concatenates strings with dynamic allocation.',
      skeleton: `// Write char *str_concat(const char *a, const char *b)
// that returns a new malloc'd string containing a followed by b.
// The caller must free the result.`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *str_concat(const char *a, const char *b) {
    size_t la = strlen(a);
    size_t lb = strlen(b);
    char *result = malloc(la + lb + 1);
    if (!result) return NULL;
    memcpy(result, a, la);
    memcpy(result + la, b, lb + 1);
    return result;
}

int main(void) {
    char *s = str_concat("Hello, ", "World!");
    if (s) {
        printf("%s\\n", s);
        free(s);
    }
    return 0;
}`,
      hints: [
        'Allocate strlen(a) + strlen(b) + 1 for the null terminator.',
        'Copy a first, then b starting at offset strlen(a).',
        'The +1 on lb copy includes the null terminator.',
      ],
      concepts: ['dynamic string', 'concatenation', 'size calculation'],
    },
    {
      id: 'c-malloc-10',
      title: 'Predict realloc behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the behavior of realloc shrinking.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *arr = malloc(5 * sizeof(int));
    for (int i = 0; i < 5; i++) arr[i] = (i + 1) * 10;

    arr = realloc(arr, 3 * sizeof(int));
    for (int i = 0; i < 3; i++) printf("%d ", arr[i]);
    printf("\\n");
    free(arr);
    return 0;
}`,
      solution: `10 20 30`,
      hints: [
        'realloc can shrink allocations too.',
        'When shrinking, the first N elements are preserved.',
        'Only the first 3 ints remain accessible.',
      ],
      concepts: ['realloc shrink', 'data preservation', 'predict output'],
    },
    {
      id: 'c-malloc-11',
      title: 'Dynamic array (vector)',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Implement a simple dynamic array with push and automatic resizing.',
      skeleton: `// Implement a dynamic array:
// typedef struct { int *data; int len; int cap; } Vec;
// void vec_init(Vec *v);
// void vec_push(Vec *v, int val);  // double capacity when full
// void vec_free(Vec *v);`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;
    int len;
    int cap;
} Vec;

void vec_init(Vec *v) {
    v->data = NULL;
    v->len = 0;
    v->cap = 0;
}

void vec_push(Vec *v, int val) {
    if (v->len == v->cap) {
        int new_cap = v->cap == 0 ? 4 : v->cap * 2;
        int *temp = realloc(v->data, new_cap * sizeof(int));
        if (!temp) { fprintf(stderr, "OOM\\n"); exit(1); }
        v->data = temp;
        v->cap = new_cap;
    }
    v->data[v->len++] = val;
}

void vec_free(Vec *v) {
    free(v->data);
    v->data = NULL;
    v->len = v->cap = 0;
}

int main(void) {
    Vec v;
    vec_init(&v);
    for (int i = 0; i < 10; i++) vec_push(&v, i * 5);
    for (int i = 0; i < v.len; i++) printf("%d ", v.data[i]);
    printf("\\n");
    vec_free(&v);
    return 0;
}`,
      hints: [
        'Start with capacity 0 or 4, double when full.',
        'Use the safe realloc pattern with a temp pointer.',
        'Track both length (used) and capacity (allocated).',
      ],
      concepts: ['dynamic array', 'amortized growth', 'realloc doubling'],
    },
    {
      id: 'c-malloc-12',
      title: 'Fix use after free',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the use-after-free bug.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    char *name = malloc(20);
    strcpy(name, "Alice");
    char *alias = name;

    free(name);
    printf("Alias: %s\\n", alias);  // Bug: alias is dangling!
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    char *name = malloc(20);
    strcpy(name, "Alice");
    char *alias = name;

    printf("Alias: %s\\n", alias);
    free(name);
    name = NULL;
    alias = NULL;
    return 0;
}`,
      hints: [
        'alias and name point to the same memory.',
        'Freeing name makes alias a dangling pointer too.',
        'Use the pointer before freeing, or duplicate the string.',
      ],
      concepts: ['use after free', 'aliasing', 'dangling pointer'],
    },
    {
      id: 'c-malloc-13',
      title: 'Predict calloc vs malloc',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Understand the key difference between calloc and malloc.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *a = calloc(3, sizeof(int));
    int sum = a[0] + a[1] + a[2];
    printf("%d\\n", sum);
    printf("%d\\n", a[0] == 0);
    free(a);
    return 0;
}`,
      solution: `0
1`,
      hints: [
        'calloc initializes all bytes to zero.',
        '0 + 0 + 0 = 0.',
        'a[0] == 0 is true (1).',
      ],
      concepts: ['calloc zeroing', 'initialization guarantee', 'boolean result'],
    },
    {
      id: 'c-malloc-14',
      title: 'Flexible array member',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Use a flexible array member in a struct for variable-length data.',
      skeleton: `// Define a struct Packet with:
//   int len;
//   char data[];  // flexible array member
// Write Packet *create_packet(const char *msg)
// that allocates a packet with the message data.`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    int len;
    char data[];
} Packet;

Packet *create_packet(const char *msg) {
    int len = strlen(msg);
    Packet *pkt = malloc(sizeof(Packet) + len + 1);
    if (!pkt) return NULL;
    pkt->len = len;
    memcpy(pkt->data, msg, len + 1);
    return pkt;
}

int main(void) {
    Packet *pkt = create_packet("Hello, network!");
    if (pkt) {
        printf("Len: %d, Data: %s\\n", pkt->len, pkt->data);
        free(pkt);
    }
    return 0;
}`,
      hints: [
        'A flexible array member must be the last field in the struct.',
        'Allocate sizeof(struct) + data size.',
        'This avoids a separate allocation for the data.',
      ],
      concepts: ['flexible array member', 'variable-length struct', 'single allocation'],
    },
    {
      id: 'c-malloc-15',
      title: 'Fill-blank strdup',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Implement string duplication with malloc.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *my_strdup(const char *s) {
    size_t len = __BLANK__(s);
    char *dup = __BLANK__(len + 1);
    if (!dup) return NULL;
    __BLANK__(dup, s, len + 1);
    return dup;
}

int main(void) {
    char *copy = my_strdup("Hello");
    printf("%s\\n", copy);
    free(copy);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *my_strdup(const char *s) {
    size_t len = strlen(s);
    char *dup = malloc(len + 1);
    if (!dup) return NULL;
    memcpy(dup, s, len + 1);
    return dup;
}

int main(void) {
    char *copy = my_strdup("Hello");
    printf("%s\\n", copy);
    free(copy);
    return 0;
}`,
      hints: [
        'strlen gets the length without the null terminator.',
        'malloc(len + 1) allocates room for the string plus null.',
        'memcpy copies the full string including null terminator.',
      ],
      concepts: ['strdup implementation', 'string duplication', 'null terminator'],
    },
    {
      id: 'c-malloc-16',
      title: 'Refactor stack to heap',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Refactor a function to return heap-allocated data instead of using a static buffer.',
      skeleton: `#include <stdio.h>

// Problem: returns pointer to static buffer (not reentrant)
char *get_message(int code) {
    static char buf[50];
    switch (code) {
        case 0: snprintf(buf, 50, "Success"); break;
        case 1: snprintf(buf, 50, "Error: not found"); break;
        default: snprintf(buf, 50, "Unknown code %d", code); break;
    }
    return buf;
}

int main(void) {
    char *a = get_message(0);
    char *b = get_message(1);
    // Bug: a and b point to the same buffer!
    printf("%s\\n", a);  // Prints "Error: not found", not "Success"
    printf("%s\\n", b);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *get_message(int code) {
    char buf[50];
    switch (code) {
        case 0: snprintf(buf, 50, "Success"); break;
        case 1: snprintf(buf, 50, "Error: not found"); break;
        default: snprintf(buf, 50, "Unknown code %d", code); break;
    }
    char *result = malloc(strlen(buf) + 1);
    if (result) strcpy(result, buf);
    return result;
}

int main(void) {
    char *a = get_message(0);
    char *b = get_message(1);
    printf("%s\\n", a);
    printf("%s\\n", b);
    free(a);
    free(b);
    return 0;
}`,
      hints: [
        'Static buffers are shared across calls, causing aliasing.',
        'Allocate a new string each call so each has its own copy.',
        'Caller must free the returned strings.',
      ],
      concepts: ['static vs heap', 'reentrancy', 'ownership transfer'],
    },
    {
      id: 'c-malloc-17',
      title: 'Refactor to single allocation',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor multiple allocations into a single allocation.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *name;
    char *email;
} User;

User *create_user(const char *name, const char *email) {
    User *u = malloc(sizeof(User));
    u->name = malloc(strlen(name) + 1);
    u->email = malloc(strlen(email) + 1);
    strcpy(u->name, name);
    strcpy(u->email, email);
    return u;
}

void free_user(User *u) {
    free(u->name);
    free(u->email);
    free(u);
}

int main(void) {
    User *u = create_user("Alice", "alice@test.com");
    printf("%s <%s>\\n", u->name, u->email);
    free_user(u);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *name;
    char *email;
} User;

User *create_user(const char *name, const char *email) {
    size_t nlen = strlen(name) + 1;
    size_t elen = strlen(email) + 1;
    User *u = malloc(sizeof(User) + nlen + elen);
    if (!u) return NULL;
    char *buf = (char *)(u + 1);
    u->name = buf;
    memcpy(u->name, name, nlen);
    u->email = buf + nlen;
    memcpy(u->email, email, elen);
    return u;
}

void free_user(User *u) {
    free(u);
}

int main(void) {
    User *u = create_user("Alice", "alice@test.com");
    if (u) {
        printf("%s <%s>\\n", u->name, u->email);
        free_user(u);
    }
    return 0;
}`,
      hints: [
        'Allocate struct + all string data in one malloc call.',
        'Place string data right after the struct in memory.',
        'Single free replaces three frees.',
      ],
      concepts: ['single allocation', 'memory locality', 'simplified cleanup'],
    },
    {
      id: 'c-malloc-18',
      title: 'Predict realloc NULL',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the behavior of realloc with NULL.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *p = NULL;
    p = realloc(p, 3 * sizeof(int));  // realloc(NULL, ...) == malloc(...)
    p[0] = 10; p[1] = 20; p[2] = 30;

    p = realloc(p, 0);  // realloc(p, 0) may free or return small block

    printf("%d\\n", p == NULL || 1);
    // The exact behavior of realloc(p, 0) is implementation-defined
    free(p);
    return 0;
}`,
      solution: `1`,
      hints: [
        'realloc(NULL, size) behaves like malloc(size).',
        'realloc(p, 0) behavior is implementation-defined in C11+.',
        'The printf always prints 1 due to the || 1.',
      ],
      concepts: ['realloc with NULL', 'realloc zero size', 'implementation-defined'],
    },
    {
      id: 'c-malloc-19',
      title: 'Memory pool allocator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Implement a simple memory pool for fixed-size allocations.',
      skeleton: `// Implement a fixed-size memory pool:
// typedef struct { char *buffer; int block_size; int count; int *free_list; int free_top; } Pool;
// void pool_init(Pool *p, int block_size, int count);
// void *pool_alloc(Pool *p);
// void pool_free(Pool *p, void *ptr);
// void pool_destroy(Pool *p);`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    char *buffer;
    int block_size;
    int count;
    int *free_list;
    int free_top;
} Pool;

void pool_init(Pool *p, int block_size, int count) {
    p->buffer = malloc(block_size * count);
    p->block_size = block_size;
    p->count = count;
    p->free_list = malloc(count * sizeof(int));
    p->free_top = count;
    for (int i = 0; i < count; i++) {
        p->free_list[i] = i;
    }
}

void *pool_alloc(Pool *p) {
    if (p->free_top == 0) return NULL;
    int idx = p->free_list[--p->free_top];
    return p->buffer + idx * p->block_size;
}

void pool_free(Pool *p, void *ptr) {
    int idx = ((char *)ptr - p->buffer) / p->block_size;
    p->free_list[p->free_top++] = idx;
}

void pool_destroy(Pool *p) {
    free(p->buffer);
    free(p->free_list);
}

int main(void) {
    Pool pool;
    pool_init(&pool, sizeof(int), 5);
    int *a = pool_alloc(&pool);
    int *b = pool_alloc(&pool);
    *a = 42; *b = 99;
    printf("%d %d\\n", *a, *b);
    pool_free(&pool, a);
    int *c = pool_alloc(&pool);
    *c = 77;
    printf("%d\\n", *c);
    pool_destroy(&pool);
    return 0;
}`,
      hints: [
        'Pre-allocate a large buffer, divide into fixed-size blocks.',
        'Use a free list stack to track available blocks.',
        'Allocation pops from the stack, freeing pushes back.',
      ],
      concepts: ['memory pool', 'fixed-size allocator', 'free list'],
    },
    {
      id: 'c-malloc-20',
      title: 'Fix realloc leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the memory leak caused by incorrect realloc usage.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *arr = malloc(3 * sizeof(int));
    arr[0] = 1; arr[1] = 2; arr[2] = 3;

    // Bug: if realloc fails, arr is overwritten with NULL, leaking original memory
    arr = realloc(arr, 1000000000 * sizeof(int));
    if (!arr) {
        printf("Realloc failed\\n");
        return 1;
    }

    free(arr);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *arr = malloc(3 * sizeof(int));
    arr[0] = 1; arr[1] = 2; arr[2] = 3;

    int *temp = realloc(arr, 1000000000 * sizeof(int));
    if (!temp) {
        printf("Realloc failed\\n");
        free(arr);
        return 1;
    }
    arr = temp;

    free(arr);
    return 0;
}`,
      hints: [
        'arr = realloc(arr, ...) loses the original pointer if it fails.',
        'Always use a temp pointer to catch realloc failure.',
        'Free the original on failure, otherwise assign temp to arr.',
      ],
      concepts: ['realloc leak', 'safe realloc', 'error handling'],
    },
  ],
};
