import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'zig-wasm',
  title: '49. WebAssembly',
  description: 'Compiling Zig to WebAssembly: wasm targets, exporting functions to JavaScript, importing JS functions, memory layout, and wasm-specific patterns.',
  exercises: [
    {
      id: 'zig-wasm-1',
      title: 'Export a Function to JavaScript',
      type: 'fill-blank',
      difficulty: 'beginner',
      instructions: 'Fill in the blank to export the `add` function so JavaScript can call it via the wasm module.',
      skeleton: `___ fn add(a: i32, b: i32) i32 {
    return a + b;
}`,
      solution: `export fn add(a: i32, b: i32) i32 {
    return a + b;
}`,
      hints: [
        'Use the `export` keyword to make a function visible to the wasm host',
        'Exported functions must use wasm-compatible types (i32, i64, f32, f64)',
        'In JavaScript: instance.exports.add(1, 2)'
      ]
    },
    {
      id: 'zig-wasm-2',
      title: 'Import a JavaScript Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      instructions: 'Fill in the blanks to declare an extern import of a JavaScript `log` function that takes an i32 message ID.',
      skeleton: `___ fn ___(msg_id: i32) void;

export fn greet(id: i32) void {
    log(id);
}`,
      solution: `extern fn log(msg_id: i32) void;

export fn greet(id: i32) void {
    log(id);
}`,
      hints: [
        'Use `extern fn` to declare a function provided by the host',
        'The JavaScript import object must have matching name and signature',
        'Provide it as { env: { log: (id) => console.log(id) } } in JS'
      ]
    },
    {
      id: 'zig-wasm-3',
      title: 'No Standard Library for Wasm',
      type: 'fill-blank',
      difficulty: 'beginner',
      instructions: 'For a wasm32-freestanding build, the root file must provide a panic handler. Fill in the function signature.',
      skeleton: `pub fn ___(msg: []const u8, st: ?*@import("std").builtin.StackTrace, ra: ?usize) noreturn {
    _ = msg;
    _ = st;
    _ = ra;
    unreachable;
}`,
      solution: `pub fn panic(msg: []const u8, st: ?*@import("std").builtin.StackTrace, ra: ?usize) noreturn {
    _ = msg;
    _ = st;
    _ = ra;
    unreachable;
}`,
      hints: [
        'The panic handler is named `panic` in freestanding mode',
        'It must be noreturn',
        'In wasm you may also want to call a JS error function before unreachable'
      ]
    },
    {
      id: 'zig-wasm-4',
      title: 'Linear Memory Access',
      type: 'write-function',
      difficulty: 'beginner',
      instructions: 'Write `writeU32` that writes a u32 value to wasm linear memory at a given byte offset.',
      skeleton: `export fn writeU32(offset: u32, value: u32) void {
    // write value to linear memory at offset
}`,
      solution: `export fn writeU32(offset: u32, value: u32) void {
    const ptr = @as(*u32, @ptrFromInt(offset));
    ptr.* = value;
}`,
      hints: [
        'In wasm, all memory is a flat linear buffer starting at address 0',
        'Use @ptrFromInt to get a typed pointer from a byte offset',
        'Write through the pointer with ptr.* = value'
      ]
    },
    {
      id: 'zig-wasm-5',
      title: 'Return a Pointer to JavaScript',
      type: 'write-function',
      difficulty: 'beginner',
      instructions: 'Write `getBuffer` that returns the address of a static 256-byte buffer. JavaScript will use this address to read the data from wasm memory.',
      skeleton: `var buffer: [256]u8 = undefined;

export fn getBuffer() u32 {
    // return address of buffer as u32
}`,
      solution: `var buffer: [256]u8 = undefined;

export fn getBuffer() u32 {
    return @intFromPtr(&buffer);
}`,
      hints: [
        'Use @intFromPtr to convert a pointer to a usize/u32',
        'JavaScript uses this offset to index into WebAssembly.Memory',
        'Static variables have stable addresses throughout execution'
      ]
    },
    {
      id: 'zig-wasm-6',
      title: 'Pass a String from JavaScript',
      type: 'write-function',
      difficulty: 'intermediate',
      instructions: 'Write `processString` that takes a pointer and length from JS (representing a UTF-8 string in wasm memory) and returns the string\'s byte count.',
      skeleton: `export fn processString(ptr: u32, len: u32) u32 {
    // reconstruct []const u8 from ptr and len, return length
}`,
      solution: `export fn processString(ptr: u32, len: u32) u32 {
    const slice = @as([*]const u8, @ptrFromInt(ptr))[0..len];
    return @intCast(slice.len);
}`,
      hints: [
        'Cast ptr to [*]const u8 using @ptrFromInt',
        'Slice it with [0..len] to get a []const u8',
        'JS passes pointer + length since wasm has no string type'
      ]
    },
    {
      id: 'zig-wasm-7',
      title: 'Allocate from a Static Arena',
      type: 'write-function',
      difficulty: 'intermediate',
      instructions: 'Write a simple bump allocator for wasm. Maintain a global `offset` and `alloc` returns the next aligned address, advancing offset by `size`.',
      skeleton: `var heap: [65536]u8 = undefined;
var heap_offset: u32 = 0;

export fn alloc(size: u32) u32 {
    // bump allocate from heap, return start address as u32
    // align to 8 bytes
}`,
      solution: `var heap: [65536]u8 = undefined;
var heap_offset: u32 = 0;

export fn alloc(size: u32) u32 {
    const aligned = (heap_offset + 7) & ~@as(u32, 7);
    const result = @intFromPtr(&heap[aligned]);
    heap_offset = aligned + size;
    return @intCast(result);
}`,
      hints: [
        'Align to 8 bytes: (offset + 7) & ~7',
        'Return @intFromPtr of the slice position',
        'Advance heap_offset by size after allocating'
      ]
    },
    {
      id: 'zig-wasm-8',
      title: 'Build Configuration for Wasm',
      type: 'predict-output',
      difficulty: 'intermediate',
      instructions: 'What does this build.zig snippet produce, and what are the key settings required for a wasm32-freestanding output?',
      skeleton: `const target = b.resolveTargetQuery(.{
    .cpu_arch = .wasm32,
    .os_tag = .freestanding,
});
const exe = b.addExecutable(.{
    .name = "app",
    .root_source_file = b.path("src/main.zig"),
    .target = target,
    .optimize = .ReleaseSmall,
});
exe.entry = .disabled;
exe.rdynamic = true;`,
      solution: `// Produces: app.wasm targeting wasm32-freestanding
// Key settings:
// - cpu_arch: .wasm32 (32-bit WebAssembly)
// - os_tag: .freestanding (no OS, no libc)
// - entry = .disabled: no _start, exports drive execution
// - rdynamic = true: keeps all exported symbols in output
// - ReleaseSmall: minimize .wasm file size
// Load in JS: const { instance } = await WebAssembly.instantiateStreaming(fetch("app.wasm"), imports)`,
      hints: [
        'wasm32-freestanding means no OS and no standard library by default',
        'entry = .disabled removes the _start entry point',
        'rdynamic keeps exports visible in the final binary'
      ]
    },
    {
      id: 'zig-wasm-9',
      title: 'Export Multiple Functions',
      type: 'write-function',
      difficulty: 'intermediate',
      instructions: 'Write a wasm module with exported `init`, `tick`, and `getScore` functions. `init` resets a global score to 0, `tick` increments it, `getScore` returns it.',
      skeleton: `var score: i32 = 0;

export fn init() void {
    // reset score
}

export fn tick() void {
    // increment score
}

export fn getScore() i32 {
    // return score
}`,
      solution: `var score: i32 = 0;

export fn init() void {
    score = 0;
}

export fn tick() void {
    score += 1;
}

export fn getScore() i32 {
    return score;
}`,
      hints: [
        'Global variables in wasm persist across calls within an instance',
        'Each export fn is callable from JavaScript',
        'Wasm state lives in linear memory and globals'
      ]
    },
    {
      id: 'zig-wasm-10',
      title: 'Import Multiple JS Functions',
      type: 'fill-blank',
      difficulty: 'intermediate',
      instructions: 'Fill in the blanks to import three JS functions: `jsConsoleLog(ptr, len)`, `jsGetTime() f64`, and `jsRandom() f64`.',
      skeleton: `___ fn jsConsoleLog(ptr: u32, len: u32) void;
___ fn jsGetTime() f64;
___ fn jsRandom() f64;`,
      solution: `extern fn jsConsoleLog(ptr: u32, len: u32) void;
extern fn jsGetTime() f64;
extern fn jsRandom() f64;`,
      hints: [
        'Each extern fn declares a JS-side function import',
        'The JS import object must have keys matching these names',
        'wasm supports i32, i64, f32, f64 as import/export types'
      ]
    },
    {
      id: 'zig-wasm-11',
      title: 'Write a String to Wasm Memory',
      type: 'write-function',
      difficulty: 'intermediate',
      instructions: 'Write `writeString` that copies a string literal into a static buffer and calls `jsConsoleLog` with the pointer and length.',
      skeleton: `extern fn jsConsoleLog(ptr: u32, len: u32) void;

var msg_buf: [256]u8 = undefined;

export fn logHello() void {
    const msg = "Hello from Zig!";
    // copy msg into msg_buf and call jsConsoleLog
}`,
      solution: `extern fn jsConsoleLog(ptr: u32, len: u32) void;

var msg_buf: [256]u8 = undefined;

export fn logHello() void {
    const msg = "Hello from Zig!";
    @memcpy(msg_buf[0..msg.len], msg);
    jsConsoleLog(@intFromPtr(&msg_buf), @intCast(msg.len));
}`,
      hints: [
        'Use @memcpy to copy bytes into msg_buf',
        '@intFromPtr(&msg_buf) gives the wasm memory address',
        'JS reads the string from wasm memory at that offset'
      ]
    },
    {
      id: 'zig-wasm-12',
      title: 'Wasm Memory Growth',
      type: 'predict-output',
      difficulty: 'intermediate',
      instructions: 'What does the JavaScript below do and what is the relationship between wasm pages and bytes?',
      skeleton: `// JavaScript side
const memory = new WebAssembly.Memory({ initial: 1, maximum: 16 });
// initial: 1 page = 65536 bytes
// maximum: 16 pages = 1048576 bytes (1 MB)

const imports = { env: { memory } };
const { instance } = await WebAssembly.instantiate(wasmBytes, imports);

// Later, grow memory by 2 pages:
memory.grow(2);  // now have 3 pages = 196608 bytes`,
      solution: `// WebAssembly memory is divided into 64KB pages
// initial: 1 page = 65536 (64 * 1024) bytes
// memory.grow(2) adds 2 more pages = 131072 bytes
// Total after grow: 3 pages = 196608 bytes (3 * 65536)
// maximum: 16 caps growth to 1,048,576 bytes
// Zig code sees the same memory via @ptrFromInt
// Growing does NOT move existing data - safe to grow anytime`,
      hints: [
        'Each wasm page is exactly 65536 bytes (64 KiB)',
        'memory.grow() returns the previous page count',
        'Zig code accesses the same linear memory as JS'
      ]
    },
    {
      id: 'zig-wasm-13',
      title: 'Wasm-Safe Math',
      type: 'fix-bug',
      difficulty: 'intermediate',
      instructions: 'Fix this wasm-exported function. Wasm traps on integer overflow; use wrapping arithmetic.',
      skeleton: `export fn safeAdd(a: u32, b: u32) u32 {
    return a + b;  // BUG: traps on overflow in wasm
}`,
      solution: `export fn safeAdd(a: u32, b: u32) u32 {
    return a +% b;
}`,
      hints: [
        'Zig uses +% for wrapping addition',
        'Regular + traps at runtime in debug mode and wraps in release',
        'For wasm-safe code, always use wrapping operators: +%, -%, *%'
      ]
    },
    {
      id: 'zig-wasm-14',
      title: 'Canvas Pixel Buffer',
      type: 'write-function',
      difficulty: 'advanced',
      instructions: 'Write `clearCanvas` that fills a pixel buffer (RGBA, 320x240) with a given color value. The buffer is a global array.',
      skeleton: `const WIDTH: u32 = 320;
const HEIGHT: u32 = 240;
var pixels: [WIDTH * HEIGHT * 4]u8 = undefined;

export fn getPixelsPtr() u32 {
    return @intFromPtr(&pixels);
}

export fn clearCanvas(r: u8, g: u8, b: u8) void {
    // fill pixels with RGBA (r, g, b, 255)
}`,
      solution: `const WIDTH: u32 = 320;
const HEIGHT: u32 = 240;
var pixels: [WIDTH * HEIGHT * 4]u8 = undefined;

export fn getPixelsPtr() u32 {
    return @intFromPtr(&pixels);
}

export fn clearCanvas(r: u8, g: u8, b: u8) void {
    var i: u32 = 0;
    while (i < WIDTH * HEIGHT) : (i += 1) {
        pixels[i * 4 + 0] = r;
        pixels[i * 4 + 1] = g;
        pixels[i * 4 + 2] = b;
        pixels[i * 4 + 3] = 255;
    }
}`,
      hints: [
        'RGBA means 4 bytes per pixel',
        'Total buffer size is WIDTH * HEIGHT * 4',
        'JS reads this with new Uint8ClampedArray(memory.buffer, ptr, size)'
      ]
    },
    {
      id: 'zig-wasm-15',
      title: 'Fibonacci in Wasm',
      type: 'write-function',
      difficulty: 'intermediate',
      instructions: 'Write an exported `fibonacci` function that computes the nth Fibonacci number iteratively and returns it as u64.',
      skeleton: `export fn fibonacci(n: u32) u64 {
    // iterative fibonacci
}`,
      solution: `export fn fibonacci(n: u32) u64 {
    if (n <= 1) return n;
    var a: u64 = 0;
    var b: u64 = 1;
    var i: u32 = 2;
    while (i <= n) : (i += 1) {
        const c = a + b;
        a = b;
        b = c;
    }
    return b;
}`,
      hints: [
        'Iterative is safer than recursive to avoid wasm stack exhaustion',
        'Use u64 to support larger values without overflow',
        'Handle n=0 and n=1 as base cases'
      ]
    },
    {
      id: 'zig-wasm-16',
      title: 'Wasm Table and Function Pointers',
      type: 'predict-output',
      difficulty: 'advanced',
      instructions: 'What does the Zig function pointer do in this wasm context, and how is it called from JavaScript?',
      skeleton: `const Handler = *const fn (i32) callconv(.Unmangled) i32;

var handlers: [4]Handler = undefined;

export fn registerHandler(index: u32, fn_ptr: u32) void {
    handlers[index] = @ptrFromInt(fn_ptr);
}

export fn dispatchHandler(index: u32, arg: i32) i32 {
    return handlers[index](arg);
}`,
      solution: `// handlers[] stores wasm function pointers as typed fn pointers
// registerHandler: JS passes a table index as u32, stored as a pointer
// dispatchHandler: calls the stored function pointer with arg
//
// In JavaScript:
//   const tableIndex = instance.exports.__indirect_function_table.get(fnIdx)
//   instance.exports.registerHandler(0, fnIdx)  // store table index
//   instance.exports.dispatchHandler(0, 42)      // calls the function
//
// callconv(.Unmangled) keeps the symbol name without Zig name mangling`,
      hints: [
        'Wasm function pointers use an indirect function table',
        'callconv(.Unmangled) is needed for correct symbol naming',
        'JS must register functions via the wasm table index'
      ]
    },
    {
      id: 'zig-wasm-17',
      title: 'SIMD in Wasm',
      type: 'fill-blank',
      difficulty: 'advanced',
      instructions: 'Zig supports wasm SIMD via vectors. Fill in the blank to declare a 128-bit SIMD vector of 4 f32 values.',
      skeleton: `const Vec4f = @Vector(___, f32);

export fn addVec4(a: Vec4f, b: Vec4f) Vec4f {
    return a + b;
}`,
      solution: `const Vec4f = @Vector(4, f32);

export fn addVec4(a: Vec4f, b: Vec4f) Vec4f {
    return a + b;
}`,
      hints: [
        '@Vector(N, T) creates an N-element SIMD vector of type T',
        '4 x f32 = 128 bits, matching wasm\'s v128 type',
        'Zig vector operations map to wasm SIMD instructions'
      ]
    },
    {
      id: 'zig-wasm-18',
      title: 'Wasm Error Handling Without Exceptions',
      type: 'write-function',
      difficulty: 'advanced',
      instructions: 'Wasm does not support Zig error unions across the export boundary. Write `safeDivide` that returns 0 on divide-by-zero instead of using error unions.',
      skeleton: `export fn safeDivide(a: i32, b: i32) i32 {
    // return a/b, or 0 if b is zero
}`,
      solution: `export fn safeDivide(a: i32, b: i32) i32 {
    if (b == 0) return 0;
    return @divTrunc(a, b);
}`,
      hints: [
        'Wasm exports can only return numeric types, not error unions',
        'Use @divTrunc for C-style truncating integer division',
        'Return a sentinel value (0, -1) to signal errors to JS'
      ]
    },
    {
      id: 'zig-wasm-19',
      title: 'Wasm Module with Init and Deinit',
      type: 'write-function',
      difficulty: 'advanced',
      instructions: 'Write a wasm module with `init(size: u32) u32` that sets up a global buffer of given size (max 65536) and returns 1 on success, and `deinit()` that zeroes the buffer.',
      skeleton: `var buf: [65536]u8 = undefined;
var buf_len: u32 = 0;

export fn init(size: u32) u32 {
    // set buf_len = min(size, 65536), return 1
}

export fn deinit() void {
    // zero the used portion of buf
}`,
      solution: `var buf: [65536]u8 = undefined;
var buf_len: u32 = 0;

export fn init(size: u32) u32 {
    buf_len = if (size > 65536) 65536 else size;
    return 1;
}

export fn deinit() void {
    @memset(buf[0..buf_len], 0);
}`,
      hints: [
        'Clamp size to 65536 to stay within buffer bounds',
        '@memset fills a slice with a byte value',
        'Return 1 for success, 0 for failure - wasm has no exceptions'
      ]
    },
    {
      id: 'zig-wasm-20',
      title: 'Complete Wasm Image Processing Module',
      type: 'refactor',
      difficulty: 'advanced',
      instructions: 'Refactor this image-grayscale function to avoid the out-of-bounds risk and make it more idiomatic Zig.',
      skeleton: `var image: [640 * 480 * 4]u8 = undefined;

export fn toGrayscale() void {
    var i: u32 = 0;
    while (i < 640 * 480 * 4) {
        const r = image[i];
        const g = image[i + 1];
        const b = image[i + 2];
        const gray: u8 = @intCast(((@as(u32, r) * 299 + @as(u32, g) * 587 + @as(u32, b) * 114) / 1000));
        image[i] = gray;
        image[i + 1] = gray;
        image[i + 2] = gray;
        i += 4;
    }
}`,
      solution: `var image: [640 * 480 * 4]u8 = undefined;

export fn getImagePtr() u32 {
    return @intFromPtr(&image);
}

export fn toGrayscale() void {
    const pixels = image.len / 4;
    for (0..pixels) |i| {
        const base = i * 4;
        const r = image[base + 0];
        const g = image[base + 1];
        const b = image[base + 2];
        const gray: u8 = @intCast((@as(u32, r) * 299 + @as(u32, g) * 587 + @as(u32, b) * 114) / 1000);
        image[base + 0] = gray;
        image[base + 1] = gray;
        image[base + 2] = gray;
        // alpha channel (base+3) unchanged
    }
}`,
      hints: [
        'Use for (0..pixels) |i| for cleaner iteration',
        'Calculate base = i * 4 once per pixel',
        'Add getImagePtr() so JS can find the buffer in wasm memory'
      ]
    },
  ],
};
