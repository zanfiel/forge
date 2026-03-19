import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-decorator',
  title: '35. Decorator',
  explanation: `## Decorator Pattern in PHP

The Decorator pattern attaches additional responsibilities to an object dynamically. It provides a flexible alternative to subclassing for extending functionality.

### Component Interface
\`\`\`php
<?php
interface Logger {
    public function log(string \\\$message): void;
}

class FileLogger implements Logger {
    public function log(string \\\$message): void {
        file_put_contents('app.log', \\\$message . "\\n", FILE_APPEND);
    }
}
\`\`\`

### Decorator
\`\`\`php
<?php
class TimestampLogger implements Logger {
    public function __construct(private Logger \\\$inner) {}

    public function log(string \\\$message): void {
        \\\$timestamp = date('Y-m-d H:i:s');
        \\\$this->inner->log("[\\\$timestamp] \\\$message");
    }
}

class UpperCaseLogger implements Logger {
    public function __construct(private Logger \\\$inner) {}

    public function log(string \\\$message): void {
        \\\$this->inner->log(strtoupper(\\\$message));
    }
}

// Stack decorators
\\\$logger = new TimestampLogger(
    new UpperCaseLogger(
        new FileLogger()
    )
);
\\\$logger->log('hello'); // [2024-01-01 12:00:00] HELLO
\`\`\`

### Middleware as Decorator
\`\`\`php
<?php
interface Handler {
    public function handle(Request \\\$request): Response;
}

class AuthMiddleware implements Handler {
    public function __construct(private Handler \\\$next) {}

    public function handle(Request \\\$request): Response {
        if (!\\\$request->hasAuth()) {
            return new Response(401);
        }
        return \\\$this->next->handle(\\\$request);
    }
}
\`\`\``,
  exercises: [
    {
      id: 'php-decorator-1',
      title: 'Decorator Wraps Inner',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to store the wrapped component.',
      skeleton: `<?php
class BoldFormatter implements TextFormatter {
    public function __construct(private ___ \\\$inner) {}

    public function format(string \\\$text): string {
        return '<b>' . \\\$this->inner->format(\\\$text) . '</b>';
    }
}`,
      solution: `<?php
class BoldFormatter implements TextFormatter {
    public function __construct(private TextFormatter \\\$inner) {}

    public function format(string \\\$text): string {
        return '<b>' . \\\$this->inner->format(\\\$text) . '</b>';
    }
}`,
      hints: [
        'The decorator wraps an object of the same interface',
        'Type the inner property with the interface',
        'This allows stacking multiple decorators',
      ],
      concepts: ['decorator', 'wrapping'],
    },
    {
      id: 'php-decorator-2',
      title: 'Delegate to Inner',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to delegate the call to the wrapped object.',
      skeleton: `<?php
class CachingRepository implements UserRepository {
    private array \\\$cache = [];

    public function __construct(private UserRepository \\\$inner) {}

    public function find(int \\\$id): ?User {
        if (!isset(\\\$this->cache[\\\$id])) {
            \\\$this->cache[\\\$id] = \\\$this->___->find(\\\$id);
        }
        return \\\$this->cache[\\\$id];
    }
}`,
      solution: `<?php
class CachingRepository implements UserRepository {
    private array \\\$cache = [];

    public function __construct(private UserRepository \\\$inner) {}

    public function find(int \\\$id): ?User {
        if (!isset(\\\$this->cache[\\\$id])) {
            \\\$this->cache[\\\$id] = \\\$this->inner->find(\\\$id);
        }
        return \\\$this->cache[\\\$id];
    }
}`,
      hints: [
        'The decorator adds caching behavior',
        'On cache miss, it delegates to the wrapped repository',
        'Use \$this->inner to access the wrapped object',
      ],
      concepts: ['decorator', 'delegation', 'caching'],
    },
    {
      id: 'php-decorator-3',
      title: 'Implement Same Interface',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank so the decorator implements the same interface as the component.',
      skeleton: `<?php
interface Notifier {
    public function send(string \\\$message): void;
}

class EmailNotifier implements Notifier {
    public function send(string \\\$message): void {
        echo "Email: \\\$message";
    }
}

class SlackDecorator ___ Notifier {
    public function __construct(private Notifier \\\$wrapped) {}

    public function send(string \\\$message): void {
        \\\$this->wrapped->send(\\\$message);
        echo "Slack: \\\$message";
    }
}`,
      solution: `<?php
interface Notifier {
    public function send(string \\\$message): void;
}

class EmailNotifier implements Notifier {
    public function send(string \\\$message): void {
        echo "Email: \\\$message";
    }
}

class SlackDecorator implements Notifier {
    public function __construct(private Notifier \\\$wrapped) {}

    public function send(string \\\$message): void {
        \\\$this->wrapped->send(\\\$message);
        echo "Slack: \\\$message";
    }
}`,
      hints: [
        'Decorators must implement the same interface as the component',
        'This makes them interchangeable',
        'Use the implements keyword',
      ],
      concepts: ['decorator', 'interface'],
    },
    {
      id: 'php-decorator-4',
      title: 'Stack Multiple Decorators',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to stack two decorators on a base logger.',
      skeleton: `<?php
\\\$logger = new TimestampDecorator(
    new ___(
        new FileLogger()
    )
);`,
      solution: `<?php
\\\$logger = new TimestampDecorator(
    new JsonFormatDecorator(
        new FileLogger()
    )
);`,
      hints: [
        'Decorators wrap other decorators, creating a chain',
        'The innermost is the base component',
        'Each decorator adds a layer of behavior',
      ],
      concepts: ['decorator', 'stacking', 'composition'],
    },
    {
      id: 'php-decorator-5',
      title: 'Pre-Processing Decorator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to add pre-processing before delegation.',
      skeleton: `<?php
class TrimDecorator implements InputProcessor {
    public function __construct(private InputProcessor \\\$inner) {}

    public function process(string \\\$input): string {
        \\\$cleaned = trim(\\\$input);
        return \\\$this->___->process(\\\$cleaned);
    }
}`,
      solution: `<?php
class TrimDecorator implements InputProcessor {
    public function __construct(private InputProcessor \\\$inner) {}

    public function process(string \\\$input): string {
        \\\$cleaned = trim(\\\$input);
        return \\\$this->inner->process(\\\$cleaned);
    }
}`,
      hints: [
        'Pre-processing modifies the input before delegation',
        'After trimming, pass to the inner processor',
        'Use \$this->inner to delegate',
      ],
      concepts: ['decorator', 'pre-processing'],
    },
    {
      id: 'php-decorator-6',
      title: 'Post-Processing Decorator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to add post-processing after delegation.',
      skeleton: `<?php
class CompressDecorator implements DataStore {
    public function __construct(private DataStore \\\$inner) {}

    public function read(string \\\$key): string {
        \\\$data = \\\$this->inner->___(\\\$key);
        return gzuncompress(\\\$data);
    }
}`,
      solution: `<?php
class CompressDecorator implements DataStore {
    public function __construct(private DataStore \\\$inner) {}

    public function read(string \\\$key): string {
        \\\$data = \\\$this->inner->read(\\\$key);
        return gzuncompress(\\\$data);
    }
}`,
      hints: [
        'Post-processing modifies the result after delegation',
        'First delegate to inner, then transform the result',
        'Call the same method on the inner component',
      ],
      concepts: ['decorator', 'post-processing'],
    },
    {
      id: 'php-decorator-7',
      title: 'Build Complete Decorator Chain',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a MessageFormatter interface, a PlainFormatter base, and two decorators: HtmlEscapeDecorator (escapes HTML) and PrefixDecorator (adds a prefix string).',
      skeleton: `<?php
// MessageFormatter interface with format(string): string
// PlainFormatter: returns text as-is
// HtmlEscapeDecorator: escapes HTML entities
// PrefixDecorator: adds configurable prefix`,
      solution: `<?php
interface MessageFormatter {
    public function format(string \\\$text): string;
}

class PlainFormatter implements MessageFormatter {
    public function format(string \\\$text): string {
        return \\\$text;
    }
}

class HtmlEscapeDecorator implements MessageFormatter {
    public function __construct(private MessageFormatter \\\$inner) {}

    public function format(string \\\$text): string {
        \\\$escaped = htmlspecialchars(\\\$text, ENT_QUOTES, 'UTF-8');
        return \\\$this->inner->format(\\\$escaped);
    }
}

class PrefixDecorator implements MessageFormatter {
    public function __construct(
        private MessageFormatter \\\$inner,
        private string \\\$prefix
    ) {}

    public function format(string \\\$text): string {
        return \\\$this->inner->format(\\\$this->prefix . \\\$text);
    }
}`,
      hints: [
        'Each decorator wraps a MessageFormatter',
        'HtmlEscapeDecorator escapes before passing to inner',
        'PrefixDecorator prepends the prefix before delegation',
      ],
      concepts: ['decorator', 'composition', 'chain'],
    },
    {
      id: 'php-decorator-8',
      title: 'Logging Decorator for Repository',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a LoggingUserRepository decorator that logs all calls to find() and save() methods before delegating to the inner repository.',
      skeleton: `<?php
interface UserRepository {
    public function find(int \\\$id): ?array;
    public function save(array \\\$user): void;
}

// Write LoggingUserRepository that wraps UserRepository
// Log method calls to an output array`,
      solution: `<?php
interface UserRepository {
    public function find(int \\\$id): ?array;
    public function save(array \\\$user): void;
}

class LoggingUserRepository implements UserRepository {
    public array \\\$logs = [];

    public function __construct(private UserRepository \\\$inner) {}

    public function find(int \\\$id): ?array {
        \\\$this->logs[] = "find(\\\$id)";
        return \\\$this->inner->find(\\\$id);
    }

    public function save(array \\\$user): void {
        \\\$this->logs[] = "save(" . (\\\$user['name'] ?? 'unknown') . ")";
        \\\$this->inner->save(\\\$user);
    }
}`,
      hints: [
        'Implement the same interface as the inner repository',
        'Log the operation before delegating',
        'Store logs in a public array for inspection',
      ],
      concepts: ['decorator', 'logging', 'cross-cutting-concerns'],
    },
    {
      id: 'php-decorator-9',
      title: 'Retry Decorator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a RetryDecorator for an HttpClient interface that retries failed requests up to a configurable number of attempts.',
      skeleton: `<?php
interface HttpClient {
    public function get(string \\\$url): string;
}

// Write RetryDecorator that retries on exception
// Constructor takes HttpClient and maxRetries`,
      solution: `<?php
interface HttpClient {
    public function get(string \\\$url): string;
}

class RetryDecorator implements HttpClient {
    public function __construct(
        private HttpClient \\\$inner,
        private int \\\$maxRetries = 3
    ) {}

    public function get(string \\\$url): string {
        \\\$lastException = null;
        for (\\\$i = 0; \\\$i <= \\\$this->maxRetries; \\\$i++) {
            try {
                return \\\$this->inner->get(\\\$url);
            } catch (\\Exception \\\$e) {
                \\\$lastException = \\\$e;
            }
        }
        throw \\\$lastException;
    }
}`,
      hints: [
        'Wrap the inner call in a try-catch inside a loop',
        'On success, return immediately',
        'After exhausting retries, throw the last exception',
      ],
      concepts: ['decorator', 'retry-logic', 'error-handling'],
    },
    {
      id: 'php-decorator-10',
      title: 'Middleware Pipeline as Decorators',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a middleware pipeline that wraps a base handler with multiple decorator-style middleware layers. Include a Pipeline class with pipe() and handle() methods.',
      skeleton: `<?php
interface Handler {
    public function handle(string \\\$request): string;
}

// Write middleware decorator pattern
// Pipeline class that adds middleware layers`,
      solution: `<?php
interface Handler {
    public function handle(string \\\$request): string;
}

class BaseHandler implements Handler {
    public function handle(string \\\$request): string {
        return "Response to: \\\$request";
    }
}

class AuthMiddleware implements Handler {
    public function __construct(private Handler \\\$next) {}

    public function handle(string \\\$request): string {
        if (!str_contains(\\\$request, 'auth:')) {
            return '401 Unauthorized';
        }
        return \\\$this->next->handle(\\\$request);
    }
}

class LogMiddleware implements Handler {
    public function __construct(private Handler \\\$next) {}

    public function handle(string \\\$request): string {
        \\\$response = \\\$this->next->handle(\\\$request);
        return "[LOG] \\\$response";
    }
}

class Pipeline {
    private array \\\$middleware = [];

    public function pipe(string \\\$middlewareClass): self {
        \\\$this->middleware[] = \\\$middlewareClass;
        return \\\$this;
    }

    public function handle(Handler \\\$handler, string \\\$request): string {
        \\\$wrapped = \\\$handler;
        foreach (array_reverse(\\\$this->middleware) as \\\$class) {
            \\\$wrapped = new \\\$class(\\\$wrapped);
        }
        return \\\$wrapped->handle(\\\$request);
    }
}`,
      hints: [
        'Middleware wraps the next handler like decorators',
        'Pipeline builds the chain by wrapping from inside out',
        'Reverse the middleware order to maintain correct execution order',
      ],
      concepts: ['decorator', 'middleware', 'pipeline'],
    },
    {
      id: 'php-decorator-11',
      title: 'Caching Decorator with TTL',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a CachingDecorator for a DataFetcher interface that caches results with a time-to-live (TTL) in seconds.',
      skeleton: `<?php
interface DataFetcher {
    public function fetch(string \\\$key): string;
}

// Write CachingDecorator with TTL support`,
      solution: `<?php
interface DataFetcher {
    public function fetch(string \\\$key): string;
}

class CachingDecorator implements DataFetcher {
    private array \\\$cache = [];
    private array \\\$timestamps = [];

    public function __construct(
        private DataFetcher \\\$inner,
        private int \\\$ttl = 60
    ) {}

    public function fetch(string \\\$key): string {
        \\\$now = time();
        if (isset(\\\$this->cache[\\\$key]) && (\\\$now - \\\$this->timestamps[\\\$key]) < \\\$this->ttl) {
            return \\\$this->cache[\\\$key];
        }
        \\\$this->cache[\\\$key] = \\\$this->inner->fetch(\\\$key);
        \\\$this->timestamps[\\\$key] = \\\$now;
        return \\\$this->cache[\\\$key];
    }
}`,
      hints: [
        'Store both the cached value and its timestamp',
        'Check if the cache entry has expired',
        'On miss or expiry, delegate to the inner fetcher',
      ],
      concepts: ['decorator', 'caching', 'TTL'],
    },
    {
      id: 'php-decorator-12',
      title: 'Rate Limiting Decorator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a RateLimitDecorator for an API client that throws an exception if more than N requests are made per minute.',
      skeleton: `<?php
interface ApiClient {
    public function request(string \\\$endpoint): array;
}

// Write RateLimitDecorator with max requests per minute`,
      solution: `<?php
interface ApiClient {
    public function request(string \\\$endpoint): array;
}

class RateLimitDecorator implements ApiClient {
    private array \\\$requestTimes = [];

    public function __construct(
        private ApiClient \\\$inner,
        private int \\\$maxPerMinute = 60
    ) {}

    public function request(string \\\$endpoint): array {
        \\\$now = time();
        \\\$this->requestTimes = array_filter(
            \\\$this->requestTimes,
            fn(\\\$t) => (\\\$now - \\\$t) < 60
        );
        if (count(\\\$this->requestTimes) >= \\\$this->maxPerMinute) {
            throw new RuntimeException('Rate limit exceeded');
        }
        \\\$this->requestTimes[] = \\\$now;
        return \\\$this->inner->request(\\\$endpoint);
    }
}`,
      hints: [
        'Track request timestamps in an array',
        'Filter out timestamps older than 60 seconds',
        'Throw if the count exceeds the limit',
      ],
      concepts: ['decorator', 'rate-limiting'],
    },
    {
      id: 'php-decorator-13',
      title: 'Fix Decorator Not Delegating',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the decorator that adds behavior but forgets to delegate to the wrapped object.',
      skeleton: `<?php
class EncryptionDecorator implements Storage {
    public function __construct(private Storage \\\$inner) {}

    public function save(string \\\$key, string \\\$data): void {
        \\\$encrypted = openssl_encrypt(\\\$data, 'aes-256-cbc', 'secret', 0, '1234567890123456');
        // Bug: never delegates to inner storage
    }

    public function load(string \\\$key): string {
        // Bug: never delegates to inner storage
        return '';
    }
}`,
      solution: `<?php
class EncryptionDecorator implements Storage {
    public function __construct(private Storage \\\$inner) {}

    public function save(string \\\$key, string \\\$data): void {
        \\\$encrypted = openssl_encrypt(\\\$data, 'aes-256-cbc', 'secret', 0, '1234567890123456');
        \\\$this->inner->save(\\\$key, \\\$encrypted);
    }

    public function load(string \\\$key): string {
        \\\$encrypted = \\\$this->inner->load(\\\$key);
        return openssl_decrypt(\\\$encrypted, 'aes-256-cbc', 'secret', 0, '1234567890123456');
    }
}`,
      hints: [
        'Decorators must delegate to the inner component',
        'save() should call \$this->inner->save() with encrypted data',
        'load() should call \$this->inner->load() then decrypt',
      ],
      concepts: ['decorator', 'delegation', 'debugging'],
    },
    {
      id: 'php-decorator-14',
      title: 'Fix Decorator Breaking Interface',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the decorator that returns a different type than the interface specifies.',
      skeleton: `<?php
interface Calculator {
    public function calculate(float \\\$a, float \\\$b): float;
}

class RoundingDecorator implements Calculator {
    public function __construct(private Calculator \\\$inner) {}

    // Bug: returns string instead of float
    public function calculate(float \\\$a, float \\\$b): string {
        \\\$result = \\\$this->inner->calculate(\\\$a, \\\$b);
        return number_format(\\\$result, 2);
    }
}`,
      solution: `<?php
interface Calculator {
    public function calculate(float \\\$a, float \\\$b): float;
}

class RoundingDecorator implements Calculator {
    public function __construct(private Calculator \\\$inner) {}

    public function calculate(float \\\$a, float \\\$b): float {
        \\\$result = \\\$this->inner->calculate(\\\$a, \\\$b);
        return round(\\\$result, 2);
    }
}`,
      hints: [
        'The decorator must return the same type as the interface',
        'number_format returns a string, but we need float',
        'Use round() instead to get a float',
      ],
      concepts: ['decorator', 'type-safety', 'debugging'],
    },
    {
      id: 'php-decorator-15',
      title: 'Fix Infinite Decorator Loop',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the decorator that accidentally calls itself instead of the inner component.',
      skeleton: `<?php
class ValidationDecorator implements UserRepository {
    public function __construct(private UserRepository \\\$inner) {}

    public function save(array \\\$user): void {
        if (empty(\\\$user['name'])) {
            throw new InvalidArgumentException('Name required');
        }
        // Bug: calls own save() instead of inner
        \\\$this->save(\\\$user);
    }
}`,
      solution: `<?php
class ValidationDecorator implements UserRepository {
    public function __construct(private UserRepository \\\$inner) {}

    public function save(array \\\$user): void {
        if (empty(\\\$user['name'])) {
            throw new InvalidArgumentException('Name required');
        }
        \\\$this->inner->save(\\\$user);
    }
}`,
      hints: [
        '\$this->save() calls the decorator itself recursively',
        'Delegate to \$this->inner->save() instead',
        'Always qualify with ->inner-> when delegating',
      ],
      concepts: ['decorator', 'infinite-loop', 'debugging'],
    },
    {
      id: 'php-decorator-16',
      title: 'Predict Decorator Chain Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the output of a decorator chain.',
      skeleton: `<?php
interface Fmt { public function format(string \\\$s): string; }
class Base implements Fmt { public function format(string \\\$s): string { return \\\$s; } }
class Upper implements Fmt {
    public function __construct(private Fmt \\\$i) {}
    public function format(string \\\$s): string { return \\\$this->i->format(strtoupper(\\\$s)); }
}
class Wrap implements Fmt {
    public function __construct(private Fmt \\\$i) {}
    public function format(string \\\$s): string { return '[' . \\\$this->i->format(\\\$s) . ']'; }
}

\\\$f = new Wrap(new Upper(new Base()));
echo \\\$f->format('hi');`,
      solution: `[HI]`,
      hints: [
        'Wrap calls Upper with "hi"',
        'Upper converts to "HI" then passes to Base',
        'Base returns "HI", Wrap adds brackets',
      ],
      concepts: ['decorator', 'execution-order'],
    },
    {
      id: 'php-decorator-17',
      title: 'Predict Decorator Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict how decoration order affects the output.',
      skeleton: `<?php
interface T { public function transform(string \\\$s): string; }
class Plain implements T { public function transform(string \\\$s): string { return \\\$s; } }
class Prefix implements T {
    public function __construct(private T \\\$i, private string \\\$p) {}
    public function transform(string \\\$s): string { return \\\$this->i->transform(\\\$this->p . \\\$s); }
}

\\\$a = new Prefix(new Prefix(new Plain(), 'A'), 'B');
echo \\\$a->transform('C');`,
      solution: `ABC`,
      hints: [
        'Outer Prefix adds "B" first, then passes to inner',
        'Inner Prefix adds "A", making "ABC"',
        'Plain returns "ABC" as-is',
      ],
      concepts: ['decorator', 'nesting-order'],
    },
    {
      id: 'php-decorator-18',
      title: 'Predict Middleware Chain',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Predict the output of a middleware-style decorator chain.',
      skeleton: `<?php
interface H { public function handle(string \\\$r): string; }
class Core implements H { public function handle(string \\\$r): string { return "[\\\$r]"; } }
class A implements H {
    public function __construct(private H \\\$n) {}
    public function handle(string \\\$r): string { return 'A(' . \\\$this->n->handle(\\\$r) . ')'; }
}
class B implements H {
    public function __construct(private H \\\$n) {}
    public function handle(string \\\$r): string { return 'B(' . \\\$this->n->handle(\\\$r) . ')'; }
}

\\\$h = new A(new B(new Core()));
echo \\\$h->handle('x');`,
      solution: `A(B([x]))`,
      hints: [
        'A wraps its output around B output',
        'B wraps its output around Core output',
        'Core wraps x in brackets',
      ],
      concepts: ['decorator', 'middleware', 'nesting'],
    },
    {
      id: 'php-decorator-19',
      title: 'Refactor Inheritance to Decorator',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the class hierarchy using inheritance into a decorator pattern.',
      skeleton: `<?php
class BasicLogger {
    public function log(string \\\$msg): string {
        return \\\$msg;
    }
}

class TimestampedLogger extends BasicLogger {
    public function log(string \\\$msg): string {
        return '[' . date('H:i:s') . '] ' . parent::log(\\\$msg);
    }
}

class PrefixedTimestampedLogger extends TimestampedLogger {
    public function __construct(private string \\\$prefix) {
        parent::__construct();
    }

    public function log(string \\\$msg): string {
        return \\\$this->prefix . parent::log(\\\$msg);
    }
}`,
      solution: `<?php
interface Logger {
    public function log(string \\\$msg): string;
}

class BasicLogger implements Logger {
    public function log(string \\\$msg): string {
        return \\\$msg;
    }
}

class TimestampDecorator implements Logger {
    public function __construct(private Logger \\\$inner) {}

    public function log(string \\\$msg): string {
        return '[' . date('H:i:s') . '] ' . \\\$this->inner->log(\\\$msg);
    }
}

class PrefixDecorator implements Logger {
    public function __construct(
        private Logger \\\$inner,
        private string \\\$prefix
    ) {}

    public function log(string \\\$msg): string {
        return \\\$this->prefix . \\\$this->inner->log(\\\$msg);
    }
}

// Usage: new PrefixDecorator(new TimestampDecorator(new BasicLogger()), 'APP: ')`,
      hints: [
        'Replace inheritance with composition',
        'Each feature becomes an independent decorator',
        'Decorators can be mixed and matched freely',
      ],
      concepts: ['decorator', 'composition-over-inheritance', 'refactoring'],
    },
    {
      id: 'php-decorator-20',
      title: 'Refactor Conditional Logic to Decorators',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the method with multiple conditional behaviors into separate decorators.',
      skeleton: `<?php
class DataProcessor {
    public function process(string \\\$data, bool \\\$trim, bool \\\$uppercase, bool \\\$encode): string {
        if (\\\$trim) {
            \\\$data = trim(\\\$data);
        }
        if (\\\$uppercase) {
            \\\$data = strtoupper(\\\$data);
        }
        if (\\\$encode) {
            \\\$data = htmlspecialchars(\\\$data, ENT_QUOTES, 'UTF-8');
        }
        return \\\$data;
    }
}`,
      solution: `<?php
interface Processor {
    public function process(string \\\$data): string;
}

class BaseProcessor implements Processor {
    public function process(string \\\$data): string {
        return \\\$data;
    }
}

class TrimDecorator implements Processor {
    public function __construct(private Processor \\\$inner) {}
    public function process(string \\\$data): string {
        return \\\$this->inner->process(trim(\\\$data));
    }
}

class UpperCaseDecorator implements Processor {
    public function __construct(private Processor \\\$inner) {}
    public function process(string \\\$data): string {
        return \\\$this->inner->process(strtoupper(\\\$data));
    }
}

class HtmlEncodeDecorator implements Processor {
    public function __construct(private Processor \\\$inner) {}
    public function process(string \\\$data): string {
        return \\\$this->inner->process(htmlspecialchars(\\\$data, ENT_QUOTES, 'UTF-8'));
    }
}

// Compose: new TrimDecorator(new UpperCaseDecorator(new HtmlEncodeDecorator(new BaseProcessor())))`,
      hints: [
        'Each conditional branch becomes its own decorator',
        'Decorators are composed based on the features needed',
        'No boolean flags needed -- just add or remove decorators',
      ],
      concepts: ['decorator', 'refactoring', 'composition'],
    },
  ],
};
