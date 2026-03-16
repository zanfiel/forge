import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-web',
  title: '48. Web Development Basics',
  explanation: `## Web Development Basics

Rust has a growing web ecosystem. Axum (built on Tokio and Tower) is the most popular framework, with excellent type safety and performance.

### Axum Hello World
\`\`\`rust
use axum::{Router, routing::get};

async fn hello() -> &'static str {
    "Hello, World!"
}

#[tokio::main]
async fn main() {
    let app = Router::new().route("/", get(hello));
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
\`\`\`

### Path Parameters
\`\`\`rust
use axum::extract::Path;

async fn user(Path(id): Path<u32>) -> String {
    format!("User #{}", id)
}
// Route: .route("/users/:id", get(user))
\`\`\`

### JSON Responses
\`\`\`rust
use axum::Json;
use serde::Serialize;

#[derive(Serialize)]
struct User { name: String, age: u32 }

async fn get_user() -> Json<User> {
    Json(User { name: "Alice".into(), age: 30 })
}
\`\`\`

### State Sharing
\`\`\`rust
use axum::extract::State;
use std::sync::Arc;

struct AppState { db: String }

async fn handler(State(state): State<Arc<AppState>>) -> String {
    format!("DB: {}", state.db)
}
\`\`\`

### HTTP Client with reqwest
\`\`\`rust
let resp = reqwest::get("https://api.example.com/data")
    .await?
    .json::<MyData>()
    .await?;
\`\`\`
`,
  exercises: [
    {
      id: 'rs-web-1',
      title: 'Axum Route Definition',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Define a basic Axum route.',
      skeleton: `use axum::{Router, routing::get};

async fn index() -> &'static str {
    "Welcome!"
}

fn create_app() -> Router {
    Router::new().__BLANK__("/", get(index))
}`,
      solution: `use axum::{Router, routing::get};

async fn index() -> &'static str {
    "Welcome!"
}

fn create_app() -> Router {
    Router::new().route("/", get(index))
}`,
      hints: [
        'Router has a method to add routes.',
        'The method takes a path and a method router.',
        '.route("/", get(index)) adds a GET handler at "/".',
      ],
      concepts: ['axum-router', 'route-definition', 'get-handler'],
    },
    {
      id: 'rs-web-2',
      title: 'JSON Response',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Return a JSON response from an Axum handler.',
      skeleton: `use axum::__BLANK__;
use serde::Serialize;

#[derive(Serialize)]
struct Message {
    text: String,
}

async fn get_message() -> Json<Message> {
    Json(Message { text: "Hello!".into() })
}`,
      solution: `use axum::Json;
use serde::Serialize;

#[derive(Serialize)]
struct Message {
    text: String,
}

async fn get_message() -> Json<Message> {
    Json(Message { text: "Hello!".into() })
}`,
      hints: [
        'Axum provides a Json extractor/responder.',
        'Import Json from axum.',
        'use axum::Json; enables JSON responses.',
      ],
      concepts: ['axum-json', 'json-response', 'serde-integration'],
    },
    {
      id: 'rs-web-3',
      title: 'Path Extraction',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Extract path parameters from a URL in Axum.',
      skeleton: `use axum::extract::__BLANK__;

async fn get_user(Path(id): Path<u32>) -> String {
    format!("User #{}", id)
}`,
      solution: `use axum::extract::Path;

async fn get_user(Path(id): Path<u32>) -> String {
    format!("User #{}", id)
}`,
      hints: [
        'Path parameters are extracted with the Path extractor.',
        'Import Path from axum::extract.',
        'Path<u32> extracts a single u32 from the URL path.',
      ],
      concepts: ['path-extraction', 'axum-extractors', 'url-parameters'],
    },
    {
      id: 'rs-web-4',
      title: 'Query Parameters',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Extract query parameters in Axum.',
      skeleton: `use axum::extract::Query;
use serde::Deserialize;

#[derive(Deserialize)]
struct Pagination {
    page: Option<u32>,
    limit: Option<u32>,
}

async fn list_items(__BLANK__(params): Query<Pagination>) -> String {
    let page = params.page.unwrap_or(1);
    let limit = params.limit.unwrap_or(10);
    format!("Page {} with {} items", page, limit)
}`,
      solution: `use axum::extract::Query;
use serde::Deserialize;

#[derive(Deserialize)]
struct Pagination {
    page: Option<u32>,
    limit: Option<u32>,
}

async fn list_items(Query(params): Query<Pagination>) -> String {
    let page = params.page.unwrap_or(1);
    let limit = params.limit.unwrap_or(10);
    format!("Page {} with {} items", page, limit)
}`,
      hints: [
        'Query extraction uses the same destructuring pattern as Path.',
        'The pattern is Query(params) to extract the deserialized struct.',
        'Query(params): Query<Pagination> destructures the query string.',
      ],
      concepts: ['query-extraction', 'axum-query', 'url-query-params'],
    },
    {
      id: 'rs-web-5',
      title: 'State Extraction',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Share application state across Axum handlers.',
      skeleton: `use axum::{Router, routing::get, extract::State};
use std::sync::Arc;

struct AppState {
    app_name: String,
}

async fn info(State(state): State<Arc<AppState>>) -> String {
    format!("App: {}", state.app_name)
}

fn create_app() -> Router {
    let state = Arc::new(AppState { app_name: "MyApp".into() });
    Router::new()
        .route("/info", get(info))
        .__BLANK__(state)
}`,
      solution: `use axum::{Router, routing::get, extract::State};
use std::sync::Arc;

struct AppState {
    app_name: String,
}

async fn info(State(state): State<Arc<AppState>>) -> String {
    format!("App: {}", state.app_name)
}

fn create_app() -> Router {
    let state = Arc::new(AppState { app_name: "MyApp".into() });
    Router::new()
        .route("/info", get(info))
        .with_state(state)
}`,
      hints: [
        'Router has a method to attach shared state.',
        'The method makes the state available to all handlers.',
        '.with_state(state) attaches the state to the router.',
      ],
      concepts: ['axum-state', 'shared-state', 'arc-state'],
    },
    {
      id: 'rs-web-6',
      title: 'POST Handler with JSON Body',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a POST handler that accepts a JSON body.',
      skeleton: `use axum::{Json, routing::post, Router};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct CreateUser {
    name: String,
    email: String,
}

#[derive(Serialize)]
struct UserResponse {
    id: u32,
    name: String,
}

async fn create_user(__BLANK__(payload): Json<CreateUser>) -> Json<UserResponse> {
    Json(UserResponse {
        id: 1,
        name: payload.name,
    })
}`,
      solution: `use axum::{Json, routing::post, Router};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct CreateUser {
    name: String,
    email: String,
}

#[derive(Serialize)]
struct UserResponse {
    id: u32,
    name: String,
}

async fn create_user(Json(payload): Json<CreateUser>) -> Json<UserResponse> {
    Json(UserResponse {
        id: 1,
        name: payload.name,
    })
}`,
      hints: [
        'JSON body extraction uses the same pattern as Path and Query.',
        'Json(payload): Json<CreateUser> extracts and deserializes the body.',
        'The pattern destructures the Json wrapper.',
      ],
      concepts: ['json-body', 'post-handler', 'request-deserialization'],
    },
    {
      id: 'rs-web-7',
      title: 'Build a CRUD Router',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a function that creates a Router with CRUD routes.',
      skeleton: `use axum::{Router, routing::{get, post, put, delete}};

async fn list_items() -> &'static str { "list" }
async fn create_item() -> &'static str { "create" }
async fn update_item() -> &'static str { "update" }
async fn delete_item() -> &'static str { "delete" }

// Write a function 'item_router' that creates a Router with:
// GET    /items     -> list_items
// POST   /items     -> create_item
// PUT    /items/:id -> update_item
// DELETE /items/:id -> delete_item

fn item_router() -> Router {
    todo!()
}`,
      solution: `use axum::{Router, routing::{get, post, put, delete}};

async fn list_items() -> &'static str { "list" }
async fn create_item() -> &'static str { "create" }
async fn update_item() -> &'static str { "update" }
async fn delete_item() -> &'static str { "delete" }

fn item_router() -> Router {
    Router::new()
        .route("/items", get(list_items).post(create_item))
        .route("/items/:id", put(update_item).delete(delete_item))
}`,
      hints: [
        'Multiple methods on the same path can be chained.',
        'get(handler).post(handler) handles both GET and POST on one path.',
        'Use separate .route() calls for different path patterns.',
      ],
      concepts: ['crud-routing', 'method-chaining', 'restful-routes'],
    },
    {
      id: 'rs-web-8',
      title: 'HTTP Client GET Request',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write an async function that fetches data from a URL.',
      skeleton: `use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct ApiResponse {
    status: String,
    data: String,
}

// Write an async function 'fetch_data' that:
// Takes a URL string
// Makes a GET request using reqwest
// Deserializes the JSON response into ApiResponse
// Returns Result<ApiResponse, reqwest::Error>

async fn fetch_data(url: &str) -> Result<ApiResponse, reqwest::Error> {
    todo!()
}`,
      solution: `use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct ApiResponse {
    status: String,
    data: String,
}

async fn fetch_data(url: &str) -> Result<ApiResponse, reqwest::Error> {
    let response = reqwest::get(url)
        .await?
        .json::<ApiResponse>()
        .await?;
    Ok(response)
}`,
      hints: [
        'reqwest::get() makes an async GET request.',
        '.json::<T>() deserializes the response body.',
        'Chain .await? for both the request and JSON parsing.',
      ],
      concepts: ['reqwest', 'http-client', 'json-deserialization'],
    },
    {
      id: 'rs-web-9',
      title: 'Error Response Handler',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write an Axum handler that returns different status codes.',
      skeleton: `use axum::{http::StatusCode, Json};
use serde::Serialize;

#[derive(Serialize)]
struct ErrorResponse {
    error: String,
}

// Write a function 'find_item' that:
// Takes an id (u32)
// Returns (StatusCode, Json<...>) tuple
// If id == 0, returns 400 Bad Request with error message
// If id > 100, returns 404 Not Found with error message
// Otherwise returns 200 OK with a success message

fn find_item(id: u32) -> (StatusCode, Json<serde_json::Value>) {
    todo!()
}`,
      solution: `use axum::{http::StatusCode, Json};
use serde::Serialize;
use serde_json::json;

#[derive(Serialize)]
struct ErrorResponse {
    error: String,
}

fn find_item(id: u32) -> (StatusCode, Json<serde_json::Value>) {
    if id == 0 {
        (StatusCode::BAD_REQUEST, Json(json!({"error": "Invalid ID"})))
    } else if id > 100 {
        (StatusCode::NOT_FOUND, Json(json!({"error": "Item not found"})))
    } else {
        (StatusCode::OK, Json(json!({"id": id, "name": "Item"})))
    }
}`,
      hints: [
        'Axum handlers can return (StatusCode, Json<T>) tuples.',
        'Use StatusCode::BAD_REQUEST, NOT_FOUND, OK etc.',
        'serde_json::json! macro creates inline JSON values.',
      ],
      concepts: ['status-codes', 'error-responses', 'axum-tuples'],
    },
    {
      id: 'rs-web-10',
      title: 'Middleware Layer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Add a logging middleware layer to an Axum router.',
      skeleton: `use axum::{Router, routing::get, middleware::{self, Next}, http::Request, response::Response, body::Body};

// Write an async function 'log_middleware' that:
// 1. Prints the HTTP method and URI
// 2. Calls next.run(request) to continue
// 3. Prints the response status
// 4. Returns the response

async fn log_middleware(
    request: Request<Body>,
    next: Next,
) -> Response {
    todo!()
}`,
      solution: `use axum::{Router, routing::get, middleware::{self, Next}, http::Request, response::Response, body::Body};

async fn log_middleware(
    request: Request<Body>,
    next: Next,
) -> Response {
    println!("{} {}", request.method(), request.uri());
    let response = next.run(request).await;
    println!("Status: {}", response.status());
    response
}`,
      hints: [
        'Access method and URI from the request.',
        'Call next.run(request).await to pass to the next handler.',
        'Access status from the response before returning it.',
      ],
      concepts: ['axum-middleware', 'request-logging', 'tower-layer'],
    },
    {
      id: 'rs-web-11',
      title: 'Nested Router',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Create a nested router structure for API versioning.',
      skeleton: `use axum::{Router, routing::get};

async fn v1_users() -> &'static str { "v1 users" }
async fn v1_items() -> &'static str { "v1 items" }
async fn v2_users() -> &'static str { "v2 users" }
async fn v2_items() -> &'static str { "v2 items" }

// Write a function 'create_api' that creates a Router with:
// /api/v1/users  -> v1_users
// /api/v1/items  -> v1_items
// /api/v2/users  -> v2_users
// /api/v2/items  -> v2_items
// Use Router::nest for organization

fn create_api() -> Router {
    todo!()
}`,
      solution: `use axum::{Router, routing::get};

async fn v1_users() -> &'static str { "v1 users" }
async fn v1_items() -> &'static str { "v1 items" }
async fn v2_users() -> &'static str { "v2 users" }
async fn v2_items() -> &'static str { "v2 items" }

fn create_api() -> Router {
    let v1 = Router::new()
        .route("/users", get(v1_users))
        .route("/items", get(v1_items));

    let v2 = Router::new()
        .route("/users", get(v2_users))
        .route("/items", get(v2_items));

    Router::new()
        .nest("/api/v1", v1)
        .nest("/api/v2", v2)
}`,
      hints: [
        'Router::nest() mounts a sub-router under a prefix.',
        'Create separate routers for v1 and v2.',
        '.nest("/api/v1", v1) prefixes all v1 routes.',
      ],
      concepts: ['nested-router', 'api-versioning', 'route-organization'],
    },
    {
      id: 'rs-web-12',
      title: 'HTTP POST with reqwest',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write an async function that sends a POST request with a JSON body.',
      skeleton: `use serde::{Serialize, Deserialize};

#[derive(Serialize)]
struct NewItem {
    name: String,
    price: f64,
}

#[derive(Deserialize)]
struct ItemResponse {
    id: u32,
    name: String,
}

// Write an async function 'create_item' that:
// 1. Creates a reqwest Client
// 2. Sends a POST to the given URL with the NewItem as JSON
// 3. Deserializes the response as ItemResponse
// Returns Result<ItemResponse, reqwest::Error>

async fn create_item(url: &str, name: String, price: f64) -> Result<ItemResponse, reqwest::Error> {
    todo!()
}`,
      solution: `use serde::{Serialize, Deserialize};

#[derive(Serialize)]
struct NewItem {
    name: String,
    price: f64,
}

#[derive(Deserialize)]
struct ItemResponse {
    id: u32,
    name: String,
}

async fn create_item(url: &str, name: String, price: f64) -> Result<ItemResponse, reqwest::Error> {
    let client = reqwest::Client::new();
    let item = NewItem { name, price };

    let response = client
        .post(url)
        .json(&item)
        .send()
        .await?
        .json::<ItemResponse>()
        .await?;

    Ok(response)
}`,
      hints: [
        'Create a Client, then use .post(url).json(&body).',
        '.send().await? executes the request.',
        '.json::<T>().await? deserializes the response.',
      ],
      concepts: ['reqwest-post', 'json-body', 'http-client'],
    },
    {
      id: 'rs-web-13',
      title: 'Bug: Missing Async in Handler',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix an Axum handler that is not async.',
      skeleton: `use axum::{Router, routing::get};

// BUG: Axum handlers must be async
fn hello() -> &'static str {
    "Hello!"
}

fn app() -> Router {
    Router::new().route("/", get(hello))
}`,
      solution: `use axum::{Router, routing::get};

async fn hello() -> &'static str {
    "Hello!"
}

fn app() -> Router {
    Router::new().route("/", get(hello))
}`,
      hints: [
        'Axum handlers must be async functions.',
        'Add the async keyword before fn.',
        'async fn hello() makes it compatible with Axum.',
      ],
      concepts: ['async-handler', 'axum-requirements', 'handler-signature'],
    },
    {
      id: 'rs-web-14',
      title: 'Bug: Wrong Extractor Order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix an Axum handler with extractors in the wrong order.',
      skeleton: `use axum::{extract::{Path, State}, Json};
use serde::Deserialize;
use std::sync::Arc;

struct AppState { db: String }

#[derive(Deserialize)]
struct UpdateData { name: String }

// BUG: Json must be the LAST extractor (it consumes the body)
async fn update_item(
    Json(data): Json<UpdateData>,
    Path(id): Path<u32>,
    State(state): State<Arc<AppState>>,
) -> String {
    format!("Updated {} with {}", id, data.name)
}`,
      solution: `use axum::{extract::{Path, State}, Json};
use serde::Deserialize;
use std::sync::Arc;

struct AppState { db: String }

#[derive(Deserialize)]
struct UpdateData { name: String }

async fn update_item(
    State(state): State<Arc<AppState>>,
    Path(id): Path<u32>,
    Json(data): Json<UpdateData>,
) -> String {
    format!("Updated {} with {}", id, data.name)
}`,
      hints: [
        'In Axum, body-consuming extractors must come last.',
        'Json consumes the request body, so it must be the final parameter.',
        'Move State and Path before Json.',
      ],
      concepts: ['extractor-order', 'body-consumption', 'axum-extractors'],
    },
    {
      id: 'rs-web-15',
      title: 'Bug: State Not Cloneable',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix application state that cannot be shared because it is not Clone.',
      skeleton: `use axum::{Router, routing::get, extract::State};

// BUG: AppState is not Clone, which Axum requires for State
struct AppState {
    name: String,
    count: u64,
}

async fn info(State(state): State<AppState>) -> String {
    format!("{}: {}", state.name, state.count)
}

fn app() -> Router {
    let state = AppState { name: "app".into(), count: 0 };
    Router::new().route("/", get(info)).with_state(state)
}`,
      solution: `use axum::{Router, routing::get, extract::State};
use std::sync::Arc;

struct AppState {
    name: String,
    count: u64,
}

async fn info(State(state): State<Arc<AppState>>) -> String {
    format!("{}: {}", state.name, state.count)
}

fn app() -> Router {
    let state = Arc::new(AppState { name: "app".into(), count: 0 });
    Router::new().route("/", get(info)).with_state(state)
}`,
      hints: [
        'Axum state must implement Clone.',
        'Wrap AppState in Arc for cheap cloning.',
        'Use State<Arc<AppState>> instead of State<AppState>.',
      ],
      concepts: ['arc-state', 'clone-requirement', 'shared-state'],
    },
    {
      id: 'rs-web-16',
      title: 'Predict: Route Matching',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict which handler matches a given request.',
      skeleton: `use axum::{Router, routing::get};

async fn root() -> &'static str { "root" }
async fn about() -> &'static str { "about" }
async fn catchall() -> &'static str { "not found" }

// Given a GET request to "/about":
fn app() -> Router {
    Router::new()
        .route("/", get(root))
        .route("/about", get(about))
}
// What does GET /about return?`,
      solution: `about`,
      hints: [
        'Routes are matched by exact path.',
        '"/about" matches the second route.',
        'The response is "about".',
      ],
      concepts: ['route-matching', 'exact-path', 'axum-routing'],
    },
    {
      id: 'rs-web-17',
      title: 'Predict: JSON Serialization',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the JSON body returned by an Axum handler.',
      skeleton: `use axum::Json;
use serde::Serialize;

#[derive(Serialize)]
struct Resp {
    ok: bool,
    count: u32,
}

async fn status() -> Json<Resp> {
    Json(Resp { ok: true, count: 42 })
}
// What is the response body?`,
      solution: `{"ok":true,"count":42}`,
      hints: [
        'Json<T> serializes the struct to JSON.',
        'Fields are serialized in declaration order.',
        'The body is {"ok":true,"count":42}.',
      ],
      concepts: ['json-response-body', 'serde-serialization', 'axum-json'],
    },
    {
      id: 'rs-web-18',
      title: 'Predict: Status Code Tuple',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the status code from a tuple response.',
      skeleton: `use axum::http::StatusCode;

async fn handler() -> (StatusCode, &'static str) {
    (StatusCode::NOT_FOUND, "Resource not found")
}
// What HTTP status code is returned?`,
      solution: `404`,
      hints: [
        'StatusCode::NOT_FOUND corresponds to HTTP 404.',
        'The tuple sets both status code and body.',
        'The status code is 404.',
      ],
      concepts: ['status-code-tuples', 'http-status', 'not-found'],
    },
    {
      id: 'rs-web-19',
      title: 'Refactor: String Response to JSON',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Refactor a handler returning a manual JSON string to use axum::Json.',
      skeleton: `async fn get_status() -> String {
    format!(r#"{{"status":"ok","uptime":{}}}"#, 3600)
}`,
      solution: `use axum::Json;
use serde::Serialize;

#[derive(Serialize)]
struct Status {
    status: &'static str,
    uptime: u64,
}

async fn get_status() -> Json<Status> {
    Json(Status { status: "ok", uptime: 3600 })
}`,
      hints: [
        'Manual JSON strings are error-prone.',
        'Define a struct with Serialize and return Json<T>.',
        'Axum sets the Content-Type header automatically with Json.',
      ],
      concepts: ['json-refactoring', 'type-safe-responses', 'serde-integration'],
    },
    {
      id: 'rs-web-20',
      title: 'Refactor: Inline State to Shared',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor a handler with hardcoded values to use shared state.',
      skeleton: `use axum::{Router, routing::get};

async fn get_config() -> String {
    let db_url = "postgres://localhost/mydb";
    let max_connections = 10;
    format!("DB: {}, Max: {}", db_url, max_connections)
}

fn app() -> Router {
    Router::new().route("/config", get(get_config))
}`,
      solution: `use axum::{Router, routing::get, extract::State};
use std::sync::Arc;

struct AppConfig {
    db_url: String,
    max_connections: u32,
}

async fn get_config(State(config): State<Arc<AppConfig>>) -> String {
    format!("DB: {}, Max: {}", config.db_url, config.max_connections)
}

fn app() -> Router {
    let config = Arc::new(AppConfig {
        db_url: "postgres://localhost/mydb".into(),
        max_connections: 10,
    });
    Router::new()
        .route("/config", get(get_config))
        .with_state(config)
}`,
      hints: [
        'Extract hardcoded values into a config struct.',
        'Wrap in Arc and pass as Axum state.',
        'Use State extractor in the handler.',
      ],
      concepts: ['state-extraction', 'config-struct', 'dependency-injection'],
    },
  ],
};
