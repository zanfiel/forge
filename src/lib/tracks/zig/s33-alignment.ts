import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-align',
  title: '33. Alignment',
  language: 'zig',
  explanation: `Alignment determines how variables are placed in memory. A type with alignment N must be placed at an address divisible by N.

**Query alignment:**
\`\`\`zig
@alignOf(u32) // 4
@alignOf(u64) // 8
\`\`\`

**Align a variable:**
\`\`\`zig
var x: u32 align(16) = 0;
\`\`\`

**Align a struct field:**
\`\`\`zig
const S = struct {
    a: u8 align(4),
    b: u32,
};
\`\`\`

**Overaligned pointer:** A pointer can have a larger alignment than its pointee type:
\`\`\`zig
var buf: [16]u8 align(8) = undefined;
const p: *align(8) u8 = &buf[0];
\`\`\`

**@alignCast:** Cast a pointer to a higher alignment (asserts alignment at runtime in debug):
\`\`\`zig
const aligned: *align(4) u8 = @alignCast(&some_u8);
\`\`\`

**Packed structs** have alignment 1 and no padding between fields.`,
  exercises: [
    {
      id: 'zig-align-1',
      title: 'Query type alignment',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict the alignment of common types.',
      skeleton: `const std = @import("std");

pub fn main() void {
    std.debug.print("{d} {d} {d}\\n", .{
        @alignOf(u8),
        @alignOf(u32),
        @alignOf(u64),
    });
}`,
      solution: `1 4 8`,
      hints: [
        'u8 has alignment 1, u32 has alignment 4, u64 has alignment 8.',
        'Alignment equals the type size for basic types.',
        'Output: 1 4 8.',
      ],
      concepts: ['@alignOf', 'type alignment'],
    },
    {
      id: 'zig-align-2',
      title: 'Over-align a variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Declare a u8 variable with 16-byte alignment.',
      skeleton: `const std = @import("std");

pub fn main() void {
    var x: u8 _____ = 42;
    std.debug.print("{d}\\n", .{@alignOf(@TypeOf(x))});
    _ = x;
}`,
      solution: `const std = @import("std");

pub fn main() void {
    var x: u8 align(16) = 42;
    std.debug.print("{d}\\n", .{@alignOf(@TypeOf(x))});
    _ = x;
}`,
      hints: [
        'Use align(N) after the type to set alignment.',
        '@alignOf(@TypeOf(x)) queries the alignment.',
        'Output: 16.',
      ],
      concepts: ['align(N)', 'variable alignment'],
    },
    {
      id: 'zig-align-3',
      title: 'Struct field alignment',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Add alignment to a struct field.',
      skeleton: `const std = @import("std");

const S = struct {
    a: u8 _____ ,
    b: u32,
};

pub fn main() void {
    std.debug.print("{d}\\n", .{@sizeOf(S)});
}`,
      solution: `const std = @import("std");

const S = struct {
    a: u8 align(4),
    b: u32,
};

pub fn main() void {
    std.debug.print("{d}\\n", .{@sizeOf(S)});
}`,
      hints: [
        'align(4) on field a forces 4-byte alignment.',
        'The struct needs padding to align b.',
        'Size: 4 (a with padding) + 4 (b) = 8.',
      ],
      concepts: ['field alignment', 'struct padding'],
    },
    {
      id: 'zig-align-4',
      title: 'Packed struct has no padding',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict the size of a packed struct vs normal struct.',
      skeleton: `const std = @import("std");

const Normal = struct { a: u8, b: u32 };
const Packed = packed struct { a: u8, b: u32 };

pub fn main() void {
    std.debug.print("{d} {d}\\n", .{ @sizeOf(Normal), @sizeOf(Packed) });
}`,
      solution: `8 5`,
      hints: [
        'Normal: u8 + 3 padding + u32 = 8 bytes.',
        'Packed: u8 + u32 = 5 bytes (no padding).',
        'Output: 8 5.',
      ],
      concepts: ['packed struct', 'no padding'],
    },
    {
      id: 'zig-align-5',
      title: 'Aligned buffer for SIMD',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Declare a buffer with 32-byte alignment for SIMD operations.',
      skeleton: `const std = @import("std");

pub fn main() void {
    var buf: [32]u8 align(32) = [_]u8{0} ** 32;
    const addr = @intFromPtr(&buf[0]);
    std.debug.print("aligned: {}\\n", .{addr % 32 == 0});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    var buf: [32]u8 align(32) = [_]u8{0} ** 32;
    const addr = @intFromPtr(&buf[0]);
    std.debug.print("aligned: {}\\n", .{addr % 32 == 0});
}`,
      hints: [
        'align(32) on the array ensures 32-byte alignment.',
        '@intFromPtr converts a pointer to an integer.',
        'addr % 32 == 0 should be true.',
      ],
      concepts: ['aligned buffer', 'SIMD alignment', '@intFromPtr'],
    },
    {
      id: 'zig-align-6',
      title: '@alignCast to cast pointer alignment',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use @alignCast to cast a byte pointer to an aligned u32 pointer.',
      skeleton: `const std = @import("std");

pub fn main() void {
    var buf: [4]u8 align(4) = .{ 0x01, 0x00, 0x00, 0x00 };
    const p: *u32 = _____(  &buf[0]  );
    std.debug.print("{d}\\n", .{p.*});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    var buf: [4]u8 align(4) = .{ 0x01, 0x00, 0x00, 0x00 };
    const p: *u32 = @alignCast(@ptrCast(&buf[0]));
    std.debug.print("{d}\\n", .{p.*});
}`,
      hints: [
        '@ptrCast changes the pointer type.',
        '@alignCast asserts the pointer is sufficiently aligned.',
        'Little-endian: 0x01 at index 0 = value 1.',
      ],
      concepts: ['@alignCast', '@ptrCast', 'pointer casting'],
    },
    {
      id: 'zig-align-7',
      title: 'Pointer alignment in type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Declare a pointer type with explicit alignment.',
      skeleton: `const std = @import("std");

pub fn main() void {
    var x: u32 align(8) = 99;
    const p: _____ = &x;
    std.debug.print("{d}\\n", .{p.*});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    var x: u32 align(8) = 99;
    const p: *align(8) u32 = &x;
    std.debug.print("{d}\\n", .{p.*});
}`,
      hints: [
        'A pointer with alignment: *align(N) T.',
        'x has align(8), so the pointer has at least align(8).',
        'Output: 99.',
      ],
      concepts: ['*align(N) T', 'pointer alignment type'],
    },
    {
      id: 'zig-align-8',
      title: 'Alignment of pointer types',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Predict @alignOf for pointer types.',
      skeleton: `const std = @import("std");

pub fn main() void {
    std.debug.print("{d}\\n", .{@alignOf(*u8)});
}`,
      solution: `8`,
      hints: [
        'Pointers always have pointer-size alignment (8 on 64-bit).',
        'The pointee type does not affect pointer alignment.',
        'Output: 8.',
      ],
      concepts: ['pointer alignment', '@alignOf(*T)'],
    },
    {
      id: 'zig-align-9',
      title: 'Check address is aligned',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a function that checks if an address is aligned to a given power of 2.',
      skeleton: `const std = @import("std");

fn isAligned(addr: usize, alignment: usize) bool {
    return addr & (alignment - 1) == 0;
}

pub fn main() void {
    std.debug.print("{} {}\\n", .{
        isAligned(64, 16),
        isAligned(65, 16),
    });
}`,
      solution: `const std = @import("std");

fn isAligned(addr: usize, alignment: usize) bool {
    return addr & (alignment - 1) == 0;
}

pub fn main() void {
    std.debug.print("{} {}\\n", .{
        isAligned(64, 16),
        isAligned(65, 16),
    });
}`,
      hints: [
        'addr & (align - 1) == 0 tests alignment without division.',
        '64 is divisible by 16; 65 is not.',
        'Output: "true false".',
      ],
      concepts: ['alignment check', 'bitwise alignment test'],
    },
    {
      id: 'zig-align-10',
      title: 'Packed struct bit access',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict the layout of a packed struct with bool fields.',
      skeleton: `const std = @import("std");

const Flags = packed struct {
    read: bool,
    write: bool,
    exec: bool,
};

pub fn main() void {
    std.debug.print("{d}\\n", .{@sizeOf(Flags)});
}`,
      solution: `1`,
      hints: [
        'In a packed struct, bools each take 1 bit.',
        '3 bools = 3 bits, fits in 1 byte.',
        'Output: 1.',
      ],
      concepts: ['packed struct', 'bool bits', 'compact layout'],
    },
    {
      id: 'zig-align-11',
      title: 'Align up calculation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a function that rounds an address up to the next alignment boundary.',
      skeleton: `const std = @import("std");

fn alignUp(addr: usize, alignment: usize) usize {
    return (addr + alignment - 1) & ~(alignment - 1);
}

pub fn main() void {
    std.debug.print("{d}\\n", .{alignUp(13, 8)});
}`,
      solution: `const std = @import("std");

fn alignUp(addr: usize, alignment: usize) usize {
    return (addr + alignment - 1) & ~(alignment - 1);
}

pub fn main() void {
    std.debug.print("{d}\\n", .{alignUp(13, 8)});
}`,
      hints: [
        'alignUp rounds 13 up to the next multiple of 8.',
        '13 -> 16 (next multiple of 8).',
        'Output: 16.',
      ],
      concepts: ['align up', 'bitwise rounding'],
    },
    {
      id: 'zig-align-12',
      title: 'Struct with over-aligned field',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict struct size with an over-aligned field.',
      skeleton: `const std = @import("std");

const S = struct {
    a: u8,
    b: u64 align(16),
};

pub fn main() void {
    std.debug.print("{d}\\n", .{@sizeOf(S)});
}`,
      solution: `32`,
      hints: [
        'b requires 16-byte alignment.',
        'a (1 byte) + 15 padding + b (8 bytes) + 8 padding to align struct to 16 = 32.',
        'The struct size rounds up to the largest alignment.',
      ],
      concepts: ['over-aligned field', 'struct size calculation'],
    },
    {
      id: 'zig-align-13',
      title: '@sizeOf vs @bitSizeOf',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict @sizeOf and @bitSizeOf for a packed struct.',
      skeleton: `const std = @import("std");

const P = packed struct { a: u3, b: u5 };

pub fn main() void {
    std.debug.print("{d} {d}\\n", .{ @sizeOf(P), @bitSizeOf(P) });
}`,
      solution: `1 8`,
      hints: [
        'u3 + u5 = 8 bits = 1 byte.',
        '@sizeOf returns bytes, @bitSizeOf returns bits.',
        'Output: 1 8.',
      ],
      concepts: ['@sizeOf', '@bitSizeOf', 'packed struct bits'],
    },
    {
      id: 'zig-align-14',
      title: 'Allocate aligned memory',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Allocate memory with a specific alignment using an allocator.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    const buf = try alloc.alignedAlloc(u8, 64, 128);
    defer alloc.free(buf);
    const addr = @intFromPtr(buf.ptr);
    std.debug.print("aligned: {}\\n", .{addr % 64 == 0});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    const buf = try alloc.alignedAlloc(u8, 64, 128);
    defer alloc.free(buf);
    const addr = @intFromPtr(buf.ptr);
    std.debug.print("aligned: {}\\n", .{addr % 64 == 0});
}`,
      hints: [
        'alignedAlloc(T, alignment, count) allocates with alignment.',
        'The pointer is guaranteed to be 64-byte aligned.',
        'Output: aligned: true.',
      ],
      concepts: ['alignedAlloc', 'heap alignment'],
    },
    {
      id: 'zig-align-15',
      title: 'Reduce pointer alignment',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Cast an over-aligned pointer to a less-aligned pointer safely.',
      skeleton: `const std = @import("std");

pub fn main() void {
    var x: u32 align(16) = 7;
    const p16: *align(16) u32 = &x;
    const p4: _____ = p16; // reducing alignment is always safe
    std.debug.print("{d}\\n", .{p4.*});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    var x: u32 align(16) = 7;
    const p16: *align(16) u32 = &x;
    const p4: *align(4) u32 = p16;
    std.debug.print("{d}\\n", .{p4.*});
}`,
      hints: [
        'Reducing alignment (16 -> 4) is always safe.',
        '*align(4) u32 is the natural alignment for u32.',
        'Output: 7.',
      ],
      concepts: ['alignment reduction', 'pointer coercion'],
    },
    {
      id: 'zig-align-16',
      title: 'Integer bit fields in packed struct',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use a packed struct to pack multiple integers into fewer bytes.',
      skeleton: `const std = @import("std");

const Header = packed struct {
    version: u4,
    flags: u4,
};

pub fn main() void {
    const h = Header{ .version = 1, .flags = 0b1010 };
    std.debug.print("{d} {d} size={d}\\n", .{ h.version, h.flags, @sizeOf(Header) });
}`,
      solution: `const std = @import("std");

const Header = packed struct {
    version: u4,
    flags: u4,
};

pub fn main() void {
    const h = Header{ .version = 1, .flags = 0b1010 };
    std.debug.print("{d} {d} size={d}\\n", .{ h.version, h.flags, @sizeOf(Header) });
}`,
      hints: [
        'u4 + u4 = 8 bits = 1 byte.',
        '@sizeOf(Header) is 1.',
        'Output: 1 10 size=1.',
      ],
      concepts: ['packed struct', 'bit fields', 'u4'],
    },
    {
      id: 'zig-align-17',
      title: 'Force alignment mismatch detection',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Fix code that tries to cast a less-aligned pointer to a more-aligned pointer.',
      skeleton: `const std = @import("std");

pub fn main() void {
    var buf: [4]u8 = .{ 1, 0, 0, 0 };
    // bug: &buf[0] has align(1), cannot cast to *u32 without alignCast
    const p: *u32 = @ptrCast(&buf[0]);
    std.debug.print("{d}\\n", .{p.*});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    var buf: [4]u8 align(4) = .{ 1, 0, 0, 0 };
    const p: *u32 = @alignCast(@ptrCast(&buf[0]));
    std.debug.print("{d}\\n", .{p.*});
}`,
      hints: [
        'Add align(4) to buf to guarantee alignment.',
        'Use @alignCast to assert alignment when casting.',
        'Output: 1 (little-endian).',
      ],
      concepts: ['@alignCast', 'alignment safety'],
    },
    {
      id: 'zig-align-18',
      title: 'Struct alignment equals max field alignment',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict struct alignment based on its fields.',
      skeleton: `const std = @import("std");

const S = struct { a: u8, b: u64 };

pub fn main() void {
    std.debug.print("{d}\\n", .{@alignOf(S)});
}`,
      solution: `8`,
      hints: [
        'Struct alignment is the max of its field alignments.',
        'u64 has alignment 8, u8 has alignment 1.',
        'Output: 8.',
      ],
      concepts: ['struct alignment', 'max field alignment'],
    },
    {
      id: 'zig-align-19',
      title: 'Bit-cast packed struct',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Bit-cast a u8 to a packed struct to interpret its bits.',
      skeleton: `const std = @import("std");

const Byte = packed struct {
    low: u4,
    high: u4,
};

pub fn main() void {
    const raw: u8 = 0xAB;
    const b: Byte = @bitCast(raw);
    std.debug.print("{x} {x}\\n", .{ b.low, b.high });
}`,
      solution: `const std = @import("std");

const Byte = packed struct {
    low: u4,
    high: u4,
};

pub fn main() void {
    const raw: u8 = 0xAB;
    const b: Byte = @bitCast(raw);
    std.debug.print("{x} {x}\\n", .{ b.low, b.high });
}`,
      hints: [
        '@bitCast reinterprets bits without conversion.',
        '0xAB: low nibble = B (11), high nibble = A (10).',
        'Output: b a.',
      ],
      concepts: ['@bitCast', 'nibble access', 'bit manipulation'],
    },
    {
      id: 'zig-align-20',
      title: 'Use @sizeOf for buffer sizing',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Allocate a buffer sized exactly for N structs using @sizeOf.',
      skeleton: `const std = @import("std");

const Item = struct { x: i32, y: i32 };

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    const count = 4;
    const buf = try alloc.alloc(Item, count);
    defer alloc.free(buf);
    std.debug.print("{d}\\n", .{buf.len * @sizeOf(Item)});
}`,
      solution: `const std = @import("std");

const Item = struct { x: i32, y: i32 };

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    const count = 4;
    const buf = try alloc.alloc(Item, count);
    defer alloc.free(buf);
    std.debug.print("{d}\\n", .{buf.len * @sizeOf(Item)});
}`,
      hints: [
        '@sizeOf(Item) is 8 (two i32 fields).',
        '4 * 8 = 32 bytes total.',
        'Output: 32.',
      ],
      concepts: ['@sizeOf', 'buffer sizing', 'struct array'],
    },
  ],
};
