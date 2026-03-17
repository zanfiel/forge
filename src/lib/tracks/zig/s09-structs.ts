import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-struct',
  title: '09. Structs',
  language: 'zig',
  explanation: `Structs in Zig group named fields of different types. They support methods, default field values, and comptime instantiation.

\`\`\`zig
const Point = struct {
    x: f32,
    y: f32,
};
const p = Point{ .x = 1.0, .y = 2.0 };
\`\`\`

**Methods** are functions in a struct's namespace. The first parameter is conventionally \`self\`:
\`\`\`zig
const Circle = struct {
    radius: f32,
    fn area(self: Circle) f32 {
        return 3.14159 * self.radius * self.radius;
    }
};
\`\`\`

**Default values** let fields be omitted in initialization:
\`\`\`zig
const Config = struct {
    debug: bool = false,
    port: u16 = 8080,
};
const c = Config{}; // uses defaults
\`\`\`

**Packed structs** guarantee a specific memory layout with no padding:
\`\`\`zig
const Flags = packed struct {
    read: bool,
    write: bool,
    exec: bool,
};
\`\`\`

Structs are value types - assignment copies the struct.`,
  exercises: [
    {
      id: 'zig-struct-1',
      title: 'Declare and initialize a struct',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Declare a Point struct and initialize it.',
      skeleton: `const std = @import("std");

const Point = struct {
    x: f32,
    y: f32,
};

pub fn main() void {
    const p = Point{ _____ };
    std.debug.print("{d} {d}\\n", .{ p.x, p.y });
}`,
      solution: `const std = @import("std");

const Point = struct {
    x: f32,
    y: f32,
};

pub fn main() void {
    const p = Point{ .x = 3.0, .y = 4.0 };
    std.debug.print("{d} {d}\\n", .{ p.x, p.y });
}`,
      hints: [
        'Struct fields are initialized with .field = value syntax.',
        'Both x and y must be f32 literals.',
        'Use .x = 3.0, .y = 4.0 as an example.',
      ],
      concepts: ['struct literal', 'field initialization'],
    },
    {
      id: 'zig-struct-2',
      title: 'Access struct fields',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict the output when accessing struct fields.',
      skeleton: `const std = @import("std");

const Person = struct {
    name: []const u8,
    age: u8,
};

pub fn main() void {
    const p = Person{ .name = "Alice", .age = 30 };
    std.debug.print("{s} is {d}\\n", .{ p.name, p.age });
}`,
      solution: `Alice is 30`,
      hints: [
        'p.name is "Alice" and p.age is 30.',
        'The format string {s} prints strings, {d} prints integers.',
        'The output follows the format exactly.',
      ],
      concepts: ['field access', 'string field'],
    },
    {
      id: 'zig-struct-3',
      title: 'Add a method to a struct',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Add a perimeter method to a Rectangle struct.',
      skeleton: `const std = @import("std");

const Rectangle = struct {
    width: f32,
    height: f32,

    fn perimeter(self: Rectangle) f32 {
        // return 2 * (width + height)
    }
};

pub fn main() void {
    const r = Rectangle{ .width = 4.0, .height = 3.0 };
    std.debug.print("{d}\\n", .{r.perimeter()});
}`,
      solution: `const std = @import("std");

const Rectangle = struct {
    width: f32,
    height: f32,

    fn perimeter(self: Rectangle) f32 {
        return 2.0 * (self.width + self.height);
    }
};

pub fn main() void {
    const r = Rectangle{ .width = 4.0, .height = 3.0 };
    std.debug.print("{d}\\n", .{r.perimeter()});
}`,
      hints: [
        'Access fields via self.width and self.height.',
        'Return 2.0 * (self.width + self.height).',
        'The method is called with r.perimeter().',
      ],
      concepts: ['struct method', 'self parameter'],
    },
    {
      id: 'zig-struct-4',
      title: 'Default field values',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Use default field values when initializing a struct.',
      skeleton: `const std = @import("std");

const Config = struct {
    host: []const u8 = "localhost",
    port: u16 = _____,
};

pub fn main() void {
    const c = Config{};
    std.debug.print("{s}:{d}\\n", .{ c.host, c.port });
}`,
      solution: `const std = @import("std");

const Config = struct {
    host: []const u8 = "localhost",
    port: u16 = 8080,
};

pub fn main() void {
    const c = Config{};
    std.debug.print("{s}:{d}\\n", .{ c.host, c.port });
}`,
      hints: [
        'Provide a default value after the = in the field declaration.',
        'A common default port is 8080.',
        'Config{} uses all defaults since no fields are overridden.',
      ],
      concepts: ['default field value', 'struct initialization'],
    },
    {
      id: 'zig-struct-5',
      title: 'Mutable struct modification',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Fix the error: modifying a const struct.',
      skeleton: `const std = @import("std");

const Counter = struct {
    count: u32 = 0,
};

pub fn main() void {
    const c = Counter{};
    c.count += 1; // bug
    std.debug.print("{d}\\n", .{c.count});
}`,
      solution: `const std = @import("std");

const Counter = struct {
    count: u32 = 0,
};

pub fn main() void {
    var c = Counter{};
    c.count += 1;
    std.debug.print("{d}\\n", .{c.count});
}`,
      hints: [
        'const variables cannot be mutated.',
        'Change const c to var c.',
        'var allows the struct and its fields to be modified.',
      ],
      concepts: ['var vs const', 'struct mutation'],
    },
    {
      id: 'zig-struct-6',
      title: 'Mutable self method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a method that mutates a struct field via *Self.',
      skeleton: `const std = @import("std");

const Counter = struct {
    count: u32 = 0,

    fn increment(self: _____) void {
        self.count += 1;
    }
};

pub fn main() void {
    var c = Counter{};
    c.increment();
    c.increment();
    std.debug.print("{d}\\n", .{c.count});
}`,
      solution: `const std = @import("std");

const Counter = struct {
    count: u32 = 0,

    fn increment(self: *Counter) void {
        self.count += 1;
    }
};

pub fn main() void {
    var c = Counter{};
    c.increment();
    c.increment();
    std.debug.print("{d}\\n", .{c.count});
}`,
      hints: [
        'To mutate self, the parameter must be *Counter (a pointer).',
        'self.count += 1 works because self is a mutable pointer.',
        'Zig auto-takes the address when calling c.increment() on a var.',
      ],
      concepts: ['mutable self', 'pointer receiver'],
    },
    {
      id: 'zig-struct-7',
      title: 'Nested structs',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Access a field of a nested struct.',
      skeleton: `const std = @import("std");

const Vec2 = struct { x: f32, y: f32 };
const Particle = struct {
    pos: Vec2,
    vel: Vec2,
};

pub fn main() void {
    const p = Particle{
        .pos = Vec2{ .x = 1.0, .y = 2.0 },
        .vel = Vec2{ .x = 0.5, .y = -0.5 },
    };
    std.debug.print("{d}\\n", .{_____});
}`,
      solution: `const std = @import("std");

const Vec2 = struct { x: f32, y: f32 };
const Particle = struct {
    pos: Vec2,
    vel: Vec2,
};

pub fn main() void {
    const p = Particle{
        .pos = Vec2{ .x = 1.0, .y = 2.0 },
        .vel = Vec2{ .x = 0.5, .y = -0.5 },
    };
    std.debug.print("{d}\\n", .{p.pos.y});
}`,
      hints: [
        'Access nested fields by chaining: p.pos.y.',
        'p.pos is a Vec2, and .y is its field.',
        'The value is 2.0.',
      ],
      concepts: ['nested struct', 'field chaining'],
    },
    {
      id: 'zig-struct-8',
      title: 'Struct as function return value',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a constructor function that returns a struct.',
      skeleton: `const std = @import("std");

const Vec2 = struct { x: f32, y: f32 };

fn makeVec(x: f32, y: f32) Vec2 {
    // return a Vec2
}

pub fn main() void {
    const v = makeVec(3.0, 4.0);
    std.debug.print("{d} {d}\\n", .{ v.x, v.y });
}`,
      solution: `const std = @import("std");

const Vec2 = struct { x: f32, y: f32 };

fn makeVec(x: f32, y: f32) Vec2 {
    return Vec2{ .x = x, .y = y };
}

pub fn main() void {
    const v = makeVec(3.0, 4.0);
    std.debug.print("{d} {d}\\n", .{ v.x, v.y });
}`,
      hints: [
        'Return a struct literal Vec2{ .x = x, .y = y }.',
        'Structs are returned by value in Zig.',
        'The function signature returns Vec2.',
      ],
      concepts: ['struct return', 'constructor pattern'],
    },
    {
      id: 'zig-struct-9',
      title: 'Anonymous struct literal',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use an anonymous struct literal inferred from context.',
      skeleton: `const std = @import("std");

const Pair = struct { a: i32, b: i32 };

fn sumPair(p: Pair) i32 {
    return p.a + p.b;
}

pub fn main() void {
    const result = sumPair(_____ { .a = 3, .b = 7 });
    std.debug.print("{d}\\n", .{result});
}`,
      solution: `const std = @import("std");

const Pair = struct { a: i32, b: i32 };

fn sumPair(p: Pair) i32 {
    return p.a + p.b;
}

pub fn main() void {
    const result = sumPair(Pair{ .a = 3, .b = 7 });
    std.debug.print("{d}\\n", .{result});
}`,
      hints: [
        'You can use .{} syntax but need to specify the type here.',
        'Use Pair{ .a = 3, .b = 7 } as the argument.',
        'The result will be 10.',
      ],
      concepts: ['struct literal', 'function argument'],
    },
    {
      id: 'zig-struct-10',
      title: 'Predict struct copy semantics',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Predict the output when a struct is copied.',
      skeleton: `const std = @import("std");

const Point = struct { x: i32 };

pub fn main() void {
    var a = Point{ .x = 1 };
    var b = a;
    b.x = 99;
    std.debug.print("{d} {d}\\n", .{ a.x, b.x });
}`,
      solution: `1 99`,
      hints: [
        'Structs are value types; assignment copies.',
        'Modifying b.x does not affect a.x.',
        'a.x remains 1, b.x becomes 99.',
      ],
      concepts: ['value semantics', 'copy on assign'],
    },
    {
      id: 'zig-struct-11',
      title: 'Packed struct size',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict the size of a packed struct vs a normal struct.',
      skeleton: `const std = @import("std");

const Normal = struct { a: u8, b: u32 };
const Packed = packed struct { a: u8, b: u32 };

pub fn main() void {
    std.debug.print("normal={d} packed={d}\\n", .{
        @sizeOf(Normal),
        @sizeOf(Packed),
    });
}`,
      solution: `normal=8 packed=5`,
      hints: [
        'Normal structs may have padding for alignment (u8 + 3 pad + u32 = 8).',
        'Packed structs have no padding: 1 + 4 = 5 bytes.',
        'Padding is added in Normal to align the u32 field.',
      ],
      concepts: ['packed struct', '@sizeOf', 'alignment padding'],
    },
    {
      id: 'zig-struct-12',
      title: 'Static method (no self)',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Add a static init method to a struct that takes no self parameter.',
      skeleton: `const std = @import("std");

const Vec2 = struct {
    x: f32,
    y: f32,

    fn zero() Vec2 {
        // return a zeroed Vec2
    }
};

pub fn main() void {
    const v = Vec2.zero();
    std.debug.print("{d} {d}\\n", .{ v.x, v.y });
}`,
      solution: `const std = @import("std");

const Vec2 = struct {
    x: f32,
    y: f32,

    fn zero() Vec2 {
        return Vec2{ .x = 0.0, .y = 0.0 };
    }
};

pub fn main() void {
    const v = Vec2.zero();
    std.debug.print("{d} {d}\\n", .{ v.x, v.y });
}`,
      hints: [
        'Static methods have no self parameter.',
        'They are called on the type: Vec2.zero().',
        'Return Vec2{ .x = 0.0, .y = 0.0 }.',
      ],
      concepts: ['static method', 'namespace function'],
    },
    {
      id: 'zig-struct-13',
      title: 'Struct with array field',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Declare a struct with a fixed-size array field and access it.',
      skeleton: `const std = @import("std");

const Matrix2x2 = struct {
    data: [2][2]f32,
};

pub fn main() void {
    const m = Matrix2x2{
        .data = .{ .{ 1.0, 2.0 }, .{ 3.0, 4.0 } },
    };
    std.debug.print("{d}\\n", .{_____});
}`,
      solution: `const std = @import("std");

const Matrix2x2 = struct {
    data: [2][2]f32,
};

pub fn main() void {
    const m = Matrix2x2{
        .data = .{ .{ 1.0, 2.0 }, .{ 3.0, 4.0 } },
    };
    std.debug.print("{d}\\n", .{m.data[1][0]});
}`,
      hints: [
        'Access nested array: m.data[row][col].',
        'm.data[1][0] is the first element of the second row.',
        'That value is 3.0.',
      ],
      concepts: ['array field', 'nested indexing'],
    },
    {
      id: 'zig-struct-14',
      title: 'Pass struct by pointer to method',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a method that resets all fields to zero.',
      skeleton: `const std = @import("std");

const Stats = struct {
    hits: u32,
    misses: u32,

    fn reset(self: *Stats) void {
        // set both fields to 0
    }
};

pub fn main() void {
    var s = Stats{ .hits = 10, .misses = 5 };
    s.reset();
    std.debug.print("{d} {d}\\n", .{ s.hits, s.misses });
}`,
      solution: `const std = @import("std");

const Stats = struct {
    hits: u32,
    misses: u32,

    fn reset(self: *Stats) void {
        self.hits = 0;
        self.misses = 0;
    }
};

pub fn main() void {
    var s = Stats{ .hits = 10, .misses = 5 };
    s.reset();
    std.debug.print("{d} {d}\\n", .{ s.hits, s.misses });
}`,
      hints: [
        'self is *Stats, so you can assign self.hits = 0.',
        'Set both self.hits and self.misses to 0.',
        'Output should be 0 0.',
      ],
      concepts: ['mutable self', 'reset pattern'],
    },
    {
      id: 'zig-struct-15',
      title: 'Comptime struct field count',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict the number of fields in a struct using @typeInfo.',
      skeleton: `const std = @import("std");

const Color = struct {
    r: u8,
    g: u8,
    b: u8,
};

pub fn main() void {
    const info = @typeInfo(Color);
    std.debug.print("{d}\\n", .{info.Struct.fields.len});
}`,
      solution: `3`,
      hints: [
        '@typeInfo returns type metadata at comptime.',
        'info.Struct.fields is the array of field descriptors.',
        'Color has 3 fields: r, g, b.',
      ],
      concepts: ['@typeInfo', 'comptime reflection', 'struct fields'],
    },
    {
      id: 'zig-struct-16',
      title: 'Refactor repeated fields into a struct',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Refactor separate x/y/z variables into a Vec3 struct.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const x: f32 = 1.0;
    const y: f32 = 2.0;
    const z: f32 = 3.0;
    const len = @sqrt(x * x + y * y + z * z);
    std.debug.print("{d}\\n", .{len});
}`,
      solution: `const std = @import("std");

const Vec3 = struct {
    x: f32,
    y: f32,
    z: f32,

    fn length(self: Vec3) f32 {
        return @sqrt(self.x * self.x + self.y * self.y + self.z * self.z);
    }
};

pub fn main() void {
    const v = Vec3{ .x = 1.0, .y = 2.0, .z = 3.0 };
    std.debug.print("{d}\\n", .{v.length()});
}`,
      hints: [
        'Define Vec3 with x, y, z fields.',
        'Add a length() method that computes the magnitude.',
        'Replace the local variables with a Vec3 instance.',
      ],
      concepts: ['refactor', 'struct encapsulation', 'method'],
    },
    {
      id: 'zig-struct-17',
      title: 'Struct equality comparison',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Fix struct comparison: Zig structs do not support == directly.',
      skeleton: `const std = @import("std");

const Point = struct { x: i32, y: i32 };

pub fn main() void {
    const a = Point{ .x = 1, .y = 2 };
    const b = Point{ .x = 1, .y = 2 };
    if (a == b) { // bug: structs don't support ==
        std.debug.print("equal\\n", .{});
    }
}`,
      solution: `const std = @import("std");

const Point = struct {
    x: i32,
    y: i32,

    fn eql(self: Point, other: Point) bool {
        return self.x == other.x and self.y == other.y;
    }
};

pub fn main() void {
    const a = Point{ .x = 1, .y = 2 };
    const b = Point{ .x = 1, .y = 2 };
    if (a.eql(b)) {
        std.debug.print("equal\\n", .{});
    }
}`,
      hints: [
        'Structs in Zig do not support == operator.',
        'Write an eql method that compares each field.',
        'Return self.x == other.x and self.y == other.y.',
      ],
      concepts: ['struct equality', 'custom comparison'],
    },
    {
      id: 'zig-struct-18',
      title: 'Struct with optional field',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Declare a struct with an optional field and handle null.',
      skeleton: `const std = @import("std");

const Node = struct {
    value: i32,
    next: _____,
};

pub fn main() void {
    const n = Node{ .value = 1, .next = null };
    if (n.next) |_| {
        std.debug.print("has next\\n", .{});
    } else {
        std.debug.print("no next\\n", .{});
    }
}`,
      solution: `const std = @import("std");

const Node = struct {
    value: i32,
    next: ?*Node,
};

pub fn main() void {
    const n = Node{ .value = 1, .next = null };
    if (n.next) |_| {
        std.debug.print("has next\\n", .{});
    } else {
        std.debug.print("no next\\n", .{});
    }
}`,
      hints: [
        'A linked list node points to the next node optionally.',
        'The type is ?*Node (optional pointer to Node).',
        'Since next is null, the else branch runs.',
      ],
      concepts: ['optional field', 'linked list', 'self-referential struct'],
    },
    {
      id: 'zig-struct-19',
      title: 'Struct memory layout',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict the size of a struct considering field alignment.',
      skeleton: `const std = @import("std");

const S = struct {
    a: u8,
    b: u64,
    c: u8,
};

pub fn main() void {
    std.debug.print("{d}\\n", .{@sizeOf(S)});
}`,
      solution: `24`,
      hints: [
        'u64 requires 8-byte alignment.',
        'a (1 byte) + 7 bytes padding + b (8 bytes) + c (1 byte) + 7 bytes padding = 24.',
        'The struct size is padded to the alignment of its largest field.',
      ],
      concepts: ['struct layout', 'alignment', '@sizeOf'],
    },
    {
      id: 'zig-struct-20',
      title: 'Use std.mem.zeroes for default initialization',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Initialize a struct to all-zero values using std.mem.zeroes.',
      skeleton: `const std = @import("std");

const Buffer = struct {
    data: [8]u8,
    len: usize,
};

pub fn main() void {
    const buf: Buffer = _____;
    std.debug.print("{d} {d}\\n", .{ buf.data[0], buf.len });
}`,
      solution: `const std = @import("std");

const Buffer = struct {
    data: [8]u8,
    len: usize,
};

pub fn main() void {
    const buf: Buffer = std.mem.zeroes(Buffer);
    std.debug.print("{d} {d}\\n", .{ buf.data[0], buf.len });
}`,
      hints: [
        'std.mem.zeroes(T) returns a zero-initialized value of type T.',
        'All bytes will be 0, so data[0] is 0 and len is 0.',
        'Useful for structs with many fields that should default to zero.',
      ],
      concepts: ['std.mem.zeroes', 'zero initialization'],
    },
  ],
};
