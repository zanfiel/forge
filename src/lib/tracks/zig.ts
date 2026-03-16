import type { Track } from '../../stores/app.svelte.ts';

export const track: Track = {
  id: 'zig',
  name: 'Zig',
  language: 'zig',
  monacoLang: 'zig',
  icon: '⚡',
  description: 'Low-level control without the baggage. Systems programming for the modern era.',
  sections: [
    // ─── Section 1: Variables & Types ─────────────
    {
      id: 'zig-variables',
      title: '1. Variables & Types',
      explanation: `## Variables & Types

Zig is explicit about everything. No hidden allocations, no hidden control flow. You say what you mean.

\`\`\`zig
const name = "Zan";           // immutable (preferred)
var count: u32 = 0;            // mutable (only when needed)
count += 1;
\`\`\`

**Zig prefers \`const\` over \`var\`.** If you don't need to mutate it, use \`const\`. The compiler will tell you if you use \`var\` unnecessarily.

**Basic types:**
\`\`\`zig
const a: u8 = 255;            // unsigned 8-bit (0..255)
const b: i32 = -42;           // signed 32-bit
const c: f64 = 3.14;          // 64-bit float
const d: bool = true;
const e: u8 = 'A';            // characters are just u8 values
\`\`\`

**\`comptime\` -- Zig's superpower:**
\`\`\`zig
// comptime values are known at compile time
const max_size = comptime blk: {
    break :blk 1024 * 1024;
};

// comptime parameters enable generic-like behavior
fn maxOf(comptime T: type, a: T, b: T) T {
    return if (a > b) a else b;
}
\`\`\`

**Explicit casting:**
\`\`\`zig
const x: u32 = 10;
const y: u64 = @intCast(x);   // explicit, never implicit
\`\`\`

There are no implicit type coercions in Zig. You always say exactly what you want.`,
      exercises: [
        {
          id: 'zig-var-1',
          title: 'Const, Var & Types',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'zig',
          goal: 'Declare variables with the correct mutability and types. Zig prefers const over var.',
          skeleton: `const std = @import("std");

pub fn main() void {
    // Immutable string (use const)
    __BLANK__ greeting = "Hello, Zig!";

    // Mutable counter (needs to change)
    __BLANK__ count: __BLANK__ = 0;

    // Increment count twice
    count __BLANK__ 1;
    count += 1;

    // A boolean flag
    __BLANK__ debug: bool = true;

    // Compile-time constant
    const max_retries = __BLANK__ 5;

    std.debug.print("{s} count={d} debug={} max={d}\\n", .{
        greeting, count, debug, max_retries,
    });
}`,
          solution: `const std = @import("std");

pub fn main() void {
    const greeting = "Hello, Zig!";

    var count: u32 = 0;

    count += 1;
    count += 1;

    const debug: bool = true;

    const max_retries = comptime 5;

    std.debug.print("{s} count={d} debug={} max={d}\\n", .{
        greeting, count, debug, max_retries,
    });
}`,
          hints: [
            '`const` for values that never change, `var` for values that do. Zig will error if you use `var` but never mutate.',
            '`u32` is an unsigned 32-bit integer. `+=` works for incrementing. `comptime` marks a compile-time known value.',
            'Fill in: `const`, `var`, `u32`, `+=`, `const`, `comptime`.',
          ],
          concepts: ['const', 'var', 'u32', 'bool', 'comptime', 'std.debug.print'],
        },
        {
          id: 'zig-var-2',
          title: 'Type Coercion & Casting',
          type: 'fix-bug',
          difficulty: 'beginner',
          language: 'zig',
          goal: 'Fix the type errors. Zig never coerces types implicitly -- you must use explicit builtins like @intCast, @floatFromInt, and @truncate.',
          skeleton: `const std = @import("std");

pub fn main() void {
    const small: u8 = 200;

    // BUG: Zig won't implicitly widen u8 to u32
    const big: u32 = small;

    // BUG: Zig won't implicitly convert integer to float
    const ratio: f64 = big / 100;

    // BUG: Zig won't implicitly narrow u32 to u8
    const back: u8 = big;

    std.debug.print("big={d} ratio={d:.2} back={d}\\n", .{ big, ratio, back });
}`,
          solution: `const std = @import("std");

pub fn main() void {
    const small: u8 = 200;

    const big: u32 = @intCast(small);

    const ratio: f64 = @floatFromInt(big) / 100.0;

    const back: u8 = @truncate(big);

    std.debug.print("big={d} ratio={d:.2} back={d}\\n", .{ big, ratio, back });
}`,
          hints: [
            'Zig requires explicit conversions. `@intCast` converts between integer types when widening is safe.',
            '`@floatFromInt` converts an integer to a float. You also need `100.0` (a float literal) instead of `100` for float division.',
            '`@truncate` narrows a larger integer type to a smaller one. It discards the upper bits.',
          ],
          concepts: ['@intCast', '@floatFromInt', '@truncate', 'explicit casting', 'no implicit coercion'],
        },
        {
          id: 'zig-var-3',
          title: 'Comptime Powers',
          type: 'predict-output',
          difficulty: 'intermediate',
          language: 'zig',
          goal: 'Read the code and predict what it prints. Think about what comptime does vs runtime.',
          skeleton: `const std = @import("std");

fn fibonacci(comptime n: u32) u32 {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

pub fn main() void {
    // These are computed at compile time!
    const fib5 = comptime fibonacci(5);
    const fib8 = comptime fibonacci(8);

    const arr = [_]u32{ fib5, fib8, fib5 + fib8 };

    for (arr) |val| {
        std.debug.print("{d} ", .{val});
    }
    std.debug.print("\\n", .{});
}

// What does this program print?
// Output: ???`,
          solution: `const std = @import("std");

fn fibonacci(comptime n: u32) u32 {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

pub fn main() void {
    const fib5 = comptime fibonacci(5);
    const fib8 = comptime fibonacci(8);

    const arr = [_]u32{ fib5, fib8, fib5 + fib8 };

    for (arr) |val| {
        std.debug.print("{d} ", .{val});
    }
    std.debug.print("\\n", .{});
}

// Output: 5 21 26`,
          hints: [
            'fibonacci(5) = 5 (sequence: 0, 1, 1, 2, 3, 5). fibonacci(8) = 21 (sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21).',
            '`comptime` means both values are fully computed at compile time. The binary contains the constants 5 and 21 directly.',
            'The array is [5, 21, 26]. The for loop prints each separated by a space: "5 21 26".',
          ],
          concepts: ['comptime functions', 'compile-time evaluation', 'array literal', 'for loop', 'anonymous struct .{}'],
        },
      ],
    },

    // ─── Section 2: Functions & Error Handling ────
    {
      id: 'zig-functions',
      title: '2. Functions & Error Handling',
      explanation: `## Functions & Error Handling

Zig functions are clear and explicit. Parameters are always immutable:

\`\`\`zig
fn add(a: i32, b: i32) i32 {
    return a + b;
}

fn greet(name: []const u8) void {
    std.debug.print("Hello, {s}!\\n", .{name});
}
\`\`\`

**Error unions** are Zig's killer feature for error handling. A function either returns a value or an error:

\`\`\`zig
const FileError = error{
    NotFound,
    PermissionDenied,
    Timeout,
};

fn openConfig(path: []const u8) FileError!Config {
    // The ! means "this function can fail with FileError"
    if (!fileExists(path)) return error.NotFound;
    return Config{ .path = path };
}
\`\`\`

**\`try\`** is the equivalent of Rust's \`?\` -- it unwraps or returns the error:
\`\`\`zig
fn loadApp() !void {
    const cfg = try openConfig("/etc/app.conf");  // returns error if it fails
    try startServer(cfg);
}
\`\`\`

**\`catch\`** handles errors inline:
\`\`\`zig
const cfg = openConfig("app.conf") catch |err| {
    std.debug.print("Failed: {any}\\n", .{err});
    return;
};
\`\`\`

**\`if\` with error unions:**
\`\`\`zig
if (openConfig("app.conf")) |cfg| {
    // success: use cfg
} else |err| {
    // failure: handle err
}
\`\`\`

There are no exceptions, no hidden control flow. Every error path is visible in the code.`,
      exercises: [
        {
          id: 'zig-fn-1',
          title: 'Functions & Return Types',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'zig',
          goal: 'Complete the functions with correct signatures and return types.',
          skeleton: `const std = @import("std");

// Returns the larger of two values
fn max_of(a: i32, b: i32) __BLANK__ {
    return if (a > b) __BLANK__ else __BLANK__;
}

// Returns true if the slice starts with the given prefix
fn startsWith(haystack: []const u8, prefix: []const u8) __BLANK__ {
    if (prefix.len > haystack.len) return __BLANK__;
    return std.mem.eql(u8, haystack[0..prefix.len], prefix);
}

// Returns nothing (logs a message)
fn log_msg(level: []const u8, msg: []const u8) __BLANK__ {
    std.debug.print("[{s}] {s}\\n", .{ level, msg });
}

pub fn main() void {
    std.debug.print("max: {d}\\n", .{max_of(10, 20)});
    std.debug.print("starts: {}\\n", .{startsWith("hello world", "hello")});
    log_msg("INFO", "server started");
}`,
          solution: `const std = @import("std");

fn max_of(a: i32, b: i32) i32 {
    return if (a > b) a else b;
}

fn startsWith(haystack: []const u8, prefix: []const u8) bool {
    if (prefix.len > haystack.len) return false;
    return std.mem.eql(u8, haystack[0..prefix.len], prefix);
}

fn log_msg(level: []const u8, msg: []const u8) void {
    std.debug.print("[{s}] {s}\\n", .{ level, msg });
}

pub fn main() void {
    std.debug.print("max: {d}\\n", .{max_of(10, 20)});
    std.debug.print("starts: {}\\n", .{startsWith("hello world", "hello")});
    log_msg("INFO", "server started");
}`,
          hints: [
            'Return types go after the parameter list: `fn name(params) ReturnType`. `i32` for integers, `bool` for booleans, `void` for nothing.',
            '`if` is an expression in Zig just like Rust. `if (a > b) a else b` returns the chosen branch.',
            'Fill in: `i32`, `a`, `b`, `bool`, `false`, `void`.',
          ],
          concepts: ['function signatures', 'return types', 'if expression', 'void', 'bool', '[]const u8'],
        },
        {
          id: 'zig-fn-2',
          title: 'Error Unions & Try',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'zig',
          goal: 'Write a function `parsePort` that takes a []const u8 string and returns a u16 port number. Return error.InvalidPort if the value is not a valid number, and error.OutOfRange if the number is 0 or above 65535. Use std.fmt.parseInt for parsing.',
          skeleton: `const std = @import("std");

const PortError = error{
    InvalidPort,
    OutOfRange,
};

// Write parsePort here
// Signature: fn parsePort(input: []const u8) PortError!u16


pub fn main() void {
    const cases = [_][]const u8{ "8080", "0", "99999", "abc", "443" };

    for (cases) |input| {
        if (parsePort(input)) |port| {
            std.debug.print("{s} -> port {d}\\n", .{ input, port });
        } else |err| {
            std.debug.print("{s} -> error: {any}\\n", .{ input, err });
        }
    }
}`,
          solution: `const std = @import("std");

const PortError = error{
    InvalidPort,
    OutOfRange,
};

fn parsePort(input: []const u8) PortError!u16 {
    const value = std.fmt.parseInt(u32, input, 10) catch return error.InvalidPort;
    if (value == 0 or value > 65535) return error.OutOfRange;
    return @truncate(value);
}

pub fn main() void {
    const cases = [_][]const u8{ "8080", "0", "99999", "abc", "443" };

    for (cases) |input| {
        if (parsePort(input)) |port| {
            std.debug.print("{s} -> port {d}\\n", .{ input, port });
        } else |err| {
            std.debug.print("{s} -> error: {any}\\n", .{ input, err });
        }
    }
}`,
          hints: [
            '`std.fmt.parseInt(u32, input, 10)` parses a base-10 integer. It returns an error union, so use `catch` to convert failures.',
            '`catch return error.InvalidPort` returns your custom error if parsing fails. Then check the range with `if`.',
            'Use `@truncate` to safely narrow the validated u32 to u16 after confirming it fits in range.',
          ],
          concepts: ['error union', 'custom error set', 'catch', 'std.fmt.parseInt', '@truncate', 'if/else with error union'],
        },
        {
          id: 'zig-fn-3',
          title: 'Error Propagation with Try',
          type: 'fix-bug',
          difficulty: 'intermediate',
          language: 'zig',
          goal: 'Fix the error handling. The code tries to chain operations that can fail, but it is missing `try` keywords and has wrong return types.',
          skeleton: `const std = @import("std");

const AppError = error{
    InvalidHost,
    InvalidPort,
    ConnectionFailed,
};

fn validateHost(host: []const u8) AppError![]const u8 {
    if (host.len == 0) return error.InvalidHost;
    return host;
}

fn validatePort(port_str: []const u8) AppError!u16 {
    const port = std.fmt.parseInt(u16, port_str, 10) catch return error.InvalidPort;
    if (port < 1) return error.InvalidPort;
    return port;
}

// BUG: return type doesn't account for errors
fn buildEndpoint(host: []const u8, port_str: []const u8) []const u8 {
    // BUG: missing try on fallible calls
    const h = validateHost(host);
    const p = validatePort(port_str);
    _ = p;
    return h;
}

pub fn main() void {
    // BUG: not handling the error from buildEndpoint
    const ep = buildEndpoint("localhost", "8080");
    std.debug.print("endpoint host: {s}\\n", .{ep});
}`,
          solution: `const std = @import("std");

const AppError = error{
    InvalidHost,
    InvalidPort,
    ConnectionFailed,
};

fn validateHost(host: []const u8) AppError![]const u8 {
    if (host.len == 0) return error.InvalidHost;
    return host;
}

fn validatePort(port_str: []const u8) AppError!u16 {
    const port = std.fmt.parseInt(u16, port_str, 10) catch return error.InvalidPort;
    if (port < 1) return error.InvalidPort;
    return port;
}

fn buildEndpoint(host: []const u8, port_str: []const u8) AppError![]const u8 {
    const h = try validateHost(host);
    const p = try validatePort(port_str);
    _ = p;
    return h;
}

pub fn main() void {
    const ep = buildEndpoint("localhost", "8080") catch |err| {
        std.debug.print("Failed: {any}\\n", .{err});
        return;
    };
    std.debug.print("endpoint host: {s}\\n", .{ep});
}`,
          hints: [
            'If a function calls other functions that can fail, its return type must also be an error union: `AppError![]const u8`.',
            '`try` unwraps the success value or immediately returns the error to the caller. Add `try` before each fallible call.',
            'In `main` (which returns `void`, not an error union), use `catch` to handle the error instead of `try`.',
          ],
          concepts: ['try', 'error propagation', 'error union return type', 'catch in main', 'fallible functions'],
        },
      ],
    },

    // ─── Section 3: Slices & Arrays ──────────────
    {
      id: 'zig-slices',
      title: '3. Slices & Arrays',
      explanation: `## Slices & Arrays

Zig has three distinct sequence types. Understanding the difference is essential:

**Arrays** have a compile-time known length:
\`\`\`zig
const nums = [5]u32{ 10, 20, 30, 40, 50 };    // [5]u32
const inferred = [_]u32{ 10, 20, 30 };          // [3]u32 (compiler counts)
\`\`\`

**Slices** are a pointer + length, referencing part of an array (like Go slices or Rust slices):
\`\`\`zig
const arr = [_]u32{ 1, 2, 3, 4, 5 };
const slice: []const u32 = arr[1..4];  // {2, 3, 4}
// slice.ptr  -- pointer to start
// slice.len  -- number of elements (3)
\`\`\`

**Sentinel-terminated** sequences have a known termination value (strings are \`[:0]const u8\`):
\`\`\`zig
const hello: [:0]const u8 = "hello";  // null-terminated for C interop
// hello.len == 5, but hello[5] == 0
\`\`\`

**Iterating:**
\`\`\`zig
for (arr) |value| {
    std.debug.print("{d} ", .{value});
}

// With index:
for (arr, 0..) |value, i| {
    std.debug.print("[{d}]={d} ", .{i, value});
}
\`\`\`

**Key principle:** Slices don't own data. They borrow a view into existing memory. This is how Zig avoids hidden allocations -- you always know who owns what.`,
      exercises: [
        {
          id: 'zig-slice-1',
          title: 'Arrays & Slicing',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'zig',
          goal: 'Complete the code to work with arrays and slices. Pay attention to the difference between owned arrays and borrowed slices.',
          skeleton: `const std = @import("std");

pub fn main() void {
    // Fixed-size array (compiler infers length)
    const ports = [__BLANK__]u16{ 22, 80, 443, 8080, 4200 };

    // Get the length
    const count = ports.__BLANK__;
    std.debug.print("ports: {d} entries\\n", .{count});

    // Slice the middle 3 elements (indices 1, 2, 3)
    const middle: []const u16 = ports[__BLANK__];

    // Iterate the slice
    for (__BLANK__) |port| {
        std.debug.print("{d} ", .{port});
    }
    std.debug.print("\\n", .{});

    // Iterate with index
    for (ports, __BLANK__) |port, i| {
        if (port == 443) {
            std.debug.print("HTTPS found at index {d}\\n", .{i});
        }
    }
}`,
          solution: `const std = @import("std");

pub fn main() void {
    const ports = [_]u16{ 22, 80, 443, 8080, 4200 };

    const count = ports.len;
    std.debug.print("ports: {d} entries\\n", .{count});

    const middle: []const u16 = ports[1..4];

    for (middle) |port| {
        std.debug.print("{d} ", .{port});
    }
    std.debug.print("\\n", .{});

    for (ports, 0..) |port, i| {
        if (port == 443) {
            std.debug.print("HTTPS found at index {d}\\n", .{i});
        }
    }
}`,
          hints: [
            '`[_]` lets the compiler infer array length. `.len` gives the number of elements.',
            'Slicing uses `array[start..end]` where end is exclusive. `ports[1..4]` gives elements at indices 1, 2, 3.',
            'Fill in: `_`, `len`, `1..4`, `middle`, `0..`.',
          ],
          concepts: ['array literal', '[_] inference', '.len', 'slice syntax', 'for loop', 'for with index'],
        },
        {
          id: 'zig-slice-2',
          title: 'Slice Operations',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'zig',
          goal: 'Write a function `contains` that takes a []const u8 slice (haystack) and a u8 value (needle), and returns true if the needle exists in the haystack. Then write a function `countMatching` that takes a []const i32 slice and a threshold i32, and returns how many elements are greater than the threshold.',
          skeleton: `const std = @import("std");

// Write contains here
// fn contains(haystack: []const u8, needle: u8) bool


// Write countMatching here
// fn countMatching(values: []const i32, threshold: i32) usize


pub fn main() void {
    const data = [_]u8{ 'h', 'e', 'l', 'l', 'o' };
    std.debug.print("has 'l': {}\\n", .{contains(&data, 'l')});
    std.debug.print("has 'z': {}\\n", .{contains(&data, 'z')});

    const scores = [_]i32{ 45, 82, 67, 93, 51, 88, 72 };
    std.debug.print("above 70: {d}\\n", .{countMatching(&scores, 70)});
    std.debug.print("above 90: {d}\\n", .{countMatching(&scores, 90)});
}`,
          solution: `const std = @import("std");

fn contains(haystack: []const u8, needle: u8) bool {
    for (haystack) |byte| {
        if (byte == needle) return true;
    }
    return false;
}

fn countMatching(values: []const i32, threshold: i32) usize {
    var count: usize = 0;
    for (values) |v| {
        if (v > threshold) count += 1;
    }
    return count;
}

pub fn main() void {
    const data = [_]u8{ 'h', 'e', 'l', 'l', 'o' };
    std.debug.print("has 'l': {}\\n", .{contains(&data, 'l')});
    std.debug.print("has 'z': {}\\n", .{contains(&data, 'z')});

    const scores = [_]i32{ 45, 82, 67, 93, 51, 88, 72 };
    std.debug.print("above 70: {d}\\n", .{countMatching(&scores, 70)});
    std.debug.print("above 90: {d}\\n", .{countMatching(&scores, 90)});
}`,
          hints: [
            'Iterate with `for (haystack) |byte|`. Compare each element to the needle and return true on first match.',
            'For counting, declare `var count: usize = 0`, loop through, and increment when the condition is met.',
            '`usize` is the natural type for counts and indices in Zig. Return `false` after the loop if no match is found.',
          ],
          concepts: ['slice parameter', 'for loop', 'linear search', 'usize', 'early return'],
        },
        {
          id: 'zig-slice-3',
          title: 'Sentinel-Terminated Strings',
          type: 'predict-output',
          difficulty: 'intermediate',
          language: 'zig',
          goal: 'Read the code and predict what it prints. Pay attention to how Zig string types, lengths, and sentinel termination work.',
          skeleton: `const std = @import("std");

pub fn main() void {
    const literal = "hello";
    const explicit: [:0]const u8 = "world";

    std.debug.print("len1={d} len2={d}\\n", .{ literal.len, explicit.len });

    // Slicing a string
    const sub = literal[1..4];
    std.debug.print("sub={s} sub_len={d}\\n", .{ sub, sub.len });

    // Comparing strings
    const a: []const u8 = "zig";
    const b: []const u8 = "zig";
    const same = std.mem.eql(u8, a, b);
    std.debug.print("same={}\\n", .{same});

    // Concatenation at comptime
    const full = "hello" ++ " " ++ "world";
    std.debug.print("full={s} full_len={d}\\n", .{ full, full.len });
}

// What does this program print?
// Line 1: ???
// Line 2: ???
// Line 3: ???
// Line 4: ???`,
          solution: `const std = @import("std");

pub fn main() void {
    const literal = "hello";
    const explicit: [:0]const u8 = "world";

    std.debug.print("len1={d} len2={d}\\n", .{ literal.len, explicit.len });

    const sub = literal[1..4];
    std.debug.print("sub={s} sub_len={d}\\n", .{ sub, sub.len });

    const a: []const u8 = "zig";
    const b: []const u8 = "zig";
    const same = std.mem.eql(u8, a, b);
    std.debug.print("same={}\\n", .{same});

    const full = "hello" ++ " " ++ "world";
    std.debug.print("full={s} full_len={d}\\n", .{ full, full.len });
}

// Line 1: len1=5 len2=5
// Line 2: sub=ell sub_len=3
// Line 3: same=true
// Line 4: full=hello world full_len=11`,
          hints: [
            '`.len` does not include the null terminator. "hello" has 5 characters, "world" has 5 characters.',
            'Slicing "hello"[1..4] gives bytes at indices 1, 2, 3 which is "ell" with length 3.',
            '`++` is comptime string concatenation. "hello" ++ " " ++ "world" = "hello world" with length 11.',
          ],
          concepts: ['string length', 'sentinel termination', 'slice indexing', 'std.mem.eql', 'comptime concatenation ++'],
        },
      ],
    },

    // ─── Section 4: Structs & Enums ──────────────
    {
      id: 'zig-structs',
      title: '4. Structs & Enums',
      explanation: `## Structs & Enums

**Structs** in Zig are simple, powerful, and have no hidden behavior:

\`\`\`zig
const Server = struct {
    name: []const u8,
    port: u16,
    online: bool,

    // Methods are just functions in the struct namespace
    pub fn address(self: Server) void {
        std.debug.print("{s}:{d}", .{ self.name, self.port });
    }

    // "Constructor" convention -- no special syntax
    pub fn init(name: []const u8, port: u16) Server {
        return .{ .name = name, .port = port, .online = false };
    }
};

const srv = Server.init("rocky", 4200);
srv.address();
\`\`\`

**Enums:**
\`\`\`zig
const Status = enum {
    starting,
    running,
    stopped,
    failed,
};

const s: Status = .running;
\`\`\`

**Tagged unions** combine enums with data (like Rust enums):
\`\`\`zig
const Command = union(enum) {
    ping: void,
    echo: []const u8,
    move_to: struct { x: i32, y: i32 },
};

const cmd = Command{ .echo = "hello" };
switch (cmd) {
    .ping => std.debug.print("pong", .{}),
    .echo => |msg| std.debug.print("{s}", .{msg}),
    .move_to => |pos| std.debug.print("{d},{d}", .{pos.x, pos.y}),
}
\`\`\`

Zig structs have no inheritance, no virtual methods, no hidden vtables. Composition over inheritance, always.`,
      exercises: [
        {
          id: 'zig-struct-1',
          title: 'Define a Struct',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'zig',
          goal: 'Define a Config struct with an init method and a display method.',
          skeleton: `const std = @import("std");

const Config = __BLANK__ {
    host: []const u8,
    port: __BLANK__,
    debug: __BLANK__,

    pub fn init(host: []const u8, port: u16) Config {
        return __BLANK__{ .host = host, .port = port, .debug = false };
    }

    pub fn display(__BLANK__: Config) void {
        const mode = if (self.debug) "DEBUG" else "PROD";
        std.debug.print("{s}:{d} [{s}]\\n", __BLANK__{ self.host, self.port, mode });
    }
};

pub fn main() void {
    var cfg = Config.init("0.0.0.0", 4200);
    cfg.debug = true;
    cfg.__BLANK__();
}`,
          solution: `const std = @import("std");

const Config = struct {
    host: []const u8,
    port: u16,
    debug: bool,

    pub fn init(host: []const u8, port: u16) Config {
        return .{ .host = host, .port = port, .debug = false };
    }

    pub fn display(self: Config) void {
        const mode = if (self.debug) "DEBUG" else "PROD";
        std.debug.print("{s}:{d} [{s}]\\n", .{ self.host, self.port, mode });
    }
};

pub fn main() void {
    var cfg = Config.init("0.0.0.0", 4200);
    cfg.debug = true;
    cfg.display();
}`,
          hints: [
            '`struct` defines the type. Fields use standard types: `u16` for port, `bool` for flags.',
            'The anonymous struct literal `.{ ... }` is how you return struct instances. Methods take `self: Config` as the first parameter.',
            'Fill in: `struct`, `u16`, `bool`, `.`, `self`, `.`, `display`.',
          ],
          concepts: ['struct', 'init convention', 'self parameter', 'anonymous struct literal', 'method call'],
        },
        {
          id: 'zig-struct-2',
          title: 'Enums & Switch',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'zig',
          goal: 'Define an enum `LogLevel` with variants debug, info, warn, and err. Write a function `levelName` that takes a LogLevel and returns the string name (e.g., "DEBUG", "INFO"). Write a function `isActionable` that returns true for warn and err levels.',
          skeleton: `const std = @import("std");

// Define LogLevel enum here

// Write levelName here
// fn levelName(level: LogLevel) []const u8

// Write isActionable here
// fn isActionable(level: LogLevel) bool


pub fn main() void {
    const levels = [_]LogLevel{ .debug, .info, .warn, .err };

    for (levels) |lvl| {
        const name = levelName(lvl);
        const action = isActionable(lvl);
        std.debug.print("{s}: actionable={}\\n", .{ name, action });
    }
}`,
          solution: `const std = @import("std");

const LogLevel = enum {
    debug,
    info,
    warn,
    err,
};

fn levelName(level: LogLevel) []const u8 {
    return switch (level) {
        .debug => "DEBUG",
        .info => "INFO",
        .warn => "WARN",
        .err => "ERROR",
    };
}

fn isActionable(level: LogLevel) bool {
    return switch (level) {
        .warn, .err => true,
        else => false,
    };
}

pub fn main() void {
    const levels = [_]LogLevel{ .debug, .info, .warn, .err };

    for (levels) |lvl| {
        const name = levelName(lvl);
        const action = isActionable(lvl);
        std.debug.print("{s}: actionable={}\\n", .{ name, action });
    }
}`,
          hints: [
            'Define with `const LogLevel = enum { debug, info, warn, err };`. Use `.debug` shorthand when the type is known.',
            '`switch` is an expression in Zig. `return switch (level) { .debug => "DEBUG", ... };` returns from each arm.',
            'Multiple enum values can share a branch: `.warn, .err => true`. Use `else => false` for the rest.',
          ],
          concepts: ['enum', 'switch expression', 'enum shorthand .variant', 'multiple match arms', 'else in switch'],
        },
        {
          id: 'zig-struct-3',
          title: 'Tagged Unions',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'zig',
          goal: 'Define a tagged union `Shape` with three variants: circle (holds radius as f64), rectangle (holds width and height as a struct), and triangle (holds base and height as a struct). Write a function `area` that computes the area for any Shape.',
          skeleton: `const std = @import("std");
const math = std.math;

// Define the Shape tagged union here


// Write the area function here
// fn area(shape: Shape) f64


pub fn main() void {
    const shapes = [_]Shape{
        .{ .circle = 5.0 },
        .{ .rectangle = .{ .width = 4.0, .height = 6.0 } },
        .{ .triangle = .{ .base = 3.0, .height = 8.0 } },
    };

    for (shapes) |s| {
        std.debug.print("area: {d:.2}\\n", .{area(s)});
    }
    // circle: 78.54
    // rectangle: 24.00
    // triangle: 12.00
}`,
          solution: `const std = @import("std");
const math = std.math;

const Shape = union(enum) {
    circle: f64,
    rectangle: struct { width: f64, height: f64 },
    triangle: struct { base: f64, height: f64 },
};

fn area(shape: Shape) f64 {
    return switch (shape) {
        .circle => |r| math.pi * r * r,
        .rectangle => |rect| rect.width * rect.height,
        .triangle => |tri| 0.5 * tri.base * tri.height,
    };
}

pub fn main() void {
    const shapes = [_]Shape{
        .{ .circle = 5.0 },
        .{ .rectangle = .{ .width = 4.0, .height = 6.0 } },
        .{ .triangle = .{ .base = 3.0, .height = 8.0 } },
    };

    for (shapes) |s| {
        std.debug.print("area: {d:.2}\\n", .{area(s)});
    }
}`,
          hints: [
            '`union(enum)` creates a tagged union. Each variant can hold different data: `circle: f64`, `rectangle: struct { ... }`.',
            'Switch on a tagged union captures the payload: `.circle => |r|` gives you the radius. `.rectangle => |rect|` gives the struct.',
            'Use `math.pi` for pi. Circle: pi * r * r. Rectangle: width * height. Triangle: 0.5 * base * height.',
          ],
          concepts: ['tagged union', 'union(enum)', 'switch with capture', 'anonymous struct fields', 'math.pi'],
        },
      ],
    },

    // ─── Section 5: Allocators & Memory ──────────
    {
      id: 'zig-allocators',
      title: '5. Allocators & Memory',
      explanation: `## Allocators & Memory

Zig's most distinctive feature: **no default allocator.** Every allocation is explicit. You pass an allocator to any function that needs heap memory.

**The allocator interface:**
\`\`\`zig
const std = @import("std");

// General purpose allocator (checks for leaks in debug mode)
var gpa = std.heap.GeneralPurposeAllocator(.{}){};
defer _ = gpa.deinit();          // reports leaks when scope exits
const allocator = gpa.allocator();

// Allocate a single item
const ptr = try allocator.create(u32);
defer allocator.destroy(ptr);    // always pair create with destroy
ptr.* = 42;

// Allocate a slice
const buf = try allocator.alloc(u8, 256);
defer allocator.free(buf);       // always pair alloc with free
\`\`\`

**\`defer\`** runs code when the current scope exits. This is how Zig ensures cleanup:
\`\`\`zig
fn processFile(path: []const u8) !void {
    const file = try std.fs.cwd().openFile(path, .{});
    defer file.close();  // guaranteed to run, even on error

    // ... use file ...
}  // file.close() runs here
\`\`\`

**\`errdefer\`** only runs if the function returns an error:
\`\`\`zig
fn createBuffer(allocator: Allocator, size: usize) ![]u8 {
    const buf = try allocator.alloc(u8, size);
    errdefer allocator.free(buf);  // only frees if we return an error below

    try validate(buf);  // if this fails, buf is freed
    return buf;         // if we succeed, caller owns buf
}
\`\`\`

**Available allocators:**
- \`std.heap.GeneralPurposeAllocator\` -- debug-friendly, leak-checking
- \`std.heap.page_allocator\` -- raw OS pages, for large allocations
- \`std.heap.FixedBufferAllocator\` -- allocates from a stack buffer, zero overhead
- \`std.heap.ArenaAllocator\` -- bulk-free everything at once

No garbage collector. No reference counting by default. You control every byte.`,
      exercises: [
        {
          id: 'zig-alloc-1',
          title: 'Allocator Basics & Defer',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'zig',
          goal: 'Complete the code that uses an allocator to create a dynamic list and ensures cleanup with defer.',
          skeleton: `const std = @import("std");

pub fn main() !void {
    // Set up the general purpose allocator
    var gpa = std.heap.__BLANK__(.{}){};
    defer _ = gpa.__BLANK__();
    const allocator = gpa.allocator();

    // Create a dynamic array list
    var list = std.ArrayList(u32).__BLANK__(allocator);
    __BLANK__ list.deinit();

    // Append some values
    try list.append(10);
    try list.append(20);
    try list.append(30);
    try list.append(40);

    // Iterate and print
    for (list.__BLANK__) |val| {
        std.debug.print("{d} ", .{val});
    }
    std.debug.print("\\ncount: {d}\\n", .{list.items.len});
}`,
          solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var list = std.ArrayList(u32).init(allocator);
    defer list.deinit();

    try list.append(10);
    try list.append(20);
    try list.append(30);
    try list.append(40);

    for (list.items) |val| {
        std.debug.print("{d} ", .{val});
    }
    std.debug.print("\\ncount: {d}\\n", .{list.items.len});
}`,
          hints: [
            '`GeneralPurposeAllocator` is the standard debug allocator. `.deinit()` checks for leaks when the scope ends.',
            '`std.ArrayList(u32).init(allocator)` creates the list. `defer list.deinit()` ensures it is freed.',
            'Fill in: `GeneralPurposeAllocator`, `deinit`, `init`, `defer`, `items`.',
          ],
          concepts: ['GeneralPurposeAllocator', 'defer', 'ArrayList', 'init/deinit', 'explicit allocation'],
        },
        {
          id: 'zig-alloc-2',
          title: 'Arena Allocator & Errdefer',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'zig',
          goal: 'Write a function `buildGreetings` that takes an allocator and a slice of names ([]const []const u8), and returns an allocated slice of greeting strings. Use std.fmt.allocPrint to format each greeting as "Hello, {name}!". Use errdefer to clean up partial allocations if any formatting fails. The caller is responsible for freeing the returned slice and each string in it.',
          skeleton: `const std = @import("std");

// Write buildGreetings here
// fn buildGreetings(allocator: std.mem.Allocator, names: []const []const u8) ![][]const u8


pub fn main() !void {
    // Use an arena allocator backed by the page allocator
    var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
    defer arena.deinit();  // frees everything at once
    const allocator = arena.allocator();

    const names = [_][]const u8{ "Zan", "Rocky", "Pangolin" };
    const greetings = try buildGreetings(allocator, &names);

    for (greetings) |g| {
        std.debug.print("{s}\\n", .{g});
    }
    // Hello, Zan!
    // Hello, Rocky!
    // Hello, Pangolin!
}`,
          solution: `const std = @import("std");

fn buildGreetings(allocator: std.mem.Allocator, names: []const []const u8) ![][]const u8 {
    const result = try allocator.alloc([]const u8, names.len);
    errdefer allocator.free(result);

    var initialized: usize = 0;
    errdefer for (result[0..initialized]) |g| {
        allocator.free(g);
    };

    for (names, 0..) |name, i| {
        result[i] = try std.fmt.allocPrint(allocator, "Hello, {s}!", .{name});
        initialized += 1;
    }

    return result;
}

pub fn main() !void {
    var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
    defer arena.deinit();
    const allocator = arena.allocator();

    const names = [_][]const u8{ "Zan", "Rocky", "Pangolin" };
    const greetings = try buildGreetings(allocator, &names);

    for (greetings) |g| {
        std.debug.print("{s}\\n", .{g});
    }
}`,
          hints: [
            'Allocate the result slice with `allocator.alloc([]const u8, names.len)`. Use `errdefer allocator.free(result)` immediately after.',
            '`std.fmt.allocPrint(allocator, "Hello, {s}!", .{name})` formats and allocates a string. Track how many you have initialized for cleanup.',
            '`errdefer` runs only on error return. Track `initialized` count so you only free strings that were actually allocated if a later one fails.',
          ],
          concepts: ['ArenaAllocator', 'errdefer', 'allocPrint', 'alloc/free', 'partial cleanup', 'ownership transfer'],
        },
      ],
    },
  ],
};
