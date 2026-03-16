import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-collections-list',
  title: '17. Collections: List',
  explanation: `## Collections: List

The List interface represents an ordered collection allowing duplicates.

### Common Implementations
\`\`\`java
List<String> arrayList = new ArrayList<>();   // fast random access
List<String> linkedList = new LinkedList<>();  // fast insert/remove
List<String> immutable = List.of("a", "b");    // unmodifiable
\`\`\`

### Key Operations
- \`add(e)\`, \`add(index, e)\`, \`get(index)\`, \`set(index, e)\`
- \`remove(index)\`, \`remove(Object)\`, \`contains(e)\`
- \`size()\`, \`isEmpty()\`, \`indexOf(e)\`

### Sorting & Searching
\`\`\`java
Collections.sort(list);
list.sort(Comparator.naturalOrder());
Collections.binarySearch(list, key);
\`\`\`

### Conversion
\`\`\`java
List<String> fromArray = Arrays.asList(array);
String[] toArray = list.toArray(new String[0]);
\`\`\`

### List.copyOf (Java 10+)
Creates an unmodifiable copy of any collection.
`,
  exercises: [
    {
      id: 'java-list-1',
      title: 'Create an ArrayList',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create an ArrayList of Strings.',
      skeleton: `List<String> names = new __BLANK__<>();`,
      solution: `List<String> names = new ArrayList<>();`,
      hints: ['ArrayList is the most common List implementation.', 'Use the diamond operator for type inference.', 'Use `ArrayList`.'],
      concepts: ['ArrayList', 'List interface', 'diamond operator'],
    },
    {
      id: 'java-list-2',
      title: 'Add element at index',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Insert an element at index 0.',
      skeleton: `list.__BLANK__(0, "first");`,
      solution: `list.add(0, "first");`,
      hints: ['List has an overloaded add method.', 'It takes an index and an element.', 'Use `add`.'],
      concepts: ['add at index', 'List', 'insertion'],
    },
    {
      id: 'java-list-3',
      title: 'Get element by index',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Retrieve the element at index 2.',
      skeleton: `String item = list.__BLANK__(2);`,
      solution: `String item = list.get(2);`,
      hints: ['List uses a method, not bracket notation.', 'It takes an integer index.', 'Use `get`.'],
      concepts: ['get', 'random access', 'List'],
    },
    {
      id: 'java-list-4',
      title: 'Create an immutable list',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create an unmodifiable list with factory method.',
      skeleton: `List<Integer> nums = List.__BLANK__(1, 2, 3);`,
      solution: `List<Integer> nums = List.of(1, 2, 3);`,
      hints: ['Java 9 added factory methods to List.', 'It creates an immutable list.', 'Use `of`.'],
      concepts: ['List.of', 'immutable list', 'factory method'],
    },
    {
      id: 'java-list-5',
      title: 'Sort a list',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Sort a list using its natural ordering.',
      skeleton: `Collections.__BLANK__(names);`,
      solution: `Collections.sort(names);`,
      hints: ['The Collections utility class has a sort method.', 'Elements must implement Comparable.', 'Use `sort`.'],
      concepts: ['Collections.sort', 'natural ordering', 'Comparable'],
    },
    {
      id: 'java-list-6',
      title: 'SubList extraction',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Get a view of elements from index 1 to 3 (exclusive).',
      skeleton: `List<String> sub = list.__BLANK__(1, 3);`,
      solution: `List<String> sub = list.subList(1, 3);`,
      hints: ['List has a method that returns a view of a range.', 'The end index is exclusive.', 'Use `subList`.'],
      concepts: ['subList', 'view', 'range'],
    },
    {
      id: 'java-list-7',
      title: 'Reverse a list',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method that reverses a List<String> in place using Collections.',
      skeleton: '',
      solution: `static void reverseList(List<String> list) {
    Collections.reverse(list);
}`,
      hints: ['The Collections class has a reverse method.', 'It modifies the list in place.', 'No return value is needed.'],
      concepts: ['Collections.reverse', 'in-place modification', 'utility method'],
    },
    {
      id: 'java-list-8',
      title: 'Find duplicates in a list',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that returns a List of duplicate elements found in the input list.',
      skeleton: '',
      solution: `static <T> List<T> findDuplicates(List<T> list) {
    Set<T> seen = new HashSet<>();
    List<T> duplicates = new ArrayList<>();
    for (T item : list) {
        if (!seen.add(item)) {
            duplicates.add(item);
        }
    }
    return duplicates;
}`,
      hints: ['Use a Set to track seen elements.', 'Set.add returns false if the element already exists.', 'Add to duplicates when add returns false.'],
      concepts: ['Set', 'duplicate detection', 'generic method'],
    },
    {
      id: 'java-list-9',
      title: 'Convert array to List',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method that converts a String array to a mutable ArrayList.',
      skeleton: '',
      solution: `static List<String> toMutableList(String[] array) {
    return new ArrayList<>(Arrays.asList(array));
}`,
      hints: ['Arrays.asList returns a fixed-size list.', 'Wrap it in an ArrayList for mutability.', 'Pass the result to the ArrayList constructor.'],
      concepts: ['Arrays.asList', 'ArrayList constructor', 'mutable list'],
    },
    {
      id: 'java-list-10',
      title: 'Custom Comparator sorting',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that sorts a list of strings by their length (shortest first).',
      skeleton: '',
      solution: `static void sortByLength(List<String> list) {
    list.sort(Comparator.comparingInt(String::length));
}`,
      hints: ['Use the sort method on List.', 'Comparator.comparingInt extracts an int key.', 'String::length is a method reference.'],
      concepts: ['Comparator', 'method reference', 'sort'],
    },
    {
      id: 'java-list-11',
      title: 'Merge two sorted lists',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method that merges two sorted List<Integer> into one sorted list.',
      skeleton: '',
      solution: `static List<Integer> mergeSorted(List<Integer> a, List<Integer> b) {
    List<Integer> result = new ArrayList<>();
    int i = 0, j = 0;
    while (i < a.size() && j < b.size()) {
        if (a.get(i) <= b.get(j)) {
            result.add(a.get(i++));
        } else {
            result.add(b.get(j++));
        }
    }
    while (i < a.size()) result.add(a.get(i++));
    while (j < b.size()) result.add(b.get(j++));
    return result;
}`,
      hints: ['Use two pointers, one for each list.', 'Compare elements and add the smaller one.', 'After one list is exhausted, add remaining from the other.'],
      concepts: ['merge algorithm', 'two pointers', 'sorted list'],
    },
    {
      id: 'java-list-12',
      title: 'Partition a list',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that partitions a List<Integer> into two lists: evens and odds, returned as a List of two Lists.',
      skeleton: '',
      solution: `static List<List<Integer>> partition(List<Integer> numbers) {
    List<Integer> evens = new ArrayList<>();
    List<Integer> odds = new ArrayList<>();
    for (int n : numbers) {
        if (n % 2 == 0) evens.add(n);
        else odds.add(n);
    }
    return List.of(evens, odds);
}`,
      hints: ['Create two separate lists for even and odd.', 'Use modulo to check parity.', 'Return both lists wrapped in List.of().'],
      concepts: ['partitioning', 'modulo', 'List.of'],
    },
    {
      id: 'java-list-13',
      title: 'ConcurrentModificationException',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the code that throws ConcurrentModificationException when removing elements.',
      skeleton: `List<String> names = new ArrayList<>(List.of("Alice", "Bob", "Charlie"));
for (String name : names) {
    if (name.startsWith("B")) {
        names.remove(name);
    }
}`,
      solution: `List<String> names = new ArrayList<>(List.of("Alice", "Bob", "Charlie"));
Iterator<String> it = names.iterator();
while (it.hasNext()) {
    if (it.next().startsWith("B")) {
        it.remove();
    }
}`,
      hints: ['You cannot modify a list while iterating with for-each.', 'Use an explicit Iterator instead.', 'Call iterator.remove() to safely remove.'],
      concepts: ['ConcurrentModificationException', 'Iterator', 'safe removal'],
    },
    {
      id: 'java-list-14',
      title: 'UnsupportedOperationException',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the code that crashes when trying to add to an immutable list.',
      skeleton: `List<String> names = List.of("Alice", "Bob");
names.add("Charlie"); // throws UnsupportedOperationException`,
      solution: `List<String> names = new ArrayList<>(List.of("Alice", "Bob"));
names.add("Charlie");`,
      hints: ['List.of returns an unmodifiable list.', 'Wrap it in a new ArrayList to make it mutable.', 'Use new ArrayList<>(List.of(...)).'],
      concepts: ['immutable list', 'UnsupportedOperationException', 'ArrayList'],
    },
    {
      id: 'java-list-15',
      title: 'Wrong remove overload',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the code that removes the wrong element from a List<Integer>.',
      skeleton: `List<Integer> nums = new ArrayList<>(List.of(10, 20, 30));
nums.remove(20); // Intended: remove element 20, but throws IndexOutOfBoundsException`,
      solution: `List<Integer> nums = new ArrayList<>(List.of(10, 20, 30));
nums.remove(Integer.valueOf(20));`,
      hints: ['remove(int) removes by index, remove(Object) removes by value.', 'Passing 20 calls remove(int index).', 'Use Integer.valueOf(20) to call remove(Object).'],
      concepts: ['method overloading', 'autoboxing', 'remove ambiguity'],
    },
    {
      id: 'java-list-16',
      title: 'Predict ArrayList add/remove',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output after add and remove operations.',
      skeleton: `List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");
list.remove(1);
System.out.println(list);`,
      solution: `[A, C]`,
      hints: ['remove(1) removes the element at index 1.', 'Index 1 contains "B".', 'Remaining elements shift left.'],
      concepts: ['remove by index', 'ArrayList', 'toString'],
    },
    {
      id: 'java-list-17',
      title: 'Predict List.of immutability',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict what happens when modifying a List.of result.',
      skeleton: `try {
    List<Integer> nums = List.of(1, 2, 3);
    nums.set(0, 99);
    System.out.println(nums);
} catch (Exception e) {
    System.out.println(e.getClass().getSimpleName());
}`,
      solution: `UnsupportedOperationException`,
      hints: ['List.of creates an unmodifiable list.', 'set() modifies the list, which is not allowed.', 'An exception is thrown.'],
      concepts: ['immutable list', 'UnsupportedOperationException', 'List.of'],
    },
    {
      id: 'java-list-18',
      title: 'Predict Collections.unmodifiableList',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the behavior of unmodifiableList when the backing list changes.',
      skeleton: `List<String> original = new ArrayList<>(List.of("A", "B"));
List<String> unmod = Collections.unmodifiableList(original);
original.add("C");
System.out.println(unmod.size());`,
      solution: `3`,
      hints: ['unmodifiableList is a view, not a copy.', 'Changes to the original list are visible through the view.', 'The unmodifiable view now has 3 elements.'],
      concepts: ['unmodifiableList', 'view', 'backing list'],
    },
    {
      id: 'java-list-19',
      title: 'Refactor to List.of',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Refactor this verbose list creation to use the modern List.of factory method.',
      skeleton: `List<String> colors = new ArrayList<>();
colors.add("red");
colors.add("green");
colors.add("blue");
// colors is never modified after this`,
      solution: `List<String> colors = List.of("red", "green", "blue");`,
      hints: ['Since the list is never modified, use an immutable list.', 'List.of creates an immutable list in one line.', 'Replace all the add calls with a single List.of call.'],
      concepts: ['List.of', 'immutable list', 'refactoring'],
    },
    {
      id: 'java-list-20',
      title: 'Refactor loops to Collections utility',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this manual min-finding loop to use Collections.min.',
      skeleton: `int min = list.get(0);
for (int i = 1; i < list.size(); i++) {
    if (list.get(i) < min) {
        min = list.get(i);
    }
}`,
      solution: `int min = Collections.min(list);`,
      hints: ['The Collections class has utility methods for common operations.', 'Collections.min finds the smallest element.', 'It works with any Comparable elements.'],
      concepts: ['Collections.min', 'utility methods', 'refactoring'],
    },
  ],
};
