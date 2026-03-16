import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-reflection',
  title: '37. Reflection',
  explanation: `## Reflection

Reflection allows inspecting and manipulating classes, methods, and fields at runtime.

### Getting Class Objects
\`\`\`java
Class<?> c1 = String.class;
Class<?> c2 = obj.getClass();
Class<?> c3 = Class.forName("java.lang.String");
\`\`\`

### Inspecting Classes
\`\`\`java
c.getName(), c.getSimpleName(), c.getSuperclass()
c.getInterfaces(), c.getModifiers()
c.getDeclaredFields(), c.getDeclaredMethods()
\`\`\`

### Accessing Fields
\`\`\`java
Field f = clazz.getDeclaredField("name");
f.setAccessible(true);
Object value = f.get(instance);
f.set(instance, newValue);
\`\`\`

### Invoking Methods
\`\`\`java
Method m = clazz.getDeclaredMethod("greet", String.class);
m.setAccessible(true);
Object result = m.invoke(instance, "World");
\`\`\`

### Creating Instances
\`\`\`java
Constructor<MyClass> ctor = MyClass.class.getDeclaredConstructor(String.class);
MyClass obj = ctor.newInstance("arg");
\`\`\`

### Cautions
- Performance overhead
- Breaks encapsulation
- No compile-time type safety
- Use sparingly (frameworks, serialization, testing)
`,
  exercises: [
    {
      id: 'java-ref-1',
      title: 'Get Class object',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Get the Class object from an instance.',
      skeleton: `Object obj = "hello";
Class<?> clazz = obj.__BLANK__();`,
      solution: `Object obj = "hello";
Class<?> clazz = obj.getClass();`,
      hints: ['Every object has a method that returns its Class.', 'Inherited from Object.', 'Use `getClass`.'],
      concepts: ['getClass', 'Class object', 'runtime type'],
    },
    {
      id: 'java-ref-2',
      title: 'Get Class by name',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Load a class by its fully qualified name.',
      skeleton: `Class<?> clazz = Class.__BLANK__("java.util.ArrayList");`,
      solution: `Class<?> clazz = Class.forName("java.util.ArrayList");`,
      hints: ['This static method loads a class by name.', 'Uses the fully qualified class name.', 'Use `forName`.'],
      concepts: ['Class.forName', 'dynamic loading', 'fully qualified name'],
    },
    {
      id: 'java-ref-3',
      title: 'Get declared fields',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Get all fields declared in a class (including private).',
      skeleton: `Field[] fields = clazz.__BLANK__();`,
      solution: `Field[] fields = clazz.getDeclaredFields();`,
      hints: ['This returns all fields regardless of access modifier.', 'Does not include inherited fields.', 'Use `getDeclaredFields`.'],
      concepts: ['getDeclaredFields', 'Field', 'reflection'],
    },
    {
      id: 'java-ref-4',
      title: 'Access private field',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Make a private field accessible.',
      skeleton: `Field field = clazz.getDeclaredField("secret");
field.__BLANK__(true);
Object value = field.get(instance);`,
      solution: `Field field = clazz.getDeclaredField("secret");
field.setAccessible(true);
Object value = field.get(instance);`,
      hints: ['Private fields are not accessible by default.', 'Override the access check.', 'Use `setAccessible`.'],
      concepts: ['setAccessible', 'private access', 'encapsulation bypass'],
    },
    {
      id: 'java-ref-5',
      title: 'Invoke a method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Invoke a method via reflection.',
      skeleton: `Method m = clazz.getDeclaredMethod("greet", String.class);
Object result = m.__BLANK__(instance, "World");`,
      solution: `Method m = clazz.getDeclaredMethod("greet", String.class);
Object result = m.invoke(instance, "World");`,
      hints: ['Call a method on an instance with arguments.', 'First arg is the target object.', 'Use `invoke`.'],
      concepts: ['Method.invoke', 'dynamic invocation', 'reflection'],
    },
    {
      id: 'java-ref-6',
      title: 'Create instance via constructor',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Create a new instance using a reflected constructor.',
      skeleton: `Constructor<?> ctor = clazz.getDeclaredConstructor(String.class);
Object obj = ctor.__BLANK__("argument");`,
      solution: `Constructor<?> ctor = clazz.getDeclaredConstructor(String.class);
Object obj = ctor.newInstance("argument");`,
      hints: ['Constructor can create new instances.', 'Pass constructor arguments.', 'Use `newInstance`.'],
      concepts: ['Constructor.newInstance', 'dynamic instantiation', 'reflection'],
    },
    {
      id: 'java-ref-7',
      title: 'Simple object inspector',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that prints all field names and values of any object using reflection.',
      skeleton: '',
      solution: `static void inspect(Object obj) throws Exception {
    Class<?> clazz = obj.getClass();
    System.out.println("Class: " + clazz.getSimpleName());
    for (Field field : clazz.getDeclaredFields()) {
        field.setAccessible(true);
        System.out.println("  " + field.getName() + " = " + field.get(obj));
    }
}`,
      hints: ['Use getDeclaredFields to get all fields.', 'setAccessible(true) for private fields.', 'field.get(obj) reads the value.'],
      concepts: ['field inspection', 'setAccessible', 'object dump'],
    },
    {
      id: 'java-ref-8',
      title: 'Generic object copier',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method that creates a shallow copy of any object by copying all field values via reflection.',
      skeleton: '',
      solution: `@SuppressWarnings("unchecked")
static <T> T shallowCopy(T original) throws Exception {
    Class<?> clazz = original.getClass();
    Constructor<?> ctor = clazz.getDeclaredConstructor();
    ctor.setAccessible(true);
    T copy = (T) ctor.newInstance();
    for (Field field : clazz.getDeclaredFields()) {
        field.setAccessible(true);
        field.set(copy, field.get(original));
    }
    return copy;
}`,
      hints: ['Create a new instance via no-arg constructor.', 'Copy each field value from original to copy.', 'Use setAccessible for private fields.'],
      concepts: ['shallow copy', 'field copy', 'dynamic instantiation'],
    },
    {
      id: 'java-ref-9',
      title: 'Method finder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that finds all public methods of a class that take no parameters and return String.',
      skeleton: '',
      solution: `static List<String> findStringGetters(Class<?> clazz) {
    List<String> result = new ArrayList<>();
    for (Method m : clazz.getMethods()) {
        if (m.getParameterCount() == 0 && m.getReturnType() == String.class) {
            result.add(m.getName());
        }
    }
    return result;
}`,
      hints: ['Use getMethods for public methods.', 'Check getParameterCount and getReturnType.', 'Filter for String return type.'],
      concepts: ['getMethods', 'parameter inspection', 'return type check'],
    },
    {
      id: 'java-ref-10',
      title: 'Dynamic proxy',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write code that creates a dynamic proxy implementing an interface, logging all method calls.',
      skeleton: '',
      solution: `@SuppressWarnings("unchecked")
static <T> T createLoggingProxy(Class<T> iface, T target) {
    return (T) java.lang.reflect.Proxy.newProxyInstance(
        iface.getClassLoader(),
        new Class<?>[]{ iface },
        (proxy, method, args) -> {
            System.out.println("Calling: " + method.getName());
            return method.invoke(target, args);
        }
    );
}`,
      hints: ['Proxy.newProxyInstance creates a dynamic proxy.', 'InvocationHandler intercepts all method calls.', 'Delegate to the actual target after logging.'],
      concepts: ['dynamic proxy', 'InvocationHandler', 'Proxy'],
    },
    {
      id: 'java-ref-11',
      title: 'Annotation scanner',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that finds all methods in a class with a specific annotation and returns their names.',
      skeleton: '',
      solution: `static List<String> findAnnotatedMethods(Class<?> clazz, Class<? extends java.lang.annotation.Annotation> annotation) {
    List<String> result = new ArrayList<>();
    for (Method m : clazz.getDeclaredMethods()) {
        if (m.isAnnotationPresent(annotation)) {
            result.add(m.getName());
        }
    }
    return result;
}`,
      hints: ['Use getDeclaredMethods to get all methods.', 'isAnnotationPresent checks for the annotation.', 'Collect matching method names.'],
      concepts: ['annotation scanning', 'isAnnotationPresent', 'method inspection'],
    },
    {
      id: 'java-ref-12',
      title: 'Simple dependency injection',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method that creates an instance and auto-injects fields annotated with @Inject.',
      skeleton: '',
      solution: `@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface Inject { }

static <T> T createAndInject(Class<T> clazz, Map<Class<?>, Object> dependencies) throws Exception {
    T instance = clazz.getDeclaredConstructor().newInstance();
    for (Field field : clazz.getDeclaredFields()) {
        if (field.isAnnotationPresent(Inject.class)) {
            field.setAccessible(true);
            Object dep = dependencies.get(field.getType());
            if (dep != null) {
                field.set(instance, dep);
            }
        }
    }
    return instance;
}`,
      hints: ['Check fields for @Inject annotation.', 'Look up the dependency by field type.', 'Set the field value via reflection.'],
      concepts: ['dependency injection', '@Inject', 'field injection'],
    },
    {
      id: 'java-ref-13',
      title: 'NoSuchMethodException',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the reflection call that uses wrong parameter types.',
      skeleton: `// Method signature: void process(int count)
Method m = clazz.getDeclaredMethod("process", Integer.class); // wrong!`,
      solution: `Method m = clazz.getDeclaredMethod("process", int.class);`,
      hints: ['Primitive parameters use .class (int.class, not Integer.class).', 'int.class and Integer.class are different.', 'Match the exact parameter type.'],
      concepts: ['primitive vs wrapper Class', 'getDeclaredMethod', 'parameter types'],
    },
    {
      id: 'java-ref-14',
      title: 'IllegalAccessException on private',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the code that fails to access a private field.',
      skeleton: `Field f = clazz.getDeclaredField("name");
String name = (String) f.get(instance); // IllegalAccessException`,
      solution: `Field f = clazz.getDeclaredField("name");
f.setAccessible(true);
String name = (String) f.get(instance);`,
      hints: ['Private fields are not accessible by default.', 'Call setAccessible(true) first.', 'This bypasses the access check.'],
      concepts: ['setAccessible', 'IllegalAccessException', 'private field'],
    },
    {
      id: 'java-ref-15',
      title: 'getMethod vs getDeclaredMethod',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the code that cannot find a private method.',
      skeleton: `// private void secret() { ... }
Method m = clazz.getMethod("secret"); // NoSuchMethodException`,
      solution: `Method m = clazz.getDeclaredMethod("secret");
m.setAccessible(true);`,
      hints: ['getMethod only finds public methods (including inherited).', 'getDeclaredMethod finds all methods in the class.', 'Use getDeclaredMethod for non-public methods.'],
      concepts: ['getMethod vs getDeclaredMethod', 'access modifiers', 'reflection'],
    },
    {
      id: 'java-ref-16',
      title: 'Predict getSimpleName',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output of Class name methods.',
      skeleton: `Class<?> c = java.util.ArrayList.class;
System.out.println(c.getSimpleName());
System.out.println(c.getName());`,
      solution: `ArrayList
java.util.ArrayList`,
      hints: ['getSimpleName returns just the class name.', 'getName returns the fully qualified name.', 'ArrayList is in java.util package.'],
      concepts: ['getSimpleName', 'getName', 'Class names'],
    },
    {
      id: 'java-ref-17',
      title: 'Predict getDeclaredFields',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the number of declared fields.',
      skeleton: `class Parent { int a; }
class Child extends Parent { int b; int c; }
System.out.println(Child.class.getDeclaredFields().length);
System.out.println(Child.class.getFields().length);`,
      solution: `2
0`,
      hints: ['getDeclaredFields returns fields declared in this class only.', 'Child has b and c (2 fields).', 'getFields returns only public fields (none here).'],
      concepts: ['getDeclaredFields', 'getFields', 'inheritance'],
    },
    {
      id: 'java-ref-18',
      title: 'Predict isInstance',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the result of dynamic instanceof check.',
      skeleton: `Object obj = "hello";
System.out.println(String.class.isInstance(obj));
System.out.println(Integer.class.isInstance(obj));
System.out.println(CharSequence.class.isInstance(obj));`,
      solution: `true
false
true`,
      hints: ['isInstance is the reflective equivalent of instanceof.', '"hello" is a String and CharSequence.', '"hello" is not an Integer.'],
      concepts: ['isInstance', 'dynamic type check', 'interface'],
    },
    {
      id: 'java-ref-19',
      title: 'Refactor reflection to method handle',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor this reflection-based method call to use MethodHandle for better performance.',
      skeleton: `Method m = String.class.getMethod("length");
int len = (int) m.invoke("hello"); // slow reflection`,
      solution: `java.lang.invoke.MethodHandle mh = java.lang.invoke.MethodHandles.lookup()
    .findVirtual(String.class, "length", java.lang.invoke.MethodType.methodType(int.class));
int len = (int) mh.invoke("hello");`,
      hints: ['MethodHandle is faster than reflection Method.invoke.', 'Use MethodHandles.lookup() to get a Lookup object.', 'findVirtual for instance methods with MethodType.'],
      concepts: ['MethodHandle', 'MethodHandles', 'performance'],
    },
    {
      id: 'java-ref-20',
      title: 'Refactor to avoid reflection',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this reflection-based factory to use a proper factory pattern.',
      skeleton: `static Object create(String className) throws Exception {
    return Class.forName(className).getDeclaredConstructor().newInstance();
}
Object service = create("com.app.UserService");`,
      solution: `interface ServiceFactory {
    Object create();
}

static final Map<String, ServiceFactory> factories = Map.of(
    "UserService", UserService::new,
    "OrderService", OrderService::new
);

static Object create(String name) {
    ServiceFactory factory = factories.get(name);
    if (factory == null) throw new IllegalArgumentException("Unknown: " + name);
    return factory.create();
}`,
      hints: ['Reflection is slow and loses type safety.', 'Use a Map of factory functions instead.', 'Constructor references act as factories.'],
      concepts: ['factory pattern', 'reflection elimination', 'type safety'],
    },
  ],
};
