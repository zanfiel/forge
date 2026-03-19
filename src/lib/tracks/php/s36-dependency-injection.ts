import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-di',
  title: '36. Dependency Injection',
  explanation: `## Dependency Injection in PHP

Dependency Injection (DI) is a design principle where objects receive their dependencies instead of creating them. This promotes loose coupling, testability, and flexibility.

### Constructor Injection
\`\`\`php
<?php
class UserService {
    public function __construct(
        private UserRepository \\\$repo,
        private MailerInterface \\\$mailer
    ) {}

    public function register(string \\\$email): void {
        \\\$user = \\\$this->repo->create(\\\$email);
        \\\$this->mailer->sendWelcome(\\\$user);
    }
}
\`\`\`

### PSR-11 Container Interface
\`\`\`php
<?php
use Psr\\Container\\ContainerInterface;

interface ContainerInterface {
    public function get(string \\\$id): mixed;
    public function has(string \\\$id): bool;
}
\`\`\`

### Simple Container
\`\`\`php
<?php
class Container implements ContainerInterface {
    private array \\\$bindings = [];
    private array \\\$instances = [];

    public function bind(string \\\$id, callable \\\$factory): void {
        \\\$this->bindings[\\\$id] = \\\$factory;
    }

    public function singleton(string \\\$id, callable \\\$factory): void {
        \\\$this->bindings[\\\$id] = function() use (\\\$id, \\\$factory) {
            if (!isset(\\\$this->instances[\\\$id])) {
                \\\$this->instances[\\\$id] = \\\$factory(\\\$this);
            }
            return \\\$this->instances[\\\$id];
        };
    }

    public function get(string \\\$id): mixed {
        if (isset(\\\$this->bindings[\\\$id])) {
            return (\\\$this->bindings[\\\$id])(\\\$this);
        }
        throw new NotFoundException("Service '\\\$id' not found");
    }

    public function has(string \\\$id): bool {
        return isset(\\\$this->bindings[\\\$id]);
    }
}
\`\`\`

### Auto-wiring
Auto-wiring uses reflection to automatically resolve constructor dependencies by type hints.`,
  exercises: [
    {
      id: 'php-di-1',
      title: 'Constructor Injection',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to inject a dependency through the constructor.',
      skeleton: `<?php
class OrderService {
    public function __construct(
        ___ PaymentGateway \\\$gateway
    ) {}

    public function checkout(float \\\$amount): bool {
        return \\\$this->gateway->charge(\\\$amount);
    }
}`,
      solution: `<?php
class OrderService {
    public function __construct(
        private PaymentGateway \\\$gateway
    ) {}

    public function checkout(float \\\$amount): bool {
        return \\\$this->gateway->charge(\\\$amount);
    }
}`,
      hints: [
        'Constructor promotion creates and assigns the property',
        'Use a visibility modifier to promote the parameter',
        'private makes it a class property automatically',
      ],
      concepts: ['constructor-injection', 'promoted-properties'],
    },
    {
      id: 'php-di-2',
      title: 'Interface Type Hint',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to type-hint with an interface rather than a concrete class.',
      skeleton: `<?php
class NotificationService {
    public function __construct(
        private ___ \\\$sender
    ) {}

    public function notify(string \\\$message): void {
        \\\$this->sender->send(\\\$message);
    }
}`,
      solution: `<?php
class NotificationService {
    public function __construct(
        private MessageSenderInterface \\\$sender
    ) {}

    public function notify(string \\\$message): void {
        \\\$this->sender->send(\\\$message);
    }
}`,
      hints: [
        'Depend on abstractions, not concrete classes',
        'Use the interface type for maximum flexibility',
        'This allows swapping implementations without changing code',
      ],
      concepts: ['interface-injection', 'dependency-inversion'],
    },
    {
      id: 'php-di-3',
      title: 'Container Bind',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to register a service factory in the container.',
      skeleton: `<?php
\\\$container = new Container();
\\\$container->___(UserRepository::class, function(Container \\\$c) {
    return new DatabaseUserRepository(\\\$c->get(PDO::class));
});`,
      solution: `<?php
\\\$container = new Container();
\\\$container->bind(UserRepository::class, function(Container \\\$c) {
    return new DatabaseUserRepository(\\\$c->get(PDO::class));
});`,
      hints: [
        'Registering a service factory is called binding',
        'The method takes an ID and a factory callable',
        'Use bind() to register the factory',
      ],
      concepts: ['container', 'binding'],
    },
    {
      id: 'php-di-4',
      title: 'Container Get',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to resolve a service from the container.',
      skeleton: `<?php
\\\$container->bind(Logger::class, fn() => new FileLogger());
\\\$logger = \\\$container->___(Logger::class);
\\\$logger->log('Hello');`,
      solution: `<?php
\\\$container->bind(Logger::class, fn() => new FileLogger());
\\\$logger = \\\$container->get(Logger::class);
\\\$logger->log('Hello');`,
      hints: [
        'Resolving a service retrieves it from the container',
        'Pass the service identifier to retrieve it',
        'Use get() to resolve the service',
      ],
      concepts: ['container', 'resolution'],
    },
    {
      id: 'php-di-5',
      title: 'Singleton Binding',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to register a service that should only be instantiated once.',
      skeleton: `<?php
\\\$container->___(PDO::class, function() {
    return new PDO('sqlite::memory:');
});

// Both calls return the same PDO instance
\\\$db1 = \\\$container->get(PDO::class);
\\\$db2 = \\\$container->get(PDO::class);`,
      solution: `<?php
\\\$container->singleton(PDO::class, function() {
    return new PDO('sqlite::memory:');
});

// Both calls return the same PDO instance
\\\$db1 = \\\$container->get(PDO::class);
\\\$db2 = \\\$container->get(PDO::class);`,
      hints: [
        'A singleton binding returns the same instance every time',
        'The factory is only called once',
        'Use singleton() instead of bind()',
      ],
      concepts: ['singleton-binding', 'container'],
    },
    {
      id: 'php-di-6',
      title: 'Container Has Check',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to check if a service is registered before resolving.',
      skeleton: `<?php
if (\\\$container->___(CacheInterface::class)) {
    \\\$cache = \\\$container->get(CacheInterface::class);
} else {
    \\\$cache = new NullCache();
}`,
      solution: `<?php
if (\\\$container->has(CacheInterface::class)) {
    \\\$cache = \\\$container->get(CacheInterface::class);
} else {
    \\\$cache = new NullCache();
}`,
      hints: [
        'PSR-11 defines a method to check if a service exists',
        'It returns a boolean',
        'Use has() to check before resolving',
      ],
      concepts: ['PSR-11', 'container'],
    },
    {
      id: 'php-di-7',
      title: 'Build a Simple Container',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a SimpleContainer class with bind(), get(), and has() methods. bind() takes a string ID and a callable factory. get() calls the factory. has() checks if the ID is registered.',
      skeleton: `<?php
class SimpleContainer {
    // bind(string \\\$id, callable \\\$factory): void
    // get(string \\\$id): mixed
    // has(string \\\$id): bool
}`,
      solution: `<?php
class SimpleContainer {
    private array \\\$bindings = [];

    public function bind(string \\\$id, callable \\\$factory): void {
        \\\$this->bindings[\\\$id] = \\\$factory;
    }

    public function get(string \\\$id): mixed {
        if (!isset(\\\$this->bindings[\\\$id])) {
            throw new RuntimeException("Service '\\\$id' not found");
        }
        return (\\\$this->bindings[\\\$id])(\\\$this);
    }

    public function has(string \\\$id): bool {
        return isset(\\\$this->bindings[\\\$id]);
    }
}`,
      hints: [
        'Store factories in an associative array',
        'Call the factory when resolving, passing the container',
        'Throw an exception for unregistered services',
      ],
      concepts: ['container', 'PSR-11'],
    },
    {
      id: 'php-di-8',
      title: 'Singleton Container',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Extend the SimpleContainer with a singleton() method that caches the result of the first factory call.',
      skeleton: `<?php
class Container {
    private array \\\$bindings = [];
    private array \\\$instances = [];

    public function bind(string \\\$id, callable \\\$factory): void {
        \\\$this->bindings[\\\$id] = \\\$factory;
    }

    // Add singleton method that caches instances
    // Add get and has methods
}`,
      solution: `<?php
class Container {
    private array \\\$bindings = [];
    private array \\\$instances = [];

    public function bind(string \\\$id, callable \\\$factory): void {
        \\\$this->bindings[\\\$id] = \\\$factory;
    }

    public function singleton(string \\\$id, callable \\\$factory): void {
        \\\$this->bindings[\\\$id] = function(Container \\\$c) use (\\\$id, \\\$factory) {
            if (!isset(\\\$this->instances[\\\$id])) {
                \\\$this->instances[\\\$id] = \\\$factory(\\\$c);
            }
            return \\\$this->instances[\\\$id];
        };
    }

    public function get(string \\\$id): mixed {
        if (!isset(\\\$this->bindings[\\\$id])) {
            throw new RuntimeException("Service '\\\$id' not found");
        }
        return (\\\$this->bindings[\\\$id])(\\\$this);
    }

    public function has(string \\\$id): bool {
        return isset(\\\$this->bindings[\\\$id]);
    }
}`,
      hints: [
        'singleton wraps the factory in a caching closure',
        'Check the instances array before calling the factory',
        'Store the result in instances for subsequent calls',
      ],
      concepts: ['singleton-binding', 'container', 'caching'],
    },
    {
      id: 'php-di-9',
      title: 'Auto-Wiring Container',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a make() method that uses reflection to automatically resolve constructor dependencies by their type hints.',
      skeleton: `<?php
class AutoWireContainer extends Container {
    public function make(string \\\$className): object {
        // Use ReflectionClass to inspect constructor
        // Resolve each parameter by its type hint
        // Create and return the instance
    }
}`,
      solution: `<?php
class AutoWireContainer extends Container {
    public function make(string \\\$className): object {
        \\\$reflection = new \\ReflectionClass(\\\$className);
        \\\$constructor = \\\$reflection->getConstructor();

        if (\\\$constructor === null) {
            return new \\\$className();
        }

        \\\$params = [];
        foreach (\\\$constructor->getParameters() as \\\$param) {
            \\\$type = \\\$param->getType();
            if (\\\$type instanceof \\ReflectionNamedType && !\\\$type->isBuiltin()) {
                \\\$params[] = \\\$this->has(\\\$type->getName())
                    ? \\\$this->get(\\\$type->getName())
                    : \\\$this->make(\\\$type->getName());
            } elseif (\\\$param->isDefaultValueAvailable()) {
                \\\$params[] = \\\$param->getDefaultValue();
            } else {
                throw new RuntimeException("Cannot resolve parameter \\\$" . \\\$param->getName());
            }
        }

        return \\\$reflection->newInstanceArgs(\\\$params);
    }
}`,
      hints: [
        'Use ReflectionClass to get constructor parameters',
        'Check if each parameter has a non-builtin type hint',
        'Recursively resolve dependencies',
      ],
      concepts: ['auto-wiring', 'reflection', 'container'],
    },
    {
      id: 'php-di-10',
      title: 'Service Provider',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a ServiceProvider abstract class with register() and boot() methods, and a function to register a provider with a container.',
      skeleton: `<?php
// Abstract ServiceProvider with register() and boot()
// Concrete DatabaseServiceProvider
// Function to register provider with container`,
      solution: `<?php
abstract class ServiceProvider {
    abstract public function register(Container \\\$container): void;

    public function boot(Container \\\$container): void {
        // Optional boot logic
    }
}

class DatabaseServiceProvider extends ServiceProvider {
    public function register(Container \\\$container): void {
        \\\$container->singleton(PDO::class, function() {
            return new PDO('sqlite::memory:');
        });
        \\\$container->bind(UserRepository::class, function(Container \\\$c) {
            return new DatabaseUserRepository(\\\$c->get(PDO::class));
        });
    }

    public function boot(Container \\\$container): void {
        \\\$pdo = \\\$container->get(PDO::class);
        \\\$pdo->exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY)');
    }
}

function registerProvider(Container \\\$container, ServiceProvider \\\$provider): void {
    \\\$provider->register(\\\$container);
    \\\$provider->boot(\\\$container);
}`,
      hints: [
        'register() binds services to the container',
        'boot() runs after all providers are registered',
        'Concrete providers override register() and optionally boot()',
      ],
      concepts: ['service-providers', 'container', 'bootstrapping'],
    },
    {
      id: 'php-di-11',
      title: 'Tagged Services',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a TaggableContainer that extends a basic container with tag() and getTagged() methods for grouping services.',
      skeleton: `<?php
class TaggableContainer extends SimpleContainer {
    // tag(string \\\$serviceId, string \\\$tag): void
    // getTagged(string \\\$tag): array of resolved services
}`,
      solution: `<?php
class TaggableContainer extends SimpleContainer {
    private array \\\$tags = [];

    public function tag(string \\\$serviceId, string \\\$tag): void {
        \\\$this->tags[\\\$tag][] = \\\$serviceId;
    }

    public function getTagged(string \\\$tag): array {
        \\\$services = [];
        foreach (\\\$this->tags[\\\$tag] ?? [] as \\\$id) {
            \\\$services[] = \\\$this->get(\\\$id);
        }
        return \\\$services;
    }
}`,
      hints: [
        'Store tags as an array mapping tag names to service IDs',
        'getTagged resolves all services with a given tag',
        'Multiple services can share the same tag',
      ],
      concepts: ['tagged-services', 'container'],
    },
    {
      id: 'php-di-12',
      title: 'Method Injection',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a class that uses method injection -- a setter method to optionally inject a logger dependency.',
      skeleton: `<?php
class FileProcessor {
    // Optional logger dependency via method injection
    // process(string \\\$file): void
    // setLogger(LoggerInterface \\\$logger): void
}`,
      solution: `<?php
class FileProcessor {
    private ?LoggerInterface \\\$logger = null;

    public function setLogger(LoggerInterface \\\$logger): void {
        \\\$this->logger = \\\$logger;
    }

    public function process(string \\\$file): void {
        \\\$this->logger?->log("Processing \\\$file");
        \\\$content = file_get_contents(\\\$file);
        \\\$this->logger?->log("Read " . strlen(\\\$content) . " bytes");
    }
}`,
      hints: [
        'Method injection uses a setter for optional dependencies',
        'The property starts as null',
        'Use the nullsafe operator ?-> when calling the logger',
      ],
      concepts: ['method-injection', 'optional-dependencies'],
    },
    {
      id: 'php-di-13',
      title: 'Fix Missing Dependency',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the service that creates its dependency internally instead of receiving it via injection.',
      skeleton: `<?php
class EmailService {
    private SmtpClient \\\$client;

    public function __construct() {
        // Bug: creates dependency internally - hard to test
        \\\$this->client = new SmtpClient('smtp.example.com', 587);
    }

    public function send(string \\\$to, string \\\$body): void {
        \\\$this->client->sendMail(\\\$to, \\\$body);
    }
}`,
      solution: `<?php
class EmailService {
    public function __construct(
        private SmtpClient \\\$client
    ) {}

    public function send(string \\\$to, string \\\$body): void {
        \\\$this->client->sendMail(\\\$to, \\\$body);
    }
}`,
      hints: [
        'Dependencies should be injected, not created internally',
        'Accept SmtpClient as a constructor parameter',
        'This makes the class testable with mock clients',
      ],
      concepts: ['dependency-injection', 'testability'],
    },
    {
      id: 'php-di-14',
      title: 'Fix Container Circular Dependency',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Fix the container bindings that cause infinite recursion from circular dependencies.',
      skeleton: `<?php
\\\$container->bind(ServiceA::class, function(Container \\\$c) {
    return new ServiceA(\\\$c->get(ServiceB::class));
});

\\\$container->bind(ServiceB::class, function(Container \\\$c) {
    // Bug: ServiceB depends on ServiceA which depends on ServiceB
    return new ServiceB(\\\$c->get(ServiceA::class));
});

// Calling \\\$container->get(ServiceA::class) causes infinite recursion`,
      solution: `<?php
\\\$container->bind(ServiceA::class, function(Container \\\$c) {
    return new ServiceA(\\\$c->get(ServiceB::class));
});

\\\$container->bind(ServiceB::class, function(Container \\\$c) {
    // Fixed: ServiceB uses method injection to break the cycle
    \\\$b = new ServiceB();
    return \\\$b;
});

// After both are created, connect them:
// \\\$a = \\\$container->get(ServiceA::class);
// \\\$b = \\\$container->get(ServiceB::class);
// \\\$b->setServiceA(\\\$a);`,
      hints: [
        'Circular dependencies cause infinite recursion',
        'Break the cycle with method/setter injection',
        'One service gets the dependency after construction',
      ],
      concepts: ['circular-dependencies', 'container', 'setter-injection'],
    },
    {
      id: 'php-di-15',
      title: 'Fix Concrete Type Hint',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the class that depends on a concrete implementation instead of an interface.',
      skeleton: `<?php
class ReportGenerator {
    // Bug: depends on concrete class, not interface
    public function __construct(
        private MysqlUserRepository \\\$repo,
        private SmtpMailer \\\$mailer
    ) {}

    public function generate(): void {
        \\\$users = \\\$this->repo->findAll();
        \\\$this->mailer->send('admin@example.com', 'Report ready');
    }
}`,
      solution: `<?php
class ReportGenerator {
    public function __construct(
        private UserRepositoryInterface \\\$repo,
        private MailerInterface \\\$mailer
    ) {}

    public function generate(): void {
        \\\$users = \\\$this->repo->findAll();
        \\\$this->mailer->send('admin@example.com', 'Report ready');
    }
}`,
      hints: [
        'Depend on abstractions, not concretions',
        'Replace concrete class types with their interfaces',
        'This follows the Dependency Inversion Principle',
      ],
      concepts: ['dependency-inversion', 'interfaces'],
    },
    {
      id: 'php-di-16',
      title: 'Predict Container Resolution',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict whether two get() calls return the same instance with bind() vs singleton().',
      skeleton: `<?php
\\\$c = new Container();
\\\$c->bind('logger', fn() => new stdClass());
\\\$a = \\\$c->get('logger');
\\\$b = \\\$c->get('logger');
var_dump(\\\$a === \\\$b);`,
      solution: `bool(false)`,
      hints: [
        'bind() creates a new instance on every get() call',
        'Each call to the factory returns a different object',
        'Use singleton() for shared instances',
      ],
      concepts: ['container', 'bind-vs-singleton'],
    },
    {
      id: 'php-di-17',
      title: 'Predict Singleton Resolution',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict whether two get() calls return the same instance with singleton.',
      skeleton: `<?php
\\\$c = new Container();
\\\$c->singleton('db', fn() => new stdClass());
\\\$a = \\\$c->get('db');
\\\$b = \\\$c->get('db');
var_dump(\\\$a === \\\$b);`,
      solution: `bool(true)`,
      hints: [
        'singleton() caches the first result',
        'Subsequent calls return the cached instance',
        '\$a and \$b are the exact same object',
      ],
      concepts: ['singleton-binding', 'object-identity'],
    },
    {
      id: 'php-di-18',
      title: 'Predict Container Has',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the output of has() checks.',
      skeleton: `<?php
\\\$c = new Container();
\\\$c->bind('a', fn() => 'hello');
var_dump(\\\$c->has('a'));
var_dump(\\\$c->has('b'));`,
      solution: `bool(true)
bool(false)`,
      hints: [
        'has() checks if a service ID is registered',
        '"a" was bound, so has("a") is true',
        '"b" was never bound, so has("b") is false',
      ],
      concepts: ['container', 'PSR-11'],
    },
    {
      id: 'php-di-19',
      title: 'Refactor Static Calls to DI',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the code that uses static method calls into proper dependency injection.',
      skeleton: `<?php
class InvoiceService {
    public function createInvoice(int \\\$userId, float \\\$amount): void {
        \\\$user = Database::query("SELECT * FROM users WHERE id = ?", [\\\$userId]);
        \\\$pdf = PdfGenerator::create(\\\$user, \\\$amount);
        EmailSender::send(\\\$user['email'], 'Invoice', \\\$pdf);
        Logger::info("Invoice created for user \\\$userId");
    }
}`,
      solution: `<?php
class InvoiceService {
    public function __construct(
        private UserRepository \\\$users,
        private PdfGeneratorInterface \\\$pdf,
        private MailerInterface \\\$mailer,
        private LoggerInterface \\\$logger
    ) {}

    public function createInvoice(int \\\$userId, float \\\$amount): void {
        \\\$user = \\\$this->users->find(\\\$userId);
        \\\$pdfDoc = \\\$this->pdf->create(\\\$user, \\\$amount);
        \\\$this->mailer->send(\\\$user->email, 'Invoice', \\\$pdfDoc);
        \\\$this->logger->info("Invoice created for user \\\$userId");
    }
}`,
      hints: [
        'Replace static calls with injected dependencies',
        'Define interfaces for each dependency',
        'Accept all dependencies through the constructor',
      ],
      concepts: ['dependency-injection', 'refactoring', 'static-removal'],
    },
    {
      id: 'php-di-20',
      title: 'Refactor God Class to Injected Services',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the class that instantiates all its own dependencies into one that receives them via DI.',
      skeleton: `<?php
class Application {
    private PDO \\\$db;
    private Logger \\\$logger;
    private Cache \\\$cache;
    private Mailer \\\$mailer;

    public function __construct() {
        \\\$this->db = new PDO('mysql:host=localhost;dbname=app', 'root', 'secret');
        \\\$this->logger = new FileLogger('/var/log/app.log');
        \\\$this->cache = new RedisCache('127.0.0.1', 6379);
        \\\$this->mailer = new SmtpMailer('smtp.example.com', 587, 'user', 'pass');
    }

    public function run(): void {
        \\\$this->logger->info('App started');
    }
}`,
      solution: `<?php
class Application {
    public function __construct(
        private PDO \\\$db,
        private LoggerInterface \\\$logger,
        private CacheInterface \\\$cache,
        private MailerInterface \\\$mailer
    ) {}

    public function run(): void {
        \\\$this->logger->info('App started');
    }
}

// Wire up in a composition root / bootstrap:
// \\\$container->singleton(PDO::class, fn() => new PDO('mysql:host=localhost;dbname=app', 'root', 'secret'));
// \\\$container->singleton(LoggerInterface::class, fn() => new FileLogger('/var/log/app.log'));
// \\\$container->singleton(CacheInterface::class, fn() => new RedisCache('127.0.0.1', 6379));
// \\\$container->singleton(MailerInterface::class, fn() => new SmtpMailer('smtp.example.com', 587, 'user', 'pass'));
// \\\$app = \\\$container->get(Application::class);`,
      hints: [
        'Move all instantiation out of the constructor',
        'Accept interfaces instead of concrete classes',
        'Wire everything up in a composition root or container',
      ],
      concepts: ['dependency-injection', 'composition-root', 'refactoring'],
    },
  ],
};
