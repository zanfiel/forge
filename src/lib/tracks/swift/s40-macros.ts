import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-macros',
  title: '40. Macros',
  explanation: `## Macros in Swift

Swift macros (introduced in Swift 5.9) generate code at compile time, reducing boilerplate and enabling powerful metaprogramming.

### Freestanding Macros

Freestanding macros start with \`#\` and expand into code:

\`\`\`swift
let (a, b) = #stringify(1 + 2)
// a = 3, b = "1 + 2"
\`\`\`

### Attached Macros

Attached macros use \`@\` and attach to declarations:

\`\`\`swift
@Observable
class Model {
    var name: String = ""
    var count: Int = 0
}
\`\`\`

### Built-in Macros

- \`#warning("message")\` - compile-time warning
- \`#error("message")\` - compile-time error
- \`#file\`, \`#line\`, \`#function\` - source location
- \`#available(iOS 17, *)\` - availability check
- \`#selector\` - Objective-C selector

### Compiler Directives

\`\`\`swift
#if DEBUG
    print("Debug mode")
#elseif os(iOS)
    print("iOS")
#else
    print("Other")
#endif
\`\`\`

### Macro Roles

- **@freestanding(expression)**: produces a value
- **@freestanding(declaration)**: declares new code
- **@attached(member)**: adds members to a type
- **@attached(peer)**: adds declarations alongside
- **@attached(accessor)**: adds get/set to properties
- **@attached(conformance)**: adds protocol conformance
`,
  exercises: [
    {
      id: 'swift-macros-1',
      title: 'Compiler Warning',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Add a compile-time warning.',
      skeleton: `func oldAPI() -> String {
    ___("This function is deprecated, use newAPI() instead")
    return "old result"
}`,
      solution: `func oldAPI() -> String {
    #warning("This function is deprecated, use newAPI() instead")
    return "old result"
}`,
      hints: [
        'Swift has a built-in macro for compile-time warnings.',
        'It starts with # and takes a string message.',
        'The answer is #warning.',
      ],
      concepts: ['warning-macro', 'compile-time'],
    },
    {
      id: 'swift-macros-2',
      title: 'Compile-Time Error',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Add a compile-time error for unimplemented code.',
      skeleton: `func criticalFeature() -> Never {
    ___("Not yet implemented - must be done before release")
}`,
      solution: `func criticalFeature() -> Never {
    #error("Not yet implemented - must be done before release")
}`,
      hints: [
        'This macro prevents compilation until the code is implemented.',
        'It starts with # and takes a string message.',
        'The answer is #error.',
      ],
      concepts: ['error-macro', 'compile-time'],
    },
    {
      id: 'swift-macros-3',
      title: 'Source Location Macros',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use source location macros for debugging.',
      skeleton: `func log(_ message: String, file: String = ___, line: Int = ___, function: String = ___) {
    print("[\\(file):\\(line)] \\(function): \\(message)")
}`,
      solution: `func log(_ message: String, file: String = #file, line: Int = #line, function: String = #function) {
    print("[\\(file):\\(line)] \\(function): \\(message)")
}`,
      hints: [
        '#file gives the current file path.',
        '#line gives the current line number.',
        '#function gives the current function name.',
      ],
      concepts: ['source-location', 'file-line-function'],
    },
    {
      id: 'swift-macros-4',
      title: 'Conditional Compilation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use conditional compilation for debug-only code.',
      skeleton: `func performWork() {
    ___ DEBUG
        print("Starting work in debug mode")
    ___
        print("Starting work")
    ___
}`,
      solution: `func performWork() {
    #if DEBUG
        print("Starting work in debug mode")
    #else
        print("Starting work")
    #endif
}`,
      hints: [
        'Conditional compilation uses # directives.',
        '#if, #else, #endif are the key directives.',
        'DEBUG is a common compilation condition.',
      ],
      concepts: ['conditional-compilation', 'debug'],
    },
    {
      id: 'swift-macros-5',
      title: 'Platform Conditional',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use conditional compilation for platform-specific code.',
      skeleton: `func platformName() -> String {
    #if ___(iOS)
        return "iOS"
    #elseif os(macOS)
        return "macOS"
    #elseif os(Linux)
        return "Linux"
    #else
        return "Unknown"
    #endif
}`,
      solution: `func platformName() -> String {
    #if os(iOS)
        return "iOS"
    #elseif os(macOS)
        return "macOS"
    #elseif os(Linux)
        return "Linux"
    #else
        return "Unknown"
    #endif
}`,
      hints: [
        'The os() function checks the target platform.',
        'Use it inside #if directives.',
        'The answer is os.',
      ],
      concepts: ['platform-conditional', 'os-check'],
    },
    {
      id: 'swift-macros-6',
      title: 'Availability Check',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use availability checking for API version gating.',
      skeleton: `func doWork() {
    if ___(iOS 17, macOS 14, *) {
        // Use new API
        print("New API")
    } else {
        // Fallback
        print("Old API")
    }
}`,
      solution: `func doWork() {
    if #available(iOS 17, macOS 14, *) {
        // Use new API
        print("New API")
    } else {
        // Fallback
        print("Old API")
    }
}`,
      hints: [
        'Availability checking uses a special macro.',
        'It checks if the runtime OS version meets requirements.',
        'The answer is #available.',
      ],
      concepts: ['availability', 'api-versioning'],
    },
    {
      id: 'swift-macros-7',
      title: 'Write a Debug-Only Logger',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a logging function that only works in debug builds.',
      skeleton: `// Write a function debugLog that:
// - takes a message: String, file/line/function defaults
// - only prints in DEBUG builds using #if
// - includes file, line, and function in the output
`,
      solution: `func debugLog(_ message: String, file: String = #file, line: Int = #line, function: String = #function) {
    #if DEBUG
    let filename = (file as NSString).lastPathComponent
    print("[\\(filename):\\(line)] \\(function) - \\(message)")
    #endif
}`,
      hints: [
        'Wrap the print in #if DEBUG / #endif.',
        'Use default parameter values with source location macros.',
        'Extract just the filename from the full path.',
      ],
      concepts: ['conditional-compilation', 'debug-logging'],
    },
    {
      id: 'swift-macros-8',
      title: 'Write a Platform Abstraction',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function with platform-specific implementations.',
      skeleton: `// Write a function getDocumentsPath() -> String that returns:
// - "~/Documents" on macOS
// - "/var/mobile/Documents" on iOS
// - "/home/user/Documents" on Linux
// Use #if os() for platform branching
`,
      solution: `func getDocumentsPath() -> String {
    #if os(macOS)
    return "~/Documents"
    #elseif os(iOS)
    return "/var/mobile/Documents"
    #elseif os(Linux)
    return "/home/user/Documents"
    #else
    return "./Documents"
    #endif
}`,
      hints: [
        'Use #if os(platform) for each platform.',
        'Each branch returns a different path.',
        'Include a default #else for unknown platforms.',
      ],
      concepts: ['platform-conditional', 'cross-platform'],
    },
    {
      id: 'swift-macros-9',
      title: 'Write a Feature Flag System',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a feature flag system using compiler flags.',
      skeleton: `// Write a struct FeatureFlags with static computed properties:
// - isNewUIEnabled: Bool (true if FEATURE_NEW_UI is defined)
// - isAnalyticsEnabled: Bool (true if FEATURE_ANALYTICS is defined)
// - isBetaUser: Bool (true if BETA is defined)
// Use #if and compiler flags
`,
      solution: `struct FeatureFlags {
    static var isNewUIEnabled: Bool {
        #if FEATURE_NEW_UI
        return true
        #else
        return false
        #endif
    }

    static var isAnalyticsEnabled: Bool {
        #if FEATURE_ANALYTICS
        return true
        #else
        return false
        #endif
    }

    static var isBetaUser: Bool {
        #if BETA
        return true
        #else
        return false
        #endif
    }
}`,
      hints: [
        'Each flag checks a custom compilation condition.',
        'Return true when the flag is defined, false otherwise.',
        'Pass flags with -D FLAG_NAME during compilation.',
      ],
      concepts: ['feature-flags', 'compilation-conditions'],
    },
    {
      id: 'swift-macros-10',
      title: 'Write an Assert with Location',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a custom assert that includes source location.',
      skeleton: `// Write a function myAssert that:
// - takes a Bool condition (autoclosure)
// - takes a message String (autoclosure)
// - takes file, line, function defaults
// - Only active in DEBUG builds
// - Prints location and message on failure
`,
      solution: `func myAssert(
    _ condition: @autoclosure () -> Bool,
    _ message: @autoclosure () -> String = "Assertion failed",
    file: String = #file,
    line: Int = #line,
    function: String = #function
) {
    #if DEBUG
    if !condition() {
        let filename = (file as NSString).lastPathComponent
        print("ASSERTION FAILED: \\(message()) at \\(filename):\\(line) in \\(function)")
    }
    #endif
}`,
      hints: [
        'Use @autoclosure to defer evaluation.',
        'Wrap in #if DEBUG for release performance.',
        'Include file, line, function in the failure message.',
      ],
      concepts: ['autoclosure', 'debug-assertion', 'source-location'],
    },
    {
      id: 'swift-macros-11',
      title: 'Write a Measurement Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a debug-only timing measurement function.',
      skeleton: `// Write a function measure<T>(label:block:) that:
// - takes a label String and a () -> T closure
// - in DEBUG: prints execution time and returns result
// - in RELEASE: just returns the result with no overhead
`,
      solution: `func measure<T>(label: String, block: () -> T) -> T {
    #if DEBUG
    let start = CFAbsoluteTimeGetCurrent()
    let result = block()
    let elapsed = CFAbsoluteTimeGetCurrent() - start
    print("[\\(label)] \\(elapsed * 1000)ms")
    return result
    #else
    return block()
    #endif
}`,
      hints: [
        'Use CFAbsoluteTimeGetCurrent for timing.',
        'Only measure in DEBUG builds.',
        'Return the block result in both paths.',
      ],
      concepts: ['performance-measurement', 'conditional-compilation'],
    },
    {
      id: 'swift-macros-12',
      title: 'Write an Architecture Check',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a function that returns architecture-specific information.',
      skeleton: `// Write a function archInfo() -> String that returns:
// - "ARM64" on arm64
// - "x86_64" on x86_64
// - "ARM" on arm
// - "Unknown" otherwise
// Use #if arch()
`,
      solution: `func archInfo() -> String {
    #if arch(arm64)
    return "ARM64"
    #elseif arch(x86_64)
    return "x86_64"
    #elseif arch(arm)
    return "ARM"
    #else
    return "Unknown"
    #endif
}`,
      hints: [
        'Use #if arch() to check CPU architecture.',
        'Common architectures: arm64, x86_64, arm.',
        'Include a default else case.',
      ],
      concepts: ['architecture-conditional', 'cross-platform'],
    },
    {
      id: 'swift-macros-13',
      title: 'Fix Missing #endif',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the conditional compilation block that is missing #endif.',
      skeleton: `func setup() {
    #if DEBUG
    print("Debug setup")
    enableLogging()
    #else
    print("Release setup")
}`,
      solution: `func setup() {
    #if DEBUG
    print("Debug setup")
    enableLogging()
    #else
    print("Release setup")
    #endif
}`,
      hints: [
        'Every #if block must end with #endif.',
        'The closing directive is missing.',
        'Add #endif at the end of the block.',
      ],
      concepts: ['conditional-compilation', 'endif'],
    },
    {
      id: 'swift-macros-14',
      title: 'Fix Incorrect Availability Check',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the availability check that uses the wrong syntax.',
      skeleton: `@available(iOS 15, *)
func newFeature() {
    print("New feature")
}

func useFeature() {
    if #available(iOS 15) {
        newFeature()
    }
}`,
      solution: `@available(iOS 15, *)
func newFeature() {
    print("New feature")
}

func useFeature() {
    if #available(iOS 15, *) {
        newFeature()
    }
}`,
      hints: [
        '#available requires * as the last argument.',
        'The wildcard * means all other platforms.',
        'Add * after iOS 15.',
      ],
      concepts: ['availability', 'wildcard-platform'],
    },
    {
      id: 'swift-macros-15',
      title: 'Fix Macro in Wrong Context',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the code that uses a runtime check where compilation check is needed.',
      skeleton: `import Foundation

func loadConfig() -> [String: Any] {
    let isDebug = ProcessInfo.processInfo.environment["DEBUG"] != nil
    if isDebug {
        return ["logLevel": "verbose", "apiURL": "http://localhost"]
    } else {
        return ["logLevel": "error", "apiURL": "https://api.prod.com"]
    }
}`,
      solution: `func loadConfig() -> [String: Any] {
    #if DEBUG
    return ["logLevel": "verbose", "apiURL": "http://localhost"]
    #else
    return ["logLevel": "error", "apiURL": "https://api.prod.com"]
    #endif
}`,
      hints: [
        'Environment variable check happens at runtime.',
        'Use #if DEBUG for compile-time build configuration.',
        'This ensures release builds never contain debug URLs.',
      ],
      concepts: ['compile-time-vs-runtime', 'security'],
    },
    {
      id: 'swift-macros-16',
      title: 'Predict Source Location Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict which source location macro returns what type.',
      skeleton: `// What type does each macro return?
// #file -> ???
// #line -> ???
// #function -> ???
// Print: "String,Int,String" or "Int,String,Int" etc.`,
      solution: `String,Int,String`,
      hints: [
        '#file returns the file path as a String.',
        '#line returns the line number as an Int.',
        '#function returns the function name as a String.',
      ],
      concepts: ['source-location', 'macro-types'],
    },
    {
      id: 'swift-macros-17',
      title: 'Predict Conditional Compilation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict which code path executes.',
      skeleton: `// Compiled with: -D FEATURE_A
var result = ""
#if FEATURE_A
result += "A"
#endif
#if FEATURE_B
result += "B"
#endif
#if FEATURE_A && !FEATURE_B
result += "C"
#endif
print(result)`,
      solution: `AC`,
      hints: [
        'FEATURE_A is defined, FEATURE_B is not.',
        'First block: A is added.',
        'Second block: skipped. Third block: A && !B is true, C is added.',
      ],
      concepts: ['conditional-compilation', 'boolean-conditions'],
    },
    {
      id: 'swift-macros-18',
      title: 'Predict Available Check',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict availability check behavior.',
      skeleton: `// On iOS 16 device:
if #available(iOS 17, *) {
    print("new")
} else {
    print("old")
}

if #available(iOS 15, *) {
    print("recent")
} else {
    print("ancient")
}`,
      solution: `old
recent`,
      hints: [
        'iOS 16 < iOS 17, so first check fails.',
        'iOS 16 >= iOS 15, so second check passes.',
        'Output: old, then recent.',
      ],
      concepts: ['availability', 'runtime-check'],
    },
    {
      id: 'swift-macros-19',
      title: 'Refactor Runtime Checks to Compile-Time',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor runtime configuration checks to compile-time.',
      skeleton: `struct AppConfig {
    static let isTestMode = false
    static let enableDetailedLogs = false
    static let apiEndpoint = isTestMode ? "http://test.api.com" : "https://api.com"
}

func log(_ message: String) {
    if AppConfig.enableDetailedLogs {
        print("[DETAIL] \\(message)")
    }
}`,
      solution: `enum AppConfig {
    #if TESTING
    static let apiEndpoint = "http://test.api.com"
    #else
    static let apiEndpoint = "https://api.com"
    #endif
}

func log(_ message: String) {
    #if DETAILED_LOGS
    print("[DETAIL] \\(message)")
    #endif
}`,
      hints: [
        'Runtime bools cannot be optimized away by the compiler.',
        '#if directives completely exclude code from the binary.',
        'Use compilation flags for build configurations.',
      ],
      concepts: ['compile-time-configuration', 'dead-code-elimination'],
    },
    {
      id: 'swift-macros-20',
      title: 'Refactor Selector String to #selector',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor string-based selectors to type-safe #selector.',
      skeleton: `import Foundation

class ViewController: NSObject {
    @objc func handleTap() {
        print("Tapped")
    }

    @objc func handleSwipe() {
        print("Swiped")
    }

    func setupGestures() {
        let tapSelector = NSSelectorFromString("handleTap")
        let swipeSelector = NSSelectorFromString("handleSwipe")
        print(tapSelector)
        print(swipeSelector)
    }
}`,
      solution: `import Foundation

class ViewController: NSObject {
    @objc func handleTap() {
        print("Tapped")
    }

    @objc func handleSwipe() {
        print("Swiped")
    }

    func setupGestures() {
        let tapSelector = #selector(handleTap)
        let swipeSelector = #selector(handleSwipe)
        print(tapSelector)
        print(swipeSelector)
    }
}`,
      hints: [
        'NSSelectorFromString is not type-safe.',
        '#selector validates the method exists at compile time.',
        'Replace NSSelectorFromString with #selector.',
      ],
      concepts: ['selector', 'type-safety', 'compile-time-validation'],
    },
  ],
};
