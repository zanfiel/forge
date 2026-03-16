import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-ctrl',
  title: '5. Control Flow',
  explanation: `## Control Flow in C

Control flow statements direct the execution path of your program.

### if / else
\`\`\`c
if (condition) {
    // true branch
} else if (other_condition) {
    // alternative
} else {
    // default
}
\`\`\`

### switch
\`\`\`c
switch (value) {
    case 1: /* ... */ break;
    case 2: /* ... */ break;
    default: /* ... */ break;
}
\`\`\`

### goto
- Exists in C but generally avoided
- Can be useful for error cleanup in deeply nested code
- Creates spaghetti code when overused

### Key Points
- switch uses fall-through by default -- always use break unless intentional
- Braces are optional for single-statement blocks but recommended
- Nested if statements can be hard to read; consider extracting functions
`,
  exercises: [
    {
      id: 'c-ctrl-1',
      title: 'Basic if-else',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete the if-else statement to check if a number is positive, negative, or zero.',
      skeleton: `#include <stdio.h>

int main(void) {
    int n = -3;

    __BLANK__ (n > 0) {
        printf("Positive\\n");
    } __BLANK__ __BLANK__ (n < 0) {
        printf("Negative\\n");
    } __BLANK__ {
        printf("Zero\\n");
    }
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int n = -3;

    if (n > 0) {
        printf("Positive\\n");
    } else if (n < 0) {
        printf("Negative\\n");
    } else {
        printf("Zero\\n");
    }
    return 0;
}`,
      hints: [
        'if starts the conditional check.',
        'else if provides an alternative condition.',
        'else handles all remaining cases.',
      ],
      concepts: ['if', 'else if', 'else', 'conditional branching'],
    },
    {
      id: 'c-ctrl-2',
      title: 'Switch statement',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete the switch statement to print the day of the week.',
      skeleton: `#include <stdio.h>

int main(void) {
    int day = 3;

    __BLANK__ (day) {
        __BLANK__ 1: printf("Monday\\n"); __BLANK__;
        case 2: printf("Tuesday\\n"); break;
        case 3: printf("Wednesday\\n"); break;
        __BLANK__: printf("Unknown\\n"); break;
    }
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int day = 3;

    switch (day) {
        case 1: printf("Monday\\n"); break;
        case 2: printf("Tuesday\\n"); break;
        case 3: printf("Wednesday\\n"); break;
        default: printf("Unknown\\n"); break;
    }
    return 0;
}`,
      hints: [
        'switch evaluates the expression and jumps to the matching case.',
        'Each case label is followed by a colon.',
        'default handles values that do not match any case.',
      ],
      concepts: ['switch', 'case', 'break', 'default'],
    },
    {
      id: 'c-ctrl-3',
      title: 'Switch fall-through',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output when break statements are missing.',
      skeleton: `#include <stdio.h>

int main(void) {
    int x = 2;
    switch (x) {
        case 1: printf("one ");
        case 2: printf("two ");
        case 3: printf("three ");
        case 4: printf("four ");
        default: printf("other ");
    }
    printf("\\n");
    return 0;
}`,
      solution: `two three four other `,
      hints: [
        'Without break, execution falls through to the next case.',
        'Matching case 2, it prints "two " then falls through to case 3, 4, and default.',
        'All cases after the matching one execute without break.',
      ],
      concepts: ['fall-through', 'missing break', 'switch behavior'],
    },
    {
      id: 'c-ctrl-4',
      title: 'Nested if statements',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a function that classifies a triangle given three sides.',
      skeleton: `// Write a function that takes three int sides (a, b, c) and prints:
// "Equilateral" if all sides are equal
// "Isosceles" if exactly two sides are equal
// "Scalene" if no sides are equal
// "Invalid" if any side is <= 0`,
      solution: `#include <stdio.h>

void classify_triangle(int a, int b, int c) {
    if (a <= 0 || b <= 0 || c <= 0) {
        printf("Invalid\\n");
    } else if (a == b && b == c) {
        printf("Equilateral\\n");
    } else if (a == b || b == c || a == c) {
        printf("Isosceles\\n");
    } else {
        printf("Scalene\\n");
    }
}

int main(void) {
    classify_triangle(3, 3, 3);
    classify_triangle(3, 3, 5);
    classify_triangle(3, 4, 5);
    classify_triangle(0, 1, 2);
    return 0;
}`,
      hints: [
        'Check invalid first (any side <= 0).',
        'Equilateral: all three sides equal.',
        'Isosceles: at least two sides equal but not all three.',
      ],
      concepts: ['nested if', 'classification', 'logical operators'],
    },
    {
      id: 'c-ctrl-5',
      title: 'Fix dangling else',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the dangling else bug where the else binds to the wrong if.',
      skeleton: `#include <stdio.h>

int main(void) {
    int x = 5, y = 10;

    // Intended: only print "Both positive and x > y" if both conditions are true
    if (x > 0)
        if (x > y)
            printf("x > y\\n");
    else
        printf("x is not positive\\n");

    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int x = 5, y = 10;

    if (x > 0) {
        if (x > y) {
            printf("x > y\\n");
        }
    } else {
        printf("x is not positive\\n");
    }

    return 0;
}`,
      hints: [
        'In C, else binds to the nearest if without braces.',
        'The else is bound to if (x > y), not if (x > 0).',
        'Use braces to explicitly control which if the else belongs to.',
      ],
      concepts: ['dangling else', 'braces', 'if-else binding'],
    },
    {
      id: 'c-ctrl-6',
      title: 'Switch with ranges (grouped cases)',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that converts a score (0-100) to a letter grade using grouped switch cases.',
      skeleton: `// Write char score_to_grade(int score) that returns:
// 'A' for 90-100, 'B' for 80-89, 'C' for 70-79,
// 'D' for 60-69, 'F' for 0-59
// Use switch on score/10 with fall-through for 9 and 10.`,
      solution: `#include <stdio.h>

char score_to_grade(int score) {
    switch (score / 10) {
        case 10:
        case 9: return 'A';
        case 8: return 'B';
        case 7: return 'C';
        case 6: return 'D';
        default: return 'F';
    }
}

int main(void) {
    printf("%c\\n", score_to_grade(95));
    printf("%c\\n", score_to_grade(85));
    printf("%c\\n", score_to_grade(72));
    printf("%c\\n", score_to_grade(55));
    return 0;
}`,
      hints: [
        'Divide score by 10 to map 0-100 to 0-10.',
        'case 10 falls through to case 9 for scores of 100.',
        'Using return instead of break to exit the switch and function.',
      ],
      concepts: ['switch grouping', 'fall-through intentional', 'integer division'],
    },
    {
      id: 'c-ctrl-7',
      title: 'Goto for cleanup',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use goto for a cleanup pattern in error handling.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

int process(void) {
    int *data = malloc(100 * sizeof(int));
    if (!data) __BLANK__ cleanup;

    int *more = malloc(200 * sizeof(int));
    if (!more) __BLANK__ cleanup_data;

    printf("Processing...\\n");
    free(more);
    free(data);
    return 0;

cleanup_data:
    __BLANK__(data);
cleanup:
    printf("Error: allocation failed\\n");
    return -1;
}

int main(void) {
    process();
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int process(void) {
    int *data = malloc(100 * sizeof(int));
    if (!data) goto cleanup;

    int *more = malloc(200 * sizeof(int));
    if (!more) goto cleanup_data;

    printf("Processing...\\n");
    free(more);
    free(data);
    return 0;

cleanup_data:
    free(data);
cleanup:
    printf("Error: allocation failed\\n");
    return -1;
}

int main(void) {
    process();
    return 0;
}`,
      hints: [
        'goto jumps to a named label for cleanup.',
        'Labels end with a colon and mark a jump target.',
        'This is one of the few accepted uses of goto in C -- cleanup on error.',
      ],
      concepts: ['goto', 'cleanup pattern', 'error handling', 'resource management'],
    },
    {
      id: 'c-ctrl-8',
      title: 'Nested switch',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that uses a nested switch to handle menu and sub-menu choices.',
      skeleton: `// Write a function void handle_menu(int menu, int option) that:
// menu 1 (File): option 1="New", 2="Open", 3="Save"
// menu 2 (Edit): option 1="Cut", 2="Copy", 3="Paste"
// Print the action name. Print "Unknown" for invalid combinations.`,
      solution: `#include <stdio.h>

void handle_menu(int menu, int option) {
    switch (menu) {
        case 1:
            switch (option) {
                case 1: printf("New\\n"); break;
                case 2: printf("Open\\n"); break;
                case 3: printf("Save\\n"); break;
                default: printf("Unknown\\n"); break;
            }
            break;
        case 2:
            switch (option) {
                case 1: printf("Cut\\n"); break;
                case 2: printf("Copy\\n"); break;
                case 3: printf("Paste\\n"); break;
                default: printf("Unknown\\n"); break;
            }
            break;
        default:
            printf("Unknown\\n");
            break;
    }
}

int main(void) {
    handle_menu(1, 2);
    handle_menu(2, 3);
    handle_menu(3, 1);
    return 0;
}`,
      hints: [
        'Nest a switch inside each case of the outer switch.',
        'Each inner switch needs its own break statements.',
        'The outer switch also needs break after each case block.',
      ],
      concepts: ['nested switch', 'menu dispatch', 'multi-level branching'],
    },
    {
      id: 'c-ctrl-9',
      title: 'Predict if-else chain',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict which branch executes in an if-else if chain.',
      skeleton: `#include <stdio.h>

int main(void) {
    int x = 15;

    if (x > 20) {
        printf("A\\n");
    } else if (x > 10) {
        printf("B\\n");
    } else if (x > 5) {
        printf("C\\n");
    } else {
        printf("D\\n");
    }
    return 0;
}`,
      solution: `B`,
      hints: [
        'x = 15. First check: 15 > 20 is false.',
        'Second check: 15 > 10 is true, so "B" is printed.',
        'Once a branch executes, the remaining else-if branches are skipped.',
      ],
      concepts: ['if-else if chain', 'first match wins', 'conditional execution'],
    },
    {
      id: 'c-ctrl-10',
      title: 'Conditional with side effects',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict output when conditions have side effects.',
      skeleton: `#include <stdio.h>

int main(void) {
    int a = 0, b = 0, c = 0;

    if (a++ && b++) {
        c = 1;
    }
    printf("a=%d b=%d c=%d\\n", a, b, c);

    if (a++ || b++) {
        c = 2;
    }
    printf("a=%d b=%d c=%d\\n", a, b, c);
    return 0;
}`,
      solution: `a=1 b=0 c=0
a=2 b=0 c=2`,
      hints: [
        'a++ returns 0 (old value) then increments. 0 is false, so && short-circuits.',
        'Since && short-circuits, b++ is never evaluated. a=1, b=0, c=0.',
        'In ||: a++ returns 1 (true), so || short-circuits. b++ is not evaluated. c=2.',
      ],
      concepts: ['short-circuit', 'side effects in conditions', 'post-increment'],
    },
    {
      id: 'c-ctrl-11',
      title: 'Write a calculator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a calculator function using switch on the operator character.',
      skeleton: `// Write double calc(double a, char op, double b) that:
// '+' -> a + b
// '-' -> a - b
// '*' -> a * b
// '/' -> a / b (return 0 if b is 0)
// default -> return 0`,
      solution: `#include <stdio.h>

double calc(double a, char op, double b) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return (b != 0) ? a / b : 0;
        default: return 0;
    }
}

int main(void) {
    printf("%.1f\\n", calc(10, '+', 5));
    printf("%.1f\\n", calc(10, '-', 3));
    printf("%.1f\\n", calc(10, '*', 4));
    printf("%.1f\\n", calc(10, '/', 3));
    printf("%.1f\\n", calc(10, '/', 0));
    return 0;
}`,
      hints: [
        'Switch on the char operator.',
        'Use return directly from each case instead of break.',
        'Check for division by zero before dividing.',
      ],
      concepts: ['switch on char', 'calculator', 'division by zero'],
    },
    {
      id: 'c-ctrl-12',
      title: 'Fix missing break',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the switch statement where missing break causes unintended fall-through.',
      skeleton: `#include <stdio.h>

int main(void) {
    int color = 2;
    switch (color) {
        case 1:
            printf("Red\\n");
        case 2:
            printf("Green\\n");
        case 3:
            printf("Blue\\n");
        default:
            printf("Unknown\\n");
    }
    return 0;
}
// Currently prints: Green, Blue, Unknown
// Should print only: Green`,
      solution: `#include <stdio.h>

int main(void) {
    int color = 2;
    switch (color) {
        case 1:
            printf("Red\\n");
            break;
        case 2:
            printf("Green\\n");
            break;
        case 3:
            printf("Blue\\n");
            break;
        default:
            printf("Unknown\\n");
            break;
    }
    return 0;
}`,
      hints: [
        'Without break, execution falls through to the next case.',
        'Add break; after each printf statement.',
        'Always include break in every case unless fall-through is intentional.',
      ],
      concepts: ['switch break', 'fall-through bug', 'defensive coding'],
    },
    {
      id: 'c-ctrl-13',
      title: 'Multiple conditions with &&',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a function that checks if a year is a leap year.',
      skeleton: `// Write int is_leap_year(int year) that returns 1 for leap years:
// Divisible by 4 AND (not divisible by 100 OR divisible by 400)`,
      solution: `#include <stdio.h>

int is_leap_year(int year) {
    return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
}

int main(void) {
    printf("%d\\n", is_leap_year(2000));
    printf("%d\\n", is_leap_year(1900));
    printf("%d\\n", is_leap_year(2024));
    printf("%d\\n", is_leap_year(2023));
    return 0;
}`,
      hints: [
        'A leap year is divisible by 4.',
        'But not divisible by 100, unless also divisible by 400.',
        'Combine with && and || using proper parentheses.',
      ],
      concepts: ['compound conditions', 'leap year', 'logical operators'],
    },
    {
      id: 'c-ctrl-14',
      title: 'Intentional fall-through',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use intentional fall-through to group days into weekday/weekend categories.',
      skeleton: `#include <stdio.h>

void day_type(int day) {
    switch (day) {
        case 1: __BLANK__
        case 2: __BLANK__
        case 3: __BLANK__
        case 4: __BLANK__
        case 5:
            printf("Weekday\\n");
            break;
        case 6: __BLANK__
        case 7:
            printf("Weekend\\n");
            break;
        default:
            printf("Invalid\\n");
            break;
    }
}

int main(void) {
    day_type(3);
    day_type(6);
    return 0;
}`,
      solution: `#include <stdio.h>

void day_type(int day) {
    switch (day) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            printf("Weekday\\n");
            break;
        case 6:
        case 7:
            printf("Weekend\\n");
            break;
        default:
            printf("Invalid\\n");
            break;
    }
}

int main(void) {
    day_type(3);
    day_type(6);
    return 0;
}`,
      hints: [
        'Cases with no code fall through to the next case.',
        'Cases 1-5 all fall through to the weekday printf.',
        'Cases 6-7 fall through to the weekend printf.',
      ],
      concepts: ['intentional fall-through', 'case grouping', 'switch patterns'],
    },
    {
      id: 'c-ctrl-15',
      title: 'Conditional compilation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a program that uses #ifdef for debug/release conditional behavior.',
      skeleton: `// Write a program that:
// 1. Defines DEBUG macro at the top
// 2. Uses #ifdef DEBUG to print debug messages
// 3. Always prints "Program running"
// 4. If DEBUG: also prints "Debug mode active"`,
      solution: `#include <stdio.h>

#define DEBUG

int main(void) {
    printf("Program running\\n");
#ifdef DEBUG
    printf("Debug mode active\\n");
#endif
    return 0;
}`,
      hints: [
        '#define DEBUG defines the macro (value does not matter).',
        '#ifdef DEBUG checks if DEBUG is defined.',
        '#endif closes the conditional compilation block.',
      ],
      concepts: ['conditional compilation', '#ifdef', '#define', 'debug mode'],
    },
    {
      id: 'c-ctrl-16',
      title: 'Refactor deep nesting',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor deeply nested if statements using early returns.',
      skeleton: `#include <stdio.h>

int process_order(int quantity, double price, int in_stock) {
    double total = -1;
    if (quantity > 0) {
        if (price > 0) {
            if (in_stock) {
                total = quantity * price;
                if (total > 1000) {
                    total *= 0.9;  // discount
                }
            }
        }
    }
    return total;
}

int main(void) {
    printf("%.2f\\n", process_order(5, 100, 1));
    printf("%.2f\\n", process_order(-1, 100, 1));
    return 0;
}`,
      solution: `#include <stdio.h>

double process_order(int quantity, double price, int in_stock) {
    if (quantity <= 0) return -1;
    if (price <= 0) return -1;
    if (!in_stock) return -1;

    double total = quantity * price;
    if (total > 1000) {
        total *= 0.9;
    }
    return total;
}

int main(void) {
    printf("%.2f\\n", process_order(5, 100, 1));
    printf("%.2f\\n", process_order(-1, 100, 1));
    return 0;
}`,
      hints: [
        'Use guard clauses: check for invalid conditions first and return early.',
        'This flattens the nesting and makes the happy path clear.',
        'Also fix the return type to double to match the total variable.',
      ],
      concepts: ['guard clauses', 'early return', 'refactoring nested ifs'],
    },
    {
      id: 'c-ctrl-17',
      title: 'Refactor switch to lookup',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor a large switch statement into an array lookup.',
      skeleton: `#include <stdio.h>

const char* month_name(int month) {
    switch (month) {
        case 1: return "January";
        case 2: return "February";
        case 3: return "March";
        case 4: return "April";
        case 5: return "May";
        case 6: return "June";
        case 7: return "July";
        case 8: return "August";
        case 9: return "September";
        case 10: return "October";
        case 11: return "November";
        case 12: return "December";
        default: return "Invalid";
    }
}

int main(void) {
    printf("%s\\n", month_name(3));
    printf("%s\\n", month_name(12));
    return 0;
}`,
      solution: `#include <stdio.h>

const char* month_name(int month) {
    static const char *names[] = {
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    };
    if (month < 1 || month > 12) return "Invalid";
    return names[month - 1];
}

int main(void) {
    printf("%s\\n", month_name(3));
    printf("%s\\n", month_name(12));
    return 0;
}`,
      hints: [
        'Replace the switch with a static array of month names.',
        'Index the array with month - 1 (since arrays are 0-indexed).',
        'Validate the input range before indexing.',
      ],
      concepts: ['lookup table', 'array vs switch', 'static const array'],
    },
    {
      id: 'c-ctrl-18',
      title: 'Predict nested if',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output of nested conditional statements.',
      skeleton: `#include <stdio.h>

int main(void) {
    int a = 1, b = 2, c = 3;

    if (a < b) {
        if (b < c) {
            printf("ascending\\n");
        } else {
            printf("not ascending\\n");
        }
    }

    if (a > b) {
        printf("A\\n");
    } else if (b > c) {
        printf("B\\n");
    } else {
        printf("C\\n");
    }
    return 0;
}`,
      solution: `ascending
C`,
      hints: [
        'a(1) < b(2) is true, then b(2) < c(3) is true: "ascending".',
        'a(1) > b(2) is false, b(2) > c(3) is false, so "C" from else.',
        'Both if blocks execute independently.',
      ],
      concepts: ['nested if evaluation', 'else chains', 'independent blocks'],
    },
    {
      id: 'c-ctrl-19',
      title: 'Truthiness in C',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a program demonstrating what values are truthy and falsy in C.',
      skeleton: `// Write a program that tests and prints whether each value is
// "truthy" or "falsy": 0, 1, -1, 42, 0.0, 3.14, '\\0', 'A', NULL
// Remember: in C, 0 is false, everything else is true.`,
      solution: `#include <stdio.h>

void check(const char *name, int value) {
    printf("%s: %s\\n", name, value ? "truthy" : "falsy");
}

int main(void) {
    check("0", 0);
    check("1", 1);
    check("-1", -1);
    check("42", 42);
    check("'\\\\0'", '\\0');
    check("'A'", 'A');
    return 0;
}`,
      hints: [
        'In C, 0 is the only integer falsy value.',
        'Any non-zero integer is truthy, including negative numbers.',
        'The null character \'\\0\' has the integer value 0, so it is falsy.',
      ],
      concepts: ['truthiness', 'falsy values', 'C boolean semantics'],
    },
    {
      id: 'c-ctrl-20',
      title: 'Fix unreachable code',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the function where a misplaced return makes code unreachable.',
      skeleton: `#include <stdio.h>

const char* classify(int n) {
    if (n > 0) {
        return "positive";
        printf("Found positive number\\n");  // unreachable
    }
    if (n == 0) return "zero";
    return "negative";
    printf("Classification complete\\n");  // unreachable
}

int main(void) {
    printf("%s\\n", classify(5));
    printf("%s\\n", classify(0));
    printf("%s\\n", classify(-3));
    return 0;
}`,
      solution: `#include <stdio.h>

const char* classify(int n) {
    const char *result;
    if (n > 0) {
        result = "positive";
        printf("Found positive number\\n");
    } else if (n == 0) {
        result = "zero";
    } else {
        result = "negative";
    }
    printf("Classification complete\\n");
    return result;
}

int main(void) {
    printf("%s\\n", classify(5));
    printf("%s\\n", classify(0));
    printf("%s\\n", classify(-3));
    return 0;
}`,
      hints: [
        'Code after return is unreachable and never executes.',
        'Move the printf before return, or restructure the function.',
        'Store the result in a variable and return at the end.',
      ],
      concepts: ['unreachable code', 'return placement', 'control flow analysis'],
    },
  ],
};
