import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-clone',
  title: '38. Structured Clone',
  explanation: `## Structured Clone & Deep Copying

JavaScript offers several ways to copy objects, each with different tradeoffs.

\`\`\`javascript
// Shallow copies
const shallow1 = { ...original };
const shallow2 = Object.assign({}, original);

// Deep clone (modern)
const deep = structuredClone(original);

// structuredClone handles:
// - Nested objects/arrays
// - Date, Map, Set, RegExp, ArrayBuffer, Error
// - Circular references!

// structuredClone CANNOT clone:
// - Functions
// - DOM nodes
// - Symbols (as values)
// - Property descriptors (getters/setters)
// - Prototype chain

// Transfer option (zero-copy for ArrayBuffers)
const buf = new ArrayBuffer(1024);
const clone = structuredClone(buf, { transfer: [buf] });
// buf is now detached (byteLength = 0)
\`\`\`

structuredClone is the standard deep clone. Use it instead of JSON round-trips or lodash.cloneDeep.`,
  exercises: [
    {
      id: 'js-clone-1',
      title: 'structuredClone basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to create a deep clone using structuredClone.',
      skeleton: `const original = { a: 1, b: { c: 2 } };
const clone = __BLANK__(original);
clone.b.c = 99;
console.log(original.b.c); // __BLANK__ (unchanged)`,
      solution: `const original = { a: 1, b: { c: 2 } };
const clone = structuredClone(original);
clone.b.c = 99;
console.log(original.b.c); // 2 (unchanged)`,
      hints: [
        'structuredClone creates a deep copy.',
        'Modifying the clone does not affect the original.',
        'Nested objects are fully independent copies.',
      ],
      concepts: ['structuredClone', 'deep clone'],
    },
    {
      id: 'js-clone-2',
      title: 'Spread shallow clone',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to show the difference between shallow and deep cloning.',
      skeleton: `const obj = { name: 'Alice', nested: { x: 1 } };
const shallow = { __BLANK__obj };
shallow.name = 'Bob';
shallow.nested.x = 99;
console.log(obj.name);     // __BLANK__ (unchanged)
console.log(obj.nested.x); // __BLANK__ (changed! shallow copy shares nested ref)`,
      solution: `const obj = { name: 'Alice', nested: { x: 1 } };
const shallow = { ...obj };
shallow.name = 'Bob';
shallow.nested.x = 99;
console.log(obj.name);     // 'Alice' (unchanged)
console.log(obj.nested.x); // 99 (changed! shallow copy shares nested ref)`,
      hints: [
        'Spread (...) creates a shallow copy.',
        'Top-level primitives are independent.',
        'Nested objects are shared between original and copy.',
      ],
      concepts: ['spread clone', 'shallow vs deep'],
    },
    {
      id: 'js-clone-3',
      title: 'Object.assign shallow clone',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to use Object.assign for shallow cloning.',
      skeleton: `const src = { a: 1, b: [2, 3] };
const copy = Object.__BLANK__({}, src);
copy.a = 10;
copy.b.__BLANK__(4);
console.log(src.a);   // __BLANK__
console.log(src.b);   // __BLANK__`,
      solution: `const src = { a: 1, b: [2, 3] };
const copy = Object.assign({}, src);
copy.a = 10;
copy.b.push(4);
console.log(src.a);   // 1
console.log(src.b);   // [2, 3, 4]`,
      hints: [
        'Object.assign copies own enumerable properties (shallow).',
        'Primitive properties are independent after copy.',
        'Array/object properties are shared references.',
      ],
      concepts: ['Object.assign', 'shallow clone'],
    },
    {
      id: 'js-clone-4',
      title: 'Clone Date and Map',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to show structuredClone preserves special types.',
      skeleton: `const original = {
  date: new Date('2024-01-01'),
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),
};
const clone = __BLANK__(original);
console.log(clone.date instanceof __BLANK__);  // true
console.log(clone.map instanceof __BLANK__);   // true
console.log(clone.set instanceof __BLANK__);   // true`,
      solution: `const original = {
  date: new Date('2024-01-01'),
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),
};
const clone = structuredClone(original);
console.log(clone.date instanceof Date);  // true
console.log(clone.map instanceof Map);    // true
console.log(clone.set instanceof Set);    // true`,
      hints: [
        'structuredClone preserves Date, Map, and Set.',
        'JSON round-trip would lose these types.',
        'instanceof checks confirm the types are preserved.',
      ],
      concepts: ['structuredClone types', 'Date', 'Map', 'Set'],
    },
    {
      id: 'js-clone-5',
      title: 'Clone with circular references',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to clone an object with circular references.',
      skeleton: `const obj = { name: 'root' };
obj.self = obj; // circular reference

const clone = __BLANK__(obj);
console.log(clone.self === clone);     // __BLANK__
console.log(clone.self === obj);       // __BLANK__
console.log(clone.name);              // 'root'`,
      solution: `const obj = { name: 'root' };
obj.self = obj; // circular reference

const clone = structuredClone(obj);
console.log(clone.self === clone);     // true
console.log(clone.self === obj);       // false
console.log(clone.name);              // 'root'`,
      hints: [
        'structuredClone handles circular references correctly.',
        'The circular reference in the clone points to the clone itself.',
        'JSON.stringify would throw on circular references.',
      ],
      concepts: ['circular reference', 'structuredClone'],
    },
    {
      id: 'js-clone-6',
      title: 'Predict JSON clone limitations',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict what JSON round-trip clone loses.',
      skeleton: `const original = {
  date: new Date('2024-01-01'),
  regex: /test/gi,
  undef: undefined,
  fn: () => 42,
  nan: NaN,
  inf: Infinity,
};

const clone = JSON.parse(JSON.stringify(original));
console.log(typeof clone.date);
console.log(clone.regex);
console.log('undef' in clone);
console.log('fn' in clone);
console.log(clone.nan);
console.log(clone.inf);`,
      solution: `// Output:
// 'string' (Date becomes ISO string, not Date object)
// {} (RegExp becomes empty object)
// false (undefined properties are dropped)
// false (functions are dropped)
// null (NaN becomes null)
// null (Infinity becomes null)`,
      hints: [
        'JSON has no Date type -- Dates become strings.',
        'JSON has no RegExp type -- becomes empty object.',
        'undefined, functions, NaN, Infinity are lost or converted to null.',
      ],
      concepts: ['JSON clone limitations', 'type loss'],
    },
    {
      id: 'js-clone-7',
      title: 'Predict structuredClone limitations',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict what structuredClone cannot clone.',
      skeleton: `class Dog {
  constructor(name) { this.name = name; }
  bark() { return 'Woof!'; }
}

const dog = new Dog('Rex');
const clone = structuredClone(dog);

console.log(clone.name);
console.log(clone instanceof Dog);
console.log(typeof clone.bark);`,
      solution: `// Output:
// 'Rex'
// false
// 'undefined'
// structuredClone copies own properties but not the prototype chain.
// The clone is a plain object, not a Dog instance.
// Methods from the prototype are lost.`,
      hints: [
        'structuredClone does not preserve the prototype chain.',
        'Class instances become plain objects.',
        'Methods defined on the prototype are not copied.',
      ],
      concepts: ['structuredClone limitations', 'prototype loss'],
    },
    {
      id: 'js-clone-8',
      title: 'Predict transfer behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict what happens with the transfer option.',
      skeleton: `const buf = new ArrayBuffer(8);
const view = new Uint8Array(buf);
view[0] = 42;

const clone = structuredClone(buf, { transfer: [buf] });
const cloneView = new Uint8Array(clone);

console.log(cloneView[0]);
console.log(clone.byteLength);
console.log(buf.byteLength);`,
      solution: `// Output:
// 42
// 8
// 0
// The transfer option moves the ArrayBuffer instead of copying.
// The clone has the data (42 at index 0, 8 bytes).
// The original buffer is detached (0 bytes).`,
      hints: [
        'Transfer moves ownership instead of copying.',
        'The original ArrayBuffer becomes detached.',
        'The clone receives the full data.',
      ],
      concepts: ['structuredClone transfer', 'ArrayBuffer'],
    },
    {
      id: 'js-clone-9',
      title: 'Manual deep clone',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a manual deep clone function that handles objects, arrays, and Dates.',
      skeleton: `// deepClone(value) -- recursively clones objects, arrays, and Dates
// Does not need to handle Map, Set, or circular references
`,
      solution: `function deepClone(value) {
  if (value === null || typeof value !== 'object') {
    return value;
  }
  if (value instanceof Date) {
    return new Date(value.getTime());
  }
  if (Array.isArray(value)) {
    return value.map(item => deepClone(item));
  }
  const result = {};
  for (const key of Object.keys(value)) {
    result[key] = deepClone(value[key]);
  }
  return result;
}`,
      hints: [
        'Check for null and primitives first (base case).',
        'Handle Date specially with new Date(value.getTime()).',
        'Recursively clone each property for objects and arrays.',
      ],
      concepts: ['recursive clone', 'type checking'],
    },
    {
      id: 'js-clone-10',
      title: 'Clone with class restoration',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a clone function that preserves class instances by using a registry of constructors.',
      skeleton: `// cloneWithClasses(obj, classRegistry)
// classRegistry is a Map<string, class> for restoration
// Each class should have a static fromJSON(data) method
`,
      solution: `function cloneWithClasses(obj, classRegistry) {
  return JSON.parse(JSON.stringify(obj, (key, value) => {
    if (value && typeof value === 'object' && value.constructor !== Object && value.constructor !== Array) {
      return {
        __class: value.constructor.name,
        __data: value.toJSON ? value.toJSON() : { ...value },
      };
    }
    return value;
  }), (key, value) => {
    if (value && value.__class && classRegistry.has(value.__class)) {
      const Ctor = classRegistry.get(value.__class);
      return Ctor.fromJSON(value.__data);
    }
    return value;
  });
}`,
      hints: [
        'Use a replacer to serialize class name and data.',
        'Use a reviver to reconstruct from the registry.',
        'Each class needs a static fromJSON method.',
      ],
      concepts: ['class restoration', 'serialization registry'],
    },
    {
      id: 'js-clone-11',
      title: 'Immutable update pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that creates an immutable update by cloning and applying changes at a path.',
      skeleton: `// immutableSet(obj, path, value)
// path is a string like 'a.b.c'
// Returns a new object with the value changed at the path
`,
      solution: `function immutableSet(obj, path, value) {
  const keys = path.split('.');
  const result = structuredClone(obj);
  let current = result;

  for (let i = 0; i < keys.length - 1; i++) {
    current = current[keys[i]];
  }

  current[keys[keys.length - 1]] = value;
  return result;
}`,
      hints: [
        'Clone the entire object first with structuredClone.',
        'Navigate to the parent of the target property.',
        'Set the value at the final key.',
      ],
      concepts: ['immutable update', 'path navigation', 'structuredClone'],
    },
    {
      id: 'js-clone-12',
      title: 'Structural sharing',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that performs an immutable update with structural sharing (only clone the path that changes).',
      skeleton: `// updatePath(obj, path, value) -- returns new obj with structural sharing
// Only objects along the path are cloned; everything else is shared
`,
      solution: `function updatePath(obj, path, value) {
  const keys = path.split('.');

  function update(current, keyIndex) {
    if (keyIndex === keys.length) {
      return value;
    }
    const key = keys[keyIndex];
    const isArray = Array.isArray(current);
    const clone = isArray ? [...current] : { ...current };
    clone[key] = update(current[key], keyIndex + 1);
    return clone;
  }

  return update(obj, 0);
}`,
      hints: [
        'Only shallow-clone objects along the changed path.',
        'Unchanged branches share references with the original.',
        'This is how immutable libraries achieve performance.',
      ],
      concepts: ['structural sharing', 'immutable update', 'performance'],
    },
    {
      id: 'js-clone-13',
      title: 'Fix the shallow clone mutation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code mutates the original when updating the "clone". Fix it.',
      skeleton: `function updateUser(user, newEmail) {
  const updated = { ...user };
  updated.address.city = 'New York'; // Bug: mutates original.address
  updated.email = newEmail;
  return updated;
}`,
      solution: `function updateUser(user, newEmail) {
  const updated = {
    ...user,
    email: newEmail,
    address: { ...user.address, city: 'New York' },
  };
  return updated;
}`,
      hints: [
        'Spread only shallow-clones the top level.',
        'Nested objects like address must be spread separately.',
        'Spread the nested object and override the specific property.',
      ],
      concepts: ['shallow clone mutation', 'nested spread'],
    },
    {
      id: 'js-clone-14',
      title: 'Fix the array clone bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code tries to clone an array of objects but they share references. Fix it.',
      skeleton: `function cloneList(items) {
  const clone = [...items];
  clone[0].done = true; // Bug: mutates original items[0]
  return clone;
}`,
      solution: `function cloneList(items) {
  const clone = items.map(item => ({ ...item }));
  clone[0].done = true; // Safe: each item is a new object
  return clone;
}`,
      hints: [
        '[...items] creates a shallow copy of the array.',
        'The objects inside the array are still shared references.',
        'Map over items and spread each one: items.map(item => ({ ...item })).',
      ],
      concepts: ['array clone', 'shallow reference sharing'],
    },
    {
      id: 'js-clone-15',
      title: 'Fix structuredClone with functions',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This code throws because structuredClone cannot clone functions. Fix it.',
      skeleton: `const config = {
  name: 'app',
  version: 2,
  logger: console.log,
  validate: (x) => x > 0,
};

const clone = structuredClone(config);
// DOMException: Failed to execute 'structuredClone'`,
      solution: `const config = {
  name: 'app',
  version: 2,
  logger: console.log,
  validate: (x) => x > 0,
};

function cloneConfig(cfg) {
  const { logger, validate, ...data } = cfg;
  const cloned = structuredClone(data);
  cloned.logger = logger;
  cloned.validate = validate;
  return cloned;
}

const clone = cloneConfig(config);`,
      hints: [
        'structuredClone throws on functions.',
        'Separate functions from data before cloning.',
        'Reattach functions after cloning the data.',
      ],
      concepts: ['structuredClone limitation', 'function handling'],
    },
    {
      id: 'js-clone-16',
      title: 'Clone Maps and Sets',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a manual deep clone that handles Map and Set (without structuredClone).',
      skeleton: `// deepCloneExtended(value) -- handles objects, arrays, Date, Map, Set
`,
      solution: `function deepCloneExtended(value) {
  if (value === null || typeof value !== 'object') {
    return value;
  }
  if (value instanceof Date) {
    return new Date(value.getTime());
  }
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags);
  }
  if (value instanceof Map) {
    const map = new Map();
    for (const [k, v] of value) {
      map.set(deepCloneExtended(k), deepCloneExtended(v));
    }
    return map;
  }
  if (value instanceof Set) {
    const set = new Set();
    for (const v of value) {
      set.add(deepCloneExtended(v));
    }
    return set;
  }
  if (Array.isArray(value)) {
    return value.map(item => deepCloneExtended(item));
  }
  const result = {};
  for (const key of Object.keys(value)) {
    result[key] = deepCloneExtended(value[key]);
  }
  return result;
}`,
      hints: [
        'Check instanceof for each special type.',
        'For Map: iterate entries and clone both keys and values.',
        'For Set: iterate values and clone each one.',
      ],
      concepts: ['Map clone', 'Set clone', 'recursive deep clone'],
    },
    {
      id: 'js-clone-17',
      title: 'Clone performance comparison',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a benchmark function that compares clone methods: spread, JSON, structuredClone.',
      skeleton: `// benchClone(obj, iterations) -- returns { spread, json, structured } timing in ms
`,
      solution: `function benchClone(obj, iterations = 10000) {
  function time(fn) {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) fn();
    return performance.now() - start;
  }

  return {
    spread: time(() => ({ ...obj })),
    json: time(() => JSON.parse(JSON.stringify(obj))),
    structured: time(() => structuredClone(obj)),
  };
}`,
      hints: [
        'Use performance.now() for precise timing.',
        'Run each method many times for stable results.',
        'Spread is fastest (shallow), JSON is medium, structuredClone handles more types.',
      ],
      concepts: ['clone performance', 'benchmarking'],
    },
    {
      id: 'js-clone-18',
      title: 'Immutable array operations',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write immutable versions of array operations: push, splice, and update.',
      skeleton: `// immutablePush(arr, item) -- returns new array with item added
// immutableSplice(arr, index, deleteCount, ...items) -- returns new array
// immutableUpdate(arr, index, updater) -- returns new array with arr[index] = updater(arr[index])
`,
      solution: `function immutablePush(arr, item) {
  return [...arr, item];
}

function immutableSplice(arr, index, deleteCount, ...items) {
  return [
    ...arr.slice(0, index),
    ...items,
    ...arr.slice(index + deleteCount),
  ];
}

function immutableUpdate(arr, index, updater) {
  return arr.map((item, i) => i === index ? updater(item) : item);
}`,
      hints: [
        'Never mutate the original array.',
        'Use spread and slice for non-mutating splices.',
        'Use map with index check for targeted updates.',
      ],
      concepts: ['immutable arrays', 'functional updates'],
    },
    {
      id: 'js-clone-19',
      title: 'Refactor JSON clone to structuredClone',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor all JSON round-trip clones in this code to use structuredClone.',
      skeleton: `function processData(data) {
  // Clone to avoid mutation
  const copy = JSON.parse(JSON.stringify(data));

  // Clone nested config
  const config = JSON.parse(JSON.stringify(data.config));

  // Clone array of items
  const items = JSON.parse(JSON.stringify(data.items));

  items.forEach(item => {
    item.processed = true;
  });

  return { config, items };
}`,
      solution: `function processData(data) {
  const copy = structuredClone(data);
  const config = structuredClone(data.config);
  const items = structuredClone(data.items);

  items.forEach(item => {
    item.processed = true;
  });

  return { config, items };
}`,
      hints: [
        'Replace every JSON.parse(JSON.stringify(...)) with structuredClone(...).',
        'structuredClone handles more types (Date, Map, Set, etc.).',
        'It also handles circular references.',
      ],
      concepts: ['structuredClone migration', 'refactoring'],
    },
    {
      id: 'js-clone-20',
      title: 'Refactor mutation to immutable updates',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this mutating state update to use immutable patterns.',
      skeleton: `const state = {
  users: [
    { id: 1, name: 'Alice', active: true },
    { id: 2, name: 'Bob', active: false },
  ],
  filters: { search: '', activeOnly: false },
};

function toggleUser(state, id) {
  const user = state.users.find(u => u.id === id);
  user.active = !user.active; // MUTATION!
  return state;
}

function setSearch(state, search) {
  state.filters.search = search; // MUTATION!
  return state;
}`,
      solution: `function toggleUser(state, id) {
  return {
    ...state,
    users: state.users.map(user =>
      user.id === id ? { ...user, active: !user.active } : user
    ),
  };
}

function setSearch(state, search) {
  return {
    ...state,
    filters: { ...state.filters, search },
  };
}`,
      hints: [
        'Never mutate state directly.',
        'Spread the outer object and only change what is needed.',
        'Use map with conditional spread for array item updates.',
      ],
      concepts: ['immutable state', 'spread updates', 'refactoring'],
    },
  ],
};
