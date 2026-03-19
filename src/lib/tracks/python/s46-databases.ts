import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-databases',
  title: '46. Databases',
  explanation: `## Databases

Python's \`sqlite3\` module provides a built-in relational database -- no installation required.

### Connecting
\`\`\`python
import sqlite3

conn = sqlite3.connect("mydb.sqlite")  # File-based
conn = sqlite3.connect(":memory:")      # In-memory
cursor = conn.cursor()
\`\`\`

### Basic Operations (CRUD)
\`\`\`python
# Create
cursor.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)")

# Insert
cursor.execute("INSERT INTO users (name, age) VALUES (?, ?)", ("Alice", 30))

# Read
cursor.execute("SELECT * FROM users WHERE age > ?", (25,))
rows = cursor.fetchall()

# Update
cursor.execute("UPDATE users SET age = ? WHERE name = ?", (31, "Alice"))

# Delete
cursor.execute("DELETE FROM users WHERE name = ?", ("Alice",))

conn.commit()
\`\`\`

### Parameterized Queries
ALWAYS use \`?\` placeholders -- NEVER string formatting:
\`\`\`python
# GOOD -- safe from SQL injection
cursor.execute("SELECT * FROM users WHERE name = ?", (name,))

# BAD -- vulnerable to SQL injection
cursor.execute(f"SELECT * FROM users WHERE name = '{name}'")
\`\`\`

### Transactions
- \`conn.commit()\` -- save changes
- \`conn.rollback()\` -- undo changes since last commit
- Use connection as context manager for auto-commit/rollback

### Row Factory
\`\`\`python
conn.row_factory = sqlite3.Row
cursor = conn.cursor()
cursor.execute("SELECT * FROM users")
row = cursor.fetchone()
print(row["name"])  # Access by column name
\`\`\`

### ORM Concepts
ORMs (Object-Relational Mappers) map Python classes to database tables. Popular choices: SQLAlchemy, Django ORM, Peewee.
`,
  exercises: [
    {
      id: 'py-db-1',
      title: 'Connect to database',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create an in-memory SQLite database connection.',
      skeleton: `import sqlite3

conn = sqlite3.__BLANK__(":memory:")
print(type(conn))
conn.close()`,
      solution: `import sqlite3

conn = sqlite3.connect(":memory:")
print(type(conn))
conn.close()`,
      hints: [
        'sqlite3 has a function to establish a database connection.',
        '":memory:" creates an in-memory database (no file).',
        'The answer is: connect',
      ],
      concepts: ['sqlite3', 'connect', 'in-memory database'],
    },
    {
      id: 'py-db-2',
      title: 'Create a table',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a table using SQL.',
      skeleton: `import sqlite3

conn = sqlite3.connect(":memory:")
cursor = conn.cursor()
cursor.__BLANK__("CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL)")
conn.commit()

cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
print(cursor.fetchone()[0])
conn.close()`,
      solution: `import sqlite3

conn = sqlite3.connect(":memory:")
cursor = conn.cursor()
cursor.execute("CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL)")
conn.commit()

cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
print(cursor.fetchone()[0])
conn.close()`,
      hints: [
        'The cursor method that runs SQL statements.',
        'It takes a SQL string as its argument.',
        'The answer is: execute',
      ],
      concepts: ['execute', 'CREATE TABLE', 'cursor'],
    },
    {
      id: 'py-db-3',
      title: 'Insert with parameters',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Insert data safely using parameterized queries.',
      skeleton: `import sqlite3

conn = sqlite3.connect(":memory:")
cursor = conn.cursor()
cursor.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)")

cursor.execute("INSERT INTO users (name, age) VALUES (__BLANK__, __BLANK__)", ("Alice", 30))
conn.commit()

cursor.execute("SELECT * FROM users")
print(cursor.fetchone())
conn.close()`,
      solution: `import sqlite3

conn = sqlite3.connect(":memory:")
cursor = conn.cursor()
cursor.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)")

cursor.execute("INSERT INTO users (name, age) VALUES (?, ?)", ("Alice", 30))
conn.commit()

cursor.execute("SELECT * FROM users")
print(cursor.fetchone())
conn.close()`,
      hints: [
        'Parameterized queries use placeholder characters.',
        'SQLite uses question marks as placeholders.',
        'The answer is: ? and ?',
      ],
      concepts: ['parameterized query', 'INSERT', 'SQL injection prevention'],
    },
    {
      id: 'py-db-4',
      title: 'Write insert function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function that inserts a record into a database.',
      skeleton: `import sqlite3

# Write a function 'add_user' that:
# 1. Takes a connection, name (str), and age (int)
# 2. Inserts a row into the 'users' table using parameterized query
# 3. Commits the transaction
# 4. Returns the lastrowid of the inserted row

def add_user(conn, name, age):
    pass`,
      solution: `import sqlite3

def add_user(conn, name, age):
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (name, age) VALUES (?, ?)", (name, age))
    conn.commit()
    return cursor.lastrowid`,
      hints: [
        'Get a cursor, execute INSERT with ? placeholders, commit.',
        'cursor.lastrowid gives the ID of the last inserted row.',
        'Always use parameterized queries with (?, ?) and a tuple.',
      ],
      concepts: ['INSERT', 'lastrowid', 'parameterized query'],
    },
    {
      id: 'py-db-5',
      title: 'Predict query results',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Predict the output of database queries.',
      skeleton: `import sqlite3

conn = sqlite3.connect(":memory:")
c = conn.cursor()
c.execute("CREATE TABLE nums (val INTEGER)")
c.executemany("INSERT INTO nums (val) VALUES (?)", [(1,), (2,), (3,), (4,), (5,)])
conn.commit()

c.execute("SELECT val FROM nums WHERE val > 3 ORDER BY val")
print(c.fetchall())`,
      solution: `[(4,), (5,)]`,
      hints: [
        'Five rows are inserted: 1, 2, 3, 4, 5.',
        'WHERE val > 3 filters to 4 and 5.',
        'fetchall() returns a list of tuples: [(4,), (5,)].',
      ],
      concepts: ['SELECT', 'WHERE', 'fetchall'],
    },
    {
      id: 'py-db-6',
      title: 'Fix SQL injection',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the SQL injection vulnerability.',
      skeleton: `import sqlite3

def find_user(conn, name):
    cursor = conn.cursor()
    # Bug: SQL injection vulnerability!
    cursor.execute(f"SELECT * FROM users WHERE name = '{name}'")
    return cursor.fetchone()`,
      solution: `import sqlite3

def find_user(conn, name):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE name = ?", (name,))
    return cursor.fetchone()`,
      hints: [
        'String formatting in SQL queries allows SQL injection attacks.',
        'An attacker could pass name = "\\"; DROP TABLE users; --"',
        'Use ? placeholder and pass name as a tuple: (name,)',
      ],
      concepts: ['SQL injection', 'parameterized query', 'security'],
    },
    {
      id: 'py-db-7',
      title: 'Row factory',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use sqlite3.Row to access columns by name.',
      skeleton: `import sqlite3

conn = sqlite3.connect(":memory:")
conn.row_factory = sqlite3.__BLANK__
cursor = conn.cursor()

cursor.execute("CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT, qty INTEGER)")
cursor.execute("INSERT INTO items (name, qty) VALUES (?, ?)", ("Widget", 50))
conn.commit()

cursor.execute("SELECT * FROM items")
row = cursor.fetchone()
print(row["name"])
print(row["qty"])
conn.close()`,
      solution: `import sqlite3

conn = sqlite3.connect(":memory:")
conn.row_factory = sqlite3.Row
cursor = conn.cursor()

cursor.execute("CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT, qty INTEGER)")
cursor.execute("INSERT INTO items (name, qty) VALUES (?, ?)", ("Widget", 50))
conn.commit()

cursor.execute("SELECT * FROM items")
row = cursor.fetchone()
print(row["name"])
print(row["qty"])
conn.close()`,
      hints: [
        'sqlite3 provides a row factory that enables column name access.',
        'It returns Row objects instead of plain tuples.',
        'The answer is: Row',
      ],
      concepts: ['Row', 'row_factory', 'column names'],
    },
    {
      id: 'py-db-8',
      title: 'Write CRUD functions',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a complete set of CRUD functions for a table.',
      skeleton: `import sqlite3

# Write these functions for a 'tasks' table (id, title, done):
# 1. create_task(conn, title) -- insert with done=False, return id
# 2. get_task(conn, task_id) -- return the row as a tuple
# 3. complete_task(conn, task_id) -- set done=True
# 4. delete_task(conn, task_id) -- delete the row

def create_task(conn, title):
    pass

def get_task(conn, task_id):
    pass

def complete_task(conn, task_id):
    pass

def delete_task(conn, task_id):
    pass`,
      solution: `import sqlite3

def create_task(conn, title):
    cursor = conn.cursor()
    cursor.execute("INSERT INTO tasks (title, done) VALUES (?, ?)", (title, False))
    conn.commit()
    return cursor.lastrowid

def get_task(conn, task_id):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tasks WHERE id = ?", (task_id,))
    return cursor.fetchone()

def complete_task(conn, task_id):
    cursor = conn.cursor()
    cursor.execute("UPDATE tasks SET done = ? WHERE id = ?", (True, task_id))
    conn.commit()

def delete_task(conn, task_id):
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    conn.commit()`,
      hints: [
        'Each function gets a cursor, executes parameterized SQL, commits if modifying.',
        'Use INSERT, SELECT, UPDATE, DELETE for the four operations.',
        'Always pass parameters as tuples -- even single values: (task_id,)',
      ],
      concepts: ['CRUD', 'INSERT', 'SELECT', 'UPDATE', 'DELETE'],
    },
    {
      id: 'py-db-9',
      title: 'executemany for bulk insert',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use executemany to insert multiple rows efficiently.',
      skeleton: `import sqlite3

conn = sqlite3.connect(":memory:")
cursor = conn.cursor()
cursor.execute("CREATE TABLE scores (name TEXT, score INTEGER)")

data = [("Alice", 95), ("Bob", 87), ("Charlie", 92)]
cursor.__BLANK__("INSERT INTO scores (name, score) VALUES (?, ?)", data)
conn.commit()

cursor.execute("SELECT COUNT(*) FROM scores")
print(cursor.fetchone()[0])
conn.close()`,
      solution: `import sqlite3

conn = sqlite3.connect(":memory:")
cursor = conn.cursor()
cursor.execute("CREATE TABLE scores (name TEXT, score INTEGER)")

data = [("Alice", 95), ("Bob", 87), ("Charlie", 92)]
cursor.executemany("INSERT INTO scores (name, score) VALUES (?, ?)", data)
conn.commit()

cursor.execute("SELECT COUNT(*) FROM scores")
print(cursor.fetchone()[0])
conn.close()`,
      hints: [
        'There is a cursor method that executes the same SQL for multiple parameter sets.',
        'It takes a SQL string and an iterable of parameter tuples.',
        'The answer is: executemany',
      ],
      concepts: ['executemany', 'bulk insert'],
    },
    {
      id: 'py-db-10',
      title: 'Fix missing commit',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the database operation that does not persist.',
      skeleton: `import sqlite3

conn = sqlite3.connect(":memory:")
cursor = conn.cursor()
cursor.execute("CREATE TABLE notes (id INTEGER PRIMARY KEY, text TEXT)")
cursor.execute("INSERT INTO notes (text) VALUES (?)", ("Important note",))
# Bug: forgot to commit!

cursor.execute("SELECT COUNT(*) FROM notes")
print(cursor.fetchone()[0])  # Works in same connection but would not persist to file
conn.close()`,
      solution: `import sqlite3

conn = sqlite3.connect(":memory:")
cursor = conn.cursor()
cursor.execute("CREATE TABLE notes (id INTEGER PRIMARY KEY, text TEXT)")
cursor.execute("INSERT INTO notes (text) VALUES (?)", ("Important note",))
conn.commit()

cursor.execute("SELECT COUNT(*) FROM notes")
print(cursor.fetchone()[0])
conn.close()`,
      hints: [
        'Changes to the database must be committed to be saved.',
        'Without commit(), data is lost when the connection closes.',
        'Add conn.commit() after the INSERT statement.',
      ],
      concepts: ['commit', 'transaction', 'data persistence'],
    },
    {
      id: 'py-db-11',
      title: 'Predict transaction behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Predict the behavior of commit and rollback.',
      skeleton: `import sqlite3

conn = sqlite3.connect(":memory:")
c = conn.cursor()
c.execute("CREATE TABLE t (val INTEGER)")
c.execute("INSERT INTO t (val) VALUES (1)")
conn.commit()

c.execute("INSERT INTO t (val) VALUES (2)")
c.execute("INSERT INTO t (val) VALUES (3)")
conn.rollback()

c.execute("SELECT val FROM t ORDER BY val")
print(c.fetchall())`,
      solution: `[(1,)]`,
      hints: [
        'The first INSERT is committed, so value 1 is saved.',
        'The second and third INSERTs are rolled back.',
        'Only the committed row remains: [(1,)].',
      ],
      concepts: ['commit', 'rollback', 'transaction'],
    },
    {
      id: 'py-db-12',
      title: 'Write context manager transaction',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that uses connection as context manager for transactions.',
      skeleton: `import sqlite3

# Write a function 'transfer' that:
# 1. Takes conn, from_account (str), to_account (str), amount (float)
# 2. Uses 'with conn:' for automatic commit/rollback
# 3. Deducts amount from from_account balance
# 4. Adds amount to to_account balance
# Table: accounts (name TEXT, balance REAL)

def transfer(conn, from_acct, to_acct, amount):
    pass`,
      solution: `import sqlite3

def transfer(conn, from_acct, to_acct, amount):
    with conn:
        conn.execute(
            "UPDATE accounts SET balance = balance - ? WHERE name = ?",
            (amount, from_acct),
        )
        conn.execute(
            "UPDATE accounts SET balance = balance + ? WHERE name = ?",
            (amount, to_acct),
        )`,
      hints: [
        '"with conn:" automatically commits on success, rolls back on exception.',
        'Execute two UPDATE statements inside the with block.',
        'If either UPDATE fails, both are rolled back.',
      ],
      concepts: ['context manager', 'transaction', 'atomic operation'],
    },
    {
      id: 'py-db-13',
      title: 'Aggregate queries',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that runs aggregate SQL queries.',
      skeleton: `import sqlite3

# Write a function 'get_stats' that:
# 1. Takes a connection (has table 'sales' with columns: product, amount)
# 2. Returns a dict with keys: total, average, max_sale, count
# Use SQL aggregate functions: SUM, AVG, MAX, COUNT

def get_stats(conn):
    pass`,
      solution: `import sqlite3

def get_stats(conn):
    cursor = conn.cursor()
    cursor.execute("""
        SELECT SUM(amount), AVG(amount), MAX(amount), COUNT(*)
        FROM sales
    """)
    row = cursor.fetchone()
    return {
        "total": row[0],
        "average": row[1],
        "max_sale": row[2],
        "count": row[3],
    }`,
      hints: [
        'Use SUM, AVG, MAX, COUNT in a single SELECT statement.',
        'fetchone() returns a tuple with all aggregate values.',
        'Map tuple indices to dict keys.',
      ],
      concepts: ['SUM', 'AVG', 'MAX', 'COUNT', 'aggregate functions'],
    },
    {
      id: 'py-db-14',
      title: 'Predict fetchone vs fetchall',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Predict the difference between fetchone and fetchall.',
      skeleton: `import sqlite3

conn = sqlite3.connect(":memory:")
c = conn.cursor()
c.execute("CREATE TABLE t (v INTEGER)")
c.executemany("INSERT INTO t (v) VALUES (?)", [(1,), (2,), (3,)])
conn.commit()

c.execute("SELECT v FROM t ORDER BY v")
print(c.fetchone())
print(c.fetchone())
print(c.fetchall())`,
      solution: `(1,)
(2,)
[(3,)]`,
      hints: [
        'fetchone() returns the next row, advancing the cursor.',
        'First fetchone returns (1,), second returns (2,).',
        'fetchall() returns all remaining rows: [(3,)].',
      ],
      concepts: ['fetchone', 'fetchall', 'cursor iteration'],
    },
    {
      id: 'py-db-15',
      title: 'Fix schema migration',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the code that crashes when adding a column to existing table.',
      skeleton: `import sqlite3

conn = sqlite3.connect(":memory:")
c = conn.cursor()
c.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)")
c.execute("INSERT INTO users (name) VALUES ('Alice')")
conn.commit()

# Bug: CREATE TABLE fails because table already exists
c.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)")`,
      solution: `import sqlite3

conn = sqlite3.connect(":memory:")
c = conn.cursor()
c.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)")
c.execute("INSERT INTO users (name) VALUES ('Alice')")
conn.commit()

c.execute("ALTER TABLE users ADD COLUMN email TEXT")
conn.commit()`,
      hints: [
        'Cannot CREATE TABLE if it already exists.',
        'To add a column to an existing table, use ALTER TABLE.',
        'ALTER TABLE users ADD COLUMN email TEXT adds the new column.',
      ],
      concepts: ['ALTER TABLE', 'schema migration', 'ADD COLUMN'],
    },
    {
      id: 'py-db-16',
      title: 'Write simple ORM class',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a simple ORM-style base class.',
      skeleton: `import sqlite3

# Write a class 'Model' that:
# 1. Has class attribute 'table_name' (to be set by subclasses)
# 2. __init__ takes **kwargs and sets them as attributes
# 3. save(conn) inserts/updates the record
# 4. classmethod find(cls, conn, id) returns an instance or None

class Model:
    table_name = None

    def __init__(self, **kwargs):
        pass

    def save(self, conn):
        pass

    @classmethod
    def find(cls, conn, record_id):
        pass`,
      solution: `import sqlite3

class Model:
    table_name = None

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)

    def save(self, conn):
        attrs = {k: v for k, v in self.__dict__.items() if not k.startswith('_')}
        columns = ", ".join(attrs.keys())
        placeholders = ", ".join("?" for _ in attrs)
        values = tuple(attrs.values())
        conn.execute(
            f"INSERT INTO {self.table_name} ({columns}) VALUES ({placeholders})",
            values,
        )
        conn.commit()

    @classmethod
    def find(cls, conn, record_id):
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM {cls.table_name} WHERE id = ?", (record_id,))
        row = cursor.fetchone()
        if row is None:
            return None
        return cls(**dict(row))`,
      hints: [
        'Store kwargs as attributes with setattr in __init__.',
        'In save, build INSERT from __dict__ keys and values.',
        'In find, query by id and construct a new instance from the row.',
      ],
      concepts: ['ORM', 'dynamic attributes', 'CRUD abstraction'],
    },
    {
      id: 'py-db-17',
      title: 'Write migration system',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a simple schema migration system.',
      skeleton: `import sqlite3

# Write a function 'run_migrations' that:
# 1. Takes a connection and a list of SQL migration strings
# 2. Creates a 'migrations' table if not exists (id INTEGER PRIMARY KEY, sql TEXT)
# 3. Runs only migrations not already in the table
# 4. Records each run migration

def run_migrations(conn, migrations):
    pass`,
      solution: `import sqlite3

def run_migrations(conn, migrations):
    conn.execute("""
        CREATE TABLE IF NOT EXISTS migrations
        (id INTEGER PRIMARY KEY, sql TEXT)
    """)
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM migrations")
    applied = cursor.fetchone()[0]

    for i, sql in enumerate(migrations):
        if i < applied:
            continue
        conn.execute(sql)
        conn.execute("INSERT INTO migrations (sql) VALUES (?)", (sql,))
    conn.commit()`,
      hints: [
        'Track applied migrations in a separate table.',
        'Count existing migrations to know which ones to skip.',
        'Run unapplied migrations and record them in the migrations table.',
      ],
      concepts: ['migration', 'schema versioning', 'CREATE TABLE IF NOT EXISTS'],
    },
    {
      id: 'py-db-18',
      title: 'Write query builder',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a simple SQL query builder class.',
      skeleton: `# Write a class 'Query' that builds SELECT queries:
# 1. Query("users") -- sets the table
# 2. .select("name", "age") -- sets columns (default *)
# 3. .where("age > ?", 18) -- adds WHERE clause with param
# 4. .order_by("name") -- adds ORDER BY
# 5. .build() -- returns (sql_string, params_tuple)

class Query:
    pass`,
      solution: `class Query:
    def __init__(self, table):
        self._table = table
        self._columns = ["*"]
        self._where = []
        self._params = []
        self._order = None

    def select(self, *columns):
        self._columns = list(columns)
        return self

    def where(self, clause, *params):
        self._where.append(clause)
        self._params.extend(params)
        return self

    def order_by(self, column):
        self._order = column
        return self

    def build(self):
        cols = ", ".join(self._columns)
        sql = f"SELECT {cols} FROM {self._table}"
        if self._where:
            sql += " WHERE " + " AND ".join(self._where)
        if self._order:
            sql += f" ORDER BY {self._order}"
        return sql, tuple(self._params)`,
      hints: [
        'Store query parts as attributes and build the SQL string in build().',
        'Each method returns self for method chaining.',
        'Collect WHERE clauses and params separately, join with AND.',
      ],
      concepts: ['query builder', 'method chaining', 'SQL generation'],
    },
    {
      id: 'py-db-19',
      title: 'Refactor string SQL to parameterized',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor dangerous string-formatted SQL to safe parameterized queries.',
      skeleton: `import sqlite3

def search_products(conn, name, min_price, max_price):
    cursor = conn.cursor()
    sql = f"""
        SELECT * FROM products
        WHERE name LIKE '%{name}%'
        AND price >= {min_price}
        AND price <= {max_price}
    """
    cursor.execute(sql)
    return cursor.fetchall()

def update_stock(conn, product_id, new_qty):
    cursor = conn.cursor()
    cursor.execute(f"UPDATE products SET qty = {new_qty} WHERE id = {product_id}")
    conn.commit()`,
      solution: `import sqlite3

def search_products(conn, name, min_price, max_price):
    cursor = conn.cursor()
    cursor.execute(
        "SELECT * FROM products WHERE name LIKE ? AND price >= ? AND price <= ?",
        (f"%{name}%", min_price, max_price),
    )
    return cursor.fetchall()

def update_stock(conn, product_id, new_qty):
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE products SET qty = ? WHERE id = ?",
        (new_qty, product_id),
    )
    conn.commit()`,
      hints: [
        'Replace all f-string/format SQL with ? placeholders.',
        'Pass values as a tuple in the second argument to execute().',
        'For LIKE, build the pattern in Python (f"%{name}%") and pass as parameter.',
      ],
      concepts: ['refactoring', 'SQL injection', 'parameterized queries'],
    },
    {
      id: 'py-db-20',
      title: 'Refactor to context manager pattern',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor database code to use context managers properly.',
      skeleton: `import sqlite3

def process_orders():
    conn = sqlite3.connect("orders.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM orders WHERE status = 'pending'")
    orders = cursor.fetchall()

    for order in orders:
        try:
            cursor.execute(
                "UPDATE orders SET status = 'processed' WHERE id = ?",
                (order[0],)
            )
            cursor.execute(
                "INSERT INTO log (order_id, action) VALUES (?, ?)",
                (order[0], "processed")
            )
            conn.commit()
        except Exception:
            conn.rollback()

    conn.close()
    # Bug: if fetchall() or any early code fails, conn is never closed`,
      solution: `import sqlite3

def process_orders():
    with sqlite3.connect("orders.db") as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM orders WHERE status = 'pending'")
        orders = cursor.fetchall()

        for order in orders:
            try:
                with conn:
                    conn.execute(
                        "UPDATE orders SET status = 'processed' WHERE id = ?",
                        (order[0],),
                    )
                    conn.execute(
                        "INSERT INTO log (order_id, action) VALUES (?, ?)",
                        (order[0], "processed"),
                    )
            except Exception:
                pass  # Transaction already rolled back by context manager`,
      hints: [
        'Use "with sqlite3.connect(...) as conn:" to auto-close.',
        'Use "with conn:" for each transaction to auto-commit/rollback.',
        'The outer context manager handles close, inner handles transactions.',
      ],
      concepts: ['refactoring', 'context manager', 'transaction safety'],
    },
  ],
};
