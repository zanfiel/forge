import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-c',
  title: '35. C Interop',
  language: 'zig',
  explanation: `Zig has first-class C interoperability. Use \`@cImport\` to include C headers.

**Import a C header:**
\`\`\`zig
const c = @cImport({
    @cInclude("stdio.h");
    @cInclude("string.h");
});
\`\`\`

**Call C functions:**
\`\`\`zig
_ = c.printf("hello %d\\n", @as(c_int, 42));
const n = c.strlen("test");
\`\`\`

**C allocator** wraps malloc/free:
\`\`\`zig
const allocator = std.heap.c_allocator;
const buf = try allocator.alloc(u8, 16);
defer allocator.free(buf);
\`\`\`

**Translate C patterns:**
- C \`char*\` → Zig \`[*:0]u8\` or \`?[*:0]u8\`
- C \`void*\` → Zig \`*anyopaque\` or \`?*anyopaque\`
- C \`NULL\` → Zig \`null\`
- C struct → Zig \`extern struct\`
- C array \`int arr[4]\` → Zig \`[4]c_int\`

**zig translate-c** can auto-translate C headers to Zig declarations.`,
  exercises: [
    {
      id: 'zig-c-1',
      title: '@cImport and @cInclude',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Import a C header using @cImport.',
      skeleton: `const c = @cImport({
    @_____("stdio.h");
});

pub fn main() void {
    _ = c.printf("hello from C\\n");
}`,
      solution: `const c = @cImport({
    @cInclude("stdio.h");
});

pub fn main() void {
    _ = c.printf("hello from C\\n");
}`,
      hints: [
        '@cInclude includes a C header file.',
        '@cImport wraps the include directives.',
        'c.printf is then callable.',
      ],
      concepts: ['@cImport', '@cInclude', 'C header'],
    },
    {
      id: 'zig-c-2',
      title: 'C string type mapping',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Map a C char* to Zig null-terminated pointer type.',
      skeleton: `const std = @import("std");

// C: char* → Zig: [*:0]u8
// C: const char* → Zig: [*:0]const u8

fn printC(s: _____) void {
    std.debug.print("{s}\\n", .{std.mem.span(s)});
}

pub fn main() void {
    printC("hello");
}`,
      solution: `const std = @import("std");

fn printC(s: [*:0]const u8) void {
    std.debug.print("{s}\\n", .{std.mem.span(s)});
}

pub fn main() void {
    printC("hello");
}`,
      hints: [
        'C const char* maps to [*:0]const u8.',
        'String literals coerce to this type.',
        'Output: hello.',
      ],
      concepts: ['C string mapping', '[*:0]const u8'],
    },
    {
      id: 'zig-c-3',
      title: 'C void* as anyopaque',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Use ?*anyopaque to represent a C void* that may be NULL.',
      skeleton: `const std = @import("std");

fn maybeNull(flag: bool) ?*anyopaque {
    if (!flag) return _____;
    return @as(?*anyopaque, @ptrFromInt(1));
}

pub fn main() void {
    const p = maybeNull(false);
    std.debug.print("{?}\\n", .{p});
}`,
      solution: `const std = @import("std");

fn maybeNull(flag: bool) ?*anyopaque {
    if (!flag) return null;
    return @as(?*anyopaque, @ptrFromInt(1));
}

pub fn main() void {
    const p = maybeNull(false);
    std.debug.print("{?}\\n", .{p});
}`,
      hints: [
        'null in Zig represents C NULL.',
        '?*anyopaque can be null.',
        'Output: null.',
      ],
      concepts: ['anyopaque', 'null', 'C void*'],
    },
    {
      id: 'zig-c-4',
      title: 'Use std.heap.c_allocator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Use the C allocator to allocate memory via malloc.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const alloc = std.heap.c_allocator;
    const buf = try alloc.alloc(u8, 8);
    defer alloc.free(buf);
    std.debug.print("{d}\\n", .{buf.len});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const alloc = std.heap.c_allocator;
    const buf = try alloc.alloc(u8, 8);
    defer alloc.free(buf);
    std.debug.print("{d}\\n", .{buf.len});
}`,
      hints: [
        'std.heap.c_allocator wraps malloc/free.',
        'Use it when interoperating with C code.',
        'Output: 8.',
      ],
      concepts: ['c_allocator', 'malloc/free wrapper'],
    },
    {
      id: 'zig-c-5',
      title: 'C array type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Declare a C-compatible fixed-size array field.',
      skeleton: `const std = @import("std");

const CHeader = extern struct {
    magic: [4]u8,
    version: c_int,
};

pub fn main() void {
    const h = CHeader{ .magic = .{ 'Z', 'I', 'G', 0 }, .version = _____ };
    std.debug.print("{c}{c}{c} v{d}\\n", .{ h.magic[0], h.magic[1], h.magic[2], h.version });
}`,
      solution: `const std = @import("std");

const CHeader = extern struct {
    magic: [4]u8,
    version: c_int,
};

pub fn main() void {
    const h = CHeader{ .magic = .{ 'Z', 'I', 'G', 0 }, .version = 1 };
    std.debug.print("{c}{c}{c} v{d}\\n", .{ h.magic[0], h.magic[1], h.magic[2], h.version });
}`,
      hints: [
        'C int[4] → Zig [4]u8 in an extern struct.',
        'Use any integer for version.',
        'Output: ZIG v1.',
      ],
      concepts: ['C array type', 'extern struct field'],
    },
    {
      id: 'zig-c-6',
      title: 'strlen via C interop',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Call C strlen through @cImport.',
      skeleton: `const c = @cImport({
    @cInclude("string.h");
});

pub fn main() void {
    const std = @import("std");
    const n = c.strlen("hello");
    std.debug.print("{d}\\n", .{n});
}`,
      solution: `const c = @cImport({
    @cInclude("string.h");
});

pub fn main() void {
    const std = @import("std");
    const n = c.strlen("hello");
    std.debug.print("{d}\\n", .{n});
}`,
      hints: [
        'c.strlen takes [*:0]const u8 and returns c_size_t.',
        '"hello" has 5 characters.',
        'Output: 5.',
      ],
      concepts: ['@cImport', 'strlen', 'C string length'],
    },
    {
      id: 'zig-c-7',
      title: 'C enum to Zig',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Map a C enum value to Zig c_int for comparison.',
      skeleton: `const std = @import("std");

// C enum: typedef enum { RED=0, GREEN=1, BLUE=2 } Color;
const RED: c_int = 0;
const GREEN: c_int = 1;
const BLUE: c_int = 2;

fn colorName(c: c_int) []const u8 {
    return switch (c) {
        RED   => "red",
        GREEN => "green",
        BLUE  => "blue",
        else  => "unknown",
    };
}

pub fn main() void {
    std.debug.print("{s}\\n", .{colorName(_____)}); // prints green
}`,
      solution: `const std = @import("std");

const RED: c_int = 0;
const GREEN: c_int = 1;
const BLUE: c_int = 2;

fn colorName(c: c_int) []const u8 {
    return switch (c) {
        RED   => "red",
        GREEN => "green",
        BLUE  => "blue",
        else  => "unknown",
    };
}

pub fn main() void {
    std.debug.print("{s}\\n", .{colorName(GREEN)});
}`,
      hints: [
        'C enums are c_int values in Zig.',
        'Pass GREEN (value 1) to get "green".',
        'Output: green.',
      ],
      concepts: ['C enum', 'c_int switch'],
    },
    {
      id: 'zig-c-8',
      title: 'Pass Zig slice to C function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Pass a Zig slice\'s pointer to a C function expecting a size and pointer.',
      skeleton: `const std = @import("std");

extern fn sum_array(arr: [*]const c_int, len: c_int) c_int;

// Stub for demonstration (normally from a .c file)
export fn sum_array(arr: [*]const c_int, len: c_int) c_int {
    var total: c_int = 0;
    var i: usize = 0;
    while (i < @as(usize, @intCast(len))) : (i += 1) {
        total += arr[i];
    }
    return total;
}

pub fn main() void {
    const nums = [_]c_int{ 1, 2, 3, 4, 5 };
    const result = sum_array(&nums[0], @as(c_int, @intCast(nums.len)));
    std.debug.print("{d}\\n", .{result});
}`,
      solution: `const std = @import("std");

export fn sum_array(arr: [*]const c_int, len: c_int) c_int {
    var total: c_int = 0;
    var i: usize = 0;
    while (i < @as(usize, @intCast(len))) : (i += 1) {
        total += arr[i];
    }
    return total;
}

pub fn main() void {
    const nums = [_]c_int{ 1, 2, 3, 4, 5 };
    const result = sum_array(&nums[0], @as(c_int, @intCast(nums.len)));
    std.debug.print("{d}\\n", .{result});
}`,
      hints: [
        '&nums[0] gives a pointer to the first element.',
        '@intCast converts usize to c_int.',
        'Output: 15.',
      ],
      concepts: ['slice to C array', '@intCast', 'C function call'],
    },
    {
      id: 'zig-c-9',
      title: 'C struct callback',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Pass a Zig function as a C callback (function pointer).',
      skeleton: `const std = @import("std");

const Callback = *const fn (data: *anyopaque, value: c_int) callconv(.C) void;

fn myCallback(data: *anyopaque, value: c_int) callconv(.C) void {
    _ = data;
    std.debug.print("callback: {d}\\n", .{value});
}

fn callWith(cb: Callback, value: c_int) void {
    cb(undefined, value);
}

pub fn main() void {
    callWith(myCallback, 42);
}`,
      solution: `const std = @import("std");

const Callback = *const fn (data: *anyopaque, value: c_int) callconv(.C) void;

fn myCallback(data: *anyopaque, value: c_int) callconv(.C) void {
    _ = data;
    std.debug.print("callback: {d}\\n", .{value});
}

fn callWith(cb: Callback, value: c_int) void {
    cb(undefined, value);
}

pub fn main() void {
    callWith(myCallback, 42);
}`,
      hints: [
        'callconv(.C) is required for functions passed to C.',
        'Function pointer type uses *const fn(...).',
        'Output: callback: 42.',
      ],
      concepts: ['C callback', 'callconv(.C)', 'function pointer'],
    },
    {
      id: 'zig-c-10',
      title: 'C NULL handling',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Predict the output when handling a C NULL return.',
      skeleton: `const std = @import("std");

fn maybeNull() ?*anyopaque {
    return null; // simulates C function returning NULL
}

pub fn main() void {
    if (maybeNull()) |p| {
        std.debug.print("got: {}\\n", .{@intFromPtr(p)});
    } else {
        std.debug.print("null\\n", .{});
    }
}`,
      solution: `null`,
      hints: [
        'maybeNull returns null, so the else branch runs.',
        'Output: null.',
        'This is the standard null-check pattern for C functions.',
      ],
      concepts: ['C NULL', 'optional pointer', 'null check'],
    },
    {
      id: 'zig-c-11',
      title: 'memset equivalent',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use @memset as the Zig equivalent of C memset.',
      skeleton: `const std = @import("std");

pub fn main() void {
    var buf: [8]u8 = undefined;
    @memset(&buf, 0xFF);
    std.debug.print("{x}\\n", .{buf[0]});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    var buf: [8]u8 = undefined;
    @memset(&buf, 0xFF);
    std.debug.print("{x}\\n", .{buf[0]});
}`,
      hints: [
        '@memset fills a slice with a value.',
        'All bytes are set to 0xFF.',
        'Output: ff.',
      ],
      concepts: ['@memset', 'C memset equivalent'],
    },
    {
      id: 'zig-c-12',
      title: 'memcpy equivalent',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use @memcpy as the Zig equivalent of C memcpy.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const src = [_]u8{ 1, 2, 3, 4 };
    var dst: [4]u8 = undefined;
    @memcpy(&dst, &src);
    std.debug.print("{d}\\n", .{dst[2]});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const src = [_]u8{ 1, 2, 3, 4 };
    var dst: [4]u8 = undefined;
    @memcpy(&dst, &src);
    std.debug.print("{d}\\n", .{dst[2]});
}`,
      hints: [
        '@memcpy copies bytes from src to dst.',
        'dst[2] is 3 after the copy.',
        'Output: 3.',
      ],
      concepts: ['@memcpy', 'C memcpy equivalent'],
    },
    {
      id: 'zig-c-13',
      title: 'Translate C pointer arithmetic',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Translate C pointer arithmetic to Zig many-item pointer.',
      skeleton: `const std = @import("std");

// C: int* p = arr; int third = *(p + 2);
pub fn main() void {
    const arr = [_]i32{ 10, 20, 30, 40 };
    const p: [*]const i32 = &arr[0];
    const third = (p + 2).*;
    std.debug.print("{d}\\n", .{third});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const arr = [_]i32{ 10, 20, 30, 40 };
    const p: [*]const i32 = &arr[0];
    const third = (p + 2).*;
    std.debug.print("{d}\\n", .{third});
}`,
      hints: [
        '[*]const i32 is Zig\'s C-style pointer with arithmetic.',
        'p + 2 advances by 2 elements.',
        'Output: 30.',
      ],
      concepts: ['pointer arithmetic', '[*]T', 'C translation'],
    },
    {
      id: 'zig-c-14',
      title: 'Zig string to C string',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Convert a Zig string literal to pass to a C function.',
      skeleton: `const std = @import("std");

fn printCStr(s: [*:0]const u8) void {
    std.debug.print("{s}\\n", .{std.mem.span(s)});
}

pub fn main() void {
    const zig_str: []const u8 = "hello";
    _ = zig_str;
    // string literals coerce directly
    printCStr("hello");
}`,
      solution: `const std = @import("std");

fn printCStr(s: [*:0]const u8) void {
    std.debug.print("{s}\\n", .{std.mem.span(s)});
}

pub fn main() void {
    printCStr("hello");
}`,
      hints: [
        'String literals are [*:0]const u8 by default.',
        'They coerce to the C string type automatically.',
        'Output: hello.',
      ],
      concepts: ['string literal coercion', 'C string passing'],
    },
    {
      id: 'zig-c-15',
      title: 'C bitfield struct',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Map a C bitfield struct to a Zig packed struct.',
      skeleton: `const std = @import("std");

// C: struct { unsigned int x:4; unsigned int y:4; };
const CBits = packed struct {
    x: u4,
    y: u4,
};

pub fn main() void {
    const b = CBits{ .x = 3, .y = 5 };
    std.debug.print("{d} {d} size={d}\\n", .{ b.x, b.y, @sizeOf(CBits) });
}`,
      solution: `const std = @import("std");

const CBits = packed struct {
    x: u4,
    y: u4,
};

pub fn main() void {
    const b = CBits{ .x = 3, .y = 5 };
    std.debug.print("{d} {d} size={d}\\n", .{ b.x, b.y, @sizeOf(CBits) });
}`,
      hints: [
        'packed struct maps to C bitfield struct.',
        'u4 fields each take 4 bits.',
        'Output: 3 5 size=1.',
      ],
      concepts: ['C bitfield', 'packed struct', 'u4'],
    },
    {
      id: 'zig-c-16',
      title: 'cDefine for C macros',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Define a C macro value in @cImport.',
      skeleton: `const c = @cImport({
    @_____("NDEBUG", "");
    @cInclude("assert.h");
});

pub fn main() void {
    _ = c;
}`,
      solution: `const c = @cImport({
    @cDefine("NDEBUG", "");
    @cInclude("assert.h");
});

pub fn main() void {
    _ = c;
}`,
      hints: [
        '@cDefine defines a C preprocessor macro.',
        'NDEBUG disables assert() in C.',
        'Useful for controlling C header behavior.',
      ],
      concepts: ['@cDefine', 'C macro', '@cImport'],
    },
    {
      id: 'zig-c-17',
      title: 'cUndef to undefine a macro',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Undefine a C macro using @cUndef.',
      skeleton: `const c = @cImport({
    @cDefine("MY_MACRO", "1");
    @_____("MY_MACRO");
    @cInclude("stdio.h");
});

pub fn main() void {
    _ = c;
}`,
      solution: `const c = @cImport({
    @cDefine("MY_MACRO", "1");
    @cUndef("MY_MACRO");
    @cInclude("stdio.h");
});

pub fn main() void {
    _ = c;
}`,
      hints: [
        '@cUndef undefines a previously defined macro.',
        'Useful for resetting header guard macros.',
        'Just verify the syntax here.',
      ],
      concepts: ['@cUndef', 'C preprocessor'],
    },
    {
      id: 'zig-c-18',
      title: 'Translate C errno error',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Handle a C function error by checking its return and errno.',
      skeleton: `const std = @import("std");
const c = @cImport({
    @cInclude("errno.h");
    @cInclude("string.h");
});

pub fn main() void {
    // Attempt to open a non-existent file
    const f = c.fopen("no_such_file.txt", "r");
    if (f == null) {
        const err = c.strerror(c.errno);
        const s = std.mem.span(err);
        std.debug.print("error: {s}\\n", .{s});
    }
}`,
      solution: `const std = @import("std");
const c = @cImport({
    @cInclude("errno.h");
    @cInclude("string.h");
    @cInclude("stdio.h");
});

pub fn main() void {
    const f = c.fopen("no_such_file.txt", "r");
    if (f == null) {
        const err = c.strerror(c.errno);
        const s = std.mem.span(err);
        std.debug.print("error: {s}\\n", .{s});
    }
}`,
      hints: [
        'fopen returns null on error.',
        'errno stores the error code.',
        'strerror converts it to a string.',
      ],
      concepts: ['errno', 'strerror', 'C error handling'],
    },
    {
      id: 'zig-c-19',
      title: 'Zig struct compatible with C',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Verify extern struct byte layout matches C.',
      skeleton: `const std = @import("std");

const CColor = extern struct {
    r: u8,
    g: u8,
    b: u8,
    a: u8,
};

pub fn main() void {
    const col = CColor{ .r = 255, .g = 0, .b = 128, .a = 255 };
    std.debug.print("{d} {d}\\n", .{ @sizeOf(CColor), col.b });
}`,
      solution: `4 128`,
      hints: [
        'extern struct with four u8 fields = 4 bytes.',
        'col.b is 128.',
        'Output: 4 128.',
      ],
      concepts: ['extern struct', 'C struct compatibility'],
    },
    {
      id: 'zig-c-20',
      title: 'Full C interop: allocate and use C string',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Allocate a C string, copy into it, and free it.',
      skeleton: `const std = @import("std");

extern "c" fn malloc(size: usize) ?*anyopaque;
extern "c" fn free(ptr: ?*anyopaque) void;

pub fn main() void {
    const src = "hello";
    const p = malloc(src.len + 1) orelse return;
    defer free(p);
    const buf: [*]u8 = @ptrCast(p);
    @memcpy(buf[0..src.len], src);
    buf[src.len] = 0;
    const s: [*:0]const u8 = @ptrCast(buf);
    std.debug.print("{s}\\n", .{std.mem.span(s)});
}`,
      solution: `const std = @import("std");

extern "c" fn malloc(size: usize) ?*anyopaque;
extern "c" fn free(ptr: ?*anyopaque) void;

pub fn main() void {
    const src = "hello";
    const p = malloc(src.len + 1) orelse return;
    defer free(p);
    const buf: [*]u8 = @ptrCast(p);
    @memcpy(buf[0..src.len], src);
    buf[src.len] = 0;
    const s: [*:0]const u8 = @ptrCast(buf);
    std.debug.print("{s}\\n", .{std.mem.span(s)});
}`,
      hints: [
        'malloc allocates src.len+1 bytes for null terminator.',
        '@ptrCast changes the pointer type.',
        'Output: hello.',
      ],
      concepts: ['malloc', 'free', 'C string allocation', 'full interop'],
    },
  ],
};
