import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-generics',
  title: '16. Generics',
  explanation: `## Generics

Generics enable type-safe, reusable code that works with different types.

### Generic Class
\`\`\`java
class Box<T> {
    private T value;
    public Box(T value) { this.value = value; }
    public T get() { return value; }
}
\`\`\`

### Generic Method
\`\`\`java
static <T> T firstOrNull(List<T> list) {
    return list.isEmpty() ? null : list.get(0);
}
\`\`\`

### Bounded Type Parameters
\`\`\`java
<T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}
\`\`\`

### Wildcards
- \`? extends T\` - upper bound (read)
- \`? super T\` - lower bound (write)
- \`?\` - unbounded

### Type Erasure
Generics are compile-time only; at runtime, \`Box<String>\` becomes \`Box<Object>\`.
`,
  exercises: [
    {
      id: 'java-gen-1',
      title: 'Declare a generic class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare a generic class with a single type parameter.',
      skeleton: `class Wrapper__BLANK__ {
    private T item;
}`,
      solution: `class Wrapper<T> {
    private T item;
}`,
      hints: ['Type parameters go after the class name.', 'They are enclosed in angle brackets.', 'Use `<T>`.'],
      concepts: ['generic class', 'type parameter', 'declaration'],
    },
    {
      id: 'java-gen-2',
      title: 'Instantiate a generic class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create an instance of a generic Box with String type.',
      skeleton: `Box__BLANK__ box = new Box<>("hello");`,
      solution: `Box<String> box = new Box<>("hello");`,
      hints: ['Specify the type argument in angle brackets.', 'The right side can use diamond operator.', 'Use `<String>`.'],
      concepts: ['generic instantiation', 'diamond operator', 'type argument'],
    },
    {
      id: 'java-gen-3',
      title: 'Generic method declaration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Declare a generic static method that returns the first element of an array.',
      skeleton: `static __BLANK__ T first(T[] array) {
    return array[0];
}`,
      solution: `static <T> T first(T[] array) {
    return array[0];
}`,
      hints: ['Generic methods declare their type parameter before the return type.', 'The type parameter is in angle brackets.', 'Use `<T>`.'],
      concepts: ['generic method', 'type parameter', 'static method'],
    },
    {
      id: 'java-gen-4',
      title: 'Upper bounded wildcard',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Accept a list of any Number subtype.',
      skeleton: `double sum(List<__BLANK__> numbers) {
    double total = 0;
    for (Number n : numbers) total += n.doubleValue();
    return total;
}`,
      solution: `double sum(List<? extends Number> numbers) {
    double total = 0;
    for (Number n : numbers) total += n.doubleValue();
    return total;
}`,
      hints: ['Use a wildcard with an upper bound.', 'The keyword extends is used for upper bounds.', 'Use `? extends Number`.'],
      concepts: ['upper bounded wildcard', 'extends', 'covariance'],
    },
    {
      id: 'java-gen-5',
      title: 'Lower bounded wildcard',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Accept a list that can hold Integer or any supertype.',
      skeleton: `void addInts(List<__BLANK__> list) {
    list.add(1);
    list.add(2);
}`,
      solution: `void addInts(List<? super Integer> list) {
    list.add(1);
    list.add(2);
}`,
      hints: ['Use a wildcard with a lower bound.', 'The keyword super is used for lower bounds.', 'Use `? super Integer`.'],
      concepts: ['lower bounded wildcard', 'super', 'contravariance'],
    },
    {
      id: 'java-gen-6',
      title: 'Bounded type parameter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Restrict a type parameter to Comparable types.',
      skeleton: `static <T __BLANK__> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}`,
      solution: `static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}`,
      hints: ['Use extends to set an upper bound on the type parameter.', 'Comparable itself is generic.', 'Use `extends Comparable<T>`.'],
      concepts: ['bounded type parameter', 'Comparable', 'extends'],
    },
    {
      id: 'java-gen-7',
      title: 'Generic pair class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a generic Pair class with two type parameters, a constructor, and getFirst()/getSecond() methods.',
      skeleton: '',
      solution: `class Pair<A, B> {
    private final A first;
    private final B second;

    public Pair(A first, B second) {
        this.first = first;
        this.second = second;
    }

    public A getFirst() { return first; }
    public B getSecond() { return second; }
}`,
      hints: ['Use two type parameters like <A, B>.', 'Store both values as private final fields.', 'Return the correct type from each getter.'],
      concepts: ['multiple type parameters', 'generic class', 'getters'],
    },
    {
      id: 'java-gen-8',
      title: 'Generic swap method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a generic static method that swaps two elements in an array given their indices.',
      skeleton: '',
      solution: `static <T> void swap(T[] array, int i, int j) {
    T temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}`,
      hints: ['Declare a type parameter <T> before the return type.', 'Use a temporary variable to hold one value.', 'The array type is T[].'],
      concepts: ['generic method', 'array manipulation', 'type parameter'],
    },
    {
      id: 'java-gen-9',
      title: 'Generic stack implementation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a generic Stack class with push, pop, peek, and isEmpty methods using an internal array.',
      skeleton: '',
      solution: `class Stack<T> {
    private Object[] data;
    private int size;

    public Stack(int capacity) {
        data = new Object[capacity];
        size = 0;
    }

    public void push(T item) {
        data[size++] = item;
    }

    @SuppressWarnings("unchecked")
    public T pop() {
        return (T) data[--size];
    }

    @SuppressWarnings("unchecked")
    public T peek() {
        return (T) data[size - 1];
    }

    public boolean isEmpty() {
        return size == 0;
    }
}`,
      hints: ['You cannot create generic arrays directly; use Object[].', 'Cast to T when returning elements.', 'Track size with an int field.'],
      concepts: ['generic class', 'type erasure', 'unchecked cast', 'stack'],
    },
    {
      id: 'java-gen-10',
      title: 'Generic method with multiple bounds',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a generic method that accepts a type that is both Comparable and Serializable, and returns the larger of two values.',
      skeleton: '',
      solution: `static <T extends Comparable<T> & java.io.Serializable> T larger(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}`,
      hints: ['Multiple bounds use the & operator.', 'The class bound (if any) must come first.', 'Use extends for all bounds.'],
      concepts: ['multiple bounds', 'intersection type', 'Comparable', 'Serializable'],
    },
    {
      id: 'java-gen-11',
      title: 'Wildcard copy method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a static method that copies all elements from a source list to a destination list using wildcards.',
      skeleton: '',
      solution: `static <T> void copy(List<? super T> dest, List<? extends T> src) {
    for (T item : src) {
        dest.add(item);
    }
}`,
      hints: ['The source list produces elements (use extends).', 'The destination list consumes elements (use super).', 'This follows the PECS principle: Producer Extends, Consumer Super.'],
      concepts: ['PECS', 'upper bounded wildcard', 'lower bounded wildcard', 'copy'],
    },
    {
      id: 'java-gen-12',
      title: 'Generic method returns wrong type',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the generic method so it compiles correctly.',
      skeleton: `static <T> T wrap(Object value) {
    return value; // Error: incompatible types
}`,
      solution: `@SuppressWarnings("unchecked")
static <T> T wrap(Object value) {
    return (T) value;
}`,
      hints: ['Object cannot be returned as T directly.', 'You need an explicit cast.', 'Cast value to (T).'],
      concepts: ['type erasure', 'unchecked cast', 'generic return type'],
    },
    {
      id: 'java-gen-13',
      title: 'Cannot create generic array',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the code that tries to create a generic array.',
      skeleton: `class Container<T> {
    private T[] items = new T[10]; // Compile error
}`,
      solution: `class Container<T> {
    @SuppressWarnings("unchecked")
    private T[] items = (T[]) new Object[10];
}`,
      hints: ['Java does not allow new T[] due to type erasure.', 'Create an Object array and cast it.', 'Use (T[]) new Object[10].'],
      concepts: ['type erasure', 'generic array creation', 'unchecked cast'],
    },
    {
      id: 'java-gen-14',
      title: 'Raw type warning',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the raw type usage to be type-safe.',
      skeleton: `List names = new ArrayList();
names.add("Alice");
String first = (String) names.get(0);`,
      solution: `List<String> names = new ArrayList<>();
names.add("Alice");
String first = names.get(0);`,
      hints: ['Raw types bypass generic type checking.', 'Specify the type parameter on both sides.', 'Use List<String> and ArrayList<>().'],
      concepts: ['raw types', 'type safety', 'diamond operator'],
    },
    {
      id: 'java-gen-15',
      title: 'Predict generic type erasure',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict what this code prints about generic type info at runtime.',
      skeleton: `List<String> a = new ArrayList<>();
List<Integer> b = new ArrayList<>();
System.out.println(a.getClass() == b.getClass());`,
      solution: `true`,
      hints: ['Generics are erased at runtime.', 'Both become ArrayList at runtime.', 'Their Class objects are identical.'],
      concepts: ['type erasure', 'runtime type', 'getClass'],
    },
    {
      id: 'java-gen-16',
      title: 'Predict wildcard behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict if this code compiles and what happens.',
      skeleton: `List<? extends Number> nums = new ArrayList<Integer>();
// nums.add(42);  // Does this compile?
System.out.println(nums.size());`,
      solution: `0`,
      hints: ['Upper bounded wildcards are read-only for the parameterized type.', 'You cannot add to List<? extends Number> (except null).', 'The list is empty so size() returns 0.'],
      concepts: ['upper bounded wildcard', 'read-only', 'PECS'],
    },
    {
      id: 'java-gen-17',
      title: 'Predict instanceof with generics',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict what this code prints.',
      skeleton: `Box<String> box = new Box<>("test");
System.out.println(box instanceof Box);
// System.out.println(box instanceof Box<String>); // compile error`,
      solution: `true`,
      hints: ['instanceof checks raw type at runtime.', 'You cannot use parameterized types with instanceof.', 'Box<String> is just Box at runtime.'],
      concepts: ['type erasure', 'instanceof', 'raw type'],
    },
    {
      id: 'java-gen-18',
      title: 'Refactor to use generics',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this Object-based container to use generics for type safety.',
      skeleton: `class Store {
    private Object data;
    public void set(Object data) { this.data = data; }
    public Object get() { return data; }
}
// Usage: String s = (String) store.get();`,
      solution: `class Store<T> {
    private T data;
    public void set(T data) { this.data = data; }
    public T get() { return data; }
}
// Usage: String s = store.get();`,
      hints: ['Add a type parameter to the class.', 'Replace Object with the type parameter.', 'Callers no longer need to cast.'],
      concepts: ['generics', 'type safety', 'refactoring'],
    },
    {
      id: 'java-gen-19',
      title: 'Refactor to use bounded wildcard',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor to accept lists of any Number subtype, not just List<Number>.',
      skeleton: `static double sumAll(List<Number> numbers) {
    double total = 0;
    for (Number n : numbers) {
        total += n.doubleValue();
    }
    return total;
}`,
      solution: `static double sumAll(List<? extends Number> numbers) {
    double total = 0;
    for (Number n : numbers) {
        total += n.doubleValue();
    }
    return total;
}`,
      hints: ['List<Integer> is NOT a subtype of List<Number>.', 'Use an upper bounded wildcard to accept subtypes.', 'Change List<Number> to List<? extends Number>.'],
      concepts: ['bounded wildcard', 'PECS', 'covariance', 'refactoring'],
    },
    {
      id: 'java-gen-20',
      title: 'Generic interface implementation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a generic Transformer interface with a transform method, and a StringToInt class that implements Transformer<String, Integer> using Integer.parseInt.',
      skeleton: '',
      solution: `interface Transformer<I, O> {
    O transform(I input);
}

class StringToInt implements Transformer<String, Integer> {
    @Override
    public Integer transform(String input) {
        return Integer.parseInt(input);
    }
}`,
      hints: ['Define the interface with two type parameters for input and output.', 'The implementing class specifies concrete types.', 'Use Integer.parseInt to convert.'],
      concepts: ['generic interface', 'implementation', 'type parameter binding'],
    },
  ],
};
