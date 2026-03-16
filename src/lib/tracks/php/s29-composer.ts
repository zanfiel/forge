import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-composer',
  title: '29. Composer',
  explanation: `## Composer in PHP

Composer is PHP's dependency manager. It handles package installation, autoloading, and version constraints. Every modern PHP project uses it.

### composer.json Basics
\`\`\`json
{
    "name": "vendor/project",
    "require": {
        "php": ">=8.1",
        "guzzlehttp/guzzle": "^7.0"
    },
    "require-dev": {
        "phpunit/phpunit": "^10.0"
    },
    "autoload": {
        "psr-4": {
            "App\\\\": "src/"
        }
    }
}
\`\`\`

### Version Constraints
\`\`\`
^7.0   - >=7.0.0, <8.0.0 (caret: next major)
~7.0   - >=7.0.0, <7.1.0 (tilde: next minor)
>=7.0  - any version 7.0 or higher
7.0.*  - any 7.0.x version
\`\`\`

### PSR-4 Autoloading
\`\`\`php
<?php
// With "App\\\\": "src/" in autoload psr-4:
// App\\Models\\User -> src/Models/User.php
// App\\Services\\Auth -> src/Services/Auth.php

require 'vendor/autoload.php';

use App\\Models\\User;
\\\$user = new User();
\`\`\`

### Common Commands
\`\`\`bash
composer init              # Create composer.json
composer require guzzle    # Add dependency
composer require --dev phpunit  # Add dev dependency
composer install           # Install from lock file
composer update            # Update dependencies
composer dump-autoload     # Regenerate autoloader
\`\`\`

### Scripts
\`\`\`json
{
    "scripts": {
        "test": "phpunit",
        "lint": "php-cs-fixer fix --dry-run",
        "post-install-cmd": ["@auto-scripts"]
    }
}
\`\`\``,
  exercises: [
    {
      id: 'php-composer-1',
      title: 'Require Autoloader',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to include the Composer autoloader.',
      skeleton: `<?php
require ___;

use GuzzleHttp\\Client;
\\\$client = new Client();`,
      solution: `<?php
require 'vendor/autoload.php';

use GuzzleHttp\\Client;
\\\$client = new Client();`,
      hints: [
        'Composer generates an autoloader file',
        'It lives in the vendor directory',
        'The file is vendor/autoload.php',
      ],
      concepts: ['autoloading', 'composer'],
    },
    {
      id: 'php-composer-2',
      title: 'PSR-4 Namespace Mapping',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the correct namespace for a class at src/Services/PaymentGateway.php given PSR-4 mapping "App\\\\": "src/".',
      skeleton: `<?php
namespace ___;

class PaymentGateway {
    public function charge(float \\\$amount): bool {
        return true;
    }
}`,
      solution: `<?php
namespace App\\Services;

class PaymentGateway {
    public function charge(float \\\$amount): bool {
        return true;
    }
}`,
      hints: [
        'PSR-4 maps namespace prefixes to directories',
        '"App\\\\" maps to "src/"',
        'Services/PaymentGateway.php becomes App\\Services',
      ],
      concepts: ['PSR-4', 'namespaces'],
    },
    {
      id: 'php-composer-3',
      title: 'Version Constraint Caret',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the version constraint that allows any 7.x version but not 8.0.',
      skeleton: `// In composer.json require section:
// "guzzlehttp/guzzle": "___"`,
      solution: `// In composer.json require section:
// "guzzlehttp/guzzle": "^7.0"`,
      hints: [
        'The caret operator allows updates within a major version',
        '^7.0 means >=7.0.0 and <8.0.0',
        'This is the most commonly used constraint',
      ],
      concepts: ['semver', 'version-constraints'],
    },
    {
      id: 'php-composer-4',
      title: 'Autoload Classmap',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the correct autoload section to use classmap autoloading for a legacy directory.',
      skeleton: `// composer.json
// {
//     "autoload": {
//         "___": ["lib/", "helpers/"]
//     }
// }`,
      solution: `// composer.json
// {
//     "autoload": {
//         "classmap": ["lib/", "helpers/"]
//     }
// }`,
      hints: [
        'Classmap scans directories for all class files',
        'It is useful for legacy code without namespaces',
        'The key is "classmap" in the autoload section',
      ],
      concepts: ['autoloading', 'classmap'],
    },
    {
      id: 'php-composer-5',
      title: 'Dev Dependency Flag',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the flag to add PHPUnit as a development-only dependency.',
      skeleton: `// Command to add PHPUnit for development only:
// composer require ___ phpunit/phpunit`,
      solution: `// Command to add PHPUnit for development only:
// composer require --dev phpunit/phpunit`,
      hints: [
        'Dev dependencies are not installed in production',
        'Use a flag to specify development dependency',
        'The flag is --dev',
      ],
      concepts: ['require-dev', 'development-dependencies'],
    },
    {
      id: 'php-composer-6',
      title: 'Files Autoloading',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the autoload type that always loads specific files (for helper functions).',
      skeleton: `// composer.json
// {
//     "autoload": {
//         "___": ["src/helpers.php"]
//     }
// }`,
      solution: `// composer.json
// {
//     "autoload": {
//         "files": ["src/helpers.php"]
//     }
// }`,
      hints: [
        'Some files need to be loaded on every request',
        'This is useful for function definitions that cannot be autoloaded',
        'The key is "files" in the autoload section',
      ],
      concepts: ['autoloading', 'files'],
    },
    {
      id: 'php-composer-7',
      title: 'Create Package Configuration',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function that returns a valid composer.json array structure with name, description, require (php >=8.1), autoload (PSR-4 with App\\\\ mapped to src/), and require-dev (phpunit).',
      skeleton: `<?php
function createComposerConfig(string \\\$vendorName, string \\\$projectName, string \\\$description): array {
    // Return array matching composer.json structure
}`,
      solution: `<?php
function createComposerConfig(string \\\$vendorName, string \\\$projectName, string \\\$description): array {
    return [
        'name' => "\\\$vendorName/\\\$projectName",
        'description' => \\\$description,
        'type' => 'project',
        'require' => [
            'php' => '>=8.1',
        ],
        'require-dev' => [
            'phpunit/phpunit' => '^10.0',
        ],
        'autoload' => [
            'psr-4' => [
                'App\\\\' => 'src/',
            ],
        ],
    ];
}`,
      hints: [
        'Package names use vendor/project format',
        'PSR-4 keys need double backslash in array notation',
        'require-dev is separate from require',
      ],
      concepts: ['composer-json', 'PSR-4', 'configuration'],
    },
    {
      id: 'php-composer-8',
      title: 'PSR-4 Class Resolver',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function resolveClassFile that takes a fully qualified class name and PSR-4 mappings array, and returns the file path.',
      skeleton: `<?php
function resolveClassFile(string \\\$className, array \\\$psr4Map): ?string {
    // \\\$psr4Map example: ['App\\\\' => 'src/', 'Lib\\\\' => 'lib/']
    // App\\Models\\User -> src/Models/User.php
    // Return null if no mapping matches
}`,
      solution: `<?php
function resolveClassFile(string \\\$className, array \\\$psr4Map): ?string {
    foreach (\\\$psr4Map as \\\$prefix => \\\$baseDir) {
        if (str_starts_with(\\\$className, \\\$prefix)) {
            \\\$relativeClass = substr(\\\$className, strlen(\\\$prefix));
            \\\$file = \\\$baseDir . str_replace('\\\\', '/', \\\$relativeClass) . '.php';
            return \\\$file;
        }
    }
    return null;
}`,
      hints: [
        'Check each PSR-4 prefix against the class name',
        'Remove the prefix to get the relative class name',
        'Replace backslashes with directory separators and add .php',
      ],
      concepts: ['PSR-4', 'autoloading', 'class-resolution'],
    },
    {
      id: 'php-composer-9',
      title: 'Version Constraint Validator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function satisfiesCaret that checks if a version string satisfies a caret constraint (e.g., ^7.2 allows >=7.2.0 and <8.0.0).',
      skeleton: `<?php
function satisfiesCaret(string \\\$constraint, string \\\$version): bool {
    // Parse the caret constraint (e.g., "^7.2")
    // Check version is >= constraint and < next major
}`,
      solution: `<?php
function satisfiesCaret(string \\\$constraint, string \\\$version): bool {
    \\\$min = ltrim(\\\$constraint, '^');
    \\\$parts = explode('.', \\\$min);
    \\\$major = (int) \\\$parts[0];
    \\\$nextMajor = \\\$major + 1;
    return version_compare(\\\$version, \\\$min, '>=')
        && version_compare(\\\$version, "\\\$nextMajor.0.0", '<');
}`,
      hints: [
        'Strip the ^ prefix to get the minimum version',
        'The maximum is the next major version',
        'Use version_compare() for proper version comparison',
      ],
      concepts: ['semver', 'version-constraints', 'version_compare'],
    },
    {
      id: 'php-composer-10',
      title: 'Simple Autoloader Implementation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function registerPsr4Autoloader that registers a PSR-4 autoloader using spl_autoload_register for a given namespace prefix and base directory.',
      skeleton: `<?php
function registerPsr4Autoloader(string \\\$prefix, string \\\$baseDir): void {
    // Register an autoloader with spl_autoload_register
    // Convert namespace to file path
    // Require the file if it exists
}`,
      solution: `<?php
function registerPsr4Autoloader(string \\\$prefix, string \\\$baseDir): void {
    \\\$prefix = trim(\\\$prefix, '\\\\') . '\\\\';
    \\\$baseDir = rtrim(\\\$baseDir, '/') . '/';

    spl_autoload_register(function (string \\\$class) use (\\\$prefix, \\\$baseDir) {
        if (!str_starts_with(\\\$class, \\\$prefix)) {
            return;
        }
        \\\$relativeClass = substr(\\\$class, strlen(\\\$prefix));
        \\\$file = \\\$baseDir . str_replace('\\\\', '/', \\\$relativeClass) . '.php';
        if (file_exists(\\\$file)) {
            require \\\$file;
        }
    });
}`,
      hints: [
        'Use spl_autoload_register to register the autoloader',
        'Check if the class starts with the prefix',
        'Convert namespace separators to directory separators',
      ],
      concepts: ['autoloading', 'spl_autoload_register', 'PSR-4'],
    },
    {
      id: 'php-composer-11',
      title: 'Script Runner Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function parseComposerScripts that reads a composer.json array and returns an array mapping script names to their commands.',
      skeleton: `<?php
function parseComposerScripts(array \\\$composerJson): array {
    // Extract the "scripts" section
    // Return associative array of script name => command
    // Return empty array if no scripts section
}`,
      solution: `<?php
function parseComposerScripts(array \\\$composerJson): array {
    return \\\$composerJson['scripts'] ?? [];
}`,
      hints: [
        'The scripts section is a top-level key in composer.json',
        'Use null coalescing to handle missing section',
        'It is already an associative array',
      ],
      concepts: ['composer-scripts', 'configuration-parsing'],
    },
    {
      id: 'php-composer-12',
      title: 'Dependency Tree Formatter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function formatDependencies that takes require and require-dev arrays and returns a formatted string listing all packages with their constraints, grouped by type.',
      skeleton: `<?php
function formatDependencies(array \\\$require, array \\\$requireDev): string {
    // Format like:
    // "Dependencies:\\n  guzzle: ^7.0\\n\\nDev Dependencies:\\n  phpunit: ^10.0"
}`,
      solution: `<?php
function formatDependencies(array \\\$require, array \\\$requireDev): string {
    \\\$output = "Dependencies:\\n";
    foreach (\\\$require as \\\$package => \\\$version) {
        \\\$output .= "  \\\$package: \\\$version\\n";
    }
    \\\$output .= "\\nDev Dependencies:\\n";
    foreach (\\\$requireDev as \\\$package => \\\$version) {
        \\\$output .= "  \\\$package: \\\$version\\n";
    }
    return rtrim(\\\$output);
}`,
      hints: [
        'Loop through each array to build the output',
        'Add section headers for require and require-dev',
        'Indent each package line with spaces',
      ],
      concepts: ['string-formatting', 'dependency-management'],
    },
    {
      id: 'php-composer-13',
      title: 'Fix Wrong Autoload Namespace',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the class that cannot be autoloaded because the namespace does not match the PSR-4 mapping.',
      skeleton: `<?php
// composer.json: "autoload": {"psr-4": {"App\\\\": "src/"}}
// File: src/Models/User.php

namespace Models;

class User {
    public string \\\$name;

    public function __construct(string \\\$name) {
        \\\$this->name = \\\$name;
    }
}
// Error: Class "App\\Models\\User" not found`,
      solution: `<?php
// composer.json: "autoload": {"psr-4": {"App\\\\": "src/"}}
// File: src/Models/User.php

namespace App\\Models;

class User {
    public string \\\$name;

    public function __construct(string \\\$name) {
        \\\$this->name = \\\$name;
    }
}`,
      hints: [
        'PSR-4 requires the namespace to match the directory structure',
        'The prefix "App\\\\" maps to "src/"',
        'Files in src/Models/ must use namespace App\\Models',
      ],
      concepts: ['PSR-4', 'namespaces', 'autoloading'],
    },
    {
      id: 'php-composer-14',
      title: 'Fix Missing Vendor Autoload',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the code that fails because the autoloader is not included.',
      skeleton: `<?php
use GuzzleHttp\\Client;

\\\$client = new Client();
\\\$response = \\\$client->get('https://api.example.com');
// Fatal error: Class "GuzzleHttp\\Client" not found`,
      solution: `<?php
require __DIR__ . '/vendor/autoload.php';

use GuzzleHttp\\Client;

\\\$client = new Client();
\\\$response = \\\$client->get('https://api.example.com');`,
      hints: [
        'Composer-installed packages need the autoloader',
        'Add a require statement for vendor/autoload.php',
        'Use __DIR__ for a reliable path reference',
      ],
      concepts: ['autoloading', 'require'],
    },
    {
      id: 'php-composer-15',
      title: 'Fix Duplicate Autoload Entry',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the composer.json that causes class conflicts due to overlapping autoload mappings.',
      skeleton: `<?php
// composer.json autoload section:
// "psr-4": {
//     "App\\\\": "src/",
//     "App\\\\Models\\\\": "src/Models/"
// }
// Bug: App\\Models\\User is resolved twice - ambiguous mapping

namespace App\\Models;

class User {
    public string \\\$name = 'test';
}`,
      solution: `<?php
// composer.json autoload section:
// "psr-4": {
//     "App\\\\": "src/"
// }
// Fixed: single mapping covers all App\\ namespaces

namespace App\\Models;

class User {
    public string \\\$name = 'test';
}`,
      hints: [
        'PSR-4 maps namespace prefixes to directories',
        '"App\\\\\\\\" already covers all subdirectories including Models',
        'Remove the redundant App\\Models\\\\ mapping',
      ],
      concepts: ['PSR-4', 'autoloading', 'configuration'],
    },
    {
      id: 'php-composer-16',
      title: 'Predict PSR-4 File Resolution',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict which file path the autoloader will look for given the PSR-4 mapping "App\\\\": "src/".',
      skeleton: `<?php
// PSR-4: "App\\\\": "src/"
// What file does this class resolve to?
use App\\Http\\Controllers\\UserController;
echo "File: ???";`,
      solution: `File: src/Http/Controllers/UserController.php`,
      hints: [
        'Replace the App\\\\ prefix with src/',
        'Convert namespace separators to directory separators',
        'Add .php extension',
      ],
      concepts: ['PSR-4', 'class-resolution'],
    },
    {
      id: 'php-composer-17',
      title: 'Predict Version Constraint Match',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict which versions satisfy the caret constraint ^7.2.',
      skeleton: `<?php
// Constraint: ^7.2
// Which of these satisfy it?
\\\$versions = ['7.1.0', '7.2.0', '7.3.5', '8.0.0'];
foreach (\\\$versions as \\\$v) {
    \\\$ok = version_compare(\\\$v, '7.2.0', '>=') && version_compare(\\\$v, '8.0.0', '<');
    echo "\\\$v: " . (\\\$ok ? 'yes' : 'no') . "\\n";
}`,
      solution: `7.1.0: no
7.2.0: yes
7.3.5: yes
8.0.0: no`,
      hints: [
        '^7.2 means >=7.2.0 and <8.0.0',
        '7.1.0 is below the minimum',
        '8.0.0 is at the next major boundary and excluded',
      ],
      concepts: ['semver', 'version-constraints'],
    },
    {
      id: 'php-composer-18',
      title: 'Predict Tilde vs Caret',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict whether version 7.3.0 satisfies ~7.2 and ^7.2.',
      skeleton: `<?php
// ~7.2 means >=7.2.0 and <7.3.0
// ^7.2 means >=7.2.0 and <8.0.0
\\\$v = '7.3.0';
\\\$tilde = version_compare(\\\$v, '7.2.0', '>=') && version_compare(\\\$v, '7.3.0', '<');
\\\$caret = version_compare(\\\$v, '7.2.0', '>=') && version_compare(\\\$v, '8.0.0', '<');
echo "~7.2: " . (\\\$tilde ? 'yes' : 'no') . "\\n";
echo "^7.2: " . (\\\$caret ? 'yes' : 'no') . "\\n";`,
      solution: `~7.2: no
^7.2: yes`,
      hints: [
        'Tilde ~7.2 only allows 7.2.x versions',
        'Caret ^7.2 allows up to but not including 8.0.0',
        '7.3.0 is outside tilde range but inside caret range',
      ],
      concepts: ['semver', 'tilde-vs-caret'],
    },
    {
      id: 'php-composer-19',
      title: 'Refactor Require Statements to Autoloading',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the manual require statements to use Composer autoloading.',
      skeleton: `<?php
require 'src/Models/User.php';
require 'src/Models/Post.php';
require 'src/Services/AuthService.php';
require 'src/Services/MailService.php';
require 'src/Http/Router.php';

use Models\\User;
use Models\\Post;
use Services\\AuthService;

\\\$user = new User();
\\\$auth = new AuthService();`,
      solution: `<?php
require __DIR__ . '/vendor/autoload.php';

use App\\Models\\User;
use App\\Models\\Post;
use App\\Services\\AuthService;

\\\$user = new User();
\\\$auth = new AuthService();`,
      hints: [
        'Replace all manual requires with a single autoloader require',
        'Ensure namespaces match the PSR-4 convention',
        'With "App\\\\": "src/", all classes get the App\\ prefix',
      ],
      concepts: ['autoloading', 'PSR-4', 'refactoring'],
    },
    {
      id: 'php-composer-20',
      title: 'Refactor Hardcoded Config to Composer Scripts',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the shell commands documented in comments into a proper composer.json scripts section.',
      skeleton: `<?php
// Developer documentation:
// To run tests: php vendor/bin/phpunit --coverage-text
// To check style: php vendor/bin/php-cs-fixer fix --dry-run
// To analyze: php vendor/bin/phpstan analyse src
// To serve: php -S localhost:8000 -t public

// Currently developers have to remember all these commands.
// Refactor to show the composer.json "scripts" section.`,
      solution: `<?php
// composer.json "scripts" section:
// {
//     "scripts": {
//         "test": "phpunit --coverage-text",
//         "lint": "php-cs-fixer fix --dry-run",
//         "analyse": "phpstan analyse src",
//         "serve": "php -S localhost:8000 -t public",
//         "check": [
//             "@lint",
//             "@analyse",
//             "@test"
//         ]
//     }
// }
//
// Usage:
// composer test
// composer lint
// composer analyse
// composer serve
// composer check  (runs lint, analyse, and test)`,
      hints: [
        'Composer scripts replace manual command documentation',
        'Each script is a key-value pair in the scripts section',
        'Use @ references to create composite scripts',
      ],
      concepts: ['composer-scripts', 'developer-experience', 'refactoring'],
    },
  ],
};
