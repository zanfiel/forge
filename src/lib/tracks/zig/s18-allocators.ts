import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-alloc',
  title: '18. Allocators',
  explanation: `## Allocators

Zig has no default allocator and no hidden memory allocation. Every allocation is explicit and uses an Allocator interface, giving you full control over memory management.

### The Allocator Interface
\`\`\`zig
const std = @import("std");
const Allocator = std.mem.Allocator;
// All allocators implement the same interface:
// alloc, free, create, destroy, resize
\`\`\`

### Common Allocators
\`\`\`zig
// General Purpose (debug-friendly, detects leaks)
var gpa = std.heap.GeneralPurposeAllocator(.{}){};
const allocator = gpa.allocator();
defer _ = gpa.deinit(); // reports leaks

// Page Allocator (raw OS pages)
const page_alloc = std.heap.page_allocator;

// Fixed Buffer (no OS calls)
var buf: [4096]u8 = undefined;
var fba = std.heap.FixedBufferAllocator.init(&buf);

// Arena (bulk free, no individual free)
var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
defer arena.deinit();
\`\`\`

### alloc vs create
- \`alloc(T, n)\` allocates a slice of n items: \`[]T\`
- \`create(T)\` allocates a single item: \`*T\`
- \`free(slice)\` / \`destroy(ptr)\` are the corresponding deallocators`,
  exercises: [
    {
      id: 'zig-alloc-1',
      title: 'Allocate a Slice',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Allocate a slice of u8 using an allocator.',
      skeleton: `const std = @import("std");

fn makeBuffer(allocator: std.mem.Allocator) ![]u8 {
    const buf = try allocator.___(u8, 256);
    return buf;
}`,
      solution: `const std = @import("std");

fn makeBuffer(allocator: std.mem.Allocator) ![]u8 {
    const buf = try allocator.alloc(u8, 256);
    return buf;
}`,
      hints: [
        'allocator.alloc(T, n) allocates a slice of n elements of type T.',
        'It returns ![]T -- a slice or an error.',
        'Use try to propagate the allocation error.',
      ],
      concepts: ['alloc', 'slice-allocation', 'allocator'],
    },
    {
      id: 'zig-alloc-2',
      title: 'Free a Slice',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Free an allocated slice.',
      skeleton: `const std = @import("std");

fn useBuffer(allocator: std.mem.Allocator) !void {
    const buf = try allocator.alloc(u8, 100);
    defer allocator.___(buf);
    @memset(buf, 0);
}`,
      solution: `const std = @import("std");

fn useBuffer(allocator: std.mem.Allocator) !void {
    const buf = try allocator.alloc(u8, 100);
    defer allocator.free(buf);
    @memset(buf, 0);
}`,
      hints: [
        'allocator.free(slice) deallocates a slice.',
        'defer ensures the free happens when the scope exits.',
        'Always pair alloc with free.',
      ],
      concepts: ['free', 'defer', 'memory-management'],
    },
    {
      id: 'zig-alloc-3',
      title: 'Create and Destroy',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Allocate and free a single struct instance.',
      skeleton: `const std = @import("std");

const Node = struct { value: u32, next: ?*Node };

fn makeNode(allocator: std.mem.Allocator, val: u32) !*Node {
    const node = try allocator.___(Node);
    node.* = Node{ .value = val, .next = null };
    return node;
}

fn freeNode(allocator: std.mem.Allocator, node: *Node) void {
    allocator.___(node);
}`,
      solution: `const std = @import("std");

const Node = struct { value: u32, next: ?*Node };

fn makeNode(allocator: std.mem.Allocator, val: u32) !*Node {
    const node = try allocator.create(Node);
    node.* = Node{ .value = val, .next = null };
    return node;
}

fn freeNode(allocator: std.mem.Allocator, node: *Node) void {
    allocator.destroy(node);
}`,
      hints: [
        'create(T) allocates a single T and returns *T.',
        'destroy(ptr) frees a single item allocated with create.',
        'create/destroy are for single items; alloc/free are for slices.',
      ],
      concepts: ['create', 'destroy', 'single-allocation'],
    },
    {
      id: 'zig-alloc-4',
      title: 'GeneralPurposeAllocator Setup',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Set up and use the GeneralPurposeAllocator.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.___(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    const data = try allocator.alloc(u8, 100);
    defer allocator.free(data);
    std.debug.print("allocated {} bytes\\n", .{data.len});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    const data = try allocator.alloc(u8, 100);
    defer allocator.free(data);
    std.debug.print("allocated {} bytes\\n", .{data.len});
}`,
      hints: [
        'GeneralPurposeAllocator is Zig\'s debug-friendly allocator.',
        'deinit() at the end reports memory leaks.',
        '.allocator() returns the Allocator interface.',
      ],
      concepts: ['GeneralPurposeAllocator', 'leak-detection'],
    },
    {
      id: 'zig-alloc-5',
      title: 'FixedBufferAllocator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use a FixedBufferAllocator for stack-based allocation.',
      skeleton: `const std = @import("std");

fn stackAlloc() !void {
    var buf: [1024]u8 = undefined;
    var fba = std.heap.___.init(&buf);
    const allocator = fba.allocator();

    const data = try allocator.alloc(u8, 100);
    _ = data;
    // No free needed -- buffer is on the stack
}`,
      solution: `const std = @import("std");

fn stackAlloc() !void {
    var buf: [1024]u8 = undefined;
    var fba = std.heap.FixedBufferAllocator.init(&buf);
    const allocator = fba.allocator();

    const data = try allocator.alloc(u8, 100);
    _ = data;
    // No free needed -- buffer is on the stack
}`,
      hints: [
        'FixedBufferAllocator allocates from a pre-existing buffer.',
        'No OS calls -- great for embedded or stack-scoped allocations.',
        'Returns OutOfMemory if the buffer is exhausted.',
      ],
      concepts: ['FixedBufferAllocator', 'stack-allocation'],
    },
    {
      id: 'zig-alloc-6',
      title: 'ArenaAllocator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use an ArenaAllocator for batch deallocation.',
      skeleton: `const std = @import("std");

fn buildTree(backing: std.mem.Allocator) !void {
    var arena = std.heap.___.init(backing);
    defer arena.deinit();  // frees everything at once
    const allocator = arena.allocator();

    const a = try allocator.alloc(u8, 100);
    const b = try allocator.alloc(u8, 200);
    const c = try allocator.alloc(u8, 300);
    _ = a; _ = b; _ = c;
    // No individual free() needed!
}`,
      solution: `const std = @import("std");

fn buildTree(backing: std.mem.Allocator) !void {
    var arena = std.heap.ArenaAllocator.init(backing);
    defer arena.deinit();  // frees everything at once
    const allocator = arena.allocator();

    const a = try allocator.alloc(u8, 100);
    const b = try allocator.alloc(u8, 200);
    const c = try allocator.alloc(u8, 300);
    _ = a; _ = b; _ = c;
    // No individual free() needed!
}`,
      hints: [
        'ArenaAllocator uses a backing allocator for the actual memory.',
        'deinit() frees all allocations at once.',
        'Individual free() calls are no-ops on arena allocators.',
      ],
      concepts: ['ArenaAllocator', 'bulk-deallocation', 'backing-allocator'],
    },
    {
      id: 'zig-alloc-7',
      title: 'Write: Allocator-Aware Struct',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a struct that stores its allocator for self-cleanup.',
      skeleton: `// Write a DynamicString struct that:
// 1. Stores allocator, data: []u8, len: usize
// 2. pub fn init(allocator, initial_capacity) !DynamicString
// 3. pub fn deinit(self: *DynamicString) void - frees data
// 4. pub fn append(self: *DynamicString, byte: u8) !void
// 5. pub fn slice(self: DynamicString) []const u8`,
      solution: `const std = @import("std");

const DynamicString = struct {
    allocator: std.mem.Allocator,
    data: []u8,
    len: usize,

    pub fn init(allocator: std.mem.Allocator, capacity: usize) !DynamicString {
        const data = try allocator.alloc(u8, capacity);
        return DynamicString{
            .allocator = allocator,
            .data = data,
            .len = 0,
        };
    }

    pub fn deinit(self: *DynamicString) void {
        self.allocator.free(self.data);
    }

    pub fn append(self: *DynamicString, byte: u8) !void {
        if (self.len >= self.data.len) {
            const new_data = try self.allocator.alloc(u8, self.data.len * 2);
            @memcpy(new_data[0..self.len], self.data[0..self.len]);
            self.allocator.free(self.data);
            self.data = new_data;
        }
        self.data[self.len] = byte;
        self.len += 1;
    }

    pub fn slice(self: DynamicString) []const u8 {
        return self.data[0..self.len];
    }
};`,
      hints: [
        'Store the allocator as a field so deinit can free memory.',
        'append doubles capacity when the buffer is full.',
        'slice returns only the populated portion.',
      ],
      concepts: ['allocator-aware', 'dynamic-buffer', 'self-cleanup'],
    },
    {
      id: 'zig-alloc-8',
      title: 'Write: Resize Allocation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a function that grows an allocation using resize or realloc.',
      skeleton: `// Write a function growBuffer that:
// 1. Takes allocator, existing: []u8, new_size: usize
// 2. Tries allocator.resize(existing, new_size) first (in-place)
// 3. If resize returns null, allocates new buffer, copies, frees old
// 4. Returns the new (or resized) buffer`,
      solution: `const std = @import("std");

fn growBuffer(allocator: std.mem.Allocator, existing: []u8, new_size: usize) ![]u8 {
    if (allocator.resize(existing, new_size)) |resized| {
        return resized;
    }
    const new_buf = try allocator.alloc(u8, new_size);
    const copy_len = @min(existing.len, new_size);
    @memcpy(new_buf[0..copy_len], existing[0..copy_len]);
    allocator.free(existing);
    return new_buf;
}`,
      hints: [
        'resize tries to grow in-place without copying.',
        'If resize fails (returns null), fall back to alloc + copy + free.',
        'Copy only the minimum of old size and new size.',
      ],
      concepts: ['resize', 'realloc-pattern', 'memory-growth'],
    },
    {
      id: 'zig-alloc-9',
      title: 'Write: Allocator Selection Helper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a function that selects the appropriate allocator based on size.',
      skeleton: `// Write a function smartAlloc that:
// 1. Takes a size: usize
// 2. If size <= 4096, uses a FixedBufferAllocator with a stack buffer
// 3. If size > 4096, uses page_allocator
// 4. Allocates and returns []u8
// This demonstrates allocator selection strategy.`,
      solution: `const std = @import("std");

fn smartAlloc(size: usize) ![]u8 {
    if (size <= 4096) {
        var buf: [4096]u8 = undefined;
        var fba = std.heap.FixedBufferAllocator.init(&buf);
        const allocator = fba.allocator();
        return try allocator.alloc(u8, size);
    } else {
        return try std.heap.page_allocator.alloc(u8, size);
    }
}`,
      hints: [
        'Small allocations use the stack-based FixedBufferAllocator.',
        'Large allocations go to the OS page allocator.',
        'This is a simplified example of allocator selection strategy.',
      ],
      concepts: ['allocator-selection', 'page-allocator', 'FixedBufferAllocator'],
    },
    {
      id: 'zig-alloc-10',
      title: 'Write: Testing Allocator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a test using the testing allocator to detect leaks.',
      skeleton: `// Write a test that:
// 1. Uses std.testing.allocator (the testing allocator)
// 2. Allocates a []u32 of 10 elements
// 3. Fills it with values 0..9
// 4. Verifies the sum is 45
// 5. Properly frees the memory
// The testing allocator will fail the test if there are leaks.`,
      solution: `const std = @import("std");

test "no leak test" {
    const allocator = std.testing.allocator;
    const data = try allocator.alloc(u32, 10);
    defer allocator.free(data);

    for (data, 0..) |*slot, i| {
        slot.* = @intCast(i);
    }

    var sum: u32 = 0;
    for (data) |v| sum += v;
    try std.testing.expect(sum == 45);
}`,
      hints: [
        'std.testing.allocator detects memory leaks automatically.',
        'If you forget defer allocator.free(data), the test fails.',
        'This is the standard pattern for testing allocator-using code.',
      ],
      concepts: ['testing-allocator', 'leak-detection', 'test'],
    },
    {
      id: 'zig-alloc-11',
      title: 'Write: Arena Scoped Work',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a function that does complex work in an arena scope.',
      skeleton: `// Write a function processData that:
// 1. Creates an ArenaAllocator backed by the given allocator
// 2. Allocates multiple temporary buffers for processing
// 3. Concatenates them into a final result
// 4. Copies the final result to the caller's allocator
// 5. Defers arena.deinit() to clean up all temporaries
// Returns the result allocated on the caller's allocator.`,
      solution: `const std = @import("std");

fn processData(caller_alloc: std.mem.Allocator, inputs: []const []const u8) ![]u8 {
    var arena = std.heap.ArenaAllocator.init(caller_alloc);
    defer arena.deinit();
    const temp_alloc = arena.allocator();

    var total_len: usize = 0;
    for (inputs) |input| total_len += input.len;

    const merged = try temp_alloc.alloc(u8, total_len);
    var offset: usize = 0;
    for (inputs) |input| {
        @memcpy(merged[offset .. offset + input.len], input);
        offset += input.len;
    }

    const result = try caller_alloc.alloc(u8, total_len);
    @memcpy(result, merged);
    return result;
}`,
      hints: [
        'The arena handles all temporary allocations during processing.',
        'arena.deinit() frees everything at once when done.',
        'The final result is allocated on the caller\'s allocator to survive.',
      ],
      concepts: ['ArenaAllocator', 'scoped-allocation', 'ownership-transfer'],
    },
    {
      id: 'zig-alloc-12',
      title: 'Write: Allocator Wrapper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a counting allocator wrapper that tracks allocation count.',
      skeleton: `// Write a CountingAllocator that:
// 1. Wraps another allocator
// 2. Tracks total number of allocations and frees
// 3. Has alloc_count: usize and free_count: usize
// 4. Forwards all calls to the inner allocator
// 5. Has a method leakCount() returning alloc_count - free_count`,
      solution: `const std = @import("std");

const CountingAllocator = struct {
    inner: std.mem.Allocator,
    alloc_count: usize = 0,
    free_count: usize = 0,

    pub fn allocator(self: *CountingAllocator) std.mem.Allocator {
        return .{
            .ptr = self,
            .vtable = &.{
                .alloc = alloc,
                .resize = resize,
                .free = free,
            },
        };
    }

    fn alloc(ctx: *anyopaque, len: usize, ptr_align: u8, ret_addr: usize) ?[*]u8 {
        const self: *CountingAllocator = @ptrCast(@alignCast(ctx));
        self.alloc_count += 1;
        return self.inner.rawAlloc(len, ptr_align, ret_addr);
    }

    fn resize(ctx: *anyopaque, buf: []u8, buf_align: u8, new_len: usize, ret_addr: usize) bool {
        const self: *CountingAllocator = @ptrCast(@alignCast(ctx));
        return self.inner.rawResize(buf, buf_align, new_len, ret_addr);
    }

    fn free(ctx: *anyopaque, buf: []u8, buf_align: u8, ret_addr: usize) void {
        const self: *CountingAllocator = @ptrCast(@alignCast(ctx));
        self.free_count += 1;
        self.inner.rawFree(buf, buf_align, ret_addr);
    }

    pub fn leakCount(self: CountingAllocator) usize {
        return self.alloc_count - self.free_count;
    }
};`,
      hints: [
        'Implement the Allocator vtable by forwarding to the inner allocator.',
        'Increment counters in the alloc and free functions.',
        'leakCount is the difference between allocs and frees.',
      ],
      concepts: ['allocator-wrapper', 'vtable', 'allocation-tracking'],
    },
    {
      id: 'zig-alloc-13',
      title: 'Fix: Missing Free',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Fix a memory leak by adding the missing free.',
      skeleton: `const std = @import("std");

fn processData(allocator: std.mem.Allocator) !u32 {
    const data = try allocator.alloc(u32, 100);
    var sum: u32 = 0;
    for (data) |v| sum += v;
    return sum;
    // Memory leak! data is never freed
}`,
      solution: `const std = @import("std");

fn processData(allocator: std.mem.Allocator) !u32 {
    const data = try allocator.alloc(u32, 100);
    defer allocator.free(data);
    var sum: u32 = 0;
    for (data) |v| sum += v;
    return sum;
}`,
      hints: [
        'The allocated slice is never freed before returning.',
        'Add defer allocator.free(data) right after allocation.',
        'defer ensures cleanup even if other code is added later.',
      ],
      concepts: ['memory-leak', 'defer-free'],
    },
    {
      id: 'zig-alloc-14',
      title: 'Fix: Use-After-Free',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Fix code that uses memory after freeing it.',
      skeleton: `const std = @import("std");

fn getData(allocator: std.mem.Allocator) ![]const u8 {
    const buf = try allocator.alloc(u8, 10);
    @memset(buf, 'A');
    allocator.free(buf);
    return buf;  // BUG: returning freed memory!
}`,
      solution: `const std = @import("std");

fn getData(allocator: std.mem.Allocator) ![]u8 {
    const buf = try allocator.alloc(u8, 10);
    errdefer allocator.free(buf);
    @memset(buf, 'A');
    return buf;  // Caller owns the memory now
}`,
      hints: [
        'Do not free memory that you are returning to the caller.',
        'The caller is responsible for freeing the returned buffer.',
        'Use errdefer to free only if an error occurs before return.',
      ],
      concepts: ['use-after-free', 'ownership', 'errdefer'],
    },
    {
      id: 'zig-alloc-15',
      title: 'Fix: Wrong Allocator Pairing',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Fix code that frees with a different allocator than it allocated with.',
      skeleton: `const std = @import("std");

fn example() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc1 = gpa.allocator();

    const data = try alloc1.alloc(u8, 100);
    std.heap.page_allocator.free(data);  // BUG: wrong allocator!
}`,
      solution: `const std = @import("std");

fn example() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc1 = gpa.allocator();

    const data = try alloc1.alloc(u8, 100);
    alloc1.free(data);
}`,
      hints: [
        'Memory must be freed with the same allocator that allocated it.',
        'Using page_allocator.free on GPA memory causes undefined behavior.',
        'Always pair the same allocator for alloc and free.',
      ],
      concepts: ['allocator-pairing', 'undefined-behavior'],
    },
    {
      id: 'zig-alloc-16',
      title: 'Predict: GPA Leak Detection',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict whether the GPA will report a leak.',
      skeleton: `const std = @import("std");

pub fn main() void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    const allocator = gpa.allocator();

    const a = allocator.alloc(u8, 100) catch unreachable;
    const b = allocator.alloc(u8, 200) catch unreachable;
    allocator.free(a);
    // b is NOT freed

    const check = gpa.deinit();
    std.debug.print("{}\\n", .{check});
}`,
      solution: `.leak`,
      hints: [
        'b is allocated but never freed.',
        'gpa.deinit() returns .leak when unfreed allocations exist.',
        'Only a is freed; b leaks.',
      ],
      concepts: ['leak-detection', 'GPA', 'deinit'],
    },
    {
      id: 'zig-alloc-17',
      title: 'Predict: Arena Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Predict what happens with arena allocator free calls.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
    const alloc = arena.allocator();

    const a = try alloc.alloc(u8, 100);
    const b = try alloc.alloc(u8, 200);
    alloc.free(a);  // Does this actually free?
    alloc.free(b);  // Does this actually free?

    const c = try alloc.alloc(u8, 50);
    std.debug.print("ok\\n", .{});
    _ = c;
    arena.deinit();
}`,
      solution: `ok`,
      hints: [
        'Arena allocator free() is a no-op -- it does nothing.',
        'All memory is freed at once by arena.deinit().',
        'The program runs successfully and prints ok.',
      ],
      concepts: ['arena-free-noop', 'bulk-deallocation'],
    },
    {
      id: 'zig-alloc-18',
      title: 'Predict: FixedBuffer Exhaustion',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Predict what happens when a FixedBufferAllocator runs out of space.',
      skeleton: `const std = @import("std");

pub fn main() void {
    var buf: [100]u8 = undefined;
    var fba = std.heap.FixedBufferAllocator.init(&buf);
    const alloc = fba.allocator();

    const a = alloc.alloc(u8, 60);
    const b = alloc.alloc(u8, 60);

    if (a) |_| std.debug.print("a:ok ", .{}) else |_| std.debug.print("a:err ", .{});
    if (b) |_| std.debug.print("b:ok\\n", .{}) else |_| std.debug.print("b:err\\n", .{});
}`,
      solution: `a:ok b:err`,
      hints: [
        'The buffer is 100 bytes. First alloc of 60 succeeds.',
        'Second alloc of 60 would need 120 total -- exceeds the buffer.',
        'The second alloc returns OutOfMemory error.',
      ],
      concepts: ['FixedBufferAllocator', 'OutOfMemory'],
    },
    {
      id: 'zig-alloc-19',
      title: 'Refactor: Raw Pointer to Allocator',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Refactor code using raw C allocation to use Zig allocators.',
      skeleton: `const c = @cImport(@cInclude("stdlib.h"));

fn makeArray(size: usize) ?[*]u8 {
    const ptr = c.malloc(size);
    if (ptr == null) return null;
    return @ptrCast(ptr);
}

fn freeArray(ptr: [*]u8) void {
    c.free(ptr);
}`,
      solution: `const std = @import("std");

fn makeArray(allocator: std.mem.Allocator, size: usize) ![]u8 {
    return try allocator.alloc(u8, size);
}

fn freeArray(allocator: std.mem.Allocator, buf: []u8) void {
    allocator.free(buf);
}`,
      hints: [
        'Replace C malloc/free with Zig allocator.alloc/free.',
        'Pass the allocator as a parameter instead of using global state.',
        'Return a proper slice []u8 instead of a raw pointer.',
      ],
      concepts: ['allocator-pattern', 'c-to-zig', 'refactor'],
    },
    {
      id: 'zig-alloc-20',
      title: 'Refactor: Global Allocator to Injected',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Refactor code that uses a global allocator to take it as a parameter.',
      skeleton: `const std = @import("std");

var global_gpa = std.heap.GeneralPurposeAllocator(.{}){};
const global_alloc = global_gpa.allocator();

const Item = struct { data: []u8 };

fn createItem(size: usize) !Item {
    const data = try global_alloc.alloc(u8, size);
    return Item{ .data = data };
}

fn destroyItem(item: Item) void {
    global_alloc.free(item.data);
}`,
      solution: `const std = @import("std");

const Item = struct {
    data: []u8,
    allocator: std.mem.Allocator,

    pub fn create(allocator: std.mem.Allocator, size: usize) !Item {
        const data = try allocator.alloc(u8, size);
        return Item{ .data = data, .allocator = allocator };
    }

    pub fn destroy(self: Item) void {
        self.allocator.free(self.data);
    }
};`,
      hints: [
        'Store the allocator in the struct instead of using a global.',
        'Pass the allocator at creation time.',
        'This makes the code testable with different allocators.',
      ],
      concepts: ['dependency-injection', 'allocator-pattern', 'testability'],
    },
  ],
};
