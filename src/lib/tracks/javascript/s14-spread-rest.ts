import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-spread-rest',
  title: '14. Spread & Rest',
  explanation: `## Spread & Rest

The \`...\` syntax serves two opposite purposes depending on context.

### Spread (expanding)
Expands an iterable/object into individual elements:
\`\`\`js
const arr = [...[1, 2], ...[3, 4]];      // [1, 2, 3, 4]
const obj = { ...defaults, ...overrides }; // merge objects
Math.max(...numbers);                      // function arguments
\`\`\`

### Rest (collecting)
Collects remaining elements into an array/object:
\`\`\`js
function sum(...nums) { }               // rest parameter
const [head, ...tail] = [1, 2, 3];       // array rest
const { id, ...props } = obj;            // object rest
\`\`\`

### Key Rules
- Spread creates **shallow** copies
- Object spread: later properties override earlier ones
- Rest must be the **last** element
- Spread works with any iterable (arrays, strings, Sets, Maps)

### Spread for Immutable Updates
\`\`\`js
const updated = { ...state, count: state.count + 1 };
const removed = state.filter(item => item.id !== targetId);
\`\`\`
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-sr-1',
      title: 'Spread array',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Merge two arrays using spread.',
      skeleton: `const a = [1, 2];
const b = [3, 4];
const merged = [__BLANK__a, __BLANK__b];
console.log(merged); // [1, 2, 3, 4]`,
      solution: `const a = [1, 2];
const b = [3, 4];
const merged = [...a, ...b];
console.log(merged); // [1, 2, 3, 4]`,
      hints: [
        'Spread uses three dots before the variable.',
        'It expands the array elements.',
        'Use `...`.',
      ],
      concepts: ['spread', 'array merging'],
    },
    {
      id: 'js-sr-2',
      title: 'Spread object',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Create a copy of an object with an additional property.',
      skeleton: `const original = { a: 1, b: 2 };
const extended = { __BLANK__original, c: 3 };`,
      solution: `const original = { a: 1, b: 2 };
const extended = { ...original, c: 3 };`,
      hints: [
        'Spread an object inside curly braces.',
        'New properties can follow the spread.',
        'Use `...`.',
      ],
      concepts: ['spread', 'object copy', 'extending'],
    },
    {
      id: 'js-sr-3',
      title: 'Rest parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Collect all arguments into an array.',
      skeleton: `function log(__BLANK__args) {
  console.log(args);
}
log(1, 2, 3); // [1, 2, 3]`,
      solution: `function log(...args) {
  console.log(args);
}
log(1, 2, 3); // [1, 2, 3]`,
      hints: [
        'Rest parameters use three dots.',
        'They collect remaining arguments into an array.',
        'Use `...`.',
      ],
      concepts: ['rest parameters', 'variadic function'],
    },
    {
      id: 'js-sr-4',
      title: 'Spread with Math.max',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Use spread to pass array elements as arguments.',
      skeleton: `const nums = [5, 2, 8, 1, 9];
console.log(Math.max(__BLANK__nums)); // 9`,
      solution: `const nums = [5, 2, 8, 1, 9];
console.log(Math.max(...nums)); // 9`,
      hints: [
        'Math.max takes individual arguments, not an array.',
        'Spread the array into individual arguments.',
        'Use `...`.',
      ],
      concepts: ['spread', 'Math.max', 'function arguments'],
    },
    {
      id: 'js-sr-5',
      title: 'Object rest',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Extract one property and collect the rest.',
      skeleton: `const { id, __BLANK__data } = { id: 1, name: 'Zan', age: 30 };
console.log(data); // { name: 'Zan', age: 30 }`,
      solution: `const { id, ...data } = { id: 1, name: 'Zan', age: 30 };
console.log(data); // { name: 'Zan', age: 30 }`,
      hints: [
        'Object rest collects remaining properties.',
        'Use three dots before the variable name.',
        'Use `...`.',
      ],
      concepts: ['object rest', 'destructuring'],
    },
    {
      id: 'js-sr-6',
      title: 'Spread with strings',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Spread a string into an array of characters.',
      skeleton: `const chars = [__BLANK__'hello'];
console.log(chars); // ['h', 'e', 'l', 'l', 'o']`,
      solution: `const chars = [..."hello"];
console.log(chars); // ['h', 'e', 'l', 'l', 'o']`,
      hints: [
        'Strings are iterable.',
        'Spread expands each character.',
        'Use `..."hello"`.',
      ],
      concepts: ['spread', 'string', 'iterable'],
    },
    // ---- write-function (6) ----
    {
      id: 'js-sr-7',
      title: 'Immutable push',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function `immutablePush(arr, item)` that returns a new array with the item appended.',
      skeleton: `function immutablePush(arr, item) {
  // Return new array without mutating arr
}
`,
      solution: `function immutablePush(arr, item) {
  return [...arr, item];
}`,
      hints: [
        'Spread the original array and add the new item.',
        'This creates a new array.',
        'Use `[...arr, item]`.',
      ],
      concepts: ['spread', 'immutable', 'array'],
    },
    {
      id: 'js-sr-8',
      title: 'Merge with override',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function `merge(defaults, overrides)` that merges two objects with overrides taking precedence.',
      skeleton: `function merge(defaults, overrides) {
  // Merge objects
}
`,
      solution: `function merge(defaults, overrides) {
  return { ...defaults, ...overrides };
}`,
      hints: [
        'Spread both objects. Later spreads override earlier.',
        'Spread defaults first, then overrides.',
        'Use `{ ...defaults, ...overrides }`.',
      ],
      concepts: ['spread', 'object merging', 'override'],
    },
    {
      id: 'js-sr-9',
      title: 'First and rest',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `headTail(arr)` that returns { head, tail } where head is the first element and tail is the rest.',
      skeleton: `function headTail(arr) {
  // Return { head, tail }
}
`,
      solution: `function headTail(arr) {
  const [head, ...tail] = arr;
  return { head, tail };
}`,
      hints: [
        'Use array destructuring with rest.',
        'The first element is head, the rest is tail.',
        'Return using shorthand properties.',
      ],
      concepts: ['array destructuring', 'rest', 'shorthand'],
    },
    {
      id: 'js-sr-10',
      title: 'Remove property immutably',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `removeProp(obj, key)` that returns a new object without the specified property.',
      skeleton: `function removeProp(obj, key) {
  // Return new object without key
}
`,
      solution: `function removeProp(obj, key) {
  const { [key]: _, ...rest } = obj;
  return rest;
}`,
      hints: [
        'Use computed property destructuring to extract the key.',
        'Use rest to collect everything else.',
        'The extracted value can be named _ (unused).',
      ],
      concepts: ['computed destructuring', 'object rest', 'immutable'],
    },
    {
      id: 'js-sr-11',
      title: 'Spread with Set for unique merge',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `uniqueMerge(...arrays)` that merges multiple arrays and removes duplicates.',
      skeleton: `function uniqueMerge(...arrays) {
  // Merge and deduplicate
}
// uniqueMerge([1,2], [2,3], [3,4]) => [1,2,3,4]
`,
      solution: `function uniqueMerge(...arrays) {
  return [...new Set(arrays.flat())];
}`,
      hints: [
        'Use rest to collect all array arguments.',
        'Flatten them, then pass to a Set to deduplicate.',
        'Spread the Set back into an array.',
      ],
      concepts: ['rest', 'spread', 'Set', 'flat', 'deduplication'],
    },
    {
      id: 'js-sr-12',
      title: 'Immutable nested update',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function `updateNested(obj, path, value)` where path is an array of keys. Return a new object with the nested value updated, without mutation.',
      skeleton: `function updateNested(obj, path, value) {
  // Immutably update nested property
}
// updateNested({ a: { b: { c: 1 } } }, ['a', 'b', 'c'], 2)
// => { a: { b: { c: 2 } } }
`,
      solution: `function updateNested(obj, path, value) {
  if (path.length === 0) return value;
  const [head, ...tail] = path;
  return {
    ...obj,
    [head]: updateNested(obj[head] ?? {}, tail, value),
  };
}`,
      hints: [
        'Base case: empty path means return the value.',
        'Recursive case: spread the current level and recurse deeper.',
        'Use computed property name [head] for the key.',
      ],
      concepts: ['spread', 'recursion', 'immutable update', 'computed property'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'js-sr-13',
      title: 'Fix: spread order',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'The defaults should be overridden by user config, but the spread order is wrong.',
      skeleton: `const defaults = { theme: 'light', lang: 'en' };
const userConfig = { theme: 'dark' };
const config = { ...userConfig, ...defaults };
console.log(config.theme); // should be "dark"`,
      solution: `const defaults = { theme: 'light', lang: 'en' };
const userConfig = { theme: 'dark' };
const config = { ...defaults, ...userConfig };
console.log(config.theme); // "dark"`,
      hints: [
        'Later spread values override earlier ones.',
        'Defaults should come first, user config second.',
        'Swap the spread order.',
      ],
      concepts: ['spread', 'object merging', 'override order'],
    },
    {
      id: 'js-sr-14',
      title: 'Fix: rest not last',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Rest element must be last. Fix the parameter order.',
      skeleton: `function process(...items, callback) {
  items.forEach(callback);
}`,
      solution: `function process(callback, ...items) {
  items.forEach(callback);
}`,
      hints: [
        'Rest parameters must be the last parameter.',
        'Move callback before the rest parameter.',
        'Swap: `(callback, ...items)`.',
      ],
      concepts: ['rest parameters', 'parameter order', 'SyntaxError'],
    },
    {
      id: 'js-sr-15',
      title: 'Fix: shallow spread trap',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Spread is shallow. The nested array is shared. Fix it.',
      skeleton: `const state = { items: [1, 2, 3], count: 3 };
const newState = { ...state };
newState.items.push(4);
console.log(state.items.length); // should be 3, not 4`,
      solution: `const state = { items: [1, 2, 3], count: 3 };
const newState = { ...state, items: [...state.items] };
newState.items.push(4);
console.log(state.items.length); // 3`,
      hints: [
        'Spread only makes a shallow copy.',
        'Nested arrays/objects are still shared.',
        'Spread the nested array separately.',
      ],
      concepts: ['shallow copy', 'spread', 'nested reference'],
    },
    // ---- predict-output (3) ----
    {
      id: 'js-sr-16',
      title: 'Predict: spread string',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `console.log([...'abc'].length);`,
      solution: `3`,
      hints: [
        'Spreading a string creates an array of characters.',
        '"abc" has 3 characters.',
        'The output is 3.',
      ],
      concepts: ['spread', 'string', 'iterable'],
    },
    {
      id: 'js-sr-17',
      title: 'Predict: rest vs arguments',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `function test(...args) {
  console.log(Array.isArray(args));
}
test(1, 2, 3);`,
      solution: `true`,
      hints: [
        'Rest parameters produce a real Array.',
        'Unlike arguments which is array-like.',
        'Array.isArray(args) is true.',
      ],
      concepts: ['rest parameters', 'Array.isArray', 'arguments'],
    },
    {
      id: 'js-sr-18',
      title: 'Predict: spread override',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `const obj = { a: 1, b: 2, a: 3 };
const merged = { ...obj, b: 4 };
console.log(merged.a, merged.b);`,
      solution: `3 4`,
      hints: [
        'Duplicate key a in the literal: last value wins (3).',
        'Spread copies a:3, b:2. Then b:4 overrides.',
        'Output: 3 4.',
      ],
      concepts: ['spread', 'duplicate keys', 'override'],
    },
    // ---- refactor (2) ----
    {
      id: 'js-sr-19',
      title: 'Refactor: apply to spread',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Refactor Function.apply to use spread syntax.',
      skeleton: `const nums = [5, 10, 15, 20];
const max = Math.max.apply(null, nums);`,
      solution: `const nums = [5, 10, 15, 20];
const max = Math.max(...nums);`,
      hints: [
        'Spread can replace .apply() for passing arrays as arguments.',
        'Math.max(...nums) is cleaner.',
        'Remove .apply(null, ...) and use spread.',
      ],
      concepts: ['spread', 'Function.apply', 'refactoring'],
    },
    {
      id: 'js-sr-20',
      title: 'Refactor: concat to spread',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Refactor Array.concat to spread.',
      skeleton: `const a = [1, 2];
const b = [3, 4];
const c = [5];
const all = a.concat(b).concat(c);`,
      solution: `const a = [1, 2];
const b = [3, 4];
const c = [5];
const all = [...a, ...b, ...c];`,
      hints: [
        'Spread multiple arrays inside one array literal.',
        'This is more readable than chained concat.',
        'Use `[...a, ...b, ...c]`.',
      ],
      concepts: ['spread', 'Array.concat', 'refactoring'],
    },
  ],
};
