import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-hello',
  title: '1. Hello World',
  explanation: `## Hello World in C

Every C program starts with a \`main\` function. The \`#include\` directive brings in header files that declare library functions. \`printf\` from \`<stdio.h>\` prints formatted text to the console.

\`\`\`c
#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}
\`\`\`

### Key Concepts
- **#include**: preprocessor directive to include headers
- **main**: the entry point of every C program
- **printf**: formatted output to stdout
- **return 0**: signals successful program termination
- **Comments**: \`//\` for single-line, \`/* */\` for multi-line
- **Semicolons**: every statement ends with \`;\`
`,
  exercises: [
    {
      id: 'c-hello-1',
      title: 'Include stdio header',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete the include directive to bring in the standard I/O header.',
      skeleton: `__BLANK__ <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}`,
      hints: [
        'The preprocessor directive to include a header starts with #.',
        'The full directive is #include followed by the header in angle brackets.',
        '#include <stdio.h> is the correct directive.',
      ],
      concepts: ['preprocessor', '#include', 'stdio.h'],
    },
    {
      id: 'c-hello-2',
      title: 'Write main function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete the main function signature and return statement.',
      skeleton: `#include <stdio.h>

__BLANK__ main(__BLANK__) {
    printf("Hello!\\n");
    return __BLANK__;
}`,
      solution: `#include <stdio.h>

int main(void) {
    printf("Hello!\\n");
    return 0;
}`,
      hints: [
        'main returns an integer to the operating system.',
        'void in the parameter list means no arguments.',
        'Returning 0 indicates successful execution.',
      ],
      concepts: ['main function', 'return type', 'void parameters'],
    },
    {
      id: 'c-hello-3',
      title: 'Print with newline',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use printf to print "C is awesome" followed by a newline.',
      skeleton: `#include <stdio.h>

int main(void) {
    __BLANK__("C is awesome__BLANK__");
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    printf("C is awesome\\n");
    return 0;
}`,
      hints: [
        'The function for formatted printing is printf.',
        'The escape sequence for a newline is \\n.',
        'printf("C is awesome\\n"); is the complete statement.',
      ],
      concepts: ['printf', 'escape sequences', 'newline'],
    },
    {
      id: 'c-hello-4',
      title: 'First C program',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a complete C program that prints "Learning C" on one line and "is fun!" on the next line.',
      skeleton: `// Write a complete C program that prints:
// Learning C
// is fun!
// Use two separate printf calls.`,
      solution: `#include <stdio.h>

int main(void) {
    printf("Learning C\\n");
    printf("is fun!\\n");
    return 0;
}`,
      hints: [
        'Start with #include <stdio.h> for printf.',
        'Use two printf calls, each ending with \\n.',
        'The main function returns int and takes void.',
      ],
      concepts: ['complete program', 'multiple printf', 'program structure'],
    },
    {
      id: 'c-hello-5',
      title: 'Fix the compilation error',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the bugs preventing this program from compiling and running correctly.',
      skeleton: `#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n")
    return 0
}`,
      solution: `#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}`,
      hints: [
        'Every statement in C must end with a semicolon.',
        'Both the printf call and return statement need semicolons.',
        'Add ; after the printf call and after return 0.',
      ],
      concepts: ['semicolons', 'syntax errors', 'compilation'],
    },
    {
      id: 'c-hello-6',
      title: 'Predict hello output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict what this program prints to the console.',
      skeleton: `#include <stdio.h>

int main(void) {
    printf("A");
    printf("B");
    printf("C\\n");
    printf("D\\n");
    return 0;
}`,
      solution: `ABC
D`,
      hints: [
        'printf does not automatically add a newline.',
        'Only \\n creates a new line in the output.',
        'A, B, C print on the same line, then \\n. D prints on the next line.',
      ],
      concepts: ['printf behavior', 'newline control', 'output prediction'],
    },
    {
      id: 'c-hello-7',
      title: 'Single-line comments',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Add proper single-line and multi-line comments to this program.',
      skeleton: `#include <stdio.h>

__BLANK__ This is a single-line comment

__BLANK__ This is a
   multi-line comment __BLANK__

int main(void) {
    printf("Comments!\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

// This is a single-line comment

/* This is a
   multi-line comment */

int main(void) {
    printf("Comments!\\n");
    return 0;
}`,
      hints: [
        'Single-line comments start with //.',
        'Multi-line comments start with /* and end with */.',
        '// for single-line, /* ... */ for multi-line.',
      ],
      concepts: ['single-line comments', 'multi-line comments', 'documentation'],
    },
    {
      id: 'c-hello-8',
      title: 'Printf format specifiers',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a program that uses printf with %d and %s format specifiers to print "Age: 25, Name: Alice".',
      skeleton: `// Write a program that declares an int age = 25 and
// a string (char array) name = "Alice", then uses
// a single printf to print: Age: 25, Name: Alice`,
      solution: `#include <stdio.h>

int main(void) {
    int age = 25;
    char name[] = "Alice";
    printf("Age: %d, Name: %s\\n", age, name);
    return 0;
}`,
      hints: [
        '%d is the format specifier for integers.',
        '%s is the format specifier for strings.',
        'printf("Age: %d, Name: %s\\n", age, name); combines both.',
      ],
      concepts: ['format specifiers', '%d', '%s', 'printf arguments'],
    },
    {
      id: 'c-hello-9',
      title: 'Escape sequences',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete the printf calls using the correct escape sequences.',
      skeleton: `#include <stdio.h>

int main(void) {
    printf("Tab__BLANK__separated\\n");
    printf("She said __BLANK__hello__BLANK__\\n");
    printf("Back__BLANK__slash\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    printf("Tab\\tseparated\\n");
    printf("She said \\"hello\\"\\n");
    printf("Back\\\\slash\\n");
    return 0;
}`,
      hints: [
        '\\t inserts a tab character.',
        '\\" inserts a literal double quote inside a string.',
        '\\\\ inserts a literal backslash.',
      ],
      concepts: ['escape sequences', 'tab', 'quote escaping', 'backslash'],
    },
    {
      id: 'c-hello-10',
      title: 'Multiple includes',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a program that includes both stdio.h and stdlib.h, prints a message, and calls exit(0) instead of return.',
      skeleton: `// Write a program that:
// 1. Includes stdio.h and stdlib.h
// 2. Prints "Exiting gracefully"
// 3. Uses exit(0) instead of return 0`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    printf("Exiting gracefully\\n");
    exit(0);
}`,
      hints: [
        'stdlib.h provides the exit() function.',
        'Include both headers with separate #include directives.',
        'exit(0) terminates the program like return 0 from main.',
      ],
      concepts: ['multiple includes', 'stdlib.h', 'exit function'],
    },
    {
      id: 'c-hello-11',
      title: 'Fix missing header',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the program that fails to compile because of a missing header.',
      skeleton: `int main(void) {
    printf("Where is my header?\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    printf("Where is my header?\\n");
    return 0;
}`,
      hints: [
        'printf is declared in a standard header file.',
        'Without the header, the compiler does not know about printf.',
        'Add #include <stdio.h> at the top.',
      ],
      concepts: ['header files', 'implicit declaration', 'compilation errors'],
    },
    {
      id: 'c-hello-12',
      title: 'Predict printf behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the exact output of these printf calls.',
      skeleton: `#include <stdio.h>

int main(void) {
    printf("%d + %d = %d\\n", 3, 4, 3 + 4);
    printf("100%% done\\n");
    return 0;
}`,
      solution: `3 + 4 = 7
100% done`,
      hints: [
        '%d is replaced by the corresponding integer argument.',
        '3 + 4 is evaluated to 7 before being passed to printf.',
        '%% prints a literal percent sign.',
      ],
      concepts: ['format specifiers', 'expression evaluation', 'percent literal'],
    },
    {
      id: 'c-hello-13',
      title: 'Return value meaning',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a program that returns EXIT_SUCCESS on success. Include the correct header for EXIT_SUCCESS.',
      skeleton: `// Write a program that:
// 1. Includes the headers needed for printf and EXIT_SUCCESS
// 2. Prints "Success!"
// 3. Returns EXIT_SUCCESS from main`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    printf("Success!\\n");
    return EXIT_SUCCESS;
}`,
      hints: [
        'EXIT_SUCCESS is a macro defined in stdlib.h.',
        'EXIT_SUCCESS is typically 0 but using the macro is more portable.',
        '#include <stdlib.h> and return EXIT_SUCCESS.',
      ],
      concepts: ['EXIT_SUCCESS', 'EXIT_FAILURE', 'stdlib.h', 'portability'],
    },
    {
      id: 'c-hello-14',
      title: 'Multi-line printf',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use string literal concatenation to write a long printf across multiple lines.',
      skeleton: `#include <stdio.h>

int main(void) {
    printf("This is a very long message "
           __BLANK__
           "that spans three lines\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    printf("This is a very long message "
           "split across multiple "
           "that spans three lines\\n");
    return 0;
}`,
      hints: [
        'Adjacent string literals in C are automatically concatenated.',
        'Just place another quoted string on the next line.',
        '"split across multiple " will be joined with the others.',
      ],
      concepts: ['string concatenation', 'adjacent literals', 'code formatting'],
    },
    {
      id: 'c-hello-15',
      title: 'Puts vs printf',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Rewrite a program to use puts() instead of printf() for simple string output.',
      skeleton: `// Rewrite this program to use puts() instead of printf().
// puts() automatically adds a newline.
//
// Original:
// #include <stdio.h>
// int main(void) {
//     printf("Line one\\n");
//     printf("Line two\\n");
//     return 0;
// }`,
      solution: `#include <stdio.h>

int main(void) {
    puts("Line one");
    puts("Line two");
    return 0;
}`,
      hints: [
        'puts() is also declared in stdio.h.',
        'puts() automatically appends a newline, so you do not need \\n.',
        'Replace printf("text\\n") with puts("text").',
      ],
      concepts: ['puts', 'printf vs puts', 'automatic newline'],
    },
    {
      id: 'c-hello-16',
      title: 'Fix the wrong format',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the format specifier mismatches that cause undefined behavior.',
      skeleton: `#include <stdio.h>

int main(void) {
    int count = 42;
    float price = 9.99f;
    char grade = 'A';

    printf("Count: %f\\n", count);
    printf("Price: %d\\n", price);
    printf("Grade: %d\\n", grade);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int count = 42;
    float price = 9.99f;
    char grade = 'A';

    printf("Count: %d\\n", count);
    printf("Price: %f\\n", price);
    printf("Grade: %c\\n", grade);
    return 0;
}`,
      hints: [
        '%d is for integers, %f is for floats, %c is for characters.',
        'count is an int, so use %d. price is a float, so use %f.',
        'grade is a char, so use %c to print the character.',
      ],
      concepts: ['format specifier mismatch', 'undefined behavior', '%d %f %c'],
    },
    {
      id: 'c-hello-17',
      title: 'Predict escape output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output including tabs and special characters.',
      skeleton: `#include <stdio.h>

int main(void) {
    printf("A\\tB\\tC\\n");
    printf("1\\t2\\t3\\n");
    printf("\\n");
    printf("Done.\\n");
    return 0;
}`,
      solution: `A\tB\tC
1\t2\t3

Done.`,
      hints: [
        '\\t inserts a horizontal tab between characters.',
        'printf("\\n") prints just a blank line.',
        'The output has two tabulated lines, a blank line, then "Done.".',
      ],
      concepts: ['tab formatting', 'blank lines', 'output prediction'],
    },
    {
      id: 'c-hello-18',
      title: 'Refactor repeated prints',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Refactor the repeated printf calls into a loop that prints numbers 1 through 5.',
      skeleton: `#include <stdio.h>

int main(void) {
    printf("Number: 1\\n");
    printf("Number: 2\\n");
    printf("Number: 3\\n");
    printf("Number: 4\\n");
    printf("Number: 5\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 5; i++) {
        printf("Number: %d\\n", i);
    }
    return 0;
}`,
      hints: [
        'Use a for loop to iterate from 1 to 5.',
        'Use %d in printf to print the loop variable.',
        'for (int i = 1; i <= 5; i++) replaces all five calls.',
      ],
      concepts: ['refactoring', 'for loop', 'DRY principle'],
    },
    {
      id: 'c-hello-19',
      title: 'Compile command knowledge',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a program with a comment showing the gcc compile command, and the program prints the compilation flags used.',
      skeleton: `// Write a C program that:
// 1. Has a comment at the top showing: gcc -Wall -Wextra -o hello hello.c
// 2. Prints "Compiled with: -Wall -Wextra"
// 3. Returns 0`,
      solution: `// Compile: gcc -Wall -Wextra -o hello hello.c
#include <stdio.h>

int main(void) {
    printf("Compiled with: -Wall -Wextra\\n");
    return 0;
}`,
      hints: [
        'gcc is the GNU C Compiler command.',
        '-Wall enables all common warnings, -Wextra enables extra warnings.',
        '-o hello specifies the output binary name.',
      ],
      concepts: ['gcc', 'compiler flags', '-Wall', '-Wextra', 'compilation'],
    },
    {
      id: 'c-hello-20',
      title: 'Refactor to use functions',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Refactor this program to use a separate function for printing the greeting.',
      skeleton: `#include <stdio.h>

int main(void) {
    printf("====================\\n");
    printf("  Welcome to C!     \\n");
    printf("====================\\n");
    printf("====================\\n");
    printf("  Goodbye from C!   \\n");
    printf("====================\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

void print_banner(const char *message) {
    printf("====================\\n");
    printf("  %s\\n", message);
    printf("====================\\n");
}

int main(void) {
    print_banner("Welcome to C!");
    print_banner("Goodbye from C!");
    return 0;
}`,
      hints: [
        'Extract the repeated pattern into a function that takes a message.',
        'Use const char * as the parameter type for a string.',
        'Call the function twice with different messages.',
      ],
      concepts: ['function extraction', 'code reuse', 'const char pointer'],
    },
  ],
};
