import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-embed',
  title: '48. Embedded',
  description: 'Embedded systems programming in Zig: @embedFile, freestanding targets, MMIO, volatile registers, and bare-metal patterns.',
  exercises: [
    {
      id: 'zig-embed-1',
      title: 'Embed a File at Compile Time',
      type: 'fill-blank',
      difficulty: 'beginner',
      instructions: 'Use `@embedFile` to embed a binary blob at compile time. Fill in the blank to embed "firmware.bin".',
      skeleton: `const std = @import("std");

const firmware_data = @embedFile(___);

pub fn main() void {
    std.debug.print("Firmware size: {} bytes\\n", .{firmware_data.len});
}`,
      solution: `const std = @import("std");

const firmware_data = @embedFile("firmware.bin");

pub fn main() void {
    std.debug.print("Firmware size: {} bytes\\n", .{firmware_data.len});
}`,
      hints: [
        '@embedFile takes a string literal path relative to the source file',
        'The result is a *const [N:0]u8 where N is the file size',
        'The file must exist at compile time'
      ]
    },
    {
      id: 'zig-embed-2',
      title: 'Embed and Access Bytes',
      type: 'write-function',
      difficulty: 'beginner',
      instructions: 'Write a function `checkMagic` that embeds "data.bin" and returns true if the first 4 bytes equal the magic sequence `[0xDE, 0xAD, 0xBE, 0xEF]`.',
      skeleton: `const std = @import("std");

pub fn checkMagic() bool {
    // embed data.bin and check first 4 bytes
}`,
      solution: `const std = @import("std");

pub fn checkMagic() bool {
    const data = @embedFile("data.bin");
    if (data.len < 4) return false;
    return data[0] == 0xDE and data[1] == 0xAD and
           data[2] == 0xBE and data[3] == 0xEF;
}`,
      hints: [
        'Use @embedFile to get a compile-time byte slice',
        'Index into the result like any slice',
        'Guard against files shorter than 4 bytes'
      ]
    },
    {
      id: 'zig-embed-3',
      title: 'Freestanding Target Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      instructions: 'For a freestanding (bare-metal) binary, the root source must export a `_start` or panic handler. Fill in the blank to declare a minimal panic handler for a freestanding target.',
      skeleton: `// build.zig sets: .target = .{ .cpu_arch = .thumb, .os_tag = .freestanding }
// This file must provide a panic handler

pub fn ___(msg: []const u8, error_return_trace: ?*@import("std").builtin.StackTrace, ret_addr: ?usize) noreturn {
    _ = msg;
    _ = error_return_trace;
    _ = ret_addr;
    while (true) {}
}`,
      solution: `// build.zig sets: .target = .{ .cpu_arch = .thumb, .os_tag = .freestanding }
// This file must provide a panic handler

pub fn panic(msg: []const u8, error_return_trace: ?*@import("std").builtin.StackTrace, ret_addr: ?usize) noreturn {
    _ = msg;
    _ = error_return_trace;
    _ = ret_addr;
    while (true) {}
}`,
      hints: [
        'The panic handler is named `panic` and must be `noreturn`',
        'On freestanding targets, loop forever or trigger a reset',
        'The signature must match std.builtin.panic exactly'
      ]
    },
    {
      id: 'zig-embed-4',
      title: 'Volatile Memory-Mapped Register Read',
      type: 'fill-blank',
      difficulty: 'intermediate',
      instructions: 'Read from a memory-mapped I/O register at address `0x40020010` (GPIO data register). Fill in the blanks to create a volatile pointer and read it.',
      skeleton: `const GPIO_IDR: u32 = 0x40020010;

pub fn readGPIO() u32 {
    const reg = ___(___)(___)(GPIO_IDR);
    return reg.*;
}`,
      solution: `const GPIO_IDR: u32 = 0x40020010;

pub fn readGPIO() u32 {
    const reg = @as(*volatile u32, @ptrFromInt(GPIO_IDR));
    return reg.*;
}`,
      hints: [
        'Use @ptrFromInt to convert an integer address to a pointer',
        'The pointer type must be *volatile u32 to prevent optimization',
        'Use @as to specify the target type'
      ]
    },
    {
      id: 'zig-embed-5',
      title: 'Volatile Register Write',
      type: 'write-function',
      difficulty: 'intermediate',
      instructions: 'Write a function `setGPIO` that writes a `u32` value to memory-mapped GPIO output register at address `0x40020014`.',
      skeleton: `const GPIO_ODR: u32 = 0x40020014;

pub fn setGPIO(value: u32) void {
    // write value to the MMIO register
}`,
      solution: `const GPIO_ODR: u32 = 0x40020014;

pub fn setGPIO(value: u32) void {
    const reg = @as(*volatile u32, @ptrFromInt(GPIO_ODR));
    reg.* = value;
}`,
      hints: [
        'Create a *volatile u32 pointer using @ptrFromInt and @as',
        'Assign through the pointer with reg.* = value',
        'volatile prevents the compiler from eliding the write'
      ]
    },
    {
      id: 'zig-embed-6',
      title: 'Packed Struct for Register Layout',
      type: 'fix-bug',
      difficulty: 'intermediate',
      instructions: 'This packed struct models a 32-bit control register. Fix the bug so the total bit size is exactly 32.',
      skeleton: `const ControlReg = packed struct {
    enable: u1,
    mode: u3,
    prescaler: u4,
    reserved: u16,  // BUG: wrong size
    overflow: u1,
    irq_enable: u1,
};`,
      solution: `const ControlReg = packed struct {
    enable: u1,
    mode: u3,
    prescaler: u4,
    reserved: u22,
    overflow: u1,
    irq_enable: u1,
};`,
      hints: [
        'All bit widths must sum to exactly 32',
        'Count: 1 + 3 + 4 + reserved + 1 + 1 = 32',
        'reserved should be 32 - 10 = 22 bits'
      ]
    },
    {
      id: 'zig-embed-7',
      title: 'MMIO Register Using Packed Struct',
      type: 'write-function',
      difficulty: 'intermediate',
      instructions: 'Write `enableTimer` that casts the address `0x40000000` to a packed struct pointer and sets the `enable` field to 1.',
      skeleton: `const TimerCtrl = packed struct {
    enable: u1,
    mode: u2,
    reserved: u29,
};

const TIMER_BASE: u32 = 0x40000000;

pub fn enableTimer() void {
    // cast TIMER_BASE to *volatile TimerCtrl and set enable = 1
}`,
      solution: `const TimerCtrl = packed struct {
    enable: u1,
    mode: u2,
    reserved: u29,
};

const TIMER_BASE: u32 = 0x40000000;

pub fn enableTimer() void {
    const ctrl = @as(*volatile TimerCtrl, @ptrFromInt(TIMER_BASE));
    ctrl.enable = 1;
}`,
      hints: [
        'Use @ptrFromInt and @as to get a *volatile TimerCtrl',
        'Access fields normally through the pointer',
        'packed struct preserves exact bit layout'
      ]
    },
    {
      id: 'zig-embed-8',
      title: 'No Stdlib Entry Point',
      type: 'fill-blank',
      difficulty: 'intermediate',
      instructions: 'For a freestanding binary, you need to provide the entry point. Fill in the correct export name for the ARM reset handler.',
      skeleton: `const std = @import("std");

export fn ___(void) noreturn {
    // hardware init
    main();
    unreachable;
}

fn main() void {
    // application code
}`,
      solution: `const std = @import("std");

export fn Reset_Handler() noreturn {
    // hardware init
    main();
    unreachable;
}

fn main() void {
    // application code
}`,
      hints: [
        'ARM Cortex-M uses Reset_Handler as the reset vector name',
        'It must be exported so the linker can find it',
        'After main returns, use unreachable or loop forever'
      ]
    },
    {
      id: 'zig-embed-9',
      title: 'Linker Section Placement',
      type: 'fill-blank',
      difficulty: 'intermediate',
      instructions: 'Use a linker section attribute to place a variable in the `.ccmram` section (close-coupled memory). Fill in the blank.',
      skeleton: `// Place this array in .ccmram section for fast access
var fast_buffer: [1024]u32 ___ ".ccmram" = undefined;`,
      solution: `// Place this array in .ccmram section for fast access
var fast_buffer: [1024]u32 linksection(".ccmram") = undefined;`,
      hints: [
        'Use linksection("section_name") after the type',
        'This is similar to GCC __attribute__((section(".ccmram")))',
        'The section name must exist in your linker script'
      ]
    },
    {
      id: 'zig-embed-10',
      title: 'Bit-Band MMIO Access',
      type: 'write-function',
      difficulty: 'intermediate',
      instructions: 'Write `setBit` that uses ARM bit-banding to atomically set bit `n` of a word at `base_addr`. The bit-band alias is at `0x22000000 + (offset * 32) + (bit * 4)`.',
      skeleton: `const BITBAND_ALIAS: u32 = 0x22000000;
const BITBAND_BASE: u32 = 0x20000000;

pub fn setBit(base_addr: u32, bit: u32) void {
    // calculate bit-band alias address and write 1
}`,
      solution: `const BITBAND_ALIAS: u32 = 0x22000000;
const BITBAND_BASE: u32 = 0x20000000;

pub fn setBit(base_addr: u32, bit: u32) void {
    const offset = base_addr - BITBAND_BASE;
    const alias_addr = BITBAND_ALIAS + (offset * 32) + (bit * 4);
    const reg = @as(*volatile u32, @ptrFromInt(alias_addr));
    reg.* = 1;
}`,
      hints: [
        'Calculate offset from BITBAND_BASE, then scale by 32',
        'Add bit * 4 for the specific bit alias address',
        'Write 1 through a volatile u32 pointer'
      ]
    },
    {
      id: 'zig-embed-11',
      title: 'Vector Table',
      type: 'predict-output',
      difficulty: 'intermediate',
      instructions: 'What is the linker section and type of this ARM Cortex-M vector table declaration?',
      skeleton: `export const vector_table linksection(".vectors") = [_]?*const fn () callconv(.C) void{
    null,         // 0: initial stack pointer (handled by linker)
    Reset_Handler, // 1: reset
    null,         // 2: NMI
    HardFault,    // 3: hard fault
};`,
      solution: `// Section: .vectors
// Type: [4]?*const fn() callconv(.C) void
// null entries use optional function pointer (null = no handler)
// The linker script places .vectors at the start of flash (0x08000000)
// The CPU reads vector table at reset to find stack pointer and reset address`,
      hints: [
        'The type is an array of optional function pointers',
        'linksection places it in .vectors section',
        'ARM CPUs read this table at address 0 or SCB->VTOR on reset'
      ]
    },
    {
      id: 'zig-embed-12',
      title: 'Embedded Constants from File',
      type: 'write-function',
      difficulty: 'intermediate',
      instructions: 'Write `getVersion` that embeds "version.txt", trims trailing whitespace/newlines, and returns the version string as `[]const u8`.',
      skeleton: `const std = @import("std");

pub fn getVersion() []const u8 {
    // embed version.txt and trim trailing whitespace
}`,
      solution: `const std = @import("std");

pub fn getVersion() []const u8 {
    const raw = @embedFile("version.txt");
    return std.mem.trimRight(u8, raw, " \\t\\r\\n");
}`,
      hints: [
        '@embedFile returns a *const [N:0]u8 which coerces to []const u8',
        'std.mem.trimRight removes trailing characters from a set',
        'The second argument is the set of characters to trim'
      ]
    },
    {
      id: 'zig-embed-13',
      title: 'Memory-Mapped Register Array',
      type: 'write-function',
      difficulty: 'advanced',
      instructions: 'Write `readChannel` that reads from a 16-channel ADC where channel N register is at base address `0x40012400 + N * 4`.',
      skeleton: `const ADC_BASE: u32 = 0x40012400;

pub fn readChannel(channel: u4) u16 {
    // read 16-bit ADC result for given channel
}`,
      solution: `const ADC_BASE: u32 = 0x40012400;

pub fn readChannel(channel: u4) u16 {
    const addr = ADC_BASE + @as(u32, channel) * 4;
    const reg = @as(*volatile u16, @ptrFromInt(addr));
    return reg.*;
}`,
      hints: [
        'Cast channel to u32 before multiplying to avoid truncation',
        'Create a *volatile u16 pointer at the calculated address',
        'Dereference with reg.* to read the value'
      ]
    },
    {
      id: 'zig-embed-14',
      title: 'Disable Stdlib',
      type: 'fill-blank',
      difficulty: 'advanced',
      instructions: 'In build.zig, to produce a freestanding binary you must configure the exe. Fill in the blank to disable the standard library link.',
      skeleton: `// build.zig
const exe = b.addExecutable(.{
    .name = "firmware",
    .root_source_file = b.path("src/main.zig"),
    .target = target,
    .optimize = optimize,
});
exe.___ = false;`,
      solution: `// build.zig
const exe = b.addExecutable(.{
    .name = "firmware",
    .root_source_file = b.path("src/main.zig"),
    .target = target,
    .optimize = optimize,
});
exe.linkLibC = false;`,
      hints: [
        'Setting linkLibC = false prevents linking against libc',
        'For fully freestanding, also set .strip = true to remove debug info',
        'You may also need exe.link_libc = false in older Zig APIs'
      ]
    },
    {
      id: 'zig-embed-15',
      title: 'Soft-Reset via SCB',
      type: 'write-function',
      difficulty: 'advanced',
      instructions: 'Write `softReset` that triggers an ARM Cortex-M software reset by writing to the System Control Block AIRCR register at `0xE000ED0C`. The magic value is `0x05FA0004`.',
      skeleton: `pub fn softReset() noreturn {
    // write reset request to SCB->AIRCR
}`,
      solution: `pub fn softReset() noreturn {
    const AIRCR: u32 = 0xE000ED0C;
    const reg = @as(*volatile u32, @ptrFromInt(AIRCR));
    reg.* = 0x05FA0004;
    unreachable;
}`,
      hints: [
        'Write 0x05FA0004 to address 0xE000ED0C',
        'The 0x05FA prefix is the VECTKEY write key',
        'Mark as noreturn and end with unreachable'
      ]
    },
    {
      id: 'zig-embed-16',
      title: 'Stack and Heap for Embedded',
      type: 'fix-bug',
      difficulty: 'advanced',
      instructions: 'Fix this embedded allocator setup. The FixedBufferAllocator needs a proper mutable slice.',
      skeleton: `const std = @import("std");

var heap_mem: [4096]u8 = undefined;

pub fn main() void {
    var fba = std.heap.FixedBufferAllocator.init(heap_mem);  // BUG
    const allocator = fba.allocator();
    _ = allocator;
}`,
      solution: `const std = @import("std");

var heap_mem: [4096]u8 = undefined;

pub fn main() void {
    var fba = std.heap.FixedBufferAllocator.init(&heap_mem);
    const allocator = fba.allocator();
    _ = allocator;
}`,
      hints: [
        'FixedBufferAllocator.init takes a []u8 (mutable slice)',
        'Pass &heap_mem to get a slice from the array',
        'Without &, you pass the array value, not a pointer to it'
      ]
    },
    {
      id: 'zig-embed-17',
      title: 'Compile-Time Assert Register Size',
      type: 'fill-blank',
      difficulty: 'advanced',
      instructions: 'Add a compile-time assertion to ensure the packed register struct is exactly 4 bytes (32 bits). Fill in the blank.',
      skeleton: `const PeriphCtrl = packed struct {
    enable: u1,
    irq: u1,
    mode: u4,
    reserved: u26,
};

___ (@sizeOf(PeriphCtrl) == 4);`,
      solution: `const PeriphCtrl = packed struct {
    enable: u1,
    irq: u1,
    mode: u4,
    reserved: u26,
};

comptime std.debug.assert(@sizeOf(PeriphCtrl) == 4);`,
      hints: [
        'Use comptime to run the assertion at compile time',
        'std.debug.assert panics if the condition is false',
        '@sizeOf returns the size in bytes'
      ]
    },
    {
      id: 'zig-embed-18',
      title: 'DMA Transfer Descriptor',
      type: 'write-function',
      difficulty: 'advanced',
      instructions: 'Write `configureDMA` that fills an extern struct DMA descriptor at address `0x40026000` with source `src`, destination `dst`, and `count` bytes.',
      skeleton: `const DMADesc = extern struct {
    src: u32,
    dst: u32,
    count: u32,
    control: u32,
};

const DMA_BASE: u32 = 0x40026000;

pub fn configureDMA(src: u32, dst: u32, count: u32) void {
    // fill DMA descriptor at DMA_BASE
}`,
      solution: `const DMADesc = extern struct {
    src: u32,
    dst: u32,
    count: u32,
    control: u32,
};

const DMA_BASE: u32 = 0x40026000;

pub fn configureDMA(src: u32, dst: u32, count: u32) void {
    const desc = @as(*volatile DMADesc, @ptrFromInt(DMA_BASE));
    desc.src = src;
    desc.dst = dst;
    desc.count = count;
    desc.control = 1; // enable
}`,
      hints: [
        'Cast DMA_BASE to a *volatile DMADesc pointer',
        'Set each field through the pointer',
        'extern struct uses C ABI layout, matching hardware'
      ]
    },
    {
      id: 'zig-embed-19',
      title: 'Delay Loop',
      type: 'write-function',
      difficulty: 'advanced',
      instructions: 'Write a `busyDelay` function for embedded use that loops `cycles` times. Use `asm volatile` with a NOP to prevent the loop from being optimized away.',
      skeleton: `pub fn busyDelay(cycles: u32) void {
    var i: u32 = 0;
    while (i < cycles) : (i += 1) {
        // insert volatile NOP to prevent optimization
    }
}`,
      solution: `pub fn busyDelay(cycles: u32) void {
    var i: u32 = 0;
    while (i < cycles) : (i += 1) {
        asm volatile("nop");
    }
}`,
      hints: [
        'asm volatile prevents the compiler from removing the instruction',
        '"nop" is a no-operation instruction on most architectures',
        'The volatile keyword on asm means it has side effects'
      ]
    },
    {
      id: 'zig-embed-20',
      title: 'Complete Bare-Metal LED Blink',
      type: 'refactor',
      difficulty: 'advanced',
      instructions: 'Refactor this bare-metal LED blink into a cleaner version using a packed struct for the GPIO port instead of raw address arithmetic.',
      skeleton: `const GPIO_BASE: u32 = 0x40020000;
const ODR_OFFSET: u32 = 0x14;
const LED_PIN: u32 = 1 << 5;

pub fn blinkLED() void {
    const odr = @as(*volatile u32, @ptrFromInt(GPIO_BASE + ODR_OFFSET));
    odr.* |= LED_PIN;   // on
    busyDelay(1000000);
    odr.* &= ~LED_PIN;  // off
    busyDelay(1000000);
}

fn busyDelay(n: u32) void {
    var i: u32 = 0;
    while (i < n) : (i += 1) asm volatile("nop");
}`,
      solution: `const GPIO = packed struct {
    moder: u32,
    otyper: u32,
    ospeedr: u32,
    pupdr: u32,
    idr: u32,
    odr: u32,
};

const GPIOA: *volatile GPIO = @ptrFromInt(0x40020000);
const LED_PIN: u32 = 1 << 5;

pub fn blinkLED() void {
    GPIOA.odr |= LED_PIN;
    busyDelay(1000000);
    GPIOA.odr &= ~LED_PIN;
    busyDelay(1000000);
}

fn busyDelay(n: u32) void {
    var i: u32 = 0;
    while (i < n) : (i += 1) asm volatile("nop");
}`,
      hints: [
        'Model the GPIO peripheral as a packed struct with all registers',
        'Create a single typed pointer to the base address',
        'Access registers as named fields instead of offset arithmetic'
      ]
    },
  ],
};
