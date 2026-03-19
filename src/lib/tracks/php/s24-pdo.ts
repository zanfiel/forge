import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-pdo',
  title: '24. PDO Database',
  explanation: `## PDO (PHP Data Objects)

PDO provides a consistent interface for accessing databases in PHP. It supports multiple database drivers (MySQL, PostgreSQL, SQLite, etc.) and offers prepared statements for security.

### Connecting
\`\`\`php
<?php
\$pdo = new PDO('mysql:host=localhost;dbname=mydb', 'user', 'pass', [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);
\`\`\`

### Prepared Statements
\`\`\`php
<?php
\$stmt = \$pdo->prepare('SELECT * FROM users WHERE id = :id');
\$stmt->execute(['id' => 42]);
\$user = \$stmt->fetch();
\`\`\`

### Fetch Modes
\`\`\`php
<?php
\$stmt->fetch(PDO::FETCH_ASSOC);  // associative array
\$stmt->fetch(PDO::FETCH_OBJ);    // stdClass object
\$stmt->fetchAll(PDO::FETCH_ASSOC); // all rows
\$stmt->fetchColumn();              // single column value
\`\`\`

### Transactions
\`\`\`php
<?php
\$pdo->beginTransaction();
try {
    \$pdo->exec("INSERT INTO accounts (name, balance) VALUES ('Alice', 100)");
    \$pdo->exec("INSERT INTO accounts (name, balance) VALUES ('Bob', 200)");
    \$pdo->commit();
} catch (Exception \$e) {
    \$pdo->rollBack();
    throw \$e;
}
\`\`\`

### Error Handling
\`\`\`php
<?php
// Set error mode to exceptions (recommended)
\$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    \$pdo->exec('INVALID SQL');
} catch (PDOException \$e) {
    echo 'Database error: ' . \$e->getMessage();
}
\`\`\`

### Pagination
\`\`\`php
<?php
\$page = 2;
\$perPage = 10;
\$offset = (\$page - 1) * \$perPage;

\$stmt = \$pdo->prepare('SELECT * FROM posts LIMIT :limit OFFSET :offset');
\$stmt->bindValue('limit', \$perPage, PDO::PARAM_INT);
\$stmt->bindValue('offset', \$offset, PDO::PARAM_INT);
\$stmt->execute();
\`\`\``,
  exercises: [
    {
      id: 'php-pdo-1',
      title: 'Create PDO Connection',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to create a PDO connection to a SQLite database.',
      skeleton: `<?php
\$pdo = new ___('sqlite:database.db');`,
      solution: `<?php
\$pdo = new PDO('sqlite:database.db');`,
      hints: [
        'Use new PDO() to create a database connection.',
        'SQLite DSN format is "sqlite:filename".',
        'No username or password needed for SQLite.',
      ],
      concepts: ['PDO', 'constructor', 'SQLite'],
    },
    {
      id: 'php-pdo-2',
      title: 'Set Error Mode',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to set PDO error mode to exceptions.',
      skeleton: `<?php
\$pdo = new PDO('sqlite:db.sqlite');
\$pdo->setAttribute(PDO::ATTR_ERRMODE, ___);`,
      solution: `<?php
\$pdo = new PDO('sqlite:db.sqlite');
\$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);`,
      hints: [
        'ERRMODE_EXCEPTION makes PDO throw exceptions on errors.',
        'This is the recommended error mode.',
        'The constant is PDO::ERRMODE_EXCEPTION.',
      ],
      concepts: ['error-mode', 'ERRMODE_EXCEPTION', 'setAttribute'],
    },
    {
      id: 'php-pdo-3',
      title: 'Prepare and Execute',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blanks to use a prepared statement.',
      skeleton: `<?php
\$stmt = \$pdo->___('SELECT * FROM users WHERE email = :email');
\$stmt->___(['email' => 'alice@example.com']);
\$user = \$stmt->fetch();`,
      solution: `<?php
\$stmt = \$pdo->prepare('SELECT * FROM users WHERE email = :email');
\$stmt->execute(['email' => 'alice@example.com']);
\$user = \$stmt->fetch();`,
      hints: [
        'prepare() creates a prepared statement.',
        'execute() runs it with the bound parameters.',
        'Named placeholders use :name syntax.',
      ],
      concepts: ['prepare', 'execute', 'named-placeholder'],
    },
    {
      id: 'php-pdo-4',
      title: 'Fetch All Rows',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to fetch all results as associative arrays.',
      skeleton: `<?php
\$stmt = \$pdo->query('SELECT * FROM products');
\$products = \$stmt->___(PDO::FETCH_ASSOC);`,
      solution: `<?php
\$stmt = \$pdo->query('SELECT * FROM products');
\$products = \$stmt->fetchAll(PDO::FETCH_ASSOC);`,
      hints: [
        'fetchAll() returns all remaining rows.',
        'PDO::FETCH_ASSOC returns associative arrays.',
        'Each row is an associative array keyed by column name.',
      ],
      concepts: ['fetchAll', 'FETCH_ASSOC', 'query'],
    },
    {
      id: 'php-pdo-5',
      title: 'Begin Transaction',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to wrap operations in a transaction.',
      skeleton: `<?php
\$pdo->___();
try {
    \$pdo->exec("INSERT INTO logs (msg) VALUES ('start')");
    \$pdo->exec("INSERT INTO logs (msg) VALUES ('end')");
    \$pdo->___();
} catch (Exception \$e) {
    \$pdo->___();
}`,
      solution: `<?php
\$pdo->beginTransaction();
try {
    \$pdo->exec("INSERT INTO logs (msg) VALUES ('start')");
    \$pdo->exec("INSERT INTO logs (msg) VALUES ('end')");
    \$pdo->commit();
} catch (Exception \$e) {
    \$pdo->rollBack();
}`,
      hints: [
        'beginTransaction() starts a transaction.',
        'commit() saves all changes.',
        'rollBack() undoes all changes on failure.',
      ],
      concepts: ['transaction', 'commit', 'rollBack'],
    },
    {
      id: 'php-pdo-6',
      title: 'Bind Value with Type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to bind an integer value to a LIMIT clause.',
      skeleton: `<?php
\$stmt = \$pdo->prepare('SELECT * FROM users LIMIT :limit');
\$stmt->bindValue('limit', 10, ___);
\$stmt->execute();`,
      solution: `<?php
\$stmt = \$pdo->prepare('SELECT * FROM users LIMIT :limit');
\$stmt->bindValue('limit', 10, PDO::PARAM_INT);
\$stmt->execute();`,
      hints: [
        'LIMIT requires an integer parameter.',
        'Use PDO::PARAM_INT to bind as integer.',
        'Without this, PDO may send it as a string.',
      ],
      concepts: ['bindValue', 'PARAM_INT', 'type-binding'],
    },
    {
      id: 'php-pdo-7',
      title: 'Write a Query Builder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function findByColumn(PDO $pdo, string $table, string $column, mixed $value): array that safely queries a table by a column value and returns all matching rows.',
      skeleton: `<?php
// Write the findByColumn function`,
      solution: `<?php
function findByColumn(PDO \$pdo, string \$table, string \$column, mixed \$value): array {
    \$stmt = \$pdo->prepare("SELECT * FROM \$table WHERE \$column = :value");
    \$stmt->execute(['value' => \$value]);
    return \$stmt->fetchAll(PDO::FETCH_ASSOC);
}`,
      hints: [
        'Use prepared statements for the value.',
        'Table and column names cannot be parameterized in PDO.',
        'fetchAll returns all matching rows.',
      ],
      concepts: ['prepared-statement', 'fetchAll', 'dynamic-query'],
    },
    {
      id: 'php-pdo-8',
      title: 'Write an Insert Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function insertRow(PDO $pdo, string $table, array $data): int that inserts a row from an associative array and returns the last insert ID.',
      skeleton: `<?php
// Write the insertRow function`,
      solution: `<?php
function insertRow(PDO \$pdo, string \$table, array \$data): int {
    \$columns = implode(', ', array_keys(\$data));
    \$placeholders = implode(', ', array_map(fn(\$k) => ":\$k", array_keys(\$data)));
    \$stmt = \$pdo->prepare("INSERT INTO \$table (\$columns) VALUES (\$placeholders)");
    \$stmt->execute(\$data);
    return (int) \$pdo->lastInsertId();
}`,
      hints: [
        'Build column names and :placeholder strings from array keys.',
        'Use implode to join them with commas.',
        'lastInsertId() returns the auto-increment ID.',
      ],
      concepts: ['INSERT', 'lastInsertId', 'dynamic-columns'],
    },
    {
      id: 'php-pdo-9',
      title: 'Write a Paginator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function paginate(PDO $pdo, string $table, int $page, int $perPage): array that returns a page of results.',
      skeleton: `<?php
// Write the paginate function`,
      solution: `<?php
function paginate(PDO \$pdo, string \$table, int \$page, int \$perPage): array {
    \$offset = (\$page - 1) * \$perPage;
    \$stmt = \$pdo->prepare("SELECT * FROM \$table LIMIT :limit OFFSET :offset");
    \$stmt->bindValue('limit', \$perPage, PDO::PARAM_INT);
    \$stmt->bindValue('offset', \$offset, PDO::PARAM_INT);
    \$stmt->execute();
    return \$stmt->fetchAll(PDO::FETCH_ASSOC);
}`,
      hints: [
        'Calculate offset as (page - 1) * perPage.',
        'Use bindValue with PDO::PARAM_INT for LIMIT and OFFSET.',
        'Return all rows from fetchAll.',
      ],
      concepts: ['pagination', 'LIMIT', 'OFFSET'],
    },
    {
      id: 'php-pdo-10',
      title: 'Write a Transaction Wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function transaction(PDO $pdo, callable $fn): mixed that wraps a callable in a database transaction, committing on success and rolling back on exception.',
      skeleton: `<?php
// Write the transaction function`,
      solution: `<?php
function transaction(PDO \$pdo, callable \$fn): mixed {
    \$pdo->beginTransaction();
    try {
        \$result = \$fn(\$pdo);
        \$pdo->commit();
        return \$result;
    } catch (Exception \$e) {
        \$pdo->rollBack();
        throw \$e;
    }
}`,
      hints: [
        'Call beginTransaction() before the callable.',
        'Wrap in try/catch, commit on success, rollBack on failure.',
        'Re-throw the exception after rolling back.',
      ],
      concepts: ['transaction-wrapper', 'callable', 'rollBack'],
    },
    {
      id: 'php-pdo-11',
      title: 'Write a Batch Inserter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function batchInsert(PDO $pdo, string $table, array $columns, array $rows): int that inserts multiple rows efficiently using a single prepared statement and returns the count.',
      skeleton: `<?php
// Write the batchInsert function`,
      solution: `<?php
function batchInsert(PDO \$pdo, string \$table, array \$columns, array \$rows): int {
    \$cols = implode(', ', \$columns);
    \$placeholders = implode(', ', array_fill(0, count(\$columns), '?'));
    \$stmt = \$pdo->prepare("INSERT INTO \$table (\$cols) VALUES (\$placeholders)");
    \$count = 0;
    \$pdo->beginTransaction();
    foreach (\$rows as \$row) {
        \$stmt->execute(\$row);
        \$count++;
    }
    \$pdo->commit();
    return \$count;
}`,
      hints: [
        'Prepare the statement once with ? placeholders.',
        'Execute it for each row inside a transaction.',
        'Transactions make batch inserts much faster.',
      ],
      concepts: ['batch-insert', 'prepared-statement', 'performance'],
    },
    {
      id: 'php-pdo-12',
      title: 'Write an Upsert Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function upsert(PDO $pdo, string $table, array $data, string $uniqueCol): void that inserts a row or updates it if the unique column already exists (SQLite syntax: INSERT OR REPLACE).',
      skeleton: `<?php
// Write the upsert function`,
      solution: `<?php
function upsert(PDO \$pdo, string \$table, array \$data, string \$uniqueCol): void {
    \$columns = implode(', ', array_keys(\$data));
    \$placeholders = implode(', ', array_map(fn(\$k) => ":\$k", array_keys(\$data)));
    \$stmt = \$pdo->prepare("INSERT OR REPLACE INTO \$table (\$columns) VALUES (\$placeholders)");
    \$stmt->execute(\$data);
}`,
      hints: [
        'SQLite uses INSERT OR REPLACE for upsert.',
        'Build the query dynamically from array keys.',
        'The unique column constraint triggers the replace.',
      ],
      concepts: ['upsert', 'INSERT-OR-REPLACE', 'conflict-resolution'],
    },
    {
      id: 'php-pdo-13',
      title: 'Fix SQL Injection',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the SQL injection vulnerability by using a prepared statement.',
      skeleton: `<?php
\$email = \$_GET['email'];
\$stmt = \$pdo->query("SELECT * FROM users WHERE email = '\$email'");
\$user = \$stmt->fetch();`,
      solution: `<?php
\$email = \$_GET['email'];
\$stmt = \$pdo->prepare('SELECT * FROM users WHERE email = :email');
\$stmt->execute(['email' => \$email]);
\$user = \$stmt->fetch();`,
      hints: [
        'Never interpolate user input directly into SQL.',
        'Use prepare() with named placeholders.',
        'execute() with bound parameters prevents SQL injection.',
      ],
      concepts: ['SQL-injection', 'prepared-statement', 'security'],
    },
    {
      id: 'php-pdo-14',
      title: 'Fix Missing Transaction Rollback',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the transaction that never rolls back on failure.',
      skeleton: `<?php
\$pdo->beginTransaction();
\$pdo->exec("UPDATE accounts SET balance = balance - 100 WHERE id = 1");
\$pdo->exec("UPDATE accounts SET balance = balance + 100 WHERE id = 2");
\$pdo->commit();`,
      solution: `<?php
\$pdo->beginTransaction();
try {
    \$pdo->exec("UPDATE accounts SET balance = balance - 100 WHERE id = 1");
    \$pdo->exec("UPDATE accounts SET balance = balance + 100 WHERE id = 2");
    \$pdo->commit();
} catch (Exception \$e) {
    \$pdo->rollBack();
    throw \$e;
}`,
      hints: [
        'Wrap transaction operations in try/catch.',
        'Call rollBack() in the catch block.',
        'Re-throw the exception after rolling back.',
      ],
      concepts: ['transaction', 'rollBack', 'exception-safety'],
    },
    {
      id: 'php-pdo-15',
      title: 'Fix Fetch Mode Mismatch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the code that expects an associative array but gets an object.',
      skeleton: `<?php
\$stmt = \$pdo->query('SELECT name, age FROM users LIMIT 1');
\$user = \$stmt->fetch(PDO::FETCH_OBJ);
echo \$user['name'];`,
      solution: `<?php
\$stmt = \$pdo->query('SELECT name, age FROM users LIMIT 1');
\$user = \$stmt->fetch(PDO::FETCH_ASSOC);
echo \$user['name'];`,
      hints: [
        'FETCH_OBJ returns an object, not an array.',
        'Array access on an object causes errors.',
        'Use FETCH_ASSOC for associative array access.',
      ],
      concepts: ['FETCH_ASSOC', 'FETCH_OBJ', 'type-mismatch'],
    },
    {
      id: 'php-pdo-16',
      title: 'Predict rowCount Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the output of rowCount after an UPDATE.',
      skeleton: `<?php
// Assume users table has 3 rows where active = 0
\$stmt = \$pdo->prepare('UPDATE users SET active = 1 WHERE active = 0');
\$stmt->execute();
echo \$stmt->rowCount();`,
      solution: `3`,
      hints: [
        'rowCount() returns the number of affected rows.',
        '3 rows have active = 0.',
        'All 3 rows are updated.',
      ],
      concepts: ['rowCount', 'UPDATE', 'affected-rows'],
    },
    {
      id: 'php-pdo-17',
      title: 'Predict fetchColumn Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the output of fetchColumn.',
      skeleton: `<?php
// users table: (1, 'Alice'), (2, 'Bob'), (3, 'Charlie')
\$stmt = \$pdo->query('SELECT name FROM users ORDER BY id');
echo \$stmt->fetchColumn() . ' ';
echo \$stmt->fetchColumn();`,
      solution: `Alice Bob`,
      hints: [
        'fetchColumn() returns the first column of the next row.',
        'First call gets "Alice", second gets "Bob".',
        'Each call advances the cursor by one row.',
      ],
      concepts: ['fetchColumn', 'cursor', 'sequential-fetch'],
    },
    {
      id: 'php-pdo-18',
      title: 'Predict lastInsertId',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the last insert ID after sequential inserts.',
      skeleton: `<?php
// Empty users table with auto-increment id
\$pdo->exec("INSERT INTO users (name) VALUES ('Alice')");
\$pdo->exec("INSERT INTO users (name) VALUES ('Bob')");
echo \$pdo->lastInsertId();`,
      solution: `2`,
      hints: [
        'Auto-increment starts at 1.',
        'Alice gets id 1, Bob gets id 2.',
        'lastInsertId() returns the most recent auto-increment value.',
      ],
      concepts: ['lastInsertId', 'auto-increment', 'sequential'],
    },
    {
      id: 'php-pdo-19',
      title: 'Refactor query() to Prepared Statement',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the direct query to use a prepared statement.',
      skeleton: `<?php
\$id = 42;
\$stmt = \$pdo->query("SELECT * FROM users WHERE id = \$id");
\$user = \$stmt->fetch(PDO::FETCH_ASSOC);`,
      solution: `<?php
\$id = 42;
\$stmt = \$pdo->prepare('SELECT * FROM users WHERE id = :id');
\$stmt->execute(['id' => \$id]);
\$user = \$stmt->fetch(PDO::FETCH_ASSOC);`,
      hints: [
        'Replace query() with prepare() and execute().',
        'Use a named placeholder :id instead of interpolation.',
        'Prepared statements are safer and often faster.',
      ],
      concepts: ['prepared-statement', 'refactor', 'security'],
    },
    {
      id: 'php-pdo-20',
      title: 'Refactor Manual Loop to fetchAll',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the manual fetch loop to use fetchAll.',
      skeleton: `<?php
\$stmt = \$pdo->query('SELECT id, name FROM users');
\$users = [];
while (\$row = \$stmt->fetch(PDO::FETCH_ASSOC)) {
    \$users[] = \$row;
}`,
      solution: `<?php
\$stmt = \$pdo->query('SELECT id, name FROM users');
\$users = \$stmt->fetchAll(PDO::FETCH_ASSOC);`,
      hints: [
        'fetchAll() retrieves all rows at once.',
        'It replaces the manual while/fetch loop.',
        'One line replaces four lines.',
      ],
      concepts: ['fetchAll', 'simplification', 'refactor'],
    },
  ],
};
