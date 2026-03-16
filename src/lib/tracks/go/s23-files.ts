import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-files',
  title: '23. Files',
  explanation: `## File Operations in Go

Go provides file operations through the \`os\` package with helper functions and the \`bufio\` package for buffered I/O.

\`\`\`go
// Read entire file
data, err := os.ReadFile("config.json")

// Write entire file
err := os.WriteFile("output.txt", []byte("hello"), 0644)

// Open for reading
f, err := os.Open("data.txt")
defer f.Close()

// Create/truncate for writing
f, err := os.Create("output.txt")
defer f.Close()

// Buffered reading line by line
scanner := bufio.NewScanner(f)
for scanner.Scan() {
    line := scanner.Text()
}

// File info
info, err := os.Stat("file.txt")
info.Size()    // file size
info.IsDir()   // is directory?
info.ModTime() // modification time

// Paths
path := filepath.Join("dir", "sub", "file.txt")
dir := filepath.Dir(path)
ext := filepath.Ext(path)
\`\`\``,
  exercises: [
    {
      id: 'go-files-1',
      title: 'Read Entire File',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Read the entire contents of a file into a byte slice.',
      skeleton: `package main

import (
    "fmt"
    "os"
)

func main() {
    data, err := os.__BLANK__("message.txt")
    if err != nil {
        panic(err)
    }
    fmt.Println(string(data))
}`,
      solution: `package main

import (
    "fmt"
    "os"
)

func main() {
    data, err := os.ReadFile("message.txt")
    if err != nil {
        panic(err)
    }
    fmt.Println(string(data))
}`,
      hints: [
        'os.ReadFile reads the entire file into memory.',
        'It returns ([]byte, error).',
        'Formerly ioutil.ReadFile, moved to os in Go 1.16.',
      ],
      concepts: ['os.ReadFile', 'file reading'],
    },
    {
      id: 'go-files-2',
      title: 'Write Entire File',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a byte slice to a file, creating it if it does not exist.',
      skeleton: `package main

import "os"

func main() {
    content := []byte("Hello, file!")
    err := os.__BLANK__("output.txt", content, 0644)
    if err != nil {
        panic(err)
    }
}`,
      solution: `package main

import "os"

func main() {
    content := []byte("Hello, file!")
    err := os.WriteFile("output.txt", content, 0644)
    if err != nil {
        panic(err)
    }
}`,
      hints: [
        'os.WriteFile writes data to a file, creating or truncating it.',
        '0644 is the file permission (owner read/write, others read).',
        'It handles open, write, and close internally.',
      ],
      concepts: ['os.WriteFile', 'file permissions'],
    },
    {
      id: 'go-files-3',
      title: 'Open and Defer Close',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Open a file for reading and ensure it is closed when done.',
      skeleton: `package main

import (
    "fmt"
    "io"
    "os"
)

func main() {
    f, err := os.__BLANK__("data.txt")
    if err != nil {
        panic(err)
    }
    defer f.__BLANK__()
    data, _ := io.ReadAll(f)
    fmt.Println(string(data))
}`,
      solution: `package main

import (
    "fmt"
    "io"
    "os"
)

func main() {
    f, err := os.Open("data.txt")
    if err != nil {
        panic(err)
    }
    defer f.Close()
    data, _ := io.ReadAll(f)
    fmt.Println(string(data))
}`,
      hints: [
        'os.Open opens a file for reading only.',
        'defer f.Close() ensures the file is closed when the function returns.',
        'Always close files to release OS resources.',
      ],
      concepts: ['os.Open', 'defer Close', 'resource cleanup'],
    },
    {
      id: 'go-files-4',
      title: 'Create a File',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Create a new file for writing.',
      skeleton: `package main

import (
    "fmt"
    "os"
)

func main() {
    f, err := os.__BLANK__("newfile.txt")
    if err != nil {
        panic(err)
    }
    defer f.Close()
    fmt.Fprintln(f, "Hello from Go!")
}`,
      solution: `package main

import (
    "fmt"
    "os"
)

func main() {
    f, err := os.Create("newfile.txt")
    if err != nil {
        panic(err)
    }
    defer f.Close()
    fmt.Fprintln(f, "Hello from Go!")
}`,
      hints: [
        'os.Create creates or truncates the file for writing.',
        'It returns (*os.File, error).',
        'fmt.Fprintln writes to any io.Writer including files.',
      ],
      concepts: ['os.Create', 'file writing', 'fmt.Fprintln'],
    },
    {
      id: 'go-files-5',
      title: 'Buffered Scanner',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Read a file line by line using bufio.Scanner.',
      skeleton: `package main

import (
    "bufio"
    "fmt"
    "os"
)

func main() {
    f, _ := os.Open("lines.txt")
    defer f.Close()

    scanner := bufio.__BLANK__(f)
    for scanner.__BLANK__() {
        fmt.Println(scanner.Text())
    }
}`,
      solution: `package main

import (
    "bufio"
    "fmt"
    "os"
)

func main() {
    f, _ := os.Open("lines.txt")
    defer f.Close()

    scanner := bufio.NewScanner(f)
    for scanner.Scan() {
        fmt.Println(scanner.Text())
    }
}`,
      hints: [
        'bufio.NewScanner creates a scanner from an io.Reader.',
        'scanner.Scan() advances to the next token (line by default).',
        'scanner.Text() returns the current token as a string.',
      ],
      concepts: ['bufio.Scanner', 'line-by-line reading'],
    },
    {
      id: 'go-files-6',
      title: 'filepath.Join',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Build a cross-platform file path using filepath.Join.',
      skeleton: `package main

import (
    "fmt"
    "path/filepath"
)

func main() {
    path := filepath.__BLANK__("home", "user", "docs", "file.txt")
    fmt.Println(path)
}`,
      solution: `package main

import (
    "fmt"
    "path/filepath"
)

func main() {
    path := filepath.Join("home", "user", "docs", "file.txt")
    fmt.Println(path)
}`,
      hints: [
        'filepath.Join joins path elements with the OS separator.',
        'It cleans up redundant separators and dots.',
        'Always use Join instead of string concatenation for paths.',
      ],
      concepts: ['filepath.Join', 'cross-platform paths'],
    },
    {
      id: 'go-files-7',
      title: 'Check File Exists',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that checks if a file exists using os.Stat.',
      skeleton: `package main

import "os"

// FileExists returns true if path exists and is not a directory
func FileExists(path string) bool {
}`,
      solution: `package main

import "os"

func FileExists(path string) bool {
    info, err := os.Stat(path)
    if err != nil {
        return false
    }
    return !info.IsDir()
}`,
      hints: [
        'os.Stat returns file info or an error if the file does not exist.',
        'Check os.IsNotExist(err) or just check err != nil.',
        'Use info.IsDir() to distinguish files from directories.',
      ],
      concepts: ['os.Stat', 'os.IsNotExist', 'file existence'],
    },
    {
      id: 'go-files-8',
      title: 'Create Directory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that creates nested directories.',
      skeleton: `package main

import "os"

// EnsureDir creates the directory and all parents if they don't exist
func EnsureDir(path string) error {
}`,
      solution: `package main

import "os"

func EnsureDir(path string) error {
    return os.MkdirAll(path, 0755)
}`,
      hints: [
        'os.MkdirAll creates a directory and all necessary parents.',
        '0755 gives read/execute to all, write to owner.',
        'It returns nil if the directory already exists.',
      ],
      concepts: ['os.MkdirAll', 'directory creation'],
    },
    {
      id: 'go-files-9',
      title: 'Read File with Buffered Reader',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that counts lines in a file using bufio.Scanner.',
      skeleton: `package main

import (
    "bufio"
    "os"
)

// CountLines returns the number of lines in the file at path
func CountLines(path string) (int, error) {
}`,
      solution: `package main

import (
    "bufio"
    "os"
)

func CountLines(path string) (int, error) {
    f, err := os.Open(path)
    if err != nil {
        return 0, err
    }
    defer f.Close()

    count := 0
    scanner := bufio.NewScanner(f)
    for scanner.Scan() {
        count++
    }
    return count, scanner.Err()
}`,
      hints: [
        'Open the file, create a scanner, count Scan iterations.',
        'Always check scanner.Err() after the loop for read errors.',
        'defer f.Close() to clean up the file handle.',
      ],
      concepts: ['bufio.Scanner', 'line counting', 'scanner.Err'],
    },
    {
      id: 'go-files-10',
      title: 'Write with Buffered Writer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write multiple lines to a file using bufio.Writer for efficiency.',
      skeleton: `package main

import (
    "bufio"
    "fmt"
    "os"
)

// WriteLines writes a slice of strings to a file, one per line
func WriteLines(path string, lines []string) error {
}`,
      solution: `package main

import (
    "bufio"
    "fmt"
    "os"
)

func WriteLines(path string, lines []string) error {
    f, err := os.Create(path)
    if err != nil {
        return err
    }
    defer f.Close()

    w := bufio.NewWriter(f)
    for _, line := range lines {
        fmt.Fprintln(w, line)
    }
    return w.Flush()
}`,
      hints: [
        'bufio.NewWriter wraps a writer with buffering.',
        'You must call w.Flush() to write remaining buffered data.',
        'fmt.Fprintln writes a line with a newline.',
      ],
      concepts: ['bufio.Writer', 'Flush', 'buffered writing'],
    },
    {
      id: 'go-files-11',
      title: 'Predict Open Error',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict what happens when opening a nonexistent file.',
      skeleton: `package main

import (
    "fmt"
    "os"
)

func main() {
    _, err := os.Open("nonexistent.txt")
    fmt.Println(os.IsNotExist(err))
}`,
      solution: `true`,
      hints: [
        'os.Open returns an error if the file does not exist.',
        'os.IsNotExist checks if the error indicates a missing file.',
        'The function returns true for file-not-found errors.',
      ],
      concepts: ['os.IsNotExist', 'file errors'],
    },
    {
      id: 'go-files-12',
      title: 'Predict filepath.Ext',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the file extension returned by filepath.Ext.',
      skeleton: `package main

import (
    "fmt"
    "path/filepath"
)

func main() {
    fmt.Println(filepath.Ext("report.tar.gz"))
    fmt.Println(filepath.Ext("noext"))
    fmt.Println(filepath.Ext(".hidden"))
}`,
      solution: `.gz
(empty string)
(empty string)`,
      hints: [
        'filepath.Ext returns the last extension including the dot.',
        'For "report.tar.gz" it returns ".gz", not ".tar.gz".',
        'Files with no dot or only a leading dot have no extension.',
      ],
      concepts: ['filepath.Ext', 'file extensions'],
    },
    {
      id: 'go-files-13',
      title: 'Predict filepath.Dir and Base',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the directory and base components of a path.',
      skeleton: `package main

import (
    "fmt"
    "path/filepath"
)

func main() {
    p := "/home/user/docs/file.txt"
    fmt.Println(filepath.Dir(p))
    fmt.Println(filepath.Base(p))
}`,
      solution: `/home/user/docs
file.txt`,
      hints: [
        'filepath.Dir returns everything except the last element.',
        'filepath.Base returns the last element of the path.',
        'These are the inverse of filepath.Join.',
      ],
      concepts: ['filepath.Dir', 'filepath.Base'],
    },
    {
      id: 'go-files-14',
      title: 'Fix File Not Closed',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the file that is never closed, leaking a file descriptor.',
      skeleton: `package main

import (
    "fmt"
    "io"
    "os"
)

func ReadConfig() (string, error) {
    f, err := os.Open("config.txt")
    if err != nil {
        return "", err
    }
    data, err := io.ReadAll(f)
    if err != nil {
        return "", err
    }
    return string(data), nil
}`,
      solution: `package main

import (
    "fmt"
    "io"
    "os"
)

func ReadConfig() (string, error) {
    f, err := os.Open("config.txt")
    if err != nil {
        return "", err
    }
    defer f.Close()
    data, err := io.ReadAll(f)
    if err != nil {
        return "", err
    }
    return string(data), nil
}`,
      hints: [
        'Files must be closed after use to avoid leaking descriptors.',
        'Add defer f.Close() right after opening the file.',
        'defer ensures Close runs even if an error occurs later.',
      ],
      concepts: ['defer Close', 'resource leak', 'file descriptor'],
    },
    {
      id: 'go-files-15',
      title: 'Fix Scanner Buffer Overflow',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix a scanner that fails on lines longer than the default buffer size.',
      skeleton: `package main

import (
    "bufio"
    "fmt"
    "os"
)

func ReadLongLines(path string) ([]string, error) {
    f, err := os.Open(path)
    if err != nil {
        return nil, err
    }
    defer f.Close()

    var lines []string
    scanner := bufio.NewScanner(f)
    for scanner.Scan() {
        lines = append(lines, scanner.Text())
    }
    return lines, scanner.Err()
}`,
      solution: `package main

import (
    "bufio"
    "fmt"
    "os"
)

func ReadLongLines(path string) ([]string, error) {
    f, err := os.Open(path)
    if err != nil {
        return nil, err
    }
    defer f.Close()

    var lines []string
    scanner := bufio.NewScanner(f)
    scanner.Buffer(make([]byte, 0, 1024*1024), 1024*1024)
    for scanner.Scan() {
        lines = append(lines, scanner.Text())
    }
    return lines, scanner.Err()
}`,
      hints: [
        'Default scanner buffer is 64KB, which may be too small.',
        'scanner.Buffer sets a custom buffer and max size.',
        'Set it to 1MB for files with very long lines.',
      ],
      concepts: ['scanner.Buffer', 'bufio.MaxScanTokenSize'],
    },
    {
      id: 'go-files-16',
      title: 'Fix Append vs Truncate',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix a function that should append to a file but truncates it instead.',
      skeleton: `package main

import (
    "fmt"
    "os"
)

func AppendLog(path string, message string) error {
    f, err := os.Create(path)
    if err != nil {
        return err
    }
    defer f.Close()
    _, err = fmt.Fprintln(f, message)
    return err
}`,
      solution: `package main

import (
    "fmt"
    "os"
)

func AppendLog(path string, message string) error {
    f, err := os.OpenFile(path, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
    if err != nil {
        return err
    }
    defer f.Close()
    _, err = fmt.Fprintln(f, message)
    return err
}`,
      hints: [
        'os.Create truncates the file, losing existing content.',
        'Use os.OpenFile with os.O_APPEND flag to append.',
        'os.O_CREATE|os.O_APPEND|os.O_WRONLY is the standard append pattern.',
      ],
      concepts: ['os.OpenFile', 'O_APPEND', 'file flags'],
    },
    {
      id: 'go-files-17',
      title: 'Walk Directory Tree',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a function that finds all .go files in a directory tree.',
      skeleton: `package main

import (
    "path/filepath"
    "strings"
)

// FindGoFiles returns all .go file paths under root
func FindGoFiles(root string) ([]string, error) {
}`,
      solution: `package main

import (
    "os"
    "path/filepath"
)

func FindGoFiles(root string) ([]string, error) {
    var files []string
    err := filepath.WalkDir(root, func(path string, d os.DirEntry, err error) error {
        if err != nil {
            return err
        }
        if !d.IsDir() && filepath.Ext(path) == ".go" {
            files = append(files, path)
        }
        return nil
    })
    return files, err
}`,
      hints: [
        'filepath.WalkDir traverses a directory tree recursively.',
        'The callback receives path, DirEntry, and error.',
        'Check filepath.Ext for the file extension.',
      ],
      concepts: ['filepath.WalkDir', 'directory traversal', 'DirEntry'],
    },
    {
      id: 'go-files-18',
      title: 'Copy File',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that copies a file from src to dst.',
      skeleton: `package main

import (
    "io"
    "os"
)

// CopyFile copies file from src path to dst path
func CopyFile(src, dst string) error {
}`,
      solution: `package main

import (
    "io"
    "os"
)

func CopyFile(src, dst string) error {
    in, err := os.Open(src)
    if err != nil {
        return err
    }
    defer in.Close()

    out, err := os.Create(dst)
    if err != nil {
        return err
    }
    defer out.Close()

    _, err = io.Copy(out, in)
    return err
}`,
      hints: [
        'Open the source for reading, create the destination for writing.',
        'io.Copy transfers all data from reader to writer.',
        'Defer Close on both files.',
      ],
      concepts: ['io.Copy', 'file copying', 'os.Open', 'os.Create'],
    },
    {
      id: 'go-files-19',
      title: 'Refactor to os.ReadFile',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Simplify file reading by replacing open/read/close with os.ReadFile.',
      skeleton: `package main

import (
    "io"
    "os"
)

func LoadConfig(path string) ([]byte, error) {
    f, err := os.Open(path)
    if err != nil {
        return nil, err
    }
    defer f.Close()
    data, err := io.ReadAll(f)
    if err != nil {
        return nil, err
    }
    return data, nil
}`,
      solution: `package main

import "os"

func LoadConfig(path string) ([]byte, error) {
    return os.ReadFile(path)
}`,
      hints: [
        'os.ReadFile does open, read all, and close in one call.',
        'It returns ([]byte, error) just like the manual version.',
        'Use when you need the entire file contents.',
      ],
      concepts: ['os.ReadFile', 'simplification'],
    },
    {
      id: 'go-files-20',
      title: 'Refactor to os.WriteFile',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Simplify file writing by replacing create/write/close with os.WriteFile.',
      skeleton: `package main

import "os"

func SaveData(path string, data []byte) error {
    f, err := os.Create(path)
    if err != nil {
        return err
    }
    defer f.Close()
    _, err = f.Write(data)
    return err
}`,
      solution: `package main

import "os"

func SaveData(path string, data []byte) error {
    return os.WriteFile(path, data, 0644)
}`,
      hints: [
        'os.WriteFile handles create, write, and close.',
        'Specify the file permission as the third argument.',
        'It truncates the file if it already exists.',
      ],
      concepts: ['os.WriteFile', 'simplification'],
    },
  ],
};
