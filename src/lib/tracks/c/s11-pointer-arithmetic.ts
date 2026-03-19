import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-ptrarith',
  title: '11. Pointer Arithmetic',
  explanation: `## Pointer Arithmetic

Pointer arithmetic allows you to navigate through memory by adding or subtracting integers from pointers. The compiler scales by the size of the pointed-to type.

\`\`\`c
int arr[] = {10, 20, 30};
int *p = arr;
p++;            // moves sizeof(int) bytes forward
printf("%d", *p); // 20
\`\`\`

### Key Concepts
- \`p + n\` moves n elements forward (n * sizeof(*p) bytes)
- \`p - q\` gives the number of elements between two pointers
- \`p++\`, \`p--\` advance/retreat by one element
- Pointer arithmetic only makes sense within arrays or allocated blocks
- Going past one-past-the-end is undefined behavior
`,
  exercises: [
    {
      id: 'c-ptrarith-1',
      title: 'Increment pointer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use pointer increment to traverse an array.',
      skeleton: `#include <stdio.h>

int main(void) {
    int arr[] = {10, 20, 30, 40, 50};
    int *p = arr;
    printf("%d\\n", *p);
    __BLANK__;
    printf("%d\\n", *p);
    __BLANK__;
    printf("%d\\n", *p);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int arr[] = {10, 20, 30, 40, 50};
    int *p = arr;
    printf("%d\\n", *p);
    p++;
    printf("%d\\n", *p);
    p++;
    printf("%d\\n", *p);
    return 0;
}`,
      hints: [
        'p++ moves the pointer to the next element.',
        'Each increment moves sizeof(int) bytes forward.',
        'The output should be 10, 20, 30.',
      ],
      concepts: ['pointer increment', 'array traversal', 'pointer arithmetic'],
    },
    {
      id: 'c-ptrarith-2',
      title: 'Pointer addition',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Access array elements using pointer addition.',
      skeleton: `#include <stdio.h>

int main(void) {
    int arr[] = {5, 10, 15, 20, 25};
    int *p = arr;
    printf("Third element: %d\\n", *(p __BLANK__ 2));
    printf("Fifth element: %d\\n", *(p __BLANK__ 4));
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int arr[] = {5, 10, 15, 20, 25};
    int *p = arr;
    printf("Third element: %d\\n", *(p + 2));
    printf("Fifth element: %d\\n", *(p + 4));
    return 0;
}`,
      hints: [
        '*(p + n) accesses the element n positions from p.',
        'This is equivalent to p[n].',
        'p + 2 points to the third element (index 2).',
      ],
      concepts: ['pointer addition', 'element access', 'dereference offset'],
    },
    {
      id: 'c-ptrarith-3',
      title: 'Pointer difference',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Calculate the number of elements between two pointers.',
      skeleton: `#include <stdio.h>

int main(void) {
    int arr[] = {1, 2, 3, 4, 5, 6, 7, 8};
    int *start = &arr[2];
    int *end = &arr[7];
    printf("Elements between: %td\\n", __BLANK__);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int arr[] = {1, 2, 3, 4, 5, 6, 7, 8};
    int *start = &arr[2];
    int *end = &arr[7];
    printf("Elements between: %td\\n", end - start);
    return 0;
}`,
      hints: [
        'Subtracting two pointers gives the number of elements between them.',
        'The result type is ptrdiff_t, printed with %td.',
        'end - start = 7 - 2 = 5.',
      ],
      concepts: ['pointer difference', 'ptrdiff_t', 'element count'],
    },
    {
      id: 'c-ptrarith-4',
      title: 'Traverse with pointer',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a function that sums an array using only pointer arithmetic.',
      skeleton: `// Write int sum(int *arr, int len) that sums all elements
// using pointer arithmetic (no arr[i] indexing).`,
      solution: `#include <stdio.h>

int sum(int *arr, int len) {
    int total = 0;
    int *end = arr + len;
    while (arr < end) {
        total += *arr;
        arr++;
    }
    return total;
}

int main(void) {
    int nums[] = {1, 2, 3, 4, 5};
    printf("Sum: %d\\n", sum(nums, 5));
    return 0;
}`,
      hints: [
        'Calculate the end pointer: arr + len.',
        'Loop while arr < end, adding *arr each time.',
        'Increment arr with arr++ to move to the next element.',
      ],
      concepts: ['pointer traversal', 'begin/end pattern', 'pointer comparison'],
    },
    {
      id: 'c-ptrarith-5',
      title: 'Predict pointer arithmetic',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output of basic pointer arithmetic operations.',
      skeleton: `#include <stdio.h>

int main(void) {
    int arr[] = {10, 20, 30, 40, 50};
    int *p = arr + 1;
    printf("%d\\n", *p);
    printf("%d\\n", *(p + 2));
    printf("%d\\n", *(p - 1));
    printf("%d\\n", p - arr);
    return 0;
}`,
      solution: `20
40
10
1`,
      hints: [
        'p starts at arr + 1, so *p is arr[1] = 20.',
        '*(p + 2) is arr[3] = 40.',
        '*(p - 1) is arr[0] = 10. p - arr = 1.',
      ],
      concepts: ['pointer offset', 'pointer subtraction', 'predict output'],
    },
    {
      id: 'c-ptrarith-6',
      title: 'Fill-blank sizeof scaling',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Demonstrate that pointer arithmetic scales by element size.',
      skeleton: `#include <stdio.h>

int main(void) {
    double arr[] = {1.0, 2.0, 3.0};
    double *p = arr;
    double *q = arr + 2;

    printf("Pointer diff (elements): %td\\n", q - p);
    printf("Byte diff: %td\\n", (char *)__BLANK__ - (char *)__BLANK__);
    printf("sizeof(double): %zu\\n", sizeof(double));
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    double arr[] = {1.0, 2.0, 3.0};
    double *p = arr;
    double *q = arr + 2;

    printf("Pointer diff (elements): %td\\n", q - p);
    printf("Byte diff: %td\\n", (char *)q - (char *)p);
    printf("sizeof(double): %zu\\n", sizeof(double));
    return 0;
}`,
      hints: [
        'Casting to char * gives byte-level addresses.',
        '(char *)q - (char *)p gives the actual byte distance.',
        'Byte diff = element diff * sizeof(double).',
      ],
      concepts: ['sizeof scaling', 'byte arithmetic', 'char pointer cast'],
    },
    {
      id: 'c-ptrarith-7',
      title: 'Reverse array with pointers',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that reverses an array in place using two pointers.',
      skeleton: `// Write void reverse(int *arr, int len) that reverses
// the array in place using two pointers (front and back).`,
      solution: `#include <stdio.h>

void reverse(int *arr, int len) {
    int *front = arr;
    int *back = arr + len - 1;
    while (front < back) {
        int temp = *front;
        *front = *back;
        *back = temp;
        front++;
        back--;
    }
}

int main(void) {
    int nums[] = {1, 2, 3, 4, 5};
    reverse(nums, 5);
    for (int i = 0; i < 5; i++) printf("%d ", nums[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Use two pointers: front starts at arr, back at arr + len - 1.',
        'Swap *front and *back, then move inward.',
        'Stop when front >= back.',
      ],
      concepts: ['two-pointer technique', 'in-place reversal', 'pointer decrement'],
    },
    {
      id: 'c-ptrarith-8',
      title: 'Predict sizeof and pointers',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict how sizeof interacts with pointer arithmetic.',
      skeleton: `#include <stdio.h>

int main(void) {
    char str[] = "Hello";
    char *p = str;
    printf("%zu\\n", sizeof(str));
    printf("%zu\\n", sizeof(p));
    printf("%c\\n", *(p + 4));
    printf("%td\\n", &str[5] - &str[0]);
    return 0;
}`,
      solution: `6
8
o
5`,
      hints: [
        'sizeof(str) includes the null terminator: 6 bytes.',
        'sizeof(p) is the size of a pointer (8 on 64-bit).',
        '*(p + 4) is str[4] which is the character o.',
      ],
      concepts: ['sizeof array vs pointer', 'string pointer', 'pointer difference'],
    },
    {
      id: 'c-ptrarith-9',
      title: 'Fix off-by-one pointer',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the off-by-one error in pointer-based array printing.',
      skeleton: `#include <stdio.h>

int main(void) {
    int arr[] = {10, 20, 30, 40, 50};
    int *p = arr;
    int *end = arr + 5;

    while (p <= end) {  // Bug: should be < not <=
        printf("%d ", *p);
        p++;
    }
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int arr[] = {10, 20, 30, 40, 50};
    int *p = arr;
    int *end = arr + 5;

    while (p < end) {
        printf("%d ", *p);
        p++;
    }
    printf("\\n");
    return 0;
}`,
      hints: [
        'arr + 5 points one past the last element.',
        'Dereferencing one-past-the-end is undefined behavior.',
        'Use < instead of <= to stop before the end pointer.',
      ],
      concepts: ['off-by-one', 'one-past-the-end', 'pointer bounds'],
    },
    {
      id: 'c-ptrarith-10',
      title: 'Pointer to last element',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Calculate a pointer to the last element of an array.',
      skeleton: `#include <stdio.h>

int main(void) {
    int arr[] = {100, 200, 300, 400, 500};
    int len = sizeof(arr) / __BLANK__;
    int *last = arr + __BLANK__;
    printf("Last: %d\\n", *last);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int arr[] = {100, 200, 300, 400, 500};
    int len = sizeof(arr) / sizeof(arr[0]);
    int *last = arr + len - 1;
    printf("Last: %d\\n", *last);
    return 0;
}`,
      hints: [
        'sizeof(arr) / sizeof(arr[0]) gives the number of elements.',
        'The last element index is len - 1.',
        'arr + len - 1 points to the last element.',
      ],
      concepts: ['array length macro', 'last element pointer', 'sizeof idiom'],
    },
    {
      id: 'c-ptrarith-11',
      title: 'Find max with pointers',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that returns a pointer to the maximum element.',
      skeleton: `// Write int *find_max(int *arr, int len) that returns
// a pointer to the maximum element in the array.`,
      solution: `#include <stdio.h>

int *find_max(int *arr, int len) {
    int *max = arr;
    for (int *p = arr + 1; p < arr + len; p++) {
        if (*p > *max) {
            max = p;
        }
    }
    return max;
}

int main(void) {
    int nums[] = {3, 7, 2, 9, 4};
    int *m = find_max(nums, 5);
    printf("Max: %d at index %td\\n", *m, m - nums);
    return 0;
}`,
      hints: [
        'Track the pointer to the current max, not just the value.',
        'Compare *p > *max to find a larger element.',
        'Return the pointer so the caller knows the position.',
      ],
      concepts: ['returning pointer', 'pointer comparison', 'max search'],
    },
    {
      id: 'c-ptrarith-12',
      title: 'Predict multi-type pointer math',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict how pointer arithmetic differs for different types.',
      skeleton: `#include <stdio.h>

int main(void) {
    int iarr[4];
    char carr[4];
    double darr[4];

    printf("%td\\n", (char *)(&iarr[1]) - (char *)(&iarr[0]));
    printf("%td\\n", (char *)(&carr[1]) - (char *)(&carr[0]));
    printf("%td\\n", (char *)(&darr[1]) - (char *)(&darr[0]));
    return 0;
}`,
      solution: `4
1
8`,
      hints: [
        'Casting to char * shows byte distances.',
        'int is 4 bytes, char is 1 byte, double is 8 bytes.',
        'Pointer + 1 always moves sizeof(type) bytes.',
      ],
      concepts: ['type size scaling', 'byte distance', 'sizeof'],
    },
    {
      id: 'c-ptrarith-13',
      title: 'Fix pointer comparison bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the incorrect pointer comparison in a search function.',
      skeleton: `#include <stdio.h>

int *find(int *arr, int len, int target) {
    for (int *p = arr; p < arr + len; p++) {
        if (p == target) {  // Bug: comparing pointer to int
            return p;
        }
    }
    return NULL;
}

int main(void) {
    int nums[] = {5, 10, 15, 20};
    int *found = find(nums, 4, 15);
    if (found) printf("Found at index %td\\n", found - nums);
    else printf("Not found\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

int *find(int *arr, int len, int target) {
    for (int *p = arr; p < arr + len; p++) {
        if (*p == target) {
            return p;
        }
    }
    return NULL;
}

int main(void) {
    int nums[] = {5, 10, 15, 20};
    int *found = find(nums, 4, 15);
    if (found) printf("Found at index %td\\n", found - nums);
    else printf("Not found\\n");
    return 0;
}`,
      hints: [
        'p is a pointer (address), target is an int (value).',
        'You need to compare the value at p: *p == target.',
        'Always dereference before comparing with a value.',
      ],
      concepts: ['pointer vs value comparison', 'dereference', 'linear search'],
    },
    {
      id: 'c-ptrarith-14',
      title: 'Pointer-based memcpy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Implement a simplified memcpy using pointer arithmetic.',
      skeleton: `// Write void *my_memcpy(void *dest, const void *src, size_t n)
// that copies n bytes from src to dest using char pointers.
// Return dest.`,
      solution: `#include <stdio.h>
#include <stddef.h>

void *my_memcpy(void *dest, const void *src, size_t n) {
    char *d = (char *)dest;
    const char *s = (const char *)src;
    for (size_t i = 0; i < n; i++) {
        d[i] = s[i];
    }
    return dest;
}

int main(void) {
    int src[] = {1, 2, 3, 4, 5};
    int dest[5];
    my_memcpy(dest, src, 5 * sizeof(int));
    for (int i = 0; i < 5; i++) printf("%d ", dest[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Cast void * to char * for byte-level copying.',
        'Copy one byte at a time in a loop.',
        'Return dest to allow chaining.',
      ],
      concepts: ['byte-level copy', 'void pointer cast', 'memcpy implementation'],
    },
    {
      id: 'c-ptrarith-15',
      title: 'Fill-blank pointer walk',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use pointer arithmetic to walk through a string.',
      skeleton: `#include <stdio.h>

size_t my_strlen(const char *s) {
    const char *p = s;
    while (*p __BLANK__ '\\0') {
        __BLANK__;
    }
    return __BLANK__;
}

int main(void) {
    printf("%zu\\n", my_strlen("Hello"));
    return 0;
}`,
      solution: `#include <stdio.h>

size_t my_strlen(const char *s) {
    const char *p = s;
    while (*p != '\\0') {
        p++;
    }
    return p - s;
}

int main(void) {
    printf("%zu\\n", my_strlen("Hello"));
    return 0;
}`,
      hints: [
        'Loop while *p is not the null terminator.',
        'Advance p with p++ each iteration.',
        'The length is the difference p - s.',
      ],
      concepts: ['string length', 'pointer walk', 'null terminator'],
    },
    {
      id: 'c-ptrarith-16',
      title: 'Refactor index to pointer',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Refactor index-based array access to pointer-based access.',
      skeleton: `#include <stdio.h>

void print_array(int arr[], int len) {
    for (int i = 0; i < len; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main(void) {
    int nums[] = {10, 20, 30, 40, 50};
    print_array(nums, 5);
    return 0;
}`,
      solution: `#include <stdio.h>

void print_array(int *begin, int *end) {
    for (int *p = begin; p < end; p++) {
        printf("%d ", *p);
    }
    printf("\\n");
}

int main(void) {
    int nums[] = {10, 20, 30, 40, 50};
    print_array(nums, nums + 5);
    return 0;
}`,
      hints: [
        'Replace arr[] and len with begin/end pointers.',
        'Use a pointer variable to iterate between begin and end.',
        'Call with print_array(nums, nums + 5).',
      ],
      concepts: ['begin/end pattern', 'pointer interface', 'refactoring'],
    },
    {
      id: 'c-ptrarith-17',
      title: 'Predict decrement operations',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output of pointer decrement and pre/post operations.',
      skeleton: `#include <stdio.h>

int main(void) {
    int arr[] = {10, 20, 30, 40, 50};
    int *p = arr + 4;
    printf("%d\\n", *p--);
    printf("%d\\n", *p);
    printf("%d\\n", *--p);
    printf("%d\\n", *p);
    return 0;
}`,
      solution: `50
40
30
30`,
      hints: [
        '*p-- uses post-decrement: dereference first (50), then move back.',
        'After post-decrement, p is at arr+3 so *p is 40.',
        '*--p pre-decrements to arr+2 then dereferences: 30.',
      ],
      concepts: ['post-decrement', 'pre-decrement', 'pointer expressions'],
    },
    {
      id: 'c-ptrarith-18',
      title: 'Refactor to use stride',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor to process every Nth element using pointer stride.',
      skeleton: `#include <stdio.h>

// Print every other element using index
void print_every_other(int arr[], int len) {
    for (int i = 0; i < len; i += 2) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main(void) {
    int nums[] = {1, 2, 3, 4, 5, 6, 7, 8};
    print_every_other(nums, 8);
    return 0;
}`,
      solution: `#include <stdio.h>

void print_every_other(int *begin, int *end, int stride) {
    for (int *p = begin; p < end; p += stride) {
        printf("%d ", *p);
    }
    printf("\\n");
}

int main(void) {
    int nums[] = {1, 2, 3, 4, 5, 6, 7, 8};
    print_every_other(nums, nums + 8, 2);
    return 0;
}`,
      hints: [
        'Use p += stride instead of p++ to skip elements.',
        'Pass the stride as a parameter for flexibility.',
        'The begin/end pattern still works with strides.',
      ],
      concepts: ['pointer stride', 'generalized traversal', 'step size'],
    },
    {
      id: 'c-ptrarith-19',
      title: 'Write binary search with pointers',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a binary search returning a pointer to the found element.',
      skeleton: `// Write int *binary_search(int *arr, int len, int target)
// that returns a pointer to the target element or NULL.
// Use pointer arithmetic for mid calculation.`,
      solution: `#include <stdio.h>

int *binary_search(int *arr, int len, int target) {
    int *lo = arr;
    int *hi = arr + len - 1;
    while (lo <= hi) {
        int *mid = lo + (hi - lo) / 2;
        if (*mid == target) return mid;
        else if (*mid < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return NULL;
}

int main(void) {
    int sorted[] = {2, 5, 8, 12, 16, 23, 38, 56};
    int *found = binary_search(sorted, 8, 23);
    if (found) printf("Found %d at index %td\\n", *found, found - sorted);
    else printf("Not found\\n");
    return 0;
}`,
      hints: [
        'Use lo and hi as pointers, compute mid = lo + (hi - lo) / 2.',
        'This avoids integer overflow that lo + hi could cause.',
        'Compare *mid to target to decide which half to search.',
      ],
      concepts: ['binary search', 'pointer midpoint', 'divide and conquer'],
    },
    {
      id: 'c-ptrarith-20',
      title: 'Fix invalid pointer subtraction',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Fix undefined behavior from subtracting unrelated pointers.',
      skeleton: `#include <stdio.h>

int main(void) {
    int a[] = {1, 2, 3};
    int b[] = {4, 5, 6};
    int *pa = &a[0];
    int *pb = &b[0];

    // Bug: subtracting pointers from different arrays is UB
    printf("Distance: %td\\n", pb - pa);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    int a[] = {1, 2, 3};
    int b[] = {4, 5, 6};
    int combined[6];
    memcpy(combined, a, sizeof(a));
    memcpy(combined + 3, b, sizeof(b));

    int *pa = &combined[0];
    int *pb = &combined[3];

    printf("Distance: %td\\n", pb - pa);
    return 0;
}`,
      hints: [
        'Pointer subtraction is only defined for pointers into the same array.',
        'Subtracting pointers from different arrays is undefined behavior.',
        'Combine into one array so the subtraction is valid.',
      ],
      concepts: ['undefined behavior', 'pointer provenance', 'valid subtraction'],
    },
  ],
};
