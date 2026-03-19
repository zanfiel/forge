import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-swiftui',
  title: '47. SwiftUI Basics',
  explanation: `## SwiftUI Basics

SwiftUI is Apple's declarative framework for building user interfaces across all Apple platforms.

### The View Protocol

\`\`\`swift
struct ContentView: View {
    var body: some View {
        Text("Hello, SwiftUI!")
    }
}
\`\`\`

### State Management

\`\`\`swift
struct CounterView: View {
    @State private var count = 0

    var body: some View {
        VStack {
            Text("Count: \\(count)")
            Button("Increment") { count += 1 }
        }
    }
}
\`\`\`

### Binding

\`\`\`swift
struct ToggleView: View {
    @Binding var isOn: Bool

    var body: some View {
        Toggle("Enabled", isOn: $isOn)
    }
}
\`\`\`

### Layout Stacks

\`\`\`swift
VStack { /* vertical */ }
HStack { /* horizontal */ }
ZStack { /* overlapping */ }
\`\`\`

### Lists and Navigation

\`\`\`swift
struct ItemListView: View {
    let items = ["Apple", "Banana", "Cherry"]

    var body: some View {
        NavigationStack {
            List(items, id: \\.self) { item in
                NavigationLink(item, value: item)
            }
            .navigationTitle("Fruits")
        }
    }
}
\`\`\`

### Modifiers

\`\`\`swift
Text("Styled")
    .font(.title)
    .foregroundColor(.blue)
    .padding()
    .background(.gray.opacity(0.2))
    .cornerRadius(8)
\`\`\`
`,
  exercises: [
    {
      id: 'swift-swiftui-1',
      title: 'Create a Basic View',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Create a struct conforming to the View protocol.',
      skeleton: `struct GreetingView: ___ {
    var body: some View {
        Text("Hello, World!")
    }
}`,
      solution: `struct GreetingView: View {
    var body: some View {
        Text("Hello, World!")
    }
}`,
      hints: ['SwiftUI views conform to the View protocol.', 'The body property returns the view content.', 'The answer is View.'],
      concepts: ['view-protocol', 'declarative-ui'],
    },
    {
      id: 'swift-swiftui-2',
      title: 'Use @State for Local State',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use @State to manage local mutable state in a view.',
      skeleton: `struct NameView: View {
    ___ private var name: String = ""

    var body: some View {
        VStack {
            TextField("Enter name", text: $name)
            Text("Hello, \\(name)!")
        }
    }
}`,
      solution: `struct NameView: View {
    @State private var name: String = ""

    var body: some View {
        VStack {
            TextField("Enter name", text: $name)
            Text("Hello, \\(name)!")
        }
    }
}`,
      hints: ['@State creates a source of truth for value types.', 'SwiftUI manages the storage and re-renders on change.', 'The answer is @State.'],
      concepts: ['state', 'local-state'],
    },
    {
      id: 'swift-swiftui-3',
      title: 'Use @Binding for Child Views',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Pass a binding to a child view.',
      skeleton: `struct ToggleRow: View {
    ___ var isEnabled: Bool

    var body: some View {
        Toggle("Feature", isOn: $isEnabled)
    }
}

struct ParentView: View {
    @State private var featureOn = false

    var body: some View {
        ToggleRow(isEnabled: $featureOn)
    }
}`,
      solution: `struct ToggleRow: View {
    @Binding var isEnabled: Bool

    var body: some View {
        Toggle("Feature", isOn: $isEnabled)
    }
}

struct ParentView: View {
    @State private var featureOn = false

    var body: some View {
        ToggleRow(isEnabled: $featureOn)
    }
}`,
      hints: ['@Binding provides read-write access to a parent\'s state.', 'The child doesn\'t own the data, it references it.', 'The answer is @Binding.'],
      concepts: ['binding', 'two-way-data-flow'],
    },
    {
      id: 'swift-swiftui-4',
      title: 'VStack Layout',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Arrange views vertically using VStack.',
      skeleton: `struct ProfileCard: View {
    var body: some View {
        ___(spacing: 10) {
            Image(systemName: "person.circle.fill")
                .font(.largeTitle)
            Text("John Doe")
                .font(.headline)
            Text("iOS Developer")
                .font(.subheadline)
                .foregroundColor(.gray)
        }
        .padding()
    }
}`,
      solution: `struct ProfileCard: View {
    var body: some View {
        VStack(spacing: 10) {
            Image(systemName: "person.circle.fill")
                .font(.largeTitle)
            Text("John Doe")
                .font(.headline)
            Text("iOS Developer")
                .font(.subheadline)
                .foregroundColor(.gray)
        }
        .padding()
    }
}`,
      hints: ['VStack arranges children vertically.', 'The spacing parameter sets space between children.', 'The answer is VStack.'],
      concepts: ['vstack', 'layout'],
    },
    {
      id: 'swift-swiftui-5',
      title: 'NavigationStack Setup',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Wrap a list in a NavigationStack.',
      skeleton: `struct FruitListView: View {
    let fruits = ["Apple", "Banana", "Cherry"]

    var body: some View {
        ___ {
            List(fruits, id: \\.self) { fruit in
                NavigationLink(fruit, value: fruit)
            }
            .navigationTitle("Fruits")
        }
    }
}`,
      solution: `struct FruitListView: View {
    let fruits = ["Apple", "Banana", "Cherry"]

    var body: some View {
        NavigationStack {
            List(fruits, id: \\.self) { fruit in
                NavigationLink(fruit, value: fruit)
            }
            .navigationTitle("Fruits")
        }
    }
}`,
      hints: ['NavigationStack is the modern container for navigation.', 'It replaces the deprecated NavigationView.', 'The answer is NavigationStack.'],
      concepts: ['navigation-stack', 'navigation'],
    },
    {
      id: 'swift-swiftui-6',
      title: 'Use @ObservedObject',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Observe an external ObservableObject in a view.',
      skeleton: `class TimerModel: ObservableObject {
    @Published var seconds: Int = 0
}

struct TimerView: View {
    ___ var timer: TimerModel

    var body: some View {
        Text("Elapsed: \\(timer.seconds)s")
    }
}`,
      solution: `class TimerModel: ObservableObject {
    @Published var seconds: Int = 0
}

struct TimerView: View {
    @ObservedObject var timer: TimerModel

    var body: some View {
        Text("Elapsed: \\(timer.seconds)s")
    }
}`,
      hints: ['Use @ObservedObject when the view does not own the model.', 'It re-renders the view when @Published properties change.', 'The answer is @ObservedObject.'],
      concepts: ['observed-object', 'external-state'],
    },
    {
      id: 'swift-swiftui-7',
      title: 'Write a Counter View',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Write a complete counter view with increment and decrement buttons.',
      skeleton: `// Write a struct CounterView: View with:
// - @State private var count: Int = 0
// - body: VStack with Text showing count, HStack with "-" and "+" buttons
// - Decrement button should not go below 0
`,
      solution: `struct CounterView: View {
    @State private var count: Int = 0

    var body: some View {
        VStack(spacing: 20) {
            Text("\\(count)")
                .font(.largeTitle)
            HStack(spacing: 40) {
                Button("-") {
                    if count > 0 { count -= 1 }
                }
                .font(.title)
                Button("+") {
                    count += 1
                }
                .font(.title)
            }
        }
    }
}`,
      hints: ['Use @State for the counter value.', 'Guard against negative values in the decrement action.', 'Button takes a label string and an action closure.'],
      concepts: ['state', 'button-action', 'conditional-logic'],
    },
    {
      id: 'swift-swiftui-8',
      title: 'Write a Todo List View',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a simple todo list with add and delete functionality.',
      skeleton: `// Write TodoListView: View with:
// - @State private var items: [String] = []
// - @State private var newItem: String = ""
// - body: NavigationStack containing:
//   - TextField for new item input
//   - Button to add item (if not empty)
//   - List with ForEach showing items, .onDelete to remove
//   - .navigationTitle("Todos")
`,
      solution: `struct TodoListView: View {
    @State private var items: [String] = []
    @State private var newItem: String = ""

    var body: some View {
        NavigationStack {
            VStack {
                HStack {
                    TextField("New item", text: $newItem)
                        .textFieldStyle(.roundedBorder)
                    Button("Add") {
                        if !newItem.isEmpty {
                            items.append(newItem)
                            newItem = ""
                        }
                    }
                }
                .padding()
                List {
                    ForEach(items, id: \\.self) { item in
                        Text(item)
                    }
                    .onDelete { offsets in
                        items.remove(atOffsets: offsets)
                    }
                }
            }
            .navigationTitle("Todos")
        }
    }
}`,
      hints: ['Use HStack for the input row with TextField and Button.', 'ForEach with .onDelete enables swipe-to-delete.', 'Clear the newItem text field after adding.'],
      concepts: ['list', 'for-each', 'on-delete', 'text-field'],
    },
    {
      id: 'swift-swiftui-9',
      title: 'Write a Custom Modifier',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Create a custom ViewModifier for a card style.',
      skeleton: `// Write:
// - struct CardModifier: ViewModifier with body(content:)
//   that adds padding, white background, cornerRadius(12),
//   and shadow(radius: 4)
// - extension View with func cardStyle() -> some View
`,
      solution: `struct CardModifier: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding()
            .background(Color.white)
            .cornerRadius(12)
            .shadow(radius: 4)
    }
}

extension View {
    func cardStyle() -> some View {
        modifier(CardModifier())
    }
}`,
      hints: ['ViewModifier has a body(content:) method that transforms the content.', 'Chain modifiers on the content parameter.', 'The extension provides a clean API for using the modifier.'],
      concepts: ['view-modifier', 'extension', 'reusable-styles'],
    },
    {
      id: 'swift-swiftui-10',
      title: 'Write a Settings View with Multiple Controls',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a settings view using Form and various controls.',
      skeleton: `// Write SettingsView: View with:
// - @State var username: String = ""
// - @State var notificationsOn: Bool = true
// - @State var fontSize: Double = 14
// - body: NavigationStack > Form with sections:
//   Section "Profile": TextField for username
//   Section "Preferences": Toggle for notifications, Slider for fontSize (10...24)
`,
      solution: `struct SettingsView: View {
    @State private var username: String = ""
    @State private var notificationsOn: Bool = true
    @State private var fontSize: Double = 14

    var body: some View {
        NavigationStack {
            Form {
                Section("Profile") {
                    TextField("Username", text: $username)
                }
                Section("Preferences") {
                    Toggle("Notifications", isOn: $notificationsOn)
                    VStack(alignment: .leading) {
                        Text("Font Size: \\(Int(fontSize))")
                        Slider(value: $fontSize, in: 10...24, step: 1)
                    }
                }
            }
            .navigationTitle("Settings")
        }
    }
}`,
      hints: ['Form groups controls in a scrollable settings-style layout.', 'Section groups related controls with a header.', 'Slider uses a range binding for the value.'],
      concepts: ['form', 'section', 'toggle', 'slider'],
    },
    {
      id: 'swift-swiftui-11',
      title: 'Write a ZStack Overlay View',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use ZStack to overlay a badge on an image.',
      skeleton: `// Write BadgeView: View with:
// - let count: Int
// - body: ZStack(alignment: .topTrailing) containing:
//   - Image(systemName: "bell.fill") sized 40x40
//   - if count > 0: Text showing count in white on red circle
`,
      solution: `struct BadgeView: View {
    let count: Int

    var body: some View {
        ZStack(alignment: .topTrailing) {
            Image(systemName: "bell.fill")
                .font(.system(size: 40))
                .foregroundColor(.blue)
            if count > 0 {
                Text("\\(count)")
                    .font(.caption)
                    .foregroundColor(.white)
                    .padding(6)
                    .background(Color.red)
                    .clipShape(Circle())
                    .offset(x: 8, y: -8)
            }
        }
    }
}`,
      hints: ['ZStack layers views on top of each other.', 'alignment: .topTrailing places the badge at the top-right.', 'Use offset to fine-tune badge position.'],
      concepts: ['zstack', 'conditional-view', 'overlay'],
    },
    {
      id: 'swift-swiftui-12',
      title: 'Write a Grid Layout',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Create a grid layout using LazyVGrid.',
      skeleton: `// Write ColorGridView: View with:
// - let colors: [Color] = [.red, .blue, .green, .orange, .purple, .pink]
// - let columns = Array(repeating: GridItem(.flexible()), count: 3)
// - body: ScrollView > LazyVGrid showing each color as a rounded rectangle
`,
      solution: `struct ColorGridView: View {
    let colors: [Color] = [.red, .blue, .green, .orange, .purple, .pink]
    let columns = Array(repeating: GridItem(.flexible()), count: 3)

    var body: some View {
        ScrollView {
            LazyVGrid(columns: columns, spacing: 16) {
                ForEach(colors, id: \\.self) { color in
                    RoundedRectangle(cornerRadius: 10)
                        .fill(color)
                        .frame(height: 100)
                }
            }
            .padding()
        }
    }
}`,
      hints: ['LazyVGrid takes an array of GridItem to define columns.', 'GridItem(.flexible()) creates equal-width columns.', 'ForEach iterates over the colors to create cells.'],
      concepts: ['lazy-v-grid', 'grid-item', 'scroll-view'],
    },
    {
      id: 'swift-swiftui-13',
      title: 'Fix Missing $ for Binding',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix a view that passes a value instead of a binding.',
      skeleton: `struct SliderView: View {
    @State private var volume: Double = 0.5

    var body: some View {
        VStack {
            Slider(value: volume, in: 0...1)
            Text("Volume: \\(Int(volume * 100))%")
        }
    }
}`,
      solution: `struct SliderView: View {
    @State private var volume: Double = 0.5

    var body: some View {
        VStack {
            Slider(value: $volume, in: 0...1)
            Text("Volume: \\(Int(volume * 100))%")
        }
    }
}`,
      hints: ['Slider requires a Binding<Double>, not a plain Double.', 'Use $ prefix to get a binding from @State.', 'The $ turns the value into a two-way binding.'],
      concepts: ['binding-syntax', 'dollar-sign', 'two-way-binding'],
    },
    {
      id: 'swift-swiftui-14',
      title: 'Fix ForEach Missing id',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix a ForEach that does not provide identity for its elements.',
      skeleton: `struct NameListView: View {
    let names = ["Alice", "Bob", "Charlie"]

    var body: some View {
        List {
            ForEach(names) { name in
                Text(name)
            }
        }
    }
}`,
      solution: `struct NameListView: View {
    let names = ["Alice", "Bob", "Charlie"]

    var body: some View {
        List {
            ForEach(names, id: \\.self) { name in
                Text(name)
            }
        }
    }
}`,
      hints: ['String does not conform to Identifiable by default.', 'Use id: \\.self when elements are themselves unique.', 'ForEach needs a way to uniquely identify each element.'],
      concepts: ['for-each-identity', 'identifiable'],
    },
    {
      id: 'swift-swiftui-15',
      title: 'Fix View Not Updating on State Change',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix a view where state changes do not trigger re-render.',
      skeleton: `struct ColorView: View {
    private var isRed: Bool = true

    var body: some View {
        VStack {
            Circle()
                .fill(isRed ? Color.red : Color.blue)
                .frame(width: 100, height: 100)
            Button("Toggle Color") {
                isRed.toggle()
            }
        }
    }
}`,
      solution: `struct ColorView: View {
    @State private var isRed: Bool = true

    var body: some View {
        VStack {
            Circle()
                .fill(isRed ? Color.red : Color.blue)
                .frame(width: 100, height: 100)
            Button("Toggle Color") {
                isRed.toggle()
            }
        }
    }
}`,
      hints: ['Regular properties in a struct cannot be mutated.', 'Use @State to make SwiftUI manage the property.', 'Without @State, the view body never recomputes.'],
      concepts: ['state-management', 'view-rerender'],
    },
    {
      id: 'swift-swiftui-16',
      title: 'Predict View Hierarchy',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict the layout structure described by SwiftUI code.',
      skeleton: `// What text labels appear in order from top to bottom?
struct InfoView: View {
    var body: some View {
        VStack {
            Text("Header")
            HStack {
                Text("Left")
                Text("Right")
            }
            Text("Footer")
        }
    }
}
// List the visible texts top-to-bottom, left-to-right:`,
      solution: `Header
Left Right
Footer`,
      hints: ['VStack stacks children vertically.', 'HStack places Left and Right side by side.', 'Order: Header, then Left/Right on same line, then Footer.'],
      concepts: ['vstack', 'hstack', 'layout-order'],
    },
    {
      id: 'swift-swiftui-17',
      title: 'Predict State Changes',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the text displayed after state mutations.',
      skeleton: `// After the following sequence, what does the Text display?
// @State var items: [String] = []
// Action 1: items.append("A")
// Action 2: items.append("B")
// Action 3: items.append("C")
// Action 4: items.remove(at: 1)
// Action 5: items.insert("D", at: 0)
// Text shows: items.joined(separator: ", ")
print(["D", "A", "C"].joined(separator: ", "))`,
      solution: `D, A, C`,
      hints: ['After appends: ["A", "B", "C"].', 'Remove at index 1: ["A", "C"].', 'Insert "D" at 0: ["D", "A", "C"].'],
      concepts: ['state-mutation', 'array-operations'],
    },
    {
      id: 'swift-swiftui-18',
      title: 'Predict Conditional View',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict which views are shown based on state.',
      skeleton: `// Given:
let isLoggedIn = true
let isAdmin = false

// View body:
// if isLoggedIn {
//     if isAdmin { Text("Admin Panel") }
//     else { Text("User Dashboard") }
// } else {
//     Text("Please Log In")
// }
// What text is displayed?
print("User Dashboard")`,
      solution: `User Dashboard`,
      hints: ['isLoggedIn is true, so we enter the first branch.', 'isAdmin is false, so we take the else branch.', 'The displayed text is "User Dashboard".'],
      concepts: ['conditional-view', 'if-else-view'],
    },
    {
      id: 'swift-swiftui-19',
      title: 'Refactor Repeated Modifiers',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Extract repeated modifiers into a custom ViewModifier.',
      skeleton: `struct MenuView: View {
    var body: some View {
        VStack {
            Text("Option 1")
                .padding()
                .frame(maxWidth: .infinity)
                .background(Color.blue)
                .foregroundColor(.white)
                .cornerRadius(8)
            Text("Option 2")
                .padding()
                .frame(maxWidth: .infinity)
                .background(Color.blue)
                .foregroundColor(.white)
                .cornerRadius(8)
            Text("Option 3")
                .padding()
                .frame(maxWidth: .infinity)
                .background(Color.blue)
                .foregroundColor(.white)
                .cornerRadius(8)
        }
    }
}`,
      solution: `struct MenuButtonStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding()
            .frame(maxWidth: .infinity)
            .background(Color.blue)
            .foregroundColor(.white)
            .cornerRadius(8)
    }
}

extension View {
    func menuButtonStyle() -> some View {
        modifier(MenuButtonStyle())
    }
}

struct MenuView: View {
    var body: some View {
        VStack {
            Text("Option 1").menuButtonStyle()
            Text("Option 2").menuButtonStyle()
            Text("Option 3").menuButtonStyle()
        }
    }
}`,
      hints: ['Extract the repeated modifier chain into a ViewModifier struct.', 'Create an extension method for clean usage.', 'Apply the single modifier instead of repeating the chain.'],
      concepts: ['view-modifier', 'dry-principle', 'code-reuse'],
    },
    {
      id: 'swift-swiftui-20',
      title: 'Refactor Nested If-Else to Group',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Refactor complex conditional views using ViewBuilder and extracted subviews.',
      skeleton: `struct DashboardView: View {
    @State var isLoading = false
    @State var hasError = false
    @State var items: [String] = []

    var body: some View {
        VStack {
            if isLoading {
                ProgressView("Loading...")
                Text("Please wait")
                    .foregroundColor(.gray)
            } else if hasError {
                Image(systemName: "exclamationmark.triangle")
                    .font(.largeTitle)
                    .foregroundColor(.red)
                Text("Something went wrong")
                Button("Retry") { isLoading = true }
            } else if items.isEmpty {
                Image(systemName: "tray")
                    .font(.largeTitle)
                Text("No items yet")
            } else {
                List(items, id: \\.self) { Text($0) }
            }
        }
    }
}`,
      solution: `struct LoadingView: View {
    var body: some View {
        VStack {
            ProgressView("Loading...")
            Text("Please wait")
                .foregroundColor(.gray)
        }
    }
}

struct ErrorView: View {
    let onRetry: () -> Void

    var body: some View {
        VStack {
            Image(systemName: "exclamationmark.triangle")
                .font(.largeTitle)
                .foregroundColor(.red)
            Text("Something went wrong")
            Button("Retry", action: onRetry)
        }
    }
}

struct EmptyStateView: View {
    var body: some View {
        VStack {
            Image(systemName: "tray")
                .font(.largeTitle)
            Text("No items yet")
        }
    }
}

struct DashboardView: View {
    @State var isLoading = false
    @State var hasError = false
    @State var items: [String] = []

    var body: some View {
        if isLoading {
            LoadingView()
        } else if hasError {
            ErrorView { isLoading = true }
        } else if items.isEmpty {
            EmptyStateView()
        } else {
            List(items, id: \\.self) { Text($0) }
        }
    }
}`,
      hints: ['Extract each conditional branch into its own View struct.', 'Pass callbacks (like onRetry) as closures.', 'The main view becomes a clean routing switch.'],
      concepts: ['view-extraction', 'composition', 'single-responsibility'],
    },
  ],
};
