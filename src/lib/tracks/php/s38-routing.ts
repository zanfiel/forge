import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-routing',
  title: '38. Routing',
  explanation: `## Routing in PHP

Routing maps HTTP requests to handler functions based on the URL path and method. Modern PHP frameworks use route definitions with patterns, parameters, and groups.

### Basic URL Parsing
\`\`\`php
<?php
\\\$uri = parse_url(\\\$_SERVER['REQUEST_URI'], PHP_URL_PATH);
\\\$method = \\\$_SERVER['REQUEST_METHOD'];
\`\`\`

### Simple Router
\`\`\`php
<?php
class Router {
    private array \\\$routes = [];

    public function get(string \\\$path, callable \\\$handler): void {
        \\\$this->routes['GET'][\\\$path] = \\\$handler;
    }

    public function post(string \\\$path, callable \\\$handler): void {
        \\\$this->routes['POST'][\\\$path] = \\\$handler;
    }

    public function dispatch(string \\\$method, string \\\$uri): mixed {
        foreach (\\\$this->routes[\\\$method] ?? [] as \\\$pattern => \\\$handler) {
            if (preg_match(\\\$this->toRegex(\\\$pattern), \\\$uri, \\\$matches)) {
                return \\\$handler(...array_filter(\\\$matches, 'is_string', ARRAY_FILTER_USE_KEY));
            }
        }
        return null; // 404
    }

    private function toRegex(string \\\$pattern): string {
        return '#^' . preg_replace('/\\{(\\w+)\\}/', '(?P<\\\$1>[^/]+)', \\\$pattern) . '\\\$#';
    }
}

\\\$router = new Router();
\\\$router->get('/users/{id}', fn(\\\$id) => "User \\\$id");
\`\`\`

### Named Routes
\`\`\`php
<?php
\\\$router->get('/users/{id}', handler: \\\$fn, name: 'user.show');
\\\$url = \\\$router->generate('user.show', ['id' => 42]); // /users/42
\`\`\`

### Route Groups
\`\`\`php
<?php
\\\$router->group('/api/v1', function(Router \\\$r) {
    \\\$r->get('/users', \\\$listUsers);
    \\\$r->get('/users/{id}', \\\$showUser);
    \\\$r->post('/users', \\\$createUser);
});
\`\`\``,
  exercises: [
    {
      id: 'php-routing-1',
      title: 'Parse Request URI',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to extract just the path from the request URI.',
      skeleton: `<?php
// REQUEST_URI might be "/users?page=2"
\\\$path = ___(___);`,
      solution: `<?php
// REQUEST_URI might be "/users?page=2"
\\\$path = parse_url(\\\$_SERVER['REQUEST_URI'], PHP_URL_PATH);`,
      hints: [
        'parse_url breaks a URL into its components',
        'Use PHP_URL_PATH to get just the path portion',
        'This strips the query string',
      ],
      concepts: ['URL-parsing', 'parse_url'],
    },
    {
      id: 'php-routing-2',
      title: 'Register a GET Route',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to register a GET route handler.',
      skeleton: `<?php
\\\$router = new Router();
\\\$router->___(___,  function() {
    return ['users' => []];
});`,
      solution: `<?php
\\\$router = new Router();
\\\$router->get('/users', function() {
    return ['users' => []];
});`,
      hints: [
        'Use the HTTP method name as the router method',
        'GET requests use the get() method',
        'Pass the path pattern and handler',
      ],
      concepts: ['routing', 'GET-routes'],
    },
    {
      id: 'php-routing-3',
      title: 'Route with Parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to define a route with a dynamic ID parameter.',
      skeleton: `<?php
\\\$router->get('/users/___', function(string \\\$id) {
    return "User: \\\$id";
});`,
      solution: `<?php
\\\$router->get('/users/{id}', function(string \\\$id) {
    return "User: \\\$id";
});`,
      hints: [
        'Route parameters are wrapped in curly braces',
        'The parameter name matches the function argument',
        '{id} captures the dynamic segment',
      ],
      concepts: ['route-parameters', 'dynamic-segments'],
    },
    {
      id: 'php-routing-4',
      title: 'Match Route Pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to convert a route pattern to a regex.',
      skeleton: `<?php
function toRegex(string \\\$pattern): string {
    \\\$regex = preg_replace('/\\{(\\w+)\\}/', '(?P<\\\$1>[^/]+)', \\\$pattern);
    return '#^' . \\\$regex . '___#';
}
// '/users/{id}' becomes '#^/users/(?P<id>[^/]+)\\\$#'`,
      solution: `<?php
function toRegex(string \\\$pattern): string {
    \\\$regex = preg_replace('/\\{(\\w+)\\}/', '(?P<\\\$1>[^/]+)', \\\$pattern);
    return '#^' . \\\$regex . '\\\$#';
}`,
      hints: [
        'The regex should match the entire path',
        'Use \$ to anchor at the end of the string',
        'This prevents partial matches',
      ],
      concepts: ['regex-routing', 'pattern-matching'],
    },
    {
      id: 'php-routing-5',
      title: 'RESTful Route Registration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the correct HTTP method for each RESTful route.',
      skeleton: `<?php
\\\$router->___('/articles', \\\$listArticles);        // List all
\\\$router->___('/articles', \\\$createArticle);       // Create new
\\\$router->___('/articles/{id}', \\\$showArticle);    // Show one
\\\$router->___('/articles/{id}', \\\$updateArticle);  // Update
\\\$router->___('/articles/{id}', \\\$deleteArticle);  // Delete`,
      solution: `<?php
\\\$router->get('/articles', \\\$listArticles);
\\\$router->post('/articles', \\\$createArticle);
\\\$router->get('/articles/{id}', \\\$showArticle);
\\\$router->put('/articles/{id}', \\\$updateArticle);
\\\$router->delete('/articles/{id}', \\\$deleteArticle);`,
      hints: [
        'REST uses HTTP methods to indicate the action',
        'GET for read, POST for create, PUT for update, DELETE for remove',
        'Same path can have different handlers per method',
      ],
      concepts: ['RESTful-routing', 'HTTP-methods'],
    },
    {
      id: 'php-routing-6',
      title: 'Route Group Prefix',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to group routes under an API prefix.',
      skeleton: `<?php
\\\$router->___(___,  function(Router \\\$r) {
    \\\$r->get('/users', \\\$listUsers);     // /api/v1/users
    \\\$r->get('/posts', \\\$listPosts);     // /api/v1/posts
});`,
      solution: `<?php
\\\$router->group('/api/v1', function(Router \\\$r) {
    \\\$r->get('/users', \\\$listUsers);
    \\\$r->get('/posts', \\\$listPosts);
});`,
      hints: [
        'Route groups share a common prefix',
        'The group method takes a prefix and a callback',
        'Routes inside get the prefix prepended',
      ],
      concepts: ['route-groups', 'prefix'],
    },
    {
      id: 'php-routing-7',
      title: 'Build Basic Router',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a Router class with get(), post(), and dispatch() methods. dispatch takes a method and URI, returns the handler result or null for 404. Support exact path matching.',
      skeleton: `<?php
class Router {
    // get(string \\\$path, callable \\\$handler): void
    // post(string \\\$path, callable \\\$handler): void
    // dispatch(string \\\$method, string \\\$uri): mixed
}`,
      solution: `<?php
class Router {
    private array \\\$routes = [];

    public function get(string \\\$path, callable \\\$handler): void {
        \\\$this->routes['GET'][\\\$path] = \\\$handler;
    }

    public function post(string \\\$path, callable \\\$handler): void {
        \\\$this->routes['POST'][\\\$path] = \\\$handler;
    }

    public function dispatch(string \\\$method, string \\\$uri): mixed {
        \\\$handler = \\\$this->routes[\\\$method][\\\$uri] ?? null;
        if (\\\$handler) {
            return \\\$handler();
        }
        return null;
    }
}`,
      hints: [
        'Store routes in a nested array: [METHOD][PATH] => handler',
        'dispatch looks up the handler by method and URI',
        'Return null if no route matches',
      ],
      concepts: ['routing', 'dispatch'],
    },
    {
      id: 'php-routing-8',
      title: 'Router with Parameters',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a Router that supports {param} placeholders. Convert patterns to regex and pass named captures to the handler.',
      skeleton: `<?php
class ParamRouter {
    // addRoute(string \\\$method, string \\\$pattern, callable \\\$handler): void
    // dispatch(string \\\$method, string \\\$uri): mixed
    // Convert {param} to named regex captures
}`,
      solution: `<?php
class ParamRouter {
    private array \\\$routes = [];

    public function addRoute(string \\\$method, string \\\$pattern, callable \\\$handler): void {
        \\\$regex = '#^' . preg_replace('/\\{(\\w+)\\}/', '(?P<\\\$1>[^/]+)', \\\$pattern) . '\\\$#';
        \\\$this->routes[\\\$method][] = ['regex' => \\\$regex, 'handler' => \\\$handler];
    }

    public function dispatch(string \\\$method, string \\\$uri): mixed {
        foreach (\\\$this->routes[\\\$method] ?? [] as \\\$route) {
            if (preg_match(\\\$route['regex'], \\\$uri, \\\$matches)) {
                \\\$params = array_filter(\\\$matches, 'is_string', ARRAY_FILTER_USE_KEY);
                return (\\\$route['handler'])(...\\\$params);
            }
        }
        return null;
    }
}`,
      hints: [
        'Replace {param} with named regex groups (?P<param>[^/]+)',
        'Use preg_match to test URIs against patterns',
        'Filter matches to only named captures and pass to handler',
      ],
      concepts: ['regex-routing', 'named-captures', 'parameters'],
    },
    {
      id: 'php-routing-9',
      title: 'Named Route Generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a NamedRouter that supports naming routes and generating URLs. add() takes name, pattern, handler. generate() takes name and params to build a URL.',
      skeleton: `<?php
class NamedRouter {
    // add(string \\\$name, string \\\$pattern, callable \\\$handler): void
    // generate(string \\\$name, array \\\$params = []): string
}`,
      solution: `<?php
class NamedRouter {
    private array \\\$routes = [];

    public function add(string \\\$name, string \\\$pattern, callable \\\$handler): void {
        \\\$this->routes[\\\$name] = ['pattern' => \\\$pattern, 'handler' => \\\$handler];
    }

    public function generate(string \\\$name, array \\\$params = []): string {
        if (!isset(\\\$this->routes[\\\$name])) {
            throw new RuntimeException("Route '\\\$name' not found");
        }
        \\\$url = \\\$this->routes[\\\$name]['pattern'];
        foreach (\\\$params as \\\$key => \\\$value) {
            \\\$url = str_replace("{\\\$key}", (string) \\\$value, \\\$url);
        }
        return \\\$url;
    }
}`,
      hints: [
        'Store routes by name with their patterns',
        'generate replaces {param} placeholders with actual values',
        'Use str_replace to swap in parameter values',
      ],
      concepts: ['named-routes', 'URL-generation'],
    },
    {
      id: 'php-routing-10',
      title: 'Route Group Implementation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a Router with a group() method that adds a prefix to all routes defined within the callback.',
      skeleton: `<?php
class GroupRouter {
    private array \\\$routes = [];
    private string \\\$prefix = '';

    // get(string \\\$path, callable \\\$handler): void
    // post(string \\\$path, callable \\\$handler): void
    // group(string \\\$prefix, callable \\\$callback): void
}`,
      solution: `<?php
class GroupRouter {
    private array \\\$routes = [];
    private string \\\$prefix = '';

    public function get(string \\\$path, callable \\\$handler): void {
        \\\$this->routes['GET'][\\\$this->prefix . \\\$path] = \\\$handler;
    }

    public function post(string \\\$path, callable \\\$handler): void {
        \\\$this->routes['POST'][\\\$this->prefix . \\\$path] = \\\$handler;
    }

    public function group(string \\\$prefix, callable \\\$callback): void {
        \\\$previousPrefix = \\\$this->prefix;
        \\\$this->prefix .= \\\$prefix;
        \\\$callback(\\\$this);
        \\\$this->prefix = \\\$previousPrefix;
    }

    public function dispatch(string \\\$method, string \\\$uri): mixed {
        \\\$handler = \\\$this->routes[\\\$method][\\\$uri] ?? null;
        return \\\$handler ? \\\$handler() : null;
    }
}`,
      hints: [
        'group temporarily sets a prefix for nested routes',
        'Save and restore the previous prefix for nesting',
        'Routes defined inside get the prefix prepended',
      ],
      concepts: ['route-groups', 'prefix-stacking'],
    },
    {
      id: 'php-routing-11',
      title: 'Route with Optional Parameter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function that converts a route pattern with optional params (e.g., /users/{id?}) to a regex that matches both /users and /users/42.',
      skeleton: `<?php
function optionalParamRegex(string \\\$pattern): string {
    // {id?} should match with or without the parameter
    // /users/{id?} matches /users and /users/42
}`,
      solution: `<?php
function optionalParamRegex(string \\\$pattern): string {
    \\\$regex = preg_replace('/\\/\\{(\\w+)\\?\\}/', '(?:/(?P<\\\$1>[^/]+))?', \\\$pattern);
    \\\$regex = preg_replace('/\\{(\\w+)\\}/', '(?P<\\\$1>[^/]+)', \\\$regex);
    return '#^' . \\\$regex . '\\\$#';
}`,
      hints: [
        'Optional params use {param?} syntax',
        'Make the entire segment including the slash optional',
        'Use (?:...)? to make the group optional',
      ],
      concepts: ['optional-parameters', 'regex-routing'],
    },
    {
      id: 'php-routing-12',
      title: 'Route Constraint Validation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function addConstrainedRoute that accepts route parameters with type constraints (e.g., {id:\\\\d+} for numeric IDs).',
      skeleton: `<?php
function addConstrainedRoute(string \\\$pattern): string {
    // {id:\\\\d+} should create regex for numeric-only match
    // {slug:[a-z\\-]+} for slug format
    // Return regex string
}`,
      solution: `<?php
function addConstrainedRoute(string \\\$pattern): string {
    \\\$regex = preg_replace_callback('/\\{(\\w+):([^}]+)\\}/', function(\\\$m) {
        return '(?P<' . \\\$m[1] . '>' . \\\$m[2] . ')';
    }, \\\$pattern);
    \\\$regex = preg_replace('/\\{(\\w+)\\}/', '(?P<\\\$1>[^/]+)', \\\$regex);
    return '#^' . \\\$regex . '\\\$#';
}`,
      hints: [
        'Parse the constraint from {name:pattern} format',
        'Use preg_replace_callback for complex replacements',
        'The constraint becomes the regex pattern for that capture',
      ],
      concepts: ['route-constraints', 'regex-routing'],
    },
    {
      id: 'php-routing-13',
      title: 'Fix Missing Method Route',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the router that returns 404 for POST requests to /users because routes are only checked for GET.',
      skeleton: `<?php
class Router {
    private array \\\$routes = [];

    public function addRoute(string \\\$method, string \\\$path, callable \\\$handler): void {
        // Bug: ignores the method parameter
        \\\$this->routes[\\\$path] = \\\$handler;
    }

    public function dispatch(string \\\$method, string \\\$uri): mixed {
        return isset(\\\$this->routes[\\\$uri]) ? (\\\$this->routes[\\\$uri])() : null;
    }
}`,
      solution: `<?php
class Router {
    private array \\\$routes = [];

    public function addRoute(string \\\$method, string \\\$path, callable \\\$handler): void {
        \\\$this->routes[\\\$method][\\\$path] = \\\$handler;
    }

    public function dispatch(string \\\$method, string \\\$uri): mixed {
        \\\$handler = \\\$this->routes[\\\$method][\\\$uri] ?? null;
        return \\\$handler ? \\\$handler() : null;
    }
}`,
      hints: [
        'Routes must be organized by HTTP method',
        'Use nested arrays: [method][path] => handler',
        'Dispatch must check both method and path',
      ],
      concepts: ['routing', 'HTTP-methods', 'debugging'],
    },
    {
      id: 'php-routing-14',
      title: 'Fix Trailing Slash Mismatch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the router that fails to match /users/ when the route is defined as /users.',
      skeleton: `<?php
class Router {
    private array \\\$routes = [];

    public function get(string \\\$path, callable \\\$handler): void {
        \\\$this->routes['GET'][\\\$path] = \\\$handler;
    }

    public function dispatch(string \\\$method, string \\\$uri): mixed {
        // Bug: /users/ does not match /users
        \\\$handler = \\\$this->routes[\\\$method][\\\$uri] ?? null;
        return \\\$handler ? \\\$handler() : null;
    }
}`,
      solution: `<?php
class Router {
    private array \\\$routes = [];

    public function get(string \\\$path, callable \\\$handler): void {
        \\\$this->routes['GET'][rtrim(\\\$path, '/')] = \\\$handler;
    }

    public function dispatch(string \\\$method, string \\\$uri): mixed {
        \\\$uri = rtrim(\\\$uri, '/') ?: '/';
        \\\$handler = \\\$this->routes[\\\$method][\\\$uri] ?? null;
        return \\\$handler ? \\\$handler() : null;
    }
}`,
      hints: [
        'Normalize paths by removing trailing slashes',
        'Apply normalization in both addRoute and dispatch',
        'Use rtrim() to strip trailing slashes',
      ],
      concepts: ['routing', 'path-normalization', 'debugging'],
    },
    {
      id: 'php-routing-15',
      title: 'Fix Route Params Not Passed',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the router that matches parameterized routes but does not pass the captured values to the handler.',
      skeleton: `<?php
class Router {
    private array \\\$routes = [];

    public function get(string \\\$pattern, callable \\\$handler): void {
        \\\$regex = '#^' . preg_replace('/\\{(\\w+)\\}/', '(?P<\\\$1>[^/]+)', \\\$pattern) . '\\\$#';
        \\\$this->routes[] = ['regex' => \\\$regex, 'handler' => \\\$handler];
    }

    public function dispatch(string \\\$uri): mixed {
        foreach (\\\$this->routes as \\\$route) {
            if (preg_match(\\\$route['regex'], \\\$uri, \\\$matches)) {
                // Bug: calls handler without parameters
                return (\\\$route['handler'])();
            }
        }
        return null;
    }
}`,
      solution: `<?php
class Router {
    private array \\\$routes = [];

    public function get(string \\\$pattern, callable \\\$handler): void {
        \\\$regex = '#^' . preg_replace('/\\{(\\w+)\\}/', '(?P<\\\$1>[^/]+)', \\\$pattern) . '\\\$#';
        \\\$this->routes[] = ['regex' => \\\$regex, 'handler' => \\\$handler];
    }

    public function dispatch(string \\\$uri): mixed {
        foreach (\\\$this->routes as \\\$route) {
            if (preg_match(\\\$route['regex'], \\\$uri, \\\$matches)) {
                \\\$params = array_filter(\\\$matches, 'is_string', ARRAY_FILTER_USE_KEY);
                return (\\\$route['handler'])(...\\\$params);
            }
        }
        return null;
    }
}`,
      hints: [
        'preg_match captures named groups in the matches array',
        'Filter to only named (string) keys using array_filter',
        'Spread the params into the handler call',
      ],
      concepts: ['routing', 'parameters', 'debugging'],
    },
    {
      id: 'php-routing-16',
      title: 'Predict Route Match',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict which route matches the given URI.',
      skeleton: `<?php
\\\$router = new Router();
\\\$router->get('/users', fn() => 'list');
\\\$router->get('/users/{id}', fn(\\\$id) => "show \\\$id");
\\\$router->post('/users', fn() => 'create');

echo \\\$router->dispatch('GET', '/users/{id}', '/users/42');`,
      solution: `show 42`,
      hints: [
        '/users/42 matches the /users/{id} pattern',
        '{id} captures "42" as the parameter',
        'The handler returns "show 42"',
      ],
      concepts: ['routing', 'parameter-matching'],
    },
    {
      id: 'php-routing-17',
      title: 'Predict Route Group Path',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the full paths registered by a route group.',
      skeleton: `<?php
\\\$router = new GroupRouter();
\\\$router->group('/api', function(\\\$r) {
    \\\$r->group('/v1', function(\\\$r) {
        \\\$r->get('/users', fn() => 'users');
    });
});
// What path is registered?
echo "/api/v1/users";`,
      solution: `/api/v1/users`,
      hints: [
        'Groups nest their prefixes',
        '/api + /v1 + /users = /api/v1/users',
        'Each group level adds to the prefix',
      ],
      concepts: ['route-groups', 'nested-prefixes'],
    },
    {
      id: 'php-routing-18',
      title: 'Predict parse_url Result',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict what parse_url returns for a given URL.',
      skeleton: `<?php
\\\$url = '/products?category=books&page=2';
echo parse_url(\\\$url, PHP_URL_PATH) . "\\n";
echo parse_url(\\\$url, PHP_URL_QUERY);`,
      solution: `/products
category=books&page=2`,
      hints: [
        'PHP_URL_PATH returns just the path portion',
        'PHP_URL_QUERY returns the query string without the ?',
        'parse_url breaks URLs into components',
      ],
      concepts: ['parse_url', 'URL-components'],
    },
    {
      id: 'php-routing-19',
      title: 'Refactor If-Else Router',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the if-else routing into a proper Router class.',
      skeleton: `<?php
\\\$method = \\\$_SERVER['REQUEST_METHOD'];
\\\$uri = parse_url(\\\$_SERVER['REQUEST_URI'], PHP_URL_PATH);

if (\\\$method === 'GET' && \\\$uri === '/') {
    echo 'Home page';
} elseif (\\\$method === 'GET' && \\\$uri === '/about') {
    echo 'About page';
} elseif (\\\$method === 'GET' && preg_match('#^/users/(\\d+)\\\$#', \\\$uri, \\\$m)) {
    echo "User " . \\\$m[1];
} elseif (\\\$method === 'POST' && \\\$uri === '/contact') {
    echo 'Form submitted';
} else {
    http_response_code(404);
    echo 'Not Found';
}`,
      solution: `<?php
class Router {
    private array \\\$routes = [];

    public function get(string \\\$path, callable \\\$handler): void {
        \\\$this->routes['GET'][\\\$path] = \\\$handler;
    }

    public function post(string \\\$path, callable \\\$handler): void {
        \\\$this->routes['POST'][\\\$path] = \\\$handler;
    }

    public function dispatch(string \\\$method, string \\\$uri): void {
        foreach (\\\$this->routes[\\\$method] ?? [] as \\\$pattern => \\\$handler) {
            \\\$regex = '#^' . preg_replace('/\\{(\\w+)\\}/', '(?P<\\\$1>[^/]+)', \\\$pattern) . '\\\$#';
            if (preg_match(\\\$regex, \\\$uri, \\\$matches)) {
                \\\$params = array_filter(\\\$matches, 'is_string', ARRAY_FILTER_USE_KEY);
                echo \\\$handler(...\\\$params);
                return;
            }
        }
        http_response_code(404);
        echo 'Not Found';
    }
}

\\\$router = new Router();
\\\$router->get('/', fn() => 'Home page');
\\\$router->get('/about', fn() => 'About page');
\\\$router->get('/users/{id}', fn(\\\$id) => "User \\\$id");
\\\$router->post('/contact', fn() => 'Form submitted');
\\\$router->dispatch(\\\$_SERVER['REQUEST_METHOD'], parse_url(\\\$_SERVER['REQUEST_URI'], PHP_URL_PATH));`,
      hints: [
        'Extract route definitions from conditions',
        'Use a Router class with method-specific registration',
        'Support both exact and parameterized routes',
      ],
      concepts: ['routing', 'refactoring', 'clean-code'],
    },
    {
      id: 'php-routing-20',
      title: 'Refactor Repetitive Route Handlers',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor repetitive CRUD route handlers into a resource route that auto-generates all RESTful routes for a controller.',
      skeleton: `<?php
\\\$router->get('/posts', [\\\$postController, 'index']);
\\\$router->get('/posts/{id}', [\\\$postController, 'show']);
\\\$router->post('/posts', [\\\$postController, 'store']);
\\\$router->put('/posts/{id}', [\\\$postController, 'update']);
\\\$router->delete('/posts/{id}', [\\\$postController, 'destroy']);

\\\$router->get('/comments', [\\\$commentController, 'index']);
\\\$router->get('/comments/{id}', [\\\$commentController, 'show']);
\\\$router->post('/comments', [\\\$commentController, 'store']);
\\\$router->put('/comments/{id}', [\\\$commentController, 'update']);
\\\$router->delete('/comments/{id}', [\\\$commentController, 'destroy']);`,
      solution: `<?php
class ResourceRouter {
    private Router \\\$router;

    public function __construct(Router \\\$router) {
        \\\$this->router = \\\$router;
    }

    public function resource(string \\\$path, object \\\$controller): void {
        \\\$this->router->get(\\\$path, [\\\$controller, 'index']);
        \\\$this->router->get(\\\$path . '/{id}', [\\\$controller, 'show']);
        \\\$this->router->post(\\\$path, [\\\$controller, 'store']);
        \\\$this->router->put(\\\$path . '/{id}', [\\\$controller, 'update']);
        \\\$this->router->delete(\\\$path . '/{id}', [\\\$controller, 'destroy']);
    }
}

\\\$resource = new ResourceRouter(\\\$router);
\\\$resource->resource('/posts', \\\$postController);
\\\$resource->resource('/comments', \\\$commentController);`,
      hints: [
        'Create a resource() method that registers all CRUD routes',
        'Use consistent method naming convention (index, show, store, update, destroy)',
        'Pass the base path and controller, generate all routes automatically',
      ],
      concepts: ['RESTful-routing', 'resource-routes', 'refactoring'],
    },
  ],
};
