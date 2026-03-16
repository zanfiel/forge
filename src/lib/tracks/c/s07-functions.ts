import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-fn',
  title: '7. Functions',
  explanation: `## Functions in C

Functions encapsulate reusable logic. Every C program has at least one function: \`main\`.

\`\`\`c
// Declaration (prototype)
int add(int a, int b);

// Definition
int add(int a, int b) {
    return a + b;
}
\`\`\`

### Key Concepts
- **Prototype**: declares the function signature before use
- **Parameters**: passed by value (copies)
- **Return type**: void means no return value
- **Recursion**: a function calling itself
- Functions must be declared before they are called (or defined before)
`,
  exercises: [
    {
      id: 'c-fn-1',
      title: 'Function declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete the function prototype and definition.',
      skeleton: `#include <stdio.h>

// Prototype
__BLANK__ square(__BLANK__ n);

int main(void) {
    printf("%d\\n", square(5));
    return 0;
}

// Definition
int square(int n) {
    __BLANK__ n * n;
}`,
      solution: `#include <stdio.h>

// Prototype
int square(int n);

int main(void) {
    printf("%d\\n", square(5));
    return 0;
}

// Definition
int square(int n) {
    return n * n;
}`,
      hints: [
        'The return type of the function is int.',
        'The parameter type is int.',
        'Use return to send the result back to the caller.',
      ],
      concepts: ['function prototype', 'function definition', 'return statement'],
    },
    {
      id: 'c-fn-2',
      title: 'Void function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete a function that returns nothing.',
      skeleton: `#include <stdio.h>

__BLANK__ greet(const char *name) {
    printf("Hello, %s!\\n", name);
}

int main(void) {
    greet("World");
    return 0;
}`,
      solution: `#include <stdio.h>

void greet(const char *name) {
    printf("Hello, %s!\\n", name);
}

int main(void) {
    greet("World");
    return 0;
}`,
      hints: [
        'Functions that do not return a value use void as the return type.',
        'void functions can use return; (without a value) or just end.',
        'void greet(const char *name) takes a string parameter.',
      ],
      concepts: ['void return type', 'no return value', 'const char pointer'],
    },
    {
      id: 'c-fn-3',
      title: 'Pass by value',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output demonstrating that C passes arguments by value.',
      skeleton: `#include <stdio.h>

void try_modify(int x) {
    x = 100;
    printf("Inside: %d\\n", x);
}

int main(void) {
    int a = 42;
    try_modify(a);
    printf("Outside: %d\\n", a);
    return 0;
}`,
      solution: `Inside: 100
Outside: 42`,
      hints: [
        'C passes arguments by value -- a copy is made.',
        'Modifying x inside the function does not affect a.',
        'a remains 42 after the function call.',
      ],
      concepts: ['pass by value', 'parameter copies', 'value semantics'],
    },
    {
      id: 'c-fn-4',
      title: 'Multiple return values via pointers',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that returns multiple values through pointer parameters.',
      skeleton: `// Write void min_max(int arr[], int len, int *min, int *max) that:
// 1. Finds the minimum and maximum values in arr
// 2. Stores them via the min and max pointers`,
      solution: `#include <stdio.h>

void min_max(int arr[], int len, int *min, int *max) {
    *min = arr[0];
    *max = arr[0];
    for (int i = 1; i < len; i++) {
        if (arr[i] < *min) *min = arr[i];
        if (arr[i] > *max) *max = arr[i];
    }
}

int main(void) {
    int nums[] = {3, 1, 4, 1, 5, 9, 2, 6};
    int min, max;
    min_max(nums, 8, &min, &max);
    printf("Min: %d, Max: %d\\n", min, max);
    return 0;
}`,
      hints: [
        'Use pointer parameters to "return" multiple values.',
        '*min and *max dereference the pointers to store values.',
        'Pass addresses with &min and &max from the caller.',
      ],
      concepts: ['output parameters', 'pointer parameters', 'multiple returns'],
    },
    {
      id: 'c-fn-5',
      title: 'Recursive factorial',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete the recursive factorial function.',
      skeleton: `#include <stdio.h>

int factorial(int n) {
    if (n __BLANK__ 1) {
        return __BLANK__;
    }
    return n __BLANK__ factorial(n - 1);
}

int main(void) {
    printf("5! = %d\\n", factorial(5));
    return 0;
}`,
      solution: `#include <stdio.h>

int factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

int main(void) {
    printf("5! = %d\\n", factorial(5));
    return 0;
}`,
      hints: [
        'Base case: when n <= 1, return 1.',
        'Recursive case: n * factorial(n - 1).',
        'The multiplication chains: 5 * 4 * 3 * 2 * 1.',
      ],
      concepts: ['recursion', 'base case', 'factorial'],
    },
    {
      id: 'c-fn-6',
      title: 'Function with array parameter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a function that computes the average of an integer array.',
      skeleton: `// Write double average(int arr[], int len) that returns the average
// of the array elements as a double.`,
      solution: `#include <stdio.h>

double average(int arr[], int len) {
    int sum = 0;
    for (int i = 0; i < len; i++) {
        sum += arr[i];
    }
    return (double)sum / len;
}

int main(void) {
    int nums[] = {10, 20, 30, 40, 50};
    printf("Average: %.2f\\n", average(nums, 5));
    return 0;
}`,
      hints: [
        'Sum all elements in a loop.',
        'Cast sum to double before dividing for a non-integer result.',
        'Arrays decay to pointers when passed to functions.',
      ],
      concepts: ['array parameter', 'function with array', 'type casting'],
    },
    {
      id: 'c-fn-7',
      title: 'Fix missing prototype',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the program where a function is called before its declaration.',
      skeleton: `#include <stdio.h>

int main(void) {
    printf("%d\\n", add(3, 4));
    return 0;
}

int add(int a, int b) {
    return a + b;
}`,
      solution: `#include <stdio.h>

int add(int a, int b);

int main(void) {
    printf("%d\\n", add(3, 4));
    return 0;
}

int add(int a, int b) {
    return a + b;
}`,
      hints: [
        'In C, functions must be declared before they are used.',
        'Add a function prototype before main.',
        'int add(int a, int b); tells the compiler about add.',
      ],
      concepts: ['forward declaration', 'function prototype', 'implicit declaration'],
    },
    {
      id: 'c-fn-8',
      title: 'Static function',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use the static keyword to limit a function to file scope.',
      skeleton: `#include <stdio.h>

__BLANK__ int helper(int x) {
    return x * x + 1;
}

int compute(int n) {
    return helper(n) + helper(n + 1);
}

int main(void) {
    printf("%d\\n", compute(3));
    return 0;
}`,
      solution: `#include <stdio.h>

static int helper(int x) {
    return x * x + 1;
}

int compute(int n) {
    return helper(n) + helper(n + 1);
}

int main(void) {
    printf("%d\\n", compute(3));
    return 0;
}`,
      hints: [
        'static before a function limits its visibility to the current file.',
        'Static functions cannot be called from other translation units.',
        'This is C\'s version of a private/internal function.',
      ],
      concepts: ['static function', 'file scope', 'internal linkage'],
    },
    {
      id: 'c-fn-9',
      title: 'Predict recursive calls',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output of a recursive function with print statements.',
      skeleton: `#include <stdio.h>

void countdown(int n) {
    if (n == 0) {
        printf("Go!\\n");
        return;
    }
    printf("%d\\n", n);
    countdown(n - 1);
    printf("back to %d\\n", n);
}

int main(void) {
    countdown(3);
    return 0;
}`,
      solution: `3
2
1
Go!
back to 1
back to 2
back to 3`,
      hints: [
        'The function prints n, recurses, then prints "back to n".',
        'After hitting the base case (Go!), the calls unwind.',
        'The "back to" messages appear in reverse order as the stack unwinds.',
      ],
      concepts: ['recursion', 'call stack', 'stack unwinding'],
    },
    {
      id: 'c-fn-10',
      title: 'Recursive binary search',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a recursive binary search function.',
      skeleton: `// Write int binary_search(int arr[], int low, int high, int target)
// Returns the index of target, or -1 if not found.
// Uses recursion to split the search range in half each time.`,
      solution: `#include <stdio.h>

int binary_search(int arr[], int low, int high, int target) {
    if (low > high) return -1;
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] > target) return binary_search(arr, low, mid - 1, target);
    return binary_search(arr, mid + 1, high, target);
}

int main(void) {
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    printf("Index of 23: %d\\n", binary_search(arr, 0, 9, 23));
    printf("Index of 50: %d\\n", binary_search(arr, 0, 9, 50));
    return 0;
}`,
      hints: [
        'Base case: low > high means target is not in the array.',
        'Find mid and compare arr[mid] with target.',
        'Recurse on the left or right half depending on comparison.',
      ],
      concepts: ['binary search', 'recursion', 'divide and conquer'],
    },
    {
      id: 'c-fn-11',
      title: 'Fix recursion bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the recursive function that has a missing base case.',
      skeleton: `#include <stdio.h>

int sum_to(int n) {
    return n + sum_to(n - 1);  // Bug: no base case!
}

int main(void) {
    printf("Sum 1-10: %d\\n", sum_to(10));
    return 0;
}`,
      solution: `#include <stdio.h>

int sum_to(int n) {
    if (n <= 0) return 0;
    return n + sum_to(n - 1);
}

int main(void) {
    printf("Sum 1-10: %d\\n", sum_to(10));
    return 0;
}`,
      hints: [
        'Without a base case, recursion never stops (stack overflow).',
        'Add a check: if n <= 0, return 0.',
        'Every recursive function needs at least one base case.',
      ],
      concepts: ['missing base case', 'stack overflow', 'recursion termination'],
    },
    {
      id: 'c-fn-12',
      title: 'Predict function pointer basics',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output when a function is called through a pointer.',
      skeleton: `#include <stdio.h>

int double_it(int x) { return x * 2; }
int triple_it(int x) { return x * 3; }

int main(void) {
    int (*fn)(int) = double_it;
    printf("%d\\n", fn(5));
    fn = triple_it;
    printf("%d\\n", fn(5));
    return 0;
}`,
      solution: `10
15`,
      hints: [
        'fn is a function pointer that first points to double_it.',
        'fn(5) calls double_it(5) = 10.',
        'After reassignment to triple_it, fn(5) calls triple_it(5) = 15.',
      ],
      concepts: ['function pointers', 'reassignment', 'indirect call'],
    },
    {
      id: 'c-fn-13',
      title: 'Variadic argument count',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete a function that sums a variable number of arguments.',
      skeleton: `#include <stdio.h>
#include <stdarg.h>

int sum(int count, ...) {
    __BLANK__ args;
    va_start(args, __BLANK__);

    int total = 0;
    for (int i = 0; i < count; i++) {
        total += __BLANK__(args, int);
    }

    va_end(args);
    return total;
}

int main(void) {
    printf("%d\\n", sum(3, 10, 20, 30));
    printf("%d\\n", sum(5, 1, 2, 3, 4, 5));
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdarg.h>

int sum(int count, ...) {
    va_list args;
    va_start(args, count);

    int total = 0;
    for (int i = 0; i < count; i++) {
        total += va_arg(args, int);
    }

    va_end(args);
    return total;
}

int main(void) {
    printf("%d\\n", sum(3, 10, 20, 30));
    printf("%d\\n", sum(5, 1, 2, 3, 4, 5));
    return 0;
}`,
      hints: [
        'va_list declares the argument list variable.',
        'va_start initializes it with the last named parameter.',
        'va_arg retrieves the next argument of the given type.',
      ],
      concepts: ['variadic functions', 'va_list', 'va_start', 'va_arg'],
    },
    {
      id: 'c-fn-14',
      title: 'Callback pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that applies a callback to each element of an array.',
      skeleton: `// Write void apply(int arr[], int len, int (*fn)(int))
// that replaces each element with fn(element).
// Test with a double_it and negate function.`,
      solution: `#include <stdio.h>

int double_it(int x) { return x * 2; }
int negate(int x) { return -x; }

void apply(int arr[], int len, int (*fn)(int)) {
    for (int i = 0; i < len; i++) {
        arr[i] = fn(arr[i]);
    }
}

void print_arr(int arr[], int len) {
    for (int i = 0; i < len; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main(void) {
    int nums[] = {1, 2, 3, 4, 5};
    apply(nums, 5, double_it);
    print_arr(nums, 5);
    apply(nums, 5, negate);
    print_arr(nums, 5);
    return 0;
}`,
      hints: [
        'int (*fn)(int) is a pointer to a function taking int, returning int.',
        'Call fn(arr[i]) to apply the callback to each element.',
        'Pass the function name directly: apply(nums, 5, double_it).',
      ],
      concepts: ['callback', 'function pointer parameter', 'higher-order function'],
    },
    {
      id: 'c-fn-15',
      title: 'Write power function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a recursive power function that computes base^exp.',
      skeleton: `// Write int power(int base, int exp) using recursion.
// base^0 = 1, base^n = base * base^(n-1)`,
      solution: `#include <stdio.h>

int power(int base, int exp) {
    if (exp == 0) return 1;
    return base * power(base, exp - 1);
}

int main(void) {
    printf("2^10 = %d\\n", power(2, 10));
    printf("3^4 = %d\\n", power(3, 4));
    printf("5^0 = %d\\n", power(5, 0));
    return 0;
}`,
      hints: [
        'Base case: any number to the power of 0 is 1.',
        'Recursive case: base * power(base, exp - 1).',
        'This is O(exp) -- there is a faster O(log exp) version.',
      ],
      concepts: ['recursion', 'power function', 'base case'],
    },
    {
      id: 'c-fn-16',
      title: 'Fix wrong return type',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the function that returns the wrong type.',
      skeleton: `#include <stdio.h>

int divide(int a, int b) {
    if (b == 0) return 0;
    return a / b;  // Bug: integer division loses decimal
}

int main(void) {
    printf("10 / 3 = %d\\n", divide(10, 3));
    // Prints 3, but we want 3.33
    return 0;
}`,
      solution: `#include <stdio.h>

double divide(int a, int b) {
    if (b == 0) return 0.0;
    return (double)a / b;
}

int main(void) {
    printf("10 / 3 = %.2f\\n", divide(10, 3));
    return 0;
}`,
      hints: [
        'Change the return type from int to double.',
        'Cast a to double before dividing.',
        'Update the printf format from %d to %.2f.',
      ],
      concepts: ['return type mismatch', 'integer division', 'type casting'],
    },
    {
      id: 'c-fn-17',
      title: 'Predict recursive fibonacci',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output and understand the call tree.',
      skeleton: `#include <stdio.h>

int fib(int n) {
    printf("fib(%d) ", n);
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

int main(void) {
    int result = fib(4);
    printf("\\n= %d\\n", result);
    return 0;
}`,
      solution: `fib(4) fib(3) fib(2) fib(1) fib(0) fib(1) fib(2) fib(1) fib(0) 
= 3`,
      hints: [
        'fib(4) calls fib(3) and fib(2).',
        'fib(3) calls fib(2) and fib(1). fib(2) calls fib(1) and fib(0).',
        'The call order is depth-first, left branch evaluated first.',
      ],
      concepts: ['recursive fibonacci', 'call tree', 'exponential calls'],
    },
    {
      id: 'c-fn-18',
      title: 'Refactor to use helper function',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Refactor the repeated code into a helper function.',
      skeleton: `#include <stdio.h>

int main(void) {
    int a[] = {5, 3, 8, 1, 9};
    int max_a = a[0];
    for (int i = 1; i < 5; i++) {
        if (a[i] > max_a) max_a = a[i];
    }

    int b[] = {2, 7, 4, 6, 0};
    int max_b = b[0];
    for (int i = 1; i < 5; i++) {
        if (b[i] > max_b) max_b = b[i];
    }

    printf("Max a: %d, Max b: %d\\n", max_a, max_b);
    return 0;
}`,
      solution: `#include <stdio.h>

int array_max(int arr[], int len) {
    int max = arr[0];
    for (int i = 1; i < len; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

int main(void) {
    int a[] = {5, 3, 8, 1, 9};
    int b[] = {2, 7, 4, 6, 0};
    printf("Max a: %d, Max b: %d\\n", array_max(a, 5), array_max(b, 5));
    return 0;
}`,
      hints: [
        'The two loops have identical logic -- extract into a function.',
        'The function takes the array and its length.',
        'Call it twice with different arrays.',
      ],
      concepts: ['DRY principle', 'function extraction', 'code reuse'],
    },
    {
      id: 'c-fn-19',
      title: 'Refactor recursive to iterative',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor the recursive fibonacci to an iterative version.',
      skeleton: `#include <stdio.h>

int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

int main(void) {
    for (int i = 0; i < 10; i++) {
        printf("fib(%d) = %d\\n", i, fib(i));
    }
    return 0;
}`,
      solution: `#include <stdio.h>

int fib(int n) {
    if (n <= 1) return n;
    int prev = 0, curr = 1;
    for (int i = 2; i <= n; i++) {
        int next = prev + curr;
        prev = curr;
        curr = next;
    }
    return curr;
}

int main(void) {
    for (int i = 0; i < 10; i++) {
        printf("fib(%d) = %d\\n", i, fib(i));
    }
    return 0;
}`,
      hints: [
        'Track the previous two values instead of recursing.',
        'Use a loop from 2 to n, computing next = prev + curr.',
        'This is O(n) instead of O(2^n).',
      ],
      concepts: ['iterative vs recursive', 'performance', 'fibonacci'],
    },
    {
      id: 'c-fn-20',
      title: 'Inline function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write an inline function and explain when to use it.',
      skeleton: `// Write an inline function:
// static inline int max(int a, int b)
// that returns the larger of two integers.
// Call it in a loop to demonstrate the inline hint.`,
      solution: `#include <stdio.h>

static inline int max(int a, int b) {
    return (a > b) ? a : b;
}

int main(void) {
    int nums[] = {3, 1, 4, 1, 5, 9, 2, 6};
    int largest = nums[0];
    for (int i = 1; i < 8; i++) {
        largest = max(largest, nums[i]);
    }
    printf("Largest: %d\\n", largest);
    return 0;
}`,
      hints: [
        'inline suggests the compiler replace calls with the function body.',
        'static inline is the most common pattern in C.',
        'Good for small, frequently called functions like max.',
      ],
      concepts: ['inline function', 'static inline', 'compiler optimization'],
    },
  ],
};
