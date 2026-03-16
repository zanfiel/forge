import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-readonly',
  title: '43. Readonly Properties & Classes',
  explanation: `## Readonly Properties & Classes

PHP 8.1 introduced readonly properties, and PHP 8.2 added readonly classes. These enforce immutability at the language level.

### Readonly Properties (PHP 8.1)
\`\`\`php
<?php
class User {
    public readonly string \$name;
    public readonly int \$age;

    public function __construct(string \$name, int \$age) {
        \$this->name = \$name;
        \$this->age = \$age;
    }
}

\$user = new User('Alice', 30);
echo \$user->name; // "Alice"
// \$user->name = 'Bob'; // Error: Cannot modify readonly property
\`\`\`

### Constructor Promotion with Readonly
\`\`\`php
<?php
class Point {
    public function __construct(
        public readonly float \$x,
        public readonly float \$y,
    ) {}
}

\$p = new Point(1.0, 2.0);
echo \$p->x; // 1.0
\`\`\`

### Readonly Classes (PHP 8.2)
\`\`\`php
<?php
readonly class Coordinate {
    public function __construct(
        public float \$lat,
        public float \$lng,
    ) {}
}
// All properties are implicitly readonly
\`\`\`

### Cloning Readonly Objects
\`\`\`php
<?php
readonly class Money {
    public function __construct(
        public int \$amount,
        public string \$currency,
    ) {}

    public function add(int \$value): self {
        // In PHP 8.3+, clone with modified readonly within __clone
        return new self(\$this->amount + \$value, \$this->currency);
    }
}
\`\`\`

### Rules
- Readonly properties can only be written once (in the declaring scope)
- They cannot have a default value (unless promoted)
- Readonly classes cannot have untyped properties
- Readonly applies to the reference, not the object it points to`,
  exercises: [
    {
      id: 'php-readonly-1',
      title: 'Declare Readonly Property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to declare a readonly property.',
      skeleton: `<?php
class Config {
    public ___ string \$dbHost;

    public function __construct(string \$host) {
        \$this->dbHost = \$host;
    }
}`,
      solution: `<?php
class Config {
    public readonly string \$dbHost;

    public function __construct(string \$host) {
        \$this->dbHost = \$host;
    }
}`,
      hints: [
        'Add the readonly keyword between visibility and type.',
        'readonly properties can only be set once.',
        'They must be initialized in the constructor.',
      ],
      concepts: ['readonly', 'property', 'immutability'],
    },
    {
      id: 'php-readonly-2',
      title: 'Constructor Promotion with Readonly',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blanks to use constructor promotion with readonly.',
      skeleton: `<?php
class Product {
    public function __construct(
        public ___ string \$name,
        public ___ float \$price,
    ) {}
}`,
      solution: `<?php
class Product {
    public function __construct(
        public readonly string \$name,
        public readonly float \$price,
    ) {}
}`,
      hints: [
        'Add readonly after the visibility modifier.',
        'Constructor promotion creates and assigns the property.',
        'Both properties become immutable.',
      ],
      concepts: ['constructor-promotion', 'readonly', 'shorthand'],
    },
    {
      id: 'php-readonly-3',
      title: 'Declare Readonly Class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to make an entire class readonly.',
      skeleton: `<?php
___ class Coordinate {
    public function __construct(
        public float \$lat,
        public float \$lng,
    ) {}
}`,
      solution: `<?php
readonly class Coordinate {
    public function __construct(
        public float \$lat,
        public float \$lng,
    ) {}
}`,
      hints: [
        'Add readonly before the class keyword.',
        'All properties in a readonly class are implicitly readonly.',
        'Readonly classes were introduced in PHP 8.2.',
      ],
      concepts: ['readonly-class', 'PHP-8.2', 'implicit-readonly'],
    },
    {
      id: 'php-readonly-4',
      title: 'Readonly with Default Constructor',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to create a readonly class with promoted properties that have default values.',
      skeleton: `<?php
readonly class Settings {
    public function __construct(
        public string \$theme = ___,
        public int \$fontSize = ___,
    ) {}
}`,
      solution: `<?php
readonly class Settings {
    public function __construct(
        public string \$theme = 'dark',
        public int \$fontSize = 14,
    ) {}
}`,
      hints: [
        'Promoted readonly properties CAN have defaults.',
        'The default is used if no argument is provided.',
        'Assign sensible default values.',
      ],
      concepts: ['default-values', 'promoted-property', 'readonly'],
    },
    {
      id: 'php-readonly-5',
      title: 'Create Immutable Copy',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to create a new instance with a modified value (since readonly cannot be mutated).',
      skeleton: `<?php
readonly class Color {
    public function __construct(
        public int \$r,
        public int \$g,
        public int \$b,
    ) {}

    public function withRed(int \$r): self {
        return ___(___);
    }
}`,
      solution: `<?php
readonly class Color {
    public function __construct(
        public int \$r,
        public int \$g,
        public int \$b,
    ) {}

    public function withRed(int \$r): self {
        return new self(\$r, \$this->g, \$this->b);
    }
}`,
      hints: [
        'Since properties are readonly, create a new instance.',
        'Pass the new red value and existing green/blue.',
        'This is the "with" pattern for immutable objects.',
      ],
      concepts: ['with-pattern', 'immutable-copy', 'new-self'],
    },
    {
      id: 'php-readonly-6',
      title: 'Mixed Readonly and Mutable Properties',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to have one readonly and one mutable property.',
      skeleton: `<?php
class Counter {
    public function __construct(
        public ___ string \$name,
        public int \$count = 0,
    ) {}

    public function increment(): void {
        \$this->count++;
    }
}`,
      solution: `<?php
class Counter {
    public function __construct(
        public readonly string \$name,
        public int \$count = 0,
    ) {}

    public function increment(): void {
        \$this->count++;
    }
}`,
      hints: [
        'Only $name should be readonly.',
        '$count needs to be mutable for increment().',
        'Mix readonly and regular properties in one class.',
      ],
      concepts: ['mixed-mutability', 'selective-readonly', 'increment'],
    },
    {
      id: 'php-readonly-7',
      title: 'Write a Value Object',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Write a readonly class Money with public int $amount and public string $currency. Add a method add(Money $other): Money that returns a new Money with summed amounts (assert same currency).',
      skeleton: `<?php
// Write the Money readonly class`,
      solution: `<?php
readonly class Money {
    public function __construct(
        public int \$amount,
        public string \$currency,
    ) {}

    public function add(Money \$other): Money {
        if (\$this->currency !== \$other->currency) {
            throw new InvalidArgumentException('Currency mismatch');
        }
        return new Money(\$this->amount + \$other->amount, \$this->currency);
    }
}`,
      hints: [
        'Use readonly class for complete immutability.',
        'Check that currencies match before adding.',
        'Return a new Money instance with the sum.',
      ],
      concepts: ['value-object', 'readonly-class', 'currency-check'],
    },
    {
      id: 'php-readonly-8',
      title: 'Write an Immutable List',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a readonly class ImmutableList with a constructor taking a public array $items. Add methods append(mixed $item): self and count(): int.',
      skeleton: `<?php
// Write the ImmutableList readonly class`,
      solution: `<?php
readonly class ImmutableList {
    public function __construct(
        public array \$items = [],
    ) {}

    public function append(mixed \$item): self {
        return new self([...\$this->items, \$item]);
    }

    public function count(): int {
        return count(\$this->items);
    }
}`,
      hints: [
        'readonly protects the reference, arrays are copied.',
        'append() returns a new instance with the extra item.',
        'Use spread operator to create a new array.',
      ],
      concepts: ['immutable-collection', 'spread-operator', 'new-self'],
    },
    {
      id: 'php-readonly-9',
      title: 'Write a Builder for Readonly Objects',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a UserBuilder class with methods name(string $n): self, email(string $e): self, and build(): User that creates a readonly User object. User has readonly string $name and readonly string $email.',
      skeleton: `<?php
// Write User and UserBuilder classes`,
      solution: `<?php
readonly class User {
    public function __construct(
        public string \$name,
        public string \$email,
    ) {}
}

class UserBuilder {
    private string \$name = '';
    private string \$email = '';

    public function name(string \$n): self {
        \$this->name = \$n;
        return \$this;
    }

    public function email(string \$e): self {
        \$this->email = \$e;
        return \$this;
    }

    public function build(): User {
        return new User(\$this->name, \$this->email);
    }
}`,
      hints: [
        'The builder is mutable; the product is readonly.',
        'Each setter returns $this for chaining.',
        'build() constructs the immutable User.',
      ],
      concepts: ['builder-pattern', 'readonly-product', 'fluent-interface'],
    },
    {
      id: 'php-readonly-10',
      title: 'Write Readonly DTO with Validation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a readonly class Email with a public string $address property. Validate the email in the constructor and throw InvalidArgumentException if invalid.',
      skeleton: `<?php
// Write the Email readonly class with validation`,
      solution: `<?php
readonly class Email {
    public string \$address;

    public function __construct(string \$address) {
        if (!filter_var(\$address, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException("Invalid email: \$address");
        }
        \$this->address = \$address;
    }
}`,
      hints: [
        'Validate in the constructor before assigning.',
        'Use filter_var with FILTER_VALIDATE_EMAIL.',
        'Readonly properties can be set once in the constructor.',
      ],
      concepts: ['validation', 'constructor-guard', 'filter_var'],
    },
    {
      id: 'php-readonly-11',
      title: 'Write Readonly Enum-Like Class',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a readonly class Status with public string $value. Add static methods active(), inactive(), and pending() that return pre-built instances. Add an equals(Status $other): bool method.',
      skeleton: `<?php
// Write the Status readonly class`,
      solution: `<?php
readonly class Status {
    public function __construct(public string \$value) {}

    public static function active(): self {
        return new self('active');
    }

    public static function inactive(): self {
        return new self('inactive');
    }

    public static function pending(): self {
        return new self('pending');
    }

    public function equals(Status \$other): bool {
        return \$this->value === \$other->value;
    }
}`,
      hints: [
        'Static factory methods create specific instances.',
        'equals() compares the internal value.',
        'This mimics enum behavior with readonly classes.',
      ],
      concepts: ['static-factory', 'enum-like', 'equality'],
    },
    {
      id: 'php-readonly-12',
      title: 'Write a Readonly Composite',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write readonly classes Address (street, city, zip) and Person (name, address: Address). Add a withAddress(Address $addr): Person method on Person.',
      skeleton: `<?php
// Write Address and Person readonly classes`,
      solution: `<?php
readonly class Address {
    public function __construct(
        public string \$street,
        public string \$city,
        public string \$zip,
    ) {}
}

readonly class Person {
    public function __construct(
        public string \$name,
        public Address \$address,
    ) {}

    public function withAddress(Address \$address): self {
        return new self(\$this->name, \$address);
    }
}`,
      hints: [
        'Both classes should be readonly.',
        'Person holds an Address as a nested readonly object.',
        'withAddress returns a new Person with the updated address.',
      ],
      concepts: ['composition', 'nested-readonly', 'with-pattern'],
    },
    {
      id: 'php-readonly-13',
      title: 'Fix Readonly Mutation Attempt',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the code that tries to modify a readonly property after construction.',
      skeleton: `<?php
readonly class Config {
    public function __construct(
        public string \$host,
        public int \$port,
    ) {}
}

\$cfg = new Config('localhost', 8080);
\$cfg->port = 3306;
echo \$cfg->port;`,
      solution: `<?php
readonly class Config {
    public function __construct(
        public string \$host,
        public int \$port,
    ) {}
}

\$cfg = new Config('localhost', 3306);
echo \$cfg->port;`,
      hints: [
        'Readonly properties cannot be modified after construction.',
        'Set the correct value in the constructor call.',
        'Create a new instance if you need different values.',
      ],
      concepts: ['readonly-error', 'immutability', 'constructor'],
    },
    {
      id: 'php-readonly-14',
      title: 'Fix Untyped Property in Readonly Class',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the readonly class that has an untyped property.',
      skeleton: `<?php
readonly class Tag {
    public \$name;

    public function __construct(string \$name) {
        \$this->name = \$name;
    }
}`,
      solution: `<?php
readonly class Tag {
    public string \$name;

    public function __construct(string \$name) {
        \$this->name = \$name;
    }
}`,
      hints: [
        'Readonly classes cannot have untyped properties.',
        'Add a type declaration to the $name property.',
        'All properties in readonly classes must be typed.',
      ],
      concepts: ['typed-property', 'readonly-class-rule', 'type-declaration'],
    },
    {
      id: 'php-readonly-15',
      title: 'Fix Double Initialization',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the code that tries to set a readonly property twice.',
      skeleton: `<?php
class Server {
    public readonly string \$host;

    public function __construct(string \$host) {
        \$this->host = \$host;
        \$this->host = strtolower(\$host);
    }
}`,
      solution: `<?php
class Server {
    public readonly string \$host;

    public function __construct(string \$host) {
        \$this->host = strtolower(\$host);
    }
}`,
      hints: [
        'Readonly properties can only be assigned once.',
        'Process the value before assigning.',
        'Combine the transformation into a single assignment.',
      ],
      concepts: ['single-assignment', 'readonly', 'initialization'],
    },
    {
      id: 'php-readonly-16',
      title: 'Predict Readonly Behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the output of a readonly property access.',
      skeleton: `<?php
readonly class Pair {
    public function __construct(
        public string \$first,
        public string \$second,
    ) {}
}

\$p = new Pair('hello', 'world');
echo \$p->first . ' ' . \$p->second;`,
      solution: `hello world`,
      hints: [
        'Readonly properties are readable normally.',
        'They just cannot be modified after construction.',
        '$p->first is "hello" and $p->second is "world".',
      ],
      concepts: ['readonly-access', 'constructor-promotion', 'output'],
    },
    {
      id: 'php-readonly-17',
      title: 'Predict With-Method Result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the output when using the with-pattern.',
      skeleton: `<?php
readonly class Box {
    public function __construct(public int \$size) {}
    public function withSize(int \$s): self {
        return new self(\$s);
    }
}

\$a = new Box(5);
\$b = \$a->withSize(10);
echo \$a->size . ' ' . \$b->size;`,
      solution: `5 10`,
      hints: [
        'withSize returns a NEW Box, does not modify $a.',
        '$a still has size 5.',
        '$b is a new instance with size 10.',
      ],
      concepts: ['with-pattern', 'immutability', 'new-instance'],
    },
    {
      id: 'php-readonly-18',
      title: 'Predict Readonly Array Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict what happens with a readonly array property.',
      skeleton: `<?php
class Container {
    public function __construct(
        public readonly array \$items,
    ) {}
}

\$c = new Container([1, 2, 3]);
echo count(\$c->items) . ' ' . \$c->items[0];`,
      solution: `3 1`,
      hints: [
        'Reading readonly arrays works normally.',
        'count() returns 3 for the array.',
        '$c->items[0] is the first element.',
      ],
      concepts: ['readonly-array', 'read-access', 'count'],
    },
    {
      id: 'php-readonly-19',
      title: 'Refactor Mutable to Readonly',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the mutable DTO to use readonly properties and constructor promotion.',
      skeleton: `<?php
class UserDTO {
    public string \$name;
    public string \$email;
    public int \$age;

    public function __construct(string \$name, string \$email, int \$age) {
        \$this->name = \$name;
        \$this->email = \$email;
        \$this->age = \$age;
    }
}`,
      solution: `<?php
readonly class UserDTO {
    public function __construct(
        public string \$name,
        public string \$email,
        public int \$age,
    ) {}
}`,
      hints: [
        'Use readonly class for full immutability.',
        'Constructor promotion eliminates manual assignments.',
        'Much less boilerplate code.',
      ],
      concepts: ['readonly-class', 'constructor-promotion', 'DTO'],
    },
    {
      id: 'php-readonly-20',
      title: 'Refactor Setter to With-Method',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the mutable class with setters to a readonly class with with-methods.',
      skeleton: `<?php
class Rectangle {
    public function __construct(
        public float \$width,
        public float \$height,
    ) {}

    public function setWidth(float \$w): void {
        \$this->width = \$w;
    }

    public function setHeight(float \$h): void {
        \$this->height = \$h;
    }

    public function area(): float {
        return \$this->width * \$this->height;
    }
}`,
      solution: `<?php
readonly class Rectangle {
    public function __construct(
        public float \$width,
        public float \$height,
    ) {}

    public function withWidth(float \$w): self {
        return new self(\$w, \$this->height);
    }

    public function withHeight(float \$h): self {
        return new self(\$this->width, \$h);
    }

    public function area(): float {
        return \$this->width * \$this->height;
    }
}`,
      hints: [
        'Replace setters with with-methods that return new instances.',
        'Make the class readonly.',
        'area() remains unchanged since it only reads.',
      ],
      concepts: ['setter-to-with', 'immutable-refactor', 'readonly-class'],
    },
  ],
};
