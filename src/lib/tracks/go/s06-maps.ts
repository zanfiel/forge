import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-map',
  title: '06. Maps',
  explanation: `## Maps in Go

Maps are Go's built-in hash table implementation, mapping keys to values.

\`\`\`go
// Create with make
m := make(map[string]int)

// Create with literal
ages := map[string]int{
    "Alice": 30,
    "Bob":   25,
}

// Access and set
ages["Carol"] = 28
age := ages["Alice"]

// Comma-ok idiom (check existence)
val, ok := ages["Dave"]
if !ok {
    fmt.Println("not found")
}

// Delete a key
delete(ages, "Bob")

// Iterate (order is random)
for k, v := range ages {
    fmt.Printf("%s: %d\\n", k, v)
}

// Nil map -- reads return zero, writes panic
var nilMap map[string]int
_ = nilMap["key"]       // ok, returns 0
// nilMap["key"] = 1    // PANIC!
\`\`\`

Map keys must be comparable (no slices, maps, or functions as keys).`,
  exercises: [
    {
      id: 'go-map-1',
      title: 'Create a Map',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Create a map with string keys and int values using make.',
      skeleton: `package main

import "fmt"

func main() {
    scores := __BLANK__(map[string]int)
    scores["Alice"] = 95
    scores["Bob"] = 87
    fmt.Println(scores)
}`,
      solution: `package main

import "fmt"

func main() {
    scores := make(map[string]int)
    scores["Alice"] = 95
    scores["Bob"] = 87
    fmt.Println(scores)
}`,
      hints: [
        'Use make to create an initialized map.',
        'make(map[keyType]valueType) creates an empty map.',
        'make(map[string]int)',
      ],
      concepts: ['make map', 'map creation', 'key-value pairs'],
    },
    {
      id: 'go-map-2',
      title: 'Map Literal',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Create a map using a literal with initial values.',
      skeleton: `package main

import "fmt"

func main() {
    colors := map[string]string__BLANK__
        "red":   "#FF0000",
        "green": "#00FF00",
        "blue":  "#0000FF",
    }
    fmt.Println(colors["red"])
}`,
      solution: `package main

import "fmt"

func main() {
    colors := map[string]string{
        "red":   "#FF0000",
        "green": "#00FF00",
        "blue":  "#0000FF",
    }
    fmt.Println(colors["red"])
}`,
      hints: [
        'Map literals use curly braces after the type.',
        'Each entry is key: value, followed by a comma.',
        'The opening brace goes right after the type.',
      ],
      concepts: ['map literal', 'initialization', 'string map'],
    },
    {
      id: 'go-map-3',
      title: 'Comma-Ok Idiom',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use the comma-ok idiom to check if a key exists.',
      skeleton: `package main

import "fmt"

func main() {
    ages := map[string]int{"Alice": 30}
    val, __BLANK__ := ages["Bob"]
    if !ok {
        fmt.Println("Bob not found, got zero value:", val)
    }
}`,
      solution: `package main

import "fmt"

func main() {
    ages := map[string]int{"Alice": 30}
    val, ok := ages["Bob"]
    if !ok {
        fmt.Println("Bob not found, got zero value:", val)
    }
}`,
      hints: [
        'Map access returns two values: the value and a boolean.',
        'The second value indicates whether the key was found.',
        'val, ok := ages["Bob"]',
      ],
      concepts: ['comma-ok idiom', 'key existence', 'two-value assignment'],
    },
    {
      id: 'go-map-4',
      title: 'Delete Key',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Delete a key from a map.',
      skeleton: `package main

import "fmt"

func main() {
    m := map[string]int{"a": 1, "b": 2, "c": 3}
    __BLANK__(m, "b")
    fmt.Println(m)
}`,
      solution: `package main

import "fmt"

func main() {
    m := map[string]int{"a": 1, "b": 2, "c": 3}
    delete(m, "b")
    fmt.Println(m)
}`,
      hints: [
        'Use the delete built-in to remove a key from a map.',
        'delete(map, key) -- no return value.',
        'Deleting a non-existent key is a no-op (no error).',
      ],
      concepts: ['delete', 'map mutation', 'key removal'],
    },
    {
      id: 'go-map-5',
      title: 'Map Iteration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Iterate over a map using for range.',
      skeleton: `package main

import "fmt"

func main() {
    m := map[string]int{"x": 10, "y": 20, "z": 30}
    for __BLANK__, __BLANK__ := range m {
        fmt.Printf("%s=%d ", k, v)
    }
}`,
      solution: `package main

import "fmt"

func main() {
    m := map[string]int{"x": 10, "y": 20, "z": 30}
    for k, v := range m {
        fmt.Printf("%s=%d ", k, v)
    }
}`,
      hints: [
        'Range over a map yields key and value.',
        'for k, v := range m { ... }',
        'Map iteration order is not guaranteed.',
      ],
      concepts: ['map iteration', 'range', 'key-value pairs'],
    },
    {
      id: 'go-map-6',
      title: 'Nil Map Panic',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict what happens when reading from and writing to a nil map.',
      skeleton: `package main

import "fmt"

func main() {
    var m map[string]int
    fmt.Println(m["key"])
    // m["key"] = 1  // What would happen if uncommented?
}`,
      solution: `0`,
      hints: [
        'Reading from a nil map returns the zero value (no panic).',
        'Writing to a nil map causes a runtime panic.',
        'The zero value for int is 0.',
      ],
      concepts: ['nil map', 'zero value', 'runtime panic'],
    },
    {
      id: 'go-map-7',
      title: 'Word Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that counts word occurrences in a string.',
      skeleton: `package main

import (
    "fmt"
    "strings"
)

func wordCount(s string) map[string]int {
    // Split by spaces and count each word
}

func main() {
    counts := wordCount("the cat sat on the mat")
    fmt.Println(counts["the"]) // 2
    fmt.Println(counts["cat"]) // 1
}`,
      solution: `package main

import (
    "fmt"
    "strings"
)

func wordCount(s string) map[string]int {
    counts := make(map[string]int)
    for _, word := range strings.Fields(s) {
        counts[word]++
    }
    return counts
}

func main() {
    counts := wordCount("the cat sat on the mat")
    fmt.Println(counts["the"]) // 2
    fmt.Println(counts["cat"]) // 1
}`,
      hints: [
        'Use strings.Fields to split on whitespace.',
        'Increment the count for each word: counts[word]++.',
        'Zero values mean counts start at 0 automatically.',
      ],
      concepts: ['word counting', 'map increment', 'strings.Fields'],
    },
    {
      id: 'go-map-8',
      title: 'Map of Slices',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that groups strings by their first letter.',
      skeleton: `package main

import "fmt"

func groupByFirstLetter(words []string) map[byte][]string {
    // Group words by their first letter
}

func main() {
    groups := groupByFirstLetter([]string{"apple", "avocado", "banana", "blueberry"})
    fmt.Println(groups['a']) // [apple avocado]
    fmt.Println(groups['b']) // [banana blueberry]
}`,
      solution: `package main

import "fmt"

func groupByFirstLetter(words []string) map[byte][]string {
    groups := make(map[byte][]string)
    for _, w := range words {
        key := w[0]
        groups[key] = append(groups[key], w)
    }
    return groups
}

func main() {
    groups := groupByFirstLetter([]string{"apple", "avocado", "banana", "blueberry"})
    fmt.Println(groups['a']) // [apple avocado]
    fmt.Println(groups['b']) // [banana blueberry]
}`,
      hints: [
        'Map values can be slices.',
        'Use append to add words to existing slice values.',
        'Accessing a missing key returns nil (a valid slice for append).',
      ],
      concepts: ['map of slices', 'grouping', 'append to map value'],
    },
    {
      id: 'go-map-9',
      title: 'Invert Map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that swaps keys and values in a map.',
      skeleton: `package main

import "fmt"

func invert(m map[string]int) map[int]string {
    // Swap keys and values
}

func main() {
    m := map[string]int{"a": 1, "b": 2, "c": 3}
    inv := invert(m)
    fmt.Println(inv[1]) // a
    fmt.Println(inv[2]) // b
}`,
      solution: `package main

import "fmt"

func invert(m map[string]int) map[int]string {
    result := make(map[int]string)
    for k, v := range m {
        result[v] = k
    }
    return result
}

func main() {
    m := map[string]int{"a": 1, "b": 2, "c": 3}
    inv := invert(m)
    fmt.Println(inv[1]) // a
    fmt.Println(inv[2]) // b
}`,
      hints: [
        'Create a new map with swapped key/value types.',
        'Iterate the original and assign result[value] = key.',
        'Note: this only works correctly if values are unique.',
      ],
      concepts: ['map inversion', 'key-value swap', 'map iteration'],
    },
    {
      id: 'go-map-10',
      title: 'Fix Nil Map Write',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the panic caused by writing to a nil map.',
      skeleton: `package main

import "fmt"

func main() {
    var config map[string]string
    config["host"] = "localhost"
    config["port"] = "8080"
    fmt.Println(config)
}`,
      solution: `package main

import "fmt"

func main() {
    config := make(map[string]string)
    config["host"] = "localhost"
    config["port"] = "8080"
    fmt.Println(config)
}`,
      hints: [
        'A nil map cannot be written to -- it causes a panic.',
        'Initialize the map with make before writing.',
        'config := make(map[string]string)',
      ],
      concepts: ['nil map', 'map initialization', 'runtime panic'],
    },
    {
      id: 'go-map-11',
      title: 'Fix Map Race',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Fix the data race on concurrent map access by using sync.Mutex.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    m := make(map[int]int)
    var wg sync.WaitGroup
    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            m[n] = n * n  // data race!
        }(i)
    }
    wg.Wait()
    fmt.Println(len(m))
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

func main() {
    m := make(map[int]int)
    var mu sync.Mutex
    var wg sync.WaitGroup
    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            mu.Lock()
            m[n] = n * n
            mu.Unlock()
        }(i)
    }
    wg.Wait()
    fmt.Println(len(m))
}`,
      hints: [
        'Maps are not safe for concurrent writes in Go.',
        'Use a sync.Mutex to protect map access.',
        'Lock before writing, unlock after.',
      ],
      concepts: ['concurrent map', 'sync.Mutex', 'data race'],
    },
    {
      id: 'go-map-12',
      title: 'Map as Set',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use a map as a set to find the intersection of two slices.',
      skeleton: `package main

import "fmt"

func intersection(a, b []int) []int {
    // Return elements present in both a and b
}

func main() {
    fmt.Println(intersection([]int{1, 2, 3, 4}, []int{3, 4, 5, 6})) // [3 4]
}`,
      solution: `package main

import "fmt"

func intersection(a, b []int) []int {
    set := make(map[int]bool)
    for _, v := range a {
        set[v] = true
    }
    var result []int
    for _, v := range b {
        if set[v] {
            result = append(result, v)
        }
    }
    return result
}

func main() {
    fmt.Println(intersection([]int{1, 2, 3, 4}, []int{3, 4, 5, 6})) // [3 4]
}`,
      hints: [
        'Create a map from the first slice to act as a set.',
        'Iterate the second slice and check membership.',
        'map[int]bool with true values acts like a set.',
      ],
      concepts: ['map as set', 'set intersection', 'membership check'],
    },
    {
      id: 'go-map-13',
      title: 'Predict Map Access',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict what happens when accessing a missing key.',
      skeleton: `package main

import "fmt"

func main() {
    m := map[string]int{"a": 1, "b": 2}
    fmt.Println(m["c"])
    fmt.Println(m["a"])
}`,
      solution: `0
1`,
      hints: [
        'Accessing a missing key returns the zero value for the value type.',
        'The zero value for int is 0.',
        'No error or panic occurs on read of a missing key.',
      ],
      concepts: ['missing key', 'zero value', 'map access'],
    },
    {
      id: 'go-map-14',
      title: 'Predict Comma Ok',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the comma-ok result for existing and missing keys.',
      skeleton: `package main

import "fmt"

func main() {
    m := map[string]int{"x": 0}
    v1, ok1 := m["x"]
    v2, ok2 := m["y"]
    fmt.Println(v1, ok1)
    fmt.Println(v2, ok2)
}`,
      solution: `0 true
0 false`,
      hints: [
        'Key "x" exists with value 0, so ok1 is true.',
        'Key "y" does not exist, so ok2 is false.',
        'The zero value for int is 0 in both cases, but ok distinguishes them.',
      ],
      concepts: ['comma-ok idiom', 'zero value ambiguity', 'key existence'],
    },
    {
      id: 'go-map-15',
      title: 'Merge Maps',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that merges two maps, with the second map taking priority.',
      skeleton: `package main

import "fmt"

func merge(a, b map[string]int) map[string]int {
    // Merge b into a copy of a, b values override a values
}

func main() {
    m1 := map[string]int{"a": 1, "b": 2}
    m2 := map[string]int{"b": 20, "c": 30}
    result := merge(m1, m2)
    fmt.Println(result) // map[a:1 b:20 c:30]
}`,
      solution: `package main

import "fmt"

func merge(a, b map[string]int) map[string]int {
    result := make(map[string]int)
    for k, v := range a {
        result[k] = v
    }
    for k, v := range b {
        result[k] = v
    }
    return result
}

func main() {
    m1 := map[string]int{"a": 1, "b": 2}
    m2 := map[string]int{"b": 20, "c": 30}
    result := merge(m1, m2)
    fmt.Println(result) // map[a:1 b:20 c:30]
}`,
      hints: [
        'Create a new map and copy all entries from a first.',
        'Then copy all entries from b, overwriting any duplicates.',
        'This gives b priority for conflicting keys.',
      ],
      concepts: ['map merge', 'iteration', 'key override'],
    },
    {
      id: 'go-map-16',
      title: 'Sync Map Concept',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Use sync.Map for concurrent-safe map operations.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var m sync.Map
    var wg sync.WaitGroup

    // Store values concurrently
    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            // Store n as both key and value
        }(i)
    }
    wg.Wait()

    // Print all values
    m.Range(func(key, value any) bool {
        fmt.Printf("%v: %v\\n", key, value)
        return true
    })
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var m sync.Map
    var wg sync.WaitGroup

    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            m.Store(n, n*n)
        }(i)
    }
    wg.Wait()

    m.Range(func(key, value any) bool {
        fmt.Printf("%v: %v\\n", key, value)
        return true
    })
}`,
      hints: [
        'sync.Map uses Store(key, value) to set entries.',
        'It uses Load(key) to read entries.',
        'Range iterates all entries with a callback function.',
      ],
      concepts: ['sync.Map', 'concurrent map', 'Store/Load/Range'],
    },
    {
      id: 'go-map-17',
      title: 'Fix Map Deletion During Iteration',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Understand that deleting during range is safe in Go, but fix the logic bug.',
      skeleton: `package main

import "fmt"

func removeNegatives(m map[string]int) {
    for k, v := range m {
        if v < 0 {
            delete(m, k)
        }
    }
}

func main() {
    data := map[string]int{"a": 1, "b": -2, "c": 3, "d": -4}
    removeNegatives(data)
    // Bug: function works but caller expects a return value
    fmt.Println(data)
}`,
      solution: `package main

import "fmt"

func removeNegatives(m map[string]int) map[string]int {
    for k, v := range m {
        if v < 0 {
            delete(m, k)
        }
    }
    return m
}

func main() {
    data := map[string]int{"a": 1, "b": -2, "c": 3, "d": -4}
    data = removeNegatives(data)
    fmt.Println(data)
}`,
      hints: [
        'Deleting map entries during range iteration is safe in Go.',
        'The function modifies the map in place but should return it for chaining.',
        'Add a return type and return statement.',
      ],
      concepts: ['map deletion during iteration', 'function return', 'map mutation'],
    },
    {
      id: 'go-map-18',
      title: 'Frequency Counter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a function that returns the most frequent element in a slice.',
      skeleton: `package main

import "fmt"

func mostFrequent(s []int) int {
    // Return the element that appears most often
}

func main() {
    fmt.Println(mostFrequent([]int{1, 2, 2, 3, 3, 3, 4})) // 3
}`,
      solution: `package main

import "fmt"

func mostFrequent(s []int) int {
    counts := make(map[int]int)
    for _, v := range s {
        counts[v]++
    }
    maxCount := 0
    maxVal := s[0]
    for k, v := range counts {
        if v > maxCount {
            maxCount = v
            maxVal = k
        }
    }
    return maxVal
}

func main() {
    fmt.Println(mostFrequent([]int{1, 2, 2, 3, 3, 3, 4})) // 3
}`,
      hints: [
        'First, count occurrences using a map.',
        'Then find the key with the highest count.',
        'Track the maximum count and corresponding value.',
      ],
      concepts: ['frequency counting', 'map', 'maximum finding'],
    },
    {
      id: 'go-map-19',
      title: 'Refactor to Map Lookup',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Refactor a switch statement to a map lookup.',
      skeleton: `package main

import "fmt"

func romanToInt(s string) int {
    total := 0
    for _, c := range s {
        switch c {
        case 'I':
            total += 1
        case 'V':
            total += 5
        case 'X':
            total += 10
        case 'L':
            total += 50
        case 'C':
            total += 100
        }
    }
    return total
}

func main() {
    fmt.Println(romanToInt("XVI"))
}`,
      solution: `package main

import "fmt"

var romanValues = map[rune]int{
    'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100,
}

func romanToInt(s string) int {
    total := 0
    for _, c := range s {
        total += romanValues[c]
    }
    return total
}

func main() {
    fmt.Println(romanToInt("XVI"))
}`,
      hints: [
        'Replace the switch with a map from rune to int.',
        'Look up each character in the map.',
        'This is more concise and easier to extend.',
      ],
      concepts: ['map lookup', 'refactoring', 'data-driven design'],
    },
    {
      id: 'go-map-20',
      title: 'Refactor Map Initialization',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor imperative map building to use a map literal.',
      skeleton: `package main

import "fmt"

func main() {
    config := make(map[string]string)
    config["host"] = "localhost"
    config["port"] = "8080"
    config["db"] = "mydb"
    config["user"] = "admin"
    config["ssl"] = "true"
    fmt.Println(config)
}`,
      solution: `package main

import "fmt"

func main() {
    config := map[string]string{
        "host": "localhost",
        "port": "8080",
        "db":   "mydb",
        "user": "admin",
        "ssl":  "true",
    }
    fmt.Println(config)
}`,
      hints: [
        'When all values are known at creation time, use a map literal.',
        'Map literals are more readable than sequential assignments.',
        'Use map[string]string{ ... } syntax.',
      ],
      concepts: ['map literal', 'initialization', 'readability'],
    },
  ],
};
