import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-asm',
  title: '45. Inline Assembly',
  explanation: `## Inline Assembly

Inline assembly lets you embed assembly instructions directly in C code, giving access to hardware features and enabling fine-grained control over generated instructions.

\`\`\`c
#include <stdint.h>

// Basic inline assembly (GCC syntax)
int add(int a, int b) {
    int result;
    __asm__ ("addl %2, %1"
             : "=r" (result)    // output operand
             : "0" (a), "r" (b) // input operands
    );
    return result;
}

// CPUID instruction to query CPU features
void cpuid(uint32_t leaf, uint32_t *eax, uint32_t *ebx,
           uint32_t *ecx, uint32_t *edx) {
    __asm__ __volatile__ (
        "cpuid"
        : "=a"(*eax), "=b"(*ebx), "=c"(*ecx), "=d"(*edx)
        : "a"(leaf)
    );
}

// Read timestamp counter
uint64_t rdtsc(void) {
    uint32_t lo, hi;
    __asm__ __volatile__ ("rdtsc" : "=a"(lo), "=d"(hi));
    return ((uint64_t)hi << 32) | lo;
}
\`\`\`

### Key Concepts
- **__asm__**: keyword to introduce inline assembly (asm is also accepted)
- **__volatile__**: prevents the compiler from optimizing away the assembly
- **Output operands**: "=r" (any register), "=a" (eax), "=m" (memory)
- **Input operands**: "r" (register), "i" (immediate), "m" (memory)
- **Clobber list**: registers modified that are not in operand lists
- **Constraints**: "0" means same location as operand 0
- **AT&T syntax**: source first, then destination (GCC default)
`,
  exercises: [
    {
      id: 'c-asm-1',
      title: 'Basic inline add',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write inline assembly to add two integers.',
      skeleton: `#include <stdio.h>

int main(void) {
    int a = 10, b = 20, result;
    __asm__ ("addl %2, %0"
             : __BLANK__ (result)
             : "0" (a), __BLANK__ (b)
    );
    printf("Result: %d\\n", result);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int a = 10, b = 20, result;
    __asm__ ("addl %2, %0"
             : "=r" (result)
             : "0" (a), "r" (b)
    );
    printf("Result: %d\\n", result);
    return 0;
}`,
      hints: [
        '"=r" is an output constraint meaning any general register.',
        '"r" is an input constraint meaning any general register.',
        '"0" means use the same register as operand 0.'
      ],
      concepts: ['inline assembly', 'output constraint', 'input constraint', 'addl']
    },
    {
      id: 'c-asm-2',
      title: 'Read timestamp counter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use inline assembly to read the CPU timestamp counter (rdtsc).',
      skeleton: `#include <stdint.h>
#include <stdio.h>

uint64_t rdtsc(void) {
    uint32_t lo, hi;
    __asm__ __BLANK__ ("rdtsc" : "=a"(lo), __BLANK__(hi));
    return ((uint64_t)hi << 32) | lo;
}

int main(void) {
    uint64_t start = rdtsc();
    for (volatile int i = 0; i < 1000; i++);
    uint64_t end = rdtsc();
    printf("Cycles: %lu\\n", (unsigned long)(end - start));
    return 0;
}`,
      solution: `#include <stdint.h>
#include <stdio.h>

uint64_t rdtsc(void) {
    uint32_t lo, hi;
    __asm__ __volatile__ ("rdtsc" : "=a"(lo), "=d"(hi));
    return ((uint64_t)hi << 32) | lo;
}

int main(void) {
    uint64_t start = rdtsc();
    for (volatile int i = 0; i < 1000; i++);
    uint64_t end = rdtsc();
    printf("Cycles: %lu\\n", (unsigned long)(end - start));
    return 0;
}`,
      hints: [
        '__volatile__ prevents the compiler from reordering or removing the asm.',
        'rdtsc puts the low 32 bits in eax ("=a") and high 32 bits in edx ("=d").',
        'Combine the halves: (hi << 32) | lo.'
      ],
      concepts: ['rdtsc', '__volatile__', 'timestamp counter', 'register constraints']
    },
    {
      id: 'c-asm-3',
      title: 'CPUID instruction',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use inline assembly to execute the CPUID instruction.',
      skeleton: `#include <stdint.h>
#include <stdio.h>

void get_cpu_vendor(char vendor[13]) {
    uint32_t ebx, ecx, edx;
    __asm__ __volatile__ (
        __BLANK__
        : "=b"(ebx), "=c"(ecx), "=d"(edx)
        : __BLANK__(0)
        : "eax"
    );
    *(uint32_t *)(vendor + 0) = ebx;
    *(uint32_t *)(vendor + 4) = edx;
    *(uint32_t *)(vendor + 8) = ecx;
    vendor[12] = '\\0';
}

int main(void) {
    char vendor[13];
    get_cpu_vendor(vendor);
    printf("CPU: %s\\n", vendor);
    return 0;
}`,
      solution: `#include <stdint.h>
#include <stdio.h>

void get_cpu_vendor(char vendor[13]) {
    uint32_t ebx, ecx, edx;
    __asm__ __volatile__ (
        "cpuid"
        : "=b"(ebx), "=c"(ecx), "=d"(edx)
        : "a"(0)
        : "eax"
    );
    *(uint32_t *)(vendor + 0) = ebx;
    *(uint32_t *)(vendor + 4) = edx;
    *(uint32_t *)(vendor + 8) = ecx;
    vendor[12] = '\\0';
}

int main(void) {
    char vendor[13];
    get_cpu_vendor(vendor);
    printf("CPU: %s\\n", vendor);
    return 0;
}`,
      hints: [
        'cpuid with eax=0 returns the vendor string in ebx, edx, ecx.',
        '"a"(0) sets eax to 0 as an input.',
        'Note the vendor order: ebx, edx, ecx (not ebx, ecx, edx).'
      ],
      concepts: ['cpuid', 'register constraints', 'clobber list', 'CPU identification']
    },
    {
      id: 'c-asm-4',
      title: 'Memory barrier',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Insert a compiler memory barrier using inline assembly.',
      skeleton: `#include <stdio.h>

volatile int flag = 0;
int data = 0;

void producer(void) {
    data = 42;
    // Compiler memory barrier: prevent reordering
    __asm__ __volatile__ ("" : : : __BLANK__);
    flag = 1;
}

void consumer(void) {
    while (!flag);
    __asm__ __volatile__ ("" : : : __BLANK__);
    printf("Data: %d\\n", data);
}`,
      solution: `#include <stdio.h>

volatile int flag = 0;
int data = 0;

void producer(void) {
    data = 42;
    __asm__ __volatile__ ("" : : : "memory");
    flag = 1;
}

void consumer(void) {
    while (!flag);
    __asm__ __volatile__ ("" : : : "memory");
    printf("Data: %d\\n", data);
}`,
      hints: [
        'The "memory" clobber tells the compiler that memory may have changed.',
        'This prevents the compiler from reordering memory accesses across the barrier.',
        'An empty instruction string with "memory" clobber is a pure compiler barrier.'
      ],
      concepts: ['memory barrier', 'clobber list', 'compiler barrier', 'ordering']
    },
    {
      id: 'c-asm-5',
      title: 'Bit scan forward',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use the BSF (bit scan forward) instruction to find the lowest set bit.',
      skeleton: `#include <stdio.h>

int find_lowest_bit(unsigned int val) {
    int pos;
    __asm__ ("bsfl %1, %0"
             : __BLANK__ (pos)
             : __BLANK__ (val)
    );
    return pos;
}

int main(void) {
    printf("Lowest bit of 0x30: %d\\n", find_lowest_bit(0x30));
    return 0;
}`,
      solution: `#include <stdio.h>

int find_lowest_bit(unsigned int val) {
    int pos;
    __asm__ ("bsfl %1, %0"
             : "=r" (pos)
             : "r" (val)
    );
    return pos;
}

int main(void) {
    printf("Lowest bit of 0x30: %d\\n", find_lowest_bit(0x30));
    return 0;
}`,
      hints: [
        'bsfl scans a 32-bit value for the first set bit (from bit 0).',
        '"=r" assigns the output to a general purpose register.',
        '0x30 = 0b00110000, so the lowest set bit is at position 4.'
      ],
      concepts: ['bsf', 'bit scan', 'register constraint', 'bit manipulation']
    },
    {
      id: 'c-asm-6',
      title: 'Atomic compare-and-swap',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Implement an atomic compare-and-swap using the CMPXCHG instruction.',
      skeleton: `#include <stdint.h>
#include <stdio.h>

// Returns 1 if swap succeeded, 0 otherwise.
int cas(volatile int *ptr, int expected, int desired) {
    int result;
    __asm__ __volatile__ (
        "lock cmpxchgl %3, %1"
        : "=a" (result), "+m" (*ptr)
        : __BLANK__(expected), "r" (desired)
        : __BLANK__
    );
    return result == expected;
}

int main(void) {
    int val = 10;
    int ok = cas(&val, 10, 20);
    printf("cas: %d, val: %d\\n", ok, val);
    return 0;
}`,
      solution: `#include <stdint.h>
#include <stdio.h>

int cas(volatile int *ptr, int expected, int desired) {
    int result;
    __asm__ __volatile__ (
        "lock cmpxchgl %3, %1"
        : "=a" (result), "+m" (*ptr)
        : "a" (expected), "r" (desired)
        : "cc"
    );
    return result == expected;
}

int main(void) {
    int val = 10;
    int ok = cas(&val, 10, 20);
    printf("cas: %d, val: %d\\n", ok, val);
    return 0;
}`,
      hints: [
        'cmpxchg compares eax with the destination; if equal, stores the source.',
        '"a" constraint means the eax register (where cmpxchg expects the expected value).',
        '"cc" in the clobber list means condition codes (flags) are modified.'
      ],
      concepts: ['cmpxchg', 'lock prefix', 'atomic operations', 'compare-and-swap']
    },
    {
      id: 'c-asm-7',
      title: 'Implement popcount',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function using the POPCNT instruction to count set bits.',
      skeleton: `#include <stdint.h>
#include <stdio.h>

// Use the popcnt instruction to count the number of 1 bits.
// Assume the CPU supports POPCNT (SSE4.2+).
int popcount_asm(uint32_t val) {
    // TODO: implement using inline assembly
}`,
      solution: `#include <stdint.h>
#include <stdio.h>

int popcount_asm(uint32_t val) {
    int count;
    __asm__ ("popcntl %1, %0"
             : "=r" (count)
             : "r" (val)
    );
    return count;
}`,
      hints: [
        'popcntl counts the number of set bits in a 32-bit operand.',
        'The result goes in the first operand, source is the second.',
        'Use "=r" for output and "r" for input.'
      ],
      concepts: ['popcnt', 'bit counting', 'SSE4.2', 'inline assembly']
    },
    {
      id: 'c-asm-8',
      title: 'Byte swap with BSWAP',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that reverses byte order of a 32-bit integer using BSWAP.',
      skeleton: `#include <stdint.h>
#include <stdio.h>

// Reverse the byte order of a 32-bit integer using bswap.
uint32_t byte_swap(uint32_t val) {
    // TODO: implement using inline assembly
}`,
      solution: `#include <stdint.h>
#include <stdio.h>

uint32_t byte_swap(uint32_t val) {
    __asm__ ("bswapl %0" : "+r" (val));
    return val;
}`,
      hints: [
        'bswapl reverses all bytes in a 32-bit register.',
        '"+r" means the operand is both input and output.',
        'bswap operates in-place on a single register.'
      ],
      concepts: ['bswap', 'byte order', 'endian conversion', 'in-place operation']
    },
    {
      id: 'c-asm-9',
      title: 'Implement a spinlock',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write spinlock acquire and release functions using inline assembly.',
      skeleton: `#include <stdint.h>

typedef volatile int spinlock_t;

// Acquire: spin until lock is 0, then set to 1 atomically.
void spin_lock(spinlock_t *lock) {
    // TODO: implement using xchg or lock cmpxchg
}

// Release: set lock to 0 with a memory barrier.
void spin_unlock(spinlock_t *lock) {
    // TODO: implement
}`,
      solution: `#include <stdint.h>

typedef volatile int spinlock_t;

void spin_lock(spinlock_t *lock) {
    int expected = 0;
    while (1) {
        expected = 0;
        __asm__ __volatile__ (
            "lock cmpxchgl %2, %1"
            : "+a" (expected), "+m" (*lock)
            : "r" (1)
            : "cc", "memory"
        );
        if (expected == 0) break;
        while (*lock) {
            __asm__ __volatile__ ("pause" ::: "memory");
        }
    }
}

void spin_unlock(spinlock_t *lock) {
    __asm__ __volatile__ ("" ::: "memory");
    *lock = 0;
}`,
      hints: [
        'Use lock cmpxchg to atomically try to change 0 to 1.',
        'The pause instruction reduces power consumption during spinning.',
        'Release just needs a memory barrier before setting lock to 0.'
      ],
      concepts: ['spinlock', 'cmpxchg', 'pause', 'atomic acquire/release']
    },
    {
      id: 'c-asm-10',
      title: 'Extended asm with memory operand',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that increments a memory location atomically using inline assembly.',
      skeleton: `#include <stdio.h>

// Atomically increment *ptr by 1 and return the old value.
int atomic_fetch_add(volatile int *ptr) {
    // TODO: implement using lock xadd
}`,
      solution: `#include <stdio.h>

int atomic_fetch_add(volatile int *ptr) {
    int val = 1;
    __asm__ __volatile__ (
        "lock xaddl %0, %1"
        : "+r" (val), "+m" (*ptr)
        :
        : "cc", "memory"
    );
    return val;
}`,
      hints: [
        'xadd exchanges and adds: temp=dest, dest+=src, src=temp.',
        'lock prefix makes the operation atomic.',
        '"+r" means both input and output for the register operand.'
      ],
      concepts: ['xadd', 'lock prefix', 'atomic increment', 'fetch-and-add']
    },
    {
      id: 'c-asm-11',
      title: 'Port I/O operations',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write functions to read and write to I/O ports using inline assembly (for kernel/embedded use).',
      skeleton: `#include <stdint.h>

// Read a byte from an I/O port.
uint8_t inb(uint16_t port) {
    // TODO: implement using 'inb' instruction
}

// Write a byte to an I/O port.
void outb(uint16_t port, uint8_t data) {
    // TODO: implement using 'outb' instruction
}`,
      solution: `#include <stdint.h>

uint8_t inb(uint16_t port) {
    uint8_t data;
    __asm__ __volatile__ (
        "inb %1, %0"
        : "=a" (data)
        : "Nd" (port)
    );
    return data;
}

void outb(uint16_t port, uint8_t data) {
    __asm__ __volatile__ (
        "outb %0, %1"
        :
        : "a" (data), "Nd" (port)
    );
}`,
      hints: [
        'inb reads a byte from port into AL (eax low byte).',
        'outb writes AL to the specified port.',
        '"Nd" constraint: N allows immediate 0-255, d allows the dx register.'
      ],
      concepts: ['inb', 'outb', 'port I/O', 'kernel programming']
    },
    {
      id: 'c-asm-12',
      title: 'Syscall via inline assembly',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a function that invokes a Linux system call directly using inline assembly.',
      skeleton: `#include <stdint.h>
#include <unistd.h>

// Invoke write(1, msg, len) using the syscall instruction directly.
// Linux x86_64: syscall number in rax, args in rdi, rsi, rdx.
// write is syscall #1.
ssize_t my_write(const char *msg, size_t len) {
    // TODO: implement using syscall instruction
}`,
      solution: `#include <stdint.h>
#include <unistd.h>

ssize_t my_write(const char *msg, size_t len) {
    ssize_t ret;
    __asm__ __volatile__ (
        "syscall"
        : "=a" (ret)
        : "a" ((long)1),          // syscall number (write)
          "D" ((long)1),          // rdi = fd (stdout)
          "S" ((long)msg),        // rsi = buffer
          "d" ((long)len)         // rdx = count
        : "rcx", "r11", "memory"
    );
    return ret;
}`,
      hints: [
        'syscall instruction uses rax for the syscall number.',
        'Arguments go in rdi, rsi, rdx, r10, r8, r9 for Linux x86_64.',
        'syscall clobbers rcx and r11 (used for return address and flags).'
      ],
      concepts: ['syscall', 'Linux ABI', 'system call', 'register convention']
    },
    {
      id: 'c-asm-13',
      title: 'Fix missing volatile',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the inline assembly that gets optimized away because it lacks volatile.',
      skeleton: `#include <stdint.h>
#include <stdio.h>

// BUG: The compiler may optimize away this rdtsc call or
// reorder it relative to the code being measured.
uint64_t measure_cycles(void) {
    uint32_t lo, hi;
    uint64_t start, end;

    __asm__ ("rdtsc" : "=a"(lo), "=d"(hi));  // Bug: not volatile
    start = ((uint64_t)hi << 32) | lo;

    for (volatile int i = 0; i < 1000; i++);

    __asm__ ("rdtsc" : "=a"(lo), "=d"(hi));  // Bug: not volatile
    end = ((uint64_t)hi << 32) | lo;

    return end - start;
}`,
      solution: `#include <stdint.h>
#include <stdio.h>

uint64_t measure_cycles(void) {
    uint32_t lo, hi;
    uint64_t start, end;

    __asm__ __volatile__ ("rdtsc" : "=a"(lo), "=d"(hi));
    start = ((uint64_t)hi << 32) | lo;

    for (volatile int i = 0; i < 1000; i++);

    __asm__ __volatile__ ("rdtsc" : "=a"(lo), "=d"(hi));
    end = ((uint64_t)hi << 32) | lo;

    return end - start;
}`,
      hints: [
        'Without volatile, the compiler may merge or remove duplicate asm statements.',
        'volatile tells the compiler the asm has important side effects.',
        'For timing measurements, both rdtsc calls must actually execute at their positions.'
      ],
      concepts: ['__volatile__', 'compiler optimization', 'rdtsc', 'measurement']
    },
    {
      id: 'c-asm-14',
      title: 'Fix missing clobber list',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the inline assembly that corrupts registers because the clobber list is incomplete.',
      skeleton: `#include <stdint.h>
#include <stdio.h>

// BUG: cpuid modifies eax, ebx, ecx, edx but clobber list is empty
uint32_t get_cpu_features(void) {
    uint32_t features;
    __asm__ __volatile__ (
        "movl $1, %%eax\\n\\t"
        "cpuid\\n\\t"
        "movl %%edx, %0"
        : "=r" (features)
        :
        // Bug: missing clobbers
    );
    return features;
}`,
      solution: `#include <stdint.h>
#include <stdio.h>

uint32_t get_cpu_features(void) {
    uint32_t features;
    __asm__ __volatile__ (
        "movl $1, %%eax\\n\\t"
        "cpuid\\n\\t"
        "movl %%edx, %0"
        : "=r" (features)
        :
        : "eax", "ebx", "ecx", "edx"
    );
    return features;
}`,
      hints: [
        'cpuid modifies eax, ebx, ecx, and edx.',
        'Any register modified inside asm but not listed as output must be clobbered.',
        'Missing clobbers cause the compiler to assume those registers are preserved.'
      ],
      concepts: ['clobber list', 'cpuid', 'register corruption', 'compiler assumptions']
    },
    {
      id: 'c-asm-15',
      title: 'Fix AT&T vs Intel operand order',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Fix inline assembly that uses Intel operand order instead of AT&T syntax.',
      skeleton: `#include <stdio.h>

// BUG: Uses Intel syntax (dest, src) but GCC defaults to AT&T (src, dest)
int subtract(int a, int b) {
    int result;
    __asm__ (
        "movl %1, %0\\n\\t"
        "subl %0, %2"   // Bug: operand order is wrong for AT&T
        : "=r" (result)
        : "r" (a), "r" (b)
    );
    return result;
}

int main(void) {
    printf("10 - 3 = %d\\n", subtract(10, 3));
    return 0;
}`,
      solution: `#include <stdio.h>

int subtract(int a, int b) {
    int result;
    __asm__ (
        "movl %1, %0\\n\\t"
        "subl %2, %0"
        : "=r" (result)
        : "r" (a), "r" (b)
    );
    return result;
}

int main(void) {
    printf("10 - 3 = %d\\n", subtract(10, 3));
    return 0;
}`,
      hints: [
        'AT&T syntax: instruction src, dest (source first, destination second).',
        'subl %2, %0 means: result = result - b.',
        'Intel syntax is the opposite: instruction dest, src.'
      ],
      concepts: ['AT&T syntax', 'operand order', 'subl', 'syntax mismatch']
    },
    {
      id: 'c-asm-16',
      title: 'Predict register output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output of inline assembly that performs arithmetic.',
      skeleton: `#include <stdio.h>

int main(void) {
    int val = 5;
    __asm__ ("shll $2, %0" : "+r" (val));
    printf("val: %d\\n", val);

    __asm__ ("shrl $1, %0" : "+r" (val));
    printf("val: %d\\n", val);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int val = 5;
    __asm__ ("shll $2, %0" : "+r" (val));
    printf("val: %d\\n", val);

    __asm__ ("shrl $1, %0" : "+r" (val));
    printf("val: %d\\n", val);
    return 0;
}

// Output:
// val: 20
// val: 10`,
      hints: [
        'shll is shift left logical: val << 2 = val * 4.',
        'shrl is shift right logical: val >> 1 = val / 2.',
        '5 << 2 = 20, then 20 >> 1 = 10.'
      ],
      concepts: ['shift left', 'shift right', 'shll', 'shrl']
    },
    {
      id: 'c-asm-17',
      title: 'Predict XOR swap',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output of an XOR swap implemented in inline assembly.',
      skeleton: `#include <stdio.h>

int main(void) {
    int a = 0xAA, b = 0x55;
    __asm__ (
        "xorl %1, %0\\n\\t"
        "xorl %0, %1\\n\\t"
        "xorl %1, %0"
        : "+r" (a), "+r" (b)
    );
    printf("a=0x%X b=0x%X\\n", a, b);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int a = 0xAA, b = 0x55;
    __asm__ (
        "xorl %1, %0\\n\\t"
        "xorl %0, %1\\n\\t"
        "xorl %1, %0"
        : "+r" (a), "+r" (b)
    );
    printf("a=0x%X b=0x%X\\n", a, b);
    return 0;
}

// Output:
// a=0x55 b=0xAA`,
      hints: [
        'Three XOR operations can swap two values without a temporary.',
        'a ^= b; b ^= a; a ^= b; results in a and b being swapped.',
        '0xAA and 0x55 will be exchanged.'
      ],
      concepts: ['XOR swap', 'xorl', 'register swap', 'bitwise XOR']
    },
    {
      id: 'c-asm-18',
      title: 'Predict NEG result',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output of the NEG (negate) instruction.',
      skeleton: `#include <stdio.h>

int main(void) {
    int x = 42;
    __asm__ ("negl %0" : "+r" (x));
    printf("x: %d\\n", x);

    int y = -7;
    __asm__ ("negl %0" : "+r" (y));
    printf("y: %d\\n", y);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int x = 42;
    __asm__ ("negl %0" : "+r" (x));
    printf("x: %d\\n", x);

    int y = -7;
    __asm__ ("negl %0" : "+r" (y));
    printf("y: %d\\n", y);
    return 0;
}

// Output:
// x: -42
// y: 7`,
      hints: [
        'negl negates a value (two\'s complement negation).',
        'It computes 0 - operand.',
        'Negating 42 gives -42, negating -7 gives 7.'
      ],
      concepts: ['negl', 'negation', 'twos complement', 'inline assembly']
    },
    {
      id: 'c-asm-19',
      title: 'Refactor to use built-in atomics',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor inline assembly atomic operations to use GCC built-in atomic functions.',
      skeleton: `#include <stdio.h>

// Refactor these inline asm operations to use GCC __sync or
// __atomic built-in functions.
int atomic_add(volatile int *ptr, int val) {
    int old;
    __asm__ __volatile__ (
        "lock xaddl %0, %1"
        : "=r" (old), "+m" (*ptr)
        : "0" (val)
        : "cc", "memory"
    );
    return old;
}

int atomic_cas(volatile int *ptr, int expected, int desired) {
    int result;
    __asm__ __volatile__ (
        "lock cmpxchgl %3, %1"
        : "=a" (result), "+m" (*ptr)
        : "a" (expected), "r" (desired)
        : "cc", "memory"
    );
    return result == expected;
}`,
      solution: `#include <stdio.h>

int atomic_add(volatile int *ptr, int val) {
    return __atomic_fetch_add(ptr, val, __ATOMIC_SEQ_CST);
}

int atomic_cas(volatile int *ptr, int expected, int desired) {
    return __atomic_compare_exchange_n(
        ptr, &expected, desired, 0,
        __ATOMIC_SEQ_CST, __ATOMIC_SEQ_CST);
}`,
      hints: [
        '__atomic_fetch_add replaces lock xadd and returns the old value.',
        '__atomic_compare_exchange_n replaces lock cmpxchg.',
        '__ATOMIC_SEQ_CST provides the strongest memory ordering (like lock prefix).'
      ],
      concepts: ['__atomic builtins', 'fetch_add', 'compare_exchange', 'portability']
    },
    {
      id: 'c-asm-20',
      title: 'Refactor to use intrinsics',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor inline assembly CPUID and RDTSC to use compiler intrinsics.',
      skeleton: `#include <stdint.h>
#include <stdio.h>

// Refactor these to use compiler intrinsics (__builtin_ia32_rdtsc
// and __get_cpuid or _mm_popcnt_u32) for better portability.
uint64_t get_tsc(void) {
    uint32_t lo, hi;
    __asm__ __volatile__ ("rdtsc" : "=a"(lo), "=d"(hi));
    return ((uint64_t)hi << 32) | lo;
}

int count_bits(uint32_t val) {
    int count;
    __asm__ ("popcntl %1, %0" : "=r"(count) : "r"(val));
    return count;
}`,
      solution: `#include <stdint.h>
#include <stdio.h>
#include <x86intrin.h>

uint64_t get_tsc(void) {
    return __rdtsc();
}

int count_bits(uint32_t val) {
    return __builtin_popcount(val);
}`,
      hints: [
        '__rdtsc() is the intrinsic for the rdtsc instruction.',
        '__builtin_popcount() counts set bits portably.',
        'Include <x86intrin.h> for x86-specific intrinsics.'
      ],
      concepts: ['intrinsics', '__rdtsc', '__builtin_popcount', 'portability']
    }
  ]
};
