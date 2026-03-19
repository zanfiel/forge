import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-srt',
  title: '35. Sort Interface',
  explanation: `## Sorting in Go

Go's \`sort\` package provides sorting primitives. The core is the \`sort.Interface\`:

\`\`\`go
type Interface interface {
    Len() int
    Less(i, j int) bool
    Swap(i, j int)
}

// Implementing sort.Interface
type ByAge []Person

func (a ByAge) Len() int           { return len(a) }
func (a ByAge) Less(i, j int) bool { return a[i].Age < a[j].Age }
func (a ByAge) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }

sort.Sort(ByAge(people))

// Convenience functions
sort.Ints([]int{3, 1, 2})       // sort ints
sort.Strings([]string{"b", "a"}) // sort strings
sort.Float64s([]float64{3.1, 1.2}) // sort floats

// sort.Slice - no interface needed
sort.Slice(people, func(i, j int) bool {
    return people[i].Name < people[j].Name
})

// sort.SliceStable - preserves order of equal elements
sort.SliceStable(people, func(i, j int) bool {
    return people[i].Age < people[j].Age
})

// sort.Search - binary search on sorted data
i := sort.Search(len(a), func(i int) bool {
    return a[i] >= target
})

// sort.Reverse adapter
sort.Sort(sort.Reverse(ByAge(people)))
\`\`\``,
  exercises: [
    {
      id: 'go-srt-1',
      title: 'Sort Integers',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Sort a slice of integers using the sort package.',
      skeleton: `package main

import (
    "fmt"
    "sort"
)

func main() {
    nums := []int{5, 3, 8, 1, 9, 2}
    sort.__BLANK__(nums)
    fmt.Println(nums)
}`,
      solution: `package main

import (
    "fmt"
    "sort"
)

func main() {
    nums := []int{5, 3, 8, 1, 9, 2}
    sort.Ints(nums)
    fmt.Println(nums)
}`,
      hints: [
        'sort.Ints sorts a slice of ints in ascending order.',
        'It sorts in-place, modifying the original slice.',
        'The result is [1 2 3 5 8 9].',
      ],
      concepts: ['sort.Ints', 'in-place sort'],
    },
    {
      id: 'go-srt-2',
      title: 'Sort Strings',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Sort a slice of strings alphabetically.',
      skeleton: `package main

import (
    "fmt"
    "sort"
)

func main() {
    words := []string{"banana", "apple", "cherry", "date"}
    sort.__BLANK__(words)
    fmt.Println(words)
}`,
      solution: `package main

import (
    "fmt"
    "sort"
)

func main() {
    words := []string{"banana", "apple", "cherry", "date"}
    sort.Strings(words)
    fmt.Println(words)
}`,
      hints: [
        'sort.Strings sorts a string slice in lexicographic order.',
        'Sorting is in-place.',
        'The result is [apple banana cherry date].',
      ],
      concepts: ['sort.Strings', 'lexicographic order'],
    },
    {
      id: 'go-srt-3',
      title: 'sort.Slice Usage',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use sort.Slice to sort structs by a field.',
      skeleton: `package main

import (
    "fmt"
    "sort"
)

type Person struct {
    Name string
    Age  int
}

func main() {
    people := []Person{
        {"Charlie", 30},
        {"Alice", 25},
        {"Bob", 35},
    }
    sort.Slice(people, func(i, j int) __BLANK__ {
        return people[i].Age < people[j].Age
    })
    for _, p := range people {
        fmt.Println(p.Name, p.Age)
    }
}`,
      solution: `package main

import (
    "fmt"
    "sort"
)

type Person struct {
    Name string
    Age  int
}

func main() {
    people := []Person{
        {"Charlie", 30},
        {"Alice", 25},
        {"Bob", 35},
    }
    sort.Slice(people, func(i, j int) bool {
        return people[i].Age < people[j].Age
    })
    for _, p := range people {
        fmt.Println(p.Name, p.Age)
    }
}`,
      hints: [
        'The less function must return bool.',
        'Return true if element i should come before j.',
        'sort.Slice does not require implementing sort.Interface.',
      ],
      concepts: ['sort.Slice', 'closure', 'comparison'],
    },
    {
      id: 'go-srt-4',
      title: 'Implement Len Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Implement the Len() method for sort.Interface.',
      skeleton: `package main

import (
    "fmt"
    "sort"
)

type Scores []int

func (s Scores) Len() int           { return __BLANK__ }
func (s Scores) Less(i, j int) bool { return s[i] < s[j] }
func (s Scores) Swap(i, j int)      { s[i], s[j] = s[j], s[i] }

func main() {
    scores := Scores{88, 72, 95, 60, 83}
    sort.Sort(scores)
    fmt.Println(scores)
}`,
      solution: `package main

import (
    "fmt"
    "sort"
)

type Scores []int

func (s Scores) Len() int           { return len(s) }
func (s Scores) Less(i, j int) bool { return s[i] < s[j] }
func (s Scores) Swap(i, j int)      { s[i], s[j] = s[j], s[i] }

func main() {
    scores := Scores{88, 72, 95, 60, 83}
    sort.Sort(scores)
    fmt.Println(scores)
}`,
      hints: [
        'Len() returns the number of elements.',
        'Use the built-in len() function.',
        'This is required by sort.Interface.',
      ],
      concepts: ['sort.Interface', 'Len'],
    },
    {
      id: 'go-srt-5',
      title: 'Reverse Sort',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Sort in descending order using sort.Reverse.',
      skeleton: `package main

import (
    "fmt"
    "sort"
)

func main() {
    nums := []int{5, 3, 8, 1, 9, 2}
    sort.Sort(sort.__BLANK__(sort.IntSlice(nums)))
    fmt.Println(nums)
}`,
      solution: `package main

import (
    "fmt"
    "sort"
)

func main() {
    nums := []int{5, 3, 8, 1, 9, 2}
    sort.Sort(sort.Reverse(sort.IntSlice(nums)))
    fmt.Println(nums)
}`,
      hints: [
        'sort.Reverse wraps a sort.Interface to invert Less.',
        'sort.IntSlice converts []int to sort.Interface.',
        'The result is [9 8 5 3 2 1].',
      ],
      concepts: ['sort.Reverse', 'sort.IntSlice', 'descending'],
    },
    {
      id: 'go-srt-6',
      title: 'Binary Search',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use sort.Search to find a value in a sorted slice.',
      skeleton: `package main

import (
    "fmt"
    "sort"
)

func main() {
    nums := []int{1, 3, 5, 7, 9, 11, 13}
    target := 7
    i := sort.__BLANK__(len(nums), func(i int) bool {
        return nums[i] >= target
    })
    if i < len(nums) && nums[i] == target {
        fmt.Printf("Found %d at index %d\\n", target, i)
    } else {
        fmt.Printf("%d not found\\n", target)
    }
}`,
      solution: `package main

import (
    "fmt"
    "sort"
)

func main() {
    nums := []int{1, 3, 5, 7, 9, 11, 13}
    target := 7
    i := sort.Search(len(nums), func(i int) bool {
        return nums[i] >= target
    })
    if i < len(nums) && nums[i] == target {
        fmt.Printf("Found %d at index %d\\n", target, i)
    } else {
        fmt.Printf("%d not found\\n", target)
    }
}`,
      hints: [
        'sort.Search performs binary search.',
        'The function must return true for the target and all larger values.',
        'Check the result index to verify the value was found.',
      ],
      concepts: ['sort.Search', 'binary search'],
    },
    {
      id: 'go-srt-7',
      title: 'Predict Sort Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the output of sorting operations.',
      skeleton: `package main

import (
    "fmt"
    "sort"
)

func main() {
    s := []string{"Go", "C", "Python", "Rust", "Java"}
    sort.Strings(s)
    fmt.Println(s)
    fmt.Println(sort.StringsAreSorted(s))
}`,
      solution: `[C Go Java Python Rust]
true`,
      hints: [
        'Strings are sorted lexicographically (Unicode order).',
        'Capital letters: C < G < J < P < R.',
        'StringsAreSorted returns true for a sorted slice.',
      ],
      concepts: ['sort.Strings', 'lexicographic order'],
    },
    {
      id: 'go-srt-8',
      title: 'Predict Stable Sort',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict how stable sort preserves relative order.',
      skeleton: `package main

import (
    "fmt"
    "sort"
)

type Item struct {
    Name string
    Rank int
}

func main() {
    items := []Item{
        {"A", 2},
        {"B", 1},
        {"C", 2},
        {"D", 1},
    }
    sort.SliceStable(items, func(i, j int) bool {
        return items[i].Rank < items[j].Rank
    })
    for _, it := range items {
        fmt.Printf("%s(%d) ", it.Name, it.Rank)
    }
    fmt.Println()
}`,
      solution: `B(1) D(1) A(2) C(2) `,
      hints: [
        'Stable sort preserves relative order of equal elements.',
        'B and D both have Rank 1; B came first, so B stays first.',
        'A and C both have Rank 2; A came first, so A stays first.',
      ],
      concepts: ['sort.SliceStable', 'stability'],
    },
    {
      id: 'go-srt-9',
      title: 'Predict Search Result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the index returned by sort.Search.',
      skeleton: `package main

import (
    "fmt"
    "sort"
)

func main() {
    nums := []int{1, 3, 5, 7, 9}

    // Search for existing value
    i1 := sort.Search(len(nums), func(i int) bool { return nums[i] >= 5 })
    fmt.Println(i1)

    // Search for non-existing value
    i2 := sort.Search(len(nums), func(i int) bool { return nums[i] >= 6 })
    fmt.Println(i2)
}`,
      solution: `2
3`,
      hints: [
        'sort.Search returns the smallest index where f(i) is true.',
        'For 5: nums[2]=5, which is >= 5, so index 2.',
        'For 6: nums[3]=7 is the first >= 6, so index 3.',
      ],
      concepts: ['sort.Search', 'insertion point'],
    },
    {
      id: 'go-srt-10',
      title: 'Full sort.Interface Implementation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Implement sort.Interface for a custom type.',
      skeleton: `package main

import (
    "fmt"
    "sort"
)

type Student struct {
    Name  string
    Grade float64
}

type ByGrade []Student

// Implement Len, Less, Swap so students sort by Grade descending.
// TODO: implement sort.Interface methods

func main() {
    students := ByGrade{
        {"Alice", 92.5},
        {"Bob", 88.0},
        {"Charlie", 95.3},
        {"Diana", 90.1},
    }
    sort.Sort(students)
    for _, s := range students {
        fmt.Printf("%s: %.1f\\n", s.Name, s.Grade)
    }
}`,
      solution: `package main

import (
    "fmt"
    "sort"
)

type Student struct {
    Name  string
    Grade float64
}

type ByGrade []Student

func (s ByGrade) Len() int           { return len(s) }
func (s ByGrade) Less(i, j int) bool { return s[i].Grade > s[j].Grade }
func (s ByGrade) Swap(i, j int)      { s[i], s[j] = s[j], s[i] }

func main() {
    students := ByGrade{
        {"Alice", 92.5},
        {"Bob", 88.0},
        {"Charlie", 95.3},
        {"Diana", 90.1},
    }
    sort.Sort(students)
    for _, s := range students {
        fmt.Printf("%s: %.1f\\n", s.Name, s.Grade)
    }
}`,
      hints: [
        'Len returns the length of the slice.',
        'Less uses > for descending order.',
        'Swap exchanges elements at positions i and j.',
      ],
      concepts: ['sort.Interface', 'descending sort'],
    },
    {
      id: 'go-srt-11',
      title: 'Multi-Key Sort',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Sort by multiple fields: primary and secondary keys.',
      skeleton: `package main

import (
    "fmt"
    "sort"
)

type Employee struct {
    Department string
    Name       string
    Salary     int
}

// sortEmployees sorts by Department ascending, then by Salary descending.
func sortEmployees(emps []Employee) {
    // TODO: implement
}

func main() {
    emps := []Employee{
        {"Sales", "Bob", 50000},
        {"Engineering", "Alice", 90000},
        {"Sales", "Charlie", 60000},
        {"Engineering", "Diana", 85000},
    }
    sortEmployees(emps)
    for _, e := range emps {
        fmt.Printf("%-12s %-10s %d\\n", e.Department, e.Name, e.Salary)
    }
}`,
      solution: `package main

import (
    "fmt"
    "sort"
)

type Employee struct {
    Department string
    Name       string
    Salary     int
}

func sortEmployees(emps []Employee) {
    sort.SliceStable(emps, func(i, j int) bool {
        if emps[i].Department != emps[j].Department {
            return emps[i].Department < emps[j].Department
        }
        return emps[i].Salary > emps[j].Salary
    })
}

func main() {
    emps := []Employee{
        {"Sales", "Bob", 50000},
        {"Engineering", "Alice", 90000},
        {"Sales", "Charlie", 60000},
        {"Engineering", "Diana", 85000},
    }
    sortEmployees(emps)
    for _, e := range emps {
        fmt.Printf("%-12s %-10s %d\\n", e.Department, e.Name, e.Salary)
    }
}`,
      hints: [
        'Compare the primary key first (Department).',
        'If primary keys are equal, compare secondary key (Salary).',
        'Use SliceStable to preserve order of equal elements.',
      ],
      concepts: ['multi-key sort', 'sort.SliceStable'],
    },
    {
      id: 'go-srt-12',
      title: 'Custom Comparator Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a generic sort helper using a comparator function.',
      skeleton: `package main

import (
    "fmt"
    "sort"
    "strings"
)

// sortBy sorts a string slice using a custom key function.
// The strings should be sorted by the value returned by keyFn.
func sortBy(items []string, keyFn func(string) string) {
    // TODO: implement
}

func main() {
    words := []string{"Banana", "apple", "Cherry", "date"}
    // Sort case-insensitively
    sortBy(words, strings.ToLower)
    fmt.Println(words)
}`,
      solution: `package main

import (
    "fmt"
    "sort"
    "strings"
)

func sortBy(items []string, keyFn func(string) string) {
    sort.Slice(items, func(i, j int) bool {
        return keyFn(items[i]) < keyFn(items[j])
    })
}

func main() {
    words := []string{"Banana", "apple", "Cherry", "date"}
    sortBy(words, strings.ToLower)
    fmt.Println(words)
}`,
      hints: [
        'Use sort.Slice with a closure that applies keyFn.',
        'Compare keyFn(items[i]) < keyFn(items[j]).',
        'strings.ToLower normalizes case for comparison.',
      ],
      concepts: ['sort.Slice', 'key function', 'case-insensitive sort'],
    },
    {
      id: 'go-srt-13',
      title: 'Fix Wrong Less Implementation',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix a Less function that sorts in the wrong direction.',
      skeleton: `package main

import (
    "fmt"
    "sort"
)

type HighScore struct {
    Name  string
    Score int
}

type ByScore []HighScore

func (s ByScore) Len() int           { return len(s) }
func (s ByScore) Less(i, j int) bool { return s[i].Score < s[j].Score }
func (s ByScore) Swap(i, j int)      { s[i], s[j] = s[j], s[i] }

// BUG: High scores should be first (descending), but this sorts ascending
func main() {
    scores := ByScore{
        {"Alice", 1500},
        {"Bob", 2300},
        {"Charlie", 1800},
    }
    sort.Sort(scores)
    for i, s := range scores {
        fmt.Printf("#%d %s: %d\\n", i+1, s.Name, s.Score)
    }
}`,
      solution: `package main

import (
    "fmt"
    "sort"
)

type HighScore struct {
    Name  string
    Score int
}

type ByScore []HighScore

func (s ByScore) Len() int           { return len(s) }
func (s ByScore) Less(i, j int) bool { return s[i].Score > s[j].Score }
func (s ByScore) Swap(i, j int)      { s[i], s[j] = s[j], s[i] }

func main() {
    scores := ByScore{
        {"Alice", 1500},
        {"Bob", 2300},
        {"Charlie", 1800},
    }
    sort.Sort(scores)
    for i, s := range scores {
        fmt.Printf("#%d %s: %d\\n", i+1, s.Name, s.Score)
    }
}`,
      hints: [
        'Less returns true if i should come before j.',
        'For descending order, use > instead of <.',
        'Higher scores should come first.',
      ],
      concepts: ['sort.Interface', 'Less', 'descending'],
    },
    {
      id: 'go-srt-14',
      title: 'Fix Unstable Sort Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix a sort that loses relative order of equal elements.',
      skeleton: `package main

import (
    "fmt"
    "sort"
)

type Task struct {
    Priority int
    Name     string
    Order    int // insertion order
}

func main() {
    tasks := []Task{
        {2, "Review PR", 1},
        {1, "Fix bug", 2},
        {2, "Write tests", 3},
        {1, "Deploy", 4},
    }
    // BUG: Using sort.Slice which is NOT stable.
    // Tasks with same priority should keep their insertion order.
    sort.Slice(tasks, func(i, j int) bool {
        return tasks[i].Priority < tasks[j].Priority
    })
    for _, t := range tasks {
        fmt.Printf("[P%d] %s (order: %d)\\n", t.Priority, t.Name, t.Order)
    }
}`,
      solution: `package main

import (
    "fmt"
    "sort"
)

type Task struct {
    Priority int
    Name     string
    Order    int
}

func main() {
    tasks := []Task{
        {2, "Review PR", 1},
        {1, "Fix bug", 2},
        {2, "Write tests", 3},
        {1, "Deploy", 4},
    }
    sort.SliceStable(tasks, func(i, j int) bool {
        return tasks[i].Priority < tasks[j].Priority
    })
    for _, t := range tasks {
        fmt.Printf("[P%d] %s (order: %d)\\n", t.Priority, t.Name, t.Order)
    }
}`,
      hints: [
        'sort.Slice does not guarantee stability.',
        'sort.SliceStable preserves relative order of equal elements.',
        'Tasks with the same priority keep their original order.',
      ],
      concepts: ['sort.SliceStable', 'stability', 'sort.Slice'],
    },
    {
      id: 'go-srt-15',
      title: 'Fix Off-by-One in Search',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Fix an incorrect sort.Search that misses boundary values.',
      skeleton: `package main

import (
    "fmt"
    "sort"
)

func insertionPoint(sorted []int, val int) int {
    // BUG: Returns wrong index for values that exist in the slice
    return sort.Search(len(sorted), func(i int) bool {
        return sorted[i] > val
    })
}

func main() {
    nums := []int{1, 3, 5, 7, 9}
    // Should find index 2 for value 5
    idx := insertionPoint(nums, 5)
    if idx < len(nums) && nums[idx] == 5 {
        fmt.Printf("Found 5 at index %d\\n", idx)
    } else {
        fmt.Printf("5 not found (got index %d)\\n", idx)
    }
}`,
      solution: `package main

import (
    "fmt"
    "sort"
)

func insertionPoint(sorted []int, val int) int {
    return sort.Search(len(sorted), func(i int) bool {
        return sorted[i] >= val
    })
}

func main() {
    nums := []int{1, 3, 5, 7, 9}
    idx := insertionPoint(nums, 5)
    if idx < len(nums) && nums[idx] == 5 {
        fmt.Printf("Found 5 at index %d\\n", idx)
    } else {
        fmt.Printf("5 not found (got index %d)\\n", idx)
    }
}`,
      hints: [
        'sort.Search finds the smallest index where f returns true.',
        'Using > val finds the index after val, not at val.',
        'Use >= val to find the index where val would be.',
      ],
      concepts: ['sort.Search', 'binary search', 'boundary'],
    },
    {
      id: 'go-srt-16',
      title: 'Top-K Elements',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a function to get the top K largest elements from a slice.',
      skeleton: `package main

import (
    "fmt"
    "sort"
)

// topK returns the k largest elements in descending order.
// Does not modify the original slice.
func topK(nums []int, k int) []int {
    // TODO: implement
}

func main() {
    nums := []int{3, 1, 4, 1, 5, 9, 2, 6, 5, 3}
    fmt.Println(topK(nums, 3))
    fmt.Println(topK(nums, 5))
}`,
      solution: `package main

import (
    "fmt"
    "sort"
)

func topK(nums []int, k int) []int {
    sorted := make([]int, len(nums))
    copy(sorted, nums)
    sort.Sort(sort.Reverse(sort.IntSlice(sorted)))
    if k > len(sorted) {
        k = len(sorted)
    }
    return sorted[:k]
}

func main() {
    nums := []int{3, 1, 4, 1, 5, 9, 2, 6, 5, 3}
    fmt.Println(topK(nums, 3))
    fmt.Println(topK(nums, 5))
}`,
      hints: [
        'Copy the slice first to avoid modifying the original.',
        'Sort in descending order, then take the first k elements.',
        'Handle the case where k > len(nums).',
      ],
      concepts: ['sort.Reverse', 'copy', 'top-k'],
    },
    {
      id: 'go-srt-17',
      title: 'Custom Sort with Tiebreaker',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Implement sort.Interface with multiple tiebreaker fields.',
      skeleton: `package main

import (
    "fmt"
    "sort"
)

type Match struct {
    Team   string
    Wins   int
    Draws  int
    Points int
}

type LeagueTable []Match

// Implement sort.Interface to sort by:
// 1. Points descending
// 2. Wins descending (tiebreaker)
// 3. Team name ascending (final tiebreaker)
// TODO: implement Len, Less, Swap

func main() {
    table := LeagueTable{
        {"Arsenal", 8, 2, 26},
        {"Chelsea", 7, 5, 26},
        {"Liverpool", 9, 1, 28},
        {"ManCity", 8, 4, 28},
    }
    sort.Sort(table)
    for i, m := range table {
        fmt.Printf("%d. %-12s W:%d D:%d Pts:%d\\n", i+1, m.Team, m.Wins, m.Draws, m.Points)
    }
}`,
      solution: `package main

import (
    "fmt"
    "sort"
)

type Match struct {
    Team   string
    Wins   int
    Draws  int
    Points int
}

type LeagueTable []Match

func (t LeagueTable) Len() int { return len(t) }
func (t LeagueTable) Less(i, j int) bool {
    if t[i].Points != t[j].Points {
        return t[i].Points > t[j].Points
    }
    if t[i].Wins != t[j].Wins {
        return t[i].Wins > t[j].Wins
    }
    return t[i].Team < t[j].Team
}
func (t LeagueTable) Swap(i, j int) { t[i], t[j] = t[j], t[i] }

func main() {
    table := LeagueTable{
        {"Arsenal", 8, 2, 26},
        {"Chelsea", 7, 5, 26},
        {"Liverpool", 9, 1, 28},
        {"ManCity", 8, 4, 28},
    }
    sort.Sort(table)
    for i, m := range table {
        fmt.Printf("%d. %-12s W:%d D:%d Pts:%d\\n", i+1, m.Team, m.Wins, m.Draws, m.Points)
    }
}`,
      hints: [
        'Check primary key first; if equal, check secondary.',
        'Points and Wins use > for descending.',
        'Team name uses < for ascending (alphabetical).',
      ],
      concepts: ['sort.Interface', 'multi-key sort', 'tiebreaker'],
    },
    {
      id: 'go-srt-18',
      title: 'Median Using Sort',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a function to compute the median of a slice using sort.',
      skeleton: `package main

import (
    "fmt"
    "sort"
)

// median returns the median value of a float64 slice.
// For odd length, return the middle value.
// For even length, return the average of the two middle values.
// Do not modify the original slice.
func median(nums []float64) float64 {
    // TODO: implement
}

func main() {
    fmt.Println(median([]float64{3, 1, 4, 1, 5}))
    fmt.Println(median([]float64{3, 1, 4, 2}))
}`,
      solution: `package main

import (
    "fmt"
    "sort"
)

func median(nums []float64) float64 {
    sorted := make([]float64, len(nums))
    copy(sorted, nums)
    sort.Float64s(sorted)
    n := len(sorted)
    if n%2 == 1 {
        return sorted[n/2]
    }
    return (sorted[n/2-1] + sorted[n/2]) / 2
}

func main() {
    fmt.Println(median([]float64{3, 1, 4, 1, 5}))
    fmt.Println(median([]float64{3, 1, 4, 2}))
}`,
      hints: [
        'Copy first, then sort the copy.',
        'For odd length n, median is at index n/2.',
        'For even length, average the two middle elements.',
      ],
      concepts: ['sort.Float64s', 'median', 'statistics'],
    },
    {
      id: 'go-srt-19',
      title: 'Refactor Manual Bubble Sort',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor a manual bubble sort to use the sort package.',
      skeleton: `package main

import "fmt"

type Product struct {
    Name  string
    Price float64
}

func sortProducts(products []Product) {
    n := len(products)
    for i := 0; i < n-1; i++ {
        for j := 0; j < n-i-1; j++ {
            if products[j].Price > products[j+1].Price {
                products[j], products[j+1] = products[j+1], products[j]
            }
        }
    }
}

func main() {
    products := []Product{
        {"Laptop", 999.99},
        {"Mouse", 29.99},
        {"Keyboard", 79.99},
    }
    sortProducts(products)
    for _, p := range products {
        fmt.Printf("%s: $%.2f\\n", p.Name, p.Price)
    }
}`,
      solution: `package main

import (
    "fmt"
    "sort"
)

type Product struct {
    Name  string
    Price float64
}

func sortProducts(products []Product) {
    sort.Slice(products, func(i, j int) bool {
        return products[i].Price < products[j].Price
    })
}

func main() {
    products := []Product{
        {"Laptop", 999.99},
        {"Mouse", 29.99},
        {"Keyboard", 79.99},
    }
    sortProducts(products)
    for _, p := range products {
        fmt.Printf("%s: $%.2f\\n", p.Name, p.Price)
    }
}`,
      hints: [
        'Replace the bubble sort with sort.Slice.',
        'The comparison logic stays the same: Price ascending.',
        'sort.Slice uses an optimized algorithm internally.',
      ],
      concepts: ['sort.Slice', 'refactoring', 'algorithm'],
    },
    {
      id: 'go-srt-20',
      title: 'Refactor to Reusable Sort Type',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor repeated sort.Slice calls into a reusable sort.Interface type.',
      skeleton: `package main

import (
    "fmt"
    "sort"
)

type Event struct {
    Name string
    Date string
    Cost int
}

func main() {
    events := []Event{
        {"Concert", "2024-03-15", 50},
        {"Movie", "2024-01-20", 15},
        {"Theater", "2024-02-10", 80},
    }

    // Sort by date - repeated everywhere
    sort.Slice(events, func(i, j int) bool {
        return events[i].Date < events[j].Date
    })
    fmt.Println("By date:")
    for _, e := range events {
        fmt.Printf("  %s %s $%d\\n", e.Date, e.Name, e.Cost)
    }

    // Sort by cost - repeated everywhere
    sort.Slice(events, func(i, j int) bool {
        return events[i].Cost < events[j].Cost
    })
    fmt.Println("By cost:")
    for _, e := range events {
        fmt.Printf("  %s %s $%d\\n", e.Date, e.Name, e.Cost)
    }
}`,
      solution: `package main

import (
    "fmt"
    "sort"
)

type Event struct {
    Name string
    Date string
    Cost int
}

type Events []Event

func (e Events) Len() int      { return len(e) }
func (e Events) Swap(i, j int) { e[i], e[j] = e[j], e[i] }

type ByDate struct{ Events }

func (e ByDate) Less(i, j int) bool { return e.Events[i].Date < e.Events[j].Date }

type ByCost struct{ Events }

func (e ByCost) Less(i, j int) bool { return e.Events[i].Cost < e.Events[j].Cost }

func main() {
    events := Events{
        {"Concert", "2024-03-15", 50},
        {"Movie", "2024-01-20", 15},
        {"Theater", "2024-02-10", 80},
    }

    sort.Sort(ByDate{events})
    fmt.Println("By date:")
    for _, e := range events {
        fmt.Printf("  %s %s $%d\\n", e.Date, e.Name, e.Cost)
    }

    sort.Sort(ByCost{events})
    fmt.Println("By cost:")
    for _, e := range events {
        fmt.Printf("  %s %s $%d\\n", e.Date, e.Name, e.Cost)
    }
}`,
      hints: [
        'Create a base Events type with shared Len and Swap.',
        'Create ByDate and ByCost types that embed Events.',
        'Each only needs to implement Less differently.',
      ],
      concepts: ['sort.Interface', 'embedding', 'reusable sort'],
    },
  ],
};
