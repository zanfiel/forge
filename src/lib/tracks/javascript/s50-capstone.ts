import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-capstone',
  title: '50. Capstone Projects',
  explanation: `## Capstone Projects

These exercises bring together everything you have learned to build complete, functional systems from scratch. Each exercise is a self-contained project that tests your ability to design, implement, and reason about real-world JavaScript patterns.

\`\`\`javascript
// Building real systems requires combining:
// - Data structures and algorithms
// - Design patterns (observer, factory, strategy)
// - Async programming (promises, events)
// - Error handling and edge cases
// - Clean API design

// Example: A minimal event system
class EventBus {
  #handlers = new Map();

  on(event, fn) {
    if (!this.#handlers.has(event)) this.#handlers.set(event, []);
    this.#handlers.get(event).push(fn);
    return () => this.off(event, fn);
  }

  off(event, fn) {
    const fns = this.#handlers.get(event);
    if (fns) this.#handlers.set(event, fns.filter(f => f !== fn));
  }

  emit(event, ...args) {
    (this.#handlers.get(event) || []).forEach(fn => fn(...args));
  }
}
\`\`\`

Each capstone project builds a production-quality module. Focus on correctness, edge cases, and clean APIs.`,
  exercises: [
    {
      id: 'js-capstone-1',
      title: 'Build an Event Emitter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Build a complete event emitter with on, off, once, and emit.',
      skeleton: `function createEmitter() {
  // Return an object with:
  // - .on(event, fn) -- subscribe, returns unsubscribe function
  // - .off(event, fn) -- unsubscribe a specific handler
  // - .once(event, fn) -- subscribe for one emission only
  // - .emit(event, ...args) -- call all handlers for event with args
  // - .listenerCount(event) -- return number of listeners
}

// Usage:
// const emitter = createEmitter();
// emitter.on('data', (x) => console.log(x));
// emitter.once('data', (x) => console.log('once:', x));
// emitter.emit('data', 42); // logs 42 and "once: 42"
// emitter.emit('data', 43); // logs 43 only`,
      solution: `function createEmitter() {
  const handlers = new Map();

  function getHandlers(event) {
    if (!handlers.has(event)) handlers.set(event, []);
    return handlers.get(event);
  }

  return {
    on(event, fn) {
      getHandlers(event).push(fn);
      return () => this.off(event, fn);
    },
    off(event, fn) {
      const fns = getHandlers(event);
      const index = fns.indexOf(fn);
      if (index > -1) fns.splice(index, 1);
    },
    once(event, fn) {
      const wrapper = (...args) => {
        this.off(event, wrapper);
        fn(...args);
      };
      this.on(event, wrapper);
    },
    emit(event, ...args) {
      [...getHandlers(event)].forEach(fn => fn(...args));
    },
    listenerCount(event) {
      return getHandlers(event).length;
    },
  };
}`,
      hints: [
        'Use a Map to store arrays of handler functions per event name.',
        'once() wraps the handler in a function that removes itself after first call.',
        'emit() should copy the handlers array before iterating to handle mid-iteration removal.',
      ],
      concepts: ['event-emitter', 'observer-pattern', 'pub-sub', 'once'],
    },
    {
      id: 'js-capstone-2',
      title: 'Build a Promise Library',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Implement a simplified Promise with then, catch, and resolve/reject.',
      skeleton: `class MyPromise {
  // Implement:
  // - constructor(executor) -- executor receives (resolve, reject)
  // - .then(onFulfilled, onRejected) -- returns a new MyPromise
  // - .catch(onRejected) -- shorthand for .then(undefined, onRejected)
  // - State transitions: pending -> fulfilled or pending -> rejected
  // - Handlers added after settlement should still fire (async)
}

// Usage:
// new MyPromise((resolve) => resolve(42))
//   .then(v => v * 2)
//   .then(v => console.log(v)); // 84`,
      solution: `class MyPromise {
  #state = 'pending';
  #value = undefined;
  #handlers = [];

  constructor(executor) {
    const resolve = (value) => {
      if (this.#state !== 'pending') return;
      this.#state = 'fulfilled';
      this.#value = value;
      this.#flush();
    };

    const reject = (reason) => {
      if (this.#state !== 'pending') return;
      this.#state = 'rejected';
      this.#value = reason;
      this.#flush();
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({ onFulfilled, onRejected, resolve, reject });
      if (this.#state !== 'pending') this.#flush();
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  #flush() {
    queueMicrotask(() => {
      while (this.#handlers.length) {
        const { onFulfilled, onRejected, resolve, reject } = this.#handlers.shift();
        try {
          if (this.#state === 'fulfilled') {
            const result = typeof onFulfilled === 'function' ? onFulfilled(this.#value) : this.#value;
            resolve(result);
          } else {
            if (typeof onRejected === 'function') {
              resolve(onRejected(this.#value));
            } else {
              reject(this.#value);
            }
          }
        } catch (e) {
          reject(e);
        }
      }
    });
  }
}`,
      hints: [
        'Track state (pending/fulfilled/rejected) and value. Only transition once.',
        'then() returns a new promise. Store handlers and flush when settled.',
        'Use queueMicrotask to ensure handlers fire asynchronously.',
      ],
      concepts: ['promises', 'async', 'microtask', 'chaining'],
    },
    {
      id: 'js-capstone-3',
      title: 'Build a Client-Side Router',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Implement a hash-based client-side router with dynamic parameters.',
      skeleton: `function createRouter() {
  // Return a router with:
  // - .route(pattern, handler) -- register a route (pattern like '/users/:id')
  // - .navigate(path) -- match path to route and call handler with params
  // - .start() -- listen for hashchange events
  // - .getCurrentRoute() -- return current matched route info
  // Dynamic params: '/users/:id' matches '/users/42' with { id: '42' }
}

// Usage:
// const router = createRouter();
// router.route('/users/:id', (params) => console.log(params.id));
// router.navigate('/users/42'); // logs '42'`,
      solution: `function createRouter() {
  const routes = [];
  let current = null;

  function matchRoute(path) {
    for (const route of routes) {
      const params = {};
      const patternParts = route.pattern.split('/');
      const pathParts = path.split('/');

      if (patternParts.length !== pathParts.length) continue;

      let matched = true;
      for (let i = 0; i < patternParts.length; i++) {
        if (patternParts[i].startsWith(':')) {
          params[patternParts[i].slice(1)] = pathParts[i];
        } else if (patternParts[i] !== pathParts[i]) {
          matched = false;
          break;
        }
      }

      if (matched) return { route, params };
    }
    return null;
  }

  return {
    route(pattern, handler) {
      routes.push({ pattern, handler });
      return this;
    },
    navigate(path) {
      const match = matchRoute(path);
      if (match) {
        current = { path, params: match.params, pattern: match.route.pattern };
        match.route.handler(match.params);
      }
      return this;
    },
    start() {
      const onHash = () => {
        const path = location.hash.slice(1) || '/';
        this.navigate(path);
      };
      window.addEventListener('hashchange', onHash);
      onHash();
      return () => window.removeEventListener('hashchange', onHash);
    },
    getCurrentRoute() {
      return current;
    },
  };
}`,
      hints: [
        'Split both pattern and path by "/" and compare segments.',
        'Segments starting with ":" are dynamic params -- extract the value from the path.',
        'start() listens for hashchange events and navigates to the current hash.',
      ],
      concepts: ['routing', 'url-parsing', 'dynamic-params', 'spa'],
    },
    {
      id: 'js-capstone-4',
      title: 'Build a Reactive Store',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Build a reactive store with getters, mutations, and subscriptions.',
      skeleton: `function createStore(options) {
  // options: { state, getters, mutations }
  // Return store with:
  // - .state -- current state (read-only via proxy)
  // - .getters -- computed values from state
  // - .commit(mutation, payload) -- run a mutation
  // - .subscribe(fn) -- called after every mutation with (state, mutationName)
}

// Usage:
// const store = createStore({
//   state: { count: 0, items: [] },
//   getters: { doubleCount: (s) => s.count * 2, total: (s) => s.items.length },
//   mutations: {
//     increment(state) { state.count++; },
//     addItem(state, item) { state.items.push(item); },
//   },
// });`,
      solution: `function createStore(options) {
  let state = { ...options.state };
  const subscribers = [];

  const store = {
    get state() {
      return new Proxy(state, {
        set() {
          throw new Error('Cannot mutate state directly. Use commit().');
        },
      });
    },
    get getters() {
      const result = {};
      for (const [key, fn] of Object.entries(options.getters || {})) {
        Object.defineProperty(result, key, {
          get: () => fn(state),
          enumerable: true,
        });
      }
      return result;
    },
    commit(mutation, payload) {
      const fn = options.mutations[mutation];
      if (!fn) throw new Error(\`Unknown mutation: \${mutation}\`);
      fn(state, payload);
      subscribers.forEach(sub => sub(state, mutation));
    },
    subscribe(fn) {
      subscribers.push(fn);
      return () => {
        const idx = subscribers.indexOf(fn);
        if (idx > -1) subscribers.splice(idx, 1);
      };
    },
  };

  return store;
}`,
      hints: [
        'Use a Proxy on state to prevent direct mutation (throw on set).',
        'Getters are computed properties -- use Object.defineProperty with a get function.',
        'commit() calls the named mutation function and notifies all subscribers.',
      ],
      concepts: ['state-management', 'reactive-store', 'vuex-pattern', 'proxy'],
    },
    {
      id: 'js-capstone-5',
      title: 'Build a Virtual DOM',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Implement a virtual DOM with createElement, render, and patch functions.',
      skeleton: `function h(type, props, ...children) {
  // Create a virtual node
}

function render(vnode) {
  // Convert vnode to real DOM element
  // Handle text nodes (strings/numbers)
}

function patch(parent, oldVNode, newVNode, index = 0) {
  // Update the DOM by comparing old and new vnodes
  // Handle: add, remove, replace, update props, recurse children
}

// Usage:
// const vdom = h('div', { class: 'app' },
//   h('h1', null, 'Hello'),
//   h('p', null, 'World'),
// );
// const el = render(vdom);
// document.body.appendChild(el);`,
      solution: `function h(type, props, ...children) {
  return { type, props: props || {}, children: children.flat() };
}

function render(vnode) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return document.createTextNode(String(vnode));
  }

  const el = document.createElement(vnode.type);

  for (const [key, value] of Object.entries(vnode.props)) {
    if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      el.setAttribute(key, value);
    }
  }

  for (const child of vnode.children) {
    el.appendChild(render(child));
  }

  return el;
}

function patch(parent, oldVNode, newVNode, index = 0) {
  const el = parent.childNodes[index];

  if (!oldVNode) {
    parent.appendChild(render(newVNode));
    return;
  }

  if (!newVNode) {
    parent.removeChild(el);
    return;
  }

  if (typeof oldVNode !== typeof newVNode || 
      (typeof oldVNode === 'string' && oldVNode !== newVNode) ||
      oldVNode.type !== newVNode.type) {
    parent.replaceChild(render(newVNode), el);
    return;
  }

  if (typeof newVNode === 'string') return;

  const oldProps = oldVNode.props;
  const newProps = newVNode.props;

  for (const key of Object.keys(newProps)) {
    if (oldProps[key] !== newProps[key]) {
      el.setAttribute(key, newProps[key]);
    }
  }
  for (const key of Object.keys(oldProps)) {
    if (!(key in newProps)) {
      el.removeAttribute(key);
    }
  }

  const maxLen = Math.max(oldVNode.children.length, newVNode.children.length);
  for (let i = 0; i < maxLen; i++) {
    patch(el, oldVNode.children[i], newVNode.children[i], i);
  }
}`,
      hints: [
        'h() creates a plain object with type, props, and flattened children.',
        'render() creates real DOM nodes: text nodes for primitives, elements for objects.',
        'patch() compares old and new vnodes, updating only what changed in the real DOM.',
      ],
      concepts: ['virtual-dom', 'rendering', 'diffing', 'reconciliation'],
    },
    {
      id: 'js-capstone-6',
      title: 'Build a State Machine',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Build a full state machine with enter/exit actions, guards, and history.',
      skeleton: `function createStateMachine(config) {
  // config: {
  //   initial: string,
  //   states: {
  //     [name]: {
  //       onEnter?: (ctx) => void,
  //       onExit?: (ctx) => void,
  //       on: { [event]: string | { target, guard?, action? } }
  //     }
  //   }
  // }
  // Return: {
  //   state -- current state name
  //   context -- mutable context object
  //   send(event) -- attempt a transition
  //   history -- array of past states
  //   matches(state) -- boolean check
  // }
}`,
      solution: `function createStateMachine(config) {
  let current = config.initial;
  const context = config.context ? { ...config.context } : {};
  const history = [current];

  const stateConfig = () => config.states[current];

  if (stateConfig().onEnter) stateConfig().onEnter(context);

  return {
    get state() { return current; },
    get context() { return context; },
    get history() { return [...history]; },

    matches(state) {
      return current === state;
    },

    send(event) {
      const sc = stateConfig();
      if (!sc || !sc.on || !sc.on[event]) return current;

      const transition = sc.on[event];
      let target, guard, action;

      if (typeof transition === 'string') {
        target = transition;
      } else {
        target = transition.target;
        guard = transition.guard;
        action = transition.action;
      }

      if (guard && !guard(context)) return current;

      if (sc.onExit) sc.onExit(context);
      if (action) action(context);

      current = target;
      history.push(current);

      const newSc = stateConfig();
      if (newSc.onEnter) newSc.onEnter(context);

      return current;
    },
  };
}`,
      hints: [
        'Track current state, context object, and history array in closure.',
        'Transitions can be strings or objects with target, guard, and action.',
        'On transition: call onExit on old state, run action, update state, call onEnter on new state.',
      ],
      concepts: ['state-machine', 'fsm', 'enter-exit', 'guards', 'history'],
    },
    {
      id: 'js-capstone-7',
      title: 'Build a Test Framework',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Build a minimal test framework with describe, it, expect, and beforeEach.',
      skeleton: `function createTestRunner() {
  // Return: {
  //   describe(name, fn) -- define a test suite
  //   it(name, fn) -- define a test case
  //   expect(value) -- return assertion object with:
  //     .toBe(expected), .toEqual(expected), .toThrow(), .toBeTruthy()
  //   beforeEach(fn) -- run before each test in current suite
  //   run() -- execute all tests, return { passed, failed, results }
  // }
}

// Usage:
// const t = createTestRunner();
// t.describe('Math', () => {
//   t.it('adds', () => { t.expect(1 + 1).toBe(2); });
//   t.it('fails', () => { t.expect(1 + 1).toBe(3); });
// });
// const report = t.run(); // { passed: 1, failed: 1, results: [...] }`,
      solution: `function createTestRunner() {
  const suites = [];
  let currentSuite = null;

  function expect(actual) {
    return {
      toBe(expected) {
        if (actual !== expected) {
          throw new Error(\`Expected \${JSON.stringify(expected)} but got \${JSON.stringify(actual)}\`);
        }
      },
      toEqual(expected) {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
          throw new Error(\`Expected deep equal \${JSON.stringify(expected)} but got \${JSON.stringify(actual)}\`);
        }
      },
      toThrow() {
        if (typeof actual !== 'function') throw new Error('Expected a function');
        let threw = false;
        try { actual(); } catch { threw = true; }
        if (!threw) throw new Error('Expected function to throw');
      },
      toBeTruthy() {
        if (!actual) throw new Error(\`Expected truthy but got \${JSON.stringify(actual)}\`);
      },
    };
  }

  return {
    expect,
    describe(name, fn) {
      const suite = { name, tests: [], beforeEachFns: [] };
      const prev = currentSuite;
      currentSuite = suite;
      fn();
      currentSuite = prev;
      suites.push(suite);
    },
    it(name, fn) {
      if (currentSuite) {
        currentSuite.tests.push({ name, fn });
      }
    },
    beforeEach(fn) {
      if (currentSuite) {
        currentSuite.beforeEachFns.push(fn);
      }
    },
    run() {
      const results = [];
      let passed = 0;
      let failed = 0;

      for (const suite of suites) {
        for (const test of suite.tests) {
          try {
            suite.beforeEachFns.forEach(fn => fn());
            test.fn();
            results.push({ suite: suite.name, test: test.name, status: 'passed' });
            passed++;
          } catch (e) {
            results.push({ suite: suite.name, test: test.name, status: 'failed', error: e.message });
            failed++;
          }
        }
      }

      return { passed, failed, results };
    },
  };
}`,
      hints: [
        'describe() pushes a suite with tests and beforeEach functions.',
        'it() adds a test to the current suite being defined.',
        'expect() returns an object with assertion methods that throw on failure.',
      ],
      concepts: ['test-framework', 'assertions', 'test-runner', 'describe-it'],
    },
    {
      id: 'js-capstone-8',
      title: 'Build a Template Engine',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Build a template engine supporting interpolation, conditionals, and loops.',
      skeleton: `function createTemplateEngine() {
  // Return: {
  //   compile(template) -- returns a function(data) => string
  // }
  // Syntax:
  //   {{ expression }} -- interpolation
  //   {% if condition %}...{% endif %} -- conditional
  //   {% for item in array %}...{% endfor %} -- loop
  //   Inside loops, {{ item }} refers to current element
}

// Usage:
// const engine = createTemplateEngine();
// const tmpl = engine.compile('Hello {{ name }}!');
// tmpl({ name: 'World' }); // 'Hello World!'`,
      solution: `function createTemplateEngine() {
  return {
    compile(template) {
      return function render(data) {
        let result = template;

        result = result.replace(
          /\\{%\\s*for\\s+(\\w+)\\s+in\\s+(\\w+)\\s*%\\}([\\s\\S]*?)\\{%\\s*endfor\\s*%\\}/g,
          (match, itemName, arrayName, body) => {
            const arr = data[arrayName] || [];
            return arr.map(item => {
              const itemData = { ...data, [itemName]: item };
              return render(itemData).replace(/TEMPLATE_RESTORE/g, '') || 
                     body.replace(/\\{\\{\\s*(\\w+)\\s*\\}\\}/g, (m, key) => {
                       return key === itemName ? item : (itemData[key] ?? '');
                     });
            }).join('');
          }
        );

        result = result.replace(
          /\\{%\\s*if\\s+(\\w+)\\s*%\\}([\\s\\S]*?)\\{%\\s*endif\\s*%\\}/g,
          (match, condition, body) => {
            return data[condition] ? body : '';
          }
        );

        result = result.replace(
          /\\{\\{\\s*(\\w+(?:\\.\\w+)*)\\s*\\}\\}/g,
          (match, path) => {
            const value = path.split('.').reduce((obj, key) => obj?.[key], data);
            return value ?? '';
          }
        );

        return result;
      };
    },
  };
}`,
      hints: [
        'Use regex to match template syntax: {{ }}, {% if %}, {% for %}.',
        'Process loops first (they may contain interpolations), then conditionals, then interpolations.',
        'For dot notation access, split the path and reduce through the data object.',
      ],
      concepts: ['template-engine', 'string-interpolation', 'regex', 'compilation'],
    },
    {
      id: 'js-capstone-9',
      title: 'Build a Form Validator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Build a chainable form validator with built-in and custom rules.',
      skeleton: `function createValidator() {
  // Return a validator builder with chainable rules:
  // - .string() -- value must be a string
  // - .number() -- value must be a number
  // - .required() -- value must not be empty/null/undefined
  // - .min(n) -- min length (string) or min value (number)
  // - .max(n) -- max length (string) or max value (number)
  // - .pattern(regex) -- must match regex
  // - .custom(fn) -- fn(value) returns true or error string
  // - .validate(value) -- returns { valid, errors: string[] }
  //
  // Also: createSchema(shape) -- validates an object
  // shape: { [field]: validator }
  // Returns .validate(obj) => { valid, errors: { [field]: string[] } }
}`,
      solution: `function createValidator() {
  const rules = [];

  const validator = {
    string() {
      rules.push(v => typeof v === 'string' ? null : 'Must be a string');
      return validator;
    },
    number() {
      rules.push(v => typeof v === 'number' && !isNaN(v) ? null : 'Must be a number');
      return validator;
    },
    required() {
      rules.push(v => (v !== null && v !== undefined && v !== '') ? null : 'Required');
      return validator;
    },
    min(n) {
      rules.push(v => {
        if (typeof v === 'string') return v.length >= n ? null : \`Min length is \${n}\`;
        if (typeof v === 'number') return v >= n ? null : \`Min value is \${n}\`;
        return null;
      });
      return validator;
    },
    max(n) {
      rules.push(v => {
        if (typeof v === 'string') return v.length <= n ? null : \`Max length is \${n}\`;
        if (typeof v === 'number') return v <= n ? null : \`Max value is \${n}\`;
        return null;
      });
      return validator;
    },
    pattern(regex) {
      rules.push(v => regex.test(String(v)) ? null : \`Must match \${regex}\`);
      return validator;
    },
    custom(fn) {
      rules.push(v => {
        const result = fn(v);
        return result === true ? null : (result || 'Custom validation failed');
      });
      return validator;
    },
    validate(value) {
      const errors = rules.map(rule => rule(value)).filter(Boolean);
      return { valid: errors.length === 0, errors };
    },
  };

  return validator;
}

function createSchema(shape) {
  return {
    validate(obj) {
      const errors = {};
      let valid = true;

      for (const [field, validator] of Object.entries(shape)) {
        const result = validator.validate(obj[field]);
        if (!result.valid) {
          valid = false;
          errors[field] = result.errors;
        }
      }

      return { valid, errors };
    },
  };
}`,
      hints: [
        'Each rule is a function that returns null (pass) or an error string (fail).',
        'Chainable methods push rules and return the validator for chaining.',
        'createSchema iterates fields, validates each with its validator, collects errors.',
      ],
      concepts: ['validation', 'builder-pattern', 'schema', 'method-chaining'],
    },
    {
      id: 'js-capstone-10',
      title: 'Build a Fetch Wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Build a fetch wrapper with retries, timeout, interceptors, and caching.',
      skeleton: `function createHttpClient(baseURL = '') {
  // Return a client with:
  // - .get(path, options?) -- GET request
  // - .post(path, body, options?) -- POST request
  // - .addInterceptor({ request?, response?, error? }) -- middleware
  // - .setTimeout(ms) -- default timeout for all requests
  // - .setRetries(n) -- retry failed requests n times
  // Options: { headers, params, cache: boolean }
}

// Usage:
// const api = createHttpClient('https://api.example.com');
// api.setTimeout(5000);
// api.setRetries(3);
// api.addInterceptor({ request: (config) => { config.headers.Auth = 'token'; return config; } });
// const data = await api.get('/users');`,
      solution: `function createHttpClient(baseURL = '') {
  let defaultTimeout = 10000;
  let retryCount = 0;
  const interceptors = [];

  async function request(path, options = {}) {
    let config = {
      url: baseURL + path,
      method: options.method || 'GET',
      headers: { 'Content-Type': 'application/json', ...options.headers },
      body: options.body ? JSON.stringify(options.body) : undefined,
    };

    for (const i of interceptors) {
      if (i.request) config = await i.request(config);
    }

    if (options.params) {
      const qs = new URLSearchParams(options.params).toString();
      config.url += '?' + qs;
    }

    let lastError;
    for (let attempt = 0; attempt <= retryCount; attempt++) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), defaultTimeout);

        const response = await fetch(config.url, {
          method: config.method,
          headers: config.headers,
          body: config.body,
          signal: controller.signal,
        });

        clearTimeout(timer);

        let result = { ok: response.ok, status: response.status, data: await response.json() };

        for (const i of interceptors) {
          if (i.response) result = await i.response(result);
        }

        if (!result.ok) throw new Error(\`HTTP \${result.status}\`);
        return result.data;
      } catch (e) {
        lastError = e;
        for (const i of interceptors) {
          if (i.error) i.error(e);
        }
        if (attempt === retryCount) throw lastError;
      }
    }
  }

  return {
    get: (path, opts) => request(path, { ...opts, method: 'GET' }),
    post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
    addInterceptor(i) { interceptors.push(i); return this; },
    setTimeout(ms) { defaultTimeout = ms; return this; },
    setRetries(n) { retryCount = n; return this; },
  };
}`,
      hints: [
        'Use AbortController for request timeouts.',
        'Retry loop: attempt from 0 to retryCount, only throw after all retries fail.',
        'Interceptors modify the config (request) or result (response) in sequence.',
      ],
      concepts: ['http-client', 'fetch', 'retry', 'interceptors', 'timeout'],
    },
    {
      id: 'js-capstone-11',
      title: 'Build a Pub/Sub System',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Build a publish/subscribe system with topic wildcards and message history.',
      skeleton: `function createPubSub() {
  // Return: {
  //   publish(topic, data) -- send message to topic
  //   subscribe(pattern, handler) -- subscribe with wildcard support
  //     'user.*' matches 'user.created', 'user.deleted'
  //     '*' matches everything
  //   unsubscribe(id) -- remove subscription by ID
  //   history(topic?) -- return past messages, optionally filtered by topic
  // }
}

// Usage:
// const ps = createPubSub();
// ps.subscribe('user.*', (topic, data) => console.log(topic, data));
// ps.publish('user.created', { id: 1 }); // handler fires
// ps.publish('order.created', { id: 2 }); // handler does NOT fire`,
      solution: `function createPubSub() {
  let nextId = 0;
  const subscriptions = new Map();
  const messages = [];

  function matchTopic(pattern, topic) {
    if (pattern === '*') return true;
    const patternParts = pattern.split('.');
    const topicParts = topic.split('.');
    if (patternParts.length !== topicParts.length) return false;
    return patternParts.every((p, i) => p === '*' || p === topicParts[i]);
  }

  return {
    publish(topic, data) {
      const message = { topic, data, timestamp: Date.now() };
      messages.push(message);
      for (const [id, sub] of subscriptions) {
        if (matchTopic(sub.pattern, topic)) {
          sub.handler(topic, data);
        }
      }
    },
    subscribe(pattern, handler) {
      const id = nextId++;
      subscriptions.set(id, { pattern, handler });
      return id;
    },
    unsubscribe(id) {
      return subscriptions.delete(id);
    },
    history(topic) {
      if (!topic) return [...messages];
      return messages.filter(m => m.topic === topic);
    },
  };
}`,
      hints: [
        'matchTopic compares pattern and topic segments: "*" matches any single segment.',
        'Store subscriptions in a Map with numeric IDs for easy removal.',
        'Keep a messages array for history, with timestamps for ordering.',
      ],
      concepts: ['pub-sub', 'wildcards', 'message-history', 'decoupling'],
    },
    {
      id: 'js-capstone-12',
      title: 'Build a Task Scheduler',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Build an async task scheduler with concurrency limits and priority queues.',
      skeleton: `function createScheduler(concurrency = 3) {
  // Return: {
  //   schedule(task, priority?) -- add async task (function returning promise)
  //     priority: 'high' | 'normal' | 'low' (default: 'normal')
  //   run() -- start processing the queue
  //   pause() -- pause processing
  //   getStats() -- { pending, running, completed, failed }
  // }
  // High priority tasks run before normal, normal before low
  // At most 'concurrency' tasks run in parallel
}`,
      solution: `function createScheduler(concurrency = 3) {
  const queues = { high: [], normal: [], low: [] };
  let running = 0;
  let paused = false;
  const stats = { pending: 0, running: 0, completed: 0, failed: 0 };

  function getNext() {
    if (queues.high.length) return queues.high.shift();
    if (queues.normal.length) return queues.normal.shift();
    if (queues.low.length) return queues.low.shift();
    return null;
  }

  async function process() {
    if (paused || running >= concurrency) return;

    const task = getNext();
    if (!task) return;

    running++;
    stats.running++;
    stats.pending--;

    try {
      await task();
      stats.completed++;
    } catch {
      stats.failed++;
    } finally {
      running--;
      stats.running--;
      process();
    }
  }

  function drain() {
    const available = concurrency - running;
    for (let i = 0; i < available; i++) {
      process();
    }
  }

  return {
    schedule(task, priority = 'normal') {
      queues[priority].push(task);
      stats.pending++;
      if (!paused) drain();
      return this;
    },
    run() {
      paused = false;
      drain();
      return this;
    },
    pause() {
      paused = true;
      return this;
    },
    getStats() {
      return { ...stats };
    },
  };
}`,
      hints: [
        'Use three separate queues for high, normal, and low priority.',
        'getNext() checks queues in priority order and returns the first available task.',
        'After each task completes (or fails), decrement running and process the next task.',
      ],
      concepts: ['task-scheduler', 'concurrency', 'priority-queue', 'async'],
    },
    {
      id: 'js-capstone-13',
      title: 'Build a Middleware Pipeline',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Build a full Express/Koa-style middleware pipeline with error handling.',
      skeleton: `function createApp() {
  // Return: {
  //   use(path?, middleware) -- register middleware
  //     If path provided, only run for matching paths
  //     Middleware signature: async (ctx, next) => {}
  //   useError(handler) -- error middleware: (err, ctx, next) => {}
  //   handle(ctx) -- run the pipeline for a request context
  //     ctx: { path, method, body?, headers?, response: {} }
  // }
}

// Usage:
// const app = createApp();
// app.use(async (ctx, next) => { ctx.start = Date.now(); await next(); });
// app.use('/api', async (ctx, next) => { ctx.response.api = true; await next(); });
// app.useError((err, ctx) => { ctx.response.error = err.message; });
// await app.handle({ path: '/api/users', method: 'GET', response: {} });`,
      solution: `function createApp() {
  const middlewares = [];
  const errorHandlers = [];

  return {
    use(pathOrFn, maybeFn) {
      if (typeof pathOrFn === 'function') {
        middlewares.push({ path: null, fn: pathOrFn });
      } else {
        middlewares.push({ path: pathOrFn, fn: maybeFn });
      }
      return this;
    },

    useError(handler) {
      errorHandlers.push(handler);
      return this;
    },

    async handle(ctx) {
      let index = 0;

      const next = async () => {
        while (index < middlewares.length) {
          const mw = middlewares[index++];
          if (mw.path === null || ctx.path.startsWith(mw.path)) {
            await mw.fn(ctx, next);
            return;
          }
        }
      };

      try {
        await next();
      } catch (err) {
        for (const handler of errorHandlers) {
          await handler(err, ctx, () => {});
        }
        if (errorHandlers.length === 0) throw err;
      }

      return ctx;
    },
  };
}`,
      hints: [
        'Middleware can have an optional path prefix filter.',
        'next() advances to the next matching middleware in the stack.',
        'Wrap the pipeline in try/catch and route errors to error handlers.',
      ],
      concepts: ['middleware', 'error-handling', 'path-matching', 'express-pattern'],
    },
    {
      id: 'js-capstone-14',
      title: 'Build a Dependency Injector',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Build a DI container with scopes, lifecycle hooks, and circular dependency detection.',
      skeleton: `function createContainer() {
  // Return: {
  //   register(name, factory, options?) -- register a dependency
  //     options: { singleton, scope, onDispose }
  //   resolve(name) -- resolve a dependency (with circular detection)
  //   createScope() -- create a child scope inheriting parent registrations
  //   dispose() -- call onDispose for all singletons, clear cache
  // }
  // Circular dependency detection: throw if A -> B -> A
}`,
      solution: `function createContainer(parent = null) {
  const registry = new Map();
  const instances = new Map();
  const resolving = new Set();

  return {
    register(name, factory, options = {}) {
      registry.set(name, {
        factory,
        singleton: options.singleton || false,
        onDispose: options.onDispose || null,
      });
      return this;
    },

    resolve(name) {
      if (resolving.has(name)) {
        throw new Error(\`Circular dependency detected: \${[...resolving, name].join(' -> ')}\`);
      }

      if (instances.has(name)) return instances.get(name);

      const entry = registry.get(name) || (parent ? null : undefined);

      if (!entry && parent) return parent.resolve(name);
      if (!entry) throw new Error(\`Dependency "\${name}" not registered\`);

      resolving.add(name);
      try {
        const instance = entry.factory(this);
        if (entry.singleton) instances.set(name, instance);
        return instance;
      } finally {
        resolving.delete(name);
      }
    },

    createScope() {
      return createContainer(this);
    },

    dispose() {
      for (const [name, instance] of instances) {
        const entry = registry.get(name);
        if (entry?.onDispose) entry.onDispose(instance);
      }
      instances.clear();
    },
  };
}`,
      hints: [
        'Use a Set to track currently-resolving names for circular dependency detection.',
        'Child scopes delegate to parent.resolve() when a dependency is not found locally.',
        'dispose() iterates all cached singletons and calls their onDispose hooks.',
      ],
      concepts: ['dependency-injection', 'scopes', 'lifecycle', 'circular-detection'],
    },
    {
      id: 'js-capstone-15',
      title: 'Build a Cache with TTL and LRU',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Build a cache supporting TTL expiry and LRU eviction.',
      skeleton: `function createCache(options = {}) {
  // options: { maxSize?: number, defaultTTL?: number (ms) }
  // Return: {
  //   get(key) -- return value or undefined if expired/missing
  //   set(key, value, ttl?) -- store with optional TTL override
  //   has(key) -- check if key exists and not expired
  //   delete(key) -- remove entry
  //   clear() -- remove all entries
  //   size -- current number of entries
  //   stats() -- { hits, misses, evictions }
  // }
  // LRU: when maxSize exceeded, evict least recently used entry
}`,
      solution: `function createCache(options = {}) {
  const { maxSize = Infinity, defaultTTL = 0 } = options;
  const entries = new Map();
  let hits = 0;
  let misses = 0;
  let evictions = 0;

  function isExpired(entry) {
    if (!entry.expiry) return false;
    return Date.now() > entry.expiry;
  }

  function evict() {
    if (entries.size <= maxSize) return;
    const oldest = entries.keys().next().value;
    entries.delete(oldest);
    evictions++;
  }

  function touch(key) {
    const entry = entries.get(key);
    entries.delete(key);
    entries.set(key, entry);
  }

  return {
    get(key) {
      const entry = entries.get(key);
      if (!entry || isExpired(entry)) {
        if (entry) entries.delete(key);
        misses++;
        return undefined;
      }
      hits++;
      touch(key);
      return entry.value;
    },

    set(key, value, ttl) {
      const expiry = (ttl || defaultTTL) ? Date.now() + (ttl || defaultTTL) : null;
      entries.delete(key);
      entries.set(key, { value, expiry });
      evict();
      return this;
    },

    has(key) {
      const entry = entries.get(key);
      if (!entry || isExpired(entry)) {
        if (entry) entries.delete(key);
        return false;
      }
      return true;
    },

    delete(key) {
      return entries.delete(key);
    },

    clear() {
      entries.clear();
    },

    get size() {
      return entries.size;
    },

    stats() {
      return { hits, misses, evictions };
    },
  };
}`,
      hints: [
        'Use a Map for insertion-order tracking -- the first key is the LRU candidate.',
        'On get(), move the accessed entry to the end (delete + re-set) for LRU freshness.',
        'TTL: store expiry timestamp with each entry, check on get/has.',
      ],
      concepts: ['cache', 'lru', 'ttl', 'eviction', 'map-ordering'],
    },
    {
      id: 'js-capstone-16',
      title: 'Build an Observer System',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Build an observable data model where properties auto-notify watchers.',
      skeleton: `function createObservable(data) {
  // Return a proxied object where:
  // - Reading/writing properties works normally
  // - .watch(path, callback) -- watch a specific property path for changes
  //   callback receives (newValue, oldValue)
  //   path can be nested: 'user.name'
  // - .unwatch(path, callback) -- stop watching
  // - .batch(fn) -- batch multiple changes, notify once after fn completes
}

// Usage:
// const state = createObservable({ user: { name: 'Alice' }, count: 0 });
// state.watch('count', (n, o) => console.log(o, '->', n));
// state.count = 1; // logs "0 -> 1"`,
      solution: `function createObservable(data) {
  const watchers = new Map();
  let batching = false;
  const pendingNotifications = new Map();

  function getWatchers(path) {
    if (!watchers.has(path)) watchers.set(path, new Set());
    return watchers.get(path);
  }

  function notify(path, newVal, oldVal) {
    if (batching) {
      pendingNotifications.set(path, { newVal, oldVal });
      return;
    }
    for (const cb of getWatchers(path)) {
      cb(newVal, oldVal);
    }
  }

  function getByPath(obj, path) {
    return path.split('.').reduce((o, k) => o?.[k], obj);
  }

  function makeProxy(obj, parentPath = '') {
    return new Proxy(obj, {
      get(target, prop) {
        if (prop === 'watch') return (path, cb) => getWatchers(path).add(cb);
        if (prop === 'unwatch') return (path, cb) => getWatchers(path).delete(cb);
        if (prop === 'batch') return (fn) => {
          batching = true;
          fn();
          batching = false;
          for (const [path, { newVal, oldVal }] of pendingNotifications) {
            for (const cb of getWatchers(path)) cb(newVal, oldVal);
          }
          pendingNotifications.clear();
        };

        const value = Reflect.get(target, prop);
        if (typeof value === 'object' && value !== null) {
          const path = parentPath ? \`\${parentPath}.\${String(prop)}\` : String(prop);
          return makeProxy(value, path);
        }
        return value;
      },
      set(target, prop, value) {
        const path = parentPath ? \`\${parentPath}.\${String(prop)}\` : String(prop);
        const oldVal = target[prop];
        const result = Reflect.set(target, prop, value);
        if (oldVal !== value) notify(path, value, oldVal);
        return result;
      },
    });
  }

  return makeProxy(data);
}`,
      hints: [
        'Use a recursive Proxy that tracks the property path as it goes deeper.',
        'notify() sends (newValue, oldValue) to all watchers registered for that path.',
        'batch() sets a flag, collects notifications, and fires them all after the function completes.',
      ],
      concepts: ['observable', 'proxy', 'watch', 'batch-notifications'],
    },
    {
      id: 'js-capstone-17',
      title: 'Build a Command System',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Build a command pattern system with undo/redo and command history.',
      skeleton: `function createCommandManager() {
  // Return: {
  //   execute(command) -- run a command
  //     command: { execute(), undo(), description? }
  //   undo() -- undo last command
  //   redo() -- redo last undone command
  //   canUndo -- boolean
  //   canRedo -- boolean
  //   history() -- array of executed command descriptions
  //   macro(name, commands) -- create a compound command from multiple commands
  // }
}

// Usage:
// const mgr = createCommandManager();
// const state = { value: 0 };
// mgr.execute({ execute: () => state.value = 1, undo: () => state.value = 0, description: 'set 1' });
// mgr.undo(); // state.value === 0
// mgr.redo(); // state.value === 1`,
      solution: `function createCommandManager() {
  const undoStack = [];
  const redoStack = [];

  return {
    execute(command) {
      command.execute();
      undoStack.push(command);
      redoStack.length = 0;
      return this;
    },

    undo() {
      if (!undoStack.length) return this;
      const command = undoStack.pop();
      command.undo();
      redoStack.push(command);
      return this;
    },

    redo() {
      if (!redoStack.length) return this;
      const command = redoStack.pop();
      command.execute();
      undoStack.push(command);
      return this;
    },

    get canUndo() {
      return undoStack.length > 0;
    },

    get canRedo() {
      return redoStack.length > 0;
    },

    history() {
      return undoStack.map(cmd => cmd.description || 'unnamed');
    },

    macro(name, commands) {
      return {
        description: name,
        execute() { commands.forEach(cmd => cmd.execute()); },
        undo() { [...commands].reverse().forEach(cmd => cmd.undo()); },
      };
    },
  };
}`,
      hints: [
        'Maintain two stacks: undoStack and redoStack.',
        'execute() pushes to undoStack and clears redoStack (new action invalidates redo).',
        'macro() creates a compound command that executes all in order and undoes in reverse.',
      ],
      concepts: ['command-pattern', 'undo-redo', 'macro', 'history'],
    },
    {
      id: 'js-capstone-18',
      title: 'Build a Serializer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Build a serializer that handles types JSON.stringify cannot (Date, Map, Set, RegExp, undefined).',
      skeleton: `function createSerializer() {
  // Return: {
  //   serialize(value) -- convert to JSON string with type preservation
  //   deserialize(json) -- restore from JSON string with correct types
  //   registerType(name, { test, serialize, deserialize }) -- custom type handler
  // }
  // Must handle: Date, Map, Set, RegExp, undefined, BigInt, nested structures
}

// Usage:
// const s = createSerializer();
// const data = { date: new Date(), items: new Set([1,2,3]), pattern: /test/gi };
// const json = s.serialize(data);
// const restored = s.deserialize(json);
// restored.date instanceof Date // true
// restored.items instanceof Set // true`,
      solution: `function createSerializer() {
  const types = new Map();

  function registerBuiltins() {
    types.set('Date', {
      test: v => v instanceof Date,
      serialize: v => v.toISOString(),
      deserialize: v => new Date(v),
    });
    types.set('Map', {
      test: v => v instanceof Map,
      serialize: v => [...v.entries()],
      deserialize: v => new Map(v),
    });
    types.set('Set', {
      test: v => v instanceof Set,
      serialize: v => [...v],
      deserialize: v => new Set(v),
    });
    types.set('RegExp', {
      test: v => v instanceof RegExp,
      serialize: v => ({ source: v.source, flags: v.flags }),
      deserialize: v => new RegExp(v.source, v.flags),
    });
    types.set('undefined', {
      test: v => v === undefined,
      serialize: () => null,
      deserialize: () => undefined,
    });
    types.set('BigInt', {
      test: v => typeof v === 'bigint',
      serialize: v => v.toString(),
      deserialize: v => BigInt(v),
    });
  }

  registerBuiltins();

  function encode(value) {
    for (const [name, handler] of types) {
      if (handler.test(value)) {
        return { __type: name, __value: encode(handler.serialize(value)) };
      }
    }

    if (Array.isArray(value)) return value.map(encode);

    if (value !== null && typeof value === 'object') {
      const result = {};
      for (const [k, v] of Object.entries(value)) {
        result[k] = encode(v);
      }
      return result;
    }

    return value;
  }

  function decode(value) {
    if (value !== null && typeof value === 'object' && !Array.isArray(value) && '__type' in value) {
      const handler = types.get(value.__type);
      if (handler) return handler.deserialize(decode(value.__value));
    }

    if (Array.isArray(value)) return value.map(decode);

    if (value !== null && typeof value === 'object') {
      const result = {};
      for (const [k, v] of Object.entries(value)) {
        result[k] = decode(v);
      }
      return result;
    }

    return value;
  }

  return {
    serialize(value) {
      return JSON.stringify(encode(value));
    },
    deserialize(json) {
      return decode(JSON.parse(json));
    },
    registerType(name, handler) {
      types.set(name, handler);
      return this;
    },
  };
}`,
      hints: [
        'Wrap special types in { __type, __value } markers during encoding.',
        'Recursively encode/decode so nested structures are handled.',
        'registerType allows user-defined types following the same test/serialize/deserialize pattern.',
      ],
      concepts: ['serialization', 'type-preservation', 'json', 'extensibility'],
    },
    {
      id: 'js-capstone-19',
      title: 'Build a Runtime Type Checker',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Build a runtime type system with composable type validators.',
      skeleton: `function T() {
  // Return a type builder namespace with:
  // T.string() -- validates string
  // T.number() -- validates number
  // T.boolean() -- validates boolean
  // T.array(itemType) -- validates array of itemType
  // T.object(shape) -- validates object matching shape
  // T.union(...types) -- validates if any type matches
  // T.optional(type) -- allows undefined/null
  // T.literal(value) -- exact value match
  // Each returns { check(value): { ok, errors } }
}

// Usage:
// const UserType = T.object({
//   name: T.string(),
//   age: T.number(),
//   tags: T.array(T.string()),
//   role: T.union(T.literal('admin'), T.literal('user')),
// });
// UserType.check({ name: 'Alice', age: 30, tags: ['dev'], role: 'admin' }) // { ok: true }`,
      solution: `const T = (() => {
  function createType(checkFn) {
    return {
      check(value) {
        const errors = [];
        checkFn(value, errors, '');
        return { ok: errors.length === 0, errors };
      },
      _check: checkFn,
    };
  }

  return {
    string() {
      return createType((v, errors, path) => {
        if (typeof v !== 'string') errors.push(\`\${path || 'value'} must be a string\`);
      });
    },
    number() {
      return createType((v, errors, path) => {
        if (typeof v !== 'number' || isNaN(v)) errors.push(\`\${path || 'value'} must be a number\`);
      });
    },
    boolean() {
      return createType((v, errors, path) => {
        if (typeof v !== 'boolean') errors.push(\`\${path || 'value'} must be a boolean\`);
      });
    },
    array(itemType) {
      return createType((v, errors, path) => {
        if (!Array.isArray(v)) {
          errors.push(\`\${path || 'value'} must be an array\`);
          return;
        }
        v.forEach((item, i) => itemType._check(item, errors, \`\${path}[\${i}]\`));
      });
    },
    object(shape) {
      return createType((v, errors, path) => {
        if (typeof v !== 'object' || v === null || Array.isArray(v)) {
          errors.push(\`\${path || 'value'} must be an object\`);
          return;
        }
        for (const [key, type] of Object.entries(shape)) {
          type._check(v[key], errors, path ? \`\${path}.\${key}\` : key);
        }
      });
    },
    union(...types) {
      return createType((v, errors, path) => {
        const allErrors = [];
        for (const type of types) {
          const typeErrors = [];
          type._check(v, typeErrors, path);
          if (typeErrors.length === 0) return;
          allErrors.push(...typeErrors);
        }
        errors.push(\`\${path || 'value'} did not match any union type\`);
      });
    },
    optional(type) {
      return createType((v, errors, path) => {
        if (v === undefined || v === null) return;
        type._check(v, errors, path);
      });
    },
    literal(expected) {
      return createType((v, errors, path) => {
        if (v !== expected) errors.push(\`\${path || 'value'} must be \${JSON.stringify(expected)}\`);
      });
    },
  };
})();`,
      hints: [
        'Each type returns an object with a check() method and an internal _check(value, errors, path).',
        'Composite types (array, object, union) call _check on their child types recursively.',
        'union succeeds if any child type has zero errors; optional allows null/undefined.',
      ],
      concepts: ['type-checking', 'runtime-validation', 'composite-types', 'path-tracking'],
    },
    {
      id: 'js-capstone-20',
      title: 'Grand Finale: Build a Micro-Framework',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Build a complete micro-framework combining reactivity, components, routing, and state management.',
      skeleton: `function createFramework() {
  // Build a micro-framework that integrates:
  // 1. Reactive signals (createSignal, createEffect)
  // 2. Component system (define components with render functions)
  // 3. Simple router (hash-based, with params)
  // 4. Global store (state + mutations + subscriptions)
  //
  // Return: {
  //   signal(initial) -- [getter, setter] reactive pair
  //   effect(fn) -- auto-re-run when signals change
  //   component(name, renderFn) -- register a component
  //   mount(name, element) -- render a component into an element
  //   router -- { route(path, component), navigate(path), current() }
  //   store -- { state, commit(mutation, payload), subscribe(fn) }
  //   createApp(config) -- initialize with { routes, state, mutations }
  // }
}

// Usage:
// const fw = createFramework();
// const [count, setCount] = fw.signal(0);
// fw.effect(() => console.log('Count:', count()));
// fw.component('counter', () => \`<div>\${count()}</div>\`);
// fw.createApp({
//   routes: { '/': 'counter' },
//   state: { theme: 'dark' },
//   mutations: { toggleTheme: (s) => { s.theme = s.theme === 'dark' ? 'light' : 'dark'; } },
// });`,
      solution: `function createFramework() {
  let currentEffect = null;

  // --- Reactivity ---
  function signal(initial) {
    let value = initial;
    const subs = new Set();

    const getter = () => {
      if (currentEffect) subs.add(currentEffect);
      return value;
    };

    const setter = (newVal) => {
      if (value === newVal) return;
      value = newVal;
      [...subs].forEach(fn => fn());
    };

    return [getter, setter];
  }

  function effect(fn) {
    const run = () => {
      currentEffect = run;
      fn();
      currentEffect = null;
    };
    run();
    return run;
  }

  // --- Components ---
  const components = new Map();

  function component(name, renderFn) {
    components.set(name, renderFn);
  }

  function mount(name, element) {
    const renderFn = components.get(name);
    if (!renderFn) throw new Error(\`Component "\${name}" not found\`);

    effect(() => {
      const html = renderFn();
      if (typeof element === 'string') {
        const el = document.querySelector(element);
        if (el) el.innerHTML = html;
      } else if (element && element.innerHTML !== undefined) {
        element.innerHTML = html;
      }
    });
  }

  // --- Router ---
  const routes = new Map();
  const [currentPath, setCurrentPath] = signal('/');

  const router = {
    route(path, componentName) {
      routes.set(path, componentName);
      return router;
    },
    navigate(path) {
      setCurrentPath(path);
      if (typeof location !== 'undefined') location.hash = path;
    },
    current() {
      return currentPath();
    },
    match() {
      const path = currentPath();
      for (const [pattern, comp] of routes) {
        const params = matchRoute(pattern, path);
        if (params) return { component: comp, params };
      }
      return null;
    },
  };

  function matchRoute(pattern, path) {
    const pp = pattern.split('/');
    const rp = path.split('/');
    if (pp.length !== rp.length) return null;
    const params = {};
    for (let i = 0; i < pp.length; i++) {
      if (pp[i].startsWith(':')) params[pp[i].slice(1)] = rp[i];
      else if (pp[i] !== rp[i]) return null;
    }
    return params;
  }

  // --- Store ---
  function createStore(config) {
    const state = { ...(config.state || {}) };
    const mutations = config.mutations || {};
    const subscribers = [];

    return {
      state: new Proxy(state, {
        set() { throw new Error('Use commit() to modify state'); },
      }),
      commit(name, payload) {
        const fn = mutations[name];
        if (!fn) throw new Error(\`Unknown mutation: \${name}\`);
        fn(state, payload);
        subscribers.forEach(sub => sub(state, name));
      },
      subscribe(fn) {
        subscribers.push(fn);
        return () => {
          const idx = subscribers.indexOf(fn);
          if (idx > -1) subscribers.splice(idx, 1);
        };
      },
      getState() { return { ...state }; },
    };
  }

  // --- App ---
  let appStore = null;

  function createApp(config = {}) {
    if (config.routes) {
      for (const [path, comp] of Object.entries(config.routes)) {
        router.route(path, comp);
      }
    }

    if (config.state || config.mutations) {
      appStore = createStore({
        state: config.state,
        mutations: config.mutations,
      });
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', () => {
        setCurrentPath(location.hash.slice(1) || '/');
      });
    }

    return { store: appStore, router };
  }

  return {
    signal,
    effect,
    component,
    mount,
    router,
    get store() { return appStore; },
    createApp,
  };
}`,
      hints: [
        'Combine signals + effects for reactivity, making mount() auto-update components.',
        'The router uses a signal for current path, so effects depending on it auto-re-run.',
        'The store uses a Proxy to enforce commit-only mutations, with a subscriber notification system.',
      ],
      concepts: ['micro-framework', 'reactivity', 'components', 'routing', 'state-management', 'architecture'],
    },
  ],
};
