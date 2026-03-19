import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-str',
  title: '21. Strings',
  language: 'zig',
  explanation: `In Zig, strings are slices of bytes: \`[]const u8\` for string literals, \`[]u8\` for mutable strings. There is no dedicated string type.

\`\`\`zig
const greeting: []const u8 = "hello";
\`\`\`

**String equality** uses \`std.mem.eql\`:
\`\`\`zig
std.mem.eql(u8, "foo", "foo") // true
\`\`\`

**Concatenation** at comptime uses \`++\`:
\`\`\`zig
const s = "hello" ++ " " ++ "world";
\`\`\`

**Runtime concatenation** uses an allocator:
\`\`\`zig
const s = try std.mem.concat(allocator, u8, &.{"foo", "bar"});
defer allocator.free(s);
\`\`\`

**Formatting** into a fixed buffer:
\`\`\`zig
var buf: [64]u8 = undefined;
const s = try std.fmt.bufPrint(&buf, "{s} {d}", .{"hi", 42});
\`\`\`

**std.mem** provides utilities: \`startsWith\`, \`endsWith\`, \`indexOf\`, \`trim\`, \`split\`, etc.`,
  exercises: [
    {
      id: 'zig-str-1',
      title: 'String literal as slice',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Assign a string literal to a []const u8 and print its length.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const s: _____ = "hello";
    std.debug.print("{d}\\n", .{s.len});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const s: []const u8 = "hello";
    std.debug.print("{d}\\n", .{s.len});
}`,
      hints: [
        'A string is []const u8 in Zig.',
        '"hello" has 5 bytes.',
        'Output: 5.',
      ],
      concepts: ['string type', 'slice', '.len'],
    },
    {
      id: 'zig-str-2',
      title: 'Print a string',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict the output of printing a string with {s}.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const name: []const u8 = "Zig";
    std.debug.print("Hello, {s}!\\n", .{name});
}`,
      solution: `Hello, Zig!`,
      hints: [
        '{s} formats a []const u8 as a string.',
        'The \\n in the format adds a newline.',
        'Output: Hello, Zig!',
      ],
      concepts: ['string print', '{s} format'],
    },
    {
      id: 'zig-str-3',
      title: 'Comptime concatenation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Concatenate two string literals at comptime using ++.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const s = "foo" _____ "bar";
    std.debug.print("{s}\\n", .{s});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const s = "foo" ++ "bar";
    std.debug.print("{s}\\n", .{s});
}`,
      hints: [
        '++ concatenates arrays/slices at comptime.',
        '"foo" ++ "bar" produces "foobar".',
        'Output: foobar.',
      ],
      concepts: ['++ operator', 'comptime concat'],
    },
    {
      id: 'zig-str-4',
      title: 'String equality with std.mem.eql',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Compare two strings for equality.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const a = "hello";
    const b = "hello";
    const c = "world";
    std.debug.print("{} {}\\n", .{
        std.mem.eql(u8, a, b),
        std.mem.eql(u8, a, c),
    });
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const a = "hello";
    const b = "hello";
    const c = "world";
    std.debug.print("{} {}\\n", .{
        std.mem.eql(u8, a, b),
        std.mem.eql(u8, a, c),
    });
}`,
      hints: [
        'std.mem.eql(u8, s1, s2) compares byte by byte.',
        'a == b is true, a == c is false.',
        'Output: "true false".',
      ],
      concepts: ['std.mem.eql', 'string comparison'],
    },
    {
      id: 'zig-str-5',
      title: 'Access individual character',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict the output when accessing a character by index.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const s = "Zig";
    std.debug.print("{c}\\n", .{s[0]});
}`,
      solution: `Z`,
      hints: [
        'Strings are indexed like arrays.',
        's[0] is the first byte.',
        '{c} formats a u8 as a character; output is Z.',
      ],
      concepts: ['character access', 'indexing'],
    },
    {
      id: 'zig-str-6',
      title: 'Substring slice',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Slice a string to extract a substring.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const s = "hello world";
    const sub = s[_____];
    std.debug.print("{s}\\n", .{sub});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const s = "hello world";
    const sub = s[6..11];
    std.debug.print("{s}\\n", .{sub});
}`,
      hints: [
        'Use [start..end] to extract a substring.',
        '"world" starts at index 6 and ends at 11.',
        'Output: world.',
      ],
      concepts: ['substring', 'slice syntax'],
    },
    {
      id: 'zig-str-7',
      title: 'startsWith and endsWith',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Check if a string starts and ends with given substrings.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const path = "/home/zan/file.txt";
    std.debug.print("{} {}\\n", .{
        std.mem.startsWith(u8, path, "/home"),
        std.mem.endsWith(u8, path, ".txt"),
    });
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const path = "/home/zan/file.txt";
    std.debug.print("{} {}\\n", .{
        std.mem.startsWith(u8, path, "/home"),
        std.mem.endsWith(u8, path, ".txt"),
    });
}`,
      hints: [
        'std.mem.startsWith(u8, s, prefix) checks the prefix.',
        'std.mem.endsWith(u8, s, suffix) checks the suffix.',
        'Output: "true true".',
      ],
      concepts: ['startsWith', 'endsWith'],
    },
    {
      id: 'zig-str-8',
      title: 'bufPrint for runtime formatting',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use bufPrint to format a string into a stack buffer.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var buf: [32]u8 = undefined;
    const s = try std.fmt.bufPrint(_____, "age={d}", .{25});
    std.debug.print("{s}\\n", .{s});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var buf: [32]u8 = undefined;
    const s = try std.fmt.bufPrint(&buf, "age={d}", .{25});
    std.debug.print("{s}\\n", .{s});
}`,
      hints: [
        'Pass &buf as the first argument to bufPrint.',
        'bufPrint returns a slice into the buffer.',
        'Output: age=25.',
      ],
      concepts: ['bufPrint', 'stack buffer'],
    },
    {
      id: 'zig-str-9',
      title: 'std.mem.indexOf for substring search',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Find the position of a substring using std.mem.indexOf.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const text = "the quick brown fox";
    const pos = std.mem.indexOf(u8, text, "brown");
    std.debug.print("{?}\\n", .{pos});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const text = "the quick brown fox";
    const pos = std.mem.indexOf(u8, text, "brown");
    std.debug.print("{?}\\n", .{pos});
}`,
      hints: [
        'std.mem.indexOf returns ?usize.',
        '"brown" starts at index 10.',
        'Output: 10.',
      ],
      concepts: ['std.mem.indexOf', 'substring search'],
    },
    {
      id: 'zig-str-10',
      title: 'Iterate over characters',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Count vowels in a string by iterating over bytes.',
      skeleton: `const std = @import("std");

fn countVowels(s: []const u8) u32 {
    var count: u32 = 0;
    for (s) |c| {
        switch (c) {
            'a', 'e', 'i', 'o', 'u' => count += 1,
            else => {},
        }
    }
    return count;
}

pub fn main() void {
    std.debug.print("{d}\\n", .{countVowels("hello world")});
}`,
      solution: `const std = @import("std");

fn countVowels(s: []const u8) u32 {
    var count: u32 = 0;
    for (s) |c| {
        switch (c) {
            'a', 'e', 'i', 'o', 'u' => count += 1,
            else => {},
        }
    }
    return count;
}

pub fn main() void {
    std.debug.print("{d}\\n", .{countVowels("hello world")});
}`,
      hints: [
        'Iterate over bytes with for (s) |c|.',
        '"hello world" has e, o, o = 3 vowels.',
        'Output: 3.',
      ],
      concepts: ['byte iteration', 'character switch'],
    },
    {
      id: 'zig-str-11',
      title: 'std.mem.trim whitespace',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Trim leading and trailing whitespace from a string.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const raw = "  hello  ";
    const trimmed = std.mem.trim(u8, raw, _____);
    std.debug.print("'{s}'\\n", .{trimmed});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const raw = "  hello  ";
    const trimmed = std.mem.trim(u8, raw, " ");
    std.debug.print("'{s}'\\n", .{trimmed});
}`,
      hints: [
        'std.mem.trim takes a string of characters to trim.',
        'Pass " " to trim spaces.',
        'Output: \'hello\'.',
      ],
      concepts: ['std.mem.trim', 'whitespace'],
    },
    {
      id: 'zig-str-12',
      title: 'std.mem.splitSequence',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Split a CSV string and print each field.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const csv = "a,bb,ccc";
    var it = std.mem.splitSequence(u8, csv, ",");
    while (it.next()) |part| {
        std.debug.print("{s}\\n", .{part});
    }
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const csv = "a,bb,ccc";
    var it = std.mem.splitSequence(u8, csv, ",");
    while (it.next()) |part| {
        std.debug.print("{s}\\n", .{part});
    }
}`,
      hints: [
        'std.mem.splitSequence splits on a delimiter sequence.',
        'it.next() returns ?[]const u8.',
        'Output: a, bb, ccc each on a new line.',
      ],
      concepts: ['splitSequence', 'string split', 'iterator'],
    },
    {
      id: 'zig-str-13',
      title: 'Runtime string concat with allocator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Concatenate two strings at runtime using std.mem.concat.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    const s = try std.mem.concat(alloc, u8, &.{ "hello", " ", "world" });
    defer alloc.free(s);
    std.debug.print("{s}\\n", .{s});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    const s = try std.mem.concat(alloc, u8, &.{ "hello", " ", "world" });
    defer alloc.free(s);
    std.debug.print("{s}\\n", .{s});
}`,
      hints: [
        'std.mem.concat allocates and joins slices.',
        'The result must be freed with defer alloc.free(s).',
        'Output: hello world.',
      ],
      concepts: ['std.mem.concat', 'heap allocation'],
    },
    {
      id: 'zig-str-14',
      title: 'allocPrint for formatted strings',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use std.fmt.allocPrint to create a formatted string on the heap.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    const s = try std.fmt.allocPrint(alloc, "count={d}", .{_____});
    defer alloc.free(s);
    std.debug.print("{s}\\n", .{s});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    const s = try std.fmt.allocPrint(alloc, "count={d}", .{42});
    defer alloc.free(s);
    std.debug.print("{s}\\n", .{s});
}`,
      hints: [
        'allocPrint allocates a string on the heap.',
        'Pass any integer as the format argument.',
        'Output: count=42.',
      ],
      concepts: ['allocPrint', 'heap-allocated string'],
    },
    {
      id: 'zig-str-15',
      title: 'Replace substring',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Replace all occurrences of a substring using std.mem.replaceOwned.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    const input = "cat and cat";
    const result = try std.mem.replaceOwned(u8, alloc, input, "cat", "dog");
    defer alloc.free(result);
    std.debug.print("{s}\\n", .{result});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    const input = "cat and cat";
    const result = try std.mem.replaceOwned(u8, alloc, input, "cat", "dog");
    defer alloc.free(result);
    std.debug.print("{s}\\n", .{result});
}`,
      hints: [
        'std.mem.replaceOwned allocates a new string with replacements.',
        'Both occurrences of "cat" become "dog".',
        'Output: dog and dog.',
      ],
      concepts: ['replaceOwned', 'string replace'],
    },
    {
      id: 'zig-str-16',
      title: 'Convert int to string',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Convert an integer to a string using bufPrint.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var buf: [20]u8 = undefined;
    const s = try std.fmt.bufPrint(&buf, "{d}", .{_____});
    std.debug.print("{s} len={d}\\n", .{ s, s.len });
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var buf: [20]u8 = undefined;
    const s = try std.fmt.bufPrint(&buf, "{d}", .{12345});
    std.debug.print("{s} len={d}\\n", .{ s, s.len });
}`,
      hints: [
        'Use {d} format specifier for an integer.',
        '12345 formatted is "12345" with len=5.',
        'Output: 12345 len=5.',
      ],
      concepts: ['int to string', 'bufPrint'],
    },
    {
      id: 'zig-str-17',
      title: 'Case conversion',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Convert a string to uppercase using std.ascii.toUpper.',
      skeleton: `const std = @import("std");

pub fn main() void {
    var buf = [_]u8{ 'h', 'e', 'l', 'l', 'o' };
    for (&buf) |*c| c.* = std.ascii.toUpper(c.*);
    std.debug.print("{s}\\n", .{&buf});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    var buf = [_]u8{ 'h', 'e', 'l', 'l', 'o' };
    for (&buf) |*c| c.* = std.ascii.toUpper(c.*);
    std.debug.print("{s}\\n", .{&buf});
}`,
      hints: [
        'std.ascii.toUpper converts a byte to uppercase.',
        'for (&buf) |*c| iterates with mutable pointers.',
        'Output: HELLO.',
      ],
      concepts: ['std.ascii', 'toUpper', 'mutable iteration'],
    },
    {
      id: 'zig-str-18',
      title: 'Check if string contains character',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use std.mem.indexOfScalar to check if a char is in a string.',
      skeleton: `const std = @import("std");

fn contains(s: []const u8, ch: u8) bool {
    return std.mem.indexOfScalar(u8, s, ch) != null;
}

pub fn main() void {
    std.debug.print("{} {}\\n", .{
        contains("hello", 'l'),
        contains("hello", 'z'),
    });
}`,
      solution: `const std = @import("std");

fn contains(s: []const u8, ch: u8) bool {
    return std.mem.indexOfScalar(u8, s, ch) != null;
}

pub fn main() void {
    std.debug.print("{} {}\\n", .{
        contains("hello", 'l'),
        contains("hello", 'z'),
    });
}`,
      hints: [
        'std.mem.indexOfScalar returns ?usize.',
        '"hello" contains l but not z.',
        'Output: "true false".',
      ],
      concepts: ['indexOfScalar', 'char search'],
    },
    {
      id: 'zig-str-19',
      title: 'Reverse a string',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Reverse a mutable string slice in place.',
      skeleton: `const std = @import("std");

fn reverseStr(s: []u8) void {
    var lo: usize = 0;
    var hi: usize = s.len - 1;
    while (lo < hi) {
        const tmp = s[lo];
        s[lo] = s[hi];
        s[hi] = tmp;
        lo += 1;
        hi -= 1;
    }
}

pub fn main() void {
    var buf = "hello".*;
    reverseStr(&buf);
    std.debug.print("{s}\\n", .{&buf});
}`,
      solution: `const std = @import("std");

fn reverseStr(s: []u8) void {
    var lo: usize = 0;
    var hi: usize = s.len - 1;
    while (lo < hi) {
        const tmp = s[lo];
        s[lo] = s[hi];
        s[hi] = tmp;
        lo += 1;
        hi -= 1;
    }
}

pub fn main() void {
    var buf = "hello".*;
    reverseStr(&buf);
    std.debug.print("{s}\\n", .{&buf});
}`,
      hints: [
        '"hello".* copies the string literal to a mutable array.',
        '&buf coerces the array to a []u8 slice.',
        'Output: olleh.',
      ],
      concepts: ['string mutation', 'reverse', 'array copy'],
    },
    {
      id: 'zig-str-20',
      title: 'Parse integer from string',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Parse an integer from a string using std.fmt.parseInt.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const s = "42";
    const n = try std.fmt.parseInt(_____, s, 10);
    std.debug.print("{d}\\n", .{n});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const s = "42";
    const n = try std.fmt.parseInt(i32, s, 10);
    std.debug.print("{d}\\n", .{n});
}`,
      hints: [
        'std.fmt.parseInt(T, str, base) parses a string.',
        'Use i32 as the type and 10 as the base.',
        'Output: 42.',
      ],
      concepts: ['parseInt', 'string to int'],
    },
  ],
};
