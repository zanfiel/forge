import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-ptr',
  title: '10. Pointers',
  explanation: `## Pointers in C

A pointer stores the memory address of another variable. Pointers are central to C.

\`\`\`c
int x = 42;
int *p = &x;    // p points to x
printf("%d", *p); // dereference: prints 42
*p = 100;       // modifies x through p
\`\`\`

### Key Concepts
- \`&\`: address-of operator
- \`*\`: dereference operator (also used in declaration)
- \`NULL\`: pointer that points to nothing
- **Pointer to pointer**: \`int **pp\`
- **void pointer**: \`void *\` -- generic pointer, must cast before dereferencing
- **const pointer**: \`const int *p\` (data is const) vs \`int * const p\` (pointer is const)
`,
  exercises: [
    {
      id: 'c-ptr-1',
      title: 'Pointer basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Declare a pointer, point it to a variable, and dereference it.',
      skeleton: `#include <stdio.h>

int main(void) {
    int x = 42;
    int __BLANK__p = __BLANK__x;
    printf("Value: %d\\n", __BLANK__p);
    printf("Address: %p\\n", (void *)p);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int x = 42;
    int *p = &x;
    printf("Value: %d\\n", *p);
    printf("Address: %p\\n", (void *)p);
    return 0;
}`,
      hints: [
        '* in declaration creates a pointer: int *p.',
        '& gets the address of a variable: &x.',
        '* in an expression dereferences: *p gets the value.',
      ],
      concepts: ['pointer declaration', 'address-of', 'dereference'],
    },
    {
      id: 'c-ptr-2',
      title: 'Modify through pointer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Modify a variable through a pointer.',
      skeleton: `#include <stdio.h>

int main(void) {
    int x = 10;
    int *p = &x;
    __BLANK__ = 20;
    printf("x = %d\\n", x);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int x = 10;
    int *p = &x;
    *p = 20;
    printf("x = %d\\n", x);
    return 0;
}`,
      hints: [
        '*p on the left side of = writes to the memory p points to.',
        '*p = 20 sets x to 20 because p points to x.',
        'This is the essence of pass-by-reference in C.',
      ],
      concepts: ['pointer write', 'indirect modification', 'pass by reference'],
    },
    {
      id: 'c-ptr-3',
      title: 'Swap via pointers',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a function that swaps two integers using pointers.',
      skeleton: `// Write void swap(int *a, int *b) that swaps the values
// pointed to by a and b.`,
      solution: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int x = 5, y = 10;
    printf("Before: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("After: x=%d, y=%d\\n", x, y);
    return 0;
}`,
      hints: [
        'Dereference the pointers to access and modify the values.',
        'Store *a in temp, set *a = *b, set *b = temp.',
        'Call with swap(&x, &y) to pass addresses.',
      ],
      concepts: ['pointer parameters', 'swap function', 'pass by reference'],
    },
    {
      id: 'c-ptr-4',
      title: 'NULL pointer check',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Check for NULL before dereferencing a pointer.',
      skeleton: `#include <stdio.h>

void safe_print(int *p) {
    if (p __BLANK__ NULL) {
        printf("NULL pointer!\\n");
        return;
    }
    printf("Value: %d\\n", __BLANK__);
}

int main(void) {
    int x = 42;
    safe_print(&x);
    safe_print(__BLANK__);
    return 0;
}`,
      solution: `#include <stdio.h>

void safe_print(int *p) {
    if (p == NULL) {
        printf("NULL pointer!\\n");
        return;
    }
    printf("Value: %d\\n", *p);
}

int main(void) {
    int x = 42;
    safe_print(&x);
    safe_print(NULL);
    return 0;
}`,
      hints: [
        'Check p == NULL before dereferencing.',
        'Dereferencing NULL is undefined behavior.',
        'Pass NULL to test the safety check.',
      ],
      concepts: ['NULL pointer', 'null check', 'defensive programming'],
    },
    {
      id: 'c-ptr-5',
      title: 'Predict pointer operations',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output of pointer operations.',
      skeleton: `#include <stdio.h>

int main(void) {
    int a = 10, b = 20;
    int *p = &a;
    int *q = &b;

    printf("%d\\n", *p + *q);
    p = q;
    *p = 30;
    printf("%d %d\\n", a, b);
    return 0;
}`,
      solution: `30
10 30`,
      hints: [
        '*p + *q = 10 + 20 = 30.',
        'p = q makes p point to b now.',
        '*p = 30 modifies b (since p now points to b). a is unchanged.',
      ],
      concepts: ['pointer reassignment', 'indirect modification', 'pointer aliasing'],
    },
    {
      id: 'c-ptr-6',
      title: 'Pointer to pointer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Declare and use a pointer to a pointer.',
      skeleton: `#include <stdio.h>

int main(void) {
    int x = 42;
    int *p = &x;
    int __BLANK__pp = &p;

    printf("x = %d\\n", __BLANK__pp);
    printf("*p = %d\\n", *p);
    printf("**pp = %d\\n", **pp);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int x = 42;
    int *p = &x;
    int **pp = &p;

    printf("x = %d\\n", x);
    printf("*p = %d\\n", *p);
    printf("**pp = %d\\n", **pp);
    return 0;
}`,
      hints: [
        'int **pp declares a pointer to a pointer to int.',
        '**pp dereferences twice: pp -> p -> x.',
        'pp points to p, which points to x.',
      ],
      concepts: ['pointer to pointer', 'double dereference', '**'],
    },
    {
      id: 'c-ptr-7',
      title: 'Void pointer casting',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function using void pointers to print any integer type.',
      skeleton: `// Write void print_int(void *ptr, char type) that:
// type 'i' -> cast to int* and print
// type 'l' -> cast to long* and print
// type 'c' -> cast to char* and print as character`,
      solution: `#include <stdio.h>

void print_int(void *ptr, char type) {
    switch (type) {
        case 'i': printf("%d\\n", *(int *)ptr); break;
        case 'l': printf("%ld\\n", *(long *)ptr); break;
        case 'c': printf("%c\\n", *(char *)ptr); break;
        default: printf("Unknown type\\n"); break;
    }
}

int main(void) {
    int i = 42;
    long l = 1000000L;
    char c = 'A';
    print_int(&i, 'i');
    print_int(&l, 'l');
    print_int(&c, 'c');
    return 0;
}`,
      hints: [
        'void * can hold any pointer type but cannot be dereferenced directly.',
        'Cast to the correct type before dereferencing: *(int *)ptr.',
        'This is how generic functions work in C.',
      ],
      concepts: ['void pointer', 'type casting', 'generic function'],
    },
    {
      id: 'c-ptr-8',
      title: 'Const pointer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Understand the difference between const pointer and pointer to const.',
      skeleton: `#include <stdio.h>

int main(void) {
    int x = 10, y = 20;

    // Pointer to const: cannot modify *p1
    const int __BLANK__p1 = &x;
    // p1 = &y;  // OK: can change what p1 points to
    // *p1 = 30; // ERROR: cannot modify through p1

    // Const pointer: cannot change what p2 points to
    int *__BLANK__ p2 = &x;
    *p2 = 30;    // OK: can modify through p2
    // p2 = &y;  // ERROR: cannot change p2 itself

    printf("x = %d\\n", x);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int x = 10, y = 20;

    // Pointer to const: cannot modify *p1
    const int *p1 = &x;
    // p1 = &y;  // OK: can change what p1 points to
    // *p1 = 30; // ERROR: cannot modify through p1

    // Const pointer: cannot change what p2 points to
    int * const p2 = &x;
    *p2 = 30;    // OK: can modify through p2
    // p2 = &y;  // ERROR: cannot change p2 itself

    printf("x = %d\\n", x);
    return 0;
}`,
      hints: [
        'const int *p: the data is const (read-only through p).',
        'int * const p: the pointer itself is const (cannot reassign p).',
        'Read right-to-left: "p is a pointer to const int" vs "p is a const pointer to int".',
      ],
      concepts: ['pointer to const', 'const pointer', 'const correctness'],
    },
    {
      id: 'c-ptr-9',
      title: 'Predict pointer to pointer',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output of pointer-to-pointer operations.',
      skeleton: `#include <stdio.h>

void set_to_null(int **pp) {
    *pp = NULL;
}

int main(void) {
    int x = 42;
    int *p = &x;
    printf("%d\\n", *p);
    set_to_null(&p);
    printf("%d\\n", p == NULL);
    return 0;
}`,
      solution: `42
1`,
      hints: [
        '*p dereferences p to get x = 42.',
        'set_to_null(&p) passes the address of p itself.',
        '*pp = NULL sets p to NULL. p == NULL is true (1).',
      ],
      concepts: ['pointer to pointer', 'modifying pointer through double pointer', 'NULL assignment'],
    },
    {
      id: 'c-ptr-10',
      title: 'Fix dangling pointer',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the dangling pointer bug.',
      skeleton: `#include <stdio.h>

int *get_value(void) {
    int x = 42;
    return &x;  // Bug: returning address of local variable!
}

int main(void) {
    int *p = get_value();
    printf("%d\\n", *p);  // Undefined behavior!
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int *get_value(void) {
    int *x = malloc(sizeof(int));
    *x = 42;
    return x;
}

int main(void) {
    int *p = get_value();
    printf("%d\\n", *p);
    free(p);
    return 0;
}`,
      hints: [
        'Local variables are destroyed when the function returns.',
        'Returning &x gives a dangling pointer to invalid memory.',
        'Allocate on the heap with malloc so the memory persists.',
      ],
      concepts: ['dangling pointer', 'stack vs heap', 'lifetime'],
    },
    {
      id: 'c-ptr-11',
      title: 'Array and pointer relationship',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict output showing arrays and pointers are related.',
      skeleton: `#include <stdio.h>

int main(void) {
    int arr[] = {10, 20, 30, 40};
    int *p = arr;

    printf("%d\\n", *p);
    printf("%d\\n", *(p + 2));
    printf("%d\\n", p[3]);
    printf("%d\\n", 2[arr]);
    return 0;
}`,
      solution: `10
30
40
30`,
      hints: [
        'arr decays to a pointer to the first element.',
        '*(p + 2) is the same as p[2] which is arr[2] = 30.',
        '2[arr] is equivalent to arr[2] because a[b] = *(a+b) = *(b+a) = b[a].',
      ],
      concepts: ['array-pointer equivalence', 'pointer arithmetic', 'subscript operator'],
    },
    {
      id: 'c-ptr-12',
      title: 'Pointer and string',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that finds the first occurrence of a character using pointer arithmetic.',
      skeleton: `// Write char *my_strchr(const char *s, char c) that:
// Returns a pointer to the first occurrence of c in s, or NULL if not found.
// Do NOT use the standard strchr.`,
      solution: `#include <stdio.h>

char *my_strchr(const char *s, char c) {
    while (*s != '\\0') {
        if (*s == c) return (char *)s;
        s++;
    }
    if (c == '\\0') return (char *)s;
    return NULL;
}

int main(void) {
    const char *str = "Hello, World!";
    char *found = my_strchr(str, 'W');
    if (found) {
        printf("Found: %s\\n", found);
    }
    found = my_strchr(str, 'z');
    printf("Not found: %d\\n", found == NULL);
    return 0;
}`,
      hints: [
        'Iterate through the string with *s and s++.',
        'Compare each character with c.',
        'Return the pointer position when found, NULL if the loop ends.',
      ],
      concepts: ['pointer iteration', 'string traversal', 'returning pointers'],
    },
    {
      id: 'c-ptr-13',
      title: 'Fix wrong indirection',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the incorrect pointer indirection levels.',
      skeleton: `#include <stdio.h>

void increment(int *p) {
    p++;  // Bug: increments the pointer, not the value
}

int main(void) {
    int x = 5;
    increment(&x);
    printf("%d\\n", x);  // Should print 6
    return 0;
}`,
      solution: `#include <stdio.h>

void increment(int *p) {
    (*p)++;
}

int main(void) {
    int x = 5;
    increment(&x);
    printf("%d\\n", x);
    return 0;
}`,
      hints: [
        'p++ increments the pointer address, not the pointed-to value.',
        '(*p)++ dereferences first, then increments the value.',
        'Parentheses are needed because ++ has higher precedence than *.',
      ],
      concepts: ['pointer vs value increment', 'operator precedence', 'dereference'],
    },
    {
      id: 'c-ptr-14',
      title: 'Allocate and return array',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that allocates and returns a dynamically sized array.',
      skeleton: `// Write int *range(int start, int end, int *out_len) that:
// 1. Allocates an array of (end - start) integers
// 2. Fills it with values from start to end-1
// 3. Sets *out_len to the length
// 4. Returns the array pointer (caller must free)`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int *range(int start, int end, int *out_len) {
    int len = end - start;
    int *arr = malloc(len * sizeof(int));
    if (!arr) return NULL;
    for (int i = 0; i < len; i++) {
        arr[i] = start + i;
    }
    *out_len = len;
    return arr;
}

int main(void) {
    int len;
    int *nums = range(5, 10, &len);
    for (int i = 0; i < len; i++) {
        printf("%d ", nums[i]);
    }
    printf("\\n");
    free(nums);
    return 0;
}`,
      hints: [
        'Use malloc to allocate on the heap.',
        'Store the length via the out_len pointer parameter.',
        'The caller is responsible for calling free.',
      ],
      concepts: ['dynamic allocation', 'returning arrays', 'output parameter'],
    },
    {
      id: 'c-ptr-15',
      title: 'Predict const pointer behavior',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Predict which operations are valid with const pointers.',
      skeleton: `#include <stdio.h>

int main(void) {
    int a = 10, b = 20;
    const int *p = &a;
    // *p = 30;  // Would this compile? (A)
    p = &b;      // Would this compile? (B)

    int * const q = &a;
    *q = 30;     // Would this compile? (C)
    // q = &b;   // Would this compile? (D)

    printf("%d %d\\n", a, *p);
    return 0;
}`,
      solution: `30 20`,
      hints: [
        'const int *p: data is const. (A) No, cannot modify *p. (B) Yes, can reassign p.',
        'int * const q: pointer is const. (C) Yes, can modify *q. (D) No, cannot reassign q.',
        '*q = 30 changes a to 30. p now points to b which is 20.',
      ],
      concepts: ['const correctness', 'pointer to const', 'const pointer'],
    },
    {
      id: 'c-ptr-16',
      title: 'Generic swap with void pointers',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a generic swap function using void pointers and memcpy.',
      skeleton: `// Write void generic_swap(void *a, void *b, size_t size)
// that swaps the bytes of any two values of equal size.
// Use memcpy and a temporary buffer.`,
      solution: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void generic_swap(void *a, void *b, size_t size) {
    char temp[size];
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
    return 0;
}`,
      hints: [
        'Use void * so the function accepts any pointer type.',
        'memcpy copies raw bytes regardless of type.',
        'A temporary buffer holds one value during the swap.',
      ],
      concepts: ['void pointer', 'generic programming', 'memcpy', 'type-agnostic'],
    },
    {
      id: 'c-ptr-17',
      title: 'Refactor to use pointers',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Refactor the function to use pointer parameters instead of returning a struct.',
      skeleton: `#include <stdio.h>

typedef struct {
    int min;
    int max;
    double avg;
} Stats;

Stats compute_stats(int arr[], int len) {
    Stats s = {arr[0], arr[0], 0};
    int sum = 0;
    for (int i = 0; i < len; i++) {
        if (arr[i] < s.min) s.min = arr[i];
        if (arr[i] > s.max) s.max = arr[i];
        sum += arr[i];
    }
    s.avg = (double)sum / len;
    return s;
}

int main(void) {
    int nums[] = {3, 1, 4, 1, 5, 9};
    Stats s = compute_stats(nums, 6);
    printf("Min: %d, Max: %d, Avg: %.2f\\n", s.min, s.max, s.avg);
    return 0;
}`,
      solution: `#include <stdio.h>

void compute_stats(int arr[], int len, int *min, int *max, double *avg) {
    *min = arr[0];
    *max = arr[0];
    int sum = 0;
    for (int i = 0; i < len; i++) {
        if (arr[i] < *min) *min = arr[i];
        if (arr[i] > *max) *max = arr[i];
        sum += arr[i];
    }
    *avg = (double)sum / len;
}

int main(void) {
    int nums[] = {3, 1, 4, 1, 5, 9};
    int min, max;
    double avg;
    compute_stats(nums, 6, &min, &max, &avg);
    printf("Min: %d, Max: %d, Avg: %.2f\\n", min, max, avg);
    return 0;
}`,
      hints: [
        'Replace the struct return with pointer output parameters.',
        'The function becomes void and writes results via pointers.',
        'This is a common C pattern for "returning" multiple values.',
      ],
      concepts: ['output parameters', 'pointer parameters', 'refactoring'],
    },
    {
      id: 'c-ptr-18',
      title: 'Refactor array indexing to pointers',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor array indexing to pointer-based iteration.',
      skeleton: `#include <stdio.h>

int sum_array(int arr[], int len) {
    int total = 0;
    for (int i = 0; i < len; i++) {
        total += arr[i];
    }
    return total;
}

int main(void) {
    int nums[] = {1, 2, 3, 4, 5};
    printf("Sum: %d\\n", sum_array(nums, 5));
    return 0;
}`,
      solution: `#include <stdio.h>

int sum_array(int *begin, int *end) {
    int total = 0;
    for (int *p = begin; p < end; p++) {
        total += *p;
    }
    return total;
}

int main(void) {
    int nums[] = {1, 2, 3, 4, 5};
    printf("Sum: %d\\n", sum_array(nums, nums + 5));
    return 0;
}`,
      hints: [
        'Use begin/end pointers instead of array + length.',
        'Iterate with a pointer p from begin to end (exclusive).',
        'This matches the iterator pattern used in many C libraries.',
      ],
      concepts: ['pointer iteration', 'begin/end pattern', 'pointer comparison'],
    },
    {
      id: 'c-ptr-19',
      title: 'Pointer arrays',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a program using an array of pointers to sort strings.',
      skeleton: `// Write a program that:
// 1. Creates an array of string pointers: "banana", "apple", "cherry"
// 2. Sorts them alphabetically by swapping pointers
// 3. Prints the sorted result`,
      solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    const char *fruits[] = {"banana", "apple", "cherry"};
    int len = 3;

    for (int i = 0; i < len - 1; i++) {
        for (int j = i + 1; j < len; j++) {
            if (strcmp(fruits[i], fruits[j]) > 0) {
                const char *temp = fruits[i];
                fruits[i] = fruits[j];
                fruits[j] = temp;
            }
        }
    }

    for (int i = 0; i < len; i++) {
        printf("%s\\n", fruits[i]);
    }
    return 0;
}`,
      hints: [
        'An array of pointers: const char *fruits[].',
        'Sorting swaps pointers, not the actual string data.',
        'Use strcmp to compare and swap pointers.',
      ],
      concepts: ['pointer array', 'string sorting', 'pointer swap'],
    },
    {
      id: 'c-ptr-20',
      title: 'Fix uninitialized pointer',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the program that uses an uninitialized pointer.',
      skeleton: `#include <stdio.h>

int main(void) {
    int *p;
    *p = 42;  // Bug: p is uninitialized, points to garbage memory
    printf("%d\\n", *p);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int x;
    int *p = &x;
    *p = 42;
    printf("%d\\n", *p);
    return 0;
}`,
      hints: [
        'An uninitialized pointer contains a garbage address.',
        'Writing to a garbage address is undefined behavior (likely crash).',
        'Point p to a valid variable before dereferencing.',
      ],
      concepts: ['uninitialized pointer', 'undefined behavior', 'pointer safety'],
    },
  ],
};
