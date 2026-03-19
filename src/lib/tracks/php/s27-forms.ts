import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-forms',
  title: '27. Forms',
  explanation: `## Forms in PHP

PHP was designed to handle HTML form submissions. Data arrives via \\\$_POST or \\\$_GET depending on the form method, while file uploads use \\\$_FILES. Always validate and sanitize all user input.

### Basic Form Handling
\`\`\`php
<?php
// HTML: <form method="POST" action="/register">
//   <input name="username">
//   <input name="email" type="email">
// </form>

if (\\\$_SERVER['REQUEST_METHOD'] === 'POST') {
    \\\$username = \\\$_POST['username'] ?? '';
    \\\$email = \\\$_POST['email'] ?? '';
}
\`\`\`

### filter_input for Safe Access
\`\`\`php
<?php
\\\$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
\\\$age = filter_input(INPUT_POST, 'age', FILTER_VALIDATE_INT);
\\\$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
\`\`\`

### File Uploads via \\\$_FILES
\`\`\`php
<?php
// HTML: <form enctype="multipart/form-data">
//   <input type="file" name="avatar">
// </form>

if (isset(\\\$_FILES['avatar'])) {
    \\\$file = \\\$_FILES['avatar'];
    \\\$name = \\\$file['name'];      // Original filename
    \\\$tmpName = \\\$file['tmp_name']; // Temp path on server
    \\\$size = \\\$file['size'];       // Size in bytes
    \\\$error = \\\$file['error'];     // Error code (0 = OK)

    if (\\\$error === UPLOAD_ERR_OK) {
        move_uploaded_file(\\\$tmpName, "/uploads/\\\$name");
    }
}
\`\`\`

### Validation Pattern
\`\`\`php
<?php
\\\$errors = [];
if (empty(\\\$_POST['name'])) {
    \\\$errors[] = 'Name is required';
}
if (!filter_var(\\\$_POST['email'], FILTER_VALIDATE_EMAIL)) {
    \\\$errors[] = 'Invalid email address';
}
if (strlen(\\\$_POST['password']) < 8) {
    \\\$errors[] = 'Password must be at least 8 characters';
}
\`\`\``,
  exercises: [
    {
      id: 'php-forms-1',
      title: 'Read Form Input Safely',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to safely read the "username" POST field with a default empty string.',
      skeleton: `<?php
\\\$username = ___ ?? '';`,
      solution: `<?php
\\\$username = \\\$_POST['username'] ?? '';`,
      hints: [
        'Form POST data is in the \$_POST superglobal',
        'Access it like an associative array',
        'The ?? operator provides the fallback',
      ],
      concepts: ['POST-data', 'null-coalescing'],
    },
    {
      id: 'php-forms-2',
      title: 'Validate Email with filter_input',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to validate the "email" POST field using filter_input.',
      skeleton: `<?php
\\\$email = filter_input(INPUT_POST, 'email', ___);
if (\\\$email === false) {
    echo "Invalid email";
}`,
      solution: `<?php
\\\$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
if (\\\$email === false) {
    echo "Invalid email";
}`,
      hints: [
        'filter_input takes an input type, field name, and filter constant',
        'Email validation uses a built-in filter',
        'The constant is FILTER_VALIDATE_EMAIL',
      ],
      concepts: ['filter_input', 'validation'],
    },
    {
      id: 'php-forms-3',
      title: 'Check Upload Error',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to check if the file upload was successful.',
      skeleton: `<?php
if (\\\$_FILES['photo']['error'] === ___) {
    echo "Upload successful";
}`,
      solution: `<?php
if (\\\$_FILES['photo']['error'] === UPLOAD_ERR_OK) {
    echo "Upload successful";
}`,
      hints: [
        'PHP defines constants for upload error codes',
        'A successful upload has error code 0',
        'The constant for success is UPLOAD_ERR_OK',
      ],
      concepts: ['file-uploads', 'error-codes'],
    },
    {
      id: 'php-forms-4',
      title: 'Move Uploaded File',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to move the uploaded file to a destination path.',
      skeleton: `<?php
\\\$tmpPath = \\\$_FILES['document']['tmp_name'];
\\\$dest = '/uploads/' . \\\$_FILES['document']['name'];
___(___);`,
      solution: `<?php
\\\$tmpPath = \\\$_FILES['document']['tmp_name'];
\\\$dest = '/uploads/' . \\\$_FILES['document']['name'];
move_uploaded_file(\\\$tmpPath, \\\$dest);`,
      hints: [
        'PHP has a dedicated function for moving uploaded files',
        'It takes the temporary path and destination',
        'The function is move_uploaded_file()',
      ],
      concepts: ['file-uploads', 'move_uploaded_file'],
    },
    {
      id: 'php-forms-5',
      title: 'Sanitize String Input',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to sanitize a string input, encoding special characters.',
      skeleton: `<?php
\\\$name = filter_input(INPUT_POST, 'name', ___);`,
      solution: `<?php
\\\$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);`,
      hints: [
        'Sanitization removes or encodes dangerous characters',
        'Use a FILTER_SANITIZE_* constant',
        'FILTER_SANITIZE_SPECIAL_CHARS encodes special HTML characters',
      ],
      concepts: ['sanitization', 'filter_input'],
    },
    {
      id: 'php-forms-6',
      title: 'Validate Integer with Options',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to validate an integer POST input is between 1 and 100.',
      skeleton: `<?php
\\\$age = filter_input(INPUT_POST, 'age', FILTER_VALIDATE_INT, [
    'options' => [___ => 1, ___ => 100]
]);`,
      solution: `<?php
\\\$age = filter_input(INPUT_POST, 'age', FILTER_VALIDATE_INT, [
    'options' => ['min_range' => 1, 'max_range' => 100]
]);`,
      hints: [
        'FILTER_VALIDATE_INT supports range options',
        'The options array uses min_range and max_range',
        'These enforce minimum and maximum values',
      ],
      concepts: ['filter_input', 'validation', 'options'],
    },
    {
      id: 'php-forms-7',
      title: 'Form Validation Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function validateRegistration that takes a data array and returns an array of error messages. Check: name is not empty, email is valid, password is at least 8 characters.',
      skeleton: `<?php
function validateRegistration(array \\\$data): array {
    // Return array of error message strings
    // Check name is not empty
    // Check email is valid
    // Check password length >= 8
}`,
      solution: `<?php
function validateRegistration(array \\\$data): array {
    \\\$errors = [];
    if (empty(\\\$data['name'])) {
        \\\$errors[] = 'Name is required';
    }
    if (!filter_var(\\\$data['email'] ?? '', FILTER_VALIDATE_EMAIL)) {
        \\\$errors[] = 'Valid email is required';
    }
    if (strlen(\\\$data['password'] ?? '') < 8) {
        \\\$errors[] = 'Password must be at least 8 characters';
    }
    return \\\$errors;
}`,
      hints: [
        'Use empty() to check for blank strings',
        'Use filter_var with FILTER_VALIDATE_EMAIL',
        'Use strlen() to check password length',
      ],
      concepts: ['validation', 'form-handling'],
    },
    {
      id: 'php-forms-8',
      title: 'File Upload Validator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function validateUpload that takes a \$_FILES entry array and allowed extensions array, returns an error string or empty string if valid. Check error code, size under 2MB, and extension.',
      skeleton: `<?php
function validateUpload(array \\\$file, array \\\$allowedExt): string {
    // Check \\\$file['error'] is UPLOAD_ERR_OK
    // Check \\\$file['size'] is under 2MB (2 * 1024 * 1024)
    // Check file extension is in \\\$allowedExt
    // Return error message or empty string
}`,
      solution: `<?php
function validateUpload(array \\\$file, array \\\$allowedExt): string {
    if (\\\$file['error'] !== UPLOAD_ERR_OK) {
        return 'Upload failed with error code ' . \\\$file['error'];
    }
    if (\\\$file['size'] > 2 * 1024 * 1024) {
        return 'File exceeds 2MB limit';
    }
    \\\$ext = strtolower(pathinfo(\\\$file['name'], PATHINFO_EXTENSION));
    if (!in_array(\\\$ext, \\\$allowedExt, true)) {
        return 'File type not allowed';
    }
    return '';
}`,
      hints: [
        'Check error code against UPLOAD_ERR_OK first',
        'Use pathinfo() with PATHINFO_EXTENSION to get the extension',
        'Use in_array() with strict mode to check allowed extensions',
      ],
      concepts: ['file-uploads', 'validation'],
    },
    {
      id: 'php-forms-9',
      title: 'Multi-File Upload Handler',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function handleMultiUpload that takes a \$_FILES entry for multiple files (name[], tmp_name[], etc.) and a destination directory, and returns an array of successfully moved filenames.',
      skeleton: `<?php
function handleMultiUpload(array \\\$files, string \\\$destDir): array {
    // \\\$files has arrays: name[], tmp_name[], error[], size[]
    // Loop through each file
    // Skip files with errors
    // Move valid files to \\\$destDir
    // Return array of moved filenames
}`,
      solution: `<?php
function handleMultiUpload(array \\\$files, string \\\$destDir): array {
    \\\$moved = [];
    \\\$count = count(\\\$files['name']);
    for (\\\$i = 0; \\\$i < \\\$count; \\\$i++) {
        if (\\\$files['error'][\\\$i] !== UPLOAD_ERR_OK) {
            continue;
        }
        \\\$name = basename(\\\$files['name'][\\\$i]);
        \\\$dest = rtrim(\\\$destDir, '/') . '/' . \\\$name;
        if (move_uploaded_file(\\\$files['tmp_name'][\\\$i], \\\$dest)) {
            \\\$moved[] = \\\$name;
        }
    }
    return \\\$moved;
}`,
      hints: [
        'Multiple file uploads create parallel arrays in \$_FILES',
        'Loop using the count of the name array',
        'Use basename() to prevent directory traversal attacks',
      ],
      concepts: ['file-uploads', 'multi-upload'],
    },
    {
      id: 'php-forms-10',
      title: 'Build Form Token System',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write two functions: generateFormToken that creates a random token, stores it in \$_SESSION, and returns it; and validateFormToken that checks a submitted token against the session.',
      skeleton: `<?php
function generateFormToken(): string {
    // Generate random bytes, hex encode
    // Store in \\\$_SESSION['form_token']
    // Return the token
}

function validateFormToken(string \\\$token): bool {
    // Compare with session token
    // Remove token after validation (one-time use)
    // Return true if match
}`,
      solution: `<?php
function generateFormToken(): string {
    \\\$token = bin2hex(random_bytes(32));
    \\\$_SESSION['form_token'] = \\\$token;
    return \\\$token;
}

function validateFormToken(string \\\$token): bool {
    \\\$valid = isset(\\\$_SESSION['form_token']) && hash_equals(\\\$_SESSION['form_token'], \\\$token);
    unset(\\\$_SESSION['form_token']);
    return \\\$valid;
}`,
      hints: [
        'Use random_bytes() and bin2hex() for secure token generation',
        'Store the token in \$_SESSION for server-side comparison',
        'Use hash_equals() for timing-safe comparison',
      ],
      concepts: ['CSRF-protection', 'sessions', 'tokens'],
    },
    {
      id: 'php-forms-11',
      title: 'Form Data Sanitizer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function sanitizeFormData that takes an associative array and returns a new array with all string values trimmed and HTML special chars encoded.',
      skeleton: `<?php
function sanitizeFormData(array \\\$data): array {
    // Loop through all key-value pairs
    // Trim whitespace from strings
    // Encode HTML special characters
    // Return sanitized array
}`,
      solution: `<?php
function sanitizeFormData(array \\\$data): array {
    \\\$clean = [];
    foreach (\\\$data as \\\$key => \\\$value) {
        if (is_string(\\\$value)) {
            \\\$clean[\\\$key] = htmlspecialchars(trim(\\\$value), ENT_QUOTES, 'UTF-8');
        } else {
            \\\$clean[\\\$key] = \\\$value;
        }
    }
    return \\\$clean;
}`,
      hints: [
        'Use trim() to remove whitespace',
        'Use htmlspecialchars() with ENT_QUOTES and UTF-8',
        'Only sanitize string values, pass others through',
      ],
      concepts: ['sanitization', 'htmlspecialchars'],
    },
    {
      id: 'php-forms-12',
      title: 'Checkbox Array Handler',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function getSelectedOptions that takes a POST field name and an array of valid options, returns only the submitted values that are in the valid list.',
      skeleton: `<?php
function getSelectedOptions(string \\\$field, array \\\$validOptions): array {
    // Get the array from \\\$_POST[\\\$field]
    // Filter to only valid options
    // Return filtered array
}`,
      solution: `<?php
function getSelectedOptions(string \\\$field, array \\\$validOptions): array {
    \\\$submitted = \\\$_POST[\\\$field] ?? [];
    if (!is_array(\\\$submitted)) {
        return [];
    }
    return array_values(array_intersect(\\\$submitted, \\\$validOptions));
}`,
      hints: [
        'Checkbox groups submit as arrays in POST',
        'Use array_intersect to keep only valid values',
        'Handle the case where the field is missing or not an array',
      ],
      concepts: ['form-handling', 'array-filtering'],
    },
    {
      id: 'php-forms-13',
      title: 'Fix Missing enctype Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the file upload handler that always reports no file uploaded.',
      skeleton: `<?php
// HTML form (the bug is here):
// <form method="POST" action="/upload">
//   <input type="file" name="photo">
//   <button>Upload</button>
// </form>

// PHP handler:
if (empty(\\\$_FILES['photo'])) {
    echo "No file uploaded";
} else {
    echo "Got file: " . \\\$_FILES['photo']['name'];
}
// Bug: \\\$_FILES is always empty`,
      solution: `<?php
// HTML form (fixed):
// <form method="POST" action="/upload" enctype="multipart/form-data">
//   <input type="file" name="photo">
//   <button>Upload</button>
// </form>

// PHP handler:
if (empty(\\\$_FILES['photo'])) {
    echo "No file uploaded";
} else {
    echo "Got file: " . \\\$_FILES['photo']['name'];
}`,
      hints: [
        'File uploads require a special form encoding type',
        'Without the correct enctype, \$_FILES will be empty',
        'Add enctype="multipart/form-data" to the form tag',
      ],
      concepts: ['file-uploads', 'enctype'],
    },
    {
      id: 'php-forms-14',
      title: 'Fix Unsafe File Move',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the security vulnerability in the file upload handler that allows directory traversal.',
      skeleton: `<?php
\\\$name = \\\$_FILES['doc']['name'];
\\\$tmp = \\\$_FILES['doc']['tmp_name'];
// Bug: attacker can submit name like "../../etc/passwd"
move_uploaded_file(\\\$tmp, "/uploads/" . \\\$name);`,
      solution: `<?php
\\\$name = basename(\\\$_FILES['doc']['name']);
\\\$tmp = \\\$_FILES['doc']['tmp_name'];
move_uploaded_file(\\\$tmp, "/uploads/" . \\\$name);`,
      hints: [
        'The filename comes from user input and cannot be trusted',
        'Path traversal characters like ../ can escape the upload directory',
        'Use basename() to strip any directory components',
      ],
      concepts: ['security', 'file-uploads', 'directory-traversal'],
    },
    {
      id: 'php-forms-15',
      title: 'Fix Validation That Always Passes',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the email validation that incorrectly accepts all inputs.',
      skeleton: `<?php
function isValidEmail(string \\\$email): bool {
    // Bug: assignment instead of comparison
    if (\\\$result = filter_var(\\\$email, FILTER_VALIDATE_EMAIL)) {
        return true;
    }
    return true;
}`,
      solution: `<?php
function isValidEmail(string \\\$email): bool {
    if (filter_var(\\\$email, FILTER_VALIDATE_EMAIL) !== false) {
        return true;
    }
    return false;
}`,
      hints: [
        'Look at the return statements carefully',
        'Both branches return true - the else case is wrong',
        'Also consider using filter_var result directly as the return',
      ],
      concepts: ['validation', 'debugging', 'logic-errors'],
    },
    {
      id: 'php-forms-16',
      title: 'Predict filter_var Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the output of filter_var for email validation.',
      skeleton: `<?php
var_dump(filter_var('user@example.com', FILTER_VALIDATE_EMAIL));
var_dump(filter_var('not-an-email', FILTER_VALIDATE_EMAIL));`,
      solution: `string(16) "user@example.com"
bool(false)`,
      hints: [
        'filter_var returns the filtered value on success',
        'It returns false on validation failure',
        'var_dump shows type and value',
      ],
      concepts: ['filter_var', 'validation'],
    },
    {
      id: 'php-forms-17',
      title: 'Predict File Error Constant',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the output when checking upload error constants.',
      skeleton: `<?php
echo UPLOAD_ERR_OK . "\\n";
echo UPLOAD_ERR_INI_SIZE . "\\n";
echo UPLOAD_ERR_NO_FILE . "\\n";`,
      solution: `0
1
4`,
      hints: [
        'UPLOAD_ERR_OK is the success code',
        'These are integer constants defined by PHP',
        'UPLOAD_ERR_OK is 0, UPLOAD_ERR_INI_SIZE is 1, UPLOAD_ERR_NO_FILE is 4',
      ],
      concepts: ['file-uploads', 'constants'],
    },
    {
      id: 'php-forms-18',
      title: 'Predict htmlspecialchars Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the output of htmlspecialchars on a string with HTML.',
      skeleton: `<?php
echo htmlspecialchars('<script>alert("XSS")</script>', ENT_QUOTES, 'UTF-8');`,
      solution: `&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;`,
      hints: [
        'htmlspecialchars converts special HTML characters to entities',
        '< becomes &lt; and > becomes &gt;',
        'With ENT_QUOTES, double quotes become &quot;',
      ],
      concepts: ['htmlspecialchars', 'XSS-prevention'],
    },
    {
      id: 'php-forms-19',
      title: 'Refactor Inline Validation to Class',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the inline validation logic into a reusable FormValidator class.',
      skeleton: `<?php
\\\$errors = [];
\\\$name = trim(\\\$_POST['name'] ?? '');
\\\$email = trim(\\\$_POST['email'] ?? '');
\\\$age = \\\$_POST['age'] ?? '';

if (empty(\\\$name)) {
    \\\$errors['name'] = 'Name is required';
}
if (strlen(\\\$name) > 50) {
    \\\$errors['name'] = 'Name must be under 50 characters';
}
if (!filter_var(\\\$email, FILTER_VALIDATE_EMAIL)) {
    \\\$errors['email'] = 'Invalid email';
}
if (!is_numeric(\\\$age) || \\\$age < 1 || \\\$age > 120) {
    \\\$errors['age'] = 'Age must be between 1 and 120';
}`,
      solution: `<?php
class FormValidator {
    private array \\\$errors = [];
    private array \\\$data;

    public function __construct(array \\\$data) {
        \\\$this->data = array_map(fn(\\\$v) => is_string(\\\$v) ? trim(\\\$v) : \\\$v, \\\$data);
    }

    public function required(string \\\$field, string \\\$message = ''): self {
        if (empty(\\\$this->data[\\\$field])) {
            \\\$this->errors[\\\$field] = \\\$message ?: "\\\$field is required";
        }
        return \\\$this;
    }

    public function maxLength(string \\\$field, int \\\$max, string \\\$message = ''): self {
        if (strlen(\\\$this->data[\\\$field] ?? '') > \\\$max) {
            \\\$this->errors[\\\$field] = \\\$message ?: "\\\$field must be under \\\$max characters";
        }
        return \\\$this;
    }

    public function email(string \\\$field, string \\\$message = ''): self {
        if (!filter_var(\\\$this->data[\\\$field] ?? '', FILTER_VALIDATE_EMAIL)) {
            \\\$this->errors[\\\$field] = \\\$message ?: "Invalid email";
        }
        return \\\$this;
    }

    public function intRange(string \\\$field, int \\\$min, int \\\$max, string \\\$message = ''): self {
        \\\$val = \\\$this->data[\\\$field] ?? '';
        if (!is_numeric(\\\$val) || \\\$val < \\\$min || \\\$val > \\\$max) {
            \\\$this->errors[\\\$field] = \\\$message ?: "\\\$field must be between \\\$min and \\\$max";
        }
        return \\\$this;
    }

    public function errors(): array {
        return \\\$this->errors;
    }

    public function isValid(): bool {
        return empty(\\\$this->errors);
    }
}

\\\$validator = new FormValidator(\\\$_POST);
\\\$validator->required('name', 'Name is required')
    ->maxLength('name', 50, 'Name must be under 50 characters')
    ->email('email', 'Invalid email')
    ->intRange('age', 1, 120, 'Age must be between 1 and 120');`,
      hints: [
        'Create a class that stores data and errors',
        'Each validation method adds to errors and returns \$this for chaining',
        'Accept custom error messages with sensible defaults',
      ],
      concepts: ['refactoring', 'validation', 'fluent-interface'],
    },
    {
      id: 'php-forms-20',
      title: 'Refactor Procedural Upload to Class',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the procedural file upload handling into an UploadHandler class.',
      skeleton: `<?php
\\\$file = \\\$_FILES['avatar'];
\\\$maxSize = 1024 * 1024;
\\\$allowed = ['jpg', 'png', 'gif'];
\\\$uploadDir = '/uploads/';

if (\\\$file['error'] !== UPLOAD_ERR_OK) {
    die('Upload error');
}
if (\\\$file['size'] > \\\$maxSize) {
    die('File too large');
}
\\\$ext = strtolower(pathinfo(\\\$file['name'], PATHINFO_EXTENSION));
if (!in_array(\\\$ext, \\\$allowed)) {
    die('Invalid file type');
}
\\\$newName = uniqid() . '.' . \\\$ext;
move_uploaded_file(\\\$file['tmp_name'], \\\$uploadDir . \\\$newName);
echo "Saved as \\\$newName";`,
      solution: `<?php
class UploadHandler {
    private int \\\$maxSize;
    private array \\\$allowedExtensions;
    private string \\\$uploadDir;

    public function __construct(string \\\$uploadDir, array \\\$allowedExtensions, int \\\$maxSize = 1048576) {
        \\\$this->uploadDir = rtrim(\\\$uploadDir, '/') . '/';
        \\\$this->allowedExtensions = \\\$allowedExtensions;
        \\\$this->maxSize = \\\$maxSize;
    }

    public function handle(array \\\$file): array {
        if (\\\$file['error'] !== UPLOAD_ERR_OK) {
            return ['success' => false, 'error' => 'Upload error'];
        }
        if (\\\$file['size'] > \\\$this->maxSize) {
            return ['success' => false, 'error' => 'File too large'];
        }
        \\\$ext = strtolower(pathinfo(\\\$file['name'], PATHINFO_EXTENSION));
        if (!in_array(\\\$ext, \\\$this->allowedExtensions, true)) {
            return ['success' => false, 'error' => 'Invalid file type'];
        }
        \\\$newName = uniqid() . '.' . \\\$ext;
        if (!move_uploaded_file(\\\$file['tmp_name'], \\\$this->uploadDir . \\\$newName)) {
            return ['success' => false, 'error' => 'Move failed'];
        }
        return ['success' => true, 'filename' => \\\$newName];
    }
}

\\\$handler = new UploadHandler('/uploads/', ['jpg', 'png', 'gif']);
\\\$result = \\\$handler->handle(\\\$_FILES['avatar']);
if (\\\$result['success']) {
    echo "Saved as " . \\\$result['filename'];
} else {
    echo "Error: " . \\\$result['error'];
}`,
      hints: [
        'Extract configuration into constructor parameters',
        'Return result arrays instead of using die()',
        'Make the handler reusable for different upload fields',
      ],
      concepts: ['refactoring', 'file-uploads', 'OOP'],
    },
  ],
};
