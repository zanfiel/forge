import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-bitwise',
  title: '20. Bitwise Operations',
  explanation: `## Bitwise Operations

Bitwise operators work on individual bits of integer values.

\`\`\`c
int a = 0b1010;  // 10
int b = 0b1100;  // 12
a & b  // AND: 0b1000 = 8
a | b  // OR:  0b1110 = 14
a ^ b  // XOR: 0b0110 = 6
~a     // NOT: flips all bits
a << 1 // Left shift: 0b10100 = 20
a >> 1 // Right shift: 0b0101 = 5
\`\`\`

### Key Concepts
- **AND (&)**: both bits must be 1
- **OR (|)**: either bit can be 1
- **XOR (^)**: exactly one bit must be 1
- **NOT (~)**: inverts all bits
- **Left shift (<<)**: multiply by 2^n
- **Right shift (>>)**: divide by 2^n (arithmetic for signed)
`,
  exercises: [
    {
      id: 'c-bitwise-1',
      title: 'Basic AND OR XOR',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Apply basic bitwise operators.',
      skeleton: `#include <stdio.h>

int main(void) {
    unsigned int a = 0xF0;  // 11110000
    unsigned int b = 0x3C;  // 00111100

    printf("AND: 0x%02X\\n", a __BLANK__ b);
    printf("OR:  0x%02X\\n", a __BLANK__ b);
    printf("XOR: 0x%02X\\n", a __BLANK__ b);
    printf("NOT: 0x%02X\\n", (unsigned char)(__BLANK__ a));
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    unsigned int a = 0xF0;
    unsigned int b = 0x3C;

    printf("AND: 0x%02X\\n", a & b);
    printf("OR:  0x%02X\\n", a | b);
    printf("XOR: 0x%02X\\n", a ^ b);
    printf("NOT: 0x%02X\\n", (unsigned char)(~a));
    return 0;
}`,
      hints: [
        '& is AND, | is OR, ^ is XOR, ~ is NOT.',
        '0xF0 & 0x3C = 0x30 (common bits).',
        '~0xF0 as unsigned char = 0x0F.',
      ],
      concepts: ['AND', 'OR', 'XOR', 'NOT'],
    },
    {
      id: 'c-bitwise-2',
      title: 'Shift operators',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use left and right shift operators.',
      skeleton: `#include <stdio.h>

int main(void) {
    unsigned int x = 1;
    printf("%u\\n", x __BLANK__ 3);  // 1 * 2^3 = 8
    printf("%u\\n", x __BLANK__ 8);  // 1 * 2^8 = 256

    unsigned int y = 256;
    printf("%u\\n", y __BLANK__ 4);  // 256 / 2^4 = 16
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    unsigned int x = 1;
    printf("%u\\n", x << 3);
    printf("%u\\n", x << 8);

    unsigned int y = 256;
    printf("%u\\n", y >> 4);
    return 0;
}`,
      hints: [
        '<< shifts bits left (multiplies by 2^n).',
        '>> shifts bits right (divides by 2^n).',
        '1 << 3 = 8, 256 >> 4 = 16.',
      ],
      concepts: ['left shift', 'right shift', 'power of 2'],
    },
    {
      id: 'c-bitwise-3',
      title: 'Predict bitwise results',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output of bitwise operations on small numbers.',
      skeleton: `#include <stdio.h>

int main(void) {
    printf("%d\\n", 5 & 3);
    printf("%d\\n", 5 | 3);
    printf("%d\\n", 5 ^ 3);
    printf("%d\\n", 1 << 4);
    printf("%d\\n", 32 >> 3);
    return 0;
}`,
      solution: `1
7
6
16
4`,
      hints: [
        '5=101, 3=011. AND: 001=1, OR: 111=7, XOR: 110=6.',
        '1 << 4 = 10000 = 16.',
        '32 = 100000, >> 3 = 100 = 4.',
      ],
      concepts: ['bitwise arithmetic', 'binary conversion', 'predict output'],
    },
    {
      id: 'c-bitwise-4',
      title: 'Set, clear, toggle bits',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write functions to set, clear, toggle, and check individual bits.',
      skeleton: `// Write:
// unsigned int set_bit(unsigned int n, int pos);
// unsigned int clear_bit(unsigned int n, int pos);
// unsigned int toggle_bit(unsigned int n, int pos);
// int check_bit(unsigned int n, int pos);`,
      solution: `#include <stdio.h>

unsigned int set_bit(unsigned int n, int pos) {
    return n | (1U << pos);
}

unsigned int clear_bit(unsigned int n, int pos) {
    return n & ~(1U << pos);
}

unsigned int toggle_bit(unsigned int n, int pos) {
    return n ^ (1U << pos);
}

int check_bit(unsigned int n, int pos) {
    return (n >> pos) & 1;
}

int main(void) {
    unsigned int x = 0;
    x = set_bit(x, 0);    // Set bit 0: 0001
    x = set_bit(x, 2);    // Set bit 2: 0101
    printf("After set: %u\\n", x);

    x = clear_bit(x, 0);  // Clear bit 0: 0100
    printf("After clear: %u\\n", x);

    x = toggle_bit(x, 1); // Toggle bit 1: 0110
    printf("After toggle: %u\\n", x);

    printf("Bit 2: %d\\n", check_bit(x, 2));
    printf("Bit 0: %d\\n", check_bit(x, 0));
    return 0;
}`,
      hints: [
        'Set: n | (1 << pos). Clear: n & ~(1 << pos).',
        'Toggle: n ^ (1 << pos). Check: (n >> pos) & 1.',
        'Use 1U (unsigned) to avoid signed shift issues.',
      ],
      concepts: ['bit manipulation', 'set/clear/toggle', 'bit mask'],
    },
    {
      id: 'c-bitwise-5',
      title: 'Predict XOR swap',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output of XOR-based swap.',
      skeleton: `#include <stdio.h>

int main(void) {
    int a = 10, b = 25;
    a ^= b;
    b ^= a;
    a ^= b;
    printf("%d %d\\n", a, b);
    return 0;
}`,
      solution: `25 10`,
      hints: [
        'XOR swap: a^=b, b^=a, a^=b swaps without a temp variable.',
        'After a^=b: a=10^25. After b^=a: b=25^(10^25)=10.',
        'After a^=b: a=(10^25)^10=25.',
      ],
      concepts: ['XOR swap', 'no temp variable', 'bitwise trick'],
    },
    {
      id: 'c-bitwise-6',
      title: 'Power of 2 check',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Check if a number is a power of 2 using bitwise trick.',
      skeleton: `#include <stdio.h>

int is_power_of_2(unsigned int n) {
    return n != 0 && (n __BLANK__ (n __BLANK__ 1)) == 0;
}

int main(void) {
    for (unsigned int i = 0; i <= 16; i++) {
        if (is_power_of_2(i)) {
            printf("%u ", i);
        }
    }
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

int is_power_of_2(unsigned int n) {
    return n != 0 && (n & (n - 1)) == 0;
}

int main(void) {
    for (unsigned int i = 0; i <= 16; i++) {
        if (is_power_of_2(i)) {
            printf("%u ", i);
        }
    }
    printf("\\n");
    return 0;
}`,
      hints: [
        'Powers of 2 have exactly one bit set: 1, 10, 100, 1000...',
        'n-1 flips all bits below the set bit.',
        'n & (n-1) clears the lowest set bit. If result is 0, only one bit was set.',
      ],
      concepts: ['power of 2', 'bit trick', 'n & (n-1)'],
    },
    {
      id: 'c-bitwise-7',
      title: 'Count set bits',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that counts the number of set bits (popcount).',
      skeleton: `// Write int popcount(unsigned int n) that counts the number
// of 1 bits in n. Use the Brian Kernighan method.`,
      solution: `#include <stdio.h>

int popcount(unsigned int n) {
    int count = 0;
    while (n) {
        n &= (n - 1);
        count++;
    }
    return count;
}

int main(void) {
    printf("popcount(0) = %d\\n", popcount(0));
    printf("popcount(1) = %d\\n", popcount(1));
    printf("popcount(7) = %d\\n", popcount(7));
    printf("popcount(255) = %d\\n", popcount(255));
    printf("popcount(0xDEADBEEF) = %d\\n", popcount(0xDEADBEEF));
    return 0;
}`,
      hints: [
        'n &= (n-1) clears the lowest set bit each iteration.',
        'Count iterations until n becomes 0.',
        'This is O(k) where k is the number of set bits.',
      ],
      concepts: ['popcount', 'Brian Kernighan', 'bit counting'],
    },
    {
      id: 'c-bitwise-8',
      title: 'Fix signed shift bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the bug caused by right-shifting a signed integer.',
      skeleton: `#include <stdio.h>

// Bug: right-shifting signed negative numbers is implementation-defined
int extract_byte(int value, int byte_pos) {
    return (value >> (byte_pos * 8)) & 0xFF;
}

int main(void) {
    int val = -1;  // 0xFFFFFFFF on 2's complement
    printf("Byte 0: 0x%02X\\n", extract_byte(val, 0));
    printf("Byte 3: 0x%02X\\n", extract_byte(val, 3));
    return 0;
}`,
      solution: `#include <stdio.h>

unsigned int extract_byte(unsigned int value, int byte_pos) {
    return (value >> (byte_pos * 8)) & 0xFF;
}

int main(void) {
    unsigned int val = 0xFFFFFFFF;
    printf("Byte 0: 0x%02X\\n", extract_byte(val, 0));
    printf("Byte 3: 0x%02X\\n", extract_byte(val, 3));
    return 0;
}`,
      hints: [
        'Right shift of negative numbers is implementation-defined.',
        'Use unsigned int for bitwise operations.',
        'Unsigned right shift always fills with zeros.',
      ],
      concepts: ['signed vs unsigned shift', 'implementation-defined', 'unsigned safety'],
    },
    {
      id: 'c-bitwise-9',
      title: 'Predict bit mask operations',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the results of creating and applying bit masks.',
      skeleton: `#include <stdio.h>

int main(void) {
    unsigned int x = 0xABCD;
    printf("0x%04X\\n", x & 0x00FF);
    printf("0x%04X\\n", x & 0xFF00);
    printf("0x%04X\\n", (x & 0xFF00) >> 8);
    printf("0x%04X\\n", (x << 4) & 0xFFFF);
    return 0;
}`,
      solution: `0x00CD
0xAB00
0x00AB
0xBCD0`,
      hints: [
        '0xABCD & 0x00FF = 0x00CD (low byte).',
        '0xABCD & 0xFF00 = 0xAB00 (high byte).',
        '0xAB00 >> 8 = 0x00AB. 0xABCD << 4 = 0xABCD0, & 0xFFFF = 0xBCD0.',
      ],
      concepts: ['bit masking', 'byte extraction', 'shift and mask'],
    },
    {
      id: 'c-bitwise-10',
      title: 'Bit field packing',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Pack and unpack multiple values into a single integer.',
      skeleton: `// Pack an RGB color (r,g,b each 0-255) into a single uint32_t.
// Write uint32_t pack_rgb(uint8_t r, uint8_t g, uint8_t b)
// Write void unpack_rgb(uint32_t color, uint8_t *r, uint8_t *g, uint8_t *b)`,
      solution: `#include <stdio.h>
#include <stdint.h>

uint32_t pack_rgb(uint8_t r, uint8_t g, uint8_t b) {
    return ((uint32_t)r << 16) | ((uint32_t)g << 8) | b;
}

void unpack_rgb(uint32_t color, uint8_t *r, uint8_t *g, uint8_t *b) {
    *r = (color >> 16) & 0xFF;
    *g = (color >> 8) & 0xFF;
    *b = color & 0xFF;
}

int main(void) {
    uint32_t red = pack_rgb(255, 0, 0);
    uint32_t purple = pack_rgb(128, 0, 255);
    printf("Red:    0x%06X\\n", red);
    printf("Purple: 0x%06X\\n", purple);

    uint8_t r, g, b;
    unpack_rgb(purple, &r, &g, &b);
    printf("Unpacked: R=%d G=%d B=%d\\n", r, g, b);
    return 0;
}`,
      hints: [
        'Shift each component to its bit position, combine with OR.',
        'Red in bits 16-23, green in 8-15, blue in 0-7.',
        'Extract with shift and mask: (color >> 16) & 0xFF.',
      ],
      concepts: ['bit packing', 'color encoding', 'shift and OR'],
    },
    {
      id: 'c-bitwise-11',
      title: 'Fill-blank lowest set bit',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Isolate the lowest set bit of an integer.',
      skeleton: `#include <stdio.h>

int main(void) {
    unsigned int x = 12;  // 1100
    // Isolate lowest set bit: n & (-n) or n & (~n + 1)
    unsigned int lowest = x __BLANK__ (__BLANK__x + 1);
    printf("x = %u (0x%X)\\n", x, x);
    printf("Lowest set bit: %u (0x%X)\\n", lowest, lowest);
    // 12 = 1100, lowest set = 0100 = 4
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    unsigned int x = 12;
    unsigned int lowest = x & (~x + 1);
    printf("x = %u (0x%X)\\n", x, x);
    printf("Lowest set bit: %u (0x%X)\\n", lowest, lowest);
    return 0;
}`,
      hints: [
        '~x inverts all bits, +1 makes it the two\'s complement negation.',
        'x & (~x + 1) isolates the lowest set bit.',
        'This is equivalent to x & (-x) for unsigned math.',
      ],
      concepts: ['lowest set bit', 'two\'s complement', 'bit isolation'],
    },
    {
      id: 'c-bitwise-12',
      title: 'Predict NOT and two\'s complement',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict NOT behavior with unsigned and signed types.',
      skeleton: `#include <stdio.h>

int main(void) {
    unsigned char a = 0;
    unsigned char b = 255;
    printf("%u\\n", (unsigned char)~a);
    printf("%u\\n", (unsigned char)~b);

    unsigned int c = 0;
    printf("%u\\n", ~c);
    return 0;
}`,
      solution: `255
0
4294967295`,
      hints: [
        '~0 for unsigned char = 255 (all bits set).',
        '~255 for unsigned char = 0 (all bits cleared).',
        '~0 for unsigned int = 4294967295 (0xFFFFFFFF).',
      ],
      concepts: ['bitwise NOT', 'unsigned inversion', 'max value'],
    },
    {
      id: 'c-bitwise-13',
      title: 'Bit rotation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Implement left and right bit rotation.',
      skeleton: `// Write uint32_t rotate_left(uint32_t n, int shift)
// Write uint32_t rotate_right(uint32_t n, int shift)
// Bits that fall off one side appear on the other.`,
      solution: `#include <stdio.h>
#include <stdint.h>

uint32_t rotate_left(uint32_t n, int shift) {
    shift &= 31;
    return (n << shift) | (n >> (32 - shift));
}

uint32_t rotate_right(uint32_t n, int shift) {
    shift &= 31;
    return (n >> shift) | (n << (32 - shift));
}

int main(void) {
    uint32_t x = 0x12345678;
    printf("Original:     0x%08X\\n", x);
    printf("Rotate L by 4: 0x%08X\\n", rotate_left(x, 4));
    printf("Rotate R by 4: 0x%08X\\n", rotate_right(x, 4));
    printf("Rotate L by 8: 0x%08X\\n", rotate_left(x, 8));
    return 0;
}`,
      hints: [
        'Left rotate: (n << s) | (n >> (32 - s)).',
        'Bits shifted out the left come back on the right.',
        'Mask shift with 31 to handle shifts >= 32.',
      ],
      concepts: ['bit rotation', 'circular shift', 'rotate left/right'],
    },
    {
      id: 'c-bitwise-14',
      title: 'Fix mask width bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the mask that extracts the wrong number of bits.',
      skeleton: `#include <stdio.h>
#include <stdint.h>

// Extract n bits starting at position pos
uint32_t extract_bits(uint32_t value, int pos, int n) {
    uint32_t mask = (1 << n) - 1;  // Bug: 1 should be 1U for n=32
    return (value >> pos) & mask;
}

int main(void) {
    uint32_t val = 0xABCD1234;
    printf("Bits 0-3: 0x%X\\n", extract_bits(val, 0, 4));
    printf("Bits 4-7: 0x%X\\n", extract_bits(val, 4, 4));
    printf("Bits 8-15: 0x%X\\n", extract_bits(val, 8, 8));
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdint.h>

uint32_t extract_bits(uint32_t value, int pos, int n) {
    uint32_t mask = (1U << n) - 1;
    return (value >> pos) & mask;
}

int main(void) {
    uint32_t val = 0xABCD1234;
    printf("Bits 0-3: 0x%X\\n", extract_bits(val, 0, 4));
    printf("Bits 4-7: 0x%X\\n", extract_bits(val, 4, 4));
    printf("Bits 8-15: 0x%X\\n", extract_bits(val, 8, 8));
    return 0;
}`,
      hints: [
        '1 << 32 is undefined behavior for signed int.',
        '1U << n uses unsigned, avoiding the issue for n < 32.',
        'Always use 1U for bit shift masks.',
      ],
      concepts: ['unsigned shift literal', 'UB prevention', 'mask generation'],
    },
    {
      id: 'c-bitwise-15',
      title: 'Refactor multiplication to shifts',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Replace multiplications/divisions by powers of 2 with shifts.',
      skeleton: `#include <stdio.h>

int main(void) {
    unsigned int x = 100;

    unsigned int doubled = x * 2;
    unsigned int quadrupled = x * 4;
    unsigned int halved = x / 2;
    unsigned int eighth = x / 8;

    printf("%u %u %u %u\\n", doubled, quadrupled, halved, eighth);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    unsigned int x = 100;

    unsigned int doubled = x << 1;
    unsigned int quadrupled = x << 2;
    unsigned int halved = x >> 1;
    unsigned int eighth = x >> 3;

    printf("%u %u %u %u\\n", doubled, quadrupled, halved, eighth);
    return 0;
}`,
      hints: [
        '<< 1 = *2, << 2 = *4, >> 1 = /2, >> 3 = /8.',
        'Only works correctly for unsigned or positive values.',
        'Modern compilers do this optimization automatically.',
      ],
      concepts: ['shift optimization', 'power of 2 math', 'compiler optimization'],
    },
    {
      id: 'c-bitwise-16',
      title: 'Predict shift overflow',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Predict behavior when shifting beyond the type width.',
      skeleton: `#include <stdio.h>

int main(void) {
    unsigned char c = 1;
    printf("%d\\n", c << 7);
    printf("%d\\n", c << 8);
    // Note: c is promoted to int for the shift
    printf("%d\\n", (unsigned char)(c << 8));
    return 0;
}`,
      solution: `128
256
0`,
      hints: [
        'c is promoted to int before shifting.',
        '1 << 7 = 128, 1 << 8 = 256 (as int).',
        'Casting back to unsigned char: 256 % 256 = 0.',
      ],
      concepts: ['integer promotion', 'shift overflow', 'type truncation'],
    },
    {
      id: 'c-bitwise-17',
      title: 'Write bit printer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that prints the binary representation of an integer.',
      skeleton: `// Write void print_bits(unsigned int n, int bits) that prints
// the binary representation of n using the specified number of bits.`,
      solution: `#include <stdio.h>

void print_bits(unsigned int n, int bits) {
    for (int i = bits - 1; i >= 0; i--) {
        putchar((n >> i) & 1 ? '1' : '0');
        if (i > 0 && i % 4 == 0) putchar('_');
    }
    putchar('\\n');
}

int main(void) {
    print_bits(42, 8);
    print_bits(255, 8);
    print_bits(0xDEAD, 16);
    print_bits(0, 8);
    return 0;
}`,
      hints: [
        'Check each bit from MSB to LSB: (n >> i) & 1.',
        'Print 1 or 0 for each bit position.',
        'Optional: add underscore separators every 4 bits.',
      ],
      concepts: ['binary printing', 'bit extraction loop', 'MSB to LSB'],
    },
    {
      id: 'c-bitwise-18',
      title: 'Fill-blank next power of 2',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Find the next power of 2 using bit manipulation.',
      skeleton: `#include <stdio.h>

unsigned int next_power_of_2(unsigned int n) {
    if (n == 0) return 1;
    n--;
    n |= n __BLANK__ 1;
    n |= n __BLANK__ 2;
    n |= n __BLANK__ 4;
    n |= n __BLANK__ 8;
    n |= n __BLANK__ 16;
    return n + 1;
}

int main(void) {
    printf("%u\\n", next_power_of_2(5));
    printf("%u\\n", next_power_of_2(16));
    printf("%u\\n", next_power_of_2(100));
    return 0;
}`,
      solution: `#include <stdio.h>

unsigned int next_power_of_2(unsigned int n) {
    if (n == 0) return 1;
    n--;
    n |= n >> 1;
    n |= n >> 2;
    n |= n >> 4;
    n |= n >> 8;
    n |= n >> 16;
    return n + 1;
}

int main(void) {
    printf("%u\\n", next_power_of_2(5));
    printf("%u\\n", next_power_of_2(16));
    printf("%u\\n", next_power_of_2(100));
    return 0;
}`,
      hints: [
        'Spreading the highest set bit to all lower positions.',
        'n |= n >> 1 fills 2 bits, >> 2 fills 4, etc.',
        'After spreading, n+1 gives the next power of 2.',
      ],
      concepts: ['next power of 2', 'bit spreading', 'binary rounding'],
    },
    {
      id: 'c-bitwise-19',
      title: 'Refactor modulo to AND',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Replace modulo by power-of-2 with bitwise AND.',
      skeleton: `#include <stdio.h>

// Ring buffer with modulo
typedef struct {
    int data[16];
    int head;
    int tail;
    int count;
} RingBuf;

void push(RingBuf *r, int val) {
    r->data[r->head] = val;
    r->head = (r->head + 1) % 16;
    r->count++;
}

int pop(RingBuf *r) {
    int val = r->data[r->tail];
    r->tail = (r->tail + 1) % 16;
    r->count--;
    return val;
}`,
      solution: `#include <stdio.h>

#define RING_SIZE 16
#define RING_MASK (RING_SIZE - 1)

typedef struct {
    int data[RING_SIZE];
    int head;
    int tail;
    int count;
} RingBuf;

void push(RingBuf *r, int val) {
    r->data[r->head] = val;
    r->head = (r->head + 1) & RING_MASK;
    r->count++;
}

int pop(RingBuf *r) {
    int val = r->data[r->tail];
    r->tail = (r->tail + 1) & RING_MASK;
    r->count--;
    return val;
}`,
      hints: [
        'n % power_of_2 == n & (power_of_2 - 1).',
        '& is faster than % on most architectures.',
        'Only works when the divisor is a power of 2.',
      ],
      concepts: ['modulo optimization', 'ring buffer', 'power of 2 mask'],
    },
    {
      id: 'c-bitwise-20',
      title: 'Predict parity check',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Predict the parity (even/odd number of set bits) of values.',
      skeleton: `#include <stdio.h>

int parity(unsigned int n) {
    n ^= n >> 16;
    n ^= n >> 8;
    n ^= n >> 4;
    n ^= n >> 2;
    n ^= n >> 1;
    return n & 1;
}

int main(void) {
    printf("%d\\n", parity(0));
    printf("%d\\n", parity(1));
    printf("%d\\n", parity(3));
    printf("%d\\n", parity(7));
    printf("%d\\n", parity(255));
    return 0;
}`,
      solution: `0
1
0
1
0`,
      hints: [
        'Parity = 0 means even number of set bits, 1 means odd.',
        '0 has 0 bits (even). 1 has 1 bit (odd). 3 has 2 (even).',
        '7 has 3 bits (odd). 255 has 8 bits (even).',
      ],
      concepts: ['parity check', 'XOR folding', 'bit counting'],
    },
  ],
};
