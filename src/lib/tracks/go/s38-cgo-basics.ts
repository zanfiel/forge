import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-cgo',
  title: '38. CGO Basics',
  explanation: `## CGO - Calling C from Go

CGO enables Go programs to call C code. It bridges Go and C through special comments and the \`import "C"\` pseudo-package.

\`\`\`go
// #include <stdio.h>
// #include <stdlib.h>
//
// void hello() {
//     printf("Hello from C!\\n");
// }
import "C"

func main() {
    C.hello()
}

// Passing strings between Go and C
cs := C.CString("hello")   // Go string -> C string (malloc'd)
defer C.free(unsafe.Pointer(cs))  // Must free!
goStr := C.GoString(cs)    // C string -> Go string

// Numeric types
var n C.int = 42
goN := int(n)

// Calling C standard library
C.puts(C.CString("hello"))
\`\`\`

Key rules:
- No blank line between C comment and \`import "C"\`
- C strings must be manually freed
- CGO has overhead per call (~100ns)
- Build requires C compiler (gcc/clang)
- Use \`CGO_ENABLED=0\` to disable CGO`,
  exercises: [
    {
      id: 'go-cgo-1',
      title: 'Import C Pseudo-Package',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Import the C pseudo-package with a C function declaration.',
      skeleton: `package main

// #include <stdio.h>
__BLANK__

import "fmt"

func main() {
    fmt.Println("CGO is available")
}`,
      solution: `package main

// #include <stdio.h>
import "C"

import "fmt"

func main() {
    fmt.Println("CGO is available")
}`,
      hints: [
        'import "C" is the CGO pseudo-package.',
        'The C comment must be directly above import "C".',
        'No blank line between the comment and import.',
      ],
      concepts: ['cgo', 'import "C"'],
    },
    {
      id: 'go-cgo-2',
      title: 'Call C Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Call a C function defined in a comment block.',
      skeleton: `package main

/*
#include <math.h>
*/
import "C"

import "fmt"

func main() {
    result := C.__BLANK__(2.0)
    fmt.Printf("sqrt(2) = %f\\n", float64(result))
}`,
      solution: `package main

/*
#include <math.h>
*/
import "C"

import "fmt"

func main() {
    result := C.sqrt(2.0)
    fmt.Printf("sqrt(2) = %f\\n", float64(result))
}`,
      hints: [
        'C functions are accessed via the C. prefix.',
        'C.sqrt calls the C standard library sqrt.',
        'Convert C.double to float64 for Go use.',
      ],
      concepts: ['cgo', 'C function call'],
    },
    {
      id: 'go-cgo-3',
      title: 'C String Conversion',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Convert between Go strings and C strings.',
      skeleton: `package main

/*
#include <stdlib.h>
#include <string.h>
*/
import "C"

import (
    "fmt"
    "unsafe"
)

func main() {
    goStr := "Hello CGO"
    cStr := C.__BLANK__(goStr)
    defer C.free(unsafe.Pointer(cStr))

    length := C.strlen(cStr)
    fmt.Printf("C string length: %d\\n", int(length))
}`,
      solution: `package main

/*
#include <stdlib.h>
#include <string.h>
*/
import "C"

import (
    "fmt"
    "unsafe"
)

func main() {
    goStr := "Hello CGO"
    cStr := C.CString(goStr)
    defer C.free(unsafe.Pointer(cStr))

    length := C.strlen(cStr)
    fmt.Printf("C string length: %d\\n", int(length))
}`,
      hints: [
        'C.CString converts a Go string to a C char*.',
        'C strings must be freed with C.free.',
        'Always use defer to ensure cleanup.',
      ],
      concepts: ['cgo', 'CString', 'memory management'],
    },
    {
      id: 'go-cgo-4',
      title: 'Define C Function Inline',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Define a C function inline in the Go comment block.',
      skeleton: `package main

/*
int __BLANK__(int a, int b) {
    return a + b;
}
*/
import "C"

import "fmt"

func main() {
    result := C.add(3, 4)
    fmt.Println("3 + 4 =", int(result))
}`,
      solution: `package main

/*
int add(int a, int b) {
    return a + b;
}
*/
import "C"

import "fmt"

func main() {
    result := C.add(3, 4)
    fmt.Println("3 + 4 =", int(result))
}`,
      hints: [
        'C functions can be defined inline in the comment block.',
        'The function name must match what you call via C.name.',
        'Use standard C syntax for the function definition.',
      ],
      concepts: ['cgo', 'inline C function'],
    },
    {
      id: 'go-cgo-5',
      title: 'C Numeric Types',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Work with C numeric types in Go.',
      skeleton: `package main

/*
#include <limits.h>
*/
import "C"

import "fmt"

func main() {
    var ci C.int = 42
    var cl C.long = 1000000
    var cd C.double = 3.14

    // Convert to Go types
    gi := __BLANK__(ci)
    gl := int64(cl)
    gd := float64(cd)

    fmt.Println(gi, gl, gd)
}`,
      solution: `package main

/*
#include <limits.h>
*/
import "C"

import "fmt"

func main() {
    var ci C.int = 42
    var cl C.long = 1000000
    var cd C.double = 3.14

    gi := int(ci)
    gl := int64(cl)
    gd := float64(cd)

    fmt.Println(gi, gl, gd)
}`,
      hints: [
        'C.int converts to Go int.',
        'C.long converts to Go int64.',
        'C.double converts to Go float64.',
      ],
      concepts: ['cgo', 'type conversion', 'C types'],
    },
    {
      id: 'go-cgo-6',
      title: 'GoString Conversion',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Convert a C string back to a Go string.',
      skeleton: `package main

/*
#include <stdlib.h>

const char* greeting() {
    return "Hello from C";
}
*/
import "C"

import "fmt"

func main() {
    cStr := C.greeting()
    goStr := C.__BLANK__(cStr)
    fmt.Println(goStr)
}`,
      solution: `package main

/*
#include <stdlib.h>

const char* greeting() {
    return "Hello from C";
}
*/
import "C"

import "fmt"

func main() {
    cStr := C.greeting()
    goStr := C.GoString(cStr)
    fmt.Println(goStr)
}`,
      hints: [
        'C.GoString converts a C char* to a Go string.',
        'No need to free the C string if it is a literal.',
        'GoString copies the data into Go-managed memory.',
      ],
      concepts: ['cgo', 'GoString', 'string conversion'],
    },
    {
      id: 'go-cgo-7',
      title: 'Predict CGO Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the output of a CGO program.',
      skeleton: `package main

/*
int square(int x) {
    return x * x;
}

int cube(int x) {
    return x * x * x;
}
*/
import "C"

import "fmt"

func main() {
    fmt.Println(int(C.square(5)))
    fmt.Println(int(C.cube(3)))
}`,
      solution: `25
27`,
      hints: [
        'square(5) = 5 * 5 = 25.',
        'cube(3) = 3 * 3 * 3 = 27.',
        'C.int results are converted to Go int.',
      ],
      concepts: ['cgo', 'C functions'],
    },
    {
      id: 'go-cgo-8',
      title: 'Predict String Length',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the behavior of C vs Go string length.',
      skeleton: `package main

/*
#include <string.h>
#include <stdlib.h>
*/
import "C"

import (
    "fmt"
    "unsafe"
)

func main() {
    goStr := "Hello"
    cStr := C.CString(goStr)
    defer C.free(unsafe.Pointer(cStr))

    fmt.Println(len(goStr))
    fmt.Println(int(C.strlen(cStr)))
}`,
      solution: `5
5`,
      hints: [
        'len("Hello") in Go is 5.',
        'strlen counts bytes until null terminator.',
        'Both return 5 for ASCII strings.',
      ],
      concepts: ['cgo', 'string length', 'strlen'],
    },
    {
      id: 'go-cgo-9',
      title: 'Predict Type Size',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict C type sizes via sizeof.',
      skeleton: `package main

/*
#include <stddef.h>
*/
import "C"

import (
    "fmt"
    "unsafe"
)

func main() {
    fmt.Println(unsafe.Sizeof(C.char(0)))
    fmt.Println(unsafe.Sizeof(C.int(0)))
    fmt.Println(unsafe.Sizeof(C.double(0)))
}`,
      solution: `1
4
8`,
      hints: [
        'C char is always 1 byte.',
        'C int is typically 4 bytes.',
        'C double is 8 bytes (64-bit IEEE 754).',
      ],
      concepts: ['cgo', 'sizeof', 'C type sizes'],
    },
    {
      id: 'go-cgo-10',
      title: 'Wrap C Library Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a Go wrapper around a C library function.',
      skeleton: `package main

/*
#include <stdlib.h>
#include <string.h>

char* repeat_str(const char* s, int n) {
    int len = strlen(s);
    char* result = (char*)malloc(len * n + 1);
    result[0] = '\\0';
    for (int i = 0; i < n; i++) {
        strcat(result, s);
    }
    return result;
}
*/
import "C"

import (
    "fmt"
    "unsafe"
)

// repeatString wraps the C repeat_str function.
// It handles C string conversion and memory cleanup.
func repeatString(s string, n int) string {
    // TODO: implement
}

func main() {
    fmt.Println(repeatString("Go", 3))
    fmt.Println(repeatString("ab", 4))
}`,
      solution: `package main

/*
#include <stdlib.h>
#include <string.h>

char* repeat_str(const char* s, int n) {
    int len = strlen(s);
    char* result = (char*)malloc(len * n + 1);
    result[0] = '\0';
    for (int i = 0; i < n; i++) {
        strcat(result, s);
    }
    return result;
}
*/
import "C"

import (
    "fmt"
    "unsafe"
)

func repeatString(s string, n int) string {
    cs := C.CString(s)
    defer C.free(unsafe.Pointer(cs))

    result := C.repeat_str(cs, C.int(n))
    defer C.free(unsafe.Pointer(result))

    return C.GoString(result)
}

func main() {
    fmt.Println(repeatString("Go", 3))
    fmt.Println(repeatString("ab", 4))
}`,
      hints: [
        'Convert Go string to C string with C.CString.',
        'Free both the input C string and the result.',
        'Convert the C result back with C.GoString.',
      ],
      concepts: ['cgo', 'wrapper function', 'memory management'],
    },
    {
      id: 'go-cgo-11',
      title: 'C Struct Access',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Access C struct fields from Go.',
      skeleton: `package main

/*
typedef struct {
    int x;
    int y;
} Point;

Point make_point(int x, int y) {
    Point p;
    p.x = x;
    p.y = y;
    return p;
}

double distance(Point a, Point b) {
    int dx = a.x - b.x;
    int dy = a.y - b.y;
    return sqrt((double)(dx*dx + dy*dy));
}
#include <math.h>
*/
import "C"

import "fmt"

// distance calculates distance between two points using C functions.
func distance(x1, y1, x2, y2 int) float64 {
    // TODO: implement using C.make_point and C.distance
}

func main() {
    fmt.Printf("%.2f\\n", distance(0, 0, 3, 4))
}`,
      solution: `package main

/*
#include <math.h>

typedef struct {
    int x;
    int y;
} Point;

Point make_point(int x, int y) {
    Point p;
    p.x = x;
    p.y = y;
    return p;
}

double distance(Point a, Point b) {
    int dx = a.x - b.x;
    int dy = a.y - b.y;
    return sqrt((double)(dx*dx + dy*dy));
}
*/
import "C"

import "fmt"

func distance(x1, y1, x2, y2 int) float64 {
    a := C.make_point(C.int(x1), C.int(y1))
    b := C.make_point(C.int(x2), C.int(y2))
    return float64(C.distance(a, b))
}

func main() {
    fmt.Printf("%.2f\\n", distance(0, 0, 3, 4))
}`,
      hints: [
        'Use C.make_point to create C Point structs.',
        'Convert Go ints to C.int.',
        'Convert the C.double result to float64.',
      ],
      concepts: ['cgo', 'C struct', 'type conversion'],
    },
    {
      id: 'go-cgo-12',
      title: 'Export Go Function to C',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Export a Go function callable from C using //export.',
      skeleton: `package main

/*
extern int goAdd(int a, int b);

int callGoFromC(int x, int y) {
    return goAdd(x, y) * 2;
}
*/
import "C"

import "fmt"

// Export this function to C
// TODO: add the export directive and implement

func main() {
    result := C.callGoFromC(3, 4)
    fmt.Println(int(result))
}`,
      solution: `package main

/*
extern int goAdd(int a, int b);

int callGoFromC(int x, int y) {
    return goAdd(x, y) * 2;
}
*/
import "C"

import "fmt"

//export goAdd
func goAdd(a, b C.int) C.int {
    return a + b
}

func main() {
    result := C.callGoFromC(3, 4)
    fmt.Println(int(result))
}`,
      hints: [
        '//export funcName makes a Go function callable from C.',
        'The function must use C types (C.int, etc.).',
        'The extern declaration in C matches the Go function.',
      ],
      concepts: ['cgo', '//export', 'callback'],
    },
    {
      id: 'go-cgo-13',
      title: 'Fix Memory Leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix a CGO memory leak from not freeing C strings.',
      skeleton: `package main

/*
#include <stdlib.h>
#include <string.h>
*/
import "C"

import "fmt"

func cStringLength(s string) int {
    // BUG: CString allocates memory that is never freed
    cs := C.CString(s)
    return int(C.strlen(cs))
}

func main() {
    words := []string{"hello", "world", "from", "cgo"}
    for _, w := range words {
        fmt.Printf("%s: %d\\n", w, cStringLength(w))
    }
}`,
      solution: `package main

/*
#include <stdlib.h>
#include <string.h>
*/
import "C"

import (
    "fmt"
    "unsafe"
)

func cStringLength(s string) int {
    cs := C.CString(s)
    defer C.free(unsafe.Pointer(cs))
    return int(C.strlen(cs))
}

func main() {
    words := []string{"hello", "world", "from", "cgo"}
    for _, w := range words {
        fmt.Printf("%s: %d\\n", w, cStringLength(w))
    }
}`,
      hints: [
        'C.CString allocates memory with malloc.',
        'Must free with C.free(unsafe.Pointer(cs)).',
        'Use defer to ensure cleanup.',
      ],
      concepts: ['cgo', 'memory leak', 'C.free'],
    },
    {
      id: 'go-cgo-14',
      title: 'Fix Missing Import C',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix a CGO program with a blank line before import "C".',
      skeleton: `package main

// #include <stdio.h>

import "C"

// BUG: Blank line between comment and import "C"
// causes C.puts to be undefined

import "fmt"

func main() {
    fmt.Println("CGO test")
}`,
      solution: `package main

// #include <stdio.h>
import "C"

import "fmt"

func main() {
    fmt.Println("CGO test")
}`,
      hints: [
        'No blank line allowed between C comment and import "C".',
        'The blank line breaks the association.',
        'Remove the blank line between the comment and import.',
      ],
      concepts: ['cgo', 'import "C"', 'syntax rules'],
    },
    {
      id: 'go-cgo-15',
      title: 'Fix Unsafe Pointer Cast',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Fix an incorrect unsafe.Pointer conversion in CGO.',
      skeleton: `package main

/*
#include <stdlib.h>

void fill_array(int* arr, int n) {
    for (int i = 0; i < n; i++) {
        arr[i] = i * i;
    }
}
*/
import "C"

import (
    "fmt"
    "unsafe"
)

func main() {
    n := 5
    // BUG: Can't directly pass Go slice to C
    arr := make([]C.int, n)
    C.fill_array((*C.int)(unsafe.Pointer(&arr)), C.int(n))
    for i := 0; i < n; i++ {
        fmt.Println(int(arr[i]))
    }
}`,
      solution: `package main

/*
#include <stdlib.h>

void fill_array(int* arr, int n) {
    for (int i = 0; i < n; i++) {
        arr[i] = i * i;
    }
}
*/
import "C"

import (
    "fmt"
    "unsafe"
)

func main() {
    n := 5
    arr := make([]C.int, n)
    C.fill_array((*C.int)(unsafe.Pointer(&arr[0])), C.int(n))
    for i := 0; i < n; i++ {
        fmt.Println(int(arr[i]))
    }
}`,
      hints: [
        'Pass &arr[0] not &arr to get the underlying array pointer.',
        '&arr points to the slice header, not the data.',
        '&arr[0] points to the first element of the backing array.',
      ],
      concepts: ['cgo', 'unsafe.Pointer', 'slice memory layout'],
    },
    {
      id: 'go-cgo-16',
      title: 'C Array to Go Slice',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Convert a C array to a Go slice safely.',
      skeleton: `package main

/*
#include <stdlib.h>

int* make_fibonacci(int n) {
    int* fib = (int*)malloc(n * sizeof(int));
    fib[0] = 0;
    if (n > 1) fib[1] = 1;
    for (int i = 2; i < n; i++) {
        fib[i] = fib[i-1] + fib[i-2];
    }
    return fib;
}
*/
import "C"

import (
    "fmt"
    "unsafe"
)

// fibonacci returns the first n Fibonacci numbers.
// Must properly handle C memory allocation and conversion.
func fibonacci(n int) []int {
    // TODO: implement
}

func main() {
    fmt.Println(fibonacci(10))
}`,
      solution: `package main

/*
#include <stdlib.h>

int* make_fibonacci(int n) {
    int* fib = (int*)malloc(n * sizeof(int));
    fib[0] = 0;
    if (n > 1) fib[1] = 1;
    for (int i = 2; i < n; i++) {
        fib[i] = fib[i-1] + fib[i-2];
    }
    return fib;
}
*/
import "C"

import (
    "fmt"
    "unsafe"
)

func fibonacci(n int) []int {
    cArr := C.make_fibonacci(C.int(n))
    defer C.free(unsafe.Pointer(cArr))

    result := make([]int, n)
    cSlice := unsafe.Slice(cArr, n)
    for i := 0; i < n; i++ {
        result[i] = int(cSlice[i])
    }
    return result
}

func main() {
    fmt.Println(fibonacci(10))
}`,
      hints: [
        'Use unsafe.Slice to create a Go slice from C pointer.',
        'Copy data into a Go slice before freeing C memory.',
        'Free the C array after copying.',
      ],
      concepts: ['cgo', 'unsafe.Slice', 'C array conversion'],
    },
    {
      id: 'go-cgo-17',
      title: 'CGO Performance Wrapper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write an efficient CGO wrapper that minimizes cross-boundary calls.',
      skeleton: `package main

/*
#include <string.h>
#include <ctype.h>
#include <stdlib.h>

// Process a batch of strings in C - more efficient than per-string calls
int count_uppercase(const char* s) {
    int count = 0;
    while (*s) {
        if (isupper(*s)) count++;
        s++;
    }
    return count;
}
*/
import "C"

import (
    "fmt"
    "unsafe"
)

// countUppercase counts uppercase letters in each string.
// Batches the work to minimize CGO overhead.
func countUppercase(strings []string) []int {
    // TODO: implement
}

func main() {
    strs := []string{"Hello World", "GO LANG", "cgo test"}
    fmt.Println(countUppercase(strs))
}`,
      solution: `package main

/*
#include <string.h>
#include <ctype.h>
#include <stdlib.h>

int count_uppercase(const char* s) {
    int count = 0;
    while (*s) {
        if (isupper(*s)) count++;
        s++;
    }
    return count;
}
*/
import "C"

import (
    "fmt"
    "unsafe"
)

func countUppercase(strings []string) []int {
    results := make([]int, len(strings))
    for i, s := range strings {
        cs := C.CString(s)
        results[i] = int(C.count_uppercase(cs))
        C.free(unsafe.Pointer(cs))
    }
    return results
}

func main() {
    strs := []string{"Hello World", "GO LANG", "cgo test"}
    fmt.Println(countUppercase(strs))
}`,
      hints: [
        'Convert each Go string to C, call C function, free.',
        'For batching, process all strings in a loop.',
        'Free each C string immediately after use.',
      ],
      concepts: ['cgo', 'performance', 'batching'],
    },
    {
      id: 'go-cgo-18',
      title: 'Callback from C to Go',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Implement a Go callback that C code can invoke.',
      skeleton: `package main

/*
#include <stdlib.h>

typedef int (*comparator)(int, int);

void sort_ints(int* arr, int n, comparator cmp) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (cmp(arr[j], arr[j+1]) > 0) {
                int tmp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = tmp;
            }
        }
    }
}

extern int goCompare(int a, int b);
*/
import "C"

import (
    "fmt"
    "unsafe"
)

//export goCompare
func goCompare(a, b C.int) C.int {
    // TODO: implement comparison (return negative, 0, or positive)
}

func sortInts(nums []int) []int {
    // TODO: implement using C.sort_ints
}

func main() {
    fmt.Println(sortInts([]int{5, 3, 8, 1, 9}))
}`,
      solution: `package main

/*
#include <stdlib.h>

typedef int (*comparator)(int, int);

void sort_ints(int* arr, int n, comparator cmp) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (cmp(arr[j], arr[j+1]) > 0) {
                int tmp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = tmp;
            }
        }
    }
}

extern int goCompare(int a, int b);
*/
import "C"

import (
    "fmt"
    "unsafe"
)

//export goCompare
func goCompare(a, b C.int) C.int {
    if a < b {
        return -1
    }
    if a > b {
        return 1
    }
    return 0
}

func sortInts(nums []int) []int {
    cArr := make([]C.int, len(nums))
    for i, n := range nums {
        cArr[i] = C.int(n)
    }
    C.sort_ints((*C.int)(unsafe.Pointer(&cArr[0])), C.int(len(cArr)), C.comparator(C.goCompare))
    result := make([]int, len(nums))
    for i, c := range cArr {
        result[i] = int(c)
    }
    return result
}

func main() {
    fmt.Println(sortInts([]int{5, 3, 8, 1, 9}))
}`,
      hints: [
        '//export makes goCompare callable from C.',
        'Use C function pointer type for the callback.',
        'Convert between Go and C int slices.',
      ],
      concepts: ['cgo', 'callback', '//export', 'function pointer'],
    },
    {
      id: 'go-cgo-19',
      title: 'Refactor Pure Go Alternative',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor a CGO dependency to pure Go.',
      skeleton: `package main

/*
#include <math.h>
*/
import "C"

import "fmt"

func hypotenuse(a, b float64) float64 {
    aSquared := C.pow(C.double(a), 2.0)
    bSquared := C.pow(C.double(b), 2.0)
    return float64(C.sqrt(aSquared + bSquared))
}

func main() {
    fmt.Printf("%.2f\\n", hypotenuse(3, 4))
}`,
      solution: `package main

import (
    "fmt"
    "math"
)

func hypotenuse(a, b float64) float64 {
    return math.Sqrt(a*a + b*b)
}

func main() {
    fmt.Printf("%.2f\\n", hypotenuse(3, 4))
}`,
      hints: [
        'Go math package has Sqrt, Pow, etc.',
        'math.Sqrt replaces C.sqrt.',
        'a*a is simpler than math.Pow(a, 2).',
      ],
      concepts: ['cgo', 'refactoring', 'pure Go', 'math package'],
    },
    {
      id: 'go-cgo-20',
      title: 'Refactor to CGO-Free Build',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor CGO string operations to use Go standard library.',
      skeleton: `package main

/*
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

char* to_upper_c(const char* s) {
    int len = strlen(s);
    char* result = (char*)malloc(len + 1);
    for (int i = 0; i <= len; i++) {
        result[i] = toupper(s[i]);
    }
    return result;
}

int count_char_c(const char* s, char c) {
    int count = 0;
    while (*s) {
        if (*s == c) count++;
        s++;
    }
    return count;
}
*/
import "C"

import (
    "fmt"
    "unsafe"
)

func toUpper(s string) string {
    cs := C.CString(s)
    defer C.free(unsafe.Pointer(cs))
    result := C.to_upper_c(cs)
    defer C.free(unsafe.Pointer(result))
    return C.GoString(result)
}

func countChar(s string, c byte) int {
    cs := C.CString(s)
    defer C.free(unsafe.Pointer(cs))
    return int(C.count_char_c(cs, C.char(c)))
}

func main() {
    fmt.Println(toUpper("hello"))
    fmt.Println(countChar("hello world", 'l'))
}`,
      solution: `package main

import (
    "fmt"
    "strings"
)

func toUpper(s string) string {
    return strings.ToUpper(s)
}

func countChar(s string, c byte) int {
    return strings.Count(s, string(c))
}

func main() {
    fmt.Println(toUpper("hello"))
    fmt.Println(countChar("hello world", 'l'))
}`,
      hints: [
        'strings.ToUpper replaces the C toupper loop.',
        'strings.Count replaces the C count function.',
        'No memory management needed with pure Go.',
      ],
      concepts: ['cgo', 'refactoring', 'strings package', 'CGO_ENABLED=0'],
    },
  ],
};
