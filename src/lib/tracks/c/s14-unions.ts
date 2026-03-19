import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-union',
  title: '14. Unions',
  explanation: `## Unions in C

A union stores multiple members in the **same memory location**. Only one member is valid at a time.

\`\`\`c
union Value {
    int i;
    float f;
    char c;
};
union Value v;
v.i = 42;      // store as int
printf("%d", v.i); // OK
// v.f is now meaningless (type punning aside)
\`\`\`

### Key Concepts
- **Size**: sizeof(union) = sizeof(largest member)
- **Tagged union**: pair with an enum to track which member is active
- **Type punning**: reading a different member than was last written (implementation-defined)
- **Anonymous unions**: C11 feature for embedding in structs
`,
  exercises: [
    {
      id: 'c-union-1',
      title: 'Basic union declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Declare a union and use its members.',
      skeleton: `#include <stdio.h>

__BLANK__ Data {
    int i;
    float f;
    char str[20];
};

int main(void) {
    __BLANK__ Data d;
    d.i = 42;
    printf("Integer: %d\\n", d.__BLANK__);
    d.f = 3.14f;
    printf("Float: %.2f\\n", d.f);
    return 0;
}`,
      solution: `#include <stdio.h>

union Data {
    int i;
    float f;
    char str[20];
};

int main(void) {
    union Data d;
    d.i = 42;
    printf("Integer: %d\\n", d.i);
    d.f = 3.14f;
    printf("Float: %.2f\\n", d.f);
    return 0;
}`,
      hints: [
        'Use the union keyword instead of struct.',
        'Syntax is the same as struct but members share memory.',
        'Only the last written member is valid.',
      ],
      concepts: ['union declaration', 'member access', 'shared memory'],
    },
    {
      id: 'c-union-2',
      title: 'Union size',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the size of a union.',
      skeleton: `#include <stdio.h>

union Mix {
    char c;
    int i;
    double d;
};

int main(void) {
    printf("%zu\\n", sizeof(union Mix));
    printf("%zu\\n", sizeof(double));
    return 0;
}`,
      solution: `8
8`,
      hints: [
        'A union is as large as its biggest member.',
        'double is typically 8 bytes.',
        'sizeof(union Mix) == sizeof(double) == 8.',
      ],
      concepts: ['union size', 'largest member', 'sizeof'],
    },
    {
      id: 'c-union-3',
      title: 'Tagged union',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Implement a tagged union (discriminated union) pattern.',
      skeleton: `// Define an enum ValueType { INT_VAL, FLOAT_VAL, STRING_VAL };
// Define a struct Value with a type tag and a union of int/float/char[32].
// Write void print_value(struct Value *v) that prints based on the tag.`,
      solution: `#include <stdio.h>
#include <string.h>

enum ValueType { INT_VAL, FLOAT_VAL, STRING_VAL };

struct Value {
    enum ValueType type;
    union {
        int i;
        float f;
        char s[32];
    } data;
};

void print_value(struct Value *v) {
    switch (v->type) {
        case INT_VAL: printf("Int: %d\\n", v->data.i); break;
        case FLOAT_VAL: printf("Float: %.2f\\n", v->data.f); break;
        case STRING_VAL: printf("String: %s\\n", v->data.s); break;
    }
}

int main(void) {
    struct Value v1 = {INT_VAL, {.i = 42}};
    struct Value v2 = {FLOAT_VAL, {.f = 3.14f}};
    struct Value v3 = {STRING_VAL};
    strcpy(v3.data.s, "Hello");
    print_value(&v1);
    print_value(&v2);
    print_value(&v3);
    return 0;
}`,
      hints: [
        'Use an enum to track which union member is active.',
        'Switch on the type tag to determine how to access data.',
        'This is a fundamental C pattern for variant types.',
      ],
      concepts: ['tagged union', 'discriminated union', 'variant type'],
    },
    {
      id: 'c-union-4',
      title: 'Fill-blank anonymous union',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use an anonymous union inside a struct (C11).',
      skeleton: `#include <stdio.h>

struct Event {
    int type;  // 0=key, 1=mouse
    __BLANK__ {
        struct { int keycode; } key;
        struct { int x, y, button; } mouse;
    };
};

int main(void) {
    struct Event e = {.type = 1, .mouse = {100, 200, 1}};
    if (e.type == 1) {
        printf("Mouse click at (%d, %d)\\n", e.__BLANK__.x, e.mouse.__BLANK__);
    }
    return 0;
}`,
      solution: `#include <stdio.h>

struct Event {
    int type;
    union {
        struct { int keycode; } key;
        struct { int x, y, button; } mouse;
    };
};

int main(void) {
    struct Event e = {.type = 1, .mouse = {100, 200, 1}};
    if (e.type == 1) {
        printf("Mouse click at (%d, %d)\\n", e.mouse.x, e.mouse.y);
    }
    return 0;
}`,
      hints: [
        'Anonymous union has no name -- members accessed directly.',
        'union { ... }; without a name inside a struct.',
        'Access like e.mouse.x instead of e.u.mouse.x.',
      ],
      concepts: ['anonymous union', 'C11 feature', 'event pattern'],
    },
    {
      id: 'c-union-5',
      title: 'Type punning with union',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Observe type punning behavior through a union.',
      skeleton: `#include <stdio.h>

union Pun {
    float f;
    unsigned int u;
};

int main(void) {
    union Pun p;
    p.f = 1.0f;
    printf("%u\\n", p.u);
    // IEEE 754: 1.0f = 0x3F800000 = 1065353216
    return 0;
}`,
      solution: `1065353216`,
      hints: [
        'Writing to p.f and reading p.u shows the raw bits.',
        '1.0f in IEEE 754 is 0x3F800000.',
        '0x3F800000 as unsigned int is 1065353216.',
      ],
      concepts: ['type punning', 'IEEE 754', 'bit representation'],
    },
    {
      id: 'c-union-6',
      title: 'Fix wrong union member access',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the bug where the wrong union member is read.',
      skeleton: `#include <stdio.h>

union Number {
    int i;
    float f;
};

int main(void) {
    union Number n;
    n.f = 3.14f;
    printf("Value: %d\\n", n.i);  // Bug: reading int after writing float
    return 0;
}`,
      solution: `#include <stdio.h>

union Number {
    int i;
    float f;
};

int main(void) {
    union Number n;
    n.f = 3.14f;
    printf("Value: %.2f\\n", n.f);
    return 0;
}`,
      hints: [
        'Only the last written member is valid to read.',
        'n.f was written, so read n.f, not n.i.',
        'Reading the wrong member gives meaningless data.',
      ],
      concepts: ['active member', 'union safety', 'member mismatch'],
    },
    {
      id: 'c-union-7',
      title: 'Union for byte extraction',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use a union to extract individual bytes from an integer.',
      skeleton: `// Write a program that uses a union to extract the 4 bytes
// of a 32-bit integer and print them in hex.
// Union should have: uint32_t word; uint8_t bytes[4];`,
      solution: `#include <stdio.h>
#include <stdint.h>

union ByteView {
    uint32_t word;
    uint8_t bytes[4];
};

int main(void) {
    union ByteView bv;
    bv.word = 0xDEADBEEF;

    printf("Word: 0x%08X\\n", bv.word);
    printf("Bytes:");
    for (int i = 0; i < 4; i++) {
        printf(" 0x%02X", bv.bytes[i]);
    }
    printf("\\n");
    return 0;
}`,
      hints: [
        'A union overlays the int and byte array in the same memory.',
        'Writing to word and reading bytes shows individual bytes.',
        'Byte order depends on endianness (little-endian on x86).',
      ],
      concepts: ['byte extraction', 'endianness', 'memory overlay'],
    },
    {
      id: 'c-union-8',
      title: 'Fill-blank union initialization',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Initialize a union with designated initializers.',
      skeleton: `#include <stdio.h>

union Token {
    int integer;
    double decimal;
    char string[32];
};

int main(void) {
    union Token t1 = {__BLANK__ = 42};
    union Token t2 = {__BLANK__ = 3.14};
    printf("t1: %d\\n", t1.integer);
    printf("t2: %.2f\\n", t2.decimal);
    return 0;
}`,
      solution: `#include <stdio.h>

union Token {
    int integer;
    double decimal;
    char string[32];
};

int main(void) {
    union Token t1 = {.integer = 42};
    union Token t2 = {.decimal = 3.14};
    printf("t1: %d\\n", t1.integer);
    printf("t2: %.2f\\n", t2.decimal);
    return 0;
}`,
      hints: [
        'Use designated initializers: {.member = value}.',
        'Without designators, only the first member can be initialized.',
        'Designated initializers let you pick any member.',
      ],
      concepts: ['union initialization', 'designated initializer', 'first member rule'],
    },
    {
      id: 'c-union-9',
      title: 'Predict union overwrite',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output when union members overwrite each other.',
      skeleton: `#include <stdio.h>
#include <string.h>

union Data {
    int num;
    char str[20];
};

int main(void) {
    union Data d;
    d.num = 65;
    printf("%c\\n", d.str[0]);
    strcpy(d.str, "Hi");
    printf("%s\\n", d.str);
    printf("%d\\n", d.num == 65);
    return 0;
}`,
      solution: `A
Hi
0`,
      hints: [
        '65 is the ASCII code for A. On little-endian, str[0] = 65 = A.',
        'strcpy overwrites the shared memory with "Hi".',
        'd.num is now corrupted by the string data, so d.num != 65.',
      ],
      concepts: ['shared memory', 'overwrite', 'ASCII interpretation'],
    },
    {
      id: 'c-union-10',
      title: 'JSON-like variant type',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Implement a JSON-like variant value type using tagged unions.',
      skeleton: `// Implement a JsonValue that can be:
//   null, boolean, number (double), or string (char[64])
// Use an enum for the type tag.
// Write void json_print(JsonValue *v) to print the value.`,
      solution: `#include <stdio.h>
#include <string.h>

typedef enum {
    JSON_NULL, JSON_BOOL, JSON_NUMBER, JSON_STRING
} JsonType;

typedef struct {
    JsonType type;
    union {
        int boolean;
        double number;
        char string[64];
    };
} JsonValue;

void json_print(JsonValue *v) {
    switch (v->type) {
        case JSON_NULL: printf("null"); break;
        case JSON_BOOL: printf("%s", v->boolean ? "true" : "false"); break;
        case JSON_NUMBER: printf("%g", v->number); break;
        case JSON_STRING: printf("\\"%s\\"", v->string); break;
    }
    printf("\\n");
}

int main(void) {
    JsonValue vals[] = {
        {JSON_NULL},
        {JSON_BOOL, {.boolean = 1}},
        {JSON_NUMBER, {.number = 3.14}},
        {JSON_STRING}
    };
    strcpy(vals[3].string, "hello");
    for (int i = 0; i < 4; i++) json_print(&vals[i]);
    return 0;
}`,
      hints: [
        'Combine an enum tag with a union of possible values.',
        'Anonymous union (C11) lets you access members without a name.',
        'Switch on the tag in the print function.',
      ],
      concepts: ['variant type', 'JSON value', 'tagged union pattern'],
    },
    {
      id: 'c-union-11',
      title: 'Fix missing type tag',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the tagged union that forgets to set the type tag.',
      skeleton: `#include <stdio.h>

enum Type { T_INT, T_FLOAT };

struct Var {
    enum Type type;
    union { int i; float f; } val;
};

void set_float(struct Var *v, float f) {
    v->val.f = f;
    // Bug: forgot to set v->type = T_FLOAT
}

void print_var(struct Var *v) {
    if (v->type == T_INT) printf("Int: %d\\n", v->val.i);
    else printf("Float: %.2f\\n", v->val.f);
}

int main(void) {
    struct Var v = {T_INT, {.i = 42}};
    print_var(&v);
    set_float(&v, 3.14f);
    print_var(&v);  // Bug: prints as int because type not updated
    return 0;
}`,
      solution: `#include <stdio.h>

enum Type { T_INT, T_FLOAT };

struct Var {
    enum Type type;
    union { int i; float f; } val;
};

void set_float(struct Var *v, float f) {
    v->type = T_FLOAT;
    v->val.f = f;
}

void print_var(struct Var *v) {
    if (v->type == T_INT) printf("Int: %d\\n", v->val.i);
    else printf("Float: %.2f\\n", v->val.f);
}

int main(void) {
    struct Var v = {T_INT, {.i = 42}};
    print_var(&v);
    set_float(&v, 3.14f);
    print_var(&v);
    return 0;
}`,
      hints: [
        'When changing the union member, always update the type tag.',
        'Forgetting the tag leads to reading the wrong member.',
        'Add v->type = T_FLOAT before setting v->val.f.',
      ],
      concepts: ['type tag consistency', 'tagged union invariant', 'setter function'],
    },
    {
      id: 'c-union-12',
      title: 'Union for IP address',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use a union to represent an IP address as both bytes and a 32-bit integer.',
      skeleton: `// Define a union IPAddr with:
//   uint32_t addr;
//   uint8_t octets[4];
// Write void print_ip(union IPAddr ip) that prints in dotted notation.`,
      solution: `#include <stdio.h>
#include <stdint.h>

union IPAddr {
    uint32_t addr;
    uint8_t octets[4];
};

void print_ip(union IPAddr ip) {
    printf("%u.%u.%u.%u\\n",
        ip.octets[0], ip.octets[1],
        ip.octets[2], ip.octets[3]);
}

int main(void) {
    union IPAddr ip;
    ip.octets[0] = 192;
    ip.octets[1] = 168;
    ip.octets[2] = 1;
    ip.octets[3] = 100;
    print_ip(ip);
    printf("Raw: 0x%08X\\n", ip.addr);
    return 0;
}`,
      hints: [
        'The union overlays 4 bytes with a 32-bit integer.',
        'Set individual octets and read as a whole or vice versa.',
        'Byte order depends on system endianness.',
      ],
      concepts: ['IP address representation', 'byte overlay', 'network programming'],
    },
    {
      id: 'c-union-13',
      title: 'Predict union size with array',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the size of unions containing different-sized members.',
      skeleton: `#include <stdio.h>

union A { char c; int i; };
union B { char str[100]; int i; };
union C { double d; char c; int i; };

int main(void) {
    printf("%zu\\n", sizeof(union A));
    printf("%zu\\n", sizeof(union B));
    printf("%zu\\n", sizeof(union C));
    return 0;
}`,
      solution: `4
100
8`,
      hints: [
        'Union size = size of largest member (with alignment).',
        'union A: largest is int (4). union B: largest is char[100].',
        'union C: largest is double (8).',
      ],
      concepts: ['union size', 'largest member rule', 'alignment'],
    },
    {
      id: 'c-union-14',
      title: 'Refactor if-else to tagged union',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor from using void pointers to a proper tagged union.',
      skeleton: `#include <stdio.h>
#include <string.h>

// Messy: uses void* and type codes
void print_value(int type, void *data) {
    if (type == 0) printf("%d\\n", *(int *)data);
    else if (type == 1) printf("%.2f\\n", *(double *)data);
    else if (type == 2) printf("%s\\n", (char *)data);
}

int main(void) {
    int i = 42;
    double d = 3.14;
    char s[] = "hello";
    print_value(0, &i);
    print_value(1, &d);
    print_value(2, s);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

typedef enum { VAL_INT, VAL_DOUBLE, VAL_STRING } ValType;

typedef struct {
    ValType type;
    union {
        int i;
        double d;
        char s[64];
    };
} Value;

void print_value(Value *v) {
    switch (v->type) {
        case VAL_INT: printf("%d\\n", v->i); break;
        case VAL_DOUBLE: printf("%.2f\\n", v->d); break;
        case VAL_STRING: printf("%s\\n", v->s); break;
    }
}

int main(void) {
    Value vals[] = {
        {VAL_INT, {.i = 42}},
        {VAL_DOUBLE, {.d = 3.14}},
        {VAL_STRING}
    };
    strcpy(vals[2].s, "hello");
    for (int i = 0; i < 3; i++) print_value(&vals[i]);
    return 0;
}`,
      hints: [
        'Replace void* with a tagged union for type safety.',
        'The enum replaces magic numbers for type codes.',
        'Switch on the enum instead of if-else chains.',
      ],
      concepts: ['type safety', 'tagged union refactor', 'void pointer elimination'],
    },
    {
      id: 'c-union-15',
      title: 'Fill-blank endianness check',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use a union to detect system endianness.',
      skeleton: `#include <stdio.h>
#include <stdint.h>

int is_little_endian(void) {
    union {
        uint32_t __BLANK__;
        uint8_t __BLANK__[4];
    } test;
    test.word = 1;
    return test.__BLANK__[0] == 1;
}

int main(void) {
    if (is_little_endian()) {
        printf("Little-endian\\n");
    } else {
        printf("Big-endian\\n");
    }
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdint.h>

int is_little_endian(void) {
    union {
        uint32_t word;
        uint8_t bytes[4];
    } test;
    test.word = 1;
    return test.bytes[0] == 1;
}

int main(void) {
    if (is_little_endian()) {
        printf("Little-endian\\n");
    } else {
        printf("Big-endian\\n");
    }
    return 0;
}`,
      hints: [
        'In little-endian, the least significant byte comes first.',
        'If word=1, bytes[0]==1 means little-endian.',
        'If bytes[0]==0, the 1 is in bytes[3] (big-endian).',
      ],
      concepts: ['endianness detection', 'byte order', 'union type punning'],
    },
    {
      id: 'c-union-16',
      title: 'Write color union',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use a union to access a 32-bit color as individual channels or a packed integer.',
      skeleton: `// Define union Color32 with:
//   uint32_t packed;
//   struct { uint8_t r, g, b, a; } channels;
// Write functions to create from channels and extract channels.`,
      solution: `#include <stdio.h>
#include <stdint.h>

union Color32 {
    uint32_t packed;
    struct { uint8_t r, g, b, a; } channels;
};

union Color32 make_color(uint8_t r, uint8_t g, uint8_t b, uint8_t a) {
    union Color32 c;
    c.channels.r = r;
    c.channels.g = g;
    c.channels.b = b;
    c.channels.a = a;
    return c;
}

void print_color(union Color32 c) {
    printf("RGBA(%d, %d, %d, %d) = 0x%08X\\n",
        c.channels.r, c.channels.g,
        c.channels.b, c.channels.a, c.packed);
}

int main(void) {
    union Color32 red = make_color(255, 0, 0, 255);
    union Color32 green = make_color(0, 255, 0, 128);
    print_color(red);
    print_color(green);
    return 0;
}`,
      hints: [
        'The struct inside the union maps bytes to named channels.',
        'packed gives the whole color as one 32-bit value.',
        'This is common in graphics and game programming.',
      ],
      concepts: ['color packing', 'struct in union', 'graphics pattern'],
    },
    {
      id: 'c-union-17',
      title: 'Fix union array access',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the bug where string is too long for the union member.',
      skeleton: `#include <stdio.h>
#include <string.h>

union Token {
    int number;
    char text[8];
};

int main(void) {
    union Token t;
    strcpy(t.text, "overflow_this_buffer");  // Bug: buffer overflow
    printf("%s\\n", t.text);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

union Token {
    int number;
    char text[8];
};

int main(void) {
    union Token t;
    strncpy(t.text, "overflow_this_buffer", sizeof(t.text) - 1);
    t.text[sizeof(t.text) - 1] = '\\0';
    printf("%s\\n", t.text);
    return 0;
}`,
      hints: [
        'strcpy does not check bounds, causing buffer overflow.',
        'Use strncpy with sizeof(t.text) - 1 to prevent overflow.',
        'Always null-terminate after strncpy.',
      ],
      concepts: ['buffer overflow', 'strncpy', 'bounds checking'],
    },
    {
      id: 'c-union-18',
      title: 'Refactor to use union',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor a struct that wastes memory into one using a union.',
      skeleton: `#include <stdio.h>
#include <string.h>

// Wasteful: all fields always allocated, only one used at a time
struct Setting {
    int type;  // 0=int, 1=float, 2=string
    int int_val;
    float float_val;
    char str_val[64];
};

void print_setting(struct Setting *s) {
    switch (s->type) {
        case 0: printf("%d\\n", s->int_val); break;
        case 1: printf("%.2f\\n", s->float_val); break;
        case 2: printf("%s\\n", s->str_val); break;
    }
}

int main(void) {
    struct Setting s = {2};
    strcpy(s.str_val, "dark_mode");
    print_setting(&s);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

typedef enum { SET_INT, SET_FLOAT, SET_STRING } SetType;

typedef struct {
    SetType type;
    union {
        int int_val;
        float float_val;
        char str_val[64];
    };
} Setting;

void print_setting(Setting *s) {
    switch (s->type) {
        case SET_INT: printf("%d\\n", s->int_val); break;
        case SET_FLOAT: printf("%.2f\\n", s->float_val); break;
        case SET_STRING: printf("%s\\n", s->str_val); break;
    }
}

int main(void) {
    Setting s = {SET_STRING};
    strcpy(s.str_val, "dark_mode");
    print_setting(&s);
    return 0;
}`,
      hints: [
        'Since only one value type is active at a time, use a union.',
        'This saves memory: union size = max(int, float, char[64]).',
        'The struct had int + float + char[64] always allocated.',
      ],
      concepts: ['memory efficiency', 'union optimization', 'tagged union'],
    },
    {
      id: 'c-union-19',
      title: 'Predict type punning float',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Predict the sign bit of a float using union type punning.',
      skeleton: `#include <stdio.h>
#include <stdint.h>

union FloatBits {
    float f;
    uint32_t u;
};

int main(void) {
    union FloatBits fb;
    fb.f = -1.0f;
    printf("%d\\n", (fb.u >> 31) & 1);
    fb.f = 1.0f;
    printf("%d\\n", (fb.u >> 31) & 1);
    return 0;
}`,
      solution: `1
0`,
      hints: [
        'IEEE 754: the highest bit (bit 31) is the sign bit.',
        '-1.0f has sign bit = 1.',
        '1.0f has sign bit = 0.',
      ],
      concepts: ['IEEE 754 sign bit', 'bit extraction', 'type punning'],
    },
    {
      id: 'c-union-20',
      title: 'Write register simulation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Simulate a CPU register that can be accessed as 8/16/32 bits.',
      skeleton: `// Simulate a 32-bit register that can be accessed as:
//   uint32_t eax (full 32 bits)
//   uint16_t ax  (lower 16 bits)
//   struct { uint8_t al, ah; } (low and high bytes of ax)
// Use nested unions/structs.`,
      solution: `#include <stdio.h>
#include <stdint.h>

union Register {
    uint32_t eax;
    uint16_t ax;
    struct {
        uint8_t al;
        uint8_t ah;
    };
};

int main(void) {
    union Register reg = {0};
    reg.eax = 0x12345678;

    printf("EAX: 0x%08X\\n", reg.eax);
    printf("AX:  0x%04X\\n", reg.ax);
    printf("AL:  0x%02X\\n", reg.al);
    printf("AH:  0x%02X\\n", reg.ah);

    reg.al = 0xFF;
    printf("After AL=0xFF, EAX: 0x%08X\\n", reg.eax);
    return 0;
}`,
      hints: [
        'On little-endian, ax overlaps the lower 16 bits of eax.',
        'al is the lowest byte, ah is the second byte.',
        'Modifying al changes just that byte of eax.',
      ],
      concepts: ['register simulation', 'nested union', 'partial access'],
    },
  ],
};
