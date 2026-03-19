import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-headers',
  title: '18. Header Files',
  explanation: `## Header Files in C

Header files (\`.h\`) contain declarations shared between translation units.

\`\`\`c
// math_utils.h
#ifndef MATH_UTILS_H
#define MATH_UTILS_H

double circle_area(double radius);
#define PI 3.14159265

#endif
\`\`\`

### Key Concepts
- Headers contain **declarations**, source files contain **definitions**
- Include guards prevent multiple inclusion
- \`#include <...>\` for system headers, \`#include "..."\` for project headers
- Forward declarations reduce header dependencies
- Never put variable definitions or function bodies in headers (except inline/static)
`,
  exercises: [
    {
      id: 'c-headers-1',
      title: 'Include guard pattern',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a proper include guard for a header file.',
      skeleton: `// utils.h
__BLANK__ UTILS_H
__BLANK__ UTILS_H

int max(int a, int b);
int min(int a, int b);
void swap(int *a, int *b);

__BLANK__`,
      solution: `// utils.h
#ifndef UTILS_H
#define UTILS_H

int max(int a, int b);
int min(int a, int b);
void swap(int *a, int *b);

#endif`,
      hints: [
        '#ifndef checks if the guard macro is not yet defined.',
        '#define defines it immediately to prevent re-entry.',
        '#endif closes the guard at the end of the file.',
      ],
      concepts: ['include guard', '#ifndef pattern', 'header protection'],
    },
    {
      id: 'c-headers-2',
      title: 'Declaration vs definition',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Separate declarations (header) from definitions (source).',
      skeleton: `// --- point.h ---
#ifndef POINT_H
#define POINT_H

typedef struct { double x, y; } Point;

// Declaration only:
Point point_add(Point a, Point b);
double point_distance(Point a, Point b);

#endif

// --- point.c ---
#include __BLANK__
#include <math.h>

// Definition:
Point point_add(Point a, Point b) {
    return (Point){a.x + b.x, a.y + b.y};
}

double point_distance(Point a, Point b) {
    double dx = a.x - b.x;
    double dy = a.y - b.y;
    return __BLANK__(dx * dx + dy * dy);
}`,
      solution: `// --- point.h ---
#ifndef POINT_H
#define POINT_H

typedef struct { double x, y; } Point;

// Declaration only:
Point point_add(Point a, Point b);
double point_distance(Point a, Point b);

#endif

// --- point.c ---
#include "point.h"
#include <math.h>

// Definition:
Point point_add(Point a, Point b) {
    return (Point){a.x + b.x, a.y + b.y};
}

double point_distance(Point a, Point b) {
    double dx = a.x - b.x;
    double dy = a.y - b.y;
    return sqrt(dx * dx + dy * dy);
}`,
      hints: [
        'Use "point.h" for local headers, <math.h> for system headers.',
        'The .c file includes its own .h to get the types.',
        'sqrt from math.h computes square root.',
      ],
      concepts: ['declaration vs definition', 'header inclusion', 'source organization'],
    },
    {
      id: 'c-headers-3',
      title: 'Predict multiple inclusion',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Understand what happens with and without include guards.',
      skeleton: `#include <stdio.h>

// Simulating what happens without include guards:
// First "inclusion"
struct Point { int x, y; };
// Second "inclusion" would cause:
// struct Point { int x, y; };  // Error: redefinition!

// With include guards, the second inclusion is skipped.

int main(void) {
    struct Point p = {10, 20};
    printf("(%d, %d)\\n", p.x, p.y);
    printf("Size: %zu\\n", sizeof(struct Point));
    return 0;
}`,
      solution: `(10, 20)
Size: 8`,
      hints: [
        'Without guards, including a header twice causes redefinition errors.',
        'Include guards skip the content on subsequent inclusions.',
        'sizeof(struct Point) = 2 ints = 8 bytes.',
      ],
      concepts: ['multiple inclusion', 'redefinition error', 'guard purpose'],
    },
    {
      id: 'c-headers-4',
      title: 'Forward declarations',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use forward declarations to reduce header dependencies.',
      skeleton: `// Show how forward declarations reduce coupling:
// engine.h only needs a pointer to Renderer, not its full definition.
// Write engine.h with a forward declaration and engine.c with the include.`,
      solution: `// renderer.h
#ifndef RENDERER_H
#define RENDERER_H

typedef struct {
    int width;
    int height;
    char name[32];
} Renderer;

Renderer *renderer_create(int w, int h);
void renderer_draw(Renderer *r, int x, int y);
void renderer_destroy(Renderer *r);

#endif

// engine.h
#ifndef ENGINE_H
#define ENGINE_H

// Forward declaration - no need to include renderer.h
struct Renderer;
typedef struct Renderer Renderer;

typedef struct {
    Renderer *renderer;
    int running;
} Engine;

Engine *engine_create(Renderer *r);
void engine_run(Engine *e);

#endif

// engine.c (needs full definition)
#include <stdio.h>
#include <stdlib.h>
#include "engine.h"
#include "renderer.h"  // Full definition needed here

Engine *engine_create(Renderer *r) {
    Engine *e = malloc(sizeof(Engine));
    e->renderer = r;
    e->running = 1;
    return e;
}

void engine_run(Engine *e) {
    printf("Running with %dx%d renderer\\n",
           e->renderer->width, e->renderer->height);
}`,
      hints: [
        'A forward declaration allows using pointers without the full definition.',
        'The .h file only needs the forward declaration.',
        'The .c file includes the full header to access members.',
      ],
      concepts: ['forward declaration', 'header dependency reduction', 'compilation speed'],
    },
    {
      id: 'c-headers-5',
      title: 'Fix header variable definition',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the multiple definition error from defining a variable in a header.',
      skeleton: `// config.h
#ifndef CONFIG_H
#define CONFIG_H

// Bug: defining a variable in a header causes multiple definition
// when included from multiple .c files
int max_connections = 100;
char *app_name = "MyApp";

void init_config(void);

#endif`,
      solution: `// config.h
#ifndef CONFIG_H
#define CONFIG_H

extern int max_connections;
extern char *app_name;

void init_config(void);

#endif

// config.c
#include "config.h"

int max_connections = 100;
char *app_name = "MyApp";

void init_config(void) {
    // initialization logic
}`,
      hints: [
        'Variables in headers must be declared extern, not defined.',
        'The definition (with initialization) goes in exactly one .c file.',
        'extern tells the compiler the variable exists elsewhere.',
      ],
      concepts: ['extern declaration', 'one definition rule', 'header variables'],
    },
    {
      id: 'c-headers-6',
      title: 'Fill-blank extern declaration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use extern to share variables across translation units.',
      skeleton: `// globals.h
#ifndef GLOBALS_H
#define GLOBALS_H

__BLANK__ int verbose_level;
__BLANK__ const char *program_name;

#endif

// globals.c
#include "globals.h"

int verbose_level = 0;
const char *program_name = "app";

// main.c
#include <stdio.h>
#include "globals.h"

int main(void) {
    program_name = "my_program";
    verbose_level = 2;
    printf("%s (verbosity: %d)\\n", program_name, verbose_level);
    return 0;
}`,
      solution: `// globals.h
#ifndef GLOBALS_H
#define GLOBALS_H

extern int verbose_level;
extern const char *program_name;

#endif

// globals.c
#include "globals.h"

int verbose_level = 0;
const char *program_name = "app";

// main.c
#include <stdio.h>
#include "globals.h"

int main(void) {
    program_name = "my_program";
    verbose_level = 2;
    printf("%s (verbosity: %d)\\n", program_name, verbose_level);
    return 0;
}`,
      hints: [
        'extern declares without allocating storage.',
        'The actual definition is in globals.c.',
        'Any .c file that includes the header can use these variables.',
      ],
      concepts: ['extern', 'shared globals', 'translation units'],
    },
    {
      id: 'c-headers-7',
      title: 'Static inline in header',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Put small utility functions in headers using static inline.',
      skeleton: `// Write a header with static inline utility functions:
// static inline int imax(int a, int b)
// static inline int imin(int a, int b)
// static inline int iclamp(int val, int lo, int hi)`,
      solution: `// imath.h
#ifndef IMATH_H
#define IMATH_H

static inline int imax(int a, int b) {
    return a > b ? a : b;
}

static inline int imin(int a, int b) {
    return a < b ? a : b;
}

static inline int iclamp(int val, int lo, int hi) {
    if (val < lo) return lo;
    if (val > hi) return hi;
    return val;
}

#endif

// main.c
#include <stdio.h>
#include "imath.h"

int main(void) {
    printf("max(3,7) = %d\\n", imax(3, 7));
    printf("min(3,7) = %d\\n", imin(3, 7));
    printf("clamp(15, 0, 10) = %d\\n", iclamp(15, 0, 10));
    printf("clamp(-5, 0, 10) = %d\\n", iclamp(-5, 0, 10));
    return 0;
}`,
      hints: [
        'static inline avoids multiple definition errors.',
        'Each translation unit gets its own copy.',
        'Best for small, frequently called functions.',
      ],
      concepts: ['static inline', 'header functions', 'one definition rule'],
    },
    {
      id: 'c-headers-8',
      title: 'Predict include order effects',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Understand how include order affects macro definitions.',
      skeleton: `#include <stdio.h>

// config_debug.h contents:
#define LOG_LEVEL 3

// config_prod.h contents:
// #undef LOG_LEVEL
// #define LOG_LEVEL 1

// If we include debug then prod:
#define LOG_LEVEL 3
#undef LOG_LEVEL
#define LOG_LEVEL 1

int main(void) {
    printf("%d\\n", LOG_LEVEL);
    return 0;
}`,
      solution: `1`,
      hints: [
        'Preprocessor processes top to bottom.',
        'The last #define wins after #undef.',
        'Include order matters for macro redefinitions.',
      ],
      concepts: ['include order', 'macro override', 'configuration headers'],
    },
    {
      id: 'c-headers-9',
      title: 'Fix circular include',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Fix circular header dependencies.',
      skeleton: `// Bug: a.h includes b.h, b.h includes a.h

// a.h
#ifndef A_H
#define A_H
#include "b.h"
typedef struct { B *b_ref; int val; } A;
A *create_a(void);
#endif

// b.h
#ifndef B_H
#define B_H
#include "a.h"  // Circular!
typedef struct { A *a_ref; int val; } B;
B *create_b(void);
#endif`,
      solution: `// a.h
#ifndef A_H
#define A_H

struct B;  // Forward declaration instead of #include "b.h"

typedef struct { struct B *b_ref; int val; } A;
A *create_a(void);
#endif

// b.h
#ifndef B_H
#define B_H

struct A;  // Forward declaration instead of #include "a.h"

typedef struct { struct A *a_ref; int val; } B;
B *create_b(void);
#endif

// a.c
#include "a.h"
#include "b.h"
#include <stdlib.h>

A *create_a(void) {
    A *a = malloc(sizeof(A));
    a->b_ref = NULL;
    a->val = 1;
    return a;
}

// b.c
#include "b.h"
#include "a.h"
#include <stdlib.h>

B *create_b(void) {
    B *b = malloc(sizeof(B));
    b->a_ref = NULL;
    b->val = 2;
    return b;
}`,
      hints: [
        'Circular includes cause infinite recursion (caught by guards, but types missing).',
        'Forward-declare the struct instead of including the header.',
        'Include the full header in the .c file where member access is needed.',
      ],
      concepts: ['circular dependency', 'forward declaration', 'dependency breaking'],
    },
    {
      id: 'c-headers-10',
      title: 'Opaque type pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Implement the opaque type pattern with header and source.',
      skeleton: `// Write a header that exposes only a pointer type (opaque):
// stack.h: declares Stack type and operations
// stack.c: defines the actual struct privately
// The user cannot access struct internals.`,
      solution: `// stack.h
#ifndef STACK_H
#define STACK_H

typedef struct Stack Stack;  // Opaque: internals hidden

Stack *stack_create(int capacity);
void stack_push(Stack *s, int value);
int stack_pop(Stack *s);
int stack_peek(Stack *s);
int stack_empty(Stack *s);
void stack_destroy(Stack *s);

#endif

// stack.c
#include "stack.h"
#include <stdio.h>
#include <stdlib.h>

struct Stack {
    int *data;
    int top;
    int capacity;
};

Stack *stack_create(int capacity) {
    Stack *s = malloc(sizeof(Stack));
    s->data = malloc(capacity * sizeof(int));
    s->top = -1;
    s->capacity = capacity;
    return s;
}

void stack_push(Stack *s, int value) {
    if (s->top < s->capacity - 1) s->data[++s->top] = value;
}

int stack_pop(Stack *s) {
    if (s->top >= 0) return s->data[s->top--];
    return -1;
}

int stack_peek(Stack *s) {
    if (s->top >= 0) return s->data[s->top];
    return -1;
}

int stack_empty(Stack *s) { return s->top < 0; }

void stack_destroy(Stack *s) {
    free(s->data);
    free(s);
}`,
      hints: [
        'Only declare typedef struct Stack Stack in the header.',
        'The full struct definition is only in the .c file.',
        'Users can only interact through the API functions.',
      ],
      concepts: ['opaque type', 'information hiding', 'encapsulation'],
    },
    {
      id: 'c-headers-11',
      title: 'Fill-blank pragma once',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use #pragma once as an alternative to include guards.',
      skeleton: `// Modern alternative to include guards:
__BLANK__

typedef struct {
    float x, y, z;
} Vec3;

Vec3 vec3_add(Vec3 a, Vec3 b);
Vec3 vec3_scale(Vec3 v, float s);
float vec3_dot(Vec3 a, Vec3 b);`,
      solution: `// Modern alternative to include guards:
#pragma once

typedef struct {
    float x, y, z;
} Vec3;

Vec3 vec3_add(Vec3 a, Vec3 b);
Vec3 vec3_scale(Vec3 v, float s);
float vec3_dot(Vec3 a, Vec3 b);`,
      hints: [
        '#pragma once is a non-standard but widely supported directive.',
        'It replaces the #ifndef/#define/#endif pattern.',
        'Simpler but not guaranteed by the C standard.',
      ],
      concepts: ['#pragma once', 'include guard alternative', 'compiler extension'],
    },
    {
      id: 'c-headers-12',
      title: 'Predict self-include guard',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Understand how include guards prevent content duplication.',
      skeleton: `#include <stdio.h>

// Simulating including a header twice:
#ifndef MY_HEADER_H
#define MY_HEADER_H
int get_value(void) { return 42; }
#endif

// "Second include" - guard prevents re-inclusion:
#ifndef MY_HEADER_H
// This entire block is skipped!
int get_value(void) { return 99; }
#endif

int main(void) {
    printf("%d\\n", get_value());
    return 0;
}`,
      solution: `42`,
      hints: [
        'First inclusion: MY_HEADER_H not defined, so content is included.',
        'Second "inclusion": MY_HEADER_H already defined, content skipped.',
        'The function returns 42, not 99.',
      ],
      concepts: ['guard mechanism', 'conditional skipping', 'first wins'],
    },
    {
      id: 'c-headers-13',
      title: 'Header-only library',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a single-header library using the implementation guard pattern.',
      skeleton: `// Write a header-only library pattern:
// Define API in header, implementation guarded by
// #ifdef MYLIB_IMPLEMENTATION (user defines once in one .c file).`,
      solution: `// mylib.h
#ifndef MYLIB_H
#define MYLIB_H

// API declarations (always included)
int mylib_add(int a, int b);
int mylib_mul(int a, int b);
char *mylib_repeat(const char *s, int n);

#ifdef MYLIB_IMPLEMENTATION

#include <stdlib.h>
#include <string.h>

int mylib_add(int a, int b) { return a + b; }
int mylib_mul(int a, int b) { return a * b; }

char *mylib_repeat(const char *s, int n) {
    size_t len = strlen(s);
    char *result = malloc(len * n + 1);
    result[0] = '\\0';
    for (int i = 0; i < n; i++) strcat(result, s);
    return result;
}

#endif // MYLIB_IMPLEMENTATION
#endif // MYLIB_H

// Usage in main.c:
// #define MYLIB_IMPLEMENTATION
// #include "mylib.h"
//
// Other .c files just:
// #include "mylib.h"`,
      hints: [
        'Declarations are always available to all includers.',
        'Implementation is only compiled when MYLIB_IMPLEMENTATION is defined.',
        'Define it in exactly one .c file before the #include.',
      ],
      concepts: ['header-only library', 'implementation guard', 'stb pattern'],
    },
    {
      id: 'c-headers-14',
      title: 'Refactor monolithic file to header/source',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Split a single-file program into header and source files.',
      skeleton: `// Everything in one file - messy
#include <stdio.h>
#include <math.h>

typedef struct { double x, y; } Point;

double distance(Point a, Point b) {
    double dx = a.x - b.x;
    double dy = a.y - b.y;
    return sqrt(dx*dx + dy*dy);
}

Point midpoint(Point a, Point b) {
    return (Point){(a.x+b.x)/2, (a.y+b.y)/2};
}

int main(void) {
    Point a = {0, 0}, b = {3, 4};
    printf("Distance: %.1f\\n", distance(a, b));
    Point m = midpoint(a, b);
    printf("Midpoint: (%.1f, %.1f)\\n", m.x, m.y);
    return 0;
}`,
      solution: `// point.h
#ifndef POINT_H
#define POINT_H

typedef struct { double x, y; } Point;

double distance(Point a, Point b);
Point midpoint(Point a, Point b);

#endif

// point.c
#include "point.h"
#include <math.h>

double distance(Point a, Point b) {
    double dx = a.x - b.x;
    double dy = a.y - b.y;
    return sqrt(dx*dx + dy*dy);
}

Point midpoint(Point a, Point b) {
    return (Point){(a.x+b.x)/2, (a.y+b.y)/2};
}

// main.c
#include <stdio.h>
#include "point.h"

int main(void) {
    Point a = {0, 0}, b = {3, 4};
    printf("Distance: %.1f\\n", distance(a, b));
    Point m = midpoint(a, b);
    printf("Midpoint: (%.1f, %.1f)\\n", m.x, m.y);
    return 0;
}`,
      hints: [
        'Types and function declarations go in the .h file.',
        'Function definitions go in the .c file.',
        'main.c includes the header and uses the functions.',
      ],
      concepts: ['file splitting', 'header/source separation', 'modular code'],
    },
    {
      id: 'c-headers-15',
      title: 'Refactor includes for minimal dependencies',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Minimize header includes using forward declarations.',
      skeleton: `// network.h - includes everything, creating heavy dependencies
#ifndef NETWORK_H
#define NETWORK_H

#include "buffer.h"    // Full Buffer type included
#include "logger.h"    // Full Logger type included
#include "config.h"    // Full Config type included

typedef struct {
    int socket;
    Buffer *recv_buf;
    Logger *log;
    Config *cfg;
} Connection;

Connection *conn_create(Config *cfg, Logger *log);
void conn_send(Connection *c, Buffer *buf);
void conn_close(Connection *c);

#endif`,
      solution: `// network.h - minimal dependencies with forward declarations
#ifndef NETWORK_H
#define NETWORK_H

// Forward declarations instead of full includes
typedef struct Buffer Buffer;
typedef struct Logger Logger;
typedef struct Config Config;

typedef struct {
    int socket;
    Buffer *recv_buf;
    Logger *log;
    Config *cfg;
} Connection;

Connection *conn_create(Config *cfg, Logger *log);
void conn_send(Connection *c, Buffer *buf);
void conn_close(Connection *c);

#endif

// network.c - includes full headers where needed
#include "network.h"
#include "buffer.h"
#include "logger.h"
#include "config.h"
#include <stdlib.h>

Connection *conn_create(Config *cfg, Logger *log) {
    Connection *c = malloc(sizeof(Connection));
    c->cfg = cfg;
    c->log = log;
    c->recv_buf = NULL;
    c->socket = -1;
    return c;
}`,
      hints: [
        'The header only needs pointers, so forward declarations suffice.',
        'Full includes only needed in the .c file for member access.',
        'This speeds up compilation and reduces coupling.',
      ],
      concepts: ['minimal includes', 'forward declaration', 'compile-time dependency'],
    },
    {
      id: 'c-headers-16',
      title: 'Fix wrong include type',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the incorrect use of angle brackets vs quotes.',
      skeleton: `// Bug: using angle brackets for local headers
#include <stdio.h>
#include <myproject/utils.h>     // Bug: local file
#include <myproject/config.h>    // Bug: local file
#include "stdlib.h"              // Bug: system header

int main(void) {
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include "myproject/utils.h"
#include "myproject/config.h"

int main(void) {
    return 0;
}`,
      hints: [
        '<...> searches system include paths first.',
        '"..." searches local/project paths first, then system.',
        'System headers: <>, project headers: "".',
      ],
      concepts: ['angle vs quotes', 'include paths', 'system vs local'],
    },
    {
      id: 'c-headers-17',
      title: 'Predict compilation order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Understand how separate compilation and linking works.',
      skeleton: `// Conceptual question:
// file1.c: defines int shared = 10;
// file2.c: extern int shared; shared = 20;
// main.c: extern int shared; printf("%d", shared);
//
// Compile: gcc file1.c file2.c main.c
// file2 runs its initialization after file1
// What does main print?

#include <stdio.h>
int shared = 10;

void modify(void) {
    shared = 20;
}

int main(void) {
    modify();
    printf("%d\\n", shared);
    return 0;
}`,
      solution: `20`,
      hints: [
        'modify() changes shared to 20.',
        'All files share the same global variable through extern.',
        'The last write before printf wins.',
      ],
      concepts: ['separate compilation', 'linking', 'shared globals'],
    },
    {
      id: 'c-headers-18',
      title: 'Write C++ compatible header',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a C header that is compatible with C++ code.',
      skeleton: `// Write a header that can be included from both C and C++ code.
// Use extern "C" to prevent C++ name mangling.`,
      solution: `// mylib.h
#ifndef MYLIB_H
#define MYLIB_H

#include <stddef.h>

#ifdef __cplusplus
extern "C" {
#endif

typedef struct {
    void *data;
    size_t len;
    size_t cap;
} Buffer;

Buffer *buffer_create(size_t initial_cap);
int buffer_append(Buffer *b, const void *data, size_t len);
void buffer_clear(Buffer *b);
void buffer_destroy(Buffer *b);

#ifdef __cplusplus
}
#endif

#endif`,
      hints: [
        '__cplusplus is defined when compiling with a C++ compiler.',
        'extern "C" prevents C++ name mangling.',
        'This lets C++ code link against C libraries.',
      ],
      concepts: ['C++ compatibility', 'extern C', 'name mangling'],
    },
    {
      id: 'c-headers-19',
      title: 'Fill-blank conditional platform header',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Include platform-specific headers conditionally.',
      skeleton: `#ifndef PLATFORM_H
#define PLATFORM_H

__BLANK__ defined(_WIN32)
    #include <windows.h>
    typedef HANDLE FileHandle;
__BLANK__ defined(__linux__) || defined(__APPLE__)
    #include <unistd.h>
    #include <fcntl.h>
    typedef int FileHandle;
__BLANK__
    #error "Unsupported platform"
__BLANK__

FileHandle open_file(const char *path);
void close_file(FileHandle h);

#endif`,
      solution: `#ifndef PLATFORM_H
#define PLATFORM_H

#if defined(_WIN32)
    #include <windows.h>
    typedef HANDLE FileHandle;
#elif defined(__linux__) || defined(__APPLE__)
    #include <unistd.h>
    #include <fcntl.h>
    typedef int FileHandle;
#else
    #error "Unsupported platform"
#endif

FileHandle open_file(const char *path);
void close_file(FileHandle h);

#endif`,
      hints: [
        '#if / #elif / #else / #endif for multi-branch conditions.',
        '#error generates a compile-time error message.',
        'Platform macros detect the operating system.',
      ],
      concepts: ['platform headers', '#if/#elif', '#error directive'],
    },
    {
      id: 'c-headers-20',
      title: 'Predict extern behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict behavior of extern declarations and definitions.',
      skeleton: `#include <stdio.h>

// Declaration only (extern, no initialization)
extern int counter;

void increment(void) { counter++; }

// Definition (allocates storage)
int counter = 0;

int main(void) {
    increment();
    increment();
    increment();
    printf("%d\\n", counter);
    return 0;
}`,
      solution: `3`,
      hints: [
        'extern int counter declares without defining.',
        'int counter = 0 is the actual definition.',
        'Three calls to increment make counter 3.',
      ],
      concepts: ['extern vs definition', 'global variable', 'declaration order'],
    },
  ],
};
