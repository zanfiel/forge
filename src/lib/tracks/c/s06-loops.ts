import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-loops',
  title: '6. Loops',
  explanation: `## Loops in C

Loops repeat a block of code while a condition is true.

\`\`\`c
// for loop - known iteration count
for (int i = 0; i < 10; i++) { ... }

// while loop - condition checked before each iteration
while (condition) { ... }

// do-while - executes at least once, checks after
do { ... } while (condition);
\`\`\`

### Control Statements
- **break**: exits the loop immediately
- **continue**: skips to the next iteration
- **Nested loops**: loops inside loops, break/continue affect innermost only
`,
  exercises: [
    {
      id: 'c-loops-1',
      title: 'Basic for loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete a for loop that prints numbers 1 through 5.',
      skeleton: `#include <stdio.h>

int main(void) {
    for (__BLANK__ i = 1; i __BLANK__ 5; i__BLANK__) {
        printf("%d\\n", i);
    }
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 5; i++) {
        printf("%d\\n", i);
    }
    return 0;
}`,
      hints: [
        'Declare the loop variable with int.',
        'Use <= to include 5 in the range.',
        'i++ increments i by 1 after each iteration.',
      ],
      concepts: ['for loop', 'loop variable', 'increment'],
    },
    {
      id: 'c-loops-2',
      title: 'While loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete a while loop that counts down from 5 to 1.',
      skeleton: `#include <stdio.h>

int main(void) {
    int n = 5;
    __BLANK__ (n __BLANK__ 0) {
        printf("%d\\n", n);
        n__BLANK__;
    }
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int n = 5;
    while (n > 0) {
        printf("%d\\n", n);
        n--;
    }
    return 0;
}`,
      hints: [
        'while loops check the condition before each iteration.',
        'Continue while n > 0.',
        'Decrement n with n-- each iteration.',
      ],
      concepts: ['while loop', 'countdown', 'decrement'],
    },
    {
      id: 'c-loops-3',
      title: 'Do-while loop',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a do-while loop that repeatedly halves a number until it reaches 0.',
      skeleton: `// Write a program that:
// 1. Starts with int n = 100
// 2. Uses do-while to print n and then halve it (n /= 2)
// 3. Continues while n > 0`,
      solution: `#include <stdio.h>

int main(void) {
    int n = 100;
    do {
        printf("%d\\n", n);
        n /= 2;
    } while (n > 0);
    return 0;
}`,
      hints: [
        'do-while executes the body at least once before checking the condition.',
        'The syntax is: do { body } while (condition);',
        'Note the semicolon after the while condition.',
      ],
      concepts: ['do-while', 'halving', 'guaranteed first execution'],
    },
    {
      id: 'c-loops-4',
      title: 'Break out of loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use break to exit a loop when a condition is met.',
      skeleton: `#include <stdio.h>

int main(void) {
    for (int i = 0; i < 100; i++) {
        if (i * i > 50) {
            printf("First square > 50: %d (i=%d)\\n", i * i, i);
            __BLANK__;
        }
    }
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    for (int i = 0; i < 100; i++) {
        if (i * i > 50) {
            printf("First square > 50: %d (i=%d)\\n", i * i, i);
            break;
        }
    }
    return 0;
}`,
      hints: [
        'break immediately exits the innermost loop.',
        'Without break, the loop would continue to 99.',
        'break; terminates the for loop.',
      ],
      concepts: ['break statement', 'early exit', 'search pattern'],
    },
    {
      id: 'c-loops-5',
      title: 'Continue to skip',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a loop that prints only odd numbers from 1 to 20 using continue.',
      skeleton: `// Write a program using a for loop from 1 to 20 that:
// 1. Uses continue to skip even numbers
// 2. Prints only the odd numbers`,
      solution: `#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 20; i++) {
        if (i % 2 == 0) {
            continue;
        }
        printf("%d\\n", i);
    }
    return 0;
}`,
      hints: [
        'continue skips the rest of the loop body and goes to the next iteration.',
        'Check if i is even with i % 2 == 0.',
        'If even, continue; otherwise, printf.',
      ],
      concepts: ['continue statement', 'skip iteration', 'odd number filter'],
    },
    {
      id: 'c-loops-6',
      title: 'Predict nested loop',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output of nested for loops.',
      skeleton: `#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= i; j++) {
            printf("*");
        }
        printf("\\n");
    }
    return 0;
}`,
      solution: `*
**
***`,
      hints: [
        'Outer loop: i goes from 1 to 3.',
        'Inner loop: j goes from 1 to i (prints i stars).',
        'i=1: one star. i=2: two stars. i=3: three stars.',
      ],
      concepts: ['nested loops', 'triangle pattern', 'loop relationship'],
    },
    {
      id: 'c-loops-7',
      title: 'Predict break in nested loop',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict what break does in a nested loop.',
      skeleton: `#include <stdio.h>

int main(void) {
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (j == 1) break;
            printf("(%d,%d) ", i, j);
        }
    }
    printf("\\n");
    return 0;
}`,
      solution: `(0,0) (1,0) (2,0) `,
      hints: [
        'break only exits the innermost loop.',
        'When j reaches 1, the inner loop breaks, but the outer continues.',
        'Only j=0 is printed for each value of i.',
      ],
      concepts: ['break in nested loop', 'innermost loop only', 'loop control'],
    },
    {
      id: 'c-loops-8',
      title: 'Infinite loop pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write an infinite loop with an internal exit condition.',
      skeleton: `#include <stdio.h>

int main(void) {
    int count = 0;
    __BLANK__ (1) {
        count++;
        if (count > 5) __BLANK__;
        printf("%d ", count);
    }
    printf("\\nDone after %d iterations\\n", count);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int count = 0;
    while (1) {
        count++;
        if (count > 5) break;
        printf("%d ", count);
    }
    printf("\\nDone after %d iterations\\n", count);
    return 0;
}`,
      hints: [
        'while(1) creates an infinite loop.',
        'Use break inside the loop to exit when done.',
        'This pattern is common when the exit condition is complex.',
      ],
      concepts: ['infinite loop', 'while(1)', 'internal break'],
    },
    {
      id: 'c-loops-9',
      title: 'Sum with while',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a function that sums digits of a number using a while loop.',
      skeleton: `// Write int digit_sum(int n) that returns the sum of digits.
// Use while loop with n > 0, extract last digit with % 10,
// remove it with / 10. Example: digit_sum(123) -> 6`,
      solution: `#include <stdio.h>

int digit_sum(int n) {
    int sum = 0;
    if (n < 0) n = -n;
    while (n > 0) {
        sum += n % 10;
        n /= 10;
    }
    return sum;
}

int main(void) {
    printf("%d\\n", digit_sum(123));
    printf("%d\\n", digit_sum(9999));
    printf("%d\\n", digit_sum(0));
    return 0;
}`,
      hints: [
        'n % 10 gives the last digit.',
        'n /= 10 removes the last digit.',
        'Keep looping while n > 0.',
      ],
      concepts: ['digit extraction', 'while loop', 'modulo arithmetic'],
    },
    {
      id: 'c-loops-10',
      title: 'Fix off-by-one error',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the off-by-one error in the loop.',
      skeleton: `#include <stdio.h>

int main(void) {
    int arr[] = {10, 20, 30, 40, 50};
    int sum = 0;

    // Should sum all 5 elements
    for (int i = 0; i <= 5; i++) {
        sum += arr[i];
    }
    printf("Sum: %d\\n", sum);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int arr[] = {10, 20, 30, 40, 50};
    int sum = 0;

    for (int i = 0; i < 5; i++) {
        sum += arr[i];
    }
    printf("Sum: %d\\n", sum);
    return 0;
}`,
      hints: [
        'Array indices go from 0 to length-1.',
        'Using <= 5 accesses arr[5], which is out of bounds.',
        'Change <= 5 to < 5.',
      ],
      concepts: ['off-by-one', 'array bounds', 'loop condition'],
    },
    {
      id: 'c-loops-11',
      title: 'Reverse for loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete a for loop that iterates backwards through an array.',
      skeleton: `#include <stdio.h>

int main(void) {
    int arr[] = {1, 2, 3, 4, 5};
    int len = 5;

    for (int i = len __BLANK__ 1; i __BLANK__ 0; i__BLANK__) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int arr[] = {1, 2, 3, 4, 5};
    int len = 5;

    for (int i = len - 1; i >= 0; i--) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,
      hints: [
        'Start at len - 1 (the last valid index).',
        'Continue while i >= 0.',
        'Decrement with i--.',
      ],
      concepts: ['reverse iteration', 'backwards loop', 'array traversal'],
    },
    {
      id: 'c-loops-12',
      title: 'Multiplication table',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that prints an NxN multiplication table using nested loops.',
      skeleton: `// Write void mult_table(int n) that prints an n x n multiplication table.
// Format each number in a 4-character-wide field.
// Example for n=3:
//    1   2   3
//    2   4   6
//    3   6   9`,
      solution: `#include <stdio.h>

void mult_table(int n) {
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            printf("%4d", i * j);
        }
        printf("\\n");
    }
}

int main(void) {
    mult_table(5);
    return 0;
}`,
      hints: [
        'Use nested for loops: outer for rows, inner for columns.',
        'Print i * j with %4d for aligned columns.',
        'Print a newline after each row.',
      ],
      concepts: ['nested loops', 'multiplication table', 'formatted output'],
    },
    {
      id: 'c-loops-13',
      title: 'GCD with while',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that computes GCD using the Euclidean algorithm with a while loop.',
      skeleton: `// Write int gcd(int a, int b) using the Euclidean algorithm:
// while b != 0: temp = b, b = a % b, a = temp
// return a`,
      solution: `#include <stdio.h>

int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

int main(void) {
    printf("gcd(12, 8) = %d\\n", gcd(12, 8));
    printf("gcd(100, 75) = %d\\n", gcd(100, 75));
    printf("gcd(7, 13) = %d\\n", gcd(7, 13));
    return 0;
}`,
      hints: [
        'The Euclidean algorithm repeatedly replaces (a, b) with (b, a % b).',
        'When b becomes 0, a is the GCD.',
        'Use a temp variable to swap values.',
      ],
      concepts: ['Euclidean algorithm', 'GCD', 'while loop', 'algorithm'],
    },
    {
      id: 'c-loops-14',
      title: 'Predict do-while',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output of a do-while that checks a false condition.',
      skeleton: `#include <stdio.h>

int main(void) {
    int n = 0;

    do {
        printf("%d ", n);
        n++;
    } while (n < 0);

    printf("\\n");

    while (n < 0) {
        printf("never\\n");
        n++;
    }

    printf("final: %d\\n", n);
    return 0;
}`,
      solution: `0 
final: 1`,
      hints: [
        'do-while executes at least once even if condition is false.',
        'n starts at 0, prints "0 ", increments to 1, then 1 < 0 is false.',
        'The while loop never executes because 1 < 0 is false.',
      ],
      concepts: ['do-while vs while', 'minimum one execution', 'false initial condition'],
    },
    {
      id: 'c-loops-15',
      title: 'Fix infinite loop',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the infinite loop caused by a logic error.',
      skeleton: `#include <stdio.h>

int main(void) {
    int i = 10;
    while (i > 0) {
        printf("%d ", i);
        if (i % 2 == 0) {
            i += 1;  // Bug: should be decrementing
        } else {
            i -= 3;
        }
    }
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int i = 10;
    while (i > 0) {
        printf("%d ", i);
        if (i % 2 == 0) {
            i -= 1;
        } else {
            i -= 3;
        }
    }
    printf("\\n");
    return 0;
}`,
      hints: [
        'When i is even, i += 1 makes it odd, then i -= 3... but it oscillates.',
        'The intent is to count down; change i += 1 to i -= 1.',
        'With -= 1 for even and -= 3 for odd, i decreases and reaches 0.',
      ],
      concepts: ['infinite loop bug', 'loop termination', 'decrement logic'],
    },
    {
      id: 'c-loops-16',
      title: 'Collatz sequence',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that prints the Collatz sequence starting from n.',
      skeleton: `// Write void collatz(int n) that prints the Collatz sequence:
// If n is even: n = n / 2
// If n is odd: n = 3n + 1
// Continue until n == 1. Print each value.`,
      solution: `#include <stdio.h>

void collatz(int n) {
    while (n != 1) {
        printf("%d -> ", n);
        if (n % 2 == 0) {
            n /= 2;
        } else {
            n = 3 * n + 1;
        }
    }
    printf("1\\n");
}

int main(void) {
    collatz(6);
    collatz(27);
    return 0;
}`,
      hints: [
        'Check if n is even with n % 2 == 0.',
        'Even: divide by 2. Odd: multiply by 3 and add 1.',
        'Loop until n reaches 1.',
      ],
      concepts: ['Collatz conjecture', 'while loop', 'conditional branching'],
    },
    {
      id: 'c-loops-17',
      title: 'Loop idiom: flag variable',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use a flag variable to detect a condition during a loop.',
      skeleton: `#include <stdio.h>

int is_sorted(int arr[], int len) {
    int __BLANK__ = 1;
    for (int i = 0; i < len __BLANK__ 1; i++) {
        if (arr[i] > arr[i + 1]) {
            __BLANK__ = 0;
            break;
        }
    }
    return sorted;
}

int main(void) {
    int a[] = {1, 3, 5, 7, 9};
    int b[] = {1, 5, 3, 7, 9};
    printf("%d\\n", is_sorted(a, 5));
    printf("%d\\n", is_sorted(b, 5));
    return 0;
}`,
      solution: `#include <stdio.h>

int is_sorted(int arr[], int len) {
    int sorted = 1;
    for (int i = 0; i < len - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            sorted = 0;
            break;
        }
    }
    return sorted;
}

int main(void) {
    int a[] = {1, 3, 5, 7, 9};
    int b[] = {1, 5, 3, 7, 9};
    printf("%d\\n", is_sorted(a, 5));
    printf("%d\\n", is_sorted(b, 5));
    return 0;
}`,
      hints: [
        'Initialize a flag variable sorted to 1 (true).',
        'Loop to len - 1 to safely access arr[i + 1].',
        'Set sorted to 0 if any adjacent pair is out of order.',
      ],
      concepts: ['flag variable', 'sorted check', 'loop idiom'],
    },
    {
      id: 'c-loops-18',
      title: 'Fix continue in while',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the infinite loop caused by continue skipping the increment.',
      skeleton: `#include <stdio.h>

int main(void) {
    int i = 0;
    while (i < 10) {
        if (i == 5) {
            printf("skipping 5\\n");
            continue;  // Bug: i never gets incremented
        }
        printf("%d\\n", i);
        i++;
    }
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int i = 0;
    while (i < 10) {
        if (i == 5) {
            printf("skipping 5\\n");
            i++;
            continue;
        }
        printf("%d\\n", i);
        i++;
    }
    return 0;
}`,
      hints: [
        'continue jumps back to the while condition check.',
        'Since i++ is at the bottom, continue skips it, causing an infinite loop at i=5.',
        'Add i++ before continue, or restructure the loop.',
      ],
      concepts: ['continue bug', 'while loop increment', 'infinite loop'],
    },
    {
      id: 'c-loops-19',
      title: 'Refactor to for loop',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Refactor the while loop into an equivalent for loop.',
      skeleton: `#include <stdio.h>

int main(void) {
    int sum = 0;
    int i = 1;
    while (i <= 100) {
        sum += i;
        i++;
    }
    printf("Sum 1-100: %d\\n", sum);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int sum = 0;
    for (int i = 1; i <= 100; i++) {
        sum += i;
    }
    printf("Sum 1-100: %d\\n", sum);
    return 0;
}`,
      hints: [
        'A for loop combines init, condition, and increment in one line.',
        'Move int i = 1 to the for init, i <= 100 to condition, i++ to increment.',
        'The loop body just has sum += i.',
      ],
      concepts: ['while to for refactor', 'loop equivalence', 'code clarity'],
    },
    {
      id: 'c-loops-20',
      title: 'Refactor nested to function',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor a deeply nested loop into separate functions for clarity.',
      skeleton: `#include <stdio.h>

int main(void) {
    int primes_found = 0;
    for (int n = 2; n <= 50; n++) {
        int is_prime = 1;
        for (int d = 2; d * d <= n; d++) {
            if (n % d == 0) {
                is_prime = 0;
                break;
            }
        }
        if (is_prime) {
            printf("%d ", n);
            primes_found++;
        }
    }
    printf("\\nFound %d primes\\n", primes_found);
    return 0;
}`,
      solution: `#include <stdio.h>

int is_prime(int n) {
    if (n < 2) return 0;
    for (int d = 2; d * d <= n; d++) {
        if (n % d == 0) return 0;
    }
    return 1;
}

int main(void) {
    int primes_found = 0;
    for (int n = 2; n <= 50; n++) {
        if (is_prime(n)) {
            printf("%d ", n);
            primes_found++;
        }
    }
    printf("\\nFound %d primes\\n", primes_found);
    return 0;
}`,
      hints: [
        'Extract the inner primality check into an is_prime function.',
        'The function returns 1 if prime, 0 if not.',
        'The main loop becomes much cleaner with just if (is_prime(n)).',
      ],
      concepts: ['function extraction', 'code clarity', 'single responsibility'],
    },
  ],
};
