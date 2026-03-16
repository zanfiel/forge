import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-arr',
  title: '8. Arrays',
  explanation: `## Arrays in C

Arrays store a fixed-size sequence of elements of the same type.

\`\`\`c
int nums[5] = {10, 20, 30, 40, 50};
int first = nums[0];   // 10
int len = sizeof(nums) / sizeof(nums[0]);  // 5
\`\`\`

### Key Concepts
- Arrays are zero-indexed
- No bounds checking -- out-of-bounds access is undefined behavior
- Array names decay to pointers when passed to functions
- Multi-dimensional arrays: \`int matrix[3][4];\`
- Variable-Length Arrays (VLA) supported in C99 but optional in C11
- sizeof(array) gives total bytes, sizeof(array)/sizeof(array[0]) gives element count
`,
  exercises: [
    {
      id: 'c-arr-1',
      title: 'Declare and initialize',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Declare and initialize an integer array.',
      skeleton: `#include <stdio.h>

int main(void) {
    __BLANK__ nums[5] = {10, 20, 30, 40, 50};
    printf("First: %d\\n", nums[__BLANK__]);
    printf("Last: %d\\n", nums[__BLANK__]);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int nums[5] = {10, 20, 30, 40, 50};
    printf("First: %d\\n", nums[0]);
    printf("Last: %d\\n", nums[4]);
    return 0;
}`,
      hints: [
        'Arrays use the element type followed by [size].',
        'First element is at index 0.',
        'Last element of a size-5 array is at index 4.',
      ],
      concepts: ['array declaration', 'initialization', 'zero indexing'],
    },
    {
      id: 'c-arr-2',
      title: 'Array size with sizeof',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Calculate array length using sizeof.',
      skeleton: `#include <stdio.h>

int main(void) {
    int arr[] = {1, 2, 3, 4, 5, 6, 7};
    int len = __BLANK__(arr) / __BLANK__(arr[0]);
    printf("Length: %d\\n", len);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int arr[] = {1, 2, 3, 4, 5, 6, 7};
    int len = sizeof(arr) / sizeof(arr[0]);
    printf("Length: %d\\n", len);
    return 0;
}`,
      hints: [
        'sizeof(arr) gives total bytes of the array.',
        'sizeof(arr[0]) gives bytes of one element.',
        'Dividing total by element size gives the count.',
      ],
      concepts: ['sizeof array', 'array length', 'element count'],
    },
    {
      id: 'c-arr-3',
      title: 'Iterate and sum',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a function that sums all elements of an integer array.',
      skeleton: `// Write int sum(int arr[], int len) that returns the sum of all elements.`,
      solution: `#include <stdio.h>

int sum(int arr[], int len) {
    int total = 0;
    for (int i = 0; i < len; i++) {
        total += arr[i];
    }
    return total;
}

int main(void) {
    int nums[] = {1, 2, 3, 4, 5};
    printf("Sum: %d\\n", sum(nums, 5));
    return 0;
}`,
      hints: [
        'Initialize a total variable to 0.',
        'Loop through each index and add arr[i] to total.',
        'Arrays decay to pointers in function parameters.',
      ],
      concepts: ['array iteration', 'accumulator', 'array parameter'],
    },
    {
      id: 'c-arr-4',
      title: 'Multi-dimensional array',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Declare and access a 2D array (matrix).',
      skeleton: `#include <stdio.h>

int main(void) {
    int matrix[__BLANK__][__BLANK__] = {
        {1, 2, 3},
        {4, 5, 6}
    };

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", matrix[__BLANK__][__BLANK__]);
        }
        printf("\\n");
    }
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int matrix[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }
    return 0;
}`,
      hints: [
        '2 rows and 3 columns: int matrix[2][3].',
        'Access with matrix[row][col].',
        'Outer loop for rows (i), inner loop for columns (j).',
      ],
      concepts: ['2D array', 'matrix', 'nested loops'],
    },
    {
      id: 'c-arr-5',
      title: 'Predict array decay',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the sizeof values showing array decay.',
      skeleton: `#include <stdio.h>

void show_size(int arr[]) {
    printf("In function: %zu\\n", sizeof(arr));
}

int main(void) {
    int nums[5] = {1, 2, 3, 4, 5};
    printf("In main: %zu\\n", sizeof(nums));
    show_size(nums);
    return 0;
}`,
      solution: `In main: 20
In function: 8`,
      hints: [
        'sizeof(nums) in main gives the full array size: 5 * 4 = 20 bytes.',
        'When passed to a function, the array decays to a pointer.',
        'sizeof(arr) in the function gives the pointer size: 8 on 64-bit.',
      ],
      concepts: ['array decay', 'sizeof in function', 'pointer size'],
    },
    {
      id: 'c-arr-6',
      title: 'Reverse an array',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that reverses an array in-place.',
      skeleton: `// Write void reverse(int arr[], int len) that reverses the array in-place.
// Use two pointers/indices swapping from both ends.`,
      solution: `#include <stdio.h>

void reverse(int arr[], int len) {
    for (int i = 0, j = len - 1; i < j; i++, j--) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

int main(void) {
    int nums[] = {1, 2, 3, 4, 5};
    reverse(nums, 5);
    for (int i = 0; i < 5; i++) {
        printf("%d ", nums[i]);
    }
    printf("\\n");
    return 0;
}`,
      hints: [
        'Use two indices: i from start, j from end.',
        'Swap arr[i] and arr[j], then move both inward.',
        'Stop when i >= j.',
      ],
      concepts: ['array reversal', 'two-pointer technique', 'in-place swap'],
    },
    {
      id: 'c-arr-7',
      title: 'Partial initialization',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the values of a partially initialized array.',
      skeleton: `#include <stdio.h>

int main(void) {
    int arr[5] = {10, 20};
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,
      solution: `10 20 0 0 0 `,
      hints: [
        'When fewer initializers are provided than elements, the rest are zero.',
        'arr[0] = 10, arr[1] = 20, arr[2..4] = 0.',
        'This is guaranteed by the C standard for partial initialization.',
      ],
      concepts: ['partial initialization', 'zero initialization', 'default values'],
    },
    {
      id: 'c-arr-8',
      title: 'Fix out-of-bounds access',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the array access that goes out of bounds.',
      skeleton: `#include <stdio.h>

void print_array(int arr[], int len) {
    for (int i = 0; i <= len; i++) {  // Bug: should be < len
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main(void) {
    int nums[] = {1, 2, 3, 4, 5};
    print_array(nums, 5);
    return 0;
}`,
      solution: `#include <stdio.h>

void print_array(int arr[], int len) {
    for (int i = 0; i < len; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main(void) {
    int nums[] = {1, 2, 3, 4, 5};
    print_array(nums, 5);
    return 0;
}`,
      hints: [
        'Valid indices for len=5 are 0,1,2,3,4.',
        'i <= len accesses index 5, which is out of bounds.',
        'Change <= to < for the correct range.',
      ],
      concepts: ['bounds checking', 'off-by-one', 'undefined behavior'],
    },
    {
      id: 'c-arr-9',
      title: 'Designated initializers',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use C99 designated initializers to set specific indices.',
      skeleton: `#include <stdio.h>

int main(void) {
    int arr[10] = {
        [0] = 1,
        __BLANK__ = 50,
        __BLANK__ = 99
    };

    printf("arr[0]=%d arr[5]=%d arr[9]=%d arr[3]=%d\\n",
           arr[0], arr[5], arr[9], arr[3]);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int arr[10] = {
        [0] = 1,
        [5] = 50,
        [9] = 99
    };

    printf("arr[0]=%d arr[5]=%d arr[9]=%d arr[3]=%d\\n",
           arr[0], arr[5], arr[9], arr[3]);
    return 0;
}`,
      hints: [
        'Designated initializers use [index] = value syntax.',
        '[5] = 50 sets arr[5] to 50.',
        'Uninitialized elements default to 0.',
      ],
      concepts: ['designated initializers', 'C99 feature', 'sparse initialization'],
    },
    {
      id: 'c-arr-10',
      title: 'Array of strings',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a program using an array of string pointers.',
      skeleton: `// Write a program that:
// 1. Creates an array of 5 day names (Mon-Fri) using const char *
// 2. Prints each day with its number (1-based)`,
      solution: `#include <stdio.h>

int main(void) {
    const char *days[] = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday"};
    int len = sizeof(days) / sizeof(days[0]);

    for (int i = 0; i < len; i++) {
        printf("%d. %s\\n", i + 1, days[i]);
    }
    return 0;
}`,
      hints: [
        'An array of strings is const char *days[].',
        'Each element is a pointer to a string literal.',
        'Print with %s and index i + 1 for 1-based numbering.',
      ],
      concepts: ['string array', 'pointer array', 'string literals'],
    },
    {
      id: 'c-arr-11',
      title: 'Copy array',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a function that copies one array into another.',
      skeleton: `// Write void copy_array(int dest[], const int src[], int len)
// that copies len elements from src to dest.`,
      solution: `#include <stdio.h>

void copy_array(int dest[], const int src[], int len) {
    for (int i = 0; i < len; i++) {
        dest[i] = src[i];
    }
}

int main(void) {
    int original[] = {1, 2, 3, 4, 5};
    int copy[5];
    copy_array(copy, original, 5);

    for (int i = 0; i < 5; i++) {
        printf("%d ", copy[i]);
    }
    printf("\\n");
    return 0;
}`,
      hints: [
        'Loop through and copy each element.',
        'Use const for the source to prevent accidental modification.',
        'The destination must have enough space for len elements.',
      ],
      concepts: ['array copy', 'const parameter', 'element-wise copy'],
    },
    {
      id: 'c-arr-12',
      title: 'Find element',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a function that searches for a value in an array and returns its index.',
      skeleton: `// Write int find(int arr[], int len, int target)
// Returns the index of target, or -1 if not found.`,
      solution: `#include <stdio.h>

int find(int arr[], int len, int target) {
    for (int i = 0; i < len; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

int main(void) {
    int nums[] = {10, 20, 30, 40, 50};
    printf("30 at index: %d\\n", find(nums, 5, 30));
    printf("99 at index: %d\\n", find(nums, 5, 99));
    return 0;
}`,
      hints: [
        'Linear search: check each element.',
        'Return i as soon as a match is found.',
        'Return -1 if the loop completes without finding target.',
      ],
      concepts: ['linear search', 'sentinel return', 'array search'],
    },
    {
      id: 'c-arr-13',
      title: 'Fix array assignment',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the code that tries to assign arrays directly.',
      skeleton: `#include <stdio.h>
#include <string.h>

int main(void) {
    int a[] = {1, 2, 3};
    int b[3];

    b = a;  // Bug: cannot assign arrays in C

    for (int i = 0; i < 3; i++) {
        printf("%d ", b[i]);
    }
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    int a[] = {1, 2, 3};
    int b[3];

    memcpy(b, a, sizeof(a));

    for (int i = 0; i < 3; i++) {
        printf("%d ", b[i]);
    }
    printf("\\n");
    return 0;
}`,
      hints: [
        'You cannot assign one array to another with = in C.',
        'Use memcpy to copy the raw bytes from a to b.',
        'memcpy(dest, src, num_bytes) from string.h.',
      ],
      concepts: ['array assignment', 'memcpy', 'array copy'],
    },
    {
      id: 'c-arr-14',
      title: 'Predict 2D array indexing',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output of 2D array access patterns.',
      skeleton: `#include <stdio.h>

int main(void) {
    int m[2][3] = {{1, 2, 3}, {4, 5, 6}};
    printf("%d\\n", m[0][2]);
    printf("%d\\n", m[1][0]);
    printf("%d\\n", *(*(m + 1) + 2));
    return 0;
}`,
      solution: `3
4
6`,
      hints: [
        'm[0][2] is row 0, column 2 = 3.',
        'm[1][0] is row 1, column 0 = 4.',
        '*(*(m+1)+2) is equivalent to m[1][2] = 6.',
      ],
      concepts: ['2D array access', 'pointer arithmetic', 'row-major order'],
    },
    {
      id: 'c-arr-15',
      title: 'Zero an array',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Zero out an array using different methods.',
      skeleton: `#include <stdio.h>
#include <string.h>

int main(void) {
    // Method 1: initialization
    int a[5] = __BLANK__;

    // Method 2: memset
    int b[5];
    __BLANK__(b, 0, sizeof(b));

    // Method 3: loop
    int c[5];
    for (int i = 0; i < 5; i++) {
        c[i] = __BLANK__;
    }
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    // Method 1: initialization
    int a[5] = {0};

    // Method 2: memset
    int b[5];
    memset(b, 0, sizeof(b));

    // Method 3: loop
    int c[5];
    for (int i = 0; i < 5; i++) {
        c[i] = 0;
    }
    return 0;
}`,
      hints: [
        '{0} initializes the first element to 0, rest follow as 0.',
        'memset(b, 0, sizeof(b)) sets all bytes to zero.',
        'A loop can also set each element to 0 explicitly.',
      ],
      concepts: ['zero initialization', 'memset', 'array clearing'],
    },
    {
      id: 'c-arr-16',
      title: 'Matrix transpose',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that transposes a 3x3 matrix.',
      skeleton: `// Write void transpose(int m[3][3]) that transposes a 3x3 matrix in-place.
// Swap m[i][j] with m[j][i] for i < j.`,
      solution: `#include <stdio.h>

void transpose(int m[3][3]) {
    for (int i = 0; i < 3; i++) {
        for (int j = i + 1; j < 3; j++) {
            int temp = m[i][j];
            m[i][j] = m[j][i];
            m[j][i] = temp;
        }
    }
}

void print_matrix(int m[3][3]) {
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%2d ", m[i][j]);
        }
        printf("\\n");
    }
}

int main(void) {
    int m[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    printf("Original:\\n");
    print_matrix(m);
    transpose(m);
    printf("Transposed:\\n");
    print_matrix(m);
    return 0;
}`,
      hints: [
        'Transpose swaps rows and columns: m[i][j] <-> m[j][i].',
        'Only swap above the diagonal (j = i+1) to avoid double-swapping.',
        'Use a temp variable for the swap.',
      ],
      concepts: ['matrix transpose', '2D array manipulation', 'in-place algorithm'],
    },
    {
      id: 'c-arr-17',
      title: 'VLA basics',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use a Variable Length Array (VLA) with a runtime size.',
      skeleton: `#include <stdio.h>

void fill_and_print(int n) {
    int arr[__BLANK__];  // VLA with runtime size
    for (int i = 0; i < n; i++) {
        arr[i] = i * i;
    }
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main(void) {
    fill_and_print(5);
    fill_and_print(3);
    return 0;
}`,
      solution: `#include <stdio.h>

void fill_and_print(int n) {
    int arr[n];  // VLA with runtime size
    for (int i = 0; i < n; i++) {
        arr[i] = i * i;
    }
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main(void) {
    fill_and_print(5);
    fill_and_print(3);
    return 0;
}`,
      hints: [
        'VLAs use a variable for the size: int arr[n].',
        'The size is determined at runtime, not compile time.',
        'VLAs are allocated on the stack -- be careful with large sizes.',
      ],
      concepts: ['VLA', 'variable length array', 'C99', 'stack allocation'],
    },
    {
      id: 'c-arr-18',
      title: 'Refactor parallel arrays to struct',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor parallel arrays into an array of structs.',
      skeleton: `#include <stdio.h>

int main(void) {
    char *names[] = {"Alice", "Bob", "Charlie"};
    int ages[] = {25, 30, 35};
    float gpas[] = {3.8f, 3.5f, 3.9f};

    for (int i = 0; i < 3; i++) {
        printf("%s: age %d, GPA %.1f\\n", names[i], ages[i], gpas[i]);
    }
    return 0;
}`,
      solution: `#include <stdio.h>

typedef struct {
    const char *name;
    int age;
    float gpa;
} Student;

int main(void) {
    Student students[] = {
        {"Alice", 25, 3.8f},
        {"Bob", 30, 3.5f},
        {"Charlie", 35, 3.9f}
    };
    int len = sizeof(students) / sizeof(students[0]);

    for (int i = 0; i < len; i++) {
        printf("%s: age %d, GPA %.1f\\n",
               students[i].name, students[i].age, students[i].gpa);
    }
    return 0;
}`,
      hints: [
        'Parallel arrays are fragile -- adding a student requires updating all three.',
        'A struct groups related data together.',
        'An array of structs is more maintainable.',
      ],
      concepts: ['struct', 'parallel arrays', 'data organization'],
    },
    {
      id: 'c-arr-19',
      title: 'Refactor magic sizes',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Refactor hardcoded array sizes into a macro.',
      skeleton: `#include <stdio.h>

int main(void) {
    int scores[10];
    for (int i = 0; i < 10; i++) {
        scores[i] = (i + 1) * 10;
    }
    int sum = 0;
    for (int i = 0; i < 10; i++) {
        sum += scores[i];
    }
    printf("Average: %d\\n", sum / 10);
    return 0;
}`,
      solution: `#include <stdio.h>

#define NUM_SCORES 10

int main(void) {
    int scores[NUM_SCORES];
    for (int i = 0; i < NUM_SCORES; i++) {
        scores[i] = (i + 1) * 10;
    }
    int sum = 0;
    for (int i = 0; i < NUM_SCORES; i++) {
        sum += scores[i];
    }
    printf("Average: %d\\n", sum / NUM_SCORES);
    return 0;
}`,
      hints: [
        'The number 10 appears four times and must stay in sync.',
        'Define a macro: #define NUM_SCORES 10.',
        'Replace all occurrences of 10 (as array size) with NUM_SCORES.',
      ],
      concepts: ['macro constant', 'array size', 'maintainability'],
    },
    {
      id: 'c-arr-20',
      title: 'Predict compound literal',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Predict the output using compound literals as array arguments.',
      skeleton: `#include <stdio.h>

int sum(int arr[], int len) {
    int total = 0;
    for (int i = 0; i < len; i++) total += arr[i];
    return total;
}

int main(void) {
    printf("%d\\n", sum((int[]){1, 2, 3}, 3));
    printf("%d\\n", sum((int[]){10, 20}, 2));
    return 0;
}`,
      solution: `6
30`,
      hints: [
        'Compound literals (int[]){1,2,3} create temporary arrays.',
        'sum of {1,2,3} = 6.',
        'sum of {10,20} = 30.',
      ],
      concepts: ['compound literals', 'temporary arrays', 'C99 feature'],
    },
  ],
};
