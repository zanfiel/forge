import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-extern',
  title: '34. Extern',
  language: 'zig',
  explanation: `Zig uses \`extern\` to declare symbols from other compilation units (C libraries, assembly, etc.) and \`export\` to expose Zig symbols to external code.

**Extern struct** has C ABI layout:
\`\`\`zig
const Point = extern struct { x: f32, y: f32 };
\`\`\`

**Extern function declaration** (from a C library):
\`\`\`zig
extern fn malloc(size: usize) ?*anyopaque;
extern fn free(ptr: ?*anyopaque) void;
\`\`\`

**Export function** (callable from C):
\`\`\`zig
export fn add(a: i32, b: i32) i32 {
    return a + b;
}
\`\`\`

**Extern variable:**
\`\`\`zig
extern var errno: c_int;
\`\`\`

**Calling conventions** can be specified:
\`\`\`zig
extern "c" fn printf(fmt: [*:0]const u8, ...) c_int;
\`\`\`

**C integer types:** \`c_int\`, \`c_uint\`, \`c_long\`, \`c_char\`, \`c_size_t\`, etc. map to the platform C types.`,
  exercises: [
    {
      id: 'zig-extern-1',
      title: 'Extern struct declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Declare an extern struct with C-compatible layout.',
      skeleton: `const std = @import("std");

const Vec2 = _____ struct {
    x: f32,
    y: f32,
};

pub fn main() void {
    const v = Vec2{ .x = 1.0, .y = 2.0 };
    std.debug.print("{d} {d}\\n", .{ v.x, v.y });
}`,
      solution: `const std = @import("std");

const Vec2 = extern struct {
    x: f32,
    y: f32,
};

pub fn main() void {
    const v = Vec2{ .x = 1.0, .y = 2.0 };
    std.debug.print("{d} {d}\\n", .{ v.x, v.y });
}`,
      hints: [
        'extern struct has guaranteed C ABI layout.',
        'No padding reordering or optimization.',
        'Output: 1 2.',
      ],
      concepts: ['extern struct', 'C ABI'],
    },
    {
      id: 'zig-extern-2',
      title: 'Declare extern C function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Declare an extern C function without calling it.',
      skeleton: `// Declare the C abs() function
_____ fn abs(n: c_int) c_int;

pub fn main() void {
    // just checking the declaration compiles
    _ = abs;
}`,
      solution: `extern fn abs(n: c_int) c_int;

pub fn main() void {
    _ = abs;
}`,
      hints: [
        'extern fn declares a function defined elsewhere.',
        'c_int maps to C\'s int type.',
        'No body is provided.',
      ],
      concepts: ['extern fn', 'c_int', 'C function declaration'],
    },
    {
      id: 'zig-extern-3',
      title: 'export a function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Export a Zig function with C-compatible linkage.',
      skeleton: `_____ fn zigAdd(a: i32, b: i32) i32 {
    return a + b;
}

pub fn main() void {
    // callable from C as zigAdd()
    _ = zigAdd(1, 2);
}`,
      solution: `export fn zigAdd(a: i32, b: i32) i32 {
    return a + b;
}

pub fn main() void {
    _ = zigAdd(1, 2);
}`,
      hints: [
        'export makes a function visible to the C linker.',
        'The function has no name mangling.',
        'Output: (nothing printed, just compiles).',
      ],
      concepts: ['export fn', 'C linkage'],
    },
    {
      id: 'zig-extern-4',
      title: 'C integer types',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Check the size of C integer types.',
      skeleton: `const std = @import("std");

pub fn main() void {
    std.debug.print("{d} {d}\\n", .{
        @sizeOf(c_int),
        @sizeOf(c_long),
    });
}`,
      solution: `4 8`,
      hints: [
        'c_int is 4 bytes on most platforms.',
        'c_long is 8 bytes on 64-bit Linux/macOS (but 4 on Windows).',
        'Output may vary by platform; typically 4 8.',
      ],
      concepts: ['c_int', 'c_long', 'platform types'],
    },
    {
      id: 'zig-extern-5',
      title: 'Extern variable',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Declare an extern variable that links to a C global.',
      skeleton: `// Declare errno from libc
_____ var errno: c_int;

pub fn main() void {
    _ = errno; // compiles; actual value depends on last syscall
}`,
      solution: `extern var errno: c_int;

pub fn main() void {
    _ = errno;
}`,
      hints: [
        'extern var declares a variable defined in another object.',
        'errno is a C global provided by libc.',
        'Reading it without a failing syscall gives 0.',
      ],
      concepts: ['extern var', 'C global'],
    },
    {
      id: 'zig-extern-6',
      title: 'Calling convention specification',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Declare a C calling convention function using callconv.',
      skeleton: `// Declare a Windows stdcall function
const MessageBoxA = @extern(*const fn (
    hWnd: ?*anyopaque,
    lpText: [*:0]const u8,
    lpCaption: [*:0]const u8,
    uType: c_uint,
) callconv(._____) c_int, .{ .name = "MessageBoxA" });`,
      solution: `const MessageBoxA = @extern(*const fn (
    hWnd: ?*anyopaque,
    lpText: [*:0]const u8,
    lpCaption: [*:0]const u8,
    uType: c_uint,
) callconv(.Stdcall) c_int, .{ .name = "MessageBoxA" });`,
      hints: [
        'callconv(.Stdcall) is the Windows API calling convention.',
        '@extern imports a symbol by name.',
        'This is how you call Win32 API functions from Zig.',
      ],
      concepts: ['callconv', 'Stdcall', '@extern'],
    },
    {
      id: 'zig-extern-7',
      title: 'Export struct for C',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Export a function that takes and returns an extern struct.',
      skeleton: `const Point = extern struct { x: f64, y: f64 };

export fn midpoint(a: Point, b: Point) Point {
    return Point{
        .x = (a.x + b.x) / 2.0,
        .y = (a.y + b.y) / 2.0,
    };
}

pub fn main() void {
    const m = midpoint(.{ .x = 0, .y = 0 }, .{ .x = 4, .y = 4 });
    const std = @import("std");
    std.debug.print("{d} {d}\\n", .{ m.x, m.y });
}`,
      solution: `const Point = extern struct { x: f64, y: f64 };

export fn midpoint(a: Point, b: Point) Point {
    return Point{
        .x = (a.x + b.x) / 2.0,
        .y = (a.y + b.y) / 2.0,
    };
}

pub fn main() void {
    const m = midpoint(.{ .x = 0, .y = 0 }, .{ .x = 4, .y = 4 });
    const std = @import("std");
    std.debug.print("{d} {d}\\n", .{ m.x, m.y });
}`,
      hints: [
        'extern struct has C-compatible layout for use with export fn.',
        'midpoint of (0,0) and (4,4) is (2,2).',
        'Output: 2 2.',
      ],
      concepts: ['export fn', 'extern struct', 'C interop'],
    },
    {
      id: 'zig-extern-8',
      title: 'Opaque type for C pointer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use anyopaque as an opaque pointer for C void*.',
      skeleton: `const std = @import("std");

extern fn malloc(size: usize) ?*_____;
extern fn free(ptr: ?*anyopaque) void;

pub fn main() void {
    // Just verify declarations compile
    _ = malloc;
    _ = free;
    std.debug.print("ok\\n", .{});
}`,
      solution: `const std = @import("std");

extern fn malloc(size: usize) ?*anyopaque;
extern fn free(ptr: ?*anyopaque) void;

pub fn main() void {
    _ = malloc;
    _ = free;
    std.debug.print("ok\\n", .{});
}`,
      hints: [
        'anyopaque is Zig\'s equivalent to C\'s void.',
        '?*anyopaque is an optional void pointer.',
        'malloc returns NULL on failure, hence the optional.',
      ],
      concepts: ['anyopaque', 'void pointer', 'optional pointer'],
    },
    {
      id: 'zig-extern-9',
      title: 'linkage section',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict what section an export fn ends up in.',
      skeleton: `export fn myFunc() void {}

pub fn main() void {
    // export fn creates a symbol in .text section
    // callable from C with the exact name "myFunc"
    myFunc();
}`,
      solution: `(no output - function runs silently)`,
      hints: [
        'export fn creates a symbol visible from C.',
        'The function runs without output.',
        'The symbol "myFunc" exists in the object file.',
      ],
      concepts: ['export fn', 'symbol visibility', 'linkage'],
    },
    {
      id: 'zig-extern-10',
      title: 'Extern with library name',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Declare an extern function from a named library.',
      skeleton: `// Declare printf from libc
extern "c" fn printf(fmt: [*:0]const u8, ...) c_int;

pub fn main() void {
    _ = printf("hello\\n");
}`,
      solution: `extern "c" fn printf(fmt: [*:0]const u8, ...) c_int;

pub fn main() void {
    _ = printf("hello\\n");
}`,
      hints: [
        'extern "c" specifies the library name for the linker.',
        "'...' in the parameter list indicates variadic arguments.",
        'printf is the classic C formatted output function.',
      ],
      concepts: ['extern with library', 'variadic function'],
    },
    {
      id: 'zig-extern-11',
      title: 'Export main for C entry point',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Export a C-compatible main function for a shared library entry.',
      skeleton: `const std = @import("std");

export fn c_main(argc: c_int, argv: [*][*:0]u8) c_int {
    _ = argc;
    _ = argv;
    std.debug.print("from c_main\\n", .{});
    return 0;
}

pub fn main() void {
    _ = c_main(0, undefined);
}`,
      solution: `const std = @import("std");

export fn c_main(argc: c_int, argv: [*][*:0]u8) c_int {
    _ = argc;
    _ = argv;
    std.debug.print("from c_main\\n", .{});
    return 0;
}

pub fn main() void {
    _ = c_main(0, undefined);
}`,
      hints: [
        'c_int matches C int for argc.',
        '[*][*:0]u8 matches C\'s char** for argv.',
        'Output: from c_main.',
      ],
      concepts: ['C main signature', 'export fn', 'argc/argv'],
    },
    {
      id: 'zig-extern-12',
      title: 'Extern const for read-only C symbol',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Declare an extern constant symbol from C.',
      skeleton: `// Declare a read-only C constant
_____ const MAX_PATH: c_int;

pub fn main() void {
    _ = MAX_PATH; // value provided by C object file
}`,
      solution: `extern const MAX_PATH: c_int;

pub fn main() void {
    _ = MAX_PATH;
}`,
      hints: [
        'extern const declares a read-only C global.',
        'The value is provided by the linked C object.',
        'Just verify the declaration syntax.',
      ],
      concepts: ['extern const', 'read-only C symbol'],
    },
    {
      id: 'zig-extern-13',
      title: 'Function pointer from extern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Store an extern function in a function pointer variable.',
      skeleton: `const std = @import("std");

fn add(a: i32, b: i32) i32 { return a + b; }
fn mul(a: i32, b: i32) i32 { return a * b; }

pub fn main() void {
    const ops = [_]*const fn (i32, i32) i32{ add, mul };
    for (ops) |op| {
        std.debug.print("{d}\\n", .{op(3, 4)});
    }
}`,
      solution: `const std = @import("std");

fn add(a: i32, b: i32) i32 { return a + b; }
fn mul(a: i32, b: i32) i32 { return a * b; }

pub fn main() void {
    const ops = [_]*const fn (i32, i32) i32{ add, mul };
    for (ops) |op| {
        std.debug.print("{d}\\n", .{op(3, 4)});
    }
}`,
      hints: [
        'Function pointers are *const fn(params) ReturnType.',
        'add(3,4)=7, mul(3,4)=12.',
        'Output: 7 then 12.',
      ],
      concepts: ['function pointer', 'dispatch table'],
    },
    {
      id: 'zig-extern-14',
      title: 'C struct packing verification',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Verify extern struct has same size as C would compute.',
      skeleton: `const std = @import("std");

const CPoint = extern struct {
    x: f32,
    y: f32,
    z: f32,
};

pub fn main() void {
    std.debug.print("{d}\\n", .{@sizeOf(CPoint)});
}`,
      solution: `12`,
      hints: [
        '3 f32 fields * 4 bytes each = 12 bytes.',
        'No padding needed since all fields have alignment 4.',
        'C would also compute 12 bytes.',
      ],
      concepts: ['extern struct size', 'C compatibility'],
    },
    {
      id: 'zig-extern-15',
      title: 'Export constant',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Export a constant value for C code to reference.',
      skeleton: `_____ const VERSION: u32 = 1;

pub fn main() void {
    const std = @import("std");
    std.debug.print("{d}\\n", .{VERSION});
}`,
      solution: `export const VERSION: u32 = 1;

pub fn main() void {
    const std = @import("std");
    std.debug.print("{d}\\n", .{VERSION});
}`,
      hints: [
        'export const creates a C-visible constant symbol.',
        'C code can extern it as: extern uint32_t VERSION;',
        'Output: 1.',
      ],
      concepts: ['export const', 'C-visible constant'],
    },
    {
      id: 'zig-extern-16',
      title: 'noreturn extern function',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Declare an extern function that never returns.',
      skeleton: `// Declare the C exit function
extern fn exit(status: c_int) _____;

pub fn main() void {
    // just verifying the declaration
    _ = exit;
}`,
      solution: `extern fn exit(status: c_int) noreturn;

pub fn main() void {
    _ = exit;
}`,
      hints: [
        'exit() never returns, so the return type is noreturn.',
        'Zig uses noreturn instead of C\'s void with [[noreturn]].',
        'The compiler knows not to expect a return value.',
      ],
      concepts: ['noreturn', 'extern noreturn'],
    },
    {
      id: 'zig-extern-17',
      title: 'C struct with union member',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Map a C struct containing a union to Zig extern types.',
      skeleton: `const std = @import("std");

const CValue = extern union {
    as_int: c_int,
    as_float: f32,
};

const CVariant = extern struct {
    tag: c_int,
    value: CValue,
};

pub fn main() void {
    const v = CVariant{ .tag = 0, .value = .{ .as_int = 42 } };
    std.debug.print("{d}\\n", .{v.value.as_int});
}`,
      solution: `const std = @import("std");

const CValue = extern union {
    as_int: c_int,
    as_float: f32,
};

const CVariant = extern struct {
    tag: c_int,
    value: CValue,
};

pub fn main() void {
    const v = CVariant{ .tag = 0, .value = .{ .as_int = 42 } };
    std.debug.print("{d}\\n", .{v.value.as_int});
}`,
      hints: [
        'extern union maps to C union with C ABI.',
        'extern struct wraps the tagged union for C interop.',
        'Output: 42.',
      ],
      concepts: ['extern union', 'C tagged union', 'C interop'],
    },
    {
      id: 'zig-extern-18',
      title: 'Extern with section attribute',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Place a function in a specific linker section.',
      skeleton: `const std = @import("std");

export fn bootEntry() callconv(.C) void {
    // placed in .boot section
}

pub fn main() void {
    bootEntry();
    std.debug.print("ok\\n", .{});
}`,
      solution: `const std = @import("std");

export fn bootEntry() callconv(.C) void {
    // placed in .boot section
}

pub fn main() void {
    bootEntry();
    std.debug.print("ok\\n", .{});
}`,
      hints: [
        'callconv(.C) specifies C calling convention explicitly.',
        'Linker sections are configured in build.zig or linker scripts.',
        'Output: ok.',
      ],
      concepts: ['callconv(.C)', 'C calling convention'],
    },
    {
      id: 'zig-extern-19',
      title: 'Predict extern struct layout',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict the offset of a field in an extern struct.',
      skeleton: `const std = @import("std");

const S = extern struct { a: u8, b: u32, c: u8 };

pub fn main() void {
    std.debug.print("{d}\\n", .{@offsetOf(S, "b")});
}`,
      solution: `4`,
      hints: [
        '@offsetOf returns the byte offset of a field.',
        'a (1 byte) + 3 padding = offset 4 for b.',
        'Output: 4.',
      ],
      concepts: ['@offsetOf', 'extern struct layout'],
    },
    {
      id: 'zig-extern-20',
      title: 'Declare full C stdlib interface',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Declare a minimal C stdlib interface without @cImport.',
      skeleton: `const std = @import("std");

extern "c" fn malloc(size: usize) ?*anyopaque;
extern "c" fn free(ptr: ?*anyopaque) void;
extern "c" fn memcpy(dst: ?*anyopaque, src: ?*const anyopaque, n: usize) ?*anyopaque;

pub fn main() void {
    const p = malloc(8) orelse return;
    defer free(p);
    _ = memcpy(p, &@as(u64, 0xDEADBEEF), 8);
    std.debug.print("ok\\n", .{});
}`,
      solution: `const std = @import("std");

extern "c" fn malloc(size: usize) ?*anyopaque;
extern "c" fn free(ptr: ?*anyopaque) void;
extern "c" fn memcpy(dst: ?*anyopaque, src: ?*const anyopaque, n: usize) ?*anyopaque;

pub fn main() void {
    const p = malloc(8) orelse return;
    defer free(p);
    _ = memcpy(p, &@as(u64, 0xDEADBEEF), 8);
    std.debug.print("ok\\n", .{});
}`,
      hints: [
        'Declare C stdlib functions manually without @cImport.',
        'malloc returns optional pointer, free takes it back.',
        'Output: ok.',
      ],
      concepts: ['manual C stdlib', 'extern "c"', 'malloc/free'],
    },
  ],
};
