import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-struct',
  title: '13. Structs',
  explanation: `## Structs in C

A struct groups related variables under one name.

\`\`\`c
struct Point {
    int x;
    int y;
};

struct Point p = {10, 20};
printf("(%d, %d)", p.x, p.y);
\`\`\`

### Key Concepts
- **Member access**: \`p.x\` (dot) or \`ptr->x\` (arrow for pointers)
- **Designated initializers**: \`{.x = 10, .y = 20}\` (C99)
- **Struct assignment**: copies all members
- **Padding and alignment**: compiler may insert padding bytes
- **Nested structs**: structs within structs
- **Self-referential**: pointer to own type (for linked structures)
`,
  exercises: [
    {
      id: 'c-struct-1',
      title: 'Define and initialize struct',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Define a struct and initialize it with values.',
      skeleton: `#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main(void) {
    struct Point p = {__BLANK__, __BLANK__};
    printf("(%d, %d)\\n", p.__BLANK__, p.__BLANK__);
    return 0;
}`,
      solution: `#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main(void) {
    struct Point p = {10, 20};
    printf("(%d, %d)\\n", p.x, p.y);
    return 0;
}`,
      hints: [
        'Initialize with {value1, value2} in declaration order.',
        'Access members with the dot operator: p.x, p.y.',
        'struct Point p declares a variable of that struct type.',
      ],
      concepts: ['struct definition', 'initialization', 'member access'],
    },
    {
      id: 'c-struct-2',
      title: 'Designated initializers',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use designated initializers for struct members.',
      skeleton: `#include <stdio.h>

struct Color {
    unsigned char r, g, b, a;
};

int main(void) {
    struct Color c = {
        __BLANK__ = 255,
        __BLANK__ = 128,
        __BLANK__ = 0,
        __BLANK__ = 255
    };
    printf("rgba(%d, %d, %d, %d)\\n", c.r, c.g, c.b, c.a);
    return 0;
}`,
      solution: `#include <stdio.h>

struct Color {
    unsigned char r, g, b, a;
};

int main(void) {
    struct Color c = {
        .r = 255,
        .g = 128,
        .b = 0,
        .a = 255
    };
    printf("rgba(%d, %d, %d, %d)\\n", c.r, c.g, c.b, c.a);
    return 0;
}`,
      hints: [
        'Designated initializers use .member = value syntax.',
        'Order does not matter with designated initializers.',
        'Unmentioned members are zero-initialized.',
      ],
      concepts: ['designated initializers', 'C99 feature', 'named initialization'],
    },
    {
      id: 'c-struct-3',
      title: 'Struct pointer and arrow',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Access struct members through a pointer.',
      skeleton: `#include <stdio.h>

struct Rect {
    int width;
    int height;
};

int area(struct Rect *r) {
    return r__BLANK__width * r__BLANK__height;
}

int main(void) {
    struct Rect r = {10, 5};
    printf("Area: %d\\n", area(__BLANK__));
    return 0;
}`,
      solution: `#include <stdio.h>

struct Rect {
    int width;
    int height;
};

int area(struct Rect *r) {
    return r->width * r->height;
}

int main(void) {
    struct Rect r = {10, 5};
    printf("Area: %d\\n", area(&r));
    return 0;
}`,
      hints: [
        'Use -> to access members through a pointer: r->width.',
        'r->width is shorthand for (*r).width.',
        'Pass &r to send the address of the struct.',
      ],
      concepts: ['arrow operator', 'struct pointer', 'pass by reference'],
    },
    {
      id: 'c-struct-4',
      title: 'Predict struct assignment',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the behavior of struct assignment (copy).',
      skeleton: `#include <stdio.h>

struct Vec2 { int x, y; };

int main(void) {
    struct Vec2 a = {3, 4};
    struct Vec2 b = a;
    b.x = 10;
    printf("%d %d\\n", a.x, a.y);
    printf("%d %d\\n", b.x, b.y);
    return 0;
}`,
      solution: `3 4
10 4`,
      hints: [
        'Struct assignment copies all members.',
        'b is a separate copy of a.',
        'Modifying b.x does not affect a.x.',
      ],
      concepts: ['struct copy', 'value semantics', 'assignment'],
    },
    {
      id: 'c-struct-5',
      title: 'Write struct constructor',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a function that creates and returns a struct.',
      skeleton: `// Define struct Student { char name[50]; int age; float gpa; };
// Write struct Student make_student(const char *name, int age, float gpa)
// that creates and returns a Student.`,
      solution: `#include <stdio.h>
#include <string.h>

struct Student {
    char name[50];
    int age;
    float gpa;
};

struct Student make_student(const char *name, int age, float gpa) {
    struct Student s;
    strncpy(s.name, name, sizeof(s.name) - 1);
    s.name[sizeof(s.name) - 1] = '\\0';
    s.age = age;
    s.gpa = gpa;
    return s;
}

int main(void) {
    struct Student s = make_student("Alice", 20, 3.8f);
    printf("%s, age %d, GPA %.1f\\n", s.name, s.age, s.gpa);
    return 0;
}`,
      hints: [
        'Structs can be returned by value in C.',
        'Use strncpy for safe string copying into fixed arrays.',
        'Always null-terminate after strncpy.',
      ],
      concepts: ['struct return', 'constructor pattern', 'strncpy safety'],
    },
    {
      id: 'c-struct-6',
      title: 'Nested structs',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Define and access nested struct members.',
      skeleton: `#include <stdio.h>

struct Address {
    char city[50];
    int zip;
};

struct Person {
    char name[50];
    struct Address __BLANK__;
};

int main(void) {
    struct Person p = {"Alice", {"Portland", 97201}};
    printf("%s lives in %s, %d\\n", p.name, p.__BLANK__.__BLANK__, p.addr.zip);
    return 0;
}`,
      solution: `#include <stdio.h>

struct Address {
    char city[50];
    int zip;
};

struct Person {
    char name[50];
    struct Address addr;
};

int main(void) {
    struct Person p = {"Alice", {"Portland", 97201}};
    printf("%s lives in %s, %d\\n", p.name, p.addr.city, p.addr.zip);
    return 0;
}`,
      hints: [
        'Nest a struct by declaring it as a member.',
        'Access nested members with chained dots: p.addr.city.',
        'Initialize nested structs with nested braces.',
      ],
      concepts: ['nested struct', 'chained access', 'nested initialization'],
    },
    {
      id: 'c-struct-7',
      title: 'Array of structs',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Work with an array of structs to find the highest scorer.',
      skeleton: `// Define struct Player { char name[30]; int score; };
// Write struct Player *top_scorer(struct Player players[], int count)
// that returns a pointer to the player with the highest score.`,
      solution: `#include <stdio.h>

struct Player {
    char name[30];
    int score;
};

struct Player *top_scorer(struct Player players[], int count) {
    struct Player *best = &players[0];
    for (int i = 1; i < count; i++) {
        if (players[i].score > best->score) {
            best = &players[i];
        }
    }
    return best;
}

int main(void) {
    struct Player team[] = {
        {"Alice", 42}, {"Bob", 85}, {"Charlie", 67}
    };
    struct Player *top = top_scorer(team, 3);
    printf("Top: %s with %d\\n", top->name, top->score);
    return 0;
}`,
      hints: [
        'Track a pointer to the best player found so far.',
        'Compare using players[i].score > best->score.',
        'Return a pointer to the element within the array.',
      ],
      concepts: ['array of structs', 'pointer return', 'linear search'],
    },
    {
      id: 'c-struct-8',
      title: 'Predict struct size',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict struct sizes considering padding and alignment.',
      skeleton: `#include <stdio.h>

struct A { char c; int i; };
struct B { int i; char c; };
struct C { char a; char b; int i; };

int main(void) {
    printf("%zu\\n", sizeof(struct A));
    printf("%zu\\n", sizeof(struct B));
    printf("%zu\\n", sizeof(struct C));
    return 0;
}`,
      solution: `8
8
8`,
      hints: [
        'int needs 4-byte alignment, so padding is inserted after char.',
        'struct A: 1 char + 3 padding + 4 int = 8.',
        'struct B: 4 int + 1 char + 3 padding = 8. struct C: 1+1+2pad+4 = 8.',
      ],
      concepts: ['struct padding', 'alignment', 'sizeof struct'],
    },
    {
      id: 'c-struct-9',
      title: 'Fix struct pointer bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the incorrect member access through a pointer.',
      skeleton: `#include <stdio.h>
#include <string.h>

struct Item {
    char name[30];
    double price;
};

void print_item(struct Item *item) {
    printf("%s: $%.2f\\n", item.name, item.price);  // Bug!
}

int main(void) {
    struct Item i = {"Widget", 9.99};
    print_item(&i);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

struct Item {
    char name[30];
    double price;
};

void print_item(struct Item *item) {
    printf("%s: $%.2f\\n", item->name, item->price);
}

int main(void) {
    struct Item i = {"Widget", 9.99};
    print_item(&i);
    return 0;
}`,
      hints: [
        'item is a pointer, not a struct value.',
        'Use -> instead of . for pointer access.',
        'item->name is equivalent to (*item).name.',
      ],
      concepts: ['dot vs arrow', 'pointer member access', 'common error'],
    },
    {
      id: 'c-struct-10',
      title: 'Struct with function pointer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Add a function pointer to a struct for basic polymorphism.',
      skeleton: `// Define struct Shape with:
//   double param1, param2;
//   double (*area)(struct Shape *self);
// Write circle and rectangle area functions.
// Create shapes and call their area functions.`,
      solution: `#include <stdio.h>

struct Shape {
    double param1;
    double param2;
    double (*area)(struct Shape *self);
};

double circle_area(struct Shape *self) {
    return 3.14159265 * self->param1 * self->param1;
}

double rect_area(struct Shape *self) {
    return self->param1 * self->param2;
}

int main(void) {
    struct Shape circle = {5.0, 0, circle_area};
    struct Shape rect = {4.0, 6.0, rect_area};

    printf("Circle area: %.2f\\n", circle.area(&circle));
    printf("Rect area: %.2f\\n", rect.area(&rect));
    return 0;
}`,
      hints: [
        'A function pointer member enables runtime dispatch.',
        'The function takes a self pointer to access struct data.',
        'This is the C equivalent of a method or virtual function.',
      ],
      concepts: ['function pointer member', 'polymorphism', 'self parameter'],
    },
    {
      id: 'c-struct-11',
      title: 'Fill-blank self-referential struct',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Define a self-referential struct for a linked list node.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct __BLANK__ *next;
};

int main(void) {
    struct Node a = {10, NULL};
    struct Node b = {20, __BLANK__};
    struct Node c = {30, &b};

    struct Node *p = &c;
    while (p != NULL) {
        printf("%d ", p->data);
        p = p__BLANK__next;
    }
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

int main(void) {
    struct Node a = {10, NULL};
    struct Node b = {20, &a};
    struct Node c = {30, &b};

    struct Node *p = &c;
    while (p != NULL) {
        printf("%d ", p->data);
        p = p->next;
    }
    printf("\\n");
    return 0;
}`,
      hints: [
        'A struct can contain a pointer to its own type.',
        'b.next should point to a: &a.',
        'Use -> to follow the next pointer: p->next.',
      ],
      concepts: ['self-referential struct', 'linked structure', 'traversal'],
    },
    {
      id: 'c-struct-12',
      title: 'Predict nested struct output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output of nested struct operations.',
      skeleton: `#include <stdio.h>

struct Inner { int a, b; };
struct Outer { struct Inner i; int c; };

int main(void) {
    struct Outer o = {{10, 20}, 30};
    struct Outer o2 = o;
    o2.i.a = 99;
    printf("%d %d %d\\n", o.i.a, o.i.b, o.c);
    printf("%d %d %d\\n", o2.i.a, o2.i.b, o2.c);
    return 0;
}`,
      solution: `10 20 30
99 20 30`,
      hints: [
        'Struct assignment performs a deep copy of all members.',
        'Modifying o2 does not affect o.',
        'Nested structs are fully copied, not shared.',
      ],
      concepts: ['deep copy', 'nested struct assignment', 'value semantics'],
    },
    {
      id: 'c-struct-13',
      title: 'Bit fields',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Use bit fields in a struct to pack flags efficiently.',
      skeleton: `// Define struct Flags with bit fields:
//   unsigned int read : 1;
//   unsigned int write : 1;
//   unsigned int execute : 1;
// Write void print_perms(struct Flags f) that prints rwx-style permissions.`,
      solution: `#include <stdio.h>

struct Flags {
    unsigned int read : 1;
    unsigned int write : 1;
    unsigned int execute : 1;
};

void print_perms(struct Flags f) {
    printf("%c%c%c\\n",
        f.read ? 'r' : '-',
        f.write ? 'w' : '-',
        f.execute ? 'x' : '-');
}

int main(void) {
    struct Flags f1 = {1, 1, 0};
    struct Flags f2 = {1, 0, 1};
    struct Flags f3 = {0, 0, 0};
    print_perms(f1);
    print_perms(f2);
    print_perms(f3);
    printf("sizeof(Flags) = %zu\\n", sizeof(struct Flags));
    return 0;
}`,
      hints: [
        'Bit fields specify the number of bits per member.',
        ':1 means the field uses only 1 bit (0 or 1).',
        'Bit fields pack multiple flags into minimal space.',
      ],
      concepts: ['bit fields', 'packing', 'flags'],
    },
    {
      id: 'c-struct-14',
      title: 'Fix struct shallow copy bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the shallow copy bug when struct contains a pointer.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Buffer {
    char *data;
    int len;
};

int main(void) {
    struct Buffer a;
    a.len = 6;
    a.data = malloc(a.len);
    strcpy(a.data, "Hello");

    struct Buffer b = a;  // Bug: shallow copy shares data pointer
    b.data[0] = 'J';      // Modifies a.data too!

    printf("a: %s\\n", a.data);  // Prints "Jello", not "Hello"
    printf("b: %s\\n", b.data);
    free(a.data);
    // free(b.data);  // Double free!
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Buffer {
    char *data;
    int len;
};

struct Buffer buffer_copy(struct Buffer *src) {
    struct Buffer dst;
    dst.len = src->len;
    dst.data = malloc(dst.len);
    memcpy(dst.data, src->data, dst.len);
    return dst;
}

int main(void) {
    struct Buffer a;
    a.len = 6;
    a.data = malloc(a.len);
    strcpy(a.data, "Hello");

    struct Buffer b = buffer_copy(&a);
    b.data[0] = 'J';

    printf("a: %s\\n", a.data);
    printf("b: %s\\n", b.data);
    free(a.data);
    free(b.data);
    return 0;
}`,
      hints: [
        'Struct assignment copies the pointer, not the pointed-to data.',
        'Both a.data and b.data point to the same memory.',
        'Write a deep copy function that allocates new memory for b.data.',
      ],
      concepts: ['shallow copy', 'deep copy', 'pointer aliasing'],
    },
    {
      id: 'c-struct-15',
      title: 'Refactor to use struct',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Refactor loose parameters into a struct.',
      skeleton: `#include <stdio.h>

void draw_circle(int cx, int cy, int radius, int r, int g, int b) {
    printf("Circle at (%d,%d) r=%d color=(%d,%d,%d)\\n",
           cx, cy, radius, r, g, b);
}

int main(void) {
    draw_circle(100, 200, 50, 255, 0, 0);
    draw_circle(300, 400, 30, 0, 255, 0);
    return 0;
}`,
      solution: `#include <stdio.h>

struct Color { int r, g, b; };
struct Circle { int cx, cy, radius; struct Color color; };

void draw_circle(struct Circle *c) {
    printf("Circle at (%d,%d) r=%d color=(%d,%d,%d)\\n",
           c->cx, c->cy, c->radius,
           c->color.r, c->color.g, c->color.b);
}

int main(void) {
    struct Circle c1 = {100, 200, 50, {255, 0, 0}};
    struct Circle c2 = {300, 400, 30, {0, 255, 0}};
    draw_circle(&c1);
    draw_circle(&c2);
    return 0;
}`,
      hints: [
        'Group related parameters into structs.',
        'A Circle struct holds position, radius, and color.',
        'Pass a pointer to the struct instead of many individual args.',
      ],
      concepts: ['parameter grouping', 'struct design', 'refactoring'],
    },
    {
      id: 'c-struct-16',
      title: 'Struct comparison',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function to compare two structs for equality.',
      skeleton: `// Define struct Date { int year, month, day; };
// Write int date_equal(struct Date a, struct Date b) that returns 1 if equal.
// Note: you cannot use == on structs in C.`,
      solution: `#include <stdio.h>

struct Date { int year, month, day; };

int date_equal(struct Date a, struct Date b) {
    return a.year == b.year && a.month == b.month && a.day == b.day;
}

int date_compare(struct Date a, struct Date b) {
    if (a.year != b.year) return a.year - b.year;
    if (a.month != b.month) return a.month - b.month;
    return a.day - b.day;
}

int main(void) {
    struct Date d1 = {2025, 3, 15};
    struct Date d2 = {2025, 3, 15};
    struct Date d3 = {2025, 12, 1};
    printf("Equal: %d\\n", date_equal(d1, d2));
    printf("Equal: %d\\n", date_equal(d1, d3));
    printf("Compare: %d\\n", date_compare(d1, d3) < 0);
    return 0;
}`,
      hints: [
        'C does not support == for structs.',
        'Compare each member individually.',
        'For ordering, compare fields in priority order.',
      ],
      concepts: ['struct comparison', 'equality function', 'comparison function'],
    },
    {
      id: 'c-struct-17',
      title: 'Predict sizeof with bit fields',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Predict the output related to bit field behavior.',
      skeleton: `#include <stdio.h>

struct Packed {
    unsigned int a : 3;
    unsigned int b : 5;
    unsigned int c : 8;
};

int main(void) {
    struct Packed p = {7, 31, 200};
    printf("%u %u %u\\n", p.a, p.b, p.c);
    p.a = 8;  // 8 doesn't fit in 3 bits (max 7)
    printf("%u\\n", p.a);
    return 0;
}`,
      solution: `7 31 200
0`,
      hints: [
        '3 bits can hold 0-7, 5 bits hold 0-31, 8 bits hold 0-255.',
        '8 in binary is 1000, but only 3 bits are stored: 000 = 0.',
        'Overflow in bit fields wraps silently.',
      ],
      concepts: ['bit field overflow', 'bit width limits', 'truncation'],
    },
    {
      id: 'c-struct-18',
      title: 'Refactor parallel arrays to struct array',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor parallel arrays into an array of structs.',
      skeleton: `#include <stdio.h>

int main(void) {
    char *names[] = {"Alice", "Bob", "Charlie"};
    int ages[] = {25, 30, 35};
    float gpas[] = {3.8f, 3.5f, 3.9f};

    for (int i = 0; i < 3; i++) {
        printf("%s: age %d, GPA %.1f\\n", names[i], ages[i], gpas[i]);
    }
    return 0;
}`,
      solution: `#include <stdio.h>

struct Student {
    const char *name;
    int age;
    float gpa;
};

int main(void) {
    struct Student students[] = {
        {"Alice", 25, 3.8f},
        {"Bob", 30, 3.5f},
        {"Charlie", 35, 3.9f}
    };

    for (int i = 0; i < 3; i++) {
        printf("%s: age %d, GPA %.1f\\n",
               students[i].name, students[i].age, students[i].gpa);
    }
    return 0;
}`,
      hints: [
        'Parallel arrays are error-prone -- indices can get out of sync.',
        'Group related data into a struct for each entity.',
        'An array of structs is easier to maintain and extend.',
      ],
      concepts: ['parallel arrays', 'struct of arrays vs array of structs', 'data organization'],
    },
    {
      id: 'c-struct-19',
      title: 'Heap-allocated struct',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write functions to create and destroy a heap-allocated struct.',
      skeleton: `// Define struct Config { char *host; int port; int timeout; };
// Write Config *config_new(const char *host, int port, int timeout)
// and void config_free(Config *c).
// The host string must be duplicated.`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *host;
    int port;
    int timeout;
} Config;

Config *config_new(const char *host, int port, int timeout) {
    Config *c = malloc(sizeof(Config));
    if (!c) return NULL;
    c->host = malloc(strlen(host) + 1);
    if (!c->host) { free(c); return NULL; }
    strcpy(c->host, host);
    c->port = port;
    c->timeout = timeout;
    return c;
}

void config_free(Config *c) {
    if (c) {
        free(c->host);
        free(c);
    }
}

int main(void) {
    Config *cfg = config_new("localhost", 8080, 30);
    if (cfg) {
        printf("%s:%d (timeout %ds)\\n", cfg->host, cfg->port, cfg->timeout);
        config_free(cfg);
    }
    return 0;
}`,
      hints: [
        'Allocate the struct, then allocate and copy the string.',
        'On partial failure, free what was allocated.',
        'config_free must free both the string and the struct.',
      ],
      concepts: ['heap struct', 'constructor/destructor', 'ownership'],
    },
    {
      id: 'c-struct-20',
      title: 'Fix uninitialized struct member',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the bug caused by using an uninitialized struct member.',
      skeleton: `#include <stdio.h>

struct Stats {
    int count;
    double total;
    double average;
};

void compute_average(struct Stats *s) {
    s->average = s->total / s->count;
}

int main(void) {
    struct Stats s;
    s.total = 100.0;
    // Bug: count is uninitialized, could be 0 or garbage
    compute_average(&s);
    printf("Average: %.2f\\n", s.average);
    return 0;
}`,
      solution: `#include <stdio.h>

struct Stats {
    int count;
    double total;
    double average;
};

void compute_average(struct Stats *s) {
    if (s->count > 0) {
        s->average = s->total / s->count;
    } else {
        s->average = 0.0;
    }
}

int main(void) {
    struct Stats s = {0};
    s.count = 5;
    s.total = 100.0;
    compute_average(&s);
    printf("Average: %.2f\\n", s.average);
    return 0;
}`,
      hints: [
        'Uninitialized struct members contain garbage values.',
        'Use = {0} to zero-initialize all members.',
        'Also guard against division by zero in compute_average.',
      ],
      concepts: ['uninitialized members', 'zero initialization', 'division by zero'],
    },
  ],
};
