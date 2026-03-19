import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-multi',
  title: '34. Multi-File Projects',
  explanation: `## Multi-File Projects

Real C projects span multiple files. Understanding compilation units, linking, and header organization is essential.

\`\`\`c
// utils.h -- interface
#ifndef UTILS_H
#define UTILS_H
int add(int a, int b);
#endif

// utils.c -- implementation
#include "utils.h"
int add(int a, int b) { return a + b; }

// main.c -- usage
#include "utils.h"
int main(void) { return add(1, 2); }
\`\`\`

### Key Concepts
- **Compilation unit**: a .c file with all its includes
- **Linking**: combining .o files into an executable
- **Include guards**: prevent double inclusion of headers
- **extern**: declare a variable or function defined elsewhere
- **static at file scope**: restrict visibility to current file
`,
  exercises: [
    {
      id: 'c-multi-1',
      title: 'Include guard',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete the include guard for a header file.',
      skeleton: `// math_utils.h
#ifndef __BLANK__
#define __BLANK__

int add(int a, int b);
int multiply(int a, int b);

__BLANK__`,
      solution: `// math_utils.h
#ifndef MATH_UTILS_H
#define MATH_UTILS_H

int add(int a, int b);
int multiply(int a, int b);

#endif`,
      hints: [
        'Guard name convention: filename in uppercase with underscores.',
        '#ifndef / #define at the top, #endif at the bottom.',
        'Prevents double inclusion when multiple files include this header.',
      ],
      concepts: ['include guards', '#ifndef', 'header files'],
    },
    {
      id: 'c-multi-2',
      title: 'Extern declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use extern to share a global variable between files.',
      skeleton: `// config.h
#ifndef CONFIG_H
#define CONFIG_H
__BLANK__ int verbose_mode;
__BLANK__ const char *app_name;
#endif

// config.c
#include "config.h"
int verbose_mode = 0;
const char *app_name = "myapp";

// main.c
#include <stdio.h>
#include "config.h"
int main(void) {
    verbose_mode = __BLANK__;
    printf("%s: verbose=%d\\n", app_name, verbose_mode);
    return 0;
}`,
      solution: `// config.h
#ifndef CONFIG_H
#define CONFIG_H
extern int verbose_mode;
extern const char *app_name;
#endif

// config.c
#include "config.h"
int verbose_mode = 0;
const char *app_name = "myapp";

// main.c
#include <stdio.h>
#include "config.h"
int main(void) {
    verbose_mode = 1;
    printf("%s: verbose=%d\\n", app_name, verbose_mode);
    return 0;
}`,
      hints: [
        'extern declares a variable without defining it.',
        'The actual definition (with value) goes in the .c file.',
        'Other .c files see the declaration via the header.',
      ],
      concepts: ['extern', 'global variables', 'declaration vs definition'],
    },
    {
      id: 'c-multi-3',
      title: 'Forward declaration',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a header file with forward declarations for an opaque struct.',
      skeleton: `// Write stack.h with:
// - Include guard
// - Opaque struct (forward declaration only)
// - Function prototypes: stack_create, stack_push, stack_pop, stack_destroy`,
      solution: `// stack.h
#ifndef STACK_H
#define STACK_H

typedef struct Stack Stack;

Stack *stack_create(int capacity);
void stack_push(Stack *s, int value);
int stack_pop(Stack *s);
void stack_destroy(Stack *s);

#endif`,
      hints: [
        'Forward declare: typedef struct Stack Stack;',
        'Users only see Stack* pointers; internals are hidden.',
        'This is the opaque pointer pattern for encapsulation.',
      ],
      concepts: ['opaque pointer', 'forward declaration', 'encapsulation'],
    },
    {
      id: 'c-multi-4',
      title: 'Predict linker error',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict what linker error occurs with a missing definition.',
      skeleton: `// math.h
#ifndef MATH_H
#define MATH_H
int add(int a, int b);
int subtract(int a, int b);
#endif

// math.c
#include "math.h"
int add(int a, int b) { return a + b; }
// subtract is declared but NOT defined

// main.c
#include <stdio.h>
#include "math.h"
int main(void) {
    printf("%d\\n", add(3, 4));
    printf("%d\\n", subtract(10, 3));
    return 0;
}

// Compile: gcc -o app main.c math.c
// What error?`,
      solution: `// Linker error:
// undefined reference to 'subtract'
// 
// math.h declares subtract, and main.c calls it,
// but math.c never provides the definition.
// Compilation succeeds (declarations exist), but linking fails.

#include <stdio.h>
int main(void) {
    printf("Linker error: undefined reference to subtract\\n");
    return 0;
}`,
      hints: [
        'Compilation succeeds because subtract is declared in the header.',
        'Linking fails because no .o file contains the subtract function body.',
        'Error: undefined reference to \'subtract\'.',
      ],
      concepts: ['linker error', 'undefined reference', 'declaration vs definition'],
    },
    {
      id: 'c-multi-5',
      title: 'Static file scope',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use static to limit function and variable scope to the current file.',
      skeleton: `// utils.c
#include <stdio.h>

__BLANK__ int counter = 0;  // only visible in this file

__BLANK__ void increment(void) {  // only callable from this file
    counter++;
}

void do_work(void) {
    increment();
    increment();
    printf("counter = %d\\n", counter);
}

// main.c
void do_work(void);
int main(void) {
    do_work();
    // counter and increment are NOT accessible here
    return 0;
}`,
      solution: `// utils.c
#include <stdio.h>

static int counter = 0;

static void increment(void) {
    counter++;
}

void do_work(void) {
    increment();
    increment();
    printf("counter = %d\\n", counter);
}

// main.c
void do_work(void);
int main(void) {
    do_work();
    return 0;
}`,
      hints: [
        'static at file scope gives internal linkage.',
        'counter and increment are only visible within utils.c.',
        'do_work (not static) can be called from other files.',
      ],
      concepts: ['static', 'internal linkage', 'file scope'],
    },
    {
      id: 'c-multi-6',
      title: 'Header-only implementation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a header-only utility using static inline functions.',
      skeleton: `// Write vec2.h -- a header-only 2D vector math library
// with static inline functions for add, sub, dot, length
// Must be includable from multiple .c files without linker errors`,
      solution: `// vec2.h
#ifndef VEC2_H
#define VEC2_H

#include <math.h>

typedef struct { float x, y; } Vec2;

static inline Vec2 vec2_add(Vec2 a, Vec2 b) {
    return (Vec2){ a.x + b.x, a.y + b.y };
}

static inline Vec2 vec2_sub(Vec2 a, Vec2 b) {
    return (Vec2){ a.x - b.x, a.y - b.y };
}

static inline float vec2_dot(Vec2 a, Vec2 b) {
    return a.x * b.x + a.y * b.y;
}

static inline float vec2_length(Vec2 v) {
    return sqrtf(v.x * v.x + v.y * v.y);
}

#endif`,
      hints: [
        'static inline prevents multiple definition errors across files.',
        'Each compilation unit gets its own copy of the function.',
        'Ideal for small utility functions used in headers.',
      ],
      concepts: ['static inline', 'header-only library', 'multiple definitions'],
    },
    {
      id: 'c-multi-7',
      title: 'Fix multiple definition',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the multiple definition linker error.',
      skeleton: `// config.h
#ifndef CONFIG_H
#define CONFIG_H
int max_size = 100;  // BUG: definition in header!
void init(void);
#endif

// config.c
#include "config.h"
void init(void) { max_size = 200; }

// main.c
#include <stdio.h>
#include "config.h"
int main(void) {
    init();
    printf("%d\\n", max_size);
    return 0;
}
// Error: multiple definition of 'max_size'`,
      solution: `// config.h
#ifndef CONFIG_H
#define CONFIG_H
extern int max_size;
void init(void);
#endif

// config.c
#include "config.h"
int max_size = 100;
void init(void) { max_size = 200; }

// main.c
#include <stdio.h>
#include "config.h"
int main(void) {
    init();
    printf("%d\\n", max_size);
    return 0;
}`,
      hints: [
        'Defining a variable in a header puts it in every .c that includes it.',
        'Use extern in the header (declaration only).',
        'Put the definition (int max_size = 100) in exactly one .c file.',
      ],
      concepts: ['multiple definition', 'extern', 'one definition rule'],
    },
    {
      id: 'c-multi-8',
      title: 'Opaque struct implementation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Implement the opaque Stack type from its header.',
      skeleton: `// Given stack.h (from exercise 3):
// typedef struct Stack Stack;
// Stack *stack_create(int capacity);
// void stack_push(Stack *s, int value);
// int stack_pop(Stack *s);
// void stack_destroy(Stack *s);

// Write stack.c implementing all functions

#include <stdio.h>

// Test (main.c):
// Stack *s = stack_create(10);
// stack_push(s, 42);
// printf("%d\\n", stack_pop(s));
// stack_destroy(s);`,
      solution: `#include <stdlib.h>

typedef struct Stack {
    int *data;
    int top;
    int capacity;
} Stack;

Stack *stack_create(int capacity) {
    Stack *s = malloc(sizeof(Stack));
    s->data = malloc(capacity * sizeof(int));
    s->top = -1;
    s->capacity = capacity;
    return s;
}

void stack_push(Stack *s, int value) {
    if (s->top < s->capacity - 1)
        s->data[++s->top] = value;
}

int stack_pop(Stack *s) {
    if (s->top >= 0) return s->data[s->top--];
    return -1;
}

void stack_destroy(Stack *s) {
    free(s->data);
    free(s);
}`,
      hints: [
        'Define the full struct in the .c file, not the header.',
        'Users cannot access internals -- only the API functions.',
        'This provides true encapsulation in C.',
      ],
      concepts: ['opaque struct', 'encapsulation', 'information hiding'],
    },
    {
      id: 'c-multi-9',
      title: 'Predict compilation order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict which command sequence correctly builds a multi-file project.',
      skeleton: `// Files: main.c, utils.c, utils.h
// main.c includes utils.h
// utils.c includes utils.h

// Which is correct?
// A) gcc main.c utils.c -o app
// B) gcc -c main.c && gcc -c utils.c && gcc main.o utils.o -o app
// C) Both A and B produce the same result
// D) Only B is correct

#include <stdio.h>
int main(void) {
    printf("Answer: ?\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
int main(void) {
    // Answer: C -- Both produce the same result
    // A does compile+link in one step
    // B does compile and link separately
    // Both produce the same executable
    printf("Answer: C\\n");
    return 0;
}`,
      hints: [
        'gcc can compile and link in one command.',
        'Separate compilation gives you incremental builds.',
        'Both approaches produce the same final executable.',
      ],
      concepts: ['compilation', 'linking', 'build steps'],
    },
    {
      id: 'c-multi-10',
      title: 'Pragma once vs guards',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Show both methods of preventing double inclusion.',
      skeleton: `// Method 1: Traditional include guards
#ifndef MY_HEADER_H
#define MY_HEADER_H
void func1(void);
#endif

// Method 2: Pragma once (non-standard but widely supported)
__BLANK__
void func2(void);`,
      solution: `// Method 1: Traditional include guards
#ifndef MY_HEADER_H
#define MY_HEADER_H
void func1(void);
#endif

// Method 2: Pragma once (non-standard but widely supported)
#pragma once
void func2(void);`,
      hints: [
        '#pragma once is simpler but not part of the C standard.',
        'Include guards are universally portable.',
        'Both prevent the same header from being processed twice.',
      ],
      concepts: ['#pragma once', 'include guards', 'portability'],
    },
    {
      id: 'c-multi-11',
      title: 'Circular include fix',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix circular includes between two header files.',
      skeleton: `// a.h -- BUG: includes b.h which includes a.h
#ifndef A_H
#define A_H
#include "b.h"
typedef struct { B_Type *ref; int x; } A_Type;
void process_a(A_Type *a);
#endif

// b.h -- BUG: includes a.h which includes b.h
#ifndef B_H
#define B_H
#include "a.h"
typedef struct { A_Type *ref; int y; } B_Type;
void process_b(B_Type *b);
#endif`,
      solution: `// a.h -- use forward declaration instead of including b.h
#ifndef A_H
#define A_H
typedef struct B_Type B_Type;
typedef struct A_Type { B_Type *ref; int x; } A_Type;
void process_a(A_Type *a);
#endif

// b.h -- use forward declaration instead of including a.h
#ifndef B_H
#define B_H
typedef struct A_Type A_Type;
typedef struct B_Type { B_Type_inner; int y; } B_Type;
typedef struct B_Type { A_Type *ref; int y; } B_Type;
void process_b(B_Type *b);
#endif`,
      hints: [
        'Break the cycle with forward declarations.',
        'Since both only use pointers, full definitions are not needed in headers.',
        'typedef struct B_Type B_Type; is a forward declaration.',
      ],
      concepts: ['circular includes', 'forward declaration', 'dependency breaking'],
    },
    {
      id: 'c-multi-12',
      title: 'Separate interface and implementation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a proper .h/.c pair for a dynamic array module.',
      skeleton: `// Write dynarray.h (interface) and dynarray.c (implementation)
// Interface: create, push, get, size, destroy
// Use opaque pointer pattern`,
      solution: `// dynarray.h
#ifndef DYNARRAY_H
#define DYNARRAY_H

#include <stddef.h>

typedef struct DynArray DynArray;

DynArray *dynarray_create(void);
void dynarray_push(DynArray *da, int value);
int dynarray_get(DynArray *da, int index);
size_t dynarray_size(DynArray *da);
void dynarray_destroy(DynArray *da);

#endif

// dynarray.c
#include "dynarray.h"
#include <stdlib.h>

struct DynArray {
    int *data;
    size_t size;
    size_t capacity;
};

DynArray *dynarray_create(void) {
    DynArray *da = malloc(sizeof(DynArray));
    da->data = malloc(4 * sizeof(int));
    da->size = 0;
    da->capacity = 4;
    return da;
}

void dynarray_push(DynArray *da, int value) {
    if (da->size == da->capacity) {
        da->capacity *= 2;
        da->data = realloc(da->data, da->capacity * sizeof(int));
    }
    da->data[da->size++] = value;
}

int dynarray_get(DynArray *da, int index) {
    return da->data[index];
}

size_t dynarray_size(DynArray *da) {
    return da->size;
}

void dynarray_destroy(DynArray *da) {
    free(da->data);
    free(da);
}`,
      hints: [
        'Header has only the typedef and function prototypes.',
        'Struct definition goes in the .c file only.',
        'All access goes through the API functions.',
      ],
      concepts: ['interface/implementation', 'opaque type', 'module design'],
    },
    {
      id: 'c-multi-13',
      title: 'Predict static function visibility',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict what happens when you try to call a static function from another file.',
      skeleton: `// helper.c
#include <stdio.h>
static void secret(void) { printf("secret\\n"); }
void public_func(void) { secret(); printf("public\\n"); }

// main.c
void public_func(void);
void secret(void);  // forward declare
int main(void) {
    public_func();
    secret();  // Will this work?
    return 0;
}`,
      solution: `// Linker error: undefined reference to 'secret'
// static functions have internal linkage -- only visible in their .c file.
// public_func can call secret (same file), but main.c cannot.

#include <stdio.h>
int main(void) {
    printf("Linker error: undefined reference to secret\\n");
    return 0;
}`,
      hints: [
        'static at file scope gives internal linkage.',
        'The linker cannot find secret because it is not exported.',
        'public_func works because it is not static.',
      ],
      concepts: ['static function', 'internal linkage', 'linker error'],
    },
    {
      id: 'c-multi-14',
      title: 'Callback registration pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a multi-file callback registration system.',
      skeleton: `// Write events.h and events.c
// events.h: register_handler(const char *event, void (*handler)(void))
//           trigger_event(const char *event)
// Support up to 16 registered handlers`,
      solution: `// events.h
#ifndef EVENTS_H
#define EVENTS_H

typedef void (*EventHandler)(void);

int register_handler(const char *event, EventHandler handler);
void trigger_event(const char *event);

#endif

// events.c
#include "events.h"
#include <string.h>

#define MAX_HANDLERS 16

static struct {
    char event[32];
    EventHandler handler;
} handlers[MAX_HANDLERS];

static int handler_count = 0;

int register_handler(const char *event, EventHandler handler) {
    if (handler_count >= MAX_HANDLERS) return -1;
    strncpy(handlers[handler_count].event, event, 31);
    handlers[handler_count].event[31] = '\\0';
    handlers[handler_count].handler = handler;
    handler_count++;
    return 0;
}

void trigger_event(const char *event) {
    for (int i = 0; i < handler_count; i++) {
        if (strcmp(handlers[i].event, event) == 0) {
            handlers[i].handler();
        }
    }
}`,
      hints: [
        'Use a static array of event-handler pairs.',
        'register_handler stores the pair, trigger_event looks up and calls.',
        'All internal state is static (file-scoped) in events.c.',
      ],
      concepts: ['callback pattern', 'event system', 'function pointers'],
    },
    {
      id: 'c-multi-15',
      title: 'Fix header ordering issue',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the compilation error caused by header include order.',
      skeleton: `// types.h
#ifndef TYPES_H
#define TYPES_H
typedef unsigned int uint;
typedef unsigned char byte;
#endif

// protocol.h
#ifndef PROTOCOL_H
#define PROTOCOL_H
// BUG: uses uint and byte but doesn't include types.h
typedef struct {
    uint id;
    byte flags;
    uint length;
} Packet;
Packet *create_packet(uint id);
#endif

// main.c
#include "protocol.h"
#include "types.h"  // too late!
int main(void) { return 0; }`,
      solution: `// types.h
#ifndef TYPES_H
#define TYPES_H
typedef unsigned int uint;
typedef unsigned char byte;
#endif

// protocol.h
#ifndef PROTOCOL_H
#define PROTOCOL_H
#include "types.h"
typedef struct {
    uint id;
    byte flags;
    uint length;
} Packet;
Packet *create_packet(uint id);
#endif

// main.c
#include "protocol.h"
int main(void) { return 0; }`,
      hints: [
        'Each header should include what it needs.',
        'protocol.h uses uint and byte, so it must include types.h.',
        'Headers should be self-contained -- includable in any order.',
      ],
      concepts: ['self-contained headers', 'include order', 'dependency'],
    },
    {
      id: 'c-multi-16',
      title: 'Refactor monolithic to modular',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Split a monolithic file into separate modules.',
      skeleton: `// All in one file -- refactor into modules
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

typedef struct { float x, y; } Point;
float distance(Point a, Point b) {
    return sqrtf((a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y));
}

typedef struct { Point *points; int count; } Shape;
Shape *create_shape(int n) {
    Shape *s = malloc(sizeof(Shape));
    s->points = calloc(n, sizeof(Point));
    s->count = n;
    return s;
}
void free_shape(Shape *s) { free(s->points); free(s); }

float perimeter(Shape *s) {
    float p = 0;
    for (int i = 0; i < s->count; i++)
        p += distance(s->points[i], s->points[(i+1) % s->count]);
    return p;
}

int main(void) {
    Shape *s = create_shape(3);
    s->points[0] = (Point){0,0};
    s->points[1] = (Point){3,0};
    s->points[2] = (Point){0,4};
    printf("Perimeter: %.2f\\n", perimeter(s));
    free_shape(s);
    return 0;
}`,
      solution: `// point.h
#ifndef POINT_H
#define POINT_H
typedef struct { float x, y; } Point;
float distance(Point a, Point b);
#endif

// point.c
#include "point.h"
#include <math.h>
float distance(Point a, Point b) {
    return sqrtf((a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y));
}

// shape.h
#ifndef SHAPE_H
#define SHAPE_H
#include "point.h"
typedef struct { Point *points; int count; } Shape;
Shape *create_shape(int n);
void free_shape(Shape *s);
float perimeter(Shape *s);
#endif

// shape.c
#include "shape.h"
#include <stdlib.h>
Shape *create_shape(int n) {
    Shape *s = malloc(sizeof(Shape));
    s->points = calloc(n, sizeof(Point));
    s->count = n;
    return s;
}
void free_shape(Shape *s) { free(s->points); free(s); }
float perimeter(Shape *s) {
    float p = 0;
    for (int i = 0; i < s->count; i++)
        p += distance(s->points[i], s->points[(i+1) % s->count]);
    return p;
}

// main.c
#include <stdio.h>
#include "shape.h"
int main(void) {
    Shape *s = create_shape(3);
    s->points[0] = (Point){0,0};
    s->points[1] = (Point){3,0};
    s->points[2] = (Point){0,4};
    printf("Perimeter: %.2f\\n", perimeter(s));
    free_shape(s);
    return 0;
}`,
      hints: [
        'Group related types and functions into separate .h/.c pairs.',
        'Point module handles geometry; Shape module handles shape operations.',
        'Each header includes only what it needs.',
      ],
      concepts: ['modularization', 'separation of concerns', 'refactoring'],
    },
    {
      id: 'c-multi-17',
      title: 'Predict duplicate symbol',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Predict what happens with a function defined in a header.',
      skeleton: `// helper.h
#ifndef HELPER_H
#define HELPER_H
int square(int x) { return x * x; }  // definition in header!
#endif

// a.c
#include "helper.h"
int use_a(void) { return square(3); }

// b.c
#include "helper.h"
int use_b(void) { return square(4); }

// main.c
int use_a(void);
int use_b(void);
#include <stdio.h>
int main(void) {
    printf("%d %d\\n", use_a(), use_b());
    return 0;
}
// gcc -o app main.c a.c b.c`,
      solution: `// Linker error: multiple definition of 'square'
// Both a.o and b.o contain a definition of square().
// The linker sees two definitions and fails.
// Fix: use 'static inline' or move definition to a .c file.

#include <stdio.h>
int main(void) {
    printf("Linker error: multiple definition of square\\n");
    return 0;
}`,
      hints: [
        'Include guards prevent double inclusion in ONE file, not across files.',
        'a.c and b.c each get their own copy of square() definition.',
        'Fix with static inline, or put definition in helper.c.',
      ],
      concepts: ['multiple definition', 'one definition rule', 'static inline'],
    },
    {
      id: 'c-multi-18',
      title: 'Shared library concept',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Complete commands to build and use a shared library.',
      skeleton: `// Build shared library from utils.c:
// gcc -c -fPIC utils.c -o utils.o
// gcc -shared utils.o -o __BLANK__

// Build program linking to the shared library:
// gcc main.c -L. __BLANK__ -o program

// Run with library path:
// __BLANK__=. ./program`,
      solution: `// Build shared library from utils.c:
// gcc -c -fPIC utils.c -o utils.o
// gcc -shared utils.o -o libutils.so

// Build program linking to the shared library:
// gcc main.c -L. -lutils -o program

// Run with library path:
// LD_LIBRARY_PATH=. ./program`,
      hints: [
        'Shared library naming convention: libNAME.so.',
        'Link with -lutils (strips lib prefix and .so suffix).',
        'LD_LIBRARY_PATH tells the runtime linker where to find .so files.',
      ],
      concepts: ['shared library', '-fPIC', 'LD_LIBRARY_PATH'],
    },
    {
      id: 'c-multi-19',
      title: 'Refactor globals to module',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor global variables into a module with accessor functions.',
      skeleton: `// Bad: global state scattered in main.c
#include <stdio.h>

int user_count = 0;
char current_user[64] = "anonymous";

void login(const char *name) {
    snprintf(current_user, sizeof(current_user), "%s", name);
    user_count++;
}

int main(void) {
    login("alice");
    printf("Users: %d, Current: %s\\n", user_count, current_user);
    return 0;
}`,
      solution: `// session.h
#ifndef SESSION_H
#define SESSION_H
void session_login(const char *name);
int session_user_count(void);
const char *session_current_user(void);
#endif

// session.c
#include "session.h"
#include <stdio.h>
#include <string.h>

static int user_count = 0;
static char current_user[64] = "anonymous";

void session_login(const char *name) {
    snprintf(current_user, sizeof(current_user), "%s", name);
    user_count++;
}

int session_user_count(void) { return user_count; }
const char *session_current_user(void) { return current_user; }

// main.c
#include <stdio.h>
#include "session.h"
int main(void) {
    session_login("alice");
    printf("Users: %d, Current: %s\\n",
           session_user_count(), session_current_user());
    return 0;
}`,
      hints: [
        'Make globals static in the .c file -- internal linkage.',
        'Provide getter functions in the header.',
        'This prevents other files from directly modifying state.',
      ],
      concepts: ['encapsulation', 'accessor functions', 'module pattern'],
    },
    {
      id: 'c-multi-20',
      title: 'Plugin architecture concept',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Design a simple plugin registration system using function pointers.',
      skeleton: `// Write plugin.h and plugin.c
// - Plugin struct with name and init/process function pointers
// - register_plugin, process_all functions
// - Support up to 8 plugins`,
      solution: `// plugin.h
#ifndef PLUGIN_H
#define PLUGIN_H

typedef struct {
    const char *name;
    int (*init)(void);
    int (*process)(const char *input, char *output, int out_size);
} Plugin;

int register_plugin(Plugin p);
void process_all(const char *input);

#endif

// plugin.c
#include "plugin.h"
#include <stdio.h>
#include <string.h>

#define MAX_PLUGINS 8
static Plugin plugins[MAX_PLUGINS];
static int plugin_count = 0;

int register_plugin(Plugin p) {
    if (plugin_count >= MAX_PLUGINS) return -1;
    plugins[plugin_count] = p;
    if (p.init) p.init();
    plugin_count++;
    return 0;
}

void process_all(const char *input) {
    char output[256];
    for (int i = 0; i < plugin_count; i++) {
        if (plugins[i].process) {
            int ok = plugins[i].process(input, output, sizeof(output));
            printf("[%s] %s: %s\\n", plugins[i].name,
                   ok ? "ok" : "fail", output);
        }
    }
}`,
      hints: [
        'Plugin struct holds name + function pointers for init and process.',
        'register_plugin adds to static array and calls init.',
        'process_all iterates and calls each plugin\'s process function.',
      ],
      concepts: ['plugin architecture', 'function pointers', 'registration pattern'],
    },
  ],
};
