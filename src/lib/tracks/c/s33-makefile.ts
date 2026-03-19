import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-make',
  title: '33. Makefile & Build Systems',
  explanation: `## Makefile & Build Systems

Make automates the build process, tracking dependencies and only recompiling what changed.

\`\`\`makefile
CC = gcc
CFLAGS = -Wall -Wextra -g

program: main.o utils.o
    $(CC) $(CFLAGS) -o $@ $^

%.o: %.c
    $(CC) $(CFLAGS) -c $< -o $@

clean:
    rm -f *.o program
\`\`\`

### Key Concepts
- **Targets**: what to build (files or phony targets)
- **Prerequisites**: files the target depends on
- **Recipes**: commands to build the target
- **Variables**: CC, CFLAGS, LDFLAGS, etc.
- **Automatic variables**: $@ (target), $< (first prereq), $^ (all prereqs)
- **Pattern rules**: %.o: %.c for generic compilation
`,
  exercises: [
    {
      id: 'c-make-1',
      title: 'Basic Makefile',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete a basic Makefile for compiling a single file.',
      skeleton: `# Makefile
CC = __BLANK__
CFLAGS = -Wall -g

program: main.c
\t$(CC) $(__BLANK__) -o __BLANK__ main.c

clean:
\trm -f program`,
      solution: `# Makefile
CC = gcc
CFLAGS = -Wall -g

program: main.c
\t$(CC) $(CFLAGS) -o program main.c

clean:
\trm -f program`,
      hints: [
        'CC is typically gcc (or clang).',
        'Reference variables with $(VARIABLE_NAME).',
        'Output file is the target name: program.',
      ],
      concepts: ['Makefile', 'variables', 'compilation'],
    },
    {
      id: 'c-make-2',
      title: 'Automatic variables',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete a Makefile rule using automatic variables.',
      skeleton: `CC = gcc
CFLAGS = -Wall -g

main.o: main.c main.h
\t$(CC) $(CFLAGS) -c __BLANK__ -o __BLANK__

# $< = first prerequisite (main.c)
# $@ = target (main.o)
# $^ = all prerequisites (main.c main.h)`,
      solution: `CC = gcc
CFLAGS = -Wall -g

main.o: main.c main.h
\t$(CC) $(CFLAGS) -c $< -o $@

# $< = first prerequisite (main.c)
# $@ = target (main.o)
# $^ = all prerequisites (main.c main.h)`,
      hints: [
        '$< is the first prerequisite: main.c.',
        '$@ is the target: main.o.',
        'We compile $< (not $^) because we only compile the .c file.',
      ],
      concepts: ['automatic variables', '$<', '$@'],
    },
    {
      id: 'c-make-3',
      title: 'Multi-file Makefile',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a Makefile for a project with main.c, utils.c, and utils.h.',
      skeleton: `# Write a complete Makefile for:
# - main.c (includes utils.h)
# - utils.c (includes utils.h)
# - utils.h (header)
# Target: myapp
# Include a clean target`,
      solution: `CC = gcc
CFLAGS = -Wall -Wextra -g
TARGET = myapp
OBJS = main.o utils.o

$(TARGET): $(OBJS)
\t$(CC) $(CFLAGS) -o $@ $^

main.o: main.c utils.h
\t$(CC) $(CFLAGS) -c $< -o $@

utils.o: utils.c utils.h
\t$(CC) $(CFLAGS) -c $< -o $@

.PHONY: clean
clean:
\trm -f $(TARGET) $(OBJS)`,
      hints: [
        'List object files as prerequisites of the final target.',
        'Each .o depends on its .c and any headers it includes.',
        '.PHONY marks targets that aren\'t actual files.',
      ],
      concepts: ['multi-file build', 'dependencies', '.PHONY'],
    },
    {
      id: 'c-make-4',
      title: 'Predict rebuild',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict which files get recompiled when a header changes.',
      skeleton: `# Makefile:
# app: main.o utils.o data.o
# main.o: main.c utils.h
# utils.o: utils.c utils.h data.h
# data.o: data.c data.h

# Question: If only data.h is modified, which .o files are rebuilt?
# And which are NOT rebuilt?

#include <stdio.h>
int main(void) {
    printf("Which files rebuild?\\n");
    return 0;
}`,
      solution: `# Makefile:
# app: main.o utils.o data.o
# main.o: main.c utils.h
# utils.o: utils.c utils.h data.h
# data.o: data.c data.h

// If data.h changes:
// - utils.o is rebuilt (depends on data.h)
// - data.o is rebuilt (depends on data.h)
// - main.o is NOT rebuilt (does not depend on data.h)
// - app is relinked (because utils.o and data.o changed)

#include <stdio.h>
int main(void) {
    printf("utils.o and data.o rebuild; main.o does not\\n");
    return 0;
}`,
      hints: [
        'Only targets that list data.h as a prerequisite are rebuilt.',
        'utils.o depends on data.h, so it rebuilds.',
        'main.o only depends on utils.h, so it does NOT rebuild.',
      ],
      concepts: ['dependency tracking', 'incremental build', 'prerequisites'],
    },
    {
      id: 'c-make-5',
      title: 'Pattern rules',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete a pattern rule for generic .c to .o compilation.',
      skeleton: `CC = gcc
CFLAGS = -Wall -g
SRCS = main.c utils.c data.c
OBJS = $(SRCS:__BLANK__=.o)

app: $(OBJS)
\t$(CC) $(CFLAGS) -o $@ $^

__BLANK__: %.c
\t$(CC) $(CFLAGS) -c $< -o __BLANK__

.PHONY: clean
clean:
\trm -f app $(OBJS)`,
      solution: `CC = gcc
CFLAGS = -Wall -g
SRCS = main.c utils.c data.c
OBJS = $(SRCS:.c=.o)

app: $(OBJS)
\t$(CC) $(CFLAGS) -o $@ $^

%.o: %.c
\t$(CC) $(CFLAGS) -c $< -o $@

.PHONY: clean
clean:
\trm -f app $(OBJS)`,
      hints: [
        'Substitution: $(SRCS:.c=.o) replaces .c with .o.',
        'Pattern rule: %.o: %.c matches any .c to .o.',
        '$@ is the target .o file.',
      ],
      concepts: ['pattern rules', 'substitution', 'generic rules'],
    },
    {
      id: 'c-make-6',
      title: 'Linking libraries',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete Makefile lines to link with math and pthread libraries.',
      skeleton: `CC = gcc
CFLAGS = -Wall -g
LDFLAGS = -l__BLANK__ -l__BLANK__

program: main.o
\t$(CC) -o $@ $^ $(__BLANK__)

main.o: main.c
\t$(CC) $(CFLAGS) -c $< -o $@`,
      solution: `CC = gcc
CFLAGS = -Wall -g
LDFLAGS = -lm -lpthread

program: main.o
\t$(CC) -o $@ $^ $(LDFLAGS)

main.o: main.c
\t$(CC) $(CFLAGS) -c $< -o $@`,
      hints: [
        '-lm links the math library (libm).',
        '-lpthread links the POSIX threads library.',
        'LDFLAGS is used during linking, not compilation.',
      ],
      concepts: ['linking', 'LDFLAGS', '-l flag'],
    },
    {
      id: 'c-make-7',
      title: 'Fix tab vs spaces',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the Makefile error caused by using spaces instead of tabs.',
      skeleton: `CC = gcc

# This Makefile has a common error
program: main.c
    $(CC) -o program main.c
# BUG: recipe lines must start with a TAB, not spaces

clean:
    rm -f program`,
      solution: `CC = gcc

# Recipe lines MUST start with a TAB character
program: main.c
\t$(CC) -o program main.c

clean:
\trm -f program`,
      hints: [
        'Make requires TAB characters before recipe commands.',
        'Spaces will cause "missing separator" error.',
        'Most editors can be configured to insert tabs in Makefiles.',
      ],
      concepts: ['Makefile tabs', 'syntax error', 'recipe indentation'],
    },
    {
      id: 'c-make-8',
      title: 'Conditional compilation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write Makefile targets for debug and release builds.',
      skeleton: `# Write a Makefile with:
# - 'debug' target: compile with -g -O0 -DDEBUG
# - 'release' target: compile with -O2 -DNDEBUG
# - default target builds debug
# Source: main.c`,
      solution: `CC = gcc
CFLAGS_COMMON = -Wall -Wextra
CFLAGS_DEBUG = $(CFLAGS_COMMON) -g -O0 -DDEBUG
CFLAGS_RELEASE = $(CFLAGS_COMMON) -O2 -DNDEBUG

.PHONY: all debug release clean

all: debug

debug: CFLAGS = $(CFLAGS_DEBUG)
debug: program

release: CFLAGS = $(CFLAGS_RELEASE)
release: program

program: main.c
\t$(CC) $(CFLAGS) -o $@ $<

clean:
\trm -f program`,
      hints: [
        'Use target-specific variables: debug: CFLAGS = ...',
        '-DDEBUG defines the DEBUG preprocessor macro.',
        '-O2 enables optimization; -O0 disables it for debugging.',
      ],
      concepts: ['debug/release builds', 'target-specific variables', '-D flag'],
    },
    {
      id: 'c-make-9',
      title: 'Predict make behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict what make does when target is up to date.',
      skeleton: `# If program already exists and is newer than main.c,
# what does running 'make' output?

# Makefile:
# program: main.c
# \tgcc -o program main.c

#include <stdio.h>
int main(void) {
    printf("make says: make: 'program' is up to date.\\n");
    return 0;
}`,
      solution: `// When the target is newer than all prerequisites,
// make prints: make: 'program' is up to date.
// No compilation happens.

#include <stdio.h>
int main(void) {
    printf("make says: make: 'program' is up to date.\\n");
    return 0;
}
// make compares timestamps of target vs prerequisites
// If target is newer, nothing to do`,
      hints: [
        'Make compares modification timestamps.',
        'If program is newer than main.c, no rebuild is needed.',
        'Output: make: \'program\' is up to date.',
      ],
      concepts: ['timestamp comparison', 'up to date', 'incremental build'],
    },
    {
      id: 'c-make-10',
      title: 'Auto-dependency generation',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Complete auto-dependency generation using gcc -MMD.',
      skeleton: `CC = gcc
CFLAGS = -Wall -g __BLANK__
SRCS = main.c utils.c
OBJS = $(SRCS:.c=.o)
DEPS = $(SRCS:.c=__BLANK__)

app: $(OBJS)
\t$(CC) -o $@ $^

%.o: %.c
\t$(CC) $(CFLAGS) -c $< -o $@

-include $(__BLANK__)

clean:
\trm -f app $(OBJS) $(DEPS)`,
      solution: `CC = gcc
CFLAGS = -Wall -g -MMD
SRCS = main.c utils.c
OBJS = $(SRCS:.c=.o)
DEPS = $(SRCS:.c=.d)

app: $(OBJS)
\t$(CC) -o $@ $^

%.o: %.c
\t$(CC) $(CFLAGS) -c $< -o $@

-include $(DEPS)

clean:
\trm -f app $(OBJS) $(DEPS)`,
      hints: [
        '-MMD generates .d dependency files alongside .o files.',
        'Dependency files have .d extension.',
        '-include silently includes .d files (ok if they don\'t exist yet).',
      ],
      concepts: ['auto-dependencies', '-MMD', '.d files'],
    },
    {
      id: 'c-make-11',
      title: 'Wildcard sources',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a Makefile that automatically finds all .c files in a directory.',
      skeleton: `# Write a Makefile that:
# - Finds all .c files in src/ directory
# - Puts .o files in build/ directory
# - Links into bin/app`,
      solution: `CC = gcc
CFLAGS = -Wall -Wextra -g

SRCS = $(wildcard src/*.c)
OBJS = $(patsubst src/%.c, build/%.o, $(SRCS))
TARGET = bin/app

$(TARGET): $(OBJS) | bin
\t$(CC) $(CFLAGS) -o $@ $^

build/%.o: src/%.c | build
\t$(CC) $(CFLAGS) -c $< -o $@

bin build:
\tmkdir -p $@

.PHONY: clean
clean:
\trm -rf build bin`,
      hints: [
        '$(wildcard src/*.c) finds all .c files.',
        '$(patsubst src/%.c, build/%.o, ...) transforms paths.',
        'Order-only prerequisites (| dir) ensure directories exist.',
      ],
      concepts: ['wildcard', 'patsubst', 'build directories'],
    },
    {
      id: 'c-make-12',
      title: 'Fix circular dependency',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the circular dependency in this Makefile.',
      skeleton: `CC = gcc

# BUG: circular dependency
all: program
program: utils.o main.o
\t$(CC) -o $@ $^
main.o: main.c program  # BUG: main.o should not depend on program
\t$(CC) -c $< -o $@
utils.o: utils.c
\t$(CC) -c $< -o $@`,
      solution: `CC = gcc

all: program
program: main.o utils.o
\t$(CC) -o $@ $^
main.o: main.c
\t$(CC) -c $< -o $@
utils.o: utils.c
\t$(CC) -c $< -o $@`,
      hints: [
        'main.o depends on program, but program depends on main.o.',
        'This creates a circular dependency that make cannot resolve.',
        'Remove the erroneous dependency of main.o on program.',
      ],
      concepts: ['circular dependency', 'dependency graph', 'Makefile bug'],
    },
    {
      id: 'c-make-13',
      title: 'Install target',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete an install target for a Makefile.',
      skeleton: `CC = gcc
PREFIX = __BLANK__
BINDIR = $(PREFIX)/bin

program: main.c
\t$(CC) -Wall -O2 -o $@ $<

.PHONY: install __BLANK__
install: program
\tinstall -d $(BINDIR)
\tinstall -m 755 __BLANK__ $(BINDIR)/

uninstall:
\trm -f $(BINDIR)/__BLANK__`,
      solution: `CC = gcc
PREFIX = /usr/local
BINDIR = $(PREFIX)/bin

program: main.c
\t$(CC) -Wall -O2 -o $@ $<

.PHONY: install uninstall
install: program
\tinstall -d $(BINDIR)
\tinstall -m 755 program $(BINDIR)/

uninstall:
\trm -f $(BINDIR)/program`,
      hints: [
        'PREFIX is conventionally /usr/local.',
        'install -m 755 sets executable permissions.',
        'Uninstall removes the binary from BINDIR.',
      ],
      concepts: ['install target', 'PREFIX', 'file permissions'],
    },
    {
      id: 'c-make-14',
      title: 'Predict variable expansion',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the difference between = and := assignment in Make.',
      skeleton: `// Given Makefile:
// X = hello
// Y = $(X) world
// X = goodbye
//
// A := hello
// B := $(A) world
// A := goodbye

// What are the values of Y and B when used in a recipe?

#include <stdio.h>
int main(void) {
    // Y uses recursive expansion (=)
    // B uses simple expansion (:=)
    printf("Y expands to: ?\\n");
    printf("B expands to: ?\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
int main(void) {
    // Y uses recursive (=): expands X at use time -> "goodbye world"
    // B uses simple (:=): expands X at definition time -> "hello world"
    printf("Y expands to: goodbye world\\n");
    printf("B expands to: hello world\\n");
    return 0;
}`,
      hints: [
        '= is recursive: variables expand when used, not when defined.',
        ':= is simple: variables expand immediately at definition time.',
        'Y sees X as "goodbye" (last value); B captured X as "hello".',
      ],
      concepts: ['recursive vs simple', '= vs :=', 'variable expansion'],
    },
    {
      id: 'c-make-15',
      title: 'Refactor to use variables',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Refactor a Makefile with hardcoded values to use variables.',
      skeleton: `app: main.c utils.c data.c
\tgcc -Wall -Wextra -g -o app main.c utils.c data.c -lm

clean:
\trm -f app`,
      solution: `CC = gcc
CFLAGS = -Wall -Wextra -g
LDFLAGS = -lm
TARGET = app
SRCS = main.c utils.c data.c
OBJS = $(SRCS:.c=.o)

$(TARGET): $(OBJS)
\t$(CC) $(CFLAGS) -o $@ $^ $(LDFLAGS)

%.o: %.c
\t$(CC) $(CFLAGS) -c $< -o $@

.PHONY: clean
clean:
\trm -f $(TARGET) $(OBJS)`,
      hints: [
        'Extract CC, CFLAGS, LDFLAGS, TARGET, SRCS into variables.',
        'Use pattern rule for .c to .o compilation.',
        'Separate compilation and linking for incremental builds.',
      ],
      concepts: ['Makefile variables', 'refactoring', 'best practices'],
    },
    {
      id: 'c-make-16',
      title: 'Makefile functions',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Complete Makefile using built-in functions.',
      skeleton: `SRCS = src/main.c src/utils.c src/data.c

# Get just filenames without directory
NAMES = $(notdir $(SRCS))
# Result: __BLANK__

# Get just directories
DIRS = $(__BLANK__ $(SRCS))
# Result: src src src

# Replace .c with .o
OBJS = $(__BLANK__ .c,.o,$(NAMES))
# Result: main.o utils.o data.o

all:
\t@echo "NAMES: $(NAMES)"
\t@echo "DIRS: $(DIRS)"
\t@echo "OBJS: $(OBJS)"`,
      solution: `SRCS = src/main.c src/utils.c src/data.c

# Get just filenames without directory
NAMES = $(notdir $(SRCS))
# Result: main.c utils.c data.c

# Get just directories
DIRS = $(dir $(SRCS))
# Result: src/ src/ src/

# Replace .c with .o
OBJS = $(subst .c,.o,$(NAMES))
# Result: main.o utils.o data.o

all:
\t@echo "NAMES: $(NAMES)"
\t@echo "DIRS: $(DIRS)"
\t@echo "OBJS: $(OBJS)"`,
      hints: [
        '$(notdir ...) strips directory parts: main.c utils.c data.c.',
        '$(dir ...) extracts directory parts.',
        '$(subst from,to,text) does string substitution.',
      ],
      concepts: ['Make functions', 'notdir', 'subst'],
    },
    {
      id: 'c-make-17',
      title: 'Fix missing prerequisite',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the build that breaks when a header changes.',
      skeleton: `CC = gcc
CFLAGS = -Wall -g

app: main.o utils.o
\t$(CC) -o $@ $^

main.o: main.c
\t$(CC) $(CFLAGS) -c $< -o $@

# BUG: utils.o doesn't list config.h as prerequisite
# utils.c includes config.h, but changing config.h won't trigger rebuild
utils.o: utils.c
\t$(CC) $(CFLAGS) -c $< -o $@

clean:
\trm -f app *.o`,
      solution: `CC = gcc
CFLAGS = -Wall -g

app: main.o utils.o
\t$(CC) -o $@ $^

main.o: main.c
\t$(CC) $(CFLAGS) -c $< -o $@

utils.o: utils.c config.h
\t$(CC) $(CFLAGS) -c $< -o $@

clean:
\trm -f app *.o`,
      hints: [
        'If utils.c includes config.h, config.h must be a prerequisite.',
        'Without it, changing config.h won\'t trigger recompilation of utils.o.',
        'Add config.h to the utils.o prerequisite list.',
      ],
      concepts: ['header dependency', 'stale build', 'prerequisites'],
    },
    {
      id: 'c-make-18',
      title: 'Parallel build',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a Makefile optimized for parallel builds with make -j.',
      skeleton: `# Write a Makefile for a project with 8 source files
# that supports parallel compilation with make -j
# Ensure proper dependencies so parallel builds are correct`,
      solution: `CC = gcc
CFLAGS = -Wall -Wextra -g -MMD
TARGET = app
SRCS = $(wildcard *.c)
OBJS = $(SRCS:.c=.o)
DEPS = $(SRCS:.c=.d)

.PHONY: all clean

all: $(TARGET)

$(TARGET): $(OBJS)
\t$(CC) $(CFLAGS) -o $@ $^

%.o: %.c
\t$(CC) $(CFLAGS) -c $< -o $@

-include $(DEPS)

clean:
\trm -f $(TARGET) $(OBJS) $(DEPS)`,
      hints: [
        'Pattern rules allow make -j to compile all .o files in parallel.',
        '-MMD generates accurate header dependencies automatically.',
        'The link step waits for all .o files to be ready.',
      ],
      concepts: ['parallel build', 'make -j', 'auto-dependencies'],
    },
    {
      id: 'c-make-19',
      title: 'Refactor to out-of-source build',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor Makefile to put all build artifacts in a build/ directory.',
      skeleton: `CC = gcc
CFLAGS = -Wall -g

app: main.o utils.o
\t$(CC) -o $@ $^

%.o: %.c
\t$(CC) $(CFLAGS) -c $< -o $@

clean:
\trm -f app *.o`,
      solution: `CC = gcc
CFLAGS = -Wall -Wextra -g -MMD
SRCDIR = .
BUILDDIR = build

SRCS = $(wildcard $(SRCDIR)/*.c)
OBJS = $(patsubst $(SRCDIR)/%.c, $(BUILDDIR)/%.o, $(SRCS))
DEPS = $(OBJS:.o=.d)
TARGET = $(BUILDDIR)/app

.PHONY: all clean

all: $(TARGET)

$(TARGET): $(OBJS)
\t$(CC) $(CFLAGS) -o $@ $^

$(BUILDDIR)/%.o: $(SRCDIR)/%.c | $(BUILDDIR)
\t$(CC) $(CFLAGS) -c $< -o $@

$(BUILDDIR):
\tmkdir -p $@

-include $(DEPS)

clean:
\trm -rf $(BUILDDIR)`,
      hints: [
        'Use patsubst to redirect .o files into build/ directory.',
        'Order-only prerequisite | $(BUILDDIR) creates the directory first.',
        'Clean just removes the entire build directory.',
      ],
      concepts: ['out-of-source build', 'build directory', 'patsubst'],
    },
    {
      id: 'c-make-20',
      title: 'Makefile with test target',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a Makefile with build, test, and coverage targets.',
      skeleton: `# Write a Makefile with:
# - build: compile src files into app
# - test: compile and run test files
# - coverage: build with --coverage, run tests, generate report
# Source files in src/, test files in tests/`,
      solution: `CC = gcc
CFLAGS = -Wall -Wextra -g
COV_FLAGS = --coverage

SRC = $(wildcard src/*.c)
SRC_OBJS = $(SRC:.c=.o)
TEST_SRC = $(wildcard tests/*.c)
TEST_OBJS = $(TEST_SRC:.c=.o)
# Filter out main.o for tests (tests have their own main)
LIB_OBJS = $(filter-out src/main.o, $(SRC_OBJS))

.PHONY: all test coverage clean

all: app

app: $(SRC_OBJS)
\t$(CC) $(CFLAGS) -o $@ $^

test_runner: $(TEST_OBJS) $(LIB_OBJS)
\t$(CC) $(CFLAGS) -o $@ $^

test: test_runner
\t./test_runner

coverage: CFLAGS += $(COV_FLAGS)
coverage: clean test_runner
\t./test_runner
\tgcov src/*.c
\t@echo "Coverage report generated"

clean:
\trm -f app test_runner src/*.o tests/*.o *.gcda *.gcno *.gcov`,
      hints: [
        'Filter out src/main.o when linking tests (they have their own main).',
        '--coverage flag enables gcov instrumentation.',
        'Run tests first, then gcov to generate the report.',
      ],
      concepts: ['test target', 'coverage', 'filter-out'],
    },
  ],
};
