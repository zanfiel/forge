import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-map',
  title: '20. HashMaps',
  language: 'zig',
  explanation: `Zig provides hash maps in \`std.hash_map\`. The common choices are:

- \`std.AutoHashMap(K, V)\` — for integer/pointer keys with auto-hashing
- \`std.StringHashMap(V)\` — for \`[]const u8\` string keys

\`\`\`zig
var map = std.AutoHashMap(i32, []const u8).init(allocator);
defer map.deinit();
try map.put(1, "one");
const val = map.get(1); // ?[]const u8
\`\`\`

**getOrPut** inserts if missing and returns a pointer to the value:
\`\`\`zig
const gop = try map.getOrPut(key);
if (!gop.found_existing) gop.value_ptr.* = 0;
\`\`\`

**remove** deletes a key:
\`\`\`zig
_ = map.remove(key);
\`\`\`

**Iteration** via iterator:
\`\`\`zig
var it = map.iterator();
while (it.next()) |entry| {
    _ = entry.key_ptr.*;
    _ = entry.value_ptr.*;
}
\`\`\`

All mutating operations may return errors (allocation failures), so \`try\` is required on \`put\` and \`getOrPut\`.`,
  exercises: [
    {
      id: 'zig-map-1',
      title: 'Create and insert into AutoHashMap',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Create an AutoHashMap and insert a key-value pair.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    var map = std.AutoHashMap(_____, _____).init(alloc);
    defer map.deinit();

    try map.put(1, 100);
    std.debug.print("count: {d}\\n", .{map.count()});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    var map = std.AutoHashMap(i32, i32).init(alloc);
    defer map.deinit();

    try map.put(1, 100);
    std.debug.print("count: {d}\\n", .{map.count()});
}`,
      hints: [
        'AutoHashMap takes key type and value type as parameters.',
        'For integer keys and values: AutoHashMap(i32, i32).',
        'map.count() returns the number of entries.',
      ],
      concepts: ['AutoHashMap', 'put', 'count'],
    },
    {
      id: 'zig-map-2',
      title: 'get returns optional',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Use get to look up a value and handle the optional result.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var map = std.AutoHashMap(u32, u32).init(gpa.allocator());
    defer map.deinit();
    try map.put(5, 25);

    const val = map.get(_____);
    std.debug.print("{?}\\n", .{val});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var map = std.AutoHashMap(u32, u32).init(gpa.allocator());
    defer map.deinit();
    try map.put(5, 25);

    const val = map.get(5);
    std.debug.print("{?}\\n", .{val});
}`,
      hints: [
        'map.get(key) returns ?V — null if not found.',
        'Pass key 5 to retrieve the value 25.',
        '{?} prints optionals; output is 25.',
      ],
      concepts: ['get', 'optional return'],
    },
    {
      id: 'zig-map-3',
      title: 'Lookup missing key',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict the output when looking up a key that does not exist.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var map = std.AutoHashMap(u8, u8).init(gpa.allocator());
    defer map.deinit();
    try map.put(1, 10);

    const v = map.get(99) orelse 0;
    std.debug.print("{d}\\n", .{v});
}`,
      solution: `0`,
      hints: [
        'Key 99 was never inserted.',
        'map.get(99) returns null.',
        'orelse 0 provides the fallback.',
      ],
      concepts: ['missing key', 'orelse fallback'],
    },
    {
      id: 'zig-map-4',
      title: 'StringHashMap',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Use StringHashMap with string keys.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();

    var map = std.StringHashMap(u32).init(gpa.allocator());
    defer map.deinit();

    try map.put("apple", 5);
    try map.put("banana", 3);

    const count = map.get(_____) orelse 0;
    std.debug.print("{d}\\n", .{count});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();

    var map = std.StringHashMap(u32).init(gpa.allocator());
    defer map.deinit();

    try map.put("apple", 5);
    try map.put("banana", 3);

    const count = map.get("apple") orelse 0;
    std.debug.print("{d}\\n", .{count});
}`,
      hints: [
        'StringHashMap uses []const u8 as key type.',
        'Retrieve "apple" which has value 5.',
        'Output: 5.',
      ],
      concepts: ['StringHashMap', 'string key'],
    },
    {
      id: 'zig-map-5',
      title: 'remove a key',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Remove a key from a hash map and verify it is gone.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var map = std.AutoHashMap(u8, u8).init(gpa.allocator());
    defer map.deinit();
    try map.put(1, 10);
    try map.put(2, 20);

    _ = map.remove(1);
    std.debug.print("{d}\\n", .{map.count()});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var map = std.AutoHashMap(u8, u8).init(gpa.allocator());
    defer map.deinit();
    try map.put(1, 10);
    try map.put(2, 20);

    _ = map.remove(1);
    std.debug.print("{d}\\n", .{map.count()});
}`,
      hints: [
        'map.remove(key) returns a bool indicating if the key existed.',
        'After removing key 1, only key 2 remains.',
        'Output: 1.',
      ],
      concepts: ['remove', 'map size'],
    },
    {
      id: 'zig-map-6',
      title: 'Iterate key-value pairs',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Iterate over all entries in a hash map.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var map = std.AutoHashMap(u8, u8).init(gpa.allocator());
    defer map.deinit();
    try map.put(1, 10);
    try map.put(2, 20);

    var it = map.iterator();
    while (it.next()) |entry| {
        std.debug.print("{d}={d}\\n", .{ entry.key_ptr.*, entry.value_ptr.* });
    }
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var map = std.AutoHashMap(u8, u8).init(gpa.allocator());
    defer map.deinit();
    try map.put(1, 10);
    try map.put(2, 20);

    var it = map.iterator();
    while (it.next()) |entry| {
        std.debug.print("{d}={d}\\n", .{ entry.key_ptr.*, entry.value_ptr.* });
    }
}`,
      hints: [
        'map.iterator() returns an iterator.',
        'it.next() returns ?Entry; capture it in the while.',
        'entry.key_ptr.* and entry.value_ptr.* dereference the pointers.',
      ],
      concepts: ['iterator', 'entry', 'key_ptr/value_ptr'],
    },
    {
      id: 'zig-map-7',
      title: 'getOrPut for counters',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use getOrPut to count word frequencies.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var counts = std.StringHashMap(u32).init(gpa.allocator());
    defer counts.deinit();

    const words = [_][]const u8{ "a", "b", "a", "c", "a" };
    for (words) |w| {
        const gop = try counts.getOrPut(w);
        if (!gop.found_existing) gop.value_ptr.* = 0;
        gop.value_ptr.* += 1;
    }

    std.debug.print("{d}\\n", .{counts.get("a").?});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var counts = std.StringHashMap(u32).init(gpa.allocator());
    defer counts.deinit();

    const words = [_][]const u8{ "a", "b", "a", "c", "a" };
    for (words) |w| {
        const gop = try counts.getOrPut(w);
        if (!gop.found_existing) gop.value_ptr.* = 0;
        gop.value_ptr.* += 1;
    }

    std.debug.print("{d}\\n", .{counts.get("a").?});
}`,
      hints: [
        'getOrPut inserts a default if missing and returns a pointer.',
        '"a" appears 3 times.',
        'Output: 3.',
      ],
      concepts: ['getOrPut', 'frequency counting'],
    },
    {
      id: 'zig-map-8',
      title: 'contains key check',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Check if a key exists using contains().',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var map = std.AutoHashMap(i32, i32).init(gpa.allocator());
    defer map.deinit();
    try map.put(42, 1);

    std.debug.print("{} {}\\n", .{ map._____(42), map._____(99) });
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var map = std.AutoHashMap(i32, i32).init(gpa.allocator());
    defer map.deinit();
    try map.put(42, 1);

    std.debug.print("{} {}\\n", .{ map.contains(42), map.contains(99) });
}`,
      hints: [
        'map.contains(key) returns bool.',
        '42 exists, 99 does not.',
        'Output: "true false".',
      ],
      concepts: ['contains', 'membership check'],
    },
    {
      id: 'zig-map-9',
      title: 'Update existing value',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Update a value in a map by fetching a pointer and writing through it.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var map = std.AutoHashMap(u8, u32).init(gpa.allocator());
    defer map.deinit();
    try map.put(1, 10);

    if (map.getPtr(1)) |ptr| {
        ptr.* *= 3;
    }
    std.debug.print("{d}\\n", .{map.get(1).?});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var map = std.AutoHashMap(u8, u32).init(gpa.allocator());
    defer map.deinit();
    try map.put(1, 10);

    if (map.getPtr(1)) |ptr| {
        ptr.* *= 3;
    }
    std.debug.print("{d}\\n", .{map.get(1).?});
}`,
      hints: [
        'getPtr returns ?*V, a mutable pointer to the value.',
        'ptr.* *= 3 multiplies the existing value.',
        'Output: 30.',
      ],
      concepts: ['getPtr', 'in-place update'],
    },
    {
      id: 'zig-map-10',
      title: 'Predict count after operations',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Predict the count after insertions and removals.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var map = std.AutoHashMap(u8, u8).init(gpa.allocator());
    defer map.deinit();
    try map.put(1, 1);
    try map.put(2, 2);
    try map.put(3, 3);
    _ = map.remove(2);
    try map.put(4, 4);
    std.debug.print("{d}\\n", .{map.count()});
}`,
      solution: `3`,
      hints: [
        'Insert 1, 2, 3 -> count=3.',
        'Remove 2 -> count=2.',
        'Insert 4 -> count=3.',
      ],
      concepts: ['map count', 'insert and remove'],
    },
    {
      id: 'zig-map-11',
      title: 'HashMap with struct values',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Store struct values in a hash map.',
      skeleton: `const std = @import("std");

const Point = struct { x: f32, y: f32 };

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var map = std.StringHashMap(Point).init(gpa.allocator());
    defer map.deinit();

    try map.put("origin", Point{ .x = 0.0, .y = 0.0 });
    const p = map.get(_____).?;
    std.debug.print("{d} {d}\\n", .{ p.x, p.y });
}`,
      solution: `const std = @import("std");

const Point = struct { x: f32, y: f32 };

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var map = std.StringHashMap(Point).init(gpa.allocator());
    defer map.deinit();

    try map.put("origin", Point{ .x = 0.0, .y = 0.0 });
    const p = map.get("origin").?;
    std.debug.print("{d} {d}\\n", .{ p.x, p.y });
}`,
      hints: [
        'Get the value for "origin".',
        'map.get("origin") returns ?Point.',
        'Output: 0 0.',
      ],
      concepts: ['struct value', 'StringHashMap'],
    },
    {
      id: 'zig-map-12',
      title: 'Unmanaged HashMap',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use AutoHashMapUnmanaged which does not store the allocator.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    var map = std.AutoHashMapUnmanaged(u32, u32){};
    defer map.deinit(alloc);

    try map.put(_____, 1, 99);
    std.debug.print("{d}\\n", .{map.get(1).?});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    var map = std.AutoHashMapUnmanaged(u32, u32){};
    defer map.deinit(alloc);

    try map.put(alloc, 1, 99);
    std.debug.print("{d}\\n", .{map.get(1).?});
}`,
      hints: [
        'Unmanaged maps require passing the allocator to each mutating call.',
        'put(alloc, key, value) is the signature.',
        'Output: 99.',
      ],
      concepts: ['Unmanaged HashMap', 'explicit allocator'],
    },
    {
      id: 'zig-map-13',
      title: 'putAssumeCapacity for pre-allocated maps',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use ensureTotalCapacity then putAssumeCapacity.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var map = std.AutoHashMap(u8, u8).init(gpa.allocator());
    defer map.deinit();

    try map.ensureTotalCapacity(10);
    map.putAssumeCapacity(1, 11);
    map.putAssumeCapacity(2, 22);
    std.debug.print("{d}\\n", .{map.count()});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var map = std.AutoHashMap(u8, u8).init(gpa.allocator());
    defer map.deinit();

    try map.ensureTotalCapacity(10);
    map.putAssumeCapacity(1, 11);
    map.putAssumeCapacity(2, 22);
    std.debug.print("{d}\\n", .{map.count()});
}`,
      hints: [
        'ensureTotalCapacity pre-allocates so putAssumeCapacity cannot fail.',
        'putAssumeCapacity does not return an error.',
        'Output: 2.',
      ],
      concepts: ['ensureTotalCapacity', 'putAssumeCapacity'],
    },
    {
      id: 'zig-map-14',
      title: 'Build a word index',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Build a StringHashMap that maps a word to its first position.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var index = std.StringHashMap(usize).init(gpa.allocator());
    defer index.deinit();

    const words = [_][]const u8{ "cat", "dog", "cat", "bird" };
    for (words, 0..) |w, i| {
        if (!index.contains(w)) {
            try index.put(w, i);
        }
    }
    std.debug.print("{d}\\n", .{index.get("cat").?});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var index = std.StringHashMap(usize).init(gpa.allocator());
    defer index.deinit();

    const words = [_][]const u8{ "cat", "dog", "cat", "bird" };
    for (words, 0..) |w, i| {
        if (!index.contains(w)) {
            try index.put(w, i);
        }
    }
    std.debug.print("{d}\\n", .{index.get("cat").?});
}`,
      hints: [
        'Only insert if the key is not already present.',
        '"cat" first appears at index 0.',
        'Output: 0.',
      ],
      concepts: ['first-occurrence index', 'contains check'],
    },
    {
      id: 'zig-map-15',
      title: 'Invert a map',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Invert a map so values become keys and keys become values.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    var original = std.AutoHashMap(u8, u8).init(alloc);
    defer original.deinit();
    try original.put(1, 10);
    try original.put(2, 20);

    var inverted = std.AutoHashMap(u8, u8).init(alloc);
    defer inverted.deinit();

    var it = original.iterator();
    while (it.next()) |e| {
        try inverted.put(e.value_ptr.*, e.key_ptr.*);
    }

    std.debug.print("{d}\\n", .{inverted.get(10).?});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    var original = std.AutoHashMap(u8, u8).init(alloc);
    defer original.deinit();
    try original.put(1, 10);
    try original.put(2, 20);

    var inverted = std.AutoHashMap(u8, u8).init(alloc);
    defer inverted.deinit();

    var it = original.iterator();
    while (it.next()) |e| {
        try inverted.put(e.value_ptr.*, e.key_ptr.*);
    }

    std.debug.print("{d}\\n", .{inverted.get(10).?});
}`,
      hints: [
        'Swap key and value when inserting into the inverted map.',
        'inverted maps 10 -> 1 and 20 -> 2.',
        'Output: 1.',
      ],
      concepts: ['map inversion', 'iterator'],
    },
    {
      id: 'zig-map-16',
      title: 'fetchRemove',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use fetchRemove to atomically remove and retrieve a value.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var map = std.AutoHashMap(u8, u32).init(gpa.allocator());
    defer map.deinit();
    try map.put(7, 777);

    const entry = map._____(7);
    std.debug.print("{?}\\n", .{entry});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var map = std.AutoHashMap(u8, u32).init(gpa.allocator());
    defer map.deinit();
    try map.put(7, 777);

    const entry = map.fetchRemove(7);
    std.debug.print("{?}\\n", .{entry});
}`,
      hints: [
        'fetchRemove removes a key and returns the key-value pair as an optional.',
        'The returned type is ?KV.',
        'Prints the KV entry struct.',
      ],
      concepts: ['fetchRemove', 'atomic get-and-remove'],
    },
    {
      id: 'zig-map-17',
      title: 'Nested maps',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use a map of maps to represent a 2D grid of counters.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    var outer = std.AutoHashMap(u8, std.AutoHashMap(u8, u32)).init(alloc);
    defer {
        var it = outer.iterator();
        while (it.next()) |e| e.value_ptr.deinit();
        outer.deinit();
    }

    var inner = std.AutoHashMap(u8, u32).init(alloc);
    try inner.put(1, 99);
    try outer.put(0, inner);

    const row = outer.getPtr(0).?;
    std.debug.print("{d}\\n", .{row.get(1).?});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    var outer = std.AutoHashMap(u8, std.AutoHashMap(u8, u32)).init(alloc);
    defer {
        var it = outer.iterator();
        while (it.next()) |e| e.value_ptr.deinit();
        outer.deinit();
    }

    var inner = std.AutoHashMap(u8, u32).init(alloc);
    try inner.put(1, 99);
    try outer.put(0, inner);

    const row = outer.getPtr(0).?;
    std.debug.print("{d}\\n", .{row.get(1).?});
}`,
      hints: [
        'getPtr returns a mutable pointer to the inner map.',
        'row.get(1) retrieves 99.',
        'Output: 99.',
      ],
      concepts: ['nested HashMap', 'getPtr'],
    },
    {
      id: 'zig-map-18',
      title: 'Iterate keys only',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Iterate only the keys of a hash map using keyIterator.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var map = std.AutoHashMap(u8, u8).init(gpa.allocator());
    defer map.deinit();
    try map.put(10, 1);
    try map.put(20, 2);

    var kit = map.keyIterator();
    var sum: u32 = 0;
    while (kit.next()) |k| sum += k.*;
    std.debug.print("{d}\\n", .{sum});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var map = std.AutoHashMap(u8, u8).init(gpa.allocator());
    defer map.deinit();
    try map.put(10, 1);
    try map.put(20, 2);

    var kit = map.keyIterator();
    var sum: u32 = 0;
    while (kit.next()) |k| sum += k.*;
    std.debug.print("{d}\\n", .{sum});
}`,
      hints: [
        'keyIterator() returns an iterator over *K (key pointers).',
        'k.* dereferences to get the key value.',
        'Sum of 10 + 20 = 30.',
      ],
      concepts: ['keyIterator', 'keys only'],
    },
    {
      id: 'zig-map-19',
      title: 'clearRetainingCapacity',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict the count after clearRetainingCapacity.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var map = std.AutoHashMap(u8, u8).init(gpa.allocator());
    defer map.deinit();
    try map.put(1, 1);
    try map.put(2, 2);
    map.clearRetainingCapacity();
    std.debug.print("{d}\\n", .{map.count()});
}`,
      solution: `0`,
      hints: [
        'clearRetainingCapacity removes all entries but keeps allocated memory.',
        'count() returns 0 after clearing.',
        'Output: 0.',
      ],
      concepts: ['clearRetainingCapacity', 'map reset'],
    },
    {
      id: 'zig-map-20',
      title: 'Use map to memoize fibonacci',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Memoize fibonacci using a hash map cache.',
      skeleton: `const std = @import("std");

fn fib(n: u64, cache: *std.AutoHashMap(u64, u64)) !u64 {
    if (n <= 1) return n;
    if (cache.get(n)) |v| return v;
    const result = try fib(n - 1, cache) + try fib(n - 2, cache);
    try cache.put(n, result);
    return result;
}

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var cache = std.AutoHashMap(u64, u64).init(gpa.allocator());
    defer cache.deinit();
    std.debug.print("{d}\\n", .{try fib(10, &cache)});
}`,
      solution: `const std = @import("std");

fn fib(n: u64, cache: *std.AutoHashMap(u64, u64)) !u64 {
    if (n <= 1) return n;
    if (cache.get(n)) |v| return v;
    const result = try fib(n - 1, cache) + try fib(n - 2, cache);
    try cache.put(n, result);
    return result;
}

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    var cache = std.AutoHashMap(u64, u64).init(gpa.allocator());
    defer cache.deinit();
    std.debug.print("{d}\\n", .{try fib(10, &cache)});
}`,
      hints: [
        'fib(10) = 55.',
        'The cache prevents redundant computation.',
        'Output: 55.',
      ],
      concepts: ['memoization', 'HashMap cache', 'recursion'],
    },
  ],
};
