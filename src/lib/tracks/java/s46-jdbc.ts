import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-jdbc',
  title: '46. JDBC',
  explanation: `## JDBC (Java Database Connectivity)

**JDBC** is the standard Java API for connecting to relational databases. It provides a uniform interface regardless of the underlying database.

### Architecture

\`\`\`
Application -> JDBC API -> JDBC Driver -> Database
\`\`\`

### Getting a Connection

\`\`\`java
// Load driver (automatic in modern JDBC via ServiceLoader)
Connection conn = DriverManager.getConnection(
    "jdbc:mysql://localhost:3306/mydb", "user", "password");
\`\`\`

### Executing Queries with PreparedStatement

Always use \`PreparedStatement\` to prevent SQL injection:

\`\`\`java
String sql = "SELECT * FROM users WHERE age > ?";
try (PreparedStatement ps = conn.prepareStatement(sql)) {
    ps.setInt(1, 18);
    try (ResultSet rs = ps.executeQuery()) {
        while (rs.next()) {
            String name = rs.getString("name");
            int age = rs.getInt("age");
        }
    }
}
\`\`\`

### Insert / Update / Delete

\`\`\`java
String sql = "INSERT INTO users (name, age) VALUES (?, ?)";
try (PreparedStatement ps = conn.prepareStatement(sql)) {
    ps.setString(1, "Alice");
    ps.setInt(2, 30);
    int rows = ps.executeUpdate(); // returns affected row count
}
\`\`\`

### Transactions

\`\`\`java
conn.setAutoCommit(false);
try {
    // execute statements...
    conn.commit();
} catch (SQLException e) {
    conn.rollback();
}
\`\`\`

### Batch Operations

\`\`\`java
try (PreparedStatement ps = conn.prepareStatement(
        "INSERT INTO items (name) VALUES (?)")) {
    for (String item : items) {
        ps.setString(1, item);
        ps.addBatch();
    }
    int[] results = ps.executeBatch();
}
\`\`\`

### Connection Pooling Concepts

Creating connections is expensive. Connection pools (like HikariCP) maintain a pool of reusable connections:

\`\`\`java
HikariConfig config = new HikariConfig();
config.setJdbcUrl("jdbc:mysql://localhost:3306/mydb");
config.setUsername("user");
config.setPassword("password");
config.setMaximumPoolSize(10);
DataSource ds = new HikariDataSource(config);
Connection conn = ds.getConnection(); // from pool
\`\`\`

### Try-with-Resources

Always use try-with-resources for JDBC objects -- Connection, Statement, and ResultSet all implement AutoCloseable:

\`\`\`java
try (Connection conn = DriverManager.getConnection(url, user, pass);
     PreparedStatement ps = conn.prepareStatement(sql);
     ResultSet rs = ps.executeQuery()) {
    // process results
}
\`\`\``,
  exercises: [
    {
      id: 'java-jdbc-1',
      title: 'Get a Database Connection',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Complete the code to establish a JDBC connection using DriverManager.',
      skeleton: `String url = "jdbc:mysql://localhost:3306/shop";
String user = "root";
String pass = "secret";

Connection conn = __BLANK__.getConnection(__BLANK__, __BLANK__, __BLANK__);`,
      solution: `String url = "jdbc:mysql://localhost:3306/shop";
String user = "root";
String pass = "secret";

Connection conn = DriverManager.getConnection(url, user, pass);`,
      hints: [
        'The class that manages JDBC connections is DriverManager.',
        'getConnection takes the URL, username, and password.',
        'DriverManager.getConnection(url, user, pass)',
      ],
      concepts: ['jdbc', 'driver-manager', 'connection'],
    },
    {
      id: 'java-jdbc-2',
      title: 'Create a PreparedStatement',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create a PreparedStatement for a parameterized SELECT query and set the parameter.',
      skeleton: `String sql = "SELECT * FROM products WHERE price < ?";
PreparedStatement ps = conn.__BLANK__(sql);
ps.__BLANK__(1, 50.0);
ResultSet rs = ps.__BLANK__();`,
      solution: `String sql = "SELECT * FROM products WHERE price < ?";
PreparedStatement ps = conn.prepareStatement(sql);
ps.setDouble(1, 50.0);
ResultSet rs = ps.executeQuery();`,
      hints: [
        'Use conn.prepareStatement(sql) to create a PreparedStatement.',
        'Set a double parameter with ps.setDouble(index, value). JDBC indices are 1-based.',
        'For SELECT queries, use ps.executeQuery() which returns a ResultSet.',
      ],
      concepts: ['prepared-statement', 'parameterized-query', 'result-set'],
    },
    {
      id: 'java-jdbc-3',
      title: 'Iterate a ResultSet',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Iterate over a ResultSet and extract column values by name.',
      skeleton: `ResultSet rs = ps.executeQuery();
while (rs.__BLANK__()) {
    String name = rs.__BLANK__("name");
    int quantity = rs.__BLANK__("quantity");
    System.out.println(name + ": " + quantity);
}`,
      solution: `ResultSet rs = ps.executeQuery();
while (rs.next()) {
    String name = rs.getString("name");
    int quantity = rs.getInt("quantity");
    System.out.println(name + ": " + quantity);
}`,
      hints: [
        'rs.next() advances the cursor and returns true if there is another row.',
        'getString("columnName") retrieves a String column.',
        'getInt("columnName") retrieves an int column.',
      ],
      concepts: ['result-set', 'cursor', 'column-access'],
    },
    {
      id: 'java-jdbc-4',
      title: 'Insert with PreparedStatement',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method insertUser(Connection conn, String name, int age) that inserts a row into the "users" table and returns the number of affected rows.',
      skeleton: `public int insertUser(Connection conn, String name, int age) throws SQLException {
    // Write the insert using PreparedStatement
}`,
      solution: `public int insertUser(Connection conn, String name, int age) throws SQLException {
    String sql = "INSERT INTO users (name, age) VALUES (?, ?)";
    try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, name);
        ps.setInt(2, age);
        return ps.executeUpdate();
    }
}`,
      hints: [
        'Use "INSERT INTO users (name, age) VALUES (?, ?)" as the SQL.',
        'Set parameters with ps.setString(1, name) and ps.setInt(2, age).',
        'Use executeUpdate() for INSERT/UPDATE/DELETE -- it returns affected row count.',
      ],
      concepts: ['prepared-statement', 'insert', 'execute-update'],
    },
    {
      id: 'java-jdbc-5',
      title: 'Try-With-Resources for JDBC',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Use try-with-resources to properly close Connection, PreparedStatement, and ResultSet.',
      skeleton: `__BLANK__ (Connection conn = DriverManager.getConnection(url, user, pass);
     PreparedStatement ps = conn.prepareStatement("SELECT * FROM items");
     __BLANK__ rs = ps.executeQuery()) {
    while (rs.next()) {
        System.out.println(rs.getString("name"));
    }
}`,
      solution: `try (Connection conn = DriverManager.getConnection(url, user, pass);
     PreparedStatement ps = conn.prepareStatement("SELECT * FROM items");
     ResultSet rs = ps.executeQuery()) {
    while (rs.next()) {
        System.out.println(rs.getString("name"));
    }
}`,
      hints: [
        'try-with-resources starts with the keyword "try" followed by parentheses.',
        'All three resources are declared inside the parentheses.',
        'ResultSet is the type for rs.',
      ],
      concepts: ['try-with-resources', 'auto-closeable', 'resource-management'],
    },
    {
      id: 'java-jdbc-6',
      title: 'Fix the SQL Injection Vulnerability',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'This code is vulnerable to SQL injection. Fix it by using a PreparedStatement with parameters.',
      skeleton: `public List<String> findUsers(Connection conn, String nameFilter) throws SQLException {
    String sql = "SELECT name FROM users WHERE name = '" + nameFilter + "'";
    Statement stmt = conn.createStatement();
    ResultSet rs = stmt.executeQuery(sql);
    List<String> names = new ArrayList<>();
    while (rs.next()) {
        names.add(rs.getString("name"));
    }
    return names;
}`,
      solution: `public List<String> findUsers(Connection conn, String nameFilter) throws SQLException {
    String sql = "SELECT name FROM users WHERE name = ?";
    try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, nameFilter);
        try (ResultSet rs = ps.executeQuery()) {
            List<String> names = new ArrayList<>();
            while (rs.next()) {
                names.add(rs.getString("name"));
            }
            return names;
        }
    }
}`,
      hints: [
        'Never concatenate user input into SQL strings.',
        'Replace the concatenation with a ? placeholder and use PreparedStatement.',
        'Use ps.setString(1, nameFilter) to safely bind the parameter.',
      ],
      concepts: ['sql-injection', 'prepared-statement', 'security'],
    },
    {
      id: 'java-jdbc-7',
      title: 'Predict the Row Count',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the return value of executeUpdate() for this INSERT.',
      skeleton: `String sql = "INSERT INTO logs (message) VALUES (?)";
try (PreparedStatement ps = conn.prepareStatement(sql)) {
    ps.setString(1, "Hello");
    int result = ps.executeUpdate();
    System.out.println(result);
}
// Assume the table exists and the insert succeeds.`,
      solution: `1`,
      hints: [
        'executeUpdate() returns the number of affected rows.',
        'A single INSERT that succeeds affects exactly one row.',
        'The output is the integer 1.',
      ],
      concepts: ['execute-update', 'affected-rows', 'insert'],
    },
    {
      id: 'java-jdbc-8',
      title: 'Transaction with Commit and Rollback',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Complete the transaction handling code with proper commit and rollback.',
      skeleton: `conn.__BLANK__(false);
try {
    try (PreparedStatement ps1 = conn.prepareStatement(
            "UPDATE accounts SET balance = balance - ? WHERE id = ?")) {
        ps1.setDouble(1, 100.0);
        ps1.setInt(2, 1);
        ps1.executeUpdate();
    }
    try (PreparedStatement ps2 = conn.prepareStatement(
            "UPDATE accounts SET balance = balance + ? WHERE id = ?")) {
        ps2.setDouble(1, 100.0);
        ps2.setInt(2, 2);
        ps2.executeUpdate();
    }
    conn.__BLANK__();
} catch (SQLException e) {
    conn.__BLANK__();
    throw e;
}`,
      solution: `conn.setAutoCommit(false);
try {
    try (PreparedStatement ps1 = conn.prepareStatement(
            "UPDATE accounts SET balance = balance - ? WHERE id = ?")) {
        ps1.setDouble(1, 100.0);
        ps1.setInt(2, 1);
        ps1.executeUpdate();
    }
    try (PreparedStatement ps2 = conn.prepareStatement(
            "UPDATE accounts SET balance = balance + ? WHERE id = ?")) {
        ps2.setDouble(1, 100.0);
        ps2.setInt(2, 2);
        ps2.executeUpdate();
    }
    conn.commit();
} catch (SQLException e) {
    conn.rollback();
    throw e;
}`,
      hints: [
        'Disable auto-commit with conn.setAutoCommit(false).',
        'After both statements succeed, call conn.commit().',
        'In the catch block, call conn.rollback() to undo partial changes.',
      ],
      concepts: ['transactions', 'commit', 'rollback', 'atomicity'],
    },
    {
      id: 'java-jdbc-9',
      title: 'Batch Insert',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method batchInsertProducts(Connection conn, List<String> names) that inserts all product names in a single batch operation.',
      skeleton: `public int[] batchInsertProducts(Connection conn, List<String> names) throws SQLException {
    // Use PreparedStatement batch operations
}`,
      solution: `public int[] batchInsertProducts(Connection conn, List<String> names) throws SQLException {
    String sql = "INSERT INTO products (name) VALUES (?)";
    try (PreparedStatement ps = conn.prepareStatement(sql)) {
        for (String name : names) {
            ps.setString(1, name);
            ps.addBatch();
        }
        return ps.executeBatch();
    }
}`,
      hints: [
        'Create one PreparedStatement and reuse it for each item.',
        'For each name: set the parameter, then call ps.addBatch().',
        'After the loop, call ps.executeBatch() which returns an int array of row counts.',
      ],
      concepts: ['batch-operations', 'prepared-statement', 'performance'],
    },
    {
      id: 'java-jdbc-10',
      title: 'Retrieve Generated Keys',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Retrieve the auto-generated primary key after an INSERT.',
      skeleton: `String sql = "INSERT INTO users (name) VALUES (?)";
try (PreparedStatement ps = conn.prepareStatement(sql, __BLANK__)) {
    ps.setString(1, "Alice");
    ps.executeUpdate();
    try (ResultSet keys = ps.__BLANK__()) {
        if (keys.next()) {
            long id = keys.getLong(1);
            System.out.println("Generated ID: " + id);
        }
    }
}`,
      solution: `String sql = "INSERT INTO users (name) VALUES (?)";
try (PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
    ps.setString(1, "Alice");
    ps.executeUpdate();
    try (ResultSet keys = ps.getGeneratedKeys()) {
        if (keys.next()) {
            long id = keys.getLong(1);
            System.out.println("Generated ID: " + id);
        }
    }
}`,
      hints: [
        'Pass Statement.RETURN_GENERATED_KEYS as the second argument to prepareStatement.',
        'After executeUpdate, call ps.getGeneratedKeys() to get a ResultSet.',
        'The generated key is in the first column of the keys ResultSet.',
      ],
      concepts: ['generated-keys', 'auto-increment', 'prepared-statement'],
    },
    {
      id: 'java-jdbc-11',
      title: 'DAO Pattern: findById',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a DAO method findById(Connection conn, int id) that returns an Optional<User> from the "users" table with columns: id, name, email.',
      skeleton: `public record User(int id, String name, String email) {}

public Optional<User> findById(Connection conn, int id) throws SQLException {
    // Query users table by id using PreparedStatement
    // Return Optional.of(user) if found, Optional.empty() otherwise
}`,
      solution: `public record User(int id, String name, String email) {}

public Optional<User> findById(Connection conn, int id) throws SQLException {
    String sql = "SELECT id, name, email FROM users WHERE id = ?";
    try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, id);
        try (ResultSet rs = ps.executeQuery()) {
            if (rs.next()) {
                return Optional.of(new User(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("email")
                ));
            }
            return Optional.empty();
        }
    }
}`,
      hints: [
        'Use a SELECT with WHERE id = ? and set the parameter.',
        'If rs.next() returns true, map the ResultSet to a User record.',
        'Return Optional.of(user) when found, Optional.empty() when not.',
      ],
      concepts: ['dao-pattern', 'optional', 'result-set-mapping'],
    },
    {
      id: 'java-jdbc-12',
      title: 'Fix the Resource Leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'This code leaks resources. Fix it using try-with-resources.',
      skeleton: `public List<String> getAllNames(Connection conn) throws SQLException {
    PreparedStatement ps = conn.prepareStatement("SELECT name FROM users");
    ResultSet rs = ps.executeQuery();
    List<String> names = new ArrayList<>();
    while (rs.next()) {
        names.add(rs.getString("name"));
    }
    return names;
}`,
      solution: `public List<String> getAllNames(Connection conn) throws SQLException {
    try (PreparedStatement ps = conn.prepareStatement("SELECT name FROM users");
         ResultSet rs = ps.executeQuery()) {
        List<String> names = new ArrayList<>();
        while (rs.next()) {
            names.add(rs.getString("name"));
        }
        return names;
    }
}`,
      hints: [
        'PreparedStatement and ResultSet are never closed in the original code.',
        'Wrap them in a try-with-resources block.',
        'Both ps and rs can be declared in the same try-with-resources.',
      ],
      concepts: ['resource-leak', 'try-with-resources', 'auto-closeable'],
    },
    {
      id: 'java-jdbc-13',
      title: 'Predict Transaction Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict whether the first UPDATE persists after this code runs.',
      skeleton: `conn.setAutoCommit(false);
try {
    PreparedStatement ps1 = conn.prepareStatement(
        "UPDATE accounts SET balance = 500 WHERE id = 1");
    ps1.executeUpdate();

    PreparedStatement ps2 = conn.prepareStatement(
        "UPDATE accounts SET balance = -100 WHERE id = 2");
    ps2.executeUpdate();

    // Suppose a CHECK constraint rejects negative balance, throwing SQLException
    conn.commit();
} catch (SQLException e) {
    conn.rollback();
}
// Does account 1 have balance 500 after this code runs?`,
      solution: `No. Account 1 does NOT have balance 500. The second UPDATE violates the CHECK constraint, throwing SQLException. The catch block calls rollback(), which undoes BOTH updates. The transaction is atomic -- all or nothing.`,
      hints: [
        'Both updates are in the same transaction.',
        'If any statement fails, the catch block executes.',
        'rollback() undoes ALL changes in the transaction, including the first UPDATE.',
      ],
      concepts: ['transaction-atomicity', 'rollback', 'check-constraint'],
    },
    {
      id: 'java-jdbc-14',
      title: 'ResultSet Metadata',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that executes any SELECT query and returns the results as a List<Map<String, Object>>, using ResultSetMetaData to discover column names dynamically.',
      skeleton: `public List<Map<String, Object>> queryToMaps(Connection conn, String sql) throws SQLException {
    // Execute the query, use ResultSetMetaData to get column names
    // For each row, create a Map with column name -> value
}`,
      solution: `public List<Map<String, Object>> queryToMaps(Connection conn, String sql) throws SQLException {
    try (PreparedStatement ps = conn.prepareStatement(sql);
         ResultSet rs = ps.executeQuery()) {
        ResultSetMetaData meta = rs.getMetaData();
        int columnCount = meta.getColumnCount();
        List<Map<String, Object>> results = new ArrayList<>();
        while (rs.next()) {
            Map<String, Object> row = new LinkedHashMap<>();
            for (int i = 1; i <= columnCount; i++) {
                row.put(meta.getColumnLabel(i), rs.getObject(i));
            }
            results.add(row);
        }
        return results;
    }
}`,
      hints: [
        'Use rs.getMetaData() to get column information.',
        'meta.getColumnCount() gives the number of columns; columns are 1-indexed.',
        'meta.getColumnLabel(i) returns the column name; rs.getObject(i) returns the value.',
      ],
      concepts: ['result-set-metadata', 'dynamic-mapping', 'linked-hash-map'],
    },
    {
      id: 'java-jdbc-15',
      title: 'Connection Pool Configuration',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Configure a HikariCP connection pool with URL, credentials, max pool size, and connection timeout.',
      skeleton: `HikariConfig config = new __BLANK__();
config.__BLANK__("jdbc:postgresql://localhost:5432/mydb");
config.setUsername("admin");
config.setPassword("secret");
config.__BLANK__(20);
config.setConnectionTimeout(30000);

DataSource ds = new __BLANK__(config);
try (Connection conn = ds.__BLANK__()) {
    // use connection from pool
}`,
      solution: `HikariConfig config = new HikariConfig();
config.setJdbcUrl("jdbc:postgresql://localhost:5432/mydb");
config.setUsername("admin");
config.setPassword("secret");
config.setMaximumPoolSize(20);
config.setConnectionTimeout(30000);

DataSource ds = new HikariDataSource(config);
try (Connection conn = ds.getConnection()) {
    // use connection from pool
}`,
      hints: [
        'HikariConfig is the configuration class.',
        'setJdbcUrl() sets the database URL, setMaximumPoolSize() limits connections.',
        'HikariDataSource wraps the config; getConnection() borrows from the pool.',
      ],
      concepts: ['connection-pooling', 'hikaricp', 'datasource'],
    },
    {
      id: 'java-jdbc-16',
      title: 'Savepoints in Transactions',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method that uses savepoints to partially rollback a transaction. Insert three users; if the third insert fails, rollback to after the second insert and still commit the first two.',
      skeleton: `public void insertUsersWithSavepoint(Connection conn, String u1, String u2, String u3)
        throws SQLException {
    // Use savepoints to partially rollback if the third insert fails
}`,
      solution: `public void insertUsersWithSavepoint(Connection conn, String u1, String u2, String u3)
        throws SQLException {
    conn.setAutoCommit(false);
    String sql = "INSERT INTO users (name) VALUES (?)";
    try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, u1);
        ps.executeUpdate();

        ps.setString(1, u2);
        ps.executeUpdate();

        Savepoint sp = conn.setSavepoint("afterSecond");

        try {
            ps.setString(1, u3);
            ps.executeUpdate();
        } catch (SQLException e) {
            conn.rollback(sp);
        }

        conn.commit();
    } catch (SQLException e) {
        conn.rollback();
        throw e;
    }
}`,
      hints: [
        'Create a Savepoint after the second insert with conn.setSavepoint("name").',
        'Wrap the third insert in its own try-catch; on failure, rollback to the savepoint.',
        'After the inner try-catch, commit the transaction to persist the first two rows.',
      ],
      concepts: ['savepoint', 'partial-rollback', 'transactions'],
    },
    {
      id: 'java-jdbc-17',
      title: 'Fix the Batch with Transaction Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'java',
      goal: 'This batch insert can leave partial data on failure. Fix it to be transactional.',
      skeleton: `public void batchInsert(Connection conn, List<String> items) throws SQLException {
    String sql = "INSERT INTO items (name) VALUES (?)";
    try (PreparedStatement ps = conn.prepareStatement(sql)) {
        for (String item : items) {
            ps.setString(1, item);
            ps.addBatch();
        }
        ps.executeBatch();
    }
}`,
      solution: `public void batchInsert(Connection conn, List<String> items) throws SQLException {
    boolean wasAutoCommit = conn.getAutoCommit();
    conn.setAutoCommit(false);
    String sql = "INSERT INTO items (name) VALUES (?)";
    try (PreparedStatement ps = conn.prepareStatement(sql)) {
        for (String item : items) {
            ps.setString(1, item);
            ps.addBatch();
        }
        ps.executeBatch();
        conn.commit();
    } catch (SQLException e) {
        conn.rollback();
        throw e;
    } finally {
        conn.setAutoCommit(wasAutoCommit);
    }
}`,
      hints: [
        'Without a transaction, partial batch inserts persist even if executeBatch fails midway.',
        'Wrap the batch in a transaction: setAutoCommit(false), commit on success, rollback on failure.',
        'Restore the original autoCommit state in a finally block.',
      ],
      concepts: ['batch-transaction', 'atomicity', 'auto-commit'],
    },
    {
      id: 'java-jdbc-18',
      title: 'Predict Batch Execution Output',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Predict the contents of the result array from executeBatch().',
      skeleton: `String sql = "INSERT INTO logs (msg) VALUES (?)";
try (PreparedStatement ps = conn.prepareStatement(sql)) {
    ps.setString(1, "A"); ps.addBatch();
    ps.setString(1, "B"); ps.addBatch();
    ps.setString(1, "C"); ps.addBatch();
    int[] results = ps.executeBatch();
    System.out.println(Arrays.toString(results));
}
// Assume all inserts succeed and the driver returns standard update counts.`,
      solution: `[1, 1, 1]`,
      hints: [
        'executeBatch() returns an int array with one entry per batch statement.',
        'Each successful INSERT affects exactly 1 row.',
        'The array contains three 1s, one for each insert.',
      ],
      concepts: ['batch-results', 'execute-batch', 'update-count'],
    },
    {
      id: 'java-jdbc-19',
      title: 'Generic Row Mapper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a generic query method that accepts a SQL string, a RowMapper functional interface, and returns a List of mapped objects. Define the RowMapper interface.',
      skeleton: `// Define the RowMapper interface and the query method

public class JdbcTemplate {
    private final Connection conn;

    public JdbcTemplate(Connection conn) {
        this.conn = conn;
    }

    // Define: @FunctionalInterface interface RowMapper<T>
    // with method: T map(ResultSet rs) throws SQLException

    // Write: <T> List<T> query(String sql, RowMapper<T> mapper)
}`,
      solution: `public class JdbcTemplate {
    private final Connection conn;

    public JdbcTemplate(Connection conn) {
        this.conn = conn;
    }

    @FunctionalInterface
    public interface RowMapper<T> {
        T map(ResultSet rs) throws SQLException;
    }

    public <T> List<T> query(String sql, RowMapper<T> mapper) throws SQLException {
        try (PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            List<T> results = new ArrayList<>();
            while (rs.next()) {
                results.add(mapper.map(rs));
            }
            return results;
        }
    }
}`,
      hints: [
        'RowMapper is a functional interface with a single method that takes a ResultSet.',
        'The query method iterates the ResultSet and applies the mapper to each row.',
        'Use try-with-resources for PreparedStatement and ResultSet.',
      ],
      concepts: ['row-mapper', 'functional-interface', 'generics', 'template-method'],
    },
    {
      id: 'java-jdbc-20',
      title: 'Refactor to Repository Pattern',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor this inline JDBC code into a proper UserRepository class with findAll(), findById(), save(), and delete() methods. Use try-with-resources and PreparedStatement throughout.',
      skeleton: `// Current inline code scattered in a service:
public class UserService {
    private Connection conn;

    public void doStuff() throws SQLException {
        // Find all
        Statement s = conn.createStatement();
        ResultSet rs = s.executeQuery("SELECT * FROM users");
        while (rs.next()) { /* ... */ }

        // Find by ID
        Statement s2 = conn.createStatement();
        ResultSet rs2 = s2.executeQuery("SELECT * FROM users WHERE id = " + someId);

        // Save
        Statement s3 = conn.createStatement();
        s3.executeUpdate("INSERT INTO users (name, email) VALUES ('" + name + "', '" + email + "')");

        // Delete
        Statement s4 = conn.createStatement();
        s4.executeUpdate("DELETE FROM users WHERE id = " + id);
    }
}`,
      solution: `public class UserRepository {
    private final Connection conn;

    public UserRepository(Connection conn) {
        this.conn = conn;
    }

    public record User(int id, String name, String email) {}

    public List<User> findAll() throws SQLException {
        String sql = "SELECT id, name, email FROM users";
        try (PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            List<User> users = new ArrayList<>();
            while (rs.next()) {
                users.add(new User(rs.getInt("id"), rs.getString("name"), rs.getString("email")));
            }
            return users;
        }
    }

    public Optional<User> findById(int id) throws SQLException {
        String sql = "SELECT id, name, email FROM users WHERE id = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(new User(rs.getInt("id"), rs.getString("name"), rs.getString("email")));
                }
                return Optional.empty();
            }
        }
    }

    public int save(String name, String email) throws SQLException {
        String sql = "INSERT INTO users (name, email) VALUES (?, ?)";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, name);
            ps.setString(2, email);
            return ps.executeUpdate();
        }
    }

    public int delete(int id) throws SQLException {
        String sql = "DELETE FROM users WHERE id = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            return ps.executeUpdate();
        }
    }
}`,
      hints: [
        'Extract each operation into its own method with a clear name.',
        'Replace Statement with PreparedStatement and parameterize all inputs.',
        'Use try-with-resources for every PreparedStatement and ResultSet.',
      ],
      concepts: ['repository-pattern', 'refactoring', 'prepared-statement', 'resource-management'],
    },
  ],
};
