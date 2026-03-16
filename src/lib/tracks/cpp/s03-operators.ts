import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-ops',
  title: '03. Operators',
  explanation: `## Operators in C++

C++ provides a comprehensive set of operators for arithmetic, comparison, logic, and bit manipulation.

### Arithmetic Operators
\`\`\`cpp
int a = 10, b = 3;
a + b   // 13  addition
a - b   // 7   subtraction
a * b   // 30  multiplication
a / b   // 3   integer division (truncates)
a % b   // 1   modulo (remainder)
\`\`\`

### Comparison Operators
\`\`\`cpp
a == b   // equal to
a != b   // not equal to
a < b    // less than
a > b    // greater than
a <= b   // less than or equal
a >= b   // greater than or equal
\`\`\`

### Logical Operators
\`\`\`cpp
&&   // logical AND (short-circuits)
||   // logical OR  (short-circuits)
!    // logical NOT
\`\`\`

### Bitwise Operators
\`\`\`cpp
a & b    // AND
a | b    // OR
a ^ b    // XOR
~a       // NOT (complement)
a << n   // left shift
a >> n   // right shift
\`\`\`

### Assignment Operators
\`\`\`cpp
a += b;   // a = a + b
a -= b;   // a = a - b
a *= b;   // a = a * b
a /= b;   // a = a / b
a %= b;   // a = a % b
a &= b;   // a = a & b
a |= b;   // a = a | b
a ^= b;   // a = a ^ b
a <<= n;  // a = a << n
a >>= n;  // a = a >> n
\`\`\`

### Ternary Operator
\`\`\`cpp
int max = (a > b) ? a : b;
\`\`\`

### Operator Precedence (high to low, simplified)
1. \`()\` -- grouping
2. \`!\`, \`~\`, unary \`+\`/\`-\`, \`++\`/\`--\`
3. \`*\`, \`/\`, \`%\`
4. \`+\`, \`-\`
5. \`<<\`, \`>>\`
6. \`<\`, \`<=\`, \`>\`, \`>=\`
7. \`==\`, \`!=\`
8. \`&\`, \`^\`, \`|\`
9. \`&&\`
10. \`||\`
11. \`?:\`
12. Assignment operators
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-ops-1',
      title: 'Modulo operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the operator that returns the remainder of integer division.',
      skeleton: `#include <iostream>

int main() {
    int remainder = 17 __BLANK__ 5;
    std::cout << remainder << std::endl;  // 2
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int remainder = 17 % 5;
    std::cout << remainder << std::endl;  // 2
    return 0;
}`,
      hints: [
        'The remainder after dividing 17 by 5 is 2.',
        'This operator is sometimes called modulo or mod.',
        'The operator is `%`.',
      ],
      concepts: ['modulo', 'remainder'],
    },
    {
      id: 'cpp-ops-2',
      title: 'Logical AND',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the logical operator that returns true only when both conditions are true.',
      skeleton: `#include <iostream>

int main() {
    int age = 25;
    bool hasLicense = true;
    if (age >= 18 __BLANK__ hasLicense) {
        std::cout << "Can drive" << std::endl;
    }
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int age = 25;
    bool hasLicense = true;
    if (age >= 18 && hasLicense) {
        std::cout << "Can drive" << std::endl;
    }
    return 0;
}`,
      hints: [
        'You need both conditions to be true.',
        'It short-circuits: if the first is false, the second is not evaluated.',
        'The operator is `&&`.',
      ],
      concepts: ['logical AND', 'short-circuit evaluation'],
    },
    {
      id: 'cpp-ops-3',
      title: 'Ternary operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the ternary operator syntax to select the larger value.',
      skeleton: `#include <iostream>

int main() {
    int a = 10, b = 20;
    int max = (a > b) __BLANK__ a __BLANK__ b;
    std::cout << max << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int a = 10, b = 20;
    int max = (a > b) ? a : b;
    std::cout << max << std::endl;
    return 0;
}`,
      hints: [
        'The ternary operator has the form: condition ? value_if_true : value_if_false.',
        'The two symbols are ? and :',
        'Fill in `?` and `:` respectively.',
      ],
      concepts: ['ternary operator', 'conditional expression'],
    },
    {
      id: 'cpp-ops-4',
      title: 'Bitwise OR',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the bitwise operator that combines flag bits.',
      skeleton: `#include <iostream>

int main() {
    int readFlag = 0x04;   // 100
    int writeFlag = 0x02;  // 010
    int permissions = readFlag __BLANK__ writeFlag;  // 110 = 0x06
    std::cout << permissions << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int readFlag = 0x04;   // 100
    int writeFlag = 0x02;  // 010
    int permissions = readFlag | writeFlag;  // 110 = 0x06
    std::cout << permissions << std::endl;
    return 0;
}`,
      hints: [
        'Combining flags sets bits that are 1 in either operand.',
        'This is a bitwise operation, not logical.',
        'The operator is `|` (single pipe, not double).',
      ],
      concepts: ['bitwise OR', 'flags'],
    },
    {
      id: 'cpp-ops-5',
      title: 'Left shift',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the operator that shifts bits to the left, effectively multiplying by a power of 2.',
      skeleton: `#include <iostream>

int main() {
    int value = 1;
    int shifted = value __BLANK__ 3;  // 1 * 2^3 = 8
    std::cout << shifted << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int value = 1;
    int shifted = value << 3;  // 1 * 2^3 = 8
    std::cout << shifted << std::endl;
    return 0;
}`,
      hints: [
        'Shifting left by n is the same as multiplying by 2^n.',
        'The operator uses angle brackets.',
        'The operator is `<<`.',
      ],
      concepts: ['left shift', 'bit manipulation'],
    },
    {
      id: 'cpp-ops-6',
      title: 'Compound assignment',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the compound assignment operator that adds and assigns.',
      skeleton: `#include <iostream>

int main() {
    int score = 100;
    score __BLANK__ 50;
    std::cout << score << std::endl;  // 150
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int score = 100;
    score += 50;
    std::cout << score << std::endl;  // 150
    return 0;
}`,
      hints: [
        'This operator combines addition and assignment into one.',
        'It is shorthand for score = score + 50.',
        'The operator is `+=`.',
      ],
      concepts: ['compound assignment', 'addition assignment'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-ops-7',
      title: 'Check if a number is even',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a program that reads an integer and prints "even" or "odd" using the modulo operator.',
      skeleton: `#include <iostream>

int main() {
    // Read an integer, print "even" or "odd"
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int n;
    std::cin >> n;
    if (n % 2 == 0) {
        std::cout << "even" << std::endl;
    } else {
        std::cout << "odd" << std::endl;
    }
    return 0;
}`,
      hints: [
        'A number is even if it is divisible by 2 with no remainder.',
        'Use the % operator to get the remainder.',
        'if (n % 2 == 0) means even.',
      ],
      concepts: ['modulo', 'even/odd', 'conditional'],
    },
    {
      id: 'cpp-ops-8',
      title: 'Clamp a value',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a program that reads an integer and clamps it to the range [0, 100] using the ternary operator. Print the result.',
      skeleton: `#include <iostream>

int main() {
    // Read an integer, clamp to [0, 100], print result
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int n;
    std::cin >> n;
    int clamped = (n < 0) ? 0 : (n > 100) ? 100 : n;
    std::cout << clamped << std::endl;
    return 0;
}`,
      hints: [
        'If the value is below 0, return 0. If above 100, return 100. Otherwise return the value.',
        'You can nest ternary operators.',
        '(n < 0) ? 0 : (n > 100) ? 100 : n',
      ],
      concepts: ['ternary operator', 'clamping'],
    },
    {
      id: 'cpp-ops-9',
      title: 'Power of 2 check',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a program that reads a positive integer and checks if it is a power of 2 using bitwise AND. Print "yes" or "no".',
      skeleton: `#include <iostream>

int main() {
    // Read a positive integer
    // Check if it is a power of 2 using bitwise AND
    // Print "yes" or "no"
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int n;
    std::cin >> n;
    if (n > 0 && (n & (n - 1)) == 0) {
        std::cout << "yes" << std::endl;
    } else {
        std::cout << "no" << std::endl;
    }
    return 0;
}`,
      hints: [
        'A power of 2 in binary has exactly one bit set (e.g., 8 = 1000).',
        'n - 1 flips all the bits below the highest set bit (e.g., 7 = 0111).',
        'So n & (n - 1) is 0 if and only if n is a power of 2.',
      ],
      concepts: ['bitwise AND', 'power of 2', 'bit manipulation'],
    },
    {
      id: 'cpp-ops-10',
      title: 'Swap without temporary using XOR',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a program that swaps two integer variables using XOR operations (no temporary variable). Print both before and after.',
      skeleton: `#include <iostream>

int main() {
    int a = 42, b = 99;
    // Print before swap
    // Swap using XOR
    // Print after swap
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int a = 42, b = 99;
    std::cout << a << " " << b << std::endl;
    a ^= b;
    b ^= a;
    a ^= b;
    std::cout << a << " " << b << std::endl;
    return 0;
}`,
      hints: [
        'XOR swap uses three XOR operations in sequence.',
        'a ^= b; b ^= a; a ^= b;',
        'This works because XOR is its own inverse.',
      ],
      concepts: ['XOR', 'swap', 'bit manipulation'],
    },
    {
      id: 'cpp-ops-11',
      title: 'Set, clear, and toggle a bit',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Given an integer value = 0, write code to: set bit 3 (using OR), then print the value; toggle bit 3 (using XOR), then print; set bit 3 again, then clear bit 3 (using AND with NOT), then print.',
      skeleton: `#include <iostream>

int main() {
    int value = 0;
    // Set bit 3, print
    // Toggle bit 3, print
    // Set bit 3 again, clear bit 3, print
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int value = 0;
    value |= (1 << 3);
    std::cout << value << std::endl;
    value ^= (1 << 3);
    std::cout << value << std::endl;
    value |= (1 << 3);
    value &= ~(1 << 3);
    std::cout << value << std::endl;
    return 0;
}`,
      hints: [
        'Set a bit: value |= (1 << n).',
        'Toggle a bit: value ^= (1 << n).',
        'Clear a bit: value &= ~(1 << n).',
      ],
      concepts: ['bit set', 'bit clear', 'bit toggle', 'bitwise operators'],
    },
    {
      id: 'cpp-ops-12',
      title: 'Grade calculator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a program that reads a score (0-100) and prints a letter grade using chained ternary operators: A (90+), B (80+), C (70+), D (60+), F (below 60).',
      skeleton: `#include <iostream>

int main() {
    // Read score, compute grade, print the letter
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int score;
    std::cin >> score;
    char grade = (score >= 90) ? 'A' :
                 (score >= 80) ? 'B' :
                 (score >= 70) ? 'C' :
                 (score >= 60) ? 'D' : 'F';
    std::cout << grade << std::endl;
    return 0;
}`,
      hints: [
        'Chain ternary operators to check each threshold in descending order.',
        'Start with the highest grade and fall through.',
        '(score >= 90) ? \'A\' : (score >= 80) ? \'B\' : ...',
      ],
      concepts: ['ternary operator', 'chained conditionals'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-ops-13',
      title: 'Fix precedence bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'This code intends to check if a bit is set, but operator precedence causes a bug. Fix it.',
      skeleton: `#include <iostream>

int main() {
    int flags = 5;  // binary: 101
    if (flags & 1 == 1) {  // Bug: == has higher precedence than &
        std::cout << "bit 0 is set" << std::endl;
    }
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int flags = 5;  // binary: 101
    if ((flags & 1) == 1) {
        std::cout << "bit 0 is set" << std::endl;
    }
    return 0;
}`,
      hints: [
        'The == operator has higher precedence than &.',
        'Without parentheses, this evaluates as flags & (1 == 1).',
        'Add parentheses around (flags & 1).',
      ],
      concepts: ['operator precedence', 'bitwise AND', 'parentheses'],
    },
    {
      id: 'cpp-ops-14',
      title: 'Fix integer division',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'This code expects a decimal result from division but gets 0. Fix it.',
      skeleton: `#include <iostream>

int main() {
    int total = 3;
    int count = 4;
    double average = total / count;  // Bug: integer division gives 0
    std::cout << average << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int total = 3;
    int count = 4;
    double average = static_cast<double>(total) / count;
    std::cout << average << std::endl;
    return 0;
}`,
      hints: [
        'Dividing two ints performs integer division, truncating the decimal.',
        'Cast one operand to double before dividing.',
        'Use static_cast<double>(total) / count.',
      ],
      concepts: ['integer division', 'static_cast', 'type promotion'],
    },
    {
      id: 'cpp-ops-15',
      title: 'Fix assignment vs comparison',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'This code has an assignment where a comparison was intended. Fix it.',
      skeleton: `#include <iostream>

int main() {
    int x = 5;
    if (x = 10) {  // Bug: assigns 10 to x instead of comparing
        std::cout << "x is 10" << std::endl;
    } else {
        std::cout << "x is not 10" << std::endl;
    }
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int x = 5;
    if (x == 10) {
        std::cout << "x is 10" << std::endl;
    } else {
        std::cout << "x is not 10" << std::endl;
    }
    return 0;
}`,
      hints: [
        'A single = is assignment, not comparison.',
        'The condition assigns 10 to x and then checks if 10 is truthy (it is).',
        'Use == for comparison.',
      ],
      concepts: ['assignment vs comparison', 'equality operator'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-ops-16',
      title: 'Predict short-circuit evaluation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    int x = 0;
    bool result = (x != 0) && (10 / x > 1);
    std::cout << std::boolalpha << result << std::endl;
    return 0;
}`,
      solution: `false`,
      hints: [
        'The && operator short-circuits: if the left side is false, the right side is never evaluated.',
        'x is 0, so (x != 0) is false.',
        'The division by zero is never reached. The result is false.',
      ],
      concepts: ['short-circuit evaluation', 'logical AND'],
    },
    {
      id: 'cpp-ops-17',
      title: 'Predict increment order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    int a = 5;
    int b = a++;
    int c = ++a;
    std::cout << a << " " << b << " " << c << std::endl;
    return 0;
}`,
      solution: `7 5 7`,
      hints: [
        'a++ (post-increment) returns the old value, then increments.',
        'b gets 5, then a becomes 6.',
        '++a (pre-increment) increments first, then returns the new value. a becomes 7, c gets 7.',
      ],
      concepts: ['post-increment', 'pre-increment'],
    },
    {
      id: 'cpp-ops-18',
      title: 'Predict bitwise XOR',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    int a = 12;  // 1100
    int b = 10;  // 1010
    std::cout << (a ^ b) << std::endl;
    return 0;
}`,
      solution: `6`,
      hints: [
        'XOR produces 1 where the bits differ.',
        '1100 XOR 1010 = 0110.',
        '0110 in decimal is 6.',
      ],
      concepts: ['bitwise XOR'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-ops-19',
      title: 'Simplify with compound assignment',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Refactor the code to use compound assignment operators (+=, -=, *=, /=) wherever possible.',
      skeleton: `#include <iostream>

int main() {
    int x = 10;
    x = x + 5;
    x = x * 2;
    x = x - 3;
    x = x / 4;
    x = x % 3;
    std::cout << x << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int x = 10;
    x += 5;
    x *= 2;
    x -= 3;
    x /= 4;
    x %= 3;
    std::cout << x << std::endl;
    return 0;
}`,
      hints: [
        'x = x + 5 can be written as x += 5.',
        'Apply the same pattern to all binary operators.',
        'Replace each x = x op val with x op= val.',
      ],
      concepts: ['compound assignment', 'code simplification'],
    },
    {
      id: 'cpp-ops-20',
      title: 'Replace nested ifs with logical operators',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor the nested if statements into a single condition using logical operators.',
      skeleton: `#include <iostream>

int main() {
    int age = 25;
    bool citizen = true;
    bool registered = true;

    if (age >= 18) {
        if (citizen) {
            if (registered) {
                std::cout << "eligible to vote" << std::endl;
            }
        }
    }
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int age = 25;
    bool citizen = true;
    bool registered = true;

    if (age >= 18 && citizen && registered) {
        std::cout << "eligible to vote" << std::endl;
    }
    return 0;
}`,
      hints: [
        'Multiple nested ifs that all must be true can be combined with &&.',
        'The short-circuit behavior preserves the same evaluation order.',
        'if (age >= 18 && citizen && registered)',
      ],
      concepts: ['logical AND', 'refactoring', 'nested conditionals'],
    },
  ],
};
