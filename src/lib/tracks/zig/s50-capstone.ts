import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-cap',
  title: '50. Capstone',
  description: 'Comprehensive exercises combining all major Zig concepts: memory, types, error handling, comptime, data structures, and systems programming.',
  exercises: [
    {
      id: 'zig-cap-1',
      title: 'Generic Stack with Error Handling',
      type: 'write-function',
      difficulty: 'intermediate',
      instructions: 'Write a generic `Stack(T)` struct with `push` and `pop` methods. `push` returns `error.Overflow` if full, `pop` returns `error.Underflow` if empty. Capacity is fixed at 16.',
      skeleton: `const std = @import("std");

pub fn Stack(comptime T: type) type {
    return struct {
        // fields and methods here
    };
}`,
      solution: `const std = @import("std");

pub fn Stack(comptime T: type) type {
    return struct {
        items: [16]T = undefined,
        len: usize = 0,

        const Error = error{ Overflow, Underflow };

        pub fn push(self: *@This(), item: T) Error!void {
            if (self.len >= 16) return error.Overflow;
            self.items[self.len] = item;
            self.len += 1;
        }

        pub fn pop(self: *@This()) Error!T {
            if (self.len == 0) return error.Underflow;
            self.len -= 1;
            return self.items[self.len];
        }
    };
}`,
      hints: [
        'Return type of the function is `type`; the body is a struct literal',
        'Use *@This() for mutable self in methods',
        'Error union return: Error!void and Error!T'
      ]
    },
    {
      id: 'zig-cap-2',
      title: 'Recursive Data Structure with Allocator',
      type: 'write-function',
      difficulty: 'advanced',
      instructions: 'Write a `TreeNode` struct and `insert` function that inserts an i32 value into a binary search tree. Use a provided allocator to create nodes.',
      skeleton: `const std = @import("std");

const TreeNode = struct {
    value: i32,
    left: ?*TreeNode,
    right: ?*TreeNode,
};

pub fn insert(allocator: std.mem.Allocator, root: ?*TreeNode, value: i32) !*TreeNode {
    // BST insert
}`,
      solution: `const std = @import("std");

const TreeNode = struct {
    value: i32,
    left: ?*TreeNode,
    right: ?*TreeNode,
};

pub fn insert(allocator: std.mem.Allocator, root: ?*TreeNode, value: i32) !*TreeNode {
    if (root) |node| {
        if (value < node.value) {
            node.left = try insert(allocator, node.left, value);
        } else if (value > node.value) {
            node.right = try insert(allocator, node.right, value);
        }
        return node;
    }
    const node = try allocator.create(TreeNode);
    node.* = .{ .value = value, .left = null, .right = null };
    return node;
}`,
      hints: [
        'Use if (root) |node| to unwrap the optional root',
        'allocator.create(T) allocates a single T on the heap',
        'Initialize with .{ .value = value, .left = null, .right = null }'
      ]
    },
    {
      id: 'zig-cap-3',
      title: 'Comptime Dispatch Table',
      type: 'write-function',
      difficulty: 'advanced',
      instructions: 'Write `getSerializer` that returns a function pointer for serializing a value, chosen at compile time based on the type T. Support i32, f64, and bool.',
      skeleton: `const std = @import("std");

pub fn getSerializer(comptime T: type) fn (T, []u8) []u8 {
    // return appropriate serialization function for T
}`,
      solution: `const std = @import("std");

pub fn getSerializer(comptime T: type) fn (T, []u8) []u8 {
    return comptime switch (T) {
        i32 => struct {
            fn f(v: i32, buf: []u8) []u8 {
                return std.fmt.bufPrint(buf, "{d}", .{v}) catch buf[0..0];
            }
        }.f,
        f64 => struct {
            fn f(v: f64, buf: []u8) []u8 {
                return std.fmt.bufPrint(buf, "{d:.6}", .{v}) catch buf[0..0];
            }
        }.f,
        bool => struct {
            fn f(v: bool, buf: []u8) []u8 {
                return std.fmt.bufPrint(buf, "{}", .{v}) catch buf[0..0];
            }
        }.f,
        else => @compileError("unsupported type: " ++ @typeName(T)),
    };
}`,
      hints: [
        'Use comptime switch on the type T to select a function',
        'Define inline anonymous structs with fn for each case',
        '@compileError for unsupported types'
      ]
    },
    {
      id: 'zig-cap-4',
      title: 'HashMap Word Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      instructions: 'Write `countWords` that takes a string, splits on spaces, and returns a StringHashMap with word counts. Caller owns the returned map.',
      skeleton: `const std = @import("std");

pub fn countWords(allocator: std.mem.Allocator, text: []const u8) !std.StringHashMap(u32) {
    // split text on spaces, count each word
}`,
      solution: `const std = @import("std");

pub fn countWords(allocator: std.mem.Allocator, text: []const u8) !std.StringHashMap(u32) {
    var map = std.StringHashMap(u32).init(allocator);
    var iter = std.mem.splitScalar(u8, text, ' ');
    while (iter.next()) |word| {
        if (word.len == 0) continue;
        const result = try map.getOrPut(word);
        if (result.found_existing) {
            result.value_ptr.* += 1;
        } else {
            result.value_ptr.* = 1;
        }
    }
    return map;
}`,
      hints: [
        'Use std.mem.splitScalar to split on a single byte',
        'getOrPut returns a GetOrPutResult with found_existing flag',
        'Access value through result.value_ptr.*'
      ]
    },
    {
      id: 'zig-cap-5',
      title: 'Tagged Union State Machine',
      type: 'write-function',
      difficulty: 'intermediate',
      instructions: 'Implement a simple traffic light state machine using a tagged union. `next` transitions: Red -> Green -> Yellow -> Red.',
      skeleton: `const Light = union(enum) {
    red,
    green,
    yellow,
};

pub fn next(light: Light) Light {
    // transition to next state
}`,
      solution: `const Light = union(enum) {
    red,
    green,
    yellow,
};

pub fn next(light: Light) Light {
    return switch (light) {
        .red => .green,
        .green => .yellow,
        .yellow => .red,
    };
}`,
      hints: [
        'Switch on the tagged union is exhaustive',
        'Return the next state using dot syntax',
        'Tagged unions without payloads work like enums here'
      ]
    },
    {
      id: 'zig-cap-6',
      title: 'Arena Allocator Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      instructions: 'Write `buildPath` that uses an ArenaAllocator to allocate and join path segments with "/" separators. The caller must deinit the arena.',
      skeleton: `const std = @import("std");

pub fn buildPath(
    arena: *std.heap.ArenaAllocator,
    segments: []const []const u8,
) ![]const u8 {
    // join segments with "/" using arena allocator
}`,
      solution: `const std = @import("std");

pub fn buildPath(
    arena: *std.heap.ArenaAllocator,
    segments: []const []const u8,
) ![]const u8 {
    const allocator = arena.allocator();
    return std.mem.join(allocator, "/", segments);
}`,
      hints: [
        'Get an allocator from the arena with arena.allocator()',
        'std.mem.join concatenates slices with a separator',
        'Arena memory is freed all at once when arena.deinit() is called'
      ]
    },
    {
      id: 'zig-cap-7',
      title: 'Errdefer for Cleanup',
      type: 'fix-bug',
      difficulty: 'intermediate',
      instructions: 'Fix the memory leak: if the second allocation fails, the first allocation is never freed.',
      skeleton: `const std = @import("std");

pub fn allocPair(allocator: std.mem.Allocator) !struct { a: []u8, b: []u8 } {
    const a = try allocator.alloc(u8, 64);
    // BUG: if this fails, a leaks
    const b = try allocator.alloc(u8, 128);
    return .{ .a = a, .b = b };
}`,
      solution: `const std = @import("std");

pub fn allocPair(allocator: std.mem.Allocator) !struct { a: []u8, b: []u8 } {
    const a = try allocator.alloc(u8, 64);
    errdefer allocator.free(a);
    const b = try allocator.alloc(u8, 128);
    return .{ .a = a, .b = b };
}`,
      hints: [
        'errdefer runs only if the function returns an error',
        'Place errdefer immediately after the allocation it should undo',
        'If b succeeds, the errdefer for a is cancelled'
      ]
    },
    {
      id: 'zig-cap-8',
      title: 'Comptime String Table',
      type: 'write-function',
      difficulty: 'advanced',
      instructions: 'Write a comptime function `makeTable` that builds an array of strings from a comma-separated comptime string. For "foo,bar,baz" return `[3][]const u8{"foo","bar","baz"}`.',
      skeleton: `pub fn makeTable(comptime csv: []const u8) type {
    // parse csv at comptime and return a struct with entries array
}`,
      solution: `const std = @import("std");

pub fn makeTable(comptime csv: []const u8) type {
    comptime var count: usize = 1;
    comptime {
        for (csv) |c| if (c == ',') count += 1;
    }
    comptime var entries: [count][]const u8 = undefined;
    comptime {
        var iter = std.mem.splitScalar(u8, csv, ',');
        var i: usize = 0;
        while (iter.next()) |part| : (i += 1) {
            entries[i] = part;
        }
    }
    return struct {
        pub const table = entries;
        pub const len = count;
    };
}`,
      hints: [
        'comptime var allows mutation at compile time',
        'Use comptime blocks for loops that compute at compile time',
        'Return a struct type containing the computed array'
      ]
    },
    {
      id: 'zig-cap-9',
      title: 'Sorting Structs with Custom Comparator',
      type: 'write-function',
      difficulty: 'intermediate',
      instructions: 'Write `sortByAge` that sorts a slice of `Person` structs in ascending order by age using `std.mem.sort`.',
      skeleton: `const std = @import("std");

const Person = struct {
    name: []const u8,
    age: u32,
};

pub fn sortByAge(people: []Person) void {
    // sort people by age ascending
}`,
      solution: `const std = @import("std");

const Person = struct {
    name: []const u8,
    age: u32,
};

pub fn sortByAge(people: []Person) void {
    std.mem.sort(Person, people, {}, struct {
        fn lessThan(_: void, a: Person, b: Person) bool {
            return a.age < b.age;
        }
    }.lessThan);
}`,
      hints: [
        'std.mem.sort takes the type, slice, context, and a lessThan function',
        'Define the comparator as an anonymous struct method',
        'The context parameter is {} when no state is needed'
      ]
    },
    {
      id: 'zig-cap-10',
      title: 'File Read with Error Handling',
      type: 'write-function',
      difficulty: 'intermediate',
      instructions: 'Write `readConfig` that opens a file, reads up to 4096 bytes into a caller-provided buffer, and returns the slice read. Propagate file errors.',
      skeleton: `const std = @import("std");

pub fn readConfig(path: []const u8, buf: []u8) ![]u8 {
    // open file, read into buf, return slice
}`,
      solution: `const std = @import("std");

pub fn readConfig(path: []const u8, buf: []u8) ![]u8 {
    const file = try std.fs.cwd().openFile(path, .{});
    defer file.close();
    const n = try file.readAll(buf);
    return buf[0..n];
}`,
      hints: [
        'std.fs.cwd().openFile returns a File or an error',
        'defer file.close() ensures the file is closed even on error',
        'file.readAll fills the buffer and returns the number of bytes read'
      ]
    },
    {
      id: 'zig-cap-11',
      title: 'Type-Safe Command Dispatch',
      type: 'write-function',
      difficulty: 'advanced',
      instructions: 'Write a `dispatch` function that takes a tagged union `Command` and calls the appropriate handler function.',
      skeleton: `const std = @import("std");

const Command = union(enum) {
    quit,
    print: []const u8,
    add: struct { a: i32, b: i32 },
};

pub fn dispatch(cmd: Command) void {
    // handle each variant
}`,
      solution: `const std = @import("std");

const Command = union(enum) {
    quit,
    print: []const u8,
    add: struct { a: i32, b: i32 },
};

pub fn dispatch(cmd: Command) void {
    switch (cmd) {
        .quit => std.process.exit(0),
        .print => |msg| std.debug.print("{s}\\n", .{msg}),
        .add => |args| std.debug.print("{d}\\n", .{args.a + args.b}),
    }
}`,
      hints: [
        'Switch on a tagged union is exhaustive',
        'Capture payloads with |variable| syntax',
        'Struct payloads are accessed via dot notation'
      ]
    },
    {
      id: 'zig-cap-12',
      title: 'Iterator Protocol',
      type: 'write-function',
      difficulty: 'advanced',
      instructions: 'Implement a `RangeIterator` struct with a `next() ?u32` method that yields values from `start` to `end` (exclusive).',
      skeleton: `const RangeIterator = struct {
    current: u32,
    end: u32,

    pub fn init(start: u32, end: u32) RangeIterator {
        return .{ .current = start, .end = end };
    }

    pub fn next(self: *RangeIterator) ?u32 {
        // return next value or null
    }
};`,
      solution: `const RangeIterator = struct {
    current: u32,
    end: u32,

    pub fn init(start: u32, end: u32) RangeIterator {
        return .{ .current = start, .end = end };
    }

    pub fn next(self: *RangeIterator) ?u32 {
        if (self.current >= self.end) return null;
        const val = self.current;
        self.current += 1;
        return val;
    }
};`,
      hints: [
        'Return null when exhausted to signal end of iteration',
        'Save current value before incrementing',
        'Zig uses this pattern: while (iter.next()) |val| { ... }'
      ]
    },
    {
      id: 'zig-cap-13',
      title: 'Interface via Anytype',
      type: 'write-function',
      difficulty: 'advanced',
      instructions: 'Write `printAll` that accepts any writer-like object (anytype) with a `print` method and prints each string in a slice.',
      skeleton: `pub fn printAll(writer: anytype, items: []const []const u8) !void {
    // print each item followed by newline
}`,
      solution: `pub fn printAll(writer: anytype, items: []const []const u8) !void {
    for (items) |item| {
        try writer.print("{s}\\n", .{item});
    }
}`,
      hints: [
        'anytype lets you accept any type with the required interface',
        'Use try since writer.print may return an error',
        'Works with std.io.getStdOut().writer(), BufferedWriter, etc.'
      ]
    },
    {
      id: 'zig-cap-14',
      title: 'Comptime Struct Reflection',
      type: 'write-function',
      difficulty: 'advanced',
      instructions: 'Write `printFields` that uses comptime reflection to print all field names and values of any struct.',
      skeleton: `const std = @import("std");

pub fn printFields(value: anytype) void {
    // iterate struct fields using @typeInfo and print name: value
}`,
      solution: `const std = @import("std");

pub fn printFields(value: anytype) void {
    const T = @TypeOf(value);
    const info = @typeInfo(T);
    inline for (info.@"struct".fields) |field| {
        std.debug.print("{s}: {}\\n", .{ field.name, @field(value, field.name) });
    }
}`,
      hints: [
        '@typeInfo returns TypeInfo, access .@"struct".fields',
        'inline for is required when iterating comptime data',
        '@field(value, field.name) accesses a field by name at comptime'
      ]
    },
    {
      id: 'zig-cap-15',
      title: 'Memory-Safe String Builder',
      type: 'write-function',
      difficulty: 'intermediate',
      instructions: 'Write `buildJson` that uses an ArrayList(u8) as a writer to build a simple JSON string `{"key":"value"}` and returns the owned slice.',
      skeleton: `const std = @import("std");

pub fn buildJson(allocator: std.mem.Allocator, key: []const u8, value: []const u8) ![]u8 {
    // build {"key":"value"} using ArrayList writer
}`,
      solution: `const std = @import("std");

pub fn buildJson(allocator: std.mem.Allocator, key: []const u8, value: []const u8) ![]u8 {
    var list = std.ArrayList(u8).init(allocator);
    errdefer list.deinit();
    const writer = list.writer();
    try writer.print("{{\"{s}\":\"{s}\"}}", .{ key, value });
    return list.toOwnedSlice();
}`,
      hints: [
        'ArrayList(u8).writer() returns a writer compatible with std.fmt',
        'Escape braces in format strings by doubling: {{ and }}',
        'toOwnedSlice() transfers ownership to the caller'
      ]
    },
    {
      id: 'zig-cap-16',
      title: 'Embedded Resource Server',
      type: 'write-function',
      difficulty: 'advanced',
      instructions: 'Write `getAsset` that returns embedded file contents given a path string. Embed "index.html" and "style.css" at comptime.',
      skeleton: `pub fn getAsset(path: []const u8) ?[]const u8 {
    // return embedded file or null if not found
}`,
      solution: `const std = @import("std");

const html = @embedFile("index.html");
const css = @embedFile("style.css");

pub fn getAsset(path: []const u8) ?[]const u8 {
    if (std.mem.eql(u8, path, "/index.html")) return html;
    if (std.mem.eql(u8, path, "/style.css")) return css;
    return null;
}`,
      hints: [
        '@embedFile embeds the file at module scope as a constant',
        'Use std.mem.eql for string comparison',
        'Return null for unknown paths to signal 404'
      ]
    },
    {
      id: 'zig-cap-17',
      title: 'Test Suite for a Module',
      type: 'write-function',
      difficulty: 'intermediate',
      instructions: 'Write test cases for a `clamp` function that limits a value to [min, max]. Cover normal case, below min, above max, and equal to bounds.',
      skeleton: `const std = @import("std");

pub fn clamp(val: i32, lo: i32, hi: i32) i32 {
    if (val < lo) return lo;
    if (val > hi) return hi;
    return val;
}

test "clamp normal" { }
test "clamp below min" { }
test "clamp above max" { }
test "clamp at boundary" { }`,
      solution: `const std = @import("std");

pub fn clamp(val: i32, lo: i32, hi: i32) i32 {
    if (val < lo) return lo;
    if (val > hi) return hi;
    return val;
}

test "clamp normal" {
    try std.testing.expectEqual(@as(i32, 5), clamp(5, 0, 10));
}

test "clamp below min" {
    try std.testing.expectEqual(@as(i32, 0), clamp(-5, 0, 10));
}

test "clamp above max" {
    try std.testing.expectEqual(@as(i32, 10), clamp(15, 0, 10));
}

test "clamp at boundary" {
    try std.testing.expectEqual(@as(i32, 0), clamp(0, 0, 10));
    try std.testing.expectEqual(@as(i32, 10), clamp(10, 0, 10));
}`,
      hints: [
        'std.testing.expectEqual takes expected then actual',
        'Cast literals with @as(i32, ...) to match the return type',
        'Multiple assertions in one test block are fine'
      ]
    },
    {
      id: 'zig-cap-18',
      title: 'Finite State Machine',
      type: 'write-function',
      difficulty: 'advanced',
      instructions: 'Implement a simple lexer FSM that identifies tokens. Given an input byte, `transition` moves from one `LexState` to the next.',
      skeleton: `const LexState = enum {
    idle,
    in_word,
    in_number,
    error_state,
};

pub fn transition(state: LexState, byte: u8) LexState {
    // idle: letter->in_word, digit->in_number, space->idle, else->error_state
    // in_word: letter/digit->in_word, space->idle, else->error_state
    // in_number: digit->in_number, space->idle, else->error_state
}`,
      solution: `const std = @import("std");

const LexState = enum {
    idle,
    in_word,
    in_number,
    error_state,
};

pub fn transition(state: LexState, byte: u8) LexState {
    return switch (state) {
        .idle => switch (byte) {
            'a'...'z', 'A'...'Z' => .in_word,
            '0'...'9' => .in_number,
            ' ', '\\t', '\\n' => .idle,
            else => .error_state,
        },
        .in_word => switch (byte) {
            'a'...'z', 'A'...'Z', '0'...'9' => .in_word,
            ' ', '\\t', '\\n' => .idle,
            else => .error_state,
        },
        .in_number => switch (byte) {
            '0'...'9' => .in_number,
            ' ', '\\t', '\\n' => .idle,
            else => .error_state,
        },
        .error_state => .error_state,
    };
}`,
      hints: [
        'Nested switch statements handle state + input combinations',
        'Use range patterns like \'a\'...\'z\' for character ranges',
        'Once in error_state, stay there (absorbing state)'
      ]
    },
    {
      id: 'zig-cap-19',
      title: 'Compile-Time Fibonacci',
      type: 'predict-output',
      difficulty: 'advanced',
      instructions: 'What does this code print, and what happens at compile time vs runtime?',
      skeleton: `const std = @import("std");

fn fib(comptime n: u32) u64 {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

pub fn main() void {
    const result = comptime fib(10);
    std.debug.print("fib(10) = {}\\n", .{result});
}`,
      solution: `// Output: fib(10) = 55
//
// At COMPILE TIME:
// - fib(10) is evaluated recursively by the Zig compiler
// - All recursive calls happen during compilation
// - result is a compile-time constant u64 = 55
//
// At RUNTIME:
// - result is a literal constant 55 baked into the binary
// - The print call executes with the already-computed value
// - No fibonacci computation happens at runtime
//
// This is Zig comptime: any function with comptime parameters
// or called with comptime is evaluated by the compiler itself`,
      hints: [
        'comptime fib(10) means evaluate fib at compile time',
        'The recursion unrolls completely during compilation',
        'The binary contains only the final value 55'
      ]
    },
    {
      id: 'zig-cap-20',
      title: 'Full Pipeline: Parse, Process, Serialize',
      type: 'write-function',
      difficulty: 'advanced',
      instructions: 'Write `processCSV` that parses a CSV line "name,score", splits it, parses score as u32, doubles it, and writes "name:doubled_score" to a provided buffer. Return the written slice or an error.',
      skeleton: `const std = @import("std");

pub fn processCSV(line: []const u8, out: []u8) ![]u8 {
    // split on comma, parse score, double it, write "name:doubled" to out
}`,
      solution: `const std = @import("std");

pub fn processCSV(line: []const u8, out: []u8) ![]u8 {
    var iter = std.mem.splitScalar(u8, line, ',');
    const name = iter.next() orelse return error.InvalidFormat;
    const score_str = iter.next() orelse return error.InvalidFormat;
    const score = try std.fmt.parseInt(u32, score_str, 10);
    const doubled = score * 2;
    return std.fmt.bufPrint(out, "{s}:{d}", .{ name, doubled });
}`,
      hints: [
        'std.mem.splitScalar returns an iterator; call .next() to advance',
        'Use orelse return error.X to handle missing fields',
        'std.fmt.parseInt parses a string to integer; std.fmt.bufPrint writes to a buffer'
      ]
    },
  ],
};
