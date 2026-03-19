import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-defer',
  title: '15. Defer & Errdefer',
  explanation: `## Defer & Errdefer

Zig's \`defer\` and \`errdefer\` are essential tools for resource management and cleanup. They guarantee cleanup code runs in a predictable order.

### Defer Basics
\`\`\`zig
fn example() void {
    const file = openFile();
    defer closeFile(file);
    // file is guaranteed to be closed when this scope exits
    doWork(file);
}
\`\`\`

### LIFO Ordering
Multiple defers execute in reverse (last-in, first-out) order:
\`\`\`zig
defer std.debug.print("1 ", .{});
defer std.debug.print("2 ", .{});
defer std.debug.print("3 ", .{});
// Prints: 3 2 1
\`\`\`

### Errdefer
\`errdefer\` only executes when the function returns an error:
\`\`\`zig
fn allocateAndInit(allocator: Allocator) !*Resource {
    const ptr = try allocator.create(Resource);
    errdefer allocator.destroy(ptr);  // only runs if we return an error
    try ptr.init();
    return ptr;
}
\`\`\`

### Errdefer with Captures
\`\`\`zig
errdefer |err| {
    std.log.err("failed with: {}", .{err});
}
\`\`\`

### Defer in Loops
Defers in loops execute at the end of each iteration, not at function exit.`,
  exercises: [
    {
      id: 'zig-defer-1',
      title: 'Basic Defer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Use defer to guarantee cleanup.',
      skeleton: `const std = @import("std");

fn process() void {
    var resource: u32 = 1;
    ___ {
        resource = 0;
    }
    // resource is guaranteed to be set to 0 when scope exits
    std.debug.print("during: {}\\n", .{resource});
}`,
      solution: `const std = @import("std");

fn process() void {
    var resource: u32 = 1;
    defer {
        resource = 0;
    }
    // resource is guaranteed to be set to 0 when scope exits
    std.debug.print("during: {}\\n", .{resource});
}`,
      hints: [
        'defer schedules code to run when the current scope exits.',
        'The deferred block runs after all other code in the scope.',
        'It guarantees cleanup regardless of how the scope exits.',
      ],
      concepts: ['defer', 'cleanup', 'scope'],
    },
    {
      id: 'zig-defer-2',
      title: 'Defer with Expression',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Use defer with a single expression.',
      skeleton: `const std = @import("std");

var global_count: u32 = 0;

fn increment() void {
    global_count += 1;
    defer global_count ___ 1;
    global_count += 10;
}`,
      solution: `const std = @import("std");

var global_count: u32 = 0;

fn increment() void {
    global_count += 1;
    defer global_count -= 1;
    global_count += 10;
}`,
      hints: [
        'The defer runs after global_count += 10.',
        'We want to subtract 1 as cleanup.',
        'defer can take a single expression without braces.',
      ],
      concepts: ['defer', 'expression'],
    },
    {
      id: 'zig-defer-3',
      title: 'Multiple Defers LIFO',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Understand LIFO ordering of multiple defers.',
      skeleton: `const std = @import("std");

fn lifoDemo(buf: []u8) void {
    var idx: usize = 0;
    defer { buf[idx] = 'A'; idx += 1; }
    defer { buf[idx] = 'B'; idx += 1; }
    defer { buf[idx] = 'C'; idx += 1; }
    // After function returns, buf starts with: ___
}`,
      solution: `const std = @import("std");

fn lifoDemo(buf: []u8) void {
    var idx: usize = 0;
    defer { buf[idx] = 'A'; idx += 1; }
    defer { buf[idx] = 'B'; idx += 1; }
    defer { buf[idx] = 'C'; idx += 1; }
    // After function returns, buf starts with: CBA
}`,
      hints: [
        'Defers run in reverse order (LIFO: last-in, first-out).',
        'The last defer (C) runs first, then B, then A.',
        'buf will contain C, B, A at indices 0, 1, 2.',
      ],
      concepts: ['defer-lifo', 'ordering'],
    },
    {
      id: 'zig-defer-4',
      title: 'Errdefer Basics',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use errdefer to clean up only on error.',
      skeleton: `const std = @import("std");
const Allocator = std.mem.Allocator;

fn createBuffer(allocator: Allocator) ![]u8 {
    const buf = try allocator.alloc(u8, 1024);
    ___ allocator.free(buf);
    if (buf.len < 512) return error.TooSmall;
    return buf;
}`,
      solution: `const std = @import("std");
const Allocator = std.mem.Allocator;

fn createBuffer(allocator: Allocator) ![]u8 {
    const buf = try allocator.alloc(u8, 1024);
    errdefer allocator.free(buf);
    if (buf.len < 512) return error.TooSmall;
    return buf;
}`,
      hints: [
        'errdefer only runs when the function returns an error.',
        'If we succeed, the caller owns the buffer and should free it.',
        'If we fail, errdefer frees the buffer to prevent leaks.',
      ],
      concepts: ['errdefer', 'resource-cleanup', 'allocator'],
    },
    {
      id: 'zig-defer-5',
      title: 'Errdefer with Capture',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use errdefer with an error capture for logging.',
      skeleton: `const std = @import("std");

fn riskyInit() !void {
    errdefer ___ {
        std.log.err("init failed: {}", .{err});
    }
    return error.InitFailed;
}`,
      solution: `const std = @import("std");

fn riskyInit() !void {
    errdefer |err| {
        std.log.err("init failed: {}", .{err});
    }
    return error.InitFailed;
}`,
      hints: [
        'errdefer |err| captures the error that caused the function to fail.',
        'The capture variable is available inside the errdefer block.',
        'This is useful for logging which error triggered cleanup.',
      ],
      concepts: ['errdefer-capture', 'error-logging'],
    },
    {
      id: 'zig-defer-6',
      title: 'Defer in Loop',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Understand that defer in a loop runs at the end of each iteration.',
      skeleton: `const std = @import("std");

fn processItems(items: []const u32) u32 {
    var total: u32 = 0;
    for (items) |item| {
        var temp = item * 2;
        ___ { temp = 0; }
        total += temp;
        // temp is reset to 0 at end of each iteration by the ___
    }
    return total;
}`,
      solution: `const std = @import("std");

fn processItems(items: []const u32) u32 {
    var total: u32 = 0;
    for (items) |item| {
        var temp = item * 2;
        defer { temp = 0; }
        total += temp;
        // temp is reset to 0 at end of each iteration by the defer
    }
    return total;
}`,
      hints: [
        'defer inside a for loop is scoped to each iteration.',
        'It runs at the end of each loop body, not at function exit.',
        'temp gets reset to 0 after total += temp each iteration.',
      ],
      concepts: ['defer-in-loop', 'scope-lifetime'],
    },
    {
      id: 'zig-defer-7',
      title: 'Write: File Handle Cleanup',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a function that opens a file and uses defer to ensure it is closed.',
      skeleton: `// Write a function readFileSize that:
// 1. Opens a file with std.fs.cwd().openFile(path, .{})
// 2. Uses defer to close the file handle
// 3. Gets the file stat with file.stat()
// 4. Returns the file size as u64
// Propagate errors with try.`,
      solution: `const std = @import("std");

fn readFileSize(path: []const u8) !u64 {
    const file = try std.fs.cwd().openFile(path, .{});
    defer file.close();
    const stat = try file.stat();
    return stat.size;
}`,
      hints: [
        'defer file.close() ensures the file is closed even if stat() fails.',
        'Use try to propagate errors from openFile and stat.',
        'The defer runs whether we return success or an error.',
      ],
      concepts: ['defer', 'file-handle', 'resource-management'],
    },
    {
      id: 'zig-defer-8',
      title: 'Write: Allocator with Errdefer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a function that allocates memory and uses errdefer to free on failure.',
      skeleton: `// Write a function createArray that:
// 1. Takes an allocator and a size: usize
// 2. Allocates a []u32 of the given size
// 3. Uses errdefer to free the allocation if initialization fails
// 4. Fills each element with its index (0, 1, 2, ...)
// 5. If any index > 999, return error.TooLarge
// 6. Returns the filled slice`,
      solution: `const std = @import("std");
const Allocator = std.mem.Allocator;

fn createArray(allocator: Allocator, size: usize) ![]u32 {
    const arr = try allocator.alloc(u32, size);
    errdefer allocator.free(arr);

    for (arr, 0..) |*slot, i| {
        if (i > 999) return error.TooLarge;
        slot.* = @intCast(i);
    }
    return arr;
}`,
      hints: [
        'errdefer allocator.free(arr) prevents a leak if we return an error.',
        'On success, the caller is responsible for freeing.',
        'Use for with index to fill each element.',
      ],
      concepts: ['errdefer', 'allocator', 'memory-safety'],
    },
    {
      id: 'zig-defer-9',
      title: 'Write: Nested Resource Cleanup',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a function that acquires multiple resources with proper errdefer ordering.',
      skeleton: `// Write a function initSystem that:
// 1. Allocates a Config struct (allocator.create(Config))
// 2. errdefer to destroy Config if later steps fail
// 3. Allocates a []u8 buffer of 4096 bytes
// 4. errdefer to free the buffer if later steps fail
// 5. Calls validateConfig(config) which can fail
// 6. Returns a System struct containing both
// Each resource should only be freed if a LATER step fails.`,
      solution: `const std = @import("std");
const Allocator = std.mem.Allocator;

const Config = struct { value: u32 };
const System = struct { config: *Config, buffer: []u8 };

fn validateConfig(config: *Config) !void {
    if (config.value == 0) return error.InvalidConfig;
}

fn initSystem(allocator: Allocator) !System {
    const config = try allocator.create(Config);
    errdefer allocator.destroy(config);

    const buffer = try allocator.alloc(u8, 4096);
    errdefer allocator.free(buffer);

    config.* = Config{ .value = 1 };
    try validateConfig(config);

    return System{ .config = config, .buffer = buffer };
}`,
      hints: [
        'errdefer for config runs if alloc(buffer) or validateConfig fails.',
        'errdefer for buffer runs if validateConfig fails.',
        'On success, neither errdefer runs; the caller owns both.',
      ],
      concepts: ['errdefer-ordering', 'nested-resources', 'RAII'],
    },
    {
      id: 'zig-defer-10',
      title: 'Write: Conditional Cleanup',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a function using a flag to conditionally skip defer cleanup.',
      skeleton: `// Write a function tryAcquire that:
// 1. Acquires a resource (allocator.create(Resource))
// 2. Has a boolean "success" flag initially false
// 3. defer: if (!success) destroy the resource
// 4. Performs validation that might fail
// 5. Sets success = true before returning
// This pattern lets defer handle cleanup without errdefer.`,
      solution: `const std = @import("std");
const Allocator = std.mem.Allocator;

const Resource = struct { data: u32 };

fn validate(r: *Resource) !void {
    if (r.data == 0) return error.Invalid;
}

fn tryAcquire(allocator: Allocator) !*Resource {
    const resource = try allocator.create(Resource);
    var success = false;
    defer if (!success) allocator.destroy(resource);

    resource.* = Resource{ .data = 42 };
    try validate(resource);

    success = true;
    return resource;
}`,
      hints: [
        'The success flag starts false and is set true only before return.',
        'defer checks the flag: if still false, cleanup runs.',
        'This is an alternative to errdefer using conditional defer.',
      ],
      concepts: ['conditional-defer', 'flag-pattern', 'resource-management'],
    },
    {
      id: 'zig-defer-11',
      title: 'Write: Defer vs Errdefer Ordering',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write code demonstrating the interleaved ordering of defer and errdefer.',
      skeleton: `// Write a function demonstrateOrder that:
// 1. Has a results buffer (passed as parameter)
// 2. Registers: defer append 'D1', errdefer append 'E1',
//    defer append 'D2', errdefer append 'E2'
// 3. Returns error.Demo
// Show that the order in the buffer is: E2, D2, E1, D1 (LIFO, both types)`,
      solution: `fn demonstrateOrder(buf: *[4]u8) !void {
    var idx: usize = 0;
    defer {
        buf[idx] = '1';
        idx += 1;
    }
    errdefer {
        buf[idx] = '2';
        idx += 1;
    }
    defer {
        buf[idx] = '3';
        idx += 1;
    }
    errdefer {
        buf[idx] = '4';
        idx += 1;
    }
    return error.Demo;
    // Order: 4, 3, 2, 1 (LIFO across both defer and errdefer)
}`,
      hints: [
        'defer and errdefer share the same LIFO stack.',
        'They interleave based on declaration order, not type.',
        'On error, both errdefer and defer run in reverse order.',
      ],
      concepts: ['defer-errdefer-ordering', 'LIFO'],
    },
    {
      id: 'zig-defer-12',
      title: 'Write: Loop Cleanup Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a function that allocates resources in a loop with per-iteration cleanup.',
      skeleton: `// Write a function allocateMany that:
// 1. Takes allocator, count: usize
// 2. Allocates an outer slice of []*[256]u8 (pointers)
// 3. In a loop, allocates each inner buffer
// 4. If any inner allocation fails, free all previously allocated buffers
//    and the outer slice (use errdefer for outer, track index for inner)
// 5. Returns the slice of pointers`,
      solution: `const std = @import("std");
const Allocator = std.mem.Allocator;

fn allocateMany(allocator: Allocator, count: usize) ![][]u8 {
    const slices = try allocator.alloc([]u8, count);
    errdefer allocator.free(slices);

    var initialized: usize = 0;
    errdefer for (slices[0..initialized]) |buf| {
        allocator.free(buf);
    };

    for (slices) |*slot| {
        slot.* = try allocator.alloc(u8, 256);
        initialized += 1;
    }

    return slices;
}`,
      hints: [
        'Track how many inner buffers have been allocated with a counter.',
        'errdefer uses the counter to free only the initialized ones.',
        'The outer slice errdefer handles the top-level allocation.',
      ],
      concepts: ['errdefer-in-loop', 'partial-cleanup', 'allocator'],
    },
    {
      id: 'zig-defer-13',
      title: 'Fix: Defer After Return',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Fix code where defer is placed after a potential return.',
      skeleton: `const std = @import("std");
const Allocator = std.mem.Allocator;

fn loadData(allocator: Allocator, len: usize) ![]u8 {
    const buf = try allocator.alloc(u8, len);
    if (len == 0) return error.Empty;  // leak! defer not yet registered
    defer allocator.free(buf);
    return buf;
}`,
      solution: `const std = @import("std");
const Allocator = std.mem.Allocator;

fn loadData(allocator: Allocator, len: usize) ![]u8 {
    const buf = try allocator.alloc(u8, len);
    errdefer allocator.free(buf);
    if (len == 0) return error.Empty;  // errdefer will free buf
    return buf;
}`,
      hints: [
        'The defer must be placed immediately after the allocation.',
        'Use errdefer instead of defer since on success the caller owns the memory.',
        'errdefer runs on error.Empty, preventing the leak.',
      ],
      concepts: ['defer-placement', 'errdefer', 'memory-leak'],
    },
    {
      id: 'zig-defer-14',
      title: 'Fix: Double Free with Defer',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Fix code that causes a double-free by using defer instead of errdefer.',
      skeleton: `const std = @import("std");
const Allocator = std.mem.Allocator;

fn makeBuffer(allocator: Allocator) ![]u8 {
    const buf = try allocator.alloc(u8, 100);
    defer allocator.free(buf);  // BUG: frees on success too!
    @memset(buf, 0);
    return buf;  // caller gets freed memory!
}`,
      solution: `const std = @import("std");
const Allocator = std.mem.Allocator;

fn makeBuffer(allocator: Allocator) ![]u8 {
    const buf = try allocator.alloc(u8, 100);
    errdefer allocator.free(buf);
    @memset(buf, 0);
    return buf;  // caller owns the memory
}`,
      hints: [
        'defer always runs, even on success -- freeing what the caller needs.',
        'errdefer only runs on error, leaving the buffer alive on success.',
        'The caller is responsible for freeing on the success path.',
      ],
      concepts: ['double-free', 'defer-vs-errdefer'],
    },
    {
      id: 'zig-defer-15',
      title: 'Fix: Missing Errdefer in Chain',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Fix a resource leak in a multi-step initialization.',
      skeleton: `const std = @import("std");
const Allocator = std.mem.Allocator;

const App = struct { config: []u8, data: []u8 };

fn initApp(allocator: Allocator) !App {
    const config = try allocator.alloc(u8, 256);
    // Missing errdefer for config!
    const data = try allocator.alloc(u8, 1024);  // if this fails, config leaks
    return App{ .config = config, .data = data };
}`,
      solution: `const std = @import("std");
const Allocator = std.mem.Allocator;

const App = struct { config: []u8, data: []u8 };

fn initApp(allocator: Allocator) !App {
    const config = try allocator.alloc(u8, 256);
    errdefer allocator.free(config);
    const data = try allocator.alloc(u8, 1024);
    errdefer allocator.free(data);
    return App{ .config = config, .data = data };
}`,
      hints: [
        'If the second alloc fails, config must be freed.',
        'Add errdefer allocator.free(config) right after allocating config.',
        'Add errdefer for data too in case later steps are added.',
      ],
      concepts: ['errdefer', 'resource-leak', 'multi-step-init'],
    },
    {
      id: 'zig-defer-16',
      title: 'Predict: Defer Order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict the execution order of multiple defers.',
      skeleton: `const std = @import("std");

pub fn main() void {
    std.debug.print("A", .{});
    defer std.debug.print("B", .{});
    defer std.debug.print("C", .{});
    std.debug.print("D", .{});
}`,
      solution: `ADCB`,
      hints: [
        'A prints immediately, then D prints immediately.',
        'Defers run in LIFO order after the scope ends.',
        'C was deferred last, so it runs first, then B.',
      ],
      concepts: ['defer-lifo', 'execution-order'],
    },
    {
      id: 'zig-defer-17',
      title: 'Predict: Errdefer Skip on Success',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Predict which defers run on success vs error.',
      skeleton: `const std = @import("std");

fn attempt(fail: bool) !u32 {
    defer std.debug.print("D", .{});
    errdefer std.debug.print("E", .{});
    if (fail) return error.Oops;
    return 42;
}

pub fn main() void {
    _ = attempt(false) catch 0;
    std.debug.print("-", .{});
    _ = attempt(true) catch 0;
}`,
      solution: `D-ED`,
      hints: [
        'First call succeeds: defer runs (D), errdefer skipped.',
        'Then - is printed.',
        'Second call fails: errdefer runs (E) then defer runs (D). LIFO.',
      ],
      concepts: ['errdefer-skip', 'defer-always'],
    },
    {
      id: 'zig-defer-18',
      title: 'Predict: Defer in Loop',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Predict output of defer inside a for loop.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const items = [_]u8{ 1, 2, 3 };
    for (items) |item| {
        defer std.debug.print("d", .{});
        std.debug.print("{}", .{item});
    }
    std.debug.print("!", .{});
}`,
      solution: `1d2d3d!`,
      hints: [
        'defer in a for loop runs at the end of each iteration.',
        'Each iteration: print item, then defer prints d.',
        'After the loop, ! is printed.',
      ],
      concepts: ['defer-in-loop', 'iteration-scope'],
    },
    {
      id: 'zig-defer-19',
      title: 'Refactor: Manual Cleanup to Defer',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Refactor manual cleanup code to use defer and errdefer.',
      skeleton: `const std = @import("std");
const Allocator = std.mem.Allocator;

fn process(allocator: Allocator) !u32 {
    const buf = allocator.alloc(u8, 100) catch return error.AllocFailed;
    const result = doWork(buf);
    if (result) |val| {
        if (val == 0) {
            allocator.free(buf);
            return error.ZeroResult;
        }
        allocator.free(buf);
        return val;
    } else |err| {
        allocator.free(buf);
        return err;
    }
}

fn doWork(buf: []u8) !u32 {
    _ = buf;
    return 42;
}`,
      solution: `const std = @import("std");
const Allocator = std.mem.Allocator;

fn process(allocator: Allocator) !u32 {
    const buf = try allocator.alloc(u8, 100);
    defer allocator.free(buf);
    const val = try doWork(buf);
    if (val == 0) return error.ZeroResult;
    return val;
}

fn doWork(buf: []u8) !u32 {
    _ = buf;
    return 42;
}`,
      hints: [
        'defer allocator.free(buf) replaces all three manual free calls.',
        'try replaces the manual catch/if-else error handling.',
        'The code becomes much shorter and less error-prone.',
      ],
      concepts: ['defer-refactor', 'cleanup-simplification'],
    },
    {
      id: 'zig-defer-20',
      title: 'Refactor: Split Defer and Errdefer',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Refactor to correctly use errdefer for returned resources and defer for temporary ones.',
      skeleton: `const std = @import("std");
const Allocator = std.mem.Allocator;

fn buildResult(allocator: Allocator) ![]u8 {
    // Temp buffer (always freed) and result buffer (returned to caller)
    const temp = try allocator.alloc(u8, 64);
    const result = try allocator.alloc(u8, 256);
    // BUG: using defer for both means result is freed before caller gets it
    defer allocator.free(temp);
    defer allocator.free(result);

    fillTemp(temp);
    copyToResult(temp, result);
    return result;
}

fn fillTemp(buf: []u8) void { @memset(buf, 'x'); }
fn copyToResult(src: []u8, dst: []u8) void { @memcpy(dst[0..src.len], src); }`,
      solution: `const std = @import("std");
const Allocator = std.mem.Allocator;

fn buildResult(allocator: Allocator) ![]u8 {
    const temp = try allocator.alloc(u8, 64);
    defer allocator.free(temp);

    const result = try allocator.alloc(u8, 256);
    errdefer allocator.free(result);

    fillTemp(temp);
    copyToResult(temp, result);
    return result;
}

fn fillTemp(buf: []u8) void { @memset(buf, 'x'); }
fn copyToResult(src: []u8, dst: []u8) void { @memcpy(dst[0..src.len], src); }`,
      hints: [
        'temp is temporary: use defer to always free it.',
        'result is returned to the caller: use errdefer to free only on error.',
        'On success, the caller owns result and is responsible for freeing it.',
      ],
      concepts: ['defer-vs-errdefer', 'ownership', 'refactor'],
    },
  ],
};
