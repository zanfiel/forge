import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-recursion',
  title: '29. Recursion',
  explanation: `## Recursion

Recursion is when a function calls itself. Every recursive function needs a base case to stop and a recursive case that moves toward it.

\`\`\`c
int factorial(int n) {
    if (n <= 1) return 1;        // base case
    return n * factorial(n - 1); // recursive case
}
\`\`\`

### Key Concepts
- **Base case**: condition that stops recursion
- **Recursive case**: the self-call that reduces the problem
- **Call stack**: each call adds a frame; deep recursion can overflow
- **Tail recursion**: recursive call is the last operation (optimizable)
- **Memoization**: cache results to avoid recomputation
`,
  exercises: [
    {
      id: 'c-recursion-1',
      title: 'Factorial',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete the recursive factorial function.',
      skeleton: `#include <stdio.h>

int factorial(int n) {
    if (n <= __BLANK__) return __BLANK__;
    return n * factorial(__BLANK__);
}

int main(void) {
    printf("%d\\n", factorial(5));
    return 0;
}`,
      solution: `#include <stdio.h>

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main(void) {
    printf("%d\\n", factorial(5));
    return 0;
}`,
      hints: [
        'Base case: n <= 1 returns 1.',
        '0! = 1 and 1! = 1.',
        'Recursive call: factorial(n - 1).',
      ],
      concepts: ['factorial', 'base case', 'recursive case'],
    },
    {
      id: 'c-recursion-2',
      title: 'Fibonacci',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete the recursive Fibonacci function.',
      skeleton: `#include <stdio.h>

int fib(int n) {
    if (n <= __BLANK__) return __BLANK__;
    return fib(n - 1) + fib(__BLANK__);
}

int main(void) {
    for (int i = 0; i < 10; i++) printf("%d ", fib(i));
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

int main(void) {
    for (int i = 0; i < 10; i++) printf("%d ", fib(i));
    printf("\\n");
    return 0;
}`,
      hints: [
        'Base case: fib(0) = 0, fib(1) = 1, so if n <= 1 return n.',
        'Recursive: fib(n) = fib(n-1) + fib(n-2).',
        'This naive approach is O(2^n) -- exponential.',
      ],
      concepts: ['fibonacci', 'double recursion', 'base case'],
    },
    {
      id: 'c-recursion-3',
      title: 'Sum of array',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a recursive function to sum all elements of an array.',
      skeleton: `#include <stdio.h>

// Write int sum(int arr[], int n)
// Base case: n == 0 returns 0
// Recursive: arr[n-1] + sum(arr, n-1)

int main(void) {
    int a[] = {1, 2, 3, 4, 5};
    printf("Sum: %d\\n", sum(a, 5));
    return 0;
}`,
      solution: `#include <stdio.h>

int sum(int arr[], int n) {
    if (n == 0) return 0;
    return arr[n - 1] + sum(arr, n - 1);
}

int main(void) {
    int a[] = {1, 2, 3, 4, 5};
    printf("Sum: %d\\n", sum(a, 5));
    return 0;
}`,
      hints: [
        'Base case: empty array (n == 0) sums to 0.',
        'Add the last element arr[n-1] to sum of remaining.',
        'Each call reduces n by 1.',
      ],
      concepts: ['array recursion', 'accumulation', 'base case'],
    },
    {
      id: 'c-recursion-4',
      title: 'Predict recursion depth',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output of a recursive countdown.',
      skeleton: `#include <stdio.h>

void countdown(int n) {
    if (n < 0) return;
    printf("%d ", n);
    countdown(n - 1);
}

int main(void) {
    countdown(4);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

void countdown(int n) {
    if (n < 0) return;
    printf("%d ", n);
    countdown(n - 1);
}

int main(void) {
    countdown(4);
    printf("\\n");
    return 0;
}
// Output: 4 3 2 1 0`,
      hints: [
        'Prints n before recursing with n-1.',
        'countdown(4) prints 4, then calls countdown(3), etc.',
        'Stops when n < 0. Prints: 4 3 2 1 0.',
      ],
      concepts: ['recursion trace', 'countdown', 'base case'],
    },
    {
      id: 'c-recursion-5',
      title: 'String reversal',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a recursive function to reverse a string in place.',
      skeleton: `#include <stdio.h>
#include <string.h>

// Write void reverse(char *s, int lo, int hi)
// Swap s[lo] and s[hi], then recurse inward

int main(void) {
    char s[] = "hello";
    reverse(s, 0, strlen(s) - 1);
    printf("%s\\n", s);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

void reverse(char *s, int lo, int hi) {
    if (lo >= hi) return;
    char tmp = s[lo];
    s[lo] = s[hi];
    s[hi] = tmp;
    reverse(s, lo + 1, hi - 1);
}

int main(void) {
    char s[] = "hello";
    reverse(s, 0, strlen(s) - 1);
    printf("%s\\n", s);
    return 0;
}`,
      hints: [
        'Base case: lo >= hi means pointers have crossed.',
        'Swap characters at lo and hi.',
        'Recurse with lo + 1, hi - 1.',
      ],
      concepts: ['string reversal', 'two pointers', 'recursion'],
    },
    {
      id: 'c-recursion-6',
      title: 'Power function',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete a fast recursive power function using exponentiation by squaring.',
      skeleton: `#include <stdio.h>

long long power(long long base, int exp) {
    if (exp == __BLANK__) return 1;
    if (exp % 2 == 0) {
        long long half = power(base, exp / __BLANK__);
        return half * __BLANK__;
    }
    return base * power(base, __BLANK__);
}

int main(void) {
    printf("%lld\\n", power(2, 10));
    printf("%lld\\n", power(3, 5));
    return 0;
}`,
      solution: `#include <stdio.h>

long long power(long long base, int exp) {
    if (exp == 0) return 1;
    if (exp % 2 == 0) {
        long long half = power(base, exp / 2);
        return half * half;
    }
    return base * power(base, exp - 1);
}

int main(void) {
    printf("%lld\\n", power(2, 10));
    printf("%lld\\n", power(3, 5));
    return 0;
}`,
      hints: [
        'Base case: exp == 0 returns 1.',
        'Even exponent: power(base, exp/2) squared.',
        'Odd exponent: base * power(base, exp - 1).',
      ],
      concepts: ['exponentiation by squaring', 'O(log n)', 'fast power'],
    },
    {
      id: 'c-recursion-7',
      title: 'GCD Euclidean',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write the recursive Euclidean GCD algorithm.',
      skeleton: `#include <stdio.h>

// Write int gcd(int a, int b)
// gcd(a, 0) = a; gcd(a, b) = gcd(b, a % b)

int main(void) {
    printf("gcd(48, 18) = %d\\n", gcd(48, 18));
    printf("gcd(100, 75) = %d\\n", gcd(100, 75));
    return 0;
}`,
      solution: `#include <stdio.h>

int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

int main(void) {
    printf("gcd(48, 18) = %d\\n", gcd(48, 18));
    printf("gcd(100, 75) = %d\\n", gcd(100, 75));
    return 0;
}`,
      hints: [
        'Base case: b == 0 means a is the GCD.',
        'Recursive: gcd(b, a % b).',
        'This is the Euclidean algorithm, O(log(min(a,b))).',
      ],
      concepts: ['GCD', 'Euclidean algorithm', 'modulo'],
    },
    {
      id: 'c-recursion-8',
      title: 'Fix infinite recursion',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the missing base case that causes infinite recursion.',
      skeleton: `#include <stdio.h>

int sum_digits(int n) {
    // BUG: missing base case
    return n % 10 + sum_digits(n / 10);
}

int main(void) {
    printf("Sum of digits of 1234: %d\\n", sum_digits(1234));
    return 0;
}`,
      solution: `#include <stdio.h>

int sum_digits(int n) {
    if (n == 0) return 0;
    return n % 10 + sum_digits(n / 10);
}

int main(void) {
    printf("Sum of digits of 1234: %d\\n", sum_digits(1234));
    return 0;
}`,
      hints: [
        'When n == 0, there are no more digits to sum.',
        'Add: if (n == 0) return 0;',
        'Without the base case, n/10 eventually reaches 0 but keeps recursing.',
      ],
      concepts: ['base case', 'infinite recursion', 'stack overflow'],
    },
    {
      id: 'c-recursion-9',
      title: 'Tower of Hanoi',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete the Tower of Hanoi recursive solution.',
      skeleton: `#include <stdio.h>

void hanoi(int n, char from, char to, char aux) {
    if (n == __BLANK__) {
        printf("Move disk 1 from %c to %c\\n", from, to);
        return;
    }
    hanoi(n - 1, from, __BLANK__, to);
    printf("Move disk %d from %c to %c\\n", n, from, to);
    hanoi(n - 1, __BLANK__, to, from);
}

int main(void) {
    hanoi(3, 'A', 'C', 'B');
    return 0;
}`,
      solution: `#include <stdio.h>

void hanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        printf("Move disk 1 from %c to %c\\n", from, to);
        return;
    }
    hanoi(n - 1, from, aux, to);
    printf("Move disk %d from %c to %c\\n", n, from, to);
    hanoi(n - 1, aux, to, from);
}

int main(void) {
    hanoi(3, 'A', 'C', 'B');
    return 0;
}`,
      hints: [
        'Base case: n == 1, move one disk directly.',
        'Move n-1 disks from source to aux (using dest as helper).',
        'Then move n-1 disks from aux to dest (using source as helper).',
      ],
      concepts: ['Tower of Hanoi', 'recursive decomposition', 'O(2^n)'],
    },
    {
      id: 'c-recursion-10',
      title: 'Predict print order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output when print happens after the recursive call.',
      skeleton: `#include <stdio.h>

void mystery(int n) {
    if (n <= 0) return;
    mystery(n - 1);
    printf("%d ", n);
}

int main(void) {
    mystery(4);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

void mystery(int n) {
    if (n <= 0) return;
    mystery(n - 1);
    printf("%d ", n);
}

int main(void) {
    mystery(4);
    printf("\\n");
    return 0;
}
// Output: 1 2 3 4`,
      hints: [
        'printf happens AFTER the recursive call returns.',
        'mystery(1) completes first, printing 1, then mystery(2) prints 2, etc.',
        'The order is reversed: prints 1 2 3 4 (ascending).',
      ],
      concepts: ['post-recursion print', 'call stack unwinding', 'order'],
    },
    {
      id: 'c-recursion-11',
      title: 'Binary search recursive',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a recursive binary search returning the index or -1.',
      skeleton: `#include <stdio.h>

// Write int bsearch_rec(int arr[], int lo, int hi, int target)

int main(void) {
    int a[] = {2, 5, 8, 12, 16, 23};
    printf("Index: %d\\n", bsearch_rec(a, 0, 5, 16));
    printf("Index: %d\\n", bsearch_rec(a, 0, 5, 7));
    return 0;
}`,
      solution: `#include <stdio.h>

int bsearch_rec(int arr[], int lo, int hi, int target) {
    if (lo > hi) return -1;
    int mid = lo + (hi - lo) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) return bsearch_rec(arr, mid + 1, hi, target);
    return bsearch_rec(arr, lo, mid - 1, target);
}

int main(void) {
    int a[] = {2, 5, 8, 12, 16, 23};
    printf("Index: %d\\n", bsearch_rec(a, 0, 5, 16));
    printf("Index: %d\\n", bsearch_rec(a, 0, 5, 7));
    return 0;
}`,
      hints: [
        'Base case: lo > hi means not found.',
        'Compare mid element, recurse left or right.',
        'Each call halves the search space.',
      ],
      concepts: ['binary search', 'recursion', 'divide and conquer'],
    },
    {
      id: 'c-recursion-12',
      title: 'Memoized Fibonacci',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write Fibonacci with memoization to avoid exponential recomputation.',
      skeleton: `#include <stdio.h>
#include <string.h>

#define MAX_N 100

// Write long long fib_memo(int n, long long memo[])
// Use memo array to cache results

int main(void) {
    long long memo[MAX_N];
    memset(memo, -1, sizeof(memo));
    for (int i = 0; i < 20; i++)
        printf("%lld ", fib_memo(i, memo));
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

#define MAX_N 100

long long fib_memo(int n, long long memo[]) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo);
    return memo[n];
}

int main(void) {
    long long memo[MAX_N];
    memset(memo, -1, sizeof(memo));
    for (int i = 0; i < 20; i++)
        printf("%lld ", fib_memo(i, memo));
    printf("\\n");
    return 0;
}`,
      hints: [
        'Check memo[n] first; if not -1, return cached value.',
        'Compute fib(n-1) + fib(n-2) and store in memo[n].',
        'This reduces O(2^n) to O(n).',
      ],
      concepts: ['memoization', 'dynamic programming', 'fibonacci'],
    },
    {
      id: 'c-recursion-13',
      title: 'Fix wrong base case',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the incorrect base case in this recursive power function.',
      skeleton: `#include <stdio.h>

int power(int base, int exp) {
    if (exp == 1) return base;  // BUG: fails for exp == 0
    return base * power(base, exp - 1);
}

int main(void) {
    printf("2^0 = %d\\n", power(2, 0));
    printf("2^3 = %d\\n", power(2, 3));
    return 0;
}`,
      solution: `#include <stdio.h>

int power(int base, int exp) {
    if (exp == 0) return 1;
    return base * power(base, exp - 1);
}

int main(void) {
    printf("2^0 = %d\\n", power(2, 0));
    printf("2^3 = %d\\n", power(2, 3));
    return 0;
}`,
      hints: [
        'x^0 = 1 for any x, but the base case only handles exp == 1.',
        'power(2, 0) recurses with exp = -1, -2, ... forever.',
        'Fix: if (exp == 0) return 1;',
      ],
      concepts: ['base case', 'edge case', 'power function'],
    },
    {
      id: 'c-recursion-14',
      title: 'Tail-recursive factorial',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor factorial to use tail recursion with an accumulator.',
      skeleton: `#include <stdio.h>

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main(void) {
    printf("%d\\n", factorial(10));
    return 0;
}`,
      solution: `#include <stdio.h>

static int fact_helper(int n, int acc) {
    if (n <= 1) return acc;
    return fact_helper(n - 1, n * acc);
}

int factorial(int n) {
    return fact_helper(n, 1);
}

int main(void) {
    printf("%d\\n", factorial(10));
    return 0;
}`,
      hints: [
        'Add an accumulator parameter that carries the partial result.',
        'Helper: fact_helper(n, acc) where acc starts at 1.',
        'Tail call: fact_helper(n-1, n * acc) -- no work after the call.',
      ],
      concepts: ['tail recursion', 'accumulator', 'optimization'],
    },
    {
      id: 'c-recursion-15',
      title: 'Flood fill',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a recursive flood fill for a 2D grid.',
      skeleton: `#include <stdio.h>

#define ROWS 5
#define COLS 5

// Write void flood_fill(int grid[ROWS][COLS], int r, int c, int old, int new_color)
// Fill all connected cells of old color with new_color

void print_grid(int grid[ROWS][COLS]) {
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) printf("%d ", grid[i][j]);
        printf("\\n");
    }
}

int main(void) {
    int grid[ROWS][COLS] = {
        {1, 1, 0, 0, 0},
        {1, 1, 0, 1, 1},
        {0, 0, 0, 1, 1},
        {0, 1, 1, 0, 0},
        {0, 1, 1, 0, 0}
    };
    flood_fill(grid, 0, 0, 1, 2);
    print_grid(grid);
    return 0;
}`,
      solution: `#include <stdio.h>

#define ROWS 5
#define COLS 5

void flood_fill(int grid[ROWS][COLS], int r, int c, int old, int new_color) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    if (grid[r][c] != old) return;
    grid[r][c] = new_color;
    flood_fill(grid, r + 1, c, old, new_color);
    flood_fill(grid, r - 1, c, old, new_color);
    flood_fill(grid, r, c + 1, old, new_color);
    flood_fill(grid, r, c - 1, old, new_color);
}

void print_grid(int grid[ROWS][COLS]) {
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) printf("%d ", grid[i][j]);
        printf("\\n");
    }
}

int main(void) {
    int grid[ROWS][COLS] = {
        {1, 1, 0, 0, 0},
        {1, 1, 0, 1, 1},
        {0, 0, 0, 1, 1},
        {0, 1, 1, 0, 0},
        {0, 1, 1, 0, 0}
    };
    flood_fill(grid, 0, 0, 1, 2);
    print_grid(grid);
    return 0;
}`,
      hints: [
        'Check bounds and whether current cell matches old color.',
        'Set current cell to new_color, then recurse in 4 directions.',
        'The color change acts as the "visited" marker.',
      ],
      concepts: ['flood fill', '2D recursion', 'connected components'],
    },
    {
      id: 'c-recursion-16',
      title: 'Predict mutual recursion',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Predict the output of mutually recursive functions.',
      skeleton: `#include <stdio.h>

int is_even(int n);
int is_odd(int n);

int is_even(int n) {
    if (n == 0) return 1;
    return is_odd(n - 1);
}

int is_odd(int n) {
    if (n == 0) return 0;
    return is_even(n - 1);
}

int main(void) {
    printf("%d %d %d %d\\n", is_even(4), is_odd(4), is_even(3), is_odd(3));
    return 0;
}`,
      solution: `#include <stdio.h>

int is_even(int n);
int is_odd(int n);

int is_even(int n) {
    if (n == 0) return 1;
    return is_odd(n - 1);
}

int is_odd(int n) {
    if (n == 0) return 0;
    return is_even(n - 1);
}

int main(void) {
    printf("%d %d %d %d\\n", is_even(4), is_odd(4), is_even(3), is_odd(3));
    return 0;
}
// Output: 1 0 0 1`,
      hints: [
        'is_even(4) -> is_odd(3) -> is_even(2) -> is_odd(1) -> is_even(0) -> 1.',
        'is_odd(4) -> is_even(3) -> is_odd(2) -> is_even(1) -> is_odd(0) -> 0.',
        '4 is even, 3 is odd.',
      ],
      concepts: ['mutual recursion', 'forward declaration', 'even/odd'],
    },
    {
      id: 'c-recursion-17',
      title: 'Permutations',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a function to print all permutations of a string.',
      skeleton: `#include <stdio.h>
#include <string.h>

// Write void permute(char *s, int lo, int hi)
// Swap each character into position lo, recurse on lo+1..hi

int main(void) {
    char s[] = "ABC";
    permute(s, 0, strlen(s) - 1);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

void permute(char *s, int lo, int hi) {
    if (lo == hi) {
        printf("%s\\n", s);
        return;
    }
    for (int i = lo; i <= hi; i++) {
        char tmp = s[lo]; s[lo] = s[i]; s[i] = tmp;
        permute(s, lo + 1, hi);
        tmp = s[lo]; s[lo] = s[i]; s[i] = tmp;
    }
}

int main(void) {
    char s[] = "ABC";
    permute(s, 0, strlen(s) - 1);
    return 0;
}`,
      hints: [
        'Base case: lo == hi, print the string.',
        'For each i from lo to hi, swap s[lo] with s[i], recurse, then swap back.',
        'Swapping back (backtracking) restores the original order.',
      ],
      concepts: ['permutations', 'backtracking', 'swap'],
    },
    {
      id: 'c-recursion-18',
      title: 'Fix stack overflow',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the recursive function that causes stack overflow for large inputs.',
      skeleton: `#include <stdio.h>

// This recursive sum overflows the stack for large n
long long sum_to_n(long long n) {
    if (n == 0) return 0;
    return n + sum_to_n(n - 1);
}

int main(void) {
    printf("%lld\\n", sum_to_n(1000000));
    return 0;
}`,
      solution: `#include <stdio.h>

// Convert to iterative to avoid stack overflow
long long sum_to_n(long long n) {
    long long result = 0;
    for (long long i = 1; i <= n; i++)
        result += i;
    return result;
}

int main(void) {
    printf("%lld\\n", sum_to_n(1000000));
    return 0;
}`,
      hints: [
        '1,000,000 recursive calls will overflow the stack.',
        'Convert to an iterative loop.',
        'Or use the formula n*(n+1)/2, but the exercise asks for a loop.',
      ],
      concepts: ['stack overflow', 'iterative conversion', 'recursion limits'],
    },
    {
      id: 'c-recursion-19',
      title: 'Refactor to iterative',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor recursive Fibonacci to iterative bottom-up.',
      skeleton: `#include <stdio.h>

long long fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

int main(void) {
    for (int i = 0; i < 20; i++) printf("%lld ", fib(i));
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

long long fib(int n) {
    if (n <= 1) return n;
    long long prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        long long curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

int main(void) {
    for (int i = 0; i < 20; i++) printf("%lld ", fib(i));
    printf("\\n");
    return 0;
}`,
      hints: [
        'Track only the two previous values: prev2 and prev1.',
        'Loop from 2 to n, computing curr = prev1 + prev2.',
        'O(n) time, O(1) space instead of O(2^n).',
      ],
      concepts: ['iterative Fibonacci', 'O(n)', 'space optimization'],
    },
    {
      id: 'c-recursion-20',
      title: 'N-Queens count',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a recursive backtracking function to count solutions to the N-Queens problem.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

// Write int n_queens(int n)
// Return the number of valid placements of n queens on an n x n board
// Use backtracking with a cols[] array where cols[r] = column of queen in row r

int main(void) {
    for (int n = 1; n <= 8; n++)
        printf("N=%d: %d solutions\\n", n, n_queens(n));
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

static int is_safe(int cols[], int row, int col) {
    for (int i = 0; i < row; i++) {
        if (cols[i] == col) return 0;
        if (abs(cols[i] - col) == abs(i - row)) return 0;
    }
    return 1;
}

static int solve(int cols[], int row, int n) {
    if (row == n) return 1;
    int count = 0;
    for (int col = 0; col < n; col++) {
        if (is_safe(cols, row, col)) {
            cols[row] = col;
            count += solve(cols, row + 1, n);
        }
    }
    return count;
}

int n_queens(int n) {
    int cols[20];
    return solve(cols, 0, n);
}

int main(void) {
    for (int n = 1; n <= 8; n++)
        printf("N=%d: %d solutions\\n", n, n_queens(n));
    return 0;
}`,
      hints: [
        'Place queens row by row. For each row, try each column.',
        'is_safe checks column conflicts and diagonal conflicts.',
        'Diagonal conflict: abs(col_diff) == abs(row_diff).',
      ],
      concepts: ['N-Queens', 'backtracking', 'constraint satisfaction'],
    },
  ],
};
