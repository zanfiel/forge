import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-lambdas',
  title: '24. Lambdas & Method References',
  explanation: `## Lambdas & Method References

Lambda expressions provide concise syntax for implementing functional interfaces.

### Lambda Syntax
\`\`\`java
(params) -> expression
(params) -> { statements; }
\`\`\`

### Examples
\`\`\`java
Runnable r = () -> System.out.println("Hello");
Comparator<String> c = (a, b) -> a.length() - b.length();
Function<String, Integer> f = s -> s.length();
\`\`\`

### Core Functional Interfaces (java.util.function)
| Interface | Method | Signature |
|-----------|--------|-----------|
| Function<T,R> | apply | T -> R |
| Predicate<T> | test | T -> boolean |
| Consumer<T> | accept | T -> void |
| Supplier<T> | get | () -> T |
| BiFunction<T,U,R> | apply | (T,U) -> R |
| UnaryOperator<T> | apply | T -> T |

### Method References
\`\`\`java
String::length        // instance method ref
System.out::println   // bound method ref
Integer::parseInt     // static method ref
ArrayList::new        // constructor ref
\`\`\`

### Effectively Final
Lambdas can capture local variables only if they are effectively final (never reassigned).
`,
  exercises: [
    {
      id: 'java-lam-1',
      title: 'Simple lambda',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a Runnable lambda that prints "Hello".',
      skeleton: `Runnable r = () __BLANK__ System.out.println("Hello");`,
      solution: `Runnable r = () -> System.out.println("Hello");`,
      hints: ['Lambdas use an arrow operator.', 'No parameters means empty parentheses.', 'Use `->`.'],
      concepts: ['lambda', 'Runnable', 'arrow operator'],
    },
    {
      id: 'java-lam-2',
      title: 'Lambda with parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a Function lambda that returns string length.',
      skeleton: `Function<String, Integer> len = __BLANK__ -> s.length();`,
      solution: `Function<String, Integer> len = s -> s.length();`,
      hints: ['Single parameter does not need parentheses.', 'Use a variable name for the parameter.', 'Use `s`.'],
      concepts: ['Function', 'lambda parameter', 'single parameter'],
    },
    {
      id: 'java-lam-3',
      title: 'Predicate lambda',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a Predicate that tests if a number is positive.',
      skeleton: `Predicate<Integer> isPositive = n -> n __BLANK__ 0;`,
      solution: `Predicate<Integer> isPositive = n -> n > 0;`,
      hints: ['Predicate returns a boolean.', 'Check if the number is greater than zero.', 'Use `>`.'],
      concepts: ['Predicate', 'lambda', 'boolean expression'],
    },
    {
      id: 'java-lam-4',
      title: 'Method reference - static',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Replace a lambda with a static method reference.',
      skeleton: `Function<String, Integer> parse = __BLANK__;
// equivalent to: s -> Integer.parseInt(s)`,
      solution: `Function<String, Integer> parse = Integer::parseInt;`,
      hints: ['Static method references use ClassName::methodName.', 'parseInt is a static method on Integer.', 'Use `Integer::parseInt`.'],
      concepts: ['method reference', 'static method', 'Function'],
    },
    {
      id: 'java-lam-5',
      title: 'Method reference - instance',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Replace a lambda with an instance method reference.',
      skeleton: `Function<String, String> upper = __BLANK__;
// equivalent to: s -> s.toUpperCase()`,
      solution: `Function<String, String> upper = String::toUpperCase;`,
      hints: ['Instance method references on a type use ClassName::methodName.', 'toUpperCase is an instance method on String.', 'Use `String::toUpperCase`.'],
      concepts: ['method reference', 'instance method', 'unbound reference'],
    },
    {
      id: 'java-lam-6',
      title: 'Constructor reference',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Use a constructor reference to create ArrayList instances.',
      skeleton: `Supplier<List<String>> factory = __BLANK__;`,
      solution: `Supplier<List<String>> factory = ArrayList::new;`,
      hints: ['Constructor references use ClassName::new.', 'Supplier takes no arguments and returns a value.', 'Use `ArrayList::new`.'],
      concepts: ['constructor reference', 'Supplier', '::new'],
    },
    {
      id: 'java-lam-7',
      title: 'Compose functions',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write code that composes two Functions: one that trims a string and one that converts to uppercase.',
      skeleton: '',
      solution: `Function<String, String> trim = String::trim;
Function<String, String> upper = String::toUpperCase;
Function<String, String> trimAndUpper = trim.andThen(upper);`,
      hints: ['Function has andThen and compose methods.', 'andThen applies the second function after the first.', 'compose applies the second function before the first.'],
      concepts: ['Function.andThen', 'function composition', 'method reference'],
    },
    {
      id: 'java-lam-8',
      title: 'Predicate chaining',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write code that chains Predicates to check if a string is non-empty AND starts with "A".',
      skeleton: '',
      solution: `Predicate<String> nonEmpty = s -> !s.isEmpty();
Predicate<String> startsWithA = s -> s.startsWith("A");
Predicate<String> combined = nonEmpty.and(startsWithA);`,
      hints: ['Predicate has and(), or(), and negate() methods.', 'Use .and() to combine two predicates.', 'Both conditions must be true.'],
      concepts: ['Predicate.and', 'predicate chaining', 'boolean logic'],
    },
    {
      id: 'java-lam-9',
      title: 'Custom functional interface',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a functional interface called Transformer<T> with a single abstract method T transform(T input), and use it with a lambda.',
      skeleton: '',
      solution: `@FunctionalInterface
interface Transformer<T> {
    T transform(T input);
}

Transformer<String> shout = s -> s.toUpperCase() + "!";`,
      hints: ['A functional interface has exactly one abstract method.', 'Annotate with @FunctionalInterface.', 'Use a lambda to implement it.'],
      concepts: ['@FunctionalInterface', 'custom interface', 'lambda'],
    },
    {
      id: 'java-lam-10',
      title: 'BiFunction usage',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a BiFunction that concatenates two strings with a space between them.',
      skeleton: '',
      solution: `BiFunction<String, String, String> concat = (a, b) -> a + " " + b;`,
      hints: ['BiFunction takes two inputs and returns one output.', 'Use two parameters in the lambda.', 'Concatenate with a space.'],
      concepts: ['BiFunction', 'two parameters', 'lambda'],
    },
    {
      id: 'java-lam-11',
      title: 'Consumer and forEach',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a Consumer that prints a string in uppercase and use it with a list forEach.',
      skeleton: '',
      solution: `Consumer<String> printUpper = s -> System.out.println(s.toUpperCase());
List.of("hello", "world").forEach(printUpper);`,
      hints: ['Consumer takes an argument and returns void.', 'Use forEach on a list to apply the consumer.', 'Call toUpperCase inside the lambda.'],
      concepts: ['Consumer', 'forEach', 'lambda'],
    },
    {
      id: 'java-lam-12',
      title: 'Supplier factory pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that takes a Supplier and calls it n times, collecting results into a list.',
      skeleton: '',
      solution: `static <T> List<T> generate(Supplier<T> supplier, int count) {
    List<T> result = new ArrayList<>();
    for (int i = 0; i < count; i++) {
        result.add(supplier.get());
    }
    return result;
}`,
      hints: ['Call supplier.get() to produce each value.', 'Loop count times.', 'Add each result to a list.'],
      concepts: ['Supplier', 'factory pattern', 'generic method'],
    },
    {
      id: 'java-lam-13',
      title: 'Effectively final violation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the lambda that captures a non-effectively-final variable.',
      skeleton: `int count = 0;
List.of("a", "b", "c").forEach(s -> {
    count++; // Error: variable must be effectively final
});`,
      solution: `var count = new int[]{0};
List.of("a", "b", "c").forEach(s -> {
    count[0]++;
});`,
      hints: ['Lambdas cannot modify local variables.', 'Use an array or AtomicInteger as a mutable wrapper.', 'The array reference is final, but its contents can change.'],
      concepts: ['effectively final', 'mutable wrapper', 'lambda capture'],
    },
    {
      id: 'java-lam-14',
      title: 'Wrong functional interface',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the type mismatch between the lambda and the functional interface.',
      skeleton: `Consumer<String> toInt = s -> Integer.parseInt(s);
// Bug: Consumer returns void, but parseInt returns int`,
      solution: `Function<String, Integer> toInt = s -> Integer.parseInt(s);`,
      hints: ['Consumer accepts a value but returns nothing.', 'Since we want to return a value, use Function.', 'Function<String, Integer> matches the signature.'],
      concepts: ['Consumer vs Function', 'functional interface', 'return type'],
    },
    {
      id: 'java-lam-15',
      title: 'Missing @FunctionalInterface',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the interface so it can be used as a lambda target.',
      skeleton: `interface Processor<T> {
    T process(T input);
    T validate(T input); // two abstract methods = not functional
}`,
      solution: `@FunctionalInterface
interface Processor<T> {
    T process(T input);
    default T validate(T input) { return input; }
}`,
      hints: ['A functional interface must have exactly one abstract method.', 'Make the second method a default method.', 'Add @FunctionalInterface to enforce the contract.'],
      concepts: ['@FunctionalInterface', 'SAM', 'default method'],
    },
    {
      id: 'java-lam-16',
      title: 'Predict lambda execution',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output of lambda operations.',
      skeleton: `Function<Integer, Integer> doubleIt = n -> n * 2;
Function<Integer, Integer> addThree = n -> n + 3;
int result = doubleIt.andThen(addThree).apply(5);
System.out.println(result);`,
      solution: `13`,
      hints: ['andThen applies the second function after the first.', 'doubleIt(5) = 10.', 'addThree(10) = 13.'],
      concepts: ['andThen', 'Function composition', 'evaluation order'],
    },
    {
      id: 'java-lam-17',
      title: 'Predict Predicate chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output of chained predicates.',
      skeleton: `Predicate<Integer> isEven = n -> n % 2 == 0;
Predicate<Integer> isPositive = n -> n > 0;
Predicate<Integer> combined = isEven.and(isPositive);
System.out.println(combined.test(4));
System.out.println(combined.test(-2));
System.out.println(combined.test(3));`,
      solution: `true
false
false`,
      hints: ['and requires both predicates to be true.', '4 is even and positive = true.', '-2 is even but not positive = false. 3 is positive but not even = false.'],
      concepts: ['Predicate.and', 'boolean logic', 'chaining'],
    },
    {
      id: 'java-lam-18',
      title: 'Predict method reference behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output of different method reference types.',
      skeleton: `List<String> words = List.of("hello", "world", "java");
words.stream().map(String::toUpperCase).forEach(System.out::println);`,
      solution: `HELLO
WORLD
JAVA`,
      hints: ['String::toUpperCase is called on each element.', 'System.out::println prints each result.', 'Processing order matches list order.'],
      concepts: ['method reference', 'Stream', 'map'],
    },
    {
      id: 'java-lam-19',
      title: 'Refactor anonymous class to lambda',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Refactor this anonymous class to a lambda expression.',
      skeleton: `Comparator<String> comp = new Comparator<String>() {
    @Override
    public int compare(String a, String b) {
        return a.length() - b.length();
    }
};`,
      solution: `Comparator<String> comp = (a, b) -> a.length() - b.length();`,
      hints: ['Anonymous classes implementing functional interfaces can be replaced with lambdas.', 'The method parameters become lambda parameters.', 'The body becomes the lambda expression.'],
      concepts: ['lambda refactoring', 'anonymous class', 'Comparator'],
    },
    {
      id: 'java-lam-20',
      title: 'Refactor to method reference',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor these lambdas to method references where possible.',
      skeleton: `list.forEach(item -> System.out.println(item));
list.stream().map(s -> s.toLowerCase()).collect(Collectors.toList());
list.stream().filter(s -> s.isEmpty()).count();`,
      solution: `list.forEach(System.out::println);
list.stream().map(String::toLowerCase).collect(Collectors.toList());
list.stream().filter(String::isEmpty).count();`,
      hints: ['When a lambda just calls a single method, use a method reference.', 'item -> System.out.println(item) becomes System.out::println.', 's -> s.toLowerCase() becomes String::toLowerCase.'],
      concepts: ['method reference', 'refactoring', 'lambda simplification'],
    },
  ],
};
