import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-template',
  title: '39. Templating',
  explanation: `## Templating in PHP

PHP itself is a templating language, but structured approaches prevent mixing logic with presentation. Techniques include output buffering, extract(), and template engines.

### Output Buffering
\`\`\`php
<?php
ob_start();
include 'templates/header.php';
\\\$content = ob_get_clean();
echo \\\$content;
\`\`\`

### extract() for Template Variables
\`\`\`php
<?php
function render(string \\\$template, array \\\$data): string {
    extract(\\\$data);
    ob_start();
    include \\\$template;
    return ob_get_clean();
}

echo render('profile.php', ['name' => 'Alice', 'age' => 30]);
// In profile.php: <h1><?= \\\$name ?></h1>
\`\`\`

### Escaping Output
\`\`\`php
<?php
function e(string \\\$value): string {
    return htmlspecialchars(\\\$value, ENT_QUOTES, 'UTF-8');
}
?>
<h1><?= e(\\\$title) ?></h1>
<p><?= e(\\\$body) ?></p>
\`\`\`

### Template Inheritance (Blade-style concept)
\`\`\`php
<?php
// layout.php
// <html><body><?= \\\$content ?></body></html>

// page.php
\\\$content = render('partial.php', \\\$data);
echo render('layout.php', ['content' => \\\$content]);
\`\`\`

### Twig-style Syntax (concept)
\`\`\`
{{ variable }}          {# escaped output #}
{% if condition %}      {# control structure #}
{% for item in items %} {# loop #}
{{ variable|upper }}    {# filter #}
\`\`\``,
  exercises: [
    {
      id: 'php-template-1',
      title: 'Start Output Buffering',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to start capturing output.',
      skeleton: `<?php
___();
echo "Hello World";
\\\$output = ob_get_clean();`,
      solution: `<?php
ob_start();
echo "Hello World";
\\\$output = ob_get_clean();`,
      hints: [
        'Output buffering captures echo/print output',
        'Start buffering before any output',
        'Use ob_start() to begin buffering',
      ],
      concepts: ['output-buffering', 'ob_start'],
    },
    {
      id: 'php-template-2',
      title: 'Get and Clean Buffer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to retrieve the buffered output and close the buffer.',
      skeleton: `<?php
ob_start();
echo "<h1>Title</h1>";
\\\$html = ___();`,
      solution: `<?php
ob_start();
echo "<h1>Title</h1>";
\\\$html = ob_get_clean();`,
      hints: [
        'You need to get the buffer contents and close it',
        'There is a single function that does both',
        'Use ob_get_clean() to get contents and close buffer',
      ],
      concepts: ['output-buffering', 'ob_get_clean'],
    },
    {
      id: 'php-template-3',
      title: 'Extract Variables',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to convert an associative array into local variables.',
      skeleton: `<?php
\\\$data = ['name' => 'Alice', 'age' => 30];
___(\\\$data);
echo "\\\$name is \\\$age years old";`,
      solution: `<?php
\\\$data = ['name' => 'Alice', 'age' => 30];
extract(\\\$data);
echo "\\\$name is \\\$age years old";`,
      hints: [
        'PHP has a function to create variables from array keys',
        'Each key becomes a variable name',
        'Use extract() to import variables',
      ],
      concepts: ['extract', 'template-variables'],
    },
    {
      id: 'php-template-4',
      title: 'Escape Output Helper',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to create a short escape helper function.',
      skeleton: `<?php
function e(string \\\$value): string {
    return ___(\\\$value, ENT_QUOTES, 'UTF-8');
}`,
      solution: `<?php
function e(string \\\$value): string {
    return htmlspecialchars(\\\$value, ENT_QUOTES, 'UTF-8');
}`,
      hints: [
        'The escape function wraps HTML entity encoding',
        'It prevents XSS by encoding special characters',
        'Use htmlspecialchars()',
      ],
      concepts: ['escaping', 'XSS-prevention'],
    },
    {
      id: 'php-template-5',
      title: 'Short Echo Syntax',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to use the short echo syntax in a template.',
      skeleton: `<h1>___ e(\\\$title) ___</h1>
<p>___ e(\\\$body) ___</p>`,
      solution: `<h1><?= e(\\\$title) ?></h1>
<p><?= e(\\\$body) ?></p>`,
      hints: [
        'PHP has a shorthand for echoing values in templates',
        '<?= is equivalent to <?php echo',
        'Close with ?> as normal',
      ],
      concepts: ['short-echo', 'template-syntax'],
    },
    {
      id: 'php-template-6',
      title: 'Include Template File',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to include a template file within the output buffer.',
      skeleton: `<?php
function renderTemplate(string \\\$file, array \\\$data): string {
    extract(\\\$data);
    ob_start();
    ___ \\\$file;
    return ob_get_clean();
}`,
      solution: `<?php
function renderTemplate(string \\\$file, array \\\$data): string {
    extract(\\\$data);
    ob_start();
    include \\\$file;
    return ob_get_clean();
}`,
      hints: [
        'PHP includes another file at runtime',
        'The included file can use extracted variables',
        'Use include to bring in the template file',
      ],
      concepts: ['include', 'template-rendering'],
    },
    {
      id: 'php-template-7',
      title: 'Build Simple Template Engine',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a TemplateEngine class with render(string \$template, array \$data): string that replaces {{key}} placeholders with escaped values from the data array.',
      skeleton: `<?php
class TemplateEngine {
    // render(string \\\$template, array \\\$data): string
    // Replace {{key}} with escaped data values
}`,
      solution: `<?php
class TemplateEngine {
    public function render(string \\\$template, array \\\$data): string {
        return preg_replace_callback('/\\{\\{\\s*(\\w+)\\s*\\}\\}/', function(\\\$matches) use (\\\$data) {
            \\\$key = \\\$matches[1];
            \\\$value = \\\$data[\\\$key] ?? '';
            return htmlspecialchars((string) \\\$value, ENT_QUOTES, 'UTF-8');
        }, \\\$template);
    }
}`,
      hints: [
        'Use preg_replace_callback for dynamic replacements',
        'Match the {{ key }} pattern with regex',
        'Always escape the output values',
      ],
      concepts: ['template-engine', 'regex', 'escaping'],
    },
    {
      id: 'php-template-8',
      title: 'Template with Layouts',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a render function that supports a layout. It renders the content template first, then wraps it in a layout template by passing the result as a \$content variable.',
      skeleton: `<?php
function renderWithLayout(
    string \\\$layoutFile,
    string \\\$contentFile,
    array \\\$data
): string {
    // Render content template first
    // Pass result as 'content' to layout template
    // Return final HTML
}`,
      solution: `<?php
function renderWithLayout(
    string \\\$layoutFile,
    string \\\$contentFile,
    array \\\$data
): string {
    extract(\\\$data);
    ob_start();
    include \\\$contentFile;
    \\\$content = ob_get_clean();

    ob_start();
    include \\\$layoutFile;
    return ob_get_clean();
}`,
      hints: [
        'Render the content template first into a \$content variable',
        'Then render the layout which uses \$content',
        'Use nested output buffering',
      ],
      concepts: ['template-inheritance', 'layouts'],
    },
    {
      id: 'php-template-9',
      title: 'Block-Based Template System',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a Template class that supports named blocks. startBlock(name) begins capturing, endBlock() stops. getBlock(name) returns the captured content.',
      skeleton: `<?php
class Template {
    // startBlock(string \\\$name): void
    // endBlock(): void
    // getBlock(string \\\$name): string
}`,
      solution: `<?php
class Template {
    private array \\\$blocks = [];
    private array \\\$blockStack = [];

    public function startBlock(string \\\$name): void {
        \\\$this->blockStack[] = \\\$name;
        ob_start();
    }

    public function endBlock(): void {
        \\\$name = array_pop(\\\$this->blockStack);
        \\\$this->blocks[\\\$name] = ob_get_clean();
    }

    public function getBlock(string \\\$name, string \\\$default = ''): string {
        return \\\$this->blocks[\\\$name] ?? \\\$default;
    }
}`,
      hints: [
        'Use a stack to track nested blocks',
        'ob_start captures block content',
        'ob_get_clean retrieves and closes the buffer',
      ],
      concepts: ['template-blocks', 'output-buffering'],
    },
    {
      id: 'php-template-10',
      title: 'Template with Conditionals and Loops',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a MicroTemplate class that processes a template string with {{var}}, {%if var%}...{%endif%}, and {%each items%}...{%endeach%} directives.',
      skeleton: `<?php
class MicroTemplate {
    // render(string \\\$template, array \\\$data): string
    // Support {{var}}, {%if%}, {%each%}
}`,
      solution: `<?php
class MicroTemplate {
    public function render(string \\\$template, array \\\$data): string {
        // Process each loops
        \\\$template = preg_replace_callback(
            '/\\{%each (\\w+)%\\}(.*?)\\{%endeach%\\}/s',
            function(\\\$m) use (\\\$data) {
                \\\$items = \\\$data[\\\$m[1]] ?? [];
                \\\$output = '';
                foreach (\\\$items as \\\$item) {
                    \\\$output .= preg_replace_callback('/\\{\\{item\\}\\}/', fn() => htmlspecialchars((string) \\\$item, ENT_QUOTES, 'UTF-8'), \\\$m[2]);
                }
                return \\\$output;
            },
            \\\$template
        );
        // Process conditionals
        \\\$template = preg_replace_callback(
            '/\\{%if (\\w+)%\\}(.*?)\\{%endif%\\}/s',
            fn(\\\$m) => !empty(\\\$data[\\\$m[1]]) ? \\\$m[2] : '',
            \\\$template
        );
        // Process variables
        \\\$template = preg_replace_callback(
            '/\\{\\{(\\w+)\\}\\}/',
            fn(\\\$m) => htmlspecialchars((string) (\\\$data[\\\$m[1]] ?? ''), ENT_QUOTES, 'UTF-8'),
            \\\$template
        );
        return \\\$template;
    }
}`,
      hints: [
        'Process loops first since they may contain variables',
        'Use /s flag in regex to match across newlines',
        'Always escape output values',
      ],
      concepts: ['template-engine', 'directives', 'regex'],
    },
    {
      id: 'php-template-11',
      title: 'Template Filter System',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a FilterableTemplate class that supports pipe-style filters like {{name|upper}} and {{price|currency}}.',
      skeleton: `<?php
class FilterableTemplate {
    private array \\\$filters = [];
    // registerFilter(string \\\$name, callable \\\$fn): void
    // render(string \\\$template, array \\\$data): string
    // Support {{var|filter}} syntax
}`,
      solution: `<?php
class FilterableTemplate {
    private array \\\$filters = [];

    public function registerFilter(string \\\$name, callable \\\$fn): void {
        \\\$this->filters[\\\$name] = \\\$fn;
    }

    public function render(string \\\$template, array \\\$data): string {
        return preg_replace_callback('/\\{\\{\\s*(\\w+)(?:\\|(\\w+))?\\s*\\}\\}/', function(\\\$m) use (\\\$data) {
            \\\$value = (string) (\\\$data[\\\$m[1]] ?? '');
            if (isset(\\\$m[2]) && isset(\\\$this->filters[\\\$m[2]])) {
                \\\$value = (\\\$this->filters[\\\$m[2]])(\\\$value);
            }
            return htmlspecialchars(\\\$value, ENT_QUOTES, 'UTF-8');
        }, \\\$template);
    }
}`,
      hints: [
        'Parse the filter name from the pipe syntax',
        'Look up the filter callable and apply it',
        'Always escape the final output',
      ],
      concepts: ['template-filters', 'pipes'],
    },
    {
      id: 'php-template-12',
      title: 'Safe Template Renderer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a safe render function that isolates template rendering in its own scope, preventing access to outer variables except those in \$data.',
      skeleton: `<?php
function safeRender(string \\\$templateFile, array \\\$data): string {
    // Render in isolated scope
    // Only \\\$data variables should be available
    // Return the output
}`,
      solution: `<?php
function safeRender(string \\\$templateFile, array \\\$data): string {
    return (static function(string \\\$__file, array \\\$__data): string {
        extract(\\\$__data);
        ob_start();
        include \\\$__file;
        return ob_get_clean();
    })(\\\$templateFile, \\\$data);
}`,
      hints: [
        'Use an immediately invoked closure for scope isolation',
        'Use static function to prevent access to \$this',
        'Prefix internal variables with __ to avoid collisions',
      ],
      concepts: ['scope-isolation', 'closures', 'security'],
    },
    {
      id: 'php-template-13',
      title: 'Fix Unescaped Output',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the template that is vulnerable to XSS because output is not escaped.',
      skeleton: `<?php
\\\$name = \\\$_GET['name'];
\\\$bio = \\\$_GET['bio'];
?>
<h1>Profile: <?= \\\$name ?></h1>
<p><?= \\\$bio ?></p>`,
      solution: `<?php
\\\$name = \\\$_GET['name'];
\\\$bio = \\\$_GET['bio'];
function e(string \\\$v): string { return htmlspecialchars(\\\$v, ENT_QUOTES, 'UTF-8'); }
?>
<h1>Profile: <?= e(\\\$name) ?></h1>
<p><?= e(\\\$bio) ?></p>`,
      hints: [
        'User input displayed directly creates XSS vulnerability',
        'Always escape output with htmlspecialchars',
        'Create a short helper function for convenience',
      ],
      concepts: ['XSS-prevention', 'escaping', 'debugging'],
    },
    {
      id: 'php-template-14',
      title: 'Fix Buffer Not Closed',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the template rendering that leaks output because the buffer is not properly cleaned up.',
      skeleton: `<?php
function renderPartial(string \\\$file, array \\\$data): string {
    extract(\\\$data);
    ob_start();
    include \\\$file;
    // Bug: forgot to clean the buffer, output leaks
    return '';
}`,
      solution: `<?php
function renderPartial(string \\\$file, array \\\$data): string {
    extract(\\\$data);
    ob_start();
    include \\\$file;
    return ob_get_clean();
}`,
      hints: [
        'ob_start begins buffering but the buffer is never retrieved',
        'Use ob_get_clean() to get contents and close buffer',
        'Without this, the output leaks to the browser',
      ],
      concepts: ['output-buffering', 'memory-leak', 'debugging'],
    },
    {
      id: 'php-template-15',
      title: 'Fix extract Overwriting Variables',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the template that breaks because extract() overwrites critical local variables.',
      skeleton: `<?php
function render(string \\\$file, array \\\$data): string {
    // Bug: if \\\$data contains 'file' key, it overwrites \\\$file
    extract(\\\$data);
    ob_start();
    include \\\$file;  // \\\$file is now corrupted!
    return ob_get_clean();
}`,
      solution: `<?php
function render(string \\\$__file, array \\\$__data): string {
    extract(\\\$__data, EXTR_SKIP);
    ob_start();
    include \\\$__file;
    return ob_get_clean();
}`,
      hints: [
        'extract can overwrite existing variables',
        'Use EXTR_SKIP flag to not overwrite existing vars',
        'Also prefix internal variables with __ to avoid conflicts',
      ],
      concepts: ['extract', 'variable-safety', 'debugging'],
    },
    {
      id: 'php-template-16',
      title: 'Predict Template Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the output of the template rendering.',
      skeleton: `<?php
function render(string \\\$tpl, array \\\$data): string {
    return preg_replace_callback('/\\{\\{(\\w+)\\}\\}/', fn(\\\$m) => \\\$data[\\\$m[1]] ?? '', \\\$tpl);
}
echo render('Hello {{name}}, age {{age}}!', ['name' => 'Bob', 'age' => '25']);`,
      solution: `Hello Bob, age 25!`,
      hints: [
        '{{name}} is replaced with "Bob"',
        '{{age}} is replaced with "25"',
        'The rest of the template is unchanged',
      ],
      concepts: ['template-rendering', 'placeholders'],
    },
    {
      id: 'php-template-17',
      title: 'Predict extract Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the variables created by extract().',
      skeleton: `<?php
\\\$data = ['x' => 10, 'y' => 20, 'z' => 30];
extract(\\\$data);
echo \\\$x + \\\$y + \\\$z;`,
      solution: `60`,
      hints: [
        'extract creates variables from array keys',
        '\$x=10, \$y=20, \$z=30',
        '10 + 20 + 30 = 60',
      ],
      concepts: ['extract', 'variable-creation'],
    },
    {
      id: 'php-template-18',
      title: 'Predict Output Buffering',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict what ob_get_clean returns.',
      skeleton: `<?php
ob_start();
echo "first ";
echo "second ";
echo "third";
\\\$result = ob_get_clean();
echo strlen(\\\$result);`,
      solution: `18`,
      hints: [
        'All three echo calls are captured in the buffer',
        'The buffer contains "first second third"',
        'strlen counts the characters: 18',
      ],
      concepts: ['output-buffering', 'string-length'],
    },
    {
      id: 'php-template-19',
      title: 'Refactor Inline PHP to Template',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the code that mixes PHP logic with HTML into a clean separation using a render function.',
      skeleton: `<?php
\\\$users = getUsers();
\\\$title = 'User List';
?>
<!DOCTYPE html>
<html>
<head><title><?php echo \\\$title; ?></title></head>
<body>
<h1><?php echo \\\$title; ?></h1>
<ul>
<?php foreach (\\\$users as \\\$user): ?>
    <li><?php echo htmlspecialchars(\\\$user['name']); ?> - <?php echo htmlspecialchars(\\\$user['email']); ?></li>
<?php endforeach; ?>
</ul>
</body>
</html>`,
      solution: `<?php
function e(string \\\$v): string {
    return htmlspecialchars(\\\$v, ENT_QUOTES, 'UTF-8');
}

function render(string \\\$template, array \\\$data): string {
    extract(\\\$data, EXTR_SKIP);
    ob_start();
    include \\\$template;
    return ob_get_clean();
}

// Controller logic
\\\$users = getUsers();
echo render('users.template.php', [
    'title' => 'User List',
    'users' => \\\$users,
]);

// users.template.php:
// <!DOCTYPE html>
// <html>
// <head><title><?= e(\\\$title) ?></title></head>
// <body>
// <h1><?= e(\\\$title) ?></h1>
// <ul>
// <?php foreach (\\\$users as \\\$user): ?>
//     <li><?= e(\\\$user['name']) ?> - <?= e(\\\$user['email']) ?></li>
// <?php endforeach; ?>
// </ul>
// </body>
// </html>`,
      hints: [
        'Separate logic (controller) from presentation (template)',
        'Use a render function with output buffering',
        'Move HTML to a separate template file',
      ],
      concepts: ['separation-of-concerns', 'template-rendering', 'refactoring'],
    },
    {
      id: 'php-template-20',
      title: 'Refactor String Concatenation to Template',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the function that builds HTML through string concatenation into a proper template approach.',
      skeleton: `<?php
function buildUserCard(array \\\$user): string {
    \\\$html = '<div class="card">';
    \\\$html .= '<h2>' . htmlspecialchars(\\\$user['name']) . '</h2>';
    \\\$html .= '<p>Email: ' . htmlspecialchars(\\\$user['email']) . '</p>';
    if (!empty(\\\$user['bio'])) {
        \\\$html .= '<p class="bio">' . htmlspecialchars(\\\$user['bio']) . '</p>';
    }
    \\\$html .= '<ul>';
    foreach (\\\$user['skills'] as \\\$skill) {
        \\\$html .= '<li>' . htmlspecialchars(\\\$skill) . '</li>';
    }
    \\\$html .= '</ul>';
    \\\$html .= '</div>';
    return \\\$html;
}`,
      solution: `<?php
function e(string \\\$v): string {
    return htmlspecialchars(\\\$v, ENT_QUOTES, 'UTF-8');
}

function buildUserCard(array \\\$user): string {
    extract(\\\$user, EXTR_SKIP);
    ob_start();
    ?>
    <div class="card">
        <h2><?= e(\\\$name) ?></h2>
        <p>Email: <?= e(\\\$email) ?></p>
        <?php if (!empty(\\\$bio)): ?>
            <p class="bio"><?= e(\\\$bio) ?></p>
        <?php endif; ?>
        <ul>
            <?php foreach (\\\$skills as \\\$skill): ?>
                <li><?= e(\\\$skill) ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
    <?php
    return ob_get_clean();
}`,
      hints: [
        'Replace concatenation with inline PHP template syntax',
        'Use <?= ?> short echo tags for output',
        'Use alternative syntax (if/endif, foreach/endforeach) for readability',
      ],
      concepts: ['template-syntax', 'refactoring', 'readability'],
    },
  ],
};
