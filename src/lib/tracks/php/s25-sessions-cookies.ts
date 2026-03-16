import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-session',
  title: '25. Sessions & Cookies',
  explanation: `## Sessions & Cookies in PHP

PHP provides built-in support for sessions and cookies to maintain state across HTTP requests.

### Sessions
\`\`\`php
<?php
session_start();

// Store data
\$_SESSION['user_id'] = 42;
\$_SESSION['username'] = 'Alice';

// Read data
echo \$_SESSION['username']; // "Alice"

// Remove a value
unset(\$_SESSION['user_id']);

// Destroy entire session
session_destroy();
\`\`\`

### Cookies
\`\`\`php
<?php
// Set a cookie (expires in 30 days)
setcookie('theme', 'dark', time() + 86400 * 30, '/');

// Read cookies
\$theme = \$_COOKIE['theme'] ?? 'light';

// Delete a cookie (set expiry in the past)
setcookie('theme', '', time() - 3600, '/');
\`\`\`

### Session Security
\`\`\`php
<?php
// Regenerate session ID (prevent fixation)
session_regenerate_id(true);

// Configure session settings
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);
ini_set('session.use_strict_mode', 1);
\`\`\`

### Flash Messages
\`\`\`php
<?php
// Set flash message
\$_SESSION['flash'] = 'Profile updated!';

// Display and clear flash
if (isset(\$_SESSION['flash'])) {
    echo \$_SESSION['flash'];
    unset(\$_SESSION['flash']);
}
\`\`\`

### Remember Me Pattern
\`\`\`php
<?php
// On login with "remember me"
\$token = bin2hex(random_bytes(32));
setcookie('remember_token', \$token, time() + 86400 * 30, '/', '', true, true);
// Store hashed token in database
\`\`\``,
  exercises: [
    {
      id: 'php-session-1',
      title: 'Start a Session',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to start a PHP session.',
      skeleton: `<?php
___;
\$_SESSION['name'] = 'Alice';`,
      solution: `<?php
session_start();
\$_SESSION['name'] = 'Alice';`,
      hints: [
        'session_start() initializes the session.',
        'It must be called before using $_SESSION.',
        'Call it at the top of the script.',
      ],
      concepts: ['session_start', 'session', 'initialization'],
    },
    {
      id: 'php-session-2',
      title: 'Set a Cookie',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to set a cookie named "lang" with value "en".',
      skeleton: `<?php
___(___);`,
      solution: `<?php
setcookie('lang', 'en', time() + 86400, '/');`,
      hints: [
        'setcookie() sets a cookie with name, value, and expiry.',
        'time() + 86400 sets it to expire in 1 day.',
        'The path "/" makes it available site-wide.',
      ],
      concepts: ['setcookie', 'cookie', 'expiry'],
    },
    {
      id: 'php-session-3',
      title: 'Read Session Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to safely read a session value with a default.',
      skeleton: `<?php
session_start();
\$user = ___['username'] ?? 'Guest';
echo "Hello, \$user";`,
      solution: `<?php
session_start();
\$user = \$_SESSION['username'] ?? 'Guest';
echo "Hello, \$user";`,
      hints: [
        '\$_SESSION is the superglobal for session data.',
        'Use ?? for a default when the key might not exist.',
        'Session data persists across page loads.',
      ],
      concepts: ['$_SESSION', 'null-coalescing', 'superglobal'],
    },
    {
      id: 'php-session-4',
      title: 'Delete a Cookie',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to delete a cookie by setting its expiry in the past.',
      skeleton: `<?php
setcookie('lang', '', ___, '/');`,
      solution: `<?php
setcookie('lang', '', time() - 3600, '/');`,
      hints: [
        'Set the expiry time in the past to delete a cookie.',
        'time() - 3600 is one hour ago.',
        'The browser will remove the expired cookie.',
      ],
      concepts: ['delete-cookie', 'expiry', 'time'],
    },
    {
      id: 'php-session-5',
      title: 'Regenerate Session ID',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to regenerate the session ID for security.',
      skeleton: `<?php
session_start();
// After successful login
\$_SESSION['user_id'] = 42;
___(true);`,
      solution: `<?php
session_start();
// After successful login
\$_SESSION['user_id'] = 42;
session_regenerate_id(true);`,
      hints: [
        'session_regenerate_id() creates a new session ID.',
        'Pass true to delete the old session file.',
        'This prevents session fixation attacks.',
      ],
      concepts: ['session_regenerate_id', 'security', 'fixation'],
    },
    {
      id: 'php-session-6',
      title: 'Destroy Session',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to completely destroy a session on logout.',
      skeleton: `<?php
session_start();
\$_SESSION = [];
setcookie(session_name(), '', time() - 42000, '/');
___;`,
      solution: `<?php
session_start();
\$_SESSION = [];
setcookie(session_name(), '', time() - 42000, '/');
session_destroy();`,
      hints: [
        'First clear the $_SESSION array.',
        'Delete the session cookie.',
        'Finally call session_destroy() to destroy the session file.',
      ],
      concepts: ['session_destroy', 'logout', 'cleanup'],
    },
    {
      id: 'php-session-7',
      title: 'Write a Flash Message System',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Write two functions: setFlash(string $message): void that stores a flash message in the session, and getFlash(): ?string that retrieves and removes it.',
      skeleton: `<?php
// Write setFlash and getFlash functions`,
      solution: `<?php
function setFlash(string \$message): void {
    \$_SESSION['flash'] = \$message;
}

function getFlash(): ?string {
    \$message = \$_SESSION['flash'] ?? null;
    unset(\$_SESSION['flash']);
    return \$message;
}`,
      hints: [
        'Store the message in $_SESSION["flash"].',
        'In getFlash, retrieve and then unset the key.',
        'Return null if no flash message exists.',
      ],
      concepts: ['flash-message', 'session', 'unset'],
    },
    {
      id: 'php-session-8',
      title: 'Write a Login Guard',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function requireAuth(): void that checks if $_SESSION["user_id"] is set. If not, set a 403 status code and exit with "Unauthorized".',
      skeleton: `<?php
// Write the requireAuth function`,
      solution: `<?php
function requireAuth(): void {
    if (!isset(\$_SESSION['user_id'])) {
        http_response_code(403);
        echo 'Unauthorized';
        exit;
    }
}`,
      hints: [
        'Check isset($_SESSION["user_id"]).',
        'Use http_response_code(403) for forbidden.',
        'Call exit to stop script execution.',
      ],
      concepts: ['authentication', 'guard', 'http_response_code'],
    },
    {
      id: 'php-session-9',
      title: 'Write Cookie Preferences Manager',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function setPreference(string $key, string $value, int $days): void that stores a preference as a cookie. Write getPreference(string $key, string $default): string that reads it.',
      skeleton: `<?php
// Write setPreference and getPreference functions`,
      solution: `<?php
function setPreference(string \$key, string \$value, int \$days): void {
    setcookie("pref_\$key", \$value, time() + 86400 * \$days, '/');
}

function getPreference(string \$key, string \$default): string {
    return \$_COOKIE["pref_\$key"] ?? \$default;
}`,
      hints: [
        'Prefix cookie names to avoid conflicts.',
        '86400 seconds = 1 day, multiply by $days.',
        'Use null coalescing for the default value.',
      ],
      concepts: ['cookie-preferences', 'setcookie', '$_COOKIE'],
    },
    {
      id: 'php-session-10',
      title: 'Write a Session Cart',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write functions addToCart(string $item, int $qty): void and getCart(): array that manage a shopping cart in the session.',
      skeleton: `<?php
// Write addToCart and getCart functions`,
      solution: `<?php
function addToCart(string \$item, int \$qty): void {
    if (!isset(\$_SESSION['cart'])) {
        \$_SESSION['cart'] = [];
    }
    \$_SESSION['cart'][\$item] = (\$_SESSION['cart'][\$item] ?? 0) + \$qty;
}

function getCart(): array {
    return \$_SESSION['cart'] ?? [];
}`,
      hints: [
        'Initialize the cart array if it does not exist.',
        'Add to existing quantity if item already in cart.',
        'Return empty array if cart does not exist.',
      ],
      concepts: ['session-cart', 'array', 'state-management'],
    },
    {
      id: 'php-session-11',
      title: 'Write Session Timeout Handler',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function checkSessionTimeout(int $maxIdle): bool that returns true if the session has been idle longer than $maxIdle seconds. Track last activity in the session.',
      skeleton: `<?php
// Write the checkSessionTimeout function`,
      solution: `<?php
function checkSessionTimeout(int \$maxIdle): bool {
    if (isset(\$_SESSION['last_activity'])) {
        if (time() - \$_SESSION['last_activity'] > \$maxIdle) {
            session_destroy();
            return true;
        }
    }
    \$_SESSION['last_activity'] = time();
    return false;
}`,
      hints: [
        'Store the last activity timestamp in the session.',
        'Compare current time against stored time.',
        'Destroy the session if idle too long.',
      ],
      concepts: ['session-timeout', 'idle-detection', 'security'],
    },
    {
      id: 'php-session-12',
      title: 'Write Remember Me Token Generator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function createRememberToken(): string that generates a cryptographically secure token, sets it as an httponly secure cookie for 30 days, and returns the token for database storage.',
      skeleton: `<?php
// Write the createRememberToken function`,
      solution: `<?php
function createRememberToken(): string {
    \$token = bin2hex(random_bytes(32));
    setcookie('remember_token', \$token, [
        'expires' => time() + 86400 * 30,
        'path' => '/',
        'secure' => true,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    return \$token;
}`,
      hints: [
        'Use random_bytes(32) for cryptographic randomness.',
        'bin2hex converts binary to a hex string.',
        'Use the array form of setcookie for security options.',
      ],
      concepts: ['remember-me', 'random_bytes', 'secure-cookie'],
    },
    {
      id: 'php-session-13',
      title: 'Fix Session Before Headers',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the error caused by output before session_start.',
      skeleton: `<?php
echo "Welcome!";
session_start();
\$_SESSION['visited'] = true;`,
      solution: `<?php
session_start();
\$_SESSION['visited'] = true;
echo "Welcome!";`,
      hints: [
        'session_start() sends headers and must come before output.',
        'Move session_start() before any echo or HTML.',
        'Headers cannot be sent after output has started.',
      ],
      concepts: ['headers-sent', 'session_start', 'output-order'],
    },
    {
      id: 'php-session-14',
      title: 'Fix Missing Session Start',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the code that tries to use sessions without starting them.',
      skeleton: `<?php
if (isset(\$_SESSION['user'])) {
    echo "Welcome back, " . \$_SESSION['user'];
} else {
    \$_SESSION['user'] = 'Guest';
}`,
      solution: `<?php
session_start();
if (isset(\$_SESSION['user'])) {
    echo "Welcome back, " . \$_SESSION['user'];
} else {
    \$_SESSION['user'] = 'Guest';
}`,
      hints: [
        'Sessions must be started before using $_SESSION.',
        'Add session_start() at the top of the script.',
        'Without it, $_SESSION will be empty.',
      ],
      concepts: ['session_start', 'initialization', 'common-mistake'],
    },
    {
      id: 'php-session-15',
      title: 'Fix Insecure Cookie',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the cookie that lacks security flags, making it vulnerable to XSS and MITM.',
      skeleton: `<?php
\$token = bin2hex(random_bytes(16));
setcookie('auth_token', \$token, time() + 86400);`,
      solution: `<?php
\$token = bin2hex(random_bytes(16));
setcookie('auth_token', \$token, [
    'expires' => time() + 86400,
    'path' => '/',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'Strict',
]);`,
      hints: [
        'Add httponly to prevent JavaScript access.',
        'Add secure to only send over HTTPS.',
        'Add samesite to prevent CSRF.',
      ],
      concepts: ['secure-cookie', 'httponly', 'samesite'],
    },
    {
      id: 'php-session-16',
      title: 'Predict Session Value',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the session value after set and unset operations.',
      skeleton: `<?php
session_start();
\$_SESSION['count'] = 10;
\$_SESSION['count'] += 5;
unset(\$_SESSION['count']);
echo isset(\$_SESSION['count']) ? \$_SESSION['count'] : 'gone';`,
      solution: `gone`,
      hints: [
        'count is set to 10, then incremented to 15.',
        'unset() removes the key from the session.',
        'isset() returns false after unset.',
      ],
      concepts: ['unset', 'isset', 'session-lifecycle'],
    },
    {
      id: 'php-session-17',
      title: 'Predict Cookie Availability',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict when a cookie becomes available after being set.',
      skeleton: `<?php
setcookie('test', 'hello', time() + 3600, '/');
echo isset(\$_COOKIE['test']) ? 'yes' : 'no';`,
      solution: `no`,
      hints: [
        'Cookies are sent in the response header.',
        'They are only available in $_COOKIE on the NEXT request.',
        'setcookie does not update $_COOKIE immediately.',
      ],
      concepts: ['cookie-lifecycle', 'next-request', '$_COOKIE'],
    },
    {
      id: 'php-session-18',
      title: 'Predict Session Destroy',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict what happens to session data after session_destroy.',
      skeleton: `<?php
session_start();
\$_SESSION['name'] = 'Alice';
session_destroy();
echo \$_SESSION['name'] ?? 'empty';`,
      solution: `Alice`,
      hints: [
        'session_destroy() destroys the session file.',
        'But $_SESSION array still exists in memory.',
        'The data is gone on the next request, not immediately.',
      ],
      concepts: ['session_destroy', 'in-memory', 'lifecycle'],
    },
    {
      id: 'php-session-19',
      title: 'Refactor Global Session to Helper',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the direct $_SESSION access into clean helper functions.',
      skeleton: `<?php
session_start();
if (!isset(\$_SESSION['visits'])) {
    \$_SESSION['visits'] = 0;
}
\$_SESSION['visits']++;
echo "Visit #" . \$_SESSION['visits'];`,
      solution: `<?php
session_start();

function incrementVisits(): int {
    \$_SESSION['visits'] = (\$_SESSION['visits'] ?? 0) + 1;
    return \$_SESSION['visits'];
}

echo "Visit #" . incrementVisits();`,
      hints: [
        'Wrap session logic in a function.',
        'Use null coalescing for initialization.',
        'Return the value for cleaner usage.',
      ],
      concepts: ['encapsulation', 'helper-function', 'refactor'],
    },
    {
      id: 'php-session-20',
      title: 'Refactor to Secure Session Config',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the basic session_start() into a secure session initialization with all recommended security settings.',
      skeleton: `<?php
session_start();
\$_SESSION['user'] = 'Alice';`,
      solution: `<?php
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);
ini_set('session.use_strict_mode', 1);
ini_set('session.cookie_samesite', 'Lax');

session_start();
session_regenerate_id(true);
\$_SESSION['user'] = 'Alice';`,
      hints: [
        'Set security ini directives before session_start.',
        'cookie_httponly prevents JS access to session cookie.',
        'use_strict_mode rejects uninitialized session IDs.',
      ],
      concepts: ['session-security', 'ini_set', 'hardening'],
    },
  ],
};
