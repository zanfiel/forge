import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-ffi',
  title: '49. Foreign Function Interface',
  explanation: `## Foreign Function Interface (FFI)

Rust can call C code and be called from C. This is essential for interacting with system libraries, embedding Rust in other languages, and working with legacy code.

### Calling C from Rust
\`\`\`rust
extern "C" {
    fn abs(input: i32) -> i32;
    fn strlen(s: *const std::ffi::c_char) -> usize;
}

fn main() {
    unsafe {
        println!("abs(-5) = {}", abs(-5));
    }
}
\`\`\`

### Exposing Rust to C
\`\`\`rust
#[no_mangle]
pub extern "C" fn add(a: i32, b: i32) -> i32 {
    a + b
}
\`\`\`

### C-Compatible Types
\`\`\`rust
use std::ffi::{CStr, CString, c_char, c_int, c_void};

// Rust String -> C string
let c_string = CString::new("hello").unwrap();
let ptr: *const c_char = c_string.as_ptr();

// C string -> Rust &str
unsafe {
    let c_str = CStr::from_ptr(ptr);
    let rust_str: &str = c_str.to_str().unwrap();
}
\`\`\`

### Repr C
\`\`\`rust
#[repr(C)]
struct Point {
    x: f64,
    y: f64,
}
\`\`\`

### Opaque Types
\`\`\`rust
#[repr(C)]
pub struct Handle {
    _private: [u8; 0],
}
\`\`\`
`,
  exercises: [
    {
      id: 'rs-ffi-1',
      title: 'Extern C Block',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Declare an external C function.',
      skeleton: `__BLANK__ "C" {
    fn abs(input: i32) -> i32;
}

fn main() {
    let result = unsafe { abs(-42) };
    println!("abs(-42) = {}", result);
}`,
      solution: `extern "C" {
    fn abs(input: i32) -> i32;
}

fn main() {
    let result = unsafe { abs(-42) };
    println!("abs(-42) = {}", result);
}`,
      hints: [
        'External C functions are declared in an extern block.',
        'The ABI is specified as "C".',
        'extern "C" { ... } declares C-compatible function signatures.',
      ],
      concepts: ['extern-c', 'ffi-declaration', 'c-abi'],
    },
    {
      id: 'rs-ffi-2',
      title: 'Unsafe FFI Call',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Call an external C function safely.',
      skeleton: `extern "C" {
    fn abs(input: i32) -> i32;
}

fn safe_abs(x: i32) -> i32 {
    __BLANK__ { abs(x) }
}`,
      solution: `extern "C" {
    fn abs(input: i32) -> i32;
}

fn safe_abs(x: i32) -> i32 {
    unsafe { abs(x) }
}`,
      hints: [
        'FFI calls are unsafe because Rust cannot verify C code.',
        'Wrap the call in an unsafe block.',
        'unsafe { abs(x) } calls the C function.',
      ],
      concepts: ['unsafe-ffi', 'safe-wrapper', 'ffi-call'],
    },
    {
      id: 'rs-ffi-3',
      title: 'No Mangle Export',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Export a Rust function for use from C.',
      skeleton: `#[__BLANK__]
pub extern "C" fn multiply(a: i32, b: i32) -> i32 {
    a * b
}`,
      solution: `#[no_mangle]
pub extern "C" fn multiply(a: i32, b: i32) -> i32 {
    a * b
}`,
      hints: [
        'Rust mangles function names by default for namespacing.',
        'C code needs the exact name to find the function.',
        '#[no_mangle] preserves the original function name.',
      ],
      concepts: ['no-mangle', 'symbol-export', 'c-callable'],
    },
    {
      id: 'rs-ffi-4',
      title: 'Repr C Struct',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Define a C-compatible struct layout.',
      skeleton: `#[__BLANK__]
pub struct Vector2D {
    pub x: f64,
    pub y: f64,
}`,
      solution: `#[repr(C)]
pub struct Vector2D {
    pub x: f64,
    pub y: f64,
}`,
      hints: [
        'Rust does not guarantee struct field order by default.',
        '#[repr(C)] ensures C-compatible memory layout.',
        'This is required for structs passed across the FFI boundary.',
      ],
      concepts: ['repr-c', 'memory-layout', 'abi-compatibility'],
    },
    {
      id: 'rs-ffi-5',
      title: 'CString Creation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a C-compatible string from a Rust string.',
      skeleton: `use std::ffi::CString;

fn to_c_string(s: &str) -> CString {
    __BLANK__::new(s).expect("String contains null byte")
}`,
      solution: `use std::ffi::CString;

fn to_c_string(s: &str) -> CString {
    CString::new(s).expect("String contains null byte")
}`,
      hints: [
        'CString is a null-terminated string for FFI.',
        'CString::new() creates one from a Rust string.',
        'It fails if the string contains an interior null byte.',
      ],
      concepts: ['cstring', 'null-terminated', 'string-conversion'],
    },
    {
      id: 'rs-ffi-6',
      title: 'CStr from Raw Pointer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Convert a C string pointer back to a Rust string.',
      skeleton: `use std::ffi::{CStr, c_char};

unsafe fn ptr_to_string(ptr: *const c_char) -> String {
    let c_str = CStr::__BLANK__(ptr);
    c_str.to_str().unwrap().to_owned()
}`,
      solution: `use std::ffi::{CStr, c_char};

unsafe fn ptr_to_string(ptr: *const c_char) -> String {
    let c_str = CStr::from_ptr(ptr);
    c_str.to_str().unwrap().to_owned()
}`,
      hints: [
        'CStr provides a method to wrap a raw C string pointer.',
        'from_ptr() creates a CStr from a *const c_char.',
        'CStr::from_ptr(ptr) wraps the pointer without copying.',
      ],
      concepts: ['cstr-from-ptr', 'pointer-wrapping', 'string-ffi'],
    },
    {
      id: 'rs-ffi-7',
      title: 'Write a Safe FFI Wrapper',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write a safe Rust wrapper around an unsafe C function.',
      skeleton: `extern "C" {
    fn pow(base: f64, exp: f64) -> f64;
}

// Write a safe function 'power' that wraps the C pow function.
// It should take base and exp as f64 and return f64.
// The wrapper should be safe to call (no unsafe at call site).

fn power(base: f64, exp: f64) -> f64 {
    todo!()
}`,
      solution: `extern "C" {
    fn pow(base: f64, exp: f64) -> f64;
}

fn power(base: f64, exp: f64) -> f64 {
    unsafe { pow(base, exp) }
}`,
      hints: [
        'The wrapper function should not be marked unsafe.',
        'The unsafe block is internal to the function.',
        'unsafe { pow(base, exp) } calls C from within a safe interface.',
      ],
      concepts: ['safe-wrapper', 'unsafe-encapsulation', 'ffi-pattern'],
    },
    {
      id: 'rs-ffi-8',
      title: 'Export a String Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a Rust function that returns a C-compatible string.',
      skeleton: `use std::ffi::{CString, c_char};

// Write a function 'greeting' that:
// 1. Is callable from C (extern "C", no_mangle)
// 2. Takes a *const c_char (name)
// 3. Creates a greeting string "Hello, {name}!"
// 4. Returns a *mut c_char (caller must free with free_string)
// Also write 'free_string' that frees the returned string

#[no_mangle]
pub extern "C" fn greeting(name: *const c_char) -> *mut c_char {
    todo!()
}

#[no_mangle]
pub extern "C" fn free_string(s: *mut c_char) {
    todo!()
}`,
      solution: `use std::ffi::{CStr, CString, c_char};

#[no_mangle]
pub extern "C" fn greeting(name: *const c_char) -> *mut c_char {
    let name_str = unsafe { CStr::from_ptr(name) }.to_str().unwrap();
    let greeting = format!("Hello, {}!", name_str);
    CString::new(greeting).unwrap().into_raw()
}

#[no_mangle]
pub extern "C" fn free_string(s: *mut c_char) {
    if !s.is_null() {
        unsafe { drop(CString::from_raw(s)); }
    }
}`,
      hints: [
        'Use CStr::from_ptr to read the input name.',
        'Use CString::new().unwrap().into_raw() to return a C string.',
        'free_string should use CString::from_raw() to reclaim ownership.',
      ],
      concepts: ['cstring-export', 'memory-ownership', 'ffi-strings'],
    },
    {
      id: 'rs-ffi-9',
      title: 'Callback Function Pointer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a Rust function that accepts a C function pointer callback.',
      skeleton: `// Write a function 'apply_operation' that:
// 1. Is extern "C" and no_mangle
// 2. Takes two i32 values and a function pointer: extern "C" fn(i32, i32) -> i32
// 3. Calls the function pointer with the two values
// 4. Returns the result

#[no_mangle]
pub extern "C" fn apply_operation(
    a: i32,
    b: i32,
    op: extern "C" fn(i32, i32) -> i32,
) -> i32 {
    todo!()
}`,
      solution: `#[no_mangle]
pub extern "C" fn apply_operation(
    a: i32,
    b: i32,
    op: extern "C" fn(i32, i32) -> i32,
) -> i32 {
    op(a, b)
}`,
      hints: [
        'C function pointers are called just like Rust functions.',
        'The callback has a defined signature that matches C ABI.',
        'Simply call op(a, b) to invoke the callback.',
      ],
      concepts: ['function-pointers', 'callbacks', 'ffi-callbacks'],
    },
    {
      id: 'rs-ffi-10',
      title: 'Opaque Pointer Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement the opaque pointer pattern for FFI.',
      skeleton: `use std::ffi::c_char;

pub struct Database {
    name: String,
    connected: bool,
}

// Write FFI functions:
// 1. db_create(name: *const c_char) -> *mut Database
//    Creates a new Database, returns opaque pointer
// 2. db_is_connected(db: *const Database) -> bool
//    Returns the connected status
// 3. db_destroy(db: *mut Database)
//    Frees the Database

`,
      solution: `use std::ffi::{CStr, c_char};

pub struct Database {
    name: String,
    connected: bool,
}

#[no_mangle]
pub extern "C" fn db_create(name: *const c_char) -> *mut Database {
    let name_str = unsafe { CStr::from_ptr(name) }.to_str().unwrap().to_owned();
    let db = Box::new(Database { name: name_str, connected: true });
    Box::into_raw(db)
}

#[no_mangle]
pub extern "C" fn db_is_connected(db: *const Database) -> bool {
    if db.is_null() { return false; }
    unsafe { (*db).connected }
}

#[no_mangle]
pub extern "C" fn db_destroy(db: *mut Database) {
    if !db.is_null() {
        unsafe { drop(Box::from_raw(db)); }
    }
}`,
      hints: [
        'Box::into_raw() converts a Box to a raw pointer.',
        'Box::from_raw() converts a raw pointer back to a Box for cleanup.',
        'Always check for null before dereferencing.',
      ],
      concepts: ['opaque-pointer', 'box-into-raw', 'ffi-lifecycle'],
    },
    {
      id: 'rs-ffi-11',
      title: 'Slice to C Array',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a function that processes a C array as a Rust slice.',
      skeleton: `// Write a function 'sum_array' that:
// 1. Is extern "C" and no_mangle
// 2. Takes a *const i32 pointer and a length (usize)
// 3. Creates a Rust slice from the pointer
// 4. Returns the sum of all elements

#[no_mangle]
pub extern "C" fn sum_array(data: *const i32, len: usize) -> i64 {
    todo!()
}`,
      solution: `#[no_mangle]
pub extern "C" fn sum_array(data: *const i32, len: usize) -> i64 {
    if data.is_null() || len == 0 {
        return 0;
    }
    let slice = unsafe { std::slice::from_raw_parts(data, len) };
    slice.iter().map(|&x| x as i64).sum()
}`,
      hints: [
        'std::slice::from_raw_parts creates a slice from a pointer and length.',
        'Always null-check the pointer first.',
        'Use .iter().map().sum() to compute the sum.',
      ],
      concepts: ['slice-from-raw', 'c-arrays', 'pointer-to-slice'],
    },
    {
      id: 'rs-ffi-12',
      title: 'Error Code Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Implement C-style error codes for FFI error handling.',
      skeleton: `use std::ffi::{CStr, c_char};

#[repr(C)]
pub enum ErrorCode {
    Success = 0,
    NullPointer = 1,
    InvalidUtf8 = 2,
    ParseError = 3,
}

// Write a function 'parse_number' that:
// 1. Is extern "C" and no_mangle
// 2. Takes a *const c_char and a *mut i32 (output parameter)
// 3. Returns an ErrorCode
// 4. Writes the parsed number to the output parameter on success

#[no_mangle]
pub extern "C" fn parse_number(input: *const c_char, result: *mut i32) -> ErrorCode {
    todo!()
}`,
      solution: `use std::ffi::{CStr, c_char};

#[repr(C)]
pub enum ErrorCode {
    Success = 0,
    NullPointer = 1,
    InvalidUtf8 = 2,
    ParseError = 3,
}

#[no_mangle]
pub extern "C" fn parse_number(input: *const c_char, result: *mut i32) -> ErrorCode {
    if input.is_null() || result.is_null() {
        return ErrorCode::NullPointer;
    }

    let c_str = unsafe { CStr::from_ptr(input) };
    let s = match c_str.to_str() {
        Ok(s) => s,
        Err(_) => return ErrorCode::InvalidUtf8,
    };

    match s.parse::<i32>() {
        Ok(n) => {
            unsafe { *result = n; }
            ErrorCode::Success
        }
        Err(_) => ErrorCode::ParseError,
    }
}`,
      hints: [
        'C APIs return error codes and write results via output pointers.',
        'Check all pointers for null first.',
        'Use unsafe { *result = n; } to write through the output pointer.',
      ],
      concepts: ['error-codes', 'output-parameters', 'c-error-pattern'],
    },
    {
      id: 'rs-ffi-13',
      title: 'Bug: Missing Null Terminator',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix a string conversion that does not ensure null termination.',
      skeleton: `use std::ffi::c_char;

// BUG: as_ptr() on a Rust string does NOT give a null-terminated string
fn get_c_string(s: &str) -> *const c_char {
    s.as_ptr() as *const c_char
}`,
      solution: `use std::ffi::{CString, c_char};

fn get_c_string(s: &str) -> CString {
    CString::new(s).expect("String contains null byte")
}`,
      hints: [
        'Rust strings are NOT null-terminated like C strings.',
        'You must use CString to create a proper C string.',
        'CString::new(s) appends the null terminator.',
      ],
      concepts: ['null-termination', 'cstring-safety', 'string-ffi'],
    },
    {
      id: 'rs-ffi-14',
      title: 'Bug: Use After Free',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix a use-after-free bug in FFI code.',
      skeleton: `use std::ffi::{CString, c_char};

// BUG: CString is dropped at end of function, pointer dangles
fn bad_c_string() -> *const c_char {
    let s = CString::new("hello").unwrap();
    s.as_ptr()
    // s is dropped here, pointer is invalid!
}`,
      solution: `use std::ffi::{CString, c_char};

fn bad_c_string() -> *mut c_char {
    let s = CString::new("hello").unwrap();
    s.into_raw()
    // Caller must eventually call CString::from_raw() to free
}`,
      hints: [
        'as_ptr() borrows the CString; when it is dropped, the pointer is invalid.',
        'Use into_raw() to transfer ownership of the memory.',
        'The caller becomes responsible for freeing with CString::from_raw().',
      ],
      concepts: ['use-after-free', 'ownership-transfer', 'into-raw'],
    },
    {
      id: 'rs-ffi-15',
      title: 'Bug: Wrong Repr',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix a struct that has wrong memory layout for FFI.',
      skeleton: `// BUG: Missing repr(C), Rust may reorder fields
pub struct FFIRect {
    pub x: f32,
    pub y: f32,
    pub width: f32,
    pub height: f32,
}

#[no_mangle]
pub extern "C" fn rect_area(rect: *const FFIRect) -> f32 {
    unsafe { (*rect).width * (*rect).height }
}`,
      solution: `#[repr(C)]
pub struct FFIRect {
    pub x: f32,
    pub y: f32,
    pub width: f32,
    pub height: f32,
}

#[no_mangle]
pub extern "C" fn rect_area(rect: *const FFIRect) -> f32 {
    unsafe { (*rect).width * (*rect).height }
}`,
      hints: [
        'Without #[repr(C)], Rust may reorder struct fields.',
        'C code expects fields in declaration order.',
        'Add #[repr(C)] to guarantee C-compatible layout.',
      ],
      concepts: ['repr-c', 'struct-layout', 'abi-mismatch'],
    },
    {
      id: 'rs-ffi-16',
      title: 'Predict: C ABI Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the output of calling a C math function.',
      skeleton: `extern "C" {
    fn abs(input: i32) -> i32;
}

fn main() {
    let result = unsafe { abs(-17) };
    println!("{}", result);
}`,
      solution: `17`,
      hints: [
        'abs() returns the absolute value of an integer.',
        'abs(-17) returns 17.',
        'The output is 17.',
      ],
      concepts: ['c-stdlib', 'abs-function', 'ffi-result'],
    },
    {
      id: 'rs-ffi-17',
      title: 'Predict: CString Length',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the byte length of a CString.',
      skeleton: `use std::ffi::CString;

fn main() {
    let s = CString::new("hello").unwrap();
    println!("{}", s.as_bytes().len());
    println!("{}", s.as_bytes_with_nul().len());
}`,
      solution: `5
6`,
      hints: [
        'as_bytes() returns the bytes without the null terminator.',
        'as_bytes_with_nul() includes the null terminator.',
        '"hello" is 5 bytes, plus null terminator is 6.',
      ],
      concepts: ['cstring-bytes', 'null-terminator', 'string-length'],
    },
    {
      id: 'rs-ffi-18',
      title: 'Predict: Repr C Size',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the size of a repr(C) struct.',
      skeleton: `#[repr(C)]
struct Pair {
    a: u8,
    b: u32,
}

fn main() {
    println!("{}", std::mem::size_of::<Pair>());
}`,
      solution: `8`,
      hints: [
        'repr(C) follows C alignment rules.',
        'u8 takes 1 byte, but u32 requires 4-byte alignment.',
        '1 byte + 3 padding + 4 bytes = 8 bytes total.',
      ],
      concepts: ['struct-alignment', 'padding', 'repr-c-size'],
    },
    {
      id: 'rs-ffi-19',
      title: 'Refactor: Raw Pointers to Safe API',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Refactor raw pointer FFI usage into a safe Rust wrapper.',
      skeleton: `extern "C" {
    fn strlen(s: *const std::ffi::c_char) -> usize;
}

fn get_length(s: &str) -> usize {
    let c_string = std::ffi::CString::new(s).unwrap();
    unsafe { strlen(c_string.as_ptr()) }
}`,
      solution: `fn get_length(s: &str) -> usize {
    s.len()
}`,
      hints: [
        'There is no need to call C strlen for Rust strings.',
        'Rust strings already know their length.',
        'Simply use s.len() instead of FFI.',
      ],
      concepts: ['unnecessary-ffi', 'rust-native', 'simplification'],
    },
    {
      id: 'rs-ffi-20',
      title: 'Refactor: Unsafe Block Minimization',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Minimize the scope of unsafe blocks in FFI code.',
      skeleton: `use std::ffi::{CStr, c_char};

extern "C" {
    fn get_name() -> *const c_char;
    fn get_age() -> i32;
}

fn user_info() -> String {
    unsafe {
        let name_ptr = get_name();
        let name = CStr::from_ptr(name_ptr).to_str().unwrap();
        let age = get_age();
        let formatted = format!("{} is {} years old", name, age);
        let upper = formatted.to_uppercase();
        upper
    }
}`,
      solution: `use std::ffi::{CStr, c_char};

extern "C" {
    fn get_name() -> *const c_char;
    fn get_age() -> i32;
}

fn user_info() -> String {
    let name = unsafe {
        let name_ptr = get_name();
        CStr::from_ptr(name_ptr).to_str().unwrap().to_owned()
    };
    let age = unsafe { get_age() };

    let formatted = format!("{} is {} years old", name, age);
    formatted.to_uppercase()
}`,
      hints: [
        'Only the FFI calls and raw pointer operations need to be unsafe.',
        'String formatting and case conversion are safe operations.',
        'Create separate, minimal unsafe blocks for each FFI call.',
      ],
      concepts: ['unsafe-minimization', 'safety-boundaries', 'ffi-best-practices'],
    },
  ],
};
