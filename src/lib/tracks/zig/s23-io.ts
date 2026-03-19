import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-io',
  title: '23. I/O',
  language: 'zig',
  explanation: `Zig I/O is based on readers and writers. Everything in \`std.io\` works generically via the \`Reader\` and \`Writer\` interfaces.

**Get stdout/stderr:**
\`\`\`zig
const stdout = std.io.getStdOut().writer();
const stderr = std.io.getStdErr().writer();
try stdout.print("hello\\n", .{});
\`\`\`

**Get stdin reader:**
\`\`\`zig
const stdin = std.io.getStdIn().reader();
\`\`\`

**Read a line from stdin:**
\`\`\`zig
var buf: [256]u8 = undefined;
const line = try stdin.readUntilDelimiterOrEof(&buf, '\\n');
\`\`\`

**Buffered I/O** wraps any reader/writer for efficiency:
\`\`\`zig
var bw = std.io.bufferedWriter(stdout);
const bw_writer = bw.writer();
try bw_writer.print("buffered\\n", .{});
try bw.flush();
\`\`\`

Writers support: \`print\`, \`writeByte\`, \`writeAll\`, \`writeInt\`.
Readers support: \`readByte\`, \`readAll\`, \`readUntilDelimiterOrEof\`, \`readInt\`.`,
  exercises: [
    {
      id: 'zig-io-1',
      title: 'Write to stdout',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Get the stdout writer and print a message.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const stdout = std.io.getStdOut()._____;
    try stdout.print("hello\\n", .{});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    try stdout.print("hello\\n", .{});
}`,
      hints: [
        'Call .writer() on the File to get a writer.',
        'writer.print() returns !void, use try.',
        'Output: hello.',
      ],
      concepts: ['stdout writer', 'writer.print'],
    },
    {
      id: 'zig-io-2',
      title: 'writeByte',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict the output of writeByte.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const out = std.io.getStdOut().writer();
    try out.writeByte('A');
    try out.writeByte('\\n');
}`,
      solution: `A`,
      hints: [
        'writeByte writes a single byte.',
        "'A' is ASCII 65, printed as the character A.",
        'The \\n ends the line.',
      ],
      concepts: ['writeByte', 'character output'],
    },
    {
      id: 'zig-io-3',
      title: 'writeAll for raw bytes',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Use writeAll to write a string slice to stdout.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const out = std.io.getStdOut().writer();
    try out._____(  "Zig\\n"  );
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const out = std.io.getStdOut().writer();
    try out.writeAll("Zig\\n");
}`,
      hints: [
        'writeAll writes all bytes of a slice.',
        'It does not format; it writes literally.',
        'Output: Zig.',
      ],
      concepts: ['writeAll', 'raw bytes'],
    },
    {
      id: 'zig-io-4',
      title: 'Buffered writer',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Wrap stdout in a bufferedWriter and flush.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var bw = std.io.bufferedWriter(std.io.getStdOut().writer());
    const writer = bw.writer();
    try writer.print("buffered\\n", .{});
    try bw.flush();
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var bw = std.io.bufferedWriter(std.io.getStdOut().writer());
    const writer = bw.writer();
    try writer.print("buffered\\n", .{});
    try bw.flush();
}`,
      hints: [
        'bufferedWriter wraps any writer for efficiency.',
        'Always call bw.flush() to write remaining buffered bytes.',
        'Output: buffered.',
      ],
      concepts: ['bufferedWriter', 'flush'],
    },
    {
      id: 'zig-io-5',
      title: 'Write to stderr',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Write an error message to stderr.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const stderr = std.io._____.writer();
    try stderr.print("error: something went wrong\\n", .{});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const stderr = std.io.getStdErr().writer();
    try stderr.print("error: something went wrong\\n", .{});
}`,
      hints: [
        'Use std.io.getStdErr() for the error stream.',
        'It works identically to stdout.',
        'Error output goes to file descriptor 2.',
      ],
      concepts: ['stderr', 'getStdErr'],
    },
    {
      id: 'zig-io-6',
      title: 'Read a line from stdin',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Read a line from stdin into a buffer.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const stdin = std.io.getStdIn().reader();
    var buf: [256]u8 = undefined;
    const line = try stdin.readUntilDelimiterOrEof(&buf, '\\n');
    if (line) |l| {
        std.debug.print("got: {s}\\n", .{l});
    }
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const stdin = std.io.getStdIn().reader();
    var buf: [256]u8 = undefined;
    const line = try stdin.readUntilDelimiterOrEof(&buf, '\\n');
    if (line) |l| {
        std.debug.print("got: {s}\\n", .{l});
    }
}`,
      hints: [
        'readUntilDelimiterOrEof returns ?[]u8.',
        'null means EOF was reached without any data.',
        'The newline is NOT included in the result.',
      ],
      concepts: ['stdin reader', 'readUntilDelimiterOrEof'],
    },
    {
      id: 'zig-io-7',
      title: 'writeInt for binary data',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a u32 as big-endian binary using writeInt.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var buf: [4]u8 = undefined;
    var fbs = std.io.fixedBufferStream(&buf);
    const writer = fbs.writer();
    try writer.writeInt(u32, 0xDEADBEEF, .big);
    std.debug.print("{x} {x} {x} {x}\\n", .{ buf[0], buf[1], buf[2], buf[3] });
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var buf: [4]u8 = undefined;
    var fbs = std.io.fixedBufferStream(&buf);
    const writer = fbs.writer();
    try writer.writeInt(u32, 0xDEADBEEF, .big);
    std.debug.print("{x} {x} {x} {x}\\n", .{ buf[0], buf[1], buf[2], buf[3] });
}`,
      hints: [
        'fixedBufferStream wraps a buffer as a reader/writer.',
        'writeInt writes in the specified endianness.',
        'Output: de ad be ef.',
      ],
      concepts: ['writeInt', 'fixedBufferStream', 'endianness'],
    },
    {
      id: 'zig-io-8',
      title: 'readInt from buffer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Read an integer from a byte buffer using readInt.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const data = [_]u8{ 0x00, 0x00, 0x00, 0x2A };
    var fbs = std.io.fixedBufferStream(&data);
    const reader = fbs.reader();
    const n = try reader.readInt(u32, _____);
    std.debug.print("{d}\\n", .{n});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const data = [_]u8{ 0x00, 0x00, 0x00, 0x2A };
    var fbs = std.io.fixedBufferStream(&data);
    const reader = fbs.reader();
    const n = try reader.readInt(u32, .big);
    std.debug.print("{d}\\n", .{n});
}`,
      hints: [
        'readInt(T, endianness) reads and converts bytes.',
        '0x0000002A in big-endian is 42.',
        'Output: 42.',
      ],
      concepts: ['readInt', 'big-endian', 'fixedBufferStream'],
    },
    {
      id: 'zig-io-9',
      title: 'Buffered reader',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Wrap stdin in a bufferedReader for efficient line reading.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var br = std.io.bufferedReader(std.io.getStdIn().reader());
    const reader = br.reader();
    var buf: [256]u8 = undefined;
    const line = try reader.readUntilDelimiterOrEof(&buf, '\\n');
    if (line) |l| std.debug.print("{s}\\n", .{l});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var br = std.io.bufferedReader(std.io.getStdIn().reader());
    const reader = br.reader();
    var buf: [256]u8 = undefined;
    const line = try reader.readUntilDelimiterOrEof(&buf, '\\n');
    if (line) |l| std.debug.print("{s}\\n", .{l});
}`,
      hints: [
        'bufferedReader wraps any reader to reduce syscall frequency.',
        'The API is the same; just wrap before using.',
        'Buffering greatly improves performance for many small reads.',
      ],
      concepts: ['bufferedReader', 'efficient I/O'],
    },
    {
      id: 'zig-io-10',
      title: 'fixedBufferStream as in-memory stream',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write and read from an in-memory buffer using fixedBufferStream.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var buf: [16]u8 = undefined;
    var fbs = std.io.fixedBufferStream(&buf);
    try fbs.writer().writeAll("hello");
    fbs.pos = _____; // seek to beginning
    var rbuf: [5]u8 = undefined;
    _ = try fbs.reader().readAll(&rbuf);
    std.debug.print("{s}\\n", .{&rbuf});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var buf: [16]u8 = undefined;
    var fbs = std.io.fixedBufferStream(&buf);
    try fbs.writer().writeAll("hello");
    fbs.pos = 0;
    var rbuf: [5]u8 = undefined;
    _ = try fbs.reader().readAll(&rbuf);
    std.debug.print("{s}\\n", .{&rbuf});
}`,
      hints: [
        'fbs.pos is the current position in the stream.',
        'Set pos = 0 to seek back to the beginning.',
        'Output: hello.',
      ],
      concepts: ['fixedBufferStream', 'seek', 'in-memory I/O'],
    },
    {
      id: 'zig-io-11',
      title: 'Write formatted table to writer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a formatted table to a writer parameter.',
      skeleton: `const std = @import("std");

fn printTable(writer: anytype) !void {
    const headers = [_][]const u8{ "Name", "Score" };
    try writer.print("{s:<12} {s:>6}\\n", .{ headers[0], headers[1] });
    try writer.print("{s:<12} {d:>6}\\n", .{ "Alice", 95 });
    try writer.print("{s:<12} {d:>6}\\n", .{ "Bob",   87 });
}

pub fn main() !void {
    try printTable(std.io.getStdOut().writer());
}`,
      solution: `const std = @import("std");

fn printTable(writer: anytype) !void {
    const headers = [_][]const u8{ "Name", "Score" };
    try writer.print("{s:<12} {s:>6}\\n", .{ headers[0], headers[1] });
    try writer.print("{s:<12} {d:>6}\\n", .{ "Alice", 95 });
    try writer.print("{s:<12} {d:>6}\\n", .{ "Bob",   87 });
}

pub fn main() !void {
    try printTable(std.io.getStdOut().writer());
}`,
      hints: [
        'anytype writer accepts any writer type.',
        'This makes the function testable with an in-memory writer.',
        'Output shows an aligned table.',
      ],
      concepts: ['anytype writer', 'generic I/O'],
    },
    {
      id: 'zig-io-12',
      title: 'Count bytes written',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use a CountingWriter to measure bytes written.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var cw = std.io.countingWriter(std.io.null_writer);
    const writer = cw.writer();
    try writer.print("hello world", .{});
    std.debug.print("{d}\\n", .{cw.bytes_written});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var cw = std.io.countingWriter(std.io.null_writer);
    const writer = cw.writer();
    try writer.print("hello world", .{});
    std.debug.print("{d}\\n", .{cw.bytes_written});
}`,
      hints: [
        'countingWriter wraps any writer and tracks bytes_written.',
        'null_writer discards all output.',
        '"hello world" is 11 bytes; output: 11.',
      ],
      concepts: ['countingWriter', 'bytes_written'],
    },
    {
      id: 'zig-io-13',
      title: 'Read exact bytes',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use readNoEof to read exactly N bytes.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const data: []const u8 = "hello world";
    var fbs = std.io.fixedBufferStream(data);
    var buf: [5]u8 = undefined;
    try fbs.reader()._____(  &buf  );
    std.debug.print("{s}\\n", .{&buf});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const data: []const u8 = "hello world";
    var fbs = std.io.fixedBufferStream(data);
    var buf: [5]u8 = undefined;
    try fbs.reader().readNoEof(&buf);
    std.debug.print("{s}\\n", .{&buf});
}`,
      hints: [
        'readNoEof reads exactly buf.len bytes or returns an error.',
        'It differs from readAll which may read fewer bytes.',
        'Output: hello.',
      ],
      concepts: ['readNoEof', 'exact read'],
    },
    {
      id: 'zig-io-14',
      title: 'Write binary integer and read back',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Round-trip a u16 through a buffer using writeInt/readInt.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var buf: [2]u8 = undefined;
    var fbs = std.io.fixedBufferStream(&buf);
    try fbs.writer().writeInt(u16, 1234, .little);
    fbs.pos = 0;
    const n = try fbs.reader().readInt(u16, .little);
    std.debug.print("{d}\\n", .{n});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var buf: [2]u8 = undefined;
    var fbs = std.io.fixedBufferStream(&buf);
    try fbs.writer().writeInt(u16, 1234, .little);
    fbs.pos = 0;
    const n = try fbs.reader().readInt(u16, .little);
    std.debug.print("{d}\\n", .{n});
}`,
      hints: [
        'Write then seek to 0 then read.',
        'little-endian round-trips correctly.',
        'Output: 1234.',
      ],
      concepts: ['writeInt/readInt', 'round-trip', 'little-endian'],
    },
    {
      id: 'zig-io-15',
      title: 'Limit reader',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Wrap a reader in a limitedReader to cap bytes read.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const data: []const u8 = "hello world";
    var fbs = std.io.fixedBufferStream(data);
    var lr = std.io.limitedReader(fbs.reader(), 5);
    var buf: [16]u8 = undefined;
    const n = try lr.reader().readAll(&buf);
    std.debug.print("{s}\\n", .{buf[0..n]});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const data: []const u8 = "hello world";
    var fbs = std.io.fixedBufferStream(data);
    var lr = std.io.limitedReader(fbs.reader(), 5);
    var buf: [16]u8 = undefined;
    const n = try lr.reader().readAll(&buf);
    std.debug.print("{s}\\n", .{buf[0..n]});
}`,
      hints: [
        'limitedReader(reader, max_bytes) caps reads to max_bytes.',
        'Only 5 bytes ("hello") are read.',
        'Output: hello.',
      ],
      concepts: ['limitedReader', 'read cap'],
    },
    {
      id: 'zig-io-16',
      title: 'Read all from stdin',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Read all data from stdin into an ArrayList.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    var list = std.ArrayList(u8).init(alloc);
    defer list.deinit();

    try std.io.getStdIn().reader().readAllArrayList(&list, 1024 * 1024);
    std.debug.print("read {d} bytes\\n", .{list.items.len});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    var list = std.ArrayList(u8).init(alloc);
    defer list.deinit();

    try std.io.getStdIn().reader().readAllArrayList(&list, 1024 * 1024);
    std.debug.print("read {d} bytes\\n", .{list.items.len});
}`,
      hints: [
        'readAllArrayList reads until EOF into an ArrayList.',
        'The second arg is the max allowed size.',
        'Output depends on stdin content.',
      ],
      concepts: ['readAllArrayList', 'stdin all'],
    },
    {
      id: 'zig-io-17',
      title: 'Write then read fixedBufferStream position',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict the position in a fixedBufferStream after writing.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var buf: [10]u8 = undefined;
    var fbs = std.io.fixedBufferStream(&buf);
    try fbs.writer().writeAll("abc");
    std.debug.print("{d}\\n", .{fbs.pos});
}`,
      solution: `3`,
      hints: [
        '"abc" is 3 bytes.',
        'After writing, fbs.pos advances to 3.',
        'Output: 3.',
      ],
      concepts: ['stream position', 'fixedBufferStream'],
    },
    {
      id: 'zig-io-18',
      title: 'Discard output with null_writer',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use std.io.null_writer to discard output in tests.',
      skeleton: `const std = @import("std");

fn logMsg(writer: anytype, msg: []const u8) !void {
    try writer.print("[LOG] {s}\\n", .{msg});
}

pub fn main() !void {
    try logMsg(std.io.getStdOut().writer(), "hello");
    try logMsg(std.io._____, "discarded");
}`,
      solution: `const std = @import("std");

fn logMsg(writer: anytype, msg: []const u8) !void {
    try writer.print("[LOG] {s}\\n", .{msg});
}

pub fn main() !void {
    try logMsg(std.io.getStdOut().writer(), "hello");
    try logMsg(std.io.null_writer, "discarded");
}`,
      hints: [
        'std.io.null_writer discards all writes.',
        'It satisfies the writer interface without any output.',
        'Only "[LOG] hello" appears in stdout.',
      ],
      concepts: ['null_writer', 'discard output'],
    },
    {
      id: 'zig-io-19',
      title: 'Multi-writer tee',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use std.io.multiWriter to write to two writers at once.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var buf: [32]u8 = undefined;
    var fbs = std.io.fixedBufferStream(&buf);

    var mw = std.io.multiWriter(.{ std.io.getStdOut().writer(), fbs.writer() });
    try mw.writer().print("tee\\n", .{});

    std.debug.print("buf: {s}", .{fbs.getWritten()});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var buf: [32]u8 = undefined;
    var fbs = std.io.fixedBufferStream(&buf);

    var mw = std.io.multiWriter(.{ std.io.getStdOut().writer(), fbs.writer() });
    try mw.writer().print("tee\\n", .{});

    std.debug.print("buf: {s}", .{fbs.getWritten()});
}`,
      hints: [
        'multiWriter writes to all provided writers.',
        'fbs.getWritten() returns the slice of written bytes.',
        'Output: "tee" to stdout, then "buf: tee" to stdout.',
      ],
      concepts: ['multiWriter', 'tee pattern'],
    },
    {
      id: 'zig-io-20',
      title: 'Line-by-line reading',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Read multiple lines from an in-memory source line by line.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const data: []const u8 = "line1\\nline2\\nline3\\n";
    var fbs = std.io.fixedBufferStream(data);
    const reader = fbs.reader();
    var buf: [64]u8 = undefined;
    var count: u32 = 0;
    while (try reader.readUntilDelimiterOrEof(&buf, '\\n')) |_| {
        count += 1;
    }
    std.debug.print("{d}\\n", .{count});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const data: []const u8 = "line1\\nline2\\nline3\\n";
    var fbs = std.io.fixedBufferStream(data);
    const reader = fbs.reader();
    var buf: [64]u8 = undefined;
    var count: u32 = 0;
    while (try reader.readUntilDelimiterOrEof(&buf, '\\n')) |_| {
        count += 1;
    }
    std.debug.print("{d}\\n", .{count});
}`,
      hints: [
        'readUntilDelimiterOrEof returns null at EOF.',
        'Three newline-terminated lines means count=3.',
        'Output: 3.',
      ],
      concepts: ['line-by-line', 'readUntilDelimiterOrEof', 'EOF'],
    },
  ],
};
