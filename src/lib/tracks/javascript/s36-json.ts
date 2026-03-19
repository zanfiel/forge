import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-json',
  title: '36. JSON',
  explanation: `## JSON

JSON (JavaScript Object Notation) is the universal data interchange format. JavaScript provides powerful JSON APIs with replacer, reviver, and custom serialization.

\`\`\`javascript
// Parse & stringify
const obj = JSON.parse('{"name":"Alice","age":30}');
const str = JSON.stringify(obj);

// Formatting
JSON.stringify(obj, null, 2); // pretty-printed with 2 spaces

// Replacer -- filter or transform during stringify
JSON.stringify(obj, (key, value) => {
  if (key === 'password') return undefined; // omit
  return value;
});

// Reviver -- transform during parse
JSON.parse(jsonStr, (key, value) => {
  if (key === 'date') return new Date(value);
  return value;
});

// toJSON -- custom serialization
class User {
  toJSON() { return { name: this.name }; }
}

// structuredClone for deep copy (replaces JSON round-trip)
const deep = structuredClone(obj);
\`\`\`

JSON cannot represent undefined, functions, symbols, BigInt, or circular references. Know these limitations.`,
  exercises: [
    {
      id: 'js-json-1',
      title: 'JSON.parse basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to parse a JSON string into an object.',
      skeleton: `const jsonStr = '{"name":"Alice","age":30,"active":true}';
const user = __BLANK__.__BLANK__(jsonStr);
console.log(user.name); // 'Alice'
console.log(typeof user.age); // 'number'`,
      solution: `const jsonStr = '{"name":"Alice","age":30,"active":true}';
const user = JSON.parse(jsonStr);
console.log(user.name); // 'Alice'
console.log(typeof user.age); // 'number'`,
      hints: [
        'JSON.parse converts a JSON string to a JavaScript value.',
        'It automatically converts types: strings, numbers, booleans, null.',
        'The result is a plain JavaScript object.',
      ],
      concepts: ['JSON.parse', 'deserialization'],
    },
    {
      id: 'js-json-2',
      title: 'JSON.stringify basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to serialize an object to JSON.',
      skeleton: `const data = { name: 'Bob', scores: [95, 87, 92] };
const json = __BLANK__.__BLANK__(data);
console.log(typeof json); // 'string'

// Pretty print with 2 spaces
const pretty = JSON.stringify(data, __BLANK__, __BLANK__);`,
      solution: `const data = { name: 'Bob', scores: [95, 87, 92] };
const json = JSON.stringify(data);
console.log(typeof json); // 'string'

// Pretty print with 2 spaces
const pretty = JSON.stringify(data, null, 2);`,
      hints: [
        'JSON.stringify converts a value to a JSON string.',
        'The second argument is a replacer (null to include all).',
        'The third argument is the indentation (2 for readable output).',
      ],
      concepts: ['JSON.stringify', 'serialization', 'pretty printing'],
    },
    {
      id: 'js-json-3',
      title: 'Replacer function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to use a replacer function that omits sensitive fields.',
      skeleton: `const user = { name: 'Alice', password: 'secret', email: 'a@b.com' };

const safe = JSON.stringify(user, (key, __BLANK__) => {
  if (key === 'password') return __BLANK__;
  return value;
});
console.log(safe); // '{"name":"Alice","email":"a@b.com"}'`,
      solution: `const user = { name: 'Alice', password: 'secret', email: 'a@b.com' };

const safe = JSON.stringify(user, (key, value) => {
  if (key === 'password') return undefined;
  return value;
});
console.log(safe); // '{"name":"Alice","email":"a@b.com"}'`,
      hints: [
        'The replacer function receives (key, value) for each property.',
        'Returning undefined omits the property from output.',
        'Return the value unchanged to include it.',
      ],
      concepts: ['replacer function', 'filtering'],
    },
    {
      id: 'js-json-4',
      title: 'Reviver function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to use a reviver that converts date strings to Date objects.',
      skeleton: `const json = '{"name":"Alice","created":"2024-01-15T10:30:00.000Z"}';

const obj = JSON.parse(json, (key, __BLANK__) => {
  if (key === 'created') return new __BLANK__(value);
  return value;
});
console.log(obj.created instanceof Date); // true`,
      solution: `const json = '{"name":"Alice","created":"2024-01-15T10:30:00.000Z"}';

const obj = JSON.parse(json, (key, value) => {
  if (key === 'created') return new Date(value);
  return value;
});
console.log(obj.created instanceof Date); // true`,
      hints: [
        'The reviver function transforms values during parsing.',
        'It receives (key, value) for each property.',
        'Return new Date(value) to convert date strings.',
      ],
      concepts: ['reviver function', 'Date parsing'],
    },
    {
      id: 'js-json-5',
      title: 'Replacer array',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to use an array replacer to whitelist properties.',
      skeleton: `const user = { name: 'Alice', age: 30, password: 'secret', role: 'admin' };
const json = JSON.stringify(user, __BLANK__);
console.log(json); // '{"name":"Alice","role":"admin"}'`,
      solution: `const user = { name: 'Alice', age: 30, password: 'secret', role: 'admin' };
const json = JSON.stringify(user, ['name', 'role']);
console.log(json); // '{"name":"Alice","role":"admin"}'`,
      hints: [
        'The replacer can be an array of property names to include.',
        'Only properties in the array will be serialized.',
        'This acts as a whitelist for the output.',
      ],
      concepts: ['replacer array', 'property whitelist'],
    },
    {
      id: 'js-json-6',
      title: 'Predict JSON.stringify with undefined/functions',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict how JSON.stringify handles non-serializable values.',
      skeleton: `const obj = {
  name: 'test',
  fn: () => 42,
  undef: undefined,
  sym: Symbol('x'),
  num: 42,
  nul: null,
};

console.log(JSON.stringify(obj));`,
      solution: `// Output:
// '{"name":"test","num":42,"nul":null}'
// JSON.stringify omits:
// - functions (fn)
// - undefined values (undef)
// - symbol values (sym)
// It keeps: strings, numbers, booleans, null, arrays, objects.`,
      hints: [
        'Functions, undefined, and symbols are omitted from JSON output.',
        'null IS included in JSON.',
        'Properties with non-serializable values are silently dropped.',
      ],
      concepts: ['JSON limitations', 'non-serializable types'],
    },
    {
      id: 'js-json-7',
      title: 'Predict JSON.stringify with toJSON',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output when an object has a toJSON method.',
      skeleton: `class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  toJSON() {
    return \`\${this.amount} \${this.currency}\`;
  }
}

const price = new Money(29.99, 'USD');
console.log(JSON.stringify(price));
console.log(JSON.stringify({ price }));`,
      solution: `// Output:
// '"29.99 USD"'
// '{"price":"29.99 USD"}'
// toJSON() is called automatically by JSON.stringify.
// It returns a string, which is then serialized as a JSON string.
// When nested in an object, the toJSON result replaces the object.`,
      hints: [
        'toJSON() is called by JSON.stringify if it exists.',
        'The return value replaces the original object in the output.',
        'The returned value is then serialized normally.',
      ],
      concepts: ['toJSON', 'custom serialization'],
    },
    {
      id: 'js-json-8',
      title: 'Predict circular reference error',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict what happens with circular references in JSON.stringify.',
      skeleton: `const a = { name: 'a' };
const b = { name: 'b', ref: a };
a.ref = b;

try {
  console.log(JSON.stringify(a));
} catch (e) {
  console.log(e.constructor.name);
}`,
      solution: `// Output:
// 'TypeError'
// JSON.stringify throws a TypeError on circular references.
// a -> b -> a creates a cycle that cannot be represented in JSON.`,
      hints: [
        'Circular references cause infinite recursion.',
        'JSON.stringify detects cycles and throws TypeError.',
        'Use a replacer function or structuredClone for circular data.',
      ],
      concepts: ['circular reference', 'TypeError'],
    },
    {
      id: 'js-json-9',
      title: 'Handle circular references',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a safeStringify function that handles circular references by replacing them with "[Circular]".',
      skeleton: `// safeStringify(obj, indent) -- like JSON.stringify but handles circular refs
`,
      solution: `function safeStringify(obj, indent) {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return '[Circular]';
      seen.add(value);
    }
    return value;
  }, indent);
}`,
      hints: [
        'Use a WeakSet to track objects already seen.',
        'In the replacer, check if the value has been seen before.',
        'Return "[Circular]" for circular references.',
      ],
      concepts: ['circular reference handling', 'WeakSet', 'replacer'],
    },
    {
      id: 'js-json-10',
      title: 'Date serialization round-trip',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a JSON round-trip that preserves Date objects.',
      skeleton: `// serializeWithDates(obj) -- stringify that marks Dates
// deserializeWithDates(json) -- parse that restores Dates
`,
      solution: `function serializeWithDates(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (value instanceof Date) {
      return { __type: 'Date', __value: value.toISOString() };
    }
    return value;
  });
}

function deserializeWithDates(json) {
  return JSON.parse(json, (key, value) => {
    if (value && value.__type === 'Date') {
      return new Date(value.__value);
    }
    return value;
  });
}`,
      hints: [
        'In the replacer, wrap Date values with a type marker.',
        'In the reviver, check for the type marker and reconstruct.',
        'Use a convention like { __type: "Date", __value: "..." }.',
      ],
      concepts: ['Date serialization', 'round-trip', 'type markers'],
    },
    {
      id: 'js-json-11',
      title: 'Map/Set serialization',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write serialization helpers that can handle Map and Set in JSON.',
      skeleton: `// extendedStringify(obj) -- handles Map and Set
// extendedParse(json) -- restores Map and Set
`,
      solution: `function extendedStringify(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (value instanceof Map) {
      return { __type: 'Map', __value: [...value] };
    }
    if (value instanceof Set) {
      return { __type: 'Set', __value: [...value] };
    }
    return value;
  });
}

function extendedParse(json) {
  return JSON.parse(json, (key, value) => {
    if (value && value.__type === 'Map') {
      return new Map(value.__value);
    }
    if (value && value.__type === 'Set') {
      return new Set(value.__value);
    }
    return value;
  });
}`,
      hints: [
        'Convert Map to an array of entries for serialization.',
        'Convert Set to an array of values.',
        'Use type markers to identify them during deserialization.',
      ],
      concepts: ['Map serialization', 'Set serialization', 'type markers'],
    },
    {
      id: 'js-json-12',
      title: 'BigInt serialization',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a replacer/reviver pair that handles BigInt serialization.',
      skeleton: `// BigInt cannot be serialized by default -- JSON.stringify throws!
// Write bigIntStringify(obj) and bigIntParse(json)
`,
      solution: `function bigIntStringify(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'bigint') {
      return { __type: 'BigInt', __value: value.toString() };
    }
    return value;
  });
}

function bigIntParse(json) {
  return JSON.parse(json, (key, value) => {
    if (value && value.__type === 'BigInt') {
      return BigInt(value.__value);
    }
    return value;
  });
}`,
      hints: [
        'JSON.stringify throws TypeError on BigInt values.',
        'Convert BigInt to string with .toString() in the replacer.',
        'Restore with BigInt() in the reviver.',
      ],
      concepts: ['BigInt serialization', 'custom replacer'],
    },
    {
      id: 'js-json-13',
      title: 'Fix the JSON.parse safety issue',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code crashes on invalid JSON. Fix it with safe parsing.',
      skeleton: `function loadConfig(jsonString) {
  const config = JSON.parse(jsonString);
  return {
    theme: config.theme || 'light',
    lang: config.lang || 'en',
  };
}

// Crashes if jsonString is undefined, empty, or invalid`,
      solution: `function loadConfig(jsonString) {
  let config = {};
  if (jsonString) {
    try {
      config = JSON.parse(jsonString);
    } catch {
      config = {};
    }
  }
  return {
    theme: config.theme || 'light',
    lang: config.lang || 'en',
  };
}`,
      hints: [
        'JSON.parse throws on invalid input.',
        'Wrap in try/catch and provide a fallback.',
        'Check for null/undefined before parsing.',
      ],
      concepts: ['JSON.parse safety', 'error handling'],
    },
    {
      id: 'js-json-14',
      title: 'Fix the prototype pollution via JSON',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This JSON parse is vulnerable to __proto__ pollution. Fix it.',
      skeleton: `function mergeConfig(defaultConfig, userJson) {
  const userConfig = JSON.parse(userJson);
  // Bug: if userJson contains "__proto__", it can pollute Object.prototype
  return Object.assign({}, defaultConfig, userConfig);
}

// Attack: '{"__proto__":{"isAdmin":true}}'`,
      solution: `function mergeConfig(defaultConfig, userJson) {
  const userConfig = JSON.parse(userJson);
  const safeConfig = {};
  for (const key of Object.keys(userConfig)) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }
    safeConfig[key] = userConfig[key];
  }
  return Object.assign({}, defaultConfig, safeConfig);
}`,
      hints: [
        'Filter out __proto__, constructor, and prototype keys.',
        'Never blindly merge user-controlled JSON into objects.',
        'Use Object.keys() to iterate only own properties.',
      ],
      concepts: ['prototype pollution', 'JSON security'],
    },
    {
      id: 'js-json-15',
      title: 'Fix the JSON deep clone issue',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This JSON clone loses Date objects and undefined values. Fix it.',
      skeleton: `function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const original = {
  name: 'Alice',
  birthday: new Date('1990-01-01'),
  optional: undefined,
  data: new Map([['key', 'value']]),
};

const clone = deepClone(original);
console.log(clone.birthday instanceof Date); // false -- it is a string!
console.log(clone.optional); // undefined (property is missing entirely)
console.log(clone.data); // {} (Map is lost)`,
      solution: `function deepClone(obj) {
  return structuredClone(obj);
}

const original = {
  name: 'Alice',
  birthday: new Date('1990-01-01'),
  optional: undefined,
  data: new Map([['key', 'value']]),
};

const clone = deepClone(original);
console.log(clone.birthday instanceof Date); // true
console.log(clone.optional); // undefined (preserved)
console.log(clone.data instanceof Map); // true`,
      hints: [
        'JSON round-trip loses Dates, undefined, Maps, Sets, and more.',
        'structuredClone handles all these types correctly.',
        'structuredClone is the modern deep clone solution.',
      ],
      concepts: ['structuredClone', 'JSON limitations', 'deep clone'],
    },
    {
      id: 'js-json-16',
      title: 'JSON Lines parser',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function that parses JSON Lines (NDJSON) format -- one JSON object per line.',
      skeleton: `// parseJSONLines(text) -- parses newline-delimited JSON
// Returns an array of parsed objects, skipping empty lines and invalid JSON
`,
      solution: `function parseJSONLines(text) {
  return text
    .split('\\n')
    .filter(line => line.trim().length > 0)
    .reduce((results, line) => {
      try {
        results.push(JSON.parse(line));
      } catch {
        // skip invalid lines
      }
      return results;
    }, []);
}`,
      hints: [
        'Split the text by newline characters.',
        'Filter out empty lines.',
        'Parse each line individually with try/catch for safety.',
      ],
      concepts: ['JSON Lines', 'NDJSON', 'line parsing'],
    },
    {
      id: 'js-json-17',
      title: 'JSON patch (partial update)',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a simple JSON patch function that applies partial updates to an object.',
      skeleton: `// jsonPatch(original, patch) -- applies patch operations to original
// patch format: { op: 'replace'|'add'|'remove', path: '/a/b', value?: any }[]
`,
      solution: `function jsonPatch(original, patches) {
  const result = structuredClone(original);

  for (const { op, path, value } of patches) {
    const parts = path.split('/').filter(Boolean);
    const last = parts.pop();
    let target = result;

    for (const part of parts) {
      target = target[part];
    }

    switch (op) {
      case 'add':
      case 'replace':
        target[last] = value;
        break;
      case 'remove':
        if (Array.isArray(target)) {
          target.splice(Number(last), 1);
        } else {
          delete target[last];
        }
        break;
    }
  }

  return result;
}`,
      hints: [
        'Clone the original first to avoid mutation.',
        'Navigate the path segments to find the target property.',
        'Apply add/replace by setting the value, remove by deleting.',
      ],
      concepts: ['JSON Patch', 'path navigation', 'immutable update'],
    },
    {
      id: 'js-json-18',
      title: 'Streaming JSON parser',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function that parses a large JSON array from chunks without loading everything into memory.',
      skeleton: `// parseJSONStream(chunks) -- chunks is an async iterable of strings
// Yields individual items from a JSON array as they are found
// Assumes format: [item1, item2, item3, ...]
`,
      solution: `async function* parseJSONStream(chunks) {
  let buffer = '';
  let depth = 0;
  let inString = false;
  let escape = false;
  let itemStart = -1;

  for await (const chunk of chunks) {
    buffer += chunk;
  }

  // Simple approach: find top-level commas in the array
  const trimmed = buffer.trim();
  const inner = trimmed.startsWith('[') ? trimmed.slice(1, -1) : trimmed;

  let start = 0;
  depth = 0;
  inString = false;
  escape = false;

  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i];
    if (escape) { escape = false; continue; }
    if (ch === '\\\\') { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === '{' || ch === '[') depth++;
    if (ch === '}' || ch === ']') depth--;
    if (ch === ',' && depth === 0) {
      const item = inner.slice(start, i).trim();
      if (item) yield JSON.parse(item);
      start = i + 1;
    }
  }
  const last = inner.slice(start).trim();
  if (last) yield JSON.parse(last);
}`,
      hints: [
        'Track brace/bracket depth to find top-level commas.',
        'Skip characters inside strings (handle escape sequences).',
        'Parse each item individually when a top-level comma is found.',
      ],
      concepts: ['streaming JSON', 'async generator', 'incremental parsing'],
    },
    {
      id: 'js-json-19',
      title: 'Refactor manual serialization to toJSON',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this external serialization function to use the toJSON method pattern.',
      skeleton: `class User {
  constructor(name, email, passwordHash) {
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = new Date();
  }
}

function serializeUser(user) {
  return JSON.stringify({
    name: user.name,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
    // intentionally omit passwordHash
  });
}`,
      solution: `class User {
  constructor(name, email, passwordHash) {
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = new Date();
  }

  toJSON() {
    return {
      name: this.name,
      email: this.email,
      createdAt: this.createdAt.toISOString(),
    };
  }
}

// Now just:
// JSON.stringify(user) -- automatically calls toJSON()`,
      hints: [
        'Add a toJSON() method to the class.',
        'Return only the properties you want serialized.',
        'JSON.stringify automatically calls toJSON() if it exists.',
      ],
      concepts: ['toJSON', 'encapsulation', 'refactoring'],
    },
    {
      id: 'js-json-20',
      title: 'Refactor deep merge to structured clone',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this JSON-based deep clone to use structuredClone.',
      skeleton: `function deepMerge(target, source) {
  const targetClone = JSON.parse(JSON.stringify(target));
  const sourceClone = JSON.parse(JSON.stringify(source));

  for (const key of Object.keys(sourceClone)) {
    if (typeof sourceClone[key] === 'object' && sourceClone[key] !== null
        && typeof targetClone[key] === 'object' && targetClone[key] !== null) {
      targetClone[key] = deepMerge(targetClone[key], sourceClone[key]);
    } else {
      targetClone[key] = sourceClone[key];
    }
  }
  return targetClone;
}`,
      solution: `function deepMerge(target, source) {
  const result = structuredClone(target);
  const sourceClone = structuredClone(source);

  for (const key of Object.keys(sourceClone)) {
    if (typeof sourceClone[key] === 'object' && sourceClone[key] !== null
        && !Array.isArray(sourceClone[key])
        && typeof result[key] === 'object' && result[key] !== null
        && !Array.isArray(result[key])) {
      result[key] = deepMerge(result[key], sourceClone[key]);
    } else {
      result[key] = sourceClone[key];
    }
  }
  return result;
}`,
      hints: [
        'Replace JSON.parse(JSON.stringify(...)) with structuredClone().',
        'structuredClone preserves Date, Map, Set, and more.',
        'Also add array checks to avoid merging arrays as objects.',
      ],
      concepts: ['structuredClone', 'deep merge', 'refactoring'],
    },
  ],
};
