import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-singleton',
  title: '31. Singleton',
  explanation: `## Singleton Pattern in PHP

The Singleton pattern ensures a class has only one instance and provides a global point of access to it. It uses a private constructor and a static method to control instantiation.

### Basic Singleton
\`\`\`php
<?php
class Database {
    private static ?Database \\\$instance = null;

    private function __construct(
        private string \\\$dsn
    ) {}

    public static function getInstance(): self {
        if (self::\\\$instance === null) {
            self::\\\$instance = new self('mysql:host=localhost;dbname=app');
        }
        return self::\\\$instance;
    }

    // Prevent cloning
    private function __clone() {}

    // Prevent unserialization
    public function __wakeup() {
        throw new \\RuntimeException('Cannot unserialize singleton');
    }
}

\\\$db = Database::getInstance();
\`\`\`

### Registry Pattern
\`\`\`php
<?php
class ServiceRegistry {
    private static array \\\$services = [];

    public static function set(string \\\$key, object \\\$service): void {
        self::\\\$services[\\\$key] = \\\$service;
    }

    public static function get(string \\\$key): object {
        if (!isset(self::\\\$services[\\\$key])) {
            throw new RuntimeException("Service '\\\$key' not found");
        }
        return self::\\\$services[\\\$key];
    }
}
\`\`\`

### Thread Safety Concerns
In PHP-FPM (typical web), each request runs in its own process, so singletons are request-scoped. In long-running processes (Swoole, RoadRunner), shared state requires careful management with mutexes or atomic operations.`,
  exercises: [
    {
      id: 'php-singleton-1',
      title: 'Private Constructor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to prevent direct instantiation of the singleton.',
      skeleton: `<?php
class Config {
    private static ?Config \\\$instance = null;

    ___ function __construct() {}

    public static function getInstance(): self {
        if (self::\\\$instance === null) {
            self::\\\$instance = new self();
        }
        return self::\\\$instance;
    }
}`,
      solution: `<?php
class Config {
    private static ?Config \\\$instance = null;

    private function __construct() {}

    public static function getInstance(): self {
        if (self::\\\$instance === null) {
            self::\\\$instance = new self();
        }
        return self::\\\$instance;
    }
}`,
      hints: [
        'The constructor must not be callable from outside',
        'Use an access modifier that restricts to the class only',
        'Make the constructor private',
      ],
      concepts: ['singleton', 'private-constructor'],
    },
    {
      id: 'php-singleton-2',
      title: 'Static Instance Check',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to check if the singleton instance already exists.',
      skeleton: `<?php
class Logger {
    private static ?Logger \\\$instance = null;

    private function __construct() {}

    public static function getInstance(): self {
        if (self::___ === null) {
            self::\\\$instance = new self();
        }
        return self::\\\$instance;
    }
}`,
      solution: `<?php
class Logger {
    private static ?Logger \\\$instance = null;

    private function __construct() {}

    public static function getInstance(): self {
        if (self::\\\$instance === null) {
            self::\\\$instance = new self();
        }
        return self::\\\$instance;
    }
}`,
      hints: [
        'Access static properties with self:: or static::',
        'The property is named \$instance',
        'Use self::\$instance',
      ],
      concepts: ['singleton', 'static-property'],
    },
    {
      id: 'php-singleton-3',
      title: 'Prevent Cloning',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to prevent cloning the singleton instance.',
      skeleton: `<?php
class Cache {
    private static ?Cache \\\$instance = null;

    private function __construct() {}

    ___ function __clone() {}

    public static function getInstance(): self {
        if (self::\\\$instance === null) {
            self::\\\$instance = new self();
        }
        return self::\\\$instance;
    }
}`,
      solution: `<?php
class Cache {
    private static ?Cache \\\$instance = null;

    private function __construct() {}

    private function __clone() {}

    public static function getInstance(): self {
        if (self::\\\$instance === null) {
            self::\\\$instance = new self();
        }
        return self::\\\$instance;
    }
}`,
      hints: [
        '__clone is called when clone keyword is used',
        'Making it private prevents cloning from outside',
        'Use the private access modifier',
      ],
      concepts: ['singleton', 'clone-prevention'],
    },
    {
      id: 'php-singleton-4',
      title: 'Nullable Static Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the correct type declaration for the nullable static instance property.',
      skeleton: `<?php
class EventBus {
    private static ___ \\\$instance = null;

    private function __construct() {}

    public static function getInstance(): self {
        if (self::\\\$instance === null) {
            self::\\\$instance = new self();
        }
        return self::\\\$instance;
    }
}`,
      solution: `<?php
class EventBus {
    private static ?EventBus \\\$instance = null;

    private function __construct() {}

    public static function getInstance(): self {
        if (self::\\\$instance === null) {
            self::\\\$instance = new self();
        }
        return self::\\\$instance;
    }
}`,
      hints: [
        'The instance starts as null before first access',
        'Use a nullable type with the ? prefix',
        'The type is ?EventBus since it holds an EventBus or null',
      ],
      concepts: ['nullable-types', 'static-property'],
    },
    {
      id: 'php-singleton-5',
      title: 'Singleton with Constructor Args',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to create a singleton that accepts a DSN string on first initialization.',
      skeleton: `<?php
class Database {
    private static ?Database \\\$instance = null;

    private function __construct(private string \\\$dsn) {}

    public static function getInstance(string \\\$dsn = ''): self {
        if (self::\\\$instance === null) {
            self::\\\$instance = new ___(\\\$dsn);
        }
        return self::\\\$instance;
    }

    public function getDsn(): string {
        return \\\$this->dsn;
    }
}`,
      solution: `<?php
class Database {
    private static ?Database \\\$instance = null;

    private function __construct(private string \\\$dsn) {}

    public static function getInstance(string \\\$dsn = ''): self {
        if (self::\\\$instance === null) {
            self::\\\$instance = new self(\\\$dsn);
        }
        return self::\\\$instance;
    }

    public function getDsn(): string {
        return \\\$this->dsn;
    }
}`,
      hints: [
        'Use self to instantiate the class from within a static method',
        'new self() calls the private constructor',
        'Pass the DSN argument to the constructor',
      ],
      concepts: ['singleton', 'constructor-arguments'],
    },
    {
      id: 'php-singleton-6',
      title: 'Registry Set and Get',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to store and retrieve services from a registry.',
      skeleton: `<?php
class Registry {
    private static array \\\$services = [];

    public static function set(string \\\$key, object \\\$service): void {
        self::\\\$services[___] = \\\$service;
    }

    public static function get(string \\\$key): object {
        return self::\\\$services[___];
    }
}`,
      solution: `<?php
class Registry {
    private static array \\\$services = [];

    public static function set(string \\\$key, object \\\$service): void {
        self::\\\$services[\\\$key] = \\\$service;
    }

    public static function get(string \\\$key): object {
        return self::\\\$services[\\\$key];
    }
}`,
      hints: [
        'Services are stored in an associative array',
        'The key parameter is the identifier',
        'Use \$key as the array index',
      ],
      concepts: ['registry-pattern', 'static-array'],
    },
    {
      id: 'php-singleton-7',
      title: 'Thread-Safe Singleton',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a complete Singleton class AppConfig with: private constructor taking an array of settings, getInstance with lazy init, a get method to retrieve a setting by key with a default value, and prevention of clone and wakeup.',
      skeleton: `<?php
class AppConfig {
    // Implement full singleton with:
    // - Static nullable instance
    // - Private constructor with settings array
    // - getInstance that initializes with default settings
    // - get(key, default) method
    // - Clone and wakeup prevention
}`,
      solution: `<?php
class AppConfig {
    private static ?AppConfig \\\$instance = null;
    private array \\\$settings;

    private function __construct(array \\\$settings) {
        \\\$this->settings = \\\$settings;
    }

    public static function getInstance(array \\\$settings = []): self {
        if (self::\\\$instance === null) {
            self::\\\$instance = new self(\\\$settings);
        }
        return self::\\\$instance;
    }

    public function get(string \\\$key, mixed \\\$default = null): mixed {
        return \\\$this->settings[\\\$key] ?? \\\$default;
    }

    private function __clone() {}

    public function __wakeup(): void {
        throw new \\RuntimeException('Cannot unserialize singleton');
    }
}`,
      hints: [
        'Private constructor stores the settings array',
        'getInstance creates the instance only once',
        'get() uses null coalescing for the default value',
      ],
      concepts: ['singleton', 'complete-implementation'],
    },
    {
      id: 'php-singleton-8',
      title: 'Service Locator with Type Safety',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a ServiceLocator class that registers services by class name and returns them with type checking. Include has(), register(), and resolve() methods.',
      skeleton: `<?php
class ServiceLocator {
    // register(string \\\$className, object \\\$instance): void
    // resolve(string \\\$className): object (throw if not found)
    // has(string \\\$className): bool
}`,
      solution: `<?php
class ServiceLocator {
    private static array \\\$services = [];

    public static function register(string \\\$className, object \\\$instance): void {
        if (!(\\\$instance instanceof \\\$className)) {
            throw new InvalidArgumentException(
                "Instance must be of type \\\$className"
            );
        }
        self::\\\$services[\\\$className] = \\\$instance;
    }

    public static function resolve(string \\\$className): object {
        if (!isset(self::\\\$services[\\\$className])) {
            throw new RuntimeException("Service '\\\$className' not registered");
        }
        return self::\\\$services[\\\$className];
    }

    public static function has(string \\\$className): bool {
        return isset(self::\\\$services[\\\$className]);
    }
}`,
      hints: [
        'Use class name as the key for type safety',
        'Check instanceof when registering',
        'Throw RuntimeException when resolving unregistered service',
      ],
      concepts: ['service-locator', 'type-safety', 'registry-pattern'],
    },
    {
      id: 'php-singleton-9',
      title: 'Resettable Singleton for Testing',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a singleton that includes a static reset() method for use in testing to clear the instance.',
      skeleton: `<?php
class ConnectionPool {
    // Singleton with private constructor
    // getInstance()
    // reset() - clears instance for testing
    // getConnectionCount() - returns int
}`,
      solution: `<?php
class ConnectionPool {
    private static ?ConnectionPool \\\$instance = null;
    private int \\\$connectionCount = 0;

    private function __construct() {}

    public static function getInstance(): self {
        if (self::\\\$instance === null) {
            self::\\\$instance = new self();
        }
        return self::\\\$instance;
    }

    public static function reset(): void {
        self::\\\$instance = null;
    }

    public function getConnectionCount(): int {
        return \\\$this->connectionCount;
    }

    private function __clone() {}
}`,
      hints: [
        'reset() simply sets the static instance back to null',
        'This allows tests to start with a fresh singleton',
        'Make reset a static method',
      ],
      concepts: ['singleton', 'testability', 'reset'],
    },
    {
      id: 'php-singleton-10',
      title: 'Multiton Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a Multiton (named instances) class DatabasePool that manages multiple named database connections. Each name maps to one instance.',
      skeleton: `<?php
class DatabasePool {
    // Store multiple named instances
    // getInstance(string \\\$name, string \\\$dsn): self
    // Each name gets exactly one instance
    // getDsn(): string
}`,
      solution: `<?php
class DatabasePool {
    private static array \\\$instances = [];
    private string \\\$dsn;

    private function __construct(string \\\$dsn) {
        \\\$this->dsn = \\\$dsn;
    }

    public static function getInstance(string \\\$name, string \\\$dsn = ''): self {
        if (!isset(self::\\\$instances[\\\$name])) {
            self::\\\$instances[\\\$name] = new self(\\\$dsn);
        }
        return self::\\\$instances[\\\$name];
    }

    public function getDsn(): string {
        return \\\$this->dsn;
    }

    private function __clone() {}
}`,
      hints: [
        'Use an associative array of instances instead of a single one',
        'The key is the connection name',
        'Each name gets its own singleton instance',
      ],
      concepts: ['multiton', 'named-instances', 'singleton-variant'],
    },
    {
      id: 'php-singleton-11',
      title: 'Lazy-Loaded Configuration',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a Config singleton that lazy-loads settings from a file path only when first accessed.',
      skeleton: `<?php
class Config {
    // Singleton that loads from a JSON file
    // getInstance(string \\\$filePath)
    // get(string \\\$key): mixed
    // File is only read on first getInstance call
}`,
      solution: `<?php
class Config {
    private static ?Config \\\$instance = null;
    private array \\\$data;

    private function __construct(string \\\$filePath) {
        \\\$json = file_get_contents(\\\$filePath);
        \\\$this->data = json_decode(\\\$json, true) ?? [];
    }

    public static function getInstance(string \\\$filePath = ''): self {
        if (self::\\\$instance === null) {
            self::\\\$instance = new self(\\\$filePath);
        }
        return self::\\\$instance;
    }

    public function get(string \\\$key, mixed \\\$default = null): mixed {
        return \\\$this->data[\\\$key] ?? \\\$default;
    }

    private function __clone() {}
}`,
      hints: [
        'File reading happens in the private constructor',
        'The constructor is only called once via getInstance',
        'Use json_decode to parse the config file',
      ],
      concepts: ['singleton', 'lazy-loading', 'configuration'],
    },
    {
      id: 'php-singleton-12',
      title: 'Singleton Event Dispatcher',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write an EventDispatcher singleton with on() to register listeners and dispatch() to trigger events.',
      skeleton: `<?php
class EventDispatcher {
    // Singleton pattern
    // on(string \\\$event, callable \\\$listener): void
    // dispatch(string \\\$event, array \\\$data = []): void
}`,
      solution: `<?php
class EventDispatcher {
    private static ?EventDispatcher \\\$instance = null;
    private array \\\$listeners = [];

    private function __construct() {}

    public static function getInstance(): self {
        if (self::\\\$instance === null) {
            self::\\\$instance = new self();
        }
        return self::\\\$instance;
    }

    public function on(string \\\$event, callable \\\$listener): void {
        \\\$this->listeners[\\\$event][] = \\\$listener;
    }

    public function dispatch(string \\\$event, array \\\$data = []): void {
        foreach (\\\$this->listeners[\\\$event] ?? [] as \\\$listener) {
            \\\$listener(\\\$data);
        }
    }

    private function __clone() {}
}`,
      hints: [
        'Store listeners in an array keyed by event name',
        'Each event can have multiple listeners',
        'dispatch loops through and calls each listener',
      ],
      concepts: ['singleton', 'event-dispatcher', 'observer'],
    },
    {
      id: 'php-singleton-13',
      title: 'Fix Public Constructor Singleton',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the singleton that allows multiple instances because the constructor is public.',
      skeleton: `<?php
class Logger {
    private static ?Logger \\\$instance = null;

    public function __construct() {}

    public static function getInstance(): self {
        if (self::\\\$instance === null) {
            self::\\\$instance = new self();
        }
        return self::\\\$instance;
    }
}

// Bug: users can do new Logger() bypassing singleton
\\\$a = new Logger();
\\\$b = new Logger();`,
      solution: `<?php
class Logger {
    private static ?Logger \\\$instance = null;

    private function __construct() {}

    public static function getInstance(): self {
        if (self::\\\$instance === null) {
            self::\\\$instance = new self();
        }
        return self::\\\$instance;
    }
}

// Fixed: new Logger() now throws an error
\\\$a = Logger::getInstance();
\\\$b = Logger::getInstance();`,
      hints: [
        'The constructor visibility allows bypassing getInstance',
        'Make the constructor private',
        'Update usage to call getInstance() instead of new',
      ],
      concepts: ['singleton', 'encapsulation', 'debugging'],
    },
    {
      id: 'php-singleton-14',
      title: 'Fix Singleton That Creates New Instance Every Time',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the singleton that creates a new instance on every call.',
      skeleton: `<?php
class Cache {
    private static ?Cache \\\$instance = null;

    private function __construct() {}

    public static function getInstance(): self {
        // Bug: always creates new instance
        self::\\\$instance = new self();
        return self::\\\$instance;
    }
}`,
      solution: `<?php
class Cache {
    private static ?Cache \\\$instance = null;

    private function __construct() {}

    public static function getInstance(): self {
        if (self::\\\$instance === null) {
            self::\\\$instance = new self();
        }
        return self::\\\$instance;
    }
}`,
      hints: [
        'The method creates a new instance every time it is called',
        'It is missing the null check',
        'Only create a new instance if \$instance is null',
      ],
      concepts: ['singleton', 'lazy-initialization', 'debugging'],
    },
    {
      id: 'php-singleton-15',
      title: 'Fix Registry Missing Key Check',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the registry that throws a cryptic error when accessing an unregistered service.',
      skeleton: `<?php
class Registry {
    private static array \\\$services = [];

    public static function set(string \\\$key, object \\\$service): void {
        self::\\\$services[\\\$key] = \\\$service;
    }

    public static function get(string \\\$key): object {
        // Bug: no check if key exists, gives "undefined array key" warning
        return self::\\\$services[\\\$key];
    }
}`,
      solution: `<?php
class Registry {
    private static array \\\$services = [];

    public static function set(string \\\$key, object \\\$service): void {
        self::\\\$services[\\\$key] = \\\$service;
    }

    public static function get(string \\\$key): object {
        if (!isset(self::\\\$services[\\\$key])) {
            throw new RuntimeException("Service '\\\$key' not registered");
        }
        return self::\\\$services[\\\$key];
    }
}`,
      hints: [
        'Accessing an undefined array key gives a warning',
        'Check if the key exists before accessing',
        'Throw a descriptive exception if not found',
      ],
      concepts: ['registry-pattern', 'error-handling', 'debugging'],
    },
    {
      id: 'php-singleton-16',
      title: 'Predict Singleton Identity',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict whether two getInstance calls return the same object.',
      skeleton: `<?php
class App {
    private static ?App \\\$instance = null;
    private function __construct() {}
    public static function getInstance(): self {
        if (self::\\\$instance === null) {
            self::\\\$instance = new self();
        }
        return self::\\\$instance;
    }
}

\\\$a = App::getInstance();
\\\$b = App::getInstance();
var_dump(\\\$a === \\\$b);`,
      solution: `bool(true)`,
      hints: [
        'Both calls return the same static instance',
        '=== checks object identity (same reference)',
        'Singletons always return the same object',
      ],
      concepts: ['singleton', 'object-identity'],
    },
    {
      id: 'php-singleton-17',
      title: 'Predict Static State Persistence',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the output when modifying singleton state.',
      skeleton: `<?php
class Counter {
    private static ?Counter \\\$instance = null;
    private int \\\$count = 0;
    private function __construct() {}
    public static function getInstance(): self {
        if (self::\\\$instance === null) {
            self::\\\$instance = new self();
        }
        return self::\\\$instance;
    }
    public function increment(): void { \\\$this->count++; }
    public function getCount(): int { return \\\$this->count; }
}

Counter::getInstance()->increment();
Counter::getInstance()->increment();
Counter::getInstance()->increment();
echo Counter::getInstance()->getCount();`,
      solution: `3`,
      hints: [
        'All calls to getInstance return the same object',
        'Each increment modifies the same counter',
        'After 3 increments, count is 3',
      ],
      concepts: ['singleton', 'shared-state'],
    },
    {
      id: 'php-singleton-18',
      title: 'Predict Clone Prevention',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict what happens when you try to clone a singleton with a private __clone.',
      skeleton: `<?php
class Config {
    private static ?Config \\\$instance = null;
    private function __construct() {}
    private function __clone() {}
    public static function getInstance(): self {
        if (self::\\\$instance === null) {
            self::\\\$instance = new self();
        }
        return self::\\\$instance;
    }
}

\\\$config = Config::getInstance();
\\\$copy = clone \\\$config;
// What happens?
echo "Error: cannot clone";`,
      solution: `Error: cannot clone`,
      hints: [
        'The __clone method is private',
        'Cloning from outside the class triggers a fatal error',
        'PHP throws an Error when accessing private __clone',
      ],
      concepts: ['singleton', 'clone-prevention'],
    },
    {
      id: 'php-singleton-19',
      title: 'Refactor Global to Singleton',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the global variable approach to use a proper singleton pattern.',
      skeleton: `<?php
// Global configuration - messy and unsafe
\\\$GLOBALS['app_config'] = [
    'debug' => true,
    'db_host' => 'localhost',
    'db_name' => 'myapp',
];

function getConfig(string \\\$key): mixed {
    return \\\$GLOBALS['app_config'][\\\$key] ?? null;
}

function setConfig(string \\\$key, mixed \\\$value): void {
    \\\$GLOBALS['app_config'][\\\$key] = \\\$value;
}

echo getConfig('debug');`,
      solution: `<?php
class AppConfig {
    private static ?AppConfig \\\$instance = null;
    private array \\\$config;

    private function __construct(array \\\$defaults = []) {
        \\\$this->config = \\\$defaults;
    }

    public static function getInstance(): self {
        if (self::\\\$instance === null) {
            self::\\\$instance = new self([
                'debug' => true,
                'db_host' => 'localhost',
                'db_name' => 'myapp',
            ]);
        }
        return self::\\\$instance;
    }

    public function get(string \\\$key): mixed {
        return \\\$this->config[\\\$key] ?? null;
    }

    public function set(string \\\$key, mixed \\\$value): void {
        \\\$this->config[\\\$key] = \\\$value;
    }

    private function __clone() {}
}

echo AppConfig::getInstance()->get('debug');`,
      hints: [
        'Replace \$GLOBALS with a singleton class',
        'Store config data as a private property',
        'Access through getInstance()->get()',
      ],
      concepts: ['singleton', 'refactoring', 'globals-replacement'],
    },
    {
      id: 'php-singleton-20',
      title: 'Refactor Singleton to Dependency Injection',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the code that depends on a singleton directly into using dependency injection for better testability.',
      skeleton: `<?php
class UserService {
    public function getUser(int \\\$id): ?array {
        // Direct singleton access - hard to test
        \\\$db = Database::getInstance();
        \\\$stmt = \\\$db->prepare('SELECT * FROM users WHERE id = ?');
        \\\$stmt->execute([\\\$id]);
        return \\\$stmt->fetch() ?: null;
    }
}

class OrderService {
    public function createOrder(array \\\$data): void {
        \\\$db = Database::getInstance();
        \\\$stmt = \\\$db->prepare('INSERT INTO orders (user_id, total) VALUES (?, ?)');
        \\\$stmt->execute([\\\$data['user_id'], \\\$data['total']]);
    }
}`,
      solution: `<?php
class UserService {
    public function __construct(private PDO \\\$db) {}

    public function getUser(int \\\$id): ?array {
        \\\$stmt = \\\$this->db->prepare('SELECT * FROM users WHERE id = ?');
        \\\$stmt->execute([\\\$id]);
        return \\\$stmt->fetch() ?: null;
    }
}

class OrderService {
    public function __construct(private PDO \\\$db) {}

    public function createOrder(array \\\$data): void {
        \\\$stmt = \\\$this->db->prepare('INSERT INTO orders (user_id, total) VALUES (?, ?)');
        \\\$stmt->execute([\\\$data['user_id'], \\\$data['total']]);
    }
}

// Usage:
// \\\$db = new PDO(\\\$dsn);
// \\\$userService = new UserService(\\\$db);
// \\\$orderService = new OrderService(\\\$db);`,
      hints: [
        'Replace singleton calls with constructor injection',
        'Accept PDO as a constructor parameter',
        'Services become easier to test with mock PDO objects',
      ],
      concepts: ['dependency-injection', 'refactoring', 'testability'],
    },
  ],
};
