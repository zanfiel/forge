import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-abstract',
  title: '13. Abstract Classes',
  explanation: `## Abstract Classes in PHP

An **abstract class** cannot be instantiated directly. It serves as a blueprint that defines both concrete methods (with implementations) and abstract methods (without implementations) that child classes must implement.

\`\`\`php
abstract class Shape {
    abstract public function area(): float;

    public function describe(): string {
        return 'Area: ' . \$this->area();
    }
}

class Rectangle extends Shape {
    public function __construct(
        private float \$width,
        private float \$height
    ) {}

    public function area(): float {
        return \$this->width * \$this->height;
    }
}
\`\`\`

### Key Differences from Interfaces
- Abstract classes can have **properties**, **constructors**, and **concrete methods**
- A class can only extend **one** abstract class (single inheritance)
- Methods can have any **visibility** (not just public)
- Abstract classes can have **state** (instance variables)

### Template Method Pattern
A powerful pattern where the abstract class defines the algorithm skeleton:

\`\`\`php
abstract class DataProcessor {
    // Template method - defines the algorithm
    public function process(): string {
        \$data = \$this->fetch();
        \$transformed = \$this->transform(\$data);
        return \$this->format(\$transformed);
    }

    abstract protected function fetch(): array;
    abstract protected function transform(array \$data): array;
    abstract protected function format(array \$data): string;
}
\`\`\`

### Abstract + Concrete
Abstract classes can mix abstract and concrete methods:

\`\`\`php
abstract class BaseModel {
    protected array \$attributes = [];

    public function get(string \$key): mixed {
        return \$this->attributes[\$key] ?? null;
    }

    abstract public function tableName(): string;
}
\`\`\``,
  exercises: [
    {
      id: 'php-abstract-1',
      title: 'Declare an Abstract Class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blanks to declare an abstract class with an abstract method.',
      skeleton: `<?php
___ class Animal {
    ___ public function speak(): string;
}`,
      solution: `<?php
abstract class Animal {
    abstract public function speak(): string;
}`,
      hints: [
        'Use the "abstract" keyword before "class".',
        'Abstract methods also need the "abstract" keyword.',
        'Abstract methods have no body - just a semicolon.',
      ],
      concepts: ['abstract-class', 'abstract-method'],
    },
    {
      id: 'php-abstract-2',
      title: 'Extend an Abstract Class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blanks to extend the abstract class and implement the method.',
      skeleton: `<?php
abstract class Vehicle {
    abstract public function fuelType(): string;
}

class ElectricCar ___ Vehicle {
    public function ___(): string {
        return 'Electric';
    }
}`,
      solution: `<?php
abstract class Vehicle {
    abstract public function fuelType(): string;
}

class ElectricCar extends Vehicle {
    public function fuelType(): string {
        return 'Electric';
    }
}`,
      hints: [
        'Use "extends" to inherit from an abstract class.',
        'The method name must match the abstract declaration.',
        'fuelType() must be implemented in the child class.',
      ],
      concepts: ['extends', 'implementation', 'abstract-contract'],
    },
    {
      id: 'php-abstract-3',
      title: 'Concrete Method in Abstract Class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to call the abstract method from a concrete method.',
      skeleton: `<?php
abstract class Formatter {
    abstract protected function formatValue(string \$val): string;

    public function format(string \$val): string {
        return '[' . \$this->___(\$val) . ']';
    }
}`,
      solution: `<?php
abstract class Formatter {
    abstract protected function formatValue(string \$val): string;

    public function format(string \$val): string {
        return '[' . \$this->formatValue(\$val) . ']';
    }
}`,
      hints: [
        'The concrete method calls the abstract method.',
        'Use $this-> to call the method.',
        'The abstract method name is formatValue.',
      ],
      concepts: ['template-method', 'concrete-abstract-mix'],
    },
    {
      id: 'php-abstract-4',
      title: 'Abstract with Constructor',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks for the abstract class constructor and child class.',
      skeleton: `<?php
abstract class Database {
    public function __construct(protected string \$___) {}

    abstract public function connect(): string;
}

class Mysql extends Database {
    public function connect(): string {
        return 'Connected to ' . \$this->___;
    }
}`,
      solution: `<?php
abstract class Database {
    public function __construct(protected string \$host) {}

    abstract public function connect(): string;
}

class Mysql extends Database {
    public function connect(): string {
        return 'Connected to ' . \$this->host;
    }
}`,
      hints: [
        'The constructor stores a host string.',
        'The child class accesses the protected property.',
        'Both blanks refer to the same property name.',
      ],
      concepts: ['abstract-constructor', 'protected-property', 'inheritance'],
    },
    {
      id: 'php-abstract-5',
      title: 'Abstract with Type Hints',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks with the correct return types.',
      skeleton: `<?php
abstract class Collection {
    protected array \$items = [];

    public function count(): ___ {
        return count(\$this->items);
    }

    abstract public function add(mixed \$item): ___;
    abstract public function first(): ___;
}`,
      solution: `<?php
abstract class Collection {
    protected array \$items = [];

    public function count(): int {
        return count(\$this->items);
    }

    abstract public function add(mixed \$item): void;
    abstract public function first(): mixed;
}`,
      hints: [
        'count() returns an integer.',
        'add() does not return anything - use void.',
        'first() could return any type - use mixed.',
      ],
      concepts: ['return-types', 'void', 'mixed'],
    },
    {
      id: 'php-abstract-6',
      title: 'Abstract Class Implementing Interface',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Fill in the blanks so the abstract class implements the interface partially.',
      skeleton: `<?php
interface Exportable {
    public function toArray(): array;
    public function toJson(): string;
}

___ class BaseExport implements ___ {
    public function toJson(): string {
        return json_encode(\$this->toArray());
    }
}`,
      solution: `<?php
interface Exportable {
    public function toArray(): array;
    public function toJson(): string;
}

abstract class BaseExport implements Exportable {
    public function toJson(): string {
        return json_encode(\$this->toArray());
    }
}`,
      hints: [
        'An abstract class can implement an interface.',
        'It can leave some interface methods unimplemented for child classes.',
        'toArray() is left abstract (implicitly) for subclasses.',
      ],
      concepts: ['abstract-implements-interface', 'partial-implementation'],
    },
    {
      id: 'php-abstract-7',
      title: 'Write a Template Method Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write an abstract class Report with abstract methods gatherData(): array and formatRow(string $row): string. Add a concrete generate() method that calls gatherData, maps formatRow over each element, and implodes with newlines.',
      skeleton: `<?php
// Write the abstract Report class`,
      solution: `<?php
abstract class Report {
    abstract protected function gatherData(): array;
    abstract protected function formatRow(string \$row): string;

    public function generate(): string {
        \$data = \$this->gatherData();
        \$formatted = array_map(fn(string \$row) => \$this->formatRow(\$row), \$data);
        return implode("\\n", \$formatted);
    }
}`,
      hints: [
        'The template method is generate() which orchestrates the steps.',
        'Use array_map to apply formatRow to each element.',
        'Use implode with "\\n" to join the results.',
      ],
      concepts: ['template-method-pattern', 'array_map', 'abstract-class'],
    },
    {
      id: 'php-abstract-8',
      title: 'Write Abstract Cache Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write an abstract class Cache with abstract methods get(string $key): ?string and set(string $key, string $value): void. Add a concrete method has(string $key): bool that returns true if get() is not null.',
      skeleton: `<?php
// Write the abstract Cache class`,
      solution: `<?php
abstract class Cache {
    abstract public function get(string \$key): ?string;
    abstract public function set(string \$key, string \$value): void;

    public function has(string \$key): bool {
        return \$this->get(\$key) !== null;
    }
}`,
      hints: [
        'get() is nullable - returns ?string.',
        'set() returns void.',
        'has() uses get() and checks for null.',
      ],
      concepts: ['abstract-methods', 'nullable-return', 'concrete-method'],
    },
    {
      id: 'php-abstract-9',
      title: 'Write Abstract Builder',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write an abstract class QueryBuilder with a protected $table property, a concrete method table(string $name): static (sets $table and returns $this), and abstract methods select(string ...$cols): static, build(): string.',
      skeleton: `<?php
// Write the abstract QueryBuilder class`,
      solution: `<?php
abstract class QueryBuilder {
    protected string \$table = '';

    public function table(string \$name): static {
        \$this->table = \$name;
        return \$this;
    }

    abstract public function select(string ...\$cols): static;
    abstract public function build(): string;
}`,
      hints: [
        'Use "static" as return type for fluent chaining.',
        'table() is concrete and returns $this.',
        'select() and build() are abstract.',
      ],
      concepts: ['builder-pattern', 'fluent-interface', 'static-return-type'],
    },
    {
      id: 'php-abstract-10',
      title: 'Write Abstract Middleware',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write an abstract class Middleware with abstract method handle(string $request): string. Add concrete before(string $request): string (returns $request unchanged) and after(string $response): string (returns $response unchanged). Write a final process() method that calls before, handle, then after.',
      skeleton: `<?php
// Write the abstract Middleware class`,
      solution: `<?php
abstract class Middleware {
    abstract protected function handle(string \$request): string;

    protected function before(string \$request): string {
        return \$request;
    }

    protected function after(string \$response): string {
        return \$response;
    }

    public function process(string \$request): string {
        \$request = \$this->before(\$request);
        \$response = \$this->handle(\$request);
        return \$this->after(\$response);
    }
}`,
      hints: [
        'before() and after() are hooks that can be overridden.',
        'process() orchestrates the full pipeline.',
        'handle() is abstract and does the main work.',
      ],
      concepts: ['hook-method', 'template-method', 'pipeline'],
    },
    {
      id: 'php-abstract-11',
      title: 'Write Abstract Repository with CRUD',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write an abstract class AbstractRepository with abstract methods find(int $id): ?array and save(array $data): void. Add concrete findOrFail(int $id): array that calls find() and throws RuntimeException if null.',
      skeleton: `<?php
// Write the AbstractRepository class`,
      solution: `<?php
abstract class AbstractRepository {
    abstract public function find(int \$id): ?array;
    abstract public function save(array \$data): void;

    public function findOrFail(int \$id): array {
        \$result = \$this->find(\$id);
        if (\$result === null) {
            throw new RuntimeException("Record \$id not found");
        }
        return \$result;
    }
}`,
      hints: [
        'find() is abstract and returns a nullable array.',
        'findOrFail uses find() and throws on null.',
        'Use RuntimeException for the error.',
      ],
      concepts: ['repository-pattern', 'exception-throwing', 'null-check'],
    },
    {
      id: 'php-abstract-12',
      title: 'Write Abstract Validator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write an abstract class Validator with abstract rules(): array and a concrete validate(mixed $value): bool that checks all rules. Each rule is a callable returning bool.',
      skeleton: `<?php
// Write the abstract Validator class`,
      solution: `<?php
abstract class Validator {
    abstract protected function rules(): array;

    public function validate(mixed \$value): bool {
        foreach (\$this->rules() as \$rule) {
            if (!\$rule(\$value)) {
                return false;
            }
        }
        return true;
    }
}`,
      hints: [
        'rules() returns an array of callables.',
        'validate() iterates through rules, calling each with $value.',
        'Return false immediately if any rule fails.',
      ],
      concepts: ['strategy-pattern', 'callable-rules', 'abstract-class'],
    },
    {
      id: 'php-abstract-13',
      title: 'Fix Cannot Instantiate Abstract',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the error - abstract classes cannot be instantiated directly.',
      skeleton: `<?php
abstract class Logger {
    abstract public function log(string \$msg): void;
}

\$logger = new Logger();
\$logger->log('test');`,
      solution: `<?php
abstract class Logger {
    abstract public function log(string \$msg): void;
}

class ConsoleLogger extends Logger {
    public function log(string \$msg): void {
        echo \$msg;
    }
}

\$logger = new ConsoleLogger();
\$logger->log('test');`,
      hints: [
        'You cannot use "new" on an abstract class.',
        'Create a concrete subclass that implements the abstract method.',
        'Instantiate the concrete subclass instead.',
      ],
      concepts: ['cannot-instantiate-abstract', 'concrete-class', 'extends'],
    },
    {
      id: 'php-abstract-14',
      title: 'Fix Missing Abstract Implementation',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the fatal error by implementing the missing abstract method.',
      skeleton: `<?php
abstract class Notifier {
    abstract public function send(string \$to, string \$msg): void;
    abstract public function channels(): array;
}

class EmailNotifier extends Notifier {
    public function send(string \$to, string \$msg): void {
        echo "Emailing \$to: \$msg";
    }
}`,
      solution: `<?php
abstract class Notifier {
    abstract public function send(string \$to, string \$msg): void;
    abstract public function channels(): array;
}

class EmailNotifier extends Notifier {
    public function send(string \$to, string \$msg): void {
        echo "Emailing \$to: \$msg";
    }

    public function channels(): array {
        return ['email'];
    }
}`,
      hints: [
        'The abstract class has two abstract methods.',
        'EmailNotifier only implements one of them.',
        'Add the channels() method returning an array.',
      ],
      concepts: ['missing-implementation', 'abstract-contract', 'fatal-error'],
    },
    {
      id: 'php-abstract-15',
      title: 'Fix Incompatible Return Type',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the return type mismatch between parent and child.',
      skeleton: `<?php
abstract class Parser {
    abstract public function parse(string \$input): array;
}

class JsonParser extends Parser {
    public function parse(string \$input): string {
        return json_encode(json_decode(\$input, true));
    }
}`,
      solution: `<?php
abstract class Parser {
    abstract public function parse(string \$input): array;
}

class JsonParser extends Parser {
    public function parse(string \$input): array {
        return json_decode(\$input, true);
    }
}`,
      hints: [
        'The abstract method declares array as the return type.',
        'The child class returns string which is incompatible.',
        'Fix the child to return an array using json_decode with true.',
      ],
      concepts: ['return-type-mismatch', 'liskov-substitution', 'json_decode'],
    },
    {
      id: 'php-abstract-16',
      title: 'Predict Abstract Class Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict what this code outputs.',
      skeleton: `<?php
abstract class Greeter {
    abstract public function name(): string;

    public function greet(): string {
        return 'Hello, ' . \$this->name() . '!';
    }
}

class FriendGreeter extends Greeter {
    public function name(): string { return 'Friend'; }
}

echo (new FriendGreeter())->greet();`,
      solution: `Hello, Friend!`,
      hints: [
        'greet() calls the abstract name() method.',
        'FriendGreeter returns "Friend" from name().',
        'The result is "Hello, Friend!".',
      ],
      concepts: ['template-method', 'abstract-resolution', 'polymorphism'],
    },
    {
      id: 'php-abstract-17',
      title: 'Predict Constructor Inheritance',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict what this code outputs.',
      skeleton: `<?php
abstract class Base {
    public function __construct(protected string \$label = 'base') {}
    abstract public function info(): string;
}

class Child extends Base {
    public function info(): string {
        return \$this->label;
    }
}

\$a = new Child();
\$b = new Child('custom');
echo \$a->info() . ' ' . \$b->info();`,
      solution: `base custom`,
      hints: [
        'Child inherits Base constructor with default "base".',
        '$a uses the default, $b passes "custom".',
        'info() returns the label property.',
      ],
      concepts: ['constructor-inheritance', 'default-parameter', 'protected-access'],
    },
    {
      id: 'php-abstract-18',
      title: 'Predict Abstract Chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict what this code outputs.',
      skeleton: `<?php
abstract class A {
    public function run(): string {
        return \$this->step1() . \$this->step2();
    }
    abstract protected function step1(): string;
    abstract protected function step2(): string;
}

class B extends A {
    protected function step1(): string { return 'X'; }
    protected function step2(): string { return 'Y'; }
}

echo (new B())->run();`,
      solution: `XY`,
      hints: [
        'run() calls step1() and step2() and concatenates results.',
        'B implements step1 as "X" and step2 as "Y".',
        'The output is "XY".',
      ],
      concepts: ['template-method', 'abstract-chain', 'string-concatenation'],
    },
    {
      id: 'php-abstract-19',
      title: 'Refactor to Abstract Class',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the duplicated code into an abstract base class.',
      skeleton: `<?php
class CsvExporter {
    public function export(array \$data): string {
        \$header = 'name,value';
        \$rows = [];
        foreach (\$data as \$row) {
            \$rows[] = implode(',', \$row);
        }
        return \$header . "\\n" . implode("\\n", \$rows);
    }
}

class TsvExporter {
    public function export(array \$data): string {
        \$header = "name\\tvalue";
        \$rows = [];
        foreach (\$data as \$row) {
            \$rows[] = implode("\\t", \$row);
        }
        return \$header . "\\n" . implode("\\n", \$rows);
    }
}`,
      solution: `<?php
abstract class Exporter {
    abstract protected function separator(): string;
    abstract protected function header(): string;

    public function export(array \$data): string {
        \$rows = [];
        foreach (\$data as \$row) {
            \$rows[] = implode(\$this->separator(), \$row);
        }
        return \$this->header() . "\\n" . implode("\\n", \$rows);
    }
}

class CsvExporter extends Exporter {
    protected function separator(): string { return ','; }
    protected function header(): string { return 'name,value'; }
}

class TsvExporter extends Exporter {
    protected function separator(): string { return "\\t"; }
    protected function header(): string { return "name\\tvalue"; }
}`,
      hints: [
        'The export logic is identical except for the separator and header.',
        'Extract separator() and header() as abstract methods.',
        'Move the common export() logic to the abstract base class.',
      ],
      concepts: ['extract-abstract-class', 'template-method', 'dry-principle'],
    },
    {
      id: 'php-abstract-20',
      title: 'Refactor Conditional to Abstract Hierarchy',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the conditional logic into an abstract class with subclasses.',
      skeleton: `<?php
class Discount {
    public function calculate(string \$type, float \$price): float {
        if (\$type === 'percentage') {
            return \$price * 0.10;
        } elseif (\$type === 'fixed') {
            return 5.00;
        }
        return 0;
    }
}`,
      solution: `<?php
abstract class Discount {
    abstract public function calculate(float \$price): float;
}

class PercentageDiscount extends Discount {
    public function calculate(float \$price): float {
        return \$price * 0.10;
    }
}

class FixedDiscount extends Discount {
    public function calculate(float \$price): float {
        return 5.00;
    }
}`,
      hints: [
        'Each branch of the conditional becomes a subclass.',
        'The abstract class declares calculate with just the price parameter.',
        'PercentageDiscount and FixedDiscount each implement the calculation.',
      ],
      concepts: ['replace-conditional-with-polymorphism', 'strategy-pattern', 'abstract-hierarchy'],
    },
  ],
};
