import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-exceptions',
  title: '21. Exceptions',
  explanation: `## Exceptions

Java uses exceptions for error handling with a robust type hierarchy.

### Exception Hierarchy
\`\`\`
Throwable
  |- Error (fatal, don't catch: OutOfMemoryError, StackOverflowError)
  |- Exception
       |- RuntimeException (unchecked: NPE, ArrayIndexOutOfBounds)
       |- IOException, SQLException (checked: must handle or declare)
\`\`\`

### Try-Catch-Finally
\`\`\`java
try {
    riskyOperation();
} catch (IOException | SQLException e) {
    handleError(e);
} finally {
    cleanup();
}
\`\`\`

### Try-with-Resources
\`\`\`java
try (var reader = new BufferedReader(new FileReader("file.txt"))) {
    return reader.readLine();
} // reader automatically closed
\`\`\`

### Custom Exceptions
\`\`\`java
class BusinessException extends Exception {
    public BusinessException(String message) { super(message); }
}
\`\`\`

### Best Practices
- Catch specific exceptions, not Exception
- Don't use exceptions for flow control
- Always close resources (try-with-resources)
- Include context in exception messages
`,
  exercises: [
    {
      id: 'java-exc-1',
      title: 'Basic try-catch',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Catch an ArithmeticException.',
      skeleton: `try {
    int result = 10 / 0;
} __BLANK__ (ArithmeticException e) {
    System.out.println("Cannot divide by zero");
}`,
      solution: `try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero");
}`,
      hints: ['The keyword for handling exceptions follows the try block.', 'It specifies the exception type and variable.', 'Use `catch`.'],
      concepts: ['try-catch', 'ArithmeticException', 'exception handling'],
    },
    {
      id: 'java-exc-2',
      title: 'Finally block',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Add a block that always executes.',
      skeleton: `try {
    openResource();
} catch (Exception e) {
    logError(e);
} __BLANK__ {
    closeResource();
}`,
      solution: `try {
    openResource();
} catch (Exception e) {
    logError(e);
} finally {
    closeResource();
}`,
      hints: ['There is a block that runs regardless of exceptions.', 'It executes after try and catch.', 'Use `finally`.'],
      concepts: ['finally', 'cleanup', 'guaranteed execution'],
    },
    {
      id: 'java-exc-3',
      title: 'Throw an exception',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Throw an IllegalArgumentException.',
      skeleton: `if (age < 0) {
    __BLANK__ new IllegalArgumentException("Age cannot be negative");
}`,
      solution: `if (age < 0) {
    throw new IllegalArgumentException("Age cannot be negative");
}`,
      hints: ['Use a keyword to signal an exception.', 'Create a new exception instance.', 'Use `throw`.'],
      concepts: ['throw', 'IllegalArgumentException', 'validation'],
    },
    {
      id: 'java-exc-4',
      title: 'Declare checked exception',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Declare that a method may throw a checked exception.',
      skeleton: `void readFile(String path) __BLANK__ IOException {
    // file reading code
}`,
      solution: `void readFile(String path) throws IOException {
    // file reading code
}`,
      hints: ['Checked exceptions must be declared in the method signature.', 'Use a keyword after the parameter list.', 'Use `throws`.'],
      concepts: ['throws', 'checked exception', 'method declaration'],
    },
    {
      id: 'java-exc-5',
      title: 'Multi-catch',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Catch multiple exception types in one catch block.',
      skeleton: `try {
    process();
} catch (IOException __BLANK__ SQLException e) {
    handleError(e);
}`,
      solution: `try {
    process();
} catch (IOException | SQLException e) {
    handleError(e);
}`,
      hints: ['Java 7 added multi-catch syntax.', 'Separate exception types with a symbol.', 'Use `|` (pipe).'],
      concepts: ['multi-catch', 'pipe operator', 'exception types'],
    },
    {
      id: 'java-exc-6',
      title: 'Try-with-resources',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Use try-with-resources to auto-close a reader.',
      skeleton: `__BLANK__ (BufferedReader reader = new BufferedReader(new FileReader("data.txt"))) {
    return reader.readLine();
}`,
      solution: `try (BufferedReader reader = new BufferedReader(new FileReader("data.txt"))) {
    return reader.readLine();
}`,
      hints: ['Resources are declared in parentheses after the keyword.', 'They must implement AutoCloseable.', 'Use `try`.'],
      concepts: ['try-with-resources', 'AutoCloseable', 'resource management'],
    },
    {
      id: 'java-exc-7',
      title: 'Custom checked exception',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a custom checked exception class called InsufficientFundsException with an amount field and a constructor.',
      skeleton: '',
      solution: `class InsufficientFundsException extends Exception {
    private final double amount;

    public InsufficientFundsException(double amount) {
        super("Insufficient funds: need " + amount);
        this.amount = amount;
    }

    public double getAmount() {
        return amount;
    }
}`,
      hints: ['Extend Exception for checked exceptions.', 'Call super(message) in the constructor.', 'Store the amount as a field with a getter.'],
      concepts: ['custom exception', 'checked exception', 'Exception class'],
    },
    {
      id: 'java-exc-8',
      title: 'Custom unchecked exception',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a custom unchecked exception called EntityNotFoundException that takes an id and entity type.',
      skeleton: '',
      solution: `class EntityNotFoundException extends RuntimeException {
    private final String entityType;
    private final long id;

    public EntityNotFoundException(String entityType, long id) {
        super(entityType + " with id " + id + " not found");
        this.entityType = entityType;
        this.id = id;
    }

    public String getEntityType() { return entityType; }
    public long getId() { return id; }
}`,
      hints: ['Extend RuntimeException for unchecked exceptions.', 'Include both entity type and id in the message.', 'Provide getters for the fields.'],
      concepts: ['RuntimeException', 'unchecked exception', 'custom exception'],
    },
    {
      id: 'java-exc-9',
      title: 'Exception chaining',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that catches a low-level exception and wraps it in a higher-level exception with the cause.',
      skeleton: '',
      solution: `void loadConfig(String path) throws ConfigException {
    try {
        // simulate file reading
        throw new java.io.IOException("file not found");
    } catch (java.io.IOException e) {
        throw new ConfigException("Failed to load config: " + path, e);
    }
}

class ConfigException extends Exception {
    public ConfigException(String message, Throwable cause) {
        super(message, cause);
    }
}`,
      hints: ['Catch the original exception.', 'Pass it as the cause to the new exception.', 'Use the constructor that takes (String, Throwable).'],
      concepts: ['exception chaining', 'cause', 'wrapping exceptions'],
    },
    {
      id: 'java-exc-10',
      title: 'Validation with exceptions',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method that validates an email string, throwing IllegalArgumentException if it does not contain @.',
      skeleton: '',
      solution: `static void validateEmail(String email) {
    if (email == null || email.isBlank()) {
        throw new IllegalArgumentException("Email cannot be null or blank");
    }
    if (!email.contains("@")) {
        throw new IllegalArgumentException("Email must contain @: " + email);
    }
}`,
      hints: ['Check for null/blank first.', 'Check for @ character using contains.', 'Throw IllegalArgumentException with a descriptive message.'],
      concepts: ['validation', 'IllegalArgumentException', 'guard clause'],
    },
    {
      id: 'java-exc-11',
      title: 'Retry with exception handling',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method that retries a Callable up to maxRetries times, catching Exception on each attempt.',
      skeleton: '',
      solution: `static <T> T retry(java.util.concurrent.Callable<T> task, int maxRetries) throws Exception {
    Exception lastException = null;
    for (int i = 0; i <= maxRetries; i++) {
        try {
            return task.call();
        } catch (Exception e) {
            lastException = e;
        }
    }
    throw lastException;
}`,
      hints: ['Loop up to maxRetries + 1 times (initial attempt + retries).', 'Catch Exception and save it.', 'If all attempts fail, throw the last exception.'],
      concepts: ['retry pattern', 'Callable', 'exception handling'],
    },
    {
      id: 'java-exc-12',
      title: 'AutoCloseable implementation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a class that implements AutoCloseable and tracks whether close() was called.',
      skeleton: '',
      solution: `class ManagedResource implements AutoCloseable {
    private boolean closed = false;

    public void doWork() {
        if (closed) throw new IllegalStateException("Resource is closed");
        System.out.println("Working...");
    }

    @Override
    public void close() {
        closed = true;
        System.out.println("Resource closed");
    }

    public boolean isClosed() {
        return closed;
    }
}`,
      hints: ['Implement the AutoCloseable interface.', 'Override the close() method.', 'Use a boolean flag to track closed state.'],
      concepts: ['AutoCloseable', 'resource management', 'try-with-resources'],
    },
    {
      id: 'java-exc-13',
      title: 'Swallowed exception',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the empty catch block that silently swallows exceptions.',
      skeleton: `try {
    int result = Integer.parseInt(input);
} catch (NumberFormatException e) {
    // silently ignored
}`,
      solution: `try {
    int result = Integer.parseInt(input);
} catch (NumberFormatException e) {
    System.err.println("Invalid number: " + input);
    throw new IllegalArgumentException("Invalid number format: " + input, e);
}`,
      hints: ['Empty catch blocks hide errors.', 'At minimum, log the exception.', 'Consider re-throwing as a different exception.'],
      concepts: ['exception swallowing', 'logging', 'best practices'],
    },
    {
      id: 'java-exc-14',
      title: 'Resource leak in exception path',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the resource leak when an exception occurs.',
      skeleton: `void processFile(String path) throws IOException {
    FileInputStream fis = new FileInputStream(path);
    // If this throws, fis is never closed
    process(fis);
    fis.close();
}`,
      solution: `void processFile(String path) throws IOException {
    try (FileInputStream fis = new FileInputStream(path)) {
        process(fis);
    }
}`,
      hints: ['If process() throws, close() is never called.', 'Use try-with-resources for automatic cleanup.', 'The resource is closed even if an exception occurs.'],
      concepts: ['resource leak', 'try-with-resources', 'AutoCloseable'],
    },
    {
      id: 'java-exc-15',
      title: 'Catching too broadly',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the overly broad exception catch that hides bugs.',
      skeleton: `try {
    String[] parts = line.split(",");
    int id = Integer.parseInt(parts[0]);
    String name = parts[1].trim();
} catch (Exception e) {
    System.out.println("Parse error");
}`,
      solution: `try {
    String[] parts = line.split(",");
    int id = Integer.parseInt(parts[0]);
    String name = parts[1].trim();
} catch (NumberFormatException e) {
    System.out.println("Invalid number format: " + e.getMessage());
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Missing fields in line: " + line);
}`,
      hints: ['Catching Exception is too broad; it hides specific errors.', 'Catch each expected exception type separately.', 'Provide specific error messages for each type.'],
      concepts: ['specific exceptions', 'exception handling', 'best practices'],
    },
    {
      id: 'java-exc-16',
      title: 'Predict finally execution',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output when finally runs after an exception.',
      skeleton: `try {
    System.out.println("A");
    throw new RuntimeException();
} catch (RuntimeException e) {
    System.out.println("B");
} finally {
    System.out.println("C");
}`,
      solution: `A
B
C`,
      hints: ['try block runs until the exception.', 'catch block handles the exception.', 'finally always runs after try and catch.'],
      concepts: ['finally', 'execution order', 'exception handling'],
    },
    {
      id: 'java-exc-17',
      title: 'Predict finally with return',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the return value when finally also has a return.',
      skeleton: `static int test() {
    try {
        return 1;
    } finally {
        return 2;
    }
}
System.out.println(test());`,
      solution: `2`,
      hints: ['finally runs even after a return in try.', 'A return in finally overrides the try return.', 'The method returns 2.'],
      concepts: ['finally return', 'override', 'control flow'],
    },
    {
      id: 'java-exc-18',
      title: 'Predict multi-catch',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict which catch block handles the exception.',
      skeleton: `try {
    Object obj = "hello";
    Integer num = (Integer) obj;
} catch (ClassCastException e) {
    System.out.println("cast error");
} catch (RuntimeException e) {
    System.out.println("runtime error");
}`,
      solution: `cast error`,
      hints: ['ClassCastException is thrown by the invalid cast.', 'The first matching catch block is selected.', 'ClassCastException is more specific than RuntimeException.'],
      concepts: ['catch ordering', 'ClassCastException', 'specificity'],
    },
    {
      id: 'java-exc-19',
      title: 'Refactor to try-with-resources',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this manual close pattern to try-with-resources.',
      skeleton: `BufferedReader reader = null;
try {
    reader = new BufferedReader(new FileReader("data.txt"));
    String line = reader.readLine();
    process(line);
} catch (IOException e) {
    handleError(e);
} finally {
    if (reader != null) {
        try { reader.close(); } catch (IOException e) { /* ignore */ }
    }
}`,
      solution: `try (BufferedReader reader = new BufferedReader(new FileReader("data.txt"))) {
    String line = reader.readLine();
    process(line);
} catch (IOException e) {
    handleError(e);
}`,
      hints: ['Try-with-resources handles close automatically.', 'Declare the resource in the try parentheses.', 'The finally block with manual close is no longer needed.'],
      concepts: ['try-with-resources', 'AutoCloseable', 'refactoring'],
    },
    {
      id: 'java-exc-20',
      title: 'Refactor exception handling pattern',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor these repeated try-catch blocks into a helper method.',
      skeleton: `int a;
try { a = Integer.parseInt(inputA); }
catch (NumberFormatException e) { a = 0; }

int b;
try { b = Integer.parseInt(inputB); }
catch (NumberFormatException e) { b = 0; }

int c;
try { c = Integer.parseInt(inputC); }
catch (NumberFormatException e) { c = 0; }`,
      solution: `static int parseOrDefault(String input, int defaultValue) {
    try {
        return Integer.parseInt(input);
    } catch (NumberFormatException e) {
        return defaultValue;
    }
}

int a = parseOrDefault(inputA, 0);
int b = parseOrDefault(inputB, 0);
int c = parseOrDefault(inputC, 0);`,
      hints: ['Extract the repeated pattern into a helper method.', 'The method takes the input string and a default value.', 'Each call site becomes a one-liner.'],
      concepts: ['DRY principle', 'helper method', 'refactoring'],
    },
  ],
};
