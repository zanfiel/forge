import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-algo',
  title: '47. Algorithms',
  language: 'zig',
  explanation: `Zig's standard library provides common algorithms in \`std.sort\`, \`std.mem\`, and \`std.math\`.

**Sorting:**
\`\`\`zig
std.mem.sort(i32, slice, {}, std.sort.asc(i32));
std.mem.sort(i32, slice, {}, std.sort.desc(i32));
\`\`\`

**Custom comparator:**
\`\`\`zig
fn cmp(_: void, a: i32, b: i32) bool {
    return a < b;
}
std.mem.sort(i32, slice, {}, cmp);
\`\`\`

**Searching:**
\`\`\`zig
const idx = std.mem.indexOf(u8, slice, needle); // ?usize
const pos = std.sort.binarySearch(i32, slice, target, {}, cmp); // ?usize
\`\`\`

**Math utilities:**
- \`std.math.maxInt(T)\`, \`std.math.minInt(T)\`
- \`std.math.clamp(val, min, max)\`
- \`std.math.absInt(n)\`
- \`std.math.log2(n)\`

**std.mem utilities:** \`reverse\`, \`rotate\`, \`indexOfScalar\`, \`count\`, \`replace\``,
  exercises: [
    {
      id: 'zig-algo-1',
      title: 'Sort ascending',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Sort a slice of integers in ascending order.',
      skeleton: `const std = @import("std");

pub fn main() void {
    var arr = [_]i32{ 5, 3, 8, 1, 9, 2 };
    std.mem.sort(i32, &arr, {}, std.sort._____( i32 ));
    std.debug.print("{d}\\n", .{arr[0]});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    var arr = [_]i32{ 5, 3, 8, 1, 9, 2 };
    std.mem.sort(i32, &arr, {}, std.sort.asc(i32));
    std.debug.print("{d}\\n", .{arr[0]});
}`,
      hints: [
        'std.sort.asc(T) returns an ascending comparator for type T.',
        'After sorting, arr[0] is the smallest element.',
        'Output: 1.',
      ],
      concepts: ['std.mem.sort', 'std.sort.asc'],
    },
    {
      id: 'zig-algo-2',
      title: 'Sort descending',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Sort a slice in descending order.',
      skeleton: `const std = @import("std");

pub fn main() void {
    var arr = [_]u32{ 4, 1, 7, 2 };
    std.mem.sort(u32, &arr, {}, std.sort._____(u32));
    std.debug.print("{d}\\n", .{arr[0]});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    var arr = [_]u32{ 4, 1, 7, 2 };
    std.mem.sort(u32, &arr, {}, std.sort.desc(u32));
    std.debug.print("{d}\\n", .{arr[0]});
}`,
      hints: [
        'std.sort.desc(T) returns a descending comparator.',
        'arr[0] is the largest after descending sort.',
        'Output: 7.',
      ],
      concepts: ['std.sort.desc', 'descending sort'],
    },
    {
      id: 'zig-algo-3',
      title: 'Custom comparator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'zig',
      goal: 'Sort strings by length using a custom comparator.',
      skeleton: `const std = @import("std");

fn byLen(_: void, a: []const u8, b: []const u8) bool {
    return a.len < b.len;
}

pub fn main() void {
    var strs = [_][]const u8{ "banana", "hi", "cat", "a" };
    std.mem.sort([]const u8, &strs, {}, byLen);
    std.debug.print("{s}\\n", .{strs[0]});
}`,
      solution: `const std = @import("std");

fn byLen(_: void, a: []const u8, b: []const u8) bool {
    return a.len < b.len;
}

pub fn main() void {
    var strs = [_][]const u8{ "banana", "hi", "cat", "a" };
    std.mem.sort([]const u8, &strs, {}, byLen);
    std.debug.print("{s}\\n", .{strs[0]});
}`,
      hints: [
        'The comparator returns true if a should come before b.',
        'Sorting by length ascending puts shortest first.',
        'Output: a (length 1).',
      ],
      concepts: ['custom comparator', 'sort by field'],
    },
    {
      id: 'zig-algo-4',
      title: 'Binary search',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Use std.sort.binarySearch on a sorted slice.',
      skeleton: `const std = @import("std");

fn order(_: void, key: i32, item: i32) std.math.Order {
    return std.math.order(key, item);
}

pub fn main() void {
    const sorted = [_]i32{ 1, 3, 5, 7, 9, 11 };
    const result = std.sort.binarySearch(i32, 7, &sorted, {}, order);
    std.debug.print("{?}\\n", .{result});
}`,
      solution: `const std = @import("std");

fn order(_: void, key: i32, item: i32) std.math.Order {
    return std.math.order(key, item);
}

pub fn main() void {
    const sorted = [_]i32{ 1, 3, 5, 7, 9, 11 };
    const result = std.sort.binarySearch(i32, 7, &sorted, {}, order);
    std.debug.print("{?}\\n", .{result});
}`,
      hints: [
        'binarySearch requires a sorted slice.',
        '7 is at index 3.',
        'Output: 3.',
      ],
      concepts: ['binarySearch', 'std.math.Order'],
    },
    {
      id: 'zig-algo-5',
      title: 'std.mem.indexOf',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Find the index of a subsequence in a slice.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const data = [_]u8{ 1, 2, 3, 4, 5 };
    const needle = [_]u8{ 3, 4 };
    const pos = std.mem.indexOf(u8, &data, &_____);
    std.debug.print("{?}\\n", .{pos});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const data = [_]u8{ 1, 2, 3, 4, 5 };
    const needle = [_]u8{ 3, 4 };
    const pos = std.mem.indexOf(u8, &data, &needle);
    std.debug.print("{?}\\n", .{pos});
}`,
      hints: [
        'std.mem.indexOf(T, haystack, needle) returns ?usize.',
        'The subsequence [3, 4] starts at index 2.',
        'Output: 2.',
      ],
      concepts: ['std.mem.indexOf', 'subsequence search'],
    },
    {
      id: 'zig-algo-6',
      title: 'std.mem.reverse',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Reverse a slice in place using std.mem.reverse.',
      skeleton: `const std = @import("std");

pub fn main() void {
    var arr = [_]i32{ 1, 2, 3, 4, 5 };
    std.mem.reverse(i32, &arr);
    std.debug.print("{d}\\n", .{arr[0]});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    var arr = [_]i32{ 1, 2, 3, 4, 5 };
    std.mem.reverse(i32, &arr);
    std.debug.print("{d}\\n", .{arr[0]});
}`,
      hints: [
        'std.mem.reverse(T, slice) reverses in place.',
        'After reversal, arr[0] is the last original element.',
        'Output: 5.',
      ],
      concepts: ['std.mem.reverse', 'in-place reverse'],
    },
    {
      id: 'zig-algo-7',
      title: 'Implement linear search',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Implement linear search returning optional index.',
      skeleton: `const std = @import("std");

fn linearSearch(slice: []const i32, target: i32) ?usize {
    for (slice, 0..) |val, i| {
        if (val == target) return i;
    }
    return null;
}

pub fn main() void {
    const data = [_]i32{ 10, 20, 30, 40 };
    std.debug.print("{?} {?}\\n", .{
        linearSearch(&data, 30),
        linearSearch(&data, 99),
    });
}`,
      solution: `const std = @import("std");

fn linearSearch(slice: []const i32, target: i32) ?usize {
    for (slice, 0..) |val, i| {
        if (val == target) return i;
    }
    return null;
}

pub fn main() void {
    const data = [_]i32{ 10, 20, 30, 40 };
    std.debug.print("{?} {?}\\n", .{
        linearSearch(&data, 30),
        linearSearch(&data, 99),
    });
}`,
      hints: [
        'Iterate with index using (slice, 0..) |val, i|.',
        '30 is at index 2; 99 is not found.',
        'Output: 2 null.',
      ],
      concepts: ['linear search', 'optional return', 'index iteration'],
    },
    {
      id: 'zig-algo-8',
      title: 'std.math.clamp',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'zig',
      goal: 'Clamp a value to a range using std.math.clamp.',
      skeleton: `const std = @import("std");

pub fn main() void {
    std.debug.print("{d} {d} {d}\\n", .{
        std.math.clamp(_____, 0, 10),
        std.math.clamp(5, 0, 10),
        std.math.clamp(15, 0, 10),
    });
}`,
      solution: `const std = @import("std");

pub fn main() void {
    std.debug.print("{d} {d} {d}\\n", .{
        std.math.clamp(-5, 0, 10),
        std.math.clamp(5, 0, 10),
        std.math.clamp(15, 0, 10),
    });
}`,
      hints: [
        'clamp(-5, 0, 10) = 0, clamp(5, 0, 10) = 5, clamp(15, 0, 10) = 10.',
        'Use any negative value for the first argument.',
        'Output: 0 5 10.',
      ],
      concepts: ['std.math.clamp', 'range clamping'],
    },
    {
      id: 'zig-algo-9',
      title: 'Implement bubble sort',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Implement bubble sort on a mutable slice.',
      skeleton: `const std = @import("std");

fn bubbleSort(arr: []i32) void {
    const n = arr.len;
    var i: usize = 0;
    while (i < n) : (i += 1) {
        var j: usize = 0;
        while (j < n - i - 1) : (j += 1) {
            if (arr[j] > arr[j + 1]) {
                const tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
}

pub fn main() void {
    var arr = [_]i32{ 5, 1, 4, 2, 8 };
    bubbleSort(&arr);
    std.debug.print("{d}\\n", .{arr[0]});
}`,
      solution: `const std = @import("std");

fn bubbleSort(arr: []i32) void {
    const n = arr.len;
    var i: usize = 0;
    while (i < n) : (i += 1) {
        var j: usize = 0;
        while (j < n - i - 1) : (j += 1) {
            if (arr[j] > arr[j + 1]) {
                const tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
}

pub fn main() void {
    var arr = [_]i32{ 5, 1, 4, 2, 8 };
    bubbleSort(&arr);
    std.debug.print("{d}\\n", .{arr[0]});
}`,
      hints: [
        'Bubble sort: repeatedly swap adjacent elements if out of order.',
        'After sorting, arr[0] is the smallest.',
        'Output: 1.',
      ],
      concepts: ['bubble sort', 'swap', 'nested while'],
    },
    {
      id: 'zig-algo-10',
      title: 'Implement binary search manually',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Implement binary search without using std.sort.',
      skeleton: `const std = @import("std");

fn bsearch(arr: []const i32, target: i32) ?usize {
    var lo: usize = 0;
    var hi: usize = arr.len;
    while (lo < hi) {
        const mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return null;
}

pub fn main() void {
    const sorted = [_]i32{ 1, 3, 5, 7, 9 };
    std.debug.print("{?} {?}\\n", .{ bsearch(&sorted, 5), bsearch(&sorted, 6) });
}`,
      solution: `const std = @import("std");

fn bsearch(arr: []const i32, target: i32) ?usize {
    var lo: usize = 0;
    var hi: usize = arr.len;
    while (lo < hi) {
        const mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return null;
}

pub fn main() void {
    const sorted = [_]i32{ 1, 3, 5, 7, 9 };
    std.debug.print("{?} {?}\\n", .{ bsearch(&sorted, 5), bsearch(&sorted, 6) });
}`,
      hints: [
        'mid = lo + (hi - lo) / 2 avoids overflow.',
        '5 is at index 2; 6 is not found.',
        'Output: 2 null.',
      ],
      concepts: ['binary search', 'lo/hi/mid', 'overflow-safe midpoint'],
    },
    {
      id: 'zig-algo-11',
      title: 'std.mem.count',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Count non-overlapping occurrences of a needle in a slice.',
      skeleton: `const std = @import("std");

pub fn main() void {
    const text = "abababab";
    const count = std.mem.count(u8, text, "ab");
    std.debug.print("{d}\\n", .{count});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    const text = "abababab";
    const count = std.mem.count(u8, text, "ab");
    std.debug.print("{d}\\n", .{count});
}`,
      hints: [
        'std.mem.count counts non-overlapping occurrences.',
        '"abababab" contains "ab" 4 times.',
        'Output: 4.',
      ],
      concepts: ['std.mem.count', 'occurrence counting'],
    },
    {
      id: 'zig-algo-12',
      title: 'Sort struct slice',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Sort a slice of structs by a field.',
      skeleton: `const std = @import("std");

const Person = struct { name: []const u8, age: u8 };

fn byAge(_: void, a: Person, b: Person) bool {
    return a.age < b.age;
}

pub fn main() void {
    var people = [_]Person{
        .{ .name = "Alice", .age = 30 },
        .{ .name = "Bob",   .age = 25 },
        .{ .name = "Carol", .age = 35 },
    };
    std.mem.sort(Person, &people, {}, byAge);
    std.debug.print("{s}\\n", .{people[0].name});
}`,
      solution: `const std = @import("std");

const Person = struct { name: []const u8, age: u8 };

fn byAge(_: void, a: Person, b: Person) bool {
    return a.age < b.age;
}

pub fn main() void {
    var people = [_]Person{
        .{ .name = "Alice", .age = 30 },
        .{ .name = "Bob",   .age = 25 },
        .{ .name = "Carol", .age = 35 },
    };
    std.mem.sort(Person, &people, {}, byAge);
    std.debug.print("{s}\\n", .{people[0].name});
}`,
      hints: [
        'Sort by age ascending puts youngest first.',
        'Bob is 25, the youngest.',
        'Output: Bob.',
      ],
      concepts: ['sort struct', 'custom comparator', 'field access in comparator'],
    },
    {
      id: 'zig-algo-13',
      title: 'Two-pointer technique',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Check if a string is a palindrome using two pointers.',
      skeleton: `const std = @import("std");

fn isPalindrome(s: []const u8) bool {
    var lo: usize = 0;
    var hi: usize = s.len - 1;
    while (lo < hi) {
        if (s[lo] != s[hi]) return false;
        lo += 1;
        hi -= 1;
    }
    return true;
}

pub fn main() void {
    std.debug.print("{} {}\\n", .{
        isPalindrome("racecar"),
        isPalindrome("hello"),
    });
}`,
      solution: `const std = @import("std");

fn isPalindrome(s: []const u8) bool {
    var lo: usize = 0;
    var hi: usize = s.len - 1;
    while (lo < hi) {
        if (s[lo] != s[hi]) return false;
        lo += 1;
        hi -= 1;
    }
    return true;
}

pub fn main() void {
    std.debug.print("{} {}\\n", .{
        isPalindrome("racecar"),
        isPalindrome("hello"),
    });
}`,
      hints: [
        'Two-pointer: lo from start, hi from end.',
        '"racecar" is a palindrome; "hello" is not.',
        'Output: "true false".',
      ],
      concepts: ['two-pointer', 'palindrome', 'slice indexing'],
    },
    {
      id: 'zig-algo-14',
      title: 'Sliding window maximum',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Find the maximum in each window of size k.',
      skeleton: `const std = @import("std");

fn windowMax(arr: []const i32, k: usize, out: []i32) void {
    for (0..arr.len - k + 1) |i| {
        var max = arr[i];
        for (arr[i..i+k]) |v| {
            if (v > max) max = v;
        }
        out[i] = max;
    }
}

pub fn main() void {
    const arr = [_]i32{ 1, 3, -1, -3, 5, 3, 6, 7 };
    var out: [6]i32 = undefined;
    windowMax(&arr, 3, &out);
    for (out) |v| std.debug.print("{d} ", .{v});
    std.debug.print("\\n", .{});
}`,
      solution: `const std = @import("std");

fn windowMax(arr: []const i32, k: usize, out: []i32) void {
    for (0..arr.len - k + 1) |i| {
        var max = arr[i];
        for (arr[i..i+k]) |v| {
            if (v > max) max = v;
        }
        out[i] = max;
    }
}

pub fn main() void {
    const arr = [_]i32{ 1, 3, -1, -3, 5, 3, 6, 7 };
    var out: [6]i32 = undefined;
    windowMax(&arr, 3, &out);
    for (out) |v| std.debug.print("{d} ", .{v});
    std.debug.print("\\n", .{});
}`,
      hints: [
        'For each window of size k, find the max.',
        'Windows: [1,3,-1]=3, [3,-1,-3]=3, [-1,-3,5]=5, [-3,5,3]=5, [5,3,6]=6, [3,6,7]=7.',
        'Output: 3 3 5 5 6 7.',
      ],
      concepts: ['sliding window', 'window max', 'nested for'],
    },
    {
      id: 'zig-algo-15',
      title: 'GCD algorithm',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Implement GCD using the Euclidean algorithm.',
      skeleton: `const std = @import("std");

fn gcd(a: u64, b: u64) u64 {
    if (b == 0) return a;
    return gcd(b, a % b);
}

pub fn main() void {
    std.debug.print("{d}\\n", .{gcd(48, 18)});
}`,
      solution: `const std = @import("std");

fn gcd(a: u64, b: u64) u64 {
    if (b == 0) return a;
    return gcd(b, a % b);
}

pub fn main() void {
    std.debug.print("{d}\\n", .{gcd(48, 18)});
}`,
      hints: [
        'Euclidean GCD: gcd(a, b) = gcd(b, a % b).',
        'gcd(48, 18) = gcd(18, 12) = gcd(12, 6) = gcd(6, 0) = 6.',
        'Output: 6.',
      ],
      concepts: ['GCD', 'Euclidean algorithm', 'recursion'],
    },
    {
      id: 'zig-algo-16',
      title: 'Prefix sum array',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Build a prefix sum array for range sum queries.',
      skeleton: `const std = @import("std");

fn prefixSum(arr: []const i32, out: []i32) void {
    var sum: i32 = 0;
    for (arr, 0..) |v, i| {
        sum += v;
        out[i] = sum;
    }
}

pub fn main() void {
    const arr = [_]i32{ 1, 2, 3, 4, 5 };
    var pre: [5]i32 = undefined;
    prefixSum(&arr, &pre);
    // sum of arr[1..3] = pre[3] - pre[0] = 14 - 1 = 13? No, pre[2]-pre[0] = 6-1 = 5
    std.debug.print("{d}\\n", .{pre[4]});
}`,
      solution: `const std = @import("std");

fn prefixSum(arr: []const i32, out: []i32) void {
    var sum: i32 = 0;
    for (arr, 0..) |v, i| {
        sum += v;
        out[i] = sum;
    }
}

pub fn main() void {
    const arr = [_]i32{ 1, 2, 3, 4, 5 };
    var pre: [5]i32 = undefined;
    prefixSum(&arr, &pre);
    std.debug.print("{d}\\n", .{pre[4]});
}`,
      hints: [
        'pre[i] = sum of arr[0..=i].',
        'pre[4] = 1+2+3+4+5 = 15.',
        'Output: 15.',
      ],
      concepts: ['prefix sum', 'range query', 'cumulative sum'],
    },
    {
      id: 'zig-algo-17',
      title: 'std.mem.rotate',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Rotate a slice left by k positions using std.mem.rotate.',
      skeleton: `const std = @import("std");

pub fn main() void {
    var arr = [_]i32{ 1, 2, 3, 4, 5 };
    std.mem.rotate(i32, &arr, 2);
    std.debug.print("{d}\\n", .{arr[0]});
}`,
      solution: `const std = @import("std");

pub fn main() void {
    var arr = [_]i32{ 1, 2, 3, 4, 5 };
    std.mem.rotate(i32, &arr, 2);
    std.debug.print("{d}\\n", .{arr[0]});
}`,
      hints: [
        'std.mem.rotate shifts elements left by k positions.',
        'Rotating [1,2,3,4,5] left by 2 gives [3,4,5,1,2].',
        'Output: 3.',
      ],
      concepts: ['std.mem.rotate', 'array rotation'],
    },
    {
      id: 'zig-algo-18',
      title: 'Insertion sort',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Implement insertion sort.',
      skeleton: `const std = @import("std");

fn insertionSort(arr: []i32) void {
    var i: usize = 1;
    while (i < arr.len) : (i += 1) {
        const key = arr[i];
        var j: usize = i;
        while (j > 0 and arr[j - 1] > key) : (j -= 1) {
            arr[j] = arr[j - 1];
        }
        arr[j] = key;
    }
}

pub fn main() void {
    var arr = [_]i32{ 12, 11, 13, 5, 6 };
    insertionSort(&arr);
    std.debug.print("{d}\\n", .{arr[0]});
}`,
      solution: `const std = @import("std");

fn insertionSort(arr: []i32) void {
    var i: usize = 1;
    while (i < arr.len) : (i += 1) {
        const key = arr[i];
        var j: usize = i;
        while (j > 0 and arr[j - 1] > key) : (j -= 1) {
            arr[j] = arr[j - 1];
        }
        arr[j] = key;
    }
}

pub fn main() void {
    var arr = [_]i32{ 12, 11, 13, 5, 6 };
    insertionSort(&arr);
    std.debug.print("{d}\\n", .{arr[0]});
}`,
      hints: [
        'Insertion sort builds the sorted portion one element at a time.',
        'After sorting [12,11,13,5,6], arr[0] is 5.',
        'Output: 5.',
      ],
      concepts: ['insertion sort', 'stable sort', 'in-place'],
    },
    {
      id: 'zig-algo-19',
      title: 'std.math.maxInt and minInt',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Predict the max and min values for an integer type.',
      skeleton: `const std = @import("std");

pub fn main() void {
    std.debug.print("{d}\\n", .{std.math.maxInt(u8)});
    std.debug.print("{d}\\n", .{std.math.minInt(i8)});
}`,
      solution: `255
-128`,
      hints: [
        'u8 max is 255 (2^8 - 1).',
        'i8 min is -128 (-2^7).',
        'Output: 255 then -128.',
      ],
      concepts: ['std.math.maxInt', 'std.math.minInt'],
    },
    {
      id: 'zig-algo-20',
      title: 'Sort stability check',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'zig',
      goal: 'Use std.sort.stable for stable sorting (preserves order of equal elements).',
      skeleton: `const std = @import("std");

const Item = struct { key: u8, orig: usize };

fn byKey(_: void, a: Item, b: Item) bool {
    return a.key < b.key;
}

pub fn main() void {
    var items = [_]Item{
        .{ .key = 2, .orig = 0 },
        .{ .key = 1, .orig = 1 },
        .{ .key = 2, .orig = 2 },
        .{ .key = 1, .orig = 3 },
    };
    std.mem.sort(Item, &items, {}, byKey);
    // After stable sort, equal keys should preserve original order
    std.debug.print("{d} {d}\\n", .{ items[0].key, items[0].orig });
}`,
      solution: `const std = @import("std");

const Item = struct { key: u8, orig: usize };

fn byKey(_: void, a: Item, b: Item) bool {
    return a.key < b.key;
}

pub fn main() void {
    var items = [_]Item{
        .{ .key = 2, .orig = 0 },
        .{ .key = 1, .orig = 1 },
        .{ .key = 2, .orig = 2 },
        .{ .key = 1, .orig = 3 },
    };
    std.mem.sort(Item, &items, {}, byKey);
    std.debug.print("{d} {d}\\n", .{ items[0].key, items[0].orig });
}`,
      hints: [
        'After sorting by key, key=1 items come first.',
        'The first key=1 item had orig=1.',
        'Output: 1 1.',
      ],
      concepts: ['sort', 'stability', 'struct sort'],
    },
  ],
};
