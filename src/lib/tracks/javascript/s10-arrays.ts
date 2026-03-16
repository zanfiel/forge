import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-arrays',
  title: '10. Arrays',
  explanation: `## Arrays

Arrays are ordered, indexed collections. In JavaScript, arrays are objects with special behaviour.

### Creation
\`\`\`js
const a = [1, 2, 3];           // literal
const b = Array.of(1, 2, 3);   // Array.of
const c = Array.from('abc');    // from iterable: ['a','b','c']
const d = new Array(5);         // sparse array of length 5
\`\`\`

### Access & Length
- \`arr[0]\`, \`arr.at(-1)\` (negative indexing)
- \`arr.length\` -- can be set (truncates or extends)

### Mutating Methods
\`push\`, \`pop\`, \`shift\`, \`unshift\`, \`splice\`, \`fill\`, \`copyWithin\`, \`reverse\`, \`sort\`

### Non-Mutating Methods
\`slice\`, \`concat\`, \`flat\`, \`indexOf\`, \`includes\`, \`lastIndexOf\`, \`at\`, \`toSorted\`, \`toReversed\`, \`with\`

### Checking
\`Array.isArray(val)\` -- the reliable way to check for arrays.

### Destructuring & Spread
\`\`\`js
const [first, ...rest] = [1, 2, 3];
const copy = [...original];
\`\`\`
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-arr-1',
      title: 'Array push',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Add an element to the end of the array.',
      skeleton: `const fruits = ['apple', 'banana'];
fruits.__BLANK__('cherry');
console.log(fruits); // ['apple', 'banana', 'cherry']`,
      solution: `const fruits = ['apple', 'banana'];
fruits.push('cherry');
console.log(fruits); // ['apple', 'banana', 'cherry']`,
      hints: [
        'You need a method that adds to the end of the array.',
        'It mutates the original array.',
        'The method is `push`.',
      ],
      concepts: ['Array.push', 'mutation'],
    },
    {
      id: 'js-arr-2',
      title: 'Array.isArray',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Check if a value is an array.',
      skeleton: `console.log(Array.__BLANK__([1, 2, 3])); // true
console.log(Array.__BLANK__('hello'));    // false`,
      solution: `console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray('hello'));    // false`,
      hints: [
        'typeof [] returns "object", so you need a better check.',
        'Array has a static method for this.',
        'Use `isArray`.',
      ],
      concepts: ['Array.isArray', 'type checking'],
    },
    {
      id: 'js-arr-3',
      title: 'Array slice',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Extract a portion of the array without mutating it.',
      skeleton: `const nums = [10, 20, 30, 40, 50];
const mid = nums.__BLANK__(1, 4);
console.log(mid); // [20, 30, 40]`,
      solution: `const nums = [10, 20, 30, 40, 50];
const mid = nums.slice(1, 4);
console.log(mid); // [20, 30, 40]`,
      hints: [
        'You need a non-mutating method that extracts a subarray.',
        'It takes start (inclusive) and end (exclusive) indices.',
        'Use `slice`.',
      ],
      concepts: ['Array.slice', 'non-mutating'],
    },
    {
      id: 'js-arr-4',
      title: 'Array.from with iterable',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Convert a string to an array of characters.',
      skeleton: `const chars = Array.__BLANK__('hello');
console.log(chars); // ['h', 'e', 'l', 'l', 'o']`,
      solution: `const chars = Array.from('hello');
console.log(chars); // ['h', 'e', 'l', 'l', 'o']`,
      hints: [
        'Array has a static method that creates an array from an iterable.',
        'Strings are iterable.',
        'Use `from`.',
      ],
      concepts: ['Array.from', 'iterable', 'string'],
    },
    {
      id: 'js-arr-5',
      title: 'Array flat',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Flatten a nested array one level deep.',
      skeleton: `const nested = [[1, 2], [3, 4], [5]];
const flat = nested.__BLANK__();
console.log(flat); // [1, 2, 3, 4, 5]`,
      solution: `const nested = [[1, 2], [3, 4], [5]];
const flat = nested.flat();
console.log(flat); // [1, 2, 3, 4, 5]`,
      hints: [
        'There is a method that flattens nested arrays.',
        'By default it flattens one level.',
        'The method is `flat`.',
      ],
      concepts: ['Array.flat', 'nested arrays'],
    },
    {
      id: 'js-arr-6',
      title: 'Array at() with negative',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Access the last element using at().',
      skeleton: `const arr = [10, 20, 30];
console.log(arr.at(__BLANK__)); // 30`,
      solution: `const arr = [10, 20, 30];
console.log(arr.at(-1)); // 30`,
      hints: [
        'at() supports negative indices.',
        'Negative indices count from the end.',
        'Use `-1`.',
      ],
      concepts: ['Array.at', 'negative index'],
    },
    // ---- write-function (6) ----
    {
      id: 'js-arr-7',
      title: 'Remove element by value',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function `removeItem(arr, item)` that returns a new array without the first occurrence of item.',
      skeleton: `function removeItem(arr, item) {
  // Return new array without first occurrence of item
}
`,
      solution: `function removeItem(arr, item) {
  const index = arr.indexOf(item);
  if (index === -1) return [...arr];
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}`,
      hints: [
        'Find the index with indexOf.',
        'Use slice to get parts before and after the index.',
        'Spread both parts into a new array.',
      ],
      concepts: ['Array.indexOf', 'Array.slice', 'spread', 'immutable'],
    },
    {
      id: 'js-arr-8',
      title: 'Chunk array',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `chunk(arr, size)` that splits an array into groups of the given size.',
      skeleton: `function chunk(arr, size) {
  // Return array of chunks
}
// chunk([1,2,3,4,5], 2) => [[1,2],[3,4],[5]]
`,
      solution: `function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}`,
      hints: [
        'Loop through the array in steps of size.',
        'Use slice(i, i + size) to get each chunk.',
        'Push each chunk to the result array.',
      ],
      concepts: ['Array.slice', 'chunking', 'for loop'],
    },
    {
      id: 'js-arr-9',
      title: 'Unique values',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function `unique(arr)` that returns an array with duplicates removed.',
      skeleton: `function unique(arr) {
  // Return array with unique values
}
`,
      solution: `function unique(arr) {
  return [...new Set(arr)];
}`,
      hints: [
        'Set automatically removes duplicates.',
        'Convert the Set back to an array.',
        'Use `[...new Set(arr)]`.',
      ],
      concepts: ['Set', 'spread', 'deduplication'],
    },
    {
      id: 'js-arr-10',
      title: 'Flatten deeply nested',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `deepFlat(arr)` that completely flattens a deeply nested array.',
      skeleton: `function deepFlat(arr) {
  // Flatten all levels
}
// deepFlat([1, [2, [3, [4]]]]) => [1, 2, 3, 4]
`,
      solution: `function deepFlat(arr) {
  return arr.flat(Infinity);
}`,
      hints: [
        'Array.flat accepts a depth argument.',
        'Infinity flattens all levels.',
        'Use `arr.flat(Infinity)`.',
      ],
      concepts: ['Array.flat', 'Infinity', 'nested arrays'],
    },
    {
      id: 'js-arr-11',
      title: 'Array intersection',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `intersection(a, b)` that returns elements present in both arrays.',
      skeleton: `function intersection(a, b) {
  // Return common elements
}
`,
      solution: `function intersection(a, b) {
  const setB = new Set(b);
  return a.filter(item => setB.has(item));
}`,
      hints: [
        'Convert one array to a Set for O(1) lookups.',
        'Filter the other array to keep only matching elements.',
        'Use `a.filter(item => setB.has(item))`.',
      ],
      concepts: ['Set', 'Array.filter', 'intersection'],
    },
    {
      id: 'js-arr-12',
      title: 'Rotate array',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function `rotate(arr, k)` that rotates an array k positions to the right, returning a new array.',
      skeleton: `function rotate(arr, k) {
  // Rotate right by k positions
}
// rotate([1,2,3,4,5], 2) => [4,5,1,2,3]
`,
      solution: `function rotate(arr, k) {
  const n = arr.length;
  const offset = ((k % n) + n) % n;
  return [...arr.slice(n - offset), ...arr.slice(0, n - offset)];
}`,
      hints: [
        'Use modulo to handle k larger than array length.',
        'Split the array at the rotation point.',
        'Concatenate the end part before the start part.',
      ],
      concepts: ['Array.slice', 'modulo', 'spread', 'rotation'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'js-arr-13',
      title: 'Fix: splice vs slice',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'This code uses splice (mutating) when it should use slice (non-mutating). Fix it.',
      skeleton: `const original = [1, 2, 3, 4, 5];
const subset = original.splice(1, 3);
console.log(original); // should still be [1, 2, 3, 4, 5]`,
      solution: `const original = [1, 2, 3, 4, 5];
const subset = original.slice(1, 4);
console.log(original); // [1, 2, 3, 4, 5]`,
      hints: [
        'splice mutates the original array.',
        'slice returns a new array without mutating.',
        'Replace splice with slice (and adjust the second argument).',
      ],
      concepts: ['Array.splice', 'Array.slice', 'mutation'],
    },
    {
      id: 'js-arr-14',
      title: 'Fix: shallow copy trap',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code creates a copy but nested objects are still shared. Fix it for one level of objects.',
      skeleton: `const users = [{ name: 'Zan' }, { name: 'Ada' }];
const copy = [...users];
copy[0].name = 'Changed';
console.log(users[0].name); // should be "Zan", not "Changed"`,
      solution: `const users = [{ name: 'Zan' }, { name: 'Ada' }];
const copy = users.map(u => ({ ...u }));
copy[0].name = 'Changed';
console.log(users[0].name); // "Zan"`,
      hints: [
        'Spread creates a shallow copy -- nested objects are still references.',
        'Map over the array and spread each object for a deep-ish copy.',
        'Use `users.map(u => ({ ...u }))`.',
      ],
      concepts: ['shallow copy', 'spread', 'object reference', 'deep copy'],
    },
    {
      id: 'js-arr-15',
      title: 'Fix: new Array(5) is sparse',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code tries to map over a sparse array but gets unexpected results. Fix it.',
      skeleton: `const arr = new Array(5).map((_, i) => i);
console.log(arr); // [empty x 5], should be [0,1,2,3,4]`,
      solution: `const arr = Array.from({ length: 5 }, (_, i) => i);
console.log(arr); // [0, 1, 2, 3, 4]`,
      hints: [
        'new Array(5) creates a sparse array with no actual elements.',
        'map skips empty slots.',
        'Use Array.from with a length and mapper.',
      ],
      concepts: ['sparse array', 'Array.from', 'Array.map'],
    },
    // ---- predict-output (3) ----
    {
      id: 'js-arr-16',
      title: 'Predict: pop return value',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `const arr = [1, 2, 3];
const last = arr.pop();
console.log(last, arr.length);`,
      solution: `3 2`,
      hints: [
        'pop removes and returns the last element.',
        'The array shrinks by one.',
        'last is 3, length is 2.',
      ],
      concepts: ['Array.pop', 'return value', 'mutation'],
    },
    {
      id: 'js-arr-17',
      title: 'Predict: concat vs push',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `const a = [1, 2];
const b = a.concat([3, 4]);
console.log(a.length, b.length);`,
      solution: `2 4`,
      hints: [
        'concat returns a new array without mutating the original.',
        'a stays [1, 2], b is [1, 2, 3, 4].',
        'a.length is 2, b.length is 4.',
      ],
      concepts: ['Array.concat', 'non-mutating', 'new array'],
    },
    {
      id: 'js-arr-18',
      title: 'Predict: includes vs indexOf',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `const arr = [1, 2, NaN];
console.log(arr.includes(NaN));
console.log(arr.indexOf(NaN));`,
      solution: `true
-1`,
      hints: [
        'includes uses SameValueZero which treats NaN as equal to NaN.',
        'indexOf uses strict equality where NaN !== NaN.',
        'includes finds it (true), indexOf does not (-1).',
      ],
      concepts: ['Array.includes', 'Array.indexOf', 'NaN', 'SameValueZero'],
    },
    // ---- refactor (2) ----
    {
      id: 'js-arr-19',
      title: 'Refactor: manual copy to spread',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Refactor this manual array copy to use spread.',
      skeleton: `const original = [1, 2, 3];
const copy = [];
for (let i = 0; i < original.length; i++) {
  copy.push(original[i]);
}`,
      solution: `const original = [1, 2, 3];
const copy = [...original];`,
      hints: [
        'Spread syntax creates a shallow copy of an array.',
        'Replace the entire loop with spread.',
        'Use `[...original]`.',
      ],
      concepts: ['spread', 'array copy', 'refactoring'],
    },
    {
      id: 'js-arr-20',
      title: 'Refactor: sort to toSorted',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Refactor to use the non-mutating toSorted and toReversed methods.',
      skeleton: `const nums = [3, 1, 4, 1, 5];
const sorted = [...nums].sort((a, b) => a - b);
const reversed = [...nums].reverse();`,
      solution: `const nums = [3, 1, 4, 1, 5];
const sorted = nums.toSorted((a, b) => a - b);
const reversed = nums.toReversed();`,
      hints: [
        'toSorted and toReversed return new arrays without mutating.',
        'No need for spread + sort/reverse.',
        'Replace `[...nums].sort(...)` with `nums.toSorted(...)`.',
      ],
      concepts: ['Array.toSorted', 'Array.toReversed', 'non-mutating', 'refactoring'],
    },
  ],
};
