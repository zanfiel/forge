import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-networking',
  title: '47. Networking',
  explanation: `## Networking in Java

Java provides comprehensive networking support, from low-level sockets to modern HTTP clients.

### Socket Programming

\`\`\`java
// Server
try (ServerSocket server = new ServerSocket(8080)) {
    Socket client = server.accept();
    BufferedReader in = new BufferedReader(
        new InputStreamReader(client.getInputStream()));
    PrintWriter out = new PrintWriter(client.getOutputStream(), true);
    String line = in.readLine();
    out.println("Echo: " + line);
}

// Client
try (Socket socket = new Socket("localhost", 8080)) {
    PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
    BufferedReader in = new BufferedReader(
        new InputStreamReader(socket.getInputStream()));
    out.println("Hello");
    String response = in.readLine();
}
\`\`\`

### URL and HttpURLConnection (Legacy)

\`\`\`java
URL url = new URL("https://api.example.com/data");
HttpURLConnection conn = (HttpURLConnection) url.openConnection();
conn.setRequestMethod("GET");
int code = conn.getResponseCode();
try (BufferedReader reader = new BufferedReader(
        new InputStreamReader(conn.getInputStream()))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
}
\`\`\`

### HttpClient (Java 11+)

The modern HTTP client supports HTTP/2, async requests, and a fluent API:

\`\`\`java
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/data"))
    .header("Accept", "application/json")
    .GET()
    .build();
HttpResponse<String> response = client.send(
    request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.statusCode());
System.out.println(response.body());
\`\`\`

### Async HTTP

\`\`\`java
CompletableFuture<HttpResponse<String>> future = client.sendAsync(
    request, HttpResponse.BodyHandlers.ofString());
future.thenApply(HttpResponse::body)
      .thenAccept(System.out::println)
      .join();
\`\`\`

### URI Handling

\`\`\`java
URI uri = new URI("https", "example.com", "/path", "q=1", null);
System.out.println(uri.getHost());   // example.com
System.out.println(uri.getPath());   // /path
System.out.println(uri.getQuery());  // q=1
\`\`\`

### WebSocket (Java 11+)

\`\`\`java
HttpClient client = HttpClient.newHttpClient();
WebSocket ws = client.newWebSocketBuilder()
    .buildAsync(URI.create("ws://localhost:8080/ws"), listener)
    .join();
ws.sendText("Hello", true);
\`\`\``,
  exercises: [
    {
      id: 'java-networking-1',
      title: 'Create a ServerSocket',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Complete the code to create a ServerSocket on port 9090 and accept a connection.',
      skeleton: `try (__BLANK__ server = new ServerSocket(__BLANK__)) {
    Socket client = server.__BLANK__();
    System.out.println("Client connected: " + client.getInetAddress());
}`,
      solution: `try (ServerSocket server = new ServerSocket(9090)) {
    Socket client = server.accept();
    System.out.println("Client connected: " + client.getInetAddress());
}`,
      hints: [
        'The resource type is ServerSocket.',
        'Pass the port number 9090 to the constructor.',
        'accept() blocks until a client connects and returns a Socket.',
      ],
      concepts: ['server-socket', 'accept', 'try-with-resources'],
    },
    {
      id: 'java-networking-2',
      title: 'Connect as a Client',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Complete the client socket code to connect to localhost on port 9090 and send a message.',
      skeleton: `try (Socket socket = new __BLANK__("localhost", __BLANK__)) {
    PrintWriter out = new PrintWriter(socket.__BLANK__(), true);
    out.println("Hello Server");
}`,
      solution: `try (Socket socket = new Socket("localhost", 9090)) {
    PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
    out.println("Hello Server");
}`,
      hints: [
        'Create a new Socket with hostname and port.',
        'The port is 9090 to match the server.',
        'Use socket.getOutputStream() to get the output stream for writing.',
      ],
      concepts: ['client-socket', 'output-stream', 'print-writer'],
    },
    {
      id: 'java-networking-3',
      title: 'Read from a Socket',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Read a line of text from a socket input stream.',
      skeleton: `BufferedReader in = new BufferedReader(
    new __BLANK__(socket.__BLANK__()));
String message = in.__BLANK__();
System.out.println("Received: " + message);`,
      solution: `BufferedReader in = new BufferedReader(
    new InputStreamReader(socket.getInputStream()));
String message = in.readLine();
System.out.println("Received: " + message);`,
      hints: [
        'Wrap the InputStream in an InputStreamReader for character decoding.',
        'Use socket.getInputStream() to get the input stream.',
        'readLine() reads one line of text.',
      ],
      concepts: ['input-stream-reader', 'buffered-reader', 'socket-input'],
    },
    {
      id: 'java-networking-4',
      title: 'Build an HttpRequest (Java 11+)',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Build an HTTP GET request using the Java 11 HttpClient API.',
      skeleton: `HttpClient client = HttpClient.__BLANK__();
HttpRequest request = HttpRequest.__BLANK__()
    .uri(__BLANK__.create("https://api.example.com/users"))
    .header("Accept", "application/json")
    .__BLANK__()
    .build();`,
      solution: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users"))
    .header("Accept", "application/json")
    .GET()
    .build();`,
      hints: [
        'HttpClient.newHttpClient() creates a default client.',
        'HttpRequest.newBuilder() starts the fluent builder.',
        'URI.create() parses a string into a URI, and .GET() sets the HTTP method.',
      ],
      concepts: ['http-client', 'http-request', 'fluent-builder'],
    },
    {
      id: 'java-networking-5',
      title: 'Send a Synchronous HTTP Request',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method fetchBody(String url) that sends a GET request and returns the response body as a String.',
      skeleton: `public String fetchBody(String url) throws Exception {
    // Use HttpClient to send a GET request and return the body
}`,
      solution: `public String fetchBody(String url) throws Exception {
    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(url))
        .GET()
        .build();
    HttpResponse<String> response = client.send(
        request, HttpResponse.BodyHandlers.ofString());
    return response.body();
}`,
      hints: [
        'Create an HttpClient and build an HttpRequest with the given URL.',
        'Use client.send() for synchronous requests.',
        'HttpResponse.BodyHandlers.ofString() reads the body as a String.',
      ],
      concepts: ['http-client', 'synchronous-request', 'body-handlers'],
    },
    {
      id: 'java-networking-6',
      title: 'Fix the Missing Flush',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'The server never receives the client message. Fix the PrintWriter so it auto-flushes.',
      skeleton: `try (Socket socket = new Socket("localhost", 8080)) {
    PrintWriter out = new PrintWriter(socket.getOutputStream());
    out.println("Hello");
    // Server never receives the message!

    BufferedReader in = new BufferedReader(
        new InputStreamReader(socket.getInputStream()));
    String reply = in.readLine();
}`,
      solution: `try (Socket socket = new Socket("localhost", 8080)) {
    PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
    out.println("Hello");

    BufferedReader in = new BufferedReader(
        new InputStreamReader(socket.getInputStream()));
    String reply = in.readLine();
}`,
      hints: [
        'PrintWriter buffers output by default.',
        'The second argument to PrintWriter controls auto-flush.',
        'Pass true as the second argument: new PrintWriter(stream, true).',
      ],
      concepts: ['auto-flush', 'print-writer', 'buffering'],
    },
    {
      id: 'java-networking-7',
      title: 'Predict URI Components',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output of URI component getters.',
      skeleton: `URI uri = URI.create("https://user:pass@example.com:443/api/v1?key=abc#section");
System.out.println(uri.getScheme());
System.out.println(uri.getHost());
System.out.println(uri.getPort());
System.out.println(uri.getPath());
System.out.println(uri.getQuery());
System.out.println(uri.getFragment());`,
      solution: `https
example.com
443
/api/v1
key=abc
section`,
      hints: [
        'getScheme() returns the protocol before the "://".',
        'getHost() returns the domain, getPort() returns the port number.',
        'getPath() is the path, getQuery() is after ?, getFragment() is after #.',
      ],
      concepts: ['uri', 'uri-components', 'url-parsing'],
    },
    {
      id: 'java-networking-8',
      title: 'POST Request with Body',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Send an HTTP POST request with a JSON body.',
      skeleton: `String json = "{\\"name\\": \\"Alice\\", \\"age\\": 30}";
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users"))
    .header("Content-Type", "application/json")
    .__BLANK__(HttpRequest.BodyPublishers.__BLANK__(json))
    .build();
HttpResponse<String> response = client.__BLANK__(
    request, HttpResponse.BodyHandlers.ofString());`,
      solution: `String json = "{\\"name\\": \\"Alice\\", \\"age\\": 30}";
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users"))
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(json))
    .build();
HttpResponse<String> response = client.send(
    request, HttpResponse.BodyHandlers.ofString());`,
      hints: [
        'Use .POST() instead of .GET() for a POST request.',
        'BodyPublishers.ofString(json) creates a body from a String.',
        'client.send() sends the request synchronously.',
      ],
      concepts: ['http-post', 'body-publishers', 'json-request'],
    },
    {
      id: 'java-networking-9',
      title: 'Async HTTP Request',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method fetchAsync(HttpClient client, String url) that returns a CompletableFuture<String> of the response body.',
      skeleton: `public CompletableFuture<String> fetchAsync(HttpClient client, String url) {
    // Send an async GET request and return the body as a CompletableFuture<String>
}`,
      solution: `public CompletableFuture<String> fetchAsync(HttpClient client, String url) {
    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(url))
        .GET()
        .build();
    return client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
        .thenApply(HttpResponse::body);
}`,
      hints: [
        'Use client.sendAsync() instead of client.send().',
        'sendAsync returns CompletableFuture<HttpResponse<String>>.',
        'Chain .thenApply(HttpResponse::body) to extract just the body string.',
      ],
      concepts: ['async-http', 'completable-future', 'method-reference'],
    },
    {
      id: 'java-networking-10',
      title: 'Multi-Threaded Server',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a simple multi-threaded echo server using ServerSocket and an ExecutorService that handles each client in a separate thread.',
      skeleton: `public void startEchoServer(int port) throws IOException {
    // Create a ServerSocket and an ExecutorService
    // For each accepted client, submit a task that reads one line and echoes it back
}`,
      solution: `public void startEchoServer(int port) throws IOException {
    ExecutorService pool = Executors.newFixedThreadPool(10);
    try (ServerSocket server = new ServerSocket(port)) {
        while (!server.isClosed()) {
            Socket client = server.accept();
            pool.submit(() -> {
                try (client;
                     BufferedReader in = new BufferedReader(
                         new InputStreamReader(client.getInputStream()));
                     PrintWriter out = new PrintWriter(
                         client.getOutputStream(), true)) {
                    String line = in.readLine();
                    if (line != null) {
                        out.println("Echo: " + line);
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
        }
    }
}`,
      hints: [
        'Use Executors.newFixedThreadPool() to create a thread pool.',
        'For each accepted client, submit a Runnable to the pool.',
        'Inside the task, read a line and write it back with "Echo: " prefix.',
      ],
      concepts: ['multi-threaded-server', 'executor-service', 'socket'],
    },
    {
      id: 'java-networking-11',
      title: 'Fix the Socket Timeout',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'This client hangs forever if the server does not respond. Add a socket read timeout of 5 seconds.',
      skeleton: `try (Socket socket = new Socket("localhost", 8080)) {
    BufferedReader in = new BufferedReader(
        new InputStreamReader(socket.getInputStream()));
    String response = in.readLine(); // hangs forever if no response
    System.out.println(response);
}`,
      solution: `try (Socket socket = new Socket("localhost", 8080)) {
    socket.setSoTimeout(5000);
    BufferedReader in = new BufferedReader(
        new InputStreamReader(socket.getInputStream()));
    String response = in.readLine(); // throws SocketTimeoutException after 5s
    System.out.println(response);
}`,
      hints: [
        'Socket has a method to set a read timeout.',
        'Use socket.setSoTimeout(milliseconds) before reading.',
        'Set it to 5000 for 5 seconds; it throws SocketTimeoutException on expiry.',
      ],
      concepts: ['socket-timeout', 'so-timeout', 'defensive-networking'],
    },
    {
      id: 'java-networking-12',
      title: 'Predict Async HTTP Ordering',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the guaranteed output of this async HTTP code.',
      skeleton: `HttpClient client = HttpClient.newHttpClient();
HttpRequest req = HttpRequest.newBuilder()
    .uri(URI.create("https://example.com"))
    .build();

System.out.println("A");
CompletableFuture<String> future = client
    .sendAsync(req, HttpResponse.BodyHandlers.ofString())
    .thenApply(r -> {
        System.out.println("B");
        return r.body();
    });
System.out.println("C");
future.join();
System.out.println("D");

// What is the GUARANTEED order of A, C, D? Where can B appear?`,
      solution: `A is always first. C is always second (sendAsync is non-blocking). D is always last (join waits for completion). B can appear anywhere between C and D (inclusive). So the output is: A, C, then B and D in that relative order (B before D, but B could print before or after C depending on timing). Guaranteed: A, C, B, D or A, B, C, D -- but A is always first and D always last.`,
      hints: [
        'sendAsync() returns immediately without blocking.',
        'So "C" prints right after "A" in most cases.',
        'join() blocks until the future completes, so "D" is always after "B".',
      ],
      concepts: ['async-ordering', 'completable-future', 'non-blocking'],
    },
    {
      id: 'java-networking-13',
      title: 'HTTP Request with Timeout',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Set a connection timeout and request timeout on the HttpClient.',
      skeleton: `HttpClient client = HttpClient.newBuilder()
    .__BLANK__(Duration.ofSeconds(10))
    .build();

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/slow"))
    .__BLANK__(Duration.ofSeconds(30))
    .GET()
    .build();`,
      solution: `HttpClient client = HttpClient.newBuilder()
    .connectTimeout(Duration.ofSeconds(10))
    .build();

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/slow"))
    .timeout(Duration.ofSeconds(30))
    .GET()
    .build();`,
      hints: [
        'HttpClient.Builder has a connectTimeout() method.',
        'HttpRequest.Builder has a timeout() method for the overall request.',
        'Both accept a Duration object.',
      ],
      concepts: ['http-timeout', 'connection-timeout', 'duration'],
    },
    {
      id: 'java-networking-14',
      title: 'Parallel HTTP Requests',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method fetchAll(HttpClient client, List<String> urls) that sends GET requests to all URLs in parallel and returns a List<String> of response bodies, preserving URL order.',
      skeleton: `public List<String> fetchAll(HttpClient client, List<String> urls) {
    // Send all requests async in parallel, collect results in order
}`,
      solution: `public List<String> fetchAll(HttpClient client, List<String> urls) {
    List<CompletableFuture<String>> futures = urls.stream()
        .map(url -> HttpRequest.newBuilder()
            .uri(URI.create(url))
            .GET()
            .build())
        .map(req -> client.sendAsync(req, HttpResponse.BodyHandlers.ofString())
            .thenApply(HttpResponse::body))
        .toList();

    return futures.stream()
        .map(CompletableFuture::join)
        .toList();
}`,
      hints: [
        'Map each URL to an HttpRequest, then to a CompletableFuture via sendAsync.',
        'Collect all futures into a list first to kick off all requests.',
        'Then join() each future in order to collect results while preserving order.',
      ],
      concepts: ['parallel-http', 'completable-future', 'streams'],
    },
    {
      id: 'java-networking-15',
      title: 'WebSocket Client',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method that connects to a WebSocket endpoint, sends a message, and collects incoming text messages into a CompletableFuture<List<String>> that completes when the WebSocket closes.',
      skeleton: `public CompletableFuture<List<String>> connectWebSocket(
        HttpClient client, String wsUrl, String messageToSend) {
    // Implement WebSocket.Listener, connect, send message, collect responses
}`,
      solution: `public CompletableFuture<List<String>> connectWebSocket(
        HttpClient client, String wsUrl, String messageToSend) {
    List<String> messages = new CopyOnWriteArrayList<>();
    CompletableFuture<List<String>> result = new CompletableFuture<>();

    client.newWebSocketBuilder()
        .buildAsync(URI.create(wsUrl), new WebSocket.Listener() {
            @Override
            public void onOpen(WebSocket webSocket) {
                webSocket.sendText(messageToSend, true);
                WebSocket.Listener.super.onOpen(webSocket);
            }

            @Override
            public CompletionStage<?> onText(WebSocket webSocket,
                    CharSequence data, boolean last) {
                messages.add(data.toString());
                return WebSocket.Listener.super.onText(webSocket, data, last);
            }

            @Override
            public CompletionStage<?> onClose(WebSocket webSocket,
                    int statusCode, String reason) {
                result.complete(messages);
                return WebSocket.Listener.super.onClose(webSocket, statusCode, reason);
            }
        });

    return result;
}`,
      hints: [
        'Use client.newWebSocketBuilder().buildAsync() with a Listener.',
        'Override onOpen to send the message, onText to collect messages.',
        'Override onClose to complete the CompletableFuture with the collected messages.',
      ],
      concepts: ['websocket', 'listener-pattern', 'completable-future'],
    },
    {
      id: 'java-networking-16',
      title: 'Fix the HttpURLConnection Leak',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'java',
      goal: 'This code leaks the input stream and does not handle error responses. Fix both issues.',
      skeleton: `public String fetch(String urlStr) throws IOException {
    URL url = new URL(urlStr);
    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
    conn.setRequestMethod("GET");
    BufferedReader reader = new BufferedReader(
        new InputStreamReader(conn.getInputStream()));
    StringBuilder sb = new StringBuilder();
    String line;
    while ((line = reader.readLine()) != null) {
        sb.append(line);
    }
    return sb.toString();
}`,
      solution: `public String fetch(String urlStr) throws IOException {
    URL url = new URL(urlStr);
    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
    try {
        conn.setRequestMethod("GET");
        int code = conn.getResponseCode();
        InputStream is = (code >= 200 && code < 300)
            ? conn.getInputStream()
            : conn.getErrorStream();
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(is))) {
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            if (code >= 400) {
                throw new IOException("HTTP " + code + ": " + sb);
            }
            return sb.toString();
        }
    } finally {
        conn.disconnect();
    }
}`,
      hints: [
        'The BufferedReader is never closed; use try-with-resources.',
        'Check the response code; use getErrorStream() for error responses.',
        'Call conn.disconnect() in a finally block.',
      ],
      concepts: ['resource-leak', 'error-stream', 'http-url-connection'],
    },
    {
      id: 'java-networking-17',
      title: 'Predict Socket Behavior',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Predict what happens when the client tries to read after the server closes its output stream.',
      skeleton: `// Server thread:
Socket client = server.accept();
PrintWriter out = new PrintWriter(client.getOutputStream(), true);
out.println("Hello");
client.shutdownOutput(); // closes output side only

// Client thread:
Socket socket = new Socket("localhost", port);
BufferedReader in = new BufferedReader(
    new InputStreamReader(socket.getInputStream()));
System.out.println(in.readLine()); // line 1
System.out.println(in.readLine()); // line 2 - what happens here?`,
      solution: `Line 1 prints: Hello
Line 2 prints: null

After the server calls shutdownOutput(), the client sees end-of-stream. readLine() returns null when the stream is closed (no more data). It does NOT throw an exception.`,
      hints: [
        'shutdownOutput() sends a FIN to the peer, signaling end of stream.',
        'The client reads "Hello" on the first readLine().',
        'The second readLine() returns null because the stream has ended.',
      ],
      concepts: ['shutdown-output', 'end-of-stream', 'half-close'],
    },
    {
      id: 'java-networking-18',
      title: 'HTTP Client with Redirect Policy',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method that creates an HttpClient configured with automatic redirect following, HTTP/2, a custom executor, and a 15-second connect timeout. Then send a GET request and return the final URI after redirects.',
      skeleton: `public URI fetchFinalUri(String url) throws Exception {
    // Build a fully configured HttpClient and return the final URI after redirects
}`,
      solution: `public URI fetchFinalUri(String url) throws Exception {
    HttpClient client = HttpClient.newBuilder()
        .followRedirects(HttpClient.Redirect.NORMAL)
        .version(HttpClient.Version.HTTP_2)
        .executor(Executors.newFixedThreadPool(4))
        .connectTimeout(Duration.ofSeconds(15))
        .build();

    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(url))
        .GET()
        .build();

    HttpResponse<String> response = client.send(
        request, HttpResponse.BodyHandlers.ofString());

    return response.uri();
}`,
      hints: [
        'Use HttpClient.Redirect.NORMAL to follow redirects automatically.',
        'HttpClient.Version.HTTP_2 prefers HTTP/2.',
        'response.uri() returns the final URI after any redirects.',
      ],
      concepts: ['redirect-policy', 'http2', 'client-configuration'],
    },
    {
      id: 'java-networking-19',
      title: 'Refactor HttpURLConnection to HttpClient',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor this legacy HttpURLConnection code to use the modern Java 11+ HttpClient API.',
      skeleton: `public String postData(String urlStr, String json) throws IOException {
    URL url = new URL(urlStr);
    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
    conn.setRequestMethod("POST");
    conn.setRequestProperty("Content-Type", "application/json");
    conn.setDoOutput(true);
    try (OutputStream os = conn.getOutputStream()) {
        os.write(json.getBytes());
    }
    try (BufferedReader br = new BufferedReader(
            new InputStreamReader(conn.getInputStream()))) {
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line);
        }
        return sb.toString();
    } finally {
        conn.disconnect();
    }
}`,
      solution: `public String postData(String urlStr, String json) throws IOException, InterruptedException {
    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(urlStr))
        .header("Content-Type", "application/json")
        .POST(HttpRequest.BodyPublishers.ofString(json))
        .build();
    HttpResponse<String> response = client.send(
        request, HttpResponse.BodyHandlers.ofString());
    return response.body();
}`,
      hints: [
        'HttpClient.newHttpClient() replaces URL + HttpURLConnection.',
        'Use HttpRequest.newBuilder() with .POST() and BodyPublishers.ofString().',
        'client.send() returns HttpResponse; call .body() for the response string.',
      ],
      concepts: ['refactoring', 'http-client', 'modern-java'],
    },
    {
      id: 'java-networking-20',
      title: 'Refactor Blocking Server to Non-Blocking',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor this thread-per-client server to use java.nio.channels with a Selector for non-blocking I/O.',
      skeleton: `// Blocking version - one thread per client
public void serve(int port) throws IOException {
    ServerSocket server = new ServerSocket(port);
    while (true) {
        Socket client = server.accept();
        new Thread(() -> {
            try (BufferedReader in = new BufferedReader(
                    new InputStreamReader(client.getInputStream()));
                 PrintWriter out = new PrintWriter(
                     client.getOutputStream(), true)) {
                String line;
                while ((line = in.readLine()) != null) {
                    out.println("Echo: " + line);
                }
            } catch (IOException e) { e.printStackTrace(); }
        }).start();
    }
}`,
      solution: `public void serve(int port) throws IOException {
    Selector selector = Selector.open();
    ServerSocketChannel serverChannel = ServerSocketChannel.open();
    serverChannel.bind(new InetSocketAddress(port));
    serverChannel.configureBlocking(false);
    serverChannel.register(selector, SelectionKey.OP_ACCEPT);

    ByteBuffer buffer = ByteBuffer.allocate(1024);

    while (true) {
        selector.select();
        Iterator<SelectionKey> keys = selector.selectedKeys().iterator();
        while (keys.hasNext()) {
            SelectionKey key = keys.next();
            keys.remove();

            if (key.isAcceptable()) {
                SocketChannel client = serverChannel.accept();
                client.configureBlocking(false);
                client.register(selector, SelectionKey.OP_READ);
            } else if (key.isReadable()) {
                SocketChannel client = (SocketChannel) key.channel();
                buffer.clear();
                int bytesRead = client.read(buffer);
                if (bytesRead == -1) {
                    client.close();
                } else {
                    buffer.flip();
                    byte[] data = new byte[buffer.remaining()];
                    buffer.get(data);
                    String msg = "Echo: " + new String(data).trim();
                    client.write(ByteBuffer.wrap((msg + "\\n").getBytes()));
                }
            }
        }
    }
}`,
      hints: [
        'Use ServerSocketChannel instead of ServerSocket, and configure it as non-blocking.',
        'Register the channel with a Selector for OP_ACCEPT events.',
        'On accept, register the client SocketChannel for OP_READ; on read, echo back.',
      ],
      concepts: ['nio', 'selector', 'non-blocking-io', 'channels'],
    },
  ],
};
