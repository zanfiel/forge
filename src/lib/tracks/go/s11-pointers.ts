import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-ptr',
  title: '11. Pointers',
  explanation: `## Pointers in Go

Pointers hold the memory address of a value. Go uses pointers for efficiency and to allow functions to modify values.

\`\`\`go
// & -- address-of operator
x := 42
p := &x   // p is *int, points to x

// * -- dereference operator
fmt.Println(*p)  // 42
*p = 100         // modifies x through the pointer

// new() -- allocates and returns a pointer
q := new(int)    // *int pointing to 0

// nil pointer
var ptr *int     // nil
if ptr == nil { fmt.Println("nil pointer") }

// Pointer to struct -- auto-dereference
type Point struct { X, Y int }
p := &Point{1, 2}
p.X = 10  // equivalent to (*p).X = 10

// No pointer arithmetic in Go
// p++  // not allowed
\`\`\`

Use pointers when you need to modify a value through a function parameter or avoid copying large structs.`,
  exercises: [
    {
      id: 'go-ptr-1',
      title: 'Address-Of Operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use the & operator to get the address of a variable.',
      skeleton: `package main

import "fmt"

func main() {
    x := 42
    p := __BLANK__x
    fmt.Println(*p)
}`,
      solution: `package main

import "fmt"

func main() {
    x := 42
    p := &x
    fmt.Println(*p)
}`,
      hints: [
        'The & operator returns the address of a variable.',
        'p := &x makes p a pointer to x.',
        '*p dereferences the pointer to get the value.',
      ],
      concepts: ['address-of operator', 'pointer creation', 'dereferencing'],
    },
    {
      id: 'go-ptr-2',
      title: 'Dereference Operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use the * operator to modify a value through a pointer.',
      skeleton: `package main

import "fmt"

func main() {
    x := 10
    p := &x
    __BLANK__p = 20
    fmt.Println(x) // 20
}`,
      solution: `package main

import "fmt"

func main() {
    x := 10
    p := &x
    *p = 20
    fmt.Println(x) // 20
}`,
      hints: [
        'The * operator dereferences a pointer to access the value.',
        '*p = 20 sets the value that p points to.',
        'This modifies x because p points to x.',
      ],
      concepts: ['dereference', 'pointer modification', 'indirect access'],
    },
    {
      id: 'go-ptr-3',
      title: 'Pointer to Struct',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Create a pointer to a struct and access its fields.',
      skeleton: `package main

import "fmt"

type User struct {
    Name string
    Age  int
}

func main() {
    u := __BLANK__User{Name: "Alice", Age: 30}
    u.Name = "Bob"  // auto-dereference
    fmt.Println(u)
}`,
      solution: `package main

import "fmt"

type User struct {
    Name string
    Age  int
}

func main() {
    u := &User{Name: "Alice", Age: 30}
    u.Name = "Bob"  // auto-dereference
    fmt.Println(u)
}`,
      hints: [
        'Use & before a struct literal to get a pointer.',
        '&User{...} returns *User.',
        'Go auto-dereferences struct pointers for field access.',
      ],
      concepts: ['pointer to struct', 'auto-dereference', '&literal'],
    },
    {
      id: 'go-ptr-4',
      title: 'New Built-in',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use new() to allocate a zero-valued pointer.',
      skeleton: `package main

import "fmt"

func main() {
    p := __BLANK__(int)
    *p = 42
    fmt.Println(*p)
}`,
      solution: `package main

import "fmt"

func main() {
    p := new(int)
    *p = 42
    fmt.Println(*p)
}`,
      hints: [
        'new(T) allocates memory for type T and returns *T.',
        'The memory is zero-initialized.',
        'new(int) returns *int pointing to 0.',
      ],
      concepts: ['new built-in', 'zero allocation', 'pointer initialization'],
    },
    {
      id: 'go-ptr-5',
      title: 'Nil Pointer Check',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Check for a nil pointer before dereferencing.',
      skeleton: `package main

import "fmt"

func safePrint(p *int) {
    if p __BLANK__ nil {
        fmt.Println("nil pointer!")
        return
    }
    fmt.Println(*p)
}

func main() {
    safePrint(nil)
    x := 42
    safePrint(&x)
}`,
      solution: `package main

import "fmt"

func safePrint(p *int) {
    if p == nil {
        fmt.Println("nil pointer!")
        return
    }
    fmt.Println(*p)
}

func main() {
    safePrint(nil)
    x := 42
    safePrint(&x)
}`,
      hints: [
        'Compare the pointer to nil to check if it is valid.',
        'Use == for comparison.',
        'Always check for nil before dereferencing.',
      ],
      concepts: ['nil pointer', 'nil check', 'safety'],
    },
    {
      id: 'go-ptr-6',
      title: 'Pointer Parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Pass a pointer to a function to modify the caller variable.',
      skeleton: `package main

import "fmt"

func double(p __BLANK__) {
    *p *= 2
}

func main() {
    x := 21
    double(__BLANK__)
    fmt.Println(x) // 42
}`,
      solution: `package main

import "fmt"

func double(p *int) {
    *p *= 2
}

func main() {
    x := 21
    double(&x)
    fmt.Println(x) // 42
}`,
      hints: [
        'The parameter type is *int (pointer to int).',
        'Pass &x to send the address of x.',
        'Inside the function, *p accesses the original variable.',
      ],
      concepts: ['pointer parameter', 'pass by reference', 'address-of'],
    },
    {
      id: 'go-ptr-7',
      title: 'Predict Pointer Value',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the output after modifying a value through a pointer.',
      skeleton: `package main

import "fmt"

func main() {
    a := 10
    b := &a
    *b = 20
    c := &a
    *c = 30
    fmt.Println(a)
}`,
      solution: `30`,
      hints: [
        'Both b and c point to a.',
        '*b = 20 sets a to 20.',
        '*c = 30 then sets a to 30.',
      ],
      concepts: ['pointer aliasing', 'shared reference', 'modification order'],
    },
    {
      id: 'go-ptr-8',
      title: 'Predict Pointer Independence',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the output when pointer assignment creates two independent pointers.',
      skeleton: `package main

import "fmt"

func main() {
    x := 10
    p := &x
    q := new(int)
    *q = *p
    *q = 99
    fmt.Println(x, *p, *q)
}`,
      solution: `10 10 99`,
      hints: [
        '*q = *p copies the value, not the pointer.',
        'q points to a different allocation than p.',
        'Modifying *q does not affect x or *p.',
      ],
      concepts: ['value copy', 'independent pointers', 'dereferencing'],
    },
    {
      id: 'go-ptr-9',
      title: 'Swap with Pointers',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a function that swaps two integers using pointers.',
      skeleton: `package main

import "fmt"

func swap(a, b *int) {
    // Swap the values that a and b point to
}

func main() {
    x, y := 10, 20
    swap(&x, &y)
    fmt.Println(x, y) // 20 10
}`,
      solution: `package main

import "fmt"

func swap(a, b *int) {
    *a, *b = *b, *a
}

func main() {
    x, y := 10, 20
    swap(&x, &y)
    fmt.Println(x, y) // 20 10
}`,
      hints: [
        'Dereference both pointers to access the values.',
        'Use Go multiple assignment to swap: *a, *b = *b, *a.',
        'This modifies the original variables through their pointers.',
      ],
      concepts: ['pointer swap', 'multiple assignment', 'dereferencing'],
    },
    {
      id: 'go-ptr-10',
      title: 'Linked List Append',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that appends to a linked list using pointer-to-pointer.',
      skeleton: `package main

import "fmt"

type Node struct {
    Val  int
    Next *Node
}

func append(head **Node, val int) {
    // Append a new node to the end of the list
}

func printList(head *Node) {
    for head != nil {
        fmt.Print(head.Val, " ")
        head = head.Next
    }
    fmt.Println()
}

func main() {
    var head *Node
    append(&head, 1)
    append(&head, 2)
    append(&head, 3)
    printList(head) // 1 2 3
}`,
      solution: `package main

import "fmt"

type Node struct {
    Val  int
    Next *Node
}

func appendNode(head **Node, val int) {
    newNode := &Node{Val: val}
    if *head == nil {
        *head = newNode
        return
    }
    curr := *head
    for curr.Next != nil {
        curr = curr.Next
    }
    curr.Next = newNode
}

func printList(head *Node) {
    for head != nil {
        fmt.Print(head.Val, " ")
        head = head.Next
    }
    fmt.Println()
}

func main() {
    var head *Node
    appendNode(&head, 1)
    appendNode(&head, 2)
    appendNode(&head, 3)
    printList(head) // 1 2 3
}`,
      hints: [
        'Use **Node to modify the head pointer itself.',
        'If *head is nil, set it to the new node.',
        'Otherwise traverse to the end and attach.',
      ],
      concepts: ['pointer to pointer', 'linked list', 'append operation'],
    },
    {
      id: 'go-ptr-11',
      title: 'Fix Nil Dereference',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the nil pointer dereference panic.',
      skeleton: `package main

import "fmt"

type Config struct {
    Debug bool
}

func isDebug(c *Config) bool {
    return c.Debug // panics if c is nil
}

func main() {
    fmt.Println(isDebug(nil))
}`,
      solution: `package main

import "fmt"

type Config struct {
    Debug bool
}

func isDebug(c *Config) bool {
    if c == nil {
        return false
    }
    return c.Debug
}

func main() {
    fmt.Println(isDebug(nil))
}`,
      hints: [
        'Dereferencing a nil pointer causes a runtime panic.',
        'Check if the pointer is nil before accessing fields.',
        'Return a sensible default when the pointer is nil.',
      ],
      concepts: ['nil dereference', 'nil check', 'defensive programming'],
    },
    {
      id: 'go-ptr-12',
      title: 'Fix Return Local Pointer',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Verify that returning a pointer to a local variable is safe in Go.',
      skeleton: `package main

import "fmt"

func makeValue() *int {
    x := 42
    return &x  // Is this safe?
}

func main() {
    p := makeValue()
    fmt.Println(*p)
    // In C this would be a dangling pointer, but in Go...
}`,
      solution: `package main

import "fmt"

func makeValue() *int {
    x := 42
    return &x  // Safe! Go's escape analysis allocates x on the heap
}

func main() {
    p := makeValue()
    fmt.Println(*p) // 42
}`,
      hints: [
        'In Go, returning a pointer to a local variable is perfectly safe.',
        'The compiler uses escape analysis to allocate x on the heap.',
        'This is different from C/C++ where it would be a dangling pointer.',
      ],
      concepts: ['escape analysis', 'heap allocation', 'safe return'],
    },
    {
      id: 'go-ptr-13',
      title: 'Fix Pointer to Loop Variable',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the bug where all pointers point to the same loop variable.',
      skeleton: `package main

import "fmt"

func main() {
    nums := []int{1, 2, 3}
    ptrs := make([]*int, len(nums))
    for i, v := range nums {
        ptrs[i] = &v  // Bug: all point to v
    }
    for _, p := range ptrs {
        fmt.Print(*p, " ")
    }
}`,
      solution: `package main

import "fmt"

func main() {
    nums := []int{1, 2, 3}
    ptrs := make([]*int, len(nums))
    for i := range nums {
        ptrs[i] = &nums[i]
    }
    for _, p := range ptrs {
        fmt.Print(*p, " ")
    }
}`,
      hints: [
        'The range variable v is reused each iteration.',
        'All pointers end up pointing to the same v (value 3).',
        'Point to the slice element directly: &nums[i].',
      ],
      concepts: ['loop variable capture', 'pointer to range var', 'address of element'],
    },
    {
      id: 'go-ptr-14',
      title: 'No Pointer Arithmetic',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Understand that Go does not support pointer arithmetic.',
      skeleton: `package main

import "fmt"

func main() {
    x := [3]int{10, 20, 30}
    p := &x[0]
    // p++  // This would be a compile error in Go
    fmt.Println(*p)
    p = &x[1]  // Must use indexing instead
    fmt.Println(*p)
}`,
      solution: `10
20`,
      hints: [
        'Go does not allow pointer arithmetic (no p++ or p+1).',
        'You must use array/slice indexing to access other elements.',
        '*p first prints x[0]=10, then p is set to &x[1] and prints 20.',
      ],
      concepts: ['no pointer arithmetic', 'safety', 'indexing'],
    },
    {
      id: 'go-ptr-15',
      title: 'Pointer Receiver Choice',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use pointer receivers appropriately for a mutable data structure.',
      skeleton: `package main

import "fmt"

type Stack struct {
    data []int
}

// Push adds an element -- needs pointer receiver
// Pop removes and returns top element -- needs pointer receiver
// Peek returns top element -- can use value receiver
// IsEmpty returns true if empty -- can use value receiver

func main() {
    s := &Stack{}
    s.Push(10)
    s.Push(20)
    fmt.Println(s.Peek())    // 20
    fmt.Println(s.Pop())     // 20
    fmt.Println(s.IsEmpty()) // false
}`,
      solution: `package main

import "fmt"

type Stack struct {
    data []int
}

func (s *Stack) Push(val int) {
    s.data = append(s.data, val)
}

func (s *Stack) Pop() int {
    n := len(s.data)
    val := s.data[n-1]
    s.data = s.data[:n-1]
    return val
}

func (s *Stack) Peek() int {
    return s.data[len(s.data)-1]
}

func (s *Stack) IsEmpty() bool {
    return len(s.data) == 0
}

func main() {
    s := &Stack{}
    s.Push(10)
    s.Push(20)
    fmt.Println(s.Peek())    // 20
    fmt.Println(s.Pop())     // 20
    fmt.Println(s.IsEmpty()) // false
}`,
      hints: [
        'Push and Pop modify the slice, so they need pointer receivers.',
        'For consistency, use pointer receivers on all methods.',
        'Push appends, Pop removes last element.',
      ],
      concepts: ['pointer receiver', 'data structure', 'consistent receivers'],
    },
    {
      id: 'go-ptr-16',
      title: 'Optional Value Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use a pointer to represent an optional value (nil = absent).',
      skeleton: `package main

import "fmt"

func findFirst(nums []int, pred func(int) bool) *int {
    // Return pointer to first matching element, or nil
}

func main() {
    nums := []int{1, 3, 5, 4, 7}
    even := findFirst(nums, func(n int) bool { return n%2 == 0 })
    if even != nil {
        fmt.Println("Found:", *even) // Found: 4
    }
    big := findFirst(nums, func(n int) bool { return n > 100 })
    fmt.Println(big == nil) // true
}`,
      solution: `package main

import "fmt"

func findFirst(nums []int, pred func(int) bool) *int {
    for _, n := range nums {
        if pred(n) {
            result := n
            return &result
        }
    }
    return nil
}

func main() {
    nums := []int{1, 3, 5, 4, 7}
    even := findFirst(nums, func(n int) bool { return n%2 == 0 })
    if even != nil {
        fmt.Println("Found:", *even) // Found: 4
    }
    big := findFirst(nums, func(n int) bool { return n > 100 })
    fmt.Println(big == nil) // true
}`,
      hints: [
        'Use a pointer return type to represent optional values.',
        'Return a pointer to the value if found, nil if not.',
        'Copy the value to a local variable before taking its address.',
      ],
      concepts: ['optional value', 'nil as absent', 'pointer return'],
    },
    {
      id: 'go-ptr-17',
      title: 'Predict Pointer Equality',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict pointer equality comparisons.',
      skeleton: `package main

import "fmt"

func main() {
    a := 42
    b := 42
    pa := &a
    pb := &b
    pc := &a
    fmt.Println(pa == pc)
    fmt.Println(pa == pb)
    fmt.Println(*pa == *pb)
}`,
      solution: `true
false
true`,
      hints: [
        'pa and pc both point to a, so they are equal.',
        'pa and pb point to different variables, so they are not equal.',
        '*pa and *pb both have value 42, so dereferenced values are equal.',
      ],
      concepts: ['pointer equality', 'address comparison', 'value comparison'],
    },
    {
      id: 'go-ptr-18',
      title: 'Refactor to Pointer Parameter',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Refactor a function to use a pointer parameter instead of returning a value.',
      skeleton: `package main

import "fmt"

type Stats struct {
    Min, Max, Sum int
}

func computeStats(nums []int) Stats {
    s := Stats{Min: nums[0], Max: nums[0]}
    for _, n := range nums {
        if n < s.Min {
            s.Min = n
        }
        if n > s.Max {
            s.Max = n
        }
        s.Sum += n
    }
    return s
}

func main() {
    s := computeStats([]int{3, 1, 4, 1, 5, 9})
    fmt.Println(s)
}`,
      solution: `package main

import "fmt"

type Stats struct {
    Min, Max, Sum int
}

func computeStats(nums []int, s *Stats) {
    s.Min = nums[0]
    s.Max = nums[0]
    s.Sum = 0
    for _, n := range nums {
        if n < s.Min {
            s.Min = n
        }
        if n > s.Max {
            s.Max = n
        }
        s.Sum += n
    }
}

func main() {
    var s Stats
    computeStats([]int{3, 1, 4, 1, 5, 9}, &s)
    fmt.Println(s)
}`,
      hints: [
        'Accept a *Stats parameter instead of returning Stats.',
        'Modify the stats through the pointer.',
        'This avoids copying the struct on return.',
      ],
      concepts: ['pointer parameter', 'output parameter', 'avoid copying'],
    },
    {
      id: 'go-ptr-19',
      title: 'Refactor to Value Return',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor unnecessary pointer usage to simpler value returns.',
      skeleton: `package main

import "fmt"

func add(a, b *int) *int {
    result := *a + *b
    return &result
}

func main() {
    x, y := 10, 20
    sum := add(&x, &y)
    fmt.Println(*sum)
}`,
      solution: `package main

import "fmt"

func add(a, b int) int {
    return a + b
}

func main() {
    x, y := 10, 20
    sum := add(x, y)
    fmt.Println(sum)
}`,
      hints: [
        'Not everything needs pointers -- small values like int are cheap to copy.',
        'Remove the pointer indirection for simpler, clearer code.',
        'Use pointers only when you need to modify the caller value or avoid large copies.',
      ],
      concepts: ['value semantics', 'unnecessary pointers', 'simplification'],
    },
    {
      id: 'go-ptr-20',
      title: 'Trie Insert',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Implement a trie insert using pointer manipulation.',
      skeleton: `package main

import "fmt"

type TrieNode struct {
    children map[byte]*TrieNode
    isEnd    bool
}

func NewTrieNode() *TrieNode {
    return &TrieNode{children: make(map[byte]*TrieNode)}
}

func (t *TrieNode) Insert(word string) {
    // Insert word into the trie
}

func (t *TrieNode) Search(word string) bool {
    // Return true if word exists in the trie
}

func main() {
    root := NewTrieNode()
    root.Insert("go")
    root.Insert("gopher")
    fmt.Println(root.Search("go"))      // true
    fmt.Println(root.Search("gopher"))  // true
    fmt.Println(root.Search("gop"))     // false
}`,
      solution: `package main

import "fmt"

type TrieNode struct {
    children map[byte]*TrieNode
    isEnd    bool
}

func NewTrieNode() *TrieNode {
    return &TrieNode{children: make(map[byte]*TrieNode)}
}

func (t *TrieNode) Insert(word string) {
    node := t
    for i := 0; i < len(word); i++ {
        c := word[i]
        if _, ok := node.children[c]; !ok {
            node.children[c] = NewTrieNode()
        }
        node = node.children[c]
    }
    node.isEnd = true
}

func (t *TrieNode) Search(word string) bool {
    node := t
    for i := 0; i < len(word); i++ {
        c := word[i]
        child, ok := node.children[c]
        if !ok {
            return false
        }
        node = child
    }
    return node.isEnd
}

func main() {
    root := NewTrieNode()
    root.Insert("go")
    root.Insert("gopher")
    fmt.Println(root.Search("go"))      // true
    fmt.Println(root.Search("gopher"))  // true
    fmt.Println(root.Search("gop"))     // false
}`,
      hints: [
        'Traverse the trie character by character, creating nodes as needed.',
        'Mark the last node of a word with isEnd = true.',
        'Search follows the same path and checks isEnd at the end.',
      ],
      concepts: ['trie data structure', 'pointer traversal', 'map of pointers'],
    },
  ],
};
