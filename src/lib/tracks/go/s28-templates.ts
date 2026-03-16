import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-tmpl',
  title: '28. Templates',
  explanation: `## Templates in Go

Go provides two template packages: \`text/template\` for general text and \`html/template\` for safe HTML output with automatic escaping.

\`\`\`go
// Basic template
tmpl := template.Must(template.New("hello").Parse("Hello, {{.Name}}!"))
tmpl.Execute(os.Stdout, map[string]string{"Name": "World"})

// Template actions
{{.Field}}           // access field
{{range .Items}}...{{end}}   // loop
{{if .Cond}}...{{else}}...{{end}}  // conditional
{{with .Obj}}...{{end}}      // set dot
{{template "name" .}}        // include template
{{block "name" .}}...{{end}} // define with default

// Functions
{{len .Items}}
{{printf "%d" .Count}}
{{.Name | upper}}     // pipeline

// Custom functions
funcMap := template.FuncMap{
    "upper": strings.ToUpper,
}
tmpl := template.New("").Funcs(funcMap).Parse(...)

// html/template auto-escapes
// <script> becomes &lt;script&gt;
\`\`\``,
  exercises: [
    {
      id: 'go-tmpl-1',
      title: 'Parse and Execute',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Parse a template string and execute it with data.',
      skeleton: `package main

import (
    "os"
    "text/template"
)

func main() {
    tmpl := template.Must(template.New("greet").__BLANK__("Hello, {{.}}!"))
    tmpl.Execute(os.Stdout, "World")
}`,
      solution: `package main

import (
    "os"
    "text/template"
)

func main() {
    tmpl := template.Must(template.New("greet").Parse("Hello, {{.}}!"))
    tmpl.Execute(os.Stdout, "World")
}`,
      hints: [
        'Parse compiles the template string.',
        'template.Must panics on parse errors.',
        '{{.}} refers to the data passed to Execute.',
      ],
      concepts: ['template.Parse', 'template.Must', 'Execute'],
    },
    {
      id: 'go-tmpl-2',
      title: 'Access Struct Fields',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Access struct fields in a template using dot notation.',
      skeleton: `package main

import (
    "os"
    "text/template"
)

type User struct {
    Name  string
    Email string
}

func main() {
    tmpl := template.Must(template.New("user").Parse(
        "Name: {{.__BLANK__}}, Email: {{.__BLANK__}}",
    ))
    tmpl.Execute(os.Stdout, User{Name: "Alice", Email: "alice@example.com"})
}`,
      solution: `package main

import (
    "os"
    "text/template"
)

type User struct {
    Name  string
    Email string
}

func main() {
    tmpl := template.Must(template.New("user").Parse(
        "Name: {{.Name}}, Email: {{.Email}}",
    ))
    tmpl.Execute(os.Stdout, User{Name: "Alice", Email: "alice@example.com"})
}`,
      hints: [
        '{{.FieldName}} accesses exported struct fields.',
        'The dot represents the current data context.',
        'Field names must match the struct field names exactly.',
      ],
      concepts: ['dot notation', 'struct fields'],
    },
    {
      id: 'go-tmpl-3',
      title: 'Range Over Slice',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Iterate over a slice in a template.',
      skeleton: `package main

import (
    "os"
    "text/template"
)

func main() {
    tmpl := template.Must(template.New("list").Parse(
        \`{{__BLANK__ .}}Item: {{.}}
{{end}}\`))
    tmpl.Execute(os.Stdout, []string{"apple", "banana", "cherry"})
}`,
      solution: `package main

import (
    "os"
    "text/template"
)

func main() {
    tmpl := template.Must(template.New("list").Parse(
        \`{{range .}}Item: {{.}}
{{end}}\`))
    tmpl.Execute(os.Stdout, []string{"apple", "banana", "cherry"})
}`,
      hints: [
        '{{range .}} iterates over the data.',
        'Inside range, {{.}} is the current element.',
        '{{end}} closes the range block.',
      ],
      concepts: ['range', 'iteration', 'template actions'],
    },
    {
      id: 'go-tmpl-4',
      title: 'If/Else Conditional',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use conditional logic in a template.',
      skeleton: `package main

import (
    "os"
    "text/template"
)

type Page struct {
    Title   string
    LoggedIn bool
}

func main() {
    tmpl := template.Must(template.New("page").Parse(
        \`{{__BLANK__ .LoggedIn}}Welcome back!{{__BLANK__}}Please log in.{{end}}\`))
    tmpl.Execute(os.Stdout, Page{Title: "Home", LoggedIn: true})
}`,
      solution: `package main

import (
    "os"
    "text/template"
)

type Page struct {
    Title   string
    LoggedIn bool
}

func main() {
    tmpl := template.Must(template.New("page").Parse(
        \`{{if .LoggedIn}}Welcome back!{{else}}Please log in.{{end}}\`))
    tmpl.Execute(os.Stdout, Page{Title: "Home", LoggedIn: true})
}`,
      hints: [
        '{{if .Field}} checks if the value is truthy.',
        '{{else}} provides the alternative branch.',
        '{{end}} closes the if block.',
      ],
      concepts: ['if/else', 'conditional templates'],
    },
    {
      id: 'go-tmpl-5',
      title: 'Template Pipeline',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use a pipeline to format output in a template.',
      skeleton: `package main

import (
    "os"
    "text/template"
)

func main() {
    tmpl := template.Must(template.New("fmt").Parse(
        \`Count: {{.Count __BLANK__ printf "%04d"}}\`))
    tmpl.Execute(os.Stdout, map[string]int{"Count": 42})
}`,
      solution: `package main

import (
    "os"
    "text/template"
)

func main() {
    tmpl := template.Must(template.New("fmt").Parse(
        \`Count: {{.Count | printf "%04d"}}\`))
    tmpl.Execute(os.Stdout, map[string]int{"Count": 42})
}`,
      hints: [
        'The | operator pipes a value into a function.',
        'printf is a built-in template function.',
        'The piped value becomes the last argument to the function.',
      ],
      concepts: ['pipeline', 'printf', 'template functions'],
    },
    {
      id: 'go-tmpl-6',
      title: 'Custom FuncMap',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Add a custom function to a template.',
      skeleton: `package main

import (
    "os"
    "strings"
    "text/template"
)

func main() {
    funcMap := template.__BLANK__{
        "upper": strings.ToUpper,
    }
    tmpl := template.New("custom").Funcs(funcMap)
    tmpl = template.Must(tmpl.Parse(\`{{.Name | upper}}\`))
    tmpl.Execute(os.Stdout, map[string]string{"Name": "alice"})
}`,
      solution: `package main

import (
    "os"
    "strings"
    "text/template"
)

func main() {
    funcMap := template.FuncMap{
        "upper": strings.ToUpper,
    }
    tmpl := template.New("custom").Funcs(funcMap)
    tmpl = template.Must(tmpl.Parse(\`{{.Name | upper}}\`))
    tmpl.Execute(os.Stdout, map[string]string{"Name": "alice"})
}`,
      hints: [
        'template.FuncMap is map[string]interface{} for custom functions.',
        'Register functions with .Funcs() before parsing.',
        'Functions must return one or two values (value, error).',
      ],
      concepts: ['template.FuncMap', 'custom functions'],
    },
    {
      id: 'go-tmpl-7',
      title: 'HTML Template Auto-Escape',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use html/template for safe HTML output with auto-escaping.',
      skeleton: `package main

import (
    "bytes"
    "html/template"
)

// RenderHTML renders a greeting with the given name, safely escaped
// Template: <h1>Hello, {{.Name}}!</h1>
func RenderHTML(name string) (string, error) {
}`,
      solution: `package main

import (
    "bytes"
    "html/template"
)

func RenderHTML(name string) (string, error) {
    tmpl := template.Must(template.New("page").Parse("<h1>Hello, {{.Name}}!</h1>"))
    var buf bytes.Buffer
    err := tmpl.Execute(&buf, map[string]string{"Name": name})
    return buf.String(), err
}`,
      hints: [
        'html/template auto-escapes HTML special characters.',
        '<script> in name becomes &lt;script&gt; in output.',
        'Use bytes.Buffer to capture output as a string.',
      ],
      concepts: ['html/template', 'auto-escaping', 'XSS prevention'],
    },
    {
      id: 'go-tmpl-8',
      title: 'Named Templates',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Define and include named sub-templates.',
      skeleton: `package main

import (
    "bytes"
    "text/template"
)

// RenderPage renders a page with header and content sub-templates
// Define "header" template that outputs "=== {{.Title}} ==="
// Define "page" template that includes header and shows {{.Body}}
func RenderPage(title, body string) (string, error) {
}`,
      solution: `package main

import (
    "bytes"
    "text/template"
)

func RenderPage(title, body string) (string, error) {
    const tmplStr = \`{{define "header"}}=== {{.Title}} ==={{end}}{{template "header" .}}
{{.Body}}\`
    tmpl := template.Must(template.New("page").Parse(tmplStr))
    var buf bytes.Buffer
    data := map[string]string{"Title": title, "Body": body}
    err := tmpl.Execute(&buf, data)
    return buf.String(), err
}`,
      hints: [
        '{{define "name"}} creates a named sub-template.',
        '{{template "name" .}} includes it, passing the current data.',
        'Sub-templates share the same data context.',
      ],
      concepts: ['define', 'template inclusion', 'named templates'],
    },
    {
      id: 'go-tmpl-9',
      title: 'Template from File',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Parse templates from files using template.ParseFiles.',
      skeleton: `package main

import (
    "bytes"
    "html/template"
)

// RenderFromFile parses the given template file and executes it
func RenderFromFile(filename string, data interface{}) (string, error) {
}`,
      solution: `package main

import (
    "bytes"
    "html/template"
)

func RenderFromFile(filename string, data interface{}) (string, error) {
    tmpl, err := template.ParseFiles(filename)
    if err != nil {
        return "", err
    }
    var buf bytes.Buffer
    err = tmpl.Execute(&buf, data)
    return buf.String(), err
}`,
      hints: [
        'template.ParseFiles reads and parses template files.',
        'The template name is the base filename.',
        'Can parse multiple files at once for template inheritance.',
      ],
      concepts: ['ParseFiles', 'file templates'],
    },
    {
      id: 'go-tmpl-10',
      title: 'Range with Index',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use range to iterate with both index and value in a template.',
      skeleton: `package main

import (
    "bytes"
    "text/template"
)

// RenderList renders items as "1. apple\\n2. banana\\n" etc.
// Use {{range $i, $v := .}} to get index and value
func RenderList(items []string) (string, error) {
}`,
      solution: `package main

import (
    "bytes"
    "text/template"
)

func RenderList(items []string) (string, error) {
    const tmplStr = \`{{range $i, $v := .}}{{add $i 1}}. {{$v}}
{{end}}\`
    funcMap := template.FuncMap{
        "add": func(a, b int) int { return a + b },
    }
    tmpl := template.Must(template.New("list").Funcs(funcMap).Parse(tmplStr))
    var buf bytes.Buffer
    err := tmpl.Execute(&buf, items)
    return buf.String(), err
}`,
      hints: [
        '{{range $i, $v := .}} gives index and value.',
        'Template range indices are 0-based.',
        'Use a custom function to add 1 for 1-based numbering.',
      ],
      concepts: ['range with index', '$variable', 'FuncMap'],
    },
    {
      id: 'go-tmpl-11',
      title: 'Predict Template Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the output of a simple template execution.',
      skeleton: `package main

import (
    "os"
    "text/template"
)

func main() {
    tmpl := template.Must(template.New("t").Parse("{{.X}} + {{.Y}} = {{.Z}}"))
    tmpl.Execute(os.Stdout, map[string]int{"X": 3, "Y": 4, "Z": 7})
}`,
      solution: `3 + 4 = 7`,
      hints: [
        '{{.X}} accesses the "X" key from the map.',
        'Map values are substituted directly.',
        'The template outputs the values in place.',
      ],
      concepts: ['map access', 'template output'],
    },
    {
      id: 'go-tmpl-12',
      title: 'Predict If Falsy',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict what values are considered falsy in template conditionals.',
      skeleton: `package main

import (
    "os"
    "text/template"
)

func main() {
    tmpl := template.Must(template.New("t").Parse(
        \`{{if .A}}A{{end}}{{if .B}}B{{end}}{{if .C}}C{{end}}{{if .D}}D{{end}}\`))
    tmpl.Execute(os.Stdout, map[string]interface{}{
        "A": "",
        "B": 0,
        "C": nil,
        "D": "hello",
    })
}`,
      solution: `D`,
      hints: [
        'Empty string, 0, nil, and false are all falsy in templates.',
        'Only "D" has a truthy value ("hello").',
        'Template if checks are similar to Go truthiness.',
      ],
      concepts: ['falsy values', 'template conditionals'],
    },
    {
      id: 'go-tmpl-13',
      title: 'Predict HTML Escaping',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict how html/template escapes special characters.',
      skeleton: `package main

import (
    "html/template"
    "os"
)

func main() {
    tmpl := template.Must(template.New("t").Parse("{{.}}"))
    tmpl.Execute(os.Stdout, "<b>bold</b>")
}`,
      solution: `&lt;b&gt;bold&lt;/b&gt;`,
      hints: [
        'html/template escapes < and > to prevent XSS.',
        '< becomes &lt; and > becomes &gt;',
        'This is automatic and prevents script injection.',
      ],
      concepts: ['HTML escaping', 'XSS prevention'],
    },
    {
      id: 'go-tmpl-14',
      title: 'Fix Missing Field',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the template that references a non-existent field.',
      skeleton: `package main

import (
    "os"
    "text/template"
)

type Person struct {
    FirstName string
    LastName  string
}

func main() {
    tmpl := template.Must(template.New("t").Parse("{{.Name}}"))
    tmpl.Execute(os.Stdout, Person{FirstName: "John", LastName: "Doe"})
}`,
      solution: `package main

import (
    "os"
    "text/template"
)

type Person struct {
    FirstName string
    LastName  string
}

func main() {
    tmpl := template.Must(template.New("t").Parse("{{.FirstName}} {{.LastName}}"))
    tmpl.Execute(os.Stdout, Person{FirstName: "John", LastName: "Doe"})
}`,
      hints: [
        'The struct has FirstName and LastName, not Name.',
        'Template field names must match struct field names exactly.',
        'Accessing .Name on this struct causes an error.',
      ],
      concepts: ['field names', 'template errors'],
    },
    {
      id: 'go-tmpl-15',
      title: 'Fix FuncMap After Parse',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the template where FuncMap is registered after parsing.',
      skeleton: `package main

import (
    "os"
    "strings"
    "text/template"
)

func main() {
    tmpl := template.Must(template.New("t").Parse("{{.Name | upper}}"))
    funcMap := template.FuncMap{"upper": strings.ToUpper}
    tmpl.Funcs(funcMap)
    tmpl.Execute(os.Stdout, map[string]string{"Name": "alice"})
}`,
      solution: `package main

import (
    "os"
    "strings"
    "text/template"
)

func main() {
    funcMap := template.FuncMap{"upper": strings.ToUpper}
    tmpl := template.Must(template.New("t").Funcs(funcMap).Parse("{{.Name | upper}}"))
    tmpl.Execute(os.Stdout, map[string]string{"Name": "alice"})
}`,
      hints: [
        'FuncMap must be registered before Parse.',
        'The parser needs to know about custom functions during parsing.',
        'Call .Funcs() in the template chain before .Parse().',
      ],
      concepts: ['FuncMap ordering', 'Parse dependencies'],
    },
    {
      id: 'go-tmpl-16',
      title: 'Fix text/template for HTML',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix code using text/template for HTML output that is vulnerable to XSS.',
      skeleton: `package main

import (
    "net/http"
    "text/template"
)

func handler(w http.ResponseWriter, r *http.Request) {
    name := r.URL.Query().Get("name")
    tmpl := template.Must(template.New("page").Parse(
        "<html><body>Hello, {{.}}!</body></html>"))
    tmpl.Execute(w, name)
}`,
      solution: `package main

import (
    "html/template"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    name := r.URL.Query().Get("name")
    tmpl := template.Must(template.New("page").Parse(
        "<html><body>Hello, {{.}}!</body></html>"))
    tmpl.Execute(w, name)
}`,
      hints: [
        'text/template does not escape HTML.',
        'User input like <script>alert("xss")</script> executes as-is.',
        'Use html/template for any HTML output.',
      ],
      concepts: ['html/template', 'XSS', 'security'],
    },
    {
      id: 'go-tmpl-17',
      title: 'Write Template with With Block',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use the {{with}} action to change the dot context.',
      skeleton: `package main

import (
    "bytes"
    "text/template"
)

type Order struct {
    ID       int
    Customer struct {
        Name  string
        Email string
    }
}

// RenderOrder uses {{with .Customer}} to simplify access
// Output: "Order #1 for Alice (alice@example.com)"
func RenderOrder(o Order) (string, error) {
}`,
      solution: `package main

import (
    "bytes"
    "text/template"
)

type Order struct {
    ID       int
    Customer struct {
        Name  string
        Email string
    }
}

func RenderOrder(o Order) (string, error) {
    const tmplStr = \`Order #{{.ID}} for {{with .Customer}}{{.Name}} ({{.Email}}){{end}}\`
    tmpl := template.Must(template.New("order").Parse(tmplStr))
    var buf bytes.Buffer
    err := tmpl.Execute(&buf, o)
    return buf.String(), err
}`,
      hints: [
        '{{with .Customer}} sets dot to the Customer struct.',
        'Inside the with block, {{.Name}} means Customer.Name.',
        '{{end}} restores the previous dot context.',
      ],
      concepts: ['with action', 'dot rebinding'],
    },
    {
      id: 'go-tmpl-18',
      title: 'Write Template Glob',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Parse multiple template files using a glob pattern.',
      skeleton: `package main

import (
    "bytes"
    "html/template"
)

// RenderWithLayout parses all .html files in tmplDir,
// then executes the "content" template with data
func RenderWithLayout(tmplDir string, data interface{}) (string, error) {
}`,
      solution: `package main

import (
    "bytes"
    "html/template"
    "path/filepath"
)

func RenderWithLayout(tmplDir string, data interface{}) (string, error) {
    pattern := filepath.Join(tmplDir, "*.html")
    tmpl, err := template.ParseGlob(pattern)
    if err != nil {
        return "", err
    }
    var buf bytes.Buffer
    err = tmpl.ExecuteTemplate(&buf, "content", data)
    return buf.String(), err
}`,
      hints: [
        'template.ParseGlob parses all files matching a pattern.',
        'ExecuteTemplate runs a specific named template.',
        'Files can define named templates that reference each other.',
      ],
      concepts: ['ParseGlob', 'ExecuteTemplate', 'template sets'],
    },
    {
      id: 'go-tmpl-19',
      title: 'Refactor String Concat to Template',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Replace string concatenation with a template for cleaner output.',
      skeleton: `package main

import "fmt"

type Invoice struct {
    Number int
    Amount float64
    Paid   bool
}

func FormatInvoice(inv Invoice) string {
    result := fmt.Sprintf("Invoice #%d\n", inv.Number)
    result += fmt.Sprintf("Amount: $%.2f\n", inv.Amount)
    if inv.Paid {
        result += "Status: PAID\n"
    } else {
        result += "Status: UNPAID\n"
    }
    return result
}`,
      solution: `package main

import (
    "bytes"
    "text/template"
)

type Invoice struct {
    Number int
    Amount float64
    Paid   bool
}

var invoiceTmpl = template.Must(template.New("invoice").Parse(
    \`Invoice #{{.Number}}
Amount: \${{printf "%.2f" .Amount}}
Status: {{if .Paid}}PAID{{else}}UNPAID{{end}}
\`))

func FormatInvoice(inv Invoice) string {
    var buf bytes.Buffer
    invoiceTmpl.Execute(&buf, inv)
    return buf.String()
}`,
      hints: [
        'Templates separate presentation from logic.',
        'The template is easier to read and modify.',
        'Parse the template once and reuse it.',
      ],
      concepts: ['template vs concat', 'separation of concerns'],
    },
    {
      id: 'go-tmpl-20',
      title: 'Refactor to Template Inheritance',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor duplicated HTML structure into a base template with blocks.',
      skeleton: `package main

import (
    "bytes"
    "html/template"
)

func RenderHome() string {
    tmpl := template.Must(template.New("").Parse(
        "<html><head><title>Home</title></head><body><h1>Welcome</h1></body></html>"))
    var buf bytes.Buffer
    tmpl.Execute(&buf, nil)
    return buf.String()
}

func RenderAbout() string {
    tmpl := template.Must(template.New("").Parse(
        "<html><head><title>About</title></head><body><h1>About Us</h1></body></html>"))
    var buf bytes.Buffer
    tmpl.Execute(&buf, nil)
    return buf.String()
}`,
      solution: `package main

import (
    "bytes"
    "html/template"
)

const baseTmpl = \`{{define "base"}}<html><head><title>{{block "title" .}}Default{{end}}</title></head><body>{{block "content" .}}{{end}}</body></html>{{end}}\`

func render(overlay string, data interface{}) string {
    tmpl := template.Must(template.New("").Parse(baseTmpl))
    template.Must(tmpl.Parse(overlay))
    var buf bytes.Buffer
    tmpl.ExecuteTemplate(&buf, "base", data)
    return buf.String()
}

func RenderHome() string {
    return render(\`{{define "title"}}Home{{end}}{{define "content"}}<h1>Welcome</h1>{{end}}\`, nil)
}

func RenderAbout() string {
    return render(\`{{define "title"}}About{{end}}{{define "content"}}<h1>About Us</h1>{{end}}\`, nil)
}`,
      hints: [
        'Define a base template with {{block}} for overridable sections.',
        'Each page overrides specific blocks.',
        'This eliminates duplicated HTML structure.',
      ],
      concepts: ['template inheritance', 'block', 'define'],
    },
  ],
};
