import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-gen',
  title: '30. Generics',
  explanation: `## Generics in Go

Go 1.18 introduced generics with type parameters, enabling type-safe code that works across multiple types without duplication.

\`\`\`go
// Generic function
func Map[T any, U any](s []T, f func(T) U) []U {
    result := make([]U, len(s))
    for i, v := range s {
        result[i] = f(v)
    }
    return result
}

// Type constraints
type Number interface {
    ~int | ~float64 | ~int64
}

func Sum[T Number](nums []T) T {
    var total T
    for _, n := range nums {
        total += n
    }
    return total
}

// Generic type
type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(v T) { s.items = append(s.items, v) }
func (s *Stack[T]) Pop() T {
    v := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return v
}

// comparable constraint for map keys
func Contains[T comparable](s []T, target T) bool {
    for _, v := range s {
        if v == target { return true }
    }
    return false
}
\`\`\``,
  exercises: [
    {
      id: 'go-gen-1',
      title: 'Generic Identity Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a generic function that returns its argument unchanged.',
      skeleton: `package main

import "fmt"

func Identity[T __BLANK__](v T) T {
    return v
}

func main() {
    fmt.Println(Identity(42))
    fmt.Println(Identity("hello"))
}`,
      solution: `package main

import "fmt"

func Identity[T any](v T) T {
    return v
}

func main() {
    fmt.Println(Identity(42))
    fmt.Println(Identity("hello"))
}`,
      hints: [
        'any is the universal constraint (alias for interface{}).',
        'Type parameters go in square brackets before the function params.',
        'T any means T can be any type.',
      ],
      concepts: ['type parameters', 'any constraint'],
    },
    {
      id: 'go-gen-2',
      title: 'Generic Contains',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a generic contains function for comparable types.',
      skeleton: `package main

func Contains[T __BLANK__](s []T, target T) bool {
    for _, v := range s {
        if v == target {
            return true
        }
    }
    return false
}`,
      solution: `package main

func Contains[T comparable](s []T, target T) bool {
    for _, v := range s {
        if v == target {
            return true
        }
    }
    return false
}`,
      hints: [
        'comparable allows == and != operators.',
        'Not all types are comparable (e.g., slices are not).',
        'Use comparable when you need equality checks.',
      ],
      concepts: ['comparable', 'equality constraint'],
    },
    {
      id: 'go-gen-3',
      title: 'Type Constraint Interface',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Define a type constraint for numeric types.',
      skeleton: `package main

type Number __BLANK__ {
    ~int | ~int8 | ~int16 | ~int32 | ~int64 |
    ~float32 | ~float64
}

func Sum[T Number](nums []T) T {
    var total T
    for _, n := range nums {
        total += n
    }
    return total
}`,
      solution: `package main

type Number interface {
    ~int | ~int8 | ~int16 | ~int32 | ~int64 |
    ~float32 | ~float64
}

func Sum[T Number](nums []T) T {
    var total T
    for _, n := range nums {
        total += n
    }
    return total
}`,
      hints: [
        'Type constraints are defined as interfaces.',
        'The ~ prefix includes types with the underlying type.',
        'Union | lists all accepted types.',
      ],
      concepts: ['type constraints', 'interface constraint', 'tilde operator'],
    },
    {
      id: 'go-gen-4',
      title: 'Tilde Operator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use the tilde operator to accept custom types with the same underlying type.',
      skeleton: `package main

type Ordered interface {
    __BLANK__int | __BLANK__float64 | __BLANK__string
}

type UserID int
type Score float64

func Max[T Ordered](a, b T) T {
    if a > b {
        return a
    }
    return b
}`,
      solution: `package main

type Ordered interface {
    ~int | ~float64 | ~string
}

type UserID int
type Score float64

func Max[T Ordered](a, b T) T {
    if a > b {
        return a
    }
    return b
}`,
      hints: [
        '~ means "any type whose underlying type is..."',
        '~int matches int and any type defined as type X int.',
        'Without ~, only the exact type matches.',
      ],
      concepts: ['tilde operator', 'underlying type'],
    },
    {
      id: 'go-gen-5',
      title: 'Generic Map Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a generic Map function that transforms a slice.',
      skeleton: `package main

// Map applies function f to each element of s
// and returns a new slice with the results
func Map[T any, U any](s []T, f func(T) U) []U {
}`,
      solution: `package main

func Map[T any, U any](s []T, f func(T) U) []U {
    result := make([]U, len(s))
    for i, v := range s {
        result[i] = f(v)
    }
    return result
}`,
      hints: [
        'Two type parameters: T for input, U for output.',
        'Use make to allocate the result slice.',
        'Apply f to each element and store the result.',
      ],
      concepts: ['multiple type parameters', 'transformation'],
    },
    {
      id: 'go-gen-6',
      title: 'Generic Filter Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a generic Filter function that keeps elements matching a predicate.',
      skeleton: `package main

// Filter returns elements of s for which pred returns true
func Filter[T any](s []T, pred func(T) bool) []T {
}`,
      solution: `package main

func Filter[T any](s []T, pred func(T) bool) []T {
    var result []T
    for _, v := range s {
        if pred(v) {
            result = append(result, v)
        }
    }
    return result
}`,
      hints: [
        'Start with a nil slice and append matching elements.',
        'The predicate function returns true for elements to keep.',
        'The result may be shorter than the input.',
      ],
      concepts: ['filter pattern', 'predicate function'],
    },
    {
      id: 'go-gen-7',
      title: 'Generic Stack Type',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Implement a generic stack with Push, Pop, and IsEmpty methods.',
      skeleton: `package main

type Stack[T any] struct {
    items []T
}

// Implement Push, Pop, and IsEmpty for Stack[T]`,
      solution: `package main

type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(v T) {
    s.items = append(s.items, v)
}

func (s *Stack[T]) Pop() (T, bool) {
    if len(s.items) == 0 {
        var zero T
        return zero, false
    }
    v := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return v, true
}

func (s *Stack[T]) IsEmpty() bool {
    return len(s.items) == 0
}`,
      hints: [
        'Methods use [T] in the receiver, not [T any].',
        'Pop should handle empty stack safely.',
        'Use var zero T for the zero value of any type.',
      ],
      concepts: ['generic type', 'methods on generic types', 'zero value'],
    },
    {
      id: 'go-gen-8',
      title: 'Generic Map (data structure)',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a generic function that converts a slice to a map using a key function.',
      skeleton: `package main

// ToMap converts a slice to a map using keyFn to extract keys
func ToMap[K comparable, V any](items []V, keyFn func(V) K) map[K]V {
}`,
      solution: `package main

func ToMap[K comparable, V any](items []V, keyFn func(V) K) map[K]V {
    m := make(map[K]V, len(items))
    for _, item := range items {
        m[keyFn(item)] = item
    }
    return m
}`,
      hints: [
        'Map keys must be comparable.',
        'The key function extracts a key from each value.',
        'Pre-allocate the map with make for efficiency.',
      ],
      concepts: ['comparable constraint', 'slice to map'],
    },
    {
      id: 'go-gen-9',
      title: 'Generic Reduce',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a generic Reduce function that folds a slice into a single value.',
      skeleton: `package main

// Reduce folds slice s into a single value starting with initial
func Reduce[T any, U any](s []T, initial U, fn func(U, T) U) U {
}`,
      solution: `package main

func Reduce[T any, U any](s []T, initial U, fn func(U, T) U) U {
    acc := initial
    for _, v := range s {
        acc = fn(acc, v)
    }
    return acc
}`,
      hints: [
        'Start with the initial value as the accumulator.',
        'Apply fn to accumulator and each element.',
        'The result type U can differ from the element type T.',
      ],
      concepts: ['reduce/fold', 'accumulator pattern'],
    },
    {
      id: 'go-gen-10',
      title: 'Constraint with Method',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a constraint that requires a String() method, then use it.',
      skeleton: `package main

import "fmt"

// Stringer constraint requires a String() method
// Write JoinStrings that calls String() on each element

type Stringer interface {
    String() string
}

func JoinStrings[T Stringer](items []T, sep string) string {
}`,
      solution: `package main

import "strings"

type Stringer interface {
    String() string
}

func JoinStrings[T Stringer](items []T, sep string) string {
    parts := make([]string, len(items))
    for i, item := range items {
        parts[i] = item.String()
    }
    return strings.Join(parts, sep)
}`,
      hints: [
        'Interface constraints can require methods.',
        'The constraint guarantees T has a String() method.',
        'This is the same as the traditional interface pattern.',
      ],
      concepts: ['method constraint', 'interface with methods'],
    },
    {
      id: 'go-gen-11',
      title: 'Predict Type Inference',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict whether Go can infer type parameters.',
      skeleton: `package main

import "fmt"

func First[T any](s []T) T {
    return s[0]
}

func main() {
    // Can Go infer T here without explicit type argument?
    result := First([]int{1, 2, 3})
    fmt.Println(result)
}

// A) Yes, T is inferred as int
// B) No, must write First[int]([]int{1, 2, 3})
// C) Compilation error
// D) Runtime panic`,
      solution: `A) Yes, T is inferred as int`,
      hints: [
        'Go infers type parameters from the function arguments.',
        'The slice type []int tells Go that T is int.',
        'Explicit type arguments are rarely needed.',
      ],
      concepts: ['type inference', 'implicit type arguments'],
    },
    {
      id: 'go-gen-12',
      title: 'Predict Constraint Violation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict what happens when using a type that does not satisfy the constraint.',
      skeleton: `package main

func Max[T interface{ ~int | ~float64 }](a, b T) T {
    if a > b { return a }
    return b
}

func main() {
    Max("hello", "world")
}

// A) Returns "world"
// B) Compilation error: string does not satisfy constraint
// C) Runtime panic
// D) Returns "hello"`,
      solution: `B) Compilation error: string does not satisfy constraint`,
      hints: [
        'The constraint only allows int and float64.',
        'string is not in the constraint union.',
        'The compiler catches this at compile time.',
      ],
      concepts: ['constraint violation', 'compile-time safety'],
    },
    {
      id: 'go-gen-13',
      title: 'Predict Zero Value',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the zero value returned from a generic function.',
      skeleton: `package main

import "fmt"

func Zero[T any]() T {
    var zero T
    return zero
}

func main() {
    fmt.Println(Zero[int]())
    fmt.Println(Zero[string]())
    fmt.Println(Zero[bool]())
}`,
      solution: `0

false`,
      hints: [
        'var zero T gives the zero value of type T.',
        'int zero is 0, string zero is "", bool zero is false.',
        'The empty string prints as a blank line.',
      ],
      concepts: ['zero value', 'var zero T'],
    },
    {
      id: 'go-gen-14',
      title: 'Fix Missing Constraint',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the generic function that uses > without a proper constraint.',
      skeleton: `package main

func Max[T any](a, b T) T {
    if a > b {
        return a
    }
    return b
}`,
      solution: `package main

import "golang.org/x/exp/constraints"

func Max[T constraints.Ordered](a, b T) T {
    if a > b {
        return a
    }
    return b
}`,
      hints: [
        'The any constraint does not support comparison operators.',
        'Use constraints.Ordered or define your own with ordered types.',
        'constraints.Ordered includes all types that support < > <= >=.',
      ],
      concepts: ['constraints.Ordered', 'comparison operators'],
    },
    {
      id: 'go-gen-15',
      title: 'Fix Non-Comparable Map Key',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix a generic function that uses a non-comparable type as a map key.',
      skeleton: `package main

func GroupBy[K any, V any](items []V, keyFn func(V) K) map[K][]V {
    m := make(map[K][]V)
    for _, item := range items {
        key := keyFn(item)
        m[key] = append(m[key], item)
    }
    return m
}`,
      solution: `package main

func GroupBy[K comparable, V any](items []V, keyFn func(V) K) map[K][]V {
    m := make(map[K][]V)
    for _, item := range items {
        key := keyFn(item)
        m[key] = append(m[key], item)
    }
    return m
}`,
      hints: [
        'Map keys must be comparable in Go.',
        'Change K any to K comparable.',
        'Not all types can be used as map keys.',
      ],
      concepts: ['comparable', 'map key constraint'],
    },
    {
      id: 'go-gen-16',
      title: 'Fix Generic Method Syntax',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the incorrect syntax for methods on a generic type.',
      skeleton: `package main

type Pair[T any] struct {
    First  T
    Second T
}

func (p *Pair[T any]) Swap() {
    p.First, p.Second = p.Second, p.First
}`,
      solution: `package main

type Pair[T any] struct {
    First  T
    Second T
}

func (p *Pair[T]) Swap() {
    p.First, p.Second = p.Second, p.First
}`,
      hints: [
        'Method receivers use [T] without the constraint.',
        'The constraint is only specified on the type definition.',
        'Pair[T any] in the receiver is invalid syntax.',
      ],
      concepts: ['generic method receiver', 'syntax'],
    },
    {
      id: 'go-gen-17',
      title: 'Write Generic Linked List',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Implement a generic singly linked list with Push and ToSlice.',
      skeleton: `package main

type Node[T any] struct {
    Value T
    Next  *Node[T]
}

type List[T any] struct {
    Head *Node[T]
}

// Implement Push (add to front) and ToSlice (convert to []T)`,
      solution: `package main

type Node[T any] struct {
    Value T
    Next  *Node[T]
}

type List[T any] struct {
    Head *Node[T]
}

func (l *List[T]) Push(v T) {
    l.Head = &Node[T]{Value: v, Next: l.Head}
}

func (l *List[T]) ToSlice() []T {
    var result []T
    for n := l.Head; n != nil; n = n.Next {
        result = append(result, n.Value)
    }
    return result
}`,
      hints: [
        'Push creates a new node pointing to the current head.',
        'ToSlice walks the list and collects values.',
        'Generic types can reference themselves (Node[T].Next is *Node[T]).',
      ],
      concepts: ['generic data structure', 'linked list', 'self-reference'],
    },
    {
      id: 'go-gen-18',
      title: 'Write Generic Cache',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Implement a simple generic in-memory cache with Get and Set.',
      skeleton: `package main

import "sync"

type Cache[K comparable, V any] struct {
    mu    sync.RWMutex
    items map[K]V
}

// Implement NewCache, Get (returns value and ok), and Set`,
      solution: `package main

import "sync"

type Cache[K comparable, V any] struct {
    mu    sync.RWMutex
    items map[K]V
}

func NewCache[K comparable, V any]() *Cache[K, V] {
    return &Cache[K, V]{items: make(map[K]V)}
}

func (c *Cache[K, V]) Get(key K) (V, bool) {
    c.mu.RLock()
    defer c.mu.RUnlock()
    v, ok := c.items[key]
    return v, ok
}

func (c *Cache[K, V]) Set(key K, value V) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.items[key] = value
}`,
      hints: [
        'Use sync.RWMutex for concurrent access.',
        'RLock for reads, Lock for writes.',
        'Constructor function uses [K, V] in the return type.',
      ],
      concepts: ['generic cache', 'sync.RWMutex', 'concurrent generics'],
    },
    {
      id: 'go-gen-19',
      title: 'Refactor to Generic',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor duplicated functions into a single generic function.',
      skeleton: `package main

func ContainsInt(s []int, target int) bool {
    for _, v := range s {
        if v == target {
            return true
        }
    }
    return false
}

func ContainsString(s []string, target string) bool {
    for _, v := range s {
        if v == target {
            return true
        }
    }
    return false
}

func ContainsFloat64(s []float64, target float64) bool {
    for _, v := range s {
        if v == target {
            return true
        }
    }
    return false
}`,
      solution: `package main

func Contains[T comparable](s []T, target T) bool {
    for _, v := range s {
        if v == target {
            return true
        }
    }
    return false
}`,
      hints: [
        'All three functions have identical logic.',
        'Use comparable constraint since == is used.',
        'One generic function replaces all three.',
      ],
      concepts: ['generics vs duplication', 'comparable'],
    },
    {
      id: 'go-gen-20',
      title: 'Refactor interface{} to Generics',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor an interface{}-based function to use generics for type safety.',
      skeleton: `package main

func First(s []interface{}) interface{} {
    if len(s) == 0 {
        return nil
    }
    return s[0]
}

func main() {
    // Requires type assertion
    result := First([]interface{}{1, 2, 3})
    num := result.(int)
    _ = num
}`,
      solution: `package main

func First[T any](s []T) (T, bool) {
    if len(s) == 0 {
        var zero T
        return zero, false
    }
    return s[0], true
}

func main() {
    // No type assertion needed
    num, ok := First([]int{1, 2, 3})
    _ = num
    _ = ok
}`,
      hints: [
        'Generics eliminate the need for interface{} and type assertions.',
        'Return (T, bool) instead of interface{} for safety.',
        'The caller gets the concrete type directly.',
      ],
      concepts: ['generics vs interface{}', 'type safety'],
    },
  ],
};
