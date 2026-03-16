import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-advanced',
  title: '49. Advanced Patterns',
  explanation: `## Advanced Patterns

Advanced JavaScript patterns leverage metaprogramming, architectural design, and reactive principles to build sophisticated, extensible systems.

\`\`\`javascript
// Proxy -- intercept object operations
const handler = {
  get(target, prop) {
    console.log(\\\`Accessing \\\${prop}\\\`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    console.log(\\\`Setting \\\${prop} = \\\${value}\\\`);
    return Reflect.set(target, prop, value);
  },
};
const proxy = new Proxy({}, handler);

// Dependency Injection
class Container {
  #registry = new Map();
  register(name, factory) { this.#registry.set(name, factory); }
  resolve(name) { return this.#registry.get(name)(this); }
}

// Middleware Pipeline
function pipeline(...fns) {
  return (ctx) => {
    let i = 0;
    function next() {
      if (i < fns.length) return fns[i++](ctx, next);
    }
    return next();
  };
}

// Reactive Signals
function createSignal(initial) {
  let value = initial;
  const subs = new Set();
  const get = () => { track(subs); return value; };
  const set = (v) => { value = v; subs.forEach(fn => fn()); };
  return [get, set];
}
\`\`\`

These patterns form the backbone of modern frameworks and libraries, enabling flexible architecture, lazy evaluation, and declarative programming.`,
  exercises: [
    {
      id: 'js-advanced-1',
      title: 'Basic Proxy',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to create a Proxy that logs property access.',
      skeleton: `const handler = {
  __BLANK__(target, prop) {
    console.log(\`Accessed: \${prop}\`);
    return __BLANK__.get(target, prop);
  },
};

const obj = { name: 'Alice', age: 30 };
const proxy = new __BLANK__(obj, handler);
console.log(proxy.name); // logs "Accessed: name" then "Alice"`,
      solution: `const handler = {
  get(target, prop) {
    console.log(\`Accessed: \${prop}\`);
    return Reflect.get(target, prop);
  },
};

const obj = { name: 'Alice', age: 30 };
const proxy = new Proxy(obj, handler);
console.log(proxy.name); // logs "Accessed: name" then "Alice"`,
      hints: [
        'The "get" trap intercepts property reads on the proxy.',
        'Reflect.get() forwards the operation to the original object.',
        'new Proxy(target, handler) creates a proxy wrapping target.',
      ],
      concepts: ['proxy', 'reflect', 'metaprogramming', 'traps'],
    },
    {
      id: 'js-advanced-2',
      title: 'Proxy Set Trap',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to create a Proxy that validates values before setting them.',
      skeleton: `const validator = {
  __BLANK__(target, prop, value) {
    if (prop === 'age' && typeof value !== 'number') {
      throw new __BLANK__('age must be a number');
    }
    return __BLANK__.set(target, prop, value);
  },
};

const person = new Proxy({}, validator);
person.age = 25;      // works
person.age = 'old';   // throws TypeError`,
      solution: `const validator = {
  set(target, prop, value) {
    if (prop === 'age' && typeof value !== 'number') {
      throw new TypeError('age must be a number');
    }
    return Reflect.set(target, prop, value);
  },
};

const person = new Proxy({}, validator);
person.age = 25;      // works
person.age = 'old';   // throws TypeError`,
      hints: [
        'The "set" trap intercepts property assignments.',
        'TypeError is the appropriate error for wrong types.',
        'Reflect.set() performs the default set operation.',
      ],
      concepts: ['proxy', 'set-trap', 'validation', 'reflect'],
    },
    {
      id: 'js-advanced-3',
      title: 'Proxy Has Trap',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to intercept the "in" operator with a Proxy.',
      skeleton: `const range = new Proxy({ min: 1, max: 100 }, {
  __BLANK__(target, prop) {
    if (typeof prop === 'string' && !isNaN(prop)) {
      const num = __BLANK__(prop);
      return num >= target.min && num <= target.__BLANK__;
    }
    return Reflect.has(target, prop);
  },
});

console.log(50 in range);  // true
console.log(200 in range); // false`,
      solution: `const range = new Proxy({ min: 1, max: 100 }, {
  has(target, prop) {
    if (typeof prop === 'string' && !isNaN(prop)) {
      const num = Number(prop);
      return num >= target.min && num <= target.max;
    }
    return Reflect.has(target, prop);
  },
});

console.log(50 in range);  // true
console.log(200 in range); // false`,
      hints: [
        'The "has" trap intercepts the "in" operator.',
        'Number() converts a string to a numeric value.',
        'target.max is the upper bound of the range.',
      ],
      concepts: ['proxy', 'has-trap', 'in-operator', 'range-check'],
    },
    {
      id: 'js-advanced-4',
      title: 'Observable Object',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function that wraps an object to notify listeners on property changes.',
      skeleton: `function observable(target) {
  // Return a proxy that:
  // - Has an _listeners array on the target (if not present)
  // - On set: updates the value and calls each listener with (prop, value)
  // - Has an "onChange" method accessible via proxy.onChange(fn)
}

// Usage:
// const obj = observable({ x: 1 });
// obj.onChange((prop, val) => console.log(prop, val));
// obj.x = 2; // logs "x" 2`,
      solution: `function observable(target) {
  const listeners = [];

  return new Proxy(target, {
    get(t, prop) {
      if (prop === 'onChange') {
        return (fn) => listeners.push(fn);
      }
      return Reflect.get(t, prop);
    },
    set(t, prop, value) {
      const result = Reflect.set(t, prop, value);
      listeners.forEach(fn => fn(prop, value));
      return result;
    },
  });
}`,
      hints: [
        'Use a closure to hold the listeners array outside the proxy.',
        'Intercept "get" for the special "onChange" property to register listeners.',
        'In the "set" trap, update the value first, then notify all listeners.',
      ],
      concepts: ['proxy', 'observer-pattern', 'reactive', 'closure'],
    },
    {
      id: 'js-advanced-5',
      title: 'DSL Builder with Proxy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Create a query DSL builder using Proxy that chains method calls.',
      skeleton: `function createQueryBuilder() {
  // Return a proxy-based builder where:
  // - Any property access returns a function that stores [prop, value]
  // - .build() returns the collected conditions as an object
  // Example:
  //   const q = createQueryBuilder();
  //   q.name('Alice').age(30).city('NYC').build()
  //   // => { name: 'Alice', age: 30, city: 'NYC' }
}`,
      solution: `function createQueryBuilder() {
  const conditions = {};

  return new Proxy({}, {
    get(target, prop) {
      if (prop === 'build') {
        return () => ({ ...conditions });
      }
      return (value) => {
        conditions[prop] = value;
        return new Proxy({}, this);
      };
    },
  });
}`,
      hints: [
        'Store conditions in a closure-scoped object.',
        'Each property access returns a function that saves the value and returns the proxy for chaining.',
        'The "build" property returns a function that copies and returns all collected conditions.',
      ],
      concepts: ['proxy', 'dsl', 'builder-pattern', 'method-chaining'],
    },
    {
      id: 'js-advanced-6',
      title: 'Plugin System',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Implement a plugin system where plugins extend a core app.',
      skeleton: `function createApp() {
  // Return an app object with:
  // - .use(plugin) -- registers a plugin (a function that receives the app)
  // - .hooks: a Map of hook names to arrays of handler functions
  // - .addHook(name, fn) -- adds a handler for a hook
  // - .runHook(name, ...args) -- runs all handlers for a hook
  // - .start() -- calls all registered plugins, then runs the 'start' hook
}

// Usage:
// const app = createApp();
// app.use((app) => {
//   app.addHook('start', () => console.log('Plugin loaded'));
// });
// app.start(); // logs "Plugin loaded"`,
      solution: `function createApp() {
  const plugins = [];
  const hooks = new Map();

  const app = {
    hooks,
    use(plugin) {
      plugins.push(plugin);
      return app;
    },
    addHook(name, fn) {
      if (!hooks.has(name)) hooks.set(name, []);
      hooks.get(name).push(fn);
      return app;
    },
    runHook(name, ...args) {
      const handlers = hooks.get(name) || [];
      return handlers.map(fn => fn(...args));
    },
    start() {
      plugins.forEach(plugin => plugin(app));
      app.runHook('start');
      return app;
    },
  };

  return app;
}`,
      hints: [
        'Plugins are functions that receive the app and register hooks.',
        'hooks is a Map from hook name to an array of handler functions.',
        'start() should initialize plugins first, then run the "start" hook.',
      ],
      concepts: ['plugin-system', 'hooks', 'extensibility', 'architecture'],
    },
    {
      id: 'js-advanced-7',
      title: 'Middleware Pipeline',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Implement a middleware pipeline where each middleware can modify context and call next().',
      skeleton: `function createPipeline() {
  // Return an object with:
  // - .use(fn) -- adds middleware (fn receives ctx and next)
  // - .execute(ctx) -- runs all middleware in order
  // Each middleware signature: (ctx, next) => { ... }
  // Middleware must call next() to proceed to the next one
}

// Usage:
// const pipe = createPipeline();
// pipe.use((ctx, next) => { ctx.step1 = true; next(); });
// pipe.use((ctx, next) => { ctx.step2 = true; next(); });
// const ctx = {};
// pipe.execute(ctx);
// // ctx => { step1: true, step2: true }`,
      solution: `function createPipeline() {
  const middlewares = [];

  return {
    use(fn) {
      middlewares.push(fn);
      return this;
    },
    execute(ctx) {
      let index = 0;

      function next() {
        if (index < middlewares.length) {
          const mw = middlewares[index++];
          mw(ctx, next);
        }
      }

      next();
      return ctx;
    },
  };
}`,
      hints: [
        'Store middleware functions in an array.',
        'execute() creates a next function that advances through the array.',
        'Each middleware receives the context and the next function to call.',
      ],
      concepts: ['middleware', 'pipeline', 'chain-of-responsibility', 'composition'],
    },
    {
      id: 'js-advanced-8',
      title: 'Dependency Injection Container',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Build a simple dependency injection container with singleton support.',
      skeleton: `function createContainer() {
  // Return a container with:
  // - .register(name, factory, options?) -- registers a factory function
  //   options: { singleton: boolean } (default false)
  // - .resolve(name) -- calls the factory (passing container) and returns result
  //   If singleton, caches and reuses the first result
}

// Usage:
// const c = createContainer();
// c.register('config', () => ({ port: 3000 }), { singleton: true });
// c.register('server', (c) => ({ config: c.resolve('config') }));
// c.resolve('server') // => { config: { port: 3000 } }`,
      solution: `function createContainer() {
  const registry = new Map();
  const singletons = new Map();

  return {
    register(name, factory, options = {}) {
      registry.set(name, { factory, singleton: options.singleton || false });
      return this;
    },
    resolve(name) {
      const entry = registry.get(name);
      if (!entry) throw new Error(\`Dependency "\${name}" not registered\`);

      if (entry.singleton) {
        if (!singletons.has(name)) {
          singletons.set(name, entry.factory(this));
        }
        return singletons.get(name);
      }

      return entry.factory(this);
    },
  };
}`,
      hints: [
        'Use a Map for the registry and a separate Map for singleton instances.',
        'register stores the factory and singleton flag together.',
        'resolve checks the singleton cache before calling the factory.',
      ],
      concepts: ['dependency-injection', 'ioc', 'singleton', 'container'],
    },
    {
      id: 'js-advanced-9',
      title: 'Predict Proxy Apply Trap',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output of a Proxy with an apply trap wrapping a function.',
      skeleton: `function sum(a, b) {
  return a + b;
}

const traced = new Proxy(sum, {
  apply(target, thisArg, args) {
    console.log(\`args: \${args.join(', ')}\`);
    const result = Reflect.apply(target, thisArg, args);
    console.log(\`result: \${result}\`);
    return result * 2;
  },
});

console.log(traced(3, 4));`,
      solution: `args: 3, 4
result: 7
14`,
      hints: [
        'The apply trap intercepts function calls on the proxy.',
        'Reflect.apply calls the original sum(3, 4) which returns 7.',
        'The trap logs args and result, then returns result * 2 = 14.',
      ],
      concepts: ['proxy', 'apply-trap', 'function-wrapping', 'reflect'],
    },
    {
      id: 'js-advanced-10',
      title: 'Reactive Signal',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Implement a basic reactive signal with automatic dependency tracking.',
      skeleton: `function createSignal(initial) {
  // Return [getter, setter]
  // getter() returns current value
  // setter(newValue) updates value and notifies subscribers
  // .subscribe(fn) on the getter registers a callback
}

function createEffect(fn) {
  // Runs fn immediately
  // Re-runs fn whenever any signal it reads changes
  // Hint: use a global "currentEffect" variable for tracking
}

// Usage:
// const [count, setCount] = createSignal(0);
// createEffect(() => console.log(count())); // logs 0
// setCount(1); // logs 1
// setCount(2); // logs 2`,
      solution: `let currentEffect = null;

function createSignal(initial) {
  let value = initial;
  const subscribers = new Set();

  function getter() {
    if (currentEffect) {
      subscribers.add(currentEffect);
    }
    return value;
  }

  function setter(newValue) {
    value = newValue;
    subscribers.forEach(fn => fn());
  }

  getter.subscribe = (fn) => subscribers.add(fn);

  return [getter, setter];
}

function createEffect(fn) {
  const effect = () => {
    currentEffect = effect;
    fn();
    currentEffect = null;
  };
  effect();
}`,
      hints: [
        'Use a module-level currentEffect variable to track which effect is running.',
        'When a getter is called during an effect, add that effect to the signal subscribers.',
        'When a setter is called, notify all subscribed effects to re-run.',
      ],
      concepts: ['signals', 'reactive-programming', 'dependency-tracking', 'effects'],
    },
    {
      id: 'js-advanced-11',
      title: 'Fix the Proxy Revocable',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fix the bugs in this revocable proxy usage.',
      skeleton: `const { proxy, revoke } = Proxy.createRevocable({ data: 42 }, {
  get(target, prop) {
    return target.prop; // Bug 1: wrong property access
  },
});

console.log(proxy.data); // should log 42

proxy.revoke(); // Bug 2: revoke is called wrong

try {
  console.log(proxy.data);
} catch (e) {
  console.log('Revoked!');
}`,
      solution: `const { proxy, revoke } = Proxy.revocable({ data: 42 }, {
  get(target, prop) {
    return target[prop]; // Fixed: use bracket notation
  },
});

console.log(proxy.data); // logs 42

revoke(); // Fixed: revoke is a standalone function

try {
  console.log(proxy.data);
} catch (e) {
  console.log('Revoked!');
}`,
      hints: [
        'Proxy.revocable (not createRevocable) creates a revocable proxy.',
        'target.prop uses literal "prop" -- use target[prop] for dynamic access.',
        'revoke() is called directly, not as a method on the proxy.',
      ],
      concepts: ['proxy', 'revocable', 'bracket-notation', 'debugging'],
    },
    {
      id: 'js-advanced-12',
      title: 'Virtual DOM Concept',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Implement a minimal virtual DOM with createElement and diff functions.',
      skeleton: `function h(tag, props, ...children) {
  // Return a virtual node: { tag, props, children }
  // children should be flattened (no nested arrays)
}

function diff(oldNode, newNode) {
  // Compare two virtual nodes and return a list of patches
  // Patch types: 'REPLACE', 'PROPS', 'TEXT', 'NONE'
  // Return { type, node?, props? }
}

// Usage:
// const vdom1 = h('div', { id: 'app' }, h('span', null, 'Hello'));
// const vdom2 = h('div', { id: 'app', class: 'active' }, h('span', null, 'World'));
// diff(vdom1, vdom2) // => { type: 'PROPS', props: { class: 'active' }, children: [...] }`,
      solution: `function h(tag, props, ...children) {
  return {
    tag,
    props: props || {},
    children: children.flat(),
  };
}

function diff(oldNode, newNode) {
  if (typeof oldNode === 'string' || typeof newNode === 'string') {
    if (oldNode !== newNode) {
      return { type: 'TEXT', node: newNode };
    }
    return { type: 'NONE' };
  }

  if (!oldNode || !newNode || oldNode.tag !== newNode.tag) {
    return { type: 'REPLACE', node: newNode };
  }

  const propPatches = {};
  const allProps = { ...oldNode.props, ...newNode.props };
  for (const key of Object.keys(allProps)) {
    if (oldNode.props[key] !== newNode.props[key]) {
      propPatches[key] = newNode.props[key];
    }
  }

  const childPatches = [];
  const maxLen = Math.max(oldNode.children.length, newNode.children.length);
  for (let i = 0; i < maxLen; i++) {
    childPatches.push(diff(oldNode.children[i], newNode.children[i]));
  }

  return {
    type: Object.keys(propPatches).length ? 'PROPS' : 'NONE',
    props: propPatches,
    children: childPatches,
  };
}`,
      hints: [
        'h() creates a plain object representing a DOM element with tag, props, and children.',
        'diff compares two vnodes: if tags differ, REPLACE; if same, compare props and recurse on children.',
        'For text nodes (strings), compare directly and return TEXT patch if different.',
      ],
      concepts: ['virtual-dom', 'diffing', 'reconciliation', 'tree-structure'],
    },
    {
      id: 'js-advanced-13',
      title: 'State Machine',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Implement a finite state machine with transition guards.',
      skeleton: `function createMachine(config) {
  // config: { initial, states: { [name]: { on: { [event]: target | { target, guard } } } } }
  // Return { state (getter), send(event, context) }
  // If transition has a guard function, only transition if guard(context) returns true
}

// Usage:
// const machine = createMachine({
//   initial: 'idle',
//   states: {
//     idle: { on: { START: 'running' } },
//     running: { on: {
//       PAUSE: 'paused',
//       STOP: { target: 'idle', guard: (ctx) => ctx.canStop },
//     }},
//     paused: { on: { RESUME: 'running', STOP: 'idle' } },
//   },
// });`,
      solution: `function createMachine(config) {
  let current = config.initial;

  return {
    get state() {
      return current;
    },
    send(event, context = {}) {
      const stateConfig = config.states[current];
      if (!stateConfig || !stateConfig.on) return current;

      const transition = stateConfig.on[event];
      if (!transition) return current;

      if (typeof transition === 'string') {
        current = transition;
      } else if (typeof transition === 'object') {
        if (transition.guard && !transition.guard(context)) {
          return current;
        }
        current = transition.target;
      }

      return current;
    },
  };
}`,
      hints: [
        'Track the current state in a closure variable.',
        'Transitions can be a string (target state) or an object with target and guard.',
        'If a guard function exists, call it with context and only transition if it returns true.',
      ],
      concepts: ['state-machine', 'fsm', 'guards', 'transitions'],
    },
    {
      id: 'js-advanced-14',
      title: 'Predict Middleware Execution',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output of a middleware pipeline execution.',
      skeleton: `const middlewares = [];
const use = (fn) => middlewares.push(fn);

use((ctx, next) => {
  ctx.log.push('A-before');
  next();
  ctx.log.push('A-after');
});

use((ctx, next) => {
  ctx.log.push('B-before');
  next();
  ctx.log.push('B-after');
});

use((ctx, next) => {
  ctx.log.push('C');
});

const ctx = { log: [] };
let i = 0;
function run() {
  if (i < middlewares.length) middlewares[i++](ctx, run);
}
run();
console.log(ctx.log.join(' -> '));`,
      solution: `A-before -> B-before -> C -> B-after -> A-after`,
      hints: [
        'Middleware executes like an onion: A enters, calls next (B), B calls next (C).',
        'C does not call next(), so execution unwinds back through B-after then A-after.',
        'This is the classic Koa-style middleware pattern.',
      ],
      concepts: ['middleware', 'onion-model', 'execution-order', 'call-stack'],
    },
    {
      id: 'js-advanced-15',
      title: 'Fix the Reactive Store',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fix the bugs in this reactive store implementation.',
      skeleton: `function createStore(initial) {
  let state = initial;
  const listeners = [];

  return {
    getState() { return state; },
    setState(updater) {
      state = updater(state);
      listeners.forEach(fn => fn(state)); // Bug 1: called before state update
    },
    subscribe(fn) {
      listeners.push(fn);
      return () => listeners.filter(l => l !== fn); // Bug 2: doesn't mutate
    },
  };
}

const store = createStore({ count: 0 });
const unsub = store.subscribe((s) => console.log(s.count));
store.setState(s => { s.count++; return s; }); // Bug 3: mutates original
console.log(store.getState().count);`,
      solution: `function createStore(initial) {
  let state = initial;
  const listeners = [];

  return {
    getState() { return state; },
    setState(updater) {
      state = updater(state);
      listeners.forEach(fn => fn(state));
    },
    subscribe(fn) {
      listeners.push(fn);
      return () => {
        const index = listeners.indexOf(fn);
        if (index > -1) listeners.splice(index, 1);
      };
    },
  };
}

const store = createStore({ count: 0 });
const unsub = store.subscribe((s) => console.log(s.count));
store.setState(s => ({ ...s, count: s.count + 1 }));
console.log(store.getState().count);`,
      hints: [
        'filter() returns a new array but does not modify the original listeners array.',
        'Use splice() or reassignment to actually remove the listener.',
        'The updater should return a new object, not mutate the existing state.',
      ],
      concepts: ['reactive-store', 'immutability', 'unsubscribe', 'state-management'],
    },
    {
      id: 'js-advanced-16',
      title: 'IoC with Decorators Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Implement an Inversion of Control system using metadata tagging.',
      skeleton: `function createIoC() {
  // Return an IoC container with:
  // - .injectable(name) -- returns a decorator-like function that tags a class
  // - .inject(name) -- marks a dependency requirement
  // - .register(name, Class) -- registers a class with its dependencies
  // - .resolve(name) -- creates an instance, auto-resolving dependencies
  // Dependencies are stored as static property Class.__deps = [...]
}

// Usage:
// const ioc = createIoC();
// class Logger { log(msg) { return msg; } }
// class App { constructor(logger) { this.logger = logger; } }
// App.__deps = ['logger'];
// ioc.register('logger', Logger);
// ioc.register('app', App);
// const app = ioc.resolve('app');
// app.logger.log('works'); // => 'works'`,
      solution: `function createIoC() {
  const registry = new Map();

  return {
    injectable(name) {
      return (Class) => {
        registry.set(name, Class);
        return Class;
      };
    },
    inject(...deps) {
      return (Class) => {
        Class.__deps = deps;
        return Class;
      };
    },
    register(name, Class) {
      registry.set(name, Class);
      return this;
    },
    resolve(name) {
      const Class = registry.get(name);
      if (!Class) throw new Error(\`"\${name}" not registered\`);

      const deps = (Class.__deps || []).map(dep => this.resolve(dep));
      return new Class(...deps);
    },
  };
}`,
      hints: [
        'injectable() and inject() return functions that tag classes with metadata.',
        'resolve() reads __deps from the class and recursively resolves each dependency.',
        'Instantiate the class with new Class(...resolvedDeps).',
      ],
      concepts: ['ioc', 'dependency-injection', 'decorator-pattern', 'metadata'],
    },
    {
      id: 'js-advanced-17',
      title: 'Async Middleware Pipeline',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Implement an async middleware pipeline supporting async/await.',
      skeleton: `function createAsyncPipeline() {
  // Like middleware pipeline but supports async middleware
  // .use(fn) -- fn signature: async (ctx, next) => { ... }
  // .execute(ctx) -- returns a Promise that resolves when all middleware complete
  // Each middleware must await next() to continue the chain
}

// Usage:
// const pipe = createAsyncPipeline();
// pipe.use(async (ctx, next) => {
//   ctx.start = Date.now();
//   await next();
//   ctx.duration = Date.now() - ctx.start;
// });
// pipe.use(async (ctx, next) => {
//   await someAsyncWork();
//   await next();
// });
// await pipe.execute({});`,
      solution: `function createAsyncPipeline() {
  const middlewares = [];

  return {
    use(fn) {
      middlewares.push(fn);
      return this;
    },
    async execute(ctx) {
      let index = 0;

      async function next() {
        if (index >= middlewares.length) return;
        const mw = middlewares[index++];
        await mw(ctx, next);
      }

      await next();
      return ctx;
    },
  };
}`,
      hints: [
        'The next function must be async and return a Promise.',
        'Each middleware awaits next() which runs the rest of the chain.',
        'execute() awaits the initial next() call to wait for all middleware.',
      ],
      concepts: ['async-middleware', 'pipeline', 'async-await', 'composition'],
    },
    {
      id: 'js-advanced-18',
      title: 'Predict Signal Reactivity',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict the output of a reactive signal system.',
      skeleton: `let currentFn = null;

function signal(val) {
  const subs = new Set();
  const s = () => { if (currentFn) subs.add(currentFn); return val; };
  s.set = (v) => { val = v; subs.forEach(fn => fn()); };
  return s;
}

function effect(fn) {
  currentFn = fn;
  fn();
  currentFn = null;
}

const a = signal(1);
const b = signal(2);

const log = [];
effect(() => log.push(a() + b()));
a.set(10);
b.set(20);
console.log(log.join(', '));`,
      solution: `3, 12, 30`,
      hints: [
        'The effect runs immediately: a()=1 + b()=2 = 3, pushed to log.',
        'a.set(10) triggers the effect: a()=10 + b()=2 = 12.',
        'b.set(20) triggers the effect: a()=10 + b()=20 = 30.',
      ],
      concepts: ['signals', 'reactive', 'dependency-tracking', 'effects'],
    },
    {
      id: 'js-advanced-19',
      title: 'Refactor God Object to Modules',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor a monolithic god object into composable modules using a plugin architecture.',
      skeleton: `// Monolithic god object -- everything in one place
const app = {
  users: [],
  posts: [],
  addUser(name) { this.users.push({ name, id: this.users.length + 1 }); },
  removeUser(id) { this.users = this.users.filter(u => u.id !== id); },
  getUser(id) { return this.users.find(u => u.id === id); },
  addPost(userId, text) { this.posts.push({ userId, text, id: this.posts.length + 1 }); },
  removePost(id) { this.posts = this.posts.filter(p => p.id !== id); },
  getPostsByUser(userId) { return this.posts.filter(p => p.userId === userId); },
  getUserWithPosts(id) {
    const user = this.getUser(id);
    return user ? { ...user, posts: this.getPostsByUser(id) } : null;
  },
};

// Refactor into a plugin-based system where userPlugin and postPlugin
// are separate modules registered via app.use()`,
      solution: `function createApp() {
  const plugins = [];
  const state = {};

  const app = {
    state,
    use(plugin) {
      plugin(app);
      return app;
    },
  };

  return app;
}

function userPlugin(app) {
  app.state.users = [];

  app.addUser = (name) => {
    app.state.users.push({ name, id: app.state.users.length + 1 });
  };

  app.removeUser = (id) => {
    app.state.users = app.state.users.filter(u => u.id !== id);
  };

  app.getUser = (id) => {
    return app.state.users.find(u => u.id === id);
  };
}

function postPlugin(app) {
  app.state.posts = [];

  app.addPost = (userId, text) => {
    app.state.posts.push({ userId, text, id: app.state.posts.length + 1 });
  };

  app.removePost = (id) => {
    app.state.posts = app.state.posts.filter(p => p.id !== id);
  };

  app.getPostsByUser = (userId) => {
    return app.state.posts.filter(p => p.userId === userId);
  };
}

function compositePlugin(app) {
  app.getUserWithPosts = (id) => {
    const user = app.getUser(id);
    return user ? { ...user, posts: app.getPostsByUser(id) } : null;
  };
}

const app = createApp();
app.use(userPlugin).use(postPlugin).use(compositePlugin);`,
      hints: [
        'Extract user logic and post logic into separate plugin functions.',
        'Each plugin receives the app and attaches its own methods and state.',
        'A composite plugin can depend on methods added by other plugins.',
      ],
      concepts: ['refactoring', 'plugin-architecture', 'separation-of-concerns', 'modularity'],
    },
    {
      id: 'js-advanced-20',
      title: 'Refactor Callbacks to Reactive Streams',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor callback-based event handling into a reactive observable stream.',
      skeleton: `// Callback-based event handling -- tangled and hard to compose
function setupSearch(input, resultsDiv) {
  let timeout = null;
  input.addEventListener('input', (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const query = e.target.value.trim();
      if (query.length < 3) {
        resultsDiv.innerHTML = '';
        return;
      }
      fetch('/api/search?q=' + encodeURIComponent(query))
        .then(r => r.json())
        .then(results => {
          resultsDiv.innerHTML = results.map(r => '<div>' + r.name + '</div>').join('');
        })
        .catch(err => {
          resultsDiv.innerHTML = '<div class="error">Search failed</div>';
        });
    }, 300);
  });
}

// Refactor into composable observable operators:
// fromEvent -> debounce -> map -> filter -> switchMap -> subscribe`,
      solution: `function fromEvent(element, event) {
  return {
    subscribe(observer) {
      const handler = (e) => observer.next(e);
      element.addEventListener(event, handler);
      return () => element.removeEventListener(event, handler);
    },
  };
}

function pipe(source, ...operators) {
  return operators.reduce((prev, op) => op(prev), source);
}

function debounce(ms) {
  return (source) => ({
    subscribe(observer) {
      let timeout;
      return source.subscribe({
        next(value) {
          clearTimeout(timeout);
          timeout = setTimeout(() => observer.next(value), ms);
        },
      });
    },
  });
}

function map(fn) {
  return (source) => ({
    subscribe(observer) {
      return source.subscribe({ next: (v) => observer.next(fn(v)) });
    },
  });
}

function filter(predicate) {
  return (source) => ({
    subscribe(observer) {
      return source.subscribe({
        next: (v) => { if (predicate(v)) observer.next(v); },
      });
    },
  });
}

function switchMap(fn) {
  return (source) => ({
    subscribe(observer) {
      let innerUnsub = null;
      return source.subscribe({
        next(value) {
          if (innerUnsub) innerUnsub();
          const inner = fn(value);
          innerUnsub = inner.subscribe(observer);
        },
      });
    },
  });
}

function fromPromise(promiseFn) {
  return {
    subscribe(observer) {
      let cancelled = false;
      promiseFn()
        .then(v => { if (!cancelled) observer.next(v); })
        .catch(e => { if (!cancelled && observer.error) observer.error(e); });
      return () => { cancelled = true; };
    },
  };
}

function setupSearch(input, resultsDiv) {
  const search$ = pipe(
    fromEvent(input, 'input'),
    debounce(300),
    map(e => e.target.value.trim()),
    filter(q => q.length >= 3),
    switchMap(q => fromPromise(() =>
      fetch('/api/search?q=' + encodeURIComponent(q)).then(r => r.json())
    )),
  );

  search$.subscribe({
    next(results) {
      resultsDiv.innerHTML = results.map(r => '<div>' + r.name + '</div>').join('');
    },
    error() {
      resultsDiv.innerHTML = '<div class="error">Search failed</div>';
    },
  });
}`,
      hints: [
        'Create small observable factories: fromEvent, fromPromise.',
        'Build operators (debounce, map, filter, switchMap) that take a source and return a new observable.',
        'pipe() chains operators, and the final subscribe wires everything together.',
      ],
      concepts: ['reactive-streams', 'observable', 'operators', 'functional-reactive-programming'],
    },
  ],
};
