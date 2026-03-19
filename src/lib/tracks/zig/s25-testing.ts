import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-test',
  title: '25. Testing',
  language: 'zig',
  explanation: `Zig has built-in testing with the \`test\` keyword. Run tests with \`zig test file.zig\`.

**Basic test:**
\`\`\`zig
test "addition" {
    try std.testing.expect(1 + 1 == 2);
}
\`\`\`

**Common testing functions:**
- \`std.testing.expect(bool)\` - assert true
- \`std.testing.expectEqual(expected, actual)\` - assert equality
- \`std.testing.expectError(err, expr)\` - assert an error
- \`std.testing.expectEqualStrings(a, b)\` - compare strings
- \`std.testing.expectEqualSlices(T, a, b)\` - compare slices
- \`std.testing.allocator\` - a leak-checking allocator for tests

**Test setup:** Initialize common state at the top of the test block.

**Test teardown:** Use \`defer\` for cleanup.

\`\`\`zig
test "with allocator" {
    const alloc = std.testing.allocator;
    const buf = try alloc.alloc(u8, 10);
    defer alloc.free(buf);
    try std.testing.expectEqual(10, buf.len);
}
\`\`\`

Tests are only compiled when running \`zig test\`. They are excluded from \`zig build\` release builds.`,
  exercises: [
    {
      id: 'zig-test-1',
      title: 'Basic expect',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Write a test using std.testing.expect.',
      skeleton: `const std = @import("std");

test "two plus two" {
    try std.testing.expect(_____ == 4);
}`,
      solution: `const std = @import("std");

test "two plus two" {
    try std.testing.expect(2 + 2 == 4);
}`,
      hints: [
        'expect takes a bool; if false, the test fails.',
        '2 + 2 == 4 is the expression to check.',
        'try propagates a failure as an error.',
      ],
      concepts: ['std.testing.expect', 'test block'],
    },
    {
      id: 'zig-test-2',
      title: 'expectEqual',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Use expectEqual to compare two values.',
      skeleton: `const std = @import("std");

fn double(n: i32) i32 {
    return n * 2;
}

test "double" {
    try std.testing.expectEqual(_____, double(5));
}`,
      solution: `const std = @import("std");

fn double(n: i32) i32 {
    return n * 2;
}

test "double" {
    try std.testing.expectEqual(10, double(5));
}`,
      hints: [
        'double(5) should return 10.',
        'expectEqual(expected, actual).',
        'Expected comes first by convention.',
      ],
      concepts: ['expectEqual', 'unit test'],
    },
    {
      id: 'zig-test-3',
      title: 'Test failure message',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Predict what happens when an expect fails.',
      skeleton: `const std = @import("std");

test "will fail" {
    try std.testing.expect(1 == 2);
}`,
      solution: `Test fails with error.TestUnexpectedResult`,
      hints: [
        '1 == 2 is false.',
        'expect returns error.TestUnexpectedResult.',
        'try propagates it, marking the test as failed.',
      ],
      concepts: ['test failure', 'TestUnexpectedResult'],
    },
    {
      id: 'zig-test-4',
      title: 'expectError',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Test that a function returns an expected error.',
      skeleton: `const std = @import("std");

const E = error{TooBig};

fn validate(n: i32) E!void {
    if (n > 100) return E.TooBig;
}

test "too big" {
    try std.testing.expectError(E.TooBig, validate(200));
}`,
      solution: `const std = @import("std");

const E = error{TooBig};

fn validate(n: i32) E!void {
    if (n > 100) return E.TooBig;
}

test "too big" {
    try std.testing.expectError(E.TooBig, validate(200));
}`,
      hints: [
        'expectError(err, expr) passes if expr returns err.',
        'validate(200) returns TooBig.',
        'The test should pass.',
      ],
      concepts: ['expectError', 'error testing'],
    },
    {
      id: 'zig-test-5',
      title: 'expectEqualStrings',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Compare two strings in a test using expectEqualStrings.',
      skeleton: `const std = @import("std");

fn greeting(name: []const u8) []const u8 {
    _ = name;
    return "hello";
}

test "greeting" {
    try std.testing.expectEqualStrings(_____, greeting("world"));
}`,
      solution: `const std = @import("std");

fn greeting(name: []const u8) []const u8 {
    _ = name;
    return "hello";
}

test "greeting" {
    try std.testing.expectEqualStrings("hello", greeting("world"));
}`,
      hints: [
        'expectEqualStrings compares byte-by-byte.',
        'greeting returns "hello".',
        'Expected is "hello".',
      ],
      concepts: ['expectEqualStrings', 'string test'],
    },
    {
      id: 'zig-test-6',
      title: 'Testing allocator for leak detection',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use std.testing.allocator which detects memory leaks.',
      skeleton: `const std = @import("std");

test "allocate and free" {
    const alloc = std.testing.allocator;
    const buf = try alloc.alloc(u8, 16);
    defer alloc.free(buf);
    try std.testing.expectEqual(@as(usize, 16), buf.len);
}`,
      solution: `const std = @import("std");

test "allocate and free" {
    const alloc = std.testing.allocator;
    const buf = try alloc.alloc(u8, 16);
    defer alloc.free(buf);
    try std.testing.expectEqual(@as(usize, 16), buf.len);
}`,
      hints: [
        'std.testing.allocator reports leaks at the end of the test.',
        'defer alloc.free(buf) ensures cleanup.',
        'expectEqual checks buf.len is 16.',
      ],
      concepts: ['testing.allocator', 'leak detection'],
    },
    {
      id: 'zig-test-7',
      title: 'expectEqualSlices',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Compare two slices element-by-element in a test.',
      skeleton: `const std = @import("std");

fn sorted(arr: []const i32, out: []i32) void {
    @memcpy(out, arr);
    std.mem.sort(i32, out, {}, std.sort.asc(i32));
}

test "sort" {
    const input = [_]i32{ 3, 1, 2 };
    var output: [3]i32 = undefined;
    sorted(&input, &output);
    try std.testing.expectEqualSlices(i32, &[_]i32{ 1, 2, 3 }, &output);
}`,
      solution: `const std = @import("std");

fn sorted(arr: []const i32, out: []i32) void {
    @memcpy(out, arr);
    std.mem.sort(i32, out, {}, std.sort.asc(i32));
}

test "sort" {
    const input = [_]i32{ 3, 1, 2 };
    var output: [3]i32 = undefined;
    sorted(&input, &output);
    try std.testing.expectEqualSlices(i32, &[_]i32{ 1, 2, 3 }, &output);
}`,
      hints: [
        'expectEqualSlices compares element-by-element.',
        'sorted should produce [1, 2, 3].',
        'The test passes if all elements match.',
      ],
      concepts: ['expectEqualSlices', 'slice test'],
    },
    {
      id: 'zig-test-8',
      title: 'Multiple tests in one file',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Understand that all test blocks in a file are run.',
      skeleton: `const std = @import("std");

test "first" {
    try std.testing.expect(true);
}

test "second" {
    try std.testing.expect(true);
}`,
      solution: `Both tests pass`,
      hints: [
        'All test blocks run when you run zig test.',
        'Both tests pass since both expect true.',
        'Zig reports the number of tests passed.',
      ],
      concepts: ['multiple tests', 'test discovery'],
    },
    {
      id: 'zig-test-9',
      title: 'Test with defer cleanup',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Write a test that allocates and defers cleanup.',
      skeleton: `const std = @import("std");

test "hashmap test" {
    const alloc = std.testing.allocator;
    var map = std.AutoHashMap(u32, u32).init(alloc);
    defer map.deinit();

    try map.put(1, 10);
    try map.put(2, 20);
    try std.testing.expectEqual(@as(usize, 2), map.count());
    try std.testing.expectEqual(@as(u32, 10), map.get(1).?);
}`,
      solution: `const std = @import("std");

test "hashmap test" {
    const alloc = std.testing.allocator;
    var map = std.AutoHashMap(u32, u32).init(alloc);
    defer map.deinit();

    try map.put(1, 10);
    try map.put(2, 20);
    try std.testing.expectEqual(@as(usize, 2), map.count());
    try std.testing.expectEqual(@as(u32, 10), map.get(1).?);
}`,
      hints: [
        'defer map.deinit() frees map memory even if assertions fail.',
        'map.count() is 2 after two puts.',
        'map.get(1).? unwraps to 10.',
      ],
      concepts: ['defer in tests', 'map test'],
    },
    {
      id: 'zig-test-10',
      title: 'Test for no memory leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Fix the test: remove the memory leak so testing.allocator passes.',
      skeleton: `const std = @import("std");

test "no leak" {
    const alloc = std.testing.allocator;
    const buf = try alloc.alloc(u8, 8);
    // bug: buf is never freed
    _ = buf;
}`,
      solution: `const std = @import("std");

test "no leak" {
    const alloc = std.testing.allocator;
    const buf = try alloc.alloc(u8, 8);
    defer alloc.free(buf);
    _ = buf;
}`,
      hints: [
        'testing.allocator reports a leak at test end.',
        'Add defer alloc.free(buf).',
        'With the fix, the test passes with no leak.',
      ],
      concepts: ['memory leak', 'defer free', 'testing.allocator'],
    },
    {
      id: 'zig-test-11',
      title: 'expectApproxEqAbs for floats',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use expectApproxEqAbs to compare floats with tolerance.',
      skeleton: `const std = @import("std");

test "sqrt approx" {
    const result = @sqrt(2.0);
    try std.testing.expectApproxEqAbs(1.41421, result, 0.0001);
}`,
      solution: `const std = @import("std");

test "sqrt approx" {
    const result = @sqrt(2.0);
    try std.testing.expectApproxEqAbs(1.41421, result, 0.0001);
}`,
      hints: [
        'expectApproxEqAbs allows a small tolerance.',
        'sqrt(2) is approximately 1.41421.',
        'The third arg is the allowed absolute difference.',
      ],
      concepts: ['expectApproxEqAbs', 'float tolerance'],
    },
    {
      id: 'zig-test-12',
      title: 'Inline test in same file as code',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Add a test for a function in the same file.',
      skeleton: `const std = @import("std");

fn factorial(n: u64) u64 {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}

test "factorial" {
    try std.testing.expectEqual(@as(u64, _____), factorial(5));
}`,
      solution: `const std = @import("std");

fn factorial(n: u64) u64 {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}

test "factorial" {
    try std.testing.expectEqual(@as(u64, 120), factorial(5));
}`,
      hints: [
        '5! = 5 * 4 * 3 * 2 * 1 = 120.',
        '@as(u64, 120) ensures type matches.',
        'Tests live alongside code in Zig.',
      ],
      concepts: ['inline test', 'factorial'],
    },
    {
      id: 'zig-test-13',
      title: 'Test struct method',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write tests for a struct method.',
      skeleton: `const std = @import("std");

const Stack = struct {
    items: [16]i32 = undefined,
    top: usize = 0,

    fn push(self: *Stack, val: i32) void {
        self.items[self.top] = val;
        self.top += 1;
    }

    fn pop(self: *Stack) ?i32 {
        if (self.top == 0) return null;
        self.top -= 1;
        return self.items[self.top];
    }
};

test "stack push pop" {
    var s = Stack{};
    s.push(1);
    s.push(2);
    try std.testing.expectEqual(@as(i32, 2), s.pop().?);
    try std.testing.expectEqual(@as(i32, 1), s.pop().?);
    try std.testing.expect(s.pop() == null);
}`,
      solution: `const std = @import("std");

const Stack = struct {
    items: [16]i32 = undefined,
    top: usize = 0,

    fn push(self: *Stack, val: i32) void {
        self.items[self.top] = val;
        self.top += 1;
    }

    fn pop(self: *Stack) ?i32 {
        if (self.top == 0) return null;
        self.top -= 1;
        return self.items[self.top];
    }
};

test "stack push pop" {
    var s = Stack{};
    s.push(1);
    s.push(2);
    try std.testing.expectEqual(@as(i32, 2), s.pop().?);
    try std.testing.expectEqual(@as(i32, 1), s.pop().?);
    try std.testing.expect(s.pop() == null);
}`,
      hints: [
        'Stack is LIFO; last in, first out.',
        'Push 1 then 2; pop gives 2 then 1.',
        'Third pop gives null.',
      ],
      concepts: ['struct test', 'LIFO', 'optional return'],
    },
    {
      id: 'zig-test-14',
      title: 'Test comptime behavior',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a test that verifies a comptime computation.',
      skeleton: `const std = @import("std");

fn isPowerOfTwo(comptime n: u32) bool {
    return n > 0 and (n & (n - 1)) == 0;
}

test "power of two" {
    try std.testing.expect(isPowerOfTwo(1));
    try std.testing.expect(isPowerOfTwo(4));
    try std.testing.expect(isPowerOfTwo(16));
    try std.testing.expect(!isPowerOfTwo(3));
    try std.testing.expect(!isPowerOfTwo(6));
}`,
      solution: `const std = @import("std");

fn isPowerOfTwo(comptime n: u32) bool {
    return n > 0 and (n & (n - 1)) == 0;
}

test "power of two" {
    try std.testing.expect(isPowerOfTwo(1));
    try std.testing.expect(isPowerOfTwo(4));
    try std.testing.expect(isPowerOfTwo(16));
    try std.testing.expect(!isPowerOfTwo(3));
    try std.testing.expect(!isPowerOfTwo(6));
}`,
      hints: [
        'The bitwise trick n & (n-1) clears the lowest set bit.',
        'For powers of two, this equals zero.',
        'All five assertions should pass.',
      ],
      concepts: ['comptime test', 'bitwise', 'power of two'],
    },
    {
      id: 'zig-test-15',
      title: 'Test with parametrized helper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a test helper that is called with multiple inputs.',
      skeleton: `const std = @import("std");

fn isEven(n: i32) bool {
    return @rem(n, 2) == 0;
}

fn checkEven(n: i32, expected: bool) !void {
    try std.testing.expectEqual(expected, isEven(n));
}

test "even numbers" {
    try checkEven(0, true);
    try checkEven(2, true);
    try checkEven(-4, true);
    try checkEven(1, false);
    try checkEven(3, false);
}`,
      solution: `const std = @import("std");

fn isEven(n: i32) bool {
    return @rem(n, 2) == 0;
}

fn checkEven(n: i32, expected: bool) !void {
    try std.testing.expectEqual(expected, isEven(n));
}

test "even numbers" {
    try checkEven(0, true);
    try checkEven(2, true);
    try checkEven(-4, true);
    try checkEven(1, false);
    try checkEven(3, false);
}`,
      hints: [
        'Extract repeated assertion logic into a helper function.',
        '@rem handles negative numbers correctly.',
        'All five cases should pass.',
      ],
      concepts: ['test helper', 'parameterized test'],
    },
    {
      id: 'zig-test-16',
      title: 'Test error path',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Test both success and error paths of a function.',
      skeleton: `const std = @import("std");

const E = error{Negative};

fn safeLog(n: f64) E!f64 {
    if (n <= 0) return E.Negative;
    return @log(n);
}

test "safeLog success" {
    const v = try safeLog(1.0);
    try std.testing.expectApproxEqAbs(0.0, v, 0.0001);
}

test "safeLog error" {
    try std.testing.expectError(E.Negative, safeLog(-1.0));
}`,
      solution: `const std = @import("std");

const E = error{Negative};

fn safeLog(n: f64) E!f64 {
    if (n <= 0) return E.Negative;
    return @log(n);
}

test "safeLog success" {
    const v = try safeLog(1.0);
    try std.testing.expectApproxEqAbs(0.0, v, 0.0001);
}

test "safeLog error" {
    try std.testing.expectError(E.Negative, safeLog(-1.0));
}`,
      hints: [
        'log(1.0) = 0.0.',
        'safeLog(-1.0) should return E.Negative.',
        'Both tests should pass.',
      ],
      concepts: ['success path test', 'error path test'],
    },
    {
      id: 'zig-test-17',
      title: 'testcase with comptime table',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use a comptime array of test cases to drive a test loop.',
      skeleton: `const std = @import("std");

fn abs(n: i32) i32 {
    return if (n < 0) -n else n;
}

test "abs table" {
    const cases = [_]struct { input: i32, expected: i32 }{
        .{ .input = 5,  .expected = 5  },
        .{ .input = -3, .expected = 3  },
        .{ .input = 0,  .expected = 0  },
    };
    for (cases) |c| {
        try std.testing.expectEqual(c.expected, abs(c.input));
    }
}`,
      solution: `const std = @import("std");

fn abs(n: i32) i32 {
    return if (n < 0) -n else n;
}

test "abs table" {
    const cases = [_]struct { input: i32, expected: i32 }{
        .{ .input = 5,  .expected = 5  },
        .{ .input = -3, .expected = 3  },
        .{ .input = 0,  .expected = 0  },
    };
    for (cases) |c| {
        try std.testing.expectEqual(c.expected, abs(c.input));
    }
}`,
      hints: [
        'Table-driven tests group many cases cleanly.',
        'Iterate over the cases array.',
        'All three cases should pass.',
      ],
      concepts: ['table-driven test', 'comptime struct array'],
    },
    {
      id: 'zig-test-18',
      title: 'Test that panics are expected',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Skip or document that certain code panics intentionally.',
      skeleton: `const std = @import("std");

// This test documents a panic - run with --test-filter to skip
test "slice out of bounds" {
    const arr = [_]u8{ 1, 2, 3 };
    // Accessing arr[5] would panic
    // Use expectError on functions that return errors instead
    try std.testing.expectEqual(@as(u8, 2), arr[_____]);
}`,
      solution: `const std = @import("std");

test "slice out of bounds" {
    const arr = [_]u8{ 1, 2, 3 };
    try std.testing.expectEqual(@as(u8, 2), arr[1]);
}`,
      hints: [
        'arr[1] is 2, a valid in-bounds access.',
        'Panics cannot be caught in normal tests.',
        'Use safe access patterns in production code.',
      ],
      concepts: ['bounds checking', 'safe indexing'],
    },
    {
      id: 'zig-test-19',
      title: 'Test with std.testing.refAllDecls',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use refAllDecls to ensure all public declarations compile.',
      skeleton: `const std = @import("std");

pub fn add(a: i32, b: i32) i32 { return a + b; }
pub fn sub(a: i32, b: i32) i32 { return a - b; }

test {
    std.testing.refAllDecls(@This());
}`,
      solution: `const std = @import("std");

pub fn add(a: i32, b: i32) i32 { return a + b; }
pub fn sub(a: i32, b: i32) i32 { return a - b; }

test {
    std.testing.refAllDecls(@This());
}`,
      hints: [
        'refAllDecls references all declarations so the compiler checks them.',
        'Catches unused or broken public functions.',
        '@This() refers to the current file as a module.',
      ],
      concepts: ['refAllDecls', 'compilation test'],
    },
    {
      id: 'zig-test-20',
      title: 'Full test suite for a mini library',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Write a complete test suite for a small math library.',
      skeleton: `const std = @import("std");

fn clamp(val: f32, lo: f32, hi: f32) f32 {
    if (val < lo) return lo;
    if (val > hi) return hi;
    return val;
}

test "clamp below" {
    try std.testing.expectEqual(@as(f32, 0.0), clamp(-5.0, 0.0, 1.0));
}

test "clamp above" {
    try std.testing.expectEqual(@as(f32, 1.0), clamp(10.0, 0.0, 1.0));
}

test "clamp in range" {
    try std.testing.expectEqual(@as(f32, 0.5), clamp(0.5, 0.0, 1.0));
}`,
      solution: `const std = @import("std");

fn clamp(val: f32, lo: f32, hi: f32) f32 {
    if (val < lo) return lo;
    if (val > hi) return hi;
    return val;
}

test "clamp below" {
    try std.testing.expectEqual(@as(f32, 0.0), clamp(-5.0, 0.0, 1.0));
}

test "clamp above" {
    try std.testing.expectEqual(@as(f32, 1.0), clamp(10.0, 0.0, 1.0));
}

test "clamp in range" {
    try std.testing.expectEqual(@as(f32, 0.5), clamp(0.5, 0.0, 1.0));
}`,
      hints: [
        'Three distinct boundary cases: below, above, in range.',
        'All three should pass.',
        'This covers the full behavior of clamp.',
      ],
      concepts: ['test suite', 'boundary testing', 'clamp'],
    },
  ],
};
