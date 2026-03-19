import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-annotations',
  title: '36. Annotations',
  explanation: `## Annotations

Annotations provide metadata about code for compilers, tools, and runtime frameworks.

### Built-in Annotations
\`\`\`java
@Override              // method overrides superclass
@Deprecated            // marked for removal
@SuppressWarnings      // suppress compiler warnings
@FunctionalInterface   // single abstract method
@SafeVarargs           // safe generic varargs
\`\`\`

### Custom Annotations
\`\`\`java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Test {
    String value() default "";
    int timeout() default 0;
}
\`\`\`

### Retention Policies
- \`SOURCE\` - discarded by compiler
- \`CLASS\` - in class file, not at runtime
- \`RUNTIME\` - available via reflection

### Target Element Types
\`TYPE, FIELD, METHOD, PARAMETER, CONSTRUCTOR, LOCAL_VARIABLE, ANNOTATION_TYPE, PACKAGE, TYPE_PARAMETER, TYPE_USE, MODULE, RECORD_COMPONENT\`

### Repeatable Annotations
\`\`\`java
@Repeatable(Roles.class)
@interface Role { String value(); }
@interface Roles { Role[] value(); }
\`\`\`
`,
  exercises: [
    {
      id: 'java-ann-1',
      title: '@Override annotation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Mark a method as overriding a superclass method.',
      skeleton: `__BLANK__
public String toString() {
    return "MyClass";
}`,
      solution: `@Override
public String toString() {
    return "MyClass";
}`,
      hints: ['This annotation prevents accidental method name typos.', 'The compiler verifies the method exists in a superclass.', 'Use `@Override`.'],
      concepts: ['@Override', 'method overriding', 'compile-time check'],
    },
    {
      id: 'java-ann-2',
      title: '@Deprecated annotation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Mark a method as deprecated.',
      skeleton: `__BLANK__
public void oldMethod() { }`,
      solution: `@Deprecated
public void oldMethod() { }`,
      hints: ['This warns users that the method should not be used.', 'It generates a compiler warning at call sites.', 'Use `@Deprecated`.'],
      concepts: ['@Deprecated', 'deprecation', 'API evolution'],
    },
    {
      id: 'java-ann-3',
      title: '@SuppressWarnings',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Suppress unchecked cast warnings.',
      skeleton: `@SuppressWarnings("__BLANK__")
List<String> list = (List<String>) rawList;`,
      solution: `@SuppressWarnings("unchecked")
List<String> list = (List<String>) rawList;`,
      hints: ['The warning type for generic cast issues.', 'It suppresses the type safety warning.', 'Use `unchecked`.'],
      concepts: ['@SuppressWarnings', 'unchecked', 'generic cast'],
    },
    {
      id: 'java-ann-4',
      title: 'Retention policy',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Make an annotation available at runtime via reflection.',
      skeleton: `@Retention(RetentionPolicy.__BLANK__)
@Target(ElementType.METHOD)
@interface MyAnnotation { }`,
      solution: `@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface MyAnnotation { }`,
      hints: ['To read annotations via reflection, they must exist at runtime.', 'The retention policy controls this.', 'Use `RUNTIME`.'],
      concepts: ['RetentionPolicy.RUNTIME', 'reflection', 'annotation'],
    },
    {
      id: 'java-ann-5',
      title: 'Target element type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Restrict an annotation to fields only.',
      skeleton: `@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.__BLANK__)
@interface Column { String name(); }`,
      solution: `@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface Column { String name(); }`,
      hints: ['ElementType specifies where the annotation can be applied.', 'For class fields, use the field type.', 'Use `FIELD`.'],
      concepts: ['ElementType.FIELD', '@Target', 'annotation target'],
    },
    {
      id: 'java-ann-6',
      title: 'Annotation with default',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Define an annotation element with a default value.',
      skeleton: `@interface Config {
    String name();
    int timeout() __BLANK__ 30;
}`,
      solution: `@interface Config {
    String name();
    int timeout() default 30;
}`,
      hints: ['Annotation elements can have defaults.', 'The keyword provides a fallback value.', 'Use `default`.'],
      concepts: ['default value', 'annotation element', 'optional element'],
    },
    {
      id: 'java-ann-7',
      title: 'Custom marker annotation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a custom @Singleton annotation that marks a class as a singleton, available at runtime.',
      skeleton: '',
      solution: `@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@interface Singleton { }`,
      hints: ['Marker annotations have no elements.', 'Use RUNTIME retention for framework use.', 'Target TYPE for class-level annotation.'],
      concepts: ['marker annotation', 'custom annotation', 'TYPE target'],
    },
    {
      id: 'java-ann-8',
      title: 'Annotation with elements',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a @Route annotation with path and method elements for a web framework.',
      skeleton: '',
      solution: `@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface Route {
    String path();
    String method() default "GET";
    String[] produces() default {"application/json"};
}`,
      hints: ['Define elements as abstract methods in the annotation.', 'Use default for optional values.', 'Arrays are supported as element types.'],
      concepts: ['annotation elements', 'default values', 'array element'],
    },
    {
      id: 'java-ann-9',
      title: 'Read annotations via reflection',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method that finds all methods annotated with @Route in a class and prints their paths.',
      skeleton: '',
      solution: `static void printRoutes(Class<?> clazz) {
    for (java.lang.reflect.Method method : clazz.getDeclaredMethods()) {
        if (method.isAnnotationPresent(Route.class)) {
            Route route = method.getAnnotation(Route.class);
            System.out.println(route.method() + " " + route.path() + " -> " + method.getName());
        }
    }
}`,
      hints: ['Use getDeclaredMethods to get all methods.', 'isAnnotationPresent checks for the annotation.', 'getAnnotation retrieves the annotation instance.'],
      concepts: ['reflection', 'getAnnotation', 'isAnnotationPresent'],
    },
    {
      id: 'java-ann-10',
      title: 'Repeatable annotation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a repeatable @Tag annotation with a container @Tags.',
      skeleton: '',
      solution: `@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@Repeatable(Tags.class)
@interface Tag {
    String value();
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@interface Tags {
    Tag[] value();
}

@Tag("web")
@Tag("api")
class MyController { }`,
      hints: ['Use @Repeatable to link to the container.', 'The container annotation has a value() returning an array.', 'Both annotations need same retention and target.'],
      concepts: ['@Repeatable', 'container annotation', 'multiple annotations'],
    },
    {
      id: 'java-ann-11',
      title: 'Annotation processor simulation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a simple annotation-based validator that checks @NotNull fields via reflection.',
      skeleton: '',
      solution: `@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface NotNull { }

static void validate(Object obj) throws Exception {
    for (java.lang.reflect.Field field : obj.getClass().getDeclaredFields()) {
        if (field.isAnnotationPresent(NotNull.class)) {
            field.setAccessible(true);
            if (field.get(obj) == null) {
                throw new IllegalStateException(field.getName() + " must not be null");
            }
        }
    }
}`,
      hints: ['Use getDeclaredFields to inspect all fields.', 'setAccessible(true) to access private fields.', 'Check for null and throw if annotated.'],
      concepts: ['annotation processing', 'reflection', 'validation'],
    },
    {
      id: 'java-ann-12',
      title: 'Inherited annotation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write an @Audited annotation that is inherited by subclasses.',
      skeleton: '',
      solution: `@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@Inherited
@interface Audited {
    String level() default "INFO";
}

@Audited(level = "DEBUG")
class BaseService { }

class UserService extends BaseService { }
// UserService inherits @Audited from BaseService`,
      hints: ['@Inherited makes the annotation apply to subclasses.', 'Only works with class-level annotations.', 'Subclasses inherit the parent annotation.'],
      concepts: ['@Inherited', 'annotation inheritance', 'class hierarchy'],
    },
    {
      id: 'java-ann-13',
      title: 'Wrong retention policy',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the annotation that cannot be read at runtime.',
      skeleton: `@Retention(RetentionPolicy.SOURCE)
@Target(ElementType.METHOD)
@interface Logged { }

// Runtime check fails:
if (method.isAnnotationPresent(Logged.class)) { // always false
    log(method.getName());
}`,
      solution: `@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface Logged { }`,
      hints: ['SOURCE retention discards annotations at compile time.', 'Reflection requires RUNTIME retention.', 'Change SOURCE to RUNTIME.'],
      concepts: ['RetentionPolicy', 'RUNTIME', 'reflection'],
    },
    {
      id: 'java-ann-14',
      title: 'Wrong target type',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the annotation that does not compile when applied to a method.',
      skeleton: `@Target(ElementType.FIELD)
@interface Transactional { }

@Transactional // Error: cannot apply to method
void transfer() { }`,
      solution: `@Target(ElementType.METHOD)
@interface Transactional { }

@Transactional
void transfer() { }`,
      hints: ['@Target restricts where the annotation can be used.', 'FIELD does not include methods.', 'Change to ElementType.METHOD.'],
      concepts: ['@Target', 'ElementType', 'annotation placement'],
    },
    {
      id: 'java-ann-15',
      title: 'Missing @Override leads to bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the method that does not actually override due to a typo.',
      skeleton: `class Dog extends Animal {
    public String tostring() { // typo: should be toString
        return "Dog";
    }
}`,
      solution: `class Dog extends Animal {
    @Override
    public String toString() {
        return "Dog";
    }
}`,
      hints: ['Without @Override, the compiler does not check for actual overriding.', 'Add @Override to catch typos at compile time.', 'Fix the method name to toString.'],
      concepts: ['@Override', 'typo prevention', 'compile-time safety'],
    },
    {
      id: 'java-ann-16',
      title: 'Predict annotation default',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the value returned by an annotation element with a default.',
      skeleton: `@interface Priority { int value() default 5; }

@Priority
class Task { }

Priority p = Task.class.getAnnotation(Priority.class);
System.out.println(p.value());`,
      solution: `5`,
      hints: ['No value was specified in @Priority.', 'The default value of 5 is used.', 'Accessing value() returns the default.'],
      concepts: ['default value', 'annotation element', 'getAnnotation'],
    },
    {
      id: 'java-ann-17',
      title: 'Predict @Inherited behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict whether a subclass inherits the parent annotation.',
      skeleton: `@Inherited @Retention(RetentionPolicy.RUNTIME) @Target(ElementType.TYPE)
@interface Tracked { }

@Tracked class Parent { }
class Child extends Parent { }

System.out.println(Child.class.isAnnotationPresent(Tracked.class));`,
      solution: `true`,
      hints: ['@Inherited causes annotations to be inherited.', 'Child extends Parent which has @Tracked.', 'isAnnotationPresent returns true for Child.'],
      concepts: ['@Inherited', 'annotation inheritance', 'isAnnotationPresent'],
    },
    {
      id: 'java-ann-18',
      title: 'Predict repeatable annotations',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict how many annotations are found with getAnnotationsByType.',
      skeleton: `// @Tag is @Repeatable
@Tag("a") @Tag("b") @Tag("c")
class MyClass { }

Tag[] tags = MyClass.class.getAnnotationsByType(Tag.class);
System.out.println(tags.length);`,
      solution: `3`,
      hints: ['Three @Tag annotations are applied.', 'getAnnotationsByType returns all of them.', 'The array has 3 elements.'],
      concepts: ['@Repeatable', 'getAnnotationsByType', 'multiple annotations'],
    },
    {
      id: 'java-ann-19',
      title: 'Refactor magic strings to annotations',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this map-based configuration to use a custom annotation.',
      skeleton: `// Configuration via map (fragile, stringly-typed)
Map<String, String> config = Map.of(
    "UserService.table", "users",
    "UserService.schema", "public"
);
String table = config.get("UserService.table");`,
      solution: `@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@interface Table {
    String name();
    String schema() default "public";
}

@Table(name = "users")
class UserService { }

Table t = UserService.class.getAnnotation(Table.class);
String table = t.name();`,
      hints: ['Annotations provide compile-time type safety.', 'Define elements for each configuration property.', 'Apply the annotation directly to the class.'],
      concepts: ['annotation-based config', 'type safety', 'refactoring'],
    },
    {
      id: 'java-ann-20',
      title: 'Refactor marker interface to annotation',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this marker interface to a marker annotation.',
      skeleton: `interface Cacheable { } // marker interface, no methods

class UserService implements Cacheable {
    // ...
}

if (service instanceof Cacheable) {
    enableCache(service);
}`,
      solution: `@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@interface Cacheable { }

@Cacheable
class UserService { }

if (service.getClass().isAnnotationPresent(Cacheable.class)) {
    enableCache(service);
}`,
      hints: ['Marker annotations are more flexible than marker interfaces.', 'They do not pollute the type hierarchy.', 'Check with isAnnotationPresent instead of instanceof.'],
      concepts: ['marker annotation', 'marker interface', 'refactoring'],
    },
  ],
};
