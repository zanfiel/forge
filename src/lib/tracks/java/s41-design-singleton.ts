import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-singleton',
  title: '41. Singleton Pattern',
  explanation: `## Singleton Pattern in Java

The **Singleton** pattern ensures a class has only one instance and provides a global access point to it. It is one of the most commonly used (and debated) design patterns.

### Eager Initialization

\`\`\`java
public class EagerSingleton {
    private static final EagerSingleton INSTANCE = new EagerSingleton();

    private EagerSingleton() {}

    public static EagerSingleton getInstance() {
        return INSTANCE;
    }
}
\`\`\`

The instance is created at class loading time. Simple and thread-safe, but wastes resources if never used.

### Lazy Initialization (Not Thread-Safe)

\`\`\`java
public class LazySingleton {
    private static LazySingleton instance;

    private LazySingleton() {}

    public static LazySingleton getInstance() {
        if (instance == null) {
            instance = new LazySingleton();
        }
        return instance;
    }
}
\`\`\`

### Double-Checked Locking

\`\`\`java
public class DCLSingleton {
    private static volatile DCLSingleton instance;

    private DCLSingleton() {}

    public static DCLSingleton getInstance() {
        if (instance == null) {
            synchronized (DCLSingleton.class) {
                if (instance == null) {
                    instance = new DCLSingleton();
                }
            }
        }
        return instance;
    }
}
\`\`\`

The \`volatile\` keyword prevents instruction reordering issues.

### Bill Pugh Holder (Recommended)

\`\`\`java
public class BillPughSingleton {
    private BillPughSingleton() {}

    private static class Holder {
        private static final BillPughSingleton INSTANCE = new BillPughSingleton();
    }

    public static BillPughSingleton getInstance() {
        return Holder.INSTANCE;
    }
}
\`\`\`

Lazy, thread-safe, no synchronization overhead. Leverages the JVM class loader guarantee.

### Enum Singleton (Safest)

\`\`\`java
public enum DatabaseConnection {
    INSTANCE;

    public void connect() {
        // ...
    }
}
\`\`\`

Automatically handles serialization and reflection attacks. Recommended by Joshua Bloch in Effective Java.`,
  exercises: [
    {
      id: 'java-singleton-1',
      title: 'Private Constructor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Make the constructor private to prevent external instantiation.',
      skeleton: `public class Config {
    private static final Config INSTANCE = new Config();

    __BLANK__ Config() {}

    public static Config getInstance() {
        return INSTANCE;
    }
}`,
      solution: `public class Config {
    private static final Config INSTANCE = new Config();

    private Config() {}

    public static Config getInstance() {
        return INSTANCE;
    }
}`,
      hints: [
        'The constructor must not be accessible from outside the class.',
        'The most restrictive access modifier prevents external access.',
        'Use the "private" access modifier.',
      ],
      concepts: ['private-constructor', 'encapsulation'],
    },
    {
      id: 'java-singleton-2',
      title: 'Eager Initialization Field',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare the singleton instance field with the correct modifiers for eager initialization.',
      skeleton: `public class Logger {
    __BLANK__ Logger INSTANCE = new Logger();

    private Logger() {}

    public static Logger getInstance() {
        return INSTANCE;
    }
}`,
      solution: `public class Logger {
    private static final Logger INSTANCE = new Logger();

    private Logger() {}

    public static Logger getInstance() {
        return INSTANCE;
    }
}`,
      hints: [
        'The field must be accessible from a static method, so it needs to be static.',
        'It should not be changed after initialization, making it final.',
        'It should be hidden from other classes, making it private.',
      ],
      concepts: ['eager-initialization', 'static-final'],
    },
    {
      id: 'java-singleton-3',
      title: 'Lazy Initialization Null Check',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Complete the lazy initialization null check.',
      skeleton: `public class Cache {
    private static Cache instance;

    private Cache() {}

    public static Cache getInstance() {
        if (__BLANK__) {
            instance = new Cache();
        }
        return instance;
    }
}`,
      solution: `public class Cache {
    private static Cache instance;

    private Cache() {}

    public static Cache getInstance() {
        if (instance == null) {
            instance = new Cache();
        }
        return instance;
    }
}`,
      hints: [
        'You need to check if the instance has been created yet.',
        'If the instance does not exist, it is null.',
        'Check: instance == null.',
      ],
      concepts: ['lazy-initialization', 'null-check'],
    },
    {
      id: 'java-singleton-4',
      title: 'Volatile Keyword in DCL',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Add the correct keyword to prevent instruction reordering in double-checked locking.',
      skeleton: `public class ConnectionPool {
    private static __BLANK__ ConnectionPool instance;

    private ConnectionPool() {}

    public static ConnectionPool getInstance() {
        if (instance == null) {
            synchronized (ConnectionPool.class) {
                if (instance == null) {
                    instance = new ConnectionPool();
                }
            }
        }
        return instance;
    }
}`,
      solution: `public class ConnectionPool {
    private static volatile ConnectionPool instance;

    private ConnectionPool() {}

    public static ConnectionPool getInstance() {
        if (instance == null) {
            synchronized (ConnectionPool.class) {
                if (instance == null) {
                    instance = new ConnectionPool();
                }
            }
        }
        return instance;
    }
}`,
      hints: [
        'Without this keyword, the JVM may reorder instructions causing partial construction.',
        'It ensures visibility of changes across threads.',
        'Use the "volatile" keyword.',
      ],
      concepts: ['volatile', 'double-checked-locking', 'thread-safety'],
    },
    {
      id: 'java-singleton-5',
      title: 'Enum Singleton Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare an enum singleton with a single constant.',
      skeleton: `public __BLANK__ AppConfig {
    INSTANCE;

    private String appName = "MyApp";

    public String getAppName() {
        return appName;
    }
}`,
      solution: `public enum AppConfig {
    INSTANCE;

    private String appName = "MyApp";

    public String getAppName() {
        return appName;
    }
}`,
      hints: [
        'The safest singleton in Java uses a special type with a fixed set of constants.',
        'This type is not a class -- it guarantees a single instance by design.',
        'Use "enum" instead of "class".',
      ],
      concepts: ['enum-singleton', 'serialization-safety'],
    },
    {
      id: 'java-singleton-6',
      title: 'Bill Pugh Holder Inner Class',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Complete the static inner holder class for the Bill Pugh singleton idiom.',
      skeleton: `public class Registry {
    private Registry() {}

    private static class __BLANK__ {
        private static final Registry INSTANCE = new Registry();
    }

    public static Registry getInstance() {
        return Holder.INSTANCE;
    }
}`,
      solution: `public class Registry {
    private Registry() {}

    private static class Holder {
        private static final Registry INSTANCE = new Registry();
    }

    public static Registry getInstance() {
        return Holder.INSTANCE;
    }
}`,
      hints: [
        'The inner class name must match what getInstance() references.',
        'Look at the return statement for the class name used.',
        'The inner class is called "Holder".',
      ],
      concepts: ['bill-pugh-singleton', 'inner-class', 'lazy-loading'],
    },
    {
      id: 'java-singleton-7',
      title: 'Write an Eager Singleton',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a complete eager-initialized singleton class called PrintSpooler.',
      skeleton: `// Write a complete eager singleton: PrintSpooler
// - private static final instance created at class loading
// - private constructor
// - public static getInstance() method
// - public void print(String doc) method (can be empty body)`,
      solution: `public class PrintSpooler {
    private static final PrintSpooler INSTANCE = new PrintSpooler();

    private PrintSpooler() {}

    public static PrintSpooler getInstance() {
        return INSTANCE;
    }

    public void print(String doc) {
        // print logic
    }
}`,
      hints: [
        'Declare a private static final field initialized with new PrintSpooler().',
        'Make the constructor private.',
        'getInstance() simply returns the INSTANCE field.',
      ],
      concepts: ['eager-initialization', 'singleton-structure'],
    },
    {
      id: 'java-singleton-8',
      title: 'Write a Double-Checked Locking Singleton',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a complete thread-safe singleton using double-checked locking for a class called ThreadPool.',
      skeleton: `// Write a complete DCL singleton: ThreadPool
// - volatile static field
// - private constructor
// - synchronized block inside getInstance with double null check`,
      solution: `public class ThreadPool {
    private static volatile ThreadPool instance;

    private ThreadPool() {}

    public static ThreadPool getInstance() {
        if (instance == null) {
            synchronized (ThreadPool.class) {
                if (instance == null) {
                    instance = new ThreadPool();
                }
            }
        }
        return instance;
    }
}`,
      hints: [
        'The field must be volatile to prevent reordering.',
        'First check is outside synchronized (fast path), second is inside.',
        'Synchronize on the class object: synchronized (ThreadPool.class).',
      ],
      concepts: ['double-checked-locking', 'volatile', 'synchronized'],
    },
    {
      id: 'java-singleton-9',
      title: 'Write a Bill Pugh Singleton',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a complete Bill Pugh singleton for a class called EventBus.',
      skeleton: `// Write a complete Bill Pugh singleton: EventBus
// - private constructor
// - private static inner class Holder with the INSTANCE
// - public static getInstance() returning Holder.INSTANCE`,
      solution: `public class EventBus {
    private EventBus() {}

    private static class Holder {
        private static final EventBus INSTANCE = new EventBus();
    }

    public static EventBus getInstance() {
        return Holder.INSTANCE;
    }
}`,
      hints: [
        'The Holder class is a private static inner class.',
        'It contains one field: private static final EventBus INSTANCE.',
        'getInstance() delegates to Holder.INSTANCE.',
      ],
      concepts: ['bill-pugh-singleton', 'lazy-initialization'],
    },
    {
      id: 'java-singleton-10',
      title: 'Write an Enum Singleton',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write an enum singleton called DatabaseManager with a getConnection() method that returns a String.',
      skeleton: `// Write an enum singleton: DatabaseManager
// - Single INSTANCE constant
// - private String url field initialized to "jdbc:mysql://localhost/db"
// - public String getConnection() that returns url`,
      solution: `public enum DatabaseManager {
    INSTANCE;

    private String url = "jdbc:mysql://localhost/db";

    public String getConnection() {
        return url;
    }
}`,
      hints: [
        'Use "enum" keyword and declare INSTANCE as the sole constant.',
        'Enum constants are listed first, then fields and methods.',
        'The enum can have fields and methods just like a class.',
      ],
      concepts: ['enum-singleton', 'effective-java'],
    },
    {
      id: 'java-singleton-11',
      title: 'Write Singleton with Reset for Testing',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a lazy singleton with a package-private reset method for unit testing.',
      skeleton: `// Write: ConfigManager singleton
// - lazy initialization (not thread-safe is fine here)
// - private constructor
// - getInstance()
// - Package-private static resetInstance() that sets instance to null (for tests)`,
      solution: `public class ConfigManager {
    private static ConfigManager instance;

    private ConfigManager() {}

    public static ConfigManager getInstance() {
        if (instance == null) {
            instance = new ConfigManager();
        }
        return instance;
    }

    static void resetInstance() {
        instance = null;
    }
}`,
      hints: [
        'Package-private means no access modifier (default access).',
        'resetInstance() sets the static field back to null.',
        'This allows tests in the same package to reset state between tests.',
      ],
      concepts: ['testability', 'singleton-reset', 'package-private'],
    },
    {
      id: 'java-singleton-12',
      title: 'Write Singleton with Initialization Parameters',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a singleton that requires initialization parameters (host and port) passed once via an init method.',
      skeleton: `// Write: ServerConfig singleton
// - Fields: String host, int port
// - public static void init(String host, int port) - creates instance (throws if already initialized)
// - public static ServerConfig getInstance() - returns instance (throws if not initialized)
// - Getters for host and port`,
      solution: `public class ServerConfig {
    private static ServerConfig instance;
    private final String host;
    private final int port;

    private ServerConfig(String host, int port) {
        this.host = host;
        this.port = port;
    }

    public static synchronized void init(String host, int port) {
        if (instance != null) {
            throw new IllegalStateException("Already initialized");
        }
        instance = new ServerConfig(host, port);
    }

    public static ServerConfig getInstance() {
        if (instance == null) {
            throw new IllegalStateException("Not initialized. Call init() first.");
        }
        return instance;
    }

    public String getHost() {
        return host;
    }

    public int getPort() {
        return port;
    }
}`,
      hints: [
        'The constructor takes host and port but is private.',
        'init() checks if instance already exists and throws if so.',
        'getInstance() checks if instance is null and throws if so.',
      ],
      concepts: ['parameterized-singleton', 'initialization-guard'],
    },
    {
      id: 'java-singleton-13',
      title: 'Fix Non-Private Constructor',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'The singleton constructor is public, allowing multiple instances. Fix it.',
      skeleton: `public class AudioPlayer {
    private static final AudioPlayer INSTANCE = new AudioPlayer();

    public AudioPlayer() {}

    public static AudioPlayer getInstance() {
        return INSTANCE;
    }

    public void play(String track) {
        System.out.println("Playing: " + track);
    }
}
// Bug: new AudioPlayer() works from outside -- not a true singleton`,
      solution: `public class AudioPlayer {
    private static final AudioPlayer INSTANCE = new AudioPlayer();

    private AudioPlayer() {}

    public static AudioPlayer getInstance() {
        return INSTANCE;
    }

    public void play(String track) {
        System.out.println("Playing: " + track);
    }
}`,
      hints: [
        'The constructor allows anyone to create new instances.',
        'Singletons must prevent external construction.',
        'Change "public AudioPlayer()" to "private AudioPlayer()".',
      ],
      concepts: ['private-constructor', 'singleton-enforcement'],
    },
    {
      id: 'java-singleton-14',
      title: 'Fix Missing Volatile in DCL',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'The DCL singleton is missing volatile, causing potential partial construction visibility. Fix it.',
      skeleton: `public class CacheManager {
    private static CacheManager instance;

    private CacheManager() {}

    public static CacheManager getInstance() {
        if (instance == null) {
            synchronized (CacheManager.class) {
                if (instance == null) {
                    instance = new CacheManager();
                }
            }
        }
        return instance;
    }
}
// Bug: Without volatile, another thread may see a partially constructed object`,
      solution: `public class CacheManager {
    private static volatile CacheManager instance;

    private CacheManager() {}

    public static CacheManager getInstance() {
        if (instance == null) {
            synchronized (CacheManager.class) {
                if (instance == null) {
                    instance = new CacheManager();
                }
            }
        }
        return instance;
    }
}`,
      hints: [
        'The JVM may reorder the write to the field and the constructor.',
        'A keyword on the field prevents this reordering issue.',
        'Add "volatile" to the instance field declaration.',
      ],
      concepts: ['volatile', 'memory-visibility', 'thread-safety'],
    },
    {
      id: 'java-singleton-15',
      title: 'Fix Broken Lazy Init (Race Condition)',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Two threads can both pass the null check and create separate instances. Make getInstance synchronized to fix the race.',
      skeleton: `public class TaskScheduler {
    private static TaskScheduler instance;

    private TaskScheduler() {}

    public static TaskScheduler getInstance() {
        if (instance == null) {
            instance = new TaskScheduler(); // race condition!
        }
        return instance;
    }
}`,
      solution: `public class TaskScheduler {
    private static TaskScheduler instance;

    private TaskScheduler() {}

    public static synchronized TaskScheduler getInstance() {
        if (instance == null) {
            instance = new TaskScheduler();
        }
        return instance;
    }
}`,
      hints: [
        'Multiple threads could enter the if-block simultaneously.',
        'Synchronizing the method prevents concurrent access.',
        'Add "synchronized" to the getInstance method signature.',
      ],
      concepts: ['synchronized', 'race-condition', 'thread-safety'],
    },
    {
      id: 'java-singleton-16',
      title: 'Predict Eager Singleton Behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict whether two getInstance() calls return the same reference.',
      skeleton: `public class Config {
    private static final Config INSTANCE = new Config();
    private Config() {}
    public static Config getInstance() { return INSTANCE; }
}

Config a = Config.getInstance();
Config b = Config.getInstance();
System.out.println(a == b);
// What is printed?`,
      solution: `true`,
      hints: [
        'Both calls return the same static final field.',
        'The == operator checks reference equality.',
        'Since there is only one instance, a and b are the same object.',
      ],
      concepts: ['reference-equality', 'singleton-identity'],
    },
    {
      id: 'java-singleton-17',
      title: 'Predict Enum Singleton Usage',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output of using an enum singleton.',
      skeleton: `public enum Counter {
    INSTANCE;
    private int count = 0;
    public void increment() { count++; }
    public int getCount() { return count; }
}

Counter.INSTANCE.increment();
Counter.INSTANCE.increment();
Counter.INSTANCE.increment();
System.out.println(Counter.INSTANCE.getCount());
// What is printed?`,
      solution: `3`,
      hints: [
        'INSTANCE is a single enum constant -- one object for the entire program.',
        'All three increment() calls operate on the same count field.',
        'After three increments from 0, the count is 3.',
      ],
      concepts: ['enum-singleton', 'mutable-state'],
    },
    {
      id: 'java-singleton-18',
      title: 'Predict Lazy Init Thread Issue',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'java',
      goal: 'How many instances could theoretically be created by this non-thread-safe singleton under heavy concurrency?',
      skeleton: `public class BadSingleton {
    private static BadSingleton instance;
    private BadSingleton() { System.out.println("Created"); }
    public static BadSingleton getInstance() {
        if (instance == null) {
            instance = new BadSingleton();
        }
        return instance;
    }
}
// If 100 threads call getInstance() simultaneously, what is the
// maximum number of times "Created" could be printed?
// Answer: 1, 2, or 100?`,
      solution: `100`,
      hints: [
        'Without synchronization, all threads can pass the null check simultaneously.',
        'Each thread that enters the if-block creates a new instance.',
        'In the worst case, all 100 threads could create separate instances.',
      ],
      concepts: ['race-condition', 'thread-safety', 'lazy-init-pitfall'],
    },
    {
      id: 'java-singleton-19',
      title: 'Refactor Lazy to Bill Pugh',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor a synchronized lazy singleton to use the Bill Pugh holder idiom for better performance.',
      skeleton: `public class AppContext {
    private static AppContext instance;

    private AppContext() {}

    public static synchronized AppContext getInstance() {
        if (instance == null) {
            instance = new AppContext();
        }
        return instance;
    }
}
// Problem: synchronized on every call is slow. Refactor to Bill Pugh.`,
      solution: `public class AppContext {
    private AppContext() {}

    private static class Holder {
        private static final AppContext INSTANCE = new AppContext();
    }

    public static AppContext getInstance() {
        return Holder.INSTANCE;
    }
}`,
      hints: [
        'Remove the static field and the synchronized keyword.',
        'Create a private static inner class Holder with the INSTANCE.',
        'getInstance() returns Holder.INSTANCE -- lazy, thread-safe, no sync cost.',
      ],
      concepts: ['bill-pugh-singleton', 'performance-optimization'],
    },
    {
      id: 'java-singleton-20',
      title: 'Refactor Class Singleton to Enum',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor a class-based singleton to an enum singleton for serialization and reflection safety.',
      skeleton: `public class Settings {
    private static final Settings INSTANCE = new Settings();

    private String theme = "dark";
    private int fontSize = 14;

    private Settings() {}

    public static Settings getInstance() {
        return INSTANCE;
    }

    public String getTheme() { return theme; }
    public void setTheme(String theme) { this.theme = theme; }
    public int getFontSize() { return fontSize; }
    public void setFontSize(int size) { this.fontSize = size; }
}
// Refactor to enum singleton`,
      solution: `public enum Settings {
    INSTANCE;

    private String theme = "dark";
    private int fontSize = 14;

    public String getTheme() { return theme; }
    public void setTheme(String theme) { this.theme = theme; }
    public int getFontSize() { return fontSize; }
    public void setFontSize(int size) { this.fontSize = size; }
}`,
      hints: [
        'Replace "class" with "enum" and remove the constructor and getInstance().',
        'Declare INSTANCE as the sole enum constant.',
        'Keep all fields and methods -- enums support them.',
      ],
      concepts: ['enum-singleton', 'serialization-safety', 'refactoring'],
    },
  ],
};
