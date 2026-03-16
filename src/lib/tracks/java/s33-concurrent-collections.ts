import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-concurrent-collections',
  title: '33. Concurrent Collections',
  explanation: `## Concurrent Collections

Thread-safe collection implementations from java.util.concurrent.

### ConcurrentHashMap
\`\`\`java
ConcurrentMap<String, Integer> map = new ConcurrentHashMap<>();
map.putIfAbsent("key", 0);
map.compute("key", (k, v) -> v + 1); // atomic
\`\`\`

### CopyOnWriteArrayList
Read-heavy, write-rare list. Writes copy the entire internal array.

### BlockingQueue
\`\`\`java
BlockingQueue<Task> queue = new LinkedBlockingQueue<>(100);
queue.put(task);   // blocks if full
queue.take();      // blocks if empty
queue.offer(task, 1, TimeUnit.SECONDS);
\`\`\`

### ConcurrentLinkedQueue
Lock-free, non-blocking FIFO queue.

### Atomic Types
\`\`\`java
AtomicInteger, AtomicLong, AtomicReference
AtomicInteger counter = new AtomicInteger(0);
counter.incrementAndGet();
counter.compareAndSet(expected, newValue);
\`\`\`

### When to Use What
- High-read/low-write map -> ConcurrentHashMap
- Iterator-safe list -> CopyOnWriteArrayList
- Producer/consumer -> BlockingQueue
- Simple counters -> Atomic types
`,
  exercises: [
    {
      id: 'java-conc-1',
      title: 'Create ConcurrentHashMap',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create a thread-safe map.',
      skeleton: `ConcurrentMap<String, Integer> map = new __BLANK__<>();`,
      solution: `ConcurrentMap<String, Integer> map = new ConcurrentHashMap<>();`,
      hints: ['The concurrent implementation of Map.', 'High-performance thread-safe map.', 'Use `ConcurrentHashMap`.'],
      concepts: ['ConcurrentHashMap', 'thread-safe map', 'ConcurrentMap'],
    },
    {
      id: 'java-conc-2',
      title: 'Atomic increment in map',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Atomically increment a counter in a ConcurrentHashMap.',
      skeleton: `map.__BLANK__("hits", 1, Integer::sum);`,
      solution: `map.merge("hits", 1, Integer::sum);`,
      hints: ['This method atomically merges values.', 'If key absent, uses new value; if present, applies function.', 'Use `merge`.'],
      concepts: ['merge', 'atomic operation', 'ConcurrentHashMap'],
    },
    {
      id: 'java-conc-3',
      title: 'BlockingQueue put',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Add an element to a blocking queue, waiting if full.',
      skeleton: `BlockingQueue<String> queue = new LinkedBlockingQueue<>(10);
queue.__BLANK__("item"); // blocks if queue is full`,
      solution: `BlockingQueue<String> queue = new LinkedBlockingQueue<>(10);
queue.put("item");`,
      hints: ['This method blocks until space is available.', 'Different from add() which throws on full.', 'Use `put`.'],
      concepts: ['BlockingQueue.put', 'blocking', 'bounded queue'],
    },
    {
      id: 'java-conc-4',
      title: 'BlockingQueue take',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Retrieve and remove an element, waiting if empty.',
      skeleton: `String item = queue.__BLANK__(); // blocks if empty`,
      solution: `String item = queue.take();`,
      hints: ['This method blocks until an element is available.', 'Different from poll() which returns null.', 'Use `take`.'],
      concepts: ['BlockingQueue.take', 'blocking', 'consumer'],
    },
    {
      id: 'java-conc-5',
      title: 'AtomicInteger compareAndSet',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Atomically update a value if it matches the expected value.',
      skeleton: `AtomicInteger ai = new AtomicInteger(5);
boolean updated = ai.__BLANK__(5, 10);`,
      solution: `AtomicInteger ai = new AtomicInteger(5);
boolean updated = ai.compareAndSet(5, 10);`,
      hints: ['CAS is the foundation of lock-free programming.', 'Updates only if current value equals expected.', 'Use `compareAndSet`.'],
      concepts: ['compareAndSet', 'CAS', 'atomic update'],
    },
    {
      id: 'java-conc-6',
      title: 'CopyOnWriteArrayList creation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create a thread-safe list for read-heavy workloads.',
      skeleton: `List<String> list = new __BLANK__<>();`,
      solution: `List<String> list = new CopyOnWriteArrayList<>();`,
      hints: ['This list copies the array on every write.', 'Ideal for read-heavy, write-rare scenarios.', 'Use `CopyOnWriteArrayList`.'],
      concepts: ['CopyOnWriteArrayList', 'thread-safe list', 'snapshot iteration'],
    },
    {
      id: 'java-conc-7',
      title: 'Thread-safe word counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a thread-safe word frequency counter using ConcurrentHashMap.',
      skeleton: '',
      solution: `class WordCounter {
    private final ConcurrentMap<String, AtomicInteger> counts = new ConcurrentHashMap<>();

    public void count(String word) {
        counts.computeIfAbsent(word, k -> new AtomicInteger(0)).incrementAndGet();
    }

    public int getCount(String word) {
        AtomicInteger count = counts.get(word);
        return count != null ? count.get() : 0;
    }

    public Map<String, Integer> snapshot() {
        Map<String, Integer> result = new HashMap<>();
        counts.forEach((k, v) -> result.put(k, v.get()));
        return result;
    }
}`,
      hints: ['Use computeIfAbsent to create AtomicInteger lazily.', 'AtomicInteger.incrementAndGet is thread-safe.', 'ConcurrentHashMap handles concurrent access.'],
      concepts: ['ConcurrentHashMap', 'AtomicInteger', 'thread-safe counter'],
    },
    {
      id: 'java-conc-8',
      title: 'Producer-consumer with BlockingQueue',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write producer and consumer Runnables using a BlockingQueue.',
      skeleton: '',
      solution: `static void producerConsumer() {
    BlockingQueue<String> queue = new LinkedBlockingQueue<>(10);

    Runnable producer = () -> {
        try {
            for (int i = 0; i < 100; i++) {
                queue.put("item-" + i);
            }
            queue.put("DONE");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    };

    Runnable consumer = () -> {
        try {
            while (true) {
                String item = queue.take();
                if ("DONE".equals(item)) break;
                System.out.println("Consumed: " + item);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    };

    new Thread(producer).start();
    new Thread(consumer).start();
}`,
      hints: ['Producer uses put() to add items.', 'Consumer uses take() to retrieve items.', 'Use a sentinel value to signal completion.'],
      concepts: ['producer-consumer', 'BlockingQueue', 'sentinel value'],
    },
    {
      id: 'java-conc-9',
      title: 'Atomic reference CAS pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a lock-free stack using AtomicReference and CAS.',
      skeleton: '',
      solution: `class LockFreeStack<T> {
    private static class Node<T> {
        final T value;
        final Node<T> next;
        Node(T value, Node<T> next) { this.value = value; this.next = next; }
    }

    private final java.util.concurrent.atomic.AtomicReference<Node<T>> top = new java.util.concurrent.atomic.AtomicReference<>();

    public void push(T value) {
        Node<T> newNode;
        Node<T> current;
        do {
            current = top.get();
            newNode = new Node<>(value, current);
        } while (!top.compareAndSet(current, newNode));
    }

    public T pop() {
        Node<T> current;
        do {
            current = top.get();
            if (current == null) return null;
        } while (!top.compareAndSet(current, current.next));
        return current.value;
    }
}`,
      hints: ['Use AtomicReference for the top node.', 'CAS loop: read current, compute new, attempt swap.', 'Retry if another thread modified top.'],
      concepts: ['AtomicReference', 'CAS loop', 'lock-free stack'],
    },
    {
      id: 'java-conc-10',
      title: 'ConcurrentHashMap compute',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that atomically updates a value in a ConcurrentHashMap using compute.',
      skeleton: '',
      solution: `static void atomicUpdate(ConcurrentMap<String, List<String>> map, String key, String value) {
    map.compute(key, (k, existing) -> {
        List<String> list = existing != null ? new ArrayList<>(existing) : new ArrayList<>();
        list.add(value);
        return list;
    });
}`,
      hints: ['compute() atomically remaps the value.', 'The function receives the key and current value.', 'Return the new value (or null to remove).'],
      concepts: ['compute', 'atomic update', 'ConcurrentHashMap'],
    },
    {
      id: 'java-conc-11',
      title: 'Thread-safe event bus',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a simple thread-safe event bus using CopyOnWriteArrayList for listeners.',
      skeleton: '',
      solution: `class EventBus<T> {
    private final List<java.util.function.Consumer<T>> listeners = new CopyOnWriteArrayList<>();

    public void subscribe(java.util.function.Consumer<T> listener) {
        listeners.add(listener);
    }

    public void unsubscribe(java.util.function.Consumer<T> listener) {
        listeners.remove(listener);
    }

    public void publish(T event) {
        for (java.util.function.Consumer<T> listener : listeners) {
            listener.accept(event);
        }
    }
}`,
      hints: ['CopyOnWriteArrayList is safe for iteration during modification.', 'Publish iterates without locking.', 'Subscribe/unsubscribe modify the list safely.'],
      concepts: ['CopyOnWriteArrayList', 'event bus', 'observer pattern'],
    },
    {
      id: 'java-conc-12',
      title: 'Deque as work-stealing queue',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write code using ConcurrentLinkedDeque for a work-stealing pattern where workers take from the front and steal from the back.',
      skeleton: '',
      solution: `class WorkQueue<T> {
    private final java.util.concurrent.ConcurrentLinkedDeque<T> deque = new java.util.concurrent.ConcurrentLinkedDeque<>();

    public void addWork(T task) {
        deque.addFirst(task);
    }

    public T takeWork() {
        return deque.pollFirst();
    }

    public T stealWork() {
        return deque.pollLast();
    }

    public boolean isEmpty() {
        return deque.isEmpty();
    }
}`,
      hints: ['ConcurrentLinkedDeque is thread-safe and lock-free.', 'addFirst/pollFirst for normal work.', 'pollLast for work stealing from other threads.'],
      concepts: ['ConcurrentLinkedDeque', 'work stealing', 'deque'],
    },
    {
      id: 'java-conc-13',
      title: 'Collections.synchronizedMap pitfall',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the race condition in the compound operation on a synchronized map.',
      skeleton: `Map<String, Integer> map = Collections.synchronizedMap(new HashMap<>());
// Race condition: check-then-act is not atomic
if (!map.containsKey("count")) {
    map.put("count", 0);
}
map.put("count", map.get("count") + 1);`,
      solution: `ConcurrentMap<String, Integer> map = new ConcurrentHashMap<>();
map.merge("count", 1, Integer::sum);`,
      hints: ['synchronizedMap only synchronizes individual operations.', 'Compound operations need ConcurrentHashMap.', 'merge is atomic and handles both creation and update.'],
      concepts: ['compound operation', 'ConcurrentHashMap', 'atomic merge'],
    },
    {
      id: 'java-conc-14',
      title: 'HashMap in multithreaded code',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the non-thread-safe HashMap used by multiple threads.',
      skeleton: `Map<String, String> cache = new HashMap<>(); // not thread-safe
// Multiple threads call:
cache.put(key, value);
String v = cache.get(key);`,
      solution: `ConcurrentMap<String, String> cache = new ConcurrentHashMap<>();
cache.put(key, value);
String v = cache.get(key);`,
      hints: ['HashMap is not thread-safe.', 'Concurrent access can corrupt internal state.', 'Use ConcurrentHashMap instead.'],
      concepts: ['ConcurrentHashMap', 'thread safety', 'HashMap corruption'],
    },
    {
      id: 'java-conc-15',
      title: 'ConcurrentModification during forEach',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the code that modifies a ConcurrentHashMap during forEach.',
      skeleton: `ConcurrentMap<String, Integer> map = new ConcurrentHashMap<>();
map.put("a", 1); map.put("b", 2); map.put("c", 3);
map.forEach((key, value) -> {
    if (value < 2) map.remove(key); // May cause issues
});`,
      solution: `ConcurrentMap<String, Integer> map = new ConcurrentHashMap<>();
map.put("a", 1); map.put("b", 2); map.put("c", 3);
map.entrySet().removeIf(entry -> entry.getValue() < 2);`,
      hints: ['Modifying during forEach is unpredictable.', 'Use removeIf on the entrySet instead.', 'removeIf is thread-safe on ConcurrentHashMap.'],
      concepts: ['removeIf', 'safe removal', 'ConcurrentHashMap'],
    },
    {
      id: 'java-conc-16',
      title: 'Predict AtomicInteger operations',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the results of AtomicInteger operations.',
      skeleton: `AtomicInteger ai = new AtomicInteger(10);
System.out.println(ai.getAndIncrement());
System.out.println(ai.incrementAndGet());
System.out.println(ai.get());`,
      solution: `10
12
12`,
      hints: ['getAndIncrement returns old value (10), then increments to 11.', 'incrementAndGet increments to 12, then returns new value.', 'Final value is 12.'],
      concepts: ['getAndIncrement', 'incrementAndGet', 'AtomicInteger'],
    },
    {
      id: 'java-conc-17',
      title: 'Predict ConcurrentHashMap putIfAbsent',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the behavior of putIfAbsent.',
      skeleton: `ConcurrentMap<String, String> map = new ConcurrentHashMap<>();
System.out.println(map.putIfAbsent("a", "first"));
System.out.println(map.putIfAbsent("a", "second"));
System.out.println(map.get("a"));`,
      solution: `null
first
first`,
      hints: ['putIfAbsent returns the existing value or null.', 'First call: key absent, returns null, sets "first".', 'Second call: key present, returns "first", does not overwrite.'],
      concepts: ['putIfAbsent', 'atomic insert', 'ConcurrentHashMap'],
    },
    {
      id: 'java-conc-18',
      title: 'Predict BlockingQueue offer',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict offer behavior on a full queue.',
      skeleton: `BlockingQueue<Integer> q = new ArrayBlockingQueue<>(2);
System.out.println(q.offer(1));
System.out.println(q.offer(2));
System.out.println(q.offer(3)); // queue is full
System.out.println(q.size());`,
      solution: `true
true
false
2`,
      hints: ['offer returns false if queue is full (non-blocking).', 'Queue capacity is 2.', 'Third offer fails, size remains 2.'],
      concepts: ['offer', 'bounded queue', 'non-blocking'],
    },
    {
      id: 'java-conc-19',
      title: 'Refactor to ConcurrentHashMap',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this synchronized HashMap to ConcurrentHashMap.',
      skeleton: `private final Map<String, Integer> map = new HashMap<>();
private final Object lock = new Object();

void increment(String key) {
    synchronized (lock) {
        map.put(key, map.getOrDefault(key, 0) + 1);
    }
}

int get(String key) {
    synchronized (lock) {
        return map.getOrDefault(key, 0);
    }
}`,
      solution: `private final ConcurrentMap<String, Integer> map = new ConcurrentHashMap<>();

void increment(String key) {
    map.merge(key, 1, Integer::sum);
}

int get(String key) {
    return map.getOrDefault(key, 0);
}`,
      hints: ['ConcurrentHashMap eliminates the need for external synchronization.', 'merge provides atomic compound operations.', 'No lock object needed.'],
      concepts: ['ConcurrentHashMap', 'merge', 'lock elimination'],
    },
    {
      id: 'java-conc-20',
      title: 'Refactor polling to BlockingQueue',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this busy-wait polling loop to use BlockingQueue.',
      skeleton: `Queue<String> queue = new LinkedList<>();
// Consumer busy-waits:
while (true) {
    String item;
    synchronized (queue) {
        item = queue.poll();
    }
    if (item != null) {
        process(item);
    } else {
        Thread.sleep(10); // wasteful polling
    }
}`,
      solution: `BlockingQueue<String> queue = new LinkedBlockingQueue<>();
while (true) {
    String item = queue.take(); // blocks efficiently
    process(item);
}`,
      hints: ['BlockingQueue.take() blocks efficiently until an item is available.', 'No busy-waiting or sleep needed.', 'The thread is put to sleep by the OS until signaled.'],
      concepts: ['BlockingQueue', 'blocking vs polling', 'efficient waiting'],
    },
  ],
};
