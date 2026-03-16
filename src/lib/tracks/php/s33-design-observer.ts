import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-observer',
  title: '33. Observer',
  explanation: `## Observer Pattern in PHP

The Observer pattern defines a one-to-many dependency between objects. When a subject changes state, all its observers are notified. PHP provides built-in SplObserver/SplSubject interfaces and PSR-14 defines event dispatching.

### SplObserver / SplSubject
\`\`\`php
<?php
class EventEmitter implements \\SplSubject {
    private array \\\$observers = [];
    private string \\\$state = '';

    public function attach(\\SplObserver \\\$observer): void {
        \\\$this->observers[spl_object_id(\\\$observer)] = \\\$observer;
    }

    public function detach(\\SplObserver \\\$observer): void {
        unset(\\\$this->observers[spl_object_id(\\\$observer)]);
    }

    public function notify(): void {
        foreach (\\\$this->observers as \\\$observer) {
            \\\$observer->update(\\\$this);
        }
    }

    public function setState(string \\\$state): void {
        \\\$this->state = \\\$state;
        \\\$this->notify();
    }

    public function getState(): string {
        return \\\$this->state;
    }
}
\`\`\`

### Custom Event System
\`\`\`php
<?php
class EventDispatcher {
    private array \\\$listeners = [];

    public function listen(string \\\$event, callable \\\$listener): void {
        \\\$this->listeners[\\\$event][] = \\\$listener;
    }

    public function dispatch(string \\\$event, array \\\$data = []): void {
        foreach (\\\$this->listeners[\\\$event] ?? [] as \\\$listener) {
            \\\$listener(\\\$data);
        }
    }
}
\`\`\`

### PSR-14 Event Dispatcher
\`\`\`php
<?php
// PSR-14 uses typed event objects
class UserRegistered {
    public function __construct(
        public readonly string \\\$email,
        public readonly \\DateTimeImmutable \\\$registeredAt
    ) {}
}

// Listener receives the event object
function onUserRegistered(UserRegistered \\\$event): void {
    sendWelcomeEmail(\\\$event->email);
}
\`\`\``,
  exercises: [
    {
      id: 'php-observer-1',
      title: 'Implement SplSubject Attach',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to add an observer to the subject.',
      skeleton: `<?php
class Newsletter implements \\SplSubject {
    private array \\\$observers = [];

    public function attach(\\SplObserver \\\$observer): void {
        \\\$this->___[spl_object_id(\\\$observer)] = \\\$observer;
    }

    public function detach(\\SplObserver \\\$observer): void {
        unset(\\\$this->observers[spl_object_id(\\\$observer)]);
    }

    public function notify(): void {
        foreach (\\\$this->observers as \\\$obs) {
            \\\$obs->update(\\\$this);
        }
    }
}`,
      solution: `<?php
class Newsletter implements \\SplSubject {
    private array \\\$observers = [];

    public function attach(\\SplObserver \\\$observer): void {
        \\\$this->observers[spl_object_id(\\\$observer)] = \\\$observer;
    }

    public function detach(\\SplObserver \\\$observer): void {
        unset(\\\$this->observers[spl_object_id(\\\$observer)]);
    }

    public function notify(): void {
        foreach (\\\$this->observers as \\\$obs) {
            \\\$obs->update(\\\$this);
        }
    }
}`,
      hints: [
        'Observers are stored in the observers array',
        'spl_object_id gives a unique key per object',
        'Use the observers property',
      ],
      concepts: ['SplSubject', 'attach'],
    },
    {
      id: 'php-observer-2',
      title: 'Implement SplObserver Update',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to implement the observer update method.',
      skeleton: `<?php
class Logger implements \\SplObserver {
    public function ___(\\SplSubject \\\$subject): void {
        echo "State changed\\n";
    }
}`,
      solution: `<?php
class Logger implements \\SplObserver {
    public function update(\\SplSubject \\\$subject): void {
        echo "State changed\\n";
    }
}`,
      hints: [
        'SplObserver requires one method to be implemented',
        'It is called when the subject notifies observers',
        'The method is update()',
      ],
      concepts: ['SplObserver', 'update'],
    },
    {
      id: 'php-observer-3',
      title: 'Event Listener Registration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to register a listener for the "user.created" event.',
      skeleton: `<?php
\\\$dispatcher = new EventDispatcher();
\\\$dispatcher->___(___,  function(array \\\$data) {
    echo "Welcome " . \\\$data['name'];
});`,
      solution: `<?php
\\\$dispatcher = new EventDispatcher();
\\\$dispatcher->listen('user.created', function(array \\\$data) {
    echo "Welcome " . \\\$data['name'];
});`,
      hints: [
        'Use the method to register an event listener',
        'The first argument is the event name string',
        'The method is listen()',
      ],
      concepts: ['event-dispatcher', 'listeners'],
    },
    {
      id: 'php-observer-4',
      title: 'Dispatch an Event',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to dispatch the "order.placed" event with order data.',
      skeleton: `<?php
\\\$dispatcher = new EventDispatcher();
\\\$dispatcher->listen('order.placed', function(array \\\$data) {
    echo "Order #" . \\\$data['id'] . " placed";
});

\\\$dispatcher->___(___);`,
      solution: `<?php
\\\$dispatcher = new EventDispatcher();
\\\$dispatcher->listen('order.placed', function(array \\\$data) {
    echo "Order #" . \\\$data['id'] . " placed";
});

\\\$dispatcher->dispatch('order.placed', ['id' => 42]);`,
      hints: [
        'Dispatching triggers all listeners for that event',
        'Pass the event name and data array',
        'The method is dispatch()',
      ],
      concepts: ['event-dispatcher', 'dispatch'],
    },
    {
      id: 'php-observer-5',
      title: 'PSR-14 Event Object',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to create a PSR-14 style typed event class.',
      skeleton: `<?php
class OrderShipped {
    public function __construct(
        public ___ string \\\$orderId,
        public ___ string \\\$trackingNumber
    ) {}
}`,
      solution: `<?php
class OrderShipped {
    public function __construct(
        public readonly string \\\$orderId,
        public readonly string \\\$trackingNumber
    ) {}
}`,
      hints: [
        'Event objects should be immutable',
        'Use a property modifier that prevents changes after construction',
        'The readonly keyword makes properties immutable',
      ],
      concepts: ['PSR-14', 'event-objects', 'readonly'],
    },
    {
      id: 'php-observer-6',
      title: 'Detach Observer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to remove an observer from the subject.',
      skeleton: `<?php
class Store implements \\SplSubject {
    private array \\\$observers = [];

    public function attach(\\SplObserver \\\$observer): void {
        \\\$this->observers[spl_object_id(\\\$observer)] = \\\$observer;
    }

    public function detach(\\SplObserver \\\$observer): void {
        ___(___);
    }

    public function notify(): void {
        foreach (\\\$this->observers as \\\$obs) {
            \\\$obs->update(\\\$this);
        }
    }
}`,
      solution: `<?php
class Store implements \\SplSubject {
    private array \\\$observers = [];

    public function attach(\\SplObserver \\\$observer): void {
        \\\$this->observers[spl_object_id(\\\$observer)] = \\\$observer;
    }

    public function detach(\\SplObserver \\\$observer): void {
        unset(\\\$this->observers[spl_object_id(\\\$observer)]);
    }

    public function notify(): void {
        foreach (\\\$this->observers as \\\$obs) {
            \\\$obs->update(\\\$this);
        }
    }
}`,
      hints: [
        'Remove the observer from the array',
        'Use the same key method as attach',
        'unset() removes an array element',
      ],
      concepts: ['SplSubject', 'detach'],
    },
    {
      id: 'php-observer-7',
      title: 'Build Custom Event Dispatcher',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write an EventDispatcher class with listen(), dispatch(), and removeListener() methods. Listeners are callables keyed by event name.',
      skeleton: `<?php
class EventDispatcher {
    // listen(string \\\$event, callable \\\$listener): void
    // dispatch(string \\\$event, array \\\$data = []): void
    // removeListener(string \\\$event, callable \\\$listener): void
}`,
      solution: `<?php
class EventDispatcher {
    private array \\\$listeners = [];

    public function listen(string \\\$event, callable \\\$listener): void {
        \\\$this->listeners[\\\$event][] = \\\$listener;
    }

    public function dispatch(string \\\$event, array \\\$data = []): void {
        foreach (\\\$this->listeners[\\\$event] ?? [] as \\\$listener) {
            \\\$listener(\\\$data);
        }
    }

    public function removeListener(string \\\$event, callable \\\$listener): void {
        if (isset(\\\$this->listeners[\\\$event])) {
            \\\$this->listeners[\\\$event] = array_filter(
                \\\$this->listeners[\\\$event],
                fn(\\\$l) => \\\$l !== \\\$listener
            );
        }
    }
}`,
      hints: [
        'Store listeners as arrays keyed by event name',
        'dispatch loops through and calls each listener',
        'removeListener filters out the specific callable',
      ],
      concepts: ['event-dispatcher', 'observer'],
    },
    {
      id: 'php-observer-8',
      title: 'Typed Event Dispatcher',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a TypedEventDispatcher that registers listeners for event class names and dispatches event objects. The dispatch method takes an event object and calls listeners registered for that class.',
      skeleton: `<?php
class TypedEventDispatcher {
    // listen(string \\\$eventClass, callable \\\$listener): void
    // dispatch(object \\\$event): object
    // Returns the event object for chaining
}`,
      solution: `<?php
class TypedEventDispatcher {
    private array \\\$listeners = [];

    public function listen(string \\\$eventClass, callable \\\$listener): void {
        \\\$this->listeners[\\\$eventClass][] = \\\$listener;
    }

    public function dispatch(object \\\$event): object {
        \\\$class = get_class(\\\$event);
        foreach (\\\$this->listeners[\\\$class] ?? [] as \\\$listener) {
            \\\$listener(\\\$event);
        }
        return \\\$event;
    }
}`,
      hints: [
        'Use get_class() to determine the event type',
        'Listeners are registered for specific class names',
        'Return the event for method chaining',
      ],
      concepts: ['PSR-14', 'typed-events', 'event-dispatcher'],
    },
    {
      id: 'php-observer-9',
      title: 'Stoppable Event',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a StoppableEvent base class with stopPropagation() and isPropagationStopped() methods. Then modify a dispatch function to respect it.',
      skeleton: `<?php
// Write StoppableEvent class
// Write dispatch function that stops when propagation is stopped`,
      solution: `<?php
class StoppableEvent {
    private bool \\\$stopped = false;

    public function stopPropagation(): void {
        \\\$this->stopped = true;
    }

    public function isPropagationStopped(): bool {
        return \\\$this->stopped;
    }
}

class Dispatcher {
    private array \\\$listeners = [];

    public function listen(string \\\$eventClass, callable \\\$listener): void {
        \\\$this->listeners[\\\$eventClass][] = \\\$listener;
    }

    public function dispatch(object \\\$event): object {
        \\\$class = get_class(\\\$event);
        foreach (\\\$this->listeners[\\\$class] ?? [] as \\\$listener) {
            if (\\\$event instanceof StoppableEvent && \\\$event->isPropagationStopped()) {
                break;
            }
            \\\$listener(\\\$event);
        }
        return \\\$event;
    }
}`,
      hints: [
        'StoppableEvent has a boolean flag for propagation state',
        'Check isPropagationStopped() before each listener call',
        'Break out of the loop when stopped',
      ],
      concepts: ['PSR-14', 'stoppable-events', 'event-propagation'],
    },
    {
      id: 'php-observer-10',
      title: 'Observer with Priority',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a PriorityEventDispatcher where listeners have priority (higher runs first). listen() takes event, callable, and priority int.',
      skeleton: `<?php
class PriorityEventDispatcher {
    // listen(string \\\$event, callable \\\$listener, int \\\$priority = 0): void
    // dispatch(string \\\$event, array \\\$data = []): void
    // Higher priority listeners execute first
}`,
      solution: `<?php
class PriorityEventDispatcher {
    private array \\\$listeners = [];

    public function listen(string \\\$event, callable \\\$listener, int \\\$priority = 0): void {
        \\\$this->listeners[\\\$event][] = [
            'listener' => \\\$listener,
            'priority' => \\\$priority,
        ];
    }

    public function dispatch(string \\\$event, array \\\$data = []): void {
        \\\$listeners = \\\$this->listeners[\\\$event] ?? [];
        usort(\\\$listeners, fn(\\\$a, \\\$b) => \\\$b['priority'] <=> \\\$a['priority']);
        foreach (\\\$listeners as \\\$entry) {
            (\\\$entry['listener'])(\\\$data);
        }
    }
}`,
      hints: [
        'Store listeners with their priority as metadata',
        'Sort by priority (descending) before dispatching',
        'Use usort with the spaceship operator',
      ],
      concepts: ['priority-listeners', 'event-dispatcher'],
    },
    {
      id: 'php-observer-11',
      title: 'Wildcard Event Listener',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write an EventDispatcher that supports wildcard listeners. A listener for "user.*" should be called for "user.created", "user.updated", etc.',
      skeleton: `<?php
class WildcardDispatcher {
    // listen(string \\\$pattern, callable \\\$listener): void
    // dispatch(string \\\$event, array \\\$data = []): void
    // Support * wildcards in patterns
}`,
      solution: `<?php
class WildcardDispatcher {
    private array \\\$listeners = [];

    public function listen(string \\\$pattern, callable \\\$listener): void {
        \\\$this->listeners[] = ['pattern' => \\\$pattern, 'listener' => \\\$listener];
    }

    public function dispatch(string \\\$event, array \\\$data = []): void {
        foreach (\\\$this->listeners as \\\$entry) {
            if (\\\$this->matches(\\\$entry['pattern'], \\\$event)) {
                (\\\$entry['listener'])(\\\$event, \\\$data);
            }
        }
    }

    private function matches(string \\\$pattern, string \\\$event): bool {
        if (\\\$pattern === \\\$event) {
            return true;
        }
        \\\$regex = '/^' . str_replace('\\*', '.*', preg_quote(\\\$pattern, '/')) . '\\\$/';
        return (bool) preg_match(\\\$regex, \\\$event);
    }
}`,
      hints: [
        'Convert the wildcard pattern to a regex',
        'Replace * with .* in the regex',
        'Use preg_match to test if the event matches',
      ],
      concepts: ['wildcard-events', 'regex', 'event-dispatcher'],
    },
    {
      id: 'php-observer-12',
      title: 'Event Subscriber Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write an interface EventSubscriber with a getSubscribedEvents method, and a function to register a subscriber with an EventDispatcher.',
      skeleton: `<?php
// Write EventSubscriber interface
// Write registerSubscriber function that connects subscriber to dispatcher`,
      solution: `<?php
interface EventSubscriber {
    public static function getSubscribedEvents(): array;
}

class UserSubscriber implements EventSubscriber {
    public static function getSubscribedEvents(): array {
        return [
            'user.created' => 'onUserCreated',
            'user.deleted' => 'onUserDeleted',
        ];
    }

    public function onUserCreated(array \\\$data): void {
        echo "User created: " . \\\$data['email'];
    }

    public function onUserDeleted(array \\\$data): void {
        echo "User deleted: " . \\\$data['id'];
    }
}

function registerSubscriber(EventDispatcher \\\$dispatcher, EventSubscriber \\\$subscriber): void {
    foreach (\\\$subscriber::getSubscribedEvents() as \\\$event => \\\$method) {
        \\\$dispatcher->listen(\\\$event, [\\\$subscriber, \\\$method]);
    }
}`,
      hints: [
        'getSubscribedEvents returns event name to method name mapping',
        'Register each mapping with the dispatcher',
        'Use [\$subscriber, \$method] as the callable',
      ],
      concepts: ['event-subscriber', 'observer'],
    },
    {
      id: 'php-observer-13',
      title: 'Fix Observer Memory Leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the observer that is never detached, causing a memory leak in long-running processes.',
      skeleton: `<?php
class TemporaryLogger implements \\SplObserver {
    public function update(\\SplSubject \\\$subject): void {
        echo "Logged\\n";
    }
}

\\\$subject = new Store();

function addTemporaryObserver(\\SplSubject \\\$subject): void {
    \\\$logger = new TemporaryLogger();
    \\\$subject->attach(\\\$logger);
    // Bug: logger is never detached, accumulates forever
}

addTemporaryObserver(\\\$subject);
addTemporaryObserver(\\\$subject);
// Each call adds another observer that's never removed`,
      solution: `<?php
class TemporaryLogger implements \\SplObserver {
    public function update(\\SplSubject \\\$subject): void {
        echo "Logged\\n";
        \\\$subject->detach(\\\$this);
    }
}

\\\$subject = new Store();

function addTemporaryObserver(\\SplSubject \\\$subject): void {
    \\\$logger = new TemporaryLogger();
    \\\$subject->attach(\\\$logger);
}

addTemporaryObserver(\\\$subject);
addTemporaryObserver(\\\$subject);`,
      hints: [
        'One-time observers should detach themselves after executing',
        'Call detach(\$this) inside the update method',
        'This prevents unbounded growth of the observer list',
      ],
      concepts: ['memory-leak', 'observer', 'self-detach'],
    },
    {
      id: 'php-observer-14',
      title: 'Fix Missing Notify Call',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the subject that updates state but never notifies observers.',
      skeleton: `<?php
class Stock implements \\SplSubject {
    private array \\\$observers = [];
    private float \\\$price = 0.0;

    public function attach(\\SplObserver \\\$observer): void {
        \\\$this->observers[spl_object_id(\\\$observer)] = \\\$observer;
    }
    public function detach(\\SplObserver \\\$observer): void {
        unset(\\\$this->observers[spl_object_id(\\\$observer)]);
    }
    public function notify(): void {
        foreach (\\\$this->observers as \\\$obs) {
            \\\$obs->update(\\\$this);
        }
    }

    public function setPrice(float \\\$price): void {
        \\\$this->price = \\\$price;
        // Bug: observers are never notified
    }

    public function getPrice(): float { return \\\$this->price; }
}`,
      solution: `<?php
class Stock implements \\SplSubject {
    private array \\\$observers = [];
    private float \\\$price = 0.0;

    public function attach(\\SplObserver \\\$observer): void {
        \\\$this->observers[spl_object_id(\\\$observer)] = \\\$observer;
    }
    public function detach(\\SplObserver \\\$observer): void {
        unset(\\\$this->observers[spl_object_id(\\\$observer)]);
    }
    public function notify(): void {
        foreach (\\\$this->observers as \\\$obs) {
            \\\$obs->update(\\\$this);
        }
    }

    public function setPrice(float \\\$price): void {
        \\\$this->price = \\\$price;
        \\\$this->notify();
    }

    public function getPrice(): float { return \\\$this->price; }
}`,
      hints: [
        'After changing state, observers must be notified',
        'Call \$this->notify() after updating the price',
        'This is the core mechanism of the observer pattern',
      ],
      concepts: ['observer', 'notify', 'debugging'],
    },
    {
      id: 'php-observer-15',
      title: 'Fix Infinite Loop in Observer',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Fix the observer that triggers an infinite loop by setting state in its update method.',
      skeleton: `<?php
class AutoAdjuster implements \\SplObserver {
    public function update(\\SplSubject \\\$subject): void {
        // Bug: setting state triggers notify() which calls update() again
        if (\\\$subject->getPrice() > 100) {
            \\\$subject->setPrice(100); // This triggers notify -> update -> infinite loop
        }
    }
}`,
      solution: `<?php
class AutoAdjuster implements \\SplObserver {
    private bool \\\$adjusting = false;

    public function update(\\SplSubject \\\$subject): void {
        if (\\\$this->adjusting) {
            return;
        }
        if (\\\$subject->getPrice() > 100) {
            \\\$this->adjusting = true;
            \\\$subject->setPrice(100);
            \\\$this->adjusting = false;
        }
    }
}`,
      hints: [
        'Setting state in update() causes a recursive notification cycle',
        'Use a guard flag to prevent re-entrance',
        'Set the flag before the state change, clear it after',
      ],
      concepts: ['infinite-loop', 'observer', 'guard-flag'],
    },
    {
      id: 'php-observer-16',
      title: 'Predict Observer Notification Order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the output order of observer notifications.',
      skeleton: `<?php
class Subject implements \\SplSubject {
    private array \\\$obs = [];
    public function attach(\\SplObserver \\\$o): void { \\\$this->obs[] = \\\$o; }
    public function detach(\\SplObserver \\\$o): void {}
    public function notify(): void {
        foreach (\\\$this->obs as \\\$o) { \\\$o->update(\\\$this); }
    }
}
class A implements \\SplObserver {
    public function update(\\SplSubject \\\$s): void { echo "A "; }
}
class B implements \\SplObserver {
    public function update(\\SplSubject \\\$s): void { echo "B "; }
}

\\\$s = new Subject();
\\\$s->attach(new A());
\\\$s->attach(new B());
\\\$s->attach(new A());
\\\$s->notify();`,
      solution: `A B A `,
      hints: [
        'Observers are called in the order they were attached',
        'Three observers are attached: A, B, A',
        'Each prints its letter followed by a space',
      ],
      concepts: ['observer', 'notification-order'],
    },
    {
      id: 'php-observer-17',
      title: 'Predict Event Dispatch Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the output of dispatching multiple events.',
      skeleton: `<?php
\\\$d = new EventDispatcher();
\\\$d->listen('a', fn() => print "1 ");
\\\$d->listen('b', fn() => print "2 ");
\\\$d->listen('a', fn() => print "3 ");

\\\$d->dispatch('a');
\\\$d->dispatch('b');`,
      solution: `1 3 2 `,
      hints: [
        'Dispatching "a" triggers listeners registered for "a"',
        'Two listeners are registered for "a": printing 1 and 3',
        'Then "b" triggers its listener printing 2',
      ],
      concepts: ['event-dispatcher', 'multiple-listeners'],
    },
    {
      id: 'php-observer-18',
      title: 'Predict Detach Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the output after detaching an observer.',
      skeleton: `<?php
class Subj implements \\SplSubject {
    private array \\\$obs = [];
    public function attach(\\SplObserver \\\$o): void {
        \\\$this->obs[spl_object_id(\\\$o)] = \\\$o;
    }
    public function detach(\\SplObserver \\\$o): void {
        unset(\\\$this->obs[spl_object_id(\\\$o)]);
    }
    public function notify(): void {
        foreach (\\\$this->obs as \\\$o) { \\\$o->update(\\\$this); }
    }
}
class Printer implements \\SplObserver {
    public function __construct(private string \\\$label) {}
    public function update(\\SplSubject \\\$s): void { echo \\\$this->label; }
}

\\\$s = new Subj();
\\\$x = new Printer('X');
\\\$y = new Printer('Y');
\\\$s->attach(\\\$x);
\\\$s->attach(\\\$y);
\\\$s->notify();
\\\$s->detach(\\\$x);
\\\$s->notify();`,
      solution: `XYY`,
      hints: [
        'First notify: both X and Y are attached, prints XY',
        'After detaching X, only Y remains',
        'Second notify: prints Y',
      ],
      concepts: ['observer', 'detach', 'notification'],
    },
    {
      id: 'php-observer-19',
      title: 'Refactor Tight Coupling to Observer',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the tightly coupled code where UserService directly calls email, analytics, and cache services into an observer pattern.',
      skeleton: `<?php
class UserService {
    public function __construct(
        private EmailService \\\$email,
        private Analytics \\\$analytics,
        private CacheService \\\$cache
    ) {}

    public function register(string \\\$name, string \\\$email): void {
        // Save user...
        \\\$this->email->sendWelcome(\\\$email);
        \\\$this->analytics->track('user.registered', ['email' => \\\$email]);
        \\\$this->cache->invalidate('users');
    }
}`,
      solution: `<?php
class UserRegisteredEvent {
    public function __construct(
        public readonly string \\\$name,
        public readonly string \\\$email
    ) {}
}

class UserService {
    public function __construct(
        private EventDispatcher \\\$events
    ) {}

    public function register(string \\\$name, string \\\$email): void {
        // Save user...
        \\\$this->events->dispatch('user.registered', new UserRegisteredEvent(\\\$name, \\\$email));
    }
}

// Register listeners separately:
// \\\$events->listen('user.registered', [\\\$emailService, 'onUserRegistered']);
// \\\$events->listen('user.registered', [\\\$analytics, 'onUserRegistered']);
// \\\$events->listen('user.registered', [\\\$cacheService, 'onUserRegistered']);`,
      hints: [
        'Replace direct service calls with event dispatching',
        'Create an event object to carry the data',
        'Register each service as a listener for the event',
      ],
      concepts: ['observer', 'decoupling', 'refactoring'],
    },
    {
      id: 'php-observer-20',
      title: 'Refactor Callbacks to Event Subscriber',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the inline closures into a proper EventSubscriber class.',
      skeleton: `<?php
\\\$dispatcher = new EventDispatcher();

\\\$dispatcher->listen('order.created', function(array \\\$data) {
    echo "Sending confirmation email for order #" . \\\$data['id'];
});

\\\$dispatcher->listen('order.created', function(array \\\$data) {
    echo "Updating inventory for order #" . \\\$data['id'];
});

\\\$dispatcher->listen('order.cancelled', function(array \\\$data) {
    echo "Processing refund for order #" . \\\$data['id'];
});

\\\$dispatcher->listen('order.cancelled', function(array \\\$data) {
    echo "Restoring inventory for order #" . \\\$data['id'];
});`,
      solution: `<?php
interface EventSubscriberInterface {
    public static function getSubscribedEvents(): array;
}

class OrderSubscriber implements EventSubscriberInterface {
    public static function getSubscribedEvents(): array {
        return [
            'order.created' => ['onOrderCreated', 'onOrderCreatedInventory'],
            'order.cancelled' => ['onOrderCancelled', 'onOrderCancelledInventory'],
        ];
    }

    public function onOrderCreated(array \\\$data): void {
        echo "Sending confirmation email for order #" . \\\$data['id'];
    }

    public function onOrderCreatedInventory(array \\\$data): void {
        echo "Updating inventory for order #" . \\\$data['id'];
    }

    public function onOrderCancelled(array \\\$data): void {
        echo "Processing refund for order #" . \\\$data['id'];
    }

    public function onOrderCancelledInventory(array \\\$data): void {
        echo "Restoring inventory for order #" . \\\$data['id'];
    }
}

\\\$subscriber = new OrderSubscriber();
foreach (\\\$subscriber::getSubscribedEvents() as \\\$event => \\\$methods) {
    foreach ((array) \\\$methods as \\\$method) {
        \\\$dispatcher->listen(\\\$event, [\\\$subscriber, \\\$method]);
    }
}`,
      hints: [
        'Group related listeners into a subscriber class',
        'getSubscribedEvents maps event names to method names',
        'Register the subscriber methods with the dispatcher',
      ],
      concepts: ['event-subscriber', 'refactoring', 'organization'],
    },
  ],
};
