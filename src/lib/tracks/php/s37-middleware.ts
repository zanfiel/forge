import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-middleware',
  title: '37. Middleware',
  explanation: `## Middleware in PHP

Middleware wraps request handling, allowing pre-processing and post-processing of HTTP requests and responses. PSR-15 defines the standard middleware interfaces.

### PSR-15 Interfaces
\`\`\`php
<?php
use Psr\\Http\\Message\\ServerRequestInterface;
use Psr\\Http\\Message\\ResponseInterface;
use Psr\\Http\\Server\\MiddlewareInterface;
use Psr\\Http\\Server\\RequestHandlerInterface;

interface MiddlewareInterface {
    public function process(
        ServerRequestInterface \\\$request,
        RequestHandlerInterface \\\$handler
    ): ResponseInterface;
}

interface RequestHandlerInterface {
    public function handle(ServerRequestInterface \\\$request): ResponseInterface;
}
\`\`\`

### Middleware Example
\`\`\`php
<?php
class AuthMiddleware implements MiddlewareInterface {
    public function process(
        ServerRequestInterface \\\$request,
        RequestHandlerInterface \\\$handler
    ): ResponseInterface {
        \\\$token = \\\$request->getHeaderLine('Authorization');
        if (empty(\\\$token)) {
            return new Response(401, [], 'Unauthorized');
        }
        return \\\$handler->handle(\\\$request);
    }
}
\`\`\`

### Pipeline Pattern
\`\`\`php
<?php
class Pipeline {
    private array \\\$middleware = [];

    public function pipe(MiddlewareInterface \\\$middleware): self {
        \\\$this->middleware[] = \\\$middleware;
        return \\\$this;
    }

    public function handle(ServerRequestInterface \\\$request, RequestHandlerInterface \\\$finalHandler): ResponseInterface {
        \\\$handler = \\\$finalHandler;
        foreach (array_reverse(\\\$this->middleware) as \\\$mw) {
            \\\$next = \\\$handler;
            \\\$handler = new class(\\\$mw, \\\$next) implements RequestHandlerInterface {
                public function __construct(private MiddlewareInterface \\\$mw, private RequestHandlerInterface \\\$next) {}
                public function handle(ServerRequestInterface \\\$r): ResponseInterface {
                    return \\\$this->mw->process(\\\$r, \\\$this->next);
                }
            };
        }
        return \\\$handler->handle(\\\$request);
    }
}
\`\`\``,
  exercises: [
    {
      id: 'php-middleware-1',
      title: 'Middleware Process Signature',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to complete the middleware process method signature.',
      skeleton: `<?php
class LogMiddleware implements MiddlewareInterface {
    public function ___(
        ServerRequestInterface \\\$request,
        RequestHandlerInterface \\\$handler
    ): ResponseInterface {
        error_log(\\\$request->getMethod() . ' ' . \\\$request->getUri());
        return \\\$handler->handle(\\\$request);
    }
}`,
      solution: `<?php
class LogMiddleware implements MiddlewareInterface {
    public function process(
        ServerRequestInterface \\\$request,
        RequestHandlerInterface \\\$handler
    ): ResponseInterface {
        error_log(\\\$request->getMethod() . ' ' . \\\$request->getUri());
        return \\\$handler->handle(\\\$request);
    }
}`,
      hints: [
        'PSR-15 middleware has one required method',
        'It processes the request and delegates to the handler',
        'The method is called process()',
      ],
      concepts: ['PSR-15', 'middleware'],
    },
    {
      id: 'php-middleware-2',
      title: 'Delegate to Next Handler',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to pass the request to the next handler in the middleware stack.',
      skeleton: `<?php
class CorsMiddleware implements MiddlewareInterface {
    public function process(
        ServerRequestInterface \\\$request,
        RequestHandlerInterface \\\$handler
    ): ResponseInterface {
        \\\$response = \\\$handler->___(\\\$request);
        return \\\$response->withHeader('Access-Control-Allow-Origin', '*');
    }
}`,
      solution: `<?php
class CorsMiddleware implements MiddlewareInterface {
    public function process(
        ServerRequestInterface \\\$request,
        RequestHandlerInterface \\\$handler
    ): ResponseInterface {
        \\\$response = \\\$handler->handle(\\\$request);
        return \\\$response->withHeader('Access-Control-Allow-Origin', '*');
    }
}`,
      hints: [
        'The handler processes the request and returns a response',
        'Call the handler method to delegate',
        'The method is handle()',
      ],
      concepts: ['middleware', 'delegation'],
    },
    {
      id: 'php-middleware-3',
      title: 'Early Return in Middleware',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to return an error response without calling the next handler.',
      skeleton: `<?php
class RateLimitMiddleware implements MiddlewareInterface {
    public function process(
        ServerRequestInterface \\\$request,
        RequestHandlerInterface \\\$handler
    ): ResponseInterface {
        if (\\\$this->isRateLimited(\\\$request)) {
            return new Response(___);
        }
        return \\\$handler->handle(\\\$request);
    }

    private function isRateLimited(ServerRequestInterface \\\$request): bool {
        return false; // Check rate limit logic
    }
}`,
      solution: `<?php
class RateLimitMiddleware implements MiddlewareInterface {
    public function process(
        ServerRequestInterface \\\$request,
        RequestHandlerInterface \\\$handler
    ): ResponseInterface {
        if (\\\$this->isRateLimited(\\\$request)) {
            return new Response(429);
        }
        return \\\$handler->handle(\\\$request);
    }

    private function isRateLimited(ServerRequestInterface \\\$request): bool {
        return false; // Check rate limit logic
    }
}`,
      hints: [
        'When rate limited, return immediately without calling next',
        'HTTP 429 is the status code for Too Many Requests',
        'Return a new Response with the appropriate status code',
      ],
      concepts: ['middleware', 'early-return', 'rate-limiting'],
    },
    {
      id: 'php-middleware-4',
      title: 'Add Attribute to Request',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to add a user attribute to the request before passing it to the next handler.',
      skeleton: `<?php
class AuthMiddleware implements MiddlewareInterface {
    public function process(
        ServerRequestInterface \\\$request,
        RequestHandlerInterface \\\$handler
    ): ResponseInterface {
        \\\$token = \\\$request->getHeaderLine('Authorization');
        \\\$user = \\\$this->validateToken(\\\$token);
        \\\$request = \\\$request->___(___);
        return \\\$handler->handle(\\\$request);
    }
}`,
      solution: `<?php
class AuthMiddleware implements MiddlewareInterface {
    public function process(
        ServerRequestInterface \\\$request,
        RequestHandlerInterface \\\$handler
    ): ResponseInterface {
        \\\$token = \\\$request->getHeaderLine('Authorization');
        \\\$user = \\\$this->validateToken(\\\$token);
        \\\$request = \\\$request->withAttribute('user', \\\$user);
        return \\\$handler->handle(\\\$request);
    }
}`,
      hints: [
        'PSR-7 request objects are immutable',
        'withAttribute creates a new request with added data',
        'Downstream middleware/handlers can read attributes',
      ],
      concepts: ['PSR-7', 'request-attributes', 'middleware'],
    },
    {
      id: 'php-middleware-5',
      title: 'Modify Response Header',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to add a timing header to the response.',
      skeleton: `<?php
class TimingMiddleware implements MiddlewareInterface {
    public function process(
        ServerRequestInterface \\\$request,
        RequestHandlerInterface \\\$handler
    ): ResponseInterface {
        \\\$start = microtime(true);
        \\\$response = \\\$handler->handle(\\\$request);
        \\\$duration = microtime(true) - \\\$start;
        return \\\$response->___(___);
    }
}`,
      solution: `<?php
class TimingMiddleware implements MiddlewareInterface {
    public function process(
        ServerRequestInterface \\\$request,
        RequestHandlerInterface \\\$handler
    ): ResponseInterface {
        \\\$start = microtime(true);
        \\\$response = \\\$handler->handle(\\\$request);
        \\\$duration = microtime(true) - \\\$start;
        return \\\$response->withHeader('X-Response-Time', (string) \\\$duration);
    }
}`,
      hints: [
        'PSR-7 responses are immutable, use with* methods',
        'withHeader adds or replaces a header',
        'Pass the header name and value',
      ],
      concepts: ['PSR-7', 'response-headers', 'timing'],
    },
    {
      id: 'php-middleware-6',
      title: 'Pipe Middleware to Pipeline',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to add middleware to the pipeline.',
      skeleton: `<?php
\\\$pipeline = new Pipeline();
\\\$pipeline->___(new CorsMiddleware())
          ->___(new AuthMiddleware())
          ->___(new LogMiddleware());`,
      solution: `<?php
\\\$pipeline = new Pipeline();
\\\$pipeline->pipe(new CorsMiddleware())
          ->pipe(new AuthMiddleware())
          ->pipe(new LogMiddleware());`,
      hints: [
        'The pipeline adds middleware layers with a method',
        'Each call returns \$this for chaining',
        'The method is pipe()',
      ],
      concepts: ['pipeline', 'fluent-interface'],
    },
    {
      id: 'php-middleware-7',
      title: 'Build Simple Middleware Pipeline',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a simplified Pipeline class using closures. pipe() adds a middleware closure, run() executes the chain. Each middleware receives (string \$request, callable \$next): string.',
      skeleton: `<?php
class Pipeline {
    // pipe(callable \\\$middleware): self
    // run(string \\\$request): string
    // Middleware signature: fn(string \\\$request, callable \\\$next): string
}`,
      solution: `<?php
class Pipeline {
    private array \\\$middleware = [];

    public function pipe(callable \\\$middleware): self {
        \\\$this->middleware[] = \\\$middleware;
        return \\\$this;
    }

    public function run(string \\\$request): string {
        \\\$handler = fn(string \\\$req) => \\\$req;
        foreach (array_reverse(\\\$this->middleware) as \\\$mw) {
            \\\$next = \\\$handler;
            \\\$handler = fn(string \\\$req) => \\\$mw(\\\$req, \\\$next);
        }
        return \\\$handler(\\\$request);
    }
}`,
      hints: [
        'Build the chain from the inside out using array_reverse',
        'Each middleware wraps the next handler',
        'The final handler simply returns the request',
      ],
      concepts: ['pipeline', 'closures', 'middleware'],
    },
    {
      id: 'php-middleware-8',
      title: 'Exception Handling Middleware',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write an ErrorHandlerMiddleware that catches exceptions from the handler chain and returns a 500 error response with the error message.',
      skeleton: `<?php
class ErrorHandlerMiddleware implements MiddlewareInterface {
    // Wrap handler->handle in try-catch
    // Return 500 Response on exception
}`,
      solution: `<?php
class ErrorHandlerMiddleware implements MiddlewareInterface {
    public function process(
        ServerRequestInterface \\\$request,
        RequestHandlerInterface \\\$handler
    ): ResponseInterface {
        try {
            return \\\$handler->handle(\\\$request);
        } catch (\\Throwable \\\$e) {
            \\\$body = json_encode([
                'error' => \\\$e->getMessage(),
            ]);
            return new Response(500, ['Content-Type' => 'application/json'], \\\$body);
        }
    }
}`,
      hints: [
        'Wrap the handler call in a try-catch',
        'Catch \\Throwable to handle all errors',
        'Return a 500 response with error details',
      ],
      concepts: ['middleware', 'error-handling', 'exception'],
    },
    {
      id: 'php-middleware-9',
      title: 'Content Negotiation Middleware',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a ContentTypeMiddleware that checks the Accept header and adds a "format" attribute to the request (json or html) based on what the client accepts.',
      skeleton: `<?php
class ContentTypeMiddleware implements MiddlewareInterface {
    // Check Accept header
    // Add 'format' attribute to request
    // Default to 'html' if no preference
}`,
      solution: `<?php
class ContentTypeMiddleware implements MiddlewareInterface {
    public function process(
        ServerRequestInterface \\\$request,
        RequestHandlerInterface \\\$handler
    ): ResponseInterface {
        \\\$accept = \\\$request->getHeaderLine('Accept');
        \\\$format = 'html';
        if (str_contains(\\\$accept, 'application/json')) {
            \\\$format = 'json';
        }
        \\\$request = \\\$request->withAttribute('format', \\\$format);
        return \\\$handler->handle(\\\$request);
    }
}`,
      hints: [
        'Read the Accept header from the request',
        'Check if it contains application/json',
        'Set a "format" attribute on the request',
      ],
      concepts: ['middleware', 'content-negotiation', 'PSR-7'],
    },
    {
      id: 'php-middleware-10',
      title: 'Conditional Middleware',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a ConditionalMiddleware that only applies an inner middleware when a condition callback returns true.',
      skeleton: `<?php
class ConditionalMiddleware implements MiddlewareInterface {
    // Takes a condition callable and an inner middleware
    // Only applies inner middleware when condition is true
    // Otherwise passes through to handler directly
}`,
      solution: `<?php
class ConditionalMiddleware implements MiddlewareInterface {
    public function __construct(
        private \\Closure \\\$condition,
        private MiddlewareInterface \\\$inner
    ) {}

    public function process(
        ServerRequestInterface \\\$request,
        RequestHandlerInterface \\\$handler
    ): ResponseInterface {
        if ((\\\$this->condition)(\\\$request)) {
            return \\\$this->inner->process(\\\$request, \\\$handler);
        }
        return \\\$handler->handle(\\\$request);
    }
}`,
      hints: [
        'The condition closure receives the request and returns bool',
        'When true, delegate to the inner middleware',
        'When false, skip directly to the handler',
      ],
      concepts: ['middleware', 'conditional-execution'],
    },
    {
      id: 'php-middleware-11',
      title: 'Middleware Stack Class',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a MiddlewareStack class that implements RequestHandlerInterface and wraps a final handler with multiple middleware layers, executing them in order.',
      skeleton: `<?php
class MiddlewareStack implements RequestHandlerInterface {
    // Constructor takes final handler and middleware array
    // handle() executes middleware chain then final handler
}`,
      solution: `<?php
class MiddlewareStack implements RequestHandlerInterface {
    private RequestHandlerInterface \\\$chain;

    public function __construct(
        RequestHandlerInterface \\\$finalHandler,
        array \\\$middleware = []
    ) {
        \\\$this->chain = \\\$finalHandler;
        foreach (array_reverse(\\\$middleware) as \\\$mw) {
            \\\$next = \\\$this->chain;
            \\\$this->chain = new class(\\\$mw, \\\$next) implements RequestHandlerInterface {
                public function __construct(
                    private MiddlewareInterface \\\$mw,
                    private RequestHandlerInterface \\\$next
                ) {}
                public function handle(ServerRequestInterface \\\$request): ResponseInterface {
                    return \\\$this->mw->process(\\\$request, \\\$this->next);
                }
            };
        }
    }

    public function handle(ServerRequestInterface \\\$request): ResponseInterface {
        return \\\$this->chain->handle(\\\$request);
    }
}`,
      hints: [
        'Build the chain in the constructor using anonymous classes',
        'Reverse the middleware array to maintain execution order',
        'Each anonymous class wraps a middleware and its next handler',
      ],
      concepts: ['middleware-stack', 'anonymous-classes', 'chain'],
    },
    {
      id: 'php-middleware-12',
      title: 'Caching Middleware',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a CacheMiddleware that caches GET responses by URI. On cache hit, return the cached response; on miss, delegate and cache the result.',
      skeleton: `<?php
class CacheMiddleware implements MiddlewareInterface {
    private array \\\$cache = [];

    // Only cache GET requests
    // Use URI as cache key
    // Return cached response on hit
}`,
      solution: `<?php
class CacheMiddleware implements MiddlewareInterface {
    private array \\\$cache = [];

    public function process(
        ServerRequestInterface \\\$request,
        RequestHandlerInterface \\\$handler
    ): ResponseInterface {
        if (\\\$request->getMethod() !== 'GET') {
            return \\\$handler->handle(\\\$request);
        }
        \\\$key = (string) \\\$request->getUri();
        if (isset(\\\$this->cache[\\\$key])) {
            return \\\$this->cache[\\\$key];
        }
        \\\$response = \\\$handler->handle(\\\$request);
        \\\$this->cache[\\\$key] = \\\$response;
        return \\\$response;
    }
}`,
      hints: [
        'Only cache GET requests, pass others through',
        'Use the URI as the cache key',
        'Store and return cached responses',
      ],
      concepts: ['middleware', 'caching', 'HTTP-cache'],
    },
    {
      id: 'php-middleware-13',
      title: 'Fix Middleware Not Calling Next',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the middleware that blocks all requests by never calling the next handler.',
      skeleton: `<?php
class SecurityHeadersMiddleware implements MiddlewareInterface {
    public function process(
        ServerRequestInterface \\\$request,
        RequestHandlerInterface \\\$handler
    ): ResponseInterface {
        // Bug: creates a new empty response instead of delegating
        \\\$response = new Response(200);
        return \\\$response->withHeader('X-Frame-Options', 'DENY');
    }
}`,
      solution: `<?php
class SecurityHeadersMiddleware implements MiddlewareInterface {
    public function process(
        ServerRequestInterface \\\$request,
        RequestHandlerInterface \\\$handler
    ): ResponseInterface {
        \\\$response = \\\$handler->handle(\\\$request);
        return \\\$response->withHeader('X-Frame-Options', 'DENY');
    }
}`,
      hints: [
        'The middleware creates its own response instead of delegating',
        'Call \$handler->handle(\$request) to get the real response',
        'Then add headers to the real response',
      ],
      concepts: ['middleware', 'delegation', 'debugging'],
    },
    {
      id: 'php-middleware-14',
      title: 'Fix Middleware Order Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the pipeline that applies middleware in the wrong order.',
      skeleton: `<?php
class Pipeline {
    private array \\\$middleware = [];

    public function pipe(callable \\\$mw): self {
        \\\$this->middleware[] = \\\$mw;
        return \\\$this;
    }

    public function run(string \\\$input): string {
        \\\$handler = fn(\\\$s) => \\\$s;
        // Bug: middleware runs in reverse order
        foreach (\\\$this->middleware as \\\$mw) {
            \\\$next = \\\$handler;
            \\\$handler = fn(\\\$s) => \\\$mw(\\\$s, \\\$next);
        }
        return \\\$handler(\\\$input);
    }
}`,
      solution: `<?php
class Pipeline {
    private array \\\$middleware = [];

    public function pipe(callable \\\$mw): self {
        \\\$this->middleware[] = \\\$mw;
        return \\\$this;
    }

    public function run(string \\\$input): string {
        \\\$handler = fn(\\\$s) => \\\$s;
        foreach (array_reverse(\\\$this->middleware) as \\\$mw) {
            \\\$next = \\\$handler;
            \\\$handler = fn(\\\$s) => \\\$mw(\\\$s, \\\$next);
        }
        return \\\$handler(\\\$input);
    }
}`,
      hints: [
        'The chain is built inside-out',
        'First piped middleware should execute first',
        'Reverse the array so the first added wraps outermost',
      ],
      concepts: ['pipeline', 'execution-order', 'debugging'],
    },
    {
      id: 'php-middleware-15',
      title: 'Fix Middleware Losing Modified Request',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the middleware that modifies the request but passes the original to the next handler.',
      skeleton: `<?php
class TrimMiddleware implements MiddlewareInterface {
    public function process(
        ServerRequestInterface \\\$request,
        RequestHandlerInterface \\\$handler
    ): ResponseInterface {
        \\\$body = \\\$request->getParsedBody();
        \\\$trimmed = array_map('trim', \\\$body ?? []);
        // Bug: creates new request but passes old one
        \\\$newRequest = \\\$request->withParsedBody(\\\$trimmed);
        return \\\$handler->handle(\\\$request);
    }
}`,
      solution: `<?php
class TrimMiddleware implements MiddlewareInterface {
    public function process(
        ServerRequestInterface \\\$request,
        RequestHandlerInterface \\\$handler
    ): ResponseInterface {
        \\\$body = \\\$request->getParsedBody();
        \\\$trimmed = array_map('trim', \\\$body ?? []);
        \\\$newRequest = \\\$request->withParsedBody(\\\$trimmed);
        return \\\$handler->handle(\\\$newRequest);
    }
}`,
      hints: [
        'PSR-7 objects are immutable; with* returns a new instance',
        'The original \$request is passed instead of \$newRequest',
        'Pass \$newRequest to the handler',
      ],
      concepts: ['PSR-7', 'immutability', 'debugging'],
    },
    {
      id: 'php-middleware-16',
      title: 'Predict Middleware Execution Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the output showing middleware execution order.',
      skeleton: `<?php
\\\$pipeline = new Pipeline();
\\\$pipeline->pipe(function(\\\$req, \\\$next) {
    echo "A>";
    \\\$res = \\\$next(\\\$req);
    echo "<A";
    return \\\$res;
});
\\\$pipeline->pipe(function(\\\$req, \\\$next) {
    echo "B>";
    \\\$res = \\\$next(\\\$req);
    echo "<B";
    return \\\$res;
});
\\\$pipeline->run("x");`,
      solution: `A>B><B<A`,
      hints: [
        'Middleware A runs first (outermost)',
        'A delegates to B, then B delegates to core',
        'Unwinding: B post-processes, then A post-processes',
      ],
      concepts: ['middleware', 'execution-order', 'onion-model'],
    },
    {
      id: 'php-middleware-17',
      title: 'Predict Early Return',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict what happens when middleware returns early without calling next.',
      skeleton: `<?php
\\\$pipeline = new Pipeline();
\\\$pipeline->pipe(fn(\\\$req, \\\$next) => "BLOCKED");
\\\$pipeline->pipe(fn(\\\$req, \\\$next) => "B:" . \\\$next(\\\$req));
echo \\\$pipeline->run("request");`,
      solution: `BLOCKED`,
      hints: [
        'First middleware returns "BLOCKED" without calling \$next',
        'Second middleware is never executed',
        'Early return short-circuits the pipeline',
      ],
      concepts: ['middleware', 'early-return'],
    },
    {
      id: 'php-middleware-18',
      title: 'Predict Request Attribute',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict what attribute value the handler receives after middleware sets it.',
      skeleton: `<?php
// Middleware adds 'role' attribute
\\\$middleware = function(\\\$request, \\\$next) {
    \\\$request['role'] = 'admin';
    return \\\$next(\\\$request);
};

// Handler reads the attribute
\\\$handler = function(\\\$request) {
    return "Role: " . (\\\$request['role'] ?? 'guest');
};

\\\$pipeline = new Pipeline();
\\\$pipeline->pipe(\\\$middleware);
echo \\\$pipeline->run(['role' => 'guest'], \\\$handler);`,
      solution: `Role: admin`,
      hints: [
        'Middleware sets role to "admin"',
        'The modified request is passed to the handler',
        'The handler reads "admin" from the request',
      ],
      concepts: ['middleware', 'request-modification'],
    },
    {
      id: 'php-middleware-19',
      title: 'Refactor Inline Checks to Middleware',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the handler that does auth, logging, and CORS inline into separate middleware.',
      skeleton: `<?php
function handleRequest(array \\\$request): array {
    // Auth check
    if (empty(\\\$request['token'])) {
        return ['status' => 401, 'body' => 'Unauthorized'];
    }

    // CORS headers
    \\\$headers = ['Access-Control-Allow-Origin' => '*'];

    // Logging
    error_log(\\\$request['method'] . ' ' . \\\$request['uri']);

    // Actual handler logic
    return ['status' => 200, 'body' => 'OK', 'headers' => \\\$headers];
}`,
      solution: `<?php
class AuthMiddleware {
    public function __invoke(array \\\$request, callable \\\$next): array {
        if (empty(\\\$request['token'])) {
            return ['status' => 401, 'body' => 'Unauthorized'];
        }
        return \\\$next(\\\$request);
    }
}

class CorsMiddleware {
    public function __invoke(array \\\$request, callable \\\$next): array {
        \\\$response = \\\$next(\\\$request);
        \\\$response['headers']['Access-Control-Allow-Origin'] = '*';
        return \\\$response;
    }
}

class LogMiddleware {
    public function __invoke(array \\\$request, callable \\\$next): array {
        error_log(\\\$request['method'] . ' ' . \\\$request['uri']);
        return \\\$next(\\\$request);
    }
}

function handleRequest(array \\\$request): array {
    return ['status' => 200, 'body' => 'OK', 'headers' => []];
}`,
      hints: [
        'Extract each concern into its own middleware class',
        'Auth returns early on failure',
        'CORS modifies the response after delegation',
      ],
      concepts: ['middleware', 'separation-of-concerns', 'refactoring'],
    },
    {
      id: 'php-middleware-20',
      title: 'Refactor Nested Callbacks to Pipeline',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor deeply nested middleware callbacks into a clean Pipeline.',
      skeleton: `<?php
// Deeply nested callback hell
function processRequest(string \\\$request): string {
    return addCors(
        authenticate(
            logRequest(
                rateLimit(
                    function(\\\$req) { return "Response: \\\$req"; },
                    \\\$request
                ),
                \\\$request
            ),
            \\\$request
        ),
        \\\$request
    );
}`,
      solution: `<?php
\\\$pipeline = new Pipeline();
\\\$pipeline
    ->pipe(fn(\\\$req, \\\$next) => addCorsHeader(\\\$next(\\\$req)))
    ->pipe(fn(\\\$req, \\\$next) => isAuthenticated(\\\$req) ? \\\$next(\\\$req) : 'Unauthorized')
    ->pipe(function(\\\$req, \\\$next) {
        error_log("Request: \\\$req");
        return \\\$next(\\\$req);
    })
    ->pipe(function(\\\$req, \\\$next) {
        if (isRateLimited(\\\$req)) {
            return '429 Too Many Requests';
        }
        return \\\$next(\\\$req);
    });

\\\$response = \\\$pipeline->run(\\\$request);`,
      hints: [
        'Replace nested function calls with a flat pipeline',
        'Each middleware is a separate pipe() call',
        'The pipeline handles the nesting automatically',
      ],
      concepts: ['pipeline', 'refactoring', 'readability'],
    },
  ],
};
