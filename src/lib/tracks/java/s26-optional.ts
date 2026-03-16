import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-optional',
  title: '26. Optional',
  explanation: `## Optional

Optional is a container that may or may not hold a value, eliminating null checks.

### Creating Optionals
\`\`\`java
Optional<String> full = Optional.of("hello");     // must be non-null
Optional<String> maybe = Optional.ofNullable(val); // null-safe
Optional<String> empty = Optional.empty();         // no value
\`\`\`

### Checking & Extracting
\`\`\`java
optional.isPresent()            // true if value exists
optional.isEmpty()              // true if empty (Java 11)
optional.get()                  // throws if empty!
optional.orElse("default")     // value or default
optional.orElseGet(Supplier)   // lazy default
optional.orElseThrow()         // throw if empty
\`\`\`

### Transforming
\`\`\`java
optional.map(String::toUpperCase)
optional.flatMap(this::findById) // when mapper returns Optional
optional.filter(s -> s.length() > 3)
\`\`\`

### Best Practices
- Use as return type, NOT field or parameter type
- Never call \`get()\` without checking first
- Prefer \`orElse\`/\`orElseGet\`/\`orElseThrow\`
- Do NOT use Optional for collection return types (return empty collection instead)
`,
  exercises: [
    {
      id: 'java-opt-1',
      title: 'Create Optional.of',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create an Optional with a non-null value.',
      skeleton: `Optional<String> opt = Optional.__BLANK__("hello");`,
      solution: `Optional<String> opt = Optional.of("hello");`,
      hints: ['Optional has a factory for non-null values.', 'It throws NPE if given null.', 'Use `of`.'],
      concepts: ['Optional.of', 'non-null', 'factory method'],
    },
    {
      id: 'java-opt-2',
      title: 'Create Optional.ofNullable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create an Optional that handles null safely.',
      skeleton: `Optional<String> opt = Optional.__BLANK__(possiblyNull);`,
      solution: `Optional<String> opt = Optional.ofNullable(possiblyNull);`,
      hints: ['This factory accepts null values.', 'Returns empty() if null, of(value) otherwise.', 'Use `ofNullable`.'],
      concepts: ['Optional.ofNullable', 'null safety', 'factory method'],
    },
    {
      id: 'java-opt-3',
      title: 'Get value or default',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Get the value or a default if empty.',
      skeleton: `String name = optional.__BLANK__("Unknown");`,
      solution: `String name = optional.orElse("Unknown");`,
      hints: ['Returns the value if present, otherwise the default.', 'The default is evaluated eagerly.', 'Use `orElse`.'],
      concepts: ['orElse', 'default value', 'Optional'],
    },
    {
      id: 'java-opt-4',
      title: 'Transform with map',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Transform the Optional value to uppercase.',
      skeleton: `Optional<String> upper = name.__BLANK__(String::toUpperCase);`,
      solution: `Optional<String> upper = name.map(String::toUpperCase);`,
      hints: ['map transforms the value if present.', 'Returns empty if the Optional is empty.', 'Use `map`.'],
      concepts: ['Optional.map', 'transformation', 'method reference'],
    },
    {
      id: 'java-opt-5',
      title: 'Chain with flatMap',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Chain Optional-returning methods without nesting.',
      skeleton: `Optional<String> city = user
    .flatMap(User::getAddress)
    .__BLANK__(Address::getCity);`,
      solution: `Optional<String> city = user
    .flatMap(User::getAddress)
    .flatMap(Address::getCity);`,
      hints: ['When the mapper returns Optional, use flatMap to avoid Optional<Optional<>>.', 'It flattens the nested Optional.', 'Use `flatMap`.'],
      concepts: ['flatMap', 'Optional chaining', 'monadic bind'],
    },
    {
      id: 'java-opt-6',
      title: 'Throw if absent',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Get the value or throw a custom exception.',
      skeleton: `String value = optional.__BLANK__(() -> new NotFoundException("Not found"));`,
      solution: `String value = optional.orElseThrow(() -> new NotFoundException("Not found"));`,
      hints: ['This method takes a Supplier of an exception.', 'Throws if the Optional is empty.', 'Use `orElseThrow`.'],
      concepts: ['orElseThrow', 'exception supplier', 'Optional'],
    },
    {
      id: 'java-opt-7',
      title: 'Find first matching element',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that finds the first string in a list starting with a given prefix, returning Optional.',
      skeleton: '',
      solution: `static Optional<String> findByPrefix(List<String> list, String prefix) {
    return list.stream()
        .filter(s -> s.startsWith(prefix))
        .findFirst();
}`,
      hints: ['Use stream with filter and findFirst.', 'findFirst returns Optional<String>.', 'Filter with startsWith.'],
      concepts: ['findFirst', 'Optional', 'stream'],
    },
    {
      id: 'java-opt-8',
      title: 'Safe nested property access',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that safely accesses user.getCompany().getName() using Optional chaining.',
      skeleton: '',
      solution: `static String getCompanyName(User user) {
    return Optional.ofNullable(user)
        .map(User::getCompany)
        .map(Company::getName)
        .orElse("Unknown");
}`,
      hints: ['Start with Optional.ofNullable to handle null user.', 'Chain map calls for each property.', 'End with orElse for the default.'],
      concepts: ['Optional chaining', 'map', 'null safety'],
    },
    {
      id: 'java-opt-9',
      title: 'Optional with stream',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that converts a List<Optional<String>> to a List<String> containing only present values.',
      skeleton: '',
      solution: `static List<String> flattenOptionals(List<Optional<String>> optionals) {
    return optionals.stream()
        .flatMap(Optional::stream)
        .toList();
}`,
      hints: ['Optional.stream() returns a stream of 0 or 1 elements.', 'Use flatMap to flatten the streams.', 'Empty optionals contribute nothing.'],
      concepts: ['Optional.stream', 'flatMap', 'filtering'],
    },
    {
      id: 'java-opt-10',
      title: 'Combine two optionals',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method that combines two Optional<String> values into a formatted name, or returns Optional.empty() if either is absent.',
      skeleton: '',
      solution: `static Optional<String> formatName(Optional<String> first, Optional<String> last) {
    return first.flatMap(f -> last.map(l -> f + " " + l));
}`,
      hints: ['Use flatMap on the first, then map on the second.', 'If either is empty, the result is empty.', 'The lambda combines both values.'],
      concepts: ['Optional combination', 'flatMap', 'map'],
    },
    {
      id: 'java-opt-11',
      title: 'Optional filter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method that returns an Optional<Integer> containing the value only if it is positive.',
      skeleton: '',
      solution: `static Optional<Integer> positiveOnly(int value) {
    return Optional.of(value).filter(n -> n > 0);
}`,
      hints: ['Create an Optional with the value.', 'Use filter to keep only positive values.', 'filter returns empty if the predicate fails.'],
      concepts: ['Optional.filter', 'Predicate', 'conditional value'],
    },
    {
      id: 'java-opt-12',
      title: 'Lazy default with orElseGet',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that returns the Optional value or lazily computes a default using a Supplier.',
      skeleton: '',
      solution: `static <T> T getOrCompute(Optional<T> opt, Supplier<T> defaultSupplier) {
    return opt.orElseGet(defaultSupplier);
}`,
      hints: ['orElseGet takes a Supplier for lazy evaluation.', 'The supplier is only called if the Optional is empty.', 'This is more efficient than orElse for expensive defaults.'],
      concepts: ['orElseGet', 'lazy evaluation', 'Supplier'],
    },
    {
      id: 'java-opt-13',
      title: 'Optional.get without check',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the dangerous Optional.get() call.',
      skeleton: `Optional<String> name = findName(id);
String result = name.get(); // NoSuchElementException if empty`,
      solution: `Optional<String> name = findName(id);
String result = name.orElse("Unknown");`,
      hints: ['get() throws if the Optional is empty.', 'Use orElse to provide a safe default.', 'Never call get() without checking isPresent().'],
      concepts: ['Optional.get', 'NoSuchElementException', 'orElse'],
    },
    {
      id: 'java-opt-14',
      title: 'Optional.of with null',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the code that passes null to Optional.of.',
      skeleton: `String value = getUserInput(); // may return null
Optional<String> opt = Optional.of(value); // NPE if null`,
      solution: `String value = getUserInput();
Optional<String> opt = Optional.ofNullable(value);`,
      hints: ['Optional.of throws NullPointerException on null.', 'Use ofNullable for potentially null values.', 'ofNullable returns empty() for null.'],
      concepts: ['Optional.of vs ofNullable', 'NullPointerException', 'null handling'],
    },
    {
      id: 'java-opt-15',
      title: 'Optional as field anti-pattern',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the anti-pattern of using Optional as a field type.',
      skeleton: `class User {
    private Optional<String> nickname; // anti-pattern
    public User(String nickname) {
        this.nickname = Optional.ofNullable(nickname);
    }
    public Optional<String> getNickname() { return nickname; }
}`,
      solution: `class User {
    private String nickname;
    public User(String nickname) {
        this.nickname = nickname;
    }
    public Optional<String> getNickname() {
        return Optional.ofNullable(nickname);
    }
}`,
      hints: ['Optional should not be used as a field type (not Serializable).', 'Store the nullable value directly.', 'Wrap in Optional only in the getter.'],
      concepts: ['Optional anti-pattern', 'field type', 'best practices'],
    },
    {
      id: 'java-opt-16',
      title: 'Predict orElse vs orElseGet',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict when the default expression is evaluated.',
      skeleton: `Optional<String> opt = Optional.of("hello");
String a = opt.orElse(expensiveCall());    // always calls expensiveCall?
String b = opt.orElseGet(() -> expensiveCall()); // always calls?
// Assume expensiveCall prints "called" and returns "default"`,
      solution: `called`,
      hints: ['orElse always evaluates its argument.', 'orElseGet only calls the supplier when needed.', 'Since opt has a value, only orElse triggers the call.'],
      concepts: ['orElse vs orElseGet', 'eager vs lazy', 'evaluation'],
    },
    {
      id: 'java-opt-17',
      title: 'Predict Optional map chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output of chained Optional operations.',
      skeleton: `Optional<String> result = Optional.of("  hello  ")
    .map(String::trim)
    .filter(s -> !s.isEmpty())
    .map(String::toUpperCase);
System.out.println(result.orElse("EMPTY"));`,
      solution: `HELLO`,
      hints: ['trim produces "hello".', 'filter keeps it (not empty).', 'toUpperCase produces "HELLO".'],
      concepts: ['Optional chaining', 'map', 'filter'],
    },
    {
      id: 'java-opt-18',
      title: 'Predict empty Optional chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict what happens when mapping on an empty Optional.',
      skeleton: `Optional<String> result = Optional.<String>empty()
    .map(String::toUpperCase)
    .map(s -> s + "!")
    .filter(s -> s.length() > 3);
System.out.println(result.isPresent());`,
      solution: `false`,
      hints: ['Once an Optional is empty, all map/filter operations return empty.', 'No transformations are actually applied.', 'isPresent returns false.'],
      concepts: ['empty Optional', 'short-circuit', 'map on empty'],
    },
    {
      id: 'java-opt-19',
      title: 'Refactor null checks to Optional',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this nested null check to Optional chaining.',
      skeleton: `String getCity(User user) {
    if (user != null) {
        Address addr = user.getAddress();
        if (addr != null) {
            return addr.getCity();
        }
    }
    return "Unknown";
}`,
      solution: `String getCity(User user) {
    return Optional.ofNullable(user)
        .map(User::getAddress)
        .map(Address::getCity)
        .orElse("Unknown");
}`,
      hints: ['Start with Optional.ofNullable(user).', 'Each null check becomes a map call.', 'End with orElse for the default.'],
      concepts: ['null check elimination', 'Optional chaining', 'refactoring'],
    },
    {
      id: 'java-opt-20',
      title: 'Refactor isPresent/get to functional',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this imperative Optional usage to functional style.',
      skeleton: `Optional<String> name = findName(id);
if (name.isPresent()) {
    System.out.println("Found: " + name.get());
} else {
    System.out.println("Not found");
}`,
      solution: `findName(id).ifPresentOrElse(
    n -> System.out.println("Found: " + n),
    () -> System.out.println("Not found")
);`,
      hints: ['ifPresentOrElse handles both cases.', 'First argument is Consumer for present value.', 'Second argument is Runnable for empty case.'],
      concepts: ['ifPresentOrElse', 'functional style', 'refactoring'],
    },
  ],
};
