import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-union',
  title: '11. Unions',
  language: 'zig',
  explanation: `Unions hold one of several possible types at a time. A bare union has no tag — you must track which field is active yourself.

\`\`\`zig
const Data = union { int: i64, float: f64, boolean: bool };
var d = Data{ .int = 42 };
\`\`\`

**Tagged unions** pair an enum tag with each variant, enabling safe access:
\`\`\`zig
const Value = union(enum) {
    int: i64,
    float: f64,
    none,
};
\`\`\`

**Switch on tagged union** with payload capture:
\`\`\`zig
switch (v) {
    .int   => |n| std.debug.print("{d}\\n", .{n}),
    .float => |f| std.debug.print("{d}\\n", .{f}),
    .none  => std.debug.print("none\\n", .{}),
}
\`\`\`

**Extern unions** share memory with C ABI layout. Tagged unions with a named enum give you the most control and safety.`,
  exercises: [
    {
      id: 'zig-union-1',
      title: 'Declare and use a bare union',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Initialize a union with an integer value.',
      skeleton: `const std = @import("std");

const Num = union { i: i32, f: f32 };

pub fn main() void {
    const n = Num{ _____ };
    std.debug.print("{d}\\n", .{n.i});
}`,
      solution: `const std = @import("std");

const Num = union { i: i32, f: f32 };

pub fn main() void {
    const n = Num{ .i = 7 };
    std.debug.print("{d}\\n", .{n.i});
}`,
      hints: [
        'Initialize the union by specifying one field: .i = 7.',
        'Only one field can be active at a time.',
        'Access it with n.i.',
      ],
      concepts: ['union literal', 'active field'],
    },
    {
      id: 'zig-union-2',
      title: 'Tagged union declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Declare a tagged union using union(enum).',
      skeleton: `const std = @import("std");

const Shape = _____ {
    circle: f32,
    rect: struct { w: f32, h: f32 },
};

pub fn main() void {
    const s = Shape{ .circle = 5.0 };
    _ = s;
    std.debug.print("ok\\n", .{});
}`,
      solution: `const std = @import("std");

const Shape = union(enum) {
    circle: f32,
    rect: struct { w: f32, h: f32 },
};

pub fn main() void {
    const s = Shape{ .circle = 5.0 };
    _ = s;
    std.debug.print("ok\\n", .{});
}`,
      hints: [
        'Use union(enum) to create a tagged union.',
        'The compiler auto-generates the enum from the field names.',
        'Each field becomes an enum variant and a data type.',
      ],
      concepts: ['tagged union', 'union(enum)'],
    },
    {
      id: 'zig-union-3',
      title: 'Switch on tagged union',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Write a function that prints the active variant of a tagged union.',
      skeleton: `const std = @import("std");

const Value = union(enum) {
    int: i64,
    str: []const u8,
};

fn print(v: Value) void {
    switch (v) {
        // handle both variants
    }
}

pub fn main() void {
    print(Value{ .int = 42 });
    print(Value{ .str = "hello" });
}`,
      solution: `const std = @import("std");

const Value = union(enum) {
    int: i64,
    str: []const u8,
};

fn print(v: Value) void {
    switch (v) {
        .int => |n| std.debug.print("{d}\\n", .{n}),
        .str => |s| std.debug.print("{s}\\n", .{s}),
    }
}

pub fn main() void {
    print(Value{ .int = 42 });
    print(Value{ .str = "hello" });
}`,
      hints: [
        'Use .variant => |payload| to capture the data.',
        'Both .int and .str must be handled.',
        'The output should be 42 then hello.',
      ],
      concepts: ['switch capture', 'tagged union dispatch'],
    },
    {
      id: 'zig-union-4',
      title: 'Predict tagged union switch output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict the output of a switch on a tagged union.',
      skeleton: `const std = @import("std");

const Msg = union(enum) { ok: u32, err: []const u8 };

pub fn main() void {
    const m = Msg{ .ok = 200 };
    switch (m) {
        .ok  => |code| std.debug.print("OK {d}\\n", .{code}),
        .err => |msg|  std.debug.print("ERR {s}\\n", .{msg}),
    }
}`,
      solution: `OK 200`,
      hints: [
        'm is initialized as .ok with value 200.',
        'The .ok branch captures 200 as code.',
        'Output follows the format: "OK 200".',
      ],
      concepts: ['tagged union', 'switch dispatch'],
    },
    {
      id: 'zig-union-5',
      title: 'Union with void variant',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Declare a tagged union with a void (no-payload) variant.',
      skeleton: `const std = @import("std");

const Option = union(enum) {
    some: i32,
    none: _____,
};

pub fn main() void {
    const o = Option.none;
    switch (o) {
        .some => |v| std.debug.print("{d}\\n", .{v}),
        .none => std.debug.print("none\\n", .{}),
    }
}`,
      solution: `const std = @import("std");

const Option = union(enum) {
    some: i32,
    none: void,
};

pub fn main() void {
    const o = Option.none;
    switch (o) {
        .some => |v| std.debug.print("{d}\\n", .{v}),
        .none => std.debug.print("none\\n", .{}),
    }
}`,
      hints: [
        'A variant with no data uses the void type.',
        'void variants carry no payload.',
        'Access with Option.none (no braces needed).',
      ],
      concepts: ['void variant', 'tagged union'],
    },
    {
      id: 'zig-union-6',
      title: 'Mutable tagged union',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Modify a tagged union by reassigning it to a different variant.',
      skeleton: `const std = @import("std");

const Val = union(enum) { int: i32, float: f32 };

pub fn main() void {
    var v = Val{ .int = 1 };
    // change v to hold float 3.14
    v = _____;
    switch (v) {
        .int   => |n| std.debug.print("int {d}\\n", .{n}),
        .float => |f| std.debug.print("float {d}\\n", .{f}),
    }
}`,
      solution: `const std = @import("std");

const Val = union(enum) { int: i32, float: f32 };

pub fn main() void {
    var v = Val{ .int = 1 };
    v = Val{ .float = 3.14 };
    switch (v) {
        .int   => |n| std.debug.print("int {d}\\n", .{n}),
        .float => |f| std.debug.print("float {d}\\n", .{f}),
    }
}`,
      hints: [
        'Reassign v to a new union literal: Val{ .float = 3.14 }.',
        'This changes the active variant.',
        'The float branch will fire.',
      ],
      concepts: ['union reassignment', 'variant switching'],
    },
    {
      id: 'zig-union-7',
      title: 'Get active tag',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Get the active tag of a tagged union at runtime.',
      skeleton: `const std = @import("std");

const Val = union(enum) { int: i32, float: f32 };

pub fn main() void {
    const v = Val{ .int = 5 };
    const tag = _____;
    std.debug.print("{s}\\n", .{@tagName(tag)});
}`,
      solution: `const std = @import("std");

const Val = union(enum) { int: i32, float: f32 };

pub fn main() void {
    const v = Val{ .int = 5 };
    const tag = std.meta.activeTag(v);
    std.debug.print("{s}\\n", .{@tagName(tag)});
}`,
      hints: [
        'std.meta.activeTag(v) returns the current enum tag.',
        '@tagName then converts it to a string.',
        'The output is "int".',
      ],
      concepts: ['std.meta.activeTag', 'active tag'],
    },
    {
      id: 'zig-union-8',
      title: 'Union size equals largest field',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Predict the size of a union.',
      skeleton: `const std = @import("std");

const U = union { a: u8, b: u64, c: u16 };

pub fn main() void {
    std.debug.print("{d}\\n", .{@sizeOf(U)});
}`,
      solution: `8`,
      hints: [
        'A union must be large enough for the largest field.',
        'u64 is 8 bytes, which is the largest.',
        'The union size is 8.',
      ],
      concepts: ['union size', '@sizeOf'],
    },
    {
      id: 'zig-union-9',
      title: 'Fix: accessing wrong union field',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Fix the bug where the wrong union field is accessed.',
      skeleton: `const std = @import("std");

const Data = union(enum) { num: i32, text: []const u8 };

pub fn main() void {
    const d = Data{ .text = "hello" };
    std.debug.print("{d}\\n", .{d.num}); // bug: wrong field
}`,
      solution: `const std = @import("std");

const Data = union(enum) { num: i32, text: []const u8 };

pub fn main() void {
    const d = Data{ .text = "hello" };
    std.debug.print("{s}\\n", .{d.text});
}`,
      hints: [
        'd was initialized with .text, so d.num is undefined behavior.',
        'Access d.text and use {s} format for strings.',
        'Only access the active field of a union.',
      ],
      concepts: ['undefined behavior', 'active field'],
    },
    {
      id: 'zig-union-10',
      title: 'Named enum tag for union',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use a named enum as the tag type for a union.',
      skeleton: `const std = @import("std");

const Kind = enum { number, text };

const Token = union(Kind) {
    number: f64,
    text: []const u8,
};

pub fn main() void {
    const t = Token{ .number = 3.14 };
    const tag: Kind = _____;
    std.debug.print("{s}\\n", .{@tagName(tag)});
}`,
      solution: `const std = @import("std");

const Kind = enum { number, text };

const Token = union(Kind) {
    number: f64,
    text: []const u8,
};

pub fn main() void {
    const t = Token{ .number = 3.14 };
    const tag: Kind = std.meta.activeTag(t);
    std.debug.print("{s}\\n", .{@tagName(tag)});
}`,
      hints: [
        'When using a named enum tag, activeTag returns that enum type.',
        'std.meta.activeTag(t) returns the Kind enum value.',
        'Output is "number".',
      ],
      concepts: ['named enum tag', 'union(Kind)'],
    },
    {
      id: 'zig-union-11',
      title: 'Pattern match nested union',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a function that evaluates a nested tagged union expression.',
      skeleton: `const std = @import("std");

const Expr = union(enum) {
    lit: i32,
    neg: *const Expr,
};

fn eval(e: Expr) i32 {
    return switch (e) {
        .lit => |n| n,
        .neg => |inner| -eval(inner.*),
    };
}

pub fn main() void {
    const inner = Expr{ .lit = 5 };
    const outer = Expr{ .neg = &inner };
    std.debug.print("{d}\\n", .{eval(outer)});
}`,
      solution: `const std = @import("std");

const Expr = union(enum) {
    lit: i32,
    neg: *const Expr,
};

fn eval(e: Expr) i32 {
    return switch (e) {
        .lit => |n| n,
        .neg => |inner| -eval(inner.*),
    };
}

pub fn main() void {
    const inner = Expr{ .lit = 5 };
    const outer = Expr{ .neg = &inner };
    std.debug.print("{d}\\n", .{eval(outer)});
}`,
      hints: [
        'inner.* dereferences the pointer to get the inner Expr.',
        'eval recurses on the inner expression.',
        'The output is -5.',
      ],
      concepts: ['recursive union', 'pattern match', 'pointer to union'],
    },
    {
      id: 'zig-union-12',
      title: 'Extern union for C interop',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Declare an extern union that matches a C union layout.',
      skeleton: `const std = @import("std");

const CNum = extern union {
    as_i32: i32,
    as_f32: f32,
};

pub fn main() void {
    var n = CNum{ .as_i32 = 0x3f800000 };
    std.debug.print("{d}\\n", .{@sizeOf(CNum)});
    _ = n;
}`,
      solution: `const std = @import("std");

const CNum = extern union {
    as_i32: i32,
    as_f32: f32,
};

pub fn main() void {
    var n = CNum{ .as_i32 = 0x3f800000 };
    std.debug.print("{d}\\n", .{@sizeOf(CNum)});
    _ = n;
}`,
      hints: [
        'extern union has C ABI layout with no tag.',
        'i32 and f32 are both 4 bytes, so the union is 4 bytes.',
        'This is already correct; note how extern differs from union(enum).',
      ],
      concepts: ['extern union', 'C ABI'],
    },
    {
      id: 'zig-union-13',
      title: 'Union as optional replacement',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Implement a Maybe type using a tagged union.',
      skeleton: `const std = @import("std");

fn Maybe(comptime T: type) type {
    return union(enum) {
        just: T,
        nothing: void,
    };
}

pub fn main() void {
    const a: Maybe(i32) = .{ .just = 42 };
    const b: Maybe(i32) = .nothing;
    switch (a) {
        .just => |v| std.debug.print("{d}\\n", .{v}),
        .nothing => std.debug.print("nothing\\n", .{}),
    }
    switch (b) {
        .just => |v| std.debug.print("{d}\\n", .{v}),
        .nothing => std.debug.print("nothing\\n", .{}),
    }
}`,
      solution: `const std = @import("std");

fn Maybe(comptime T: type) type {
    return union(enum) {
        just: T,
        nothing: void,
    };
}

pub fn main() void {
    const a: Maybe(i32) = .{ .just = 42 };
    const b: Maybe(i32) = .nothing;
    switch (a) {
        .just => |v| std.debug.print("{d}\\n", .{v}),
        .nothing => std.debug.print("nothing\\n", .{}),
    }
    switch (b) {
        .just => |v| std.debug.print("{d}\\n", .{v}),
        .nothing => std.debug.print("nothing\\n", .{}),
    }
}`,
      hints: [
        'comptime functions returning type are Zig generics.',
        'Maybe(i32) expands to a union with just: i32 and nothing: void.',
        'Output: 42 then nothing.',
      ],
      concepts: ['generic union', 'comptime type', 'Maybe type'],
    },
    {
      id: 'zig-union-14',
      title: 'Switch union with multiple void variants',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict output when multiple void variants exist in a union.',
      skeleton: `const std = @import("std");

const Status = union(enum) {
    ok: void,
    err: []const u8,
    pending: void,
};

pub fn main() void {
    const s = Status.pending;
    switch (s) {
        .ok      => std.debug.print("ok\\n", .{}),
        .err     => |msg| std.debug.print("err: {s}\\n", .{msg}),
        .pending => std.debug.print("pending\\n", .{}),
    }
}`,
      solution: `pending`,
      hints: [
        's is Status.pending.',
        'The .pending branch fires and prints "pending".',
        'void variants are initialized with TypeName.variant_name.',
      ],
      concepts: ['void variant', 'tagged union switch'],
    },
    {
      id: 'zig-union-15',
      title: 'Refactor if-chain to tagged union',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Refactor a bool-gated if-chain into a tagged union dispatch.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const is_int = true;
    const int_val: i32 = 5;
    const float_val: f32 = 0.0;
    if (is_int) {
        std.debug.print("int: {d}\\n", .{int_val});
    } else {
        std.debug.print("float: {d}\\n", .{float_val});
    }
}`,
      solution: `const std = @import("std");

const Val = union(enum) { int: i32, float: f32 };

pub fn main() void {
    const v = Val{ .int = 5 };
    switch (v) {
        .int   => |n| std.debug.print("int: {d}\\n", .{n}),
        .float => |f| std.debug.print("float: {d}\\n", .{f}),
    }
}`,
      hints: [
        'Replace the bool flag + two variables with one tagged union.',
        'The union carries the data and the tag together.',
        'Switch replaces the if-else chain.',
      ],
      concepts: ['refactor', 'tagged union', 'type safety'],
    },
    {
      id: 'zig-union-16',
      title: 'Union equality is not supported',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Fix comparing two unions using == which is not allowed.',
      skeleton: `const std = @import("std");

const V = union(enum) { n: i32, s: []const u8 };

pub fn main() void {
    const a = V{ .n = 1 };
    const b = V{ .n = 1 };
    if (a == b) { // bug: unions don't support ==
        std.debug.print("equal\\n", .{});
    }
}`,
      solution: `const std = @import("std");

const V = union(enum) { n: i32, s: []const u8 };

fn eql(a: V, b: V) bool {
    const ta = std.meta.activeTag(a);
    const tb = std.meta.activeTag(b);
    if (ta != tb) return false;
    return switch (a) {
        .n => |va| va == b.n,
        .s => |sa| std.mem.eql(u8, sa, b.s),
    };
}

pub fn main() void {
    const a = V{ .n = 1 };
    const b = V{ .n = 1 };
    if (eql(a, b)) {
        std.debug.print("equal\\n", .{});
    }
}`,
      hints: [
        'Tagged unions do not support == operator.',
        'Write an eql function that compares tags then payloads.',
        'Use std.meta.activeTag to get the enum tag.',
      ],
      concepts: ['union equality', 'manual comparison'],
    },
    {
      id: 'zig-union-17',
      title: 'Union in an array',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Store tagged union values in an array and iterate them.',
      skeleton: `const std = @import("std");

const Item = union(enum) { num: i32, flag: bool };

pub fn main() void {
    const items = [_]Item{
        _____, // num 1
        _____, // flag true
        _____, // num 3
    };
    for (items) |it| {
        switch (it) {
            .num  => |n| std.debug.print("{d}\\n", .{n}),
            .flag => |b| std.debug.print("{}\\n", .{b}),
        }
    }
}`,
      solution: `const std = @import("std");

const Item = union(enum) { num: i32, flag: bool };

pub fn main() void {
    const items = [_]Item{
        Item{ .num = 1 },
        Item{ .flag = true },
        Item{ .num = 3 },
    };
    for (items) |it| {
        switch (it) {
            .num  => |n| std.debug.print("{d}\\n", .{n}),
            .flag => |b| std.debug.print("{}\\n", .{b}),
        }
    }
}`,
      hints: [
        'Each array element is an Item union literal.',
        'Use Item{ .num = 1 }, Item{ .flag = true }, Item{ .num = 3 }.',
        'The for loop dispatches each one.',
      ],
      concepts: ['union array', 'heterogeneous collection'],
    },
    {
      id: 'zig-union-18',
      title: 'Payload mutation via pointer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Mutate the payload of a tagged union through a pointer capture.',
      skeleton: `const std = @import("std");

const Counter = union(enum) { active: u32, disabled: void };

pub fn main() void {
    var c = Counter{ .active = 0 };
    switch (c) {
        .active => |*n| n.* += 1,
        .disabled => {},
    }
    std.debug.print("{d}\\n", .{c.active});
}`,
      solution: `const std = @import("std");

const Counter = union(enum) { active: u32, disabled: void };

pub fn main() void {
    var c = Counter{ .active = 0 };
    switch (c) {
        .active => |*n| n.* += 1,
        .disabled => {},
    }
    std.debug.print("{d}\\n", .{c.active});
}`,
      hints: [
        'Use |*n| to capture a mutable pointer to the payload.',
        'n.* += 1 increments the payload in place.',
        'The output is 1.',
      ],
      concepts: ['mutable capture', 'payload mutation'],
    },
    {
      id: 'zig-union-19',
      title: 'Union tag check without capture',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict output when checking the tag without capturing payload.',
      skeleton: `const std = @import("std");

const V = union(enum) { a: i32, b: f32 };

pub fn main() void {
    const v = V{ .b = 1.5 };
    switch (v) {
        .a => std.debug.print("got a\\n", .{}),
        .b => std.debug.print("got b\\n", .{}),
    }
}`,
      solution: `got b`,
      hints: [
        'v is initialized as .b.',
        'The .b branch fires without capturing the payload.',
        'Output is "got b".',
      ],
      concepts: ['tag-only switch', 'tagged union'],
    },
    {
      id: 'zig-union-20',
      title: 'JSON-like value type',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a stringify function for a simple JSON-like value union.',
      skeleton: `const std = @import("std");

const Json = union(enum) {
    number: f64,
    string: []const u8,
    boolean: bool,
    null_val: void,
};

fn stringify(j: Json, writer: anytype) !void {
    switch (j) {
        .number  => |n| try writer.print("{d}", .{n}),
        .string  => |s| try writer.print("\\"{s}\\"", .{s}),
        .boolean => |b| try writer.print("{}", .{b}),
        .null_val => try writer.print("null", .{}),
    }
}

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    try stringify(.{ .number = 3.14 }, stdout);
    try stdout.print("\\n", .{});
    try stringify(.{ .string = "hi" }, stdout);
    try stdout.print("\\n", .{});
}`,
      solution: `const std = @import("std");

const Json = union(enum) {
    number: f64,
    string: []const u8,
    boolean: bool,
    null_val: void,
};

fn stringify(j: Json, writer: anytype) !void {
    switch (j) {
        .number  => |n| try writer.print("{d}", .{n}),
        .string  => |s| try writer.print("\\"{s}\\"", .{s}),
        .boolean => |b| try writer.print("{}", .{b}),
        .null_val => try writer.print("null", .{}),
    }
}

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    try stringify(.{ .number = 3.14 }, stdout);
    try stdout.print("\\n", .{});
    try stringify(.{ .string = "hi" }, stdout);
    try stdout.print("\\n", .{});
}`,
      hints: [
        'Each branch uses writer.print with the appropriate format.',
        'Strings are surrounded with escaped quote characters.',
        'This is already correct; understand the anytype writer pattern.',
      ],
      concepts: ['tagged union dispatch', 'anytype writer', 'JSON pattern'],
    },
  ],
};
