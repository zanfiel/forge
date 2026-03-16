import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-httpc',
  title: '25. HTTP Client',
  explanation: `## HTTP Client in Go

The \`net/http\` package provides a full-featured HTTP client. The default client handles most use cases, but custom clients offer more control.

\`\`\`go
// Simple GET
resp, err := http.Get("https://api.example.com/data")
defer resp.Body.Close()
body, _ := io.ReadAll(resp.Body)

// POST with JSON body
data := bytes.NewBuffer(jsonBytes)
resp, err := http.Post(url, "application/json", data)

// Custom request
req, err := http.NewRequest("PUT", url, body)
req.Header.Set("Authorization", "Bearer token")
req.Header.Set("Content-Type", "application/json")

client := &http.Client{Timeout: 10 * time.Second}
resp, err := client.Do(req)

// Check status
if resp.StatusCode != http.StatusOK {
    // handle error
}

// With context
req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
\`\`\``,
  exercises: [
    {
      id: 'go-httpc-1',
      title: 'Simple GET Request',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Make a simple HTTP GET request.',
      skeleton: `package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    resp, err := http.__BLANK__("https://example.com")
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()
    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`,
      solution: `package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    resp, err := http.Get("https://example.com")
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()
    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`,
      hints: [
        'http.Get is the simplest way to make a GET request.',
        'Always defer resp.Body.Close() to prevent resource leaks.',
        'Read the body with io.ReadAll.',
      ],
      concepts: ['http.Get', 'response body'],
    },
    {
      id: 'go-httpc-2',
      title: 'Close Response Body',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Properly close the response body using defer.',
      skeleton: `package main

import (
    "io"
    "net/http"
)

func Fetch(url string) ([]byte, error) {
    resp, err := http.Get(url)
    if err != nil {
        return nil, err
    }
    __BLANK__ resp.Body.Close()
    return io.ReadAll(resp.Body)
}`,
      solution: `package main

import (
    "io"
    "net/http"
)

func Fetch(url string) ([]byte, error) {
    resp, err := http.Get(url)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    return io.ReadAll(resp.Body)
}`,
      hints: [
        'defer ensures Close is called when the function returns.',
        'Failing to close the body leaks connections.',
        'Always close even if you do not read the body.',
      ],
      concepts: ['defer', 'resp.Body.Close', 'resource leak'],
    },
    {
      id: 'go-httpc-3',
      title: 'Check Status Code',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Check the HTTP response status code.',
      skeleton: `package main

import (
    "fmt"
    "net/http"
)

func CheckURL(url string) error {
    resp, err := http.Get(url)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    if resp.__BLANK__ != http.StatusOK {
        return fmt.Errorf("unexpected status: %d", resp.StatusCode)
    }
    return nil
}`,
      solution: `package main

import (
    "fmt"
    "net/http"
)

func CheckURL(url string) error {
    resp, err := http.Get(url)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    if resp.StatusCode != http.StatusOK {
        return fmt.Errorf("unexpected status: %d", resp.StatusCode)
    }
    return nil
}`,
      hints: [
        'resp.StatusCode is an int (e.g., 200, 404, 500).',
        'http.StatusOK is the constant for 200.',
        'Always check status codes; a nil error only means the request completed.',
      ],
      concepts: ['StatusCode', 'http.StatusOK'],
    },
    {
      id: 'go-httpc-4',
      title: 'Custom Client with Timeout',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Create an HTTP client with a timeout.',
      skeleton: `package main

import (
    "net/http"
    "time"
)

func NewClient() *http.Client {
    return &http.Client{
        __BLANK__: 10 * time.Second,
    }
}`,
      solution: `package main

import (
    "net/http"
    "time"
)

func NewClient() *http.Client {
    return &http.Client{
        Timeout: 10 * time.Second,
    }
}`,
      hints: [
        'http.Client has a Timeout field for total request timeout.',
        'The default client has no timeout, which can hang forever.',
        'Always set a timeout in production code.',
      ],
      concepts: ['http.Client', 'Timeout'],
    },
    {
      id: 'go-httpc-5',
      title: 'POST with JSON Body',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that sends a JSON POST request.',
      skeleton: `package main

import (
    "bytes"
    "encoding/json"
    "io"
    "net/http"
)

type CreateUser struct {
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

// PostUser sends a POST request with the user as JSON body
// Returns the response body as a string
func PostUser(url string, user CreateUser) (string, error) {
}`,
      solution: `package main

import (
    "bytes"
    "encoding/json"
    "io"
    "net/http"
)

type CreateUser struct {
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

func PostUser(url string, user CreateUser) (string, error) {
    data, err := json.Marshal(user)
    if err != nil {
        return "", err
    }
    resp, err := http.Post(url, "application/json", bytes.NewBuffer(data))
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()
    body, err := io.ReadAll(resp.Body)
    return string(body), err
}`,
      hints: [
        'Marshal the struct to JSON bytes first.',
        'Use bytes.NewBuffer to create an io.Reader from bytes.',
        'Set content type to "application/json".',
      ],
      concepts: ['http.Post', 'JSON body', 'bytes.NewBuffer'],
    },
    {
      id: 'go-httpc-6',
      title: 'Custom Request with Headers',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that makes a GET request with custom headers.',
      skeleton: `package main

import (
    "io"
    "net/http"
)

// FetchWithAuth makes a GET request with an Authorization header
func FetchWithAuth(url, token string) ([]byte, error) {
}`,
      solution: `package main

import (
    "io"
    "net/http"
)

func FetchWithAuth(url, token string) ([]byte, error) {
    req, err := http.NewRequest("GET", url, nil)
    if err != nil {
        return nil, err
    }
    req.Header.Set("Authorization", "Bearer "+token)

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    return io.ReadAll(resp.Body)
}`,
      hints: [
        'http.NewRequest creates a request you can customize.',
        'Use req.Header.Set to add headers.',
        'client.Do sends the request.',
      ],
      concepts: ['http.NewRequest', 'Header.Set', 'client.Do'],
    },
    {
      id: 'go-httpc-7',
      title: 'Request with Context',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Create an HTTP request that respects a context for cancellation.',
      skeleton: `package main

import (
    "context"
    "io"
    "net/http"
    "time"
)

func FetchWithTimeout(url string) ([]byte, error) {
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    req, err := http.__BLANK__(ctx, "GET", url, nil)
    if err != nil {
        return nil, err
    }
    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    return io.ReadAll(resp.Body)
}`,
      solution: `package main

import (
    "context"
    "io"
    "net/http"
    "time"
)

func FetchWithTimeout(url string) ([]byte, error) {
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
    if err != nil {
        return nil, err
    }
    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    return io.ReadAll(resp.Body)
}`,
      hints: [
        'http.NewRequestWithContext attaches a context to the request.',
        'The request is cancelled when the context expires.',
        'This is preferred over client.Timeout for fine-grained control.',
      ],
      concepts: ['NewRequestWithContext', 'context cancellation'],
    },
    {
      id: 'go-httpc-8',
      title: 'Parse JSON Response',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that fetches JSON and decodes it into a struct.',
      skeleton: `package main

import (
    "encoding/json"
    "net/http"
)

type APIResponse struct {
    Status  string \`json:"status"\`
    Message string \`json:"message"\`
}

// FetchAPI makes GET request and decodes JSON response
func FetchAPI(url string) (APIResponse, error) {
}`,
      solution: `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

type APIResponse struct {
    Status  string \`json:"status"\`
    Message string \`json:"message"\`
}

func FetchAPI(url string) (APIResponse, error) {
    var result APIResponse
    resp, err := http.Get(url)
    if err != nil {
        return result, err
    }
    defer resp.Body.Close()
    if resp.StatusCode != http.StatusOK {
        return result, fmt.Errorf("status %d", resp.StatusCode)
    }
    err = json.NewDecoder(resp.Body).Decode(&result)
    return result, err
}`,
      hints: [
        'Use json.NewDecoder on resp.Body for streaming decode.',
        'Check the status code before attempting to decode.',
        'This is more efficient than ReadAll + Unmarshal.',
      ],
      concepts: ['json.NewDecoder', 'response decoding'],
    },
    {
      id: 'go-httpc-9',
      title: 'Predict Default Client Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict what happens when using the default HTTP client without a timeout.',
      skeleton: `package main

import "net/http"

// What happens if the server never responds and you use:
// resp, err := http.Get("http://slow-server.example.com")
//
// A) Returns error after 30 seconds
// B) Returns error after 60 seconds
// C) Blocks forever (no default timeout)
// D) Returns nil response immediately`,
      solution: `C) Blocks forever (no default timeout)`,
      hints: [
        'http.DefaultClient has zero timeout.',
        'A zero timeout means no timeout at all.',
        'Always set a timeout in production code.',
      ],
      concepts: ['default client', 'timeout behavior'],
    },
    {
      id: 'go-httpc-10',
      title: 'Predict Response Body Reuse',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict what happens when reading the response body twice.',
      skeleton: `package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    resp, _ := http.Get("https://example.com")
    defer resp.Body.Close()
    d1, _ := io.ReadAll(resp.Body)
    d2, _ := io.ReadAll(resp.Body)
    fmt.Println(len(d1) > 0)
    fmt.Println(len(d2) > 0)
}`,
      solution: `true
false`,
      hints: [
        'resp.Body is a stream that can only be read once.',
        'After ReadAll consumes it, subsequent reads return nothing.',
        'If you need the body multiple times, save the bytes.',
      ],
      concepts: ['response body', 'stream consumption'],
    },
    {
      id: 'go-httpc-11',
      title: 'Predict Status Check',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict whether http.Get returns an error for a 404 response.',
      skeleton: `package main

import "net/http"

// If http.Get returns a 404 response:
// resp, err := http.Get("https://example.com/notfound")
//
// A) err is non-nil, resp is nil
// B) err is nil, resp.StatusCode is 404
// C) err contains "404 not found"
// D) Panics at runtime`,
      solution: `B) err is nil, resp.StatusCode is 404`,
      hints: [
        'http.Get only returns an error for network/protocol failures.',
        'A 404 is a successful HTTP response with status 404.',
        'You must check resp.StatusCode yourself.',
      ],
      concepts: ['error vs status code', 'HTTP semantics'],
    },
    {
      id: 'go-httpc-12',
      title: 'Fix Missing Body Close',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the function that leaks connections by not closing the response body.',
      skeleton: `package main

import (
    "io"
    "net/http"
)

func Download(url string) ([]byte, error) {
    resp, err := http.Get(url)
    if err != nil {
        return nil, err
    }
    return io.ReadAll(resp.Body)
}`,
      solution: `package main

import (
    "io"
    "net/http"
)

func Download(url string) ([]byte, error) {
    resp, err := http.Get(url)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    return io.ReadAll(resp.Body)
}`,
      hints: [
        'Response bodies must always be closed.',
        'Unclosed bodies leak TCP connections.',
        'Add defer resp.Body.Close() after the error check.',
      ],
      concepts: ['resource leak', 'Body.Close'],
    },
    {
      id: 'go-httpc-13',
      title: 'Fix Close Before Error Check',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the defer that will panic on nil response.',
      skeleton: `package main

import (
    "io"
    "net/http"
)

func Fetch(url string) ([]byte, error) {
    resp, err := http.Get(url)
    defer resp.Body.Close()
    if err != nil {
        return nil, err
    }
    return io.ReadAll(resp.Body)
}`,
      solution: `package main

import (
    "io"
    "net/http"
)

func Fetch(url string) ([]byte, error) {
    resp, err := http.Get(url)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    return io.ReadAll(resp.Body)
}`,
      hints: [
        'If err is non-nil, resp may be nil.',
        'Calling resp.Body.Close() on nil resp causes a panic.',
        'Always check the error before deferring Close.',
      ],
      concepts: ['nil pointer', 'defer ordering', 'error check first'],
    },
    {
      id: 'go-httpc-14',
      title: 'Fix No Timeout',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the HTTP client that can hang forever due to no timeout.',
      skeleton: `package main

import (
    "io"
    "net/http"
)

func FetchData(url string) ([]byte, error) {
    resp, err := http.Get(url)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    return io.ReadAll(resp.Body)
}`,
      solution: `package main

import (
    "io"
    "net/http"
    "time"
)

func FetchData(url string) ([]byte, error) {
    client := &http.Client{Timeout: 30 * time.Second}
    resp, err := client.Get(url)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    return io.ReadAll(resp.Body)
}`,
      hints: [
        'http.Get uses the default client with no timeout.',
        'Create a custom client with a Timeout field.',
        '30 seconds is a reasonable default for most APIs.',
      ],
      concepts: ['Client.Timeout', 'production safety'],
    },
    {
      id: 'go-httpc-15',
      title: 'Write Retry Logic',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a function that retries a GET request up to 3 times on failure.',
      skeleton: `package main

import (
    "fmt"
    "io"
    "net/http"
    "time"
)

// FetchWithRetry retries the GET request up to maxRetries times
// Wait 1 second between retries
// Returns the body or the last error
func FetchWithRetry(url string, maxRetries int) ([]byte, error) {
}`,
      solution: `package main

import (
    "fmt"
    "io"
    "net/http"
    "time"
)

func FetchWithRetry(url string, maxRetries int) ([]byte, error) {
    client := &http.Client{Timeout: 10 * time.Second}
    var lastErr error
    for i := 0; i <= maxRetries; i++ {
        resp, err := client.Get(url)
        if err != nil {
            lastErr = err
            time.Sleep(time.Second)
            continue
        }
        defer resp.Body.Close()
        if resp.StatusCode >= 500 {
            lastErr = fmt.Errorf("server error: %d", resp.StatusCode)
            time.Sleep(time.Second)
            continue
        }
        return io.ReadAll(resp.Body)
    }
    return nil, fmt.Errorf("after %d retries: %w", maxRetries, lastErr)
}`,
      hints: [
        'Loop up to maxRetries times.',
        'Retry on network errors and 5xx status codes.',
        'Sleep between retries to avoid hammering the server.',
      ],
      concepts: ['retry pattern', 'error wrapping', 'backoff'],
    },
    {
      id: 'go-httpc-16',
      title: 'Write Form POST',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that sends a form-encoded POST request.',
      skeleton: `package main

import (
    "io"
    "net/http"
    "net/url"
)

// SubmitForm sends a form POST with username and password fields
// Returns the response body
func SubmitForm(endpoint, username, password string) (string, error) {
}`,
      solution: `package main

import (
    "io"
    "net/http"
    "net/url"
)

func SubmitForm(endpoint, username, password string) (string, error) {
    values := url.Values{
        "username": {username},
        "password": {password},
    }
    resp, err := http.PostForm(endpoint, values)
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()
    body, err := io.ReadAll(resp.Body)
    return string(body), err
}`,
      hints: [
        'http.PostForm sends application/x-www-form-urlencoded data.',
        'url.Values is a map[string][]string for form fields.',
        'This is the standard way to submit HTML forms.',
      ],
      concepts: ['http.PostForm', 'url.Values', 'form encoding'],
    },
    {
      id: 'go-httpc-17',
      title: 'Write Query Parameters',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Build a URL with query parameters for a GET request.',
      skeleton: `package main

import (
    "io"
    "net/http"
    "net/url"
)

// Search makes a GET request to baseURL with query params: q=term, page=1
func Search(baseURL, term string) ([]byte, error) {
}`,
      solution: `package main

import (
    "io"
    "net/http"
    "net/url"
)

func Search(baseURL, term string) ([]byte, error) {
    u, err := url.Parse(baseURL)
    if err != nil {
        return nil, err
    }
    q := u.Query()
    q.Set("q", term)
    q.Set("page", "1")
    u.RawQuery = q.Encode()

    resp, err := http.Get(u.String())
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    return io.ReadAll(resp.Body)
}`,
      hints: [
        'url.Parse creates a URL struct you can modify.',
        'u.Query() returns the existing query parameters.',
        'q.Encode() properly encodes all parameters.',
      ],
      concepts: ['url.Parse', 'query parameters', 'URL building'],
    },
    {
      id: 'go-httpc-18',
      title: 'Refactor to Custom Client',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor code using http.Get to use a custom client with timeout.',
      skeleton: `package main

import (
    "io"
    "net/http"
)

func GetPage(url string) (string, error) {
    resp, err := http.Get(url)
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()
    body, err := io.ReadAll(resp.Body)
    return string(body), err
}

func GetAPI(url string) (string, error) {
    resp, err := http.Get(url)
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()
    body, err := io.ReadAll(resp.Body)
    return string(body), err
}`,
      solution: `package main

import (
    "io"
    "net/http"
    "time"
)

var client = &http.Client{Timeout: 30 * time.Second}

func fetch(url string) (string, error) {
    resp, err := client.Get(url)
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()
    body, err := io.ReadAll(resp.Body)
    return string(body), err
}

func GetPage(url string) (string, error) {
    return fetch(url)
}

func GetAPI(url string) (string, error) {
    return fetch(url)
}`,
      hints: [
        'Share a single custom client across functions.',
        'Extract the common fetch logic into a helper.',
        'Package-level client is reusable and connection-pooled.',
      ],
      concepts: ['shared client', 'connection pooling', 'DRY'],
    },
    {
      id: 'go-httpc-19',
      title: 'Refactor to NewRequestWithContext',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor a function to accept and use context for cancellation.',
      skeleton: `package main

import (
    "io"
    "net/http"
    "time"
)

func FetchData(url string) ([]byte, error) {
    client := &http.Client{Timeout: 10 * time.Second}
    resp, err := client.Get(url)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    return io.ReadAll(resp.Body)
}`,
      solution: `package main

import (
    "context"
    "io"
    "net/http"
)

func FetchData(ctx context.Context, url string) ([]byte, error) {
    req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
    if err != nil {
        return nil, err
    }
    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    return io.ReadAll(resp.Body)
}`,
      hints: [
        'Accept context.Context as the first parameter.',
        'Use http.NewRequestWithContext instead of client.Get.',
        'The caller controls cancellation and timeouts.',
      ],
      concepts: ['context.Context', 'NewRequestWithContext', 'cancellation'],
    },
    {
      id: 'go-httpc-20',
      title: 'Write HTTP Client Interface',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Define an HTTP client interface for testability.',
      skeleton: `package main

import "net/http"

// Define HTTPClient interface with a Do method matching http.Client.Do
// Then write FetchURL that accepts HTTPClient and makes a GET request

// type HTTPClient interface { ... }
// func FetchURL(client HTTPClient, url string) (int, error) { ... }`,
      solution: `package main

import "net/http"

type HTTPClient interface {
    Do(req *http.Request) (*http.Response, error)
}

func FetchURL(client HTTPClient, url string) (int, error) {
    req, err := http.NewRequest("GET", url, nil)
    if err != nil {
        return 0, err
    }
    resp, err := client.Do(req)
    if err != nil {
        return 0, err
    }
    defer resp.Body.Close()
    return resp.StatusCode, nil
}`,
      hints: [
        'Define an interface with the Do method signature.',
        '*http.Client already implements this interface.',
        'In tests you can provide a mock that implements HTTPClient.',
      ],
      concepts: ['interface', 'dependency injection', 'testability'],
    },
  ],
};
