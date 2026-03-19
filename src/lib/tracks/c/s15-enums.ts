import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-enum',
  title: '15. Enums',
  explanation: `## Enums in C

An enum defines a set of named integer constants.

\`\`\`c
enum Color { RED, GREEN, BLUE };
// RED=0, GREEN=1, BLUE=2

enum Status { OK = 200, NOT_FOUND = 404, ERROR = 500 };
\`\`\`

### Key Concepts
- Values default to 0, 1, 2, ... unless explicitly set
- Enums are just integers -- no type safety enforced
- Can be used as array indices, switch cases, and bit flags
- **Bit flags pattern**: use powers of 2 for combinable flags
- **Conventional naming**: ALL_CAPS for enum values
`,
  exercises: [
    {
      id: 'c-enum-1',
      title: 'Basic enum declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Declare an enum and use its values.',
      skeleton: `#include <stdio.h>

__BLANK__ Day { MON, TUE, WED, THU, FRI, SAT, SUN };

int main(void) {
    enum Day today = __BLANK__;
    printf("Wednesday = %d\\n", today);
    printf("Friday = %d\\n", __BLANK__);
    return 0;
}`,
      solution: `#include <stdio.h>

enum Day { MON, TUE, WED, THU, FRI, SAT, SUN };

int main(void) {
    enum Day today = WED;
    printf("Wednesday = %d\\n", today);
    printf("Friday = %d\\n", FRI);
    return 0;
}`,
      hints: [
        'enum keyword defines named constants.',
        'Values start at 0: MON=0, TUE=1, WED=2.',
        'WED is 2, FRI is 4.',
      ],
      concepts: ['enum declaration', 'auto numbering', 'named constants'],
    },
    {
      id: 'c-enum-2',
      title: 'Custom enum values',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Assign specific values to enum members.',
      skeleton: `#include <stdio.h>

enum HttpStatus {
    OK __BLANK__ 200,
    CREATED __BLANK__ 201,
    NOT_FOUND __BLANK__ 404,
    SERVER_ERROR __BLANK__ 500
};

int main(void) {
    enum HttpStatus s = NOT_FOUND;
    printf("Status: %d\\n", s);
    return 0;
}`,
      solution: `#include <stdio.h>

enum HttpStatus {
    OK = 200,
    CREATED = 201,
    NOT_FOUND = 404,
    SERVER_ERROR = 500
};

int main(void) {
    enum HttpStatus s = NOT_FOUND;
    printf("Status: %d\\n", s);
    return 0;
}`,
      hints: [
        'Use = to assign specific values to enum members.',
        'Each member can have any integer value.',
        'Members without = get previous + 1.',
      ],
      concepts: ['custom values', 'HTTP status', 'explicit assignment'],
    },
    {
      id: 'c-enum-3',
      title: 'Predict enum values',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict enum auto-numbering when some values are explicit.',
      skeleton: `#include <stdio.h>

enum Vals { A, B = 10, C, D = 20, E };

int main(void) {
    printf("%d %d %d %d %d\\n", A, B, C, D, E);
    return 0;
}`,
      solution: `0 10 11 20 21`,
      hints: [
        'A has no assignment, so A = 0.',
        'B = 10, so C = 11 (B + 1).',
        'D = 20, so E = 21 (D + 1).',
      ],
      concepts: ['auto numbering', 'continuation', 'mixed values'],
    },
    {
      id: 'c-enum-4',
      title: 'Enum with switch',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use an enum in a switch statement to convert to a string.',
      skeleton: `// Define enum Season { SPRING, SUMMER, FALL, WINTER };
// Write const char *season_name(enum Season s) that returns
// the name as a string using a switch statement.`,
      solution: `#include <stdio.h>

enum Season { SPRING, SUMMER, FALL, WINTER };

const char *season_name(enum Season s) {
    switch (s) {
        case SPRING: return "Spring";
        case SUMMER: return "Summer";
        case FALL:   return "Fall";
        case WINTER: return "Winter";
        default:     return "Unknown";
    }
}

int main(void) {
    for (int i = SPRING; i <= WINTER; i++) {
        printf("%d: %s\\n", i, season_name(i));
    }
    return 0;
}`,
      hints: [
        'Switch on the enum value and return the appropriate string.',
        'Always include a default case for safety.',
        'Enum values can be iterated as integers.',
      ],
      concepts: ['enum switch', 'to-string pattern', 'exhaustive switch'],
    },
    {
      id: 'c-enum-5',
      title: 'Bit flag enum',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Define bit flags using an enum with powers of 2.',
      skeleton: `#include <stdio.h>

enum Permission {
    PERM_READ    = __BLANK__,
    PERM_WRITE   = __BLANK__,
    PERM_EXECUTE = __BLANK__
};

int main(void) {
    int perms = PERM_READ | PERM_EXECUTE;
    printf("Read: %d\\n", (perms & PERM_READ) != 0);
    printf("Write: %d\\n", (perms & PERM_WRITE) != 0);
    printf("Execute: %d\\n", (perms & PERM_EXECUTE) != 0);
    return 0;
}`,
      solution: `#include <stdio.h>

enum Permission {
    PERM_READ    = 1,
    PERM_WRITE   = 2,
    PERM_EXECUTE = 4
};

int main(void) {
    int perms = PERM_READ | PERM_EXECUTE;
    printf("Read: %d\\n", (perms & PERM_READ) != 0);
    printf("Write: %d\\n", (perms & PERM_WRITE) != 0);
    printf("Execute: %d\\n", (perms & PERM_EXECUTE) != 0);
    return 0;
}`,
      hints: [
        'Use powers of 2: 1, 2, 4, 8, 16...',
        'Each flag occupies a unique bit position.',
        'Combine with | (OR), test with & (AND).',
      ],
      concepts: ['bit flags', 'powers of 2', 'bitwise operations'],
    },
    {
      id: 'c-enum-6',
      title: 'Enum as array index',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use enum values as array indices for a lookup table.',
      skeleton: `// Define enum Color { RED, GREEN, BLUE, COLOR_COUNT };
// Create a string array indexed by Color values.
// Write void print_all_colors(void).`,
      solution: `#include <stdio.h>

enum Color { RED, GREEN, BLUE, COLOR_COUNT };

const char *color_names[COLOR_COUNT] = {
    [RED]   = "Red",
    [GREEN] = "Green",
    [BLUE]  = "Blue"
};

void print_all_colors(void) {
    for (int i = 0; i < COLOR_COUNT; i++) {
        printf("%d: %s\\n", i, color_names[i]);
    }
}

int main(void) {
    print_all_colors();
    printf("Lookup: %s\\n", color_names[GREEN]);
    return 0;
}`,
      hints: [
        'Add a COUNT member at the end for array sizing.',
        'Use designated initializers: [RED] = "Red".',
        'This is a common C pattern for enum-to-string mapping.',
      ],
      concepts: ['enum as index', 'lookup table', 'COUNT pattern'],
    },
    {
      id: 'c-enum-7',
      title: 'Predict bit flag operations',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the result of bit flag operations.',
      skeleton: `#include <stdio.h>

enum Flags { A = 1, B = 2, C = 4, D = 8 };

int main(void) {
    int f = A | C;
    printf("%d\\n", f);
    f |= D;
    printf("%d\\n", f);
    f &= ~C;
    printf("%d\\n", f);
    printf("%d\\n", (f & A) != 0);
    printf("%d\\n", (f & C) != 0);
    return 0;
}`,
      solution: `5
13
9
1
0`,
      hints: [
        'A|C = 1|4 = 5. f|=D = 5|8 = 13.',
        '~C = ~4 flips all bits. f & ~C clears the C bit: 13 & ~4 = 9.',
        '9 & 1 = 1 (A set). 9 & 4 = 0 (C cleared).',
      ],
      concepts: ['set flag', 'clear flag', 'test flag'],
    },
    {
      id: 'c-enum-8',
      title: 'Fix enum comparison',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the incorrect enum value comparison.',
      skeleton: `#include <stdio.h>

enum Level { LOW, MEDIUM, HIGH };

const char *level_str(enum Level l) {
    if (l == 0) return "Low";
    if (l == 1) return "Medium";
    if (l == 2) return "High";
    return "Unknown";
}

int main(void) {
    // Bug: using magic numbers instead of enum names
    printf("%s\\n", level_str(LOW));
    printf("%s\\n", level_str(MEDIUM));
    printf("%s\\n", level_str(HIGH));
    return 0;
}`,
      solution: `#include <stdio.h>

enum Level { LOW, MEDIUM, HIGH };

const char *level_str(enum Level l) {
    if (l == LOW) return "Low";
    if (l == MEDIUM) return "Medium";
    if (l == HIGH) return "High";
    return "Unknown";
}

int main(void) {
    printf("%s\\n", level_str(LOW));
    printf("%s\\n", level_str(MEDIUM));
    printf("%s\\n", level_str(HIGH));
    return 0;
}`,
      hints: [
        'Using 0, 1, 2 instead of enum names defeats the purpose.',
        'If enum values change, magic numbers silently break.',
        'Always use the named constants for readability and safety.',
      ],
      concepts: ['magic numbers', 'enum names', 'maintainability'],
    },
    {
      id: 'c-enum-9',
      title: 'State machine with enum',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Implement a simple state machine using enums.',
      skeleton: `// Define enum State { IDLE, RUNNING, PAUSED, STOPPED };
// Write enum State next_state(enum State current, char input)
// Transitions: IDLE + 'r' -> RUNNING, RUNNING + 'p' -> PAUSED,
// PAUSED + 'r' -> RUNNING, any + 's' -> STOPPED`,
      solution: `#include <stdio.h>

enum State { IDLE, RUNNING, PAUSED, STOPPED };

const char *state_name(enum State s) {
    switch (s) {
        case IDLE: return "IDLE";
        case RUNNING: return "RUNNING";
        case PAUSED: return "PAUSED";
        case STOPPED: return "STOPPED";
    }
    return "UNKNOWN";
}

enum State next_state(enum State current, char input) {
    if (input == 's') return STOPPED;
    switch (current) {
        case IDLE:
            if (input == 'r') return RUNNING;
            break;
        case RUNNING:
            if (input == 'p') return PAUSED;
            break;
        case PAUSED:
            if (input == 'r') return RUNNING;
            break;
        case STOPPED:
            break;
    }
    return current;
}

int main(void) {
    enum State s = IDLE;
    char inputs[] = {'r', 'p', 'r', 's'};
    for (int i = 0; i < 4; i++) {
        s = next_state(s, inputs[i]);
        printf("Input '%c' -> %s\\n", inputs[i], state_name(s));
    }
    return 0;
}`,
      hints: [
        'Use the current state and input to determine the next state.',
        'Switch on the current state, check the input inside.',
        'Return current state if no valid transition exists.',
      ],
      concepts: ['state machine', 'enum transitions', 'finite automaton'],
    },
    {
      id: 'c-enum-10',
      title: 'Fill-blank flag manipulation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Set, clear, and toggle bit flags.',
      skeleton: `#include <stdio.h>

enum Style {
    BOLD      = 1,
    ITALIC    = 2,
    UNDERLINE = 4
};

int main(void) {
    int style = 0;
    style __BLANK__ BOLD;        // Set bold
    style __BLANK__ UNDERLINE;   // Set underline
    style __BLANK__ ~BOLD;       // Clear bold
    style __BLANK__ ITALIC;      // Toggle italic

    printf("Bold: %d\\n", (style & BOLD) != 0);
    printf("Italic: %d\\n", (style & ITALIC) != 0);
    printf("Underline: %d\\n", (style & UNDERLINE) != 0);
    return 0;
}`,
      solution: `#include <stdio.h>

enum Style {
    BOLD      = 1,
    ITALIC    = 2,
    UNDERLINE = 4
};

int main(void) {
    int style = 0;
    style |= BOLD;
    style |= UNDERLINE;
    style &= ~BOLD;
    style ^= ITALIC;

    printf("Bold: %d\\n", (style & BOLD) != 0);
    printf("Italic: %d\\n", (style & ITALIC) != 0);
    printf("Underline: %d\\n", (style & UNDERLINE) != 0);
    return 0;
}`,
      hints: [
        'Set: |= (OR). Clear: &= ~ (AND NOT). Toggle: ^= (XOR).',
        '|= BOLD sets the bold bit.',
        '&= ~BOLD clears the bold bit.',
      ],
      concepts: ['set flag', 'clear flag', 'toggle flag'],
    },
    {
      id: 'c-enum-11',
      title: 'Enum with typedef',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use typedef to avoid writing enum keyword repeatedly.',
      skeleton: `#include <stdio.h>

__BLANK__ enum { SUCCESS, FAILURE, PENDING } Result;

int main(void) {
    __BLANK__ r = SUCCESS;
    if (r == SUCCESS) {
        printf("Operation succeeded\\n");
    }
    return 0;
}`,
      solution: `#include <stdio.h>

typedef enum { SUCCESS, FAILURE, PENDING } Result;

int main(void) {
    Result r = SUCCESS;
    if (r == SUCCESS) {
        printf("Operation succeeded\\n");
    }
    return 0;
}`,
      hints: [
        'typedef creates an alias so you can write Result instead of enum Result.',
        'typedef enum { ... } Name; is a common C pattern.',
        'Now use Result directly without the enum keyword.',
      ],
      concepts: ['typedef enum', 'type alias', 'cleaner syntax'],
    },
    {
      id: 'c-enum-12',
      title: 'Predict enum sizeof',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the size of an enum.',
      skeleton: `#include <stdio.h>

enum Small { X, Y, Z };
enum Big { A = 1000000 };

int main(void) {
    printf("%zu\\n", sizeof(enum Small));
    printf("%zu\\n", sizeof(enum Big));
    printf("%zu\\n", sizeof(int));
    return 0;
}`,
      solution: `4
4
4`,
      hints: [
        'In C, enums are typically stored as int.',
        'sizeof(enum) == sizeof(int) on most compilers.',
        'Even small enums use a full int (4 bytes on most systems).',
      ],
      concepts: ['enum size', 'underlying type', 'int storage'],
    },
    {
      id: 'c-enum-13',
      title: 'Error code enum',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Design an error code system using enums.',
      skeleton: `// Define enum Error { ERR_NONE = 0, ERR_MEMORY, ERR_IO, ERR_PARSE, ERR_COUNT };
// Write const char *error_message(enum Error e) using a lookup table.
// Write int do_operation(int x) that returns an error code.`,
      solution: `#include <stdio.h>

enum Error { ERR_NONE = 0, ERR_MEMORY, ERR_IO, ERR_PARSE, ERR_COUNT };

static const char *error_messages[ERR_COUNT] = {
    [ERR_NONE]   = "No error",
    [ERR_MEMORY] = "Out of memory",
    [ERR_IO]     = "I/O error",
    [ERR_PARSE]  = "Parse error"
};

const char *error_message(enum Error e) {
    if (e >= 0 && e < ERR_COUNT) return error_messages[e];
    return "Unknown error";
}

enum Error do_operation(int x) {
    if (x < 0) return ERR_PARSE;
    if (x == 0) return ERR_IO;
    return ERR_NONE;
}

int main(void) {
    int tests[] = {1, 0, -5};
    for (int i = 0; i < 3; i++) {
        enum Error e = do_operation(tests[i]);
        printf("op(%d): %s\\n", tests[i], error_message(e));
    }
    return 0;
}`,
      hints: [
        'ERR_NONE = 0 means success, non-zero means error.',
        'Use a lookup table indexed by error code for messages.',
        'ERR_COUNT at the end gives the total number of error codes.',
      ],
      concepts: ['error codes', 'lookup table', 'error handling pattern'],
    },
    {
      id: 'c-enum-14',
      title: 'Fix missing enum case',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the switch statement that misses an enum case.',
      skeleton: `#include <stdio.h>

enum Shape { CIRCLE, SQUARE, TRIANGLE, PENTAGON };

const char *shape_name(enum Shape s) {
    switch (s) {
        case CIRCLE:   return "Circle";
        case SQUARE:   return "Square";
        case TRIANGLE: return "Triangle";
        // Bug: PENTAGON case missing
    }
    return "Unknown";
}

int main(void) {
    for (int i = CIRCLE; i <= PENTAGON; i++) {
        printf("%s\\n", shape_name(i));
    }
    return 0;
}`,
      solution: `#include <stdio.h>

enum Shape { CIRCLE, SQUARE, TRIANGLE, PENTAGON };

const char *shape_name(enum Shape s) {
    switch (s) {
        case CIRCLE:   return "Circle";
        case SQUARE:   return "Square";
        case TRIANGLE: return "Triangle";
        case PENTAGON: return "Pentagon";
    }
    return "Unknown";
}

int main(void) {
    for (int i = CIRCLE; i <= PENTAGON; i++) {
        printf("%s\\n", shape_name(i));
    }
    return 0;
}`,
      hints: [
        'Every enum value should have a corresponding case.',
        'Compile with -Wswitch to catch missing cases.',
        'Add case PENTAGON: return "Pentagon";.',
      ],
      concepts: ['exhaustive switch', 'missing case', 'compiler warnings'],
    },
    {
      id: 'c-enum-15',
      title: 'Predict flag combination',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the result of combining and testing multiple flags.',
      skeleton: `#include <stdio.h>

enum F { A = 1, B = 2, C = 4, D = 8, ALL = 15 };

int main(void) {
    int flags = A | B | D;
    printf("%d\\n", flags);
    printf("%d\\n", flags == ALL);
    printf("%d\\n", (flags | C) == ALL);
    printf("%d\\n", flags & B);
    return 0;
}`,
      solution: `11
0
1
2`,
      hints: [
        'A|B|D = 1|2|8 = 11. ALL = 15 = 1|2|4|8.',
        '11 != 15 so flags == ALL is 0.',
        '11|4 = 15 = ALL. flags & B = 11 & 2 = 2.',
      ],
      concepts: ['flag combination', 'complete set check', 'flag test value'],
    },
    {
      id: 'c-enum-16',
      title: 'Enum for config options',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use bit-flag enums for configuration options.',
      skeleton: `// Define enum Options with flags: OPT_VERBOSE=1, OPT_DEBUG=2,
// OPT_COLOR=4, OPT_QUIET=8
// Write void apply_options(int opts) that prints which options are active.
// Write int parse_options(const char *str) that parses "vdc" to flags.`,
      solution: `#include <stdio.h>
#include <string.h>

enum Options {
    OPT_VERBOSE = 1,
    OPT_DEBUG   = 2,
    OPT_COLOR   = 4,
    OPT_QUIET   = 8
};

void apply_options(int opts) {
    if (opts & OPT_VERBOSE) printf("  Verbose mode\\n");
    if (opts & OPT_DEBUG)   printf("  Debug mode\\n");
    if (opts & OPT_COLOR)   printf("  Color output\\n");
    if (opts & OPT_QUIET)   printf("  Quiet mode\\n");
}

int parse_options(const char *str) {
    int opts = 0;
    for (const char *p = str; *p; p++) {
        switch (*p) {
            case 'v': opts |= OPT_VERBOSE; break;
            case 'd': opts |= OPT_DEBUG; break;
            case 'c': opts |= OPT_COLOR; break;
            case 'q': opts |= OPT_QUIET; break;
        }
    }
    return opts;
}

int main(void) {
    int opts = parse_options("vdc");
    printf("Active options:\\n");
    apply_options(opts);
    return 0;
}`,
      hints: [
        'Parse each character and OR in the corresponding flag.',
        'Test each flag with & in apply_options.',
        'This mirrors how command-line flags work.',
      ],
      concepts: ['option parsing', 'flag accumulation', 'command-line pattern'],
    },
    {
      id: 'c-enum-17',
      title: 'Refactor magic numbers to enum',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Replace magic numbers with an enum for readability.',
      skeleton: `#include <stdio.h>

double calculate(double a, double b, int op) {
    switch (op) {
        case 0: return a + b;
        case 1: return a - b;
        case 2: return a * b;
        case 3: return b != 0 ? a / b : 0;
        default: return 0;
    }
}

int main(void) {
    printf("%.1f\\n", calculate(10, 3, 0));
    printf("%.1f\\n", calculate(10, 3, 1));
    printf("%.1f\\n", calculate(10, 3, 2));
    printf("%.1f\\n", calculate(10, 3, 3));
    return 0;
}`,
      solution: `#include <stdio.h>

enum Op { OP_ADD, OP_SUB, OP_MUL, OP_DIV };

double calculate(double a, double b, enum Op op) {
    switch (op) {
        case OP_ADD: return a + b;
        case OP_SUB: return a - b;
        case OP_MUL: return a * b;
        case OP_DIV: return b != 0 ? a / b : 0;
        default: return 0;
    }
}

int main(void) {
    printf("%.1f\\n", calculate(10, 3, OP_ADD));
    printf("%.1f\\n", calculate(10, 3, OP_SUB));
    printf("%.1f\\n", calculate(10, 3, OP_MUL));
    printf("%.1f\\n", calculate(10, 3, OP_DIV));
    return 0;
}`,
      hints: [
        'Magic numbers (0, 1, 2, 3) are unreadable and error-prone.',
        'An enum gives meaningful names to each operation.',
        'OP_ADD is clearer than 0.',
      ],
      concepts: ['magic number elimination', 'self-documenting code', 'refactoring'],
    },
    {
      id: 'c-enum-18',
      title: 'Refactor booleans to enum',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Replace multiple boolean parameters with a flags enum.',
      skeleton: `#include <stdio.h>

void format_text(const char *text, int bold, int italic, int underline) {
    if (bold) printf("[B]");
    if (italic) printf("[I]");
    if (underline) printf("[U]");
    printf("%s", text);
    if (underline) printf("[/U]");
    if (italic) printf("[/I]");
    if (bold) printf("[/B]");
    printf("\\n");
}

int main(void) {
    format_text("Hello", 1, 0, 1);
    format_text("World", 0, 1, 0);
    return 0;
}`,
      solution: `#include <stdio.h>

enum TextStyle {
    STYLE_BOLD      = 1,
    STYLE_ITALIC    = 2,
    STYLE_UNDERLINE = 4
};

void format_text(const char *text, int style) {
    if (style & STYLE_BOLD) printf("[B]");
    if (style & STYLE_ITALIC) printf("[I]");
    if (style & STYLE_UNDERLINE) printf("[U]");
    printf("%s", text);
    if (style & STYLE_UNDERLINE) printf("[/U]");
    if (style & STYLE_ITALIC) printf("[/I]");
    if (style & STYLE_BOLD) printf("[/B]");
    printf("\\n");
}

int main(void) {
    format_text("Hello", STYLE_BOLD | STYLE_UNDERLINE);
    format_text("World", STYLE_ITALIC);
    return 0;
}`,
      hints: [
        'Multiple boolean parameters are hard to read at call sites.',
        'Bit flags combine into a single int parameter.',
        'STYLE_BOLD | STYLE_UNDERLINE is clearer than 1, 0, 1.',
      ],
      concepts: ['boolean parameter smell', 'flags pattern', 'API design'],
    },
    {
      id: 'c-enum-19',
      title: 'Predict enum cast',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Predict behavior when casting integers to enums.',
      skeleton: `#include <stdio.h>

enum Color { RED, GREEN, BLUE };

int main(void) {
    enum Color c = 42;  // No compiler error in C!
    printf("%d\\n", c);
    printf("%d\\n", c == RED);
    printf("%d\\n", (int)GREEN + 1 == (int)BLUE);
    return 0;
}`,
      solution: `42
0
1`,
      hints: [
        'C enums have no type safety -- any int can be assigned.',
        '42 is not RED (0), so c == RED is false (0).',
        'GREEN=1, BLUE=2, so GREEN+1 == BLUE is true (1).',
      ],
      concepts: ['enum type safety', 'integer casting', 'no enforcement'],
    },
    {
      id: 'c-enum-20',
      title: 'Write enum iterator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that iterates over all enum values.',
      skeleton: `// Define enum LogLevel { LOG_TRACE, LOG_DEBUG, LOG_INFO,
//   LOG_WARN, LOG_ERROR, LOG_FATAL, LOG_COUNT };
// Write void print_all_levels(void) that prints each level name.
// Write int should_log(enum LogLevel current, enum LogLevel min_level).`,
      solution: `#include <stdio.h>

enum LogLevel {
    LOG_TRACE, LOG_DEBUG, LOG_INFO,
    LOG_WARN, LOG_ERROR, LOG_FATAL, LOG_COUNT
};

static const char *level_names[LOG_COUNT] = {
    "TRACE", "DEBUG", "INFO", "WARN", "ERROR", "FATAL"
};

void print_all_levels(void) {
    for (int i = 0; i < LOG_COUNT; i++) {
        printf("[%d] %s\\n", i, level_names[i]);
    }
}

int should_log(enum LogLevel current, enum LogLevel min_level) {
    return current >= min_level;
}

int main(void) {
    print_all_levels();
    printf("\\nLog WARN at INFO level: %d\\n",
           should_log(LOG_WARN, LOG_INFO));
    printf("Log DEBUG at WARN level: %d\\n",
           should_log(LOG_DEBUG, LOG_WARN));
    return 0;
}`,
      hints: [
        'Use a COUNT sentinel at the end for iteration bounds.',
        'A static array maps enum values to strings.',
        'Comparison works because values are ordered integers.',
      ],
      concepts: ['enum iteration', 'sentinel value', 'log level filtering'],
    },
  ],
};
