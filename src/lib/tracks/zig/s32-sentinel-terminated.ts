import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-sentinel',
  title: '32. Sentinel-Terminated Arrays',
  language: 'zig',
  explanation: `Sentinel-terminated arrays carry a terminating value after the last element. The most common case is null-terminated C strings.

**Null-terminated string literal:**
\`\`\`zig
const s: [*:0]const u8 = "hello"; // pointer to null-terminated string
\`\`\`

**Sentinel-terminated array type:** \`[N:sentinel]T\`
\`\`\`zig
const arr: [3:0]u8 = .{ 1, 2, 3 }; // 4 bytes in memory: 1, 2, 3, 0
\`\`\`

**Many-item sentinel pointer:** \`[*:sentinel]T\`
\`\`\`zig
const p: [*:0]const u8 = "hi"; // pointer, not slice
\`\`\`

**Convert to slice:** Use \`std.mem.span\` to convert a sentinel pointer to a slice:
\`\`\`zig
const slice = std.mem.span(p); // []const u8
\`\`\`

**C string interop:** Zig string literals coerce to \`[*:0]const u8\` for passing to C functions.

\`\`\`zig
const len = c.strlen("hello"); // passes [*:0]const u8
\`\`\``,
  exercises: [
    {
      id: 'zig-sentinel-1',
      title: 'String literal as sentinel pointer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Assign a string literal to a null-terminated pointer type.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const s: _____= "hello";
    _ = s;
    std.debug.print("ok\\n", .{});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const s: [*:0]const u8 = "hello";
    _ = s;
    std.debug.print("ok\\n", .{});
}`,
      hints: [
        '[*:0]const u8 is a many-item pointer to null-terminated u8.',
        'String literals coerce to this type automatically.',
        '0 is the sentinel value (null terminator).',
      ],
      concepts: ['[*:0]const u8', 'null-terminated string'],
    },
    {
      id: 'zig-sentinel-2',
      title: 'Sentinel array declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Declare a sentinel-terminated array with a zero sentinel.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const arr: [3:0]u8 = .{ 1, 2, 3 };
    std.debug.print("{d}\\n", .{arr[_____]}); // access sentinel
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const arr: [3:0]u8 = .{ 1, 2, 3 };
    std.debug.print("{d}\\n", .{arr[3]});
}`,
      hints: [
        '[3:0]u8 has 3 elements plus a sentinel at index 3.',
        'arr[3] accesses the sentinel value.',
        'Output: 0.',
      ],
      concepts: ['[N:sentinel]T', 'sentinel access'],
    },
    {
      id: 'zig-sentinel-3',
      title: 'std.mem.span to convert to slice',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Convert a sentinel pointer to a slice using std.mem.span.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const p: [*:0]const u8 = "hello";
    const s: []const u8 = std.mem.span(p);
    std.debug.print("{d}\\n", .{s.len});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const p: [*:0]const u8 = "hello";
    const s: []const u8 = std.mem.span(p);
    std.debug.print("{d}\\n", .{s.len});
}`,
      hints: [
        'std.mem.span converts [*:sentinel]T to a slice.',
        '"hello" has 5 bytes (not counting the null).',
        'Output: 5.',
      ],
      concepts: ['std.mem.span', 'sentinel to slice'],
    },
    {
      id: 'zig-sentinel-4',
      title: 'Predict sentinel size',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict the size of a sentinel-terminated array.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const arr: [4:0]u8 = .{ 'a', 'b', 'c', 'd' };
    std.debug.print("{d}\\n", .{@sizeOf(@TypeOf(arr))});
}`,
      solution: `5`,
      hints: [
        '[4:0]u8 holds 4 elements + 1 sentinel = 5 bytes.',
        '@sizeOf includes the sentinel.',
        'Output: 5.',
      ],
      concepts: ['sentinel size', '@sizeOf'],
    },
    {
      id: 'zig-sentinel-5',
      title: 'Pass null-terminated string to function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a function that accepts a null-terminated string and returns its length.',
      skeleton: `const std = @import("std");

fn cstrlen(s: [*:0]const u8) usize {
    var i: usize = 0;
    while (s[i] != 0) i += 1;
    return i;
}

pub fn main() void {
    std.debug.print("{d}\\n", .{cstrlen("world")});
}`,
      solution: `const std = @import("std");

fn cstrlen(s: [*:0]const u8) usize {
    var i: usize = 0;
    while (s[i] != 0) i += 1;
    return i;
}

pub fn main() void {
    std.debug.print("{d}\\n", .{cstrlen("world")});
}`,
      hints: [
        'Walk until s[i] == 0 (the null terminator).',
        '"world" has 5 characters.',
        'Output: 5.',
      ],
      concepts: ['null-terminated traversal', 'cstrlen'],
    },
    {
      id: 'zig-sentinel-6',
      title: 'Coerce slice to sentinel pointer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Coerce a sentinel-terminated array to a slice.',
      skeleton: `const std = @import("std");

pub fn main() void {
    var arr: [3:0]u8 = .{ 'a', 'b', 'c' };
    const sl: []u8 = &arr;
    std.debug.print("{d}\\n", .{_____});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    var arr: [3:0]u8 = .{ 'a', 'b', 'c' };
    const sl: []u8 = &arr;
    std.debug.print("{d}\\n", .{sl.len});
}`,
      hints: [
        '&arr coerces a sentinel array to []u8.',
        'The slice len does not include the sentinel.',
        'sl.len is 3.',
      ],
      concepts: ['sentinel array to slice', 'coercion'],
    },
    {
      id: 'zig-sentinel-7',
      title: 'Non-zero sentinel value',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Declare a sentinel-terminated array with a custom sentinel value.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const arr: [3:255]u8 = .{ 1, 2, 3 };
    std.debug.print("{d}\\n", .{arr[_____]}); // sentinel at end
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const arr: [3:255]u8 = .{ 1, 2, 3 };
    std.debug.print("{d}\\n", .{arr[3]});
}`,
      hints: [
        'The sentinel value is 255 here, not 0.',
        'arr[3] is the sentinel position.',
        'Output: 255.',
      ],
      concepts: ['custom sentinel', 'sentinel value'],
    },
    {
      id: 'zig-sentinel-8',
      title: 'std.mem.sliceTo for manual sentinel scan',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use std.mem.sliceTo to get a slice up to the sentinel.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const buf = [_]u8{ 'h', 'i', 0, 'x', 'x' };
    const s = std.mem.sliceTo(&buf, 0);
    std.debug.print("{s} len={d}\\n", .{ s, s.len });
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const buf = [_]u8{ 'h', 'i', 0, 'x', 'x' };
    const s = std.mem.sliceTo(&buf, 0);
    std.debug.print("{s} len={d}\\n", .{ s, s.len });
}`,
      hints: [
        'std.mem.sliceTo scans for the sentinel and returns the slice before it.',
        'The null is at index 2, so slice is "hi".',
        'Output: hi len=2.',
      ],
      concepts: ['std.mem.sliceTo', 'scan for sentinel'],
    },
    {
      id: 'zig-sentinel-9',
      title: 'Predict sentinel behavior',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict the length when std.mem.span reads a sentinel pointer.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const p: [*:0]const u8 = "abc";
    const s = std.mem.span(p);
    std.debug.print("{d}\\n", .{s.len});
}`,
      solution: `3`,
      hints: [
        'std.mem.span stops at the null terminator.',
        '"abc" has 3 chars before the null.',
        'Output: 3.',
      ],
      concepts: ['std.mem.span', 'length without sentinel'],
    },
    {
      id: 'zig-sentinel-10',
      title: 'Null-terminated array to [*:0] pointer',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Convert a sentinel-terminated array to [*:0] pointer.',
      skeleton: `const std = @import("std");

pub fn main() void {
    var arr: [5:0]u8 = .{ 'h', 'e', 'l', 'l', 'o' };
    const p: _____ = &arr;
    std.debug.print("{d}\\n", .{std.mem.span(p).len});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    var arr: [5:0]u8 = .{ 'h', 'e', 'l', 'l', 'o' };
    const p: [*:0]u8 = &arr;
    std.debug.print("{d}\\n", .{std.mem.span(p).len});
}`,
      hints: [
        '&arr of a [5:0]u8 coerces to [*:0]u8.',
        'std.mem.span follows the null to find length 5.',
        'Output: 5.',
      ],
      concepts: ['[*:0] coercion', 'sentinel pointer'],
    },
    {
      id: 'zig-sentinel-11',
      title: 'Iterate null-terminated string',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Iterate a null-terminated string without converting to slice.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const s: [*:0]const u8 = "hi!";
    var i: usize = 0;
    while (s[i] != 0) : (i += 1) {
        std.debug.print("{c}", .{s[i]});
    }
    std.debug.print("\\n", .{});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const s: [*:0]const u8 = "hi!";
    var i: usize = 0;
    while (s[i] != 0) : (i += 1) {
        std.debug.print("{c}", .{s[i]});
    }
    std.debug.print("\\n", .{});
}`,
      hints: [
        'Walk the pointer until s[i] == 0.',
        '{c} formats a u8 as a character.',
        'Output: hi!',
      ],
      concepts: ['null-terminated iteration', 'while loop'],
    },
    {
      id: 'zig-sentinel-12',
      title: 'Sentinel in a comptime context',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict the length of a comptime sentinel string.',
      skeleton: `const std = @import("std");

const msg: [*:0]const u8 = "Zig";

pub fn main() void {
    comptime {
        const s = std.mem.span(msg);
        _ = s; // length known at comptime
    }
    std.debug.print("{d}\\n", .{std.mem.span(msg).len});
}`,
      solution: `3`,
      hints: [
        '"Zig" has 3 characters.',
        'std.mem.span returns a slice of length 3.',
        'Output: 3.',
      ],
      concepts: ['comptime sentinel', 'std.mem.span'],
    },
    {
      id: 'zig-sentinel-13',
      title: 'Build null-terminated string from slice',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Build a null-terminated buffer from a regular slice.',
      skeleton: `const std = @import("std");

pub fn main() void {
    var buf: [8:0]u8 = [_:0]u8{0} ** 8;
    const src = "hello";
    @memcpy(buf[0..src.len], src);
    const p: [*:0]const u8 = &buf;
    std.debug.print("{s}\\n", .{std.mem.span(p)});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    var buf: [8:0]u8 = [_:0]u8{0} ** 8;
    const src = "hello";
    @memcpy(buf[0..src.len], src);
    const p: [*:0]const u8 = &buf;
    std.debug.print("{s}\\n", .{std.mem.span(p)});
}`,
      hints: [
        '[_:0]u8{0} ** 8 initializes all bytes to 0 including sentinel.',
        '@memcpy copies src into buf.',
        'Output: hello.',
      ],
      concepts: ['null-terminated buffer', '@memcpy', 'sentinel initialization'],
    },
    {
      id: 'zig-sentinel-14',
      title: 'Refactor to use std.mem.span',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Refactor manual null-terminated length loop to use std.mem.span.',
      skeleton: `const std = @import("std");

fn myLen(s: [*:0]const u8) usize {
    var i: usize = 0;
    while (s[i] != 0) i += 1;
    return i;
}

pub fn main() void {
    std.debug.print("{d}\\n", .{myLen("test")});
}`,
      solution: `const std = @import("std");

fn myLen(s: [*:0]const u8) usize {
    return std.mem.span(s).len;
}

pub fn main() void {
    std.debug.print("{d}\\n", .{myLen("test")});
}`,
      hints: [
        'std.mem.span(s) returns a slice; .len is the length.',
        'This replaces the manual loop.',
        'Output: 4.',
      ],
      concepts: ['refactor', 'std.mem.span'],
    },
    {
      id: 'zig-sentinel-15',
      title: 'Sentinel slice indexing safety',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict what happens with a safe sentinel array slice.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const arr: [3:0]u8 = .{ 10, 20, 30 };
    const sl: []const u8 = arr[0..2];
    std.debug.print("{d} {d}\\n", .{ sl.len, arr[3] });
}`,
      solution: `2 0`,
      hints: [
        'arr[0..2] creates a slice of length 2.',
        'arr[3] is the sentinel, which is 0.',
        'Output: 2 0.',
      ],
      concepts: ['sentinel array slicing', 'sentinel access'],
    },
    {
      id: 'zig-sentinel-16',
      title: 'C string argv',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Process argv as null-terminated strings.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const args = std.os.argv;
    for (args) |arg| {
        const s = std.mem.span(arg);
        std.debug.print("{s}\\n", .{s});
    }
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const args = std.os.argv;
    for (args) |arg| {
        const s = std.mem.span(arg);
        std.debug.print("{s}\\n", .{s});
    }
}`,
      hints: [
        'std.os.argv is [][*:0]u8 — a slice of null-terminated strings.',
        'Each arg is converted to a slice with std.mem.span.',
        'Prints the program name and any arguments.',
      ],
      concepts: ['argv', 'null-terminated strings', 'os.argv'],
    },
    {
      id: 'zig-sentinel-17',
      title: 'Sentinel vs null-terminated difference',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Understand that sentinel can be any value, not just 0.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const arr: [4:99]u8 = .{ 1, 2, 3, 4 };
    std.debug.print("{d} {d}\\n", .{ arr.len, arr[4] });
}`,
      solution: `4 99`,
      hints: [
        'arr.len is 4 (not counting the sentinel).',
        'arr[4] accesses the sentinel, which is 99.',
        'Output: 4 99.',
      ],
      concepts: ['custom sentinel value', 'sentinel access'],
    },
    {
      id: 'zig-sentinel-18',
      title: 'Pass to C function signature',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Coerce a Zig string to match a C function expecting [*:0]const u8.',
      skeleton: `const std = @import("std");

fn printC(s: [*:0]const u8) void {
    std.debug.print("{s}\\n", .{std.mem.span(s)});
}

pub fn main() void {
    const msg: []const u8 = "from slice";
    // cannot pass []const u8 directly; must get sentinel pointer
    printC(_____);
}`,
      solution: `const std = @import("std");

fn printC(s: [*:0]const u8) void {
    std.debug.print("{s}\\n", .{std.mem.span(s)});
}

pub fn main() void {
    printC("from slice");
}`,
      hints: [
        'String literals can be used directly as [*:0]const u8.',
        'A runtime []const u8 cannot be implicitly converted.',
        'Use a string literal directly for this case.',
      ],
      concepts: ['C string coercion', 'literal vs slice'],
    },
    {
      id: 'zig-sentinel-19',
      title: 'Sentinel array in a struct',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Store a null-terminated name in a struct field.',
      skeleton: `const std = @import("std");

const Named = struct {
    name: [32:0]u8,
};

pub fn main() void {
    var n = Named{ .name = [_:0]u8{0} ** 32 };
    @memcpy(n.name[0..3], "zig");
    const s = std.mem.span(____);
    std.debug.print("{s}\\n", .{s});
}`,
      solution: `const std = @import("std");

const Named = struct {
    name: [32:0]u8,
};

pub fn main() void {
    var n = Named{ .name = [_:0]u8{0} ** 32 };
    @memcpy(n.name[0..3], "zig");
    const s = std.mem.span(&n.name);
    std.debug.print("{s}\\n", .{s});
}`,
      hints: [
        'Pass &n.name to std.mem.span; it takes a pointer to sentinel array.',
        'The result slice stops at the first 0.',
        'Output: zig.',
      ],
      concepts: ['sentinel field', 'struct with name buffer'],
    },
    {
      id: 'zig-sentinel-20',
      title: 'Concatenate null-terminated strings at comptime',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Concatenate two string literals (produces null-terminated result).',
      skeleton: `const std = @import("std");

pub fn main() void {
    const s = "foo" ++ "bar";
    const p: [*:0]const u8 = s;
    std.debug.print("{d}\\n", .{std.mem.span(p).len});
}`,
      solution: `6`,
      hints: [
        '"foo" ++ "bar" = "foobar" (6 characters + null).',
        'std.mem.span returns length 6.',
        'Output: 6.',
      ],
      concepts: ['comptime concat', 'sentinel result'],
    },
  ],
};
