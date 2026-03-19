import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'kt-ktor-server',
  title: '41. Ktor Server',
  explanation: `## Ktor Server in Kotlin

Ktor Server is a lightweight, asynchronous web framework for building APIs and web applications in Kotlin.

### Routing
\`\`\`kotlin
fun Application.configureRouting() {
    routing {
        get("/") { call.respondText("Hello!") }
        get("/users/{id}") {
            val id = call.parameters["id"]
            call.respondText("User \$id")
        }
    }
}
\`\`\`

### call and respond
\`\`\`kotlin
get("/json") {
    call.respond(User("Alice", 30))
}
post("/users") {
    val user = call.receive<User>()
    call.respond(HttpStatusCode.Created, user)
}
\`\`\`

### Plugins
\`\`\`kotlin
fun Application.module() {
    install(ContentNegotiation) { json() }
    install(CORS) { anyHost() }
    install(CallLogging) { level = Level.INFO }
}
\`\`\`

### Content Negotiation
\`\`\`kotlin
install(ContentNegotiation) {
    json(Json { prettyPrint = true })
}
\`\`\``,
  exercises: [
    {
      id: 'kt-ktor-server-1',
      title: 'Basic GET Route',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Define a basic GET route.',
      skeleton: `import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*

fun Application.configureRouting() {
    routing {
        ___("/hello") {
            call.respondText("Hello, World!")
        }
    }
}`,
      solution: `import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*

fun Application.configureRouting() {
    routing {
        get("/hello") {
            call.respondText("Hello, World!")
        }
    }
}`,
      hints: ['get() defines a GET route handler.', 'call.respondText sends a plain text response.', 'Routes are defined inside the routing { } block.'],
      concepts: ['get', 'routing', 'respondText'],
    },
    {
      id: 'kt-ktor-server-2',
      title: 'Path Parameters',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Extract path parameters from the URL.',
      skeleton: `import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*

fun Application.configureRouting() {
    routing {
        get("/users/{id}") {
            val id = call.___["id"]
            call.respondText("User: \${id}")
        }
    }
}`,
      solution: `import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*

fun Application.configureRouting() {
    routing {
        get("/users/{id}") {
            val id = call.parameters["id"]
            call.respondText("User: \${id}")
        }
    }
}`,
      hints: ['call.parameters accesses path parameters.', '{id} in the route defines a path parameter.', 'Parameters are accessed by name as strings.'],
      concepts: ['parameters', 'path-parameter'],
    },
    {
      id: 'kt-ktor-server-3',
      title: 'POST Route with Body',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Handle a POST request and read the body.',
      skeleton: `import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import io.ktor.server.application.*
import io.ktor.http.*

fun Application.configureRouting() {
    routing {
        ___(\"\/data\") {
            val body = call.___<String>()
            call.respond(HttpStatusCode.Created, "Received: \${body}")
        }
    }
}`,
      solution: `import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import io.ktor.server.application.*
import io.ktor.http.*

fun Application.configureRouting() {
    routing {
        post("/data") {
            val body = call.receive<String>()
            call.respond(HttpStatusCode.Created, "Received: \${body}")
        }
    }
}`,
      hints: ['post() defines a POST route.', 'call.receive<T>() reads and deserializes the request body.', 'call.respond sends a response with a status code.'],
      concepts: ['post', 'receive', 'respond'],
    },
    {
      id: 'kt-ktor-server-4',
      title: 'Install ContentNegotiation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Install the ContentNegotiation plugin for JSON.',
      skeleton: `import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*

fun Application.module() {
    ___(ContentNegotiation) {
        ___()
    }
}`,
      solution: `import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*

fun Application.module() {
    install(ContentNegotiation) {
        json()
    }
}`,
      hints: ['install() adds a plugin to the application.', 'json() configures kotlinx.serialization for JSON.', 'ContentNegotiation auto-serializes responses.'],
      concepts: ['install', 'ContentNegotiation', 'json'],
    },
    {
      id: 'kt-ktor-server-5',
      title: 'Query Parameters',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Read query parameters from the request.',
      skeleton: `import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*

fun Application.configureRouting() {
    routing {
        get("/search") {
            val query = call.request.___.get("q") ?: "none"
            val page = call.request.___.get("page")?.toIntOrNull() ?: 1
            call.respondText("Search: \${query}, Page: \${page}")
        }
    }
}`,
      solution: `import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*

fun Application.configureRouting() {
    routing {
        get("/search") {
            val query = call.request.queryParameters.get("q") ?: "none"
            val page = call.request.queryParameters.get("page")?.toIntOrNull() ?: 1
            call.respondText("Search: \${query}, Page: \${page}")
        }
    }
}`,
      hints: ['call.request.queryParameters accesses query string params.', 'Use ?: for default values when parameters are missing.', 'toIntOrNull() safely parses strings to integers.'],
      concepts: ['queryParameters', 'null-safety', 'default-values'],
    },
    {
      id: 'kt-ktor-server-6',
      title: 'Route Grouping',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Group related routes under a common path prefix.',
      skeleton: `import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*

fun Application.configureRouting() {
    routing {
        ___("/api") {
            get("/users") { call.respondText("All users") }
            get("/users/{id}") { call.respondText("User \${call.parameters[\"id\"]}") }
            post("/users") { call.respondText("Create user") }
        }
    }
}`,
      solution: `import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*

fun Application.configureRouting() {
    routing {
        route("/api") {
            get("/users") { call.respondText("All users") }
            get("/users/{id}") { call.respondText("User \${call.parameters["id"]}") }
            post("/users") { call.respondText("Create user") }
        }
    }
}`,
      hints: ['route() groups routes under a common path prefix.', 'Child routes are relative to the parent path.', '/api/users is the full path for the first route.'],
      concepts: ['route', 'grouping', 'prefix'],
    },
    {
      id: 'kt-ktor-server-7',
      title: 'Write a CRUD API',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a complete CRUD routing for a simple resource.',
      skeleton: `import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import io.ktor.server.application.*
import io.ktor.http.*

// Write a function Application.configureTodoRouting() that defines:
// GET /todos - returns "All todos"
// GET /todos/{id} - returns "Todo <id>"
// POST /todos - returns "Created" with status 201
// PUT /todos/{id} - returns "Updated <id>"
// DELETE /todos/{id} - returns "Deleted <id>"`,
      solution: `import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import io.ktor.server.application.*
import io.ktor.http.*

fun Application.configureTodoRouting() {
    routing {
        route("/todos") {
            get { call.respondText("All todos") }
            get("/{id}") {
                val id = call.parameters["id"]
                call.respondText("Todo \${id}")
            }
            post {
                call.respond(HttpStatusCode.Created, "Created")
            }
            put("/{id}") {
                val id = call.parameters["id"]
                call.respondText("Updated \${id}")
            }
            delete("/{id}") {
                val id = call.parameters["id"]
                call.respondText("Deleted \${id}")
            }
        }
    }
}`,
      hints: ['Use route("/todos") to group all todo routes.', 'get, post, put, delete define HTTP method handlers.', 'Use HttpStatusCode.Created for 201 responses.'],
      concepts: ['CRUD', 'routing', 'HTTP-methods'],
    },
    {
      id: 'kt-ktor-server-8',
      title: 'Write a JSON API Endpoint',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write an endpoint that returns JSON data.',
      skeleton: `import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import kotlinx.serialization.*

@Serializable
data class User(val id: Int, val name: String, val email: String)

// Write Application.configureUserApi() that:
// 1. Has an in-memory list of users
// 2. GET /api/users returns the list as JSON
// 3. GET /api/users/{id} returns a single user or 404`,
      solution: `import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import io.ktor.http.*
import kotlinx.serialization.*

@Serializable
data class User(val id: Int, val name: String, val email: String)

fun Application.configureUserApi() {
    val users = mutableListOf(
        User(1, "Alice", "alice@test.com"),
        User(2, "Bob", "bob@test.com")
    )

    routing {
        route("/api/users") {
            get {
                call.respond(users)
            }
            get("/{id}") {
                val id = call.parameters["id"]?.toIntOrNull()
                val user = users.find { it.id == id }
                if (user != null) {
                    call.respond(user)
                } else {
                    call.respond(HttpStatusCode.NotFound, "User not found")
                }
            }
        }
    }
}`,
      hints: ['call.respond(object) auto-serializes with ContentNegotiation.', 'Use HttpStatusCode.NotFound for 404 responses.', 'Find users by ID using .find { }.'],
      concepts: ['JSON-API', 'respond', 'status-codes'],
    },
    {
      id: 'kt-ktor-server-9',
      title: 'Write Middleware/Plugin',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a simple request logging middleware.',
      skeleton: `import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import io.ktor.server.response.*

// Write a custom plugin called RequestTimer that:
// 1. Uses createApplicationPlugin
// 2. Records System.currentTimeMillis() before the call
// 3. After the call completes, logs the method, URI, and elapsed time
// 4. Prints: "GET /path took 5ms"`,
      solution: `import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import io.ktor.server.response.*

val RequestTimer = createApplicationPlugin(name = "RequestTimer") {
    onCall { call ->
        call.attributes.put(
            io.ktor.util.AttributeKey("startTime"),
            System.currentTimeMillis()
        )
    }
    onCallRespond { call, _ ->
        val startTime = call.attributes.getOrNull(
            io.ktor.util.AttributeKey<Long>("startTime")
        ) ?: return@onCallRespond
        val elapsed = System.currentTimeMillis() - startTime
        println("\${call.request.httpMethod.value} \${call.request.uri} took \${elapsed}ms")
    }
}`,
      hints: ['createApplicationPlugin is the modern way to create plugins.', 'onCall runs before the handler, onCallRespond after.', 'Use attributes to store request-scoped data.'],
      concepts: ['createApplicationPlugin', 'middleware', 'timing'],
    },
    {
      id: 'kt-ktor-server-10',
      title: 'Write Error Handling',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write centralized error handling for the server.',
      skeleton: `import io.ktor.server.application.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.response.*
import io.ktor.http.*
import kotlinx.serialization.*

@Serializable
data class ErrorResponse(val error: String, val code: Int)

// Write Application.configureErrorHandling() that:
// 1. Installs StatusPages plugin
// 2. Handles IllegalArgumentException with 400 Bad Request
// 3. Handles NoSuchElementException with 404 Not Found
// 4. Handles any Exception with 500 Internal Server Error
// 5. Responds with ErrorResponse JSON`,
      solution: `import io.ktor.server.application.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.response.*
import io.ktor.http.*
import kotlinx.serialization.*

@Serializable
data class ErrorResponse(val error: String, val code: Int)

fun Application.configureErrorHandling() {
    install(StatusPages) {
        exception<IllegalArgumentException> { call, cause ->
            call.respond(
                HttpStatusCode.BadRequest,
                ErrorResponse(cause.message ?: "Bad Request", 400)
            )
        }
        exception<NoSuchElementException> { call, cause ->
            call.respond(
                HttpStatusCode.NotFound,
                ErrorResponse(cause.message ?: "Not Found", 404)
            )
        }
        exception<Exception> { call, cause ->
            call.respond(
                HttpStatusCode.InternalServerError,
                ErrorResponse(cause.message ?: "Internal Error", 500)
            )
        }
    }
}`,
      hints: ['StatusPages plugin handles exceptions globally.', 'exception<T> { } catches specific exception types.', 'More specific handlers should come before general ones.'],
      concepts: ['StatusPages', 'exception-handling', 'error-response'],
    },
    {
      id: 'kt-ktor-server-11',
      title: 'Write a WebSocket Endpoint',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a basic WebSocket echo endpoint.',
      skeleton: `import io.ktor.server.application.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*

// Write Application.configureWebSocket() that:
// 1. Installs WebSockets plugin
// 2. Adds a webSocket route at "/ws/echo"
// 3. For each incoming text frame, sends back "Echo: <message>"
// 4. On close, prints "WebSocket closed"`,
      solution: `import io.ktor.server.application.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*

fun Application.configureWebSocket() {
    install(WebSockets)
    routing {
        webSocket("/ws/echo") {
            for (frame in incoming) {
                if (frame is Frame.Text) {
                    val text = frame.readText()
                    send("Echo: \${text}")
                }
            }
            println("WebSocket closed")
        }
    }
}`,
      hints: ['install(WebSockets) enables WebSocket support.', 'incoming is a channel of incoming frames.', 'Frame.Text contains text messages.'],
      concepts: ['WebSockets', 'Frame', 'incoming'],
    },
    {
      id: 'kt-ktor-server-12',
      title: 'Write Authentication Config',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write basic authentication configuration.',
      skeleton: `import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.routing.*
import io.ktor.server.response.*

// Write Application.configureAuth() that:
// 1. Installs Authentication plugin
// 2. Configures basic auth with realm "api"
// 3. Validates: username "admin" and password "secret" returns UserIdPrincipal("admin")
// 4. Adds an authenticate block with a protected GET /admin route`,
      solution: `import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.routing.*
import io.ktor.server.response.*

fun Application.configureAuth() {
    install(Authentication) {
        basic("auth-basic") {
            realm = "api"
            validate { credentials ->
                if (credentials.name == "admin" && credentials.password == "secret") {
                    UserIdPrincipal(credentials.name)
                } else {
                    null
                }
            }
        }
    }
    routing {
        authenticate("auth-basic") {
            get("/admin") {
                val principal = call.principal<UserIdPrincipal>()
                call.respondText("Hello, \${principal?.name}!")
            }
        }
    }
}`,
      hints: ['Authentication plugin supports multiple auth strategies.', 'basic() configures HTTP Basic authentication.', 'authenticate() wraps routes requiring auth.'],
      concepts: ['Authentication', 'basic-auth', 'principal'],
    },
    {
      id: 'kt-ktor-server-13',
      title: 'Fix Missing respond Import',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Fix the route handler that cannot find respond.',
      skeleton: `import io.ktor.server.routing.*
import io.ktor.server.application.*
// Missing import!

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("Hello!")  // Unresolved reference
        }
    }
}`,
      solution: `import io.ktor.server.routing.*
import io.ktor.server.application.*
import io.ktor.server.response.*

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("Hello!")
        }
    }
}`,
      hints: ['respondText is in io.ktor.server.response.*.', 'Ktor separates response functions into their own package.', 'Add the missing import statement.'],
      concepts: ['imports', 'respondText'],
    },
    {
      id: 'kt-ktor-server-14',
      title: 'Fix Wrong Status Code',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the endpoint returning wrong HTTP status code.',
      skeleton: `import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import io.ktor.http.*

fun Application.configureRouting() {
    routing {
        post("/items") {
            // Bug: POST create should return 201, not 200
            call.respondText("Item created")
        }
        delete("/items/{id}") {
            // Bug: DELETE should return 204 No Content
            call.respond(HttpStatusCode.OK, "Deleted")
        }
    }
}`,
      solution: `import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import io.ktor.http.*

fun Application.configureRouting() {
    routing {
        post("/items") {
            call.respond(HttpStatusCode.Created, "Item created")
        }
        delete("/items/{id}") {
            call.respond(HttpStatusCode.NoContent)
        }
    }
}`,
      hints: ['POST creation should return 201 Created.', 'DELETE should return 204 No Content.', 'Use HttpStatusCode constants for correct codes.'],
      concepts: ['HttpStatusCode', 'Created', 'NoContent'],
    },
    {
      id: 'kt-ktor-server-15',
      title: 'Fix Missing ContentNegotiation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix JSON response that returns serialized toString instead of JSON.',
      skeleton: `import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import kotlinx.serialization.*

@Serializable
data class User(val name: String, val age: Int)

fun Application.module() {
    // Missing ContentNegotiation! respond sends toString() instead of JSON
    routing {
        get("/user") {
            call.respond(User("Alice", 30))
        }
    }
}`,
      solution: `import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.*

@Serializable
data class User(val name: String, val age: Int)

fun Application.module() {
    install(ContentNegotiation) {
        json()
    }
    routing {
        get("/user") {
            call.respond(User("Alice", 30))
        }
    }
}`,
      hints: ['ContentNegotiation is required for automatic JSON serialization.', 'Without it, respond uses toString() for objects.', 'Install it before defining routes.'],
      concepts: ['ContentNegotiation', 'install', 'JSON'],
    },
    {
      id: 'kt-ktor-server-16',
      title: 'Predict Route Matching',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict which route handler matches a request.',
      skeleton: `// Routes defined:
// GET /users -> "all users"
// GET /users/{id} -> "user <id>"
// GET /users/me -> "current user"

// Request: GET /users/me
// Which handler matches?`,
      solution: `current user`,
      hints: ['Exact path matches take priority over parameter matches.', '/users/me matches the literal route, not {id}.', 'Ktor matches the most specific route first.'],
      concepts: ['route-matching', 'priority', 'specific-routes'],
    },
    {
      id: 'kt-ktor-server-17',
      title: 'Predict Status Code',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Predict the HTTP status code returned.',
      skeleton: `import io.ktor.http.*

fun main() {
    val status = HttpStatusCode.Created
    println("\${status.value} \${status.description}")
}`,
      solution: `201 Created`,
      hints: ['HttpStatusCode.Created is HTTP 201.', 'value gives the numeric code.', 'description gives the standard text.'],
      concepts: ['HttpStatusCode', 'status-code'],
    },
    {
      id: 'kt-ktor-server-18',
      title: 'Predict Query Parameter',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the query parameter extraction result.',
      skeleton: `// Route handler for GET /search?q=kotlin&limit=10
// Code:
val q = call.request.queryParameters["q"] ?: "default"
val limit = call.request.queryParameters["limit"]?.toIntOrNull() ?: 25
val sort = call.request.queryParameters["sort"] ?: "relevance"
println("\${q} \${limit} \${sort}")`,
      solution: `kotlin 10 relevance`,
      hints: ['q is "kotlin" from query string.', 'limit is 10, parsed from "10".', 'sort is missing, defaults to "relevance".'],
      concepts: ['queryParameters', 'default-values'],
    },
    {
      id: 'kt-ktor-server-19',
      title: 'Refactor Express-Style to Ktor',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Refactor pseudo Express.js-style routing to Ktor style.',
      skeleton: `// Pseudo Express-style
class Server {
    val routes = mutableMapOf<String, (Map<String, String>) -> String>()
    
    fun get(path: String, handler: (Map<String, String>) -> String) {
        routes["GET \${path}"] = handler
    }
    
    fun handle(method: String, path: String, params: Map<String, String>): String {
        return routes["\${method} \${path}"]?.invoke(params) ?: "404 Not Found"
    }
}

fun main() {
    val server = Server()
    server.get("/hello") { "Hello, World!" }
    server.get("/greet") { params -> "Hello, \${params["name"]}!" }
}`,
      solution: `import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*

fun Application.configureRouting() {
    routing {
        get("/hello") {
            call.respondText("Hello, World!")
        }
        get("/greet") {
            val name = call.request.queryParameters["name"] ?: "World"
            call.respondText("Hello, \${name}!")
        }
    }
}`,
      hints: ['Ktor routing is built into the framework.', 'Use call.respondText instead of returning strings.', 'Query parameters replace the params map.'],
      concepts: ['routing', 'Ktor-migration', 'refactoring'],
    },
    {
      id: 'kt-ktor-server-20',
      title: 'Refactor Inline Handlers to Controller',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Refactor inline route handlers to a separate controller class.',
      skeleton: `import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*

val items = mutableListOf("Item 1", "Item 2", "Item 3")

fun Application.configureRouting() {
    routing {
        get("/items") {
            call.respond(items)
        }
        get("/items/{index}") {
            val idx = call.parameters["index"]?.toIntOrNull()
            if (idx != null && idx in items.indices) call.respondText(items[idx])
            else call.respondText("Not found", status = io.ktor.http.HttpStatusCode.NotFound)
        }
        post("/items") {
            val item = call.receive<String>()
            items.add(item)
            call.respondText("Added", status = io.ktor.http.HttpStatusCode.Created)
        }
    }
}`,
      solution: `import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import io.ktor.server.application.*
import io.ktor.http.*

class ItemController {
    private val items = mutableListOf("Item 1", "Item 2", "Item 3")

    suspend fun getAll(call: ApplicationCall) {
        call.respond(items)
    }

    suspend fun getByIndex(call: ApplicationCall) {
        val idx = call.parameters["index"]?.toIntOrNull()
        if (idx != null && idx in items.indices) {
            call.respondText(items[idx])
        } else {
            call.respond(HttpStatusCode.NotFound, "Not found")
        }
    }

    suspend fun create(call: ApplicationCall) {
        val item = call.receive<String>()
        items.add(item)
        call.respond(HttpStatusCode.Created, "Added")
    }
}

fun Application.configureRouting() {
    val controller = ItemController()
    routing {
        route("/items") {
            get { controller.getAll(call) }
            get("/{index}") { controller.getByIndex(call) }
            post { controller.create(call) }
        }
    }
}`,
      hints: ['Extract handler logic to a controller class.', 'Controller methods are suspend functions taking ApplicationCall.', 'Routes delegate to controller methods.'],
      concepts: ['controller', 'separation-of-concerns', 'refactoring'],
    },
  ],
};
