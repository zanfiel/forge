import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-voidptr',
  title: '22. Void Pointers',
  explanation: `## Void Pointers

A \`void *\` is a generic pointer that can hold the address of any data type. It provides type erasure for writing generic C code.

\`\`\`c
int x = 42;
void *ptr = &x;           // implicit conversion to void*
int val = *(int *)ptr;    // must cast back to use

// Generic swap
void swap(void *a, void *b, size_t size);
\`\`\`

### Key Concepts
- **Cannot dereference** a void* directly -- must cast first
- **Cannot do pointer arithmetic** on void* (size unknown)
- **Implicit conversion**: any pointer converts to/from void*
- Used by \`malloc\`, \`qsort\`, \`bsearch\`, \`memcpy\`, etc.
`,
  exercises: [
    {
      id: 'c-voidptr-1',
      title: 'Basic void pointer cast',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Cast a void pointer back to the correct type.',
      skeleton: `#include <stdio.h>

int main(void) {
    int x = 42;
    void *ptr = &x;
    int val = *(__BLANK__)ptr;
    printf("%d\\n", val);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int x = 42;
    void *ptr = &x;
    int val = *(int *)ptr;
    printf("%d\\n", val);
    return 0;
}`,
      hints: [
        'Cast void* to int* before dereferencing.',
        'The syntax is *(int *)ptr.',
        'Without the cast, the compiler does not know the type or size.',
      ],
      concepts: ['void pointer', 'type cast', 'dereference'],
    },
    {
      id: 'c-voidptr-2',
      title: 'Store different types',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use a single void pointer to point to different types.',
      skeleton: `#include <stdio.h>

int main(void) {
    int i = 10;
    double d = 3.14;
    char c = 'A';

    void *ptr;

    ptr = __BLANK__;
    printf("int: %d\\n", *(int *)ptr);

    ptr = __BLANK__;
    printf("double: %.2f\\n", *(double *)ptr);

    ptr = __BLANK__;
    printf("char: %c\\n", *(char *)ptr);

    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int i = 10;
    double d = 3.14;
    char c = 'A';

    void *ptr;

    ptr = &i;
    printf("int: %d\\n", *(int *)ptr);

    ptr = &d;
    printf("double: %.2f\\n", *(double *)ptr);

    ptr = &c;
    printf("char: %c\\n", *(char *)ptr);

    return 0;
}`,
      hints: [
        'Use the address-of operator & to get a pointer to each variable.',
        'Any pointer type implicitly converts to void*.',
        'Cast back to the correct type before dereferencing.',
      ],
      concepts: ['void pointer assignment', 'address-of', 'type erasure'],
    },
    {
      id: 'c-voidptr-3',
      title: 'Predict void pointer casts',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output when void pointers are cast to different types.',
      skeleton: `#include <stdio.h>

int main(void) {
    int x = 65;
    void *p = &x;
    printf("%d\\n", *(int *)p);
    printf("%c\\n", *(char *)p);  // little-endian: low byte = 65
    return 0;
}`,
      solution: `65
A`,
      hints: [
        '*(int *)p reads all 4 bytes as int: 65.',
        '*(char *)p reads only the first byte.',
        'On little-endian, the first byte of 65 is 0x41 = \'A\'.',
      ],
      concepts: ['type punning', 'little-endian', 'byte interpretation'],
    },
    {
      id: 'c-voidptr-4',
      title: 'Generic swap function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a generic swap that works with any type via void pointers.',
      skeleton: `// Write void generic_swap(void *a, void *b, size_t size)
// that swaps the bytes of two objects of any type.`,
      solution: `#include <stdio.h>
#include <string.h>

void generic_swap(void *a, void *b, size_t size) {
    unsigned char temp[size];
    memcpy(temp, a, size);
    memcpy(a, b, size);
    memcpy(b, temp, size);
}

int main(void) {
    int x = 10, y = 20;
    generic_swap(&x, &y, sizeof(int));
    printf("x=%d y=%d\\n", x, y);

    double a = 1.5, b = 2.5;
    generic_swap(&a, &b, sizeof(double));
    printf("a=%.1f b=%.1f\\n", a, b);

    char s1[] = "hello";
    char s2[] = "world";
    generic_swap(s1, s2, 6);
    printf("s1=%s s2=%s\\n", s1, s2);
    return 0;
}`,
      hints: [
        'Use memcpy to copy size bytes between the two locations.',
        'Allocate a temporary buffer of size bytes.',
        'VLA or alloca can be used for the temp buffer.',
      ],
      concepts: ['generic swap', 'memcpy', 'void pointer', 'size_t'],
    },
    {
      id: 'c-voidptr-5',
      title: 'Fill-blank memcpy usage',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete a memcpy call using void pointers.',
      skeleton: `#include <stdio.h>
#include <string.h>

int main(void) {
    int src[] = {1, 2, 3, 4, 5};
    int dst[5];

    __BLANK__(dst, src, 5 * __BLANK__(int));

    for (int i = 0; i < 5; i++) printf("%d ", dst[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    int src[] = {1, 2, 3, 4, 5};
    int dst[5];

    memcpy(dst, src, 5 * sizeof(int));

    for (int i = 0; i < 5; i++) printf("%d ", dst[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'memcpy(dest, src, num_bytes) copies raw bytes.',
        'Size in bytes = count * sizeof(element_type).',
        'memcpy parameters are void*, so any pointer works.',
      ],
      concepts: ['memcpy', 'sizeof', 'raw byte copy'],
    },
    {
      id: 'c-voidptr-6',
      title: 'Predict wrong cast',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict what happens when a void pointer is cast to the wrong type.',
      skeleton: `#include <stdio.h>

int main(void) {
    double d = 0.0;
    void *p = &d;
    int *ip = (int *)p;
    *ip = 1;
    printf("%f\\n", d);
    return 0;
}`,
      solution: `0.000000`,
      hints: [
        'Writing 1 as an int into the first 4 bytes of a double.',
        'A double is 8 bytes; only the low 4 bytes are modified.',
        'The bit pattern of 1 in the low bytes of a double is very close to 0.0.',
      ],
      concepts: ['type punning', 'undefined behavior', 'memory layout'],
    },
    {
      id: 'c-voidptr-7',
      title: 'Generic max function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a generic max function using void pointers and a comparator.',
      skeleton: `// Write void *generic_max(void *base, size_t count, size_t size,
//                          int (*cmp)(const void *, const void *))
// that returns a pointer to the maximum element.`,
      solution: `#include <stdio.h>
#include <string.h>

void *generic_max(void *base, size_t count, size_t size,
                  int (*cmp)(const void *, const void *)) {
    char *arr = (char *)base;
    char *max = arr;
    for (size_t i = 1; i < count; i++) {
        if (cmp(arr + i * size, max) > 0) {
            max = arr + i * size;
        }
    }
    return max;
}

int cmp_int(const void *a, const void *b) {
    return *(const int *)a - *(const int *)b;
}

int cmp_double(const void *a, const void *b) {
    double da = *(const double *)a;
    double db = *(const double *)b;
    return (da > db) - (da < db);
}

int main(void) {
    int ints[] = {3, 7, 1, 9, 4};
    int *mi = (int *)generic_max(ints, 5, sizeof(int), cmp_int);
    printf("Max int: %d\\n", *mi);

    double dbls[] = {1.5, 3.7, 2.1};
    double *md = (double *)generic_max(dbls, 3, sizeof(double), cmp_double);
    printf("Max double: %.1f\\n", *md);
    return 0;
}`,
      hints: [
        'Cast base to char* for byte-level pointer arithmetic.',
        'Element i is at offset (char*)base + i * size.',
        'Use the comparator to compare elements; track the max pointer.',
      ],
      concepts: ['generic algorithm', 'pointer arithmetic', 'comparator'],
    },
    {
      id: 'c-voidptr-8',
      title: 'Fix void pointer arithmetic',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix code that illegally does arithmetic on void pointers.',
      skeleton: `#include <stdio.h>

// Bug: cannot do arithmetic on void*
void print_array(void *arr, int count, int elem_size) {
    for (int i = 0; i < count; i++) {
        int *p = (int *)(arr + i * elem_size);  // Bug: void* arithmetic
        printf("%d ", *p);
    }
    printf("\\n");
}

int main(void) {
    int nums[] = {10, 20, 30, 40};
    print_array(nums, 4, sizeof(int));
    return 0;
}`,
      solution: `#include <stdio.h>

void print_array(void *arr, int count, int elem_size) {
    for (int i = 0; i < count; i++) {
        int *p = (int *)((char *)arr + i * elem_size);
        printf("%d ", *p);
    }
    printf("\\n");
}

int main(void) {
    int nums[] = {10, 20, 30, 40};
    print_array(nums, 4, sizeof(int));
    return 0;
}`,
      hints: [
        'Arithmetic on void* is not standard C (GCC extension only).',
        'Cast to char* first for byte-level arithmetic.',
        '(char *)arr + i * elem_size moves by the correct number of bytes.',
      ],
      concepts: ['void pointer arithmetic', 'char pointer cast', 'byte offset'],
    },
    {
      id: 'c-voidptr-9',
      title: 'Fill-blank generic callback data',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Pass context data to a callback via void pointer.',
      skeleton: `#include <stdio.h>

typedef void (*Callback)(int value, __BLANK__ *user_data);

void process(int *arr, int n, Callback cb, void *data) {
    for (int i = 0; i < n; i++) {
        cb(arr[i], data);
    }
}

void sum_cb(int value, void *user_data) {
    int *sum = (__BLANK__ *)user_data;
    *sum += value;
}

int main(void) {
    int nums[] = {1, 2, 3, 4, 5};
    int total = 0;
    process(nums, 5, sum_cb, __BLANK__);
    printf("Sum: %d\\n", total);
    return 0;
}`,
      solution: `#include <stdio.h>

typedef void (*Callback)(int value, void *user_data);

void process(int *arr, int n, Callback cb, void *data) {
    for (int i = 0; i < n; i++) {
        cb(arr[i], data);
    }
}

void sum_cb(int value, void *user_data) {
    int *sum = (int *)user_data;
    *sum += value;
}

int main(void) {
    int nums[] = {1, 2, 3, 4, 5};
    int total = 0;
    process(nums, 5, sum_cb, &total);
    printf("Sum: %d\\n", total);
    return 0;
}`,
      hints: [
        'void* in the callback type allows passing any data type.',
        'Cast void* to int* inside the callback to accumulate.',
        'Pass &total as the user_data argument.',
      ],
      concepts: ['callback user data', 'void pointer context', 'type-safe cast'],
    },
    {
      id: 'c-voidptr-10',
      title: 'Generic search function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a generic linear search using void pointers.',
      skeleton: `// Write void *generic_search(const void *base, size_t count, size_t size,
//                             const void *key,
//                             int (*cmp)(const void *, const void *))
// Returns pointer to first matching element, or NULL if not found.`,
      solution: `#include <stdio.h>
#include <string.h>

void *generic_search(const void *base, size_t count, size_t size,
                     const void *key,
                     int (*cmp)(const void *, const void *)) {
    const char *arr = (const char *)base;
    for (size_t i = 0; i < count; i++) {
        if (cmp(arr + i * size, key) == 0) {
            return (void *)(arr + i * size);
        }
    }
    return NULL;
}

int cmp_int(const void *a, const void *b) {
    return *(const int *)a - *(const int *)b;
}

int main(void) {
    int arr[] = {10, 20, 30, 40, 50};
    int key = 30;
    int *found = (int *)generic_search(arr, 5, sizeof(int), &key, cmp_int);
    if (found) {
        printf("Found: %d at index %td\\n", *found, found - arr);
    } else {
        printf("Not found\\n");
    }
    return 0;
}`,
      hints: [
        'Cast base to const char* for byte arithmetic.',
        'Compare each element using cmp(element_ptr, key).',
        'Return the element pointer if cmp returns 0, else NULL.',
      ],
      concepts: ['linear search', 'generic algorithm', 'void pointer'],
    },
    {
      id: 'c-voidptr-11',
      title: 'Fix wrong cast size',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix code that reads the wrong number of bytes due to incorrect cast.',
      skeleton: `#include <stdio.h>

// Bug: casting void* to wrong type
void print_val(void *ptr, char type) {
    switch (type) {
        case 'i': printf("%d\\n", *(int *)ptr); break;
        case 'd': printf("%f\\n", *(int *)ptr); break;     // Bug
        case 'c': printf("%c\\n", *(int *)ptr); break;     // Bug
    }
}

int main(void) {
    int i = 42;
    double d = 3.14;
    char c = 'X';
    print_val(&i, 'i');
    print_val(&d, 'd');
    print_val(&c, 'c');
    return 0;
}`,
      solution: `#include <stdio.h>

void print_val(void *ptr, char type) {
    switch (type) {
        case 'i': printf("%d\\n", *(int *)ptr); break;
        case 'd': printf("%f\\n", *(double *)ptr); break;
        case 'c': printf("%c\\n", *(char *)ptr); break;
    }
}

int main(void) {
    int i = 42;
    double d = 3.14;
    char c = 'X';
    print_val(&i, 'i');
    print_val(&d, 'd');
    print_val(&c, 'c');
    return 0;
}`,
      hints: [
        'A double must be cast to double*, not int*.',
        'A char must be cast to char*, not int*.',
        'Reading the wrong number of bytes gives garbage values.',
      ],
      concepts: ['type safety', 'incorrect cast', 'size mismatch'],
    },
    {
      id: 'c-voidptr-12',
      title: 'Predict sizeof void pointer',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the sizes of various pointer types.',
      skeleton: `#include <stdio.h>

int main(void) {
    printf("%zu\\n", sizeof(void *));
    printf("%zu\\n", sizeof(int *));
    printf("%zu\\n", sizeof(double *));
    printf("%zu\\n", sizeof(char *));
    printf("%d\\n", sizeof(void *) == sizeof(int *));
    return 0;
}`,
      solution: `8
8
8
8
1`,
      hints: [
        'On a 64-bit system, all pointer types are 8 bytes.',
        'The type of a pointer does not affect its size.',
        'sizeof(void*) == sizeof(int*) == sizeof(double*) on most platforms.',
      ],
      concepts: ['pointer size', 'sizeof', '64-bit pointers'],
    },
    {
      id: 'c-voidptr-13',
      title: 'Generic array copy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a generic array copy using void pointers.',
      skeleton: `// Write void generic_copy(void *dst, const void *src, size_t count, size_t elem_size)
// that copies count elements from src to dst.`,
      solution: `#include <stdio.h>
#include <string.h>

void generic_copy(void *dst, const void *src, size_t count, size_t elem_size) {
    memcpy(dst, src, count * elem_size);
}

int main(void) {
    int src_i[] = {1, 2, 3, 4};
    int dst_i[4];
    generic_copy(dst_i, src_i, 4, sizeof(int));
    for (int i = 0; i < 4; i++) printf("%d ", dst_i[i]);
    printf("\\n");

    double src_d[] = {1.1, 2.2, 3.3};
    double dst_d[3];
    generic_copy(dst_d, src_d, 3, sizeof(double));
    for (int i = 0; i < 3; i++) printf("%.1f ", dst_d[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Total bytes = count * elem_size.',
        'memcpy handles the raw byte copying.',
        'Works for any type since void* accepts any pointer.',
      ],
      concepts: ['memcpy', 'generic copy', 'element size'],
    },
    {
      id: 'c-voidptr-14',
      title: 'Fill-blank bsearch usage',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use bsearch with void pointers to find an element in a sorted array.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) {
    return *(const int *)a - *(const int *)b;
}

int main(void) {
    int arr[] = {2, 5, 8, 12, 16, 23, 38};
    int key = 12;

    int *result = (int *)__BLANK__(&key, arr, 7, __BLANK__(int), cmp);

    if (result) {
        printf("Found %d at index %td\\n", *result, result - arr);
    } else {
        printf("Not found\\n");
    }
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) {
    return *(const int *)a - *(const int *)b;
}

int main(void) {
    int arr[] = {2, 5, 8, 12, 16, 23, 38};
    int key = 12;

    int *result = (int *)bsearch(&key, arr, 7, sizeof(int), cmp);

    if (result) {
        printf("Found %d at index %td\\n", *result, result - arr);
    } else {
        printf("Not found\\n");
    }
    return 0;
}`,
      hints: [
        'bsearch(key, base, count, size, comparator) searches a sorted array.',
        'First argument is pointer to the key, not the key itself.',
        'Returns void* to the found element, or NULL.',
      ],
      concepts: ['bsearch', 'binary search', 'stdlib'],
    },
    {
      id: 'c-voidptr-15',
      title: 'Generic stack with void pointer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Implement a generic stack that stores elements of any size.',
      skeleton: `// Implement a generic stack:
// typedef struct { char *data; size_t elem_size; int top; int capacity; } Stack;
// void stack_init(Stack *s, size_t elem_size, int capacity);
// void stack_push(Stack *s, const void *elem);
// void stack_pop(Stack *s, void *out);
// void stack_free(Stack *s);`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *data;
    size_t elem_size;
    int top;
    int capacity;
} Stack;

void stack_init(Stack *s, size_t elem_size, int capacity) {
    s->data = (char *)malloc(elem_size * capacity);
    s->elem_size = elem_size;
    s->top = 0;
    s->capacity = capacity;
}

void stack_push(Stack *s, const void *elem) {
    if (s->top < s->capacity) {
        memcpy(s->data + s->top * s->elem_size, elem, s->elem_size);
        s->top++;
    }
}

void stack_pop(Stack *s, void *out) {
    if (s->top > 0) {
        s->top--;
        memcpy(out, s->data + s->top * s->elem_size, s->elem_size);
    }
}

void stack_free(Stack *s) {
    free(s->data);
    s->data = NULL;
}

int main(void) {
    Stack s;
    stack_init(&s, sizeof(int), 10);

    for (int i = 1; i <= 5; i++) stack_push(&s, &i);

    int val;
    while (s.top > 0) {
        stack_pop(&s, &val);
        printf("%d ", val);
    }
    printf("\\n");
    stack_free(&s);
    return 0;
}`,
      hints: [
        'Store data as char* for byte-level addressing.',
        'Element i lives at data + i * elem_size.',
        'Use memcpy to copy elements in and out.',
      ],
      concepts: ['generic container', 'void pointer stack', 'memcpy'],
    },
    {
      id: 'c-voidptr-16',
      title: 'Fix NULL check before cast',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix code that dereferences a void pointer without NULL check.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

void *safe_malloc(size_t size) {
    return malloc(size);
}

int main(void) {
    // Bug: no NULL check before dereferencing
    int *arr = (int *)safe_malloc(1000000000000UL);
    arr[0] = 42;
    printf("%d\\n", arr[0]);
    free(arr);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

void *safe_malloc(size_t size) {
    void *ptr = malloc(size);
    if (!ptr) {
        fprintf(stderr, "Allocation failed\\n");
        exit(1);
    }
    return ptr;
}

int main(void) {
    int *arr = (int *)safe_malloc(1000000000000UL);
    arr[0] = 42;
    printf("%d\\n", arr[0]);
    free(arr);
    return 0;
}`,
      hints: [
        'malloc returns NULL when allocation fails.',
        'Dereferencing NULL is undefined behavior.',
        'Check the return value of malloc before using it.',
      ],
      concepts: ['NULL check', 'malloc failure', 'defensive programming'],
    },
    {
      id: 'c-voidptr-17',
      title: 'Refactor typed functions to generic',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor type-specific print functions into one generic function.',
      skeleton: `#include <stdio.h>

void print_ints(int *arr, int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
}

void print_doubles(double *arr, int n) {
    for (int i = 0; i < n; i++) printf("%.1f ", arr[i]);
    printf("\\n");
}

int main(void) {
    int ints[] = {1, 2, 3};
    double dbls[] = {1.1, 2.2, 3.3};
    print_ints(ints, 3);
    print_doubles(dbls, 3);
    return 0;
}`,
      solution: `#include <stdio.h>

typedef void (*PrintElem)(const void *elem);

void print_int(const void *elem) { printf("%d ", *(const int *)elem); }
void print_double(const void *elem) { printf("%.1f ", *(const double *)elem); }

void print_array(const void *arr, int n, size_t size, PrintElem print) {
    const char *p = (const char *)arr;
    for (int i = 0; i < n; i++) {
        print(p + i * size);
    }
    printf("\\n");
}

int main(void) {
    int ints[] = {1, 2, 3};
    double dbls[] = {1.1, 2.2, 3.3};
    print_array(ints, 3, sizeof(int), print_int);
    print_array(dbls, 3, sizeof(double), print_double);
    return 0;
}`,
      hints: [
        'One generic loop function with a callback that prints one element.',
        'Cast to char* for byte-level arithmetic.',
        'Each print callback knows its own type.',
      ],
      concepts: ['generic print', 'callback pattern', 'refactor to generic'],
    },
    {
      id: 'c-voidptr-18',
      title: 'Refactor with tagged union and void pointer',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor scattered type handling into a tagged variant type.',
      skeleton: `#include <stdio.h>
#include <string.h>

// Messy: separate handling for each type
void print_value_int(int x) { printf("int: %d\\n", x); }
void print_value_float(float x) { printf("float: %.2f\\n", x); }
void print_value_str(const char *x) { printf("str: %s\\n", x); }

int main(void) {
    print_value_int(42);
    print_value_float(3.14f);
    print_value_str("hello");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

typedef enum { VAL_INT, VAL_FLOAT, VAL_STR } ValType;

typedef struct {
    ValType type;
    union {
        int i;
        float f;
        const char *s;
    } data;
} Value;

Value make_int(int x) { return (Value){ .type = VAL_INT, .data.i = x }; }
Value make_float(float x) { return (Value){ .type = VAL_FLOAT, .data.f = x }; }
Value make_str(const char *x) { return (Value){ .type = VAL_STR, .data.s = x }; }

void print_value(Value v) {
    switch (v.type) {
        case VAL_INT:   printf("int: %d\\n", v.data.i); break;
        case VAL_FLOAT: printf("float: %.2f\\n", v.data.f); break;
        case VAL_STR:   printf("str: %s\\n", v.data.s); break;
    }
}

int main(void) {
    print_value(make_int(42));
    print_value(make_float(3.14f));
    print_value(make_str("hello"));
    return 0;
}`,
      hints: [
        'A tagged union uses an enum to track which type is stored.',
        'One print_value function handles all types via a switch.',
        'Constructors like make_int simplify creating values.',
      ],
      concepts: ['tagged union', 'variant type', 'type dispatch'],
    },
    {
      id: 'c-voidptr-19',
      title: 'Fill-blank generic foreach',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete a generic foreach function with void pointer.',
      skeleton: `#include <stdio.h>

void foreach(void *arr, int count, __BLANK__ size,
             void (*fn)(void *elem)) {
    char *p = (__BLANK__ *)arr;
    for (int i = 0; i < count; i++) {
        fn(p + i * __BLANK__);
    }
}

void double_int(void *elem) {
    *(int *)elem *= 2;
}

int main(void) {
    int nums[] = {1, 2, 3, 4};
    foreach(nums, 4, sizeof(int), double_int);
    for (int i = 0; i < 4; i++) printf("%d ", nums[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

void foreach(void *arr, int count, size_t size,
             void (*fn)(void *elem)) {
    char *p = (char *)arr;
    for (int i = 0; i < count; i++) {
        fn(p + i * size);
    }
}

void double_int(void *elem) {
    *(int *)elem *= 2;
}

int main(void) {
    int nums[] = {1, 2, 3, 4};
    foreach(nums, 4, sizeof(int), double_int);
    for (int i = 0; i < 4; i++) printf("%d ", nums[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'size_t is the correct type for byte sizes.',
        'Cast void* to char* for byte arithmetic.',
        'Stride by size bytes to reach each element.',
      ],
      concepts: ['generic foreach', 'byte stride', 'in-place mutation'],
    },
    {
      id: 'c-voidptr-20',
      title: 'Write generic binary search',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Implement your own bsearch using void pointers.',
      skeleton: `// Write void *my_bsearch(const void *key, const void *base, size_t count,
//                         size_t size, int (*cmp)(const void *, const void *))
// Returns pointer to found element or NULL.`,
      solution: `#include <stdio.h>

void *my_bsearch(const void *key, const void *base, size_t count,
                 size_t size, int (*cmp)(const void *, const void *)) {
    const char *arr = (const char *)base;
    size_t lo = 0, hi = count;
    while (lo < hi) {
        size_t mid = lo + (hi - lo) / 2;
        const void *elem = arr + mid * size;
        int res = cmp(key, elem);
        if (res == 0) return (void *)elem;
        if (res < 0) hi = mid;
        else lo = mid + 1;
    }
    return NULL;
}

int cmp_int(const void *a, const void *b) {
    return *(const int *)a - *(const int *)b;
}

int main(void) {
    int arr[] = {1, 3, 5, 7, 9, 11, 13};
    int key;

    key = 7;
    int *r = (int *)my_bsearch(&key, arr, 7, sizeof(int), cmp_int);
    printf("Search 7: %s\\n", r ? "found" : "not found");

    key = 4;
    r = (int *)my_bsearch(&key, arr, 7, sizeof(int), cmp_int);
    printf("Search 4: %s\\n", r ? "found" : "not found");
    return 0;
}`,
      hints: [
        'Use char* base for byte arithmetic.',
        'Binary search: compare key to middle element.',
        'If cmp < 0, search left half; if > 0, search right half.',
      ],
      concepts: ['binary search', 'generic algorithm', 'void pointer'],
    },
  ],
};
