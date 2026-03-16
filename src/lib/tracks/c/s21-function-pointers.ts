import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-fnptr',
  title: '21. Function Pointers',
  explanation: `## Function Pointers

A function pointer stores the address of a function, allowing functions to be passed as arguments, stored in arrays, and called indirectly.

\`\`\`c
int add(int a, int b) { return a + b; }

// Declare a function pointer
int (*fp)(int, int) = add;
int result = fp(3, 4);  // calls add(3, 4) = 7
\`\`\`

### Key Concepts
- **Declaration**: \`return_type (*name)(param_types)\`
- **typedef**: \`typedef int (*BinOp)(int, int);\` simplifies syntax
- **Callbacks**: pass a function pointer as an argument
- **Dispatch tables**: arrays of function pointers for command routing
- **qsort**: standard library function that takes a comparator callback
`,
  exercises: [
    {
      id: 'c-fnptr-1',
      title: 'Declare function pointer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Declare and use a basic function pointer.',
      skeleton: `#include <stdio.h>

int square(int x) { return x * x; }

int main(void) {
    int (__BLANK__)(int) = square;
    printf("%d\\n", fp(5));
    return 0;
}`,
      solution: `#include <stdio.h>

int square(int x) { return x * x; }

int main(void) {
    int (*fp)(int) = square;
    printf("%d\\n", fp(5));
    return 0;
}`,
      hints: [
        'Function pointer syntax: return_type (*name)(param_types).',
        'The parentheses around *fp are required.',
        'fp(5) calls the function pointed to by fp.',
      ],
      concepts: ['function pointer declaration', 'indirect call'],
    },
    {
      id: 'c-fnptr-2',
      title: 'Assign function pointer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Assign different functions to the same function pointer.',
      skeleton: `#include <stdio.h>

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }

int main(void) {
    int (*op)(int, int);

    op = __BLANK__;
    printf("%d\\n", op(10, 3));

    op = __BLANK__;
    printf("%d\\n", op(10, 3));

    op = __BLANK__;
    printf("%d\\n", op(10, 3));

    return 0;
}`,
      solution: `#include <stdio.h>

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }

int main(void) {
    int (*op)(int, int);

    op = add;
    printf("%d\\n", op(10, 3));

    op = sub;
    printf("%d\\n", op(10, 3));

    op = mul;
    printf("%d\\n", op(10, 3));

    return 0;
}`,
      hints: [
        'A function name without () decays to a pointer to that function.',
        'Assign add, sub, or mul to op.',
        'Output: 13, 7, 30.',
      ],
      concepts: ['function pointer assignment', 'function name decay'],
    },
    {
      id: 'c-fnptr-3',
      title: 'Predict function pointer calls',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output of indirect function calls.',
      skeleton: `#include <stdio.h>

int dbl(int x) { return x * 2; }
int inc(int x) { return x + 1; }

int main(void) {
    int (*f)(int) = dbl;
    printf("%d\\n", f(5));
    f = inc;
    printf("%d\\n", f(5));
    printf("%d\\n", f(f(5)));
    return 0;
}`,
      solution: `10
6
7`,
      hints: [
        'dbl(5) = 10.',
        'inc(5) = 6.',
        'f(f(5)) = inc(inc(5)) = inc(6) = 7.',
      ],
      concepts: ['indirect call', 'function composition', 'predict output'],
    },
    {
      id: 'c-fnptr-4',
      title: 'Callback function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a function that accepts a callback and applies it to each element.',
      skeleton: `// Write void apply(int *arr, int n, int (*transform)(int))
// that applies the transform function to each element of arr in-place.`,
      solution: `#include <stdio.h>

void apply(int *arr, int n, int (*transform)(int)) {
    for (int i = 0; i < n; i++) {
        arr[i] = transform(arr[i]);
    }
}

int double_it(int x) { return x * 2; }
int negate(int x) { return -x; }

int main(void) {
    int nums[] = {1, 2, 3, 4, 5};
    int n = 5;

    apply(nums, n, double_it);
    for (int i = 0; i < n; i++) printf("%d ", nums[i]);
    printf("\\n");

    apply(nums, n, negate);
    for (int i = 0; i < n; i++) printf("%d ", nums[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Loop through the array and call transform(arr[i]).',
        'Store the result back: arr[i] = transform(arr[i]).',
        'The callback signature must match int (*)(int).',
      ],
      concepts: ['callback', 'higher-order function', 'array transformation'],
    },
    {
      id: 'c-fnptr-5',
      title: 'typedef for function pointers',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use typedef to simplify function pointer declarations.',
      skeleton: `#include <stdio.h>

__BLANK__ int (*MathOp)(int, int);

int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }

int compute(MathOp op, int x, int y) {
    return op(x, y);
}

int main(void) {
    printf("%d\\n", compute(add, 6, 7));
    printf("%d\\n", compute(mul, 6, 7));
    return 0;
}`,
      solution: `#include <stdio.h>

typedef int (*MathOp)(int, int);

int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }

int compute(MathOp op, int x, int y) {
    return op(x, y);
}

int main(void) {
    printf("%d\\n", compute(add, 6, 7));
    printf("%d\\n", compute(mul, 6, 7));
    return 0;
}`,
      hints: [
        'typedef creates an alias for the function pointer type.',
        'typedef int (*MathOp)(int, int); makes MathOp a type.',
        'Now you can use MathOp as a parameter type directly.',
      ],
      concepts: ['typedef', 'function pointer alias', 'cleaner syntax'],
    },
    {
      id: 'c-fnptr-6',
      title: 'Function pointer array',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Create an array of function pointers for a dispatch table.',
      skeleton: `#include <stdio.h>

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }
int divide(int a, int b) { return b != 0 ? a / b : 0; }

int main(void) {
    int (*ops[])(int, int) = { __BLANK__, __BLANK__, __BLANK__, __BLANK__ };
    const char *names[] = { "add", "sub", "mul", "div" };

    for (int i = 0; i < 4; i++) {
        printf("%s(10, 3) = %d\\n", names[i], ops[i](10, 3));
    }
    return 0;
}`,
      solution: `#include <stdio.h>

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }
int divide(int a, int b) { return b != 0 ? a / b : 0; }

int main(void) {
    int (*ops[])(int, int) = { add, sub, mul, divide };
    const char *names[] = { "add", "sub", "mul", "div" };

    for (int i = 0; i < 4; i++) {
        printf("%s(10, 3) = %d\\n", names[i], ops[i](10, 3));
    }
    return 0;
}`,
      hints: [
        'List the function names without parentheses in the initializer.',
        'Each element is a function pointer to one of the four functions.',
        'ops[i](10, 3) calls the i-th function.',
      ],
      concepts: ['function pointer array', 'dispatch table', 'indexed call'],
    },
    {
      id: 'c-fnptr-7',
      title: 'Predict dispatch table output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output of a dispatch table lookup.',
      skeleton: `#include <stdio.h>

int f0(int x) { return x; }
int f1(int x) { return x * x; }
int f2(int x) { return x * x * x; }

int main(void) {
    int (*table[])(int) = { f0, f1, f2 };
    for (int i = 0; i < 3; i++) {
        printf("%d\\n", table[i](3));
    }
    return 0;
}`,
      solution: `3
9
27`,
      hints: [
        'table[0](3) calls f0(3) = 3.',
        'table[1](3) calls f1(3) = 9.',
        'table[2](3) calls f2(3) = 27.',
      ],
      concepts: ['dispatch table', 'indexed function call', 'predict output'],
    },
    {
      id: 'c-fnptr-8',
      title: 'qsort comparator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a comparator function for qsort to sort integers.',
      skeleton: `// Write int cmp_asc(const void *a, const void *b) for ascending order.
// Write int cmp_desc(const void *a, const void *b) for descending order.
// Use them with qsort.`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int cmp_asc(const void *a, const void *b) {
    return *(const int *)a - *(const int *)b;
}

int cmp_desc(const void *a, const void *b) {
    return *(const int *)b - *(const int *)a;
}

int main(void) {
    int arr[] = {5, 2, 8, 1, 9, 3};
    int n = sizeof(arr) / sizeof(arr[0]);

    qsort(arr, n, sizeof(int), cmp_asc);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    qsort(arr, n, sizeof(int), cmp_desc);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Cast void* to const int* and dereference to compare.',
        'Return negative if a < b, 0 if equal, positive if a > b.',
        'Swap the operands for descending order.',
      ],
      concepts: ['qsort', 'comparator callback', 'void pointer cast'],
    },
    {
      id: 'c-fnptr-9',
      title: 'Fix missing dereference',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the comparator that forgets to dereference the void pointers.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

int compare(const void *a, const void *b) {
    // Bug: comparing pointer addresses, not values
    return (int)a - (int)b;
}

int main(void) {
    int arr[] = {30, 10, 20};
    qsort(arr, 3, sizeof(int), compare);
    for (int i = 0; i < 3; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int compare(const void *a, const void *b) {
    return *(const int *)a - *(const int *)b;
}

int main(void) {
    int arr[] = {30, 10, 20};
    qsort(arr, 3, sizeof(int), compare);
    for (int i = 0; i < 3; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'The void pointers point to array elements, not the values themselves.',
        'Cast to (const int *) then dereference with *.',
        'Without dereferencing, you compare memory addresses.',
      ],
      concepts: ['void pointer dereference', 'comparator bug', 'qsort'],
    },
    {
      id: 'c-fnptr-10',
      title: 'Generic filter with callback',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a filter function that uses a predicate callback.',
      skeleton: `// Write int filter(const int *src, int n, int *dst, int (*predicate)(int))
// that copies elements where predicate returns non-zero into dst.
// Return the count of copied elements.`,
      solution: `#include <stdio.h>

int filter(const int *src, int n, int *dst, int (*predicate)(int)) {
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (predicate(src[i])) {
            dst[count++] = src[i];
        }
    }
    return count;
}

int is_even(int x) { return x % 2 == 0; }
int is_positive(int x) { return x > 0; }

int main(void) {
    int nums[] = {-3, 4, -1, 6, 0, 7, -2, 8};
    int out[8];
    int n;

    n = filter(nums, 8, out, is_even);
    printf("Even:");
    for (int i = 0; i < n; i++) printf(" %d", out[i]);
    printf("\\n");

    n = filter(nums, 8, out, is_positive);
    printf("Positive:");
    for (int i = 0; i < n; i++) printf(" %d", out[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Loop through src, call predicate on each element.',
        'If predicate returns non-zero, copy to dst[count++].',
        'Return the total count of matching elements.',
      ],
      concepts: ['filter', 'predicate callback', 'generic algorithm'],
    },
    {
      id: 'c-fnptr-11',
      title: 'Fill-blank qsort strings',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete a comparator to sort an array of strings with qsort.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int cmp_str(const void *a, const void *b) {
    return strcmp(*(const __BLANK__ *)a, *(const __BLANK__ *)b);
}

int main(void) {
    const char *words[] = {"banana", "apple", "cherry"};
    qsort(words, 3, sizeof(char *), __BLANK__);
    for (int i = 0; i < 3; i++) printf("%s\\n", words[i]);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int cmp_str(const void *a, const void *b) {
    return strcmp(*(const char **)a, *(const char **)b);
}

int main(void) {
    const char *words[] = {"banana", "apple", "cherry"};
    qsort(words, 3, sizeof(char *), cmp_str);
    for (int i = 0; i < 3; i++) printf("%s\\n", words[i]);
    return 0;
}`,
      hints: [
        'qsort passes pointers to elements; elements are char*, so pointers to char*.',
        'Cast to const char ** and dereference to get the string.',
        'Pass cmp_str as the comparator.',
      ],
      concepts: ['qsort strings', 'pointer to pointer', 'strcmp comparator'],
    },
    {
      id: 'c-fnptr-12',
      title: 'Fix wrong function pointer signature',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix a function pointer with the wrong parameter types.',
      skeleton: `#include <stdio.h>

typedef void (*PrintFunc)(int);

void print_int(int x) {
    printf("Value: %d\\n", x);
}

void print_hex(int x) {
    printf("Hex: 0x%X\\n", x);
}

// Bug: wrong signature - takes char* instead of int
void apply_print(const char *label, int val, PrintFunc fn) {
    printf("%s: ", label);
    fn(label);  // Bug: passing label (char*) instead of val (int)
}

int main(void) {
    apply_print("Decimal", 255, print_int);
    apply_print("Hex", 255, print_hex);
    return 0;
}`,
      solution: `#include <stdio.h>

typedef void (*PrintFunc)(int);

void print_int(int x) {
    printf("Value: %d\\n", x);
}

void print_hex(int x) {
    printf("Hex: 0x%X\\n", x);
}

void apply_print(const char *label, int val, PrintFunc fn) {
    printf("%s: ", label);
    fn(val);
}

int main(void) {
    apply_print("Decimal", 255, print_int);
    apply_print("Hex", 255, print_hex);
    return 0;
}`,
      hints: [
        'The callback expects an int, but label is a char*.',
        'Pass val instead of label to fn().',
        'The function pointer type PrintFunc takes int, not char*.',
      ],
      concepts: ['type mismatch', 'callback argument', 'function pointer signature'],
    },
    {
      id: 'c-fnptr-13',
      title: 'Predict callback chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output when callbacks are chained.',
      skeleton: `#include <stdio.h>

int apply(int x, int (*f)(int)) { return f(x); }
int add3(int x) { return x + 3; }
int mul2(int x) { return x * 2; }

int main(void) {
    int val = 5;
    val = apply(val, add3);
    printf("%d\\n", val);
    val = apply(val, mul2);
    printf("%d\\n", val);
    val = apply(apply(val, add3), mul2);
    printf("%d\\n", val);
    return 0;
}`,
      solution: `8
16
38`,
      hints: [
        'apply(5, add3) = 5 + 3 = 8.',
        'apply(8, mul2) = 8 * 2 = 16.',
        'apply(apply(16, add3), mul2) = apply(19, mul2) = 38.',
      ],
      concepts: ['function chaining', 'callback composition', 'predict output'],
    },
    {
      id: 'c-fnptr-14',
      title: 'Write map function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a map function that creates a new array by applying a transformation.',
      skeleton: `// Write void map(const int *src, int *dst, int n, int (*fn)(int))
// that applies fn to each element of src and stores results in dst.`,
      solution: `#include <stdio.h>
#include <stdlib.h>

void map(const int *src, int *dst, int n, int (*fn)(int)) {
    for (int i = 0; i < n; i++) {
        dst[i] = fn(src[i]);
    }
}

int square(int x) { return x * x; }
int abs_val(int x) { return x < 0 ? -x : x; }

int main(void) {
    int nums[] = {-3, 1, -4, 1, 5};
    int result[5];

    map(nums, result, 5, square);
    for (int i = 0; i < 5; i++) printf("%d ", result[i]);
    printf("\\n");

    map(nums, result, 5, abs_val);
    for (int i = 0; i < 5; i++) printf("%d ", result[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Loop i from 0 to n-1, set dst[i] = fn(src[i]).',
        'src is const because map should not modify the source.',
        'The caller must ensure dst has enough space.',
      ],
      concepts: ['map', 'functional pattern', 'callback transformation'],
    },
    {
      id: 'c-fnptr-15',
      title: 'Write reduce function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a reduce/fold function using a binary callback.',
      skeleton: `// Write int reduce(const int *arr, int n, int init, int (*combine)(int, int))
// that folds the array into a single value starting from init.`,
      solution: `#include <stdio.h>

int reduce(const int *arr, int n, int init, int (*combine)(int, int)) {
    int acc = init;
    for (int i = 0; i < n; i++) {
        acc = combine(acc, arr[i]);
    }
    return acc;
}

int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }
int max(int a, int b) { return a > b ? a : b; }

int main(void) {
    int nums[] = {1, 2, 3, 4, 5};
    printf("Sum: %d\\n", reduce(nums, 5, 0, add));
    printf("Product: %d\\n", reduce(nums, 5, 1, mul));
    printf("Max: %d\\n", reduce(nums, 5, nums[0], max));
    return 0;
}`,
      hints: [
        'Start with acc = init, then acc = combine(acc, arr[i]) for each element.',
        'Sum uses init=0, product uses init=1.',
        'This is the fold/reduce pattern from functional programming.',
      ],
      concepts: ['reduce', 'fold', 'accumulator', 'binary callback'],
    },
    {
      id: 'c-fnptr-16',
      title: 'Fix comparator overflow',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Fix a comparator that overflows when subtracting large values.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

// Bug: a - b can overflow for large values
int compare(const void *a, const void *b) {
    return *(const int *)a - *(const int *)b;
}

int main(void) {
    int arr[] = {2147483647, -2147483648, 0, 100};
    qsort(arr, 4, sizeof(int), compare);
    for (int i = 0; i < 4; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int compare(const void *a, const void *b) {
    int va = *(const int *)a;
    int vb = *(const int *)b;
    return (va > vb) - (va < vb);
}

int main(void) {
    int arr[] = {2147483647, -2147483648, 0, 100};
    qsort(arr, 4, sizeof(int), compare);
    for (int i = 0; i < 4; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'INT_MAX - INT_MIN overflows signed int.',
        'Use (a > b) - (a < b) pattern instead of subtraction.',
        'This returns -1, 0, or 1 without overflow risk.',
      ],
      concepts: ['integer overflow', 'safe comparator', 'qsort'],
    },
    {
      id: 'c-fnptr-17',
      title: 'Refactor switch to dispatch table',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Replace a switch statement with a function pointer dispatch table.',
      skeleton: `#include <stdio.h>

void cmd_help(void)  { printf("Showing help\\n"); }
void cmd_list(void)  { printf("Listing items\\n"); }
void cmd_quit(void)  { printf("Quitting\\n"); }

void execute(int cmd) {
    switch (cmd) {
        case 0: cmd_help(); break;
        case 1: cmd_list(); break;
        case 2: cmd_quit(); break;
        default: printf("Unknown command\\n");
    }
}

int main(void) {
    execute(0);
    execute(1);
    execute(2);
    return 0;
}`,
      solution: `#include <stdio.h>

void cmd_help(void)  { printf("Showing help\\n"); }
void cmd_list(void)  { printf("Listing items\\n"); }
void cmd_quit(void)  { printf("Quitting\\n"); }

typedef void (*CmdFunc)(void);

static const CmdFunc dispatch[] = { cmd_help, cmd_list, cmd_quit };
static const int NUM_CMDS = sizeof(dispatch) / sizeof(dispatch[0]);

void execute(int cmd) {
    if (cmd >= 0 && cmd < NUM_CMDS) {
        dispatch[cmd]();
    } else {
        printf("Unknown command\\n");
    }
}

int main(void) {
    execute(0);
    execute(1);
    execute(2);
    return 0;
}`,
      hints: [
        'Create an array of function pointers indexed by command number.',
        'Use typedef to simplify the function pointer array declaration.',
        'Bounds-check the index before calling.',
      ],
      concepts: ['dispatch table', 'refactor switch', 'function pointer array'],
    },
    {
      id: 'c-fnptr-18',
      title: 'Refactor repeated logic with callback',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Extract duplicated loop logic into a generic function with a callback.',
      skeleton: `#include <stdio.h>

void print_evens(const int *arr, int n) {
    for (int i = 0; i < n; i++) {
        if (arr[i] % 2 == 0) printf("%d ", arr[i]);
    }
    printf("\\n");
}

void print_positives(const int *arr, int n) {
    for (int i = 0; i < n; i++) {
        if (arr[i] > 0) printf("%d ", arr[i]);
    }
    printf("\\n");
}

void print_big(const int *arr, int n) {
    for (int i = 0; i < n; i++) {
        if (arr[i] > 100) printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main(void) {
    int nums[] = {-50, 200, 3, 42, -7, 150};
    print_evens(nums, 6);
    print_positives(nums, 6);
    print_big(nums, 6);
    return 0;
}`,
      solution: `#include <stdio.h>

typedef int (*Predicate)(int);

void print_matching(const int *arr, int n, Predicate pred) {
    for (int i = 0; i < n; i++) {
        if (pred(arr[i])) printf("%d ", arr[i]);
    }
    printf("\\n");
}

int is_even(int x) { return x % 2 == 0; }
int is_positive(int x) { return x > 0; }
int is_big(int x) { return x > 100; }

int main(void) {
    int nums[] = {-50, 200, 3, 42, -7, 150};
    print_matching(nums, 6, is_even);
    print_matching(nums, 6, is_positive);
    print_matching(nums, 6, is_big);
    return 0;
}`,
      hints: [
        'All three functions have the same loop structure, just different conditions.',
        'Extract the condition into a callback parameter.',
        'typedef int (*Predicate)(int) makes the signature cleaner.',
      ],
      concepts: ['DRY principle', 'predicate callback', 'refactor duplication'],
    },
    {
      id: 'c-fnptr-19',
      title: 'Return a function pointer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a function that returns a function pointer based on an operator character.',
      skeleton: `// Write a function get_op that takes a char (+, -, *, /)
// and returns a function pointer to the corresponding operation.
// Signature: int (*get_op(char op))(int, int)
// Or use typedef.`,
      solution: `#include <stdio.h>

typedef int (*BinOp)(int, int);

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }
int divide(int a, int b) { return b != 0 ? a / b : 0; }

BinOp get_op(char op) {
    switch (op) {
        case '+': return add;
        case '-': return sub;
        case '*': return mul;
        case '/': return divide;
        default:  return NULL;
    }
}

int main(void) {
    char ops[] = {'+', '-', '*', '/'};
    for (int i = 0; i < 4; i++) {
        BinOp fn = get_op(ops[i]);
        if (fn) {
            printf("20 %c 4 = %d\\n", ops[i], fn(20, 4));
        }
    }
    return 0;
}`,
      hints: [
        'Use typedef to define BinOp as int (*)(int, int).',
        'Switch on the operator character to return the right function.',
        'Return NULL for unknown operators and check before calling.',
      ],
      concepts: ['return function pointer', 'factory pattern', 'typedef'],
    },
    {
      id: 'c-fnptr-20',
      title: 'Predict nested function pointer calls',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Predict output with nested indirect calls and function pointer arrays.',
      skeleton: `#include <stdio.h>

typedef int (*UnaryOp)(int);

int dbl(int x)  { return x * 2; }
int inc(int x)  { return x + 1; }
int sqr(int x)  { return x * x; }

int pipeline(int val, UnaryOp *ops, int n) {
    for (int i = 0; i < n; i++) {
        val = ops[i](val);
    }
    return val;
}

int main(void) {
    UnaryOp chain1[] = { dbl, inc };
    UnaryOp chain2[] = { inc, dbl, sqr };
    printf("%d\\n", pipeline(3, chain1, 2));
    printf("%d\\n", pipeline(3, chain2, 3));
    return 0;
}`,
      solution: `7
64`,
      hints: [
        'chain1: dbl(3)=6, inc(6)=7.',
        'chain2: inc(3)=4, dbl(4)=8, sqr(8)=64.',
        'pipeline applies each function in sequence.',
      ],
      concepts: ['pipeline pattern', 'function composition', 'predict output'],
    },
  ],
};
