import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-attr',
  title: '42. PHP 8.0 Attributes',
  explanation: `## PHP 8.0 Attributes

Attributes (introduced in PHP 8.0) provide structured metadata for classes, methods, properties, and parameters -- replacing docblock annotations with native syntax.

### Basic Attribute Usage
\`\`\`php
<?php
#[Attribute]
class Route {
    public function __construct(
        public string \$path,
        public string \$method = 'GET'
    ) {}
}

#[Route('/api/users', 'GET')]
function listUsers(): array {
    return [];
}
\`\`\`

### Reading Attributes via Reflection
\`\`\`php
<?php
\$ref = new ReflectionFunction('listUsers');
\$attrs = \$ref->getAttributes(Route::class);
foreach (\$attrs as \$attr) {
    \$route = \$attr->newInstance();
    echo \$route->path;   // "/api/users"
    echo \$route->method; // "GET"
}
\`\`\`

### Attribute Targets
\`\`\`php
<?php
#[Attribute(Attribute::TARGET_METHOD)]
class Cache {
    public function __construct(public int \$ttl = 3600) {}
}

#[Attribute(Attribute::TARGET_PROPERTY)]
class Column {
    public function __construct(public string \$name) {}
}
\`\`\`

### Repeated Attributes
\`\`\`php
<?php
#[Attribute(Attribute::TARGET_METHOD | Attribute::IS_REPEATABLE)]
class Middleware {
    public function __construct(public string \$name) {}
}

#[Middleware('auth')]
#[Middleware('logging')]
function dashboard(): void {}
\`\`\`

### Built-in Attributes
\`\`\`php
<?php
#[\\Override]    // PHP 8.3: verify method overrides parent
#[\\Deprecated] // PHP 8.4: mark as deprecated
class MyClass {
    #[\\Override]
    public function toString(): string { return ''; }
}
\`\`\``,
  exercises: [
    {
      id: 'php-attr-1',
      title: 'Define a Basic Attribute',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to mark a class as an attribute.',
      skeleton: `<?php
___
class Description {
    public function __construct(public string \$text) {}
}`,
      solution: `<?php
#[Attribute]
class Description {
    public function __construct(public string \$text) {}
}`,
      hints: [
        'Use #[Attribute] to declare a class as an attribute.',
        'This is placed directly above the class declaration.',
        'Attribute is a built-in PHP class.',
      ],
      concepts: ['Attribute', 'declaration', 'metadata'],
    },
    {
      id: 'php-attr-2',
      title: 'Apply an Attribute',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to apply a Route attribute to a function.',
      skeleton: `<?php
#[Attribute]
class Route {
    public function __construct(public string \$path) {}
}

___
function home(): string {
    return 'Welcome';
}`,
      solution: `<?php
#[Attribute]
class Route {
    public function __construct(public string \$path) {}
}

#[Route('/home')]
function home(): string {
    return 'Welcome';
}`,
      hints: [
        'Apply attributes with #[ClassName(args)].',
        'Place it directly above the function.',
        'Pass the path as a constructor argument.',
      ],
      concepts: ['apply-attribute', 'syntax', 'constructor-args'],
    },
    {
      id: 'php-attr-3',
      title: 'Read Attribute with Reflection',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to get attributes from a function via reflection.',
      skeleton: `<?php
\$ref = new ReflectionFunction('home');
\$attrs = \$ref->___(Route::class);
\$route = \$attrs[0]->newInstance();
echo \$route->path;`,
      solution: `<?php
\$ref = new ReflectionFunction('home');
\$attrs = \$ref->getAttributes(Route::class);
\$route = \$attrs[0]->newInstance();
echo \$route->path;`,
      hints: [
        'getAttributes() returns attribute reflections.',
        'Pass the class name to filter by type.',
        'newInstance() creates the attribute object.',
      ],
      concepts: ['getAttributes', 'ReflectionFunction', 'newInstance'],
    },
    {
      id: 'php-attr-4',
      title: 'Attribute Target Restriction',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to restrict an attribute to methods only.',
      skeleton: `<?php
#[Attribute(___)]
class CacheResult {
    public function __construct(public int \$ttl = 60) {}
}`,
      solution: `<?php
#[Attribute(Attribute::TARGET_METHOD)]
class CacheResult {
    public function __construct(public int \$ttl = 60) {}
}`,
      hints: [
        'Use Attribute::TARGET_METHOD to restrict to methods.',
        'Pass it as argument to the #[Attribute(...)] declaration.',
        'This prevents applying the attribute to classes or properties.',
      ],
      concepts: ['TARGET_METHOD', 'target-restriction', 'validation'],
    },
    {
      id: 'php-attr-5',
      title: 'Repeatable Attribute',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to make an attribute repeatable.',
      skeleton: `<?php
#[Attribute(Attribute::TARGET_METHOD | ___)]
class Tag {
    public function __construct(public string \$name) {}
}`,
      solution: `<?php
#[Attribute(Attribute::TARGET_METHOD | Attribute::IS_REPEATABLE)]
class Tag {
    public function __construct(public string \$name) {}
}`,
      hints: [
        'IS_REPEATABLE allows multiple instances on the same target.',
        'Combine with target using the | (bitwise OR) operator.',
        'Without it, applying twice causes an error.',
      ],
      concepts: ['IS_REPEATABLE', 'bitwise-or', 'multiple-attributes'],
    },
    {
      id: 'php-attr-6',
      title: 'Property Attribute',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to apply an attribute to a class property.',
      skeleton: `<?php
#[Attribute(Attribute::TARGET_PROPERTY)]
class Column {
    public function __construct(public string \$name) {}
}

class User {
    ___
    public string \$email;
}`,
      solution: `<?php
#[Attribute(Attribute::TARGET_PROPERTY)]
class Column {
    public function __construct(public string \$name) {}
}

class User {
    #[Column('email_address')]
    public string \$email;
}`,
      hints: [
        'Apply attributes to properties the same way as functions.',
        'Place #[Column(...)] above the property.',
        'The Column name maps to the database column.',
      ],
      concepts: ['property-attribute', 'ORM-mapping', 'Column'],
    },
    {
      id: 'php-attr-7',
      title: 'Write Attribute Reader',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function getRoutes(string $className): array that uses reflection to find all methods with a Route attribute and returns an array of [path => methodName] pairs.',
      skeleton: `<?php
// Write the getRoutes function`,
      solution: `<?php
function getRoutes(string \$className): array {
    \$ref = new ReflectionClass(\$className);
    \$routes = [];
    foreach (\$ref->getMethods() as \$method) {
        \$attrs = \$method->getAttributes(Route::class);
        foreach (\$attrs as \$attr) {
            \$route = \$attr->newInstance();
            \$routes[\$route->path] = \$method->getName();
        }
    }
    return \$routes;
}`,
      hints: [
        'Use ReflectionClass to inspect the class.',
        'Iterate over getMethods() and check getAttributes().',
        'newInstance() creates the attribute to read its properties.',
      ],
      concepts: ['ReflectionClass', 'route-discovery', 'attribute-reader'],
    },
    {
      id: 'php-attr-8',
      title: 'Write a Validation Attribute',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a #[Required] attribute class targeting properties, and a function validate(object $obj): array that returns names of properties marked #[Required] that are empty or null.',
      skeleton: `<?php
// Write the Required attribute and validate function`,
      solution: `<?php
#[Attribute(Attribute::TARGET_PROPERTY)]
class Required {}

function validate(object \$obj): array {
    \$errors = [];
    \$ref = new ReflectionObject(\$obj);
    foreach (\$ref->getProperties() as \$prop) {
        \$attrs = \$prop->getAttributes(Required::class);
        if (!empty(\$attrs)) {
            \$prop->setAccessible(true);
            \$value = \$prop->getValue(\$obj);
            if (\$value === null || \$value === '') {
                \$errors[] = \$prop->getName();
            }
        }
    }
    return \$errors;
}`,
      hints: [
        'Create a simple marker attribute with no constructor.',
        'Use ReflectionObject to inspect the object.',
        'Check if required properties have non-empty values.',
      ],
      concepts: ['marker-attribute', 'validation', 'reflection'],
    },
    {
      id: 'php-attr-9',
      title: 'Write an Event Listener Attribute',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a #[ListensTo(string $event)] attribute and a function discoverListeners(string $className): array that returns [event => [methodName, ...]] mappings.',
      skeleton: `<?php
// Write the ListensTo attribute and discoverListeners function`,
      solution: `<?php
#[Attribute(Attribute::TARGET_METHOD | Attribute::IS_REPEATABLE)]
class ListensTo {
    public function __construct(public string \$event) {}
}

function discoverListeners(string \$className): array {
    \$ref = new ReflectionClass(\$className);
    \$listeners = [];
    foreach (\$ref->getMethods() as \$method) {
        \$attrs = \$method->getAttributes(ListensTo::class);
        foreach (\$attrs as \$attr) {
            \$instance = \$attr->newInstance();
            \$listeners[\$instance->event][] = \$method->getName();
        }
    }
    return \$listeners;
}`,
      hints: [
        'Make ListensTo repeatable so methods can listen to multiple events.',
        'Use ReflectionClass to iterate methods.',
        'Group method names by event name.',
      ],
      concepts: ['event-listener', 'repeatable', 'discovery'],
    },
    {
      id: 'php-attr-10',
      title: 'Write an Attribute-Based Serializer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a #[JsonField(string $name)] attribute and a function serialize(object $obj): array that builds an array using JsonField names as keys and property values as values.',
      skeleton: `<?php
// Write the JsonField attribute and serialize function`,
      solution: `<?php
#[Attribute(Attribute::TARGET_PROPERTY)]
class JsonField {
    public function __construct(public string \$name) {}
}

function serialize(object \$obj): array {
    \$ref = new ReflectionObject(\$obj);
    \$result = [];
    foreach (\$ref->getProperties() as \$prop) {
        \$attrs = \$prop->getAttributes(JsonField::class);
        if (!empty(\$attrs)) {
            \$field = \$attrs[0]->newInstance();
            \$prop->setAccessible(true);
            \$result[\$field->name] = \$prop->getValue(\$obj);
        }
    }
    return \$result;
}`,
      hints: [
        'JsonField maps a property to a specific JSON key name.',
        'Use reflection to read properties and their attributes.',
        'Build the array with custom keys from the attribute.',
      ],
      concepts: ['serialization', 'property-mapping', 'custom-attribute'],
    },
    {
      id: 'php-attr-11',
      title: 'Write a Middleware Collector',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function getMiddleware(string $class, string $method): array that returns all Middleware attribute names applied to a specific method.',
      skeleton: `<?php
// Assume Middleware attribute exists
// Write the getMiddleware function`,
      solution: `<?php
function getMiddleware(string \$class, string \$method): array {
    \$ref = new ReflectionMethod(\$class, \$method);
    \$attrs = \$ref->getAttributes(Middleware::class);
    return array_map(
        fn(\$attr) => \$attr->newInstance()->name,
        \$attrs
    );
}`,
      hints: [
        'Use ReflectionMethod to reflect on a specific method.',
        'Get all Middleware attributes.',
        'Map each to its name property.',
      ],
      concepts: ['ReflectionMethod', 'array_map', 'middleware'],
    },
    {
      id: 'php-attr-12',
      title: 'Write a Deprecated Method Finder',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function findDeprecated(string $className): array that returns the names of all methods in a class that have a #[Deprecated] attribute.',
      skeleton: `<?php
// Write Deprecated attribute and findDeprecated function`,
      solution: `<?php
#[Attribute(Attribute::TARGET_METHOD)]
class Deprecated {
    public function __construct(public string \$reason = '') {}
}

function findDeprecated(string \$className): array {
    \$ref = new ReflectionClass(\$className);
    \$methods = [];
    foreach (\$ref->getMethods() as \$method) {
        if (!empty(\$method->getAttributes(Deprecated::class))) {
            \$methods[] = \$method->getName();
        }
    }
    return \$methods;
}`,
      hints: [
        'Check each method for the Deprecated attribute.',
        'getAttributes returns empty array if no match.',
        'Collect method names that have the attribute.',
      ],
      concepts: ['deprecation', 'code-analysis', 'reflection'],
    },
    {
      id: 'php-attr-13',
      title: 'Fix Missing Attribute Declaration',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the class that is used as an attribute but not declared as one.',
      skeleton: `<?php
class Route {
    public function __construct(public string \$path) {}
}

#[Route('/home')]
function home(): void {}`,
      solution: `<?php
#[Attribute]
class Route {
    public function __construct(public string \$path) {}
}

#[Route('/home')]
function home(): void {}`,
      hints: [
        'Classes used as attributes must be declared with #[Attribute].',
        'Add #[Attribute] above the Route class.',
        'Without it, newInstance() will fail.',
      ],
      concepts: ['Attribute-declaration', 'missing-annotation', 'fix'],
    },
    {
      id: 'php-attr-14',
      title: 'Fix Wrong Attribute Target',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the attribute that targets methods but is applied to a property.',
      skeleton: `<?php
#[Attribute(Attribute::TARGET_METHOD)]
class Validate {
    public function __construct(public string \$rule) {}
}

class Form {
    #[Validate('email')]
    public string \$email = '';
}`,
      solution: `<?php
#[Attribute(Attribute::TARGET_PROPERTY)]
class Validate {
    public function __construct(public string \$rule) {}
}

class Form {
    #[Validate('email')]
    public string \$email = '';
}`,
      hints: [
        'TARGET_METHOD only allows the attribute on methods.',
        'Change to TARGET_PROPERTY since it is on a property.',
        'Or use TARGET_ALL to allow it anywhere.',
      ],
      concepts: ['target-mismatch', 'TARGET_PROPERTY', 'fix'],
    },
    {
      id: 'php-attr-15',
      title: 'Fix Non-Repeatable Attribute',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the error caused by applying a non-repeatable attribute twice.',
      skeleton: `<?php
#[Attribute(Attribute::TARGET_METHOD)]
class Role {
    public function __construct(public string \$name) {}
}

#[Role('admin')]
#[Role('editor')]
function manage(): void {}`,
      solution: `<?php
#[Attribute(Attribute::TARGET_METHOD | Attribute::IS_REPEATABLE)]
class Role {
    public function __construct(public string \$name) {}
}

#[Role('admin')]
#[Role('editor')]
function manage(): void {}`,
      hints: [
        'By default, attributes cannot be applied multiple times.',
        'Add Attribute::IS_REPEATABLE to allow repetition.',
        'Combine with TARGET using bitwise OR |.',
      ],
      concepts: ['IS_REPEATABLE', 'non-repeatable-error', 'bitwise-or'],
    },
    {
      id: 'php-attr-16',
      title: 'Predict Attribute Count',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict how many attributes are found.',
      skeleton: `<?php
#[Attribute(Attribute::TARGET_METHOD | Attribute::IS_REPEATABLE)]
class Tag {
    public function __construct(public string \$name) {}
}

#[Tag('php')]
#[Tag('tutorial')]
#[Tag('beginner')]
function lesson(): void {}

\$ref = new ReflectionFunction('lesson');
echo count(\$ref->getAttributes(Tag::class));`,
      solution: `3`,
      hints: [
        'Three #[Tag] attributes are applied.',
        'getAttributes returns all matching attributes.',
        'count() returns 3.',
      ],
      concepts: ['getAttributes', 'count', 'repeatable'],
    },
    {
      id: 'php-attr-17',
      title: 'Predict Attribute Value',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the attribute value read via reflection.',
      skeleton: `<?php
#[Attribute]
class Version {
    public function __construct(public int \$major, public int \$minor = 0) {}
}

#[Version(3, 14)]
function getApi(): void {}

\$ref = new ReflectionFunction('getApi');
\$v = \$ref->getAttributes(Version::class)[0]->newInstance();
echo \$v->major . '.' . \$v->minor;`,
      solution: `3.14`,
      hints: [
        'Version is constructed with major=3, minor=14.',
        'newInstance() creates the attribute object.',
        'Access major and minor properties.',
      ],
      concepts: ['constructor-args', 'newInstance', 'property-access'],
    },
    {
      id: 'php-attr-18',
      title: 'Predict Filtered Attributes',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the count when filtering attributes by type.',
      skeleton: `<?php
#[Attribute(Attribute::TARGET_METHOD | Attribute::IS_REPEATABLE)]
class A {}
#[Attribute]
class B {}

#[A]
#[B]
#[A]
function test(): void {}

\$ref = new ReflectionFunction('test');
echo count(\$ref->getAttributes(A::class)) . ' ';
echo count(\$ref->getAttributes());`,
      solution: `2 3`,
      hints: [
        'Filtering by A::class returns only A attributes (2).',
        'Without a filter, all attributes are returned (3).',
        'getAttributes() without args returns all.',
      ],
      concepts: ['filtering', 'getAttributes', 'count'],
    },
    {
      id: 'php-attr-19',
      title: 'Refactor Docblock to Attribute',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the docblock-based route annotation to use a native PHP attribute.',
      skeleton: `<?php
/**
 * @Route("/api/users")
 * @Method("GET")
 */
function listUsers(): array {
    return [];
}`,
      solution: `<?php
#[Attribute]
class Route {
    public function __construct(
        public string \$path,
        public string \$method = 'GET'
    ) {}
}

#[Route('/api/users', 'GET')]
function listUsers(): array {
    return [];
}`,
      hints: [
        'Replace docblock annotations with native #[...] syntax.',
        'Define the Route attribute class with constructor.',
        'Apply it directly to the function.',
      ],
      concepts: ['docblock-to-attribute', 'refactor', 'native-syntax'],
    },
    {
      id: 'php-attr-20',
      title: 'Refactor Array Config to Attributes',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the external array-based column mapping to use attributes on the class properties.',
      skeleton: `<?php
class User {
    public string \$firstName;
    public string \$emailAddr;
}

\$columnMap = [
    'firstName' => 'first_name',
    'emailAddr' => 'email_address',
];`,
      solution: `<?php
#[Attribute(Attribute::TARGET_PROPERTY)]
class Column {
    public function __construct(public string \$name) {}
}

class User {
    #[Column('first_name')]
    public string \$firstName;

    #[Column('email_address')]
    public string \$emailAddr;
}`,
      hints: [
        'Define a Column attribute with a name parameter.',
        'Apply it to each property with the DB column name.',
        'The mapping is now co-located with the properties.',
      ],
      concepts: ['co-location', 'ORM-mapping', 'self-documenting'],
    },
  ],
};
