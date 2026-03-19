import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-bench',
  title: '21. Benchmarks',
  explanation: `## Benchmarks in Go

Go includes built-in benchmarking support in the \`testing\` package. Benchmark functions start with \`Benchmark\` and receive \`*testing.B\`.

\`\`\`go
func BenchmarkFib(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Fib(20)
    }
}

// Run with: go test -bench=. -benchmem

// b.N is adjusted by the framework for stable measurements
// b.ResetTimer() resets after expensive setup
// b.StopTimer() / b.StartTimer() pause measurement
// b.ReportAllocs() reports memory allocations

// Sub-benchmarks
func BenchmarkConcat(b *testing.B) {
    b.Run("plus", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            _ = "hello" + " " + "world"
        }
    })
    b.Run("sprintf", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            _ = fmt.Sprintf("%s %s", "hello", "world")
        }
    })
}

// Output example:
// BenchmarkFib-8    5000000    250 ns/op    0 B/op    0 allocs/op
\`\`\``,
  exercises: [
    {
      id: 'go-bench-1',
      title: 'Basic Benchmark',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a basic benchmark function signature.',
      skeleton: `package math

import "testing"

func __BLANK__(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Sum(1, 2, 3, 4, 5)
    }
}`,
      solution: `package math

import "testing"

func BenchmarkSum(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Sum(1, 2, 3, 4, 5)
    }
}`,
      hints: [
        'Benchmark functions must start with Benchmark.',
        'They receive *testing.B, not *testing.T.',
        'The function name follows the same convention as tests.',
      ],
      concepts: ['testing.B', 'benchmark naming'],
    },
    {
      id: 'go-bench-2',
      title: 'Benchmark Loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use the correct loop bound for benchmark iterations.',
      skeleton: `package sort

import "testing"

func BenchmarkBubbleSort(b *testing.B) {
    for i := 0; i < __BLANK__; i++ {
        data := []int{5, 3, 1, 4, 2}
        BubbleSort(data)
    }
}`,
      solution: `package sort

import "testing"

func BenchmarkBubbleSort(b *testing.B) {
    for i := 0; i < b.N; i++ {
        data := []int{5, 3, 1, 4, 2}
        BubbleSort(data)
    }
}`,
      hints: [
        'b.N is the number of iterations the benchmark framework chooses.',
        'The framework adjusts b.N to get stable timing.',
        'Never hardcode the loop count in a benchmark.',
      ],
      concepts: ['b.N', 'benchmark iterations'],
    },
    {
      id: 'go-bench-3',
      title: 'ResetTimer After Setup',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Reset the benchmark timer after expensive setup.',
      skeleton: `package db

import "testing"

func BenchmarkQuery(b *testing.B) {
    db := SetupTestDB()
    SeedData(db, 10000)
    b.__BLANK__()
    for i := 0; i < b.N; i++ {
        db.Query("SELECT * FROM users WHERE id = ?", i%100)
    }
}`,
      solution: `package db

import "testing"

func BenchmarkQuery(b *testing.B) {
    db := SetupTestDB()
    SeedData(db, 10000)
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        db.Query("SELECT * FROM users WHERE id = ?", i%100)
    }
}`,
      hints: [
        'b.ResetTimer() zeros the elapsed time and memory counters.',
        'Call it after setup that should not be measured.',
        'This ensures only the actual operation is benchmarked.',
      ],
      concepts: ['b.ResetTimer', 'benchmark setup'],
    },
    {
      id: 'go-bench-4',
      title: 'StopTimer and StartTimer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Pause and resume the timer during benchmark iterations.',
      skeleton: `package process

import "testing"

func BenchmarkProcess(b *testing.B) {
    for i := 0; i < b.N; i++ {
        b.__BLANK__()
        data := GenerateTestData(1000)
        b.__BLANK__()
        Process(data)
    }
}`,
      solution: `package process

import "testing"

func BenchmarkProcess(b *testing.B) {
    for i := 0; i < b.N; i++ {
        b.StopTimer()
        data := GenerateTestData(1000)
        b.StartTimer()
        Process(data)
    }
}`,
      hints: [
        'b.StopTimer() pauses the benchmark timer.',
        'b.StartTimer() resumes it.',
        'Use these to exclude setup code within the loop.',
      ],
      concepts: ['b.StopTimer', 'b.StartTimer', 'timer control'],
    },
    {
      id: 'go-bench-5',
      title: 'ReportAllocs',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Enable memory allocation reporting in benchmark output.',
      skeleton: `package alloc

import "testing"

func BenchmarkMakeSlice(b *testing.B) {
    b.__BLANK__()
    for i := 0; i < b.N; i++ {
        s := make([]int, 0, 100)
        for j := 0; j < 100; j++ {
            s = append(s, j)
        }
    }
}`,
      solution: `package alloc

import "testing"

func BenchmarkMakeSlice(b *testing.B) {
    b.ReportAllocs()
    for i := 0; i < b.N; i++ {
        s := make([]int, 0, 100)
        for j := 0; j < 100; j++ {
            s = append(s, j)
        }
    }
}`,
      hints: [
        'b.ReportAllocs() enables allocation statistics.',
        'Output will show B/op and allocs/op.',
        'Same as running with -benchmem flag.',
      ],
      concepts: ['b.ReportAllocs', 'memory profiling'],
    },
    {
      id: 'go-bench-6',
      title: 'Sub-benchmarks',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write sub-benchmarks comparing string concatenation methods.',
      skeleton: `package str

import (
    "fmt"
    "strings"
    "testing"
)

// Write BenchmarkConcat with three sub-benchmarks:
// "plus" using + operator to join "hello" and "world"
// "sprintf" using fmt.Sprintf
// "join" using strings.Join`,
      solution: `package str

import (
    "fmt"
    "strings"
    "testing"
)

func BenchmarkConcat(b *testing.B) {
    b.Run("plus", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            _ = "hello" + " " + "world"
        }
    })
    b.Run("sprintf", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            _ = fmt.Sprintf("%s %s", "hello", "world")
        }
    })
    b.Run("join", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            _ = strings.Join([]string{"hello", "world"}, " ")
        }
    })
}`,
      hints: [
        'Use b.Run to create named sub-benchmarks.',
        'Each sub-benchmark has its own b.N loop.',
        'This allows comparing different approaches directly.',
      ],
      concepts: ['sub-benchmarks', 'b.Run', 'performance comparison'],
    },
    {
      id: 'go-bench-7',
      title: 'Benchmark with Input Sizes',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write benchmarks that test different input sizes to show scaling behavior.',
      skeleton: `package sort

import (
    "fmt"
    "math/rand"
    "sort"
    "testing"
)

// Write BenchmarkSort that benchmarks sort.Ints with sizes 10, 100, 1000, 10000
// Use b.Run with size in the name`,
      solution: `package sort

import (
    "fmt"
    "math/rand"
    "sort"
    "testing"
)

func BenchmarkSort(b *testing.B) {
    sizes := []int{10, 100, 1000, 10000}
    for _, size := range sizes {
        b.Run(fmt.Sprintf("size=%d", size), func(b *testing.B) {
            for i := 0; i < b.N; i++ {
                b.StopTimer()
                data := make([]int, size)
                for j := range data {
                    data[j] = rand.Intn(size)
                }
                b.StartTimer()
                sort.Ints(data)
            }
        })
    }
}`,
      hints: [
        'Loop over different sizes and use b.Run for each.',
        'Use b.StopTimer/b.StartTimer to exclude data generation.',
        'Include the size in the sub-benchmark name for clarity.',
      ],
      concepts: ['scaling benchmarks', 'input sizes', 'sub-benchmarks'],
    },
    {
      id: 'go-bench-8',
      title: 'Benchmark SetBytes',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Report throughput in bytes per second using SetBytes.',
      skeleton: `package hash

import (
    "crypto/sha256"
    "testing"
)

func BenchmarkSHA256(b *testing.B) {
    data := make([]byte, 1024)
    b.__BLANK__(int64(len(data)))
    for i := 0; i < b.N; i++ {
        sha256.Sum256(data)
    }
}`,
      solution: `package hash

import (
    "crypto/sha256"
    "testing"
)

func BenchmarkSHA256(b *testing.B) {
    data := make([]byte, 1024)
    b.SetBytes(int64(len(data)))
    for i := 0; i < b.N; i++ {
        sha256.Sum256(data)
    }
}`,
      hints: [
        'b.SetBytes tells the framework how many bytes each operation processes.',
        'Output includes MB/s throughput.',
        'Useful for I/O and hashing benchmarks.',
      ],
      concepts: ['b.SetBytes', 'throughput', 'bytes per second'],
    },
    {
      id: 'go-bench-9',
      title: 'Predict Benchmark Behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict what b.N represents in a benchmark.',
      skeleton: `package main

import (
    "fmt"
    "testing"
)

func BenchmarkDemo(b *testing.B) {
    fmt.Printf("b.N = %d\\n", b.N)
    for i := 0; i < b.N; i++ {
        _ = 1 + 1
    }
}

// Is b.N:
// A) Always 1000000
// B) Set by the developer
// C) Adjusted by the framework for stable timing
// D) Random each run`,
      solution: `C) Adjusted by the framework for stable timing`,
      hints: [
        'The benchmark framework starts with b.N=1 and increases it.',
        'It keeps increasing until the timing is stable.',
        'You never set b.N yourself.',
      ],
      concepts: ['b.N', 'benchmark framework'],
    },
    {
      id: 'go-bench-10',
      title: 'Predict ResetTimer Effect',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict whether setup time is included in benchmark results.',
      skeleton: `package main

import (
    "testing"
    "time"
)

func BenchmarkWithReset(b *testing.B) {
    time.Sleep(2 * time.Second) // expensive setup
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        _ = 1 + 1
    }
}

// Will the 2-second setup be included in the ns/op result?
// A) Yes, it is always included
// B) No, ResetTimer excludes it
// C) Only if b.N > 1`,
      solution: `B) No, ResetTimer excludes it`,
      hints: [
        'b.ResetTimer() zeros the elapsed time counter.',
        'Any time spent before ResetTimer is excluded.',
        'This is the standard pattern for expensive setup.',
      ],
      concepts: ['b.ResetTimer', 'setup exclusion'],
    },
    {
      id: 'go-bench-11',
      title: 'Predict Alloc Count',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Predict how many allocations per operation a benchmark reports.',
      skeleton: `package main

import "testing"

func BenchmarkAllocs(b *testing.B) {
    b.ReportAllocs()
    for i := 0; i < b.N; i++ {
        s := make([]int, 0)
        s = append(s, 1)
        s = append(s, 2)
        s = append(s, 3)
    }
}

// How many allocs/op will this report (approximately)?`,
      solution: `3 allocs/op`,
      hints: [
        'make([]int, 0) starts with capacity 0.',
        'Each append that exceeds capacity causes a new allocation.',
        'append(s, 1) allocs cap=1, append(s, 2) allocs cap=2, append(s, 3) allocs cap=4.',
      ],
      concepts: ['allocation counting', 'slice growth', 'append'],
    },
    {
      id: 'go-bench-12',
      title: 'Fix Benchmark Not Running',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the benchmark function so it is recognized by go test -bench.',
      skeleton: `package math

import "testing"

func benchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(1, 2)
    }
}`,
      solution: `package math

import "testing"

func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(1, 2)
    }
}`,
      hints: [
        'Benchmark functions must start with capital B.',
        'benchmarkAdd is not exported and will be ignored.',
        'Rename to BenchmarkAdd.',
      ],
      concepts: ['benchmark naming', 'exported functions'],
    },
    {
      id: 'go-bench-13',
      title: 'Fix Benchmark Compiler Optimization',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the benchmark where the compiler might optimize away the computation.',
      skeleton: `package math

import "testing"

func BenchmarkFib(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Fib(20)
    }
}`,
      solution: `package math

import "testing"

var result int

func BenchmarkFib(b *testing.B) {
    var r int
    for i := 0; i < b.N; i++ {
        r = Fib(20)
    }
    result = r
}`,
      hints: [
        'The compiler may optimize away unused return values.',
        'Assign the result to a local variable.',
        'Then assign to a package-level variable to prevent elimination.',
      ],
      concepts: ['compiler optimization', 'dead code elimination', 'benchmark sink'],
    },
    {
      id: 'go-bench-14',
      title: 'Fix Benchmark Setup Inside Loop',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix a benchmark that incorrectly measures setup time.',
      skeleton: `package data

import "testing"

func BenchmarkProcess(b *testing.B) {
    for i := 0; i < b.N; i++ {
        data := LoadLargeDataset("testdata/big.json") // 500ms each call
        result := Process(data) // 1ms each call
        _ = result
    }
}`,
      solution: `package data

import "testing"

func BenchmarkProcess(b *testing.B) {
    data := LoadLargeDataset("testdata/big.json")
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        result := Process(data)
        _ = result
    }
}`,
      hints: [
        'LoadLargeDataset is setup, not the operation being benchmarked.',
        'Move it before the loop and call b.ResetTimer().',
        'Only the Process call should be measured.',
      ],
      concepts: ['benchmark setup', 'b.ResetTimer', 'measurement accuracy'],
    },
    {
      id: 'go-bench-15',
      title: 'Write Benchmark Comparison',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write benchmarks comparing map vs slice lookup performance.',
      skeleton: `package lookup

import "testing"

// Write BenchmarkLookup with two sub-benchmarks:
// "map" - looks up key "target" in a map[string]int with 1000 entries
// "slice" - searches for "target" in a []string with 1000 entries
// Setup the data structures before b.ResetTimer()`,
      solution: `package lookup

import (
    "fmt"
    "testing"
)

func BenchmarkLookup(b *testing.B) {
    b.Run("map", func(b *testing.B) {
        m := make(map[string]int, 1000)
        for i := 0; i < 1000; i++ {
            m[fmt.Sprintf("key%d", i)] = i
        }
        m["target"] = 999
        b.ResetTimer()
        for i := 0; i < b.N; i++ {
            _ = m["target"]
        }
    })
    b.Run("slice", func(b *testing.B) {
        s := make([]string, 1000)
        for i := 0; i < 1000; i++ {
            s[i] = fmt.Sprintf("key%d", i)
        }
        s[999] = "target"
        b.ResetTimer()
        for i := 0; i < b.N; i++ {
            for _, v := range s {
                if v == "target" {
                    break
                }
            }
        }
    })
}`,
      hints: [
        'Setup the data structures before b.ResetTimer().',
        'Map lookup is O(1), slice search is O(n).',
        'The benchmark should clearly show the performance difference.',
      ],
      concepts: ['map vs slice', 'lookup performance', 'sub-benchmarks'],
    },
    {
      id: 'go-bench-16',
      title: 'Write Benchmark with ReportMetric',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a benchmark that reports a custom metric.',
      skeleton: `package queue

import "testing"

// Write BenchmarkEnqueue that:
// 1. Enqueues b.N items into a Queue
// 2. Reports custom metric "items/op" using b.ReportMetric
// Hint: each iteration enqueues 1 item, so items/op = 1.0`,
      solution: `package queue

import "testing"

func BenchmarkEnqueue(b *testing.B) {
    q := NewQueue()
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        q.Enqueue(i)
    }
    b.ReportMetric(1.0, "items/op")
}`,
      hints: [
        'b.ReportMetric(value, unit) adds custom metrics to output.',
        'The unit string appears in the benchmark results.',
        'Useful for domain-specific measurements.',
      ],
      concepts: ['b.ReportMetric', 'custom metrics'],
    },
    {
      id: 'go-bench-17',
      title: 'Write Parallel Benchmark',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a parallel benchmark using b.RunParallel.',
      skeleton: `package cache

import "testing"

// Write BenchmarkCacheGet that uses b.RunParallel
// Each goroutine should call cache.Get("key") in a loop
// Setup the cache with one entry "key"->"value" before benchmarking`,
      solution: `package cache

import "testing"

func BenchmarkCacheGet(b *testing.B) {
    c := NewCache()
    c.Set("key", "value")
    b.ResetTimer()
    b.RunParallel(func(pb *testing.PB) {
        for pb.Next() {
            c.Get("key")
        }
    })
}`,
      hints: [
        'b.RunParallel runs the function in multiple goroutines.',
        'Use pb.Next() instead of a b.N loop.',
        'Great for testing concurrent performance.',
      ],
      concepts: ['b.RunParallel', 'testing.PB', 'concurrent benchmark'],
    },
    {
      id: 'go-bench-18',
      title: 'Refactor Benchmark Duplication',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor duplicated benchmark functions into parameterized sub-benchmarks.',
      skeleton: `package compress

import "testing"

func BenchmarkCompress100(b *testing.B) {
    data := make([]byte, 100)
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        Compress(data)
    }
}

func BenchmarkCompress1000(b *testing.B) {
    data := make([]byte, 1000)
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        Compress(data)
    }
}

func BenchmarkCompress10000(b *testing.B) {
    data := make([]byte, 10000)
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        Compress(data)
    }
}`,
      solution: `package compress

import (
    "fmt"
    "testing"
)

func BenchmarkCompress(b *testing.B) {
    sizes := []int{100, 1000, 10000}
    for _, size := range sizes {
        b.Run(fmt.Sprintf("size=%d", size), func(b *testing.B) {
            data := make([]byte, size)
            b.ResetTimer()
            for i := 0; i < b.N; i++ {
                Compress(data)
            }
        })
    }
}`,
      hints: [
        'Use a sizes slice and loop with b.Run.',
        'Each sub-benchmark gets its own b.N.',
        'Include the size in the sub-benchmark name.',
      ],
      concepts: ['sub-benchmarks', 'parameterized benchmarks', 'DRY'],
    },
    {
      id: 'go-bench-19',
      title: 'Refactor to Use SetBytes',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Add throughput reporting to an existing benchmark.',
      skeleton: `package io

import (
    "bytes"
    "testing"
)

func BenchmarkRead(b *testing.B) {
    data := bytes.Repeat([]byte("abcdefghij"), 1024) // 10KB
    for i := 0; i < b.N; i++ {
        r := bytes.NewReader(data)
        buf := make([]byte, 4096)
        for {
            _, err := r.Read(buf)
            if err != nil {
                break
            }
        }
    }
}`,
      solution: `package io

import (
    "bytes"
    "testing"
)

func BenchmarkRead(b *testing.B) {
    data := bytes.Repeat([]byte("abcdefghij"), 1024) // 10KB
    b.SetBytes(int64(len(data)))
    b.ReportAllocs()
    for i := 0; i < b.N; i++ {
        r := bytes.NewReader(data)
        buf := make([]byte, 4096)
        for {
            _, err := r.Read(buf)
            if err != nil {
                break
            }
        }
    }
}`,
      hints: [
        'b.SetBytes reports throughput in MB/s.',
        'b.ReportAllocs shows memory allocation overhead.',
        'Both provide much more useful benchmark output.',
      ],
      concepts: ['b.SetBytes', 'b.ReportAllocs', 'throughput reporting'],
    },
    {
      id: 'go-bench-20',
      title: 'Write Benchmark with Cleanup',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a benchmark that creates temp files and cleans up properly.',
      skeleton: `package fileops

import (
    "os"
    "testing"
)

// Write BenchmarkFileWrite that:
// 1. Uses b.TempDir() for a temp directory
// 2. Writes 1KB of data to a file in the temp dir each iteration
// 3. Reports bytes written with b.SetBytes`,
      solution: `package fileops

import (
    "os"
    "path/filepath"
    "testing"
)

func BenchmarkFileWrite(b *testing.B) {
    dir := b.TempDir()
    data := make([]byte, 1024)
    b.SetBytes(int64(len(data)))
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        path := filepath.Join(dir, "test.dat")
        os.WriteFile(path, data, 0644)
    }
}`,
      hints: [
        'b.TempDir() works just like t.TempDir().',
        'The directory is cleaned up automatically.',
        'b.SetBytes(1024) reports throughput for 1KB writes.',
      ],
      concepts: ['b.TempDir', 'file benchmarks', 'b.SetBytes'],
    },
  ],
};
