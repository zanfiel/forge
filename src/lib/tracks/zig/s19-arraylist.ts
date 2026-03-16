import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-arraylist',
  title: '19. ArrayList',
  explanation: `## ArrayList

\`std.ArrayList\` is Zig's dynamic array -- the equivalent of C++ \`std::vector\` or Rust's \`Vec\`. It manages a growable contiguous buffer using an allocator.

### Creating an ArrayList
\`\`\`zig
const std = @import("std");
var list = std.ArrayList(u32).init(allocator);
defer list.deinit();
\`\`\`

### Basic Operations
\`\`\`zig
try list.append(42);
try list.appendSlice(&[_]u32{ 1, 2, 3 });
const last = list.pop();     // returns ?u32
const items = list.items;    // []u32 slice
\`\`\`

### Insertion and Removal
\`\`\`zig
try list.insert(0, 99);           // insert at index
_ = list.orderedRemove(2);        // preserves order
_ = list.swapRemove(1);           // O(1) but changes order
\`\`\`

### Capacity Management
\`\`\`zig
try list.ensureTotalCapacity(100);
const owned = try list.toOwnedSlice();  // transfers ownership
\`\`\`

ArrayList is the workhorse of dynamic collections in Zig. Because it requires an explicit allocator, there is never any hidden allocation.`,
  exercises: [
    {
      id: 'zig-arraylist-1',
      title: 'Initialize and Deinit',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Create and properly clean up an ArrayList.',
      skeleton: `const std = @import("std");

fn example(allocator: std.mem.Allocator) !void {
    var list = std.ArrayList(u32).___(allocator);
    defer list.___();
    try list.append(42);
}`,
      solution: `const std = @import("std");

fn example(allocator: std.mem.Allocator) !void {
    var list = std.ArrayList(u32).init(allocator);
    defer list.deinit();
    try list.append(42);
}`,
      hints: [
        'init(allocator) creates a new empty ArrayList.',
        'deinit() frees the internal buffer.',
        'Always defer deinit right after init.',
      ],
      concepts: ['ArrayList-init', 'deinit', 'lifecycle'],
    },
    {
      id: 'zig-arraylist-2',
      title: 'Append Items',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Append individual items to an ArrayList.',
      skeleton: `const std = @import("std");

fn buildList(allocator: std.mem.Allocator) !std.ArrayList(i32) {
    var list = std.ArrayList(i32).init(allocator);
    try list.___(10);
    try list.___(20);
    try list.___(30);
    return list;
}`,
      solution: `const std = @import("std");

fn buildList(allocator: std.mem.Allocator) !std.ArrayList(i32) {
    var list = std.ArrayList(i32).init(allocator);
    try list.append(10);
    try list.append(20);
    try list.append(30);
    return list;
}`,
      hints: [
        'append adds a single element to the end.',
        'append can fail if the allocator runs out of memory.',
        'Use try to propagate the potential OutOfMemory error.',
      ],
      concepts: ['append', 'error-handling', 'ArrayList'],
    },
    {
      id: 'zig-arraylist-3',
      title: 'AppendSlice',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Append multiple items at once using appendSlice.',
      skeleton: `const std = @import("std");

fn addBatch(list: *std.ArrayList(u8)) !void {
    const data = [_]u8{ 'H', 'e', 'l', 'l', 'o' };
    try list.___(&data);
}`,
      solution: `const std = @import("std");

fn addBatch(list: *std.ArrayList(u8)) !void {
    const data = [_]u8{ 'H', 'e', 'l', 'l', 'o' };
    try list.appendSlice(&data);
}`,
      hints: [
        'appendSlice adds all elements from a slice at once.',
        'Pass a pointer to the array to get a slice.',
        'More efficient than calling append in a loop.',
      ],
      concepts: ['appendSlice', 'batch-add'],
    },
    {
      id: 'zig-arraylist-4',
      title: 'Access Items',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Access ArrayList contents via items slice.',
      skeleton: `const std = @import("std");

fn sum(list: std.ArrayList(u32)) u32 {
    var total: u32 = 0;
    for (list.___) |val| {
        total += val;
    }
    return total;
}`,
      solution: `const std = @import("std");

fn sum(list: std.ArrayList(u32)) u32 {
    var total: u32 = 0;
    for (list.items) |val| {
        total += val;
    }
    return total;
}`,
      hints: [
        'list.items returns a []T slice of the current contents.',
        'The slice length equals list.items.len (the number of elements).',
        'You can iterate over items with a for loop.',
      ],
      concepts: ['items', 'slice-access', 'iteration'],
    },
    {
      id: 'zig-arraylist-5',
      title: 'Pop Last Element',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Remove and return the last element.',
      skeleton: `const std = @import("std");

fn popLast(list: *std.ArrayList(u32)) ?u32 {
    return list.___();
}`,
      solution: `const std = @import("std");

fn popLast(list: *std.ArrayList(u32)) ?u32 {
    return list.pop();
}`,
      hints: [
        'pop() removes the last element and returns it.',
        'Returns null (as ?T) if the list is empty.',
        'This is O(1) since it just decrements the length.',
      ],
      concepts: ['pop', 'optional-return'],
    },
    {
      id: 'zig-arraylist-6',
      title: 'EnsureTotalCapacity',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Pre-allocate capacity to avoid repeated reallocations.',
      skeleton: `const std = @import("std");

fn buildLargeList(allocator: std.mem.Allocator, count: usize) !std.ArrayList(f64) {
    var list = std.ArrayList(f64).init(allocator);
    try list.___(count);  // pre-allocate
    var i: usize = 0;
    while (i < count) : (i += 1) {
        try list.append(@as(f64, @floatFromInt(i)));
    }
    return list;
}`,
      solution: `const std = @import("std");

fn buildLargeList(allocator: std.mem.Allocator, count: usize) !std.ArrayList(f64) {
    var list = std.ArrayList(f64).init(allocator);
    try list.ensureTotalCapacity(count);  // pre-allocate
    var i: usize = 0;
    while (i < count) : (i += 1) {
        try list.append(@as(f64, @floatFromInt(i)));
    }
    return list;
}`,
      hints: [
        'ensureTotalCapacity pre-allocates buffer space.',
        'Reduces the number of reallocations during appends.',
        'The list capacity is at least count after this call.',
      ],
      concepts: ['ensureTotalCapacity', 'pre-allocation', 'performance'],
    },
    {
      id: 'zig-arraylist-7',
      title: 'Write: Insert at Index',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a function that inserts elements at specific positions.',
      skeleton: `// Write a function insertSorted that:
// 1. Takes a *ArrayList(i32) and a value: i32
// 2. Finds the correct position to insert (ascending order)
// 3. Inserts the value at that position
// 4. The list remains sorted after insertion`,
      solution: `const std = @import("std");

fn insertSorted(list: *std.ArrayList(i32), value: i32) !void {
    var pos: usize = 0;
    for (list.items) |item| {
        if (item >= value) break;
        pos += 1;
    }
    try list.insert(pos, value);
}

test "insert sorted" {
    const allocator = std.testing.allocator;
    var list = std.ArrayList(i32).init(allocator);
    defer list.deinit();

    try insertSorted(&list, 30);
    try insertSorted(&list, 10);
    try insertSorted(&list, 20);

    try std.testing.expect(list.items[0] == 10);
    try std.testing.expect(list.items[1] == 20);
    try std.testing.expect(list.items[2] == 30);
}`,
      hints: [
        'Find the first index where the existing item >= value.',
        'list.insert(index, value) shifts elements right and inserts.',
        'insert can fail with OutOfMemory if growth is needed.',
      ],
      concepts: ['insert', 'sorted-insertion', 'ArrayList'],
    },
    {
      id: 'zig-arraylist-8',
      title: 'Write: orderedRemove vs swapRemove',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write functions demonstrating both removal strategies.',
      skeleton: `// Write two functions:
// 1. removeKeepOrder(list: *ArrayList(u32), index: usize) u32
//    - Uses orderedRemove (preserves order, O(n))
// 2. removeFast(list: *ArrayList(u32), index: usize) u32
//    - Uses swapRemove (O(1) but changes order)
// Both return the removed value.`,
      solution: `const std = @import("std");

fn removeKeepOrder(list: *std.ArrayList(u32), index: usize) u32 {
    return list.orderedRemove(index);
}

fn removeFast(list: *std.ArrayList(u32), index: usize) u32 {
    return list.swapRemove(index);
}

test "remove strategies" {
    const allocator = std.testing.allocator;
    var list = std.ArrayList(u32).init(allocator);
    defer list.deinit();

    try list.appendSlice(&[_]u32{ 10, 20, 30, 40, 50 });

    const removed = removeKeepOrder(&list, 1); // removes 20
    try std.testing.expect(removed == 20);
    try std.testing.expect(list.items[1] == 30); // order preserved

    const fast_removed = removeFast(&list, 0); // removes 10, swaps with last
    try std.testing.expect(fast_removed == 10);
}`,
      hints: [
        'orderedRemove shifts elements to fill the gap -- O(n).',
        'swapRemove replaces with the last element -- O(1) but unordered.',
        'Both return the removed element value.',
      ],
      concepts: ['orderedRemove', 'swapRemove', 'performance-tradeoff'],
    },
    {
      id: 'zig-arraylist-9',
      title: 'Write: toOwnedSlice',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a function that converts an ArrayList to an owned slice.',
      skeleton: `// Write a function buildAndReturn that:
// 1. Creates an ArrayList(u8) with the given allocator
// 2. Appends a greeting message byte by byte
// 3. Calls toOwnedSlice() to get ownership of the buffer
// 4. Returns the owned slice (caller must free it)
// The ArrayList is consumed by toOwnedSlice.`,
      solution: `const std = @import("std");

fn buildAndReturn(allocator: std.mem.Allocator) ![]u8 {
    var list = std.ArrayList(u8).init(allocator);
    // No defer deinit -- toOwnedSlice handles it
    try list.appendSlice("Hello, Zig!");
    return try list.toOwnedSlice();
}

test "to owned slice" {
    const allocator = std.testing.allocator;
    const result = try buildAndReturn(allocator);
    defer allocator.free(result);
    try std.testing.expectEqualStrings("Hello, Zig!", result);
}`,
      hints: [
        'toOwnedSlice transfers ownership of the internal buffer.',
        'After toOwnedSlice, the ArrayList is reset (empty).',
        'The caller must free the returned slice.',
      ],
      concepts: ['toOwnedSlice', 'ownership-transfer', 'ArrayList'],
    },
    {
      id: 'zig-arraylist-10',
      title: 'Write: Filter ArrayList',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a function that filters an ArrayList in-place.',
      skeleton: `// Write a function retainEven that:
// 1. Takes a *ArrayList(i32)
// 2. Removes all odd numbers, keeping only even ones
// 3. Modifies the list in-place (no new allocation)
// 4. Preserves the relative order of remaining elements`,
      solution: `const std = @import("std");

fn retainEven(list: *std.ArrayList(i32)) void {
    var write: usize = 0;
    for (list.items) |item| {
        if (@mod(item, 2) == 0) {
            list.items[write] = item;
            write += 1;
        }
    }
    list.shrinkRetainingCapacity(write);
}

test "retain even" {
    const allocator = std.testing.allocator;
    var list = std.ArrayList(i32).init(allocator);
    defer list.deinit();

    try list.appendSlice(&[_]i32{ 1, 2, 3, 4, 5, 6 });
    retainEven(&list);
    try std.testing.expect(list.items.len == 3);
    try std.testing.expect(list.items[0] == 2);
    try std.testing.expect(list.items[1] == 4);
    try std.testing.expect(list.items[2] == 6);
}`,
      hints: [
        'Use a two-pointer technique: read pointer and write pointer.',
        'Copy matching elements to the write position.',
        'Use shrinkRetainingCapacity to update the length.',
      ],
      concepts: ['in-place-filter', 'two-pointer', 'shrinkRetainingCapacity'],
    },
    {
      id: 'zig-arraylist-11',
      title: 'Write: ArrayList of Structs',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write code that uses an ArrayList of custom structs.',
      skeleton: `// Write:
// 1. A Point struct with x: f32, y: f32
// 2. A function addPoints that appends N random-ish points to an ArrayList(Point)
// 3. A function findClosest that finds the point closest to origin (0,0)
//    using the distance formula sqrt(x*x + y*y)
// 4. Returns ?Point (null if list is empty)`,
      solution: `const std = @import("std");
const math = std.math;

const Point = struct {
    x: f32,
    y: f32,

    fn distanceToOrigin(self: Point) f32 {
        return @sqrt(self.x * self.x + self.y * self.y);
    }
};

fn addPoints(list: *std.ArrayList(Point), points: []const Point) !void {
    try list.appendSlice(points);
}

fn findClosest(list: std.ArrayList(Point)) ?Point {
    if (list.items.len == 0) return null;
    var closest = list.items[0];
    var min_dist = closest.distanceToOrigin();
    for (list.items[1..]) |p| {
        const d = p.distanceToOrigin();
        if (d < min_dist) {
            min_dist = d;
            closest = p;
        }
    }
    return closest;
}`,
      hints: [
        'ArrayList works with any type, including custom structs.',
        'findClosest iterates and tracks the minimum distance.',
        'Return null (optional) when the list is empty.',
      ],
      concepts: ['ArrayList-struct', 'custom-type', 'optional-return'],
    },
    {
      id: 'zig-arraylist-12',
      title: 'Write: Merge Two ArrayLists',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a function that merges two sorted ArrayLists into one.',
      skeleton: `// Write a function mergeSorted that:
// 1. Takes two sorted ArrayList(i32) by value
// 2. Creates a new ArrayList(i32) with the given allocator
// 3. Merges them in sorted order (merge sort merge step)
// 4. Returns the merged ArrayList`,
      solution: `const std = @import("std");

fn mergeSorted(allocator: std.mem.Allocator, a: std.ArrayList(i32), b: std.ArrayList(i32)) !std.ArrayList(i32) {
    var result = std.ArrayList(i32).init(allocator);
    try result.ensureTotalCapacity(a.items.len + b.items.len);

    var i: usize = 0;
    var j: usize = 0;
    while (i < a.items.len and j < b.items.len) {
        if (a.items[i] <= b.items[j]) {
            try result.append(a.items[i]);
            i += 1;
        } else {
            try result.append(b.items[j]);
            j += 1;
        }
    }
    while (i < a.items.len) : (i += 1) try result.append(a.items[i]);
    while (j < b.items.len) : (j += 1) try result.append(b.items[j]);

    return result;
}`,
      hints: [
        'Classic merge: compare heads of both lists, take the smaller.',
        'After one list is exhausted, append the remainder of the other.',
        'Pre-allocate capacity for best performance.',
      ],
      concepts: ['merge-sorted', 'ArrayList', 'algorithm'],
    },
    {
      id: 'zig-arraylist-13',
      title: 'Fix: Deinit Before Use',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Fix code that deinits an ArrayList before it is done being used.',
      skeleton: `const std = @import("std");

fn getItems(allocator: std.mem.Allocator) []u32 {
    var list = std.ArrayList(u32).init(allocator);
    defer list.deinit();  // BUG: frees before return!
    list.append(1) catch unreachable;
    list.append(2) catch unreachable;
    return list.items;  // dangling pointer!
}`,
      solution: `const std = @import("std");

fn getItems(allocator: std.mem.Allocator) ![]u32 {
    var list = std.ArrayList(u32).init(allocator);
    errdefer list.deinit();
    try list.append(1);
    try list.append(2);
    return try list.toOwnedSlice();
}`,
      hints: [
        'defer deinit runs before the function returns, freeing the buffer.',
        'list.items becomes a dangling pointer after deinit.',
        'Use toOwnedSlice to transfer ownership to the caller.',
      ],
      concepts: ['dangling-pointer', 'toOwnedSlice', 'ownership'],
    },
    {
      id: 'zig-arraylist-14',
      title: 'Fix: Index Out of Bounds',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Fix code that accesses an ArrayList at an invalid index.',
      skeleton: `const std = @import("std");

fn getMiddle(list: std.ArrayList(u32)) u32 {
    const mid = list.items.len / 2;
    return list.items[mid];  // BUG: panics if list is empty!
}`,
      solution: `const std = @import("std");

fn getMiddle(list: std.ArrayList(u32)) ?u32 {
    if (list.items.len == 0) return null;
    const mid = list.items.len / 2;
    return list.items[mid];
}`,
      hints: [
        'If the list is empty, items.len is 0, and items[0] panics.',
        'Return ?u32 (optional) and check for empty list first.',
        'Return null when the list is empty.',
      ],
      concepts: ['bounds-check', 'optional-return', 'empty-list'],
    },
    {
      id: 'zig-arraylist-15',
      title: 'Fix: Append Without try',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Fix code that ignores the error from append.',
      skeleton: `const std = @import("std");

fn fill(list: *std.ArrayList(u32), count: usize) void {
    var i: usize = 0;
    while (i < count) : (i += 1) {
        list.append(@intCast(i));  // BUG: ignoring error!
    }
}`,
      solution: `const std = @import("std");

fn fill(list: *std.ArrayList(u32), count: usize) !void {
    var i: usize = 0;
    while (i < count) : (i += 1) {
        try list.append(@intCast(i));
    }
}`,
      hints: [
        'append returns !void -- it can fail with OutOfMemory.',
        'Ignoring the error is a compile error in Zig.',
        'Add try and change return type to !void.',
      ],
      concepts: ['error-handling', 'try', 'OutOfMemory'],
    },
    {
      id: 'zig-arraylist-16',
      title: 'Predict: ArrayList Length',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict the length of an ArrayList after several operations.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var list = std.ArrayList(u32).init(gpa.allocator());
    defer list.deinit();

    try list.append(10);
    try list.append(20);
    try list.append(30);
    _ = list.pop();
    try list.append(40);
    try list.append(50);
    _ = list.orderedRemove(0);

    std.debug.print("{}\\n", .{list.items.len});
}`,
      solution: `3`,
      hints: [
        'append 3 items (len=3), pop 1 (len=2), append 2 (len=4), remove 1 (len=3).',
        '3 + (-1) + 2 + (-1) = 3.',
        'The final list has 3 elements.',
      ],
      concepts: ['ArrayList-length', 'operations'],
    },
    {
      id: 'zig-arraylist-17',
      title: 'Predict: swapRemove Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Predict the order of elements after a swapRemove.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var list = std.ArrayList(u32).init(gpa.allocator());
    defer list.deinit();

    try list.appendSlice(&[_]u32{ 10, 20, 30, 40, 50 });
    _ = list.swapRemove(1);  // remove 20, replace with last

    for (list.items) |v| {
        std.debug.print("{} ", .{v});
    }
}`,
      solution: `10 50 30 40 `,
      hints: [
        'swapRemove(1) removes index 1 (value 20).',
        'It replaces index 1 with the last element (50).',
        'Result: [10, 50, 30, 40].',
      ],
      concepts: ['swapRemove', 'order-change'],
    },
    {
      id: 'zig-arraylist-18',
      title: 'Predict: Pop on Empty',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Predict what pop returns on an empty ArrayList.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var list = std.ArrayList(u32).init(gpa.allocator());
    defer list.deinit();

    try list.append(42);
    const a = list.pop();
    const b = list.pop();

    if (a) |v| std.debug.print("{}", .{v}) else std.debug.print("null", .{});
    std.debug.print(" ", .{});
    if (b) |v| std.debug.print("{}", .{v}) else std.debug.print("null", .{});
}`,
      solution: `42 null`,
      hints: [
        'First pop returns 42 (the only element).',
        'Second pop on empty list returns null.',
        'pop returns ?T (optional).',
      ],
      concepts: ['pop', 'optional', 'empty-list'],
    },
    {
      id: 'zig-arraylist-19',
      title: 'Refactor: Manual Array to ArrayList',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Refactor code using manual dynamic arrays to use ArrayList.',
      skeleton: `const std = @import("std");

const DynArray = struct {
    data: []u32,
    len: usize,
    cap: usize,
    alloc: std.mem.Allocator,

    fn init(allocator: std.mem.Allocator) !DynArray {
        const data = try allocator.alloc(u32, 8);
        return DynArray{ .data = data, .len = 0, .cap = 8, .alloc = allocator };
    }

    fn push(self: *DynArray, val: u32) !void {
        if (self.len >= self.cap) {
            const new_cap = self.cap * 2;
            const new_data = try self.alloc.alloc(u32, new_cap);
            @memcpy(new_data[0..self.len], self.data[0..self.len]);
            self.alloc.free(self.data);
            self.data = new_data;
            self.cap = new_cap;
        }
        self.data[self.len] = val;
        self.len += 1;
    }

    fn deinit(self: *DynArray) void {
        self.alloc.free(self.data);
    }
};`,
      solution: `const std = @import("std");

fn buildNumbers(allocator: std.mem.Allocator) !std.ArrayList(u32) {
    var list = std.ArrayList(u32).init(allocator);
    errdefer list.deinit();
    try list.append(1);
    try list.append(2);
    try list.append(3);
    return list;
}

test "arraylist" {
    const allocator = std.testing.allocator;
    var list = try buildNumbers(allocator);
    defer list.deinit();
    try std.testing.expect(list.items.len == 3);
    try std.testing.expect(list.items[0] == 1);
}`,
      hints: [
        'std.ArrayList handles growth, capacity, and memory management.',
        'Replace the manual struct with std.ArrayList(u32).',
        'push becomes append; the rest is automatic.',
      ],
      concepts: ['ArrayList', 'refactor', 'standard-library'],
    },
    {
      id: 'zig-arraylist-20',
      title: 'Refactor: Multiple Returns to Single ArrayList',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Refactor functions that return fixed arrays to use ArrayList for dynamic sizes.',
      skeleton: `const std = @import("std");

fn getEvens(input: [10]u32) struct { data: [10]u32, count: usize } {
    var result: [10]u32 = undefined;
    var count: usize = 0;
    for (input) |val| {
        if (val % 2 == 0) {
            result[count] = val;
            count += 1;
        }
    }
    return .{ .data = result, .count = count };
}

fn getOdds(input: [10]u32) struct { data: [10]u32, count: usize } {
    var result: [10]u32 = undefined;
    var count: usize = 0;
    for (input) |val| {
        if (val % 2 != 0) {
            result[count] = val;
            count += 1;
        }
    }
    return .{ .data = result, .count = count };
}`,
      solution: `const std = @import("std");

fn filter(allocator: std.mem.Allocator, input: []const u32, predicate: *const fn (u32) bool) !std.ArrayList(u32) {
    var result = std.ArrayList(u32).init(allocator);
    errdefer result.deinit();
    for (input) |val| {
        if (predicate(val)) {
            try result.append(val);
        }
    }
    return result;
}

fn isEven(val: u32) bool { return val % 2 == 0; }
fn isOdd(val: u32) bool { return val % 2 != 0; }

test "filter" {
    const allocator = std.testing.allocator;
    const input = [_]u32{ 1, 2, 3, 4, 5, 6 };
    var evens = try filter(allocator, &input, isEven);
    defer evens.deinit();
    var odds = try filter(allocator, &input, isOdd);
    defer odds.deinit();
    try std.testing.expect(evens.items.len == 3);
    try std.testing.expect(odds.items.len == 3);
}`,
      hints: [
        'Replace the fixed-size array + count with an ArrayList.',
        'Generalize both functions into a single filter with a predicate.',
        'ArrayList handles the dynamic sizing automatically.',
      ],
      concepts: ['ArrayList', 'higher-order', 'refactor', 'DRY'],
    },
  ],
};
