import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-networking',
  title: '45. Networking',
  explanation: `## Networking

Python provides built-in modules for network programming -- from low-level sockets to high-level HTTP.

### socket Module
\`\`\`python
import socket

# TCP client
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect(("example.com", 80))
sock.sendall(b"GET / HTTP/1.1\\r\\nHost: example.com\\r\\n\\r\\n")
data = sock.recv(4096)
sock.close()
\`\`\`

### Socket Types
- **SOCK_STREAM** -- TCP (reliable, ordered, connection-based)
- **SOCK_DGRAM** -- UDP (unreliable, connectionless, fast)

### TCP Server
\`\`\`python
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(("0.0.0.0", 8080))
server.listen(5)
conn, addr = server.accept()
\`\`\`

### http.client & urllib
\`\`\`python
from urllib.request import urlopen
response = urlopen("https://example.com")
html = response.read().decode()
\`\`\`

### HTTP Concepts
- **Methods** -- GET, POST, PUT, DELETE, PATCH
- **Status codes** -- 200 OK, 301 Redirect, 404 Not Found, 500 Server Error
- **Headers** -- Content-Type, Authorization, etc.
- **JSON APIs** -- send/receive JSON over HTTP

### json + urllib for REST
\`\`\`python
import json
from urllib.request import Request, urlopen

req = Request("https://api.example.com/data", method="POST")
req.add_header("Content-Type", "application/json")
data = json.dumps({"key": "value"}).encode()
response = urlopen(req, data)
\`\`\`
`,
  exercises: [
    {
      id: 'py-net-1',
      title: 'Create a TCP socket',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a TCP socket using the socket module.',
      skeleton: `import socket

sock = socket.__BLANK__(socket.AF_INET, socket.SOCK_STREAM)
print(type(sock))
sock.close()`,
      solution: `import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print(type(sock))
sock.close()`,
      hints: [
        'The socket module has a class with the same name to create sockets.',
        'AF_INET is IPv4, SOCK_STREAM is TCP.',
        'The answer is: socket',
      ],
      concepts: ['socket', 'TCP', 'AF_INET'],
    },
    {
      id: 'py-net-2',
      title: 'UDP vs TCP',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a UDP socket.',
      skeleton: `import socket

# TCP socket
tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# UDP socket
udp = socket.socket(socket.AF_INET, socket.__BLANK__)

tcp.close()
udp.close()`,
      solution: `import socket

# TCP socket
tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# UDP socket
udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

tcp.close()
udp.close()`,
      hints: [
        'TCP uses SOCK_STREAM. UDP uses a different constant.',
        'UDP stands for User Datagram Protocol.',
        'The answer is: SOCK_DGRAM',
      ],
      concepts: ['UDP', 'SOCK_DGRAM', 'socket types'],
    },
    {
      id: 'py-net-3',
      title: 'Bind and listen',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Set up a TCP server socket to accept connections.',
      skeleton: `import socket

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.__BLANK__(("127.0.0.1", 9999))
server.__BLANK__(5)
print("Server listening on port 9999")
server.close()`,
      solution: `import socket

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(("127.0.0.1", 9999))
server.listen(5)
print("Server listening on port 9999")
server.close()`,
      hints: [
        'A server must attach to an address/port, then start listening.',
        'bind() assigns the address, listen() starts accepting connections.',
        'The answers are: bind and listen',
      ],
      concepts: ['bind', 'listen', 'TCP server'],
    },
    {
      id: 'py-net-4',
      title: 'Write echo server handler',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function that handles one echo client connection.',
      skeleton: `import socket

# Write a function 'handle_client' that:
# 1. Takes a connected socket 'conn'
# 2. Receives up to 1024 bytes
# 3. Sends the same data back (echo)
# 4. Closes the connection

def handle_client(conn):
    pass`,
      solution: `import socket

def handle_client(conn):
    data = conn.recv(1024)
    if data:
        conn.sendall(data)
    conn.close()`,
      hints: [
        'Use conn.recv(1024) to read data from the client.',
        'Use conn.sendall(data) to send data back.',
        'Close the connection with conn.close() when done.',
      ],
      concepts: ['recv', 'sendall', 'echo server'],
    },
    {
      id: 'py-net-5',
      title: 'Predict socket behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Predict the result of socket address operations.',
      skeleton: `import socket

hostname = socket.gethostname()
ip = socket.gethostbyname("localhost")
print(ip)
print(type(ip))`,
      solution: `127.0.0.1
<class 'str'>`,
      hints: [
        'gethostbyname resolves a hostname to an IP address.',
        '"localhost" always resolves to 127.0.0.1.',
        'The IP is returned as a string.',
      ],
      concepts: ['gethostbyname', 'localhost', 'DNS resolution'],
    },
    {
      id: 'py-net-6',
      title: 'Fix socket not closing',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the socket that leaks resources on error.',
      skeleton: `import socket

def fetch_header(host, port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect((host, port))
    sock.sendall(b"HEAD / HTTP/1.1\\r\\nHost: " + host.encode() + b"\\r\\n\\r\\n")
    data = sock.recv(1024)
    sock.close()
    return data.decode()
    # Bug: if any line above raises, sock is never closed`,
      solution: `import socket

def fetch_header(host, port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.connect((host, port))
        sock.sendall(b"HEAD / HTTP/1.1\\r\\nHost: " + host.encode() + b"\\r\\n\\r\\n")
        data = sock.recv(1024)
        return data.decode()`,
      hints: [
        'If an exception occurs before close(), the socket leaks.',
        'Use a context manager to ensure the socket is always closed.',
        'Use "with socket.socket(...) as sock:" for automatic cleanup.',
      ],
      concepts: ['context manager', 'resource management', 'socket'],
    },
    {
      id: 'py-net-7',
      title: 'urllib basics',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use urllib to make an HTTP GET request.',
      skeleton: `from urllib.request import __BLANK__

response = __BLANK__("https://httpbin.org/get")
html = response.read().decode()
print(response.status)
response.close()`,
      solution: `from urllib.request import urlopen

response = urlopen("https://httpbin.org/get")
html = response.read().decode()
print(response.status)
response.close()`,
      hints: [
        'urllib.request provides a simple function to open URLs.',
        'It returns a response object with read() and status.',
        'The answer is: urlopen',
      ],
      concepts: ['urlopen', 'urllib', 'HTTP GET'],
    },
    {
      id: 'py-net-8',
      title: 'Write HTTP GET function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that makes an HTTP GET and returns JSON.',
      skeleton: `from urllib.request import urlopen
import json

# Write a function 'get_json' that:
# 1. Takes a URL string
# 2. Opens it with urlopen
# 3. Reads and decodes the response
# 4. Parses and returns the JSON data

def get_json(url):
    pass`,
      solution: `from urllib.request import urlopen
import json

def get_json(url):
    with urlopen(url) as response:
        data = response.read().decode()
        return json.loads(data)`,
      hints: [
        'Use urlopen as a context manager for automatic cleanup.',
        'response.read() returns bytes, decode() converts to string.',
        'json.loads() parses the JSON string into a Python object.',
      ],
      concepts: ['urlopen', 'json.loads', 'HTTP GET'],
    },
    {
      id: 'py-net-9',
      title: 'HTTP status codes',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Work with HTTP status codes from the http module.',
      skeleton: `from http import __BLANK__

print(__BLANK__.OK.value)
print(__BLANK__.NOT_FOUND.value)
print(__BLANK__.INTERNAL_SERVER_ERROR.value)`,
      solution: `from http import HTTPStatus

print(HTTPStatus.OK.value)
print(HTTPStatus.NOT_FOUND.value)
print(HTTPStatus.INTERNAL_SERVER_ERROR.value)`,
      hints: [
        'The http module provides an enum of standard HTTP status codes.',
        'Each member has a .value (integer) and .phrase (description).',
        'The answer is: HTTPStatus',
      ],
      concepts: ['HTTPStatus', 'status codes'],
    },
    {
      id: 'py-net-10',
      title: 'Fix URL encoding bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the URL that has unencoded query parameters.',
      skeleton: `from urllib.request import urlopen

# Bug: spaces and special chars in URL are not encoded
query = "hello world & goodbye"
url = f"https://httpbin.org/get?q={query}"
# This will fail because of unencoded characters`,
      solution: `from urllib.request import urlopen
from urllib.parse import quote

query = "hello world & goodbye"
url = f"https://httpbin.org/get?q={quote(query)}"`,
      hints: [
        'URLs cannot contain spaces or certain special characters.',
        'urllib.parse provides functions to encode URL components.',
        'Use quote() from urllib.parse to encode the query string.',
      ],
      concepts: ['URL encoding', 'urllib.parse', 'quote'],
    },
    {
      id: 'py-net-11',
      title: 'Predict URL parsing',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Predict the result of parsing a URL.',
      skeleton: `from urllib.parse import urlparse

result = urlparse("https://example.com:8080/api/v1?key=value#section")
print(result.scheme)
print(result.hostname)
print(result.port)
print(result.path)`,
      solution: `https
example.com
8080
/api/v1`,
      hints: [
        'urlparse breaks a URL into components.',
        'scheme is "https", hostname is "example.com".',
        'port is 8080, path is "/api/v1".',
      ],
      concepts: ['urlparse', 'URL components'],
    },
    {
      id: 'py-net-12',
      title: 'Write POST request',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that makes an HTTP POST with JSON body.',
      skeleton: `from urllib.request import Request, urlopen
import json

# Write a function 'post_json' that:
# 1. Takes a url and a data dict
# 2. Creates a Request with method="POST"
# 3. Sets Content-Type header to application/json
# 4. Sends the JSON-encoded data
# 5. Returns the response as a parsed dict

def post_json(url, data):
    pass`,
      solution: `from urllib.request import Request, urlopen
import json

def post_json(url, data):
    body = json.dumps(data).encode("utf-8")
    req = Request(url, data=body, method="POST")
    req.add_header("Content-Type", "application/json")
    with urlopen(req) as response:
        return json.loads(response.read().decode())`,
      hints: [
        'Create a Request object with url, data (bytes), and method.',
        'Add Content-Type header with req.add_header().',
        'Encode dict with json.dumps().encode() and decode response similarly.',
      ],
      concepts: ['POST request', 'JSON', 'Request', 'headers'],
    },
    {
      id: 'py-net-13',
      title: 'Socket with context manager',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a TCP client using socket as a context manager.',
      skeleton: `import socket

# Write a function 'tcp_send' that:
# 1. Takes host, port, and message (string)
# 2. Creates a socket using context manager
# 3. Connects, sends the message as bytes
# 4. Receives up to 4096 bytes response
# 5. Returns the decoded response

def tcp_send(host, port, message):
    pass`,
      solution: `import socket

def tcp_send(host, port, message):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.connect((host, port))
        sock.sendall(message.encode())
        data = sock.recv(4096)
        return data.decode()`,
      hints: [
        'Use "with socket.socket(...) as sock:" for automatic cleanup.',
        'Encode the string message to bytes before sending.',
        'Receive and decode the response bytes to string.',
      ],
      concepts: ['socket', 'context manager', 'TCP client'],
    },
    {
      id: 'py-net-14',
      title: 'Predict server accept behavior',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Predict what accept() returns.',
      skeleton: `import socket

# Conceptual -- what does accept() return?
# server.accept() returns:
# (conn, addr) where:
# - conn is a new socket for the client connection
# - addr is the client's (ip, port) tuple

print(type(("192.168.1.1", 54321)))
print(len(("192.168.1.1", 54321)))`,
      solution: `<class 'tuple'>
2`,
      hints: [
        'accept() returns a tuple of (socket, address).',
        'The address itself is a tuple of (ip_string, port_number).',
        'A tuple with 2 elements has type tuple and length 2.',
      ],
      concepts: ['accept', 'tuple', 'address'],
    },
    {
      id: 'py-net-15',
      title: 'Write URL builder',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function that builds URLs with query parameters.',
      skeleton: `from urllib.parse import urlencode, urljoin

# Write a function 'build_url' that:
# 1. Takes a base_url and a dict of params
# 2. URL-encodes the params
# 3. Returns the full URL with query string
# Example: build_url("https://api.com/search", {"q": "python", "page": 1})
# Returns: "https://api.com/search?q=python&page=1"

def build_url(base_url, params):
    pass`,
      solution: `from urllib.parse import urlencode

def build_url(base_url, params):
    query = urlencode(params)
    return f"{base_url}?{query}"`,
      hints: [
        'urlencode converts a dict to a URL query string.',
        'Combine the base URL and query string with "?".',
        'f"{base_url}?{urlencode(params)}"',
      ],
      concepts: ['urlencode', 'URL building', 'query string'],
    },
    {
      id: 'py-net-16',
      title: 'Fix timeout handling',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the network request that hangs forever without timeout.',
      skeleton: `from urllib.request import urlopen

def fetch_with_timeout(url):
    try:
        response = urlopen(url)  # Bug: no timeout -- can hang forever
        return response.read().decode()
    except Exception as e:
        return f"Error: {e}"`,
      solution: `from urllib.request import urlopen

def fetch_with_timeout(url, timeout=5):
    try:
        response = urlopen(url, timeout=timeout)
        return response.read().decode()
    except Exception as e:
        return f"Error: {e}"`,
      hints: [
        'Network requests should always have a timeout.',
        'urlopen accepts a timeout parameter in seconds.',
        'Add timeout=5 (or a parameter) to the urlopen call.',
      ],
      concepts: ['timeout', 'urlopen', 'error handling'],
    },
    {
      id: 'py-net-17',
      title: 'Write threaded server',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a simple threaded TCP server function.',
      skeleton: `import socket
from threading import Thread

def handle_client(conn, addr):
    data = conn.recv(1024)
    conn.sendall(data)
    conn.close()

# Write a function 'start_echo_server' that:
# 1. Creates a TCP server socket bound to (host, port)
# 2. Listens with backlog of 5
# 3. In a loop, accepts connections
# 4. Handles each in a new daemon thread
# 5. Accepts 'max_clients' connections then stops

def start_echo_server(host, port, max_clients=3):
    pass`,
      solution: `import socket
from threading import Thread

def handle_client(conn, addr):
    data = conn.recv(1024)
    conn.sendall(data)
    conn.close()

def start_echo_server(host, port, max_clients=3):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server:
        server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        server.bind((host, port))
        server.listen(5)
        for _ in range(max_clients):
            conn, addr = server.accept()
            t = Thread(target=handle_client, args=(conn, addr), daemon=True)
            t.start()`,
      hints: [
        'Create a socket, bind, listen, then loop on accept.',
        'For each connection, create a Thread with handle_client as target.',
        'daemon=True ensures threads do not block program exit.',
      ],
      concepts: ['threaded server', 'accept', 'daemon thread'],
    },
    {
      id: 'py-net-18',
      title: 'Write simple REST client',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a REST API client class with GET and POST methods.',
      skeleton: `from urllib.request import Request, urlopen
import json

# Write a class 'RestClient' with:
# 1. __init__(self, base_url) stores the base URL
# 2. get(self, path) makes GET request to base_url + path, returns parsed JSON
# 3. post(self, path, data) makes POST with JSON body, returns parsed JSON

class RestClient:
    pass`,
      solution: `from urllib.request import Request, urlopen
import json

class RestClient:
    def __init__(self, base_url):
        self.base_url = base_url.rstrip("/")

    def get(self, path):
        url = f"{self.base_url}/{path.lstrip('/')}"
        with urlopen(url) as response:
            return json.loads(response.read().decode())

    def post(self, path, data):
        url = f"{self.base_url}/{path.lstrip('/')}"
        body = json.dumps(data).encode("utf-8")
        req = Request(url, data=body, method="POST")
        req.add_header("Content-Type", "application/json")
        with urlopen(req) as response:
            return json.loads(response.read().decode())`,
      hints: [
        'Store base_url in __init__ and build full URL in each method.',
        'GET uses urlopen(url), POST uses Request with data and method.',
        'Always decode response and parse JSON with json.loads.',
      ],
      concepts: ['REST client', 'GET', 'POST', 'JSON API'],
    },
    {
      id: 'py-net-19',
      title: 'Refactor raw socket to urllib',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor low-level socket HTTP code to use urllib.',
      skeleton: `import socket

def http_get(host, path):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect((host, 80))
    request = f"GET {path} HTTP/1.1\\r\\nHost: {host}\\r\\nConnection: close\\r\\n\\r\\n"
    sock.sendall(request.encode())
    response = b""
    while True:
        chunk = sock.recv(4096)
        if not chunk:
            break
        response += chunk
    sock.close()
    # Extract body after headers
    parts = response.split(b"\\r\\n\\r\\n", 1)
    return parts[1].decode() if len(parts) > 1 else ""`,
      solution: `from urllib.request import urlopen

def http_get(host, path):
    url = f"http://{host}{path}"
    with urlopen(url) as response:
        return response.read().decode()`,
      hints: [
        'urllib handles all the HTTP protocol details automatically.',
        'Construct the URL from host and path.',
        'Use urlopen as context manager, read and decode the response.',
      ],
      concepts: ['refactoring', 'urllib', 'socket to high-level'],
    },
    {
      id: 'py-net-20',
      title: 'Refactor to async networking',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor blocking socket code to use asyncio streams.',
      skeleton: `import socket

def echo_client(host, port, message):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect((host, port))
    sock.sendall(message.encode())
    data = sock.recv(1024)
    sock.close()
    return data.decode()`,
      solution: `import asyncio

async def echo_client(host, port, message):
    reader, writer = await asyncio.open_connection(host, port)
    writer.write(message.encode())
    await writer.drain()
    data = await reader.read(1024)
    writer.close()
    await writer.wait_closed()
    return data.decode()`,
      hints: [
        'asyncio.open_connection returns (reader, writer) stream pair.',
        'Use writer.write() + await writer.drain() to send data.',
        'Use await reader.read(1024) to receive data.',
      ],
      concepts: ['refactoring', 'asyncio', 'open_connection', 'streams'],
    },
  ],
};
