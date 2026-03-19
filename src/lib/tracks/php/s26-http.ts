import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-http',
  title: '26. HTTP',
  explanation: `## HTTP in PHP

PHP has deep integration with HTTP, making it a natural fit for web development. Superglobals like \\\$_GET, \\\$_POST, and \\\$_SERVER provide direct access to HTTP request data.

### Superglobals
\`\`\`php
<?php
// GET parameters: /page?id=42
\\\$id = \\\$_GET['id']; // 42

// POST data from form submission
\\\$name = \\\$_POST['name'];

// Server and request info
\\\$method = \\\$_SERVER['REQUEST_METHOD'];
\\\$uri = \\\$_SERVER['REQUEST_URI'];
\\\$host = \\\$_SERVER['HTTP_HOST'];
\`\`\`

### Sending Headers and Status Codes
\`\`\`php
<?php
header('Content-Type: application/json');
header('X-Custom-Header: value');
http_response_code(201); // Created

// Redirect
header('Location: /dashboard');
exit;
\`\`\`

### Reading Request Body
\`\`\`php
<?php
\\\$rawBody = file_get_contents('php://input');
\\\$json = json_decode(\\\$rawBody, true);
\`\`\`

### cURL Extension
\`\`\`php
<?php
\\\$ch = curl_init('https://api.example.com/data');
curl_setopt(\\\$ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt(\\\$ch, CURLOPT_HTTPHEADER, ['Accept: application/json']);
\\\$response = curl_exec(\\\$ch);
\\\$statusCode = curl_getinfo(\\\$ch, CURLINFO_HTTP_CODE);
curl_close(\\\$ch);
\`\`\`

### Guzzle HTTP Client
\`\`\`php
<?php
use GuzzleHttp\\Client;

\\\$client = new Client(['base_uri' => 'https://api.example.com']);
\\\$response = \\\$client->get('/users', [
    'query' => ['page' => 1],
    'headers' => ['Authorization' => 'Bearer token'],
]);
\\\$data = json_decode(\\\$response->getBody(), true);
\`\`\``,
  exercises: [
    {
      id: 'php-http-1',
      title: 'Access GET Parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to retrieve the "page" query parameter from the URL.',
      skeleton: `<?php
// URL: /articles?page=3
\\\$page = ___['page'];
echo "Showing page \\\$page";`,
      solution: `<?php
// URL: /articles?page=3
\\\$page = \\\$_GET['page'];
echo "Showing page \\\$page";`,
      hints: [
        'PHP superglobals start with \$_',
        'GET parameters come from the URL query string',
        'The superglobal for query parameters is \$_GET',
      ],
      concepts: ['superglobals', 'GET-parameters'],
    },
    {
      id: 'php-http-2',
      title: 'Read POST Data',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to read the "email" field from a form POST submission.',
      skeleton: `<?php
\\\$email = ___['email'];
echo "Received: \\\$email";`,
      solution: `<?php
\\\$email = \\\$_POST['email'];
echo "Received: \\\$email";`,
      hints: [
        'POST data is available in a superglobal',
        'The superglobal is named \$_POST',
        'Access it like an associative array',
      ],
      concepts: ['superglobals', 'POST-data'],
    },
    {
      id: 'php-http-3',
      title: 'Check Request Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to get the HTTP request method from server variables.',
      skeleton: `<?php
\\\$method = \\\$_SERVER[___];
if (\\\$method === 'POST') {
    echo "Processing form";
}`,
      solution: `<?php
\\\$method = \\\$_SERVER['REQUEST_METHOD'];
if (\\\$method === 'POST') {
    echo "Processing form";
}`,
      hints: [
        '\$_SERVER contains request and server info',
        'The key for HTTP method is a string constant',
        'Use REQUEST_METHOD as the key',
      ],
      concepts: ['superglobals', 'request-method'],
    },
    {
      id: 'php-http-4',
      title: 'Set Response Status Code',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to set the HTTP response status code to 404.',
      skeleton: `<?php
___(404);
echo json_encode(['error' => 'Not Found']);`,
      solution: `<?php
http_response_code(404);
echo json_encode(['error' => 'Not Found']);`,
      hints: [
        'PHP has a built-in function for setting status codes',
        'The function name describes what it sets',
        'Use http_response_code()',
      ],
      concepts: ['status-codes', 'http-response'],
    },
    {
      id: 'php-http-5',
      title: 'Send JSON Header',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to send a Content-Type header for JSON.',
      skeleton: `<?php
header(___);
echo json_encode(['status' => 'ok']);`,
      solution: `<?php
header('Content-Type: application/json');
echo json_encode(['status' => 'ok']);`,
      hints: [
        'The header() function sends raw HTTP headers',
        'JSON content type is application/json',
        'Format: "Header-Name: value"',
      ],
      concepts: ['headers', 'content-type'],
    },
    {
      id: 'php-http-6',
      title: 'Redirect with Header',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to redirect the browser to /dashboard.',
      skeleton: `<?php
header(___);
exit;`,
      solution: `<?php
header('Location: /dashboard');
exit;`,
      hints: [
        'HTTP redirects use the Location header',
        'Format: "Location: url"',
        'Always call exit after a redirect',
      ],
      concepts: ['headers', 'redirect'],
    },
    {
      id: 'php-http-7',
      title: 'Build a JSON API Response Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function jsonResponse that takes a data array and optional status code, sets the Content-Type header, status code, and echoes the JSON.',
      skeleton: `<?php
function jsonResponse(array \\\$data, int \\\$statusCode = 200): void {
    // Set Content-Type header to application/json
    // Set the HTTP response status code
    // Echo the JSON-encoded data
}`,
      solution: `<?php
function jsonResponse(array \\\$data, int \\\$statusCode = 200): void {
    header('Content-Type: application/json');
    http_response_code(\\\$statusCode);
    echo json_encode(\\\$data);
}`,
      hints: [
        'Use header() to set Content-Type',
        'Use http_response_code() for the status',
        'Use json_encode() to convert the array',
      ],
      concepts: ['headers', 'status-codes', 'json'],
    },
    {
      id: 'php-http-8',
      title: 'Parse JSON Request Body',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function getJsonBody that reads the raw request body and returns the decoded associative array, or null if invalid JSON.',
      skeleton: `<?php
function getJsonBody(): ?array {
    // Read raw body from php://input
    // Decode as associative array
    // Return null if decoding fails
}`,
      solution: `<?php
function getJsonBody(): ?array {
    \\\$raw = file_get_contents('php://input');
    \\\$data = json_decode(\\\$raw, true);
    return is_array(\\\$data) ? \\\$data : null;
}`,
      hints: [
        'Use file_get_contents with php://input',
        'json_decode with true returns an associative array',
        'Check if the result is actually an array',
      ],
      concepts: ['request-body', 'json-decode'],
    },
    {
      id: 'php-http-9',
      title: 'Build Query String',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function buildUrl that takes a base URL and an associative array of parameters and returns the full URL with query string.',
      skeleton: `<?php
function buildUrl(string \\\$base, array \\\$params): string {
    // Build query string from params array
    // Append to base URL with ?
}`,
      solution: `<?php
function buildUrl(string \\\$base, array \\\$params): string {
    \\\$query = http_build_query(\\\$params);
    return \\\$base . '?' . \\\$query;
}`,
      hints: [
        'PHP has a built-in function for building query strings',
        'http_build_query() converts arrays to query strings',
        'Concatenate with ? between base and query',
      ],
      concepts: ['query-string', 'http_build_query'],
    },
    {
      id: 'php-http-10',
      title: 'Simple cURL GET Request',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function httpGet that performs a cURL GET request and returns the response body as a string.',
      skeleton: `<?php
function httpGet(string \\\$url): string {
    // Initialize cURL
    // Set CURLOPT_RETURNTRANSFER to true
    // Execute and return the result
    // Close the handle
}`,
      solution: `<?php
function httpGet(string \\\$url): string {
    \\\$ch = curl_init(\\\$url);
    curl_setopt(\\\$ch, CURLOPT_RETURNTRANSFER, true);
    \\\$response = curl_exec(\\\$ch);
    curl_close(\\\$ch);
    return \\\$response;
}`,
      hints: [
        'curl_init() creates a new cURL handle',
        'CURLOPT_RETURNTRANSFER makes curl_exec return the response',
        'Always close the handle with curl_close()',
      ],
      concepts: ['curl', 'GET-request'],
    },
    {
      id: 'php-http-11',
      title: 'cURL POST with JSON',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function httpPostJson that sends a POST request with JSON body and returns the decoded response.',
      skeleton: `<?php
function httpPostJson(string \\\$url, array \\\$data): array {
    // Initialize cURL
    // Set POST method, JSON body, headers, and return transfer
    // Execute, close, and return decoded response
}`,
      solution: `<?php
function httpPostJson(string \\\$url, array \\\$data): array {
    \\\$ch = curl_init(\\\$url);
    curl_setopt(\\\$ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt(\\\$ch, CURLOPT_POST, true);
    curl_setopt(\\\$ch, CURLOPT_POSTFIELDS, json_encode(\\\$data));
    curl_setopt(\\\$ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    \\\$response = curl_exec(\\\$ch);
    curl_close(\\\$ch);
    return json_decode(\\\$response, true);
}`,
      hints: [
        'Use CURLOPT_POST to enable POST method',
        'CURLOPT_POSTFIELDS sets the request body',
        'Set Content-Type header via CURLOPT_HTTPHEADER',
      ],
      concepts: ['curl', 'POST-request', 'json'],
    },
    {
      id: 'php-http-12',
      title: 'Extract Request Headers',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function getRequestHeaders that extracts all HTTP_* entries from \$_SERVER and returns them as a clean associative array with proper header names.',
      skeleton: `<?php
function getRequestHeaders(): array {
    // Loop through \\\$_SERVER
    // Find keys starting with HTTP_
    // Convert HTTP_ACCEPT_LANGUAGE to Accept-Language format
    // Return clean associative array
}`,
      solution: `<?php
function getRequestHeaders(): array {
    \\\$headers = [];
    foreach (\\\$_SERVER as \\\$key => \\\$value) {
        if (str_starts_with(\\\$key, 'HTTP_')) {
            \\\$name = str_replace('_', '-', substr(\\\$key, 5));
            \\\$name = ucwords(strtolower(\\\$name), '-');
            \\\$headers[\\\$name] = \\\$value;
        }
    }
    return \\\$headers;
}`,
      hints: [
        'HTTP headers in \$_SERVER start with HTTP_',
        'Remove the HTTP_ prefix with substr',
        'Replace underscores with dashes and fix case',
      ],
      concepts: ['headers', 'server-superglobal'],
    },
    {
      id: 'php-http-13',
      title: 'Fix the Missing Return Transfer',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the cURL request that prints the response to the screen instead of capturing it in a variable.',
      skeleton: `<?php
function fetchData(string \\\$url): array {
    \\\$ch = curl_init(\\\$url);
    \\\$response = curl_exec(\\\$ch);
    curl_close(\\\$ch);
    return json_decode(\\\$response, true);
}
// Bug: response is printed to screen and \\\$response is true/false`,
      solution: `<?php
function fetchData(string \\\$url): array {
    \\\$ch = curl_init(\\\$url);
    curl_setopt(\\\$ch, CURLOPT_RETURNTRANSFER, true);
    \\\$response = curl_exec(\\\$ch);
    curl_close(\\\$ch);
    return json_decode(\\\$response, true);
}`,
      hints: [
        'By default curl_exec outputs directly to the browser',
        'You need to tell cURL to return the response as a string',
        'Add CURLOPT_RETURNTRANSFER option set to true',
      ],
      concepts: ['curl', 'debugging'],
    },
    {
      id: 'php-http-14',
      title: 'Fix Headers Already Sent',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the code that causes a "headers already sent" warning.',
      skeleton: `<?php
echo "Loading...";
header('Content-Type: application/json');
http_response_code(200);
echo json_encode(['data' => 'value']);`,
      solution: `<?php
header('Content-Type: application/json');
http_response_code(200);
echo json_encode(['data' => 'value']);`,
      hints: [
        'Headers must be sent before any output',
        'The echo before header() causes the error',
        'Remove or move any output that comes before header calls',
      ],
      concepts: ['headers', 'output-buffering'],
    },
    {
      id: 'php-http-15',
      title: 'Fix Broken JSON Response',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the API endpoint that returns malformed JSON because of extra output.',
      skeleton: `<?php
function apiResponse(array \\\$data): void {
    header('Content-Type: application/json');
    echo "Debug: processing request\\n";
    echo json_encode(\\\$data);
    echo "\\nDone";
}`,
      solution: `<?php
function apiResponse(array \\\$data): void {
    header('Content-Type: application/json');
    echo json_encode(\\\$data);
}`,
      hints: [
        'JSON responses must contain only valid JSON',
        'Extra echo statements corrupt the JSON output',
        'Remove all debug output around json_encode',
      ],
      concepts: ['json', 'api-response', 'debugging'],
    },
    {
      id: 'php-http-16',
      title: 'Predict GET Parameter Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the output when accessing /page?sort=name&order=asc.',
      skeleton: `<?php
// URL: /page?sort=name&order=asc
\\\$sort = \\\$_GET['sort'] ?? 'id';
\\\$order = \\\$_GET['order'] ?? 'desc';
echo "\\\$sort:\\\$order";`,
      solution: `name:asc`,
      hints: [
        'Both sort and order are in the query string',
        'The ?? operator provides defaults, but both keys exist',
        'The output concatenates with a colon',
      ],
      concepts: ['GET-parameters', 'null-coalescing'],
    },
    {
      id: 'php-http-17',
      title: 'Predict http_response_code Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict what http_response_code returns when called without arguments.',
      skeleton: `<?php
http_response_code(201);
\\\$code = http_response_code();
echo \\\$code;`,
      solution: `201`,
      hints: [
        'http_response_code() with an argument sets the code',
        'Without arguments it returns the current code',
        'The current code was set to 201',
      ],
      concepts: ['status-codes', 'http-response'],
    },
    {
      id: 'php-http-18',
      title: 'Predict Query String Building',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the output of http_build_query with nested arrays.',
      skeleton: `<?php
\\\$params = ['page' => 1, 'tags' => ['php', 'web']];
echo http_build_query(\\\$params);`,
      solution: `page=1&tags%5B0%5D=php&tags%5B1%5D=web`,
      hints: [
        'http_build_query URL-encodes values',
        'Arrays become indexed bracket notation',
        'Square brackets [ ] are encoded as %5B and %5D',
      ],
      concepts: ['query-string', 'url-encoding'],
    },
    {
      id: 'php-http-19',
      title: 'Refactor Repeated cURL Setup',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the repeated cURL configuration into a reusable HttpClient class with get() and post() methods.',
      skeleton: `<?php
// Repetitive cURL code
function getUsers(): array {
    \\\$ch = curl_init('https://api.example.com/users');
    curl_setopt(\\\$ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt(\\\$ch, CURLOPT_HTTPHEADER, ['Accept: application/json', 'Authorization: Bearer token']);
    \\\$r = curl_exec(\\\$ch);
    curl_close(\\\$ch);
    return json_decode(\\\$r, true);
}

function getPosts(): array {
    \\\$ch = curl_init('https://api.example.com/posts');
    curl_setopt(\\\$ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt(\\\$ch, CURLOPT_HTTPHEADER, ['Accept: application/json', 'Authorization: Bearer token']);
    \\\$r = curl_exec(\\\$ch);
    curl_close(\\\$ch);
    return json_decode(\\\$r, true);
}`,
      solution: `<?php
class HttpClient {
    private string \\\$baseUri;
    private array \\\$headers;

    public function __construct(string \\\$baseUri, array \\\$headers = []) {
        \\\$this->baseUri = rtrim(\\\$baseUri, '/');
        \\\$this->headers = \\\$headers;
    }

    public function get(string \\\$path): array {
        \\\$ch = curl_init(\\\$this->baseUri . \\\$path);
        curl_setopt(\\\$ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt(\\\$ch, CURLOPT_HTTPHEADER, \\\$this->headers);
        \\\$response = curl_exec(\\\$ch);
        curl_close(\\\$ch);
        return json_decode(\\\$response, true);
    }

    public function post(string \\\$path, array \\\$data): array {
        \\\$ch = curl_init(\\\$this->baseUri . \\\$path);
        curl_setopt(\\\$ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt(\\\$ch, CURLOPT_POST, true);
        curl_setopt(\\\$ch, CURLOPT_POSTFIELDS, json_encode(\\\$data));
        curl_setopt(\\\$ch, CURLOPT_HTTPHEADER, array_merge(\\\$this->headers, ['Content-Type: application/json']));
        \\\$response = curl_exec(\\\$ch);
        curl_close(\\\$ch);
        return json_decode(\\\$response, true);
    }
}

\\\$client = new HttpClient('https://api.example.com', [
    'Accept: application/json',
    'Authorization: Bearer token',
]);
\\\$users = \\\$client->get('/users');
\\\$posts = \\\$client->get('/posts');`,
      hints: [
        'Extract common cURL setup into a class',
        'Store base URI and default headers as properties',
        'Create get() and post() methods that share configuration',
      ],
      concepts: ['refactoring', 'curl', 'OOP'],
    },
    {
      id: 'php-http-20',
      title: 'Refactor Procedural Router to Class',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the procedural request routing into a clean Router class.',
      skeleton: `<?php
\\\$method = \\\$_SERVER['REQUEST_METHOD'];
\\\$uri = \\\$_SERVER['REQUEST_URI'];

if (\\\$method === 'GET' && \\\$uri === '/users') {
    header('Content-Type: application/json');
    echo json_encode(['users' => []]);
} elseif (\\\$method === 'POST' && \\\$uri === '/users') {
    header('Content-Type: application/json');
    http_response_code(201);
    echo json_encode(['created' => true]);
} elseif (\\\$method === 'GET' && \\\$uri === '/posts') {
    header('Content-Type: application/json');
    echo json_encode(['posts' => []]);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Not Found']);
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
        header('Content-Type: application/json');
        if (isset(\\\$this->routes[\\\$method][\\\$uri])) {
            (\\\$this->routes[\\\$method][\\\$uri])();
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Not Found']);
        }
    }
}

\\\$router = new Router();
\\\$router->get('/users', fn() => print json_encode(['users' => []]));
\\\$router->post('/users', function() {
    http_response_code(201);
    echo json_encode(['created' => true]);
});
\\\$router->get('/posts', fn() => print json_encode(['posts' => []]));
\\\$router->dispatch(\\\$_SERVER['REQUEST_METHOD'], \\\$_SERVER['REQUEST_URI']);`,
      hints: [
        'Store routes in an associative array keyed by method and path',
        'Use callable handlers for each route',
        'A dispatch method matches the request and calls the handler',
      ],
      concepts: ['refactoring', 'routing', 'OOP'],
    },
  ],
};
