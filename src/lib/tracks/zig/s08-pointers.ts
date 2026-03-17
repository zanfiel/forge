import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-ptr',
  title: '08. Pointers',
  language: 'zig',
  explanation: `Zig pointers are explicit and safe by default. A pointer to type \`T\` is written \`*T\`. You take the address of a variable with \`&\`, and dereference with \`.*\`.

\`\`\`zig
var x: i32 = 42;
const ptr: *i32 = &x;
ptr.* = 100; // dereference and assign
\`\`\`

**Const vs mutable pointers:**
\`\`\`zig
const ptr: *const i32 = &x;  // cannot modify through ptr
var   ptr: *i32       = &x;  // can modify through ptr
\`\`\`

**Optional pointers** use \`?*T\` and can be null:
\`\`\`zig
var maybe: ?*i32 = null;
maybe = &x;
if (maybe) |p| { _ = p.*; }
\`\`\`

**Many-item pointers** \`[*]T\` support pointer arithmetic:
\`\`\`zig
const p: [*]i32 = &arr[0];
const third = (p + 2).*;
\`\`\`

Zig has no implicit pointer coercion and no pointer arithmetic on \`*T\` - use \`[*]T\` explicitly.`,
  exercises: [
    {
      id: 'zig-ptr-1',
      title: 'Take address and dereference',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Use & to take an address and .* to dereference.',
      skeleton: `const std = @import("std");
pub fn main() void {
    var value: i32 = 10;
    const ptr: _____ = &value;
    ptr.* = 20;
    std.debug.print("{d}\\n", .{value});
}`,
      solution: `const std = @import("std");
pub fn main() void {
    var value: i32 = 10;
    const ptr: *i32 = &value;
    ptr.* = 20;
    std.debug.print("{d}\\n", .{value});
}`,
      hints: [
        'A pointer to i32 is written *i32.',
        'Use & to get the address of value.',
        'ptr.* dereferences the pointer to write through it.',
      ],
      concepts: ['pointer type', 'address-of', 'dereference'],
    },
    {
      id: 'zig-ptr-2',
      title: 'Read through a pointer',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict what is printed when reading through a pointer.',
      skeleton: `const std = @import("std");
pub fn main() void {
    const x: u32 = 7;
    const p: *const u32 = &x;
    std.debug.print("{d}\\n", .{p.*});
}`,
      solution: `7`,
      hints: [
        'p.* reads the value the pointer points to.',
        'x is 7, so p.* is also 7.',
        'The output is a single integer.',
      ],
      concepts: ['dereference', 'const pointer'],
    },
    {
      id: 'zig-ptr-3',
      title: 'Pointer to modify caller variable',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Write a function that doubles a value through a pointer.',
      skeleton: `const std = @import("std");

fn double(ptr: _____) void {
    ptr.* *= 2;
}

pub fn main() void {
    var n: i32 = 5;
    double(&n);
    std.debug.print("{d}\\n", .{n}); // 10
}`,
      solution: `const std = @import("std");

fn double(ptr: *i32) void {
    ptr.* *= 2;
}

pub fn main() void {
    var n: i32 = 5;
    double(&n);
    std.debug.print("{d}\\n", .{n}); // 10
}`,
      hints: [
        'The parameter type should be *i32 to allow mutation.',
        'ptr.* *= 2 multiplies the pointed-to value in place.',
        'Pass &n at the call site.',
      ],
      concepts: ['mutable pointer parameter', 'in-place mutation'],
    },
    {
      id: 'zig-ptr-4',
      title: 'Const pointer restriction',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Fix the bug where a const pointer is used to modify the value.',
      skeleton: `const std = @import("std");
pub fn main() void {
    var x: i32 = 1;
    const p: *const i32 = &x;
    p.* = 99; // bug
    std.debug.print("{d}\\n", .{p.*});
}`,
      solution: `const std = @import("std");
pub fn main() void {
    var x: i32 = 1;
    const p: *i32 = &x;
    p.* = 99;
    std.debug.print("{d}\\n", .{p.*});
}`,
      hints: [
        '*const i32 means you cannot write through the pointer.',
        'Change the type to *i32 to allow mutation.',
        'const in the pointer type refers to the pointee, not the pointer itself.',
      ],
      concepts: ['const pointer', 'mutability'],
    },
    {
      id: 'zig-ptr-5',
      title: 'Optional pointer null check',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Use an optional pointer with a null check.',
      skeleton: `const std = @import("std");
pub fn main() void {
    var val: i32 = 42;
    var maybe: _____ = null;
    maybe = &val;
    if (maybe) |ptr| {
        std.debug.print("{d}\\n", .{ptr.*});
    }
}`,
      solution: `const std = @import("std");
pub fn main() void {
    var val: i32 = 42;
    var maybe: ?*i32 = null;
    maybe = &val;
    if (maybe) |ptr| {
        std.debug.print("{d}\\n", .{ptr.*});
    }
}`,
      hints: [
        'An optional pointer to i32 is ?*i32.',
        'Assign null first, then assign &val.',
        'if (maybe) |ptr| captures the non-null pointer.',
      ],
      concepts: ['optional pointer', 'null check', 'capture'],
    },
    {
      id: 'zig-ptr-6',
      title: 'Swap via pointers',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a swap function that exchanges two values through pointers.',
      skeleton: `const std = @import("std");

fn swap(a: *i32, b: *i32) void {
    // your code here
}

pub fn main() void {
    var x: i32 = 3;
    var y: i32 = 7;
    swap(&x, &y);
    std.debug.print("{d} {d}\\n", .{ x, y }); // 7 3
}`,
      solution: `const std = @import("std");

fn swap(a: *i32, b: *i32) void {
    const tmp = a.*;
    a.* = b.*;
    b.* = tmp;
}

pub fn main() void {
    var x: i32 = 3;
    var y: i32 = 7;
    swap(&x, &y);
    std.debug.print("{d} {d}\\n", .{ x, y }); // 7 3
}`,
      hints: [
        'Save a.* in a temp variable first.',
        'Then assign a.* = b.* and b.* = tmp.',
        'Both parameters must be *i32 to write through them.',
      ],
      concepts: ['pointer mutation', 'swap pattern'],
    },
    {
      id: 'zig-ptr-7',
      title: 'Pointer to array element',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Take a pointer to an array element and modify it.',
      skeleton: `const std = @import("std");
pub fn main() void {
    var arr = [_]i32{ 1, 2, 3, 4, 5 };
    const p: *i32 = _____;
    p.* = 99;
    std.debug.print("{d}\\n", .{arr[2]});
}`,
      solution: `const std = @import("std");
pub fn main() void {
    var arr = [_]i32{ 1, 2, 3, 4, 5 };
    const p: *i32 = &arr[2];
    p.* = 99;
    std.debug.print("{d}\\n", .{arr[2]});
}`,
      hints: [
        'Use &arr[2] to get a pointer to the third element.',
        'Writing through p.* modifies arr[2].',
        'The output should be 99.',
      ],
      concepts: ['pointer to element', 'array mutation'],
    },
    {
      id: 'zig-ptr-8',
      title: 'Many-item pointer arithmetic',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use [*]T pointer arithmetic to access array elements.',
      skeleton: `const std = @import("std");
pub fn main() void {
    var arr = [_]u8{ 10, 20, 30, 40 };
    const p: [*]u8 = &arr[0];
    // print the third element using pointer arithmetic
    std.debug.print("{d}\\n", .{_____});
}`,
      solution: `const std = @import("std");
pub fn main() void {
    var arr = [_]u8{ 10, 20, 30, 40 };
    const p: [*]u8 = &arr[0];
    // print the third element using pointer arithmetic
    std.debug.print("{d}\\n", .{(p + 2).*});
}`,
      hints: [
        '[*]u8 is a many-item pointer supporting arithmetic.',
        'p + 2 advances by 2 elements.',
        'Dereference with .* to get the value.',
      ],
      concepts: ['many-item pointer', 'pointer arithmetic'],
    },
    {
      id: 'zig-ptr-9',
      title: 'Predict pointer aliasing output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Predict the output when two pointers alias the same variable.',
      skeleton: `const std = @import("std");
pub fn main() void {
    var n: i32 = 5;
    const p1: *i32 = &n;
    const p2: *i32 = &n;
    p1.* = 10;
    p2.* += 3;
    std.debug.print("{d}\\n", .{n});
}`,
      solution: `13`,
      hints: [
        'p1 and p2 both point to n.',
        'p1.* = 10 sets n to 10.',
        'p2.* += 3 then adds 3 to n making it 13.',
      ],
      concepts: ['aliasing', 'pointer mutation'],
    },
    {
      id: 'zig-ptr-10',
      title: 'Return pointer from function',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Fix the dangling pointer bug by using a caller-owned variable.',
      skeleton: `const std = @import("std");

fn getPtr() *i32 {
    var local: i32 = 42; // bug: returning pointer to local
    return &local;
}

pub fn main() void {
    var storage: i32 = 42;
    const p: *i32 = &storage;
    std.debug.print("{d}\\n", .{p.*});
}`,
      solution: `const std = @import("std");

fn increment(ptr: *i32) void {
    ptr.* += 1;
}

pub fn main() void {
    var storage: i32 = 42;
    increment(&storage);
    std.debug.print("{d}\\n", .{storage});
}`,
      hints: [
        'Returning a pointer to a local variable is undefined behavior.',
        'Instead, pass a pointer in as a parameter.',
        'The caller owns the storage; the function just modifies it.',
      ],
      concepts: ['lifetime', 'dangling pointer', 'safe patterns'],
    },
    {
      id: 'zig-ptr-11',
      title: 'Pointer to struct field',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Take a pointer to a specific struct field and modify it.',
      skeleton: `const std = @import("std");

const Point = struct {
    x: f32,
    y: f32,
};

pub fn main() void {
    var p = Point{ .x = 1.0, .y = 2.0 };
    const xptr: *f32 = _____;
    xptr.* = 10.0;
    std.debug.print("{d}\\n", .{p.x});
}`,
      solution: `const std = @import("std");

const Point = struct {
    x: f32,
    y: f32,
};

pub fn main() void {
    var p = Point{ .x = 1.0, .y = 2.0 };
    const xptr: *f32 = &p.x;
    xptr.* = 10.0;
    std.debug.print("{d}\\n", .{p.x});
}`,
      hints: [
        'Use &p.x to get a pointer to the x field.',
        'The pointer type is *f32 since x is f32.',
        'Writing xptr.* = 10.0 changes p.x.',
      ],
      concepts: ['pointer to field', 'struct mutation'],
    },
    {
      id: 'zig-ptr-12',
      title: 'Optional pointer unwrap',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use .? to forcibly unwrap an optional pointer.',
      skeleton: `const std = @import("std");
pub fn main() void {
    var x: i32 = 55;
    const maybe: ?*i32 = &x;
    const ptr: *i32 = _____;
    std.debug.print("{d}\\n", .{ptr.*});
}`,
      solution: `const std = @import("std");
pub fn main() void {
    var x: i32 = 55;
    const maybe: ?*i32 = &x;
    const ptr: *i32 = maybe.?;
    std.debug.print("{d}\\n", .{ptr.*});
}`,
      hints: [
        'Use .? to unwrap an optional, panicking if null.',
        'maybe.? gives you a *i32 when maybe is non-null.',
        'Only use .? when you are certain the value is not null.',
      ],
      concepts: ['optional unwrap', '.?'],
    },
    {
      id: 'zig-ptr-13',
      title: 'Generic increment via anytype pointer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a generic increment function using anytype.',
      skeleton: `const std = @import("std");

fn increment(ptr: anytype) void {
    ptr.* += 1;
}

pub fn main() void {
    var a: u8 = 10;
    var b: i64 = 100;
    increment(&a);
    increment(&b);
    std.debug.print("{d} {d}\\n", .{ a, b });
}`,
      solution: `const std = @import("std");

fn increment(ptr: anytype) void {
    ptr.* += 1;
}

pub fn main() void {
    var a: u8 = 10;
    var b: i64 = 100;
    increment(&a);
    increment(&b);
    std.debug.print("{d} {d}\\n", .{ a, b });
}`,
      hints: [
        'anytype lets the function accept any pointer type.',
        'ptr.* += 1 works for any numeric pointer.',
        'Zig instantiates a separate version for each concrete type at comptime.',
      ],
      concepts: ['anytype', 'generic pointer', 'comptime'],
    },
    {
      id: 'zig-ptr-14',
      title: 'Pointer size',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict the size of a pointer on a 64-bit system.',
      skeleton: `const std = @import("std");
pub fn main() void {
    std.debug.print("{d}\\n", .{@sizeOf(*u8)});
    std.debug.print("{d}\\n", .{@sizeOf(*u64)});
}`,
      solution: `8
8`,
      hints: [
        'On a 64-bit system, all pointers are 8 bytes.',
        'The pointee type does not affect pointer size.',
        'Both *u8 and *u64 are the same size.',
      ],
      concepts: ['pointer size', '@sizeOf'],
    },
    {
      id: 'zig-ptr-15',
      title: 'Convert many-item pointer to slice',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Convert a many-item pointer to a slice with known length.',
      skeleton: `const std = @import("std");
pub fn main() void {
    var arr = [_]u32{ 1, 2, 3, 4, 5 };
    const p: [*]u32 = &arr[0];
    const sl: []u32 = _____;
    std.debug.print("{d}\\n", .{sl.len});
}`,
      solution: `const std = @import("std");
pub fn main() void {
    var arr = [_]u32{ 1, 2, 3, 4, 5 };
    const p: [*]u32 = &arr[0];
    const sl: []u32 = p[0..5];
    std.debug.print("{d}\\n", .{sl.len});
}`,
      hints: [
        'Use p[0..N] to create a slice from a many-item pointer.',
        'The length N must be known at runtime or comptime.',
        'sl.len will be 5.',
      ],
      concepts: ['many-item pointer', 'slice creation', 'pointer coercion'],
    },
    {
      id: 'zig-ptr-16',
      title: 'Pointer equality',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict whether two pointers to the same variable are equal.',
      skeleton: `const std = @import("std");
pub fn main() void {
    var x: i32 = 1;
    const p1 = &x;
    const p2 = &x;
    std.debug.print("{}\\n", .{p1 == p2});
}`,
      solution: `true`,
      hints: [
        'Both p1 and p2 point to the same address.',
        'Pointer equality compares addresses.',
        'Since both point to x, they are equal.',
      ],
      concepts: ['pointer equality', 'address comparison'],
    },
    {
      id: 'zig-ptr-17',
      title: 'Refactor to use pointer parameter',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Refactor a function that returns a new value to instead modify via pointer.',
      skeleton: `const std = @import("std");

fn addFive(x: i32) i32 {
    return x + 5;
}

pub fn main() void {
    var val: i32 = 10;
    val = addFive(val);
    std.debug.print("{d}\\n", .{val});
}`,
      solution: `const std = @import("std");

fn addFive(ptr: *i32) void {
    ptr.* += 5;
}

pub fn main() void {
    var val: i32 = 10;
    addFive(&val);
    std.debug.print("{d}\\n", .{val});
}`,
      hints: [
        'Change the parameter to *i32 and return void.',
        'Use ptr.* += 5 instead of return x + 5.',
        'At the call site, pass &val instead of reassigning.',
      ],
      concepts: ['refactor', 'output parameter', 'pointer mutation'],
    },
    {
      id: 'zig-ptr-18',
      title: 'Double pointer',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use a pointer to a pointer to reassign a variable.',
      skeleton: `const std = @import("std");
pub fn main() void {
    var a: i32 = 1;
    var b: i32 = 2;
    var ptr: *i32 = &a;
    const pptr: _____= &ptr;
    pptr.*.* = 99;
    std.debug.print("{d}\\n", .{a});
}`,
      solution: `const std = @import("std");
pub fn main() void {
    var a: i32 = 1;
    var b: i32 = 2;
    var ptr: *i32 = &a;
    const pptr: **i32 = &ptr;
    pptr.*.* = 99;
    _ = b;
    std.debug.print("{d}\\n", .{a});
}`,
      hints: [
        'A pointer to a pointer to i32 is **i32.',
        'pptr.* gives you the *i32, then .* dereferences again.',
        'pptr.*.* = 99 sets a to 99.',
      ],
      concepts: ['double pointer', 'multi-level indirection'],
    },
    {
      id: 'zig-ptr-19',
      title: 'Null optional pointer branch',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a function that accepts an optional pointer and handles both null and non-null.',
      skeleton: `const std = @import("std");

fn printOrDefault(ptr: ?*const i32, default: i32) void {
    // print ptr.* if non-null, else print default
}

pub fn main() void {
    var x: i32 = 77;
    printOrDefault(&x, 0);
    printOrDefault(null, 42);
}`,
      solution: `const std = @import("std");

fn printOrDefault(ptr: ?*const i32, default: i32) void {
    if (ptr) |p| {
        std.debug.print("{d}\\n", .{p.*});
    } else {
        std.debug.print("{d}\\n", .{default});
    }
}

pub fn main() void {
    var x: i32 = 77;
    printOrDefault(&x, 0);
    printOrDefault(null, 42);
}`,
      hints: [
        'Use if (ptr) |p| to capture the non-null pointer.',
        'The else branch handles the null case.',
        'p is *const i32 inside the capture block.',
      ],
      concepts: ['optional pointer', 'null handling', 'capture'],
    },
    {
      id: 'zig-ptr-20',
      title: 'Pointer to comptime value',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict whether you can take a pointer to a comptime constant.',
      skeleton: `const std = @import("std");
pub fn main() void {
    const x: i32 = 10;
    const p: *const i32 = &x;
    std.debug.print("{d}\\n", .{p.*});
}`,
      solution: `10`,
      hints: [
        'You can take a pointer to a const variable.',
        'The pointer type must be *const i32 to match.',
        'p.* reads the value, which is 10.',
      ],
      concepts: ['const pointer', 'comptime constant'],
    },
  ],
};
