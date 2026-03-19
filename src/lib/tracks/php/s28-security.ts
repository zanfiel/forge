import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-security',
  title: '28. Security',
  explanation: `## Security in PHP

Web security is critical for PHP applications. Common vulnerabilities include XSS, SQL injection, and CSRF. PHP provides built-in functions for password hashing, input sanitization, and output escaping.

### XSS Prevention
\`\`\`php
<?php
// NEVER trust user input in HTML output
\\\$name = \\\$_GET['name']; // Could be: <script>alert('XSS')</script>

// Always escape output
echo htmlspecialchars(\\\$name, ENT_QUOTES, 'UTF-8');
\`\`\`

### SQL Injection Prevention
\`\`\`php
<?php
// NEVER concatenate user input into SQL
// BAD: "SELECT * FROM users WHERE id = \\\$id"

// Use prepared statements
\\\$stmt = \\\$pdo->prepare('SELECT * FROM users WHERE id = ?');
\\\$stmt->execute([\\\$id]);

// Named parameters
\\\$stmt = \\\$pdo->prepare('SELECT * FROM users WHERE email = :email');
\\\$stmt->execute(['email' => \\\$email]);
\`\`\`

### Password Hashing
\`\`\`php
<?php
// Hash a password (uses bcrypt by default)
\\\$hash = password_hash(\\\$password, PASSWORD_DEFAULT);

// Verify a password
if (password_verify(\\\$inputPassword, \\\$storedHash)) {
    echo "Login successful";
}

// Check if rehash needed (algorithm upgrade)
if (password_needs_rehash(\\\$hash, PASSWORD_DEFAULT)) {
    \\\$newHash = password_hash(\\\$password, PASSWORD_DEFAULT);
}
\`\`\`

### CSRF Protection
\`\`\`php
<?php
session_start();
// Generate token
\\\$token = bin2hex(random_bytes(32));
\\\$_SESSION['csrf_token'] = \\\$token;

// In form: <input type="hidden" name="token" value="<?= \\\$token ?>">

// Validate on submit
if (!hash_equals(\\\$_SESSION['csrf_token'], \\\$_POST['token'])) {
    die('CSRF token mismatch');
}
\`\`\`

### Input Sanitization
\`\`\`php
<?php
\\\$email = filter_var(\\\$input, FILTER_SANITIZE_EMAIL);
\\\$url = filter_var(\\\$input, FILTER_SANITIZE_URL);
\\\$int = filter_var(\\\$input, FILTER_SANITIZE_NUMBER_INT);
\`\`\``,
  exercises: [
    {
      id: 'php-security-1',
      title: 'Escape Output for HTML',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to safely display user input in HTML.',
      skeleton: `<?php
\\\$username = \\\$_GET['user'];
echo "Welcome, " . ___(\\\$username, ENT_QUOTES, 'UTF-8');`,
      solution: `<?php
\\\$username = \\\$_GET['user'];
echo "Welcome, " . htmlspecialchars(\\\$username, ENT_QUOTES, 'UTF-8');`,
      hints: [
        'User input must be escaped before displaying in HTML',
        'PHP has a function that converts special characters to HTML entities',
        'Use htmlspecialchars()',
      ],
      concepts: ['XSS-prevention', 'htmlspecialchars'],
    },
    {
      id: 'php-security-2',
      title: 'Hash a Password',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to securely hash a user password.',
      skeleton: `<?php
\\\$password = \\\$_POST['password'];
\\\$hash = ___(\\\$password, PASSWORD_DEFAULT);`,
      solution: `<?php
\\\$password = \\\$_POST['password'];
\\\$hash = password_hash(\\\$password, PASSWORD_DEFAULT);`,
      hints: [
        'PHP has a built-in function for secure password hashing',
        'It uses bcrypt by default with PASSWORD_DEFAULT',
        'The function is password_hash()',
      ],
      concepts: ['password-hashing', 'bcrypt'],
    },
    {
      id: 'php-security-3',
      title: 'Verify a Password',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to verify a submitted password against a stored hash.',
      skeleton: `<?php
\\\$input = \\\$_POST['password'];
\\\$storedHash = getHashFromDatabase();
if (___(\\\$input, \\\$storedHash)) {
    echo "Login successful";
}`,
      solution: `<?php
\\\$input = \\\$_POST['password'];
\\\$storedHash = getHashFromDatabase();
if (password_verify(\\\$input, \\\$storedHash)) {
    echo "Login successful";
}`,
      hints: [
        'Never compare hashes directly with ===',
        'PHP has a dedicated function for password verification',
        'Use password_verify(plaintext, hash)',
      ],
      concepts: ['password-verification', 'authentication'],
    },
    {
      id: 'php-security-4',
      title: 'Prepared Statement with Positional Params',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to create a prepared statement that prevents SQL injection.',
      skeleton: `<?php
\\\$id = \\\$_GET['id'];
\\\$stmt = \\\$pdo->___(___);
\\\$stmt->execute([\\\$id]);
\\\$user = \\\$stmt->fetch();`,
      solution: `<?php
\\\$id = \\\$_GET['id'];
\\\$stmt = \\\$pdo->prepare('SELECT * FROM users WHERE id = ?');
\\\$stmt->execute([\\\$id]);
\\\$user = \\\$stmt->fetch();`,
      hints: [
        'Use prepare() to create a prepared statement',
        'Use ? as a placeholder for values',
        'Pass values in execute() as an array',
      ],
      concepts: ['SQL-injection', 'prepared-statements'],
    },
    {
      id: 'php-security-5',
      title: 'Generate CSRF Token',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to generate a cryptographically secure CSRF token.',
      skeleton: `<?php
session_start();
\\\$token = ___(random_bytes(32));
\\\$_SESSION['csrf_token'] = \\\$token;`,
      solution: `<?php
session_start();
\\\$token = bin2hex(random_bytes(32));
\\\$_SESSION['csrf_token'] = \\\$token;`,
      hints: [
        'random_bytes() generates cryptographic random data',
        'The raw bytes need to be converted to a readable format',
        'bin2hex() converts binary data to hexadecimal string',
      ],
      concepts: ['CSRF-protection', 'random-bytes'],
    },
    {
      id: 'php-security-6',
      title: 'Timing-Safe Token Comparison',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to compare CSRF tokens in a timing-safe manner.',
      skeleton: `<?php
\\\$submitted = \\\$_POST['token'];
\\\$stored = \\\$_SESSION['csrf_token'];
if (___(\\\$stored, \\\$submitted)) {
    echo "Token valid";
}`,
      solution: `<?php
\\\$submitted = \\\$_POST['token'];
\\\$stored = \\\$_SESSION['csrf_token'];
if (hash_equals(\\\$stored, \\\$submitted)) {
    echo "Token valid";
}`,
      hints: [
        'Regular string comparison (===) is vulnerable to timing attacks',
        'PHP has a function for constant-time string comparison',
        'Use hash_equals() with the known value first',
      ],
      concepts: ['CSRF-protection', 'timing-attacks'],
    },
    {
      id: 'php-security-7',
      title: 'Secure Login Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function authenticateUser that takes a PDO instance, email, and password. Queries the user by email with a prepared statement and verifies the password hash. Returns the user array or null.',
      skeleton: `<?php
function authenticateUser(PDO \\\$pdo, string \\\$email, string \\\$password): ?array {
    // Query user by email using prepared statement
    // Verify password with password_verify
    // Return user data or null
}`,
      solution: `<?php
function authenticateUser(PDO \\\$pdo, string \\\$email, string \\\$password): ?array {
    \\\$stmt = \\\$pdo->prepare('SELECT * FROM users WHERE email = ?');
    \\\$stmt->execute([\\\$email]);
    \\\$user = \\\$stmt->fetch(PDO::FETCH_ASSOC);
    if (\\\$user && password_verify(\\\$password, \\\$user['password_hash'])) {
        return \\\$user;
    }
    return null;
}`,
      hints: [
        'Always use prepared statements for queries with user input',
        'Use password_verify to check the password against the hash',
        'Return null if no user found or password does not match',
      ],
      concepts: ['authentication', 'prepared-statements', 'password-verification'],
    },
    {
      id: 'php-security-8',
      title: 'Input Sanitizer Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a class Sanitizer with static methods: email(), url(), and html() that sanitize inputs using appropriate filter_var constants.',
      skeleton: `<?php
class Sanitizer {
    // email(): sanitize email address
    // url(): sanitize URL
    // html(): encode HTML special characters
}`,
      solution: `<?php
class Sanitizer {
    public static function email(string \\\$input): string {
        return filter_var(\\\$input, FILTER_SANITIZE_EMAIL);
    }

    public static function url(string \\\$input): string {
        return filter_var(\\\$input, FILTER_SANITIZE_URL);
    }

    public static function html(string \\\$input): string {
        return htmlspecialchars(\\\$input, ENT_QUOTES, 'UTF-8');
    }
}`,
      hints: [
        'Use filter_var with FILTER_SANITIZE_EMAIL for emails',
        'Use filter_var with FILTER_SANITIZE_URL for URLs',
        'Use htmlspecialchars for HTML output escaping',
      ],
      concepts: ['sanitization', 'filter_var', 'static-methods'],
    },
    {
      id: 'php-security-9',
      title: 'CSRF Middleware Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function csrfProtect that checks if the request is POST, validates the CSRF token, and throws an exception on mismatch. It should also regenerate the token after validation.',
      skeleton: `<?php
function csrfProtect(): void {
    // Only check on POST requests
    // Compare submitted token with session token
    // Throw RuntimeException on mismatch
    // Regenerate token on success
}`,
      solution: `<?php
function csrfProtect(): void {
    if (\\\$_SERVER['REQUEST_METHOD'] !== 'POST') {
        return;
    }
    \\\$submitted = \\\$_POST['csrf_token'] ?? '';
    \\\$stored = \\\$_SESSION['csrf_token'] ?? '';
    if (empty(\\\$stored) || !hash_equals(\\\$stored, \\\$submitted)) {
        throw new RuntimeException('CSRF token validation failed');
    }
    \\\$_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}`,
      hints: [
        'CSRF protection only applies to state-changing methods (POST)',
        'Use hash_equals for timing-safe comparison',
        'Regenerate the token after each successful validation',
      ],
      concepts: ['CSRF-protection', 'middleware'],
    },
    {
      id: 'php-security-10',
      title: 'Secure Session Handler',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function initSecureSession that starts a session with secure settings: httponly cookies, secure flag, samesite strict, and regenerates the session ID.',
      skeleton: `<?php
function initSecureSession(): void {
    // Set secure session cookie parameters
    // Start the session
    // Regenerate session ID
}`,
      solution: `<?php
function initSecureSession(): void {
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'domain' => '',
        'secure' => true,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_start();
    session_regenerate_id(true);
}`,
      hints: [
        'Use session_set_cookie_params() with an options array',
        'httponly prevents JavaScript from accessing the cookie',
        'session_regenerate_id(true) deletes the old session',
      ],
      concepts: ['session-security', 'cookie-settings'],
    },
    {
      id: 'php-security-11',
      title: 'Rate Limiter Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function checkRateLimit that uses \$_SESSION to track request counts per minute. Takes a max requests parameter. Returns true if allowed, false if rate limited.',
      skeleton: `<?php
function checkRateLimit(int \\\$maxPerMinute): bool {
    // Track requests in \\\$_SESSION with timestamps
    // Remove entries older than 60 seconds
    // Check if count exceeds max
    // Add current timestamp if allowed
}`,
      solution: `<?php
function checkRateLimit(int \\\$maxPerMinute): bool {
    \\\$now = time();
    if (!isset(\\\$_SESSION['rate_limit'])) {
        \\\$_SESSION['rate_limit'] = [];
    }
    \\\$_SESSION['rate_limit'] = array_filter(
        \\\$_SESSION['rate_limit'],
        fn(\\\$ts) => (\\\$now - \\\$ts) < 60
    );
    if (count(\\\$_SESSION['rate_limit']) >= \\\$maxPerMinute) {
        return false;
    }
    \\\$_SESSION['rate_limit'][] = \\\$now;
    return true;
}`,
      hints: [
        'Store an array of timestamps in the session',
        'Filter out timestamps older than 60 seconds',
        'Compare the remaining count against the limit',
      ],
      concepts: ['rate-limiting', 'session-storage'],
    },
    {
      id: 'php-security-12',
      title: 'Content Security Policy Builder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function sendCSP that takes an associative array of CSP directives and sends the Content-Security-Policy header.',
      skeleton: `<?php
function sendCSP(array \\\$directives): void {
    // Convert ['default-src' => "'self'", 'script-src' => "'self' cdn.example.com"]
    // To: "default-src 'self'; script-src 'self' cdn.example.com"
    // Send as Content-Security-Policy header
}`,
      solution: `<?php
function sendCSP(array \\\$directives): void {
    \\\$parts = [];
    foreach (\\\$directives as \\\$directive => \\\$value) {
        \\\$parts[] = "\\\$directive \\\$value";
    }
    header('Content-Security-Policy: ' . implode('; ', \\\$parts));
}`,
      hints: [
        'CSP directives are separated by semicolons',
        'Each directive is "name value1 value2"',
        'Use implode to join the parts',
      ],
      concepts: ['CSP', 'headers', 'XSS-prevention'],
    },
    {
      id: 'php-security-13',
      title: 'Fix SQL Injection Vulnerability',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the SQL injection vulnerability in this query.',
      skeleton: `<?php
\\\$username = \\\$_POST['username'];
\\\$password = \\\$_POST['password'];
\\\$sql = "SELECT * FROM users WHERE username = '\\\$username' AND password = '\\\$password'";
\\\$result = \\\$pdo->query(\\\$sql);`,
      solution: `<?php
\\\$username = \\\$_POST['username'];
\\\$password = \\\$_POST['password'];
\\\$stmt = \\\$pdo->prepare('SELECT * FROM users WHERE username = ? AND password_hash = ?');
\\\$stmt->execute([\\\$username, \\\$password]);
\\\$result = \\\$stmt;`,
      hints: [
        'Never concatenate user input into SQL strings',
        'Use prepared statements with placeholders',
        'Replace query() with prepare() and execute()',
      ],
      concepts: ['SQL-injection', 'prepared-statements'],
    },
    {
      id: 'php-security-14',
      title: 'Fix Weak Password Storage',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the insecure password storage that uses MD5.',
      skeleton: `<?php
function registerUser(PDO \\\$pdo, string \\\$email, string \\\$password): void {
    \\\$hash = md5(\\\$password);
    \\\$stmt = \\\$pdo->prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)');
    \\\$stmt->execute([\\\$email, \\\$hash]);
}

function loginUser(PDO \\\$pdo, string \\\$email, string \\\$password): bool {
    \\\$stmt = \\\$pdo->prepare('SELECT password_hash FROM users WHERE email = ?');
    \\\$stmt->execute([\\\$email]);
    \\\$user = \\\$stmt->fetch();
    return \\\$user && md5(\\\$password) === \\\$user['password_hash'];
}`,
      solution: `<?php
function registerUser(PDO \\\$pdo, string \\\$email, string \\\$password): void {
    \\\$hash = password_hash(\\\$password, PASSWORD_DEFAULT);
    \\\$stmt = \\\$pdo->prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)');
    \\\$stmt->execute([\\\$email, \\\$hash]);
}

function loginUser(PDO \\\$pdo, string \\\$email, string \\\$password): bool {
    \\\$stmt = \\\$pdo->prepare('SELECT password_hash FROM users WHERE email = ?');
    \\\$stmt->execute([\\\$email]);
    \\\$user = \\\$stmt->fetch();
    return \\\$user && password_verify(\\\$password, \\\$user['password_hash']);
}`,
      hints: [
        'MD5 is not suitable for password hashing',
        'Use password_hash() with PASSWORD_DEFAULT',
        'Use password_verify() to check passwords',
      ],
      concepts: ['password-hashing', 'MD5-vulnerability'],
    },
    {
      id: 'php-security-15',
      title: 'Fix XSS in Template',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the XSS vulnerability in this HTML template.',
      skeleton: `<?php
\\\$name = \\\$_GET['name'];
\\\$comment = \\\$_POST['comment'];
?>
<h1>Hello, <?= \\\$name ?></h1>
<p><?= \\\$comment ?></p>`,
      solution: `<?php
\\\$name = \\\$_GET['name'];
\\\$comment = \\\$_POST['comment'];
?>
<h1>Hello, <?= htmlspecialchars(\\\$name, ENT_QUOTES, 'UTF-8') ?></h1>
<p><?= htmlspecialchars(\\\$comment, ENT_QUOTES, 'UTF-8') ?></p>`,
      hints: [
        'User input displayed in HTML can execute scripts',
        'Wrap all user input with htmlspecialchars()',
        'Always use ENT_QUOTES and UTF-8 charset',
      ],
      concepts: ['XSS-prevention', 'output-escaping'],
    },
    {
      id: 'php-security-16',
      title: 'Predict password_hash Behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict whether two calls to password_hash with the same input produce the same output.',
      skeleton: `<?php
\\\$hash1 = password_hash('secret', PASSWORD_DEFAULT);
\\\$hash2 = password_hash('secret', PASSWORD_DEFAULT);
var_dump(\\\$hash1 === \\\$hash2);`,
      solution: `bool(false)`,
      hints: [
        'password_hash generates a random salt each time',
        'Even with the same password, the hashes differ',
        'This is why you must use password_verify to compare',
      ],
      concepts: ['password-hashing', 'salting'],
    },
    {
      id: 'php-security-17',
      title: 'Predict password_verify Result',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the output of password_verify against a correct hash.',
      skeleton: `<?php
\\\$hash = password_hash('mypassword', PASSWORD_DEFAULT);
var_dump(password_verify('mypassword', \\\$hash));
var_dump(password_verify('wrongpassword', \\\$hash));`,
      solution: `bool(true)
bool(false)`,
      hints: [
        'password_verify checks the plaintext against the hash',
        'The correct password returns true',
        'A wrong password returns false',
      ],
      concepts: ['password-verification'],
    },
    {
      id: 'php-security-18',
      title: 'Predict htmlspecialchars Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the output of double-encoding with htmlspecialchars.',
      skeleton: `<?php
\\\$input = '5 > 3 & 2 < 4';
\\\$once = htmlspecialchars(\\\$input, ENT_QUOTES, 'UTF-8');
echo \\\$once;`,
      solution: `5 &gt; 3 &amp; 2 &lt; 4`,
      hints: [
        'htmlspecialchars converts >, <, and & to entities',
        '> becomes &gt;, < becomes &lt;, & becomes &amp;',
        'Numbers and spaces are not affected',
      ],
      concepts: ['htmlspecialchars', 'entity-encoding'],
    },
    {
      id: 'php-security-19',
      title: 'Refactor to Parameterized Queries',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor all raw SQL queries to use prepared statements with named parameters.',
      skeleton: `<?php
function searchUsers(PDO \\\$pdo, string \\\$name, string \\\$role): array {
    \\\$sql = "SELECT * FROM users WHERE name LIKE '%\\\$name%' AND role = '\\\$role'";
    \\\$result = \\\$pdo->query(\\\$sql);
    return \\\$result->fetchAll();
}

function deleteUser(PDO \\\$pdo, int \\\$id): void {
    \\\$pdo->exec("DELETE FROM users WHERE id = \\\$id");
}

function updateEmail(PDO \\\$pdo, int \\\$id, string \\\$email): void {
    \\\$pdo->exec("UPDATE users SET email = '\\\$email' WHERE id = \\\$id");
}`,
      solution: `<?php
function searchUsers(PDO \\\$pdo, string \\\$name, string \\\$role): array {
    \\\$stmt = \\\$pdo->prepare('SELECT * FROM users WHERE name LIKE :name AND role = :role');
    \\\$stmt->execute(['name' => "%\\\$name%", 'role' => \\\$role]);
    return \\\$stmt->fetchAll();
}

function deleteUser(PDO \\\$pdo, int \\\$id): void {
    \\\$stmt = \\\$pdo->prepare('DELETE FROM users WHERE id = :id');
    \\\$stmt->execute(['id' => \\\$id]);
}

function updateEmail(PDO \\\$pdo, int \\\$id, string \\\$email): void {
    \\\$stmt = \\\$pdo->prepare('UPDATE users SET email = :email WHERE id = :id');
    \\\$stmt->execute(['email' => \\\$email, 'id' => \\\$id]);
}`,
      hints: [
        'Replace all string concatenation with named placeholders like :name',
        'Use prepare() + execute() instead of query() or exec()',
        'For LIKE queries, add % wildcards in the execute values',
      ],
      concepts: ['SQL-injection', 'prepared-statements', 'refactoring'],
    },
    {
      id: 'php-security-20',
      title: 'Refactor to Secure Output Helper',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the template to use a helper function e() for escaping, reducing repetition.',
      skeleton: `<?php
\\\$user = getUserData();
?>
<h1><?= htmlspecialchars(\\\$user['name'], ENT_QUOTES, 'UTF-8') ?></h1>
<p>Email: <?= htmlspecialchars(\\\$user['email'], ENT_QUOTES, 'UTF-8') ?></p>
<p>Bio: <?= htmlspecialchars(\\\$user['bio'], ENT_QUOTES, 'UTF-8') ?></p>
<p>Location: <?= htmlspecialchars(\\\$user['location'], ENT_QUOTES, 'UTF-8') ?></p>
<a href="<?= htmlspecialchars(\\\$user['website'], ENT_QUOTES, 'UTF-8') ?>">Website</a>`,
      solution: `<?php
function e(string \\\$value): string {
    return htmlspecialchars(\\\$value, ENT_QUOTES, 'UTF-8');
}

\\\$user = getUserData();
?>
<h1><?= e(\\\$user['name']) ?></h1>
<p>Email: <?= e(\\\$user['email']) ?></p>
<p>Bio: <?= e(\\\$user['bio']) ?></p>
<p>Location: <?= e(\\\$user['location']) ?></p>
<a href="<?= e(\\\$user['website']) ?>">Website</a>`,
      hints: [
        'Create a short helper function for escaping',
        'The convention is to name it e() for brevity',
        'Replace all htmlspecialchars calls with the helper',
      ],
      concepts: ['XSS-prevention', 'helper-functions', 'refactoring'],
    },
  ],
};
