import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-collections-set',
  title: '18. Collections: Set',
  explanation: `## Collections: Set

A Set is a collection that contains no duplicate elements.

### Common Implementations
\`\`\`java
Set<String> hashSet = new HashSet<>();     // O(1) add/remove/contains, unordered
Set<String> treeSet = new TreeSet<>();     // O(log n), sorted
Set<String> linkedSet = new LinkedHashSet<>(); // O(1), insertion order
Set<String> immutable = Set.of("a", "b");  // unmodifiable
\`\`\`

### Key Operations
- \`add(e)\`, \`remove(e)\`, \`contains(e)\`
- \`size()\`, \`isEmpty()\`, \`clear()\`

### Set Operations (Bulk)
\`\`\`java
setA.addAll(setB);     // union
setA.retainAll(setB);  // intersection
setA.removeAll(setB);  // difference
\`\`\`

### hashCode & equals Contract
Objects in a HashSet MUST properly implement both \`hashCode()\` and \`equals()\`.
`,
  exercises: [
    {
      id: 'java-set-1',
      title: 'Create a HashSet',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create a HashSet of integers.',
      skeleton: `Set<Integer> numbers = new __BLANK__<>();`,
      solution: `Set<Integer> numbers = new HashSet<>();`,
      hints: ['HashSet is the most common Set implementation.', 'It offers O(1) operations.', 'Use `HashSet`.'],
      concepts: ['HashSet', 'Set interface', 'diamond operator'],
    },
    {
      id: 'java-set-2',
      title: 'Create sorted set',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create a Set that keeps elements in sorted order.',
      skeleton: `Set<String> sorted = new __BLANK__<>();`,
      solution: `Set<String> sorted = new TreeSet<>();`,
      hints: ['One Set implementation maintains natural ordering.', 'It uses a red-black tree.', 'Use `TreeSet`.'],
      concepts: ['TreeSet', 'sorted set', 'natural ordering'],
    },
    {
      id: 'java-set-3',
      title: 'Create immutable set',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create an unmodifiable set with factory method.',
      skeleton: `Set<String> colors = Set.__BLANK__("red", "green", "blue");`,
      solution: `Set<String> colors = Set.of("red", "green", "blue");`,
      hints: ['Java 9 added factory methods.', 'It throws if duplicates are provided.', 'Use `of`.'],
      concepts: ['Set.of', 'immutable set', 'factory method'],
    },
    {
      id: 'java-set-4',
      title: 'Check set membership',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Check if a set contains an element.',
      skeleton: `boolean found = names.__BLANK__("Alice");`,
      solution: `boolean found = names.contains("Alice");`,
      hints: ['Sets have a membership test method.', 'It returns a boolean.', 'Use `contains`.'],
      concepts: ['contains', 'membership test', 'Set'],
    },
    {
      id: 'java-set-5',
      title: 'Set union',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Compute the union of two sets.',
      skeleton: `Set<Integer> union = new HashSet<>(setA);
union.__BLANK__(setB);`,
      solution: `Set<Integer> union = new HashSet<>(setA);
union.addAll(setB);`,
      hints: ['First copy one set, then add all elements from the other.', 'There is a bulk add method.', 'Use `addAll`.'],
      concepts: ['addAll', 'set union', 'bulk operation'],
    },
    {
      id: 'java-set-6',
      title: 'Set intersection',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Compute the intersection of two sets.',
      skeleton: `Set<Integer> intersection = new HashSet<>(setA);
intersection.__BLANK__(setB);`,
      solution: `Set<Integer> intersection = new HashSet<>(setA);
intersection.retainAll(setB);`,
      hints: ['Keep only elements that exist in both sets.', 'There is a retain method for bulk operations.', 'Use `retainAll`.'],
      concepts: ['retainAll', 'set intersection', 'bulk operation'],
    },
    {
      id: 'java-set-7',
      title: 'Remove duplicates from list',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method that removes duplicates from a List by converting to a Set and back.',
      skeleton: '',
      solution: `static <T> List<T> removeDuplicates(List<T> list) {
    return new ArrayList<>(new LinkedHashSet<>(list));
}`,
      hints: ['LinkedHashSet preserves insertion order and removes duplicates.', 'Pass the list to the set constructor.', 'Convert back to ArrayList.'],
      concepts: ['LinkedHashSet', 'duplicate removal', 'order preservation'],
    },
    {
      id: 'java-set-8',
      title: 'Symmetric difference',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that returns the symmetric difference of two sets (elements in either but not both).',
      skeleton: '',
      solution: `static <T> Set<T> symmetricDifference(Set<T> a, Set<T> b) {
    Set<T> result = new HashSet<>(a);
    result.addAll(b);
    Set<T> intersection = new HashSet<>(a);
    intersection.retainAll(b);
    result.removeAll(intersection);
    return result;
}`,
      hints: ['Symmetric difference = union minus intersection.', 'Compute the union first, then the intersection.', 'Remove the intersection from the union.'],
      concepts: ['symmetric difference', 'set operations', 'union', 'intersection'],
    },
    {
      id: 'java-set-9',
      title: 'Check if subset',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method that checks if set A is a subset of set B.',
      skeleton: '',
      solution: `static <T> boolean isSubset(Set<T> a, Set<T> b) {
    return b.containsAll(a);
}`,
      hints: ['A is a subset of B if B contains all elements of A.', 'Collection has a containsAll method.', 'Call containsAll on the superset.'],
      concepts: ['containsAll', 'subset', 'set relationship'],
    },
    {
      id: 'java-set-10',
      title: 'Power set generation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method that generates the power set (all subsets) of a given set.',
      skeleton: '',
      solution: `static <T> Set<Set<T>> powerSet(Set<T> set) {
    Set<Set<T>> result = new HashSet<>();
    result.add(new HashSet<>());
    for (T element : set) {
        Set<Set<T>> newSubsets = new HashSet<>();
        for (Set<T> subset : result) {
            Set<T> newSubset = new HashSet<>(subset);
            newSubset.add(element);
            newSubsets.add(newSubset);
        }
        result.addAll(newSubsets);
    }
    return result;
}`,
      hints: ['Start with a set containing only the empty set.', 'For each element, create new subsets by adding it to existing ones.', 'Add all new subsets to the result.'],
      concepts: ['power set', 'combinatorics', 'set generation'],
    },
    {
      id: 'java-set-11',
      title: 'Word frequency counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that returns the set of unique words from a string (case-insensitive).',
      skeleton: '',
      solution: `static Set<String> uniqueWords(String text) {
    Set<String> words = new TreeSet<>(String.CASE_INSENSITIVE_ORDER);
    for (String word : text.split("\\\\s+")) {
        words.add(word);
    }
    return words;
}`,
      hints: ['Split the string on whitespace.', 'TreeSet can take a custom Comparator.', 'String.CASE_INSENSITIVE_ORDER handles case.'],
      concepts: ['TreeSet', 'Comparator', 'case-insensitive', 'unique words'],
    },
    {
      id: 'java-set-12',
      title: 'Convert between Set types',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method that converts a HashSet to a sorted TreeSet.',
      skeleton: '',
      solution: `static <T extends Comparable<T>> TreeSet<T> toSorted(HashSet<T> set) {
    return new TreeSet<>(set);
}`,
      hints: ['TreeSet has a constructor that accepts a Collection.', 'Elements must be Comparable for natural ordering.', 'Just pass the HashSet to TreeSet constructor.'],
      concepts: ['TreeSet', 'constructor conversion', 'Comparable'],
    },
    {
      id: 'java-set-13',
      title: 'Missing hashCode breaks Set',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the class so it works correctly in a HashSet.',
      skeleton: `class Point {
    int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }
    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Point p)) return false;
        return x == p.x && y == p.y;
    }
}
// new HashSet with Point(1,2) added twice contains 2 elements`,
      solution: `class Point {
    int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }
    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Point p)) return false;
        return x == p.x && y == p.y;
    }
    @Override
    public int hashCode() {
        return Objects.hash(x, y);
    }
}`,
      hints: ['HashSet relies on both hashCode and equals.', 'If equals is overridden, hashCode must also be overridden.', 'Use Objects.hash(x, y).'],
      concepts: ['hashCode', 'equals contract', 'HashSet'],
    },
    {
      id: 'java-set-14',
      title: 'TreeSet ClassCastException',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the TreeSet that throws ClassCastException.',
      skeleton: `class Person {
    String name;
    int age;
    Person(String name, int age) { this.name = name; this.age = age; }
}
Set<Person> people = new TreeSet<>();
people.add(new Person("Alice", 30)); // ClassCastException`,
      solution: `class Person implements Comparable<Person> {
    String name;
    int age;
    Person(String name, int age) { this.name = name; this.age = age; }
    @Override
    public int compareTo(Person other) {
        return this.name.compareTo(other.name);
    }
}
Set<Person> people = new TreeSet<>();
people.add(new Person("Alice", 30));`,
      hints: ['TreeSet requires elements to be Comparable.', 'Implement the Comparable interface.', 'Define compareTo to establish ordering.'],
      concepts: ['TreeSet', 'Comparable', 'ClassCastException'],
    },
    {
      id: 'java-set-15',
      title: 'Mutable key in HashSet',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Fix the bug where a modified element becomes invisible in the set.',
      skeleton: `Set<List<String>> set = new HashSet<>();
List<String> list = new ArrayList<>();
list.add("hello");
set.add(list);
list.add("world"); // hashCode changes!
System.out.println(set.contains(list)); // false!`,
      solution: `Set<List<String>> set = new HashSet<>();
List<String> list = new ArrayList<>();
list.add("hello");
set.add(List.copyOf(list)); // store immutable copy
list.add("world");
System.out.println(set.contains(List.of("hello"))); // true`,
      hints: ['Mutable objects used as set elements cause issues when modified.', 'The hashCode changes after modification, making the element unreachable.', 'Store an immutable copy in the set instead.'],
      concepts: ['mutable keys', 'hashCode stability', 'defensive copy'],
    },
    {
      id: 'java-set-16',
      title: 'Predict HashSet add behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output of adding duplicates to a HashSet.',
      skeleton: `Set<String> set = new HashSet<>();
System.out.println(set.add("A"));
System.out.println(set.add("B"));
System.out.println(set.add("A"));
System.out.println(set.size());`,
      solution: `true
true
false
2`,
      hints: ['add returns true if the set was modified.', 'Adding a duplicate does not modify the set.', 'The set has only 2 unique elements.'],
      concepts: ['add return value', 'duplicate rejection', 'Set'],
    },
    {
      id: 'java-set-17',
      title: 'Predict TreeSet ordering',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the order of elements in a TreeSet.',
      skeleton: `Set<Integer> set = new TreeSet<>();
set.add(30);
set.add(10);
set.add(20);
System.out.println(set);`,
      solution: `[10, 20, 30]`,
      hints: ['TreeSet maintains sorted order.', 'Integers sort by natural ordering.', 'Elements are printed in ascending order.'],
      concepts: ['TreeSet', 'sorted order', 'natural ordering'],
    },
    {
      id: 'java-set-18',
      title: 'Predict LinkedHashSet order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the iteration order of a LinkedHashSet.',
      skeleton: `Set<String> set = new LinkedHashSet<>();
set.add("C");
set.add("A");
set.add("B");
set.add("A");
System.out.println(set);`,
      solution: `[C, A, B]`,
      hints: ['LinkedHashSet maintains insertion order.', 'Adding a duplicate does not change order.', '"A" was first added after "C".'],
      concepts: ['LinkedHashSet', 'insertion order', 'duplicate handling'],
    },
    {
      id: 'java-set-19',
      title: 'Refactor list-based uniqueness check',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Refactor this O(n^2) uniqueness check to use a Set.',
      skeleton: `boolean allUnique(List<String> items) {
    for (int i = 0; i < items.size(); i++) {
        for (int j = i + 1; j < items.size(); j++) {
            if (items.get(i).equals(items.get(j))) return false;
        }
    }
    return true;
}`,
      solution: `boolean allUnique(List<String> items) {
    return new HashSet<>(items).size() == items.size();
}`,
      hints: ['A Set automatically rejects duplicates.', 'If the set size equals the list size, all elements are unique.', 'This reduces O(n^2) to O(n).'],
      concepts: ['HashSet', 'uniqueness check', 'performance'],
    },
    {
      id: 'java-set-20',
      title: 'Refactor to EnumSet',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this HashSet of enums to use the more efficient EnumSet.',
      skeleton: `enum Day { MON, TUE, WED, THU, FRI, SAT, SUN }

Set<Day> weekdays = new HashSet<>();
weekdays.add(Day.MON);
weekdays.add(Day.TUE);
weekdays.add(Day.WED);
weekdays.add(Day.THU);
weekdays.add(Day.FRI);`,
      solution: `enum Day { MON, TUE, WED, THU, FRI, SAT, SUN }

Set<Day> weekdays = EnumSet.range(Day.MON, Day.FRI);`,
      hints: ['EnumSet is a specialized Set for enums.', 'It is more efficient than HashSet for enum types.', 'EnumSet.range creates a set from a contiguous range.'],
      concepts: ['EnumSet', 'range', 'enum optimization'],
    },
  ],
};
