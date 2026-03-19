import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-streams-api',
  title: '25. Streams API',
  explanation: `## Streams API

Streams enable functional-style operations on collections of elements.

### Creating Streams
\`\`\`java
list.stream()                    // from collection
Stream.of("a", "b", "c")        // from values
Arrays.stream(array)             // from array
Stream.iterate(0, n -> n + 1)   // infinite
Stream.generate(Math::random)   // infinite supplier
\`\`\`

### Intermediate Operations (lazy)
- \`filter(Predicate)\` - keep matching elements
- \`map(Function)\` - transform elements
- \`flatMap(Function)\` - flatten nested streams
- \`sorted()\`, \`distinct()\`, \`limit(n)\`, \`skip(n)\`
- \`peek(Consumer)\` - debug/inspect

### Terminal Operations (trigger execution)
- \`forEach(Consumer)\`, \`collect(Collector)\`
- \`reduce(identity, BinaryOperator)\`
- \`count()\`, \`min()\`, \`max()\`, \`findFirst()\`
- \`anyMatch()\`, \`allMatch()\`, \`noneMatch()\`
- \`toList()\` (Java 16+)

### Collectors
\`\`\`java
Collectors.toList(), Collectors.toSet()
Collectors.joining(", ")
Collectors.groupingBy(Function)
Collectors.partitioningBy(Predicate)
\`\`\`
`,
  exercises: [
    {
      id: 'java-str-1',
      title: 'Create a stream from list',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create a stream from a list.',
      skeleton: `Stream<String> s = names.__BLANK__();`,
      solution: `Stream<String> s = names.stream();`,
      hints: ['All collections have a method to create a stream.', 'It returns a sequential stream.', 'Use `stream`.'],
      concepts: ['stream()', 'Collection', 'Stream creation'],
    },
    {
      id: 'java-str-2',
      title: 'Filter elements',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Filter a stream to keep only strings longer than 3 characters.',
      skeleton: `list.stream().__BLANK__(s -> s.length() > 3).toList();`,
      solution: `list.stream().filter(s -> s.length() > 3).toList();`,
      hints: ['Use an intermediate operation that takes a Predicate.', 'It keeps elements matching the condition.', 'Use `filter`.'],
      concepts: ['filter', 'Predicate', 'intermediate operation'],
    },
    {
      id: 'java-str-3',
      title: 'Map transformation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Transform each string to uppercase.',
      skeleton: `list.stream().__BLANK__(String::toUpperCase).toList();`,
      solution: `list.stream().map(String::toUpperCase).toList();`,
      hints: ['Use an intermediate operation that takes a Function.', 'It transforms each element.', 'Use `map`.'],
      concepts: ['map', 'Function', 'transformation'],
    },
    {
      id: 'java-str-4',
      title: 'Collect to list',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Collect stream results into a List.',
      skeleton: `List<String> result = names.stream()
    .filter(n -> n.length() > 3)
    .__BLANK__(Collectors.toList());`,
      solution: `List<String> result = names.stream()
    .filter(n -> n.length() > 3)
    .collect(Collectors.toList());`,
      hints: ['Terminal operation that gathers elements.', 'It takes a Collector argument.', 'Use `collect`.'],
      concepts: ['collect', 'Collectors.toList', 'terminal operation'],
    },
    {
      id: 'java-str-5',
      title: 'Reduce to sum',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Sum a stream of integers using reduce.',
      skeleton: `int sum = numbers.stream().__BLANK__(0, Integer::sum);`,
      solution: `int sum = numbers.stream().reduce(0, Integer::sum);`,
      hints: ['reduce combines all elements into one value.', 'It takes an identity value and a BinaryOperator.', 'Use `reduce`.'],
      concepts: ['reduce', 'identity', 'BinaryOperator'],
    },
    {
      id: 'java-str-6',
      title: 'FlatMap nested lists',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Flatten a list of lists into a single stream.',
      skeleton: `List<List<String>> nested = List.of(List.of("a"), List.of("b", "c"));
List<String> flat = nested.stream().__BLANK__(List::stream).toList();`,
      solution: `List<List<String>> nested = List.of(List.of("a"), List.of("b", "c"));
List<String> flat = nested.stream().flatMap(List::stream).toList();`,
      hints: ['flatMap maps each element to a stream and flattens.', 'Each inner list becomes a stream.', 'Use `flatMap`.'],
      concepts: ['flatMap', 'flattening', 'nested collections'],
    },
    {
      id: 'java-str-7',
      title: 'Group by length',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that groups a list of strings by their length using streams.',
      skeleton: '',
      solution: `static Map<Integer, List<String>> groupByLength(List<String> words) {
    return words.stream()
        .collect(Collectors.groupingBy(String::length));
}`,
      hints: ['Use Collectors.groupingBy with a classifier function.', 'String::length is the classifier.', 'The result is a Map<Integer, List<String>>.'],
      concepts: ['groupingBy', 'Collectors', 'classification'],
    },
    {
      id: 'java-str-8',
      title: 'Join strings with collector',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method that joins a list of strings with comma separator using streams.',
      skeleton: '',
      solution: `static String joinWithComma(List<String> items) {
    return items.stream().collect(Collectors.joining(", "));
}`,
      hints: ['Collectors.joining concatenates strings.', 'Pass a delimiter to separate elements.', 'The result is a single String.'],
      concepts: ['Collectors.joining', 'string concatenation', 'collector'],
    },
    {
      id: 'java-str-9',
      title: 'Find max by property',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that finds the longest string in a list using streams.',
      skeleton: '',
      solution: `static Optional<String> longestString(List<String> list) {
    return list.stream()
        .max(Comparator.comparingInt(String::length));
}`,
      hints: ['Use the max terminal operation.', 'Pass a Comparator that compares by length.', 'Returns Optional since the list might be empty.'],
      concepts: ['max', 'Comparator', 'Optional'],
    },
    {
      id: 'java-str-10',
      title: 'Partition by predicate',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that partitions a list of integers into even and odd using streams.',
      skeleton: '',
      solution: `static Map<Boolean, List<Integer>> partitionEvenOdd(List<Integer> nums) {
    return nums.stream()
        .collect(Collectors.partitioningBy(n -> n % 2 == 0));
}`,
      hints: ['Collectors.partitioningBy splits into two groups.', 'The predicate determines the true/false groups.', 'True = even, false = odd.'],
      concepts: ['partitioningBy', 'Collectors', 'boolean grouping'],
    },
    {
      id: 'java-str-11',
      title: 'Distinct and sorted',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method that returns a sorted list of unique elements from the input list.',
      skeleton: '',
      solution: `static <T extends Comparable<T>> List<T> uniqueSorted(List<T> items) {
    return items.stream()
        .distinct()
        .sorted()
        .toList();
}`,
      hints: ['Use distinct() to remove duplicates.', 'Use sorted() to order elements.', 'Chain them as intermediate operations.'],
      concepts: ['distinct', 'sorted', 'stream pipeline'],
    },
    {
      id: 'java-str-12',
      title: 'Stream to map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that converts a list of strings to a Map where the key is the string and value is its length.',
      skeleton: '',
      solution: `static Map<String, Integer> toNameLengthMap(List<String> names) {
    return names.stream()
        .collect(Collectors.toMap(
            name -> name,
            String::length
        ));
}`,
      hints: ['Use Collectors.toMap with key and value mappers.', 'The identity function name -> name provides the key.', 'String::length provides the value.'],
      concepts: ['Collectors.toMap', 'key mapper', 'value mapper'],
    },
    {
      id: 'java-str-13',
      title: 'Stream reuse error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the code that tries to reuse a consumed stream.',
      skeleton: `Stream<String> s = names.stream().filter(n -> n.length() > 3);
long count = s.count();
List<String> list = s.toList(); // IllegalStateException: stream already closed`,
      solution: `List<String> filtered = names.stream()
    .filter(n -> n.length() > 3)
    .toList();
long count = filtered.size();`,
      hints: ['Streams can only be consumed once.', 'After a terminal operation, the stream is closed.', 'Collect first, then get count from the list.'],
      concepts: ['stream reuse', 'IllegalStateException', 'terminal operation'],
    },
    {
      id: 'java-str-14',
      title: 'Duplicate key in toMap',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the toMap that crashes on duplicate keys.',
      skeleton: `List<String> words = List.of("hi", "go", "no");
Map<Integer, String> map = words.stream()
    .collect(Collectors.toMap(String::length, w -> w));
// IllegalStateException: Duplicate key 2`,
      solution: `List<String> words = List.of("hi", "go", "no");
Map<Integer, String> map = words.stream()
    .collect(Collectors.toMap(String::length, w -> w, (a, b) -> a));`,
      hints: ['toMap throws on duplicate keys by default.', 'Provide a merge function as the third argument.', '(a, b) -> a keeps the first value.'],
      concepts: ['toMap merge function', 'duplicate keys', 'Collectors'],
    },
    {
      id: 'java-str-15',
      title: 'Modifying source during stream',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the code that modifies the source collection during streaming.',
      skeleton: `List<String> list = new ArrayList<>(List.of("a", "b", "c"));
list.stream().forEach(item -> {
    if (item.equals("b")) list.remove(item); // ConcurrentModificationException
});`,
      solution: `List<String> list = new ArrayList<>(List.of("a", "b", "c"));
list.removeIf(item -> item.equals("b"));`,
      hints: ['Cannot modify the source while streaming.', 'Use removeIf for conditional removal.', 'removeIf is both safe and concise.'],
      concepts: ['ConcurrentModificationException', 'removeIf', 'stream safety'],
    },
    {
      id: 'java-str-16',
      title: 'Predict stream pipeline',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output of a filter-map-collect pipeline.',
      skeleton: `List<Integer> nums = List.of(1, 2, 3, 4, 5);
List<Integer> result = nums.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * 10)
    .toList();
System.out.println(result);`,
      solution: `[20, 40]`,
      hints: ['filter keeps even numbers: 2, 4.', 'map multiplies by 10: 20, 40.', 'toList collects to a list.'],
      concepts: ['filter', 'map', 'pipeline'],
    },
    {
      id: 'java-str-17',
      title: 'Predict reduce',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the result of a reduce operation.',
      skeleton: `int result = Stream.of(1, 2, 3, 4)
    .reduce(10, Integer::sum);
System.out.println(result);`,
      solution: `20`,
      hints: ['reduce starts with identity value 10.', 'It adds each element: 10+1+2+3+4.', 'Total is 20.'],
      concepts: ['reduce', 'identity value', 'accumulation'],
    },
    {
      id: 'java-str-18',
      title: 'Predict flatMap',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output of flatMap.',
      skeleton: `List<String> result = List.of("hello world", "java streams")
    .stream()
    .flatMap(s -> Arrays.stream(s.split(" ")))
    .toList();
System.out.println(result);`,
      solution: `[hello, world, java, streams]`,
      hints: ['Each string is split into words.', 'flatMap flattens the arrays into one stream.', 'All four words appear in order.'],
      concepts: ['flatMap', 'split', 'flattening'],
    },
    {
      id: 'java-str-19',
      title: 'Refactor loop to stream',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this imperative loop to a stream pipeline.',
      skeleton: `List<String> result = new ArrayList<>();
for (String name : names) {
    if (name.length() > 3) {
        result.add(name.toUpperCase());
    }
}`,
      solution: `List<String> result = names.stream()
    .filter(name -> name.length() > 3)
    .map(String::toUpperCase)
    .toList();`,
      hints: ['The if condition becomes a filter.', 'The transformation becomes a map.', 'Collect with toList().'],
      concepts: ['stream refactoring', 'filter', 'map'],
    },
    {
      id: 'java-str-20',
      title: 'Refactor nested loops to flatMap',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor these nested loops to use flatMap.',
      skeleton: `List<String> allTags = new ArrayList<>();
for (Article article : articles) {
    for (String tag : article.getTags()) {
        if (!allTags.contains(tag)) {
            allTags.add(tag);
        }
    }
}`,
      solution: `List<String> allTags = articles.stream()
    .flatMap(article -> article.getTags().stream())
    .distinct()
    .toList();`,
      hints: ['flatMap flattens nested collections.', 'distinct() replaces the contains check.', 'The result is automatically collected.'],
      concepts: ['flatMap', 'distinct', 'nested loop refactoring'],
    },
  ],
};
