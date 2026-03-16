import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-traits',
  title: '12. Traits',
  explanation: `## Traits in PHP

**Traits** provide a mechanism for code reuse in single-inheritance languages. A trait is like a class fragment that can be "pasted" into multiple classes.

\`\`\`php
trait Timestampable {
    private string \$createdAt;

    public function setCreatedAt(string \$date): void {
        \$this->createdAt = \$date;
    }

    public function getCreatedAt(): string {
        return \$this->createdAt;
    }
}

class Post {
    use Timestampable;

    public function __construct(private string \$title) {}
}
\`\`\`

### Conflict Resolution
When two traits define the same method, you must resolve the conflict:

\`\`\`php
trait A {
    public function hello(): string { return 'A'; }
}

trait B {
    public function hello(): string { return 'B'; }
}

class C {
    use A, B {
        A::hello insteadof B;  // Use A's hello
        B::hello as helloB;     // Alias B's hello
    }
}
\`\`\`

### Abstract Methods in Traits
Traits can declare abstract methods that the using class must implement:

\`\`\`php
trait Validatable {
    abstract protected function rules(): array;

    public function validate(): bool {
        return !empty(\$this->rules());
    }
}
\`\`\`

### Visibility Changes
You can change a trait method's visibility with \`as\`:

\`\`\`php
class Secure {
    use Logger {
        log as protected;
    }
}
\`\`\``,
  exercises: [
    {
      id: 'php-traits-1',
      title: 'Declare and Use a Trait',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blanks to declare a trait and use it in a class.',
      skeleton: `<?php
___ Greetable {
    public function greet(): string {
        return 'Hello!';
    }
}

class User {
    ___ Greetable;
}`,
      solution: `<?php
trait Greetable {
    public function greet(): string {
        return 'Hello!';
    }
}

class User {
    use Greetable;
}`,
      hints: [
        'Declare a trait with the "trait" keyword.',
        'Include a trait in a class with the "use" keyword.',
        'The use statement goes inside the class body.',
      ],
      concepts: ['trait-declaration', 'use-keyword'],
    },
    {
      id: 'php-traits-2',
      title: 'Trait with Property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blanks so the trait provides a property and accessor.',
      skeleton: `<?php
trait HasName {
    private string \$___ = '';

    public function setName(string \$name): void {
        \$this->___ = \$name;
    }

    public function getName(): string {
        return \$this->___;
    }
}`,
      solution: `<?php
trait HasName {
    private string \$name = '';

    public function setName(string \$name): void {
        \$this->name = \$name;
    }

    public function getName(): string {
        return \$this->name;
    }
}`,
      hints: [
        'The property name should match what the getter/setter reference.',
        'All three blanks use the same property name.',
        'The property is "name".',
      ],
      concepts: ['trait-property', 'getter-setter'],
    },
    {
      id: 'php-traits-3',
      title: 'Multiple Traits',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to use two traits in a single class.',
      skeleton: `<?php
trait Loggable {
    public function log(string \$msg): void { echo \$msg; }
}

trait Cacheable {
    public function cache(): string { return 'cached'; }
}

class Service {
    use Loggable, ___;
}`,
      solution: `<?php
trait Loggable {
    public function log(string \$msg): void { echo \$msg; }
}

trait Cacheable {
    public function cache(): string { return 'cached'; }
}

class Service {
    use Loggable, Cacheable;
}`,
      hints: [
        'Multiple traits are listed after "use" separated by commas.',
        'The second trait name is Cacheable.',
        'Both traits are now available in Service.',
      ],
      concepts: ['multiple-traits', 'composition'],
    },
    {
      id: 'php-traits-4',
      title: 'Conflict Resolution with insteadof',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to resolve a trait method conflict.',
      skeleton: `<?php
trait Logger {
    public function output(): string { return 'log'; }
}

trait Printer {
    public function output(): string { return 'print'; }
}

class Report {
    use Logger, Printer {
        Logger::output ___ Printer;
        Printer::output ___ printOutput;
    }
}`,
      solution: `<?php
trait Logger {
    public function output(): string { return 'log'; }
}

trait Printer {
    public function output(): string { return 'print'; }
}

class Report {
    use Logger, Printer {
        Logger::output insteadof Printer;
        Printer::output as printOutput;
    }
}`,
      hints: [
        'Use "insteadof" to choose one method over the other.',
        'Use "as" to create an alias for the excluded method.',
        'Logger::output wins, Printer::output becomes printOutput.',
      ],
      concepts: ['insteadof', 'as-alias', 'conflict-resolution'],
    },
    {
      id: 'php-traits-5',
      title: 'Change Trait Method Visibility',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to change the trait method visibility.',
      skeleton: `<?php
trait Helper {
    public function compute(): int {
        return 42;
    }
}

class SecureCalc {
    use Helper {
        compute as ___ privateCompute;
    }
}`,
      solution: `<?php
trait Helper {
    public function compute(): int {
        return 42;
    }
}

class SecureCalc {
    use Helper {
        compute as private privateCompute;
    }
}`,
      hints: [
        'The "as" keyword can change both name and visibility.',
        'Use "private" to make the method private.',
        'Syntax: methodName as visibility newName.',
      ],
      concepts: ['visibility-change', 'as-keyword', 'encapsulation'],
    },
    {
      id: 'php-traits-6',
      title: 'Abstract Method in Trait',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to declare an abstract method in a trait.',
      skeleton: `<?php
trait Renderable {
    ___ protected function template(): string;

    public function render(): string {
        return '<div>' . \$this->___() . '</div>';
    }
}

class Page {
    use Renderable;

    protected function template(): string {
        return 'Welcome';
    }
}`,
      solution: `<?php
trait Renderable {
    abstract protected function template(): string;

    public function render(): string {
        return '<div>' . \$this->template() . '</div>';
    }
}

class Page {
    use Renderable;

    protected function template(): string {
        return 'Welcome';
    }
}`,
      hints: [
        'Use the "abstract" keyword before the method.',
        'The render method calls the abstract method.',
        'The using class must implement the abstract method.',
      ],
      concepts: ['abstract-trait-method', 'template-method'],
    },
    {
      id: 'php-traits-7',
      title: 'Write a SoftDelete Trait',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a trait SoftDelete that adds a $deletedAt property (nullable string), a delete() method that sets it to "deleted", a restore() method that sets it to null, and an isDeleted(): bool method.',
      skeleton: `<?php
// Write the SoftDelete trait`,
      solution: `<?php
trait SoftDelete {
    private ?string \$deletedAt = null;

    public function delete(): void {
        \$this->deletedAt = 'deleted';
    }

    public function restore(): void {
        \$this->deletedAt = null;
    }

    public function isDeleted(): bool {
        return \$this->deletedAt !== null;
    }
}`,
      hints: [
        'Use ?string for the nullable type.',
        'Initialize $deletedAt to null.',
        'isDeleted checks if $deletedAt is not null.',
      ],
      concepts: ['soft-delete-pattern', 'trait-property', 'nullable'],
    },
    {
      id: 'php-traits-8',
      title: 'Write a Singleton Trait',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a trait Singleton that provides a static getInstance() method returning the single instance. Make the constructor private via the trait.',
      skeleton: `<?php
// Write the Singleton trait`,
      solution: `<?php
trait Singleton {
    private static ?self \$instance = null;

    public static function getInstance(): static {
        if (static::\$instance === null) {
            static::\$instance = new static();
        }
        return static::\$instance;
    }

    private function __construct() {}
}`,
      hints: [
        'Store the instance in a static property.',
        'Use static:: for late static binding.',
        'Make __construct private to prevent external instantiation.',
      ],
      concepts: ['singleton-pattern', 'static-property', 'late-static-binding'],
    },
    {
      id: 'php-traits-9',
      title: 'Write a HasUuid Trait',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Write a trait HasUuid that provides a $uuid property initialized via a generateUuid() method (return uniqid("", true)) and a getUuid(): string method. Include an initUuid() method to set the uuid.',
      skeleton: `<?php
// Write the HasUuid trait`,
      solution: `<?php
trait HasUuid {
    private string \$uuid = '';

    public function initUuid(): void {
        \$this->uuid = \$this->generateUuid();
    }

    public function getUuid(): string {
        return \$this->uuid;
    }

    private function generateUuid(): string {
        return uniqid('', true);
    }
}`,
      hints: [
        'Use uniqid("", true) for a unique identifier.',
        'initUuid sets the property using generateUuid.',
        'getUuid returns the stored uuid string.',
      ],
      concepts: ['trait-initialization', 'uuid-generation', 'encapsulation'],
    },
    {
      id: 'php-traits-10',
      title: 'Write a Composable Validation Trait',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a trait HasValidation with an array $errors property, methods addError(string $msg): void, getErrors(): array, and isValid(): bool (true when no errors).',
      skeleton: `<?php
// Write the HasValidation trait`,
      solution: `<?php
trait HasValidation {
    private array \$errors = [];

    public function addError(string \$msg): void {
        \$this->errors[] = \$msg;
    }

    public function getErrors(): array {
        return \$this->errors;
    }

    public function isValid(): bool {
        return empty(\$this->errors);
    }
}`,
      hints: [
        'Initialize $errors as an empty array.',
        'addError appends to the errors array.',
        'isValid returns true when the errors array is empty.',
      ],
      concepts: ['validation-pattern', 'trait-composition', 'error-collection'],
    },
    {
      id: 'php-traits-11',
      title: 'Write Trait with Required Method',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a trait Sluggable that declares an abstract method getTitle(): string. Add a method slug(): string that lowercases getTitle(), replaces spaces with dashes, and trims dashes.',
      skeleton: `<?php
// Write the Sluggable trait`,
      solution: `<?php
trait Sluggable {
    abstract public function getTitle(): string;

    public function slug(): string {
        \$slug = strtolower(\$this->getTitle());
        \$slug = str_replace(' ', '-', \$slug);
        return trim(\$slug, '-');
    }
}`,
      hints: [
        'Declare getTitle() as abstract so the using class must implement it.',
        'Use strtolower() to lowercase the title.',
        'Use str_replace() to swap spaces for dashes and trim() to strip trailing dashes.',
      ],
      concepts: ['abstract-trait-method', 'slug-generation', 'string-manipulation'],
    },
    {
      id: 'php-traits-12',
      title: 'Write a Trait Composition Example',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write two traits: HasCreatedAt (with getCreatedAt(): string returning "2024-01-01") and HasUpdatedAt (with getUpdatedAt(): string returning "2024-06-01"). Write a class Record that uses both.',
      skeleton: `<?php
// Write both traits and the Record class`,
      solution: `<?php
trait HasCreatedAt {
    public function getCreatedAt(): string {
        return '2024-01-01';
    }
}

trait HasUpdatedAt {
    public function getUpdatedAt(): string {
        return '2024-06-01';
    }
}

class Record {
    use HasCreatedAt, HasUpdatedAt;
}`,
      hints: [
        'Each trait defines one timestamp method.',
        'Record uses both traits with a comma-separated list.',
        'No conflict since the method names are different.',
      ],
      concepts: ['trait-composition', 'horizontal-reuse', 'multiple-traits'],
    },
    {
      id: 'php-traits-13',
      title: 'Fix Trait Conflict Error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the fatal error caused by unresolved trait method conflict.',
      skeleton: `<?php
trait Swim {
    public function move(): string { return 'swimming'; }
}

trait Fly {
    public function move(): string { return 'flying'; }
}

class Duck {
    use Swim, Fly;
}`,
      solution: `<?php
trait Swim {
    public function move(): string { return 'swimming'; }
}

trait Fly {
    public function move(): string { return 'flying'; }
}

class Duck {
    use Swim, Fly {
        Swim::move insteadof Fly;
        Fly::move as flyMove;
    }
}`,
      hints: [
        'Both traits define move() which causes a fatal error.',
        'Use insteadof to pick one and as to alias the other.',
        'Swim::move wins, Fly::move becomes flyMove.',
      ],
      concepts: ['trait-conflict', 'insteadof', 'alias'],
    },
    {
      id: 'php-traits-14',
      title: 'Fix Trait Property Conflict',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the error caused by incompatible trait properties.',
      skeleton: `<?php
trait A {
    private string \$name = 'TraitA';
}

trait B {
    private string \$name = 'TraitB';
}

class C {
    use A, B;
}`,
      solution: `<?php
trait A {
    private string \$nameA = 'TraitA';
}

trait B {
    private string \$nameB = 'TraitB';
}

class C {
    use A, B;
}`,
      hints: [
        'Two traits cannot define the same property with different defaults.',
        'Rename the properties to be unique in each trait.',
        'Use $nameA and $nameB to avoid the collision.',
      ],
      concepts: ['trait-property-conflict', 'naming-collision', 'trait-limitation'],
    },
    {
      id: 'php-traits-15',
      title: 'Fix Missing Abstract Implementation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the error by implementing the required abstract method from the trait.',
      skeleton: `<?php
trait Configurable {
    abstract protected function defaults(): array;

    public function config(string \$key): mixed {
        return \$this->defaults()[\$key] ?? null;
    }
}

class App {
    use Configurable;
}`,
      solution: `<?php
trait Configurable {
    abstract protected function defaults(): array;

    public function config(string \$key): mixed {
        return \$this->defaults()[\$key] ?? null;
    }
}

class App {
    use Configurable;

    protected function defaults(): array {
        return ['debug' => false, 'name' => 'MyApp'];
    }
}`,
      hints: [
        'The trait declares an abstract method defaults().',
        'Any class using the trait must implement it.',
        'Add the defaults() method returning an array.',
      ],
      concepts: ['abstract-trait-method', 'implementation-required', 'contract'],
    },
    {
      id: 'php-traits-16',
      title: 'Predict Trait Method Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict what this code outputs.',
      skeleton: `<?php
trait Greeter {
    public function greet(): string {
        return 'Hi, ' . \$this->name;
    }
}

class Person {
    use Greeter;
    public function __construct(public string \$name) {}
}

echo (new Person('Alice'))->greet();`,
      solution: `Hi, Alice`,
      hints: [
        'The trait method accesses $this->name from the using class.',
        'Person sets name to "Alice" via constructor.',
        'greet() returns "Hi, " concatenated with the name.',
      ],
      concepts: ['trait-class-context', 'this-reference', 'property-access'],
    },
    {
      id: 'php-traits-17',
      title: 'Predict Trait Override',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict what this code outputs.',
      skeleton: `<?php
trait Speak {
    public function say(): string { return 'trait'; }
}

class Base {
    public function say(): string { return 'base'; }
}

class Child extends Base {
    use Speak;
}

echo (new Child())->say();`,
      solution: `trait`,
      hints: [
        'When a class uses a trait and extends a base class with the same method...',
        'The trait method takes precedence over the inherited method.',
        'But a method defined directly in the class would override the trait.',
      ],
      concepts: ['trait-precedence', 'method-resolution-order'],
    },
    {
      id: 'php-traits-18',
      title: 'Predict Alias Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict what this code outputs.',
      skeleton: `<?php
trait Alpha {
    public function id(): string { return 'A'; }
}

trait Beta {
    public function id(): string { return 'B'; }
}

class Combo {
    use Alpha, Beta {
        Beta::id insteadof Alpha;
        Alpha::id as alphaId;
    }
}

\$c = new Combo();
echo \$c->id() . \$c->alphaId();`,
      solution: `BA`,
      hints: [
        'Beta::id wins via insteadof, so id() returns "B".',
        'Alpha::id is aliased as alphaId(), which returns "A".',
        'The output is "B" followed by "A".',
      ],
      concepts: ['insteadof', 'alias', 'conflict-resolution'],
    },
    {
      id: 'php-traits-19',
      title: 'Refactor Duplicated Code to Trait',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Extract the duplicated toJson method into a trait and use it in both classes.',
      skeleton: `<?php
class User {
    public function __construct(public string \$name) {}

    public function toJson(): string {
        return json_encode(['name' => \$this->name]);
    }
}

class Product {
    public function __construct(public string \$name) {}

    public function toJson(): string {
        return json_encode(['name' => \$this->name]);
    }
}`,
      solution: `<?php
trait JsonSerializable {
    public function toJson(): string {
        return json_encode(['name' => \$this->name]);
    }
}

class User {
    use JsonSerializable;
    public function __construct(public string \$name) {}
}

class Product {
    use JsonSerializable;
    public function __construct(public string \$name) {}
}`,
      hints: [
        'Both classes have the identical toJson() method.',
        'Extract it into a trait named JsonSerializable.',
        'Both classes use the trait and remove their own toJson().',
      ],
      concepts: ['dry-principle', 'extract-trait', 'code-reuse'],
    },
    {
      id: 'php-traits-20',
      title: 'Refactor to Composable Traits',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the monolithic trait into two focused traits and compose them in the class.',
      skeleton: `<?php
trait Everything {
    public function log(string \$msg): void {
        echo "[LOG] \$msg";
    }

    public function cache(string \$key, mixed \$val): void {
        echo "Cached \$key";
    }

    public function clearCache(): void {
        echo 'Cache cleared';
    }
}

class Service {
    use Everything;
}`,
      solution: `<?php
trait Loggable {
    public function log(string \$msg): void {
        echo "[LOG] \$msg";
    }
}

trait Cacheable {
    public function cache(string \$key, mixed \$val): void {
        echo "Cached \$key";
    }

    public function clearCache(): void {
        echo 'Cache cleared';
    }
}

class Service {
    use Loggable, Cacheable;
}`,
      hints: [
        'Split the trait by responsibility: logging vs caching.',
        'Create Loggable for log() and Cacheable for cache()/clearCache().',
        'Service uses both traits.',
      ],
      concepts: ['single-responsibility', 'trait-composition', 'refactoring'],
    },
  ],
};
