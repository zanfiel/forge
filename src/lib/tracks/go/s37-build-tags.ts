import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-bld',
  title: '37. Build Tags',
  explanation: `## Build Tags and Constraints in Go

Build tags (build constraints) control which files are included in a build. Since Go 1.17, the preferred syntax uses \`//go:build\`.

\`\`\`go
// New syntax (Go 1.17+)
//go:build linux
// +build linux

// Multiple constraints
//go:build linux && amd64
//go:build (linux || darwin) && !cgo

// Common constraints
//go:build ignore        // never build this file
//go:build integration   // custom tag: go test -tags integration
//go:build !windows      // exclude Windows

// File naming conventions also act as constraints:
// file_linux.go     -> only built on Linux
// file_amd64.go     -> only built on amd64
// file_test.go      -> only built during testing
\`\`\`

Build tags appear before the package declaration and must be followed by a blank line. Custom tags are activated with \`-tags\`:
\`\`\`
go build -tags "integration debug"
go test -tags integration ./...
\`\`\``,
  exercises: [
    {
      id: 'go-bld-1',
      title: 'Basic Build Tag',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Add a build tag to restrict a file to Linux.',
      skeleton: `__BLANK__

package platform

func OSName() string {
    return "linux"
}`,
      solution: `//go:build linux

package platform

func OSName() string {
    return "linux"
}`,
      hints: [
        'Build tags use //go:build syntax.',
        'Place the tag before the package declaration.',
        'A blank line separates the tag from the package.',
      ],
      concepts: ['build tags', '//go:build'],
    },
    {
      id: 'go-bld-2',
      title: 'Negation Build Tag',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Exclude a file from Windows builds.',
      skeleton: `//go:build __BLANK__

package main

import "syscall"

func setPriority() {
    syscall.Setpriority(0, 0, -10)
}`,
      solution: `//go:build !windows

package main

import "syscall"

func setPriority() {
    syscall.Setpriority(0, 0, -10)
}`,
      hints: [
        'Use ! to negate a constraint.',
        '!windows means "not Windows".',
        'This file will be excluded on Windows builds.',
      ],
      concepts: ['build tags', 'negation'],
    },
    {
      id: 'go-bld-3',
      title: 'AND Build Constraint',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Require both Linux and amd64 architecture.',
      skeleton: `//go:build linux __BLANK__ amd64

package optimized

func FastHash(data []byte) uint64 {
    // uses amd64-specific instructions
    return 0
}`,
      solution: `//go:build linux && amd64

package optimized

func FastHash(data []byte) uint64 {
    // uses amd64-specific instructions
    return 0
}`,
      hints: [
        '&& means both conditions must be true.',
        'linux && amd64 requires both Linux OS and amd64 arch.',
        'This is a logical AND constraint.',
      ],
      concepts: ['build tags', 'AND constraint'],
    },
    {
      id: 'go-bld-4',
      title: 'OR Build Constraint',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Build a file on either Linux or macOS.',
      skeleton: `//go:build linux __BLANK__ darwin

package platform

import "os/exec"

func Open(url string) error {
    return exec.Command("xdg-open", url).Start()
}`,
      solution: `//go:build linux || darwin

package platform

import "os/exec"

func Open(url string) error {
    return exec.Command("xdg-open", url).Start()
}`,
      hints: [
        '|| means either condition can be true.',
        'darwin is the GOOS value for macOS.',
        'This file builds on Linux or macOS.',
      ],
      concepts: ['build tags', 'OR constraint'],
    },
    {
      id: 'go-bld-5',
      title: 'Custom Build Tag',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Create a custom build tag for integration tests.',
      skeleton: `//go:build __BLANK__

package db_test

import "testing"

func TestDatabaseConnection(t *testing.T) {
    // Only runs with: go test -tags integration
    db := connectToRealDB()
    defer db.Close()
    if err := db.Ping(); err != nil {
        t.Fatal(err)
    }
}`,
      solution: `//go:build integration

package db_test

import "testing"

func TestDatabaseConnection(t *testing.T) {
    // Only runs with: go test -tags integration
    db := connectToRealDB()
    defer db.Close()
    if err := db.Ping(); err != nil {
        t.Fatal(err)
    }
}`,
      hints: [
        'Custom tags can be any identifier.',
        'Activate with: go test -tags integration.',
        'Without the tag, this file is excluded from builds.',
      ],
      concepts: ['build tags', 'custom tags', 'integration testing'],
    },
    {
      id: 'go-bld-6',
      title: 'Complex Build Expression',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a build constraint using parentheses for grouping.',
      skeleton: `//go:build __BLANK__

package simd

// Build only on Unix-like systems with 64-bit architecture
// (linux OR darwin) AND (amd64 OR arm64)
func VectorAdd(a, b []float64) []float64 {
    result := make([]float64, len(a))
    for i := range a {
        result[i] = a[i] + b[i]
    }
    return result
}`,
      solution: `//go:build (linux || darwin) && (amd64 || arm64)

package simd

func VectorAdd(a, b []float64) []float64 {
    result := make([]float64, len(a))
    for i := range a {
        result[i] = a[i] + b[i]
    }
    return result
}`,
      hints: [
        'Use parentheses to group OR conditions.',
        '(linux || darwin) groups the OS options.',
        '(amd64 || arm64) groups the architecture options.',
      ],
      concepts: ['build tags', 'complex expressions', 'grouping'],
    },
    {
      id: 'go-bld-7',
      title: 'Predict Build Inclusion',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict which files are included in a Linux amd64 build.',
      skeleton: `// File A: //go:build linux
// File B: //go:build windows
// File C: //go:build linux && amd64
// File D: //go:build !windows
// File E: //go:build linux || windows

// Building on Linux amd64.
// Which files are included? (list letters)
// Answer as a Go program that prints the result:
package main

import "fmt"

func main() {
    fmt.Println("A, C, D, E")
}`,
      solution: `A, C, D, E`,
      hints: [
        'A: linux -> matches Linux.',
        'B: windows -> does not match Linux.',
        'C: linux && amd64 -> matches both. D: !windows -> matches.',
      ],
      concepts: ['build tags', 'constraint evaluation'],
    },
    {
      id: 'go-bld-8',
      title: 'Predict Tag Evaluation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict build tag evaluation results.',
      skeleton: `// GOOS=darwin GOARCH=arm64
// Evaluate these constraints:

package main

import "fmt"

func main() {
    // //go:build linux        -> ?
    // //go:build !linux        -> ?
    // //go:build darwin && arm64 -> ?
    // //go:build (linux || darwin) && !arm64 -> ?
    fmt.Println("false, true, true, false")
}`,
      solution: `false, true, true, false`,
      hints: [
        'GOOS=darwin, GOARCH=arm64.',
        'linux is false. !linux is true. darwin && arm64 is true.',
        '(linux || darwin) is true, but !arm64 is false, so AND is false.',
      ],
      concepts: ['build tags', 'boolean evaluation'],
    },
    {
      id: 'go-bld-9',
      title: 'Predict File Name Convention',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict which files build based on naming conventions.',
      skeleton: `// Building on darwin/arm64
// Which files are included?
// util.go
// util_linux.go
// util_darwin.go
// util_darwin_arm64.go
// util_test.go (go build, not go test)

package main

import "fmt"

func main() {
    fmt.Println("util.go, util_darwin.go, util_darwin_arm64.go")
}`,
      solution: `util.go, util_darwin.go, util_darwin_arm64.go`,
      hints: [
        'util.go has no constraints, always included.',
        'util_linux.go is only for linux.',
        'util_test.go is only included during go test.',
      ],
      concepts: ['build tags', 'file naming convention'],
    },
    {
      id: 'go-bld-10',
      title: 'Platform-Specific Implementation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write platform-specific function stubs with build tags.',
      skeleton: `// Write TWO files as a single exercise:
// 1. A file for Unix (linux || darwin) that implements openBrowser
// 2. A file for Windows that implements openBrowser
// Both must have the same function signature.

package main

import (
    "fmt"
    "os/exec"
    "runtime"
)

// This is the portable fallback
func openBrowser(url string) error {
    switch runtime.GOOS {
    case "linux":
        return exec.Command("xdg-open", url).Start()
    case "darwin":
        return exec.Command("open", url).Start()
    case "windows":
        return exec.Command("cmd", "/c", "start", url).Start()
    default:
        return fmt.Errorf("unsupported platform")
    }
}

func main() {
    fmt.Println("Platform:", runtime.GOOS)
}`,
      solution: `// Portable version using runtime.GOOS detection
package main

import (
    "fmt"
    "os/exec"
    "runtime"
)

func openBrowser(url string) error {
    switch runtime.GOOS {
    case "linux":
        return exec.Command("xdg-open", url).Start()
    case "darwin":
        return exec.Command("open", url).Start()
    case "windows":
        return exec.Command("cmd", "/c", "start", url).Start()
    default:
        return fmt.Errorf("unsupported platform")
    }
}

func main() {
    fmt.Println("Platform:", runtime.GOOS)
}`,
      hints: [
        'With build tags, you would have separate files per OS.',
        'The runtime.GOOS approach works in a single file.',
        'Build tags are preferred when implementations differ significantly.',
      ],
      concepts: ['build tags', 'platform-specific', 'runtime.GOOS'],
    },
    {
      id: 'go-bld-11',
      title: 'Feature Flag Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Implement a feature flag using custom build tags.',
      skeleton: `package main

import "fmt"

// This file simulates the build tag pattern.
// In practice, you'd have two files:
// feature_debug.go    (//go:build debug)
// feature_release.go  (//go:build !debug)

// Simulate debug mode
const debugMode = false

func logDebug(msg string) {
    if debugMode {
        fmt.Println("[DEBUG]", msg)
    }
}

// Write enabledFeatures() that returns a slice of enabled feature names.
// Features: "logging" always, "profiling" only in debug, "metrics" always.
func enabledFeatures() []string {
    // TODO: implement
}

func main() {
    logDebug("starting")
    fmt.Println(enabledFeatures())
}`,
      solution: `package main

import "fmt"

const debugMode = false

func logDebug(msg string) {
    if debugMode {
        fmt.Println("[DEBUG]", msg)
    }
}

func enabledFeatures() []string {
    features := []string{"logging", "metrics"}
    if debugMode {
        features = append(features, "profiling")
    }
    return features
}

func main() {
    logDebug("starting")
    fmt.Println(enabledFeatures())
}`,
      hints: [
        'Check debugMode to conditionally include features.',
        'In real code, build tags would compile different code.',
        'The compiler can optimize away dead code from const booleans.',
      ],
      concepts: ['build tags', 'feature flags', 'const optimization'],
    },
    {
      id: 'go-bld-12',
      title: 'Test Tag Separation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write test helpers that are only available in test builds.',
      skeleton: `package main

import "fmt"

type DB struct {
    connected bool
}

func (db *DB) Query(sql string) string {
    if !db.connected {
        return "error: not connected"
    }
    return "result: data"
}

// In a real project, this would be in a _test.go file:
// type MockDB struct{}
// func (m MockDB) Query(sql string) string { return "mock: data" }

// Write a function that demonstrates the pattern
func runQuery(db *DB, query string) string {
    // TODO: implement
}

func main() {
    db := &DB{connected: true}
    fmt.Println(runQuery(db, "SELECT * FROM users"))
}`,
      solution: `package main

import "fmt"

type DB struct {
    connected bool
}

func (db *DB) Query(sql string) string {
    if !db.connected {
        return "error: not connected"
    }
    return "result: data"
}

func runQuery(db *DB, query string) string {
    return db.Query(query)
}

func main() {
    db := &DB{connected: true}
    fmt.Println(runQuery(db, "SELECT * FROM users"))
}`,
      hints: [
        '_test.go files are only compiled during go test.',
        'Test helpers in _test.go are invisible to production code.',
        'This is a form of build constraint via naming convention.',
      ],
      concepts: ['build tags', 'test files', '_test.go'],
    },
    {
      id: 'go-bld-13',
      title: 'Fix Missing Blank Line',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix a build tag that is ignored due to missing blank line.',
      skeleton: `//go:build linux
package main
// BUG: Build tag is treated as a comment, not a constraint

import "fmt"

func main() {
    fmt.Println("Linux only")
}`,
      solution: `//go:build linux

package main

import "fmt"

func main() {
    fmt.Println("Linux only")
}`,
      hints: [
        'Build tags must be followed by a blank line.',
        'Without the blank line, the tag is just a comment.',
        'Add a blank line between the tag and package declaration.',
      ],
      concepts: ['build tags', 'blank line requirement'],
    },
    {
      id: 'go-bld-14',
      title: 'Fix Conflicting Constraints',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix build constraints that accidentally exclude all platforms.',
      skeleton: `//go:build linux && windows

package main

// BUG: No OS is both linux AND windows
// Intended: build on linux OR windows

import "fmt"

func main() {
    fmt.Println("Desktop platforms")
}`,
      solution: `//go:build linux || windows

package main

import "fmt"

func main() {
    fmt.Println("Desktop platforms")
}`,
      hints: [
        '&& means both must be true simultaneously.',
        'No system is both Linux and Windows.',
        'Use || for "either" semantics.',
      ],
      concepts: ['build tags', 'AND vs OR', 'constraint logic'],
    },
    {
      id: 'go-bld-15',
      title: 'Fix CGO Constraint',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Fix a file that should only build with CGO enabled.',
      skeleton: `//go:build cgo_enabled

package main

// BUG: The correct constraint name is "cgo", not "cgo_enabled"

/*
#include <stdlib.h>
*/
import "C"

import "fmt"

func main() {
    fmt.Println("CGO is enabled")
}`,
      solution: `//go:build cgo

package main

/*
#include <stdlib.h>
*/
import "C"

import "fmt"

func main() {
    fmt.Println("CGO is enabled")
}`,
      hints: [
        'The CGO build constraint is just "cgo".',
        'Not "cgo_enabled" or "CGO_ENABLED".',
        'Use //go:build cgo for CGO-dependent code.',
      ],
      concepts: ['build tags', 'cgo', 'constraint names'],
    },
    {
      id: 'go-bld-16',
      title: 'Config Loader with Tags',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a config loader pattern that uses build-tag-like feature detection.',
      skeleton: `package main

import "fmt"

// Simulates build-tag controlled configuration
type Config struct {
    Env      string
    LogLevel string
    Features map[string]bool
}

// loadConfig returns config based on the environment.
// "development": LogLevel="debug", features: verbose, hotreload
// "production": LogLevel="error", features: caching, compression
// "testing": LogLevel="silent", features: mocks, fixtures
func loadConfig(env string) Config {
    // TODO: implement
}

func main() {
    for _, env := range []string{"development", "production", "testing"} {
        cfg := loadConfig(env)
        fmt.Printf("%s: level=%s features=%v\\n", cfg.Env, cfg.LogLevel, cfg.Features)
    }
}`,
      solution: `package main

import "fmt"

type Config struct {
    Env      string
    LogLevel string
    Features map[string]bool
}

func loadConfig(env string) Config {
    cfg := Config{Env: env, Features: make(map[string]bool)}
    switch env {
    case "development":
        cfg.LogLevel = "debug"
        cfg.Features["verbose"] = true
        cfg.Features["hotreload"] = true
    case "production":
        cfg.LogLevel = "error"
        cfg.Features["caching"] = true
        cfg.Features["compression"] = true
    case "testing":
        cfg.LogLevel = "silent"
        cfg.Features["mocks"] = true
        cfg.Features["fixtures"] = true
    }
    return cfg
}

func main() {
    for _, env := range []string{"development", "production", "testing"} {
        cfg := loadConfig(env)
        fmt.Printf("%s: level=%s features=%v\\n", cfg.Env, cfg.LogLevel, cfg.Features)
    }
}`,
      hints: [
        'Use a switch on the environment string.',
        'Each environment sets different log level and features.',
        'In real builds, these would be separate files with build tags.',
      ],
      concepts: ['build tags', 'configuration', 'feature detection'],
    },
    {
      id: 'go-bld-17',
      title: 'Build Tag Parser',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a function that parses and evaluates simple build tag expressions.',
      skeleton: `package main

import (
    "fmt"
    "strings"
)

// evalTag evaluates a simple build tag against a set of active tags.
// Supports: single tags, ! (negation), && (AND), || (OR)
// No parentheses needed for this simplified version.
// || has lower precedence than &&.
func evalTag(expr string, active map[string]bool) bool {
    // TODO: implement
    // Split by ||, then each part by &&
}

func main() {
    active := map[string]bool{"linux": true, "amd64": true}
    fmt.Println(evalTag("linux", active))
    fmt.Println(evalTag("windows", active))
    fmt.Println(evalTag("!windows", active))
    fmt.Println(evalTag("linux && amd64", active))
    fmt.Println(evalTag("windows || linux", active))
}`,
      solution: `package main

import (
    "fmt"
    "strings"
)

func evalTag(expr string, active map[string]bool) bool {
    orParts := strings.Split(expr, "||")
    for _, orPart := range orParts {
        andParts := strings.Split(strings.TrimSpace(orPart), "&&")
        allTrue := true
        for _, part := range andParts {
            tag := strings.TrimSpace(part)
            negate := false
            if strings.HasPrefix(tag, "!") {
                negate = true
                tag = strings.TrimSpace(tag[1:])
            }
            val := active[tag]
            if negate {
                val = !val
            }
            if !val {
                allTrue = false
                break
            }
        }
        if allTrue {
            return true
        }
    }
    return false
}

func main() {
    active := map[string]bool{"linux": true, "amd64": true}
    fmt.Println(evalTag("linux", active))
    fmt.Println(evalTag("windows", active))
    fmt.Println(evalTag("!windows", active))
    fmt.Println(evalTag("linux && amd64", active))
    fmt.Println(evalTag("windows || linux", active))
}`,
      hints: [
        'Split by || first (lower precedence).',
        'Then split each part by && (higher precedence).',
        'Handle ! prefix for negation.',
      ],
      concepts: ['build tags', 'parsing', 'boolean logic'],
    },
    {
      id: 'go-bld-18',
      title: 'Conditional Compilation Simulator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Simulate conditional compilation by selecting implementations at runtime.',
      skeleton: `package main

import "fmt"

type Logger interface {
    Log(msg string)
}

type ConsoleLogger struct{}
func (l ConsoleLogger) Log(msg string) { fmt.Println("[CONSOLE]", msg) }

type FileLogger struct{ Path string }
func (l FileLogger) Log(msg string) { fmt.Printf("[FILE:%s] %s\\n", l.Path, msg) }

type NullLogger struct{}
func (l NullLogger) Log(msg string) {}

// newLogger returns the appropriate logger based on build mode.
// "debug" -> ConsoleLogger
// "release" -> FileLogger{"/var/log/app.log"}
// "test" -> NullLogger
func newLogger(mode string) Logger {
    // TODO: implement
}

func main() {
    for _, mode := range []string{"debug", "release", "test"} {
        logger := newLogger(mode)
        logger.Log(fmt.Sprintf("running in %s mode", mode))
    }
}`,
      solution: `package main

import "fmt"

type Logger interface {
    Log(msg string)
}

type ConsoleLogger struct{}
func (l ConsoleLogger) Log(msg string) { fmt.Println("[CONSOLE]", msg) }

type FileLogger struct{ Path string }
func (l FileLogger) Log(msg string) { fmt.Printf("[FILE:%s] %s\\n", l.Path, msg) }

type NullLogger struct{}
func (l NullLogger) Log(msg string) {}

func newLogger(mode string) Logger {
    switch mode {
    case "debug":
        return ConsoleLogger{}
    case "release":
        return FileLogger{Path: "/var/log/app.log"}
    case "test":
        return NullLogger{}
    default:
        return ConsoleLogger{}
    }
}

func main() {
    for _, mode := range []string{"debug", "release", "test"} {
        logger := newLogger(mode)
        logger.Log(fmt.Sprintf("running in %s mode", mode))
    }
}`,
      hints: [
        'Use a switch to select the implementation.',
        'In real Go, each logger would be in a build-tagged file.',
        'The interface ensures all loggers have the same API.',
      ],
      concepts: ['build tags', 'conditional compilation', 'interface'],
    },
    {
      id: 'go-bld-19',
      title: 'Refactor Runtime Checks to Tags',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor runtime.GOOS checks into a pattern suitable for build tags.',
      skeleton: `package main

import (
    "fmt"
    "runtime"
)

func configDir() string {
    switch runtime.GOOS {
    case "windows":
        return "C:\\\\Users\\\\user\\\\AppData"
    case "darwin":
        return "/Users/user/Library"
    case "linux":
        return "/home/user/.config"
    default:
        return "/tmp"
    }
}

func main() {
    fmt.Println("Config:", configDir())
}`,
      solution: `package main

import (
    "fmt"
    "os"
    "path/filepath"
    "runtime"
)

func configDir() string {
    home, _ := os.UserHomeDir()
    switch runtime.GOOS {
    case "windows":
        return filepath.Join(home, "AppData")
    case "darwin":
        return filepath.Join(home, "Library")
    default:
        return filepath.Join(home, ".config")
    }
}

func main() {
    fmt.Println("Config:", configDir())
}`,
      hints: [
        'Use os.UserHomeDir() instead of hardcoded paths.',
        'filepath.Join handles OS-specific separators.',
        'With build tags, each OS would have its own file.',
      ],
      concepts: ['build tags', 'refactoring', 'filepath'],
    },
    {
      id: 'go-bld-20',
      title: 'Refactor Monolithic to Tagged Files',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor a monolithic function into a pattern ready for build-tagged files.',
      skeleton: `package main

import (
    "fmt"
    "runtime"
)

// All platform logic in one function - hard to maintain
func notify(title, message string) error {
    switch runtime.GOOS {
    case "darwin":
        fmt.Printf("osascript -e 'display notification \"%s\" with title \"%s\"'\\n", message, title)
        return nil
    case "linux":
        fmt.Printf("notify-send '%s' '%s'\\n", title, message)
        return nil
    case "windows":
        fmt.Printf("powershell [toast] Title='%s' Message='%s'\\n", title, message)
        return nil
    default:
        return fmt.Errorf("unsupported OS: %s", runtime.GOOS)
    }
}

func main() {
    notify("Hello", "World")
}`,
      solution: `package main

import "fmt"

// In a build-tagged structure, you'd have:
// notify_darwin.go  (//go:build darwin)
// notify_linux.go   (//go:build linux)
// notify_windows.go (//go:build windows)
// Each implementing: func platformNotify(title, message string) error

// Common entry point that delegates to platform implementation
func notify(title, message string) error {
    return platformNotify(title, message)
}

// For this single-file exercise, simulate the platform function
func platformNotify(title, message string) error {
    fmt.Printf("Notification: [%s] %s\n", title, message)
    return nil
}

func main() {
    notify("Hello", "World")
}`,
      hints: [
        'Separate platform logic into individual functions.',
        'Each platform file implements platformNotify.',
        'The common file calls platformNotify without knowing the platform.',
      ],
      concepts: ['build tags', 'refactoring', 'platform abstraction'],
    },
  ],
};
