import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-observer',
  title: '43. Observer Pattern',
  explanation: `## Observer Pattern in Java

The **Observer** pattern defines a one-to-many dependency between objects so that when one object (the **subject**) changes state, all its dependents (**observers**) are notified and updated automatically.

### Custom Observer Interface

\`\`\`java
public interface Observer {
    void update(String event, Object data);
}

public class EventEmitter {
    private final List<Observer> observers = new ArrayList<>();

    public void subscribe(Observer observer) {
        observers.add(observer);
    }

    public void unsubscribe(Observer observer) {
        observers.remove(observer);
    }

    protected void notifyObservers(String event, Object data) {
        for (Observer o : observers) {
            o.update(event, data);
        }
    }
}
\`\`\`

### PropertyChangeSupport (Built-in)

Java provides \`PropertyChangeSupport\` for observable bean properties:

\`\`\`java
import java.beans.PropertyChangeSupport;
import java.beans.PropertyChangeListener;

public class Account {
    private final PropertyChangeSupport pcs = new PropertyChangeSupport(this);
    private double balance;

    public void addListener(PropertyChangeListener l) {
        pcs.addPropertyChangeListener(l);
    }

    public void setBalance(double newBalance) {
        double old = this.balance;
        this.balance = newBalance;
        pcs.firePropertyChange("balance", old, newBalance);
    }
}
\`\`\`

### Event Listener Pattern

Swing/AWT style with typed events and listeners:

\`\`\`java
public interface ClickListener {
    void onClick(ClickEvent event);
}
\`\`\`

### Reactive Patterns

Modern Java uses \`Flow.Publisher\` / \`Flow.Subscriber\` (Java 9+) for reactive streams, and libraries like RxJava for complex event processing.

### Weak References

Using \`WeakReference\` prevents the subject from keeping observers alive, avoiding memory leaks when observers are garbage collected.`,
  exercises: [
    {
      id: 'java-observer-1',
      title: 'Observer Interface Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare a functional observer interface with an update method.',
      skeleton: `public __BLANK__ Observer {
    void update(String event, Object data);
}`,
      solution: `public interface Observer {
    void update(String event, Object data);
}`,
      hints: [
        'An observer contract is typically defined as a type that declares methods without implementation.',
        'This type of declaration uses a specific Java keyword.',
        'Use "interface".',
      ],
      concepts: ['observer-interface', 'functional-interface'],
    },
    {
      id: 'java-observer-2',
      title: 'Subscribe an Observer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Add an observer to the list of subscribers.',
      skeleton: `public class EventEmitter {
    private final List<Observer> observers = new ArrayList<>();

    public void subscribe(Observer observer) {
        observers.__BLANK__(observer);
    }
}`,
      solution: `public class EventEmitter {
    private final List<Observer> observers = new ArrayList<>();

    public void subscribe(Observer observer) {
        observers.add(observer);
    }
}`,
      hints: [
        'You need to add the observer to the list.',
        'Lists have a method for appending elements.',
        'Use observers.add(observer).',
      ],
      concepts: ['subscribe', 'observer-registration'],
    },
    {
      id: 'java-observer-3',
      title: 'Notify All Observers',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Call the update method on each observer in the list.',
      skeleton: `public class EventEmitter {
    private final List<Observer> observers = new ArrayList<>();

    protected void notifyAll(String event, Object data) {
        for (Observer o : observers) {
            o.__BLANK__(event, data);
        }
    }
}`,
      solution: `public class EventEmitter {
    private final List<Observer> observers = new ArrayList<>();

    protected void notifyAll(String event, Object data) {
        for (Observer o : observers) {
            o.update(event, data);
        }
    }
}`,
      hints: [
        'The Observer interface has a method that receives notifications.',
        'Call the method defined in the Observer interface.',
        'Use o.update(event, data).',
      ],
      concepts: ['notify-observers', 'event-dispatch'],
    },
    {
      id: 'java-observer-4',
      title: 'PropertyChangeSupport Fire Event',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fire a property change event when the name field changes.',
      skeleton: `import java.beans.PropertyChangeSupport;

public class Person {
    private final PropertyChangeSupport pcs = new PropertyChangeSupport(this);
    private String name;

    public void setName(String newName) {
        String old = this.name;
        this.name = newName;
        pcs.__BLANK__("name", old, newName);
    }
}`,
      solution: `import java.beans.PropertyChangeSupport;

public class Person {
    private final PropertyChangeSupport pcs = new PropertyChangeSupport(this);
    private String name;

    public void setName(String newName) {
        String old = this.name;
        this.name = newName;
        pcs.firePropertyChange("name", old, newName);
    }
}`,
      hints: [
        'PropertyChangeSupport has a method to broadcast property changes.',
        'It takes the property name, old value, and new value.',
        'Use pcs.firePropertyChange("name", old, newName).',
      ],
      concepts: ['property-change-support', 'bean-events'],
    },
    {
      id: 'java-observer-5',
      title: 'Unsubscribe an Observer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Remove an observer from the subscribers list.',
      skeleton: `public class EventEmitter {
    private final List<Observer> observers = new ArrayList<>();

    public void unsubscribe(Observer observer) {
        observers.__BLANK__(observer);
    }
}`,
      solution: `public class EventEmitter {
    private final List<Observer> observers = new ArrayList<>();

    public void unsubscribe(Observer observer) {
        observers.remove(observer);
    }
}`,
      hints: [
        'You need to remove the observer from the list.',
        'Lists have a method for removing elements.',
        'Use observers.remove(observer).',
      ],
      concepts: ['unsubscribe', 'observer-removal'],
    },
    {
      id: 'java-observer-6',
      title: 'Lambda as Observer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Subscribe a lambda expression as an observer.',
      skeleton: `EventEmitter emitter = new EventEmitter();
emitter.subscribe(__BLANK__ -> System.out.println(event + ": " + data));`,
      solution: `EventEmitter emitter = new EventEmitter();
emitter.subscribe((event, data) -> System.out.println(event + ": " + data));`,
      hints: [
        'The Observer interface has one method with two parameters.',
        'A lambda for two parameters uses parentheses around the parameter list.',
        'Use (event, data) -> ... as the lambda expression.',
      ],
      concepts: ['lambda-observer', 'functional-interface'],
    },
    {
      id: 'java-observer-7',
      title: 'Write a Complete Subject Class',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a Store class that maintains a list of observers and notifies them when inventory changes.',
      skeleton: `import java.util.List;
import java.util.ArrayList;

// Write Store class with:
// - List<Observer> observers field
// - subscribe(Observer) and unsubscribe(Observer)
// - setStock(String item, int qty) that notifies all observers with the item name`,
      solution: `import java.util.List;
import java.util.ArrayList;

public class Store {
    private final List<Observer> observers = new ArrayList<>();

    public void subscribe(Observer observer) {
        observers.add(observer);
    }

    public void unsubscribe(Observer observer) {
        observers.remove(observer);
    }

    public void setStock(String item, int qty) {
        for (Observer o : observers) {
            o.update("stock-changed", item + ":" + qty);
        }
    }
}`,
      hints: [
        'Maintain observers in an ArrayList.',
        'subscribe adds, unsubscribe removes.',
        'setStock iterates observers and calls update on each.',
      ],
      concepts: ['subject-class', 'observer-notification'],
    },
    {
      id: 'java-observer-8',
      title: 'Write a Typed Event System',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write an event system with separate listener lists per event type using a Map.',
      skeleton: `import java.util.*;
import java.util.function.Consumer;

// Write EventBus class with:
// - Map<String, List<Consumer<Object>>> listeners
// - on(String event, Consumer<Object> listener) - registers a listener for an event
// - emit(String event, Object data) - calls all listeners for that event`,
      solution: `import java.util.*;
import java.util.function.Consumer;

public class EventBus {
    private final Map<String, List<Consumer<Object>>> listeners = new HashMap<>();

    public void on(String event, Consumer<Object> listener) {
        listeners.computeIfAbsent(event, k -> new ArrayList<>()).add(listener);
    }

    public void emit(String event, Object data) {
        List<Consumer<Object>> list = listeners.get(event);
        if (list != null) {
            for (Consumer<Object> listener : list) {
                listener.accept(data);
            }
        }
    }
}`,
      hints: [
        'Use computeIfAbsent to lazily create the list for each event type.',
        'emit() looks up the list for the event and calls accept() on each consumer.',
        'Check for null before iterating since the event may have no listeners.',
      ],
      concepts: ['typed-events', 'consumer', 'map-based-dispatch'],
    },
    {
      id: 'java-observer-9',
      title: 'Write PropertyChangeListener Usage',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a class that uses PropertyChangeSupport and a test showing a listener receiving the change event.',
      skeleton: `import java.beans.*;

// Write:
// 1. Temperature class with:
//    - PropertyChangeSupport pcs
//    - double degrees field
//    - addListener(PropertyChangeListener)
//    - setDegrees(double) that fires "degrees" property change
// 2. Show usage: create Temperature, add listener that prints new value, call setDegrees(98.6)`,
      solution: `import java.beans.*;

public class Temperature {
    private final PropertyChangeSupport pcs = new PropertyChangeSupport(this);
    private double degrees;

    public void addListener(PropertyChangeListener listener) {
        pcs.addPropertyChangeListener(listener);
    }

    public void setDegrees(double newDegrees) {
        double old = this.degrees;
        this.degrees = newDegrees;
        pcs.firePropertyChange("degrees", old, newDegrees);
    }

    public double getDegrees() {
        return degrees;
    }
}

// Usage:
// Temperature temp = new Temperature();
// temp.addListener(evt -> System.out.println("New temp: " + evt.getNewValue()));
// temp.setDegrees(98.6);`,
      hints: [
        'PropertyChangeSupport wraps the pattern for you.',
        'firePropertyChange takes the property name, old, and new values.',
        'Listeners receive a PropertyChangeEvent with getNewValue().',
      ],
      concepts: ['property-change-support', 'java-beans'],
    },
    {
      id: 'java-observer-10',
      title: 'Write Observer with Event Filtering',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a FilteredEventEmitter where observers can subscribe to specific event types only.',
      skeleton: `import java.util.*;

// Write FilteredEventEmitter with:
// - Map<String, List<Observer>> subscribersByEvent
// - subscribe(String eventType, Observer observer)
// - emit(String eventType, Object data) - only notifies observers of that event type`,
      solution: `import java.util.*;

public class FilteredEventEmitter {
    private final Map<String, List<Observer>> subscribersByEvent = new HashMap<>();

    public void subscribe(String eventType, Observer observer) {
        subscribersByEvent.computeIfAbsent(eventType, k -> new ArrayList<>()).add(observer);
    }

    public void emit(String eventType, Object data) {
        List<Observer> observers = subscribersByEvent.get(eventType);
        if (observers != null) {
            for (Observer o : observers) {
                o.update(eventType, data);
            }
        }
    }
}`,
      hints: [
        'Use a Map from event type to list of observers.',
        'computeIfAbsent creates the list on first subscription.',
        'emit only calls observers registered for that specific event type.',
      ],
      concepts: ['filtered-events', 'event-routing'],
    },
    {
      id: 'java-observer-11',
      title: 'Write WeakReference Observer List',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a subject that holds observers via WeakReferences to prevent memory leaks.',
      skeleton: `import java.lang.ref.WeakReference;
import java.util.*;

// Write WeakEventEmitter with:
// - List<WeakReference<Observer>> observers
// - subscribe(Observer) wraps in WeakReference
// - notifyAll(String event, Object data) iterates, skips garbage-collected refs, calls update`,
      solution: `import java.lang.ref.WeakReference;
import java.util.*;

public class WeakEventEmitter {
    private final List<WeakReference<Observer>> observers = new ArrayList<>();

    public void subscribe(Observer observer) {
        observers.add(new WeakReference<>(observer));
    }

    public void notifyObservers(String event, Object data) {
        Iterator<WeakReference<Observer>> it = observers.iterator();
        while (it.hasNext()) {
            Observer o = it.next().get();
            if (o == null) {
                it.remove();
            } else {
                o.update(event, data);
            }
        }
    }
}`,
      hints: [
        'Wrap each observer in new WeakReference<>(observer).',
        'When iterating, call .get() on the WeakReference -- null means GC collected it.',
        'Remove dead references with iterator.remove().',
      ],
      concepts: ['weak-reference', 'memory-leak-prevention', 'garbage-collection'],
    },
    {
      id: 'java-observer-12',
      title: 'Write Async Observer Notification',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write an async event emitter that notifies observers on a separate thread using an ExecutorService.',
      skeleton: `import java.util.*;
import java.util.concurrent.*;

// Write AsyncEventEmitter with:
// - List<Observer> observers
// - ExecutorService executor (single-thread)
// - subscribe(Observer)
// - emit(String event, Object data) submits notification to executor
// - shutdown() to shut down the executor`,
      solution: `import java.util.*;
import java.util.concurrent.*;

public class AsyncEventEmitter {
    private final List<Observer> observers = new CopyOnWriteArrayList<>();
    private final ExecutorService executor = Executors.newSingleThreadExecutor();

    public void subscribe(Observer observer) {
        observers.add(observer);
    }

    public void emit(String event, Object data) {
        executor.submit(() -> {
            for (Observer o : observers) {
                o.update(event, data);
            }
        });
    }

    public void shutdown() {
        executor.shutdown();
    }
}`,
      hints: [
        'Use Executors.newSingleThreadExecutor() for sequential async delivery.',
        'Submit a Runnable that iterates and notifies all observers.',
        'CopyOnWriteArrayList is thread-safe for concurrent reads.',
      ],
      concepts: ['async-notification', 'executor-service', 'thread-safety'],
    },
    {
      id: 'java-observer-13',
      title: 'Fix ConcurrentModificationException',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'An observer unsubscribes itself during notification, causing ConcurrentModificationException. Fix it.',
      skeleton: `public class Emitter {
    private final List<Observer> observers = new ArrayList<>();

    public void subscribe(Observer o) { observers.add(o); }
    public void unsubscribe(Observer o) { observers.remove(o); }

    public void emit(String event, Object data) {
        for (Observer o : observers) { // ConcurrentModificationException if observer unsubscribes!
            o.update(event, data);
        }
    }
}`,
      solution: `public class Emitter {
    private final List<Observer> observers = new ArrayList<>();

    public void subscribe(Observer o) { observers.add(o); }
    public void unsubscribe(Observer o) { observers.remove(o); }

    public void emit(String event, Object data) {
        for (Observer o : new ArrayList<>(observers)) {
            o.update(event, data);
        }
    }
}`,
      hints: [
        'Iterating a list while modifying it causes ConcurrentModificationException.',
        'Create a defensive copy of the list before iterating.',
        'Use new ArrayList<>(observers) to iterate over a snapshot.',
      ],
      concepts: ['concurrent-modification', 'defensive-copy'],
    },
    {
      id: 'java-observer-14',
      title: 'Fix Missing Property Name in Event',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'The PropertyChangeSupport fires with null property name. Fix it to include the correct name.',
      skeleton: `import java.beans.PropertyChangeSupport;

public class Settings {
    private final PropertyChangeSupport pcs = new PropertyChangeSupport(this);
    private String theme;

    public void setTheme(String newTheme) {
        String old = this.theme;
        this.theme = newTheme;
        pcs.firePropertyChange(null, old, newTheme); // Bug: null property name
    }
}`,
      solution: `import java.beans.PropertyChangeSupport;

public class Settings {
    private final PropertyChangeSupport pcs = new PropertyChangeSupport(this);
    private String theme;

    public void setTheme(String newTheme) {
        String old = this.theme;
        this.theme = newTheme;
        pcs.firePropertyChange("theme", old, newTheme);
    }
}`,
      hints: [
        'The first argument to firePropertyChange should be the property name.',
        'It is currently null but should identify which property changed.',
        'Replace null with "theme".',
      ],
      concepts: ['property-change-support', 'property-name'],
    },
    {
      id: 'java-observer-15',
      title: 'Fix Observer Not Receiving Updates',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'The observer is never notified because the subject fires the event before adding the observer. Fix the order.',
      skeleton: `public class Demo {
    public static void main(String[] args) {
        Store store = new Store();

        store.setStock("Apples", 50);  // fires event BEFORE observer is added!

        store.subscribe((event, data) -> {
            System.out.println("Notified: " + data);
        });
    }
}
// Fix: The observer never prints anything`,
      solution: `public class Demo {
    public static void main(String[] args) {
        Store store = new Store();

        store.subscribe((event, data) -> {
            System.out.println("Notified: " + data);
        });

        store.setStock("Apples", 50);
    }
}`,
      hints: [
        'The observer must be registered before events are fired.',
        'Currently, setStock fires before subscribe is called.',
        'Move the subscribe call before the setStock call.',
      ],
      concepts: ['subscription-order', 'event-timing'],
    },
    {
      id: 'java-observer-16',
      title: 'Predict Observer Notification Count',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'How many times is the observer notified?',
      skeleton: `EventEmitter emitter = new EventEmitter();
Observer logger = (event, data) -> System.out.print("X");

emitter.subscribe(logger);
emitter.emit("a", null);
emitter.emit("b", null);
emitter.unsubscribe(logger);
emitter.emit("c", null);
// What is printed?`,
      solution: `XX`,
      hints: [
        'The observer is subscribed, then two events fire.',
        'After unsubscribe, the third event does not reach the observer.',
        'Two "X" are printed.',
      ],
      concepts: ['subscribe-unsubscribe', 'notification-lifecycle'],
    },
    {
      id: 'java-observer-17',
      title: 'Predict Multiple Observer Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output when two observers are subscribed.',
      skeleton: `EventEmitter emitter = new EventEmitter();
emitter.subscribe((e, d) -> System.out.print("A"));
emitter.subscribe((e, d) -> System.out.print("B"));

emitter.emit("test", null);
emitter.emit("test", null);
// What is printed?`,
      solution: `ABAB`,
      hints: [
        'Both observers are notified for each emit call.',
        'The first emit prints A then B, the second emit prints A then B.',
        'Total output: ABAB.',
      ],
      concepts: ['multiple-observers', 'notification-order'],
    },
    {
      id: 'java-observer-18',
      title: 'Predict PropertyChangeEvent Values',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the old and new values in the property change event.',
      skeleton: `import java.beans.*;

public class Account {
    private final PropertyChangeSupport pcs = new PropertyChangeSupport(this);
    private double balance = 100.0;

    public void addListener(PropertyChangeListener l) { pcs.addPropertyChangeListener(l); }

    public void setBalance(double b) {
        double old = this.balance;
        this.balance = b;
        pcs.firePropertyChange("balance", old, b);
    }
}

Account acc = new Account();
acc.addListener(evt -> System.out.println(evt.getOldValue() + " -> " + evt.getNewValue()));
acc.setBalance(250.0);
// What is printed?`,
      solution: `100.0 -> 250.0`,
      hints: [
        'The old value is captured before the assignment.',
        'firePropertyChange passes the old and new values.',
        'The listener prints: old -> new.',
      ],
      concepts: ['property-change-event', 'old-new-values'],
    },
    {
      id: 'java-observer-19',
      title: 'Refactor Polling to Observer',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor a polling-based design to use the observer pattern for real-time notifications.',
      skeleton: `// BEFORE: Dashboard polls for data every second
public class Dashboard {
    private final DataSource source;

    public Dashboard(DataSource source) {
        this.source = source;
    }

    public void startPolling() {
        while (true) {
            String data = source.getData(); // checks every iteration
            display(data);
            Thread.sleep(1000);
        }
    }

    private void display(String data) {
        System.out.println("Dashboard: " + data);
    }
}

// Refactor: Make DataSource observable, Dashboard becomes an observer`,
      solution: `public class DataSource {
    private final List<Observer> observers = new ArrayList<>();
    private String data;

    public void subscribe(Observer observer) {
        observers.add(observer);
    }

    public void setData(String newData) {
        this.data = newData;
        for (Observer o : observers) {
            o.update("data-changed", newData);
        }
    }
}

public class Dashboard implements Observer {
    public Dashboard(DataSource source) {
        source.subscribe(this);
    }

    @Override
    public void update(String event, Object data) {
        display((String) data);
    }

    private void display(String data) {
        System.out.println("Dashboard: " + data);
    }
}`,
      hints: [
        'Make DataSource hold a list of observers and notify them on setData().',
        'Dashboard implements Observer and subscribes to the DataSource.',
        'No polling loop needed -- the DataSource pushes updates.',
      ],
      concepts: ['push-vs-poll', 'observer-refactoring'],
    },
    {
      id: 'java-observer-20',
      title: 'Refactor to Generic Typed Observer',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor an Observer using Object data to a generic typed observer for type safety.',
      skeleton: `// BEFORE: untyped observer -- requires casting
public interface Observer {
    void update(String event, Object data);
}

public class PriceTracker {
    private final List<Observer> observers = new ArrayList<>();

    public void subscribe(Observer o) { observers.add(o); }

    public void setPrice(double price) {
        for (Observer o : observers) {
            o.update("price", price); // autoboxed, but consumer must cast
        }
    }
}

// Usage:
// tracker.subscribe((e, d) -> System.out.println("Price: " + (Double) d));

// Refactor to a generic typed observer: EventListener<T>`,
      solution: `public interface EventListener<T> {
    void onEvent(T data);
}

public class PriceTracker {
    private final List<EventListener<Double>> listeners = new ArrayList<>();

    public void subscribe(EventListener<Double> listener) {
        listeners.add(listener);
    }

    public void setPrice(double price) {
        for (EventListener<Double> listener : listeners) {
            listener.onEvent(price);
        }
    }
}

// Usage:
// tracker.subscribe(price -> System.out.println("Price: " + price));`,
      hints: [
        'Create a generic interface EventListener<T> with onEvent(T data).',
        'PriceTracker uses EventListener<Double> for type safety.',
        'No more Object casting needed at the consumer side.',
      ],
      concepts: ['generic-observer', 'type-safety', 'refactoring'],
    },
  ],
};
