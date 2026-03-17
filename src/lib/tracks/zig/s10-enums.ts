import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-enum',
  title: '10. Enums',
  language: 'zig',
  explanation: `Enums define a type with a fixed set of named values. By default Zig assigns integer values automatically.

\`\`\`zig
const Direction = enum { north, south, east, west };
const d = Direction.north;
\`\`\`

**Explicit tag values:**
\`\`\`zig
const Status = enum(u8) { ok = 200, not_found = 404 };
\`\`\`

**Switch on enums** is exhaustive - Zig enforces all cases:
\`\`\`zig
switch (d) {
    .north => std.debug.print("N\\n", .{}),
    .south => std.debug.print("S\\n", .{}),
    .east  => std.debug.print("E\\n", .{}),
    .west  => std.debug.print("W\\n", .{}),
}
\`\`\`

**Enum methods** can be attached like struct methods:
\`\`\`zig
const Direction = enum {
    north, south, east, west,
    fn opposite(self: Direction) Direction {
        return switch (self) {
            .north => .south,
            .south => .north,
            .east  => .west,
            .west  => .east,
        };
    }
};
\`\`\`

Convert between enum and integer with \`@intFromEnum\` and \`@enumFromInt\`.`,
  exercises: [
    {
      id: 'zig-enum-1',
      title: 'Declare and use an enum',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Declare a Color enum and assign a value.',
      skeleton: `const std = @import("std");

const Color = enum { red, green, blue };

pub fn main() void {
    const c: Color = _____;
    _ = c;
    std.debug.print("ok\\n", .{});
}`,
      solution: `const std = @import("std");

const Color = enum { red, green, blue };

pub fn main() void {
    const c: Color = Color.green;
    _ = c;
    std.debug.print("ok\\n", .{});
}`,
      hints: [
        'Use Color.green to refer to an enum variant.',
        'Enum values are accessed with TypeName.variant.',
        'Any valid variant works here.',
      ],
      concepts: ['enum declaration', 'enum value'],
    },
    {
      id: 'zig-enum-2',
      title: 'Switch on enum',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Write a function that returns a string for each Direction.',
      skeleton: `const std = @import("std");

const Direction = enum { north, south, east, west };

fn dirName(d: Direction) []const u8 {
    return switch (d) {
        // match all four variants
    };
}

pub fn main() void {
    std.debug.print("{s}\\n", .{dirName(.north)});
}`,
      solution: `const std = @import("std");

const Direction = enum { north, south, east, west };

fn dirName(d: Direction) []const u8 {
    return switch (d) {
        .north => "North",
        .south => "South",
        .east  => "East",
        .west  => "West",
    };
}

pub fn main() void {
    std.debug.print("{s}\\n", .{dirName(.north)});
}`,
      hints: [
        'Use .variant syntax inside the switch.',
        'All four cases must be covered.',
        'Return a string literal for each branch.',
      ],
      concepts: ['exhaustive switch', 'enum matching'],
    },
    {
      id: 'zig-enum-3',
      title: 'Enum with explicit integer values',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Declare an enum with explicit integer backing values.',
      skeleton: `const std = @import("std");

const HttpStatus = enum(u16) {
    ok = _____,
    not_found = 404,
    server_error = 500,
};

pub fn main() void {
    std.debug.print("{d}\\n", .{@intFromEnum(HttpStatus.ok)});
}`,
      solution: `const std = @import("std");

const HttpStatus = enum(u16) {
    ok = 200,
    not_found = 404,
    server_error = 500,
};

pub fn main() void {
    std.debug.print("{d}\\n", .{@intFromEnum(HttpStatus.ok)});
}`,
      hints: [
        'HTTP 200 means "OK".',
        'Use enum(u16) to set the backing integer type.',
        '@intFromEnum converts an enum value to its integer.',
      ],
      concepts: ['enum backing type', '@intFromEnum'],
    },
    {
      id: 'zig-enum-4',
      title: 'Convert enum to int',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict the integer value of an enum variant.',
      skeleton: `const std = @import("std");

const Suit = enum { clubs, diamonds, hearts, spades };

pub fn main() void {
    std.debug.print("{d}\\n", .{@intFromEnum(Suit.hearts)});
}`,
      solution: `2`,
      hints: [
        'Without explicit values, variants are numbered from 0.',
        'clubs=0, diamonds=1, hearts=2, spades=3.',
        'hearts is index 2.',
      ],
      concepts: ['@intFromEnum', 'implicit enum values'],
    },
    {
      id: 'zig-enum-5',
      title: 'Convert int to enum',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Convert an integer back to an enum using @enumFromInt.',
      skeleton: `const std = @import("std");

const Suit = enum { clubs, diamonds, hearts, spades };

pub fn main() void {
    const s: Suit = _____; // convert 3 to Suit
    std.debug.print("{s}\\n", .{@tagName(s)});
}`,
      solution: `const std = @import("std");

const Suit = enum { clubs, diamonds, hearts, spades };

pub fn main() void {
    const s: Suit = @enumFromInt(3);
    std.debug.print("{s}\\n", .{@tagName(s)});
}`,
      hints: [
        '@enumFromInt(3) converts integer 3 to the enum.',
        'The 4th variant (index 3) is spades.',
        '@tagName returns the string name of the enum variant.',
      ],
      concepts: ['@enumFromInt', '@tagName'],
    },
    {
      id: 'zig-enum-6',
      title: 'Enum method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Add an opposite() method to a Direction enum.',
      skeleton: `const std = @import("std");

const Direction = enum {
    north, south, east, west,

    fn opposite(self: Direction) Direction {
        // return opposite direction
    }
};

pub fn main() void {
    std.debug.print("{s}\\n", .{@tagName(Direction.north.opposite())});
}`,
      solution: `const std = @import("std");

const Direction = enum {
    north, south, east, west,

    fn opposite(self: Direction) Direction {
        return switch (self) {
            .north => .south,
            .south => .north,
            .east  => .west,
            .west  => .east,
        };
    }
};

pub fn main() void {
    std.debug.print("{s}\\n", .{@tagName(Direction.north.opposite())});
}`,
      hints: [
        'Use a switch on self to return the opposite.',
        '.north => .south, .south => .north, etc.',
        '@tagName prints the variant name as a string.',
      ],
      concepts: ['enum method', 'switch return'],
    },
    {
      id: 'zig-enum-7',
      title: 'Catch unknown enum value',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Fix the non-exhaustive switch on an enum.',
      skeleton: `const std = @import("std");

const Color = enum { red, green, blue };

fn describe(c: Color) []const u8 {
    return switch (c) {
        .red   => "warm",
        .green => "cool",
        // missing .blue
    };
}

pub fn main() void {
    std.debug.print("{s}\\n", .{describe(.blue)});
}`,
      solution: `const std = @import("std");

const Color = enum { red, green, blue };

fn describe(c: Color) []const u8 {
    return switch (c) {
        .red   => "warm",
        .green => "cool",
        .blue  => "cool",
    };
}

pub fn main() void {
    std.debug.print("{s}\\n", .{describe(.blue)});
}`,
      hints: [
        'Zig switch on enums must be exhaustive.',
        'Add a .blue => branch.',
        'Alternatively use else for a catch-all.',
      ],
      concepts: ['exhaustive switch', 'enum coverage'],
    },
    {
      id: 'zig-enum-8',
      title: 'Enum in a struct field',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use an enum type as a struct field.',
      skeleton: `const std = @import("std");

const State = enum { idle, running, stopped };

const Task = struct {
    name: []const u8,
    state: _____,
};

pub fn main() void {
    const t = Task{ .name = "worker", .state = .running };
    std.debug.print("{s}\\n", .{@tagName(t.state)});
}`,
      solution: `const std = @import("std");

const State = enum { idle, running, stopped };

const Task = struct {
    name: []const u8,
    state: State,
};

pub fn main() void {
    const t = Task{ .name = "worker", .state = .running };
    std.debug.print("{s}\\n", .{@tagName(t.state)});
}`,
      hints: [
        'The field type is just the enum type name: State.',
        'When the type is known from context you can use .running.',
        '@tagName(t.state) prints "running".',
      ],
      concepts: ['enum field', 'type inference'],
    },
    {
      id: 'zig-enum-9',
      title: 'Predict @tagName output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Predict what @tagName returns for an enum variant.',
      skeleton: `const std = @import("std");

const Planet = enum { mercury, venus, earth, mars };

pub fn main() void {
    const p = Planet.earth;
    std.debug.print("{s}\\n", .{@tagName(p)});
}`,
      solution: `earth`,
      hints: [
        '@tagName returns the variant name as a string.',
        'The variant is earth, so the output is "earth".',
        'No capital letters; the name is exactly as declared.',
      ],
      concepts: ['@tagName', 'enum name'],
    },
    {
      id: 'zig-enum-10',
      title: 'Enum array iteration',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use std.enums.values to iterate all enum values.',
      skeleton: `const std = @import("std");

const Season = enum { spring, summer, autumn, winter };

pub fn main() void {
    for (std.enums.values(Season)) |s| {
        std.debug.print("{s}\\n", .{@tagName(s)});
    }
}`,
      solution: `const std = @import("std");

const Season = enum { spring, summer, autumn, winter };

pub fn main() void {
    for (std.enums.values(Season)) |s| {
        std.debug.print("{s}\\n", .{@tagName(s)});
    }
}`,
      hints: [
        'std.enums.values(T) returns a slice of all enum values.',
        'Iterate with for and use @tagName to get the name.',
        'This is already correct; just understand how it works.',
      ],
      concepts: ['std.enums.values', 'enum iteration'],
    },
    {
      id: 'zig-enum-11',
      title: 'Enum as flags with packed struct',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Refactor a set of bool fields into a packed struct flags type.',
      skeleton: `const std = @import("std");

const Perms = struct {
    read: bool,
    write: bool,
    exec: bool,
};

pub fn main() void {
    const p = Perms{ .read = true, .write = false, .exec = true };
    std.debug.print("{} {} {}\\n", .{ p.read, p.write, p.exec });
}`,
      solution: `const std = @import("std");

const Perms = packed struct {
    read: bool,
    write: bool,
    exec: bool,
};

pub fn main() void {
    const p = Perms{ .read = true, .write = false, .exec = true };
    std.debug.print("{} {} {}\\n", .{ p.read, p.write, p.exec });
}`,
      hints: [
        'Add the packed keyword before struct.',
        'Packed structs with bool fields store them as individual bits.',
        'The behavior is identical but the memory layout is compact.',
      ],
      concepts: ['packed struct', 'bit flags'],
    },
    {
      id: 'zig-enum-12',
      title: 'Switch with else fallback',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use else in a switch to handle unrecognized enum values.',
      skeleton: `const std = @import("std");

const Code = enum(u8) { ok = 0, err = 1, _ };

pub fn main() void {
    const c: Code = @enumFromInt(99);
    const msg = switch (c) {
        .ok  => "success",
        .err => "failure",
        _____ => "unknown",
    };
    std.debug.print("{s}\\n", .{msg});
}`,
      solution: `const std = @import("std");

const Code = enum(u8) { ok = 0, err = 1, _ };

pub fn main() void {
    const c: Code = @enumFromInt(99);
    const msg = switch (c) {
        .ok  => "success",
        .err => "failure",
        else => "unknown",
    };
    std.debug.print("{s}\\n", .{msg});
}`,
      hints: [
        'The _ after the last field makes it a non-exhaustive enum.',
        'Use else to handle all other integer values.',
        'The output should be "unknown" since 99 is not ok or err.',
      ],
      concepts: ['non-exhaustive enum', 'else branch'],
    },
    {
      id: 'zig-enum-13',
      title: 'Enum ordinal comparison',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Compare two enum values by their integer ordinals.',
      skeleton: `const std = @import("std");

const Priority = enum(u8) { low = 1, medium = 2, high = 3 };

fn isHigherThan(a: Priority, b: Priority) bool {
    return @intFromEnum(a) > @intFromEnum(b);
}

pub fn main() void {
    std.debug.print("{}\\n", .{isHigherThan(.high, .low)});
}`,
      solution: `const std = @import("std");

const Priority = enum(u8) { low = 1, medium = 2, high = 3 };

fn isHigherThan(a: Priority, b: Priority) bool {
    return @intFromEnum(a) > @intFromEnum(b);
}

pub fn main() void {
    std.debug.print("{}\\n", .{isHigherThan(.high, .low)});
}`,
      hints: [
        '@intFromEnum converts to the backing integer for comparison.',
        'high=3 > low=1, so the result is true.',
        'This pattern is already correct; understand why it works.',
      ],
      concepts: ['enum comparison', '@intFromEnum'],
    },
    {
      id: 'zig-enum-14',
      title: 'Predict ordinal values',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict the integer values of auto-numbered enum variants.',
      skeleton: `const std = @import("std");

const Grade = enum { f, d, c, b, a };

pub fn main() void {
    std.debug.print("{d} {d}\\n", .{
        @intFromEnum(Grade.a),
        @intFromEnum(Grade.f),
    });
}`,
      solution: `4 0`,
      hints: [
        'Auto-numbering starts at 0.',
        'f=0, d=1, c=2, b=3, a=4.',
        'a is 4, f is 0.',
      ],
      concepts: ['auto-numbered enum', '@intFromEnum'],
    },
    {
      id: 'zig-enum-15',
      title: 'Enum in a tagged union',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Pair an enum tag with a tagged union.',
      skeleton: `const std = @import("std");

const Tag = enum { int, float };
const Value = union(Tag) {
    int: i64,
    float: f64,
};

pub fn main() void {
    const v = Value{ _____ };
    std.debug.print("{d}\\n", .{v.int});
}`,
      solution: `const std = @import("std");

const Tag = enum { int, float };
const Value = union(Tag) {
    int: i64,
    float: f64,
};

pub fn main() void {
    const v = Value{ .int = 42 };
    std.debug.print("{d}\\n", .{v.int});
}`,
      hints: [
        'A tagged union uses the enum as its tag.',
        'Initialize with .int = 42 to select the int variant.',
        'v.int accesses the payload.',
      ],
      concepts: ['tagged union', 'enum tag'],
    },
    {
      id: 'zig-enum-16',
      title: 'Enum count at comptime',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict the number of enum variants using @typeInfo.',
      skeleton: `const std = @import("std");

const Op = enum { add, sub, mul, div };

pub fn main() void {
    const fields = @typeInfo(Op).Enum.fields;
    std.debug.print("{d}\\n", .{fields.len});
}`,
      solution: `4`,
      hints: [
        '@typeInfo(Op).Enum.fields is the array of variant descriptors.',
        'Op has 4 variants: add, sub, mul, div.',
        'fields.len is 4.',
      ],
      concepts: ['@typeInfo', 'enum fields', 'comptime reflection'],
    },
    {
      id: 'zig-enum-17',
      title: 'Use else in switch for range',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a function that categorizes seasons using switch.',
      skeleton: `const std = @import("std");

const Month = enum { jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec };

fn isSummer(m: Month) bool {
    return switch (m) {
        .jun, .jul, .aug => true,
        else => false,
    };
}

pub fn main() void {
    std.debug.print("{} {}\\n", .{ isSummer(.jul), isSummer(.jan) });
}`,
      solution: `const std = @import("std");

const Month = enum { jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec };

fn isSummer(m: Month) bool {
    return switch (m) {
        .jun, .jul, .aug => true,
        else => false,
    };
}

pub fn main() void {
    std.debug.print("{} {}\\n", .{ isSummer(.jul), isSummer(.jan) });
}`,
      hints: [
        'Multiple enum values can share a branch with commas.',
        'else handles all remaining variants.',
        'The output should be "true false".',
      ],
      concepts: ['multi-value switch', 'else branch'],
    },
    {
      id: 'zig-enum-18',
      title: 'Enum default value in struct',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Give an enum field a default value in a struct.',
      skeleton: `const std = @import("std");

const Level = enum { debug, info, warn, err };

const Logger = struct {
    level: Level = _____,
};

pub fn main() void {
    const log = Logger{};
    std.debug.print("{s}\\n", .{@tagName(log.level)});
}`,
      solution: `const std = @import("std");

const Level = enum { debug, info, warn, err };

const Logger = struct {
    level: Level = .info,
};

pub fn main() void {
    const log = Logger{};
    std.debug.print("{s}\\n", .{@tagName(log.level)});
}`,
      hints: [
        'Default values for enum fields use .variant syntax.',
        '.info is a reasonable default log level.',
        'Logger{} uses the default, printing "info".',
      ],
      concepts: ['enum default', 'struct default field'],
    },
    {
      id: 'zig-enum-19',
      title: 'Fix wrong enum backing type',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Fix the bug: explicit value exceeds the backing type range.',
      skeleton: `const std = @import("std");

const Code = enum(u8) {
    ok = 200,
    created = 201,
    server_error = 500, // bug: 500 > 255
};

pub fn main() void {
    std.debug.print("{d}\\n", .{@intFromEnum(Code.ok)});
}`,
      solution: `const std = @import("std");

const Code = enum(u16) {
    ok = 200,
    created = 201,
    server_error = 500,
};

pub fn main() void {
    std.debug.print("{d}\\n", .{@intFromEnum(Code.ok)});
}`,
      hints: [
        'u8 can only hold values 0-255.',
        'Change the backing type to u16 to accommodate 500.',
        'u16 supports values up to 65535.',
      ],
      concepts: ['enum backing type', 'integer range'],
    },
    {
      id: 'zig-enum-20',
      title: 'Enum-based state machine',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Implement a state transition function for a traffic light.',
      skeleton: `const std = @import("std");

const Light = enum { red, yellow, green };

fn next(l: Light) Light {
    // red -> green -> yellow -> red
}

pub fn main() void {
    var state = Light.red;
    for (0..3) |_| {
        state = next(state);
        std.debug.print("{s}\\n", .{@tagName(state)});
    }
}`,
      solution: `const std = @import("std");

const Light = enum { red, yellow, green };

fn next(l: Light) Light {
    return switch (l) {
        .red    => .green,
        .green  => .yellow,
        .yellow => .red,
    };
}

pub fn main() void {
    var state = Light.red;
    for (0..3) |_| {
        state = next(state);
        std.debug.print("{s}\\n", .{@tagName(state)});
    }
}`,
      hints: [
        'Use a switch to map each state to the next.',
        'red -> green -> yellow -> red cycles.',
        'The output should be green, yellow, red.',
      ],
      concepts: ['state machine', 'enum transition', 'switch'],
    },
  ],
};
