import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-maps',
  title: '26. Maps & Sets',
  explanation: `## Maps & Sets

Maps and Sets are keyed collections introduced in ES6 that solve limitations of plain objects and arrays.

\`\`\`javascript
// Map -- ordered key-value pairs, any type as key
const m = new Map();
m.set('name', 'Alice');
m.set(42, 'answer');
m.get('name');    // 'Alice'
m.has(42);        // true
m.size;           // 2

// Set -- unique values only
const s = new Set([1, 2, 2, 3]);
s.size;           // 3
s.has(2);         // true
s.add(4);
s.delete(2);

// WeakMap / WeakSet -- keys must be objects, garbage-collectable
const wm = new WeakMap();
const obj = {};
wm.set(obj, 'data');
\`\`\`

Maps preserve insertion order, accept any key type, and have a clean API. Sets guarantee uniqueness. WeakMap and WeakSet hold weak references to keys, enabling private data patterns without memory leaks.`,
  exercises: [
    {
      id: 'js-maps-1',
      title: 'Create a Map',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to create a Map and add a key-value pair.',
      skeleton: `const colors = new __BLANK__();
colors.__BLANK__('red', '#ff0000');
console.log(colors.__BLANK__('red')); // '#ff0000'`,
      solution: `const colors = new Map();
colors.set('red', '#ff0000');
console.log(colors.get('red')); // '#ff0000'`,
      hints: [
        'Maps are created with the Map constructor.',
        'Use .set(key, value) to add entries.',
        'Use .get(key) to retrieve the value for a key.',
      ],
      concepts: ['Map constructor', 'Map.set', 'Map.get'],
    },
    {
      id: 'js-maps-2',
      title: 'Map has / delete / size',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to check existence, delete a key, and get the size.',
      skeleton: `const m = new Map([['a', 1], ['b', 2], ['c', 3]]);
console.log(m.__BLANK__('b'));   // true
m.__BLANK__('b');
console.log(m.__BLANK__);       // 2`,
      solution: `const m = new Map([['a', 1], ['b', 2], ['c', 3]]);
console.log(m.has('b'));   // true
m.delete('b');
console.log(m.size);       // 2`,
      hints: [
        '.has(key) returns a boolean.',
        '.delete(key) removes the entry.',
        '.size is a property, not a method.',
      ],
      concepts: ['Map.has', 'Map.delete', 'Map.size'],
    },
    {
      id: 'js-maps-3',
      title: 'Iterate a Map',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blank to destructure key and value while iterating a Map.',
      skeleton: `const prices = new Map([['apple', 1.2], ['banana', 0.5]]);
for (const __BLANK__ of prices) {
  console.log(\`\${fruit}: $\${price}\`);
}`,
      solution: `const prices = new Map([['apple', 1.2], ['banana', 0.5]]);
for (const [fruit, price] of prices) {
  console.log(\`\${fruit}: $\${price}\`);
}`,
      hints: [
        'Map iteration yields [key, value] pairs.',
        'Use destructuring in the for-of loop.',
        '[fruit, price] destructures each entry.',
      ],
      concepts: ['Map iteration', 'destructuring'],
    },
    {
      id: 'js-maps-4',
      title: 'Set basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to create a Set, add a value, and check membership.',
      skeleton: `const tags = new __BLANK__();
tags.__BLANK__('javascript');
tags.__BLANK__('typescript');
console.log(tags.__BLANK__('javascript')); // true
console.log(tags.size); // 2`,
      solution: `const tags = new Set();
tags.add('javascript');
tags.add('typescript');
console.log(tags.has('javascript')); // true
console.log(tags.size); // 2`,
      hints: [
        'Sets are created with the Set constructor.',
        'Use .add(value) to insert values.',
        'Use .has(value) to check membership.',
      ],
      concepts: ['Set constructor', 'Set.add', 'Set.has'],
    },
    {
      id: 'js-maps-5',
      title: 'Deduplicate an array with Set',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to remove duplicates from an array using a Set.',
      skeleton: `const nums = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new __BLANK__(nums)];
console.log(unique); // [1, 2, 3, 4]`,
      solution: `const nums = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(nums)];
console.log(unique); // [1, 2, 3, 4]`,
      hints: [
        'Passing an iterable to new Set() creates a Set with unique values.',
        'Spread the Set back into an array with [...].',
        '[...new Set(nums)] deduplicates in one line.',
      ],
      concepts: ['Set from array', 'deduplication', 'spread'],
    },
    {
      id: 'js-maps-6',
      title: 'Map from entries',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Create a Map from an array of entries and convert it back to an array.',
      skeleton: `const entries = [['x', 10], ['y', 20]];
const m = new __BLANK__(entries);
const arr = __BLANK__.from(m);
console.log(arr); // [['x', 10], ['y', 20]]`,
      solution: `const entries = [['x', 10], ['y', 20]];
const m = new Map(entries);
const arr = Array.from(m);
console.log(arr); // [['x', 10], ['y', 20]]`,
      hints: [
        'The Map constructor accepts an iterable of [key, value] pairs.',
        'Array.from() can convert a Map to an array of entries.',
        'new Map(entries) and Array.from(map) are inverse operations.',
      ],
      concepts: ['Map from entries', 'Array.from'],
    },
    {
      id: 'js-maps-7',
      title: 'Map vs Object',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the output of this Map vs object comparison.',
      skeleton: `const m = new Map();
m.set(1, 'number');
m.set('1', 'string');
console.log(m.size);
console.log(m.get(1));
console.log(m.get('1'));

const obj = {};
obj[1] = 'number';
obj['1'] = 'string';
console.log(Object.keys(obj).length);`,
      solution: `// Output:
// 2
// 'number'
// 'string'
// 1
// Map distinguishes 1 and '1' as different keys.
// Objects coerce all keys to strings, so obj[1] and obj['1'] are the same key.`,
      hints: [
        'Map keys are compared by identity/value, not coerced.',
        'Object keys are always strings (or symbols).',
        'obj[1] becomes obj["1"] -- only 1 key total.',
      ],
      concepts: ['Map vs object', 'key coercion'],
    },
    {
      id: 'js-maps-8',
      title: 'Map with complex keys',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output when using objects as Map keys.',
      skeleton: `const m = new Map();
const keyA = { id: 1 };
const keyB = { id: 1 };

m.set(keyA, 'first');
m.set(keyB, 'second');

console.log(m.size);
console.log(m.get(keyA));
console.log(m.get({ id: 1 }));`,
      solution: `// Output:
// 2
// 'first'
// undefined
// Object keys are compared by reference, not deep equality.
// keyA and keyB are different objects, so they are different keys.
// { id: 1 } is yet another new object, so .get() returns undefined.`,
      hints: [
        'Map uses SameValueZero for key comparison.',
        'Objects are compared by reference, not structure.',
        'A new object literal is never === to an existing object.',
      ],
      concepts: ['Map key comparison', 'reference equality'],
    },
    {
      id: 'js-maps-9',
      title: 'Set union / intersection / difference',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write functions for Set union, intersection, and difference.',
      skeleton: `// Write three functions:
// union(a, b) -- all elements from both sets
// intersection(a, b) -- elements in both sets
// difference(a, b) -- elements in a but not in b
`,
      solution: `function union(a, b) {
  return new Set([...a, ...b]);
}

function intersection(a, b) {
  return new Set([...a].filter(x => b.has(x)));
}

function difference(a, b) {
  return new Set([...a].filter(x => !b.has(x)));
}`,
      hints: [
        'Union: spread both sets into one new Set.',
        'Intersection: filter set A, keeping only values that B also has.',
        'Difference: filter set A, keeping only values that B does NOT have.',
      ],
      concepts: ['Set union', 'Set intersection', 'Set difference'],
    },
    {
      id: 'js-maps-10',
      title: 'Object to Map and back',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write objectToMap and mapToObject conversion functions.',
      skeleton: `// objectToMap(obj) -- convert a plain object to a Map
// mapToObject(map) -- convert a Map with string keys to a plain object
`,
      solution: `function objectToMap(obj) {
  return new Map(Object.entries(obj));
}

function mapToObject(map) {
  return Object.fromEntries(map);
}`,
      hints: [
        'Object.entries(obj) returns [key, value] pairs -- perfect for Map constructor.',
        'Object.fromEntries() converts [key, value] pairs back to an object.',
        'These are essentially inverse operations for string-keyed Maps.',
      ],
      concepts: ['Object.entries', 'Object.fromEntries', 'Map conversion'],
    },
    {
      id: 'js-maps-11',
      title: 'Map chaining',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that creates a Map from an array of objects using a key extractor, demonstrating Map.set chaining.',
      skeleton: `// indexBy(arr, keyFn) -- returns a Map where each key is keyFn(item)
// Example: indexBy([{id:1,name:'a'},{id:2,name:'b'}], x => x.id)
// => Map { 1 => {id:1,name:'a'}, 2 => {id:2,name:'b'} }
`,
      solution: `function indexBy(arr, keyFn) {
  const map = new Map();
  for (const item of arr) {
    map.set(keyFn(item), item);
  }
  return map;
}`,
      hints: [
        'Iterate over the array and set each item with keyFn(item) as the key.',
        'Map.set returns the Map, enabling chaining, but a loop is clearer here.',
        'for (const item of arr) { map.set(keyFn(item), item); }',
      ],
      concepts: ['Map building', 'key extraction', 'indexing'],
    },
    {
      id: 'js-maps-12',
      title: 'WeakMap for private data',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Use a WeakMap to store private data for a class, inaccessible from outside.',
      skeleton: `// Create a Person class that uses a WeakMap to store a private 'secret' field.
// constructor(name, secret) -- stores name publicly, secret in WeakMap
// getSecret() -- returns the secret for this instance
`,
      solution: `const _secrets = new WeakMap();

class Person {
  constructor(name, secret) {
    this.name = name;
    _secrets.set(this, secret);
  }

  getSecret() {
    return _secrets.get(this);
  }
}`,
      hints: [
        'Declare a WeakMap outside the class as a module-level variable.',
        'In the constructor, use weakMap.set(this, secret).',
        'In getSecret(), use weakMap.get(this) to retrieve the value.',
      ],
      concepts: ['WeakMap', 'private data pattern', 'encapsulation'],
    },
    {
      id: 'js-maps-13',
      title: 'Fix the Map iteration bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code tries to sum all values in a Map but has a bug. Fix it.',
      skeleton: `const scores = new Map([['alice', 90], ['bob', 85], ['carol', 92]]);

let total = 0;
scores.forEach((key, value) => {
  total += value;
});
console.log(total); // Expected: 267`,
      solution: `const scores = new Map([['alice', 90], ['bob', 85], ['carol', 92]]);

let total = 0;
scores.forEach((value, key) => {
  total += value;
});
console.log(total); // 267`,
      hints: [
        'Map.forEach callback parameters are (value, key), not (key, value).',
        'This differs from the for-of destructuring order [key, value].',
        'Swap the parameter names so value comes first.',
      ],
      concepts: ['Map.forEach', 'callback parameter order'],
    },
    {
      id: 'js-maps-14',
      title: 'Fix the Set equality bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code expects unique users but duplicates appear. Fix it.',
      skeleton: `const users = new Set();
users.add({ name: 'Alice' });
users.add({ name: 'Alice' });
users.add({ name: 'Bob' });

// Expected: 2 unique users, but users.size is 3
// Fix: use a string key instead of object references
function addUser(set, name) {
  set.add({ name });
}`,
      solution: `const users = new Set();

function addUser(set, name) {
  set.add(name);
}

addUser(users, 'Alice');
addUser(users, 'Alice');
addUser(users, 'Bob');
// users.size === 2 -- Set deduplicates primitive values`,
      hints: [
        'Sets compare objects by reference, not by value.',
        'Two separate { name: "Alice" } objects are different references.',
        'Store the name string directly instead of wrapper objects.',
      ],
      concepts: ['Set reference equality', 'primitive vs object'],
    },
    {
      id: 'js-maps-15',
      title: 'Fix the WeakMap type error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code throws a TypeError. Fix the WeakMap usage.',
      skeleton: `const cache = new WeakMap();
cache.set('user-1', { name: 'Alice', data: [1, 2, 3] });
cache.set('user-2', { name: 'Bob', data: [4, 5, 6] });
console.log(cache.get('user-1'));`,
      solution: `const cache = new WeakMap();
const user1Key = { id: 'user-1' };
const user2Key = { id: 'user-2' };
cache.set(user1Key, { name: 'Alice', data: [1, 2, 3] });
cache.set(user2Key, { name: 'Bob', data: [4, 5, 6] });
console.log(cache.get(user1Key));`,
      hints: [
        'WeakMap keys must be objects (or symbols), not strings.',
        'Create object references to use as keys.',
        'Store the key references so you can retrieve values later.',
      ],
      concepts: ['WeakMap key constraints', 'object keys'],
    },
    {
      id: 'js-maps-16',
      title: 'Set iteration methods',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output of Set iteration.',
      skeleton: `const s = new Set(['a', 'b', 'c']);
console.log([...s.keys()]);
console.log([...s.values()]);
console.log([...s.entries()]);`,
      solution: `// Output:
// ['a', 'b', 'c']
// ['a', 'b', 'c']
// [['a', 'a'], ['b', 'b'], ['c', 'c']]
// Set.keys() and Set.values() return the same iterator (sets have no separate keys).
// Set.entries() returns [value, value] pairs for compatibility with Map.`,
      hints: [
        'Sets have no keys distinct from values.',
        '.keys() and .values() produce the same result.',
        '.entries() returns [value, value] pairs (not [key, value]).',
      ],
      concepts: ['Set.keys', 'Set.values', 'Set.entries'],
    },
    {
      id: 'js-maps-17',
      title: 'WeakSet usage',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Use a WeakSet to track which DOM-like objects have been processed, without preventing garbage collection.',
      skeleton: `// Create a processOnce(item, callback) function that:
// - Calls callback(item) only the first time for each item
// - Skips items already processed
// - Uses a WeakSet so processed items can be garbage collected
`,
      solution: `const processed = new WeakSet();

function processOnce(item, callback) {
  if (processed.has(item)) {
    return;
  }
  processed.add(item);
  callback(item);
}`,
      hints: [
        'WeakSet.has(obj) checks if the object was added.',
        'WeakSet.add(obj) marks it as processed.',
        'Declare the WeakSet outside the function so it persists across calls.',
      ],
      concepts: ['WeakSet', 'idempotent processing', 'garbage collection'],
    },
    {
      id: 'js-maps-18',
      title: 'Group by with Map',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a groupBy function that groups array items by a key function, returning a Map.',
      skeleton: `// groupBy(arr, keyFn) => Map<key, item[]>
// Example: groupBy([1,2,3,4,5], n => n % 2 === 0 ? 'even' : 'odd')
// => Map { 'odd' => [1,3,5], 'even' => [2,4] }
`,
      solution: `function groupBy(arr, keyFn) {
  const map = new Map();
  for (const item of arr) {
    const key = keyFn(item);
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(item);
  }
  return map;
}`,
      hints: [
        'For each item, compute the group key with keyFn(item).',
        'If the key is not in the Map yet, initialize it with an empty array.',
        'Push the item into the array for that key.',
      ],
      concepts: ['Map grouping', 'data transformation'],
    },
    {
      id: 'js-maps-19',
      title: 'Refactor object cache to Map',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this object-based cache to use a Map for better key handling and performance.',
      skeleton: `const cache = {};

function getFromCache(key) {
  if (cache.hasOwnProperty(key)) {
    return cache[key];
  }
  return undefined;
}

function setInCache(key, value) {
  cache[key] = value;
}

function removeFromCache(key) {
  delete cache[key];
}

function cacheSize() {
  return Object.keys(cache).length;
}`,
      solution: `const cache = new Map();

function getFromCache(key) {
  return cache.get(key);
}

function setInCache(key, value) {
  cache.set(key, value);
}

function removeFromCache(key) {
  cache.delete(key);
}

function cacheSize() {
  return cache.size;
}`,
      hints: [
        'Replace the object with new Map().',
        'Use .get(), .set(), .delete() instead of bracket access.',
        'Use .size instead of Object.keys().length.',
      ],
      concepts: ['Map vs object', 'refactoring', 'cache pattern'],
    },
    {
      id: 'js-maps-20',
      title: 'Refactor array dedup to Set',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this manual deduplication to use a Set for clarity and performance.',
      skeleton: `function unique(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    let found = false;
    for (let j = 0; j < result.length; j++) {
      if (result[j] === arr[i]) {
        found = true;
        break;
      }
    }
    if (!found) {
      result.push(arr[i]);
    }
  }
  return result;
}`,
      solution: `function unique(arr) {
  return [...new Set(arr)];
}`,
      hints: [
        'new Set(arr) automatically removes duplicates.',
        'Spread the Set back into an array with [...].',
        'This replaces the entire O(n^2) loop with one line.',
      ],
      concepts: ['Set deduplication', 'refactoring', 'performance'],
    },
  ],
};
