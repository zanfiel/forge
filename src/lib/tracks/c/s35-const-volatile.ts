import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-constv',
  title: '35. Const & Volatile',
  explanation: `## Const & Volatile

The \`const\` and \`volatile\` type qualifiers give the compiler critical information about how variables are used, enabling optimizations and preventing bugs.

\`\`\`c
const int MAX = 100;          // cannot modify MAX
int *const p = &x;            // pointer is const, *p is mutable
const int *q = &x;            // *q is const, pointer is mutable
const int *const r = &x;      // both are const

volatile int hw_reg;           // may change outside program control
const volatile int status;     // read-only hardware register
\`\`\`

### Key Concepts
- **const correctness**: marking data that should not change prevents accidental mutation
- **pointer to const**: \`const int *p\` -- data is read-only through p
- **const pointer**: \`int *const p\` -- the pointer itself cannot be reassigned
- **volatile**: tells the compiler the value may change at any time; suppresses certain optimizations
- **const volatile**: read-only from the program's perspective but may change via hardware
`,
  exercises: [
    {
      id: 'c-constv-1',
      title: 'Declare a const integer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Declare a constant integer named MAX_SIZE with value 256.',
      skeleton: `#include <stdio.h>

int main(void) {
    __BLANK__ MAX_SIZE = 256;
    printf("Max size: %d\\n", MAX_SIZE);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    const int MAX_SIZE = 256;
    printf("Max size: %d\\n", MAX_SIZE);
    return 0;
}`,
      hints: [
        'Use the const keyword before the type.',
        'const int declares a read-only integer.',
        'The variable must be initialized at declaration since it cannot be assigned later.',
      ],
      concepts: ['const', 'type-qualifiers'],
    },
    {
      id: 'c-constv-2',
      title: 'Pointer to const data',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Declare a pointer to const int so the data cannot be modified through the pointer.',
      skeleton: `#include <stdio.h>

int main(void) {
    int value = 42;
    __BLANK__ ptr = &value;
    // *ptr = 10;  // should be illegal
    printf("Value: %d\\n", *ptr);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int value = 42;
    const int *ptr = &value;
    // *ptr = 10;  // should be illegal
    printf("Value: %d\\n", *ptr);
    return 0;
}`,
      hints: [
        'Place const before the type that the pointer points to.',
        'const int *ptr means the int is const through ptr.',
        'The pointer itself can be reassigned, but *ptr cannot be written.',
      ],
      concepts: ['const', 'pointers', 'pointer-to-const'],
    },
    {
      id: 'c-constv-3',
      title: 'Const pointer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Declare a const pointer to int -- the pointer cannot be reassigned but the data can be modified.',
      skeleton: `#include <stdio.h>

int main(void) {
    int a = 10, b = 20;
    int __BLANK__ ptr = &a;
    *ptr = 99;     // allowed
    // ptr = &b;   // should be illegal
    printf("a = %d\\n", a);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int a = 10, b = 20;
    int *const ptr = &a;
    *ptr = 99;     // allowed
    // ptr = &b;   // should be illegal
    printf("a = %d\\n", a);
    return 0;
}`,
      hints: [
        'Place const after the * to make the pointer itself constant.',
        'int *const ptr means the pointer is fixed, data is mutable.',
        'A const pointer must be initialized at declaration.',
      ],
      concepts: ['const', 'pointers', 'const-pointer'],
    },
    {
      id: 'c-constv-4',
      title: 'Const parameter for safety',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Add const to the function parameter to promise the function will not modify the array.',
      skeleton: `#include <stdio.h>

int sum(__BLANK__ int *arr, int n) {
    int total = 0;
    for (int i = 0; i < n; i++) {
        total += arr[i];
    }
    return total;
}

int main(void) {
    int nums[] = {1, 2, 3, 4, 5};
    printf("Sum: %d\\n", sum(nums, 5));
    return 0;
}`,
      solution: `#include <stdio.h>

int sum(const int *arr, int n) {
    int total = 0;
    for (int i = 0; i < n; i++) {
        total += arr[i];
    }
    return total;
}

int main(void) {
    int nums[] = {1, 2, 3, 4, 5};
    printf("Sum: %d\\n", sum(nums, 5));
    return 0;
}`,
      hints: [
        'Use const before the type in the parameter list.',
        'This tells callers the function is read-only on the array.',
        'The compiler will error if the function tries to modify arr elements.',
      ],
      concepts: ['const', 'function-parameters', 'pointer-to-const'],
    },
    {
      id: 'c-constv-5',
      title: 'Volatile declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Declare a volatile integer to prevent the compiler from optimizing away reads.',
      skeleton: `#include <stdio.h>

__BLANK__ int sensor_value = 0;

void read_sensor(void) {
    // In real code, hardware updates sensor_value
    while (sensor_value == 0) {
        // wait for change
    }
}

int main(void) {
    sensor_value = 1;
    read_sensor();
    return 0;
}`,
      solution: `#include <stdio.h>

volatile int sensor_value = 0;

void read_sensor(void) {
    // In real code, hardware updates sensor_value
    while (sensor_value == 0) {
        // wait for change
    }
}

int main(void) {
    sensor_value = 1;
    read_sensor();
    return 0;
}`,
      hints: [
        'The volatile keyword tells the compiler the variable may change unexpectedly.',
        'Without volatile, the compiler might cache the value and create an infinite loop.',
        'volatile is essential for hardware registers and signal handlers.',
      ],
      concepts: ['volatile', 'type-qualifiers', 'optimization'],
    },
    {
      id: 'c-constv-6',
      title: 'Const volatile register',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Declare a const volatile pointer to a hardware status register that the program can read but not write, yet may change via hardware.',
      skeleton: `#include <stdint.h>

// Hardware status register at address 0x40001000
__BLANK__ uint32_t *status_reg = (const volatile uint32_t *)0x40001000;

uint32_t read_status(void) {
    return *status_reg;
}`,
      solution: `#include <stdint.h>

// Hardware status register at address 0x40001000
const volatile uint32_t *status_reg = (const volatile uint32_t *)0x40001000;

uint32_t read_status(void) {
    return *status_reg;
}`,
      hints: [
        'const means the program cannot write to it; volatile means it may change externally.',
        'Both qualifiers can be combined: const volatile.',
        'This pattern is common for read-only hardware status registers.',
      ],
      concepts: ['const', 'volatile', 'hardware-registers', 'embedded'],
    },
    {
      id: 'c-constv-7',
      title: 'Write a const-correct string length',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a function my_strlen that takes a const char pointer and returns the string length without modifying the string.',
      skeleton: `#include <stdio.h>

// Write my_strlen here

int main(void) {
    const char *msg = "Hello";
    printf("Length: %zu\\n", my_strlen(msg));
    return 0;
}`,
      solution: `#include <stdio.h>

size_t my_strlen(const char *s) {
    size_t len = 0;
    while (s[len] != '\\0') {
        len++;
    }
    return len;
}

int main(void) {
    const char *msg = "Hello";
    printf("Length: %zu\\n", my_strlen(msg));
    return 0;
}`,
      hints: [
        'The parameter should be const char * since we only read the string.',
        'Count characters until the null terminator.',
        'Return type should be size_t for string lengths.',
      ],
      concepts: ['const', 'strings', 'function-design'],
    },
    {
      id: 'c-constv-8',
      title: 'Write a const-correct array search',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a function find_max that takes a const int array and its size, returning the maximum value. Use const correctly.',
      skeleton: `#include <stdio.h>
#include <limits.h>

// Write find_max here

int main(void) {
    int data[] = {3, 7, 2, 9, 4};
    printf("Max: %d\\n", find_max(data, 5));
    return 0;
}`,
      solution: `#include <stdio.h>
#include <limits.h>

int find_max(const int *arr, int n) {
    int max = INT_MIN;
    for (int i = 0; i < n; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

int main(void) {
    int data[] = {3, 7, 2, 9, 4};
    printf("Max: %d\\n", find_max(data, 5));
    return 0;
}`,
      hints: [
        'Use const int * for the array parameter since you only read it.',
        'Initialize max to INT_MIN from limits.h.',
        'Iterate through the array comparing each element.',
      ],
      concepts: ['const', 'arrays', 'function-parameters'],
    },
    {
      id: 'c-constv-9',
      title: 'Write a const-correct struct accessor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function get_name that takes a const pointer to a Person struct and returns a const char pointer to the name field.',
      skeleton: `#include <stdio.h>

typedef struct {
    char name[64];
    int age;
} Person;

// Write get_name here

int main(void) {
    Person p = {"Alice", 30};
    const char *name = get_name(&p);
    printf("Name: %s\\n", name);
    return 0;
}`,
      solution: `#include <stdio.h>

typedef struct {
    char name[64];
    int age;
} Person;

const char *get_name(const Person *p) {
    return p->name;
}

int main(void) {
    Person p = {"Alice", 30};
    const char *name = get_name(&p);
    printf("Name: %s\\n", name);
    return 0;
}`,
      hints: [
        'The parameter should be const Person * since you do not modify the struct.',
        'The return type should be const char * since returning internal data that should not be modified.',
        'This pattern protects struct internals from external mutation.',
      ],
      concepts: ['const', 'structs', 'encapsulation'],
    },
    {
      id: 'c-constv-10',
      title: 'Write a const-correct comparison',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a comparison function for qsort that takes two const void pointers, casts them to const int pointers, and returns the difference.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

// Write compare_ints here

int main(void) {
    int arr[] = {5, 2, 8, 1, 9};
    qsort(arr, 5, sizeof(int), compare_ints);
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int compare_ints(const void *a, const void *b) {
    const int *ia = (const int *)a;
    const int *ib = (const int *)b;
    return *ia - *ib;
}

int main(void) {
    int arr[] = {5, 2, 8, 1, 9};
    qsort(arr, 5, sizeof(int), compare_ints);
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,
      hints: [
        'qsort comparator signature is int (*)(const void *, const void *).',
        'Cast const void * to const int * before dereferencing.',
        'Return negative if a < b, zero if equal, positive if a > b.',
      ],
      concepts: ['const', 'void-pointers', 'qsort', 'function-pointers'],
    },
    {
      id: 'c-constv-11',
      title: 'Write a volatile spin-wait',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function wait_for_ready that spins on a volatile flag until it becomes non-zero, then returns the flag value.',
      skeleton: `#include <stdio.h>

volatile int ready_flag = 0;

// Write wait_for_ready here

int main(void) {
    ready_flag = 1; // Simulate hardware setting the flag
    int result = wait_for_ready();
    printf("Ready with value: %d\\n", result);
    return 0;
}`,
      solution: `#include <stdio.h>

volatile int ready_flag = 0;

int wait_for_ready(void) {
    while (ready_flag == 0) {
        // busy wait -- volatile ensures each iteration re-reads
    }
    return ready_flag;
}

int main(void) {
    ready_flag = 1; // Simulate hardware setting the flag
    int result = wait_for_ready();
    printf("Ready with value: %d\\n", result);
    return 0;
}`,
      hints: [
        'The variable must be declared volatile for the loop to re-read each iteration.',
        'Without volatile, the compiler may hoist the read out of the loop.',
        'Return the flag value after it becomes non-zero.',
      ],
      concepts: ['volatile', 'spin-wait', 'optimization-barriers'],
    },
    {
      id: 'c-constv-12',
      title: 'Write const-correct memcpy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function my_memcpy that copies n bytes from a const source to a destination. Use const correctly for the source.',
      skeleton: `#include <stdio.h>
#include <stddef.h>

// Write my_memcpy here

int main(void) {
    int src[] = {1, 2, 3};
    int dst[3];
    my_memcpy(dst, src, sizeof(src));
    for (int i = 0; i < 3; i++) {
        printf("%d ", dst[i]);
    }
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stddef.h>

void *my_memcpy(void *dest, const void *src, size_t n) {
    unsigned char *d = (unsigned char *)dest;
    const unsigned char *s = (const unsigned char *)src;
    for (size_t i = 0; i < n; i++) {
        d[i] = s[i];
    }
    return dest;
}

int main(void) {
    int src[] = {1, 2, 3};
    int dst[3];
    my_memcpy(dst, src, sizeof(src));
    for (int i = 0; i < 3; i++) {
        printf("%d ", dst[i]);
    }
    printf("\\n");
    return 0;
}`,
      hints: [
        'src is const void * because memcpy does not modify the source.',
        'Cast to unsigned char * for byte-by-byte copy.',
        'Return the destination pointer, matching the standard memcpy signature.',
      ],
      concepts: ['const', 'void-pointers', 'memory-operations'],
    },
    {
      id: 'c-constv-13',
      title: 'Bug: modifying const data',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the code that incorrectly tries to modify data through a const pointer.',
      skeleton: `#include <stdio.h>

void print_and_clear(const int *arr, int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
        arr[i] = 0; // BUG: cannot modify through const pointer
    }
    printf("\\n");
}

int main(void) {
    int data[] = {1, 2, 3, 4, 5};
    print_and_clear(data, 5);
    return 0;
}`,
      solution: `#include <stdio.h>

void print_and_clear(int *arr, int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
        arr[i] = 0;
    }
    printf("\\n");
}

int main(void) {
    int data[] = {1, 2, 3, 4, 5};
    print_and_clear(data, 5);
    return 0;
}`,
      hints: [
        'The function modifies arr elements, so the parameter cannot be const.',
        'Remove const from the parameter since the function writes to the array.',
        'Alternatively, separate printing and clearing into two functions.',
      ],
      concepts: ['const', 'type-qualifiers', 'compiler-errors'],
    },
    {
      id: 'c-constv-14',
      title: 'Bug: missing volatile in ISR flag',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the code where the compiler optimizes away a read because the shared flag is not declared volatile.',
      skeleton: `#include <stdio.h>
#include <signal.h>

int quit_flag = 0;  // BUG: should be volatile

void handler(int sig) {
    quit_flag = 1;
}

int main(void) {
    signal(SIGINT, handler);
    printf("Waiting for Ctrl+C...\\n");
    while (!quit_flag) {
        // busy-wait
    }
    printf("Caught signal, exiting.\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <signal.h>

volatile sig_atomic_t quit_flag = 0;

void handler(int sig) {
    quit_flag = 1;
}

int main(void) {
    signal(SIGINT, handler);
    printf("Waiting for Ctrl+C...\\n");
    while (!quit_flag) {
        // busy-wait
    }
    printf("Caught signal, exiting.\\n");
    return 0;
}`,
      hints: [
        'Variables modified in signal handlers must be volatile sig_atomic_t.',
        'Without volatile, the compiler may never re-read quit_flag inside the loop.',
        'sig_atomic_t guarantees atomic access from signal handlers.',
      ],
      concepts: ['volatile', 'signals', 'sig_atomic_t', 'optimization'],
    },
    {
      id: 'c-constv-15',
      title: 'Bug: casting away const',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the code that unsafely casts away const and modifies a string literal, causing undefined behavior.',
      skeleton: `#include <stdio.h>
#include <string.h>

void to_upper(const char *s) {
    char *p = (char *)s;  // BUG: casting away const
    for (int i = 0; p[i]; i++) {
        if (p[i] >= 'a' && p[i] <= 'z') {
            p[i] -= 32;
        }
    }
}

int main(void) {
    const char *msg = "hello";
    to_upper(msg);
    printf("%s\\n", msg);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

void to_upper(char *s) {
    for (int i = 0; s[i]; i++) {
        if (s[i] >= 'a' && s[i] <= 'z') {
            s[i] -= 32;
        }
    }
}

int main(void) {
    char msg[] = "hello";
    to_upper(msg);
    printf("%s\\n", msg);
    return 0;
}`,
      hints: [
        'Never cast away const to modify data -- it is undefined behavior if the original is truly const.',
        'Change the function parameter to non-const char * since it modifies the string.',
        'Use a char array instead of a string literal in main so the data is writable.',
      ],
      concepts: ['const', 'undefined-behavior', 'string-literals'],
    },
    {
      id: 'c-constv-16',
      title: 'Predict: const pointer reassignment',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output of this program that uses a pointer to const.',
      skeleton: `#include <stdio.h>

int main(void) {
    int a = 10, b = 20;
    const int *p = &a;
    printf("%d ", *p);
    p = &b;
    printf("%d\\n", *p);
    return 0;
}`,
      solution: `10 20`,
      hints: [
        'const int *p means *p is read-only, but p itself can be reassigned.',
        'First *p reads a (10), then p is reassigned to &b.',
        'After reassignment, *p reads b (20).',
      ],
      concepts: ['const', 'pointer-to-const', 'pointer-reassignment'],
    },
    {
      id: 'c-constv-17',
      title: 'Predict: const array decay',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output. Consider how a const array decays to a pointer.',
      skeleton: `#include <stdio.h>

void show(const int *p, int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", p[i]);
    }
    printf("\\n");
}

int main(void) {
    const int arr[] = {5, 10, 15};
    show(arr, 3);
    printf("%zu\\n", sizeof(arr) / sizeof(arr[0]));
    return 0;
}`,
      solution: `5 10 15
3`,
      hints: [
        'const int arr[] decays to const int * when passed to show().',
        'show prints each element: 5, 10, 15.',
        'sizeof(arr) is still 12 bytes (3 ints) in main, so 12/4 = 3.',
      ],
      concepts: ['const', 'array-decay', 'sizeof'],
    },
    {
      id: 'c-constv-18',
      title: 'Predict: volatile side effects',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output. The volatile variable forces re-reads.',
      skeleton: `#include <stdio.h>

int main(void) {
    volatile int x = 5;
    int a = x;
    int b = x;
    x = 10;
    int c = x;
    printf("%d %d %d\\n", a, b, c);
    return 0;
}`,
      solution: `5 5 10`,
      hints: [
        'Each read of a volatile variable produces the current value.',
        'a and b both read x when it is 5.',
        'After x = 10, c reads the new value 10.',
      ],
      concepts: ['volatile', 'side-effects', 'compiler-optimization'],
    },
    {
      id: 'c-constv-19',
      title: 'Refactor: add const correctness',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor the function signatures to be const-correct. Add const wherever the function does not modify the data.',
      skeleton: `#include <stdio.h>
#include <string.h>

int count_char(char *str, char c) {
    int count = 0;
    for (int i = 0; str[i]; i++) {
        if (str[i] == c) count++;
    }
    return count;
}

void print_array(int *arr, int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int dot_product(int *a, int *b, int n) {
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += a[i] * b[i];
    }
    return sum;
}

int main(void) {
    char msg[] = "hello world";
    printf("Count of l: %d\\n", count_char(msg, 'l'));
    int nums[] = {1, 2, 3};
    print_array(nums, 3);
    int v1[] = {1, 2, 3}, v2[] = {4, 5, 6};
    printf("Dot: %d\\n", dot_product(v1, v2, 3));
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int count_char(const char *str, char c) {
    int count = 0;
    for (int i = 0; str[i]; i++) {
        if (str[i] == c) count++;
    }
    return count;
}

void print_array(const int *arr, int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int dot_product(const int *a, const int *b, int n) {
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += a[i] * b[i];
    }
    return sum;
}

int main(void) {
    char msg[] = "hello world";
    printf("Count of l: %d\\n", count_char(msg, 'l'));
    int nums[] = {1, 2, 3};
    print_array(nums, 3);
    int v1[] = {1, 2, 3}, v2[] = {4, 5, 6};
    printf("Dot: %d\\n", dot_product(v1, v2, 3));
    return 0;
}`,
      hints: [
        'Any pointer parameter that is only read should be const.',
        'count_char reads str, print_array reads arr, dot_product reads both a and b.',
        'const correctness documents intent and catches accidental writes.',
      ],
      concepts: ['const', 'refactoring', 'const-correctness'],
    },
    {
      id: 'c-constv-20',
      title: 'Refactor: volatile and const for hardware',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor the hardware register access code to use proper const and volatile qualifiers. The control register is write-only, the status register is read-only, and the data register is read-write. All may change asynchronously.',
      skeleton: `#include <stdint.h>
#include <stdio.h>

// Hardware registers (simulated addresses)
uint32_t *control_reg = (uint32_t *)0x40000000;  // write-only
uint32_t *status_reg  = (uint32_t *)0x40000004;  // read-only
uint32_t *data_reg    = (uint32_t *)0x40000008;  // read-write

void write_control(uint32_t val) {
    *control_reg = val;
}

uint32_t read_status(void) {
    return *status_reg;
}

void write_data(uint32_t val) {
    *data_reg = val;
}

uint32_t read_data(void) {
    return *data_reg;
}`,
      solution: `#include <stdint.h>
#include <stdio.h>

// Hardware registers (simulated addresses)
volatile uint32_t *control_reg       = (volatile uint32_t *)0x40000000;         // write-only
const volatile uint32_t *status_reg  = (const volatile uint32_t *)0x40000004;   // read-only
volatile uint32_t *data_reg          = (volatile uint32_t *)0x40000008;         // read-write

void write_control(uint32_t val) {
    *control_reg = val;
}

uint32_t read_status(void) {
    return *status_reg;
}

void write_data(uint32_t val) {
    *data_reg = val;
}

uint32_t read_data(void) {
    return *data_reg;
}`,
      hints: [
        'All hardware registers need volatile since they can change outside program control.',
        'The read-only status register also needs const to prevent accidental writes.',
        'volatile uint32_t * for read-write, const volatile uint32_t * for read-only.',
      ],
      concepts: ['const', 'volatile', 'hardware-registers', 'embedded', 'type-qualifiers'],
    },
  ],
};
