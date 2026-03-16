import type { Track } from '../../stores/app.svelte.ts';

export const track: Track = {
  id: 'c',
  name: 'C',
  language: 'c',
  monacoLang: 'c',
  icon: '⚙️',
  description: 'The foundation of modern computing. Operating systems, embedded devices, and raw performance.',
  sections: [
    {
      id: 'c-variables',
      title: '1. Variables & Types',
      explanation: `## Variables & Types

C is statically typed. You must declare the type before using a variable:

\`\`\`c
int count = 0;
float temperature = 98.6f;
double pi = 3.14159265358979;
char grade = 'A';          // single character
char name[] = "rocky";     // string (array of chars)
\`\`\`

**Integer types by size:**
| Type | Bytes | Range |
|------|-------|-------|
| \`char\` | 1 | -128 to 127 |
| \`short\` | 2 | -32768 to 32767 |
| \`int\` | 4 | about +/- 2 billion |
| \`long\` | 8 | very large |

Add \`unsigned\` for non-negative only (doubles the positive range).

**printf format specifiers:**
\`\`\`c
printf("%d", 42);       // int
printf("%f", 3.14);     // float/double
printf("%.2f", 3.14);   // 2 decimal places
printf("%s", "hello");  // string
printf("%c", 'A');      // char
printf("%x", 255);      // hex: ff
\`\`\``,
      exercises: [
        {
          id: 'c-var-1',
          title: 'Declare and Print Variables',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'c',
          goal: 'Declare variables of different types and print them with the correct format specifiers.',
          skeleton: `#include <stdio.h>

int main() {
    // Declare an integer for CPU cores
    __BLANK__ cores = 8;

    // Declare a float for CPU temperature
    __BLANK__ temp = 72.5f;

    // Declare a char array (string) for the hostname
    __BLANK__ hostname[] = "rocky";

    // Declare an unsigned int for RAM in megabytes
    __BLANK__ __BLANK__ ram_mb = 32768;

    printf("Host: %__BLANK__\\n", hostname);
    printf("Cores: %__BLANK__\\n", cores);
    printf("Temp: %.1__BLANK__ F\\n", temp);
    printf("RAM: %__BLANK__ MB\\n", ram_mb);

    return 0;
}`,
          solution: `#include <stdio.h>

int main() {
    int cores = 8;
    float temp = 72.5f;
    char hostname[] = "rocky";
    unsigned int ram_mb = 32768;

    printf("Host: %s\\n", hostname);
    printf("Cores: %d\\n", cores);
    printf("Temp: %.1f F\\n", temp);
    printf("RAM: %u MB\\n", ram_mb);

    return 0;
}`,
          hints: [
            'Whole numbers use `int`, decimals use `float`, text uses `char[]`.',
            'Format specifiers: `%s` for strings, `%d` for int, `%f` for float, `%u` for unsigned.',
            'Fill in: `int`, `float`, `char`, `unsigned`, `int`, `s`, `d`, `f`, `u`.',
          ],
          concepts: ['int', 'float', 'char', 'unsigned', 'printf', 'format specifiers'],
        },
        {
          id: 'c-var-2',
          title: 'Constants and Type Casting',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'c',
          goal: 'Use constants and type casting to calculate disk usage percentage.',
          skeleton: `#include <stdio.h>

// Define a constant for total disk size
#__BLANK__ TOTAL_DISK_GB 500

int main() {
    int used_gb = 127;

    // Calculate percentage as a float (watch out for integer division!)
    float percent = (__BLANK__)used_gb / TOTAL_DISK_GB * 100.0f;

    printf("Disk: %d / %d GB (%.1f%%)\\n", used_gb, TOTAL_DISK_GB, percent);

    // sizeof tells you how many bytes a type uses
    printf("int is %__BLANK__ bytes\\n", __BLANK__(int));
    printf("float is %zu bytes\\n", sizeof(float));

    return 0;
}`,
          solution: `#include <stdio.h>

#define TOTAL_DISK_GB 500

int main() {
    int used_gb = 127;

    float percent = (float)used_gb / TOTAL_DISK_GB * 100.0f;

    printf("Disk: %d / %d GB (%.1f%%)\\n", used_gb, TOTAL_DISK_GB, percent);

    printf("int is %zu bytes\\n", sizeof(int));
    printf("float is %zu bytes\\n", sizeof(float));

    return 0;
}`,
          hints: [
            '`#define` creates a compile-time constant. No `=` or `;` needed.',
            'Casting `(float)used_gb` converts the int to float before division. Without it, 127/500 would be 0.',
            'Fill in: `define`, `float`, `zu`, `sizeof`.',
          ],
          concepts: ['#define', 'type casting', 'sizeof', 'integer division', '%zu'],
        },
        {
          id: 'c-var-3',
          title: 'User Input',
          type: 'write-function',
          difficulty: 'beginner',
          language: 'c',
          goal: 'Write a complete program that asks the user for a server name (max 63 chars) and a port number, then prints "Connecting to <name>:<port>..." using printf. Use scanf for input and a char array for the name.',
          skeleton: `#include <stdio.h>

int main() {
    // Write your code here

    return 0;
}`,
          solution: `#include <stdio.h>

int main() {
    char name[64];
    int port;

    printf("Server name: ");
    scanf("%63s", name);

    printf("Port: ");
    scanf("%d", &port);

    printf("Connecting to %s:%d...\\n", name, port);

    return 0;
}`,
          hints: [
            'Declare `char name[64]` for the string buffer and `int port` for the number.',
            '`scanf("%63s", name)` reads a string (63 chars max + null). `scanf("%d", &port)` reads an int. Note the `&` before port!',
            'Strings (char arrays) do not need `&` in scanf, but all other types do.',
          ],
          concepts: ['scanf', 'char array', 'buffer size', '& operator', 'printf'],
        },
      ],
    },
    {
      id: 'c-functions',
      title: '2. Functions & Pointers',
      explanation: `## Functions & Pointers

Functions in C must declare return type and parameter types:

\`\`\`c
int add(int a, int b) {
    return a + b;
}

void greet(const char *name) {   // void = returns nothing
    printf("Hello, %s!\\n", name);
}
\`\`\`

**Pointers** store memory addresses. This is how C lets functions modify outside variables:

\`\`\`c
int x = 10;
int *ptr = &x;    // ptr holds the ADDRESS of x

printf("%d\\n", *ptr);  // 10  (dereference: get value at address)
*ptr = 20;             // changes x through the pointer
printf("%d\\n", x);     // 20
\`\`\`

**Why pointers matter:** C passes everything by value (copies). To modify something from a function, you pass its address:
\`\`\`c
void doubleIt(int *n) {
    *n = *n * 2;
}

int val = 5;
doubleIt(&val);    // pass address
printf("%d", val); // 10
\`\`\``,
      exercises: [
        {
          id: 'c-fn-1',
          title: 'Functions and Prototypes',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'c',
          goal: 'Complete the function that clamps a value between a min and max.',
          skeleton: `#include <stdio.h>

// Function prototype (declaration before main)
__BLANK__ clamp(__BLANK__ value, int min, int max);

int main() {
    printf("%d\\n", clamp(5, 0, 10));    // 5
    printf("%d\\n", clamp(-3, 0, 10));   // 0
    printf("%d\\n", clamp(15, 0, 10));   // 10
    return 0;
}

// Function definition
int clamp(int value, int min, int max) {
    if (value __BLANK__ min) return min;
    if (value __BLANK__ max) return max;
    __BLANK__ value;
}`,
          solution: `#include <stdio.h>

int clamp(int value, int min, int max);

int main() {
    printf("%d\\n", clamp(5, 0, 10));
    printf("%d\\n", clamp(-3, 0, 10));
    printf("%d\\n", clamp(15, 0, 10));
    return 0;
}

int clamp(int value, int min, int max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}`,
          hints: [
            'The prototype matches the function signature: return type, name, parameters.',
            'Compare with `<` and `>`. Return the boundary if out of range, otherwise the value itself.',
            'Fill in: `int`, `int`, `<`, `>`, `return`.',
          ],
          concepts: ['function prototype', 'function definition', 'return', 'if statement'],
        },
        {
          id: 'c-fn-2',
          title: 'Pointers in Action',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'c',
          goal: 'Complete the swap function that uses pointers to exchange two values.',
          skeleton: `#include <stdio.h>

// swap uses pointers to modify the caller's variables
void swap(__BLANK__ *a, __BLANK__ *b) {
    int temp = __BLANK__a;
    __BLANK__a = __BLANK__b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    printf("Before: x=%d, y=%d\\n", x, y);

    swap(__BLANK__x, __BLANK__y);
    printf("After:  x=%d, y=%d\\n", x, y);  // x=20, y=10

    return 0;
}`,
          solution: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    printf("Before: x=%d, y=%d\\n", x, y);

    swap(&x, &y);
    printf("After:  x=%d, y=%d\\n", x, y);

    return 0;
}`,
          hints: [
            'Parameters are `int *a, int *b` meaning "pointers to integers".',
            '`*a` dereferences (reads/writes the value). `&x` takes the address.',
            'Fill in: `int`, `int`, `*`, `*`, `*`, `&`, `&`.',
          ],
          concepts: ['pointers', 'dereference', 'address-of', 'pass by reference', 'swap'],
        },
        {
          id: 'c-fn-3',
          title: 'Write a Stats Function',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'c',
          goal: 'Write a function `array_stats` that takes an int array and its length, and fills in three output parameters via pointers: the min value, max value, and sum. The function returns void.',
          skeleton: `#include <stdio.h>

// Write array_stats here


int main() {
    int data[] = {42, 17, 93, 8, 65, 31};
    int len = 6;
    int min, max, sum;

    array_stats(data, len, &min, &max, &sum);

    printf("Min: %d\\n", min);   // 8
    printf("Max: %d\\n", max);   // 93
    printf("Sum: %d\\n", sum);   // 256

    return 0;
}`,
          solution: `#include <stdio.h>

void array_stats(int arr[], int len, int *min, int *max, int *sum) {
    *min = arr[0];
    *max = arr[0];
    *sum = 0;
    for (int i = 0; i < len; i++) {
        if (arr[i] < *min) *min = arr[i];
        if (arr[i] > *max) *max = arr[i];
        *sum += arr[i];
    }
}

int main() {
    int data[] = {42, 17, 93, 8, 65, 31};
    int len = 6;
    int min, max, sum;

    array_stats(data, len, &min, &max, &sum);

    printf("Min: %d\\n", min);
    printf("Max: %d\\n", max);
    printf("Sum: %d\\n", sum);

    return 0;
}`,
          hints: [
            'Signature: `void array_stats(int arr[], int len, int *min, int *max, int *sum)`.',
            'Initialize `*min` and `*max` to `arr[0]`, `*sum` to 0. Loop and update through the pointers.',
            'Use `*min = arr[i]` to write through the pointer. `*sum += arr[i]` to accumulate.',
          ],
          concepts: ['output parameters', 'pointers', 'arrays as parameters', 'for loop', 'void'],
        },
      ],
    },
    {
      id: 'c-arrays',
      title: '3. Arrays & Strings',
      explanation: `## Arrays & Strings

Arrays in C have a fixed size and no bounds checking. Strings are just char arrays ending with \`\\0\` (null terminator):

\`\`\`c
int scores[5] = {90, 85, 92, 78, 88};
scores[0] = 95;     // modify first element
int len = sizeof(scores) / sizeof(scores[0]);  // 5

char name[] = "rocky";    // compiler adds \\0, size is 6
char host[64] = "";       // 64-byte buffer, initially empty
\`\`\`

**String functions** (from \`<string.h>\`):
\`\`\`c
strlen(s)           // length (not counting \\0)
strcpy(dst, src)    // copy src into dst
strcat(dst, src)    // append src to dst
strcmp(a, b)        // compare: 0 if equal
strncpy(dst, src, n) // safe copy with max length
\`\`\`

**WARNING:** C does not check array bounds. Writing past the end of an array is a buffer overflow, one of the most common security vulnerabilities in software history.`,
      exercises: [
        {
          id: 'c-arr-1',
          title: 'Array Operations',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'c',
          goal: 'Complete the code that reverses an array in place.',
          skeleton: `#include <stdio.h>

void reverse(int arr[], int len) {
    for (int i = 0; i < __BLANK__; i++) {
        int temp = arr[i];
        arr[i] = arr[len - 1 __BLANK__ i];
        arr[__BLANK__] = temp;
    }
}

void print_array(int arr[], int len) {
    for (int i = 0; i < len; i++) {
        printf("%d ", arr[__BLANK__]);
    }
    printf("\\n");
}

int main() {
    int data[] = {10, 20, 30, 40, 50};
    int len = __BLANK__(data) / sizeof(data[0]);

    printf("Before: ");
    print_array(data, len);

    reverse(data, len);

    printf("After:  ");
    print_array(data, len);  // 50 40 30 20 10

    return 0;
}`,
          solution: `#include <stdio.h>

void reverse(int arr[], int len) {
    for (int i = 0; i < len / 2; i++) {
        int temp = arr[i];
        arr[i] = arr[len - 1 - i];
        arr[len - 1 - i] = temp;
    }
}

void print_array(int arr[], int len) {
    for (int i = 0; i < len; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main() {
    int data[] = {10, 20, 30, 40, 50};
    int len = sizeof(data) / sizeof(data[0]);

    printf("Before: ");
    print_array(data, len);

    reverse(data, len);

    printf("After:  ");
    print_array(data, len);

    return 0;
}`,
          hints: [
            'To reverse, swap from both ends toward the middle. You only loop `len / 2` times.',
            'The mirror index of `i` from the end is `len - 1 - i`.',
            'Fill in: `len / 2`, `-`, `len - 1 - i`, `i`, `sizeof`.',
          ],
          concepts: ['array reversal', 'sizeof', 'in-place swap', 'for loop', 'array indexing'],
        },
        {
          id: 'c-arr-2',
          title: 'String Building',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'c',
          goal: 'Write a function `build_url` that takes a host (string), port (int), and path (string), and writes a formatted URL like "http://host:port/path" into a provided output buffer. Use snprintf for safe formatting.',
          skeleton: `#include <stdio.h>
#include <string.h>

// Write build_url here


int main() {
    char url[256];

    build_url("localhost", 8080, "api/health", url, sizeof(url));
    printf("%s\\n", url);  // http://localhost:8080/api/health

    build_url("192.168.8.133", 4200, "search", url, sizeof(url));
    printf("%s\\n", url);  // http://192.168.8.133:4200/search

    return 0;
}`,
          solution: `#include <stdio.h>
#include <string.h>

void build_url(const char *host, int port, const char *path, char *out, int out_size) {
    snprintf(out, out_size, "http://%s:%d/%s", host, port, path);
}

int main() {
    char url[256];

    build_url("localhost", 8080, "api/health", url, sizeof(url));
    printf("%s\\n", url);

    build_url("192.168.8.133", 4200, "search", url, sizeof(url));
    printf("%s\\n", url);

    return 0;
}`,
          hints: [
            '`snprintf(buffer, size, format, ...)` is like printf but writes to a buffer with a size limit.',
            'Use `const char *` for string parameters you only read. The output buffer is `char *out`.',
            'The format string: `"http://%s:%d/%s"` with host, port, and path as arguments.',
          ],
          concepts: ['snprintf', 'const char*', 'buffer', 'string formatting', 'safe string ops'],
        },
      ],
    },
    {
      id: 'c-structs',
      title: '4. Structs & Memory',
      explanation: `## Structs & Dynamic Memory

**Structs** group related data (like objects without methods):

\`\`\`c
typedef struct {
    char name[64];
    char ip[16];
    int port;
    int online;    // C has no bool, use int (0/1)
} Server;

Server srv = {"rocky", "192.168.8.133", 22, 1};
printf("%s:%d\\n", srv.name, srv.port);
\`\`\`

**Dynamic memory** with \`malloc\` and \`free\`:
\`\`\`c
#include <stdlib.h>

// Allocate one Server on the heap
Server *srv = malloc(sizeof(Server));
if (srv == NULL) {
    printf("Out of memory!\\n");
    return 1;
}

strcpy(srv->name, "rocky");    // -> instead of . for pointers
srv->port = 22;

free(srv);    // ALWAYS free what you malloc
srv = NULL;   // good practice: avoid dangling pointer
\`\`\`

**Rules of memory:**
1. Every \`malloc\` needs exactly one \`free\`
2. Never use memory after freeing it
3. Never free the same memory twice
4. Always check if \`malloc\` returned NULL`,
      exercises: [
        {
          id: 'c-struct-1',
          title: 'Define and Use Structs',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'c',
          goal: 'Complete the process monitoring code using structs.',
          skeleton: `#include <stdio.h>
#include <string.h>

__BLANK__ struct {
    int pid;
    char name[128];
    float cpu_percent;
    int memory_mb;
} Process;

void print_process(Process __BLANK__p) {
    printf("[PID %d] %s - CPU: %.1f%%, MEM: %dMB\\n",
        p__BLANK__pid, p__BLANK__name, p__BLANK__cpu_percent, p__BLANK__memory_mb);
}

int main() {
    Process procs[3];

    procs[0] = (Process){1, "systemd", 0.1, 12};
    procs[1] = (Process){482, "nginx", 2.3, 45};
    procs[2] = (Process){1337, "engram", 15.7, 280};

    for (int i = 0; i < 3; i++) {
        print_process(__BLANK__procs[i]);
    }

    return 0;
}`,
          solution: `#include <stdio.h>
#include <string.h>

typedef struct {
    int pid;
    char name[128];
    float cpu_percent;
    int memory_mb;
} Process;

void print_process(Process *p) {
    printf("[PID %d] %s - CPU: %.1f%%, MEM: %dMB\\n",
        p->pid, p->name, p->cpu_percent, p->memory_mb);
}

int main() {
    Process procs[3];

    procs[0] = (Process){1, "systemd", 0.1, 12};
    procs[1] = (Process){482, "nginx", 2.3, 45};
    procs[2] = (Process){1337, "engram", 15.7, 280};

    for (int i = 0; i < 3; i++) {
        print_process(&procs[i]);
    }

    return 0;
}`,
          hints: [
            '`typedef` lets you use `Process` instead of `struct Process`. Pointer parameters use `*`.',
            'Access struct fields through a pointer with `->` instead of `.`.',
            'Fill in: `typedef`, `*`, `->`, `->`, `->`, `->`, `&`.',
          ],
          concepts: ['typedef', 'struct', 'pointer to struct', '->', '&', 'array of structs'],
        },
        {
          id: 'c-struct-2',
          title: 'Dynamic Array with Malloc',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'c',
          goal: 'Write a function `create_servers` that takes a count, allocates an array of Server structs on the heap, initializes each with a name like "server-0", "server-1", etc. (port 8080 + index, online = 1). Return the pointer. Write a `free_servers` function to clean up. Always check if malloc succeeds.',
          skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[64];
    int port;
    int online;
} Server;

// Write create_servers and free_servers here


int main() {
    int count = 4;
    Server *servers = create_servers(count);
    if (servers == NULL) {
        printf("Allocation failed\\n");
        return 1;
    }

    for (int i = 0; i < count; i++) {
        printf("%s (port %d)\\n", servers[i].name, servers[i].port);
    }

    free_servers(servers);
    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[64];
    int port;
    int online;
} Server;

Server *create_servers(int count) {
    Server *servers = malloc(count * sizeof(Server));
    if (servers == NULL) {
        return NULL;
    }
    for (int i = 0; i < count; i++) {
        snprintf(servers[i].name, sizeof(servers[i].name), "server-%d", i);
        servers[i].port = 8080 + i;
        servers[i].online = 1;
    }
    return servers;
}

void free_servers(Server *servers) {
    free(servers);
}

int main() {
    int count = 4;
    Server *servers = create_servers(count);
    if (servers == NULL) {
        printf("Allocation failed\\n");
        return 1;
    }

    for (int i = 0; i < count; i++) {
        printf("%s (port %d)\\n", servers[i].name, servers[i].port);
    }

    free_servers(servers);
    return 0;
}`,
          hints: [
            '`malloc(count * sizeof(Server))` allocates room for `count` Server structs. Always check for NULL.',
            'Use `snprintf(servers[i].name, 64, "server-%d", i)` to build the name. Access with `servers[i].field` (array indexing auto-dereferences).',
            'The free function just calls `free(servers)`. One malloc, one free.',
          ],
          concepts: ['malloc', 'free', 'sizeof', 'NULL check', 'heap allocation', 'snprintf'],
        },
        {
          id: 'c-struct-3',
          title: 'Find the Memory Bug',
          type: 'fix-bug',
          difficulty: 'advanced',
          language: 'c',
          goal: 'This code has 3 memory bugs: a missing NULL check, a use-after-free, and a missing free. Find and fix all three.',
          skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *label;
    int value;
} Entry;

Entry *create_entry(const char *label, int value) {
    Entry *e = malloc(sizeof(Entry));
    e->label = malloc(strlen(label) + 1);
    strcpy(e->label, label);
    e->value = value;
    return e;
}

void print_entry(Entry *e) {
    printf("%s = %d\\n", e->label, e->value);
}

int main() {
    Entry *a = create_entry("cpu_temp", 72);
    Entry *b = create_entry("fan_rpm", 1200);

    print_entry(a);
    print_entry(b);

    free(a);
    printf("Entry a label was: %s\\n", a->label);

    free(b->label);

    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *label;
    int value;
} Entry;

Entry *create_entry(const char *label, int value) {
    Entry *e = malloc(sizeof(Entry));
    if (e == NULL) return NULL;
    e->label = malloc(strlen(label) + 1);
    if (e->label == NULL) {
        free(e);
        return NULL;
    }
    strcpy(e->label, label);
    e->value = value;
    return e;
}

void print_entry(Entry *e) {
    printf("%s = %d\\n", e->label, e->value);
}

int main() {
    Entry *a = create_entry("cpu_temp", 72);
    Entry *b = create_entry("fan_rpm", 1200);
    if (a == NULL || b == NULL) {
        printf("Allocation failed\\n");
        return 1;
    }

    print_entry(a);
    print_entry(b);

    printf("Entry a label was: %s\\n", a->label);
    free(a->label);
    free(a);

    free(b->label);
    free(b);

    return 0;
}`,
          hints: [
            'Bug 1: `create_entry` never checks if malloc returned NULL. Add checks after both mallocs.',
            'Bug 2: `a->label` is accessed after `free(a)`. Print before freeing! Also free `a->label` before `a`.',
            'Bug 3: `b` itself is never freed, only `b->label`. Free both, inner allocation first.',
          ],
          concepts: ['use-after-free', 'memory leak', 'NULL check', 'free order', 'defensive programming'],
        },
      ],
    },
    {
      id: 'c-fileio',
      title: '5. File I/O',
      explanation: `## File I/O

C uses \`FILE *\` handles for file operations:

\`\`\`c
#include <stdio.h>

// Writing
FILE *f = fopen("output.txt", "w");   // "w" = write, "a" = append
if (f == NULL) {
    perror("Failed to open file");     // prints system error message
    return 1;
}
fprintf(f, "Hello, %s!\\n", "world");
fclose(f);

// Reading
FILE *f = fopen("input.txt", "r");
char line[256];
while (fgets(line, sizeof(line), f) != NULL) {
    printf("%s", line);    // fgets keeps the newline
}
fclose(f);
\`\`\`

**Modes:** \`"r"\` read, \`"w"\` write (creates/truncates), \`"a"\` append, \`"rb"\`/\`"wb"\` binary

**Key functions:**
- \`fopen\` / \`fclose\` for opening and closing
- \`fprintf\` / \`fscanf\` for formatted I/O
- \`fgets\` / \`fputs\` for line-based I/O
- \`fread\` / \`fwrite\` for binary I/O
- \`perror\` for printing error messages`,
      exercises: [
        {
          id: 'c-file-1',
          title: 'Read a Config File',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'c',
          goal: 'Complete the code that reads key=value pairs from a config file.',
          skeleton: `#include <stdio.h>
#include <string.h>

#define MAX_LINE 256
#define MAX_ENTRIES 32

typedef struct {
    char key[64];
    char value[128];
} ConfigEntry;

int load_config(const char *path, ConfigEntry entries[], int max) {
    FILE *f = __BLANK__(path, "r");
    if (f == __BLANK__) {
        __BLANK__("Failed to open config");
        return -1;
    }

    char line[MAX_LINE];
    int count = 0;

    while (count < max && __BLANK__(line, sizeof(line), f) != NULL) {
        // Skip empty lines and comments
        if (line[0] == '\\n' || line[0] == '#') continue;

        // Remove trailing newline
        line[strcspn(line, "\\n")] = '\\0';

        // Split on '='
        char *eq = strchr(line, '=');
        if (eq == NULL) continue;

        *eq = '\\0';  // split the string at '='
        strncpy(entries[count].key, line, 63);
        strncpy(entries[count].value, eq + 1, 127);
        count++;
    }

    __BLANK__(f);
    return count;
}

int main() {
    ConfigEntry config[MAX_ENTRIES];
    int n = load_config("app.conf", config, MAX_ENTRIES);

    if (n < 0) return 1;

    for (int i = 0; i < n; i++) {
        printf("%s = %s\\n", config[i].key, config[i].value);
    }
    return 0;
}`,
          solution: `#include <stdio.h>
#include <string.h>

#define MAX_LINE 256
#define MAX_ENTRIES 32

typedef struct {
    char key[64];
    char value[128];
} ConfigEntry;

int load_config(const char *path, ConfigEntry entries[], int max) {
    FILE *f = fopen(path, "r");
    if (f == NULL) {
        perror("Failed to open config");
        return -1;
    }

    char line[MAX_LINE];
    int count = 0;

    while (count < max && fgets(line, sizeof(line), f) != NULL) {
        if (line[0] == '\\n' || line[0] == '#') continue;

        line[strcspn(line, "\\n")] = '\\0';

        char *eq = strchr(line, '=');
        if (eq == NULL) continue;

        *eq = '\\0';
        strncpy(entries[count].key, line, 63);
        strncpy(entries[count].value, eq + 1, 127);
        count++;
    }

    fclose(f);
    return count;
}

int main() {
    ConfigEntry config[MAX_ENTRIES];
    int n = load_config("app.conf", config, MAX_ENTRIES);

    if (n < 0) return 1;

    for (int i = 0; i < n; i++) {
        printf("%s = %s\\n", config[i].key, config[i].value);
    }
    return 0;
}`,
          hints: [
            '`fopen` opens files. Check for `NULL` to detect failure. `perror` prints the system error.',
            '`fgets(buffer, size, file)` reads one line. `fclose(f)` closes the file handle.',
            'Fill in: `fopen`, `NULL`, `perror`, `fgets`, `fclose`.',
          ],
          concepts: ['fopen', 'fclose', 'fgets', 'perror', 'NULL check', 'string parsing', 'strchr'],
        },
        {
          id: 'c-file-2',
          title: 'Write a Log File',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'c',
          goal: 'Write a function `log_message` that appends a timestamped line to a log file. It takes a filename, a level string ("INFO", "WARN", "ERROR"), and a message. Each line should look like "[LEVEL] message" followed by a newline. Open in append mode, write, close. Return 0 on success, -1 on failure.',
          skeleton: `#include <stdio.h>

// Write log_message here


int main() {
    log_message("app.log", "INFO", "server started on port 8080");
    log_message("app.log", "WARN", "disk usage above 80%");
    log_message("app.log", "ERROR", "connection to database lost");

    // Read back and print the log
    FILE *f = fopen("app.log", "r");
    if (f) {
        char line[512];
        while (fgets(line, sizeof(line), f)) {
            printf("%s", line);
        }
        fclose(f);
    }

    return 0;
}`,
          solution: `#include <stdio.h>

int log_message(const char *filename, const char *level, const char *message) {
    FILE *f = fopen(filename, "a");
    if (f == NULL) {
        perror("Failed to open log file");
        return -1;
    }
    fprintf(f, "[%s] %s\\n", level, message);
    fclose(f);
    return 0;
}

int main() {
    log_message("app.log", "INFO", "server started on port 8080");
    log_message("app.log", "WARN", "disk usage above 80%");
    log_message("app.log", "ERROR", "connection to database lost");

    FILE *f = fopen("app.log", "r");
    if (f) {
        char line[512];
        while (fgets(line, sizeof(line), f)) {
            printf("%s", line);
        }
        fclose(f);
    }

    return 0;
}`,
          hints: [
            'Open with `fopen(filename, "a")` for append mode. Always check for NULL.',
            'Use `fprintf(f, "[%s] %s\\n", level, message)` to write the formatted line.',
            'Return -1 if fopen fails, 0 after successful write and fclose.',
          ],
          concepts: ['fopen append', 'fprintf', 'fclose', 'error handling', 'const char*'],
        },
      ],
    },
  ],
};
