import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-proxy',
  title: '38. Proxy & Reflect',
  explanation: `## Proxy & Reflect

Proxy lets you intercept and customize fundamental operations on objects (property access, assignment, function calls, etc.).

### Proxy Basics
\\\`new Proxy(target, handler)\\\` creates a proxy. The handler defines traps -- functions that intercept operations.

### Common Traps
- \\\`get\\\` -- intercept property reads
- \\\`set\\\` -- intercept property writes
- \\\`has\\\` -- intercept the \\\`in\\\` operator
- \\\`deleteProperty\\\` -- intercept \\\`delete\\\`
- \\\`apply\\\` -- intercept function calls
- \\\`construct\\\` -- intercept \\\`new\\\`
- \\\`ownKeys\\\` -- intercept Object.keys / for...in

### Reflect API
\\\`Reflect\\\` provides methods matching each Proxy trap, giving you the default behavior. Use Reflect inside traps to forward the operation.

### Revocable Proxies
\\\`Proxy.revocable(target, handler)\\\` returns a proxy with a \\\`revoke()\\\` function that permanently disables the proxy.

### Use Cases
- Validation, logging, default values, access control, observable objects, virtual properties.

### Key Rules
- Proxy traps must respect invariants (e.g., cannot report a non-configurable property as non-existent).
- Proxies have a slight performance cost -- avoid in hot paths.
- The target object is still accessible directly unless hidden.
`,
  exercises: [
    {
      id: 'ts-proxy-1',
      title: 'Create a basic proxy',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a proxy that intercepts property access.',
      skeleton: `const target = { name: "Alice", age: 30 };

const proxy = new __BLANK__(target, {
  get(obj, prop) {
    console.log(\\\`Accessing \${String(prop)}\\\`);
    return Reflect.get(obj, prop);
  },
});

console.log(proxy.name);`,
      solution: `const target = { name: "Alice", age: 30 };

const proxy = new Proxy(target, {
  get(obj, prop) {
    console.log(\\\`Accessing \${String(prop)}\\\`);
    return Reflect.get(obj, prop);
  },
});

console.log(proxy.name);`,
      hints: [
        'Which constructor creates a proxy around an object?',
        'new Proxy(target, handler) creates the proxy.',
        'The answer is: Proxy',
      ],
      concepts: ['Proxy constructor', 'get trap'],
    },
    {
      id: 'ts-proxy-2',
      title: 'Get trap',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the get trap to return a default value for missing properties.',
      skeleton: `const handler = {
  __BLANK__(target: any, prop: string): any {
    return prop in target ? target[prop] : "default";
  },
};

const obj = new Proxy({}, handler);
console.log(obj.anything);`,
      solution: `const handler = {
  get(target: any, prop: string): any {
    return prop in target ? target[prop] : "default";
  },
};

const obj = new Proxy({}, handler);
console.log(obj.anything);`,
      hints: [
        'Which trap intercepts property reads?',
        'The get trap handles property access.',
        'The answer is: get',
      ],
      concepts: ['get trap', 'default values'],
    },
    {
      id: 'ts-proxy-3',
      title: 'Set trap',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the set trap to validate values before assignment.',
      skeleton: `const handler = {
  __BLANK__(target: any, prop: string, value: any): boolean {
    if (prop === "age" && typeof value !== "number") {
      throw new TypeError("Age must be a number");
    }
    target[prop] = value;
    return true;
  },
};

const user = new Proxy({} as any, handler);
user.age = 25;`,
      solution: `const handler = {
  set(target: any, prop: string, value: any): boolean {
    if (prop === "age" && typeof value !== "number") {
      throw new TypeError("Age must be a number");
    }
    target[prop] = value;
    return true;
  },
};

const user = new Proxy({} as any, handler);
user.age = 25;`,
      hints: [
        'Which trap intercepts property assignments?',
        'The set trap handles property writes.',
        'The answer is: set',
      ],
      concepts: ['set trap', 'validation'],
    },
    {
      id: 'ts-proxy-4',
      title: 'Predict proxy get',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What does this proxy log?',
      skeleton: `const obj = { x: 1, y: 2 };
const proxy = new Proxy(obj, {
  get(target, prop) {
    return (target as any)[prop] ?? "missing";
  },
});

console.log(proxy.x);
console.log(proxy.z);`,
      solution: `1
missing`,
      hints: [
        'The get trap returns the actual value if it exists, otherwise "missing".',
        'x exists with value 1, z does not exist.',
        'Output: 1, missing',
      ],
      concepts: ['get trap', 'nullish coalescing', 'proxy behavior'],
    },
    {
      id: 'ts-proxy-5',
      title: 'Has trap',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a proxy with a has trap that makes range checking work with the "in" operator.',
      skeleton: `// Create a proxy for a range object { min: 1, max: 100 }
// The has trap should return true if the value is within the range
// e.g., 50 in range === true, 200 in range === false
`,
      solution: `const range = new Proxy({ min: 1, max: 100 }, {
  has(target, prop): boolean {
    if (typeof prop === "string") {
      const num = Number(prop);
      return num >= target.min && num <= target.max;
    }
    return false;
  },
});

console.log(50 in range);  // true
console.log(200 in range); // false`,
      hints: [
        'The has trap intercepts the "in" operator.',
        'The prop will be a string, so convert it to a number.',
        'Return true if the number is between min and max.',
      ],
      concepts: ['has trap', 'in operator', 'range checking'],
    },
    {
      id: 'ts-proxy-6',
      title: 'Reflect.get',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use the Reflect API to perform the default get operation inside a proxy trap.',
      skeleton: `const proxy = new Proxy({ name: "Alice" }, {
  get(target, prop, receiver) {
    console.log("intercepted");
    return __BLANK__.get(target, prop, receiver);
  },
});`,
      solution: `const proxy = new Proxy({ name: "Alice" }, {
  get(target, prop, receiver) {
    console.log("intercepted");
    return Reflect.get(target, prop, receiver);
  },
});`,
      hints: [
        'The Reflect API provides default implementations for each trap.',
        'Reflect.get performs the standard property access.',
        'The answer is: Reflect',
      ],
      concepts: ['Reflect API', 'Reflect.get', 'default behavior'],
    },
    {
      id: 'ts-proxy-7',
      title: 'Validation proxy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a proxy that validates all property assignments: strings must be non-empty, numbers must be positive.',
      skeleton: `// Create a validating proxy
// Throw TypeError for empty strings or non-positive numbers
`,
      solution: `function createValidated<T extends object>(target: T): T {
  return new Proxy(target, {
    set(obj: any, prop: string, value: any): boolean {
      if (typeof value === "string" && value.length === 0) {
        throw new TypeError(\\\`\${prop} cannot be an empty string\\\`);
      }
      if (typeof value === "number" && value <= 0) {
        throw new TypeError(\\\`\${prop} must be a positive number\\\`);
      }
      obj[prop] = value;
      return true;
    },
  });
}

const user = createValidated({ name: "Alice", age: 30 });
user.name = "Bob";   // OK
// user.name = "";    // TypeError
// user.age = -1;     // TypeError`,
      hints: [
        'Use the set trap to check value types before assignment.',
        'Check typeof value and apply the appropriate validation.',
        'Throw TypeError for invalid values, set and return true for valid ones.',
      ],
      concepts: ['validation proxy', 'set trap', 'type checking'],
    },
    {
      id: 'ts-proxy-8',
      title: 'Logging proxy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a proxy that logs all property reads and writes.',
      skeleton: `// Write a createLogged<T> function that wraps any object with logging
// Log "GET prop" for reads and "SET prop = value" for writes
`,
      solution: `function createLogged<T extends object>(target: T): T {
  return new Proxy(target, {
    get(obj, prop, receiver) {
      console.log(\\\`GET \${String(prop)}\\\`);
      return Reflect.get(obj, prop, receiver);
    },
    set(obj, prop, value, receiver) {
      console.log(\\\`SET \${String(prop)} = \${JSON.stringify(value)}\\\`);
      return Reflect.set(obj, prop, value, receiver);
    },
  });
}`,
      hints: [
        'Implement both get and set traps.',
        'Use Reflect.get and Reflect.set for the default operations.',
        'Log the property name and value in each trap.',
      ],
      concepts: ['logging proxy', 'get trap', 'set trap', 'Reflect'],
    },
    {
      id: 'ts-proxy-9',
      title: 'Apply trap (function proxy)',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a proxy around a function that logs calls and measures execution time.',
      skeleton: `function add(a: number, b: number): number {
  return a + b;
}

// Wrap add in a proxy that logs arguments and return value
`,
      solution: `function add(a: number, b: number): number {
  return a + b;
}

const loggedAdd = new Proxy(add, {
  apply(target, thisArg, args: [number, number]) {
    console.log(\\\`Calling with args: \${JSON.stringify(args)}\\\`);
    const result = Reflect.apply(target, thisArg, args);
    console.log(\\\`Returned: \${result}\\\`);
    return result;
  },
});

console.log(loggedAdd(2, 3)); // Calling with args: [2,3], Returned: 5, 5`,
      hints: [
        'The apply trap intercepts function calls.',
        'It receives (target, thisArg, argumentsList).',
        'Use Reflect.apply to call the original function.',
      ],
      concepts: ['apply trap', 'function proxy', 'Reflect.apply'],
    },
    {
      id: 'ts-proxy-10',
      title: 'Construct trap',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a proxy with a construct trap that adds a timestamp to every new instance.',
      skeleton: `class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

// Proxy the User constructor to add a createdAt property
`,
      solution: `class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const ProxiedUser = new Proxy(User, {
  construct(target, args, newTarget) {
    const instance = Reflect.construct(target, args, newTarget);
    (instance as any).createdAt = new Date();
    return instance;
  },
});

const user = new ProxiedUser("Alice");
console.log(user.name);
console.log((user as any).createdAt);`,
      hints: [
        'The construct trap intercepts the new operator.',
        'Use Reflect.construct to create the instance, then modify it.',
        'Add createdAt to the instance before returning it.',
      ],
      concepts: ['construct trap', 'Reflect.construct', 'instance augmentation'],
    },
    {
      id: 'ts-proxy-11',
      title: 'Fix: set trap must return boolean',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This set trap does not return true, causing a TypeError in strict mode. Fix it.',
      skeleton: `const proxy = new Proxy({} as Record<string, any>, {
  set(target, prop, value) {
    if (typeof value === "string") {
      target[prop as string] = value.trim();
    } else {
      target[prop as string] = value;
    }
    // Bug: no return value
  },
});

proxy.name = "  Alice  ";`,
      solution: `const proxy = new Proxy({} as Record<string, any>, {
  set(target, prop, value) {
    if (typeof value === "string") {
      target[prop as string] = value.trim();
    } else {
      target[prop as string] = value;
    }
    return true;
  },
});

proxy.name = "  Alice  ";`,
      hints: [
        'The set trap must return true to indicate success.',
        'In strict mode, not returning true causes a TypeError.',
        'Add return true; at the end of the set trap.',
      ],
      concepts: ['set trap return', 'strict mode', 'proxy invariants'],
    },
    {
      id: 'ts-proxy-12',
      title: 'Revocable proxy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Create a revocable proxy that can be disabled after use.',
      skeleton: `// Create a revocable proxy for a data object
// After revoking, any access should throw
`,
      solution: `const data = { secret: "classified", level: 5 };

const { proxy, revoke } = Proxy.revocable(data, {
  get(target, prop) {
    return Reflect.get(target, prop);
  },
});

console.log(proxy.secret); // "classified"
revoke();
// proxy.secret; // TypeError: Cannot perform 'get' on a proxy that has been revoked`,
      hints: [
        'Proxy.revocable() returns { proxy, revoke }.',
        'After calling revoke(), any operation on the proxy throws.',
        'Use destructuring: const { proxy, revoke } = Proxy.revocable(target, handler);',
      ],
      concepts: ['Proxy.revocable', 'revocation', 'access control'],
    },
    {
      id: 'ts-proxy-13',
      title: 'OwnKeys trap',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a proxy that hides properties starting with underscore from Object.keys.',
      skeleton: `// Create a proxy that filters out _prefixed properties from enumeration
`,
      solution: `const obj = { name: "Alice", _id: 123, _secret: "hidden", role: "admin" };

const proxy = new Proxy(obj, {
  ownKeys(target) {
    return Reflect.ownKeys(target).filter(
      key => typeof key === "string" && !key.startsWith("_")
    );
  },
});

console.log(Object.keys(proxy)); // ["name", "role"]`,
      hints: [
        'The ownKeys trap intercepts Object.keys, Object.getOwnPropertyNames, etc.',
        'Filter out keys that start with "_".',
        'Return Reflect.ownKeys(target).filter(key => !key.startsWith("_"));',
      ],
      concepts: ['ownKeys trap', 'property hiding', 'enumeration control'],
    },
    {
      id: 'ts-proxy-14',
      title: 'DeleteProperty trap',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a proxy that prevents deletion of protected properties.',
      skeleton: `// Create a proxy that prevents deleting properties listed in a "protected" set
`,
      solution: `function protectProperties<T extends object>(target: T, protectedKeys: Set<string>): T {
  return new Proxy(target, {
    deleteProperty(obj, prop) {
      if (typeof prop === "string" && protectedKeys.has(prop)) {
        throw new Error(\\\`Cannot delete protected property: \${prop}\\\`);
      }
      return Reflect.deleteProperty(obj, prop);
    },
  });
}

const config = protectProperties(
  { host: "localhost", port: 3000, debug: true } as any,
  new Set(["host", "port"])
);

delete config.debug; // OK
// delete config.host; // Error: Cannot delete protected property: host`,
      hints: [
        'The deleteProperty trap intercepts the delete operator.',
        'Check if the property is in the protected set before allowing deletion.',
        'Use Reflect.deleteProperty for the default behavior.',
      ],
      concepts: ['deleteProperty trap', 'protection', 'Reflect.deleteProperty'],
    },
    {
      id: 'ts-proxy-15',
      title: 'Predict proxy chain',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'What does this nested proxy output?',
      skeleton: `const inner = new Proxy({} as any, {
  get(t, p) { return "inner"; },
});

const outer = new Proxy(inner, {
  get(t, p) {
    const val = Reflect.get(t, p);
    return val + "-outer";
  },
});

console.log(outer.test);`,
      solution: `inner-outer`,
      hints: [
        'outer.test triggers outer get trap, which calls Reflect.get on inner.',
        'Reflect.get on inner triggers inner get trap, returning "inner".',
        'outer appends "-outer", giving: inner-outer',
      ],
      concepts: ['proxy chain', 'nested proxy', 'trap delegation'],
    },
    {
      id: 'ts-proxy-16',
      title: 'Observable object',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a proxy-based observable that notifies listeners when properties change.',
      skeleton: `// Create function observable<T>(target: T, onChange: (prop, old, new) => void): T
`,
      solution: `function observable<T extends object>(
  target: T,
  onChange: (prop: string, oldValue: any, newValue: any) => void
): T {
  return new Proxy(target, {
    set(obj, prop, value, receiver) {
      const oldValue = Reflect.get(obj, prop, receiver);
      const result = Reflect.set(obj, prop, value, receiver);
      if (result && oldValue !== value) {
        onChange(String(prop), oldValue, value);
      }
      return result;
    },
  });
}

const state = observable({ count: 0 }, (prop, oldVal, newVal) => {
  console.log(\\\`\${prop}: \${oldVal} -> \${newVal}\\\`);
});

state.count = 1; // count: 0 -> 1`,
      hints: [
        'Use the set trap to detect changes.',
        'Get the old value with Reflect.get before setting.',
        'Call the onChange callback if the value actually changed.',
      ],
      concepts: ['observable pattern', 'change detection', 'proxy'],
    },
    {
      id: 'ts-proxy-17',
      title: 'Virtual properties proxy',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a proxy that computes virtual properties on the fly (e.g., fullName from firstName + lastName).',
      skeleton: `// Create a proxy for { firstName: "John", lastName: "Doe" }
// That also responds to proxy.fullName returning "John Doe"
`,
      solution: `const person = { firstName: "John", lastName: "Doe" };

const proxy = new Proxy(person, {
  get(target, prop, receiver) {
    if (prop === "fullName") {
      return \\\`\${target.firstName} \${target.lastName}\\\`;
    }
    return Reflect.get(target, prop, receiver);
  },
  has(target, prop) {
    if (prop === "fullName") return true;
    return Reflect.has(target, prop);
  },
});

console.log(proxy.fullName);        // "John Doe"
console.log("fullName" in proxy);   // true`,
      hints: [
        'Intercept the get trap to compute virtual properties.',
        'Check the property name and return computed values for virtual ones.',
        'Also implement has trap so "in" operator works for virtual properties.',
      ],
      concepts: ['virtual properties', 'computed values', 'get trap'],
    },
    {
      id: 'ts-proxy-18',
      title: 'Fix: proxy invariant violation',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'This proxy get trap lies about a non-configurable property. Fix it to respect the invariant.',
      skeleton: `const obj: Record<string, any> = {};
Object.defineProperty(obj, "locked", {
  value: 42,
  configurable: false,
  writable: false,
});

const proxy = new Proxy(obj, {
  get(target, prop) {
    if (prop === "locked") return 99; // Invariant violation!
    return Reflect.get(target, prop);
  },
});

console.log(proxy.locked);`,
      solution: `const obj: Record<string, any> = {};
Object.defineProperty(obj, "locked", {
  value: 42,
  configurable: false,
  writable: false,
});

const proxy = new Proxy(obj, {
  get(target, prop) {
    return Reflect.get(target, prop);
  },
});

console.log(proxy.locked); // 42`,
      hints: [
        'Proxy traps cannot lie about non-configurable, non-writable properties.',
        'The get trap must return the actual value for non-configurable properties.',
        'Remove the override for "locked" or use Reflect.get.',
      ],
      concepts: ['proxy invariants', 'non-configurable property', 'TypeError'],
    },
    {
      id: 'ts-proxy-19',
      title: 'Refactor: manual getters to proxy',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this class with many manual getter/setter validations to use a Proxy.',
      skeleton: `class Config {
  private _host = "localhost";
  private _port = 3000;

  get host(): string { return this._host; }
  set host(v: string) {
    if (!v) throw new Error("host cannot be empty");
    this._host = v;
  }

  get port(): number { return this._port; }
  set port(v: number) {
    if (v < 0 || v > 65535) throw new Error("invalid port");
    this._port = v;
  }
}`,
      solution: `interface ConfigRules {
  [key: string]: (value: any) => boolean;
}

function createValidatedConfig<T extends object>(defaults: T, rules: ConfigRules): T {
  return new Proxy({ ...defaults }, {
    set(target: any, prop: string, value: any): boolean {
      if (rules[prop] && !rules[prop](value)) {
        throw new Error(\\\`Invalid value for \${prop}\\\`);
      }
      target[prop] = value;
      return true;
    },
  });
}

const config = createValidatedConfig(
  { host: "localhost", port: 3000 },
  {
    host: (v: any) => typeof v === "string" && v.length > 0,
    port: (v: any) => typeof v === "number" && v >= 0 && v <= 65535,
  }
);

config.host = "example.com"; // OK
config.port = 8080;          // OK
// config.host = "";          // Error
// config.port = -1;          // Error`,
      hints: [
        'Replace manual getters/setters with a Proxy set trap.',
        'Define validation rules as a configuration object.',
        'The proxy automatically validates any property set based on the rules.',
      ],
      concepts: ['refactoring', 'proxy validation', 'declarative rules'],
    },
    {
      id: 'ts-proxy-20',
      title: 'Refactor: deep readonly with proxy',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor shallow Object.freeze into a deep readonly proxy that works recursively.',
      skeleton: `// Object.freeze is shallow:
const config = Object.freeze({
  db: { host: "localhost", port: 5432 },
});
// config.db.port = 9999; // This still works! (nested object not frozen)

// Write a deepReadonly function using Proxy
`,
      solution: `function deepReadonly<T extends object>(obj: T): T {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);
      if (typeof value === "object" && value !== null) {
        return deepReadonly(value);
      }
      return value;
    },
    set() {
      throw new TypeError("Cannot modify a readonly object");
    },
    deleteProperty() {
      throw new TypeError("Cannot delete from a readonly object");
    },
  });
}

const config = deepReadonly({
  db: { host: "localhost", port: 5432 },
});

console.log(config.db.host); // "localhost"
// config.db.port = 9999;    // TypeError: Cannot modify a readonly object`,
      hints: [
        'Recursively wrap nested objects in proxies via the get trap.',
        'The set and deleteProperty traps should throw TypeErrors.',
        'In the get trap, if the value is an object, return deepReadonly(value).',
      ],
      concepts: ['deep readonly', 'recursive proxy', 'immutability'],
    },
  ],
};
