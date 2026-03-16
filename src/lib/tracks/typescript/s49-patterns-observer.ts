import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-observer',
  title: '49. Design Pattern: Observer & Events',
  explanation: `## Design Pattern: Observer & Events

The Observer pattern defines a one-to-many dependency between objects. When one object changes state, all its dependents are notified.

### Core Concepts
- **Subject/Observable**: The object being watched.
- **Observer/Listener**: Objects that react to changes.
- **Event Map**: A typed mapping of event names to payload types.
- **Subscription**: The connection between subject and observer.

### Basic Pattern
\\\`\\\`\\\`typescript
type Listener<T> = (data: T) => void;

class EventEmitter<T> {
  private listeners: Listener<T>[] = [];
  on(listener: Listener<T>) { this.listeners.push(listener); }
  emit(data: T) { this.listeners.forEach(fn => fn(data)); }
}
\\\`\\\`\\\`

### Typed Event Map
\\\`\\\`\\\`typescript
interface Events {
  click: { x: number; y: number };
  keypress: { key: string };
}

class TypedEmitter<E extends Record<string, any>> {
  on<K extends keyof E>(event: K, listener: (data: E[K]) => void): void { ... }
  emit<K extends keyof E>(event: K, data: E[K]): void { ... }
}
\\\`\\\`\\\`

### Key Considerations
- Always provide an unsubscribe mechanism to prevent memory leaks.
- Consider once-listeners for events that should only fire once.
- Use WeakRef for observers when the subject should not prevent garbage collection.
`,
  exercises: [
    {
      id: 'ts-observer-1',
      title: 'Basic observer pattern',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the type of the listener callback in this basic observer.',
      skeleton: `type Listener<T> = __BLANK__;

class Observable<T> {
  private listeners: Listener<T>[] = [];

  subscribe(listener: Listener<T>): void {
    this.listeners.push(listener);
  }

  notify(data: T): void {
    this.listeners.forEach(fn => fn(data));
  }
}

const obs = new Observable<string>();
obs.subscribe((msg) => console.log(msg));
obs.notify("hello");`,
      solution: `type Listener<T> = (data: T) => void;

class Observable<T> {
  private listeners: Listener<T>[] = [];

  subscribe(listener: Listener<T>): void {
    this.listeners.push(listener);
  }

  notify(data: T): void {
    this.listeners.forEach(fn => fn(data));
  }
}

const obs = new Observable<string>();
obs.subscribe((msg) => console.log(msg));
obs.notify("hello");`,
      hints: [
        'A listener is a function that receives data and returns nothing.',
        'The type signature is a function from T to void.',
        'The answer is: (data: T) => void',
      ],
      concepts: ['basic observer pattern', 'callback types', 'generic listeners'],
    },
    {
      id: 'ts-observer-2',
      title: 'Unsubscribe pattern',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the subscribe method to return an unsubscribe function.',
      skeleton: `class EventEmitter<T> {
  private listeners = new Set<(data: T) => void>();

  subscribe(listener: (data: T) => void): __BLANK__ {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  emit(data: T): void {
    this.listeners.forEach(fn => fn(data));
  }
}

const emitter = new EventEmitter<number>();
const unsub = emitter.subscribe((n) => console.log(n));
emitter.emit(42); // logs 42
unsub();
emitter.emit(99); // nothing logged`,
      solution: `class EventEmitter<T> {
  private listeners = new Set<(data: T) => void>();

  subscribe(listener: (data: T) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  emit(data: T): void {
    this.listeners.forEach(fn => fn(data));
  }
}

const emitter = new EventEmitter<number>();
const unsub = emitter.subscribe((n) => console.log(n));
emitter.emit(42); // logs 42
unsub();
emitter.emit(99); // nothing logged`,
      hints: [
        'The subscribe method returns a cleanup function.',
        'The cleanup function takes no arguments and returns nothing.',
        'The answer is: () => void',
      ],
      concepts: ['unsubscribe patterns', 'cleanup functions'],
    },
    {
      id: 'ts-observer-3',
      title: 'Typed event map',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the generic constraint so the emitter only accepts events defined in the event map.',
      skeleton: `interface EventMap {
  click: { x: number; y: number };
  keypress: { key: string };
  resize: { width: number; height: number };
}

class TypedEmitter<E extends __BLANK__> {
  private handlers = new Map<keyof E, Set<Function>>();

  on<K extends keyof E>(event: K, handler: (data: E[K]) => void): void {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event)!.add(handler);
  }

  emit<K extends keyof E>(event: K, data: E[K]): void {
    this.handlers.get(event)?.forEach(fn => fn(data));
  }
}

const emitter = new TypedEmitter<EventMap>();
emitter.on('click', (data) => console.log(data.x, data.y));`,
      solution: `interface EventMap {
  click: { x: number; y: number };
  keypress: { key: string };
  resize: { width: number; height: number };
}

class TypedEmitter<E extends Record<string, any>> {
  private handlers = new Map<keyof E, Set<Function>>();

  on<K extends keyof E>(event: K, handler: (data: E[K]) => void): void {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event)!.add(handler);
  }

  emit<K extends keyof E>(event: K, data: E[K]): void {
    this.handlers.get(event)?.forEach(fn => fn(data));
  }
}

const emitter = new TypedEmitter<EventMap>();
emitter.on('click', (data) => console.log(data.x, data.y));`,
      hints: [
        'E must be an object type mapping event names to payload types.',
        'Use Record<string, any> as the constraint.',
        'The answer is: Record<string, any>',
      ],
      concepts: ['typed event map', 'generic event system', 'constraints'],
    },
    {
      id: 'ts-observer-4',
      title: 'Predict: event handler type',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What is the type of "data" in the click handler? Write it exactly.',
      skeleton: `interface Events {
  click: { x: number; y: number };
  message: string;
}

class Emitter<E extends Record<string, any>> {
  on<K extends keyof E>(event: K, handler: (data: E[K]) => void): void {}
}

const e = new Emitter<Events>();
e.on('click', (data) => {
  // What is the type of data?
});`,
      solution: `{ x: number; y: number }`,
      hints: [
        'The handler receives E[K] where K is the event name.',
        'For "click", E["click"] is the click event type.',
        'The type is { x: number; y: number }.',
      ],
      concepts: ['event listener with types', 'generic inference'],
    },
    {
      id: 'ts-observer-5',
      title: 'Once listener',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the once method so it automatically removes the listener after the first call.',
      skeleton: `class EventEmitter<T> {
  private listeners = new Set<(data: T) => void>();

  on(listener: (data: T) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  once(listener: (data: T) => void): void {
    const wrapper = (data: T) => {
      __BLANK__;
      listener(data);
    };
    this.listeners.add(wrapper);
  }

  emit(data: T): void {
    this.listeners.forEach(fn => fn(data));
  }
}`,
      solution: `class EventEmitter<T> {
  private listeners = new Set<(data: T) => void>();

  on(listener: (data: T) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  once(listener: (data: T) => void): void {
    const wrapper = (data: T) => {
      this.listeners.delete(wrapper);
      listener(data);
    };
    this.listeners.add(wrapper);
  }

  emit(data: T): void {
    this.listeners.forEach(fn => fn(data));
  }
}`,
      hints: [
        'The wrapper needs to remove itself from the listener set.',
        'Delete the wrapper before calling the original listener.',
        'The answer is: this.listeners.delete(wrapper)',
      ],
      concepts: ['once listeners', 'self-removing handlers'],
    },
    {
      id: 'ts-observer-6',
      title: 'Write: typed EventEmitter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a full TypedEventEmitter with on, off, once, and emit methods. It should be generic over an event map.',
      skeleton: `// Write the TypedEventEmitter
`,
      solution: `type EventMap = Record<string, any>;
type Handler<T> = (data: T) => void;

class TypedEventEmitter<E extends EventMap> {
  private handlers = new Map<keyof E, Set<Handler<any>>>();

  on<K extends keyof E>(event: K, handler: Handler<E[K]>): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler);
    return () => this.off(event, handler);
  }

  off<K extends keyof E>(event: K, handler: Handler<E[K]>): void {
    this.handlers.get(event)?.delete(handler);
  }

  once<K extends keyof E>(event: K, handler: Handler<E[K]>): void {
    const wrapper: Handler<E[K]> = (data) => {
      this.off(event, wrapper);
      handler(data);
    };
    this.on(event, wrapper);
  }

  emit<K extends keyof E>(event: K, data: E[K]): void {
    this.handlers.get(event)?.forEach(fn => fn(data));
  }
}

interface AppEvents {
  login: { userId: string };
  logout: undefined;
  error: { message: string; code: number };
}

const bus = new TypedEventEmitter<AppEvents>();
bus.on('login', (data) => console.log(data.userId));
bus.once('error', (data) => console.log(data.message));`,
      hints: [
        'Use a Map of Sets to store handlers per event.',
        'Each method is generic over K extends keyof E.',
        'on() returns an unsubscribe function.',
      ],
      concepts: ['EventEmitter implementation', 'typed event map', 'generic event system'],
    },
    {
      id: 'ts-observer-7',
      title: 'Write: pub/sub pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a typed publish/subscribe message bus where publishers and subscribers are decoupled. Include a topic-based routing system.',
      skeleton: `// Write the pub/sub system
`,
      solution: `type Subscriber<T> = (message: T) => void;

interface MessageBus {
  publish<T>(topic: string, message: T): void;
  subscribe<T>(topic: string, subscriber: Subscriber<T>): () => void;
}

function createMessageBus(): MessageBus {
  const topics = new Map<string, Set<Subscriber<any>>>();

  return {
    publish<T>(topic: string, message: T): void {
      topics.get(topic)?.forEach(sub => sub(message));
    },
    subscribe<T>(topic: string, subscriber: Subscriber<T>): () => void {
      if (!topics.has(topic)) topics.set(topic, new Set());
      topics.get(topic)!.add(subscriber);
      return () => topics.get(topic)?.delete(subscriber);
    },
  };
}

const bus = createMessageBus();
const unsub = bus.subscribe<{ name: string }>('user.created', (msg) => {
  console.log(\\\`New user: \${msg.name}\\\`);
});
bus.publish('user.created', { name: 'Zan' });
unsub();`,
      hints: [
        'The bus maps topic strings to sets of subscribers.',
        'publish() calls all subscribers for a given topic.',
        'subscribe() returns an unsubscribe function.',
      ],
      concepts: ['pub/sub pattern', 'message bus', 'topic routing'],
    },
    {
      id: 'ts-observer-8',
      title: 'Reactive values (signals)',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a reactive Signal<T> class that notifies subscribers when its value changes. Include get(), set(), and subscribe() methods.',
      skeleton: `// Write the Signal class
`,
      solution: `type Subscriber<T> = (value: T, prev: T) => void;

class Signal<T> {
  private subscribers = new Set<Subscriber<T>>();
  private _value: T;

  constructor(initial: T) {
    this._value = initial;
  }

  get(): T {
    return this._value;
  }

  set(newValue: T): void {
    const prev = this._value;
    if (prev === newValue) return;
    this._value = newValue;
    this.subscribers.forEach(sub => sub(newValue, prev));
  }

  subscribe(subscriber: Subscriber<T>): () => void {
    this.subscribers.add(subscriber);
    return () => this.subscribers.delete(subscriber);
  }
}

const count = new Signal(0);
const unsub = count.subscribe((val, prev) => {
  console.log(\\\`Changed from \${prev} to \${val}\\\`);
});
count.set(1); // "Changed from 0 to 1"
count.set(1); // No notification (same value)
count.set(2); // "Changed from 1 to 2"
unsub();`,
      hints: [
        'Store the value internally and notify on changes.',
        'Skip notification if the new value equals the current value.',
        'Subscribers receive both the new and previous values.',
      ],
      concepts: ['reactive values', 'signals concept', 'change detection'],
    },
    {
      id: 'ts-observer-9',
      title: 'Computed values',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a Computed<T> class that derives its value from one or more Signals and automatically updates when dependencies change.',
      skeleton: `// Assume Signal<T> exists with get(), set(), subscribe()
// Write the Computed class
`,
      solution: `type Subscriber<T> = (value: T, prev: T) => void;

class Signal<T> {
  private subscribers = new Set<Subscriber<T>>();
  private _value: T;
  constructor(initial: T) { this._value = initial; }
  get(): T { return this._value; }
  set(newValue: T): void {
    const prev = this._value;
    if (prev === newValue) return;
    this._value = newValue;
    this.subscribers.forEach(sub => sub(newValue, prev));
  }
  subscribe(subscriber: Subscriber<T>): () => void {
    this.subscribers.add(subscriber);
    return () => this.subscribers.delete(subscriber);
  }
}

class Computed<T> {
  private _value: T;
  private subscribers = new Set<Subscriber<T>>();
  private cleanups: (() => void)[] = [];

  constructor(private compute: () => T, deps: Signal<any>[]) {
    this._value = compute();
    for (const dep of deps) {
      const unsub = dep.subscribe(() => {
        const prev = this._value;
        this._value = this.compute();
        if (prev !== this._value) {
          this.subscribers.forEach(sub => sub(this._value, prev));
        }
      });
      this.cleanups.push(unsub);
    }
  }

  get(): T { return this._value; }

  subscribe(subscriber: Subscriber<T>): () => void {
    this.subscribers.add(subscriber);
    return () => this.subscribers.delete(subscriber);
  }

  dispose(): void {
    this.cleanups.forEach(fn => fn());
  }
}

const a = new Signal(2);
const b = new Signal(3);
const sum = new Computed(() => a.get() + b.get(), [a, b]);
console.log(sum.get()); // 5
a.set(10);
console.log(sum.get()); // 13`,
      hints: [
        'Computed subscribes to all dependency signals.',
        'When any dependency changes, recompute the value.',
        'Include a dispose() method to clean up subscriptions.',
      ],
      concepts: ['computed values', 'derived state', 'dependency tracking'],
    },
    {
      id: 'ts-observer-10',
      title: 'Fix: memory leak in observer',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix this code that creates a memory leak because listeners are never cleaned up when components are destroyed.',
      skeleton: `class DataStore {
  private listeners: ((data: string[]) => void)[] = [];
  private data: string[] = [];

  subscribe(listener: (data: string[]) => void) {
    this.listeners.push(listener);
    // Bug: no way to unsubscribe!
  }

  add(item: string) {
    this.data.push(item);
    this.listeners.forEach(fn => fn([...this.data]));
  }
}

const store = new DataStore();

function createComponent() {
  // This listener is never cleaned up
  store.subscribe((data) => console.log(data));
}

createComponent(); // Leaks!
createComponent(); // Leaks more!`,
      solution: `class DataStore {
  private listeners = new Set<(data: string[]) => void>();
  private data: string[] = [];

  subscribe(listener: (data: string[]) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  add(item: string): void {
    this.data.push(item);
    this.listeners.forEach(fn => fn([...this.data]));
  }
}

const store = new DataStore();

function createComponent(): () => void {
  const unsub = store.subscribe((data) => console.log(data));
  // Return cleanup function
  return unsub;
}

const destroy1 = createComponent();
const destroy2 = createComponent();
destroy1(); // Cleans up first listener
destroy2(); // Cleans up second listener`,
      hints: [
        'subscribe() must return an unsubscribe function.',
        'Use a Set instead of an array for O(1) deletion.',
        'Components must store and call the cleanup function when destroyed.',
      ],
      concepts: ['memory leak prevention', 'unsubscribe patterns', 'effect/subscription cleanup'],
    },
    {
      id: 'ts-observer-11',
      title: 'Event bus pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a singleton event bus with full type safety. The bus should be generic over a global event map and support wildcards (*) to listen to all events.',
      skeleton: `// Write the typed event bus
`,
      solution: `interface AppEvents {
  'user:login': { userId: string; timestamp: number };
  'user:logout': { userId: string };
  'app:error': { message: string; stack?: string };
  'app:ready': undefined;
}

type Handler<T> = (data: T) => void;

class EventBus<E extends Record<string, any>> {
  private handlers = new Map<string, Set<Handler<any>>>();
  private wildcardHandlers = new Set<Handler<{ event: string; data: any }>>();

  on<K extends keyof E & string>(event: K, handler: Handler<E[K]>): () => void {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event)!.add(handler);
    return () => this.handlers.get(event)?.delete(handler);
  }

  onAny(handler: Handler<{ event: string; data: any }>): () => void {
    this.wildcardHandlers.add(handler);
    return () => this.wildcardHandlers.delete(handler);
  }

  emit<K extends keyof E & string>(event: K, data: E[K]): void {
    this.handlers.get(event)?.forEach(fn => fn(data));
    this.wildcardHandlers.forEach(fn => fn({ event, data }));
  }
}

const bus = new EventBus<AppEvents>();
bus.on('user:login', (data) => console.log(data.userId));
bus.onAny(({ event, data }) => console.log(\\\`[LOG] \${event}\\\`, data));
bus.emit('user:login', { userId: 'zan', timestamp: Date.now() });`,
      hints: [
        'Use onAny() for wildcard listeners that receive all events.',
        'Wildcard handlers get both the event name and data.',
        'Regular handlers are type-safe per event key.',
      ],
      concepts: ['event bus pattern', 'wildcard listeners', 'singleton pattern'],
    },
    {
      id: 'ts-observer-12',
      title: 'Predict: notification order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What is the output? Write each line separated by commas.',
      skeleton: `class Emitter {
  private listeners: ((n: number) => void)[] = [];
  on(fn: (n: number) => void) { this.listeners.push(fn); }
  emit(n: number) { this.listeners.forEach(fn => fn(n)); }
}

const e = new Emitter();
e.on((n) => console.log('A:' + n));
e.on((n) => console.log('B:' + n));
e.emit(1);
e.on((n) => console.log('C:' + n));
e.emit(2);`,
      solution: `A:1, B:1, A:2, B:2, C:2`,
      hints: [
        'Listeners fire in the order they were registered.',
        'First emit: A and B are registered.',
        'Second emit: A, B, and C are all registered.',
      ],
      concepts: ['notification order', 'listener registration'],
    },
    {
      id: 'ts-observer-13',
      title: 'Mediator pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a Mediator that coordinates communication between components. Components register with the mediator and send messages through it rather than directly to each other.',
      skeleton: `// Write the Mediator pattern
`,
      solution: `interface Component {
  name: string;
  receive(from: string, message: string): void;
}

class Mediator {
  private components = new Map<string, Component>();

  register(component: Component): void {
    this.components.set(component.name, component);
  }

  send(from: string, to: string, message: string): void {
    const target = this.components.get(to);
    if (target) {
      target.receive(from, message);
    }
  }

  broadcast(from: string, message: string): void {
    this.components.forEach((component, name) => {
      if (name !== from) {
        component.receive(from, message);
      }
    });
  }
}

const mediator = new Mediator();

const chatBox: Component = {
  name: 'chatBox',
  receive(from, msg) { console.log(\\\`[\${from}] \${msg}\\\`); },
};

const userList: Component = {
  name: 'userList',
  receive(from, msg) { console.log(\\\`UserList got from \${from}: \${msg}\\\`); },
};

mediator.register(chatBox);
mediator.register(userList);
mediator.send('chatBox', 'userList', 'User joined');
mediator.broadcast('system', 'Server restarting');`,
      hints: [
        'Components register themselves with the mediator.',
        'send() delivers to a specific component by name.',
        'broadcast() sends to all components except the sender.',
      ],
      concepts: ['mediator pattern', 'decoupled communication', 'component coordination'],
    },
    {
      id: 'ts-observer-14',
      title: 'Observer with generics',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a generic ObservableMap<K, V> that extends Map functionality and notifies observers on set, delete, and clear operations.',
      skeleton: `// Write the ObservableMap
`,
      solution: `type MapEvent<K, V> =
  | { type: 'set'; key: K; value: V }
  | { type: 'delete'; key: K }
  | { type: 'clear' };

class ObservableMap<K, V> {
  private map = new Map<K, V>();
  private listeners = new Set<(event: MapEvent<K, V>) => void>();

  on(listener: (event: MapEvent<K, V>) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(event: MapEvent<K, V>): void {
    this.listeners.forEach(fn => fn(event));
  }

  set(key: K, value: V): this {
    this.map.set(key, value);
    this.notify({ type: 'set', key, value });
    return this;
  }

  get(key: K): V | undefined {
    return this.map.get(key);
  }

  delete(key: K): boolean {
    const result = this.map.delete(key);
    if (result) this.notify({ type: 'delete', key });
    return result;
  }

  clear(): void {
    this.map.clear();
    this.notify({ type: 'clear' });
  }

  get size(): number { return this.map.size; }
}

const users = new ObservableMap<string, { name: string }>();
users.on((event) => console.log(event.type, event));
users.set('1', { name: 'Zan' });`,
      hints: [
        'Wrap a Map and intercept mutating operations.',
        'Define event types as a discriminated union.',
        'Notify listeners after each mutation.',
      ],
      concepts: ['observer with generics', 'observable collections', 'event types'],
    },
    {
      id: 'ts-observer-15',
      title: 'Fix: batched notifications',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Fix this store that notifies on every single change. Add batching so multiple changes trigger only one notification.',
      skeleton: `class Store<T extends Record<string, any>> {
  private state: T;
  private listeners = new Set<(state: T) => void>();

  constructor(initial: T) {
    this.state = { ...initial };
  }

  subscribe(listener: (state: T) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  set<K extends keyof T>(key: K, value: T[K]): void {
    this.state[key] = value;
    // Bug: fires for every single set call!
    this.listeners.forEach(fn => fn({ ...this.state }));
  }
}

const store = new Store({ a: 1, b: 2, c: 3 });
store.subscribe((s) => console.log('Updated!', s));
// This triggers 3 separate notifications:
store.set('a', 10);
store.set('b', 20);
store.set('c', 30);`,
      solution: `class Store<T extends Record<string, any>> {
  private state: T;
  private listeners = new Set<(state: T) => void>();
  private batchDepth = 0;
  private pendingNotify = false;

  constructor(initial: T) {
    this.state = { ...initial };
  }

  subscribe(listener: (state: T) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    if (this.batchDepth > 0) {
      this.pendingNotify = true;
      return;
    }
    this.listeners.forEach(fn => fn({ ...this.state }));
  }

  set<K extends keyof T>(key: K, value: T[K]): void {
    this.state[key] = value;
    this.notify();
  }

  batch(fn: () => void): void {
    this.batchDepth++;
    try {
      fn();
    } finally {
      this.batchDepth--;
      if (this.batchDepth === 0 && this.pendingNotify) {
        this.pendingNotify = false;
        this.listeners.forEach(fn => fn({ ...this.state }));
      }
    }
  }
}

const store = new Store({ a: 1, b: 2, c: 3 });
store.subscribe((s) => console.log('Updated!', s));
// Only one notification:
store.batch(() => {
  store.set('a', 10);
  store.set('b', 20);
  store.set('c', 30);
});`,
      hints: [
        'Add a batch() method that defers notifications.',
        'Track batch depth to support nested batches.',
        'Only notify after the outermost batch completes.',
      ],
      concepts: ['batched notifications', 'performance optimization', 'transaction pattern'],
    },
    {
      id: 'ts-observer-16',
      title: 'Priority observers',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write an event system where listeners have priorities. Higher priority listeners fire first. Include the ability to stop propagation.',
      skeleton: `// Write the priority event system
`,
      solution: `interface PriorityHandler<T> {
  handler: (data: T, stop: () => void) => void;
  priority: number;
}

class PriorityEmitter<T> {
  private handlers: PriorityHandler<T>[] = [];

  on(handler: (data: T, stop: () => void) => void, priority = 0): () => void {
    const entry: PriorityHandler<T> = { handler, priority };
    this.handlers.push(entry);
    this.handlers.sort((a, b) => b.priority - a.priority);
    return () => {
      const idx = this.handlers.indexOf(entry);
      if (idx >= 0) this.handlers.splice(idx, 1);
    };
  }

  emit(data: T): void {
    let stopped = false;
    const stop = () => { stopped = true; };

    for (const entry of this.handlers) {
      if (stopped) break;
      entry.handler(data, stop);
    }
  }
}

const emitter = new PriorityEmitter<string>();
emitter.on((msg) => console.log('Low:', msg), 0);
emitter.on((msg, stop) => {
  console.log('High:', msg);
  if (msg === 'secret') stop();
}, 10);
emitter.on((msg) => console.log('Mid:', msg), 5);

emitter.emit('hello');  // High, Mid, Low
emitter.emit('secret'); // High only (stopped)`,
      hints: [
        'Sort handlers by priority (descending) when inserting.',
        'Pass a stop() callback to each handler.',
        'Break the loop if stop() is called.',
      ],
      concepts: ['priority observers', 'event propagation', 'stop propagation'],
    },
    {
      id: 'ts-observer-17',
      title: 'Weak reference observers',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write an observer system using WeakRef so that observers can be garbage collected. The subject automatically cleans up dead references.',
      skeleton: `// Write the WeakRef observer system
`,
      solution: `interface Observer<T> {
  update(data: T): void;
}

class WeakObservable<T> {
  private observers = new Set<WeakRef<Observer<T>>>();
  private cleanupRegistry = new FinalizationRegistry<WeakRef<Observer<T>>>((ref) => {
    this.observers.delete(ref);
  });

  subscribe(observer: Observer<T>): void {
    const ref = new WeakRef(observer);
    this.observers.add(ref);
    this.cleanupRegistry.register(observer, ref);
  }

  notify(data: T): void {
    for (const ref of this.observers) {
      const observer = ref.deref();
      if (observer) {
        observer.update(data);
      } else {
        this.observers.delete(ref);
      }
    }
  }

  get count(): number {
    // Clean up dead refs while counting
    let count = 0;
    for (const ref of this.observers) {
      if (ref.deref()) count++;
      else this.observers.delete(ref);
    }
    return count;
  }
}

const observable = new WeakObservable<string>();
let observer: Observer<string> | null = {
  update(data) { console.log('Got:', data); }
};
observable.subscribe(observer);
observable.notify('hello'); // "Got: hello"
observer = null; // Observer can be GC'd`,
      hints: [
        'Store observers as WeakRef to allow garbage collection.',
        'Use FinalizationRegistry for automatic cleanup.',
        'Check deref() before calling update; remove dead refs.',
      ],
      concepts: ['weak reference observers', 'memory leak prevention', 'FinalizationRegistry'],
    },
    {
      id: 'ts-observer-18',
      title: 'Predict: subscription cleanup',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'What is the output? Write each logged value separated by commas.',
      skeleton: `class Signal<T> {
  private subs = new Set<(v: T) => void>();
  constructor(private value: T) {}
  get() { return this.value; }
  set(v: T) { this.value = v; this.subs.forEach(fn => fn(v)); }
  sub(fn: (v: T) => void) {
    this.subs.add(fn);
    return () => this.subs.delete(fn);
  }
}

const s = new Signal(0);
const u1 = s.sub(v => console.log('A:' + v));
const u2 = s.sub(v => console.log('B:' + v));
s.set(1);
u1();
s.set(2);
u2();
s.set(3);`,
      solution: `A:1, B:1, B:2`,
      hints: [
        'After set(1): both A and B fire.',
        'u1() removes A. After set(2): only B fires.',
        'u2() removes B. After set(3): no listeners.',
      ],
      concepts: ['subscription cleanup', 'unsubscribe behavior'],
    },
    {
      id: 'ts-observer-19',
      title: 'Refactor: callback hell to event system',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this callback-based API into a clean event-driven system.',
      skeleton: `class DataLoader {
  private onSuccessCallback: ((data: any) => void) | null = null;
  private onErrorCallback: ((error: Error) => void) | null = null;
  private onProgressCallback: ((percent: number) => void) | null = null;
  private onCompleteCallback: (() => void) | null = null;

  onSuccess(cb: (data: any) => void) { this.onSuccessCallback = cb; }
  onError(cb: (error: Error) => void) { this.onErrorCallback = cb; }
  onProgress(cb: (percent: number) => void) { this.onProgressCallback = cb; }
  onComplete(cb: () => void) { this.onCompleteCallback = cb; }

  async load(url: string) {
    try {
      this.onProgressCallback?.(0);
      const data = await fetch(url).then(r => r.json());
      this.onProgressCallback?.(100);
      this.onSuccessCallback?.(data);
    } catch (e) {
      this.onErrorCallback?.(e as Error);
    } finally {
      this.onCompleteCallback?.();
    }
  }
}`,
      solution: `interface LoaderEvents {
  success: { data: unknown };
  error: { error: Error };
  progress: { percent: number };
  complete: undefined;
}

type Handler<T> = (data: T) => void;

class DataLoader {
  private handlers = new Map<keyof LoaderEvents, Set<Handler<any>>>();

  on<K extends keyof LoaderEvents>(
    event: K,
    handler: Handler<LoaderEvents[K]>
  ): () => void {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event)!.add(handler);
    return () => this.handlers.get(event)?.delete(handler);
  }

  private emit<K extends keyof LoaderEvents>(event: K, data: LoaderEvents[K]): void {
    this.handlers.get(event)?.forEach(fn => fn(data));
  }

  async load(url: string): Promise<void> {
    try {
      this.emit('progress', { percent: 0 });
      const data = await fetch(url).then(r => r.json());
      this.emit('progress', { percent: 100 });
      this.emit('success', { data });
    } catch (e) {
      this.emit('error', { error: e as Error });
    } finally {
      this.emit('complete', undefined as any);
    }
  }
}

const loader = new DataLoader();
const unsub1 = loader.on('success', ({ data }) => console.log(data));
const unsub2 = loader.on('progress', ({ percent }) => console.log(\\\`\${percent}%\\\`));
// Multiple listeners, easy cleanup
unsub1();
unsub2();`,
      hints: [
        'Replace individual callback properties with a typed event system.',
        'Define an event map interface for all events.',
        'Each on() call returns an unsubscribe function.',
      ],
      concepts: ['practical observer implementations', 'refactoring', 'event-driven architecture'],
    },
    {
      id: 'ts-observer-20',
      title: 'Refactor: build a reactive store',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this mutable state object into a Svelte-like reactive store with subscribe, set, and update methods.',
      skeleton: `// Current: mutable global state
const appState = {
  count: 0,
  user: null as { name: string } | null,
  theme: 'dark' as 'dark' | 'light',
};

// Direct mutation everywhere
appState.count++;
appState.user = { name: 'Zan' };
appState.theme = 'light';

// No way to react to changes!`,
      solution: `type Subscriber<T> = (value: T) => void;
type Updater<T> = (current: T) => T;

interface Writable<T> {
  subscribe(subscriber: Subscriber<T>): () => void;
  set(value: T): void;
  update(updater: Updater<T>): void;
  get(): T;
}

function writable<T>(initial: T): Writable<T> {
  let value = initial;
  const subscribers = new Set<Subscriber<T>>();

  return {
    subscribe(subscriber: Subscriber<T>): () => void {
      subscribers.add(subscriber);
      subscriber(value); // Emit current value immediately
      return () => subscribers.delete(subscriber);
    },
    set(newValue: T): void {
      if (value === newValue) return;
      value = newValue;
      subscribers.forEach(fn => fn(value));
    },
    update(updater: Updater<T>): void {
      const newValue = updater(value);
      if (value === newValue) return;
      value = newValue;
      subscribers.forEach(fn => fn(value));
    },
    get(): T {
      return value;
    },
  };
}

// Usage: reactive stores
const count = writable(0);
const user = writable<{ name: string } | null>(null);
const theme = writable<'dark' | 'light'>('dark');

const unsub = count.subscribe((n) => console.log('Count:', n)); // Logs: Count: 0
count.update(n => n + 1); // Logs: Count: 1
count.set(10);            // Logs: Count: 10
user.set({ name: 'Zan' });
theme.set('light');
unsub(); // Stop listening`,
      hints: [
        'Create a writable() factory that returns subscribe, set, and update methods.',
        'subscribe() should emit the current value immediately (Svelte convention).',
        'update() receives a function that transforms the current value.',
      ],
      concepts: ['practical observer implementations', 'reactive store', 'Svelte-like stores'],
    },
  ],
};
