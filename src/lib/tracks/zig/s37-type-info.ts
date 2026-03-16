import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-typeinfo',
  title: '37. Type Info',
  language: 'zig',
  explanation: `Zig provides comptime type reflection through \`@typeInfo\`, \`std.meta\`, and related builtins.

**@typeInfo** returns a \`std.builtin.Type\` tagged union:
\`\`\`zig
const info = @typeInfo(i32); // info.Int.bits == 32
const info = @typeInfo([]u8); // info.Pointer
\`\`\`

**Common TypeInfo variants:**
- \`.Int\` — integer types
- \`.Float\` — float types
- \`.Struct\` — structs with \`.fields\` array
- \`.Enum\` — enums with \`.fields\` array
- \`.Union\` — unions
- \`.Pointer\` — pointer types
- \`.Optional\` — optional types
- \`.Array\` — fixed arrays
- \`.Fn\` — function types

**Useful builtins:**
- \`@typeName(T)\` — string name of type T
- \`@sizeOf(T)\` — size in bytes
- \`@bitSizeOf(T)\` — size in bits
- \`@alignOf(T)\` — alignment
- \`@TypeOf(expr)\` — type of an expression
- \`@hasField(T, "name")\` — comptime field existence check
- \`@hasDecl(T, "name")\` — comptime declaration check`,
  exercises: [
    {
      id: 'zig-typeinfo-1',
      title: '@typeName',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict the output of @typeName for common types.',
      skeleton: `const std = @import("std");

pub fn main() void {
    std.debug.print("{s}\\n", .{@typeName(i32)});
    std.debug.print("{s}\\n", .{@typeName([]const u8)});
}`,
      solution: `i32
[]const u8`,
      hints: [
        '@typeName returns the string representation of a type.',
        'i32 is "i32", []const u8 is "[]const u8".',
        'Output shows both type names.',
      ],
      concepts: ['@typeName', 'type name'],
    },
    {
      id: 'zig-typeinfo-2',
      title: '@TypeOf expression',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Use @TypeOf to get the type of an expression.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const x = 42;
    std.debug.print("{s}\\n", .{@typeName(_____)}); // should print "comptime_int"
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const x = 42;
    std.debug.print("{s}\\n", .{@typeName(@TypeOf(x))});
}`,
      hints: [
        '@TypeOf(expr) returns the type of an expression.',
        '42 is a comptime_int literal.',
        'Output: comptime_int.',
      ],
      concepts: ['@TypeOf', 'type inference'],
    },
    {
      id: 'zig-typeinfo-3',
      title: '@typeInfo for integers',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Use @typeInfo to get the bit width of an integer type.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const info = @typeInfo(u64);
    std.debug.print("{d}\\n", .{info.Int.bits});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const info = @typeInfo(u64);
    std.debug.print("{d}\\n", .{info.Int.bits});
}`,
      hints: [
        '@typeInfo(u64).Int gives the Int type info.',
        '.bits is the number of bits in the integer type.',
        'Output: 64.',
      ],
      concepts: ['@typeInfo', '.Int.bits'],
    },
    {
      id: 'zig-typeinfo-4',
      title: '@typeInfo for struct fields',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Count the fields of a struct using @typeInfo.',
      skeleton: `const std = @import("std");

const Point = struct { x: f32, y: f32, z: f32 };

pub fn main() void {
    const fields = @typeInfo(Point)._____.fields;
    std.debug.print("{d}\\n", .{fields.len});
}`,
      solution: `const std = @import("std");

const Point = struct { x: f32, y: f32, z: f32 };

pub fn main() void {
    const fields = @typeInfo(Point).Struct.fields;
    std.debug.print("{d}\\n", .{fields.len});
}`,
      hints: [
        '@typeInfo(Point).Struct accesses the struct type info.',
        '.fields is the array of field descriptors.',
        'Output: 3.',
      ],
      concepts: ['@typeInfo', '.Struct.fields', 'field count'],
    },
    {
      id: 'zig-typeinfo-5',
      title: 'Iterate struct fields at comptime',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Print all field names of a struct at comptime.',
      skeleton: `const std = @import("std");

const Config = struct {
    host: []const u8,
    port: u16,
    debug: bool,
};

pub fn main() void {
    const fields = @typeInfo(Config).Struct.fields;
    inline for (fields) |f| {
        std.debug.print("{s}\\n", .{f.name});
    }
}`,
      solution: `const std = @import("std");

const Config = struct {
    host: []const u8,
    port: u16,
    debug: bool,
};

pub fn main() void {
    const fields = @typeInfo(Config).Struct.fields;
    inline for (fields) |f| {
        std.debug.print("{s}\\n", .{f.name});
    }
}`,
      hints: [
        'inline for is required to iterate comptime arrays.',
        'f.name is the field name as a comptime string.',
        'Output: host, port, debug.',
      ],
      concepts: ['inline for', 'field.name', 'comptime iteration'],
    },
    {
      id: 'zig-typeinfo-6',
      title: '@hasField',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Check if a struct has a specific field at comptime.',
      skeleton: `const std = @import("std");

const S = struct { x: i32, y: i32 };

pub fn main() void {
    std.debug.print("{} {}\\n", .{
        _____(S, "x"),
        _____(S, "z"),
    });
}`,
      solution: `const std = @import("std");

const S = struct { x: i32, y: i32 };

pub fn main() void {
    std.debug.print("{} {}\\n", .{
        @hasField(S, "x"),
        @hasField(S, "z"),
    });
}`,
      hints: [
        '@hasField(T, "name") returns bool at comptime.',
        'S has x but not z.',
        'Output: "true false".',
      ],
      concepts: ['@hasField', 'comptime field check'],
    },
    {
      id: 'zig-typeinfo-7',
      title: '@hasDecl',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Check if a type has a specific declaration.',
      skeleton: `const std = @import("std");

const T = struct {
    pub fn init() T { return .{}; }
};

pub fn main() void {
    std.debug.print("{} {}\\n", .{
        _____(T, "init"),
        _____(T, "deinit"),
    });
}`,
      solution: `const std = @import("std");

const T = struct {
    pub fn init() T { return .{}; }
};

pub fn main() void {
    std.debug.print("{} {}\\n", .{
        @hasDecl(T, "init"),
        @hasDecl(T, "deinit"),
    });
}`,
      hints: [
        '@hasDecl(T, "name") checks for a pub declaration.',
        'T has init but not deinit.',
        'Output: "true false".',
      ],
      concepts: ['@hasDecl', 'comptime declaration check'],
    },
    {
      id: 'zig-typeinfo-8',
      title: 'Get field type',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Retrieve the type of a struct field using @typeInfo.',
      skeleton: `const std = @import("std");

const S = struct { count: u32, label: []const u8 };

pub fn main() void {
    const fields = @typeInfo(S).Struct.fields;
    std.debug.print("{s}\\n", .{@typeName(fields[0].type)});
}`,
      solution: `const std = @import("std");

const S = struct { count: u32, label: []const u8 };

pub fn main() void {
    const fields = @typeInfo(S).Struct.fields;
    std.debug.print("{s}\\n", .{@typeName(fields[0].type)});
}`,
      hints: [
        'fields[0].type is the type of the first field.',
        'The first field is count: u32.',
        'Output: u32.',
      ],
      concepts: ['field.type', '@typeName', 'field type'],
    },
    {
      id: 'zig-typeinfo-9',
      title: 'std.meta.fieldNames',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Get all field names of a struct using std.meta.fieldNames.',
      skeleton: `const std = @import("std");

const Color = struct { r: u8, g: u8, b: u8 };

pub fn main() void {
    const names = std.meta.fieldNames(Color);
    for (names) |n| {
        std.debug.print("{s}\\n", .{n});
    }
}`,
      solution: `const std = @import("std");

const Color = struct { r: u8, g: u8, b: u8 };

pub fn main() void {
    const names = std.meta.fieldNames(Color);
    for (names) |n| {
        std.debug.print("{s}\\n", .{n});
    }
}`,
      hints: [
        'std.meta.fieldNames returns a comptime slice of field names.',
        'Iterating with runtime for is allowed here.',
        'Output: r, g, b.',
      ],
      concepts: ['std.meta.fieldNames', 'field enumeration'],
    },
    {
      id: 'zig-typeinfo-10',
      title: 'typeInfo for enum variants',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Count enum variants using @typeInfo.',
      skeleton: `const std = @import("std");

const Day = enum { mon, tue, wed, thu, fri, sat, sun };

pub fn main() void {
    const fields = @typeInfo(Day).Enum.fields;
    std.debug.print("{d}\\n", .{fields.len});
}`,
      solution: `const std = @import("std");

const Day = enum { mon, tue, wed, thu, fri, sat, sun };

pub fn main() void {
    const fields = @typeInfo(Day).Enum.fields;
    std.debug.print("{d}\\n", .{fields.len});
}`,
      hints: [
        '@typeInfo(Day).Enum.fields contains all variants.',
        'Day has 7 variants.',
        'Output: 7.',
      ],
      concepts: ['@typeInfo Enum', 'enum field count'],
    },
    {
      id: 'zig-typeinfo-11',
      title: 'Generic print using @typeInfo',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a generic function that prints an integer or float using type dispatch.',
      skeleton: `const std = @import("std");

fn printNum(val: anytype) void {
    const T = @TypeOf(val);
    switch (@typeInfo(T)) {
        .Int => std.debug.print("int: {d}\\n", .{val}),
        .Float => std.debug.print("float: {d}\\n", .{val}),
        else => std.debug.print("other\\n", .{}),
    }
}

pub fn main() void {
    printNum(@as(i32, 5));
    printNum(@as(f32, 3.14));
}`,
      solution: `const std = @import("std");

fn printNum(val: anytype) void {
    const T = @TypeOf(val);
    switch (@typeInfo(T)) {
        .Int => std.debug.print("int: {d}\\n", .{val}),
        .Float => std.debug.print("float: {d}\\n", .{val}),
        else => std.debug.print("other\\n", .{}),
    }
}

pub fn main() void {
    printNum(@as(i32, 5));
    printNum(@as(f32, 3.14));
}`,
      hints: [
        '@typeInfo on a type returns a tagged union.',
        'Switch dispatches on the type variant.',
        'Output: int: 5, float: 3.14.',
      ],
      concepts: ['@typeInfo dispatch', 'generic function', 'type switch'],
    },
    {
      id: 'zig-typeinfo-12',
      title: 'Pointer info',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Inspect a pointer type using @typeInfo.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const info = @typeInfo(*const u32).Pointer;
    std.debug.print("is_const={} child={s}\\n", .{
        info.is_const,
        @typeName(info.child),
    });
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const info = @typeInfo(*const u32).Pointer;
    std.debug.print("is_const={} child={s}\\n", .{
        info.is_const,
        @typeName(info.child),
    });
}`,
      hints: [
        '@typeInfo(*const u32).Pointer gives pointer metadata.',
        'is_const is true for *const.',
        'child is u32.',
      ],
      concepts: ['Pointer typeInfo', 'is_const', 'child type'],
    },
    {
      id: 'zig-typeinfo-13',
      title: 'std.meta.activeTag',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use std.meta.activeTag to get the enum tag of a tagged union.',
      skeleton: `const std = @import("std");

const V = union(enum) { num: i32, str: []const u8 };

pub fn main() void {
    const v = V{ .num = 5 };
    const tag = _____;
    std.debug.print("{s}\\n", .{@tagName(tag)});
}`,
      solution: `const std = @import("std");

const V = union(enum) { num: i32, str: []const u8 };

pub fn main() void {
    const v = V{ .num = 5 };
    const tag = std.meta.activeTag(v);
    std.debug.print("{s}\\n", .{@tagName(tag)});
}`,
      hints: [
        'std.meta.activeTag(v) returns the current enum tag.',
        '@tagName converts it to a string.',
        'Output: num.',
      ],
      concepts: ['std.meta.activeTag', 'tagged union tag'],
    },
    {
      id: 'zig-typeinfo-14',
      title: 'Comptime type equality',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Compare types for equality at comptime.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const same = i32 == i32;
    const diff = i32 == u32;
    std.debug.print("{} {}\\n", .{ same, diff });
}`,
      solution: `true false`,
      hints: [
        'Types can be compared with == at comptime.',
        'i32 == i32 is true, i32 == u32 is false.',
        'Output: "true false".',
      ],
      concepts: ['type equality', 'comptime comparison'],
    },
    {
      id: 'zig-typeinfo-15',
      title: '@sizeOf and @bitSizeOf',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict @sizeOf and @bitSizeOf for a packed struct.',
      skeleton: `const std = @import("std");

const Flags = packed struct { a: u3, b: u5 };

pub fn main() void {
    std.debug.print("{d} {d}\\n", .{ @sizeOf(Flags), @bitSizeOf(Flags) });
}`,
      solution: `1 8`,
      hints: [
        'u3 + u5 = 8 bits = 1 byte.',
        '@sizeOf returns bytes, @bitSizeOf returns bits.',
        'Output: 1 8.',
      ],
      concepts: ['@sizeOf', '@bitSizeOf', 'packed struct'],
    },
    {
      id: 'zig-typeinfo-16',
      title: 'std.meta.eql for deep equality',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use std.meta.eql to compare two structs.',
      skeleton: `const std = @import("std");

const Point = struct { x: i32, y: i32 };

pub fn main() void {
    const a = Point{ .x = 1, .y = 2 };
    const b = Point{ .x = 1, .y = 2 };
    const c = Point{ .x = 3, .y = 4 };
    std.debug.print("{} {}\\n", .{
        std.meta.eql(a, b),
        std.meta.eql(a, c),
    });
}`,
      solution: `const std = @import("std");

const Point = struct { x: i32, y: i32 };

pub fn main() void {
    const a = Point{ .x = 1, .y = 2 };
    const b = Point{ .x = 1, .y = 2 };
    const c = Point{ .x = 3, .y = 4 };
    std.debug.print("{} {}\\n", .{
        std.meta.eql(a, b),
        std.meta.eql(a, c),
    });
}`,
      hints: [
        'std.meta.eql does field-by-field comparison.',
        'a and b are equal; a and c are not.',
        'Output: "true false".',
      ],
      concepts: ['std.meta.eql', 'struct equality'],
    },
    {
      id: 'zig-typeinfo-17',
      title: '@field for dynamic field access',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Access a struct field by name string at comptime using @field.',
      skeleton: `const std = @import("std");

const Point = struct { x: f32, y: f32 };

pub fn main() void {
    const p = Point{ .x = 1.0, .y = 2.0 };
    inline for (.{ "x", "y" }) |field_name| {
        std.debug.print("{s}={d}\\n", .{ field_name, @field(p, field_name) });
    }
}`,
      solution: `const std = @import("std");

const Point = struct { x: f32, y: f32 };

pub fn main() void {
    const p = Point{ .x = 1.0, .y = 2.0 };
    inline for (.{ "x", "y" }) |field_name| {
        std.debug.print("{s}={d}\\n", .{ field_name, @field(p, field_name) });
    }
}`,
      hints: [
        '@field(struct, "name") accesses a field by name at comptime.',
        'inline for is required since field_name must be comptime.',
        'Output: x=1, y=2.',
      ],
      concepts: ['@field', 'comptime field access'],
    },
    {
      id: 'zig-typeinfo-18',
      title: 'Build comptime string of type info',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Build a type description string using @typeInfo at comptime.',
      skeleton: `const std = @import("std");

fn intDesc(comptime T: type) []const u8 {
    const info = @typeInfo(T).Int;
    const sign = if (info.signedness == .signed) "i" else "u";
    return std.fmt.comptimePrint("{s}{d}", .{ sign, info.bits });
}

pub fn main() void {
    std.debug.print("{s}\\n", .{intDesc(i16)});
    std.debug.print("{s}\\n", .{intDesc(u64)});
}`,
      solution: `const std = @import("std");

fn intDesc(comptime T: type) []const u8 {
    const info = @typeInfo(T).Int;
    const sign = if (info.signedness == .signed) "i" else "u";
    return std.fmt.comptimePrint("{s}{d}", .{ sign, info.bits });
}

pub fn main() void {
    std.debug.print("{s}\\n", .{intDesc(i16)});
    std.debug.print("{s}\\n", .{intDesc(u64)});
}`,
      hints: [
        'info.signedness is .signed or .unsigned.',
        'std.fmt.comptimePrint formats at comptime.',
        'Output: i16, u64.',
      ],
      concepts: ['comptime string building', 'comptimePrint', 'signedness'],
    },
    {
      id: 'zig-typeinfo-19',
      title: 'Check if type is a struct',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a comptime function that checks if a type is a struct.',
      skeleton: `const std = @import("std");

fn isStruct(comptime T: type) bool {
    return @typeInfo(T) == .Struct;
}

const S = struct {};

pub fn main() void {
    std.debug.print("{} {}\\n", .{ isStruct(S), isStruct(i32) });
}`,
      solution: `const std = @import("std");

fn isStruct(comptime T: type) bool {
    return @typeInfo(T) == .Struct;
}

const S = struct {};

pub fn main() void {
    std.debug.print("{} {}\\n", .{ isStruct(S), isStruct(i32) });
}`,
      hints: [
        '@typeInfo(T) == .Struct checks the variant tag.',
        'S is a struct; i32 is an Int.',
        'Output: "true false".',
      ],
      concepts: ['type check', '@typeInfo variant'],
    },
    {
      id: 'zig-typeinfo-20',
      title: 'Serialize struct to string using reflection',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use inline for and @field to serialize any struct to key=value pairs.',
      skeleton: `const std = @import("std");

fn printFields(val: anytype) void {
    const T = @TypeOf(val);
    const fields = @typeInfo(T).Struct.fields;
    inline for (fields) |f| {
        std.debug.print("{s}={any}\\n", .{ f.name, @field(val, f.name) });
    }
}

const Cfg = struct { port: u16, debug: bool };

pub fn main() void {
    printFields(Cfg{ .port = 8080, .debug = true });
}`,
      solution: `const std = @import("std");

fn printFields(val: anytype) void {
    const T = @TypeOf(val);
    const fields = @typeInfo(T).Struct.fields;
    inline for (fields) |f| {
        std.debug.print("{s}={any}\\n", .{ f.name, @field(val, f.name) });
    }
}

const Cfg = struct { port: u16, debug: bool };

pub fn main() void {
    printFields(Cfg{ .port = 8080, .debug = true });
}`,
      hints: [
        'inline for iterates comptime field list.',
        '@field accesses each field by name.',
        'Output: port=8080, debug=true.',
      ],
      concepts: ['reflection', 'inline for', '@field', 'generic serialize'],
    },
  ],
};
