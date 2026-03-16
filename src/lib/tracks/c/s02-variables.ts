import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-var',
  title: '2. Variables',
  explanation: `## Variables in C

Variables in C must be declared with a type before use. They can be initialized at declaration or assigned later.

\`\`\`c
int age = 25;          // declaration with initialization
float temperature;     // declaration only
temperature = 98.6f;   // assignment
\`\`\`

### Storage Classes
- **auto**: default for local variables (stack allocated)
- **register**: hint to store in CPU register (rarely used today)
- **static**: persists across function calls, local scope
- **extern**: declared elsewhere, defined in another file

### Naming Rules
- Start with letter or underscore
- Contain letters, digits, underscores
- Case-sensitive (\`count\` != \`Count\`)
- Cannot use reserved keywords
`,
  exercises: [
    {
      id: 'c-var-1',
      title: 'Declare and initialize',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Declare an integer variable and initialize it to 42.',
      skeleton: `#include <stdio.h>

int main(void) {
    __BLANK__ age __BLANK__ 42;
    printf("Age: %d\\n", age);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int age = 42;
    printf("Age: %d\\n", age);
    return 0;
}`,
      hints: [
        'Integer variables are declared with the int keyword.',
        'Use = to initialize the variable at declaration.',
        'int age = 42; declares and initializes in one step.',
      ],
      concepts: ['variable declaration', 'initialization', 'int type'],
    },
    {
      id: 'c-var-2',
      title: 'Multiple declarations',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Declare multiple variables of the same type on one line.',
      skeleton: `#include <stdio.h>

int main(void) {
    int x __BLANK__ 10 __BLANK__ y __BLANK__ 20;
    printf("x=%d, y=%d\\n", x, y);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int x = 10, y = 20;
    printf("x=%d, y=%d\\n", x, y);
    return 0;
}`,
      hints: [
        'Multiple variables of the same type are separated by commas.',
        'Each variable can have its own initializer.',
        'int x = 10, y = 20; declares both on one line.',
      ],
      concepts: ['multiple declarations', 'comma separator', 'initialization'],
    },
    {
      id: 'c-var-3',
      title: 'Variable assignment',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a program that declares a variable, assigns a value, then reassigns it and prints both values.',
      skeleton: `// Write a program that:
// 1. Declares int x (uninitialized)
// 2. Assigns x = 10, prints it
// 3. Reassigns x = 20, prints it`,
      solution: `#include <stdio.h>

int main(void) {
    int x;
    x = 10;
    printf("x = %d\\n", x);
    x = 20;
    printf("x = %d\\n", x);
    return 0;
}`,
      hints: [
        'Declare with int x; then assign with x = 10;',
        'Variables can be reassigned any number of times.',
        'Print after each assignment to show both values.',
      ],
      concepts: ['declaration', 'assignment', 'reassignment'],
    },
    {
      id: 'c-var-4',
      title: 'Swap two variables',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a program that swaps two integer variables using a temporary variable.',
      skeleton: `// Write a program that:
// 1. Declares int a = 5, b = 10
// 2. Swaps their values using a temp variable
// 3. Prints "a=10, b=5"`,
      solution: `#include <stdio.h>

int main(void) {
    int a = 5, b = 10;
    int temp = a;
    a = b;
    b = temp;
    printf("a=%d, b=%d\\n", a, b);
    return 0;
}`,
      hints: [
        'You need a third variable to hold one value temporarily.',
        'Store a in temp, then set a = b, then set b = temp.',
        'Without a temp variable, you would lose one of the values.',
      ],
      concepts: ['swap algorithm', 'temporary variable', 'variable manipulation'],
    },
    {
      id: 'c-var-5',
      title: 'Predict variable values',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output after a series of assignments.',
      skeleton: `#include <stdio.h>

int main(void) {
    int a = 5;
    int b = a;
    a = 10;
    int c = a + b;
    printf("%d %d %d\\n", a, b, c);
    return 0;
}`,
      solution: `10 5 15`,
      hints: [
        'b = a copies the current value of a (5) into b.',
        'Changing a to 10 does not affect b, which stays 5.',
        'c = a + b = 10 + 5 = 15.',
      ],
      concepts: ['value semantics', 'copy on assignment', 'expression evaluation'],
    },
    {
      id: 'c-var-6',
      title: 'Static local variable',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use a static local variable to count how many times a function is called.',
      skeleton: `#include <stdio.h>

void counter(void) {
    __BLANK__ int count = 0;
    count++;
    printf("Called %d times\\n", count);
}

int main(void) {
    counter();
    counter();
    counter();
    return 0;
}`,
      solution: `#include <stdio.h>

void counter(void) {
    static int count = 0;
    count++;
    printf("Called %d times\\n", count);
}

int main(void) {
    counter();
    counter();
    counter();
    return 0;
}`,
      hints: [
        'A static local variable retains its value between function calls.',
        'The keyword static before the type makes it persistent.',
        'Without static, count would reset to 0 on every call.',
      ],
      concepts: ['static local', 'persistence across calls', 'storage duration'],
    },
    {
      id: 'c-var-7',
      title: 'Extern variable',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Declare an extern variable and understand the difference between declaration and definition.',
      skeleton: `#include <stdio.h>

int global_count = 100;

void print_count(void) {
    __BLANK__ int global_count;
    printf("Count: %d\\n", global_count);
}

int main(void) {
    print_count();
    return 0;
}`,
      solution: `#include <stdio.h>

int global_count = 100;

void print_count(void) {
    extern int global_count;
    printf("Count: %d\\n", global_count);
}

int main(void) {
    print_count();
    return 0;
}`,
      hints: [
        'extern tells the compiler the variable is defined elsewhere.',
        'It is a declaration, not a definition -- no memory is allocated.',
        'extern int global_count; refers to the global definition above.',
      ],
      concepts: ['extern', 'declaration vs definition', 'global variables'],
    },
    {
      id: 'c-var-8',
      title: 'Fix uninitialized variable',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the program that uses an uninitialized variable, causing undefined behavior.',
      skeleton: `#include <stdio.h>

int main(void) {
    int sum;
    for (int i = 1; i <= 5; i++) {
        sum += i;
    }
    printf("Sum: %d\\n", sum);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        sum += i;
    }
    printf("Sum: %d\\n", sum);
    return 0;
}`,
      hints: [
        'Local variables in C are not automatically initialized to zero.',
        'Using an uninitialized variable is undefined behavior.',
        'Initialize sum to 0 before the loop.',
      ],
      concepts: ['uninitialized variables', 'undefined behavior', 'initialization'],
    },
    {
      id: 'c-var-9',
      title: 'Scope rules',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output based on variable scoping rules.',
      skeleton: `#include <stdio.h>

int x = 1;

int main(void) {
    printf("%d ", x);
    int x = 2;
    printf("%d ", x);
    {
        int x = 3;
        printf("%d ", x);
    }
    printf("%d\\n", x);
    return 0;
}`,
      solution: `1 2 3 2`,
      hints: [
        'The global x is 1, printed first before the local x is declared.',
        'The local x = 2 shadows the global x.',
        'The inner block x = 3 shadows the outer local x, but only inside that block.',
      ],
      concepts: ['variable scope', 'shadowing', 'block scope', 'global vs local'],
    },
    {
      id: 'c-var-10',
      title: 'Const variables',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Declare a constant variable that cannot be modified.',
      skeleton: `#include <stdio.h>

int main(void) {
    __BLANK__ int MAX_SIZE = 100;
    printf("Max: %d\\n", MAX_SIZE);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    const int MAX_SIZE = 100;
    printf("Max: %d\\n", MAX_SIZE);
    return 0;
}`,
      hints: [
        'The const qualifier makes a variable read-only after initialization.',
        'const goes before the type name.',
        'const int MAX_SIZE = 100; cannot be changed after this line.',
      ],
      concepts: ['const qualifier', 'read-only variables', 'constants'],
    },
    {
      id: 'c-var-11',
      title: 'Register hint',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function using a register variable for a loop counter and explain why it is just a hint.',
      skeleton: `// Write a function sum_to_n(int n) that:
// 1. Uses a register variable for the loop counter
// 2. Returns the sum of 1 to n
// Note: register is just a hint; the compiler may ignore it.`,
      solution: `#include <stdio.h>

int sum_to_n(int n) {
    int sum = 0;
    for (register int i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

int main(void) {
    printf("Sum to 10: %d\\n", sum_to_n(10));
    return 0;
}`,
      hints: [
        'register is placed before the type in the declaration.',
        'You cannot take the address of a register variable.',
        'Modern compilers optimize register allocation automatically.',
      ],
      concepts: ['register keyword', 'compiler hints', 'optimization'],
    },
    {
      id: 'c-var-12',
      title: 'Global vs local priority',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a program demonstrating that a local variable shadows a global with the same name.',
      skeleton: `// Write a program that:
// 1. Has a global int value = 100
// 2. In main, prints the global value
// 3. Declares a local int value = 200
// 4. Prints the local value
// The output should be:
// 100
// 200`,
      solution: `#include <stdio.h>

int value = 100;

int main(void) {
    printf("%d\\n", value);
    int value = 200;
    printf("%d\\n", value);
    return 0;
}`,
      hints: [
        'Before declaring the local value, the global one is visible.',
        'Once the local value is declared, it shadows the global.',
        'The first printf sees global (100), the second sees local (200).',
      ],
      concepts: ['shadowing', 'global variables', 'name resolution'],
    },
    {
      id: 'c-var-13',
      title: 'Compound assignment',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use compound assignment operators to modify a variable.',
      skeleton: `#include <stdio.h>

int main(void) {
    int x = 10;
    x __BLANK__ 5;   // x = 15
    x __BLANK__ 3;   // x = 45
    x __BLANK__ 2;   // x = 22 (integer division)
    x __BLANK__ 7;   // x = 1
    printf("x = %d\\n", x);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int x = 10;
    x += 5;   // x = 15
    x *= 3;   // x = 45
    x /= 2;   // x = 22 (integer division)
    x %= 7;   // x = 1
    printf("x = %d\\n", x);
    return 0;
}`,
      hints: [
        '+= adds to the variable, *= multiplies.',
        '/= divides (integer division truncates), %= gives remainder.',
        'x += 5 is equivalent to x = x + 5.',
      ],
      concepts: ['compound assignment', '+=', '*=', '/=', '%='],
    },
    {
      id: 'c-var-14',
      title: 'Fix scope error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the variable scope error where a variable is used outside its scope.',
      skeleton: `#include <stdio.h>

int main(void) {
    for (int i = 0; i < 5; i++) {
        int squared = i * i;
    }
    printf("Last squared: %d\\n", squared);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int squared = 0;
    for (int i = 0; i < 5; i++) {
        squared = i * i;
    }
    printf("Last squared: %d\\n", squared);
    return 0;
}`,
      hints: [
        'squared is declared inside the for loop block and dies when the block ends.',
        'Move the declaration of squared before the loop.',
        'Declare int squared = 0; before the for loop so it is accessible after.',
      ],
      concepts: ['block scope', 'variable lifetime', 'scope errors'],
    },
    {
      id: 'c-var-15',
      title: 'Predict static behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output of a function with a static local variable.',
      skeleton: `#include <stdio.h>

int next_id(void) {
    static int id = 0;
    id++;
    return id;
}

int main(void) {
    printf("%d\\n", next_id());
    printf("%d\\n", next_id());
    printf("%d\\n", next_id());
    return 0;
}`,
      solution: `1
2
3`,
      hints: [
        'The static variable id is initialized only once, the first time.',
        'Each call increments id from where it was left.',
        'First call: 1, second call: 2, third call: 3.',
      ],
      concepts: ['static local variable', 'state persistence', 'initialization once'],
    },
    {
      id: 'c-var-16',
      title: 'Type suffixes',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a program demonstrating different variable types with proper suffixes and printing them.',
      skeleton: `// Write a program that declares:
// 1. long big = 1000000L
// 2. unsigned int flags = 0xFF00U
// 3. float pi = 3.14f
// 4. double e = 2.718281828
// Print each with the correct format specifier.`,
      solution: `#include <stdio.h>

int main(void) {
    long big = 1000000L;
    unsigned int flags = 0xFF00U;
    float pi = 3.14f;
    double e = 2.718281828;

    printf("big = %ld\\n", big);
    printf("flags = %u\\n", flags);
    printf("pi = %f\\n", pi);
    printf("e = %lf\\n", e);
    return 0;
}`,
      hints: [
        'L suffix for long, U for unsigned, f for float.',
        '%ld for long, %u for unsigned int, %f for float.',
        'double uses %lf (or %f in printf due to promotion).',
      ],
      concepts: ['type suffixes', 'format specifiers', 'numeric literals'],
    },
    {
      id: 'c-var-17',
      title: 'Variable naming conventions',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a program with properly named variables following C conventions (snake_case).',
      skeleton: `// Write a program that:
// 1. Declares variables for: student count, average score, is passing
// 2. Use snake_case naming convention
// 3. student_count = 30, average_score = 85.5, is_passing = 1
// 4. Print all three values`,
      solution: `#include <stdio.h>

int main(void) {
    int student_count = 30;
    double average_score = 85.5;
    int is_passing = 1;

    printf("Students: %d\\n", student_count);
    printf("Average: %.1f\\n", average_score);
    printf("Passing: %d\\n", is_passing);
    return 0;
}`,
      hints: [
        'C convention uses snake_case for variable names.',
        'C has no bool type in C89; use int with 0/1.',
        'Use descriptive names that convey meaning.',
      ],
      concepts: ['naming conventions', 'snake_case', 'descriptive names'],
    },
    {
      id: 'c-var-18',
      title: 'Refactor magic numbers',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Refactor the program to replace magic numbers with named constants.',
      skeleton: `#include <stdio.h>

int main(void) {
    double radius = 5.0;
    double area = 3.14159265 * radius * radius;
    double circumference = 2 * 3.14159265 * radius;

    if (area > 50.0) {
        printf("Large circle\\n");
    }

    printf("Area: %f\\n", area);
    printf("Circumference: %f\\n", circumference);
    return 0;
}`,
      solution: `#include <stdio.h>

#define PI 3.14159265
#define LARGE_AREA_THRESHOLD 50.0

int main(void) {
    double radius = 5.0;
    double area = PI * radius * radius;
    double circumference = 2 * PI * radius;

    if (area > LARGE_AREA_THRESHOLD) {
        printf("Large circle\\n");
    }

    printf("Area: %f\\n", area);
    printf("Circumference: %f\\n", circumference);
    return 0;
}`,
      hints: [
        'Replace 3.14159265 with a named constant PI.',
        'Use #define for compile-time constants or const variables.',
        'Replace the threshold 50.0 with a descriptive name too.',
      ],
      concepts: ['magic numbers', 'named constants', '#define', 'readability'],
    },
    {
      id: 'c-var-19',
      title: 'Refactor to use functions for scope',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor the program to minimize variable scope by extracting code into functions.',
      skeleton: `#include <stdio.h>

int main(void) {
    int width = 10;
    int height = 5;
    int area = width * height;
    printf("Rectangle area: %d\\n", area);

    int radius = 7;
    float circle_area = 3.14f * radius * radius;
    printf("Circle area: %.2f\\n", circle_area);

    int side = 4;
    int cube_volume = side * side * side;
    printf("Cube volume: %d\\n", cube_volume);
    return 0;
}`,
      solution: `#include <stdio.h>

void print_rectangle_area(int width, int height) {
    int area = width * height;
    printf("Rectangle area: %d\\n", area);
}

void print_circle_area(int radius) {
    float area = 3.14f * radius * radius;
    printf("Circle area: %.2f\\n", area);
}

void print_cube_volume(int side) {
    int volume = side * side * side;
    printf("Cube volume: %d\\n", volume);
}

int main(void) {
    print_rectangle_area(10, 5);
    print_circle_area(7);
    print_cube_volume(4);
    return 0;
}`,
      hints: [
        'Each calculation is independent and can be its own function.',
        'Parameters replace the hardcoded variables in main.',
        'Each function keeps its variables in the smallest possible scope.',
      ],
      concepts: ['scope minimization', 'function extraction', 'separation of concerns'],
    },
    {
      id: 'c-var-20',
      title: 'Fix shadowing bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the bug caused by accidental variable shadowing.',
      skeleton: `#include <stdio.h>

int calculate_total(int price, int quantity) {
    int total = price * quantity;
    if (quantity > 10) {
        int total = total * 0.9;  // 10% discount
        printf("Discount applied\\n");
    }
    return total;
}

int main(void) {
    printf("Total: %d\\n", calculate_total(10, 15));
    return 0;
}`,
      solution: `#include <stdio.h>

int calculate_total(int price, int quantity) {
    int total = price * quantity;
    if (quantity > 10) {
        total = (int)(total * 0.9);  // 10% discount
        printf("Discount applied\\n");
    }
    return total;
}

int main(void) {
    printf("Total: %d\\n", calculate_total(10, 15));
    return 0;
}`,
      hints: [
        'The inner int total declares a new variable that shadows the outer one.',
        'The outer total is never modified, so the discount is lost.',
        'Remove the int keyword inside the if block to assign to the existing total.',
      ],
      concepts: ['variable shadowing', 'accidental redeclaration', 'scope bugs'],
    },
  ],
};
