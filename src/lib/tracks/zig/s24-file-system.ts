import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-fs',
  title: '24. File System',
  language: 'zig',
  explanation: `Zig's file system API lives in \`std.fs\`. All paths are relative to a \`Dir\`.

**Get current working directory:**
\`\`\`zig
const cwd = std.fs.cwd();
\`\`\`

**Open a file for reading:**
\`\`\`zig
const file = try cwd.openFile("foo.txt", .{});
defer file.close();
\`\`\`

**Read entire file:**
\`\`\`zig
const content = try file.readToEndAlloc(allocator, 1024 * 1024);
defer allocator.free(content);
\`\`\`

**Create/write a file:**
\`\`\`zig
const file = try cwd.createFile("out.txt", .{});
defer file.close();
try file.writeAll("hello");
\`\`\`

**Delete a file:**
\`\`\`zig
try cwd.deleteFile("out.txt");
\`\`\`

**Open/create directories:**
\`\`\`zig
try cwd.makeDir("subdir");
var dir = try cwd.openDir("subdir", .{ .iterate = true });
defer dir.close();
\`\`\`

**Iterate directory:**
\`\`\`zig
var it = dir.iterate();
while (try it.next()) |entry| { _ = entry.name; }
\`\`\``,
  exercises: [
    {
      id: 'zig-fs-1',
      title: 'Create and write a file',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Create a file and write a string to it.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    const file = try cwd.createFile("test.txt", .{});
    defer file.close();
    try file._____(  "hello world"  );
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    const file = try cwd.createFile("test.txt", .{});
    defer file.close();
    try file.writeAll("hello world");
}`,
      hints: [
        'file.writeAll writes all bytes.',
        'createFile creates or truncates the file.',
        'defer file.close() ensures cleanup.',
      ],
      concepts: ['createFile', 'writeAll', 'defer close'],
    },
    {
      id: 'zig-fs-2',
      title: 'Open and read a file',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Open an existing file and read its contents.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    const cwd = std.fs.cwd();
    const file = try cwd.openFile("test.txt", .{});
    defer file.close();

    const content = try file.readToEndAlloc(alloc, 1024);
    defer alloc.free(content);
    std.debug.print("{s}\\n", .{content});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    const cwd = std.fs.cwd();
    const file = try cwd.openFile("test.txt", .{});
    defer file.close();

    const content = try file.readToEndAlloc(alloc, 1024);
    defer alloc.free(content);
    std.debug.print("{s}\\n", .{content});
}`,
      hints: [
        'openFile opens an existing file.',
        'readToEndAlloc reads everything into a heap-allocated slice.',
        'Free the content with defer allocator.free(content).',
      ],
      concepts: ['openFile', 'readToEndAlloc'],
    },
    {
      id: 'zig-fs-3',
      title: 'Delete a file',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Delete a file using deleteFile.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    // create a file first
    const f = try cwd.createFile("tmp.txt", .{});
    f.close();
    // now delete it
    try cwd._____(  "tmp.txt"  );
    std.debug.print("deleted\\n", .{});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    const f = try cwd.createFile("tmp.txt", .{});
    f.close();
    try cwd.deleteFile("tmp.txt");
    std.debug.print("deleted\\n", .{});
}`,
      hints: [
        'cwd.deleteFile(path) removes a file.',
        'It returns an error if the file does not exist.',
        'Output: deleted.',
      ],
      concepts: ['deleteFile'],
    },
    {
      id: 'zig-fs-4',
      title: 'File metadata: stat',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Get the size of a file using file.stat().',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    const file = try cwd.createFile("size_test.txt", .{});
    try file.writeAll("12345");
    const stat = try file.stat();
    file.close();
    try cwd.deleteFile("size_test.txt");
    std.debug.print("{d}\\n", .{stat.size});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    const file = try cwd.createFile("size_test.txt", .{});
    try file.writeAll("12345");
    const stat = try file.stat();
    file.close();
    try cwd.deleteFile("size_test.txt");
    std.debug.print("{d}\\n", .{stat.size});
}`,
      hints: [
        'file.stat() returns metadata including size.',
        '"12345" is 5 bytes.',
        'Output: 5.',
      ],
      concepts: ['stat', 'file size'],
    },
    {
      id: 'zig-fs-5',
      title: 'Write with writer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Use file.writer() to write formatted output to a file.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    const file = try cwd.createFile("fmt.txt", .{});
    defer file.close();
    defer cwd.deleteFile("fmt.txt") catch {};

    const w = file._____;
    try w.print("count={d}\\n", .{7});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    const file = try cwd.createFile("fmt.txt", .{});
    defer file.close();
    defer cwd.deleteFile("fmt.txt") catch {};

    const w = file.writer();
    try w.print("count={d}\\n", .{7});
}`,
      hints: [
        'file.writer() returns a writer for the file.',
        'writer.print() formats and writes.',
        'The file contains "count=7\\n".',
      ],
      concepts: ['file writer', 'formatted file write'],
    },
    {
      id: 'zig-fs-6',
      title: 'Create and list a directory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Create a directory, add files, and iterate entries.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    try cwd.makeDir("mydir");
    defer cwd.deleteTree("mydir") catch {};

    var dir = try cwd.openDir("mydir", .{ .iterate = true });
    defer dir.close();

    const f = try dir.createFile("a.txt", .{});
    f.close();

    var it = dir.iterate();
    while (try it.next()) |entry| {
        std.debug.print("{s}\\n", .{entry.name});
    }
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    try cwd.makeDir("mydir");
    defer cwd.deleteTree("mydir") catch {};

    var dir = try cwd.openDir("mydir", .{ .iterate = true });
    defer dir.close();

    const f = try dir.createFile("a.txt", .{});
    f.close();

    var it = dir.iterate();
    while (try it.next()) |entry| {
        std.debug.print("{s}\\n", .{entry.name});
    }
}`,
      hints: [
        'makeDir creates a new directory.',
        'openDir with .iterate = true allows iteration.',
        'Output: a.txt.',
      ],
      concepts: ['makeDir', 'openDir', 'iterate'],
    },
    {
      id: 'zig-fs-7',
      title: 'Append to a file',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Open a file in append mode and add content.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    {
        const f = try cwd.createFile("append.txt", .{});
        try f.writeAll("line1\\n");
        f.close();
    }
    {
        const f = try cwd.openFile("append.txt", .{ .mode = _____ });
        defer f.close();
        try f.seekFromEnd(0);
        try f.writeAll("line2\\n");
    }
    defer cwd.deleteFile("append.txt") catch {};
    std.debug.print("done\\n", .{});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    {
        const f = try cwd.createFile("append.txt", .{});
        try f.writeAll("line1\\n");
        f.close();
    }
    {
        const f = try cwd.openFile("append.txt", .{ .mode = .read_write });
        defer f.close();
        try f.seekFromEnd(0);
        try f.writeAll("line2\\n");
    }
    defer cwd.deleteFile("append.txt") catch {};
    std.debug.print("done\\n", .{});
}`,
      hints: [
        'Open with .mode = .read_write to allow writing.',
        'seekFromEnd(0) moves to the end of the file.',
        'Then writeAll appends.',
      ],
      concepts: ['openFile modes', 'seekFromEnd', 'append'],
    },
    {
      id: 'zig-fs-8',
      title: 'Check file existence',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Check if a file exists by catching the error from openFile.',
      skeleton: `const std = @import("std");

fn fileExists(cwd: std.fs.Dir, path: []const u8) bool {
    cwd.access(path, .{}) catch return false;
    return true;
}

pub fn main() !void {
    const cwd = std.fs.cwd();
    std.debug.print("{} {}\\n", .{
        fileExists(cwd, "nonexistent.txt"),
        fileExists(cwd, "build.zig"),
    });
}`,
      solution: `const std = @import("std");

fn fileExists(cwd: std.fs.Dir, path: []const u8) bool {
    cwd.access(path, .{}) catch return false;
    return true;
}

pub fn main() !void {
    const cwd = std.fs.cwd();
    std.debug.print("{} {}\\n", .{
        fileExists(cwd, "nonexistent.txt"),
        fileExists(cwd, "build.zig"),
    });
}`,
      hints: [
        'cwd.access(path, .{}) returns void or an error.',
        'Catch the error and return false.',
        'build.zig exists in a Zig project.',
      ],
      concepts: ['access', 'file existence', 'error as signal'],
    },
    {
      id: 'zig-fs-9',
      title: 'Rename a file',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Rename a file using Dir.rename.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    const f = try cwd.createFile("old.txt", .{});
    f.close();
    try cwd._____(  "old.txt", "new.txt"  );
    defer cwd.deleteFile("new.txt") catch {};
    std.debug.print("renamed\\n", .{});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    const f = try cwd.createFile("old.txt", .{});
    f.close();
    try cwd.rename("old.txt", "new.txt");
    defer cwd.deleteFile("new.txt") catch {};
    std.debug.print("renamed\\n", .{});
}`,
      hints: [
        'cwd.rename(old, new) renames atomically.',
        'Output: renamed.',
        'deleteFile must use the new name.',
      ],
      concepts: ['rename', 'atomic rename'],
    },
    {
      id: 'zig-fs-10',
      title: 'Read file into fixed buffer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Read a file into a fixed-size stack buffer.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    {
        const f = try cwd.createFile("small.txt", .{});
        try f.writeAll("abc");
        f.close();
    }
    defer cwd.deleteFile("small.txt") catch {};

    const file = try cwd.openFile("small.txt", .{});
    defer file.close();
    var buf: [16]u8 = undefined;
    const n = try file.readAll(&buf);
    std.debug.print("{s}\\n", .{buf[0..n]});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    {
        const f = try cwd.createFile("small.txt", .{});
        try f.writeAll("abc");
        f.close();
    }
    defer cwd.deleteFile("small.txt") catch {};

    const file = try cwd.openFile("small.txt", .{});
    defer file.close();
    var buf: [16]u8 = undefined;
    const n = try file.readAll(&buf);
    std.debug.print("{s}\\n", .{buf[0..n]});
}`,
      hints: [
        'file.readAll reads up to buf.len bytes.',
        'It returns the number of bytes actually read.',
        'Output: abc.',
      ],
      concepts: ['readAll', 'fixed buffer read'],
    },
    {
      id: 'zig-fs-11',
      title: 'deleteTree for recursive delete',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use deleteTree to remove a directory and its contents.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    try cwd.makeDir("rmdir_test");
    var d = try cwd.openDir("rmdir_test", .{});
    const f = try d.createFile("file.txt", .{});
    f.close();
    d.close();
    try cwd._____(  "rmdir_test"  );
    std.debug.print("done\\n", .{});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    try cwd.makeDir("rmdir_test");
    var d = try cwd.openDir("rmdir_test", .{});
    const f = try d.createFile("file.txt", .{});
    f.close();
    d.close();
    try cwd.deleteTree("rmdir_test");
    std.debug.print("done\\n", .{});
}`,
      hints: [
        'deleteTree recursively deletes a directory and contents.',
        'deleteDir fails if the directory is not empty.',
        'Output: done.',
      ],
      concepts: ['deleteTree', 'recursive delete'],
    },
    {
      id: 'zig-fs-12',
      title: 'File seek and read',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Seek to a position in a file and read from there.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    {
        const f = try cwd.createFile("seektest.txt", .{});
        try f.writeAll("ABCDE");
        f.close();
    }
    defer cwd.deleteFile("seektest.txt") catch {};

    const file = try cwd.openFile("seektest.txt", .{});
    defer file.close();
    try file.seekTo(2);
    var buf: [3]u8 = undefined;
    _ = try file.readAll(&buf);
    std.debug.print("{s}\\n", .{&buf});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    {
        const f = try cwd.createFile("seektest.txt", .{});
        try f.writeAll("ABCDE");
        f.close();
    }
    defer cwd.deleteFile("seektest.txt") catch {};

    const file = try cwd.openFile("seektest.txt", .{});
    defer file.close();
    try file.seekTo(2);
    var buf: [3]u8 = undefined;
    _ = try file.readAll(&buf);
    std.debug.print("{s}\\n", .{&buf});
}`,
      hints: [
        'seekTo(offset) sets the file position.',
        'Seeking to 2 then reading 3 bytes gives "CDE".',
        'Output: CDE.',
      ],
      concepts: ['seekTo', 'random access'],
    },
    {
      id: 'zig-fs-13',
      title: 'copyFile',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Copy a file to a new path using std.fs.copyFileAbsolute or Dir.copyFile.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    {
        const src = try cwd.createFile("src.txt", .{});
        try src.writeAll("copied content");
        src.close();
    }
    try cwd._____(  "src.txt", cwd, "dst.txt", .{}  );
    defer cwd.deleteFile("src.txt") catch {};
    defer cwd.deleteFile("dst.txt") catch {};
    std.debug.print("done\\n", .{});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    {
        const src = try cwd.createFile("src.txt", .{});
        try src.writeAll("copied content");
        src.close();
    }
    try cwd.copyFile("src.txt", cwd, "dst.txt", .{});
    defer cwd.deleteFile("src.txt") catch {};
    defer cwd.deleteFile("dst.txt") catch {};
    std.debug.print("done\\n", .{});
}`,
      hints: [
        'Dir.copyFile(src_path, dest_dir, dest_path, flags) copies a file.',
        'Both source and dest dir can be cwd.',
        'Output: done.',
      ],
      concepts: ['copyFile', 'file copy'],
    },
    {
      id: 'zig-fs-14',
      title: 'makePath for nested directories',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Create nested directories in one call with makePath.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    try cwd.makePath("a/b/c");
    defer cwd.deleteTree("a") catch {};
    var dir = try cwd.openDir("a/b/c", .{});
    dir.close();
    std.debug.print("ok\\n", .{});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    try cwd.makePath("a/b/c");
    defer cwd.deleteTree("a") catch {};
    var dir = try cwd.openDir("a/b/c", .{});
    dir.close();
    std.debug.print("ok\\n", .{});
}`,
      hints: [
        'makePath creates all intermediate directories.',
        'Like mkdir -p.',
        'Output: ok.',
      ],
      concepts: ['makePath', 'nested directories'],
    },
    {
      id: 'zig-fs-15',
      title: 'Read directory entry kinds',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Print whether each directory entry is a file or directory.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    try cwd.makeDir("kindtest");
    defer cwd.deleteTree("kindtest") catch {};
    {
        var d = try cwd.openDir("kindtest", .{});
        defer d.close();
        const f = try d.createFile("file.txt", .{});
        f.close();
        try d.makeDir("subdir");
    }
    var dir = try cwd.openDir("kindtest", .{ .iterate = true });
    defer dir.close();
    var it = dir.iterate();
    while (try it.next()) |entry| {
        const kind: []const u8 = if (entry.kind == .directory) "dir" else "file";
        std.debug.print("{s}: {s}\\n", .{ kind, entry.name });
    }
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    try cwd.makeDir("kindtest");
    defer cwd.deleteTree("kindtest") catch {};
    {
        var d = try cwd.openDir("kindtest", .{});
        defer d.close();
        const f = try d.createFile("file.txt", .{});
        f.close();
        try d.makeDir("subdir");
    }
    var dir = try cwd.openDir("kindtest", .{ .iterate = true });
    defer dir.close();
    var it = dir.iterate();
    while (try it.next()) |entry| {
        const kind: []const u8 = if (entry.kind == .directory) "dir" else "file";
        std.debug.print("{s}: {s}\\n", .{ kind, entry.name });
    }
}`,
      hints: [
        'entry.kind is .directory or .file.',
        'Output shows each entry with its type.',
        'Order may vary.',
      ],
      concepts: ['Dir.iterate', 'entry.kind', 'directory listing'],
    },
    {
      id: 'zig-fs-16',
      title: 'openFileAbsolute',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Open a file at an absolute path.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    // On Linux/macOS, /dev/null is always available
    const file = try std.fs._____(  "/dev/null", .{}  );
    defer file.close();
    std.debug.print("opened\\n", .{});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const file = try std.fs.openFileAbsolute("/dev/null", .{});
    defer file.close();
    std.debug.print("opened\\n", .{});
}`,
      hints: [
        'std.fs.openFileAbsolute takes an absolute path.',
        '/dev/null accepts all writes and returns EOF on reads.',
        'Output: opened.',
      ],
      concepts: ['openFileAbsolute', 'absolute path'],
    },
    {
      id: 'zig-fs-17',
      title: 'writeFileAll convenience',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use cwd.writeFile to create and write in one call.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    try cwd.writeFile(.{ .sub_path = "quick.txt", .data = "quick write" });
    defer cwd.deleteFile("quick.txt") catch {};
    const f = try cwd.openFile("quick.txt", .{});
    defer f.close();
    var buf: [32]u8 = undefined;
    const n = try f.readAll(&buf);
    std.debug.print("{s}\\n", .{buf[0..n]});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    try cwd.writeFile(.{ .sub_path = "quick.txt", .data = "quick write" });
    defer cwd.deleteFile("quick.txt") catch {};
    const f = try cwd.openFile("quick.txt", .{});
    defer f.close();
    var buf: [32]u8 = undefined;
    const n = try f.readAll(&buf);
    std.debug.print("{s}\\n", .{buf[0..n]});
}`,
      hints: [
        'cwd.writeFile creates or overwrites a file with data.',
        'It is a convenience that handles open/write/close.',
        'Output: quick write.',
      ],
      concepts: ['writeFile', 'convenience API'],
    },
    {
      id: 'zig-fs-18',
      title: 'File error handling',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Handle specific file errors like FileNotFound.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const cwd = std.fs.cwd();
    cwd.openFile("does_not_exist.txt", .{}) catch |err| switch (err) {
        error.FileNotFound => std.debug.print("not found\\n", .{}),
        else => std.debug.print("other error\\n", .{}),
    };
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const cwd = std.fs.cwd();
    cwd.openFile("does_not_exist.txt", .{}) catch |err| switch (err) {
        error.FileNotFound => std.debug.print("not found\\n", .{}),
        else => std.debug.print("other error\\n", .{}),
    };
}`,
      hints: [
        'openFile returns error.FileNotFound when missing.',
        'Switch on the error to handle specific cases.',
        'Output: not found.',
      ],
      concepts: ['error.FileNotFound', 'file error handling'],
    },
    {
      id: 'zig-fs-19',
      title: 'Read file with buffered reader',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use a buffered reader for efficient file reading.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    {
        const f = try cwd.createFile("lines.txt", .{});
        try f.writeAll("a\\nb\\nc\\n");
        f.close();
    }
    defer cwd.deleteFile("lines.txt") catch {};

    const file = try cwd.openFile("lines.txt", .{});
    defer file.close();
    var br = std.io.bufferedReader(file.reader());
    const reader = br.reader();
    var buf: [64]u8 = undefined;
    while (try reader.readUntilDelimiterOrEof(&buf, '\\n')) |line| {
        std.debug.print("{s}\\n", .{line});
    }
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    {
        const f = try cwd.createFile("lines.txt", .{});
        try f.writeAll("a\\nb\\nc\\n");
        f.close();
    }
    defer cwd.deleteFile("lines.txt") catch {};

    const file = try cwd.openFile("lines.txt", .{});
    defer file.close();
    var br = std.io.bufferedReader(file.reader());
    const reader = br.reader();
    var buf: [64]u8 = undefined;
    while (try reader.readUntilDelimiterOrEof(&buf, '\\n')) |line| {
        std.debug.print("{s}\\n", .{line});
    }
}`,
      hints: [
        'Wrap file.reader() with bufferedReader for efficiency.',
        'readUntilDelimiterOrEof reads line by line.',
        'Output: a, b, c each on a line.',
      ],
      concepts: ['bufferedReader', 'file line reading'],
    },
    {
      id: 'zig-fs-20',
      title: 'Atomic file write via temp file',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write atomically by writing to a temp file then renaming.',
      skeleton: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    const tmp_path = "output.txt.tmp";
    const final_path = "output.txt";

    {
        const tmp = try cwd.createFile(tmp_path, .{});
        try tmp.writeAll("atomic content");
        tmp.close();
    }
    try cwd.rename(tmp_path, final_path);
    defer cwd.deleteFile(final_path) catch {};
    std.debug.print("ok\\n", .{});
}`,
      solution: `const std = @import("std");

pub fn main() !void {
    const cwd = std.fs.cwd();
    const tmp_path = "output.txt.tmp";
    const final_path = "output.txt";

    {
        const tmp = try cwd.createFile(tmp_path, .{});
        try tmp.writeAll("atomic content");
        tmp.close();
    }
    try cwd.rename(tmp_path, final_path);
    defer cwd.deleteFile(final_path) catch {};
    std.debug.print("ok\\n", .{});
}`,
      hints: [
        'Write to a .tmp file first, then rename atomically.',
        'rename is atomic on POSIX - readers either get old or new.',
        'Output: ok.',
      ],
      concepts: ['atomic write', 'temp file', 'rename'],
    },
  ],
};
