import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-debug',
  title: '32. Debugging Techniques',
  explanation: `## Debugging Techniques

Effective debugging is a critical skill. C programs can have subtle bugs that require systematic approaches to find and fix.

\`\`\`c
// Debug printing macro
#define DBG(fmt, ...) \\
    fprintf(stderr, "[%s:%d] " fmt "\\n", __FILE__, __LINE__, ##__VA_ARGS__)

// Assert for invariant checking
#include <assert.h>
assert(ptr != NULL && "pointer must not be null");
\`\`\`

### Key Concepts
- **printf debugging**: strategic print statements
- **assert()**: catch invariant violations during development
- **GDB**: step through code, inspect variables, set breakpoints
- **Valgrind**: detect memory errors and leaks
- **Sanitizers**: -fsanitize=address,undefined for runtime checks
`,
  exercises: [
    {
      id: 'c-debug-1',
      title: 'Debug macro',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete a debug print macro with file and line info.',
      skeleton: `#include <stdio.h>

#define DBG(fmt, ...) \\
    fprintf(__BLANK__, "[%s:%d] " fmt "\\n", __BLANK__, __BLANK__, ##__VA_ARGS__)

int main(void) {
    int x = 42;
    DBG("x = %d", x);
    DBG("starting computation");
    return 0;
}`,
      solution: `#include <stdio.h>

#define DBG(fmt, ...) \\
    fprintf(stderr, "[%s:%d] " fmt "\\n", __FILE__, __LINE__, ##__VA_ARGS__)

int main(void) {
    int x = 42;
    DBG("x = %d", x);
    DBG("starting computation");
    return 0;
}`,
      hints: [
        'Debug output goes to stderr to avoid mixing with program output.',
        '__FILE__ expands to the current source filename.',
        '__LINE__ expands to the current line number.',
      ],
      concepts: ['debug macro', '__FILE__', '__LINE__'],
    },
    {
      id: 'c-debug-2',
      title: 'Assert invariant',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Add assertions to validate function preconditions.',
      skeleton: `#include <stdio.h>
#include <assert.h>

int divide(int a, int b) {
    assert(__BLANK__ && "divisor must not be zero");
    return a / b;
}

int safe_index(int arr[], int n, int i) {
    assert(i >= 0 && i < __BLANK__ && "index out of bounds");
    return arr[__BLANK__];
}

int main(void) {
    printf("%d\\n", divide(10, 2));
    int a[] = {10, 20, 30};
    printf("%d\\n", safe_index(a, 3, 1));
    return 0;
}`,
      solution: `#include <stdio.h>
#include <assert.h>

int divide(int a, int b) {
    assert(b != 0 && "divisor must not be zero");
    return a / b;
}

int safe_index(int arr[], int n, int i) {
    assert(i >= 0 && i < n && "index out of bounds");
    return arr[i];
}

int main(void) {
    printf("%d\\n", divide(10, 2));
    int a[] = {10, 20, 30};
    printf("%d\\n", safe_index(a, 3, 1));
    return 0;
}`,
      hints: [
        'Assert b != 0 to prevent division by zero.',
        'Check i >= 0 && i < n for valid array index.',
        'The string after && is printed when the assertion fails.',
      ],
      concepts: ['assert', 'preconditions', 'invariants'],
    },
    {
      id: 'c-debug-3',
      title: 'Conditional debug compilation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write code that only includes debug output when compiled with -DDEBUG.',
      skeleton: `#include <stdio.h>

// Write a LOG macro that:
// - Prints to stderr with [DEBUG] prefix when DEBUG is defined
// - Does nothing when DEBUG is not defined

int factorial(int n) {
    LOG("factorial(%d) called", n);
    if (n <= 1) return 1;
    int result = n * factorial(n - 1);
    LOG("factorial(%d) = %d", n, result);
    return result;
}

int main(void) {
    printf("%d\\n", factorial(5));
    return 0;
}`,
      solution: `#include <stdio.h>

#ifdef DEBUG
#define LOG(fmt, ...) fprintf(stderr, "[DEBUG %s:%d] " fmt "\\n", __FILE__, __LINE__, ##__VA_ARGS__)
#else
#define LOG(fmt, ...) ((void)0)
#endif

int factorial(int n) {
    LOG("factorial(%d) called", n);
    if (n <= 1) return 1;
    int result = n * factorial(n - 1);
    LOG("factorial(%d) = %d", n, result);
    return result;
}

int main(void) {
    printf("%d\\n", factorial(5));
    return 0;
}`,
      hints: [
        'Use #ifdef DEBUG / #else / #endif to conditionally define LOG.',
        'When DEBUG is defined, LOG prints to stderr with file/line info.',
        'When not defined, LOG expands to ((void)0) -- a no-op.',
      ],
      concepts: ['conditional compilation', '#ifdef', 'debug builds'],
    },
    {
      id: 'c-debug-4',
      title: 'Predict assert behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict what happens when NDEBUG is defined.',
      skeleton: `#define NDEBUG
#include <stdio.h>
#include <assert.h>

int main(void) {
    int x = 0;
    assert(x != 0);  // Would normally abort
    printf("x = %d\\n", x);
    printf("reached end\\n");
    return 0;
}`,
      solution: `#define NDEBUG
#include <stdio.h>
#include <assert.h>

int main(void) {
    int x = 0;
    assert(x != 0);  // Disabled by NDEBUG
    printf("x = %d\\n", x);
    printf("reached end\\n");
    return 0;
}
// Output:
// x = 0
// reached end`,
      hints: [
        'NDEBUG disables all assert() calls at compile time.',
        'The assertion is completely removed -- it becomes a no-op.',
        'Program continues normally even though x == 0.',
      ],
      concepts: ['NDEBUG', 'assert disabled', 'release builds'],
    },
    {
      id: 'c-debug-5',
      title: 'Hex dump function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a hex dump function for debugging memory contents.',
      skeleton: `#include <stdio.h>
#include <ctype.h>

// Write void hex_dump(const void *data, size_t size)
// Print hex bytes and ASCII, 16 bytes per line
// Format: "offset: XX XX XX ... | ascii..."

int main(void) {
    const char *msg = "Hello, World!";
    hex_dump(msg, 14);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <ctype.h>

void hex_dump(const void *data, size_t size) {
    const unsigned char *p = data;
    for (size_t i = 0; i < size; i += 16) {
        printf("%04zx: ", i);
        for (size_t j = 0; j < 16; j++) {
            if (i + j < size) printf("%02x ", p[i + j]);
            else printf("   ");
        }
        printf("| ");
        for (size_t j = 0; j < 16 && i + j < size; j++) {
            unsigned char c = p[i + j];
            printf("%c", isprint(c) ? c : '.');
        }
        printf("\\n");
    }
}

int main(void) {
    const char *msg = "Hello, World!";
    hex_dump(msg, 14);
    return 0;
}`,
      hints: [
        'Cast data to unsigned char* for byte access.',
        'Print 16 hex bytes per line, pad with spaces if fewer.',
        'Print ASCII representation, replacing non-printable with \'.\'.',
      ],
      concepts: ['hex dump', 'memory inspection', 'debug utility'],
    },
    {
      id: 'c-debug-6',
      title: 'Fix uninitialized variable',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the bug caused by using an uninitialized variable.',
      skeleton: `#include <stdio.h>

int sum_positive(int arr[], int n) {
    int total;  // BUG: uninitialized
    for (int i = 0; i < n; i++)
        if (arr[i] > 0) total += arr[i];
    return total;
}

int main(void) {
    int a[] = {-1, 5, -3, 8, 2};
    printf("Sum: %d\\n", sum_positive(a, 5));
    return 0;
}`,
      solution: `#include <stdio.h>

int sum_positive(int arr[], int n) {
    int total = 0;
    for (int i = 0; i < n; i++)
        if (arr[i] > 0) total += arr[i];
    return total;
}

int main(void) {
    int a[] = {-1, 5, -3, 8, 2};
    printf("Sum: %d\\n", sum_positive(a, 5));
    return 0;
}`,
      hints: [
        'total is not initialized, so it contains garbage.',
        'Initialize total = 0 before the loop.',
        '-fsanitize=undefined or Valgrind would catch this.',
      ],
      concepts: ['uninitialized variable', 'undefined behavior', 'initialization'],
    },
    {
      id: 'c-debug-7',
      title: 'Error reporting with errno',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete error handling using errno and perror.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>

int main(void) {
    FILE *f = fopen("nonexistent_file.txt", "r");
    if (f == __BLANK__) {
        fprintf(stderr, "Error %d: %s\\n", errno, __BLANK__(errno));
        __BLANK__("fopen");
        return 1;
    }
    fclose(f);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>

int main(void) {
    FILE *f = fopen("nonexistent_file.txt", "r");
    if (f == NULL) {
        fprintf(stderr, "Error %d: %s\\n", errno, strerror(errno));
        perror("fopen");
        return 1;
    }
    fclose(f);
    return 0;
}`,
      hints: [
        'fopen returns NULL on failure.',
        'strerror(errno) converts error number to message string.',
        'perror("prefix") prints "prefix: error message" to stderr.',
      ],
      concepts: ['errno', 'strerror', 'perror'],
    },
    {
      id: 'c-debug-8',
      title: 'Memory sanitizer patterns',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete compiler flags for various sanitizers.',
      skeleton: `// Compile with address sanitizer:
// gcc -fsanitize=__BLANK__ -g program.c

// Compile with undefined behavior sanitizer:
// gcc -fsanitize=__BLANK__ -g program.c

// Compile with both:
// gcc -fsanitize=address,__BLANK__ -g program.c

#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *p = malloc(10 * sizeof(int));
    p[10] = 42;  // out of bounds -- ASan catches this
    free(p);
    return 0;
}`,
      solution: `// Compile with address sanitizer:
// gcc -fsanitize=address -g program.c

// Compile with undefined behavior sanitizer:
// gcc -fsanitize=undefined -g program.c

// Compile with both:
// gcc -fsanitize=address,undefined -g program.c

#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *p = malloc(10 * sizeof(int));
    p[10] = 42;  // out of bounds -- ASan catches this
    free(p);
    return 0;
}`,
      hints: [
        '-fsanitize=address detects buffer overflows, use-after-free, leaks.',
        '-fsanitize=undefined catches signed overflow, null deref, etc.',
        'Combine with comma: -fsanitize=address,undefined.',
      ],
      concepts: ['AddressSanitizer', 'UBSan', 'compiler flags'],
    },
    {
      id: 'c-debug-9',
      title: 'Fix dangling pointer',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the dangling pointer returned from a function.',
      skeleton: `#include <stdio.h>

int *get_value(void) {
    int x = 42;
    return &x;  // BUG: returning address of local variable
}

int main(void) {
    int *p = get_value();
    printf("value: %d\\n", *p);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int *get_value(void) {
    int *x = malloc(sizeof(int));
    *x = 42;
    return x;
}

int main(void) {
    int *p = get_value();
    printf("value: %d\\n", *p);
    free(p);
    return 0;
}`,
      hints: [
        'Local variable x is destroyed when get_value returns.',
        'The pointer to x becomes dangling -- undefined behavior.',
        'Allocate on the heap with malloc so it persists.',
      ],
      concepts: ['dangling pointer', 'stack lifetime', 'heap allocation'],
    },
    {
      id: 'c-debug-10',
      title: 'Predict sizeof expression',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict whether sizeof evaluates its argument.',
      skeleton: `#include <stdio.h>

int main(void) {
    int x = 5;
    int y = sizeof(x++);
    printf("x=%d y=%d\\n", x, (int)y);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int x = 5;
    int y = sizeof(x++);
    printf("x=%d y=%d\\n", x, (int)y);
    return 0;
}
// Output: x=5 y=4`,
      hints: [
        'sizeof does NOT evaluate its operand at runtime.',
        'x++ is never executed; sizeof only looks at the type.',
        'x remains 5, y = sizeof(int) = 4.',
      ],
      concepts: ['sizeof', 'compile-time evaluation', 'side effects'],
    },
    {
      id: 'c-debug-11',
      title: 'Trace buffer with ring',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Implement a ring buffer trace logger for debugging.',
      skeleton: `#include <stdio.h>
#include <string.h>

#define TRACE_SIZE 8
#define MSG_LEN 64

// Write void trace_add(const char *msg)
// Write void trace_dump(void)
// Store last TRACE_SIZE messages in a ring buffer

int main(void) {
    for (int i = 0; i < 12; i++) {
        char buf[64];
        snprintf(buf, sizeof(buf), "event %d", i);
        trace_add(buf);
    }
    trace_dump();
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

#define TRACE_SIZE 8
#define MSG_LEN 64

static char trace_buf[TRACE_SIZE][MSG_LEN];
static int trace_idx = 0;
static int trace_count = 0;

void trace_add(const char *msg) {
    strncpy(trace_buf[trace_idx], msg, MSG_LEN - 1);
    trace_buf[trace_idx][MSG_LEN - 1] = '\\0';
    trace_idx = (trace_idx + 1) % TRACE_SIZE;
    if (trace_count < TRACE_SIZE) trace_count++;
}

void trace_dump(void) {
    int start = (trace_count < TRACE_SIZE) ? 0 : trace_idx;
    for (int i = 0; i < trace_count; i++) {
        int idx = (start + i) % TRACE_SIZE;
        printf("[%d] %s\\n", i, trace_buf[idx]);
    }
}

int main(void) {
    for (int i = 0; i < 12; i++) {
        char buf[64];
        snprintf(buf, sizeof(buf), "event %d", i);
        trace_add(buf);
    }
    trace_dump();
    return 0;
}`,
      hints: [
        'Ring buffer: write at trace_idx, advance with modulo.',
        'Track count (up to TRACE_SIZE) to know how many entries exist.',
        'Dump starting from oldest entry.',
      ],
      concepts: ['ring buffer', 'trace logging', 'circular buffer'],
    },
    {
      id: 'c-debug-12',
      title: 'Fix signed integer overflow',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix undefined behavior from signed integer overflow.',
      skeleton: `#include <stdio.h>
#include <limits.h>

int safe_add(int a, int b) {
    return a + b;  // BUG: can overflow for large a and b
}

int main(void) {
    printf("%d\\n", safe_add(INT_MAX, 1));
    return 0;
}`,
      solution: `#include <stdio.h>
#include <limits.h>

int safe_add(int a, int b) {
    if (b > 0 && a > INT_MAX - b) {
        fprintf(stderr, "overflow detected\\n");
        return INT_MAX;
    }
    if (b < 0 && a < INT_MIN - b) {
        fprintf(stderr, "underflow detected\\n");
        return INT_MIN;
    }
    return a + b;
}

int main(void) {
    printf("%d\\n", safe_add(INT_MAX, 1));
    return 0;
}`,
      hints: [
        'Signed integer overflow is undefined behavior in C.',
        'Check before adding: if b > 0 && a > INT_MAX - b, it would overflow.',
        'Similarly check for underflow with INT_MIN.',
      ],
      concepts: ['integer overflow', 'undefined behavior', 'safe arithmetic'],
    },
    {
      id: 'c-debug-13',
      title: 'Static analysis with _Static_assert',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete compile-time assertions to verify type sizes.',
      skeleton: `#include <stdio.h>

_Static_assert(sizeof(int) >= __BLANK__, "int must be at least 4 bytes");
_Static_assert(sizeof(void *) == __BLANK__ || sizeof(void *) == 8, "unexpected pointer size");

typedef struct {
    int x;
    int y;
} Point;

_Static_assert(sizeof(Point) == __BLANK__, "Point should be 8 bytes");

int main(void) {
    printf("All static assertions passed\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

_Static_assert(sizeof(int) >= 4, "int must be at least 4 bytes");
_Static_assert(sizeof(void *) == 4 || sizeof(void *) == 8, "unexpected pointer size");

typedef struct {
    int x;
    int y;
} Point;

_Static_assert(sizeof(Point) == 8, "Point should be 8 bytes");

int main(void) {
    printf("All static assertions passed\\n");
    return 0;
}`,
      hints: [
        'On modern platforms, sizeof(int) is at least 4.',
        'Pointers are either 4 bytes (32-bit) or 8 bytes (64-bit).',
        'Point has two ints: 4 + 4 = 8 bytes with no padding.',
      ],
      concepts: ['_Static_assert', 'compile-time checks', 'type sizes'],
    },
    {
      id: 'c-debug-14',
      title: 'Predict UB with strict aliasing',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Predict the risk of strict aliasing violation.',
      skeleton: `#include <stdio.h>
#include <string.h>

int main(void) {
    float f = 3.14f;

    // Method 1: Type punning via pointer cast (UB!)
    // int i1 = *(int *)&f;

    // Method 2: Safe type punning via memcpy
    int i2;
    memcpy(&i2, &f, sizeof(i2));

    printf("bits: 0x%08x\\n", i2);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    float f = 3.14f;

    // Method 1 would be UB: violates strict aliasing rule
    // *(int *)&f reinterprets float memory as int through incompatible pointer

    // Method 2: Safe -- memcpy is the correct way to type-pun
    int i2;
    memcpy(&i2, &f, sizeof(i2));

    printf("bits: 0x%08x\\n", i2);
    return 0;
}
// Output: bits: 0x4048f5c3`,
      hints: [
        'Casting float* to int* violates strict aliasing -- undefined behavior.',
        'memcpy is the standard-compliant way to reinterpret bytes.',
        'The compiler may optimize away the UB version entirely.',
      ],
      concepts: ['strict aliasing', 'type punning', 'memcpy'],
    },
    {
      id: 'c-debug-15',
      title: 'Error enum with messages',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Implement an error code system with human-readable messages.',
      skeleton: `#include <stdio.h>

typedef enum {
    ERR_OK = 0,
    ERR_NULL_PTR,
    ERR_OUT_OF_MEMORY,
    ERR_INVALID_ARG,
    ERR_COUNT
} ErrorCode;

// Write const char *error_message(ErrorCode err)
// Return human-readable string for each error code

int process(int *data) {
    if (!data) return ERR_NULL_PTR;
    if (*data < 0) return ERR_INVALID_ARG;
    return ERR_OK;
}

int main(void) {
    ErrorCode err = process(NULL);
    if (err) printf("Error: %s\\n", error_message(err));
    int val = -5;
    err = process(&val);
    if (err) printf("Error: %s\\n", error_message(err));
    return 0;
}`,
      solution: `#include <stdio.h>

typedef enum {
    ERR_OK = 0,
    ERR_NULL_PTR,
    ERR_OUT_OF_MEMORY,
    ERR_INVALID_ARG,
    ERR_COUNT
} ErrorCode;

const char *error_message(ErrorCode err) {
    static const char *messages[] = {
        [ERR_OK] = "success",
        [ERR_NULL_PTR] = "null pointer",
        [ERR_OUT_OF_MEMORY] = "out of memory",
        [ERR_INVALID_ARG] = "invalid argument",
    };
    if (err < 0 || err >= ERR_COUNT) return "unknown error";
    return messages[err];
}

int process(int *data) {
    if (!data) return ERR_NULL_PTR;
    if (*data < 0) return ERR_INVALID_ARG;
    return ERR_OK;
}

int main(void) {
    ErrorCode err = process(NULL);
    if (err) printf("Error: %s\\n", error_message(err));
    int val = -5;
    err = process(&val);
    if (err) printf("Error: %s\\n", error_message(err));
    return 0;
}`,
      hints: [
        'Use designated initializers: [ERR_OK] = "success".',
        'Bounds-check the error code before indexing.',
        'Return "unknown error" for out-of-range codes.',
      ],
      concepts: ['error codes', 'designated initializers', 'error messages'],
    },
    {
      id: 'c-debug-16',
      title: 'Fix null dereference',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the null pointer dereference.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *concat(const char *a, const char *b) {
    char *result = malloc(strlen(a) + strlen(b) + 1);
    // BUG: no NULL check on malloc result
    strcpy(result, a);
    strcat(result, b);
    return result;
}

int main(void) {
    char *s = concat("hello ", "world");
    printf("%s\\n", s);
    free(s);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *concat(const char *a, const char *b) {
    if (!a || !b) return NULL;
    char *result = malloc(strlen(a) + strlen(b) + 1);
    if (!result) return NULL;
    strcpy(result, a);
    strcat(result, b);
    return result;
}

int main(void) {
    char *s = concat("hello ", "world");
    if (s) {
        printf("%s\\n", s);
        free(s);
    }
    return 0;
}`,
      hints: [
        'malloc can return NULL when memory is exhausted.',
        'Also check input pointers a and b before strlen.',
        'Caller should check the return value too.',
      ],
      concepts: ['null check', 'malloc failure', 'defensive programming'],
    },
    {
      id: 'c-debug-17',
      title: 'Refactor magic numbers',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Refactor magic numbers into named constants for better debuggability.',
      skeleton: `#include <stdio.h>

int calculate_shipping(int weight) {
    if (weight <= 0) return -1;
    if (weight <= 5) return weight * 3;
    if (weight <= 20) return 15 + (weight - 5) * 2;
    return 45 + (weight - 20) * 1;
}

int main(void) {
    for (int w = 1; w <= 25; w += 5)
        printf("weight=%d cost=%d\\n", w, calculate_shipping(w));
    return 0;
}`,
      solution: `#include <stdio.h>

#define LIGHT_MAX_KG     5
#define MEDIUM_MAX_KG    20
#define LIGHT_RATE       3   /* per kg */
#define MEDIUM_RATE      2   /* per kg */
#define HEAVY_RATE       1   /* per kg */
#define LIGHT_BASE       0
#define MEDIUM_BASE      (LIGHT_MAX_KG * LIGHT_RATE)
#define HEAVY_BASE       (MEDIUM_BASE + (MEDIUM_MAX_KG - LIGHT_MAX_KG) * MEDIUM_RATE)

int calculate_shipping(int weight) {
    if (weight <= 0) return -1;
    if (weight <= LIGHT_MAX_KG)
        return LIGHT_BASE + weight * LIGHT_RATE;
    if (weight <= MEDIUM_MAX_KG)
        return MEDIUM_BASE + (weight - LIGHT_MAX_KG) * MEDIUM_RATE;
    return HEAVY_BASE + (weight - MEDIUM_MAX_KG) * HEAVY_RATE;
}

int main(void) {
    for (int w = 1; w <= 25; w += 5)
        printf("weight=%d cost=%d\\n", w, calculate_shipping(w));
    return 0;
}`,
      hints: [
        'Replace 5, 20, 3, 2, 1 with descriptive #define names.',
        'Compute base costs from the constants.',
        'Named constants make the business logic clear and debuggable.',
      ],
      concepts: ['magic numbers', 'named constants', 'readability'],
    },
    {
      id: 'c-debug-18',
      title: 'Watchpoint concept',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Understand when a variable changes value (GDB watchpoint concept).',
      skeleton: `#include <stdio.h>

int main(void) {
    int x = 10;
    int *p = &x;
    printf("1: x=%d\\n", x);
    *p = 20;
    printf("2: x=%d\\n", x);
    x += 5;
    printf("3: x=%d\\n", x);
    int y = x;
    y = 100;
    printf("4: x=%d y=%d\\n", x, y);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int x = 10;
    int *p = &x;
    printf("1: x=%d\\n", x);
    *p = 20;
    printf("2: x=%d\\n", x);
    x += 5;
    printf("3: x=%d\\n", x);
    int y = x;
    y = 100;
    printf("4: x=%d y=%d\\n", x, y);
    return 0;
}
// Output:
// 1: x=10
// 2: x=20
// 3: x=25
// 4: x=25 y=100`,
      hints: [
        '*p = 20 modifies x through the pointer.',
        'x += 5 makes x = 25.',
        'y = x copies the value; changing y does not affect x.',
      ],
      concepts: ['watchpoints', 'pointer modification', 'value semantics'],
    },
    {
      id: 'c-debug-19',
      title: 'Refactor goto error handling',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor nested error handling to use the goto cleanup pattern.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

int process(void) {
    int *a = malloc(100 * sizeof(int));
    if (!a) return -1;

    int *b = malloc(200 * sizeof(int));
    if (!b) {
        free(a);
        return -1;
    }

    int *c = malloc(300 * sizeof(int));
    if (!c) {
        free(b);
        free(a);
        return -1;
    }

    a[0] = 1; b[0] = 2; c[0] = 3;
    printf("%d %d %d\\n", a[0], b[0], c[0]);

    free(c);
    free(b);
    free(a);
    return 0;
}

int main(void) {
    return process();
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int process(void) {
    int result = -1;
    int *a = NULL, *b = NULL, *c = NULL;

    a = malloc(100 * sizeof(int));
    if (!a) goto cleanup;

    b = malloc(200 * sizeof(int));
    if (!b) goto cleanup;

    c = malloc(300 * sizeof(int));
    if (!c) goto cleanup;

    a[0] = 1; b[0] = 2; c[0] = 3;
    printf("%d %d %d\\n", a[0], b[0], c[0]);
    result = 0;

cleanup:
    free(c);
    free(b);
    free(a);
    return result;
}

int main(void) {
    return process();
}`,
      hints: [
        'Initialize all pointers to NULL at the top.',
        'On any failure, goto cleanup which frees everything.',
        'free(NULL) is safe -- it does nothing.',
      ],
      concepts: ['goto cleanup', 'error handling pattern', 'resource management'],
    },
    {
      id: 'c-debug-20',
      title: 'Core dump analysis concept',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Complete the commands to enable core dumps and analyze them.',
      skeleton: `// Enable core dumps (Linux shell):
// ulimit -c __BLANK__

// Compile with debug symbols:
// gcc -g -o program __BLANK__

// Generate a core dump:
#include <stdio.h>
#include <signal.h>

int main(void) {
    int *p = NULL;
    printf("About to crash...\\n");
    *p = 42;  // SIGSEGV
    return 0;
}

// Analyze core dump with GDB:
// gdb ./program __BLANK__
// (gdb) bt          -- show backtrace
// (gdb) frame 0     -- select stack frame
// (gdb) print p     -- show variable value
// (gdb) list        -- show source code`,
      solution: `// Enable core dumps (Linux shell):
// ulimit -c unlimited

// Compile with debug symbols:
// gcc -g -o program program.c

// Generate a core dump:
#include <stdio.h>
#include <signal.h>

int main(void) {
    int *p = NULL;
    printf("About to crash...\\n");
    *p = 42;  // SIGSEGV
    return 0;
}

// Analyze core dump with GDB:
// gdb ./program core
// (gdb) bt          -- show backtrace
// (gdb) frame 0     -- select stack frame
// (gdb) print p     -- show variable value
// (gdb) list        -- show source code`,
      hints: [
        'ulimit -c unlimited allows core dumps of any size.',
        'Compile the .c file with -g for debug info.',
        'gdb takes the program and core file: gdb ./program core.',
      ],
      concepts: ['core dump', 'GDB', 'post-mortem debugging'],
    },
  ],
};
