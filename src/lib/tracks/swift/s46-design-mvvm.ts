import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-mvvm',
  title: '46. MVVM Pattern',
  explanation: `## MVVM Pattern in Swift

The Model-View-ViewModel pattern separates UI logic from business logic by introducing a ViewModel layer that exposes data and commands for the View to bind to.

### Model

\`\`\`swift
struct User {
    let id: Int
    let name: String
    let email: String
}
\`\`\`

### ViewModel with Observable

\`\`\`swift
import Combine

class UserViewModel: ObservableObject {
    @Published var userName: String = ""
    @Published var userEmail: String = ""
    @Published var isLoading: Bool = false

    private let userService: UserService

    init(userService: UserService) {
        self.userService = userService
    }

    func loadUser(id: Int) {
        isLoading = true
        userService.fetchUser(id: id) { [weak self] user in
            self?.userName = user.name
            self?.userEmail = user.email
            self?.isLoading = false
        }
    }
}
\`\`\`

### SwiftUI View Binding

\`\`\`swift
struct UserView: View {
    @ObservedObject var viewModel: UserViewModel

    var body: some View {
        VStack {
            if viewModel.isLoading {
                ProgressView()
            } else {
                Text(viewModel.userName)
                Text(viewModel.userEmail)
            }
        }
        .onAppear { viewModel.loadUser(id: 1) }
    }
}
\`\`\`

### Dependency Injection

\`\`\`swift
protocol UserService {
    func fetchUser(id: Int, completion: @escaping (User) -> Void)
}

class APIUserService: UserService {
    func fetchUser(id: Int, completion: @escaping (User) -> Void) {
        // Network call
    }
}

class MockUserService: UserService {
    func fetchUser(id: Int, completion: @escaping (User) -> Void) {
        completion(User(id: id, name: "Test", email: "test@test.com"))
    }
}
\`\`\`
`,
  exercises: [
    {
      id: 'swift-mvvm-1',
      title: 'Define a Model',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Define a simple model struct for MVVM.',
      skeleton: `___ Task {
    let id: Int
    let title: String
    let isCompleted: Bool
}`,
      solution: `struct Task {
    let id: Int
    let title: String
    let isCompleted: Bool
}`,
      hints: ['Models in MVVM are plain data types.', 'Structs are value types ideal for models.', 'The answer is struct.'],
      concepts: ['model', 'value-type'],
    },
    {
      id: 'swift-mvvm-2',
      title: 'Make a ViewModel Observable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use ObservableObject for a ViewModel.',
      skeleton: `import Combine

class TaskViewModel: ___ {
    @Published var tasks: [Task] = []
    @Published var errorMessage: String?
}`,
      solution: `import Combine

class TaskViewModel: ObservableObject {
    @Published var tasks: [Task] = []
    @Published var errorMessage: String?
}`,
      hints: ['ViewModels conform to ObservableObject.', 'This lets SwiftUI observe changes.', 'The answer is ObservableObject.'],
      concepts: ['observable-object', 'view-model'],
    },
    {
      id: 'swift-mvvm-3',
      title: 'Published Property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Mark a property as published so the view updates on change.',
      skeleton: `class CounterViewModel: ObservableObject {
    ___ var count: Int = 0

    func increment() {
        count += 1
    }

    func decrement() {
        count -= 1
    }
}`,
      solution: `class CounterViewModel: ObservableObject {
    @Published var count: Int = 0

    func increment() {
        count += 1
    }

    func decrement() {
        count -= 1
    }
}`,
      hints: ['The property wrapper notifies observers of changes.', '@Published triggers view updates.', 'The answer is @Published.'],
      concepts: ['published', 'property-wrapper'],
    },
    {
      id: 'swift-mvvm-4',
      title: 'Observe ViewModel in View',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use the correct property wrapper to observe a ViewModel.',
      skeleton: `struct CounterView: View {
    ___ var viewModel: CounterViewModel

    var body: some View {
        VStack {
            Text("Count: \\(viewModel.count)")
            Button("Increment") { viewModel.increment() }
        }
    }
}`,
      solution: `struct CounterView: View {
    @ObservedObject var viewModel: CounterViewModel

    var body: some View {
        VStack {
            Text("Count: \\(viewModel.count)")
            Button("Increment") { viewModel.increment() }
        }
    }
}`,
      hints: ['This wrapper observes an external ObservableObject.', 'It re-renders the view when published properties change.', 'The answer is @ObservedObject.'],
      concepts: ['observed-object', 'view-binding'],
    },
    {
      id: 'swift-mvvm-5',
      title: 'StateObject Ownership',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use @StateObject for owned ViewModel creation.',
      skeleton: `struct TaskListView: View {
    ___ var viewModel = TaskListViewModel()

    var body: some View {
        List(viewModel.tasks, id: \\.id) { task in
            Text(task.title)
        }
        .onAppear { viewModel.fetchTasks() }
    }
}`,
      solution: `struct TaskListView: View {
    @StateObject var viewModel = TaskListViewModel()

    var body: some View {
        List(viewModel.tasks, id: \\.id) { task in
            Text(task.title)
        }
        .onAppear { viewModel.fetchTasks() }
    }
}`,
      hints: ['When a view creates and owns the ViewModel, use this wrapper.', '@StateObject ensures the VM survives view re-creation.', 'The answer is @StateObject.'],
      concepts: ['state-object', 'ownership'],
    },
    {
      id: 'swift-mvvm-6',
      title: 'Dependency Injection Protocol',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Define a service protocol for dependency injection in MVVM.',
      skeleton: `___ TaskService {
    func fetchTasks() async throws -> [Task]
    func saveTask(_ task: Task) async throws
    func deleteTask(id: Int) async throws
}

class TaskViewModel: ObservableObject {
    private let service: TaskService

    init(service: TaskService) {
        self.service = service
    }
}`,
      solution: `protocol TaskService {
    func fetchTasks() async throws -> [Task]
    func saveTask(_ task: Task) async throws
    func deleteTask(id: Int) async throws
}

class TaskViewModel: ObservableObject {
    private let service: TaskService

    init(service: TaskService) {
        self.service = service
    }
}`,
      hints: ['Services are abstracted behind protocols.', 'This enables mocking for tests.', 'The answer is protocol.'],
      concepts: ['dependency-injection', 'protocol-abstraction'],
    },
    {
      id: 'swift-mvvm-7',
      title: 'Write a ViewModel with Data Loading',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a ViewModel that loads data asynchronously.',
      skeleton: `// Given:
struct Article {
    let id: Int
    let title: String
    let body: String
}

protocol ArticleRepository {
    func fetchArticles() async throws -> [Article]
}

// Write ArticleViewModel: ObservableObject with:
// - @Published var articles: [Article]
// - @Published var isLoading: Bool
// - @Published var errorMessage: String?
// - private let repository: ArticleRepository
// - init(repository:)
// - func loadArticles() async
`,
      solution: `class ArticleViewModel: ObservableObject {
    @Published var articles: [Article] = []
    @Published var isLoading: Bool = false
    @Published var errorMessage: String? = nil

    private let repository: ArticleRepository

    init(repository: ArticleRepository) {
        self.repository = repository
    }

    @MainActor
    func loadArticles() async {
        isLoading = true
        errorMessage = nil
        do {
            articles = try await repository.fetchArticles()
        } catch {
            errorMessage = error.localizedDescription
        }
        isLoading = false
    }
}`,
      hints: ['Use @Published for reactive properties.', 'Use @MainActor to update UI state on the main thread.', 'Wrap the async call in do-catch for error handling.'],
      concepts: ['async-view-model', 'main-actor', 'error-handling'],
    },
    {
      id: 'swift-mvvm-8',
      title: 'Write a Form ViewModel',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a ViewModel for form validation.',
      skeleton: `// Write LoginViewModel: ObservableObject with:
// - @Published var email: String = ""
// - @Published var password: String = ""
// - computed var isEmailValid: Bool (contains "@" and ".")
// - computed var isPasswordValid: Bool (count >= 8)
// - computed var canSubmit: Bool
// - func submit() that prints "Logging in \\(email)"
`,
      solution: `class LoginViewModel: ObservableObject {
    @Published var email: String = ""
    @Published var password: String = ""

    var isEmailValid: Bool {
        email.contains("@") && email.contains(".")
    }

    var isPasswordValid: Bool {
        password.count >= 8
    }

    var canSubmit: Bool {
        isEmailValid && isPasswordValid
    }

    func submit() {
        print("Logging in \\(email)")
    }
}`,
      hints: ['Computed properties derive validation state from @Published inputs.', 'canSubmit combines both validations.', 'No need for @Published on computed properties.'],
      concepts: ['form-validation', 'computed-properties', 'mvvm-binding'],
    },
    {
      id: 'swift-mvvm-9',
      title: 'Write a Mock Service for Testing',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a mock service and test a ViewModel.',
      skeleton: `// Given:
protocol WeatherService {
    func fetchTemperature(city: String) async throws -> Double
}

class WeatherViewModel: ObservableObject {
    @Published var temperature: Double?
    @Published var errorMessage: String?
    private let service: WeatherService

    init(service: WeatherService) { self.service = service }

    @MainActor
    func load(city: String) async {
        do {
            temperature = try await service.fetchTemperature(city: city)
        } catch {
            errorMessage = error.localizedDescription
        }
    }
}

// Write MockWeatherService that returns a configurable temperature
// Write a test function that verifies the ViewModel loads data correctly
`,
      solution: `class MockWeatherService: WeatherService {
    var temperatureToReturn: Double = 72.0
    var shouldThrow: Bool = false

    func fetchTemperature(city: String) async throws -> Double {
        if shouldThrow {
            throw URLError(.badServerResponse)
        }
        return temperatureToReturn
    }
}

func testWeatherViewModel() async {
    let mock = MockWeatherService()
    mock.temperatureToReturn = 85.0
    let vm = WeatherViewModel(service: mock)
    await vm.load(city: "Phoenix")
    assert(vm.temperature == 85.0)
    assert(vm.errorMessage == nil)
}`,
      hints: ['The mock stores a configurable return value.', 'The test creates the mock, configures it, and verifies the ViewModel state.', 'Use assert to verify correctness.'],
      concepts: ['mock-service', 'view-model-testing', 'dependency-injection'],
    },
    {
      id: 'swift-mvvm-10',
      title: 'Write a Navigation ViewModel',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a ViewModel that manages navigation state.',
      skeleton: `// Write:
// - enum Destination: Hashable { case list, detail(id: Int), settings }
// - class NavigationViewModel: ObservableObject with:
//   - @Published var path: [Destination] = []
//   - func push(_ destination: Destination)
//   - func pop()
//   - func popToRoot()
//   - computed var currentDestination: Destination?
`,
      solution: `enum Destination: Hashable {
    case list
    case detail(id: Int)
    case settings
}

class NavigationViewModel: ObservableObject {
    @Published var path: [Destination] = []

    var currentDestination: Destination? {
        path.last
    }

    func push(_ destination: Destination) {
        path.append(destination)
    }

    func pop() {
        guard !path.isEmpty else { return }
        path.removeLast()
    }

    func popToRoot() {
        path.removeAll()
    }
}`,
      hints: ['The path array acts as a navigation stack.', 'push appends, pop removes last, popToRoot clears all.', 'currentDestination is the last element.'],
      concepts: ['navigation-state', 'navigation-stack', 'mvvm-navigation'],
    },
    {
      id: 'swift-mvvm-11',
      title: 'Write a Protocol-Oriented ViewModel',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Define a ViewModel protocol with a default implementation.',
      skeleton: `// Write:
// - protocol ListViewModel: ObservableObject with:
//   - associatedtype Item: Identifiable
//   - var items: [Item] { get set }
//   - var isLoading: Bool { get set }
//   - func fetchItems() async
//   - func deleteItem(at offsets: IndexSet)
// - provide a default extension for deleteItem
`,
      solution: `protocol ListViewModel: ObservableObject {
    associatedtype Item: Identifiable
    var items: [Item] { get set }
    var isLoading: Bool { get set }
    func fetchItems() async
    func deleteItem(at offsets: IndexSet)
}

extension ListViewModel {
    func deleteItem(at offsets: IndexSet) {
        items.remove(atOffsets: offsets)
    }
}`,
      hints: ['Use associatedtype for the generic item.', 'The extension provides a default delete implementation.', 'Conforming types only need to implement fetchItems.'],
      concepts: ['protocol-oriented', 'associated-type', 'default-implementation'],
    },
    {
      id: 'swift-mvvm-12',
      title: 'Write a Combine-Powered ViewModel',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a ViewModel that uses Combine for reactive search.',
      skeleton: `import Combine

// Write SearchViewModel: ObservableObject with:
// - @Published var query: String = ""
// - @Published var results: [String] = []
// - private var cancellables = Set<AnyCancellable>()
// - init that debounces query changes by 0.3s and calls search
// - private func search(_ term: String)
`,
      solution: `import Combine

class SearchViewModel: ObservableObject {
    @Published var query: String = ""
    @Published var results: [String] = []
    private var cancellables = Set<AnyCancellable>()

    init() {
        $query
            .debounce(for: .seconds(0.3), scheduler: RunLoop.main)
            .removeDuplicates()
            .sink { [weak self] term in
                self?.search(term)
            }
            .store(in: &cancellables)
    }

    private func search(_ term: String) {
        guard !term.isEmpty else {
            results = []
            return
        }
        results = ["Result for \\(term) 1", "Result for \\(term) 2"]
    }
}`,
      hints: ['Use $query to access the Publisher for the @Published property.', 'debounce waits before emitting, removeDuplicates avoids redundant searches.', 'Store the subscription in cancellables to keep it alive.'],
      concepts: ['combine-binding', 'debounce', 'reactive-search'],
    },
    {
      id: 'swift-mvvm-13',
      title: 'Fix Missing Weak Self',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix a retain cycle in a ViewModel closure.',
      skeleton: `class ProfileViewModel: ObservableObject {
    @Published var name: String = ""
    private let service: ProfileService

    init(service: ProfileService) {
        self.service = service
    }

    func loadProfile() {
        service.fetchProfile { result in
            self.name = result.name  // Bug: strong capture causes retain cycle
        }
    }
}`,
      solution: `class ProfileViewModel: ObservableObject {
    @Published var name: String = ""
    private let service: ProfileService

    init(service: ProfileService) {
        self.service = service
    }

    func loadProfile() {
        service.fetchProfile { [weak self] result in
            self?.name = result.name
        }
    }
}`,
      hints: ['Closures can create retain cycles by strongly capturing self.', 'Use [weak self] in the capture list.', 'Access self with optional chaining after weak capture.'],
      concepts: ['retain-cycle', 'weak-self', 'memory-management'],
    },
    {
      id: 'swift-mvvm-14',
      title: 'Fix ViewModel Not Updating UI',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix a ViewModel that updates state off the main thread.',
      skeleton: `class DataViewModel: ObservableObject {
    @Published var items: [String] = []

    func fetchItems() {
        DispatchQueue.global().async {
            let fetched = ["Item 1", "Item 2", "Item 3"]
            // Bug: updating @Published off main thread
            self.items = fetched
        }
    }
}`,
      solution: `class DataViewModel: ObservableObject {
    @Published var items: [String] = []

    func fetchItems() {
        DispatchQueue.global().async { [weak self] in
            let fetched = ["Item 1", "Item 2", "Item 3"]
            DispatchQueue.main.async {
                self?.items = fetched
            }
        }
    }
}`,
      hints: ['@Published properties must be updated on the main thread.', 'Wrap the assignment in DispatchQueue.main.async.', 'Also add [weak self] to prevent retain cycles.'],
      concepts: ['main-thread', 'ui-update', 'dispatch-queue'],
    },
    {
      id: 'swift-mvvm-15',
      title: 'Fix Missing ObservableObject Conformance',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix a ViewModel that does not trigger view updates.',
      skeleton: `import Combine

class SettingsViewModel {
    var isDarkMode: Bool = false
    var fontSize: Int = 14
    var username: String = "Guest"
}

struct SettingsView: View {
    @ObservedObject var viewModel: SettingsViewModel

    var body: some View {
        Toggle("Dark Mode", isOn: $viewModel.isDarkMode)
    }
}`,
      solution: `import Combine

class SettingsViewModel: ObservableObject {
    @Published var isDarkMode: Bool = false
    @Published var fontSize: Int = 14
    @Published var username: String = "Guest"
}

struct SettingsView: View {
    @ObservedObject var viewModel: SettingsViewModel

    var body: some View {
        Toggle("Dark Mode", isOn: $viewModel.isDarkMode)
    }
}`,
      hints: ['The ViewModel must conform to ObservableObject.', 'Properties need @Published to trigger updates.', 'Without these, the view never re-renders.'],
      concepts: ['observable-object', 'published', 'data-binding'],
    },
    {
      id: 'swift-mvvm-16',
      title: 'Predict ViewModel Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict the state of a ViewModel after mutations.',
      skeleton: `class ScoreViewModel: ObservableObject {
    @Published var score: Int = 0

    func add(_ points: Int) { score += points }
    func reset() { score = 0 }
}

let vm = ScoreViewModel()
vm.add(10)
vm.add(5)
vm.add(20)
vm.reset()
vm.add(3)
print(vm.score)`,
      solution: `3`,
      hints: ['10 + 5 + 20 = 35, then reset to 0.', 'After reset, add 3.', 'Final score is 3.'],
      concepts: ['state-mutation', 'view-model-logic'],
    },
    {
      id: 'swift-mvvm-17',
      title: 'Predict Validation Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict computed validation results.',
      skeleton: `class FormVM: ObservableObject {
    @Published var name: String = ""
    @Published var age: Int = 0

    var isNameValid: Bool { name.count >= 2 }
    var isAgeValid: Bool { age >= 18 }
    var canSubmit: Bool { isNameValid && isAgeValid }
}

let vm = FormVM()
vm.name = "Al"
vm.age = 17
print(vm.canSubmit)
vm.age = 18
print(vm.canSubmit)
vm.name = "A"
print(vm.canSubmit)`,
      solution: `false
true
false`,
      hints: ['name="Al" (2 chars, valid), age=17 (invalid) -> false.', 'age=18 (valid), name still "Al" (valid) -> true.', 'name="A" (1 char, invalid) -> false.'],
      concepts: ['computed-validation', 'reactive-state'],
    },
    {
      id: 'swift-mvvm-18',
      title: 'Predict Navigation State',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the navigation path state.',
      skeleton: `class NavVM: ObservableObject {
    @Published var path: [String] = []

    func push(_ s: String) { path.append(s) }
    func pop() { if !path.isEmpty { path.removeLast() } }
    func popToRoot() { path.removeAll() }
}

let vm = NavVM()
vm.push("Home")
vm.push("Detail")
vm.push("Settings")
vm.pop()
print(vm.path.count)
print(vm.path.last ?? "empty")
vm.popToRoot()
print(vm.path.count)`,
      solution: `2
Detail
0`,
      hints: ['Push 3 items, pop 1 -> 2 items remain.', 'Last item after pop is "Detail".', 'popToRoot removes all.'],
      concepts: ['navigation-stack', 'state-tracking'],
    },
    {
      id: 'swift-mvvm-19',
      title: 'Refactor Massive ViewController to MVVM',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Extract logic from a view into a ViewModel.',
      skeleton: `struct ProductView: View {
    @State private var products: [String] = []
    @State private var searchText: String = ""
    @State private var isLoading: Bool = false

    var filteredProducts: [String] {
        if searchText.isEmpty { return products }
        return products.filter { $0.lowercased().contains(searchText.lowercased()) }
    }

    func loadProducts() {
        isLoading = true
        // simulate fetch
        products = ["Widget", "Gadget", "Doohickey"]
        isLoading = false
    }

    var body: some View {
        List(filteredProducts, id: \\.self) { Text($0) }
            .searchable(text: $searchText)
            .onAppear { loadProducts() }
    }
}`,
      solution: `class ProductViewModel: ObservableObject {
    @Published var products: [String] = []
    @Published var searchText: String = ""
    @Published var isLoading: Bool = false

    var filteredProducts: [String] {
        if searchText.isEmpty { return products }
        return products.filter { $0.lowercased().contains(searchText.lowercased()) }
    }

    func loadProducts() {
        isLoading = true
        products = ["Widget", "Gadget", "Doohickey"]
        isLoading = false
    }
}

struct ProductView: View {
    @StateObject var viewModel = ProductViewModel()

    var body: some View {
        List(viewModel.filteredProducts, id: \\.self) { Text($0) }
            .searchable(text: $viewModel.searchText)
            .onAppear { viewModel.loadProducts() }
    }
}`,
      hints: ['Move @State properties and logic into a ViewModel class.', 'Use @Published instead of @State in the ViewModel.', 'The view uses @StateObject to own the ViewModel.'],
      concepts: ['mvvm-refactor', 'separation-of-concerns', 'state-object'],
    },
    {
      id: 'swift-mvvm-20',
      title: 'Refactor to Protocol-Oriented MVVM',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Refactor a concrete ViewModel dependency to use protocol abstraction.',
      skeleton: `class APIService {
    func fetchItems() async -> [String] {
        return ["Server Item 1", "Server Item 2"]
    }
}

class ItemViewModel: ObservableObject {
    @Published var items: [String] = []
    private let api = APIService()

    func load() async {
        items = await api.fetchItems()
    }
}

// Problem: Cannot test without hitting the real API
// Cannot swap implementations`,
      solution: `protocol ItemFetching {
    func fetchItems() async -> [String]
}

class APIService: ItemFetching {
    func fetchItems() async -> [String] {
        return ["Server Item 1", "Server Item 2"]
    }
}

class MockService: ItemFetching {
    var mockItems: [String] = ["Mock 1", "Mock 2"]
    func fetchItems() async -> [String] {
        return mockItems
    }
}

class ItemViewModel: ObservableObject {
    @Published var items: [String] = []
    private let service: ItemFetching

    init(service: ItemFetching = APIService()) {
        self.service = service
    }

    func load() async {
        items = await service.fetchItems()
    }
}`,
      hints: ['Extract a protocol from the concrete service.', 'Inject the protocol via init with a default value.', 'Create a mock conforming type for tests.'],
      concepts: ['protocol-abstraction', 'dependency-injection', 'testability'],
    },
  ],
};
