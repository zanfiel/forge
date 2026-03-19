import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-variadic',
  title: '37. Variadic Functions',
  explanation: `## Variadic Functions

Variadic functions accept a variable number of arguments. The C standard provides macros in \`<stdarg.h>\` to access them.

\`\`\`c
#include <stdarg.h>

int sum(int count, ...) {
    va_list args;
    va_start(args, count);   // initialize after last named param
    int total = 0;
    for (int i = 0; i < count; i++) {
        total += va_arg(args, int);  // fetch next arg as int
    }
    va_end(args);            // cleanup
    return total;
}

// Usage: sum(3, 10, 20, 30) => 60
\`\`\`

### Key Concepts
- **va_list**: type that holds information for va_arg, va_start, va_end
- **va_start(ap, last)**: initialize ap after the last named parameter
- **va_arg(ap, type)**: retrieve the next argument as the given type
- **va_end(ap)**: cleanup the va_list
- **va_copy(dest, src)**: duplicate a va_list for multiple passes
- Variadic functions must have at least one named parameter
- The caller must communicate the number/types of arguments (count, format string, sentinel)
`,
  exercises: [
    {
      id: 'c-variadic-1',
      title: 'Initialize va_list',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fill in the correct macro to initialize the va_list.',
      skeleton: `#include <stdio.h>
#include <stdarg.h>

int sum(int count, ...) {
    va_list args;
    __BLANK__(args, count);
    int total = 0;
    for (int i = 0; i < count; i++) {
        total += va_arg(args, int);
    }
    va_end(args);
    return total;
}

int main(void) {
    printf("%d\\n", sum(3, 10, 20, 30));
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdarg.h>

int sum(int count, ...) {
    va_list args;
    va_start(args, count);
    int total = 0;
    for (int i = 0; i < count; i++) {
        total += va_arg(args, int);
    }
    va_end(args);
    return total;
}

int main(void) {
    printf("%d\\n", sum(3, 10, 20, 30));
    return 0;
}`,
      hints: [
        'va_start initializes the va_list for subsequent va_arg calls.',
        'The second argument to va_start is the last named parameter.',
        'Always pair va_start with va_end.',
      ],
      concepts: ['va_start', 'va_list', 'stdarg'],
    },
    {
      id: 'c-variadic-2',
      title: 'Fetch next argument',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fill in the macro call to retrieve the next double argument.',
      skeleton: `#include <stdio.h>
#include <stdarg.h>

double average(int count, ...) {
    va_list args;
    va_start(args, count);
    double total = 0.0;
    for (int i = 0; i < count; i++) {
        total += __BLANK__;
    }
    va_end(args);
    return total / count;
}

int main(void) {
    printf("%.1f\\n", average(3, 1.0, 2.0, 3.0));
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdarg.h>

double average(int count, ...) {
    va_list args;
    va_start(args, count);
    double total = 0.0;
    for (int i = 0; i < count; i++) {
        total += va_arg(args, double);
    }
    va_end(args);
    return total / count;
}

int main(void) {
    printf("%.1f\\n", average(3, 1.0, 2.0, 3.0));
    return 0;
}`,
      hints: [
        'va_arg(args, type) retrieves the next variadic argument.',
        'The type must match what the caller actually passed.',
        'For floating point variadic args, use double (float is promoted to double).',
      ],
      concepts: ['va_arg', 'type-promotion', 'stdarg'],
    },
    {
      id: 'c-variadic-3',
      title: 'Cleanup va_list',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Add the correct cleanup macro after processing variadic arguments.',
      skeleton: `#include <stdio.h>
#include <stdarg.h>

int max_val(int count, ...) {
    va_list args;
    va_start(args, count);
    int max = va_arg(args, int);
    for (int i = 1; i < count; i++) {
        int v = va_arg(args, int);
        if (v > max) max = v;
    }
    __BLANK__;
    return max;
}

int main(void) {
    printf("%d\\n", max_val(4, 3, 7, 2, 9));
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdarg.h>

int max_val(int count, ...) {
    va_list args;
    va_start(args, count);
    int max = va_arg(args, int);
    for (int i = 1; i < count; i++) {
        int v = va_arg(args, int);
        if (v > max) max = v;
    }
    va_end(args);
    return max;
}

int main(void) {
    printf("%d\\n", max_val(4, 3, 7, 2, 9));
    return 0;
}`,
      hints: [
        'va_end cleans up the va_list after use.',
        'Failing to call va_end is undefined behavior.',
        'Always call va_end before the function returns.',
      ],
      concepts: ['va_end', 'cleanup', 'stdarg'],
    },
    {
      id: 'c-variadic-4',
      title: 'Variadic function signature',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete the function signature for a variadic function that takes a format string followed by variable arguments.',
      skeleton: `#include <stdio.h>
#include <stdarg.h>

void my_log(const char *fmt __BLANK__) {
    va_list args;
    va_start(args, fmt);
    vprintf(fmt, args);
    va_end(args);
    printf("\\n");
}

int main(void) {
    my_log("User %s logged in at %d", "Alice", 1430);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdarg.h>

void my_log(const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    vprintf(fmt, args);
    va_end(args);
    printf("\\n");
}

int main(void) {
    my_log("User %s logged in at %d", "Alice", 1430);
    return 0;
}`,
      hints: [
        'Variadic functions use ... (ellipsis) after the last named parameter.',
        'There must be a comma before the ellipsis.',
        'At least one named parameter is required before ...',
      ],
      concepts: ['variadic-functions', 'ellipsis', 'function-signatures'],
    },
    {
      id: 'c-variadic-5',
      title: 'va_copy for two passes',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use va_copy to make two passes over the arguments: first to count positives, then to sum them.',
      skeleton: `#include <stdio.h>
#include <stdarg.h>

void analyze(int count, ...) {
    va_list args, args_copy;
    va_start(args, count);
    __BLANK__(args_copy, args);

    int positives = 0;
    for (int i = 0; i < count; i++) {
        if (va_arg(args, int) > 0) positives++;
    }
    va_end(args);

    int sum = 0;
    for (int i = 0; i < count; i++) {
        int v = va_arg(args_copy, int);
        if (v > 0) sum += v;
    }
    va_end(args_copy);

    printf("Positives: %d, Sum: %d\\n", positives, sum);
}

int main(void) {
    analyze(5, -1, 3, -2, 7, 1);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdarg.h>

void analyze(int count, ...) {
    va_list args, args_copy;
    va_start(args, count);
    va_copy(args_copy, args);

    int positives = 0;
    for (int i = 0; i < count; i++) {
        if (va_arg(args, int) > 0) positives++;
    }
    va_end(args);

    int sum = 0;
    for (int i = 0; i < count; i++) {
        int v = va_arg(args_copy, int);
        if (v > 0) sum += v;
    }
    va_end(args_copy);

    printf("Positives: %d, Sum: %d\\n", positives, sum);
}

int main(void) {
    analyze(5, -1, 3, -2, 7, 1);
    return 0;
}`,
      hints: [
        'va_copy(dest, src) duplicates a va_list for independent traversal.',
        'Each copy must have its own va_end call.',
        'You cannot reuse a va_list after va_end without va_copy.',
      ],
      concepts: ['va_copy', 'multiple-passes', 'stdarg'],
    },
    {
      id: 'c-variadic-6',
      title: 'Sentinel-terminated variadic',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fill in the sentinel check to stop reading string arguments when NULL is encountered.',
      skeleton: `#include <stdio.h>
#include <stdarg.h>

void print_strings(const char *first, ...) {
    va_list args;
    va_start(args, first);
    const char *s = first;
    while (__BLANK__) {
        printf("%s ", s);
        s = va_arg(args, const char *);
    }
    va_end(args);
    printf("\\n");
}

int main(void) {
    print_strings("hello", "world", "foo", NULL);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdarg.h>

void print_strings(const char *first, ...) {
    va_list args;
    va_start(args, first);
    const char *s = first;
    while (s != NULL) {
        printf("%s ", s);
        s = va_arg(args, const char *);
    }
    va_end(args);
    printf("\\n");
}

int main(void) {
    print_strings("hello", "world", "foo", NULL);
    return 0;
}`,
      hints: [
        'A sentinel value (usually NULL) marks the end of arguments.',
        'Check if the current string pointer is not NULL before processing.',
        'The caller must always pass the sentinel as the last argument.',
      ],
      concepts: ['sentinel-values', 'variadic-functions', 'null-termination'],
    },
    {
      id: 'c-variadic-7',
      title: 'Write a variadic min function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a function min_of(int count, ...) that returns the minimum of count integer arguments.',
      skeleton: `#include <stdio.h>
#include <stdarg.h>
#include <limits.h>

// Write min_of here

int main(void) {
    printf("%d\\n", min_of(4, 5, 2, 8, 1));  // 1
    printf("%d\\n", min_of(3, 10, 20, 30));   // 10
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdarg.h>
#include <limits.h>

int min_of(int count, ...) {
    va_list args;
    va_start(args, count);
    int min = INT_MAX;
    for (int i = 0; i < count; i++) {
        int v = va_arg(args, int);
        if (v < min) min = v;
    }
    va_end(args);
    return min;
}

int main(void) {
    printf("%d\\n", min_of(4, 5, 2, 8, 1));  // 1
    printf("%d\\n", min_of(3, 10, 20, 30));   // 10
    return 0;
}`,
      hints: [
        'Initialize min to INT_MAX so any argument will be smaller.',
        'Loop count times, fetching each int with va_arg.',
        'Always call va_end before returning.',
      ],
      concepts: ['variadic-functions', 'va_arg', 'minimum'],
    },
    {
      id: 'c-variadic-8',
      title: 'Write a variadic string concatenator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write concat_strings(char *buf, size_t bufsize, int count, ...) that concatenates count strings into buf with a space separator. Return buf.',
      skeleton: `#include <stdio.h>
#include <stdarg.h>
#include <string.h>

// Write concat_strings here

int main(void) {
    char buf[256];
    concat_strings(buf, sizeof(buf), 3, "hello", "beautiful", "world");
    printf("%s\\n", buf); // "hello beautiful world"
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdarg.h>
#include <string.h>

char *concat_strings(char *buf, size_t bufsize, int count, ...) {
    va_list args;
    va_start(args, count);
    buf[0] = '\\0';
    for (int i = 0; i < count; i++) {
        const char *s = va_arg(args, const char *);
        if (i > 0) {
            strncat(buf, " ", bufsize - strlen(buf) - 1);
        }
        strncat(buf, s, bufsize - strlen(buf) - 1);
    }
    va_end(args);
    return buf;
}

int main(void) {
    char buf[256];
    concat_strings(buf, sizeof(buf), 3, "hello", "beautiful", "world");
    printf("%s\\n", buf); // "hello beautiful world"
    return 0;
}`,
      hints: [
        'Initialize buf to empty string, then append each variadic string.',
        'Use strncat with remaining buffer space to prevent overflow.',
        'Add a space before each string except the first.',
      ],
      concepts: ['variadic-functions', 'string-concatenation', 'buffer-safety'],
    },
    {
      id: 'c-variadic-9',
      title: 'Write a printf-style logger',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function debug_log(const char *fmt, ...) that prints "[DEBUG] " followed by the formatted message using vprintf.',
      skeleton: `#include <stdio.h>
#include <stdarg.h>

// Write debug_log here

int main(void) {
    debug_log("Loaded %d items from %s", 42, "data.csv");
    debug_log("Processing complete");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdarg.h>

void debug_log(const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    printf("[DEBUG] ");
    vprintf(fmt, args);
    printf("\\n");
    va_end(args);
}

int main(void) {
    debug_log("Loaded %d items from %s", 42, "data.csv");
    debug_log("Processing complete");
    return 0;
}`,
      hints: [
        'Use vprintf to forward the va_list to printf-style formatting.',
        'Print the prefix before calling vprintf.',
        'vprintf, vfprintf, vsnprintf all accept a va_list.',
      ],
      concepts: ['variadic-functions', 'vprintf', 'logging'],
    },
    {
      id: 'c-variadic-10',
      title: 'Write a variadic array builder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write make_array(int *out, int count, ...) that fills the output array with count variadic int arguments.',
      skeleton: `#include <stdio.h>
#include <stdarg.h>

// Write make_array here

int main(void) {
    int arr[5];
    make_array(arr, 5, 10, 20, 30, 40, 50);
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n"); // 10 20 30 40 50
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdarg.h>

void make_array(int *out, int count, ...) {
    va_list args;
    va_start(args, count);
    for (int i = 0; i < count; i++) {
        out[i] = va_arg(args, int);
    }
    va_end(args);
}

int main(void) {
    int arr[5];
    make_array(arr, 5, 10, 20, 30, 40, 50);
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n"); // 10 20 30 40 50
    return 0;
}`,
      hints: [
        'Loop count times, storing each va_arg(args, int) into out[i].',
        'The caller is responsible for providing exactly count arguments.',
        'The output array must be large enough to hold count elements.',
      ],
      concepts: ['variadic-functions', 'arrays', 'va_arg'],
    },
    {
      id: 'c-variadic-11',
      title: 'Write a safe snprintf wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write safe_sprintf(char *buf, size_t size, const char *fmt, ...) that wraps vsnprintf. Return the number of characters written (not counting null).',
      skeleton: `#include <stdio.h>
#include <stdarg.h>

// Write safe_sprintf here

int main(void) {
    char buf[32];
    int n = safe_sprintf(buf, sizeof(buf), "Hello %s, you are %d", "Bob", 25);
    printf("%s (wrote %d chars)\\n", buf, n);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdarg.h>

int safe_sprintf(char *buf, size_t size, const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    int n = vsnprintf(buf, size, fmt, args);
    va_end(args);
    if (n < 0) return 0;
    return (size_t)n < size ? n : (int)(size - 1);
}

int main(void) {
    char buf[32];
    int n = safe_sprintf(buf, sizeof(buf), "Hello %s, you are %d", "Bob", 25);
    printf("%s (wrote %d chars)\\n", buf, n);
    return 0;
}`,
      hints: [
        'Use vsnprintf to format into a sized buffer safely.',
        'vsnprintf returns the number of chars that would have been written.',
        'If truncated, return size-1 as the actual chars written.',
      ],
      concepts: ['variadic-functions', 'vsnprintf', 'buffer-safety'],
    },
    {
      id: 'c-variadic-12',
      title: 'Write a typed variadic with format codes',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write print_values(const char *types, ...) where types is a string of format codes: i=int, d=double, s=string. Print each value on its own line.',
      skeleton: `#include <stdio.h>
#include <stdarg.h>

// Write print_values here

int main(void) {
    print_values("ids", 42, 3.14, "hello");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdarg.h>

void print_values(const char *types, ...) {
    va_list args;
    va_start(args, types);
    for (int i = 0; types[i] != '\\0'; i++) {
        switch (types[i]) {
            case 'i':
                printf("%d\\n", va_arg(args, int));
                break;
            case 'd':
                printf("%f\\n", va_arg(args, double));
                break;
            case 's':
                printf("%s\\n", va_arg(args, const char *));
                break;
            default:
                printf("unknown type: %c\\n", types[i]);
                break;
        }
    }
    va_end(args);
}

int main(void) {
    print_values("ids", 42, 3.14, "hello");
    return 0;
}`,
      hints: [
        'Iterate over the types string character by character.',
        'Use a switch to call va_arg with the correct type.',
        'This pattern is similar to how printf processes format specifiers.',
      ],
      concepts: ['variadic-functions', 'type-dispatch', 'format-strings'],
    },
    {
      id: 'c-variadic-13',
      title: 'Bug: missing va_end',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the variadic function that leaks resources by not cleaning up the va_list.',
      skeleton: `#include <stdio.h>
#include <stdarg.h>

int product(int count, ...) {
    va_list args;
    va_start(args, count);
    int result = 1;
    for (int i = 0; i < count; i++) {
        result *= va_arg(args, int);
    }
    // BUG: missing cleanup
    return result;
}

int main(void) {
    printf("%d\\n", product(3, 2, 3, 4)); // 24
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdarg.h>

int product(int count, ...) {
    va_list args;
    va_start(args, count);
    int result = 1;
    for (int i = 0; i < count; i++) {
        result *= va_arg(args, int);
    }
    va_end(args);
    return result;
}

int main(void) {
    printf("%d\\n", product(3, 2, 3, 4)); // 24
    return 0;
}`,
      hints: [
        'Every va_start must be paired with a va_end.',
        'Not calling va_end leads to undefined behavior.',
        'Add va_end(args) before the return statement.',
      ],
      concepts: ['va_end', 'resource-cleanup', 'undefined-behavior'],
    },
    {
      id: 'c-variadic-14',
      title: 'Bug: wrong type in va_arg',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the type mismatch where va_arg fetches an int but the caller passes doubles.',
      skeleton: `#include <stdio.h>
#include <stdarg.h>

double sum_doubles(int count, ...) {
    va_list args;
    va_start(args, count);
    double total = 0.0;
    for (int i = 0; i < count; i++) {
        total += va_arg(args, int);  // BUG: wrong type
    }
    va_end(args);
    return total;
}

int main(void) {
    printf("%.1f\\n", sum_doubles(3, 1.5, 2.5, 3.0)); // should be 7.0
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdarg.h>

double sum_doubles(int count, ...) {
    va_list args;
    va_start(args, count);
    double total = 0.0;
    for (int i = 0; i < count; i++) {
        total += va_arg(args, double);
    }
    va_end(args);
    return total;
}

int main(void) {
    printf("%.1f\\n", sum_doubles(3, 1.5, 2.5, 3.0)); // should be 7.0
    return 0;
}`,
      hints: [
        'va_arg type must match what the caller actually passed.',
        'The caller passes double literals, so va_arg must use double.',
        'Type mismatch in va_arg is undefined behavior.',
      ],
      concepts: ['va_arg', 'type-safety', 'undefined-behavior'],
    },
    {
      id: 'c-variadic-15',
      title: 'Bug: va_start with wrong parameter',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the va_start call that references the wrong named parameter.',
      skeleton: `#include <stdio.h>
#include <stdarg.h>

void log_msg(const char *level, const char *fmt, ...) {
    va_list args;
    va_start(args, level);  // BUG: should reference last named param
    printf("[%s] ", level);
    vprintf(fmt, args);
    printf("\\n");
    va_end(args);
}

int main(void) {
    log_msg("ERROR", "File %s not found (code %d)", "data.txt", 404);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdarg.h>

void log_msg(const char *level, const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    printf("[%s] ", level);
    vprintf(fmt, args);
    printf("\\n");
    va_end(args);
}

int main(void) {
    log_msg("ERROR", "File %s not found (code %d)", "data.txt", 404);
    return 0;
}`,
      hints: [
        'va_start must reference the last named parameter before ...',
        'Here, fmt is the last named parameter, not level.',
        'Using the wrong parameter causes va_arg to read garbage.',
      ],
      concepts: ['va_start', 'parameter-order', 'variadic-functions'],
    },
    {
      id: 'c-variadic-16',
      title: 'Predict: variadic sum output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output of this variadic sum function.',
      skeleton: `#include <stdio.h>
#include <stdarg.h>

int sum(int count, ...) {
    va_list args;
    va_start(args, count);
    int total = 0;
    for (int i = 0; i < count; i++) {
        total += va_arg(args, int);
    }
    va_end(args);
    return total;
}

int main(void) {
    printf("%d\\n", sum(0));
    printf("%d\\n", sum(1, 100));
    printf("%d\\n", sum(4, 1, 2, 3, 4));
    return 0;
}`,
      solution: `0
100
10`,
      hints: [
        'sum(0) loops zero times, so total stays 0.',
        'sum(1, 100) adds one argument: 100.',
        'sum(4, 1, 2, 3, 4) adds 1+2+3+4 = 10.',
      ],
      concepts: ['variadic-functions', 'va_arg', 'loop-count'],
    },
    {
      id: 'c-variadic-17',
      title: 'Predict: sentinel-terminated concatenation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output of this sentinel-terminated string printer.',
      skeleton: `#include <stdio.h>
#include <stdarg.h>

void print_all(const char *first, ...) {
    va_list args;
    va_start(args, first);
    const char *s = first;
    int count = 0;
    while (s != NULL) {
        count++;
        s = va_arg(args, const char *);
    }
    va_end(args);
    printf("%d\\n", count);
}

int main(void) {
    print_all("a", "b", "c", NULL);
    print_all("x", NULL);
    print_all(NULL);
    return 0;
}`,
      solution: `3
1
0`,
      hints: [
        'The function counts non-NULL strings before the sentinel.',
        'First call: "a", "b", "c" then NULL -- 3 strings.',
        'Third call: first is NULL, loop body never executes, count = 0.',
      ],
      concepts: ['sentinel-values', 'variadic-functions', 'null-termination'],
    },
    {
      id: 'c-variadic-18',
      title: 'Predict: va_copy independent traversal',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output when va_copy is used for two independent passes.',
      skeleton: `#include <stdio.h>
#include <stdarg.h>

void two_pass(int n, ...) {
    va_list a, b;
    va_start(a, n);
    va_copy(b, a);

    int sum = 0;
    for (int i = 0; i < n; i++)
        sum += va_arg(a, int);
    va_end(a);

    int prod = 1;
    for (int i = 0; i < n; i++)
        prod *= va_arg(b, int);
    va_end(b);

    printf("%d %d\\n", sum, prod);
}

int main(void) {
    two_pass(3, 2, 3, 4);
    return 0;
}`,
      solution: `9 24`,
      hints: [
        'va_copy creates an independent copy of the va_list.',
        'First pass sums: 2+3+4 = 9.',
        'Second pass (from copy) multiplies: 2*3*4 = 24.',
      ],
      concepts: ['va_copy', 'variadic-functions', 'multiple-passes'],
    },
    {
      id: 'c-variadic-19',
      title: 'Refactor: replace repeated args with variadic',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor the multiple fixed-argument print functions into a single variadic function print_ints(int count, ...) that prints count integers separated by commas.',
      skeleton: `#include <stdio.h>

void print_two(int a, int b) {
    printf("%d, %d\\n", a, b);
}

void print_three(int a, int b, int c) {
    printf("%d, %d, %d\\n", a, b, c);
}

void print_four(int a, int b, int c, int d) {
    printf("%d, %d, %d, %d\\n", a, b, c, d);
}

int main(void) {
    print_two(1, 2);
    print_three(3, 4, 5);
    print_four(6, 7, 8, 9);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdarg.h>

void print_ints(int count, ...) {
    va_list args;
    va_start(args, count);
    for (int i = 0; i < count; i++) {
        if (i > 0) printf(", ");
        printf("%d", va_arg(args, int));
    }
    printf("\\n");
    va_end(args);
}

int main(void) {
    print_ints(2, 1, 2);
    print_ints(3, 3, 4, 5);
    print_ints(4, 6, 7, 8, 9);
    return 0;
}`,
      hints: [
        'Replace all three functions with one variadic function.',
        'Use count to determine how many arguments to process.',
        'Print commas between values using an if check on the index.',
      ],
      concepts: ['variadic-functions', 'refactoring', 'code-deduplication'],
    },
    {
      id: 'c-variadic-20',
      title: 'Refactor: add error logging with variadic',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor the error logging code to use a single variadic function error_log(const char *file, int line, const char *fmt, ...) that formats the message with file and line info. Use a macro ERROR_LOG(...) to auto-fill __FILE__ and __LINE__.',
      skeleton: `#include <stdio.h>
#include <string.h>

void report_error1(void) {
    fprintf(stderr, "[main.c:10] Error: file not found\\n");
}

void report_error2(void) {
    fprintf(stderr, "[main.c:15] Error: invalid input: %d\\n", 42);
}

void report_error3(void) {
    fprintf(stderr, "[main.c:20] Error: connection failed to %s:%d\\n", "localhost", 8080);
}

int main(void) {
    report_error1();
    report_error2();
    report_error3();
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdarg.h>
#include <string.h>

void error_log(const char *file, int line, const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    fprintf(stderr, "[%s:%d] Error: ", file, line);
    vfprintf(stderr, fmt, args);
    fprintf(stderr, "\\n");
    va_end(args);
}

#define ERROR_LOG(fmt, ...) error_log(__FILE__, __LINE__, fmt, ##__VA_ARGS__)

int main(void) {
    ERROR_LOG("file not found");
    ERROR_LOG("invalid input: %d", 42);
    ERROR_LOG("connection failed to %s:%d", "localhost", 8080);
    return 0;
}`,
      hints: [
        'Use vfprintf to forward the va_list to formatted stderr output.',
        'The macro ERROR_LOG passes __FILE__ and __LINE__ automatically.',
        '## before __VA_ARGS__ handles the case with zero variadic arguments.',
      ],
      concepts: ['variadic-functions', 'macros', 'vfprintf', 'error-logging'],
    },
  ],
};
