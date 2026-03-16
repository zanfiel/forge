import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-collections-map',
  title: '19. Collections: Map',
  explanation: `## Collections: Map

A Map stores key-value pairs. Keys are unique; values can be duplicated.

### Common Implementations
\`\`\`java
Map<String, Integer> hashMap = new HashMap<>();       // O(1), unordered
Map<String, Integer> treeMap = new TreeMap<>();        // O(log n), sorted keys
Map<String, Integer> linkedMap = new LinkedHashMap<>(); // O(1), insertion order
Map<String, Integer> immutable = Map.of("a", 1);      // unmodifiable
\`\`\`

### Key Operations
- \`put(key, value)\`, \`get(key)\`, \`getOrDefault(key, default)\`
- \`containsKey(key)\`, \`containsValue(value)\`
- \`remove(key)\`, \`size()\`, \`isEmpty()\`

### Iteration
\`\`\`java
map.forEach((k, v) -> System.out.println(k + "=" + v));
for (Map.Entry<K, V> entry : map.entrySet()) { ... }
\`\`\`

### Modern Methods (Java 8+)
- \`putIfAbsent\`, \`computeIfAbsent\`, \`computeIfPresent\`
- \`merge\`, \`replaceAll\`
`,
  exercises: [
    {
      id: 'java-map-1',
      title: 'Create a HashMap',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create a HashMap mapping String keys to Integer values.',
      skeleton: `Map<String, Integer> scores = new __BLANK__<>();`,
      solution: `Map<String, Integer> scores = new HashMap<>();`,
      hints: ['HashMap is the most common Map implementation.', 'It provides O(1) get and put.', 'Use `HashMap`.'],
      concepts: ['HashMap', 'Map interface', 'key-value pairs'],
    },
    {
      id: 'java-map-2',
      title: 'Put and get',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Store and retrieve a value from a map.',
      skeleton: `map.put("Alice", 95);
int score = map.__BLANK__("Alice");`,
      solution: `map.put("Alice", 95);
int score = map.get("Alice");`,
      hints: ['Retrieve a value by its key.', 'Returns null if key is absent.', 'Use `get`.'],
      concepts: ['put', 'get', 'Map'],
    },
    {
      id: 'java-map-3',
      title: 'Get with default value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Get a value with a fallback default.',
      skeleton: `int score = map.__BLANK__("Bob", 0);`,
      solution: `int score = map.getOrDefault("Bob", 0);`,
      hints: ['Regular get returns null for missing keys.', 'There is a method that provides a default.', 'Use `getOrDefault`.'],
      concepts: ['getOrDefault', 'default value', 'null safety'],
    },
    {
      id: 'java-map-4',
      title: 'Iterate over entries',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Iterate over all key-value pairs in a map.',
      skeleton: `for (Map.Entry<String, Integer> entry : map.__BLANK__()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}`,
      solution: `for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}`,
      hints: ['Map has a method returning all entries as a Set.', 'Each entry has getKey and getValue.', 'Use `entrySet`.'],
      concepts: ['entrySet', 'Map.Entry', 'iteration'],
    },
    {
      id: 'java-map-5',
      title: 'Compute if absent',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Lazily compute a value only if the key is absent.',
      skeleton: `map.__BLANK__("count", k -> new AtomicInteger(0));`,
      solution: `map.computeIfAbsent("count", k -> new AtomicInteger(0));`,
      hints: ['This method creates the value only if the key is missing.', 'It takes a key and a mapping function.', 'Use `computeIfAbsent`.'],
      concepts: ['computeIfAbsent', 'lazy computation', 'lambda'],
    },
    {
      id: 'java-map-6',
      title: 'Merge values',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Merge a new value with an existing one using addition.',
      skeleton: `map.__BLANK__("score", 10, Integer::sum);`,
      solution: `map.merge("score", 10, Integer::sum);`,
      hints: ['This method combines old and new values with a function.', 'If key is absent, it uses the new value directly.', 'Use `merge`.'],
      concepts: ['merge', 'BiFunction', 'method reference'],
    },
    {
      id: 'java-map-7',
      title: 'Word frequency counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that counts word frequencies in a string array, returning a Map<String, Integer>.',
      skeleton: '',
      solution: `static Map<String, Integer> wordFrequency(String[] words) {
    Map<String, Integer> freq = new HashMap<>();
    for (String word : words) {
        freq.merge(word, 1, Integer::sum);
    }
    return freq;
}`,
      hints: ['Use merge to increment counts.', 'merge(key, 1, Integer::sum) adds 1 each time.', 'Start with an empty HashMap.'],
      concepts: ['merge', 'frequency counting', 'HashMap'],
    },
    {
      id: 'java-map-8',
      title: 'Group by first letter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that groups a list of names by their first letter into a Map<Character, List<String>>.',
      skeleton: '',
      solution: `static Map<Character, List<String>> groupByFirstLetter(List<String> names) {
    Map<Character, List<String>> groups = new HashMap<>();
    for (String name : names) {
        groups.computeIfAbsent(name.charAt(0), k -> new ArrayList<>()).add(name);
    }
    return groups;
}`,
      hints: ['computeIfAbsent creates the list if needed.', 'Use charAt(0) to get the first character.', 'Chain .add() after computeIfAbsent.'],
      concepts: ['computeIfAbsent', 'grouping', 'Map of Lists'],
    },
    {
      id: 'java-map-9',
      title: 'Invert a map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that inverts a Map<String, Integer> to Map<Integer, String>. Assume values are unique.',
      skeleton: '',
      solution: `static Map<Integer, String> invertMap(Map<String, Integer> original) {
    Map<Integer, String> inverted = new HashMap<>();
    for (Map.Entry<String, Integer> entry : original.entrySet()) {
        inverted.put(entry.getValue(), entry.getKey());
    }
    return inverted;
}`,
      hints: ['Iterate over entries of the original map.', 'Swap keys and values in the new map.', 'Use entrySet() for iteration.'],
      concepts: ['map inversion', 'entrySet', 'key-value swap'],
    },
    {
      id: 'java-map-10',
      title: 'Immutable map creation',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method that creates and returns an immutable map of HTTP status codes.',
      skeleton: '',
      solution: `static Map<Integer, String> httpStatusCodes() {
    return Map.of(
        200, "OK",
        404, "Not Found",
        500, "Internal Server Error"
    );
}`,
      hints: ['Map.of creates an unmodifiable map.', 'Pass alternating keys and values.', 'Up to 10 entries can be passed directly.'],
      concepts: ['Map.of', 'immutable map', 'factory method'],
    },
    {
      id: 'java-map-11',
      title: 'Two-sum using map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that finds two indices in an array whose values sum to a target, using a HashMap.',
      skeleton: '',
      solution: `static int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (seen.containsKey(complement)) {
            return new int[]{ seen.get(complement), i };
        }
        seen.put(nums[i], i);
    }
    return new int[]{};
}`,
      hints: ['Store each number and its index in the map.', 'For each number, check if target - number exists.', 'Return the two indices when found.'],
      concepts: ['HashMap', 'two-sum', 'complement lookup'],
    },
    {
      id: 'java-map-12',
      title: 'Sorted map by value',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method that sorts a Map<String, Integer> by values in descending order and returns a LinkedHashMap.',
      skeleton: '',
      solution: `static LinkedHashMap<String, Integer> sortByValueDesc(Map<String, Integer> map) {
    LinkedHashMap<String, Integer> sorted = new LinkedHashMap<>();
    map.entrySet().stream()
        .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
        .forEach(e -> sorted.put(e.getKey(), e.getValue()));
    return sorted;
}`,
      hints: ['Use stream on entrySet to sort.', 'Map.Entry.comparingByValue() sorts by value.', 'LinkedHashMap preserves insertion order.'],
      concepts: ['sorting by value', 'Stream', 'LinkedHashMap'],
    },
    {
      id: 'java-map-13',
      title: 'NullPointerException on unboxing',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the NullPointerException when getting a missing key.',
      skeleton: `Map<String, Integer> map = new HashMap<>();
map.put("a", 1);
int value = map.get("b"); // NullPointerException: null unboxed to int`,
      solution: `Map<String, Integer> map = new HashMap<>();
map.put("a", 1);
int value = map.getOrDefault("b", 0);`,
      hints: ['get() returns null for missing keys.', 'Unboxing null to int throws NPE.', 'Use getOrDefault to provide a fallback.'],
      concepts: ['NullPointerException', 'autoboxing', 'getOrDefault'],
    },
    {
      id: 'java-map-14',
      title: 'ConcurrentModificationException in map',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the code that modifies a map while iterating.',
      skeleton: `Map<String, Integer> map = new HashMap<>(Map.of("a", 1, "b", 2, "c", 3));
for (String key : map.keySet()) {
    if (map.get(key) < 2) {
        map.remove(key); // ConcurrentModificationException
    }
}`,
      solution: `Map<String, Integer> map = new HashMap<>(Map.of("a", 1, "b", 2, "c", 3));
map.entrySet().removeIf(entry -> entry.getValue() < 2);`,
      hints: ['Cannot modify a map while iterating over it.', 'Use removeIf on the entrySet.', 'removeIf safely removes matching entries.'],
      concepts: ['ConcurrentModificationException', 'removeIf', 'safe removal'],
    },
    {
      id: 'java-map-15',
      title: 'Map.of duplicate key',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the Map.of call that throws IllegalArgumentException.',
      skeleton: `Map<String, Integer> map = Map.of(
    "a", 1,
    "b", 2,
    "a", 3  // IllegalArgumentException: duplicate key
);`,
      solution: `Map<String, Integer> map = Map.of(
    "a", 3,
    "b", 2
);`,
      hints: ['Map.of does not allow duplicate keys.', 'Remove the duplicate entry.', 'Keep whichever value is desired.'],
      concepts: ['Map.of', 'duplicate keys', 'IllegalArgumentException'],
    },
    {
      id: 'java-map-16',
      title: 'Predict put overwrite',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output when putting a duplicate key.',
      skeleton: `Map<String, Integer> m = new HashMap<>();
m.put("x", 1);
Integer old = m.put("x", 2);
System.out.println(old);
System.out.println(m.get("x"));`,
      solution: `1
2`,
      hints: ['put returns the previous value for the key.', 'The key existed with value 1.', 'After the second put, the value is 2.'],
      concepts: ['put return value', 'overwrite', 'HashMap'],
    },
    {
      id: 'java-map-17',
      title: 'Predict putIfAbsent',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output of putIfAbsent.',
      skeleton: `Map<String, Integer> m = new HashMap<>();
m.put("a", 1);
m.putIfAbsent("a", 99);
m.putIfAbsent("b", 42);
System.out.println(m.get("a"));
System.out.println(m.get("b"));`,
      solution: `1
42`,
      hints: ['putIfAbsent only sets the value if key is absent.', '"a" already exists so it keeps 1.', '"b" is absent so it gets 42.'],
      concepts: ['putIfAbsent', 'conditional insert', 'Map'],
    },
    {
      id: 'java-map-18',
      title: 'Predict TreeMap ordering',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the order of keys in a TreeMap.',
      skeleton: `Map<String, Integer> m = new TreeMap<>();
m.put("banana", 2);
m.put("apple", 1);
m.put("cherry", 3);
System.out.println(m.keySet());`,
      solution: `[apple, banana, cherry]`,
      hints: ['TreeMap sorts keys by natural ordering.', 'Strings sort alphabetically.', 'Keys appear in alphabetical order.'],
      concepts: ['TreeMap', 'sorted keys', 'natural ordering'],
    },
    {
      id: 'java-map-19',
      title: 'Refactor to merge',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this verbose counting code to use Map.merge.',
      skeleton: `Map<String, Integer> counts = new HashMap<>();
for (String word : words) {
    if (counts.containsKey(word)) {
        counts.put(word, counts.get(word) + 1);
    } else {
        counts.put(word, 1);
    }
}`,
      solution: `Map<String, Integer> counts = new HashMap<>();
for (String word : words) {
    counts.merge(word, 1, Integer::sum);
}`,
      hints: ['merge handles both present and absent keys.', 'The third argument combines old and new values.', 'Integer::sum adds the values together.'],
      concepts: ['merge', 'frequency counting', 'refactoring'],
    },
    {
      id: 'java-map-20',
      title: 'Refactor to computeIfAbsent',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this multimap pattern to use computeIfAbsent.',
      skeleton: `Map<String, List<String>> groups = new HashMap<>();
for (String name : names) {
    String key = name.substring(0, 1);
    if (!groups.containsKey(key)) {
        groups.put(key, new ArrayList<>());
    }
    groups.get(key).add(name);
}`,
      solution: `Map<String, List<String>> groups = new HashMap<>();
for (String name : names) {
    String key = name.substring(0, 1);
    groups.computeIfAbsent(key, k -> new ArrayList<>()).add(name);
}`,
      hints: ['computeIfAbsent creates the value if the key is absent.', 'It returns the existing or newly created value.', 'Chain .add() directly on the result.'],
      concepts: ['computeIfAbsent', 'multimap', 'refactoring'],
    },
  ],
};
