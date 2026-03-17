import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-anytype',
  title: '38. Anytype & Generics',
  language: 'zig',
  explanation: `Zig generics are implemented through \`comptime\` parameters and \`anytype\`.

**anytype parameter:** The compiler infers the concrete type at each call site:
\`\`\`zig
fn print(val: anytype) void {
    std.debug.print("{}\\n", .{val});
}
\`\`\`

**Comptime type parameter:**
\`\`\`zig
fn makeSlice(comptime T: type, len: usize) []T {
    // T is the element type
}
\`\`\`

**@TypeOf** to get the type of an anytype parameter:
\`\`\`zig
fn isSlice(val: anytype) bool {
    return switch (@typeInfo(@TypeOf(val))) {
        .Pointer => |p| p.size == .Slice,
        else => false,
    };
}
\`\`\`

**Generic data structure:** Return a type from a comptime function:
\`\`\`zig
fn Stack(comptime T: type) type {
    return struct {
        items: std.ArrayList(T),
        // ...
    };
}
const IntStack = Stack(i32);
\`\`\`

**Duck typing:** anytype accepts anything with the right methods - no interface declaration needed.`,
  exercises: [
    {
      id: 'zig-anytype-1',
      title: 'anytype parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Write a function that accepts any type and prints it.',
      skeleton: `const std = @import("std");

fn printAny(val: _____) void {
    std.debug.print("{}\\n", .{val});
}

pub fn main() void {
    printAny(42);
    printAny(true);
}`,
      solution: `const std = @import("std");

fn printAny(val: anytype) void {
    std.debug.print("{}\\n", .{val});
}

pub fn main() void {
    printAny(42);
    printAny(true);
}`,
      hints: [
        'anytype accepts any type at the call site.',
        'The compiler generates a specialized version for each type.',
        'Output: 42 then true.',
      ],
      concepts: ['anytype', 'generic parameter'],
    },
    {
      id: 'zig-anytype-2',
      title: '@TypeOf anytype parameter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Use @TypeOf to get the type name of an anytype parameter.',
      skeleton: `const std = @import("std");

fn typeName(val: anytype) []const u8 {
    return @typeName(@TypeOf(val));
}

pub fn main() void {
    std.debug.print("{s}\\n", .{typeName(@as(u32, 5))});
}`,
      solution: `const std = @import("std");

fn typeName(val: anytype) []const u8 {
    return @typeName(@TypeOf(val));
}

pub fn main() void {
    std.debug.print("{s}\\n", .{typeName(@as(u32, 5))});
}`,
      hints: [
        '@TypeOf(val) gets the type of val inside the function.',
        '@typeName converts the type to a string.',
        'Output: u32.',
      ],
      concepts: ['@TypeOf', '@typeName', 'anytype introspection'],
    },
    {
      id: 'zig-anytype-3',
      title: 'comptime T type parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Write a generic function that allocates a slice of any type.',
      skeleton: `const std = @import("std");

fn alloc(comptime T: type, allocator: std.mem.Allocator, n: usize) ![]T {
    return allocator.alloc(_____, n);
}

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const s = try alloc(u8, gpa.allocator(), 4);
    defer gpa.allocator().free(s);
    std.debug.print("{d}\\n", .{s.len});
}`,
      solution: `const std = @import("std");

fn alloc(comptime T: type, allocator: std.mem.Allocator, n: usize) ![]T {
    return allocator.alloc(T, n);
}

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const s = try alloc(u8, gpa.allocator(), 4);
    defer gpa.allocator().free(s);
    std.debug.print("{d}\\n", .{s.len});
}`,
      hints: [
        'comptime T: type lets you pass a type as a parameter.',
        'Use T inside the function body.',
        'Output: 4.',
      ],
      concepts: ['comptime type parameter', 'generic alloc'],
    },
    {
      id: 'zig-anytype-4',
      title: 'Generic Stack type',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Create a generic Stack type using a comptime function.',
      skeleton: `const std = @import("std");

fn Stack(comptime T: type) type {
    return struct {
        items: [16]T = undefined,
        top: usize = 0,

        fn push(self: *@This(), val: T) void {
            self.items[self.top] = val;
            self.top += 1;
        }

        fn pop(self: *@This()) ?T {
            if (self.top == 0) return null;
            self.top -= 1;
            return self.items[self.top];
        }
    };
}

pub fn main() void {
    var s = Stack(i32){};
    s.push(1);
    s.push(2);
    std.debug.print("{?} {?}\\n", .{ s.pop(), s.pop() });
}`,
      solution: `const std = @import("std");

fn Stack(comptime T: type) type {
    return struct {
        items: [16]T = undefined,
        top: usize = 0,

        fn push(self: *@This(), val: T) void {
            self.items[self.top] = val;
            self.top += 1;
        }

        fn pop(self: *@This()) ?T {
            if (self.top == 0) return null;
            self.top -= 1;
            return self.items[self.top];
        }
    };
}

pub fn main() void {
    var s = Stack(i32){};
    s.push(1);
    s.push(2);
    std.debug.print("{?} {?}\\n", .{ s.pop(), s.pop() });
}`,
      hints: [
        'Stack(i32) is a comptime-instantiated type.',
        '@This() refers to the anonymous struct.',
        'Output: 2 1 (LIFO order).',
      ],
      concepts: ['generic type', 'comptime function returning type', '@This'],
    },
    {
      id: 'zig-anytype-5',
      title: 'Duck typing with anytype',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a function that works with any type having a .len field.',
      skeleton: `const std = @import("std");

fn printLen(val: anytype) void {
    std.debug.print("{d}\\n", .{val.len});
}

pub fn main() void {
    printLen("hello");
    printLen([_]u8{ 1, 2, 3 });
}`,
      solution: `const std = @import("std");

fn printLen(val: anytype) void {
    std.debug.print("{d}\\n", .{val.len});
}

pub fn main() void {
    printLen("hello");
    printLen([_]u8{ 1, 2, 3 });
}`,
      hints: [
        'anytype accepts both strings and arrays since both have .len.',
        'Zig uses structural typing: if it has .len, it works.',
        'Output: 5 then 3.',
      ],
      concepts: ['duck typing', 'structural typing', '.len'],
    },
    {
      id: 'zig-anytype-6',
      title: 'Type dispatch with @typeInfo',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use @typeInfo to dispatch on the kind of anytype parameter.',
      skeleton: `const std = @import("std");

fn describe(val: anytype) void {
    switch (@typeInfo(@TypeOf(val))) {
        .Int   => std.debug.print("int\\n", .{}),
        .Float => std.debug.print("float\\n", .{}),
        .Bool  => std.debug.print("bool\\n", .{}),
        else   => std.debug.print("other\\n", .{}),
    }
}

pub fn main() void {
    describe(@as(i32, 1));
    describe(@as(f64, 1.0));
    describe(true);
}`,
      solution: `const std = @import("std");

fn describe(val: anytype) void {
    switch (@typeInfo(@TypeOf(val))) {
        .Int   => std.debug.print("int\\n", .{}),
        .Float => std.debug.print("float\\n", .{}),
        .Bool  => std.debug.print("bool\\n", .{}),
        else   => std.debug.print("other\\n", .{}),
    }
}

pub fn main() void {
    describe(@as(i32, 1));
    describe(@as(f64, 1.0));
    describe(true);
}`,
      hints: [
        '@typeInfo returns a tagged union of type descriptors.',
        'Switch on it to handle different kinds.',
        'Output: int, float, bool.',
      ],
      concepts: ['@typeInfo dispatch', 'comptime switch'],
    },
    {
      id: 'zig-anytype-7',
      title: 'Generic min function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a generic min function using anytype.',
      skeleton: `const std = @import("std");

fn min(a: anytype, b: anytype) @TypeOf(a) {
    return if (a < b) a else b;
}

pub fn main() void {
    std.debug.print("{d}\\n", .{min(@as(i32, 3), @as(i32, 7))});
    std.debug.print("{d}\\n", .{min(@as(f32, 1.5), @as(f32, 0.5))});
}`,
      solution: `const std = @import("std");

fn min(a: anytype, b: anytype) @TypeOf(a) {
    return if (a < b) a else b;
}

pub fn main() void {
    std.debug.print("{d}\\n", .{min(@as(i32, 3), @as(i32, 7))});
    std.debug.print("{d}\\n", .{min(@as(f32, 1.5), @as(f32, 0.5))});
}`,
      hints: [
        '@TypeOf(a) is the return type, inferred at comptime.',
        'Works for any comparable type.',
        'Output: 3 then 0.5.',
      ],
      concepts: ['generic min', '@TypeOf return', 'anytype comparison'],
    },
    {
      id: 'zig-anytype-8',
      title: 'Constrain anytype with comptime assert',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Constrain anytype using a comptime assertion.',
      skeleton: `const std = @import("std");

fn mustBeInt(val: anytype) void {
    comptime {
        const info = @typeInfo(@TypeOf(val));
        if (info != .Int) @compileError("expected Int type");
    }
    std.debug.print("{d}\\n", .{val});
}

pub fn main() void {
    mustBeInt(@as(i32, 5));
    // mustBeInt(true); // would fail to compile
}`,
      solution: `const std = @import("std");

fn mustBeInt(val: anytype) void {
    comptime {
        const info = @typeInfo(@TypeOf(val));
        if (info != .Int) @compileError("expected Int type");
    }
    std.debug.print("{d}\\n", .{val});
}

pub fn main() void {
    mustBeInt(@as(i32, 5));
}`,
      hints: [
        '@compileError produces a compile-time error message.',
        'comptime block runs at compile time.',
        'Output: 5.',
      ],
      concepts: ['@compileError', 'comptime constraint', 'type assertion'],
    },
    {
      id: 'zig-anytype-9',
      title: 'Generic Pair type',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Create a generic Pair type with two different element types.',
      skeleton: `const std = @import("std");

fn Pair(comptime A: type, comptime B: type) type {
    return struct { first: A, second: B };
}

pub fn main() void {
    const p = Pair(i32, []const u8){ .first = 1, .second = "hi" };
    std.debug.print("{d} {s}\\n", .{ p.first, p.second });
}`,
      solution: `const std = @import("std");

fn Pair(comptime A: type, comptime B: type) type {
    return struct { first: A, second: B };
}

pub fn main() void {
    const p = Pair(i32, []const u8){ .first = 1, .second = "hi" };
    std.debug.print("{d} {s}\\n", .{ p.first, p.second });
}`,
      hints: [
        'Pass two type parameters to the comptime function.',
        'Pair(i32, []const u8) is a concrete type.',
        'Output: 1 hi.',
      ],
      concepts: ['two type parameters', 'generic Pair'],
    },
    {
      id: 'zig-anytype-10',
      title: 'anytype writer pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Accept any writer using anytype for testability.',
      skeleton: `const std = @import("std");

fn writeGreeting(writer: anytype, name: []const u8) !void {
    try writer.print("Hello, {s}!\\n", .{name});
}

pub fn main() !void {
    try writeGreeting(std.io.getStdOut().writer(), "World");

    // Test with in-memory writer
    var buf: [64]u8 = undefined;
    var fbs = std.io.fixedBufferStream(&buf);
    try writeGreeting(fbs.writer(), "Test");
    std.debug.print("{s}", .{fbs.getWritten()});
}`,
      solution: `const std = @import("std");

fn writeGreeting(writer: anytype, name: []const u8) !void {
    try writer.print("Hello, {s}!\\n", .{name});
}

pub fn main() !void {
    try writeGreeting(std.io.getStdOut().writer(), "World");

    var buf: [64]u8 = undefined;
    var fbs = std.io.fixedBufferStream(&buf);
    try writeGreeting(fbs.writer(), "Test");
    std.debug.print("{s}", .{fbs.getWritten()});
}`,
      hints: [
        'anytype writer accepts any type with a print method.',
        'The same function works with stdout or in-memory buffers.',
        'Output: Hello, World! then Hello, Test!',
      ],
      concepts: ['anytype writer', 'testable I/O', 'duck typing'],
    },
    {
      id: 'zig-anytype-11',
      title: 'Generic swap',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a generic swap function using anytype pointers.',
      skeleton: `const std = @import("std");

fn swap(a: anytype, b: anytype) void {
    const tmp = a.*;
    a.* = b.*;
    b.* = tmp;
}

pub fn main() void {
    var x: i32 = 1;
    var y: i32 = 2;
    swap(&x, &y);
    std.debug.print("{d} {d}\\n", .{ x, y });
}`,
      solution: `const std = @import("std");

fn swap(a: anytype, b: anytype) void {
    const tmp = a.*;
    a.* = b.*;
    b.* = tmp;
}

pub fn main() void {
    var x: i32 = 1;
    var y: i32 = 2;
    swap(&x, &y);
    std.debug.print("{d} {d}\\n", .{ x, y });
}`,
      hints: [
        'anytype accepts *i32, *f64, *anything.',
        'tmp = a.* saves the value before overwriting.',
        'Output: 2 1.',
      ],
      concepts: ['generic swap', 'anytype pointer'],
    },
    {
      id: 'zig-anytype-12',
      title: 'Comptime if for type branching',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use comptime if to specialize a function based on type.',
      skeleton: `const std = @import("std");

fn toFloat(val: anytype) f64 {
    const T = @TypeOf(val);
    if (@typeInfo(T) == .Int) {
        return @floatFromInt(val);
    } else {
        return @floatCast(val);
    }
}

pub fn main() void {
    std.debug.print("{d}\\n", .{toFloat(@as(i32, 5))});
    std.debug.print("{d}\\n", .{toFloat(@as(f32, 3.14))});
}`,
      solution: `const std = @import("std");

fn toFloat(val: anytype) f64 {
    const T = @TypeOf(val);
    if (@typeInfo(T) == .Int) {
        return @floatFromInt(val);
    } else {
        return @floatCast(val);
    }
}

pub fn main() void {
    std.debug.print("{d}\\n", .{toFloat(@as(i32, 5))});
    std.debug.print("{d}\\n", .{toFloat(@as(f32, 3.14))});
}`,
      hints: [
        '@floatFromInt converts integer to float.',
        '@floatCast converts between float sizes.',
        'Output: 5 then 3.14.',
      ],
      concepts: ['comptime if', '@floatFromInt', '@floatCast'],
    },
    {
      id: 'zig-anytype-13',
      title: 'Generic Result type',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Create a generic Result type holding either a value or an error string.',
      skeleton: `const std = @import("std");

fn Result(comptime T: type) type {
    return union(enum) {
        ok: T,
        err: []const u8,
    };
}

pub fn main() void {
    const a: Result(i32) = .{ .ok = 42 };
    const b: Result(i32) = .{ .err = "oops" };
    switch (a) {
        .ok  => |v| std.debug.print("{d}\\n", .{v}),
        .err => |e| std.debug.print("{s}\\n", .{e}),
    }
    switch (b) {
        .ok  => |v| std.debug.print("{d}\\n", .{v}),
        .err => |e| std.debug.print("{s}\\n", .{e}),
    }
}`,
      solution: `const std = @import("std");

fn Result(comptime T: type) type {
    return union(enum) {
        ok: T,
        err: []const u8,
    };
}

pub fn main() void {
    const a: Result(i32) = .{ .ok = 42 };
    const b: Result(i32) = .{ .err = "oops" };
    switch (a) {
        .ok  => |v| std.debug.print("{d}\\n", .{v}),
        .err => |e| std.debug.print("{s}\\n", .{e}),
    }
    switch (b) {
        .ok  => |v| std.debug.print("{d}\\n", .{v}),
        .err => |e| std.debug.print("{s}\\n", .{e}),
    }
}`,
      hints: [
        'Result(i32) is a tagged union instantiated at comptime.',
        'a holds ok=42; b holds err="oops".',
        'Output: 42 then oops.',
      ],
      concepts: ['generic union', 'Result type', 'comptime instantiation'],
    },
    {
      id: 'zig-anytype-14',
      title: 'Specialize for signed vs unsigned',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a function that behaves differently for signed vs unsigned integers.',
      skeleton: `const std = @import("std");

fn absVal(val: anytype) @TypeOf(val) {
    const T = @TypeOf(val);
    const info = @typeInfo(T).Int;
    if (info.signedness == .signed) {
        return if (val < 0) -val else val;
    } else {
        return val; // unsigned is always non-negative
    }
}

pub fn main() void {
    std.debug.print("{d}\\n", .{absVal(@as(i32, -5))});
    std.debug.print("{d}\\n", .{absVal(@as(u32, 5))});
}`,
      solution: `const std = @import("std");

fn absVal(val: anytype) @TypeOf(val) {
    const T = @TypeOf(val);
    const info = @typeInfo(T).Int;
    if (info.signedness == .signed) {
        return if (val < 0) -val else val;
    } else {
        return val;
    }
}

pub fn main() void {
    std.debug.print("{d}\\n", .{absVal(@as(i32, -5))});
    std.debug.print("{d}\\n", .{absVal(@as(u32, 5))});
}`,
      hints: [
        'info.signedness is .signed or .unsigned.',
        'Signed: negate if negative. Unsigned: already non-negative.',
        'Output: 5 then 5.',
      ],
      concepts: ['signedness check', 'generic abs', 'comptime branch'],
    },
    {
      id: 'zig-anytype-15',
      title: 'comptime function memoization',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use a comptime map to memoize type-based computations.',
      skeleton: `const std = @import("std");

fn TypeSize(comptime T: type) comptime_int {
    return @sizeOf(T);
}

pub fn main() void {
    comptime {
        const a = TypeSize(u32);
        const b = TypeSize(u64);
        if (a != 4 or b != 8) @compileError("unexpected sizes");
    }
    std.debug.print("sizes ok\\n", .{});
}`,
      solution: `const std = @import("std");

fn TypeSize(comptime T: type) comptime_int {
    return @sizeOf(T);
}

pub fn main() void {
    comptime {
        const a = TypeSize(u32);
        const b = TypeSize(u64);
        if (a != 4 or b != 8) @compileError("unexpected sizes");
    }
    std.debug.print("sizes ok\\n", .{});
}`,
      hints: [
        'comptime functions are automatically memoized by the compiler.',
        'Same inputs always produce same outputs.',
        'Output: sizes ok.',
      ],
      concepts: ['comptime memoization', 'comptime_int', '@sizeOf'],
    },
    {
      id: 'zig-anytype-16',
      title: 'Generic ArrayList wrapper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Wrap std.ArrayList in a generic type with push/pop.',
      skeleton: `const std = @import("std");

fn Vec(comptime T: type) type {
    return struct {
        inner: std.ArrayList(T),

        fn init(alloc: std.mem.Allocator) @This() {
            return .{ .inner = std.ArrayList(T).init(alloc) };
        }
        fn deinit(self: *@This()) void { self.inner.deinit(); }
        fn push(self: *@This(), val: T) !void { try self.inner.append(val); }
        fn pop(self: *@This()) ?T {
            if (self.inner.items.len == 0) return null;
            return self.inner.pop();
        }
    };
}

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var v = Vec(i32).init(gpa.allocator());
    defer v.deinit();
    try v.push(10);
    try v.push(20);
    std.debug.print("{?} {?}\\n", .{ v.pop(), v.pop() });
}`,
      solution: `const std = @import("std");

fn Vec(comptime T: type) type {
    return struct {
        inner: std.ArrayList(T),

        fn init(alloc: std.mem.Allocator) @This() {
            return .{ .inner = std.ArrayList(T).init(alloc) };
        }
        fn deinit(self: *@This()) void { self.inner.deinit(); }
        fn push(self: *@This(), val: T) !void { try self.inner.append(val); }
        fn pop(self: *@This()) ?T {
            if (self.inner.items.len == 0) return null;
            return self.inner.pop();
        }
    };
}

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var v = Vec(i32).init(gpa.allocator());
    defer v.deinit();
    try v.push(10);
    try v.push(20);
    std.debug.print("{?} {?}\\n", .{ v.pop(), v.pop() });
}`,
      hints: [
        'Vec(i32) is a concrete type built at comptime.',
        'pop returns the last element (LIFO).',
        'Output: 20 10.',
      ],
      concepts: ['generic wrapper', 'ArrayList', 'comptime type building'],
    },
    {
      id: 'zig-anytype-17',
      title: 'Comptime interface check',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Assert that a type implements required declarations.',
      skeleton: `const std = @import("std");

fn assertHasInit(comptime T: type) void {
    if (!@hasDecl(T, "init")) {
        @compileError(@typeName(T) ++ " must have init()");
    }
}

const Good = struct { pub fn init() Good { return .{}; } };

pub fn main() void {
    assertHasInit(Good);
    std.debug.print("ok\\n", .{});
}`,
      solution: `const std = @import("std");

fn assertHasInit(comptime T: type) void {
    if (!@hasDecl(T, "init")) {
        @compileError(@typeName(T) ++ " must have init()");
    }
}

const Good = struct { pub fn init() Good { return .{}; } };

pub fn main() void {
    assertHasInit(Good);
    std.debug.print("ok\\n", .{});
}`,
      hints: [
        '@hasDecl checks for a named pub declaration.',
        '@compileError with a message string fails at compile time.',
        'Output: ok.',
      ],
      concepts: ['@hasDecl', '@compileError', 'interface assertion'],
    },
    {
      id: 'zig-anytype-18',
      title: 'anytype in a struct method',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use anytype in a struct method to accept any writer.',
      skeleton: `const std = @import("std");

const Point = struct {
    x: f32,
    y: f32,

    fn writeTo(self: Point, writer: anytype) !void {
        try writer.print("({d}, {d})", .{ self.x, self.y });
    }
};

pub fn main() !void {
    const p = Point{ .x = 1.5, .y = 2.5 };
    try p.writeTo(std.io.getStdOut().writer());
    try std.io.getStdOut().writer().print("\\n", .{});
}`,
      solution: `const std = @import("std");

const Point = struct {
    x: f32,
    y: f32,

    fn writeTo(self: Point, writer: anytype) !void {
        try writer.print("({d}, {d})", .{ self.x, self.y });
    }
};

pub fn main() !void {
    const p = Point{ .x = 1.5, .y = 2.5 };
    try p.writeTo(std.io.getStdOut().writer());
    try std.io.getStdOut().writer().print("\\n", .{});
}`,
      hints: [
        'anytype writer works in struct methods too.',
        'The compiler specializes the method for each writer type.',
        'Output: (1.5, 2.5).',
      ],
      concepts: ['anytype method', 'generic serialize'],
    },
    {
      id: 'zig-anytype-19',
      title: 'comptime value parameters',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Pass a comptime integer to size an array in a generic function.',
      skeleton: `const std = @import("std");

fn zeroed(comptime N: usize) [N]u8 {
    return [_]u8{0} ** N;
}

pub fn main() void {
    const buf = zeroed(8);
    std.debug.print("{d}\\n", .{buf.len});
}`,
      solution: `const std = @import("std");

fn zeroed(comptime N: usize) [N]u8 {
    return [_]u8{0} ** N;
}

pub fn main() void {
    const buf = zeroed(8);
    std.debug.print("{d}\\n", .{buf.len});
}`,
      hints: [
        'comptime N: usize allows N to be used in the return type [N]u8.',
        '[_]u8{0} ** N creates an N-element array of zeros.',
        'Output: 8.',
      ],
      concepts: ['comptime value parameter', 'sized array', '** repeat'],
    },
    {
      id: 'zig-anytype-20',
      title: 'Generic map function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a generic map function that transforms a slice.',
      skeleton: `const std = @import("std");

fn map(
    comptime T: type,
    comptime U: type,
    input: []const T,
    output: []U,
    f: *const fn (T) U,
) void {
    for (input, 0..) |val, i| {
        output[i] = f(val);
    }
}

fn double(n: i32) i32 { return n * 2; }

pub fn main() void {
    const input = [_]i32{ 1, 2, 3 };
    var output: [3]i32 = undefined;
    map(i32, i32, &input, &output, double);
    for (output) |v| std.debug.print("{d} ", .{v});
    std.debug.print("\\n", .{});
}`,
      solution: `const std = @import("std");

fn map(
    comptime T: type,
    comptime U: type,
    input: []const T,
    output: []U,
    f: *const fn (T) U,
) void {
    for (input, 0..) |val, i| {
        output[i] = f(val);
    }
}

fn double(n: i32) i32 { return n * 2; }

pub fn main() void {
    const input = [_]i32{ 1, 2, 3 };
    var output: [3]i32 = undefined;
    map(i32, i32, &input, &output, double);
    for (output) |v| std.debug.print("{d} ", .{v});
    std.debug.print("\\n", .{});
}`,
      hints: [
        'Two comptime type parameters: input type T and output type U.',
        'f is a function pointer taking T and returning U.',
        'Output: 2 4 6.',
      ],
      concepts: ['generic map', 'function pointer parameter', 'higher-order function'],
    },
  ],
};
