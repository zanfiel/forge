import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-preproc',
  title: '17. Preprocessor',
  explanation: `## The C Preprocessor

The preprocessor runs before compilation, handling directives that start with \`#\`.

\`\`\`c
#define PI 3.14159
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#include <stdio.h>
#ifdef DEBUG
    printf("debug info");
#endif
\`\`\`

### Key Directives
- \`#define\`: object-like and function-like macros
- \`#include\`: file inclusion (\`<>\` vs \`""\`)
- \`#ifdef / #ifndef / #if / #elif / #else / #endif\`: conditional compilation
- \`#pragma\`: compiler-specific directives
- \`#error\`: generate compilation error
- \`##\`: token pasting, \`#\`: stringification
`,
  exercises: [
    {
      id: 'c-preproc-1',
      title: 'Object-like macros',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Define and use object-like macros.',
      skeleton: `#include <stdio.h>

__BLANK__ PI 3.14159
__BLANK__ MAX_SIZE 100
__BLANK__ APP_NAME "MyApp"

int main(void) {
    printf("Pi: %f\\n", PI);
    printf("Max size: %d\\n", MAX_SIZE);
    printf("App: %s\\n", APP_NAME);
    return 0;
}`,
      solution: `#include <stdio.h>

#define PI 3.14159
#define MAX_SIZE 100
#define APP_NAME "MyApp"

int main(void) {
    printf("Pi: %f\\n", PI);
    printf("Max size: %d\\n", MAX_SIZE);
    printf("App: %s\\n", APP_NAME);
    return 0;
}`,
      hints: [
        '#define NAME value creates a text substitution.',
        'No = sign, no semicolon in #define.',
        'The preprocessor replaces PI with 3.14159 before compilation.',
      ],
      concepts: ['object-like macro', '#define', 'text substitution'],
    },
    {
      id: 'c-preproc-2',
      title: 'Function-like macros',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Define and use function-like macros.',
      skeleton: `#include <stdio.h>

#define __BLANK__(a, b) ((a) > (b) ? (a) : (b))
#define __BLANK__(a, b) ((a) < (b) ? (a) : (b))
#define __BLANK__(x) ((x) * (x))

int main(void) {
    printf("Max: %d\\n", MAX(10, 20));
    printf("Min: %d\\n", MIN(10, 20));
    printf("Square: %d\\n", SQUARE(5));
    return 0;
}`,
      solution: `#include <stdio.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))
#define SQUARE(x) ((x) * (x))

int main(void) {
    printf("Max: %d\\n", MAX(10, 20));
    printf("Min: %d\\n", MIN(10, 20));
    printf("Square: %d\\n", SQUARE(5));
    return 0;
}`,
      hints: [
        'No space between macro name and parenthesis.',
        'Wrap every parameter use in parentheses.',
        'Wrap the whole expression in outer parentheses.',
      ],
      concepts: ['function-like macro', 'parameter parentheses', 'macro safety'],
    },
    {
      id: 'c-preproc-3',
      title: 'Predict macro side effects',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the dangerous side effects of macro expansion.',
      skeleton: `#include <stdio.h>

#define SQUARE(x) ((x) * (x))

int main(void) {
    int a = 3;
    int b = SQUARE(a++);
    // Expands to: ((a++) * (a++))
    // a is incremented twice!
    printf("%d %d\\n", b, a);
    return 0;
}`,
      solution: `9 5`,
      hints: [
        'SQUARE(a++) expands to ((a++) * (a++)).',
        'Post-increment: first a++ yields 3, second a++ yields 3 (or 4, undefined!).',
        'Actually this is undefined behavior -- but commonly gives 9 5 or 12 5.',
      ],
      concepts: ['macro side effects', 'double evaluation', 'undefined behavior'],
    },
    {
      id: 'c-preproc-4',
      title: 'Include guard',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a proper include guard for a header file.',
      skeleton: `// myheader.h
__BLANK__ MYHEADER_H
__BLANK__ MYHEADER_H

typedef struct {
    int x, y;
} Point;

Point point_add(Point a, Point b);

__BLANK__`,
      solution: `// myheader.h
#ifndef MYHEADER_H
#define MYHEADER_H

typedef struct {
    int x, y;
} Point;

Point point_add(Point a, Point b);

#endif`,
      hints: [
        '#ifndef checks if the symbol is NOT defined.',
        '#define defines it to prevent re-inclusion.',
        '#endif closes the conditional block.',
      ],
      concepts: ['include guard', 'header protection', 'multiple inclusion'],
    },
    {
      id: 'c-preproc-5',
      title: 'Conditional compilation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use preprocessor conditionals for debug and platform code.',
      skeleton: `// Write a program that:
// 1. Uses #ifdef DEBUG for debug printing
// 2. Uses #if defined(_WIN32) / elif / else for platform detection
// 3. Define DEBUG at the top to enable debug output`,
      solution: `#include <stdio.h>

#define DEBUG

#ifdef DEBUG
  #define DBG(fmt, ...) fprintf(stderr, "[DEBUG] " fmt "\\n", ##__VA_ARGS__)
#else
  #define DBG(fmt, ...)
#endif

const char *get_platform(void) {
    #if defined(_WIN32)
        return "Windows";
    #elif defined(__linux__)
        return "Linux";
    #elif defined(__APPLE__)
        return "macOS";
    #else
        return "Unknown";
    #endif
}

int main(void) {
    DBG("Starting application");
    printf("Platform: %s\\n", get_platform());
    DBG("Value: %d", 42);
    return 0;
}`,
      hints: [
        '#ifdef checks if a macro is defined.',
        '#if defined() allows complex conditions with && and ||.',
        'Empty #define DBG(...) compiles away debug output.',
      ],
      concepts: ['conditional compilation', 'debug macros', 'platform detection'],
    },
    {
      id: 'c-preproc-6',
      title: 'Stringification operator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use the # operator to convert macro arguments to strings.',
      skeleton: `#include <stdio.h>

#define PRINT_VAR(var) printf(__BLANK__ var " = %d\\n", var)
#define ASSERT(expr) do { \\
    if (!(expr)) { \\
        fprintf(stderr, "Assertion failed: " __BLANK__ expr "\\n"); \\
    } \\
} while(0)

int main(void) {
    int x = 42;
    PRINT_VAR(x);
    ASSERT(x == 42);
    ASSERT(x > 100);
    return 0;
}`,
      solution: `#include <stdio.h>

#define PRINT_VAR(var) printf(#var " = %d\\n", var)
#define ASSERT(expr) do { \\
    if (!(expr)) { \\
        fprintf(stderr, "Assertion failed: " #expr "\\n"); \\
    } \\
} while(0)

int main(void) {
    int x = 42;
    PRINT_VAR(x);
    ASSERT(x == 42);
    ASSERT(x > 100);
    return 0;
}`,
      hints: [
        '# before a parameter converts it to a string literal.',
        '#var becomes "x" when called as PRINT_VAR(x).',
        'Adjacent string literals are concatenated by the compiler.',
      ],
      concepts: ['stringification', '# operator', 'debug macros'],
    },
    {
      id: 'c-preproc-7',
      title: 'Token pasting',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use the ## operator to paste tokens together.',
      skeleton: `// Write a macro DECLARE_PAIR(type) that generates:
//   typedef struct { type first; type second; } type##Pair;
// Use it to create IntPair and DoublePair types.`,
      solution: `#include <stdio.h>

#define DECLARE_PAIR(type) \\
    typedef struct { type first; type second; } type##Pair

DECLARE_PAIR(int);
DECLARE_PAIR(double);

int main(void) {
    intPair ip = {10, 20};
    doublePair dp = {1.5, 2.5};
    printf("Int pair: (%d, %d)\\n", ip.first, ip.second);
    printf("Double pair: (%.1f, %.1f)\\n", dp.first, dp.second);
    return 0;
}`,
      hints: [
        '## pastes two tokens together: type##Pair becomes intPair.',
        'The macro generates a complete typedef struct.',
        'This is a primitive form of generic programming in C.',
      ],
      concepts: ['token pasting', '## operator', 'code generation'],
    },
    {
      id: 'c-preproc-8',
      title: 'Fix macro parentheses bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the missing parentheses in a macro causing incorrect results.',
      skeleton: `#include <stdio.h>

#define DOUBLE(x) x + x
#define AREA(w, h) w * h

int main(void) {
    printf("%d\\n", DOUBLE(3) * 2);  // Expects 12, gets 9
    // Expands to: 3 + 3 * 2 = 3 + 6 = 9

    printf("%d\\n", AREA(2 + 1, 4));  // Expects 12, gets 6
    // Expands to: 2 + 1 * 4 = 2 + 4 = 6
    return 0;
}`,
      solution: `#include <stdio.h>

#define DOUBLE(x) ((x) + (x))
#define AREA(w, h) ((w) * (h))

int main(void) {
    printf("%d\\n", DOUBLE(3) * 2);
    printf("%d\\n", AREA(2 + 1, 4));
    return 0;
}`,
      hints: [
        'Without parentheses, operator precedence breaks the expansion.',
        'Always wrap parameters in () and the whole macro in outer ().',
        'AREA(2+1, 4) must expand to ((2+1) * (4)) not 2+1*4.',
      ],
      concepts: ['macro safety', 'parenthesization', 'precedence bugs'],
    },
    {
      id: 'c-preproc-9',
      title: 'Predict __LINE__ and __FILE__',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Understand predefined macros.',
      skeleton: `#include <stdio.h>

#define LOG(msg) printf("[%s:%d] %s\\n", __FILE__, __LINE__, msg)

int main(void) {
    LOG("Starting");
    int x = 42;
    LOG("Running");
    return 0;
}`,
      solution: `[test.c:5] Starting
[test.c:7] Running`,
      hints: [
        '__FILE__ expands to the current filename as a string.',
        '__LINE__ expands to the current line number.',
        'These are evaluated where the macro is expanded, not defined.',
      ],
      concepts: ['__FILE__', '__LINE__', 'predefined macros'],
    },
    {
      id: 'c-preproc-10',
      title: 'Variadic macros',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a variadic macro that accepts variable arguments.',
      skeleton: `#include <stdio.h>

#define LOG(level, fmt, __BLANK__) \\
    printf("[%s] " fmt "\\n", level, __BLANK__)

int main(void) {
    LOG("INFO", "Server started on port %d", 8080);
    LOG("WARN", "Memory usage: %d%%", 85);
    LOG("ERROR", "File %s not found (code %d)", "data.txt", 404);
    return 0;
}`,
      solution: `#include <stdio.h>

#define LOG(level, fmt, ...) \\
    printf("[%s] " fmt "\\n", level, __VA_ARGS__)

int main(void) {
    LOG("INFO", "Server started on port %d", 8080);
    LOG("WARN", "Memory usage: %d%%", 85);
    LOG("ERROR", "File %s not found (code %d)", "data.txt", 404);
    return 0;
}`,
      hints: [
        '... in the parameter list captures variadic arguments.',
        '__VA_ARGS__ expands to those captured arguments.',
        'This is how printf-style macros are built.',
      ],
      concepts: ['variadic macros', '__VA_ARGS__', 'printf wrapper'],
    },
    {
      id: 'c-preproc-11',
      title: 'Multi-line macro with do-while',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a safe multi-line macro using do-while(0).',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

#define SAFE_FREE(ptr) __BLANK__ { \\
    free(ptr); \\
    (ptr) = NULL; \\
} __BLANK__

int main(void) {
    int *p = malloc(sizeof(int));
    *p = 42;
    printf("%d\\n", *p);
    SAFE_FREE(p);
    printf("p is NULL: %d\\n", p == NULL);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

#define SAFE_FREE(ptr) do { \\
    free(ptr); \\
    (ptr) = NULL; \\
} while(0)

int main(void) {
    int *p = malloc(sizeof(int));
    *p = 42;
    printf("%d\\n", *p);
    SAFE_FREE(p);
    printf("p is NULL: %d\\n", p == NULL);
    return 0;
}`,
      hints: [
        'do { ... } while(0) makes a multi-statement macro safe.',
        'Without it, if (cond) SAFE_FREE(p); would break.',
        'The semicolon after while(0) pairs with the macro call.',
      ],
      concepts: ['do-while(0) idiom', 'multi-statement macro', 'macro safety'],
    },
    {
      id: 'c-preproc-12',
      title: 'Fix include order bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the compilation error from incorrect macro/include ordering.',
      skeleton: `#include <stdio.h>

void debug_print(const char *msg) {
    #ifdef DEBUG
    printf("[DEBUG] %s\\n", msg);
    #endif
}

// Bug: DEBUG defined after functions that use it
#define DEBUG

int main(void) {
    debug_print("test");  // Never prints even though DEBUG is defined
    return 0;
}`,
      solution: `#include <stdio.h>

#define DEBUG

void debug_print(const char *msg) {
    #ifdef DEBUG
    printf("[DEBUG] %s\\n", msg);
    #endif
}

int main(void) {
    debug_print("test");
    return 0;
}`,
      hints: [
        'Preprocessor directives are processed top-to-bottom.',
        'DEBUG must be defined before the #ifdef that checks it.',
        'Move #define DEBUG above the function that uses it.',
      ],
      concepts: ['preprocessor order', 'definition before use', 'top-down processing'],
    },
    {
      id: 'c-preproc-13',
      title: 'Predict #if expressions',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict which branches of #if are compiled.',
      skeleton: `#include <stdio.h>

#define VERSION 3
#define FEATURE_A 1
#define FEATURE_B 0

int main(void) {
    #if VERSION >= 3
    printf("v3+\\n");
    #else
    printf("old\\n");
    #endif

    #if FEATURE_A && !FEATURE_B
    printf("A only\\n");
    #elif FEATURE_A && FEATURE_B
    printf("A and B\\n");
    #else
    printf("none\\n");
    #endif
    return 0;
}`,
      solution: `v3+
A only`,
      hints: [
        'VERSION >= 3 is true (3 >= 3), so "v3+" prints.',
        'FEATURE_A=1 && !FEATURE_B=!0=1, so first #if is true.',
        '#if can use arithmetic and logical operators.',
      ],
      concepts: ['#if expressions', 'preprocessor arithmetic', 'feature flags'],
    },
    {
      id: 'c-preproc-14',
      title: 'Write array size macro',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write the common ARRAY_SIZE macro.',
      skeleton: `// Write a macro ARRAY_SIZE(arr) that returns the number
// of elements in a statically-allocated array.
// Use sizeof to compute it.`,
      solution: `#include <stdio.h>

#define ARRAY_SIZE(arr) (sizeof(arr) / sizeof((arr)[0]))

int main(void) {
    int nums[] = {10, 20, 30, 40, 50};
    char str[] = "Hello";
    double vals[] = {1.1, 2.2, 3.3};

    printf("nums: %zu elements\\n", ARRAY_SIZE(nums));
    printf("str: %zu elements\\n", ARRAY_SIZE(str));
    printf("vals: %zu elements\\n", ARRAY_SIZE(vals));
    return 0;
}`,
      hints: [
        'sizeof(arr) gives total bytes, sizeof(arr[0]) gives one element.',
        'Division gives the count of elements.',
        'Only works on actual arrays, NOT on pointers.',
      ],
      concepts: ['ARRAY_SIZE macro', 'sizeof idiom', 'element count'],
    },
    {
      id: 'c-preproc-15',
      title: 'Refactor magic constants to defines',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Replace magic numbers with named preprocessor constants.',
      skeleton: `#include <stdio.h>

int main(void) {
    char buffer[1024];
    int connections[256];
    double timeout = 30.0;

    for (int i = 0; i < 256; i++) {
        connections[i] = 0;
    }
    printf("Buffer: %d, Max conn: %d, Timeout: %.0f\\n",
           1024, 256, 30.0);
    return 0;
}`,
      solution: `#include <stdio.h>

#define BUFFER_SIZE 1024
#define MAX_CONNECTIONS 256
#define DEFAULT_TIMEOUT 30.0

int main(void) {
    char buffer[BUFFER_SIZE];
    int connections[MAX_CONNECTIONS];
    double timeout = DEFAULT_TIMEOUT;

    for (int i = 0; i < MAX_CONNECTIONS; i++) {
        connections[i] = 0;
    }
    printf("Buffer: %d, Max conn: %d, Timeout: %.0f\\n",
           BUFFER_SIZE, MAX_CONNECTIONS, DEFAULT_TIMEOUT);
    return 0;
}`,
      hints: [
        'Magic numbers are hard to understand and maintain.',
        'Named constants document the purpose of each value.',
        'Changing a value in one #define updates all uses.',
      ],
      concepts: ['named constants', 'magic number elimination', 'maintainability'],
    },
    {
      id: 'c-preproc-16',
      title: 'Refactor ifdef to feature macros',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor scattered #ifdefs into a clean feature macro system.',
      skeleton: `#include <stdio.h>

void init(void) {
    printf("Init\\n");
    #ifdef FEATURE_LOGGING
    printf("Logging enabled\\n");
    #endif
    #ifdef FEATURE_METRICS
    printf("Metrics enabled\\n");
    #endif
}

void process(int data) {
    #ifdef FEATURE_LOGGING
    printf("Processing: %d\\n", data);
    #endif
    printf("Result: %d\\n", data * 2);
    #ifdef FEATURE_METRICS
    printf("Metric: processed 1 item\\n");
    #endif
}

int main(void) {
    init();
    process(42);
    return 0;
}`,
      solution: `#include <stdio.h>

#define FEATURE_LOGGING
// #define FEATURE_METRICS

#ifdef FEATURE_LOGGING
  #define LOG(fmt, ...) printf(fmt "\\n", ##__VA_ARGS__)
#else
  #define LOG(fmt, ...)
#endif

#ifdef FEATURE_METRICS
  #define METRIC(msg) printf("Metric: " msg "\\n")
#else
  #define METRIC(msg)
#endif

void init(void) {
    printf("Init\\n");
    LOG("Logging enabled");
    METRIC("metrics enabled");
}

void process(int data) {
    LOG("Processing: %d", data);
    printf("Result: %d\\n", data * 2);
    METRIC("processed 1 item");
}

int main(void) {
    init();
    process(42);
    return 0;
}`,
      hints: [
        'Centralize the #ifdef checks into macro definitions.',
        'LOG and METRIC macros compile to nothing when disabled.',
        'Code reads cleaner without scattered #ifdef blocks.',
      ],
      concepts: ['feature macros', 'conditional compilation', 'clean code'],
    },
    {
      id: 'c-preproc-17',
      title: 'Predict stringification',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output of stringification and concatenation.',
      skeleton: `#include <stdio.h>

#define STR(x) #x
#define CONCAT(a, b) a ## b

int main(void) {
    printf("%s\\n", STR(hello));
    printf("%s\\n", STR(1 + 2));

    int xy = 42;
    printf("%d\\n", CONCAT(x, y));
    return 0;
}`,
      solution: `hello
1 + 2
42`,
      hints: [
        '#x converts the argument to a string literal.',
        'STR(1 + 2) becomes "1 + 2" as a string.',
        'CONCAT(x, y) becomes xy, which is the variable with value 42.',
      ],
      concepts: ['stringification', 'token pasting', 'macro expansion'],
    },
    {
      id: 'c-preproc-18',
      title: 'Write generic swap macro',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a type-safe swap macro using GCC typeof extension.',
      skeleton: `// Write a SWAP(a, b) macro that works for any type.
// Use a temporary variable.
// Bonus: use __typeof__ for type safety (GCC extension).`,
      solution: `#include <stdio.h>

#define SWAP(a, b) do { \\
    __typeof__(a) _tmp = (a); \\
    (a) = (b); \\
    (b) = _tmp; \\
} while(0)

int main(void) {
    int x = 10, y = 20;
    SWAP(x, y);
    printf("x=%d y=%d\\n", x, y);

    double a = 1.5, b = 2.5;
    SWAP(a, b);
    printf("a=%.1f b=%.1f\\n", a, b);

    char *s1 = "hello", *s2 = "world";
    SWAP(s1, s2);
    printf("s1=%s s2=%s\\n", s1, s2);
    return 0;
}`,
      hints: [
        '__typeof__(a) deduces the type of a at compile time.',
        'do { ... } while(0) makes the macro safe to use in if/else.',
        'Prefix tmp with _ to avoid name collisions.',
      ],
      concepts: ['typeof extension', 'generic macro', 'swap pattern'],
    },
    {
      id: 'c-preproc-19',
      title: 'Fix recursive macro',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Fix the issue with a macro that appears to recurse.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

// Bug: malloc macro shadows the real malloc
#define malloc(size) debug_malloc(size, __FILE__, __LINE__)

void *debug_malloc(size_t size, const char *file, int line) {
    void *ptr = malloc(size);  // Bug: this calls the macro, infinite recursion!
    printf("[%s:%d] malloc(%zu) = %p\\n", file, line, size, ptr);
    return ptr;
}

int main(void) {
    int *p = malloc(sizeof(int));
    free(p);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

void *debug_malloc(size_t size, const char *file, int line) {
    void *ptr = malloc(size);
    printf("[%s:%d] malloc(%zu) = %p\\n", file, line, size, ptr);
    return ptr;
}

#define malloc(size) debug_malloc(size, __FILE__, __LINE__)

int main(void) {
    int *p = malloc(sizeof(int));
    free(p);
    return 0;
}`,
      hints: [
        'Define the wrapper function BEFORE the macro.',
        'The function uses real malloc because the macro is not yet defined.',
        'Then define the macro to redirect calls to the wrapper.',
      ],
      concepts: ['macro shadowing', 'definition order', 'debug allocator'],
    },
    {
      id: 'c-preproc-20',
      title: 'Predict #undef behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the behavior of #undef and macro redefinition.',
      skeleton: `#include <stdio.h>

#define VALUE 10

int main(void) {
    printf("%d\\n", VALUE);
    #undef VALUE
    #define VALUE 20
    printf("%d\\n", VALUE);
    #undef VALUE
    #define VALUE 30
    printf("%d\\n", VALUE);
    return 0;
}`,
      solution: `10
20
30`,
      hints: [
        '#undef removes a macro definition.',
        'After #undef, you can redefine with a new value.',
        'Preprocessor directives apply from that point forward.',
      ],
      concepts: ['#undef', 'macro redefinition', 'preprocessor flow'],
    },
  ],
};
