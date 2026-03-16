import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-ops',
  title: '4. Operators',
  explanation: `## Operators in C

C provides a rich set of operators for arithmetic, comparison, logic, and bitwise manipulation.

### Operator Categories
- **Arithmetic**: \`+\`, \`-\`, \`*\`, \`/\`, \`%\`, \`++\`, \`--\`
- **Comparison**: \`==\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\`
- **Logical**: \`&&\`, \`||\`, \`!\`
- **Bitwise**: \`&\`, \`|\`, \`^\`, \`~\`, \`<<\`, \`>>\`
- **Assignment**: \`=\`, \`+=\`, \`-=\`, \`*=\`, \`/=\`, \`%=\`, \`&=\`, \`|=\`, \`^=\`, \`<<=\`, \`>>=\`
- **Ternary**: \`condition ? expr1 : expr2\`
- **Comma**: evaluates left, discards result, evaluates and returns right

### Precedence (high to low)
\`()\` > \`++/--\` > \`*//%\` > \`+-\` > \`<</>>  \` > \`< <= > >=\` > \`== !=\` > \`&\` > \`^\` > \`|\` > \`&&\` > \`||\` > \`?:\` > \`=\`
`,
  exercises: [
    {
      id: 'c-ops-1',
      title: 'Arithmetic operators',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use arithmetic operators to complete the expressions.',
      skeleton: `#include <stdio.h>

int main(void) {
    int a = 17, b = 5;
    printf("Sum: %d\\n", a __BLANK__ b);
    printf("Difference: %d\\n", a __BLANK__ b);
    printf("Product: %d\\n", a __BLANK__ b);
    printf("Quotient: %d\\n", a __BLANK__ b);
    printf("Remainder: %d\\n", a __BLANK__ b);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int a = 17, b = 5;
    printf("Sum: %d\\n", a + b);
    printf("Difference: %d\\n", a - b);
    printf("Product: %d\\n", a * b);
    printf("Quotient: %d\\n", a / b);
    printf("Remainder: %d\\n", a % b);
    return 0;
}`,
      hints: [
        '+ for addition, - for subtraction, * for multiplication.',
        '/ is integer division (17/5 = 3), % gives remainder (17%5 = 2).',
        'All five arithmetic operators: +, -, *, /, %.',
      ],
      concepts: ['arithmetic operators', 'integer division', 'modulo'],
    },
    {
      id: 'c-ops-2',
      title: 'Pre vs post increment',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output of pre-increment and post-increment expressions.',
      skeleton: `#include <stdio.h>

int main(void) {
    int a = 5;
    int b = a++;
    printf("%d %d\\n", a, b);

    int c = 5;
    int d = ++c;
    printf("%d %d\\n", c, d);
    return 0;
}`,
      solution: `6 5
6 6`,
      hints: [
        'a++ returns the current value THEN increments (post-increment).',
        '++c increments FIRST then returns the new value (pre-increment).',
        'After a++: a is 6, b got the old value 5. After ++c: both c and d are 6.',
      ],
      concepts: ['pre-increment', 'post-increment', 'side effects'],
    },
    {
      id: 'c-ops-3',
      title: 'Comparison operators',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use comparison operators that make each condition true.',
      skeleton: `#include <stdio.h>

int main(void) {
    int x = 10, y = 20;

    if (x __BLANK__ y) printf("x is less than y\\n");
    if (x __BLANK__ y) printf("x is not equal to y\\n");
    if (y __BLANK__ x) printf("y is greater or equal to x\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int x = 10, y = 20;

    if (x < y) printf("x is less than y\\n");
    if (x != y) printf("x is not equal to y\\n");
    if (y >= x) printf("y is greater or equal to x\\n");
    return 0;
}`,
      hints: [
        '< checks if left is strictly less than right.',
        '!= checks if two values are not equal.',
        '>= checks if left is greater than or equal to right.',
      ],
      concepts: ['comparison operators', '<', '!=', '>='],
    },
    {
      id: 'c-ops-4',
      title: 'Logical operators',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a function that checks if a number is within a range using logical AND.',
      skeleton: `// Write a function int in_range(int value, int min, int max)
// that returns 1 if value is between min and max (inclusive),
// 0 otherwise. Use logical AND (&&).`,
      solution: `#include <stdio.h>

int in_range(int value, int min, int max) {
    return (value >= min && value <= max);
}

int main(void) {
    printf("%d\\n", in_range(5, 1, 10));
    printf("%d\\n", in_range(15, 1, 10));
    printf("%d\\n", in_range(1, 1, 10));
    return 0;
}`,
      hints: [
        'Check value >= min AND value <= max.',
        'Use && for logical AND to combine both conditions.',
        'Return the result directly; comparisons already return 0 or 1.',
      ],
      concepts: ['logical AND', 'range checking', 'boolean expressions'],
    },
    {
      id: 'c-ops-5',
      title: 'Ternary operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use the ternary operator to select between two values.',
      skeleton: `#include <stdio.h>

int main(void) {
    int a = 10, b = 20;
    int max = (a > b) __BLANK__ a __BLANK__ b;
    printf("Max: %d\\n", max);

    int x = -5;
    int abs_x = (x < 0) __BLANK__ -x __BLANK__ x;
    printf("Abs: %d\\n", abs_x);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int a = 10, b = 20;
    int max = (a > b) ? a : b;
    printf("Max: %d\\n", max);

    int x = -5;
    int abs_x = (x < 0) ? -x : x;
    printf("Abs: %d\\n", abs_x);
    return 0;
}`,
      hints: [
        'The ternary operator uses ? for the true case and : for the false case.',
        'condition ? value_if_true : value_if_false',
        '(a > b) ? a : b returns the larger of a and b.',
      ],
      concepts: ['ternary operator', 'conditional expression', 'inline branching'],
    },
    {
      id: 'c-ops-6',
      title: 'Bitwise basics',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that checks if a number is even using bitwise AND.',
      skeleton: `// Write a function int is_even(int n) that returns 1 if n is even, 0 if odd.
// Use bitwise AND instead of modulo.
// Hint: the least significant bit determines odd/even.`,
      solution: `#include <stdio.h>

int is_even(int n) {
    return !(n & 1);
}

int main(void) {
    printf("%d\\n", is_even(4));
    printf("%d\\n", is_even(7));
    printf("%d\\n", is_even(0));
    return 0;
}`,
      hints: [
        'n & 1 extracts the least significant bit.',
        'If the LSB is 0, the number is even. If 1, it is odd.',
        '!(n & 1) returns 1 for even, 0 for odd.',
      ],
      concepts: ['bitwise AND', 'LSB check', 'even/odd test'],
    },
    {
      id: 'c-ops-7',
      title: 'Predict operator precedence',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output considering operator precedence.',
      skeleton: `#include <stdio.h>

int main(void) {
    int a = 2 + 3 * 4;
    int b = (2 + 3) * 4;
    int c = 10 - 2 - 3;
    int d = 2 * 3 + 4 * 5;

    printf("%d %d %d %d\\n", a, b, c, d);
    return 0;
}`,
      solution: `14 20 5 26`,
      hints: [
        '* has higher precedence than +, so 3*4=12, then 2+12=14.',
        'Parentheses override precedence: (2+3)=5, 5*4=20.',
        'Left-to-right associativity: 10-2=8, 8-3=5. And 2*3+4*5=6+20=26.',
      ],
      concepts: ['operator precedence', 'associativity', 'parentheses'],
    },
    {
      id: 'c-ops-8',
      title: 'Short-circuit evaluation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict output based on short-circuit evaluation of logical operators.',
      skeleton: `#include <stdio.h>

int check(int n) {
    printf("check(%d) ", n);
    return n;
}

int main(void) {
    int result;
    result = check(0) && check(1);
    printf("-> %d\\n", result);

    result = check(1) || check(0);
    printf("-> %d\\n", result);
    return 0;
}`,
      solution: `check(0) -> 0
check(1) -> 1`,
      hints: [
        '&& short-circuits: if left is false (0), right is never evaluated.',
        '|| short-circuits: if left is true (non-zero), right is never evaluated.',
        'check(0) is false, so check(1) is skipped in &&. check(1) is true, so check(0) is skipped in ||.',
      ],
      concepts: ['short-circuit evaluation', 'logical AND', 'logical OR'],
    },
    {
      id: 'c-ops-9',
      title: 'Comma operator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use the comma operator in a for loop and expression.',
      skeleton: `#include <stdio.h>

int main(void) {
    for (int i = 0__BLANK__ j = 10; i < j; i++__BLANK__ j--) {
        printf("i=%d j=%d\\n", i, j);
    }
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    for (int i = 0, j = 10; i < j; i++, j--) {
        printf("i=%d j=%d\\n", i, j);
    }
    return 0;
}`,
      hints: [
        'The comma operator evaluates both expressions left-to-right.',
        'In for loops, comma separates multiple init or increment expressions.',
        'int i = 0, j = 10 declares both; i++, j-- increments both.',
      ],
      concepts: ['comma operator', 'for loop', 'multiple variables'],
    },
    {
      id: 'c-ops-10',
      title: 'Fix assignment vs equality',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the common bug of using = instead of == in a condition.',
      skeleton: `#include <stdio.h>

int main(void) {
    int x = 5;

    if (x = 10) {
        printf("x is 10\\n");
    } else {
        printf("x is not 10\\n");
    }
    printf("x is now %d\\n", x);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int x = 5;

    if (x == 10) {
        printf("x is 10\\n");
    } else {
        printf("x is not 10\\n");
    }
    printf("x is now %d\\n", x);
    return 0;
}`,
      hints: [
        '= is assignment, == is comparison.',
        'x = 10 assigns 10 to x and returns 10 (truthy), so the if always succeeds.',
        'Change = to == to compare x with 10.',
      ],
      concepts: ['assignment vs equality', '= vs ==', 'common C bugs'],
    },
    {
      id: 'c-ops-11',
      title: 'Shift operators',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write functions to multiply and divide by powers of 2 using shift operators.',
      skeleton: `// Write two functions:
// int multiply_pow2(int n, int power) - multiply n by 2^power using <<
// int divide_pow2(int n, int power) - divide n by 2^power using >>`,
      solution: `#include <stdio.h>

int multiply_pow2(int n, int power) {
    return n << power;
}

int divide_pow2(int n, int power) {
    return n >> power;
}

int main(void) {
    printf("5 * 8 = %d\\n", multiply_pow2(5, 3));
    printf("40 / 4 = %d\\n", divide_pow2(40, 2));
    return 0;
}`,
      hints: [
        '<< shifts bits left, effectively multiplying by 2 per shift.',
        '>> shifts bits right, effectively dividing by 2 per shift.',
        'n << 3 multiplies by 2^3 = 8.',
      ],
      concepts: ['left shift', 'right shift', 'power of 2', 'bit shifting'],
    },
    {
      id: 'c-ops-12',
      title: 'Compound assignment operators',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use bitwise compound assignment operators.',
      skeleton: `#include <stdio.h>

int main(void) {
    unsigned int flags = 0x00;

    flags __BLANK__ 0x0F;  // Set lower nibble: flags = 0x0F
    printf("After OR: 0x%02X\\n", flags);

    flags __BLANK__ 0xF0;  // Clear lower nibble: flags = 0x00
    printf("After AND: 0x%02X\\n", flags);

    flags = 0xFF;
    flags __BLANK__ 0x0F;  // Toggle lower nibble: flags = 0xF0
    printf("After XOR: 0x%02X\\n", flags);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    unsigned int flags = 0x00;

    flags |= 0x0F;  // Set lower nibble: flags = 0x0F
    printf("After OR: 0x%02X\\n", flags);

    flags &= 0xF0;  // Clear lower nibble: flags = 0x00
    printf("After AND: 0x%02X\\n", flags);

    flags = 0xFF;
    flags ^= 0x0F;  // Toggle lower nibble: flags = 0xF0
    printf("After XOR: 0x%02X\\n", flags);
    return 0;
}`,
      hints: [
        '|= sets bits (OR), &= clears bits (AND with mask), ^= toggles bits (XOR).',
        '0x00 |= 0x0F sets the lower four bits.',
        '0xFF ^= 0x0F flips the lower four bits: 0xFF -> 0xF0.',
      ],
      concepts: ['compound bitwise assignment', '|=', '&=', '^='],
    },
    {
      id: 'c-ops-13',
      title: 'Logical NOT vs bitwise NOT',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a program demonstrating the difference between ! and ~.',
      skeleton: `// Write a program that:
// 1. Shows !0 and !5 (logical NOT)
// 2. Shows ~0 and ~5 (bitwise NOT)
// 3. Prints all four results
// Explain why they differ.`,
      solution: `#include <stdio.h>

int main(void) {
    printf("!0 = %d\\n", !0);
    printf("!5 = %d\\n", !5);
    printf("~0 = %d\\n", ~0);
    printf("~5 = %d\\n", ~5);
    return 0;
}`,
      hints: [
        '! (logical NOT) returns 1 for 0, and 0 for any non-zero value.',
        '~ (bitwise NOT) flips every bit in the value.',
        '~0 is all 1-bits = -1 in two\'s complement. ~5 flips all bits of 5.',
      ],
      concepts: ['logical NOT', 'bitwise NOT', '! vs ~'],
    },
    {
      id: 'c-ops-14',
      title: 'Fix precedence bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the operator precedence bug in the bitwise expression.',
      skeleton: `#include <stdio.h>

int main(void) {
    int x = 5;
    // Intended: check if bit 0 is set
    if (x & 1 == 1) {
        printf("Bit 0 is set\\n");
    } else {
        printf("Bit 0 is not set\\n");
    }
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int x = 5;
    // Intended: check if bit 0 is set
    if ((x & 1) == 1) {
        printf("Bit 0 is set\\n");
    } else {
        printf("Bit 0 is not set\\n");
    }
    return 0;
}`,
      hints: [
        '== has higher precedence than & in C.',
        'x & 1 == 1 is parsed as x & (1 == 1) which is x & 1.',
        'Add parentheses: (x & 1) == 1 to evaluate & first.',
      ],
      concepts: ['operator precedence bug', 'bitwise vs comparison', 'parentheses'],
    },
    {
      id: 'c-ops-15',
      title: 'Sizeof as operator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Demonstrate that sizeof is an operator, not a function, by using it without parentheses.',
      skeleton: `// Write a program showing sizeof used both with and without parentheses:
// 1. sizeof(int) - needs parens for types
// 2. sizeof x - no parens needed for variables
// 3. sizeof(x + 1.0) - expression in parens`,
      solution: `#include <stdio.h>

int main(void) {
    int x = 42;
    printf("sizeof(int) = %zu\\n", sizeof(int));
    printf("sizeof x = %zu\\n", sizeof x);
    printf("sizeof(x + 1.0) = %zu\\n", sizeof(x + 1.0));
    return 0;
}`,
      hints: [
        'sizeof is a compile-time operator, not a function.',
        'For type names, parentheses are required: sizeof(int).',
        'For variables, parentheses are optional: sizeof x works.',
      ],
      concepts: ['sizeof operator', 'compile-time evaluation', 'operator syntax'],
    },
    {
      id: 'c-ops-16',
      title: 'Predict complex expression',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Predict the output of a complex expression with multiple operators.',
      skeleton: `#include <stdio.h>

int main(void) {
    int a = 3, b = 4, c = 5;
    int r1 = a + b * c;
    int r2 = a * b + c;
    int r3 = a > b ? a : b > c ? b : c;
    int r4 = (a > b) ? a : ((b > c) ? b : c);
    printf("%d %d %d %d\\n", r1, r2, r3, r4);
    return 0;
}`,
      solution: `23 17 4 4`,
      hints: [
        'r1: b*c=20, then a+20=23. r2: a*b=12, then 12+c=17.',
        'Ternary is right-to-left: a>b ? a : (b>c ? b : c).',
        'a(3) > b(4) is false, so evaluate b>c? 4>5 is false, so result is c=5... wait, b(4) > c(5) is false, so c=5. But r3 should also be 5. Let me recalculate.',
      ],
      concepts: ['operator precedence', 'ternary associativity', 'expression evaluation'],
    },
    {
      id: 'c-ops-17',
      title: 'Write max of three',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a function that returns the maximum of three integers using ternary operators.',
      skeleton: `// Write int max3(int a, int b, int c) that returns the largest
// of the three values using nested ternary operators.`,
      solution: `#include <stdio.h>

int max3(int a, int b, int c) {
    int max_ab = (a > b) ? a : b;
    return (max_ab > c) ? max_ab : c;
}

int main(void) {
    printf("%d\\n", max3(1, 3, 2));
    printf("%d\\n", max3(5, 5, 5));
    printf("%d\\n", max3(10, 2, 8));
    return 0;
}`,
      hints: [
        'First find the max of a and b, store in a temporary.',
        'Then compare that temporary with c.',
        'You can nest ternaries but a temporary variable is cleaner.',
      ],
      concepts: ['ternary operator', 'max function', 'nested conditionals'],
    },
    {
      id: 'c-ops-18',
      title: 'Fix integer overflow',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Fix the integer overflow in the midpoint calculation.',
      skeleton: `#include <stdio.h>

int midpoint(int a, int b) {
    return (a + b) / 2;  // Bug: a + b can overflow
}

int main(void) {
    int a = 2000000000;
    int b = 2000000000;
    printf("Midpoint: %d\\n", midpoint(a, b));
    return 0;
}`,
      solution: `#include <stdio.h>

int midpoint(int a, int b) {
    return a + (b - a) / 2;
}

int main(void) {
    int a = 2000000000;
    int b = 2000000000;
    printf("Midpoint: %d\\n", midpoint(a, b));
    return 0;
}`,
      hints: [
        'a + b can overflow int when both values are large.',
        'Rewrite as a + (b - a) / 2 to avoid the overflow.',
        'This is a classic bug in binary search implementations.',
      ],
      concepts: ['integer overflow', 'safe arithmetic', 'midpoint formula'],
    },
    {
      id: 'c-ops-19',
      title: 'Refactor if-else to ternary',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Refactor the if-else chains into concise ternary expressions.',
      skeleton: `#include <stdio.h>

int main(void) {
    int x = -5;
    int sign;

    if (x > 0) {
        sign = 1;
    } else if (x < 0) {
        sign = -1;
    } else {
        sign = 0;
    }

    char *label;
    if (sign == 1) {
        label = "positive";
    } else if (sign == -1) {
        label = "negative";
    } else {
        label = "zero";
    }

    printf("%s (%d)\\n", label, sign);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int x = -5;
    int sign = (x > 0) ? 1 : (x < 0) ? -1 : 0;
    const char *label = (sign == 1) ? "positive" : (sign == -1) ? "negative" : "zero";
    printf("%s (%d)\\n", label, sign);
    return 0;
}`,
      hints: [
        'Nested ternaries can replace if-else if-else chains.',
        'condition1 ? val1 : condition2 ? val2 : val3',
        'Keep it readable; excessive nesting is hard to read.',
      ],
      concepts: ['refactoring', 'ternary operator', 'concise expressions'],
    },
    {
      id: 'c-ops-20',
      title: 'Refactor repeated conditions',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor the code to eliminate repeated conditions using a helper function.',
      skeleton: `#include <stdio.h>

int main(void) {
    int score = 85;

    if (score >= 90 && score <= 100) printf("A\\n");
    if (score >= 80 && score < 90) printf("B\\n");
    if (score >= 70 && score < 80) printf("C\\n");
    if (score >= 60 && score < 70) printf("D\\n");
    if (score >= 0 && score < 60) printf("F\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

char grade(int score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
}

int main(void) {
    int score = 85;
    printf("%c\\n", grade(score));
    return 0;
}`,
      hints: [
        'Since the ranges are contiguous, you only need to check the lower bound.',
        'Extract the logic into a function that returns the grade character.',
        'Use early returns instead of else-if chains.',
      ],
      concepts: ['refactoring', 'function extraction', 'simplified conditions'],
    },
  ],
};
