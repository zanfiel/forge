import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-var',
  title: '01. Variables',
  explanation: `## Variables in C++

C++ is a statically typed language -- every variable has a fixed type determined at compile time.

### Fundamental Types
- \`int\` -- integer (typically 32 bits)
- \`double\` -- double-precision floating point
- \`char\` -- single character (1 byte)
- \`bool\` -- \`true\` or \`false\`

### Initialization Styles
C++ supports several ways to initialize a variable:

\`\`\`cpp
int a = 10;      // copy initialization
int b(10);       // direct initialization
int c{10};       // brace (uniform) initialization -- preferred in modern C++
int d = {10};    // copy-list initialization
\`\`\`

Brace initialization prevents narrowing conversions:
\`\`\`cpp
int x{3.14};     // ERROR -- narrowing double to int
int y = 3.14;    // OK but truncates silently to 3
\`\`\`

### auto
The \`auto\` keyword lets the compiler deduce the type from the initializer:
\`\`\`cpp
auto count = 42;        // int
auto pi    = 3.14;      // double
auto letter = 'A';      // char
auto flag   = true;     // bool
\`\`\`

### const and constexpr
- \`const\` -- value cannot be modified after initialization (runtime constant)
- \`constexpr\` -- value must be computable at compile time

\`\`\`cpp
const int maxUsers = 100;
constexpr double gravity = 9.81;
\`\`\`
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-var-1',
      title: 'Declare an integer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the correct type keyword to declare a whole-number variable.',
      skeleton: `#include <iostream>

int main() {
    __BLANK__ age = 25;
    std::cout << age << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int age = 25;
    std::cout << age << std::endl;
    return 0;
}`,
      hints: [
        'You need a type for whole numbers.',
        'It is the most common integer type in C++.',
        'The keyword is `int`.',
      ],
      concepts: ['int', 'variable declaration'],
    },
    {
      id: 'cpp-var-2',
      title: 'Declare a double',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the type keyword for a floating-point variable.',
      skeleton: `#include <iostream>

int main() {
    __BLANK__ price = 9.99;
    std::cout << price << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    double price = 9.99;
    std::cout << price << std::endl;
    return 0;
}`,
      hints: [
        'You need a type for decimal numbers.',
        'It has double the precision of float.',
        'The keyword is `double`.',
      ],
      concepts: ['double', 'floating point'],
    },
    {
      id: 'cpp-var-3',
      title: 'Declare a char',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the type for a single character.',
      skeleton: `#include <iostream>

int main() {
    __BLANK__ grade = 'A';
    std::cout << grade << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    char grade = 'A';
    std::cout << grade << std::endl;
    return 0;
}`,
      hints: [
        'This type holds exactly one character.',
        'It occupies 1 byte of memory.',
        'The keyword is `char`.',
      ],
      concepts: ['char', 'character type'],
    },
    {
      id: 'cpp-var-4',
      title: 'Use auto deduction',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Use the keyword that lets the compiler deduce the variable type.',
      skeleton: `#include <iostream>

int main() {
    __BLANK__ count = 42;
    std::cout << count << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    auto count = 42;
    std::cout << count << std::endl;
    return 0;
}`,
      hints: [
        'There is a keyword that tells the compiler to figure out the type.',
        'It was introduced in C++11.',
        'The keyword is `auto`.',
      ],
      concepts: ['auto', 'type deduction'],
    },
    {
      id: 'cpp-var-5',
      title: 'Brace initialization',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the brace-initialization syntax to initialize the variable to 100.',
      skeleton: `#include <iostream>

int main() {
    int value__BLANK__;
    std::cout << value << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int value{100};
    std::cout << value << std::endl;
    return 0;
}`,
      hints: [
        'Modern C++ prefers initializing with curly braces.',
        'The syntax wraps the value in { }.',
        'Write `{100}` directly after the variable name.',
      ],
      concepts: ['brace initialization', 'uniform initialization'],
    },
    {
      id: 'cpp-var-6',
      title: 'constexpr variable',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the keyword that makes a compile-time constant.',
      skeleton: `#include <iostream>

int main() {
    __BLANK__ double pi = 3.14159265;
    std::cout << pi << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    constexpr double pi = 3.14159265;
    std::cout << pi << std::endl;
    return 0;
}`,
      hints: [
        'This keyword is stronger than const -- it guarantees compile-time evaluation.',
        'It was introduced in C++11.',
        'The keyword is `constexpr`.',
      ],
      concepts: ['constexpr', 'compile-time constant'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-var-7',
      title: 'Swap two integers',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a program that declares two int variables, swaps their values using a temporary variable, and prints both.',
      skeleton: `#include <iostream>

int main() {
    // Declare int a = 5 and int b = 10
    // Swap their values using a temporary variable
    // Print a and b after the swap
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int a = 5;
    int b = 10;
    int temp = a;
    a = b;
    b = temp;
    std::cout << a << " " << b << std::endl;
    return 0;
}`,
      hints: [
        'You need a third variable to hold one value during the swap.',
        'Store a in temp, then assign b to a, then assign temp to b.',
        'int temp = a; a = b; b = temp;',
      ],
      concepts: ['int', 'variable assignment', 'swap'],
    },
    {
      id: 'cpp-var-8',
      title: 'Circle area calculation',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Declare a constexpr double for pi and a double for radius (5.0). Calculate and print the area of a circle.',
      skeleton: `#include <iostream>

int main() {
    // Declare constexpr pi = 3.14159265
    // Declare radius = 5.0
    // Calculate area = pi * radius * radius
    // Print the area
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    constexpr double pi = 3.14159265;
    double radius = 5.0;
    double area = pi * radius * radius;
    std::cout << area << std::endl;
    return 0;
}`,
      hints: [
        'Use constexpr for pi since it is a compile-time constant.',
        'Area formula: pi * r * r.',
        'constexpr double pi = 3.14159265; double area = pi * radius * radius;',
      ],
      concepts: ['constexpr', 'double', 'arithmetic'],
    },
    {
      id: 'cpp-var-9',
      title: 'Boolean logic variables',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Declare two bool variables (isRaining = true, hasUmbrella = false). Declare a third bool isReady that is true only when it is not raining OR you have an umbrella. Print isReady.',
      skeleton: `#include <iostream>

int main() {
    // Declare isRaining, hasUmbrella, and isReady
    // Print isReady using std::boolalpha
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    bool isRaining = true;
    bool hasUmbrella = false;
    bool isReady = !isRaining || hasUmbrella;
    std::cout << std::boolalpha << isReady << std::endl;
    return 0;
}`,
      hints: [
        'Use bool for true/false variables.',
        'The logical NOT operator is ! and OR is ||.',
        'bool isReady = !isRaining || hasUmbrella;',
      ],
      concepts: ['bool', 'logical operators'],
    },
    {
      id: 'cpp-var-10',
      title: 'Multiple initialization styles',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Declare four int variables initialized to the same value 42, each using a different initialization style: copy (=), direct (()), brace ({}), and copy-list (= {}). Print all four.',
      skeleton: `#include <iostream>

int main() {
    // Four different initialization styles, all set to 42
    // Print all four variables
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int a = 42;
    int b(42);
    int c{42};
    int d = {42};
    std::cout << a << " " << b << " " << c << " " << d << std::endl;
    return 0;
}`,
      hints: [
        'C++ has copy (=), direct (()), brace ({}), and copy-list (= {}) initialization.',
        'All produce the same value for simple integer types.',
        'int a = 42; int b(42); int c{42}; int d = {42};',
      ],
      concepts: ['initialization styles', 'copy initialization', 'brace initialization'],
    },
    {
      id: 'cpp-var-11',
      title: 'Auto with different types',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Use auto to declare variables from different literal types: an integer (10), a double (3.14), a char (\'X\'), and a bool (true). Print each on its own line.',
      skeleton: `#include <iostream>

int main() {
    // Use auto for all four declarations
    // Print each variable on its own line
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    auto i = 10;
    auto d = 3.14;
    auto c = 'X';
    auto b = true;
    std::cout << i << std::endl;
    std::cout << d << std::endl;
    std::cout << c << std::endl;
    std::cout << std::boolalpha << b << std::endl;
    return 0;
}`,
      hints: [
        'auto deduces the type from the initializer expression.',
        'Integer literals are int, decimal literals are double, single quotes are char, true/false are bool.',
        'auto i = 10; auto d = 3.14; auto c = \'X\'; auto b = true;',
      ],
      concepts: ['auto', 'type deduction', 'literals'],
    },
    {
      id: 'cpp-var-12',
      title: 'const vs constexpr',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a program that declares a const int initialized from user input (std::cin) and a constexpr int initialized from a literal. Print both. This demonstrates that const can be set at runtime while constexpr must be a compile-time value.',
      skeleton: `#include <iostream>

int main() {
    // Read an integer from cin into a const variable
    // Declare a constexpr variable from a literal
    // Print both
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int temp;
    std::cin >> temp;
    const int runtime = temp;
    constexpr int compiletime = 100;
    std::cout << runtime << " " << compiletime << std::endl;
    return 0;
}`,
      hints: [
        'const can be initialized at runtime, constexpr cannot.',
        'You need a non-const temporary to read from cin, then assign it to a const.',
        'int temp; std::cin >> temp; const int runtime = temp;',
      ],
      concepts: ['const', 'constexpr', 'runtime vs compile-time'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-var-13',
      title: 'Fix the narrowing conversion',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'This code uses brace initialization with a narrowing conversion. Fix it so it compiles without warnings.',
      skeleton: `#include <iostream>

int main() {
    double pi = 3.14159;
    int approx{pi};  // ERROR: narrowing conversion
    std::cout << approx << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    double pi = 3.14159;
    int approx = static_cast<int>(pi);
    std::cout << approx << std::endl;
    return 0;
}`,
      hints: [
        'Brace initialization does not allow implicit narrowing conversions.',
        'You need an explicit cast to convert a double to an int.',
        'Use static_cast<int>(pi) to explicitly truncate.',
      ],
      concepts: ['narrowing conversion', 'brace initialization', 'static_cast'],
    },
    {
      id: 'cpp-var-14',
      title: 'Fix the uninitialized const',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'This code declares a const without initializing it. Fix the error.',
      skeleton: `#include <iostream>

int main() {
    const int maxSize;
    maxSize = 256;
    std::cout << maxSize << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    const int maxSize = 256;
    std::cout << maxSize << std::endl;
    return 0;
}`,
      hints: [
        'A const variable must be given a value when it is created.',
        'You cannot assign to a const after declaration.',
        'Initialize it on the declaration line: const int maxSize = 256;',
      ],
      concepts: ['const', 'initialization'],
    },
    {
      id: 'cpp-var-15',
      title: 'Fix the missing type',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'This code tries to use auto without an initializer. Fix it so it compiles.',
      skeleton: `#include <iostream>

int main() {
    auto value;
    value = 42;
    std::cout << value << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    auto value = 42;
    std::cout << value << std::endl;
    return 0;
}`,
      hints: [
        'auto needs an initializer so the compiler can deduce the type.',
        'You cannot declare an auto variable without assigning it a value.',
        'Combine declaration and assignment: auto value = 42;',
      ],
      concepts: ['auto', 'type deduction', 'initialization'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-var-16',
      title: 'Predict integer division',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    int a = 7;
    int b = 2;
    int result = a / b;
    std::cout << result << std::endl;
    return 0;
}`,
      solution: `3`,
      hints: [
        'Both operands are integers.',
        'Integer division truncates the fractional part.',
        '7 / 2 = 3 (not 3.5).',
      ],
      concepts: ['integer division', 'truncation'],
    },
    {
      id: 'cpp-var-17',
      title: 'Predict bool output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    bool flag = true;
    std::cout << flag << std::endl;
    return 0;
}`,
      solution: `1`,
      hints: [
        'By default, booleans are printed as integers.',
        'true is represented as 1, false as 0.',
        'You would need std::boolalpha to print "true".',
      ],
      concepts: ['bool', 'output formatting'],
    },
    {
      id: 'cpp-var-18',
      title: 'Predict char arithmetic',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    char c = 'A';
    int code = c + 1;
    char next = c + 1;
    std::cout << code << " " << next << std::endl;
    return 0;
}`,
      solution: `66 B`,
      hints: [
        'The ASCII value of \'A\' is 65.',
        'Adding 1 gives 66, which is \'B\' in ASCII.',
        'An int prints the numeric value, a char prints the character.',
      ],
      concepts: ['char', 'ASCII', 'implicit conversion'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-var-19',
      title: 'Modernize initialization style',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor all variable declarations to use modern brace initialization (uniform initialization) instead of copy initialization.',
      skeleton: `#include <iostream>

int main() {
    int width = 800;
    int height = 600;
    double ratio = 1.333;
    bool fullscreen = false;
    std::cout << width << "x" << height << std::endl;
    std::cout << ratio << " " << std::boolalpha << fullscreen << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int width{800};
    int height{600};
    double ratio{1.333};
    bool fullscreen{false};
    std::cout << width << "x" << height << std::endl;
    std::cout << ratio << " " << std::boolalpha << fullscreen << std::endl;
    return 0;
}`,
      hints: [
        'Replace = with {} for each declaration.',
        'Brace initialization is the preferred modern C++ style.',
        'int width{800}; int height{600}; etc.',
      ],
      concepts: ['brace initialization', 'modern C++'],
    },
    {
      id: 'cpp-var-20',
      title: 'Replace magic numbers with named constants',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Replace all magic numbers with appropriately named constexpr variables at the top of main.',
      skeleton: `#include <iostream>

int main() {
    double celsius = 36.6;
    double fahrenheit = celsius * 1.8 + 32.0;
    std::cout << fahrenheit << std::endl;

    double km = 42.195;
    double miles = km * 0.621371;
    std::cout << miles << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    constexpr double celsiusToFahrenheitFactor = 1.8;
    constexpr double celsiusToFahrenheitOffset = 32.0;
    constexpr double kmToMilesFactor = 0.621371;

    double celsius = 36.6;
    double fahrenheit = celsius * celsiusToFahrenheitFactor + celsiusToFahrenheitOffset;
    std::cout << fahrenheit << std::endl;

    double km = 42.195;
    double miles = km * kmToMilesFactor;
    std::cout << miles << std::endl;
    return 0;
}`,
      hints: [
        'Magic numbers are unnamed numeric literals buried in code.',
        'Name each constant to describe what it represents.',
        'Use constexpr since these conversion factors are compile-time constants.',
      ],
      concepts: ['constexpr', 'magic numbers', 'named constants', 'refactoring'],
    },
  ],
};
