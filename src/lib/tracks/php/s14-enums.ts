import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-enums',
  title: '14. Enums',
  explanation: `## Enums in PHP

PHP 8.1 introduced **enums** (enumerations) as first-class types. They represent a fixed set of possible values.

### Basic (Unit) Enums
\`\`\`php
enum Suit {
    case Hearts;
    case Diamonds;
    case Clubs;
    case Spades;
}

\$card = Suit::Hearts;
echo \$card->name; // "Hearts"
\`\`\`

### Backed Enums
Backed enums have scalar values (string or int):

\`\`\`php
enum Color: string {
    case Red = 'red';
    case Green = 'green';
    case Blue = 'blue';
}

echo Color::Red->value; // "red"
\`\`\`

### from() and tryFrom()
\`\`\`php
\$c = Color::from('red');      // Color::Red
\$c = Color::tryFrom('purple'); // null (no exception)
\`\`\`

### Methods on Enums
Enums can have methods:
\`\`\`php
enum Status: string {
    case Active = 'active';
    case Inactive = 'inactive';

    public function label(): string {
        return match(\$this) {
            self::Active => 'Currently Active',
            self::Inactive => 'Not Active',
        };
    }
}
\`\`\`

### Implementing Interfaces
\`\`\`php
interface HasColor {
    public function color(): string;
}

enum Priority: int implements HasColor {
    case Low = 1;
    case High = 3;

    public function color(): string {
        return match(\$this) {
            self::Low => 'green',
            self::High => 'red',
        };
    }
}
\`\`\`

### Listing Cases
\`\`\`php
\$all = Color::cases(); // [Color::Red, Color::Green, Color::Blue]
\`\`\``,
  exercises: [
    {
      id: 'php-enums-1',
      title: 'Declare a Basic Enum',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blanks to declare a basic enum with three cases.',
      skeleton: `<?php
___ Direction {
    ___ North;
    ___ South;
    ___ East;
}`,
      solution: `<?php
enum Direction {
    case North;
    case South;
    case East;
}`,
      hints: [
        'Use "enum" keyword to declare an enumeration.',
        'Each value is declared with the "case" keyword.',
        'Basic enums have no backing type.',
      ],
      concepts: ['enum-declaration', 'case-keyword'],
    },
    {
      id: 'php-enums-2',
      title: 'Backed Enum with String Values',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blanks to create a string-backed enum.',
      skeleton: `<?php
enum Size___string {
    case Small = ___;
    case Medium = 'md';
    case Large = 'lg';
}`,
      solution: `<?php
enum Size: string {
    case Small = 'sm';
    case Medium = 'md';
    case Large = 'lg';
}`,
      hints: [
        'Use a colon followed by the backing type.',
        'String-backed enums require string values for each case.',
        'Small should have the value "sm".',
      ],
      concepts: ['backed-enum', 'string-backing'],
    },
    {
      id: 'php-enums-3',
      title: 'Access Enum Name and Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blanks to access the enum name and value properties.',
      skeleton: `<?php
enum Fruit: string {
    case Apple = 'apple';
    case Banana = 'banana';
}

\$f = Fruit::Apple;
echo \$f->___;    // "Apple"
echo \$f->___;    // "apple"`,
      solution: `<?php
enum Fruit: string {
    case Apple = 'apple';
    case Banana = 'banana';
}

\$f = Fruit::Apple;
echo \$f->name;    // "Apple"
echo \$f->value;   // "apple"`,
      hints: [
        'Every enum case has a ->name property (the case name).',
        'Backed enums also have a ->value property.',
        'name returns "Apple", value returns "apple".',
      ],
      concepts: ['enum-name', 'enum-value', 'backed-enum'],
    },
    {
      id: 'php-enums-4',
      title: 'Using from() and tryFrom()',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to convert a string to an enum using from and tryFrom.',
      skeleton: `<?php
enum Status: string {
    case Active = 'active';
    case Paused = 'paused';
}

\$a = Status::___('active');     // Status::Active
\$b = Status::___('unknown');    // null`,
      solution: `<?php
enum Status: string {
    case Active = 'active';
    case Paused = 'paused';
}

\$a = Status::from('active');     // Status::Active
\$b = Status::tryFrom('unknown'); // null`,
      hints: [
        'from() throws ValueError if the value does not match.',
        'tryFrom() returns null if the value does not match.',
        'Use from for known values, tryFrom for user input.',
      ],
      concepts: ['from', 'tryFrom', 'enum-conversion'],
    },
    {
      id: 'php-enums-5',
      title: 'Enum Method with match',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to add a method to an enum using match.',
      skeleton: `<?php
enum Season {
    case Spring;
    case Summer;
    case Autumn;
    case Winter;

    public function emoji(): string {
        return ___(\$this) {
            self::Spring => '🌸',
            self::Summer => '☀️',
            self::Autumn => '🍂',
            ___::Winter => '❄️',
        };
    }
}`,
      solution: `<?php
enum Season {
    case Spring;
    case Summer;
    case Autumn;
    case Winter;

    public function emoji(): string {
        return match(\$this) {
            self::Spring => '🌸',
            self::Summer => '☀️',
            self::Autumn => '🍂',
            self::Winter => '❄️',
        };
    }
}`,
      hints: [
        'Use the match expression to map each case.',
        'Match on $this to get the current enum value.',
        'Use self:: to reference enum cases within the enum.',
      ],
      concepts: ['enum-method', 'match-expression', 'self-reference'],
    },
    {
      id: 'php-enums-6',
      title: 'Enum Implementing Interface',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks so the enum implements an interface.',
      skeleton: `<?php
interface Labelable {
    public function label(): string;
}

enum Role: string ___ Labelable {
    case Admin = 'admin';
    case User = 'user';

    public function ___(): string {
        return match(\$this) {
            self::Admin => 'Administrator',
            self::User => 'Regular User',
        };
    }
}`,
      solution: `<?php
interface Labelable {
    public function label(): string;
}

enum Role: string implements Labelable {
    case Admin = 'admin';
    case User = 'user';

    public function label(): string {
        return match(\$this) {
            self::Admin => 'Administrator',
            self::User => 'Regular User',
        };
    }
}`,
      hints: [
        'Enums implement interfaces with the "implements" keyword.',
        'The method name must match the interface declaration.',
        'Enums can be backed AND implement interfaces.',
      ],
      concepts: ['enum-implements', 'interface', 'backed-enum'],
    },
    {
      id: 'php-enums-7',
      title: 'Write an Int-Backed Enum',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Write an int-backed enum HttpStatus with cases Ok = 200, NotFound = 404, and ServerError = 500. Add a method isError(): bool that returns true for status codes >= 400.',
      skeleton: `<?php
// Write the HttpStatus enum`,
      solution: `<?php
enum HttpStatus: int {
    case Ok = 200;
    case NotFound = 404;
    case ServerError = 500;

    public function isError(): bool {
        return \$this->value >= 400;
    }
}`,
      hints: [
        'Use "enum HttpStatus: int" for integer backing.',
        'Each case gets an integer value.',
        'isError() checks if $this->value >= 400.',
      ],
      concepts: ['int-backed-enum', 'enum-method', 'value-property'],
    },
    {
      id: 'php-enums-8',
      title: 'Write Enum with Static Constructor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a string-backed enum Permission with cases Read = "r", Write = "w", Execute = "x". Add a static method fromChar(string $char): self that uses from() to convert.',
      skeleton: `<?php
// Write the Permission enum`,
      solution: `<?php
enum Permission: string {
    case Read = 'r';
    case Write = 'w';
    case Execute = 'x';

    public static function fromChar(string \$char): self {
        return self::from(\$char);
    }
}`,
      hints: [
        'fromChar is a static method that wraps from().',
        'Use self::from() to convert the character.',
        'Return type is self (the enum itself).',
      ],
      concepts: ['static-method', 'from', 'enum-factory'],
    },
    {
      id: 'php-enums-9',
      title: 'Write Enum with cases() List',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a string-backed enum Day with cases Mon through Fri (values "mon" through "fri"). Add a static method values(): array that returns an array of all backing values.',
      skeleton: `<?php
// Write the Day enum`,
      solution: `<?php
enum Day: string {
    case Mon = 'mon';
    case Tue = 'tue';
    case Wed = 'wed';
    case Thu = 'thu';
    case Fri = 'fri';

    public static function values(): array {
        return array_map(fn(self \$d) => \$d->value, self::cases());
    }
}`,
      hints: [
        'Use self::cases() to get all enum cases.',
        'Map over them extracting the ->value property.',
        'Return the array of string values.',
      ],
      concepts: ['cases-method', 'array_map', 'enum-listing'],
    },
    {
      id: 'php-enums-10',
      title: 'Write Enum Implementing Comparable',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write an int-backed enum Priority with cases Low = 1, Medium = 5, High = 10. Add a method isHigherThan(self $other): bool that compares values.',
      skeleton: `<?php
// Write the Priority enum`,
      solution: `<?php
enum Priority: int {
    case Low = 1;
    case Medium = 5;
    case High = 10;

    public function isHigherThan(self \$other): bool {
        return \$this->value > \$other->value;
    }
}`,
      hints: [
        'Use int backing for numeric comparison.',
        'isHigherThan compares $this->value with $other->value.',
        'Use self as the parameter type.',
      ],
      concepts: ['enum-comparison', 'self-type', 'int-backed'],
    },
    {
      id: 'php-enums-11',
      title: 'Write Enum with Constants',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a string-backed enum Currency with cases USD = "USD", EUR = "EUR", GBP = "GBP". Add a const DEFAULT = "USD" and a static method default(): self that returns the default currency.',
      skeleton: `<?php
// Write the Currency enum`,
      solution: `<?php
enum Currency: string {
    const DEFAULT = 'USD';

    case USD = 'USD';
    case EUR = 'EUR';
    case GBP = 'GBP';

    public static function default(): self {
        return self::from(self::DEFAULT);
    }
}`,
      hints: [
        'Enums can have constants alongside cases.',
        'Use self::DEFAULT to reference the constant.',
        'default() uses from() to get the matching case.',
      ],
      concepts: ['enum-constants', 'static-factory', 'from'],
    },
    {
      id: 'php-enums-12',
      title: 'Write Color Enum with RGB',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a unit enum Color with cases Red, Green, Blue. Add a method rgb(): array returning the RGB array ([255,0,0] for Red, [0,255,0] for Green, [0,0,255] for Blue).',
      skeleton: `<?php
// Write the Color enum with rgb() method`,
      solution: `<?php
enum Color {
    case Red;
    case Green;
    case Blue;

    public function rgb(): array {
        return match(\$this) {
            self::Red => [255, 0, 0],
            self::Green => [0, 255, 0],
            self::Blue => [0, 0, 255],
        };
    }
}`,
      hints: [
        'Unit enums have no backing value.',
        'Use match($this) to return different arrays.',
        'Each case maps to an RGB triplet.',
      ],
      concepts: ['unit-enum', 'match-expression', 'enum-method'],
    },
    {
      id: 'php-enums-13',
      title: 'Fix Invalid Backed Enum',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the backed enum - all cases must have values of the declared type.',
      skeleton: `<?php
enum Level: int {
    case Low = 1;
    case Medium;
    case High = 10;
}`,
      solution: `<?php
enum Level: int {
    case Low = 1;
    case Medium = 5;
    case High = 10;
}`,
      hints: [
        'Int-backed enums require explicit values for all cases.',
        'Unlike C enums, PHP does not auto-increment.',
        'Give Medium an explicit integer value.',
      ],
      concepts: ['backed-enum-requirement', 'explicit-values'],
    },
    {
      id: 'php-enums-14',
      title: 'Fix Enum Type Error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the type error - the enum uses from() with the wrong type.',
      skeleton: `<?php
enum Grade: string {
    case A = 'A';
    case B = 'B';
    case F = 'F';
}

\$grade = Grade::from(65);`,
      solution: `<?php
enum Grade: string {
    case A = 'A';
    case B = 'B';
    case F = 'F';
}

\$grade = Grade::from('A');`,
      hints: [
        'Grade is a string-backed enum.',
        'from() expects a string argument, not an integer.',
        'Pass a string value that matches one of the cases.',
      ],
      concepts: ['type-mismatch', 'from-argument', 'backed-enum'],
    },
    {
      id: 'php-enums-15',
      title: 'Fix Enum with Mutable State',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the error - enums cannot have mutable properties.',
      skeleton: `<?php
enum Theme: string {
    case Light = 'light';
    case Dark = 'dark';

    public string \$label = '';

    public function getLabel(): string {
        return \$this->label;
    }
}`,
      solution: `<?php
enum Theme: string {
    case Light = 'light';
    case Dark = 'dark';

    public function getLabel(): string {
        return match(\$this) {
            self::Light => 'Light Mode',
            self::Dark => 'Dark Mode',
        };
    }
}`,
      hints: [
        'Enums cannot have instance properties.',
        'Remove the $label property.',
        'Use a match expression in the method instead.',
      ],
      concepts: ['enum-no-properties', 'match-alternative', 'immutable'],
    },
    {
      id: 'php-enums-16',
      title: 'Predict Enum Comparison',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict what this code outputs.',
      skeleton: `<?php
enum Coin {
    case Heads;
    case Tails;
}

\$a = Coin::Heads;
\$b = Coin::Heads;
\$c = Coin::Tails;

echo (\$a === \$b) ? 'same' : 'diff';
echo ' ';
echo (\$a === \$c) ? 'same' : 'diff';`,
      solution: `same diff`,
      hints: [
        'Enum cases are singletons - same case === same case.',
        'Heads === Heads is true, Heads === Tails is false.',
        'Output is "same diff".',
      ],
      concepts: ['enum-comparison', 'identity-check', 'singleton'],
    },
    {
      id: 'php-enums-17',
      title: 'Predict Enum cases() Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict what this code outputs.',
      skeleton: `<?php
enum Bit: int {
    case Zero = 0;
    case One = 1;
}

echo count(Bit::cases());
echo ' ';
echo Bit::cases()[1]->value;`,
      solution: `2 1`,
      hints: [
        'cases() returns an array of all enum cases.',
        'There are 2 cases so count is 2.',
        'Index [1] is Bit::One with value 1.',
      ],
      concepts: ['cases-method', 'count', 'array-index'],
    },
    {
      id: 'php-enums-18',
      title: 'Predict tryFrom with Invalid Value',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict what this code outputs.',
      skeleton: `<?php
enum Lang: string {
    case PHP = 'php';
    case JS = 'js';
}

\$result = Lang::tryFrom('python');
echo \$result === null ? 'null' : \$result->value;`,
      solution: `null`,
      hints: [
        'tryFrom returns null when the value does not match any case.',
        '"python" is not a valid backing value.',
        'The ternary outputs "null".',
      ],
      concepts: ['tryFrom', 'null-return', 'safe-conversion'],
    },
    {
      id: 'php-enums-19',
      title: 'Refactor Constants to Enum',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the class constants into a proper PHP 8.1 enum.',
      skeleton: `<?php
class OrderStatus {
    const PENDING = 'pending';
    const SHIPPED = 'shipped';
    const DELIVERED = 'delivered';

    public static function isValid(string \$status): bool {
        return in_array(\$status, [self::PENDING, self::SHIPPED, self::DELIVERED]);
    }
}`,
      solution: `<?php
enum OrderStatus: string {
    case Pending = 'pending';
    case Shipped = 'shipped';
    case Delivered = 'delivered';

    public static function isValid(string \$status): bool {
        return self::tryFrom(\$status) !== null;
    }
}`,
      hints: [
        'Convert class constants to enum cases with string backing.',
        'isValid can use tryFrom instead of in_array.',
        'tryFrom returns null for invalid values.',
      ],
      concepts: ['refactor-to-enum', 'tryFrom', 'type-safety'],
    },
    {
      id: 'php-enums-20',
      title: 'Refactor Switch to Enum Method',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the external switch into a method on the enum itself.',
      skeleton: `<?php
enum Shape {
    case Circle;
    case Square;
    case Triangle;
}

function sides(Shape \$s): int {
    switch (\$s) {
        case Shape::Circle: return 0;
        case Shape::Square: return 4;
        case Shape::Triangle: return 3;
    }
}

echo sides(Shape::Square);`,
      solution: `<?php
enum Shape {
    case Circle;
    case Square;
    case Triangle;

    public function sides(): int {
        return match(\$this) {
            self::Circle => 0,
            self::Square => 4,
            self::Triangle => 3,
        };
    }
}

echo Shape::Square->sides();`,
      hints: [
        'Move the function into the enum as a method.',
        'Replace switch with a match expression on $this.',
        'Call it as Shape::Square->sides().',
      ],
      concepts: ['encapsulate-behavior', 'match-expression', 'enum-method'],
    },
  ],
};
