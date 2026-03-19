import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-io',
  title: '22. IO Reader & Writer',
  explanation: `## io.Reader and io.Writer in Go

The \`io.Reader\` and \`io.Writer\` interfaces are the foundation of Go's I/O model. Composing these interfaces enables powerful, flexible data pipelines.

\`\`\`go
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

// Common implementations
r := strings.NewReader("hello")   // Reader from string
var buf bytes.Buffer               // both Reader and Writer
r = bytes.NewReader(data)          // Reader from []byte

// Copy from Reader to Writer
io.Copy(dst, src)

// Read all bytes from Reader
data, err := io.ReadAll(r)

// Composing readers
r = io.LimitReader(r, 100)           // read at most 100 bytes
r = io.MultiReader(r1, r2, r3)       // concatenate readers
r, w := io.Pipe()                     // synchronous in-memory pipe
tee := io.TeeReader(r, w)            // read from r, write copy to w
\`\`\``,
  exercises: [
    {
      id: 'go-io-1',
      title: 'strings.NewReader',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Create an io.Reader from a string.',
      skeleton: `package main

import (
    "fmt"
    "io"
    "strings"
)

func main() {
    r := strings.__BLANK__("hello world")
    data, _ := io.ReadAll(r)
    fmt.Println(string(data))
}`,
      solution: `package main

import (
    "fmt"
    "io"
    "strings"
)

func main() {
    r := strings.NewReader("hello world")
    data, _ := io.ReadAll(r)
    fmt.Println(string(data))
}`,
      hints: [
        'strings.NewReader creates an io.Reader from a string.',
        'It returns a *strings.Reader which implements io.Reader.',
        'Useful when APIs require an io.Reader but you have a string.',
      ],
      concepts: ['strings.NewReader', 'io.Reader'],
    },
    {
      id: 'go-io-2',
      title: 'io.ReadAll',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Read all bytes from a reader into a byte slice.',
      skeleton: `package main

import (
    "fmt"
    "io"
    "strings"
)

func main() {
    r := strings.NewReader("Go is great")
    data, err := io.__BLANK__(r)
    if err != nil {
        panic(err)
    }
    fmt.Println(string(data))
}`,
      solution: `package main

import (
    "fmt"
    "io"
    "strings"
)

func main() {
    r := strings.NewReader("Go is great")
    data, err := io.ReadAll(r)
    if err != nil {
        panic(err)
    }
    fmt.Println(string(data))
}`,
      hints: [
        'io.ReadAll reads until EOF and returns all bytes.',
        'It returns ([]byte, error).',
        'Formerly ioutil.ReadAll, moved to io in Go 1.16.',
      ],
      concepts: ['io.ReadAll', 'reading bytes'],
    },
    {
      id: 'go-io-3',
      title: 'io.Copy',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Copy data from a reader to a writer.',
      skeleton: `package main

import (
    "bytes"
    "fmt"
    "io"
    "strings"
)

func main() {
    src := strings.NewReader("copy me")
    var dst bytes.Buffer
    io.__BLANK__(&dst, src)
    fmt.Println(dst.String())
}`,
      solution: `package main

import (
    "bytes"
    "fmt"
    "io"
    "strings"
)

func main() {
    src := strings.NewReader("copy me")
    var dst bytes.Buffer
    io.Copy(&dst, src)
    fmt.Println(dst.String())
}`,
      hints: [
        'io.Copy(dst, src) copies from src Reader to dst Writer.',
        'It returns (int64, error) with bytes written.',
        'bytes.Buffer implements io.Writer.',
      ],
      concepts: ['io.Copy', 'bytes.Buffer'],
    },
    {
      id: 'go-io-4',
      title: 'bytes.Buffer Write and Read',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use bytes.Buffer as both a Writer and Reader.',
      skeleton: `package main

import (
    "bytes"
    "fmt"
    "io"
)

func main() {
    var buf bytes.__BLANK__
    buf.WriteString("hello ")
    buf.WriteString("world")
    data, _ := io.ReadAll(&buf)
    fmt.Println(string(data))
}`,
      solution: `package main

import (
    "bytes"
    "fmt"
    "io"
)

func main() {
    var buf bytes.Buffer
    buf.WriteString("hello ")
    buf.WriteString("world")
    data, _ := io.ReadAll(&buf)
    fmt.Println(string(data))
}`,
      hints: [
        'bytes.Buffer implements both io.Reader and io.Writer.',
        'Use WriteString to add string data.',
        'Reading consumes the buffer contents.',
      ],
      concepts: ['bytes.Buffer', 'ReadWriter'],
    },
    {
      id: 'go-io-5',
      title: 'LimitReader',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Limit the number of bytes read from a reader.',
      skeleton: `package main

import (
    "fmt"
    "io"
    "strings"
)

func main() {
    r := strings.NewReader("hello world")
    limited := io.__BLANK__(r, 5)
    data, _ := io.ReadAll(limited)
    fmt.Println(string(data))
}`,
      solution: `package main

import (
    "fmt"
    "io"
    "strings"
)

func main() {
    r := strings.NewReader("hello world")
    limited := io.LimitReader(r, 5)
    data, _ := io.ReadAll(limited)
    fmt.Println(string(data))
}`,
      hints: [
        'io.LimitReader wraps a reader and stops after n bytes.',
        'Returns an io.Reader that reads at most n bytes.',
        'Reading beyond the limit returns 0, io.EOF.',
      ],
      concepts: ['io.LimitReader', 'bounded reading'],
    },
    {
      id: 'go-io-6',
      title: 'MultiReader',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Concatenate multiple readers into one sequential reader.',
      skeleton: `package main

import (
    "fmt"
    "io"
    "strings"
)

func main() {
    r1 := strings.NewReader("hello ")
    r2 := strings.NewReader("world")
    r := io.__BLANK__(r1, r2)
    data, _ := io.ReadAll(r)
    fmt.Println(string(data))
}`,
      solution: `package main

import (
    "fmt"
    "io"
    "strings"
)

func main() {
    r1 := strings.NewReader("hello ")
    r2 := strings.NewReader("world")
    r := io.MultiReader(r1, r2)
    data, _ := io.ReadAll(r)
    fmt.Println(string(data))
}`,
      hints: [
        'io.MultiReader concatenates readers sequentially.',
        'It reads from each reader in order until EOF.',
        'The combined reader returns EOF when the last reader is done.',
      ],
      concepts: ['io.MultiReader', 'reader concatenation'],
    },
    {
      id: 'go-io-7',
      title: 'TeeReader',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that reads from a reader while also writing the data to a buffer.',
      skeleton: `package main

import (
    "bytes"
    "io"
    "strings"
)

// ReadAndCapture reads all data from r, returns (data, captured copy, error)
// Use io.TeeReader to simultaneously read and capture`,
      solution: `package main

import (
    "bytes"
    "io"
    "strings"
)

func ReadAndCapture(r io.Reader) ([]byte, []byte, error) {
    var capture bytes.Buffer
    tee := io.TeeReader(r, &capture)
    data, err := io.ReadAll(tee)
    if err != nil {
        return nil, nil, err
    }
    return data, capture.Bytes(), nil
}`,
      hints: [
        'io.TeeReader reads from r and writes each read to w.',
        'The data flows through: r -> TeeReader -> both consumer and w.',
        'Like the Unix tee command.',
      ],
      concepts: ['io.TeeReader', 'stream splitting'],
    },
    {
      id: 'go-io-8',
      title: 'Implement io.Reader',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Implement the io.Reader interface for a type that repeats a single byte.',
      skeleton: `package main

import "io"

type RepeatReader struct {
    b byte
}

// Implement Read(p []byte) (int, error)
// Fill p with the repeated byte, return len(p), nil
// This reader never returns io.EOF`,
      solution: `package main

import "io"

type RepeatReader struct {
    b byte
}

func (r *RepeatReader) Read(p []byte) (int, error) {
    for i := range p {
        p[i] = r.b
    }
    return len(p), nil
}`,
      hints: [
        'Read must fill the provided buffer p.',
        'Return the number of bytes written and any error.',
        'For an infinite reader, always return len(p), nil.',
      ],
      concepts: ['io.Reader interface', 'custom reader'],
    },
    {
      id: 'go-io-9',
      title: 'Implement io.Writer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Implement io.Writer for a counting writer that tracks total bytes written.',
      skeleton: `package main

import "io"

type CountWriter struct {
    Total int
}

// Implement Write(p []byte) (int, error)
// Add len(p) to Total and return len(p), nil`,
      solution: `package main

import "io"

type CountWriter struct {
    Total int
}

func (w *CountWriter) Write(p []byte) (int, error) {
    w.Total += len(p)
    return len(p), nil
}`,
      hints: [
        'Write receives bytes in p and should process them.',
        'Return the number of bytes consumed and any error.',
        'A counting writer just tracks the total without storing data.',
      ],
      concepts: ['io.Writer interface', 'custom writer'],
    },
    {
      id: 'go-io-10',
      title: 'io.Pipe',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Use io.Pipe to connect a writer in one goroutine to a reader in another.',
      skeleton: `package main

import (
    "fmt"
    "io"
)

// PipeDemo writes "hello pipe" to a pipe writer in a goroutine
// and reads it from the pipe reader, returning the string
func PipeDemo() string {
    // Use io.Pipe() and a goroutine
}`,
      solution: `package main

import (
    "fmt"
    "io"
)

func PipeDemo() string {
    r, w := io.Pipe()
    go func() {
        fmt.Fprint(w, "hello pipe")
        w.Close()
    }()
    data, _ := io.ReadAll(r)
    return string(data)
}`,
      hints: [
        'io.Pipe returns a connected reader and writer.',
        'Writes block until the data is read.',
        'Close the writer to signal EOF to the reader.',
      ],
      concepts: ['io.Pipe', 'synchronous pipe'],
    },
    {
      id: 'go-io-11',
      title: 'Predict ReadAll Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the output when reading from a strings.NewReader.',
      skeleton: `package main

import (
    "fmt"
    "io"
    "strings"
)

func main() {
    r := strings.NewReader("abc")
    d1, _ := io.ReadAll(r)
    d2, _ := io.ReadAll(r)
    fmt.Printf("%q %q\\n", string(d1), string(d2))
}`,
      solution: `"abc" ""`,
      hints: [
        'ReadAll reads until EOF, consuming the reader.',
        'A second ReadAll on the same reader gets nothing.',
        'The reader position is at the end after first ReadAll.',
      ],
      concepts: ['reader consumption', 'io.ReadAll'],
    },
    {
      id: 'go-io-12',
      title: 'Predict LimitReader Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the output of a limited reader.',
      skeleton: `package main

import (
    "fmt"
    "io"
    "strings"
)

func main() {
    r := strings.NewReader("hello world")
    lr := io.LimitReader(r, 5)
    data, _ := io.ReadAll(lr)
    fmt.Println(string(data))
    fmt.Println(len(data))
}`,
      solution: `hello
5`,
      hints: [
        'LimitReader stops after 5 bytes.',
        '"hello world" limited to 5 bytes is "hello".',
        'len returns the number of bytes read.',
      ],
      concepts: ['io.LimitReader', 'byte counting'],
    },
    {
      id: 'go-io-13',
      title: 'Predict MultiReader Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the output when concatenating readers.',
      skeleton: `package main

import (
    "fmt"
    "io"
    "strings"
)

func main() {
    r1 := strings.NewReader("ab")
    r2 := strings.NewReader("cd")
    r3 := strings.NewReader("ef")
    r := io.MultiReader(r1, r2, r3)
    data, _ := io.ReadAll(r)
    fmt.Println(string(data))
}`,
      solution: `abcdef`,
      hints: [
        'MultiReader reads from each reader sequentially.',
        'When r1 is exhausted, it moves to r2, then r3.',
        'The output is the concatenation of all readers.',
      ],
      concepts: ['io.MultiReader', 'sequential reading'],
    },
    {
      id: 'go-io-14',
      title: 'Fix Read Method',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the Read method that does not properly signal end of data.',
      skeleton: `package main

import "io"

type OnceReader struct {
    data []byte
    done bool
}

func (r *OnceReader) Read(p []byte) (int, error) {
    if r.done {
        return 0, nil
    }
    n := copy(p, r.data)
    r.done = true
    return n, nil
}`,
      solution: `package main

import "io"

type OnceReader struct {
    data []byte
    done bool
}

func (r *OnceReader) Read(p []byte) (int, error) {
    if r.done {
        return 0, io.EOF
    }
    n := copy(p, r.data)
    r.done = true
    return n, io.EOF
}`,
      hints: [
        'Read must return io.EOF when there is no more data.',
        'Returning (0, nil) means "no data yet, try again" which causes infinite loops.',
        'Return io.EOF when the reader is exhausted.',
      ],
      concepts: ['io.EOF', 'Read contract'],
    },
    {
      id: 'go-io-15',
      title: 'Fix Write Return Value',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the Write method that returns incorrect byte count.',
      skeleton: `package main

import "io"

type UpperWriter struct {
    w io.Writer
}

func (uw *UpperWriter) Write(p []byte) (int, error) {
    upper := make([]byte, len(p))
    for i, b := range p {
        if b >= 'a' && b <= 'z' {
            upper[i] = b - 32
        } else {
            upper[i] = b
        }
    }
    return uw.w.Write(upper)
}`,
      solution: `package main

import "io"

type UpperWriter struct {
    w io.Writer
}

func (uw *UpperWriter) Write(p []byte) (int, error) {
    upper := make([]byte, len(p))
    for i, b := range p {
        if b >= 'a' && b <= 'z' {
            upper[i] = b - 32
        } else {
            upper[i] = b
        }
    }
    n, err := uw.w.Write(upper)
    if n != len(p) && err == nil {
        err = io.ErrShortWrite
    }
    return len(p), err
}`,
      hints: [
        'Write should return len(p) to the caller if all bytes were handled.',
        'If the underlying writer writes fewer bytes, report ErrShortWrite.',
        'Callers expect Write to return the number of bytes from the original p.',
      ],
      concepts: ['Write contract', 'io.ErrShortWrite', 'byte count'],
    },
    {
      id: 'go-io-16',
      title: 'Fix Missing Close',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the pipe writer that is never closed, causing the reader to block forever.',
      skeleton: `package main

import (
    "fmt"
    "io"
)

func main() {
    r, w := io.Pipe()
    go func() {
        fmt.Fprint(w, "hello")
    }()
    data, _ := io.ReadAll(r)
    fmt.Println(string(data))
}`,
      solution: `package main

import (
    "fmt"
    "io"
)

func main() {
    r, w := io.Pipe()
    go func() {
        fmt.Fprint(w, "hello")
        w.Close()
    }()
    data, _ := io.ReadAll(r)
    fmt.Println(string(data))
}`,
      hints: [
        'io.ReadAll reads until EOF.',
        'A pipe writer must be closed to signal EOF.',
        'Without Close, ReadAll blocks forever.',
      ],
      concepts: ['io.Pipe', 'Close', 'EOF signaling'],
    },
    {
      id: 'go-io-17',
      title: 'Write MultiWriter Logger',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that writes to both stdout and a buffer simultaneously.',
      skeleton: `package main

import (
    "bytes"
    "io"
    "os"
)

// DualWrite writes message to both os.Stdout and a buffer
// Returns the buffer contents as a string
// Use io.MultiWriter`,
      solution: `package main

import (
    "bytes"
    "fmt"
    "io"
    "os"
)

func DualWrite(message string) string {
    var buf bytes.Buffer
    w := io.MultiWriter(os.Stdout, &buf)
    fmt.Fprint(w, message)
    return buf.String()
}`,
      hints: [
        'io.MultiWriter creates a writer that writes to all provided writers.',
        'A single Write call goes to every underlying writer.',
        'Like Unix tee for writers.',
      ],
      concepts: ['io.MultiWriter', 'fan-out writing'],
    },
    {
      id: 'go-io-18',
      title: 'Write SectionReader',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Read a specific section of data using io.SectionReader.',
      skeleton: `package main

import (
    "io"
    "strings"
)

// ReadSection reads n bytes starting at offset from the string s
// Use io.NewSectionReader
func ReadSection(s string, offset int64, n int64) (string, error) {
}`,
      solution: `package main

import (
    "io"
    "strings"
)

func ReadSection(s string, offset int64, n int64) (string, error) {
    r := strings.NewReader(s)
    sr := io.NewSectionReader(r, offset, n)
    data, err := io.ReadAll(sr)
    return string(data), err
}`,
      hints: [
        'io.NewSectionReader reads from an offset for n bytes.',
        'The underlying reader must implement io.ReaderAt.',
        'strings.Reader implements io.ReaderAt.',
      ],
      concepts: ['io.SectionReader', 'io.ReaderAt', 'partial reading'],
    },
    {
      id: 'go-io-19',
      title: 'Refactor to Use io.Copy',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor manual byte copying to use io.Copy.',
      skeleton: `package main

import (
    "bytes"
    "strings"
)

func Transfer(src *strings.Reader) string {
    var dst bytes.Buffer
    buf := make([]byte, 1024)
    for {
        n, err := src.Read(buf)
        if n > 0 {
            dst.Write(buf[:n])
        }
        if err != nil {
            break
        }
    }
    return dst.String()
}`,
      solution: `package main

import (
    "bytes"
    "io"
    "strings"
)

func Transfer(src *strings.Reader) string {
    var dst bytes.Buffer
    io.Copy(&dst, src)
    return dst.String()
}`,
      hints: [
        'io.Copy handles the read loop and buffering internally.',
        'It reads from src and writes to dst until EOF.',
        'Much simpler and less error-prone than manual copying.',
      ],
      concepts: ['io.Copy', 'simplification'],
    },
    {
      id: 'go-io-20',
      title: 'Refactor Custom Buffer to bytes.Buffer',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Replace a custom byte accumulator with bytes.Buffer.',
      skeleton: `package main

type Accumulator struct {
    data []byte
}

func (a *Accumulator) Add(p []byte) {
    a.data = append(a.data, p...)
}

func (a *Accumulator) Result() string {
    return string(a.data)
}

func BuildString(parts []string) string {
    acc := &Accumulator{}
    for _, p := range parts {
        acc.Add([]byte(p))
    }
    return acc.Result()
}`,
      solution: `package main

import "bytes"

func BuildString(parts []string) string {
    var buf bytes.Buffer
    for _, p := range parts {
        buf.WriteString(p)
    }
    return buf.String()
}`,
      hints: [
        'bytes.Buffer does exactly what Accumulator does, but better.',
        'WriteString avoids the []byte conversion.',
        'Buffer.String() returns the accumulated string.',
      ],
      concepts: ['bytes.Buffer', 'WriteString', 'standard library'],
    },
  ],
};
