import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-capstone',
  title: '50. Capstone',
  explanation: `## Java Capstone

This capstone section combines concepts from across the entire Java learning track. Each exercise integrates multiple topics -- OOP, generics, collections, streams, concurrency, design patterns, functional programming, I/O, and more.

### What to Expect

These exercises simulate real-world scenarios where you must apply several Java concepts together:

- **OOP + Generics**: Designing type-safe class hierarchies
- **Streams + Functional**: Complex data processing pipelines
- **Concurrency + Collections**: Thread-safe data structures and parallel processing
- **Design Patterns + I/O**: Builder, Strategy, Observer with file or network I/O
- **Error Handling + Optional**: Robust, null-safe code
- **Modules + Records + Sealed**: Modern Java features combined

### Tips

- Read the requirements carefully -- each exercise touches multiple concepts
- Think about thread safety when concurrency is involved
- Use generics to keep code type-safe
- Prefer immutability where possible
- Use streams for data transformations, loops for side effects
- Apply design patterns when they simplify the design

Good luck! This is the culmination of your Java journey.`,
  exercises: [
    {
      id: 'java-capstone-1',
      title: 'Generic Repository with Streams',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Complete the generic in-memory repository that supports finding, filtering, and mapping.',
      skeleton: `public class Repository<T> {
    private final List<T> items = new ArrayList<>();

    public void add(T item) { items.add(item); }

    public Optional<T> findFirst(__BLANK__<T> predicate) {
        return items.stream().__BLANK__(predicate).findFirst();
    }

    public List<T> filter(Predicate<T> predicate) {
        return items.__BLANK__().filter(predicate).__BLANK__();
    }

    public <R> List<R> map(__BLANK__<T, R> mapper) {
        return items.stream().map(mapper).toList();
    }
}`,
      solution: `public class Repository<T> {
    private final List<T> items = new ArrayList<>();

    public void add(T item) { items.add(item); }

    public Optional<T> findFirst(Predicate<T> predicate) {
        return items.stream().filter(predicate).findFirst();
    }

    public List<T> filter(Predicate<T> predicate) {
        return items.stream().filter(predicate).toList();
    }

    public <R> List<R> map(Function<T, R> mapper) {
        return items.stream().map(mapper).toList();
    }
}`,
      hints: [
        'findFirst takes a Predicate<T> and uses filter() then findFirst().',
        'filter returns items.stream().filter(predicate).toList().',
        'map takes a Function<T, R> to transform each element.',
      ],
      concepts: ['generics', 'streams', 'predicate', 'function', 'optional'],
    },
    {
      id: 'java-capstone-2',
      title: 'Record with Validation and Builder',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Complete the record with a compact constructor for validation and a static builder method.',
      skeleton: `public __BLANK__ Email(String address) {

    public Email {
        if (address == null || !address.__BLANK__("@")) {
            throw new __BLANK__("Invalid email: " + address);
        }
    }

    public static Email of(String address) {
        return __BLANK__;
    }
}`,
      solution: `public record Email(String address) {

    public Email {
        if (address == null || !address.contains("@")) {
            throw new IllegalArgumentException("Invalid email: " + address);
        }
    }

    public static Email of(String address) {
        return new Email(address);
    }
}`,
      hints: [
        'Records use the "record" keyword.',
        'Use String.contains("@") to check for the @ symbol.',
        'Throw IllegalArgumentException for invalid input.',
      ],
      concepts: ['records', 'compact-constructor', 'validation', 'factory-method'],
    },
    {
      id: 'java-capstone-3',
      title: 'Sealed Hierarchy with Pattern Matching',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Complete the sealed interface and its implementations, then use pattern matching to process them.',
      skeleton: `public __BLANK__ interface Shape permits Circle, Rectangle {
    double area();
}

public __BLANK__ Circle(double radius) implements Shape {
    public double area() { return Math.PI * radius * radius; }
}

public record Rectangle(double width, double height) __BLANK__ Shape {
    public double area() { return width * height; }
}

public static String describe(Shape s) {
    return switch (s) {
        case Circle c -> "Circle with radius " + c.radius();
        case __BLANK__ r -> "Rectangle " + r.width() + "x" + r.height();
    };
}`,
      solution: `public sealed interface Shape permits Circle, Rectangle {
    double area();
}

public record Circle(double radius) implements Shape {
    public double area() { return Math.PI * radius * radius; }
}

public record Rectangle(double width, double height) implements Shape {
    public double area() { return width * height; }
}

public static String describe(Shape s) {
    return switch (s) {
        case Circle c -> "Circle with radius " + c.radius();
        case Rectangle r -> "Rectangle " + r.width() + "x" + r.height();
    };
}`,
      hints: [
        'sealed restricts which classes can implement the interface.',
        'Records implement interfaces with the "implements" keyword.',
        'Pattern matching in switch uses "case TypeName varName ->".',
      ],
      concepts: ['sealed-interface', 'records', 'pattern-matching', 'switch-expression'],
    },
    {
      id: 'java-capstone-4',
      title: 'Observer Pattern with Generics',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Implement a generic EventBus<E> that allows subscribing with Consumer<E> and publishing events to all subscribers.',
      skeleton: `public class EventBus<E> {
    // Store subscribers and implement subscribe() and publish()
}`,
      solution: `public class EventBus<E> {
    private final List<Consumer<E>> subscribers = new CopyOnWriteArrayList<>();

    public void subscribe(Consumer<E> listener) {
        subscribers.add(listener);
    }

    public void unsubscribe(Consumer<E> listener) {
        subscribers.remove(listener);
    }

    public void publish(E event) {
        for (Consumer<E> subscriber : subscribers) {
            subscriber.accept(event);
        }
    }
}`,
      hints: [
        'Use a List<Consumer<E>> to store subscribers.',
        'CopyOnWriteArrayList is thread-safe for concurrent access.',
        'publish iterates subscribers and calls accept(event) on each.',
      ],
      concepts: ['observer-pattern', 'generics', 'consumer', 'thread-safety'],
    },
    {
      id: 'java-capstone-5',
      title: 'Stream Pipeline with Collectors',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Given a list of Transaction(String category, double amount), write a method that returns a Map<String, DoubleSummaryStatistics> grouped by category.',
      skeleton: `public record Transaction(String category, double amount) {}

public Map<String, DoubleSummaryStatistics> summarize(List<Transaction> txns) {
    // Group by category and summarize amounts
}`,
      solution: `public record Transaction(String category, double amount) {}

public Map<String, DoubleSummaryStatistics> summarize(List<Transaction> txns) {
    return txns.stream()
        .collect(Collectors.groupingBy(
            Transaction::category,
            Collectors.summarizingDouble(Transaction::amount)
        ));
}`,
      hints: [
        'Use Collectors.groupingBy with the category as the key.',
        'The downstream collector is Collectors.summarizingDouble().',
        'Transaction::category and Transaction::amount are method references.',
      ],
      concepts: ['streams', 'collectors', 'grouping-by', 'summarizing', 'records'],
    },
    {
      id: 'java-capstone-6',
      title: 'Predict Generic Wildcard Behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict which lines compile and which do not.',
      skeleton: `List<Integer> ints = List.of(1, 2, 3);
List<? extends Number> nums = ints;         // Line A
List<? super Integer> supers = new ArrayList<Number>();  // Line B

Number n = nums.get(0);                     // Line C
// nums.add(42);                            // Line D
supers.add(42);                             // Line E
// Integer i = supers.get(0);              // Line F

System.out.println("Lines A,B,C,E compile. D and F do not.");`,
      solution: `Lines A,B,C,E compile. D and F do not.

Line D: Cannot add to List<? extends Number> (unknown subtype).
Line F: Cannot assign Object to Integer from List<? super Integer> (could be Number or Object).`,
      hints: [
        '? extends Number means "some unknown subtype of Number" -- safe to read as Number.',
        'You cannot add to ? extends (except null) because the actual type is unknown.',
        '? super Integer means "Integer or a supertype" -- safe to add Integer, but get returns Object.',
      ],
      concepts: ['wildcards', 'pecs', 'upper-bounded', 'lower-bounded'],
    },
    {
      id: 'java-capstone-7',
      title: 'Fix the Concurrent Modification',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'This code throws ConcurrentModificationException. Fix it.',
      skeleton: `Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 92);
scores.put("Charlie", 78);

for (Map.Entry<String, Integer> entry : scores.entrySet()) {
    if (entry.getValue() < 80) {
        scores.remove(entry.getKey());
    }
}`,
      solution: `Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 92);
scores.put("Charlie", 78);

scores.entrySet().removeIf(entry -> entry.getValue() < 80);`,
      hints: [
        'Removing from a map while iterating its entrySet causes ConcurrentModificationException.',
        'Use removeIf() on the entrySet(), which safely removes during iteration.',
        'Alternatively, use an Iterator and call iterator.remove().',
      ],
      concepts: ['concurrent-modification', 'removeIf', 'safe-iteration'],
    },
    {
      id: 'java-capstone-8',
      title: 'Strategy Pattern with Functional Interfaces',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Implement a Sorter class that accepts a Comparator strategy and sorts a list. Create three strategies: by name, by age, and by name length.',
      skeleton: `public record Person(String name, int age) {}

// Write a Sorter and three Comparator strategies`,
      solution: `public record Person(String name, int age) {}

public class Sorter {
    public static List<Person> sort(List<Person> people, Comparator<Person> strategy) {
        List<Person> copy = new ArrayList<>(people);
        copy.sort(strategy);
        return copy;
    }

    public static final Comparator<Person> BY_NAME =
        Comparator.comparing(Person::name);

    public static final Comparator<Person> BY_AGE =
        Comparator.comparingInt(Person::age);

    public static final Comparator<Person> BY_NAME_LENGTH =
        Comparator.comparingInt(p -> p.name().length());
}`,
      hints: [
        'Strategy pattern in Java 8+ often uses functional interfaces like Comparator.',
        'Comparator.comparing() takes a key extractor function.',
        'Create three static Comparator<Person> constants.',
      ],
      concepts: ['strategy-pattern', 'comparator', 'functional-interface', 'records'],
    },
    {
      id: 'java-capstone-9',
      title: 'Thread-Safe Singleton with Enum',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Implement a thread-safe singleton using an enum with a ConcurrentHashMap registry.',
      skeleton: `public __BLANK__ ServiceRegistry {
    __BLANK__;

    private final ConcurrentHashMap<String, Object> services = new ConcurrentHashMap<>();

    public void register(String name, Object service) {
        services.__BLANK__(name, service);
    }

    @SuppressWarnings("unchecked")
    public <T> T lookup(String name) {
        return (T) services.__BLANK__(name);
    }
}`,
      solution: `public enum ServiceRegistry {
    INSTANCE;

    private final ConcurrentHashMap<String, Object> services = new ConcurrentHashMap<>();

    public void register(String name, Object service) {
        services.put(name, service);
    }

    @SuppressWarnings("unchecked")
    public <T> T lookup(String name) {
        return (T) services.get(name);
    }
}`,
      hints: [
        'Enum singletons are thread-safe by the JVM specification.',
        'Declare a single enum constant: INSTANCE.',
        'Use put() to register and get() to look up services.',
      ],
      concepts: ['enum-singleton', 'concurrent-hashmap', 'generics', 'thread-safety'],
    },
    {
      id: 'java-capstone-10',
      title: 'Parallel Stream with Reduction',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that processes a large list of orders in parallel: filter by status "COMPLETED", map to their total amounts, and reduce to compute the grand total using a parallel stream with proper identity and combiner.',
      skeleton: `public record Order(String id, String status, double total) {}

public double grandTotal(List<Order> orders) {
    // Use parallel stream: filter completed, reduce totals
}`,
      solution: `public record Order(String id, String status, double total) {}

public double grandTotal(List<Order> orders) {
    return orders.parallelStream()
        .filter(o -> "COMPLETED".equals(o.status()))
        .mapToDouble(Order::total)
        .sum();
}`,
      hints: [
        'Use parallelStream() for parallel processing.',
        'Filter with "COMPLETED".equals() to avoid NullPointerException.',
        'mapToDouble gives a DoubleStream with a sum() terminal operation.',
      ],
      concepts: ['parallel-stream', 'filter', 'mapToDouble', 'reduction'],
    },
    {
      id: 'java-capstone-11',
      title: 'Builder + Immutable + Streams',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write an immutable Query class with a Builder. The Query has a table name, list of selected columns, and an optional where clause. Add a toSQL() method that generates a SQL string using streams.',
      skeleton: `public class Query {
    // Immutable fields: table, columns, where
    // Builder with table(String), select(String...), where(String)
    // toSQL() that generates: SELECT col1, col2 FROM table [WHERE clause]
}`,
      solution: `public class Query {
    private final String table;
    private final List<String> columns;
    private final String where;

    private Query(Builder builder) {
        this.table = builder.table;
        this.columns = List.copyOf(builder.columns);
        this.where = builder.where;
    }

    public String toSQL() {
        String cols = columns.isEmpty() ? "*" : String.join(", ", columns);
        String sql = "SELECT " + cols + " FROM " + table;
        if (where != null && !where.isEmpty()) {
            sql += " WHERE " + where;
        }
        return sql;
    }

    public static class Builder {
        private String table;
        private final List<String> columns = new ArrayList<>();
        private String where;

        public Builder table(String table) { this.table = table; return this; }
        public Builder select(String... cols) {
            columns.addAll(Arrays.asList(cols));
            return this;
        }
        public Builder where(String clause) { this.where = clause; return this; }
        public Query build() {
            if (table == null) throw new IllegalStateException("Table is required");
            return new Query(this);
        }
    }
}`,
      hints: [
        'Make all Query fields final; use List.copyOf for defensive copy.',
        'The Builder accumulates columns in a list; select takes varargs.',
        'toSQL joins columns with ", " or defaults to "*" if empty.',
      ],
      concepts: ['builder-pattern', 'immutability', 'streams', 'varargs'],
    },
    {
      id: 'java-capstone-12',
      title: 'Fix the Race Condition',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'This counter has a race condition in a multi-threaded environment. Fix it using AtomicInteger.',
      skeleton: `public class Counter {
    private int count = 0;

    public void increment() {
        count++;
    }

    public int getCount() {
        return count;
    }
}

// Usage in multiple threads:
Counter c = new Counter();
ExecutorService pool = Executors.newFixedThreadPool(10);
for (int i = 0; i < 10000; i++) {
    pool.submit(() -> c.increment());
}
pool.shutdown();
pool.awaitTermination(10, TimeUnit.SECONDS);
System.out.println(c.getCount()); // Expected: 10000, Actual: less than 10000`,
      solution: `public class Counter {
    private final AtomicInteger count = new AtomicInteger(0);

    public void increment() {
        count.incrementAndGet();
    }

    public int getCount() {
        return count.get();
    }
}`,
      hints: [
        'count++ is not atomic -- it is read-modify-write.',
        'AtomicInteger provides thread-safe atomic operations.',
        'Use incrementAndGet() for atomic increment, get() for reading.',
      ],
      concepts: ['race-condition', 'atomic-integer', 'thread-safety', 'concurrency'],
    },
    {
      id: 'java-capstone-13',
      title: 'Predict Stream Pipeline Result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output of this complex stream pipeline.',
      skeleton: `List<String> words = List.of("banana", "apple", "cherry", "avocado", "blueberry");

String result = words.stream()
    .filter(w -> w.startsWith("a") || w.startsWith("b"))
    .map(String::toUpperCase)
    .sorted()
    .reduce((a, b) -> a + ", " + b)
    .orElse("NONE");

System.out.println(result);`,
      solution: `APPLE, AVOCADO, BANANA, BLUEBERRY`,
      hints: [
        'Filter keeps: banana, apple, avocado, blueberry (starts with a or b).',
        'map to uppercase: BANANA, APPLE, AVOCADO, BLUEBERRY.',
        'sorted: APPLE, AVOCADO, BANANA, BLUEBERRY. reduce joins with ", ".',
      ],
      concepts: ['stream-pipeline', 'filter', 'map', 'sorted', 'reduce'],
    },
    {
      id: 'java-capstone-14',
      title: 'Predict Concurrent Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the guaranteed output of this CompletableFuture chain.',
      skeleton: `CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> "Hello");
CompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> "World");

String result = f1.thenCombine(f2, (a, b) -> a + " " + b).join();
System.out.println(result);`,
      solution: `Hello World`,
      hints: [
        'f1 produces "Hello", f2 produces "World".',
        'thenCombine waits for both and combines with the given BiFunction.',
        'The combiner joins them with a space: "Hello" + " " + "World".',
      ],
      concepts: ['completable-future', 'thenCombine', 'async-composition'],
    },
    {
      id: 'java-capstone-15',
      title: 'Generic Type-Safe Event System',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a type-safe event system where events are dispatched by their Class type. Subscribers register for specific event classes and only receive events of that type.',
      skeleton: `public class TypedEventBus {
    // Map from Class<E> to List<Consumer<E>>
    // subscribe(Class<E>, Consumer<E>)
    // publish(E event) dispatches to subscribers of event.getClass()
}`,
      solution: `public class TypedEventBus {
    private final Map<Class<?>, List<Consumer<?>>> handlers = new ConcurrentHashMap<>();

    @SuppressWarnings("unchecked")
    public <E> void subscribe(Class<E> eventType, Consumer<E> handler) {
        handlers.computeIfAbsent(eventType, k -> new CopyOnWriteArrayList<>())
            .add(handler);
    }

    @SuppressWarnings("unchecked")
    public <E> void publish(E event) {
        List<Consumer<?>> list = handlers.get(event.getClass());
        if (list != null) {
            for (Consumer<?> handler : list) {
                ((Consumer<E>) handler).accept(event);
            }
        }
    }
}`,
      hints: [
        'Use Map<Class<?>, List<Consumer<?>>> with unchecked casts -- type safety comes from subscribe.',
        'computeIfAbsent creates the list on first subscription.',
        'In publish, look up handlers by event.getClass() and cast to Consumer<E>.',
      ],
      concepts: ['type-safe-events', 'generics', 'type-tokens', 'consumer', 'concurrent-map'],
    },
    {
      id: 'java-capstone-16',
      title: 'Pipeline Pattern: Middleware Chain',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Implement a middleware pipeline using Function composition. Each middleware wraps the next handler. Build a pipeline: logging -> authentication -> actual handler.',
      skeleton: `public record Request(String path, String token) {}
public record Response(int status, String body) {}

// A Handler is a Function<Request, Response>
// A Middleware is a Function<Function<Request,Response>, Function<Request,Response>>
// Write logging middleware, auth middleware, and compose them`,
      solution: `public record Request(String path, String token) {}
public record Response(int status, String body) {}

public class Pipeline {
    public static Function<Request, Response> build(
            Function<Request, Response> handler,
            List<Function<Function<Request, Response>, Function<Request, Response>>> middlewares) {
        Function<Request, Response> result = handler;
        for (int i = middlewares.size() - 1; i >= 0; i--) {
            result = middlewares.get(i).apply(result);
        }
        return result;
    }

    public static Function<Function<Request, Response>, Function<Request, Response>> logging() {
        return next -> request -> {
            System.out.println("Request: " + request.path());
            Response response = next.apply(request);
            System.out.println("Response: " + response.status());
            return response;
        };
    }

    public static Function<Function<Request, Response>, Function<Request, Response>> auth() {
        return next -> request -> {
            if (request.token() == null || request.token().isEmpty()) {
                return new Response(401, "Unauthorized");
            }
            return next.apply(request);
        };
    }

    public static void main(String[] args) {
        Function<Request, Response> handler = req ->
            new Response(200, "Hello from " + req.path());

        Function<Request, Response> pipeline = build(handler, List.of(logging(), auth()));
        Response resp = pipeline.apply(new Request("/api", "token123"));
    }
}`,
      hints: [
        'A middleware takes the next handler and returns a wrapped handler.',
        'Apply middlewares in reverse order so the first middleware is outermost.',
        'Logging wraps the call with print statements; auth checks the token before calling next.',
      ],
      concepts: ['middleware', 'function-composition', 'pipeline', 'records', 'higher-order-functions'],
    },
    {
      id: 'java-capstone-17',
      title: 'Fix the Deadlock',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'java',
      goal: 'This code deadlocks because two threads lock resources in different order. Fix it by establishing a consistent lock ordering.',
      skeleton: `public class BankTransfer {
    public void transfer(Account from, Account to, double amount) {
        synchronized (from) {
            synchronized (to) {
                from.debit(amount);
                to.credit(amount);
            }
        }
    }
}

public class Account {
    private final int id;
    private double balance;

    public Account(int id, double balance) {
        this.id = id;
        this.balance = balance;
    }

    public int getId() { return id; }
    public void debit(double amt) { balance -= amt; }
    public void credit(double amt) { balance += amt; }
}

// Thread 1: transfer(A, B, 100)
// Thread 2: transfer(B, A, 50)
// DEADLOCK!`,
      solution: `public class BankTransfer {
    public void transfer(Account from, Account to, double amount) {
        Account first = from.getId() < to.getId() ? from : to;
        Account second = from.getId() < to.getId() ? to : from;

        synchronized (first) {
            synchronized (second) {
                from.debit(amount);
                to.credit(amount);
            }
        }
    }
}

public class Account {
    private final int id;
    private double balance;

    public Account(int id, double balance) {
        this.id = id;
        this.balance = balance;
    }

    public int getId() { return id; }
    public void debit(double amt) { balance -= amt; }
    public void credit(double amt) { balance += amt; }
}`,
      hints: [
        'Deadlock occurs because threads acquire locks in different orders.',
        'Always lock the account with the lower ID first.',
        'Compare account IDs to establish a consistent ordering.',
      ],
      concepts: ['deadlock', 'lock-ordering', 'synchronized', 'concurrency'],
    },
    {
      id: 'java-capstone-18',
      title: 'Refactor to Modern Java',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor this pre-Java-8 code to use records, sealed interfaces, streams, switch expressions, Optional, and var.',
      skeleton: `public abstract class PaymentResult {
    public static class Success extends PaymentResult {
        private final String transactionId;
        private final double amount;
        public Success(String txId, double amount) {
            this.transactionId = txId;
            this.amount = amount;
        }
        public String getTransactionId() { return transactionId; }
        public double getAmount() { return amount; }
    }
    public static class Failure extends PaymentResult {
        private final String reason;
        public Failure(String reason) { this.reason = reason; }
        public String getReason() { return reason; }
    }
}

// Processing:
public String formatResult(PaymentResult result) {
    if (result instanceof PaymentResult.Success) {
        PaymentResult.Success s = (PaymentResult.Success) result;
        return "OK: " + s.getTransactionId() + " $" + s.getAmount();
    } else if (result instanceof PaymentResult.Failure) {
        PaymentResult.Failure f = (PaymentResult.Failure) result;
        return "FAILED: " + f.getReason();
    }
    return "Unknown";
}

public List<String> getSuccessIds(List<PaymentResult> results) {
    List<String> ids = new ArrayList<>();
    for (PaymentResult r : results) {
        if (r instanceof PaymentResult.Success) {
            ids.add(((PaymentResult.Success) r).getTransactionId());
        }
    }
    return ids;
}`,
      solution: `public sealed interface PaymentResult permits Success, Failure {}
public record Success(String transactionId, double amount) implements PaymentResult {}
public record Failure(String reason) implements PaymentResult {}

public String formatResult(PaymentResult result) {
    return switch (result) {
        case Success s -> "OK: " + s.transactionId() + " $" + s.amount();
        case Failure f -> "FAILED: " + f.reason();
    };
}

public List<String> getSuccessIds(List<PaymentResult> results) {
    return results.stream()
        .filter(r -> r instanceof Success)
        .map(r -> ((Success) r).transactionId())
        .toList();
}`,
      hints: [
        'Replace abstract class with sealed interface, subclasses with records.',
        'Use switch expression with pattern matching instead of instanceof chains.',
        'Replace the loop with a stream pipeline: filter, map, toList.',
      ],
      concepts: ['sealed-interface', 'records', 'pattern-matching', 'switch-expression', 'streams'],
    },
    {
      id: 'java-capstone-19',
      title: 'Async Pipeline with CompletableFuture',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write an async processing pipeline: fetch user by ID (async), then fetch their orders (async), then calculate total. Handle errors with exceptionally(). Return CompletableFuture<Double>.',
      skeleton: `public record User(String id, String name) {}
public record Order(String userId, double amount) {}

// Given:
// CompletableFuture<User> fetchUser(String id)
// CompletableFuture<List<Order>> fetchOrders(String userId)

public CompletableFuture<Double> getUserTotal(String userId) {
    // Chain: fetchUser -> fetchOrders -> sum amounts
    // On error, return 0.0
}`,
      solution: `public CompletableFuture<Double> getUserTotal(String userId) {
    return fetchUser(userId)
        .thenCompose(user -> fetchOrders(user.id()))
        .thenApply(orders -> orders.stream()
            .mapToDouble(Order::amount)
            .sum())
        .exceptionally(ex -> {
            System.err.println("Error: " + ex.getMessage());
            return 0.0;
        });
}`,
      hints: [
        'Use thenCompose for chaining async calls (flatMap for futures).',
        'Use thenApply to transform the result synchronously (sum the orders).',
        'exceptionally catches any error in the chain and provides a fallback.',
      ],
      concepts: ['completable-future', 'thenCompose', 'thenApply', 'exceptionally', 'async-pipeline'],
    },
    {
      id: 'java-capstone-20',
      title: 'Refactor Monolith to Modular Design',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor this monolithic class into separate concerns: a generic Repository<T>, a Service layer with business logic, and a Formatter using Strategy pattern. Use generics, streams, Optional, and functional interfaces.',
      skeleton: `public class UserManager {
    private List<String[]> users = new ArrayList<>(); // [name, email, role]

    public void addUser(String name, String email, String role) {
        users.add(new String[]{name, email, role});
    }

    public String[] findByEmail(String email) {
        for (String[] u : users) {
            if (u[1].equals(email)) return u;
        }
        return null;
    }

    public List<String[]> getAdmins() {
        List<String[]> admins = new ArrayList<>();
        for (String[] u : users) {
            if (u[2].equals("admin")) admins.add(u);
        }
        return admins;
    }

    public String formatUser(String[] user, String format) {
        if (format.equals("csv")) {
            return user[0] + "," + user[1] + "," + user[2];
        } else {
            return user[0] + " <" + user[1] + "> (" + user[2] + ")";
        }
    }
}`,
      solution: `// Domain model
public record User(String name, String email, String role) {}

// Generic Repository
public class Repository<T> {
    private final List<T> items = new ArrayList<>();

    public void add(T item) { items.add(item); }

    public Optional<T> findFirst(Predicate<T> predicate) {
        return items.stream().filter(predicate).findFirst();
    }

    public List<T> findAll(Predicate<T> predicate) {
        return items.stream().filter(predicate).toList();
    }

    public List<T> getAll() { return List.copyOf(items); }
}

// Service layer
public class UserService {
    private final Repository<User> repo = new Repository<>();

    public void addUser(String name, String email, String role) {
        repo.add(new User(name, email, role));
    }

    public Optional<User> findByEmail(String email) {
        return repo.findFirst(u -> u.email().equals(email));
    }

    public List<User> getAdmins() {
        return repo.findAll(u -> "admin".equals(u.role()));
    }
}

// Formatter with Strategy pattern
@FunctionalInterface
interface UserFormatter {
    String format(User user);
}

class Formatters {
    static final UserFormatter CSV =
        u -> u.name() + "," + u.email() + "," + u.role();

    static final UserFormatter DISPLAY =
        u -> u.name() + " <" + u.email() + "> (" + u.role() + ")";
}`,
      hints: [
        'Replace String[] with a User record for type safety.',
        'Extract a generic Repository<T> with predicate-based find methods.',
        'Use a functional interface for formatting strategies instead of if-else.',
      ],
      concepts: ['refactoring', 'records', 'generics', 'repository-pattern', 'strategy-pattern', 'optional', 'streams'],
    },
  ],
};
