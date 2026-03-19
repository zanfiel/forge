import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-functional',
  title: '49. Functional Programming',
  explanation: `## Functional Programming in Java

Java 8+ introduced functional programming constructs that enable a more declarative coding style.

### Core Functional Interfaces (java.util.function)

\`\`\`java
// Function<T, R> - takes T, returns R
Function<String, Integer> length = String::length;

// BiFunction<T, U, R> - takes T and U, returns R
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;

// Predicate<T> - takes T, returns boolean
Predicate<String> isEmpty = String::isEmpty;

// Consumer<T> - takes T, returns void
Consumer<String> printer = System.out::println;

// Supplier<T> - takes nothing, returns T
Supplier<List<String>> listFactory = ArrayList::new;

// UnaryOperator<T> - Function<T, T>
UnaryOperator<String> upper = String::toUpperCase;
\`\`\`

### Composition

\`\`\`java
Function<String, String> trim = String::trim;
Function<String, String> lower = String::toLowerCase;

// compose: lower first, then trim
Function<String, String> trimThenLower = lower.compose(trim);

// andThen: trim first, then lower
Function<String, String> alsoTrimThenLower = trim.andThen(lower);

// Predicate composition
Predicate<Integer> positive = n -> n > 0;
Predicate<Integer> even = n -> n % 2 == 0;
Predicate<Integer> positiveAndEven = positive.and(even);
\`\`\`

### Method References

\`\`\`java
// Static method: ClassName::staticMethod
Function<String, Integer> parse = Integer::parseInt;

// Instance method of particular object: obj::method
Consumer<String> print = System.out::println;

// Instance method of arbitrary object: ClassName::instanceMethod
Function<String, String> toUpper = String::toUpperCase;

// Constructor: ClassName::new
Supplier<ArrayList<String>> factory = ArrayList::new;
\`\`\`

### Currying

Simulating currying by returning functions from functions:

\`\`\`java
Function<Integer, Function<Integer, Integer>> adder =
    a -> b -> a + b;
Function<Integer, Integer> add5 = adder.apply(5);
int result = add5.apply(3); // 8
\`\`\`

### Monadic Patterns with Optional

\`\`\`java
Optional<String> name = Optional.of("Alice");
String upper = name
    .filter(n -> n.length() > 3)
    .map(String::toUpperCase)
    .orElse("UNKNOWN");
\`\`\``,
  exercises: [
    {
      id: 'java-functional-1',
      title: 'Function Interface Basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create a Function that converts a String to its length.',
      skeleton: `__BLANK__<String, Integer> strLength = __BLANK__::length;
int len = strLength.__BLANK__("Hello");
System.out.println(len); // 5`,
      solution: `Function<String, Integer> strLength = String::length;
int len = strLength.apply("Hello");
System.out.println(len); // 5`,
      hints: [
        'Function<T, R> takes type T and returns type R.',
        'String::length is a method reference for the length() method.',
        'Call a Function with the apply() method.',
      ],
      concepts: ['function-interface', 'method-reference', 'apply'],
    },
    {
      id: 'java-functional-2',
      title: 'Predicate Basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create a Predicate that checks if a string is not empty.',
      skeleton: `__BLANK__<String> notEmpty = s -> !s.__BLANK__();
boolean result = notEmpty.__BLANK__("Hello");
System.out.println(result); // true`,
      solution: `Predicate<String> notEmpty = s -> !s.isEmpty();
boolean result = notEmpty.test("Hello");
System.out.println(result); // true`,
      hints: [
        'Predicate<T> takes type T and returns a boolean.',
        'isEmpty() checks if the string has zero length.',
        'Call a Predicate with the test() method.',
      ],
      concepts: ['predicate', 'lambda', 'test-method'],
    },
    {
      id: 'java-functional-3',
      title: 'Consumer and Supplier',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create a Consumer that prints a value and a Supplier that provides a default list.',
      skeleton: `__BLANK__<String> printer = System.out::println;
printer.__BLANK__("Hello World");

__BLANK__<List<String>> listMaker = ArrayList::new;
List<String> myList = listMaker.__BLANK__();`,
      solution: `Consumer<String> printer = System.out::println;
printer.accept("Hello World");

Supplier<List<String>> listMaker = ArrayList::new;
List<String> myList = listMaker.get();`,
      hints: [
        'Consumer<T> takes T and returns void; call it with accept().',
        'Supplier<T> takes nothing and returns T; call it with get().',
        'ArrayList::new is a constructor reference.',
      ],
      concepts: ['consumer', 'supplier', 'constructor-reference'],
    },
    {
      id: 'java-functional-4',
      title: 'BiFunction',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create a BiFunction that takes two strings and returns their concatenation with a space in between. Then apply it to "Hello" and "World".',
      skeleton: `// Create the BiFunction and apply it
// Expected result: "Hello World"`,
      solution: `BiFunction<String, String, String> concat = (a, b) -> a + " " + b;
String result = concat.apply("Hello", "World");
System.out.println(result); // Hello World`,
      hints: [
        'BiFunction<T, U, R> takes two arguments of types T and U, returns R.',
        'Use a lambda: (a, b) -> a + " " + b.',
        'Call it with apply(arg1, arg2).',
      ],
      concepts: ['bifunction', 'lambda', 'string-concatenation'],
    },
    {
      id: 'java-functional-5',
      title: 'Method Reference Types',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fill in the correct method references for each type.',
      skeleton: `// Static method reference
Function<String, Integer> parse = __BLANK__::parseInt;

// Instance method of a particular object
List<String> list = new ArrayList<>();
Consumer<String> adder = list::__BLANK__;

// Instance method of an arbitrary object
Function<String, String> upper = String::__BLANK__;

// Constructor reference
Supplier<StringBuilder> sbMaker = __BLANK__::new;`,
      solution: `// Static method reference
Function<String, Integer> parse = Integer::parseInt;

// Instance method of a particular object
List<String> list = new ArrayList<>();
Consumer<String> adder = list::add;

// Instance method of an arbitrary object
Function<String, String> upper = String::toUpperCase;

// Constructor reference
Supplier<StringBuilder> sbMaker = StringBuilder::new;`,
      hints: [
        'Integer.parseInt is a static method, so use Integer::parseInt.',
        'list.add is an instance method on the specific list object.',
        'String::toUpperCase calls toUpperCase() on whichever String is passed in.',
      ],
      concepts: ['method-references', 'static-ref', 'instance-ref', 'constructor-ref'],
    },
    {
      id: 'java-functional-6',
      title: 'Predict Function Composition',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output of this function composition.',
      skeleton: `Function<Integer, Integer> doubleIt = x -> x * 2;
Function<Integer, Integer> addTen = x -> x + 10;

Function<Integer, Integer> doubleThenAdd = doubleIt.andThen(addTen);
Function<Integer, Integer> addThenDouble = doubleIt.compose(addTen);

System.out.println(doubleThenAdd.apply(5));
System.out.println(addThenDouble.apply(5));`,
      solution: `20
30`,
      hints: [
        'andThen: apply doubleIt first, then addTen. 5*2=10, 10+10=20.',
        'compose: apply addTen first, then doubleIt. 5+10=15, 15*2=30.',
        'compose is the reverse order of andThen.',
      ],
      concepts: ['function-composition', 'and-then', 'compose'],
    },
    {
      id: 'java-functional-7',
      title: 'Fix the Predicate Logic',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'This code is supposed to filter strings that are non-empty AND start with "A", but it is wrong.',
      skeleton: `Predicate<String> nonEmpty = s -> !s.isEmpty();
Predicate<String> startsWithA = s -> s.startsWith("A");

// Should be: non-empty AND starts with A
Predicate<String> filter = nonEmpty.or(startsWithA);

List<String> result = List.of("Alice", "", "Bob", "Anna")
    .stream()
    .filter(filter)
    .toList();
System.out.println(result); // Should be [Alice, Anna]`,
      solution: `Predicate<String> nonEmpty = s -> !s.isEmpty();
Predicate<String> startsWithA = s -> s.startsWith("A");

// Should be: non-empty AND starts with A
Predicate<String> filter = nonEmpty.and(startsWithA);

List<String> result = List.of("Alice", "", "Bob", "Anna")
    .stream()
    .filter(filter)
    .toList();
System.out.println(result); // [Alice, Anna]`,
      hints: [
        'The code uses .or() but the requirement is AND logic.',
        'Change .or() to .and() for both conditions to be required.',
        'nonEmpty.and(startsWithA) requires both predicates to be true.',
      ],
      concepts: ['predicate-composition', 'and', 'or', 'stream-filter'],
    },
    {
      id: 'java-functional-8',
      title: 'Function andThen Chaining',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Create a processing pipeline using andThen: trim whitespace, convert to lowercase, then replace spaces with hyphens. Apply it to "  Hello World  ".',
      skeleton: `// Create a pipeline of three functions chained with andThen
// Result should be "hello-world"`,
      solution: `Function<String, String> pipeline = ((Function<String, String>) String::trim)
    .andThen(String::toLowerCase)
    .andThen(s -> s.replace(" ", "-"));

String result = pipeline.apply("  Hello World  ");
System.out.println(result); // hello-world`,
      hints: [
        'Start with a trim function, then chain andThen for each subsequent step.',
        'You may need to cast the first method reference to Function<String, String>.',
        'The replace step uses a lambda: s -> s.replace(" ", "-").',
      ],
      concepts: ['function-chaining', 'and-then', 'pipeline'],
    },
    {
      id: 'java-functional-9',
      title: 'Currying a Function',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Implement currying: a function that takes one argument and returns a function that takes the second argument.',
      skeleton: `Function<Integer, __BLANK__<Integer, Integer>> multiply =
    a -> __BLANK__ -> a * b;

Function<Integer, Integer> tripler = multiply.__BLANK__(3);
int result = tripler.apply(7);
System.out.println(result); // 21`,
      solution: `Function<Integer, Function<Integer, Integer>> multiply =
    a -> b -> a * b;

Function<Integer, Integer> tripler = multiply.apply(3);
int result = tripler.apply(7);
System.out.println(result); // 21`,
      hints: [
        'The return type of the outer function is Function<Integer, Integer>.',
        'The lambda a -> b -> a * b is a curried multiplication.',
        'Apply the outer function with 3 to get a tripler function.',
      ],
      concepts: ['currying', 'higher-order-functions', 'partial-application'],
    },
    {
      id: 'java-functional-10',
      title: 'Custom Functional Interface',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Define a @FunctionalInterface called TriFunction<A, B, C, R> that takes three arguments and returns a result. Then create an instance that concatenates three strings.',
      skeleton: `// Define TriFunction and create a concatenation instance`,
      solution: `@FunctionalInterface
interface TriFunction<A, B, C, R> {
    R apply(A a, B b, C c);
}

TriFunction<String, String, String, String> concat =
    (a, b, c) -> a + b + c;

String result = concat.apply("Hello", " ", "World");
System.out.println(result); // Hello World`,
      hints: [
        'A functional interface has exactly one abstract method.',
        'TriFunction needs four type parameters: three inputs and one output.',
        'The single abstract method takes three parameters and returns R.',
      ],
      concepts: ['functional-interface', 'tri-function', 'generics'],
    },
    {
      id: 'java-functional-11',
      title: 'Predicate Negate and Or',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output of composed predicates.',
      skeleton: `Predicate<Integer> isEven = n -> n % 2 == 0;
Predicate<Integer> isPositive = n -> n > 0;

Predicate<Integer> isOddOrNegative = isEven.negate().or(isPositive.negate());

System.out.println(isOddOrNegative.test(3));
System.out.println(isOddOrNegative.test(4));
System.out.println(isOddOrNegative.test(-2));
System.out.println(isOddOrNegative.test(-3));`,
      solution: `true
false
true
true`,
      hints: [
        'isEven.negate() is true for odd numbers. isPositive.negate() is true for non-positive.',
        '3: odd=true OR non-positive=false -> true.',
        '4: odd=false OR non-positive=false -> false. -2: odd=false OR non-positive=true -> true.',
      ],
      concepts: ['predicate-negate', 'predicate-or', 'boolean-logic'],
    },
    {
      id: 'java-functional-12',
      title: 'Fix the Consumer Chaining Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'This code tries to chain two consumers but the second never executes.',
      skeleton: `Consumer<String> logger = s -> System.out.println("LOG: " + s);
Consumer<String> auditor = s -> System.out.println("AUDIT: " + s);

Consumer<String> both = s -> logger.accept(s);
both.accept("event");
// Expected output:
// LOG: event
// AUDIT: event
// Actual output:
// LOG: event`,
      solution: `Consumer<String> logger = s -> System.out.println("LOG: " + s);
Consumer<String> auditor = s -> System.out.println("AUDIT: " + s);

Consumer<String> both = logger.andThen(auditor);
both.accept("event");`,
      hints: [
        'The code only calls logger, ignoring auditor entirely.',
        'Consumer has an andThen() method to chain consumers.',
        'Use logger.andThen(auditor) to create a composed consumer.',
      ],
      concepts: ['consumer-chaining', 'and-then', 'composed-consumer'],
    },
    {
      id: 'java-functional-13',
      title: 'Optional Monadic Operations',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Chain Optional operations: filter, map, and flatMap.',
      skeleton: `Optional<String> name = Optional.of("Alice");

String result = name
    .__BLANK__(n -> n.length() > 3)
    .__BLANK__(String::toUpperCase)
    .__BLANK__("UNKNOWN");

System.out.println(result); // ALICE

Optional<String> email = Optional.of("alice@example.com");
Optional<String> domain = email
    .__BLANK__(e -> {
        int at = e.indexOf('@');
        return at >= 0 ? Optional.of(e.substring(at + 1)) : Optional.empty();
    });`,
      solution: `Optional<String> name = Optional.of("Alice");

String result = name
    .filter(n -> n.length() > 3)
    .map(String::toUpperCase)
    .orElse("UNKNOWN");

System.out.println(result); // ALICE

Optional<String> email = Optional.of("alice@example.com");
Optional<String> domain = email
    .flatMap(e -> {
        int at = e.indexOf('@');
        return at >= 0 ? Optional.of(e.substring(at + 1)) : Optional.empty();
    });`,
      hints: [
        'filter() keeps the value if the predicate is true, empty otherwise.',
        'map() transforms the value inside the Optional.',
        'flatMap() is used when the mapping function itself returns an Optional.',
      ],
      concepts: ['optional', 'filter', 'map', 'flat-map', 'monadic'],
    },
    {
      id: 'java-functional-14',
      title: 'Higher-Order Function: Retry Logic',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a higher-order function withRetry(Supplier<T> action, int maxRetries) that attempts the supplier up to maxRetries times, returning Optional<T> on success or Optional.empty() after all retries fail.',
      skeleton: `public static <T> Optional<T> withRetry(Supplier<T> action, int maxRetries) {
    // Attempt action up to maxRetries times
    // If action throws, retry; if all fail, return empty
}`,
      solution: `public static <T> Optional<T> withRetry(Supplier<T> action, int maxRetries) {
    for (int i = 0; i < maxRetries; i++) {
        try {
            return Optional.ofNullable(action.get());
        } catch (Exception e) {
            // retry
        }
    }
    return Optional.empty();
}`,
      hints: [
        'Loop up to maxRetries times, calling action.get() each iteration.',
        'Wrap the call in try-catch; on exception, continue to the next iteration.',
        'Return Optional.ofNullable on success, Optional.empty() after all retries fail.',
      ],
      concepts: ['higher-order-function', 'supplier', 'retry-pattern', 'optional'],
    },
    {
      id: 'java-functional-15',
      title: 'Function Memoization',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a generic memoize() method that wraps any Function<T, R> with a caching layer using a ConcurrentHashMap.',
      skeleton: `public static <T, R> Function<T, R> memoize(Function<T, R> fn) {
    // Return a new Function that caches results
}`,
      solution: `public static <T, R> Function<T, R> memoize(Function<T, R> fn) {
    ConcurrentHashMap<T, R> cache = new ConcurrentHashMap<>();
    return input -> cache.computeIfAbsent(input, fn);
}`,
      hints: [
        'Use a ConcurrentHashMap to store previously computed results.',
        'computeIfAbsent checks the map and only calls fn if the key is absent.',
        'Return a lambda that delegates to the cache.',
      ],
      concepts: ['memoization', 'caching', 'concurrent-hashmap', 'higher-order-function'],
    },
    {
      id: 'java-functional-16',
      title: 'Partial Application',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a generic partial() method that takes a BiFunction<A, B, R> and a value for A, returning a Function<B, R>.',
      skeleton: `public static <A, B, R> Function<B, R> partial(
        BiFunction<A, B, R> fn, A a) {
    // Return a function that already has 'a' applied
}`,
      solution: `public static <A, B, R> Function<B, R> partial(
        BiFunction<A, B, R> fn, A a) {
    return b -> fn.apply(a, b);
}`,
      hints: [
        'Partial application fixes one argument of a multi-argument function.',
        'Return a lambda that takes only B and calls fn with both a and b.',
        'The result is b -> fn.apply(a, b).',
      ],
      concepts: ['partial-application', 'bifunction', 'higher-order-function'],
    },
    {
      id: 'java-functional-17',
      title: 'Predict Curried Function Output',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Predict the output of this curried function chain.',
      skeleton: `Function<String, Function<String, Function<String, String>>> template =
    greeting -> name -> punct -> greeting + ", " + name + punct;

Function<String, Function<String, String>> hello = template.apply("Hello");
Function<String, String> helloAlice = hello.apply("Alice");

System.out.println(helloAlice.apply("!"));
System.out.println(helloAlice.apply("?"));
System.out.println(template.apply("Hi").apply("Bob").apply("."));`,
      solution: `Hello, Alice!
Hello, Alice?
Hi, Bob.`,
      hints: [
        'template.apply("Hello") fixes greeting="Hello", returns a function taking name.',
        'hello.apply("Alice") fixes name="Alice", returns a function taking punct.',
        'Each apply fixes the next argument in the chain.',
      ],
      concepts: ['currying', 'partial-application', 'function-chain'],
    },
    {
      id: 'java-functional-18',
      title: 'Fix the Compose Direction',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'java',
      goal: 'The pipeline should parse a string to int, double it, then convert to string. But compose applies in reverse order and the types do not align. Fix it.',
      skeleton: `Function<String, Integer> parse = Integer::parseInt;
Function<Integer, Integer> doubleIt = x -> x * 2;
Function<Integer, String> stringify = Object::toString;

// This doesn't compile:
Function<String, String> pipeline = stringify.compose(parse).compose(doubleIt);`,
      solution: `Function<String, Integer> parse = Integer::parseInt;
Function<Integer, Integer> doubleIt = x -> x * 2;
Function<Integer, String> stringify = Object::toString;

Function<String, String> pipeline = parse.andThen(doubleIt).andThen(stringify);`,
      hints: [
        'compose applies the argument function BEFORE the calling function.',
        'The chain of compose calls has the wrong type alignment.',
        'Use andThen instead: parse.andThen(doubleIt).andThen(stringify) flows left to right.',
      ],
      concepts: ['compose-vs-andthen', 'function-composition', 'type-alignment'],
    },
    {
      id: 'java-functional-19',
      title: 'Refactor Imperative to Functional Pipeline',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor this imperative code to use functional composition with Function, Predicate, and Stream.',
      skeleton: `public List<String> processNames(List<String> names) {
    List<String> result = new ArrayList<>();
    for (String name : names) {
        String trimmed = name.trim();
        if (!trimmed.isEmpty()) {
            String upper = trimmed.toUpperCase();
            if (upper.startsWith("A")) {
                result.add(upper);
            }
        }
    }
    Collections.sort(result);
    return result;
}`,
      solution: `public List<String> processNames(List<String> names) {
    Predicate<String> notEmpty = s -> !s.isEmpty();
    Predicate<String> startsWithA = s -> s.startsWith("A");
    Function<String, String> process = ((Function<String, String>) String::trim)
        .andThen(String::toUpperCase);

    return names.stream()
        .map(process)
        .filter(notEmpty.and(startsWithA))
        .sorted()
        .toList();
}`,
      hints: [
        'Define predicates for not-empty and starts-with-A; compose them with .and().',
        'Create a function pipeline: trim then toUpperCase with andThen.',
        'Use stream().map(process).filter(combined).sorted().toList().',
      ],
      concepts: ['refactoring', 'functional-pipeline', 'stream', 'composition'],
    },
    {
      id: 'java-functional-20',
      title: 'Refactor Callbacks to Composed Functions',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor this callback-based validator into a composable Validator<T> functional interface with and(), or(), and negate() default methods.',
      skeleton: `// Current: ad-hoc validation with callbacks
public class Validator {
    public static boolean validate(String s) {
        boolean notNull = s != null;
        boolean notEmpty = notNull && !s.isEmpty();
        boolean rightLength = notEmpty && s.length() <= 100;
        boolean noSpaces = rightLength && !s.contains(" ");
        return noSpaces;
    }
}`,
      solution: `@FunctionalInterface
interface Validator<T> {
    boolean test(T value);

    default Validator<T> and(Validator<T> other) {
        return value -> this.test(value) && other.test(value);
    }

    default Validator<T> or(Validator<T> other) {
        return value -> this.test(value) || other.test(value);
    }

    default Validator<T> negate() {
        return value -> !this.test(value);
    }
}

class StringValidation {
    static final Validator<String> notNull = s -> s != null;
    static final Validator<String> notEmpty = s -> !s.isEmpty();
    static final Validator<String> maxLength100 = s -> s.length() <= 100;
    static final Validator<String> noSpaces = s -> !s.contains(" ");

    static final Validator<String> validString =
        notNull.and(notEmpty).and(maxLength100).and(noSpaces);

    public static boolean validate(String s) {
        return validString.test(s);
    }
}`,
      hints: [
        'Create a @FunctionalInterface with a test() method.',
        'Add default methods and(), or(), negate() that return composed validators.',
        'Define individual validators as constants and compose them with .and().',
      ],
      concepts: ['functional-interface', 'composition', 'default-methods', 'validator-pattern'],
    },
  ],
};
