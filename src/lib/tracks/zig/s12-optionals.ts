import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-opt',
  title: '12. Optionals',
  language: 'zig',
  explanation: `Optionals represent values that may or may not be present. The type \`?T\` is either null or a value of type T.

\`\`\`zig
var maybe: ?i32 = null;
maybe = 42;
\`\`\`

**Null check with if capture:**
\`\`\`zig
if (maybe) |value| {
    // value is i32 here
}
\`\`\`

**orelse** provides a default:
\`\`\`zig
const x = maybe orelse 0;
\`\`\`

**orelse unreachable** asserts non-null:
\`\`\`zig
const x = maybe orelse unreachable;
\`\`\`

**.?** is shorthand for \`orelse unreachable\` - panics if null:
\`\`\`zig
const x = maybe.?;
\`\`\`

**while with optional** loops while non-null:
\`\`\`zig
while (iterator.next()) |item| {
    // use item
}
\`\`\`

Optionals in Zig replace null pointer bugs - the compiler ensures you handle the null case.`,
  exercises: [
    {
      id: 'zig-opt-1',
      title: 'Declare and assign optional',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Declare an optional integer and assign a value.',
      skeleton: `const std = @import("std");

pub fn main() void {
    var x: _____ = null;
    x = 42;
    std.debug.print("{?}\\n", .{x});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    var x: ?i32 = null;
    x = 42;
    std.debug.print("{?}\\n", .{x});
}`,
      hints: [
        'An optional i32 is declared as ?i32.',
        'Assign null first, then a value.',
        '{?} format prints an optional.',
      ],
      concepts: ['optional type', 'null assignment'],
    },
    {
      id: 'zig-opt-2',
      title: 'if capture for optional',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Use if capture to safely unwrap an optional.',
      skeleton: `const std = @import("std");

fn printIfPresent(val: ?i32) void {
    if (val) |v| {
        std.debug.print("{d}\\n", .{v});
    } else {
        std.debug.print("nothing\\n", .{});
    }
}

pub fn main() void {
    printIfPresent(7);
    printIfPresent(null);
}`,
      solution: `const std = @import("std");

fn printIfPresent(val: ?i32) void {
    if (val) |v| {
        std.debug.print("{d}\\n", .{v});
    } else {
        std.debug.print("nothing\\n", .{});
    }
}

pub fn main() void {
    printIfPresent(7);
    printIfPresent(null);
}`,
      hints: [
        'if (val) |v| captures the unwrapped value as v.',
        'The else branch handles the null case.',
        'Output: 7 then nothing.',
      ],
      concepts: ['if capture', 'optional unwrap'],
    },
    {
      id: 'zig-opt-3',
      title: 'orelse default value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Use orelse to provide a fallback when optional is null.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const a: ?i32 = null;
    const b: ?i32 = 10;
    const x = a _____ 0;
    const y = b _____ 0;
    std.debug.print("{d} {d}\\n", .{ x, y });
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const a: ?i32 = null;
    const b: ?i32 = 10;
    const x = a orelse 0;
    const y = b orelse 0;
    std.debug.print("{d} {d}\\n", .{ x, y });
}`,
      hints: [
        'Use the orelse keyword to provide a default.',
        'a orelse 0 returns 0 when a is null.',
        'b orelse 0 returns 10 when b is non-null.',
      ],
      concepts: ['orelse', 'default value'],
    },
    {
      id: 'zig-opt-4',
      title: 'Predict orelse output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict the output of orelse expressions.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const a: ?u8 = 5;
    const b: ?u8 = null;
    std.debug.print("{d} {d}\\n", .{ a orelse 99, b orelse 99 });
}`,
      solution: `5 99`,
      hints: [
        'a is 5, so a orelse 99 is 5.',
        'b is null, so b orelse 99 is 99.',
        'Output: "5 99".',
      ],
      concepts: ['orelse', 'null propagation'],
    },
    {
      id: 'zig-opt-5',
      title: 'Force unwrap with .?',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Force unwrap a non-null optional using .?',
      skeleton: `const std = @import("std");

pub fn main() void {
    const x: ?i32 = 77;
    const val: i32 = _____;
    std.debug.print("{d}\\n", .{val});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const x: ?i32 = 77;
    const val: i32 = x.?;
    std.debug.print("{d}\\n", .{val});
}`,
      hints: [
        'Use .? to unwrap an optional, panicking if null.',
        'x.? gives you the i32 when x is non-null.',
        'Only use .? when you are certain the value is present.',
      ],
      concepts: ['.? unwrap', 'force unwrap'],
    },
    {
      id: 'zig-opt-6',
      title: 'Function returning optional',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a function that returns an optional when input is negative.',
      skeleton: `const std = @import("std");

fn sqrt(n: f64) ?f64 {
    // return null if n < 0, else return @sqrt(n)
}

pub fn main() void {
    const a = sqrt(9.0) orelse 0.0;
    const b = sqrt(-1.0) orelse 0.0;
    std.debug.print("{d} {d}\\n", .{ a, b });
}`,
      solution: `const std = @import("std");

fn sqrt(n: f64) ?f64 {
    if (n < 0.0) return null;
    return @sqrt(n);
}

pub fn main() void {
    const a = sqrt(9.0) orelse 0.0;
    const b = sqrt(-1.0) orelse 0.0;
    std.debug.print("{d} {d}\\n", .{ a, b });
}`,
      hints: [
        'Check if n < 0.0 and return null.',
        'Otherwise return @sqrt(n).',
        'The output is "3 0".',
      ],
      concepts: ['optional return', 'error signaling'],
    },
    {
      id: 'zig-opt-7',
      title: 'while loop with optional iterator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use a while loop with optional capture for iteration.',
      skeleton: `const std = @import("std");

fn nextItem(state: *u8) ?u8 {
    if (state.* >= 3) return null;
    state.* += 1;
    return state.*;
}

pub fn main() void {
    var s: u8 = 0;
    _____ (nextItem(&s)) |item| {
        std.debug.print("{d}\\n", .{item});
    }
}`,
      solution: `const std = @import("std");

fn nextItem(state: *u8) ?u8 {
    if (state.* >= 3) return null;
    state.* += 1;
    return state.*;
}

pub fn main() void {
    var s: u8 = 0;
    while (nextItem(&s)) |item| {
        std.debug.print("{d}\\n", .{item});
    }
}`,
      hints: [
        'Use while with optional capture: while (fn()) |val|.',
        'The loop exits when the function returns null.',
        'Output: 1, 2, 3.',
      ],
      concepts: ['while optional', 'iterator pattern'],
    },
    {
      id: 'zig-opt-8',
      title: 'Optional chaining with orelse',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Predict output of chained orelse expressions.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const a: ?i32 = null;
    const b: ?i32 = null;
    const c: ?i32 = 42;
    const result = a orelse b orelse c orelse 0;
    std.debug.print("{d}\\n", .{result});
}`,
      solution: `42`,
      hints: [
        'orelse chains: try a, then b, then c.',
        'a and b are null, so c = 42 is used.',
        'Output: 42.',
      ],
      concepts: ['orelse chain', 'null coalescing'],
    },
    {
      id: 'zig-opt-9',
      title: 'Optional in struct field',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use an optional field in a struct for absent data.',
      skeleton: `const std = @import("std");

const User = struct {
    name: []const u8,
    email: _____, // may be absent
};

pub fn main() void {
    const u = User{ .name = "Alice", .email = null };
    const email = u.email orelse "no email";
    std.debug.print("{s}\\n", .{email});
}`,
      solution: `const std = @import("std");

const User = struct {
    name: []const u8,
    email: ?[]const u8,
};

pub fn main() void {
    const u = User{ .name = "Alice", .email = null };
    const email = u.email orelse "no email";
    std.debug.print("{s}\\n", .{email});
}`,
      hints: [
        'An optional string field is ?[]const u8.',
        'email = null means no email provided.',
        'orelse provides the fallback string.',
      ],
      concepts: ['optional field', 'nullable struct field'],
    },
    {
      id: 'zig-opt-10',
      title: 'Mutable optional capture',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Modify an optional value in-place using a mutable capture.',
      skeleton: `const std = @import("std");

pub fn main() void {
    var x: ?i32 = 10;
    if (x) |*v| {
        v.* *= 2;
    }
    std.debug.print("{?}\\n", .{x});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    var x: ?i32 = 10;
    if (x) |*v| {
        v.* *= 2;
    }
    std.debug.print("{?}\\n", .{x});
}`,
      hints: [
        '|*v| captures a mutable pointer to the payload.',
        'v.* *= 2 doubles the value in place.',
        'x becomes 20.',
      ],
      concepts: ['mutable optional capture', 'in-place mutation'],
    },
    {
      id: 'zig-opt-11',
      title: 'Optional pointer vs pointer to optional',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Understand the difference between ?*T and *?T.',
      skeleton: `const std = @import("std");

pub fn main() void {
    var x: i32 = 5;
    const opt_ptr: ?*i32 = &x;    // optional pointer
    var maybe: ?i32 = 5;
    const ptr_opt: *?i32 = &maybe; // pointer to optional
    std.debug.print("{d}\\n", .{opt_ptr.?.* });
    std.debug.print("{?}\\n", .{ptr_opt.*});
}`,
      solution: `5
5`,
      hints: [
        '?*i32: the pointer itself may be null.',
        '*?i32: the pointer is always valid, but it points to a nullable value.',
        'Both print 5 here.',
      ],
      concepts: ['optional pointer', 'pointer to optional', 'type semantics'],
    },
    {
      id: 'zig-opt-12',
      title: 'orelse with block return',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use orelse with a block to run code on null.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const x: ?i32 = null;
    const val = x orelse _____ {
        std.debug.print("was null\\n", .{});
        break :blk -1;
    };
    std.debug.print("{d}\\n", .{val});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const x: ?i32 = null;
    const val = x orelse blk: {
        std.debug.print("was null\\n", .{});
        break :blk -1;
    };
    std.debug.print("{d}\\n", .{val});
}`,
      hints: [
        'orelse can be followed by a labeled block.',
        'blk: { ... break :blk value; } evaluates to value.',
        'Output: "was null" then "-1".',
      ],
      concepts: ['orelse block', 'labeled block'],
    },
    {
      id: 'zig-opt-13',
      title: 'Optional in while with state',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Implement a countdown iterator using optional return.',
      skeleton: `const std = @import("std");

fn countdown(state: *i32) ?i32 {
    if (state.* <= 0) return null;
    defer state.* -= 1;
    return state.*;
}

pub fn main() void {
    var n: i32 = 3;
    while (countdown(&n)) |v| {
        std.debug.print("{d}\\n", .{v});
    }
}`,
      solution: `const std = @import("std");

fn countdown(state: *i32) ?i32 {
    if (state.* <= 0) return null;
    defer state.* -= 1;
    return state.*;
}

pub fn main() void {
    var n: i32 = 3;
    while (countdown(&n)) |v| {
        std.debug.print("{d}\\n", .{v});
    }
}`,
      hints: [
        'defer runs after the function returns, so the value is returned before decrement.',
        'Returns 3, 2, 1, then null to end.',
        'Output: 3, 2, 1.',
      ],
      concepts: ['optional iterator', 'defer', 'while capture'],
    },
    {
      id: 'zig-opt-14',
      title: 'Nested optional unwrap',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict output of nested optional null handling.',
      skeleton: `const std = @import("std");

fn lookup(key: u8) ?i32 {
    return if (key == 1) 100 else null;
}

pub fn main() void {
    const a = lookup(1) orelse lookup(2) orelse 0;
    const b = lookup(2) orelse lookup(3) orelse 0;
    std.debug.print("{d} {d}\\n", .{ a, b });
}`,
      solution: `100 0`,
      hints: [
        'lookup(1) returns 100, so a = 100.',
        'lookup(2) and lookup(3) return null, so b = 0.',
        'Output: "100 0".',
      ],
      concepts: ['optional chain', 'orelse fallback'],
    },
    {
      id: 'zig-opt-15',
      title: 'std.mem.indexOfScalar returns optional',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use std.mem.indexOfScalar which returns ?usize.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const haystack = "hello world";
    const pos = std.mem.indexOfScalar(u8, haystack, 'w');
    if (pos) |idx| {
        std.debug.print("found at {d}\\n", .{idx});
    } else {
        std.debug.print("not found\\n", .{});
    }
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const haystack = "hello world";
    const pos = std.mem.indexOfScalar(u8, haystack, 'w');
    if (pos) |idx| {
        std.debug.print("found at {d}\\n", .{idx});
    } else {
        std.debug.print("not found\\n", .{});
    }
}`,
      hints: [
        'std.mem.indexOfScalar returns ?usize.',
        "w is at index 6 in 'hello world'.",
        'Output: "found at 6".',
      ],
      concepts: ['std.mem.indexOfScalar', 'optional return from stdlib'],
    },
    {
      id: 'zig-opt-16',
      title: 'Optional equality',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict the result of comparing optionals.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const a: ?i32 = 5;
    const b: ?i32 = 5;
    const c: ?i32 = null;
    std.debug.print("{} {} {}\\n", .{ a == b, a == c, c == null });
}`,
      solution: `true false true`,
      hints: [
        'Optionals support == comparison.',
        'a == b: both are 5 -> true.',
        'a == c: 5 vs null -> false. c == null: null == null -> true.',
      ],
      concepts: ['optional equality', 'null comparison'],
    },
    {
      id: 'zig-opt-17',
      title: 'Propagate null with orelse return',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use orelse return to propagate null early.',
      skeleton: `const std = @import("std");

fn findFirst(slice: []const i32, target: i32) ?usize {
    for (slice, 0..) |v, i| {
        if (v == target) return i;
    }
    return null;
}

fn printPosition(slice: []const i32, target: i32) void {
    const pos = findFirst(slice, target) orelse return;
    std.debug.print("found at {d}\\n", .{pos});
}

pub fn main() void {
    const data = [_]i32{ 1, 2, 3, 4 };
    printPosition(&data, 3);
    printPosition(&data, 9);
}`,
      solution: `const std = @import("std");

fn findFirst(slice: []const i32, target: i32) ?usize {
    for (slice, 0..) |v, i| {
        if (v == target) return i;
    }
    return null;
}

fn printPosition(slice: []const i32, target: i32) void {
    const pos = findFirst(slice, target) orelse return;
    std.debug.print("found at {d}\\n", .{pos});
}

pub fn main() void {
    const data = [_]i32{ 1, 2, 3, 4 };
    printPosition(&data, 3);
    printPosition(&data, 9);
}`,
      hints: [
        'orelse return exits the function early if null.',
        'For target=3, pos=2 and "found at 2" is printed.',
        'For target=9, null is returned and the function exits.',
      ],
      concepts: ['orelse return', 'early exit', 'null propagation'],
    },
    {
      id: 'zig-opt-18',
      title: 'Optional size',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict the size of an optional vs its inner type.',
      skeleton: `const std = @import("std");

pub fn main() void {
    std.debug.print("{d} {d}\\n", .{
        @sizeOf(i32),
        @sizeOf(?i32),
    });
}`,
      solution: `4 8`,
      hints: [
        'i32 is 4 bytes.',
        '?i32 needs extra space for the null flag, typically rounded to 8 bytes.',
        'Optional pointers are special: ?*T is the same size as *T since null pointer is used.',
      ],
      concepts: ['optional size', '@sizeOf', 'memory layout'],
    },
    {
      id: 'zig-opt-19',
      title: 'Fix: unwrap null optional',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Fix the bug where a null optional is forcibly unwrapped.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const x: ?i32 = null;
    const v = x.?; // bug: panics at runtime
    std.debug.print("{d}\\n", .{v});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const x: ?i32 = null;
    const v = x orelse 0;
    std.debug.print("{d}\\n", .{v});
}`,
      hints: [
        '.? on a null optional causes a runtime panic.',
        'Use orelse 0 to safely fall back to a default.',
        'Or use if (x) |v| to conditionally use the value.',
      ],
      concepts: ['null safety', 'orelse vs .?'],
    },
    {
      id: 'zig-opt-20',
      title: 'Optional pointer optimization',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict the size of an optional pointer (compiler optimization).',
      skeleton: `const std = @import("std");

pub fn main() void {
    std.debug.print("{d} {d}\\n", .{
        @sizeOf(*i32),
        @sizeOf(?*i32),
    });
}`,
      solution: `8 8`,
      hints: [
        'Optional pointers are the same size as non-optional pointers.',
        'The null pointer address (0) represents the null state.',
        'No extra byte needed because pointer 0 = null.',
      ],
      concepts: ['optional pointer size', 'null pointer optimization'],
    },
  ],
};
