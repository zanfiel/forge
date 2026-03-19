import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-sec',
  title: '49. Secure Coding',
  explanation: `## Secure Coding in C

C gives direct memory access with no safety net. This power demands disciplined coding practices to prevent vulnerabilities like buffer overflows, format string attacks, integer overflows, and use-after-free bugs.

\`\`\`c
// UNSAFE: unbounded copy
char buf[64];
strcpy(buf, user_input);  // overflow if input > 63 chars

// SAFE: bounded copy
char buf[64];
strncpy(buf, user_input, sizeof(buf) - 1);
buf[sizeof(buf) - 1] = '\\0';

// UNSAFE: format string vulnerability
printf(user_input);       // attacker controls format specifiers

// SAFE: always use format string
printf("%s", user_input);

// UNSAFE: integer overflow before allocation
size_t total = count * elem_size;  // can wrap to small value
char *p = malloc(total);

// SAFE: check for overflow
if (count && elem_size > SIZE_MAX / count) {
    // overflow detected
    return NULL;
}
char *p = malloc(count * elem_size);

// Defense: stack canaries and ASLR
// Compile with -fstack-protector-strong -pie -fPIE
\`\`\`

### Key Concepts
- **Buffer Overflow**: writing past array bounds, corrupting stack/heap
- **Format String Attack**: user-controlled format strings leak or corrupt memory
- **Integer Overflow**: arithmetic wrap-around leading to undersized allocations
- **Use-After-Free**: accessing freed memory; can be exploited for code execution
- **Input Validation**: sanitize and bound-check all external inputs
- **Principle of Least Privilege**: minimize permissions, drop privileges early
- **Defense in Depth**: stack canaries, ASLR, DEP/NX, bounds checking
`,
  exercises: [
    {
      id: 'c-sec-1',
      title: 'Safe string copy with bounds',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete a safe string copy that prevents buffer overflow.',
      skeleton: `#include <string.h>

void safe_copy(char *dest, size_t dest_size, const char *src) {
    if (dest_size == 0) return;
    __BLANK__(dest, src, dest_size - 1);
    dest[__BLANK__] = '\\0';
}`,
      solution: `#include <string.h>

void safe_copy(char *dest, size_t dest_size, const char *src) {
    if (dest_size == 0) return;
    strncpy(dest, src, dest_size - 1);
    dest[dest_size - 1] = '\\0';
}`,
      hints: [
        'strncpy copies at most n characters, preventing overflow.',
        'strncpy does not guarantee null-termination if src is longer.',
        'Explicitly null-terminate at the last position: dest_size - 1.'
      ],
      concepts: ['strncpy', 'null termination', 'buffer overflow prevention']
    },
    {
      id: 'c-sec-2',
      title: 'Safe printf format',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix a format string vulnerability by using a proper format specifier.',
      skeleton: `#include <stdio.h>

void print_user_message(const char *msg) {
    // UNSAFE: printf(msg);
    // SAFE:
    printf(__BLANK__, msg);
}

void log_with_name(const char *name, int code) {
    // UNSAFE: printf(name);
    // SAFE:
    printf("User: %s, code: __BLANK__\\n", name, code);
}`,
      solution: `#include <stdio.h>

void print_user_message(const char *msg) {
    // UNSAFE: printf(msg);
    // SAFE:
    printf("%s", msg);
}

void log_with_name(const char *name, int code) {
    // UNSAFE: printf(name);
    // SAFE:
    printf("User: %s, code: %d\\n", name, code);
}`,
      hints: [
        'Never pass user input directly as the format string argument.',
        'Use "%s" as the format string to safely print a string.',
        'Use %d for integers in the format string.'
      ],
      concepts: ['format string', 'printf safety', '%s specifier', 'vulnerability prevention']
    },
    {
      id: 'c-sec-3',
      title: 'Integer overflow check before malloc',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Add an integer overflow check before multiplying count by size for allocation.',
      skeleton: `#include <stdlib.h>
#include <stdint.h>

void *safe_alloc(size_t count, size_t elem_size) {
    if (count != 0 && elem_size > __BLANK__ / count) {
        return __BLANK__;
    }
    return __BLANK__(count * elem_size);
}`,
      solution: `#include <stdlib.h>
#include <stdint.h>

void *safe_alloc(size_t count, size_t elem_size) {
    if (count != 0 && elem_size > SIZE_MAX / count) {
        return NULL;
    }
    return malloc(count * elem_size);
}`,
      hints: [
        'SIZE_MAX is the maximum value for size_t; overflow wraps past it.',
        'If elem_size > SIZE_MAX / count, the multiplication would overflow.',
        'Return NULL on overflow to signal allocation failure.'
      ],
      concepts: ['integer overflow', 'SIZE_MAX', 'safe allocation', 'multiplication check']
    },
    {
      id: 'c-sec-4',
      title: 'Bounds-checked array access',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete a bounds-checked array access function.',
      skeleton: `#include <stdbool.h>
#include <stddef.h>

bool safe_get(int *arr, size_t len, size_t index, int *out) {
    if (__BLANK__) {
        return false;
    }
    *out = arr[__BLANK__];
    return __BLANK__;
}`,
      solution: `#include <stdbool.h>
#include <stddef.h>

bool safe_get(int *arr, size_t len, size_t index, int *out) {
    if (index >= len) {
        return false;
    }
    *out = arr[index];
    return true;
}`,
      hints: [
        'Check if index is within bounds: index >= len means out of bounds.',
        'If valid, write the value to *out and return true.',
        'Using size_t avoids negative index issues.'
      ],
      concepts: ['bounds checking', 'array access', 'out-of-bounds prevention']
    },
    {
      id: 'c-sec-5',
      title: 'Secure memory zeroing',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Zero out sensitive data before freeing, preventing the compiler from optimizing it away.',
      skeleton: `#include <stdlib.h>
#include <string.h>

// volatile pointer prevents compiler from optimizing away the memset
typedef void *(*memset_fn)(void *, int, size_t);
static volatile memset_fn secure_memset = __BLANK__;

void secure_free(void *ptr, size_t size) {
    if (ptr) {
        __BLANK__(ptr, 0, size);
        __BLANK__(ptr);
    }
}`,
      solution: `#include <stdlib.h>
#include <string.h>

typedef void *(*memset_fn)(void *, int, size_t);
static volatile memset_fn secure_memset = memset;

void secure_free(void *ptr, size_t size) {
    if (ptr) {
        secure_memset(ptr, 0, size);
        free(ptr);
    }
}`,
      hints: [
        'A volatile function pointer to memset prevents dead-store elimination.',
        'Call the volatile memset to zero out the buffer.',
        'Then free the pointer after the data has been cleared.'
      ],
      concepts: ['secure zeroing', 'volatile', 'dead store elimination', 'sensitive data']
    },
    {
      id: 'c-sec-6',
      title: 'Safe strtol input parsing',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Safely parse a string to a long integer with full error checking.',
      skeleton: `#include <stdlib.h>
#include <errno.h>
#include <limits.h>
#include <stdbool.h>

bool safe_strtol(const char *str, long *out) {
    char *endptr;
    __BLANK__ = 0;
    long val = strtol(str, &endptr, 10);

    if (endptr == __BLANK__) return false;   // no digits
    if (*endptr != '\\0') return false;       // trailing chars
    if (errno == __BLANK__) return false;     // overflow/underflow

    *out = val;
    return true;
}`,
      solution: `#include <stdlib.h>
#include <errno.h>
#include <limits.h>
#include <stdbool.h>

bool safe_strtol(const char *str, long *out) {
    char *endptr;
    errno = 0;
    long val = strtol(str, &endptr, 10);

    if (endptr == str) return false;
    if (*endptr != '\\0') return false;
    if (errno == ERANGE) return false;

    *out = val;
    return true;
}`,
      hints: [
        'Set errno to 0 before calling strtol.',
        'If endptr == str, no digits were parsed.',
        'ERANGE indicates the value exceeded LONG_MIN or LONG_MAX.'
      ],
      concepts: ['strtol', 'input validation', 'errno', 'ERANGE', 'safe parsing']
    },
    {
      id: 'c-sec-7',
      title: 'Implement safe string concatenation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a safe string concatenation function that respects buffer limits and always null-terminates.',
      skeleton: `#include <string.h>
#include <stddef.h>

// Safely concatenate src onto dest without overflowing dest_size.
// Returns the total length that would have been needed (like snprintf).
size_t safe_strcat(char *dest, size_t dest_size, const char *src) {
    // TODO: implement
}`,
      solution: `#include <string.h>
#include <stddef.h>

size_t safe_strcat(char *dest, size_t dest_size, const char *src) {
    size_t dest_len = strlen(dest);
    size_t src_len = strlen(src);
    size_t total = dest_len + src_len;

    if (dest_len < dest_size - 1) {
        size_t space = dest_size - dest_len - 1;
        size_t copy = src_len < space ? src_len : space;
        memcpy(dest + dest_len, src, copy);
        dest[dest_len + copy] = '\\0';
    }

    return total;
}`,
      hints: [
        'Calculate remaining space: dest_size - strlen(dest) - 1.',
        'Copy at most that many bytes from src.',
        'Always null-terminate and return the total would-be length.'
      ],
      concepts: ['safe concatenation', 'buffer overflow', 'strlcat pattern', 'bounds checking']
    },
    {
      id: 'c-sec-8',
      title: 'Implement input sanitizer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that sanitizes a string by removing all non-alphanumeric characters.',
      skeleton: `#include <ctype.h>
#include <string.h>

// Remove all characters that are not alphanumeric or space.
// Modify the string in-place. Return new length.
size_t sanitize_input(char *str) {
    // TODO: implement
}`,
      solution: `#include <ctype.h>
#include <string.h>

size_t sanitize_input(char *str) {
    size_t read = 0, write = 0;
    while (str[read]) {
        unsigned char c = (unsigned char)str[read];
        if (isalnum(c) || c == ' ') {
            str[write++] = str[read];
        }
        read++;
    }
    str[write] = '\\0';
    return write;
}`,
      hints: [
        'Use two indices: read scans every character, write stores only valid ones.',
        'isalnum checks for alphanumeric characters. Cast to unsigned char first.',
        'Null-terminate at the write position when done.'
      ],
      concepts: ['input sanitization', 'character filtering', 'isalnum', 'in-place modification']
    },
    {
      id: 'c-sec-9',
      title: 'Implement use-after-free prevention',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a safe free wrapper that nullifies the pointer after freeing to prevent use-after-free.',
      skeleton: `#include <stdlib.h>
#include <string.h>

// Safe free: zero memory, free it, and set the pointer to NULL.
// Takes a pointer-to-pointer so we can nullify the caller's variable.
void safe_free(void **ptr, size_t size) {
    // TODO: implement
}

// Usage: safe_free((void **)&my_ptr, sizeof(*my_ptr));`,
      solution: `#include <stdlib.h>
#include <string.h>

void safe_free(void **ptr, size_t size) {
    if (ptr && *ptr) {
        memset(*ptr, 0, size);
        free(*ptr);
        *ptr = NULL;
    }
}`,
      hints: [
        'Check both ptr and *ptr for NULL before operating.',
        'Zero the memory with memset to clear sensitive data.',
        'Set *ptr = NULL so the caller cannot dereference the freed memory.'
      ],
      concepts: ['use-after-free', 'dangling pointer', 'NULL assignment', 'secure deallocation']
    },
    {
      id: 'c-sec-10',
      title: 'Implement constant-time comparison',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a constant-time memory comparison function to prevent timing side-channel attacks.',
      skeleton: `#include <stddef.h>

// Compare two byte arrays of length n in constant time.
// Returns 0 if equal, nonzero otherwise.
// Must NOT short-circuit on first difference.
int constant_time_cmp(const unsigned char *a,
                      const unsigned char *b, size_t n) {
    // TODO: implement
}`,
      solution: `#include <stddef.h>

int constant_time_cmp(const unsigned char *a,
                      const unsigned char *b, size_t n) {
    unsigned char diff = 0;
    for (size_t i = 0; i < n; i++) {
        diff |= a[i] ^ b[i];
    }
    return (int)diff;
}`,
      hints: [
        'XOR each pair of bytes: equal bytes produce 0, different bytes produce nonzero.',
        'OR all XOR results into an accumulator so every byte is always checked.',
        'Return the accumulator; 0 means all bytes matched.'
      ],
      concepts: ['constant-time comparison', 'timing attack', 'XOR', 'side-channel prevention']
    },
    {
      id: 'c-sec-11',
      title: 'Implement privilege drop',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a function that drops root privileges to a specified user ID and group ID.',
      skeleton: `#include <unistd.h>
#include <stdbool.h>

// Drop from root to the specified uid/gid.
// Return true on success, false on failure.
// Must set group first, then user (cannot setgid after dropping root).
bool drop_privileges(uid_t uid, gid_t gid) {
    // TODO: implement
}`,
      solution: `#include <unistd.h>
#include <stdbool.h>

bool drop_privileges(uid_t uid, gid_t gid) {
    if (getuid() != 0) return false;

    if (setgid(gid) != 0) return false;
    if (setuid(uid) != 0) return false;

    // Verify we cannot regain root
    if (setuid(0) == 0) return false;

    return true;
}`,
      hints: [
        'Set the group ID first with setgid, because setuid to non-root prevents future setgid.',
        'After dropping, verify by trying to setuid(0); it should fail.',
        'Return false if any step fails.'
      ],
      concepts: ['privilege drop', 'setuid', 'setgid', 'least privilege']
    },
    {
      id: 'c-sec-12',
      title: 'Implement safe temporary file creation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a function that creates a temporary file securely, avoiding race conditions.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <string.h>

// Create a secure temporary file. Return the file descriptor.
// Store the generated path in path_buf (must be at least path_size bytes).
// Return -1 on failure.
int secure_tmpfile(char *path_buf, size_t path_size) {
    // TODO: implement using mkstemp (not tmpnam or mktemp)
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <string.h>

int secure_tmpfile(char *path_buf, size_t path_size) {
    const char *template_str = "/tmp/secure_XXXXXX";
    if (strlen(template_str) >= path_size) return -1;

    strncpy(path_buf, template_str, path_size - 1);
    path_buf[path_size - 1] = '\\0';

    int fd = mkstemp(path_buf);
    if (fd < 0) return -1;

    // Restrict permissions to owner only
    fchmod(fd, 0600);
    return fd;
}`,
      hints: [
        'mkstemp atomically creates and opens a unique file, preventing race conditions.',
        'The template must end with XXXXXX which mkstemp replaces with random characters.',
        'Set restrictive permissions (0600) immediately after creation.'
      ],
      concepts: ['mkstemp', 'temporary file', 'race condition', 'TOCTOU', 'file permissions']
    },
    {
      id: 'c-sec-13',
      title: 'Fix buffer overflow in gets usage',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the classic buffer overflow caused by using gets() with a fixed-size buffer.',
      skeleton: `#include <stdio.h>
#include <string.h>

// BUG: gets() has no length limit, causing buffer overflow
void read_username(void) {
    char username[32];
    printf("Enter username: ");
    gets(username);  // NEVER use gets()!
    printf("Hello, %s\\n", username);
}`,
      solution: `#include <stdio.h>
#include <string.h>

void read_username(void) {
    char username[32];
    printf("Enter username: ");
    if (fgets(username, sizeof(username), stdin) != NULL) {
        // Remove trailing newline if present
        size_t len = strlen(username);
        if (len > 0 && username[len - 1] == '\\n') {
            username[len - 1] = '\\0';
        }
    }
    printf("Hello, %s\\n", username);
}`,
      hints: [
        'Replace gets() with fgets(), which takes a maximum length parameter.',
        'fgets reads at most size-1 characters and null-terminates.',
        'fgets includes the trailing newline; strip it if needed.'
      ],
      concepts: ['gets vulnerability', 'fgets', 'buffer overflow', 'input safety']
    },
    {
      id: 'c-sec-14',
      title: 'Fix format string vulnerability',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the format string vulnerability that allows an attacker to read stack memory.',
      skeleton: `#include <stdio.h>
#include <syslog.h>

// BUG: user_msg is passed directly as format string
void log_message(const char *user_msg) {
    printf(user_msg);           // Bug: format string attack
    fprintf(stderr, user_msg);  // Bug: same issue
    syslog(LOG_INFO, user_msg); // Bug: same issue
}`,
      solution: `#include <stdio.h>
#include <syslog.h>

void log_message(const char *user_msg) {
    printf("%s", user_msg);
    fprintf(stderr, "%s", user_msg);
    syslog(LOG_INFO, "%s", user_msg);
}`,
      hints: [
        'Never pass user-controlled strings as the format argument.',
        'An attacker can use %x, %n, and %s specifiers to read or write memory.',
        'Always use a literal format string like "%s" with the user data as an argument.'
      ],
      concepts: ['format string attack', 'printf', 'syslog', 'user input as format']
    },
    {
      id: 'c-sec-15',
      title: 'Fix double-free vulnerability',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the double-free bug that corrupts the heap allocator.',
      skeleton: `#include <stdlib.h>

typedef struct {
    char *name;
    int *scores;
    int count;
} Student;

// BUG: double-free on error path, and missing NULL assignment
Student *create_student(const char *name, int count) {
    Student *s = malloc(sizeof(Student));
    if (!s) return NULL;

    s->name = malloc(strlen(name) + 1);
    if (!s->name) {
        free(s);
        return NULL;
    }
    strcpy(s->name, name);

    s->scores = malloc(sizeof(int) * count);
    if (!s->scores) {
        free(s->name);
        free(s);
        free(s);  // BUG: double free!
        return NULL;
    }
    s->count = count;
    return s;
}

void free_student(Student *s) {
    if (!s) return;
    free(s->name);
    free(s->scores);
    free(s);
    // BUG: caller still has dangling pointer
}`,
      solution: `#include <stdlib.h>
#include <string.h>

typedef struct {
    char *name;
    int *scores;
    int count;
} Student;

Student *create_student(const char *name, int count) {
    Student *s = malloc(sizeof(Student));
    if (!s) return NULL;

    s->name = malloc(strlen(name) + 1);
    if (!s->name) {
        free(s);
        return NULL;
    }
    strcpy(s->name, name);

    s->scores = malloc(sizeof(int) * count);
    if (!s->scores) {
        free(s->name);
        free(s);
        return NULL;
    }
    s->count = count;
    return s;
}

void free_student(Student **sp) {
    if (!sp || !*sp) return;
    Student *s = *sp;
    free(s->name);
    s->name = NULL;
    free(s->scores);
    s->scores = NULL;
    free(s);
    *sp = NULL;
}`,
      hints: [
        'Remove the duplicate free(s) call in the error path.',
        'Change free_student to take Student** so it can NULL the caller pointer.',
        'Set each freed member to NULL before freeing the struct itself.'
      ],
      concepts: ['double-free', 'dangling pointer', 'error handling', 'heap corruption']
    },
    {
      id: 'c-sec-16',
      title: 'Predict stack buffer overflow behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict what happens when a buffer is overflowed with strcpy.',
      skeleton: `#include <stdio.h>
#include <string.h>

int main(void) {
    int guard = 0xDEADBEEF;
    char buf[8];

    strcpy(buf, "Hello!");  // fits: 6 chars + null = 7 bytes

    printf("buf: %s\\n", buf);
    printf("guard: 0x%X\\n", guard);

    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    int guard = 0xDEADBEEF;
    char buf[8];

    strcpy(buf, "Hello!");

    printf("buf: %s\\n", buf);
    printf("guard: 0x%X\\n", guard);

    return 0;
}

// Output:
// buf: Hello!
// guard: 0xDEADBEEF`,
      hints: [
        '"Hello!" is 6 characters plus a null terminator = 7 bytes.',
        'buf is 8 bytes, so the string fits without overflow.',
        'guard remains unchanged because no overflow occurred.'
      ],
      concepts: ['buffer overflow', 'stack layout', 'strcpy', 'null terminator']
    },
    {
      id: 'c-sec-17',
      title: 'Predict format string leak',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict how many values a format string attack would print from the stack.',
      skeleton: `#include <stdio.h>

void vulnerable(void) {
    int secret1 = 42;
    int secret2 = 99;
    char input[] = "%d %d %d";  // simulated attacker input

    // This prints values from the stack
    printf(input);
    printf("\\n");
}

int main(void) {
    // Note: actual output is platform-dependent.
    // The key insight is that printf reads stack values
    // when no arguments are provided for %d specifiers.
    printf("Format string reads stack values\\n");
    printf("Each %%d pops an int-sized value from the stack\\n");
    printf("Attacker sees: [3 integer values from stack]\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

void vulnerable(void) {
    int secret1 = 42;
    int secret2 = 99;
    char input[] = "%d %d %d";

    printf(input);
    printf("\\n");
}

int main(void) {
    printf("Format string reads stack values\\n");
    printf("Each %%d pops an int-sized value from the stack\\n");
    printf("Attacker sees: [3 integer values from stack]\\n");
    return 0;
}

// Output:
// Format string reads stack values
// Each %d pops an int-sized value from the stack
// Attacker sees: [3 integer values from stack]`,
      hints: [
        'printf with "%d %d %d" and no extra arguments reads 3 int-sized stack values.',
        'The actual values depend on stack layout, compiler, and optimization.',
        'This is why user-controlled format strings are dangerous: they leak memory contents.'
      ],
      concepts: ['format string', 'stack leak', 'printf vulnerability', 'specifier mismatch']
    },
    {
      id: 'c-sec-18',
      title: 'Predict integer overflow wrap',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the result of unsigned integer overflow in a size calculation.',
      skeleton: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint8_t a = 200;
    uint8_t b = 100;
    uint8_t sum = a + b;  // wraps around

    printf("a=%u b=%u sum=%u\\n", a, b, sum);

    uint16_t count = 65535;
    uint16_t next = count + 1;  // wraps to 0

    printf("count=%u next=%u\\n", count, next);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint8_t a = 200;
    uint8_t b = 100;
    uint8_t sum = a + b;

    printf("a=%u b=%u sum=%u\\n", a, b, sum);

    uint16_t count = 65535;
    uint16_t next = count + 1;

    printf("count=%u next=%u\\n", count, next);
    return 0;
}

// Output:
// a=200 b=100 sum=44
// count=65535 next=0`,
      hints: [
        'uint8_t max is 255. 200 + 100 = 300. 300 - 256 = 44.',
        'uint16_t max is 65535. 65535 + 1 = 0 (wraps around).',
        'Unsigned overflow is well-defined in C: it wraps modulo 2^N.'
      ],
      concepts: ['unsigned overflow', 'wrap-around', 'uint8_t', 'uint16_t']
    },
    {
      id: 'c-sec-19',
      title: 'Refactor sprintf to snprintf',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor unsafe sprintf calls to use snprintf with proper bounds checking.',
      skeleton: `#include <stdio.h>
#include <string.h>

// Refactor: sprintf has no bounds checking, risking buffer overflow.
// Convert to snprintf with proper size limits and return value checking.
void build_path(const char *dir, const char *file, char *result) {
    sprintf(result, "%s/%s", dir, file);
}

void build_log_entry(int code, const char *msg, char *buf) {
    sprintf(buf, "[%04d] %s", code, msg);
}`,
      solution: `#include <stdio.h>
#include <string.h>

int build_path(const char *dir, const char *file,
               char *result, size_t result_size) {
    int written = snprintf(result, result_size, "%s/%s", dir, file);
    if (written < 0 || (size_t)written >= result_size) {
        if (result_size > 0) result[0] = '\\0';
        return -1;  // truncated or error
    }
    return written;
}

int build_log_entry(int code, const char *msg,
                    char *buf, size_t buf_size) {
    int written = snprintf(buf, buf_size, "[%04d] %s", code, msg);
    if (written < 0 || (size_t)written >= buf_size) {
        if (buf_size > 0) buf[0] = '\\0';
        return -1;
    }
    return written;
}`,
      hints: [
        'Add a size parameter to each function for the destination buffer size.',
        'snprintf returns the number of characters that would have been written.',
        'If the return value >= buf_size, the output was truncated.'
      ],
      concepts: ['sprintf to snprintf', 'bounds checking', 'truncation detection', 'buffer safety']
    },
    {
      id: 'c-sec-20',
      title: 'Refactor raw pointer cleanup to RAII pattern',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor scattered malloc/free pairs into a struct with constructor/destructor functions for reliable cleanup.',
      skeleton: `#include <stdlib.h>
#include <string.h>
#include <stdio.h>

// Refactor: multiple allocations with error-prone manual cleanup.
// Create init/cleanup functions that handle all allocation/deallocation.
int process_data(const char *name, int count) {
    char *buf = malloc(256);
    int *data = malloc(sizeof(int) * count);
    char *log = malloc(512);

    if (!buf || !data || !log) {
        // Bug-prone: must remember to free everything
        free(buf);
        free(data);
        free(log);
        return -1;
    }

    strncpy(buf, name, 255);
    buf[255] = '\\0';
    for (int i = 0; i < count; i++) data[i] = i;
    snprintf(log, 512, "Processed %s", name);

    // Easy to forget one of these
    free(buf);
    free(data);
    free(log);
    return 0;
}`,
      solution: `#include <stdlib.h>
#include <string.h>
#include <stdio.h>

typedef struct {
    char *buf;
    int *data;
    char *log;
    int count;
} Context;

Context *context_init(const char *name, int count) {
    Context *ctx = calloc(1, sizeof(Context));
    if (!ctx) return NULL;

    ctx->buf = malloc(256);
    ctx->data = malloc(sizeof(int) * count);
    ctx->log = malloc(512);
    ctx->count = count;

    if (!ctx->buf || !ctx->data || !ctx->log) {
        free(ctx->buf);
        free(ctx->data);
        free(ctx->log);
        free(ctx);
        return NULL;
    }

    strncpy(ctx->buf, name, 255);
    ctx->buf[255] = '\\0';
    return ctx;
}

void context_cleanup(Context **ctxp) {
    if (!ctxp || !*ctxp) return;
    Context *ctx = *ctxp;
    free(ctx->buf);
    free(ctx->data);
    free(ctx->log);
    free(ctx);
    *ctxp = NULL;
}

int process_data(const char *name, int count) {
    Context *ctx = context_init(name, count);
    if (!ctx) return -1;

    for (int i = 0; i < ctx->count; i++) ctx->data[i] = i;
    snprintf(ctx->log, 512, "Processed %s", name);

    context_cleanup(&ctx);
    return 0;
}`,
      hints: [
        'Group related allocations into a struct.',
        'calloc initializes all pointers to NULL, making cleanup safe.',
        'The cleanup function uses a double pointer to NULL the caller variable.'
      ],
      concepts: ['RAII pattern in C', 'constructor/destructor', 'resource management', 'cleanup safety']
    }
  ]
};
