import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-patterns',
  title: '44. Design Patterns',
  explanation: `## Design Patterns

Design patterns are proven solutions to recurring software design problems. JavaScript's flexibility enables both classic OOP patterns and unique variations.

\`\`\`javascript
// Singleton -- one instance
class DB {
  static #instance;
  static getInstance() {
    return (this.#instance ??= new DB());
  }
}

// Observer -- notify subscribers of changes
class EventEmitter {
  #listeners = new Map();
  on(event, fn) { /* ... */ }
  emit(event, data) { /* ... */ }
}

// Strategy -- swap algorithms at runtime
const sorters = {
  bubble: (arr) => { /* ... */ },
  quick: (arr) => { /* ... */ },
  merge: (arr) => { /* ... */ },
};
function sort(arr, strategy = 'quick') {
  return sorters[strategy](arr);
}

// Factory -- create objects without specifying exact class
function createShape(type, opts) {
  switch (type) {
    case 'circle': return new Circle(opts);
    case 'rect': return new Rect(opts);
  }
}
\`\`\`

Patterns help communicate intent and structure, but avoid over-engineering -- only apply them when the problem calls for it.`,
  exercises: [
    {
      id: 'js-patterns-1',
      title: 'Singleton Pattern',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to implement the singleton pattern using a static private field.',
      skeleton: `class AppConfig {
  __BLANK__ #instance;
  #settings = {};

  constructor() {
    if (AppConfig.#instance) {
      throw new Error('Use AppConfig.getInstance()');
    }
  }

  static getInstance() {
    return (AppConfig.__BLANK__ ??= new AppConfig());
  }

  set(key, value) { this.#settings[key] = value; }
  get(key) { return this.#settings[key]; }
}

const a = AppConfig.__BLANK__;
const b = AppConfig.getInstance();
console.log(a === b); // true`,
      solution: `class AppConfig {
  static #instance;
  #settings = {};

  constructor() {
    if (AppConfig.#instance) {
      throw new Error('Use AppConfig.getInstance()');
    }
  }

  static getInstance() {
    return (AppConfig.#instance ??= new AppConfig());
  }

  set(key, value) { this.#settings[key] = value; }
  get(key) { return this.#settings[key]; }
}

const a = AppConfig.getInstance();
const b = AppConfig.getInstance();
console.log(a === b); // true`,
      hints: [
        'The instance field must be static (belongs to the class, not instances) and private (#).',
        'Use ??= to assign a new instance only if #instance is null/undefined.',
        'Call getInstance() to get the singleton -- never use new directly.',
      ],
      concepts: ['singleton', 'static', 'private fields', 'nullish coalescing assignment'],
    },
    {
      id: 'js-patterns-2',
      title: 'Factory Pattern',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a factory function that creates different notification objects based on a type parameter.',
      skeleton: `function createNotification(type, message) {
  // Return an object with: type, message, icon, and a display() method
  // Types: 'info' (icon: 'i'), 'warning' (icon: '!'), 'error' (icon: 'x')
  // display() returns: "[icon] TYPE: message"



}

// Test:
// createNotification('error', 'File not found').display()
// => '[x] ERROR: File not found'`,
      solution: `function createNotification(type, message) {
  const icons = { info: 'i', warning: '!', error: 'x' };
  const icon = icons[type] ?? '?';

  return {
    type,
    message,
    icon,
    display() {
      return \`[\${this.icon}] \${this.type.toUpperCase()}: \${this.message}\`;
    },
  };
}

// Test:
// createNotification('error', 'File not found').display()
// => '[x] ERROR: File not found'`,
      hints: [
        'Use a lookup object for icons: { info: "i", warning: "!", error: "x" }.',
        'Return a plain object with all required properties.',
        'display() formats the string using template literals and toUpperCase().',
      ],
      concepts: ['factory pattern', 'object creation', 'lookup table'],
    },
    {
      id: 'js-patterns-3',
      title: 'Abstract Factory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write an abstract factory that creates families of related UI components (button, input, card) for different themes.',
      skeleton: `function createUIFactory(theme) {
  // Return a factory object with createButton(label), createInput(placeholder),
  // and createCard(title, content) methods.
  // 'light' theme: prefix components with 'Light'
  // 'dark' theme: prefix components with 'Dark'
  // Each method returns: { theme, component, ...props }



}

// Test:
// const ui = createUIFactory('dark');
// ui.createButton('Submit')
// => { theme: 'dark', component: 'DarkButton', label: 'Submit' }
// ui.createInput('Email')
// => { theme: 'dark', component: 'DarkInput', placeholder: 'Email' }`,
      solution: `function createUIFactory(theme) {
  const prefix = theme === 'dark' ? 'Dark' : 'Light';

  return {
    createButton(label) {
      return { theme, component: \`\${prefix}Button\`, label };
    },
    createInput(placeholder) {
      return { theme, component: \`\${prefix}Input\`, placeholder };
    },
    createCard(title, content) {
      return { theme, component: \`\${prefix}Card\`, title, content };
    },
  };
}

// Test:
// const ui = createUIFactory('dark');
// ui.createButton('Submit')
// => { theme: 'dark', component: 'DarkButton', label: 'Submit' }
// ui.createInput('Email')
// => { theme: 'dark', component: 'DarkInput', placeholder: 'Email' }`,
      hints: [
        'Determine the prefix based on the theme parameter.',
        'Each create method returns an object with the theme, component name, and relevant props.',
        'The component name is the prefix + component type: e.g. "DarkButton".',
      ],
      concepts: ['abstract factory', 'theme system', 'family of objects'],
    },
    {
      id: 'js-patterns-4',
      title: 'Builder Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Implement a QueryBuilder class with a fluent API for constructing SQL-like query strings.',
      skeleton: `class QueryBuilder {
  #table = '';
  #conditions = [];
  #fields = ['*'];
  #orderBy = null;
  #limit = null;

  from(table) {
    // Set the table, return this for chaining

  }

  select(...fields) {
    // Set the fields, return this for chaining

  }

  where(condition) {
    // Add a condition, return this for chaining

  }

  orderBy(field, dir = 'ASC') {
    // Set order, return this for chaining

  }

  limit(n) {
    // Set limit, return this for chaining

  }

  build() {
    // Return the query string:
    // "SELECT fields FROM table WHERE cond1 AND cond2 ORDER BY field DIR LIMIT n"

  }
}

// Test:
// new QueryBuilder()
//   .from('users')
//   .select('name', 'email')
//   .where('age > 18')
//   .where('active = true')
//   .orderBy('name')
//   .limit(10)
//   .build()
// => 'SELECT name, email FROM users WHERE age > 18 AND active = true ORDER BY name ASC LIMIT 10'`,
      solution: `class QueryBuilder {
  #table = '';
  #conditions = [];
  #fields = ['*'];
  #orderBy = null;
  #limit = null;

  from(table) {
    this.#table = table;
    return this;
  }

  select(...fields) {
    this.#fields = fields;
    return this;
  }

  where(condition) {
    this.#conditions.push(condition);
    return this;
  }

  orderBy(field, dir = 'ASC') {
    this.#orderBy = \`\${field} \${dir}\`;
    return this;
  }

  limit(n) {
    this.#limit = n;
    return this;
  }

  build() {
    let query = \`SELECT \${this.#fields.join(', ')} FROM \${this.#table}\`;
    if (this.#conditions.length > 0) {
      query += \` WHERE \${this.#conditions.join(' AND ')}\`;
    }
    if (this.#orderBy) {
      query += \` ORDER BY \${this.#orderBy}\`;
    }
    if (this.#limit !== null) {
      query += \` LIMIT \${this.#limit}\`;
    }
    return query;
  }
}

// Test:
// new QueryBuilder()
//   .from('users')
//   .select('name', 'email')
//   .where('age > 18')
//   .where('active = true')
//   .orderBy('name')
//   .limit(10)
//   .build()
// => 'SELECT name, email FROM users WHERE age > 18 AND active = true ORDER BY name ASC LIMIT 10'`,
      hints: [
        'Each method sets the corresponding private field and returns this for chaining.',
        'build() concatenates the parts, only including WHERE/ORDER BY/LIMIT if they are set.',
        'Join conditions with " AND " and fields with ", ".',
      ],
      concepts: ['builder pattern', 'fluent API', 'method chaining', 'query construction'],
    },
    {
      id: 'js-patterns-5',
      title: 'Observer Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Implement an EventEmitter class with on, off, once, and emit methods.',
      skeleton: `class EventEmitter {
  #listeners = new Map();

  on(event, fn) {
    // Subscribe fn to event

  }

  off(event, fn) {
    // Unsubscribe fn from event

  }

  once(event, fn) {
    // Subscribe fn to fire only once, then auto-remove

  }

  emit(event, ...args) {
    // Call all listeners for event with args

  }
}

// Test:
// const em = new EventEmitter();
// em.on('data', (x) => console.log(x));
// em.emit('data', 42); // logs 42
// em.once('done', () => console.log('done!'));
// em.emit('done'); // logs 'done!'
// em.emit('done'); // nothing`,
      solution: `class EventEmitter {
  #listeners = new Map();

  on(event, fn) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, []);
    }
    this.#listeners.get(event).push(fn);
    return this;
  }

  off(event, fn) {
    const fns = this.#listeners.get(event);
    if (fns) {
      this.#listeners.set(event, fns.filter(f => f !== fn));
    }
    return this;
  }

  once(event, fn) {
    const wrapper = (...args) => {
      fn(...args);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }

  emit(event, ...args) {
    const fns = this.#listeners.get(event);
    if (fns) {
      for (const fn of [...fns]) {
        fn(...args);
      }
    }
    return this;
  }
}

// Test:
// const em = new EventEmitter();
// em.on('data', (x) => console.log(x));
// em.emit('data', 42); // logs 42
// em.once('done', () => console.log('done!'));
// em.emit('done'); // logs 'done!'
// em.emit('done'); // nothing`,
      hints: [
        'Use a Map with event names as keys and arrays of listener functions as values.',
        'once() wraps fn in a wrapper that calls fn then removes itself with off.',
        'In emit(), spread a copy of the listeners array to safely handle removals during iteration.',
      ],
      concepts: ['observer pattern', 'event emitter', 'pub/sub', 'once'],
    },
    {
      id: 'js-patterns-6',
      title: 'Pub/Sub Pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the blanks to implement a global pub/sub message bus.',
      skeleton: `const MessageBus = (() => {
  const __BLANK__ = new Map();

  return {
    subscribe(topic, handler) {
      if (!subscribers.has(topic)) {
        subscribers.__BLANK__(topic, new Set());
      }
      subscribers.get(topic).__BLANK__(handler);
      return () => subscribers.get(topic)?.delete(handler);
    },

    publish(topic, data) {
      const handlers = subscribers.__BLANK__(topic);
      if (handlers) {
        for (const fn of handlers) fn(data);
      }
    },
  };
})();

const unsub = MessageBus.subscribe('user:login', (user) => {
  console.log('Welcome', user.name);
});
MessageBus.publish('user:login', { name: 'Alice' });
unsub(); // unsubscribe`,
      solution: `const MessageBus = (() => {
  const subscribers = new Map();

  return {
    subscribe(topic, handler) {
      if (!subscribers.has(topic)) {
        subscribers.set(topic, new Set());
      }
      subscribers.get(topic).add(handler);
      return () => subscribers.get(topic)?.delete(handler);
    },

    publish(topic, data) {
      const handlers = subscribers.get(topic);
      if (handlers) {
        for (const fn of handlers) fn(data);
      }
    },
  };
})();

const unsub = MessageBus.subscribe('user:login', (user) => {
  console.log('Welcome', user.name);
});
MessageBus.publish('user:login', { name: 'Alice' });
unsub(); // unsubscribe`,
      hints: [
        'The private variable is subscribers -- a Map of topic to Set of handlers.',
        'Use .set() to add a new Set, .add() to add a handler to the Set.',
        'Use .get() to retrieve the handler Set for a topic.',
      ],
      concepts: ['pub/sub', 'message bus', 'IIFE', 'Map', 'Set'],
    },
    {
      id: 'js-patterns-7',
      title: 'Mediator Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Implement a ChatRoom mediator that coordinates communication between user objects without them referencing each other directly.',
      skeleton: `class ChatRoom {
  #users = new Map();

  join(user) {
    // Register user and set their room reference

  }

  send(message, from, to) {
    // If to is specified, send to that user only
    // Otherwise broadcast to all users except sender

  }
}

class User {
  #room = null;

  constructor(name) {
    this.name = name;
    this.messages = [];
  }

  setRoom(room) { this.#room = room; }

  send(message, to) {
    this.#room.send(message, this, to);
  }

  receive(message, from) {
    this.messages.push({ from: from.name, message });
  }
}

// Test:
// const room = new ChatRoom();
// const alice = new User('Alice');
// const bob = new User('Bob');
// room.join(alice); room.join(bob);
// alice.send('Hello!'); // bob receives { from: 'Alice', message: 'Hello!' }`,
      solution: `class ChatRoom {
  #users = new Map();

  join(user) {
    this.#users.set(user.name, user);
    user.setRoom(this);
  }

  send(message, from, to) {
    if (to) {
      const target = this.#users.get(to.name);
      if (target) target.receive(message, from);
    } else {
      for (const [name, user] of this.#users) {
        if (name !== from.name) {
          user.receive(message, from);
        }
      }
    }
  }
}

class User {
  #room = null;

  constructor(name) {
    this.name = name;
    this.messages = [];
  }

  setRoom(room) { this.#room = room; }

  send(message, to) {
    this.#room.send(message, this, to);
  }

  receive(message, from) {
    this.messages.push({ from: from.name, message });
  }
}

// Test:
// const room = new ChatRoom();
// const alice = new User('Alice');
// const bob = new User('Bob');
// room.join(alice); room.join(bob);
// alice.send('Hello!'); // bob receives { from: 'Alice', message: 'Hello!' }`,
      hints: [
        'join() stores the user in the Map and gives the user a reference to the room.',
        'send() with a specific target delivers directly; without, it broadcasts to all except sender.',
        'Users communicate through the room, never directly to each other.',
      ],
      concepts: ['mediator', 'loose coupling', 'chat room', 'coordination'],
    },
    {
      id: 'js-patterns-8',
      title: 'Strategy Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Implement a Sorter class that accepts different sorting strategies and can switch between them at runtime.',
      skeleton: `const strategies = {
  bubble(arr) {
    const a = [...arr];
    for (let i = 0; i < a.length; i++)
      for (let j = 0; j < a.length - i - 1; j++)
        if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]];
    return a;
  },
  insertion(arr) {
    const a = [...arr];
    for (let i = 1; i < a.length; i++) {
      let j = i;
      while (j > 0 && a[j - 1] > a[j]) {
        [a[j - 1], a[j]] = [a[j], a[j - 1]];
        j--;
      }
    }
    return a;
  },
  native(arr) {
    return [...arr].sort((a, b) => a - b);
  },
};

class Sorter {
  #strategy;

  constructor(strategyName = 'native') {
    // Set the initial strategy

  }

  setStrategy(strategyName) {
    // Switch strategy at runtime

  }

  sort(arr) {
    // Execute the current strategy

  }
}

// Test:
// const s = new Sorter('bubble');
// s.sort([3,1,2]); // [1,2,3]
// s.setStrategy('native');
// s.sort([3,1,2]); // [1,2,3]`,
      solution: `const strategies = {
  bubble(arr) {
    const a = [...arr];
    for (let i = 0; i < a.length; i++)
      for (let j = 0; j < a.length - i - 1; j++)
        if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]];
    return a;
  },
  insertion(arr) {
    const a = [...arr];
    for (let i = 1; i < a.length; i++) {
      let j = i;
      while (j > 0 && a[j - 1] > a[j]) {
        [a[j - 1], a[j]] = [a[j], a[j - 1]];
        j--;
      }
    }
    return a;
  },
  native(arr) {
    return [...arr].sort((a, b) => a - b);
  },
};

class Sorter {
  #strategy;

  constructor(strategyName = 'native') {
    this.#strategy = strategies[strategyName];
  }

  setStrategy(strategyName) {
    this.#strategy = strategies[strategyName];
  }

  sort(arr) {
    return this.#strategy(arr);
  }
}

// Test:
// const s = new Sorter('bubble');
// s.sort([3,1,2]); // [1,2,3]
// s.setStrategy('native');
// s.sort([3,1,2]); // [1,2,3]`,
      hints: [
        'Store the strategy function, not the name. Look it up from the strategies object.',
        'setStrategy replaces the current strategy with the new one.',
        'sort() simply delegates to this.#strategy(arr).',
      ],
      concepts: ['strategy pattern', 'runtime behavior swap', 'delegation'],
    },
    {
      id: 'js-patterns-9',
      title: 'Command Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Implement a command pattern with execute, undo, and redo support for a text editor.',
      skeleton: `class TextEditor {
  #content = '';
  #history = [];
  #redoStack = [];

  execute(command) {
    // Run command.execute(), push to history, clear redo stack

  }

  undo() {
    // Pop last command from history, call its undo(), push to redo stack

  }

  redo() {
    // Pop from redo stack, call execute(), push to history

  }

  getContent() { return this.#content; }
  setContent(text) { this.#content = text; }
}

class InsertCommand {
  constructor(editor, text, position) {
    this.editor = editor;
    this.text = text;
    this.position = position;
  }

  execute() {
    const content = this.editor.getContent();
    this.editor.setContent(
      content.slice(0, this.position) + this.text + content.slice(this.position)
    );
  }

  undo() {
    const content = this.editor.getContent();
    this.editor.setContent(
      content.slice(0, this.position) + content.slice(this.position + this.text.length)
    );
  }
}

// Test:
// const editor = new TextEditor();
// editor.execute(new InsertCommand(editor, 'Hello', 0));
// editor.getContent(); // 'Hello'
// editor.undo();
// editor.getContent(); // ''
// editor.redo();
// editor.getContent(); // 'Hello'`,
      solution: `class TextEditor {
  #content = '';
  #history = [];
  #redoStack = [];

  execute(command) {
    command.execute();
    this.#history.push(command);
    this.#redoStack.length = 0;
  }

  undo() {
    const command = this.#history.pop();
    if (command) {
      command.undo();
      this.#redoStack.push(command);
    }
  }

  redo() {
    const command = this.#redoStack.pop();
    if (command) {
      command.execute();
      this.#history.push(command);
    }
  }

  getContent() { return this.#content; }
  setContent(text) { this.#content = text; }
}

class InsertCommand {
  constructor(editor, text, position) {
    this.editor = editor;
    this.text = text;
    this.position = position;
  }

  execute() {
    const content = this.editor.getContent();
    this.editor.setContent(
      content.slice(0, this.position) + this.text + content.slice(this.position)
    );
  }

  undo() {
    const content = this.editor.getContent();
    this.editor.setContent(
      content.slice(0, this.position) + content.slice(this.position + this.text.length)
    );
  }
}

// Test:
// const editor = new TextEditor();
// editor.execute(new InsertCommand(editor, 'Hello', 0));
// editor.getContent(); // 'Hello'
// editor.undo();
// editor.getContent(); // ''
// editor.redo();
// editor.getContent(); // 'Hello'`,
      hints: [
        'execute() runs the command, pushes to history, and clears the redo stack.',
        'undo() pops from history, calls undo(), and pushes to the redo stack.',
        'redo() pops from redo stack, calls execute(), and pushes back to history.',
      ],
      concepts: ['command pattern', 'undo/redo', 'history stack', 'encapsulation'],
    },
    {
      id: 'js-patterns-10',
      title: 'State Machine',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Implement a finite state machine for a traffic light with states and transitions.',
      skeleton: `class StateMachine {
  #state;
  #transitions;
  #listeners = [];

  constructor(initialState, transitions) {
    // transitions: { [state]: { [event]: nextState } }


  }

  getState() { return this.#state; }

  send(event) {
    // Look up transition, change state, notify listeners
    // Throw if transition is invalid


  }

  onChange(fn) {
    // Subscribe to state changes, return unsubscribe function


  }
}

// Test:
// const light = new StateMachine('red', {
//   red:    { TIMER: 'green' },
//   green:  { TIMER: 'yellow' },
//   yellow: { TIMER: 'red' },
// });
// light.getState(); // 'red'
// light.send('TIMER');
// light.getState(); // 'green'`,
      solution: `class StateMachine {
  #state;
  #transitions;
  #listeners = [];

  constructor(initialState, transitions) {
    this.#state = initialState;
    this.#transitions = transitions;
  }

  getState() { return this.#state; }

  send(event) {
    const stateTransitions = this.#transitions[this.#state];
    if (!stateTransitions || !(event in stateTransitions)) {
      throw new Error(\`No transition for event "\${event}" in state "\${this.#state}"\`);
    }
    const prev = this.#state;
    this.#state = stateTransitions[event];
    for (const fn of this.#listeners) {
      fn(this.#state, prev, event);
    }
  }

  onChange(fn) {
    this.#listeners.push(fn);
    return () => {
      this.#listeners = this.#listeners.filter(f => f !== fn);
    };
  }
}

// Test:
// const light = new StateMachine('red', {
//   red:    { TIMER: 'green' },
//   green:  { TIMER: 'yellow' },
//   yellow: { TIMER: 'red' },
// });
// light.getState(); // 'red'
// light.send('TIMER');
// light.getState(); // 'green'`,
      hints: [
        'Look up the current state in the transitions map, then find the event within it.',
        'If no valid transition exists, throw an error.',
        'After transitioning, notify all listeners with (newState, prevState, event).',
      ],
      concepts: ['state machine', 'finite automaton', 'transitions', 'event-driven'],
    },
    {
      id: 'js-patterns-11',
      title: 'Adapter Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write an adapter that wraps an old XML-style API to work with the new JSON-style interface expected by the app.',
      skeleton: `// Old API (cannot be modified)
const legacyApi = {
  getXMLUser(id) {
    return '<user><name>Alice</name><email>alice@test.com</email></user>';
  },
};

// Expected interface
// { getUser(id): { name: string, email: string } }

function createApiAdapter(oldApi) {
  // Wrap legacyApi to match the new interface
  // Parse the XML-like string and return a JSON object



}

// Test:
// const api = createApiAdapter(legacyApi);
// api.getUser(1); // { name: 'Alice', email: 'alice@test.com' }`,
      solution: `const legacyApi = {
  getXMLUser(id) {
    return '<user><name>Alice</name><email>alice@test.com</email></user>';
  },
};

function createApiAdapter(oldApi) {
  function parseXMLish(xml) {
    const getValue = (tag) => {
      const match = xml.match(new RegExp(\`<\${tag}>(.*?)</\${tag}>\`));
      return match ? match[1] : '';
    };
    return { name: getValue('name'), email: getValue('email') };
  }

  return {
    getUser(id) {
      const xml = oldApi.getXMLUser(id);
      return parseXMLish(xml);
    },
  };
}

// Test:
// const api = createApiAdapter(legacyApi);
// api.getUser(1); // { name: 'Alice', email: 'alice@test.com' }`,
      hints: [
        'The adapter calls the old API method and transforms the result.',
        'Parse the XML-like string using regex to extract tag values.',
        'Return an object with the new interface: getUser(id) returning a plain object.',
      ],
      concepts: ['adapter pattern', 'interface conversion', 'legacy integration'],
    },
    {
      id: 'js-patterns-12',
      title: 'Decorator Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write decorator functions that add logging and timing behavior to any function without modifying it.',
      skeleton: `function withLogging(fn, label) {
  // Return a wrapper that logs args and result


}

function withTiming(fn, label) {
  // Return a wrapper that measures and logs execution time


}

// Usage:
// const add = (a, b) => a + b;
// const logged = withLogging(add, 'add');
// logged(2, 3); // logs: "add called with: [2, 3]" then "add returned: 5"
//
// const timed = withTiming(add, 'add');
// timed(2, 3); // logs: "add took: 0.01ms" and returns 5`,
      solution: `function withLogging(fn, label) {
  return function (...args) {
    console.log(\`\${label} called with:\`, args);
    const result = fn.apply(this, args);
    console.log(\`\${label} returned:\`, result);
    return result;
  };
}

function withTiming(fn, label) {
  return function (...args) {
    const start = performance.now();
    const result = fn.apply(this, args);
    const elapsed = (performance.now() - start).toFixed(2);
    console.log(\`\${label} took: \${elapsed}ms\`);
    return result;
  };
}

// Usage:
// const add = (a, b) => a + b;
// const logged = withLogging(add, 'add');
// logged(2, 3); // logs: "add called with: [2, 3]" then "add returned: 5"
//
// const timed = withTiming(add, 'add');
// timed(2, 3); // logs: "add took: 0.01ms" and returns 5`,
      hints: [
        'Return a wrapper function that captures args with rest parameters.',
        'Use fn.apply(this, args) to preserve the original `this` context.',
        'For timing, use performance.now() before and after the call.',
      ],
      concepts: ['decorator pattern', 'higher-order functions', 'logging', 'timing'],
    },
    {
      id: 'js-patterns-13',
      title: 'Facade Pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the blanks to create a facade that simplifies a complex subsystem of audio, video, and lighting controls.',
      skeleton: `class AudioSystem {
  setVolume(level) { console.log('Volume:', level); }
  setEqualizer(preset) { console.log('EQ:', preset); }
}
class VideoSystem {
  setResolution(res) { console.log('Resolution:', res); }
  setBrightness(b) { console.log('Brightness:', b); }
}
class LightingSystem {
  dim(level) { console.log('Lights:', level); }
}

class HomeTheaterFacade {
  #audio; #video; #lights;
  constructor() {
    this.#audio = new __BLANK__();
    this.#video = new __BLANK__();
    this.#lights = new __BLANK__();
  }

  watchMovie() {
    this.#lights.__BLANK__(20);
    this.#video.setResolution('4K');
    this.#video.setBrightness(80);
    this.#audio.__BLANK__(75);
    this.#audio.setEqualizer('cinema');
    console.log('Enjoy your movie!');
  }

  endMovie() {
    this.#lights.dim(100);
    this.#audio.setVolume(0);
    console.log('Movie ended.');
  }
}`,
      solution: `class AudioSystem {
  setVolume(level) { console.log('Volume:', level); }
  setEqualizer(preset) { console.log('EQ:', preset); }
}
class VideoSystem {
  setResolution(res) { console.log('Resolution:', res); }
  setBrightness(b) { console.log('Brightness:', b); }
}
class LightingSystem {
  dim(level) { console.log('Lights:', level); }
}

class HomeTheaterFacade {
  #audio; #video; #lights;
  constructor() {
    this.#audio = new AudioSystem();
    this.#video = new VideoSystem();
    this.#lights = new LightingSystem();
  }

  watchMovie() {
    this.#lights.dim(20);
    this.#video.setResolution('4K');
    this.#video.setBrightness(80);
    this.#audio.setVolume(75);
    this.#audio.setEqualizer('cinema');
    console.log('Enjoy your movie!');
  }

  endMovie() {
    this.#lights.dim(100);
    this.#audio.setVolume(0);
    console.log('Movie ended.');
  }
}`,
      hints: [
        'The facade creates instances of each subsystem: AudioSystem, VideoSystem, LightingSystem.',
        'The lighting method is dim() and the audio volume method is setVolume().',
        'The facade hides the complexity of coordinating multiple subsystems behind simple methods.',
      ],
      concepts: ['facade pattern', 'simplification', 'subsystem coordination'],
    },
    {
      id: 'js-patterns-14',
      title: 'Proxy Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Implement a validation proxy that validates property assignments on a user object.',
      skeleton: `function createValidatedUser(initial) {
  const validators = {
    name: (v) => typeof v === 'string' && v.length > 0,
    age: (v) => typeof v === 'number' && v >= 0 && v <= 150,
    email: (v) => typeof v === 'string' && v.includes('@'),
  };

  // Create and return a Proxy that:
  // 1. Validates on set -- throw TypeError if invalid
  // 2. Allows get as normal
  // 3. Only allows known properties



}

// Test:
// const user = createValidatedUser({ name: 'Alice', age: 30, email: 'a@b.com' });
// user.age = 31; // ok
// user.age = -5; // TypeError: Invalid value for age
// user.foo = 1;  // TypeError: Unknown property foo`,
      solution: `function createValidatedUser(initial) {
  const validators = {
    name: (v) => typeof v === 'string' && v.length > 0,
    age: (v) => typeof v === 'number' && v >= 0 && v <= 150,
    email: (v) => typeof v === 'string' && v.includes('@'),
  };

  return new Proxy({ ...initial }, {
    set(target, prop, value) {
      if (!(prop in validators)) {
        throw new TypeError(\`Unknown property \${prop}\`);
      }
      if (!validators[prop](value)) {
        throw new TypeError(\`Invalid value for \${prop}\`);
      }
      target[prop] = value;
      return true;
    },
    get(target, prop) {
      return target[prop];
    },
  });
}

// Test:
// const user = createValidatedUser({ name: 'Alice', age: 30, email: 'a@b.com' });
// user.age = 31; // ok
// user.age = -5; // TypeError: Invalid value for age
// user.foo = 1;  // TypeError: Unknown property foo`,
      hints: [
        'Create a new Proxy with set and get traps.',
        'In the set trap, check if the property is known, then validate the value.',
        'Return true from set to indicate success, or throw to reject.',
      ],
      concepts: ['Proxy', 'validation', 'traps', 'meta-programming'],
    },
    {
      id: 'js-patterns-15',
      title: 'Chain of Responsibility',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Implement a chain of responsibility where each handler tries to process a request and passes it along if it cannot.',
      skeleton: `class Handler {
  #next = null;

  setNext(handler) {
    // Set the next handler in the chain, return the next handler for chaining

  }

  handle(request) {
    // If this handler can process it, do so
    // Otherwise, pass to the next handler
    // Subclasses override canHandle and process

  }

  canHandle(request) { return false; }
  process(request) { return null; }
}

class SmallHandler extends Handler {
  canHandle(req) { return req.amount < 100; }
  process(req) { return 'Small: approved ' + req.amount; }
}

class MediumHandler extends Handler {
  canHandle(req) { return req.amount < 1000; }
  process(req) { return 'Medium: approved ' + req.amount; }
}

class LargeHandler extends Handler {
  canHandle(req) { return req.amount < 10000; }
  process(req) { return 'Large: requires review for ' + req.amount; }
}

// Test:
// const small = new SmallHandler();
// const medium = new MediumHandler();
// const large = new LargeHandler();
// small.setNext(medium).setNext(large);
// small.handle({ amount: 50 });    // 'Small: approved 50'
// small.handle({ amount: 500 });   // 'Medium: approved 500'
// small.handle({ amount: 5000 });  // 'Large: requires review for 5000'`,
      solution: `class Handler {
  #next = null;

  setNext(handler) {
    this.#next = handler;
    return handler;
  }

  handle(request) {
    if (this.canHandle(request)) {
      return this.process(request);
    }
    if (this.#next) {
      return this.#next.handle(request);
    }
    return null;
  }

  canHandle(request) { return false; }
  process(request) { return null; }
}

class SmallHandler extends Handler {
  canHandle(req) { return req.amount < 100; }
  process(req) { return 'Small: approved ' + req.amount; }
}

class MediumHandler extends Handler {
  canHandle(req) { return req.amount < 1000; }
  process(req) { return 'Medium: approved ' + req.amount; }
}

class LargeHandler extends Handler {
  canHandle(req) { return req.amount < 10000; }
  process(req) { return 'Large: requires review for ' + req.amount; }
}

// Test:
// const small = new SmallHandler();
// const medium = new MediumHandler();
// const large = new LargeHandler();
// small.setNext(medium).setNext(large);
// small.handle({ amount: 50 });    // 'Small: approved 50'
// small.handle({ amount: 500 });   // 'Medium: approved 500'
// small.handle({ amount: 5000 });  // 'Large: requires review for 5000'`,
      hints: [
        'setNext stores the next handler and returns it to enable chaining.',
        'handle checks canHandle first; if yes, process; if no, delegate to #next.',
        'If no handler in the chain can handle it, return null.',
      ],
      concepts: ['chain of responsibility', 'handler chain', 'delegation'],
    },
    {
      id: 'js-patterns-16',
      title: 'Iterator Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Implement a Range class that is iterable using Symbol.iterator, yielding numbers from start to end.',
      skeleton: `class Range {
  constructor(start, end, step = 1) {
    this.start = start;
    this.end = end;
    this.step = step;
  }

  [Symbol.iterator]() {
    // Return an iterator object with a next() method
    // that yields values from start to end (inclusive)



  }
}

// Test:
// [...new Range(1, 5)]        // [1, 2, 3, 4, 5]
// [...new Range(0, 10, 3)]    // [0, 3, 6, 9]
// for (const n of new Range(2, 4)) console.log(n); // 2, 3, 4`,
      solution: `class Range {
  constructor(start, end, step = 1) {
    this.start = start;
    this.end = end;
    this.step = step;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    const step = this.step;

    return {
      next() {
        if (current <= end) {
          const value = current;
          current += step;
          return { value, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}

// Test:
// [...new Range(1, 5)]        // [1, 2, 3, 4, 5]
// [...new Range(0, 10, 3)]    // [0, 3, 6, 9]
// for (const n of new Range(2, 4)) console.log(n); // 2, 3, 4`,
      hints: [
        'Symbol.iterator must return an object with a next() method.',
        'next() returns { value, done: false } while current <= end.',
        'When current exceeds end, return { value: undefined, done: true }.',
      ],
      concepts: ['iterator', 'Symbol.iterator', 'iterable protocol', 'for...of'],
    },
    {
      id: 'js-patterns-17',
      title: 'Module Pattern',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the output of the revealing module pattern.',
      skeleton: `const Counter = (() => {
  let count = 0;

  function increment() { return ++count; }
  function decrement() { return --count; }
  function getCount() { return count; }

  return { increment, decrement, getCount };
})();

console.log(Counter.getCount());
console.log(Counter.increment());
console.log(Counter.increment());
console.log(Counter.decrement());
console.log(Counter.getCount());
console.log(typeof Counter.count);`,
      solution: `const Counter = (() => {
  let count = 0;

  function increment() { return ++count; }
  function decrement() { return --count; }
  function getCount() { return count; }

  return { increment, decrement, getCount };
})();

console.log(Counter.getCount());      // 0
console.log(Counter.increment());     // 1
console.log(Counter.increment());     // 2
console.log(Counter.decrement());     // 1
console.log(Counter.getCount());      // 1
console.log(typeof Counter.count);    // 'undefined'`,
      hints: [
        'The IIFE creates a closure -- count is private and not on the returned object.',
        'increment uses prefix ++, so it returns the new value.',
        'Counter.count is undefined because count is not exposed in the return object.',
      ],
      concepts: ['module pattern', 'IIFE', 'closures', 'encapsulation', 'revealing module'],
    },
    {
      id: 'js-patterns-18',
      title: 'Mixin Pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the blanks to apply mixins to a class, adding shared behavior without inheritance.',
      skeleton: `const Serializable = (Base) => class extends __BLANK__ {
  serialize() {
    return JSON.stringify(this);
  }
  static deserialize(json) {
    return Object.assign(new this(), JSON.parse(json));
  }
};

const Validatable = (Base) => class extends __BLANK__ {
  validate() {
    for (const [key, rule] of Object.entries(this.constructor.rules ?? {})) {
      if (!rule(this[key])) throw new Error(key + ' is invalid');
    }
    return true;
  }
};

class User extends __BLANK__(__BLANK__(class {
  static rules = { name: (v) => v?.length > 0, age: (v) => v > 0 };
  constructor(name, age) {
    super();
    this.name = name;
    this.age = age;
  }
})) {}

const u = new User('Alice', 30);
u.validate(); // true
u.serialize(); // '{"name":"Alice","age":30}'`,
      solution: `const Serializable = (Base) => class extends Base {
  serialize() {
    return JSON.stringify(this);
  }
  static deserialize(json) {
    return Object.assign(new this(), JSON.parse(json));
  }
};

const Validatable = (Base) => class extends Base {
  validate() {
    for (const [key, rule] of Object.entries(this.constructor.rules ?? {})) {
      if (!rule(this[key])) throw new Error(key + ' is invalid');
    }
    return true;
  }
};

class User extends Serializable(Validatable(class {
  static rules = { name: (v) => v?.length > 0, age: (v) => v > 0 };
  constructor(name, age) {
    super();
    this.name = name;
    this.age = age;
  }
})) {}

const u = new User('Alice', 30);
u.validate(); // true
u.serialize(); // '{"name":"Alice","age":30}'`,
      hints: [
        'Each mixin is a function that takes a Base class and returns a new class extending it.',
        'The extends clause in each mixin is Base -- the parameter passed in.',
        'Compose mixins by nesting: Serializable(Validatable(BaseClass)).',
      ],
      concepts: ['mixin', 'class composition', 'multiple inheritance alternative'],
    },
    {
      id: 'js-patterns-19',
      title: 'Fix: Broken Observer',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fix the observer implementation that crashes when a listener removes itself during emit.',
      skeleton: `// BUG: Crashes with "fn is not a function" during emit
// when a listener removes itself
class BrokenEmitter {
  #events = {};

  on(event, fn) {
    (this.#events[event] ??= []).push(fn);
  }

  off(event, fn) {
    const list = this.#events[event];
    if (list) {
      const idx = list.indexOf(fn);
      if (idx !== -1) list.splice(idx, 1);
    }
  }

  emit(event, ...args) {
    const list = this.#events[event];
    if (list) {
      for (let i = 0; i < list.length; i++) {
        list[i](...args);  // crashes when list mutates mid-loop
      }
    }
  }
}

// Reproduction:
// const e = new BrokenEmitter();
// const handler = () => { console.log('once'); e.off('test', handler); };
// e.on('test', handler);
// e.on('test', () => console.log('always'));
// e.emit('test'); // 'once' logs, then skips 'always'`,
      solution: `class BrokenEmitter {
  #events = {};

  on(event, fn) {
    (this.#events[event] ??= []).push(fn);
  }

  off(event, fn) {
    const list = this.#events[event];
    if (list) {
      const idx = list.indexOf(fn);
      if (idx !== -1) list.splice(idx, 1);
    }
  }

  emit(event, ...args) {
    const list = this.#events[event];
    if (list) {
      const snapshot = [...list];
      for (let i = 0; i < snapshot.length; i++) {
        snapshot[i](...args);
      }
    }
  }
}

// Reproduction:
// const e = new BrokenEmitter();
// const handler = () => { console.log('once'); e.off('test', handler); };
// e.on('test', handler);
// e.on('test', () => console.log('always'));
// e.emit('test'); // 'once', 'always' -- both fire correctly`,
      hints: [
        'The bug occurs because splice mutates the array during iteration, shifting indices.',
        'Create a snapshot copy of the listener array before iterating: [...list].',
        'Iterating over the copy means removals during emit do not affect the current loop.',
      ],
      concepts: ['observer pattern', 'concurrent modification', 'defensive copying'],
    },
    {
      id: 'js-patterns-20',
      title: 'Practical: Plugin System',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor a monolithic app into a plugin system using multiple design patterns: factory for plugin creation, observer for hooks, and chain of responsibility for request processing.',
      skeleton: `// Monolithic -- everything hardcoded
class App {
  process(request) {
    // Auth check
    if (!request.token) return { error: 'Unauthorized' };
    // Rate limit check
    if (request.rateLimited) return { error: 'Rate limited' };
    // Logging
    console.log('Processing:', request.path);
    // Business logic
    return { data: 'result for ' + request.path };
  }
}

// Refactor into a plugin-based architecture
// Use factory to create plugins, observer for lifecycle hooks,
// and chain of responsibility for request pipeline`,
      solution: `// Plugin-based architecture
class PluginApp {
  #plugins = [];
  #hooks = new Map();

  use(plugin) {
    this.#plugins.push(plugin);
    plugin.install?.(this);
    return this;
  }

  hook(name, fn) {
    if (!this.#hooks.has(name)) this.#hooks.set(name, []);
    this.#hooks.get(name).push(fn);
  }

  async runHook(name, ctx) {
    for (const fn of this.#hooks.get(name) ?? []) {
      await fn(ctx);
    }
  }

  async process(request) {
    const ctx = { request, response: null, error: null };
    await this.runHook('beforeProcess', ctx);
    if (ctx.error) return { error: ctx.error };

    let index = 0;
    const handlers = this.#plugins.filter(p => p.handle);
    const next = async () => {
      if (index < handlers.length) {
        await handlers[index++].handle(ctx, next);
      }
    };
    await next();

    await this.runHook('afterProcess', ctx);
    return ctx.response ?? { error: 'No handler' };
  }
}

// Plugins as factories
const AuthPlugin = {
  install(app) {
    app.hook('beforeProcess', (ctx) => {
      if (!ctx.request.token) ctx.error = 'Unauthorized';
    });
  },
};

const RateLimitPlugin = {
  install(app) {
    app.hook('beforeProcess', (ctx) => {
      if (ctx.request.rateLimited) ctx.error = 'Rate limited';
    });
  },
};

const LogPlugin = {
  install(app) {
    app.hook('beforeProcess', (ctx) => {
      console.log('Processing:', ctx.request.path);
    });
  },
};

const CorePlugin = {
  handle(ctx, next) {
    ctx.response = { data: 'result for ' + ctx.request.path };
  },
};

// Usage:
// const app = new PluginApp();
// app.use(AuthPlugin).use(RateLimitPlugin).use(LogPlugin).use(CorePlugin);
// await app.process({ path: '/api/users', token: 'abc' });
// => { data: 'result for /api/users' }`,
      hints: [
        'Split each concern into a separate plugin with an install() method.',
        'Use hooks (observer pattern) for cross-cutting concerns like auth and logging.',
        'Use a middleware chain (chain of responsibility) for the main request pipeline.',
      ],
      concepts: ['plugin system', 'factory', 'observer', 'chain of responsibility', 'architecture'],
    },
  ],
};
