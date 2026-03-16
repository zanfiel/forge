import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-flow',
  title: '04. Control Flow',
  explanation: `## Control Flow in C++

Control flow statements determine the order in which code executes.

### if / else if / else
\`\`\`cpp
if (x > 0) {
    std::cout << "positive" << std::endl;
} else if (x < 0) {
    std::cout << "negative" << std::endl;
} else {
    std::cout << "zero" << std::endl;
}
\`\`\`

### switch
Compares a value against multiple compile-time constants:
\`\`\`cpp
switch (day) {
    case 1: std::cout << "Monday"; break;
    case 2: std::cout << "Tuesday"; break;
    default: std::cout << "Other"; break;
}
\`\`\`
Forgetting \`break\` causes **fall-through** to the next case.

### for loop
\`\`\`cpp
for (int i = 0; i < 10; ++i) {
    std::cout << i << " ";
}
\`\`\`

### while loop
\`\`\`cpp
while (condition) {
    // body
}
\`\`\`

### do-while loop
Executes the body at least once:
\`\`\`cpp
do {
    // body
} while (condition);
\`\`\`

### Range-based for (C++11)
Iterates over elements of a container or array:
\`\`\`cpp
int arr[] = {1, 2, 3, 4, 5};
for (int x : arr) {
    std::cout << x << " ";
}
\`\`\`

### break and continue
- \`break\` -- exits the innermost loop or switch
- \`continue\` -- skips the rest of the current iteration
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-flow-1',
      title: 'Basic if condition',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the keyword to start a conditional block.',
      skeleton: `#include <iostream>

int main() {
    int x = 10;
    __BLANK__ (x > 5) {
        std::cout << "greater" << std::endl;
    }
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int x = 10;
    if (x > 5) {
        std::cout << "greater" << std::endl;
    }
    return 0;
}`,
      hints: [
        'You need the keyword that introduces a conditional statement.',
        'It evaluates the expression in parentheses as true or false.',
        'The keyword is `if`.',
      ],
      concepts: ['if statement', 'conditional'],
    },
    {
      id: 'cpp-flow-2',
      title: 'Switch break',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the keyword that prevents fall-through in a switch case.',
      skeleton: `#include <iostream>

int main() {
    int day = 1;
    switch (day) {
        case 1:
            std::cout << "Monday" << std::endl;
            __BLANK__;
        case 2:
            std::cout << "Tuesday" << std::endl;
            __BLANK__;
        default:
            std::cout << "Other" << std::endl;
    }
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int day = 1;
    switch (day) {
        case 1:
            std::cout << "Monday" << std::endl;
            break;
        case 2:
            std::cout << "Tuesday" << std::endl;
            break;
        default:
            std::cout << "Other" << std::endl;
    }
    return 0;
}`,
      hints: [
        'Without this keyword, execution continues into the next case.',
        'It exits the switch statement.',
        'The keyword is `break`.',
      ],
      concepts: ['switch', 'break', 'fall-through'],
    },
    {
      id: 'cpp-flow-3',
      title: 'For loop initialization',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the loop header to iterate from 0 to 4 (inclusive).',
      skeleton: `#include <iostream>

int main() {
    for (__BLANK__) {
        std::cout << i << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    for (int i = 0; i <= 4; ++i) {
        std::cout << i << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
      hints: [
        'A for loop has three parts: initialization; condition; increment.',
        'Start at 0 and go while i <= 4.',
        'int i = 0; i <= 4; ++i',
      ],
      concepts: ['for loop', 'iteration'],
    },
    {
      id: 'cpp-flow-4',
      title: 'Range-based for',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the range-based for syntax to iterate over the array.',
      skeleton: `#include <iostream>

int main() {
    int nums[] = {10, 20, 30, 40, 50};
    for (__BLANK__) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int nums[] = {10, 20, 30, 40, 50};
    for (int n : nums) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
      hints: [
        'Range-based for has the syntax: type variable : container.',
        'The colon separates the loop variable from the container.',
        'int n : nums',
      ],
      concepts: ['range-based for', 'array iteration'],
    },
    {
      id: 'cpp-flow-5',
      title: 'Continue keyword',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the keyword that skips the rest of the current loop iteration.',
      skeleton: `#include <iostream>

int main() {
    for (int i = 0; i < 10; ++i) {
        if (i % 2 != 0) {
            __BLANK__;
        }
        std::cout << i << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    for (int i = 0; i < 10; ++i) {
        if (i % 2 != 0) {
            continue;
        }
        std::cout << i << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
      hints: [
        'This keyword skips odd numbers so only even numbers are printed.',
        'It jumps to the next iteration of the loop.',
        'The keyword is `continue`.',
      ],
      concepts: ['continue', 'loop control'],
    },
    {
      id: 'cpp-flow-6',
      title: 'Do-while syntax',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the keyword that starts a loop that always runs at least once.',
      skeleton: `#include <iostream>

int main() {
    int count = 0;
    __BLANK__ {
        std::cout << count << " ";
        ++count;
    } while (count < 5);
    std::cout << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int count = 0;
    do {
        std::cout << count << " ";
        ++count;
    } while (count < 5);
    std::cout << std::endl;
    return 0;
}`,
      hints: [
        'This loop checks its condition after the body executes.',
        'It guarantees at least one execution.',
        'The keyword is `do`.',
      ],
      concepts: ['do-while', 'loop'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-flow-7',
      title: 'FizzBuzz',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write FizzBuzz for numbers 1 to 20. Print "Fizz" for multiples of 3, "Buzz" for multiples of 5, "FizzBuzz" for multiples of both, and the number otherwise. One output per line.',
      skeleton: `#include <iostream>

int main() {
    // FizzBuzz from 1 to 20
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    for (int i = 1; i <= 20; ++i) {
        if (i % 3 == 0 && i % 5 == 0) {
            std::cout << "FizzBuzz" << std::endl;
        } else if (i % 3 == 0) {
            std::cout << "Fizz" << std::endl;
        } else if (i % 5 == 0) {
            std::cout << "Buzz" << std::endl;
        } else {
            std::cout << i << std::endl;
        }
    }
    return 0;
}`,
      hints: [
        'Check divisible-by-both first, then by 3, then by 5.',
        'Use modulo (%) to check divisibility.',
        'if (i % 3 == 0 && i % 5 == 0) for FizzBuzz.',
      ],
      concepts: ['for loop', 'if/else', 'modulo'],
    },
    {
      id: 'cpp-flow-8',
      title: 'Sum with while loop',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Use a while loop to compute the sum of integers from 1 to 100. Print the result.',
      skeleton: `#include <iostream>

int main() {
    // Sum 1 to 100 using a while loop
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int sum = 0;
    int i = 1;
    while (i <= 100) {
        sum += i;
        ++i;
    }
    std::cout << sum << std::endl;
    return 0;
}`,
      hints: [
        'Initialize sum to 0 and a counter to 1.',
        'Add the counter to sum each iteration, then increment.',
        'while (i <= 100) { sum += i; ++i; }',
      ],
      concepts: ['while loop', 'accumulator'],
    },
    {
      id: 'cpp-flow-9',
      title: 'Multiplication table',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a program that prints a multiplication table for a number read from cin (1 through 10). Format: "N x I = RESULT".',
      skeleton: `#include <iostream>

int main() {
    // Read N, print its multiplication table from 1 to 10
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int n;
    std::cin >> n;
    for (int i = 1; i <= 10; ++i) {
        std::cout << n << " x " << i << " = " << n * i << std::endl;
    }
    return 0;
}`,
      hints: [
        'Use a for loop from 1 to 10.',
        'Multiply n by the loop counter each iteration.',
        'std::cout << n << " x " << i << " = " << n * i;',
      ],
      concepts: ['for loop', 'multiplication', 'formatted output'],
    },
    {
      id: 'cpp-flow-10',
      title: 'Input validation with do-while',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Use a do-while loop to repeatedly ask for input until the user enters a number between 1 and 10 (inclusive). Print the valid number.',
      skeleton: `#include <iostream>

int main() {
    // Keep asking until input is in [1, 10]
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int n;
    do {
        std::cout << "Enter a number (1-10): ";
        std::cin >> n;
    } while (n < 1 || n > 10);
    std::cout << "You entered: " << n << std::endl;
    return 0;
}`,
      hints: [
        'do-while ensures the prompt appears at least once.',
        'The condition should repeat while the input is invalid.',
        'while (n < 1 || n > 10)',
      ],
      concepts: ['do-while', 'input validation'],
    },
    {
      id: 'cpp-flow-11',
      title: 'Prime number checker',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Read an integer n from cin. Print "prime" if n is a prime number (greater than 1 with no divisors other than 1 and itself), otherwise print "not prime". Use break to exit early when a divisor is found.',
      skeleton: `#include <iostream>

int main() {
    // Read n, check if prime, print result
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int n;
    std::cin >> n;
    if (n <= 1) {
        std::cout << "not prime" << std::endl;
        return 0;
    }
    bool isPrime = true;
    for (int i = 2; i * i <= n; ++i) {
        if (n % i == 0) {
            isPrime = false;
            break;
        }
    }
    std::cout << (isPrime ? "prime" : "not prime") << std::endl;
    return 0;
}`,
      hints: [
        'Only check divisors up to the square root of n.',
        'If any divisor divides n evenly, it is not prime.',
        'Use i * i <= n as the loop condition to avoid computing sqrt.',
      ],
      concepts: ['for loop', 'break', 'prime numbers'],
    },
    {
      id: 'cpp-flow-12',
      title: 'Nested loops: triangle pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a program that prints a right triangle of stars with 5 rows. Row 1 has 1 star, row 2 has 2, etc.',
      skeleton: `#include <iostream>

int main() {
    // Print a 5-row triangle of stars
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    for (int i = 1; i <= 5; ++i) {
        for (int j = 0; j < i; ++j) {
            std::cout << "*";
        }
        std::cout << std::endl;
    }
    return 0;
}`,
      hints: [
        'Use a nested loop: outer for rows, inner for columns.',
        'The inner loop runs i times for row i.',
        'for (int j = 0; j < i; ++j) { std::cout << "*"; }',
      ],
      concepts: ['nested loops', 'pattern printing'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-flow-13',
      title: 'Fix the off-by-one error',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'This loop is supposed to print 1 through 5 but stops at 4. Fix the condition.',
      skeleton: `#include <iostream>

int main() {
    for (int i = 1; i < 5; ++i) {
        std::cout << i << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    for (int i = 1; i <= 5; ++i) {
        std::cout << i << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
      hints: [
        'The loop uses < 5 so it stops when i reaches 5.',
        'You want it to include 5.',
        'Change < to <=.',
      ],
      concepts: ['off-by-one', 'loop condition'],
    },
    {
      id: 'cpp-flow-14',
      title: 'Fix the infinite loop',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'This while loop never terminates. Fix it.',
      skeleton: `#include <iostream>

int main() {
    int i = 0;
    while (i < 5) {
        std::cout << i << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int i = 0;
    while (i < 5) {
        std::cout << i << " ";
        ++i;
    }
    std::cout << std::endl;
    return 0;
}`,
      hints: [
        'The loop variable never changes inside the loop.',
        'i stays at 0 forever, so i < 5 is always true.',
        'Add ++i; inside the loop body.',
      ],
      concepts: ['infinite loop', 'loop increment'],
    },
    {
      id: 'cpp-flow-15',
      title: 'Fix missing switch break',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'This switch falls through and prints extra output. Add the missing break statements.',
      skeleton: `#include <iostream>

int main() {
    int choice = 1;
    switch (choice) {
        case 1:
            std::cout << "Option A" << std::endl;
        case 2:
            std::cout << "Option B" << std::endl;
        case 3:
            std::cout << "Option C" << std::endl;
        default:
            std::cout << "Unknown" << std::endl;
    }
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int choice = 1;
    switch (choice) {
        case 1:
            std::cout << "Option A" << std::endl;
            break;
        case 2:
            std::cout << "Option B" << std::endl;
            break;
        case 3:
            std::cout << "Option C" << std::endl;
            break;
        default:
            std::cout << "Unknown" << std::endl;
            break;
    }
    return 0;
}`,
      hints: [
        'Without break, execution falls through to the next case.',
        'choice is 1 but all four messages print.',
        'Add break; after each case body.',
      ],
      concepts: ['switch', 'fall-through', 'break'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-flow-16',
      title: 'Predict for loop output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    for (int i = 10; i > 0; i -= 3) {
        std::cout << i << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
      solution: `10 7 4 1 `,
      hints: [
        'The loop starts at 10 and decrements by 3 each time.',
        '10, 7, 4, 1 -- next would be -2 which is not > 0.',
        'Output: 10 7 4 1',
      ],
      concepts: ['for loop', 'decrement'],
    },
    {
      id: 'cpp-flow-17',
      title: 'Predict switch fall-through',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    int x = 2;
    switch (x) {
        case 1: std::cout << "A";
        case 2: std::cout << "B";
        case 3: std::cout << "C";
        default: std::cout << "D";
    }
    std::cout << std::endl;
    return 0;
}`,
      solution: `BCD`,
      hints: [
        'There are no break statements, so execution falls through.',
        'x is 2, so it enters case 2 and prints B.',
        'Then falls through case 3 (C) and default (D): BCD.',
      ],
      concepts: ['switch', 'fall-through'],
    },
    {
      id: 'cpp-flow-18',
      title: 'Predict continue behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    for (int i = 0; i < 6; ++i) {
        if (i == 3) continue;
        if (i == 5) break;
        std::cout << i << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
      solution: `0 1 2 4 `,
      hints: [
        'continue skips i == 3, break exits at i == 5.',
        'Prints: 0, 1, 2 (skips 3), 4 (exits at 5).',
        'Output: 0 1 2 4',
      ],
      concepts: ['continue', 'break', 'loop control'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-flow-19',
      title: 'Replace if-else chain with switch',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor the if-else chain into a switch statement.',
      skeleton: `#include <iostream>

int main() {
    int month = 3;
    if (month == 1) {
        std::cout << "January" << std::endl;
    } else if (month == 2) {
        std::cout << "February" << std::endl;
    } else if (month == 3) {
        std::cout << "March" << std::endl;
    } else if (month == 4) {
        std::cout << "April" << std::endl;
    } else {
        std::cout << "Other" << std::endl;
    }
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int month = 3;
    switch (month) {
        case 1: std::cout << "January" << std::endl; break;
        case 2: std::cout << "February" << std::endl; break;
        case 3: std::cout << "March" << std::endl; break;
        case 4: std::cout << "April" << std::endl; break;
        default: std::cout << "Other" << std::endl; break;
    }
    return 0;
}`,
      hints: [
        'Each equality check becomes a case label.',
        'The else clause becomes the default case.',
        'Remember to add break after each case.',
      ],
      concepts: ['switch', 'refactoring', 'if-else chain'],
    },
    {
      id: 'cpp-flow-20',
      title: 'Replace index-based loop with range-for',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Replace the index-based for loop with a range-based for loop.',
      skeleton: `#include <iostream>

int main() {
    int scores[] = {85, 92, 78, 96, 88};
    int sum = 0;
    for (int i = 0; i < 5; ++i) {
        sum += scores[i];
    }
    std::cout << "Average: " << sum / 5 << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int scores[] = {85, 92, 78, 96, 88};
    int sum = 0;
    for (int s : scores) {
        sum += s;
    }
    std::cout << "Average: " << sum / 5 << std::endl;
    return 0;
}`,
      hints: [
        'Range-based for eliminates the index variable entirely.',
        'for (int s : scores) iterates over each element.',
        'Replace the loop body to use s instead of scores[i].',
      ],
      concepts: ['range-based for', 'refactoring', 'modern C++'],
    },
  ],
};
