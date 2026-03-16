import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-err',
  title: '13. Error Handling',
  language: 'zig',
  explanation: `Zig uses error sets and error unions instead of exceptions. An error set is a set of named errors:

\`\`\`zig
const FileError = error{ NotFound, PermissionDenied };
\`\`\`

An error union \`!T\` means "either an error or a T":
\`\`\`zig
fn openFile(path: []const u8) FileError![]u8 { ... }
\`\`\`

**try** propagates an error up to the caller:
\`\`\`zig
const data = try openFile("foo.txt");
\`\`\`

**catch** handles an error inline:
\`\`\`zig
const data = openFile("foo.txt") catch |err| {
    std.debug.print("Error: {}\\n", .{err});
    return;
};
\`\`\`

**errdefer** runs cleanup only when a function exits with an error:
\`\`\`zig
errdefer allocator.free(buf);
\`\`\`

**anyerror** is the global error set (all errors). Use specific sets when possible. Functions can return \`anyerror!T\` to accept any error type.`,
  exercises: [
    {
      id: 'zig-err-1',
      title: 'Define an error set',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Define an error set and return an error from a function.',
      skeleton: `const std = @import("std");

const MathError = error{
    _____,
    Overflow,
};

fn divide(a: i32, b: i32) MathError!i32 {
    if (b == 0) return MathError.DivisionByZero;
    return @divTrunc(a, b);
}

pub fn main() void {
    const result = divide(10, 0) catch |err| {
        std.debug.print("Error: {}\\n", .{err});
        return;
    };
    std.debug.print("{d}\\n", .{result});
}`,
      solution: `const std = @import("std");

const MathError = error{
    DivisionByZero,
    Overflow,
};

fn divide(a: i32, b: i32) MathError!i32 {
    if (b == 0) return MathError.DivisionByZero;
    return @divTrunc(a, b);
}

pub fn main() void {
    const result = divide(10, 0) catch |err| {
        std.debug.print("Error: {}\\n", .{err});
        return;
    };
    std.debug.print("{d}\\n", .{result});
}`,
      hints: [
        'Error set members are identifiers like DivisionByZero.',
        'Return an error with return ErrorSet.MemberName.',
        'catch handles the error and returns from main.',
      ],
      concepts: ['error set', 'error return'],
    },
    {
      id: 'zig-err-2',
      title: 'try propagation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Use try to propagate an error to the caller.',
      skeleton: `const std = @import("std");

const E = error{Fail};

fn mayFail(ok: bool) E!i32 {
    if (!ok) return E.Fail;
    return 42;
}

fn run() E!void {
    const v = _____ mayFail(false);
    std.debug.print("{d}\\n", .{v});
}

pub fn main() void {
    run() catch |err| std.debug.print("caught: {}\\n", .{err});
}`,
      solution: `const std = @import("std");

const E = error{Fail};

fn mayFail(ok: bool) E!i32 {
    if (!ok) return E.Fail;
    return 42;
}

fn run() E!void {
    const v = try mayFail(false);
    std.debug.print("{d}\\n", .{v});
}

pub fn main() void {
    run() catch |err| std.debug.print("caught: {}\\n", .{err});
}`,
      hints: [
        'try unwraps the value or returns the error to the caller.',
        'run() must also return E!void to propagate.',
        'main catches the error and prints it.',
      ],
      concepts: ['try', 'error propagation'],
    },
    {
      id: 'zig-err-3',
      title: 'catch with default value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Use catch to provide a default value on error.',
      skeleton: `const std = @import("std");

const E = error{Bad};

fn risky() E!u32 {
    return E.Bad;
}

pub fn main() void {
    const v = risky() _____ 0;
    std.debug.print("{d}\\n", .{v});
}`,
      solution: `const std = @import("std");

const E = error{Bad};

fn risky() E!u32 {
    return E.Bad;
}

pub fn main() void {
    const v = risky() catch 0;
    std.debug.print("{d}\\n", .{v});
}`,
      hints: [
        'catch followed by a value returns that value on error.',
        'risky() returns an error, so v = 0.',
        'Output: 0.',
      ],
      concepts: ['catch default', 'error recovery'],
    },
    {
      id: 'zig-err-4',
      title: 'Predict error output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict what is printed when an error is returned.',
      skeleton: `const std = @import("std");

const E = error{ NotFound };

fn find() E!i32 {
    return E.NotFound;
}

pub fn main() void {
    const v = find() catch |err| blk: {
        std.debug.print("err: {}\\n", .{err});
        break :blk -1;
    };
    std.debug.print("{d}\\n", .{v});
}`,
      solution: `err: error.NotFound
-1`,
      hints: [
        'find() returns NotFound, so the catch block runs.',
        'It prints "err: error.NotFound" then returns -1.',
        'v becomes -1, then -1 is printed.',
      ],
      concepts: ['catch block', 'error name'],
    },
    {
      id: 'zig-err-5',
      title: 'errdefer cleanup',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use errdefer to run cleanup only on error paths.',
      skeleton: `const std = @import("std");

const E = error{Fail};

fn allocAndFail(allocator: std.mem.Allocator) E!void {
    const buf = try allocator.alloc(u8, 16);
    errdefer allocator.free(buf);
    return E.Fail; // triggers errdefer
}

pub fn main() void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();
    allocAndFail(allocator) catch {};
    std.debug.print("done\\n", .{});
}`,
      solution: `const std = @import("std");

const E = error{Fail};

fn allocAndFail(allocator: std.mem.Allocator) E!void {
    const buf = try allocator.alloc(u8, 16);
    errdefer allocator.free(buf);
    return E.Fail;
}

pub fn main() void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();
    allocAndFail(allocator) catch {};
    std.debug.print("done\\n", .{});
}`,
      hints: [
        'errdefer runs when the function returns an error.',
        'It does NOT run on a successful return.',
        'This prevents memory leaks on error paths.',
      ],
      concepts: ['errdefer', 'cleanup on error'],
    },
    {
      id: 'zig-err-6',
      title: 'Merge error sets',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Merge two error sets using the || operator.',
      skeleton: `const std = @import("std");

const IoError = error{ ReadFail, WriteFail };
const ParseError = error{ InvalidToken };
const AppError = _____ || _____;

fn process() AppError!void {
    return IoError.ReadFail;
}

pub fn main() void {
    process() catch |err| std.debug.print("{}\\n", .{err});
}`,
      solution: `const std = @import("std");

const IoError = error{ ReadFail, WriteFail };
const ParseError = error{ InvalidToken };
const AppError = IoError || ParseError;

fn process() AppError!void {
    return IoError.ReadFail;
}

pub fn main() void {
    process() catch |err| std.debug.print("{}\\n", .{err});
}`,
      hints: [
        'Use || to merge two error sets into one.',
        'AppError contains all errors from both sets.',
        'Output: error.ReadFail.',
      ],
      concepts: ['error set merge', '||'],
    },
    {
      id: 'zig-err-7',
      title: 'anyerror return type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use anyerror!T as a return type to accept any error.',
      skeleton: `const std = @import("std");

fn flexible() _____!i32 {
    const e: error{Oops} = error.Oops;
    return e;
}

pub fn main() void {
    flexible() catch |err| std.debug.print("{}\\n", .{err});
}`,
      solution: `const std = @import("std");

fn flexible() anyerror!i32 {
    const e: error{Oops} = error.Oops;
    return e;
}

pub fn main() void {
    flexible() catch |err| std.debug.print("{}\\n", .{err});
}`,
      hints: [
        'anyerror is the superset of all error sets.',
        'Use anyerror!T to accept any error type.',
        'Output: error.Oops.',
      ],
      concepts: ['anyerror', 'error superset'],
    },
    {
      id: 'zig-err-8',
      title: 'Error union switch',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Handle specific errors differently using switch in catch.',
      skeleton: `const std = @import("std");

const E = error{ NotFound, Forbidden };

fn fetch(code: u8) E![]const u8 {
    return switch (code) {
        0 => "data",
        1 => E.NotFound,
        else => E.Forbidden,
    };
}

pub fn main() void {
    for ([_]u8{ 0, 1, 2 }) |code| {
        fetch(code) catch |err| switch (err) {
            E.NotFound   => std.debug.print("404\\n", .{}),
            E.Forbidden  => std.debug.print("403\\n", .{}),
        };
    }
}`,
      solution: `const std = @import("std");

const E = error{ NotFound, Forbidden };

fn fetch(code: u8) E![]const u8 {
    return switch (code) {
        0 => "data",
        1 => E.NotFound,
        else => E.Forbidden,
    };
}

pub fn main() void {
    for ([_]u8{ 0, 1, 2 }) |code| {
        const result = fetch(code) catch |err| {
            switch (err) {
                E.NotFound  => std.debug.print("404\\n", .{}),
                E.Forbidden => std.debug.print("403\\n", .{}),
            }
            continue;
        };
        std.debug.print("ok: {s}\\n", .{result});
    }
}`,
      hints: [
        'Use catch |err| switch(err) to dispatch on specific errors.',
        'code=0 returns "data", code=1 returns NotFound, else Forbidden.',
        'Output: ok: data, 404, 403.',
      ],
      concepts: ['catch switch', 'error dispatch'],
    },
    {
      id: 'zig-err-9',
      title: 'defer vs errdefer',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Predict which defers run on success vs error.',
      skeleton: `const std = @import("std");

const E = error{Fail};

fn run(fail: bool) E!void {
    defer std.debug.print("defer\\n", .{});
    errdefer std.debug.print("errdefer\\n", .{});
    if (fail) return E.Fail;
}

pub fn main() void {
    run(true) catch {};
    run(false) catch {};
}`,
      solution: `errdefer
defer
defer`,
      hints: [
        'run(true): both defer and errdefer fire (errdefer first, then defer).',
        'run(false): only defer fires.',
        'Output: errdefer, defer, defer.',
      ],
      concepts: ['defer', 'errdefer', 'execution order'],
    },
    {
      id: 'zig-err-10',
      title: 'Error return trace',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Return an error using the short error literal syntax.',
      skeleton: `const std = @import("std");

fn fail() error{Bad}!void {
    return _____;
}

pub fn main() void {
    fail() catch |e| std.debug.print("{}\\n", .{e});
}`,
      solution: `const std = @import("std");

fn fail() error{Bad}!void {
    return error.Bad;
}

pub fn main() void {
    fail() catch |e| std.debug.print("{}\\n", .{e});
}`,
      hints: [
        'Use error.Name as a shorthand for returning an inline error.',
        'error{Bad} declares a single-member error set.',
        'Output: error.Bad.',
      ],
      concepts: ['inline error set', 'error.Name syntax'],
    },
    {
      id: 'zig-err-11',
      title: 'Catch and re-return',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Catch an error, log it, then re-return a different error.',
      skeleton: `const std = @import("std");

const Inner = error{Low};
const Outer = error{High};

fn inner() Inner!void {
    return Inner.Low;
}

fn outer() Outer!void {
    inner() catch |err| {
        std.debug.print("inner: {}\\n", .{err});
        return Outer.High;
    };
}

pub fn main() void {
    outer() catch |e| std.debug.print("outer: {}\\n", .{e});
}`,
      solution: `const std = @import("std");

const Inner = error{Low};
const Outer = error{High};

fn inner() Inner!void {
    return Inner.Low;
}

fn outer() Outer!void {
    inner() catch |err| {
        std.debug.print("inner: {}\\n", .{err});
        return Outer.High;
    };
}

pub fn main() void {
    outer() catch |e| std.debug.print("outer: {}\\n", .{e});
}`,
      hints: [
        'catch logs the inner error and returns a translated outer error.',
        'Output: "inner: error.Low" then "outer: error.High".',
        'This is the error translation pattern.',
      ],
      concepts: ['error translation', 'catch re-return'],
    },
    {
      id: 'zig-err-12',
      title: 'try in a loop',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use try inside a for loop to stop on the first error.',
      skeleton: `const std = @import("std");

const E = error{Negative};

fn checkPositive(n: i32) E!void {
    if (n < 0) return E.Negative;
}

fn checkAll(nums: []const i32) E!void {
    for (nums) |n| {
        try checkPositive(n);
    }
}

pub fn main() void {
    checkAll(&[_]i32{ 1, 2, -3, 4 }) catch |e| {
        std.debug.print("{}\\n", .{e});
    };
}`,
      solution: `const std = @import("std");

const E = error{Negative};

fn checkPositive(n: i32) E!void {
    if (n < 0) return E.Negative;
}

fn checkAll(nums: []const i32) E!void {
    for (nums) |n| {
        try checkPositive(n);
    }
}

pub fn main() void {
    checkAll(&[_]i32{ 1, 2, -3, 4 }) catch |e| {
        std.debug.print("{}\\n", .{e});
    };
}`,
      hints: [
        'try in the loop exits checkAll on the first error.',
        '-3 triggers E.Negative, which propagates up.',
        'Output: error.Negative.',
      ],
      concepts: ['try in loop', 'fail-fast'],
    },
    {
      id: 'zig-err-13',
      title: 'Error set as subset',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Understand that specific error sets are subsets of anyerror.',
      skeleton: `const std = @import("std");

fn specific() error{A}!void {
    return error.A;
}

fn general() anyerror!void {
    try specific();
}

pub fn main() void {
    general() catch |e| std.debug.print("{}\\n", .{e});
}`,
      solution: `error.A`,
      hints: [
        'anyerror!void can propagate any error including error.A.',
        'try in general() propagates the error from specific().',
        'Output: error.A.',
      ],
      concepts: ['anyerror', 'error coercion'],
    },
    {
      id: 'zig-err-14',
      title: 'Multiple errdefer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use multiple errdefer calls for layered cleanup.',
      skeleton: `const std = @import("std");

const E = error{Fail};

fn work(allocator: std.mem.Allocator) E!void {
    const a = try allocator.alloc(u8, 8);
    errdefer allocator.free(a);
    const b = try allocator.alloc(u8, 16);
    errdefer allocator.free(b);
    return E.Fail;
}

pub fn main() void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    work(gpa.allocator()) catch {};
    std.debug.print("done\\n", .{});
}`,
      solution: `const std = @import("std");

const E = error{Fail};

fn work(allocator: std.mem.Allocator) E!void {
    const a = try allocator.alloc(u8, 8);
    errdefer allocator.free(a);
    const b = try allocator.alloc(u8, 16);
    errdefer allocator.free(b);
    return E.Fail;
}

pub fn main() void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    work(gpa.allocator()) catch {};
    std.debug.print("done\\n", .{});
}`,
      hints: [
        'errdefer statements run in reverse order (LIFO) on error.',
        'Both a and b are freed when E.Fail is returned.',
        'This prevents memory leaks in complex init sequences.',
      ],
      concepts: ['multiple errdefer', 'LIFO cleanup'],
    },
    {
      id: 'zig-err-15',
      title: 'Error in main signature',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Change main to return an error union so try can be used.',
      skeleton: `const std = @import("std");

pub fn main() _____!void {
    const file = try std.fs.cwd().openFile("test.txt", .{});
    defer file.close();
    std.debug.print("opened\\n", .{});
}`,
      solution: `const std = @import("std");

pub fn main() anyerror!void {
    const file = try std.fs.cwd().openFile("test.txt", .{});
    defer file.close();
    std.debug.print("opened\\n", .{});
}`,
      hints: [
        'main can return anyerror!void to use try at the top level.',
        'If main returns an error, Zig prints a stack trace.',
        'Use anyerror since fs errors are a broad set.',
      ],
      concepts: ['main error return', 'anyerror!void'],
    },
    {
      id: 'zig-err-16',
      title: 'Inline error set in return type',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict what the inline error set return type compiles to.',
      skeleton: `const std = @import("std");

fn go() error{Oops}!i32 {
    return 1;
}

pub fn main() void {
    const v = go() catch 0;
    std.debug.print("{d}\\n", .{v});
}`,
      solution: `1`,
      hints: [
        'go() returns 1 successfully.',
        'catch 0 is not triggered.',
        'Output: 1.',
      ],
      concepts: ['inline error set', 'successful return'],
    },
    {
      id: 'zig-err-17',
      title: 'Refactor explicit catch to try',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Refactor verbose catch + return to a single try.',
      skeleton: `const std = @import("std");

const E = error{Bad};

fn op() E!i32 { return 5; }

fn run() E!void {
    const v = op() catch |err| return err;
    std.debug.print("{d}\\n", .{v});
}

pub fn main() void {
    run() catch {};
}`,
      solution: `const std = @import("std");

const E = error{Bad};

fn op() E!i32 { return 5; }

fn run() E!void {
    const v = try op();
    std.debug.print("{d}\\n", .{v});
}

pub fn main() void {
    run() catch {};
}`,
      hints: [
        'catch |err| return err is exactly what try does.',
        'Replace the catch block with try.',
        'Behavior is identical; try is the idiomatic form.',
      ],
      concepts: ['try vs catch', 'refactor'],
    },
    {
      id: 'zig-err-18',
      title: 'Return error from comptime check',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use comptime to validate a parameter and return an error.',
      skeleton: `const std = @import("std");

fn mustBePositive(comptime n: i32) error{Negative}!i32 {
    if (n < 0) return error.Negative;
    return n;
}

pub fn main() void {
    const a = mustBePositive(5) catch 0;
    const b = mustBePositive(-1) catch 0;
    std.debug.print("{d} {d}\\n", .{ a, b });
}`,
      solution: `const std = @import("std");

fn mustBePositive(comptime n: i32) error{Negative}!i32 {
    if (n < 0) return error.Negative;
    return n;
}

pub fn main() void {
    const a = mustBePositive(5) catch 0;
    const b = mustBePositive(-1) catch 0;
    std.debug.print("{d} {d}\\n", .{ a, b });
}`,
      hints: [
        'comptime parameters are evaluated at compile time.',
        'The error can still be returned even from a comptime check.',
        'Output: "5 0".',
      ],
      concepts: ['comptime parameter', 'error from comptime'],
    },
    {
      id: 'zig-err-19',
      title: 'Nested try chain',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict the output of a nested try chain.',
      skeleton: `const std = @import("std");

const E = error{Stop};

fn step1() E!i32 { return 10; }
fn step2(n: i32) E!i32 { return n * 2; }
fn step3(n: i32) E!i32 { _ = n; return E.Stop; }

fn pipeline() E!i32 {
    const a = try step1();
    const b = try step2(a);
    return try step3(b);
}

pub fn main() void {
    pipeline() catch |e| std.debug.print("{}\\n", .{e});
}`,
      solution: `error.Stop`,
      hints: [
        'step1 returns 10, step2(10) returns 20.',
        'step3 always returns E.Stop.',
        'Output: error.Stop.',
      ],
      concepts: ['try chain', 'pipeline pattern'],
    },
    {
      id: 'zig-err-20',
      title: 'Full error handling pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a function using try, errdefer, and catch.',
      skeleton: `const std = @import("std");

const AppError = error{ AllocFail, ProcessFail };

fn process(allocator: std.mem.Allocator, fail: bool) AppError![]u8 {
    const buf = allocator.alloc(u8, 32) catch return AppError.AllocFail;
    errdefer allocator.free(buf);
    if (fail) return AppError.ProcessFail;
    buf[0] = 'Z';
    return buf;
}

pub fn main() void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();
    const data = process(alloc, false) catch |e| {
        std.debug.print("error: {}\\n", .{e});
        return;
    };
    defer alloc.free(data);
    std.debug.print("{c}\\n", .{data[0]});
}`,
      solution: `const std = @import("std");

const AppError = error{ AllocFail, ProcessFail };

fn process(allocator: std.mem.Allocator, fail: bool) AppError![]u8 {
    const buf = allocator.alloc(u8, 32) catch return AppError.AllocFail;
    errdefer allocator.free(buf);
    if (fail) return AppError.ProcessFail;
    buf[0] = 'Z';
    return buf;
}

pub fn main() void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();
    const data = process(alloc, false) catch |e| {
        std.debug.print("error: {}\\n", .{e});
        return;
    };
    defer alloc.free(data);
    std.debug.print("{c}\\n", .{data[0]});
}`,
      hints: [
        'process(alloc, false) succeeds, returning a buffer.',
        'errdefer ensures the buffer is freed if ProcessFail is returned.',
        'Output: Z.',
      ],
      concepts: ['errdefer', 'try', 'catch', 'full pattern'],
    },
  ],
};
