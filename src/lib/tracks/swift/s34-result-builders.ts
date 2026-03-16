import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-builders',
  title: '34. Result Builders',
  explanation: `## Result Builders in Swift

Result builders transform a sequence of statements into a single combined result. They power SwiftUI's declarative syntax and can be used to build custom DSLs.

### Basic Result Builder

\`\`\`swift
@resultBuilder
struct ArrayBuilder {
    static func buildBlock(_ components: Int...) -> [Int] {
        return components
    }
}

@ArrayBuilder
func makeNumbers() -> [Int] {
    1
    2
    3
}
// Returns [1, 2, 3]
\`\`\`

### Supporting Conditionals

\`\`\`swift
@resultBuilder
struct StringBuilder {
    static func buildBlock(_ components: String...) -> String {
        components.joined(separator: " ")
    }
    static func buildOptional(_ component: String?) -> String {
        component ?? ""
    }
    static func buildEither(first component: String) -> String {
        component
    }
    static func buildEither(second component: String) -> String {
        component
    }
}
\`\`\`

### HTML DSL Example

\`\`\`swift
@resultBuilder
struct HTMLBuilder {
    static func buildBlock(_ components: String...) -> String {
        components.joined(separator: "\\n")
    }
}

func div(@HTMLBuilder content: () -> String) -> String {
    "<div>\\n\\(content())\\n</div>"
}

func p(_ text: String) -> String { "<p>\\(text)</p>" }
\`\`\`
`,
  exercises: [
    {
      id: 'swift-builders-1',
      title: 'Declare a Result Builder',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Declare a result builder attribute on a struct.',
      skeleton: `___
struct StringConcatenator {
    static func buildBlock(_ components: String...) -> String {
        components.joined()
    }
}`,
      solution: `@resultBuilder
struct StringConcatenator {
    static func buildBlock(_ components: String...) -> String {
        components.joined()
    }
}`,
      hints: [
        'Result builders are declared with a special attribute.',
        'Place the attribute before the struct.',
        'The attribute is @resultBuilder.',
      ],
      concepts: ['result-builder', 'attribute'],
    },
    {
      id: 'swift-builders-2',
      title: 'Build Block Method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Implement the required buildBlock method.',
      skeleton: `@resultBuilder
struct ArrayBuilder<T> {
    static func ___(__ components: T...) -> [T] {
        return Array(components)
    }
}`,
      solution: `@resultBuilder
struct ArrayBuilder<T> {
    static func buildBlock(_ components: T...) -> [T] {
        return Array(components)
    }
}`,
      hints: [
        'buildBlock is the core method of a result builder.',
        'It combines all statements into a single result.',
        'The method name is buildBlock.',
      ],
      concepts: ['buildBlock', 'result-builder'],
    },
    {
      id: 'swift-builders-3',
      title: 'Apply Builder to Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Apply a result builder to a function.',
      skeleton: `@resultBuilder
struct ListBuilder {
    static func buildBlock(_ components: String...) -> [String] {
        Array(components)
    }
}

___
func makeList() -> [String] {
    "Apple"
    "Banana"
    "Cherry"
}`,
      solution: `@resultBuilder
struct ListBuilder {
    static func buildBlock(_ components: String...) -> [String] {
        Array(components)
    }
}

@ListBuilder
func makeList() -> [String] {
    "Apple"
    "Banana"
    "Cherry"
}`,
      hints: [
        'Apply the builder attribute to the function.',
        'This transforms the function body using the builder.',
        'The attribute is @ListBuilder.',
      ],
      concepts: ['result-builder', 'function-builder'],
    },
    {
      id: 'swift-builders-4',
      title: 'Builder with Optional Support',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add optional support to a result builder.',
      skeleton: `@resultBuilder
struct HTMLBuilder {
    static func buildBlock(_ components: String...) -> String {
        components.joined(separator: "\\n")
    }

    static func ___(_ component: String?) -> String {
        component ?? ""
    }
}`,
      solution: `@resultBuilder
struct HTMLBuilder {
    static func buildBlock(_ components: String...) -> String {
        components.joined(separator: "\\n")
    }

    static func buildOptional(_ component: String?) -> String {
        component ?? ""
    }
}`,
      hints: [
        'This method handles if statements without else.',
        'The component is nil when the condition is false.',
        'The method is buildOptional.',
      ],
      concepts: ['buildOptional', 'conditional-builder'],
    },
    {
      id: 'swift-builders-5',
      title: 'Builder Either Methods',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add if-else support to a result builder.',
      skeleton: `@resultBuilder
struct ViewBuilder {
    static func buildBlock(_ components: String...) -> String {
        components.joined(separator: "\\n")
    }
    static func ___(first component: String) -> String {
        component
    }
    static func ___(second component: String) -> String {
        component
    }
}`,
      solution: `@resultBuilder
struct ViewBuilder {
    static func buildBlock(_ components: String...) -> String {
        components.joined(separator: "\\n")
    }
    static func buildEither(first component: String) -> String {
        component
    }
    static func buildEither(second component: String) -> String {
        component
    }
}`,
      hints: [
        'if-else requires two methods: one for each branch.',
        'buildEither(first:) for the if branch.',
        'buildEither(second:) for the else branch.',
      ],
      concepts: ['buildEither', 'conditional-builder'],
    },
    {
      id: 'swift-builders-6',
      title: 'Builder Parameter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use a result builder as a function parameter.',
      skeleton: `@resultBuilder
struct TagBuilder {
    static func buildBlock(_ components: String...) -> String {
        components.joined()
    }
}

func div(___ content: () -> String) -> String {
    "<div>\\(content())</div>"
}

let html = div {
    "Hello "
    "World"
}`,
      solution: `@resultBuilder
struct TagBuilder {
    static func buildBlock(_ components: String...) -> String {
        components.joined()
    }
}

func div(@TagBuilder content: () -> String) -> String {
    "<div>\\(content())</div>"
}

let html = div {
    "Hello "
    "World"
}`,
      hints: [
        'Apply the builder attribute to the closure parameter.',
        'This transforms the closure body using the builder.',
        'Place @TagBuilder before the parameter name.',
      ],
      concepts: ['builder-parameter', 'closure-builder'],
    },
    {
      id: 'swift-builders-7',
      title: 'Write an HTML Builder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a result builder for constructing HTML strings.',
      skeleton: `// Write a @resultBuilder struct HTML with:
// - buildBlock that joins strings with newlines
// - buildOptional for if-without-else
// - buildEither(first:) and buildEither(second:) for if-else
// Then write helper functions:
// - h1(_ text: String) -> String
// - p(_ text: String) -> String
// - div(@HTML content: () -> String) -> String
`,
      solution: `@resultBuilder
struct HTML {
    static func buildBlock(_ components: String...) -> String {
        components.joined(separator: "\\n")
    }
    static func buildOptional(_ component: String?) -> String {
        component ?? ""
    }
    static func buildEither(first component: String) -> String {
        component
    }
    static func buildEither(second component: String) -> String {
        component
    }
}

func h1(_ text: String) -> String { "<h1>\\(text)</h1>" }
func p(_ text: String) -> String { "<p>\\(text)</p>" }
func div(@HTML content: () -> String) -> String {
    "<div>\\n\\(content())\\n</div>"
}`,
      hints: [
        'buildBlock joins with newlines for HTML formatting.',
        'Helper functions wrap text in HTML tags.',
        'div takes a builder closure parameter.',
      ],
      concepts: ['result-builder', 'html-dsl', 'builder-pattern'],
    },
    {
      id: 'swift-builders-8',
      title: 'Write a Builder with Loop Support',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a result builder that supports for loops.',
      skeleton: `// Write a @resultBuilder struct ListBuilder with:
// - buildBlock(_ components: [String]...) -> [String]
// - buildExpression(_ expression: String) -> [String] (wraps single item)
// - buildArray(_ components: [[String]]) -> [String] (for loops)
`,
      solution: `@resultBuilder
struct ListBuilder {
    static func buildBlock(_ components: [String]...) -> [String] {
        components.flatMap { $0 }
    }
    static func buildExpression(_ expression: String) -> [String] {
        [expression]
    }
    static func buildArray(_ components: [[String]]) -> [String] {
        components.flatMap { $0 }
    }
}`,
      hints: [
        'buildExpression converts individual values to the block type.',
        'buildArray handles for-in loops.',
        'Use flatMap to flatten nested arrays.',
      ],
      concepts: ['buildExpression', 'buildArray', 'for-loop-support'],
    },
    {
      id: 'swift-builders-9',
      title: 'Write a Configuration Builder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a result builder for constructing configuration dictionaries.',
      skeleton: `// Write a @resultBuilder struct ConfigBuilder with:
// - buildBlock that merges (String, Any) tuples into [String: Any]
// Then write:
// - func config(@ConfigBuilder _ build: () -> [String: Any]) -> [String: Any]
`,
      solution: `@resultBuilder
struct ConfigBuilder {
    static func buildBlock(_ components: (String, Any)...) -> [String: Any] {
        var result: [String: Any] = [:]
        for (key, value) in components {
            result[key] = value
        }
        return result
    }
}

func config(@ConfigBuilder _ build: () -> [String: Any]) -> [String: Any] {
    return build()
}`,
      hints: [
        'Each statement produces a (String, Any) tuple.',
        'buildBlock merges them into a dictionary.',
        'Loop through components to build the dict.',
      ],
      concepts: ['result-builder', 'configuration-dsl'],
    },
    {
      id: 'swift-builders-10',
      title: 'Write a Test Assertion Builder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a result builder for collecting test assertions.',
      skeleton: `// Write a @resultBuilder struct AssertionBuilder with:
// - buildBlock(_ components: Bool...) -> [Bool]
// - buildOptional(_ component: [Bool]?) -> [Bool]
// Then write:
// - func assertAll(@AssertionBuilder _ assertions: () -> [Bool]) -> Bool
//   that returns true if all assertions are true
`,
      solution: `@resultBuilder
struct AssertionBuilder {
    static func buildBlock(_ components: Bool...) -> [Bool] {
        Array(components)
    }
    static func buildOptional(_ component: [Bool]?) -> [Bool] {
        component ?? []
    }
}

func assertAll(@AssertionBuilder _ assertions: () -> [Bool]) -> Bool {
    return assertions().allSatisfy { $0 }
}`,
      hints: [
        'Each statement in the builder is a Bool expression.',
        'buildBlock collects them into an array.',
        'assertAll checks if every assertion is true.',
      ],
      concepts: ['result-builder', 'assertion-dsl'],
    },
    {
      id: 'swift-builders-11',
      title: 'Write a SQL Query Builder',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a result builder for constructing SQL query clauses.',
      skeleton: `// Write a @resultBuilder struct QueryBuilder with:
// - buildBlock(_ components: String...) -> String joined by spaces
// - buildOptional for optional clauses
// - buildEither for conditional clauses
// Write: func query(@QueryBuilder _ build: () -> String) -> String
`,
      solution: `@resultBuilder
struct QueryBuilder {
    static func buildBlock(_ components: String...) -> String {
        components.joined(separator: " ")
    }
    static func buildOptional(_ component: String?) -> String {
        component ?? ""
    }
    static func buildEither(first component: String) -> String {
        component
    }
    static func buildEither(second component: String) -> String {
        component
    }
}

func query(@QueryBuilder _ build: () -> String) -> String {
    return build()
}`,
      hints: [
        'SQL clauses are joined by spaces.',
        'Optional clauses become empty strings when nil.',
        'if-else selects between two clause variants.',
      ],
      concepts: ['result-builder', 'sql-dsl'],
    },
    {
      id: 'swift-builders-12',
      title: 'Write a Builder with buildFinalResult',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a result builder that transforms the final result.',
      skeleton: `// Write a @resultBuilder struct CSVBuilder with:
// - buildBlock(_ components: [String]...) -> [[String]]
// - buildExpression(_ expression: String) -> [String] (single cell row)
// - buildFinalResult(_ component: [[String]]) -> String (CSV format)
`,
      solution: `@resultBuilder
struct CSVBuilder {
    static func buildBlock(_ components: [String]...) -> [[String]] {
        Array(components)
    }
    static func buildExpression(_ expression: String) -> [String] {
        [expression]
    }
    static func buildFinalResult(_ component: [[String]]) -> String {
        component.map { $0.joined(separator: ",") }.joined(separator: "\\n")
    }
}`,
      hints: [
        'buildFinalResult transforms the accumulated result into the final type.',
        'Each row is an array of strings joined by commas.',
        'Rows are joined by newlines for CSV format.',
      ],
      concepts: ['buildFinalResult', 'result-builder', 'csv-format'],
    },
    {
      id: 'swift-builders-13',
      title: 'Fix Missing buildBlock',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the result builder that is missing the required method.',
      skeleton: `@resultBuilder
struct NumberBuilder {
    static func buildOptional(_ component: [Int]?) -> [Int] {
        component ?? []
    }
}

@NumberBuilder
func makeNumbers() -> [Int] {
    1
    2
    3
}`,
      solution: `@resultBuilder
struct NumberBuilder {
    static func buildBlock(_ components: Int...) -> [Int] {
        Array(components)
    }
    static func buildOptional(_ component: [Int]?) -> [Int] {
        component ?? []
    }
}

@NumberBuilder
func makeNumbers() -> [Int] {
    1
    2
    3
}`,
      hints: [
        'Every result builder needs a buildBlock method.',
        'It is the core method that combines statements.',
        'Add static func buildBlock.',
      ],
      concepts: ['buildBlock', 'required-method'],
    },
    {
      id: 'swift-builders-14',
      title: 'Fix Builder Type Mismatch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the result builder where buildOptional returns the wrong type.',
      skeleton: `@resultBuilder
struct TextBuilder {
    static func buildBlock(_ components: String...) -> String {
        components.joined(separator: " ")
    }
    static func buildOptional(_ component: [String]?) -> String {
        component?.joined(separator: " ") ?? ""
    }
}

@TextBuilder
func greeting(name: String?) -> String {
    "Hello"
    if let name = name {
        name
    }
}`,
      solution: `@resultBuilder
struct TextBuilder {
    static func buildBlock(_ components: String...) -> String {
        components.joined(separator: " ")
    }
    static func buildOptional(_ component: String?) -> String {
        component ?? ""
    }
}

@TextBuilder
func greeting(name: String?) -> String {
    "Hello"
    if let name = name {
        name
    }
}`,
      hints: [
        'buildOptional receives the result of buildBlock for the if body.',
        'buildBlock returns String, so buildOptional takes String?.',
        'Change [String]? to String?.',
      ],
      concepts: ['buildOptional', 'type-consistency'],
    },
    {
      id: 'swift-builders-15',
      title: 'Fix Missing buildEither',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the builder that cannot handle if-else statements.',
      skeleton: `@resultBuilder
struct LayoutBuilder {
    static func buildBlock(_ components: String...) -> String {
        components.joined(separator: "\\n")
    }
    static func buildOptional(_ component: String?) -> String {
        component ?? ""
    }
}

@LayoutBuilder
func layout(compact: Bool) -> String {
    "Header"
    if compact {
        "Compact Body"
    } else {
        "Full Body"
    }
    "Footer"
}`,
      solution: `@resultBuilder
struct LayoutBuilder {
    static func buildBlock(_ components: String...) -> String {
        components.joined(separator: "\\n")
    }
    static func buildOptional(_ component: String?) -> String {
        component ?? ""
    }
    static func buildEither(first component: String) -> String {
        component
    }
    static func buildEither(second component: String) -> String {
        component
    }
}

@LayoutBuilder
func layout(compact: Bool) -> String {
    "Header"
    if compact {
        "Compact Body"
    } else {
        "Full Body"
    }
    "Footer"
}`,
      hints: [
        'if-else requires buildEither(first:) and buildEither(second:).',
        'buildOptional only handles if-without-else.',
        'Add both buildEither methods.',
      ],
      concepts: ['buildEither', 'if-else-support'],
    },
    {
      id: 'swift-builders-16',
      title: 'Predict Builder Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the output of a result builder function.',
      skeleton: `@resultBuilder
struct SumBuilder {
    static func buildBlock(_ components: Int...) -> Int {
        components.reduce(0, +)
    }
}

@SumBuilder
func total() -> Int {
    10
    20
    30
}

print(total())`,
      solution: `60`,
      hints: [
        'buildBlock receives all three values as a variadic.',
        'reduce(0, +) sums them: 10 + 20 + 30.',
        'The result is 60.',
      ],
      concepts: ['buildBlock', 'result-builder'],
    },
    {
      id: 'swift-builders-17',
      title: 'Predict Builder with Conditional',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the output when a builder uses conditionals.',
      skeleton: `@resultBuilder
struct Words {
    static func buildBlock(_ components: String...) -> String {
        components.joined(separator: " ")
    }
    static func buildEither(first component: String) -> String { component }
    static func buildEither(second component: String) -> String { component }
}

@Words
func greet(formal: Bool) -> String {
    if formal {
        "Good day"
    } else {
        "Hey"
    }
    "friend"
}

print(greet(formal: true))`,
      solution: `Good day friend`,
      hints: [
        'formal is true, so buildEither(first:) is called with "Good day".',
        'buildBlock receives "Good day" and "friend".',
        'They are joined with a space.',
      ],
      concepts: ['buildEither', 'conditional-builder'],
    },
    {
      id: 'swift-builders-18',
      title: 'Predict Builder with Optional',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the output when a builder has an optional block.',
      skeleton: `@resultBuilder
struct Lines {
    static func buildBlock(_ components: String...) -> String {
        components.filter { !$0.isEmpty }.joined(separator: "\\n")
    }
    static func buildOptional(_ component: String?) -> String {
        component ?? ""
    }
}

@Lines
func message(urgent: Bool) -> String {
    "Hello"
    if urgent {
        "URGENT"
    }
    "Bye"
}

print(message(urgent: false))`,
      solution: `Hello
Bye`,
      hints: [
        'urgent is false, so buildOptional returns "".',
        'buildBlock gets "Hello", "", "Bye".',
        'Empty strings are filtered out, leaving "Hello" and "Bye".',
      ],
      concepts: ['buildOptional', 'filtering'],
    },
    {
      id: 'swift-builders-19',
      title: 'Refactor String Concatenation to Builder',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor manual string building to use a result builder.',
      skeleton: `func buildEmail(to: String, subject: String, urgent: Bool) -> String {
    var parts: [String] = []
    parts.append("To: \\(to)")
    parts.append("Subject: \\(subject)")
    if urgent {
        parts.append("Priority: HIGH")
    }
    parts.append("")
    parts.append("Dear \\(to),")
    return parts.joined(separator: "\\n")
}`,
      solution: `@resultBuilder
struct EmailBuilder {
    static func buildBlock(_ components: String...) -> String {
        components.joined(separator: "\\n")
    }
    static func buildOptional(_ component: String?) -> String {
        component ?? ""
    }
}

func buildEmail(to: String, subject: String, urgent: Bool) -> String {
    @EmailBuilder func build() -> String {
        "To: \\(to)"
        "Subject: \\(subject)"
        if urgent {
            "Priority: HIGH"
        }
        ""
        "Dear \\(to),"
    }
    return build()
}`,
      hints: [
        'Create a result builder for joining strings.',
        'Add buildOptional for the urgent flag.',
        'The builder makes the code more declarative.',
      ],
      concepts: ['result-builder', 'refactoring', 'declarative-style'],
    },
    {
      id: 'swift-builders-20',
      title: 'Refactor Array Building to Builder',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor imperative array construction to use a result builder.',
      skeleton: `func buildMenu(isAdmin: Bool, isLoggedIn: Bool) -> [String] {
    var items: [String] = []
    items.append("Home")
    items.append("About")
    if isLoggedIn {
        items.append("Profile")
        items.append("Settings")
    }
    if isAdmin {
        items.append("Admin Panel")
    }
    items.append("Help")
    return items
}`,
      solution: `@resultBuilder
struct MenuBuilder {
    static func buildBlock(_ components: [String]...) -> [String] {
        components.flatMap { $0 }
    }
    static func buildExpression(_ expression: String) -> [String] {
        [expression]
    }
    static func buildOptional(_ component: [String]?) -> [String] {
        component ?? []
    }
}

@MenuBuilder
func buildMenu(isAdmin: Bool, isLoggedIn: Bool) -> [String] {
    "Home"
    "About"
    if isLoggedIn {
        "Profile"
        "Settings"
    }
    if isAdmin {
        "Admin Panel"
    }
    "Help"
}`,
      hints: [
        'Use buildExpression to wrap single strings into arrays.',
        'buildBlock uses flatMap to merge arrays.',
        'buildOptional returns empty array for false conditions.',
      ],
      concepts: ['result-builder', 'buildExpression', 'refactoring'],
    },
  ],
};
