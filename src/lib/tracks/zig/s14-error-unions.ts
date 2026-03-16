import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-errunion',
  title: '14. Error Unions Deep Dive',
  explanation: `## Error Unions Deep Dive

Error unions combine an error set with a payload type, enabling Zig's powerful error handling model. They are the backbone of robust Zig code.

### Error Union Basics
\`\`\`zig
const FileError = error{ NotFound, PermissionDenied };
fn openConfig() FileError!Config {
    // Returns either a Config or a FileError
}
\`\`\`

### Switching on Error Unions
\`\`\`zig
const result = openConfig();
if (result) |config| {
    // use config
} else |err| switch (err) {
    error.NotFound => return defaults,
    error.PermissionDenied => return error.PermissionDenied,
}
\`\`\`

### Error Propagation with try
\`\`\`zig
fn loadSettings() !Settings {
    const config = try openConfig();   // propagates error
    const db = try openDatabase(config);
    return Settings{ .config = config, .db = db };
}
\`\`\`

### Error Set Inference
When you use \`!\` without a named error set, Zig infers the full error set from all possible error returns in the function body.

### Error Traces
\`@errorReturnTrace()\` provides a stack trace of where the error originated, invaluable for debugging propagation chains.`,
  exercises: [
    {
      id: 'zig-errunion-1',
      title: 'Basic Error Union Return',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Complete a function that returns an error union.',
      skeleton: `const std = @import("std");

const ParseError = error{ InvalidChar, Overflow };

fn parseDigit(c: u8) ___!u8 {
    if (c >= '0' and c <= '9') return c - '0';
    return error.InvalidChar;
}`,
      solution: `const std = @import("std");

const ParseError = error{ InvalidChar, Overflow };

fn parseDigit(c: u8) ParseError!u8 {
    if (c >= '0' and c <= '9') return c - '0';
    return error.InvalidChar;
}`,
      hints: [
        'The return type is ErrorSet!PayloadType.',
        'ParseError is the error set, u8 is the payload.',
        'Write ParseError!u8 as the return type.',
      ],
      concepts: ['error-union', 'error-set', 'return-type'],
    },
    {
      id: 'zig-errunion-2',
      title: 'Unwrap with if-else',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Switch on an error union to handle both cases.',
      skeleton: `fn safeDivide(a: i32, b: i32) error{DivisionByZero}!i32 {
    if (b == 0) return error.DivisionByZero;
    return @divTrunc(a, b);
}

pub fn main() void {
    const result = safeDivide(10, 0);
    if (result) |value| {
        std.debug.print("Got: {}\\n", .{value});
    } ___ |err| {
        std.debug.print("Error: {}\\n", .{err});
    }
}`,
      solution: `fn safeDivide(a: i32, b: i32) error{DivisionByZero}!i32 {
    if (b == 0) return error.DivisionByZero;
    return @divTrunc(a, b);
}

pub fn main() void {
    const result = safeDivide(10, 0);
    if (result) |value| {
        std.debug.print("Got: {}\\n", .{value});
    } else |err| {
        std.debug.print("Error: {}\\n", .{err});
    }
}`,
      hints: [
        'The error capture uses else |err| after the if payload capture.',
        'else |err| captures the error value from the union.',
        'This is the standard if-else pattern for error unions.',
      ],
      concepts: ['error-union', 'if-else-capture', 'error-handling'],
    },
    {
      id: 'zig-errunion-3',
      title: 'Error Propagation with try',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Use try to propagate errors through a chain of calls.',
      skeleton: `const OpenError = error{ NotFound, AccessDenied };

fn readFile(name: []const u8) OpenError![]const u8 {
    if (name.len == 0) return error.NotFound;
    return "file contents";
}

fn processFile(name: []const u8) OpenError!usize {
    const contents = ___ readFile(name);
    return contents.len;
}`,
      solution: `const OpenError = error{ NotFound, AccessDenied };

fn readFile(name: []const u8) OpenError![]const u8 {
    if (name.len == 0) return error.NotFound;
    return "file contents";
}

fn processFile(name: []const u8) OpenError!usize {
    const contents = try readFile(name);
    return contents.len;
}`,
      hints: [
        'try unwraps the payload or immediately returns the error.',
        'try is equivalent to: if (readFile(name)) |c| c else |e| return e.',
        'The calling function must also return a compatible error union.',
      ],
      concepts: ['try', 'error-propagation', 'error-union'],
    },
    {
      id: 'zig-errunion-4',
      title: 'Switch on Error Values',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use switch to handle specific error values from an error union.',
      skeleton: `const IoError = error{ NotFound, PermissionDenied, Timeout };

fn openResource(id: u32) IoError!Resource {
    if (id == 0) return error.NotFound;
    if (id > 1000) return error.PermissionDenied;
    return Resource{ .id = id };
}

fn handleOpen(id: u32) []const u8 {
    return openResource(id) catch |err| ___ (err) {
        IoError.NotFound => "missing",
        IoError.PermissionDenied => "denied",
        IoError.Timeout => "timeout",
    };
}`,
      solution: `const IoError = error{ NotFound, PermissionDenied, Timeout };

fn openResource(id: u32) IoError!Resource {
    if (id == 0) return error.NotFound;
    if (id > 1000) return error.PermissionDenied;
    return Resource{ .id = id };
}

fn handleOpen(id: u32) []const u8 {
    return openResource(id) catch |err| switch (err) {
        IoError.NotFound => "missing",
        IoError.PermissionDenied => "denied",
        IoError.Timeout => "timeout",
    };
}`,
      hints: [
        'catch |err| captures the error, then switch dispatches on it.',
        'switch (err) handles each error variant.',
        'Each arm of the switch matches an error from the set.',
      ],
      concepts: ['catch', 'switch', 'error-set'],
    },
    {
      id: 'zig-errunion-5',
      title: 'Inferred Error Sets',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use inferred error sets with the ! operator.',
      skeleton: `fn parse(input: []const u8) ___!i32 {
    if (input.len == 0) return error.EmptyInput;
    if (input[0] == '-') return error.Negative;
    return 42;
}`,
      solution: `fn parse(input: []const u8) !i32 {
    if (input.len == 0) return error.EmptyInput;
    if (input[0] == '-') return error.Negative;
    return 42;
}`,
      hints: [
        'An inferred error set uses just ! before the payload type.',
        'Zig infers the error set from all error returns in the body.',
        'The inferred set here is error{EmptyInput, Negative}.',
      ],
      concepts: ['inferred-error-set', 'error-union'],
    },
    {
      id: 'zig-errunion-6',
      title: 'Error Union Coercion',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Understand how error sets coerce to broader error unions.',
      skeleton: `const Small = error{ A, B };
const Big = error{ A, B, C, D };

fn smallFn() Small!u32 {
    return error.A;
}

fn bigFn() Big!u32 {
    // Small error set coerces to Big since Small is a subset
    const val = ___ smallFn();
    return val + 1;
}`,
      solution: `const Small = error{ A, B };
const Big = error{ A, B, C, D };

fn smallFn() Small!u32 {
    return error.A;
}

fn bigFn() Big!u32 {
    // Small error set coerces to Big since Small is a subset
    const val = try smallFn();
    return val + 1;
}`,
      hints: [
        'try propagates the error, and Small coerces into Big.',
        'Error set coercion works when the source is a subset of the target.',
        '{A, B} is a subset of {A, B, C, D}, so coercion succeeds.',
      ],
      concepts: ['error-coercion', 'error-set-subset', 'try'],
    },
    {
      id: 'zig-errunion-7',
      title: 'Write: Multi-step Error Chain',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a function that chains multiple fallible operations using try.',
      skeleton: `// Write a function processData that:
// 1. Calls validate(data) which returns error{Invalid}![]const u8
// 2. Calls transform(validated) which returns error{TransformFailed}![]const u8
// 3. Calls store(transformed) which returns error{StoreFailed}!usize
// 4. Returns the usize from store, propagating any errors
// Use an inferred error set.`,
      solution: `fn validate(data: []const u8) error{Invalid}![]const u8 {
    if (data.len == 0) return error.Invalid;
    return data;
}

fn transform(data: []const u8) error{TransformFailed}![]const u8 {
    if (data.len > 1000) return error.TransformFailed;
    return data;
}

fn store(data: []const u8) error{StoreFailed}!usize {
    if (data.len == 0) return error.StoreFailed;
    return data.len;
}

fn processData(data: []const u8) !usize {
    const validated = try validate(data);
    const transformed = try transform(validated);
    const stored = try store(transformed);
    return stored;
}`,
      hints: [
        'Each try propagates the error from that step.',
        'The inferred error set is the union of all three error sets.',
        'Chain the calls: validate -> transform -> store.',
      ],
      concepts: ['error-propagation', 'try-chain', 'inferred-error-set'],
    },
    {
      id: 'zig-errunion-8',
      title: 'Write: catch with Default',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Write a function that uses catch to provide a default value on error.',
      skeleton: `// Write a function safeParseInt that:
// 1. Takes a []const u8 parameter
// 2. Calls std.fmt.parseInt(i32, input, 10)
// 3. Uses catch to return 0 if parsing fails
// Returns i32 (not an error union).`,
      solution: `const std = @import("std");

fn safeParseInt(input: []const u8) i32 {
    return std.fmt.parseInt(i32, input, 10) catch 0;
}`,
      hints: [
        'catch <default_value> converts an error union to just the payload type.',
        'catch 0 means: if there is an error, return 0 instead.',
        'The return type is plain i32 since errors are handled.',
      ],
      concepts: ['catch', 'default-value', 'error-handling'],
    },
    {
      id: 'zig-errunion-9',
      title: 'Write: Error Handling in Loops',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a function that handles errors inside a loop, continuing on recoverable errors.',
      skeleton: `// Write a function countValid that:
// 1. Takes a slice of []const u8 strings
// 2. For each string, calls validate(s) which returns error{Empty,TooLong}!void
// 3. If validate succeeds, increments a counter
// 4. On error.Empty, continues to the next item (skip)
// 5. On error.TooLong, returns the error (bail out)
// Returns !usize (the count of valid items)`,
      solution: `fn validate(s: []const u8) error{ Empty, TooLong }!void {
    if (s.len == 0) return error.Empty;
    if (s.len > 100) return error.TooLong;
}

fn countValid(items: []const []const u8) error{TooLong}!usize {
    var count: usize = 0;
    for (items) |s| {
        validate(s) catch |err| switch (err) {
            error.Empty => continue,
            error.TooLong => return error.TooLong,
        };
        count += 1;
    }
    return count;
}`,
      hints: [
        'Use catch |err| switch (err) inside the loop.',
        'continue skips the current iteration on Empty.',
        'return error.TooLong bails out of the function on TooLong.',
      ],
      concepts: ['error-in-loop', 'catch-switch', 'continue'],
    },
    {
      id: 'zig-errunion-10',
      title: 'Write: Fallback Chain',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a function that tries multiple sources, falling back on error.',
      skeleton: `// Write a function getConfig that:
// 1. Tries readFromFile() - returns !Config
// 2. If that fails, tries readFromEnv() - returns !Config
// 3. If that fails too, returns a default Config
// Returns Config (not an error union - always succeeds).`,
      solution: `const Config = struct {
    port: u16,
    debug: bool,
};

fn readFromFile() !Config {
    return error.FileNotFound;
}

fn readFromEnv() !Config {
    return error.EnvMissing;
}

fn getConfig() Config {
    return readFromFile() catch readFromEnv() catch Config{
        .port = 8080,
        .debug = false,
    };
}`,
      hints: [
        'Chained catch: first catch tries the next source, second catch gives the default.',
        'readFromFile() catch readFromEnv() catch default.',
        'The final fallback is a plain Config value, no error possible.',
      ],
      concepts: ['catch-chain', 'fallback', 'error-recovery'],
    },
    {
      id: 'zig-errunion-11',
      title: 'Write: Error Return Trace',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a function that captures and logs the error return trace.',
      skeleton: `// Write a function debugCall that:
// 1. Calls a fallible function: fn riskyOp() !void
// 2. On error, uses @errorReturnTrace() to get the trace
// 3. If trace is non-null, prints the trace
// 4. Returns the error`,
      solution: `const std = @import("std");

fn riskyOp() !void {
    return error.SomethingBroke;
}

fn debugCall() !void {
    riskyOp() catch |err| {
        if (@errorReturnTrace()) |trace| {
            std.debug.dumpStackTrace(trace.*);
        }
        return err;
    };
}`,
      hints: [
        '@errorReturnTrace() returns an optional pointer to the trace.',
        'It returns null in ReleaseFast and ReleaseSmall modes.',
        'Use if to unwrap the optional trace pointer.',
      ],
      concepts: ['error-return-trace', 'debugging', 'error-propagation'],
    },
    {
      id: 'zig-errunion-12',
      title: 'Write: Convert Between Error Sets',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a wrapper that maps one error set to another.',
      skeleton: `// Given:
// const LowLevel = error{ ErrA, ErrB, ErrC };
// const HighLevel = error{ ReadFailed, WriteFailed };
//
// Write mapError that:
// 1. Takes a LowLevel error
// 2. Maps ErrA, ErrB -> ReadFailed
// 3. Maps ErrC -> WriteFailed
// 4. Returns the mapped HighLevel error
//
// Then write wrapCall that calls lowLevelFn() and maps its errors.`,
      solution: `const LowLevel = error{ ErrA, ErrB, ErrC };
const HighLevel = error{ ReadFailed, WriteFailed };

fn mapError(err: LowLevel) HighLevel {
    return switch (err) {
        error.ErrA, error.ErrB => error.ReadFailed,
        error.ErrC => error.WriteFailed,
    };
}

fn lowLevelFn() LowLevel!u32 {
    return error.ErrA;
}

fn wrapCall() HighLevel!u32 {
    return lowLevelFn() catch |err| return mapError(err);
}`,
      hints: [
        'Use switch on the error to map each variant.',
        'Multiple error values can share a switch arm with commas.',
        'catch |err| return mapError(err) converts and propagates.',
      ],
      concepts: ['error-mapping', 'error-set-conversion', 'switch'],
    },
    {
      id: 'zig-errunion-13',
      title: 'Fix: Unreachable Error Catch',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Fix code that tries to catch from a non-error-union type.',
      skeleton: `fn getValue() u32 {
    return 42;
}

pub fn main() void {
    const val = getValue() catch 0;
    std.debug.print("{}\\n", .{val});
}`,
      solution: `fn getValue() u32 {
    return 42;
}

pub fn main() void {
    const val = getValue();
    std.debug.print("{}\\n", .{val});
}`,
      hints: [
        'getValue returns u32, not an error union.',
        'You cannot use catch on a non-error-union type.',
        'Simply assign the return value directly.',
      ],
      concepts: ['error-union-type', 'catch-misuse'],
    },
    {
      id: 'zig-errunion-14',
      title: 'Fix: Missing Error Branch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Fix a switch that does not handle all error values.',
      skeleton: `const E = error{ A, B, C };

fn getVal() E!u32 {
    return error.C;
}

fn handle() u32 {
    return getVal() catch |err| switch (err) {
        error.A => 1,
        error.B => 2,
    };
}`,
      solution: `const E = error{ A, B, C };

fn getVal() E!u32 {
    return error.C;
}

fn handle() u32 {
    return getVal() catch |err| switch (err) {
        error.A => 1,
        error.B => 2,
        error.C => 3,
    };
}`,
      hints: [
        'The error set has three variants: A, B, and C.',
        'The switch is missing a branch for error.C.',
        'Add the missing error.C arm to make it exhaustive.',
      ],
      concepts: ['exhaustive-switch', 'error-set', 'compiler-error'],
    },
    {
      id: 'zig-errunion-15',
      title: 'Fix: try in Non-Error Function',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Fix code that uses try in a function that cannot return errors.',
      skeleton: `fn riskyOp() error{Fail}!u32 {
    return 42;
}

pub fn main() void {
    const val = try riskyOp();
    std.debug.print("{}\\n", .{val});
}`,
      solution: `fn riskyOp() error{Fail}!u32 {
    return 42;
}

pub fn main() void {
    const val = riskyOp() catch unreachable;
    std.debug.print("{}\\n", .{val});
}`,
      hints: [
        'main returns void, so try cannot propagate the error.',
        'Use catch unreachable if you know the error will not occur.',
        'Alternatively, use catch |_| {} to silently discard, or change main return type.',
      ],
      concepts: ['try-constraint', 'catch-unreachable', 'void-return'],
    },
    {
      id: 'zig-errunion-16',
      title: 'Predict: Catch Chain',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict the output of a catch chain.',
      skeleton: `const std = @import("std");

fn getA() error{Fail}!u32 {
    return error.Fail;
}

fn getB() error{Fail}!u32 {
    return 10;
}

pub fn main() void {
    const val = getA() catch getB() catch 0;
    std.debug.print("{}\\n", .{val});
}`,
      solution: `10`,
      hints: [
        'getA() returns error.Fail, so the first catch triggers.',
        'The first catch calls getB(), which succeeds with 10.',
        'The second catch is not reached since getB() succeeded.',
      ],
      concepts: ['catch-chain', 'error-fallback'],
    },
    {
      id: 'zig-errunion-17',
      title: 'Predict: Error Union if-else',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Predict the output of error union unwrapping.',
      skeleton: `const std = @import("std");

fn compute(x: i32) error{Negative}!i32 {
    if (x < 0) return error.Negative;
    return x * 2;
}

pub fn main() void {
    const vals = [_]i32{ 3, -1, 5 };
    var sum: i32 = 0;
    for (vals) |v| {
        if (compute(v)) |result| {
            sum += result;
        } else |_| {
            sum += 100;
        }
    }
    std.debug.print("{}\\n", .{sum});
}`,
      solution: `116`,
      hints: [
        'compute(3) = 6, compute(-1) = error (add 100), compute(5) = 10.',
        'sum = 6 + 100 + 10 = 116.',
        'The else branch adds 100 for any error.',
      ],
      concepts: ['error-union-unwrap', 'if-else-capture'],
    },
    {
      id: 'zig-errunion-18',
      title: 'Predict: Error Set Merging',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict what happens when error sets merge through try.',
      skeleton: `const std = @import("std");
const A = error{X};
const B = error{Y};

fn fnA() A!u32 { return 5; }
fn fnB() B!u32 { return error.Y; }

fn combined() !u32 {
    const a = try fnA();
    const b = try fnB();
    return a + b;
}

pub fn main() void {
    if (combined()) |val| {
        std.debug.print("ok: {}\\n", .{val});
    } else |err| {
        std.debug.print("err\\n", .{});
    }
}`,
      solution: `err`,
      hints: [
        'fnA succeeds with 5, so a = 5.',
        'fnB returns error.Y, which try propagates.',
        'combined() returns an error, so the else branch runs.',
      ],
      concepts: ['error-set-merge', 'try-propagation', 'inferred-error-set'],
    },
    {
      id: 'zig-errunion-19',
      title: 'Refactor: Replace Manual Check with try',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Refactor verbose manual error checking to use try.',
      skeleton: `fn step1() !u32 { return 10; }
fn step2(x: u32) !u32 { return x + 5; }
fn step3(x: u32) !u32 { return x * 2; }

fn pipeline() !u32 {
    const a = step1();
    if (a) |val1| {
        const b = step2(val1);
        if (b) |val2| {
            const c = step3(val2);
            if (c) |val3| {
                return val3;
            } else |err3| return err3;
        } else |err2| return err2;
    } else |err1| return err1;
}`,
      solution: `fn step1() !u32 { return 10; }
fn step2(x: u32) !u32 { return x + 5; }
fn step3(x: u32) !u32 { return x * 2; }

fn pipeline() !u32 {
    const val1 = try step1();
    const val2 = try step2(val1);
    const val3 = try step3(val2);
    return val3;
}`,
      hints: [
        'try replaces the if/else |err| return err pattern.',
        'Nested if-else chains become flat sequential try calls.',
        'try automatically propagates errors.',
      ],
      concepts: ['try', 'refactor', 'error-propagation'],
    },
    {
      id: 'zig-errunion-20',
      title: 'Refactor: Extract Error Mapping',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Refactor inline error switches into a reusable mapping function.',
      skeleton: `const Low = error{ IoErr, ParseErr, TimeoutErr };
const High = error{ ReadFailed, InvalidData };

fn readData() Low![]const u8 { return error.IoErr; }
fn parseData() Low!u32 { return error.ParseErr; }

fn process() High!u32 {
    const data = readData() catch |err| switch (err) {
        error.IoErr => return error.ReadFailed,
        error.ParseErr => return error.InvalidData,
        error.TimeoutErr => return error.ReadFailed,
    };
    const parsed = parseData() catch |err| switch (err) {
        error.IoErr => return error.ReadFailed,
        error.ParseErr => return error.InvalidData,
        error.TimeoutErr => return error.ReadFailed,
    };
    _ = data;
    return parsed;
}`,
      solution: `const Low = error{ IoErr, ParseErr, TimeoutErr };
const High = error{ ReadFailed, InvalidData };

fn mapErr(err: Low) High {
    return switch (err) {
        error.IoErr, error.TimeoutErr => error.ReadFailed,
        error.ParseErr => error.InvalidData,
    };
}

fn readData() Low![]const u8 { return error.IoErr; }
fn parseData() Low!u32 { return error.ParseErr; }

fn process() High!u32 {
    const data = readData() catch |err| return mapErr(err);
    const parsed = parseData() catch |err| return mapErr(err);
    _ = data;
    return parsed;
}`,
      hints: [
        'Extract the repeated switch into a mapErr function.',
        'mapErr takes a Low error and returns a High error.',
        'This avoids duplicating the mapping logic at every call site.',
      ],
      concepts: ['error-mapping', 'DRY', 'refactor'],
    },
  ],
};
