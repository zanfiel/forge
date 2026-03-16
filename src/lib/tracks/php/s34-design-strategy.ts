import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-strategy',
  title: '34. Strategy',
  explanation: `## Strategy Pattern in PHP

The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It lets the algorithm vary independently from clients that use it.

### Strategy Interface
\`\`\`php
<?php
interface SortStrategy {
    public function sort(array &\\\$data): void;
}

class BubbleSort implements SortStrategy {
    public function sort(array &\\\$data): void {
        // Bubble sort implementation
    }
}

class QuickSort implements SortStrategy {
    public function sort(array &\\\$data): void {
        sort(\\\$data); // PHP's built-in quicksort
    }
}
\`\`\`

### Context Class
\`\`\`php
<?php
class Sorter {
    public function __construct(
        private SortStrategy \\\$strategy
    ) {}

    public function setStrategy(SortStrategy \\\$strategy): void {
        \\\$this->strategy = \\\$strategy;
    }

    public function sort(array &\\\$data): void {
        \\\$this->strategy->sort(\\\$data);
    }
}

\\\$sorter = new Sorter(new QuickSort());
\\\$sorter->sort(\\\$data);
\\\$sorter->setStrategy(new BubbleSort());
\\\$sorter->sort(\\\$smallData);
\`\`\`

### Validation Strategies
\`\`\`php
<?php
interface ValidationStrategy {
    public function validate(mixed \\\$value): bool;
}

class EmailValidation implements ValidationStrategy {
    public function validate(mixed \\\$value): bool {
        return filter_var(\\\$value, FILTER_VALIDATE_EMAIL) !== false;
    }
}

class RangeValidation implements ValidationStrategy {
    public function __construct(
        private int \\\$min,
        private int \\\$max
    ) {}

    public function validate(mixed \\\$value): bool {
        return \\\$value >= \\\$this->min && \\\$value <= \\\$this->max;
    }
}
\`\`\``,
  exercises: [
    {
      id: 'php-strategy-1',
      title: 'Define Strategy Interface',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to define the strategy interface with a single method.',
      skeleton: `<?php
___ PaymentStrategy {
    public function pay(float \\\$amount): bool;
}`,
      solution: `<?php
interface PaymentStrategy {
    public function pay(float \\\$amount): bool;
}`,
      hints: [
        'Strategies are defined as interfaces',
        'Each concrete strategy implements this interface',
        'Use the interface keyword',
      ],
      concepts: ['strategy', 'interface'],
    },
    {
      id: 'php-strategy-2',
      title: 'Inject Strategy via Constructor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to accept the strategy through constructor injection.',
      skeleton: `<?php
class PaymentProcessor {
    public function __construct(
        private ___ \\\$strategy
    ) {}

    public function processPayment(float \\\$amount): bool {
        return \\\$this->strategy->pay(\\\$amount);
    }
}`,
      solution: `<?php
class PaymentProcessor {
    public function __construct(
        private PaymentStrategy \\\$strategy
    ) {}

    public function processPayment(float \\\$amount): bool {
        return \\\$this->strategy->pay(\\\$amount);
    }
}`,
      hints: [
        'Type the property with the strategy interface',
        'This allows any implementation to be injected',
        'Use the interface type PaymentStrategy',
      ],
      concepts: ['constructor-injection', 'strategy'],
    },
    {
      id: 'php-strategy-3',
      title: 'Implement Concrete Strategy',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to implement a concrete strategy class.',
      skeleton: `<?php
class CreditCardPayment ___ PaymentStrategy {
    public function pay(float \\\$amount): bool {
        echo "Charging \\\$amount to credit card";
        return true;
    }
}`,
      solution: `<?php
class CreditCardPayment implements PaymentStrategy {
    public function pay(float \\\$amount): bool {
        echo "Charging \\\$amount to credit card";
        return true;
    }
}`,
      hints: [
        'Concrete strategies implement the interface',
        'Use the implements keyword',
        'The class must define all methods from the interface',
      ],
      concepts: ['strategy', 'implements'],
    },
    {
      id: 'php-strategy-4',
      title: 'Switch Strategy at Runtime',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to change the strategy at runtime.',
      skeleton: `<?php
class Compressor {
    private CompressionStrategy \\\$strategy;

    public function __construct(CompressionStrategy \\\$strategy) {
        \\\$this->strategy = \\\$strategy;
    }

    public function ___( CompressionStrategy \\\$strategy): void {
        \\\$this->strategy = \\\$strategy;
    }

    public function compress(string \\\$data): string {
        return \\\$this->strategy->compress(\\\$data);
    }
}`,
      solution: `<?php
class Compressor {
    private CompressionStrategy \\\$strategy;

    public function __construct(CompressionStrategy \\\$strategy) {
        \\\$this->strategy = \\\$strategy;
    }

    public function setStrategy(CompressionStrategy \\\$strategy): void {
        \\\$this->strategy = \\\$strategy;
    }

    public function compress(string \\\$data): string {
        return \\\$this->strategy->compress(\\\$data);
    }
}`,
      hints: [
        'A setter method allows changing the strategy after creation',
        'Name it descriptively - setStrategy is conventional',
        'It replaces the current strategy with a new one',
      ],
      concepts: ['strategy', 'runtime-switching'],
    },
    {
      id: 'php-strategy-5',
      title: 'Closure as Strategy',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to accept a callable as a lightweight strategy.',
      skeleton: `<?php
class Formatter {
    public function __construct(
        private ___ \\\$formatFn
    ) {}

    public function format(string \\\$text): string {
        return (\\\$this->formatFn)(\\\$text);
    }
}

\\\$upper = new Formatter(fn(string \\\$s) => strtoupper(\\\$s));`,
      solution: `<?php
class Formatter {
    public function __construct(
        private \\Closure \\\$formatFn
    ) {}

    public function format(string \\\$text): string {
        return (\\\$this->formatFn)(\\\$text);
    }
}

\\\$upper = new Formatter(fn(string \\\$s) => strtoupper(\\\$s));`,
      hints: [
        'Closures can serve as lightweight strategies',
        'Type the property as Closure',
        'Call it with parentheses: (\$this->fn)()',
      ],
      concepts: ['strategy', 'closures'],
    },
    {
      id: 'php-strategy-6',
      title: 'Strategy Return Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the return type for the strategy method.',
      skeleton: `<?php
interface DiscountStrategy {
    public function calculate(float \\\$price): ___;
}

class PercentDiscount implements DiscountStrategy {
    public function __construct(private float \\\$percent) {}

    public function calculate(float \\\$price): float {
        return \\\$price * (1 - \\\$this->percent / 100);
    }
}`,
      solution: `<?php
interface DiscountStrategy {
    public function calculate(float \\\$price): float;
}

class PercentDiscount implements DiscountStrategy {
    public function __construct(private float \\\$percent) {}

    public function calculate(float \\\$price): float {
        return \\\$price * (1 - \\\$this->percent / 100);
    }
}`,
      hints: [
        'The method calculates a price and returns a number',
        'Prices are floating point values',
        'Use float as the return type',
      ],
      concepts: ['strategy', 'return-types'],
    },
    {
      id: 'php-strategy-7',
      title: 'Complete Sorting Strategy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a SortStrategy interface and two implementations: AscendingSort and DescendingSort. Then write a DataSorter context class that uses the strategy.',
      skeleton: `<?php
// SortStrategy interface with sort(array): array
// AscendingSort implementation
// DescendingSort implementation
// DataSorter context class`,
      solution: `<?php
interface SortStrategy {
    public function sort(array \\\$data): array;
}

class AscendingSort implements SortStrategy {
    public function sort(array \\\$data): array {
        sort(\\\$data);
        return \\\$data;
    }
}

class DescendingSort implements SortStrategy {
    public function sort(array \\\$data): array {
        rsort(\\\$data);
        return \\\$data;
    }
}

class DataSorter {
    public function __construct(private SortStrategy \\\$strategy) {}

    public function setStrategy(SortStrategy \\\$strategy): void {
        \\\$this->strategy = \\\$strategy;
    }

    public function sort(array \\\$data): array {
        return \\\$this->strategy->sort(\\\$data);
    }
}`,
      hints: [
        'Define an interface with a sort method',
        'AscendingSort uses sort(), DescendingSort uses rsort()',
        'DataSorter delegates to the injected strategy',
      ],
      concepts: ['strategy', 'sorting', 'context-class'],
    },
    {
      id: 'php-strategy-8',
      title: 'Validation Strategy Set',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a Validator class that accepts an array of ValidationStrategy objects and runs all of them on a value. Return an array of error messages for failed validations.',
      skeleton: `<?php
interface ValidationStrategy {
    public function validate(mixed \\\$value): bool;
    public function getMessage(): string;
}

class Validator {
    // Accept array of strategies
    // validate(mixed \\\$value): array of error messages
}`,
      solution: `<?php
interface ValidationStrategy {
    public function validate(mixed \\\$value): bool;
    public function getMessage(): string;
}

class Validator {
    private array \\\$strategies = [];

    public function addStrategy(ValidationStrategy \\\$strategy): self {
        \\\$this->strategies[] = \\\$strategy;
        return \\\$this;
    }

    public function validate(mixed \\\$value): array {
        \\\$errors = [];
        foreach (\\\$this->strategies as \\\$strategy) {
            if (!\\\$strategy->validate(\\\$value)) {
                \\\$errors[] = \\\$strategy->getMessage();
            }
        }
        return \\\$errors;
    }
}`,
      hints: [
        'Store strategies in an array',
        'Run each strategy and collect failures',
        'Return error messages from failed strategies',
      ],
      concepts: ['strategy', 'validation', 'composite'],
    },
    {
      id: 'php-strategy-9',
      title: 'Shipping Cost Calculator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a ShippingStrategy interface with calculate(float \$weight, float \$distance): float, and two implementations: FlatRateShipping (always returns 9.99) and WeightBasedShipping (\$0.50 per kg plus \$0.01 per km).',
      skeleton: `<?php
// ShippingStrategy interface
// FlatRateShipping implementation
// WeightBasedShipping implementation`,
      solution: `<?php
interface ShippingStrategy {
    public function calculate(float \\\$weight, float \\\$distance): float;
}

class FlatRateShipping implements ShippingStrategy {
    public function calculate(float \\\$weight, float \\\$distance): float {
        return 9.99;
    }
}

class WeightBasedShipping implements ShippingStrategy {
    public function calculate(float \\\$weight, float \\\$distance): float {
        return (\\\$weight * 0.50) + (\\\$distance * 0.01);
    }
}`,
      hints: [
        'Both classes implement the same interface',
        'FlatRateShipping ignores the parameters',
        'WeightBasedShipping uses both weight and distance',
      ],
      concepts: ['strategy', 'shipping', 'polymorphism'],
    },
    {
      id: 'php-strategy-10',
      title: 'Strategy with Factory Selection',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a TextFormatter that uses a strategy selected via a factory method. Strategies: uppercase, lowercase, titlecase. Include a format(string, string) method that selects and applies the strategy.',
      skeleton: `<?php
// FormatStrategy interface
// UpperCase, LowerCase, TitleCase implementations
// TextFormatter with format(string \\\$text, string \\\$style): string`,
      solution: `<?php
interface FormatStrategy {
    public function apply(string \\\$text): string;
}

class UpperCaseStrategy implements FormatStrategy {
    public function apply(string \\\$text): string {
        return strtoupper(\\\$text);
    }
}

class LowerCaseStrategy implements FormatStrategy {
    public function apply(string \\\$text): string {
        return strtolower(\\\$text);
    }
}

class TitleCaseStrategy implements FormatStrategy {
    public function apply(string \\\$text): string {
        return ucwords(strtolower(\\\$text));
    }
}

class TextFormatter {
    public function format(string \\\$text, string \\\$style): string {
        \\\$strategy = match (\\\$style) {
            'upper' => new UpperCaseStrategy(),
            'lower' => new LowerCaseStrategy(),
            'title' => new TitleCaseStrategy(),
            default => throw new InvalidArgumentException("Unknown style: \\\$style"),
        };
        return \\\$strategy->apply(\\\$text);
    }
}`,
      hints: [
        'Use match expression to select the strategy',
        'Each strategy implements FormatStrategy',
        'The formatter delegates to the selected strategy',
      ],
      concepts: ['strategy', 'factory', 'text-formatting'],
    },
    {
      id: 'php-strategy-11',
      title: 'Configurable Retry Strategy',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a RetryStrategy interface with shouldRetry(int \$attempt, Exception \$e): bool and getDelay(int \$attempt): int. Implement LinearBackoff (fixed delay * attempt) and ExponentialBackoff (delay * 2^attempt).',
      skeleton: `<?php
// RetryStrategy interface
// LinearBackoff(int \\\$baseDelay)
// ExponentialBackoff(int \\\$baseDelay)`,
      solution: `<?php
interface RetryStrategy {
    public function shouldRetry(int \\\$attempt, \\Exception \\\$e): bool;
    public function getDelay(int \\\$attempt): int;
}

class LinearBackoff implements RetryStrategy {
    public function __construct(
        private int \\\$baseDelay,
        private int \\\$maxAttempts = 3
    ) {}

    public function shouldRetry(int \\\$attempt, \\Exception \\\$e): bool {
        return \\\$attempt < \\\$this->maxAttempts;
    }

    public function getDelay(int \\\$attempt): int {
        return \\\$this->baseDelay * \\\$attempt;
    }
}

class ExponentialBackoff implements RetryStrategy {
    public function __construct(
        private int \\\$baseDelay,
        private int \\\$maxAttempts = 5
    ) {}

    public function shouldRetry(int \\\$attempt, \\Exception \\\$e): bool {
        return \\\$attempt < \\\$this->maxAttempts;
    }

    public function getDelay(int \\\$attempt): int {
        return \\\$this->baseDelay * (2 ** \\\$attempt);
    }
}`,
      hints: [
        'Both strategies decide when to retry and how long to wait',
        'Linear: delay grows linearly (100, 200, 300)',
        'Exponential: delay doubles each time (100, 200, 400, 800)',
      ],
      concepts: ['strategy', 'retry-logic', 'backoff'],
    },
    {
      id: 'php-strategy-12',
      title: 'Pricing Strategy with Context',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a PricingStrategy interface and a Cart class that applies the strategy. Strategies: RegularPricing (no discount), MemberPricing (10% off), VIPPricing (20% off).',
      skeleton: `<?php
// PricingStrategy with getPrice(float \\\$basePrice): float
// RegularPricing, MemberPricing, VIPPricing
// Cart with addItem, getTotal using strategy`,
      solution: `<?php
interface PricingStrategy {
    public function getPrice(float \\\$basePrice): float;
}

class RegularPricing implements PricingStrategy {
    public function getPrice(float \\\$basePrice): float {
        return \\\$basePrice;
    }
}

class MemberPricing implements PricingStrategy {
    public function getPrice(float \\\$basePrice): float {
        return \\\$basePrice * 0.9;
    }
}

class VIPPricing implements PricingStrategy {
    public function getPrice(float \\\$basePrice): float {
        return \\\$basePrice * 0.8;
    }
}

class Cart {
    private array \\\$items = [];

    public function __construct(private PricingStrategy \\\$pricing) {}

    public function addItem(float \\\$price): void {
        \\\$this->items[] = \\\$price;
    }

    public function getTotal(): float {
        \\\$total = 0.0;
        foreach (\\\$this->items as \\\$price) {
            \\\$total += \\\$this->pricing->getPrice(\\\$price);
        }
        return \\\$total;
    }
}`,
      hints: [
        'Each pricing strategy applies a different discount',
        'Cart uses the strategy for each item price calculation',
        'The strategy is injected via constructor',
      ],
      concepts: ['strategy', 'pricing', 'context-class'],
    },
    {
      id: 'php-strategy-13',
      title: 'Fix Strategy Not Being Used',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the context class that ignores the injected strategy and uses hardcoded logic.',
      skeleton: `<?php
class Encryptor {
    public function __construct(private EncryptionStrategy \\\$strategy) {}

    public function encrypt(string \\\$data): string {
        // Bug: ignores strategy, uses hardcoded base64
        return base64_encode(\\\$data);
    }
}`,
      solution: `<?php
class Encryptor {
    public function __construct(private EncryptionStrategy \\\$strategy) {}

    public function encrypt(string \\\$data): string {
        return \\\$this->strategy->encrypt(\\\$data);
    }
}`,
      hints: [
        'The method should delegate to the strategy',
        'Use \$this->strategy->encrypt() instead of hardcoded logic',
        'The whole point of Strategy pattern is delegation',
      ],
      concepts: ['strategy', 'delegation', 'debugging'],
    },
    {
      id: 'php-strategy-14',
      title: 'Fix Wrong Strategy Interface',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the implementation that does not match the interface contract.',
      skeleton: `<?php
interface Renderer {
    public function render(array \\\$data): string;
}

class JsonRenderer implements Renderer {
    // Bug: wrong parameter type
    public function render(string \\\$data): string {
        return json_encode(\\\$data);
    }
}

class HtmlRenderer implements Renderer {
    // Bug: wrong return type
    public function render(array \\\$data): void {
        echo '<ul>';
        foreach (\\\$data as \\\$item) {
            echo "<li>\\\$item</li>";
        }
        echo '</ul>';
    }
}`,
      solution: `<?php
interface Renderer {
    public function render(array \\\$data): string;
}

class JsonRenderer implements Renderer {
    public function render(array \\\$data): string {
        return json_encode(\\\$data);
    }
}

class HtmlRenderer implements Renderer {
    public function render(array \\\$data): string {
        \\\$html = '<ul>';
        foreach (\\\$data as \\\$item) {
            \\\$html .= "<li>\\\$item</li>";
        }
        \\\$html .= '</ul>';
        return \\\$html;
    }
}`,
      hints: [
        'Implementations must match the interface signature exactly',
        'JsonRenderer needs array parameter, not string',
        'HtmlRenderer needs to return string, not void',
      ],
      concepts: ['strategy', 'interface-contract', 'debugging'],
    },
    {
      id: 'php-strategy-15',
      title: 'Fix Strategy Mutating Shared State',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the strategy that incorrectly mutates the input array by reference.',
      skeleton: `<?php
interface FilterStrategy {
    public function filter(array \\\$items): array;
}

class ActiveFilter implements FilterStrategy {
    public function filter(array \\\$items): array {
        // Bug: modifying original array via reference
        foreach (\\\$items as \\\$key => &\\\$item) {
            if (!\\\$item['active']) {
                unset(\\\$items[\\\$key]);
            }
        }
        return \\\$items;
    }
}`,
      solution: `<?php
interface FilterStrategy {
    public function filter(array \\\$items): array;
}

class ActiveFilter implements FilterStrategy {
    public function filter(array \\\$items): array {
        return array_filter(\\\$items, fn(\\\$item) => \\\$item['active']);
    }
}`,
      hints: [
        'Strategies should not modify the original data',
        'Use array_filter to return a new filtered array',
        'This avoids side effects on the input',
      ],
      concepts: ['strategy', 'immutability', 'side-effects'],
    },
    {
      id: 'php-strategy-16',
      title: 'Predict Strategy Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the output when switching strategies.',
      skeleton: `<?php
interface Greeter { public function greet(string \\\$name): string; }
class FormalGreeter implements Greeter {
    public function greet(string \\\$name): string { return "Good day, \\\$name."; }
}
class CasualGreeter implements Greeter {
    public function greet(string \\\$name): string { return "Hey \\\$name!"; }
}

class App {
    public function __construct(private Greeter \\\$g) {}
    public function setGreeter(Greeter \\\$g): void { \\\$this->g = \\\$g; }
    public function hello(string \\\$name): string { return \\\$this->g->greet(\\\$name); }
}

\\\$app = new App(new FormalGreeter());
echo \\\$app->hello('Alice') . "\\n";
\\\$app->setGreeter(new CasualGreeter());
echo \\\$app->hello('Bob');`,
      solution: `Good day, Alice.
Hey Bob!`,
      hints: [
        'First call uses FormalGreeter',
        'After setGreeter, it switches to CasualGreeter',
        'Each greeter has its own format',
      ],
      concepts: ['strategy', 'runtime-switching'],
    },
    {
      id: 'php-strategy-17',
      title: 'Predict Discount Calculation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the total with different pricing strategies.',
      skeleton: `<?php
interface Pricing { public function apply(float \\\$p): float; }
class Full implements Pricing { public function apply(float \\\$p): float { return \\\$p; } }
class Half implements Pricing { public function apply(float \\\$p): float { return \\\$p * 0.5; } }

\\\$strat = new Half();
\\\$total = \\\$strat->apply(100) + \\\$strat->apply(50);
echo \\\$total;`,
      solution: `75`,
      hints: [
        'Half strategy returns 50% of the price',
        '100 * 0.5 = 50, 50 * 0.5 = 25',
        '50 + 25 = 75',
      ],
      concepts: ['strategy', 'pricing-calculation'],
    },
    {
      id: 'php-strategy-18',
      title: 'Predict Strategy Selection',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict which strategy is used based on the match expression.',
      skeleton: `<?php
interface Enc { public function run(string \\\$s): string; }
class Base64Enc implements Enc { public function run(string \\\$s): string { return base64_encode(\\\$s); } }
class Rot13Enc implements Enc { public function run(string \\\$s): string { return str_rot13(\\\$s); } }

\\\$type = 'rot13';
\\\$enc = match(\\\$type) {
    'base64' => new Base64Enc(),
    'rot13' => new Rot13Enc(),
};
echo \\\$enc->run('hello');`,
      solution: `uryyb`,
      hints: [
        'type is "rot13" so Rot13Enc is selected',
        'str_rot13 rotates each letter by 13 positions',
        'h->u, e->r, l->y, l->y, o->b',
      ],
      concepts: ['strategy', 'match-expression'],
    },
    {
      id: 'php-strategy-19',
      title: 'Refactor Conditionals to Strategy',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the method with conditionals into a strategy pattern.',
      skeleton: `<?php
class Report {
    public function export(array \\\$data, string \\\$format): string {
        if (\\\$format === 'json') {
            return json_encode(\\\$data, JSON_PRETTY_PRINT);
        } elseif (\\\$format === 'csv') {
            \\\$lines = [];
            foreach (\\\$data as \\\$row) {
                \\\$lines[] = implode(',', \\\$row);
            }
            return implode("\\n", \\\$lines);
        } elseif (\\\$format === 'text') {
            \\\$output = '';
            foreach (\\\$data as \\\$row) {
                \\\$output .= implode("\\t", \\\$row) . "\\n";
            }
            return \\\$output;
        }
        throw new InvalidArgumentException("Unknown format");
    }
}`,
      solution: `<?php
interface ExportStrategy {
    public function export(array \\\$data): string;
}

class JsonExport implements ExportStrategy {
    public function export(array \\\$data): string {
        return json_encode(\\\$data, JSON_PRETTY_PRINT);
    }
}

class CsvExport implements ExportStrategy {
    public function export(array \\\$data): string {
        \\\$lines = [];
        foreach (\\\$data as \\\$row) {
            \\\$lines[] = implode(',', \\\$row);
        }
        return implode("\\n", \\\$lines);
    }
}

class TextExport implements ExportStrategy {
    public function export(array \\\$data): string {
        \\\$output = '';
        foreach (\\\$data as \\\$row) {
            \\\$output .= implode("\\t", \\\$row) . "\\n";
        }
        return \\\$output;
    }
}

class Report {
    public function __construct(private ExportStrategy \\\$strategy) {}

    public function export(array \\\$data): string {
        return \\\$this->strategy->export(\\\$data);
    }
}`,
      hints: [
        'Extract each format branch into its own strategy class',
        'Create an ExportStrategy interface',
        'Inject the strategy into Report',
      ],
      concepts: ['strategy', 'refactoring', 'open-closed-principle'],
    },
    {
      id: 'php-strategy-20',
      title: 'Refactor Hardcoded Algorithm to Strategy',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the search class with multiple hardcoded algorithms into interchangeable strategies.',
      skeleton: `<?php
class ProductSearch {
    public function search(array \\\$products, string \\\$query, string \\\$algorithm): array {
        if (\\\$algorithm === 'exact') {
            return array_filter(\\\$products, fn(\\\$p) => \\\$p['name'] === \\\$query);
        } elseif (\\\$algorithm === 'contains') {
            return array_filter(\\\$products, fn(\\\$p) => str_contains(\\\$p['name'], \\\$query));
        } elseif (\\\$algorithm === 'fuzzy') {
            return array_filter(\\\$products, function(\\\$p) use (\\\$query) {
                return similar_text(\\\$p['name'], \\\$query) > strlen(\\\$query) * 0.6;
            });
        }
        return [];
    }
}`,
      solution: `<?php
interface SearchStrategy {
    public function matches(array \\\$item, string \\\$query): bool;
}

class ExactMatch implements SearchStrategy {
    public function matches(array \\\$item, string \\\$query): bool {
        return \\\$item['name'] === \\\$query;
    }
}

class ContainsMatch implements SearchStrategy {
    public function matches(array \\\$item, string \\\$query): bool {
        return str_contains(\\\$item['name'], \\\$query);
    }
}

class FuzzyMatch implements SearchStrategy {
    public function matches(array \\\$item, string \\\$query): bool {
        return similar_text(\\\$item['name'], \\\$query) > strlen(\\\$query) * 0.6;
    }
}

class ProductSearch {
    public function __construct(private SearchStrategy \\\$strategy) {}

    public function search(array \\\$products, string \\\$query): array {
        return array_filter(\\\$products, fn(\\\$p) => \\\$this->strategy->matches(\\\$p, \\\$query));
    }
}`,
      hints: [
        'Each algorithm becomes a SearchStrategy implementation',
        'The interface has a matches() method for individual items',
        'ProductSearch uses array_filter with the strategy',
      ],
      concepts: ['strategy', 'search-algorithms', 'refactoring'],
    },
  ],
};
