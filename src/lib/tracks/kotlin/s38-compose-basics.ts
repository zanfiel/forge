import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'kt-compose',
  title: '38. Compose Basics',
  explanation: `## Compose Basics in Kotlin

Jetpack Compose is Kotlin's modern declarative UI framework. It uses @Composable functions, state management, and a component-based architecture.

### @Composable Functions

\`\`\`kotlin
@Composable
fun Greeting(name: String) {
    Text("Hello, \$name!")
}
\`\`\`

### remember and mutableStateOf

\`\`\`kotlin
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    Button(onClick = { count++ }) {
        Text("Count: \$count")
    }
}
\`\`\`

### Layout: Column, Row, Box

\`\`\`kotlin
@Composable
fun Profile() {
    Column(modifier = Modifier.padding(16.dp)) {
        Row {
            Icon(Icons.Default.Person, contentDescription = null)
            Text("Alice")
        }
        Text("Developer")
    }
}
\`\`\`

### Modifiers

\`\`\`kotlin
Text(
    "Styled",
    modifier = Modifier
        .padding(8.dp)
        .fillMaxWidth()
        .background(Color.LightGray)
)
\`\`\``,
  exercises: [
    {
      id: 'kt-compose-1',
      title: 'Basic Composable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Write a basic @Composable function.',
      skeleton: `import androidx.compose.runtime.Composable
import androidx.compose.material3.Text

___
fun Greeting(name: String) {
    Text("Hello, \${name}!")
}`,
      solution: `import androidx.compose.runtime.Composable
import androidx.compose.material3.Text

@Composable
fun Greeting(name: String) {
    Text("Hello, \${name}!")
}`,
      hints: [
        '@Composable marks a function as a UI component.',
        'Composable functions can only be called from other composables.',
        'Text() is a built-in composable for displaying text.',
      ],
      concepts: ['Composable', 'Text'],
    },
    {
      id: 'kt-compose-2',
      title: 'State with remember',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Use remember and mutableStateOf for UI state.',
      skeleton: `import androidx.compose.runtime.*
import androidx.compose.material3.*

@Composable
fun Counter() {
    var count by ___ { ___(0) }
    Button(onClick = { count++ }) {
        Text("Count: \${count}")
    }
}`,
      solution: `import androidx.compose.runtime.*
import androidx.compose.material3.*

@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    Button(onClick = { count++ }) {
        Text("Count: \${count}")
    }
}`,
      hints: [
        'remember preserves state across recompositions.',
        'mutableStateOf creates observable state.',
        'by delegation provides getter/setter syntax.',
      ],
      concepts: ['remember', 'mutableStateOf', 'state'],
    },
    {
      id: 'kt-compose-3',
      title: 'Column Layout',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Use Column to stack elements vertically.',
      skeleton: `import androidx.compose.runtime.Composable
import androidx.compose.foundation.layout.___
import androidx.compose.material3.Text

@Composable
fun UserInfo() {
    ___ {
        Text("Alice")
        Text("Developer")
        Text("alice@example.com")
    }
}`,
      solution: `import androidx.compose.runtime.Composable
import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Text

@Composable
fun UserInfo() {
    Column {
        Text("Alice")
        Text("Developer")
        Text("alice@example.com")
    }
}`,
      hints: [
        'Column arranges children vertically.',
        'Each child is placed below the previous one.',
        'Column is in the foundation.layout package.',
      ],
      concepts: ['Column', 'layout'],
    },
    {
      id: 'kt-compose-4',
      title: 'Row Layout',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Use Row to place elements horizontally.',
      skeleton: `import androidx.compose.runtime.Composable
import androidx.compose.foundation.layout.___
import androidx.compose.material3.Text

@Composable
fun Tag(label: String) {
    ___ {
        Text("[")
        Text(label)
        Text("]")
    }
}`,
      solution: `import androidx.compose.runtime.Composable
import androidx.compose.foundation.layout.Row
import androidx.compose.material3.Text

@Composable
fun Tag(label: String) {
    Row {
        Text("[")
        Text(label)
        Text("]")
    }
}`,
      hints: [
        'Row arranges children horizontally.',
        'Children are placed left to right.',
        'Row is the horizontal counterpart to Column.',
      ],
      concepts: ['Row', 'layout'],
    },
    {
      id: 'kt-compose-5',
      title: 'Modifier Padding',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Apply padding using Modifier.',
      skeleton: `import androidx.compose.runtime.Composable
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun PaddedText() {
    Text(
        "Hello",
        modifier = Modifier.___(16.dp)
    )
}`,
      solution: `import androidx.compose.runtime.Composable
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun PaddedText() {
    Text(
        "Hello",
        modifier = Modifier.padding(16.dp)
    )
}`,
      hints: [
        'Modifier.padding adds space around the element.',
        'dp is the density-independent pixel unit.',
        'Modifiers are chained with dot notation.',
      ],
      concepts: ['Modifier', 'padding', 'dp'],
    },
    {
      id: 'kt-compose-6',
      title: 'Box Layout',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Use Box to overlay elements.',
      skeleton: `import androidx.compose.runtime.Composable
import androidx.compose.foundation.layout.___
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Text
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier

@Composable
fun CenteredContent() {
    ___(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        Text("Centered!")
    }
}`,
      solution: `import androidx.compose.runtime.Composable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Text
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier

@Composable
fun CenteredContent() {
    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        Text("Centered!")
    }
}`,
      hints: [
        'Box stacks children on top of each other.',
        'contentAlignment aligns all children within the box.',
        'fillMaxSize makes the box take all available space.',
      ],
      concepts: ['Box', 'Alignment', 'fillMaxSize'],
    },
    {
      id: 'kt-compose-7',
      title: 'Write a Toggle Component',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a composable that toggles between on and off states.',
      skeleton: `import androidx.compose.runtime.*
import androidx.compose.material3.*
import androidx.compose.foundation.layout.*

// Write a @Composable function called ToggleSwitch that:
// 1. Has internal state: var isOn by remember { mutableStateOf(false) }
// 2. Shows a Row with Text showing "ON" or "OFF" and a Button
// 3. Button text is "Toggle"
// 4. Clicking the button flips isOn`,
      solution: `import androidx.compose.runtime.*
import androidx.compose.material3.*
import androidx.compose.foundation.layout.*

@Composable
fun ToggleSwitch() {
    var isOn by remember { mutableStateOf(false) }
    Row {
        Text(if (isOn) "ON" else "OFF")
        Button(onClick = { isOn = !isOn }) {
            Text("Toggle")
        }
    }
}`,
      hints: [
        'Use by remember { mutableStateOf() } for local state.',
        'Use if/else expression for conditional text.',
        'onClick lambda flips the boolean.',
      ],
      concepts: ['state', 'remember', 'Button', 'conditional-UI'],
    },
    {
      id: 'kt-compose-8',
      title: 'Write a List Component',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a composable that displays a scrollable list.',
      skeleton: `import androidx.compose.runtime.*
import androidx.compose.material3.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.*

// Write a @Composable function called ItemList that:
// 1. Takes items: List<String> parameter
// 2. Uses LazyColumn to display items
// 3. Each item shows as Text with padding of 8.dp
// 4. Uses items() function inside LazyColumn`,
      solution: `import androidx.compose.runtime.*
import androidx.compose.material3.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun ItemList(items: List<String>) {
    LazyColumn {
        items(items) { item ->
            Text(
                text = item,
                modifier = Modifier.padding(8.dp)
            )
        }
    }
}`,
      hints: [
        'LazyColumn only renders visible items.',
        'Use items() to iterate over the list.',
        'Each item lambda receives the current element.',
      ],
      concepts: ['LazyColumn', 'items', 'scrollable-list'],
    },
    {
      id: 'kt-compose-9',
      title: 'Write a Text Input Component',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a composable with a text field and display.',
      skeleton: `import androidx.compose.runtime.*
import androidx.compose.material3.*
import androidx.compose.foundation.layout.*

// Write a @Composable function called NameInput that:
// 1. Has state: var name by remember { mutableStateOf("") }
// 2. Shows a Column with:
//    - TextField with value = name, onValueChange = { name = it }, label = { Text("Name") }
//    - Text showing "Hello, <name>!" (only if name is not blank)`,
      solution: `import androidx.compose.runtime.*
import androidx.compose.material3.*
import androidx.compose.foundation.layout.*

@Composable
fun NameInput() {
    var name by remember { mutableStateOf("") }
    Column {
        TextField(
            value = name,
            onValueChange = { name = it },
            label = { Text("Name") }
        )
        if (name.isNotBlank()) {
            Text("Hello, \${name}!")
        }
    }
}`,
      hints: [
        'TextField requires value and onValueChange for two-way binding.',
        'label is a composable lambda that shows the hint.',
        'Conditional rendering uses regular Kotlin if statements.',
      ],
      concepts: ['TextField', 'two-way-binding', 'conditional-rendering'],
    },
    {
      id: 'kt-compose-10',
      title: 'Write a Card Component',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a reusable card composable with slots.',
      skeleton: `import androidx.compose.runtime.*
import androidx.compose.material3.*
import androidx.compose.foundation.layout.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

// Write a @Composable function called InfoCard that:
// 1. Takes title: String and content: @Composable () -> Unit parameters
// 2. Uses Card composable with modifier padding of 8.dp
// 3. Inside Card, a Column with padding 16.dp
// 4. Shows Text for title (bold/header style) then content()`,
      solution: `import androidx.compose.runtime.*
import androidx.compose.material3.*
import androidx.compose.foundation.layout.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun InfoCard(title: String, content: @Composable () -> Unit) {
    Card(modifier = Modifier.padding(8.dp)) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = title,
                style = MaterialTheme.typography.titleMedium
            )
            content()
        }
    }
}`,
      hints: [
        'Composable lambdas allow slot-based composition.',
        'Card provides Material Design elevation and shape.',
        'content() is called to render the slot content.',
      ],
      concepts: ['Card', 'slot-API', 'composable-lambda'],
    },
    {
      id: 'kt-compose-11',
      title: 'Write a State Hoisting Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a composable using state hoisting pattern.',
      skeleton: `import androidx.compose.runtime.*
import androidx.compose.material3.*

// Write two composables:
// 1. StatefulCounter - holds the state, passes it to StatelessCounter
// 2. StatelessCounter(count: Int, onIncrement: () -> Unit) - displays count and button
// This demonstrates state hoisting: state up, events down`,
      solution: `import androidx.compose.runtime.*
import androidx.compose.material3.*
import androidx.compose.foundation.layout.*

@Composable
fun StatelessCounter(count: Int, onIncrement: () -> Unit) {
    Row {
        Text("Count: \${count}")
        Button(onClick = onIncrement) {
            Text("+1")
        }
    }
}

@Composable
fun StatefulCounter() {
    var count by remember { mutableStateOf(0) }
    StatelessCounter(
        count = count,
        onIncrement = { count++ }
    )
}`,
      hints: [
        'State hoisting moves state to the caller.',
        'The stateless component receives state and event callbacks.',
        'This makes the component reusable and testable.',
      ],
      concepts: ['state-hoisting', 'unidirectional-data-flow'],
    },
    {
      id: 'kt-compose-12',
      title: 'Write a Theme-Aware Component',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a composable that uses MaterialTheme colors.',
      skeleton: `import androidx.compose.runtime.*
import androidx.compose.material3.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.background
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

// Write a @Composable function called ThemedCard that:
// 1. Takes a title: String and subtitle: String
// 2. Uses a Column with background = MaterialTheme.colorScheme.surface
// 3. Title uses MaterialTheme.typography.headlineSmall
// 4. Subtitle uses MaterialTheme.typography.bodyMedium
// 5. Adds appropriate padding`,
      solution: `import androidx.compose.runtime.*
import androidx.compose.material3.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.background
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun ThemedCard(title: String, subtitle: String) {
    Column(
        modifier = Modifier
            .background(MaterialTheme.colorScheme.surface)
            .padding(16.dp)
    ) {
        Text(
            text = title,
            style = MaterialTheme.typography.headlineSmall,
            color = MaterialTheme.colorScheme.onSurface
        )
        Text(
            text = subtitle,
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}`,
      hints: [
        'MaterialTheme.colorScheme provides theme colors.',
        'MaterialTheme.typography provides text styles.',
        'Use onSurface colors for text on surface backgrounds.',
      ],
      concepts: ['MaterialTheme', 'colorScheme', 'typography'],
    },
    {
      id: 'kt-compose-13',
      title: 'Fix Missing remember',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Fix the state that resets on every recomposition.',
      skeleton: `import androidx.compose.runtime.*
import androidx.compose.material3.*

@Composable
fun BrokenCounter() {
    var count by mutableStateOf(0)  // Resets on every recomposition!
    Button(onClick = { count++ }) {
        Text("Count: \${count}")
    }
}`,
      solution: `import androidx.compose.runtime.*
import androidx.compose.material3.*

@Composable
fun BrokenCounter() {
    var count by remember { mutableStateOf(0) }
    Button(onClick = { count++ }) {
        Text("Count: \${count}")
    }
}`,
      hints: [
        'Without remember, state is recreated on every recomposition.',
        'remember preserves the value across recompositions.',
        'Wrap mutableStateOf in remember { }.',
      ],
      concepts: ['remember', 'recomposition', 'state-preservation'],
    },
    {
      id: 'kt-compose-14',
      title: 'Fix Composable in Non-Composable',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Fix the composable function called from a non-composable context.',
      skeleton: `import androidx.compose.runtime.Composable
import androidx.compose.material3.Text

@Composable
fun Label(text: String) {
    Text(text)
}

fun showLabel() {
    Label("Hello")  // Error: @Composable can only be called from @Composable
}`,
      solution: `import androidx.compose.runtime.Composable
import androidx.compose.material3.Text

@Composable
fun Label(text: String) {
    Text(text)
}

@Composable
fun showLabel() {
    Label("Hello")
}`,
      hints: [
        'Composable functions can only be called from other composables.',
        'Add @Composable to the calling function.',
        'The composable call chain must be unbroken.',
      ],
      concepts: ['Composable', 'call-chain'],
    },
    {
      id: 'kt-compose-15',
      title: 'Fix Modifier Order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the modifier chain where order matters.',
      skeleton: `import androidx.compose.runtime.Composable
import androidx.compose.material3.Text
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.background
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun StyledText() {
    // Bug: padding is inside the background, should be outside
    Text(
        "Hello",
        modifier = Modifier
            .padding(16.dp)
            .background(Color.Yellow)
    )
}`,
      solution: `import androidx.compose.runtime.Composable
import androidx.compose.material3.Text
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.background
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun StyledText() {
    Text(
        "Hello",
        modifier = Modifier
            .background(Color.Yellow)
            .padding(16.dp)
    )
}`,
      hints: [
        'Modifier order matters: they apply outside-in.',
        'background then padding: background covers the padded area.',
        'padding then background: padding is transparent outside background.',
      ],
      concepts: ['Modifier-order', 'background', 'padding'],
    },
    {
      id: 'kt-compose-16',
      title: 'Predict Recomposition Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict which parts of the UI recompose when state changes.',
      skeleton: `import androidx.compose.runtime.*

@Composable
fun Parent() {
    var count by remember { mutableStateOf(0) }
    println("Parent composed")
    Column {
        StaticChild()
        DynamicChild(count)
        Button(onClick = { count++ }) { Text("Increment") }
    }
}

@Composable
fun StaticChild() {
    println("Static composed")
    Text("I never change")
}

@Composable
fun DynamicChild(value: Int) {
    println("Dynamic composed: \${value}")
    Text("Value: \${value}")
}

// After clicking the button once, what prints?`,
      solution: `Parent composed
Dynamic composed: 1`,
      hints: [
        'Only composables that read changed state recompose.',
        'StaticChild does not depend on count so it skips.',
        'DynamicChild receives the new count value.',
      ],
      concepts: ['recomposition', 'smart-recomposition', 'skipping'],
    },
    {
      id: 'kt-compose-17',
      title: 'Predict State Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Predict the initial state display.',
      skeleton: `import androidx.compose.runtime.*

@Composable
fun Display() {
    var text by remember { mutableStateOf("Initial") }
    println(text)
    // User has not interacted yet
}`,
      solution: `Initial`,
      hints: [
        'mutableStateOf("Initial") sets the initial value.',
        'On first composition, text is "Initial".',
        'State changes only happen from user interaction or effects.',
      ],
      concepts: ['mutableStateOf', 'initial-state'],
    },
    {
      id: 'kt-compose-18',
      title: 'Predict List Rendering',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict how a LazyColumn renders items.',
      skeleton: `import androidx.compose.runtime.*

@Composable
fun NumberList() {
    val items = listOf("A", "B", "C")
    items.forEachIndexed { index, item ->
        println("\${index}: \${item}")
    }
}`,
      solution: `0: A
1: B
2: C`,
      hints: [
        'forEachIndexed provides both index and item.',
        'Items are processed in order: 0:A, 1:B, 2:C.',
        'This is composition-time logic, not UI rendering.',
      ],
      concepts: ['forEachIndexed', 'list-rendering'],
    },
    {
      id: 'kt-compose-19',
      title: 'Refactor Class Component to Composable',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Refactor an OOP-style component to a Compose composable.',
      skeleton: `class ProfileView {
    private var name: String = ""
    private var bio: String = ""
    
    fun setData(name: String, bio: String) {
        this.name = name
        this.bio = bio
    }
    
    fun render(): String {
        return "Name: \${name}\\nBio: \${bio}"
    }
}

fun main() {
    val view = ProfileView()
    view.setData("Alice", "Developer")
    println(view.render())
}`,
      solution: `import androidx.compose.runtime.Composable
import androidx.compose.material3.Text
import androidx.compose.foundation.layout.Column

@Composable
fun ProfileView(name: String, bio: String) {
    Column {
        Text("Name: \${name}")
        Text("Bio: \${bio}")
    }
}

// Usage: ProfileView(name = "Alice", bio = "Developer")`,
      hints: [
        'Composables are functions, not classes.',
        'Data flows in through parameters, not setters.',
        'No need for explicit render() - the function IS the render.',
      ],
      concepts: ['Composable', 'functional-UI', 'refactoring'],
    },
    {
      id: 'kt-compose-20',
      title: 'Refactor Imperative to Declarative',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Refactor imperative UI updates to declarative Compose state.',
      skeleton: `class FormManager {
    private var email = ""
    private var password = ""
    private var errorMessage = ""
    private var isValid = false
    
    fun updateEmail(value: String) {
        email = value
        validate()
    }
    
    fun updatePassword(value: String) {
        password = value
        validate()
    }
    
    private fun validate() {
        isValid = email.contains("@") && password.length >= 8
        errorMessage = when {
            !email.contains("@") -> "Invalid email"
            password.length < 8 -> "Password too short"
            else -> ""
        }
    }
    
    fun getState(): String = "email=\${email}, valid=\${isValid}, error=\${errorMessage}"
}`,
      solution: `import androidx.compose.runtime.*
import androidx.compose.material3.*
import androidx.compose.foundation.layout.*

@Composable
fun LoginForm() {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    val errorMessage = when {
        email.isNotEmpty() && !email.contains("@") -> "Invalid email"
        password.isNotEmpty() && password.length < 8 -> "Password too short"
        else -> ""
    }
    val isValid = email.contains("@") && password.length >= 8

    Column {
        TextField(value = email, onValueChange = { email = it }, label = { Text("Email") })
        TextField(value = password, onValueChange = { password = it }, label = { Text("Password") })
        if (errorMessage.isNotEmpty()) {
            Text(errorMessage, color = MaterialTheme.colorScheme.error)
        }
        Button(onClick = { }, enabled = isValid) {
            Text("Login")
        }
    }
}`,
      hints: [
        'State drives the UI declaratively - no manual invalidation.',
        'Derived values (errorMessage, isValid) are computed from state.',
        'Compose recomposes automatically when state changes.',
      ],
      concepts: ['declarative-UI', 'derived-state', 'refactoring'],
    },
  ],
};
