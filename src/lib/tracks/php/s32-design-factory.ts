import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-factory',
  title: '32. Factory',
  explanation: `## Factory Pattern in PHP

The Factory pattern provides an interface for creating objects without specifying their exact classes. It encapsulates instantiation logic and promotes loose coupling.

### Simple Factory
\`\`\`php
<?php
class NotificationFactory {
    public static function create(string \\\$type): NotificationInterface {
        return match (\\\$type) {
            'email' => new EmailNotification(),
            'sms' => new SmsNotification(),
            'push' => new PushNotification(),
            default => throw new InvalidArgumentException("Unknown type: \\\$type"),
        };
    }
}

\\\$notification = NotificationFactory::create('email');
\`\`\`

### Factory Method Pattern
\`\`\`php
<?php
abstract class Document {
    abstract public function createPage(): PageInterface;

    public function addPage(): void {
        \\\$page = \\\$this->createPage();
        \\\$page->render();
    }
}

class Resume extends Document {
    public function createPage(): PageInterface {
        return new ResumePage();
    }
}
\`\`\`

### Abstract Factory
\`\`\`php
<?php
interface UIFactory {
    public function createButton(): Button;
    public function createInput(): Input;
}

class DarkThemeFactory implements UIFactory {
    public function createButton(): Button {
        return new DarkButton();
    }
    public function createInput(): Input {
        return new DarkInput();
    }
}
\`\`\`

### Static Factory Methods
\`\`\`php
<?php
class Money {
    private function __construct(
        private int \\\$amount,
        private string \\\$currency
    ) {}

    public static function usd(int \\\$cents): self {
        return new self(\\\$cents, 'USD');
    }

    public static function eur(int \\\$cents): self {
        return new self(\\\$cents, 'EUR');
    }
}
\`\`\``,
  exercises: [
    {
      id: 'php-factory-1',
      title: 'Simple Factory Match',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to create the correct object based on the type string using match.',
      skeleton: `<?php
class ShapeFactory {
    public static function create(string \\\$type): Shape {
        return ___ (\\\$type) {
            'circle' => new Circle(),
            'square' => new Square(),
            'triangle' => new Triangle(),
            default => throw new InvalidArgumentException("Unknown: \\\$type"),
        };
    }
}`,
      solution: `<?php
class ShapeFactory {
    public static function create(string \\\$type): Shape {
        return match (\\\$type) {
            'circle' => new Circle(),
            'square' => new Square(),
            'triangle' => new Triangle(),
            default => throw new InvalidArgumentException("Unknown: \\\$type"),
        };
    }
}`,
      hints: [
        'PHP 8 has a match expression similar to switch',
        'match returns a value directly',
        'It uses strict comparison by default',
      ],
      concepts: ['factory', 'match-expression'],
    },
    {
      id: 'php-factory-2',
      title: 'Static Factory Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to create a static factory method that returns a new instance.',
      skeleton: `<?php
class Color {
    private function __construct(
        private int \\\$r,
        private int \\\$g,
        private int \\\$b
    ) {}

    public ___ function red(): self {
        return new self(255, 0, 0);
    }
}

\\\$red = Color::red();`,
      solution: `<?php
class Color {
    private function __construct(
        private int \\\$r,
        private int \\\$g,
        private int \\\$b
    ) {}

    public static function red(): self {
        return new self(255, 0, 0);
    }
}

\\\$red = Color::red();`,
      hints: [
        'Factory methods are called on the class, not an instance',
        'They need the static keyword',
        'Static methods can call new self() with private constructors',
      ],
      concepts: ['static-factory', 'named-constructors'],
    },
    {
      id: 'php-factory-3',
      title: 'Abstract Factory Method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to declare an abstract factory method that subclasses must implement.',
      skeleton: `<?php
abstract class Report {
    ___ public function createFormatter(): FormatterInterface;

    public function generate(array \\\$data): string {
        \\\$formatter = \\\$this->createFormatter();
        return \\\$formatter->format(\\\$data);
    }
}`,
      solution: `<?php
abstract class Report {
    abstract public function createFormatter(): FormatterInterface;

    public function generate(array \\\$data): string {
        \\\$formatter = \\\$this->createFormatter();
        return \\\$formatter->format(\\\$data);
    }
}`,
      hints: [
        'The method has no body and must be implemented by subclasses',
        'Use the abstract keyword',
        'Abstract methods can only exist in abstract classes',
      ],
      concepts: ['factory-method', 'abstract'],
    },
    {
      id: 'php-factory-4',
      title: 'Factory with Interface Return',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the return type for the factory method that returns any implementation of the interface.',
      skeleton: `<?php
interface Logger {
    public function log(string \\\$message): void;
}

class LoggerFactory {
    public static function create(string \\\$driver): ___ {
        return match (\\\$driver) {
            'file' => new FileLogger(),
            'console' => new ConsoleLogger(),
            default => throw new InvalidArgumentException("Unknown driver"),
        };
    }
}`,
      solution: `<?php
interface Logger {
    public function log(string \\\$message): void;
}

class LoggerFactory {
    public static function create(string \\\$driver): Logger {
        return match (\\\$driver) {
            'file' => new FileLogger(),
            'console' => new ConsoleLogger(),
            default => throw new InvalidArgumentException("Unknown driver"),
        };
    }
}`,
      hints: [
        'The factory returns different implementations',
        'All implementations share a common interface',
        'Return the interface type, not a concrete class',
      ],
      concepts: ['factory', 'interface', 'polymorphism'],
    },
    {
      id: 'php-factory-5',
      title: 'Private Constructor for Static Factory',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the visibility to force users to use the named constructors instead of new.',
      skeleton: `<?php
class Temperature {
    ___ function __construct(
        private float \\\$value,
        private string \\\$unit
    ) {}

    public static function celsius(float \\\$value): self {
        return new self(\\\$value, 'C');
    }

    public static function fahrenheit(float \\\$value): self {
        return new self(\\\$value, 'F');
    }
}`,
      solution: `<?php
class Temperature {
    private function __construct(
        private float \\\$value,
        private string \\\$unit
    ) {}

    public static function celsius(float \\\$value): self {
        return new self(\\\$value, 'C');
    }

    public static function fahrenheit(float \\\$value): self {
        return new self(\\\$value, 'F');
    }
}`,
      hints: [
        'Named constructors should be the only way to create instances',
        'The regular constructor should not be accessible from outside',
        'Make it private to force use of static methods',
      ],
      concepts: ['named-constructors', 'encapsulation'],
    },
    {
      id: 'php-factory-6',
      title: 'Abstract Factory Interface',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to define an abstract factory interface.',
      skeleton: `<?php
interface ___ {
    public function createButton(): ButtonInterface;
    public function createCheckbox(): CheckboxInterface;
}

class MaterialUIFactory ___ ThemeFactory {
    public function createButton(): ButtonInterface {
        return new MaterialButton();
    }

    public function createCheckbox(): CheckboxInterface {
        return new MaterialCheckbox();
    }
}`,
      solution: `<?php
interface ThemeFactory {
    public function createButton(): ButtonInterface;
    public function createCheckbox(): CheckboxInterface;
}

class MaterialUIFactory implements ThemeFactory {
    public function createButton(): ButtonInterface {
        return new MaterialButton();
    }

    public function createCheckbox(): CheckboxInterface {
        return new MaterialCheckbox();
    }
}`,
      hints: [
        'The abstract factory is typically defined as an interface',
        'Concrete factories implement the interface',
        'Use the implements keyword',
      ],
      concepts: ['abstract-factory', 'interface'],
    },
    {
      id: 'php-factory-7',
      title: 'Complete Factory Method Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a complete factory method pattern: an abstract Creator class with an abstract createProduct() method and a concrete ConcreteCreator that creates a specific product.',
      skeleton: `<?php
interface Product {
    public function getName(): string;
}

// Write abstract Creator with abstract createProduct(): Product
// Write a deliver() method that uses the factory method
// Write ConcreteCreator that creates WidgetProduct`,
      solution: `<?php
interface Product {
    public function getName(): string;
}

class WidgetProduct implements Product {
    public function getName(): string {
        return 'Widget';
    }
}

abstract class Creator {
    abstract public function createProduct(): Product;

    public function deliver(): string {
        \\\$product = \\\$this->createProduct();
        return "Delivering: " . \\\$product->getName();
    }
}

class WidgetCreator extends Creator {
    public function createProduct(): Product {
        return new WidgetProduct();
    }
}`,
      hints: [
        'The Creator has an abstract factory method',
        'It also has a concrete method that uses the factory method',
        'Each concrete Creator decides what Product to create',
      ],
      concepts: ['factory-method', 'template-method'],
    },
    {
      id: 'php-factory-8',
      title: 'Configurable Factory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a factory class that allows registering new types dynamically via a register method and creates instances via a create method.',
      skeleton: `<?php
class DynamicFactory {
    // register(string \\\$type, string \\\$className): void
    // create(string \\\$type): object
    // Allow adding new types at runtime
}`,
      solution: `<?php
class DynamicFactory {
    private array \\\$registry = [];

    public function register(string \\\$type, string \\\$className): void {
        \\\$this->registry[\\\$type] = \\\$className;
    }

    public function create(string \\\$type): object {
        if (!isset(\\\$this->registry[\\\$type])) {
            throw new InvalidArgumentException("Type '\\\$type' not registered");
        }
        \\\$className = \\\$this->registry[\\\$type];
        return new \\\$className();
    }
}`,
      hints: [
        'Store type-to-class mappings in an array',
        'register() adds a new mapping',
        'create() looks up the class and instantiates it',
      ],
      concepts: ['factory', 'registry', 'dynamic-creation'],
    },
    {
      id: 'php-factory-9',
      title: 'Value Object Static Factories',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a Money value object with a private constructor and static factory methods: usd(), eur(), and fromString() that parses "100 USD" format.',
      skeleton: `<?php
class Money {
    // Private constructor with amount (int) and currency (string)
    // usd(int \\\$cents): self
    // eur(int \\\$cents): self
    // fromString(string \\\$str): self - parse "100 USD"
    // toString(): string
}`,
      solution: `<?php
class Money {
    private function __construct(
        private int \\\$amount,
        private string \\\$currency
    ) {}

    public static function usd(int \\\$cents): self {
        return new self(\\\$cents, 'USD');
    }

    public static function eur(int \\\$cents): self {
        return new self(\\\$cents, 'EUR');
    }

    public static function fromString(string \\\$str): self {
        [\\\$amount, \\\$currency] = explode(' ', trim(\\\$str));
        return new self((int) \\\$amount, strtoupper(\\\$currency));
    }

    public function toString(): string {
        return "\\\$this->amount \\\$this->currency";
    }
}`,
      hints: [
        'Private constructor forces use of named constructors',
        'Each static method creates a new self() with specific params',
        'fromString splits the input and creates an instance',
      ],
      concepts: ['value-objects', 'static-factory', 'named-constructors'],
    },
    {
      id: 'php-factory-10',
      title: 'Abstract Factory Implementation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a complete abstract factory pattern for database connections: an interface DBFactory with createConnection() and createQueryBuilder(), and a MySQLFactory implementation.',
      skeleton: `<?php
interface Connection {
    public function connect(): void;
}
interface QueryBuilder {
    public function select(string \\\$table): string;
}

// Write DBFactory interface
// Write MySQLConnection and MySQLQueryBuilder
// Write MySQLFactory implementing DBFactory`,
      solution: `<?php
interface Connection {
    public function connect(): void;
}

interface QueryBuilder {
    public function select(string \\\$table): string;
}

interface DBFactory {
    public function createConnection(): Connection;
    public function createQueryBuilder(): QueryBuilder;
}

class MySQLConnection implements Connection {
    public function connect(): void {
        // MySQL connection logic
    }
}

class MySQLQueryBuilder implements QueryBuilder {
    public function select(string \\\$table): string {
        return "SELECT * FROM \\\$table";
    }
}

class MySQLFactory implements DBFactory {
    public function createConnection(): Connection {
        return new MySQLConnection();
    }

    public function createQueryBuilder(): QueryBuilder {
        return new MySQLQueryBuilder();
    }
}`,
      hints: [
        'Define the abstract factory interface with create methods',
        'Create concrete product classes for MySQL',
        'The concrete factory returns MySQL-specific products',
      ],
      concepts: ['abstract-factory', 'interface', 'database'],
    },
    {
      id: 'php-factory-11',
      title: 'Factory with Closure Builders',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a factory that accepts closures as builders. register() takes a name and a closure, create() calls the closure to build the object.',
      skeleton: `<?php
class ContainerFactory {
    // register(string \\\$name, Closure \\\$builder): void
    // create(string \\\$name): object
}`,
      solution: `<?php
class ContainerFactory {
    private array \\\$builders = [];

    public function register(string \\\$name, \\Closure \\\$builder): void {
        \\\$this->builders[\\\$name] = \\\$builder;
    }

    public function create(string \\\$name): object {
        if (!isset(\\\$this->builders[\\\$name])) {
            throw new RuntimeException("No builder registered for '\\\$name'");
        }
        return (\\\$this->builders[\\\$name])();
    }
}`,
      hints: [
        'Store closures in an associative array',
        'Each closure is a builder that creates an object',
        'Call the closure with () to get the result',
      ],
      concepts: ['factory', 'closures', 'lazy-creation'],
    },
    {
      id: 'php-factory-12',
      title: 'Factory with Validation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a UserFactory with a create method that validates email and age before creating a User object. Throw InvalidArgumentException on invalid data.',
      skeleton: `<?php
class User {
    public function __construct(
        public string \\\$name,
        public string \\\$email,
        public int \\\$age
    ) {}
}

class UserFactory {
    // create(string \\\$name, string \\\$email, int \\\$age): User
    // Validate email format and age range 0-150
}`,
      solution: `<?php
class User {
    public function __construct(
        public string \\\$name,
        public string \\\$email,
        public int \\\$age
    ) {}
}

class UserFactory {
    public static function create(string \\\$name, string \\\$email, int \\\$age): User {
        if (!filter_var(\\\$email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException('Invalid email format');
        }
        if (\\\$age < 0 || \\\$age > 150) {
            throw new InvalidArgumentException('Age must be between 0 and 150');
        }
        return new User(\\\$name, \\\$email, \\\$age);
    }
}`,
      hints: [
        'Validate inputs before creating the object',
        'Use filter_var for email validation',
        'Throw exceptions for invalid data',
      ],
      concepts: ['factory', 'validation', 'exceptions'],
    },
    {
      id: 'php-factory-13',
      title: 'Fix Factory Missing Default Case',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the factory that crashes with an UnhandledMatchError for unknown types.',
      skeleton: `<?php
class PaymentFactory {
    public static function create(string \\\$method): PaymentInterface {
        return match (\\\$method) {
            'credit' => new CreditCardPayment(),
            'paypal' => new PayPalPayment(),
        };
    }
}

// Bug: PaymentFactory::create('bitcoin') throws UnhandledMatchError`,
      solution: `<?php
class PaymentFactory {
    public static function create(string \\\$method): PaymentInterface {
        return match (\\\$method) {
            'credit' => new CreditCardPayment(),
            'paypal' => new PayPalPayment(),
            default => throw new InvalidArgumentException("Unknown payment method: \\\$method"),
        };
    }
}`,
      hints: [
        'match without a default case throws UnhandledMatchError',
        'Add a default case with a descriptive exception',
        'Use InvalidArgumentException for unknown types',
      ],
      concepts: ['factory', 'match-expression', 'error-handling'],
    },
    {
      id: 'php-factory-14',
      title: 'Fix Factory Returning Wrong Type',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the factory method in the child class that returns an incompatible type.',
      skeleton: `<?php
interface Animal {
    public function speak(): string;
}

class Dog implements Animal {
    public function speak(): string { return 'Woof'; }
}

abstract class AnimalFactory {
    abstract public function create(): Animal;
}

class DogFactory extends AnimalFactory {
    // Bug: returns string instead of Animal
    public function create(): string {
        return 'Dog';
    }
}`,
      solution: `<?php
interface Animal {
    public function speak(): string;
}

class Dog implements Animal {
    public function speak(): string { return 'Woof'; }
}

abstract class AnimalFactory {
    abstract public function create(): Animal;
}

class DogFactory extends AnimalFactory {
    public function create(): Animal {
        return new Dog();
    }
}`,
      hints: [
        'The return type must match the abstract method',
        'create() should return an Animal, not a string',
        'Return new Dog() which implements Animal',
      ],
      concepts: ['factory-method', 'return-types', 'debugging'],
    },
    {
      id: 'php-factory-15',
      title: 'Fix Static Factory Creating Multiple Instances',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the static factory that should cache instances but creates new ones every time.',
      skeleton: `<?php
class DatabaseConnection {
    private static array \\\$connections = [];

    private function __construct(private string \\\$name) {}

    public static function create(string \\\$name): self {
        // Bug: ignores cache and always creates new
        \\\$connection = new self(\\\$name);
        self::\\\$connections[\\\$name] = \\\$connection;
        return \\\$connection;
    }

    public function getName(): string {
        return \\\$this->name;
    }
}`,
      solution: `<?php
class DatabaseConnection {
    private static array \\\$connections = [];

    private function __construct(private string \\\$name) {}

    public static function create(string \\\$name): self {
        if (!isset(self::\\\$connections[\\\$name])) {
            self::\\\$connections[\\\$name] = new self(\\\$name);
        }
        return self::\\\$connections[\\\$name];
    }

    public function getName(): string {
        return \\\$this->name;
    }
}`,
      hints: [
        'Check if the connection already exists before creating',
        'Use isset() to check the cache first',
        'Only create a new instance if not cached',
      ],
      concepts: ['factory', 'caching', 'flyweight'],
    },
    {
      id: 'php-factory-16',
      title: 'Predict Factory Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the output of the factory method.',
      skeleton: `<?php
class Greeting {
    private function __construct(private string \\\$message) {}

    public static function hello(string \\\$name): self {
        return new self("Hello, \\\$name!");
    }

    public function getMessage(): string {
        return \\\$this->message;
    }
}

echo Greeting::hello('World')->getMessage();`,
      solution: `Hello, World!`,
      hints: [
        'hello() creates a new Greeting with the formatted message',
        'getMessage() returns the stored message',
        'Method chaining calls getMessage on the result of hello()',
      ],
      concepts: ['static-factory', 'method-chaining'],
    },
    {
      id: 'php-factory-17',
      title: 'Predict Abstract Factory Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict which concrete class is instantiated by the factory.',
      skeleton: `<?php
interface Shape { public function type(): string; }
class Circle implements Shape { public function type(): string { return 'circle'; } }
class Square implements Shape { public function type(): string { return 'square'; } }

class ShapeFactory {
    public static function create(string \\\$type): Shape {
        return match(\\\$type) {
            'circle' => new Circle(),
            'square' => new Square(),
        };
    }
}

\\\$shape = ShapeFactory::create('circle');
echo \\\$shape->type();`,
      solution: `circle`,
      hints: [
        'The factory creates a Circle when passed "circle"',
        'Circle::type() returns "circle"',
        'The match expression selects the right class',
      ],
      concepts: ['factory', 'polymorphism'],
    },
    {
      id: 'php-factory-18',
      title: 'Predict Cached Factory Identity',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict whether the cached factory returns the same instance.',
      skeleton: `<?php
class Pool {
    private static array \\\$items = [];
    private function __construct(private string \\\$id) {}
    public static function get(string \\\$id): self {
        if (!isset(self::\\\$items[\\\$id])) {
            self::\\\$items[\\\$id] = new self(\\\$id);
        }
        return self::\\\$items[\\\$id];
    }
}
\\\$a = Pool::get('main');
\\\$b = Pool::get('main');
\\\$c = Pool::get('other');
var_dump(\\\$a === \\\$b);
var_dump(\\\$a === \\\$c);`,
      solution: `bool(true)
bool(false)`,
      hints: [
        'Same ID returns the cached instance',
        'Different IDs create different instances',
        '\$a and \$b use "main", \$c uses "other"',
      ],
      concepts: ['factory', 'caching', 'object-identity'],
    },
    {
      id: 'php-factory-19',
      title: 'Refactor Switch to Factory',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the switch-based creation logic into a proper factory class.',
      skeleton: `<?php
function createExporter(string \\\$format, array \\\$data): string {
    switch (\\\$format) {
        case 'json':
            return json_encode(\\\$data);
        case 'csv':
            \\\$lines = [];
            foreach (\\\$data as \\\$row) {
                \\\$lines[] = implode(',', \\\$row);
            }
            return implode("\\n", \\\$lines);
        case 'xml':
            \\\$xml = '<data>';
            foreach (\\\$data as \\\$row) {
                \\\$xml .= '<row>' . implode('', array_map(fn(\\\$v) => "<v>\\\$v</v>", \\\$row)) . '</row>';
            }
            return \\\$xml . '</data>';
        default:
            throw new InvalidArgumentException("Unknown format: \\\$format");
    }
}`,
      solution: `<?php
interface Exporter {
    public function export(array \\\$data): string;
}

class JsonExporter implements Exporter {
    public function export(array \\\$data): string {
        return json_encode(\\\$data);
    }
}

class CsvExporter implements Exporter {
    public function export(array \\\$data): string {
        \\\$lines = [];
        foreach (\\\$data as \\\$row) {
            \\\$lines[] = implode(',', \\\$row);
        }
        return implode("\\n", \\\$lines);
    }
}

class XmlExporter implements Exporter {
    public function export(array \\\$data): string {
        \\\$xml = '<data>';
        foreach (\\\$data as \\\$row) {
            \\\$xml .= '<row>' . implode('', array_map(fn(\\\$v) => "<v>\\\$v</v>", \\\$row)) . '</row>';
        }
        return \\\$xml . '</data>';
    }
}

class ExporterFactory {
    public static function create(string \\\$format): Exporter {
        return match (\\\$format) {
            'json' => new JsonExporter(),
            'csv' => new CsvExporter(),
            'xml' => new XmlExporter(),
            default => throw new InvalidArgumentException("Unknown format: \\\$format"),
        };
    }
}`,
      hints: [
        'Extract each case into its own class implementing an interface',
        'Create an Exporter interface with an export method',
        'Use a factory to create the right exporter',
      ],
      concepts: ['factory', 'refactoring', 'open-closed-principle'],
    },
    {
      id: 'php-factory-20',
      title: 'Refactor Constructor Overloading to Named Factories',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the class with complex constructor logic into clean named factory methods.',
      skeleton: `<?php
class DateRange {
    public \\DateTimeImmutable \\\$start;
    public \\DateTimeImmutable \\\$end;

    // Messy constructor tries to handle multiple creation patterns
    public function __construct(mixed \\\$start, mixed \\\$end = null) {
        if (is_string(\\\$start) && is_string(\\\$end)) {
            \\\$this->start = new \\DateTimeImmutable(\\\$start);
            \\\$this->end = new \\DateTimeImmutable(\\\$end);
        } elseif (\\\$start instanceof \\DateTimeImmutable && \\\$end instanceof \\DateTimeImmutable) {
            \\\$this->start = \\\$start;
            \\\$this->end = \\\$end;
        } elseif (is_int(\\\$start)) {
            \\\$this->start = new \\DateTimeImmutable();
            \\\$this->end = \\\$this->start->modify("+\\\$start days");
        } else {
            throw new InvalidArgumentException('Invalid arguments');
        }
    }
}`,
      solution: `<?php
class DateRange {
    private function __construct(
        public \\DateTimeImmutable \\\$start,
        public \\DateTimeImmutable \\\$end
    ) {}

    public static function fromStrings(string \\\$start, string \\\$end): self {
        return new self(
            new \\DateTimeImmutable(\\\$start),
            new \\DateTimeImmutable(\\\$end)
        );
    }

    public static function fromDates(\\DateTimeImmutable \\\$start, \\DateTimeImmutable \\\$end): self {
        return new self(\\\$start, \\\$end);
    }

    public static function nextDays(int \\\$days): self {
        \\\$start = new \\DateTimeImmutable();
        return new self(\\\$start, \\\$start->modify("+\\\$days days"));
    }
}`,
      hints: [
        'Replace the overloaded constructor with static factory methods',
        'Each method has a clear name describing what it creates from',
        'Make the constructor private to force use of factories',
      ],
      concepts: ['named-constructors', 'refactoring', 'clean-code'],
    },
  ],
};
