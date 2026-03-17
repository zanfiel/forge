import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-fmt',
  title: '22. Formatting',
  language: 'zig',
  explanation: `Zig's formatting is done with \`std.fmt\`. The format string is comptime-checked.

**Common specifiers:**
- \`{d}\` - decimal integer
- \`{s}\` - string slice
- \`{}\` - default formatting (booleans, structs)
- \`{x}\` - lowercase hex, \`{X}\` - uppercase hex
- \`{b}\` - binary
- \`{o}\` - octal
- \`{e}\` - scientific notation
- \`{.2}\` - float with 2 decimal places
- \`{?}\` - optional value
- \`{any}\` - any type

**Output targets:**
- \`std.debug.print\` - stderr, no error
- \`writer.print\` - any writer, returns error
- \`std.fmt.bufPrint\` - into a fixed buffer
- \`std.fmt.allocPrint\` - heap-allocated

\`\`\`zig
var buf: [32]u8 = undefined;
const s = try std.fmt.bufPrint(&buf, "{x:0>8}", .{255}); // "000000ff"
\`\`\`

**Fill and alignment:** \`{[fill][align][width]}\`
- \`{:<10}\` - left-align in 10 chars
- \`{:>10}\` - right-align
- \`{:^10}\` - center
- \`{:0>5}\` - zero-pad to width 5`,
  exercises: [
    {
      id: 'zig-fmt-1',
      title: 'Decimal integer format',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict the output of {d} format specifier.',
      skeleton: `const std = @import("std");

pub fn main() void {
    std.debug.print("{d}\\n", .{-42});
}`,
      solution: `-42`,
      hints: [
        '{d} prints a signed decimal integer.',
        'Negative values include the minus sign.',
        'Output: -42.',
      ],
      concepts: ['{d}', 'decimal format'],
    },
    {
      id: 'zig-fmt-2',
      title: 'Hex formatting',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Print an integer in lowercase hexadecimal.',
      skeleton: `const std = @import("std");

pub fn main() void {
    std.debug.print("{_____}\\n", .{255});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    std.debug.print("{x}\\n", .{255});
}`,
      hints: [
        '{x} formats as lowercase hex.',
        '255 in hex is ff.',
        'Output: ff.',
      ],
      concepts: ['{x}', 'hex format'],
    },
    {
      id: 'zig-fmt-3',
      title: 'Binary format',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict the binary output of the number 10.',
      skeleton: `const std = @import("std");

pub fn main() void {
    std.debug.print("{b}\\n", .{@as(u8, 10)});
}`,
      solution: `1010`,
      hints: [
        '{b} formats as binary.',
        '10 in binary is 1010.',
        'Output: 1010.',
      ],
      concepts: ['{b}', 'binary format'],
    },
    {
      id: 'zig-fmt-4',
      title: 'Float with precision',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Print a float with exactly 2 decimal places.',
      skeleton: `const std = @import("std");

pub fn main() void {
    std.debug.print("{_____}\\n", .{3.14159});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    std.debug.print("{.2}\\n", .{3.14159});
}`,
      hints: [
        '{.N} specifies N decimal places.',
        '{.2} gives 2 decimal places.',
        'Output: 3.14.',
      ],
      concepts: ['{.N}', 'float precision'],
    },
    {
      id: 'zig-fmt-5',
      title: 'Optional format specifier',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict how {?} formats an optional value.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const a: ?i32 = 5;
    const b: ?i32 = null;
    std.debug.print("{?}\\n", .{a});
    std.debug.print("{?}\\n", .{b});
}`,
      solution: `5
null`,
      hints: [
        '{?} unwraps and prints an optional.',
        'Non-null prints the value; null prints "null".',
        'Output: 5 then null.',
      ],
      concepts: ['{?}', 'optional format'],
    },
    {
      id: 'zig-fmt-6',
      title: 'Width and alignment',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Right-align a number in a field of width 8.',
      skeleton: `const std = @import("std");

pub fn main() void {
    std.debug.print("{_____}\\n", .{42});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    std.debug.print("{:>8}\\n", .{42});
}`,
      hints: [
        '{:>8} right-aligns in a field of width 8.',
        '42 becomes "      42".',
        'Output has 6 leading spaces then 42.',
      ],
      concepts: ['alignment', 'width'],
    },
    {
      id: 'zig-fmt-7',
      title: 'Zero-pad an integer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Zero-pad an integer to 6 digits.',
      skeleton: `const std = @import("std");

pub fn main() void {
    std.debug.print("{_____}\\n", .{42});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    std.debug.print("{:0>6}\\n", .{42});
}`,
      hints: [
        '{:0>N} zero-pads to width N.',
        '42 zero-padded to 6 is "000042".',
        'Output: 000042.',
      ],
      concepts: ['zero-padding', 'fill character'],
    },
    {
      id: 'zig-fmt-8',
      title: 'Scientific notation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Predict the scientific notation output for a large float.',
      skeleton: `const std = @import("std");

pub fn main() void {
    std.debug.print("{e}\\n", .{1000.0});
}`,
      solution: `1.0e+03`,
      hints: [
        '{e} formats as scientific notation.',
        '1000.0 = 1.0 * 10^3.',
        'Output: 1.0e+03.',
      ],
      concepts: ['{e}', 'scientific notation'],
    },
    {
      id: 'zig-fmt-9',
      title: 'bufPrint with multiple values',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Format multiple values into a buffer with bufPrint.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var buf: [64]u8 = undefined;
    const s = try std.fmt.bufPrint(&buf, "{s}={d}", .{ "port", 8080 });
    std.debug.print("{s}\\n", .{s});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var buf: [64]u8 = undefined;
    const s = try std.fmt.bufPrint(&buf, "{s}={d}", .{ "port", 8080 });
    std.debug.print("{s}\\n", .{s});
}`,
      hints: [
        'bufPrint writes to a stack buffer and returns a slice.',
        'The format string has two specifiers: {s} and {d}.',
        'Output: port=8080.',
      ],
      concepts: ['bufPrint', 'multiple values'],
    },
    {
      id: 'zig-fmt-10',
      title: 'Uppercase hex with padding',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Print an integer as uppercase hex padded to 8 digits.',
      skeleton: `const std = @import("std");

pub fn main() void {
    std.debug.print("{_____}\\n", .{255});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    std.debug.print("{X:0>8}\\n", .{255});
}`,
      hints: [
        '{X} is uppercase hex, :0>8 zero-pads to width 8.',
        '255 = 0xFF -> "000000FF".',
        'Output: 000000FF.',
      ],
      concepts: ['{X}', 'uppercase hex', 'padding'],
    },
    {
      id: 'zig-fmt-11',
      title: 'Print a struct with {}',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict how {} prints a simple struct.',
      skeleton: `const std = @import("std");

const P = struct { x: i32, y: i32 };

pub fn main() void {
    const p = P{ .x = 1, .y = 2 };
    std.debug.print("{}\\n", .{p});
}`,
      solution: `P{ .x = 1, .y = 2 }`,
      hints: [
        '{} uses default formatting for any type.',
        'Structs are printed with field names and values.',
        'Output: P{ .x = 1, .y = 2 }.',
      ],
      concepts: ['{}', 'struct formatting'],
    },
    {
      id: 'zig-fmt-12',
      title: 'Print a slice with {any}',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict how {any} formats a slice.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const arr = [_]i32{ 1, 2, 3 };
    std.debug.print("{any}\\n", .{arr});
}`,
      solution: `{ 1, 2, 3 }`,
      hints: [
        '{any} uses Zig\'s built-in formatter for any type.',
        'Arrays are printed with braces and commas.',
        'Output: { 1, 2, 3 }.',
      ],
      concepts: ['{any}', 'array formatting'],
    },
    {
      id: 'zig-fmt-13',
      title: 'Custom format with std.fmt.format',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a format function for a custom struct.',
      skeleton: `const std = @import("std");

const Color = struct {
    r: u8, g: u8, b: u8,

    pub fn format(self: Color, comptime _: []const u8, _: std.fmt.FormatOptions, writer: anytype) !void {
        try writer.print("#{x:0>2}{x:0>2}{x:0>2}", .{ self.r, self.g, self.b });
    }
};

pub fn main() !void {
    const red = Color{ .r = 255, .g = 0, .b = 0 };
    std.debug.print("{}\\n", .{red});
}`,
      solution: `const std = @import("std");

const Color = struct {
    r: u8, g: u8, b: u8,

    pub fn format(self: Color, comptime _: []const u8, _: std.fmt.FormatOptions, writer: anytype) !void {
        try writer.print("#{x:0>2}{x:0>2}{x:0>2}", .{ self.r, self.g, self.b });
    }
};

pub fn main() !void {
    const red = Color{ .r = 255, .g = 0, .b = 0 };
    std.debug.print("{}\\n", .{red});
}`,
      hints: [
        'Implement pub fn format() with the exact signature.',
        'Zig calls this automatically when using {} on the type.',
        'Output: #ff0000.',
      ],
      concepts: ['custom format', 'pub fn format', 'FormatOptions'],
    },
    {
      id: 'zig-fmt-14',
      title: 'Print to stderr vs stdout',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write to stdout using std.io.getStdOut().writer().',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    try stdout.print("Hello, {s}!\\n", .{"stdout"});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    try stdout.print("Hello, {s}!\\n", .{"stdout"});
}`,
      hints: [
        'std.io.getStdOut().writer() returns a writer for stdout.',
        'writer.print() returns an error, so use try.',
        'Output: Hello, stdout!',
      ],
      concepts: ['stdout writer', 'writer.print'],
    },
    {
      id: 'zig-fmt-15',
      title: 'Format into ArrayList',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use an ArrayList writer to build a string dynamically.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    var list = std.ArrayList(u8).init(alloc);
    defer list.deinit();

    const writer = list.writer();
    for (0..3) |i| {
        try writer.print("{d} ", .{i});
    }
    std.debug.print("{s}\\n", .{list.items});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    var list = std.ArrayList(u8).init(alloc);
    defer list.deinit();

    const writer = list.writer();
    for (0..3) |i| {
        try writer.print("{d} ", .{i});
    }
    std.debug.print("{s}\\n", .{list.items});
}`,
      hints: [
        'list.writer() returns a writer that appends to the ArrayList.',
        'Each iteration appends "0 ", "1 ", "2 ".',
        'Output: 0 1 2 (with trailing space).',
      ],
      concepts: ['ArrayList writer', 'dynamic string building'],
    },
    {
      id: 'zig-fmt-16',
      title: 'bufPrint overflow detection',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict behavior when bufPrint output exceeds buffer size.',
      skeleton: `const std = @import("std");

pub fn main() void {
    var buf: [3]u8 = undefined;
    const result = std.fmt.bufPrint(&buf, "hello", .{});
    if (result) |s| {
        std.debug.print("{s}\\n", .{s});
    } else |_| {
        std.debug.print("overflow\\n", .{});
    }
}`,
      solution: `overflow`,
      hints: [
        '"hello" is 5 bytes but buf is only 3.',
        'bufPrint returns an error when the buffer is too small.',
        'Output: overflow.',
      ],
      concepts: ['bufPrint', 'buffer overflow', 'error handling'],
    },
    {
      id: 'zig-fmt-17',
      title: 'Octal format',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict the octal representation of a number.',
      skeleton: `const std = @import("std");

pub fn main() void {
    std.debug.print("{o}\\n", .{@as(u8, 8)});
}`,
      solution: `10`,
      hints: [
        '{o} formats as octal.',
        '8 in octal is 10.',
        'Output: 10.',
      ],
      concepts: ['{o}', 'octal format'],
    },
    {
      id: 'zig-fmt-18',
      title: 'Left-align string in field',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Left-align a string in a field of width 10 padded with spaces.',
      skeleton: `const std = @import("std");

pub fn main() void {
    std.debug.print("'{_____}'\\n", .{"hi"});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    std.debug.print("'{:<10}'\\n", .{"hi"});
}`,
      hints: [
        '{:<10} left-aligns in a 10-char field.',
        '"hi" becomes "hi        " (8 trailing spaces).',
        'Output: \'hi        \'.',
      ],
      concepts: ['left-align', 'field width'],
    },
    {
      id: 'zig-fmt-19',
      title: 'Format a table',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Print a two-column aligned table using format specifiers.',
      skeleton: `const std = @import("std");

const Row = struct { name: []const u8, value: i32 };

pub fn main() void {
    const rows = [_]Row{
        .{ .name = "alpha", .value = 1 },
        .{ .name = "beta",  .value = 200 },
        .{ .name = "gamma", .value = 30 },
    };
    for (rows) |r| {
        std.debug.print("{s:<10} {d:>6}\\n", .{ r.name, r.value });
    }
}`,
      solution: `const std = @import("std");

const Row = struct { name: []const u8, value: i32 };

pub fn main() void {
    const rows = [_]Row{
        .{ .name = "alpha", .value = 1 },
        .{ .name = "beta",  .value = 200 },
        .{ .name = "gamma", .value = 30 },
    };
    for (rows) |r| {
        std.debug.print("{s:<10} {d:>6}\\n", .{ r.name, r.value });
    }
}`,
      hints: [
        '{s:<10} left-aligns name in 10 chars.',
        '{d:>6} right-aligns value in 6 chars.',
        'Output shows an aligned table.',
      ],
      concepts: ['table formatting', 'alignment specifiers'],
    },
    {
      id: 'zig-fmt-20',
      title: 'Comptime format string check',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Fix the format string mismatch caught at comptime.',
      skeleton: `const std = @import("std");

pub fn main() void {
    // bug: format expects 1 arg, tuple has 2
    std.debug.print("{d}\\n", .{ 1, 2 });
}`,
      solution: `const std = @import("std");

pub fn main() void {
    std.debug.print("{d} {d}\\n", .{ 1, 2 });
}`,
      hints: [
        'Zig checks format strings at comptime.',
        'Add a second {d} specifier for the second argument.',
        'Or remove the second argument from the tuple.',
      ],
      concepts: ['comptime format check', 'argument count'],
    },
  ],
};
