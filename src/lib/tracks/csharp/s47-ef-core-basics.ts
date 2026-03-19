import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-ef-core',
  title: '47. Entity Framework Core Basics',
  explanation: `## Entity Framework Core

Entity Framework Core (EF Core) is the official .NET ORM for working with databases using C# objects. It maps classes to tables and LINQ queries to SQL.

\`\`\`csharp
public class AppDbContext : DbContext
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Order> Orders => Set<Order>();

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite("Data Source=app.db");
}
\`\`\`

### Core Concepts

- **DbContext** - represents a session with the database
- **DbSet<T>** - represents a table/collection of entities
- **Migrations** - versioned database schema changes
- **Change Tracking** - EF tracks modifications to loaded entities

### CRUD Operations

\`\`\`csharp
// Create
db.Products.Add(new Product { Name = "Widget", Price = 9.99m });
await db.SaveChangesAsync();

// Read
var product = await db.Products.FindAsync(1);
var cheap = await db.Products.Where(p => p.Price < 10).ToListAsync();

// Update
product.Price = 12.99m;
await db.SaveChangesAsync();

// Delete
db.Products.Remove(product);
await db.SaveChangesAsync();
\`\`\`

### Relationships

\`\`\`csharp
public class Order
{
    public int Id { get; set; }
    public List<OrderItem> Items { get; set; } = new();
}

public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public Order Order { get; set; } = null!;
}
\`\`\`

### Fluent API

\`\`\`csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Product>()
        .HasIndex(p => p.Name)
        .IsUnique();
}
\`\`\``,
  exercises: [
    {
      id: 'cs-efcore-1',
      title: 'DbContext Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare a class that inherits from DbContext.',
      skeleton: `public class AppDbContext : __BLANK__
{
    public DbSet<Customer> Customers => Set<Customer>();
}`,
      solution: `public class AppDbContext : DbContext
{
    public DbSet<Customer> Customers => Set<Customer>();
}`,
      hints: ['This is the base class for EF Core database sessions.', 'It lives in Microsoft.EntityFrameworkCore.', 'The answer is: DbContext'],
      concepts: ['DbContext', 'EF Core', 'database session'],
    },
    {
      id: 'cs-efcore-2',
      title: 'DbSet Property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare a DbSet property for an entity.',
      skeleton: `public class StoreContext : DbContext
{
    public __BLANK__<Product> Products => Set<Product>();
}`,
      solution: `public class StoreContext : DbContext
{
    public DbSet<Product> Products => Set<Product>();
}`,
      hints: ['This generic type represents a table of entities.', 'It enables LINQ queries against the database.', 'The answer is: DbSet'],
      concepts: ['DbSet<T>', 'entity collection', 'table mapping'],
    },
    {
      id: 'cs-efcore-3',
      title: 'SaveChangesAsync',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Persist tracked changes to the database.',
      skeleton: `db.Products.Add(new Product { Name = "Gadget", Price = 19.99m });
await db.__BLANK__();`,
      solution: `db.Products.Add(new Product { Name = "Gadget", Price = 19.99m });
await db.SaveChangesAsync();`,
      hints: ['This method writes all tracked changes to the database.', 'It is async and returns Task<int>.', 'The answer is: SaveChangesAsync'],
      concepts: ['SaveChangesAsync', 'persistence', 'change tracking'],
    },
    {
      id: 'cs-efcore-4',
      title: 'FindAsync',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Find an entity by its primary key.',
      skeleton: `var product = await db.Products.__BLANK__(42);`,
      solution: `var product = await db.Products.FindAsync(42);`,
      hints: ['This method looks up an entity by primary key.', 'It checks the local cache before querying the database.', 'The answer is: FindAsync'],
      concepts: ['FindAsync', 'primary key lookup', 'local cache'],
    },
    {
      id: 'cs-efcore-5',
      title: 'Include Navigation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Eagerly load a navigation property.',
      skeleton: `var orders = await db.Orders
    .__BLANK__(o => o.Items)
    .ToListAsync();`,
      solution: `var orders = await db.Orders
    .Include(o => o.Items)
    .ToListAsync();`,
      hints: ['This method tells EF to load related entities.', 'Without it, navigation properties are null by default.', 'The answer is: Include'],
      concepts: ['Include', 'eager loading', 'navigation properties'],
    },
    {
      id: 'cs-efcore-6',
      title: 'HasIndex Fluent API',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Configure a unique index using Fluent API.',
      skeleton: `protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<User>()
        .__BLANK__(u => u.Email)
        .IsUnique();
}`,
      solution: `protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<User>()
        .HasIndex(u => u.Email)
        .IsUnique();
}`,
      hints: ['This Fluent API method creates a database index.', 'Chained with IsUnique() for uniqueness constraint.', 'The answer is: HasIndex'],
      concepts: ['HasIndex', 'Fluent API', 'unique constraint'],
    },
    {
      id: 'cs-efcore-7',
      title: 'Define Entity with Key',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Define a Product entity class with Id, Name, Price, and CreatedAt properties.',
      skeleton: `// Create class Product with:
// - int Id (primary key by convention)
// - string Name (required)
// - decimal Price
// - DateTime CreatedAt with default value of DateTime.UtcNow`,
      solution: `public class Product
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public decimal Price { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}`,
      hints: ['EF Core uses Id as the primary key by convention.', 'Use the required modifier for non-nullable strings.', 'Set the default in the property initializer.'],
      concepts: ['entity class', 'primary key convention', 'required modifier'],
    },
    {
      id: 'cs-efcore-8',
      title: 'One-to-Many Relationship',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Define a one-to-many relationship between Blog and Post entities.',
      skeleton: `// Create Blog with Id, Title, and List<Post> Posts
// Create Post with Id, Title, Content, BlogId (FK), and Blog navigation
// Use null-forgiving operator for required navigations`,
      solution: `public class Blog
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public List<Post> Posts { get; set; } = new();
}

public class Post
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public string Content { get; set; } = "";
    public int BlogId { get; set; }
    public Blog Blog { get; set; } = null!;
}`,
      hints: ['The foreign key is BlogId in Post.', 'Initialize the collection property to avoid null.', 'Use null! for required navigation properties.'],
      concepts: ['one-to-many', 'foreign key', 'navigation property'],
    },
    {
      id: 'cs-efcore-9',
      title: 'CRUD Operations',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write async methods for Create, Read, Update, and Delete operations on a Product entity.',
      skeleton: `// Given AppDbContext with DbSet<Product> Products
// Write a ProductService class with:
// Task<Product> CreateAsync(string name, decimal price)
// Task<Product?> GetByIdAsync(int id)
// Task UpdatePriceAsync(int id, decimal newPrice)
// Task DeleteAsync(int id)`,
      solution: `public class ProductService
{
    private readonly AppDbContext _db;

    public ProductService(AppDbContext db) => _db = db;

    public async Task<Product> CreateAsync(string name, decimal price)
    {
        var product = new Product { Name = name, Price = price };
        _db.Products.Add(product);
        await _db.SaveChangesAsync();
        return product;
    }

    public async Task<Product?> GetByIdAsync(int id)
    {
        return await _db.Products.FindAsync(id);
    }

    public async Task UpdatePriceAsync(int id, decimal newPrice)
    {
        var product = await _db.Products.FindAsync(id)
            ?? throw new KeyNotFoundException($"Product {id} not found");
        product.Price = newPrice;
        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var product = await _db.Products.FindAsync(id)
            ?? throw new KeyNotFoundException($"Product {id} not found");
        _db.Products.Remove(product);
        await _db.SaveChangesAsync();
    }
}`,
      hints: ['Use Add for create, FindAsync for read, modify properties for update, Remove for delete.', 'Always call SaveChangesAsync to persist changes.', 'Throw KeyNotFoundException when the entity is not found.'],
      concepts: ['CRUD', 'SaveChangesAsync', 'FindAsync', 'Remove'],
    },
    {
      id: 'cs-efcore-10',
      title: 'LINQ Query with EF',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write LINQ queries against EF Core DbSets.',
      skeleton: `// Write methods in a ProductQueryService:
// Task<List<Product>> GetExpensiveAsync(decimal minPrice)
// Task<List<Product>> SearchByNameAsync(string term)
// Task<decimal> GetAveragePriceAsync()
// Task<Product?> GetCheapestAsync()`,
      solution: `public class ProductQueryService
{
    private readonly AppDbContext _db;

    public ProductQueryService(AppDbContext db) => _db = db;

    public async Task<List<Product>> GetExpensiveAsync(decimal minPrice)
    {
        return await _db.Products
            .Where(p => p.Price >= minPrice)
            .OrderByDescending(p => p.Price)
            .ToListAsync();
    }

    public async Task<List<Product>> SearchByNameAsync(string term)
    {
        return await _db.Products
            .Where(p => p.Name.Contains(term))
            .ToListAsync();
    }

    public async Task<decimal> GetAveragePriceAsync()
    {
        return await _db.Products.AverageAsync(p => p.Price);
    }

    public async Task<Product?> GetCheapestAsync()
    {
        return await _db.Products
            .OrderBy(p => p.Price)
            .FirstOrDefaultAsync();
    }
}`,
      hints: ['Use Where for filtering, OrderBy for sorting.', 'ToListAsync materializes the query.', 'AverageAsync and FirstOrDefaultAsync are EF async LINQ extensions.'],
      concepts: ['LINQ queries', 'Where', 'OrderBy', 'ToListAsync'],
    },
    {
      id: 'cs-efcore-11',
      title: 'Fluent API Configuration',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Configure entity mappings using the Fluent API.',
      skeleton: `// Override OnModelCreating to configure Product:
// - Map to table "products"
// - Name: max length 200, required
// - Price: column type "decimal(18,2)"
// - Unique index on Name
// - CreatedAt: has default value of SQL GETUTCDATE()`,
      solution: `protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Product>(entity =>
    {
        entity.ToTable("products");

        entity.Property(p => p.Name)
            .HasMaxLength(200)
            .IsRequired();

        entity.Property(p => p.Price)
            .HasColumnType("decimal(18,2)");

        entity.HasIndex(p => p.Name)
            .IsUnique();

        entity.Property(p => p.CreatedAt)
            .HasDefaultValueSql("GETUTCDATE()");
    });
}`,
      hints: ['Use ToTable for custom table name.', 'HasMaxLength and IsRequired configure string columns.', 'HasDefaultValueSql sets a SQL-level default.'],
      concepts: ['Fluent API', 'ToTable', 'HasMaxLength', 'HasDefaultValueSql'],
    },
    {
      id: 'cs-efcore-12',
      title: 'Many-to-Many Relationship',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Configure a many-to-many relationship between Student and Course entities.',
      skeleton: `// Create Student with Id, Name, List<Course> Courses
// Create Course with Id, Title, List<Student> Students
// Configure the many-to-many in OnModelCreating with a join table "StudentCourses"`,
      solution: `public class Student
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public List<Course> Courses { get; set; } = new();
}

public class Course
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public List<Student> Students { get; set; } = new();
}

// In DbContext:
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Student>()
        .HasMany(s => s.Courses)
        .WithMany(c => c.Students)
        .UsingEntity(j => j.ToTable("StudentCourses"));
}`,
      hints: ['EF Core 5+ supports skip navigations for many-to-many.', 'Use HasMany().WithMany() for the relationship.', 'UsingEntity configures the join table.'],
      concepts: ['many-to-many', 'skip navigation', 'join table', 'UsingEntity'],
    },
    {
      id: 'cs-efcore-13',
      title: 'Missing SaveChanges',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the code that adds an entity but never saves it.',
      skeleton: `public async Task AddProductAsync(string name, decimal price)
{
    var product = new Product { Name = name, Price = price };
    _db.Products.Add(product);
    // Bug: changes are never persisted to the database
}`,
      solution: `public async Task AddProductAsync(string name, decimal price)
{
    var product = new Product { Name = name, Price = price };
    _db.Products.Add(product);
    await _db.SaveChangesAsync();
}`,
      hints: ['Add only stages the entity in the change tracker.', 'Changes must be explicitly persisted.', 'Call SaveChangesAsync after Add.'],
      concepts: ['SaveChangesAsync', 'change tracker', 'persistence'],
    },
    {
      id: 'cs-efcore-14',
      title: 'N+1 Query Problem',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the N+1 query problem by adding eager loading.',
      skeleton: `public async Task<List<Order>> GetOrdersWithItemsAsync()
{
    // Bug: Items are lazy-loaded, causing N+1 queries
    var orders = await _db.Orders.ToListAsync();
    foreach (var order in orders)
    {
        // Each iteration triggers a separate SQL query
        Console.WriteLine($"Order {order.Id}: {order.Items.Count} items");
    }
    return orders;
}`,
      solution: `public async Task<List<Order>> GetOrdersWithItemsAsync()
{
    var orders = await _db.Orders
        .Include(o => o.Items)
        .ToListAsync();
    foreach (var order in orders)
    {
        Console.WriteLine($"Order {order.Id}: {order.Items.Count} items");
    }
    return orders;
}`,
      hints: ['Use Include to load related entities in a single query.', 'Without Include, accessing Items triggers separate queries.', 'Add .Include(o => o.Items) before ToListAsync.'],
      concepts: ['N+1 problem', 'Include', 'eager loading'],
    },
    {
      id: 'cs-efcore-15',
      title: 'Tracking vs NoTracking',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the read-only query that unnecessarily uses change tracking.',
      skeleton: `public async Task<List<ProductDto>> GetProductListAsync()
{
    // Bug: tracking entities we never modify wastes memory
    return await _db.Products
        .Select(p => new ProductDto { Name = p.Name, Price = p.Price })
        .ToListAsync();
}`,
      solution: `public async Task<List<ProductDto>> GetProductListAsync()
{
    return await _db.Products
        .AsNoTracking()
        .Select(p => new ProductDto { Name = p.Name, Price = p.Price })
        .ToListAsync();
}`,
      hints: ['Read-only queries should not track entities.', 'Use AsNoTracking() for better performance.', 'Projections to DTOs do not need change tracking.'],
      concepts: ['AsNoTracking', 'change tracking', 'query performance'],
    },
    {
      id: 'cs-efcore-16',
      title: 'Predict Add Behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the entity state after Add but before SaveChanges.',
      skeleton: `var product = new Product { Name = "Test", Price = 5.00m };
Console.Write(db.Entry(product).State);
db.Products.Add(product);
Console.Write(" " + db.Entry(product).State);`,
      solution: `Detached Added`,
      hints: ['Before Add, the entity is not tracked.', 'After Add, it is marked for insertion.', 'Detached means not tracked; Added means pending insert.'],
      concepts: ['EntityState', 'Detached', 'Added', 'change tracker'],
    },
    {
      id: 'cs-efcore-17',
      title: 'Predict Modification State',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the entity state after modifying a tracked entity.',
      skeleton: `var product = await db.Products.FindAsync(1);
Console.Write(db.Entry(product!).State);
product!.Price = 99.99m;
Console.Write(" " + db.Entry(product).State);`,
      solution: `Unchanged Modified`,
      hints: ['FindAsync returns a tracked entity in Unchanged state.', 'Modifying a property changes the state to Modified.', 'EF Core detects property changes automatically.'],
      concepts: ['Unchanged', 'Modified', 'automatic change detection'],
    },
    {
      id: 'cs-efcore-18',
      title: 'Predict Remove State',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the entity state after calling Remove.',
      skeleton: `var product = await db.Products.FindAsync(1);
db.Products.Remove(product!);
Console.Write(db.Entry(product!).State);
await db.SaveChangesAsync();
Console.Write(" " + db.Entry(product!).State);`,
      solution: `Deleted Detached`,
      hints: ['Remove marks the entity for deletion.', 'After SaveChanges, the entity is no longer tracked.', 'Deleted -> Detached after successful save.'],
      concepts: ['Deleted', 'Detached', 'Remove', 'SaveChangesAsync'],
    },
    {
      id: 'cs-efcore-19',
      title: 'Refactor Raw SQL to LINQ',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor raw SQL queries to use LINQ with EF Core.',
      skeleton: `public async Task<List<Product>> GetActiveExpensiveProducts()
{
    return await _db.Products
        .FromSqlRaw("SELECT * FROM Products WHERE Price > 100 AND IsActive = 1 ORDER BY Price DESC")
        .ToListAsync();
}

public async Task<int> CountByCategory(string category)
{
    var result = await _db.Database
        .ExecuteSqlRawAsync($"SELECT COUNT(*) FROM Products WHERE Category = '{category}'");
    return result;
}`,
      solution: `public async Task<List<Product>> GetActiveExpensiveProducts()
{
    return await _db.Products
        .Where(p => p.Price > 100 && p.IsActive)
        .OrderByDescending(p => p.Price)
        .ToListAsync();
}

public async Task<int> CountByCategory(string category)
{
    return await _db.Products
        .CountAsync(p => p.Category == category);
}`,
      hints: ['Replace FromSqlRaw with LINQ Where and OrderByDescending.', 'Replace ExecuteSqlRawAsync with CountAsync.', 'LINQ is safer against SQL injection than raw SQL.'],
      concepts: ['LINQ vs raw SQL', 'SQL injection', 'CountAsync'],
    },
    {
      id: 'cs-efcore-20',
      title: 'Refactor to Repository Pattern',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor direct DbContext usage into a generic repository pattern.',
      skeleton: `public class OrderService
{
    private readonly AppDbContext _db;
    public OrderService(AppDbContext db) => _db = db;

    public async Task<Order?> GetOrder(int id) => await _db.Orders.FindAsync(id);
    public async Task<List<Order>> GetAll() => await _db.Orders.ToListAsync();
    public async Task Add(Order order) { _db.Orders.Add(order); await _db.SaveChangesAsync(); }
    public async Task Delete(int id) { var o = await _db.Orders.FindAsync(id); if (o != null) { _db.Orders.Remove(o); await _db.SaveChangesAsync(); } }
}`,
      solution: `public interface IRepository<T> where T : class
{
    Task<T?> GetByIdAsync(int id);
    Task<List<T>> GetAllAsync();
    Task AddAsync(T entity);
    Task DeleteAsync(int id);
}

public class Repository<T> : IRepository<T> where T : class
{
    private readonly AppDbContext _db;
    private readonly DbSet<T> _set;

    public Repository(AppDbContext db)
    {
        _db = db;
        _set = db.Set<T>();
    }

    public async Task<T?> GetByIdAsync(int id) => await _set.FindAsync(id);
    public async Task<List<T>> GetAllAsync() => await _set.ToListAsync();

    public async Task AddAsync(T entity)
    {
        _set.Add(entity);
        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await _set.FindAsync(id);
        if (entity != null)
        {
            _set.Remove(entity);
            await _db.SaveChangesAsync();
        }
    }
}

// Registration: services.AddScoped(typeof(IRepository<>), typeof(Repository<>));`,
      hints: ['Extract a generic IRepository<T> interface.', 'Use DbContext.Set<T>() to get the DbSet dynamically.', 'Register with open generics in DI.'],
      concepts: ['repository pattern', 'generic repository', 'open generics', 'DI registration'],
    },
  ],
};
