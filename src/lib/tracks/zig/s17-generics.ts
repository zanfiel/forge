import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-generics',
  title: '17. Generics',
  explanation: `## Generics

Zig achieves generics through \`comptime\` parameters and \`anytype\`. There are no special generic syntax or trait systems -- just compile-time evaluation.

### anytype Parameters
\`\`\`zig
fn add(a: anytype, b: @TypeOf(a)) @TypeOf(a) {
    return a + b;
}
\`\`\`

### Comptime Type Parameters
\`\`\`zig
fn Stack(comptime T: type) type {
    return struct {
        items: []T,
        count: usize,
    };
}
const IntStack = Stack(u32);
\`\`\`

### Type Constraints at Comptime
\`\`\`zig
fn sortable(comptime T: type) void {
    if (!@hasDecl(T, "lessThan"))
        @compileError("T must have a lessThan declaration");
}
\`\`\`

### @hasField and @hasDecl
\`\`\`zig
if (@hasField(MyStruct, "name")) { ... }
if (@hasDecl(MyType, "init")) { ... }
\`\`\`

Zig's approach to generics is simple and transparent: types are first-class comptime values, and generic code is just regular code evaluated at compile time.`,
  exercises: [
    {
      id: 'zig-generics-1',
      title: 'anytype Parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Write a function using anytype for a generic parameter.',
      skeleton: `fn square(x: ___) @TypeOf(x) {
    return x * x;
}

test "generic square" {
    const std = @import("std");
    try std.testing.expect(square(@as(u32, 5)) == 25);
    try std.testing.expect(square(@as(f32, 3.0)) == 9.0);
}`,
      solution: `fn square(x: anytype) @TypeOf(x) {
    return x * x;
}

test "generic square" {
    const std = @import("std");
    try std.testing.expect(square(@as(u32, 5)) == 25);
    try std.testing.expect(square(@as(f32, 3.0)) == 9.0);
}`,
      hints: [
        'anytype accepts any type for the parameter.',
        '@TypeOf(x) returns the actual type of x for the return.',
        'The function works for any type that supports multiplication.',
      ],
      concepts: ['anytype', '@TypeOf', 'generic-function'],
    },
    {
      id: 'zig-generics-2',
      title: 'Comptime Type Parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Create a generic struct using a comptime type parameter.',
      skeleton: `fn Pair(___ T: type) type {
    return struct {
        first: T,
        second: T,
    };
}

test "generic pair" {
    const std = @import("std");
    const p = Pair(u32){ .first = 10, .second = 20 };
    try std.testing.expect(p.first + p.second == 30);
}`,
      solution: `fn Pair(comptime T: type) type {
    return struct {
        first: T,
        second: T,
    };
}

test "generic pair" {
    const std = @import("std");
    const p = Pair(u32){ .first = 10, .second = 20 };
    try std.testing.expect(p.first + p.second == 30);
}`,
      hints: [
        'comptime T: type makes T a compile-time type parameter.',
        'The function returns a new type specialized for T.',
        'Pair(u32) creates a struct with two u32 fields.',
      ],
      concepts: ['comptime-type-param', 'type-constructor'],
    },
    {
      id: 'zig-generics-3',
      title: 'Generic Function with Constraint',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Add a comptime constraint to a generic function.',
      skeleton: `fn clamp(comptime T: type, val: T, lo: T, hi: T) T {
    const info = @typeInfo(T);
    if (info != .Int and info != .Float)
        ___(\"clamp requires numeric type\");
    if (val < lo) return lo;
    if (val > hi) return hi;
    return val;
}`,
      solution: `fn clamp(comptime T: type, val: T, lo: T, hi: T) T {
    const info = @typeInfo(T);
    if (info != .Int and info != .Float)
        @compileError("clamp requires numeric type");
    if (val < lo) return lo;
    if (val > hi) return hi;
    return val;
}`,
      hints: [
        '@compileError produces a compile-time error with a message.',
        'This acts as a type constraint -- only numeric types are accepted.',
        'The check runs at compile time, preventing misuse.',
      ],
      concepts: ['@compileError', 'type-constraint', 'comptime-check'],
    },
    {
      id: 'zig-generics-4',
      title: '@hasDecl Check',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use @hasDecl to check if a type has a specific declaration.',
      skeleton: `fn callInit(comptime T: type) T {
    if (___) {
        return T.init();
    } else {
        return std.mem.zeroes(T);
    }
}`,
      solution: `fn callInit(comptime T: type) T {
    if (@hasDecl(T, "init")) {
        return T.init();
    } else {
        return std.mem.zeroes(T);
    }
}`,
      hints: [
        '@hasDecl(T, "init") checks if T has a declaration named "init".',
        'If init exists, call it; otherwise fall back to zeroes.',
        'This is Zig\'s way of doing compile-time duck typing.',
      ],
      concepts: ['@hasDecl', 'duck-typing', 'comptime-check'],
    },
    {
      id: 'zig-generics-5',
      title: '@hasField Check',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use @hasField to conditionally access struct fields.',
      skeleton: `fn getName(obj: anytype) []const u8 {
    const T = @TypeOf(obj);
    if (___) {
        return obj.name;
    } else {
        return "unnamed";
    }
}`,
      solution: `fn getName(obj: anytype) []const u8 {
    const T = @TypeOf(obj);
    if (@hasField(T, "name")) {
        return obj.name;
    } else {
        return "unnamed";
    }
}`,
      hints: [
        '@hasField(T, "name") checks if the struct T has a field called name.',
        'This is evaluated at compile time.',
        'If the field exists, we can safely access obj.name.',
      ],
      concepts: ['@hasField', 'conditional-access', 'comptime'],
    },
    {
      id: 'zig-generics-6',
      title: 'Generic Return Type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a function returning a generic optional type.',
      skeleton: `fn findFirst(comptime T: type, items: []const T, predicate: fn(T) bool) ___T {
    for (items) |item| {
        if (predicate(item)) return item;
    }
    return null;
}`,
      solution: `fn findFirst(comptime T: type, items: []const T, predicate: fn(T) bool) ?T {
    for (items) |item| {
        if (predicate(item)) return item;
    }
    return null;
}`,
      hints: [
        '?T is an optional T -- it can be a value or null.',
        'Return null when no item matches the predicate.',
        'This is a generic version of a find function.',
      ],
      concepts: ['optional', 'generic-return', 'predicate'],
    },
    {
      id: 'zig-generics-7',
      title: 'Write: Generic Stack',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a generic stack data structure using comptime type parameter.',
      skeleton: `// Write a function Stack(comptime T: type) type that returns a struct with:
// - items: [64]T (fixed-size backing array)
// - count: usize (number of items)
// - pub fn init() Self - returns empty stack
// - pub fn push(self: *Self, item: T) void
// - pub fn pop(self: *Self) ?T
// - pub fn peek(self: Self) ?T`,
      solution: `fn Stack(comptime T: type) type {
    return struct {
        const Self = @This();
        items: [64]T = undefined,
        count: usize = 0,

        pub fn init() Self {
            return Self{ .items = undefined, .count = 0 };
        }

        pub fn push(self: *Self, item: T) void {
            if (self.count < 64) {
                self.items[self.count] = item;
                self.count += 1;
            }
        }

        pub fn pop(self: *Self) ?T {
            if (self.count == 0) return null;
            self.count -= 1;
            return self.items[self.count];
        }

        pub fn peek(self: Self) ?T {
            if (self.count == 0) return null;
            return self.items[self.count - 1];
        }
    };
}`,
      hints: [
        'Stack(T) returns a struct type parameterized by T.',
        'Use @This() to get a Self reference inside the returned struct.',
        'pop returns ?T (optional) since the stack might be empty.',
      ],
      concepts: ['generic-struct', 'type-constructor', '@This'],
    },
    {
      id: 'zig-generics-8',
      title: 'Write: Generic Map Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a generic map function that transforms a slice.',
      skeleton: `// Write a function map that:
// 1. Takes comptime T: type, comptime U: type
// 2. Takes items: []const T and func: fn(T) U
// 3. Takes a buffer: []U to store results
// 4. Transforms each element and stores in buffer
// 5. Returns []U (the filled portion of the buffer)`,
      solution: `fn map(comptime T: type, comptime U: type, items: []const T, func: *const fn (T) U, buffer: []U) []U {
    const len = @min(items.len, buffer.len);
    for (items[0..len], buffer[0..len]) |item, *out| {
        out.* = func(item);
    }
    return buffer[0..len];
}

test "generic map" {
    const std = @import("std");
    const doubleU32 = struct {
        fn f(x: u32) u32 {
            return x * 2;
        }
    }.f;
    const input = [_]u32{ 1, 2, 3 };
    var output: [3]u32 = undefined;
    const result = map(u32, u32, &input, doubleU32, &output);
    try std.testing.expect(result[0] == 2);
    try std.testing.expect(result[2] == 6);
}`,
      hints: [
        'The function takes two type parameters: input T and output U.',
        'Use a pre-allocated buffer to avoid allocation.',
        'Return a slice of the buffer limited to the actual items transformed.',
      ],
      concepts: ['generic-function', 'higher-order', 'buffer-pattern'],
    },
    {
      id: 'zig-generics-9',
      title: 'Write: Generic Container with Iterator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a generic ring buffer with an iterator.',
      skeleton: `// Write RingBuffer(comptime T: type, comptime capacity: usize) type:
// - buf: [capacity]T
// - head: usize, tail: usize, len: usize
// - pub fn init() Self
// - pub fn push(self: *Self, item: T) !void (error.Full if full)
// - pub fn pop(self: *Self) ?T
// - pub fn iterator(self: *const Self) Iterator
// - Iterator: struct with next() ?T`,
      solution: `fn RingBuffer(comptime T: type, comptime capacity: usize) type {
    return struct {
        const Self = @This();
        buf: [capacity]T = undefined,
        head: usize = 0,
        tail: usize = 0,
        len: usize = 0,

        pub const Iterator = struct {
            ring: *const Self,
            idx: usize = 0,

            pub fn next(self: *Iterator) ?T {
                if (self.idx >= self.ring.len) return null;
                const pos = (self.ring.head + self.idx) % capacity;
                self.idx += 1;
                return self.ring.buf[pos];
            }
        };

        pub fn init() Self {
            return .{};
        }

        pub fn push(self: *Self, item: T) !void {
            if (self.len >= capacity) return error.Full;
            self.buf[self.tail] = item;
            self.tail = (self.tail + 1) % capacity;
            self.len += 1;
        }

        pub fn pop(self: *Self) ?T {
            if (self.len == 0) return null;
            const item = self.buf[self.head];
            self.head = (self.head + 1) % capacity;
            self.len -= 1;
            return item;
        }

        pub fn iterator(self: *const Self) Iterator {
            return Iterator{ .ring = self };
        }
    };
}`,
      hints: [
        'The ring buffer wraps around using modulo arithmetic.',
        'The Iterator holds a reference to the ring and tracks position.',
        'push returns an error union so it can signal when full.',
      ],
      concepts: ['generic-container', 'iterator-pattern', 'ring-buffer'],
    },
    {
      id: 'zig-generics-10',
      title: 'Write: Specialization Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a generic function that specializes behavior based on type properties.',
      skeleton: `// Write a function serialize that:
// 1. Takes comptime T: type and a value: T
// 2. If T is an integer, converts to decimal string representation
// 3. If T is a bool, returns "true" or "false"
// 4. If T is a struct with a pub fn toString, calls it
// 5. Otherwise, @compileError
// Use @typeInfo and @hasDecl for dispatch.`,
      solution: `const std = @import("std");

fn serialize(comptime T: type, value: T) []const u8 {
    if (@typeInfo(T) == .Int or @typeInfo(T) == .ComptimeInt) {
        var buf: [20]u8 = undefined;
        const result = std.fmt.bufPrint(&buf, "{}", .{value}) catch "?";
        return result;
    } else if (@typeInfo(T) == .Bool) {
        return if (value) "true" else "false";
    } else if (@typeInfo(T) == .Struct) {
        if (@hasDecl(T, "toString")) {
            return value.toString();
        } else {
            @compileError("struct must have toString");
        }
    } else {
        @compileError("unsupported type for serialize");
    }
}

test "specialization" {
    try std.testing.expectEqualStrings("false", serialize(bool, false));
    try std.testing.expectEqualStrings("true", serialize(bool, true));
}`,
      hints: [
        'Use @typeInfo to check the type category.',
        '@hasDecl checks for the toString method on structs.',
        'Each branch is specialized for that type at compile time.',
      ],
      concepts: ['specialization', '@typeInfo', '@hasDecl'],
    },
    {
      id: 'zig-generics-11',
      title: 'Write: Generic Comparator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a generic comparison function that works with multiple types.',
      skeleton: `// Write a function lessThan that:
// 1. Takes two anytype parameters a and b (same type)
// 2. For integers and floats, uses < operator
// 3. For slices of u8 (strings), uses std.mem.order
// 4. Returns bool
// Use @TypeOf and @typeInfo to dispatch.`,
      solution: `const std = @import("std");

fn lessThan(a: anytype, b: @TypeOf(a)) bool {
    const T = @TypeOf(a);
    const info = @typeInfo(T);
    if (info == .Int or info == .Float or info == .ComptimeInt or info == .ComptimeFloat) {
        return a < b;
    } else if (info == .Pointer) {
        if (@typeInfo(info.Pointer.child) == .Int) {
            return std.mem.order(u8, a, b) == .lt;
        }
        @compileError("unsupported pointer type");
    } else {
        @compileError("unsupported type for lessThan");
    }
}

test "generic less than" {
    try std.testing.expect(lessThan(@as(u32, 1), @as(u32, 2)));
    try std.testing.expect(!lessThan(@as(f64, 5.0), @as(f64, 3.0)));
}`,
      hints: [
        'anytype plus @TypeOf ensures both params have the same type.',
        'Dispatch on @typeInfo to handle different type categories.',
        'For strings ([]const u8), use std.mem.order for comparison.',
      ],
      concepts: ['generic-comparison', 'type-dispatch', 'anytype'],
    },
    {
      id: 'zig-generics-12',
      title: 'Write: Generic Tuple Type',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a generic two-element tuple holding different types.',
      skeleton: `// Write Tuple(comptime A: type, comptime B: type) type:
// - first: A, second: B
// - pub fn init(a: A, b: B) Self
// - pub fn map_first(self: Self, comptime C: type, f: fn(A) C) Tuple(C, B)
// - pub fn map_second(self: Self, comptime C: type, f: fn(B) C) Tuple(A, C)`,
      solution: `fn Tuple(comptime A: type, comptime B: type) type {
    return struct {
        const Self = @This();
        first: A,
        second: B,

        pub fn init(a: A, b: B) Self {
            return Self{ .first = a, .second = b };
        }

        pub fn mapFirst(self: Self, comptime C: type, f: *const fn (A) C) Tuple(C, B) {
            return Tuple(C, B).init(f(self.first), self.second);
        }

        pub fn mapSecond(self: Self, comptime C: type, f: *const fn (B) C) Tuple(A, C) {
            return Tuple(A, C).init(self.first, f(self.second));
        }
    };
}

test "generic tuple" {
    const std = @import("std");
    const t = Tuple(u32, bool).init(42, true);
    try std.testing.expect(t.first == 42);
    try std.testing.expect(t.second == true);
}`,
      hints: [
        'Tuple(A, B) returns a struct type with two fields of different types.',
        'mapFirst transforms the first element, returning a new Tuple type.',
        'The new Tuple has a different type parameter for the transformed element.',
      ],
      concepts: ['generic-tuple', 'type-constructor', 'functor-pattern'],
    },
    {
      id: 'zig-generics-13',
      title: 'Fix: Missing comptime on Type Param',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Fix a generic function missing the comptime qualifier.',
      skeleton: `fn Container(T: type) type {
    return struct {
        data: T,
    };
}

test "container" {
    const c = Container(u32){ .data = 42 };
    try std.testing.expect(c.data == 42);
}`,
      solution: `fn Container(comptime T: type) type {
    return struct {
        data: T,
    };
}

test "container" {
    const c = Container(u32){ .data = 42 };
    try std.testing.expect(c.data == 42);
}`,
      hints: [
        'Type parameters must be comptime in Zig.',
        'Without comptime, T would need to be a runtime value, which types cannot be.',
        'Add comptime before T: type.',
      ],
      concepts: ['comptime-required', 'type-parameter'],
    },
    {
      id: 'zig-generics-14',
      title: 'Fix: Incorrect @TypeOf Usage',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Fix a function that incorrectly constrains the second parameter type.',
      skeleton: `fn add(a: anytype, b: anytype) @TypeOf(a) {
    return a + b;  // BUG: b might be a different type than a!
}

test "add" {
    // This might add a u32 and a u64, causing a type mismatch
    const result = add(@as(u32, 5), @as(u64, 10));
    _ = result;
}`,
      solution: `fn add(a: anytype, b: @TypeOf(a)) @TypeOf(a) {
    return a + b;
}

test "add" {
    const result = add(@as(u32, 5), @as(u32, 10));
    try std.testing.expect(result == 15);
}`,
      hints: [
        'b: anytype allows any type, even different from a.',
        'Constrain b to @TypeOf(a) to ensure they match.',
        'This prevents type mismatches at the call site.',
      ],
      concepts: ['anytype-constraint', '@TypeOf', 'type-safety'],
    },
    {
      id: 'zig-generics-15',
      title: 'Fix: Generic Struct Self Reference',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Fix a generic struct that uses the wrong self-reference.',
      skeleton: `fn Wrapper(comptime T: type) type {
    return struct {
        value: T,

        pub fn wrap(val: T) Wrapper(T) {
            return Wrapper(T){ .value = val };
            // BUG: Wrapper(T) is the function, not the returned struct
        }
    };
}`,
      solution: `fn Wrapper(comptime T: type) type {
    return struct {
        const Self = @This();
        value: T,

        pub fn wrap(val: T) Self {
            return Self{ .value = val };
        }
    };
}`,
      hints: [
        'Wrapper(T) calls the function again; use @This() for Self.',
        '@This() returns the type of the struct being defined.',
        'Use const Self = @This() at the top of the struct.',
      ],
      concepts: ['@This', 'self-reference', 'generic-struct'],
    },
    {
      id: 'zig-generics-16',
      title: 'Predict: Generic Instantiation',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict the output of generic type instantiation.',
      skeleton: `const std = @import("std");

fn Box(comptime T: type) type {
    return struct { value: T };
}

pub fn main() void {
    const a = Box(u32){ .value = 10 };
    const b = Box(f32){ .value = 2.5 };
    std.debug.print("{} {d:.1}\\n", .{ a.value, b.value });
}`,
      solution: `10 2.5`,
      hints: [
        'Box(u32) creates a struct with a u32 field, value = 10.',
        'Box(f32) creates a struct with an f32 field, value = 2.5.',
        'Each instantiation is a distinct type.',
      ],
      concepts: ['generic-instantiation', 'type-constructor'],
    },
    {
      id: 'zig-generics-17',
      title: 'Predict: anytype Dispatch',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Predict the output of a function dispatching on anytype.',
      skeleton: `const std = @import("std");

fn describe(val: anytype) []const u8 {
    return switch (@typeInfo(@TypeOf(val))) {
        .Int => "integer",
        .Float => "float",
        .Bool => "boolean",
        else => "other",
    };
}

pub fn main() void {
    std.debug.print("{s} {s} {s}\\n", .{
        describe(@as(i32, 42)),
        describe(true),
        describe(@as(f64, 1.0)),
    });
}`,
      solution: `integer boolean float`,
      hints: [
        'i32 is .Int, so "integer".',
        'bool is .Bool, so "boolean".',
        'f64 is .Float, so "float".',
      ],
      concepts: ['anytype-dispatch', '@typeInfo'],
    },
    {
      id: 'zig-generics-18',
      title: 'Predict: @hasDecl Branching',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Predict the output of @hasDecl-based branching.',
      skeleton: `const std = @import("std");

const A = struct {
    pub fn label() []const u8 { return "A"; }
};
const B = struct {
    value: u32 = 0,
};

fn getLabel(comptime T: type) []const u8 {
    if (@hasDecl(T, "label")) return T.label();
    return "unknown";
}

pub fn main() void {
    std.debug.print("{s} {s}\\n", .{ getLabel(A), getLabel(B) });
}`,
      solution: `A unknown`,
      hints: [
        'A has a pub fn label, so @hasDecl(A, "label") is true.',
        'B has no label declaration, so @hasDecl(B, "label") is false.',
        'A returns "A", B returns "unknown".',
      ],
      concepts: ['@hasDecl', 'comptime-branching'],
    },
    {
      id: 'zig-generics-19',
      title: 'Refactor: Duplicated Functions to Generic',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Refactor duplicated type-specific functions into a single generic function.',
      skeleton: `fn maxU32(a: u32, b: u32) u32 {
    return if (a > b) a else b;
}

fn maxI64(a: i64, b: i64) i64 {
    return if (a > b) a else b;
}

fn maxF32(a: f32, b: f32) f32 {
    return if (a > b) a else b;
}`,
      solution: `fn max(a: anytype, b: @TypeOf(a)) @TypeOf(a) {
    return if (a > b) a else b;
}

test "generic max" {
    const std = @import("std");
    try std.testing.expect(max(@as(u32, 3), @as(u32, 7)) == 7);
    try std.testing.expect(max(@as(i64, -5), @as(i64, 2)) == 2);
    try std.testing.expect(max(@as(f32, 1.5), @as(f32, 2.5)) == 2.5);
}`,
      hints: [
        'All three functions have identical logic, just different types.',
        'Use anytype for the first param and @TypeOf for the second.',
        'One generic function replaces all three.',
      ],
      concepts: ['generic-refactor', 'anytype', 'DRY'],
    },
    {
      id: 'zig-generics-20',
      title: 'Refactor: Type Switch to Generic Struct',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Refactor a tagged union approach to a generic struct approach.',
      skeleton: `const Tag = enum { i32_val, f64_val, bool_val };

const Value = struct {
    tag: Tag,
    i32_data: i32 = 0,
    f64_data: f64 = 0,
    bool_data: bool = false,

    fn getI32(self: Value) i32 {
        return self.i32_data;
    }
    fn getF64(self: Value) f64 {
        return self.f64_data;
    }
    fn getBool(self: Value) bool {
        return self.bool_data;
    }
};

fn makeI32(v: i32) Value {
    return Value{ .tag = .i32_val, .i32_data = v };
}
fn makeF64(v: f64) Value {
    return Value{ .tag = .f64_val, .f64_data = v };
}`,
      solution: `fn TypedValue(comptime T: type) type {
    return struct {
        const Self = @This();
        data: T,

        pub fn init(value: T) Self {
            return Self{ .data = value };
        }

        pub fn get(self: Self) T {
            return self.data;
        }
    };
}

test "typed value" {
    const std = @import("std");
    const iv = TypedValue(i32).init(42);
    const fv = TypedValue(f64).init(3.14);
    const bv = TypedValue(bool).init(true);
    try std.testing.expect(iv.get() == 42);
    try std.testing.expect(fv.get() == 3.14);
    try std.testing.expect(bv.get() == true);
}`,
      hints: [
        'Replace the tagged union with a generic TypedValue(T).',
        'Each type gets its own specialized struct at compile time.',
        'No tag needed -- the type system tracks which value it is.',
      ],
      concepts: ['generic-struct', 'type-safety', 'refactor'],
    },
  ],
};
