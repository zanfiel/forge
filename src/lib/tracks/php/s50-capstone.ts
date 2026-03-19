import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-capstone',
  title: '50. Capstone Project',
  explanation: `## Capstone: Mini Framework

This capstone section combines everything you have learned into a mini PHP framework with routing, middleware, a DI container, template rendering, a database layer, and testing patterns.

### Router
\`\`\`php
<?php
class Router {
    private array \$routes = [];

    public function add(string \$method, string \$path, callable \$handler): void {
        \$this->routes[] = compact('method', 'path', 'handler');
    }

    public function dispatch(string \$method, string \$uri): mixed {
        foreach (\$this->routes as \$route) {
            if (\$route['method'] === \$method && \$route['path'] === \$uri) {
                return (\$route['handler'])();
            }
        }
        throw new RuntimeException('404 Not Found');
    }
}
\`\`\`

### Middleware Pipeline
\`\`\`php
<?php
class Pipeline {
    private array \$middlewares = [];

    public function pipe(callable \$middleware): self {
        \$this->middlewares[] = \$middleware;
        return \$this;
    }

    public function process(mixed \$request, callable \$handler): mixed {
        \$next = \$handler;
        foreach (array_reverse(\$this->middlewares) as \$mw) {
            \$next = fn(\$req) => \$mw(\$req, \$next);
        }
        return \$next(\$request);
    }
}
\`\`\`

### DI Container
\`\`\`php
<?php
class Container {
    private array \$bindings = [];
    private array \$instances = [];

    public function bind(string \$id, callable \$factory): void {
        \$this->bindings[\$id] = \$factory;
    }

    public function get(string \$id): mixed {
        if (!isset(\$this->instances[\$id])) {
            \$this->instances[\$id] = (\$this->bindings[\$id])(\$this);
        }
        return \$this->instances[\$id];
    }
}
\`\`\``,
  exercises: [
    {
      id: 'php-capstone-1',
      title: 'Create a Route',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blanks to add a GET route to the router.',
      skeleton: `<?php
class Router {
    private array \$routes = [];
    public function add(string \$method, string \$path, callable \$handler): void {
        \$this->routes[] = compact('method', 'path', 'handler');
    }
    public function dispatch(string \$method, string \$uri): mixed {
        foreach (\$this->routes as \$r) {
            if (\$r['method'] === \$method && \$r['path'] === \$uri) return (\$r['handler'])();
        }
        throw new RuntimeException('404');
    }
}

\$router = new Router();
\$router->___(___);
echo \$router->dispatch('GET', '/');`,
      solution: `<?php
class Router {
    private array \$routes = [];
    public function add(string \$method, string \$path, callable \$handler): void {
        \$this->routes[] = compact('method', 'path', 'handler');
    }
    public function dispatch(string \$method, string \$uri): mixed {
        foreach (\$this->routes as \$r) {
            if (\$r['method'] === \$method && \$r['path'] === \$uri) return (\$r['handler'])();
        }
        throw new RuntimeException('404');
    }
}

\$router = new Router();
\$router->add('GET', '/', fn() => 'Home');
echo \$router->dispatch('GET', '/');`,
      hints: [
        'Use add() with method, path, and handler.',
        'The handler is a callable that returns a response.',
        'dispatch() finds and calls the matching route.',
      ],
      concepts: ['routing', 'add-route', 'dispatch'],
    },
    {
      id: 'php-capstone-2',
      title: 'Bind to DI Container',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to bind a service to the DI container.',
      skeleton: `<?php
class Container {
    private array \$b = [];
    private array \$i = [];
    public function bind(string \$id, callable \$factory): void { \$this->b[\$id] = \$factory; }
    public function get(string \$id): mixed {
        if (!isset(\$this->i[\$id])) \$this->i[\$id] = (\$this->b[\$id])(\$this);
        return \$this->i[\$id];
    }
}

\$c = new Container();
\$c->___(___);
echo \$c->get('greeting');`,
      solution: `<?php
class Container {
    private array \$b = [];
    private array \$i = [];
    public function bind(string \$id, callable \$factory): void { \$this->b[\$id] = \$factory; }
    public function get(string \$id): mixed {
        if (!isset(\$this->i[\$id])) \$this->i[\$id] = (\$this->b[\$id])(\$this);
        return \$this->i[\$id];
    }
}

\$c = new Container();
\$c->bind('greeting', fn() => 'Hello, World!');
echo \$c->get('greeting');`,
      hints: [
        'bind() takes a string ID and a factory callable.',
        'The factory creates the service when first requested.',
        'get() returns the singleton instance.',
      ],
      concepts: ['DI-container', 'bind', 'factory'],
    },
    {
      id: 'php-capstone-3',
      title: 'Add Middleware to Pipeline',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to add a logging middleware to the pipeline.',
      skeleton: `<?php
class Pipeline {
    private array \$mw = [];
    public function pipe(callable \$m): self { \$this->mw[] = \$m; return \$this; }
    public function process(mixed \$req, callable \$handler): mixed {
        \$next = \$handler;
        foreach (array_reverse(\$this->mw) as \$m) {
            \$next = fn(\$r) => \$m(\$r, \$next);
        }
        return \$next(\$req);
    }
}

\$p = new Pipeline();
\$p->___(function (\$req, \$next) {
    return '[LOG] ' . \$next(\$req);
});
echo \$p->process('test', fn(\$r) => "handled: \$r");`,
      solution: `<?php
class Pipeline {
    private array \$mw = [];
    public function pipe(callable \$m): self { \$this->mw[] = \$m; return \$this; }
    public function process(mixed \$req, callable \$handler): mixed {
        \$next = \$handler;
        foreach (array_reverse(\$this->mw) as \$m) {
            \$next = fn(\$r) => \$m(\$r, \$next);
        }
        return \$next(\$req);
    }
}

\$p = new Pipeline();
\$p->pipe(function (\$req, \$next) {
    return '[LOG] ' . \$next(\$req);
});
echo \$p->process('test', fn(\$r) => "handled: \$r");`,
      hints: [
        'pipe() adds middleware to the pipeline.',
        'Each middleware calls $next($req) to continue.',
        'Middleware can modify request or response.',
      ],
      concepts: ['middleware', 'pipe', 'pipeline-pattern'],
    },
    {
      id: 'php-capstone-4',
      title: 'Template Variable Substitution',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to render a template with variable substitution.',
      skeleton: `<?php
function render(string \$template, array \$vars): string {
    \$output = \$template;
    foreach (\$vars as \$key => \$value) {
        \$output = str_replace("{{ \$key }}", ___, \$output);
    }
    return \$output;
}
echo render('Hello, {{ name }}!', ['name' => 'Alice']);`,
      solution: `<?php
function render(string \$template, array \$vars): string {
    \$output = \$template;
    foreach (\$vars as \$key => \$value) {
        \$output = str_replace("{{ \$key }}", \$value, \$output);
    }
    return \$output;
}
echo render('Hello, {{ name }}!', ['name' => 'Alice']);`,
      hints: [
        'Replace the placeholder with the actual value.',
        'str_replace takes search, replace, and subject.',
        'The value from $vars replaces the {{ key }} pattern.',
      ],
      concepts: ['template-rendering', 'str_replace', 'substitution'],
    },
    {
      id: 'php-capstone-5',
      title: 'Database Query Method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to add a query method to the database wrapper.',
      skeleton: `<?php
class Database {
    private PDO \$pdo;
    public function __construct(string \$dsn) {
        \$this->pdo = new PDO(\$dsn);
        \$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    public function query(string \$sql, array \$params = []): array {
        \$stmt = \$this->pdo->___(\$sql);
        \$stmt->___(\$params);
        return \$stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}`,
      solution: `<?php
class Database {
    private PDO \$pdo;
    public function __construct(string \$dsn) {
        \$this->pdo = new PDO(\$dsn);
        \$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    public function query(string \$sql, array \$params = []): array {
        \$stmt = \$this->pdo->prepare(\$sql);
        \$stmt->execute(\$params);
        return \$stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}`,
      hints: [
        'prepare() creates a prepared statement.',
        'execute() runs it with bound parameters.',
        'fetchAll returns all matching rows.',
      ],
      concepts: ['PDO-wrapper', 'prepare', 'execute'],
    },
    {
      id: 'php-capstone-6',
      title: 'Route Parameter Extraction',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to extract a route parameter using regex.',
      skeleton: `<?php
function matchRoute(string \$pattern, string \$uri): ?array {
    \$regex = preg_replace('/\\{(\\w+)\\}/', '(?P<\\1>[^/]+)', \$pattern);
    if (preg_match('#^' . \$regex . '\$#', \$uri, ___)) {
        return \$matches;
    }
    return null;
}
\$params = matchRoute('/users/{id}', '/users/42');
echo \$params['id'];`,
      solution: `<?php
function matchRoute(string \$pattern, string \$uri): ?array {
    \$regex = preg_replace('/\\{(\\w+)\\}/', '(?P<\\1>[^/]+)', \$pattern);
    if (preg_match('#^' . \$regex . '\$#', \$uri, \$matches)) {
        return \$matches;
    }
    return null;
}
\$params = matchRoute('/users/{id}', '/users/42');
echo \$params['id'];`,
      hints: [
        'preg_match stores captures in the third argument.',
        'Named groups from the regex become array keys.',
        '$matches["id"] contains the extracted value.',
      ],
      concepts: ['route-params', 'named-groups', 'regex-routing'],
    },
    {
      id: 'php-capstone-7',
      title: 'Write a Complete Router',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a Router class with get(string $path, callable $handler): void, post(string $path, callable $handler): void, and dispatch(string $method, string $uri): mixed. Support exact path matching.',
      skeleton: `<?php
// Write the Router class`,
      solution: `<?php
class Router {
    private array \$routes = [];

    public function get(string \$path, callable \$handler): void {
        \$this->routes[] = ['method' => 'GET', 'path' => \$path, 'handler' => \$handler];
    }

    public function post(string \$path, callable \$handler): void {
        \$this->routes[] = ['method' => 'POST', 'path' => \$path, 'handler' => \$handler];
    }

    public function dispatch(string \$method, string \$uri): mixed {
        foreach (\$this->routes as \$route) {
            if (\$route['method'] === \$method && \$route['path'] === \$uri) {
                return (\$route['handler'])();
            }
        }
        throw new RuntimeException("404 Not Found: \$method \$uri");
    }
}`,
      hints: [
        'get() and post() are convenience methods for add().',
        'Store routes with method, path, and handler.',
        'dispatch() loops through and matches.',
      ],
      concepts: ['router', 'HTTP-methods', 'dispatch'],
    },
    {
      id: 'php-capstone-8',
      title: 'Write a Middleware Pipeline',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a Pipeline class with pipe(callable $mw): self and process(mixed $request, callable $finalHandler): mixed that wraps middleware around the handler.',
      skeleton: `<?php
// Write the Pipeline class`,
      solution: `<?php
class Pipeline {
    private array \$middlewares = [];

    public function pipe(callable \$mw): self {
        \$this->middlewares[] = \$mw;
        return \$this;
    }

    public function process(mixed \$request, callable \$handler): mixed {
        \$next = \$handler;
        foreach (array_reverse(\$this->middlewares) as \$mw) {
            \$prev = \$next;
            \$next = fn(\$req) => \$mw(\$req, \$prev);
        }
        return \$next(\$request);
    }
}`,
      hints: [
        'Reverse the middleware array to wrap inner-to-outer.',
        'Each middleware receives ($request, $next).',
        'The final handler is the innermost function.',
      ],
      concepts: ['middleware-pipeline', 'onion-model', 'composition'],
    },
    {
      id: 'php-capstone-9',
      title: 'Write a DI Container',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a Container class with bind(string $id, callable $factory): void, get(string $id): mixed (singleton), and has(string $id): bool.',
      skeleton: `<?php
// Write the Container class`,
      solution: `<?php
class Container {
    private array \$bindings = [];
    private array \$instances = [];

    public function bind(string \$id, callable \$factory): void {
        \$this->bindings[\$id] = \$factory;
    }

    public function get(string \$id): mixed {
        if (!isset(\$this->instances[\$id])) {
            if (!isset(\$this->bindings[\$id])) {
                throw new RuntimeException("No binding for: \$id");
            }
            \$this->instances[\$id] = (\$this->bindings[\$id])(\$this);
        }
        return \$this->instances[\$id];
    }

    public function has(string \$id): bool {
        return isset(\$this->bindings[\$id]);
    }
}`,
      hints: [
        'Cache instances for singleton behavior.',
        'Factory receives the container for dependency resolution.',
        'Throw if binding not found.',
      ],
      concepts: ['DI-container', 'singleton', 'service-locator'],
    },
    {
      id: 'php-capstone-10',
      title: 'Write a Template Engine',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a class Template with constructor(string $template), render(array $data): string that replaces {{ key }} and supports {{ key|upper }} for strtoupper filter.',
      skeleton: `<?php
// Write the Template class`,
      solution: `<?php
class Template {
    public function __construct(private string \$template) {}

    public function render(array \$data): string {
        \$output = \$this->template;
        foreach (\$data as \$key => \$value) {
            \$output = str_replace("{{ \$key }}", \$value, \$output);
            \$output = str_replace("{{ \$key|upper }}", strtoupper(\$value), \$output);
        }
        return \$output;
    }
}`,
      hints: [
        'Replace {{ key }} with the plain value.',
        'Replace {{ key|upper }} with strtoupper of the value.',
        'Process both patterns for each variable.',
      ],
      concepts: ['template-engine', 'filters', 'str_replace'],
    },
    {
      id: 'php-capstone-11',
      title: 'Write a Database Layer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a class DB with constructor(PDO $pdo), all(string $sql, array $params = []): array, and one(string $sql, array $params = []): ?array methods.',
      skeleton: `<?php
// Write the DB class`,
      solution: `<?php
class DB {
    public function __construct(private PDO \$pdo) {
        \$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        \$this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    }

    public function all(string \$sql, array \$params = []): array {
        \$stmt = \$this->pdo->prepare(\$sql);
        \$stmt->execute(\$params);
        return \$stmt->fetchAll();
    }

    public function one(string \$sql, array \$params = []): ?array {
        \$stmt = \$this->pdo->prepare(\$sql);
        \$stmt->execute(\$params);
        \$row = \$stmt->fetch();
        return \$row ?: null;
    }
}`,
      hints: [
        'Set FETCH_ASSOC as default in the constructor.',
        'all() returns fetchAll(), one() returns fetch().',
        'Convert false to null for one().',
      ],
      concepts: ['database-layer', 'PDO-wrapper', 'fetch-modes'],
    },
    {
      id: 'php-capstone-12',
      title: 'Write a Test Runner',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function runTests(array $tests): array where each test is [name => callable]. Call each, catch exceptions as failures, return [name => "pass"|"fail: message"].',
      skeleton: `<?php
// Write the runTests function`,
      solution: `<?php
function runTests(array \$tests): array {
    \$results = [];
    foreach (\$tests as \$name => \$test) {
        try {
            \$test();
            \$results[\$name] = 'pass';
        } catch (Throwable \$e) {
            \$results[\$name] = 'fail: ' . \$e->getMessage();
        }
    }
    return \$results;
}`,
      hints: [
        'Loop through tests and call each callable.',
        'Catch Throwable for any error.',
        'Record pass or fail with message.',
      ],
      concepts: ['test-runner', 'Throwable', 'results-collection'],
    },
    {
      id: 'php-capstone-13',
      title: 'Fix Router 404 Handling',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the router that returns null instead of throwing a proper 404 error.',
      skeleton: `<?php
class Router {
    private array \$routes = [];
    public function add(string \$m, string \$p, callable \$h): void {
        \$this->routes[] = ['m' => \$m, 'p' => \$p, 'h' => \$h];
    }
    public function dispatch(string \$method, string \$uri): mixed {
        foreach (\$this->routes as \$r) {
            if (\$r['m'] === \$method && \$r['p'] === \$uri) return (\$r['h'])();
        }
        return null;
    }
}`,
      solution: `<?php
class Router {
    private array \$routes = [];
    public function add(string \$m, string \$p, callable \$h): void {
        \$this->routes[] = ['m' => \$m, 'p' => \$p, 'h' => \$h];
    }
    public function dispatch(string \$method, string \$uri): mixed {
        foreach (\$this->routes as \$r) {
            if (\$r['m'] === \$method && \$r['p'] === \$uri) return (\$r['h'])();
        }
        throw new RuntimeException("404 Not Found: \$method \$uri");
    }
}`,
      hints: [
        'Returning null silently hides routing errors.',
        'Throw RuntimeException for unmatched routes.',
        'Include method and URI in the error message.',
      ],
      concepts: ['404-handling', 'RuntimeException', 'explicit-error'],
    },
    {
      id: 'php-capstone-14',
      title: 'Fix Container Circular Dependency',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the container that would stack overflow on circular dependencies by adding detection.',
      skeleton: `<?php
class Container {
    private array \$bindings = [];
    private array \$instances = [];
    public function bind(string \$id, callable \$fn): void { \$this->bindings[\$id] = \$fn; }
    public function get(string \$id): mixed {
        if (!isset(\$this->instances[\$id])) {
            \$this->instances[\$id] = (\$this->bindings[\$id])(\$this);
        }
        return \$this->instances[\$id];
    }
}`,
      solution: `<?php
class Container {
    private array \$bindings = [];
    private array \$instances = [];
    private array \$resolving = [];
    public function bind(string \$id, callable \$fn): void { \$this->bindings[\$id] = \$fn; }
    public function get(string \$id): mixed {
        if (isset(\$this->resolving[\$id])) {
            throw new RuntimeException("Circular dependency: \$id");
        }
        if (!isset(\$this->instances[\$id])) {
            \$this->resolving[\$id] = true;
            \$this->instances[\$id] = (\$this->bindings[\$id])(\$this);
            unset(\$this->resolving[\$id]);
        }
        return \$this->instances[\$id];
    }
}`,
      hints: [
        'Track which services are currently being resolved.',
        'If we encounter one already resolving, it is circular.',
        'Clear the resolving flag after successful creation.',
      ],
      concepts: ['circular-dependency', 'detection', 'guard'],
    },
    {
      id: 'php-capstone-15',
      title: 'Fix Middleware Order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the middleware pipeline that processes in reverse order.',
      skeleton: `<?php
class Pipeline {
    private array \$mw = [];
    public function pipe(callable \$m): self { \$this->mw[] = \$m; return \$this; }
    public function process(mixed \$req, callable \$handler): mixed {
        \$next = \$handler;
        foreach (\$this->mw as \$m) {
            \$prev = \$next;
            \$next = fn(\$r) => \$m(\$r, \$prev);
        }
        return \$next(\$req);
    }
}
// Middleware added: auth then log
// Expected: auth runs first, then log, then handler
// Actual: log runs first, then auth, then handler`,
      solution: `<?php
class Pipeline {
    private array \$mw = [];
    public function pipe(callable \$m): self { \$this->mw[] = \$m; return \$this; }
    public function process(mixed \$req, callable \$handler): mixed {
        \$next = \$handler;
        foreach (array_reverse(\$this->mw) as \$m) {
            \$prev = \$next;
            \$next = fn(\$r) => \$m(\$r, \$prev);
        }
        return \$next(\$req);
    }
}`,
      hints: [
        'Wrapping middleware naturally reverses the order.',
        'Use array_reverse to compensate.',
        'First-added middleware should execute first.',
      ],
      concepts: ['middleware-order', 'array_reverse', 'onion-model'],
    },
    {
      id: 'php-capstone-16',
      title: 'Predict Pipeline Execution',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the output of a middleware pipeline.',
      skeleton: `<?php
function pipeline(\$req, \$mws, \$handler) {
    \$next = \$handler;
    foreach (array_reverse(\$mws) as \$m) {
        \$p = \$next;
        \$next = fn(\$r) => \$m(\$r, \$p);
    }
    return \$next(\$req);
}

echo pipeline('X', [
    fn(\$r, \$n) => '[' . \$n(\$r) . ']',
    fn(\$r, \$n) => '(' . \$n(\$r) . ')',
], fn(\$r) => \$r);`,
      solution: `[(X)]`,
      hints: [
        'First middleware wraps in [], second in ().',
        'Inner handler returns "X".',
        'Second middleware: (X), first middleware: [(X)].',
      ],
      concepts: ['pipeline-output', 'nesting', 'middleware-wrap'],
    },
    {
      id: 'php-capstone-17',
      title: 'Predict Container Singleton',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict how many times the factory is called.',
      skeleton: `<?php
\$count = 0;
class C {
    private array \$b = [];
    private array \$i = [];
    public function bind(string \$id, callable \$fn): void { \$this->b[\$id] = \$fn; }
    public function get(string \$id): mixed {
        if (!isset(\$this->i[\$id])) \$this->i[\$id] = (\$this->b[\$id])();
        return \$this->i[\$id];
    }
}
\$c = new C();
\$c->bind('x', function () use (&\$count) { \$count++; return 'val'; });
\$c->get('x');
\$c->get('x');
\$c->get('x');
echo \$count;`,
      solution: `1`,
      hints: [
        'The container caches the first result.',
        'Subsequent get() calls return the cached instance.',
        'The factory is only called once.',
      ],
      concepts: ['singleton', 'caching', 'factory-call-count'],
    },
    {
      id: 'php-capstone-18',
      title: 'Predict Template Render',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the template rendering output.',
      skeleton: `<?php
function render(string \$t, array \$d): string {
    foreach (\$d as \$k => \$v) \$t = str_replace("{{ \$k }}", \$v, \$t);
    return \$t;
}
echo render('{{ greeting }}, {{ name }}!', [
    'greeting' => 'Hello',
    'name' => 'World',
]);`,
      solution: `Hello, World!`,
      hints: [
        '{{ greeting }} is replaced with "Hello".',
        '{{ name }} is replaced with "World".',
        'The result is "Hello, World!".',
      ],
      concepts: ['template-render', 'substitution', 'output'],
    },
    {
      id: 'php-capstone-19',
      title: 'Refactor Global Functions to Framework',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the procedural route handling into the Router class pattern.',
      skeleton: `<?php
\$method = 'GET';
\$uri = '/about';

if (\$method === 'GET' && \$uri === '/') {
    echo 'Home';
} elseif (\$method === 'GET' && \$uri === '/about') {
    echo 'About';
} elseif (\$method === 'POST' && \$uri === '/submit') {
    echo 'Submitted';
} else {
    echo '404';
}`,
      solution: `<?php
class Router {
    private array \$routes = [];
    public function add(string \$m, string \$p, callable \$h): void {
        \$this->routes[] = ['m' => \$m, 'p' => \$p, 'h' => \$h];
    }
    public function dispatch(string \$method, string \$uri): string {
        foreach (\$this->routes as \$r) {
            if (\$r['m'] === \$method && \$r['p'] === \$uri) return (\$r['h'])();
        }
        return '404';
    }
}

\$router = new Router();
\$router->add('GET', '/', fn() => 'Home');
\$router->add('GET', '/about', fn() => 'About');
\$router->add('POST', '/submit', fn() => 'Submitted');
echo \$router->dispatch('GET', '/about');`,
      hints: [
        'Replace the if/elseif chain with route registrations.',
        'Each route maps method + path to a handler.',
        'dispatch() handles the matching logic.',
      ],
      concepts: ['procedural-to-OOP', 'router-pattern', 'refactor'],
    },
    {
      id: 'php-capstone-20',
      title: 'Refactor to Full Mini Framework',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the standalone components into a unified App class with a container, router, middleware pipeline, and a run() method.',
      skeleton: `<?php
// Standalone pieces
\$router = new Router();
\$router->add('GET', '/', fn() => 'Home');

\$pipeline = new Pipeline();
\$pipeline->pipe(fn(\$req, \$next) => strtoupper(\$next(\$req)));

// Manual wiring
\$method = 'GET';
\$uri = '/';
\$response = \$pipeline->process(\$uri, fn(\$u) => \$router->dispatch(\$method, \$u));
echo \$response;`,
      solution: `<?php
class App {
    private Router \$router;
    private Pipeline \$pipeline;
    private Container \$container;

    public function __construct() {
        \$this->router = new Router();
        \$this->pipeline = new Pipeline();
        \$this->container = new Container();
        \$this->container->bind('router', fn() => \$this->router);
    }

    public function get(string \$path, callable \$handler): void {
        \$this->router->add('GET', \$path, \$handler);
    }

    public function middleware(callable \$mw): void {
        \$this->pipeline->pipe(\$mw);
    }

    public function run(string \$method, string \$uri): string {
        return \$this->pipeline->process(\$uri, fn(\$u) => \$this->router->dispatch(\$method, \$u));
    }
}

\$app = new App();
\$app->get('/', fn() => 'Home');
\$app->middleware(fn(\$req, \$next) => strtoupper(\$next(\$req)));
echo \$app->run('GET', '/');`,
      hints: [
        'App class composes Router, Pipeline, and Container.',
        'Provide convenience methods like get() and middleware().',
        'run() wires the pipeline and router together.',
      ],
      concepts: ['mini-framework', 'composition', 'unified-API'],
    },
  ],
};
