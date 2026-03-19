import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'kt-ktor-client',
  title: '40. Ktor Client',
  explanation: `## Ktor Client in Kotlin

Ktor Client is a multiplatform HTTP client library for Kotlin. It provides a coroutine-based API for making HTTP requests.

### Creating a Client

\`\`\`kotlin
val client = HttpClient(CIO) {
    install(ContentNegotiation) { json() }
    install(Logging) { level = LogLevel.INFO }
}
\`\`\`

### GET Request

\`\`\`kotlin
val response: HttpResponse = client.get("https://api.example.com/users")
val body: String = response.body()
\`\`\`

### POST Request

\`\`\`kotlin
val response = client.post("https://api.example.com/users") {
    contentType(ContentType.Application.Json)
    setBody(User("Alice", 30))
}
\`\`\`

### Serialization

\`\`\`kotlin
val client = HttpClient(CIO) {
    install(ContentNegotiation) {
        json(Json { ignoreUnknownKeys = true })
    }
}
val user: User = client.get("https://api.example.com/users/1").body()
\`\`\`

### Authentication

\`\`\`kotlin
val client = HttpClient(CIO) {
    install(Auth) {
        bearer {
            loadTokens { BearerTokens("access-token", "refresh-token") }
        }
    }
}
\`\`\``,
  exercises: [
    {
      id: 'kt-ktor-client-1',
      title: 'Create an HttpClient',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Create a basic Ktor HttpClient.',
      skeleton: `import io.ktor.client.*
import io.ktor.client.engine.cio.*

val client = ___(CIO)`,
      solution: `import io.ktor.client.*
import io.ktor.client.engine.cio.*

val client = HttpClient(CIO)`,
      hints: [
        'HttpClient is the main Ktor client class.',
        'CIO is a coroutine-based engine (Coroutine I/O).',
        'Different engines are available for different platforms.',
      ],
      concepts: ['HttpClient', 'CIO-engine'],
    },
    {
      id: 'kt-ktor-client-2',
      title: 'Simple GET Request',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Make a GET request and read the response body.',
      skeleton: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import kotlinx.coroutines.*

fun main() = runBlocking {
    val client = HttpClient(CIO)
    val response: HttpResponse = client.___(\"https://example.com\")
    println(response.status)
    val body: String = response.___()
    println(body)
    client.close()
}`,
      solution: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import kotlinx.coroutines.*

fun main() = runBlocking {
    val client = HttpClient(CIO)
    val response: HttpResponse = client.get("https://example.com")
    println(response.status)
    val body: String = response.body()
    println(body)
    client.close()
}`,
      hints: [
        'client.get() makes a GET request.',
        'response.body() reads the response body.',
        'Always close the client when done.',
      ],
      concepts: ['get', 'HttpResponse', 'body'],
    },
    {
      id: 'kt-ktor-client-3',
      title: 'POST Request with Body',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Make a POST request with a JSON body.',
      skeleton: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.http.*
import kotlinx.coroutines.*

fun main() = runBlocking {
    val client = HttpClient(CIO)
    val response = client.___(\"https://api.example.com/data\") {
        ___(ContentType.Application.Json)
        setBody("""{"name":"Alice","age":30}""")
    }
    println(response.status)
    client.close()
}`,
      solution: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.http.*
import kotlinx.coroutines.*

fun main() = runBlocking {
    val client = HttpClient(CIO)
    val response = client.post("https://api.example.com/data") {
        contentType(ContentType.Application.Json)
        setBody("""{"name":"Alice","age":30}""")
    }
    println(response.status)
    client.close()
}`,
      hints: [
        'client.post() makes a POST request.',
        'contentType sets the Content-Type header.',
        'setBody sets the request body.',
      ],
      concepts: ['post', 'contentType', 'setBody'],
    },
    {
      id: 'kt-ktor-client-4',
      title: 'Install Content Negotiation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Configure automatic JSON serialization.',
      skeleton: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json

val client = HttpClient(CIO) {
    ___(ContentNegotiation) {
        json(Json { ignoreUnknownKeys = true })
    }
}`,
      solution: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json

val client = HttpClient(CIO) {
    install(ContentNegotiation) {
        json(Json { ignoreUnknownKeys = true })
    }
}`,
      hints: [
        'install() adds plugins to the client.',
        'ContentNegotiation handles automatic serialization.',
        'json() configures kotlinx.serialization as the JSON engine.',
      ],
      concepts: ['install', 'ContentNegotiation', 'json'],
    },
    {
      id: 'kt-ktor-client-5',
      title: 'Request with Headers',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Add custom headers to a request.',
      skeleton: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import kotlinx.coroutines.*

fun main() = runBlocking {
    val client = HttpClient(CIO)
    val response = client.get("https://api.example.com/data") {
        ___ {
            append("Authorization", "Bearer token123")
            append("Accept", "application/json")
        }
    }
    println(response.status)
    client.close()
}`,
      solution: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import kotlinx.coroutines.*

fun main() = runBlocking {
    val client = HttpClient(CIO)
    val response = client.get("https://api.example.com/data") {
        headers {
            append("Authorization", "Bearer token123")
            append("Accept", "application/json")
        }
    }
    println(response.status)
    client.close()
}`,
      hints: [
        'headers { } block adds custom HTTP headers.',
        'append adds a header key-value pair.',
        'Authorization header is common for API authentication.',
      ],
      concepts: ['headers', 'Authorization', 'append'],
    },
    {
      id: 'kt-ktor-client-6',
      title: 'Query Parameters',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Add query parameters to a request URL.',
      skeleton: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import kotlinx.coroutines.*

fun main() = runBlocking {
    val client = HttpClient(CIO)
    val response = client.get("https://api.example.com/search") {
        ___("q", "kotlin")
        ___("page", "1")
    }
    println(response.status)
    client.close()
}`,
      solution: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import kotlinx.coroutines.*

fun main() = runBlocking {
    val client = HttpClient(CIO)
    val response = client.get("https://api.example.com/search") {
        parameter("q", "kotlin")
        parameter("page", "1")
    }
    println(response.status)
    client.close()
}`,
      hints: [
        'parameter() adds query parameters to the URL.',
        'They are URL-encoded automatically.',
        'The resulting URL: /search?q=kotlin&page=1.',
      ],
      concepts: ['parameter', 'query-string'],
    },
    {
      id: 'kt-ktor-client-7',
      title: 'Write an API Client Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a typed API client using Ktor.',
      skeleton: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import kotlinx.serialization.*

// Write a class ApiClient that:
// 1. Has a private val client = HttpClient(CIO)
// 2. Has a private val baseUrl: String parameter
// 3. Has suspend fun getString(path: String): String
// 4. Has fun close() that closes the client`,
      solution: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*

class ApiClient(private val baseUrl: String) {
    private val client = HttpClient(CIO)

    suspend fun getString(path: String): String {
        val response = client.get("\${baseUrl}\${path}")
        return response.body()
    }

    fun close() {
        client.close()
    }
}`,
      hints: [
        'Encapsulate the HttpClient in a class.',
        'Combine baseUrl with path for the full URL.',
        'Always provide a close method for resource cleanup.',
      ],
      concepts: ['API-client', 'encapsulation', 'HttpClient'],
    },
    {
      id: 'kt-ktor-client-8',
      title: 'Write a Typed GET Request',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a function that deserializes the response directly to a type.',
      skeleton: `import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.*

@Serializable
data class User(val id: Int, val name: String, val email: String)

// Write a suspend function called fetchUser that:
// 1. Takes an id: Int
// 2. Creates a client with ContentNegotiation/json
// 3. Makes a GET to "https://api.example.com/users/<id>"
// 4. Returns the response body as User
// 5. Closes the client in a finally block`,
      solution: `import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.*

@Serializable
data class User(val id: Int, val name: String, val email: String)

suspend fun fetchUser(id: Int): User {
    val client = HttpClient(CIO) {
        install(ContentNegotiation) { json() }
    }
    return try {
        client.get("https://api.example.com/users/\${id}").body()
    } finally {
        client.close()
    }
}`,
      hints: [
        'ContentNegotiation auto-deserializes the response body.',
        'response.body<User>() returns a typed User object.',
        'Use try/finally to ensure client.close() is called.',
      ],
      concepts: ['typed-response', 'ContentNegotiation', 'try-finally'],
    },
    {
      id: 'kt-ktor-client-9',
      title: 'Write a POST with Serialized Body',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a function that POSTs a serialized object.',
      skeleton: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.*

@Serializable
data class CreateUser(val name: String, val email: String)

// Write a suspend function called createUser that:
// 1. Takes a CreateUser object
// 2. Creates a client with ContentNegotiation
// 3. POSTs to "https://api.example.com/users"
// 4. Sets contentType to Application.Json and body to the user
// 5. Returns the response status code as Int`,
      solution: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.*

@Serializable
data class CreateUser(val name: String, val email: String)

suspend fun createUser(user: CreateUser): Int {
    val client = HttpClient(CIO) {
        install(ContentNegotiation) { json() }
    }
    return try {
        val response = client.post("https://api.example.com/users") {
            contentType(ContentType.Application.Json)
            setBody(user)
        }
        response.status.value
    } finally {
        client.close()
    }
}`,
      hints: [
        'setBody(user) serializes the object to JSON automatically.',
        'ContentNegotiation handles the serialization.',
        'response.status.value gives the numeric status code.',
      ],
      concepts: ['post', 'setBody', 'ContentNegotiation'],
    },
    {
      id: 'kt-ktor-client-10',
      title: 'Write a Request with Timeout',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a client with request timeout configuration.',
      skeleton: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.*
import io.ktor.client.request.*
import io.ktor.client.statement.*

// Write a suspend function called fetchWithTimeout that:
// 1. Takes url: String and timeoutMs: Long
// 2. Creates a client with HttpTimeout plugin
// 3. Sets requestTimeoutMillis to timeoutMs
// 4. Makes a GET request
// 5. Returns the body string, or "Timeout" on HttpRequestTimeoutException`,
      solution: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.*
import io.ktor.client.request.*
import io.ktor.client.statement.*

suspend fun fetchWithTimeout(url: String, timeoutMs: Long): String {
    val client = HttpClient(CIO) {
        install(HttpTimeout) {
            requestTimeoutMillis = timeoutMs
        }
    }
    return try {
        client.get(url).body()
    } catch (e: HttpRequestTimeoutException) {
        "Timeout"
    } finally {
        client.close()
    }
}`,
      hints: [
        'HttpTimeout plugin adds timeout support.',
        'requestTimeoutMillis sets the overall request timeout.',
        'HttpRequestTimeoutException is thrown on timeout.',
      ],
      concepts: ['HttpTimeout', 'requestTimeoutMillis', 'exception-handling'],
    },
    {
      id: 'kt-ktor-client-11',
      title: 'Write a Bearer Auth Client',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a client with Bearer token authentication.',
      skeleton: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.auth.*
import io.ktor.client.plugins.auth.providers.*

// Write a function called createAuthClient that:
// 1. Takes a token: String parameter
// 2. Creates an HttpClient with Auth plugin
// 3. Configures bearer authentication
// 4. loadTokens returns BearerTokens(token, token)
// 5. Returns the client`,
      solution: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.auth.*
import io.ktor.client.plugins.auth.providers.*

fun createAuthClient(token: String): HttpClient {
    return HttpClient(CIO) {
        install(Auth) {
            bearer {
                loadTokens {
                    BearerTokens(token, token)
                }
            }
        }
    }
}`,
      hints: [
        'Auth plugin handles authentication automatically.',
        'bearer configures Bearer token auth.',
        'BearerTokens takes access and refresh tokens.',
      ],
      concepts: ['Auth', 'bearer', 'BearerTokens'],
    },
    {
      id: 'kt-ktor-client-12',
      title: 'Write a Retry Interceptor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a client wrapper that retries failed requests.',
      skeleton: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import kotlinx.coroutines.delay

// Write a class RetryClient that:
// 1. Has private val client = HttpClient(CIO)
// 2. Has suspend fun getWithRetry(url: String, maxRetries: Int = 3, delayMs: Long = 1000): String
// 3. Retries the request on any exception
// 4. Returns the body on success
// 5. Throws the last exception after all retries exhausted`,
      solution: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import kotlinx.coroutines.delay

class RetryClient {
    private val client = HttpClient(CIO)

    suspend fun getWithRetry(url: String, maxRetries: Int = 3, delayMs: Long = 1000): String {
        var lastException: Exception? = null
        repeat(maxRetries) { attempt ->
            try {
                return client.get(url).body()
            } catch (e: Exception) {
                lastException = e
                if (attempt < maxRetries - 1) delay(delayMs)
            }
        }
        throw lastException!!
    }

    fun close() = client.close()
}`,
      hints: [
        'Retry by catching exceptions and re-attempting.',
        'Delay between retries to avoid flooding the server.',
        'After all retries, throw the last exception.',
      ],
      concepts: ['retry', 'exception-handling', 'delay'],
    },
    {
      id: 'kt-ktor-client-13',
      title: 'Fix Missing Client Close',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Fix the resource leak from not closing the HttpClient.',
      skeleton: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import kotlinx.coroutines.*

suspend fun fetchData(): String {
    val client = HttpClient(CIO)
    val response = client.get("https://example.com")
    return response.body()  // Client never closed!
}`,
      solution: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import kotlinx.coroutines.*

suspend fun fetchData(): String {
    val client = HttpClient(CIO)
    return try {
        client.get("https://example.com").body()
    } finally {
        client.close()
    }
}`,
      hints: [
        'HttpClient holds resources that must be released.',
        'Use try/finally to ensure close() is called.',
        'Or use client.use { } for automatic closing.',
      ],
      concepts: ['resource-leak', 'close', 'try-finally'],
    },
    {
      id: 'kt-ktor-client-14',
      title: 'Fix Missing Content-Type',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the POST request missing the Content-Type header.',
      skeleton: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import kotlinx.coroutines.*

fun main() = runBlocking {
    val client = HttpClient(CIO)
    client.post("https://api.example.com/data") {
        setBody("""{"key":"value"}""")  // Server rejects: no Content-Type!
    }
    client.close()
}`,
      solution: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.http.*
import kotlinx.coroutines.*

fun main() = runBlocking {
    val client = HttpClient(CIO)
    client.post("https://api.example.com/data") {
        contentType(ContentType.Application.Json)
        setBody("""{"key":"value"}""")
    }
    client.close()
}`,
      hints: [
        'POST requests with JSON body need Content-Type header.',
        'Use contentType(ContentType.Application.Json).',
        'Without it, the server may reject or misinterpret the body.',
      ],
      concepts: ['contentType', 'Content-Type', 'POST'],
    },
    {
      id: 'kt-ktor-client-15',
      title: 'Fix Blocking in Coroutine',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix using a blocking HTTP call inside a coroutine.',
      skeleton: `import kotlinx.coroutines.*

suspend fun fetchUrl(url: String): String {
    // Blocking call in a coroutine!
    return java.net.URL(url).readText()
}

fun main() = runBlocking {
    val data = fetchUrl("https://example.com")
    println(data.length)
}`,
      solution: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import kotlinx.coroutines.*

suspend fun fetchUrl(url: String): String {
    val client = HttpClient(CIO)
    return try {
        client.get(url).body()
    } finally {
        client.close()
    }
}

fun main() = runBlocking {
    val data = fetchUrl("https://example.com")
    println(data.length)
}`,
      hints: [
        'java.net.URL.readText() blocks the thread.',
        'Use Ktor HttpClient for non-blocking HTTP requests.',
        'Ktor client.get() is a suspend function.',
      ],
      concepts: ['non-blocking', 'HttpClient', 'suspend'],
    },
    {
      id: 'kt-ktor-client-16',
      title: 'Predict HTTP Status Code',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Predict the status code property value.',
      skeleton: `import io.ktor.http.*

fun main() {
    val status = HttpStatusCode.OK
    println(status.value)
    println(status.description)
}`,
      solution: `200
OK`,
      hints: [
        'HttpStatusCode.OK represents HTTP 200.',
        'value gives the numeric code.',
        'description gives the text description.',
      ],
      concepts: ['HttpStatusCode', 'status-code'],
    },
    {
      id: 'kt-ktor-client-17',
      title: 'Predict URL Building',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the URL built by URLBuilder.',
      skeleton: `import io.ktor.http.*

fun main() {
    val url = URLBuilder("https://api.example.com").apply {
        appendPathSegments("users", "42")
        parameters.append("fields", "name,email")
    }.buildString()
    println(url)
}`,
      solution: `https://api.example.com/users/42?fields=name%2Cemail`,
      hints: [
        'appendPathSegments adds path segments.',
        'parameters.append adds query parameters.',
        'The comma is URL-encoded as %2C.',
      ],
      concepts: ['URLBuilder', 'path-segments', 'query-parameters'],
    },
    {
      id: 'kt-ktor-client-18',
      title: 'Predict Content Type',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Predict the string representation of content types.',
      skeleton: `import io.ktor.http.*

fun main() {
    println(ContentType.Application.Json)
    println(ContentType.Text.Plain)
}`,
      solution: `application/json
text/plain`,
      hints: [
        'ContentType follows MIME type format.',
        'Application.Json is "application/json".',
        'Text.Plain is "text/plain".',
      ],
      concepts: ['ContentType', 'MIME-type'],
    },
    {
      id: 'kt-ktor-client-19',
      title: 'Refactor URL Concatenation to Builder',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Refactor manual URL string concatenation to use Ktor URL builder.',
      skeleton: `suspend fun fetchUsers(baseUrl: String, page: Int, limit: Int): String {
    val url = "\${baseUrl}/api/users?page=\${page}&limit=\${limit}"
    // Manual string building is error-prone
    val client = io.ktor.client.HttpClient(io.ktor.client.engine.cio.CIO)
    val response = client.get(url)
    val body: String = response.body()
    client.close()
    return body
}`,
      solution: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*

suspend fun fetchUsers(baseUrl: String, page: Int, limit: Int): String {
    val client = HttpClient(CIO)
    return try {
        val response: HttpResponse = client.get(baseUrl) {
            url {
                appendPathSegments("api", "users")
                parameters.append("page", page.toString())
                parameters.append("limit", limit.toString())
            }
        }
        response.body()
    } finally {
        client.close()
    }
}`,
      hints: [
        'Use the url { } block for safe URL building.',
        'appendPathSegments handles path encoding.',
        'parameters.append handles query string encoding.',
      ],
      concepts: ['URLBuilder', 'safe-URL', 'refactoring'],
    },
    {
      id: 'kt-ktor-client-20',
      title: 'Refactor Callback HTTP to Ktor Suspend',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Refactor callback-based HTTP to Ktor suspend functions.',
      skeleton: `interface HttpCallback {
    fun onSuccess(body: String)
    fun onError(error: Exception)
}

fun fetchAsync(url: String, callback: HttpCallback) {
    Thread {
        try {
            val body = java.net.URL(url).readText()
            callback.onSuccess(body)
        } catch (e: Exception) {
            callback.onError(e)
        }
    }.start()
}

fun main() {
    fetchAsync("https://example.com", object : HttpCallback {
        override fun onSuccess(body: String) = println("Got: \${body.length} chars")
        override fun onError(error: Exception) = println("Error: \${error.message}")
    })
    Thread.sleep(5000)
}`,
      solution: `import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import kotlinx.coroutines.*

suspend fun fetch(url: String): String {
    val client = HttpClient(CIO)
    return try {
        client.get(url).body()
    } finally {
        client.close()
    }
}

fun main() = runBlocking {
    try {
        val body = fetch("https://example.com")
        println("Got: \${body.length} chars")
    } catch (e: Exception) {
        println("Error: \${e.message}")
    }
}`,
      hints: [
        'Replace callbacks with suspend functions.',
        'Use try/catch instead of callback interfaces.',
        'Sequential code reads more naturally than callbacks.',
      ],
      concepts: ['suspend', 'callback-elimination', 'refactoring'],
    },
  ],
};
