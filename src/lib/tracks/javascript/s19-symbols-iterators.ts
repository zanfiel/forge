import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-symbols-iterators',
  title: '19. Symbols & Iterators',
  explanation: `## Symbols & Iterators

### Symbols
\`Symbol()\` creates a unique, immutable primitive. Every symbol is globally unique unless created with \`Symbol.for(key)\` (global registry).

\`\`\`js
const s1 = Symbol('desc');
const s2 = Symbol('desc');
s1 === s2; // false -- always unique

const shared = Symbol.for('app.id');
Symbol.for('app.id') === shared; // true -- global registry
Symbol.keyFor(shared); // 'app.id'
\`\`\`

### Well-Known Symbols
- \`Symbol.iterator\` -- makes objects iterable
- \`Symbol.toPrimitive\` -- custom type coercion
- \`Symbol.hasInstance\` -- customise instanceof
- \`Symbol.toStringTag\` -- customise Object.prototype.toString

### Iterator Protocol
An **iterator** is an object with a \`next()\` method returning \`{ value, done }\`.

### Iterable Protocol
An **iterable** has a \`[Symbol.iterator]()\` method that returns an iterator.

\`\`\`js
const range = {
  from: 1, to: 3,
  [Symbol.iterator]() {
    let cur = this.from;
    return {
      next: () => cur <= this.to
        ? { value: cur++, done: false }
        : { done: true },
    };
  },
};

for (const n of range) console.log(n); // 1, 2, 3
\`\`\`

Built-in iterables: String, Array, Map, Set, TypedArray, arguments, NodeList.
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-sym-1b',
      title: 'Create a symbol',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Create a unique symbol with a description.',
      skeleton: `const id = __BLANK__('userId');
console.log(typeof id); // 'symbol'`,
      solution: `const id = Symbol('userId');
console.log(typeof id); // 'symbol'`,
      hints: [
        'Symbols are a primitive type created with a special function.',
        'The argument is a description, not a value.',
        'Use `Symbol("userId")`.',
      ],
      concepts: ['Symbol', 'typeof'],
    },
    {
      id: 'js-sym-2b',
      title: 'Global symbol registry',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Retrieve a shared symbol from the global registry.',
      skeleton: `const s1 = Symbol.for('app.token');
const s2 = Symbol.__BLANK__('app.token');
console.log(s1 === s2); // true`,
      solution: `const s1 = Symbol.for('app.token');
const s2 = Symbol.for('app.token');
console.log(s1 === s2); // true`,
      hints: [
        'The global registry returns the same symbol for the same key.',
        'You used it on the first line already.',
        'The method is `for`.',
      ],
      concepts: ['Symbol.for', 'global symbol registry'],
    },
    {
      id: 'js-sym-3b',
      title: 'Make an object iterable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Add the correct well-known symbol to make the object iterable.',
      skeleton: `const nums = {
  data: [10, 20, 30],
  [Symbol.__BLANK__]() {
    let i = 0;
    return {
      next: () => i < this.data.length
        ? { value: this.data[i++], done: false }
        : { done: true },
    };
  },
};

for (const n of nums) console.log(n);`,
      solution: `const nums = {
  data: [10, 20, 30],
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => i < this.data.length
        ? { value: this.data[i++], done: false }
        : { done: true },
    };
  },
};

for (const n of nums) console.log(n);`,
      hints: [
        'for...of uses a specific well-known symbol.',
        'It defines the iterable protocol.',
        'The symbol is `iterator`.',
      ],
      concepts: ['Symbol.iterator', 'iterable protocol'],
    },
    {
      id: 'js-sym-4i',
      title: 'Iterator next() shape',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Return the correct shape from a next() call.',
      skeleton: `const iter = {
  values: ['a', 'b'],
  index: 0,
  next() {
    if (this.index < this.values.length) {
      return { value: this.values[this.index++], __BLANK__: false };
    }
    return { __BLANK__: true };
  },
};`,
      solution: `const iter = {
  values: ['a', 'b'],
  index: 0,
  next() {
    if (this.index < this.values.length) {
      return { value: this.values[this.index++], done: false };
    }
    return { done: true };
  },
};`,
      hints: [
        'The iterator protocol requires a specific boolean property.',
        'It signals whether iteration is complete.',
        'The property is `done`.',
      ],
      concepts: ['iterator protocol', 'next()', 'done'],
    },
    {
      id: 'js-sym-5i',
      title: 'Symbol.toPrimitive',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Implement custom type coercion using Symbol.toPrimitive.',
      skeleton: `class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  [Symbol.__BLANK__](hint) {
    if (hint === 'number') return this.amount;
    if (hint === 'string') return this.amount + ' ' + this.currency;
    return this.amount;
  }
}

const price = new Money(9.99, 'USD');
console.log(+price);      // 9.99
console.log(\`\${price}\`); // '9.99 USD'`,
      solution: `class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return this.amount;
    if (hint === 'string') return this.amount + ' ' + this.currency;
    return this.amount;
  }
}

const price = new Money(9.99, 'USD');
console.log(+price);      // 9.99
console.log(\`\${price}\`); // '9.99 USD'`,
      hints: [
        'This well-known symbol controls type conversion.',
        'The hint parameter tells you the expected type.',
        'The symbol is `toPrimitive`.',
      ],
      concepts: ['Symbol.toPrimitive', 'type coercion'],
    },
    {
      id: 'js-sym-6a',
      title: 'Symbol.hasInstance',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Customise the instanceof operator using Symbol.hasInstance.',
      skeleton: `class EvenNumber {
  static [Symbol.__BLANK__](value) {
    return typeof value === 'number' && value % 2 === 0;
  }
}

console.log(4 instanceof EvenNumber);  // true
console.log(3 instanceof EvenNumber);  // false`,
      solution: `class EvenNumber {
  static [Symbol.hasInstance](value) {
    return typeof value === 'number' && value % 2 === 0;
  }
}

console.log(4 instanceof EvenNumber);  // true
console.log(3 instanceof EvenNumber);  // false`,
      hints: [
        'This well-known symbol customises the instanceof operator.',
        'It must be a static method.',
        'The symbol is `hasInstance`.',
      ],
      concepts: ['Symbol.hasInstance', 'instanceof', 'well-known symbols'],
    },

    // ---- write-function (6) ----
    {
      id: 'js-sym-7b',
      title: 'Range iterable',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Create a range function that returns an iterable object.',
      skeleton: `// Write function range(start, end) that returns an iterable object.
// Iterating should yield start, start+1, ..., end (inclusive).
// Example: [...range(1, 5)] => [1, 2, 3, 4, 5]
`,
      solution: `function range(start, end) {
  return {
    [Symbol.iterator]() {
      let current = start;
      return {
        next() {
          if (current <= end) {
            return { value: current++, done: false };
          }
          return { done: true };
        },
      };
    },
  };
}`,
      hints: [
        'Return an object with a [Symbol.iterator] method.',
        'The iterator tracks a current value starting at start.',
        'Return done: true when current exceeds end.',
      ],
      concepts: ['Symbol.iterator', 'iterable', 'iterator'],
    },
    {
      id: 'js-sym-8i',
      title: 'Infinite counter iterator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Create an infinite iterator that counts from a starting number.',
      skeleton: `// Write function counter(start) that returns an iterable iterator.
// It should yield start, start+1, start+2, ... forever (done is never true).
// The returned object should be both iterator and iterable (self-referencing Symbol.iterator).
`,
      solution: `function counter(start) {
  let n = start;
  return {
    next() {
      return { value: n++, done: false };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
}`,
      hints: [
        'An infinite iterator never returns done: true.',
        'To be both iterator and iterable, add [Symbol.iterator]() { return this; }.',
        'Track the current count in a closure variable.',
      ],
      concepts: ['infinite iterator', 'iterable iterator', 'Symbol.iterator'],
    },
    {
      id: 'js-sym-9i',
      title: 'take utility for iterables',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a take function that limits how many values are consumed from an iterable.',
      skeleton: `// Write function take(iterable, n) that returns a new iterable
// yielding at most n values from the source iterable.
// Example: [...take([10, 20, 30, 40], 2)] => [10, 20]
`,
      solution: `function take(iterable, n) {
  return {
    [Symbol.iterator]() {
      const iter = iterable[Symbol.iterator]();
      let count = 0;
      return {
        next() {
          if (count >= n) return { done: true };
          count++;
          return iter.next();
        },
      };
    },
  };
}`,
      hints: [
        'Get the source iterator from iterable[Symbol.iterator]().',
        'Track how many values you have yielded.',
        'Return done: true once count reaches n.',
      ],
      concepts: ['iterable', 'iterator', 'lazy evaluation'],
    },
    {
      id: 'js-sym-10i',
      title: 'Map over iterable',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a lazy map function that works on any iterable.',
      skeleton: `// Write function mapIterable(iterable, fn) that returns a new iterable.
// Each value yielded is fn(originalValue).
// Example: [...mapIterable([1,2,3], x => x * 2)] => [2, 4, 6]
`,
      solution: `function mapIterable(iterable, fn) {
  return {
    [Symbol.iterator]() {
      const iter = iterable[Symbol.iterator]();
      return {
        next() {
          const result = iter.next();
          if (result.done) return { done: true };
          return { value: fn(result.value), done: false };
        },
      };
    },
  };
}`,
      hints: [
        'Delegate to the source iterator.',
        'If the source is done, return done: true.',
        'Otherwise wrap the value with fn().',
      ],
      concepts: ['iterable', 'lazy map', 'higher-order function'],
    },
    {
      id: 'js-sym-11a',
      title: 'Linked list iterable',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Make a linked list class iterable.',
      skeleton: `// Write class LinkedList with:
// - append(value): add a node to the end
// - [Symbol.iterator](): iterate over all values
// Internally use nodes: { value, next }
`,
      solution: `class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {
    const node = { value, next: null };
    if (this.tail) {
      this.tail.next = node;
    } else {
      this.head = node;
    }
    this.tail = node;
  }

  [Symbol.iterator]() {
    let current = this.head;
    return {
      next() {
        if (current === null) {
          return { done: true };
        }
        const value = current.value;
        current = current.next;
        return { value, done: false };
      },
    };
  }
}`,
      hints: [
        'Use a head/tail pointer pair for efficient append.',
        'The iterator starts at head and follows next pointers.',
        'Return done: true when current is null.',
      ],
      concepts: ['linked list', 'Symbol.iterator', 'data structure'],
    },
    {
      id: 'js-sym-12a',
      title: 'Symbol.toStringTag',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Create a class with a custom toStringTag.',
      skeleton: `// Write class Validator with:
// - constructor(name): set this.name
// - get [Symbol.toStringTag](): return 'Validator<' + this.name + '>'
// So that Object.prototype.toString.call(new Validator('email'))
// returns '[object Validator<email>]'
`,
      solution: `class Validator {
  constructor(name) {
    this.name = name;
  }

  get [Symbol.toStringTag]() {
    return 'Validator<' + this.name + '>';
  }
}`,
      hints: [
        'Symbol.toStringTag customises Object.prototype.toString output.',
        'It should be a getter, not a regular method.',
        'Return the string you want between [object ...] brackets.',
      ],
      concepts: ['Symbol.toStringTag', 'getter', 'well-known symbols'],
    },

    // ---- fix-bug (3) ----
    {
      id: 'js-sym-13b',
      title: 'Missing done property',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fix the iterator that never terminates.',
      skeleton: `const countdown = {
  [Symbol.iterator]() {
    let n = 3;
    return {
      next() {
        if (n > 0) {
          return { value: n-- };
        }
        return { value: undefined };
      },
    };
  },
};

// This loops forever!
for (const n of countdown) {
  console.log(n);
}`,
      solution: `const countdown = {
  [Symbol.iterator]() {
    let n = 3;
    return {
      next() {
        if (n > 0) {
          return { value: n--, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  },
};

for (const n of countdown) {
  console.log(n);
}`,
      hints: [
        'The iterator protocol requires a done property in the result.',
        'Without done: true, for...of never knows to stop.',
        'Add done: false for values and done: true when finished.',
      ],
      concepts: ['iterator protocol', 'done', 'infinite loop'],
    },
    {
      id: 'js-sym-14i',
      title: 'Non-reusable iterator',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fix the iterable so it can be iterated multiple times.',
      skeleton: `const colors = {
  items: ['red', 'green', 'blue'],
  index: 0,
  [Symbol.iterator]() { return this; },
  next() {
    if (this.index < this.items.length) {
      return { value: this.items[this.index++], done: false };
    }
    return { done: true };
  },
};

console.log([...colors]); // ['red', 'green', 'blue']
console.log([...colors]); // [] -- Bug! Second iteration is empty`,
      solution: `const colors = {
  items: ['red', 'green', 'blue'],
  [Symbol.iterator]() {
    let index = 0;
    const items = this.items;
    return {
      next() {
        if (index < items.length) {
          return { value: items[index++], done: false };
        }
        return { done: true };
      },
    };
  },
};

console.log([...colors]); // ['red', 'green', 'blue']
console.log([...colors]); // ['red', 'green', 'blue']`,
      hints: [
        'The object is acting as both iterable and iterator with shared state.',
        'The index is not reset between iterations.',
        'Return a new iterator object from [Symbol.iterator]() each time.',
      ],
      concepts: ['iterable', 'iterator', 'reusability', 'closure'],
    },
    {
      id: 'js-sym-15a',
      title: 'Symbol equality confusion',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fix the code that uses Symbol() instead of Symbol.for() for cross-module keys.',
      skeleton: `// module-a.js
const TYPE_KEY = Symbol('type');

function tag(obj, type) {
  obj[TYPE_KEY] = type;
  return obj;
}

// module-b.js (separate context)
const TYPE_KEY_B = Symbol('type');

function getType(obj) {
  return obj[TYPE_KEY_B] || 'unknown';
}

// Usage
const item = tag({}, 'widget');
console.log(getType(item)); // 'unknown' -- Bug! Cannot read the tag`,
      solution: `// module-a.js
const TYPE_KEY = Symbol.for('app.type');

function tag(obj, type) {
  obj[TYPE_KEY] = type;
  return obj;
}

// module-b.js (separate context)
const TYPE_KEY_B = Symbol.for('app.type');

function getType(obj) {
  return obj[TYPE_KEY_B] || 'unknown';
}

// Usage
const item = tag({}, 'widget');
console.log(getType(item)); // 'widget'`,
      hints: [
        'Symbol() always creates a unique symbol, even with the same description.',
        'For cross-module shared symbols, use the global registry.',
        'Replace Symbol("type") with Symbol.for("app.type") in both modules.',
      ],
      concepts: ['Symbol', 'Symbol.for', 'global registry', 'cross-module'],
    },

    // ---- predict-output (3) ----
    {
      id: 'js-sym-16b',
      title: 'Symbol uniqueness',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the comparison results of symbols.',
      skeleton: `const a = Symbol('test');
const b = Symbol('test');
const c = Symbol.for('test');
const d = Symbol.for('test');

console.log(a === b);
console.log(c === d);
console.log(a === c);`,
      solution: `const a = Symbol('test');
const b = Symbol('test');
const c = Symbol.for('test');
const d = Symbol.for('test');

console.log(a === b);
console.log(c === d);
console.log(a === c);`,
      expectedOutput: `false
true
false`,
      hints: [
        'Symbol() always creates a unique symbol.',
        'Symbol.for() uses a global registry and returns the same symbol for the same key.',
        'Symbols from Symbol() and Symbol.for() are never the same.',
      ],
      concepts: ['Symbol', 'Symbol.for', 'equality'],
    },
    {
      id: 'js-sym-17i',
      title: 'Spread with custom iterable',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict what spread does with a custom iterable.',
      skeleton: `const pair = {
  [Symbol.iterator]() {
    let step = 0;
    return {
      next() {
        step++;
        if (step === 1) return { value: 'hello', done: false };
        if (step === 2) return { value: 'world', done: false };
        return { done: true };
      },
    };
  },
};

const arr = [...pair];
console.log(arr.length);
console.log(arr.join(' '));`,
      solution: `const pair = {
  [Symbol.iterator]() {
    let step = 0;
    return {
      next() {
        step++;
        if (step === 1) return { value: 'hello', done: false };
        if (step === 2) return { value: 'world', done: false };
        return { done: true };
      },
    };
  },
};

const arr = [...pair];
console.log(arr.length);
console.log(arr.join(' '));`,
      expectedOutput: `2
hello world`,
      hints: [
        'Spread calls [Symbol.iterator]() and collects all values.',
        'The iterator yields two values then signals done.',
        'The result is an array with two elements.',
      ],
      concepts: ['spread', 'Symbol.iterator', 'iterable'],
    },
    {
      id: 'js-sym-18a',
      title: 'Symbol property enumeration',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict which methods see symbol-keyed properties.',
      skeleton: `const sym = Symbol('hidden');
const obj = { visible: 1, [sym]: 2 };

console.log(Object.keys(obj).length);
console.log(Object.getOwnPropertyNames(obj).length);
console.log(Object.getOwnPropertySymbols(obj).length);
console.log(Reflect.ownKeys(obj).length);`,
      solution: `const sym = Symbol('hidden');
const obj = { visible: 1, [sym]: 2 };

console.log(Object.keys(obj).length);
console.log(Object.getOwnPropertyNames(obj).length);
console.log(Object.getOwnPropertySymbols(obj).length);
console.log(Reflect.ownKeys(obj).length);`,
      expectedOutput: `1
1
1
2`,
      hints: [
        'Object.keys and getOwnPropertyNames skip symbol keys.',
        'getOwnPropertySymbols returns only symbol keys.',
        'Reflect.ownKeys returns both string and symbol keys.',
      ],
      concepts: ['Symbol', 'Object.keys', 'Reflect.ownKeys', 'property enumeration'],
    },

    // ---- refactor (2) ----
    {
      id: 'js-sym-19i',
      title: 'String keys to symbols',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Replace magic string keys with symbols to avoid collisions.',
      skeleton: `// These string keys could collide with user data
const cache = {};

function setMeta(obj) {
  obj['__cache_id__'] = Math.random();
  obj['__cache_ts__'] = Date.now();
}

function getMeta(obj) {
  return {
    id: obj['__cache_id__'],
    timestamp: obj['__cache_ts__'],
  };
}`,
      solution: `const CACHE_ID = Symbol('cache_id');
const CACHE_TS = Symbol('cache_ts');

function setMeta(obj) {
  obj[CACHE_ID] = Math.random();
  obj[CACHE_TS] = Date.now();
}

function getMeta(obj) {
  return {
    id: obj[CACHE_ID],
    timestamp: obj[CACHE_TS],
  };
}`,
      hints: [
        'Symbols are guaranteed to never collide with other keys.',
        'Replace the magic string keys with Symbol constants.',
        'Use the symbols as computed property keys.',
      ],
      concepts: ['Symbol', 'property key', 'collision avoidance'],
    },
    {
      id: 'js-sym-20a',
      title: 'Index-based to iterator-based',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor index-based iteration to use the iterator protocol.',
      skeleton: `class Matrix {
  constructor(rows) {
    this.rows = rows;
  }

  // Clunky: caller must know internal structure
  getElement(row, col) {
    return this.rows[row][col];
  }

  rowCount() { return this.rows.length; }
  colCount() { return this.rows[0].length; }
}

// Usage requires nested loops with indices
const m = new Matrix([[1, 2], [3, 4]]);
for (let r = 0; r < m.rowCount(); r++) {
  for (let c = 0; c < m.colCount(); c++) {
    console.log(m.getElement(r, c));
  }
}`,
      solution: `class Matrix {
  constructor(rows) {
    this.rows = rows;
  }

  [Symbol.iterator]() {
    let row = 0;
    let col = 0;
    const rows = this.rows;
    return {
      next() {
        if (row >= rows.length) return { done: true };
        const value = rows[row][col];
        col++;
        if (col >= rows[row].length) {
          col = 0;
          row++;
        }
        return { value, done: false };
      },
    };
  }
}

// Clean usage
const m = new Matrix([[1, 2], [3, 4]]);
for (const value of m) {
  console.log(value);
}`,
      hints: [
        'Add a [Symbol.iterator] method that walks all elements row by row.',
        'Track both row and column indices in the iterator closure.',
        'Advance to the next row when the column exceeds the row length.',
      ],
      concepts: ['Symbol.iterator', 'iterable', 'refactor', 'matrix'],
    },
  ],
};
