import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-asm',
  title: '36. Inline Assembly',
  language: 'zig',
  explanation: `Zig supports inline assembly with \`asm volatile\`. The syntax follows LLVM's inline asm format.

**Basic inline asm:**
\`\`\`zig
asm volatile ("nop");
\`\`\`

**With output operand:**
\`\`\`zig
const result = asm volatile ("mov %[out], #42"
    : [out] "=r" (-> u32)
    :
    :
);
\`\`\`

**With input and output:**
\`\`\`zig
const doubled = asm volatile ("add %[out], %[in], %[in]"
    : [out] "=r" (-> u32)
    : [in] "r" (value)
    :
);
\`\`\`

**Clobbers** list registers modified by the asm:
\`\`\`zig
asm volatile ("..." : : : "rax", "rbx");
\`\`\`

**Memory clobber** prevents optimization across the asm:
\`\`\`zig
asm volatile ("" : : : "memory");
\`\`\`

Inline assembly is typically used for hardware instructions unavailable in Zig, system call wrappers, or CPUID/RDTSC.`,
  exercises: [
    {
      id: 'zig-asm-1',
      title: 'NOP instruction',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Write an inline nop instruction.',
      skeleton: `pub fn main() void {
    _____ volatile ("nop");
}`,
      solution: `pub fn main() void {
    asm volatile ("nop");
}`,
      hints: [
        'asm volatile executes inline assembly.',
        'nop is a no-operation instruction.',
        'volatile prevents the compiler from removing it.',
      ],
      concepts: ['asm volatile', 'nop'],
    },
    {
      id: 'zig-asm-2',
      title: 'Return value from asm',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Use inline asm to return a constant value.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const val: u32 = asm volatile ("mov %[out], #7"
        : [out] "=r" (-> u32)
        :
        :
    );
    _ = val;
    std.debug.print("ok\\n", .{});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const val: u32 = asm volatile ("mov %[out], #7"
        : [out] "=r" (-> u32)
        :
        :
    );
    _ = val;
    std.debug.print("ok\\n", .{});
}`,
      hints: [
        'The output operand uses : [name] "=r" (-> T) syntax.',
        'This stores the result in a register.',
        'Output: ok (assembly executes silently).',
      ],
      concepts: ['output operand', 'register constraint'],
    },
    {
      id: 'zig-asm-3',
      title: 'Input operand',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Pass a value to inline asm as an input operand.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const x: u32 = 5;
    asm volatile ("" // just use the input
        :
        : [in] "r" (_____)
        :
    );
    std.debug.print("ok\\n", .{});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const x: u32 = 5;
    asm volatile ("" // just use the input
        :
        : [in] "r" (x)
        :
    );
    std.debug.print("ok\\n", .{});
}`,
      hints: [
        'Input operands come in the second section.',
        '[name] "r" (value) places value in a register.',
        'Output: ok.',
      ],
      concepts: ['input operand', '"r" constraint'],
    },
    {
      id: 'zig-asm-4',
      title: 'Memory clobber fence',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Insert a memory fence using inline asm with memory clobber.',
      skeleton: `pub fn fence() void {
    asm volatile ("" : : : "memory");
}

pub fn main() void {
    fence();
    const std = @import("std");
    std.debug.print("fenced\\n", .{});
}`,
      solution: `pub fn fence() void {
    asm volatile ("" : : : "memory");
}

pub fn main() void {
    fence();
    const std = @import("std");
    std.debug.print("fenced\\n", .{});
}`,
      hints: [
        '"memory" clobber prevents load/store reordering across the asm.',
        'An empty asm with memory clobber is a compiler barrier.',
        'Output: fenced.',
      ],
      concepts: ['memory clobber', 'compiler barrier'],
    },
    {
      id: 'zig-asm-5',
      title: 'x86 CPUID',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use CPUID instruction to get CPU info (x86 only).',
      skeleton: `const std = @import("std");

fn cpuid(leaf: u32) struct { eax: u32, ebx: u32, ecx: u32, edx: u32 } {
    var eax: u32 = undefined;
    var ebx: u32 = undefined;
    var ecx: u32 = undefined;
    var edx: u32 = undefined;
    asm volatile ("cpuid"
        : [eax] "={eax}" (eax),
          [ebx] "={ebx}" (ebx),
          [ecx] "={ecx}" (ecx),
          [edx] "={edx}" (edx)
        : [leaf] "{eax}" (leaf)
        :
    );
    return .{ .eax = eax, .ebx = ebx, .ecx = ecx, .edx = edx };
}

pub fn main() void {
    const info = cpuid(0);
    std.debug.print("max leaf: {d}\\n", .{info.eax});
}`,
      solution: `const std = @import("std");

fn cpuid(leaf: u32) struct { eax: u32, ebx: u32, ecx: u32, edx: u32 } {
    var eax: u32 = undefined;
    var ebx: u32 = undefined;
    var ecx: u32 = undefined;
    var edx: u32 = undefined;
    asm volatile ("cpuid"
        : [eax] "={eax}" (eax),
          [ebx] "={ebx}" (ebx),
          [ecx] "={ecx}" (ecx),
          [edx] "={edx}" (edx)
        : [leaf] "{eax}" (leaf)
        :
    );
    return .{ .eax = eax, .ebx = ebx, .ecx = ecx, .edx = edx };
}

pub fn main() void {
    const info = cpuid(0);
    std.debug.print("max leaf: {d}\\n", .{info.eax});
}`,
      hints: [
        '={eax} binds the eax register as an output.',
        '{eax} binds eax as the input register.',
        'CPUID leaf 0 returns max supported leaf in EAX.',
      ],
      concepts: ['CPUID', 'register binding', 'x86 asm'],
    },
    {
      id: 'zig-asm-6',
      title: 'Read RDTSC timestamp',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Read the CPU timestamp counter using RDTSC.',
      skeleton: `const std = @import("std");

fn rdtsc() u64 {
    var lo: u32 = undefined;
    var hi: u32 = undefined;
    asm volatile ("rdtsc"
        : [lo] "={eax}" (lo),
          [hi] "={edx}" (hi)
        :
        :
    );
    return (@as(u64, hi) << 32) | @as(u64, lo);
}

pub fn main() void {
    const t = rdtsc();
    std.debug.print("tsc: {d}\\n", .{t});
}`,
      solution: `const std = @import("std");

fn rdtsc() u64 {
    var lo: u32 = undefined;
    var hi: u32 = undefined;
    asm volatile ("rdtsc"
        : [lo] "={eax}" (lo),
          [hi] "={edx}" (hi)
        :
        :
    );
    return (@as(u64, hi) << 32) | @as(u64, lo);
}

pub fn main() void {
    const t = rdtsc();
    std.debug.print("tsc: {d}\\n", .{t});
}`,
      hints: [
        'rdtsc places low 32 bits in eax, high 32 bits in edx.',
        'Combine to form a u64.',
        'Output: a large timestamp counter value.',
      ],
      concepts: ['RDTSC', 'timestamp counter', 'u64 from two u32'],
    },
    {
      id: 'zig-asm-7',
      title: 'Clobber a specific register',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Declare a clobber for a register modified by asm.',
      skeleton: `pub fn fn_that_clobbers_rax() void {
    asm volatile ("xor %%rax, %%rax"
        :
        :
        : _____
    );
}

pub fn main() void {
    fn_that_clobbers_rax();
}`,
      solution: `pub fn fn_that_clobbers_rax() void {
    asm volatile ("xor %%rax, %%rax"
        :
        :
        : "rax"
    );
}

pub fn main() void {
    fn_that_clobbers_rax();
}`,
      hints: [
        'List clobbered registers as strings in the third section.',
        '"rax" tells the compiler rax is modified.',
        'The compiler will save/restore rax around this asm if needed.',
      ],
      concepts: ['clobber list', 'register clobber'],
    },
    {
      id: 'zig-asm-8',
      title: 'Inline asm for system call (Linux x86-64)',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Implement a raw Linux syscall using inline asm.',
      skeleton: `const std = @import("std");

fn syscall1(number: usize, arg1: usize) usize {
    return asm volatile ("syscall"
        : [ret] "={rax}" (-> usize)
        : [num] "{rax}" (number),
          [a1]  "{rdi}" (arg1)
        : "rcx", "r11", "memory"
    );
}

pub fn main() void {
    // syscall 60 = exit(0)
    _ = syscall1(60, 0);
    std.debug.print("unreachable\\n", .{});
}`,
      solution: `const std = @import("std");

fn syscall1(number: usize, arg1: usize) usize {
    return asm volatile ("syscall"
        : [ret] "={rax}" (-> usize)
        : [num] "{rax}" (number),
          [a1]  "{rdi}" (arg1)
        : "rcx", "r11", "memory"
    );
}

pub fn main() void {
    _ = syscall1(60, 0);
    std.debug.print("unreachable\\n", .{});
}`,
      hints: [
        'Linux x86-64 syscalls: number in rax, args in rdi, rsi, rdx...',
        'syscall clobbers rcx and r11.',
        'exit(0) terminates the process; the print is never reached.',
      ],
      concepts: ['syscall', 'Linux ABI', 'inline asm syscall'],
    },
    {
      id: 'zig-asm-9',
      title: 'asm with multiple outputs',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use inline asm with multiple output operands.',
      skeleton: `const std = @import("std");

fn divmod(a: u32, b: u32) struct { q: u32, r: u32 } {
    var q: u32 = undefined;
    var r: u32 = undefined;
    asm volatile ("divl %[div]"
        : [quot] "={eax}" (q),
          [rem]  "={edx}" (r)
        : [num]  "{eax}" (a),
          [zero] "{edx}" (@as(u32, 0)),
          [div]  "r"     (b)
        :
    );
    return .{ .q = q, .r = r };
}

pub fn main() void {
    const result = divmod(17, 5);
    std.debug.print("{d} {d}\\n", .{ result.q, result.r });
}`,
      solution: `const std = @import("std");

fn divmod(a: u32, b: u32) struct { q: u32, r: u32 } {
    var q: u32 = undefined;
    var r: u32 = undefined;
    asm volatile ("divl %[div]"
        : [quot] "={eax}" (q),
          [rem]  "={edx}" (r)
        : [num]  "{eax}" (a),
          [zero] "{edx}" (@as(u32, 0)),
          [div]  "r"     (b)
        :
    );
    return .{ .q = q, .r = r };
}

pub fn main() void {
    const result = divmod(17, 5);
    std.debug.print("{d} {d}\\n", .{ result.q, result.r });
}`,
      hints: [
        'x86 divl gives quotient in eax and remainder in edx.',
        '17 / 5 = 3 remainder 2.',
        'Output: 3 2.',
      ],
      concepts: ['multiple outputs', 'divl', 'x86 division'],
    },
    {
      id: 'zig-asm-10',
      title: 'Volatile prevents optimization',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Understand why volatile is needed for side-effectful asm.',
      skeleton: `pub fn main() void {
    // Without volatile, the compiler may remove this
    asm volatile ("nop");
    asm volatile ("nop");
    // Both nops are guaranteed to be emitted
    const std = @import("std");
    std.debug.print("ok\\n", .{});
}`,
      solution: `ok`,
      hints: [
        'asm volatile means "do not optimize away this asm".',
        'Without volatile, the compiler may remove asm with no outputs.',
        'Output: ok.',
      ],
      concepts: ['volatile semantics', 'optimizer fence'],
    },
    {
      id: 'zig-asm-11',
      title: 'Immediate constraint',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use an immediate integer constraint in inline asm.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const x: u32 = asm volatile ("mov %[out], #_____"
        : [out] "=r" (-> u32)
        :
        :
    );
    std.debug.print("{d}\\n", .{x});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const x: u32 = asm volatile ("mov %[out], #99"
        : [out] "=r" (-> u32)
        :
        :
    );
    std.debug.print("{d}\\n", .{x});
}`,
      hints: [
        'An immediate value is a constant in the asm instruction.',
        'Use any number you like.',
        'Output: 99.',
      ],
      concepts: ['immediate constraint', 'asm constant'],
    },
    {
      id: 'zig-asm-12',
      title: 'PAUSE instruction for spin loops',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Insert a PAUSE instruction to improve spin-wait loops.',
      skeleton: `pub fn spinHint() void {
    asm volatile ("pause" : : : "memory");
}

pub fn main() void {
    var i: u32 = 0;
    while (i < 3) : (i += 1) {
        spinHint();
    }
    const std = @import("std");
    std.debug.print("done\\n", .{});
}`,
      solution: `pub fn spinHint() void {
    asm volatile ("pause" : : : "memory");
}

pub fn main() void {
    var i: u32 = 0;
    while (i < 3) : (i += 1) {
        spinHint();
    }
    const std = @import("std");
    std.debug.print("done\\n", .{});
}`,
      hints: [
        'PAUSE reduces power in spin-wait loops and prevents memory order violations.',
        'memory clobber ensures the loop is not optimized away.',
        'Output: done.',
      ],
      concepts: ['PAUSE instruction', 'spin-wait', 'memory fence'],
    },
    {
      id: 'zig-asm-13',
      title: 'HLT instruction (privileged)',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Declare a halt function using inline asm.',
      skeleton: `pub fn halt() noreturn {
    while (true) {
        asm volatile ("hlt");
    }
}

pub fn main() void {
    // halt() would freeze the CPU in ring 0; don't call it here
    const std = @import("std");
    std.debug.print("halt declared\\n", .{});
}`,
      solution: `pub fn halt() noreturn {
    while (true) {
        asm volatile ("hlt");
    }
}

pub fn main() void {
    const std = @import("std");
    std.debug.print("halt declared\\n", .{});
}`,
      hints: [
        'HLT halts the CPU until the next interrupt.',
        'Used in kernel idle loops or bare-metal code.',
        'Output: halt declared.',
      ],
      concepts: ['HLT', 'bare-metal', 'noreturn'],
    },
    {
      id: 'zig-asm-14',
      title: 'Read flags register',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Read the x86 EFLAGS register using PUSHFQ.',
      skeleton: `const std = @import("std");

fn readFlags() u64 {
    var flags: u64 = undefined;
    asm volatile ("pushfq; popq %[f]"
        : [f] "=r" (flags)
        :
        : "memory"
    );
    return flags;
}

pub fn main() void {
    const f = readFlags();
    const if_bit = (f >> 9) & 1; // Interrupt Flag
    std.debug.print("IF={d}\\n", .{if_bit});
}`,
      solution: `const std = @import("std");

fn readFlags() u64 {
    var flags: u64 = undefined;
    asm volatile ("pushfq; popq %[f]"
        : [f] "=r" (flags)
        :
        : "memory"
    );
    return flags;
}

pub fn main() void {
    const f = readFlags();
    const if_bit = (f >> 9) & 1;
    std.debug.print("IF={d}\\n", .{if_bit});
}`,
      hints: [
        'PUSHFQ pushes RFLAGS to stack; POPQ pops it.',
        'Bit 9 is the Interrupt Flag (1 = enabled).',
        'In user space, IF is usually 1.',
      ],
      concepts: ['RFLAGS', 'PUSHFQ', 'flag register'],
    },
    {
      id: 'zig-asm-15',
      title: 'Arm nop via inline asm',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write platform-agnostic no-op using comptime architecture check.',
      skeleton: `const std = @import("std");
const builtin = @import("builtin");

pub fn nop() void {
    switch (builtin.cpu.arch) {
        .x86_64 => asm volatile ("nop"),
        .aarch64 => asm volatile ("nop"),
        else => {},
    }
}

pub fn main() void {
    nop();
    std.debug.print("nop\\n", .{});
}`,
      solution: `const std = @import("std");
const builtin = @import("builtin");

pub fn nop() void {
    switch (builtin.cpu.arch) {
        .x86_64 => asm volatile ("nop"),
        .aarch64 => asm volatile ("nop"),
        else => {},
    }
}

pub fn main() void {
    nop();
    std.debug.print("nop\\n", .{});
}`,
      hints: [
        'builtin.cpu.arch is the target architecture at comptime.',
        'Switch allows platform-specific asm with a fallback.',
        'Output: nop.',
      ],
      concepts: ['builtin.cpu.arch', 'cross-platform asm'],
    },
    {
      id: 'zig-asm-16',
      title: 'Inline asm vs std.atomic',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Understand when to use inline asm vs stdlib atomic operations.',
      skeleton: `const std = @import("std");
const Atomic = std.atomic.Value(u32);

pub fn main() void {
    var a = Atomic.init(0);
    _ = a.fetchAdd(1, .seq_cst);
    std.debug.print("{d}\\n", .{a.load(.seq_cst)});
}`,
      solution: `1`,
      hints: [
        'std.atomic is preferred over inline asm for atomics.',
        'fetchAdd adds 1 atomically and returns old value.',
        'a is now 1.',
      ],
      concepts: ['std.atomic', 'prefer stdlib over asm'],
    },
    {
      id: 'zig-asm-17',
      title: 'Write to memory-mapped register',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write to a volatile memory address (simulating MMIO).',
      skeleton: `const std = @import("std");

fn mmioWrite(addr: usize, val: u32) void {
    const ptr: *volatile u32 = @ptrFromInt(addr);
    ptr.* = val;
}

pub fn main() void {
    var reg: u32 = 0;
    mmioWrite(@intFromPtr(&reg), 0xDEAD);
    std.debug.print("{x}\\n", .{reg});
}`,
      solution: `const std = @import("std");

fn mmioWrite(addr: usize, val: u32) void {
    const ptr: *volatile u32 = @ptrFromInt(addr);
    ptr.* = val;
}

pub fn main() void {
    var reg: u32 = 0;
    mmioWrite(@intFromPtr(&reg), 0xDEAD);
    std.debug.print("{x}\\n", .{reg});
}`,
      hints: [
        '*volatile prevents the write from being optimized away.',
        '@ptrFromInt converts an integer to a pointer.',
        'Output: dead.',
      ],
      concepts: ['volatile pointer', 'MMIO', '@ptrFromInt'],
    },
    {
      id: 'zig-asm-18',
      title: 'Interrupt disable/enable',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Disable and enable interrupts with CLI/STI (kernel code only).',
      skeleton: `pub fn disableInterrupts() void {
    asm volatile (_____);
}

pub fn enableInterrupts() void {
    asm volatile ("sti");
}

pub fn main() void {
    // Not callable from user space - just verify compilation
    _ = disableInterrupts;
    _ = enableInterrupts;
}`,
      solution: `pub fn disableInterrupts() void {
    asm volatile ("cli");
}

pub fn enableInterrupts() void {
    asm volatile ("sti");
}

pub fn main() void {
    _ = disableInterrupts;
    _ = enableInterrupts;
}`,
      hints: [
        'CLI clears the interrupt flag (disables maskable interrupts).',
        'STI sets the interrupt flag (enables interrupts).',
        'Both are privileged; user-space use causes a fault.',
      ],
      concepts: ['CLI', 'STI', 'interrupt control'],
    },
    {
      id: 'zig-asm-19',
      title: 'Prefetch hint',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use PREFETCHT0 to hint the CPU to prefetch a cache line.',
      skeleton: `const std = @import("std");

fn prefetch(ptr: *const anyopaque) void {
    asm volatile ("prefetcht0 (%[p])"
        :
        : [p] "r" (ptr)
        :
    );
}

pub fn main() void {
    var data: [64]u8 = [_]u8{0} ** 64;
    prefetch(&data[0]);
    std.debug.print("prefetched\\n", .{});
}`,
      solution: `const std = @import("std");

fn prefetch(ptr: *const anyopaque) void {
    asm volatile ("prefetcht0 (%[p])"
        :
        : [p] "r" (ptr)
        :
    );
}

pub fn main() void {
    var data: [64]u8 = [_]u8{0} ** 64;
    prefetch(&data[0]);
    std.debug.print("prefetched\\n", .{});
}`,
      hints: [
        'PREFETCHT0 hints the CPU to load data into L1 cache.',
        'It is a hint; the CPU may ignore it.',
        'Output: prefetched.',
      ],
      concepts: ['PREFETCHT0', 'cache prefetch', 'performance hint'],
    },
    {
      id: 'zig-asm-20',
      title: 'Inline asm in a comptime-evaluated function',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Understand that asm is not evaluated at comptime.',
      skeleton: `pub fn main() void {
    // asm volatile cannot be evaluated at comptime
    // it always runs at runtime
    const std = @import("std");
    std.debug.print("runtime\\n", .{});
    asm volatile ("nop");
}`,
      solution: `runtime`,
      hints: [
        'Inline asm always runs at runtime.',
        'Comptime evaluation cannot execute hardware instructions.',
        'Output: runtime.',
      ],
      concepts: ['asm runtime-only', 'comptime restriction'],
    },
  ],
};
