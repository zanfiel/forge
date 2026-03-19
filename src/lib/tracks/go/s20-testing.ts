import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-test',
  title: '20. Testing',
  explanation: `## Testing in Go

Go has a built-in testing framework in the \`testing\` package. Test files end with \`_test.go\` and test functions start with \`Test\`.

\`\`\`go
// mymath_test.go
package mymath

import "testing"

func TestAdd(t *testing.T) {
    got := Add(2, 3)
    want := 5
    if got != want {
        t.Errorf("Add(2, 3) = %d; want %d", got, want)
    }
}

// Subtests with t.Run
func TestOperations(t *testing.T) {
    t.Run("addition", func(t *testing.T) {
        if Add(1, 1) != 2 {
            t.Error("1+1 should be 2")
        }
    })
    t.Run("subtraction", func(t *testing.T) {
        if Sub(3, 1) != 2 {
            t.Error("3-1 should be 2")
        }
    })
}

// Table-driven tests
func TestMultiply(t *testing.T) {
    tests := []struct {
        a, b, want int
    }{
        {2, 3, 6},
        {0, 5, 0},
        {-1, 4, -4},
    }
    for _, tt := range tests {
        t.Run(fmt.Sprintf("%d*%d", tt.a, tt.b), func(t *testing.T) {
            if got := Multiply(tt.a, tt.b); got != tt.want {
                t.Errorf("Multiply(%d, %d) = %d; want %d", tt.a, tt.b, got, tt.want)
            }
        })
    }
}

// t.Fatal stops the test immediately
// t.Parallel runs tests concurrently
// t.Helper marks a function as a test helper
// t.Cleanup registers cleanup functions
// testing.Short() checks if -short flag was passed
\`\`\``,
  exercises: [
    {
      id: 'go-test-1',
      title: 'Basic Test Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a basic test function signature using the testing package.',
      skeleton: `package math

import "testing"

func __BLANK__(t *testing.T) {
    result := Add(2, 3)
    if result != 5 {
        t.Errorf("Add(2, 3) = %d; want 5", result)
    }
}`,
      solution: `package math

import "testing"

func TestAdd(t *testing.T) {
    result := Add(2, 3)
    if result != 5 {
        t.Errorf("Add(2, 3) = %d; want 5", result)
    }
}`,
      hints: [
        'Test functions must start with Test followed by an uppercase letter.',
        'The function name should describe what is being tested.',
        'Convention is TestFunctionName, so TestAdd tests the Add function.',
      ],
      concepts: ['testing.T', 'test function naming'],
    },
    {
      id: 'go-test-2',
      title: 'Using t.Errorf',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Report a test failure with a formatted error message.',
      skeleton: `package math

import "testing"

func TestSubtract(t *testing.T) {
    got := Subtract(10, 3)
    want := 7
    if got != want {
        t.__BLANK__("Subtract(10, 3) = %d; want %d", got, want)
    }
}`,
      solution: `package math

import "testing"

func TestSubtract(t *testing.T) {
    got := Subtract(10, 3)
    want := 7
    if got != want {
        t.Errorf("Subtract(10, 3) = %d; want %d", got, want)
    }
}`,
      hints: [
        't.Errorf reports a failure but continues the test.',
        'It uses fmt.Sprintf-style formatting.',
        't.Error is the non-formatted variant.',
      ],
      concepts: ['t.Errorf', 'test failure reporting'],
    },
    {
      id: 'go-test-3',
      title: 't.Fatal vs t.Error',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use t.Fatal to stop a test immediately on critical failure.',
      skeleton: `package db

import "testing"

func TestConnect(t *testing.T) {
    conn, err := Connect("test.db")
    if err != nil {
        t.__BLANK__("failed to connect:", err)
    }
    // This code only runs if connection succeeded
    result := conn.Query("SELECT 1")
    if result != 1 {
        t.Errorf("expected 1, got %d", result)
    }
}`,
      solution: `package db

import "testing"

func TestConnect(t *testing.T) {
    conn, err := Connect("test.db")
    if err != nil {
        t.Fatal("failed to connect:", err)
    }
    // This code only runs if connection succeeded
    result := conn.Query("SELECT 1")
    if result != 1 {
        t.Errorf("expected 1, got %d", result)
    }
}`,
      hints: [
        't.Fatal stops the current test function immediately.',
        'Use Fatal when subsequent code depends on the failing condition.',
        't.Fatalf is the formatted variant.',
      ],
      concepts: ['t.Fatal', 'stopping test execution'],
    },
    {
      id: 'go-test-4',
      title: 'Subtests with t.Run',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Create a subtest using t.Run for better test organization.',
      skeleton: `package math

import "testing"

func TestMath(t *testing.T) {
    t.__BLANK__("addition", func(t *testing.T) {
        if Add(1, 2) != 3 {
            t.Error("1+2 should be 3")
        }
    })
    t.__BLANK__("multiplication", func(t *testing.T) {
        if Multiply(2, 3) != 6 {
            t.Error("2*3 should be 6")
        }
    })
}`,
      solution: `package math

import "testing"

func TestMath(t *testing.T) {
    t.Run("addition", func(t *testing.T) {
        if Add(1, 2) != 3 {
            t.Error("1+2 should be 3")
        }
    })
    t.Run("multiplication", func(t *testing.T) {
        if Multiply(2, 3) != 6 {
            t.Error("2*3 should be 6")
        }
    })
}`,
      hints: [
        't.Run creates a named subtest.',
        'Subtests can be run individually with -run flag.',
        'Each subtest gets its own *testing.T.',
      ],
      concepts: ['t.Run', 'subtests'],
    },
    {
      id: 'go-test-5',
      title: 'Table-Driven Tests',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a table-driven test for a function that returns the absolute value of an integer.',
      skeleton: `package math

import "testing"

// Abs returns the absolute value of n
func Abs(n int) int {
    if n < 0 {
        return -n
    }
    return n
}

// Write TestAbs using table-driven tests
// Test cases: Abs(5)=5, Abs(-3)=3, Abs(0)=0, Abs(-1)=1`,
      solution: `package math

import "testing"

// Abs returns the absolute value of n
func Abs(n int) int {
    if n < 0 {
        return -n
    }
    return n
}

func TestAbs(t *testing.T) {
    tests := []struct {
        input int
        want  int
    }{
        {5, 5},
        {-3, 3},
        {0, 0},
        {-1, 1},
    }
    for _, tt := range tests {
        got := Abs(tt.input)
        if got != tt.want {
            t.Errorf("Abs(%d) = %d; want %d", tt.input, got, tt.want)
        }
    }
}`,
      hints: [
        'Define a slice of anonymous structs with input and expected output.',
        'Range over the test cases and check each one.',
        'Use t.Errorf to report which specific case failed.',
      ],
      concepts: ['table-driven tests', 'anonymous struct slice'],
    },
    {
      id: 'go-test-6',
      title: 'Table-Driven with Subtests',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a table-driven test that uses t.Run for each case with a descriptive name.',
      skeleton: `package str

import (
    "fmt"
    "strings"
    "testing"
)

// Write TestToUpper using table-driven tests with named subtests
// Test cases: "hello"->"HELLO", "Go"->"GO", ""->"", "123"->"123"`,
      solution: `package str

import (
    "fmt"
    "strings"
    "testing"
)

func TestToUpper(t *testing.T) {
    tests := []struct {
        input string
        want  string
    }{
        {"hello", "HELLO"},
        {"Go", "GO"},
        {"", ""},
        {"123", "123"},
    }
    for _, tt := range tests {
        t.Run(fmt.Sprintf("ToUpper(%q)", tt.input), func(t *testing.T) {
            got := strings.ToUpper(tt.input)
            if got != tt.want {
                t.Errorf("got %q; want %q", got, tt.want)
            }
        })
    }
}`,
      hints: [
        'Use t.Run inside the range loop for named subtests.',
        'fmt.Sprintf can create descriptive subtest names.',
        'Each subtest runs independently and reports separately.',
      ],
      concepts: ['table-driven tests', 't.Run', 'named subtests'],
    },
    {
      id: 'go-test-7',
      title: 'Test Helper Function',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Mark a function as a test helper so error locations point to the caller.',
      skeleton: `package math

import "testing"

func assertEqual(t *testing.T, got, want int) {
    t.__BLANK__()
    if got != want {
        t.Errorf("got %d; want %d", got, want)
    }
}

func TestAdd(t *testing.T) {
    assertEqual(t, Add(2, 3), 5)
    assertEqual(t, Add(0, 0), 0)
}`,
      solution: `package math

import "testing"

func assertEqual(t *testing.T, got, want int) {
    t.Helper()
    if got != want {
        t.Errorf("got %d; want %d", got, want)
    }
}

func TestAdd(t *testing.T) {
    assertEqual(t, Add(2, 3), 5)
    assertEqual(t, Add(0, 0), 0)
}`,
      hints: [
        't.Helper() marks the calling function as a helper.',
        'When a helper reports failure, the line number points to the caller.',
        'This makes test output much more useful for debugging.',
      ],
      concepts: ['t.Helper', 'test helpers'],
    },
    {
      id: 'go-test-8',
      title: 'Parallel Tests',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Mark a test to run in parallel with other parallel tests.',
      skeleton: `package api

import "testing"

func TestSlowOperation(t *testing.T) {
    t.__BLANK__()
    result := SlowComputation()
    if result != 42 {
        t.Errorf("got %d; want 42", result)
    }
}

func TestAnotherSlowOp(t *testing.T) {
    t.__BLANK__()
    result := AnotherSlowOp()
    if result != "done" {
        t.Errorf("got %q; want done", result)
    }
}`,
      solution: `package api

import "testing"

func TestSlowOperation(t *testing.T) {
    t.Parallel()
    result := SlowComputation()
    if result != 42 {
        t.Errorf("got %d; want 42", result)
    }
}

func TestAnotherSlowOp(t *testing.T) {
    t.Parallel()
    result := AnotherSlowOp()
    if result != "done" {
        t.Errorf("got %q; want done", result)
    }
}`,
      hints: [
        't.Parallel() signals the test may run concurrently.',
        'Call it at the start of the test function.',
        'Tests marked parallel run concurrently with each other.',
      ],
      concepts: ['t.Parallel', 'parallel tests'],
    },
    {
      id: 'go-test-9',
      title: 'Testing Short Mode',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a test that skips slow operations when -short flag is passed.',
      skeleton: `package integration

import "testing"

// Write TestLongRunning that skips when testing.Short() is true
// When not skipped, it should call RunFullSuite() and check result is nil`,
      solution: `package integration

import "testing"

func TestLongRunning(t *testing.T) {
    if testing.Short() {
        t.Skip("skipping long-running test in short mode")
    }
    err := RunFullSuite()
    if err != nil {
        t.Fatalf("RunFullSuite failed: %v", err)
    }
}`,
      hints: [
        'testing.Short() returns true when -short flag is used.',
        't.Skip() marks the test as skipped and stops execution.',
        'Use this to separate fast unit tests from slow integration tests.',
      ],
      concepts: ['testing.Short', 't.Skip', 'short mode'],
    },
    {
      id: 'go-test-10',
      title: 'Test Cleanup',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Register a cleanup function that runs after the test finishes.',
      skeleton: `package db

import "testing"

func TestWithTempDB(t *testing.T) {
    db := CreateTempDB()
    t.__BLANK__(func() {
        db.Close()
        RemoveTempDB(db.Path)
    })
    // test code using db
    if err := db.Ping(); err != nil {
        t.Fatal(err)
    }
}`,
      solution: `package db

import "testing"

func TestWithTempDB(t *testing.T) {
    db := CreateTempDB()
    t.Cleanup(func() {
        db.Close()
        RemoveTempDB(db.Path)
    })
    // test code using db
    if err := db.Ping(); err != nil {
        t.Fatal(err)
    }
}`,
      hints: [
        't.Cleanup registers a function to run after the test completes.',
        'Multiple cleanup functions run in LIFO (last-in, first-out) order.',
        'Cleanup runs even if the test fails or panics.',
      ],
      concepts: ['t.Cleanup', 'test cleanup'],
    },
    {
      id: 'go-test-11',
      title: 'Predict Test Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict what happens when a test uses t.Error followed by more code.',
      skeleton: `package main

import (
    "fmt"
    "testing"
)

func TestExample(t *testing.T) {
    t.Error("first failure")
    fmt.Println("still running")
    t.Error("second failure")
    fmt.Println("also running")
}

// What prints to stdout (ignoring test failure output)?`,
      solution: `still running
also running`,
      hints: [
        't.Error marks the test as failed but does not stop execution.',
        'Code after t.Error continues to run.',
        'Only t.Fatal and t.FailNow stop test execution immediately.',
      ],
      concepts: ['t.Error', 'test continuation'],
    },
    {
      id: 'go-test-12',
      title: 'Predict Fatal Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict what happens when a test uses t.Fatal.',
      skeleton: `package main

import (
    "fmt"
    "testing"
)

func TestFatal(t *testing.T) {
    fmt.Println("before")
    t.Fatal("stopping")
    fmt.Println("after")
}

// What prints to stdout (ignoring test failure output)?`,
      solution: `before`,
      hints: [
        't.Fatal stops the test function immediately.',
        'Code after t.Fatal is never executed.',
        't.Fatal calls runtime.Goexit() to stop the goroutine.',
      ],
      concepts: ['t.Fatal', 'immediate stop'],
    },
    {
      id: 'go-test-13',
      title: 'Predict Subtest Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the subtest name that Go generates.',
      skeleton: `package main

import "testing"

func TestParent(t *testing.T) {
    t.Run("child A", func(t *testing.T) {
        t.Run("grandchild", func(t *testing.T) {
            t.Log("running")
        })
    })
}

// What is the full subtest path name?`,
      solution: `TestParent/child_A/grandchild`,
      hints: [
        'Subtest names are joined with /.',
        'Spaces in names are replaced with underscores.',
        'The full path starts with the parent test name.',
      ],
      concepts: ['subtest naming', 'test hierarchy'],
    },
    {
      id: 'go-test-14',
      title: 'Fix Missing Test Prefix',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the test function so it is recognized by go test.',
      skeleton: `package math

import "testing"

func testAdd(t *testing.T) {
    if Add(1, 2) != 3 {
        t.Error("Add(1,2) should be 3")
    }
}`,
      solution: `package math

import "testing"

func TestAdd(t *testing.T) {
    if Add(1, 2) != 3 {
        t.Error("Add(1,2) should be 3")
    }
}`,
      hints: [
        'Go test only runs functions that start with Test (capital T).',
        'testAdd starts with a lowercase t, so go test ignores it.',
        'Rename to TestAdd.',
      ],
      concepts: ['test naming convention', 'exported test functions'],
    },
    {
      id: 'go-test-15',
      title: 'Fix Wrong Assertion',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the test that reports incorrect values in the error message.',
      skeleton: `package math

import "testing"

func TestDivide(t *testing.T) {
    got := Divide(10, 3)
    want := 3.333
    if got != want {
        t.Errorf("Divide(10, 3) = %d; want %d", got, want)
    }
}`,
      solution: `package math

import (
    "math"
    "testing"
)

func TestDivide(t *testing.T) {
    got := Divide(10, 3)
    want := 3.333
    if math.Abs(got-want) > 0.001 {
        t.Errorf("Divide(10, 3) = %f; want %f", got, want)
    }
}`,
      hints: [
        'Floating point numbers should not be compared with ==.',
        'Use a tolerance-based comparison for float values.',
        'Also the format verbs should be %f not %d for floats.',
      ],
      concepts: ['float comparison', 'format verbs', 'tolerance'],
    },
    {
      id: 'go-test-16',
      title: 'Fix Table Test Variable Capture',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Fix the table-driven test that has a loop variable capture bug in parallel subtests.',
      skeleton: `package math

import (
    "fmt"
    "testing"
)

func TestSquare(t *testing.T) {
    tests := []struct {
        input int
        want  int
    }{
        {2, 4},
        {3, 9},
        {4, 16},
    }
    for _, tt := range tests {
        t.Run(fmt.Sprintf("Square(%d)", tt.input), func(t *testing.T) {
            t.Parallel()
            got := Square(tt.input)
            if got != tt.want {
                t.Errorf("Square(%d) = %d; want %d", tt.input, got, tt.want)
            }
        })
    }
}`,
      solution: `package math

import (
    "fmt"
    "testing"
)

func TestSquare(t *testing.T) {
    tests := []struct {
        input int
        want  int
    }{
        {2, 4},
        {3, 9},
        {4, 16},
    }
    for _, tt := range tests {
        tt := tt // capture range variable
        t.Run(fmt.Sprintf("Square(%d)", tt.input), func(t *testing.T) {
            t.Parallel()
            got := Square(tt.input)
            if got != tt.want {
                t.Errorf("Square(%d) = %d; want %d", tt.input, got, tt.want)
            }
        })
    }
}`,
      hints: [
        'In Go < 1.22, loop variables are reused across iterations.',
        'Parallel subtests may see the last value of tt.',
        'Re-declare tt inside the loop: tt := tt',
      ],
      concepts: ['loop variable capture', 'parallel subtests', 'closure'],
    },
    {
      id: 'go-test-17',
      title: 'Write TestMain Setup',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a TestMain function that sets up and tears down test infrastructure.',
      skeleton: `package integration

import (
    "os"
    "testing"
)

// Write TestMain that:
// 1. Calls Setup()
// 2. Runs all tests with m.Run()
// 3. Calls Teardown()
// 4. Exits with the test result code`,
      solution: `package integration

import (
    "os"
    "testing"
)

func TestMain(m *testing.M) {
    Setup()
    code := m.Run()
    Teardown()
    os.Exit(code)
}`,
      hints: [
        'TestMain receives *testing.M, not *testing.T.',
        'm.Run() runs all tests and returns an exit code.',
        'os.Exit must be called with the result of m.Run().',
      ],
      concepts: ['TestMain', 'test setup', 'test teardown'],
    },
    {
      id: 'go-test-18',
      title: 'Write Test with TempDir',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a test that uses t.TempDir() for safe file operations.',
      skeleton: `package fileutil

import (
    "os"
    "path/filepath"
    "testing"
)

// Write TestWriteFile that:
// 1. Gets a temp directory from t.TempDir()
// 2. Writes "hello" to a file "test.txt" in that directory
// 3. Reads it back and verifies the content is "hello"`,
      solution: `package fileutil

import (
    "os"
    "path/filepath"
    "testing"
)

func TestWriteFile(t *testing.T) {
    dir := t.TempDir()
    path := filepath.Join(dir, "test.txt")

    err := os.WriteFile(path, []byte("hello"), 0644)
    if err != nil {
        t.Fatal(err)
    }

    data, err := os.ReadFile(path)
    if err != nil {
        t.Fatal(err)
    }

    if string(data) != "hello" {
        t.Errorf("got %q; want %q", string(data), "hello")
    }
}`,
      hints: [
        't.TempDir() returns a unique temporary directory.',
        'The directory is automatically cleaned up after the test.',
        'Use filepath.Join to create paths inside the temp dir.',
      ],
      concepts: ['t.TempDir', 'file testing', 'filepath.Join'],
    },
    {
      id: 'go-test-19',
      title: 'Refactor Duplicate Assertions',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor repetitive test assertions into a helper function.',
      skeleton: `package math

import "testing"

func TestOperations(t *testing.T) {
    result1 := Add(1, 2)
    if result1 != 3 {
        t.Errorf("Add(1, 2) = %d; want %d", result1, 3)
    }

    result2 := Add(5, 10)
    if result2 != 15 {
        t.Errorf("Add(5, 10) = %d; want %d", result2, 15)
    }

    result3 := Add(-1, 1)
    if result3 != 0 {
        t.Errorf("Add(-1, 1) = %d; want %d", result3, 0)
    }

    result4 := Add(0, 0)
    if result4 != 0 {
        t.Errorf("Add(0, 0) = %d; want %d", result4, 0)
    }
}`,
      solution: `package math

import "testing"

func TestOperations(t *testing.T) {
    assertAdd := func(a, b, want int) {
        t.Helper()
        got := Add(a, b)
        if got != want {
            t.Errorf("Add(%d, %d) = %d; want %d", a, b, got, want)
        }
    }

    assertAdd(1, 2, 3)
    assertAdd(5, 10, 15)
    assertAdd(-1, 1, 0)
    assertAdd(0, 0, 0)
}`,
      hints: [
        'Extract the repeated pattern into a helper closure.',
        'Use t.Helper() so failures point to the caller.',
        'This is the foundation of table-driven tests.',
      ],
      concepts: ['test helpers', 'DRY testing', 't.Helper'],
    },
    {
      id: 'go-test-20',
      title: 'Refactor to Table-Driven',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor separate test functions into a single table-driven test.',
      skeleton: `package str

import (
    "strings"
    "testing"
)

func TestReverseHello(t *testing.T) {
    got := Reverse("hello")
    if got != "olleh" {
        t.Errorf("Reverse(%q) = %q; want %q", "hello", got, "olleh")
    }
}

func TestReverseEmpty(t *testing.T) {
    got := Reverse("")
    if got != "" {
        t.Errorf("Reverse(%q) = %q; want %q", "", got, "")
    }
}

func TestReverseSingle(t *testing.T) {
    got := Reverse("a")
    if got != "a" {
        t.Errorf("Reverse(%q) = %q; want %q", "a", got, "a")
    }
}

func TestReversePalindrome(t *testing.T) {
    got := Reverse("racecar")
    if got != "racecar" {
        t.Errorf("Reverse(%q) = %q; want %q", "racecar", got, "racecar")
    }
}`,
      solution: `package str

import (
    "testing"
)

func TestReverse(t *testing.T) {
    tests := []struct {
        name  string
        input string
        want  string
    }{
        {"hello", "hello", "olleh"},
        {"empty", "", ""},
        {"single char", "a", "a"},
        {"palindrome", "racecar", "racecar"},
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := Reverse(tt.input)
            if got != tt.want {
                t.Errorf("Reverse(%q) = %q; want %q", tt.input, got, tt.want)
            }
        })
    }
}`,
      hints: [
        'Combine all test cases into a struct slice.',
        'Add a name field for descriptive subtest names.',
        'Use t.Run for each test case to get individual results.',
      ],
      concepts: ['table-driven tests', 'test refactoring', 'subtests'],
    },
  ],
};
