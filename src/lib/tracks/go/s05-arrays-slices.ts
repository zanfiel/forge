import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-slice',
  title: '05. Arrays & Slices',
  explanation: `## Arrays and Slices in Go

Arrays have a fixed size; slices are dynamic views over arrays and are far more common.

\`\`\`go
// Arrays -- fixed size, value types
var a [3]int = [3]int{1, 2, 3}
b := [...]int{10, 20, 30}  // size inferred

// Slices -- dynamic, reference type
s := []int{1, 2, 3}
s = append(s, 4, 5)

// make -- create slice with length and optional capacity
m := make([]int, 5)     // len=5, cap=5
n := make([]int, 0, 10) // len=0, cap=10

// Slice expressions
sub := s[1:3]   // elements at index 1, 2
head := s[:2]   // first 2 elements
tail := s[2:]   // from index 2 to end

// copy -- copies elements between slices
dst := make([]int, len(src))
copy(dst, src)

// len and cap
fmt.Println(len(s), cap(s))

// nil slice vs empty slice
var nilSlice []int        // nil, len=0, cap=0
emptySlice := []int{}     // not nil, len=0, cap=0
\`\`\`

Slices share underlying arrays. Modifying a sub-slice modifies the original.`,
  exercises: [
    {
      id: 'go-slice-1',
      title: 'Array Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Declare an array of 3 strings.',
      skeleton: `package main

import "fmt"

func main() {
    var names __BLANK__string = [3]string{"Alice", "Bob", "Carol"}
    fmt.Println(names)
}`,
      solution: `package main

import "fmt"

func main() {
    var names [3]string = [3]string{"Alice", "Bob", "Carol"}
    fmt.Println(names)
}`,
      hints: [
        'Arrays specify their size in square brackets before the type.',
        'The syntax is [size]type.',
        '[3]string declares an array of 3 strings.',
      ],
      concepts: ['array declaration', 'fixed size', 'array literal'],
    },
    {
      id: 'go-slice-2',
      title: 'Slice Append',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Append elements to a slice.',
      skeleton: `package main

import "fmt"

func main() {
    nums := []int{1, 2, 3}
    nums = __BLANK__(nums, 4, 5)
    fmt.Println(nums)
}`,
      solution: `package main

import "fmt"

func main() {
    nums := []int{1, 2, 3}
    nums = append(nums, 4, 5)
    fmt.Println(nums)
}`,
      hints: [
        'Use the append built-in to add elements to a slice.',
        'append returns a new slice -- you must assign it back.',
        'nums = append(nums, 4, 5)',
      ],
      concepts: ['append', 'slice growth', 'reassignment'],
    },
    {
      id: 'go-slice-3',
      title: 'Make Slice',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Create a slice with make, specifying length and capacity.',
      skeleton: `package main

import "fmt"

func main() {
    s := __BLANK__([]int, 3, 10)
    fmt.Println(len(s), cap(s))
}`,
      solution: `package main

import "fmt"

func main() {
    s := make([]int, 3, 10)
    fmt.Println(len(s), cap(s))
}`,
      hints: [
        'make creates slices, maps, and channels.',
        'For slices: make([]type, length, capacity).',
        'make([]int, 3, 10) creates a slice with length 3 and capacity 10.',
      ],
      concepts: ['make', 'length', 'capacity'],
    },
    {
      id: 'go-slice-4',
      title: 'Slice Expression',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Extract a sub-slice containing the middle elements.',
      skeleton: `package main

import "fmt"

func main() {
    nums := []int{10, 20, 30, 40, 50}
    middle := nums__BLANK__  // should be [20, 30, 40]
    fmt.Println(middle)
}`,
      solution: `package main

import "fmt"

func main() {
    nums := []int{10, 20, 30, 40, 50}
    middle := nums[1:4]  // should be [20, 30, 40]
    fmt.Println(middle)
}`,
      hints: [
        'Slice expressions use [low:high] syntax.',
        'low is inclusive, high is exclusive.',
        'nums[1:4] gives elements at indices 1, 2, 3.',
      ],
      concepts: ['slice expression', 'sub-slice', 'index range'],
    },
    {
      id: 'go-slice-5',
      title: 'Copy Slice',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Create an independent copy of a slice.',
      skeleton: `package main

import "fmt"

func main() {
    src := []int{1, 2, 3}
    dst := make([]int, len(src))
    __BLANK__(dst, src)
    dst[0] = 99
    fmt.Println(src) // [1 2 3] -- unchanged
    fmt.Println(dst) // [99 2 3]
}`,
      solution: `package main

import "fmt"

func main() {
    src := []int{1, 2, 3}
    dst := make([]int, len(src))
    copy(dst, src)
    dst[0] = 99
    fmt.Println(src) // [1 2 3] -- unchanged
    fmt.Println(dst) // [99 2 3]
}`,
      hints: [
        'The copy built-in copies elements from source to destination.',
        'It returns the number of elements copied.',
        'copy(dst, src) -- destination comes first.',
      ],
      concepts: ['copy', 'independent slice', 'shared backing array'],
    },
    {
      id: 'go-slice-6',
      title: 'Nil vs Empty Slice',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the behavior of nil and empty slices.',
      skeleton: `package main

import "fmt"

func main() {
    var a []int
    b := []int{}
    fmt.Println(a == nil, b == nil)
    fmt.Println(len(a), len(b))
}`,
      solution: `true false
0 0`,
      hints: [
        'A var declaration without initialization gives a nil slice.',
        'An empty literal []int{} is not nil, just empty.',
        'Both have length 0, but they differ in nil-ness.',
      ],
      concepts: ['nil slice', 'empty slice', 'slice comparison'],
    },
    {
      id: 'go-slice-7',
      title: 'Len and Cap',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict length and capacity after slicing.',
      skeleton: `package main

import "fmt"

func main() {
    s := []int{0, 1, 2, 3, 4}
    t := s[1:3]
    fmt.Println(len(t), cap(t))
}`,
      solution: `2 4`,
      hints: [
        'len(t) is high - low: 3 - 1 = 2.',
        'cap(t) is the capacity from the start index to the end of the underlying array.',
        'The underlying array has 5 elements; starting at index 1 gives capacity 4.',
      ],
      concepts: ['length', 'capacity', 'slice header'],
    },
    {
      id: 'go-slice-8',
      title: 'Remove Element',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that removes an element at index i from a slice.',
      skeleton: `package main

import "fmt"

func remove(s []int, i int) []int {
    // Remove element at index i and return the modified slice
}

func main() {
    nums := []int{10, 20, 30, 40, 50}
    nums = remove(nums, 2)
    fmt.Println(nums) // [10 20 40 50]
}`,
      solution: `package main

import "fmt"

func remove(s []int, i int) []int {
    return append(s[:i], s[i+1:]...)
}

func main() {
    nums := []int{10, 20, 30, 40, 50}
    nums = remove(nums, 2)
    fmt.Println(nums) // [10 20 40 50]
}`,
      hints: [
        'Use append to concatenate the parts before and after index i.',
        's[:i] gives elements before index i.',
        'append(s[:i], s[i+1:]...) removes element at i.',
      ],
      concepts: ['slice removal', 'append trick', 'slice manipulation'],
    },
    {
      id: 'go-slice-9',
      title: 'Reverse Slice',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that reverses a slice in-place.',
      skeleton: `package main

import "fmt"

func reverse(s []int) {
    // Reverse the slice in-place
}

func main() {
    nums := []int{1, 2, 3, 4, 5}
    reverse(nums)
    fmt.Println(nums) // [5 4 3 2 1]
}`,
      solution: `package main

import "fmt"

func reverse(s []int) {
    for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
        s[i], s[j] = s[j], s[i]
    }
}

func main() {
    nums := []int{1, 2, 3, 4, 5}
    reverse(nums)
    fmt.Println(nums) // [5 4 3 2 1]
}`,
      hints: [
        'Use two pointers: one at the start, one at the end.',
        'Swap elements and move pointers toward the center.',
        'for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1',
      ],
      concepts: ['two pointers', 'in-place reversal', 'swap'],
    },
    {
      id: 'go-slice-10',
      title: 'Fix Append Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the bug where append modifies the original slice through a shared backing array.',
      skeleton: `package main

import "fmt"

func main() {
    original := make([]int, 3, 5)
    original[0], original[1], original[2] = 1, 2, 3

    sub := original[:2]
    sub = append(sub, 99)

    fmt.Println(original) // Expected [1 2 3], got [1 2 99]
}`,
      solution: `package main

import "fmt"

func main() {
    original := make([]int, 3, 5)
    original[0], original[1], original[2] = 1, 2, 3

    sub := make([]int, 2)
    copy(sub, original[:2])
    sub = append(sub, 99)

    fmt.Println(original) // [1 2 3]
}`,
      hints: [
        'sub shares the same backing array as original.',
        'append to sub overwrites original[2] because there is spare capacity.',
        'Create an independent copy of the sub-slice before appending.',
      ],
      concepts: ['shared backing array', 'append side effects', 'defensive copy'],
    },
    {
      id: 'go-slice-11',
      title: '2D Slice',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that creates a 2D slice (matrix) of given dimensions.',
      skeleton: `package main

import "fmt"

func makeMatrix(rows, cols int) [][]int {
    // Create a rows x cols matrix initialized to 0
}

func main() {
    m := makeMatrix(2, 3)
    m[0][1] = 5
    fmt.Println(m) // [[0 5 0] [0 0 0]]
}`,
      solution: `package main

import "fmt"

func makeMatrix(rows, cols int) [][]int {
    matrix := make([][]int, rows)
    for i := range matrix {
        matrix[i] = make([]int, cols)
    }
    return matrix
}

func main() {
    m := makeMatrix(2, 3)
    m[0][1] = 5
    fmt.Println(m) // [[0 5 0] [0 0 0]]
}`,
      hints: [
        'Create the outer slice with make([][]int, rows).',
        'Each row is a separate slice that must also be created with make.',
        'Loop over rows and allocate each inner slice.',
      ],
      concepts: ['2D slice', 'matrix', 'nested make'],
    },
    {
      id: 'go-slice-12',
      title: 'Contains Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a function that checks if a slice contains a value.',
      skeleton: `package main

import "fmt"

func contains(s []string, target string) bool {
    // Return true if target is in s
}

func main() {
    fruits := []string{"apple", "banana", "cherry"}
    fmt.Println(contains(fruits, "banana"))  // true
    fmt.Println(contains(fruits, "grape"))   // false
}`,
      solution: `package main

import "fmt"

func contains(s []string, target string) bool {
    for _, v := range s {
        if v == target {
            return true
        }
    }
    return false
}

func main() {
    fruits := []string{"apple", "banana", "cherry"}
    fmt.Println(contains(fruits, "banana"))  // true
    fmt.Println(contains(fruits, "grape"))   // false
}`,
      hints: [
        'Iterate over the slice with range.',
        'Compare each element to the target.',
        'Return true on match, false after the loop.',
      ],
      concepts: ['linear search', 'range loop', 'boolean return'],
    },
    {
      id: 'go-slice-13',
      title: 'Fix Index Out of Range',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the runtime panic caused by accessing an out-of-bounds index.',
      skeleton: `package main

import "fmt"

func main() {
    nums := []int{10, 20, 30}
    for i := 0; i <= len(nums); i++ {
        fmt.Println(nums[i])
    }
}`,
      solution: `package main

import "fmt"

func main() {
    nums := []int{10, 20, 30}
    for i := 0; i < len(nums); i++ {
        fmt.Println(nums[i])
    }
}`,
      hints: [
        'The loop condition i <= len(nums) accesses index 3 which is out of bounds.',
        'Slice indices go from 0 to len-1.',
        'Change <= to < in the loop condition.',
      ],
      concepts: ['index out of range', 'bounds checking', 'loop condition'],
    },
    {
      id: 'go-slice-14',
      title: 'Predict Append Capacity',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Predict how capacity grows when appending to a slice.',
      skeleton: `package main

import "fmt"

func main() {
    s := make([]int, 0)
    for i := 0; i < 5; i++ {
        s = append(s, i)
        fmt.Printf("len=%d cap=%d\\n", len(s), cap(s))
    }
}`,
      solution: `len=1 cap=1
len=2 cap=2
len=3 cap=4
len=4 cap=4
len=5 cap=8`,
      hints: [
        'When a slice runs out of capacity, Go allocates a new backing array.',
        'The capacity roughly doubles each time (for small slices).',
        'Starting from 0: cap goes 1, 2, 4, 4, 8.',
      ],
      concepts: ['capacity growth', 'amortized allocation', 'append behavior'],
    },
    {
      id: 'go-slice-15',
      title: 'Filter Slice',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a filter function that returns elements matching a predicate.',
      skeleton: `package main

import "fmt"

func filter(s []int, pred func(int) bool) []int {
    // Return a new slice with only elements where pred returns true
}

func main() {
    nums := []int{1, 2, 3, 4, 5, 6, 7, 8}
    evens := filter(nums, func(n int) bool { return n%2 == 0 })
    fmt.Println(evens) // [2 4 6 8]
}`,
      solution: `package main

import "fmt"

func filter(s []int, pred func(int) bool) []int {
    var result []int
    for _, v := range s {
        if pred(v) {
            result = append(result, v)
        }
    }
    return result
}

func main() {
    nums := []int{1, 2, 3, 4, 5, 6, 7, 8}
    evens := filter(nums, func(n int) bool { return n%2 == 0 })
    fmt.Println(evens) // [2 4 6 8]
}`,
      hints: [
        'Create a nil slice and append matching elements.',
        'Call pred(v) for each element.',
        'Only append if the predicate returns true.',
      ],
      concepts: ['filter pattern', 'predicate function', 'slice building'],
    },
    {
      id: 'go-slice-16',
      title: 'Full Slice Expression',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Use a 3-index slice expression to limit capacity.',
      skeleton: `package main

import "fmt"

func main() {
    s := []int{0, 1, 2, 3, 4}
    // Create a sub-slice with len=2, cap=2 (not extending to end)
    t := s[1:3__BLANK__]
    fmt.Println(len(t), cap(t)) // 2 2
}`,
      solution: `package main

import "fmt"

func main() {
    s := []int{0, 1, 2, 3, 4}
    // Create a sub-slice with len=2, cap=2 (not extending to end)
    t := s[1:3:3]
    fmt.Println(len(t), cap(t)) // 2 2
}`,
      hints: [
        'The full slice expression is s[low:high:max].',
        'max limits the capacity: cap = max - low.',
        's[1:3:3] gives len=2, cap=2.',
      ],
      concepts: ['full slice expression', 'capacity limiting', 'three-index slice'],
    },
    {
      id: 'go-slice-17',
      title: 'Refactor to Slice',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Refactor array-based code to use slices for flexibility.',
      skeleton: `package main

import "fmt"

func sum(arr [5]int) int {
    total := 0
    for _, v := range arr {
        total += v
    }
    return total
}

func main() {
    data := [5]int{1, 2, 3, 4, 5}
    fmt.Println(sum(data))
}`,
      solution: `package main

import "fmt"

func sum(s []int) int {
    total := 0
    for _, v := range s {
        total += v
    }
    return total
}

func main() {
    data := []int{1, 2, 3, 4, 5}
    fmt.Println(sum(data))
}`,
      hints: [
        'Replace [5]int with []int to accept slices of any length.',
        'Change the array literal to a slice literal.',
        'Slices are more flexible than fixed-size arrays.',
      ],
      concepts: ['array to slice', 'flexibility', 'idiomatic Go'],
    },
    {
      id: 'go-slice-18',
      title: 'Refactor Prepend',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor manual element shifting to use append for prepending.',
      skeleton: `package main

import "fmt"

func prepend(s []int, val int) []int {
    result := make([]int, len(s)+1)
    result[0] = val
    for i, v := range s {
        result[i+1] = v
    }
    return result
}

func main() {
    nums := []int{2, 3, 4}
    nums = prepend(nums, 1)
    fmt.Println(nums)
}`,
      solution: `package main

import "fmt"

func prepend(s []int, val int) []int {
    return append([]int{val}, s...)
}

func main() {
    nums := []int{2, 3, 4}
    nums = prepend(nums, 1)
    fmt.Println(nums)
}`,
      hints: [
        'You can prepend by appending the original slice to a new one-element slice.',
        'append([]int{val}, s...) creates [val] then appends all of s.',
        'This is the idiomatic Go prepend pattern.',
      ],
      concepts: ['prepend pattern', 'append idiom', 'slice spread'],
    },
    {
      id: 'go-slice-19',
      title: 'Fix Slice Shared Mutation',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Fix the bug where two sub-slices unexpectedly share data.',
      skeleton: `package main

import "fmt"

func main() {
    data := []int{1, 2, 3, 4, 5}
    a := data[0:3]
    b := data[0:3]
    a[0] = 99
    fmt.Println(b[0]) // Expected 1, got 99
}`,
      solution: `package main

import "fmt"

func main() {
    data := []int{1, 2, 3, 4, 5}
    a := make([]int, 3)
    copy(a, data[0:3])
    b := make([]int, 3)
    copy(b, data[0:3])
    a[0] = 99
    fmt.Println(b[0]) // 1
}`,
      hints: [
        'Sub-slices share the same underlying array.',
        'Modifying one sub-slice affects the other.',
        'Use copy to create independent slices.',
      ],
      concepts: ['shared backing array', 'defensive copy', 'slice independence'],
    },
    {
      id: 'go-slice-20',
      title: 'Unique Elements',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that returns unique elements from a slice.',
      skeleton: `package main

import "fmt"

func unique(s []int) []int {
    // Return a new slice with duplicate elements removed
}

func main() {
    fmt.Println(unique([]int{1, 2, 2, 3, 3, 3, 4})) // [1 2 3 4]
}`,
      solution: `package main

import "fmt"

func unique(s []int) []int {
    seen := make(map[int]bool)
    var result []int
    for _, v := range s {
        if !seen[v] {
            seen[v] = true
            result = append(result, v)
        }
    }
    return result
}

func main() {
    fmt.Println(unique([]int{1, 2, 2, 3, 3, 3, 4})) // [1 2 3 4]
}`,
      hints: [
        'Use a map to track which values have been seen.',
        'Only append a value if it has not been seen before.',
        'Mark values as seen in the map after appending.',
      ],
      concepts: ['deduplication', 'map as set', 'unique elements'],
    },
  ],
};
