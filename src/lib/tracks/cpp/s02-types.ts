import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-types',
  title: '02. Types',
  explanation: `## Types in C++

C++ has a rich type system built on fundamental types with precise control over size and behavior.

### Fundamental Types
| Type | Typical Size | Range |
|------|-------------|-------|
| \`bool\` | 1 byte | true / false |
| \`char\` | 1 byte | -128 to 127 (or 0 to 255 unsigned) |
| \`short\` | 2 bytes | -32768 to 32767 |
| \`int\` | 4 bytes | approx -2.1 billion to 2.1 billion |
| \`long\` | 4 or 8 bytes | platform-dependent |
| \`long long\` | 8 bytes | approx -9.2 * 10^18 to 9.2 * 10^18 |
| \`float\` | 4 bytes | ~7 decimal digits precision |
| \`double\` | 8 bytes | ~15 decimal digits precision |

### size_t
\`std::size_t\` is an unsigned integer type used for sizes and counts. It is the return type of \`sizeof\` and is guaranteed to hold the size of any object in memory.

\`\`\`cpp
#include <cstddef>
std::size_t len = 42;
\`\`\`

### Fixed-Width Integers (\\<cstdint\\>)
When you need an exact number of bits:
\`\`\`cpp
#include <cstdint>
int8_t   tiny  = 127;       // exactly 8 bits, signed
uint16_t port  = 8080;      // exactly 16 bits, unsigned
int32_t  count = 1000000;   // exactly 32 bits, signed
uint64_t huge  = 1ULL << 40; // exactly 64 bits, unsigned
\`\`\`

### Type Aliases
\`\`\`cpp
using Distance = double;
typedef unsigned long ulong;  // older C-style syntax
\`\`\`

### sizeof Operator
Returns the size of a type or object in bytes:
\`\`\`cpp
std::cout << sizeof(int) << std::endl;   // typically 4
std::cout << sizeof(double) << std::endl; // typically 8
\`\`\`

### Numeric Limits (\\<limits\\>)
\`\`\`cpp
#include <limits>
std::cout << std::numeric_limits<int>::max() << std::endl;
std::cout << std::numeric_limits<int>::min() << std::endl;
\`\`\`
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-types-1',
      title: 'sizeof int',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the operator that returns the size in bytes of a type.',
      skeleton: `#include <iostream>

int main() {
    std::cout << __BLANK__(int) << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    std::cout << sizeof(int) << std::endl;
    return 0;
}`,
      hints: [
        'There is an operator that tells you how many bytes a type occupies.',
        'It is not a function -- it is a built-in operator.',
        'The operator is `sizeof`.',
      ],
      concepts: ['sizeof', 'type size'],
    },
    {
      id: 'cpp-types-2',
      title: 'Fixed-width uint16_t',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the exact-width unsigned 16-bit integer type.',
      skeleton: `#include <iostream>
#include <cstdint>

int main() {
    __BLANK__ port = 8080;
    std::cout << port << std::endl;
    return 0;
}`,
      solution: `#include <iostream>
#include <cstdint>

int main() {
    uint16_t port = 8080;
    std::cout << port << std::endl;
    return 0;
}`,
      hints: [
        'You need an unsigned integer that is exactly 16 bits wide.',
        'Fixed-width types are defined in <cstdint>.',
        'The type is `uint16_t`.',
      ],
      concepts: ['fixed-width integers', 'uint16_t'],
    },
    {
      id: 'cpp-types-3',
      title: 'size_t for a count',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the type typically used for sizes and counts in C++.',
      skeleton: `#include <iostream>
#include <cstddef>

int main() {
    __BLANK__ count = 100;
    std::cout << count << std::endl;
    return 0;
}`,
      solution: `#include <iostream>
#include <cstddef>

int main() {
    std::size_t count = 100;
    std::cout << count << std::endl;
    return 0;
}`,
      hints: [
        'This is an unsigned type used for object sizes.',
        'It is the return type of sizeof.',
        'The type is `std::size_t`.',
      ],
      concepts: ['size_t', 'unsigned'],
    },
    {
      id: 'cpp-types-4',
      title: 'Type alias with using',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the keyword to create a modern type alias.',
      skeleton: `#include <iostream>

__BLANK__ Meters = double;

int main() {
    Meters height = 1.75;
    std::cout << height << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

using Meters = double;

int main() {
    Meters height = 1.75;
    std::cout << height << std::endl;
    return 0;
}`,
      hints: [
        'Modern C++ has a cleaner syntax than typedef for type aliases.',
        'The syntax is: keyword Name = ExistingType;',
        'The keyword is `using`.',
      ],
      concepts: ['type alias', 'using'],
    },
    {
      id: 'cpp-types-5',
      title: 'numeric_limits max',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the function call that returns the maximum value of an int.',
      skeleton: `#include <iostream>
#include <limits>

int main() {
    std::cout << std::numeric_limits<int>::__BLANK__() << std::endl;
    return 0;
}`,
      solution: `#include <iostream>
#include <limits>

int main() {
    std::cout << std::numeric_limits<int>::max() << std::endl;
    return 0;
}`,
      hints: [
        'numeric_limits provides static member functions for type boundaries.',
        'You want the largest possible value.',
        'The function is `max`.',
      ],
      concepts: ['numeric_limits', 'max'],
    },
    {
      id: 'cpp-types-6',
      title: 'Unsigned suffix',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the correct literal suffix to make the number an unsigned long long.',
      skeleton: `#include <iostream>

int main() {
    auto big = 1__BLANK__ << 40;
    std::cout << big << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    auto big = 1ULL << 40;
    std::cout << big << std::endl;
    return 0;
}`,
      hints: [
        'Literal suffixes tell the compiler the type of a numeric literal.',
        'U means unsigned, LL means long long.',
        'The suffix is `ULL`.',
      ],
      concepts: ['literal suffix', 'unsigned long long'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-types-7',
      title: 'Print sizes of all fundamental types',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a program that prints the sizeof each fundamental type: bool, char, short, int, long, long long, float, double. Print each on its own line as "type: N bytes".',
      skeleton: `#include <iostream>

int main() {
    // Print sizeof for: bool, char, short, int, long, long long, float, double
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    std::cout << "bool: " << sizeof(bool) << " bytes" << std::endl;
    std::cout << "char: " << sizeof(char) << " bytes" << std::endl;
    std::cout << "short: " << sizeof(short) << " bytes" << std::endl;
    std::cout << "int: " << sizeof(int) << " bytes" << std::endl;
    std::cout << "long: " << sizeof(long) << " bytes" << std::endl;
    std::cout << "long long: " << sizeof(long long) << " bytes" << std::endl;
    std::cout << "float: " << sizeof(float) << " bytes" << std::endl;
    std::cout << "double: " << sizeof(double) << " bytes" << std::endl;
    return 0;
}`,
      hints: [
        'Use sizeof(type) to get the size in bytes.',
        'Print a label followed by the result of sizeof.',
        'std::cout << "int: " << sizeof(int) << " bytes" << std::endl;',
      ],
      concepts: ['sizeof', 'fundamental types'],
    },
    {
      id: 'cpp-types-8',
      title: 'Numeric limits explorer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a program that prints the min and max of int, short, and long long using std::numeric_limits.',
      skeleton: `#include <iostream>
#include <limits>

int main() {
    // Print min and max for int, short, and long long
    return 0;
}`,
      solution: `#include <iostream>
#include <limits>

int main() {
    std::cout << "int min: " << std::numeric_limits<int>::min() << std::endl;
    std::cout << "int max: " << std::numeric_limits<int>::max() << std::endl;
    std::cout << "short min: " << std::numeric_limits<short>::min() << std::endl;
    std::cout << "short max: " << std::numeric_limits<short>::max() << std::endl;
    std::cout << "long long min: " << std::numeric_limits<long long>::min() << std::endl;
    std::cout << "long long max: " << std::numeric_limits<long long>::max() << std::endl;
    return 0;
}`,
      hints: [
        'Include <limits> for std::numeric_limits.',
        'Use ::min() and ::max() static member functions.',
        'std::numeric_limits<int>::min() gives the smallest int value.',
      ],
      concepts: ['numeric_limits', 'min', 'max'],
    },
    {
      id: 'cpp-types-9',
      title: 'Type alias for coordinates',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Create a type alias Coord for double using the "using" syntax. Declare two Coord variables x and y with values 3.5 and 7.2. Print them.',
      skeleton: `#include <iostream>

// Create Coord type alias here

int main() {
    // Declare x and y as Coord, print them
    return 0;
}`,
      solution: `#include <iostream>

using Coord = double;

int main() {
    Coord x = 3.5;
    Coord y = 7.2;
    std::cout << x << " " << y << std::endl;
    return 0;
}`,
      hints: [
        'A type alias creates a new name for an existing type.',
        'The modern syntax is: using NewName = ExistingType;',
        'using Coord = double;',
      ],
      concepts: ['type alias', 'using'],
    },
    {
      id: 'cpp-types-10',
      title: 'Fixed-width integer packing',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a program that packs two uint8_t values (0xAB and 0xCD) into a single uint16_t using bit shifting. Print the result in hexadecimal.',
      skeleton: `#include <iostream>
#include <cstdint>

int main() {
    // Pack two uint8_t values into one uint16_t
    // Print in hex
    return 0;
}`,
      solution: `#include <iostream>
#include <cstdint>

int main() {
    uint8_t high = 0xAB;
    uint8_t low = 0xCD;
    uint16_t packed = (static_cast<uint16_t>(high) << 8) | low;
    std::cout << std::hex << "0x" << packed << std::endl;
    return 0;
}`,
      hints: [
        'Shift the high byte left by 8 bits, then OR with the low byte.',
        'Cast to uint16_t before shifting to avoid overflow.',
        '(static_cast<uint16_t>(high) << 8) | low',
      ],
      concepts: ['fixed-width integers', 'bit shifting', 'hex output'],
    },
    {
      id: 'cpp-types-11',
      title: 'Overflow detection',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a program that checks if adding two int values would overflow. Read two ints from cin, check if their sum would exceed numeric_limits<int>::max(), and print "overflow" or the sum.',
      skeleton: `#include <iostream>
#include <limits>

int main() {
    // Read two ints
    // Check for overflow before adding
    // Print "overflow" or the sum
    return 0;
}`,
      solution: `#include <iostream>
#include <limits>

int main() {
    int a, b;
    std::cin >> a >> b;
    if (a > 0 && b > std::numeric_limits<int>::max() - a) {
        std::cout << "overflow" << std::endl;
    } else if (a < 0 && b < std::numeric_limits<int>::min() - a) {
        std::cout << "overflow" << std::endl;
    } else {
        std::cout << (a + b) << std::endl;
    }
    return 0;
}`,
      hints: [
        'You cannot detect overflow after it happens -- signed overflow is undefined behavior.',
        'Check before adding: if a > 0 and b > max - a, it would overflow.',
        'Also check the negative direction: if a < 0 and b < min - a.',
      ],
      concepts: ['overflow', 'numeric_limits', 'undefined behavior'],
    },
    {
      id: 'cpp-types-12',
      title: 'sizeof with arrays and pointers',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Declare an int array of 10 elements. Print sizeof the entire array, sizeof a single element, and compute the number of elements using sizeof.',
      skeleton: `#include <iostream>

int main() {
    // Declare int array of 10 elements
    // Print total size, element size, and computed count
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int arr[10] = {};
    std::cout << "Total: " << sizeof(arr) << std::endl;
    std::cout << "Element: " << sizeof(arr[0]) << std::endl;
    std::cout << "Count: " << sizeof(arr) / sizeof(arr[0]) << std::endl;
    return 0;
}`,
      hints: [
        'sizeof on an array returns the total size in bytes.',
        'sizeof on a single element returns one element size.',
        'Divide total by element size to get the count.',
      ],
      concepts: ['sizeof', 'arrays', 'element count'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-types-13',
      title: 'Fix signed/unsigned comparison',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'This code compares a signed int to size_t, producing a warning. Fix the comparison to be safe.',
      skeleton: `#include <iostream>
#include <cstddef>

int main() {
    int count = -1;
    std::size_t size = 10;
    if (count < size) {
        std::cout << "count is less" << std::endl;
    }
    return 0;
}`,
      solution: `#include <iostream>
#include <cstddef>

int main() {
    int count = -1;
    std::size_t size = 10;
    if (count < 0 || static_cast<std::size_t>(count) < size) {
        std::cout << "count is less" << std::endl;
    }
    return 0;
}`,
      hints: [
        'Comparing signed and unsigned types is dangerous because -1 converts to a huge unsigned value.',
        'Check if the signed value is negative first.',
        'if (count < 0 || static_cast<std::size_t>(count) < size)',
      ],
      concepts: ['signed/unsigned comparison', 'static_cast', 'size_t'],
    },
    {
      id: 'cpp-types-14',
      title: 'Fix the wrong fixed-width type',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'This code stores a value too large for int8_t. Fix it by choosing the correct fixed-width type.',
      skeleton: `#include <iostream>
#include <cstdint>

int main() {
    int8_t value = 200;  // Bug: 200 does not fit in int8_t
    std::cout << static_cast<int>(value) << std::endl;
    return 0;
}`,
      solution: `#include <iostream>
#include <cstdint>

int main() {
    uint8_t value = 200;
    std::cout << static_cast<int>(value) << std::endl;
    return 0;
}`,
      hints: [
        'int8_t holds -128 to 127. The value 200 does not fit.',
        'You need an unsigned 8-bit type that holds 0 to 255.',
        'Change int8_t to uint8_t.',
      ],
      concepts: ['fixed-width integers', 'overflow', 'uint8_t'],
    },
    {
      id: 'cpp-types-15',
      title: 'Fix missing include for numeric_limits',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'This code fails to compile because a necessary header is missing. Add the correct include.',
      skeleton: `#include <iostream>

int main() {
    std::cout << std::numeric_limits<double>::max() << std::endl;
    return 0;
}`,
      solution: `#include <iostream>
#include <limits>

int main() {
    std::cout << std::numeric_limits<double>::max() << std::endl;
    return 0;
}`,
      hints: [
        'std::numeric_limits is not defined in <iostream>.',
        'It has its own header.',
        'Add #include <limits>.',
      ],
      concepts: ['includes', 'numeric_limits', 'headers'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-types-16',
      title: 'Predict sizeof char',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    std::cout << sizeof(char) << std::endl;
    return 0;
}`,
      solution: `1`,
      hints: [
        'The C++ standard guarantees the size of one type.',
        'sizeof(char) is always exactly 1 byte by definition.',
        'The answer is 1.',
      ],
      concepts: ['sizeof', 'char'],
    },
    {
      id: 'cpp-types-17',
      title: 'Predict unsigned wrap-around',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>
#include <cstdint>

int main() {
    uint8_t x = 255;
    x = x + 1;
    std::cout << static_cast<int>(x) << std::endl;
    return 0;
}`,
      solution: `0`,
      hints: [
        'uint8_t holds values 0 to 255.',
        'Unsigned overflow wraps around modulo 256.',
        '255 + 1 = 256, which wraps to 0.',
      ],
      concepts: ['unsigned overflow', 'wrap-around', 'uint8_t'],
    },
    {
      id: 'cpp-types-18',
      title: 'Predict implicit conversion',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    int a = 5;
    double b = 2.0;
    auto result = a / b;
    std::cout << result << std::endl;
    return 0;
}`,
      solution: `2.5`,
      hints: [
        'When mixing int and double in an expression, the int is promoted to double.',
        'This becomes double division, not integer division.',
        '5.0 / 2.0 = 2.5',
      ],
      concepts: ['implicit conversion', 'type promotion', 'auto'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-types-19',
      title: 'Replace typedef with using',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor all typedef declarations to use the modern "using" syntax.',
      skeleton: `#include <iostream>
#include <cstdint>

typedef unsigned long ulong;
typedef int32_t Score;
typedef double Temperature;

int main() {
    ulong population = 7000000000UL;
    Score highScore = 999999;
    Temperature bodyTemp = 36.6;
    std::cout << population << " " << highScore << " " << bodyTemp << std::endl;
    return 0;
}`,
      solution: `#include <iostream>
#include <cstdint>

using ulong = unsigned long;
using Score = int32_t;
using Temperature = double;

int main() {
    ulong population = 7000000000UL;
    Score highScore = 999999;
    Temperature bodyTemp = 36.6;
    std::cout << population << " " << highScore << " " << bodyTemp << std::endl;
    return 0;
}`,
      hints: [
        'The modern syntax is: using NewName = OldType;',
        'It replaces the old typedef OldType NewName; syntax.',
        'using ulong = unsigned long; using Score = int32_t; etc.',
      ],
      concepts: ['typedef', 'using', 'type alias', 'modern C++'],
    },
    {
      id: 'cpp-types-20',
      title: 'Replace int with appropriate fixed-width types',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Replace generic int types with the most appropriate fixed-width integers from <cstdint> based on the value ranges used.',
      skeleton: `#include <iostream>

int main() {
    int age = 25;               // 0-150 range
    int port = 443;             // 0-65535 range
    int population = 8000000;   // large positive values
    int offset = -100;          // small signed values
    std::cout << age << " " << port << " " << population << " " << offset << std::endl;
    return 0;
}`,
      solution: `#include <iostream>
#include <cstdint>

int main() {
    uint8_t age = 25;
    uint16_t port = 443;
    uint32_t population = 8000000;
    int16_t offset = -100;
    std::cout << static_cast<int>(age) << " " << port << " " << population << " " << offset << std::endl;
    return 0;
}`,
      hints: [
        'Choose the smallest type that fits the described range.',
        'age (0-150) fits in uint8_t, port (0-65535) fits in uint16_t.',
        'population needs uint32_t, offset needs int16_t for small signed values.',
      ],
      concepts: ['fixed-width integers', 'type sizing', 'cstdint'],
    },
  ],
};
