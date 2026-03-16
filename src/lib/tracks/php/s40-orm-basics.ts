import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-orm',
  title: '40. ORM Basics',
  explanation: `## ORM Basics in PHP

Object-Relational Mapping (ORM) maps database tables to PHP classes. The Active Record pattern embeds persistence logic in the model, while query builders provide fluent SQL construction.

### Active Record Pattern
\`\`\`php
<?php
class User {
    public ?int \\\$id = null;
    public string \\\$name;
    public string \\\$email;

    private static PDO \\\$pdo;

    public static function setPdo(PDO \\\$pdo): void {
        self::\\\$pdo = \\\$pdo;
    }

    public static function find(int \\\$id): ?self {
        \\\$stmt = self::\\\$pdo->prepare('SELECT * FROM users WHERE id = ?');
        \\\$stmt->execute([\\\$id]);
        \\\$stmt->setFetchMode(PDO::FETCH_CLASS, self::class);
        return \\\$stmt->fetch() ?: null;
    }

    public function save(): void {
        if (\\\$this->id) {
            \\\$stmt = self::\\\$pdo->prepare('UPDATE users SET name=?, email=? WHERE id=?');
            \\\$stmt->execute([\\\$this->name, \\\$this->email, \\\$this->id]);
        } else {
            \\\$stmt = self::\\\$pdo->prepare('INSERT INTO users (name, email) VALUES (?, ?)');
            \\\$stmt->execute([\\\$this->name, \\\$this->email]);
            \\\$this->id = (int) self::\\\$pdo->lastInsertId();
        }
    }
}
\`\`\`

### Query Builder
\`\`\`php
<?php
\\\$users = \\\$db->table('users')
    ->where('active', true)
    ->orderBy('name')
    ->limit(10)
    ->get();
\`\`\`

### Relationships
\`\`\`php
<?php
class Post {
    public function author(): User {
        return User::find(\\\$this->user_id);
    }

    public function comments(): array {
        return Comment::where('post_id', \\\$this->id);
    }
}
\`\`\`

### Migrations Concept
\`\`\`php
<?php
class CreateUsersTable {
    public function up(PDO \\\$pdo): void {
        \\\$pdo->exec('CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )');
    }

    public function down(PDO \\\$pdo): void {
        \\\$pdo->exec('DROP TABLE IF EXISTS users');
    }
}
\`\`\``,
  exercises: [
    {
      id: 'php-orm-1',
      title: 'Fetch Single Record',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to fetch a single user record by ID using PDO.',
      skeleton: `<?php
\\\$stmt = \\\$pdo->prepare('SELECT * FROM users WHERE id = ?');
\\\$stmt->execute([\\\$id]);
\\\$user = \\\$stmt->___();`,
      solution: `<?php
\\\$stmt = \\\$pdo->prepare('SELECT * FROM users WHERE id = ?');
\\\$stmt->execute([\\\$id]);
\\\$user = \\\$stmt->fetch();`,
      hints: [
        'Use the method that returns a single row',
        'fetch() returns one row, fetchAll() returns all',
        'Returns false if no row found',
      ],
      concepts: ['PDO', 'fetch'],
    },
    {
      id: 'php-orm-2',
      title: 'Fetch as Class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to fetch the result as a User object.',
      skeleton: `<?php
\\\$stmt = \\\$pdo->prepare('SELECT * FROM users WHERE id = ?');
\\\$stmt->execute([\\\$id]);
\\\$stmt->setFetchMode(PDO::___, User::class);
\\\$user = \\\$stmt->fetch();`,
      solution: `<?php
\\\$stmt = \\\$pdo->prepare('SELECT * FROM users WHERE id = ?');
\\\$stmt->execute([\\\$id]);
\\\$stmt->setFetchMode(PDO::FETCH_CLASS, User::class);
\\\$user = \\\$stmt->fetch();`,
      hints: [
        'PDO can fetch directly into class instances',
        'Use the FETCH_CLASS fetch mode',
        'Column names map to property names',
      ],
      concepts: ['PDO', 'FETCH_CLASS'],
    },
    {
      id: 'php-orm-3',
      title: 'Last Insert ID',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to get the ID of the just-inserted row.',
      skeleton: `<?php
\\\$stmt = \\\$pdo->prepare('INSERT INTO users (name, email) VALUES (?, ?)');
\\\$stmt->execute(['Alice', 'alice@example.com']);
\\\$newId = (int) \\\$pdo->___();`,
      solution: `<?php
\\\$stmt = \\\$pdo->prepare('INSERT INTO users (name, email) VALUES (?, ?)');
\\\$stmt->execute(['Alice', 'alice@example.com']);
\\\$newId = (int) \\\$pdo->lastInsertId();`,
      hints: [
        'After INSERT, you can get the generated ID',
        'PDO has a method that returns the last auto-increment ID',
        'Use lastInsertId()',
      ],
      concepts: ['PDO', 'lastInsertId'],
    },
    {
      id: 'php-orm-4',
      title: 'Named Parameters',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to use named parameters in a prepared statement.',
      skeleton: `<?php
\\\$stmt = \\\$pdo->prepare('SELECT * FROM users WHERE name = ___ AND active = ___');
\\\$stmt->execute(['name' => 'Alice', 'active' => 1]);`,
      solution: `<?php
\\\$stmt = \\\$pdo->prepare('SELECT * FROM users WHERE name = :name AND active = :active');
\\\$stmt->execute(['name' => 'Alice', 'active' => 1]);`,
      hints: [
        'Named parameters use colon prefix in SQL',
        ':name and :active are the placeholders',
        'Execute array keys match without the colon',
      ],
      concepts: ['PDO', 'named-parameters'],
    },
    {
      id: 'php-orm-5',
      title: 'Fetch All Results',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to fetch all matching rows as associative arrays.',
      skeleton: `<?php
\\\$stmt = \\\$pdo->prepare('SELECT * FROM users WHERE active = ?');
\\\$stmt->execute([1]);
\\\$users = \\\$stmt->___(PDO::FETCH_ASSOC);`,
      solution: `<?php
\\\$stmt = \\\$pdo->prepare('SELECT * FROM users WHERE active = ?');
\\\$stmt->execute([1]);
\\\$users = \\\$stmt->fetchAll(PDO::FETCH_ASSOC);`,
      hints: [
        'You want all matching rows, not just one',
        'fetchAll returns an array of all result rows',
        'FETCH_ASSOC returns associative arrays',
      ],
      concepts: ['PDO', 'fetchAll'],
    },
    {
      id: 'php-orm-6',
      title: 'Transaction Wrapper',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to wrap operations in a database transaction.',
      skeleton: `<?php
\\\$pdo->___();
try {
    \\\$pdo->exec("UPDATE accounts SET balance = balance - 100 WHERE id = 1");
    \\\$pdo->exec("UPDATE accounts SET balance = balance + 100 WHERE id = 2");
    \\\$pdo->___();
} catch (Exception \\\$e) {
    \\\$pdo->___();
    throw \\\$e;
}`,
      solution: `<?php
\\\$pdo->beginTransaction();
try {
    \\\$pdo->exec("UPDATE accounts SET balance = balance - 100 WHERE id = 1");
    \\\$pdo->exec("UPDATE accounts SET balance = balance + 100 WHERE id = 2");
    \\\$pdo->commit();
} catch (Exception \\\$e) {
    \\\$pdo->rollBack();
    throw \\\$e;
}`,
      hints: [
        'Start a transaction with beginTransaction()',
        'Commit on success with commit()',
        'Rollback on failure with rollBack()',
      ],
      concepts: ['transactions', 'PDO'],
    },
    {
      id: 'php-orm-7',
      title: 'Build Active Record Model',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a simple Model base class with find(id), all(), save(), and delete() methods using Active Record pattern.',
      skeleton: `<?php
abstract class Model {
    protected static PDO \\\$pdo;
    protected static string \\\$table;
    public ?int \\\$id = null;

    // setPdo, find, all, save, delete
}`,
      solution: `<?php
abstract class Model {
    protected static PDO \\\$pdo;
    protected static string \\\$table;
    public ?int \\\$id = null;

    public static function setPdo(PDO \\\$pdo): void {
        static::\\\$pdo = \\\$pdo;
    }

    public static function find(int \\\$id): ?static {
        \\\$stmt = static::\\\$pdo->prepare('SELECT * FROM ' . static::\\\$table . ' WHERE id = ?');
        \\\$stmt->execute([\\\$id]);
        \\\$stmt->setFetchMode(PDO::FETCH_CLASS, static::class);
        return \\\$stmt->fetch() ?: null;
    }

    public static function all(): array {
        \\\$stmt = static::\\\$pdo->query('SELECT * FROM ' . static::\\\$table);
        return \\\$stmt->fetchAll(PDO::FETCH_CLASS, static::class);
    }

    public function save(): void {
        \\\$props = get_object_vars(\\\$this);
        unset(\\\$props['id']);
        \\\$cols = array_keys(\\\$props);
        if (\\\$this->id) {
            \\\$set = implode(', ', array_map(fn(\\\$c) => "\\\$c = ?", \\\$cols));
            \\\$stmt = static::\\\$pdo->prepare('UPDATE ' . static::\\\$table . " SET \\\$set WHERE id = ?");
            \\\$stmt->execute([...array_values(\\\$props), \\\$this->id]);
        } else {
            \\\$colStr = implode(', ', \\\$cols);
            \\\$placeholders = implode(', ', array_fill(0, count(\\\$cols), '?'));
            \\\$stmt = static::\\\$pdo->prepare('INSERT INTO ' . static::\\\$table . " (\\\$colStr) VALUES (\\\$placeholders)");
            \\\$stmt->execute(array_values(\\\$props));
            \\\$this->id = (int) static::\\\$pdo->lastInsertId();
        }
    }

    public function delete(): void {
        if (\\\$this->id) {
            \\\$stmt = static::\\\$pdo->prepare('DELETE FROM ' . static::\\\$table . ' WHERE id = ?');
            \\\$stmt->execute([\\\$this->id]);
        }
    }
}`,
      hints: [
        'Use static:: for late static binding in the base class',
        'get_object_vars gets the model properties for save',
        'INSERT for new records, UPDATE for existing ones',
      ],
      concepts: ['active-record', 'ORM', 'PDO'],
    },
    {
      id: 'php-orm-8',
      title: 'Simple Query Builder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a QueryBuilder class with select(), from(), where(), orderBy(), and build() methods that constructs a SQL string.',
      skeleton: `<?php
class QueryBuilder {
    // select(string ...\\\$columns): self
    // from(string \\\$table): self
    // where(string \\\$condition): self
    // orderBy(string \\\$column, string \\\$direction = 'ASC'): self
    // build(): string
}`,
      solution: `<?php
class QueryBuilder {
    private array \\\$columns = ['*'];
    private string \\\$table = '';
    private array \\\$conditions = [];
    private string \\\$order = '';

    public function select(string ...\\\$columns): self {
        \\\$this->columns = \\\$columns;
        return \\\$this;
    }

    public function from(string \\\$table): self {
        \\\$this->table = \\\$table;
        return \\\$this;
    }

    public function where(string \\\$condition): self {
        \\\$this->conditions[] = \\\$condition;
        return \\\$this;
    }

    public function orderBy(string \\\$column, string \\\$direction = 'ASC'): self {
        \\\$this->order = "\\\$column \\\$direction";
        return \\\$this;
    }

    public function build(): string {
        \\\$sql = 'SELECT ' . implode(', ', \\\$this->columns);
        \\\$sql .= ' FROM ' . \\\$this->table;
        if (\\\$this->conditions) {
            \\\$sql .= ' WHERE ' . implode(' AND ', \\\$this->conditions);
        }
        if (\\\$this->order) {
            \\\$sql .= ' ORDER BY ' . \\\$this->order;
        }
        return \\\$sql;
    }
}`,
      hints: [
        'Each method stores its part and returns \$this',
        'build() assembles the SQL string from parts',
        'Use implode to join columns and conditions',
      ],
      concepts: ['query-builder', 'fluent-interface'],
    },
    {
      id: 'php-orm-9',
      title: 'Migration Runner',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a MigrationRunner that tracks applied migrations and runs pending ones in order.',
      skeleton: `<?php
interface Migration {
    public function up(PDO \\\$pdo): void;
    public function down(PDO \\\$pdo): void;
}

class MigrationRunner {
    // addMigration(string \\\$name, Migration \\\$migration): void
    // migrate(PDO \\\$pdo): array of applied migration names
    // Track applied migrations in a migrations table
}`,
      solution: `<?php
interface Migration {
    public function up(PDO \\\$pdo): void;
    public function down(PDO \\\$pdo): void;
}

class MigrationRunner {
    private array \\\$migrations = [];

    public function addMigration(string \\\$name, Migration \\\$migration): void {
        \\\$this->migrations[\\\$name] = \\\$migration;
    }

    public function migrate(PDO \\\$pdo): array {
        \\\$pdo->exec('CREATE TABLE IF NOT EXISTS migrations (name VARCHAR(255) PRIMARY KEY)');
        \\\$applied = \\\$pdo->query('SELECT name FROM migrations')->fetchAll(PDO::FETCH_COLUMN);
        \\\$ran = [];
        foreach (\\\$this->migrations as \\\$name => \\\$migration) {
            if (!in_array(\\\$name, \\\$applied, true)) {
                \\\$migration->up(\\\$pdo);
                \\\$stmt = \\\$pdo->prepare('INSERT INTO migrations (name) VALUES (?)');
                \\\$stmt->execute([\\\$name]);
                \\\$ran[] = \\\$name;
            }
        }
        return \\\$ran;
    }
}`,
      hints: [
        'Create a migrations tracking table if it does not exist',
        'Check which migrations have already been applied',
        'Run only pending migrations and record them',
      ],
      concepts: ['migrations', 'schema-management'],
    },
    {
      id: 'php-orm-10',
      title: 'Model Relationship: BelongsTo',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a Post model with a belongsTo relationship to User. The author() method returns the associated User.',
      skeleton: `<?php
class Post extends Model {
    protected static string \\\$table = 'posts';
    public int \\\$user_id;
    public string \\\$title;

    // author(): ?User - belongsTo relationship
}`,
      solution: `<?php
class Post extends Model {
    protected static string \\\$table = 'posts';
    public int \\\$user_id;
    public string \\\$title;

    public function author(): ?User {
        return User::find(\\\$this->user_id);
    }
}`,
      hints: [
        'BelongsTo uses the foreign key to look up the parent',
        'The foreign key is user_id on the posts table',
        'Call User::find with the foreign key value',
      ],
      concepts: ['relationships', 'belongsTo', 'active-record'],
    },
    {
      id: 'php-orm-11',
      title: 'Model Relationship: HasMany',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a User model with a hasMany relationship to Post. The posts() method returns all posts by this user.',
      skeleton: `<?php
class User extends Model {
    protected static string \\\$table = 'users';
    public string \\\$name;

    // posts(): array - hasMany relationship
}`,
      solution: `<?php
class User extends Model {
    protected static string \\\$table = 'users';
    public string \\\$name;

    public function posts(): array {
        \\\$stmt = static::\\\$pdo->prepare('SELECT * FROM posts WHERE user_id = ?');
        \\\$stmt->execute([\\\$this->id]);
        return \\\$stmt->fetchAll(PDO::FETCH_CLASS, Post::class);
    }
}`,
      hints: [
        'HasMany queries the related table with the foreign key',
        'Query posts WHERE user_id = this ID',
        'Return all matching records as Post objects',
      ],
      concepts: ['relationships', 'hasMany', 'active-record'],
    },
    {
      id: 'php-orm-12',
      title: 'Query Builder with Parameters',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Extend the QueryBuilder to support parameterized where clauses. where(column, value) adds a condition and tracks the parameter. getParams() returns the parameter array.',
      skeleton: `<?php
class SafeQueryBuilder {
    // where(string \\\$column, mixed \\\$value): self
    // build(): string (with ? placeholders)
    // getParams(): array
}`,
      solution: `<?php
class SafeQueryBuilder {
    private string \\\$table = '';
    private array \\\$conditions = [];
    private array \\\$params = [];

    public function from(string \\\$table): self {
        \\\$this->table = \\\$table;
        return \\\$this;
    }

    public function where(string \\\$column, mixed \\\$value): self {
        \\\$this->conditions[] = "\\\$column = ?";
        \\\$this->params[] = \\\$value;
        return \\\$this;
    }

    public function build(): string {
        \\\$sql = "SELECT * FROM \\\$this->table";
        if (\\\$this->conditions) {
            \\\$sql .= ' WHERE ' . implode(' AND ', \\\$this->conditions);
        }
        return \\\$sql;
    }

    public function getParams(): array {
        return \\\$this->params;
    }
}`,
      hints: [
        'Store parameter values separately from the SQL',
        'Use ? placeholders in the generated SQL',
        'getParams returns values to pass to execute()',
      ],
      concepts: ['query-builder', 'prepared-statements', 'security'],
    },
    {
      id: 'php-orm-13',
      title: 'Fix N+1 Query Problem',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Fix the code that makes N+1 database queries by loading related data eagerly.',
      skeleton: `<?php
// Bug: N+1 queries - one query per post for the author
\\\$posts = Post::all(); // 1 query
foreach (\\\$posts as \\\$post) {
    \\\$author = User::find(\\\$post->user_id); // N queries!
    echo "\\\$post->title by \\\$author->name\\n";
}`,
      solution: `<?php
// Fixed: 2 queries total using eager loading
\\\$posts = Post::all();
\\\$userIds = array_unique(array_column(\\\$posts, 'user_id'));
\\\$placeholders = implode(',', array_fill(0, count(\\\$userIds), '?'));
\\\$stmt = \\\$pdo->prepare("SELECT * FROM users WHERE id IN (\\\$placeholders)");
\\\$stmt->execute(\\\$userIds);
\\\$users = [];
foreach (\\\$stmt->fetchAll(PDO::FETCH_CLASS, User::class) as \\\$user) {
    \\\$users[\\\$user->id] = \\\$user;
}
foreach (\\\$posts as \\\$post) {
    \\\$author = \\\$users[\\\$post->user_id];
    echo "\\\$post->title by \\\$author->name\\n";
}`,
      hints: [
        'Collect all needed user IDs first',
        'Load all users in a single IN query',
        'Index users by ID for O(1) lookup',
      ],
      concepts: ['N+1-problem', 'eager-loading', 'optimization'],
    },
    {
      id: 'php-orm-14',
      title: 'Fix Missing Table Name',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the model that fails because it does not define its table name.',
      skeleton: `<?php
class Product extends Model {
    // Bug: missing \\\$table definition
    public string \\\$name;
    public float \\\$price;
}

// Product::all() fails with SQL error
\\\$products = Product::all();`,
      solution: `<?php
class Product extends Model {
    protected static string \\\$table = 'products';
    public string \\\$name;
    public float \\\$price;
}

\\\$products = Product::all();`,
      hints: [
        'The base Model uses static::\$table for SQL queries',
        'Each model must define its own table name',
        'Add the protected static \$table property',
      ],
      concepts: ['active-record', 'configuration', 'debugging'],
    },
    {
      id: 'php-orm-15',
      title: 'Fix Save Creating Duplicates',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the save method that always inserts instead of updating existing records.',
      skeleton: `<?php
class User extends Model {
    protected static string \\\$table = 'users';
    public string \\\$name;

    public function save(): void {
        // Bug: always inserts, never updates
        \\\$stmt = static::\\\$pdo->prepare('INSERT INTO users (name) VALUES (?)');
        \\\$stmt->execute([\\\$this->name]);
        \\\$this->id = (int) static::\\\$pdo->lastInsertId();
    }
}`,
      solution: `<?php
class User extends Model {
    protected static string \\\$table = 'users';
    public string \\\$name;

    public function save(): void {
        if (\\\$this->id) {
            \\\$stmt = static::\\\$pdo->prepare('UPDATE users SET name = ? WHERE id = ?');
            \\\$stmt->execute([\\\$this->name, \\\$this->id]);
        } else {
            \\\$stmt = static::\\\$pdo->prepare('INSERT INTO users (name) VALUES (?)');
            \\\$stmt->execute([\\\$this->name]);
            \\\$this->id = (int) static::\\\$pdo->lastInsertId();
        }
    }
}`,
      hints: [
        'Check if the model already has an ID',
        'If ID exists, UPDATE the existing row',
        'If no ID, INSERT a new row',
      ],
      concepts: ['active-record', 'insert-vs-update', 'debugging'],
    },
    {
      id: 'php-orm-16',
      title: 'Predict Query Builder Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the SQL string built by the query builder.',
      skeleton: `<?php
\\\$qb = new QueryBuilder();
echo \\\$qb->select('name', 'email')
    ->from('users')
    ->where('active = 1')
    ->orderBy('name')
    ->build();`,
      solution: `SELECT name, email FROM users WHERE active = 1 ORDER BY name ASC`,
      hints: [
        'select() sets the column list',
        'from() sets the table',
        'where() and orderBy() add their clauses',
      ],
      concepts: ['query-builder', 'SQL-generation'],
    },
    {
      id: 'php-orm-17',
      title: 'Predict Active Record Save',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict whether save() does INSERT or UPDATE.',
      skeleton: `<?php
\\\$user = new User();
\\\$user->name = 'Alice';
\\\$user->save(); // What SQL? INSERT or UPDATE?
echo \\\$user->id ? 'has id' : 'no id';
\\\$user->name = 'Bob';
\\\$user->save(); // What SQL now?
echo ' then update';`,
      solution: `has id then update`,
      hints: [
        'First save: no ID, so INSERT runs, ID gets set',
        'After insert, the user has an ID',
        'Second save: has ID, so UPDATE runs',
      ],
      concepts: ['active-record', 'insert-vs-update'],
    },
    {
      id: 'php-orm-18',
      title: 'Predict Fetch Mode Difference',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the type of result from different fetch modes.',
      skeleton: `<?php
// FETCH_ASSOC returns: associative array
// FETCH_OBJ returns: stdClass object
// FETCH_CLASS returns: instance of specified class

\\\$stmt->setFetchMode(PDO::FETCH_ASSOC);
\\\$row = \\\$stmt->fetch();
echo gettype(\\\$row);`,
      solution: `array`,
      hints: [
        'FETCH_ASSOC returns an array',
        'The result is an associative array',
        'gettype() of an array returns "array"',
      ],
      concepts: ['PDO', 'fetch-modes'],
    },
    {
      id: 'php-orm-19',
      title: 'Refactor Raw SQL to Query Builder',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the raw SQL strings into a fluent query builder.',
      skeleton: `<?php
\\\$sql1 = "SELECT name, email FROM users WHERE active = 1 ORDER BY name";
\\\$sql2 = "SELECT title, body FROM posts WHERE user_id = 5 AND published = 1";
\\\$sql3 = "SELECT * FROM comments WHERE post_id = 10";`,
      solution: `<?php
\\\$query1 = (new QueryBuilder())
    ->select('name', 'email')
    ->from('users')
    ->where('active = 1')
    ->orderBy('name')
    ->build();

\\\$query2 = (new QueryBuilder())
    ->select('title', 'body')
    ->from('posts')
    ->where('user_id = 5')
    ->where('published = 1')
    ->build();

\\\$query3 = (new QueryBuilder())
    ->from('comments')
    ->where('post_id = 10')
    ->build();`,
      hints: [
        'Use method chaining for a fluent interface',
        'Multiple where() calls for AND conditions',
        'Select defaults to * if not specified',
      ],
      concepts: ['query-builder', 'refactoring', 'fluent-interface'],
    },
    {
      id: 'php-orm-20',
      title: 'Refactor Procedural to Active Record',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the procedural database code into an Active Record model.',
      skeleton: `<?php
// Create
\\\$stmt = \\\$pdo->prepare('INSERT INTO products (name, price) VALUES (?, ?)');
\\\$stmt->execute(['Widget', 9.99]);
\\\$id = \\\$pdo->lastInsertId();

// Read
\\\$stmt = \\\$pdo->prepare('SELECT * FROM products WHERE id = ?');
\\\$stmt->execute([\\\$id]);
\\\$product = \\\$stmt->fetch(PDO::FETCH_ASSOC);

// Update
\\\$stmt = \\\$pdo->prepare('UPDATE products SET price = ? WHERE id = ?');
\\\$stmt->execute([12.99, \\\$id]);

// Delete
\\\$stmt = \\\$pdo->prepare('DELETE FROM products WHERE id = ?');
\\\$stmt->execute([\\\$id]);`,
      solution: `<?php
class Product extends Model {
    protected static string \\\$table = 'products';
    public string \\\$name;
    public float \\\$price;
}

Product::setPdo(\\\$pdo);

// Create
\\\$product = new Product();
\\\$product->name = 'Widget';
\\\$product->price = 9.99;
\\\$product->save();

// Read
\\\$product = Product::find(\\\$product->id);

// Update
\\\$product->price = 12.99;
\\\$product->save();

// Delete
\\\$product->delete();`,
      hints: [
        'Encapsulate CRUD operations in the model class',
        'save() handles both INSERT and UPDATE',
        'find() and delete() are standard Active Record methods',
      ],
      concepts: ['active-record', 'refactoring', 'OOP'],
    },
  ],
};
