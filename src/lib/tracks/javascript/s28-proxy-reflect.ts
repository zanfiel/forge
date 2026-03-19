import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-proxy',
  title: '28. Proxy & Reflect',
  explanation: `## Proxy & Reflect

Proxy lets you intercept and customize fundamental operations on objects. Reflect provides methods that mirror Proxy traps.

\`\`\`javascript
const handler = {
  get(target, prop, receiver) {
    console.log(\`Reading \${String(prop)}\`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    console.log(\`Writing \${String(prop)} = \${value}\`);
    return Reflect.set(target, prop, value, receiver);
  },
};

const obj = new Proxy({}, handler);
obj.name = 'Alice';  // logs: Writing name = Alice
obj.name;            // logs: Reading name

// Revocable proxy
const { proxy, revoke } = Proxy.revocable({}, handler);
revoke(); // proxy is now unusable
\`\`\`

Proxy traps include: get, set, has, deleteProperty, apply, construct, ownKeys, getOwnPropertyDescriptor, defineProperty, and more. Always use Reflect inside traps to preserve default behavior.`,
  exercises: [
    {
      id: 'js-proxy-1',
      title: 'Basic Proxy with get trap',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to create a Proxy with a get trap.',
      skeleton: `const handler = {
  __BLANK__(target, prop) {
    return prop in target ? target[prop] : 'default';
  },
};

const obj = new __BLANK__({ name: 'Alice' }, handler);
console.log(obj.name);    // 'Alice'
console.log(obj.missing); // 'default'`,
      solution: `const handler = {
  get(target, prop) {
    return prop in target ? target[prop] : 'default';
  },
};

const obj = new Proxy({ name: 'Alice' }, handler);
console.log(obj.name);    // 'Alice'
console.log(obj.missing); // 'default'`,
      hints: [
        'The get trap intercepts property reads.',
        'new Proxy(target, handler) creates the proxy.',
        'Check if the property exists with "in" operator.',
      ],
      concepts: ['Proxy constructor', 'get trap'],
    },
    {
      id: 'js-proxy-2',
      title: 'Set trap with validation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to create a set trap that validates values are numbers.',
      skeleton: `const handler = {
  __BLANK__(target, prop, value) {
    if (typeof value !== 'number') {
      throw new __BLANK__(\`\${prop} must be a number\`);
    }
    target[prop] = value;
    return __BLANK__;
  },
};

const scores = new Proxy({}, handler);
scores.math = 95; // OK`,
      solution: `const handler = {
  set(target, prop, value) {
    if (typeof value !== 'number') {
      throw new TypeError(\`\${prop} must be a number\`);
    }
    target[prop] = value;
    return true;
  },
};

const scores = new Proxy({}, handler);
scores.math = 95; // OK`,
      hints: [
        'The set trap intercepts property writes.',
        'Throw a TypeError for invalid values.',
        'The set trap must return true to indicate success.',
      ],
      concepts: ['set trap', 'validation proxy'],
    },
    {
      id: 'js-proxy-3',
      title: 'Has trap',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to intercept the "in" operator with a has trap.',
      skeleton: `const handler = {
  __BLANK__(target, prop) {
    if (prop.startsWith('_')) {
      return __BLANK__;
    }
    return prop __BLANK__ target;
  },
};

const obj = new Proxy({ _secret: 42, name: 'Alice' }, handler);
console.log('name' in obj);    // true
console.log('_secret' in obj); // false (hidden)`,
      solution: `const handler = {
  has(target, prop) {
    if (prop.startsWith('_')) {
      return false;
    }
    return prop in target;
  },
};

const obj = new Proxy({ _secret: 42, name: 'Alice' }, handler);
console.log('name' in obj);    // true
console.log('_secret' in obj); // false (hidden)`,
      hints: [
        'The has trap intercepts the "in" operator.',
        'Return false to hide underscore-prefixed properties.',
        'Use "prop in target" for the default behavior.',
      ],
      concepts: ['has trap', 'property hiding'],
    },
    {
      id: 'js-proxy-4',
      title: 'Reflect.get and Reflect.set',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to use Reflect inside proxy traps.',
      skeleton: `const handler = {
  get(target, prop, receiver) {
    console.log(\`get: \${String(prop)}\`);
    return __BLANK__.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    console.log(\`set: \${String(prop)}\`);
    return __BLANK__.set(target, prop, value, receiver);
  },
};

const obj = new Proxy({ x: 1 }, handler);`,
      solution: `const handler = {
  get(target, prop, receiver) {
    console.log(\`get: \${String(prop)}\`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    console.log(\`set: \${String(prop)}\`);
    return Reflect.set(target, prop, value, receiver);
  },
};

const obj = new Proxy({ x: 1 }, handler);`,
      hints: [
        'Reflect methods mirror each Proxy trap.',
        'Reflect.get and Reflect.set forward the operation to the target.',
        'Always pass receiver to preserve correct "this" binding.',
      ],
      concepts: ['Reflect.get', 'Reflect.set', 'receiver'],
    },
    {
      id: 'js-proxy-5',
      title: 'deleteProperty trap',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to prevent deletion of properties starting with underscore.',
      skeleton: `const handler = {
  __BLANK__(target, prop) {
    if (typeof prop === 'string' && prop.startsWith('_')) {
      throw new Error(\`Cannot delete private property \${prop}\`);
    }
    return __BLANK__.deleteProperty(target, prop);
  },
};

const obj = new Proxy({ _id: 1, name: 'test' }, handler);
delete obj.name;  // OK
// delete obj._id; // throws Error`,
      solution: `const handler = {
  deleteProperty(target, prop) {
    if (typeof prop === 'string' && prop.startsWith('_')) {
      throw new Error(\`Cannot delete private property \${prop}\`);
    }
    return Reflect.deleteProperty(target, prop);
  },
};

const obj = new Proxy({ _id: 1, name: 'test' }, handler);
delete obj.name;  // OK
// delete obj._id; // throws Error`,
      hints: [
        'The deleteProperty trap intercepts the delete operator.',
        'Use Reflect.deleteProperty for the default behavior.',
        'Throw an Error to prevent deletion of protected properties.',
      ],
      concepts: ['deleteProperty trap', 'property protection'],
    },
    {
      id: 'js-proxy-6',
      title: 'Apply trap for functions',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the blanks to use the apply trap to log function calls.',
      skeleton: `function sum(a, b) {
  return a + b;
}

const handler = {
  __BLANK__(target, thisArg, args) {
    console.log(\`Called with: \${args.join(', ')}\`);
    return __BLANK__.apply(target, thisArg, args);
  },
};

const proxiedSum = new Proxy(sum, handler);
console.log(proxiedSum(3, 4)); // logs "Called with: 3, 4" then 7`,
      solution: `function sum(a, b) {
  return a + b;
}

const handler = {
  apply(target, thisArg, args) {
    console.log(\`Called with: \${args.join(', ')}\`);
    return Reflect.apply(target, thisArg, args);
  },
};

const proxiedSum = new Proxy(sum, handler);
console.log(proxiedSum(3, 4)); // logs "Called with: 3, 4" then 7`,
      hints: [
        'The apply trap intercepts function calls.',
        'Use Reflect.apply to call the original function.',
        'args is an array of arguments passed to the function.',
      ],
      concepts: ['apply trap', 'function proxy', 'Reflect.apply'],
    },
    {
      id: 'js-proxy-7',
      title: 'Predict proxy get trap output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output of this proxy with a get trap.',
      skeleton: `const handler = {
  get(target, prop) {
    if (typeof target[prop] === 'function') {
      return target[prop].bind(target);
    }
    return prop in target ? target[prop] : \`no \${String(prop)}\`;
  },
};

const arr = new Proxy([1, 2, 3], handler);
console.log(arr[0]);
console.log(arr[10]);
console.log(arr.length);
console.log(typeof arr.push);`,
      solution: `// Output:
// 1
// 'no 10'
// 3
// 'function'
// arr[0] returns 1 (exists).
// arr[10] is not in the array, so the trap returns 'no 10'.
// arr.length exists, so it returns 3.
// arr.push is a function, so it gets bound and typeof is 'function'.`,
      hints: [
        'Property 0 exists in the array, returns its value.',
        'Property 10 does not exist, so the else branch runs.',
        'length is a real property; push is a function and gets bound.',
      ],
      concepts: ['Proxy get trap', 'arrays with proxies'],
    },
    {
      id: 'js-proxy-8',
      title: 'Proxy.revocable',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict what happens when a revocable proxy is revoked.',
      skeleton: `const { proxy, revoke } = Proxy.revocable(
  { name: 'Alice' },
  {}
);

console.log(proxy.name);
revoke();

try {
  console.log(proxy.name);
} catch (e) {
  console.log(e.constructor.name);
}`,
      solution: `// Output:
// 'Alice'
// 'TypeError'
// Before revoke(), the proxy works normally.
// After revoke(), any operation on the proxy throws a TypeError.`,
      hints: [
        'Proxy.revocable returns { proxy, revoke }.',
        'Before revoking, the proxy works normally.',
        'After revoking, any operation throws TypeError.',
      ],
      concepts: ['Proxy.revocable', 'revocation'],
    },
    {
      id: 'js-proxy-9',
      title: 'Construct trap',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a construct trap that logs class instantiation and adds a timestamp.',
      skeleton: `// Create a proxy for the given class that:
// 1. Logs "Creating <ClassName>" when instantiated
// 2. Adds a createdAt property to every instance
`,
      solution: `function trackConstruction(TargetClass) {
  return new Proxy(TargetClass, {
    construct(target, args, newTarget) {
      console.log(\`Creating \${target.name}\`);
      const instance = Reflect.construct(target, args, newTarget);
      instance.createdAt = Date.now();
      return instance;
    },
  });
}`,
      hints: [
        'The construct trap intercepts the new operator.',
        'Use Reflect.construct to create the actual instance.',
        'Add createdAt to the instance before returning it.',
      ],
      concepts: ['construct trap', 'Reflect.construct'],
    },
    {
      id: 'js-proxy-10',
      title: 'ownKeys trap',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a proxy that hides properties starting with underscore from Object.keys and for-in.',
      skeleton: `// hidePrivate(obj) -- returns a proxy that hides _prefixed properties
// from Object.keys, for-in, and JSON.stringify
`,
      solution: `function hidePrivate(obj) {
  return new Proxy(obj, {
    ownKeys(target) {
      return Reflect.ownKeys(target).filter(
        key => typeof key !== 'string' || !key.startsWith('_')
      );
    },
    getOwnPropertyDescriptor(target, prop) {
      if (typeof prop === 'string' && prop.startsWith('_')) {
        return undefined;
      }
      return Reflect.getOwnPropertyDescriptor(target, prop);
    },
  });
}`,
      hints: [
        'The ownKeys trap controls what Object.keys() returns.',
        'Filter out string keys starting with underscore.',
        'You also need getOwnPropertyDescriptor to make Object.keys work correctly.',
      ],
      concepts: ['ownKeys trap', 'getOwnPropertyDescriptor', 'property enumeration'],
    },
    {
      id: 'js-proxy-11',
      title: 'Logging proxy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a createLogger function that wraps any object in a proxy logging all gets and sets.',
      skeleton: `// createLogger(obj) -- returns proxy that logs:
// "GET prop" when reading and "SET prop = value" when writing
`,
      solution: `function createLogger(obj) {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      console.log(\`GET \${String(prop)}\`);
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      console.log(\`SET \${String(prop)} = \${value}\`);
      return Reflect.set(target, prop, value, receiver);
    },
  });
}`,
      hints: [
        'Implement both get and set traps.',
        'Use Reflect.get/set to forward the actual operation.',
        'Use String(prop) since prop can be a symbol.',
      ],
      concepts: ['logging proxy', 'debugging'],
    },
    {
      id: 'js-proxy-12',
      title: 'Negative array indexing',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a proxy that enables Python-style negative indexing on arrays: arr[-1] returns the last element.',
      skeleton: `// negativeArray(arr) -- returns a proxy where arr[-1] is the last element
`,
      solution: `function negativeArray(arr) {
  return new Proxy(arr, {
    get(target, prop, receiver) {
      const index = Number(prop);
      if (Number.isInteger(index) && index < 0) {
        return target[target.length + index];
      }
      return Reflect.get(target, prop, receiver);
    },
  });
}`,
      hints: [
        'Convert the prop to a number with Number(prop).',
        'If it is a negative integer, add it to array length.',
        'Use Reflect.get for non-numeric or positive indices.',
      ],
      concepts: ['negative indexing', 'Proxy get trap'],
    },
    {
      id: 'js-proxy-13',
      title: 'Fix the proxy set trap bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This validation proxy throws in strict mode because the set trap does not return a value. Fix it.',
      skeleton: `const validated = new Proxy({}, {
  set(target, prop, value) {
    if (typeof value === 'string' && value.length > 100) {
      throw new RangeError('String too long');
    }
    target[prop] = value;
  },
});

validated.name = 'Alice'; // TypeError in strict mode`,
      solution: `const validated = new Proxy({}, {
  set(target, prop, value) {
    if (typeof value === 'string' && value.length > 100) {
      throw new RangeError('String too long');
    }
    target[prop] = value;
    return true;
  },
});

validated.name = 'Alice'; // Works correctly`,
      hints: [
        'The set trap must return a boolean.',
        'Returning true indicates the assignment succeeded.',
        'Missing return value is treated as false, causing TypeError in strict mode.',
      ],
      concepts: ['set trap return value', 'strict mode'],
    },
    {
      id: 'js-proxy-14',
      title: 'Fix the Reflect receiver bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This proxy breaks inherited getter behavior. Fix by using the receiver parameter.',
      skeleton: `const base = {
  _name: 'base',
  get name() {
    return this._name;
  },
};

const handler = {
  get(target, prop) {
    return target[prop];
  },
};

const proxy = new Proxy(base, handler);
const child = Object.create(proxy);
child._name = 'child';
console.log(child.name); // Expected: 'child', Actual: 'base'`,
      solution: `const base = {
  _name: 'base',
  get name() {
    return this._name;
  },
};

const handler = {
  get(target, prop, receiver) {
    return Reflect.get(target, prop, receiver);
  },
};

const proxy = new Proxy(base, handler);
const child = Object.create(proxy);
child._name = 'child';
console.log(child.name); // 'child'`,
      hints: [
        'target[prop] loses the correct "this" context for getters.',
        'Reflect.get(target, prop, receiver) preserves the receiver.',
        'The receiver is the object that triggered the get (child, not base).',
      ],
      concepts: ['Reflect receiver', 'prototype chain', 'getter context'],
    },
    {
      id: 'js-proxy-15',
      title: 'Fix the revocable proxy leak',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This code creates a revocable proxy but never revokes it, leaking access. Fix it.',
      skeleton: `function createTemporaryAccess(data, ttlMs) {
  const { proxy, revoke } = Proxy.revocable(data, {});
  // Bug: revoke is never called, access lasts forever
  return proxy;
}

const temp = createTemporaryAccess({ secret: 'abc' }, 5000);`,
      solution: `function createTemporaryAccess(data, ttlMs) {
  const { proxy, revoke } = Proxy.revocable(data, {});
  setTimeout(revoke, ttlMs);
  return proxy;
}

const temp = createTemporaryAccess({ secret: 'abc' }, 5000);
// After 5 seconds, any access to temp throws TypeError`,
      hints: [
        'Schedule revoke() to be called after ttlMs milliseconds.',
        'Use setTimeout(revoke, ttlMs) to auto-revoke.',
        'After revocation, any operation on the proxy throws TypeError.',
      ],
      concepts: ['Proxy.revocable', 'temporal access control'],
    },
    {
      id: 'js-proxy-16',
      title: 'Predict proxy with has trap',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict the output with a has trap intercepting "in" checks.',
      skeleton: `const range = new Proxy({ min: 1, max: 10 }, {
  has(target, prop) {
    const num = Number(prop);
    if (!Number.isNaN(num)) {
      return num >= target.min && num <= target.max;
    }
    return Reflect.has(target, prop);
  },
});

console.log(5 in range);
console.log(11 in range);
console.log('min' in range);
console.log('foo' in range);`,
      solution: `// Output:
// true
// false
// true
// false
// 5 is in range [1,10] -> true
// 11 is out of range -> false
// 'min' is a real property -> true (via Reflect.has)
// 'foo' is not a property and NaN check fails -> Reflect.has returns false`,
      hints: [
        'Numeric checks go through the range logic.',
        '"min" is an actual property, so Reflect.has returns true.',
        '"foo" is not numeric and not a property, so false.',
      ],
      concepts: ['has trap', 'range checking proxy'],
    },
    {
      id: 'js-proxy-17',
      title: 'Observable proxy',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write an observable function that wraps an object so you can subscribe to property changes.',
      skeleton: `// observable(obj) returns { proxy, subscribe }
// subscribe(callback) -- callback(prop, oldVal, newVal) called on any set
`,
      solution: `function observable(obj) {
  const listeners = [];

  const proxy = new Proxy(obj, {
    set(target, prop, value, receiver) {
      const oldValue = target[prop];
      const result = Reflect.set(target, prop, value, receiver);
      if (result && oldValue !== value) {
        for (const cb of listeners) {
          cb(prop, oldValue, value);
        }
      }
      return result;
    },
  });

  function subscribe(callback) {
    listeners.push(callback);
    return () => {
      const idx = listeners.indexOf(callback);
      if (idx >= 0) listeners.splice(idx, 1);
    };
  }

  return { proxy, subscribe };
}`,
      hints: [
        'Store listeners in an array. The set trap notifies them.',
        'Capture the old value before setting, compare after.',
        'Return an unsubscribe function from subscribe.',
      ],
      concepts: ['observable pattern', 'Proxy set trap', 'reactivity'],
    },
    {
      id: 'js-proxy-18',
      title: 'Default values proxy',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a withDefaults function that returns a proxy providing default values for missing properties.',
      skeleton: `// withDefaults(obj, defaults) -- proxy that falls back to defaults
// for any property not directly on obj
`,
      solution: `function withDefaults(obj, defaults) {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      }
      if (prop in defaults) {
        return defaults[prop];
      }
      return undefined;
    },
  });
}`,
      hints: [
        'Check if the property exists on the target first.',
        'If not, check the defaults object.',
        'Use "prop in target" to distinguish missing from undefined.',
      ],
      concepts: ['default values proxy', 'fallback pattern'],
    },
    {
      id: 'js-proxy-19',
      title: 'Refactor validation to Proxy',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this manual validation from setter methods to a Proxy.',
      skeleton: `class User {
  #name = '';
  #age = 0;

  setName(value) {
    if (typeof value !== 'string' || value.length === 0) {
      throw new TypeError('Name must be a non-empty string');
    }
    this.#name = value;
  }

  getName() { return this.#name; }

  setAge(value) {
    if (!Number.isInteger(value) || value < 0 || value > 150) {
      throw new RangeError('Age must be an integer 0-150');
    }
    this.#age = value;
  }

  getAge() { return this.#age; }
}`,
      solution: `const validators = {
  name(value) {
    if (typeof value !== 'string' || value.length === 0) {
      throw new TypeError('Name must be a non-empty string');
    }
  },
  age(value) {
    if (!Number.isInteger(value) || value < 0 || value > 150) {
      throw new RangeError('Age must be an integer 0-150');
    }
  },
};

function createUser() {
  return new Proxy({ name: '', age: 0 }, {
    set(target, prop, value) {
      if (validators[prop]) {
        validators[prop](value);
      }
      target[prop] = value;
      return true;
    },
  });
}`,
      hints: [
        'Move validation rules into a separate validators object.',
        'The set trap looks up the validator by property name.',
        'Direct property access replaces getter/setter methods.',
      ],
      concepts: ['Proxy validation', 'refactoring', 'declarative validation'],
    },
    {
      id: 'js-proxy-20',
      title: 'Refactor method chaining to Proxy',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this builder to use a Proxy for automatic method chaining.',
      skeleton: `class QueryBuilder {
  constructor() {
    this.parts = { select: '*', from: '', where: [] };
  }
  select(fields) { this.parts.select = fields; return this; }
  from(table) { this.parts.from = table; return this; }
  where(condition) { this.parts.where.push(condition); return this; }
  build() {
    let sql = \`SELECT \${this.parts.select} FROM \${this.parts.from}\`;
    if (this.parts.where.length) {
      sql += \` WHERE \${this.parts.where.join(' AND ')}\`;
    }
    return sql;
  }
}`,
      solution: `function createQueryBuilder() {
  const parts = { select: '*', from: '', where: [] };

  const builder = {
    build() {
      let sql = \`SELECT \${parts.select} FROM \${parts.from}\`;
      if (parts.where.length) {
        sql += \` WHERE \${parts.where.join(' AND ')}\`;
      }
      return sql;
    },
  };

  return new Proxy(builder, {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      }
      return (value) => {
        if (prop === 'where') {
          parts.where.push(value);
        } else {
          parts[prop] = value;
        }
        return receiver;
      };
    },
  });
}`,
      hints: [
        'The Proxy get trap returns a setter function for unknown properties.',
        'Each setter stores the value and returns the proxy for chaining.',
        'The build method is a real method, so check target first.',
      ],
      concepts: ['Proxy chaining', 'builder pattern', 'metaprogramming'],
    },
  ],
};
