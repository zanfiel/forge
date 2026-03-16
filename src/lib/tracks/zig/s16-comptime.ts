import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-comptime',
  title: '16. Comptime',
  explanation: `## Comptime

Zig's \`comptime\` is one of its most powerful features. It lets you run arbitrary code at compile time, enabling metaprogramming without macros or code generation.

### Comptime Keyword
\`\`\`zig
const x = comptime blk: {
    var sum: u32 = 0;
    for (0..10) |i| sum += i;
    break :blk sum;
};
// x is 45, computed at compile time
\`\`\`

### Comptime Parameters
\`\`\`zig
fn multiply(comptime T: type, a: T, b: T) T {
    return a * b;
}
\`\`\`

### @typeInfo and @TypeOf
\`\`\`zig
fn isFloat(comptime T: type) bool {
    return @typeInfo(T) == .Float;
}
const result = isFloat(f32); // true at compile time
\`\`\`

### Compile-Time Branching
\`\`\`zig
fn serialize(comptime T: type, value: T) []const u8 {
    if (@typeInfo(T) == .Int) {
        return intToString(value);
    } else if (@typeInfo(T) == .Float) {
        return floatToString(value);
    }
}
\`\`\`

Comptime enables generic programming, static dispatch, and eliminates entire categories of runtime overhead.`,
  exercises: [
    {
      id: 'zig-comptime-1',
      title: 'Comptime Variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Declare a compile-time computed variable.',
      skeleton: `const value = ___ blk: {
    var x: u32 = 1;
    x *= 10;
    x += 5;
    break :blk x;
};
// value is 15, known at compile time`,
      solution: `const value = comptime blk: {
    var x: u32 = 1;
    x *= 10;
    x += 5;
    break :blk x;
};
// value is 15, known at compile time`,
      hints: [
        'The comptime keyword forces the block to evaluate at compile time.',
        'The labeled block returns a value with break :blk.',
        'The result is a compile-time constant.',
      ],
      concepts: ['comptime', 'labeled-block', 'compile-time-eval'],
    },
    {
      id: 'zig-comptime-2',
      title: 'Comptime Type Parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Write a function that takes a comptime type parameter.',
      skeleton: `fn zero(___ T: type) T {
    return 0;
}

test "comptime type param" {
    const a: u32 = zero(u32);
    const b: f64 = zero(f64);
    try std.testing.expect(a == 0);
    try std.testing.expect(b == 0.0);
}`,
      solution: `fn zero(comptime T: type) T {
    return 0;
}

test "comptime type param" {
    const a: u32 = zero(u32);
    const b: f64 = zero(f64);
    try std.testing.expect(a == 0);
    try std.testing.expect(b == 0.0);
}`,
      hints: [
        'comptime T: type means T must be known at compile time.',
        'The function returns T, which changes based on the argument.',
        'This is how Zig does generic programming.',
      ],
      concepts: ['comptime-param', 'type-parameter', 'generic'],
    },
    {
      id: 'zig-comptime-3',
      title: 'Comptime Branching',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use comptime branching to select behavior based on type.',
      skeleton: `fn maxValue(comptime T: type) T {
    return switch (___) {
        .Int => |info| if (info.signedness == .signed)
            @as(T, (1 << (info.bits - 1)) - 1)
        else
            @as(T, @as(T, 0) -% 1),
        else => @compileError("unsupported type"),
    };
}`,
      solution: `fn maxValue(comptime T: type) T {
    return switch (@typeInfo(T)) {
        .Int => |info| if (info.signedness == .signed)
            @as(T, (1 << (info.bits - 1)) - 1)
        else
            @as(T, @as(T, 0) -% 1),
        else => @compileError("unsupported type"),
    };
}`,
      hints: [
        '@typeInfo(T) returns compile-time type information.',
        'Switch on it to handle different type categories.',
        '.Int branch provides integer-specific info like bits and signedness.',
      ],
      concepts: ['@typeInfo', 'comptime-branching', 'type-introspection'],
    },
    {
      id: 'zig-comptime-4',
      title: '@TypeOf Usage',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Use @TypeOf to deduce the type of an expression.',
      skeleton: `fn double(val: anytype) ___(@TypeOf(val)) {
    return val + val;
}

test "@TypeOf" {
    try std.testing.expect(double(@as(u32, 5)) == 10);
    try std.testing.expect(double(@as(f32, 2.5)) == 5.0);
}`,
      solution: `fn double(val: anytype) @TypeOf(val) {
    return val + val;
}

test "@TypeOf" {
    try std.testing.expect(double(@as(u32, 5)) == 10);
    try std.testing.expect(double(@as(f32, 2.5)) == 5.0);
}`,
      hints: [
        '@TypeOf(val) gets the type of val at compile time.',
        'Using it as the return type makes the function truly generic.',
        'anytype parameter + @TypeOf return = generic function.',
      ],
      concepts: ['@TypeOf', 'anytype', 'return-type-inference'],
    },
    {
      id: 'zig-comptime-5',
      title: 'Comptime String Operations',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Perform string operations at compile time.',
      skeleton: `fn comptimeConcat(comptime a: []const u8, comptime b: []const u8) *const [a.len + b.len]u8 {
    return ___ {
        var buf: [a.len + b.len]u8 = undefined;
        @memcpy(buf[0..a.len], a);
        @memcpy(buf[a.len..], b);
        break :blk &buf;
    };
}

test "comptime concat" {
    const result = comptimeConcat("hello", "world");
    try std.testing.expectEqualStrings("helloworld", result);
}`,
      solution: `fn comptimeConcat(comptime a: []const u8, comptime b: []const u8) *const [a.len + b.len]u8 {
    return comptime blk: {
        var buf: [a.len + b.len]u8 = undefined;
        @memcpy(buf[0..a.len], a);
        @memcpy(buf[a.len..], b);
        break :blk &buf;
    };
}

test "comptime concat" {
    const result = comptimeConcat("hello", "world");
    try std.testing.expectEqualStrings("helloworld", result);
}`,
      hints: [
        'comptime blk: { ... } runs the block at compile time.',
        'String concatenation is done by copying into a fixed-size buffer.',
        'The result is a compile-time known pointer to a string.',
      ],
      concepts: ['comptime-string', 'compile-time-buffer'],
    },
    {
      id: 'zig-comptime-6',
      title: 'Comptime for Loop',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use inline for to unroll a loop at compile time.',
      skeleton: `fn sumFields(comptime fields: []const []const u8, data: anytype) i64 {
    var total: i64 = 0;
    ___ for (fields) |field_name| {
        total += @field(data, field_name);
    }
    return total;
}

test "sum fields" {
    const s = .{ .a = @as(i64, 10), .b = @as(i64, 20), .c = @as(i64, 30) };
    try std.testing.expect(sumFields(&.{ "a", "b", "c" }, s) == 60);
}`,
      solution: `fn sumFields(comptime fields: []const []const u8, data: anytype) i64 {
    var total: i64 = 0;
    inline for (fields) |field_name| {
        total += @field(data, field_name);
    }
    return total;
}

test "sum fields" {
    const s = .{ .a = @as(i64, 10), .b = @as(i64, 20), .c = @as(i64, 30) };
    try std.testing.expect(sumFields(&.{ "a", "b", "c" }, s) == 60);
}`,
      hints: [
        'inline for unrolls the loop at compile time.',
        '@field(data, field_name) accesses a struct field by comptime name.',
        'Each iteration is compiled independently with the comptime value.',
      ],
      concepts: ['inline-for', '@field', 'comptime-unroll'],
    },
    {
      id: 'zig-comptime-7',
      title: 'Write: Comptime Fibonacci',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Write a compile-time Fibonacci function.',
      skeleton: `// Write a function fibonacci that:
// 1. Takes comptime n: u32
// 2. Returns the nth Fibonacci number as a comptime u128
// 3. fib(0) = 0, fib(1) = 1, fib(n) = fib(n-1) + fib(n-2)
// Must be callable at comptime: const fib10 = comptime fibonacci(10);`,
      solution: `fn fibonacci(comptime n: u32) u128 {
    if (n == 0) return 0;
    if (n == 1) return 1;
    return comptime fibonacci(n - 1) + fibonacci(n - 2);
}

test "comptime fibonacci" {
    const fib10 = comptime fibonacci(10);
    try std.testing.expect(fib10 == 55);
}`,
      hints: [
        'comptime parameters allow recursive calls at compile time.',
        'The base cases are fib(0) = 0 and fib(1) = 1.',
        'Recursive comptime calls are fully evaluated by the compiler.',
      ],
      concepts: ['comptime-recursion', 'compile-time-eval'],
    },
    {
      id: 'zig-comptime-8',
      title: 'Write: Type-Based Dispatch',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a function that dispatches behavior based on type info at compile time.',
      skeleton: `// Write a function stringify that:
// 1. Takes comptime T: type and a value of type T
// 2. If T is an integer, returns "int"
// 3. If T is a float, returns "float"
// 4. If T is a bool, returns "bool"
// 5. Otherwise, returns "other"
// Use @typeInfo for the dispatch.`,
      solution: `fn stringify(comptime T: type, value: T) []const u8 {
    _ = value;
    return switch (@typeInfo(T)) {
        .Int, .ComptimeInt => "int",
        .Float, .ComptimeFloat => "float",
        .Bool => "bool",
        else => "other",
    };
}

test "type dispatch" {
    const std = @import("std");
    try std.testing.expectEqualStrings("int", stringify(u32, 5));
    try std.testing.expectEqualStrings("float", stringify(f64, 3.14));
    try std.testing.expectEqualStrings("bool", stringify(bool, true));
}`,
      hints: [
        'switch on @typeInfo(T) to branch on the type category.',
        '.Int and .ComptimeInt both represent integer types.',
        'The else branch handles all other type categories.',
      ],
      concepts: ['@typeInfo', 'type-dispatch', 'comptime-switch'],
    },
    {
      id: 'zig-comptime-9',
      title: 'Write: Comptime Array Generation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a function that generates an array at compile time.',
      skeleton: `// Write a function makeSquares that:
// 1. Takes comptime N: usize
// 2. Returns a [N]u64 array where arr[i] = i * i
// 3. The array is computed entirely at compile time
// Usage: const squares = comptime makeSquares(5); // {0, 1, 4, 9, 16}`,
      solution: `fn makeSquares(comptime N: usize) [N]u64 {
    var result: [N]u64 = undefined;
    for (result[0..], 0..) |*slot, i| {
        slot.* = i * i;
    }
    return result;
}

test "comptime squares" {
    const std = @import("std");
    const squares = comptime makeSquares(5);
    try std.testing.expect(squares[0] == 0);
    try std.testing.expect(squares[4] == 16);
}`,
      hints: [
        'Use comptime N as the array length in the return type.',
        'Fill the array with a loop computing i * i.',
        'When called with comptime, the entire array is compile-time known.',
      ],
      concepts: ['comptime-array', 'compile-time-generation'],
    },
    {
      id: 'zig-comptime-10',
      title: 'Write: Compile-Time Struct Reflection',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a function that counts the fields of a struct at compile time.',
      skeleton: `// Write a function fieldCount that:
// 1. Takes comptime T: type
// 2. Verifies T is a struct using @typeInfo
// 3. Returns the number of fields as comptime usize
// 4. If T is not a struct, calls @compileError
// Usage: const n = fieldCount(struct { x: u32, y: u32 }); // 2`,
      solution: `fn fieldCount(comptime T: type) usize {
    const info = @typeInfo(T);
    return switch (info) {
        .Struct => |s| s.fields.len,
        else => @compileError("expected a struct type"),
    };
}

test "field count" {
    const std = @import("std");
    const MyStruct = struct { x: u32, y: u32, z: bool };
    try std.testing.expect(fieldCount(MyStruct) == 3);
}`,
      hints: [
        '@typeInfo(T) returns .Struct with field information for struct types.',
        's.fields is a slice of field descriptors.',
        '@compileError produces a compile-time error message.',
      ],
      concepts: ['@typeInfo', 'struct-reflection', '@compileError'],
    },
    {
      id: 'zig-comptime-11',
      title: 'Write: Comptime String Formatting',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a comptime function that builds a format string from field names.',
      skeleton: `// Write a function makeFormatString that:
// 1. Takes comptime T: type (a struct)
// 2. Returns a comptime []const u8 like "x={} y={} z={}"
// 3. Uses @typeInfo(T).Struct.fields to iterate field names
// 4. Joins them with spaces: "fieldname={}"`,
      solution: `fn makeFormatString(comptime T: type) []const u8 {
    const fields = @typeInfo(T).Struct.fields;
    comptime var result: []const u8 = "";
    inline for (fields, 0..) |field, i| {
        if (i > 0) result = result ++ " ";
        result = result ++ field.name ++ "={}";
    }
    return result;
}

test "format string" {
    const std = @import("std");
    const S = struct { x: u32, y: u32 };
    const fmt = comptime makeFormatString(S);
    try std.testing.expectEqualStrings("x={} y={}", fmt);
}`,
      hints: [
        'Use inline for to iterate struct fields at compile time.',
        'Comptime string concatenation uses the ++ operator.',
        'field.name gives the name of each struct field.',
      ],
      concepts: ['comptime-string', 'struct-fields', 'inline-for'],
    },
    {
      id: 'zig-comptime-12',
      title: 'Write: Static Dispatch Table',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a comptime-generated lookup table for efficient dispatch.',
      skeleton: `// Write a function makeLookup that:
// 1. Takes comptime size: usize
// 2. Returns a [256]u8 array
// 3. For chars 'a' to 'z': stores the uppercase equivalent (char - 32)
// 4. For all other indices: stores the index itself (identity)
// This is a compile-time generated lookup table for toupper.`,
      solution: `fn makeLookup() [256]u8 {
    var table: [256]u8 = undefined;
    for (&table, 0..) |*entry, i| {
        if (i >= 'a' and i <= 'z') {
            entry.* = @intCast(i - 32);
        } else {
            entry.* = @intCast(i);
        }
    }
    return table;
}

const upper_table = comptime makeLookup();

fn toUpper(c: u8) u8 {
    return upper_table[c];
}

test "comptime lookup" {
    const std = @import("std");
    try std.testing.expect(toUpper('a') == 'A');
    try std.testing.expect(toUpper('z') == 'Z');
    try std.testing.expect(toUpper('A') == 'A');
}`,
      hints: [
        'Generate the full 256-entry table in a comptime function.',
        'Store the result as a module-level const for zero runtime cost.',
        'Lookup is just an array index, extremely fast.',
      ],
      concepts: ['comptime-lookup-table', 'static-dispatch'],
    },
    {
      id: 'zig-comptime-13',
      title: 'Fix: Missing Comptime Annotation',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Fix code that uses a runtime value where comptime is required.',
      skeleton: `fn makeArray(len: usize) [len]u32 {
    var arr: [len]u32 = undefined;
    for (&arr) |*v| v.* = 0;
    return arr;
}`,
      solution: `fn makeArray(comptime len: usize) [len]u32 {
    var arr: [len]u32 = undefined;
    for (&arr) |*v| v.* = 0;
    return arr;
}`,
      hints: [
        'Array lengths must be known at compile time in Zig.',
        'The len parameter is used as an array size, so it must be comptime.',
        'Add the comptime keyword to the parameter.',
      ],
      concepts: ['comptime-required', 'array-size'],
    },
    {
      id: 'zig-comptime-14',
      title: 'Fix: Comptime Variable Mutation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Fix code that tries to mutate a comptime var at runtime.',
      skeleton: `fn counter() u32 {
    comptime var count: u32 = 0;
    count += 1;  // Error: cannot mutate comptime var at runtime
    return count;
}`,
      solution: `fn counter() u32 {
    var count: u32 = 0;
    count += 1;
    return count;
}`,
      hints: [
        'comptime var can only be mutated in comptime contexts.',
        'Runtime code cannot modify comptime variables.',
        'Remove comptime to make it a normal runtime variable.',
      ],
      concepts: ['comptime-var', 'runtime-mutation'],
    },
    {
      id: 'zig-comptime-15',
      title: 'Fix: @typeInfo Mismatch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Fix incorrect type info comparison.',
      skeleton: `fn isSlice(comptime T: type) bool {
    return @typeInfo(T) == .Array;  // BUG: slices are Pointer, not Array
}

test "slice check" {
    try std.testing.expect(isSlice([]const u8));  // fails!
}`,
      solution: `fn isSlice(comptime T: type) bool {
    return @typeInfo(T) == .Pointer and @typeInfo(T).Pointer.size == .Slice;
}

test "slice check" {
    try std.testing.expect(isSlice([]const u8));
}`,
      hints: [
        'Slices in Zig are a kind of Pointer, not Array.',
        'Check .Pointer then verify .size == .Slice.',
        'Arrays are fixed-size [N]T, slices are []T.',
      ],
      concepts: ['@typeInfo', 'slice-vs-array', 'type-category'],
    },
    {
      id: 'zig-comptime-16',
      title: 'Predict: Comptime Evaluation',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict the compile-time computed value.',
      skeleton: `const std = @import("std");

const val = comptime blk: {
    var x: u32 = 1;
    var i: u32 = 0;
    while (i < 5) : (i += 1) {
        x *= 2;
    }
    break :blk x;
};

pub fn main() void {
    std.debug.print("{}\\n", .{val});
}`,
      solution: `32`,
      hints: [
        'x starts at 1, then doubles 5 times.',
        '1 * 2 * 2 * 2 * 2 * 2 = 32.',
        'The computation happens entirely at compile time.',
      ],
      concepts: ['comptime-eval', 'while-loop'],
    },
    {
      id: 'zig-comptime-17',
      title: 'Predict: Inline For',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Predict the output of an inline for loop.',
      skeleton: `const std = @import("std");

fn typeSize(comptime T: type) usize {
    return @sizeOf(T);
}

pub fn main() void {
    const types = .{ u8, u16, u32 };
    var total: usize = 0;
    inline for (types) |T| {
        total += typeSize(T);
    }
    std.debug.print("{}\\n", .{total});
}`,
      solution: `7`,
      hints: [
        '@sizeOf(u8) = 1, @sizeOf(u16) = 2, @sizeOf(u32) = 4.',
        'total = 1 + 2 + 4 = 7.',
        'inline for evaluates each iteration with the comptime type.',
      ],
      concepts: ['inline-for', '@sizeOf', 'type-tuple'],
    },
    {
      id: 'zig-comptime-18',
      title: 'Predict: Comptime String',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Predict the result of comptime string operations.',
      skeleton: `const std = @import("std");

const greeting = comptime blk: {
    const a = "Hello";
    const b = "World";
    break :blk a ++ ", " ++ b ++ "!";
};

pub fn main() void {
    std.debug.print("{s}\\n", .{greeting});
}`,
      solution: `Hello, World!`,
      hints: [
        'Comptime ++ concatenates string literals.',
        '"Hello" ++ ", " ++ "World" ++ "!" = "Hello, World!".',
        'The result is a single compile-time string constant.',
      ],
      concepts: ['comptime-concat', 'string-literal'],
    },
    {
      id: 'zig-comptime-19',
      title: 'Refactor: Runtime to Comptime',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Refactor a runtime computation to be done at compile time.',
      skeleton: `const std = @import("std");

fn isPrime(n: u32) bool {
    if (n < 2) return false;
    var i: u32 = 2;
    while (i * i <= n) : (i += 1) {
        if (n % i == 0) return false;
    }
    return true;
}

fn countPrimesBelow100() u32 {
    var count: u32 = 0;
    var n: u32 = 0;
    while (n < 100) : (n += 1) {
        if (isPrime(n)) count += 1;
    }
    return count;
}

pub fn main() void {
    // This runs at runtime, but the answer never changes
    const primes = countPrimesBelow100();
    std.debug.print("{}\\n", .{primes});
}`,
      solution: `const std = @import("std");

fn isPrime(n: u32) bool {
    if (n < 2) return false;
    var i: u32 = 2;
    while (i * i <= n) : (i += 1) {
        if (n % i == 0) return false;
    }
    return true;
}

const prime_count = comptime blk: {
    var count: u32 = 0;
    var n: u32 = 0;
    while (n < 100) : (n += 1) {
        if (isPrime(n)) count += 1;
    }
    break :blk count;
};

pub fn main() void {
    std.debug.print("{}\\n", .{prime_count});
}`,
      hints: [
        'Since the result is always the same, compute it at compile time.',
        'Move the counting logic into a comptime block.',
        'The result becomes a compile-time constant with zero runtime cost.',
      ],
      concepts: ['comptime-optimization', 'compile-time-eval'],
    },
    {
      id: 'zig-comptime-20',
      title: 'Refactor: Switch to Comptime Dispatch',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Refactor runtime type-tag dispatch to comptime generic dispatch.',
      skeleton: `const std = @import("std");

const ValueType = enum { int, float, boolean };

const Value = struct {
    tag: ValueType,
    int_val: i64,
    float_val: f64,
    bool_val: bool,
};

fn negate(v: Value) Value {
    return switch (v.tag) {
        .int => Value{ .tag = .int, .int_val = -v.int_val, .float_val = 0, .bool_val = false },
        .float => Value{ .tag = .float, .int_val = 0, .float_val = -v.float_val, .bool_val = false },
        .boolean => Value{ .tag = .boolean, .int_val = 0, .float_val = 0, .bool_val = !v.bool_val },
    };
}`,
      solution: `const std = @import("std");

fn negate(val: anytype) @TypeOf(val) {
    const T = @TypeOf(val);
    return switch (@typeInfo(T)) {
        .Int, .ComptimeInt => -val,
        .Float, .ComptimeFloat => -val,
        .Bool => !val,
        else => @compileError("unsupported type for negate"),
    };
}

test "comptime dispatch negate" {
    try std.testing.expect(negate(@as(i64, 5)) == -5);
    try std.testing.expect(negate(@as(f64, 3.0)) == -3.0);
    try std.testing.expect(negate(true) == false);
}`,
      hints: [
        'Use anytype and @TypeOf instead of a runtime tag.',
        '@typeInfo dispatches at compile time with zero overhead.',
        'No tagged union needed -- the compiler handles it.',
      ],
      concepts: ['comptime-dispatch', 'anytype', 'zero-overhead'],
    },
  ],
};
