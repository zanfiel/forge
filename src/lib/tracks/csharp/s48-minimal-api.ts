import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-minimal-api',
  title: '48. Minimal APIs',
  explanation: `## Minimal APIs

ASP.NET Core Minimal APIs provide a lightweight approach to building HTTP APIs without controllers. Introduced in .NET 6, they reduce ceremony and boilerplate.

\`\`\`csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapGet("/users/{id}", (int id) => Results.Ok(new { Id = id }));
app.MapPost("/users", (User user) => Results.Created($"/users/{user.Id}", user));

app.Run();
\`\`\`

### Route Parameters and Binding

\`\`\`csharp
// Path parameters
app.MapGet("/items/{id:int}", (int id) => ...);

// Query parameters
app.MapGet("/search", (string? q, int page = 1) => ...);

// Body binding
app.MapPost("/orders", (Order order) => ...);

// Services from DI
app.MapGet("/products", (IProductService svc) => svc.GetAll());
\`\`\`

### Results

\`\`\`csharp
app.MapGet("/items/{id}", (int id, IItemService svc) =>
    svc.GetById(id) is Item item
        ? Results.Ok(item)
        : Results.NotFound());
\`\`\`

### Route Groups

\`\`\`csharp
var api = app.MapGroup("/api/v1");
api.MapGet("/users", GetUsers);
api.MapPost("/users", CreateUser);
\`\`\`

### Endpoint Filters

\`\`\`csharp
app.MapPost("/orders", CreateOrder)
   .AddEndpointFilter(async (ctx, next) =>
   {
       // Validation, logging, etc.
       return await next(ctx);
   });
\`\`\`

### OpenAPI Integration

\`\`\`csharp
app.MapGet("/items", GetItems)
   .WithName("GetItems")
   .WithTags("Items")
   .Produces<List<Item>>(200);
\`\`\``,
  exercises: [
    {
      id: 'cs-minapi-1',
      title: 'MapGet Endpoint',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Define a simple GET endpoint.',
      skeleton: `var app = WebApplication.CreateBuilder(args).Build();
app.__BLANK__("/hello", () => "Hello World!");
app.Run();`,
      solution: `var app = WebApplication.CreateBuilder(args).Build();
app.MapGet("/hello", () => "Hello World!");
app.Run();`,
      hints: ['This method maps an HTTP GET route.', 'It takes a path and a handler delegate.', 'The answer is: MapGet'],
      concepts: ['MapGet', 'minimal API', 'endpoint'],
    },
    {
      id: 'cs-minapi-2',
      title: 'MapPost Endpoint',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Define a POST endpoint that accepts a body.',
      skeleton: `app.__BLANK__("/users", (User user) =>
    Results.Created($"/users/{user.Id}", user));`,
      solution: `app.MapPost("/users", (User user) =>
    Results.Created($"/users/{user.Id}", user));`,
      hints: ['This method maps an HTTP POST route.', 'The body is automatically deserialized.', 'The answer is: MapPost'],
      concepts: ['MapPost', 'body binding', 'Results.Created'],
    },
    {
      id: 'cs-minapi-3',
      title: 'Route Parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Capture a route parameter in a minimal API handler.',
      skeleton: `app.MapGet("/products/{__BLANK__}", (int id) =>
    Results.Ok(new { ProductId = id }));`,
      solution: `app.MapGet("/products/{id}", (int id) =>
    Results.Ok(new { ProductId = id }));`,
      hints: ['The route template uses curly braces for parameters.', 'The parameter name must match the handler argument.', 'The answer is: id'],
      concepts: ['route parameters', 'parameter binding', 'route template'],
    },
    {
      id: 'cs-minapi-4',
      title: 'Results.NotFound',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Return a 404 response when an item is not found.',
      skeleton: `app.MapGet("/items/{id}", (int id, IItemService svc) =>
    svc.GetById(id) is Item item
        ? Results.Ok(item)
        : Results.__BLANK__());`,
      solution: `app.MapGet("/items/{id}", (int id, IItemService svc) =>
    svc.GetById(id) is Item item
        ? Results.Ok(item)
        : Results.NotFound());`,
      hints: ['This method returns an HTTP 404 status.', 'It lives on the Results static class.', 'The answer is: NotFound'],
      concepts: ['Results.NotFound', 'HTTP 404', 'conditional response'],
    },
    {
      id: 'cs-minapi-5',
      title: 'Route Group',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Create a route group with a shared prefix.',
      skeleton: `var api = app.__BLANK__("/api/v1");
api.MapGet("/users", GetUsers);
api.MapPost("/users", CreateUser);`,
      solution: `var api = app.MapGroup("/api/v1");
api.MapGet("/users", GetUsers);
api.MapPost("/users", CreateUser);`,
      hints: ['This method creates a group of endpoints sharing a prefix.', 'Endpoints are /api/v1/users.', 'The answer is: MapGroup'],
      concepts: ['MapGroup', 'route prefix', 'API versioning'],
    },
    {
      id: 'cs-minapi-6',
      title: 'Endpoint Filter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Add a filter to an endpoint.',
      skeleton: `app.MapPost("/orders", CreateOrder)
   .__BLANK__(async (ctx, next) =>
   {
       var order = ctx.GetArgument<Order>(0);
       if (order.Total <= 0) return Results.BadRequest("Invalid total");
       return await next(ctx);
   });`,
      solution: `app.MapPost("/orders", CreateOrder)
   .AddEndpointFilter(async (ctx, next) =>
   {
       var order = ctx.GetArgument<Order>(0);
       if (order.Total <= 0) return Results.BadRequest("Invalid total");
       return await next(ctx);
   });`,
      hints: ['This method adds middleware-like behavior to a single endpoint.', 'It receives context and a next delegate.', 'The answer is: AddEndpointFilter'],
      concepts: ['AddEndpointFilter', 'endpoint middleware', 'validation'],
    },
    {
      id: 'cs-minapi-7',
      title: 'Basic CRUD API',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write minimal API endpoints for CRUD operations on a Todo entity.',
      skeleton: `// Map 4 endpoints:
// GET /todos - return all todos
// GET /todos/{id} - return one or 404
// POST /todos - create and return 201
// DELETE /todos/{id} - delete and return 204 or 404
// Use an in-memory List<Todo> for storage`,
      solution: `var todos = new List<Todo>();
var nextId = 1;

app.MapGet("/todos", () => Results.Ok(todos));

app.MapGet("/todos/{id}", (int id) =>
    todos.FirstOrDefault(t => t.Id == id) is Todo todo
        ? Results.Ok(todo)
        : Results.NotFound());

app.MapPost("/todos", (Todo todo) =>
{
    todo.Id = nextId++;
    todos.Add(todo);
    return Results.Created($"/todos/{todo.Id}", todo);
});

app.MapDelete("/todos/{id}", (int id) =>
{
    var todo = todos.FirstOrDefault(t => t.Id == id);
    if (todo is null) return Results.NotFound();
    todos.Remove(todo);
    return Results.NoContent();
});`,
      hints: ['Use Results.Ok, Created, NotFound, NoContent for responses.', 'Pattern match with is for null checks.', 'POST returns 201 Created with the location header.'],
      concepts: ['CRUD endpoints', 'Results', 'in-memory storage'],
    },
    {
      id: 'cs-minapi-8',
      title: 'DI in Handlers',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write endpoints that inject services from the DI container.',
      skeleton: `// Register IProductService in DI
// Map GET /products that uses IProductService
// Map GET /products/{id} that uses IProductService
// Map POST /products that uses IProductService and IValidator<Product>`,
      solution: `builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IValidator<Product>, ProductValidator>();

var app = builder.Build();

app.MapGet("/products", async (IProductService svc) =>
    Results.Ok(await svc.GetAllAsync()));

app.MapGet("/products/{id}", async (int id, IProductService svc) =>
    await svc.GetByIdAsync(id) is Product p
        ? Results.Ok(p)
        : Results.NotFound());

app.MapPost("/products", async (Product product, IProductService svc, IValidator<Product> validator) =>
{
    var validation = validator.Validate(product);
    if (!validation.IsValid)
        return Results.BadRequest(validation.Errors);

    var created = await svc.CreateAsync(product);
    return Results.Created($"/products/{created.Id}", created);
});`,
      hints: ['Services are injected as handler parameters automatically.', 'The DI container resolves them by type.', 'Combine multiple services in a single handler signature.'],
      concepts: ['dependency injection', 'service injection', 'validation'],
    },
    {
      id: 'cs-minapi-9',
      title: 'TypedResults',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use TypedResults for strongly-typed endpoint responses.',
      skeleton: `// Write a handler method that returns Results<Ok<Product>, NotFound>
// Map it to GET /products/{id}
// TypedResults provides compile-time type checking on responses`,
      solution: `app.MapGet("/products/{id}", async Task<Results<Ok<Product>, NotFound>> (int id, IProductService svc) =>
{
    var product = await svc.GetByIdAsync(id);
    if (product is null)
        return TypedResults.NotFound();

    return TypedResults.Ok(product);
});`,
      hints: ['TypedResults is the strongly-typed version of Results.', 'The return type uses Results<T1, T2> union type.', 'This enables better OpenAPI documentation.'],
      concepts: ['TypedResults', 'Results<T1,T2>', 'type-safe responses'],
    },
    {
      id: 'cs-minapi-10',
      title: 'Route Groups with Filters',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Create route groups with shared filters for authentication and logging.',
      skeleton: `// Create an API group at /api
// Add a sub-group /api/admin with an auth filter
// Add endpoints to both groups
// The admin group should reject requests without an "X-Api-Key" header`,
      solution: `var api = app.MapGroup("/api");

api.MapGet("/status", () => Results.Ok(new { Status = "running" }));

var admin = api.MapGroup("/admin")
    .AddEndpointFilter(async (ctx, next) =>
    {
        var httpContext = ctx.HttpContext;
        if (!httpContext.Request.Headers.ContainsKey("X-Api-Key"))
            return Results.Unauthorized();

        var key = httpContext.Request.Headers["X-Api-Key"].ToString();
        if (key != "secret-key")
            return Results.Forbid();

        return await next(ctx);
    });

admin.MapGet("/users", async (IUserService svc) =>
    Results.Ok(await svc.GetAllAsync()));

admin.MapDelete("/users/{id}", async (int id, IUserService svc) =>
{
    await svc.DeleteAsync(id);
    return Results.NoContent();
});`,
      hints: ['MapGroup returns a RouteGroupBuilder that supports AddEndpointFilter.', 'Filters on a group apply to all endpoints in that group.', 'Access HttpContext through the filter context.'],
      concepts: ['route groups', 'group filters', 'authentication', 'authorization'],
    },
    {
      id: 'cs-minapi-11',
      title: 'Query Parameters',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write an endpoint that handles query parameters with defaults and pagination.',
      skeleton: `// Map GET /search
// Query params: q (string, required), page (int, default 1), pageSize (int, default 10)
// Return paginated results from ISearchService`,
      solution: `app.MapGet("/search", async (
    string q,
    int page,
    int pageSize,
    ISearchService svc) =>
{
    if (page < 1) page = 1;
    if (pageSize < 1 || pageSize > 100) pageSize = 10;

    var results = await svc.SearchAsync(q, page, pageSize);
    return Results.Ok(new
    {
        Query = q,
        Page = page,
        PageSize = pageSize,
        Results = results
    });
})
.WithName("Search")
.WithTags("Search");`,
      hints: ['Query parameters are automatically bound from the URL.', 'Nullable types become optional parameters.', 'Add validation for sensible defaults.'],
      concepts: ['query parameters', 'pagination', 'parameter binding'],
    },
    {
      id: 'cs-minapi-12',
      title: 'OpenAPI Metadata',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Add OpenAPI metadata to endpoints for Swagger documentation.',
      skeleton: `// Map GET /api/products with full OpenAPI metadata:
// - Name, Tags, Summary, Description
// - Produces 200 with List<Product>
// - Produces 500
// Register Swagger services`,
      solution: `builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/api/products", async (IProductService svc) =>
{
    var products = await svc.GetAllAsync();
    return Results.Ok(products);
})
.WithName("GetProducts")
.WithTags("Products")
.WithSummary("Get all products")
.WithDescription("Returns a list of all available products in the catalog")
.Produces<List<Product>>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status500InternalServerError);`,
      hints: ['Use WithName, WithTags, WithSummary for metadata.', 'Produces<T> specifies the response type and status code.', 'AddEndpointsApiExplorer enables API discovery.'],
      concepts: ['OpenAPI', 'Swagger', 'WithName', 'Produces'],
    },
    {
      id: 'cs-minapi-13',
      title: 'Wrong HTTP Method',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the endpoint that uses the wrong HTTP method for the operation.',
      skeleton: `// Bug: using GET for a creation operation
app.MapGet("/users", (User user) =>
{
    _users.Add(user);
    return Results.Created($"/users/{user.Id}", user);
});`,
      solution: `app.MapPost("/users", (User user) =>
{
    _users.Add(user);
    return Results.Created($"/users/{user.Id}", user);
});`,
      hints: ['Creating a resource should use POST, not GET.', 'GET requests typically do not have a body.', 'Change MapGet to MapPost.'],
      concepts: ['HTTP methods', 'MapPost', 'REST conventions'],
    },
    {
      id: 'cs-minapi-14',
      title: 'Missing Async/Await',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the endpoint that returns a Task instead of awaiting it.',
      skeleton: `app.MapGet("/products", (IProductService svc) =>
{
    // Bug: returns Task<List<Product>> instead of List<Product>
    var products = svc.GetAllAsync();
    return Results.Ok(products);
});`,
      solution: `app.MapGet("/products", async (IProductService svc) =>
{
    var products = await svc.GetAllAsync();
    return Results.Ok(products);
});`,
      hints: ['GetAllAsync returns a Task that must be awaited.', 'Without await, the Task object itself is serialized.', 'Add async to the lambda and await the call.'],
      concepts: ['async/await', 'Task unwrapping', 'async endpoint'],
    },
    {
      id: 'cs-minapi-15',
      title: 'SQL Injection in Route',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the endpoint that is vulnerable to SQL injection.',
      skeleton: `app.MapGet("/search", async (string q, AppDbContext db) =>
{
    // Bug: SQL injection vulnerability
    var results = await db.Products
        .FromSqlRaw($"SELECT * FROM Products WHERE Name LIKE '%{q}%'")
        .ToListAsync();
    return Results.Ok(results);
});`,
      solution: `app.MapGet("/search", async (string q, AppDbContext db) =>
{
    var results = await db.Products
        .Where(p => p.Name.Contains(q))
        .ToListAsync();
    return Results.Ok(results);
});`,
      hints: ['Never interpolate user input into raw SQL.', 'Use LINQ instead of FromSqlRaw.', 'EF Core parameterizes LINQ queries automatically.'],
      concepts: ['SQL injection', 'LINQ safety', 'parameterized queries'],
    },
    {
      id: 'cs-minapi-16',
      title: 'Predict Route Matching',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict which endpoint handles a given request.',
      skeleton: `app.MapGet("/items", () => "all");
app.MapGet("/items/{id}", (int id) => $"item-{id}");
app.MapGet("/items/special", () => "special");

// GET /items/special
// Which handler runs?`,
      solution: `special`,
      hints: ['Literal route segments take priority over parameters.', '/items/special matches the literal route, not {id}.', 'ASP.NET Core prefers more specific routes.'],
      concepts: ['route priority', 'literal vs parameter', 'route matching'],
    },
    {
      id: 'cs-minapi-17',
      title: 'Predict Results Type',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the HTTP status code from Results helper methods.',
      skeleton: `// What HTTP status codes do these return?
var a = Results.Ok("data");           // ?
var b = Results.Created("/x", "y");   // ?
var c = Results.NoContent();          // ?
var d = Results.NotFound();           // ?
Console.Write($"{200} {201} {204} {404}");`,
      solution: `200 201 204 404`,
      hints: ['Ok = 200, Created = 201, NoContent = 204, NotFound = 404.', 'These map directly to HTTP status codes.', 'Results provides static helpers for common responses.'],
      concepts: ['HTTP status codes', 'Results helpers', 'REST responses'],
    },
    {
      id: 'cs-minapi-18',
      title: 'Predict Parameter Binding',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict how parameters are bound from different sources.',
      skeleton: `app.MapGet("/test/{id}", (int id, string? name, HttpContext ctx) =>
{
    Console.Write($"id={id} name={name}");
});

// Request: GET /test/42?name=alice
// What is printed?`,
      solution: `id=42 name=alice`,
      hints: ['id comes from the route parameter {id}.', 'name comes from the query string ?name=alice.', 'HttpContext is injected from the request pipeline.'],
      concepts: ['parameter binding', 'route vs query', 'HttpContext injection'],
    },
    {
      id: 'cs-minapi-19',
      title: 'Refactor Controller to Minimal API',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor a traditional controller to minimal API endpoints.',
      skeleton: `[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _svc;
    public ProductsController(IProductService svc) => _svc = svc;

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _svc.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await _svc.GetByIdAsync(id);
        return product is null ? NotFound() : Ok(product);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Product product)
    {
        var created = await _svc.CreateAsync(product);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }
}`,
      solution: `var products = app.MapGroup("/api/products");

products.MapGet("/", async (IProductService svc) =>
    Results.Ok(await svc.GetAllAsync()));

products.MapGet("/{id}", async (int id, IProductService svc) =>
    await svc.GetByIdAsync(id) is Product product
        ? Results.Ok(product)
        : Results.NotFound());

products.MapPost("/", async (Product product, IProductService svc) =>
{
    var created = await svc.CreateAsync(product);
    return Results.Created($"/api/products/{created.Id}", created);
});`,
      hints: ['Replace the controller class with a route group.', 'Each action becomes a Map* call.', 'Services are injected as handler parameters instead of constructor.'],
      concepts: ['controller to minimal API', 'MapGroup', 'handler injection'],
    },
    {
      id: 'cs-minapi-20',
      title: 'Refactor to Endpoint Classes',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor inline minimal API handlers into organized endpoint classes.',
      skeleton: `// All in Program.cs - hard to maintain
app.MapGet("/api/orders", async (AppDbContext db) =>
    Results.Ok(await db.Orders.Include(o => o.Items).ToListAsync()));

app.MapGet("/api/orders/{id}", async (int id, AppDbContext db) =>
    await db.Orders.Include(o => o.Items).FirstOrDefaultAsync(o => o.Id == id)
        is Order order ? Results.Ok(order) : Results.NotFound());

app.MapPost("/api/orders", async (Order order, AppDbContext db) =>
{
    db.Orders.Add(order);
    await db.SaveChangesAsync();
    return Results.Created($"/api/orders/{order.Id}", order);
});`,
      solution: `public static class OrderEndpoints
{
    public static RouteGroupBuilder MapOrderEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/orders");

        group.MapGet("/", GetAll);
        group.MapGet("/{id}", GetById);
        group.MapPost("/", Create);

        return group;
    }

    private static async Task<IResult> GetAll(AppDbContext db) =>
        Results.Ok(await db.Orders.Include(o => o.Items).ToListAsync());

    private static async Task<IResult> GetById(int id, AppDbContext db) =>
        await db.Orders.Include(o => o.Items).FirstOrDefaultAsync(o => o.Id == id)
            is Order order ? Results.Ok(order) : Results.NotFound();

    private static async Task<IResult> Create(Order order, AppDbContext db)
    {
        db.Orders.Add(order);
        await db.SaveChangesAsync();
        return Results.Created($"/api/orders/{order.Id}", order);
    }
}

// In Program.cs: app.MapOrderEndpoints();`,
      hints: ['Move handlers to a static class with an extension method.', 'Use private static methods for each handler.', 'The extension method registers all routes for the group.'],
      concepts: ['endpoint organization', 'extension methods', 'RouteGroupBuilder'],
    },
  ],
};
