import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-objects',
  title: '12. Objects',
  explanation: `## Objects

Objects are collections of key-value pairs -- the fundamental data structure in JavaScript.

### Creation
\`\`\`js
const obj = { key: 'value' };              // literal
const obj2 = Object.create(proto);          // with prototype
const obj3 = Object.fromEntries([['a',1]]); // from entries
\`\`\`

### Property Access
- Dot notation: \`obj.key\`
- Bracket notation: \`obj['key']\` or \`obj[variable]\`
- Computed properties: \`{ [expr]: value }\`

### Key Methods
| Method | Description |
|--------|-------------|
| \`Object.keys(obj)\` | Array of own enumerable keys |
| \`Object.values(obj)\` | Array of own enumerable values |
| \`Object.entries(obj)\` | Array of [key, value] pairs |
| \`Object.assign(target, ...sources)\` | Copy properties |
| \`Object.freeze(obj)\` | Make immutable (shallow) |
| \`Object.seal(obj)\` | Prevent add/delete, allow modification |
| \`Object.hasOwn(obj, key)\` | Check own property (modern) |

### Property Descriptors
\`Object.defineProperty\` and \`Object.getOwnPropertyDescriptor\` control writable, enumerable, and configurable flags.

### Spread & Shorthand
\`\`\`js
const { a, b } = obj;        // destructuring
const copy = { ...obj };      // shallow copy
const o = { name, age };      // shorthand properties
\`\`\`
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-obj-1',
      title: 'Object.keys',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Get all keys from an object.',
      skeleton: `const user = { name: 'Zan', age: 30 };
console.log(Object.__BLANK__(user)); // ['name', 'age']`,
      solution: `const user = { name: 'Zan', age: 30 };
console.log(Object.keys(user)); // ['name', 'age']`,
      hints: [
        'You need a static method on Object.',
        'It returns an array of the keys.',
        'Use `keys`.',
      ],
      concepts: ['Object.keys', 'enumerable properties'],
    },
    {
      id: 'js-obj-2',
      title: 'Computed property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Use a variable as a property name.',
      skeleton: `const key = 'color';
const obj = { __BLANK__: 'red' };
console.log(obj.color); // "red"`,
      solution: `const key = 'color';
const obj = { [key]: 'red' };
console.log(obj.color); // "red"`,
      hints: [
        'Square brackets around the key make it computed.',
        'The expression inside brackets is evaluated.',
        'Use `[key]`.',
      ],
      concepts: ['computed properties', 'dynamic keys'],
    },
    {
      id: 'js-obj-3',
      title: 'Object.freeze',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Prevent any modifications to an object.',
      skeleton: `const config = { port: 3000 };
Object.__BLANK__(config);
config.port = 8080; // silently fails in non-strict
console.log(config.port); // 3000`,
      solution: `const config = { port: 3000 };
Object.freeze(config);
config.port = 8080; // silently fails in non-strict
console.log(config.port); // 3000`,
      hints: [
        'You need a method that makes the object immutable.',
        'It prevents adding, deleting, and modifying properties.',
        'Use `freeze`.',
      ],
      concepts: ['Object.freeze', 'immutability'],
    },
    {
      id: 'js-obj-4',
      title: 'Object.hasOwn',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Check if an object has its own property (not inherited).',
      skeleton: `const obj = { a: 1 };
console.log(Object.__BLANK__(obj, 'a'));        // true
console.log(Object.__BLANK__(obj, 'toString')); // false`,
      solution: `const obj = { a: 1 };
console.log(Object.hasOwn(obj, 'a'));        // true
console.log(Object.hasOwn(obj, 'toString')); // false`,
      hints: [
        'The modern way to check own properties.',
        'Replaces hasOwnProperty.',
        'Use `hasOwn`.',
      ],
      concepts: ['Object.hasOwn', 'own properties', 'prototype chain'],
    },
    {
      id: 'js-obj-5',
      title: 'Shorthand properties',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Use property shorthand when variable name matches key.',
      skeleton: `const name = 'Zan';
const age = 30;
const user = { __BLANK__, __BLANK__ };
// same as { name: name, age: age }`,
      solution: `const name = 'Zan';
const age = 30;
const user = { name, age };
// same as { name: name, age: age }`,
      hints: [
        'When the variable name matches the key, you can use shorthand.',
        'Just write the variable name without the colon.',
        'Use `name, age`.',
      ],
      concepts: ['shorthand properties', 'ES6'],
    },
    {
      id: 'js-obj-6',
      title: 'Object.entries',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Convert an object to an array of [key, value] pairs.',
      skeleton: `const scores = { math: 90, science: 85 };
const pairs = Object.__BLANK__(scores);
// [['math', 90], ['science', 85]]`,
      solution: `const scores = { math: 90, science: 85 };
const pairs = Object.entries(scores);
// [['math', 90], ['science', 85]]`,
      hints: [
        'You need [key, value] pairs.',
        'Object has a static method for this.',
        'Use `entries`.',
      ],
      concepts: ['Object.entries', 'key-value pairs'],
    },
    // ---- write-function (6) ----
    {
      id: 'js-obj-7',
      title: 'Pick properties',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function `pick(obj, keys)` that returns a new object with only the specified keys.',
      skeleton: `function pick(obj, keys) {
  // Return object with only the specified keys
}
// pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) => { a: 1, c: 3 }
`,
      solution: `function pick(obj, keys) {
  return Object.fromEntries(
    keys.filter(k => k in obj).map(k => [k, obj[k]])
  );
}`,
      hints: [
        'Filter keys that exist in the object.',
        'Map each key to a [key, value] entry.',
        'Use Object.fromEntries to build the result.',
      ],
      concepts: ['Object.fromEntries', 'in operator', 'property access'],
    },
    {
      id: 'js-obj-8',
      title: 'Omit properties',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `omit(obj, keys)` that returns a new object without the specified keys.',
      skeleton: `function omit(obj, keys) {
  // Return object without the specified keys
}
`,
      solution: `function omit(obj, keys) {
  const excluded = new Set(keys);
  return Object.fromEntries(
    Object.entries(obj).filter(([k]) => !excluded.has(k))
  );
}`,
      hints: [
        'Get all entries from the object.',
        'Filter out entries whose key is in the exclusion list.',
        'Use Object.fromEntries to rebuild.',
      ],
      concepts: ['Object.entries', 'Object.fromEntries', 'Set', 'filtering'],
    },
    {
      id: 'js-obj-9',
      title: 'Deep merge',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function `deepMerge(target, source)` that recursively merges source into target (new object, no mutation).',
      skeleton: `function deepMerge(target, source) {
  // Recursively merge, return new object
}
`,
      solution: `function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      typeof source[key] === 'object' && source[key] !== null &&
      typeof result[key] === 'object' && result[key] !== null &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(result[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}`,
      hints: [
        'Spread the target to start with a shallow copy.',
        'For each source key, check if both values are plain objects.',
        'If so, recurse. Otherwise, overwrite.',
      ],
      concepts: ['recursion', 'deep merge', 'typeof', 'spread'],
    },
    {
      id: 'js-obj-10',
      title: 'Map object values',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `mapValues(obj, fn)` that returns a new object with the same keys but transformed values.',
      skeleton: `function mapValues(obj, fn) {
  // Transform values
}
// mapValues({ a: 1, b: 2 }, n => n * 10) => { a: 10, b: 20 }
`,
      solution: `function mapValues(obj, fn) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, fn(v)])
  );
}`,
      hints: [
        'Get entries, map the values, rebuild.',
        'Map each [key, value] to [key, fn(value)].',
        'Use Object.fromEntries.',
      ],
      concepts: ['Object.entries', 'Object.fromEntries', 'transformation'],
    },
    {
      id: 'js-obj-11',
      title: 'Invert object',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `invert(obj)` that swaps keys and values.',
      skeleton: `function invert(obj) {
  // Swap keys and values
}
// invert({ a: '1', b: '2' }) => { '1': 'a', '2': 'b' }
`,
      solution: `function invert(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [v, k])
  );
}`,
      hints: [
        'Get entries as [key, value] pairs.',
        'Map each to [value, key].',
        'Use Object.fromEntries to rebuild.',
      ],
      concepts: ['Object.entries', 'Object.fromEntries', 'invert'],
    },
    {
      id: 'js-obj-12',
      title: 'Define non-enumerable property',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function `addHiddenProp(obj, key, value)` that adds a non-enumerable property to an object.',
      skeleton: `function addHiddenProp(obj, key, value) {
  // Add non-enumerable property
}
`,
      solution: `function addHiddenProp(obj, key, value) {
  Object.defineProperty(obj, key, {
    value,
    writable: true,
    enumerable: false,
    configurable: true,
  });
  return obj;
}`,
      hints: [
        'Use Object.defineProperty.',
        'Set enumerable to false.',
        'The property will not show up in Object.keys or for...in.',
      ],
      concepts: ['Object.defineProperty', 'property descriptors', 'enumerable'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'js-obj-13',
      title: 'Fix: shallow copy mutation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Object.assign makes a shallow copy. This nested property is still shared. Fix it.',
      skeleton: `const original = { name: 'Zan', settings: { theme: 'dark' } };
const copy = Object.assign({}, original);
copy.settings.theme = 'light';
console.log(original.settings.theme); // should still be "dark"`,
      solution: `const original = { name: 'Zan', settings: { theme: 'dark' } };
const copy = { ...original, settings: { ...original.settings } };
copy.settings.theme = 'light';
console.log(original.settings.theme); // "dark"`,
      hints: [
        'Object.assign only copies one level deep.',
        'Nested objects are still shared references.',
        'Spread the nested object separately.',
      ],
      concepts: ['shallow copy', 'Object.assign', 'spread', 'deep copy'],
    },
    {
      id: 'js-obj-14',
      title: 'Fix: for...in includes prototype',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This for...in loop includes inherited properties. Fix it to only iterate own properties.',
      skeleton: `function ownKeys(obj) {
  const keys = [];
  for (const key in obj) {
    keys.push(key); // includes inherited properties!
  }
  return keys;
}`,
      solution: `function ownKeys(obj) {
  const keys = [];
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      keys.push(key);
    }
  }
  return keys;
}`,
      hints: [
        'for...in iterates over all enumerable properties, including inherited.',
        'Use Object.hasOwn to check own properties.',
        'Or just use Object.keys(obj) instead.',
      ],
      concepts: ['for...in', 'Object.hasOwn', 'prototype chain'],
    },
    {
      id: 'js-obj-15',
      title: 'Fix: delete does not work on frozen',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This code tries to remove a key from a frozen object. Create a new object without the key instead.',
      skeleton: `const config = Object.freeze({ host: 'localhost', port: 3000, debug: true });
delete config.debug; // silently fails
console.log(config.debug); // still true`,
      solution: `const config = Object.freeze({ host: 'localhost', port: 3000, debug: true });
const { debug, ...newConfig } = config;
console.log(newConfig.debug); // undefined`,
      hints: [
        'Cannot delete from a frozen object.',
        'Use destructuring to extract and exclude the property.',
        'Use rest syntax: `const { debug, ...newConfig } = config`.',
      ],
      concepts: ['Object.freeze', 'destructuring', 'rest', 'immutability'],
    },
    // ---- predict-output (3) ----
    {
      id: 'js-obj-16',
      title: 'Predict: Object.assign',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `const a = { x: 1, y: 2 };
const b = { y: 3, z: 4 };
const c = Object.assign({}, a, b);
console.log(c.y);`,
      solution: `3`,
      hints: [
        'Object.assign copies properties from left to right.',
        'Later sources overwrite earlier ones for the same key.',
        'b.y (3) overwrites a.y (2).',
      ],
      concepts: ['Object.assign', 'overwrite', 'merging'],
    },
    {
      id: 'js-obj-17',
      title: 'Predict: spread order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `const defaults = { color: 'blue', size: 'md' };
const custom = { color: 'red' };
const result = { ...defaults, ...custom };
console.log(result.color, result.size);`,
      solution: `red md`,
      hints: [
        'Spread copies properties left to right.',
        'custom.color overrides defaults.color.',
        'size comes only from defaults.',
      ],
      concepts: ['spread', 'object merging', 'override'],
    },
    {
      id: 'js-obj-18',
      title: 'Predict: Object.is',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `const a = { x: 1 };
const b = { x: 1 };
const c = a;
console.log(Object.is(a, b));
console.log(Object.is(a, c));`,
      solution: `false
true`,
      hints: [
        'Object.is checks reference equality for objects.',
        'a and b are different objects even with the same content.',
        'a and c reference the same object.',
      ],
      concepts: ['Object.is', 'reference equality', 'identity'],
    },
    // ---- refactor (2) ----
    {
      id: 'js-obj-19',
      title: 'Refactor: manual clone to structuredClone',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Refactor this manual deep clone using JSON to use structuredClone.',
      skeleton: `const original = { a: 1, b: { c: 2 } };
const clone = JSON.parse(JSON.stringify(original));`,
      solution: `const original = { a: 1, b: { c: 2 } };
const clone = structuredClone(original);`,
      hints: [
        'JSON round-trip loses functions, undefined, Dates, etc.',
        'structuredClone handles more types correctly.',
        'Replace JSON.parse(JSON.stringify(...)) with structuredClone.',
      ],
      concepts: ['structuredClone', 'deep clone', 'JSON', 'refactoring'],
    },
    {
      id: 'js-obj-20',
      title: 'Refactor: hasOwnProperty to Object.hasOwn',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Refactor from the old hasOwnProperty pattern to the modern Object.hasOwn.',
      skeleton: `function hasKey(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}`,
      solution: `function hasKey(obj, key) {
  return Object.hasOwn(obj, key);
}`,
      hints: [
        'Object.hasOwn is the modern replacement.',
        'It is safer and more concise.',
        'Replace the entire call with Object.hasOwn(obj, key).',
      ],
      concepts: ['Object.hasOwn', 'hasOwnProperty', 'refactoring'],
    },
  ],
};
