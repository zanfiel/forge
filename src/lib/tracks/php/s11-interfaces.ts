import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-iface',
  title: '11. Interfaces',
  explanation: `## Interfaces in PHP

An **interface** defines a contract that classes must follow. It declares method signatures without implementations.

\`\`\`php
interface Loggable {
    public function log(string \$message): void;
}

class FileLogger implements Loggable {
    public function log(string \$message): void {
        file_put_contents('log.txt', \$message, FILE_APPEND);
    }
}
\`\`\`

### Key Rules
- All interface methods are implicitly **public** and **abstract**
- A class can implement **multiple** interfaces
- Interfaces can define **constants** (but not properties)
- Interfaces can **extend** other interfaces

\`\`\`php
interface Readable {
    public function read(): string;
}

interface Writable {
    public function write(string \$data): void;
}

interface ReadWritable extends Readable, Writable {
    // inherits both read() and write()
}

class Stream implements ReadWritable {
    private string \$buffer = '';

    public function read(): string {
        return \$this->buffer;
    }

    public function write(string \$data): void {
        \$this->buffer .= \$data;
    }
}
\`\`\`

### Type Hints with Interfaces
Interfaces serve as **type hints**, enabling polymorphism:

\`\`\`php
function process(Loggable \$logger): void {
    \$logger->log('Processing...');
}
\`\`\`

### Constants in Interfaces
\`\`\`php
interface HttpStatus {
    const OK = 200;
    const NOT_FOUND = 404;
}
\`\`\``,
  exercises: [
    {
      id: 'php-iface-1',
      title: 'Declare a Basic Interface',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blanks to declare an interface with a single method.',
      skeleton: `<?php
___ Printable {
    public function ___(): string;
}`,
      solution: `<?php
interface Printable {
    public function toString(): string;
}`,
      hints: [
        'Use the "interface" keyword to declare an interface.',
        'Interface methods have no body - just the signature followed by a semicolon.',
        'Name the method toString as it returns a string.',
      ],
      concepts: ['interface-declaration', 'method-signature'],
    },
    {
      id: 'php-iface-2',
      title: 'Implement an Interface',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blanks so the class correctly implements the interface.',
      skeleton: `<?php
interface Shape {
    public function area(): float;
}

class Circle ___ Shape {
    public function __construct(private float \$radius) {}

    public function ___(): float {
        return M_PI * \$this->radius ** 2;
    }
}`,
      solution: `<?php
interface Shape {
    public function area(): float;
}

class Circle implements Shape {
    public function __construct(private float \$radius) {}

    public function area(): float {
        return M_PI * \$this->radius ** 2;
    }
}`,
      hints: [
        'Use the "implements" keyword to adopt an interface.',
        'The method name must match the interface declaration exactly.',
        'The return type must also match - float in this case.',
      ],
      concepts: ['implements', 'interface-contract'],
    },
    {
      id: 'php-iface-3',
      title: 'Interface Type Hint',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to type-hint the parameter with an interface.',
      skeleton: `<?php
interface Cacheable {
    public function cacheKey(): string;
}

function store(___ \$item): void {
    \$key = \$item->cacheKey();
    echo "Stored with key: \$key";
}`,
      solution: `<?php
interface Cacheable {
    public function cacheKey(): string;
}

function store(Cacheable \$item): void {
    \$key = \$item->cacheKey();
    echo "Stored with key: \$key";
}`,
      hints: [
        'Type-hint the parameter using the interface name.',
        'Any object implementing Cacheable can be passed.',
        'The interface name acts like a type.',
      ],
      concepts: ['type-hint', 'polymorphism'],
    },
    {
      id: 'php-iface-4',
      title: 'Multiple Interface Implementation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to implement two interfaces.',
      skeleton: `<?php
interface Serializable {
    public function serialize(): string;
}

interface Displayable {
    public function display(): void;
}

class User ___ Serializable, ___ {
    public function __construct(private string \$name) {}

    public function serialize(): string {
        return json_encode(['name' => \$this->name]);
    }

    public function display(): void {
        echo \$this->name;
    }
}`,
      solution: `<?php
interface Serializable {
    public function serialize(): string;
}

interface Displayable {
    public function display(): void;
}

class User implements Serializable, Displayable {
    public function __construct(private string \$name) {}

    public function serialize(): string {
        return json_encode(['name' => \$this->name]);
    }

    public function display(): void {
        echo \$this->name;
    }
}`,
      hints: [
        'Use "implements" followed by a comma-separated list.',
        'Both interfaces must be listed after implements.',
        'All methods from both interfaces must be implemented.',
      ],
      concepts: ['multiple-interfaces', 'implements'],
    },
    {
      id: 'php-iface-5',
      title: 'Interface Constants',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to define and use interface constants.',
      skeleton: `<?php
interface Color {
    ___ RED = '#FF0000';
    ___ BLUE = '#0000FF';
}

class Palette implements Color {
    public function getRed(): string {
        return self::___;
    }
}`,
      solution: `<?php
interface Color {
    const RED = '#FF0000';
    const BLUE = '#0000FF';
}

class Palette implements Color {
    public function getRed(): string {
        return self::RED;
    }
}`,
      hints: [
        'Interface constants use the "const" keyword.',
        'Access constants via self:: or the interface name.',
        'Interface constants cannot be overridden by implementing classes.',
      ],
      concepts: ['interface-constants', 'const'],
    },
    {
      id: 'php-iface-6',
      title: 'Extending Interfaces',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to extend one interface from another.',
      skeleton: `<?php
interface Readable {
    public function read(): string;
}

interface Streamable ___ Readable {
    public function seek(int \$position): void;
}`,
      solution: `<?php
interface Readable {
    public function read(): string;
}

interface Streamable extends Readable {
    public function seek(int \$position): void;
}`,
      hints: [
        'Interfaces extend other interfaces with the "extends" keyword.',
        'This is different from classes which use "implements".',
        'Streamable now requires both read() and seek().',
      ],
      concepts: ['interface-extension', 'extends'],
    },
    {
      id: 'php-iface-7',
      title: 'Write a Repository Interface and Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write an interface Repository with methods find(int $id): ?string and save(string $data): void. Then write a class MemoryRepository that implements it using an array.',
      skeleton: `<?php
// Write the Repository interface and MemoryRepository class`,
      solution: `<?php
interface Repository {
    public function find(int \$id): ?string;
    public function save(string \$data): void;
}

class MemoryRepository implements Repository {
    private array \$store = [];
    private int \$nextId = 1;

    public function find(int \$id): ?string {
        return \$this->store[\$id] ?? null;
    }

    public function save(string \$data): void {
        \$this->store[\$this->nextId++] = \$data;
    }
}`,
      hints: [
        'The interface declares method signatures with no body.',
        'MemoryRepository needs an internal array to store data.',
        'Use ?? null to return null when a key is not found.',
      ],
      concepts: ['interface-declaration', 'implements', 'repository-pattern'],
    },
    {
      id: 'php-iface-8',
      title: 'Write a Comparable Interface',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write an interface Comparable with a method compareTo(mixed $other): int. Then write a class Temperature that implements it, comparing by degrees.',
      skeleton: `<?php
// Write the Comparable interface and Temperature class`,
      solution: `<?php
interface Comparable {
    public function compareTo(mixed \$other): int;
}

class Temperature implements Comparable {
    public function __construct(private float \$degrees) {}

    public function compareTo(mixed \$other): int {
        return \$this->degrees <=> \$other->degrees;
    }

    public function getDegrees(): float {
        return \$this->degrees;
    }
}`,
      hints: [
        'The compareTo method returns -1, 0, or 1.',
        'Use the spaceship operator <=> for comparison.',
        'Temperature stores degrees as a float property.',
      ],
      concepts: ['comparable-pattern', 'spaceship-operator', 'interface'],
    },
    {
      id: 'php-iface-9',
      title: 'Write an EventListener System',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write an interface EventListener with method handle(string $event): void. Write a class EventDispatcher with methods addListener(EventListener $l): void and dispatch(string $event): void that calls handle on all listeners.',
      skeleton: `<?php
// Write EventListener interface and EventDispatcher class`,
      solution: `<?php
interface EventListener {
    public function handle(string \$event): void;
}

class EventDispatcher {
    private array \$listeners = [];

    public function addListener(EventListener \$listener): void {
        \$this->listeners[] = \$listener;
    }

    public function dispatch(string \$event): void {
        foreach (\$this->listeners as \$listener) {
            \$listener->handle(\$event);
        }
    }
}`,
      hints: [
        'Store listeners in an array property.',
        'addListener appends to the array.',
        'dispatch loops through all listeners calling handle().',
      ],
      concepts: ['observer-pattern', 'interface-type-hint', 'event-system'],
    },
    {
      id: 'php-iface-10',
      title: 'Write a Middleware Interface',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write an interface Middleware with method process(string $request, callable $next): string. Write a class TrimMiddleware that trims the request string before passing to $next.',
      skeleton: `<?php
// Write Middleware interface and TrimMiddleware class`,
      solution: `<?php
interface Middleware {
    public function process(string \$request, callable \$next): string;
}

class TrimMiddleware implements Middleware {
    public function process(string \$request, callable \$next): string {
        \$trimmed = trim(\$request);
        return \$next(\$trimmed);
    }
}`,
      hints: [
        'The process method receives a request and a callable for the next step.',
        'Use trim() to strip whitespace from the request.',
        'Call $next with the trimmed value and return its result.',
      ],
      concepts: ['middleware-pattern', 'callable', 'interface'],
    },
    {
      id: 'php-iface-11',
      title: 'Write a Countable and Iterable Collection',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a class NumberList that implements both Countable and IteratorAggregate. It wraps an array of integers.',
      skeleton: `<?php
// Write NumberList implementing Countable and IteratorAggregate`,
      solution: `<?php
class NumberList implements Countable, IteratorAggregate {
    private array \$numbers;

    public function __construct(int ...\$numbers) {
        \$this->numbers = \$numbers;
    }

    public function count(): int {
        return count(\$this->numbers);
    }

    public function getIterator(): ArrayIterator {
        return new ArrayIterator(\$this->numbers);
    }
}`,
      hints: [
        'Countable requires a count(): int method.',
        'IteratorAggregate requires a getIterator() method.',
        'Return a new ArrayIterator wrapping the internal array.',
      ],
      concepts: ['countable', 'iterator-aggregate', 'spl-interfaces'],
    },
    {
      id: 'php-iface-12',
      title: 'Write a Stringable Class',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Write a class Money that implements the Stringable interface. It should store amount (float) and currency (string) and return a formatted string like "$9.99".',
      skeleton: `<?php
// Write Money class implementing Stringable`,
      solution: `<?php
class Money implements Stringable {
    public function __construct(
        private float \$amount,
        private string \$currency = '\$'
    ) {}

    public function __toString(): string {
        return \$this->currency . number_format(\$this->amount, 2);
    }
}`,
      hints: [
        'Stringable requires a __toString(): string method.',
        'Use number_format() to format the amount to 2 decimal places.',
        'Concatenate the currency symbol with the formatted amount.',
      ],
      concepts: ['stringable', 'magic-method', '__toString'],
    },
    {
      id: 'php-iface-13',
      title: 'Fix Missing Interface Method',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the bug so the class properly implements the interface.',
      skeleton: `<?php
interface Validator {
    public function validate(mixed \$value): bool;
    public function getMessage(): string;
}

class EmailValidator implements Validator {
    public function validate(mixed \$value): bool {
        return filter_var(\$value, FILTER_VALIDATE_EMAIL) !== false;
    }
}`,
      solution: `<?php
interface Validator {
    public function validate(mixed \$value): bool;
    public function getMessage(): string;
}

class EmailValidator implements Validator {
    public function validate(mixed \$value): bool {
        return filter_var(\$value, FILTER_VALIDATE_EMAIL) !== false;
    }

    public function getMessage(): string {
        return 'Invalid email address.';
    }
}`,
      hints: [
        'The class claims to implement Validator but is missing a method.',
        'Check which methods the interface requires.',
        'getMessage() is declared in the interface but not implemented.',
      ],
      concepts: ['interface-contract', 'fatal-error', 'missing-method'],
    },
    {
      id: 'php-iface-14',
      title: 'Fix Return Type Mismatch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the return type so the implementation matches the interface.',
      skeleton: `<?php
interface Formatter {
    public function format(string \$input): string;
}

class UpperFormatter implements Formatter {
    public function format(string \$input): void {
        echo strtoupper(\$input);
    }
}`,
      solution: `<?php
interface Formatter {
    public function format(string \$input): string;
}

class UpperFormatter implements Formatter {
    public function format(string \$input): string {
        return strtoupper(\$input);
    }
}`,
      hints: [
        'The interface declares format() returns string.',
        'The class declares void and uses echo instead of return.',
        'Change the return type to string and use return instead of echo.',
      ],
      concepts: ['return-type', 'interface-compliance', 'type-mismatch'],
    },
    {
      id: 'php-iface-15',
      title: 'Fix Interface Visibility Error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the visibility issue in the implementing class.',
      skeleton: `<?php
interface Renderer {
    public function render(): string;
}

class HtmlRenderer implements Renderer {
    protected function render(): string {
        return '<p>Hello</p>';
    }
}`,
      solution: `<?php
interface Renderer {
    public function render(): string;
}

class HtmlRenderer implements Renderer {
    public function render(): string {
        return '<p>Hello</p>';
    }
}`,
      hints: [
        'Interface methods are implicitly public.',
        'Implementing methods cannot reduce visibility.',
        'Change protected to public.',
      ],
      concepts: ['visibility', 'interface-rules', 'access-modifier'],
    },
    {
      id: 'php-iface-16',
      title: 'Predict Interface instanceof',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict what this code outputs.',
      skeleton: `<?php
interface Animal {
    public function speak(): string;
}

class Dog implements Animal {
    public function speak(): string { return 'Woof'; }
}

\$d = new Dog();
echo \$d instanceof Animal ? 'yes' : 'no';
echo ' ';
echo \$d instanceof Dog ? 'yes' : 'no';`,
      solution: `yes yes`,
      hints: [
        'instanceof checks if an object is an instance of a class or implements an interface.',
        'Dog implements Animal, so both checks are true.',
        'A space is echoed between the two results.',
      ],
      concepts: ['instanceof', 'interface-check', 'polymorphism'],
    },
    {
      id: 'php-iface-17',
      title: 'Predict Interface Constant Access',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict what this code outputs.',
      skeleton: `<?php
interface Config {
    const VERSION = '2.0';
    const NAME = 'App';
}

class MyApp implements Config {}

echo Config::VERSION . '-' . MyApp::NAME;`,
      solution: `2.0-App`,
      hints: [
        'Interface constants are accessible via the interface name or implementing class.',
        'Config::VERSION gives "2.0" and MyApp::NAME gives "App".',
        'They are concatenated with a hyphen.',
      ],
      concepts: ['interface-constants', 'constant-access', 'scope-resolution'],
    },
    {
      id: 'php-iface-18',
      title: 'Predict Extended Interface',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict what this code outputs.',
      skeleton: `<?php
interface A {
    public function hello(): string;
}

interface B extends A {
    public function world(): string;
}

class C implements B {
    public function hello(): string { return 'Hello'; }
    public function world(): string { return 'World'; }
}

\$c = new C();
echo \$c->hello() . ' ' . \$c->world();
echo ' ' . (\$c instanceof A ? 'A' : '');`,
      solution: `Hello World A`,
      hints: [
        'B extends A, so C must implement both hello() and world().',
        'C implements B which extends A, so C is also an instance of A.',
        'The output is "Hello World A".',
      ],
      concepts: ['interface-extension', 'instanceof', 'inheritance-chain'],
    },
    {
      id: 'php-iface-19',
      title: 'Refactor to Use an Interface',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the code to extract a common interface and type-hint the function parameter with it.',
      skeleton: `<?php
class EmailNotifier {
    public function send(string \$message): void {
        echo "Email: \$message";
    }
}

class SmsNotifier {
    public function send(string \$message): void {
        echo "SMS: \$message";
    }
}

function notify(object \$notifier, string \$msg): void {
    \$notifier->send(\$msg);
}`,
      solution: `<?php
interface Notifier {
    public function send(string \$message): void;
}

class EmailNotifier implements Notifier {
    public function send(string \$message): void {
        echo "Email: \$message";
    }
}

class SmsNotifier implements Notifier {
    public function send(string \$message): void {
        echo "SMS: \$message";
    }
}

function notify(Notifier \$notifier, string \$msg): void {
    \$notifier->send(\$msg);
}`,
      hints: [
        'Both classes share the same send() method signature.',
        'Extract a Notifier interface with that method.',
        'Type-hint the function parameter as Notifier instead of object.',
      ],
      concepts: ['extract-interface', 'dependency-inversion', 'type-safety'],
    },
    {
      id: 'php-iface-20',
      title: 'Refactor Concrete Dependency to Interface',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the class to depend on an interface instead of a concrete class, applying dependency inversion.',
      skeleton: `<?php
class MysqlDatabase {
    public function query(string \$sql): array {
        return ['result'];
    }
}

class UserService {
    private MysqlDatabase \$db;

    public function __construct() {
        \$this->db = new MysqlDatabase();
    }

    public function getUsers(): array {
        return \$this->db->query('SELECT * FROM users');
    }
}`,
      solution: `<?php
interface Database {
    public function query(string \$sql): array;
}

class MysqlDatabase implements Database {
    public function query(string \$sql): array {
        return ['result'];
    }
}

class UserService {
    public function __construct(private Database \$db) {}

    public function getUsers(): array {
        return \$this->db->query('SELECT * FROM users');
    }
}`,
      hints: [
        'Extract a Database interface from MysqlDatabase.',
        'Inject the Database interface via constructor instead of creating MysqlDatabase internally.',
        'Use constructor promotion for cleaner code.',
      ],
      concepts: ['dependency-inversion', 'constructor-injection', 'interface-segregation'],
    },
  ],
};
