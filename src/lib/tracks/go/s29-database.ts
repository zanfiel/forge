import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-db',
  title: '29. Database',
  explanation: `## Database Access in Go

Go provides the \`database/sql\` package as a generic interface for SQL databases. Drivers are registered separately.

\`\`\`go
import (
    "database/sql"
    _ "github.com/lib/pq" // PostgreSQL driver
)

// Open connection
db, err := sql.Open("postgres", "host=localhost dbname=mydb sslmode=disable")
defer db.Close()

// Ping to verify
err = db.Ping()

// Query single row
var name string
err = db.QueryRow("SELECT name FROM users WHERE id = $1", 1).Scan(&name)

// Query multiple rows
rows, err := db.Query("SELECT id, name FROM users")
defer rows.Close()
for rows.Next() {
    var id int
    var name string
    rows.Scan(&id, &name)
}

// Execute (INSERT, UPDATE, DELETE)
result, err := db.Exec("INSERT INTO users (name) VALUES ($1)", "alice")
id, _ := result.LastInsertId()
affected, _ := result.RowsAffected()

// Prepared statements
stmt, err := db.Prepare("SELECT name FROM users WHERE id = $1")
defer stmt.Close()
stmt.QueryRow(1).Scan(&name)

// Transactions
tx, err := db.Begin()
tx.Exec("UPDATE accounts SET balance = balance - 100 WHERE id = 1")
tx.Exec("UPDATE accounts SET balance = balance + 100 WHERE id = 2")
tx.Commit() // or tx.Rollback()
\`\`\``,
  exercises: [
    {
      id: 'go-db-1',
      title: 'Open Database',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Open a database connection using database/sql.',
      skeleton: `package main

import (
    "database/sql"
    _ "github.com/lib/pq"
)

func main() {
    db, err := sql.__BLANK__("postgres", "host=localhost dbname=mydb sslmode=disable")
    if err != nil {
        panic(err)
    }
    defer db.Close()
}`,
      solution: `package main

import (
    "database/sql"
    _ "github.com/lib/pq"
)

func main() {
    db, err := sql.Open("postgres", "host=localhost dbname=mydb sslmode=disable")
    if err != nil {
        panic(err)
    }
    defer db.Close()
}`,
      hints: [
        'sql.Open creates a database handle but may not connect immediately.',
        'The first argument is the driver name.',
        'The second argument is the connection string.',
      ],
      concepts: ['sql.Open', 'database connection'],
    },
    {
      id: 'go-db-2',
      title: 'Ping Database',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Verify the database connection is alive.',
      skeleton: `package main

import "database/sql"

func CheckDB(db *sql.DB) error {
    return db.__BLANK__()
}`,
      solution: `package main

import "database/sql"

func CheckDB(db *sql.DB) error {
    return db.Ping()
}`,
      hints: [
        'db.Ping() verifies a connection to the database.',
        'sql.Open does not actually connect; Ping does.',
        'Returns an error if the database is unreachable.',
      ],
      concepts: ['db.Ping', 'connection verification'],
    },
    {
      id: 'go-db-3',
      title: 'QueryRow and Scan',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Query a single row and scan the result into variables.',
      skeleton: `package main

import "database/sql"

func GetUserName(db *sql.DB, id int) (string, error) {
    var name string
    err := db.__BLANK__("SELECT name FROM users WHERE id = $1", id).__BLANK__(&name)
    return name, err
}`,
      solution: `package main

import "database/sql"

func GetUserName(db *sql.DB, id int) (string, error) {
    var name string
    err := db.QueryRow("SELECT name FROM users WHERE id = $1", id).Scan(&name)
    return name, err
}`,
      hints: [
        'db.QueryRow returns a single row.',
        '.Scan reads column values into variables.',
        'Returns sql.ErrNoRows if no row matches.',
      ],
      concepts: ['QueryRow', 'Scan'],
    },
    {
      id: 'go-db-4',
      title: 'Query Multiple Rows',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Query multiple rows and iterate over the results.',
      skeleton: `package main

import "database/sql"

type User struct {
    ID   int
    Name string
}

func GetUsers(db *sql.DB) ([]User, error) {
    rows, err := db.__BLANK__("SELECT id, name FROM users")
    if err != nil {
        return nil, err
    }
    defer rows.__BLANK__()

    var users []User
    for rows.__BLANK__() {
        var u User
        if err := rows.Scan(&u.ID, &u.Name); err != nil {
            return nil, err
        }
        users = append(users, u)
    }
    return users, rows.Err()
}`,
      solution: `package main

import "database/sql"

type User struct {
    ID   int
    Name string
}

func GetUsers(db *sql.DB) ([]User, error) {
    rows, err := db.Query("SELECT id, name FROM users")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var users []User
    for rows.Next() {
        var u User
        if err := rows.Scan(&u.ID, &u.Name); err != nil {
            return nil, err
        }
        users = append(users, u)
    }
    return users, rows.Err()
}`,
      hints: [
        'db.Query returns *sql.Rows for multiple results.',
        'Always defer rows.Close() to free resources.',
        'rows.Next() advances to the next row, returns false at end.',
      ],
      concepts: ['db.Query', 'rows.Next', 'rows.Close'],
    },
    {
      id: 'go-db-5',
      title: 'Exec Insert',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Insert a row using db.Exec.',
      skeleton: `package main

import "database/sql"

func CreateUser(db *sql.DB, name, email string) (int64, error) {
    result, err := db.__BLANK__("INSERT INTO users (name, email) VALUES ($1, $2)", name, email)
    if err != nil {
        return 0, err
    }
    return result.RowsAffected()
}`,
      solution: `package main

import "database/sql"

func CreateUser(db *sql.DB, name, email string) (int64, error) {
    result, err := db.Exec("INSERT INTO users (name, email) VALUES ($1, $2)", name, email)
    if err != nil {
        return 0, err
    }
    return result.RowsAffected()
}`,
      hints: [
        'db.Exec is for statements that do not return rows.',
        'INSERT, UPDATE, DELETE all use Exec.',
        'result.RowsAffected() tells how many rows were changed.',
      ],
      concepts: ['db.Exec', 'RowsAffected'],
    },
    {
      id: 'go-db-6',
      title: 'Prepared Statement',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Create and use a prepared statement.',
      skeleton: `package main

import "database/sql"

func FindUsers(db *sql.DB, names []string) ([]string, error) {
    stmt, err := db.__BLANK__("SELECT email FROM users WHERE name = $1")
    if err != nil {
        return nil, err
    }
    defer stmt.Close()

    var emails []string
    for _, name := range names {
        var email string
        err := stmt.QueryRow(name).Scan(&email)
        if err != nil {
            continue
        }
        emails = append(emails, email)
    }
    return emails, nil
}`,
      solution: `package main

import "database/sql"

func FindUsers(db *sql.DB, names []string) ([]string, error) {
    stmt, err := db.Prepare("SELECT email FROM users WHERE name = $1")
    if err != nil {
        return nil, err
    }
    defer stmt.Close()

    var emails []string
    for _, name := range names {
        var email string
        err := stmt.QueryRow(name).Scan(&email)
        if err != nil {
            continue
        }
        emails = append(emails, email)
    }
    return emails, nil
}`,
      hints: [
        'db.Prepare creates a prepared statement for reuse.',
        'Prepared statements are parsed once and executed many times.',
        'Always defer stmt.Close() to free server resources.',
      ],
      concepts: ['db.Prepare', 'prepared statements'],
    },
    {
      id: 'go-db-7',
      title: 'Transaction',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that transfers money between accounts in a transaction.',
      skeleton: `package main

import "database/sql"

// Transfer moves amount from fromID to toID in a transaction
// Rollback on any error, commit on success
func Transfer(db *sql.DB, fromID, toID int, amount float64) error {
}`,
      solution: `package main

import "database/sql"

func Transfer(db *sql.DB, fromID, toID int, amount float64) error {
    tx, err := db.Begin()
    if err != nil {
        return err
    }
    defer tx.Rollback()

    _, err = tx.Exec("UPDATE accounts SET balance = balance - $1 WHERE id = $2", amount, fromID)
    if err != nil {
        return err
    }
    _, err = tx.Exec("UPDATE accounts SET balance = balance + $1 WHERE id = $2", amount, toID)
    if err != nil {
        return err
    }
    return tx.Commit()
}`,
      hints: [
        'db.Begin() starts a transaction.',
        'defer tx.Rollback() is safe; it is a no-op after Commit.',
        'Use tx.Exec instead of db.Exec inside a transaction.',
      ],
      concepts: ['transactions', 'Begin', 'Commit', 'Rollback'],
    },
    {
      id: 'go-db-8',
      title: 'Handle sql.ErrNoRows',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that handles the case when no rows are found.',
      skeleton: `package main

import (
    "database/sql"
    "errors"
)

// GetEmail returns the email for the given user ID
// Returns empty string and nil error if user not found
func GetEmail(db *sql.DB, id int) (string, error) {
}`,
      solution: `package main

import (
    "database/sql"
    "errors"
)

func GetEmail(db *sql.DB, id int) (string, error) {
    var email string
    err := db.QueryRow("SELECT email FROM users WHERE id = $1", id).Scan(&email)
    if errors.Is(err, sql.ErrNoRows) {
        return "", nil
    }
    return email, err
}`,
      hints: [
        'QueryRow.Scan returns sql.ErrNoRows when no row matches.',
        'Use errors.Is to check for specific error types.',
        'Distinguish "not found" from actual database errors.',
      ],
      concepts: ['sql.ErrNoRows', 'errors.Is', 'not found handling'],
    },
    {
      id: 'go-db-9',
      title: 'Context-Aware Query',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a query function that respects context cancellation.',
      skeleton: `package main

import (
    "context"
    "database/sql"
)

// GetUserCtx queries a user with context support for cancellation
func GetUserCtx(ctx context.Context, db *sql.DB, id int) (string, error) {
}`,
      solution: `package main

import (
    "context"
    "database/sql"
)

func GetUserCtx(ctx context.Context, db *sql.DB, id int) (string, error) {
    var name string
    err := db.QueryRowContext(ctx, "SELECT name FROM users WHERE id = $1", id).Scan(&name)
    return name, err
}`,
      hints: [
        'Use QueryRowContext instead of QueryRow for context support.',
        'The query is cancelled if the context expires.',
        'All database methods have Context variants.',
      ],
      concepts: ['QueryRowContext', 'context-aware queries'],
    },
    {
      id: 'go-db-10',
      title: 'Null Handling',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Handle nullable database columns using sql.NullString.',
      skeleton: `package main

import "database/sql"

type Profile struct {
    Name  string
    Bio   string // empty if NULL in database
}

// GetProfile reads a profile, handling nullable bio column
func GetProfile(db *sql.DB, id int) (Profile, error) {
}`,
      solution: `package main

import "database/sql"

type Profile struct {
    Name string
    Bio  string
}

func GetProfile(db *sql.DB, id int) (Profile, error) {
    var p Profile
    var bio sql.NullString
    err := db.QueryRow("SELECT name, bio FROM profiles WHERE id = $1", id).Scan(&p.Name, &bio)
    if err != nil {
        return Profile{}, err
    }
    if bio.Valid {
        p.Bio = bio.String
    }
    return p, nil
}`,
      hints: [
        'sql.NullString handles nullable string columns.',
        'Check .Valid to see if the value is non-NULL.',
        'There are also NullInt64, NullFloat64, NullBool, NullTime.',
      ],
      concepts: ['sql.NullString', 'NULL handling'],
    },
    {
      id: 'go-db-11',
      title: 'Predict QueryRow No Rows',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the error returned when QueryRow finds no matching rows.',
      skeleton: `package main

import "database/sql"

// db.QueryRow("SELECT name FROM users WHERE id = 99999").Scan(&name)
// Assuming no user with id 99999 exists, what error does Scan return?
// A) nil
// B) sql.ErrNoRows
// C) sql.ErrConnDone
// D) io.EOF`,
      solution: `B) sql.ErrNoRows`,
      hints: [
        'QueryRow always returns a Row, never nil.',
        'The error surfaces when you call Scan.',
        'sql.ErrNoRows specifically means no rows in the result set.',
      ],
      concepts: ['sql.ErrNoRows', 'QueryRow semantics'],
    },
    {
      id: 'go-db-12',
      title: 'Predict Rows Not Closed',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict what happens when rows.Close() is not called.',
      skeleton: `package main

import "database/sql"

func LeakyQuery(db *sql.DB) {
    rows, _ := db.Query("SELECT id FROM users")
    // rows.Close() is never called
    for rows.Next() {
        var id int
        rows.Scan(&id)
    }
}

// What happens if this function is called many times?
// A) Nothing, Go's GC handles it
// B) Connection leak, eventually runs out of connections
// C) Panic after 10 calls
// D) Data corruption`,
      solution: `B) Connection leak, eventually runs out of connections`,
      hints: [
        'Each unclosed rows holds a database connection.',
        'The connection pool has a limited number of connections.',
        'Eventually, new queries will block waiting for connections.',
      ],
      concepts: ['connection leak', 'rows.Close'],
    },
    {
      id: 'go-db-13',
      title: 'Predict Rollback After Commit',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict what happens when Rollback is called after Commit.',
      skeleton: `package main

import "database/sql"

func DoTx(db *sql.DB) error {
    tx, _ := db.Begin()
    tx.Exec("INSERT INTO logs (msg) VALUES ('test')")
    tx.Commit()
    return tx.Rollback() // What does this return?
}

// A) nil (rollback succeeds)
// B) sql.ErrTxDone
// C) Panic
// D) The INSERT is undone`,
      solution: `B) sql.ErrTxDone`,
      hints: [
        'After Commit, the transaction is done.',
        'Rollback after Commit returns sql.ErrTxDone.',
        'This is why defer tx.Rollback() is safe after Commit.',
      ],
      concepts: ['sql.ErrTxDone', 'transaction lifecycle'],
    },
    {
      id: 'go-db-14',
      title: 'Fix SQL Injection',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the SQL injection vulnerability by using parameterized queries.',
      skeleton: `package main

import (
    "database/sql"
    "fmt"
)

func FindUser(db *sql.DB, name string) (int, error) {
    query := fmt.Sprintf("SELECT id FROM users WHERE name = '%s'", name)
    var id int
    err := db.QueryRow(query).Scan(&id)
    return id, err
}`,
      solution: `package main

import "database/sql"

func FindUser(db *sql.DB, name string) (int, error) {
    var id int
    err := db.QueryRow("SELECT id FROM users WHERE name = $1", name).Scan(&id)
    return id, err
}`,
      hints: [
        'Never use fmt.Sprintf to build SQL queries with user input.',
        'Use parameterized queries with $1, $2, etc.',
        'The database driver handles escaping automatically.',
      ],
      concepts: ['SQL injection', 'parameterized queries', 'security'],
    },
    {
      id: 'go-db-15',
      title: 'Fix Missing rows.Close',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the function that leaks database connections by not closing rows.',
      skeleton: `package main

import "database/sql"

func GetIDs(db *sql.DB) ([]int, error) {
    rows, err := db.Query("SELECT id FROM users")
    if err != nil {
        return nil, err
    }
    var ids []int
    for rows.Next() {
        var id int
        rows.Scan(&id)
        ids = append(ids, id)
    }
    return ids, nil
}`,
      solution: `package main

import "database/sql"

func GetIDs(db *sql.DB) ([]int, error) {
    rows, err := db.Query("SELECT id FROM users")
    if err != nil {
        return nil, err
    }
    defer rows.Close()
    var ids []int
    for rows.Next() {
        var id int
        rows.Scan(&id)
        ids = append(ids, id)
    }
    return ids, rows.Err()
}`,
      hints: [
        'Always defer rows.Close() after db.Query.',
        'Also check rows.Err() after the loop.',
        'Missing Close leaks connections from the pool.',
      ],
      concepts: ['rows.Close', 'rows.Err', 'connection leak'],
    },
    {
      id: 'go-db-16',
      title: 'Fix Transaction Not Rolled Back',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix a transaction that is not rolled back on error.',
      skeleton: `package main

import "database/sql"

func UpdateBalance(db *sql.DB, id int, amount float64) error {
    tx, err := db.Begin()
    if err != nil {
        return err
    }
    _, err = tx.Exec("UPDATE accounts SET balance = balance + $1 WHERE id = $2", amount, id)
    if err != nil {
        return err // Transaction left open!
    }
    return tx.Commit()
}`,
      solution: `package main

import "database/sql"

func UpdateBalance(db *sql.DB, id int, amount float64) error {
    tx, err := db.Begin()
    if err != nil {
        return err
    }
    defer tx.Rollback()

    _, err = tx.Exec("UPDATE accounts SET balance = balance + $1 WHERE id = $2", amount, id)
    if err != nil {
        return err
    }
    return tx.Commit()
}`,
      hints: [
        'If Exec fails, the transaction is left open.',
        'Add defer tx.Rollback() right after Begin.',
        'Rollback after Commit is a no-op, so this is safe.',
      ],
      concepts: ['defer Rollback', 'transaction safety'],
    },
    {
      id: 'go-db-17',
      title: 'Write Connection Pool Config',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Configure connection pool settings for a database.',
      skeleton: `package main

import (
    "database/sql"
    "time"
)

// ConfigureDB sets connection pool limits:
// max open: 25, max idle: 5, max lifetime: 5 minutes
func ConfigureDB(db *sql.DB) {
}`,
      solution: `package main

import (
    "database/sql"
    "time"
)

func ConfigureDB(db *sql.DB) {
    db.SetMaxOpenConns(25)
    db.SetMaxIdleConns(5)
    db.SetConnMaxLifetime(5 * time.Minute)
}`,
      hints: [
        'SetMaxOpenConns limits total open connections.',
        'SetMaxIdleConns limits idle connections in the pool.',
        'SetConnMaxLifetime closes connections after a duration.',
      ],
      concepts: ['connection pool', 'SetMaxOpenConns', 'SetMaxIdleConns'],
    },
    {
      id: 'go-db-18',
      title: 'Write Batch Insert',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a function that inserts multiple rows in a single transaction.',
      skeleton: `package main

import "database/sql"

type User struct {
    Name  string
    Email string
}

// InsertUsers inserts multiple users in a single transaction
func InsertUsers(db *sql.DB, users []User) error {
}`,
      solution: `package main

import "database/sql"

type User struct {
    Name  string
    Email string
}

func InsertUsers(db *sql.DB, users []User) error {
    tx, err := db.Begin()
    if err != nil {
        return err
    }
    defer tx.Rollback()

    stmt, err := tx.Prepare("INSERT INTO users (name, email) VALUES ($1, $2)")
    if err != nil {
        return err
    }
    defer stmt.Close()

    for _, u := range users {
        _, err := stmt.Exec(u.Name, u.Email)
        if err != nil {
            return err
        }
    }
    return tx.Commit()
}`,
      hints: [
        'Use a transaction for atomicity.',
        'Prepare the statement once and execute for each row.',
        'This is more efficient than individual inserts.',
      ],
      concepts: ['batch insert', 'transaction', 'prepared statement'],
    },
    {
      id: 'go-db-19',
      title: 'Refactor to Use QueryRowContext',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Add context support to database queries for cancellation.',
      skeleton: `package main

import "database/sql"

func GetUser(db *sql.DB, id int) (string, string, error) {
    var name, email string
    err := db.QueryRow("SELECT name, email FROM users WHERE id = $1", id).Scan(&name, &email)
    return name, email, err
}`,
      solution: `package main

import (
    "context"
    "database/sql"
)

func GetUser(ctx context.Context, db *sql.DB, id int) (string, string, error) {
    var name, email string
    err := db.QueryRowContext(ctx, "SELECT name, email FROM users WHERE id = $1", id).Scan(&name, &email)
    return name, email, err
}`,
      hints: [
        'Add context.Context as the first parameter.',
        'Use QueryRowContext instead of QueryRow.',
        'All sql.DB methods have Context variants.',
      ],
      concepts: ['QueryRowContext', 'context propagation'],
    },
    {
      id: 'go-db-20',
      title: 'Refactor to Repository Pattern',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor raw SQL calls into a repository struct for testability.',
      skeleton: `package main

import "database/sql"

func GetUserName(db *sql.DB, id int) (string, error) {
    var name string
    err := db.QueryRow("SELECT name FROM users WHERE id = $1", id).Scan(&name)
    return name, err
}

func CreateUser(db *sql.DB, name string) error {
    _, err := db.Exec("INSERT INTO users (name) VALUES ($1)", name)
    return err
}`,
      solution: `package main

import "database/sql"

type UserRepository struct {
    db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
    return &UserRepository{db: db}
}

func (r *UserRepository) GetName(id int) (string, error) {
    var name string
    err := r.db.QueryRow("SELECT name FROM users WHERE id = $1", id).Scan(&name)
    return name, err
}

func (r *UserRepository) Create(name string) error {
    _, err := r.db.Exec("INSERT INTO users (name) VALUES ($1)", name)
    return err
}`,
      hints: [
        'Group related database operations in a repository struct.',
        'The struct holds the *sql.DB dependency.',
        'This pattern makes testing and mocking easier.',
      ],
      concepts: ['repository pattern', 'dependency injection', 'testability'],
    },
  ],
};
