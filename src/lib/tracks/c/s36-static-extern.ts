import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-statex',
  title: '36. Static & Extern',
  explanation: `## Static & Extern

The \`static\` and \`extern\` storage-class specifiers control linkage and lifetime of variables and functions across translation units.

\`\`\`c
// file1.c
int global_var = 42;           // external linkage by default
static int file_local = 10;   // internal linkage -- visible only in file1.c

void public_func(void) { }    // external linkage
static void helper(void) { }  // internal linkage

void count(void) {
    static int calls = 0;     // persists across calls
    calls++;
}

// file2.c
extern int global_var;         // declaration -- defined in file1.c
\`\`\`

### Key Concepts
- **static local variable**: retains its value between function calls; initialized once
- **static function**: internal linkage -- only visible within the current translation unit
- **static global variable**: internal linkage -- hides the variable from other files
- **extern**: declares a variable or function that is defined in another translation unit
- **storage duration**: static duration means the variable exists for the entire program lifetime
- **linkage**: external (visible everywhere), internal (file-only), or none (local)
`,
  exercises: [
    {
      id: 'c-statex-1',
      title: 'Static local variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use a static local variable to count the number of times a function is called.',
      skeleton: `#include <stdio.h>

int call_count(void) {
    __BLANK__ int count = 0;
    count++;
    return count;
}

int main(void) {
    printf("%d\\n", call_count());
    printf("%d\\n", call_count());
    printf("%d\\n", call_count());
    return 0;
}`,
      solution: `#include <stdio.h>

int call_count(void) {
    static int count = 0;
    count++;
    return count;
}

int main(void) {
    printf("%d\\n", call_count());
    printf("%d\\n", call_count());
    printf("%d\\n", call_count());
    return 0;
}`,
      hints: [
        'A static local variable persists between function calls.',
        'It is initialized only once, when the program starts.',
        'Without static, count would reset to 0 on every call.',
      ],
      concepts: ['static', 'local-variables', 'storage-duration'],
    },
    {
      id: 'c-statex-2',
      title: 'Extern declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use extern to declare a variable that is defined in another file.',
      skeleton: `// In config.c: int max_connections = 100;

// In main.c:
#include <stdio.h>

__BLANK__ int max_connections;

int main(void) {
    printf("Max connections: %d\\n", max_connections);
    return 0;
}`,
      solution: `// In config.c: int max_connections = 100;

// In main.c:
#include <stdio.h>

extern int max_connections;

int main(void) {
    printf("Max connections: %d\\n", max_connections);
    return 0;
}`,
      hints: [
        'extern declares a variable without defining it.',
        'The actual definition (with initialization) lives in config.c.',
        'The linker resolves the reference at link time.',
      ],
      concepts: ['extern', 'linkage', 'multi-file'],
    },
    {
      id: 'c-statex-3',
      title: 'Static function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Make the helper function visible only within the current file by using the correct keyword.',
      skeleton: `#include <stdio.h>

__BLANK__ int square(int x) {
    return x * x;
}

void print_square(int x) {
    printf("%d squared = %d\\n", x, square(x));
}

int main(void) {
    print_square(5);
    return 0;
}`,
      solution: `#include <stdio.h>

static int square(int x) {
    return x * x;
}

void print_square(int x) {
    printf("%d squared = %d\\n", x, square(x));
}

int main(void) {
    print_square(5);
    return 0;
}`,
      hints: [
        'static before a function gives it internal linkage.',
        'Other translation units cannot call a static function.',
        'This is a common pattern for private helper functions.',
      ],
      concepts: ['static', 'functions', 'internal-linkage'],
    },
    {
      id: 'c-statex-4',
      title: 'Static global variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Make the global variable file-private so other files cannot access it.',
      skeleton: `#include <stdio.h>

__BLANK__ int error_count = 0;

void log_error(const char *msg) {
    error_count++;
    printf("Error #%d: %s\\n", error_count, msg);
}

int get_error_count(void) {
    return error_count;
}

int main(void) {
    log_error("file not found");
    log_error("permission denied");
    printf("Total errors: %d\\n", get_error_count());
    return 0;
}`,
      solution: `#include <stdio.h>

static int error_count = 0;

void log_error(const char *msg) {
    error_count++;
    printf("Error #%d: %s\\n", error_count, msg);
}

int get_error_count(void) {
    return error_count;
}

int main(void) {
    log_error("file not found");
    log_error("permission denied");
    printf("Total errors: %d\\n", get_error_count());
    return 0;
}`,
      hints: [
        'static on a global variable gives it internal linkage.',
        'Other files cannot use extern to access a static global.',
        'Access is provided through public functions like get_error_count.',
      ],
      concepts: ['static', 'global-variables', 'encapsulation'],
    },
    {
      id: 'c-statex-5',
      title: 'Extern with header pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete the header file pattern for sharing a global variable across files.',
      skeleton: `// config.h
#ifndef CONFIG_H
#define CONFIG_H

__BLANK__ int verbose_mode;

#endif

// config.c
#include "config.h"
int verbose_mode = 0;  // definition

// main.c
#include <stdio.h>
#include "config.h"

int main(void) {
    verbose_mode = 1;
    printf("Verbose: %d\\n", verbose_mode);
    return 0;
}`,
      solution: `// config.h
#ifndef CONFIG_H
#define CONFIG_H

extern int verbose_mode;

#endif

// config.c
#include "config.h"
int verbose_mode = 0;  // definition

// main.c
#include <stdio.h>
#include "config.h"

int main(void) {
    verbose_mode = 1;
    printf("Verbose: %d\\n", verbose_mode);
    return 0;
}`,
      hints: [
        'Headers should contain extern declarations, not definitions.',
        'The definition (with optional initializer) goes in exactly one .c file.',
        'All files that include the header see the same extern declaration.',
      ],
      concepts: ['extern', 'header-files', 'multi-file', 'linkage'],
    },
    {
      id: 'c-statex-6',
      title: 'Static local for lazy init',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use a static local variable to implement a lazy-initialized singleton buffer.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *get_buffer(void) {
    __BLANK__ char *buf = NULL;
    if (buf == NULL) {
        buf = malloc(1024);
        memset(buf, 0, 1024);
        printf("Buffer allocated\\n");
    }
    return buf;
}

int main(void) {
    char *b1 = get_buffer();
    char *b2 = get_buffer();
    printf("Same buffer: %s\\n", (b1 == b2) ? "yes" : "no");
    free(b1);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *get_buffer(void) {
    static char *buf = NULL;
    if (buf == NULL) {
        buf = malloc(1024);
        memset(buf, 0, 1024);
        printf("Buffer allocated\\n");
    }
    return buf;
}

int main(void) {
    char *b1 = get_buffer();
    char *b2 = get_buffer();
    printf("Same buffer: %s\\n", (b1 == b2) ? "yes" : "no");
    free(b1);
    return 0;
}`,
      hints: [
        'static preserves the pointer across calls so malloc happens only once.',
        'The first call allocates; subsequent calls return the same pointer.',
        'This is a common pattern for lazy initialization.',
      ],
      concepts: ['static', 'lazy-initialization', 'singleton-pattern'],
    },
    {
      id: 'c-statex-7',
      title: 'Write a static counter module',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write three functions: counter_increment(), counter_decrement(), and counter_get() that share a static file-scope counter variable. The counter starts at 0.',
      skeleton: `#include <stdio.h>

// Write counter module here (static variable + 3 functions)

int main(void) {
    counter_increment();
    counter_increment();
    counter_increment();
    counter_decrement();
    printf("Counter: %d\\n", counter_get()); // should print 2
    return 0;
}`,
      solution: `#include <stdio.h>

static int counter = 0;

void counter_increment(void) {
    counter++;
}

void counter_decrement(void) {
    counter--;
}

int counter_get(void) {
    return counter;
}

int main(void) {
    counter_increment();
    counter_increment();
    counter_increment();
    counter_decrement();
    printf("Counter: %d\\n", counter_get()); // should print 2
    return 0;
}`,
      hints: [
        'Declare a static int at file scope to hide it from other files.',
        'Provide public functions to manipulate the hidden state.',
        'This encapsulation pattern is the C equivalent of a private field.',
      ],
      concepts: ['static', 'encapsulation', 'module-pattern'],
    },
    {
      id: 'c-statex-8',
      title: 'Write a unique ID generator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a function next_id() that returns a unique incrementing integer starting from 1, using a static local variable.',
      skeleton: `#include <stdio.h>

// Write next_id here

int main(void) {
    printf("ID: %d\\n", next_id()); // 1
    printf("ID: %d\\n", next_id()); // 2
    printf("ID: %d\\n", next_id()); // 3
    return 0;
}`,
      solution: `#include <stdio.h>

int next_id(void) {
    static int id = 0;
    return ++id;
}

int main(void) {
    printf("ID: %d\\n", next_id()); // 1
    printf("ID: %d\\n", next_id()); // 2
    printf("ID: %d\\n", next_id()); // 3
    return 0;
}`,
      hints: [
        'Use a static local variable initialized to 0.',
        'Increment before returning so the first ID is 1.',
        'The static variable persists across all calls to next_id.',
      ],
      concepts: ['static', 'local-variables', 'id-generation'],
    },
    {
      id: 'c-statex-9',
      title: 'Write an extern-based shared config',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a set of functions and an extern declaration pattern for a shared debug_level variable. Include init_config(), set_debug_level(), and get_debug_level().',
      skeleton: `#include <stdio.h>

// Simulate multi-file with extern pattern
// Write: global debug_level, init_config, set_debug_level, get_debug_level

int main(void) {
    init_config();
    printf("Debug level: %d\\n", get_debug_level()); // 0
    set_debug_level(3);
    printf("Debug level: %d\\n", get_debug_level()); // 3
    return 0;
}`,
      solution: `#include <stdio.h>

int debug_level;  // definition -- in a real project this is in config.c

void init_config(void) {
    debug_level = 0;
}

void set_debug_level(int level) {
    debug_level = level;
}

int get_debug_level(void) {
    return debug_level;
}

int main(void) {
    init_config();
    printf("Debug level: %d\\n", get_debug_level()); // 0
    set_debug_level(3);
    printf("Debug level: %d\\n", get_debug_level()); // 3
    return 0;
}`,
      hints: [
        'Define debug_level as a global int (external linkage by default).',
        'In a multi-file project, the header would have extern int debug_level.',
        'Provide accessor functions for controlled access to the global.',
      ],
      concepts: ['extern', 'global-variables', 'module-pattern'],
    },
    {
      id: 'c-statex-10',
      title: 'Write a static lookup table',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function day_name() that returns the name of a day (0=Sunday). Use a static const array inside the function for the lookup table.',
      skeleton: `#include <stdio.h>

// Write day_name here

int main(void) {
    for (int i = 0; i < 7; i++) {
        printf("%d: %s\\n", i, day_name(i));
    }
    return 0;
}`,
      solution: `#include <stdio.h>

const char *day_name(int day) {
    static const char *names[] = {
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    };
    if (day < 0 || day > 6) return "Invalid";
    return names[day];
}

int main(void) {
    for (int i = 0; i < 7; i++) {
        printf("%d: %s\\n", i, day_name(i));
    }
    return 0;
}`,
      hints: [
        'static const inside the function creates a persistent read-only table.',
        'The array is only initialized once and lives for the program lifetime.',
        'Return a pointer to the string literal -- it is safe since it is in static storage.',
      ],
      concepts: ['static', 'const', 'lookup-table'],
    },
    {
      id: 'c-statex-11',
      title: 'Write a static helper with public API',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a module with a static helper function clamp() (not visible externally) and a public function normalize() that uses it. clamp(val, min, max) restricts val to [min, max]. normalize(val) clamps val to [0, 100].',
      skeleton: `#include <stdio.h>

// Write static clamp and public normalize here

int main(void) {
    printf("%d\\n", normalize(-5));   // 0
    printf("%d\\n", normalize(50));   // 50
    printf("%d\\n", normalize(200));  // 100
    return 0;
}`,
      solution: `#include <stdio.h>

static int clamp(int val, int min, int max) {
    if (val < min) return min;
    if (val > max) return max;
    return val;
}

int normalize(int val) {
    return clamp(val, 0, 100);
}

int main(void) {
    printf("%d\\n", normalize(-5));   // 0
    printf("%d\\n", normalize(50));   // 50
    printf("%d\\n", normalize(200));  // 100
    return 0;
}`,
      hints: [
        'Mark clamp as static so it has internal linkage.',
        'normalize is the public interface that delegates to clamp.',
        'This hides implementation details from other translation units.',
      ],
      concepts: ['static', 'internal-linkage', 'encapsulation', 'api-design'],
    },
    {
      id: 'c-statex-12',
      title: 'Write a ring buffer with static state',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write rb_push(int val) and rb_pop(int *out) using static file-scope arrays. Ring buffer size is 4. rb_push returns 0 on success, -1 if full. rb_pop returns 0 on success, -1 if empty.',
      skeleton: `#include <stdio.h>

// Write ring buffer module with static state here

int main(void) {
    rb_push(10);
    rb_push(20);
    rb_push(30);
    int val;
    rb_pop(&val); printf("%d\\n", val); // 10
    rb_pop(&val); printf("%d\\n", val); // 20
    rb_push(40);
    rb_push(50);
    rb_pop(&val); printf("%d\\n", val); // 30
    return 0;
}`,
      solution: `#include <stdio.h>

#define RB_SIZE 4

static int rb_buf[RB_SIZE];
static int rb_head = 0;
static int rb_tail = 0;
static int rb_count = 0;

int rb_push(int val) {
    if (rb_count == RB_SIZE) return -1;
    rb_buf[rb_tail] = val;
    rb_tail = (rb_tail + 1) % RB_SIZE;
    rb_count++;
    return 0;
}

int rb_pop(int *out) {
    if (rb_count == 0) return -1;
    *out = rb_buf[rb_head];
    rb_head = (rb_head + 1) % RB_SIZE;
    rb_count--;
    return 0;
}

int main(void) {
    rb_push(10);
    rb_push(20);
    rb_push(30);
    int val;
    rb_pop(&val); printf("%d\\n", val); // 10
    rb_pop(&val); printf("%d\\n", val); // 20
    rb_push(40);
    rb_push(50);
    rb_pop(&val); printf("%d\\n", val); // 30
    return 0;
}`,
      hints: [
        'Use static file-scope variables for the buffer, head, tail, and count.',
        'Use modulo arithmetic to wrap head and tail around the buffer size.',
        'Check count to determine if the buffer is full or empty.',
      ],
      concepts: ['static', 'ring-buffer', 'data-structures', 'encapsulation'],
    },
    {
      id: 'c-statex-13',
      title: 'Bug: missing extern causes linker error',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the code so that main.c can access the global variable defined in data.c.',
      skeleton: `// data.c
int shared_value = 42;

// main.c
#include <stdio.h>

// BUG: missing declaration -- linker error
int main(void) {
    printf("Value: %d\\n", shared_value);
    return 0;
}`,
      solution: `// data.c
int shared_value = 42;

// main.c
#include <stdio.h>

extern int shared_value;

int main(void) {
    printf("Value: %d\\n", shared_value);
    return 0;
}`,
      hints: [
        'main.c needs an extern declaration to reference shared_value.',
        'extern tells the compiler the variable is defined elsewhere.',
        'Without it, the compiler treats shared_value as undeclared.',
      ],
      concepts: ['extern', 'linkage', 'linker-errors'],
    },
    {
      id: 'c-statex-14',
      title: 'Bug: static variable reinitialization',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the function so the running total is preserved between calls instead of resetting each time.',
      skeleton: `#include <stdio.h>

int accumulate(int val) {
    int total = 0;  // BUG: resets every call
    total += val;
    return total;
}

int main(void) {
    printf("%d\\n", accumulate(5));  // should print 5
    printf("%d\\n", accumulate(3));  // should print 8
    printf("%d\\n", accumulate(2));  // should print 10
    return 0;
}`,
      solution: `#include <stdio.h>

int accumulate(int val) {
    static int total = 0;
    total += val;
    return total;
}

int main(void) {
    printf("%d\\n", accumulate(5));  // should print 5
    printf("%d\\n", accumulate(3));  // should print 8
    printf("%d\\n", accumulate(2));  // should print 10
    return 0;
}`,
      hints: [
        'Without static, total is reinitialized to 0 on every call.',
        'Adding static makes total persist between calls.',
        'static int total = 0 is only initialized once.',
      ],
      concepts: ['static', 'local-variables', 'persistence'],
    },
    {
      id: 'c-statex-15',
      title: 'Bug: static function not accessible',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the code where a helper function marked static cannot be called from another file. The intent is for compute() to be the public API and helper() to remain private.',
      skeleton: `// math_utils.c
#include <stdio.h>

static int helper(int x) {
    return x * x + 1;
}

static int compute(int x) {  // BUG: should be public
    return helper(x) + helper(x - 1);
}

// main.c
#include <stdio.h>

extern int compute(int x);

int main(void) {
    printf("Result: %d\\n", compute(5));
    return 0;
}`,
      solution: `// math_utils.c
#include <stdio.h>

static int helper(int x) {
    return x * x + 1;
}

int compute(int x) {
    return helper(x) + helper(x - 1);
}

// main.c
#include <stdio.h>

extern int compute(int x);

int main(void) {
    printf("Result: %d\\n", compute(5));
    return 0;
}`,
      hints: [
        'compute is the public API and should not be static.',
        'Remove static from compute so it has external linkage.',
        'helper should remain static since it is an internal implementation detail.',
      ],
      concepts: ['static', 'extern', 'linkage', 'api-design'],
    },
    {
      id: 'c-statex-16',
      title: 'Predict: static local persistence',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output. Pay attention to how the static variable persists.',
      skeleton: `#include <stdio.h>

void tick(void) {
    static int t = 0;
    t++;
    printf("%d ", t);
}

int main(void) {
    tick();
    tick();
    tick();
    printf("\\n");
    return 0;
}`,
      solution: `1 2 3 `,
      hints: [
        'static int t = 0 is initialized once, not on each call.',
        't increments and retains its value between calls.',
        'First call: t=1, second: t=2, third: t=3.',
      ],
      concepts: ['static', 'local-variables', 'persistence'],
    },
    {
      id: 'c-statex-17',
      title: 'Predict: multiple static locals',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output of this program with two functions each having their own static local.',
      skeleton: `#include <stdio.h>

int inc_a(void) {
    static int a = 0;
    return ++a;
}

int inc_b(void) {
    static int a = 10;
    return ++a;
}

int main(void) {
    printf("%d %d\\n", inc_a(), inc_b());
    printf("%d %d\\n", inc_a(), inc_b());
    return 0;
}`,
      solution: `1 11
2 12`,
      hints: [
        'Each function has its own independent static variable named a.',
        'inc_a starts from 0, inc_b starts from 10.',
        'They do not share state despite having the same local name.',
      ],
      concepts: ['static', 'local-variables', 'scope'],
    },
    {
      id: 'c-statex-18',
      title: 'Predict: extern and definition order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output. Consider how extern references the same variable.',
      skeleton: `#include <stdio.h>

int x = 5;

void modify(void) {
    extern int x;
    x += 10;
}

int main(void) {
    printf("%d\\n", x);
    modify();
    printf("%d\\n", x);
    modify();
    printf("%d\\n", x);
    return 0;
}`,
      solution: `5
15
25`,
      hints: [
        'extern int x inside modify() refers to the global x defined above.',
        'Each call to modify() adds 10 to the same global x.',
        'First print: 5, after first modify: 15, after second: 25.',
      ],
      concepts: ['extern', 'global-variables', 'linkage'],
    },
    {
      id: 'c-statex-19',
      title: 'Refactor: extract static module',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor this code to use proper static encapsulation. The internal array and size should be static file-scope variables, and only the add/get/count functions should be public.',
      skeleton: `#include <stdio.h>

int items[100];
int item_count = 0;

void add_item(int val) {
    if (item_count < 100) {
        items[item_count++] = val;
    }
}

int get_item(int index) {
    if (index >= 0 && index < item_count) {
        return items[index];
    }
    return -1;
}

int count_items(void) {
    return item_count;
}

int main(void) {
    add_item(10);
    add_item(20);
    add_item(30);
    printf("Count: %d\\n", count_items());
    printf("Item 1: %d\\n", get_item(1));
    return 0;
}`,
      solution: `#include <stdio.h>

static int items[100];
static int item_count = 0;

void add_item(int val) {
    if (item_count < 100) {
        items[item_count++] = val;
    }
}

int get_item(int index) {
    if (index >= 0 && index < item_count) {
        return items[index];
    }
    return -1;
}

int count_items(void) {
    return item_count;
}

int main(void) {
    add_item(10);
    add_item(20);
    add_item(30);
    printf("Count: %d\\n", count_items());
    printf("Item 1: %d\\n", get_item(1));
    return 0;
}`,
      hints: [
        'Mark items and item_count as static to hide them from other files.',
        'The functions add_item, get_item, and count_items remain non-static (public).',
        'This prevents other files from directly manipulating the internal array.',
      ],
      concepts: ['static', 'encapsulation', 'refactoring', 'module-pattern'],
    },
    {
      id: 'c-statex-20',
      title: 'Refactor: replace global with static local',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor this code to eliminate the global variable by using a static local inside the function. The logger should maintain state without any global.',
      skeleton: `#include <stdio.h>
#include <string.h>

int log_count = 0;
char last_message[256] = "";

void log_message(const char *msg) {
    log_count++;
    strncpy(last_message, msg, 255);
    last_message[255] = '\\0';
    printf("[%d] %s\\n", log_count, msg);
}

const char *get_last_message(void) {
    return last_message;
}

int get_log_count(void) {
    return log_count;
}

int main(void) {
    log_message("Starting");
    log_message("Processing");
    printf("Last: %s\\n", get_last_message());
    printf("Count: %d\\n", get_log_count());
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

static int *get_count_ptr(void) {
    static int log_count = 0;
    return &log_count;
}

static char *get_msg_buf(void) {
    static char last_message[256] = "";
    return last_message;
}

void log_message(const char *msg) {
    int *count = get_count_ptr();
    char *buf = get_msg_buf();
    (*count)++;
    strncpy(buf, msg, 255);
    buf[255] = '\\0';
    printf("[%d] %s\\n", *count, msg);
}

const char *get_last_message(void) {
    return get_msg_buf();
}

int get_log_count(void) {
    return *get_count_ptr();
}

int main(void) {
    log_message("Starting");
    log_message("Processing");
    printf("Last: %s\\n", get_last_message());
    printf("Count: %d\\n", get_log_count());
    return 0;
}`,
      hints: [
        'Replace each global with a static local inside a private accessor function.',
        'The accessor returns a pointer to the static local so other functions can use it.',
        'Mark the accessor functions static for internal linkage.',
      ],
      concepts: ['static', 'refactoring', 'encapsulation', 'global-elimination'],
    },
  ],
};
