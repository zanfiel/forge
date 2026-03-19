import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-types',
  title: '3. Data Types',
  explanation: `## Data Types in C

C has a small set of fundamental types. The exact sizes depend on the platform, but typical sizes on modern 64-bit systems:

| Type | Typical Size | Format |
|------|-------------|--------|
| char | 1 byte | %c / %d |
| short | 2 bytes | %hd |
| int | 4 bytes | %d |
| long | 4-8 bytes | %ld |
| long long | 8 bytes | %lld |
| float | 4 bytes | %f |
| double | 8 bytes | %lf |

### Modifiers
- **signed / unsigned**: controls whether negative values are allowed
- **short / long**: modifies the size of int
- **sizeof**: operator that returns the size in bytes
- **limits.h**: defines INT_MAX, INT_MIN, etc.
`,
  exercises: [
    {
      id: 'c-types-1',
      title: 'Sizeof operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use sizeof to print the size of different types.',
      skeleton: `#include <stdio.h>

int main(void) {
    printf("char: %zu bytes\\n", __BLANK__(char));
    printf("int: %zu bytes\\n", __BLANK__(int));
    printf("double: %zu bytes\\n", __BLANK__(double));
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    printf("char: %zu bytes\\n", sizeof(char));
    printf("int: %zu bytes\\n", sizeof(int));
    printf("double: %zu bytes\\n", sizeof(double));
    return 0;
}`,
      hints: [
        'sizeof is an operator, not a function, but can use parentheses.',
        '%zu is the correct format specifier for size_t (the type sizeof returns).',
        'sizeof(char) is always 1 by definition.',
      ],
      concepts: ['sizeof operator', 'size_t', '%zu format'],
    },
    {
      id: 'c-types-2',
      title: 'Char type basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Declare a char variable and print it as both a character and its ASCII value.',
      skeleton: `#include <stdio.h>

int main(void) {
    __BLANK__ letter = 'A';
    printf("Character: %__BLANK__\\n", letter);
    printf("ASCII: %__BLANK__\\n", letter);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    char letter = 'A';
    printf("Character: %c\\n", letter);
    printf("ASCII: %d\\n", letter);
    return 0;
}`,
      hints: [
        'char is the type for single characters.',
        '%c prints the character, %d prints its integer (ASCII) value.',
        'char letter = \'A\'; stores the ASCII value 65.',
      ],
      concepts: ['char type', 'ASCII values', '%c format', 'character literals'],
    },
    {
      id: 'c-types-3',
      title: 'Unsigned integers',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a program that demonstrates unsigned vs signed integer range differences.',
      skeleton: `// Write a program that:
// 1. Declares unsigned int u = 4294967295 (max value for 32-bit unsigned)
// 2. Declares signed int s = -1
// 3. Prints both values
// 4. Shows they have the same bit pattern by casting`,
      solution: `#include <stdio.h>

int main(void) {
    unsigned int u = 4294967295U;
    int s = -1;

    printf("Unsigned: %u\\n", u);
    printf("Signed: %d\\n", s);
    printf("Signed as unsigned: %u\\n", (unsigned int)s);
    printf("Unsigned as signed: %d\\n", (int)u);
    return 0;
}`,
      hints: [
        'unsigned int can hold 0 to 4294967295 on 32-bit systems.',
        '-1 in two\'s complement has all bits set, same as max unsigned.',
        'Cast between signed and unsigned to see the same bits interpreted differently.',
      ],
      concepts: ['unsigned', 'signed', 'two\'s complement', 'type casting'],
    },
    {
      id: 'c-types-4',
      title: 'Float vs double precision',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a program showing the precision difference between float and double.',
      skeleton: `// Write a program that:
// 1. Stores 1.0/3.0 in both a float and a double
// 2. Prints each with 20 decimal places
// 3. Shows that double has more precision`,
      solution: `#include <stdio.h>

int main(void) {
    float f = 1.0f / 3.0f;
    double d = 1.0 / 3.0;

    printf("Float:  %.20f\\n", f);
    printf("Double: %.20lf\\n", d);
    return 0;
}`,
      hints: [
        'Use the f suffix for float literals: 1.0f.',
        'Print with %.20f to show 20 decimal places.',
        'float has about 7 significant digits, double about 15.',
      ],
      concepts: ['float precision', 'double precision', 'floating point'],
    },
    {
      id: 'c-types-5',
      title: 'Predict integer overflow',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict what happens when an unsigned char overflows.',
      skeleton: `#include <stdio.h>

int main(void) {
    unsigned char x = 255;
    x = x + 1;
    printf("%d\\n", x);

    unsigned char y = 0;
    y = y - 1;
    printf("%d\\n", y);
    return 0;
}`,
      solution: `0
255`,
      hints: [
        'unsigned char ranges from 0 to 255.',
        '255 + 1 wraps around to 0 for unsigned types.',
        '0 - 1 wraps around to 255 (unsigned wrapping is well-defined).',
      ],
      concepts: ['unsigned overflow', 'wrapping', 'modular arithmetic'],
    },
    {
      id: 'c-types-6',
      title: 'Limits header',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use limits.h to print the range of int and char.',
      skeleton: `#include <stdio.h>
#include <__BLANK__>

int main(void) {
    printf("int range: %d to %d\\n", __BLANK__, __BLANK__);
    printf("char range: %d to %d\\n", CHAR_MIN, CHAR_MAX);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <limits.h>

int main(void) {
    printf("int range: %d to %d\\n", INT_MIN, INT_MAX);
    printf("char range: %d to %d\\n", CHAR_MIN, CHAR_MAX);
    return 0;
}`,
      hints: [
        'limits.h defines macros for the ranges of integer types.',
        'INT_MIN and INT_MAX are the minimum and maximum values for int.',
        'CHAR_MIN and CHAR_MAX define the range for char.',
      ],
      concepts: ['limits.h', 'INT_MIN', 'INT_MAX', 'CHAR_MIN', 'CHAR_MAX'],
    },
    {
      id: 'c-types-7',
      title: 'Type casting',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use explicit casts to get correct division results.',
      skeleton: `#include <stdio.h>

int main(void) {
    int a = 7, b = 2;
    float result = (__BLANK__)a / b;
    printf("7 / 2 = %.2f\\n", result);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int a = 7, b = 2;
    float result = (float)a / b;
    printf("7 / 2 = %.2f\\n", result);
    return 0;
}`,
      hints: [
        'Integer division 7/2 gives 3, losing the remainder.',
        'Casting one operand to float forces floating-point division.',
        '(float)a converts a to float before the division.',
      ],
      concepts: ['type casting', 'integer division', 'implicit conversion'],
    },
    {
      id: 'c-types-8',
      title: 'Fix truncation bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the program where integer division causes incorrect results.',
      skeleton: `#include <stdio.h>

int main(void) {
    int total = 17;
    int count = 5;
    float average = total / count;
    printf("Average: %.2f\\n", average);
    // Prints 3.00 but should print 3.40
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int total = 17;
    int count = 5;
    float average = (float)total / count;
    printf("Average: %.2f\\n", average);
    return 0;
}`,
      hints: [
        'total / count does integer division first, then converts to float.',
        'The result of 17/5 is 3 in integer division.',
        'Cast total to float before dividing: (float)total / count.',
      ],
      concepts: ['integer division truncation', 'explicit cast', 'type promotion'],
    },
    {
      id: 'c-types-9',
      title: 'Long long type',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a program that computes a large factorial using long long.',
      skeleton: `// Write a function long long factorial(int n) that:
// 1. Returns the factorial of n using long long
// 2. In main, compute and print factorial(20)
// 3. Use %lld format specifier`,
      solution: `#include <stdio.h>

long long factorial(int n) {
    long long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

int main(void) {
    printf("20! = %lld\\n", factorial(20));
    return 0;
}`,
      hints: [
        'long long can hold values up to about 9.2 * 10^18.',
        'Use %lld to print a long long value.',
        '20! = 2432902008176640000, which fits in long long but not int.',
      ],
      concepts: ['long long', '%lld', 'large numbers', 'factorial'],
    },
    {
      id: 'c-types-10',
      title: 'Predict type conversion',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the result of implicit type conversions in expressions.',
      skeleton: `#include <stdio.h>

int main(void) {
    int i = 5;
    float f = 2.5f;
    double d = i + f;
    printf("%.1f\\n", d);

    char c = 'A';
    int result = c + 1;
    printf("%c\\n", result);
    return 0;
}`,
      solution: `7.5
B`,
      hints: [
        'int + float promotes the int to float, giving 5.0 + 2.5 = 7.5.',
        'char is implicitly converted to int in arithmetic.',
        '\'A\' is 65, so 65 + 1 = 66, which is \'B\'.',
      ],
      concepts: ['implicit conversion', 'type promotion', 'char arithmetic'],
    },
    {
      id: 'c-types-11',
      title: 'Short type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Declare short variables and print them with the correct format specifier.',
      skeleton: `#include <stdio.h>
#include <limits.h>

int main(void) {
    __BLANK__ small = 32767;
    printf("Value: %__BLANK__\\n", small);
    printf("Max short: %d\\n", __BLANK__);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <limits.h>

int main(void) {
    short small = 32767;
    printf("Value: %hd\\n", small);
    printf("Max short: %d\\n", SHRT_MAX);
    return 0;
}`,
      hints: [
        'short is typically 2 bytes, range -32768 to 32767.',
        '%hd is the format specifier for short.',
        'SHRT_MAX from limits.h gives the maximum short value.',
      ],
      concepts: ['short type', '%hd format', 'SHRT_MAX'],
    },
    {
      id: 'c-types-12',
      title: 'Boolean with stdbool',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a program using stdbool.h for boolean values (C99+).',
      skeleton: `// Write a program that:
// 1. Includes stdbool.h
// 2. Declares bool is_valid = true
// 3. Declares bool is_empty = false
// 4. Prints their integer values (true=1, false=0)`,
      solution: `#include <stdio.h>
#include <stdbool.h>

int main(void) {
    bool is_valid = true;
    bool is_empty = false;

    printf("is_valid: %d\\n", is_valid);
    printf("is_empty: %d\\n", is_empty);
    return 0;
}`,
      hints: [
        'stdbool.h defines bool, true, and false in C99.',
        'bool is actually _Bool, true is 1, false is 0.',
        'Print with %d since bool promotes to int.',
      ],
      concepts: ['stdbool.h', 'bool type', 'true', 'false', 'C99'],
    },
    {
      id: 'c-types-13',
      title: 'Fix wrong format specifiers',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix all the mismatched format specifiers in this program.',
      skeleton: `#include <stdio.h>

int main(void) {
    long long big = 9000000000LL;
    unsigned int flags = 255;
    short small = 100;

    printf("Big: %d\\n", big);
    printf("Flags: %d\\n", flags);
    printf("Small: %d\\n", small);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    long long big = 9000000000LL;
    unsigned int flags = 255;
    short small = 100;

    printf("Big: %lld\\n", big);
    printf("Flags: %u\\n", flags);
    printf("Small: %hd\\n", small);
    return 0;
}`,
      hints: [
        'long long needs %lld, not %d.',
        'unsigned int should use %u instead of %d.',
        'short should use %hd for correct format matching.',
      ],
      concepts: ['format specifier matching', '%lld', '%u', '%hd'],
    },
    {
      id: 'c-types-14',
      title: 'Predict float comparison',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the result of floating point comparison.',
      skeleton: `#include <stdio.h>

int main(void) {
    float a = 0.1f + 0.2f;
    float b = 0.3f;
    printf("%d\\n", a == b);
    printf("%.20f\\n", a);
    printf("%.20f\\n", b);
    return 0;
}`,
      solution: `0
0.30000001192092895508
0.30000001192092895508`,
      hints: [
        'Floating point arithmetic is not exact.',
        '0.1 + 0.2 may not equal 0.3 exactly due to representation.',
        'The comparison may return 0 (false) even though values appear close.',
      ],
      concepts: ['floating point comparison', 'IEEE 754', 'precision loss'],
    },
    {
      id: 'c-types-15',
      title: 'Sizeof expressions',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a program showing sizeof works on both types and variables.',
      skeleton: `// Write a program that demonstrates sizeof on:
// 1. Types: int, char, double, long long
// 2. Variables: an int variable, a char array of 10
// 3. An expression: sizeof(1 + 1.0)
// Print all results.`,
      solution: `#include <stdio.h>

int main(void) {
    int x = 42;
    char name[10] = "hello";

    printf("sizeof(int) = %zu\\n", sizeof(int));
    printf("sizeof(char) = %zu\\n", sizeof(char));
    printf("sizeof(double) = %zu\\n", sizeof(double));
    printf("sizeof(long long) = %zu\\n", sizeof(long long));
    printf("sizeof(x) = %zu\\n", sizeof(x));
    printf("sizeof(name) = %zu\\n", sizeof(name));
    printf("sizeof(1 + 1.0) = %zu\\n", sizeof(1 + 1.0));
    return 0;
}`,
      hints: [
        'sizeof can take a type name or a variable/expression.',
        'sizeof(name) for a char[10] returns 10, not the string length.',
        'sizeof(1 + 1.0) returns sizeof(double) due to type promotion.',
      ],
      concepts: ['sizeof on types', 'sizeof on variables', 'sizeof on expressions'],
    },
    {
      id: 'c-types-16',
      title: 'Type promotion rules',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fill in the resulting type of mixed-type expressions.',
      skeleton: `#include <stdio.h>

int main(void) {
    // int + float -> float
    printf("sizeof(1 + 1.0f) = %zu\\n", sizeof(1 + 1.0f));
    // float + double -> __BLANK__
    printf("sizeof(1.0f + 1.0) = %zu\\n", sizeof(1.0f + 1.0));
    // char + int -> __BLANK__
    printf("sizeof('A' + 1) = %zu\\n", sizeof('A' + 1));

    // The results should match sizeof(float), sizeof(__BLANK__), sizeof(__BLANK__)
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    // int + float -> float
    printf("sizeof(1 + 1.0f) = %zu\\n", sizeof(1 + 1.0f));
    // float + double -> double
    printf("sizeof(1.0f + 1.0) = %zu\\n", sizeof(1.0f + 1.0));
    // char + int -> int
    printf("sizeof('A' + 1) = %zu\\n", sizeof('A' + 1));

    // The results should match sizeof(float), sizeof(double), sizeof(int)
    return 0;
}`,
      hints: [
        'When mixing types, the smaller type is promoted to the larger.',
        'float + double promotes to double.',
        'char + int promotes to int.',
      ],
      concepts: ['type promotion', 'implicit conversion', 'usual arithmetic conversions'],
    },
    {
      id: 'c-types-17',
      title: 'Refactor to use proper types',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor the program to use the most appropriate types for each variable.',
      skeleton: `#include <stdio.h>

int main(void) {
    int is_active = 1;          // wasteful for a boolean
    int letter = 'Z';           // should be char
    int population = 8000000000; // overflow on 32-bit int
    double flag = 0xFF;         // should be unsigned int
    float precise = 3.14159265358979;  // loses precision

    printf("%d %c %d %f %f\\n", is_active, letter, population, flag, precise);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdbool.h>

int main(void) {
    bool is_active = true;
    char letter = 'Z';
    long long population = 8000000000LL;
    unsigned int flag = 0xFF;
    double precise = 3.14159265358979;

    printf("%d %c %lld %u %.14f\\n", is_active, letter, population, flag, precise);
    return 0;
}`,
      hints: [
        'Use bool for boolean values, char for characters.',
        'Use long long for values exceeding int range.',
        'Use unsigned int for bit flags, double for high-precision decimals.',
      ],
      concepts: ['type selection', 'appropriate types', 'code clarity'],
    },
    {
      id: 'c-types-18',
      title: 'Refactor hardcoded sizes',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor the code to use sizeof and limits.h instead of hardcoded assumptions.',
      skeleton: `#include <stdio.h>

int main(void) {
    // Assumes int is always 4 bytes
    char buffer[4];
    // Assumes max int is always 2147483647
    int max_val = 2147483647;
    // Assumes char is always signed
    if (-1 < 0) {
        printf("char is signed\\n");
    }

    printf("Buffer: %zu bytes\\n", sizeof(buffer));
    printf("Max: %d\\n", max_val);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <limits.h>

int main(void) {
    char buffer[sizeof(int)];
    int max_val = INT_MAX;

    #if CHAR_MIN < 0
        printf("char is signed\\n");
    #else
        printf("char is unsigned\\n");
    #endif

    printf("Buffer: %zu bytes\\n", sizeof(buffer));
    printf("Max: %d\\n", max_val);
    return 0;
}`,
      hints: [
        'Replace 4 with sizeof(int) for portability.',
        'Replace 2147483647 with INT_MAX from limits.h.',
        'Use CHAR_MIN to check if char is signed on this platform.',
      ],
      concepts: ['portability', 'sizeof', 'limits.h', 'platform independence'],
    },
    {
      id: 'c-types-19',
      title: 'Predict sizeof result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the sizeof results on a typical 64-bit system.',
      skeleton: `#include <stdio.h>

int main(void) {
    printf("%zu\\n", sizeof(char));
    printf("%zu\\n", sizeof(short));
    printf("%zu\\n", sizeof(int));
    printf("%zu\\n", sizeof(long long));
    printf("%zu\\n", sizeof(double));
    printf("%zu\\n", sizeof(char *));
    return 0;
}`,
      solution: `1
2
4
8
8
8`,
      hints: [
        'sizeof(char) is always 1 by definition.',
        'short is typically 2, int is 4, long long and double are 8.',
        'Pointers are 8 bytes on a 64-bit system.',
      ],
      concepts: ['typical sizes', '64-bit system', 'pointer size'],
    },
    {
      id: 'c-types-20',
      title: 'Stdint fixed-width types',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a program using fixed-width integer types from stdint.h.',
      skeleton: `// Write a program that:
// 1. Includes stdint.h and inttypes.h
// 2. Declares int8_t, int16_t, int32_t, int64_t variables
// 3. Declares uint8_t, uint32_t variables
// 4. Prints each using the PRI macros from inttypes.h`,
      solution: `#include <stdio.h>
#include <stdint.h>
#include <inttypes.h>

int main(void) {
    int8_t tiny = 127;
    int16_t small = 32767;
    int32_t medium = 2147483647;
    int64_t big = 9223372036854775807LL;
    uint8_t byte = 255;
    uint32_t word = 4294967295U;

    printf("int8:  %" PRId8 "\\n", tiny);
    printf("int16: %" PRId16 "\\n", small);
    printf("int32: %" PRId32 "\\n", medium);
    printf("int64: %" PRId64 "\\n", big);
    printf("uint8: %" PRIu8 "\\n", byte);
    printf("uint32: %" PRIu32 "\\n", word);
    return 0;
}`,
      hints: [
        'stdint.h defines exact-width types like int32_t.',
        'inttypes.h defines format macros like PRId32.',
        'Use %" PRId32 " pattern to print fixed-width types portably.',
      ],
      concepts: ['stdint.h', 'fixed-width types', 'inttypes.h', 'PRI macros'],
    },
  ],
};
