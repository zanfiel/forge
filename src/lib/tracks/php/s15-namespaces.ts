import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-ns',
  title: '15. Namespaces',
  explanation: `## Namespaces in PHP

Namespaces prevent naming collisions and organize code into logical groups, similar to directories in a filesystem.

### Declaration
\`\`\`php
<?php
namespace App\\Models;

class User {
    // This is App\\Models\\User
}
\`\`\`

### Importing with use
\`\`\`php
<?php
namespace App\\Controllers;

use App\\Models\\User;
use App\\Models\\Post as BlogPost;  // alias

class HomeController {
    public function index(): User {
        return new User();
    }
}
\`\`\`

### Sub-namespaces
\`\`\`php
namespace App\\Services\\Payment;

class StripeGateway {
    // Fully qualified: App\\Services\\Payment\\StripeGateway
}
\`\`\`

### Global Namespace
Access global classes with a leading backslash:
\`\`\`php
namespace App;

\$date = new \\DateTime();          // Global DateTime
\$e = new \\RuntimeException('err'); // Global RuntimeException
\`\`\`

### PSR-4 Autoloading
The standard maps namespaces to directory structures:
- \`App\\Models\\User\` → \`src/Models/User.php\`
- Configured in \`composer.json\`:

\`\`\`json
{
    "autoload": {
        "psr-4": {
            "App\\\\": "src/"
        }
    }
}
\`\`\`

### Group Use Declarations
\`\`\`php
use App\\Models\\{User, Post, Comment};
use App\\Services\\{PaymentService, EmailService};
\`\`\``,
  exercises: [
    {
      id: 'php-ns-1',
      title: 'Declare a Namespace',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to declare a namespace.',
      skeleton: `<?php
___ App\\Models;

class Product {
    public string \$name = 'Widget';
}`,
      solution: `<?php
namespace App\\Models;

class Product {
    public string \$name = 'Widget';
}`,
      hints: [
        'Use the "namespace" keyword followed by the path.',
        'Namespace must be the first statement in the file.',
        'Backslash separates namespace levels.',
      ],
      concepts: ['namespace-declaration', 'namespace-syntax'],
    },
    {
      id: 'php-ns-2',
      title: 'Import a Class with use',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blanks to import a class from another namespace.',
      skeleton: `<?php
namespace App\\Controllers;

___ App\\Models\\User;

class UserController {
    public function show(): ___ {
        return new ___();
    }
}`,
      solution: `<?php
namespace App\\Controllers;

use App\\Models\\User;

class UserController {
    public function show(): User {
        return new User();
    }
}`,
      hints: [
        'Use the "use" keyword to import a class.',
        'After importing, you can reference it by its short name.',
        'The type hint and constructor use the short name "User".',
      ],
      concepts: ['use-statement', 'importing', 'short-name'],
    },
    {
      id: 'php-ns-3',
      title: 'Alias with as',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blanks to import a class with an alias.',
      skeleton: `<?php
namespace App;

use App\\Services\\MailService ___ Mailer;

function sendMail(): void {
    \$m = new ___();
    \$m->send();
}`,
      solution: `<?php
namespace App;

use App\\Services\\MailService as Mailer;

function sendMail(): void {
    \$m = new Mailer();
    \$m->send();
}`,
      hints: [
        'Use "as" to create an alias for an imported class.',
        'After aliasing, use the alias name to reference it.',
        'Mailer is the alias for MailService.',
      ],
      concepts: ['alias', 'as-keyword', 'naming-collision'],
    },
    {
      id: 'php-ns-4',
      title: 'Global Namespace Access',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to access global classes from within a namespace.',
      skeleton: `<?php
namespace App\\Utils;

function now(): string {
    \$dt = new ___DateTime();
    return \$dt->format('Y-m-d');
}

function fail(): void {
    throw new ___InvalidArgumentException('Bad input');
}`,
      solution: `<?php
namespace App\\Utils;

function now(): string {
    \$dt = new \\DateTime();
    return \$dt->format('Y-m-d');
}

function fail(): void {
    throw new \\InvalidArgumentException('Bad input');
}`,
      hints: [
        'Prefix global classes with a backslash.',
        '\\DateTime accesses the global DateTime class.',
        'Without the backslash, PHP looks in the current namespace.',
      ],
      concepts: ['global-namespace', 'leading-backslash', 'fully-qualified'],
    },
    {
      id: 'php-ns-5',
      title: 'Group Use Declaration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to use a group use declaration.',
      skeleton: `<?php
namespace App;

use App\\Models\\___User, Post, Comment___;`,
      solution: `<?php
namespace App;

use App\\Models\\{User, Post, Comment};`,
      hints: [
        'Group use declarations use curly braces.',
        'List classes separated by commas inside braces.',
        'The common namespace prefix goes before the braces.',
      ],
      concepts: ['group-use', 'curly-braces', 'bulk-import'],
    },
    {
      id: 'php-ns-6',
      title: 'Sub-namespace Declaration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank with the correct sub-namespace.',
      skeleton: `<?php
namespace App___Services___Payment;

class Gateway {
    public function charge(float \$amount): bool {
        return \$amount > 0;
    }
}`,
      solution: `<?php
namespace App\\Services\\Payment;

class Gateway {
    public function charge(float \$amount): bool {
        return \$amount > 0;
    }
}`,
      hints: [
        'Sub-namespaces are separated by backslashes.',
        'This creates a three-level namespace hierarchy.',
        'The fully qualified name is App\\Services\\Payment\\Gateway.',
      ],
      concepts: ['sub-namespace', 'hierarchy', 'backslash-separator'],
    },
    {
      id: 'php-ns-7',
      title: 'Write a Namespaced Interface and Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a file in namespace App\\Contracts with interface Logger declaring log(string $msg): void. Then write a class ConsoleLogger in namespace App\\Services that uses the interface.',
      skeleton: `<?php
// Write the interface in App\\Contracts and class in App\\Services
// (combine in one snippet for this exercise)`,
      solution: `<?php
namespace App\\Contracts;

interface Logger {
    public function log(string \$msg): void;
}

// --- In a separate file ---
namespace App\\Services;

use App\\Contracts\\Logger;

class ConsoleLogger implements Logger {
    public function log(string \$msg): void {
        echo \$msg;
    }
}`,
      hints: [
        'Declare the interface in namespace App\\Contracts.',
        'The class is in App\\Services and uses App\\Contracts\\Logger.',
        'Use the "use" statement to import the interface.',
      ],
      concepts: ['namespaced-interface', 'cross-namespace-import', 'use-statement'],
    },
    {
      id: 'php-ns-8',
      title: 'Write a PSR-4 Autoloader Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a simple autoloader function that maps the namespace App\\ to the src/ directory. Register it with spl_autoload_register. Replace backslashes with DIRECTORY_SEPARATOR and append .php.',
      skeleton: `<?php
// Write and register a PSR-4 autoloader for the App namespace`,
      solution: `<?php
spl_autoload_register(function (string \$class): void {
    \$prefix = 'App\\\\';
    if (strpos(\$class, \$prefix) !== 0) {
        return;
    }
    \$relative = substr(\$class, strlen(\$prefix));
    \$file = 'src/' . str_replace('\\\\', DIRECTORY_SEPARATOR, \$relative) . '.php';
    if (file_exists(\$file)) {
        require \$file;
    }
});`,
      hints: [
        'Check if the class starts with the namespace prefix.',
        'Strip the prefix and replace backslashes with directory separators.',
        'Append .php and require the file if it exists.',
      ],
      concepts: ['autoloading', 'spl_autoload_register', 'psr-4'],
    },
    {
      id: 'php-ns-9',
      title: 'Write a Namespace Helper Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function getShortClassName(string $fqcn): string that takes a fully qualified class name like "App\\Models\\User" and returns just "User" (the part after the last backslash).',
      skeleton: `<?php
// Write the getShortClassName function`,
      solution: `<?php
function getShortClassName(string \$fqcn): string {
    \$parts = explode('\\\\', \$fqcn);
    return end(\$parts);
}`,
      hints: [
        'Split the string on backslashes.',
        'Use explode() to break it into parts.',
        'Use end() to get the last element.',
      ],
      concepts: ['string-manipulation', 'explode', 'namespace-parsing'],
    },
    {
      id: 'php-ns-10',
      title: 'Write Namespace with Function Import',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a namespace App\\Helpers with a function slugify(string $text): string that lowercases, replaces spaces with dashes. Then show how to import and use it from another namespace.',
      skeleton: `<?php
// Write the helpers namespace with slugify function`,
      solution: `<?php
namespace App\\Helpers;

function slugify(string \$text): string {
    return str_replace(' ', '-', strtolower(\$text));
}

// --- In another file ---
namespace App\\Controllers;

use function App\\Helpers\\slugify;

class PageController {
    public function slug(string \$title): string {
        return slugify(\$title);
    }
}`,
      hints: [
        'Functions can live in namespaces too.',
        'Import functions with "use function".',
        'The imported function can be called by its short name.',
      ],
      concepts: ['namespace-functions', 'use-function', 'function-import'],
    },
    {
      id: 'php-ns-11',
      title: 'Write Namespace with Constant Import',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a namespace App\\Config with a constant VERSION = "1.0.0". Show how to import it in another namespace using "use const".',
      skeleton: `<?php
// Write the config namespace with VERSION constant`,
      solution: `<?php
namespace App\\Config;

const VERSION = '1.0.0';

// --- In another file ---
namespace App;

use const App\\Config\\VERSION;

function showVersion(): string {
    return 'v' . VERSION;
}`,
      hints: [
        'Constants can be defined in namespaces.',
        'Import constants with "use const".',
        'After importing, reference the constant by its short name.',
      ],
      concepts: ['namespace-constants', 'use-const', 'constant-import'],
    },
    {
      id: 'php-ns-12',
      title: 'Write Disambiguating Imports',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write code that imports two classes with the same short name from different namespaces, using aliases to disambiguate.',
      skeleton: `<?php
// Import App\\Models\\Event and App\\Calendar\\Event with aliases`,
      solution: `<?php
namespace App\\Controllers;

use App\\Models\\Event as ModelEvent;
use App\\Calendar\\Event as CalendarEvent;

class EventController {
    public function compare(ModelEvent \$model, CalendarEvent \$calendar): string {
        return 'Comparing model and calendar events';
    }
}`,
      hints: [
        'When two classes share a name, use "as" to alias one or both.',
        'Choose descriptive aliases like ModelEvent and CalendarEvent.',
        'Both can now be used in the same file without conflict.',
      ],
      concepts: ['naming-collision', 'alias', 'disambiguation'],
    },
    {
      id: 'php-ns-13',
      title: 'Fix Missing Namespace Import',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the error - the class is not found because the use statement is missing.',
      skeleton: `<?php
namespace App\\Controllers;

class ApiController {
    public function handle(): void {
        \$request = new Request();
    }
}`,
      solution: `<?php
namespace App\\Controllers;

use App\\Http\\Request;

class ApiController {
    public function handle(): void {
        \$request = new Request();
    }
}`,
      hints: [
        'Without a use statement, PHP looks for Request in App\\Controllers.',
        'Add a use statement to import the correct Request class.',
        'The Request class is in App\\Http namespace.',
      ],
      concepts: ['missing-import', 'class-not-found', 'use-statement'],
    },
    {
      id: 'php-ns-14',
      title: 'Fix Global Function Call in Namespace',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the code that fails to call a global function from within a namespace.',
      skeleton: `<?php
namespace App\\Utils;

function formatDate(string \$date): string {
    // This works fine because PHP falls back to global for functions
    return date('Y-m-d', strtotime(\$date));
}

function createException(string \$msg): \\Exception {
    // BUG: This tries to find App\\Utils\\Exception
    return new Exception(\$msg);
}`,
      solution: `<?php
namespace App\\Utils;

function formatDate(string \$date): string {
    return date('Y-m-d', strtotime(\$date));
}

function createException(string \$msg): \\Exception {
    return new \\Exception(\$msg);
}`,
      hints: [
        'Classes do NOT fall back to the global namespace (unlike functions).',
        'Prefix the class with a backslash to access the global namespace.',
        'new \\Exception accesses the global Exception class.',
      ],
      concepts: ['global-fallback', 'class-resolution', 'leading-backslash'],
    },
    {
      id: 'php-ns-15',
      title: 'Fix Namespace Declaration Position',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the error - namespace must be the first statement.',
      skeleton: `<?php
use App\\Models\\User;

namespace App\\Controllers;

class HomeController {
    public function index(): User {
        return new User();
    }
}`,
      solution: `<?php
namespace App\\Controllers;

use App\\Models\\User;

class HomeController {
    public function index(): User {
        return new User();
    }
}`,
      hints: [
        'The namespace declaration must come before any use statements.',
        'Swap the order: namespace first, then use.',
        'Only declare and comments can precede namespace.',
      ],
      concepts: ['namespace-position', 'declaration-order', 'syntax-error'],
    },
    {
      id: 'php-ns-16',
      title: 'Predict Namespace Resolution',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict what this code outputs.',
      skeleton: `<?php
namespace App\\Demo;

class Foo {
    public function name(): string {
        return __CLASS__;
    }
}

\$f = new Foo();
echo \$f->name();`,
      solution: `App\\Demo\\Foo`,
      hints: [
        '__CLASS__ returns the fully qualified class name.',
        'Foo is in the App\\Demo namespace.',
        'The output includes the full namespace path.',
      ],
      concepts: ['__CLASS__', 'fully-qualified-name', 'magic-constant'],
    },
    {
      id: 'php-ns-17',
      title: 'Predict __NAMESPACE__ Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict what this code outputs.',
      skeleton: `<?php
namespace App\\Services;

echo __NAMESPACE__;`,
      solution: `App\\Services`,
      hints: [
        '__NAMESPACE__ returns the current namespace as a string.',
        'It contains the full namespace path.',
        'For App\\Services, it returns "App\\Services".',
      ],
      concepts: ['__NAMESPACE__', 'magic-constant', 'namespace-introspection'],
    },
    {
      id: 'php-ns-18',
      title: 'Predict Aliased Class',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict what this code outputs.',
      skeleton: `<?php
namespace App;

class Original {
    public function id(): string { return 'original'; }
}

use App\\Original as Alias;

\$a = new Alias();
\$b = new Original();
echo (\$a instanceof Original) ? 'same' : 'diff';
echo ' ';
echo \$a->id();`,
      solution: `same original`,
      hints: [
        'An alias is just another name for the same class.',
        'new Alias() creates an App\\Original instance.',
        'instanceof confirms they are the same class.',
      ],
      concepts: ['alias-identity', 'instanceof', 'class-aliasing'],
    },
    {
      id: 'php-ns-19',
      title: 'Refactor to Namespaced Code',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor this non-namespaced code to use proper namespaces.',
      skeleton: `<?php
class App_Models_User {
    public string \$name;
}

class App_Models_Post {
    public string \$title;
}

function App_Models_createUser(string \$name): App_Models_User {
    \$u = new App_Models_User();
    \$u->name = \$name;
    return \$u;
}`,
      solution: `<?php
namespace App\\Models;

class User {
    public string \$name;
}

class Post {
    public string \$title;
}

function createUser(string \$name): User {
    \$u = new User();
    \$u->name = \$name;
    return \$u;
}`,
      hints: [
        'Replace underscore-separated prefixes with a proper namespace.',
        'Remove the App_Models_ prefix from class and function names.',
        'Add a namespace declaration at the top.',
      ],
      concepts: ['namespace-migration', 'naming-conventions', 'psr-4'],
    },
    {
      id: 'php-ns-20',
      title: 'Refactor Fully Qualified Names to Imports',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the fully qualified class names to use import statements.',
      skeleton: `<?php
namespace App\\Controllers;

class ProductController {
    public function index(): \\App\\Http\\Response {
        \$products = (new \\App\\Repositories\\ProductRepository())->all();
        \$view = new \\App\\Views\\ProductView(\$products);
        return new \\App\\Http\\Response(\$view->render());
    }
}`,
      solution: `<?php
namespace App\\Controllers;

use App\\Http\\Response;
use App\\Repositories\\ProductRepository;
use App\\Views\\ProductView;

class ProductController {
    public function index(): Response {
        \$products = (new ProductRepository())->all();
        \$view = new ProductView(\$products);
        return new Response(\$view->render());
    }
}`,
      hints: [
        'Add use statements for each fully qualified class.',
        'Replace \\App\\... with short class names in the code.',
        'Group all use statements after the namespace declaration.',
      ],
      concepts: ['import-refactoring', 'use-statement', 'code-readability'],
    },
  ],
};
