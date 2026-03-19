import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-iterators',
  title: '20. Iterators & Iterable',
  explanation: `## Iterators & Iterable

Iterators provide a standard way to traverse collections.

### Iterator Interface
\`\`\`java
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String item = it.next();
    if (shouldRemove(item)) it.remove();
}
\`\`\`

### Iterable Interface
Any class implementing \`Iterable<T>\` can be used in enhanced for-loops:
\`\`\`java
class NumberRange implements Iterable<Integer> {
    int start, end;
    public Iterator<Integer> iterator() { ... }
}
for (int n : new NumberRange(1, 10)) { ... }
\`\`\`

### ListIterator
Bidirectional iterator for Lists: \`hasPrevious()\`, \`previous()\`, \`set()\`, \`add()\`.

### Spliterator
Designed for parallel traversal, used internally by streams.

### for-each Loop
Syntactic sugar over Iterator:
\`\`\`java
for (String s : collection) { ... }
// compiles to Iterator-based loop
\`\`\`
`,
  exercises: [
    {
      id: 'java-iter-1',
      title: 'Get an iterator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Obtain an iterator from a list.',
      skeleton: `Iterator<String> it = list.__BLANK__();`,
      solution: `Iterator<String> it = list.iterator();`,
      hints: ['All Collections implement Iterable.', 'Iterable has a method that returns an Iterator.', 'Use `iterator`.'],
      concepts: ['iterator()', 'Iterable', 'Collection'],
    },
    {
      id: 'java-iter-2',
      title: 'Check for next element',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Check if the iterator has more elements.',
      skeleton: `while (it.__BLANK__()) {
    System.out.println(it.next());
}`,
      solution: `while (it.hasNext()) {
    System.out.println(it.next());
}`,
      hints: ['Iterator has a method to check for remaining elements.', 'It returns a boolean.', 'Use `hasNext`.'],
      concepts: ['hasNext', 'Iterator', 'traversal'],
    },
    {
      id: 'java-iter-3',
      title: 'Remove during iteration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Safely remove the current element during iteration.',
      skeleton: `Iterator<String> it = list.iterator();
while (it.hasNext()) {
    if (it.next().isEmpty()) {
        it.__BLANK__();
    }
}`,
      solution: `Iterator<String> it = list.iterator();
while (it.hasNext()) {
    if (it.next().isEmpty()) {
        it.remove();
    }
}`,
      hints: ['Iterator has a method for safe removal.', 'It removes the last element returned by next().', 'Use `remove`.'],
      concepts: ['Iterator.remove', 'safe removal', 'traversal'],
    },
    {
      id: 'java-iter-4',
      title: 'ListIterator previous',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Get a ListIterator and traverse backwards.',
      skeleton: `ListIterator<String> lit = list.listIterator(list.size());
while (lit.__BLANK__()) {
    System.out.println(lit.previous());
}`,
      solution: `ListIterator<String> lit = list.listIterator(list.size());
while (lit.hasPrevious()) {
    System.out.println(lit.previous());
}`,
      hints: ['ListIterator can go backwards.', 'Check if there is a previous element.', 'Use `hasPrevious`.'],
      concepts: ['ListIterator', 'hasPrevious', 'reverse traversal'],
    },
    {
      id: 'java-iter-5',
      title: 'Implement Iterable interface',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Make a class usable in for-each loops.',
      skeleton: `class Range implements __BLANK__ {
    // ...
    public Iterator<Integer> iterator() { return new RangeIterator(); }
}`,
      solution: `class Range implements Iterable<Integer> {
    // ...
    public Iterator<Integer> iterator() { return new RangeIterator(); }
}`,
      hints: ['For-each loops require the Iterable interface.', 'It is a generic interface.', 'Use `Iterable<Integer>`.'],
      concepts: ['Iterable', 'for-each', 'interface implementation'],
    },
    {
      id: 'java-iter-6',
      title: 'forEachRemaining',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Process all remaining elements with a lambda.',
      skeleton: `Iterator<String> it = list.iterator();
it.__BLANK__(item -> System.out.println(item));`,
      solution: `Iterator<String> it = list.iterator();
it.forEachRemaining(item -> System.out.println(item));`,
      hints: ['Iterator has a default method for bulk processing.', 'It takes a Consumer lambda.', 'Use `forEachRemaining`.'],
      concepts: ['forEachRemaining', 'Consumer', 'lambda'],
    },
    {
      id: 'java-iter-7',
      title: 'Custom range iterator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a class that implements Iterable<Integer> to iterate over a range from start (inclusive) to end (exclusive).',
      skeleton: '',
      solution: `class Range implements Iterable<Integer> {
    private final int start;
    private final int end;

    public Range(int start, int end) {
        this.start = start;
        this.end = end;
    }

    @Override
    public Iterator<Integer> iterator() {
        return new Iterator<Integer>() {
            private int current = start;

            @Override
            public boolean hasNext() {
                return current < end;
            }

            @Override
            public Integer next() {
                if (!hasNext()) throw new java.util.NoSuchElementException();
                return current++;
            }
        };
    }
}`,
      hints: ['Implement Iterable<Integer> on the class.', 'Return an anonymous Iterator from the iterator() method.', 'Track the current position in the anonymous class.'],
      concepts: ['Iterable', 'Iterator', 'anonymous class', 'range'],
    },
    {
      id: 'java-iter-8',
      title: 'Filtered iterator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a FilterIterator that wraps another Iterator and only returns elements matching a Predicate.',
      skeleton: '',
      solution: `class FilterIterator<T> implements Iterator<T> {
    private final Iterator<T> source;
    private final java.util.function.Predicate<T> predicate;
    private T nextItem;
    private boolean hasNext;

    public FilterIterator(Iterator<T> source, java.util.function.Predicate<T> predicate) {
        this.source = source;
        this.predicate = predicate;
        advance();
    }

    private void advance() {
        hasNext = false;
        while (source.hasNext()) {
            T item = source.next();
            if (predicate.test(item)) {
                nextItem = item;
                hasNext = true;
                return;
            }
        }
    }

    @Override
    public boolean hasNext() {
        return hasNext;
    }

    @Override
    public T next() {
        if (!hasNext) throw new java.util.NoSuchElementException();
        T result = nextItem;
        advance();
        return result;
    }
}`,
      hints: ['Pre-compute the next matching element.', 'Use an advance() method to skip non-matching elements.', 'Call advance() in the constructor and after each next().'],
      concepts: ['decorator pattern', 'Predicate', 'Iterator wrapper'],
    },
    {
      id: 'java-iter-9',
      title: 'Concatenating iterators',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method that concatenates two iterators into one that iterates the first then the second.',
      skeleton: '',
      solution: `static <T> Iterator<T> concat(Iterator<T> a, Iterator<T> b) {
    return new Iterator<T>() {
        @Override
        public boolean hasNext() {
            return a.hasNext() || b.hasNext();
        }

        @Override
        public T next() {
            if (a.hasNext()) return a.next();
            if (b.hasNext()) return b.next();
            throw new java.util.NoSuchElementException();
        }
    };
}`,
      hints: ['Return a new Iterator that delegates to a first, then b.', 'hasNext is true if either has elements.', 'next reads from a until exhausted, then from b.'],
      concepts: ['Iterator composition', 'delegation', 'anonymous class'],
    },
    {
      id: 'java-iter-10',
      title: 'Cyclic iterator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a CyclicIterator that repeats through a list indefinitely (hasNext always returns true).',
      skeleton: '',
      solution: `class CyclicIterator<T> implements Iterator<T> {
    private final List<T> list;
    private int index;

    public CyclicIterator(List<T> list) {
        if (list.isEmpty()) throw new IllegalArgumentException("List must not be empty");
        this.list = list;
        this.index = 0;
    }

    @Override
    public boolean hasNext() {
        return true;
    }

    @Override
    public T next() {
        T item = list.get(index);
        index = (index + 1) % list.size();
        return item;
    }
}`,
      hints: ['hasNext always returns true for infinite cycling.', 'Use modulo to wrap around the index.', 'Store the list and current index as fields.'],
      concepts: ['infinite iterator', 'modulo wrapping', 'cyclic traversal'],
    },
    {
      id: 'java-iter-11',
      title: 'Iterator to list conversion',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method that collects all elements from an Iterator into a List.',
      skeleton: '',
      solution: `static <T> List<T> toList(Iterator<T> iterator) {
    List<T> list = new ArrayList<>();
    iterator.forEachRemaining(list::add);
    return list;
}`,
      hints: ['Use forEachRemaining to consume all elements.', 'list::add is a method reference for the Consumer.', 'Create an ArrayList and populate it.'],
      concepts: ['forEachRemaining', 'method reference', 'conversion'],
    },
    {
      id: 'java-iter-12',
      title: 'Peek iterator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a PeekIterator wrapper that adds a peek() method to look at the next element without consuming it.',
      skeleton: '',
      solution: `class PeekIterator<T> implements Iterator<T> {
    private final Iterator<T> source;
    private T peeked;
    private boolean hasPeeked;

    public PeekIterator(Iterator<T> source) {
        this.source = source;
    }

    public T peek() {
        if (!hasPeeked) {
            peeked = source.next();
            hasPeeked = true;
        }
        return peeked;
    }

    @Override
    public boolean hasNext() {
        return hasPeeked || source.hasNext();
    }

    @Override
    public T next() {
        if (hasPeeked) {
            hasPeeked = false;
            return peeked;
        }
        return source.next();
    }
}`,
      hints: ['Buffer one element ahead when peek is called.', 'Track whether an element has been peeked with a boolean.', 'Return the buffered element on the next call to next().'],
      concepts: ['decorator pattern', 'lookahead', 'buffering'],
    },
    {
      id: 'java-iter-13',
      title: 'NoSuchElementException',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the iterator usage that throws NoSuchElementException.',
      skeleton: `Iterator<String> it = list.iterator();
while (true) {
    System.out.println(it.next()); // NoSuchElementException at end
}`,
      solution: `Iterator<String> it = list.iterator();
while (it.hasNext()) {
    System.out.println(it.next());
}`,
      hints: ['Calling next() when no elements remain throws an exception.', 'Always check hasNext() before calling next().', 'Replace true with it.hasNext().'],
      concepts: ['NoSuchElementException', 'hasNext', 'Iterator protocol'],
    },
    {
      id: 'java-iter-14',
      title: 'Double next() call bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the bug that skips elements by calling next() twice per iteration.',
      skeleton: `Iterator<Integer> it = numbers.iterator();
while (it.hasNext()) {
    if (it.next() > 10) {
        System.out.println(it.next()); // Bug: skips element and may throw
    }
}`,
      solution: `Iterator<Integer> it = numbers.iterator();
while (it.hasNext()) {
    int value = it.next();
    if (value > 10) {
        System.out.println(value);
    }
}`,
      hints: ['Each call to next() advances the iterator.', 'Store the result of next() in a variable.', 'Use the variable for both the check and the print.'],
      concepts: ['Iterator state', 'next() side effect', 'variable capture'],
    },
    {
      id: 'java-iter-15',
      title: 'IllegalStateException on remove',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the code that calls remove() without calling next() first.',
      skeleton: `Iterator<String> it = list.iterator();
it.remove(); // IllegalStateException: next() not called`,
      solution: `Iterator<String> it = list.iterator();
if (it.hasNext()) {
    it.next();
    it.remove();
}`,
      hints: ['remove() can only be called after next().', 'Call next() first to position the iterator.', 'Check hasNext() before calling next().'],
      concepts: ['IllegalStateException', 'Iterator.remove', 'protocol'],
    },
    {
      id: 'java-iter-16',
      title: 'Predict iterator traversal',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output of this iterator traversal.',
      skeleton: `List<Integer> nums = List.of(10, 20, 30);
Iterator<Integer> it = nums.iterator();
System.out.println(it.next());
System.out.println(it.next());
System.out.println(it.hasNext());`,
      solution: `10
20
true`,
      hints: ['next() returns elements in order.', 'First call returns 10, second returns 20.', 'There is still one element (30) remaining.'],
      concepts: ['Iterator', 'next()', 'hasNext()'],
    },
    {
      id: 'java-iter-17',
      title: 'Predict ListIterator set',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output after using ListIterator.set().',
      skeleton: `List<String> list = new ArrayList<>(List.of("A", "B", "C"));
ListIterator<String> lit = list.listIterator();
lit.next();
lit.set("X");
System.out.println(list);`,
      solution: `[X, B, C]`,
      hints: ['next() returns "A" and positions the cursor after it.', 'set() replaces the last element returned by next().', '"A" is replaced with "X".'],
      concepts: ['ListIterator.set', 'replacement', 'cursor position'],
    },
    {
      id: 'java-iter-18',
      title: 'Predict for-each with Iterable',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output of a custom Iterable in a for-each loop.',
      skeleton: `// Assume Range(1, 4) iterates: 1, 2, 3
int sum = 0;
for (int n : new Range(1, 4)) {
    sum += n;
}
System.out.println(sum);`,
      solution: `6`,
      hints: ['Range(1, 4) produces 1, 2, 3 (end exclusive).', 'Sum = 1 + 2 + 3.', 'The total is 6.'],
      concepts: ['Iterable', 'for-each', 'custom class'],
    },
    {
      id: 'java-iter-19',
      title: 'Refactor to for-each',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Refactor this explicit iterator loop to a for-each loop.',
      skeleton: `Iterator<String> it = names.iterator();
while (it.hasNext()) {
    String name = it.next();
    System.out.println(name);
}`,
      solution: `for (String name : names) {
    System.out.println(name);
}`,
      hints: ['The for-each loop is syntactic sugar for Iterator.', 'It works on any Iterable.', 'Use for (Type var : collection) syntax.'],
      concepts: ['for-each', 'syntactic sugar', 'refactoring'],
    },
    {
      id: 'java-iter-20',
      title: 'Refactor to forEachRemaining',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this while loop to use forEachRemaining with a method reference.',
      skeleton: `Iterator<String> it = list.iterator();
while (it.hasNext()) {
    System.out.println(it.next());
}`,
      solution: `Iterator<String> it = list.iterator();
it.forEachRemaining(System.out::println);`,
      hints: ['forEachRemaining consumes all remaining elements.', 'It takes a Consumer, which can be a method reference.', 'System.out::println is a method reference.'],
      concepts: ['forEachRemaining', 'method reference', 'refactoring'],
    },
  ],
};
