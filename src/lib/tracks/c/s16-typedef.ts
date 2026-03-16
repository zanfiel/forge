import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-typedef',
  title: '16. Typedef',
  explanation: `## Typedef in C

\`typedef\` creates an alias for an existing type, improving readability.

\`\`\`c
typedef unsigned long ulong;
typedef struct { int x, y; } Point;
typedef int (*Comparator)(const void *, const void *);
\`\`\`

### Key Concepts
- Simplifies complex type declarations
- Commonly used with structs to avoid repeating \`struct\` keyword
- Essential for function pointer types
- Improves portability (platform-specific types behind typedef)
- Does NOT create a new type -- just an alias
`,
  exercises: [
    {
      id: 'c-typedef-1',
      title: 'Basic typedef',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Create a typedef alias for a basic type.',
      skeleton: `#include <stdio.h>

__BLANK__ unsigned char byte;
__BLANK__ unsigned long long u64;

int main(void) {
    byte b = 255;
    u64 big = 18446744073709551615ULL;
    printf("byte: %u\\n", b);
    printf("u64: %llu\\n", big);
    return 0;
}`,
      solution: `#include <stdio.h>

typedef unsigned char byte;
typedef unsigned long long u64;

int main(void) {
    byte b = 255;
    u64 big = 18446744073709551615ULL;
    printf("byte: %u\\n", b);
    printf("u64: %llu\\n", big);
    return 0;
}`,
      hints: [
        'typedef creates an alias: typedef existing_type new_name;',
        'byte is now equivalent to unsigned char.',
        'This improves readability for common patterns.',
      ],
      concepts: ['typedef basics', 'type alias', 'readability'],
    },
    {
      id: 'c-typedef-2',
      title: 'Typedef struct',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use typedef to simplify struct declarations.',
      skeleton: `#include <stdio.h>

__BLANK__ struct {
    double x, y;
} Vec2;

Vec2 vec2_add(Vec2 a, Vec2 b) {
    return (Vec2){a.x + b.x, a.y + b.y};
}

int main(void) {
    Vec2 a = {1.0, 2.0};
    Vec2 b = {3.0, 4.0};
    Vec2 c = vec2_add(a, b);
    printf("(%.1f, %.1f)\\n", c.__BLANK__, c.__BLANK__);
    return 0;
}`,
      solution: `#include <stdio.h>

typedef struct {
    double x, y;
} Vec2;

Vec2 vec2_add(Vec2 a, Vec2 b) {
    return (Vec2){a.x + b.x, a.y + b.y};
}

int main(void) {
    Vec2 a = {1.0, 2.0};
    Vec2 b = {3.0, 4.0};
    Vec2 c = vec2_add(a, b);
    printf("(%.1f, %.1f)\\n", c.x, c.y);
    return 0;
}`,
      hints: [
        'typedef struct { ... } Name; avoids writing struct everywhere.',
        'Now use Vec2 instead of struct Vec2.',
        'Compound literal (Vec2){...} creates a temporary struct.',
      ],
      concepts: ['typedef struct', 'anonymous struct', 'compound literal'],
    },
    {
      id: 'c-typedef-3',
      title: 'Typedef function pointer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use typedef to simplify a function pointer type.',
      skeleton: `#include <stdio.h>

__BLANK__ int (*Compare)(int, int);

int ascending(int a, int b) { return a - b; }
int descending(int a, int b) { return b - a; }

void sort(int *arr, int len, __BLANK__ cmp) {
    for (int i = 0; i < len - 1; i++)
        for (int j = i + 1; j < len; j++)
            if (cmp(arr[i], arr[j]) > 0) {
                int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
            }
}

int main(void) {
    int nums[] = {3, 1, 4, 1, 5};
    sort(nums, 5, ascending);
    for (int i = 0; i < 5; i++) printf("%d ", nums[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

typedef int (*Compare)(int, int);

int ascending(int a, int b) { return a - b; }
int descending(int a, int b) { return b - a; }

void sort(int *arr, int len, Compare cmp) {
    for (int i = 0; i < len - 1; i++)
        for (int j = i + 1; j < len; j++)
            if (cmp(arr[i], arr[j]) > 0) {
                int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
            }
}

int main(void) {
    int nums[] = {3, 1, 4, 1, 5};
    sort(nums, 5, ascending);
    for (int i = 0; i < 5; i++) printf("%d ", nums[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'typedef int (*Compare)(int, int) names the function pointer type.',
        'Without typedef: int (*cmp)(int, int) is hard to read.',
        'With typedef: Compare cmp is clear and simple.',
      ],
      concepts: ['function pointer typedef', 'callback type', 'readability'],
    },
    {
      id: 'c-typedef-4',
      title: 'Predict typedef behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict that typedef creates an alias, not a new type.',
      skeleton: `#include <stdio.h>

typedef int Length;
typedef int Width;

int main(void) {
    Length l = 10;
    Width w = 20;
    // No error: typedef doesn't create a distinct type
    l = w;
    printf("%d\\n", l);
    printf("%d\\n", sizeof(Length) == sizeof(int));
    return 0;
}`,
      solution: `20
1`,
      hints: [
        'typedef creates an alias, not a new distinct type.',
        'Length and Width are both just int.',
        'You can freely assign between typedef aliases of the same type.',
      ],
      concepts: ['alias not new type', 'no type safety', 'sizeof equivalence'],
    },
    {
      id: 'c-typedef-5',
      title: 'Typedef for arrays',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use typedef for array types.',
      skeleton: `// Define typedef for a 4x4 matrix of doubles: Matrix4x4
// Write void mat_identity(Matrix4x4 m) that sets it to identity.
// Write void mat_print(Matrix4x4 m) that prints it.`,
      solution: `#include <stdio.h>
#include <string.h>

typedef double Matrix4x4[4][4];

void mat_identity(Matrix4x4 m) {
    memset(m, 0, sizeof(double) * 16);
    for (int i = 0; i < 4; i++) m[i][i] = 1.0;
}

void mat_print(Matrix4x4 m) {
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4; j++) {
            printf("%5.1f ", m[i][j]);
        }
        printf("\\n");
    }
}

int main(void) {
    Matrix4x4 m;
    mat_identity(m);
    mat_print(m);
    return 0;
}`,
      hints: [
        'typedef double Matrix4x4[4][4] creates an array alias.',
        'Array typedefs pass by pointer automatically (arrays decay).',
        'Useful for making multidimensional array types readable.',
      ],
      concepts: ['array typedef', 'matrix type', 'type clarity'],
    },
    {
      id: 'c-typedef-6',
      title: 'Fix typedef pointer trap',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the typedef pointer aliasing trap.',
      skeleton: `#include <stdio.h>

typedef char *String;

int main(void) {
    // Bug: String a, b; makes a a pointer but b just a char!
    // Actually in C, typedef applies to both, unlike #define
    // But this is the REAL trap:
    const String s = "Hello";
    // s[0] = 'J';  // This would compile! const String = char * const, not const char *
    printf("%s\\n", s);
    // s = "World";  // This would NOT compile
    return 0;
}`,
      solution: `#include <stdio.h>

typedef const char *ConstString;

int main(void) {
    ConstString s = "Hello";
    // s[0] = 'J';  // Now correctly prevented: const char *
    printf("%s\\n", s);
    s = "World";  // Can reassign the pointer
    printf("%s\\n", s);
    return 0;
}`,
      hints: [
        'const String = char * const (pointer is const, not data).',
        'typedef hides the pointer, so const applies to the pointer itself.',
        'Use typedef const char *ConstString for string safety.',
      ],
      concepts: ['typedef pointer trap', 'const with typedef', 'hidden pointer'],
    },
    {
      id: 'c-typedef-7',
      title: 'Typedef for opaque types',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use typedef to create an opaque handle type.',
      skeleton: `// Create an opaque handle pattern:
// typedef struct Handle_s *Handle;
// Handle handle_create(int value);
// int handle_get(Handle h);
// void handle_destroy(Handle h);`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Handle_s {
    int value;
    int valid;
} *Handle;

Handle handle_create(int value) {
    Handle h = malloc(sizeof(*h));
    if (!h) return NULL;
    h->value = value;
    h->valid = 1;
    return h;
}

int handle_get(Handle h) {
    if (h && h->valid) return h->value;
    return -1;
}

void handle_destroy(Handle h) {
    if (h) {
        h->valid = 0;
        free(h);
    }
}

int main(void) {
    Handle h = handle_create(42);
    printf("Value: %d\\n", handle_get(h));
    handle_destroy(h);
    return 0;
}`,
      hints: [
        'The user only sees Handle (a pointer) not the struct internals.',
        'This hides implementation details behind the typedef.',
        'Common pattern in C libraries (FILE *, HANDLE, etc).',
      ],
      concepts: ['opaque type', 'information hiding', 'handle pattern'],
    },
    {
      id: 'c-typedef-8',
      title: 'Predict typedef pointer declaration',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Understand how typedef differs from #define for pointer types.',
      skeleton: `#include <stdio.h>

typedef int *IntPtr;
#define INT_PTR int *

int main(void) {
    IntPtr a, b;   // Both are int *
    INT_PTR c, d;  // c is int *, d is just int!

    int x = 10, y = 20;
    a = &x; b = &y;
    c = &x;
    d = 30;

    printf("%d %d\\n", *a, *b);
    printf("%d %d\\n", *c, d);
    return 0;
}`,
      solution: `10 20
10 30`,
      hints: [
        'typedef int *IntPtr makes both a and b pointers.',
        '#define INT_PTR int * expands to: int *c, d -- d is just int.',
        'This is why typedef is preferred over #define for types.',
      ],
      concepts: ['typedef vs define', 'pointer declaration trap', 'multiple declarations'],
    },
    {
      id: 'c-typedef-9',
      title: 'Fill-blank self-referencing typedef',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Create a self-referencing struct with typedef.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct __BLANK__ {
    int data;
    struct __BLANK__ *next;
} Node;

int main(void) {
    Node *a = malloc(sizeof(Node));
    Node *b = malloc(sizeof(Node));
    a->data = 10;
    a->next = b;
    b->data = 20;
    b->next = __BLANK__;

    Node *p = a;
    while (p) {
        printf("%d ", p->data);
        p = p->next;
    }
    printf("\\n");
    free(b); free(a);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node_s {
    int data;
    struct Node_s *next;
} Node;

int main(void) {
    Node *a = malloc(sizeof(Node));
    Node *b = malloc(sizeof(Node));
    a->data = 10;
    a->next = b;
    b->data = 20;
    b->next = NULL;

    Node *p = a;
    while (p) {
        printf("%d ", p->data);
        p = p->next;
    }
    printf("\\n");
    free(b); free(a);
    return 0;
}`,
      hints: [
        'The struct needs a tag name for the self-reference.',
        'struct Node_s *next uses the tag name (typedef not available yet).',
        'Node is the typedef alias available after the closing brace.',
      ],
      concepts: ['self-referential typedef', 'struct tag', 'forward reference'],
    },
    {
      id: 'c-typedef-10',
      title: 'Typedef for portability',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use typedef to create portable type abstractions.',
      skeleton: `// Create portable type definitions:
// typedef for a "size type" (size_t equivalent)
// typedef for a "boolean" type
// typedef for a "result code" type
// Use them in a simple function.`,
      solution: `#include <stdio.h>
#include <stddef.h>

typedef size_t usize;
typedef int bool_t;
typedef int result_t;

#define TRUE  1
#define FALSE 0
#define OK    0
#define ERR  -1

typedef struct {
    char *items;
    usize len;
    usize cap;
} Buffer;

result_t buffer_init(Buffer *b, usize capacity) {
    b->items = (char *)malloc(capacity);
    if (!b->items) return ERR;
    b->len = 0;
    b->cap = capacity;
    return OK;
}

bool_t buffer_is_empty(Buffer *b) {
    return b->len == 0;
}

void buffer_free(Buffer *b) {
    free(b->items);
    b->items = NULL;
    b->len = b->cap = 0;
}

int main(void) {
    Buffer b;
    if (buffer_init(&b, 64) == OK) {
        printf("Empty: %d\\n", buffer_is_empty(&b));
        buffer_free(&b);
    }
    return 0;
}`,
      hints: [
        'Typedef abstracts platform-specific types.',
        'If the underlying type changes, only the typedef changes.',
        'This is how C libraries handle portability.',
      ],
      concepts: ['portable types', 'type abstraction', 'platform independence'],
    },
    {
      id: 'c-typedef-11',
      title: 'Fix typedef forward declaration',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the forward declaration issue with typedef structs.',
      skeleton: `#include <stdio.h>

// Bug: Can't forward-declare an anonymous typedef struct
typedef struct {
    int x, y;
    Shape *child;  // Error: Shape not declared yet
} Shape;

int main(void) {
    Shape s = {1, 2, NULL};
    printf("(%d, %d)\\n", s.x, s.y);
    return 0;
}`,
      solution: `#include <stdio.h>

typedef struct Shape {
    int x, y;
    struct Shape *child;
} Shape;

int main(void) {
    Shape s = {1, 2, NULL};
    Shape s2 = {3, 4, &s};
    printf("(%d, %d)\\n", s2.x, s2.y);
    printf("Child: (%d, %d)\\n", s2.child->x, s2.child->y);
    return 0;
}`,
      hints: [
        'Anonymous structs cannot self-reference.',
        'Give the struct a tag name for the self-reference.',
        'typedef struct Shape { ... } Shape; allows both struct Shape and Shape.',
      ],
      concepts: ['forward declaration', 'struct tag requirement', 'self-reference'],
    },
    {
      id: 'c-typedef-12',
      title: 'Predict sizeof with typedef',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Verify that typedef does not change the underlying type size.',
      skeleton: `#include <stdio.h>

typedef int i32;
typedef double f64;
typedef char byte;

int main(void) {
    printf("%d\\n", sizeof(i32) == sizeof(int));
    printf("%d\\n", sizeof(f64) == sizeof(double));
    printf("%d\\n", sizeof(byte) == sizeof(char));
    printf("%d\\n", sizeof(byte));
    return 0;
}`,
      solution: `1
1
1
1`,
      hints: [
        'typedef creates an exact alias -- same size as the original.',
        'sizeof(i32) == sizeof(int) is always true.',
        'sizeof(char) is always 1 by definition.',
      ],
      concepts: ['typedef preserves size', 'alias equivalence', 'sizeof'],
    },
    {
      id: 'c-typedef-13',
      title: 'Typedef callback table',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Build a dispatch table using typedef function pointers.',
      skeleton: `// Define typedef void (*Action)(const char *);
// Create an array of Actions for different commands.
// Write void dispatch(const char *cmd, const char *arg)
// that looks up and calls the right action.`,
      solution: `#include <stdio.h>
#include <string.h>

typedef void (*Action)(const char *);

void cmd_hello(const char *arg) { printf("Hello, %s!\\n", arg); }
void cmd_bye(const char *arg) { printf("Goodbye, %s!\\n", arg); }
void cmd_echo(const char *arg) { printf("%s\\n", arg); }

typedef struct {
    const char *name;
    Action action;
} Command;

static Command commands[] = {
    {"hello", cmd_hello},
    {"bye", cmd_bye},
    {"echo", cmd_echo},
};

void dispatch(const char *cmd, const char *arg) {
    int n = sizeof(commands) / sizeof(commands[0]);
    for (int i = 0; i < n; i++) {
        if (strcmp(commands[i].name, cmd) == 0) {
            commands[i].action(arg);
            return;
        }
    }
    printf("Unknown command: %s\\n", cmd);
}

int main(void) {
    dispatch("hello", "World");
    dispatch("echo", "test");
    dispatch("bye", "User");
    dispatch("unknown", "");
    return 0;
}`,
      hints: [
        'Typedef makes the function pointer type reusable.',
        'A dispatch table maps strings to function pointers.',
        'This pattern is used in command interpreters and plugins.',
      ],
      concepts: ['dispatch table', 'command pattern', 'function pointer array'],
    },
    {
      id: 'c-typedef-14',
      title: 'Fill-blank typedef for return types',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use typedef to create a result type with error information.',
      skeleton: `#include <stdio.h>

typedef struct {
    int value;
    int __BLANK__;
    const char *error_msg;
} Result;

Result divide(int a, int b) {
    if (b == 0) {
        return (Result){0, __BLANK__, "Division by zero"};
    }
    return (Result){a / b, __BLANK__, NULL};
}

int main(void) {
    Result r = divide(10, 3);
    if (r.ok) printf("Result: %d\\n", r.value);
    else printf("Error: %s\\n", r.error_msg);

    r = divide(10, 0);
    if (r.ok) printf("Result: %d\\n", r.value);
    else printf("Error: %s\\n", r.error_msg);
    return 0;
}`,
      solution: `#include <stdio.h>

typedef struct {
    int value;
    int ok;
    const char *error_msg;
} Result;

Result divide(int a, int b) {
    if (b == 0) {
        return (Result){0, 0, "Division by zero"};
    }
    return (Result){a / b, 1, NULL};
}

int main(void) {
    Result r = divide(10, 3);
    if (r.ok) printf("Result: %d\\n", r.value);
    else printf("Error: %s\\n", r.error_msg);

    r = divide(10, 0);
    if (r.ok) printf("Result: %d\\n", r.value);
    else printf("Error: %s\\n", r.error_msg);
    return 0;
}`,
      hints: [
        'The ok field indicates success (1) or failure (0).',
        'Return (Result){0, 0, msg} for errors.',
        'Return (Result){value, 1, NULL} for success.',
      ],
      concepts: ['result type', 'error handling', 'compound literal return'],
    },
    {
      id: 'c-typedef-15',
      title: 'Refactor complex declaration',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor complex function pointer declarations with typedef.',
      skeleton: `#include <stdio.h>

// Hard to read: function returning pointer to function
int (*get_operation(char op))(int, int) {
    static int add(int a, int b) { return a + b; }
    static int sub(int a, int b) { return a - b; }
    if (op == '+') return add;
    return sub;
}

int main(void) {
    int (*fn)(int, int) = get_operation('+');
    printf("%d\\n", fn(3, 4));
    fn = get_operation('-');
    printf("%d\\n", fn(10, 3));
    return 0;
}`,
      solution: `#include <stdio.h>

typedef int (*BinOp)(int, int);

static int add(int a, int b) { return a + b; }
static int sub(int a, int b) { return a - b; }

BinOp get_operation(char op) {
    if (op == '+') return add;
    return sub;
}

int main(void) {
    BinOp fn = get_operation('+');
    printf("%d\\n", fn(3, 4));
    fn = get_operation('-');
    printf("%d\\n", fn(10, 3));
    return 0;
}`,
      hints: [
        'typedef int (*BinOp)(int, int) names the function pointer type.',
        'Now the return type reads: BinOp get_operation(char op)',
        'Move static functions out of get_operation for standard C.',
      ],
      concepts: ['simplifying declarations', 'function pointer return', 'readability refactor'],
    },
    {
      id: 'c-typedef-16',
      title: 'Refactor to typedef enum',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Refactor enum declarations to use typedef.',
      skeleton: `#include <stdio.h>

enum Direction { NORTH, SOUTH, EAST, WEST };

void move(enum Direction d) {
    switch (d) {
        case NORTH: printf("Moving north\\n"); break;
        case SOUTH: printf("Moving south\\n"); break;
        case EAST:  printf("Moving east\\n"); break;
        case WEST:  printf("Moving west\\n"); break;
    }
}

enum Direction opposite(enum Direction d) {
    switch (d) {
        case NORTH: return SOUTH;
        case SOUTH: return NORTH;
        case EAST:  return WEST;
        case WEST:  return EAST;
    }
    return d;
}

int main(void) {
    enum Direction d = NORTH;
    move(d);
    enum Direction opp = opposite(d);
    move(opp);
    return 0;
}`,
      solution: `#include <stdio.h>

typedef enum { NORTH, SOUTH, EAST, WEST } Direction;

void move(Direction d) {
    switch (d) {
        case NORTH: printf("Moving north\\n"); break;
        case SOUTH: printf("Moving south\\n"); break;
        case EAST:  printf("Moving east\\n"); break;
        case WEST:  printf("Moving west\\n"); break;
    }
}

Direction opposite(Direction d) {
    switch (d) {
        case NORTH: return SOUTH;
        case SOUTH: return NORTH;
        case EAST:  return WEST;
        case WEST:  return EAST;
    }
    return d;
}

int main(void) {
    Direction d = NORTH;
    move(d);
    Direction opp = opposite(d);
    move(opp);
    return 0;
}`,
      hints: [
        'typedef enum { ... } Direction; replaces enum Direction.',
        'Now use Direction instead of enum Direction everywhere.',
        'Reduces verbosity without changing behavior.',
      ],
      concepts: ['typedef enum', 'enum alias', 'verbosity reduction'],
    },
    {
      id: 'c-typedef-17',
      title: 'Predict typedef scope',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Understand typedef scope rules.',
      skeleton: `#include <stdio.h>

typedef int Number;

void test(void) {
    typedef double Number;  // Shadows outer typedef
    Number x = 3.14;
    printf("%.2f\\n", x);
}

int main(void) {
    Number y = 42;
    printf("%d\\n", y);
    test();
    Number z = 100;
    printf("%d\\n", z);
    return 0;
}`,
      solution: `42
3.14
100`,
      hints: [
        'typedef follows normal C scoping rules.',
        'Inside test(), Number is double (inner typedef shadows outer).',
        'Outside test(), Number is still int.',
      ],
      concepts: ['typedef scope', 'shadowing', 'block scope'],
    },
    {
      id: 'c-typedef-18',
      title: 'Write generic container typedef',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Use typedef with void pointers to create a pseudo-generic container.',
      skeleton: `// Create a simple generic stack using typedef and void*:
// typedef struct { void **items; int top; int cap; } Stack;
// void stack_push(Stack *s, void *item);
// void *stack_pop(Stack *s);`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    void **items;
    int top;
    int cap;
} Stack;

void stack_init(Stack *s, int cap) {
    s->items = malloc(cap * sizeof(void *));
    s->top = -1;
    s->cap = cap;
}

void stack_push(Stack *s, void *item) {
    if (s->top < s->cap - 1) {
        s->items[++s->top] = item;
    }
}

void *stack_pop(Stack *s) {
    if (s->top >= 0) {
        return s->items[s->top--];
    }
    return NULL;
}

void stack_free(Stack *s) {
    free(s->items);
}

int main(void) {
    Stack s;
    stack_init(&s, 10);

    int a = 10, b = 20, c = 30;
    stack_push(&s, &a);
    stack_push(&s, &b);
    stack_push(&s, &c);

    int *val;
    while ((val = stack_pop(&s)) != NULL) {
        printf("%d ", *val);
    }
    printf("\\n");
    stack_free(&s);
    return 0;
}`,
      hints: [
        'void ** stores an array of generic pointers.',
        'Push stores the pointer; pop returns it.',
        'Caller casts back to the correct type.',
      ],
      concepts: ['generic container', 'void pointer array', 'stack implementation'],
    },
    {
      id: 'c-typedef-19',
      title: 'Fix typedef const confusion',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Fix the const correctness issue with a typedef pointer.',
      skeleton: `#include <stdio.h>

typedef char *String;

// Bug: Intends to make the string data const, but const String
// makes the POINTER const, not the data
void print(const String s) {
    // s[0] = 'X';  // This compiles! Data is NOT const
    // s = "other";  // This does NOT compile! Pointer is const
    printf("%s\\n", s);
}

int main(void) {
    char buf[] = "Hello";
    print(buf);
    return 0;
}`,
      solution: `#include <stdio.h>

void print(const char *s) {
    // s[0] = 'X';  // Now correctly prevented
    printf("%s\\n", s);
}

int main(void) {
    char buf[] = "Hello";
    print(buf);
    return 0;
}`,
      hints: [
        'const String means char * const (pointer is const).',
        'To make data const, you need const char * directly.',
        'Avoid hiding pointers in typedefs when const matters.',
      ],
      concepts: ['const typedef trap', 'pointer const', 'hidden pointer danger'],
    },
    {
      id: 'c-typedef-20',
      title: 'Predict nested typedef',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict behavior with chained typedef aliases.',
      skeleton: `#include <stdio.h>

typedef int Integer;
typedef Integer Number;
typedef Number *NumberPtr;

int main(void) {
    Number a = 42;
    NumberPtr p = &a;
    *p = 100;
    printf("%d\\n", a);
    printf("%zu %zu %zu\\n", sizeof(Integer), sizeof(Number), sizeof(int));
    return 0;
}`,
      solution: `100
4 4 4`,
      hints: [
        'Typedefs can chain: Number is Integer which is int.',
        'NumberPtr is Number * which is int *.',
        'All three sizeof values are the same: sizeof(int) = 4.',
      ],
      concepts: ['chained typedef', 'alias chain', 'type equivalence'],
    },
  ],
};
